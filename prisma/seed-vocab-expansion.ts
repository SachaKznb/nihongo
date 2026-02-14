import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary for kanji with 0 vocabulary - PART 1 (Levels 1-15)
const vocabPart1 = [
  // 私 (Je/Moi) - L9
  { word: "私", meanings: ["Je", "Moi"], readings: ["わたし"], mnemonicFr: "MOI - la forme polie de 'je' en japonais.", targetKanji: ["私"] },
  { word: "私立", meanings: ["Privé"], readings: ["しりつ"], mnemonicFr: "PRIVÉ - établissement fondé par soi-même.", targetKanji: ["私", "立"] },
  { word: "私物", meanings: ["Effets personnels"], readings: ["しぶつ"], mnemonicFr: "EFFETS PERSONNELS - mes propres affaires.", targetKanji: ["私", "物"] },

  // 仁 (Bienveillance) - L10
  { word: "仁", meanings: ["Bienveillance"], readings: ["じん"], mnemonicFr: "BIENVEILLANCE - vertu confucéenne fondamentale.", targetKanji: ["仁"] },

  // 汁 (Jus/Soupe) - L10
  { word: "汁", meanings: ["Jus", "Bouillon"], readings: ["しる"], mnemonicFr: "JUS/BOUILLON - le liquide d'un aliment.", targetKanji: ["汁"] },
  { word: "味噌汁", meanings: ["Soupe miso"], readings: ["みそしる"], mnemonicFr: "SOUPE MISO - plat traditionnel japonais.", targetKanji: ["味", "汁"] },

  // 銅 (Cuivre) - L10
  { word: "銅", meanings: ["Cuivre"], readings: ["どう"], mnemonicFr: "CUIVRE - métal rougeâtre.", targetKanji: ["銅"] },
  { word: "銅像", meanings: ["Statue de bronze"], readings: ["どうぞう"], mnemonicFr: "STATUE DE BRONZE - sculpture en cuivre.", targetKanji: ["銅"] },

  // 刊 (Publier) - L10
  { word: "刊行", meanings: ["Publication"], readings: ["かんこう"], mnemonicFr: "PUBLICATION - mettre un livre en circulation.", targetKanji: ["刊", "行"] },
  { word: "週刊", meanings: ["Hebdomadaire"], readings: ["しゅうかん"], mnemonicFr: "HEBDOMADAIRE - publié chaque semaine.", targetKanji: ["週", "刊"] },
  { word: "月刊", meanings: ["Mensuel"], readings: ["げっかん"], mnemonicFr: "MENSUEL - publié chaque mois.", targetKanji: ["月", "刊"] },

  // 殿 (Seigneur/Palais) - L10
  { word: "殿", meanings: ["Monsieur", "Seigneur"], readings: ["どの"], mnemonicFr: "MONSIEUR - titre honorifique formel.", targetKanji: ["殿"] },
  { word: "宮殿", meanings: ["Palais"], readings: ["きゅうでん"], mnemonicFr: "PALAIS - résidence royale.", targetKanji: ["宮", "殿"] },

  // 江 (Baie/Entrée de rivière) - L10
  { word: "江戸", meanings: ["Edo", "Tokyo ancien"], readings: ["えど"], mnemonicFr: "EDO - ancien nom de Tokyo.", targetKanji: ["江"] },

  // 谷 (Vallée) - L7
  { word: "渓谷", meanings: ["Gorge", "Canyon"], readings: ["けいこく"], mnemonicFr: "GORGE - vallée profonde entre montagnes.", targetKanji: ["谷"] },

  // 鳴 (Crier/Sonner) - L8
  { word: "鳴く", meanings: ["Crier", "Chanter (animal)"], readings: ["なく"], mnemonicFr: "CRIER - son émis par un animal.", targetKanji: ["鳴"] },
  { word: "鳴る", meanings: ["Sonner", "Retentir"], readings: ["なる"], mnemonicFr: "SONNER - produire un son.", targetKanji: ["鳴"] },

  // 走 (Courir) - L8
  { word: "走る", meanings: ["Courir"], readings: ["はしる"], mnemonicFr: "COURIR - se déplacer rapidement.", targetKanji: ["走"] },
  { word: "走行", meanings: ["Course", "Conduite"], readings: ["そうこう"], mnemonicFr: "CONDUITE - faire avancer un véhicule.", targetKanji: ["走", "行"] },

  // 雲 (Nuage) - L8
  { word: "雲", meanings: ["Nuage"], readings: ["くも"], mnemonicFr: "NUAGE - masse de vapeur d'eau dans le ciel.", targetKanji: ["雲"] },
  { word: "雨雲", meanings: ["Nuage de pluie"], readings: ["あまぐも"], mnemonicFr: "NUAGE DE PLUIE - nuage qui apporte la pluie.", targetKanji: ["雨", "雲"] },

  // 矢 (Flèche) - L8
  { word: "矢", meanings: ["Flèche"], readings: ["や"], mnemonicFr: "FLÈCHE - projectile tiré à l'arc.", targetKanji: ["矢"] },
  { word: "矢印", meanings: ["Flèche (symbole)"], readings: ["やじるし"], mnemonicFr: "FLÈCHE - symbole de direction.", targetKanji: ["矢"] },

  // 米 (Riz) - L9
  { word: "米", meanings: ["Riz"], readings: ["こめ"], mnemonicFr: "RIZ - céréale de base au Japon.", targetKanji: ["米"] },
  { word: "米国", meanings: ["États-Unis"], readings: ["べいこく"], mnemonicFr: "ÉTATS-UNIS - pays de l'Amérique.", targetKanji: ["米", "国"] },
  { word: "白米", meanings: ["Riz blanc"], readings: ["はくまい"], mnemonicFr: "RIZ BLANC - riz poli et blanchi.", targetKanji: ["白", "米"] },

  // 採 (Cueillir) - L10
  { word: "採用", meanings: ["Recrutement", "Adoption"], readings: ["さいよう"], mnemonicFr: "RECRUTEMENT - engager quelqu'un.", targetKanji: ["採", "用"] },
  { word: "採点", meanings: ["Notation"], readings: ["さいてん"], mnemonicFr: "NOTATION - évaluer un travail.", targetKanji: ["採", "点"] },

  // 庁 (Agence) - L10
  { word: "県庁", meanings: ["Préfecture"], readings: ["けんちょう"], mnemonicFr: "PRÉFECTURE - bureau du gouvernement local.", targetKanji: ["庁"] },
  { word: "市庁", meanings: ["Hôtel de ville"], readings: ["しちょう"], mnemonicFr: "HÔTEL DE VILLE - bureau de la municipalité.", targetKanji: ["市", "庁"] },

  // 府 (Gouvernement) - L11
  { word: "政府", meanings: ["Gouvernement"], readings: ["せいふ"], mnemonicFr: "GOUVERNEMENT - organisme dirigeant l'État.", targetKanji: ["府"] },
  { word: "大阪府", meanings: ["Préfecture d'Osaka"], readings: ["おおさかふ"], mnemonicFr: "PRÉFECTURE D'OSAKA - région d'Osaka.", targetKanji: ["大", "府"] },

  // 昔 (Autrefois) - L11
  { word: "昔", meanings: ["Autrefois", "Jadis"], readings: ["むかし"], mnemonicFr: "AUTREFOIS - dans le passé lointain.", targetKanji: ["昔"] },
  { word: "昔話", meanings: ["Conte ancien"], readings: ["むかしばなし"], mnemonicFr: "CONTE ANCIEN - histoire du passé.", targetKanji: ["昔", "話"] },

  // 街 (Rue) - L12
  { word: "街", meanings: ["Rue", "Quartier"], readings: ["まち"], mnemonicFr: "RUE - voie urbaine avec commerces.", targetKanji: ["街"] },
  { word: "街道", meanings: ["Grande route"], readings: ["かいどう"], mnemonicFr: "GRANDE ROUTE - route principale.", targetKanji: ["街", "道"] },

  // 童 (Enfant) - L13
  { word: "童話", meanings: ["Conte pour enfants"], readings: ["どうわ"], mnemonicFr: "CONTE POUR ENFANTS - histoire pour les petits.", targetKanji: ["童", "話"] },
  { word: "児童", meanings: ["Enfant"], readings: ["じどう"], mnemonicFr: "ENFANT - jeune personne.", targetKanji: ["童"] },

  // 第 (Numéro/Rang) - L13
  { word: "第一", meanings: ["Premier", "Numéro un"], readings: ["だいいち"], mnemonicFr: "PREMIER - en première position.", targetKanji: ["第", "一"] },
  { word: "次第", meanings: ["Ordre", "Dépendre de"], readings: ["しだい"], mnemonicFr: "ORDRE - séquence ou dépendance.", targetKanji: ["次", "第"] },

  // 笛 (Flûte) - L13
  { word: "笛", meanings: ["Flûte", "Sifflet"], readings: ["ふえ"], mnemonicFr: "FLÛTE - instrument à vent.", targetKanji: ["笛"] },
  { word: "口笛", meanings: ["Sifflement"], readings: ["くちぶえ"], mnemonicFr: "SIFFLEMENT - siffler avec la bouche.", targetKanji: ["口", "笛"] },

  // 億 (Cent millions) - L13
  { word: "億", meanings: ["Cent millions"], readings: ["おく"], mnemonicFr: "CENT MILLIONS - très grand nombre.", targetKanji: ["億"] },
  { word: "億万", meanings: ["Milliards"], readings: ["おくまん"], mnemonicFr: "MILLIARDS - quantité astronomique.", targetKanji: ["億", "万"] },

  // 希 (Espoir) - L14
  { word: "希望", meanings: ["Espoir", "Souhait"], readings: ["きぼう"], mnemonicFr: "ESPOIR - ce qu'on désire pour l'avenir.", targetKanji: ["希", "望"] },
  { word: "希少", meanings: ["Rare"], readings: ["きしょう"], mnemonicFr: "RARE - peu commun.", targetKanji: ["希", "少"] },

  // 各 (Chaque) - L14
  { word: "各自", meanings: ["Chacun"], readings: ["かくじ"], mnemonicFr: "CHACUN - chaque personne individuellement.", targetKanji: ["各", "自"] },
  { word: "各地", meanings: ["Partout", "Chaque lieu"], readings: ["かくち"], mnemonicFr: "PARTOUT - en chaque endroit.", targetKanji: ["各", "地"] },
  { word: "各国", meanings: ["Chaque pays"], readings: ["かっこく"], mnemonicFr: "CHAQUE PAYS - tous les pays.", targetKanji: ["各", "国"] },

  // 鍵 (Clé) - L13
  { word: "鍵", meanings: ["Clé"], readings: ["かぎ"], mnemonicFr: "CLÉ - outil pour ouvrir une serrure.", targetKanji: ["鍵"] },
  { word: "鍵盤", meanings: ["Clavier"], readings: ["けんばん"], mnemonicFr: "CLAVIER - touches d'un piano.", targetKanji: ["鍵"] },
];

