import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// High-frequency kanji that unlock vocabulary (from our analysis)
const highFrequencyKanji = [
  // Top priority - unlock 10+ vocabulary words each
  { character: "物", meaningsFr: ["Chose", "Objet"], readingsOn: ["ブツ", "モツ"], readingsKun: ["もの"], jlpt: 3, grade: 3 },
  { character: "化", meaningsFr: ["Transformation"], readingsOn: ["カ", "ケ"], readingsKun: ["ば.ける"], jlpt: 3, grade: 3 },
  { character: "用", meaningsFr: ["Utiliser"], readingsOn: ["ヨウ"], readingsKun: ["もち.いる"], jlpt: 3, grade: 2 },
  { character: "画", meaningsFr: ["Image", "Plan"], readingsOn: ["ガ", "カク"], readingsKun: [], jlpt: 3, grade: 2 },
  { character: "定", meaningsFr: ["Fixer", "Décider"], readingsOn: ["テイ", "ジョウ"], readingsKun: ["さだ.める"], jlpt: 3, grade: 3 },
  { character: "保", meaningsFr: ["Protéger"], readingsOn: ["ホ"], readingsKun: ["たも.つ"], jlpt: 3, grade: 5 },
  { character: "科", meaningsFr: ["Science"], readingsOn: ["カ"], readingsKun: [], jlpt: 3, grade: 2 },
  { character: "詞", meaningsFr: ["Mot", "Paroles"], readingsOn: ["シ"], readingsKun: [], jlpt: 3, grade: 6 },
  { character: "対", meaningsFr: ["Opposé", "Contre"], readingsOn: ["タイ", "ツイ"], readingsKun: [], jlpt: 3, grade: 3 },
  { character: "記", meaningsFr: ["Noter"], readingsOn: ["キ"], readingsKun: ["しる.す"], jlpt: 3, grade: 2 },
  { character: "予", meaningsFr: ["Avance"], readingsOn: ["ヨ"], readingsKun: ["あらかじ.め"], jlpt: 3, grade: 3 },
  { character: "要", meaningsFr: ["Nécessaire"], readingsOn: ["ヨウ"], readingsKun: ["い.る"], jlpt: 3, grade: 4 },
  { character: "交", meaningsFr: ["Échanger"], readingsOn: ["コウ"], readingsKun: ["まじ.わる"], jlpt: 3, grade: 2 },
  { character: "所", meaningsFr: ["Lieu"], readingsOn: ["ショ"], readingsKun: ["ところ"], jlpt: 3, grade: 3 },
  { character: "有", meaningsFr: ["Avoir"], readingsOn: ["ユウ", "ウ"], readingsKun: ["あ.る"], jlpt: 3, grade: 3 },
  { character: "向", meaningsFr: ["Direction"], readingsOn: ["コウ"], readingsKun: ["む.く"], jlpt: 3, grade: 3 },
  { character: "公", meaningsFr: ["Public"], readingsOn: ["コウ"], readingsKun: ["おおやけ"], jlpt: 3, grade: 2 },
  { character: "反", meaningsFr: ["Contre"], readingsOn: ["ハン", "ホン"], readingsKun: ["そ.る"], jlpt: 3, grade: 3 },
  { character: "由", meaningsFr: ["Raison"], readingsOn: ["ユ", "ユウ"], readingsKun: ["よし"], jlpt: 3, grade: 3 },
  { character: "美", meaningsFr: ["Beauté"], readingsOn: ["ビ", "ミ"], readingsKun: ["うつく.しい"], jlpt: 3, grade: 3 },

  // More high-frequency kanji
  { character: "当", meaningsFr: ["Frapper", "Ce"], readingsOn: ["トウ"], readingsKun: ["あ.たる"], jlpt: 3, grade: 2 },
  { character: "具", meaningsFr: ["Outil"], readingsOn: ["グ"], readingsKun: [], jlpt: 3, grade: 3 },
  { character: "率", meaningsFr: ["Taux", "Ratio"], readingsOn: ["リツ", "ソツ"], readingsKun: ["ひき.いる"], jlpt: 3, grade: 5 },
  { character: "仮", meaningsFr: ["Temporaire"], readingsOn: ["カ", "ケ"], readingsKun: ["かり"], jlpt: 3, grade: 5 },
  { character: "最", meaningsFr: ["Le plus"], readingsOn: ["サイ"], readingsKun: ["もっと.も"], jlpt: 3, grade: 4 },
  { character: "申", meaningsFr: ["Dire (humble)"], readingsOn: ["シン"], readingsKun: ["もう.す"], jlpt: 3, grade: 3 },
  { character: "直", meaningsFr: ["Direct"], readingsOn: ["チョク", "ジキ"], readingsKun: ["ただ.ちに", "なお.す"], jlpt: 3, grade: 2 },
  { character: "算", meaningsFr: ["Calculer"], readingsOn: ["サン"], readingsKun: [], jlpt: 3, grade: 2 },
  { character: "早", meaningsFr: ["Tôt", "Rapide"], readingsOn: ["ソウ", "サッ"], readingsKun: ["はや.い"], jlpt: 4, grade: 1 },
  { character: "番", meaningsFr: ["Numéro", "Tour"], readingsOn: ["バン"], readingsKun: [], jlpt: 3, grade: 2 },
  { character: "曲", meaningsFr: ["Courbe", "Chanson"], readingsOn: ["キョク"], readingsKun: ["ま.がる"], jlpt: 3, grade: 3 },
  { character: "末", meaningsFr: ["Fin", "Bout"], readingsOn: ["マツ", "バツ"], readingsKun: ["すえ"], jlpt: 3, grade: 4 },
  { character: "返", meaningsFr: ["Retourner"], readingsOn: ["ヘン"], readingsKun: ["かえ.す"], jlpt: 3, grade: 3 },
  { character: "号", meaningsFr: ["Numéro"], readingsOn: ["ゴウ"], readingsKun: [], jlpt: 3, grade: 3 },
  { character: "局", meaningsFr: ["Bureau"], readingsOn: ["キョク"], readingsKun: [], jlpt: 3, grade: 3 },
  { character: "械", meaningsFr: ["Machine"], readingsOn: ["カイ"], readingsKun: [], jlpt: 3, grade: 4 },
  { character: "客", meaningsFr: ["Client"], readingsOn: ["キャク", "カク"], readingsKun: [], jlpt: 3, grade: 3 },
  { character: "王", meaningsFr: ["Roi"], readingsOn: ["オウ"], readingsKun: [], jlpt: 3, grade: 1 },
  { character: "官", meaningsFr: ["Fonctionnaire"], readingsOn: ["カン"], readingsKun: [], jlpt: 3, grade: 4 },
  { character: "礼", meaningsFr: ["Politesse"], readingsOn: ["レイ", "ライ"], readingsKun: [], jlpt: 3, grade: 3 },

  // Additional useful kanji
  { character: "身", meaningsFr: ["Corps"], readingsOn: ["シン"], readingsKun: ["み"], jlpt: 3, grade: 3 },
  { character: "界", meaningsFr: ["Monde"], readingsOn: ["カイ"], readingsKun: [], jlpt: 3, grade: 3 },
  { character: "京", meaningsFr: ["Capitale"], readingsOn: ["キョウ", "ケイ"], readingsKun: [], jlpt: 4, grade: 2 },
  { character: "相", meaningsFr: ["Mutuel"], readingsOn: ["ソウ", "ショウ"], readingsKun: ["あい"], jlpt: 3, grade: 3 },
  { character: "現", meaningsFr: ["Actuel"], readingsOn: ["ゲン"], readingsKun: ["あらわ.れる"], jlpt: 3, grade: 5 },
  { character: "表", meaningsFr: ["Surface", "Tableau"], readingsOn: ["ヒョウ"], readingsKun: ["おもて", "あらわ.す"], jlpt: 3, grade: 3 },
  { character: "原", meaningsFr: ["Plaine", "Original"], readingsOn: ["ゲン"], readingsKun: ["はら"], jlpt: 3, grade: 2 },
  { character: "期", meaningsFr: ["Période"], readingsOn: ["キ", "ゴ"], readingsKun: [], jlpt: 3, grade: 3 },
  { character: "制", meaningsFr: ["Système"], readingsOn: ["セイ"], readingsKun: [], jlpt: 3, grade: 5 },
  { character: "性", meaningsFr: ["Nature", "Sexe"], readingsOn: ["セイ", "ショウ"], readingsKun: [], jlpt: 3, grade: 5 },
];

