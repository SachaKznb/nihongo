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
      create: { ...vocab },
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
      create: { ...vocab },
    });
  }

  console.log("Level 12 complete!");

  // ============================================
  // LEVEL 13 - WaniKani Level 13
  // Kanji: 問宿想感整暗様橋福緑練詩銀題館駅億器士料標殺然熱課賞輪選鏡願養像情謝映疑皆
  // ============================================

  const level13Radicals = [
    { character: "疑", meaningFr: "Doute", mnemonic: "L'oiseau qui hésite - le DOUTE qui te fait hésiter !" },
    { character: "養", meaningFr: "Nourrir", mnemonic: "Le mouton et la nourriture - NOURRIR avec soin !" },
    { character: "像", meaningFr: "Image", mnemonic: "Une personne et un éléphant - l'IMAGE qu'on se fait !" },
  ];

  for (const radical of level13Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 13 } },
      update: { ...radical },
      create: { ...radical, levelId: 13 },
    });
  }

  const level13Kanji = [
    { character: "問", meaningsFr: ["Question", "Problème"], readingsOn: ["モン"], readingsKun: ["と-う"], meaningMnemonicFr: "La bouche à la porte - poser une QUESTION.", readingMnemonicFr: "Tou - poser une QUESTION !" },
    { character: "宿", meaningsFr: ["Auberge", "Logement"], readingsOn: ["シュク"], readingsKun: ["やど"], meaningMnemonicFr: "Le toit et cent personnes - une AUBERGE.", readingMnemonicFr: "Yado - l'AUBERGE pour la nuit !" },
    { character: "想", meaningsFr: ["Pensée", "Idée"], readingsOn: ["ソウ"], readingsKun: [], meaningMnemonicFr: "Le regard et le coeur - la PENSÉE profonde.", readingMnemonicFr: "Sou - la PENSÉE !" },
    { character: "感", meaningsFr: ["Sentiment", "Émotion"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le coeur qui ressent - le SENTIMENT.", readingMnemonicFr: "Kan - le SENTIMENT !" },
    { character: "整", meaningsFr: ["Arranger", "Organiser"], readingsOn: ["セイ"], readingsKun: ["ととの-える"], meaningMnemonicFr: "Le faisceau et le correct - ARRANGER proprement.", readingMnemonicFr: "Totonoeru - ORGANISER !" },
    { character: "暗", meaningsFr: ["Sombre", "Obscur"], readingsOn: ["アン"], readingsKun: ["くら-い"], meaningMnemonicFr: "Le soleil et le son - quand il n'y a plus de soleil c'est SOMBRE.", readingMnemonicFr: "Kurai - c'est SOMBRE !" },
    { character: "様", meaningsFr: ["Manière", "État"], readingsOn: ["ヨウ"], readingsKun: ["さま"], meaningMnemonicFr: "L'arbre et le mouton - la MANIÈRE d'être.", readingMnemonicFr: "Sama - la MANIÈRE, le style !" },
    { character: "橋", meaningsFr: ["Pont"], readingsOn: ["キョウ"], readingsKun: ["はし"], meaningMnemonicFr: "L'arbre et le haut - un PONT en bois.", readingMnemonicFr: "Hashi - le PONT !" },
    { character: "福", meaningsFr: ["Bonheur", "Fortune"], readingsOn: ["フク"], readingsKun: [], meaningMnemonicFr: "L'autel et la richesse - le BONHEUR béni.", readingMnemonicFr: "Fuku - le BONHEUR !" },
    { character: "緑", meaningsFr: ["Vert"], readingsOn: ["リョク", "ロク"], readingsKun: ["みどり"], meaningMnemonicFr: "Le fil et les arbres - la couleur VERTE.", readingMnemonicFr: "Midori - VERT !" },
    { character: "練", meaningsFr: ["Entraîner", "Pratiquer"], readingsOn: ["レン"], readingsKun: ["ね-る"], meaningMnemonicFr: "Le fil et l'Est - S'ENTRAÎNER comme un fil tendu.", readingMnemonicFr: "Neru - S'ENTRAÎNER !" },
    { character: "詩", meaningsFr: ["Poème", "Poésie"], readingsOn: ["シ"], readingsKun: [], meaningMnemonicFr: "Les mots du temple - un POÈME sacré.", readingMnemonicFr: "Shi - un POÈME !" },
    { character: "銀", meaningsFr: ["Argent (métal)"], readingsOn: ["ギン"], readingsKun: [], meaningMnemonicFr: "Le métal et la limite - l'ARGENT précieux.", readingMnemonicFr: "Gin - l'ARGENT !" },
    { character: "題", meaningsFr: ["Sujet", "Titre"], readingsOn: ["ダイ"], readingsKun: [], meaningMnemonicFr: "Le soleil et la page - le SUJET du jour.", readingMnemonicFr: "Dai - le SUJET !" },
    { character: "館", meaningsFr: ["Bâtiment", "Hall"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "La nourriture et l'officiel - un BÂTIMENT public.", readingMnemonicFr: "Kan - le BÂTIMENT !" },
    { character: "駅", meaningsFr: ["Gare"], readingsOn: ["エキ"], readingsKun: [], meaningMnemonicFr: "Le cheval et le relais - une GARE.", readingMnemonicFr: "Eki - la GARE !" },
    { character: "億", meaningsFr: ["Cent millions"], readingsOn: ["オク"], readingsKun: [], meaningMnemonicFr: "La personne et l'intention - CENT MILLIONS de pensées.", readingMnemonicFr: "Oku - CENT MILLIONS !" },
    { character: "器", meaningsFr: ["Ustensile", "Récipient"], readingsOn: ["キ"], readingsKun: ["うつわ"], meaningMnemonicFr: "Quatre bouches et un chien - un USTENSILE.", readingMnemonicFr: "Utsuwa - un RÉCIPIENT !" },
    { character: "士", meaningsFr: ["Samouraï", "Guerrier"], readingsOn: ["シ"], readingsKun: [], meaningMnemonicFr: "Un homme debout - un SAMOURAÏ.", readingMnemonicFr: "Shi - le GUERRIER !" },
    { character: "料", meaningsFr: ["Frais", "Matériau"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "Le riz et la mesure - les FRAIS à payer.", readingMnemonicFr: "Ryou - les FRAIS !" },
    { character: "標", meaningsFr: ["Signe", "Marque"], readingsOn: ["ヒョウ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le vote - un SIGNE marqueur.", readingMnemonicFr: "Hyou - le SIGNE !" },
    { character: "殺", meaningsFr: ["Tuer"], readingsOn: ["サツ"], readingsKun: ["ころ-す"], meaningMnemonicFr: "L'arbre et la lance - TUER au combat.", readingMnemonicFr: "Korosu - TUER !" },
    { character: "然", meaningsFr: ["Nature", "Ainsi"], readingsOn: ["ネン", "ゼン"], readingsKun: [], meaningMnemonicFr: "La viande, le chien et le feu - NATURELLEMENT.", readingMnemonicFr: "Zen - NATURELLEMENT !" },
    { character: "熱", meaningsFr: ["Chaleur", "Fièvre"], readingsOn: ["ネツ"], readingsKun: ["あつ-い"], meaningMnemonicFr: "Le rond et le feu - la CHALEUR intense.", readingMnemonicFr: "Atsui - c'est CHAUD !" },
    { character: "課", meaningsFr: ["Leçon", "Section"], readingsOn: ["カ"], readingsKun: [], meaningMnemonicFr: "Les mots et les fruits - une LEÇON à apprendre.", readingMnemonicFr: "Ka - la LEÇON !" },
    { character: "賞", meaningsFr: ["Prix", "Récompense"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Le chapeau et le coquillage - un PRIX.", readingMnemonicFr: "Shou - le PRIX !" },
    { character: "輪", meaningsFr: ["Roue", "Cercle"], readingsOn: ["リン"], readingsKun: ["わ"], meaningMnemonicFr: "La voiture et l'ordre - une ROUE.", readingMnemonicFr: "Wa - la ROUE !" },
    { character: "選", meaningsFr: ["Choisir", "Sélectionner"], readingsOn: ["セン"], readingsKun: ["えら-ぶ"], meaningMnemonicFr: "Deux personnes qui avancent - CHOISIR entre deux.", readingMnemonicFr: "Erabu - CHOISIR !" },
    { character: "鏡", meaningsFr: ["Miroir"], readingsOn: ["キョウ"], readingsKun: ["かがみ"], meaningMnemonicFr: "Le métal et la capitale - un MIROIR.", readingMnemonicFr: "Kagami - le MIROIR !" },
    { character: "願", meaningsFr: ["Souhait", "Vœu"], readingsOn: ["ガン"], readingsKun: ["ねが-う"], meaningMnemonicFr: "La source et la page - un SOUHAIT profond.", readingMnemonicFr: "Negau - faire un VOEU !" },
    { character: "養", meaningsFr: ["Nourrir", "Élever"], readingsOn: ["ヨウ"], readingsKun: ["やしな-う"], meaningMnemonicFr: "Le mouton et la nourriture - NOURRIR.", readingMnemonicFr: "Yashinau - NOURRIR !" },
    { character: "像", meaningsFr: ["Image", "Statue"], readingsOn: ["ゾウ"], readingsKun: [], meaningMnemonicFr: "La personne et l'éléphant - une IMAGE, une STATUE.", readingMnemonicFr: "Zou - l'IMAGE !" },
    { character: "情", meaningsFr: ["Émotion", "Sentiment"], readingsOn: ["ジョウ"], readingsKun: ["なさ-け"], meaningMnemonicFr: "Le coeur et le bleu - l'ÉMOTION profonde.", readingMnemonicFr: "Jou - l'ÉMOTION !" },
    { character: "謝", meaningsFr: ["Remercier", "S'excuser"], readingsOn: ["シャ"], readingsKun: ["あやま-る"], meaningMnemonicFr: "Les mots et le tir - REMERCIER ou S'EXCUSER.", readingMnemonicFr: "Ayamaru - S'EXCUSER !" },
    { character: "映", meaningsFr: ["Refléter", "Projeter"], readingsOn: ["エイ"], readingsKun: ["うつ-る"], meaningMnemonicFr: "Le soleil et le centre - REFLÉTER la lumière.", readingMnemonicFr: "Utsuru - se REFLÉTER !" },
    { character: "疑", meaningsFr: ["Douter"], readingsOn: ["ギ"], readingsKun: ["うたが-う"], meaningMnemonicFr: "L'oiseau qui hésite - DOUTER.", readingMnemonicFr: "Utagau - DOUTER !" },
    { character: "皆", meaningsFr: ["Tout le monde"], readingsOn: ["カイ"], readingsKun: ["みな"], meaningMnemonicFr: "Le blanc et le comparer - TOUT LE MONDE ensemble.", readingMnemonicFr: "Mina - TOUT LE MONDE !" },
  ];

  for (const kanji of level13Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 13 },
      create: { ...kanji, levelId: 13 },
    });
  }

  const level13Vocab = [
    { word: "問題", meaningsFr: ["Problème", "Question"], readings: ["もんだい"], mnemonicFr: "Un PROBLÈME à résoudre.", levelId: 13 },
    { word: "質問", meaningsFr: ["Question"], readings: ["しつもん"], mnemonicFr: "Poser une QUESTION.", levelId: 13 },
    { word: "宿", meaningsFr: ["Auberge"], readings: ["やど"], mnemonicFr: "Une AUBERGE.", levelId: 13 },
    { word: "宿題", meaningsFr: ["Devoirs"], readings: ["しゅくだい"], mnemonicFr: "Les DEVOIRS à la maison.", levelId: 13 },
    { word: "想像", meaningsFr: ["Imagination"], readings: ["そうぞう"], mnemonicFr: "L'IMAGINATION.", levelId: 13 },
    { word: "感じる", meaningsFr: ["Ressentir"], readings: ["かんじる"], mnemonicFr: "RESSENTIR une émotion.", levelId: 13 },
    { word: "感謝", meaningsFr: ["Gratitude"], readings: ["かんしゃ"], mnemonicFr: "La GRATITUDE.", levelId: 13 },
    { word: "整理", meaningsFr: ["Organisation"], readings: ["せいり"], mnemonicFr: "L'ORGANISATION.", levelId: 13 },
    { word: "暗い", meaningsFr: ["Sombre"], readings: ["くらい"], mnemonicFr: "C'est SOMBRE.", levelId: 13 },
    { word: "暗記", meaningsFr: ["Mémorisation"], readings: ["あんき"], mnemonicFr: "La MÉMORISATION.", levelId: 13 },
    { word: "様子", meaningsFr: ["État", "Apparence"], readings: ["ようす"], mnemonicFr: "L'ÉTAT de quelque chose.", levelId: 13 },
    { word: "橋", meaningsFr: ["Pont"], readings: ["はし"], mnemonicFr: "Un PONT.", levelId: 13 },
    { word: "幸福", meaningsFr: ["Bonheur"], readings: ["こうふく"], mnemonicFr: "Le BONHEUR.", levelId: 13 },
    { word: "緑", meaningsFr: ["Vert"], readings: ["みどり"], mnemonicFr: "La couleur VERTE.", levelId: 13 },
    { word: "練習", meaningsFr: ["Entraînement"], readings: ["れんしゅう"], mnemonicFr: "L'ENTRAÎNEMENT.", levelId: 13 },
    { word: "詩", meaningsFr: ["Poème"], readings: ["し"], mnemonicFr: "Un POÈME.", levelId: 13 },
    { word: "銀行", meaningsFr: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "Une BANQUE.", levelId: 13 },
    { word: "銀", meaningsFr: ["Argent (métal)"], readings: ["ぎん"], mnemonicFr: "L'ARGENT.", levelId: 13 },
    { word: "話題", meaningsFr: ["Sujet de conversation"], readings: ["わだい"], mnemonicFr: "Un SUJET de conversation.", levelId: 13 },
    { word: "図書館", meaningsFr: ["Bibliothèque"], readings: ["としょかん"], mnemonicFr: "Une BIBLIOTHÈQUE.", levelId: 13 },
    { word: "駅", meaningsFr: ["Gare"], readings: ["えき"], mnemonicFr: "Une GARE.", levelId: 13 },
    { word: "一億", meaningsFr: ["Cent millions"], readings: ["いちおく"], mnemonicFr: "CENT MILLIONS.", levelId: 13 },
    { word: "食器", meaningsFr: ["Vaisselle"], readings: ["しょっき"], mnemonicFr: "La VAISSELLE.", levelId: 13 },
    { word: "武士", meaningsFr: ["Samouraï"], readings: ["ぶし"], mnemonicFr: "Un SAMOURAÏ.", levelId: 13 },
    { word: "料理", meaningsFr: ["Cuisine"], readings: ["りょうり"], mnemonicFr: "La CUISINE.", levelId: 13 },
    { word: "無料", meaningsFr: ["Gratuit"], readings: ["むりょう"], mnemonicFr: "C'est GRATUIT.", levelId: 13 },
    { word: "目標", meaningsFr: ["Objectif"], readings: ["もくひょう"], mnemonicFr: "Un OBJECTIF.", levelId: 13 },
    { word: "殺す", meaningsFr: ["Tuer"], readings: ["ころす"], mnemonicFr: "TUER.", levelId: 13 },
    { word: "自然", meaningsFr: ["Nature"], readings: ["しぜん"], mnemonicFr: "La NATURE.", levelId: 13 },
    { word: "熱い", meaningsFr: ["Chaud (au toucher)"], readings: ["あつい"], mnemonicFr: "C'est CHAUD.", levelId: 13 },
    { word: "情熱", meaningsFr: ["Passion"], readings: ["じょうねつ"], mnemonicFr: "La PASSION.", levelId: 13 },
    { word: "課", meaningsFr: ["Leçon"], readings: ["か"], mnemonicFr: "Une LEÇON.", levelId: 13 },
    { word: "賞", meaningsFr: ["Prix"], readings: ["しょう"], mnemonicFr: "Un PRIX.", levelId: 13 },
    { word: "車輪", meaningsFr: ["Roue"], readings: ["しゃりん"], mnemonicFr: "Une ROUE.", levelId: 13 },
    { word: "選ぶ", meaningsFr: ["Choisir"], readings: ["えらぶ"], mnemonicFr: "CHOISIR.", levelId: 13 },
    { word: "選挙", meaningsFr: ["Élection"], readings: ["せんきょ"], mnemonicFr: "Une ÉLECTION.", levelId: 13 },
    { word: "鏡", meaningsFr: ["Miroir"], readings: ["かがみ"], mnemonicFr: "Un MIROIR.", levelId: 13 },
    { word: "願う", meaningsFr: ["Souhaiter"], readings: ["ねがう"], mnemonicFr: "SOUHAITER.", levelId: 13 },
    { word: "栄養", meaningsFr: ["Nutrition"], readings: ["えいよう"], mnemonicFr: "La NUTRITION.", levelId: 13 },
    { word: "映画", meaningsFr: ["Film"], readings: ["えいが"], mnemonicFr: "Un FILM.", levelId: 13 },
    { word: "感情", meaningsFr: ["Émotion"], readings: ["かんじょう"], mnemonicFr: "L'ÉMOTION.", levelId: 13 },
    { word: "謝る", meaningsFr: ["S'excuser"], readings: ["あやまる"], mnemonicFr: "S'EXCUSER.", levelId: 13 },
    { word: "疑う", meaningsFr: ["Douter"], readings: ["うたがう"], mnemonicFr: "DOUTER.", levelId: 13 },
    { word: "皆", meaningsFr: ["Tout le monde"], readings: ["みな"], mnemonicFr: "TOUT LE MONDE.", levelId: 13 },
    { word: "皆さん", meaningsFr: ["Tout le monde (poli)"], readings: ["みなさん"], mnemonicFr: "TOUT LE MONDE (poli).", levelId: 13 },
  ];

  for (const vocab of level13Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 13 complete!");

  // ============================================
  // LEVEL 14 - WaniKani Level 14
  // Kanji: 例卒協参周囲固季完希念折望材束松残的約芸基性格能骨妥雰頑
  // ============================================

  const level14Kanji = [
    { character: "例", meaningsFr: ["Exemple"], readingsOn: ["レイ"], readingsKun: ["たと-える"], meaningMnemonicFr: "La personne et la ligne - un EXEMPLE à suivre.", readingMnemonicFr: "Rei - un EXEMPLE !" },
    { character: "卒", meaningsFr: ["Diplômer", "Finir"], readingsOn: ["ソツ"], readingsKun: [], meaningMnemonicFr: "Le dix et les vêtements - DIPLÔMER.", readingMnemonicFr: "Sotsu - être DIPLÔMÉ !" },
    { character: "協", meaningsFr: ["Coopérer"], readingsOn: ["キョウ"], readingsKun: [], meaningMnemonicFr: "Dix forces ensemble - COOPÉRER.", readingMnemonicFr: "Kyou - COOPÉRER !" },
    { character: "参", meaningsFr: ["Participer"], readingsOn: ["サン"], readingsKun: ["まい-る"], meaningMnemonicFr: "Les trois et les cheveux - PARTICIPER.", readingMnemonicFr: "San - PARTICIPER !" },
    { character: "周", meaningsFr: ["Tour", "Alentour"], readingsOn: ["シュウ"], readingsKun: ["まわ-り"], meaningMnemonicFr: "Le couvercle et la bouche - le TOUR complet.", readingMnemonicFr: "Mawari - les ALENTOURS !" },
    { character: "囲", meaningsFr: ["Entourer"], readingsOn: ["イ"], readingsKun: ["かこ-む"], meaningMnemonicFr: "L'enclos et le puits - ENTOURER.", readingMnemonicFr: "Kakomu - ENTOURER !" },
    { character: "固", meaningsFr: ["Dur", "Solide"], readingsOn: ["コ"], readingsKun: ["かた-い"], meaningMnemonicFr: "L'enclos et le vieux - DUR et SOLIDE.", readingMnemonicFr: "Katai - c'est DUR !" },
    { character: "季", meaningsFr: ["Saison"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le riz et l'enfant - la SAISON des récoltes.", readingMnemonicFr: "Ki - une SAISON !" },
    { character: "完", meaningsFr: ["Complet", "Parfait"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le toit et le roi - COMPLET et PARFAIT.", readingMnemonicFr: "Kan - c'est COMPLET !" },
    { character: "希", meaningsFr: ["Espoir", "Rare"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le croisé et le tissu - l'ESPOIR rare.", readingMnemonicFr: "Ki - l'ESPOIR !" },
    { character: "念", meaningsFr: ["Désir", "Pensée"], readingsOn: ["ネン"], readingsKun: [], meaningMnemonicFr: "Le maintenant et le coeur - le DÉSIR.", readingMnemonicFr: "Nen - le DÉSIR !" },
    { character: "折", meaningsFr: ["Plier", "Casser"], readingsOn: ["セツ"], readingsKun: ["お-る"], meaningMnemonicFr: "La main et la hache - PLIER.", readingMnemonicFr: "Oru - PLIER !" },
    { character: "望", meaningsFr: ["Espérer", "Désirer"], readingsOn: ["ボウ"], readingsKun: ["のぞ-む"], meaningMnemonicFr: "La lune et le roi qui regarde - ESPÉRER.", readingMnemonicFr: "Nozomu - ESPÉRER !" },
    { character: "材", meaningsFr: ["Matériau"], readingsOn: ["ザイ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le talent - le MATÉRIAU.", readingMnemonicFr: "Zai - le MATÉRIAU !" },
    { character: "束", meaningsFr: ["Faisceau", "Paquet"], readingsOn: ["ソク"], readingsKun: ["たば"], meaningMnemonicFr: "L'arbre attaché - un FAISCEAU.", readingMnemonicFr: "Taba - un PAQUET !" },
    { character: "松", meaningsFr: ["Pin"], readingsOn: ["ショウ"], readingsKun: ["まつ"], meaningMnemonicFr: "L'arbre et le public - le PIN.", readingMnemonicFr: "Matsu - le PIN !" },
    { character: "残", meaningsFr: ["Rester", "Cruel"], readingsOn: ["ザン"], readingsKun: ["のこ-る"], meaningMnemonicFr: "Le cadavre et les os - ce qui RESTE.", readingMnemonicFr: "Nokoru - RESTER !" },
    { character: "的", meaningsFr: ["Cible", "But"], readingsOn: ["テキ"], readingsKun: ["まと"], meaningMnemonicFr: "Le blanc et la cuillère - la CIBLE.", readingMnemonicFr: "Mato - la CIBLE !" },
    { character: "約", meaningsFr: ["Promesse", "Environ"], readingsOn: ["ヤク"], readingsKun: [], meaningMnemonicFr: "Le fil et la cuillère - une PROMESSE.", readingMnemonicFr: "Yaku - une PROMESSE !" },
    { character: "芸", meaningsFr: ["Art", "Compétence"], readingsOn: ["ゲイ"], readingsKun: [], meaningMnemonicFr: "L'herbe et le nuage - l'ART.", readingMnemonicFr: "Gei - l'ART !" },
    { character: "基", meaningsFr: ["Base", "Fondation"], readingsOn: ["キ"], readingsKun: ["もと"], meaningMnemonicFr: "Le dessous et la terre - la BASE.", readingMnemonicFr: "Moto - la BASE !" },
    { character: "性", meaningsFr: ["Nature", "Sexe"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "Le coeur et la vie - la NATURE de quelqu'un.", readingMnemonicFr: "Sei - la NATURE !" },
    { character: "格", meaningsFr: ["Statut", "Rang"], readingsOn: ["カク"], readingsKun: [], meaningMnemonicFr: "L'arbre et chaque - le STATUT.", readingMnemonicFr: "Kaku - le STATUT !" },
    { character: "能", meaningsFr: ["Capacité", "Talent"], readingsOn: ["ノウ"], readingsKun: [], meaningMnemonicFr: "Le mois et la chair - la CAPACITÉ.", readingMnemonicFr: "Nou - la CAPACITÉ !" },
    { character: "骨", meaningsFr: ["Os"], readingsOn: ["コツ"], readingsKun: ["ほね"], meaningMnemonicFr: "Le corps et la chair - les OS.", readingMnemonicFr: "Hone - les OS !" },
    { character: "妥", meaningsFr: ["Compromis"], readingsOn: ["ダ"], readingsKun: [], meaningMnemonicFr: "La main et la femme - le COMPROMIS.", readingMnemonicFr: "Da - le COMPROMIS !" },
    { character: "雰", meaningsFr: ["Atmosphère"], readingsOn: ["フン"], readingsKun: [], meaningMnemonicFr: "La pluie et le partage - l'ATMOSPHÈRE.", readingMnemonicFr: "Fun - l'ATMOSPHÈRE !" },
    { character: "頑", meaningsFr: ["Têtu", "Obstiné"], readingsOn: ["ガン"], readingsKun: [], meaningMnemonicFr: "La source et la page - TÊTU.", readingMnemonicFr: "Gan - TÊTU !" },
  ];

  for (const kanji of level14Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 14 },
      create: { ...kanji, levelId: 14 },
    });
  }

  const level14Vocab = [
    { word: "例えば", meaningsFr: ["Par exemple"], readings: ["たとえば"], mnemonicFr: "PAR EXEMPLE.", levelId: 14 },
    { word: "卒業", meaningsFr: ["Diplôme"], readings: ["そつぎょう"], mnemonicFr: "Le DIPLÔME.", levelId: 14 },
    { word: "協力", meaningsFr: ["Coopération"], readings: ["きょうりょく"], mnemonicFr: "La COOPÉRATION.", levelId: 14 },
    { word: "参加", meaningsFr: ["Participation"], readings: ["さんか"], mnemonicFr: "La PARTICIPATION.", levelId: 14 },
    { word: "周り", meaningsFr: ["Alentours"], readings: ["まわり"], mnemonicFr: "Les ALENTOURS.", levelId: 14 },
    { word: "囲む", meaningsFr: ["Entourer"], readings: ["かこむ"], mnemonicFr: "ENTOURER.", levelId: 14 },
    { word: "固い", meaningsFr: ["Dur"], readings: ["かたい"], mnemonicFr: "C'est DUR.", levelId: 14 },
    { word: "季節", meaningsFr: ["Saison"], readings: ["きせつ"], mnemonicFr: "Une SAISON.", levelId: 14 },
    { word: "完全", meaningsFr: ["Parfait"], readings: ["かんぜん"], mnemonicFr: "PARFAIT.", levelId: 14 },
    { word: "希望", meaningsFr: ["Espoir"], readings: ["きぼう"], mnemonicFr: "L'ESPOIR.", levelId: 14 },
    { word: "念", meaningsFr: ["Désir"], readings: ["ねん"], mnemonicFr: "Le DÉSIR.", levelId: 14 },
    { word: "記念", meaningsFr: ["Commémoration"], readings: ["きねん"], mnemonicFr: "La COMMÉMORATION.", levelId: 14 },
    { word: "折る", meaningsFr: ["Plier"], readings: ["おる"], mnemonicFr: "PLIER.", levelId: 14 },
    { word: "望む", meaningsFr: ["Espérer"], readings: ["のぞむ"], mnemonicFr: "ESPÉRER.", levelId: 14 },
    { word: "材料", meaningsFr: ["Matériau"], readings: ["ざいりょう"], mnemonicFr: "Le MATÉRIAU.", levelId: 14 },
    { word: "束", meaningsFr: ["Paquet"], readings: ["たば"], mnemonicFr: "Un PAQUET.", levelId: 14 },
    { word: "松", meaningsFr: ["Pin"], readings: ["まつ"], mnemonicFr: "Le PIN.", levelId: 14 },
    { word: "残る", meaningsFr: ["Rester"], readings: ["のこる"], mnemonicFr: "RESTER.", levelId: 14 },
    { word: "残念", meaningsFr: ["Dommage"], readings: ["ざんねん"], mnemonicFr: "Quel DOMMAGE.", levelId: 14 },
    { word: "目的", meaningsFr: ["But"], readings: ["もくてき"], mnemonicFr: "Le BUT.", levelId: 14 },
    { word: "約束", meaningsFr: ["Promesse"], readings: ["やくそく"], mnemonicFr: "Une PROMESSE.", levelId: 14 },
    { word: "芸術", meaningsFr: ["Art"], readings: ["げいじゅつ"], mnemonicFr: "L'ART.", levelId: 14 },
    { word: "基本", meaningsFr: ["Base"], readings: ["きほん"], mnemonicFr: "La BASE.", levelId: 14 },
    { word: "性格", meaningsFr: ["Personnalité"], readings: ["せいかく"], mnemonicFr: "La PERSONNALITÉ.", levelId: 14 },
    { word: "可能", meaningsFr: ["Possible"], readings: ["かのう"], mnemonicFr: "C'est POSSIBLE.", levelId: 14 },
    { word: "能力", meaningsFr: ["Capacité"], readings: ["のうりょく"], mnemonicFr: "La CAPACITÉ.", levelId: 14 },
    { word: "骨", meaningsFr: ["Os"], readings: ["ほね"], mnemonicFr: "Les OS.", levelId: 14 },
    { word: "妥協", meaningsFr: ["Compromis"], readings: ["だきょう"], mnemonicFr: "Le COMPROMIS.", levelId: 14 },
    { word: "雰囲気", meaningsFr: ["Atmosphère"], readings: ["ふんいき"], mnemonicFr: "L'ATMOSPHÈRE.", levelId: 14 },
    { word: "頑張る", meaningsFr: ["Faire de son mieux"], readings: ["がんばる"], mnemonicFr: "Faire de son MIEUX.", levelId: 14 },
  ];

  for (const vocab of level14Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 14 complete!");

  // ============================================
  // LEVEL 15 - WaniKani Level 15
  // Kanji: 技術寺岩帰春昼晴秋計列区坂式信勇単司変夫建昨毒法泣浅紀英軍飯仏築晩猫
  // ============================================

  const level15Kanji = [
    { character: "技", meaningsFr: ["Technique", "Compétence"], readingsOn: ["ギ"], readingsKun: ["わざ"], meaningMnemonicFr: "La main et le support - une TECHNIQUE.", readingMnemonicFr: "Waza - une TECHNIQUE !" },
    { character: "術", meaningsFr: ["Art", "Technique"], readingsOn: ["ジュツ"], readingsKun: [], meaningMnemonicFr: "Le chemin et le grain - l'ART.", readingMnemonicFr: "Jutsu - la TECHNIQUE !" },
    { character: "寺", meaningsFr: ["Temple"], readingsOn: ["ジ"], readingsKun: ["てら"], meaningMnemonicFr: "La terre et le pouce - un TEMPLE.", readingMnemonicFr: "Tera - le TEMPLE !" },
    { character: "岩", meaningsFr: ["Rocher"], readingsOn: ["ガン"], readingsKun: ["いわ"], meaningMnemonicFr: "La montagne et la pierre - un ROCHER.", readingMnemonicFr: "Iwa - le ROCHER !" },
    { character: "帰", meaningsFr: ["Retourner"], readingsOn: ["キ"], readingsKun: ["かえ-る"], meaningMnemonicFr: "Le balai et la femme - RETOURNER chez soi.", readingMnemonicFr: "Kaeru - RETOURNER !" },
    { character: "春", meaningsFr: ["Printemps"], readingsOn: ["シュン"], readingsKun: ["はる"], meaningMnemonicFr: "Le soleil et les trois - le PRINTEMPS.", readingMnemonicFr: "Haru - le PRINTEMPS !" },
    { character: "昼", meaningsFr: ["Midi", "Jour"], readingsOn: ["チュウ"], readingsKun: ["ひる"], meaningMnemonicFr: "Le soleil au milieu - MIDI.", readingMnemonicFr: "Hiru - MIDI !" },
    { character: "晴", meaningsFr: ["Clair", "Beau temps"], readingsOn: ["セイ"], readingsKun: ["は-れる"], meaningMnemonicFr: "Le soleil et le bleu - temps CLAIR.", readingMnemonicFr: "Hareru - il fait BEAU !" },
    { character: "秋", meaningsFr: ["Automne"], readingsOn: ["シュウ"], readingsKun: ["あき"], meaningMnemonicFr: "Le riz et le feu - l'AUTOMNE.", readingMnemonicFr: "Aki - l'AUTOMNE !" },
    { character: "計", meaningsFr: ["Compter", "Mesurer"], readingsOn: ["ケイ"], readingsKun: ["はか-る"], meaningMnemonicFr: "Les mots et les dix - COMPTER.", readingMnemonicFr: "Hakaru - MESURER !" },
    { character: "列", meaningsFr: ["Rangée", "File"], readingsOn: ["レツ"], readingsKun: [], meaningMnemonicFr: "Le cadavre et le couteau - une RANGÉE.", readingMnemonicFr: "Retsu - une RANGÉE !" },
    { character: "区", meaningsFr: ["Quartier", "Zone"], readingsOn: ["ク"], readingsKun: [], meaningMnemonicFr: "L'enclos et le croisé - un QUARTIER.", readingMnemonicFr: "Ku - le QUARTIER !" },
    { character: "坂", meaningsFr: ["Pente", "Côte"], readingsOn: ["ハン"], readingsKun: ["さか"], meaningMnemonicFr: "La terre et l'opposé - une PENTE.", readingMnemonicFr: "Saka - la PENTE !" },
    { character: "式", meaningsFr: ["Cérémonie", "Style"], readingsOn: ["シキ"], readingsKun: [], meaningMnemonicFr: "Le travail et le couvrir - une CÉRÉMONIE.", readingMnemonicFr: "Shiki - la CÉRÉMONIE !" },
    { character: "信", meaningsFr: ["Croire", "Foi"], readingsOn: ["シン"], readingsKun: [], meaningMnemonicFr: "La personne et les mots - CROIRE.", readingMnemonicFr: "Shin - la FOI !" },
    { character: "勇", meaningsFr: ["Courage"], readingsOn: ["ユウ"], readingsKun: ["いさ-む"], meaningMnemonicFr: "Le mâle et la force - le COURAGE.", readingMnemonicFr: "Yuu - le COURAGE !" },
    { character: "単", meaningsFr: ["Simple", "Seul"], readingsOn: ["タン"], readingsKun: [], meaningMnemonicFr: "Le dix et la bouche - SIMPLE.", readingMnemonicFr: "Tan - c'est SIMPLE !" },
    { character: "司", meaningsFr: ["Diriger", "Officier"], readingsOn: ["シ"], readingsKun: [], meaningMnemonicFr: "L'enclos et la bouche - DIRIGER.", readingMnemonicFr: "Shi - DIRIGER !" },
    { character: "変", meaningsFr: ["Changer", "Bizarre"], readingsOn: ["ヘン"], readingsKun: ["か-わる"], meaningMnemonicFr: "Le discours et l'action - CHANGER.", readingMnemonicFr: "Kawaru - CHANGER !" },
    { character: "夫", meaningsFr: ["Mari", "Homme"], readingsOn: ["フ"], readingsKun: ["おっと"], meaningMnemonicFr: "Le grand avec un trait - le MARI.", readingMnemonicFr: "Otto - le MARI !" },
    { character: "建", meaningsFr: ["Construire"], readingsOn: ["ケン"], readingsKun: ["た-てる"], meaningMnemonicFr: "La main et le balai - CONSTRUIRE.", readingMnemonicFr: "Tateru - CONSTRUIRE !" },
    { character: "昨", meaningsFr: ["Hier"], readingsOn: ["サク"], readingsKun: [], meaningMnemonicFr: "Le soleil et le faire - HIER.", readingMnemonicFr: "Saku - HIER !" },
    { character: "毒", meaningsFr: ["Poison"], readingsOn: ["ドク"], readingsKun: [], meaningMnemonicFr: "La mère et le bizarre - le POISON.", readingMnemonicFr: "Doku - le POISON !" },
    { character: "法", meaningsFr: ["Loi", "Méthode"], readingsOn: ["ホウ"], readingsKun: [], meaningMnemonicFr: "L'eau et le partir - la LOI.", readingMnemonicFr: "Hou - la LOI !" },
    { character: "泣", meaningsFr: ["Pleurer"], readingsOn: ["キュウ"], readingsKun: ["な-く"], meaningMnemonicFr: "L'eau et le debout - PLEURER.", readingMnemonicFr: "Naku - PLEURER !" },
    { character: "浅", meaningsFr: ["Peu profond"], readingsOn: ["セン"], readingsKun: ["あさ-い"], meaningMnemonicFr: "L'eau et les deux - PEU PROFOND.", readingMnemonicFr: "Asai - c'est PEU PROFOND !" },
    { character: "紀", meaningsFr: ["Ère", "Siècle"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le fil et soi-même - l'ÈRE.", readingMnemonicFr: "Ki - l'ÈRE !" },
    { character: "英", meaningsFr: ["Anglais", "Excellent"], readingsOn: ["エイ"], readingsKun: [], meaningMnemonicFr: "L'herbe et le centre - EXCELLENT.", readingMnemonicFr: "Ei - EXCELLENT !" },
    { character: "軍", meaningsFr: ["Armée"], readingsOn: ["グン"], readingsKun: [], meaningMnemonicFr: "Le véhicule et le couvrir - l'ARMÉE.", readingMnemonicFr: "Gun - l'ARMÉE !" },
    { character: "飯", meaningsFr: ["Riz cuit", "Repas"], readingsOn: ["ハン"], readingsKun: ["めし"], meaningMnemonicFr: "La nourriture et l'opposé - le REPAS.", readingMnemonicFr: "Meshi - le REPAS !" },
    { character: "仏", meaningsFr: ["Bouddha"], readingsOn: ["ブツ"], readingsKun: ["ほとけ"], meaningMnemonicFr: "La personne et le privé - BOUDDHA.", readingMnemonicFr: "Hotoke - BOUDDHA !" },
    { character: "築", meaningsFr: ["Construire"], readingsOn: ["チク"], readingsKun: ["きず-く"], meaningMnemonicFr: "Le bambou et le travail - CONSTRUIRE.", readingMnemonicFr: "Kizuku - CONSTRUIRE !" },
    { character: "晩", meaningsFr: ["Soir"], readingsOn: ["バン"], readingsKun: [], meaningMnemonicFr: "Le soleil et l'exempter - le SOIR.", readingMnemonicFr: "Ban - le SOIR !" },
    { character: "猫", meaningsFr: ["Chat"], readingsOn: ["ビョウ"], readingsKun: ["ねこ"], meaningMnemonicFr: "L'animal et le champ - le CHAT.", readingMnemonicFr: "Neko - le CHAT !" },
  ];

  for (const kanji of level15Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 15 },
      create: { ...kanji, levelId: 15 },
    });
  }

  const level15Vocab = [
    { word: "技術", meaningsFr: ["Technique"], readings: ["ぎじゅつ"], mnemonicFr: "La TECHNIQUE.", levelId: 15 },
    { word: "寺", meaningsFr: ["Temple"], readings: ["てら"], mnemonicFr: "Un TEMPLE.", levelId: 15 },
    { word: "岩", meaningsFr: ["Rocher"], readings: ["いわ"], mnemonicFr: "Un ROCHER.", levelId: 15 },
    { word: "帰る", meaningsFr: ["Retourner"], readings: ["かえる"], mnemonicFr: "RETOURNER.", levelId: 15 },
    { word: "春", meaningsFr: ["Printemps"], readings: ["はる"], mnemonicFr: "Le PRINTEMPS.", levelId: 15 },
    { word: "昼", meaningsFr: ["Midi"], readings: ["ひる"], mnemonicFr: "MIDI.", levelId: 15 },
    { word: "晴れる", meaningsFr: ["Être beau (temps)"], readings: ["はれる"], mnemonicFr: "Il fait BEAU.", levelId: 15 },
    { word: "秋", meaningsFr: ["Automne"], readings: ["あき"], mnemonicFr: "L'AUTOMNE.", levelId: 15 },
    { word: "計画", meaningsFr: ["Plan"], readings: ["けいかく"], mnemonicFr: "Un PLAN.", levelId: 15 },
    { word: "列", meaningsFr: ["Rangée"], readings: ["れつ"], mnemonicFr: "Une RANGÉE.", levelId: 15 },
    { word: "区", meaningsFr: ["Quartier"], readings: ["く"], mnemonicFr: "Un QUARTIER.", levelId: 15 },
    { word: "坂", meaningsFr: ["Pente"], readings: ["さか"], mnemonicFr: "Une PENTE.", levelId: 15 },
    { word: "結婚式", meaningsFr: ["Cérémonie de mariage"], readings: ["けっこんしき"], mnemonicFr: "Une CÉRÉMONIE de mariage.", levelId: 15 },
    { word: "信じる", meaningsFr: ["Croire"], readings: ["しんじる"], mnemonicFr: "CROIRE.", levelId: 15 },
    { word: "勇気", meaningsFr: ["Courage"], readings: ["ゆうき"], mnemonicFr: "Le COURAGE.", levelId: 15 },
    { word: "簡単", meaningsFr: ["Simple"], readings: ["かんたん"], mnemonicFr: "C'est SIMPLE.", levelId: 15 },
    { word: "変わる", meaningsFr: ["Changer"], readings: ["かわる"], mnemonicFr: "CHANGER.", levelId: 15 },
    { word: "大変", meaningsFr: ["Terrible", "Très"], readings: ["たいへん"], mnemonicFr: "C'est TERRIBLE.", levelId: 15 },
    { word: "夫", meaningsFr: ["Mari"], readings: ["おっと"], mnemonicFr: "Le MARI.", levelId: 15 },
    { word: "建てる", meaningsFr: ["Construire"], readings: ["たてる"], mnemonicFr: "CONSTRUIRE.", levelId: 15 },
    { word: "建物", meaningsFr: ["Bâtiment"], readings: ["たてもの"], mnemonicFr: "Un BÂTIMENT.", levelId: 15 },
    { word: "昨日", meaningsFr: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER.", levelId: 15 },
    { word: "毒", meaningsFr: ["Poison"], readings: ["どく"], mnemonicFr: "Le POISON.", levelId: 15 },
    { word: "法律", meaningsFr: ["Loi"], readings: ["ほうりつ"], mnemonicFr: "La LOI.", levelId: 15 },
    { word: "方法", meaningsFr: ["Méthode"], readings: ["ほうほう"], mnemonicFr: "La MÉTHODE.", levelId: 15 },
    { word: "泣く", meaningsFr: ["Pleurer"], readings: ["なく"], mnemonicFr: "PLEURER.", levelId: 15 },
    { word: "浅い", meaningsFr: ["Peu profond"], readings: ["あさい"], mnemonicFr: "C'est PEU PROFOND.", levelId: 15 },
    { word: "世紀", meaningsFr: ["Siècle"], readings: ["せいき"], mnemonicFr: "Le SIÈCLE.", levelId: 15 },
    { word: "英語", meaningsFr: ["Anglais"], readings: ["えいご"], mnemonicFr: "L'ANGLAIS.", levelId: 15 },
    { word: "軍", meaningsFr: ["Armée"], readings: ["ぐん"], mnemonicFr: "L'ARMÉE.", levelId: 15 },
    { word: "ご飯", meaningsFr: ["Riz/Repas"], readings: ["ごはん"], mnemonicFr: "Le REPAS.", levelId: 15 },
    { word: "朝ご飯", meaningsFr: ["Petit-déjeuner"], readings: ["あさごはん"], mnemonicFr: "Le PETIT-DÉJEUNER.", levelId: 15 },
    { word: "仏教", meaningsFr: ["Bouddhisme"], readings: ["ぶっきょう"], mnemonicFr: "Le BOUDDHISME.", levelId: 15 },
    { word: "建築", meaningsFr: ["Architecture"], readings: ["けんちく"], mnemonicFr: "L'ARCHITECTURE.", levelId: 15 },
    { word: "晩", meaningsFr: ["Soir"], readings: ["ばん"], mnemonicFr: "Le SOIR.", levelId: 15 },
    { word: "今晩", meaningsFr: ["Ce soir"], readings: ["こんばん"], mnemonicFr: "CE SOIR.", levelId: 15 },
    { word: "猫", meaningsFr: ["Chat"], readings: ["ねこ"], mnemonicFr: "Le CHAT.", levelId: 15 },
  ];

  for (const vocab of level15Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 15 complete!");

  // ============================================
  // LEVEL 16 - WaniKani Level 16
  // Kanji: 園曜書遠門係取品守幸急真箱荷面典府治浴笑辞関弁政留証険危存専冒冗阪
  // ============================================

  const level16Kanji = [
    { character: "園", meaningsFr: ["Jardin", "Parc"], readingsOn: ["エン"], readingsKun: ["その"], meaningMnemonicFr: "L'enclos et la terre - un PARC.", readingMnemonicFr: "En - le PARC !" },
    { character: "曜", meaningsFr: ["Jour de la semaine"], readingsOn: ["ヨウ"], readingsKun: [], meaningMnemonicFr: "Le soleil et l'aile - le JOUR de la semaine.", readingMnemonicFr: "You - le JOUR !" },
    { character: "書", meaningsFr: ["Écrire"], readingsOn: ["ショ"], readingsKun: ["か-く"], meaningMnemonicFr: "Le pinceau et le soleil - ÉCRIRE.", readingMnemonicFr: "Kaku - ÉCRIRE !" },
    { character: "遠", meaningsFr: ["Loin"], readingsOn: ["エン"], readingsKun: ["とお-い"], meaningMnemonicFr: "Le chemin et le vêtement - LOIN.", readingMnemonicFr: "Tooi - c'est LOIN !" },
    { character: "門", meaningsFr: ["Porte"], readingsOn: ["モン"], readingsKun: ["かど"], meaningMnemonicFr: "Les deux battants - une PORTE.", readingMnemonicFr: "Mon - la PORTE !" },
    { character: "係", meaningsFr: ["Relation", "Charge"], readingsOn: ["ケイ"], readingsKun: ["かか-る"], meaningMnemonicFr: "La personne et le fil - la RELATION.", readingMnemonicFr: "Kakari - la CHARGE !" },
    { character: "取", meaningsFr: ["Prendre"], readingsOn: ["シュ"], readingsKun: ["と-る"], meaningMnemonicFr: "L'oreille et la main - PRENDRE.", readingMnemonicFr: "Toru - PRENDRE !" },
    { character: "品", meaningsFr: ["Article", "Produit"], readingsOn: ["ヒン"], readingsKun: ["しな"], meaningMnemonicFr: "Trois bouches - un ARTICLE.", readingMnemonicFr: "Shina - un PRODUIT !" },
    { character: "守", meaningsFr: ["Protéger"], readingsOn: ["シュ"], readingsKun: ["まも-る"], meaningMnemonicFr: "Le toit et le pouce - PROTÉGER.", readingMnemonicFr: "Mamoru - PROTÉGER !" },
    { character: "幸", meaningsFr: ["Bonheur"], readingsOn: ["コウ"], readingsKun: ["しあわ-せ"], meaningMnemonicFr: "Le sol et le travail - le BONHEUR.", readingMnemonicFr: "Shiawase - le BONHEUR !" },
    { character: "急", meaningsFr: ["Urgent", "Se dépêcher"], readingsOn: ["キュウ"], readingsKun: ["いそ-ぐ"], meaningMnemonicFr: "Le coeur et l'attraper - URGENT.", readingMnemonicFr: "Isogu - SE DÉPÊCHER !" },
    { character: "真", meaningsFr: ["Vrai", "Réel"], readingsOn: ["シン"], readingsKun: ["ま"], meaningMnemonicFr: "Le dix et l'oeil - la VÉRITÉ.", readingMnemonicFr: "Ma - VRAI !" },
    { character: "箱", meaningsFr: ["Boîte"], readingsOn: ["ソウ"], readingsKun: ["はこ"], meaningMnemonicFr: "Le bambou et les yeux - une BOÎTE.", readingMnemonicFr: "Hako - une BOÎTE !" },
    { character: "荷", meaningsFr: ["Bagage", "Charge"], readingsOn: ["カ"], readingsKun: ["に"], meaningMnemonicFr: "L'herbe et ce qui - un BAGAGE.", readingMnemonicFr: "Ni - un BAGAGE !" },
    { character: "面", meaningsFr: ["Surface", "Visage"], readingsOn: ["メン"], readingsKun: ["おも"], meaningMnemonicFr: "L'enclos et la tête - la SURFACE.", readingMnemonicFr: "Men - le VISAGE !" },
    { character: "典", meaningsFr: ["Classique"], readingsOn: ["テン"], readingsKun: [], meaningMnemonicFr: "Le livre et la table - un CLASSIQUE.", readingMnemonicFr: "Ten - le CLASSIQUE !" },
    { character: "府", meaningsFr: ["Gouvernement"], readingsOn: ["フ"], readingsKun: [], meaningMnemonicFr: "Le bâtiment et le payer - le GOUVERNEMENT.", readingMnemonicFr: "Fu - le GOUVERNEMENT !" },
    { character: "治", meaningsFr: ["Gouverner", "Guérir"], readingsOn: ["チ", "ジ"], readingsKun: ["おさ-める"], meaningMnemonicFr: "L'eau et le plateau - GOUVERNER.", readingMnemonicFr: "Osameru - GOUVERNER !" },
    { character: "浴", meaningsFr: ["Baigner"], readingsOn: ["ヨク"], readingsKun: ["あ-びる"], meaningMnemonicFr: "L'eau et la vallée - se BAIGNER.", readingMnemonicFr: "Abiru - se BAIGNER !" },
    { character: "笑", meaningsFr: ["Rire"], readingsOn: ["ショウ"], readingsKun: ["わら-う"], meaningMnemonicFr: "Le bambou et la génération - RIRE.", readingMnemonicFr: "Warau - RIRE !" },
    { character: "辞", meaningsFr: ["Démissionner", "Mot"], readingsOn: ["ジ"], readingsKun: ["や-める"], meaningMnemonicFr: "La langue et le vêtement - DÉMISSIONNER.", readingMnemonicFr: "Yameru - DÉMISSIONNER !" },
    { character: "関", meaningsFr: ["Relation", "Barrière"], readingsOn: ["カン"], readingsKun: ["せき"], meaningMnemonicFr: "La porte et le ciel - la RELATION.", readingMnemonicFr: "Kan - la RELATION !" },
    { character: "弁", meaningsFr: ["Parler", "Valve"], readingsOn: ["ベン"], readingsKun: [], meaningMnemonicFr: "Le chapeau et la force - PARLER.", readingMnemonicFr: "Ben - PARLER !" },
    { character: "政", meaningsFr: ["Politique"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "Le correct et le frapper - la POLITIQUE.", readingMnemonicFr: "Sei - la POLITIQUE !" },
    { character: "留", meaningsFr: ["Rester", "Retenir"], readingsOn: ["リュウ"], readingsKun: ["と-める"], meaningMnemonicFr: "Le champ et le couteau - RESTER.", readingMnemonicFr: "Tomeru - RETENIR !" },
    { character: "証", meaningsFr: ["Preuve", "Certificat"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Les mots et le correct - une PREUVE.", readingMnemonicFr: "Shou - la PREUVE !" },
    { character: "険", meaningsFr: ["Dangereux"], readingsOn: ["ケン"], readingsKun: [], meaningMnemonicFr: "La colline et l'ensemble - DANGEREUX.", readingMnemonicFr: "Ken - c'est DANGEREUX !" },
    { character: "危", meaningsFr: ["Danger"], readingsOn: ["キ"], readingsKun: ["あぶ-ない"], meaningMnemonicFr: "La falaise et la personne - le DANGER.", readingMnemonicFr: "Abunai - c'est DANGEREUX !" },
    { character: "存", meaningsFr: ["Exister"], readingsOn: ["ソン", "ゾン"], readingsKun: [], meaningMnemonicFr: "Le talent et l'enfant - EXISTER.", readingMnemonicFr: "Son - EXISTER !" },
    { character: "専", meaningsFr: ["Spécialiser"], readingsOn: ["セン"], readingsKun: [], meaningMnemonicFr: "Le dix et le champ - se SPÉCIALISER.", readingMnemonicFr: "Sen - SPÉCIALISÉ !" },
    { character: "冒", meaningsFr: ["Risquer"], readingsOn: ["ボウ"], readingsKun: [], meaningMnemonicFr: "Le soleil et l'oeil - RISQUER.", readingMnemonicFr: "Bou - RISQUER !" },
    { character: "冗", meaningsFr: ["Superflu"], readingsOn: ["ジョウ"], readingsKun: [], meaningMnemonicFr: "Le toit et le grand - SUPERFLU.", readingMnemonicFr: "Jou - SUPERFLU !" },
    { character: "阪", meaningsFr: ["Pente (Osaka)"], readingsOn: ["ハン"], readingsKun: [], meaningMnemonicFr: "La colline et l'opposé - OSAKA.", readingMnemonicFr: "Han - Osaka !" },
  ];

  for (const kanji of level16Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 16 },
      create: { ...kanji, levelId: 16 },
    });
  }

  const level16Vocab = [
    { word: "公園", meaningsFr: ["Parc"], readings: ["こうえん"], mnemonicFr: "Un PARC.", levelId: 16 },
    { word: "日曜日", meaningsFr: ["Dimanche"], readings: ["にちようび"], mnemonicFr: "DIMANCHE.", levelId: 16 },
    { word: "書く", meaningsFr: ["Écrire"], readings: ["かく"], mnemonicFr: "ÉCRIRE.", levelId: 16 },
    { word: "遠い", meaningsFr: ["Loin"], readings: ["とおい"], mnemonicFr: "C'est LOIN.", levelId: 16 },
    { word: "門", meaningsFr: ["Porte"], readings: ["もん"], mnemonicFr: "Une PORTE.", levelId: 16 },
    { word: "取る", meaningsFr: ["Prendre"], readings: ["とる"], mnemonicFr: "PRENDRE.", levelId: 16 },
    { word: "守る", meaningsFr: ["Protéger"], readings: ["まもる"], mnemonicFr: "PROTÉGER.", levelId: 16 },
    { word: "幸せ", meaningsFr: ["Bonheur"], readings: ["しあわせ"], mnemonicFr: "Le BONHEUR.", levelId: 16 },
    { word: "急ぐ", meaningsFr: ["Se dépêcher"], readings: ["いそぐ"], mnemonicFr: "SE DÉPÊCHER.", levelId: 16 },
    { word: "真実", meaningsFr: ["Vérité"], readings: ["しんじつ"], mnemonicFr: "La VÉRITÉ.", levelId: 16 },
    { word: "箱", meaningsFr: ["Boîte"], readings: ["はこ"], mnemonicFr: "Une BOÎTE.", levelId: 16 },
    { word: "荷物", meaningsFr: ["Bagage"], readings: ["にもつ"], mnemonicFr: "Un BAGAGE.", levelId: 16 },
    { word: "政府", meaningsFr: ["Gouvernement"], readings: ["せいふ"], mnemonicFr: "Le GOUVERNEMENT.", levelId: 16 },
    { word: "政治", meaningsFr: ["Politique"], readings: ["せいじ"], mnemonicFr: "La POLITIQUE.", levelId: 16 },
    { word: "笑う", meaningsFr: ["Rire"], readings: ["わらう"], mnemonicFr: "RIRE.", levelId: 16 },
    { word: "辞書", meaningsFr: ["Dictionnaire"], readings: ["じしょ"], mnemonicFr: "Un DICTIONNAIRE.", levelId: 16 },
    { word: "関係", meaningsFr: ["Relation"], readings: ["かんけい"], mnemonicFr: "Une RELATION.", levelId: 16 },
    { word: "留学", meaningsFr: ["Études à l'étranger"], readings: ["りゅうがく"], mnemonicFr: "ÉTUDES À L'ÉTRANGER.", levelId: 16 },
    { word: "危険", meaningsFr: ["Danger"], readings: ["きけん"], mnemonicFr: "Le DANGER.", levelId: 16 },
    { word: "危ない", meaningsFr: ["Dangereux"], readings: ["あぶない"], mnemonicFr: "C'est DANGEREUX.", levelId: 16 },
    { word: "専門", meaningsFr: ["Spécialité"], readings: ["せんもん"], mnemonicFr: "La SPÉCIALITÉ.", levelId: 16 },
    { word: "冒険", meaningsFr: ["Aventure"], readings: ["ぼうけん"], mnemonicFr: "L'AVENTURE.", levelId: 16 },
    { word: "冗談", meaningsFr: ["Blague"], readings: ["じょうだん"], mnemonicFr: "Une BLAGUE.", levelId: 16 },
    { word: "大阪", meaningsFr: ["Osaka"], readings: ["おおさか"], mnemonicFr: "OSAKA.", levelId: 16 },
  ];

  for (const vocab of level16Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 16 complete!");

  // ============================================
  // LEVEL 17 - WaniKani Level 17
  // Kanji: 原細薬鼻側兵堂塩席敗果栄梅無結因常識非干是渉虚官察底愛署警恋覚説幻喜悲詳
  // ============================================

  const level17Kanji = [
    { character: "原", meaningsFr: ["Origine", "Plaine"], readingsOn: ["ゲン"], readingsKun: ["はら"], meaningMnemonicFr: "La falaise et la source - l'ORIGINE.", readingMnemonicFr: "Hara - la PLAINE !" },
    { character: "細", meaningsFr: ["Fin", "Détaillé"], readingsOn: ["サイ"], readingsKun: ["ほそ-い"], meaningMnemonicFr: "Le fil et le champ - FIN.", readingMnemonicFr: "Hosoi - c'est FIN !" },
    { character: "薬", meaningsFr: ["Médicament"], readingsOn: ["ヤク"], readingsKun: ["くすり"], meaningMnemonicFr: "L'herbe et le plaisir - un MÉDICAMENT.", readingMnemonicFr: "Kusuri - un MÉDICAMENT !" },
    { character: "鼻", meaningsFr: ["Nez"], readingsOn: ["ビ"], readingsKun: ["はな"], meaningMnemonicFr: "Le soi-même et le champ - le NEZ.", readingMnemonicFr: "Hana - le NEZ !" },
    { character: "側", meaningsFr: ["Côté"], readingsOn: ["ソク"], readingsKun: ["がわ"], meaningMnemonicFr: "La personne et le règle - le CÔTÉ.", readingMnemonicFr: "Gawa - le CÔTÉ !" },
    { character: "兵", meaningsFr: ["Soldat"], readingsOn: ["ヘイ"], readingsKun: [], meaningMnemonicFr: "Le drap et le huit - un SOLDAT.", readingMnemonicFr: "Hei - un SOLDAT !" },
    { character: "堂", meaningsFr: ["Salle", "Hall"], readingsOn: ["ドウ"], readingsKun: [], meaningMnemonicFr: "La terre et le chapeau - une SALLE.", readingMnemonicFr: "Dou - la SALLE !" },
    { character: "塩", meaningsFr: ["Sel"], readingsOn: ["エン"], readingsKun: ["しお"], meaningMnemonicFr: "La terre et l'assiette - le SEL.", readingMnemonicFr: "Shio - le SEL !" },
    { character: "席", meaningsFr: ["Siège", "Place"], readingsOn: ["セキ"], readingsKun: [], meaningMnemonicFr: "Le bâtiment et le tissu - un SIÈGE.", readingMnemonicFr: "Seki - un SIÈGE !" },
    { character: "敗", meaningsFr: ["Défaite"], readingsOn: ["ハイ"], readingsKun: ["やぶ-れる"], meaningMnemonicFr: "Le coquillage et le frapper - la DÉFAITE.", readingMnemonicFr: "Haiboku - la DÉFAITE !" },
    { character: "果", meaningsFr: ["Fruit", "Résultat"], readingsOn: ["カ"], readingsKun: ["は-てる"], meaningMnemonicFr: "Le champ et l'arbre - le FRUIT.", readingMnemonicFr: "Ka - le RÉSULTAT !" },
    { character: "栄", meaningsFr: ["Prospérer"], readingsOn: ["エイ"], readingsKun: ["さか-える"], meaningMnemonicFr: "L'arbre et le feu - PROSPÉRER.", readingMnemonicFr: "Ei - PROSPÉRER !" },
    { character: "梅", meaningsFr: ["Prunier"], readingsOn: ["バイ"], readingsKun: ["うめ"], meaningMnemonicFr: "L'arbre et chaque - le PRUNIER.", readingMnemonicFr: "Ume - le PRUNIER !" },
    { character: "無", meaningsFr: ["Rien", "Sans"], readingsOn: ["ム", "ブ"], readingsKun: ["な-い"], meaningMnemonicFr: "Le feu et quatre - RIEN.", readingMnemonicFr: "Nai - RIEN !" },
    { character: "結", meaningsFr: ["Lier", "Nouer"], readingsOn: ["ケツ"], readingsKun: ["むす-ぶ"], meaningMnemonicFr: "Le fil et le chanceux - NOUER.", readingMnemonicFr: "Musubu - NOUER !" },
    { character: "因", meaningsFr: ["Cause"], readingsOn: ["イン"], readingsKun: [], meaningMnemonicFr: "L'enclos et le grand - la CAUSE.", readingMnemonicFr: "In - la CAUSE !" },
    { character: "常", meaningsFr: ["Normal", "Toujours"], readingsOn: ["ジョウ"], readingsKun: ["つね"], meaningMnemonicFr: "Le chapeau et le tissu - NORMAL.", readingMnemonicFr: "Jou - TOUJOURS !" },
    { character: "識", meaningsFr: ["Connaissance"], readingsOn: ["シキ"], readingsKun: [], meaningMnemonicFr: "Les mots et le tissu - la CONNAISSANCE.", readingMnemonicFr: "Shiki - la CONNAISSANCE !" },
    { character: "非", meaningsFr: ["Non", "Erreur"], readingsOn: ["ヒ"], readingsKun: [], meaningMnemonicFr: "Les deux ailes opposées - NON.", readingMnemonicFr: "Hi - NON !" },
    { character: "愛", meaningsFr: ["Amour"], readingsOn: ["アイ"], readingsKun: [], meaningMnemonicFr: "Le coeur et l'être aimé - l'AMOUR.", readingMnemonicFr: "Ai - l'AMOUR !" },
    { character: "警", meaningsFr: ["Avertir", "Police"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "Les mots et l'attaque - AVERTIR.", readingMnemonicFr: "Kei - AVERTIR !" },
    { character: "恋", meaningsFr: ["Amour romantique"], readingsOn: ["レン"], readingsKun: ["こい"], meaningMnemonicFr: "Le coeur et l'autre - l'AMOUR ROMANTIQUE.", readingMnemonicFr: "Koi - l'AMOUR !" },
    { character: "覚", meaningsFr: ["Mémoriser", "Éveiller"], readingsOn: ["カク"], readingsKun: ["おぼ-える"], meaningMnemonicFr: "Voir et apprendre - MÉMORISER.", readingMnemonicFr: "Oboeru - MÉMORISER !" },
    { character: "説", meaningsFr: ["Expliquer", "Théorie"], readingsOn: ["セツ"], readingsKun: ["と-く"], meaningMnemonicFr: "Les mots et le frère - EXPLIQUER.", readingMnemonicFr: "Setsu - EXPLIQUER !" },
    { character: "喜", meaningsFr: ["Joie"], readingsOn: ["キ"], readingsKun: ["よろこ-ぶ"], meaningMnemonicFr: "Le tambour et la bouche - la JOIE.", readingMnemonicFr: "Yorokobu - se RÉJOUIR !" },
    { character: "悲", meaningsFr: ["Triste"], readingsOn: ["ヒ"], readingsKun: ["かな-しい"], meaningMnemonicFr: "Le non et le coeur - TRISTE.", readingMnemonicFr: "Kanashii - c'est TRISTE !" },
  ];

  for (const kanji of level17Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 17 },
      create: { ...kanji, levelId: 17 },
    });
  }

  const level17Vocab = [
    { word: "原因", meaningsFr: ["Cause"], readings: ["げんいん"], mnemonicFr: "La CAUSE.", levelId: 17 },
    { word: "細い", meaningsFr: ["Fin"], readings: ["ほそい"], mnemonicFr: "C'est FIN.", levelId: 17 },
    { word: "薬", meaningsFr: ["Médicament"], readings: ["くすり"], mnemonicFr: "Un MÉDICAMENT.", levelId: 17 },
    { word: "鼻", meaningsFr: ["Nez"], readings: ["はな"], mnemonicFr: "Le NEZ.", levelId: 17 },
    { word: "兵士", meaningsFr: ["Soldat"], readings: ["へいし"], mnemonicFr: "Un SOLDAT.", levelId: 17 },
    { word: "食堂", meaningsFr: ["Cantine"], readings: ["しょくどう"], mnemonicFr: "La CANTINE.", levelId: 17 },
    { word: "塩", meaningsFr: ["Sel"], readings: ["しお"], mnemonicFr: "Le SEL.", levelId: 17 },
    { word: "失敗", meaningsFr: ["Échec"], readings: ["しっぱい"], mnemonicFr: "L'ÉCHEC.", levelId: 17 },
    { word: "結果", meaningsFr: ["Résultat"], readings: ["けっか"], mnemonicFr: "Le RÉSULTAT.", levelId: 17 },
    { word: "梅", meaningsFr: ["Prunier"], readings: ["うめ"], mnemonicFr: "Le PRUNIER.", levelId: 17 },
    { word: "無理", meaningsFr: ["Impossible"], readings: ["むり"], mnemonicFr: "C'est IMPOSSIBLE.", levelId: 17 },
    { word: "結婚", meaningsFr: ["Mariage"], readings: ["けっこん"], mnemonicFr: "Le MARIAGE.", levelId: 17 },
    { word: "常識", meaningsFr: ["Sens commun"], readings: ["じょうしき"], mnemonicFr: "Le SENS COMMUN.", levelId: 17 },
    { word: "非常", meaningsFr: ["Urgence"], readings: ["ひじょう"], mnemonicFr: "L'URGENCE.", levelId: 17 },
    { word: "警察", meaningsFr: ["Police"], readings: ["けいさつ"], mnemonicFr: "La POLICE.", levelId: 17 },
    { word: "愛", meaningsFr: ["Amour"], readings: ["あい"], mnemonicFr: "L'AMOUR.", levelId: 17 },
    { word: "恋", meaningsFr: ["Amour romantique"], readings: ["こい"], mnemonicFr: "L'AMOUR ROMANTIQUE.", levelId: 17 },
    { word: "恋人", meaningsFr: ["Amoureux"], readings: ["こいびと"], mnemonicFr: "L'AMOUREUX.", levelId: 17 },
    { word: "覚える", meaningsFr: ["Mémoriser"], readings: ["おぼえる"], mnemonicFr: "MÉMORISER.", levelId: 17 },
    { word: "説明", meaningsFr: ["Explication"], readings: ["せつめい"], mnemonicFr: "L'EXPLICATION.", levelId: 17 },
    { word: "喜ぶ", meaningsFr: ["Se réjouir"], readings: ["よろこぶ"], mnemonicFr: "Se RÉJOUIR.", levelId: 17 },
    { word: "悲しい", meaningsFr: ["Triste"], readings: ["かなしい"], mnemonicFr: "C'est TRISTE.", levelId: 17 },
  ];

  for (const vocab of level17Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 17 complete!");

  // ============================================
  // LEVEL 18 - WaniKani Level 18
  // Kanji: 訓弓告種達類報祈等汽借焼座忘洗胸脳僧禅可許枚静句禁喫煙
  // ============================================

  const level18Kanji = [
    { character: "弓", meaningsFr: ["Arc"], readingsOn: ["キュウ"], readingsKun: ["ゆみ"], meaningMnemonicFr: "La forme courbée - l'ARC.", readingMnemonicFr: "Yumi - l'ARC !" },
    { character: "告", meaningsFr: ["Annoncer"], readingsOn: ["コク"], readingsKun: ["つ-げる"], meaningMnemonicFr: "La vache et la bouche - ANNONCER.", readingMnemonicFr: "Tsugeru - ANNONCER !" },
    { character: "種", meaningsFr: ["Graine", "Type"], readingsOn: ["シュ"], readingsKun: ["たね"], meaningMnemonicFr: "Le riz et le lourd - une GRAINE.", readingMnemonicFr: "Tane - une GRAINE !" },
    { character: "達", meaningsFr: ["Atteindre"], readingsOn: ["タツ"], readingsKun: [], meaningMnemonicFr: "Le chemin et le sol - ATTEINDRE.", readingMnemonicFr: "Tatsu - ATTEINDRE !" },
    { character: "類", meaningsFr: ["Type", "Catégorie"], readingsOn: ["ルイ"], readingsKun: [], meaningMnemonicFr: "Le riz et la tête - un TYPE.", readingMnemonicFr: "Rui - un TYPE !" },
    { character: "報", meaningsFr: ["Rapport", "Nouvelle"], readingsOn: ["ホウ"], readingsKun: [], meaningMnemonicFr: "Le bonheur et la main - un RAPPORT.", readingMnemonicFr: "Hou - un RAPPORT !" },
    { character: "祈", meaningsFr: ["Prier"], readingsOn: ["キ"], readingsKun: ["いの-る"], meaningMnemonicFr: "L'autel et le couper - PRIER.", readingMnemonicFr: "Inoru - PRIER !" },
    { character: "等", meaningsFr: ["Égal", "Classe"], readingsOn: ["トウ"], readingsKun: ["ひと-しい"], meaningMnemonicFr: "Le bambou et le temple - ÉGAL.", readingMnemonicFr: "Tou - ÉGAL !" },
    { character: "借", meaningsFr: ["Emprunter"], readingsOn: ["シャク"], readingsKun: ["か-りる"], meaningMnemonicFr: "La personne et l'autrefois - EMPRUNTER.", readingMnemonicFr: "Kariru - EMPRUNTER !" },
    { character: "焼", meaningsFr: ["Griller", "Brûler"], readingsOn: ["ショウ"], readingsKun: ["や-く"], meaningMnemonicFr: "Le feu et l'élégant - GRILLER.", readingMnemonicFr: "Yaku - GRILLER !" },
    { character: "座", meaningsFr: ["S'asseoir"], readingsOn: ["ザ"], readingsKun: ["すわ-る"], meaningMnemonicFr: "Le bâtiment et la terre - S'ASSEOIR.", readingMnemonicFr: "Suwaru - S'ASSEOIR !" },
    { character: "忘", meaningsFr: ["Oublier"], readingsOn: ["ボウ"], readingsKun: ["わす-れる"], meaningMnemonicFr: "Le coeur et le mourir - OUBLIER.", readingMnemonicFr: "Wasureru - OUBLIER !" },
    { character: "洗", meaningsFr: ["Laver"], readingsOn: ["セン"], readingsKun: ["あら-う"], meaningMnemonicFr: "L'eau et le premier - LAVER.", readingMnemonicFr: "Arau - LAVER !" },
    { character: "可", meaningsFr: ["Possible"], readingsOn: ["カ"], readingsKun: [], meaningMnemonicFr: "La bouche et le pouvoir - POSSIBLE.", readingMnemonicFr: "Ka - POSSIBLE !" },
    { character: "許", meaningsFr: ["Permettre"], readingsOn: ["キョ"], readingsKun: ["ゆる-す"], meaningMnemonicFr: "Les mots et le midi - PERMETTRE.", readingMnemonicFr: "Yurusu - PERMETTRE !" },
    { character: "静", meaningsFr: ["Calme", "Silencieux"], readingsOn: ["セイ"], readingsKun: ["しず-か"], meaningMnemonicFr: "Le bleu et la dispute - CALME.", readingMnemonicFr: "Shizuka - CALME !" },
    { character: "禁", meaningsFr: ["Interdire"], readingsOn: ["キン"], readingsKun: [], meaningMnemonicFr: "L'autel et le bois - INTERDIRE.", readingMnemonicFr: "Kin - INTERDIT !" },
    { character: "煙", meaningsFr: ["Fumée"], readingsOn: ["エン"], readingsKun: ["けむり"], meaningMnemonicFr: "Le feu et l'ouest - la FUMÉE.", readingMnemonicFr: "Kemuri - la FUMÉE !" },
  ];

  for (const kanji of level18Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 18 },
      create: { ...kanji, levelId: 18 },
    });
  }

  const level18Vocab = [
    { word: "弓", meaningsFr: ["Arc"], readings: ["ゆみ"], mnemonicFr: "Un ARC.", levelId: 18 },
    { word: "広告", meaningsFr: ["Publicité"], readings: ["こうこく"], mnemonicFr: "La PUBLICITÉ.", levelId: 18 },
    { word: "種類", meaningsFr: ["Type"], readings: ["しゅるい"], mnemonicFr: "Un TYPE.", levelId: 18 },
    { word: "友達", meaningsFr: ["Ami"], readings: ["ともだち"], mnemonicFr: "Un AMI.", levelId: 18 },
    { word: "報告", meaningsFr: ["Rapport"], readings: ["ほうこく"], mnemonicFr: "Un RAPPORT.", levelId: 18 },
    { word: "祈る", meaningsFr: ["Prier"], readings: ["いのる"], mnemonicFr: "PRIER.", levelId: 18 },
    { word: "平等", meaningsFr: ["Égalité"], readings: ["びょうどう"], mnemonicFr: "L'ÉGALITÉ.", levelId: 18 },
    { word: "借りる", meaningsFr: ["Emprunter"], readings: ["かりる"], mnemonicFr: "EMPRUNTER.", levelId: 18 },
    { word: "焼く", meaningsFr: ["Griller"], readings: ["やく"], mnemonicFr: "GRILLER.", levelId: 18 },
    { word: "座る", meaningsFr: ["S'asseoir"], readings: ["すわる"], mnemonicFr: "S'ASSEOIR.", levelId: 18 },
    { word: "忘れる", meaningsFr: ["Oublier"], readings: ["わすれる"], mnemonicFr: "OUBLIER.", levelId: 18 },
    { word: "洗う", meaningsFr: ["Laver"], readings: ["あらう"], mnemonicFr: "LAVER.", levelId: 18 },
    { word: "可能", meaningsFr: ["Possible"], readings: ["かのう"], mnemonicFr: "POSSIBLE.", levelId: 18 },
    { word: "許す", meaningsFr: ["Permettre"], readings: ["ゆるす"], mnemonicFr: "PERMETTRE.", levelId: 18 },
    { word: "静か", meaningsFr: ["Calme"], readings: ["しずか"], mnemonicFr: "C'est CALME.", levelId: 18 },
    { word: "禁止", meaningsFr: ["Interdit"], readings: ["きんし"], mnemonicFr: "C'est INTERDIT.", levelId: 18 },
    { word: "煙", meaningsFr: ["Fumée"], readings: ["けむり"], mnemonicFr: "La FUMÉE.", levelId: 18 },
    { word: "禁煙", meaningsFr: ["Non-fumeur"], readings: ["きんえん"], mnemonicFr: "NON-FUMEUR.", levelId: 18 },
  ];

  for (const vocab of level18Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 18 complete!");

  // ============================================
  // LEVEL 19 - WaniKani Level 19
  // Kanji: 加節減順容布易財若詞昆閥歴舌冊宇宙忙履団暴混乱徒得改続連善絡比笛史
  // ============================================

  const level19Kanji = [
    { character: "加", meaningsFr: ["Ajouter"], readingsOn: ["カ"], readingsKun: ["くわ-える"], meaningMnemonicFr: "La force et la bouche - AJOUTER.", readingMnemonicFr: "Kuwaeru - AJOUTER !" },
    { character: "節", meaningsFr: ["Noeud", "Saison"], readingsOn: ["セツ"], readingsKun: ["ふし"], meaningMnemonicFr: "Le bambou et l'arrêter - un NOEUD.", readingMnemonicFr: "Setsu - une SAISON !" },
    { character: "減", meaningsFr: ["Diminuer"], readingsOn: ["ゲン"], readingsKun: ["へ-る"], meaningMnemonicFr: "L'eau et le gratter - DIMINUER.", readingMnemonicFr: "Heru - DIMINUER !" },
    { character: "順", meaningsFr: ["Ordre"], readingsOn: ["ジュン"], readingsKun: [], meaningMnemonicFr: "La rivière et la page - l'ORDRE.", readingMnemonicFr: "Jun - l'ORDRE !" },
    { character: "容", meaningsFr: ["Contenir"], readingsOn: ["ヨウ"], readingsKun: [], meaningMnemonicFr: "Le toit et la vallée - CONTENIR.", readingMnemonicFr: "You - CONTENIR !" },
    { character: "布", meaningsFr: ["Tissu"], readingsOn: ["フ"], readingsKun: ["ぬの"], meaningMnemonicFr: "Le drap et le père - le TISSU.", readingMnemonicFr: "Nuno - le TISSU !" },
    { character: "易", meaningsFr: ["Facile"], readingsOn: ["エキ", "イ"], readingsKun: ["やさ-しい"], meaningMnemonicFr: "Le soleil et le changement - FACILE.", readingMnemonicFr: "Yasashii - c'est FACILE !" },
    { character: "財", meaningsFr: ["Richesse"], readingsOn: ["ザイ"], readingsKun: [], meaningMnemonicFr: "Le coquillage et le talent - la RICHESSE.", readingMnemonicFr: "Zai - la RICHESSE !" },
    { character: "若", meaningsFr: ["Jeune"], readingsOn: ["ジャク"], readingsKun: ["わか-い"], meaningMnemonicFr: "L'herbe et la droite - JEUNE.", readingMnemonicFr: "Wakai - c'est JEUNE !" },
    { character: "歴", meaningsFr: ["Histoire"], readingsOn: ["レキ"], readingsKun: [], meaningMnemonicFr: "Le falaise et le riz - l'HISTOIRE.", readingMnemonicFr: "Reki - l'HISTOIRE !" },
    { character: "舌", meaningsFr: ["Langue"], readingsOn: ["ゼツ"], readingsKun: ["した"], meaningMnemonicFr: "Le mille et la bouche - la LANGUE.", readingMnemonicFr: "Shita - la LANGUE !" },
    { character: "宇", meaningsFr: ["Univers"], readingsOn: ["ウ"], readingsKun: [], meaningMnemonicFr: "Le toit et le bras - l'UNIVERS.", readingMnemonicFr: "U - l'UNIVERS !" },
    { character: "宙", meaningsFr: ["Espace"], readingsOn: ["チュウ"], readingsKun: [], meaningMnemonicFr: "Le toit et le centre - l'ESPACE.", readingMnemonicFr: "Chuu - l'ESPACE !" },
    { character: "忙", meaningsFr: ["Occupé"], readingsOn: ["ボウ"], readingsKun: ["いそが-しい"], meaningMnemonicFr: "Le coeur et le mourir - OCCUPÉ.", readingMnemonicFr: "Isogashii - c'est OCCUPÉ !" },
    { character: "団", meaningsFr: ["Groupe"], readingsOn: ["ダン"], readingsKun: [], meaningMnemonicFr: "L'enclos et le sol - un GROUPE.", readingMnemonicFr: "Dan - un GROUPE !" },
    { character: "暴", meaningsFr: ["Violence"], readingsOn: ["ボウ"], readingsKun: ["あば-れる"], meaningMnemonicFr: "Le soleil et le commun - la VIOLENCE.", readingMnemonicFr: "Bou - la VIOLENCE !" },
    { character: "混", meaningsFr: ["Mélanger"], readingsOn: ["コン"], readingsKun: ["ま-ぜる"], meaningMnemonicFr: "L'eau et le soleil - MÉLANGER.", readingMnemonicFr: "Mazeru - MÉLANGER !" },
    { character: "乱", meaningsFr: ["Désordre"], readingsOn: ["ラン"], readingsKun: ["みだ-れる"], meaningMnemonicFr: "La langue et le crochet - le DÉSORDRE.", readingMnemonicFr: "Ran - le DÉSORDRE !" },
    { character: "得", meaningsFr: ["Obtenir", "Gagner"], readingsOn: ["トク"], readingsKun: ["え-る"], meaningMnemonicFr: "Le chemin et le jour - OBTENIR.", readingMnemonicFr: "Eru - OBTENIR !" },
    { character: "改", meaningsFr: ["Réformer"], readingsOn: ["カイ"], readingsKun: ["あらた-める"], meaningMnemonicFr: "Le soi-même et le frapper - RÉFORMER.", readingMnemonicFr: "Aratameru - RÉFORMER !" },
    { character: "続", meaningsFr: ["Continuer"], readingsOn: ["ゾク"], readingsKun: ["つづ-く"], meaningMnemonicFr: "Le fil et le vendre - CONTINUER.", readingMnemonicFr: "Tsuzuku - CONTINUER !" },
    { character: "連", meaningsFr: ["Connecter"], readingsOn: ["レン"], readingsKun: ["つら-なる"], meaningMnemonicFr: "Le chemin et la voiture - CONNECTER.", readingMnemonicFr: "Ren - CONNECTER !" },
    { character: "善", meaningsFr: ["Bien", "Bon"], readingsOn: ["ゼン"], readingsKun: ["よ-い"], meaningMnemonicFr: "Le mouton et la parole - le BIEN.", readingMnemonicFr: "Zen - le BIEN !" },
    { character: "比", meaningsFr: ["Comparer"], readingsOn: ["ヒ"], readingsKun: ["くら-べる"], meaningMnemonicFr: "Deux personnes côte à côte - COMPARER.", readingMnemonicFr: "Kuraberu - COMPARER !" },
  ];

  for (const kanji of level19Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 19 },
      create: { ...kanji, levelId: 19 },
    });
  }

  const level19Vocab = [
    { word: "参加", meaningsFr: ["Participation"], readings: ["さんか"], mnemonicFr: "La PARTICIPATION.", levelId: 19 },
    { word: "季節", meaningsFr: ["Saison"], readings: ["きせつ"], mnemonicFr: "Une SAISON.", levelId: 19 },
    { word: "減る", meaningsFr: ["Diminuer"], readings: ["へる"], mnemonicFr: "DIMINUER.", levelId: 19 },
    { word: "順番", meaningsFr: ["Ordre"], readings: ["じゅんばん"], mnemonicFr: "L'ORDRE.", levelId: 19 },
    { word: "内容", meaningsFr: ["Contenu"], readings: ["ないよう"], mnemonicFr: "Le CONTENU.", levelId: 19 },
    { word: "布", meaningsFr: ["Tissu"], readings: ["ぬの"], mnemonicFr: "Le TISSU.", levelId: 19 },
    { word: "財布", meaningsFr: ["Portefeuille"], readings: ["さいふ"], mnemonicFr: "Un PORTEFEUILLE.", levelId: 19 },
    { word: "若い", meaningsFr: ["Jeune"], readings: ["わかい"], mnemonicFr: "C'est JEUNE.", levelId: 19 },
    { word: "歴史", meaningsFr: ["Histoire"], readings: ["れきし"], mnemonicFr: "L'HISTOIRE.", levelId: 19 },
    { word: "舌", meaningsFr: ["Langue"], readings: ["した"], mnemonicFr: "La LANGUE.", levelId: 19 },
    { word: "宇宙", meaningsFr: ["Univers"], readings: ["うちゅう"], mnemonicFr: "L'UNIVERS.", levelId: 19 },
    { word: "忙しい", meaningsFr: ["Occupé"], readings: ["いそがしい"], mnemonicFr: "C'est OCCUPÉ.", levelId: 19 },
    { word: "集団", meaningsFr: ["Groupe"], readings: ["しゅうだん"], mnemonicFr: "Un GROUPE.", levelId: 19 },
    { word: "暴力", meaningsFr: ["Violence"], readings: ["ぼうりょく"], mnemonicFr: "La VIOLENCE.", levelId: 19 },
    { word: "混乱", meaningsFr: ["Confusion"], readings: ["こんらん"], mnemonicFr: "La CONFUSION.", levelId: 19 },
    { word: "得る", meaningsFr: ["Obtenir"], readings: ["える"], mnemonicFr: "OBTENIR.", levelId: 19 },
    { word: "改善", meaningsFr: ["Amélioration"], readings: ["かいぜん"], mnemonicFr: "L'AMÉLIORATION.", levelId: 19 },
    { word: "続く", meaningsFr: ["Continuer"], readings: ["つづく"], mnemonicFr: "CONTINUER.", levelId: 19 },
    { word: "連絡", meaningsFr: ["Contact"], readings: ["れんらく"], mnemonicFr: "Le CONTACT.", levelId: 19 },
    { word: "比べる", meaningsFr: ["Comparer"], readings: ["くらべる"], mnemonicFr: "COMPARER.", levelId: 19 },
  ];

  for (const vocab of level19Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 19 complete!");

  // ============================================
  // LEVEL 20 - WaniKani Level 20
  // Kanji: 困災機率飛害余難妨被裕震尻尾械確嫌個圧在夢産倒臭厚妻議犯罪防穴論経
  // ============================================

  const level20Kanji = [
    { character: "困", meaningsFr: ["Être en difficulté"], readingsOn: ["コン"], readingsKun: ["こま-る"], meaningMnemonicFr: "L'enclos et l'arbre - être en DIFFICULTÉ.", readingMnemonicFr: "Komaru - être en DIFFICULTÉ !" },
    { character: "災", meaningsFr: ["Désastre"], readingsOn: ["サイ"], readingsKun: ["わざわ-い"], meaningMnemonicFr: "Le fleuve et le feu - un DÉSASTRE.", readingMnemonicFr: "Sai - un DÉSASTRE !" },
    { character: "機", meaningsFr: ["Machine", "Occasion"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le tissage - une MACHINE.", readingMnemonicFr: "Ki - une MACHINE !" },
    { character: "飛", meaningsFr: ["Voler"], readingsOn: ["ヒ"], readingsKun: ["と-ぶ"], meaningMnemonicFr: "L'aile qui s'envole - VOLER.", readingMnemonicFr: "Tobu - VOLER !" },
    { character: "害", meaningsFr: ["Dommage"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "Le toit et la bouche - le DOMMAGE.", readingMnemonicFr: "Gai - le DOMMAGE !" },
    { character: "余", meaningsFr: ["Extra", "Reste"], readingsOn: ["ヨ"], readingsKun: ["あま-る"], meaningMnemonicFr: "Le toit et le bois - l'EXTRA.", readingMnemonicFr: "Amaru - le RESTE !" },
    { character: "難", meaningsFr: ["Difficile"], readingsOn: ["ナン"], readingsKun: ["むずか-しい"], meaningMnemonicFr: "Le difficile et l'oiseau - DIFFICILE.", readingMnemonicFr: "Muzukashii - c'est DIFFICILE !" },
    { character: "震", meaningsFr: ["Trembler"], readingsOn: ["シン"], readingsKun: ["ふる-える"], meaningMnemonicFr: "La pluie et le dragon - TREMBLER.", readingMnemonicFr: "Furueru - TREMBLER !" },
    { character: "確", meaningsFr: ["Certain"], readingsOn: ["カク"], readingsKun: ["たし-か"], meaningMnemonicFr: "La pierre et l'oiseau - CERTAIN.", readingMnemonicFr: "Tashika - c'est CERTAIN !" },
    { character: "嫌", meaningsFr: ["Détester"], readingsOn: ["ケン"], readingsKun: ["きら-う"], meaningMnemonicFr: "La femme et le soupçon - DÉTESTER.", readingMnemonicFr: "Kirau - DÉTESTER !" },
    { character: "個", meaningsFr: ["Individuel"], readingsOn: ["コ"], readingsKun: [], meaningMnemonicFr: "La personne et le solide - INDIVIDUEL.", readingMnemonicFr: "Ko - INDIVIDUEL !" },
    { character: "夢", meaningsFr: ["Rêve"], readingsOn: ["ム"], readingsKun: ["ゆめ"], meaningMnemonicFr: "L'herbe et le soir - un RÊVE.", readingMnemonicFr: "Yume - un RÊVE !" },
    { character: "産", meaningsFr: ["Produire", "Naissance"], readingsOn: ["サン"], readingsKun: ["う-む"], meaningMnemonicFr: "La falaise et la vie - PRODUIRE.", readingMnemonicFr: "San - PRODUIRE !" },
    { character: "倒", meaningsFr: ["Tomber", "Renverser"], readingsOn: ["トウ"], readingsKun: ["たお-れる"], meaningMnemonicFr: "La personne et le couteau - TOMBER.", readingMnemonicFr: "Taoreru - TOMBER !" },
    { character: "厚", meaningsFr: ["Épais"], readingsOn: ["コウ"], readingsKun: ["あつ-い"], meaningMnemonicFr: "La falaise et l'enfant - ÉPAIS.", readingMnemonicFr: "Atsui - c'est ÉPAIS !" },
    { character: "妻", meaningsFr: ["Épouse"], readingsOn: ["サイ"], readingsKun: ["つま"], meaningMnemonicFr: "Le dix et la femme - l'ÉPOUSE.", readingMnemonicFr: "Tsuma - l'ÉPOUSE !" },
    { character: "議", meaningsFr: ["Discussion"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "Les mots et le doute - la DISCUSSION.", readingMnemonicFr: "Gi - la DISCUSSION !" },
    { character: "犯", meaningsFr: ["Crime"], readingsOn: ["ハン"], readingsKun: ["おか-す"], meaningMnemonicFr: "Le chien et le dangereux - le CRIME.", readingMnemonicFr: "Han - le CRIME !" },
    { character: "罪", meaningsFr: ["Péché", "Crime"], readingsOn: ["ザイ"], readingsKun: ["つみ"], meaningMnemonicFr: "Le filet et le non - le PÉCHÉ.", readingMnemonicFr: "Tsumi - le CRIME !" },
    { character: "防", meaningsFr: ["Défendre"], readingsOn: ["ボウ"], readingsKun: ["ふせ-ぐ"], meaningMnemonicFr: "La colline et la direction - DÉFENDRE.", readingMnemonicFr: "Fusegu - DÉFENDRE !" },
    { character: "穴", meaningsFr: ["Trou"], readingsOn: ["ケツ"], readingsKun: ["あな"], meaningMnemonicFr: "Le toit et le huit - un TROU.", readingMnemonicFr: "Ana - un TROU !" },
    { character: "論", meaningsFr: ["Théorie"], readingsOn: ["ロン"], readingsKun: [], meaningMnemonicFr: "Les mots et l'ordre - la THÉORIE.", readingMnemonicFr: "Ron - la THÉORIE !" },
    { character: "経", meaningsFr: ["Passer", "Expérience"], readingsOn: ["ケイ"], readingsKun: ["へ-る"], meaningMnemonicFr: "Le fil et le léger - l'EXPÉRIENCE.", readingMnemonicFr: "Kei - l'EXPÉRIENCE !" },
  ];

  for (const kanji of level20Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 20 },
      create: { ...kanji, levelId: 20 },
    });
  }

  const level20Vocab = [
    { word: "困る", meaningsFr: ["Être en difficulté"], readings: ["こまる"], mnemonicFr: "Être en DIFFICULTÉ.", levelId: 20 },
    { word: "災害", meaningsFr: ["Désastre"], readings: ["さいがい"], mnemonicFr: "Un DÉSASTRE.", levelId: 20 },
    { word: "機会", meaningsFr: ["Occasion"], readings: ["きかい"], mnemonicFr: "Une OCCASION.", levelId: 20 },
    { word: "飛行機", meaningsFr: ["Avion"], readings: ["ひこうき"], mnemonicFr: "Un AVION.", levelId: 20 },
    { word: "飛ぶ", meaningsFr: ["Voler"], readings: ["とぶ"], mnemonicFr: "VOLER.", levelId: 20 },
    { word: "被害", meaningsFr: ["Dommage"], readings: ["ひがい"], mnemonicFr: "Le DOMMAGE.", levelId: 20 },
    { word: "難しい", meaningsFr: ["Difficile"], readings: ["むずかしい"], mnemonicFr: "C'est DIFFICILE.", levelId: 20 },
    { word: "地震", meaningsFr: ["Tremblement de terre"], readings: ["じしん"], mnemonicFr: "Un TREMBLEMENT DE TERRE.", levelId: 20 },
    { word: "確か", meaningsFr: ["Certain"], readings: ["たしか"], mnemonicFr: "C'est CERTAIN.", levelId: 20 },
    { word: "嫌い", meaningsFr: ["Détester"], readings: ["きらい"], mnemonicFr: "DÉTESTER.", levelId: 20 },
    { word: "個人", meaningsFr: ["Individu"], readings: ["こじん"], mnemonicFr: "Un INDIVIDU.", levelId: 20 },
    { word: "夢", meaningsFr: ["Rêve"], readings: ["ゆめ"], mnemonicFr: "Un RÊVE.", levelId: 20 },
    { word: "生産", meaningsFr: ["Production"], readings: ["せいさん"], mnemonicFr: "La PRODUCTION.", levelId: 20 },
    { word: "倒れる", meaningsFr: ["Tomber"], readings: ["たおれる"], mnemonicFr: "TOMBER.", levelId: 20 },
    { word: "厚い", meaningsFr: ["Épais"], readings: ["あつい"], mnemonicFr: "C'est ÉPAIS.", levelId: 20 },
    { word: "妻", meaningsFr: ["Épouse"], readings: ["つま"], mnemonicFr: "L'ÉPOUSE.", levelId: 20 },
    { word: "会議", meaningsFr: ["Réunion"], readings: ["かいぎ"], mnemonicFr: "Une RÉUNION.", levelId: 20 },
    { word: "犯罪", meaningsFr: ["Crime"], readings: ["はんざい"], mnemonicFr: "Un CRIME.", levelId: 20 },
    { word: "予防", meaningsFr: ["Prévention"], readings: ["よぼう"], mnemonicFr: "La PRÉVENTION.", levelId: 20 },
    { word: "穴", meaningsFr: ["Trou"], readings: ["あな"], mnemonicFr: "Un TROU.", levelId: 20 },
    { word: "理論", meaningsFr: ["Théorie"], readings: ["りろん"], mnemonicFr: "La THÉORIE.", levelId: 20 },
    { word: "経験", meaningsFr: ["Expérience"], readings: ["けいけん"], mnemonicFr: "L'EXPÉRIENCE.", levelId: 20 },
    { word: "経済", meaningsFr: ["Économie"], readings: ["けいざい"], mnemonicFr: "L'ÉCONOMIE.", levelId: 20 },
  ];

  for (const vocab of level20Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 20 complete!");
  console.log("Seeding levels 11-20 complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
