import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface FormattedAiMessageProps {
  content: string;
}

export const FormattedAiMessage: React.FC<FormattedAiMessageProps> = ({ content }) => {
  if (!content) return null;

  // Split into blocks: code blocks vs text blocks
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-2.5 text-xs leading-relaxed text-stone-850 dark:text-stone-100">
      {blocks.map((block, index) => {
        if (block.type === 'code') {
          return <CodeBlock key={index} code={block.content} language={block.language} />;
        }
        return <TextBlock key={index} text={block.content} />;
      })}
    </div>
  );
};

interface Block {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

function parseBlocks(rawText: string): Block[] {
  const blocks: Block[] = [];
  const lines = rawText.split('\n');
  let inCode = false;
  let codeBuffer: string[] = [];
  let codeLang = '';
  let textBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const codeMatch = line.match(/^```(\w+)?/);

    if (codeMatch) {
      if (!inCode) {
        // Starting a code block
        if (textBuffer.length > 0) {
          blocks.push({ type: 'text', content: textBuffer.join('\n') });
          textBuffer = [];
        }
        inCode = true;
        codeLang = codeMatch[1] || '';
        codeBuffer = [];
      } else {
        // Ending a code block
        inCode = false;
        blocks.push({
          type: 'code',
          content: codeBuffer.join('\n'),
          language: codeLang,
        });
        codeBuffer = [];
        codeLang = '';
      }
    } else {
      if (inCode) {
        codeBuffer.push(line);
      } else {
        textBuffer.push(line);
      }
    }
  }

  if (inCode && codeBuffer.length > 0) {
    blocks.push({ type: 'code', content: codeBuffer.join('\n'), language: codeLang });
  } else if (textBuffer.length > 0) {
    blocks.push({ type: 'text', content: textBuffer.join('\n') });
  }

  return blocks;
}

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-[#0d121c] text-stone-200 shadow-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#141b29] border-b border-stone-800 text-[10px] font-mono text-stone-400">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-teal-400" />
          <span>{language || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-[11px] font-mono leading-relaxed text-emerald-300 dark:text-emerald-400 selection:bg-teal-900">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const TextBlock: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-1.5 space-y-1 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-1.5 shrink-0" />
              <div className="flex-1">{formatInline(item)}</div>
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-1.5 space-y-1 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold font-mono text-[9px] flex items-center justify-center shrink-0 mt-0.5 border border-teal-200 dark:border-teal-800">
                {idx + 1}
              </span>
              <div className="flex-1">{formatInline(item)}</div>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Check for Headings (#, ##, ###)
    const h1Match = trimmed.match(/^#\s+(.+)$/);
    if (h1Match) {
      flushList();
      elements.push(
        <h2
          key={`h1-${elements.length}`}
          className="text-sm font-bold text-stone-900 dark:text-white pt-2 pb-1 border-b border-stone-200/80 dark:border-stone-800 flex items-center gap-2"
        >
          <span className="w-1 h-3.5 rounded bg-teal-600 dark:bg-teal-400" />
          <span>{formatInline(h1Match[1])}</span>
        </h2>
      );
      continue;
    }

    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      flushList();
      elements.push(
        <h3
          key={`h2-${elements.length}`}
          className="text-xs font-bold text-stone-900 dark:text-stone-100 pt-1.5 pb-0.5 flex items-center gap-1.5"
        >
          <span className="w-1 h-3 rounded bg-teal-500" />
          <span>{formatInline(h2Match[1])}</span>
        </h3>
      );
      continue;
    }

    const h3Match = trimmed.match(/^###\s+(.+)$/);
    if (h3Match) {
      flushList();
      elements.push(
        <h4
          key={`h3-${elements.length}`}
          className="text-xs font-bold text-teal-800 dark:text-teal-300 pt-1"
        >
          {formatInline(h3Match[1])}
        </h4>
      );
      continue;
    }

    // Check for Unordered List Item (*, -, •)
    const ulMatch = trimmed.match(/^[\*\-•]\s+(.+)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Check for Ordered List Item (1., 2.)
    const olMatch = trimmed.match(/^\d+[\.\)]\s+(.+)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[1]);
      continue;
    }

    // Regular Paragraph Line
    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="my-1">
        {formatInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1">{elements}</div>;
};

/**
 * Format inline markdown tokens:
 * - **bold**
 * - *italic*
 * - `code`
 * - [link](url)
 */
function formatInline(text: string): React.ReactNode {
  if (!text) return null;

  // Split by inline code first (`...`)
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((codePart, cIdx) => {
    if (codePart.startsWith('`') && codePart.endsWith('`')) {
      const codeContent = codePart.slice(1, -1);
      return (
        <code
          key={cIdx}
          className="px-1.5 py-0.5 rounded font-mono text-[11px] bg-stone-100 dark:bg-[#141b29] text-teal-700 dark:text-teal-300 border border-stone-200 dark:border-stone-800 font-semibold"
        >
          {codeContent}
        </code>
      );
    }

    // Split by bold (**...**)
    const boldParts = codePart.split(/(\*\*[^*]+\*\*)/g);

    return boldParts.map((boldPart, bIdx) => {
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        const boldContent = boldPart.slice(2, -2);
        return (
          <strong key={`${cIdx}-${bIdx}`} className="font-bold text-stone-900 dark:text-stone-100">
            {boldContent}
          </strong>
        );
      }

      // Check for clean italics (*...*) if not bold
      const italicParts = boldPart.split(/(\*[^*]+\*)/g);
      return italicParts.map((itPart, iIdx) => {
        if (itPart.startsWith('*') && itPart.endsWith('*') && itPart.length > 2) {
          const italicContent = itPart.slice(1, -1);
          return (
            <em key={`${cIdx}-${bIdx}-${iIdx}`} className="italic text-stone-800 dark:text-stone-200">
              {italicContent}
            </em>
          );
        }

        // Clean any leftover raw lone asterisks or stray hashes that were not part of formatting
        const cleaned = itPart.replace(/^\s*#+\s*/g, '');
        return <span key={`${cIdx}-${bIdx}-${iIdx}`}>{cleaned}</span>;
      });
    });
  });
}