async function main() {
  console.log("=== OPTIMIZING KANJI SET ===\n");

  // Step 1: Find kanji to remove (no vocab, not essential)
  const removableKanji = await prisma.kanji.findMany({
    where: {
      vocabulary: { none: {} },
      AND: [
        { OR: [{ jlptLevel: null }, { jlptLevel: { lt: 4 } }] },
        { OR: [{ gradeLevel: null }, { gradeLevel: { gt: 2 } }] }
      ]
    },
    include: {
      radicals: true,
      userProgress: true
    }
  });

  console.log(`Found ${removableKanji.length} removable kanji (rare, no vocabulary)`);

  // Step 2: Check which high-frequency kanji we need to add
  const existingKanji = new Set(
    (await prisma.kanji.findMany({ select: { character: true } }))
      .map(k => k.character)
  );

  const kanjiToAdd = highFrequencyKanji.filter(k => !existingKanji.has(k.character));
  console.log(`Found ${kanjiToAdd.length} high-frequency kanji to add`);

  // Step 3: Remove kanji (up to the number we're adding, to maintain ~2000)
  const removeCount = Math.min(removableKanji.length, kanjiToAdd.length + 50); // Remove a few extra
  const kanjiToRemove = removableKanji.slice(0, removeCount);

  console.log(`\nRemoving ${kanjiToRemove.length} rare kanji...`);

  for (const kanji of kanjiToRemove) {
    // Delete kanji-radical links
    await prisma.kanjiRadical.deleteMany({
      where: { kanjiId: kanji.id }
    });

    // Delete user progress
    await prisma.userKanjiProgress.deleteMany({
      where: { kanjiId: kanji.id }
    });

    // Delete the kanji
    await prisma.kanji.delete({
      where: { id: kanji.id }
    });
  }

  console.log(`Removed ${kanjiToRemove.length} kanji`);
  console.log(`Sample removed: ${kanjiToRemove.slice(0, 20).map(k => k.character).join("")}`);

  // Step 4: Add high-frequency kanji
  console.log(`\nAdding ${kanjiToAdd.length} high-frequency kanji...`);

  let added = 0;
  for (const kanji of kanjiToAdd) {
    try {
      const level = kanji.jlpt === 4 ? 10 + kanji.grade : 20 + kanji.grade;

      await prisma.kanji.create({
        data: {
          character: kanji.character,
          meaningsFr: kanji.meaningsFr,
          readingsOn: kanji.readingsOn,
          readingsKun: kanji.readingsKun,
          meaningMnemonicFr: `${kanji.meaningsFr[0].toUpperCase()} - Ce kanji représente le concept de ${kanji.meaningsFr[0].toLowerCase()}.`,
          readingMnemonicFr: `${kanji.readingsOn[0]} - Pensez à ce son pour mémoriser la lecture.`,
          levelId: level,
          jlptLevel: kanji.jlpt,
          gradeLevel: kanji.grade,
        }
      });
      added++;
    } catch (e: any) {
      if (e.code !== "P2002") {
        console.log(`Error adding ${kanji.character}: ${e.message}`);
      }
    }
  }

  console.log(`Added ${added} kanji`);

  // Step 5: Final stats
  const totalKanji = await prisma.kanji.count();
  const kanjiWithVocab = await prisma.kanji.count({
    where: { vocabulary: { some: {} } }
  });

  console.log(`\n=== FINAL STATS ===`);
  console.log(`Total kanji: ${totalKanji}`);
  console.log(`Kanji with vocabulary: ${kanjiWithVocab}`);
  console.log(`Kanji without vocabulary: ${totalKanji - kanjiWithVocab}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
