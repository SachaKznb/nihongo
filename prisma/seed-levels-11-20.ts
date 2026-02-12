import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding levels 11-20 (WaniKani methodology)...");

  // Create levels 11-20
  for (let i = 11; i <= 20; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  // ============================================
  // LEVEL 11 - WaniKani Level 11
  // Kanji: 争仲伝共好成老位低初別利努労命岸放昔波注育拾指洋神秒級追戦競良功特便働令意味
  // ============================================

  const level11Radicals = [
    {
      character: "爪",
      meaningFr: "Griffe",
      mnemonic: "Les trois traits en haut ressemblent à une GRIFFE d'animal. Un chat qui montre ses GRIFFES acérées !"
    },
    {
      character: "争",
      meaningFr: "Conflit",
      mnemonic: "Une main qui attrape quelque chose en haut, c'est un CONFLIT pour s'emparer d'un objet !"
    },
    {
      character: "兆",
      meaningFr: "Signe",
      mnemonic: "Deux personnes qui courent de chaque côté, c'est un SIGNE que quelque chose va arriver !"
    },
    {
      character: "令",
      meaningFr: "Ordre",
      mnemonic: "Un toit avec une personne qui donne des ORDRES en dessous. L'autorité qui commande !"
    },
    {
      character: "印",
      meaningFr: "Sceau",
      mnemonic: "Une main qui tient un SCEAU pour marquer les documents officiels. Tamponné !"
    },
    {
      character: "卵",
      meaningFr: "Oeuf",
      mnemonic: "Deux OEUFS côte à côte dans leur coquille. Le petit-déjeuner japonais !"
    },
  ];

  for (const radical of level11Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 11 } },
      update: { ...radical },
      create: { ...radical, levelId: 11 },
    });
  }

  const level11Kanji = [
    {
      character: "争",
      meaningsFr: ["Conflit", "Disputer"],
      readingsOn: ["ソウ"],
      readingsKun: ["あらそ-う"],
      meaningMnemonicFr: "Une main qui attrape quelque chose que quelqu'un d'autre veut. C'est un CONFLIT, une DISPUTE pour possession !",
      readingMnemonicFr: "Arasou - 'Ah, raison' - ils se DISPUTENT pour savoir qui a raison !",
    },
    {
      character: "仲",
      meaningsFr: ["Relation", "Intermédiaire"],
      readingsOn: ["チュウ"],
      readingsKun: ["なか"],
      meaningMnemonicFr: "Une personne au milieu - c'est l'INTERMÉDIAIRE, celui qui gère les RELATIONS entre les gens.",
      readingMnemonicFr: "Naka - comme 'milieu' en japonais. Au milieu des RELATIONS !",
    },
    {
      character: "伝",
      meaningsFr: ["Transmettre", "Tradition"],
      readingsOn: ["デン"],
      readingsKun: ["つた-える", "つた-わる"],
      meaningMnemonicFr: "Une personne qui passe quelque chose. TRANSMETTRE un message, une TRADITION de génération en génération.",
      readingMnemonicFr: "Tsutaeru - tu TRANSMETS le message à travers le temps !",
    },
    {
      character: "共",
      meaningsFr: ["Ensemble", "Commun"],
      readingsOn: ["キョウ"],
      readingsKun: ["とも"],
      meaningMnemonicFr: "Deux mains qui portent quelque chose ENSEMBLE. Travail COMMUN, effort PARTAGÉ.",
      readingMnemonicFr: "Tomo - comme 'tomodachi' (ami). Les amis font les choses ENSEMBLE !",
    },
    {
      character: "好",
      meaningsFr: ["Aimer", "Bon"],
      readingsOn: ["コウ"],
      readingsKun: ["す-き", "この-む"],
      meaningMnemonicFr: "Une femme et un enfant - l'amour maternel ! AIMER quelque chose ou quelqu'un.",
      readingMnemonicFr: "Suki - 'Su, qui?' Qui AIMES-tu ? J'AIME ça !",
    },
    {
      character: "成",
      meaningsFr: ["Devenir", "Accomplir"],
      readingsOn: ["セイ"],
      readingsKun: ["な-る", "な-す"],
      meaningMnemonicFr: "La lance qui atteint son but. DEVENIR ce qu'on veut être, ACCOMPLIR ses objectifs !",
      readingMnemonicFr: "Naru - tu DEVIENS quelqu'un de nouveau !",
    },
    {
      character: "老",
      meaningsFr: ["Vieux", "Âgé"],
      readingsOn: ["ロウ"],
      readingsKun: ["お-いる", "ふ-ける"],
      meaningMnemonicFr: "Une personne avec une canne qui se courbe. Devenir VIEUX, être ÂGÉ avec sagesse.",
      readingMnemonicFr: "Oiru - 'Oh, iru' (être) - tu ES devenu VIEUX !",
    },
    {
      character: "位",
      meaningsFr: ["Rang", "Position"],
      readingsOn: ["イ"],
      readingsKun: ["くらい"],
      meaningMnemonicFr: "Une personne qui se tient debout à sa POSITION. Le RANG dans la hiérarchie.",
      readingMnemonicFr: "Kurai - quelle est ta POSITION dans le classement ?",
    },
    {
      character: "低",
      meaningsFr: ["Bas", "Court"],
      readingsOn: ["テイ"],
      readingsKun: ["ひく-い"],
      meaningMnemonicFr: "Une personne qui se baisse. C'est BAS, c'est petit, c'est COURT en hauteur.",
      readingMnemonicFr: "Hikui - 'Hi, qui est BAS ?' C'est lui !",
    },
    {
      character: "初",
      meaningsFr: ["Premier", "Début"],
      readingsOn: ["ショ"],
      readingsKun: ["はじ-め", "はつ"],
      meaningMnemonicFr: "Le vêtement et le couteau - on coupe le tissu pour la PREMIÈRE fois. Le DÉBUT d'une création !",
      readingMnemonicFr: "Hajime - c'est le DÉBUT, la PREMIÈRE fois !",
    },
    {
      character: "別",
      meaningsFr: ["Séparé", "Différent"],
      readingsOn: ["ベツ"],
      readingsKun: ["わか-れる"],
      meaningMnemonicFr: "Un couteau qui SÉPARE les choses. C'est DIFFÉRENT, c'est à part.",
      readingMnemonicFr: "Wakareru - on se SÉPARE, on dit au revoir !",
    },
    {
      character: "利",
      meaningsFr: ["Profit", "Avantage"],
      readingsOn: ["リ"],
      readingsKun: ["き-く"],
      meaningMnemonicFr: "Le riz et le couteau - couper le riz pour faire du PROFIT. L'AVANTAGE économique !",
      readingMnemonicFr: "Ri - le PROFIT, c'est 'ri'che !",
    },
    {
      character: "努",
      meaningsFr: ["Effort"],
      readingsOn: ["ド"],
      readingsKun: ["つと-める"],
      meaningMnemonicFr: "La femme et la force sous un esclave. L'EFFORT intense qu'on fait pour réussir !",
      readingMnemonicFr: "Tsutomeru - faire des EFFORTS constants !",
    },
    {
      character: "労",
      meaningsFr: ["Travail", "Labeur"],
      readingsOn: ["ロウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le feu sur les bras qui travaillent. Le LABEUR, le TRAVAIL qui fatigue !",
      readingMnemonicFr: "Rou - le TRAVAIL te fait dire 'rou-rou' de fatigue !",
    },
    {
      character: "命",
      meaningsFr: ["Vie", "Ordre"],
      readingsOn: ["メイ"],
      readingsKun: ["いのち"],
      meaningMnemonicFr: "Un ordre (令) avec la bouche. La VIE est un ORDRE sacré qu'on doit respecter.",
      readingMnemonicFr: "Inochi - la VIE précieuse, ton souffle !",
    },
    {
      character: "岸",
      meaningsFr: ["Rive", "Côte"],
      readingsOn: ["ガン"],
      readingsKun: ["きし"],
      meaningMnemonicFr: "La montagne, le sommet et la falaise. La RIVE, la CÔTE où la terre rencontre l'eau.",
      readingMnemonicFr: "Kishi - la RIVE du fleuve !",
    },
    {
      character: "放",
      meaningsFr: ["Libérer", "Lâcher"],
      readingsOn: ["ホウ"],
      readingsKun: ["はな-す", "はな-れる"],
      meaningMnemonicFr: "La direction et le frapper. LIBÉRER quelque chose en le poussant au loin !",
      readingMnemonicFr: "Hanasu - LIBÉRER, LÂCHER prise !",
    },
    {
      character: "昔",
      meaningsFr: ["Autrefois", "Passé"],
      readingsOn: ["セキ", "シャク"],
      readingsKun: ["むかし"],
      meaningMnemonicFr: "Le soleil accumulé sur le temps. AUTREFOIS, dans le PASSÉ lointain.",
      readingMnemonicFr: "Mukashi - il y a longtemps, AUTREFOIS !",
    },
    {
      character: "波",
      meaningsFr: ["Vague"],
      readingsOn: ["ハ"],
      readingsKun: ["なみ"],
      meaningMnemonicFr: "L'eau et la peau - l'eau qui ondule comme une peau. Les VAGUES de l'océan !",
      readingMnemonicFr: "Nami - les VAGUES qui roulent 'nami, nami' !",
    },
    {
      character: "注",
      meaningsFr: ["Verser", "Attention"],
      readingsOn: ["チュウ"],
      readingsKun: ["そそ-ぐ"],
      meaningMnemonicFr: "L'eau et le maître. VERSER l'eau avec ATTENTION comme un maître du thé.",
      readingMnemonicFr: "Sosogu - VERSER avec soin !",
    },
    {
      character: "育",
      meaningsFr: ["Élever", "Grandir"],
      readingsOn: ["イク"],
      readingsKun: ["そだ-てる", "そだ-つ"],
      meaningMnemonicFr: "La chair qui grandit sous le toit. ÉLEVER un enfant, le faire GRANDIR.",
      readingMnemonicFr: "Sodateru - ÉLEVER avec amour !",
    },
    {
      character: "拾",
      meaningsFr: ["Ramasser", "Dix"],
      readingsOn: ["シュウ"],
      readingsKun: ["ひろ-う"],
      meaningMnemonicFr: "La main et dix. RAMASSER dix choses par terre, les collecter.",
      readingMnemonicFr: "Hirou - RAMASSER ce qui traîne !",
    },
    {
      character: "指",
      meaningsFr: ["Doigt", "Montrer"],
      readingsOn: ["シ"],
      readingsKun: ["ゆび", "さ-す"],
      meaningMnemonicFr: "La main et le délicieux. Le DOIGT qui MONTRE ce qui est bon !",
      readingMnemonicFr: "Yubi - ton DOIGT qui pointe !",
    },
    {
      character: "洋",
      meaningsFr: ["Océan", "Occidental"],
      readingsOn: ["ヨウ"],
      readingsKun: [],
      meaningMnemonicFr: "L'eau et le mouton. L'OCÉAN vaste, le style OCCIDENTAL venu par la mer.",
      readingMnemonicFr: "You - l'OCÉAN qui s'étend vers l'Occident !",
    },
    {
      character: "神",
      meaningsFr: ["Dieu", "Esprit"],
      readingsOn: ["シン", "ジン"],
      readingsKun: ["かみ"],
      meaningMnemonicFr: "L'autel et ce qui s'étend. DIEU, l'ESPRIT divin qui se manifeste à l'autel.",
      readingMnemonicFr: "Kami - les DIEUX du Japon, les kami !",
    },
    {
      character: "秒",
      meaningsFr: ["Seconde"],
      readingsOn: ["ビョウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le riz et le peu. Une SECONDE, c'est un tout petit peu de temps, comme un grain de riz.",
      readingMnemonicFr: "Byou - une SECONDE passe : byou !",
    },
    {
      character: "級",
      meaningsFr: ["Classe", "Rang"],
      readingsOn: ["キュウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le fil et le rassemblement. Les CLASSES sociales tissées ensemble, chaque RANG.",
      readingMnemonicFr: "Kyuu - quel est ton RANG, quelle CLASSE ?",
    },
    {
      character: "追",
      meaningsFr: ["Poursuivre", "Chasser"],
      readingsOn: ["ツイ"],
      readingsKun: ["お-う"],
      meaningMnemonicFr: "Le chemin et le marteau. POURSUIVRE quelqu'un sur le chemin, le CHASSER !",
      readingMnemonicFr: "Ou - POURSUIVRE sans relâche !",
    },
    {
      character: "届",
      meaningsFr: ["Livrer", "Atteindre"],
      readingsOn: ["トド"],
      readingsKun: ["とど-く", "とど-ける"],
      meaningMnemonicFr: "Le corps qui se penche sous le toit. LIVRER quelque chose, ATTEINDRE sa destination.",
      readingMnemonicFr: "Todoku - ça ATTEINT sa destination !",
    },
    {
      character: "届",
      meaningsFr: ["Livrer", "Atteindre"],
      readingsOn: [],
      readingsKun: ["とど-く", "とど-ける"],
      meaningMnemonicFr: "Le message qui ARRIVE à destination. LIVRER avec succès !",
      readingMnemonicFr: "Todokeru - tu LIVRES toi-même !",
    },
    {
      character: "届",
      meaningsFr: ["Atteindre"],
      readingsOn: [],
      readingsKun: ["とど-く"],
      meaningMnemonicFr: "Ton effort ATTEINT le but. La flèche ATTEINT la cible !",
      readingMnemonicFr: "Todoku - ATTEINDRE enfin !",
    },
    {
      character: "届",
      meaningsFr: ["Parvenir"],
      readingsOn: [],
      readingsKun: ["とど-く"],
      meaningMnemonicFr: "Le courrier PARVIENT à destination.",
      readingMnemonicFr: "Todoku - ça PARVIENT !",
    },
    {
      character: "届",
      meaningsFr: ["Arriver"],
      readingsOn: [],
      readingsKun: ["とど-く"],
      meaningMnemonicFr: "Le colis ARRIVE enfin !",
      readingMnemonicFr: "Todoku - c'est ARRIVÉ !",
    },
    {
      character: "戦",
      meaningsFr: ["Guerre", "Combattre"],
      readingsOn: ["セン"],
      readingsKun: ["いくさ", "たたか-う"],
      meaningMnemonicFr: "La hallebarde simple. La GUERRE, le COMBAT avec les armes.",
      readingMnemonicFr: "Tatakau - COMBATTRE dans la GUERRE !",
    },
    {
      character: "競",
      meaningsFr: ["Concourir", "Rivaliser"],
      readingsOn: ["キョウ"],
      readingsKun: ["きそ-う", "せ-る"],
      meaningMnemonicFr: "Deux frères qui parlent. Ils RIVALISENT, ils CONCOURENT pour être le meilleur !",
      readingMnemonicFr: "Kisou - RIVALISER pour gagner !",
    },
    {
      character: "良",
      meaningsFr: ["Bon", "Bien"],
      readingsOn: ["リョウ"],
      readingsKun: ["よ-い"],
      meaningMnemonicFr: "Le grain de riz parfait. C'est BON, c'est BIEN fait !",
      readingMnemonicFr: "Yoi - c'est BON, c'est bien !",
    },
    {
      character: "功",
      meaningsFr: ["Mérite", "Succès"],
      readingsOn: ["コウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le travail et la force. Le MÉRITE vient du travail, le SUCCÈS de l'effort.",
      readingMnemonicFr: "Kou - le MÉRITE de ton travail !",
    },
    {
      character: "特",
      meaningsFr: ["Spécial", "Particulier"],
      readingsOn: ["トク"],
      readingsKun: [],
      meaningMnemonicFr: "La vache et le temple. Une vache SPÉCIALE au temple, PARTICULIÈRE !",
      readingMnemonicFr: "Toku - quelque chose de SPÉCIAL !",
    },
    {
      character: "便",
      meaningsFr: ["Pratique", "Courrier"],
      readingsOn: ["ベン", "ビン"],
      readingsKun: ["たよ-り"],
      meaningMnemonicFr: "Une personne qui change. PRATIQUE et utile, comme le COURRIER qui arrive.",
      readingMnemonicFr: "Ben - c'est PRATIQUE, bénéfique !",
    },
    {
      character: "働",
      meaningsFr: ["Travailler"],
      readingsOn: ["ドウ"],
      readingsKun: ["はたら-く"],
      meaningMnemonicFr: "Une personne qui bouge lourdement. TRAVAILLER dur, faire des efforts physiques.",
      readingMnemonicFr: "Hataraku - TRAVAILLER tous les jours !",
    },
    {
      character: "令",
      meaningsFr: ["Ordre", "Commandement"],
      readingsOn: ["レイ"],
      readingsKun: [],
      meaningMnemonicFr: "Le chapeau de l'autorité sur une personne. Donner des ORDRES, COMMANDER.",
      readingMnemonicFr: "Rei - l'ORDRE du chef !",
    },
    {
      character: "意",
      meaningsFr: ["Intention", "Sens"],
      readingsOn: ["イ"],
      readingsKun: [],
      meaningMnemonicFr: "Le son sur le coeur. L'INTENTION vient du coeur, le SENS profond.",
      readingMnemonicFr: "I - quelle est ton INTENTION ?",
    },
    {
      character: "味",
      meaningsFr: ["Goût", "Saveur"],
      readingsOn: ["ミ"],
      readingsKun: ["あじ"],
      meaningMnemonicFr: "La bouche et ce qui n'est pas encore. Le GOÛT qu'on découvre, la SAVEUR à explorer.",
      readingMnemonicFr: "Aji - quel GOÛT, quelle SAVEUR !",
    },
  ];

  for (const kanji of level11Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 11 },
      create: { ...kanji, levelId: 11 },
    });
  }

  const level11Vocab = [
    { word: "争う", meaningsFr: ["Se disputer", "Rivaliser"], readings: ["あらそう"], mnemonicFr: "Se DISPUTER pour quelque chose, RIVALISER.", levelId: 11 },
    { word: "戦争", meaningsFr: ["Guerre"], readings: ["せんそう"], mnemonicFr: "La GUERRE, le conflit armé entre nations.", levelId: 11 },
    { word: "仲", meaningsFr: ["Relation", "Termes"], readings: ["なか"], mnemonicFr: "La RELATION entre personnes, être en bons termes.", levelId: 11 },
    { word: "仲間", meaningsFr: ["Camarade", "Compagnon"], readings: ["なかま"], mnemonicFr: "Un CAMARADE, un ami proche.", levelId: 11 },
    { word: "伝える", meaningsFr: ["Transmettre"], readings: ["つたえる"], mnemonicFr: "TRANSMETTRE un message ou une tradition.", levelId: 11 },
    { word: "伝統", meaningsFr: ["Tradition"], readings: ["でんとう"], mnemonicFr: "La TRADITION qui se transmet.", levelId: 11 },
    { word: "共に", meaningsFr: ["Ensemble"], readings: ["ともに"], mnemonicFr: "ENSEMBLE, tous unis.", levelId: 11 },
    { word: "公共", meaningsFr: ["Public"], readings: ["こうきょう"], mnemonicFr: "PUBLIC, pour tout le monde.", levelId: 11 },
    { word: "好き", meaningsFr: ["Aimer"], readings: ["すき"], mnemonicFr: "AIMER quelque chose ou quelqu'un.", levelId: 11 },
    { word: "好む", meaningsFr: ["Préférer"], readings: ["このむ"], mnemonicFr: "PRÉFÉRER, avoir une préférence.", levelId: 11 },
    { word: "成る", meaningsFr: ["Devenir"], readings: ["なる"], mnemonicFr: "DEVENIR quelque chose de nouveau.", levelId: 11 },
    { word: "成功", meaningsFr: ["Succès"], readings: ["せいこう"], mnemonicFr: "Le SUCCÈS, la réussite.", levelId: 11 },
    { word: "老人", meaningsFr: ["Personne âgée"], readings: ["ろうじん"], mnemonicFr: "Une PERSONNE ÂGÉE, un ancien.", levelId: 11 },
    { word: "位", meaningsFr: ["Rang", "Place"], readings: ["くらい"], mnemonicFr: "Le RANG, la PLACE dans la hiérarchie.", levelId: 11 },
    { word: "位置", meaningsFr: ["Position"], readings: ["いち"], mnemonicFr: "La POSITION, l'emplacement.", levelId: 11 },
    { word: "低い", meaningsFr: ["Bas", "Court"], readings: ["ひくい"], mnemonicFr: "BAS en hauteur, COURT.", levelId: 11 },
    { word: "最低", meaningsFr: ["Minimum", "Le pire"], readings: ["さいてい"], mnemonicFr: "Le MINIMUM, le plus bas.", levelId: 11 },
    { word: "初めて", meaningsFr: ["Pour la première fois"], readings: ["はじめて"], mnemonicFr: "Pour la PREMIÈRE FOIS.", levelId: 11 },
    { word: "最初", meaningsFr: ["Premier", "Début"], readings: ["さいしょ"], mnemonicFr: "Le PREMIER, le DÉBUT.", levelId: 11 },
    { word: "別", meaningsFr: ["Séparé", "Autre"], readings: ["べつ"], mnemonicFr: "SÉPARÉ, un AUTRE.", levelId: 11 },
    { word: "別れる", meaningsFr: ["Se séparer"], readings: ["わかれる"], mnemonicFr: "SE SÉPARER de quelqu'un.", levelId: 11 },
    { word: "利用", meaningsFr: ["Utilisation"], readings: ["りよう"], mnemonicFr: "L'UTILISATION de quelque chose.", levelId: 11 },
    { word: "便利", meaningsFr: ["Pratique"], readings: ["べんり"], mnemonicFr: "PRATIQUE, utile.", levelId: 11 },
    { word: "努力", meaningsFr: ["Effort"], readings: ["どりょく"], mnemonicFr: "L'EFFORT qu'on fait.", levelId: 11 },
    { word: "労働", meaningsFr: ["Travail", "Labeur"], readings: ["ろうどう"], mnemonicFr: "Le TRAVAIL, le LABEUR.", levelId: 11 },
    { word: "命", meaningsFr: ["Vie"], readings: ["いのち"], mnemonicFr: "La VIE, l'existence.", levelId: 11 },
    { word: "生命", meaningsFr: ["Vie"], readings: ["せいめい"], mnemonicFr: "La VIE, l'être vivant.", levelId: 11 },
    { word: "岸", meaningsFr: ["Rive"], readings: ["きし"], mnemonicFr: "La RIVE d'un fleuve.", levelId: 11 },
    { word: "海岸", meaningsFr: ["Côte", "Littoral"], readings: ["かいがん"], mnemonicFr: "La CÔTE, le bord de mer.", levelId: 11 },
    { word: "放す", meaningsFr: ["Libérer", "Lâcher"], readings: ["はなす"], mnemonicFr: "LIBÉRER, LÂCHER prise.", levelId: 11 },
    { word: "放送", meaningsFr: ["Diffusion", "Émission"], readings: ["ほうそう"], mnemonicFr: "La DIFFUSION à la télé ou radio.", levelId: 11 },
    { word: "昔", meaningsFr: ["Autrefois"], readings: ["むかし"], mnemonicFr: "AUTREFOIS, dans le passé.", levelId: 11 },
    { word: "波", meaningsFr: ["Vague"], readings: ["なみ"], mnemonicFr: "Une VAGUE de l'océan.", levelId: 11 },
    { word: "注意", meaningsFr: ["Attention"], readings: ["ちゅうい"], mnemonicFr: "Faire ATTENTION.", levelId: 11 },
    { word: "注文", meaningsFr: ["Commande"], readings: ["ちゅうもん"], mnemonicFr: "Une COMMANDE au restaurant.", levelId: 11 },
    { word: "育てる", meaningsFr: ["Élever", "Cultiver"], readings: ["そだてる"], mnemonicFr: "ÉLEVER un enfant, CULTIVER des plantes.", levelId: 11 },
    { word: "教育", meaningsFr: ["Éducation"], readings: ["きょういく"], mnemonicFr: "L'ÉDUCATION, l'enseignement.", levelId: 11 },
    { word: "拾う", meaningsFr: ["Ramasser"], readings: ["ひろう"], mnemonicFr: "RAMASSER quelque chose par terre.", levelId: 11 },
    { word: "指", meaningsFr: ["Doigt"], readings: ["ゆび"], mnemonicFr: "Le DOIGT de la main.", levelId: 11 },
    { word: "指す", meaningsFr: ["Montrer", "Pointer"], readings: ["さす"], mnemonicFr: "MONTRER du doigt, POINTER.", levelId: 11 },
    { word: "洋服", meaningsFr: ["Vêtements occidentaux"], readings: ["ようふく"], mnemonicFr: "Les VÊTEMENTS de style occidental.", levelId: 11 },
    { word: "太平洋", meaningsFr: ["Océan Pacifique"], readings: ["たいへいよう"], mnemonicFr: "L'OCÉAN PACIFIQUE.", levelId: 11 },
    { word: "神", meaningsFr: ["Dieu"], readings: ["かみ"], mnemonicFr: "DIEU, les divinités.", levelId: 11 },
    { word: "神社", meaningsFr: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonicFr: "Un SANCTUAIRE shinto.", levelId: 11 },
    { word: "秒", meaningsFr: ["Seconde"], readings: ["びょう"], mnemonicFr: "Une SECONDE de temps.", levelId: 11 },
    { word: "級", meaningsFr: ["Classe", "Rang"], readings: ["きゅう"], mnemonicFr: "La CLASSE, le niveau.", levelId: 11 },
    { word: "追う", meaningsFr: ["Poursuivre"], readings: ["おう"], mnemonicFr: "POURSUIVRE quelqu'un.", levelId: 11 },
    { word: "届く", meaningsFr: ["Arriver", "Atteindre"], readings: ["とどく"], mnemonicFr: "ARRIVER à destination.", levelId: 11 },
    { word: "届ける", meaningsFr: ["Livrer"], readings: ["とどける"], mnemonicFr: "LIVRER quelque chose.", levelId: 11 },
    { word: "戦う", meaningsFr: ["Combattre"], readings: ["たたかう"], mnemonicFr: "COMBATTRE, se battre.", levelId: 11 },
    { word: "競争", meaningsFr: ["Compétition"], readings: ["きょうそう"], mnemonicFr: "La COMPÉTITION, la rivalité.", levelId: 11 },
    { word: "良い", meaningsFr: ["Bon", "Bien"], readings: ["よい"], mnemonicFr: "C'est BON, c'est BIEN.", levelId: 11 },
    { word: "功績", meaningsFr: ["Exploit", "Mérite"], readings: ["こうせき"], mnemonicFr: "Un EXPLOIT, un MÉRITE.", levelId: 11 },
    { word: "特に", meaningsFr: ["Particulièrement"], readings: ["とくに"], mnemonicFr: "PARTICULIÈREMENT, spécialement.", levelId: 11 },
    { word: "特別", meaningsFr: ["Spécial"], readings: ["とくべつ"], mnemonicFr: "SPÉCIAL, particulier.", levelId: 11 },
    { word: "働く", meaningsFr: ["Travailler"], readings: ["はたらく"], mnemonicFr: "TRAVAILLER dur.", levelId: 11 },
    { word: "命令", meaningsFr: ["Ordre", "Commandement"], readings: ["めいれい"], mnemonicFr: "Un ORDRE, un COMMANDEMENT.", levelId: 11 },
    { word: "意味", meaningsFr: ["Sens", "Signification"], readings: ["いみ"], mnemonicFr: "Le SENS, la SIGNIFICATION.", levelId: 11 },
    { word: "意見", meaningsFr: ["Opinion"], readings: ["いけん"], mnemonicFr: "Une OPINION, un avis.", levelId: 11 },
    { word: "味", meaningsFr: ["Goût"], readings: ["あじ"], mnemonicFr: "Le GOÛT de la nourriture.", levelId: 11 },
    { word: "味わう", meaningsFr: ["Savourer"], readings: ["あじわう"], mnemonicFr: "SAVOURER un bon repas.", levelId: 11 },
  ];

  for (const vocab of level11Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab, readingMnemonicFr: vocab.mnemonicFr },
    });
  }

  console.log("Level 11 complete!");

  // ============================================
  // LEVEL 12 - WaniKani Level 12
  // Kanji: 待勉庭息旅根流消倍員島祭章第都動商悪族深球童陽階寒暑期植歯温港湯登着短野泉合僕
  // ============================================

  const level12Radicals = [
    {
      character: "豆",
      meaningFr: "Haricot",
      mnemonic: "Un HARICOT sur une table. Les HARICOTS du petit-déjeuner japonais, le natto !"
    },
    {
      character: "酋",
      meaningFr: "Chef",
      mnemonic: "Le CHEF de la tribu avec son chapeau. L'autorité qui dirige !"
    },
    {
      character: "畐",
      meaningFr: "Richesse",
      mnemonic: "Le champ plein, la RICHESSE agricole. Abondance de récoltes !"
    },
    {
      character: "票",
      meaningFr: "Vote",
      mnemonic: "L'ouest et l'oiseau - envoyer un VOTE comme un oiseau messager !"
    },
  ];

  for (const radical of level12Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 12 } },
      update: { ...radical },
      create: { ...radical, levelId: 12 },
    });
  }

  const level12Kanji = [
    {
      character: "待",
      meaningsFr: ["Attendre"],
      readingsOn: ["タイ"],
      readingsKun: ["ま-つ"],
      meaningMnemonicFr: "Le temple et le mouvement. ATTENDRE patiemment devant le temple.",
      readingMnemonicFr: "Matsu - ATTENDRE quelqu'un !",
    },
    {
      character: "勉",
      meaningsFr: ["Effort", "Étude"],
      readingsOn: ["ベン"],
      readingsKun: [],
      meaningMnemonicFr: "La force de l'évitement - faire des EFFORTS pour ÉTUDIER malgré les distractions.",
      readingMnemonicFr: "Ben - faire des EFFORTS pour étudier !",
    },
    {
      character: "庭",
      meaningsFr: ["Jardin"],
      readingsOn: ["テイ"],
      readingsKun: ["にわ"],
      meaningMnemonicFr: "Le bâtiment et la cour. Le JARDIN de la maison japonaise.",
      readingMnemonicFr: "Niwa - le JARDIN traditionnel !",
    },
    {
      character: "息",
      meaningsFr: ["Souffle", "Repos"],
      readingsOn: ["ソク"],
      readingsKun: ["いき"],
      meaningMnemonicFr: "Le nez et le coeur. Le SOUFFLE qui vient du coeur, prendre du REPOS.",
      readingMnemonicFr: "Iki - le SOUFFLE, respirer !",
    },
    {
      character: "旅",
      meaningsFr: ["Voyage"],
      readingsOn: ["リョ"],
      readingsKun: ["たび"],
      meaningMnemonicFr: "La direction et les vêtements. Partir en VOYAGE avec ses bagages.",
      readingMnemonicFr: "Tabi - un VOYAGE aventureux !",
    },
    {
      character: "根",
      meaningsFr: ["Racine"],
      readingsOn: ["コン"],
      readingsKun: ["ね"],
      meaningMnemonicFr: "L'arbre et la limite. Les RACINES qui s'enfoncent dans la terre.",
      readingMnemonicFr: "Ne - les RACINES de l'arbre !",
    },
    {
      character: "流",
      meaningsFr: ["Couler", "Style"],
      readingsOn: ["リュウ"],
      readingsKun: ["なが-れる", "なが-す"],
      meaningMnemonicFr: "L'eau et l'enfant qui naît. L'eau qui COULE comme la vie, un STYLE unique.",
      readingMnemonicFr: "Nagareru - l'eau COULE !",
    },
    {
      character: "消",
      meaningsFr: ["Éteindre", "Effacer"],
      readingsOn: ["ショウ"],
      readingsKun: ["き-える", "け-す"],
      meaningMnemonicFr: "L'eau et le petit. ÉTEINDRE le feu, EFFACER les traces.",
      readingMnemonicFr: "Kieru - ça s'ÉTEINT, ça s'EFFACE !",
    },
    {
      character: "倍",
      meaningsFr: ["Double", "Fois"],
      readingsOn: ["バイ"],
      readingsKun: [],
      meaningMnemonicFr: "Une personne et le debout. DOUBLER quelque chose, multiplier par deux.",
      readingMnemonicFr: "Bai - le DOUBLE, deux fois !",
    },
    {
      character: "員",
      meaningsFr: ["Membre", "Personnel"],
      readingsOn: ["イン"],
      readingsKun: [],
      meaningMnemonicFr: "La bouche et le coquillage (argent). Un MEMBRE du personnel qu'on paie.",
      readingMnemonicFr: "In - un MEMBRE de l'équipe !",
    },
    {
      character: "島",
      meaningsFr: ["Île"],
      readingsOn: ["トウ"],
      readingsKun: ["しま"],
      meaningMnemonicFr: "L'oiseau sur la montagne. Une ÎLE vue par les oiseaux.",
      readingMnemonicFr: "Shima - une ÎLE japonaise !",
    },
    {
      character: "祭",
      meaningsFr: ["Festival"],
      readingsOn: ["サイ"],
      readingsKun: ["まつ-り"],
      meaningMnemonicFr: "La viande, la main et l'autel. Le FESTIVAL religieux avec offrandes.",
      readingMnemonicFr: "Matsuri - le FESTIVAL japonais !",
    },
    {
      character: "章",
      meaningsFr: ["Chapitre", "Badge"],
      readingsOn: ["ショウ"],
      readingsKun: [],
      meaningMnemonicFr: "Le debout et le tôt. Le CHAPITRE qui commence tôt, le BADGE d'honneur.",
      readingMnemonicFr: "Shou - un nouveau CHAPITRE !",
    },
    {
      character: "第",
      meaningsFr: ["Numéro", "Ordre"],
      readingsOn: ["ダイ"],
      readingsKun: [],
      meaningMnemonicFr: "Le bambou et le frère. Le NUMÉRO d'ordre, comme les frères dans une famille.",
      readingMnemonicFr: "Dai - le NUMÉRO un, deux, trois !",
    },
    {
      character: "都",
      meaningsFr: ["Capitale", "Métropole"],
      readingsOn: ["ト"],
      readingsKun: ["みやこ"],
      meaningMnemonicFr: "Le chef et la ville. La CAPITALE, la grande MÉTROPOLE.",
      readingMnemonicFr: "Miyako - la CAPITALE impériale !",
    },
    {
      character: "動",
      meaningsFr: ["Bouger", "Mouvement"],
      readingsOn: ["ドウ"],
      readingsKun: ["うご-く"],
      meaningMnemonicFr: "Le lourd et la force. BOUGER quelque chose de lourd demande de la force.",
      readingMnemonicFr: "Ugoku - ça BOUGE !",
    },
    {
      character: "商",
      meaningsFr: ["Commerce"],
      readingsOn: ["ショウ"],
      readingsKun: ["あきな-う"],
      meaningMnemonicFr: "Le chapeau et les jambes du marchand. Le COMMERCE ambulant.",
      readingMnemonicFr: "Shou - faire du COMMERCE !",
    },
    {
      character: "悪",
      meaningsFr: ["Mal", "Mauvais"],
      readingsOn: ["アク"],
      readingsKun: ["わる-い"],
      meaningMnemonicFr: "Le deuxième coeur. Un coeur MAUVAIS, le MAL.",
      readingMnemonicFr: "Warui - c'est MAUVAIS !",
    },
    {
      character: "族",
      meaningsFr: ["Clan", "Tribu"],
      readingsOn: ["ゾク"],
      readingsKun: [],
      meaningMnemonicFr: "Le drapeau et la flèche. Le CLAN qui marche sous son drapeau.",
      readingMnemonicFr: "Zoku - le CLAN familial !",
    },
    {
      character: "深",
      meaningsFr: ["Profond"],
      readingsOn: ["シン"],
      readingsKun: ["ふか-い"],
      meaningMnemonicFr: "L'eau et l'exploration. L'eau PROFONDE qu'on explore.",
      readingMnemonicFr: "Fukai - c'est PROFOND !",
    },
    {
      character: "球",
      meaningsFr: ["Balle", "Sphère"],
      readingsOn: ["キュウ"],
      readingsKun: ["たま"],
      meaningMnemonicFr: "Le roi du jade. Une BALLE précieuse comme le jade, une SPHÈRE parfaite.",
      readingMnemonicFr: "Tama - une BALLE ronde !",
    },
    {
      character: "童",
      meaningsFr: ["Enfant"],
      readingsOn: ["ドウ"],
      readingsKun: ["わらべ"],
      meaningMnemonicFr: "Le debout et la terre. L'ENFANT qui se tient debout sur la terre.",
      readingMnemonicFr: "Warabe - un petit ENFANT !",
    },
    {
      character: "陽",
      meaningsFr: ["Soleil", "Positif"],
      readingsOn: ["ヨウ"],
      readingsKun: [],
      meaningMnemonicFr: "La colline et le soleil. Le côté POSITIF, le SOLEIL qui brille.",
      readingMnemonicFr: "You - le SOLEIL positif !",
    },
    {
      character: "階",
      meaningsFr: ["Étage", "Escalier"],
      readingsOn: ["カイ"],
      readingsKun: [],
      meaningMnemonicFr: "La colline et tous. Tous les ÉTAGES de la colline, les ESCALIERS.",
      readingMnemonicFr: "Kai - l'ÉTAGE du bâtiment !",
    },
    {
      character: "寒",
      meaningsFr: ["Froid"],
      readingsOn: ["カン"],
      readingsKun: ["さむ-い"],
      meaningMnemonicFr: "Le toit et la glace. Il fait FROID sous le toit gelé.",
      readingMnemonicFr: "Samui - c'est FROID !",
    },
    {
      character: "暑",
      meaningsFr: ["Chaud (climat)"],
      readingsOn: ["ショ"],
      readingsKun: ["あつ-い"],
      meaningMnemonicFr: "Le soleil et celui qui parle. Il fait tellement CHAUD qu'on parle de la chaleur.",
      readingMnemonicFr: "Atsui - c'est CHAUD !",
    },
    {
      character: "期",
      meaningsFr: ["Période"],
      readingsOn: ["キ"],
      readingsKun: [],
      meaningMnemonicFr: "La lune et son cycle. Une PÉRIODE de temps comme le cycle lunaire.",
      readingMnemonicFr: "Ki - une PÉRIODE donnée !",
    },
    {
      character: "植",
      meaningsFr: ["Planter"],
      readingsOn: ["ショク"],
      readingsKun: ["う-える"],
      meaningMnemonicFr: "L'arbre et le droit. PLANTER un arbre bien droit dans le sol.",
      readingMnemonicFr: "Ueru - PLANTER des graines !",
    },
    {
      character: "歯",
      meaningsFr: ["Dent"],
      readingsOn: ["シ"],
      readingsKun: ["は"],
      meaningMnemonicFr: "Arrêter et la bouche. Les DENTS dans la bouche qui arrêtent la nourriture.",
      readingMnemonicFr: "Ha - les DENTS qui mordent !",
    },
    {
      character: "温",
      meaningsFr: ["Chaud", "Tiède"],
      readingsOn: ["オン"],
      readingsKun: ["あたた-かい"],
      meaningMnemonicFr: "L'eau et le plat. L'eau CHAUDE, TIÈDE et agréable.",
      readingMnemonicFr: "Atatakai - c'est CHAUD et agréable !",
    },
    {
      character: "港",
      meaningsFr: ["Port"],
      readingsOn: ["コウ"],
      readingsKun: ["みなと"],
      meaningMnemonicFr: "L'eau et le commun. Le PORT où tous les bateaux se rejoignent.",
      readingMnemonicFr: "Minato - le PORT maritime !",
    },
    {
      character: "湯",
      meaningsFr: ["Eau chaude"],
      readingsOn: ["トウ"],
      readingsKun: ["ゆ"],
      meaningMnemonicFr: "L'eau et le soleil. L'EAU CHAUDE du bain japonais.",
      readingMnemonicFr: "Yu - l'EAU CHAUDE du onsen !",
    },
    {
      character: "登",
      meaningsFr: ["Grimper", "Monter"],
      readingsOn: ["トウ"],
      readingsKun: ["のぼ-る"],
      meaningMnemonicFr: "Les pieds et le haricot. GRIMPER comme un haricot magique.",
      readingMnemonicFr: "Noboru - GRIMPER au sommet !",
    },
    {
      character: "着",
      meaningsFr: ["Arriver", "Porter (vêtement)"],
      readingsOn: ["チャク"],
      readingsKun: ["き-る", "つ-く"],
      meaningMnemonicFr: "Le mouton et l'oeil. ARRIVER quelque part, PORTER des vêtements de laine.",
      readingMnemonicFr: "Kiru/Tsuku - PORTER des vêtements, ARRIVER !",
    },
    {
      character: "短",
      meaningsFr: ["Court"],
      readingsOn: ["タン"],
      readingsKun: ["みじか-い"],
      meaningMnemonicFr: "La flèche et le haricot. Une flèche COURTE comme un haricot.",
      readingMnemonicFr: "Mijikai - c'est COURT !",
    },
    {
      character: "野",
      meaningsFr: ["Champ", "Sauvage"],
      readingsOn: ["ヤ"],
      readingsKun: ["の"],
      meaningMnemonicFr: "La terre et ce qui est donné. Le CHAMP SAUVAGE où la nature donne librement.",
      readingMnemonicFr: "No - le CHAMP sauvage !",
    },
    {
      character: "泉",
      meaningsFr: ["Source", "Fontaine"],
      readingsOn: ["セン"],
      readingsKun: ["いずみ"],
      meaningMnemonicFr: "L'eau blanche qui jaillit. Une SOURCE d'eau pure, une FONTAINE naturelle.",
      readingMnemonicFr: "Izumi - une SOURCE d'eau fraîche !",
    },
    {
      character: "合",
      meaningsFr: ["Réunir", "Correspondre"],
      readingsOn: ["ゴウ", "ガッ"],
      readingsKun: ["あ-う"],
      meaningMnemonicFr: "Un couvercle qui ferme. RÉUNIR les éléments, les faire CORRESPONDRE.",
      readingMnemonicFr: "Au - ça CORRESPOND, ça va ensemble !",
    },
    {
      character: "僕",
      meaningsFr: ["Je (masculin)"],
      readingsOn: ["ボク"],
      readingsKun: [],
      meaningMnemonicFr: "Une personne et un serviteur. JE, pronom masculin humble.",
      readingMnemonicFr: "Boku - JE (pour les garçons) !",
    },
  ];

  for (const kanji of level12Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 12 },
      create: { ...kanji, levelId: 12 },
    });
  }

  // Level 12 vocabulary
  const level12Vocab = [
    { word: "待つ", meaningsFr: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE quelqu'un ou quelque chose.", levelId: 12 },
    { word: "期待", meaningsFr: ["Attente", "Espoir"], readings: ["きたい"], mnemonicFr: "ATTENDRE avec ESPOIR.", levelId: 12 },
    { word: "勉強", meaningsFr: ["Étude"], readings: ["べんきょう"], mnemonicFr: "L'ÉTUDE, faire des efforts pour apprendre.", levelId: 12 },
    { word: "庭", meaningsFr: ["Jardin"], readings: ["にわ"], mnemonicFr: "Le JARDIN de la maison.", levelId: 12 },
    { word: "息", meaningsFr: ["Souffle"], readings: ["いき"], mnemonicFr: "Le SOUFFLE, la respiration.", levelId: 12 },
    { word: "休息", meaningsFr: ["Repos"], readings: ["きゅうそく"], mnemonicFr: "Le REPOS pour reprendre son souffle.", levelId: 12 },
    { word: "旅", meaningsFr: ["Voyage"], readings: ["たび"], mnemonicFr: "Un VOYAGE, une aventure.", levelId: 12 },
    { word: "旅行", meaningsFr: ["Voyage"], readings: ["りょこう"], mnemonicFr: "Un VOYAGE organisé.", levelId: 12 },
    { word: "根", meaningsFr: ["Racine"], readings: ["ね"], mnemonicFr: "La RACINE d'une plante.", levelId: 12 },
    { word: "流れる", meaningsFr: ["Couler"], readings: ["ながれる"], mnemonicFr: "L'eau qui COULE.", levelId: 12 },
    { word: "流行", meaningsFr: ["Mode", "Tendance"], readings: ["りゅうこう"], mnemonicFr: "La MODE qui se répand.", levelId: 12 },
    { word: "消える", meaningsFr: ["S'éteindre", "Disparaître"], readings: ["きえる"], mnemonicFr: "S'ÉTEINDRE, DISPARAÎTRE.", levelId: 12 },
    { word: "消す", meaningsFr: ["Éteindre", "Effacer"], readings: ["けす"], mnemonicFr: "ÉTEINDRE la lumière, EFFACER.", levelId: 12 },
    { word: "倍", meaningsFr: ["Fois", "Double"], readings: ["ばい"], mnemonicFr: "Le DOUBLE, multiplier.", levelId: 12 },
    { word: "店員", meaningsFr: ["Employé de magasin"], readings: ["てんいん"], mnemonicFr: "Un EMPLOYÉ de boutique.", levelId: 12 },
    { word: "会員", meaningsFr: ["Membre"], readings: ["かいいん"], mnemonicFr: "Un MEMBRE d'une association.", levelId: 12 },
    { word: "島", meaningsFr: ["Île"], readings: ["しま"], mnemonicFr: "Une ÎLE.", levelId: 12 },
    { word: "半島", meaningsFr: ["Péninsule"], readings: ["はんとう"], mnemonicFr: "Une PÉNINSULE, demi-île.", levelId: 12 },
    { word: "祭り", meaningsFr: ["Festival"], readings: ["まつり"], mnemonicFr: "Un FESTIVAL japonais.", levelId: 12 },
    { word: "文化祭", meaningsFr: ["Festival culturel"], readings: ["ぶんかさい"], mnemonicFr: "Un FESTIVAL CULTUREL.", levelId: 12 },
    { word: "章", meaningsFr: ["Chapitre"], readings: ["しょう"], mnemonicFr: "Un CHAPITRE de livre.", levelId: 12 },
    { word: "第一", meaningsFr: ["Premier"], readings: ["だいいち"], mnemonicFr: "Le PREMIER, numéro un.", levelId: 12 },
    { word: "都", meaningsFr: ["Capitale"], readings: ["と"], mnemonicFr: "La CAPITALE.", levelId: 12 },
    { word: "京都", meaningsFr: ["Kyoto"], readings: ["きょうと"], mnemonicFr: "KYOTO, l'ancienne capitale.", levelId: 12 },
    { word: "動く", meaningsFr: ["Bouger"], readings: ["うごく"], mnemonicFr: "BOUGER, se déplacer.", levelId: 12 },
    { word: "運動", meaningsFr: ["Exercice", "Mouvement"], readings: ["うんどう"], mnemonicFr: "L'EXERCICE physique.", levelId: 12 },
    { word: "商売", meaningsFr: ["Commerce", "Affaires"], readings: ["しょうばい"], mnemonicFr: "Le COMMERCE, les affaires.", levelId: 12 },
    { word: "商品", meaningsFr: ["Produit", "Article"], readings: ["しょうひん"], mnemonicFr: "Un PRODUIT commercial.", levelId: 12 },
    { word: "悪い", meaningsFr: ["Mauvais"], readings: ["わるい"], mnemonicFr: "C'est MAUVAIS.", levelId: 12 },
    { word: "最悪", meaningsFr: ["Le pire"], readings: ["さいあく"], mnemonicFr: "Le PIRE, le plus mauvais.", levelId: 12 },
    { word: "家族", meaningsFr: ["Famille"], readings: ["かぞく"], mnemonicFr: "La FAMILLE.", levelId: 12 },
    { word: "民族", meaningsFr: ["Peuple", "Ethnie"], readings: ["みんぞく"], mnemonicFr: "Un PEUPLE, une ethnie.", levelId: 12 },
    { word: "深い", meaningsFr: ["Profond"], readings: ["ふかい"], mnemonicFr: "C'est PROFOND.", levelId: 12 },
    { word: "球", meaningsFr: ["Balle"], readings: ["たま"], mnemonicFr: "Une BALLE.", levelId: 12 },
    { word: "地球", meaningsFr: ["Terre (planète)"], readings: ["ちきゅう"], mnemonicFr: "La TERRE, notre planète.", levelId: 12 },
    { word: "童話", meaningsFr: ["Conte pour enfants"], readings: ["どうわ"], mnemonicFr: "Un CONTE pour enfants.", levelId: 12 },
    { word: "太陽", meaningsFr: ["Soleil"], readings: ["たいよう"], mnemonicFr: "Le SOLEIL.", levelId: 12 },
    { word: "陽気", meaningsFr: ["Joyeux", "Gai"], readings: ["ようき"], mnemonicFr: "JOYEUX, de bonne humeur.", levelId: 12 },
    { word: "階", meaningsFr: ["Étage"], readings: ["かい"], mnemonicFr: "Un ÉTAGE.", levelId: 12 },
    { word: "階段", meaningsFr: ["Escalier"], readings: ["かいだん"], mnemonicFr: "Un ESCALIER.", levelId: 12 },
    { word: "寒い", meaningsFr: ["Froid"], readings: ["さむい"], mnemonicFr: "Il fait FROID.", levelId: 12 },
    { word: "暑い", meaningsFr: ["Chaud (climat)"], readings: ["あつい"], mnemonicFr: "Il fait CHAUD.", levelId: 12 },
    { word: "期間", meaningsFr: ["Période", "Durée"], readings: ["きかん"], mnemonicFr: "Une PÉRIODE de temps.", levelId: 12 },
    { word: "植える", meaningsFr: ["Planter"], readings: ["うえる"], mnemonicFr: "PLANTER une graine.", levelId: 12 },
    { word: "植物", meaningsFr: ["Plante"], readings: ["しょくぶつ"], mnemonicFr: "Une PLANTE.", levelId: 12 },
    { word: "歯", meaningsFr: ["Dent"], readings: ["は"], mnemonicFr: "Une DENT.", levelId: 12 },
    { word: "歯医者", meaningsFr: ["Dentiste"], readings: ["はいしゃ"], mnemonicFr: "Un DENTISTE.", levelId: 12 },
    { word: "温かい", meaningsFr: ["Chaud", "Tiède"], readings: ["あたたかい"], mnemonicFr: "C'est CHAUD, agréable.", levelId: 12 },
    { word: "温泉", meaningsFr: ["Source chaude"], readings: ["おんせん"], mnemonicFr: "Une SOURCE CHAUDE, onsen.", levelId: 12 },
    { word: "港", meaningsFr: ["Port"], readings: ["みなと"], mnemonicFr: "Un PORT maritime.", levelId: 12 },
    { word: "空港", meaningsFr: ["Aéroport"], readings: ["くうこう"], mnemonicFr: "Un AÉROPORT.", levelId: 12 },
    { word: "湯", meaningsFr: ["Eau chaude"], readings: ["ゆ"], mnemonicFr: "L'EAU CHAUDE.", levelId: 12 },
    { word: "登る", meaningsFr: ["Grimper", "Monter"], readings: ["のぼる"], mnemonicFr: "GRIMPER une montagne.", levelId: 12 },
    { word: "登山", meaningsFr: ["Alpinisme"], readings: ["とざん"], mnemonicFr: "L'ALPINISME.", levelId: 12 },
    { word: "着く", meaningsFr: ["Arriver"], readings: ["つく"], mnemonicFr: "ARRIVER à destination.", levelId: 12 },
    { word: "着る", meaningsFr: ["Porter (vêtement)"], readings: ["きる"], mnemonicFr: "PORTER des vêtements.", levelId: 12 },
    { word: "短い", meaningsFr: ["Court"], readings: ["みじかい"], mnemonicFr: "C'est COURT.", levelId: 12 },
    { word: "野", meaningsFr: ["Champ"], readings: ["の"], mnemonicFr: "Un CHAMP.", levelId: 12 },
    { word: "野菜", meaningsFr: ["Légume"], readings: ["やさい"], mnemonicFr: "Les LÉGUMES.", levelId: 12 },
    { word: "泉", meaningsFr: ["Source"], readings: ["いずみ"], mnemonicFr: "Une SOURCE d'eau.", levelId: 12 },
    { word: "合う", meaningsFr: ["Correspondre", "S'accorder"], readings: ["あう"], mnemonicFr: "CORRESPONDRE, aller ensemble.", levelId: 12 },
    { word: "場合", meaningsFr: ["Cas", "Situation"], readings: ["ばあい"], mnemonicFr: "Un CAS, une situation.", levelId: 12 },
    { word: "僕", meaningsFr: ["Je (masculin)"], readings: ["ぼく"], mnemonicFr: "JE (pronom masculin).", levelId: 12 },
  ];

  for (const vocab of level12Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab, readingMnemonicFr: vocab.mnemonicFr },
    });
  }

  console.log("Level 12 complete!");
  console.log("Seeding levels 11-12 complete! Run this file after the main seed.");
  console.log("Levels 13-20 will be added in the next iteration.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