// Part 2: More common vocabulary (Levels 15-30)
const vocabPart2 = [
  // 軟 (Mou) - L31
  { word: "軟らかい", meanings: ["Mou", "Souple"], readings: ["やわらかい"], mnemonicFr: "MOU - qui cède facilement à la pression.", targetKanji: ["軟"] },

  // 瓶 (Bouteille) - L32
  { word: "瓶", meanings: ["Bouteille"], readings: ["びん"], mnemonicFr: "BOUTEILLE - récipient en verre.", targetKanji: ["瓶"] },
  { word: "花瓶", meanings: ["Vase"], readings: ["かびん"], mnemonicFr: "VASE - récipient pour fleurs.", targetKanji: ["花", "瓶"] },

  // Common vocabulary additions
  { word: "意見", meanings: ["Opinion", "Avis"], readings: ["いけん"], mnemonicFr: "OPINION - point de vue personnel.", targetKanji: ["意", "見"] },
  { word: "計画", meanings: ["Plan", "Projet"], readings: ["けいかく"], mnemonicFr: "PLAN - projet organisé.", targetKanji: ["計", "画"] },
  { word: "経験", meanings: ["Expérience"], readings: ["けいけん"], mnemonicFr: "EXPÉRIENCE - vécu personnel.", targetKanji: ["経", "験"] },
  { word: "関係", meanings: ["Relation", "Rapport"], readings: ["かんけい"], mnemonicFr: "RELATION - lien entre personnes.", targetKanji: ["関", "係"] },
  { word: "結果", meanings: ["Résultat"], readings: ["けっか"], mnemonicFr: "RÉSULTAT - conséquence d'une action.", targetKanji: ["結", "果"] },
  { word: "現在", meanings: ["Actuel", "Présent"], readings: ["げんざい"], mnemonicFr: "PRÉSENT - moment actuel.", targetKanji: ["現", "在"] },
  { word: "原因", meanings: ["Cause", "Raison"], readings: ["げんいん"], mnemonicFr: "CAUSE - origine d'un événement.", targetKanji: ["原", "因"] },
  { word: "研究", meanings: ["Recherche", "Étude"], readings: ["けんきゅう"], mnemonicFr: "RECHERCHE - étude approfondie.", targetKanji: ["研", "究"] },
  { word: "健康", meanings: ["Santé"], readings: ["けんこう"], mnemonicFr: "SANTÉ - bon état physique.", targetKanji: ["健", "康"] },
  { word: "建物", meanings: ["Bâtiment"], readings: ["たてもの"], mnemonicFr: "BÂTIMENT - construction.", targetKanji: ["建", "物"] },
  { word: "県", meanings: ["Préfecture"], readings: ["けん"], mnemonicFr: "PRÉFECTURE - division administrative.", targetKanji: ["県"] },
  { word: "権利", meanings: ["Droit", "Privilège"], readings: ["けんり"], mnemonicFr: "DROIT - ce qu'on peut légalement faire.", targetKanji: ["権", "利"] },
  { word: "限る", meanings: ["Limiter"], readings: ["かぎる"], mnemonicFr: "LIMITER - mettre des bornes.", targetKanji: ["限"] },
  { word: "湖", meanings: ["Lac"], readings: ["みずうみ"], mnemonicFr: "LAC - grande étendue d'eau.", targetKanji: ["湖"] },
  { word: "公園", meanings: ["Parc"], readings: ["こうえん"], mnemonicFr: "PARC - espace vert public.", targetKanji: ["公", "園"] },
  { word: "効果", meanings: ["Effet", "Efficacité"], readings: ["こうか"], mnemonicFr: "EFFET - résultat produit.", targetKanji: ["効", "果"] },
  { word: "工場", meanings: ["Usine"], readings: ["こうじょう"], mnemonicFr: "USINE - lieu de fabrication.", targetKanji: ["工", "場"] },
  { word: "交通", meanings: ["Circulation", "Transport"], readings: ["こうつう"], mnemonicFr: "CIRCULATION - mouvement des véhicules.", targetKanji: ["交", "通"] },
  { word: "幸せ", meanings: ["Bonheur"], readings: ["しあわせ"], mnemonicFr: "BONHEUR - état de joie.", targetKanji: ["幸"] },
  { word: "講義", meanings: ["Cours", "Conférence"], readings: ["こうぎ"], mnemonicFr: "COURS - enseignement magistral.", targetKanji: ["講", "義"] },
  { word: "号", meanings: ["Numéro"], readings: ["ごう"], mnemonicFr: "NUMÉRO - chiffre d'identification.", targetKanji: ["号"] },
  { word: "合う", meanings: ["Convenir", "S'adapter"], readings: ["あう"], mnemonicFr: "CONVENIR - être approprié.", targetKanji: ["合"] },
  { word: "国際", meanings: ["International"], readings: ["こくさい"], mnemonicFr: "INTERNATIONAL - entre nations.", targetKanji: ["国", "際"] },
  { word: "国民", meanings: ["Peuple", "Nation"], readings: ["こくみん"], mnemonicFr: "PEUPLE - citoyens d'un pays.", targetKanji: ["国", "民"] },
  { word: "今後", meanings: ["À l'avenir", "Désormais"], readings: ["こんご"], mnemonicFr: "À L'AVENIR - à partir de maintenant.", targetKanji: ["今", "後"] },
  { word: "根", meanings: ["Racine"], readings: ["ね"], mnemonicFr: "RACINE - partie souterraine.", targetKanji: ["根"] },
  { word: "左右", meanings: ["Gauche et droite"], readings: ["さゆう"], mnemonicFr: "GAUCHE ET DROITE - les deux côtés.", targetKanji: ["左", "右"] },
  { word: "差", meanings: ["Différence"], readings: ["さ"], mnemonicFr: "DIFFÉRENCE - écart entre deux choses.", targetKanji: ["差"] },
  { word: "最近", meanings: ["Récemment"], readings: ["さいきん"], mnemonicFr: "RÉCEMMENT - ces derniers temps.", targetKanji: ["最", "近"] },
  { word: "最初", meanings: ["Premier", "Début"], readings: ["さいしょ"], mnemonicFr: "PREMIER - au commencement.", targetKanji: ["最", "初"] },
  { word: "最後", meanings: ["Dernier", "Final"], readings: ["さいご"], mnemonicFr: "DERNIER - à la fin.", targetKanji: ["最", "後"] },
  { word: "際", meanings: ["Occasion", "Bord"], readings: ["さい"], mnemonicFr: "OCCASION - moment particulier.", targetKanji: ["際"] },
  { word: "材料", meanings: ["Matériau", "Ingrédient"], readings: ["ざいりょう"], mnemonicFr: "MATÉRIAU - substance pour fabriquer.", targetKanji: ["材", "料"] },
  { word: "財産", meanings: ["Fortune", "Patrimoine"], readings: ["ざいさん"], mnemonicFr: "FORTUNE - biens possédés.", targetKanji: ["財", "産"] },
  { word: "作品", meanings: ["Œuvre", "Travail"], readings: ["さくひん"], mnemonicFr: "ŒUVRE - création artistique.", targetKanji: ["作", "品"] },
  { word: "参加", meanings: ["Participation"], readings: ["さんか"], mnemonicFr: "PARTICIPATION - prendre part à.", targetKanji: ["参", "加"] },
  { word: "産業", meanings: ["Industrie"], readings: ["さんぎょう"], mnemonicFr: "INDUSTRIE - secteur économique.", targetKanji: ["産", "業"] },
  { word: "賛成", meanings: ["Accord", "Approbation"], readings: ["さんせい"], mnemonicFr: "ACCORD - être d'accord.", targetKanji: ["賛", "成"] },
  { word: "残る", meanings: ["Rester"], readings: ["のこる"], mnemonicFr: "RESTER - demeurer en place.", targetKanji: ["残"] },
  { word: "残念", meanings: ["Dommage", "Regrettable"], readings: ["ざんねん"], mnemonicFr: "DOMMAGE - c'est regrettable.", targetKanji: ["残", "念"] },
  { word: "氏", meanings: ["Monsieur", "Clan"], readings: ["し"], mnemonicFr: "MONSIEUR - titre de respect.", targetKanji: ["氏"] },
  { word: "支持", meanings: ["Soutien", "Support"], readings: ["しじ"], mnemonicFr: "SOUTIEN - aide apportée.", targetKanji: ["支", "持"] },
  { word: "指", meanings: ["Doigt"], readings: ["ゆび"], mnemonicFr: "DOIGT - extrémité de la main.", targetKanji: ["指"] },
  { word: "指導", meanings: ["Direction", "Guidance"], readings: ["しどう"], mnemonicFr: "DIRECTION - guider quelqu'un.", targetKanji: ["指", "導"] },
  { word: "思想", meanings: ["Pensée", "Idéologie"], readings: ["しそう"], mnemonicFr: "PENSÉE - système d'idées.", targetKanji: ["思", "想"] },
  { word: "資料", meanings: ["Document", "Données"], readings: ["しりょう"], mnemonicFr: "DOCUMENT - informations écrites.", targetKanji: ["資", "料"] },
  { word: "事故", meanings: ["Accident"], readings: ["じこ"], mnemonicFr: "ACCIDENT - événement malheureux.", targetKanji: ["事", "故"] },
  { word: "事実", meanings: ["Fait", "Réalité"], readings: ["じじつ"], mnemonicFr: "FAIT - ce qui est vrai.", targetKanji: ["事", "実"] },
  { word: "事情", meanings: ["Circonstances"], readings: ["じじょう"], mnemonicFr: "CIRCONSTANCES - situation contextuelle.", targetKanji: ["事", "情"] },
  { word: "持つ", meanings: ["Tenir", "Avoir"], readings: ["もつ"], mnemonicFr: "TENIR - avoir en main.", targetKanji: ["持"] },
  { word: "時期", meanings: ["Période", "Saison"], readings: ["じき"], mnemonicFr: "PÉRIODE - moment particulier.", targetKanji: ["時", "期"] },
  { word: "時代", meanings: ["Époque", "Ère"], readings: ["じだい"], mnemonicFr: "ÉPOQUE - période historique.", targetKanji: ["時", "代"] },
  { word: "次", meanings: ["Suivant", "Prochain"], readings: ["つぎ"], mnemonicFr: "SUIVANT - qui vient après.", targetKanji: ["次"] },
  { word: "自分", meanings: ["Soi-même"], readings: ["じぶん"], mnemonicFr: "SOI-MÊME - sa propre personne.", targetKanji: ["自", "分"] },
  { word: "自然", meanings: ["Nature", "Naturel"], readings: ["しぜん"], mnemonicFr: "NATURE - le monde naturel.", targetKanji: ["自", "然"] },
  { word: "自由", meanings: ["Liberté"], readings: ["じゆう"], mnemonicFr: "LIBERTÉ - état libre.", targetKanji: ["自", "由"] },
  { word: "式", meanings: ["Cérémonie", "Style"], readings: ["しき"], mnemonicFr: "CÉRÉMONIE - événement formel.", targetKanji: ["式"] },
  { word: "質問", meanings: ["Question"], readings: ["しつもん"], mnemonicFr: "QUESTION - demande d'information.", targetKanji: ["質", "問"] },
  { word: "実は", meanings: ["En fait", "À vrai dire"], readings: ["じつは"], mnemonicFr: "EN FAIT - pour dire la vérité.", targetKanji: ["実"] },
  { word: "実際", meanings: ["Réalité", "En pratique"], readings: ["じっさい"], mnemonicFr: "EN PRATIQUE - dans les faits.", targetKanji: ["実", "際"] },
  { word: "実現", meanings: ["Réalisation"], readings: ["じつげん"], mnemonicFr: "RÉALISATION - rendre réel.", targetKanji: ["実", "現"] },
];

