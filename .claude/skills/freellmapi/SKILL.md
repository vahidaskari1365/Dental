---
name: freellmapi
description: FreeLLMAPI is a self-hostable, OpenAI-compatible router that stacks 34 free LLM providers (~635 free model endpoints, ~7.4B tokens/month) behind one `/v1` API key, with automatic failover, per-key quota tracking and a live model catalog. Use this skill when the user wants to (1) run or deploy FreeLLMAPI locally/in Docker, (2) point a coding agent or OpenAI SDK at it, (3) add free provider keys, (4) choose a routing strategy (`auto`, `auto:fast`, `auto:smart`, `auto:reliable`, `auto:<profile>`), or (5) wire a website chatbot/AI feature to free LLM inference without paying for an API.
---

# FreeLLMAPI

One OpenAI-compatible endpoint (`http://localhost:3001/v1`) that aggregates the free tiers of
Google, Groq, Cerebras, Mistral, OpenRouter, Cloudflare, Cohere, Z.ai, NVIDIA, HuggingFace,
ModelScope and ~23 more providers. A router picks the best available model per request, fails over
to the next provider when one is rate-limited, and tracks per-key usage so every free-tier cap holds.

Repository: https://github.com/tashfeenahmed/freellmapi
Live model catalog: https://freellmapi.co/models.html

## When to invoke

Reach for FreeLLMAPI when a task needs **LLM inference at zero marginal cost** — chatbots,
content generation, embeddings, image/audio endpoints — especially in prototypes, demos and
hobby projects where paying for tokens is not justified. Also use it when a project already
talks to the OpenAI SDK and only the base URL + key should change.

Do **not** suggest it for production workloads with contractual latency/uptime requirements:
free tiers are rate-limited, can disappear without notice, and the router's failover adds jitter.

## Quick start

```bash
# Run from source
git clone https://github.com/tashfeenahmed/freellmapi.git
cd freellmapi && npm install && npm run dev      # dashboard + API on :3001

# Or Docker
docker compose up -d                              # see docs/install.md

# Or the packaged image
docker run -d -p 3001:3001 ghcr.io/tashfeenahmed/freellmapi:latest
```

Then open `http://localhost:3001`, add provider keys on the **Keys** page (stored encrypted),
and copy the unified `freellmapi-...` key.

## Using the API

```bash
curl http://localhost:3001/v1/chat/completions \
  -H "Authorization: Bearer freellmapi-your-unified-key" \
  -H "Content-Type: application/json" \
  -d '{"model": "auto", "messages": [{"role": "user", "content": "hi"}]}'
```

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:3001/v1", api_key="freellmapi-your-unified-key")
resp = client.chat.completions.create(model="auto:fast", messages=[{"role": "user", "content": "..."}])
print(resp.choices[0].message.content, resp.headers.get("x-routed-via"))
```

Any OpenAI-compatible client works, including Anthropic/Claude-style clients and the Ollama
emulation surface. Interactive OpenAPI viewer: `GET /v1/docs`; spec: `GET /v1/openapi.json`.

## Routing strategies (`model` field)

| Value | Behaviour |
| --- | --- |
| `auto` | Follows your **active** fallback chain / profile |
| `auto:smart` | Favors the highest-intelligence models |
| `auto:fast` | Favors measured speed (throughput, TTFB) |
| `auto:cheap` | Budget-leaning blend |
| `auto:reliable` | Favors recent success rate |
| `auto:balanced` | Default blend (reliability first) |
| `auto:<profile-name>` | Routes through a named profile's chain |

`auto:*` ranks **every enabled model**, ignoring chain order. Model strings are case-insensitive
and common synonyms resolve (`auto:fastest`, `auto:smartest`, …). An unknown profile name returns
a clear `400` instead of silently falling back.

## Model discovery

```bash
# Whole catalog (including models you cannot call yet)
curl "http://localhost:3001/v1/models" -H "Authorization: Bearer $KEY"

# Only models that can serve a request right now
curl "http://localhost:3001/v1/models?execution_status=ready" -H "Authorization: Bearer $KEY"
```

Each entry carries `execution_status`:

- `ready` — at least one enabled key can serve it (not scoped away, not in cooldown, inside rate/token windows)
- `needsKey` — model disabled or no enabled key matches
- `exhausted` — keys match but all are blocked right now (typical after a burst of 429s; clears on cooldown expiry)

Aliases: `?available=true` (also `?connected=true`, `?ready=true`).

## Other surfaces

- **Streaming** — `stream: true` on chat completions
- **Tool calling** — OpenAI-style `tools` / `tool_choice`
- **Vision / image input**, **document attachments**
- **Images, video & text-to-speech** endpoints
- **Embeddings** — `POST /v1/embeddings`
- **Fusion** — multi-model synthesis in one call
- **Gemini Google Search grounding** and the **native Gemini API** passthrough
- **Revocable URL tokens** for sharing without exposing the unified key
- **Free-tier budget API** — monthly token budget per provider
- **Backups API** — export/import keys and profiles
- **Response headers** — `x-routed-via` and friends tell you which provider served the call

## Wiring a website to it (pattern)

Keep provider keys **server-side only**. A minimal Next.js route handler:

```ts
// app/api/chat/route.ts
export async function POST(req: Request) {
  const { messages } = await req.json();
  const res = await fetch(`${process.env.FREELLMAPI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FREELLMAPI_KEY}`,
    },
    body: JSON.stringify({ model: "auto:fast", messages }),
  });
  return Response.json(await res.json());
}
```

Always ship a deterministic fallback (canned answers, keyword router) so the UI degrades
gracefully when the router is unreachable or every provider is `exhausted`.

## Configuration

See `.env.example` in the repo (large, well-commented) and `references/install.md`.
Default port `3001`; dashboard and API share the process. Docker Compose file included.

## References bundled with this skill

- `references/01-rest-api.md` — full REST API reference
- `references/install.md` — install & deployment (Docker, Compose, source, desktop app)
- `references/architecture.md` — router internals, catalog feed, key storage

## Version note

This SKILL.md was authored for the Dental project from FreeLLMAPI's own docs
(`README.md`, `docs/api/01-rest-api.md`, `docs/install.md`), because the upstream repository
does not ship a skill manifest. Re-run `scripts/install-skills.sh` to refresh references.
