import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

/** رندر ساده و سبک محتوای مقالات (بدون کتابخانه خارجی) */
export function Markdown({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (!listBuffer.length) return;
    blocks.push(
      <ul key={key}>
        {listBuffer.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`list-${index}`);
      return;
    }
    if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
      return;
    }
    flushList(`list-${index}`);
    if (line.startsWith("### ")) {
      blocks.push(<h3 key={index}>{line.slice(4)}</h3>);
      return;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={index}>{line.slice(3)}</h2>);
      return;
    }
    blocks.push(<p key={index}>{renderInline(line)}</p>);
  });

  flushList("list-end");

  return <div className="rich-text">{blocks}</div>;
}