// Part 3: Advanced vocabulary
const vocabPart3 = [
  { word: "社会", meanings: ["Société"], readings: ["しゃかい"], mnemonicFr: "SOCIÉTÉ - communauté humaine.", targetKanji: ["社", "会"] },
  { word: "写真", meanings: ["Photo"], readings: ["しゃしん"], mnemonicFr: "PHOTO - image photographique.", targetKanji: ["写", "真"] },
  { word: "者", meanings: ["Personne"], readings: ["もの"], mnemonicFr: "PERSONNE - individu.", targetKanji: ["者"] },
  { word: "若い", meanings: ["Jeune"], readings: ["わかい"], mnemonicFr: "JEUNE - peu âgé.", targetKanji: ["若"] },
  { word: "主", meanings: ["Principal", "Maître"], readings: ["しゅ"], mnemonicFr: "PRINCIPAL - le plus important.", targetKanji: ["主"] },
  { word: "主人", meanings: ["Maître", "Mari"], readings: ["しゅじん"], mnemonicFr: "MAÎTRE - chef de maison.", targetKanji: ["主", "人"] },
  { word: "取る", meanings: ["Prendre"], readings: ["とる"], mnemonicFr: "PRENDRE - saisir avec la main.", targetKanji: ["取"] },
  { word: "首", meanings: ["Cou"], readings: ["くび"], mnemonicFr: "COU - partie du corps.", targetKanji: ["首"] },
  { word: "種", meanings: ["Graine", "Type"], readings: ["たね"], mnemonicFr: "GRAINE - semence de plante.", targetKanji: ["種"] },
  { word: "種類", meanings: ["Type", "Genre"], readings: ["しゅるい"], mnemonicFr: "TYPE - catégorie.", targetKanji: ["種", "類"] },
  { word: "周り", meanings: ["Autour", "Environs"], readings: ["まわり"], mnemonicFr: "AUTOUR - dans les environs.", targetKanji: ["周"] },
  { word: "集める", meanings: ["Rassembler"], readings: ["あつめる"], mnemonicFr: "RASSEMBLER - réunir ensemble.", targetKanji: ["集"] },
  { word: "住む", meanings: ["Habiter"], readings: ["すむ"], mnemonicFr: "HABITER - vivre quelque part.", targetKanji: ["住"] },
  { word: "住所", meanings: ["Adresse"], readings: ["じゅうしょ"], mnemonicFr: "ADRESSE - lieu de résidence.", targetKanji: ["住", "所"] },
  { word: "重要", meanings: ["Important"], readings: ["じゅうよう"], mnemonicFr: "IMPORTANT - de grande valeur.", targetKanji: ["重", "要"] },
  { word: "出す", meanings: ["Sortir", "Émettre"], readings: ["だす"], mnemonicFr: "SORTIR - faire sortir.", targetKanji: ["出"] },
  { word: "出発", meanings: ["Départ"], readings: ["しゅっぱつ"], mnemonicFr: "DÉPART - commencer un voyage.", targetKanji: ["出", "発"] },
  { word: "術", meanings: ["Art", "Technique"], readings: ["じゅつ"], mnemonicFr: "ART - habileté technique.", targetKanji: ["術"] },
  { word: "準備", meanings: ["Préparation"], readings: ["じゅんび"], mnemonicFr: "PRÉPARATION - se préparer.", targetKanji: ["準", "備"] },
  { word: "初めて", meanings: ["Pour la première fois"], readings: ["はじめて"], mnemonicFr: "PREMIÈRE FOIS - jamais fait avant.", targetKanji: ["初"] },
  { word: "所", meanings: ["Endroit", "Lieu"], readings: ["ところ"], mnemonicFr: "ENDROIT - un lieu.", targetKanji: ["所"] },
  { word: "勝つ", meanings: ["Gagner"], readings: ["かつ"], mnemonicFr: "GAGNER - remporter la victoire.", targetKanji: ["勝"] },
  { word: "商売", meanings: ["Commerce", "Affaires"], readings: ["しょうばい"], mnemonicFr: "COMMERCE - activité marchande.", targetKanji: ["商", "売"] },
  { word: "商品", meanings: ["Produit", "Marchandise"], readings: ["しょうひん"], mnemonicFr: "PRODUIT - article à vendre.", targetKanji: ["商", "品"] },
  { word: "消える", meanings: ["Disparaître"], readings: ["きえる"], mnemonicFr: "DISPARAÎTRE - cesser d'exister.", targetKanji: ["消"] },
  { word: "消す", meanings: ["Effacer", "Éteindre"], readings: ["けす"], mnemonicFr: "EFFACER - faire disparaître.", targetKanji: ["消"] },
  { word: "紹介", meanings: ["Présentation"], readings: ["しょうかい"], mnemonicFr: "PRÉSENTATION - faire connaître.", targetKanji: ["紹", "介"] },
  { word: "章", meanings: ["Chapitre"], readings: ["しょう"], mnemonicFr: "CHAPITRE - section d'un livre.", targetKanji: ["章"] },
  { word: "証明", meanings: ["Preuve", "Certificat"], readings: ["しょうめい"], mnemonicFr: "PREUVE - démonstration de vérité.", targetKanji: ["証", "明"] },
  { word: "象", meanings: ["Éléphant", "Symbole"], readings: ["ぞう"], mnemonicFr: "ÉLÉPHANT - grand mammifère.", targetKanji: ["象"] },
  { word: "賞", meanings: ["Prix", "Récompense"], readings: ["しょう"], mnemonicFr: "PRIX - récompense pour mérite.", targetKanji: ["賞"] },
  { word: "障害", meanings: ["Obstacle", "Handicap"], readings: ["しょうがい"], mnemonicFr: "OBSTACLE - ce qui bloque.", targetKanji: ["障", "害"] },
  { word: "状況", meanings: ["Situation"], readings: ["じょうきょう"], mnemonicFr: "SITUATION - état des choses.", targetKanji: ["状", "況"] },
  { word: "状態", meanings: ["État", "Condition"], readings: ["じょうたい"], mnemonicFr: "ÉTAT - manière d'être.", targetKanji: ["状", "態"] },
  { word: "条件", meanings: ["Condition"], readings: ["じょうけん"], mnemonicFr: "CONDITION - exigence.", targetKanji: ["条", "件"] },
  { word: "情報", meanings: ["Information"], readings: ["じょうほう"], mnemonicFr: "INFORMATION - renseignement.", targetKanji: ["情", "報"] },
  { word: "職", meanings: ["Emploi", "Métier"], readings: ["しょく"], mnemonicFr: "EMPLOI - travail professionnel.", targetKanji: ["職"] },
  { word: "職業", meanings: ["Profession"], readings: ["しょくぎょう"], mnemonicFr: "PROFESSION - métier exercé.", targetKanji: ["職", "業"] },
  { word: "食事", meanings: ["Repas"], readings: ["しょくじ"], mnemonicFr: "REPAS - moment de manger.", targetKanji: ["食", "事"] },
  { word: "植物", meanings: ["Plante"], readings: ["しょくぶつ"], mnemonicFr: "PLANTE - être végétal.", targetKanji: ["植", "物"] },
  { word: "信じる", meanings: ["Croire"], readings: ["しんじる"], mnemonicFr: "CROIRE - avoir foi en.", targetKanji: ["信"] },
  { word: "親", meanings: ["Parent"], readings: ["おや"], mnemonicFr: "PARENT - père ou mère.", targetKanji: ["親"] },
  { word: "親切", meanings: ["Gentillesse"], readings: ["しんせつ"], mnemonicFr: "GENTILLESSE - bonté envers autrui.", targetKanji: ["親", "切"] },
  { word: "心配", meanings: ["Inquiétude", "Souci"], readings: ["しんぱい"], mnemonicFr: "INQUIÉTUDE - se faire du souci.", targetKanji: ["心", "配"] },
  { word: "身", meanings: ["Corps"], readings: ["み"], mnemonicFr: "CORPS - le physique.", targetKanji: ["身"] },
  { word: "身体", meanings: ["Corps"], readings: ["からだ"], mnemonicFr: "CORPS - physique humain.", targetKanji: ["身", "体"] },
  { word: "進む", meanings: ["Avancer", "Progresser"], readings: ["すすむ"], mnemonicFr: "AVANCER - aller de l'avant.", targetKanji: ["進"] },
  { word: "進歩", meanings: ["Progrès"], readings: ["しんぽ"], mnemonicFr: "PROGRÈS - amélioration continue.", targetKanji: ["進", "歩"] },
  { word: "深い", meanings: ["Profond"], readings: ["ふかい"], mnemonicFr: "PROFOND - qui a de la profondeur.", targetKanji: ["深"] },
  { word: "申す", meanings: ["Dire (humble)"], readings: ["もうす"], mnemonicFr: "DIRE - forme humble de parler.", targetKanji: ["申"] },
  { word: "神", meanings: ["Dieu"], readings: ["かみ"], mnemonicFr: "DIEU - divinité.", targetKanji: ["神"] },
  { word: "神社", meanings: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonicFr: "SANCTUAIRE - lieu de culte shinto.", targetKanji: ["神", "社"] },
  { word: "図", meanings: ["Schéma", "Figure"], readings: ["ず"], mnemonicFr: "SCHÉMA - représentation graphique.", targetKanji: ["図"] },
  { word: "図書館", meanings: ["Bibliothèque"], readings: ["としょかん"], mnemonicFr: "BIBLIOTHÈQUE - lieu des livres.", targetKanji: ["図", "書", "館"] },
  { word: "数", meanings: ["Nombre"], readings: ["かず"], mnemonicFr: "NOMBRE - quantité.", targetKanji: ["数"] },
  { word: "世紀", meanings: ["Siècle"], readings: ["せいき"], mnemonicFr: "SIÈCLE - période de 100 ans.", targetKanji: ["世", "紀"] },
  { word: "世界", meanings: ["Monde"], readings: ["せかい"], mnemonicFr: "MONDE - la Terre entière.", targetKanji: ["世", "界"] },
  { word: "世話", meanings: ["Aide", "Soin"], readings: ["せわ"], mnemonicFr: "SOIN - prendre soin de quelqu'un.", targetKanji: ["世", "話"] },
  { word: "制度", meanings: ["Système", "Régime"], readings: ["せいど"], mnemonicFr: "SYSTÈME - organisation établie.", targetKanji: ["制", "度"] },
  { word: "性", meanings: ["Nature", "Sexe"], readings: ["せい"], mnemonicFr: "NATURE - caractère inné.", targetKanji: ["性"] },
  { word: "性格", meanings: ["Personnalité"], readings: ["せいかく"], mnemonicFr: "PERSONNALITÉ - caractère d'une personne.", targetKanji: ["性", "格"] },
  { word: "成功", meanings: ["Succès"], readings: ["せいこう"], mnemonicFr: "SUCCÈS - réussite.", targetKanji: ["成", "功"] },
  { word: "成長", meanings: ["Croissance"], readings: ["せいちょう"], mnemonicFr: "CROISSANCE - développement.", targetKanji: ["成", "長"] },
  { word: "政治", meanings: ["Politique"], readings: ["せいじ"], mnemonicFr: "POLITIQUE - gouvernement.", targetKanji: ["政", "治"] },
];

