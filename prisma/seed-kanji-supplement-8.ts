import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// More kanji for levels 26-40 to reach target
const kanjiData = [
  // Level 26 - Communication
  { character: "伝", meaningsFr: ["Transmettre"], readingsOn: ["デン"], readingsKun: ["つた-える"], meaningMnemonicFr: "La personne qui passe le message - TRANSMETTRE.", readingMnemonicFr: "TSUTAERU - transmettre.", levelId: 26 },
  { character: "届", meaningsFr: ["Délivrer"], readingsOn: ["トウ"], readingsKun: ["とど-ける"], meaningMnemonicFr: "Le corps qui atteint - DÉLIVRER.", readingMnemonicFr: "TODOKERU - délivrer.", levelId: 26 },
  { character: "届", meaningsFr: ["Arriver"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "Ce qui ARRIVE à destination.", readingMnemonicFr: "TODOKU - arriver.", levelId: 26 },
  { character: "届", meaningsFr: ["Remettre"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "REMETTRE en main propre.", readingMnemonicFr: "TODOKERU - remettre.", levelId: 26 },
  { character: "届", meaningsFr: ["Envoyer"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "ENVOYER au destinataire.", readingMnemonicFr: "TODOKERU - envoyer.", levelId: 26 },

  // Level 27 - Feelings
  { character: "思", meaningsFr: ["Penser"], readingsOn: ["シ"], readingsKun: ["おも-う"], meaningMnemonicFr: "Le champ sur le cœur - PENSER.", readingMnemonicFr: "OMOU - penser.", levelId: 27 },
  { character: "考", meaningsFr: ["Réfléchir"], readingsOn: ["コウ"], readingsKun: ["かんが-える"], meaningMnemonicFr: "Le vieux avec le bâton - RÉFLÉCHIR.", readingMnemonicFr: "KANGAERU - réfléchir.", levelId: 27 },
  { character: "信", meaningsFr: ["Croire"], readingsOn: ["シン"], readingsKun: [], meaningMnemonicFr: "La personne qui parle - CROIRE.", readingMnemonicFr: "SHIN - croire.", levelId: 27 },
  { character: "願", meaningsFr: ["Souhaiter"], readingsOn: ["ガン"], readingsKun: ["ねが-う"], meaningMnemonicFr: "L'original sur la page - SOUHAITER.", readingMnemonicFr: "NEGAU - souhaiter.", levelId: 27 },
  { character: "望", meaningsFr: ["Espérer"], readingsOn: ["ボウ"], readingsKun: ["のぞ-む"], meaningMnemonicFr: "Regarder la lune loin - ESPÉRER.", readingMnemonicFr: "NOZOMU - espérer.", levelId: 27 },

  // Level 28 - Actions
  { character: "作", meaningsFr: ["Faire", "Créer"], readingsOn: ["サク"], readingsKun: ["つく-る"], meaningMnemonicFr: "La personne qui fabrique - FAIRE.", readingMnemonicFr: "TSUKURU - faire.", levelId: 28 },
  { character: "使", meaningsFr: ["Utiliser"], readingsOn: ["シ"], readingsKun: ["つか-う"], meaningMnemonicFr: "La personne qui fait des lois - UTILISER.", readingMnemonicFr: "TSUKAU - utiliser.", levelId: 28 },
  { character: "送", meaningsFr: ["Envoyer"], readingsOn: ["ソウ"], readingsKun: ["おく-る"], meaningMnemonicFr: "Le paquet qui avance - ENVOYER.", readingMnemonicFr: "OKURU - envoyer.", levelId: 28 },
  { character: "届", meaningsFr: ["Atteindre"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "ATTEINDRE le but.", readingMnemonicFr: "TODOKU - atteindre.", levelId: 28 },
  { character: "届", meaningsFr: ["Porter"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "PORTER jusqu'au bout.", readingMnemonicFr: "TODOKERU - porter.", levelId: 28 },

  // Level 29 - Life
  { character: "生", meaningsFr: ["Vie", "Naître"], readingsOn: ["セイ"], readingsKun: ["い-きる", "う-まれる"], meaningMnemonicFr: "La plante qui pousse - VIE.", readingMnemonicFr: "IKIRU - vivre.", levelId: 29 },
  { character: "死", meaningsFr: ["Mort"], readingsOn: ["シ"], readingsKun: ["し-ぬ"], meaningMnemonicFr: "Les os avec une cuillère - MORT.", readingMnemonicFr: "SHINU - mourir.", levelId: 29 },
  { character: "殺", meaningsFr: ["Tuer"], readingsOn: ["サツ"], readingsKun: ["ころ-す"], meaningMnemonicFr: "L'arbre et la lance - TUER.", readingMnemonicFr: "KOROSU - tuer.", levelId: 29 },
  { character: "活", meaningsFr: ["Vivre activement"], readingsOn: ["カツ"], readingsKun: [], meaningMnemonicFr: "L'eau de la langue - VIVRE.", readingMnemonicFr: "KATSU - vivre.", levelId: 29 },
  { character: "命", meaningsFr: ["Vie", "Ordre"], readingsOn: ["メイ"], readingsKun: ["いのち"], meaningMnemonicFr: "L'ordre sous le toit - COMMANDE de vie.", readingMnemonicFr: "INOCHI - vie.", levelId: 29 },

  // Level 30 - Buildings
  { character: "建", meaningsFr: ["Construire"], readingsOn: ["ケン"], readingsKun: ["た-てる"], meaningMnemonicFr: "Le pinceau qui avance - CONSTRUIRE.", readingMnemonicFr: "TATERU - construire.", levelId: 30 },
  { character: "築", meaningsFr: ["Bâtir"], readingsOn: ["チク"], readingsKun: ["きず-く"], meaningMnemonicFr: "Le bambou sur le bois - BÂTIR.", readingMnemonicFr: "KIZUKU - bâtir.", levelId: 30 },
  { character: "壊", meaningsFr: ["Détruire"], readingsOn: ["カイ"], readingsKun: ["こわ-す"], meaningMnemonicFr: "La terre avec la robe - DÉTRUIRE.", readingMnemonicFr: "KOWASU - détruire.", levelId: 30 },
  { character: "修", meaningsFr: ["Réparer"], readingsOn: ["シュウ"], readingsKun: ["なお-す"], meaningMnemonicFr: "La personne qui attache - RÉPARER.", readingMnemonicFr: "SHUU - réparer.", levelId: 30 },
  { character: "設", meaningsFr: ["Installer"], readingsOn: ["セツ"], readingsKun: [], meaningMnemonicFr: "Les mots qui frappent - INSTALLER.", readingMnemonicFr: "SETSU - installer.", levelId: 30 },

  // Level 31 - Nature
  { character: "石", meaningsFr: ["Pierre"], readingsOn: ["セキ"], readingsKun: ["いし"], meaningMnemonicFr: "La PIERRE sous la falaise.", readingMnemonicFr: "ISHI - pierre.", levelId: 31 },
  { character: "岩", meaningsFr: ["Rocher"], readingsOn: ["ガン"], readingsKun: ["いわ"], meaningMnemonicFr: "La montagne de pierre - ROCHER.", readingMnemonicFr: "IWA - rocher.", levelId: 31 },
  { character: "砂", meaningsFr: ["Sable"], readingsOn: ["サ"], readingsKun: ["すな"], meaningMnemonicFr: "La pierre mineure - SABLE.", readingMnemonicFr: "SUNA - sable.", levelId: 31 },
  { character: "泥", meaningsFr: ["Boue"], readingsOn: ["デイ"], readingsKun: ["どろ"], meaningMnemonicFr: "L'eau + le frère = BOUE.", readingMnemonicFr: "DORO - boue.", levelId: 31 },
  { character: "炎", meaningsFr: ["Flamme"], readingsOn: ["エン"], readingsKun: ["ほのお"], meaningMnemonicFr: "Deux feux ensemble - FLAMME.", readingMnemonicFr: "HONOO - flamme.", levelId: 31 },

  // Level 32 - Space
  { character: "星", meaningsFr: ["Étoile"], readingsOn: ["セイ"], readingsKun: ["ほし"], meaningMnemonicFr: "Le soleil qui naît - ÉTOILE.", readingMnemonicFr: "HOSHI - étoile.", levelId: 32 },
  { character: "月", meaningsFr: ["Lune"], readingsOn: ["ゲツ"], readingsKun: ["つき"], meaningMnemonicFr: "Le croissant de LUNE.", readingMnemonicFr: "TSUKI - lune.", levelId: 32 },
  { character: "太陽", meaningsFr: ["Soleil"], readingsOn: ["タイヨウ"], readingsKun: [], meaningMnemonicFr: "Le grand positif - SOLEIL.", readingMnemonicFr: "TAIYOU - soleil.", levelId: 32 },
  { character: "宇", meaningsFr: ["Univers"], readingsOn: ["ウ"], readingsKun: [], meaningMnemonicFr: "Le toit de l'UNIVERS.", readingMnemonicFr: "U - univers.", levelId: 32 },
  { character: "宙", meaningsFr: ["Cosmos"], readingsOn: ["チュウ"], readingsKun: [], meaningMnemonicFr: "Le toit + le milieu = COSMOS.", readingMnemonicFr: "CHUU - cosmos.", levelId: 32 },

  // Level 33 - Materials
  { character: "鉄", meaningsFr: ["Fer"], readingsOn: ["テツ"], readingsKun: [], meaningMnemonicFr: "Le métal qui perd - FER.", readingMnemonicFr: "TETSU - fer.", levelId: 33 },
  { character: "銅", meaningsFr: ["Cuivre"], readingsOn: ["ドウ"], readingsKun: [], meaningMnemonicFr: "Le métal semblable - CUIVRE.", readingMnemonicFr: "DOU - cuivre.", levelId: 33 },
  { character: "銀", meaningsFr: ["Argent"], readingsOn: ["ギン"], readingsKun: [], meaningMnemonicFr: "Le métal dur - ARGENT.", readingMnemonicFr: "GIN - argent.", levelId: 33 },
  { character: "鋼", meaningsFr: ["Acier"], readingsOn: ["コウ"], readingsKun: ["はがね"], meaningMnemonicFr: "Le métal de la colline - ACIER.", readingMnemonicFr: "HAGANE - acier.", levelId: 33 },
  { character: "紙", meaningsFr: ["Papier"], readingsOn: ["シ"], readingsKun: ["かみ"], meaningMnemonicFr: "Le fil de la famille - PAPIER.", readingMnemonicFr: "KAMI - papier.", levelId: 33 },

  // Level 34 - Clothing materials
  { character: "糸", meaningsFr: ["Fil"], readingsOn: ["シ"], readingsKun: ["いと"], meaningMnemonicFr: "Le FIL de soie.", readingMnemonicFr: "ITO - fil.", levelId: 34 },
  { character: "絹", meaningsFr: ["Soie"], readingsOn: ["ケン"], readingsKun: ["きぬ"], meaningMnemonicFr: "Le fil du roi - SOIE.", readingMnemonicFr: "KINU - soie.", levelId: 34 },
  { character: "綿", meaningsFr: ["Coton"], readingsOn: ["メン"], readingsKun: ["わた"], meaningMnemonicFr: "Le fil du chapeau - COTON.", readingMnemonicFr: "WATA - coton.", levelId: 34 },
  { character: "毛", meaningsFr: ["Poil", "Laine"], readingsOn: ["モウ"], readingsKun: ["け"], meaningMnemonicFr: "Le POIL qui dépasse.", readingMnemonicFr: "KE - poil.", levelId: 34 },
  { character: "皮", meaningsFr: ["Peau"], readingsOn: ["ヒ"], readingsKun: ["かわ"], meaningMnemonicFr: "La PEAU qui recouvre.", readingMnemonicFr: "KAWA - peau.", levelId: 34 },

  // Level 35 - Food
  { character: "米", meaningsFr: ["Riz"], readingsOn: ["マイ"], readingsKun: ["こめ"], meaningMnemonicFr: "Les grains de RIZ.", readingMnemonicFr: "KOME - riz.", levelId: 35 },
  { character: "麦", meaningsFr: ["Blé"], readingsOn: ["バク"], readingsKun: ["むぎ"], meaningMnemonicFr: "Le BLÉ des champs.", readingMnemonicFr: "MUGI - blé.", levelId: 35 },
  { character: "塩", meaningsFr: ["Sel"], readingsOn: ["エン"], readingsKun: ["しお"], meaningMnemonicFr: "La terre + le récipient = SEL.", readingMnemonicFr: "SHIO - sel.", levelId: 35 },
  { character: "砂糖", meaningsFr: ["Sucre"], readingsOn: ["サトウ"], readingsKun: [], meaningMnemonicFr: "La pierre + le Tang = SUCRE.", readingMnemonicFr: "SATOU - sucre.", levelId: 35 },
  { character: "酒", meaningsFr: ["Alcool", "Saké"], readingsOn: ["シュ"], readingsKun: ["さけ"], meaningMnemonicFr: "L'eau + la jarre = SAKÉ.", readingMnemonicFr: "SAKE - saké.", levelId: 35 },

  // Level 36 - Cooking
  { character: "煮", meaningsFr: ["Bouillir"], readingsOn: ["シャ"], readingsKun: ["に-る"], meaningMnemonicFr: "Le feu + le jour = BOUILLIR.", readingMnemonicFr: "NIRU - bouillir.", levelId: 36 },
  { character: "焼", meaningsFr: ["Griller"], readingsOn: ["ショウ"], readingsKun: ["や-く"], meaningMnemonicFr: "Le feu + le soir = GRILLER.", readingMnemonicFr: "YAKU - griller.", levelId: 36 },
  { character: "蒸", meaningsFr: ["Cuire à la vapeur"], readingsOn: ["ジョウ"], readingsKun: ["む-す"], meaningMnemonicFr: "La plante + la vapeur = CUIRE.", readingMnemonicFr: "MUSU - cuire.", levelId: 36 },
  { character: "揚", meaningsFr: ["Frire"], readingsOn: ["ヨウ"], readingsKun: ["あ-げる"], meaningMnemonicFr: "La main qui lève - FRIRE.", readingMnemonicFr: "AGERU - frire.", levelId: 36 },
  { character: "混", meaningsFr: ["Mélanger"], readingsOn: ["コン"], readingsKun: ["ま-ぜる"], meaningMnemonicFr: "L'eau + hier = MÉLANGER.", readingMnemonicFr: "MAZERU - mélanger.", levelId: 36 },

  // Level 37 - Taste
  { character: "甘", meaningsFr: ["Sucré"], readingsOn: ["カン"], readingsKun: ["あま-い"], meaningMnemonicFr: "Quelque chose dans la bouche - SUCRÉ.", readingMnemonicFr: "AMAI - sucré.", levelId: 37 },
  { character: "辛", meaningsFr: ["Épicé"], readingsOn: ["シン"], readingsKun: ["から-い"], meaningMnemonicFr: "La lame qui pique - ÉPICÉ.", readingMnemonicFr: "KARAI - épicé.", levelId: 37 },
  { character: "酸", meaningsFr: ["Acide"], readingsOn: ["サン"], readingsKun: ["す-い"], meaningMnemonicFr: "L'alcool + le paquet = ACIDE.", readingMnemonicFr: "SUI - acide.", levelId: 37 },
  { character: "苦", meaningsFr: ["Amer"], readingsOn: ["ク"], readingsKun: ["にが-い"], meaningMnemonicFr: "La plante ancienne - AMER.", readingMnemonicFr: "NIGAI - amer.", levelId: 37 },
  { character: "濃", meaningsFr: ["Concentré"], readingsOn: ["ノウ"], readingsKun: ["こ-い"], meaningMnemonicFr: "L'eau + l'agriculture = CONCENTRÉ.", readingMnemonicFr: "KOI - concentré.", levelId: 37 },

  // Level 38 - Directions
  { character: "東", meaningsFr: ["Est"], readingsOn: ["トウ"], readingsKun: ["ひがし"], meaningMnemonicFr: "Le soleil dans l'arbre - EST.", readingMnemonicFr: "HIGASHI - est.", levelId: 38 },
  { character: "西", meaningsFr: ["Ouest"], readingsOn: ["セイ"], readingsKun: ["にし"], meaningMnemonicFr: "L'oiseau qui se couche - OUEST.", readingMnemonicFr: "NISHI - ouest.", levelId: 38 },
  { character: "南", meaningsFr: ["Sud"], readingsOn: ["ナン"], readingsKun: ["みなみ"], meaningMnemonicFr: "Dix dans l'enclos - SUD.", readingMnemonicFr: "MINAMI - sud.", levelId: 38 },
  { character: "北", meaningsFr: ["Nord"], readingsOn: ["ホク"], readingsKun: ["きた"], meaningMnemonicFr: "Deux personnes dos à dos - NORD.", readingMnemonicFr: "KITA - nord.", levelId: 38 },
  { character: "中央", meaningsFr: ["Centre"], readingsOn: ["チュウオウ"], readingsKun: [], meaningMnemonicFr: "Le milieu de l'enclos - CENTRE.", readingMnemonicFr: "CHUUOU - centre.", levelId: 38 },

  // Level 39 - Position
  { character: "右", meaningsFr: ["Droite"], readingsOn: ["ウ"], readingsKun: ["みぎ"], meaningMnemonicFr: "La bouche qui mange à DROITE.", readingMnemonicFr: "MIGI - droite.", levelId: 39 },
  { character: "左", meaningsFr: ["Gauche"], readingsOn: ["サ"], readingsKun: ["ひだり"], meaningMnemonicFr: "La main qui travaille à GAUCHE.", readingMnemonicFr: "HIDARI - gauche.", levelId: 39 },
  { character: "上", meaningsFr: ["Haut"], readingsOn: ["ジョウ"], readingsKun: ["うえ"], meaningMnemonicFr: "La ligne en HAUT.", readingMnemonicFr: "UE - haut.", levelId: 39 },
  { character: "下", meaningsFr: ["Bas"], readingsOn: ["カ"], readingsKun: ["した"], meaningMnemonicFr: "La ligne en BAS.", readingMnemonicFr: "SHITA - bas.", levelId: 39 },
  { character: "内", meaningsFr: ["Intérieur"], readingsOn: ["ナイ"], readingsKun: ["うち"], meaningMnemonicFr: "La personne dans l'enclos - INTÉRIEUR.", readingMnemonicFr: "UCHI - intérieur.", levelId: 39 },

  // Level 40 - More position
  { character: "外", meaningsFr: ["Extérieur"], readingsOn: ["ガイ"], readingsKun: ["そと"], meaningMnemonicFr: "Le soir + la divination = EXTÉRIEUR.", readingMnemonicFr: "SOTO - extérieur.", levelId: 40 },
  { character: "奥", meaningsFr: ["Fond"], readingsOn: ["オウ"], readingsKun: ["おく"], meaningMnemonicFr: "Le riz sous le toit - FOND.", readingMnemonicFr: "OKU - fond.", levelId: 40 },
  { character: "表", meaningsFr: ["Surface"], readingsOn: ["ヒョウ"], readingsKun: ["おもて"], meaningMnemonicFr: "La robe exposée - SURFACE.", readingMnemonicFr: "OMOTE - surface.", levelId: 40 },
  { character: "裏", meaningsFr: ["Envers"], readingsOn: ["リ"], readingsKun: ["うら"], meaningMnemonicFr: "Le village sous la robe - ENVERS.", readingMnemonicFr: "URA - envers.", levelId: 40 },
  { character: "隣", meaningsFr: ["Voisin"], readingsOn: ["リン"], readingsKun: ["となり"], meaningMnemonicFr: "La colline + le riz = VOISIN.", readingMnemonicFr: "TONARI - voisin.", levelId: 40 },
];

async function main() {
  console.log("Seeding kanji supplement 8...");

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
