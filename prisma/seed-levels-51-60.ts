import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding levels 51-60 (expanded vocabulary)...");

  // Create levels 51-60
  for (let i = 51; i <= 60; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  // ============================================
  // LEVEL 51 - JLPT N1 Kanji Set 1
  // ============================================

  const level51Kanji = [
    { character: "膜", meaningsFr: ["Membrane"], readingsOn: ["マク"], readingsKun: [], meaningMnemonicFr: "La chair et le désert. La MEMBRANE.", readingMnemonicFr: "Maku - la MEMBRANE 'maku' !" },
    { character: "盲", meaningsFr: ["Aveugle"], readingsOn: ["モウ"], readingsKun: [], meaningMnemonicFr: "Le mort et l'oeil. AVEUGLE.", readingMnemonicFr: "Mou - AVEUGLE 'mou' !" },
    { character: "妄", meaningsFr: ["Illusion", "Délire"], readingsOn: ["モウ"], readingsKun: [], meaningMnemonicFr: "Le mort et la femme. L'ILLUSION, le DÉLIRE.", readingMnemonicFr: "Mou - l'ILLUSION 'mou' !" },
    { character: "惑", meaningsFr: ["Perplexe"], readingsOn: ["ワク"], readingsKun: ["まど-う"], meaningMnemonicFr: "Le ou et le coeur. PERPLEXE.", readingMnemonicFr: "Waku - PERPLEXE 'waku' !" },
    { character: "網", meaningsFr: ["Filet", "Réseau"], readingsOn: ["モウ"], readingsKun: ["あみ"], meaningMnemonicFr: "Le fil et le mort. Le FILET, le RÉSEAU.", readingMnemonicFr: "Mou - le RÉSEAU 'mou' !" },
    { character: "耗", meaningsFr: ["Consommer"], readingsOn: ["モウ"], readingsKun: [], meaningMnemonicFr: "Le oreille et le cheveux. CONSOMMER.", readingMnemonicFr: "Mou - CONSOMMER 'mou' !" },
    { character: "猛", meaningsFr: ["Féroce"], readingsOn: ["モウ"], readingsKun: [], meaningMnemonicFr: "Le chien et le récipient. FÉROCE.", readingMnemonicFr: "Mou - FÉROCE 'mou' !" },
    { character: "網", meaningsFr: ["Réseau"], readingsOn: ["モウ"], readingsKun: ["あみ"], meaningMnemonicFr: "Le fil et le mort. Le RÉSEAU.", readingMnemonicFr: "Ami - le FILET 'ami' !" },
    { character: "黙", meaningsFr: ["Silence"], readingsOn: ["モク"], readingsKun: ["だま-る"], meaningMnemonicFr: "Le noir et le chien. Le SILENCE.", readingMnemonicFr: "Moku - le SILENCE 'moku' !" },
    { character: "紋", meaningsFr: ["Emblème"], readingsOn: ["モン"], readingsKun: [], meaningMnemonicFr: "Le fil et la porte. L'EMBLÈME.", readingMnemonicFr: "Mon - l'EMBLÈME 'mon' !" },
    { character: "匁", meaningsFr: ["Momme (unité)"], readingsOn: ["モンメ"], readingsKun: [], meaningMnemonicFr: "L'unité de poids. Le MOMME.", readingMnemonicFr: "Monme - le MOMME !" },
    { character: "厄", meaningsFr: ["Calamité"], readingsOn: ["ヤク"], readingsKun: [], meaningMnemonicFr: "Le falaise et le petit. La CALAMITÉ.", readingMnemonicFr: "Yaku - la CALAMITÉ 'yaku' !" },
    { character: "躍", meaningsFr: ["Bondir"], readingsOn: ["ヤク"], readingsKun: ["おど-る"], meaningMnemonicFr: "Le pied et l'aile. BONDIR.", readingMnemonicFr: "Yaku - BONDIR 'yaku' !" },
    { character: "柳", meaningsFr: ["Saule"], readingsOn: ["リュウ"], readingsKun: ["やなぎ"], meaningMnemonicFr: "L'arbre et le s'unir. Le SAULE.", readingMnemonicFr: "Yanagi - le SAULE !" },
    { character: "愉", meaningsFr: ["Plaisir"], readingsOn: ["ユ"], readingsKun: [], meaningMnemonicFr: "Le coeur et le voler. Le PLAISIR.", readingMnemonicFr: "Yu - le PLAISIR 'yu' !" },
    { character: "癒", meaningsFr: ["Guérir"], readingsOn: ["ユ"], readingsKun: ["い-える"], meaningMnemonicFr: "La maladie et le plaisir. GUÉRIR.", readingMnemonicFr: "Yu - GUÉRIR 'yu' !" },
    { character: "諭", meaningsFr: ["Conseiller"], readingsOn: ["ユ"], readingsKun: ["さと-す"], meaningMnemonicFr: "La parole et le voler. CONSEILLER.", readingMnemonicFr: "Yu - CONSEILLER 'yu' !" },
    { character: "唯", meaningsFr: ["Seulement"], readingsOn: ["ユイ"], readingsKun: ["ただ"], meaningMnemonicFr: "La bouche et l'oiseau. SEULEMENT.", readingMnemonicFr: "Yui - SEULEMENT 'yui' !" },
    { character: "幽", meaningsFr: ["Sombre"], readingsOn: ["ユウ"], readingsKun: [], meaningMnemonicFr: "La montagne et le fil. SOMBRE.", readingMnemonicFr: "Yuu - SOMBRE 'yuu' !" },
    { character: "悠", meaningsFr: ["Lointain"], readingsOn: ["ユウ"], readingsKun: [], meaningMnemonicFr: "Le coeur et le l'eau. LOINTAIN.", readingMnemonicFr: "Yuu - LOINTAIN 'yuu' !" },
    { character: "憂", meaningsFr: ["Anxiété"], readingsOn: ["ユウ"], readingsKun: ["うれ-える"], meaningMnemonicFr: "Le coeur et le tête. L'ANXIÉTÉ.", readingMnemonicFr: "Yuu - l'ANXIÉTÉ 'yuu' !" },
    { character: "猶", meaningsFr: ["Encore"], readingsOn: ["ユウ"], readingsKun: [], meaningMnemonicFr: "Le chien et le酉. ENCORE.", readingMnemonicFr: "Yuu - ENCORE 'yuu' !" },
    { character: "裕", meaningsFr: ["Abondant"], readingsOn: ["ユウ"], readingsKun: [], meaningMnemonicFr: "Le vêtement et la vallée. ABONDANT.", readingMnemonicFr: "Yuu - ABONDANT 'yuu' !" },
    { character: "誘", meaningsFr: ["Inviter"], readingsOn: ["ユウ"], readingsKun: ["さそ-う"], meaningMnemonicFr: "La parole et le montrer. INVITER.", readingMnemonicFr: "Yuu - INVITER 'yuu' !" },
    { character: "雄", meaningsFr: ["Mâle", "Héros"], readingsOn: ["ユウ"], readingsKun: ["お"], meaningMnemonicFr: "Le bras et l'oiseau. MÂLE, HÉROS.", readingMnemonicFr: "Yuu - MÂLE 'yuu' !" },
    { character: "融", meaningsFr: ["Fondre"], readingsOn: ["ユウ"], readingsKun: ["と-ける"], meaningMnemonicFr: "Le鬲 et l'insecte. FONDRE.", readingMnemonicFr: "Yuu - FONDRE 'yuu' !" },
    { character: "与", meaningsFr: ["Donner"], readingsOn: ["ヨ"], readingsKun: ["あた-える"], meaningMnemonicFr: "La structure simple. DONNER.", readingMnemonicFr: "Yo - DONNER 'yo' !" },
    { character: "誉", meaningsFr: ["Honneur"], readingsOn: ["ヨ"], readingsKun: ["ほま-れ"], meaningMnemonicFr: "La parole et le興. L'HONNEUR.", readingMnemonicFr: "Yo - l'HONNEUR 'yo' !" },
    { character: "庸", meaningsFr: ["Ordinaire"], readingsOn: ["ヨウ"], readingsKun: [], meaningMnemonicFr: "Le toit et le utiliser. ORDINAIRE.", readingMnemonicFr: "You - ORDINAIRE 'you' !" },
    { character: "揚", meaningsFr: ["Lever"], readingsOn: ["ヨウ"], readingsKun: ["あ-げる"], meaningMnemonicFr: "La main et le soleil. LEVER.", readingMnemonicFr: "You - LEVER 'you' !" },
    { character: "揺", meaningsFr: ["Secouer"], readingsOn: ["ヨウ"], readingsKun: ["ゆ-れる"], meaningMnemonicFr: "La main et le缶. SECOUER.", readingMnemonicFr: "You - SECOUER 'you' !" },
    { character: "溶", meaningsFr: ["Dissoudre"], readingsOn: ["ヨウ"], readingsKun: ["と-ける"], meaningMnemonicFr: "L'eau et la vallée. DISSOUDRE.", readingMnemonicFr: "You - DISSOUDRE 'you' !" },
    { character: "窯", meaningsFr: ["Four"], readingsOn: ["ヨウ"], readingsKun: ["かま"], meaningMnemonicFr: "Le trou et le mouton. Le FOUR.", readingMnemonicFr: "You - le FOUR 'you' !" },
    { character: "謡", meaningsFr: ["Ballade"], readingsOn: ["ヨウ"], readingsKun: ["うたい"], meaningMnemonicFr: "La parole et le缶. La BALLADE.", readingMnemonicFr: "You - la BALLADE 'you' !" },
    { character: "踊", meaningsFr: ["Danser"], readingsOn: ["ヨウ"], readingsKun: ["おど-る"], meaningMnemonicFr: "Le pied et le utiliser. DANSER.", readingMnemonicFr: "You - DANSER 'you' !" },
  ];

  for (const kanji of level51Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 51 },
      create: { ...kanji, levelId: 51 },
    });
  }

  const level51Vocab = [
    // 膜 vocabulary
    { word: "粘膜", meaningsFr: ["Muqueuse"], readings: ["ねんまく"], mnemonicFr: "La MUQUEUSE du nez.", levelId: 51 },
    { word: "網膜", meaningsFr: ["Rétine"], readings: ["もうまく"], mnemonicFr: "La RÉTINE de l'oeil.", levelId: 51 },
    { word: "皮膜", meaningsFr: ["Membrane"], readings: ["ひまく"], mnemonicFr: "La MEMBRANE protectrice.", levelId: 51 },
    // 盲 vocabulary
    { word: "盲目", meaningsFr: ["Aveugle"], readings: ["もうもく"], mnemonicFr: "Être AVEUGLE.", levelId: 51 },
    { word: "盲点", meaningsFr: ["Angle mort"], readings: ["もうてん"], mnemonicFr: "L'ANGLE MORT de la vision.", levelId: 51 },
    { word: "色盲", meaningsFr: ["Daltonisme"], readings: ["しきもう"], mnemonicFr: "Le DALTONISME.", levelId: 51 },
    // 妄 vocabulary
    { word: "妄想", meaningsFr: ["Délire"], readings: ["もうそう"], mnemonicFr: "Un DÉLIRE paranoïaque.", levelId: 51 },
    { word: "妄言", meaningsFr: ["Propos délirants"], readings: ["もうげん"], mnemonicFr: "Des PROPOS DÉLIRANTS.", levelId: 51 },
    // 惑 vocabulary
    { word: "迷惑", meaningsFr: ["Gêne"], readings: ["めいわく"], mnemonicFr: "Causer de la GÊNE.", levelId: 51 },
    { word: "惑星", meaningsFr: ["Planète"], readings: ["わくせい"], mnemonicFr: "Une PLANÈTE du système solaire.", levelId: 51 },
    { word: "困惑", meaningsFr: ["Perplexité"], readings: ["こんわく"], mnemonicFr: "La PERPLEXITÉ face à un problème.", levelId: 51 },
    { word: "誘惑", meaningsFr: ["Tentation"], readings: ["ゆうわく"], mnemonicFr: "La TENTATION du chocolat.", levelId: 51 },
    // 耗 vocabulary
    { word: "消耗", meaningsFr: ["Consommation"], readings: ["しょうもう"], mnemonicFr: "La CONSOMMATION d'énergie.", levelId: 51 },
    { word: "損耗", meaningsFr: ["Usure"], readings: ["そんもう"], mnemonicFr: "L'USURE des pneus.", levelId: 51 },
    // 猛 vocabulary
    { word: "猛烈", meaningsFr: ["Féroce"], readings: ["もうれつ"], mnemonicFr: "Une attaque FÉROCE.", levelId: 51 },
    { word: "猛暑", meaningsFr: ["Canicule"], readings: ["もうしょ"], mnemonicFr: "La CANICULE d'été.", levelId: 51 },
    { word: "猛獣", meaningsFr: ["Bête féroce"], readings: ["もうじゅう"], mnemonicFr: "Une BÊTE FÉROCE.", levelId: 51 },
    { word: "猛毒", meaningsFr: ["Poison violent"], readings: ["もうどく"], mnemonicFr: "Un POISON VIOLENT.", levelId: 51 },
    // 黙 vocabulary
    { word: "沈黙", meaningsFr: ["Silence"], readings: ["ちんもく"], mnemonicFr: "Le SILENCE absolu.", levelId: 51 },
    { word: "黙る", meaningsFr: ["Se taire"], readings: ["だまる"], mnemonicFr: "SE TAIRE.", levelId: 51 },
    { word: "黙認", meaningsFr: ["Approbation tacite"], readings: ["もくにん"], mnemonicFr: "Une APPROBATION TACITE.", levelId: 51 },
    { word: "黙読", meaningsFr: ["Lecture silencieuse"], readings: ["もくどく"], mnemonicFr: "La LECTURE SILENCIEUSE.", levelId: 51 },
    // 紋 vocabulary
    { word: "紋章", meaningsFr: ["Blason"], readings: ["もんしょう"], mnemonicFr: "Le BLASON familial.", levelId: 51 },
    { word: "指紋", meaningsFr: ["Empreinte digitale"], readings: ["しもん"], mnemonicFr: "L'EMPREINTE DIGITALE.", levelId: 51 },
    { word: "波紋", meaningsFr: ["Ondulation"], readings: ["はもん"], mnemonicFr: "Les ONDULATIONS sur l'eau.", levelId: 51 },
    // 厄 vocabulary
    { word: "厄介", meaningsFr: ["Ennuyeux"], readings: ["やっかい"], mnemonicFr: "Une situation ENNUYEUSE.", levelId: 51 },
    { word: "厄年", meaningsFr: ["Année malchanceuse"], readings: ["やくどし"], mnemonicFr: "L'ANNÉE MALCHANCEUSE.", levelId: 51 },
    { word: "災厄", meaningsFr: ["Calamité"], readings: ["さいやく"], mnemonicFr: "Une CALAMITÉ naturelle.", levelId: 51 },
    // 躍 vocabulary
    { word: "活躍", meaningsFr: ["Activité"], readings: ["かつやく"], mnemonicFr: "Une grande ACTIVITÉ.", levelId: 51 },
    { word: "躍進", meaningsFr: ["Bond en avant"], readings: ["やくしん"], mnemonicFr: "Un BOND EN AVANT.", levelId: 51 },
    { word: "飛躍", meaningsFr: ["Saut"], readings: ["ひやく"], mnemonicFr: "Un SAUT spectaculaire.", levelId: 51 },
    { word: "躍動", meaningsFr: ["Dynamisme"], readings: ["やくどう"], mnemonicFr: "Le DYNAMISME de la jeunesse.", levelId: 51 },
    // 愉 vocabulary
    { word: "愉快", meaningsFr: ["Agréable"], readings: ["ゆかい"], mnemonicFr: "Une soirée AGRÉABLE.", levelId: 51 },
    { word: "愉悦", meaningsFr: ["Joie"], readings: ["ゆえつ"], mnemonicFr: "La JOIE profonde.", levelId: 51 },
    // 癒 vocabulary
    { word: "癒す", meaningsFr: ["Guérir"], readings: ["いやす"], mnemonicFr: "GUÉRIR une blessure.", levelId: 51 },
    { word: "治癒", meaningsFr: ["Guérison"], readings: ["ちゆ"], mnemonicFr: "La GUÉRISON complète.", levelId: 51 },
    { word: "癒着", meaningsFr: ["Adhérence"], readings: ["ゆちゃく"], mnemonicFr: "L'ADHÉRENCE des tissus.", levelId: 51 },
    // 諭 vocabulary
    { word: "諭す", meaningsFr: ["Conseiller"], readings: ["さとす"], mnemonicFr: "CONSEILLER un ami.", levelId: 51 },
    { word: "教諭", meaningsFr: ["Enseignant"], readings: ["きょうゆ"], mnemonicFr: "Un ENSEIGNANT dévoué.", levelId: 51 },
    // 幽 vocabulary
    { word: "幽霊", meaningsFr: ["Fantôme"], readings: ["ゆうれい"], mnemonicFr: "Un FANTÔME effrayant.", levelId: 51 },
    { word: "幽閉", meaningsFr: ["Emprisonnement"], readings: ["ゆうへい"], mnemonicFr: "L'EMPRISONNEMENT secret.", levelId: 51 },
    // 悠 vocabulary
    { word: "悠々", meaningsFr: ["Tranquillement"], readings: ["ゆうゆう"], mnemonicFr: "Vivre TRANQUILLEMENT.", levelId: 51 },
    { word: "悠長", meaningsFr: ["Nonchalant"], readings: ["ゆうちょう"], mnemonicFr: "Un air NONCHALANT.", levelId: 51 },
    // 憂 vocabulary
    { word: "憂鬱", meaningsFr: ["Mélancolie"], readings: ["ゆううつ"], mnemonicFr: "La MÉLANCOLIE d'automne.", levelId: 51 },
    { word: "憂慮", meaningsFr: ["Inquiétude"], readings: ["ゆうりょ"], mnemonicFr: "L'INQUIÉTUDE face au futur.", levelId: 51 },
    { word: "杞憂", meaningsFr: ["Souci inutile"], readings: ["きゆう"], mnemonicFr: "Un SOUCI INUTILE.", levelId: 51 },
    // 裕 vocabulary
    { word: "余裕", meaningsFr: ["Marge"], readings: ["よゆう"], mnemonicFr: "Avoir de la MARGE.", levelId: 51 },
    { word: "裕福", meaningsFr: ["Aisé"], readings: ["ゆうふく"], mnemonicFr: "Une famille AISÉE.", levelId: 51 },
    // 誘 vocabulary
    { word: "誘う", meaningsFr: ["Inviter"], readings: ["さそう"], mnemonicFr: "INVITER un ami.", levelId: 51 },
    { word: "誘導", meaningsFr: ["Guidage"], readings: ["ゆうどう"], mnemonicFr: "Le GUIDAGE des visiteurs.", levelId: 51 },
    { word: "誘拐", meaningsFr: ["Enlèvement"], readings: ["ゆうかい"], mnemonicFr: "Un ENLÈVEMENT d'enfant.", levelId: 51 },
    { word: "勧誘", meaningsFr: ["Sollicitation"], readings: ["かんゆう"], mnemonicFr: "La SOLLICITATION commerciale.", levelId: 51 },
    // 雄 vocabulary
    { word: "雄大", meaningsFr: ["Grandiose"], readings: ["ゆうだい"], mnemonicFr: "Un paysage GRANDIOSE.", levelId: 51 },
    { word: "英雄", meaningsFr: ["Héros"], readings: ["えいゆう"], mnemonicFr: "Un HÉROS national.", levelId: 51 },
    { word: "雄弁", meaningsFr: ["Éloquence"], readings: ["ゆうべん"], mnemonicFr: "L'ÉLOQUENCE d'un orateur.", levelId: 51 },
    // 融 vocabulary
    { word: "融合", meaningsFr: ["Fusion"], readings: ["ゆうごう"], mnemonicFr: "La FUSION des cultures.", levelId: 51 },
    { word: "金融", meaningsFr: ["Finance"], readings: ["きんゆう"], mnemonicFr: "Le monde de la FINANCE.", levelId: 51 },
    { word: "融通", meaningsFr: ["Flexibilité"], readings: ["ゆうずう"], mnemonicFr: "La FLEXIBILITÉ d'esprit.", levelId: 51 },
    // 与 vocabulary
    { word: "与える", meaningsFr: ["Donner"], readings: ["あたえる"], mnemonicFr: "DONNER un cadeau.", levelId: 51 },
    { word: "関与", meaningsFr: ["Implication"], readings: ["かんよ"], mnemonicFr: "L'IMPLICATION dans l'affaire.", levelId: 51 },
    { word: "付与", meaningsFr: ["Attribution"], readings: ["ふよ"], mnemonicFr: "L'ATTRIBUTION d'un prix.", levelId: 51 },
    { word: "与党", meaningsFr: ["Parti au pouvoir"], readings: ["よとう"], mnemonicFr: "Le PARTI AU POUVOIR.", levelId: 51 },
    // 誉 vocabulary
    { word: "名誉", meaningsFr: ["Honneur"], readings: ["めいよ"], mnemonicFr: "L'HONNEUR de la famille.", levelId: 51 },
    { word: "栄誉", meaningsFr: ["Gloire"], readings: ["えいよ"], mnemonicFr: "La GLOIRE du vainqueur.", levelId: 51 },
    // 庸 vocabulary
    { word: "凡庸", meaningsFr: ["Médiocre"], readings: ["ぼんよう"], mnemonicFr: "Un talent MÉDIOCRE.", levelId: 51 },
    { word: "中庸", meaningsFr: ["Juste milieu"], readings: ["ちゅうよう"], mnemonicFr: "Le JUSTE MILIEU.", levelId: 51 },
    // 揚 vocabulary
    { word: "揚げる", meaningsFr: ["Frire"], readings: ["あげる"], mnemonicFr: "FRIRE des tempuras.", levelId: 51 },
    { word: "掲揚", meaningsFr: ["Hisser"], readings: ["けいよう"], mnemonicFr: "HISSER le drapeau.", levelId: 51 },
    { word: "高揚", meaningsFr: ["Exaltation"], readings: ["こうよう"], mnemonicFr: "L'EXALTATION de la foule.", levelId: 51 },
    // 揺 vocabulary
    { word: "揺れる", meaningsFr: ["Trembler"], readings: ["ゆれる"], mnemonicFr: "La terre TREMBLE.", levelId: 51 },
    { word: "動揺", meaningsFr: ["Agitation"], readings: ["どうよう"], mnemonicFr: "L'AGITATION nerveuse.", levelId: 51 },
    { word: "揺らぐ", meaningsFr: ["Vaciller"], readings: ["ゆらぐ"], mnemonicFr: "La flamme VACILLE.", levelId: 51 },
    // 溶 vocabulary
    { word: "溶ける", meaningsFr: ["Fondre"], readings: ["とける"], mnemonicFr: "La glace FOND.", levelId: 51 },
    { word: "溶岩", meaningsFr: ["Lave"], readings: ["ようがん"], mnemonicFr: "La LAVE du volcan.", levelId: 51 },
    { word: "溶接", meaningsFr: ["Soudure"], readings: ["ようせつ"], mnemonicFr: "La SOUDURE du métal.", levelId: 51 },
    { word: "溶液", meaningsFr: ["Solution"], readings: ["ようえき"], mnemonicFr: "Une SOLUTION chimique.", levelId: 51 },
    // 窯 vocabulary
    { word: "窯", meaningsFr: ["Four"], readings: ["かま"], mnemonicFr: "Le FOUR à poterie.", levelId: 51 },
    { word: "窯元", meaningsFr: ["Potier"], readings: ["かまもと"], mnemonicFr: "L'atelier du POTIER.", levelId: 51 },
    // 謡 vocabulary
    { word: "歌謡", meaningsFr: ["Chanson"], readings: ["かよう"], mnemonicFr: "Une CHANSON populaire.", levelId: 51 },
    { word: "民謡", meaningsFr: ["Chanson folklorique"], readings: ["みんよう"], mnemonicFr: "Une CHANSON FOLKLORIQUE.", levelId: 51 },
    // 踊 vocabulary
    { word: "踊り", meaningsFr: ["Danse"], readings: ["おどり"], mnemonicFr: "La DANSE traditionnelle.", levelId: 51 },
    { word: "踊る", meaningsFr: ["Danser"], readings: ["おどる"], mnemonicFr: "DANSER joyeusement.", levelId: 51 },
    { word: "盆踊り", meaningsFr: ["Danse Bon"], readings: ["ぼんおどり"], mnemonicFr: "La DANSE BON d'été.", levelId: 51 },
  ];

  for (const vocab of level51Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 51 complete!");

  // ============================================
  // LEVEL 52 - JLPT N1 Kanji Set 2
  // ============================================

  const level52Kanji = [
    { character: "抑", meaningsFr: ["Réprimer"], readingsOn: ["ヨク"], readingsKun: ["おさ-える"], meaningMnemonicFr: "La main et le sommet. RÉPRIMER.", readingMnemonicFr: "Yoku - RÉPRIMER 'yoku' !" },
    { character: "翌", meaningsFr: ["Lendemain"], readingsOn: ["ヨク"], readingsKun: [], meaningMnemonicFr: "L'aile et le debout. Le LENDEMAIN.", readingMnemonicFr: "Yoku - LENDEMAIN 'yoku' !" },
    { character: "翼", meaningsFr: ["Aile"], readingsOn: ["ヨク"], readingsKun: ["つばさ"], meaningMnemonicFr: "Le plume et le différent. L'AILE.", readingMnemonicFr: "Tsubasa - l'AILE !" },
    { character: "羅", meaningsFr: ["Gaze", "Filet"], readingsOn: ["ラ"], readingsKun: [], meaningMnemonicFr: "Le filet et l'oiseau. La GAZE.", readingMnemonicFr: "Ra - la GAZE 'ra' !" },
    { character: "裸", meaningsFr: ["Nu"], readingsOn: ["ラ"], readingsKun: ["はだか"], meaningMnemonicFr: "Le vêtement et le fruit. NU.", readingMnemonicFr: "Hadaka - NU !" },
    { character: "雷", meaningsFr: ["Tonnerre"], readingsOn: ["ライ"], readingsKun: ["かみなり"], meaningMnemonicFr: "La pluie et le rizière. Le TONNERRE.", readingMnemonicFr: "Kaminari - le TONNERRE !" },
    { character: "頼", meaningsFr: ["Compter sur"], readingsOn: ["ライ"], readingsKun: ["たの-む"], meaningMnemonicFr: "Le lier et la page. COMPTER SUR.", readingMnemonicFr: "Rai - COMPTER SUR 'rai' !" },
    { character: "絡", meaningsFr: ["Emmêler"], readingsOn: ["ラク"], readingsKun: ["から-む"], meaningMnemonicFr: "Le fil et le chaque. EMMÊLER.", readingMnemonicFr: "Raku - EMMÊLER 'raku' !" },
    { character: "酪", meaningsFr: ["Lait"], readingsOn: ["ラク"], readingsKun: [], meaningMnemonicFr: "L'alcool et le chaque. Le LAIT.", readingMnemonicFr: "Raku - le LAIT 'raku' !" },
    { character: "欄", meaningsFr: ["Colonne"], readingsOn: ["ラン"], readingsKun: [], meaningMnemonicFr: "L'arbre et le東. La COLONNE.", readingMnemonicFr: "Ran - la COLONNE 'ran' !" },
    { character: "濫", meaningsFr: ["Déborder"], readingsOn: ["ラン"], readingsKun: [], meaningMnemonicFr: "L'eau et le surveiller. DÉBORDER.", readingMnemonicFr: "Ran - DÉBORDER 'ran' !" },
    { character: "藍", meaningsFr: ["Indigo"], readingsOn: ["ラン"], readingsKun: ["あい"], meaningMnemonicFr: "L'herbe et le surveiller. L'INDIGO.", readingMnemonicFr: "Ran - l'INDIGO 'ran' !" },
    { character: "欄", meaningsFr: ["Colonne"], readingsOn: ["ラン"], readingsKun: [], meaningMnemonicFr: "L'arbre et le東. La COLONNE.", readingMnemonicFr: "Ran - la COLONNE 'ran' !" },
    { character: "吏", meaningsFr: ["Fonctionnaire"], readingsOn: ["リ"], readingsKun: [], meaningMnemonicFr: "La structure. Le FONCTIONNAIRE.", readingMnemonicFr: "Ri - FONCTIONNAIRE 'ri' !" },
    { character: "履", meaningsFr: ["Chaussure"], readingsOn: ["リ"], readingsKun: ["は-く"], meaningMnemonicFr: "Le corps et le retourner. La CHAUSSURE.", readingMnemonicFr: "Ri - la CHAUSSURE 'ri' !" },
    { character: "璃", meaningsFr: ["Verre"], readingsOn: ["リ"], readingsKun: [], meaningMnemonicFr: "Le roi et le离. Le VERRE.", readingMnemonicFr: "Ri - le VERRE 'ri' !" },
    { character: "離", meaningsFr: ["Séparer"], readingsOn: ["リ"], readingsKun: ["はな-れる"], meaningMnemonicFr: "Le禽 et l'oiseau. SÉPARER.", readingMnemonicFr: "Ri - SÉPARER 'ri' !" },
    { character: "慮", meaningsFr: ["Considérer"], readingsOn: ["リョ"], readingsKun: [], meaningMnemonicFr: "Le coeur et le tigre. CONSIDÉRER.", readingMnemonicFr: "Ryo - CONSIDÉRER 'ryo' !" },
    { character: "虜", meaningsFr: ["Captif"], readingsOn: ["リョ"], readingsKun: [], meaningMnemonicFr: "Le tigre et le homme. CAPTIF.", readingMnemonicFr: "Ryo - CAPTIF 'ryo' !" },
    { character: "了", meaningsFr: ["Terminer"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "Le enfant modifié. TERMINER.", readingMnemonicFr: "Ryou - TERMINER 'ryou' !" },
    { character: "僚", meaningsFr: ["Collègue"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "La personne et le terminer. Le COLLÈGUE.", readingMnemonicFr: "Ryou - COLLÈGUE 'ryou' !" },
    { character: "寮", meaningsFr: ["Dortoir"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "Le toit et le terminer. Le DORTOIR.", readingMnemonicFr: "Ryou - DORTOIR 'ryou' !" },
    { character: "涼", meaningsFr: ["Frais"], readingsOn: ["リョウ"], readingsKun: ["すず-しい"], meaningMnemonicFr: "L'eau et la capitale. FRAIS.", readingMnemonicFr: "Ryou - FRAIS 'ryou' !" },
    { character: "猟", meaningsFr: ["Chasse"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "Le chien et le terminer. La CHASSE.", readingMnemonicFr: "Ryou - la CHASSE 'ryou' !" },
    { character: "療", meaningsFr: ["Soigner"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "La maladie et le terminer. SOIGNER.", readingMnemonicFr: "Ryou - SOIGNER 'ryou' !" },
    { character: "瞭", meaningsFr: ["Clair"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "L'oeil et le terminer. CLAIR.", readingMnemonicFr: "Ryou - CLAIR 'ryou' !" },
    { character: "糧", meaningsFr: ["Provisions"], readingsOn: ["リョウ"], readingsKun: ["かて"], meaningMnemonicFr: "Le riz et la quantité. Les PROVISIONS.", readingMnemonicFr: "Ryou - PROVISIONS 'ryou' !" },
    { character: "陵", meaningsFr: ["Colline", "Tombe"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "La colline et le夌. La COLLINE, la TOMBE.", readingMnemonicFr: "Ryou - la TOMBE 'ryou' !" },
    { character: "倫", meaningsFr: ["Éthique"], readingsOn: ["リン"], readingsKun: [], meaningMnemonicFr: "La personne et le册. L'ÉTHIQUE.", readingMnemonicFr: "Rin - l'ÉTHIQUE 'rin' !" },
    { character: "厘", meaningsFr: ["Rin (unité)"], readingsOn: ["リン"], readingsKun: [], meaningMnemonicFr: "Le falaise et le里. Le RIN.", readingMnemonicFr: "Rin - le RIN 'rin' !" },
    { character: "隣", meaningsFr: ["Voisin"], readingsOn: ["リン"], readingsKun: ["となり"], meaningMnemonicFr: "La colline et le米. Le VOISIN.", readingMnemonicFr: "Rin - le VOISIN 'rin' !" },
    { character: "塁", meaningsFr: ["Base"], readingsOn: ["ルイ"], readingsKun: [], meaningMnemonicFr: "La terre et le田. La BASE.", readingMnemonicFr: "Rui - la BASE 'rui' !" },
    { character: "涙", meaningsFr: ["Larme"], readingsOn: ["ルイ"], readingsKun: ["なみだ"], meaningMnemonicFr: "L'eau et le grand. La LARME.", readingMnemonicFr: "Namida - la LARME !" },
    { character: "累", meaningsFr: ["Accumuler"], readingsOn: ["ルイ"], readingsKun: [], meaningMnemonicFr: "Le fil et le田. ACCUMULER.", readingMnemonicFr: "Rui - ACCUMULER 'rui' !" },
    { character: "励", meaningsFr: ["Encourager"], readingsOn: ["レイ"], readingsKun: ["はげ-む"], meaningMnemonicFr: "Le falaise et la force. ENCOURAGER.", readingMnemonicFr: "Rei - ENCOURAGER 'rei' !" },
  ];

  for (const kanji of level52Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 52 },
      create: { ...kanji, levelId: 52 },
    });
  }

  const level52Vocab = [
    // 抑 vocabulary
    { word: "抑える", meaningsFr: ["Réprimer"], readings: ["おさえる"], mnemonicFr: "RÉPRIMER sa colère.", levelId: 52 },
    { word: "抑制", meaningsFr: ["Contrôle"], readings: ["よくせい"], mnemonicFr: "Le CONTRÔLE des émotions.", levelId: 52 },
    { word: "抑圧", meaningsFr: ["Oppression"], readings: ["よくあつ"], mnemonicFr: "L'OPPRESSION du peuple.", levelId: 52 },
    // 翌 vocabulary
    { word: "翌日", meaningsFr: ["Lendemain"], readings: ["よくじつ"], mnemonicFr: "Le LENDEMAIN matin.", levelId: 52 },
    { word: "翌年", meaningsFr: ["Année suivante"], readings: ["よくねん"], mnemonicFr: "L'ANNÉE SUIVANTE.", levelId: 52 },
    { word: "翌月", meaningsFr: ["Mois suivant"], readings: ["よくげつ"], mnemonicFr: "Le MOIS SUIVANT.", levelId: 52 },
    // 翼 vocabulary
    { word: "翼", meaningsFr: ["Aile"], readings: ["つばさ"], mnemonicFr: "Les AILES de l'avion.", levelId: 52 },
    { word: "左翼", meaningsFr: ["Gauche (politique)"], readings: ["さよく"], mnemonicFr: "La GAUCHE politique.", levelId: 52 },
    { word: "右翼", meaningsFr: ["Droite (politique)"], readings: ["うよく"], mnemonicFr: "La DROITE politique.", levelId: 52 },
    // 羅 vocabulary
    { word: "羅列", meaningsFr: ["Énumération"], readings: ["られつ"], mnemonicFr: "L'ÉNUMÉRATION des faits.", levelId: 52 },
    { word: "網羅", meaningsFr: ["Couvrir tout"], readings: ["もうら"], mnemonicFr: "COUVRIR TOUT le sujet.", levelId: 52 },
    // 裸 vocabulary
    { word: "裸", meaningsFr: ["Nu"], readings: ["はだか"], mnemonicFr: "Être NU.", levelId: 52 },
    { word: "裸足", meaningsFr: ["Pieds nus"], readings: ["はだし"], mnemonicFr: "Marcher PIEDS NUS.", levelId: 52 },
    { word: "赤裸々", meaningsFr: ["Franc"], readings: ["せきらら"], mnemonicFr: "Une confession FRANCHE.", levelId: 52 },
    // 雷 vocabulary
    { word: "雷", meaningsFr: ["Tonnerre"], readings: ["かみなり"], mnemonicFr: "Le TONNERRE gronde.", levelId: 52 },
    { word: "雷雨", meaningsFr: ["Orage"], readings: ["らいう"], mnemonicFr: "Un ORAGE violent.", levelId: 52 },
    { word: "落雷", meaningsFr: ["Foudre"], readings: ["らくらい"], mnemonicFr: "La FOUDRE frappe.", levelId: 52 },
    // 頼 vocabulary
    { word: "頼む", meaningsFr: ["Demander"], readings: ["たのむ"], mnemonicFr: "DEMANDER une faveur.", levelId: 52 },
    { word: "頼る", meaningsFr: ["Compter sur"], readings: ["たよる"], mnemonicFr: "COMPTER SUR quelqu'un.", levelId: 52 },
    { word: "信頼", meaningsFr: ["Confiance"], readings: ["しんらい"], mnemonicFr: "La CONFIANCE mutuelle.", levelId: 52 },
    { word: "依頼", meaningsFr: ["Demande"], readings: ["いらい"], mnemonicFr: "Une DEMANDE officielle.", levelId: 52 },
    // 絡 vocabulary
    { word: "絡む", meaningsFr: ["S'emmêler"], readings: ["からむ"], mnemonicFr: "Les fils S'EMMÊLENT.", levelId: 52 },
    { word: "連絡", meaningsFr: ["Contact"], readings: ["れんらく"], mnemonicFr: "Prendre CONTACT.", levelId: 52 },
    { word: "関絡", meaningsFr: ["Lien"], readings: ["かんらく"], mnemonicFr: "Le LIEN entre les faits.", levelId: 52 },
    // 酪 vocabulary
    { word: "酪農", meaningsFr: ["Élevage laitier"], readings: ["らくのう"], mnemonicFr: "L'ÉLEVAGE LAITIER.", levelId: 52 },
    // 欄 vocabulary
    { word: "欄", meaningsFr: ["Colonne"], readings: ["らん"], mnemonicFr: "La COLONNE du journal.", levelId: 52 },
    { word: "空欄", meaningsFr: ["Case vide"], readings: ["くうらん"], mnemonicFr: "Une CASE VIDE.", levelId: 52 },
    // 濫 vocabulary
    { word: "氾濫", meaningsFr: ["Inondation"], readings: ["はんらん"], mnemonicFr: "L'INONDATION de la rivière.", levelId: 52 },
    { word: "乱用", meaningsFr: ["Abus"], readings: ["らんよう"], mnemonicFr: "L'ABUS de pouvoir.", levelId: 52 },
    // 藍 vocabulary
    { word: "藍", meaningsFr: ["Indigo"], readings: ["あい"], mnemonicFr: "La couleur INDIGO.", levelId: 52 },
    { word: "藍色", meaningsFr: ["Bleu indigo"], readings: ["あいいろ"], mnemonicFr: "Le BLEU INDIGO.", levelId: 52 },
    // 吏 vocabulary
    { word: "官吏", meaningsFr: ["Fonctionnaire"], readings: ["かんり"], mnemonicFr: "Un FONCTIONNAIRE public.", levelId: 52 },
    // 履 vocabulary
    { word: "履く", meaningsFr: ["Mettre (chaussures)"], readings: ["はく"], mnemonicFr: "METTRE ses chaussures.", levelId: 52 },
    { word: "履歴", meaningsFr: ["Historique"], readings: ["りれき"], mnemonicFr: "L'HISTORIQUE de navigation.", levelId: 52 },
    { word: "履行", meaningsFr: ["Exécution"], readings: ["りこう"], mnemonicFr: "L'EXÉCUTION du contrat.", levelId: 52 },
    // 離 vocabulary
    { word: "離れる", meaningsFr: ["S'éloigner"], readings: ["はなれる"], mnemonicFr: "S'ÉLOIGNER de la ville.", levelId: 52 },
    { word: "距離", meaningsFr: ["Distance"], readings: ["きょり"], mnemonicFr: "La DISTANCE parcourue.", levelId: 52 },
    { word: "離婚", meaningsFr: ["Divorce"], readings: ["りこん"], mnemonicFr: "Un DIVORCE difficile.", levelId: 52 },
    { word: "分離", meaningsFr: ["Séparation"], readings: ["ぶんり"], mnemonicFr: "La SÉPARATION des pouvoirs.", levelId: 52 },
    // 慮 vocabulary
    { word: "配慮", meaningsFr: ["Considération"], readings: ["はいりょ"], mnemonicFr: "La CONSIDÉRATION pour autrui.", levelId: 52 },
    { word: "考慮", meaningsFr: ["Réflexion"], readings: ["こうりょ"], mnemonicFr: "Une RÉFLEXION approfondie.", levelId: 52 },
    { word: "遠慮", meaningsFr: ["Réserve"], readings: ["えんりょ"], mnemonicFr: "Faire preuve de RÉSERVE.", levelId: 52 },
    // 虜 vocabulary
    { word: "捕虜", meaningsFr: ["Prisonnier"], readings: ["ほりょ"], mnemonicFr: "Un PRISONNIER de guerre.", levelId: 52 },
    // 了 vocabulary
    { word: "了解", meaningsFr: ["Compris"], readings: ["りょうかい"], mnemonicFr: "COMPRIS !", levelId: 52 },
    { word: "完了", meaningsFr: ["Terminé"], readings: ["かんりょう"], mnemonicFr: "Tâche TERMINÉE.", levelId: 52 },
    { word: "終了", meaningsFr: ["Fin"], readings: ["しゅうりょう"], mnemonicFr: "La FIN du programme.", levelId: 52 },
    // 僚 vocabulary
    { word: "同僚", meaningsFr: ["Collègue"], readings: ["どうりょう"], mnemonicFr: "Un COLLÈGUE de travail.", levelId: 52 },
    { word: "官僚", meaningsFr: ["Bureaucrate"], readings: ["かんりょう"], mnemonicFr: "Un BUREAUCRATE.", levelId: 52 },
    // 寮 vocabulary
    { word: "寮", meaningsFr: ["Dortoir"], readings: ["りょう"], mnemonicFr: "Le DORTOIR universitaire.", levelId: 52 },
    { word: "寮生", meaningsFr: ["Pensionnaire"], readings: ["りょうせい"], mnemonicFr: "Un PENSIONNAIRE.", levelId: 52 },
    // 涼 vocabulary
    { word: "涼しい", meaningsFr: ["Frais"], readings: ["すずしい"], mnemonicFr: "Un vent FRAIS.", levelId: 52 },
    { word: "涼む", meaningsFr: ["Se rafraîchir"], readings: ["すずむ"], mnemonicFr: "SE RAFRAÎCHIR à l'ombre.", levelId: 52 },
    { word: "清涼", meaningsFr: ["Rafraîchissant"], readings: ["せいりょう"], mnemonicFr: "Une boisson RAFRAÎCHISSANTE.", levelId: 52 },
    // 猟 vocabulary
    { word: "狩猟", meaningsFr: ["Chasse"], readings: ["しゅりょう"], mnemonicFr: "La CHASSE au gibier.", levelId: 52 },
    { word: "猟師", meaningsFr: ["Chasseur"], readings: ["りょうし"], mnemonicFr: "Un CHASSEUR expérimenté.", levelId: 52 },
    // 療 vocabulary
    { word: "治療", meaningsFr: ["Traitement"], readings: ["ちりょう"], mnemonicFr: "Le TRAITEMENT médical.", levelId: 52 },
    { word: "療養", meaningsFr: ["Convalescence"], readings: ["りょうよう"], mnemonicFr: "La CONVALESCENCE.", levelId: 52 },
    { word: "医療", meaningsFr: ["Soins médicaux"], readings: ["いりょう"], mnemonicFr: "Les SOINS MÉDICAUX.", levelId: 52 },
    // 瞭 vocabulary
    { word: "明瞭", meaningsFr: ["Clair"], readings: ["めいりょう"], mnemonicFr: "Une explication CLAIRE.", levelId: 52 },
    // 糧 vocabulary
    { word: "食糧", meaningsFr: ["Nourriture"], readings: ["しょくりょう"], mnemonicFr: "La NOURRITURE essentielle.", levelId: 52 },
    { word: "糧", meaningsFr: ["Provisions"], readings: ["かて"], mnemonicFr: "Les PROVISIONS pour le voyage.", levelId: 52 },
    // 陵 vocabulary
    { word: "丘陵", meaningsFr: ["Colline"], readings: ["きゅうりょう"], mnemonicFr: "Une COLLINE verdoyante.", levelId: 52 },
    { word: "陵墓", meaningsFr: ["Mausolée"], readings: ["りょうぼ"], mnemonicFr: "Le MAUSOLÉE impérial.", levelId: 52 },
    // 倫 vocabulary
    { word: "倫理", meaningsFr: ["Éthique"], readings: ["りんり"], mnemonicFr: "L'ÉTHIQUE professionnelle.", levelId: 52 },
    { word: "不倫", meaningsFr: ["Adultère"], readings: ["ふりん"], mnemonicFr: "L'ADULTÈRE.", levelId: 52 },
    // 隣 vocabulary
    { word: "隣", meaningsFr: ["Voisin"], readings: ["となり"], mnemonicFr: "Le VOISIN d'à côté.", levelId: 52 },
    { word: "隣人", meaningsFr: ["Voisin"], readings: ["りんじん"], mnemonicFr: "Un bon VOISIN.", levelId: 52 },
    { word: "近隣", meaningsFr: ["Voisinage"], readings: ["きんりん"], mnemonicFr: "Le VOISINAGE paisible.", levelId: 52 },
    // 塁 vocabulary
    { word: "塁", meaningsFr: ["Base"], readings: ["るい"], mnemonicFr: "La BASE au baseball.", levelId: 52 },
    { word: "本塁", meaningsFr: ["Plaque de but"], readings: ["ほんるい"], mnemonicFr: "La PLAQUE DE BUT.", levelId: 52 },
    { word: "満塁", meaningsFr: ["Bases pleines"], readings: ["まんるい"], mnemonicFr: "BASES PLEINES.", levelId: 52 },
    // 涙 vocabulary
    { word: "涙", meaningsFr: ["Larme"], readings: ["なみだ"], mnemonicFr: "Les LARMES de joie.", levelId: 52 },
    { word: "涙ぐむ", meaningsFr: ["S'émouvoir"], readings: ["なみだぐむ"], mnemonicFr: "S'ÉMOUVOIR aux larmes.", levelId: 52 },
    { word: "感涙", meaningsFr: ["Larmes d'émotion"], readings: ["かんるい"], mnemonicFr: "Des LARMES D'ÉMOTION.", levelId: 52 },
    // 累 vocabulary
    { word: "累計", meaningsFr: ["Total cumulé"], readings: ["るいけい"], mnemonicFr: "Le TOTAL CUMULÉ.", levelId: 52 },
    { word: "累積", meaningsFr: ["Accumulation"], readings: ["るいせき"], mnemonicFr: "L'ACCUMULATION des dettes.", levelId: 52 },
    // 励 vocabulary
    { word: "励む", meaningsFr: ["S'efforcer"], readings: ["はげむ"], mnemonicFr: "S'EFFORCER de réussir.", levelId: 52 },
    { word: "励ます", meaningsFr: ["Encourager"], readings: ["はげます"], mnemonicFr: "ENCOURAGER un ami.", levelId: 52 },
    { word: "奨励", meaningsFr: ["Encouragement"], readings: ["しょうれい"], mnemonicFr: "L'ENCOURAGEMENT du professeur.", levelId: 52 },
    { word: "激励", meaningsFr: ["Encouragement"], readings: ["げきれい"], mnemonicFr: "Un discours d'ENCOURAGEMENT.", levelId: 52 },
  ];

  for (const vocab of level52Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 52 complete!");

  // ============================================
  // LEVEL 53 - JLPT N1 Kanji Set 3
  // ============================================

  const level53Kanji = [
    { character: "玲", meaningsFr: ["Clair (son)"], readingsOn: ["レイ"], readingsKun: [], meaningMnemonicFr: "Le roi et le commander. CLAIR.", readingMnemonicFr: "Rei - CLAIR 'rei' !" },
    { character: "鈴", meaningsFr: ["Cloche"], readingsOn: ["レイ"], readingsKun: ["すず"], meaningMnemonicFr: "Le métal et le commander. La CLOCHE.", readingMnemonicFr: "Suzu - la CLOCHE !" },
    { character: "隷", meaningsFr: ["Esclave"], readingsOn: ["レイ"], readingsKun: [], meaningMnemonicFr: "Le attacher et l'oiseau. L'ESCLAVE.", readingMnemonicFr: "Rei - l'ESCLAVE 'rei' !" },
    { character: "零", meaningsFr: ["Zéro"], readingsOn: ["レイ"], readingsKun: [], meaningMnemonicFr: "La pluie et le commander. ZÉRO.", readingMnemonicFr: "Rei - ZÉRO 'rei' !" },
    { character: "霊", meaningsFr: ["Esprit"], readingsOn: ["レイ"], readingsKun: ["たま"], meaningMnemonicFr: "La pluie et le巫. L'ESPRIT.", readingMnemonicFr: "Rei - l'ESPRIT 'rei' !" },
    { character: "麗", meaningsFr: ["Beau"], readingsOn: ["レイ"], readingsKun: ["うるわ-しい"], meaningMnemonicFr: "Le cerf et le丽. BEAU.", readingMnemonicFr: "Rei - BEAU 'rei' !" },
    { character: "暦", meaningsFr: ["Calendrier"], readingsOn: ["レキ"], readingsKun: ["こよみ"], meaningMnemonicFr: "Le soleil et la forêt. Le CALENDRIER.", readingMnemonicFr: "Reki - le CALENDRIER !" },
    { character: "劣", meaningsFr: ["Inférieur"], readingsOn: ["レツ"], readingsKun: ["おと-る"], meaningMnemonicFr: "Le petit et la force. INFÉRIEUR.", readingMnemonicFr: "Retsu - INFÉRIEUR 'retsu' !" },
    { character: "烈", meaningsFr: ["Ardent"], readingsOn: ["レツ"], readingsKun: [], meaningMnemonicFr: "Le feu et le列. ARDENT.", readingMnemonicFr: "Retsu - ARDENT 'retsu' !" },
    { character: "裂", meaningsFr: ["Déchirer"], readingsOn: ["レツ"], readingsKun: ["さ-く"], meaningMnemonicFr: "Le vêtement et le列. DÉCHIRER.", readingMnemonicFr: "Retsu - DÉCHIRER 'retsu' !" },
    { character: "廉", meaningsFr: ["Modeste"], readingsOn: ["レン"], readingsKun: [], meaningMnemonicFr: "Le toit et le兼. MODESTE.", readingMnemonicFr: "Ren - MODESTE 'ren' !" },
    { character: "恋", meaningsFr: ["Amour"], readingsOn: ["レン"], readingsKun: ["こい"], meaningMnemonicFr: "Le coeur et le亦. L'AMOUR.", readingMnemonicFr: "Koi - l'AMOUR !" },
    { character: "錬", meaningsFr: ["Raffiner"], readingsOn: ["レン"], readingsKun: [], meaningMnemonicFr: "Le métal et l'est. RAFFINER.", readingMnemonicFr: "Ren - RAFFINER 'ren' !" },
    { character: "炉", meaningsFr: ["Fourneau"], readingsOn: ["ロ"], readingsKun: [], meaningMnemonicFr: "Le feu et la porte. Le FOURNEAU.", readingMnemonicFr: "Ro - le FOURNEAU 'ro' !" },
    { character: "露", meaningsFr: ["Rosée"], readingsOn: ["ロ"], readingsKun: ["つゆ"], meaningMnemonicFr: "La pluie et le chemin. La ROSÉE.", readingMnemonicFr: "Ro - la ROSÉE 'ro' !" },
    { character: "廊", meaningsFr: ["Couloir"], readingsOn: ["ロウ"], readingsKun: [], meaningMnemonicFr: "Le toit et le郎. Le COULOIR.", readingMnemonicFr: "Rou - le COULOIR 'rou' !" },
    { character: "朗", meaningsFr: ["Clair"], readingsOn: ["ロウ"], readingsKun: ["ほが-らか"], meaningMnemonicFr: "Le bon et la lune. CLAIR.", readingMnemonicFr: "Rou - CLAIR 'rou' !" },
    { character: "楼", meaningsFr: ["Tour"], readingsOn: ["ロウ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le米. La TOUR.", readingMnemonicFr: "Rou - la TOUR 'rou' !" },
    { character: "浪", meaningsFr: ["Vague"], readingsOn: ["ロウ"], readingsKun: [], meaningMnemonicFr: "L'eau et le bon. La VAGUE.", readingMnemonicFr: "Rou - la VAGUE 'rou' !" },
    { character: "漏", meaningsFr: ["Fuir"], readingsOn: ["ロウ"], readingsKun: ["も-れる"], meaningMnemonicFr: "L'eau et le屋. FUIR.", readingMnemonicFr: "Rou - FUIR 'rou' !" },
    { character: "郎", meaningsFr: ["Fils"], readingsOn: ["ロウ"], readingsKun: [], meaningMnemonicFr: "Le bon et la ville. Le FILS.", readingMnemonicFr: "Rou - le FILS 'rou' !" },
    { character: "賄", meaningsFr: ["Pot-de-vin"], readingsOn: ["ワイ"], readingsKun: ["まかな-う"], meaningMnemonicFr: "Le coquillage et le avoir. Le POT-DE-VIN.", readingMnemonicFr: "Wai - POT-DE-VIN 'wai' !" },
    { character: "惑", meaningsFr: ["Perplexe"], readingsOn: ["ワク"], readingsKun: ["まど-う"], meaningMnemonicFr: "Le ou et le coeur. PERPLEXE.", readingMnemonicFr: "Waku - PERPLEXE 'waku' !" },
    { character: "枠", meaningsFr: ["Cadre"], readingsOn: ["ワク"], readingsKun: [], meaningMnemonicFr: "L'arbre et le neuf. Le CADRE.", readingMnemonicFr: "Waku - le CADRE 'waku' !" },
    { character: "湾", meaningsFr: ["Baie"], readingsOn: ["ワン"], readingsKun: [], meaningMnemonicFr: "L'eau et le亦. La BAIE.", readingMnemonicFr: "Wan - la BAIE 'wan' !" },
    { character: "腕", meaningsFr: ["Bras"], readingsOn: ["ワン"], readingsKun: ["うで"], meaningMnemonicFr: "La chair et le宛. Le BRAS.", readingMnemonicFr: "Ude - le BRAS !" },
    { character: "丼", meaningsFr: ["Bol de riz"], readingsOn: ["ドン"], readingsKun: ["どんぶり"], meaningMnemonicFr: "Le puits avec un point. Le BOL DE RIZ.", readingMnemonicFr: "Don - le BOL 'don' !" },
    { character: "傲", meaningsFr: ["Arrogant"], readingsOn: ["ゴウ"], readingsKun: ["おご-る"], meaningMnemonicFr: "La personne et l'敖. ARROGANT.", readingMnemonicFr: "Gou - ARROGANT 'gou' !" },
    { character: "刹", meaningsFr: ["Temple"], readingsOn: ["セツ"], readingsKun: [], meaningMnemonicFr: "Le sabre et le杀. Le TEMPLE.", readingMnemonicFr: "Setsu - le TEMPLE 'setsu' !" },
    { character: "喩", meaningsFr: ["Métaphore"], readingsOn: ["ユ"], readingsKun: ["たと-える"], meaningMnemonicFr: "La bouche et le俞. La MÉTAPHORE.", readingMnemonicFr: "Yu - la MÉTAPHORE 'yu' !" },
    { character: "嗅", meaningsFr: ["Sentir"], readingsOn: ["キュウ"], readingsKun: ["か-ぐ"], meaningMnemonicFr: "La bouche et l'臭. SENTIR.", readingMnemonicFr: "Kagu - SENTIR !" },
    { character: "嘲", meaningsFr: ["Se moquer"], readingsOn: ["チョウ"], readingsKun: ["あざけ-る"], meaningMnemonicFr: "La bouche et le朝. SE MOQUER.", readingMnemonicFr: "Chou - SE MOQUER 'chou' !" },
    { character: "毀", meaningsFr: ["Détruire"], readingsOn: ["キ"], readingsKun: ["こわ-す"], meaningMnemonicFr: "Le臼 et le毛. DÉTRUIRE.", readingMnemonicFr: "Ki - DÉTRUIRE 'ki' !" },
    { character: "璧", meaningsFr: ["Jade"], readingsOn: ["ヘキ"], readingsKun: [], meaningMnemonicFr: "Le mur et le玉. Le JADE.", readingMnemonicFr: "Heki - le JADE 'heki' !" },
    { character: "癒", meaningsFr: ["Guérir"], readingsOn: ["ユ"], readingsKun: ["い-える"], meaningMnemonicFr: "La maladie et l'愈. GUÉRIR.", readingMnemonicFr: "Yu - GUÉRIR 'yu' !" },
  ];

  for (const kanji of level53Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 53 },
      create: { ...kanji, levelId: 53 },
    });
  }

  const level53Vocab = [
    // 鈴 vocabulary
    { word: "鈴", meaningsFr: ["Cloche"], readings: ["すず"], mnemonicFr: "Une petite CLOCHE.", levelId: 53 },
    { word: "鈴虫", meaningsFr: ["Grillon"], readings: ["すずむし"], mnemonicFr: "Le GRILLON chante.", levelId: 53 },
    { word: "風鈴", meaningsFr: ["Carillon"], readings: ["ふうりん"], mnemonicFr: "Un CARILLON japonais.", levelId: 53 },
    // 零 vocabulary
    { word: "零", meaningsFr: ["Zéro"], readings: ["れい"], mnemonicFr: "Le nombre ZÉRO.", levelId: 53 },
    { word: "零点", meaningsFr: ["Zéro point"], readings: ["れいてん"], mnemonicFr: "Avoir ZÉRO POINT.", levelId: 53 },
    { word: "零下", meaningsFr: ["Sous zéro"], readings: ["れいか"], mnemonicFr: "Température SOUS ZÉRO.", levelId: 53 },
    // 霊 vocabulary
    { word: "霊", meaningsFr: ["Esprit"], readings: ["れい"], mnemonicFr: "L'ESPRIT des ancêtres.", levelId: 53 },
    { word: "幽霊", meaningsFr: ["Fantôme"], readings: ["ゆうれい"], mnemonicFr: "Un FANTÔME effrayant.", levelId: 53 },
    { word: "霊園", meaningsFr: ["Cimetière"], readings: ["れいえん"], mnemonicFr: "Le CIMETIÈRE paisible.", levelId: 53 },
    { word: "霊感", meaningsFr: ["Intuition"], readings: ["れいかん"], mnemonicFr: "L'INTUITION spirituelle.", levelId: 53 },
    // 麗 vocabulary
    { word: "綺麗", meaningsFr: ["Beau"], readings: ["きれい"], mnemonicFr: "C'est très BEAU.", levelId: 53 },
    { word: "華麗", meaningsFr: ["Splendide"], readings: ["かれい"], mnemonicFr: "Un style SPLENDIDE.", levelId: 53 },
    { word: "秀麗", meaningsFr: ["Gracieux"], readings: ["しゅうれい"], mnemonicFr: "Un paysage GRACIEUX.", levelId: 53 },
    // 暦 vocabulary
    { word: "暦", meaningsFr: ["Calendrier"], readings: ["こよみ"], mnemonicFr: "Le CALENDRIER traditionnel.", levelId: 53 },
    { word: "西暦", meaningsFr: ["Ère chrétienne"], readings: ["せいれき"], mnemonicFr: "L'ÈRE CHRÉTIENNE.", levelId: 53 },
    { word: "旧暦", meaningsFr: ["Ancien calendrier"], readings: ["きゅうれき"], mnemonicFr: "L'ANCIEN CALENDRIER.", levelId: 53 },
    // 劣 vocabulary
    { word: "劣る", meaningsFr: ["Être inférieur"], readings: ["おとる"], mnemonicFr: "ÊTRE INFÉRIEUR en qualité.", levelId: 53 },
    { word: "劣等", meaningsFr: ["Infériorité"], readings: ["れっとう"], mnemonicFr: "Le complexe d'INFÉRIORITÉ.", levelId: 53 },
    { word: "劣化", meaningsFr: ["Détérioration"], readings: ["れっか"], mnemonicFr: "La DÉTÉRIORATION du matériel.", levelId: 53 },
    // 烈 vocabulary
    { word: "猛烈", meaningsFr: ["Violent"], readings: ["もうれつ"], mnemonicFr: "Une tempête VIOLENTE.", levelId: 53 },
    { word: "激烈", meaningsFr: ["Féroce"], readings: ["げきれつ"], mnemonicFr: "Une compétition FÉROCE.", levelId: 53 },
    { word: "壮烈", meaningsFr: ["Héroïque"], readings: ["そうれつ"], mnemonicFr: "Une mort HÉROÏQUE.", levelId: 53 },
    // 裂 vocabulary
    { word: "裂く", meaningsFr: ["Déchirer"], readings: ["さく"], mnemonicFr: "DÉCHIRER le papier.", levelId: 53 },
    { word: "分裂", meaningsFr: ["Division"], readings: ["ぶんれつ"], mnemonicFr: "La DIVISION cellulaire.", levelId: 53 },
    { word: "破裂", meaningsFr: ["Explosion"], readings: ["はれつ"], mnemonicFr: "L'EXPLOSION du ballon.", levelId: 53 },
    // 廉 vocabulary
    { word: "廉価", meaningsFr: ["Bon marché"], readings: ["れんか"], mnemonicFr: "Un prix BON MARCHÉ.", levelId: 53 },
    { word: "清廉", meaningsFr: ["Intègre"], readings: ["せいれん"], mnemonicFr: "Un homme INTÈGRE.", levelId: 53 },
    // 恋 vocabulary
    { word: "恋", meaningsFr: ["Amour"], readings: ["こい"], mnemonicFr: "L'AMOUR romantique.", levelId: 53 },
    { word: "恋人", meaningsFr: ["Amoureux"], readings: ["こいびと"], mnemonicFr: "Mon AMOUREUX.", levelId: 53 },
    { word: "恋愛", meaningsFr: ["Romance"], readings: ["れんあい"], mnemonicFr: "Une ROMANCE passionnée.", levelId: 53 },
    { word: "失恋", meaningsFr: ["Chagrin d'amour"], readings: ["しつれん"], mnemonicFr: "Un CHAGRIN D'AMOUR.", levelId: 53 },
    // 錬 vocabulary
    { word: "鍛錬", meaningsFr: ["Entraînement"], readings: ["たんれん"], mnemonicFr: "L'ENTRAÎNEMENT intensif.", levelId: 53 },
    { word: "精錬", meaningsFr: ["Affinage"], readings: ["せいれん"], mnemonicFr: "L'AFFINAGE du métal.", levelId: 53 },
    // 炉 vocabulary
    { word: "炉", meaningsFr: ["Fourneau"], readings: ["ろ"], mnemonicFr: "Le FOURNEAU chaud.", levelId: 53 },
    { word: "暖炉", meaningsFr: ["Cheminée"], readings: ["だんろ"], mnemonicFr: "La CHEMINÉE en hiver.", levelId: 53 },
    { word: "原子炉", meaningsFr: ["Réacteur nucléaire"], readings: ["げんしろ"], mnemonicFr: "Le RÉACTEUR NUCLÉAIRE.", levelId: 53 },
    // 露 vocabulary
    { word: "露", meaningsFr: ["Rosée"], readings: ["つゆ"], mnemonicFr: "La ROSÉE du matin.", levelId: 53 },
    { word: "露出", meaningsFr: ["Exposition"], readings: ["ろしゅつ"], mnemonicFr: "L'EXPOSITION de la peau.", levelId: 53 },
    { word: "暴露", meaningsFr: ["Révélation"], readings: ["ばくろ"], mnemonicFr: "La RÉVÉLATION d'un secret.", levelId: 53 },
    // 廊 vocabulary
    { word: "廊下", meaningsFr: ["Couloir"], readings: ["ろうか"], mnemonicFr: "Le COULOIR de l'école.", levelId: 53 },
    { word: "画廊", meaningsFr: ["Galerie"], readings: ["がろう"], mnemonicFr: "La GALERIE d'art.", levelId: 53 },
    // 朗 vocabulary
    { word: "朗らか", meaningsFr: ["Joyeux"], readings: ["ほがらか"], mnemonicFr: "Un caractère JOYEUX.", levelId: 53 },
    { word: "朗読", meaningsFr: ["Lecture à voix haute"], readings: ["ろうどく"], mnemonicFr: "La LECTURE À VOIX HAUTE.", levelId: 53 },
    { word: "明朗", meaningsFr: ["Gai"], readings: ["めいろう"], mnemonicFr: "Une personnalité GAIE.", levelId: 53 },
    // 浪 vocabulary
    { word: "波浪", meaningsFr: ["Vagues"], readings: ["はろう"], mnemonicFr: "Les VAGUES de l'océan.", levelId: 53 },
    { word: "浪費", meaningsFr: ["Gaspillage"], readings: ["ろうひ"], mnemonicFr: "Le GASPILLAGE d'argent.", levelId: 53 },
    { word: "浪人", meaningsFr: ["Ronin"], readings: ["ろうにん"], mnemonicFr: "Un RONIN sans maître.", levelId: 53 },
    // 漏 vocabulary
    { word: "漏れる", meaningsFr: ["Fuir"], readings: ["もれる"], mnemonicFr: "L'eau FUIT du tuyau.", levelId: 53 },
    { word: "漏洩", meaningsFr: ["Fuite"], readings: ["ろうえい"], mnemonicFr: "La FUITE d'informations.", levelId: 53 },
    { word: "雨漏り", meaningsFr: ["Fuite de toit"], readings: ["あまもり"], mnemonicFr: "Une FUITE DE TOIT.", levelId: 53 },
    // 賄 vocabulary
    { word: "賄賂", meaningsFr: ["Pot-de-vin"], readings: ["わいろ"], mnemonicFr: "Un POT-DE-VIN illégal.", levelId: 53 },
    { word: "賄う", meaningsFr: ["Fournir"], readings: ["まかなう"], mnemonicFr: "FOURNIR les repas.", levelId: 53 },
    // 枠 vocabulary
    { word: "枠", meaningsFr: ["Cadre"], readings: ["わく"], mnemonicFr: "Le CADRE de la photo.", levelId: 53 },
    { word: "枠組み", meaningsFr: ["Structure"], readings: ["わくぐみ"], mnemonicFr: "La STRUCTURE du projet.", levelId: 53 },
    // 湾 vocabulary
    { word: "湾", meaningsFr: ["Baie"], readings: ["わん"], mnemonicFr: "La BAIE de Tokyo.", levelId: 53 },
    { word: "港湾", meaningsFr: ["Port"], readings: ["こうわん"], mnemonicFr: "Le PORT maritime.", levelId: 53 },
    // 腕 vocabulary
    { word: "腕", meaningsFr: ["Bras"], readings: ["うで"], mnemonicFr: "Le BRAS musclé.", levelId: 53 },
    { word: "腕前", meaningsFr: ["Habileté"], readings: ["うでまえ"], mnemonicFr: "L'HABILETÉ du chef.", levelId: 53 },
    { word: "腕時計", meaningsFr: ["Montre"], readings: ["うでどけい"], mnemonicFr: "Une MONTRE au poignet.", levelId: 53 },
    // 丼 vocabulary
    { word: "丼", meaningsFr: ["Bol de riz"], readings: ["どんぶり"], mnemonicFr: "Un BOL DE RIZ garni.", levelId: 53 },
    { word: "牛丼", meaningsFr: ["Bol de boeuf"], readings: ["ぎゅうどん"], mnemonicFr: "Un BOL DE BOEUF.", levelId: 53 },
    { word: "親子丼", meaningsFr: ["Bol poulet-oeuf"], readings: ["おやこどん"], mnemonicFr: "Un BOL POULET-OEUF.", levelId: 53 },
  ];

  for (const vocab of level53Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 53 complete!");

  console.log("Levels 51-53 seeded. Run additional scripts for 54-60...");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