// Part 4: Even more vocabulary
const vocabPart4 = [
  { word: "整理", meanings: ["Rangement", "Organisation"], readings: ["せいり"], mnemonicFr: "RANGEMENT - mettre en ordre.", targetKanji: ["整", "理"] },
  { word: "生活", meanings: ["Vie quotidienne"], readings: ["せいかつ"], mnemonicFr: "VIE QUOTIDIENNE - vie de tous les jours.", targetKanji: ["生", "活"] },
  { word: "生産", meanings: ["Production"], readings: ["せいさん"], mnemonicFr: "PRODUCTION - fabrication.", targetKanji: ["生", "産"] },
  { word: "声", meanings: ["Voix"], readings: ["こえ"], mnemonicFr: "VOIX - son émis par la bouche.", targetKanji: ["声"] },
  { word: "西洋", meanings: ["Occident"], readings: ["せいよう"], mnemonicFr: "OCCIDENT - le monde occidental.", targetKanji: ["西", "洋"] },
  { word: "精神", meanings: ["Esprit", "Mental"], readings: ["せいしん"], mnemonicFr: "ESPRIT - le mental.", targetKanji: ["精", "神"] },
  { word: "製品", meanings: ["Produit fabriqué"], readings: ["せいひん"], mnemonicFr: "PRODUIT - article manufacturé.", targetKanji: ["製", "品"] },
  { word: "税金", meanings: ["Impôt"], readings: ["ぜいきん"], mnemonicFr: "IMPÔT - taxe gouvernementale.", targetKanji: ["税", "金"] },
  { word: "責任", meanings: ["Responsabilité"], readings: ["せきにん"], mnemonicFr: "RESPONSABILITÉ - devoir moral.", targetKanji: ["責", "任"] },
  { word: "席", meanings: ["Siège", "Place"], readings: ["せき"], mnemonicFr: "SIÈGE - place assise.", targetKanji: ["席"] },
  { word: "積む", meanings: ["Empiler"], readings: ["つむ"], mnemonicFr: "EMPILER - mettre en pile.", targetKanji: ["積"] },
  { word: "説明", meanings: ["Explication"], readings: ["せつめい"], mnemonicFr: "EXPLICATION - rendre clair.", targetKanji: ["説", "明"] },
  { word: "設計", meanings: ["Conception", "Design"], readings: ["せっけい"], mnemonicFr: "CONCEPTION - plan de construction.", targetKanji: ["設", "計"] },
  { word: "絶対", meanings: ["Absolument"], readings: ["ぜったい"], mnemonicFr: "ABSOLUMENT - sans exception.", targetKanji: ["絶", "対"] },
  { word: "選ぶ", meanings: ["Choisir"], readings: ["えらぶ"], mnemonicFr: "CHOISIR - faire un choix.", targetKanji: ["選"] },
  { word: "選手", meanings: ["Joueur", "Athlète"], readings: ["せんしゅ"], mnemonicFr: "ATHLÈTE - sportif.", targetKanji: ["選", "手"] },
  { word: "戦争", meanings: ["Guerre"], readings: ["せんそう"], mnemonicFr: "GUERRE - conflit armé.", targetKanji: ["戦", "争"] },
  { word: "専門", meanings: ["Spécialité"], readings: ["せんもん"], mnemonicFr: "SPÉCIALITÉ - domaine d'expertise.", targetKanji: ["専", "門"] },
  { word: "線", meanings: ["Ligne"], readings: ["せん"], mnemonicFr: "LIGNE - trait.", targetKanji: ["線"] },
  { word: "船", meanings: ["Bateau"], readings: ["ふね"], mnemonicFr: "BATEAU - véhicule maritime.", targetKanji: ["船"] },
  { word: "全体", meanings: ["Ensemble", "Totalité"], readings: ["ぜんたい"], mnemonicFr: "TOTALITÉ - l'ensemble complet.", targetKanji: ["全", "体"] },
  { word: "然し", meanings: ["Cependant"], readings: ["しかし"], mnemonicFr: "CEPENDANT - néanmoins.", targetKanji: ["然"] },
  { word: "組む", meanings: ["Assembler"], readings: ["くむ"], mnemonicFr: "ASSEMBLER - mettre ensemble.", targetKanji: ["組"] },
  { word: "組織", meanings: ["Organisation"], readings: ["そしき"], mnemonicFr: "ORGANISATION - structure.", targetKanji: ["組", "織"] },
  { word: "相手", meanings: ["Partenaire", "Adversaire"], readings: ["あいて"], mnemonicFr: "PARTENAIRE - l'autre partie.", targetKanji: ["相", "手"] },
  { word: "総", meanings: ["Général", "Total"], readings: ["そう"], mnemonicFr: "TOTAL - dans l'ensemble.", targetKanji: ["総"] },
  { word: "想像", meanings: ["Imagination"], readings: ["そうぞう"], mnemonicFr: "IMAGINATION - créer des images.", targetKanji: ["想", "像"] },
  { word: "早く", meanings: ["Tôt", "Vite"], readings: ["はやく"], mnemonicFr: "TÔT - de bonne heure.", targetKanji: ["早"] },
  { word: "相談", meanings: ["Consultation"], readings: ["そうだん"], mnemonicFr: "CONSULTATION - demander conseil.", targetKanji: ["相", "談"] },
  { word: "増える", meanings: ["Augmenter"], readings: ["ふえる"], mnemonicFr: "AUGMENTER - devenir plus.", targetKanji: ["増"] },
  { word: "送る", meanings: ["Envoyer"], readings: ["おくる"], mnemonicFr: "ENVOYER - faire parvenir.", targetKanji: ["送"] },
  { word: "存在", meanings: ["Existence"], readings: ["そんざい"], mnemonicFr: "EXISTENCE - fait d'exister.", targetKanji: ["存", "在"] },
  { word: "損", meanings: ["Perte", "Dommage"], readings: ["そん"], mnemonicFr: "PERTE - ce qu'on perd.", targetKanji: ["損"] },
  { word: "村", meanings: ["Village"], readings: ["むら"], mnemonicFr: "VILLAGE - petit peuplement.", targetKanji: ["村"] },
  { word: "他", meanings: ["Autre"], readings: ["た"], mnemonicFr: "AUTRE - différent.", targetKanji: ["他"] },
  { word: "他人", meanings: ["Autrui", "Étranger"], readings: ["たにん"], mnemonicFr: "AUTRUI - une autre personne.", targetKanji: ["他", "人"] },
  { word: "体", meanings: ["Corps"], readings: ["からだ"], mnemonicFr: "CORPS - le physique.", targetKanji: ["体"] },
  { word: "対象", meanings: ["Objet", "Cible"], readings: ["たいしょう"], mnemonicFr: "OBJET - ce qui est visé.", targetKanji: ["対", "象"] },
  { word: "代", meanings: ["Génération", "Époque"], readings: ["だい"], mnemonicFr: "GÉNÉRATION - période de vie.", targetKanji: ["代"] },
  { word: "代わり", meanings: ["Remplacement"], readings: ["かわり"], mnemonicFr: "REMPLACEMENT - à la place de.", targetKanji: ["代"] },
  { word: "台", meanings: ["Support", "Compteur"], readings: ["だい"], mnemonicFr: "SUPPORT - base pour poser.", targetKanji: ["台"] },
  { word: "大きな", meanings: ["Grand"], readings: ["おおきな"], mnemonicFr: "GRAND - de grande taille.", targetKanji: ["大"] },
  { word: "大体", meanings: ["À peu près"], readings: ["だいたい"], mnemonicFr: "À PEU PRÈS - approximativement.", targetKanji: ["大", "体"] },
  { word: "大変", meanings: ["Très", "Grave"], readings: ["たいへん"], mnemonicFr: "TRÈS - extrêmement.", targetKanji: ["大", "変"] },
  { word: "第", meanings: ["Numéro", "Rang"], readings: ["だい"], mnemonicFr: "NUMÉRO - position dans l'ordre.", targetKanji: ["第"] },
  { word: "題", meanings: ["Sujet", "Titre"], readings: ["だい"], mnemonicFr: "SUJET - thème principal.", targetKanji: ["題"] },
  { word: "達", meanings: ["Pluriel (personnes)"], readings: ["たち"], mnemonicFr: "PLURIEL - marque le pluriel.", targetKanji: ["達"] },
  { word: "達する", meanings: ["Atteindre"], readings: ["たっする"], mnemonicFr: "ATTEINDRE - parvenir à.", targetKanji: ["達"] },
  { word: "単なる", meanings: ["Simple", "Juste"], readings: ["たんなる"], mnemonicFr: "SIMPLE - seulement.", targetKanji: ["単"] },
  { word: "担当", meanings: ["Responsable"], readings: ["たんとう"], mnemonicFr: "RESPONSABLE - en charge de.", targetKanji: ["担", "当"] },
  { word: "団体", meanings: ["Groupe", "Organisation"], readings: ["だんたい"], mnemonicFr: "GROUPE - ensemble de personnes.", targetKanji: ["団", "体"] },
  { word: "男性", meanings: ["Homme (sexe)"], readings: ["だんせい"], mnemonicFr: "HOMME - personne de sexe masculin.", targetKanji: ["男", "性"] },
  { word: "段", meanings: ["Niveau", "Étape"], readings: ["だん"], mnemonicFr: "NIVEAU - degré.", targetKanji: ["段"] },
  { word: "知識", meanings: ["Connaissance"], readings: ["ちしき"], mnemonicFr: "CONNAISSANCE - ce qu'on sait.", targetKanji: ["知", "識"] },
  { word: "地域", meanings: ["Région", "Zone"], readings: ["ちいき"], mnemonicFr: "RÉGION - zone géographique.", targetKanji: ["地", "域"] },
  { word: "地方", meanings: ["Région", "Province"], readings: ["ちほう"], mnemonicFr: "PROVINCE - région rurale.", targetKanji: ["地", "方"] },
];

