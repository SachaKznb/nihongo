import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// High-frequency kanji that unlock many vocabulary words
const moreKanji = [
  { character: "物", meaningsFr: ["Chose", "Objet"], readingsOn: ["ブツ", "モツ"], readingsKun: ["もの"],
    meaningMnemonicFr: "CHOSE/OBJET - quelque chose de concret, un objet.",
    readingMnemonicFr: "もの (mono) - MONOcle, une chose.", jlpt: 3, grade: 3 },
  { character: "化", meaningsFr: ["Transformation", "Devenir"], readingsOn: ["カ", "ケ"], readingsKun: ["ば.ける"],
    meaningMnemonicFr: "TRANSFORMATION - une personne qui change de forme.",
    readingMnemonicFr: "カ (ka) - la transformation du CArbon.", jlpt: 3, grade: 3 },
  { character: "用", meaningsFr: ["Utiliser", "Usage"], readingsOn: ["ヨウ"], readingsKun: ["もち.いる"],
    meaningMnemonicFr: "UTILISER - mettre quelque chose en usage.",
    readingMnemonicFr: "ヨウ (yō) - YOUse (utiliser).", jlpt: 3, grade: 2 },
  { character: "画", meaningsFr: ["Image", "Plan", "Trait"], readingsOn: ["ガ", "カク"], readingsKun: [],
    meaningMnemonicFr: "IMAGE - dessiner une image ou un plan.",
    readingMnemonicFr: "ガ (ga) - GArdez cette image.", jlpt: 3, grade: 2 },
  { character: "定", meaningsFr: ["Fixer", "Décider"], readingsOn: ["テイ", "ジョウ"], readingsKun: ["さだ.める"],
    meaningMnemonicFr: "FIXER - établir quelque chose de définitif.",
    readingMnemonicFr: "テイ (tei) - déTErminer, fixer.", jlpt: 3, grade: 3 },
  { character: "保", meaningsFr: ["Protéger", "Maintenir"], readingsOn: ["ホ"], readingsKun: ["たも.つ"],
    meaningMnemonicFr: "PROTÉGER - garder quelque chose en sécurité.",
    readingMnemonicFr: "ホ (ho) - HOld, maintenir.", jlpt: 3, grade: 5 },
  { character: "科", meaningsFr: ["Science", "Département"], readingsOn: ["カ"], readingsKun: [],
    meaningMnemonicFr: "SCIENCE - un domaine d'étude, un département.",
    readingMnemonicFr: "カ (ka) - une CAtégorie de science.", jlpt: 3, grade: 2 },
  { character: "詞", meaningsFr: ["Mot", "Paroles"], readingsOn: ["シ"], readingsKun: [],
    meaningMnemonicFr: "MOT - les paroles, le vocabulaire.",
    readingMnemonicFr: "シ (shi) - SHI (poésie) faite de mots.", jlpt: 3, grade: 6 },
  { character: "対", meaningsFr: ["Opposé", "Contre", "Pair"], readingsOn: ["タイ", "ツイ"], readingsKun: [],
    meaningMnemonicFr: "OPPOSÉ - face à face, en opposition.",
    readingMnemonicFr: "タイ (tai) - TIE, égalité entre opposés.", jlpt: 3, grade: 3 },
  { character: "記", meaningsFr: ["Noter", "Enregistrer"], readingsOn: ["キ"], readingsKun: ["しる.す"],
    meaningMnemonicFr: "NOTER - écrire, enregistrer des informations.",
    readingMnemonicFr: "キ (ki) - KEy notes, notes clés.", jlpt: 3, grade: 2 },
  { character: "予", meaningsFr: ["Avance", "Préalable"], readingsOn: ["ヨ"], readingsKun: ["あらかじ.め"],
    meaningMnemonicFr: "AVANCE - faire quelque chose à l'avance.",
    readingMnemonicFr: "ヨ (yo) - Yo, préparé d'avance!", jlpt: 3, grade: 3 },
  { character: "要", meaningsFr: ["Nécessaire", "Essentiel"], readingsOn: ["ヨウ"], readingsKun: ["い.る"],
    meaningMnemonicFr: "NÉCESSAIRE - ce qui est essentiel.",
    readingMnemonicFr: "ヨウ (yō) - YOU need it, c'est nécessaire.", jlpt: 3, grade: 4 },
  { character: "交", meaningsFr: ["Échanger", "Mélanger"], readingsOn: ["コウ"], readingsKun: ["まじ.わる", "ま.ぜる"],
    meaningMnemonicFr: "ÉCHANGER - croiser, mélanger ensemble.",
    readingMnemonicFr: "コウ (kō) - CROiser les chemins.", jlpt: 3, grade: 2 },
  { character: "所", meaningsFr: ["Lieu", "Endroit"], readingsOn: ["ショ"], readingsKun: ["ところ"],
    meaningMnemonicFr: "LIEU - un endroit, une place.",
    readingMnemonicFr: "ところ (tokoro) - TOKyo, un lieu.", jlpt: 3, grade: 3 },
  { character: "有", meaningsFr: ["Avoir", "Exister"], readingsOn: ["ユウ", "ウ"], readingsKun: ["あ.る"],
    meaningMnemonicFr: "AVOIR - posséder, exister.",
    readingMnemonicFr: "ユウ (yū) - YOU have it.", jlpt: 3, grade: 3 },
  { character: "向", meaningsFr: ["Direction", "Vers"], readingsOn: ["コウ"], readingsKun: ["む.く", "む.かう"],
    meaningMnemonicFr: "DIRECTION - se tourner vers, faire face.",
    readingMnemonicFr: "む.く (muku) - MOVing vers une direction.", jlpt: 3, grade: 3 },
  { character: "公", meaningsFr: ["Public", "Officiel"], readingsOn: ["コウ"], readingsKun: ["おおやけ"],
    meaningMnemonicFr: "PUBLIC - ce qui est officiel, ouvert à tous.",
    readingMnemonicFr: "コウ (kō) - COnnu du public.", jlpt: 3, grade: 2 },
  { character: "反", meaningsFr: ["Contre", "Opposé", "Retourner"], readingsOn: ["ハン", "ホン"], readingsKun: ["そ.る"],
    meaningMnemonicFr: "CONTRE - s'opposer, retourner.",
    readingMnemonicFr: "ハン (han) - HANdi-contre.", jlpt: 3, grade: 3 },
  { character: "由", meaningsFr: ["Raison", "Cause"], readingsOn: ["ユ", "ユウ"], readingsKun: ["よし"],
    meaningMnemonicFr: "RAISON - la cause de quelque chose.",
    readingMnemonicFr: "ユウ (yū) - YOU know the reason.", jlpt: 3, grade: 3 },
  { character: "美", meaningsFr: ["Beauté", "Beau"], readingsOn: ["ビ", "ミ"], readingsKun: ["うつく.しい"],
    meaningMnemonicFr: "BEAUTÉ - ce qui est beau, esthétique.",
    readingMnemonicFr: "ビ (bi) - BEAUty, beauté.", jlpt: 3, grade: 3 },
];

async function main() {
  console.log("=== ADDING MORE KANJI FOR VOCABULARY ===\n");

  let added = 0;
  for (const kanji of moreKanji) {
    try {
      // N3 kanji go to levels 21-30
      const level = 20 + Math.min(kanji.grade, 10);

      await prisma.kanji.create({
        data: {
          character: kanji.character,
          meaningsFr: kanji.meaningsFr,
          readingsOn: kanji.readingsOn,
          readingsKun: kanji.readingsKun,
          meaningMnemonicFr: kanji.meaningMnemonicFr,
          readingMnemonicFr: kanji.readingMnemonicFr,
          levelId: level,
          jlptLevel: kanji.jlpt,
          gradeLevel: kanji.grade,
        }
      });
      console.log(`Added: ${kanji.character} (${kanji.meaningsFr[0]}) - Level ${level}`);
      added++;
    } catch (e: any) {
      if (e.code === "P2002") {
        console.log(`Already exists: ${kanji.character}`);
      } else {
        console.log(`Error: ${e.message}`);
      }
    }
  }

  console.log(`\nAdded ${added} kanji`);
  const total = await prisma.kanji.count();
  console.log(`Total kanji: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
