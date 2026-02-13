import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding levels 41-50 (WaniKani methodology)...");

  // Create levels 41-50
  for (let i = 41; i <= 50; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  // ============================================
  // LEVEL 41 - WaniKani Level 41
  // Kanji: 遜伺徹瀬撤措拠儀樹棄虎蛍蜂酎蜜艦潜拳炭畑包衣仁鉱至誠郷侵偽嘘凄喧嘩
  // ============================================

  const level41Radicals = [
    { character: "虎", meaningFr: "Tigre", mnemonic: "Le TIGRE féroce avec ses rayures !" },
    { character: "蛍", meaningFr: "Luciole", mnemonic: "L'insecte et le feu. La LUCIOLE qui brille !" },
    { character: "艦", meaningFr: "Navire de guerre", mnemonic: "Le bateau et le surveiller. Le NAVIRE DE GUERRE !" },
  ];

  for (const radical of level41Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 41 } },
      update: { ...radical },
      create: { ...radical, levelId: 41 },
    });
  }

  const level41Kanji = [
    {
      character: "遜",
      meaningsFr: ["Humble", "Modeste"],
      readingsOn: ["ソン"],
      readingsKun: [],
      meaningMnemonicFr: "Le mouvement et le petit-fils. HUMBLE, MODESTE.",
      readingMnemonicFr: "Son - HUMBLE 'son' !",
    },
    {
      character: "伺",
      meaningsFr: ["Demander", "Visiter"],
      readingsOn: ["シ"],
      readingsKun: ["うかが-う"],
      meaningMnemonicFr: "La personne et le commandement. DEMANDER, VISITER.",
      readingMnemonicFr: "Ukagau - DEMANDER poliment !",
    },
    {
      character: "徹",
      meaningsFr: ["Pénétrer", "Complet"],
      readingsOn: ["テツ"],
      readingsKun: [],
      meaningMnemonicFr: "Le pas et l'atteindre. PÉNÉTRER, COMPLET.",
      readingMnemonicFr: "Tetsu - PÉNÉTRER 'tetsu' !",
    },
    {
      character: "瀬",
      meaningsFr: ["Rapide", "Courant"],
      readingsOn: ["ライ"],
      readingsKun: ["せ"],
      meaningMnemonicFr: "L'eau et le lier. Le RAPIDE, le COURANT d'eau.",
      readingMnemonicFr: "Se - le COURANT 'se' !",
    },
    {
      character: "撤",
      meaningsFr: ["Retirer", "Supprimer"],
      readingsOn: ["テツ"],
      readingsKun: [],
      meaningMnemonicFr: "La main et l'atteindre. RETIRER, SUPPRIMER.",
      readingMnemonicFr: "Tetsu - RETIRER 'tetsu' !",
    },
    {
      character: "措",
      meaningsFr: ["Mesure", "Disposer"],
      readingsOn: ["ソ"],
      readingsKun: [],
      meaningMnemonicFr: "La main et l'ancien. La MESURE, DISPOSER.",
      readingMnemonicFr: "So - la MESURE 'so' !",
    },
    {
      character: "拠",
      meaningsFr: ["Base", "Dépendre"],
      readingsOn: ["キョ", "コ"],
      readingsKun: ["よ-る"],
      meaningMnemonicFr: "La main et le traiter. La BASE, DÉPENDRE de.",
      readingMnemonicFr: "Kyo - la BASE 'kyo' !",
    },
    {
      character: "儀",
      meaningsFr: ["Cérémonie", "Manière"],
      readingsOn: ["ギ"],
      readingsKun: [],
      meaningMnemonicFr: "La personne et la justice. La CÉRÉMONIE, la MANIÈRE.",
      readingMnemonicFr: "Gi - la CÉRÉMONIE 'gi' !",
    },
    {
      character: "樹",
      meaningsFr: ["Arbre"],
      readingsOn: ["ジュ"],
      readingsKun: ["き"],
      meaningMnemonicFr: "Le bois et le tambour. L'ARBRE majestueux.",
      readingMnemonicFr: "Ju - l'ARBRE 'ju' !",
    },
    {
      character: "棄",
      meaningsFr: ["Abandonner", "Rejeter"],
      readingsOn: ["キ"],
      readingsKun: [],
      meaningMnemonicFr: "Le bois et le bébé. ABANDONNER, REJETER.",
      readingMnemonicFr: "Ki - ABANDONNER 'ki' !",
    },
    {
      character: "虎",
      meaningsFr: ["Tigre"],
      readingsOn: ["コ"],
      readingsKun: ["とら"],
      meaningMnemonicFr: "La forme du tigre. Le TIGRE féroce.",
      readingMnemonicFr: "Tora - le TIGRE 'tora' !",
    },
    {
      character: "蛍",
      meaningsFr: ["Luciole"],
      readingsOn: ["ケイ"],
      readingsKun: ["ほたる"],
      meaningMnemonicFr: "L'insecte et le feu. La LUCIOLE qui brille.",
      readingMnemonicFr: "Hotaru - la LUCIOLE 'hotaru' !",
    },
    {
      character: "蜂",
      meaningsFr: ["Abeille"],
      readingsOn: ["ホウ"],
      readingsKun: ["はち"],
      meaningMnemonicFr: "L'insecte et la pointe. L'ABEILLE qui pique.",
      readingMnemonicFr: "Hachi - l'ABEILLE 'hachi' !",
    },
    {
      character: "酎",
      meaningsFr: ["Shochu"],
      readingsOn: ["チュウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le vin et le pouce. Le SHOCHU, alcool japonais.",
      readingMnemonicFr: "Chuu - le SHOCHU 'chuu' !",
    },
    {
      character: "蜜",
      meaningsFr: ["Miel", "Nectar"],
      readingsOn: ["ミツ"],
      readingsKun: [],
      meaningMnemonicFr: "Le toit et l'insecte. Le MIEL, le NECTAR.",
      readingMnemonicFr: "Mitsu - le MIEL 'mitsu' !",
    },
    {
      character: "艦",
      meaningsFr: ["Navire de guerre"],
      readingsOn: ["カン"],
      readingsKun: [],
      meaningMnemonicFr: "Le bateau et le surveiller. Le NAVIRE DE GUERRE.",
      readingMnemonicFr: "Kan - le NAVIRE 'kan' !",
    },
    {
      character: "潜",
      meaningsFr: ["Plonger", "Cacher"],
      readingsOn: ["セン"],
      readingsKun: ["ひそ-む", "もぐ-る"],
      meaningMnemonicFr: "L'eau et le remplacer. PLONGER sous l'eau, se CACHER.",
      readingMnemonicFr: "Moguru - PLONGER !",
    },
    {
      character: "拳",
      meaningsFr: ["Poing"],
      readingsOn: ["ケン"],
      readingsKun: ["こぶし"],
      meaningMnemonicFr: "La main et le rassembler. Le POING serré.",
      readingMnemonicFr: "Kobushi - le POING 'kobushi' !",
    },
    {
      character: "炭",
      meaningsFr: ["Charbon"],
      readingsOn: ["タン"],
      readingsKun: ["すみ"],
      meaningMnemonicFr: "La montagne et le feu. Le CHARBON noir.",
      readingMnemonicFr: "Sumi - le CHARBON 'sumi' !",
    },
    {
      character: "畑",
      meaningsFr: ["Champ", "Ferme"],
      readingsOn: [],
      readingsKun: ["はた", "はたけ"],
      meaningMnemonicFr: "Le feu et le champ. Le CHAMP cultivé, la FERME.",
      readingMnemonicFr: "Hatake - le CHAMP 'hatake' !",
    },
    {
      character: "包",
      meaningsFr: ["Envelopper", "Paquet"],
      readingsOn: ["ホウ"],
      readingsKun: ["つつ-む"],
      meaningMnemonicFr: "L'enveloppe et le soi. ENVELOPPER, le PAQUET.",
      readingMnemonicFr: "Tsutsumu - ENVELOPPER !",
    },
    {
      character: "衣",
      meaningsFr: ["Vêtement", "Habit"],
      readingsOn: ["イ"],
      readingsKun: ["ころも"],
      meaningMnemonicFr: "La forme du vêtement. Le VÊTEMENT, l'HABIT.",
      readingMnemonicFr: "I - le VÊTEMENT 'i' !",
    },
    {
      character: "仁",
      meaningsFr: ["Bienveillance", "Humanité"],
      readingsOn: ["ジン", "ニン"],
      readingsKun: [],
      meaningMnemonicFr: "La personne et le deux. La BIENVEILLANCE, l'HUMANITÉ.",
      readingMnemonicFr: "Jin - la BIENVEILLANCE 'jin' !",
    },
    {
      character: "鉱",
      meaningsFr: ["Minerai", "Mine"],
      readingsOn: ["コウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le métal et le large. Le MINERAI, la MINE.",
      readingMnemonicFr: "Kou - le MINERAI 'kou' !",
    },
    {
      character: "至",
      meaningsFr: ["Atteindre", "Extrême"],
      readingsOn: ["シ"],
      readingsKun: ["いた-る"],
      meaningMnemonicFr: "La flèche qui atteint. ATTEINDRE, EXTRÊME.",
      readingMnemonicFr: "Itaru - ATTEINDRE !",
    },
    {
      character: "誠",
      meaningsFr: ["Sincérité", "Fidélité"],
      readingsOn: ["セイ"],
      readingsKun: ["まこと"],
      meaningMnemonicFr: "Les paroles et le devenir. La SINCÉRITÉ, la FIDÉLITÉ.",
      readingMnemonicFr: "Makoto - la SINCÉRITÉ 'makoto' !",
    },
    {
      character: "郷",
      meaningsFr: ["Village natal", "Campagne"],
      readingsOn: ["キョウ", "ゴウ"],
      readingsKun: ["さと"],
      meaningMnemonicFr: "Le bon et la ville. Le VILLAGE NATAL, la CAMPAGNE.",
      readingMnemonicFr: "Kyou - le VILLAGE NATAL 'kyou' !",
    },
    {
      character: "侵",
      meaningsFr: ["Envahir", "Violer"],
      readingsOn: ["シン"],
      readingsKun: ["おか-す"],
      meaningMnemonicFr: "La personne et le balayer. ENVAHIR, VIOLER un territoire.",
      readingMnemonicFr: "Shin - ENVAHIR 'shin' !",
    },
    {
      character: "偽",
      meaningsFr: ["Faux", "Contrefait"],
      readingsOn: ["ギ"],
      readingsKun: ["いつわ-る", "にせ"],
      meaningMnemonicFr: "La personne et le faire. FAUX, CONTREFAIT.",
      readingMnemonicFr: "Nise - FAUX 'nise' !",
    },
    {
      character: "嘘",
      meaningsFr: ["Mensonge"],
      readingsOn: ["キョ"],
      readingsKun: ["うそ"],
      meaningMnemonicFr: "La bouche et le vide. Le MENSONGE.",
      readingMnemonicFr: "Uso - le MENSONGE 'uso' !",
    },
    {
      character: "凄",
      meaningsFr: ["Terrible", "Incroyable"],
      readingsOn: ["セイ"],
      readingsKun: ["すご-い"],
      meaningMnemonicFr: "La glace et la femme. TERRIBLE, INCROYABLE.",
      readingMnemonicFr: "Sugoi - INCROYABLE !",
    },
    {
      character: "喧",
      meaningsFr: ["Bruyant", "Querelle"],
      readingsOn: ["ケン"],
      readingsKun: ["やかま-しい"],
      meaningMnemonicFr: "La bouche et le déclarer. BRUYANT, QUERELLE.",
      readingMnemonicFr: "Ken - BRUYANT 'ken' !",
    },
    {
      character: "嘩",
      meaningsFr: ["Vacarme", "Bruit"],
      readingsOn: ["カ"],
      readingsKun: [],
      meaningMnemonicFr: "La bouche et la fleur. Le VACARME, le BRUIT.",
      readingMnemonicFr: "Ka - le VACARME 'ka' !",
    },
  ];

  for (const kanji of level41Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 41 },
      create: { ...kanji, levelId: 41 },
    });
  }

  const level41Vocab = [
    { word: "謙遜", meaningsFr: ["Modestie"], readings: ["けんそん"], mnemonicFr: "La MODESTIE sincère.", levelId: 41 },
    { word: "伺う", meaningsFr: ["Demander"], readings: ["うかがう"], mnemonicFr: "DEMANDER poliment.", levelId: 41 },
    { word: "徹底", meaningsFr: ["Complet"], readings: ["てってい"], mnemonicFr: "Un nettoyage COMPLET.", levelId: 41 },
    { word: "撤退", meaningsFr: ["Retraite"], readings: ["てったい"], mnemonicFr: "La RETRAITE militaire.", levelId: 41 },
    { word: "措置", meaningsFr: ["Mesure"], readings: ["そち"], mnemonicFr: "Une MESURE préventive.", levelId: 41 },
    { word: "根拠", meaningsFr: ["Base"], readings: ["こんきょ"], mnemonicFr: "La BASE de l'argument.", levelId: 41 },
    { word: "儀式", meaningsFr: ["Cérémonie"], readings: ["ぎしき"], mnemonicFr: "Une CÉRÉMONIE solennelle.", levelId: 41 },
    { word: "樹木", meaningsFr: ["Arbre"], readings: ["じゅもく"], mnemonicFr: "Les ARBRES de la forêt.", levelId: 41 },
    { word: "廃棄", meaningsFr: ["Abandon"], readings: ["はいき"], mnemonicFr: "L'ABANDON des déchets.", levelId: 41 },
    { word: "虎", meaningsFr: ["Tigre"], readings: ["とら"], mnemonicFr: "Un TIGRE féroce.", levelId: 41 },
    { word: "蛍", meaningsFr: ["Luciole"], readings: ["ほたる"], mnemonicFr: "Une LUCIOLE brillante.", levelId: 41 },
    { word: "蜂", meaningsFr: ["Abeille"], readings: ["はち"], mnemonicFr: "Une ABEILLE qui butine.", levelId: 41 },
    { word: "焼酎", meaningsFr: ["Shochu"], readings: ["しょうちゅう"], mnemonicFr: "Du SHOCHU japonais.", levelId: 41 },
    { word: "蜂蜜", meaningsFr: ["Miel"], readings: ["はちみつ"], mnemonicFr: "Du MIEL naturel.", levelId: 41 },
    { word: "戦艦", meaningsFr: ["Cuirassé"], readings: ["せんかん"], mnemonicFr: "Un CUIRASSÉ de guerre.", levelId: 41 },
    { word: "潜る", meaningsFr: ["Plonger"], readings: ["もぐる"], mnemonicFr: "PLONGER sous l'eau.", levelId: 41 },
    { word: "拳", meaningsFr: ["Poing"], readings: ["こぶし"], mnemonicFr: "Le POING serré.", levelId: 41 },
    { word: "石炭", meaningsFr: ["Charbon"], readings: ["せきたん"], mnemonicFr: "Du CHARBON noir.", levelId: 41 },
    { word: "畑", meaningsFr: ["Champ"], readings: ["はたけ"], mnemonicFr: "Un CHAMP cultivé.", levelId: 41 },
    { word: "包む", meaningsFr: ["Envelopper"], readings: ["つつむ"], mnemonicFr: "ENVELOPPER un cadeau.", levelId: 41 },
    { word: "衣服", meaningsFr: ["Vêtements"], readings: ["いふく"], mnemonicFr: "Les VÊTEMENTS.", levelId: 41 },
    { word: "鉱山", meaningsFr: ["Mine"], readings: ["こうざん"], mnemonicFr: "Une MINE de charbon.", levelId: 41 },
    { word: "至る", meaningsFr: ["Atteindre"], readings: ["いたる"], mnemonicFr: "ATTEINDRE le sommet.", levelId: 41 },
    { word: "誠実", meaningsFr: ["Sincère"], readings: ["せいじつ"], mnemonicFr: "Une personne SINCÈRE.", levelId: 41 },
    { word: "故郷", meaningsFr: ["Ville natale"], readings: ["こきょう"], mnemonicFr: "Ma VILLE NATALE.", levelId: 41 },
    { word: "侵入", meaningsFr: ["Intrusion"], readings: ["しんにゅう"], mnemonicFr: "Une INTRUSION illégale.", levelId: 41 },
    { word: "偽物", meaningsFr: ["Contrefaçon"], readings: ["にせもの"], mnemonicFr: "Une CONTREFAÇON.", levelId: 41 },
    { word: "嘘", meaningsFr: ["Mensonge"], readings: ["うそ"], mnemonicFr: "Un MENSONGE.", levelId: 41 },
    { word: "凄い", meaningsFr: ["Incroyable"], readings: ["すごい"], mnemonicFr: "C'est INCROYABLE !", levelId: 41 },
    { word: "喧嘩", meaningsFr: ["Dispute"], readings: ["けんか"], mnemonicFr: "Une DISPUTE bruyante.", levelId: 41 },
  ];

  for (const vocab of level41Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 41 complete!");

  // ============================================
  // LEVEL 42 - WaniKani Level 42
  // Kanji: 克到双哲喪堅床括弧挑掘揚握揺斎暫析枢軸柄泊滑潟焦範紛糾綱網肝芝荒袋餅
  // ============================================

  const level42Radicals = [
    { character: "双", meaningFr: "Paire", mnemonic: "Les deux mains. Une PAIRE de choses !" },
    { character: "喪", meaningFr: "Deuil", mnemonic: "La bouche et les vêtements. Le DEUIL d'un proche !" },
    { character: "網", meaningFr: "Filet", mnemonic: "Le fil et le montagne. Le FILET pour attraper !" },
  ];

  for (const radical of level42Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 42 } },
      update: { ...radical },
      create: { ...radical, levelId: 42 },
    });
  }

  const level42Kanji = [
    {
      character: "克",
      meaningsFr: ["Surmonter", "Vaincre"],
      readingsOn: ["コク"],
      readingsKun: [],
      meaningMnemonicFr: "Le dix et le frère. SURMONTER les difficultés, VAINCRE.",
      readingMnemonicFr: "Koku - SURMONTER 'koku' !",
    },
    {
      character: "到",
      meaningsFr: ["Arriver", "Atteindre"],
      readingsOn: ["トウ"],
      readingsKun: [],
      meaningMnemonicFr: "Aller et le couteau. ARRIVER, ATTEINDRE sa destination.",
      readingMnemonicFr: "Tou - ARRIVER 'tou' !",
    },
    {
      character: "双",
      meaningsFr: ["Paire", "Double"],
      readingsOn: ["ソウ"],
      readingsKun: ["ふた"],
      meaningMnemonicFr: "Les deux mains côte à côte. Une PAIRE, DOUBLE.",
      readingMnemonicFr: "Sou - une PAIRE 'sou' !",
    },
    {
      character: "哲",
      meaningsFr: ["Philosophie", "Sage"],
      readingsOn: ["テツ"],
      readingsKun: [],
      meaningMnemonicFr: "La bouche et le plier. La PHILOSOPHIE, le SAGE.",
      readingMnemonicFr: "Tetsu - la PHILOSOPHIE 'tetsu' !",
    },
    {
      character: "喪",
      meaningsFr: ["Deuil", "Perdre"],
      readingsOn: ["ソウ"],
      readingsKun: ["も"],
      meaningMnemonicFr: "La bouche et les vêtements de deuil. Le DEUIL, PERDRE.",
      readingMnemonicFr: "Sou - le DEUIL 'sou' !",
    },
    {
      character: "堅",
      meaningsFr: ["Solide", "Ferme"],
      readingsOn: ["ケン"],
      readingsKun: ["かた-い"],
      meaningMnemonicFr: "L'œil et la terre. SOLIDE, FERME.",
      readingMnemonicFr: "Katai - SOLIDE !",
    },
    {
      character: "床",
      meaningsFr: ["Sol", "Lit"],
      readingsOn: ["ショウ"],
      readingsKun: ["とこ", "ゆか"],
      meaningMnemonicFr: "Le toit et le bois. Le SOL, le LIT.",
      readingMnemonicFr: "Yuka - le SOL 'yuka' !",
    },
    {
      character: "括",
      meaningsFr: ["Regrouper", "Résumer"],
      readingsOn: ["カツ"],
      readingsKun: ["くく-る"],
      meaningMnemonicFr: "La main et la langue. REGROUPER, RÉSUMER.",
      readingMnemonicFr: "Katsu - REGROUPER 'katsu' !",
    },
    {
      character: "弧",
      meaningsFr: ["Arc", "Parenthèse"],
      readingsOn: ["コ"],
      readingsKun: [],
      meaningMnemonicFr: "L'arc et le melon. L'ARC, la PARENTHÈSE.",
      readingMnemonicFr: "Ko - l'ARC 'ko' !",
    },
    {
      character: "挑",
      meaningsFr: ["Défier", "Provoquer"],
      readingsOn: ["チョウ"],
      readingsKun: ["いど-む"],
      meaningMnemonicFr: "La main et le signe. DÉFIER, PROVOQUER.",
      readingMnemonicFr: "Idomu - DÉFIER !",
    },
    {
      character: "掘",
      meaningsFr: ["Creuser", "Fouiller"],
      readingsOn: ["クツ"],
      readingsKun: ["ほ-る"],
      meaningMnemonicFr: "La main et le sortir. CREUSER, FOUILLER.",
      readingMnemonicFr: "Horu - CREUSER !",
    },
    {
      character: "揚",
      meaningsFr: ["Lever", "Frire"],
      readingsOn: ["ヨウ"],
      readingsKun: ["あ-げる", "あ-がる"],
      meaningMnemonicFr: "La main et le soleil. LEVER, FRIRE.",
      readingMnemonicFr: "Ageru - LEVER !",
    },
    {
      character: "握",
      meaningsFr: ["Saisir", "Tenir"],
      readingsOn: ["アク"],
      readingsKun: ["にぎ-る"],
      meaningMnemonicFr: "La main et le toit. SAISIR, TENIR fermement.",
      readingMnemonicFr: "Nigiru - SAISIR !",
    },
    {
      character: "揺",
      meaningsFr: ["Secouer", "Balancer"],
      readingsOn: ["ヨウ"],
      readingsKun: ["ゆ-れる", "ゆ-る"],
      meaningMnemonicFr: "La main et l'atteindre. SECOUER, BALANCER.",
      readingMnemonicFr: "Yureru - SECOUER !",
    },
    {
      character: "斎",
      meaningsFr: ["Purification", "Jeûne"],
      readingsOn: ["サイ"],
      readingsKun: [],
      meaningMnemonicFr: "Le texte et le petit. La PURIFICATION, le JEÛNE.",
      readingMnemonicFr: "Sai - la PURIFICATION 'sai' !",
    },
    {
      character: "暫",
      meaningsFr: ["Temporaire", "Un moment"],
      readingsOn: ["ザン"],
      readingsKun: ["しばら-く"],
      meaningMnemonicFr: "Le soleil et le couper. TEMPORAIRE, UN MOMENT.",
      readingMnemonicFr: "Shibaraku - UN MOMENT !",
    },
    {
      character: "析",
      meaningsFr: ["Analyser", "Diviser"],
      readingsOn: ["セキ"],
      readingsKun: [],
      meaningMnemonicFr: "Le bois et la hache. ANALYSER, DIVISER.",
      readingMnemonicFr: "Seki - ANALYSER 'seki' !",
    },
    {
      character: "枢",
      meaningsFr: ["Pivot", "Essentiel"],
      readingsOn: ["スウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le bois et le distinguer. Le PIVOT, ESSENTIEL.",
      readingMnemonicFr: "Suu - le PIVOT 'suu' !",
    },
    {
      character: "軸",
      meaningsFr: ["Axe", "Pivot"],
      readingsOn: ["ジク"],
      readingsKun: [],
      meaningMnemonicFr: "La voiture et le raison. L'AXE, le PIVOT.",
      readingMnemonicFr: "Jiku - l'AXE 'jiku' !",
    },
    {
      character: "柄",
      meaningsFr: ["Manche", "Motif"],
      readingsOn: ["ヘイ"],
      readingsKun: ["がら", "え"],
      meaningMnemonicFr: "Le bois et l'intérieur. Le MANCHE, le MOTIF.",
      readingMnemonicFr: "Gara - le MOTIF 'gara' !",
    },
    {
      character: "泊",
      meaningsFr: ["Séjourner", "Mouiller"],
      readingsOn: ["ハク"],
      readingsKun: ["と-まる"],
      meaningMnemonicFr: "L'eau et le blanc. SÉJOURNER la nuit.",
      readingMnemonicFr: "Tomaru - SÉJOURNER !",
    },
    {
      character: "滑",
      meaningsFr: ["Glisser", "Lisse"],
      readingsOn: ["カツ"],
      readingsKun: ["すべ-る", "なめ-らか"],
      meaningMnemonicFr: "L'eau et l'os. GLISSER, LISSE.",
      readingMnemonicFr: "Suberu - GLISSER !",
    },
    {
      character: "焦",
      meaningsFr: ["Brûler", "Impatient"],
      readingsOn: ["ショウ"],
      readingsKun: ["こ-げる", "あせ-る"],
      meaningMnemonicFr: "L'oiseau et le feu. BRÛLER, être IMPATIENT.",
      readingMnemonicFr: "Kogeru - BRÛLER !",
    },
    {
      character: "範",
      meaningsFr: ["Modèle", "Exemple"],
      readingsOn: ["ハン"],
      readingsKun: [],
      meaningMnemonicFr: "Le bambou et le voiture. Le MODÈLE, l'EXEMPLE.",
      readingMnemonicFr: "Han - le MODÈLE 'han' !",
    },
    {
      character: "紛",
      meaningsFr: ["Confusion", "Dispute"],
      readingsOn: ["フン"],
      readingsKun: ["まぎ-れる"],
      meaningMnemonicFr: "Le fil et le diviser. La CONFUSION, la DISPUTE.",
      readingMnemonicFr: "Fun - la CONFUSION 'fun' !",
    },
    {
      character: "綱",
      meaningsFr: ["Corde", "Principe"],
      readingsOn: ["コウ"],
      readingsKun: ["つな"],
      meaningMnemonicFr: "Le fil et le montagne. La CORDE, le PRINCIPE.",
      readingMnemonicFr: "Tsuna - la CORDE 'tsuna' !",
    },
    {
      character: "網",
      meaningsFr: ["Filet", "Réseau"],
      readingsOn: ["モウ"],
      readingsKun: ["あみ"],
      meaningMnemonicFr: "Le fil et le couvrir. Le FILET, le RÉSEAU.",
      readingMnemonicFr: "Ami - le FILET 'ami' !",
    },
    {
      character: "肝",
      meaningsFr: ["Foie", "Essentiel"],
      readingsOn: ["カン"],
      readingsKun: ["きも"],
      meaningMnemonicFr: "La chair et le sec. Le FOIE, l'ESSENTIEL.",
      readingMnemonicFr: "Kimo - le FOIE 'kimo' !",
    },
    {
      character: "芝",
      meaningsFr: ["Pelouse", "Gazon"],
      readingsOn: ["シ"],
      readingsKun: ["しば"],
      meaningMnemonicFr: "L'herbe et la raison. La PELOUSE, le GAZON.",
      readingMnemonicFr: "Shiba - la PELOUSE 'shiba' !",
    },
    {
      character: "荒",
      meaningsFr: ["Sauvage", "Rude"],
      readingsOn: ["コウ"],
      readingsKun: ["あら-い", "あ-れる"],
      meaningMnemonicFr: "L'herbe et le fleuve. SAUVAGE, RUDE.",
      readingMnemonicFr: "Arai - SAUVAGE !",
    },
    {
      character: "袋",
      meaningsFr: ["Sac", "Poche"],
      readingsOn: ["タイ"],
      readingsKun: ["ふくろ"],
      meaningMnemonicFr: "Le vêtement et le représenter. Le SAC, la POCHE.",
      readingMnemonicFr: "Fukuro - le SAC 'fukuro' !",
    },
    {
      character: "餅",
      meaningsFr: ["Mochi", "Gâteau de riz"],
      readingsOn: ["ヘイ"],
      readingsKun: ["もち"],
      meaningMnemonicFr: "La nourriture et le ensemble. Le MOCHI, le GÂTEAU DE RIZ.",
      readingMnemonicFr: "Mochi - le MOCHI 'mochi' !",
    },
  ];

  for (const kanji of level42Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 42 },
      create: { ...kanji, levelId: 42 },
    });
  }

  const level42Vocab = [
    { word: "克服", meaningsFr: ["Surmonter"], readings: ["こくふく"], mnemonicFr: "SURMONTER les difficultés.", levelId: 42 },
    { word: "到着", meaningsFr: ["Arrivée"], readings: ["とうちゃく"], mnemonicFr: "L'ARRIVÉE à destination.", levelId: 42 },
    { word: "双子", meaningsFr: ["Jumeaux"], readings: ["ふたご"], mnemonicFr: "Des JUMEAUX identiques.", levelId: 42 },
    { word: "哲学", meaningsFr: ["Philosophie"], readings: ["てつがく"], mnemonicFr: "La PHILOSOPHIE grecque.", levelId: 42 },
    { word: "喪失", meaningsFr: ["Perte"], readings: ["そうしつ"], mnemonicFr: "La PERTE d'un être cher.", levelId: 42 },
    { word: "堅い", meaningsFr: ["Dur"], readings: ["かたい"], mnemonicFr: "Un matériau DUR.", levelId: 42 },
    { word: "床", meaningsFr: ["Sol"], readings: ["ゆか"], mnemonicFr: "Le SOL de la maison.", levelId: 42 },
    { word: "括弧", meaningsFr: ["Parenthèses"], readings: ["かっこ"], mnemonicFr: "Des PARENTHÈSES.", levelId: 42 },
    { word: "挑戦", meaningsFr: ["Défi"], readings: ["ちょうせん"], mnemonicFr: "Un DÉFI difficile.", levelId: 42 },
    { word: "掘る", meaningsFr: ["Creuser"], readings: ["ほる"], mnemonicFr: "CREUSER un trou.", levelId: 42 },
    { word: "握る", meaningsFr: ["Saisir"], readings: ["にぎる"], mnemonicFr: "SAISIR fermement.", levelId: 42 },
    { word: "揺れる", meaningsFr: ["Trembler"], readings: ["ゆれる"], mnemonicFr: "TREMBLER de peur.", levelId: 42 },
    { word: "暫く", meaningsFr: ["Un moment"], readings: ["しばらく"], mnemonicFr: "Attendre UN MOMENT.", levelId: 42 },
    { word: "分析", meaningsFr: ["Analyse"], readings: ["ぶんせき"], mnemonicFr: "L'ANALYSE des données.", levelId: 42 },
    { word: "中枢", meaningsFr: ["Centre"], readings: ["ちゅうすう"], mnemonicFr: "Le CENTRE névralgique.", levelId: 42 },
    { word: "泊まる", meaningsFr: ["Séjourner"], readings: ["とまる"], mnemonicFr: "SÉJOURNER à l'hôtel.", levelId: 42 },
    { word: "滑る", meaningsFr: ["Glisser"], readings: ["すべる"], mnemonicFr: "GLISSER sur la glace.", levelId: 42 },
    { word: "焦る", meaningsFr: ["S'impatienter"], readings: ["あせる"], mnemonicFr: "S'IMPATIENTER.", levelId: 42 },
    { word: "模範", meaningsFr: ["Modèle"], readings: ["もはん"], mnemonicFr: "Un MODÈLE à suivre.", levelId: 42 },
    { word: "紛争", meaningsFr: ["Conflit"], readings: ["ふんそう"], mnemonicFr: "Un CONFLIT armé.", levelId: 42 },
    { word: "綱", meaningsFr: ["Corde"], readings: ["つな"], mnemonicFr: "Une CORDE solide.", levelId: 42 },
    { word: "網", meaningsFr: ["Filet"], readings: ["あみ"], mnemonicFr: "Un FILET de pêche.", levelId: 42 },
    { word: "肝心", meaningsFr: ["Essentiel"], readings: ["かんじん"], mnemonicFr: "L'ESSENTIEL.", levelId: 42 },
    { word: "芝生", meaningsFr: ["Pelouse"], readings: ["しばふ"], mnemonicFr: "La PELOUSE verte.", levelId: 42 },
    { word: "荒い", meaningsFr: ["Rude"], readings: ["あらい"], mnemonicFr: "Un comportement RUDE.", levelId: 42 },
    { word: "袋", meaningsFr: ["Sac"], readings: ["ふくろ"], mnemonicFr: "Un SAC plastique.", levelId: 42 },
    { word: "餅", meaningsFr: ["Mochi"], readings: ["もち"], mnemonicFr: "Du MOCHI japonais.", levelId: 42 },
  ];

  for (const vocab of level42Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 42 complete!");

  // ============================================
  // LEVEL 43 - WaniKani Level 43
  // Kanji: 誰珍裂襲貢趣距籍露牧刷朗潮即垣威封筒慰懇懲摩擦撲斉旨柔沈沼泰滅滋炉琴
  // ============================================

  const level43Radicals = [
    { character: "琴", meaningFr: "Harpe", mnemonic: "La HARPE avec ses deux cordes de roi !" },
  ];

  for (const radical of level43Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 43 } },
      update: { ...radical },
      create: { ...radical, levelId: 43 },
    });
  }

  const level43Kanji = [
    { character: "誰", meaningsFr: ["Qui"], readingsOn: ["スイ"], readingsKun: ["だれ"], meaningMnemonicFr: "La parole et le viser. QUI est-ce ?", readingMnemonicFr: "Dare - QUI 'dare' !" },
    { character: "珍", meaningsFr: ["Rare", "Curieux"], readingsOn: ["チン"], readingsKun: ["めずら-しい"], meaningMnemonicFr: "Le roi et le comparer. RARE, CURIEUX.", readingMnemonicFr: "Chin - RARE 'chin' !" },
    { character: "裂", meaningsFr: ["Déchirer"], readingsOn: ["レツ"], readingsKun: ["さ-く"], meaningMnemonicFr: "Le vêtement et le file. DÉCHIRER.", readingMnemonicFr: "Retsu - DÉCHIRER 'retsu' !" },
    { character: "襲", meaningsFr: ["Attaquer"], readingsOn: ["シュウ"], readingsKun: ["おそ-う"], meaningMnemonicFr: "Le dragon et le vêtement. ATTAQUER.", readingMnemonicFr: "Shuu - ATTAQUER 'shuu' !" },
    { character: "貢", meaningsFr: ["Tribut", "Contribuer"], readingsOn: ["コウ"], readingsKun: ["みつ-ぐ"], meaningMnemonicFr: "Le travail et le coquillage. Le TRIBUT, CONTRIBUER.", readingMnemonicFr: "Kou - CONTRIBUER 'kou' !" },
    { character: "趣", meaningsFr: ["But", "Goût"], readingsOn: ["シュ"], readingsKun: ["おもむき"], meaningMnemonicFr: "Courir et le prendre. Le BUT, le GOÛT.", readingMnemonicFr: "Shu - le GOÛT 'shu' !" },
    { character: "距", meaningsFr: ["Distance"], readingsOn: ["キョ"], readingsKun: [], meaningMnemonicFr: "Le pied et le géant. La DISTANCE.", readingMnemonicFr: "Kyo - la DISTANCE 'kyo' !" },
    { character: "籍", meaningsFr: ["Registre"], readingsOn: ["セキ"], readingsKun: [], meaningMnemonicFr: "Le bambou et la responsabilité. Le REGISTRE.", readingMnemonicFr: "Seki - le REGISTRE 'seki' !" },
    { character: "露", meaningsFr: ["Rosée", "Exposer"], readingsOn: ["ロ"], readingsKun: ["つゆ"], meaningMnemonicFr: "La pluie et le chemin. La ROSÉE, EXPOSER.", readingMnemonicFr: "Ro - la ROSÉE 'ro' !" },
    { character: "牧", meaningsFr: ["Pâturage"], readingsOn: ["ボク"], readingsKun: ["まき"], meaningMnemonicFr: "La vache et le frapper. Le PÂTURAGE.", readingMnemonicFr: "Boku - le PÂTURAGE 'boku' !" },
    { character: "刷", meaningsFr: ["Imprimer"], readingsOn: ["サツ"], readingsKun: ["す-る"], meaningMnemonicFr: "Le drapeau et le sabre. IMPRIMER.", readingMnemonicFr: "Satsu - IMPRIMER 'satsu' !" },
    { character: "朗", meaningsFr: ["Clair", "Joyeux"], readingsOn: ["ロウ"], readingsKun: ["ほが-らか"], meaningMnemonicFr: "Le bon et la lune. CLAIR, JOYEUX.", readingMnemonicFr: "Rou - JOYEUX 'rou' !" },
    { character: "潮", meaningsFr: ["Marée"], readingsOn: ["チョウ"], readingsKun: ["しお"], meaningMnemonicFr: "L'eau et le matin. La MARÉE.", readingMnemonicFr: "Chou - la MARÉE 'chou' !" },
    { character: "即", meaningsFr: ["Immédiat"], readingsOn: ["ソク"], readingsKun: ["すなわ-ち"], meaningMnemonicFr: "Le bon et le sceau. IMMÉDIAT.", readingMnemonicFr: "Soku - IMMÉDIAT 'soku' !" },
    { character: "垣", meaningsFr: ["Clôture"], readingsOn: ["エン"], readingsKun: ["かき"], meaningMnemonicFr: "La terre et le un. La CLÔTURE.", readingMnemonicFr: "Kaki - la CLÔTURE 'kaki' !" },
    { character: "威", meaningsFr: ["Autorité"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "La femme et le lance. L'AUTORITÉ.", readingMnemonicFr: "I - l'AUTORITÉ 'i' !" },
    { character: "封", meaningsFr: ["Sceller"], readingsOn: ["フウ"], readingsKun: [], meaningMnemonicFr: "La terre et le pouce. SCELLER.", readingMnemonicFr: "Fuu - SCELLER 'fuu' !" },
    { character: "筒", meaningsFr: ["Tube", "Cylindre"], readingsOn: ["トウ"], readingsKun: ["つつ"], meaningMnemonicFr: "Le bambou et le même. Le TUBE, le CYLINDRE.", readingMnemonicFr: "Tou - le TUBE 'tou' !" },
    { character: "慰", meaningsFr: ["Consoler"], readingsOn: ["イ"], readingsKun: ["なぐさ-める"], meaningMnemonicFr: "Le coeur et le militaire. CONSOLER.", readingMnemonicFr: "I - CONSOLER 'i' !" },
    { character: "懇", meaningsFr: ["Sincère"], readingsOn: ["コン"], readingsKun: ["ねんご-ろ"], meaningMnemonicFr: "Le bon et le coeur. SINCÈRE.", readingMnemonicFr: "Kon - SINCÈRE 'kon' !" },
    { character: "懲", meaningsFr: ["Punir"], readingsOn: ["チョウ"], readingsKun: ["こ-りる"], meaningMnemonicFr: "Le coeur et le prouver. PUNIR.", readingMnemonicFr: "Chou - PUNIR 'chou' !" },
    { character: "摩", meaningsFr: ["Frotter"], readingsOn: ["マ"], readingsKun: [], meaningMnemonicFr: "Le chanvre et la main. FROTTER.", readingMnemonicFr: "Ma - FROTTER 'ma' !" },
    { character: "擦", meaningsFr: ["Frictionner"], readingsOn: ["サツ"], readingsKun: ["す-る"], meaningMnemonicFr: "La main et le surveiller. FRICTIONNER.", readingMnemonicFr: "Satsu - FRICTIONNER 'satsu' !" },
    { character: "撲", meaningsFr: ["Frapper"], readingsOn: ["ボク"], readingsKun: [], meaningMnemonicFr: "La main et le serviteur. FRAPPER.", readingMnemonicFr: "Boku - FRAPPER 'boku' !" },
    { character: "斉", meaningsFr: ["Égal", "Uniforme"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "Le texte et le couteau. ÉGAL, UNIFORME.", readingMnemonicFr: "Sei - ÉGAL 'sei' !" },
    { character: "旨", meaningsFr: ["But", "Savoureux"], readingsOn: ["シ"], readingsKun: ["むね"], meaningMnemonicFr: "La cuillère et le soleil. Le BUT, SAVOUREUX.", readingMnemonicFr: "Shi - le BUT 'shi' !" },
    { character: "柔", meaningsFr: ["Souple", "Doux"], readingsOn: ["ジュウ"], readingsKun: ["やわ-らかい"], meaningMnemonicFr: "La lance et l'arbre. SOUPLE, DOUX.", readingMnemonicFr: "Juu - SOUPLE 'juu' !" },
    { character: "沈", meaningsFr: ["Couler", "Sombrer"], readingsOn: ["チン"], readingsKun: ["しず-む"], meaningMnemonicFr: "L'eau et le froid. COULER, SOMBRER.", readingMnemonicFr: "Chin - COULER 'chin' !" },
    { character: "沼", meaningsFr: ["Marais"], readingsOn: ["ショウ"], readingsKun: ["ぬま"], meaningMnemonicFr: "L'eau et le appeler. Le MARAIS.", readingMnemonicFr: "Numa - le MARAIS 'numa' !" },
    { character: "泰", meaningsFr: ["Paisible"], readingsOn: ["タイ"], readingsKun: [], meaningMnemonicFr: "Le trois et l'eau. PAISIBLE.", readingMnemonicFr: "Tai - PAISIBLE 'tai' !" },
    { character: "滅", meaningsFr: ["Détruire"], readingsOn: ["メツ"], readingsKun: ["ほろ-びる"], meaningMnemonicFr: "L'eau et le lance. DÉTRUIRE.", readingMnemonicFr: "Metsu - DÉTRUIRE 'metsu' !" },
    { character: "滋", meaningsFr: ["Nourrir"], readingsOn: ["ジ"], readingsKun: [], meaningMnemonicFr: "L'eau et le fil. NOURRIR.", readingMnemonicFr: "Ji - NOURRIR 'ji' !" },
    { character: "炉", meaningsFr: ["Fourneau"], readingsOn: ["ロ"], readingsKun: [], meaningMnemonicFr: "Le feu et le porte. Le FOURNEAU.", readingMnemonicFr: "Ro - le FOURNEAU 'ro' !" },
    { character: "琴", meaningsFr: ["Harpe"], readingsOn: ["キン"], readingsKun: ["こと"], meaningMnemonicFr: "Deux rois et le aujourd'hui. La HARPE.", readingMnemonicFr: "Koto - la HARPE 'koto' !" },
  ];

  for (const kanji of level43Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 43 },
      create: { ...kanji, levelId: 43 },
    });
  }

  const level43Vocab = [
    { word: "誰", meaningsFr: ["Qui"], readings: ["だれ"], mnemonicFr: "QUI est là ?", levelId: 43 },
    { word: "珍しい", meaningsFr: ["Rare"], readings: ["めずらしい"], mnemonicFr: "C'est RARE.", levelId: 43 },
    { word: "裂く", meaningsFr: ["Déchirer"], readings: ["さく"], mnemonicFr: "DÉCHIRER le papier.", levelId: 43 },
    { word: "襲う", meaningsFr: ["Attaquer"], readings: ["おそう"], mnemonicFr: "ATTAQUER l'ennemi.", levelId: 43 },
    { word: "貢献", meaningsFr: ["Contribution"], readings: ["こうけん"], mnemonicFr: "Une CONTRIBUTION importante.", levelId: 43 },
    { word: "趣味", meaningsFr: ["Hobby"], readings: ["しゅみ"], mnemonicFr: "Un HOBBY intéressant.", levelId: 43 },
    { word: "距離", meaningsFr: ["Distance"], readings: ["きょり"], mnemonicFr: "La DISTANCE est longue.", levelId: 43 },
    { word: "国籍", meaningsFr: ["Nationalité"], readings: ["こくせき"], mnemonicFr: "La NATIONALITÉ française.", levelId: 43 },
    { word: "露", meaningsFr: ["Rosée"], readings: ["つゆ"], mnemonicFr: "La ROSÉE du matin.", levelId: 43 },
    { word: "牧場", meaningsFr: ["Pâturage"], readings: ["ぼくじょう"], mnemonicFr: "Le PÂTURAGE des vaches.", levelId: 43 },
    { word: "印刷", meaningsFr: ["Impression"], readings: ["いんさつ"], mnemonicFr: "L'IMPRESSION du document.", levelId: 43 },
    { word: "明朗", meaningsFr: ["Joyeux"], readings: ["めいろう"], mnemonicFr: "Un caractère JOYEUX.", levelId: 43 },
    { word: "潮", meaningsFr: ["Marée"], readings: ["しお"], mnemonicFr: "La MARÉE monte.", levelId: 43 },
    { word: "即座", meaningsFr: ["Immédiatement"], readings: ["そくざ"], mnemonicFr: "IMMÉDIATEMENT.", levelId: 43 },
    { word: "垣根", meaningsFr: ["Clôture"], readings: ["かきね"], mnemonicFr: "La CLÔTURE du jardin.", levelId: 43 },
    { word: "威力", meaningsFr: ["Puissance"], readings: ["いりょく"], mnemonicFr: "Une grande PUISSANCE.", levelId: 43 },
    { word: "封筒", meaningsFr: ["Enveloppe"], readings: ["ふうとう"], mnemonicFr: "Une ENVELOPPE scellée.", levelId: 43 },
    { word: "慰める", meaningsFr: ["Consoler"], readings: ["なぐさめる"], mnemonicFr: "CONSOLER un ami.", levelId: 43 },
    { word: "懇親", meaningsFr: ["Amitié"], readings: ["こんしん"], mnemonicFr: "Une soirée d'AMITIÉ.", levelId: 43 },
    { word: "懲りる", meaningsFr: ["Apprendre sa leçon"], readings: ["こりる"], mnemonicFr: "APPRENDRE SA LEÇON.", levelId: 43 },
    { word: "摩擦", meaningsFr: ["Friction"], readings: ["まさつ"], mnemonicFr: "La FRICTION entre deux surfaces.", levelId: 43 },
    { word: "相撲", meaningsFr: ["Sumo"], readings: ["すもう"], mnemonicFr: "Le SUMO japonais.", levelId: 43 },
    { word: "一斉", meaningsFr: ["Tous ensemble"], readings: ["いっせい"], mnemonicFr: "TOUS ENSEMBLE.", levelId: 43 },
    { word: "趣旨", meaningsFr: ["But"], readings: ["しゅし"], mnemonicFr: "Le BUT de la réunion.", levelId: 43 },
    { word: "柔らかい", meaningsFr: ["Souple"], readings: ["やわらかい"], mnemonicFr: "Un tissu SOUPLE.", levelId: 43 },
    { word: "沈む", meaningsFr: ["Couler"], readings: ["しずむ"], mnemonicFr: "Le bateau COULE.", levelId: 43 },
    { word: "沼", meaningsFr: ["Marais"], readings: ["ぬま"], mnemonicFr: "Un MARAIS sombre.", levelId: 43 },
    { word: "滅びる", meaningsFr: ["Périr"], readings: ["ほろびる"], mnemonicFr: "L'empire PÉRIT.", levelId: 43 },
    { word: "滋養", meaningsFr: ["Nourrissant"], readings: ["じよう"], mnemonicFr: "Un aliment NOURRISSANT.", levelId: 43 },
    { word: "炉", meaningsFr: ["Fourneau"], readings: ["ろ"], mnemonicFr: "Le FOURNEAU chaud.", levelId: 43 },
    { word: "琴", meaningsFr: ["Harpe"], readings: ["こと"], mnemonicFr: "Jouer de la HARPE.", levelId: 43 },
  ];

  for (const vocab of level43Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 43 complete!");

  // ============================================
  // LEVEL 44 - WaniKani Level 44
  // Kanji: 寸竜縁翼吉刃忍桃辛謎侍俺叱娯斗朱丘梨匹叫釣髪嵐笠涙缶姫棚粒砲雷芽塔挨拶
  // ============================================

  const level44Radicals = [
    { character: "竜", meaningFr: "Dragon", mnemonic: "Le DRAGON mythique !" },
    { character: "刃", meaningFr: "Lame", mnemonic: "La LAME du sabre !" },
  ];

  for (const radical of level44Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 44 } },
      update: { ...radical },
      create: { ...radical, levelId: 44 },
    });
  }

  const level44Kanji = [
    { character: "寸", meaningsFr: ["Pouce"], readingsOn: ["スン"], readingsKun: [], meaningMnemonicFr: "Une petite mesure. Le POUCE.", readingMnemonicFr: "Sun - le POUCE 'sun' !" },
    { character: "竜", meaningsFr: ["Dragon"], readingsOn: ["リュウ"], readingsKun: ["たつ"], meaningMnemonicFr: "La créature mythique. Le DRAGON.", readingMnemonicFr: "Ryuu - le DRAGON 'ryuu' !" },
    { character: "縁", meaningsFr: ["Bord", "Lien"], readingsOn: ["エン"], readingsKun: ["ふち"], meaningMnemonicFr: "Le fil et le cochon. Le BORD, le LIEN.", readingMnemonicFr: "En - le LIEN 'en' !" },
    { character: "翼", meaningsFr: ["Aile"], readingsOn: ["ヨク"], readingsKun: ["つばさ"], meaningMnemonicFr: "Le plume et le différent. L'AILE.", readingMnemonicFr: "Tsubasa - l'AILE 'tsubasa' !" },
    { character: "吉", meaningsFr: ["Chance", "Bon"], readingsOn: ["キチ"], readingsKun: [], meaningMnemonicFr: "Le samouraï et la bouche. La CHANCE, BON.", readingMnemonicFr: "Kichi - la CHANCE 'kichi' !" },
    { character: "刃", meaningsFr: ["Lame"], readingsOn: ["ジン"], readingsKun: ["は"], meaningMnemonicFr: "Le sabre avec un point. La LAME.", readingMnemonicFr: "Jin - la LAME 'jin' !" },
    { character: "忍", meaningsFr: ["Endurer", "Ninja"], readingsOn: ["ニン"], readingsKun: ["しの-ぶ"], meaningMnemonicFr: "La lame sur le coeur. ENDURER, NINJA.", readingMnemonicFr: "Nin - NINJA 'nin' !" },
    { character: "桃", meaningsFr: ["Pêche"], readingsOn: ["トウ"], readingsKun: ["もも"], meaningMnemonicFr: "L'arbre et le signe. La PÊCHE.", readingMnemonicFr: "Momo - la PÊCHE 'momo' !" },
    { character: "辛", meaningsFr: ["Épicé", "Pénible"], readingsOn: ["シン"], readingsKun: ["から-い"], meaningMnemonicFr: "Le stand avec un chapeau. ÉPICÉ, PÉNIBLE.", readingMnemonicFr: "Karai - ÉPICÉ 'karai' !" },
    { character: "謎", meaningsFr: ["Énigme"], readingsOn: ["メイ"], readingsKun: ["なぞ"], meaningMnemonicFr: "La parole et le perdu. L'ÉNIGME.", readingMnemonicFr: "Nazo - l'ÉNIGME 'nazo' !" },
    { character: "侍", meaningsFr: ["Samouraï"], readingsOn: ["ジ"], readingsKun: ["さむらい"], meaningMnemonicFr: "La personne et le temple. Le SAMOURAÏ.", readingMnemonicFr: "Samurai - le SAMOURAÏ !" },
    { character: "俺", meaningsFr: ["Je (masculin)"], readingsOn: [], readingsKun: ["おれ"], meaningMnemonicFr: "La personne et le grand. JE (masculin).", readingMnemonicFr: "Ore - JE 'ore' !" },
    { character: "叱", meaningsFr: ["Gronder"], readingsOn: ["シツ"], readingsKun: ["しか-る"], meaningMnemonicFr: "La bouche et le sept. GRONDER.", readingMnemonicFr: "Shikaru - GRONDER !" },
    { character: "娯", meaningsFr: ["Divertissement"], readingsOn: ["ゴ"], readingsKun: [], meaningMnemonicFr: "La femme et le je. Le DIVERTISSEMENT.", readingMnemonicFr: "Go - DIVERTISSEMENT 'go' !" },
    { character: "斗", meaningsFr: ["Louche"], readingsOn: ["ト"], readingsKun: [], meaningMnemonicFr: "Le récipient. La LOUCHE.", readingMnemonicFr: "To - la LOUCHE 'to' !" },
    { character: "朱", meaningsFr: ["Vermillon"], readingsOn: ["シュ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le moins. Le VERMILLON.", readingMnemonicFr: "Shu - VERMILLON 'shu' !" },
    { character: "丘", meaningsFr: ["Colline"], readingsOn: ["キュウ"], readingsKun: ["おか"], meaningMnemonicFr: "Le monticule. La COLLINE.", readingMnemonicFr: "Oka - la COLLINE 'oka' !" },
    { character: "梨", meaningsFr: ["Poire"], readingsOn: ["リ"], readingsKun: ["なし"], meaningMnemonicFr: "L'arbre et le profit. La POIRE.", readingMnemonicFr: "Nashi - la POIRE 'nashi' !" },
    { character: "匹", meaningsFr: ["Compteur animaux"], readingsOn: ["ヒキ"], readingsKun: [], meaningMnemonicFr: "La boîte et le enfant. COMPTEUR pour ANIMAUX.", readingMnemonicFr: "Hiki - COMPTEUR 'hiki' !" },
    { character: "叫", meaningsFr: ["Crier"], readingsOn: ["キョウ"], readingsKun: ["さけ-ぶ"], meaningMnemonicFr: "La bouche et le piège. CRIER.", readingMnemonicFr: "Sakebu - CRIER !" },
    { character: "釣", meaningsFr: ["Pêcher"], readingsOn: ["チョウ"], readingsKun: ["つ-る"], meaningMnemonicFr: "Le métal et le cuillère. PÊCHER.", readingMnemonicFr: "Tsuru - PÊCHER 'tsuru' !" },
    { character: "髪", meaningsFr: ["Cheveux"], readingsOn: ["ハツ"], readingsKun: ["かみ"], meaningMnemonicFr: "Le long et l'ami. Les CHEVEUX.", readingMnemonicFr: "Kami - les CHEVEUX 'kami' !" },
    { character: "嵐", meaningsFr: ["Tempête"], readingsOn: ["ラン"], readingsKun: ["あらし"], meaningMnemonicFr: "La montagne et le vent. La TEMPÊTE.", readingMnemonicFr: "Arashi - la TEMPÊTE 'arashi' !" },
    { character: "笠", meaningsFr: ["Chapeau de paille"], readingsOn: ["リュウ"], readingsKun: ["かさ"], meaningMnemonicFr: "Le bambou et le debout. Le CHAPEAU DE PAILLE.", readingMnemonicFr: "Kasa - le CHAPEAU 'kasa' !" },
    { character: "涙", meaningsFr: ["Larme"], readingsOn: ["ルイ"], readingsKun: ["なみだ"], meaningMnemonicFr: "L'eau et le grand. La LARME.", readingMnemonicFr: "Namida - la LARME 'namida' !" },
    { character: "缶", meaningsFr: ["Canette"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le récipient en métal. La CANETTE.", readingMnemonicFr: "Kan - la CANETTE 'kan' !" },
    { character: "姫", meaningsFr: ["Princesse"], readingsOn: ["キ"], readingsKun: ["ひめ"], meaningMnemonicFr: "La femme et l'odeur. La PRINCESSE.", readingMnemonicFr: "Hime - la PRINCESSE 'hime' !" },
    { character: "棚", meaningsFr: ["Étagère"], readingsOn: ["ホウ"], readingsKun: ["たな"], meaningMnemonicFr: "L'arbre et le mois. L'ÉTAGÈRE.", readingMnemonicFr: "Tana - l'ÉTAGÈRE 'tana' !" },
    { character: "粒", meaningsFr: ["Grain"], readingsOn: ["リュウ"], readingsKun: ["つぶ"], meaningMnemonicFr: "Le riz et le debout. Le GRAIN.", readingMnemonicFr: "Tsubu - le GRAIN 'tsubu' !" },
    { character: "砲", meaningsFr: ["Canon"], readingsOn: ["ホウ"], readingsKun: [], meaningMnemonicFr: "La pierre et le envelopper. Le CANON.", readingMnemonicFr: "Hou - le CANON 'hou' !" },
    { character: "雷", meaningsFr: ["Tonnerre"], readingsOn: ["ライ"], readingsKun: ["かみなり"], meaningMnemonicFr: "La pluie et le rizière. Le TONNERRE.", readingMnemonicFr: "Kaminari - le TONNERRE !" },
    { character: "芽", meaningsFr: ["Bourgeon"], readingsOn: ["ガ"], readingsKun: ["め"], meaningMnemonicFr: "L'herbe et le dent. Le BOURGEON.", readingMnemonicFr: "Me - le BOURGEON 'me' !" },
    { character: "塔", meaningsFr: ["Tour"], readingsOn: ["トウ"], readingsKun: [], meaningMnemonicFr: "La terre et le fleur. La TOUR.", readingMnemonicFr: "Tou - la TOUR 'tou' !" },
    { character: "挨", meaningsFr: ["Pousser"], readingsOn: ["アイ"], readingsKun: [], meaningMnemonicFr: "La main et le矢. POUSSER.", readingMnemonicFr: "Ai - POUSSER 'ai' !" },
    { character: "拶", meaningsFr: ["Approcher"], readingsOn: ["サツ"], readingsKun: [], meaningMnemonicFr: "La main et le percer. APPROCHER.", readingMnemonicFr: "Satsu - APPROCHER 'satsu' !" },
  ];

  for (const kanji of level44Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 44 },
      create: { ...kanji, levelId: 44 },
    });
  }

  const level44Vocab = [
    { word: "寸法", meaningsFr: ["Dimensions"], readings: ["すんぽう"], mnemonicFr: "Les DIMENSIONS exactes.", levelId: 44 },
    { word: "竜", meaningsFr: ["Dragon"], readings: ["りゅう"], mnemonicFr: "Le DRAGON légendaire.", levelId: 44 },
    { word: "縁", meaningsFr: ["Bord"], readings: ["ふち"], mnemonicFr: "Le BORD de la table.", levelId: 44 },
    { word: "翼", meaningsFr: ["Aile"], readings: ["つばさ"], mnemonicFr: "Les AILES de l'oiseau.", levelId: 44 },
    { word: "吉日", meaningsFr: ["Jour de chance"], readings: ["きちじつ"], mnemonicFr: "Un JOUR DE CHANCE.", levelId: 44 },
    { word: "刃", meaningsFr: ["Lame"], readings: ["は"], mnemonicFr: "La LAME tranchante.", levelId: 44 },
    { word: "忍者", meaningsFr: ["Ninja"], readings: ["にんじゃ"], mnemonicFr: "Le NINJA silencieux.", levelId: 44 },
    { word: "桃", meaningsFr: ["Pêche"], readings: ["もも"], mnemonicFr: "Une PÊCHE juteuse.", levelId: 44 },
    { word: "辛い", meaningsFr: ["Épicé"], readings: ["からい"], mnemonicFr: "Un plat ÉPICÉ.", levelId: 44 },
    { word: "謎", meaningsFr: ["Énigme"], readings: ["なぞ"], mnemonicFr: "Une ÉNIGME difficile.", levelId: 44 },
    { word: "侍", meaningsFr: ["Samouraï"], readings: ["さむらい"], mnemonicFr: "Le SAMOURAÏ honorable.", levelId: 44 },
    { word: "俺", meaningsFr: ["Je"], readings: ["おれ"], mnemonicFr: "JE (masculin familier).", levelId: 44 },
    { word: "叱る", meaningsFr: ["Gronder"], readings: ["しかる"], mnemonicFr: "GRONDER un enfant.", levelId: 44 },
    { word: "娯楽", meaningsFr: ["Divertissement"], readings: ["ごらく"], mnemonicFr: "Le DIVERTISSEMENT.", levelId: 44 },
    { word: "北斗", meaningsFr: ["Grande Ourse"], readings: ["ほくと"], mnemonicFr: "La GRANDE OURSE.", levelId: 44 },
    { word: "朱色", meaningsFr: ["Vermillon"], readings: ["しゅいろ"], mnemonicFr: "La couleur VERMILLON.", levelId: 44 },
    { word: "丘", meaningsFr: ["Colline"], readings: ["おか"], mnemonicFr: "La COLLINE verte.", levelId: 44 },
    { word: "梨", meaningsFr: ["Poire"], readings: ["なし"], mnemonicFr: "Une POIRE mûre.", levelId: 44 },
    { word: "一匹", meaningsFr: ["Un animal"], readings: ["いっぴき"], mnemonicFr: "UN ANIMAL.", levelId: 44 },
    { word: "叫ぶ", meaningsFr: ["Crier"], readings: ["さけぶ"], mnemonicFr: "CRIER fort.", levelId: 44 },
    { word: "釣り", meaningsFr: ["Pêche"], readings: ["つり"], mnemonicFr: "La PÊCHE à la ligne.", levelId: 44 },
    { word: "髪", meaningsFr: ["Cheveux"], readings: ["かみ"], mnemonicFr: "Les CHEVEUX longs.", levelId: 44 },
    { word: "嵐", meaningsFr: ["Tempête"], readings: ["あらし"], mnemonicFr: "Une TEMPÊTE violente.", levelId: 44 },
    { word: "涙", meaningsFr: ["Larme"], readings: ["なみだ"], mnemonicFr: "Une LARME de joie.", levelId: 44 },
    { word: "缶", meaningsFr: ["Canette"], readings: ["かん"], mnemonicFr: "Une CANETTE de soda.", levelId: 44 },
    { word: "姫", meaningsFr: ["Princesse"], readings: ["ひめ"], mnemonicFr: "La PRINCESSE du château.", levelId: 44 },
    { word: "棚", meaningsFr: ["Étagère"], readings: ["たな"], mnemonicFr: "L'ÉTAGÈRE en bois.", levelId: 44 },
    { word: "粒", meaningsFr: ["Grain"], readings: ["つぶ"], mnemonicFr: "Un GRAIN de riz.", levelId: 44 },
    { word: "大砲", meaningsFr: ["Canon"], readings: ["たいほう"], mnemonicFr: "Un grand CANON.", levelId: 44 },
    { word: "雷", meaningsFr: ["Tonnerre"], readings: ["かみなり"], mnemonicFr: "Le TONNERRE gronde.", levelId: 44 },
    { word: "芽", meaningsFr: ["Bourgeon"], readings: ["め"], mnemonicFr: "Le BOURGEON pousse.", levelId: 44 },
    { word: "塔", meaningsFr: ["Tour"], readings: ["とう"], mnemonicFr: "Une haute TOUR.", levelId: 44 },
    { word: "挨拶", meaningsFr: ["Salutation"], readings: ["あいさつ"], mnemonicFr: "Une SALUTATION polie.", levelId: 44 },
  ];

  for (const vocab of level44Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 44 complete!");

  // ============================================
  // LEVEL 45 - WaniKani Level 45
  // Kanji: 岳澄矛肌舟鐘凶塊狩頃魂脚也井呪嬢暦曇眺裸賭疲塾卓磨菌陰霊湿硬稼嫁溝滝狂翔
  // ============================================

  const level45Radicals = [
    { character: "矛", meaningFr: "Lance", mnemonic: "La LANCE du guerrier !" },
    { character: "舟", meaningFr: "Bateau", mnemonic: "Le BATEAU sur l'eau !" },
  ];

  for (const radical of level45Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 45 } },
      update: { ...radical },
      create: { ...radical, levelId: 45 },
    });
  }

  const level45Kanji = [
    { character: "岳", meaningsFr: ["Pic", "Montagne"], readingsOn: ["ガク"], readingsKun: ["たけ"], meaningMnemonicFr: "La montagne et la colline. Le PIC, la MONTAGNE.", readingMnemonicFr: "Gaku - le PIC 'gaku' !" },
    { character: "澄", meaningsFr: ["Clair", "Limpide"], readingsOn: ["チョウ"], readingsKun: ["す-む"], meaningMnemonicFr: "L'eau et le grimper. CLAIR, LIMPIDE.", readingMnemonicFr: "Sumu - LIMPIDE 'sumu' !" },
    { character: "矛", meaningsFr: ["Lance"], readingsOn: ["ム"], readingsKun: ["ほこ"], meaningMnemonicFr: "L'arme pointue. La LANCE.", readingMnemonicFr: "Hoko - la LANCE 'hoko' !" },
    { character: "肌", meaningsFr: ["Peau"], readingsOn: ["キ"], readingsKun: ["はだ"], meaningMnemonicFr: "La chair et le plusieurs. La PEAU.", readingMnemonicFr: "Hada - la PEAU 'hada' !" },
    { character: "舟", meaningsFr: ["Bateau"], readingsOn: ["シュウ"], readingsKun: ["ふね"], meaningMnemonicFr: "Le petit bateau. Le BATEAU.", readingMnemonicFr: "Fune - le BATEAU 'fune' !" },
    { character: "鐘", meaningsFr: ["Cloche"], readingsOn: ["ショウ"], readingsKun: ["かね"], meaningMnemonicFr: "Le métal et le enfant童. La CLOCHE.", readingMnemonicFr: "Kane - la CLOCHE 'kane' !" },
    { character: "凶", meaningsFr: ["Mauvais présage"], readingsOn: ["キョウ"], readingsKun: [], meaningMnemonicFr: "Le piège dans la boîte. MAUVAIS PRÉSAGE.", readingMnemonicFr: "Kyou - MAUVAIS 'kyou' !" },
    { character: "塊", meaningsFr: ["Masse", "Bloc"], readingsOn: ["カイ"], readingsKun: ["かたまり"], meaningMnemonicFr: "La terre et le fantôme. La MASSE, le BLOC.", readingMnemonicFr: "Katamari - le BLOC !" },
    { character: "狩", meaningsFr: ["Chasser"], readingsOn: ["シュ"], readingsKun: ["か-る"], meaningMnemonicFr: "Le chien et le garder. CHASSER.", readingMnemonicFr: "Karu - CHASSER 'karu' !" },
    { character: "頃", meaningsFr: ["Environ", "Vers"], readingsOn: ["ケイ"], readingsKun: ["ころ"], meaningMnemonicFr: "Le comparer et la page. ENVIRON, VERS.", readingMnemonicFr: "Koro - ENVIRON 'koro' !" },
    { character: "魂", meaningsFr: ["Âme"], readingsOn: ["コン"], readingsKun: ["たましい"], meaningMnemonicFr: "Le nuage et le démon. L'ÂME.", readingMnemonicFr: "Tamashii - l'ÂME !" },
    { character: "脚", meaningsFr: ["Jambe"], readingsOn: ["キャク"], readingsKun: ["あし"], meaningMnemonicFr: "La chair et le aller. La JAMBE.", readingMnemonicFr: "Kyaku - la JAMBE 'kyaku' !" },
    { character: "也", meaningsFr: ["Être", "Aussi"], readingsOn: ["ヤ"], readingsKun: [], meaningMnemonicFr: "Le symbole classique. ÊTRE, AUSSI.", readingMnemonicFr: "Ya - AUSSI 'ya' !" },
    { character: "井", meaningsFr: ["Puits"], readingsOn: ["セイ"], readingsKun: ["い"], meaningMnemonicFr: "La structure carrée. Le PUITS.", readingMnemonicFr: "I - le PUITS 'i' !" },
    { character: "呪", meaningsFr: ["Malédiction"], readingsOn: ["ジュ"], readingsKun: ["のろ-う"], meaningMnemonicFr: "La bouche et le frère. La MALÉDICTION.", readingMnemonicFr: "Noroi - la MALÉDICTION !" },
    { character: "嬢", meaningsFr: ["Demoiselle"], readingsOn: ["ジョウ"], readingsKun: [], meaningMnemonicFr: "La femme et le céréale. La DEMOISELLE.", readingMnemonicFr: "Jou - DEMOISELLE 'jou' !" },
    { character: "暦", meaningsFr: ["Calendrier"], readingsOn: ["レキ"], readingsKun: ["こよみ"], meaningMnemonicFr: "Le soleil et la forêt. Le CALENDRIER.", readingMnemonicFr: "Koyomi - le CALENDRIER !" },
    { character: "曇", meaningsFr: ["Nuageux"], readingsOn: ["ドン"], readingsKun: ["くも-る"], meaningMnemonicFr: "Le soleil et le nuage雲. NUAGEUX.", readingMnemonicFr: "Kumoru - NUAGEUX !" },
    { character: "眺", meaningsFr: ["Contempler"], readingsOn: ["チョウ"], readingsKun: ["なが-める"], meaningMnemonicFr: "L'oeil et le signe. CONTEMPLER.", readingMnemonicFr: "Nagameru - CONTEMPLER !" },
    { character: "裸", meaningsFr: ["Nu"], readingsOn: ["ラ"], readingsKun: ["はだか"], meaningMnemonicFr: "Le vêtement et le fruit. NU.", readingMnemonicFr: "Hadaka - NU 'hadaka' !" },
    { character: "賭", meaningsFr: ["Parier"], readingsOn: ["ト"], readingsKun: ["か-ける"], meaningMnemonicFr: "Le coquillage et le serviteur. PARIER.", readingMnemonicFr: "Kakeru - PARIER !" },
    { character: "疲", meaningsFr: ["Fatigué"], readingsOn: ["ヒ"], readingsKun: ["つか-れる"], meaningMnemonicFr: "La maladie et la peau. FATIGUÉ.", readingMnemonicFr: "Tsukareru - FATIGUÉ !" },
    { character: "塾", meaningsFr: ["École privée"], readingsOn: ["ジュク"], readingsKun: [], meaningMnemonicFr: "La terre et le mûr. L'ÉCOLE PRIVÉE.", readingMnemonicFr: "Juku - ÉCOLE 'juku' !" },
    { character: "卓", meaningsFr: ["Table"], readingsOn: ["タク"], readingsKun: [], meaningMnemonicFr: "Le divination et le premier. La TABLE.", readingMnemonicFr: "Taku - la TABLE 'taku' !" },
    { character: "磨", meaningsFr: ["Polir"], readingsOn: ["マ"], readingsKun: ["みが-く"], meaningMnemonicFr: "La pierre et le chanvre. POLIR.", readingMnemonicFr: "Migaku - POLIR !" },
    { character: "菌", meaningsFr: ["Bactérie"], readingsOn: ["キン"], readingsKun: [], meaningMnemonicFr: "L'herbe et le champignon. La BACTÉRIE.", readingMnemonicFr: "Kin - la BACTÉRIE 'kin' !" },
    { character: "陰", meaningsFr: ["Ombre", "Yin"], readingsOn: ["イン"], readingsKun: ["かげ"], meaningMnemonicFr: "La colline et le maintenant. L'OMBRE, YIN.", readingMnemonicFr: "In - l'OMBRE 'in' !" },
    { character: "霊", meaningsFr: ["Esprit"], readingsOn: ["レイ"], readingsKun: ["たま"], meaningMnemonicFr: "La pluie et le sorcière. L'ESPRIT.", readingMnemonicFr: "Rei - l'ESPRIT 'rei' !" },
    { character: "湿", meaningsFr: ["Humide"], readingsOn: ["シツ"], readingsKun: ["しめ-る"], meaningMnemonicFr: "L'eau et le montrer. HUMIDE.", readingMnemonicFr: "Shitsu - HUMIDE 'shitsu' !" },
    { character: "硬", meaningsFr: ["Dur", "Rigide"], readingsOn: ["コウ"], readingsKun: ["かた-い"], meaningMnemonicFr: "La pierre et le changer. DUR, RIGIDE.", readingMnemonicFr: "Kou - DUR 'kou' !" },
    { character: "稼", meaningsFr: ["Gagner"], readingsOn: ["カ"], readingsKun: ["かせ-ぐ"], meaningMnemonicFr: "Le riz et la maison. GAGNER de l'argent.", readingMnemonicFr: "Kasegu - GAGNER !" },
    { character: "嫁", meaningsFr: ["Épouse", "Se marier"], readingsOn: ["カ"], readingsKun: ["よめ"], meaningMnemonicFr: "La femme et la maison. L'ÉPOUSE, SE MARIER.", readingMnemonicFr: "Yome - l'ÉPOUSE 'yome' !" },
    { character: "溝", meaningsFr: ["Fossé", "Gouttière"], readingsOn: ["コウ"], readingsKun: ["みぞ"], meaningMnemonicFr: "L'eau et le construire. Le FOSSÉ, la GOUTTIÈRE.", readingMnemonicFr: "Mizo - le FOSSÉ 'mizo' !" },
    { character: "滝", meaningsFr: ["Cascade"], readingsOn: ["ロウ"], readingsKun: ["たき"], meaningMnemonicFr: "L'eau et le dragon. La CASCADE.", readingMnemonicFr: "Taki - la CASCADE 'taki' !" },
    { character: "狂", meaningsFr: ["Fou"], readingsOn: ["キョウ"], readingsKun: ["くる-う"], meaningMnemonicFr: "Le chien et le roi. FOU.", readingMnemonicFr: "Kyou - FOU 'kyou' !" },
    { character: "翔", meaningsFr: ["Planer", "Voler"], readingsOn: ["ショウ"], readingsKun: ["かけ-る"], meaningMnemonicFr: "Le mouton et l'aile. PLANER, VOLER.", readingMnemonicFr: "Shou - PLANER 'shou' !" },
  ];

  for (const kanji of level45Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 45 },
      create: { ...kanji, levelId: 45 },
    });
  }

  const level45Vocab = [
    { word: "岳", meaningsFr: ["Pic"], readings: ["たけ"], mnemonicFr: "Le PIC de la montagne.", levelId: 45 },
    { word: "澄む", meaningsFr: ["Devenir clair"], readings: ["すむ"], mnemonicFr: "L'eau DEVIENT CLAIRE.", levelId: 45 },
    { word: "矛盾", meaningsFr: ["Contradiction"], readings: ["むじゅん"], mnemonicFr: "Une CONTRADICTION.", levelId: 45 },
    { word: "肌", meaningsFr: ["Peau"], readings: ["はだ"], mnemonicFr: "La PEAU douce.", levelId: 45 },
    { word: "舟", meaningsFr: ["Bateau"], readings: ["ふね"], mnemonicFr: "Un petit BATEAU.", levelId: 45 },
    { word: "鐘", meaningsFr: ["Cloche"], readings: ["かね"], mnemonicFr: "La CLOCHE sonne.", levelId: 45 },
    { word: "凶", meaningsFr: ["Mauvais présage"], readings: ["きょう"], mnemonicFr: "Un MAUVAIS PRÉSAGE.", levelId: 45 },
    { word: "塊", meaningsFr: ["Bloc"], readings: ["かたまり"], mnemonicFr: "Un BLOC de pierre.", levelId: 45 },
    { word: "狩り", meaningsFr: ["Chasse"], readings: ["かり"], mnemonicFr: "La CHASSE au gibier.", levelId: 45 },
    { word: "頃", meaningsFr: ["Environ"], readings: ["ころ"], mnemonicFr: "ENVIRON cette heure.", levelId: 45 },
    { word: "魂", meaningsFr: ["Âme"], readings: ["たましい"], mnemonicFr: "L'ÂME immortelle.", levelId: 45 },
    { word: "脚", meaningsFr: ["Jambe"], readings: ["あし"], mnemonicFr: "Les JAMBES longues.", levelId: 45 },
    { word: "井戸", meaningsFr: ["Puits"], readings: ["いど"], mnemonicFr: "Le PUITS profond.", levelId: 45 },
    { word: "呪い", meaningsFr: ["Malédiction"], readings: ["のろい"], mnemonicFr: "Une MALÉDICTION terrible.", levelId: 45 },
    { word: "お嬢さん", meaningsFr: ["Mademoiselle"], readings: ["おじょうさん"], mnemonicFr: "MADEMOISELLE.", levelId: 45 },
    { word: "暦", meaningsFr: ["Calendrier"], readings: ["こよみ"], mnemonicFr: "Le CALENDRIER de l'année.", levelId: 45 },
    { word: "曇り", meaningsFr: ["Nuageux"], readings: ["くもり"], mnemonicFr: "Temps NUAGEUX.", levelId: 45 },
    { word: "眺める", meaningsFr: ["Contempler"], readings: ["ながめる"], mnemonicFr: "CONTEMPLER le paysage.", levelId: 45 },
    { word: "裸", meaningsFr: ["Nu"], readings: ["はだか"], mnemonicFr: "Être NU.", levelId: 45 },
    { word: "賭ける", meaningsFr: ["Parier"], readings: ["かける"], mnemonicFr: "PARIER de l'argent.", levelId: 45 },
    { word: "疲れる", meaningsFr: ["Se fatiguer"], readings: ["つかれる"], mnemonicFr: "SE FATIGUER.", levelId: 45 },
    { word: "塾", meaningsFr: ["École privée"], readings: ["じゅく"], mnemonicFr: "L'ÉCOLE PRIVÉE.", levelId: 45 },
    { word: "食卓", meaningsFr: ["Table à manger"], readings: ["しょくたく"], mnemonicFr: "La TABLE À MANGER.", levelId: 45 },
    { word: "磨く", meaningsFr: ["Polir"], readings: ["みがく"], mnemonicFr: "POLIR le métal.", levelId: 45 },
    { word: "細菌", meaningsFr: ["Bactérie"], readings: ["さいきん"], mnemonicFr: "Les BACTÉRIES.", levelId: 45 },
    { word: "陰", meaningsFr: ["Ombre"], readings: ["かげ"], mnemonicFr: "L'OMBRE de l'arbre.", levelId: 45 },
    { word: "霊", meaningsFr: ["Esprit"], readings: ["れい"], mnemonicFr: "Un ESPRIT fantôme.", levelId: 45 },
    { word: "湿気", meaningsFr: ["Humidité"], readings: ["しっけ"], mnemonicFr: "L'HUMIDITÉ de l'air.", levelId: 45 },
    { word: "硬い", meaningsFr: ["Dur"], readings: ["かたい"], mnemonicFr: "Un objet DUR.", levelId: 45 },
    { word: "稼ぐ", meaningsFr: ["Gagner"], readings: ["かせぐ"], mnemonicFr: "GAGNER de l'argent.", levelId: 45 },
    { word: "嫁", meaningsFr: ["Épouse"], readings: ["よめ"], mnemonicFr: "L'ÉPOUSE fidèle.", levelId: 45 },
    { word: "溝", meaningsFr: ["Fossé"], readings: ["みぞ"], mnemonicFr: "Le FOSSÉ au bord.", levelId: 45 },
    { word: "滝", meaningsFr: ["Cascade"], readings: ["たき"], mnemonicFr: "La CASCADE majestueuse.", levelId: 45 },
    { word: "狂う", meaningsFr: ["Devenir fou"], readings: ["くるう"], mnemonicFr: "DEVENIR FOU.", levelId: 45 },
    { word: "飛翔", meaningsFr: ["Vol"], readings: ["ひしょう"], mnemonicFr: "Le VOL majestueux.", levelId: 45 },
  ];

  for (const vocab of level45Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 45 complete!");

  // ============================================
  // LEVEL 46 - WaniKani Level 46
  // Kanji: 墨鳩穏鈍魔寮盆棟吾斬寧椅歳涼猿瞳鍵零碁租幽泡癖鍛錬穂帝瞬菊誇庄阻黙俵綿架孔
  // ============================================

  const level46Radicals = [
    { character: "鳩", meaningFr: "Pigeon", mnemonic: "L'oiseau neuf. Le PIGEON !" },
  ];

  for (const radical of level46Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 46 } },
      update: { ...radical },
      create: { ...radical, levelId: 46 },
    });
  }

  const level46Kanji = [
    { character: "墨", meaningsFr: ["Encre"], readingsOn: ["ボク"], readingsKun: ["すみ"], meaningMnemonicFr: "Le noir et la terre. L'ENCRE.", readingMnemonicFr: "Sumi - l'ENCRE 'sumi' !" },
    { character: "鳩", meaningsFr: ["Pigeon"], readingsOn: ["キュウ"], readingsKun: ["はと"], meaningMnemonicFr: "L'oiseau et le neuf. Le PIGEON.", readingMnemonicFr: "Hato - le PIGEON 'hato' !" },
    { character: "穏", meaningsFr: ["Calme", "Paisible"], readingsOn: ["オン"], readingsKun: ["おだ-やか"], meaningMnemonicFr: "Le riz et le coeur. CALME, PAISIBLE.", readingMnemonicFr: "On - CALME 'on' !" },
    { character: "鈍", meaningsFr: ["Émoussé", "Lent"], readingsOn: ["ドン"], readingsKun: ["にぶ-い"], meaningMnemonicFr: "Le métal et le s'échapper. ÉMOUSSÉ, LENT.", readingMnemonicFr: "Don - LENT 'don' !" },
    { character: "魔", meaningsFr: ["Démon", "Magie"], readingsOn: ["マ"], readingsKun: [], meaningMnemonicFr: "Le chanvre et le démon. Le DÉMON, la MAGIE.", readingMnemonicFr: "Ma - la MAGIE 'ma' !" },
    { character: "寮", meaningsFr: ["Dortoir"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "Le toit et le terminer. Le DORTOIR.", readingMnemonicFr: "Ryou - le DORTOIR 'ryou' !" },
    { character: "盆", meaningsFr: ["Plateau", "Bon"], readingsOn: ["ボン"], readingsKun: [], meaningMnemonicFr: "Le diviser et le récipient. Le PLATEAU, BON.", readingMnemonicFr: "Bon - le PLATEAU 'bon' !" },
    { character: "棟", meaningsFr: ["Poutre", "Bâtiment"], readingsOn: ["トウ"], readingsKun: ["むね"], meaningMnemonicFr: "L'arbre et l'est. La POUTRE, le BÂTIMENT.", readingMnemonicFr: "Tou - le BÂTIMENT 'tou' !" },
    { character: "吾", meaningsFr: ["Je", "Moi"], readingsOn: ["ゴ"], readingsKun: ["われ"], meaningMnemonicFr: "Le cinq et la bouche. JE, MOI.", readingMnemonicFr: "Go - JE 'go' !" },
    { character: "斬", meaningsFr: ["Couper", "Trancher"], readingsOn: ["ザン"], readingsKun: ["き-る"], meaningMnemonicFr: "La voiture et la hache. COUPER, TRANCHER.", readingMnemonicFr: "Zan - TRANCHER 'zan' !" },
    { character: "寧", meaningsFr: ["Plutôt", "Paisible"], readingsOn: ["ネイ"], readingsKun: [], meaningMnemonicFr: "Le toit et le coeur. PLUTÔT, PAISIBLE.", readingMnemonicFr: "Nei - PAISIBLE 'nei' !" },
    { character: "椅", meaningsFr: ["Chaise"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le étrange. La CHAISE.", readingMnemonicFr: "I - la CHAISE 'i' !" },
    { character: "歳", meaningsFr: ["An", "Âge"], readingsOn: ["サイ"], readingsKun: ["とし"], meaningMnemonicFr: "L'arrêter et le lance. L'AN, l'ÂGE.", readingMnemonicFr: "Sai - l'ÂGE 'sai' !" },
    { character: "涼", meaningsFr: ["Frais"], readingsOn: ["リョウ"], readingsKun: ["すず-しい"], meaningMnemonicFr: "L'eau et la capitale. FRAIS.", readingMnemonicFr: "Ryou - FRAIS 'ryou' !" },
    { character: "猿", meaningsFr: ["Singe"], readingsOn: ["エン"], readingsKun: ["さる"], meaningMnemonicFr: "Le chien et le vêtement. Le SINGE.", readingMnemonicFr: "Saru - le SINGE 'saru' !" },
    { character: "瞳", meaningsFr: ["Pupille"], readingsOn: ["ドウ"], readingsKun: ["ひとみ"], meaningMnemonicFr: "L'oeil et l'enfant. La PUPILLE.", readingMnemonicFr: "Hitomi - la PUPILLE !" },
    { character: "鍵", meaningsFr: ["Clé"], readingsOn: ["ケン"], readingsKun: ["かぎ"], meaningMnemonicFr: "Le métal et le construire. La CLÉ.", readingMnemonicFr: "Kagi - la CLÉ 'kagi' !" },
    { character: "零", meaningsFr: ["Zéro"], readingsOn: ["レイ"], readingsKun: [], meaningMnemonicFr: "La pluie et le commander. ZÉRO.", readingMnemonicFr: "Rei - ZÉRO 'rei' !" },
    { character: "碁", meaningsFr: ["Go (jeu)"], readingsOn: ["ゴ"], readingsKun: [], meaningMnemonicFr: "La pierre et le son. Le GO (jeu).", readingMnemonicFr: "Go - le GO 'go' !" },
    { character: "租", meaningsFr: ["Impôt"], readingsOn: ["ソ"], readingsKun: [], meaningMnemonicFr: "Le riz et le ancien. L'IMPÔT.", readingMnemonicFr: "So - l'IMPÔT 'so' !" },
    { character: "幽", meaningsFr: ["Sombre", "Profond"], readingsOn: ["ユウ"], readingsKun: [], meaningMnemonicFr: "La montagne et le petit. SOMBRE, PROFOND.", readingMnemonicFr: "Yuu - SOMBRE 'yuu' !" },
    { character: "泡", meaningsFr: ["Bulle"], readingsOn: ["ホウ"], readingsKun: ["あわ"], meaningMnemonicFr: "L'eau et l'envelopper. La BULLE.", readingMnemonicFr: "Awa - la BULLE 'awa' !" },
    { character: "癖", meaningsFr: ["Habitude", "Manie"], readingsOn: ["ヘキ"], readingsKun: ["くせ"], meaningMnemonicFr: "La maladie et le mur. L'HABITUDE, la MANIE.", readingMnemonicFr: "Kuse - l'HABITUDE 'kuse' !" },
    { character: "鍛", meaningsFr: ["Forger"], readingsOn: ["タン"], readingsKun: ["きた-える"], meaningMnemonicFr: "Le métal et l'étape. FORGER.", readingMnemonicFr: "Tan - FORGER 'tan' !" },
    { character: "錬", meaningsFr: ["Raffiner"], readingsOn: ["レン"], readingsKun: [], meaningMnemonicFr: "Le métal et l'est. RAFFINER.", readingMnemonicFr: "Ren - RAFFINER 'ren' !" },
    { character: "穂", meaningsFr: ["Épi"], readingsOn: ["スイ"], readingsKun: ["ほ"], meaningMnemonicFr: "Le riz et le favori. L'ÉPI.", readingMnemonicFr: "Ho - l'ÉPI 'ho' !" },
    { character: "帝", meaningsFr: ["Empereur"], readingsOn: ["テイ"], readingsKun: [], meaningMnemonicFr: "Le debout et le tissu. L'EMPEREUR.", readingMnemonicFr: "Tei - l'EMPEREUR 'tei' !" },
    { character: "瞬", meaningsFr: ["Clin d'oeil", "Instant"], readingsOn: ["シュン"], readingsKun: ["またた-く"], meaningMnemonicFr: "L'oeil et le printemps. Le CLIN D'OEIL, l'INSTANT.", readingMnemonicFr: "Shun - l'INSTANT 'shun' !" },
    { character: "菊", meaningsFr: ["Chrysanthème"], readingsOn: ["キク"], readingsKun: [], meaningMnemonicFr: "L'herbe et le riz. Le CHRYSANTHÈME.", readingMnemonicFr: "Kiku - le CHRYSANTHÈME !" },
    { character: "誇", meaningsFr: ["Fierté"], readingsOn: ["コ"], readingsKun: ["ほこ-る"], meaningMnemonicFr: "La parole et le grand. La FIERTÉ.", readingMnemonicFr: "Hokoru - la FIERTÉ !" },
    { character: "庄", meaningsFr: ["Village"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Le toit et la terre. Le VILLAGE.", readingMnemonicFr: "Shou - le VILLAGE 'shou' !" },
    { character: "阻", meaningsFr: ["Bloquer"], readingsOn: ["ソ"], readingsKun: ["はば-む"], meaningMnemonicFr: "La colline et l'ancien. BLOQUER.", readingMnemonicFr: "So - BLOQUER 'so' !" },
    { character: "黙", meaningsFr: ["Silence"], readingsOn: ["モク"], readingsKun: ["だま-る"], meaningMnemonicFr: "Le noir et le chien. Le SILENCE.", readingMnemonicFr: "Moku - SILENCE 'moku' !" },
    { character: "俵", meaningsFr: ["Sac de paille"], readingsOn: ["ヒョウ"], readingsKun: ["たわら"], meaningMnemonicFr: "La personne et la surface. Le SAC DE PAILLE.", readingMnemonicFr: "Tawara - le SAC !" },
    { character: "綿", meaningsFr: ["Coton"], readingsOn: ["メン"], readingsKun: ["わた"], meaningMnemonicFr: "Le fil et le blanc. Le COTON.", readingMnemonicFr: "Wata - le COTON 'wata' !" },
    { character: "架", meaningsFr: ["Étagère", "Construire"], readingsOn: ["カ"], readingsKun: ["か-ける"], meaningMnemonicFr: "L'arbre et l'ajouter. L'ÉTAGÈRE, CONSTRUIRE.", readingMnemonicFr: "Ka - CONSTRUIRE 'ka' !" },
    { character: "孔", meaningsFr: ["Trou"], readingsOn: ["コウ"], readingsKun: [], meaningMnemonicFr: "L'enfant et le perdre. Le TROU.", readingMnemonicFr: "Kou - le TROU 'kou' !" },
  ];

  for (const kanji of level46Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 46 },
      create: { ...kanji, levelId: 46 },
    });
  }

  const level46Vocab = [
    { word: "墨", meaningsFr: ["Encre"], readings: ["すみ"], mnemonicFr: "L'ENCRE noire.", levelId: 46 },
    { word: "鳩", meaningsFr: ["Pigeon"], readings: ["はと"], mnemonicFr: "Le PIGEON blanc.", levelId: 46 },
    { word: "穏やか", meaningsFr: ["Calme"], readings: ["おだやか"], mnemonicFr: "Une mer CALME.", levelId: 46 },
    { word: "鈍い", meaningsFr: ["Émoussé"], readings: ["にぶい"], mnemonicFr: "Un couteau ÉMOUSSÉ.", levelId: 46 },
    { word: "魔法", meaningsFr: ["Magie"], readings: ["まほう"], mnemonicFr: "La MAGIE fantastique.", levelId: 46 },
    { word: "寮", meaningsFr: ["Dortoir"], readings: ["りょう"], mnemonicFr: "Le DORTOIR universitaire.", levelId: 46 },
    { word: "お盆", meaningsFr: ["Obon"], readings: ["おぼん"], mnemonicFr: "La fête d'OBON.", levelId: 46 },
    { word: "棟", meaningsFr: ["Bâtiment"], readings: ["むね"], mnemonicFr: "Un BÂTIMENT moderne.", levelId: 46 },
    { word: "斬る", meaningsFr: ["Trancher"], readings: ["きる"], mnemonicFr: "TRANCHER d'un coup.", levelId: 46 },
    { word: "丁寧", meaningsFr: ["Poli"], readings: ["ていねい"], mnemonicFr: "Un comportement POLI.", levelId: 46 },
    { word: "椅子", meaningsFr: ["Chaise"], readings: ["いす"], mnemonicFr: "Une CHAISE confortable.", levelId: 46 },
    { word: "歳", meaningsFr: ["Ans"], readings: ["さい"], mnemonicFr: "Avoir 20 ANS.", levelId: 46 },
    { word: "涼しい", meaningsFr: ["Frais"], readings: ["すずしい"], mnemonicFr: "Un vent FRAIS.", levelId: 46 },
    { word: "猿", meaningsFr: ["Singe"], readings: ["さる"], mnemonicFr: "Le SINGE malin.", levelId: 46 },
    { word: "瞳", meaningsFr: ["Pupille"], readings: ["ひとみ"], mnemonicFr: "La PUPILLE de l'oeil.", levelId: 46 },
    { word: "鍵", meaningsFr: ["Clé"], readings: ["かぎ"], mnemonicFr: "La CLÉ de la porte.", levelId: 46 },
    { word: "零", meaningsFr: ["Zéro"], readings: ["れい"], mnemonicFr: "Le nombre ZÉRO.", levelId: 46 },
    { word: "囲碁", meaningsFr: ["Go"], readings: ["いご"], mnemonicFr: "Le jeu de GO.", levelId: 46 },
    { word: "幽霊", meaningsFr: ["Fantôme"], readings: ["ゆうれい"], mnemonicFr: "Un FANTÔME effrayant.", levelId: 46 },
    { word: "泡", meaningsFr: ["Bulle"], readings: ["あわ"], mnemonicFr: "Des BULLES de savon.", levelId: 46 },
    { word: "癖", meaningsFr: ["Habitude"], readings: ["くせ"], mnemonicFr: "Une mauvaise HABITUDE.", levelId: 46 },
    { word: "鍛える", meaningsFr: ["S'entraîner"], readings: ["きたえる"], mnemonicFr: "S'ENTRAÎNER dur.", levelId: 46 },
    { word: "訓練", meaningsFr: ["Entraînement"], readings: ["くんれん"], mnemonicFr: "L'ENTRAÎNEMENT militaire.", levelId: 46 },
    { word: "稲穂", meaningsFr: ["Épi de riz"], readings: ["いなほ"], mnemonicFr: "L'ÉPI DE RIZ doré.", levelId: 46 },
    { word: "皇帝", meaningsFr: ["Empereur"], readings: ["こうてい"], mnemonicFr: "L'EMPEREUR puissant.", levelId: 46 },
    { word: "瞬間", meaningsFr: ["Instant"], readings: ["しゅんかん"], mnemonicFr: "Un INSTANT bref.", levelId: 46 },
    { word: "菊", meaningsFr: ["Chrysanthème"], readings: ["きく"], mnemonicFr: "Le CHRYSANTHÈME japonais.", levelId: 46 },
    { word: "誇り", meaningsFr: ["Fierté"], readings: ["ほこり"], mnemonicFr: "La FIERTÉ nationale.", levelId: 46 },
    { word: "阻止", meaningsFr: ["Empêcher"], readings: ["そし"], mnemonicFr: "EMPÊCHER l'attaque.", levelId: 46 },
    { word: "沈黙", meaningsFr: ["Silence"], readings: ["ちんもく"], mnemonicFr: "Le SILENCE absolu.", levelId: 46 },
    { word: "綿", meaningsFr: ["Coton"], readings: ["わた"], mnemonicFr: "Du COTON doux.", levelId: 46 },
    { word: "架空", meaningsFr: ["Fictif"], readings: ["かくう"], mnemonicFr: "Une histoire FICTIVE.", levelId: 46 },
  ];

  for (const vocab of level46Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 46 complete!");

  // ============================================
  // LEVEL 47 - WaniKani Level 47
  // Kanji: 砕粘粧欺詐霧柳伊佐尺哀唇塀墜如婆崖帽幣恨憎憩扇扉挿掌滴炊爽畳瞭箸胴芯虹巾煎
  // ============================================

  const level47Radicals = [
    { character: "巾", meaningFr: "Tissu", mnemonic: "Le TISSU suspendu !" },
  ];

  for (const radical of level47Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 47 } },
      update: { ...radical },
      create: { ...radical, levelId: 47 },
    });
  }

  const level47Kanji = [
    { character: "砕", meaningsFr: ["Écraser", "Briser"], readingsOn: ["サイ"], readingsKun: ["くだ-く"], meaningMnemonicFr: "La pierre et le neuf. ÉCRASER, BRISER.", readingMnemonicFr: "Kudaku - BRISER !" },
    { character: "粘", meaningsFr: ["Collant", "Gluant"], readingsOn: ["ネン"], readingsKun: ["ねば-る"], meaningMnemonicFr: "Le riz et le divination. COLLANT, GLUANT.", readingMnemonicFr: "Nen - COLLANT 'nen' !" },
    { character: "粧", meaningsFr: ["Maquillage"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Le riz et le village. Le MAQUILLAGE.", readingMnemonicFr: "Shou - MAQUILLAGE 'shou' !" },
    { character: "欺", meaningsFr: ["Tromper"], readingsOn: ["ギ"], readingsKun: ["あざむ-く"], meaningMnemonicFr: "Le son et le manque. TROMPER.", readingMnemonicFr: "Gi - TROMPER 'gi' !" },
    { character: "詐", meaningsFr: ["Frauder"], readingsOn: ["サ"], readingsKun: [], meaningMnemonicFr: "La parole et le hier. FRAUDER.", readingMnemonicFr: "Sa - FRAUDER 'sa' !" },
    { character: "霧", meaningsFr: ["Brouillard"], readingsOn: ["ム"], readingsKun: ["きり"], meaningMnemonicFr: "La pluie et le devoir. Le BROUILLARD.", readingMnemonicFr: "Kiri - le BROUILLARD !" },
    { character: "柳", meaningsFr: ["Saule"], readingsOn: ["リュウ"], readingsKun: ["やなぎ"], meaningMnemonicFr: "L'arbre et le s'unir. Le SAULE.", readingMnemonicFr: "Yanagi - le SAULE !" },
    { character: "伊", meaningsFr: ["Italie"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "La personne et le gouverner. ITALIE.", readingMnemonicFr: "I - ITALIE 'i' !" },
    { character: "佐", meaningsFr: ["Aide"], readingsOn: ["サ"], readingsKun: [], meaningMnemonicFr: "La personne et la gauche. L'AIDE.", readingMnemonicFr: "Sa - l'AIDE 'sa' !" },
    { character: "尺", meaningsFr: ["Pied (mesure)"], readingsOn: ["シャク"], readingsKun: [], meaningMnemonicFr: "La mesure ancienne. Le PIED (mesure).", readingMnemonicFr: "Shaku - le PIED 'shaku' !" },
    { character: "哀", meaningsFr: ["Triste", "Pitoyable"], readingsOn: ["アイ"], readingsKun: ["あわ-れ"], meaningMnemonicFr: "La bouche et le vêtement. TRISTE, PITOYABLE.", readingMnemonicFr: "Ai - TRISTE 'ai' !" },
    { character: "唇", meaningsFr: ["Lèvre"], readingsOn: ["シン"], readingsKun: ["くちびる"], meaningMnemonicFr: "La bouche et le matin. La LÈVRE.", readingMnemonicFr: "Kuchibiru - la LÈVRE !" },
    { character: "塀", meaningsFr: ["Mur", "Clôture"], readingsOn: ["ヘイ"], readingsKun: [], meaningMnemonicFr: "La terre et le ensemble. Le MUR, la CLÔTURE.", readingMnemonicFr: "Hei - le MUR 'hei' !" },
    { character: "墜", meaningsFr: ["Tomber", "Chuter"], readingsOn: ["ツイ"], readingsKun: [], meaningMnemonicFr: "La terre et le accompagner. TOMBER, CHUTER.", readingMnemonicFr: "Tsui - TOMBER 'tsui' !" },
    { character: "如", meaningsFr: ["Comme", "Tel que"], readingsOn: ["ジョ"], readingsKun: ["ごと-し"], meaningMnemonicFr: "La femme et la bouche. COMME, TEL QUE.", readingMnemonicFr: "Jo - COMME 'jo' !" },
    { character: "婆", meaningsFr: ["Vieille femme"], readingsOn: ["バ"], readingsKun: ["ばば"], meaningMnemonicFr: "La vague et la femme. La VIEILLE FEMME.", readingMnemonicFr: "Ba - la VIEILLE 'ba' !" },
    { character: "崖", meaningsFr: ["Falaise"], readingsOn: ["ガイ"], readingsKun: ["がけ"], meaningMnemonicFr: "La montagne et le bord. La FALAISE.", readingMnemonicFr: "Gake - la FALAISE 'gake' !" },
    { character: "帽", meaningsFr: ["Chapeau"], readingsOn: ["ボウ"], readingsKun: [], meaningMnemonicFr: "Le tissu et le risquer. Le CHAPEAU.", readingMnemonicFr: "Bou - le CHAPEAU 'bou' !" },
    { character: "幣", meaningsFr: ["Monnaie", "Offrande"], readingsOn: ["ヘイ"], readingsKun: [], meaningMnemonicFr: "Le défaut et le tissu. La MONNAIE, l'OFFRANDE.", readingMnemonicFr: "Hei - la MONNAIE 'hei' !" },
    { character: "恨", meaningsFr: ["Rancune"], readingsOn: ["コン"], readingsKun: ["うら-む"], meaningMnemonicFr: "Le coeur et le bon. La RANCUNE.", readingMnemonicFr: "Uramu - la RANCUNE !" },
    { character: "憎", meaningsFr: ["Haïr"], readingsOn: ["ゾウ"], readingsKun: ["にく-む"], meaningMnemonicFr: "Le coeur et l'augmenter. HAÏR.", readingMnemonicFr: "Nikumu - HAÏR !" },
    { character: "憩", meaningsFr: ["Repos"], readingsOn: ["ケイ"], readingsKun: ["いこ-う"], meaningMnemonicFr: "Le coeur et le soi-même. Le REPOS.", readingMnemonicFr: "Ikoi - le REPOS !" },
    { character: "扇", meaningsFr: ["Éventail"], readingsOn: ["セン"], readingsKun: ["おうぎ"], meaningMnemonicFr: "La porte et l'aile. L'ÉVENTAIL.", readingMnemonicFr: "Ougi - l'ÉVENTAIL !" },
    { character: "扉", meaningsFr: ["Porte"], readingsOn: ["ヒ"], readingsKun: ["とびら"], meaningMnemonicFr: "La porte et le non. La PORTE.", readingMnemonicFr: "Tobira - la PORTE !" },
    { character: "挿", meaningsFr: ["Insérer"], readingsOn: ["ソウ"], readingsKun: ["さ-す"], meaningMnemonicFr: "La main et le mille. INSÉRER.", readingMnemonicFr: "Sou - INSÉRER 'sou' !" },
    { character: "掌", meaningsFr: ["Paume"], readingsOn: ["ショウ"], readingsKun: ["てのひら"], meaningMnemonicFr: "Le encore et la main. La PAUME.", readingMnemonicFr: "Shou - la PAUME 'shou' !" },
    { character: "滴", meaningsFr: ["Goutte"], readingsOn: ["テキ"], readingsKun: ["しずく"], meaningMnemonicFr: "L'eau et le empereur. La GOUTTE.", readingMnemonicFr: "Shizuku - la GOUTTE !" },
    { character: "炊", meaningsFr: ["Cuire"], readingsOn: ["スイ"], readingsKun: ["た-く"], meaningMnemonicFr: "Le feu et le manque. CUIRE.", readingMnemonicFr: "Taku - CUIRE 'taku' !" },
    { character: "爽", meaningsFr: ["Rafraîchissant"], readingsOn: ["ソウ"], readingsKun: ["さわ-やか"], meaningMnemonicFr: "Le grand et le croix. RAFRAÎCHISSANT.", readingMnemonicFr: "Sou - RAFRAÎCHISSANT !" },
    { character: "畳", meaningsFr: ["Tatami"], readingsOn: ["ジョウ"], readingsKun: ["たたみ"], meaningMnemonicFr: "Le rizière et le encore. Le TATAMI.", readingMnemonicFr: "Tatami - le TATAMI !" },
    { character: "瞭", meaningsFr: ["Clair", "Évident"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "L'oeil et le terminer. CLAIR, ÉVIDENT.", readingMnemonicFr: "Ryou - CLAIR 'ryou' !" },
    { character: "箸", meaningsFr: ["Baguettes"], readingsOn: ["チョ"], readingsKun: ["はし"], meaningMnemonicFr: "Le bambou et le serviteur. Les BAGUETTES.", readingMnemonicFr: "Hashi - les BAGUETTES !" },
    { character: "胴", meaningsFr: ["Tronc", "Corps"], readingsOn: ["ドウ"], readingsKun: [], meaningMnemonicFr: "La chair et le même. Le TRONC, le CORPS.", readingMnemonicFr: "Dou - le TRONC 'dou' !" },
    { character: "芯", meaningsFr: ["Noyau", "Coeur"], readingsOn: ["シン"], readingsKun: [], meaningMnemonicFr: "L'herbe et le coeur. Le NOYAU, le COEUR.", readingMnemonicFr: "Shin - le NOYAU 'shin' !" },
    { character: "虹", meaningsFr: ["Arc-en-ciel"], readingsOn: ["コウ"], readingsKun: ["にじ"], meaningMnemonicFr: "L'insecte et le travail. L'ARC-EN-CIEL.", readingMnemonicFr: "Niji - l'ARC-EN-CIEL !" },
    { character: "巾", meaningsFr: ["Tissu"], readingsOn: ["キン"], readingsKun: [], meaningMnemonicFr: "Le tissu suspendu. Le TISSU.", readingMnemonicFr: "Kin - le TISSU 'kin' !" },
    { character: "煎", meaningsFr: ["Griller", "Infuser"], readingsOn: ["セン"], readingsKun: ["い-る"], meaningMnemonicFr: "Le feu et l'avant. GRILLER, INFUSER.", readingMnemonicFr: "Sen - GRILLER 'sen' !" },
  ];

  for (const kanji of level47Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 47 },
      create: { ...kanji, levelId: 47 },
    });
  }

  const level47Vocab = [
    { word: "砕く", meaningsFr: ["Briser"], readings: ["くだく"], mnemonicFr: "BRISER en morceaux.", levelId: 47 },
    { word: "粘る", meaningsFr: ["Coller"], readings: ["ねばる"], mnemonicFr: "COLLER ensemble.", levelId: 47 },
    { word: "化粧", meaningsFr: ["Maquillage"], readings: ["けしょう"], mnemonicFr: "Le MAQUILLAGE du visage.", levelId: 47 },
    { word: "欺く", meaningsFr: ["Tromper"], readings: ["あざむく"], mnemonicFr: "TROMPER quelqu'un.", levelId: 47 },
    { word: "詐欺", meaningsFr: ["Fraude"], readings: ["さぎ"], mnemonicFr: "Une FRAUDE grave.", levelId: 47 },
    { word: "霧", meaningsFr: ["Brouillard"], readings: ["きり"], mnemonicFr: "Le BROUILLARD épais.", levelId: 47 },
    { word: "柳", meaningsFr: ["Saule"], readings: ["やなぎ"], mnemonicFr: "Le SAULE pleureur.", levelId: 47 },
    { word: "哀れ", meaningsFr: ["Pitoyable"], readings: ["あわれ"], mnemonicFr: "Un sort PITOYABLE.", levelId: 47 },
    { word: "唇", meaningsFr: ["Lèvres"], readings: ["くちびる"], mnemonicFr: "Les LÈVRES roses.", levelId: 47 },
    { word: "塀", meaningsFr: ["Mur"], readings: ["へい"], mnemonicFr: "Un MUR de pierre.", levelId: 47 },
    { word: "墜落", meaningsFr: ["Chute"], readings: ["ついらく"], mnemonicFr: "La CHUTE de l'avion.", levelId: 47 },
    { word: "突如", meaningsFr: ["Soudainement"], readings: ["とつじょ"], mnemonicFr: "SOUDAINEMENT.", levelId: 47 },
    { word: "老婆", meaningsFr: ["Vieille femme"], readings: ["ろうば"], mnemonicFr: "Une VIEILLE FEMME.", levelId: 47 },
    { word: "崖", meaningsFr: ["Falaise"], readings: ["がけ"], mnemonicFr: "Une haute FALAISE.", levelId: 47 },
    { word: "帽子", meaningsFr: ["Chapeau"], readings: ["ぼうし"], mnemonicFr: "Un CHAPEAU élégant.", levelId: 47 },
    { word: "貨幣", meaningsFr: ["Monnaie"], readings: ["かへい"], mnemonicFr: "La MONNAIE du pays.", levelId: 47 },
    { word: "恨む", meaningsFr: ["En vouloir à"], readings: ["うらむ"], mnemonicFr: "EN VOULOIR À quelqu'un.", levelId: 47 },
    { word: "憎む", meaningsFr: ["Haïr"], readings: ["にくむ"], mnemonicFr: "HAÏR profondément.", levelId: 47 },
    { word: "休憩", meaningsFr: ["Pause"], readings: ["きゅうけい"], mnemonicFr: "Une PAUSE café.", levelId: 47 },
    { word: "扇子", meaningsFr: ["Éventail"], readings: ["せんす"], mnemonicFr: "Un ÉVENTAIL japonais.", levelId: 47 },
    { word: "扉", meaningsFr: ["Porte"], readings: ["とびら"], mnemonicFr: "La PORTE s'ouvre.", levelId: 47 },
    { word: "挿入", meaningsFr: ["Insertion"], readings: ["そうにゅう"], mnemonicFr: "L'INSERTION de données.", levelId: 47 },
    { word: "掌", meaningsFr: ["Paume"], readings: ["てのひら"], mnemonicFr: "La PAUME de la main.", levelId: 47 },
    { word: "雫", meaningsFr: ["Goutte"], readings: ["しずく"], mnemonicFr: "Une GOUTTE d'eau.", levelId: 47 },
    { word: "炊く", meaningsFr: ["Cuire"], readings: ["たく"], mnemonicFr: "CUIRE le riz.", levelId: 47 },
    { word: "爽やか", meaningsFr: ["Rafraîchissant"], readings: ["さわやか"], mnemonicFr: "Un temps RAFRAÎCHISSANT.", levelId: 47 },
    { word: "畳", meaningsFr: ["Tatami"], readings: ["たたみ"], mnemonicFr: "Un TATAMI neuf.", levelId: 47 },
    { word: "明瞭", meaningsFr: ["Clair"], readings: ["めいりょう"], mnemonicFr: "Une explication CLAIRE.", levelId: 47 },
    { word: "箸", meaningsFr: ["Baguettes"], readings: ["はし"], mnemonicFr: "Des BAGUETTES en bois.", levelId: 47 },
    { word: "胴体", meaningsFr: ["Tronc"], readings: ["どうたい"], mnemonicFr: "Le TRONC du corps.", levelId: 47 },
    { word: "虹", meaningsFr: ["Arc-en-ciel"], readings: ["にじ"], mnemonicFr: "Un bel ARC-EN-CIEL.", levelId: 47 },
    { word: "煎茶", meaningsFr: ["Thé vert"], readings: ["せんちゃ"], mnemonicFr: "Du THÉ VERT japonais.", levelId: 47 },
  ];

  for (const vocab of level47Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 47 complete!");

  // ============================================
  // LEVEL 48 - WaniKani Level 48
  // Kanji: 帳蚊蛇貼辱鉢闇隙霜飢餓畜迅騎蓄尽彩憶溶耐踊賢輝脅麻灯咲培悔脇遂班塗斜殴盾穫
  // ============================================

  const level48Radicals = [
    { character: "蛇", meaningFr: "Serpent", mnemonic: "L'insecte et la maison. Le SERPENT !" },
  ];

  for (const radical of level48Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 48 } },
      update: { ...radical },
      create: { ...radical, levelId: 48 },
    });
  }

  const level48Kanji = [
    { character: "帳", meaningsFr: ["Carnet", "Rideau"], readingsOn: ["チョウ"], readingsKun: [], meaningMnemonicFr: "Le tissu et le long. Le CARNET, le RIDEAU.", readingMnemonicFr: "Chou - le CARNET 'chou' !" },
    { character: "蚊", meaningsFr: ["Moustique"], readingsOn: ["ブン"], readingsKun: ["か"], meaningMnemonicFr: "L'insecte et le texte. Le MOUSTIQUE.", readingMnemonicFr: "Ka - le MOUSTIQUE 'ka' !" },
    { character: "蛇", meaningsFr: ["Serpent"], readingsOn: ["ジャ"], readingsKun: ["へび"], meaningMnemonicFr: "L'insecte et la maison. Le SERPENT.", readingMnemonicFr: "Hebi - le SERPENT 'hebi' !" },
    { character: "貼", meaningsFr: ["Coller"], readingsOn: ["チョウ"], readingsKun: ["は-る"], meaningMnemonicFr: "Le coquillage et le divination. COLLER.", readingMnemonicFr: "Haru - COLLER 'haru' !" },
    { character: "辱", meaningsFr: ["Humilier"], readingsOn: ["ジョク"], readingsKun: ["はずかし-める"], meaningMnemonicFr: "Le matin et le marque. HUMILIER.", readingMnemonicFr: "Joku - HUMILIER 'joku' !" },
    { character: "鉢", meaningsFr: ["Pot", "Bol"], readingsOn: ["ハチ"], readingsKun: [], meaningMnemonicFr: "Le métal et le racine. Le POT, le BOL.", readingMnemonicFr: "Hachi - le POT 'hachi' !" },
    { character: "闇", meaningsFr: ["Obscurité"], readingsOn: ["アン"], readingsKun: ["やみ"], meaningMnemonicFr: "La porte et le son. L'OBSCURITÉ.", readingMnemonicFr: "Yami - l'OBSCURITÉ 'yami' !" },
    { character: "隙", meaningsFr: ["Fente", "Occasion"], readingsOn: ["ゲキ"], readingsKun: ["すき"], meaningMnemonicFr: "La colline et le petit. La FENTE, l'OCCASION.", readingMnemonicFr: "Suki - la FENTE 'suki' !" },
    { character: "霜", meaningsFr: ["Givre"], readingsOn: ["ソウ"], readingsKun: ["しも"], meaningMnemonicFr: "La pluie et le mutuellement. Le GIVRE.", readingMnemonicFr: "Shimo - le GIVRE 'shimo' !" },
    { character: "飢", meaningsFr: ["Famine"], readingsOn: ["キ"], readingsKun: ["う-える"], meaningMnemonicFr: "La nourriture et le plusieurs. La FAMINE.", readingMnemonicFr: "Ki - la FAMINE 'ki' !" },
    { character: "餓", meaningsFr: ["Affamé"], readingsOn: ["ガ"], readingsKun: [], meaningMnemonicFr: "La nourriture et le je. AFFAMÉ.", readingMnemonicFr: "Ga - AFFAMÉ 'ga' !" },
    { character: "畜", meaningsFr: ["Bétail"], readingsOn: ["チク"], readingsKun: [], meaningMnemonicFr: "Le mystérieux et le rizière. Le BÉTAIL.", readingMnemonicFr: "Chiku - le BÉTAIL 'chiku' !" },
    { character: "迅", meaningsFr: ["Rapide"], readingsOn: ["ジン"], readingsKun: [], meaningMnemonicFr: "Le mouvement et le croix. RAPIDE.", readingMnemonicFr: "Jin - RAPIDE 'jin' !" },
    { character: "騎", meaningsFr: ["Monter (cheval)"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le cheval et l'étrange. MONTER à cheval.", readingMnemonicFr: "Ki - MONTER 'ki' !" },
    { character: "蓄", meaningsFr: ["Accumuler"], readingsOn: ["チク"], readingsKun: ["たくわ-える"], meaningMnemonicFr: "L'herbe et le bétail. ACCUMULER.", readingMnemonicFr: "Chiku - ACCUMULER 'chiku' !" },
    { character: "尽", meaningsFr: ["Épuiser"], readingsOn: ["ジン"], readingsKun: ["つ-きる"], meaningMnemonicFr: "Le plateau et le point. ÉPUISER.", readingMnemonicFr: "Jin - ÉPUISER 'jin' !" },
    { character: "彩", meaningsFr: ["Couleur"], readingsOn: ["サイ"], readingsKun: ["いろど-る"], meaningMnemonicFr: "Le cueillir et le poil. La COULEUR.", readingMnemonicFr: "Sai - la COULEUR 'sai' !" },
    { character: "憶", meaningsFr: ["Souvenir"], readingsOn: ["オク"], readingsKun: [], meaningMnemonicFr: "Le coeur et l'intention. Le SOUVENIR.", readingMnemonicFr: "Oku - le SOUVENIR 'oku' !" },
    { character: "溶", meaningsFr: ["Fondre"], readingsOn: ["ヨウ"], readingsKun: ["と-ける"], meaningMnemonicFr: "L'eau et la vallée. FONDRE.", readingMnemonicFr: "You - FONDRE 'you' !" },
    { character: "耐", meaningsFr: ["Endurer"], readingsOn: ["タイ"], readingsKun: ["た-える"], meaningMnemonicFr: "Le poil et le marque. ENDURER.", readingMnemonicFr: "Tai - ENDURER 'tai' !" },
    { character: "踊", meaningsFr: ["Danser"], readingsOn: ["ヨウ"], readingsKun: ["おど-る"], meaningMnemonicFr: "Le pied et le usage. DANSER.", readingMnemonicFr: "Odoru - DANSER !" },
    { character: "賢", meaningsFr: ["Sage"], readingsOn: ["ケン"], readingsKun: ["かしこ-い"], meaningMnemonicFr: "Le coquillage et le ministre. SAGE.", readingMnemonicFr: "Ken - SAGE 'ken' !" },
    { character: "輝", meaningsFr: ["Briller"], readingsOn: ["キ"], readingsKun: ["かがや-く"], meaningMnemonicFr: "Le lumière et le voiture. BRILLER.", readingMnemonicFr: "Kagayaku - BRILLER !" },
    { character: "脅", meaningsFr: ["Menacer"], readingsOn: ["キョウ"], readingsKun: ["おびや-かす"], meaningMnemonicFr: "La chair et le triple. MENACER.", readingMnemonicFr: "Kyou - MENACER 'kyou' !" },
    { character: "麻", meaningsFr: ["Chanvre"], readingsOn: ["マ"], readingsKun: ["あさ"], meaningMnemonicFr: "Le toit et l'arbre. Le CHANVRE.", readingMnemonicFr: "Ma - le CHANVRE 'ma' !" },
    { character: "灯", meaningsFr: ["Lampe"], readingsOn: ["トウ"], readingsKun: ["ひ"], meaningMnemonicFr: "Le feu et le clou. La LAMPE.", readingMnemonicFr: "Tou - la LAMPE 'tou' !" },
    { character: "咲", meaningsFr: ["Fleurir"], readingsOn: ["ショウ"], readingsKun: ["さ-く"], meaningMnemonicFr: "La bouche et le relation. FLEURIR.", readingMnemonicFr: "Saku - FLEURIR 'saku' !" },
    { character: "培", meaningsFr: ["Cultiver"], readingsOn: ["バイ"], readingsKun: ["つちか-う"], meaningMnemonicFr: "La terre et le debout. CULTIVER.", readingMnemonicFr: "Bai - CULTIVER 'bai' !" },
    { character: "悔", meaningsFr: ["Regretter"], readingsOn: ["カイ"], readingsKun: ["く-いる"], meaningMnemonicFr: "Le coeur et le chaque. REGRETTER.", readingMnemonicFr: "Kai - REGRETTER 'kai' !" },
    { character: "脇", meaningsFr: ["Côté", "Aisselle"], readingsOn: ["キョウ"], readingsKun: ["わき"], meaningMnemonicFr: "La chair et le pouvoir. Le CÔTÉ, l'AISSELLE.", readingMnemonicFr: "Waki - le CÔTÉ 'waki' !" },
    { character: "遂", meaningsFr: ["Accomplir"], readingsOn: ["スイ"], readingsKun: ["と-げる"], meaningMnemonicFr: "Le mouvement et le cochon. ACCOMPLIR.", readingMnemonicFr: "Sui - ACCOMPLIR 'sui' !" },
    { character: "班", meaningsFr: ["Groupe"], readingsOn: ["ハン"], readingsKun: [], meaningMnemonicFr: "Le roi deux fois. Le GROUPE.", readingMnemonicFr: "Han - le GROUPE 'han' !" },
    { character: "塗", meaningsFr: ["Peindre"], readingsOn: ["ト"], readingsKun: ["ぬ-る"], meaningMnemonicFr: "La terre et l'eau. PEINDRE.", readingMnemonicFr: "Nuru - PEINDRE !" },
    { character: "斜", meaningsFr: ["Oblique"], readingsOn: ["シャ"], readingsKun: ["なな-め"], meaningMnemonicFr: "Le surplus et la louche. OBLIQUE.", readingMnemonicFr: "Sha - OBLIQUE 'sha' !" },
    { character: "殴", meaningsFr: ["Frapper"], readingsOn: ["オウ"], readingsKun: ["なぐ-る"], meaningMnemonicFr: "Le frapper et l'Europe. FRAPPER.", readingMnemonicFr: "Naguru - FRAPPER !" },
    { character: "盾", meaningsFr: ["Bouclier"], readingsOn: ["ジュン"], readingsKun: ["たて"], meaningMnemonicFr: "Le dix et l'oeil. Le BOUCLIER.", readingMnemonicFr: "Tate - le BOUCLIER 'tate' !" },
    { character: "穫", meaningsFr: ["Récolte"], readingsOn: ["カク"], readingsKun: [], meaningMnemonicFr: "Le riz et le protéger. La RÉCOLTE.", readingMnemonicFr: "Kaku - la RÉCOLTE 'kaku' !" },
  ];

  for (const kanji of level48Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 48 },
      create: { ...kanji, levelId: 48 },
    });
  }

  const level48Vocab = [
    { word: "手帳", meaningsFr: ["Carnet"], readings: ["てちょう"], mnemonicFr: "Un CARNET de notes.", levelId: 48 },
    { word: "蚊", meaningsFr: ["Moustique"], readings: ["か"], mnemonicFr: "Un MOUSTIQUE ennuyeux.", levelId: 48 },
    { word: "蛇", meaningsFr: ["Serpent"], readings: ["へび"], mnemonicFr: "Un SERPENT venimeux.", levelId: 48 },
    { word: "貼る", meaningsFr: ["Coller"], readings: ["はる"], mnemonicFr: "COLLER une affiche.", levelId: 48 },
    { word: "屈辱", meaningsFr: ["Humiliation"], readings: ["くつじょく"], mnemonicFr: "Une HUMILIATION profonde.", levelId: 48 },
    { word: "植木鉢", meaningsFr: ["Pot de fleurs"], readings: ["うえきばち"], mnemonicFr: "Un POT DE FLEURS.", levelId: 48 },
    { word: "闇", meaningsFr: ["Obscurité"], readings: ["やみ"], mnemonicFr: "L'OBSCURITÉ totale.", levelId: 48 },
    { word: "隙間", meaningsFr: ["Fente"], readings: ["すきま"], mnemonicFr: "Une FENTE étroite.", levelId: 48 },
    { word: "霜", meaningsFr: ["Givre"], readings: ["しも"], mnemonicFr: "Le GIVRE du matin.", levelId: 48 },
    { word: "飢餓", meaningsFr: ["Famine"], readings: ["きが"], mnemonicFr: "La FAMINE terrible.", levelId: 48 },
    { word: "家畜", meaningsFr: ["Bétail"], readings: ["かちく"], mnemonicFr: "Le BÉTAIL de la ferme.", levelId: 48 },
    { word: "迅速", meaningsFr: ["Rapide"], readings: ["じんそく"], mnemonicFr: "Une action RAPIDE.", levelId: 48 },
    { word: "騎士", meaningsFr: ["Chevalier"], readings: ["きし"], mnemonicFr: "Un CHEVALIER noble.", levelId: 48 },
    { word: "蓄える", meaningsFr: ["Accumuler"], readings: ["たくわえる"], mnemonicFr: "ACCUMULER des richesses.", levelId: 48 },
    { word: "尽くす", meaningsFr: ["Se dévouer"], readings: ["つくす"], mnemonicFr: "SE DÉVOUER entièrement.", levelId: 48 },
    { word: "色彩", meaningsFr: ["Couleurs"], readings: ["しきさい"], mnemonicFr: "Des COULEURS vives.", levelId: 48 },
    { word: "記憶", meaningsFr: ["Mémoire"], readings: ["きおく"], mnemonicFr: "La MÉMOIRE des souvenirs.", levelId: 48 },
    { word: "溶ける", meaningsFr: ["Fondre"], readings: ["とける"], mnemonicFr: "Le chocolat FOND.", levelId: 48 },
    { word: "耐える", meaningsFr: ["Endurer"], readings: ["たえる"], mnemonicFr: "ENDURER la douleur.", levelId: 48 },
    { word: "踊る", meaningsFr: ["Danser"], readings: ["おどる"], mnemonicFr: "DANSER joyeusement.", levelId: 48 },
    { word: "賢い", meaningsFr: ["Sage"], readings: ["かしこい"], mnemonicFr: "Un enfant SAGE.", levelId: 48 },
    { word: "輝く", meaningsFr: ["Briller"], readings: ["かがやく"], mnemonicFr: "BRILLER de mille feux.", levelId: 48 },
    { word: "脅かす", meaningsFr: ["Menacer"], readings: ["おびやかす"], mnemonicFr: "MENACER l'ennemi.", levelId: 48 },
    { word: "麻", meaningsFr: ["Chanvre"], readings: ["あさ"], mnemonicFr: "Le CHANVRE naturel.", levelId: 48 },
    { word: "電灯", meaningsFr: ["Lampe électrique"], readings: ["でんとう"], mnemonicFr: "Une LAMPE ÉLECTRIQUE.", levelId: 48 },
    { word: "咲く", meaningsFr: ["Fleurir"], readings: ["さく"], mnemonicFr: "Les fleurs FLEURISSENT.", levelId: 48 },
    { word: "栽培", meaningsFr: ["Culture"], readings: ["さいばい"], mnemonicFr: "La CULTURE des plantes.", levelId: 48 },
    { word: "後悔", meaningsFr: ["Regret"], readings: ["こうかい"], mnemonicFr: "Le REGRET du passé.", levelId: 48 },
    { word: "脇", meaningsFr: ["Côté"], readings: ["わき"], mnemonicFr: "Sur le CÔTÉ.", levelId: 48 },
    { word: "遂げる", meaningsFr: ["Accomplir"], readings: ["とげる"], mnemonicFr: "ACCOMPLIR son rêve.", levelId: 48 },
    { word: "班", meaningsFr: ["Groupe"], readings: ["はん"], mnemonicFr: "Le GROUPE de travail.", levelId: 48 },
    { word: "塗る", meaningsFr: ["Peindre"], readings: ["ぬる"], mnemonicFr: "PEINDRE un mur.", levelId: 48 },
    { word: "斜め", meaningsFr: ["Oblique"], readings: ["ななめ"], mnemonicFr: "Une ligne OBLIQUE.", levelId: 48 },
    { word: "殴る", meaningsFr: ["Frapper"], readings: ["なぐる"], mnemonicFr: "FRAPPER quelqu'un.", levelId: 48 },
    { word: "盾", meaningsFr: ["Bouclier"], readings: ["たて"], mnemonicFr: "Le BOUCLIER protecteur.", levelId: 48 },
    { word: "収穫", meaningsFr: ["Récolte"], readings: ["しゅうかく"], mnemonicFr: "La RÉCOLTE d'automne.", levelId: 48 },
  ];

  for (const vocab of level48Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 48 complete!");

  // ============================================
  // LEVEL 49 - WaniKani Level 49
  // Kanji: 駒紫抽誓悟拓拘礎鶴刈剛唯壇尼概浸淡煮覆謀陶隔征陛俗桑潤珠衰奨劣勘妃慌蹴
  // ============================================

  const level49Radicals = [
    { character: "鶴", meaningFr: "Grue", mnemonic: "L'oiseau et le crier. La GRUE majestueuse !" },
  ];

  for (const radical of level49Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 49 } },
      update: { ...radical },
      create: { ...radical, levelId: 49 },
    });
  }

  const level49Kanji = [
    { character: "駒", meaningsFr: ["Poulain", "Pièce"], readingsOn: ["ク"], readingsKun: ["こま"], meaningMnemonicFr: "Le cheval et le phrase. Le POULAIN, la PIÈCE.", readingMnemonicFr: "Koma - le POULAIN 'koma' !" },
    { character: "紫", meaningsFr: ["Violet"], readingsOn: ["シ"], readingsKun: ["むらさき"], meaningMnemonicFr: "Le fil et le arrêter. VIOLET.", readingMnemonicFr: "Murasaki - VIOLET !" },
    { character: "抽", meaningsFr: ["Extraire"], readingsOn: ["チュウ"], readingsKun: [], meaningMnemonicFr: "La main et le cause. EXTRAIRE.", readingMnemonicFr: "Chuu - EXTRAIRE 'chuu' !" },
    { character: "誓", meaningsFr: ["Serment"], readingsOn: ["セイ"], readingsKun: ["ちか-う"], meaningMnemonicFr: "La parole et le briser. Le SERMENT.", readingMnemonicFr: "Sei - le SERMENT 'sei' !" },
    { character: "悟", meaningsFr: ["Comprendre"], readingsOn: ["ゴ"], readingsKun: ["さと-る"], meaningMnemonicFr: "Le coeur et le je. COMPRENDRE, s'éveiller.", readingMnemonicFr: "Go - COMPRENDRE 'go' !" },
    { character: "拓", meaningsFr: ["Défricher"], readingsOn: ["タク"], readingsKun: [], meaningMnemonicFr: "La main et la pierre. DÉFRICHER.", readingMnemonicFr: "Taku - DÉFRICHER 'taku' !" },
    { character: "拘", meaningsFr: ["Détenir"], readingsOn: ["コウ"], readingsKun: ["かか-わる"], meaningMnemonicFr: "La main et le phrase. DÉTENIR.", readingMnemonicFr: "Kou - DÉTENIR 'kou' !" },
    { character: "礎", meaningsFr: ["Fondation"], readingsOn: ["ソ"], readingsKun: ["いしずえ"], meaningMnemonicFr: "La pierre et le Chu. La FONDATION.", readingMnemonicFr: "So - la FONDATION 'so' !" },
    { character: "鶴", meaningsFr: ["Grue"], readingsOn: ["カク"], readingsKun: ["つる"], meaningMnemonicFr: "L'oiseau et le crier. La GRUE.", readingMnemonicFr: "Tsuru - la GRUE 'tsuru' !" },
    { character: "刈", meaningsFr: ["Faucher"], readingsOn: ["ガイ"], readingsKun: ["か-る"], meaningMnemonicFr: "Le sabre et la croix. FAUCHER.", readingMnemonicFr: "Karu - FAUCHER 'karu' !" },
    { character: "剛", meaningsFr: ["Fort", "Rigide"], readingsOn: ["ゴウ"], readingsKun: [], meaningMnemonicFr: "Le montagne et le sabre. FORT, RIGIDE.", readingMnemonicFr: "Gou - FORT 'gou' !" },
    { character: "唯", meaningsFr: ["Seulement"], readingsOn: ["ユイ"], readingsKun: ["ただ"], meaningMnemonicFr: "La bouche et l'oiseau. SEULEMENT.", readingMnemonicFr: "Yui - SEULEMENT 'yui' !" },
    { character: "壇", meaningsFr: ["Estrade"], readingsOn: ["ダン"], readingsKun: [], meaningMnemonicFr: "La terre et le matin. L'ESTRADE.", readingMnemonicFr: "Dan - l'ESTRADE 'dan' !" },
    { character: "尼", meaningsFr: ["Nonne"], readingsOn: ["ニ"], readingsKun: ["あま"], meaningMnemonicFr: "Le toit et le accroupi. La NONNE.", readingMnemonicFr: "Ni - la NONNE 'ni' !" },
    { character: "概", meaningsFr: ["Approximatif"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le existant. APPROXIMATIF.", readingMnemonicFr: "Gai - APPROXIMATIF 'gai' !" },
    { character: "浸", meaningsFr: ["Tremper"], readingsOn: ["シン"], readingsKun: ["ひた-す"], meaningMnemonicFr: "L'eau et le balai. TREMPER.", readingMnemonicFr: "Shin - TREMPER 'shin' !" },
    { character: "淡", meaningsFr: ["Pâle", "Léger"], readingsOn: ["タン"], readingsKun: ["あわ-い"], meaningMnemonicFr: "L'eau et le flamme. PÂLE, LÉGER.", readingMnemonicFr: "Tan - PÂLE 'tan' !" },
    { character: "煮", meaningsFr: ["Bouillir"], readingsOn: ["シャ"], readingsKun: ["に-る"], meaningMnemonicFr: "Le feu et le serviteur. BOUILLIR.", readingMnemonicFr: "Niru - BOUILLIR !" },
    { character: "覆", meaningsFr: ["Couvrir"], readingsOn: ["フク"], readingsKun: ["おお-う"], meaningMnemonicFr: "Le ouest et le retour. COUVRIR.", readingMnemonicFr: "Fuku - COUVRIR 'fuku' !" },
    { character: "謀", meaningsFr: ["Complot"], readingsOn: ["ボウ"], readingsKun: ["はか-る"], meaningMnemonicFr: "La parole et le certain. Le COMPLOT.", readingMnemonicFr: "Bou - le COMPLOT 'bou' !" },
    { character: "陶", meaningsFr: ["Poterie"], readingsOn: ["トウ"], readingsKun: [], meaningMnemonicFr: "La colline et le envelopper. La POTERIE.", readingMnemonicFr: "Tou - la POTERIE 'tou' !" },
    { character: "隔", meaningsFr: ["Séparer"], readingsOn: ["カク"], readingsKun: ["へだ-てる"], meaningMnemonicFr: "La colline et le haut. SÉPARER.", readingMnemonicFr: "Kaku - SÉPARER 'kaku' !" },
    { character: "征", meaningsFr: ["Conquérir"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "Le pas et le correct. CONQUÉRIR.", readingMnemonicFr: "Sei - CONQUÉRIR 'sei' !" },
    { character: "陛", meaningsFr: ["Majesté"], readingsOn: ["ヘイ"], readingsKun: [], meaningMnemonicFr: "La colline et le comparer. MAJESTÉ.", readingMnemonicFr: "Hei - MAJESTÉ 'hei' !" },
    { character: "俗", meaningsFr: ["Vulgaire", "Populaire"], readingsOn: ["ゾク"], readingsKun: [], meaningMnemonicFr: "La personne et la vallée. VULGAIRE, POPULAIRE.", readingMnemonicFr: "Zoku - POPULAIRE 'zoku' !" },
    { character: "桑", meaningsFr: ["Mûrier"], readingsOn: ["ソウ"], readingsKun: ["くわ"], meaningMnemonicFr: "Les mains et l'arbre. Le MÛRIER.", readingMnemonicFr: "Kuwa - le MÛRIER 'kuwa' !" },
    { character: "潤", meaningsFr: ["Humidifier"], readingsOn: ["ジュン"], readingsKun: ["うるお-う"], meaningMnemonicFr: "L'eau et le porte. HUMIDIFIER.", readingMnemonicFr: "Jun - HUMIDIFIER 'jun' !" },
    { character: "珠", meaningsFr: ["Perle"], readingsOn: ["シュ"], readingsKun: ["たま"], meaningMnemonicFr: "Le roi et le vermillon. La PERLE.", readingMnemonicFr: "Shu - la PERLE 'shu' !" },
    { character: "衰", meaningsFr: ["Décliner"], readingsOn: ["スイ"], readingsKun: ["おとろ-える"], meaningMnemonicFr: "Le vêtement et le centre. DÉCLINER.", readingMnemonicFr: "Sui - DÉCLINER 'sui' !" },
    { character: "奨", meaningsFr: ["Encourager"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Le grand et le bois. ENCOURAGER.", readingMnemonicFr: "Shou - ENCOURAGER 'shou' !" },
    { character: "劣", meaningsFr: ["Inférieur"], readingsOn: ["レツ"], readingsKun: ["おと-る"], meaningMnemonicFr: "Le petit et la force. INFÉRIEUR.", readingMnemonicFr: "Retsu - INFÉRIEUR 'retsu' !" },
    { character: "勘", meaningsFr: ["Intuition"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le certain et la force. L'INTUITION.", readingMnemonicFr: "Kan - l'INTUITION 'kan' !" },
    { character: "妃", meaningsFr: ["Princesse consort"], readingsOn: ["ヒ"], readingsKun: [], meaningMnemonicFr: "La femme et le soi-même. La PRINCESSE CONSORT.", readingMnemonicFr: "Hi - la PRINCESSE 'hi' !" },
    { character: "慌", meaningsFr: ["Se précipiter"], readingsOn: ["コウ"], readingsKun: ["あわ-てる"], meaningMnemonicFr: "Le coeur et le sauvage. SE PRÉCIPITER.", readingMnemonicFr: "Awateru - SE PRÉCIPITER !" },
    { character: "蹴", meaningsFr: ["Donner un coup de pied"], readingsOn: ["シュウ"], readingsKun: ["け-る"], meaningMnemonicFr: "Le pied et le terminer. DONNER UN COUP DE PIED.", readingMnemonicFr: "Keru - DONNER UN COUP !" },
  ];

  for (const kanji of level49Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 49 },
      create: { ...kanji, levelId: 49 },
    });
  }

  const level49Vocab = [
    { word: "駒", meaningsFr: ["Pièce de shogi"], readings: ["こま"], mnemonicFr: "Une PIÈCE DE SHOGI.", levelId: 49 },
    { word: "紫", meaningsFr: ["Violet"], readings: ["むらさき"], mnemonicFr: "La couleur VIOLETTE.", levelId: 49 },
    { word: "抽象", meaningsFr: ["Abstrait"], readings: ["ちゅうしょう"], mnemonicFr: "Un concept ABSTRAIT.", levelId: 49 },
    { word: "誓う", meaningsFr: ["Jurer"], readings: ["ちかう"], mnemonicFr: "JURER fidélité.", levelId: 49 },
    { word: "悟る", meaningsFr: ["Réaliser"], readings: ["さとる"], mnemonicFr: "RÉALISER la vérité.", levelId: 49 },
    { word: "開拓", meaningsFr: ["Défricher"], readings: ["かいたく"], mnemonicFr: "DÉFRICHER de nouvelles terres.", levelId: 49 },
    { word: "拘束", meaningsFr: ["Contrainte"], readings: ["こうそく"], mnemonicFr: "Une CONTRAINTE légale.", levelId: 49 },
    { word: "基礎", meaningsFr: ["Fondation"], readings: ["きそ"], mnemonicFr: "La FONDATION solide.", levelId: 49 },
    { word: "鶴", meaningsFr: ["Grue"], readings: ["つる"], mnemonicFr: "La GRUE élégante.", levelId: 49 },
    { word: "刈る", meaningsFr: ["Faucher"], readings: ["かる"], mnemonicFr: "FAUCHER l'herbe.", levelId: 49 },
    { word: "剛力", meaningsFr: ["Force"], readings: ["ごうりき"], mnemonicFr: "Une grande FORCE.", levelId: 49 },
    { word: "唯一", meaningsFr: ["Unique"], readings: ["ゆいいつ"], mnemonicFr: "Le seul et UNIQUE.", levelId: 49 },
    { word: "壇", meaningsFr: ["Estrade"], readings: ["だん"], mnemonicFr: "L'ESTRADE du temple.", levelId: 49 },
    { word: "尼", meaningsFr: ["Nonne"], readings: ["あま"], mnemonicFr: "Une NONNE bouddhiste.", levelId: 49 },
    { word: "概念", meaningsFr: ["Concept"], readings: ["がいねん"], mnemonicFr: "Un CONCEPT abstrait.", levelId: 49 },
    { word: "浸す", meaningsFr: ["Tremper"], readings: ["ひたす"], mnemonicFr: "TREMPER dans l'eau.", levelId: 49 },
    { word: "淡い", meaningsFr: ["Pâle"], readings: ["あわい"], mnemonicFr: "Une couleur PÂLE.", levelId: 49 },
    { word: "煮る", meaningsFr: ["Bouillir"], readings: ["にる"], mnemonicFr: "FAIRE BOUILLIR les légumes.", levelId: 49 },
    { word: "覆う", meaningsFr: ["Couvrir"], readings: ["おおう"], mnemonicFr: "COUVRIR de neige.", levelId: 49 },
    { word: "陰謀", meaningsFr: ["Complot"], readings: ["いんぼう"], mnemonicFr: "Un COMPLOT secret.", levelId: 49 },
    { word: "陶器", meaningsFr: ["Poterie"], readings: ["とうき"], mnemonicFr: "De la POTERIE japonaise.", levelId: 49 },
    { word: "隔てる", meaningsFr: ["Séparer"], readings: ["へだてる"], mnemonicFr: "SÉPARER par un mur.", levelId: 49 },
    { word: "遠征", meaningsFr: ["Expédition"], readings: ["えんせい"], mnemonicFr: "Une EXPÉDITION lointaine.", levelId: 49 },
    { word: "陛下", meaningsFr: ["Sa Majesté"], readings: ["へいか"], mnemonicFr: "SA MAJESTÉ l'empereur.", levelId: 49 },
    { word: "風俗", meaningsFr: ["Coutumes"], readings: ["ふうぞく"], mnemonicFr: "Les COUTUMES locales.", levelId: 49 },
    { word: "潤う", meaningsFr: ["S'humidifier"], readings: ["うるおう"], mnemonicFr: "La peau S'HUMIDIFIE.", levelId: 49 },
    { word: "真珠", meaningsFr: ["Perle"], readings: ["しんじゅ"], mnemonicFr: "Une PERLE précieuse.", levelId: 49 },
    { word: "衰える", meaningsFr: ["Décliner"], readings: ["おとろえる"], mnemonicFr: "Les forces DÉCLINENT.", levelId: 49 },
    { word: "奨学金", meaningsFr: ["Bourse"], readings: ["しょうがくきん"], mnemonicFr: "Une BOURSE d'études.", levelId: 49 },
    { word: "劣る", meaningsFr: ["Être inférieur"], readings: ["おとる"], mnemonicFr: "ÊTRE INFÉRIEUR en qualité.", levelId: 49 },
    { word: "勘", meaningsFr: ["Intuition"], readings: ["かん"], mnemonicFr: "Avoir de l'INTUITION.", levelId: 49 },
    { word: "王妃", meaningsFr: ["Reine"], readings: ["おうひ"], mnemonicFr: "La REINE du royaume.", levelId: 49 },
    { word: "慌てる", meaningsFr: ["Se précipiter"], readings: ["あわてる"], mnemonicFr: "SE PRÉCIPITER.", levelId: 49 },
    { word: "蹴る", meaningsFr: ["Donner un coup de pied"], readings: ["ける"], mnemonicFr: "DONNER UN COUP DE PIED.", levelId: 49 },
  ];

  for (const vocab of level49Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 49 complete!");

  // ============================================
  // LEVEL 50 - WaniKani Level 50
  // Kanji: 峰巧邪駄唐廷鬱鰐蟹簿彰漫訂諮銘堰堤漂翻軌后奮亭仰伯偶淀墳壮把搬晶洞涯疫
  // ============================================

  const level50Radicals = [
    { character: "鰐", meaningFr: "Crocodile", mnemonic: "Le poisson et le mal. Le CROCODILE !" },
    { character: "蟹", meaningFr: "Crabe", mnemonic: "L'insecte et le résoudre. Le CRABE !" },
  ];

  for (const radical of level50Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 50 } },
      update: { ...radical },
      create: { ...radical, levelId: 50 },
    });
  }

  const level50Kanji = [
    { character: "峰", meaningsFr: ["Pic", "Sommet"], readingsOn: ["ホウ"], readingsKun: ["みね"], meaningMnemonicFr: "La montagne et le rencontrer. Le PIC, le SOMMET.", readingMnemonicFr: "Mine - le PIC 'mine' !" },
    { character: "巧", meaningsFr: ["Habile"], readingsOn: ["コウ"], readingsKun: ["たく-み"], meaningMnemonicFr: "Le travail et le nombre. HABILE.", readingMnemonicFr: "Kou - HABILE 'kou' !" },
    { character: "邪", meaningsFr: ["Mal", "Mauvais"], readingsOn: ["ジャ"], readingsKun: [], meaningMnemonicFr: "Le dent et la ville. MAL, MAUVAIS.", readingMnemonicFr: "Ja - MAL 'ja' !" },
    { character: "駄", meaningsFr: ["Inutile"], readingsOn: ["ダ"], readingsKun: [], meaningMnemonicFr: "Le cheval et le grand. INUTILE.", readingMnemonicFr: "Da - INUTILE 'da' !" },
    { character: "唐", meaningsFr: ["Chine Tang"], readingsOn: ["トウ"], readingsKun: ["から"], meaningMnemonicFr: "Le toit et la bouche. CHINE TANG.", readingMnemonicFr: "Tou - TANG 'tou' !" },
    { character: "廷", meaningsFr: ["Cour impériale"], readingsOn: ["テイ"], readingsKun: [], meaningMnemonicFr: "Le toit et le roi. La COUR IMPÉRIALE.", readingMnemonicFr: "Tei - la COUR 'tei' !" },
    { character: "鬱", meaningsFr: ["Dépression"], readingsOn: ["ウツ"], readingsKun: [], meaningMnemonicFr: "L'arbre dense. La DÉPRESSION.", readingMnemonicFr: "Utsu - la DÉPRESSION 'utsu' !" },
    { character: "鰐", meaningsFr: ["Crocodile"], readingsOn: ["ガク"], readingsKun: ["わに"], meaningMnemonicFr: "Le poisson et le mal. Le CROCODILE.", readingMnemonicFr: "Wani - le CROCODILE 'wani' !" },
    { character: "蟹", meaningsFr: ["Crabe"], readingsOn: ["カイ"], readingsKun: ["かに"], meaningMnemonicFr: "L'insecte et le résoudre. Le CRABE.", readingMnemonicFr: "Kani - le CRABE 'kani' !" },
    { character: "簿", meaningsFr: ["Registre"], readingsOn: ["ボ"], readingsKun: [], meaningMnemonicFr: "Le bambou et le étendre. Le REGISTRE.", readingMnemonicFr: "Bo - le REGISTRE 'bo' !" },
    { character: "彰", meaningsFr: ["Manifeste"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Le poil et le chapitre. MANIFESTE.", readingMnemonicFr: "Shou - MANIFESTE 'shou' !" },
    { character: "漫", meaningsFr: ["Lent", "Manga"], readingsOn: ["マン"], readingsKun: [], meaningMnemonicFr: "L'eau et l'étendre. LENT, MANGA.", readingMnemonicFr: "Man - MANGA 'man' !" },
    { character: "訂", meaningsFr: ["Corriger"], readingsOn: ["テイ"], readingsKun: [], meaningMnemonicFr: "La parole et le clou. CORRIGER.", readingMnemonicFr: "Tei - CORRIGER 'tei' !" },
    { character: "諮", meaningsFr: ["Consulter"], readingsOn: ["シ"], readingsKun: ["はか-る"], meaningMnemonicFr: "La parole et le arranger. CONSULTER.", readingMnemonicFr: "Shi - CONSULTER 'shi' !" },
    { character: "銘", meaningsFr: ["Inscription"], readingsOn: ["メイ"], readingsKun: [], meaningMnemonicFr: "Le métal et le nom. L'INSCRIPTION.", readingMnemonicFr: "Mei - l'INSCRIPTION 'mei' !" },
    { character: "堰", meaningsFr: ["Barrage"], readingsOn: ["エン"], readingsKun: ["せき"], meaningMnemonicFr: "La terre et le rayer. Le BARRAGE.", readingMnemonicFr: "Seki - le BARRAGE 'seki' !" },
    { character: "堤", meaningsFr: ["Digue"], readingsOn: ["テイ"], readingsKun: ["つつみ"], meaningMnemonicFr: "La terre et le être. La DIGUE.", readingMnemonicFr: "Tei - la DIGUE 'tei' !" },
    { character: "漂", meaningsFr: ["Flotter"], readingsOn: ["ヒョウ"], readingsKun: ["ただよ-う"], meaningMnemonicFr: "L'eau et le billet. FLOTTER.", readingMnemonicFr: "Hyou - FLOTTER 'hyou' !" },
    { character: "翻", meaningsFr: ["Traduire", "Retourner"], readingsOn: ["ホン"], readingsKun: ["ひるがえ-る"], meaningMnemonicFr: "L'aile et le riz. TRADUIRE, RETOURNER.", readingMnemonicFr: "Hon - TRADUIRE 'hon' !" },
    { character: "軌", meaningsFr: ["Rail", "Voie"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "La voiture et le neuf. Le RAIL, la VOIE.", readingMnemonicFr: "Ki - le RAIL 'ki' !" },
    { character: "后", meaningsFr: ["Impératrice"], readingsOn: ["コウ"], readingsKun: ["きさき"], meaningMnemonicFr: "Le toit et la bouche. L'IMPÉRATRICE.", readingMnemonicFr: "Kou - l'IMPÉRATRICE 'kou' !" },
    { character: "奮", meaningsFr: ["S'efforcer"], readingsOn: ["フン"], readingsKun: ["ふる-う"], meaningMnemonicFr: "Le grand et l'oiseau. S'EFFORCER.", readingMnemonicFr: "Fun - S'EFFORCER 'fun' !" },
    { character: "亭", meaningsFr: ["Pavillon"], readingsOn: ["テイ"], readingsKun: [], meaningMnemonicFr: "Le toit et le clou. Le PAVILLON.", readingMnemonicFr: "Tei - le PAVILLON 'tei' !" },
    { character: "仰", meaningsFr: ["Lever la tête"], readingsOn: ["ギョウ"], readingsKun: ["あお-ぐ"], meaningMnemonicFr: "La personne et le sommet. LEVER LA TÊTE.", readingMnemonicFr: "Aogu - LEVER LA TÊTE !" },
    { character: "伯", meaningsFr: ["Comte"], readingsOn: ["ハク"], readingsKun: [], meaningMnemonicFr: "La personne et le blanc. Le COMTE.", readingMnemonicFr: "Haku - le COMTE 'haku' !" },
    { character: "偶", meaningsFr: ["Paire", "Accidentellement"], readingsOn: ["グウ"], readingsKun: ["たま"], meaningMnemonicFr: "La personne et le rencontrer. PAIRE, ACCIDENTELLEMENT.", readingMnemonicFr: "Guu - PAIRE 'guu' !" },
    { character: "淀", meaningsFr: ["Stagnant"], readingsOn: ["テン"], readingsKun: ["よど-む"], meaningMnemonicFr: "L'eau et le fixer. STAGNANT.", readingMnemonicFr: "Yodomu - STAGNANT !" },
    { character: "墳", meaningsFr: ["Tombe"], readingsOn: ["フン"], readingsKun: [], meaningMnemonicFr: "La terre et le séparer. La TOMBE.", readingMnemonicFr: "Fun - la TOMBE 'fun' !" },
    { character: "壮", meaningsFr: ["Robuste"], readingsOn: ["ソウ"], readingsKun: [], meaningMnemonicFr: "Le samouraï et le grand. ROBUSTE.", readingMnemonicFr: "Sou - ROBUSTE 'sou' !" },
    { character: "把", meaningsFr: ["Saisir"], readingsOn: ["ハ"], readingsKun: [], meaningMnemonicFr: "La main et le serpent. SAISIR.", readingMnemonicFr: "Ha - SAISIR 'ha' !" },
    { character: "搬", meaningsFr: ["Transporter"], readingsOn: ["ハン"], readingsKun: [], meaningMnemonicFr: "La main et le général. TRANSPORTER.", readingMnemonicFr: "Han - TRANSPORTER 'han' !" },
    { character: "晶", meaningsFr: ["Cristal"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Trois soleils. Le CRISTAL.", readingMnemonicFr: "Shou - le CRISTAL 'shou' !" },
    { character: "洞", meaningsFr: ["Grotte"], readingsOn: ["ドウ"], readingsKun: ["ほら"], meaningMnemonicFr: "L'eau et le même. La GROTTE.", readingMnemonicFr: "Dou - la GROTTE 'dou' !" },
    { character: "涯", meaningsFr: ["Limite", "Rivage"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "L'eau et le bord. La LIMITE, le RIVAGE.", readingMnemonicFr: "Gai - la LIMITE 'gai' !" },
    { character: "疫", meaningsFr: ["Épidémie"], readingsOn: ["エキ"], readingsKun: [], meaningMnemonicFr: "La maladie et le frapper. L'ÉPIDÉMIE.", readingMnemonicFr: "Eki - l'ÉPIDÉMIE 'eki' !" },
  ];

  for (const kanji of level50Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 50 },
      create: { ...kanji, levelId: 50 },
    });
  }

  const level50Vocab = [
    { word: "峰", meaningsFr: ["Pic"], readings: ["みね"], mnemonicFr: "Le PIC de la montagne.", levelId: 50 },
    { word: "巧み", meaningsFr: ["Habile"], readings: ["たくみ"], mnemonicFr: "Un travail HABILE.", levelId: 50 },
    { word: "邪魔", meaningsFr: ["Obstacle"], readings: ["じゃま"], mnemonicFr: "Un OBSTACLE gênant.", levelId: 50 },
    { word: "無駄", meaningsFr: ["Inutile"], readings: ["むだ"], mnemonicFr: "Un effort INUTILE.", levelId: 50 },
    { word: "唐辛子", meaningsFr: ["Piment"], readings: ["とうがらし"], mnemonicFr: "Du PIMENT rouge.", levelId: 50 },
    { word: "宮廷", meaningsFr: ["Cour impériale"], readings: ["きゅうてい"], mnemonicFr: "La COUR IMPÉRIALE.", levelId: 50 },
    { word: "鬱", meaningsFr: ["Dépression"], readings: ["うつ"], mnemonicFr: "La DÉPRESSION profonde.", levelId: 50 },
    { word: "鰐", meaningsFr: ["Crocodile"], readings: ["わに"], mnemonicFr: "Le CROCODILE du Nil.", levelId: 50 },
    { word: "蟹", meaningsFr: ["Crabe"], readings: ["かに"], mnemonicFr: "Un CRABE de mer.", levelId: 50 },
    { word: "帳簿", meaningsFr: ["Registre"], readings: ["ちょうぼ"], mnemonicFr: "Le REGISTRE comptable.", levelId: 50 },
    { word: "表彰", meaningsFr: ["Récompense"], readings: ["ひょうしょう"], mnemonicFr: "Une RÉCOMPENSE honorifique.", levelId: 50 },
    { word: "漫画", meaningsFr: ["Manga"], readings: ["まんが"], mnemonicFr: "Un MANGA japonais.", levelId: 50 },
    { word: "改訂", meaningsFr: ["Révision"], readings: ["かいてい"], mnemonicFr: "Une RÉVISION du texte.", levelId: 50 },
    { word: "諮問", meaningsFr: ["Consultation"], readings: ["しもん"], mnemonicFr: "Une CONSULTATION officielle.", levelId: 50 },
    { word: "銘柄", meaningsFr: ["Marque"], readings: ["めいがら"], mnemonicFr: "Une MARQUE célèbre.", levelId: 50 },
    { word: "堤防", meaningsFr: ["Digue"], readings: ["ていぼう"], mnemonicFr: "Une DIGUE protectrice.", levelId: 50 },
    { word: "漂う", meaningsFr: ["Flotter"], readings: ["ただよう"], mnemonicFr: "FLOTTER sur l'eau.", levelId: 50 },
    { word: "翻訳", meaningsFr: ["Traduction"], readings: ["ほんやく"], mnemonicFr: "Une TRADUCTION exacte.", levelId: 50 },
    { word: "軌道", meaningsFr: ["Orbite"], readings: ["きどう"], mnemonicFr: "L'ORBITE de la planète.", levelId: 50 },
    { word: "皇后", meaningsFr: ["Impératrice"], readings: ["こうごう"], mnemonicFr: "L'IMPÉRATRICE du Japon.", levelId: 50 },
    { word: "奮闘", meaningsFr: ["Lutte"], readings: ["ふんとう"], mnemonicFr: "Une LUTTE acharnée.", levelId: 50 },
    { word: "仰ぐ", meaningsFr: ["Lever les yeux"], readings: ["あおぐ"], mnemonicFr: "LEVER LES YEUX au ciel.", levelId: 50 },
    { word: "伯父", meaningsFr: ["Oncle"], readings: ["おじ"], mnemonicFr: "L'ONCLE paternel.", levelId: 50 },
    { word: "偶然", meaningsFr: ["Par hasard"], readings: ["ぐうぜん"], mnemonicFr: "PAR HASARD.", levelId: 50 },
    { word: "古墳", meaningsFr: ["Tumulus"], readings: ["こふん"], mnemonicFr: "Un ancien TUMULUS.", levelId: 50 },
    { word: "壮大", meaningsFr: ["Grandiose"], readings: ["そうだい"], mnemonicFr: "Un projet GRANDIOSE.", levelId: 50 },
    { word: "把握", meaningsFr: ["Saisir"], readings: ["はあく"], mnemonicFr: "SAISIR la situation.", levelId: 50 },
    { word: "運搬", meaningsFr: ["Transport"], readings: ["うんぱん"], mnemonicFr: "Le TRANSPORT des marchandises.", levelId: 50 },
    { word: "結晶", meaningsFr: ["Cristal"], readings: ["けっしょう"], mnemonicFr: "Un CRISTAL de glace.", levelId: 50 },
    { word: "洞窟", meaningsFr: ["Grotte"], readings: ["どうくつ"], mnemonicFr: "Une GROTTE sombre.", levelId: 50 },
    { word: "生涯", meaningsFr: ["Vie entière"], readings: ["しょうがい"], mnemonicFr: "La VIE ENTIÈRE.", levelId: 50 },
    { word: "疫病", meaningsFr: ["Épidémie"], readings: ["えきびょう"], mnemonicFr: "Une ÉPIDÉMIE mortelle.", levelId: 50 },
  ];

  for (const vocab of level50Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 50 complete!");
  console.log("All levels 41-50 seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