// Part 5: Final batch
const vocabPart5 = [
  { word: "置く", meanings: ["Poser", "Mettre"], readings: ["おく"], mnemonicFr: "POSER - mettre quelque part.", targetKanji: ["置"] },
  { word: "届く", meanings: ["Arriver", "Parvenir"], readings: ["とどく"], mnemonicFr: "ARRIVER - parvenir à destination.", targetKanji: ["届"] },
  { word: "届ける", meanings: ["Livrer"], readings: ["とどける"], mnemonicFr: "LIVRER - apporter à destination.", targetKanji: ["届"] },
  { word: "仲", meanings: ["Relation"], readings: ["なか"], mnemonicFr: "RELATION - rapport entre personnes.", targetKanji: ["仲"] },
  { word: "仲間", meanings: ["Camarade", "Compagnon"], readings: ["なかま"], mnemonicFr: "CAMARADE - ami, compagnon.", targetKanji: ["仲", "間"] },
  { word: "注意", meanings: ["Attention"], readings: ["ちゅうい"], mnemonicFr: "ATTENTION - faire attention.", targetKanji: ["注", "意"] },
  { word: "注目", meanings: ["Attention", "Remarque"], readings: ["ちゅうもく"], mnemonicFr: "ATTENTION - attirer les regards.", targetKanji: ["注", "目"] },
  { word: "中心", meanings: ["Centre", "Cœur"], readings: ["ちゅうしん"], mnemonicFr: "CENTRE - point central.", targetKanji: ["中", "心"] },
  { word: "著者", meanings: ["Auteur"], readings: ["ちょしゃ"], mnemonicFr: "AUTEUR - personne qui écrit.", targetKanji: ["著", "者"] },
  { word: "調べる", meanings: ["Examiner", "Rechercher"], readings: ["しらべる"], mnemonicFr: "RECHERCHER - chercher des infos.", targetKanji: ["調"] },
  { word: "調査", meanings: ["Enquête"], readings: ["ちょうさ"], mnemonicFr: "ENQUÊTE - investigation.", targetKanji: ["調", "査"] },
  { word: "長", meanings: ["Chef"], readings: ["ちょう"], mnemonicFr: "CHEF - dirigeant.", targetKanji: ["長"] },
  { word: "直接", meanings: ["Direct"], readings: ["ちょくせつ"], mnemonicFr: "DIRECT - sans intermédiaire.", targetKanji: ["直", "接"] },
  { word: "追う", meanings: ["Poursuivre"], readings: ["おう"], mnemonicFr: "POURSUIVRE - suivre.", targetKanji: ["追"] },
  { word: "通う", meanings: ["Fréquenter"], readings: ["かよう"], mnemonicFr: "FRÉQUENTER - aller régulièrement.", targetKanji: ["通"] },
  { word: "通り", meanings: ["Rue", "Comme"], readings: ["とおり"], mnemonicFr: "RUE - voie de passage.", targetKanji: ["通"] },
  { word: "通る", meanings: ["Passer"], readings: ["とおる"], mnemonicFr: "PASSER - traverser.", targetKanji: ["通"] },
  { word: "痛い", meanings: ["Douloureux"], readings: ["いたい"], mnemonicFr: "DOULOUREUX - qui fait mal.", targetKanji: ["痛"] },
  { word: "底", meanings: ["Fond"], readings: ["そこ"], mnemonicFr: "FOND - partie la plus basse.", targetKanji: ["底"] },
  { word: "提供", meanings: ["Offre", "Fourniture"], readings: ["ていきょう"], mnemonicFr: "OFFRE - mettre à disposition.", targetKanji: ["提", "供"] },
  { word: "程度", meanings: ["Degré", "Niveau"], readings: ["ていど"], mnemonicFr: "DEGRÉ - niveau de quelque chose.", targetKanji: ["程", "度"] },
  { word: "的", meanings: ["Cible", "Suffixe -tique"], readings: ["てき"], mnemonicFr: "CIBLE - but visé.", targetKanji: ["的"] },
  { word: "適当", meanings: ["Approprié"], readings: ["てきとう"], mnemonicFr: "APPROPRIÉ - qui convient.", targetKanji: ["適", "当"] },
  { word: "鉄", meanings: ["Fer"], readings: ["てつ"], mnemonicFr: "FER - métal.", targetKanji: ["鉄"] },
  { word: "店", meanings: ["Magasin"], readings: ["みせ"], mnemonicFr: "MAGASIN - commerce.", targetKanji: ["店"] },
  { word: "展開", meanings: ["Développement"], readings: ["てんかい"], mnemonicFr: "DÉVELOPPEMENT - se déployer.", targetKanji: ["展", "開"] },
  { word: "点", meanings: ["Point"], readings: ["てん"], mnemonicFr: "POINT - petite marque.", targetKanji: ["点"] },
  { word: "伝える", meanings: ["Transmettre"], readings: ["つたえる"], mnemonicFr: "TRANSMETTRE - faire passer.", targetKanji: ["伝"] },
  { word: "伝統", meanings: ["Tradition"], readings: ["でんとう"], mnemonicFr: "TRADITION - coutume ancienne.", targetKanji: ["伝", "統"] },
  { word: "田", meanings: ["Rizière"], readings: ["た"], mnemonicFr: "RIZIÈRE - champ de riz.", targetKanji: ["田"] },
  { word: "都市", meanings: ["Ville"], readings: ["とし"], mnemonicFr: "VILLE - grande agglomération.", targetKanji: ["都", "市"] },
  { word: "度", meanings: ["Degré", "Fois"], readings: ["ど"], mnemonicFr: "DEGRÉ - mesure.", targetKanji: ["度"] },
  { word: "土地", meanings: ["Terrain"], readings: ["とち"], mnemonicFr: "TERRAIN - surface de terre.", targetKanji: ["土", "地"] },
  { word: "努力", meanings: ["Effort"], readings: ["どりょく"], mnemonicFr: "EFFORT - travail acharné.", targetKanji: ["努", "力"] },
  { word: "当然", meanings: ["Naturellement"], readings: ["とうぜん"], mnemonicFr: "NATURELLEMENT - évidemment.", targetKanji: ["当", "然"] },
  { word: "当時", meanings: ["À l'époque"], readings: ["とうじ"], mnemonicFr: "À L'ÉPOQUE - à ce moment-là.", targetKanji: ["当", "時"] },
  { word: "投げる", meanings: ["Lancer"], readings: ["なげる"], mnemonicFr: "LANCER - jeter.", targetKanji: ["投"] },
  { word: "島", meanings: ["Île"], readings: ["しま"], mnemonicFr: "ÎLE - terre entourée d'eau.", targetKanji: ["島"] },
  { word: "頭", meanings: ["Tête"], readings: ["あたま"], mnemonicFr: "TÊTE - partie supérieure du corps.", targetKanji: ["頭"] },
  { word: "同時", meanings: ["Simultané"], readings: ["どうじ"], mnemonicFr: "SIMULTANÉ - en même temps.", targetKanji: ["同", "時"] },
  { word: "同様", meanings: ["De même"], readings: ["どうよう"], mnemonicFr: "DE MÊME - pareillement.", targetKanji: ["同", "様"] },
  { word: "道", meanings: ["Chemin", "Voie"], readings: ["みち"], mnemonicFr: "CHEMIN - voie de passage.", targetKanji: ["道"] },
  { word: "導く", meanings: ["Guider"], readings: ["みちびく"], mnemonicFr: "GUIDER - montrer le chemin.", targetKanji: ["導"] },
  { word: "働く", meanings: ["Travailler"], readings: ["はたらく"], mnemonicFr: "TRAVAILLER - exercer un métier.", targetKanji: ["働"] },
  { word: "読者", meanings: ["Lecteur"], readings: ["どくしゃ"], mnemonicFr: "LECTEUR - personne qui lit.", targetKanji: ["読", "者"] },
  { word: "届出", meanings: ["Déclaration"], readings: ["とどけで"], mnemonicFr: "DÉCLARATION - notification.", targetKanji: ["届", "出"] },
  { word: "内容", meanings: ["Contenu"], readings: ["ないよう"], mnemonicFr: "CONTENU - ce qui est à l'intérieur.", targetKanji: ["内", "容"] },
  { word: "難しい", meanings: ["Difficile"], readings: ["むずかしい"], mnemonicFr: "DIFFICILE - pas facile.", targetKanji: ["難"] },
  { word: "日常", meanings: ["Quotidien"], readings: ["にちじょう"], mnemonicFr: "QUOTIDIEN - de tous les jours.", targetKanji: ["日", "常"] },
  { word: "入れる", meanings: ["Mettre dedans"], readings: ["いれる"], mnemonicFr: "METTRE - insérer.", targetKanji: ["入"] },
  { word: "認める", meanings: ["Reconnaître"], readings: ["みとめる"], mnemonicFr: "RECONNAÎTRE - admettre.", targetKanji: ["認"] },
  { word: "熱", meanings: ["Chaleur", "Fièvre"], readings: ["ねつ"], mnemonicFr: "CHALEUR - température élevée.", targetKanji: ["熱"] },
  { word: "年代", meanings: ["Époque", "Décennie"], readings: ["ねんだい"], mnemonicFr: "ÉPOQUE - période de temps.", targetKanji: ["年", "代"] },
  { word: "念", meanings: ["Idée", "Pensée"], readings: ["ねん"], mnemonicFr: "IDÉE - pensée dans l'esprit.", targetKanji: ["念"] },
  { word: "能力", meanings: ["Capacité"], readings: ["のうりょく"], mnemonicFr: "CAPACITÉ - aptitude.", targetKanji: ["能", "力"] },
  { word: "農業", meanings: ["Agriculture"], readings: ["のうぎょう"], mnemonicFr: "AGRICULTURE - culture des terres.", targetKanji: ["農", "業"] },
  { word: "波", meanings: ["Vague"], readings: ["なみ"], mnemonicFr: "VAGUE - ondulation de l'eau.", targetKanji: ["波"] },
  { word: "破る", meanings: ["Déchirer", "Briser"], readings: ["やぶる"], mnemonicFr: "DÉCHIRER - mettre en morceaux.", targetKanji: ["破"] },
  { word: "敗れる", meanings: ["Être vaincu"], readings: ["やぶれる"], mnemonicFr: "ÊTRE VAINCU - perdre.", targetKanji: ["敗"] },
  { word: "配る", meanings: ["Distribuer"], readings: ["くばる"], mnemonicFr: "DISTRIBUER - donner à chacun.", targetKanji: ["配"] },
  { word: "倍", meanings: ["Double", "Fois"], readings: ["ばい"], mnemonicFr: "DOUBLE - deux fois.", targetKanji: ["倍"] },
  { word: "売れる", meanings: ["Se vendre"], readings: ["うれる"], mnemonicFr: "SE VENDRE - être acheté.", targetKanji: ["売"] },
  { word: "発見", meanings: ["Découverte"], readings: ["はっけん"], mnemonicFr: "DÉCOUVERTE - trouver.", targetKanji: ["発", "見"] },
  { word: "発生", meanings: ["Apparition"], readings: ["はっせい"], mnemonicFr: "APPARITION - se produire.", targetKanji: ["発", "生"] },
  { word: "発達", meanings: ["Développement"], readings: ["はったつ"], mnemonicFr: "DÉVELOPPEMENT - progression.", targetKanji: ["発", "達"] },
  { word: "発表", meanings: ["Annonce"], readings: ["はっぴょう"], mnemonicFr: "ANNONCE - rendre public.", targetKanji: ["発", "表"] },
  { word: "判断", meanings: ["Jugement"], readings: ["はんだん"], mnemonicFr: "JUGEMENT - décision.", targetKanji: ["判", "断"] },
  { word: "反対", meanings: ["Opposition"], readings: ["はんたい"], mnemonicFr: "OPPOSITION - être contre.", targetKanji: ["反", "対"] },
  { word: "反応", meanings: ["Réaction"], readings: ["はんのう"], mnemonicFr: "RÉACTION - réponse.", targetKanji: ["反", "応"] },
  { word: "犯罪", meanings: ["Crime"], readings: ["はんざい"], mnemonicFr: "CRIME - acte illégal.", targetKanji: ["犯", "罪"] },
  { word: "番組", meanings: ["Programme TV"], readings: ["ばんぐみ"], mnemonicFr: "PROGRAMME - émission.", targetKanji: ["番", "組"] },
  { word: "比べる", meanings: ["Comparer"], readings: ["くらべる"], mnemonicFr: "COMPARER - mettre en parallèle.", targetKanji: ["比"] },
  { word: "皮", meanings: ["Peau"], readings: ["かわ"], mnemonicFr: "PEAU - surface du corps.", targetKanji: ["皮"] },
  { word: "否定", meanings: ["Négation"], readings: ["ひてい"], mnemonicFr: "NÉGATION - dire non.", targetKanji: ["否", "定"] },
  { word: "費用", meanings: ["Frais", "Coût"], readings: ["ひよう"], mnemonicFr: "FRAIS - argent dépensé.", targetKanji: ["費", "用"] },
  { word: "非常", meanings: ["Urgence", "Extrême"], readings: ["ひじょう"], mnemonicFr: "URGENCE - situation critique.", targetKanji: ["非", "常"] },
  { word: "飛ぶ", meanings: ["Voler"], readings: ["とぶ"], mnemonicFr: "VOLER - se déplacer dans l'air.", targetKanji: ["飛"] },
  { word: "美しい", meanings: ["Beau"], readings: ["うつくしい"], mnemonicFr: "BEAU - agréable à voir.", targetKanji: ["美"] },
  { word: "必要", meanings: ["Nécessaire"], readings: ["ひつよう"], mnemonicFr: "NÉCESSAIRE - indispensable.", targetKanji: ["必", "要"] },
  { word: "表す", meanings: ["Exprimer"], readings: ["あらわす"], mnemonicFr: "EXPRIMER - montrer.", targetKanji: ["表"] },
  { word: "表現", meanings: ["Expression"], readings: ["ひょうげん"], mnemonicFr: "EXPRESSION - manière de dire.", targetKanji: ["表", "現"] },
  { word: "評価", meanings: ["Évaluation"], readings: ["ひょうか"], mnemonicFr: "ÉVALUATION - appréciation.", targetKanji: ["評", "価"] },
  { word: "病院", meanings: ["Hôpital"], readings: ["びょういん"], mnemonicFr: "HÔPITAL - établissement médical.", targetKanji: ["病", "院"] },
  { word: "病気", meanings: ["Maladie"], readings: ["びょうき"], mnemonicFr: "MALADIE - état de santé.", targetKanji: ["病", "気"] },
  { word: "品", meanings: ["Article", "Produit"], readings: ["しな"], mnemonicFr: "ARTICLE - chose à vendre.", targetKanji: ["品"] },
  { word: "不安", meanings: ["Inquiétude"], readings: ["ふあん"], mnemonicFr: "INQUIÉTUDE - sentiment d'angoisse.", targetKanji: ["不", "安"] },
  { word: "夫婦", meanings: ["Couple marié"], readings: ["ふうふ"], mnemonicFr: "COUPLE - mari et femme.", targetKanji: ["夫", "婦"] },
  { word: "富", meanings: ["Richesse"], readings: ["とみ"], mnemonicFr: "RICHESSE - avoir beaucoup.", targetKanji: ["富"] },
  { word: "普通", meanings: ["Normal", "Ordinaire"], readings: ["ふつう"], mnemonicFr: "NORMAL - comme d'habitude.", targetKanji: ["普", "通"] },
  { word: "負ける", meanings: ["Perdre"], readings: ["まける"], mnemonicFr: "PERDRE - ne pas gagner.", targetKanji: ["負"] },
  { word: "部分", meanings: ["Partie"], readings: ["ぶぶん"], mnemonicFr: "PARTIE - morceau de l'ensemble.", targetKanji: ["部", "分"] },
  { word: "部門", meanings: ["Département"], readings: ["ぶもん"], mnemonicFr: "DÉPARTEMENT - division.", targetKanji: ["部", "門"] },
  { word: "風", meanings: ["Vent"], readings: ["かぜ"], mnemonicFr: "VENT - mouvement d'air.", targetKanji: ["風"] },
  { word: "復活", meanings: ["Résurrection"], readings: ["ふっかつ"], mnemonicFr: "RÉSURRECTION - revenir à la vie.", targetKanji: ["復", "活"] },
  { word: "物語", meanings: ["Histoire", "Récit"], readings: ["ものがたり"], mnemonicFr: "HISTOIRE - narration.", targetKanji: ["物", "語"] },
  { word: "分野", meanings: ["Domaine", "Champ"], readings: ["ぶんや"], mnemonicFr: "DOMAINE - secteur.", targetKanji: ["分", "野"] },
  { word: "文化", meanings: ["Culture"], readings: ["ぶんか"], mnemonicFr: "CULTURE - civilisation.", targetKanji: ["文", "化"] },
  { word: "文学", meanings: ["Littérature"], readings: ["ぶんがく"], mnemonicFr: "LITTÉRATURE - art des mots.", targetKanji: ["文", "学"] },
  { word: "聞こえる", meanings: ["Être audible"], readings: ["きこえる"], mnemonicFr: "ÊTRE AUDIBLE - pouvoir entendre.", targetKanji: ["聞"] },
  { word: "平均", meanings: ["Moyenne"], readings: ["へいきん"], mnemonicFr: "MOYENNE - valeur centrale.", targetKanji: ["平", "均"] },
  { word: "平和", meanings: ["Paix"], readings: ["へいわ"], mnemonicFr: "PAIX - absence de guerre.", targetKanji: ["平", "和"] },
  { word: "閉じる", meanings: ["Fermer"], readings: ["とじる"], mnemonicFr: "FERMER - ne plus ouvrir.", targetKanji: ["閉"] },
  { word: "別", meanings: ["Autre", "Séparé"], readings: ["べつ"], mnemonicFr: "AUTRE - différent.", targetKanji: ["別"] },
  { word: "辺", meanings: ["Alentours"], readings: ["へん"], mnemonicFr: "ALENTOURS - environs.", targetKanji: ["辺"] },
  { word: "変える", meanings: ["Changer"], readings: ["かえる"], mnemonicFr: "CHANGER - modifier.", targetKanji: ["変"] },
  { word: "変化", meanings: ["Changement"], readings: ["へんか"], mnemonicFr: "CHANGEMENT - transformation.", targetKanji: ["変", "化"] },
  { word: "返す", meanings: ["Rendre"], readings: ["かえす"], mnemonicFr: "RENDRE - redonner.", targetKanji: ["返"] },
];

