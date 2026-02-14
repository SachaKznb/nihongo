import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Missing essential JLPT N5/N4 kanji that need to be added
const missingKanji = [
  // N5 missing
  { character: "万", meaningsFr: ["Dix mille"], readingsOn: ["マン", "バン"], readingsKun: [],
    meaningMnemonicFr: "DIX MILLE - un nombre immense. Imaginez dix mille étoiles dans le ciel.",
    readingMnemonicFr: "マン (man) comme dans 'un MAN de dix mille soldats'.", jlpt: 5, grade: 2 },
  { character: "午", meaningsFr: ["Midi"], readingsOn: ["ゴ"], readingsKun: [],
    meaningMnemonicFr: "MIDI - le soleil est au zénith. L'heure du déjeuner.",
    readingMnemonicFr: "ゴ (go) - à midi, on va (GO) manger.", jlpt: 5, grade: 2 },
  { character: "本", meaningsFr: ["Livre", "Origine", "Vrai"], readingsOn: ["ホン"], readingsKun: ["もと"],
    meaningMnemonicFr: "LIVRE - la source du savoir. Un arbre 木 avec une ligne à la base (origine).",
    readingMnemonicFr: "ホン (hon) comme dans 'HONnête' - un livre dit la vérité.", jlpt: 5, grade: 1 },

  // N4 missing - high priority
  { character: "文", meaningsFr: ["Texte", "Écriture", "Culture"], readingsOn: ["ブン", "モン"], readingsKun: ["ふみ"],
    meaningMnemonicFr: "TEXTE - des lignes croisées représentant l'écriture.",
    readingMnemonicFr: "ブン (bun) - un petit pain (BUN) avec du texte dessus.", jlpt: 4, grade: 1 },
  { character: "事", meaningsFr: ["Chose", "Affaire", "Fait"], readingsOn: ["ジ", "ズ"], readingsKun: ["こと"],
    meaningMnemonicFr: "CHOSE/AFFAIRE - les affaires du quotidien.",
    readingMnemonicFr: "こと (koto) - chaque CHOSE (koto) a son importance.", jlpt: 4, grade: 3 },
  { character: "方", meaningsFr: ["Direction", "Personne", "Manière"], readingsOn: ["ホウ"], readingsKun: ["かた"],
    meaningMnemonicFr: "DIRECTION - pointer vers une direction, une manière de faire.",
    readingMnemonicFr: "ホウ (hō) - HOW (comment) aller dans cette direction.", jlpt: 4, grade: 2 },
  { character: "者", meaningsFr: ["Personne", "Celui qui"], readingsOn: ["シャ"], readingsKun: ["もの"],
    meaningMnemonicFr: "PERSONNE - quelqu'un qui fait quelque chose, un acteur.",
    readingMnemonicFr: "シャ (sha) - une perSOHNne importante.", jlpt: 4, grade: 3 },
  { character: "自", meaningsFr: ["Soi-même", "Automatique"], readingsOn: ["ジ", "シ"], readingsKun: ["みずか.ら"],
    meaningMnemonicFr: "SOI-MÊME - se regarder dans un miroir, voir son propre nez.",
    readingMnemonicFr: "ジ (ji) - JE suis moi-même.", jlpt: 4, grade: 2 },
  { character: "不", meaningsFr: ["Non", "Négatif", "Pas"], readingsOn: ["フ", "ブ"], readingsKun: [],
    meaningMnemonicFr: "NON/NÉGATIF - le préfixe de négation, comme 'in-' en français.",
    readingMnemonicFr: "フ (fu) - FOU de dire non à tout.", jlpt: 4, grade: 4 },
  { character: "世", meaningsFr: ["Monde", "Génération"], readingsOn: ["セ", "セイ"], readingsKun: ["よ"],
    meaningMnemonicFr: "MONDE - trois générations (lignes) formant le monde.",
    readingMnemonicFr: "セ (se) - le monde en une SYllabe.", jlpt: 4, grade: 3 },
  { character: "主", meaningsFr: ["Maître", "Principal"], readingsOn: ["シュ"], readingsKun: ["ぬし", "おも"],
    meaningMnemonicFr: "MAÎTRE - celui qui dirige, le chef.",
    readingMnemonicFr: "シュ (shu) - le CHEF (shu) est le maître.", jlpt: 4, grade: 3 },
  { character: "仕", meaningsFr: ["Servir", "Travailler"], readingsOn: ["シ", "ジ"], readingsKun: ["つか.える"],
    meaningMnemonicFr: "SERVIR - une personne 亻 qui sert un samouraï 士.",
    readingMnemonicFr: "シ (shi) - SHIft de travail.", jlpt: 4, grade: 3 },
  { character: "代", meaningsFr: ["Génération", "Remplacer", "Époque"], readingsOn: ["ダイ", "タイ"], readingsKun: ["か.わる", "よ"],
    meaningMnemonicFr: "GÉNÉRATION - une personne 亻 et une lance 弋, les générations qui se succèdent.",
    readingMnemonicFr: "ダイ (dai) - la génération qui DIE (meurt) pour la suivante.", jlpt: 4, grade: 3 },
  { character: "以", meaningsFr: ["Avec", "Par", "Depuis"], readingsOn: ["イ"], readingsKun: [],
    meaningMnemonicFr: "AVEC/PAR - une particule pour indiquer le moyen ou le point de départ.",
    readingMnemonicFr: "イ (i) - I (je) commence depuis ici.", jlpt: 4, grade: 4 },
  { character: "元", meaningsFr: ["Origine", "Ancien", "Dollar"], readingsOn: ["ゲン", "ガン"], readingsKun: ["もと"],
    meaningMnemonicFr: "ORIGINE - deux jambes 儿 sous un toit, le point de départ.",
    readingMnemonicFr: "ゲン (gen) - le GÈNe, l'origine de tout.", jlpt: 4, grade: 2 },
  { character: "写", meaningsFr: ["Copier", "Photo"], readingsOn: ["シャ"], readingsKun: ["うつ.す"],
    meaningMnemonicFr: "COPIER - reproduire une image, prendre une photo.",
    readingMnemonicFr: "シャ (sha) - click du SHutter pour une photo.", jlpt: 4, grade: 3 },
  { character: "切", meaningsFr: ["Couper"], readingsOn: ["セツ", "サイ"], readingsKun: ["き.る"],
    meaningMnemonicFr: "COUPER - sept 七 et un couteau 刀.",
    readingMnemonicFr: "き.る (kiru) - KILL en coupant.", jlpt: 4, grade: 2 },
  { character: "去", meaningsFr: ["Partir", "Passé"], readingsOn: ["キョ", "コ"], readingsKun: ["さ.る"],
    meaningMnemonicFr: "PARTIR - la terre 土 et quelqu'un qui s'en va.",
    readingMnemonicFr: "キョ (kyo) - hier (passé) en japonais.", jlpt: 4, grade: 3 },
  { character: "台", meaningsFr: ["Plateforme", "Compteur"], readingsOn: ["ダイ", "タイ"], readingsKun: [],
    meaningMnemonicFr: "PLATEFORME - une estrade, un support.",
    readingMnemonicFr: "ダイ (dai) - un DIAble sur une plateforme.", jlpt: 4, grade: 2 },
  { character: "図", meaningsFr: ["Carte", "Schéma", "Plan"], readingsOn: ["ズ", "ト"], readingsKun: ["はか.る"],
    meaningMnemonicFr: "CARTE/SCHÉMA - un plan dans un cadre 囗.",
    readingMnemonicFr: "ズ (zu) - ZOOmer sur la carte.", jlpt: 4, grade: 2 },
  { character: "地", meaningsFr: ["Terre", "Sol"], readingsOn: ["チ", "ジ"], readingsKun: [],
    meaningMnemonicFr: "TERRE - le sol 土 qui s'étend.",
    readingMnemonicFr: "チ (chi) - la terre sous mes pieds (CHEE).", jlpt: 4, grade: 2 },
  { character: "場", meaningsFr: ["Lieu", "Place"], readingsOn: ["ジョウ"], readingsKun: ["ば"],
    meaningMnemonicFr: "LIEU - un endroit avec de la terre 土 et du soleil.",
    readingMnemonicFr: "ば (ba) - BAr, un lieu où boire.", jlpt: 4, grade: 2 },
  { character: "太", meaningsFr: ["Gros", "Grand"], readingsOn: ["タイ", "タ"], readingsKun: ["ふと.い"],
    meaningMnemonicFr: "GROS - grand 大 avec un point en plus.",
    readingMnemonicFr: "ふと.い (futoi) - trop FOU de manger, devenir gros.", jlpt: 4, grade: 2 },
  { character: "字", meaningsFr: ["Caractère", "Lettre"], readingsOn: ["ジ"], readingsKun: ["あざ"],
    meaningMnemonicFr: "CARACTÈRE - un enfant 子 sous un toit 宀 qui apprend à écrire.",
    readingMnemonicFr: "ジ (ji) - les caractères du japonais (JI).", jlpt: 4, grade: 1 },
  { character: "室", meaningsFr: ["Pièce", "Chambre"], readingsOn: ["シツ"], readingsKun: ["むろ"],
    meaningMnemonicFr: "PIÈCE - une chambre sous un toit 宀.",
    readingMnemonicFr: "シツ (shitsu) - une pièce où on SIT.", jlpt: 4, grade: 2 },
  { character: "屋", meaningsFr: ["Boutique", "Maison"], readingsOn: ["オク"], readingsKun: ["や"],
    meaningMnemonicFr: "BOUTIQUE/MAISON - un bâtiment avec un toit.",
    readingMnemonicFr: "や (ya) - YA une maison là-bas.", jlpt: 4, grade: 3 },
  { character: "広", meaningsFr: ["Large", "Vaste"], readingsOn: ["コウ"], readingsKun: ["ひろ.い"],
    meaningMnemonicFr: "LARGE - un espace vaste sous un toit.",
    readingMnemonicFr: "ひろ.い (hiroi) - un HERO dans un vaste espace.", jlpt: 4, grade: 2 },
  { character: "度", meaningsFr: ["Degré", "Fois"], readingsOn: ["ド", "ト"], readingsKun: ["たび"],
    meaningMnemonicFr: "DEGRÉ - mesurer l'angle, le nombre de fois.",
    readingMnemonicFr: "ド (do) - DO-uze degrés.", jlpt: 4, grade: 3 },
  { character: "弱", meaningsFr: ["Faible"], readingsOn: ["ジャク"], readingsKun: ["よわ.い"],
    meaningMnemonicFr: "FAIBLE - deux arcs 弓 qui ne peuvent pas tirer.",
    readingMnemonicFr: "よわ.い (yowai) - YOWL faiblement.", jlpt: 4, grade: 2 },
  { character: "服", meaningsFr: ["Vêtement"], readingsOn: ["フク"], readingsKun: [],
    meaningMnemonicFr: "VÊTEMENT - ce qu'on porte sur le corps.",
    readingMnemonicFr: "フク (fuku) - FUCK c'est cher ce vêtement!", jlpt: 4, grade: 3 },
  { character: "正", meaningsFr: ["Correct", "Juste"], readingsOn: ["セイ", "ショウ"], readingsKun: ["ただ.しい"],
    meaningMnemonicFr: "CORRECT - arrêter 止 à la ligne parfaite.",
    readingMnemonicFr: "セイ (sei) - SEI (say) la vérité, sois correct.", jlpt: 4, grade: 1 },
  { character: "漢", meaningsFr: ["Chinois", "Han"], readingsOn: ["カン"], readingsKun: [],
    meaningMnemonicFr: "CHINOIS - les caractères venus de Chine.",
    readingMnemonicFr: "カン (kan) - les KANji viennent de Chine.", jlpt: 4, grade: 3 },
  { character: "発", meaningsFr: ["Émettre", "Partir", "Développer"], readingsOn: ["ハツ", "ホツ"], readingsKun: [],
    meaningMnemonicFr: "ÉMETTRE/PARTIR - envoyer quelque chose, partir.",
    readingMnemonicFr: "ハツ (hatsu) - HATS off quand on part.", jlpt: 4, grade: 3 },
  { character: "研", meaningsFr: ["Polir", "Étudier"], readingsOn: ["ケン"], readingsKun: ["と.ぐ"],
    meaningMnemonicFr: "POLIR/ÉTUDIER - affiner ses connaissances comme on polit une pierre.",
    readingMnemonicFr: "ケン (ken) - KEN étudie beaucoup.", jlpt: 4, grade: 3 },
  { character: "私", meaningsFr: ["Je", "Privé"], readingsOn: ["シ"], readingsKun: ["わたし", "わたくし"],
    meaningMnemonicFr: "JE/PRIVÉ - moi-même, mon domaine privé.",
    readingMnemonicFr: "わたし (watashi) - WHAT-a-SHI (je).", jlpt: 4, grade: 6 },
  { character: "究", meaningsFr: ["Recherche", "Étudier à fond"], readingsOn: ["キュウ"], readingsKun: ["きわ.める"],
    meaningMnemonicFr: "RECHERCHE - approfondir un sujet jusqu'au bout.",
    readingMnemonicFr: "キュウ (kyū) - CUE pour chercher plus loin.", jlpt: 4, grade: 3 },
  { character: "試", meaningsFr: ["Essayer", "Tester"], readingsOn: ["シ"], readingsKun: ["こころ.みる", "ため.す"],
    meaningMnemonicFr: "ESSAYER - faire un test, tenter quelque chose.",
    readingMnemonicFr: "シ (shi) - SHE essaie de nouveau.", jlpt: 4, grade: 4 },
  { character: "近", meaningsFr: ["Proche"], readingsOn: ["キン"], readingsKun: ["ちか.い"],
    meaningMnemonicFr: "PROCHE - à une distance rapprochée.",
    readingMnemonicFr: "ちか.い (chikai) - CHICAgo est proche.", jlpt: 4, grade: 2 },
  { character: "通", meaningsFr: ["Passer", "Traverser", "Commun"], readingsOn: ["ツウ", "ツ"], readingsKun: ["とお.る", "かよ.う"],
    meaningMnemonicFr: "PASSER - traverser un chemin.",
    readingMnemonicFr: "つう (tsū) - TWO (deux) personnes qui passent.", jlpt: 4, grade: 2 },
  { character: "進", meaningsFr: ["Avancer", "Progresser"], readingsOn: ["シン"], readingsKun: ["すす.む"],
    meaningMnemonicFr: "AVANCER - faire des progrès, aller de l'avant.",
    readingMnemonicFr: "シン (shin) - SHIN (jambe) qui avance.", jlpt: 4, grade: 3 },
  { character: "運", meaningsFr: ["Transporter", "Chance", "Destin"], readingsOn: ["ウン"], readingsKun: ["はこ.ぶ"],
    meaningMnemonicFr: "TRANSPORTER/CHANCE - porter quelque chose, le destin.",
    readingMnemonicFr: "ウン (un) - UN coup de chance.", jlpt: 4, grade: 3 },
  { character: "重", meaningsFr: ["Lourd", "Important"], readingsOn: ["ジュウ", "チョウ"], readingsKun: ["おも.い", "かさ.ねる"],
    meaningMnemonicFr: "LOURD - quelque chose de pesant, d'important.",
    readingMnemonicFr: "おも.い (omoi) - OH MOI, c'est lourd!", jlpt: 4, grade: 3 },
  { character: "院", meaningsFr: ["Institution", "Temple"], readingsOn: ["イン"], readingsKun: [],
    meaningMnemonicFr: "INSTITUTION - un bâtiment officiel (hôpital, temple).",
    readingMnemonicFr: "イン (in) - IN l'institution.", jlpt: 4, grade: 3 },
];

async function main() {
  console.log("=== ADDING MISSING ESSENTIAL KANJI ===\n");

  let added = 0;
  for (const kanji of missingKanji) {
    try {
      // Find appropriate level based on JLPT/grade
      // N5 = levels 1-10, N4 = levels 11-20
      const level = kanji.jlpt === 5 ? Math.min(kanji.grade, 10) : 10 + Math.min(kanji.grade, 10);

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
        console.log(`Error adding ${kanji.character}: ${e.message}`);
      }
    }
  }

  console.log(`\nAdded ${added} kanji`);

  const totalKanji = await prisma.kanji.count();
  console.log(`Total kanji now: ${totalKanji}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
