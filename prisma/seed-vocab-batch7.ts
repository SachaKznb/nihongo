import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary Batch 7: Japanese Culture, Food, Daily Expressions, Family, House, Clothing
// For French speakers learning Japanese (JLPT N5-N3 kanji)

// Part 1: Family & Relationships
const vocabFamily = [
  // Parents and grandparents
  { word: "父親", meanings: ["Pere"], readings: ["ちちおや"], mnemonicFr: "PERE - le parent masculin de la famille.", targetKanji: ["父", "親"] },
  { word: "母親", meanings: ["Mere"], readings: ["ははおや"], mnemonicFr: "MERE - le parent feminin de la famille.", targetKanji: ["母", "親"] },
  { word: "両親", meanings: ["Parents"], readings: ["りょうしん"], mnemonicFr: "PARENTS - pere et mere ensemble.", targetKanji: ["両", "親"] },
  { word: "祖父", meanings: ["Grand-pere"], readings: ["そふ"], mnemonicFr: "GRAND-PERE - le pere de mon pere ou de ma mere.", targetKanji: ["祖", "父"] },
  { word: "祖母", meanings: ["Grand-mere"], readings: ["そぼ"], mnemonicFr: "GRAND-MERE - la mere de mon pere ou de ma mere.", targetKanji: ["祖", "母"] },
  { word: "祖先", meanings: ["Ancetres"], readings: ["そせん"], mnemonicFr: "ANCETRES - les generations qui nous ont precedes.", targetKanji: ["祖", "先"] },

  // Siblings
  { word: "兄弟", meanings: ["Freres"], readings: ["きょうだい"], mnemonicFr: "FRERES - les garcons d'une meme famille.", targetKanji: ["兄", "弟"] },
  { word: "姉妹", meanings: ["Soeurs"], readings: ["しまい"], mnemonicFr: "SOEURS - les filles d'une meme famille.", targetKanji: ["姉", "妹"] },
  { word: "兄", meanings: ["Grand frere"], readings: ["あに"], mnemonicFr: "GRAND FRERE - le frere plus age.", targetKanji: ["兄"] },
  { word: "弟", meanings: ["Petit frere"], readings: ["おとうと"], mnemonicFr: "PETIT FRERE - le frere plus jeune.", targetKanji: ["弟"] },
  { word: "姉", meanings: ["Grande soeur"], readings: ["あね"], mnemonicFr: "GRANDE SOEUR - la soeur plus agee.", targetKanji: ["姉"] },
  { word: "妹", meanings: ["Petite soeur"], readings: ["いもうと"], mnemonicFr: "PETITE SOEUR - la soeur plus jeune.", targetKanji: ["妹"] },

  // Children and descendants
  { word: "子孫", meanings: ["Descendants"], readings: ["しそん"], mnemonicFr: "DESCENDANTS - les generations futures de la famille.", targetKanji: ["子", "孫"] },
  { word: "孫", meanings: ["Petit-enfant"], readings: ["まご"], mnemonicFr: "PETIT-ENFANT - l'enfant de mon enfant.", targetKanji: ["孫"] },
  { word: "息子", meanings: ["Fils"], readings: ["むすこ"], mnemonicFr: "FILS - enfant masculin.", targetKanji: ["息", "子"] },
  { word: "娘", meanings: ["Fille"], readings: ["むすめ"], mnemonicFr: "FILLE - enfant feminin.", targetKanji: ["娘"] },

  // Extended family
  { word: "親戚", meanings: ["Parents (famille etendue)"], readings: ["しんせき"], mnemonicFr: "PARENTS - membres de la famille etendue.", targetKanji: ["親", "戚"] },
  { word: "家族", meanings: ["Famille"], readings: ["かぞく"], mnemonicFr: "FAMILLE - groupe de personnes apparentees.", targetKanji: ["家", "族"] },
  { word: "夫", meanings: ["Mari", "Epoux"], readings: ["おっと"], mnemonicFr: "MARI - l'homme dans un couple marie.", targetKanji: ["夫"] },
  { word: "妻", meanings: ["Epouse", "Femme"], readings: ["つま"], mnemonicFr: "EPOUSE - la femme dans un couple marie.", targetKanji: ["妻"] },
];

