// Level-Aware Example Sentences Types

export interface FuriganaSegment {
  text: string; // The displayed text (kanji or kana)
  reading?: string; // Optional furigana (only for kanji)
}

export interface GrammarNote {
  pattern: string; // e.g., "~ています"
  explanation: string; // French explanation
}

export interface SentenceData {
  japanese: string; // Full sentence
  segments: FuriganaSegment[]; // Segmented for ruby rendering
  translation: string; // French translation
  complexity: "simple" | "natural" | "combined";
  grammarNotes?: GrammarNote[];
}

export interface GenerateSentencesRequest {
  vocabularyId: number;
  forceRegenerate?: boolean;
}

export interface GenerateSentencesResponse {
  sentences: SentenceData[];
  fromCache: boolean;
  masteredKanjiCount: number;
  créditsRemaining?: number;
}

export interface MasteredContext {
  kanji: {
    character: string;
    meaningsFr: string[];
    readingsOn: string[];
    readingsKun: string[];
  }[];
  vocabulary: {
    word: string;
    meaningsFr: string[];
    readings: string[];
  }[];
}

export interface VocabularyDetails {
  id: number;
  word: string;
  meaningsFr: string[];
  readings: string[];
  sentenceJp?: string | null;
  sentenceFr?: string | null;
  kanji: {
    character: string;
    meaningsFr: string[];
  }[];
}
