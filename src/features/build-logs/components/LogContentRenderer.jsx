import React from 'react';
import styles from '../styles.module.css';

/**
 * High-performance Markdown parser for Build Log modal write-ups.
 * Parses headings, bold/strong text, inline code, code fences, numbered lists,
 * and bullet points cleanly with full typography hierarchy.
 */
export default function LogContentRenderer({ content }) {
  if (!content) return null;

  // Inline formatter: handles **bold**, `code`, *italic*
  const renderInline = (text) => {
    if (!text) return '';

    // Tokenize by `code` first, then **bold**
    const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

    return tokens.map((token, idx) => {
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code key={idx} className={styles.inlineCode}>
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('**') && token.endsWith('**')) {
        return (
          <strong key={idx} className={styles.strongText}>
            {token.slice(2, -2)}
          </strong>
        );
      }
      return token;
    });
  };

  // Line-by-line / block parser
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines = [];
  let currentList = null; // { type: 'ol' | 'ul', items: [] }

  const flushList = () => {
    if (!currentList) return;
    const ListTag = currentList.type === 'ol' ? 'ol' : 'ul';
    const listClass = currentList.type === 'ol' ? styles.modalOrderedList : styles.modalUnorderedList;
    elements.push(
      <ListTag key={`list-${elements.length}`} className={listClass}>
        {currentList.items.map((item, i) => (
          <li key={i} className={styles.modalListItem}>
            {renderInline(item)}
          </li>
        ))}
      </ListTag>
    );
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code block toggle
    if (trimmed.startsWith('```')) {
      flushList();
      if (inCodeBlock) {
        // Closing code block
        elements.push(
          <div key={`code-${elements.length}`} className={styles.codeBlockWrapper}>
            {codeBlockLang && <span className={styles.codeBlockLang}>{codeBlockLang}</span>}
            <pre className={styles.codeBlock}>
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockLang = '';
        codeBlockLines = [];
      } else {
        // Opening code block
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Blank line
    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings: ### H3, ## H2, # H1
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className={styles.modalH3}>
          {renderInline(trimmed.replace(/^###\s+/, ''))}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${elements.length}`} className={styles.modalH2}>
          {renderInline(trimmed.replace(/^##\s+/, ''))}
        </h2>
      );
      continue;
    }

    // Numbered list item: e.g. "1. " or "1) "
    const orderedMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);
    if (orderedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(orderedMatch[2]);
      continue;
    }

    // Unordered bullet item: e.g. "- " or "* "
    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)/);
    if (unorderedMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(unorderedMatch[1]);
      continue;
    }

    // Regular paragraph text
    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className={styles.modalParagraph}>
        {renderInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className={styles.modalContentRoot}>{elements}</div>;
}