// Part 2: Food & Cuisine
const vocabFood = [
  // Types of cuisine
  { word: "和食", meanings: ["Cuisine japonaise"], readings: ["わしょく"], mnemonicFr: "CUISINE JAPONAISE - nourriture traditionnelle du Japon.", targetKanji: ["和", "食"] },
  { word: "洋食", meanings: ["Cuisine occidentale"], readings: ["ようしょく"], mnemonicFr: "CUISINE OCCIDENTALE - plats de style europeen.", targetKanji: ["洋", "食"] },
  { word: "中華", meanings: ["Cuisine chinoise"], readings: ["ちゅうか"], mnemonicFr: "CUISINE CHINOISE - plats de style chinois.", targetKanji: ["中", "華"] },
  { word: "料理", meanings: ["Cuisine", "Plat"], readings: ["りょうり"], mnemonicFr: "CUISINE - l'art de preparer les aliments.", targetKanji: ["料", "理"] },
  { word: "調理", meanings: ["Preparation culinaire"], readings: ["ちょうり"], mnemonicFr: "PREPARATION - preparer les ingredients pour cuisiner.", targetKanji: ["調", "理"] },

  // Ingredients
  { word: "食材", meanings: ["Ingredients"], readings: ["しょくざい"], mnemonicFr: "INGREDIENTS - matieres premieres pour la cuisine.", targetKanji: ["食", "材"] },
  { word: "野菜", meanings: ["Legumes"], readings: ["やさい"], mnemonicFr: "LEGUMES - plantes comestibles.", targetKanji: ["野", "菜"] },
  { word: "肉", meanings: ["Viande"], readings: ["にく"], mnemonicFr: "VIANDE - chair animale a manger.", targetKanji: ["肉"] },
  { word: "魚", meanings: ["Poisson"], readings: ["さかな"], mnemonicFr: "POISSON - animal aquatique comestible.", targetKanji: ["魚"] },
  { word: "牛肉", meanings: ["Boeuf"], readings: ["ぎゅうにく"], mnemonicFr: "BOEUF - viande de vache.", targetKanji: ["牛", "肉"] },
  { word: "豚肉", meanings: ["Porc"], readings: ["ぶたにく"], mnemonicFr: "PORC - viande de cochon.", targetKanji: ["豚", "肉"] },
  { word: "鶏肉", meanings: ["Poulet"], readings: ["とりにく"], mnemonicFr: "POULET - viande de volaille.", targetKanji: ["鶏", "肉"] },

  // Tableware
  { word: "食器", meanings: ["Vaisselle"], readings: ["しょっき"], mnemonicFr: "VAISSELLE - ustensiles pour manger.", targetKanji: ["食", "器"] },
  { word: "茶碗", meanings: ["Bol a riz"], readings: ["ちゃわん"], mnemonicFr: "BOL A RIZ - recipient pour le riz.", targetKanji: ["茶", "碗"] },
  { word: "箸", meanings: ["Baguettes"], readings: ["はし"], mnemonicFr: "BAGUETTES - ustensiles pour manger japonais.", targetKanji: ["箸"] },

  // Meals
  { word: "朝食", meanings: ["Petit-dejeuner"], readings: ["ちょうしょく"], mnemonicFr: "PETIT-DEJEUNER - repas du matin.", targetKanji: ["朝", "食"] },
  { word: "昼食", meanings: ["Dejeuner"], readings: ["ちゅうしょく"], mnemonicFr: "DEJEUNER - repas de midi.", targetKanji: ["昼", "食"] },
  { word: "夕食", meanings: ["Diner"], readings: ["ゆうしょく"], mnemonicFr: "DINER - repas du soir.", targetKanji: ["夕", "食"] },
  { word: "夜食", meanings: ["Repas nocturne"], readings: ["やしょく"], mnemonicFr: "REPAS NOCTURNE - manger tard le soir.", targetKanji: ["夜", "食"] },

  // Drinks
  { word: "飲み物", meanings: ["Boisson"], readings: ["のみもの"], mnemonicFr: "BOISSON - liquide a boire.", targetKanji: ["飲", "物"] },
  { word: "水", meanings: ["Eau"], readings: ["みず"], mnemonicFr: "EAU - liquide essentiel a la vie.", targetKanji: ["水"] },
  { word: "日本酒", meanings: ["Sake japonais"], readings: ["にほんしゅ"], mnemonicFr: "SAKE - alcool de riz japonais.", targetKanji: ["日", "本", "酒"] },
  { word: "緑茶", meanings: ["The vert"], readings: ["りょくちゃ"], mnemonicFr: "THE VERT - boisson traditionnelle japonaise.", targetKanji: ["緑", "茶"] },
];

// Part 3: Japanese Culture
const vocabCulture = [
  // Cultural concepts
  { word: "文化", meanings: ["Culture"], readings: ["ぶんか"], mnemonicFr: "CULTURE - ensemble des traditions et coutumes.", targetKanji: ["文", "化"] },
  { word: "伝統", meanings: ["Tradition"], readings: ["でんとう"], mnemonicFr: "TRADITION - coutumes transmises de generation en generation.", targetKanji: ["伝", "統"] },
  { word: "習慣", meanings: ["Habitude", "Coutume"], readings: ["しゅうかん"], mnemonicFr: "HABITUDE - comportement repete regulierement.", targetKanji: ["習", "慣"] },
  { word: "風習", meanings: ["Coutumes", "Moeurs"], readings: ["ふうしゅう"], mnemonicFr: "COUTUMES - pratiques sociales d'un groupe.", targetKanji: ["風", "習"] },

  // Religion and spirituality
  { word: "祭り", meanings: ["Festival", "Fete"], readings: ["まつり"], mnemonicFr: "FESTIVAL - celebration traditionnelle japonaise.", targetKanji: ["祭"] },
  { word: "神社", meanings: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonicFr: "SANCTUAIRE - lieu de culte shinto.", targetKanji: ["神", "社"] },
  { word: "寺", meanings: ["Temple bouddhiste"], readings: ["てら"], mnemonicFr: "TEMPLE - lieu de culte bouddhiste.", targetKanji: ["寺"] },
  { word: "仏教", meanings: ["Bouddhisme"], readings: ["ぶっきょう"], mnemonicFr: "BOUDDHISME - religion et philosophie de Bouddha.", targetKanji: ["仏", "教"] },
  { word: "神道", meanings: ["Shinto"], readings: ["しんとう"], mnemonicFr: "SHINTO - religion native du Japon.", targetKanji: ["神", "道"] },
  { word: "参拝", meanings: ["Visite au temple"], readings: ["さんぱい"], mnemonicFr: "VISITE AU TEMPLE - aller prier au sanctuaire.", targetKanji: ["参", "拝"] },

  // Arts
  { word: "芸術", meanings: ["Art", "Beaux-arts"], readings: ["げいじゅつ"], mnemonicFr: "ART - expression creative et esthetique.", targetKanji: ["芸", "術"] },
  { word: "書道", meanings: ["Calligraphie"], readings: ["しょどう"], mnemonicFr: "CALLIGRAPHIE - art de la belle ecriture.", targetKanji: ["書", "道"] },
  { word: "茶道", meanings: ["Ceremonie du the"], readings: ["さどう"], mnemonicFr: "CEREMONIE DU THE - art de preparer et servir le the.", targetKanji: ["茶", "道"] },
  { word: "華道", meanings: ["Art floral", "Ikebana"], readings: ["かどう"], mnemonicFr: "ART FLORAL - arrangement de fleurs japonais.", targetKanji: ["華", "道"] },
  { word: "武道", meanings: ["Arts martiaux"], readings: ["ぶどう"], mnemonicFr: "ARTS MARTIAUX - disciplines de combat traditionnelles.", targetKanji: ["武", "道"] },
  { word: "柔道", meanings: ["Judo"], readings: ["じゅうどう"], mnemonicFr: "JUDO - art martial de la souplesse.", targetKanji: ["柔", "道"] },
  { word: "空手", meanings: ["Karate"], readings: ["からて"], mnemonicFr: "KARATE - art martial a mains nues.", targetKanji: ["空", "手"] },
  { word: "剣道", meanings: ["Kendo"], readings: ["けんどう"], mnemonicFr: "KENDO - art de l'escrime japonaise.", targetKanji: ["剣", "道"] },

  // Traditional items
  { word: "歴史", meanings: ["Histoire"], readings: ["れきし"], mnemonicFr: "HISTOIRE - etude du passe.", targetKanji: ["歴", "史"] },
  { word: "古代", meanings: ["Antiquite"], readings: ["こだい"], mnemonicFr: "ANTIQUITE - epoque tres ancienne.", targetKanji: ["古", "代"] },
  { word: "現代", meanings: ["Epoque moderne"], readings: ["げんだい"], mnemonicFr: "EPOQUE MODERNE - notre epoque actuelle.", targetKanji: ["現", "代"] },
];