async function main() {
  console.log("=== EXPANDING VOCABULARY ===\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  const allVocab = [...vocabPart1, ...vocabPart2, ...vocabPart3, ...vocabPart4, ...vocabPart5];

  let added = 0;
  let skipped = 0;

  for (const vocab of allVocab) {
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    // Check all kanji exist
    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    // Skip if word uses kanji we don't have
    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));
    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skipped++;
      continue;
    }

    // Find the max level of kanji used
    let maxLevel = 1;
    for (const char of wordKanji) {
      const level = kanjiLevels.get(char);
      if (level && level > maxLevel) maxLevel = level;
    }

    try {
      const newVocab = await prisma.vocabulary.create({
        data: {
          word: vocab.word,
          meaningsFr: vocab.meanings,
          readings: vocab.readings,
          mnemonicFr: vocab.mnemonicFr,
          levelId: maxLevel,
        }
      });

      // Link to kanji
      for (const char of kanjiInWord) {
        const kanji = await prisma.kanji.findFirst({
          where: { character: char }
        });
        if (kanji) {
          await prisma.vocabularyKanji.create({
            data: {
              vocabularyId: newVocab.id,
              kanjiId: kanji.id
            }
          }).catch(() => {}); // Ignore if already exists
        }
      }

      added++;
    } catch (e: any) {
      if (e.code !== "P2002") {
        console.log(`Error adding ${vocab.word}: ${e.message}`);
      }
      skipped++;
    }
  }

  const total = await prisma.vocabulary.count();
  console.log(`\nAdded: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total vocabulary: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
