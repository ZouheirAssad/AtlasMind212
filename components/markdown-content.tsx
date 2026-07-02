import Link from "next/link";

const ALLOWED_ABSOLUTE_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

function isRelativeLink(url: string) {
  return url.startsWith("/") || url.startsWith("#");
}

function sanitizeLinkUrl(url: string): string | null {
  if (isRelativeLink(url)) return url;

  try {
    const parsed = new URL(url);
    if (ALLOWED_ABSOLUTE_PROTOCOLS.has(parsed.protocol)) return url;
  } catch {
    // Ignore malformed URLs.
  }
  return null;
}

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const patterns: Array<{ regex: RegExp; render: (match: RegExpExecArray) => React.ReactNode } & { lastIndex?: number }> = [
    {
      regex: /\*\*(.+?)\*\*/g,
      render: (match) => <strong key={match.index}>{match[1]}</strong>,
    },
    {
      regex: /\*(.+?)\*/g,
      render: (match) => <em key={match.index}>{match[1]}</em>,
    },
    {
      regex: /`(.+?)`/g,
      render: (match) => (
        <code key={match.index} className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono text-primary">
          {match[1]}
        </code>
      ),
    },
    {
      regex: /\[([^\]]+)\]\(([^)]+)\)/g,
      render: (match) => {
        const href = sanitizeLinkUrl(match[2]);
        if (!href) return <span key={match.index}>{match[1]}</span>;

        const isExternal = !isRelativeLink(href);
        const linkProps = isExternal
          ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
          : {};

        return (
          <Link
            key={match.index}
            href={href}
            className="text-primary transition-colors hover:underline"
            {...linkProps}
          >
            {match[1]}
          </Link>
        );
      },
    },
  ];

  let cursor = 0;
  while (cursor < text.length) {
    let earliest: { index: number; match: RegExpExecArray; render: (match: RegExpExecArray) => React.ReactNode } | null = null;

    for (const pattern of patterns) {
      pattern.regex.lastIndex = cursor;
      const match = pattern.regex.exec(text);
      if (match && (earliest === null || match.index < earliest.index)) {
        earliest = { index: match.index, match, render: pattern.render };
      }
    }

    if (!earliest) {
      nodes.push(<span key={cursor}>{text.slice(cursor)}</span>);
      break;
    }

    if (earliest.index > cursor) {
      nodes.push(<span key={`${cursor}-text`}>{text.slice(cursor, earliest.index)}</span>);
    }

    nodes.push(earliest.render(earliest.match));
    cursor = earliest.index + earliest.match[0].length;
  }

  return nodes;
}

function parseListBlock(lines: string[]): React.ReactNode {
  return (
    <ul className="ml-6 mt-4 list-disc text-muted-foreground">
      {lines.map((line, index) => {
        const content = line.replace(/^\s*[-*]\s+/, "");
        return <li key={index}>{parseInline(content)}</li>;
      })}
    </ul>
  );
}

function parseBlock(block: string, index: number): React.ReactNode {
  const trimmed = block.trim();
  if (!trimmed) return null;

  const lines = trimmed.split("\n");
  const firstLine = lines[0];

  if (/^#{1,3}\s+/.test(firstLine)) {
    const level = firstLine.match(/^(#+)/)?.[1].length ?? 1;
    const content = firstLine.replace(/^#{1,3}\s+/, "").trim();
    const text = parseInline(content);
    if (level === 1) return <h2 key={index} className="mt-10 font-display text-3xl text-foreground">{text}</h2>;
    if (level === 2) return <h3 key={index} className="mt-8 text-2xl font-bold text-foreground">{text}</h3>;
    return <h4 key={index} className="mt-6 text-xl font-semibold text-foreground">{text}</h4>;
  }

  if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
    return (
      <div key={index}>
        {parseListBlock(lines)}
      </div>
    );
  }

  return (
    <p key={index} className="mt-4 leading-7 text-muted-foreground">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {parseInline(line)}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

type MarkdownContentProps = {
  source: string;
  className?: string;
};

export function MarkdownContent({ source, className }: MarkdownContentProps) {
  const blocks = source.split(/\n\n+/).filter(Boolean);

  return <div className={className}>{blocks.map((block, index) => parseBlock(block, index))}</div>;
}