// Part 4: Time of Day & Greetings Context
const vocabTime = [
  // Parts of day
  { word: "朝方", meanings: ["Tot le matin"], readings: ["あさがた"], mnemonicFr: "TOT LE MATIN - les premieres heures du jour.", targetKanji: ["朝", "方"] },
  { word: "夕方", meanings: ["Fin d'apres-midi", "Soiree"], readings: ["ゆうがた"], mnemonicFr: "FIN D'APRES-MIDI - quand le soleil se couche.", targetKanji: ["夕", "方"] },
  { word: "真夜中", meanings: ["Minuit"], readings: ["まよなか"], mnemonicFr: "MINUIT - le milieu de la nuit.", targetKanji: ["真", "夜", "中"] },
  { word: "深夜", meanings: ["Tard dans la nuit"], readings: ["しんや"], mnemonicFr: "TARD DANS LA NUIT - heures avancees de la nuit.", targetKanji: ["深", "夜"] },
  { word: "早朝", meanings: ["Petit matin"], readings: ["そうちょう"], mnemonicFr: "PETIT MATIN - tres tot le matin.", targetKanji: ["早", "朝"] },
  { word: "午前", meanings: ["Matin", "AM"], readings: ["ごぜん"], mnemonicFr: "MATIN - avant midi.", targetKanji: ["午", "前"] },
  { word: "午後", meanings: ["Apres-midi", "PM"], readings: ["ごご"], mnemonicFr: "APRES-MIDI - apres midi.", targetKanji: ["午", "後"] },
  { word: "正午", meanings: ["Midi pile"], readings: ["しょうご"], mnemonicFr: "MIDI - exactement 12 heures.", targetKanji: ["正", "午"] },
  { word: "夜中", meanings: ["Milieu de la nuit"], readings: ["よなか"], mnemonicFr: "MILIEU DE LA NUIT - pendant la nuit.", targetKanji: ["夜", "中"] },
  { word: "一日中", meanings: ["Toute la journee"], readings: ["いちにちじゅう"], mnemonicFr: "TOUTE LA JOURNEE - du matin au soir.", targetKanji: ["一", "日", "中"] },

  // Time expressions
  { word: "今日", meanings: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "AUJOURD'HUI - ce jour-ci.", targetKanji: ["今", "日"] },
  { word: "明日", meanings: ["Demain"], readings: ["あした"], mnemonicFr: "DEMAIN - le jour suivant.", targetKanji: ["明", "日"] },
  { word: "昨日", meanings: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER - le jour precedent.", targetKanji: ["昨", "日"] },
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - tous les jours.", targetKanji: ["毎", "日"] },
  { word: "毎週", meanings: ["Chaque semaine"], readings: ["まいしゅう"], mnemonicFr: "CHAQUE SEMAINE - toutes les semaines.", targetKanji: ["毎", "週"] },
  { word: "毎月", meanings: ["Chaque mois"], readings: ["まいつき"], mnemonicFr: "CHAQUE MOIS - tous les mois.", targetKanji: ["毎", "月"] },
  { word: "毎年", meanings: ["Chaque annee"], readings: ["まいとし"], mnemonicFr: "CHAQUE ANNEE - toutes les annees.", targetKanji: ["毎", "年"] },
];

// Part 5: House & Rooms
const vocabHouse = [
  // Entrance and exterior
  { word: "玄関", meanings: ["Entree", "Hall d'entree"], readings: ["げんかん"], mnemonicFr: "ENTREE - l'espace ou on enleve ses chaussures.", targetKanji: ["玄", "関"] },
  { word: "門", meanings: ["Portail", "Porte"], readings: ["もん"], mnemonicFr: "PORTAIL - grande porte d'entree.", targetKanji: ["門"] },
  { word: "庭", meanings: ["Jardin"], readings: ["にわ"], mnemonicFr: "JARDIN - espace vert autour de la maison.", targetKanji: ["庭"] },

  // Rooms
  { word: "台所", meanings: ["Cuisine"], readings: ["だいどころ"], mnemonicFr: "CUISINE - piece ou on prepare les repas.", targetKanji: ["台", "所"] },
  { word: "居間", meanings: ["Salon", "Sejour"], readings: ["いま"], mnemonicFr: "SALON - piece de vie principale.", targetKanji: ["居", "間"] },
  { word: "寝室", meanings: ["Chambre a coucher"], readings: ["しんしつ"], mnemonicFr: "CHAMBRE - piece ou on dort.", targetKanji: ["寝", "室"] },
  { word: "浴室", meanings: ["Salle de bain"], readings: ["よくしつ"], mnemonicFr: "SALLE DE BAIN - piece pour se laver.", targetKanji: ["浴", "室"] },
  { word: "和室", meanings: ["Piece japonaise"], readings: ["わしつ"], mnemonicFr: "PIECE JAPONAISE - piece avec tatamis.", targetKanji: ["和", "室"] },
  { word: "洋室", meanings: ["Piece occidentale"], readings: ["ようしつ"], mnemonicFr: "PIECE OCCIDENTALE - piece de style europeen.", targetKanji: ["洋", "室"] },
  { word: "客室", meanings: ["Chambre d'amis"], readings: ["きゃくしつ"], mnemonicFr: "CHAMBRE D'AMIS - piece pour les invites.", targetKanji: ["客", "室"] },
  { word: "子供部屋", meanings: ["Chambre d'enfant"], readings: ["こどもべや"], mnemonicFr: "CHAMBRE D'ENFANT - piece pour les enfants.", targetKanji: ["子", "供", "部", "屋"] },

  // Floors and structure
  { word: "階段", meanings: ["Escalier"], readings: ["かいだん"], mnemonicFr: "ESCALIER - marches pour monter.", targetKanji: ["階", "段"] },
  { word: "一階", meanings: ["Premier etage", "Rez-de-chaussee"], readings: ["いっかい"], mnemonicFr: "REZ-DE-CHAUSSEE - niveau du sol.", targetKanji: ["一", "階"] },
  { word: "二階", meanings: ["Deuxieme etage"], readings: ["にかい"], mnemonicFr: "DEUXIEME ETAGE - etage au-dessus.", targetKanji: ["二", "階"] },
  { word: "屋根", meanings: ["Toit"], readings: ["やね"], mnemonicFr: "TOIT - partie superieure de la maison.", targetKanji: ["屋", "根"] },
  { word: "床", meanings: ["Sol", "Plancher"], readings: ["ゆか"], mnemonicFr: "SOL - surface ou on marche.", targetKanji: ["床"] },
  { word: "天井", meanings: ["Plafond"], readings: ["てんじょう"], mnemonicFr: "PLAFOND - surface au-dessus de nos tetes.", targetKanji: ["天", "井"] },
  { word: "壁", meanings: ["Mur"], readings: ["かべ"], mnemonicFr: "MUR - paroi verticale.", targetKanji: ["壁"] },
  { word: "窓", meanings: ["Fenetre"], readings: ["まど"], mnemonicFr: "FENETRE - ouverture pour la lumiere.", targetKanji: ["窓"] },
];

// Part 6: Clothing
const vocabClothing = [
  // Traditional clothing
  { word: "和服", meanings: ["Vetement japonais"], readings: ["わふく"], mnemonicFr: "VETEMENT JAPONAIS - costume traditionnel du Japon.", targetKanji: ["和", "服"] },
  { word: "洋服", meanings: ["Vetement occidental"], readings: ["ようふく"], mnemonicFr: "VETEMENT OCCIDENTAL - habits de style europeen.", targetKanji: ["洋", "服"] },
  { word: "着物", meanings: ["Kimono"], readings: ["きもの"], mnemonicFr: "KIMONO - robe traditionnelle japonaise.", targetKanji: ["着", "物"] },
  { word: "帯", meanings: ["Ceinture de kimono", "Obi"], readings: ["おび"], mnemonicFr: "OBI - large ceinture decorative.", targetKanji: ["帯"] },
  { word: "草履", meanings: ["Sandales japonaises"], readings: ["ぞうり"], mnemonicFr: "ZORI - sandales traditionnelles.", targetKanji: ["草", "履"] },

  // Modern clothing
  { word: "服", meanings: ["Vetement"], readings: ["ふく"], mnemonicFr: "VETEMENT - ce qu'on porte sur le corps.", targetKanji: ["服"] },
  { word: "上着", meanings: ["Veste", "Haut"], readings: ["うわぎ"], mnemonicFr: "VESTE - vetement du haut.", targetKanji: ["上", "着"] },
  { word: "下着", meanings: ["Sous-vetement"], readings: ["したぎ"], mnemonicFr: "SOUS-VETEMENT - vetement porte dessous.", targetKanji: ["下", "着"] },
  { word: "靴", meanings: ["Chaussures"], readings: ["くつ"], mnemonicFr: "CHAUSSURES - ce qu'on porte aux pieds.", targetKanji: ["靴"] },
  { word: "帽子", meanings: ["Chapeau"], readings: ["ぼうし"], mnemonicFr: "CHAPEAU - couvre-chef.", targetKanji: ["帽", "子"] },
  { word: "手袋", meanings: ["Gants"], readings: ["てぶくろ"], mnemonicFr: "GANTS - couvre-mains.", targetKanji: ["手", "袋"] },
  { word: "眼鏡", meanings: ["Lunettes"], readings: ["めがね"], mnemonicFr: "LUNETTES - accessoire pour voir.", targetKanji: ["眼", "鏡"] },
];

// Part 7: Manners & Etiquette
const vocabManners = [
  { word: "礼儀", meanings: ["Politesse", "Etiquette"], readings: ["れいぎ"], mnemonicFr: "POLITESSE - regles de bonne conduite.", targetKanji: ["礼", "儀"] },
  { word: "作法", meanings: ["Manieres", "Etiquette"], readings: ["さほう"], mnemonicFr: "MANIERES - facon correcte de faire les choses.", targetKanji: ["作", "法"] },
  { word: "挨拶", meanings: ["Salutation"], readings: ["あいさつ"], mnemonicFr: "SALUTATION - formule de politesse.", targetKanji: ["挨", "拶"] },
  { word: "敬語", meanings: ["Langage poli"], readings: ["けいご"], mnemonicFr: "LANGAGE POLI - forme respectueuse du japonais.", targetKanji: ["敬", "語"] },
  { word: "丁寧", meanings: ["Poli", "Soigne"], readings: ["ていねい"], mnemonicFr: "POLI - avec attention et respect.", targetKanji: ["丁", "寧"] },
  { word: "失礼", meanings: ["Excuse-moi", "Impoli"], readings: ["しつれい"], mnemonicFr: "EXCUSE-MOI - formule d'excuse ou de depart.", targetKanji: ["失", "礼"] },
  { word: "感謝", meanings: ["Gratitude"], readings: ["かんしゃ"], mnemonicFr: "GRATITUDE - sentiment de reconnaissance.", targetKanji: ["感", "謝"] },
  { word: "謝る", meanings: ["S'excuser"], readings: ["あやまる"], mnemonicFr: "S'EXCUSER - presenter ses excuses.", targetKanji: ["謝"] },
  { word: "頭を下げる", meanings: ["S'incliner"], readings: ["あたまをさげる"], mnemonicFr: "S'INCLINER - baisser la tete en signe de respect.", targetKanji: ["頭", "下"] },
  { word: "正座", meanings: ["Position assise formelle"], readings: ["せいざ"], mnemonicFr: "SEIZA - position a genoux traditionnelle.", targetKanji: ["正", "座"] },
];

// Part 8: Nature & Seasons
const vocabNature = [
  // Seasons
  { word: "季節", meanings: ["Saison"], readings: ["きせつ"], mnemonicFr: "SAISON - division de l'annee.", targetKanji: ["季", "節"] },
  { word: "春", meanings: ["Printemps"], readings: ["はる"], mnemonicFr: "PRINTEMPS - saison des fleurs.", targetKanji: ["春"] },
  { word: "夏", meanings: ["Ete"], readings: ["なつ"], mnemonicFr: "ETE - saison chaude.", targetKanji: ["夏"] },
  { word: "秋", meanings: ["Automne"], readings: ["あき"], mnemonicFr: "AUTOMNE - saison des feuilles.", targetKanji: ["秋"] },
  { word: "冬", meanings: ["Hiver"], readings: ["ふゆ"], mnemonicFr: "HIVER - saison froide.", targetKanji: ["冬"] },

  // Nature elements
  { word: "自然", meanings: ["Nature"], readings: ["しぜん"], mnemonicFr: "NATURE - le monde naturel.", targetKanji: ["自", "然"] },
  { word: "山", meanings: ["Montagne"], readings: ["やま"], mnemonicFr: "MONTAGNE - grande elevation de terrain.", targetKanji: ["山"] },
  { word: "川", meanings: ["Riviere"], readings: ["かわ"], mnemonicFr: "RIVIERE - cours d'eau.", targetKanji: ["川"] },
  { word: "海", meanings: ["Mer"], readings: ["うみ"], mnemonicFr: "MER - grande etendue d'eau salee.", targetKanji: ["海"] },
  { word: "森", meanings: ["Foret"], readings: ["もり"], mnemonicFr: "FORET - grande etendue d'arbres.", targetKanji: ["森"] },
  { word: "林", meanings: ["Bois"], readings: ["はやし"], mnemonicFr: "BOIS - petite foret.", targetKanji: ["林"] },
  { word: "花", meanings: ["Fleur"], readings: ["はな"], mnemonicFr: "FLEUR - partie coloree d'une plante.", targetKanji: ["花"] },
  { word: "木", meanings: ["Arbre"], readings: ["き"], mnemonicFr: "ARBRE - grande plante.", targetKanji: ["木"] },
  { word: "草", meanings: ["Herbe"], readings: ["くさ"], mnemonicFr: "HERBE - petite plante verte.", targetKanji: ["草"] },

  // Weather
  { word: "天気", meanings: ["Temps", "Meteo"], readings: ["てんき"], mnemonicFr: "TEMPS - conditions meteorologiques.", targetKanji: ["天", "気"] },
  { word: "晴れ", meanings: ["Beau temps"], readings: ["はれ"], mnemonicFr: "BEAU TEMPS - ciel degage.", targetKanji: ["晴"] },
  { word: "曇り", meanings: ["Nuageux"], readings: ["くもり"], mnemonicFr: "NUAGEUX - ciel couvert.", targetKanji: ["曇"] },
  { word: "雨", meanings: ["Pluie"], readings: ["あめ"], mnemonicFr: "PLUIE - eau qui tombe du ciel.", targetKanji: ["雨"] },
  { word: "雪", meanings: ["Neige"], readings: ["ゆき"], mnemonicFr: "NEIGE - precipitation blanche.", targetKanji: ["雪"] },
  { word: "風", meanings: ["Vent"], readings: ["かぜ"], mnemonicFr: "VENT - mouvement d'air.", targetKanji: ["風"] },
  { word: "台風", meanings: ["Typhon"], readings: ["たいふう"], mnemonicFr: "TYPHON - tempete tropicale violente.", targetKanji: ["台", "風"] },
];

// Part 9: Common Verbs & Actions
const vocabVerbs = [
  { word: "食べる", meanings: ["Manger"], readings: ["たべる"], mnemonicFr: "MANGER - ingerer de la nourriture.", targetKanji: ["食"] },
  { word: "飲む", meanings: ["Boire"], readings: ["のむ"], mnemonicFr: "BOIRE - ingerer un liquide.", targetKanji: ["飲"] },
  { word: "寝る", meanings: ["Dormir"], readings: ["ねる"], mnemonicFr: "DORMIR - se reposer en sommeil.", targetKanji: ["寝"] },
  { word: "起きる", meanings: ["Se lever"], readings: ["おきる"], mnemonicFr: "SE LEVER - sortir du lit.", targetKanji: ["起"] },
  { word: "着る", meanings: ["Porter (vetement)"], readings: ["きる"], mnemonicFr: "PORTER - mettre un vetement.", targetKanji: ["着"] },
  { word: "脱ぐ", meanings: ["Enlever (vetement)"], readings: ["ぬぐ"], mnemonicFr: "ENLEVER - retirer un vetement.", targetKanji: ["脱"] },
  { word: "歩く", meanings: ["Marcher"], readings: ["あるく"], mnemonicFr: "MARCHER - se deplacer a pied.", targetKanji: ["歩"] },
  { word: "走る", meanings: ["Courir"], readings: ["はしる"], mnemonicFr: "COURIR - se deplacer rapidement.", targetKanji: ["走"] },
  { word: "立つ", meanings: ["Se tenir debout"], readings: ["たつ"], mnemonicFr: "SE TENIR DEBOUT - etre en position verticale.", targetKanji: ["立"] },
  { word: "座る", meanings: ["S'asseoir"], readings: ["すわる"], mnemonicFr: "S'ASSEOIR - prendre place.", targetKanji: ["座"] },
  { word: "見る", meanings: ["Regarder"], readings: ["みる"], mnemonicFr: "REGARDER - observer avec les yeux.", targetKanji: ["見"] },
  { word: "聞く", meanings: ["Ecouter"], readings: ["きく"], mnemonicFr: "ECOUTER - percevoir avec les oreilles.", targetKanji: ["聞"] },
  { word: "話す", meanings: ["Parler"], readings: ["はなす"], mnemonicFr: "PARLER - s'exprimer avec des mots.", targetKanji: ["話"] },
  { word: "読む", meanings: ["Lire"], readings: ["よむ"], mnemonicFr: "LIRE - dechiffrer un texte.", targetKanji: ["読"] },
  { word: "書く", meanings: ["Ecrire"], readings: ["かく"], mnemonicFr: "ECRIRE - tracer des caracteres.", targetKanji: ["書"] },
  { word: "勉強する", meanings: ["Etudier"], readings: ["べんきょうする"], mnemonicFr: "ETUDIER - apprendre.", targetKanji: ["勉", "強"] },
  { word: "仕事する", meanings: ["Travailler"], readings: ["しごとする"], mnemonicFr: "TRAVAILLER - exercer un metier.", targetKanji: ["仕", "事"] },
  { word: "買う", meanings: ["Acheter"], readings: ["かう"], mnemonicFr: "ACHETER - acquerir contre de l'argent.", targetKanji: ["買"] },
  { word: "売る", meanings: ["Vendre"], readings: ["うる"], mnemonicFr: "VENDRE - echanger contre de l'argent.", targetKanji: ["売"] },
  { word: "使う", meanings: ["Utiliser"], readings: ["つかう"], mnemonicFr: "UTILISER - se servir de.", targetKanji: ["使"] },
  { word: "待つ", meanings: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE - rester en place jusqu'a.", targetKanji: ["待"] },
  { word: "会う", meanings: ["Rencontrer"], readings: ["あう"], mnemonicFr: "RENCONTRER - se retrouver avec quelqu'un.", targetKanji: ["会"] },
  { word: "行く", meanings: ["Aller"], readings: ["いく"], mnemonicFr: "ALLER - se deplacer vers.", targetKanji: ["行"] },
  { word: "来る", meanings: ["Venir"], readings: ["くる"], mnemonicFr: "VENIR - se deplacer ici.", targetKanji: ["来"] },
  { word: "帰る", meanings: ["Rentrer"], readings: ["かえる"], mnemonicFr: "RENTRER - retourner chez soi.", targetKanji: ["帰"] },
];

// Part 10: Adjectives & Descriptions
const vocabAdjectives = [
  { word: "大きい", meanings: ["Grand"], readings: ["おおきい"], mnemonicFr: "GRAND - de grande taille.", targetKanji: ["大"] },
  { word: "小さい", meanings: ["Petit"], readings: ["ちいさい"], mnemonicFr: "PETIT - de petite taille.", targetKanji: ["小"] },
  { word: "高い", meanings: ["Haut", "Cher"], readings: ["たかい"], mnemonicFr: "HAUT - eleve en hauteur ou prix.", targetKanji: ["高"] },
  { word: "低い", meanings: ["Bas"], readings: ["ひくい"], mnemonicFr: "BAS - peu eleve.", targetKanji: ["低"] },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - de grande longueur.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - de faible longueur.", targetKanji: ["短"] },
  { word: "新しい", meanings: ["Nouveau"], readings: ["あたらしい"], mnemonicFr: "NOUVEAU - recent.", targetKanji: ["新"] },
  { word: "古い", meanings: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonicFr: "VIEUX - qui date.", targetKanji: ["古"] },
  { word: "広い", meanings: ["Large", "Vaste"], readings: ["ひろい"], mnemonicFr: "LARGE - de grande etendue.", targetKanji: ["広"] },
  { word: "狭い", meanings: ["Etroit"], readings: ["せまい"], mnemonicFr: "ETROIT - de faible largeur.", targetKanji: ["狭"] },
  { word: "明るい", meanings: ["Lumineux", "Joyeux"], readings: ["あかるい"], mnemonicFr: "LUMINEUX - plein de lumiere.", targetKanji: ["明"] },
  { word: "暗い", meanings: ["Sombre"], readings: ["くらい"], mnemonicFr: "SOMBRE - sans lumiere.", targetKanji: ["暗"] },
  { word: "暖かい", meanings: ["Tiede", "Chaud"], readings: ["あたたかい"], mnemonicFr: "TIEDE - agreablement chaud.", targetKanji: ["暖"] },
  { word: "涼しい", meanings: ["Frais"], readings: ["すずしい"], mnemonicFr: "FRAIS - agreablement froid.", targetKanji: ["涼"] },
  { word: "暑い", meanings: ["Chaud (climat)"], readings: ["あつい"], mnemonicFr: "CHAUD - temperature elevee.", targetKanji: ["暑"] },
  { word: "寒い", meanings: ["Froid (climat)"], readings: ["さむい"], mnemonicFr: "FROID - temperature basse.", targetKanji: ["寒"] },
  { word: "美味しい", meanings: ["Delicieux"], readings: ["おいしい"], mnemonicFr: "DELICIEUX - bon au gout.", targetKanji: ["美", "味"] },
  { word: "不味い", meanings: ["Mauvais (gout)"], readings: ["まずい"], mnemonicFr: "MAUVAIS - pas bon au gout.", targetKanji: ["不", "味"] },
  { word: "易しい", meanings: ["Facile"], readings: ["やさしい"], mnemonicFr: "FACILE - simple a faire.", targetKanji: ["易"] },
  { word: "難しい", meanings: ["Difficile"], readings: ["むずかしい"], mnemonicFr: "DIFFICILE - pas facile.", targetKanji: ["難"] },
  { word: "近い", meanings: ["Proche"], readings: ["ちかい"], mnemonicFr: "PROCHE - a courte distance.", targetKanji: ["近"] },
  { word: "遠い", meanings: ["Loin"], readings: ["とおい"], mnemonicFr: "LOIN - a grande distance.", targetKanji: ["遠"] },
  { word: "速い", meanings: ["Rapide"], readings: ["はやい"], mnemonicFr: "RAPIDE - qui va vite.", targetKanji: ["速"] },
  { word: "遅い", meanings: ["Lent", "En retard"], readings: ["おそい"], mnemonicFr: "LENT - qui va doucement.", targetKanji: ["遅"] },
  { word: "強い", meanings: ["Fort"], readings: ["つよい"], mnemonicFr: "FORT - puissant.", targetKanji: ["強"] },
  { word: "弱い", meanings: ["Faible"], readings: ["よわい"], mnemonicFr: "FAIBLE - sans force.", targetKanji: ["弱"] },
];

// Part 11: Numbers & Counting
const vocabNumbers = [
  { word: "一つ", meanings: ["Un (objet)"], readings: ["ひとつ"], mnemonicFr: "UN - compter un objet.", targetKanji: ["一"] },
  { word: "二つ", meanings: ["Deux (objets)"], readings: ["ふたつ"], mnemonicFr: "DEUX - compter deux objets.", targetKanji: ["二"] },
  { word: "三つ", meanings: ["Trois (objets)"], readings: ["みっつ"], mnemonicFr: "TROIS - compter trois objets.", targetKanji: ["三"] },
  { word: "四つ", meanings: ["Quatre (objets)"], readings: ["よっつ"], mnemonicFr: "QUATRE - compter quatre objets.", targetKanji: ["四"] },
  { word: "五つ", meanings: ["Cinq (objets)"], readings: ["いつつ"], mnemonicFr: "CINQ - compter cinq objets.", targetKanji: ["五"] },
  { word: "六つ", meanings: ["Six (objets)"], readings: ["むっつ"], mnemonicFr: "SIX - compter six objets.", targetKanji: ["六"] },
  { word: "七つ", meanings: ["Sept (objets)"], readings: ["ななつ"], mnemonicFr: "SEPT - compter sept objets.", targetKanji: ["七"] },
  { word: "八つ", meanings: ["Huit (objets)"], readings: ["やっつ"], mnemonicFr: "HUIT - compter huit objets.", targetKanji: ["八"] },
  { word: "九つ", meanings: ["Neuf (objets)"], readings: ["ここのつ"], mnemonicFr: "NEUF - compter neuf objets.", targetKanji: ["九"] },
  { word: "十", meanings: ["Dix"], readings: ["じゅう"], mnemonicFr: "DIX - le nombre 10.", targetKanji: ["十"] },
  { word: "百", meanings: ["Cent"], readings: ["ひゃく"], mnemonicFr: "CENT - le nombre 100.", targetKanji: ["百"] },
  { word: "千", meanings: ["Mille"], readings: ["せん"], mnemonicFr: "MILLE - le nombre 1000.", targetKanji: ["千"] },
  { word: "万", meanings: ["Dix mille"], readings: ["まん"], mnemonicFr: "DIX MILLE - le nombre 10000.", targetKanji: ["万"] },
  { word: "数字", meanings: ["Chiffre", "Nombre"], readings: ["すうじ"], mnemonicFr: "CHIFFRE - symbole numerique.", targetKanji: ["数", "字"] },
  { word: "番号", meanings: ["Numero"], readings: ["ばんごう"], mnemonicFr: "NUMERO - chiffre d'identification.", targetKanji: ["番", "号"] },
];

// Part 12: Body Parts
const vocabBody = [
  { word: "体", meanings: ["Corps"], readings: ["からだ"], mnemonicFr: "CORPS - l'ensemble physique.", targetKanji: ["体"] },
  { word: "頭", meanings: ["Tete"], readings: ["あたま"], mnemonicFr: "TETE - partie superieure du corps.", targetKanji: ["頭"] },
  { word: "顔", meanings: ["Visage"], readings: ["かお"], mnemonicFr: "VISAGE - face de la tete.", targetKanji: ["顔"] },
  { word: "目", meanings: ["Oeil"], readings: ["め"], mnemonicFr: "OEIL - organe de la vision.", targetKanji: ["目"] },
  { word: "耳", meanings: ["Oreille"], readings: ["みみ"], mnemonicFr: "OREILLE - organe de l'audition.", targetKanji: ["耳"] },
  { word: "鼻", meanings: ["Nez"], readings: ["はな"], mnemonicFr: "NEZ - organe de l'odorat.", targetKanji: ["鼻"] },
  { word: "口", meanings: ["Bouche"], readings: ["くち"], mnemonicFr: "BOUCHE - ouverture pour manger et parler.", targetKanji: ["口"] },
  { word: "歯", meanings: ["Dent"], readings: ["は"], mnemonicFr: "DENT - os dans la bouche.", targetKanji: ["歯"] },
  { word: "首", meanings: ["Cou"], readings: ["くび"], mnemonicFr: "COU - relie tete et corps.", targetKanji: ["首"] },
  { word: "肩", meanings: ["Epaule"], readings: ["かた"], mnemonicFr: "EPAULE - haut du bras.", targetKanji: ["肩"] },
  { word: "胸", meanings: ["Poitrine"], readings: ["むね"], mnemonicFr: "POITRINE - partie avant du torse.", targetKanji: ["胸"] },
  { word: "背中", meanings: ["Dos"], readings: ["せなか"], mnemonicFr: "DOS - partie arriere du torse.", targetKanji: ["背", "中"] },
  { word: "腕", meanings: ["Bras"], readings: ["うで"], mnemonicFr: "BRAS - membre superieur.", targetKanji: ["腕"] },
  { word: "手", meanings: ["Main"], readings: ["て"], mnemonicFr: "MAIN - extremite du bras.", targetKanji: ["手"] },
  { word: "指", meanings: ["Doigt"], readings: ["ゆび"], mnemonicFr: "DOIGT - extremite de la main.", targetKanji: ["指"] },
  { word: "足", meanings: ["Pied", "Jambe"], readings: ["あし"], mnemonicFr: "PIED - membre inferieur.", targetKanji: ["足"] },
  { word: "心", meanings: ["Coeur"], readings: ["こころ"], mnemonicFr: "COEUR - siege des emotions.", targetKanji: ["心"] },
];

// Part 13: Places & Locations
const vocabPlaces = [
  { word: "駅", meanings: ["Gare"], readings: ["えき"], mnemonicFr: "GARE - station de train.", targetKanji: ["駅"] },
  { word: "空港", meanings: ["Aeroport"], readings: ["くうこう"], mnemonicFr: "AEROPORT - station d'avions.", targetKanji: ["空", "港"] },
  { word: "病院", meanings: ["Hopital"], readings: ["びょういん"], mnemonicFr: "HOPITAL - etablissement medical.", targetKanji: ["病", "院"] },
  { word: "学校", meanings: ["Ecole"], readings: ["がっこう"], mnemonicFr: "ECOLE - lieu d'enseignement.", targetKanji: ["学", "校"] },
  { word: "大学", meanings: ["Universite"], readings: ["だいがく"], mnemonicFr: "UNIVERSITE - enseignement superieur.", targetKanji: ["大", "学"] },
  { word: "会社", meanings: ["Entreprise"], readings: ["かいしゃ"], mnemonicFr: "ENTREPRISE - lieu de travail.", targetKanji: ["会", "社"] },
  { word: "銀行", meanings: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "BANQUE - etablissement financier.", targetKanji: ["銀", "行"] },
  { word: "郵便局", meanings: ["Bureau de poste"], readings: ["ゆうびんきょく"], mnemonicFr: "BUREAU DE POSTE - service postal.", targetKanji: ["郵", "便", "局"] },
  { word: "図書館", meanings: ["Bibliotheque"], readings: ["としょかん"], mnemonicFr: "BIBLIOTHEQUE - lieu des livres.", targetKanji: ["図", "書", "館"] },
  { word: "美術館", meanings: ["Musee d'art"], readings: ["びじゅつかん"], mnemonicFr: "MUSEE D'ART - lieu d'exposition artistique.", targetKanji: ["美", "術", "館"] },
  { word: "映画館", meanings: ["Cinema"], readings: ["えいがかん"], mnemonicFr: "CINEMA - salle de projection.", targetKanji: ["映", "画", "館"] },
  { word: "公園", meanings: ["Parc"], readings: ["こうえん"], mnemonicFr: "PARC - espace vert public.", targetKanji: ["公", "園"] },
  { word: "市場", meanings: ["Marche"], readings: ["いちば"], mnemonicFr: "MARCHE - lieu de commerce.", targetKanji: ["市", "場"] },
  { word: "店", meanings: ["Magasin"], readings: ["みせ"], mnemonicFr: "MAGASIN - lieu de vente.", targetKanji: ["店"] },
  { word: "食堂", meanings: ["Cafeteria", "Restaurant"], readings: ["しょくどう"], mnemonicFr: "CAFETERIA - lieu pour manger.", targetKanji: ["食", "堂"] },
];

// Part 14: Transportation
const vocabTransport = [
  { word: "電車", meanings: ["Train electrique"], readings: ["でんしゃ"], mnemonicFr: "TRAIN - transport ferroviaire.", targetKanji: ["電", "車"] },
  { word: "地下鉄", meanings: ["Metro"], readings: ["ちかてつ"], mnemonicFr: "METRO - train souterrain.", targetKanji: ["地", "下", "鉄"] },
  { word: "新幹線", meanings: ["Shinkansen", "TGV japonais"], readings: ["しんかんせん"], mnemonicFr: "SHINKANSEN - train a grande vitesse.", targetKanji: ["新", "幹", "線"] },
  { word: "車", meanings: ["Voiture"], readings: ["くるま"], mnemonicFr: "VOITURE - vehicule automobile.", targetKanji: ["車"] },
  { word: "自転車", meanings: ["Velo"], readings: ["じてんしゃ"], mnemonicFr: "VELO - vehicule a deux roues.", targetKanji: ["自", "転", "車"] },
  { word: "飛行機", meanings: ["Avion"], readings: ["ひこうき"], mnemonicFr: "AVION - vehicule volant.", targetKanji: ["飛", "行", "機"] },
  { word: "船", meanings: ["Bateau"], readings: ["ふね"], mnemonicFr: "BATEAU - vehicule maritime.", targetKanji: ["船"] },
  { word: "バス停", meanings: ["Arret de bus"], readings: ["バスてい"], mnemonicFr: "ARRET DE BUS - lieu d'attente du bus.", targetKanji: ["停"] },
  { word: "乗る", meanings: ["Monter (vehicule)"], readings: ["のる"], mnemonicFr: "MONTER - entrer dans un vehicule.", targetKanji: ["乗"] },
  { word: "降りる", meanings: ["Descendre (vehicule)"], readings: ["おりる"], mnemonicFr: "DESCENDRE - sortir d'un vehicule.", targetKanji: ["降"] },
  { word: "運転", meanings: ["Conduite"], readings: ["うんてん"], mnemonicFr: "CONDUITE - piloter un vehicule.", targetKanji: ["運", "転"] },
  { word: "道路", meanings: ["Route"], readings: ["どうろ"], mnemonicFr: "ROUTE - voie de circulation.", targetKanji: ["道", "路"] },
  { word: "交差点", meanings: ["Carrefour"], readings: ["こうさてん"], mnemonicFr: "CARREFOUR - croisement de routes.", targetKanji: ["交", "差", "点"] },
  { word: "信号", meanings: ["Feu de signalisation"], readings: ["しんごう"], mnemonicFr: "FEU - signal lumineux.", targetKanji: ["信", "号"] },
];

// Part 15: School & Education
const vocabEducation = [
  { word: "先生", meanings: ["Professeur"], readings: ["せんせい"], mnemonicFr: "PROFESSEUR - celui qui enseigne.", targetKanji: ["先", "生"] },
  { word: "学生", meanings: ["Etudiant"], readings: ["がくせい"], mnemonicFr: "ETUDIANT - celui qui etudie.", targetKanji: ["学", "生"] },
  { word: "生徒", meanings: ["Eleve"], readings: ["せいと"], mnemonicFr: "ELEVE - celui qui apprend.", targetKanji: ["生", "徒"] },
  { word: "授業", meanings: ["Cours"], readings: ["じゅぎょう"], mnemonicFr: "COURS - seance d'enseignement.", targetKanji: ["授", "業"] },
  { word: "宿題", meanings: ["Devoirs"], readings: ["しゅくだい"], mnemonicFr: "DEVOIRS - travail a faire chez soi.", targetKanji: ["宿", "題"] },
  { word: "試験", meanings: ["Examen"], readings: ["しけん"], mnemonicFr: "EXAMEN - test de connaissances.", targetKanji: ["試", "験"] },
  { word: "教科書", meanings: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "MANUEL - livre d'etude.", targetKanji: ["教", "科", "書"] },
  { word: "辞書", meanings: ["Dictionnaire"], readings: ["じしょ"], mnemonicFr: "DICTIONNAIRE - livre de mots.", targetKanji: ["辞", "書"] },
  { word: "教室", meanings: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "SALLE DE CLASSE - lieu d'enseignement.", targetKanji: ["教", "室"] },
  { word: "黒板", meanings: ["Tableau noir"], readings: ["こくばん"], mnemonicFr: "TABLEAU NOIR - surface pour ecrire.", targetKanji: ["黒", "板"] },
  { word: "成績", meanings: ["Notes", "Resultats"], readings: ["せいせき"], mnemonicFr: "NOTES - resultats scolaires.", targetKanji: ["成", "績"] },
  { word: "卒業", meanings: ["Diplome", "Fin d'etudes"], readings: ["そつぎょう"], mnemonicFr: "DIPLOME - terminer ses etudes.", targetKanji: ["卒", "業"] },
  { word: "入学", meanings: ["Entree a l'ecole"], readings: ["にゅうがく"], mnemonicFr: "ENTREE - commencer l'ecole.", targetKanji: ["入", "学"] },
];

async function main() {
  console.log("=== SEED VOCABULARY BATCH 7 ===\n");
  console.log("Adding vocabulary for: Family, Food, Culture, Time, House, Clothing, Manners, Nature, etc.\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  const allVocab = [
    ...vocabFamily,
    ...vocabFood,
    ...vocabCulture,
    ...vocabTime,
    ...vocabHouse,
    ...vocabClothing,
    ...vocabManners,
    ...vocabNature,
    ...vocabVerbs,
    ...vocabAdjectives,
    ...vocabNumbers,
    ...vocabBody,
    ...vocabPlaces,
    ...vocabTransport,
    ...vocabEducation,
  ];

  console.log(`Total vocabulary entries to process: ${allVocab.length}\n`);

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
  console.log(`\n=== RESULTS ===`);
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
