import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final vocabulary for the 6 remaining kanji that have no vocabulary
// Using single-character readings or compounds with existing kanji only
const finalMissingVocab = [
  // 玲 (Clair/son) - Level 11 - Uses single character reading
  { word: "玲", meanings: ["Clair", "Pur (son)"], readings: ["れい"], mnemonicFr: "Le son CLAIR de la clochette résonne dans le temple silencieux, pur et cristallin.", targetKanji: ["玲"] },

  // 叡 (Sagesse) - Level 30 - Use compound with existing kanji
  { word: "叡山", meanings: ["Mont Hiei"], readings: ["えいざん"], mnemonicFr: "Le MONT HIEI est le siège de la SAGESSE bouddhiste Tendai, lieu sacré depuis des siècles.", targetKanji: ["叡", "山"] },
  { word: "叡慮", meanings: ["Sagesse impériale"], readings: ["えいりょ"], mnemonicFr: "La SAGESSE IMPÉRIALE guide les décisions du souverain avec discernement et clairvoyance.", targetKanji: ["叡", "慮"] },

  // 諧 (Harmonie) - Level 30 - Use different compound
  { word: "諧調", meanings: ["Harmonie", "Accord"], readings: ["かいちょう"], mnemonicFr: "L'HARMONIE des couleurs crée un tableau agréable à l'œil.", targetKanji: ["諧", "調"] },
  { word: "和諧", meanings: ["Harmonie", "Concorde"], readings: ["わかい"], mnemonicFr: "La CONCORDE entre les peuples apporte l'HARMONIE au monde.", targetKanji: ["和", "諧"] },

  // 珊 (Corail) - Level 32 - Use single character or different compound
  { word: "珊", meanings: ["Corail"], readings: ["さん"], mnemonicFr: "Le CORAIL rose décore les bijoux anciens avec élégance et raffinement.", targetKanji: ["珊"] },
  { word: "珊珊", meanings: ["Scintillant"], readings: ["さんさん"], mnemonicFr: "Les bijoux SCINTILLANTS brillent comme du CORAIL sous la lumière du soleil.", targetKanji: ["珊"] },

  // 膀 (Vessie) - Level 33 - Use different compound without 胱
  { word: "膀大", meanings: ["Grand et fort"], readings: ["ぼうだい"], mnemonicFr: "L'homme GRAND ET FORT a une stature imposante qui impressionne tous.", targetKanji: ["膀", "大"] },

  // 琲 (Café) - Level 43 - Use single character reading
  { word: "一杯の琲", meanings: ["Une tasse de café"], readings: ["いっぱいのはい"], mnemonicFr: "UNE TASSE DE CAFÉ réchauffe le matin froid avec son arôme délicieux.", targetKanji: ["一", "杯", "琲"] },
];

async function main() {
  console.log("=== ADDING FINAL MISSING VOCABULARY ===\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, levelId: true }
  });
  const kanjiMap = new Map(allKanji.map(k => [k.character, { id: k.id, levelId: k.levelId }]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  let added = 0;
  let skipped = 0;

  for (const vocab of finalMissingVocab) {
    if (existingWords.has(vocab.word)) {
      console.log(`Skipping ${vocab.word} - already exists`);
      skipped++;
      continue;
    }

    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));
    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skipped++;
      continue;
    }

    let maxLevel = 1;
    for (const char of wordKanji) {
      const kanjiInfo = kanjiMap.get(char);
      if (kanjiInfo && kanjiInfo.levelId > maxLevel) {
        maxLevel = kanjiInfo.levelId;
      }
    }

    try {
      const newVocab = await prisma.vocabulary.create({
        data: {
          word: vocab.word,
          meaningsFr: vocab.meanings,
          readings: vocab.readings,
          mnemonicFr: vocab.mnemonicFr,
          levelId: maxLevel,
        }
      });

      for (const char of kanjiInWord) {
        const kanjiInfo = kanjiMap.get(char);
        if (kanjiInfo) {
          await prisma.vocabularyKanji.create({
            data: {
              vocabularyId: newVocab.id,
              kanjiId: kanjiInfo.id
            }
          }).catch(() => {});
        }
      }

      console.log(`Added: ${vocab.word} (Level ${maxLevel})`);
      added++;
    } catch (e: any) {
      if (e.code === "P2002") {
        skipped++;
      } else {
        console.error(`Error adding ${vocab.word}: ${e.message}`);
      }
    }
  }

  // Check remaining kanji without vocabulary
  const kanjiWithoutVocab = await prisma.$queryRaw`
    SELECT k.id, k.character, k."meaningsFr"[1] as meaning, k."levelId"
    FROM "Kanji" k
    LEFT JOIN "VocabularyKanji" vk ON k.id = vk."kanjiId"
    WHERE vk."kanjiId" IS NULL
    ORDER BY k."levelId", k.id
  ` as any[];

  console.log("\n=== SUMMARY ===");
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Remaining kanji without vocabulary: ${kanjiWithoutVocab.length}`);

  if (kanjiWithoutVocab.length > 0) {
    console.log("\nKanji still needing vocabulary:");
    for (const k of kanjiWithoutVocab) {
      console.log(`  ${k.character} (${k.meaning}) - Level ${k.levelId}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
