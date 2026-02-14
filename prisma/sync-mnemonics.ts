import { PrismaClient } from "@prisma/client";

// Connect to both local and production
const localPrisma = new PrismaClient();
const prodPrisma = new PrismaClient({
  datasources: {
    db: { url: process.env.PRODUCTION_DATABASE_URL }
  }
});

async function main() {
  console.log("=== SYNCING MNEMONICS TO PRODUCTION ===\n");

  // Get local radicals with their mnemonics
  const localRadicals = await localPrisma.radical.findMany({
    select: { id: true, meaningFr: true, mnemonic: true }
  });

  console.log(`Found ${localRadicals.length} local radicals`);

  let updated = 0;
  for (const radical of localRadicals) {
    try {
      await prodPrisma.radical.update({
        where: { id: radical.id },
        data: { mnemonic: radical.mnemonic }
      });
      updated++;
    } catch (e) {
      // Radical might not exist in prod yet
    }
  }

  console.log(`Updated ${updated} radical mnemonics`);

  // Also sync kanji mnemonics
  const localKanji = await localPrisma.kanji.findMany({
    select: {
      id: true,
      character: true,
      meaningMnemonicFr: true,
      readingMnemonicFr: true
    }
  });

  console.log(`Found ${localKanji.length} local kanji`);

  let kanjiUpdated = 0;
  for (const kanji of localKanji) {
    try {
      await prodPrisma.kanji.update({
        where: { id: kanji.id },
        data: {
          meaningMnemonicFr: kanji.meaningMnemonicFr,
          readingMnemonicFr: kanji.readingMnemonicFr
        }
      });
      kanjiUpdated++;
    } catch (e) {
      // Kanji might not exist in prod yet
    }
  }

  console.log(`Updated ${kanjiUpdated} kanji mnemonics`);

  // Sync vocabulary mnemonics
  const localVocab = await localPrisma.vocabulary.findMany({
    select: {
      id: true,
      word: true,
      mnemonicFr: true
    }
  });

  console.log(`Found ${localVocab.length} local vocabulary`);

  let vocabUpdated = 0;
  for (const vocab of localVocab) {
    try {
      await prodPrisma.vocabulary.update({
        where: { id: vocab.id },
        data: { mnemonicFr: vocab.mnemonicFr }
      });
      vocabUpdated++;
    } catch (e) {
      // Vocab might not exist in prod yet
    }
  }

  console.log(`Updated ${vocabUpdated} vocabulary mnemonics`);

  console.log("\n=== SYNC COMPLETE ===");
}

main()
  .catch(console.error)
  .finally(async () => {
    await localPrisma.$disconnect();
    await prodPrisma.$disconnect();
  });
