import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

interface RadicalData {
  id: number;
  character: string | null;
  meaningFr: string;
  meaningHintFr: string | null;
  mnemonic: string;
  imageUrl: string | null;
  levelId: number;
  usageCount: number | null;
  complexity: number | null;
}

interface KanjiData {
  id: number;
  character: string;
  meaningsFr: string[];
  readingsOn: string[];
  readingsKun: string[];
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
  levelId: number;
  jlptLevel: number | null;
  frequencyRank: number | null;
  gradeLevel: number | null;
  strokeCount: number | null;
  radicals: { radicalId: number }[];
}

interface VocabData {
  id: number;
  word: string;
  meaningsFr: string[];
  readings: string[];
  mnemonicFr: string;
  sentenceJp: string | null;
  sentenceFr: string | null;
  levelId: number;
  jlptLevel: number | null;
  frequencyRank: number | null;
  kanji: { kanjiId: number }[];
}

async function main() {
  console.log("=== SYNCING LOCAL CONTENT TO PRODUCTION ===\n");

  // Load exported data
  const radicals: RadicalData[] = JSON.parse(fs.readFileSync("/tmp/local-radicals.json", "utf-8"));
  const kanji: KanjiData[] = JSON.parse(fs.readFileSync("/tmp/local-kanji.json", "utf-8"));
  const vocab: VocabData[] = JSON.parse(fs.readFileSync("/tmp/local-vocab.json", "utf-8"));

  console.log(`Loaded: ${radicals.length} radicals, ${kanji.length} kanji, ${vocab.length} vocab\n`);

  // Ensure all levels 1-60 exist
  console.log("Ensuring levels 1-60 exist...");
  for (let i = 1; i <= 60; i++) {
    await prisma.level.upsert({
      where: { id: i },
      create: { id: i, name: `Niveau ${i}` },
      update: {},
    });
  }

  // Sync radicals
  console.log("\n[1/3] Syncing radicals...");
  let radicalCount = 0;
  const radicalIdMap = new Map<number, number>(); // old ID -> new ID

  for (const r of radicals) {
    try {
      // Try to find existing by character (if not null) or create new
      let existing = null;
      if (r.character) {
        existing = await prisma.radical.findFirst({
          where: { character: r.character },
        });
      }

      if (existing) {
        // Update existing
        await prisma.radical.update({
          where: { id: existing.id },
          data: {
            meaningFr: r.meaningFr,
            meaningHintFr: r.meaningHintFr,
            mnemonic: r.mnemonic,
            imageUrl: r.imageUrl,
            levelId: r.levelId,
            usageCount: r.usageCount,
            complexity: r.complexity,
          },
        });
        radicalIdMap.set(r.id, existing.id);
      } else {
        // Create new
        const created = await prisma.radical.create({
          data: {
            character: r.character,
            meaningFr: r.meaningFr,
            meaningHintFr: r.meaningHintFr,
            mnemonic: r.mnemonic,
            imageUrl: r.imageUrl,
            levelId: r.levelId,
            usageCount: r.usageCount,
            complexity: r.complexity,
          },
        });
        radicalIdMap.set(r.id, created.id);
        radicalCount++;
      }
    } catch (e) {
      console.error(`  Error with radical ${r.character || r.id}:`, e);
    }
  }
  console.log(`  Created ${radicalCount} new radicals`);

  // Sync kanji
  console.log("\n[2/3] Syncing kanji...");
  let kanjiCount = 0;
  const kanjiIdMap = new Map<number, number>(); // old ID -> new ID

  for (const k of kanji) {
    try {
      const existing = await prisma.kanji.findUnique({
        where: { character: k.character },
      });

      if (existing) {
        // Update existing
        await prisma.kanji.update({
          where: { id: existing.id },
          data: {
            meaningsFr: k.meaningsFr,
            readingsOn: k.readingsOn,
            readingsKun: k.readingsKun,
            meaningMnemonicFr: k.meaningMnemonicFr,
            readingMnemonicFr: k.readingMnemonicFr,
            levelId: k.levelId,
            jlptLevel: k.jlptLevel,
            frequencyRank: k.frequencyRank,
            gradeLevel: k.gradeLevel,
            strokeCount: k.strokeCount,
          },
        });
        kanjiIdMap.set(k.id, existing.id);
      } else {
        // Create new
        const created = await prisma.kanji.create({
          data: {
            character: k.character,
            meaningsFr: k.meaningsFr,
            readingsOn: k.readingsOn,
            readingsKun: k.readingsKun,
            meaningMnemonicFr: k.meaningMnemonicFr,
            readingMnemonicFr: k.readingMnemonicFr,
            levelId: k.levelId,
            jlptLevel: k.jlptLevel,
            frequencyRank: k.frequencyRank,
            gradeLevel: k.gradeLevel,
            strokeCount: k.strokeCount,
          },
        });
        kanjiIdMap.set(k.id, created.id);
        kanjiCount++;
      }
    } catch (e) {
      console.error(`  Error with kanji ${k.character}:`, e);
    }
  }
  console.log(`  Created ${kanjiCount} new kanji`);

  // Sync vocabulary
  console.log("\n[3/3] Syncing vocabulary...");
  let vocabCount = 0;
  const vocabIdMap = new Map<number, number>();

  for (const v of vocab) {
    try {
      const existing = await prisma.vocabulary.findFirst({
        where: { word: v.word },
      });

      if (existing) {
        // Update existing
        await prisma.vocabulary.update({
          where: { id: existing.id },
          data: {
            meaningsFr: v.meaningsFr,
            readings: v.readings,
            mnemonicFr: v.mnemonicFr,
            sentenceJp: v.sentenceJp,
            sentenceFr: v.sentenceFr,
            levelId: v.levelId,
            jlptLevel: v.jlptLevel,
            frequencyRank: v.frequencyRank,
          },
        });
        vocabIdMap.set(v.id, existing.id);
      } else {
        // Create new
        const created = await prisma.vocabulary.create({
          data: {
            word: v.word,
            meaningsFr: v.meaningsFr,
            readings: v.readings,
            mnemonicFr: v.mnemonicFr,
            sentenceJp: v.sentenceJp,
            sentenceFr: v.sentenceFr,
            levelId: v.levelId,
            jlptLevel: v.jlptLevel,
            frequencyRank: v.frequencyRank,
          },
        });
        vocabIdMap.set(v.id, created.id);
        vocabCount++;
      }
    } catch (e) {
      console.error(`  Error with vocab ${v.word}:`, e);
    }
  }
  console.log(`  Created ${vocabCount} new vocabulary`);

  // Sync relationships
  console.log("\n[4/4] Syncing relationships...");

  // Kanji-Radical relationships
  console.log("  Syncing kanji-radical links...");
  for (const k of kanji) {
    const newKanjiId = kanjiIdMap.get(k.id);
    if (!newKanjiId) continue;

    for (const rel of k.radicals || []) {
      const newRadicalId = radicalIdMap.get(rel.radicalId);
      if (!newRadicalId) continue;

      try {
        await prisma.kanjiRadical.upsert({
          where: {
            kanjiId_radicalId: { kanjiId: newKanjiId, radicalId: newRadicalId },
          },
          create: { kanjiId: newKanjiId, radicalId: newRadicalId },
          update: {},
        });
      } catch (e) {
        // Ignore duplicate errors
      }
    }
  }

  // Vocabulary-Kanji relationships
  console.log("  Syncing vocab-kanji links...");
  for (const v of vocab) {
    const newVocabId = vocabIdMap.get(v.id);
    if (!newVocabId) continue;

    for (const rel of v.kanji || []) {
      const newKanjiId = kanjiIdMap.get(rel.kanjiId);
      if (!newKanjiId) continue;

      try {
        await prisma.vocabularyKanji.upsert({
          where: {
            vocabularyId_kanjiId: { vocabularyId: newVocabId, kanjiId: newKanjiId },
          },
          create: { vocabularyId: newVocabId, kanjiId: newKanjiId },
          update: {},
        });
      } catch (e) {
        // Ignore duplicate errors
      }
    }
  }

  // Final counts
  const finalRadicals = await prisma.radical.count();
  const finalKanji = await prisma.kanji.count();
  const finalVocab = await prisma.vocabulary.count();

  console.log("\n=== SYNC COMPLETE ===");
  console.log(`Final counts:`);
  console.log(`  Radicals: ${finalRadicals}`);
  console.log(`  Kanji: ${finalKanji}`);
  console.log(`  Vocabulary: ${finalVocab}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
