"use client";

import { useState } from "react";
import type { GrammarNote } from "@/types/sentences";

interface GrammarNoteTooltipProps {
  notes: GrammarNote[];
  className?: string;
}

/**
 * Displays grammar notes as inline badges with tooltips
 */
export function GrammarNoteTooltip({ notes, className = "" }: GrammarNoteTooltipProps) {
  const [activeNote, setActiveNote] = useState<number | null>(null);

  if (!notes || notes.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {notes.map((note, index) => (
        <div key={index} className="relative">
          <button
            type="button"
            className={`
              inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full
              transition-colors duration-150
              ${activeNote === index
                ? "bg-purple-100 text-purple-800 ring-1 ring-purple-300"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }
            `}
            onClick={() => setActiveNote(activeNote === index ? null : index)}
            onMouseEnter={() => setActiveNote(index)}
            onMouseLeave={() => setActiveNote(null)}
          >
            <span className="font-mono font-medium">{note.pattern}</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* Tooltip */}
          {activeNote === index && (
            <div
              className="absolute z-10 bottom-full left-0 mb-2 w-64 p-3
                         bg-stone-800 text-white text-sm rounded-lg shadow-lg"
            >
              <div className="font-medium text-purple-300 mb-1">{note.pattern}</div>
              <div className="text-stone-200">{note.explanation}</div>
              {/* Arrow */}
              <div
                className="absolute top-full left-4 w-0 h-0
                           border-x-8 border-x-transparent
                           border-t-8 border-t-stone-800"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Single grammar note as inline élément
 */
interface InlineGrammarNoteProps {
  note: GrammarNote;
}

export function InlineGrammarNote({ note }: InlineGrammarNoteProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="text-purple-600 underline decoration-dotted cursor-help"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {note.pattern}
      </button>

      {isOpen && (
        <span
          className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2
                     w-48 p-2 bg-stone-800 text-white text-xs rounded shadow-lg"
        >
          {note.explanation}
        </span>
      )}
    </span>
  );
}
