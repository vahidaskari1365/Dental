#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# نصب اسکیل‌های Claude برای پروژه مهرادنت
# Install agent skills used to audit & improve this site.
#
# منابع / Sources:
#   1. https://github.com/AgriciDaniel/claude-seo   -> SEO skill suite (25 sub-skills)
#   2. https://github.com/ruvnet/ruflo              -> orchestration + performance/quality skills
#   3. https://github.com/tashfeenahmed/freellmapi  -> free OpenAI-compatible LLM router
#
# خروجی در ریشه ریپو نوشته می‌شود: .claude/skills و .claude/agents
# Usage:  bash scripts/install-skills.sh [--keep-cache]
# ---------------------------------------------------------------------------
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="${REPO_ROOT}/.claude/skills"
AGENTS_DIR="${REPO_ROOT}/.claude/agents"
CACHE_DIR="${REPO_ROOT}/.skills-cache"
KEEP_CACHE=0
[[ "${1:-}" == "--keep-cache" ]] && KEEP_CACHE=1

CLAUDE_SEO_URL="https://github.com/AgriciDaniel/claude-seo.git"
RUFLO_URL="https://github.com/ruvnet/ruflo.git"
FREELLMAPI_URL="https://github.com/tashfeenahmed/freellmapi.git"

# اسکیل‌های انتخاب‌شده از ruflo (مرتبط با بهینه‌سازی و کنترل کیفیت یک وب‌سایت)
RUFLO_SKILLS=(
  "v3-performance-optimization"
  "performance-analysis"
  "verification-quality"
  "skill-builder"
)

log() { printf '\033[1;32m▸\033[0m %s\n' "$1"; }

command -v git >/dev/null 2>&1 || { echo "✗ git لازم است" >&2; exit 1; }

mkdir -p "${SKILLS_DIR}" "${AGENTS_DIR}" "${CACHE_DIR}"

# ---------------------------------------------------------------- 1) claude-seo
if [[ ! -d "${CACHE_DIR}/claude-seo" ]]; then
  log "کلون کردن claude-seo ..."
  git clone --depth 1 "${CLAUDE_SEO_URL}" "${CACHE_DIR}/claude-seo"
fi

SEO_SRC="${CACHE_DIR}/claude-seo"
log "نصب پکیج اسکیل‌های SEO ..."
for skill_dir in "${SEO_SRC}/skills"/*/; do
  skill_name="$(basename "${skill_dir}")"
  rm -rf "${SKILLS_DIR:?}/${skill_name}"
  mkdir -p "${SKILLS_DIR}/${skill_name}"
  cp -r "${skill_dir}"* "${SKILLS_DIR}/${skill_name}/"
done

# فایل‌های پشتیبان اسکیل اصلی (schema / data / scripts / pdf)
for extra in schema data scripts pdf; do
  if [[ -d "${SEO_SRC}/${extra}" ]]; then
    mkdir -p "${SKILLS_DIR}/seo/${extra}"
    cp -r "${SEO_SRC}/${extra}/." "${SKILLS_DIR}/seo/${extra}/"
  fi
done

log "نصب ساب‌ایجنت‌های SEO ..."
cp "${SEO_SRC}/agents/"*.md "${AGENTS_DIR}/"

# ---------------------------------------------------------------------- 2) ruflo
if [[ ! -d "${CACHE_DIR}/ruflo" ]]; then
  log "کلون کردن ruflo ..."
  git clone --depth 1 "${RUFLO_URL}" "${CACHE_DIR}/ruflo"
fi

RUFLO_SRC="${CACHE_DIR}/ruflo"
log "نصب اسکیل اصلی ruflo ..."
rm -rf "${SKILLS_DIR:?}/ruflo"
mkdir -p "${SKILLS_DIR}/ruflo"
cp "${RUFLO_SRC}/SKILL.md" "${SKILLS_DIR}/ruflo/SKILL.md"
[[ -f "${RUFLO_SRC}/LICENSE" ]] && cp "${RUFLO_SRC}/LICENSE" "${SKILLS_DIR}/ruflo/LICENSE"

for skill in "${RUFLO_SKILLS[@]}"; do
  src="${RUFLO_SRC}/.claude/skills/${skill}"
  [[ -d "${src}" ]] || src="${RUFLO_SRC}/.agents/skills/${skill}"
  [[ -d "${src}" ]] || { echo "  ! اسکیل ${skill} پیدا نشد، رد شد"; continue; }
  dest="${SKILLS_DIR}/ruflo-${skill}"
  rm -rf "${dest:?}"
  mkdir -p "${dest}"
  cp -r "${src}/." "${dest}/"
done

# ------------------------------------------------------------------ 3) freellmapi
if [[ ! -d "${CACHE_DIR}/freellmapi" ]]; then
  log "کلون کردن freellmapi ..."
  git clone --depth 1 "${FREELLMAPI_URL}" "${CACHE_DIR}/freellmapi"
fi

FL_SRC="${CACHE_DIR}/freellmapi"
log "نصب اسکیل freellmapi ..."
rm -rf "${SKILLS_DIR:?}/freellmapi"
mkdir -p "${SKILLS_DIR}/freellmapi/references"
# این ریپازیتوری SKILL.md آماده ندارد؛ تعریف اسکیل در scripts/skills/freellmapi/SKILL.md
# نگهداری و از آن‌جا نصب می‌شود.
cp "${REPO_ROOT}/scripts/skills/freellmapi/SKILL.md" "${SKILLS_DIR}/freellmapi/SKILL.md"
[[ -f "${FL_SRC}/LICENSE" ]] && cp "${FL_SRC}/LICENSE" "${SKILLS_DIR}/freellmapi/LICENSE"
for ref in "docs/api/01-rest-api.md" "docs/install.md" "docs/architecture.md"; do
  if [[ -f "${FL_SRC}/${ref}" ]]; then
    cp "${FL_SRC}/${ref}" "${SKILLS_DIR}/freellmapi/references/$(basename "${ref}")"
  fi
done

# --------------------------------------------------------------- provenance
log "ثبت اطلاعات نسخه‌ها ..."
{
  echo "# اسکیل‌های نصب‌شده در این پروژه"
  echo
  echo "تولید خودکار توسط \`scripts/install-skills.sh\` — آخرین اجرا: $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
  echo
  echo "| اسکیل | منبع | کامیت |"
  echo "| --- | --- | --- |"
  for name in claude-seo ruflo freellmapi; do
    dir="${CACHE_DIR}/${name}"
    if [[ -d "${dir}/.git" ]]; then
      sha="$(git -C "${dir}" rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
      url="$(git -C "${dir}" remote get-url origin 2>/dev/null || echo 'unknown')"
      echo "| ${name} | ${url} | \`${sha}\` |"
    fi
  done
  echo
  echo "## فهرست اسکیل‌ها"
  echo
  for skill_path in "${SKILLS_DIR}"/*/SKILL.md; do
    [[ -f "${skill_path}" ]] || continue
    echo "- \`$(basename "$(dirname "${skill_path}")")\`"
  done
} > "${REPO_ROOT}/.claude/SKILLS.md"

if [[ "${KEEP_CACHE}" -eq 0 ]]; then
  log "پاک‌سازی کش کلون‌ها ..."
  rm -rf "${CACHE_DIR}"
fi

log "✔ نصب کامل شد → ${SKILLS_DIR}"
ls -1 "${SKILLS_DIR}"
