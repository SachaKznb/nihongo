import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final batch to exceed 2000 kanji - need ~170 more
const kanjiData = [
  // Common everyday kanji
  { character: "俺", meaningsFr: ["Je (masculin)"], readingsOn: [], readingsKun: ["おれ"], meaningMnemonicFr: "La personne + l'une = JE (masculin).", readingMnemonicFr: "ORE - je.", levelId: 51 },
  { character: "僕", meaningsFr: ["Je (humble)"], readingsOn: ["ボク"], readingsKun: [], meaningMnemonicFr: "La personne + le serviteur = JE (humble).", readingMnemonicFr: "BOKU - je.", levelId: 52 },
  { character: "奴", meaningsFr: ["Type"], readingsOn: ["ド"], readingsKun: ["やつ"], meaningMnemonicFr: "La grande + la femme = TYPE.", readingMnemonicFr: "YATSU - type.", levelId: 53 },
  { character: "彼", meaningsFr: ["Il"], readingsOn: ["ヒ"], readingsKun: ["かれ"], meaningMnemonicFr: "La marche + la peau = IL.", readingMnemonicFr: "KARE - il.", levelId: 54 },
  { character: "彼女", meaningsFr: ["Elle"], readingsOn: ["カノジョ"], readingsKun: [], meaningMnemonicFr: "Il + femme = ELLE.", readingMnemonicFr: "KANOJO - elle.", levelId: 55 },
  { character: "貴", meaningsFr: ["Noble"], readingsOn: ["キ"], readingsKun: ["とうと-い"], meaningMnemonicFr: "Le roi + la coquille = NOBLE.", readingMnemonicFr: "TOUTOI - noble.", levelId: 56 },
  { character: "卑", meaningsFr: ["Humble"], readingsOn: ["ヒ"], readingsKun: ["いや-しい"], meaningMnemonicFr: "Le un + le champ = HUMBLE.", readingMnemonicFr: "IYASHII - humble.", levelId: 57 },
  { character: "賤", meaningsFr: ["Bas"], readingsOn: ["セン"], readingsKun: ["いや-しい"], meaningMnemonicFr: "La coquille + le combat = BAS.", readingMnemonicFr: "SEN - bas.", levelId: 58 },
  { character: "庶", meaningsFr: ["Commun"], readingsOn: ["ショ"], readingsKun: [], meaningMnemonicFr: "Le toit + le pierre = COMMUN.", readingMnemonicFr: "SHO - commun.", levelId: 59 },
  { character: "衆", meaningsFr: ["Foule"], readingsOn: ["シュウ"], readingsKun: [], meaningMnemonicFr: "Les yeux + les gens = FOULE.", readingMnemonicFr: "SHUU - foule.", levelId: 60 },

  // Actions and verbs
  { character: "抜", meaningsFr: ["Extraire"], readingsOn: ["バツ"], readingsKun: ["ぬ-く"], meaningMnemonicFr: "La main + les amis = EXTRAIRE.", readingMnemonicFr: "NUKU - extraire.", levelId: 51 },
  { character: "挿", meaningsFr: ["Insérer"], readingsOn: ["ソウ"], readingsKun: ["さ-す"], meaningMnemonicFr: "La main + le mille = INSÉRER.", readingMnemonicFr: "SASU - insérer.", levelId: 52 },
  { character: "据", meaningsFr: ["Installer"], readingsOn: ["キョ"], readingsKun: ["す-える"], meaningMnemonicFr: "La main + le habiter = INSTALLER.", readingMnemonicFr: "SUERU - installer.", levelId: 53 },
  { character: "控", meaningsFr: ["Retenir"], readingsOn: ["コウ"], readingsKun: ["ひか-える"], meaningMnemonicFr: "La main + le vide = RETENIR.", readingMnemonicFr: "HIKAERU - retenir.", levelId: 54 },
  { character: "掌", meaningsFr: ["Paume"], readingsOn: ["ショウ"], readingsKun: ["てのひら"], meaningMnemonicFr: "Le haut + la main = PAUME.", readingMnemonicFr: "TENOHIRA - paume.", levelId: 55 },
  { character: "握", meaningsFr: ["Saisir"], readingsOn: ["アク"], readingsKun: ["にぎ-る"], meaningMnemonicFr: "La main + le toit = SAISIR.", readingMnemonicFr: "NIGIRU - saisir.", levelId: 56 },
  { character: "揮", meaningsFr: ["Brandir"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "La main + le soleil = BRANDIR.", readingMnemonicFr: "KI - brandir.", levelId: 57 },
  { character: "振", meaningsFr: ["Secouer"], readingsOn: ["シン"], readingsKun: ["ふ-る"], meaningMnemonicFr: "La main + le matin = SECOUER.", readingMnemonicFr: "FURU - secouer.", levelId: 58 },
  { character: "搬", meaningsFr: ["Transporter"], readingsOn: ["ハン"], readingsKun: [], meaningMnemonicFr: "La main + le général = TRANSPORTER.", readingMnemonicFr: "HAN - transporter.", levelId: 59 },
  { character: "撤", meaningsFr: ["Retirer"], readingsOn: ["テツ"], readingsKun: [], meaningMnemonicFr: "La main + l'éducation = RETIRER.", readingMnemonicFr: "TETSU - retirer.", levelId: 60 },

  // More verbs
  { character: "遂", meaningsFr: ["Accomplir"], readingsOn: ["スイ"], readingsKun: ["と-げる"], meaningMnemonicFr: "L'avance + le cochon = ACCOMPLIR.", readingMnemonicFr: "TOGERU - accomplir.", levelId: 51 },
  { character: "遣", meaningsFr: ["Envoyer"], readingsOn: ["ケン"], readingsKun: ["つか-う"], meaningMnemonicFr: "L'avance + le officiel = ENVOYER.", readingMnemonicFr: "TSUKAU - utiliser.", levelId: 52 },
  { character: "遇", meaningsFr: ["Rencontrer"], readingsOn: ["グウ"], readingsKun: [], meaningMnemonicFr: "L'avance + le coin = RENCONTRER.", readingMnemonicFr: "GUU - rencontrer.", levelId: 53 },
  { character: "遍", meaningsFr: ["Partout"], readingsOn: ["ヘン"], readingsKun: [], meaningMnemonicFr: "L'avance + le plat = PARTOUT.", readingMnemonicFr: "HEN - partout.", levelId: 54 },
  { character: "遮", meaningsFr: ["Bloquer"], readingsOn: ["シャ"], readingsKun: ["さえぎ-る"], meaningMnemonicFr: "L'avance + la maison = BLOQUER.", readingMnemonicFr: "SAEGIRU - bloquer.", levelId: 55 },
  { character: "遭", meaningsFr: ["Rencontrer"], readingsOn: ["ソウ"], readingsKun: ["あ-う"], meaningMnemonicFr: "L'avance + le haut = RENCONTRER.", readingMnemonicFr: "AU - rencontrer.", levelId: 56 },
  { character: "邁", meaningsFr: ["Avancer"], readingsOn: ["マイ"], readingsKun: [], meaningMnemonicFr: "L'avance + le dix mille = AVANCER.", readingMnemonicFr: "MAI - avancer.", levelId: 57 },
  { character: "逸", meaningsFr: ["Échapper"], readingsOn: ["イツ"], readingsKun: [], meaningMnemonicFr: "L'avance + le lapin = ÉCHAPPER.", readingMnemonicFr: "ITSU - échapper.", levelId: 58 },
  { character: "逝", meaningsFr: ["Mourir"], readingsOn: ["セイ"], readingsKun: ["ゆ-く"], meaningMnemonicFr: "L'avance + le reflet = MOURIR.", readingMnemonicFr: "YUKU - mourir.", levelId: 59 },
  { character: "逓", meaningsFr: ["Transmettre"], readingsOn: ["テイ"], readingsKun: [], meaningMnemonicFr: "L'avance + le frère = TRANSMETTRE.", readingMnemonicFr: "TEI - transmettre.", levelId: 60 },

  // Nature and weather
  { character: "曇", meaningsFr: ["Nuageux"], readingsOn: ["ドン"], readingsKun: ["くも-る"], meaningMnemonicFr: "Le soleil + le nuage = NUAGEUX.", readingMnemonicFr: "KUMORU - se couvrir.", levelId: 51 },
  { character: "曖", meaningsFr: ["Ambigu"], readingsOn: ["アイ"], readingsKun: [], meaningMnemonicFr: "Le soleil + le amour = AMBIGU.", readingMnemonicFr: "AI - ambigu.", levelId: 52 },
  { character: "昧", meaningsFr: ["Sombre"], readingsOn: ["マイ"], readingsKun: [], meaningMnemonicFr: "Le soleil + le pas encore = SOMBRE.", readingMnemonicFr: "MAI - sombre.", levelId: 53 },
  { character: "曜", meaningsFr: ["Jour"], readingsOn: ["ヨウ"], readingsKun: [], meaningMnemonicFr: "Le soleil + le plume = JOUR.", readingMnemonicFr: "YOU - jour.", levelId: 54 },
  { character: "暫", meaningsFr: ["Temporaire"], readingsOn: ["ザン"], readingsKun: ["しばら-く"], meaningMnemonicFr: "Le soleil + le voiture = TEMPORAIRE.", readingMnemonicFr: "SHIBARAKU - temporaire.", levelId: 55 },
  { character: "暦", meaningsFr: ["Calendrier"], readingsOn: ["レキ"], readingsKun: ["こよみ"], meaningMnemonicFr: "Le soleil + le pas = CALENDRIER.", readingMnemonicFr: "KOYOMI - calendrier.", levelId: 56 },
  { character: "旦", meaningsFr: ["Matin"], readingsOn: ["タン"], readingsKun: [], meaningMnemonicFr: "Le soleil + le un = MATIN.", readingMnemonicFr: "TAN - matin.", levelId: 57 },
  { character: "旬", meaningsFr: ["Décade"], readingsOn: ["ジュン"], readingsKun: [], meaningMnemonicFr: "Le paquet + le soleil = DÉCADE.", readingMnemonicFr: "JUN - décade.", levelId: 58 },
  { character: "昇", meaningsFr: ["Monter"], readingsOn: ["ショウ"], readingsKun: ["のぼ-る"], meaningMnemonicFr: "Le soleil + le mesure = MONTER.", readingMnemonicFr: "NOBORU - monter.", levelId: 59 },
  { character: "昂", meaningsFr: ["Élever"], readingsOn: ["コウ"], readingsKun: [], meaningMnemonicFr: "Le soleil + le haut = ÉLEVER.", readingMnemonicFr: "KOU - élever.", levelId: 60 },

  // More unique kanji
  { character: "肯", meaningsFr: ["Affirmer"], readingsOn: ["コウ"], readingsKun: [], meaningMnemonicFr: "Le arrêter + la chair = AFFIRMER.", readingMnemonicFr: "KOU - affirmer.", levelId: 51 },
  { character: "否", meaningsFr: ["Nier"], readingsOn: ["ヒ"], readingsKun: ["いな"], meaningMnemonicFr: "Le non + la bouche = NIER.", readingMnemonicFr: "INA - non.", levelId: 52 },
  { character: "拒", meaningsFr: ["Refuser"], readingsOn: ["キョ"], readingsKun: ["こば-む"], meaningMnemonicFr: "La main + le grand = REFUSER.", readingMnemonicFr: "KOBAMU - refuser.", levelId: 53 },
  { character: "承", meaningsFr: ["Accepter"], readingsOn: ["ショウ"], readingsKun: ["うけたまわ-る"], meaningMnemonicFr: "Les mains + le trois = ACCEPTER.", readingMnemonicFr: "UKETAMAWARU - accepter.", levelId: 54 },
  { character: "諾", meaningsFr: ["Consentir"], readingsOn: ["ダク"], readingsKun: [], meaningMnemonicFr: "Les mots + le jeune = CONSENTIR.", readingMnemonicFr: "DAKU - consentir.", levelId: 55 },
  { character: "允", meaningsFr: ["Permettre"], readingsOn: ["イン"], readingsKun: [], meaningMnemonicFr: "Le paquet + le enfant = PERMETTRE.", readingMnemonicFr: "IN - permettre.", levelId: 56 },
  { character: "准", meaningsFr: ["Approuver"], readingsOn: ["ジュン"], readingsKun: [], meaningMnemonicFr: "La glace + le court = APPROUVER.", readingMnemonicFr: "JUN - approuver.", levelId: 57 },
  { character: "凖", meaningsFr: ["Standard"], readingsOn: ["ジュン"], readingsKun: [], meaningMnemonicFr: "La glace + le standard = STANDARD.", readingMnemonicFr: "JUN - standard.", levelId: 58 },
  { character: "是", meaningsFr: ["Correct"], readingsOn: ["ゼ"], readingsKun: [], meaningMnemonicFr: "Le soleil + le correct = CORRECT.", readingMnemonicFr: "ZE - correct.", levelId: 59 },
  { character: "非", meaningsFr: ["Non"], readingsOn: ["ヒ"], readingsKun: [], meaningMnemonicFr: "Les deux = NON.", readingMnemonicFr: "HI - non.", levelId: 60 },

  // Common characters
  { character: "玄", meaningsFr: ["Mystérieux"], readingsOn: ["ゲン"], readingsKun: [], meaningMnemonicFr: "Le toit + le fil = MYSTÉRIEUX.", readingMnemonicFr: "GEN - mystérieux.", levelId: 51 },
  { character: "奥", meaningsFr: ["Profond"], readingsOn: ["オウ"], readingsKun: ["おく"], meaningMnemonicFr: "Le grand + le riz = PROFOND.", readingMnemonicFr: "OKU - profond.", levelId: 52 },
  { character: "秘", meaningsFr: ["Secret"], readingsOn: ["ヒ"], readingsKun: ["ひ-める"], meaningMnemonicFr: "Le riz + le nécessaire = SECRET.", readingMnemonicFr: "HI - secret.", levelId: 53 },
  { character: "密", meaningsFr: ["Dense"], readingsOn: ["ミツ"], readingsKun: [], meaningMnemonicFr: "Le toit + le montagne + le nécessaire = DENSE.", readingMnemonicFr: "MITSU - dense.", levelId: 54 },
  { character: "隠", meaningsFr: ["Cacher"], readingsOn: ["イン"], readingsKun: ["かく-す"], meaningMnemonicFr: "La colline + le cœur = CACHER.", readingMnemonicFr: "KAKUSU - cacher.", levelId: 55 },
  { character: "匿", meaningsFr: ["Dissimuler"], readingsOn: ["トク"], readingsKun: [], meaningMnemonicFr: "L'enclos + le jeune = DISSIMULER.", readingMnemonicFr: "TOKU - dissimuler.", levelId: 56 },
  { character: "蔽", meaningsFr: ["Couvrir"], readingsOn: ["ヘイ"], readingsKun: ["おお-う"], meaningMnemonicFr: "La plante + le chien = COUVRIR.", readingMnemonicFr: "OOU - couvrir.", levelId: 57 },
  { character: "覆", meaningsFr: ["Renverser"], readingsOn: ["フク"], readingsKun: ["おお-う"], meaningMnemonicFr: "L'ouest + le revenir = RENVERSER.", readingMnemonicFr: "OOU - renverser.", levelId: 58 },
  { character: "被", meaningsFr: ["Subir"], readingsOn: ["ヒ"], readingsKun: ["こうむ-る"], meaningMnemonicFr: "La robe + la peau = SUBIR.", readingMnemonicFr: "KOUMURU - subir.", levelId: 59 },
  { character: "披", meaningsFr: ["Ouvrir"], readingsOn: ["ヒ"], readingsKun: [], meaningMnemonicFr: "La main + la peau = OUVRIR.", readingMnemonicFr: "HI - ouvrir.", levelId: 60 },

  // Additional unique kanji
  { character: "嘘", meaningsFr: ["Mensonge"], readingsOn: ["キョ"], readingsKun: ["うそ"], meaningMnemonicFr: "La bouche + le tigre = MENSONGE.", readingMnemonicFr: "USO - mensonge.", levelId: 51 },
  { character: "偽", meaningsFr: ["Faux"], readingsOn: ["ギ"], readingsKun: ["いつわ-る"], meaningMnemonicFr: "La personne + le faire = FAUX.", readingMnemonicFr: "ITSUWARU - mentir.", levelId: 52 },
  { character: "詐", meaningsFr: ["Fraude"], readingsOn: ["サ"], readingsKun: [], meaningMnemonicFr: "Les mots + le hier = FRAUDE.", readingMnemonicFr: "SA - fraude.", levelId: 53 },
  { character: "欺", meaningsFr: ["Tromper"], readingsOn: ["ギ"], readingsKun: ["あざむ-く"], meaningMnemonicFr: "La période + le manque = TROMPER.", readingMnemonicFr: "AZAMUKU - tromper.", levelId: 54 },
  { character: "騙", meaningsFr: ["Duper"], readingsOn: ["ヘン"], readingsKun: ["だま-す"], meaningMnemonicFr: "Le cheval + le plat = DUPER.", readingMnemonicFr: "DAMASU - duper.", levelId: 55 },
  { character: "謀", meaningsFr: ["Complot"], readingsOn: ["ボウ"], readingsKun: ["はか-る"], meaningMnemonicFr: "Les mots + le quelque = COMPLOT.", readingMnemonicFr: "HAKARU - comploter.", levelId: 56 },
  { character: "陰", meaningsFr: ["Ombre"], readingsOn: ["イン"], readingsKun: ["かげ"], meaningMnemonicFr: "La colline + le maintenant = OMBRE.", readingMnemonicFr: "KAGE - ombre.", levelId: 57 },
  { character: "陽", meaningsFr: ["Soleil"], readingsOn: ["ヨウ"], readingsKun: ["ひ"], meaningMnemonicFr: "La colline + le soleil = SOLEIL.", readingMnemonicFr: "HI - soleil.", levelId: 58 },
  { character: "陵", meaningsFr: ["Colline"], readingsOn: ["リョウ"], readingsKun: ["みささぎ"], meaningMnemonicFr: "La colline + le passage = COLLINE.", readingMnemonicFr: "MISASAGI - tombeau.", levelId: 59 },
  { character: "陸", meaningsFr: ["Terre"], readingsOn: ["リク"], readingsKun: [], meaningMnemonicFr: "La colline + le terre = TERRE.", readingMnemonicFr: "RIKU - terre.", levelId: 60 },

  // Final batch to exceed 2000
  { character: "陥", meaningsFr: ["Tomber"], readingsOn: ["カン"], readingsKun: ["おちい-る"], meaningMnemonicFr: "La colline + le tomber = TOMBER.", readingMnemonicFr: "OCHIIRU - tomber.", levelId: 51 },
  { character: "隆", meaningsFr: ["Prospérer"], readingsOn: ["リュウ"], readingsKun: [], meaningMnemonicFr: "La colline + le vie = PROSPÉRER.", readingMnemonicFr: "RYU - prospérer.", levelId: 52 },
  { character: "隊", meaningsFr: ["Troupe"], readingsOn: ["タイ"], readingsKun: [], meaningMnemonicFr: "La colline + le cochon = TROUPE.", readingMnemonicFr: "TAI - troupe.", levelId: 53 },
  { character: "階", meaningsFr: ["Étage"], readingsOn: ["カイ"], readingsKun: [], meaningMnemonicFr: "La colline + le tous = ÉTAGE.", readingMnemonicFr: "KAI - étage.", levelId: 54 },
  { character: "隔", meaningsFr: ["Séparer"], readingsOn: ["カク"], readingsKun: ["へだ-てる"], meaningMnemonicFr: "La colline + le cadre = SÉPARER.", readingMnemonicFr: "HEDATERU - séparer.", levelId: 55 },
  { character: "際", meaningsFr: ["Occasion"], readingsOn: ["サイ"], readingsKun: ["きわ"], meaningMnemonicFr: "La colline + le sacrifice = OCCASION.", readingMnemonicFr: "KIWA - bord.", levelId: 56 },
  { character: "障", meaningsFr: ["Obstacle"], readingsOn: ["ショウ"], readingsKun: ["さわ-る"], meaningMnemonicFr: "La colline + le chapitre = OBSTACLE.", readingMnemonicFr: "SAWARU - gêner.", levelId: 57 },
  { character: "隣", meaningsFr: ["Voisin"], readingsOn: ["リン"], readingsKun: ["となり"], meaningMnemonicFr: "La colline + le riz = VOISIN.", readingMnemonicFr: "TONARI - voisin.", levelId: 58 },
  { character: "隠", meaningsFr: ["Cacher"], readingsOn: ["イン"], readingsKun: ["かく-す"], meaningMnemonicFr: "La colline + le main = CACHER.", readingMnemonicFr: "KAKUSU - cacher.", levelId: 59 },
  { character: "隷", meaningsFr: ["Esclave"], readingsOn: ["レイ"], readingsKun: [], meaningMnemonicFr: "La colline + le riz + le eau = ESCLAVE.", readingMnemonicFr: "REI - esclave.", levelId: 60 },
];

async function main() {
  console.log("Seeding final kanji batch 6 to exceed 2000...");

  for (const kanji of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonicFr,
        readingMnemonicFr: kanji.readingMnemonicFr,
        levelId: kanji.levelId,
      },
      create: kanji,
    });
  }

  console.log(`Seeded ${kanjiData.length} kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
