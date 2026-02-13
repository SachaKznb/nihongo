import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding supplementary vocabulary to levels 1-10...");

  // ============================================
  // LEVEL 1 - Supplementary Vocabulary
  // Base kanji: 一 二 三 四 五 六 七 八 九 十 人 大 小 中 山 川 日 月 火 水 木 金 土
  // ============================================

  const level1Vocab = [
    // 一 - Additional
    { word: "一つ", meaningsFr: ["Un (compteur)"], readings: ["ひとつ"], mnemonicFr: "UN objet.", levelId: 1 },
    { word: "一人", meaningsFr: ["Une personne", "Seul"], readings: ["ひとり"], mnemonicFr: "UNE PERSONNE seule.", levelId: 1 },
    { word: "一日", meaningsFr: ["Premier jour", "Un jour"], readings: ["ついたち", "いちにち"], mnemonicFr: "Le PREMIER JOUR du mois.", levelId: 1 },
    { word: "一月", meaningsFr: ["Janvier"], readings: ["いちがつ"], mnemonicFr: "JANVIER, premier mois.", levelId: 1 },
    { word: "一番", meaningsFr: ["Numéro un", "Le meilleur"], readings: ["いちばん"], mnemonicFr: "Le NUMÉRO UN.", levelId: 1 },
    { word: "一生", meaningsFr: ["Toute la vie"], readings: ["いっしょう"], mnemonicFr: "TOUTE LA VIE.", levelId: 1 },
    { word: "一緒", meaningsFr: ["Ensemble"], readings: ["いっしょ"], mnemonicFr: "ENSEMBLE.", levelId: 1 },
    { word: "一度", meaningsFr: ["Une fois"], readings: ["いちど"], mnemonicFr: "UNE FOIS.", levelId: 1 },
    { word: "一般", meaningsFr: ["Général", "Ordinaire"], readings: ["いっぱん"], mnemonicFr: "En GÉNÉRAL.", levelId: 1 },
    { word: "統一", meaningsFr: ["Unification"], readings: ["とういつ"], mnemonicFr: "L'UNIFICATION.", levelId: 1 },
    // 二 - Additional
    { word: "二つ", meaningsFr: ["Deux (compteur)"], readings: ["ふたつ"], mnemonicFr: "DEUX objets.", levelId: 1 },
    { word: "二人", meaningsFr: ["Deux personnes"], readings: ["ふたり"], mnemonicFr: "DEUX PERSONNES.", levelId: 1 },
    { word: "二月", meaningsFr: ["Février"], readings: ["にがつ"], mnemonicFr: "FÉVRIER.", levelId: 1 },
    { word: "二度", meaningsFr: ["Deux fois"], readings: ["にど"], mnemonicFr: "DEUX FOIS.", levelId: 1 },
    { word: "二十", meaningsFr: ["Vingt"], readings: ["にじゅう"], mnemonicFr: "VINGT.", levelId: 1 },
    { word: "二十歳", meaningsFr: ["Vingt ans"], readings: ["はたち"], mnemonicFr: "VINGT ANS.", levelId: 1 },
    // 三 - Additional
    { word: "三つ", meaningsFr: ["Trois (compteur)"], readings: ["みっつ"], mnemonicFr: "TROIS objets.", levelId: 1 },
    { word: "三人", meaningsFr: ["Trois personnes"], readings: ["さんにん"], mnemonicFr: "TROIS PERSONNES.", levelId: 1 },
    { word: "三月", meaningsFr: ["Mars"], readings: ["さんがつ"], mnemonicFr: "MARS.", levelId: 1 },
    { word: "三角", meaningsFr: ["Triangle"], readings: ["さんかく"], mnemonicFr: "Un TRIANGLE.", levelId: 1 },
    // 四 - Additional
    { word: "四つ", meaningsFr: ["Quatre (compteur)"], readings: ["よっつ"], mnemonicFr: "QUATRE objets.", levelId: 1 },
    { word: "四人", meaningsFr: ["Quatre personnes"], readings: ["よにん"], mnemonicFr: "QUATRE PERSONNES.", levelId: 1 },
    { word: "四月", meaningsFr: ["Avril"], readings: ["しがつ"], mnemonicFr: "AVRIL.", levelId: 1 },
    { word: "四季", meaningsFr: ["Quatre saisons"], readings: ["しき"], mnemonicFr: "Les QUATRE SAISONS.", levelId: 1 },
    // 五 - Additional
    { word: "五つ", meaningsFr: ["Cinq (compteur)"], readings: ["いつつ"], mnemonicFr: "CINQ objets.", levelId: 1 },
    { word: "五人", meaningsFr: ["Cinq personnes"], readings: ["ごにん"], mnemonicFr: "CINQ PERSONNES.", levelId: 1 },
    { word: "五月", meaningsFr: ["Mai"], readings: ["ごがつ"], mnemonicFr: "MAI.", levelId: 1 },
    { word: "五十", meaningsFr: ["Cinquante"], readings: ["ごじゅう"], mnemonicFr: "CINQUANTE.", levelId: 1 },
    // 六 - Additional
    { word: "六つ", meaningsFr: ["Six (compteur)"], readings: ["むっつ"], mnemonicFr: "SIX objets.", levelId: 1 },
    { word: "六月", meaningsFr: ["Juin"], readings: ["ろくがつ"], mnemonicFr: "JUIN.", levelId: 1 },
    // 七 - Additional
    { word: "七つ", meaningsFr: ["Sept (compteur)"], readings: ["ななつ"], mnemonicFr: "SEPT objets.", levelId: 1 },
    { word: "七月", meaningsFr: ["Juillet"], readings: ["しちがつ"], mnemonicFr: "JUILLET.", levelId: 1 },
    { word: "七夕", meaningsFr: ["Tanabata"], readings: ["たなばた"], mnemonicFr: "La fête de TANABATA.", levelId: 1 },
    // 八 - Additional
    { word: "八つ", meaningsFr: ["Huit (compteur)"], readings: ["やっつ"], mnemonicFr: "HUIT objets.", levelId: 1 },
    { word: "八月", meaningsFr: ["Août"], readings: ["はちがつ"], mnemonicFr: "AOÛT.", levelId: 1 },
    { word: "八百屋", meaningsFr: ["Marchand de légumes"], readings: ["やおや"], mnemonicFr: "Le MARCHAND DE LÉGUMES.", levelId: 1 },
    // 九 - Additional
    { word: "九つ", meaningsFr: ["Neuf (compteur)"], readings: ["ここのつ"], mnemonicFr: "NEUF objets.", levelId: 1 },
    { word: "九月", meaningsFr: ["Septembre"], readings: ["くがつ"], mnemonicFr: "SEPTEMBRE.", levelId: 1 },
    { word: "九州", meaningsFr: ["Kyushu"], readings: ["きゅうしゅう"], mnemonicFr: "L'île de KYUSHU.", levelId: 1 },
    // 十 - Additional
    { word: "十", meaningsFr: ["Dix"], readings: ["とお"], mnemonicFr: "DIX (kun'yomi).", levelId: 1 },
    { word: "十月", meaningsFr: ["Octobre"], readings: ["じゅうがつ"], mnemonicFr: "OCTOBRE.", levelId: 1 },
    { word: "十分", meaningsFr: ["Suffisant", "Dix minutes"], readings: ["じゅうぶん", "じっぷん"], mnemonicFr: "C'est SUFFISANT.", levelId: 1 },
    // 人 - Additional
    { word: "人間", meaningsFr: ["Être humain"], readings: ["にんげん"], mnemonicFr: "L'ÊTRE HUMAIN.", levelId: 1 },
    { word: "人口", meaningsFr: ["Population"], readings: ["じんこう"], mnemonicFr: "La POPULATION.", levelId: 1 },
    { word: "人生", meaningsFr: ["Vie"], readings: ["じんせい"], mnemonicFr: "La VIE humaine.", levelId: 1 },
    { word: "人気", meaningsFr: ["Popularité"], readings: ["にんき"], mnemonicFr: "La POPULARITÉ.", levelId: 1 },
    { word: "大人", meaningsFr: ["Adulte"], readings: ["おとな"], mnemonicFr: "Un ADULTE.", levelId: 1 },
    { word: "日本人", meaningsFr: ["Japonais"], readings: ["にほんじん"], mnemonicFr: "Un JAPONAIS.", levelId: 1 },
    { word: "外国人", meaningsFr: ["Étranger"], readings: ["がいこくじん"], mnemonicFr: "Un ÉTRANGER.", levelId: 1 },
    // 大 - Additional
    { word: "大きい", meaningsFr: ["Grand"], readings: ["おおきい"], mnemonicFr: "C'est GRAND.", levelId: 1 },
    { word: "大きさ", meaningsFr: ["Taille"], readings: ["おおきさ"], mnemonicFr: "La TAILLE.", levelId: 1 },
    { word: "大学", meaningsFr: ["Université"], readings: ["だいがく"], mnemonicFr: "L'UNIVERSITÉ.", levelId: 1 },
    { word: "大切", meaningsFr: ["Important"], readings: ["たいせつ"], mnemonicFr: "C'est IMPORTANT.", levelId: 1 },
    { word: "大変", meaningsFr: ["Très", "Difficile"], readings: ["たいへん"], mnemonicFr: "C'est TRÈS difficile.", levelId: 1 },
    { word: "大丈夫", meaningsFr: ["Ça va", "Pas de problème"], readings: ["だいじょうぶ"], mnemonicFr: "ÇA VA, pas de problème.", levelId: 1 },
    { word: "大事", meaningsFr: ["Important"], readings: ["だいじ"], mnemonicFr: "C'est IMPORTANT.", levelId: 1 },
    { word: "大体", meaningsFr: ["À peu près"], readings: ["だいたい"], mnemonicFr: "À PEU PRÈS.", levelId: 1 },
    // 小 - Additional
    { word: "小さい", meaningsFr: ["Petit"], readings: ["ちいさい"], mnemonicFr: "C'est PETIT.", levelId: 1 },
    { word: "小さな", meaningsFr: ["Petit"], readings: ["ちいさな"], mnemonicFr: "Un PETIT...", levelId: 1 },
    { word: "小学校", meaningsFr: ["École primaire"], readings: ["しょうがっこう"], mnemonicFr: "L'ÉCOLE PRIMAIRE.", levelId: 1 },
    { word: "小説", meaningsFr: ["Roman"], readings: ["しょうせつ"], mnemonicFr: "Un ROMAN.", levelId: 1 },
    { word: "小鳥", meaningsFr: ["Petit oiseau"], readings: ["ことり"], mnemonicFr: "Un PETIT OISEAU.", levelId: 1 },
    // 中 - Additional
    { word: "中", meaningsFr: ["Intérieur", "Milieu"], readings: ["なか"], mnemonicFr: "À l'INTÉRIEUR.", levelId: 1 },
    { word: "中学校", meaningsFr: ["Collège"], readings: ["ちゅうがっこう"], mnemonicFr: "Le COLLÈGE.", levelId: 1 },
    { word: "中国", meaningsFr: ["Chine"], readings: ["ちゅうごく"], mnemonicFr: "La CHINE.", levelId: 1 },
    { word: "中心", meaningsFr: ["Centre"], readings: ["ちゅうしん"], mnemonicFr: "Le CENTRE.", levelId: 1 },
    { word: "中止", meaningsFr: ["Annulation"], readings: ["ちゅうし"], mnemonicFr: "L'ANNULATION.", levelId: 1 },
    { word: "途中", meaningsFr: ["En chemin"], readings: ["とちゅう"], mnemonicFr: "EN CHEMIN.", levelId: 1 },
    { word: "集中", meaningsFr: ["Concentration"], readings: ["しゅうちゅう"], mnemonicFr: "La CONCENTRATION.", levelId: 1 },
    // 山 - Additional
    { word: "山", meaningsFr: ["Montagne"], readings: ["やま"], mnemonicFr: "La MONTAGNE.", levelId: 1 },
    { word: "富士山", meaningsFr: ["Mont Fuji"], readings: ["ふじさん"], mnemonicFr: "Le MONT FUJI.", levelId: 1 },
    { word: "山登り", meaningsFr: ["Randonnée"], readings: ["やまのぼり"], mnemonicFr: "La RANDONNÉE en montagne.", levelId: 1 },
    { word: "火山", meaningsFr: ["Volcan"], readings: ["かざん"], mnemonicFr: "Un VOLCAN.", levelId: 1 },
    // 川 - Additional
    { word: "川", meaningsFr: ["Rivière"], readings: ["かわ"], mnemonicFr: "La RIVIÈRE.", levelId: 1 },
    { word: "河川", meaningsFr: ["Cours d'eau"], readings: ["かせん"], mnemonicFr: "Un COURS D'EAU.", levelId: 1 },
    // 日 - Additional
    { word: "日", meaningsFr: ["Jour", "Soleil"], readings: ["ひ"], mnemonicFr: "Le JOUR, le SOLEIL.", levelId: 1 },
    { word: "日本", meaningsFr: ["Japon"], readings: ["にほん", "にっぽん"], mnemonicFr: "Le JAPON.", levelId: 1 },
    { word: "日曜日", meaningsFr: ["Dimanche"], readings: ["にちようび"], mnemonicFr: "DIMANCHE.", levelId: 1 },
    { word: "毎日", meaningsFr: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR.", levelId: 1 },
    { word: "今日", meaningsFr: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "AUJOURD'HUI.", levelId: 1 },
    { word: "明日", meaningsFr: ["Demain"], readings: ["あした", "あす"], mnemonicFr: "DEMAIN.", levelId: 1 },
    { word: "昨日", meaningsFr: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER.", levelId: 1 },
    { word: "休日", meaningsFr: ["Jour de repos"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS.", levelId: 1 },
    { word: "記念日", meaningsFr: ["Anniversaire"], readings: ["きねんび"], mnemonicFr: "ANNIVERSAIRE.", levelId: 1 },
    // 月 - Additional
    { word: "月", meaningsFr: ["Lune", "Mois"], readings: ["つき"], mnemonicFr: "La LUNE.", levelId: 1 },
    { word: "月曜日", meaningsFr: ["Lundi"], readings: ["げつようび"], mnemonicFr: "LUNDI.", levelId: 1 },
    { word: "今月", meaningsFr: ["Ce mois"], readings: ["こんげつ"], mnemonicFr: "CE MOIS.", levelId: 1 },
    { word: "先月", meaningsFr: ["Le mois dernier"], readings: ["せんげつ"], mnemonicFr: "LE MOIS DERNIER.", levelId: 1 },
    { word: "来月", meaningsFr: ["Le mois prochain"], readings: ["らいげつ"], mnemonicFr: "LE MOIS PROCHAIN.", levelId: 1 },
    { word: "毎月", meaningsFr: ["Chaque mois"], readings: ["まいつき"], mnemonicFr: "CHAQUE MOIS.", levelId: 1 },
    // 火 - Additional
    { word: "火", meaningsFr: ["Feu"], readings: ["ひ"], mnemonicFr: "Le FEU.", levelId: 1 },
    { word: "火曜日", meaningsFr: ["Mardi"], readings: ["かようび"], mnemonicFr: "MARDI.", levelId: 1 },
    { word: "火事", meaningsFr: ["Incendie"], readings: ["かじ"], mnemonicFr: "Un INCENDIE.", levelId: 1 },
    { word: "花火", meaningsFr: ["Feux d'artifice"], readings: ["はなび"], mnemonicFr: "Des FEUX D'ARTIFICE.", levelId: 1 },
    // 水 - Additional
    { word: "水", meaningsFr: ["Eau"], readings: ["みず"], mnemonicFr: "L'EAU.", levelId: 1 },
    { word: "水曜日", meaningsFr: ["Mercredi"], readings: ["すいようび"], mnemonicFr: "MERCREDI.", levelId: 1 },
    { word: "水泳", meaningsFr: ["Natation"], readings: ["すいえい"], mnemonicFr: "La NATATION.", levelId: 1 },
    { word: "水道", meaningsFr: ["Eau courante"], readings: ["すいどう"], mnemonicFr: "L'EAU COURANTE.", levelId: 1 },
    { word: "洪水", meaningsFr: ["Inondation"], readings: ["こうずい"], mnemonicFr: "Une INONDATION.", levelId: 1 },
    // 木 - Additional
    { word: "木", meaningsFr: ["Arbre", "Bois"], readings: ["き"], mnemonicFr: "Un ARBRE.", levelId: 1 },
    { word: "木曜日", meaningsFr: ["Jeudi"], readings: ["もくようび"], mnemonicFr: "JEUDI.", levelId: 1 },
    { word: "木造", meaningsFr: ["En bois"], readings: ["もくぞう"], mnemonicFr: "Construction EN BOIS.", levelId: 1 },
    { word: "大木", meaningsFr: ["Grand arbre"], readings: ["たいぼく"], mnemonicFr: "Un GRAND ARBRE.", levelId: 1 },
    // 金 - Additional
    { word: "金", meaningsFr: ["Or", "Argent"], readings: ["かね"], mnemonicFr: "L'OR, l'ARGENT.", levelId: 1 },
    { word: "金曜日", meaningsFr: ["Vendredi"], readings: ["きんようび"], mnemonicFr: "VENDREDI.", levelId: 1 },
    { word: "お金", meaningsFr: ["Argent"], readings: ["おかね"], mnemonicFr: "L'ARGENT.", levelId: 1 },
    { word: "金持ち", meaningsFr: ["Riche"], readings: ["かねもち"], mnemonicFr: "Une personne RICHE.", levelId: 1 },
    { word: "金額", meaningsFr: ["Montant"], readings: ["きんがく"], mnemonicFr: "Le MONTANT.", levelId: 1 },
    { word: "料金", meaningsFr: ["Tarif"], readings: ["りょうきん"], mnemonicFr: "Le TARIF.", levelId: 1 },
    // 土 - Additional
    { word: "土", meaningsFr: ["Terre", "Sol"], readings: ["つち"], mnemonicFr: "La TERRE.", levelId: 1 },
    { word: "土曜日", meaningsFr: ["Samedi"], readings: ["どようび"], mnemonicFr: "SAMEDI.", levelId: 1 },
    { word: "土地", meaningsFr: ["Terrain"], readings: ["とち"], mnemonicFr: "Un TERRAIN.", levelId: 1 },
    { word: "土産", meaningsFr: ["Souvenir"], readings: ["みやげ"], mnemonicFr: "Un SOUVENIR.", levelId: 1 },
  ];

  for (const vocab of level1Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 1 supplementary vocab complete! Added", level1Vocab.length, "words");

  // ============================================
  // LEVEL 2 - Supplementary Vocabulary
  // ============================================

  const level2Vocab = [
    // 上 vocabulary
    { word: "上", meaningsFr: ["Dessus", "Haut"], readings: ["うえ"], mnemonicFr: "Le DESSUS.", levelId: 2 },
    { word: "上がる", meaningsFr: ["Monter"], readings: ["あがる"], mnemonicFr: "MONTER les escaliers.", levelId: 2 },
    { word: "上げる", meaningsFr: ["Lever", "Donner"], readings: ["あげる"], mnemonicFr: "LEVER la main.", levelId: 2 },
    { word: "上手", meaningsFr: ["Habile"], readings: ["じょうず"], mnemonicFr: "Être HABILE.", levelId: 2 },
    { word: "上司", meaningsFr: ["Supérieur"], readings: ["じょうし"], mnemonicFr: "Le SUPÉRIEUR hiérarchique.", levelId: 2 },
    { word: "以上", meaningsFr: ["Plus de"], readings: ["いじょう"], mnemonicFr: "PLUS DE 10 ans.", levelId: 2 },
    { word: "向上", meaningsFr: ["Amélioration"], readings: ["こうじょう"], mnemonicFr: "L'AMÉLIORATION continue.", levelId: 2 },
    // 下 vocabulary
    { word: "下", meaningsFr: ["Dessous", "Bas"], readings: ["した"], mnemonicFr: "Le DESSOUS.", levelId: 2 },
    { word: "下がる", meaningsFr: ["Descendre"], readings: ["さがる"], mnemonicFr: "DESCENDRE.", levelId: 2 },
    { word: "下げる", meaningsFr: ["Baisser"], readings: ["さげる"], mnemonicFr: "BAISSER le prix.", levelId: 2 },
    { word: "下手", meaningsFr: ["Maladroit"], readings: ["へた"], mnemonicFr: "Être MALADROIT.", levelId: 2 },
    { word: "地下", meaningsFr: ["Sous-sol"], readings: ["ちか"], mnemonicFr: "Le SOUS-SOL.", levelId: 2 },
    { word: "以下", meaningsFr: ["Moins de"], readings: ["いか"], mnemonicFr: "MOINS DE.", levelId: 2 },
    { word: "下着", meaningsFr: ["Sous-vêtements"], readings: ["したぎ"], mnemonicFr: "Les SOUS-VÊTEMENTS.", levelId: 2 },
    // 左 vocabulary
    { word: "左", meaningsFr: ["Gauche"], readings: ["ひだり"], mnemonicFr: "La GAUCHE.", levelId: 2 },
    { word: "左右", meaningsFr: ["Gauche et droite"], readings: ["さゆう"], mnemonicFr: "GAUCHE ET DROITE.", levelId: 2 },
    { word: "左手", meaningsFr: ["Main gauche"], readings: ["ひだりて"], mnemonicFr: "La MAIN GAUCHE.", levelId: 2 },
    // 右 vocabulary
    { word: "右", meaningsFr: ["Droite"], readings: ["みぎ"], mnemonicFr: "La DROITE.", levelId: 2 },
    { word: "右手", meaningsFr: ["Main droite"], readings: ["みぎて"], mnemonicFr: "La MAIN DROITE.", levelId: 2 },
    // 口 vocabulary
    { word: "口", meaningsFr: ["Bouche"], readings: ["くち"], mnemonicFr: "La BOUCHE.", levelId: 2 },
    { word: "入口", meaningsFr: ["Entrée"], readings: ["いりぐち"], mnemonicFr: "L'ENTRÉE.", levelId: 2 },
    { word: "出口", meaningsFr: ["Sortie"], readings: ["でぐち"], mnemonicFr: "La SORTIE.", levelId: 2 },
    { word: "窓口", meaningsFr: ["Guichet"], readings: ["まどぐち"], mnemonicFr: "Le GUICHET.", levelId: 2 },
    { word: "人口", meaningsFr: ["Population"], readings: ["じんこう"], mnemonicFr: "La POPULATION.", levelId: 2 },
    // 目 vocabulary
    { word: "目", meaningsFr: ["Œil"], readings: ["め"], mnemonicFr: "L'ŒIL.", levelId: 2 },
    { word: "目的", meaningsFr: ["But"], readings: ["もくてき"], mnemonicFr: "Le BUT.", levelId: 2 },
    { word: "目標", meaningsFr: ["Objectif"], readings: ["もくひょう"], mnemonicFr: "L'OBJECTIF.", levelId: 2 },
    { word: "注目", meaningsFr: ["Attention"], readings: ["ちゅうもく"], mnemonicFr: "L'ATTENTION.", levelId: 2 },
    { word: "一番目", meaningsFr: ["Premier"], readings: ["いちばんめ"], mnemonicFr: "Le PREMIER.", levelId: 2 },
    // 耳 vocabulary
    { word: "耳", meaningsFr: ["Oreille"], readings: ["みみ"], mnemonicFr: "L'OREILLE.", levelId: 2 },
    { word: "耳鳴り", meaningsFr: ["Acouphènes"], readings: ["みみなり"], mnemonicFr: "Les ACOUPHÈNES.", levelId: 2 },
    // 手 vocabulary
    { word: "手", meaningsFr: ["Main"], readings: ["て"], mnemonicFr: "La MAIN.", levelId: 2 },
    { word: "手紙", meaningsFr: ["Lettre"], readings: ["てがみ"], mnemonicFr: "Une LETTRE.", levelId: 2 },
    { word: "手伝う", meaningsFr: ["Aider"], readings: ["てつだう"], mnemonicFr: "AIDER quelqu'un.", levelId: 2 },
    { word: "選手", meaningsFr: ["Athlète"], readings: ["せんしゅ"], mnemonicFr: "Un ATHLÈTE.", levelId: 2 },
    { word: "歌手", meaningsFr: ["Chanteur"], readings: ["かしゅ"], mnemonicFr: "Un CHANTEUR.", levelId: 2 },
    { word: "相手", meaningsFr: ["Partenaire"], readings: ["あいて"], mnemonicFr: "Le PARTENAIRE.", levelId: 2 },
    { word: "手術", meaningsFr: ["Opération"], readings: ["しゅじゅつ"], mnemonicFr: "Une OPÉRATION chirurgicale.", levelId: 2 },
    // 足 vocabulary
    { word: "足", meaningsFr: ["Pied", "Jambe"], readings: ["あし"], mnemonicFr: "Le PIED.", levelId: 2 },
    { word: "足りる", meaningsFr: ["Suffire"], readings: ["たりる"], mnemonicFr: "SUFFIRE.", levelId: 2 },
    { word: "不足", meaningsFr: ["Manque"], readings: ["ふそく"], mnemonicFr: "Le MANQUE.", levelId: 2 },
    { word: "満足", meaningsFr: ["Satisfaction"], readings: ["まんぞく"], mnemonicFr: "La SATISFACTION.", levelId: 2 },
    // 力 vocabulary
    { word: "力", meaningsFr: ["Force"], readings: ["ちから"], mnemonicFr: "La FORCE.", levelId: 2 },
    { word: "力強い", meaningsFr: ["Puissant"], readings: ["ちからづよい"], mnemonicFr: "PUISSANT.", levelId: 2 },
    { word: "努力", meaningsFr: ["Effort"], readings: ["どりょく"], mnemonicFr: "L'EFFORT.", levelId: 2 },
    { word: "能力", meaningsFr: ["Capacité"], readings: ["のうりょく"], mnemonicFr: "La CAPACITÉ.", levelId: 2 },
    { word: "協力", meaningsFr: ["Coopération"], readings: ["きょうりょく"], mnemonicFr: "La COOPÉRATION.", levelId: 2 },
    { word: "体力", meaningsFr: ["Endurance"], readings: ["たいりょく"], mnemonicFr: "L'ENDURANCE.", levelId: 2 },
    { word: "魅力", meaningsFr: ["Charme"], readings: ["みりょく"], mnemonicFr: "Le CHARME.", levelId: 2 },
    // 入 vocabulary
    { word: "入る", meaningsFr: ["Entrer"], readings: ["はいる"], mnemonicFr: "ENTRER.", levelId: 2 },
    { word: "入れる", meaningsFr: ["Mettre dedans"], readings: ["いれる"], mnemonicFr: "METTRE DEDANS.", levelId: 2 },
    { word: "入学", meaningsFr: ["Entrée à l'école"], readings: ["にゅうがく"], mnemonicFr: "L'ENTRÉE À L'ÉCOLE.", levelId: 2 },
    { word: "入院", meaningsFr: ["Hospitalisation"], readings: ["にゅういん"], mnemonicFr: "L'HOSPITALISATION.", levelId: 2 },
    { word: "輸入", meaningsFr: ["Importation"], readings: ["ゆにゅう"], mnemonicFr: "L'IMPORTATION.", levelId: 2 },
    { word: "収入", meaningsFr: ["Revenu"], readings: ["しゅうにゅう"], mnemonicFr: "Le REVENU.", levelId: 2 },
    // 出 vocabulary
    { word: "出る", meaningsFr: ["Sortir"], readings: ["でる"], mnemonicFr: "SORTIR.", levelId: 2 },
    { word: "出す", meaningsFr: ["Sortir (transitif)"], readings: ["だす"], mnemonicFr: "SORTIR quelque chose.", levelId: 2 },
    { word: "出発", meaningsFr: ["Départ"], readings: ["しゅっぱつ"], mnemonicFr: "Le DÉPART.", levelId: 2 },
    { word: "出席", meaningsFr: ["Présence"], readings: ["しゅっせき"], mnemonicFr: "La PRÉSENCE.", levelId: 2 },
    { word: "輸出", meaningsFr: ["Exportation"], readings: ["ゆしゅつ"], mnemonicFr: "L'EXPORTATION.", levelId: 2 },
    { word: "提出", meaningsFr: ["Soumission"], readings: ["ていしゅつ"], mnemonicFr: "La SOUMISSION d'un document.", levelId: 2 },
    // 立 vocabulary
    { word: "立つ", meaningsFr: ["Se lever"], readings: ["たつ"], mnemonicFr: "SE LEVER.", levelId: 2 },
    { word: "立てる", meaningsFr: ["Dresser"], readings: ["たてる"], mnemonicFr: "DRESSER.", levelId: 2 },
    { word: "立場", meaningsFr: ["Position"], readings: ["たちば"], mnemonicFr: "La POSITION.", levelId: 2 },
    { word: "成立", meaningsFr: ["Établissement"], readings: ["せいりつ"], mnemonicFr: "L'ÉTABLISSEMENT.", levelId: 2 },
    { word: "独立", meaningsFr: ["Indépendance"], readings: ["どくりつ"], mnemonicFr: "L'INDÉPENDANCE.", levelId: 2 },
    { word: "国立", meaningsFr: ["National"], readings: ["こくりつ"], mnemonicFr: "NATIONAL.", levelId: 2 },
    // 休 vocabulary
    { word: "休む", meaningsFr: ["Se reposer"], readings: ["やすむ"], mnemonicFr: "SE REPOSER.", levelId: 2 },
    { word: "休み", meaningsFr: ["Repos", "Vacances"], readings: ["やすみ"], mnemonicFr: "Le REPOS.", levelId: 2 },
    { word: "休憩", meaningsFr: ["Pause"], readings: ["きゅうけい"], mnemonicFr: "Une PAUSE.", levelId: 2 },
    { word: "夏休み", meaningsFr: ["Vacances d'été"], readings: ["なつやすみ"], mnemonicFr: "Les VACANCES D'ÉTÉ.", levelId: 2 },
    // 先 vocabulary
    { word: "先", meaningsFr: ["Avant", "Devant"], readings: ["さき"], mnemonicFr: "DEVANT.", levelId: 2 },
    { word: "先生", meaningsFr: ["Professeur"], readings: ["せんせい"], mnemonicFr: "Le PROFESSEUR.", levelId: 2 },
    { word: "先週", meaningsFr: ["La semaine dernière"], readings: ["せんしゅう"], mnemonicFr: "LA SEMAINE DERNIÈRE.", levelId: 2 },
    { word: "先日", meaningsFr: ["L'autre jour"], readings: ["せんじつ"], mnemonicFr: "L'AUTRE JOUR.", levelId: 2 },
    { word: "先輩", meaningsFr: ["Aîné"], readings: ["せんぱい"], mnemonicFr: "L'AÎNÉ.", levelId: 2 },
    { word: "優先", meaningsFr: ["Priorité"], readings: ["ゆうせん"], mnemonicFr: "La PRIORITÉ.", levelId: 2 },
    // 生 vocabulary
    { word: "生きる", meaningsFr: ["Vivre"], readings: ["いきる"], mnemonicFr: "VIVRE.", levelId: 2 },
    { word: "生まれる", meaningsFr: ["Naître"], readings: ["うまれる"], mnemonicFr: "NAÎTRE.", levelId: 2 },
    { word: "生活", meaningsFr: ["Vie quotidienne"], readings: ["せいかつ"], mnemonicFr: "La VIE QUOTIDIENNE.", levelId: 2 },
    { word: "学生", meaningsFr: ["Étudiant"], readings: ["がくせい"], mnemonicFr: "Un ÉTUDIANT.", levelId: 2 },
    { word: "誕生", meaningsFr: ["Naissance"], readings: ["たんじょう"], mnemonicFr: "La NAISSANCE.", levelId: 2 },
    { word: "一生", meaningsFr: ["Toute la vie"], readings: ["いっしょう"], mnemonicFr: "TOUTE LA VIE.", levelId: 2 },
    { word: "生産", meaningsFr: ["Production"], readings: ["せいさん"], mnemonicFr: "La PRODUCTION.", levelId: 2 },
  ];

  for (const vocab of level2Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 2 supplementary vocab complete! Added", level2Vocab.length, "words");

  // ============================================
  // LEVEL 3 - Supplementary Vocabulary
  // ============================================

  const level3Vocab = [
    // 女 vocabulary
    { word: "女", meaningsFr: ["Femme"], readings: ["おんな"], mnemonicFr: "Une FEMME.", levelId: 3 },
    { word: "女の子", meaningsFr: ["Fille"], readings: ["おんなのこ"], mnemonicFr: "Une FILLE.", levelId: 3 },
    { word: "女性", meaningsFr: ["Femme (formel)"], readings: ["じょせい"], mnemonicFr: "Une FEMME (formel).", levelId: 3 },
    { word: "彼女", meaningsFr: ["Elle", "Petite amie"], readings: ["かのじょ"], mnemonicFr: "ELLE, sa PETITE AMIE.", levelId: 3 },
    { word: "女子", meaningsFr: ["Fille", "Femme"], readings: ["じょし"], mnemonicFr: "Les FILLES.", levelId: 3 },
    // 男 vocabulary
    { word: "男", meaningsFr: ["Homme"], readings: ["おとこ"], mnemonicFr: "Un HOMME.", levelId: 3 },
    { word: "男の子", meaningsFr: ["Garçon"], readings: ["おとこのこ"], mnemonicFr: "Un GARÇON.", levelId: 3 },
    { word: "男性", meaningsFr: ["Homme (formel)"], readings: ["だんせい"], mnemonicFr: "Un HOMME (formel).", levelId: 3 },
    { word: "男子", meaningsFr: ["Garçon", "Homme"], readings: ["だんし"], mnemonicFr: "Les GARÇONS.", levelId: 3 },
    // 子 vocabulary
    { word: "子", meaningsFr: ["Enfant"], readings: ["こ"], mnemonicFr: "Un ENFANT.", levelId: 3 },
    { word: "子供", meaningsFr: ["Enfant"], readings: ["こども"], mnemonicFr: "Un ENFANT.", levelId: 3 },
    { word: "息子", meaningsFr: ["Fils"], readings: ["むすこ"], mnemonicFr: "Le FILS.", levelId: 3 },
    { word: "様子", meaningsFr: ["État", "Apparence"], readings: ["ようす"], mnemonicFr: "L'ÉTAT des choses.", levelId: 3 },
    { word: "原子", meaningsFr: ["Atome"], readings: ["げんし"], mnemonicFr: "L'ATOME.", levelId: 3 },
    { word: "電子", meaningsFr: ["Électron"], readings: ["でんし"], mnemonicFr: "L'ÉLECTRON.", levelId: 3 },
    // 父 vocabulary
    { word: "父", meaningsFr: ["Père"], readings: ["ちち"], mnemonicFr: "Mon PÈRE.", levelId: 3 },
    { word: "お父さん", meaningsFr: ["Papa"], readings: ["おとうさん"], mnemonicFr: "PAPA.", levelId: 3 },
    { word: "父親", meaningsFr: ["Père"], readings: ["ちちおや"], mnemonicFr: "Le PÈRE.", levelId: 3 },
    { word: "祖父", meaningsFr: ["Grand-père"], readings: ["そふ"], mnemonicFr: "Le GRAND-PÈRE.", levelId: 3 },
    // 母 vocabulary
    { word: "母", meaningsFr: ["Mère"], readings: ["はは"], mnemonicFr: "Ma MÈRE.", levelId: 3 },
    { word: "お母さん", meaningsFr: ["Maman"], readings: ["おかあさん"], mnemonicFr: "MAMAN.", levelId: 3 },
    { word: "母親", meaningsFr: ["Mère"], readings: ["ははおや"], mnemonicFr: "La MÈRE.", levelId: 3 },
    { word: "祖母", meaningsFr: ["Grand-mère"], readings: ["そぼ"], mnemonicFr: "La GRAND-MÈRE.", levelId: 3 },
    { word: "母国", meaningsFr: ["Patrie"], readings: ["ぼこく"], mnemonicFr: "La PATRIE.", levelId: 3 },
    // 友 vocabulary
    { word: "友", meaningsFr: ["Ami"], readings: ["とも"], mnemonicFr: "Un AMI.", levelId: 3 },
    { word: "友達", meaningsFr: ["Ami"], readings: ["ともだち"], mnemonicFr: "Un AMI.", levelId: 3 },
    { word: "友人", meaningsFr: ["Ami (formel)"], readings: ["ゆうじん"], mnemonicFr: "Un AMI (formel).", levelId: 3 },
    { word: "親友", meaningsFr: ["Meilleur ami"], readings: ["しんゆう"], mnemonicFr: "Le MEILLEUR AMI.", levelId: 3 },
    { word: "友好", meaningsFr: ["Amitié"], readings: ["ゆうこう"], mnemonicFr: "L'AMITIÉ.", levelId: 3 },
    // 白 vocabulary
    { word: "白", meaningsFr: ["Blanc"], readings: ["しろ"], mnemonicFr: "Le BLANC.", levelId: 3 },
    { word: "白い", meaningsFr: ["Blanc"], readings: ["しろい"], mnemonicFr: "C'est BLANC.", levelId: 3 },
    { word: "白黒", meaningsFr: ["Noir et blanc"], readings: ["しろくろ"], mnemonicFr: "NOIR ET BLANC.", levelId: 3 },
    { word: "白髪", meaningsFr: ["Cheveux blancs"], readings: ["しらが"], mnemonicFr: "Des CHEVEUX BLANCS.", levelId: 3 },
    { word: "空白", meaningsFr: ["Espace vide"], readings: ["くうはく"], mnemonicFr: "L'ESPACE VIDE.", levelId: 3 },
    { word: "告白", meaningsFr: ["Confession"], readings: ["こくはく"], mnemonicFr: "Une CONFESSION.", levelId: 3 },
    // 赤 vocabulary
    { word: "赤", meaningsFr: ["Rouge"], readings: ["あか"], mnemonicFr: "Le ROUGE.", levelId: 3 },
    { word: "赤い", meaningsFr: ["Rouge"], readings: ["あかい"], mnemonicFr: "C'est ROUGE.", levelId: 3 },
    { word: "赤ちゃん", meaningsFr: ["Bébé"], readings: ["あかちゃん"], mnemonicFr: "Un BÉBÉ.", levelId: 3 },
    { word: "赤字", meaningsFr: ["Déficit"], readings: ["あかじ"], mnemonicFr: "Le DÉFICIT.", levelId: 3 },
    // 青 vocabulary
    { word: "青", meaningsFr: ["Bleu"], readings: ["あお"], mnemonicFr: "Le BLEU.", levelId: 3 },
    { word: "青い", meaningsFr: ["Bleu"], readings: ["あおい"], mnemonicFr: "C'est BLEU.", levelId: 3 },
    { word: "青空", meaningsFr: ["Ciel bleu"], readings: ["あおぞら"], mnemonicFr: "Le CIEL BLEU.", levelId: 3 },
    { word: "青年", meaningsFr: ["Jeune homme"], readings: ["せいねん"], mnemonicFr: "Un JEUNE HOMME.", levelId: 3 },
    { word: "青春", meaningsFr: ["Jeunesse"], readings: ["せいしゅん"], mnemonicFr: "La JEUNESSE.", levelId: 3 },
    // 年 vocabulary
    { word: "年", meaningsFr: ["Année"], readings: ["とし"], mnemonicFr: "L'ANNÉE.", levelId: 3 },
    { word: "今年", meaningsFr: ["Cette année"], readings: ["ことし"], mnemonicFr: "CETTE ANNÉE.", levelId: 3 },
    { word: "去年", meaningsFr: ["L'an dernier"], readings: ["きょねん"], mnemonicFr: "L'AN DERNIER.", levelId: 3 },
    { word: "来年", meaningsFr: ["L'an prochain"], readings: ["らいねん"], mnemonicFr: "L'AN PROCHAIN.", levelId: 3 },
    { word: "毎年", meaningsFr: ["Chaque année"], readings: ["まいとし"], mnemonicFr: "CHAQUE ANNÉE.", levelId: 3 },
    { word: "年齢", meaningsFr: ["Âge"], readings: ["ねんれい"], mnemonicFr: "L'ÂGE.", levelId: 3 },
    { word: "少年", meaningsFr: ["Jeune garçon"], readings: ["しょうねん"], mnemonicFr: "Un JEUNE GARÇON.", levelId: 3 },
    // 本 vocabulary
    { word: "本", meaningsFr: ["Livre", "Vrai"], readings: ["ほん"], mnemonicFr: "Un LIVRE.", levelId: 3 },
    { word: "日本", meaningsFr: ["Japon"], readings: ["にほん"], mnemonicFr: "Le JAPON.", levelId: 3 },
    { word: "本当", meaningsFr: ["Vrai"], readings: ["ほんとう"], mnemonicFr: "C'est VRAI.", levelId: 3 },
    { word: "本人", meaningsFr: ["La personne elle-même"], readings: ["ほんにん"], mnemonicFr: "LA PERSONNE ELLE-MÊME.", levelId: 3 },
    { word: "本気", meaningsFr: ["Sérieux"], readings: ["ほんき"], mnemonicFr: "C'est SÉRIEUX.", levelId: 3 },
    { word: "絵本", meaningsFr: ["Livre d'images"], readings: ["えほん"], mnemonicFr: "Un LIVRE D'IMAGES.", levelId: 3 },
    { word: "基本", meaningsFr: ["Base"], readings: ["きほん"], mnemonicFr: "La BASE.", levelId: 3 },
    // 名 vocabulary
    { word: "名前", meaningsFr: ["Nom"], readings: ["なまえ"], mnemonicFr: "Le NOM.", levelId: 3 },
    { word: "名", meaningsFr: ["Nom"], readings: ["な"], mnemonicFr: "Le NOM.", levelId: 3 },
    { word: "有名", meaningsFr: ["Célèbre"], readings: ["ゆうめい"], mnemonicFr: "CÉLÈBRE.", levelId: 3 },
    { word: "名人", meaningsFr: ["Expert"], readings: ["めいじん"], mnemonicFr: "Un EXPERT.", levelId: 3 },
    { word: "名刺", meaningsFr: ["Carte de visite"], readings: ["めいし"], mnemonicFr: "Une CARTE DE VISITE.", levelId: 3 },
    { word: "名物", meaningsFr: ["Spécialité"], readings: ["めいぶつ"], mnemonicFr: "Une SPÉCIALITÉ locale.", levelId: 3 },
    // 学 vocabulary
    { word: "学ぶ", meaningsFr: ["Apprendre"], readings: ["まなぶ"], mnemonicFr: "APPRENDRE.", levelId: 3 },
    { word: "学校", meaningsFr: ["École"], readings: ["がっこう"], mnemonicFr: "L'ÉCOLE.", levelId: 3 },
    { word: "学生", meaningsFr: ["Étudiant"], readings: ["がくせい"], mnemonicFr: "Un ÉTUDIANT.", levelId: 3 },
    { word: "大学", meaningsFr: ["Université"], readings: ["だいがく"], mnemonicFr: "L'UNIVERSITÉ.", levelId: 3 },
    { word: "留学", meaningsFr: ["Études à l'étranger"], readings: ["りゅうがく"], mnemonicFr: "ÉTUDES À L'ÉTRANGER.", levelId: 3 },
    { word: "科学", meaningsFr: ["Science"], readings: ["かがく"], mnemonicFr: "La SCIENCE.", levelId: 3 },
    { word: "文学", meaningsFr: ["Littérature"], readings: ["ぶんがく"], mnemonicFr: "La LITTÉRATURE.", levelId: 3 },
    { word: "数学", meaningsFr: ["Mathématiques"], readings: ["すうがく"], mnemonicFr: "Les MATHÉMATIQUES.", levelId: 3 },
    // 校 vocabulary
    { word: "学校", meaningsFr: ["École"], readings: ["がっこう"], mnemonicFr: "L'ÉCOLE.", levelId: 3 },
    { word: "高校", meaningsFr: ["Lycée"], readings: ["こうこう"], mnemonicFr: "Le LYCÉE.", levelId: 3 },
    { word: "校長", meaningsFr: ["Directeur d'école"], readings: ["こうちょう"], mnemonicFr: "Le DIRECTEUR D'ÉCOLE.", levelId: 3 },
    // 車 vocabulary
    { word: "車", meaningsFr: ["Voiture"], readings: ["くるま"], mnemonicFr: "Une VOITURE.", levelId: 3 },
    { word: "電車", meaningsFr: ["Train"], readings: ["でんしゃ"], mnemonicFr: "Le TRAIN.", levelId: 3 },
    { word: "自動車", meaningsFr: ["Automobile"], readings: ["じどうしゃ"], mnemonicFr: "L'AUTOMOBILE.", levelId: 3 },
    { word: "自転車", meaningsFr: ["Vélo"], readings: ["じてんしゃ"], mnemonicFr: "Le VÉLO.", levelId: 3 },
    { word: "駐車場", meaningsFr: ["Parking"], readings: ["ちゅうしゃじょう"], mnemonicFr: "Le PARKING.", levelId: 3 },
    { word: "車輪", meaningsFr: ["Roue"], readings: ["しゃりん"], mnemonicFr: "La ROUE.", levelId: 3 },
  ];

  for (const vocab of level3Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 3 supplementary vocab complete! Added", level3Vocab.length, "words");

  // Continue with more levels...
  console.log("Levels 1-3 supplementary vocab complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
