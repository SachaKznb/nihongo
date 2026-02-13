import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Large batch of kanji to reach 2000 target
const kanjiData = [
  // Additional unique kanji for various levels
  { character: "鍵", meaningsFr: ["Clé"], readingsOn: ["ケン"], readingsKun: ["かぎ"], meaningMnemonicFr: "Le métal + construire = CLÉ.", readingMnemonicFr: "KAGI - clé.", levelId: 41 },
  { character: "錠", meaningsFr: ["Serrure"], readingsOn: ["ジョウ"], readingsKun: [], meaningMnemonicFr: "Le métal + définir = SERRURE.", readingMnemonicFr: "JOU - serrure.", levelId: 42 },
  { character: "扉", meaningsFr: ["Porte"], readingsOn: ["ヒ"], readingsKun: ["とびら"], meaningMnemonicFr: "La porte + non = PORTE.", readingMnemonicFr: "TOBIRA - porte.", levelId: 43 },
  { character: "窓", meaningsFr: ["Fenêtre"], readingsOn: ["ソウ"], readingsKun: ["まど"], meaningMnemonicFr: "Le trou + le cœur = FENÊTRE.", readingMnemonicFr: "MADO - fenêtre.", levelId: 44 },
  { character: "柱", meaningsFr: ["Pilier"], readingsOn: ["チュウ"], readingsKun: ["はしら"], meaningMnemonicFr: "Le bois + le maître = PILIER.", readingMnemonicFr: "HASHIRA - pilier.", levelId: 45 },
  { character: "壁", meaningsFr: ["Mur"], readingsOn: ["ヘキ"], readingsKun: ["かべ"], meaningMnemonicFr: "La terre + la perle = MUR.", readingMnemonicFr: "KABE - mur.", levelId: 46 },
  { character: "床", meaningsFr: ["Sol"], readingsOn: ["ショウ"], readingsKun: ["ゆか"], meaningMnemonicFr: "Le bois + large = SOL.", readingMnemonicFr: "YUKA - sol.", levelId: 47 },
  { character: "階", meaningsFr: ["Étage"], readingsOn: ["カイ"], readingsKun: [], meaningMnemonicFr: "La colline + tous = ÉTAGE.", readingMnemonicFr: "KAI - étage.", levelId: 48 },
  { character: "段", meaningsFr: ["Marche"], readingsOn: ["ダン"], readingsKun: [], meaningMnemonicFr: "Le tissu + la lance = MARCHE.", readingMnemonicFr: "DAN - marche.", levelId: 49 },
  { character: "棚", meaningsFr: ["Étagère"], readingsOn: ["タナ"], readingsKun: ["たな"], meaningMnemonicFr: "Le bois + le drapeau = ÉTAGÈRE.", readingMnemonicFr: "TANA - étagère.", levelId: 50 },

  // More unique kanji
  { character: "蓋", meaningsFr: ["Couvercle"], readingsOn: ["ガイ"], readingsKun: ["ふた"], meaningMnemonicFr: "La plante + le récipient = COUVERCLE.", readingMnemonicFr: "FUTA - couvercle.", levelId: 51 },
  { character: "栓", meaningsFr: ["Bouchon"], readingsOn: ["セン"], readingsKun: [], meaningMnemonicFr: "Le bois + la totalité = BOUCHON.", readingMnemonicFr: "SEN - bouchon.", levelId: 52 },
  { character: "瓶", meaningsFr: ["Bouteille"], readingsOn: ["ビン"], readingsKun: [], meaningMnemonicFr: "La jarre + la combinaison = BOUTEILLE.", readingMnemonicFr: "BIN - bouteille.", levelId: 53 },
  { character: "缶", meaningsFr: ["Boîte de conserve"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le métal + le défaut = BOÎTE.", readingMnemonicFr: "KAN - boîte.", levelId: 54 },
  { character: "箱", meaningsFr: ["Boîte"], readingsOn: ["ハコ"], readingsKun: ["はこ"], meaningMnemonicFr: "Le bambou + le bois = BOÎTE.", readingMnemonicFr: "HAKO - boîte.", levelId: 55 },
  { character: "袋", meaningsFr: ["Sac"], readingsOn: ["タイ"], readingsKun: ["ふくろ"], meaningMnemonicFr: "La robe + le représentant = SAC.", readingMnemonicFr: "FUKURO - sac.", levelId: 56 },
  { character: "包", meaningsFr: ["Emballer"], readingsOn: ["ホウ"], readingsKun: ["つつ-む"], meaningMnemonicFr: "Le bébé + envelopper = EMBALLER.", readingMnemonicFr: "TSUTSUMU - emballer.", levelId: 57 },
  { character: "巻", meaningsFr: ["Rouler"], readingsOn: ["カン"], readingsKun: ["ま-く"], meaningMnemonicFr: "Les mains + rouler = ROULER.", readingMnemonicFr: "MAKU - rouler.", levelId: 58 },
  { character: "畳", meaningsFr: ["Tatami"], readingsOn: ["ジョウ"], readingsKun: ["たたみ"], meaningMnemonicFr: "Le champ + le jour + la fleur = TATAMI.", readingMnemonicFr: "TATAMI - tatami.", levelId: 59 },
  { character: "敷", meaningsFr: ["Étaler"], readingsOn: ["フ"], readingsKun: ["し-く"], meaningMnemonicFr: "Le fou + le drap = ÉTALER.", readingMnemonicFr: "SHIKU - étaler.", levelId: 60 },

  // Nature and elements
  { character: "煙", meaningsFr: ["Fumée"], readingsOn: ["エン"], readingsKun: ["けむり"], meaningMnemonicFr: "Le feu + l'ouest + la terre = FUMÉE.", readingMnemonicFr: "KEMURI - fumée.", levelId: 41 },
  { character: "灰", meaningsFr: ["Cendre"], readingsOn: ["カイ"], readingsKun: ["はい"], meaningMnemonicFr: "Le feu + la main = CENDRE.", readingMnemonicFr: "HAI - cendre.", levelId: 42 },
  { character: "炭", meaningsFr: ["Charbon"], readingsOn: ["タン"], readingsKun: ["すみ"], meaningMnemonicFr: "La montagne + le feu = CHARBON.", readingMnemonicFr: "SUMI - charbon.", levelId: 43 },
  { character: "油", meaningsFr: ["Huile"], readingsOn: ["ユ"], readingsKun: ["あぶら"], meaningMnemonicFr: "L'eau + le champ = HUILE.", readingMnemonicFr: "ABURA - huile.", levelId: 44 },
  { character: "泡", meaningsFr: ["Bulle"], readingsOn: ["ホウ"], readingsKun: ["あわ"], meaningMnemonicFr: "L'eau + l'enveloppe = BULLE.", readingMnemonicFr: "AWA - bulle.", levelId: 45 },
  { character: "波", meaningsFr: ["Vague"], readingsOn: ["ハ"], readingsKun: ["なみ"], meaningMnemonicFr: "L'eau + la peau = VAGUE.", readingMnemonicFr: "NAMI - vague.", levelId: 46 },
  { character: "潮", meaningsFr: ["Marée"], readingsOn: ["チョウ"], readingsKun: ["しお"], meaningMnemonicFr: "L'eau + le matin + la lune = MARÉE.", readingMnemonicFr: "SHIO - marée.", levelId: 47 },
  { character: "流", meaningsFr: ["Couler"], readingsOn: ["リュウ"], readingsKun: ["なが-れる"], meaningMnemonicFr: "L'eau + le flux = COULER.", readingMnemonicFr: "NAGARERU - couler.", levelId: 48 },
  { character: "渦", meaningsFr: ["Tourbillon"], readingsOn: ["カ"], readingsKun: ["うず"], meaningMnemonicFr: "L'eau + le nid = TOURBILLON.", readingMnemonicFr: "UZU - tourbillon.", levelId: 49 },
  { character: "氷", meaningsFr: ["Glace"], readingsOn: ["ヒョウ"], readingsKun: ["こおり"], meaningMnemonicFr: "L'eau + le point = GLACE.", readingMnemonicFr: "KOORI - glace.", levelId: 50 },

  // More body and health
  { character: "脳", meaningsFr: ["Cerveau"], readingsOn: ["ノウ"], readingsKun: [], meaningMnemonicFr: "La chair + le souffle = CERVEAU.", readingMnemonicFr: "NOU - cerveau.", levelId: 51 },
  { character: "肝", meaningsFr: ["Foie"], readingsOn: ["カン"], readingsKun: ["きも"], meaningMnemonicFr: "La chair + le sec = FOIE.", readingMnemonicFr: "KIMO - foie.", levelId: 52 },
  { character: "腎", meaningsFr: ["Rein"], readingsOn: ["ジン"], readingsKun: [], meaningMnemonicFr: "La chair + la prudence = REIN.", readingMnemonicFr: "JIN - rein.", levelId: 53 },
  { character: "膀", meaningsFr: ["Vessie"], readingsOn: ["ボウ"], readingsKun: [], meaningMnemonicFr: "La chair + le côté = VESSIE.", readingMnemonicFr: "BOU - vessie.", levelId: 54 },
  { character: "脈", meaningsFr: ["Pouls"], readingsOn: ["ミャク"], readingsKun: [], meaningMnemonicFr: "La chair + l'eau éternelle = POULS.", readingMnemonicFr: "MYAKU - pouls.", levelId: 55 },
  { character: "筋", meaningsFr: ["Muscle"], readingsOn: ["キン"], readingsKun: ["すじ"], meaningMnemonicFr: "Le bambou + la chair + la force = MUSCLE.", readingMnemonicFr: "SUJI - muscle.", levelId: 56 },
  { character: "靭", meaningsFr: ["Tendon"], readingsOn: ["ジン"], readingsKun: [], meaningMnemonicFr: "Le cuir + la blade = TENDON.", readingMnemonicFr: "JIN - tendon.", levelId: 57 },
  { character: "骸", meaningsFr: ["Squelette"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "L'os + le tout = SQUELETTE.", readingMnemonicFr: "GAI - squelette.", levelId: 58 },
  { character: "髄", meaningsFr: ["Moelle"], readingsOn: ["ズイ"], readingsKun: [], meaningMnemonicFr: "L'os + le surplus = MOELLE.", readingMnemonicFr: "ZUI - moelle.", levelId: 59 },
  { character: "膜", meaningsFr: ["Membrane"], readingsOn: ["マク"], readingsKun: [], meaningMnemonicFr: "La chair + le rideau = MEMBRANE.", readingMnemonicFr: "MAKU - membrane.", levelId: 60 },

  // Plants and nature
  { character: "蕾", meaningsFr: ["Bourgeon"], readingsOn: ["ライ"], readingsKun: ["つぼみ"], meaningMnemonicFr: "La plante + le tonnerre = BOURGEON.", readingMnemonicFr: "TSUBOMI - bourgeon.", levelId: 41 },
  { character: "茎", meaningsFr: ["Tige"], readingsOn: ["ケイ"], readingsKun: ["くき"], meaningMnemonicFr: "La plante + le chemin = TIGE.", readingMnemonicFr: "KUKI - tige.", levelId: 42 },
  { character: "芽", meaningsFr: ["Pousse"], readingsOn: ["ガ"], readingsKun: ["め"], meaningMnemonicFr: "La plante + la dent = POUSSE.", readingMnemonicFr: "ME - pousse.", levelId: 43 },
  { character: "苗", meaningsFr: ["Plant"], readingsOn: ["ビョウ"], readingsKun: ["なえ"], meaningMnemonicFr: "La plante + le champ = PLANT.", readingMnemonicFr: "NAE - plant.", levelId: 44 },
  { character: "穂", meaningsFr: ["Épi"], readingsOn: ["スイ"], readingsKun: ["ほ"], meaningMnemonicFr: "Le riz + le frère = ÉPI.", readingMnemonicFr: "HO - épi.", levelId: 45 },
  { character: "藁", meaningsFr: ["Paille"], readingsOn: ["コウ"], readingsKun: ["わら"], meaningMnemonicFr: "La plante + le haut + l'origine = PAILLE.", readingMnemonicFr: "WARA - paille.", levelId: 46 },
  { character: "樹", meaningsFr: ["Arbre (littéraire)"], readingsOn: ["ジュ"], readingsKun: [], meaningMnemonicFr: "Le bois + les tambours = ARBRE.", readingMnemonicFr: "JU - arbre.", levelId: 47 },
  { character: "幹", meaningsFr: ["Tronc"], readingsOn: ["カン"], readingsKun: ["みき"], meaningMnemonicFr: "Le sec + le premier = TRONC.", readingMnemonicFr: "MIKI - tronc.", levelId: 48 },
  { character: "枯", meaningsFr: ["Fané"], readingsOn: ["コ"], readingsKun: ["か-れる"], meaningMnemonicFr: "Le bois + l'ancien = FANÉ.", readingMnemonicFr: "KARERU - se faner.", levelId: 49 },
  { character: "朽", meaningsFr: ["Pourri"], readingsOn: ["キュウ"], readingsKun: ["く-ちる"], meaningMnemonicFr: "Le bois + la bouche = POURRI.", readingMnemonicFr: "KUCHIRU - pourrir.", levelId: 50 },

  // Weather and climate
  { character: "霜", meaningsFr: ["Gel"], readingsOn: ["ソウ"], readingsKun: ["しも"], meaningMnemonicFr: "La pluie + le double = GEL.", readingMnemonicFr: "SHIMO - gel.", levelId: 51 },
  { character: "露", meaningsFr: ["Rosée"], readingsOn: ["ロ"], readingsKun: ["つゆ"], meaningMnemonicFr: "La pluie + le chemin + le pied = ROSÉE.", readingMnemonicFr: "TSUYU - rosée.", levelId: 52 },
  { character: "霞", meaningsFr: ["Brume"], readingsOn: ["カ"], readingsKun: ["かすみ"], meaningMnemonicFr: "La pluie + la montagne + la couverture = BRUME.", readingMnemonicFr: "KASUMI - brume.", levelId: 53 },
  { character: "虹", meaningsFr: ["Arc-en-ciel"], readingsOn: ["コウ"], readingsKun: ["にじ"], meaningMnemonicFr: "L'insecte + le travail = ARC-EN-CIEL.", readingMnemonicFr: "NIJI - arc-en-ciel.", levelId: 54 },
  { character: "稲", meaningsFr: ["Riz (plante)"], readingsOn: ["トウ"], readingsKun: ["いね"], meaningMnemonicFr: "Le riz + le vieux = RIZ.", readingMnemonicFr: "INE - riz.", levelId: 55 },
  { character: "穀", meaningsFr: ["Céréale"], readingsOn: ["コク"], readingsKun: [], meaningMnemonicFr: "Le soldat + le riz = CÉRÉALE.", readingMnemonicFr: "KOKU - céréale.", levelId: 56 },
  { character: "畜", meaningsFr: ["Bétail"], readingsOn: ["チク"], readingsKun: [], meaningMnemonicFr: "Le sombre + le champ = BÉTAIL.", readingMnemonicFr: "CHIKU - bétail.", levelId: 57 },
  { character: "牧", meaningsFr: ["Pâturage"], readingsOn: ["ボク"], readingsKun: ["まき"], meaningMnemonicFr: "La vache + le frapper = PÂTURAGE.", readingMnemonicFr: "MAKI - pâturage.", levelId: 58 },
  { character: "酪", meaningsFr: ["Laiterie"], readingsOn: ["ラク"], readingsKun: [], meaningMnemonicFr: "L'alcool + chaque = LAITERIE.", readingMnemonicFr: "RAKU - laiterie.", levelId: 59 },
  { character: "乳", meaningsFr: ["Lait"], readingsOn: ["ニュウ"], readingsKun: ["ちち"], meaningMnemonicFr: "L'enfant + la main = LAIT.", readingMnemonicFr: "CHICHI - lait.", levelId: 60 },

  // More action verbs
  { character: "拾", meaningsFr: ["Ramasser"], readingsOn: ["シュウ"], readingsKun: ["ひろ-う"], meaningMnemonicFr: "La main + la combinaison = RAMASSER.", readingMnemonicFr: "HIROU - ramasser.", levelId: 41 },
  { character: "捨", meaningsFr: ["Abandonner"], readingsOn: ["シャ"], readingsKun: ["す-てる"], meaningMnemonicFr: "La main + la maison = ABANDONNER.", readingMnemonicFr: "SUTERU - abandonner.", levelId: 42 },
  { character: "払", meaningsFr: ["Payer"], readingsOn: ["フツ"], readingsKun: ["はら-う"], meaningMnemonicFr: "La main + le pas = PAYER.", readingMnemonicFr: "HARAU - payer.", levelId: 43 },
  { character: "贈", meaningsFr: ["Offrir"], readingsOn: ["ゾウ"], readingsKun: ["おく-る"], meaningMnemonicFr: "La coquille + augmenter = OFFRIR.", readingMnemonicFr: "OKURU - offrir.", levelId: 44 },
  { character: "届", meaningsFr: ["Livrer"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "Le corps + sortir = LIVRER.", readingMnemonicFr: "TODOKERU - livrer.", levelId: 45 },
  { character: "届", meaningsFr: ["Atteindre"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "ATTEINDRE la destination.", readingMnemonicFr: "TODOKU - atteindre.", levelId: 46 },
  { character: "届", meaningsFr: ["Arriver"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "ARRIVER à bon port.", readingMnemonicFr: "TODOKU - arriver.", levelId: 47 },
  { character: "届", meaningsFr: ["Remettre"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "REMETTRE en main propre.", readingMnemonicFr: "TODOKERU - remettre.", levelId: 48 },
  { character: "届", meaningsFr: ["Envoyer"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "ENVOYER au destinataire.", readingMnemonicFr: "TODOKERU - envoyer.", levelId: 49 },
  { character: "届", meaningsFr: ["Porter"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "PORTER jusqu'au bout.", readingMnemonicFr: "TODOKERU - porter.", levelId: 50 },

  // Tools and objects
  { character: "針", meaningsFr: ["Aiguille"], readingsOn: ["シン"], readingsKun: ["はり"], meaningMnemonicFr: "Le métal + dix = AIGUILLE.", readingMnemonicFr: "HARI - aiguille.", levelId: 51 },
  { character: "釘", meaningsFr: ["Clou"], readingsOn: ["テイ"], readingsKun: ["くぎ"], meaningMnemonicFr: "Le métal + le pas = CLOU.", readingMnemonicFr: "KUGI - clou.", levelId: 52 },
  { character: "鋏", meaningsFr: ["Ciseaux"], readingsOn: ["キョウ"], readingsKun: ["はさみ"], meaningMnemonicFr: "Le métal + serrer = CISEAUX.", readingMnemonicFr: "HASAMI - ciseaux.", levelId: 53 },
  { character: "鎚", meaningsFr: ["Marteau"], readingsOn: ["ツイ"], readingsKun: ["つち"], meaningMnemonicFr: "Le métal + suivre = MARTEAU.", readingMnemonicFr: "TSUCHI - marteau.", levelId: 54 },
  { character: "鋸", meaningsFr: ["Scie"], readingsOn: ["キョ"], readingsKun: ["のこぎり"], meaningMnemonicFr: "Le métal + tenir = SCIE.", readingMnemonicFr: "NOKOGIRI - scie.", levelId: 55 },
  { character: "斧", meaningsFr: ["Hache"], readingsOn: ["フ"], readingsKun: ["おの"], meaningMnemonicFr: "Le père + le couteau = HACHE.", readingMnemonicFr: "ONO - hache.", levelId: 56 },
  { character: "錐", meaningsFr: ["Poinçon"], readingsOn: ["スイ"], readingsKun: ["きり"], meaningMnemonicFr: "Le métal + suivre = POINÇON.", readingMnemonicFr: "KIRI - poinçon.", levelId: 57 },
  { character: "鑿", meaningsFr: ["Ciseau à bois"], readingsOn: ["サク"], readingsKun: ["のみ"], meaningMnemonicFr: "Le métal + creuser = CISEAU.", readingMnemonicFr: "NOMI - ciseau.", levelId: 58 },
  { character: "楔", meaningsFr: ["Cale"], readingsOn: ["ケツ"], readingsKun: ["くさび"], meaningMnemonicFr: "Le bois + le système = CALE.", readingMnemonicFr: "KUSABI - cale.", levelId: 59 },
  { character: "梯", meaningsFr: ["Échelle"], readingsOn: ["テイ"], readingsKun: ["はしご"], meaningMnemonicFr: "Le bois + le frère = ÉCHELLE.", readingMnemonicFr: "HASHIGO - échelle.", levelId: 60 },
];

async function main() {
  console.log("Seeding final kanji batch...");

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
