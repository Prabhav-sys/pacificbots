"use client";

import { useState } from "react";

type Block = {
  id: string;
  type: "text" | "image" | "youtube" | "code" | "file";
  value: string;
};

/* ===============================
   YouTube URL → Embed converter
================================ */
function getYouTubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        if (!block.value?.trim()) return null;

        /* ---------- TEXT ---------- */
        if (block.type === "text") {
          return <p key={block.id}>{block.value}</p>;
        }

        /* ---------- IMAGE ---------- */
        if (block.type === "image") {
          return (
            <img
              key={block.id}
              src={block.value}
              className="blog-image"
              loading="lazy"
              alt=""
            />
          );
        }

        /* ---------- YOUTUBE ---------- */
        if (block.type === "youtube") {
          const embedUrl = getYouTubeEmbedUrl(block.value);
          if (!embedUrl) return null;

          return (
            <div key={block.id} className="blog-video">
              <iframe
                src={embedUrl}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        }

        /* ---------- CODE (UPGRADED) ---------- */
        if (block.type === "code") {
          return (
            <CodeBlock key={block.id} code={block.value} />
          );
        }

        /* ---------- FILE / CASE STUDY ---------- */
        if (block.type === "file") {
          return (
            <a
              key={block.id}
              href={block.value}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-file"
            >
              View document
            </a>
          );
        }

        return null;
      })}
    </>
  );
}

/* ===============================
   CODE BLOCK COMPONENT
================================ */

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-window">
      <div className="code-toolbar">
        <span className="code-lang">CODE</span>
        <button onClick={copy} className="code-copy-btn">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
