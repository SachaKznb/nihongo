"use client";

import type { FuriganaSegment } from "@/types/sentences";

interface FuriganaTextProps {
  segments: FuriganaSegment[];
  className?: string;
}

/**
 * Renders Japanese text with furigana (ruby text) above kanji
 */
export function FuriganaText({ segments, className = "" }: FuriganaTextProps) {
  return (
    <span className={`furigana-text ${className}`}>
      {segments.map((segment, index) => {
        if (segment.reading) {
          // Kanji with furigana
          return (
            <ruby key={index} className="ruby-kanji">
              {segment.text}
              <rp>(</rp>
              <rt>{segment.reading}</rt>
              <rp>)</rp>
            </ruby>
          );
        }
        // Plain text (hiragana, katakana, punctuation)
        return <span key={index}>{segment.text}</span>;
      })}
    </span>
  );
}

/**
 * Single sentence display with furigana
 */
interface FuriganaSentenceProps {
  segments: FuriganaSegment[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FuriganaSentence({
  segments,
  className = "",
  size = "md",
}: FuriganaSentenceProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <p
      className={`${sizeClasses[size]} leading-loose font-japanese ${className}`}
      lang="ja"
    >
      <FuriganaText segments={segments} />
    </p>
  );
}
