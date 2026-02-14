import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary Batch 3: Nature, Weather, Seasons, Animals, Medical, School Subjects, Sports, Music
// Focuses on kanji: 春、夏、秋、冬、天、空、星、海、山、森、林、木、花、草、竹、鳥、魚、虫、犬、猫、馬、牛、羊
// 音、楽、歌、絵、写、真、映、画、科、理、数、英、社、歴、史、体、育、医、病、薬、痛、治、熱、寒、暖、涼、晴、曇、雪、台、風、雷

// Part 1: Seasons (春、夏、秋、冬)
const vocabSeasons = [
  // 春 (Printemps)
  { word: "春", meanings: ["Printemps"], readings: ["はる"], mnemonicFr: "PRINTEMPS - la saison du renouveau et des cerisiers en fleur.", targetKanji: ["春"] },
  { word: "春休み", meanings: ["Vacances de printemps"], readings: ["はるやすみ"], mnemonicFr: "VACANCES DE PRINTEMPS - repos pendant la saison des fleurs.", targetKanji: ["春"] },
  { word: "春風", meanings: ["Brise printaniere"], readings: ["はるかぜ"], mnemonicFr: "BRISE PRINTANIERE - le vent doux du printemps.", targetKanji: ["春", "風"] },
  { word: "春分", meanings: ["Equinoxe de printemps"], readings: ["しゅんぶん"], mnemonicFr: "EQUINOXE DE PRINTEMPS - jour et nuit de meme duree.", targetKanji: ["春", "分"] },
  { word: "青春", meanings: ["Jeunesse"], readings: ["せいしゅん"], mnemonicFr: "JEUNESSE - le printemps de la vie.", targetKanji: ["青", "春"] },

  // 夏 (Ete)
  { word: "夏", meanings: ["Ete"], readings: ["なつ"], mnemonicFr: "ETE - la saison chaude.", targetKanji: ["夏"] },
  { word: "夏休み", meanings: ["Vacances d'ete"], readings: ["なつやすみ"], mnemonicFr: "VACANCES D'ETE - les grandes vacances.", targetKanji: ["夏"] },
  { word: "夏祭り", meanings: ["Festival d'ete"], readings: ["なつまつり"], mnemonicFr: "FESTIVAL D'ETE - celebrations estivales japonaises.", targetKanji: ["夏"] },
  { word: "真夏", meanings: ["Plein ete"], readings: ["まなつ"], mnemonicFr: "PLEIN ETE - le coeur de l'ete.", targetKanji: ["真", "夏"] },
  { word: "初夏", meanings: ["Debut de l'ete"], readings: ["しょか"], mnemonicFr: "DEBUT DE L'ETE - les premiers jours chauds.", targetKanji: ["初", "夏"] },

  // 秋 (Automne)
  { word: "秋", meanings: ["Automne"], readings: ["あき"], mnemonicFr: "AUTOMNE - la saison des feuilles rouges.", targetKanji: ["秋"] },
  { word: "秋分", meanings: ["Equinoxe d'automne"], readings: ["しゅうぶん"], mnemonicFr: "EQUINOXE D'AUTOMNE - jour et nuit egaux en automne.", targetKanji: ["秋", "分"] },
  { word: "秋風", meanings: ["Vent d'automne"], readings: ["あきかぜ"], mnemonicFr: "VENT D'AUTOMNE - la brise fraiche de l'automne.", targetKanji: ["秋", "風"] },
  { word: "秋晴れ", meanings: ["Beau temps d'automne"], readings: ["あきばれ"], mnemonicFr: "BEAU TEMPS D'AUTOMNE - ciel clair en automne.", targetKanji: ["秋", "晴"] },

  // 冬 (Hiver)
  { word: "冬", meanings: ["Hiver"], readings: ["ふゆ"], mnemonicFr: "HIVER - la saison froide.", targetKanji: ["冬"] },
  { word: "冬休み", meanings: ["Vacances d'hiver"], readings: ["ふゆやすみ"], mnemonicFr: "VACANCES D'HIVER - repos pendant la saison froide.", targetKanji: ["冬"] },
  { word: "冬眠", meanings: ["Hibernation"], readings: ["とうみん"], mnemonicFr: "HIBERNATION - sommeil hivernal des animaux.", targetKanji: ["冬"] },
  { word: "真冬", meanings: ["Plein hiver"], readings: ["まふゆ"], mnemonicFr: "PLEIN HIVER - le coeur de l'hiver.", targetKanji: ["真", "冬"] },

  // Quatre saisons
  { word: "四季", meanings: ["Quatre saisons"], readings: ["しき"], mnemonicFr: "QUATRE SAISONS - le cycle annuel complet.", targetKanji: ["四"] },
];

// Part 2: Weather and Sky (天、空、晴、曇、雪、風、雷、熱、寒、暖、涼)
const vocabWeather = [
  // 天 (Ciel/Nature)
  { word: "天気", meanings: ["Temps", "Meteo"], readings: ["てんき"], mnemonicFr: "TEMPS - les conditions meteorologiques.", targetKanji: ["天", "気"] },
  { word: "天国", meanings: ["Paradis"], readings: ["てんごく"], mnemonicFr: "PARADIS - le royaume celeste.", targetKanji: ["天", "国"] },
  { word: "天才", meanings: ["Genie"], readings: ["てんさい"], mnemonicFr: "GENIE - talent donne par le ciel.", targetKanji: ["天"] },
  { word: "天然", meanings: ["Naturel"], readings: ["てんねん"], mnemonicFr: "NATUREL - cree par la nature.", targetKanji: ["天", "然"] },

  // 空 (Ciel/Vide)
  { word: "空", meanings: ["Ciel"], readings: ["そら"], mnemonicFr: "CIEL - l'etendue bleue au-dessus de nous.", targetKanji: ["空"] },
  { word: "空気", meanings: ["Air", "Atmosphere"], readings: ["くうき"], mnemonicFr: "AIR - le gaz que nous respirons.", targetKanji: ["空", "気"] },
  { word: "青空", meanings: ["Ciel bleu"], readings: ["あおぞら"], mnemonicFr: "CIEL BLEU - un ciel clair et ensoleille.", targetKanji: ["青", "空"] },
  { word: "空港", meanings: ["Aeroport"], readings: ["くうこう"], mnemonicFr: "AEROPORT - port du ciel pour avions.", targetKanji: ["空"] },

  // 晴 (Beau temps)
  { word: "晴れ", meanings: ["Beau temps", "Ensoleille"], readings: ["はれ"], mnemonicFr: "BEAU TEMPS - ciel degage et soleil.", targetKanji: ["晴"] },
  { word: "晴れる", meanings: ["Se degager", "S'eclaircir"], readings: ["はれる"], mnemonicFr: "SE DEGAGER - le ciel devient clair.", targetKanji: ["晴"] },
  { word: "快晴", meanings: ["Temps radieux"], readings: ["かいせい"], mnemonicFr: "TEMPS RADIEUX - ciel parfaitement clair.", targetKanji: ["晴"] },

  // 曇 (Nuageux)
  { word: "曇り", meanings: ["Nuageux", "Couvert"], readings: ["くもり"], mnemonicFr: "NUAGEUX - ciel couvert de nuages.", targetKanji: ["曇"] },
  { word: "曇る", meanings: ["Se couvrir", "S'assombrir"], readings: ["くもる"], mnemonicFr: "SE COUVRIR - le ciel devient nuageux.", targetKanji: ["曇"] },

  // 雪 (Neige)
  { word: "雪", meanings: ["Neige"], readings: ["ゆき"], mnemonicFr: "NEIGE - precipitation blanche en hiver.", targetKanji: ["雪"] },
  { word: "雪国", meanings: ["Pays de neige"], readings: ["ゆきぐに"], mnemonicFr: "PAYS DE NEIGE - region enneigee.", targetKanji: ["雪", "国"] },
  { word: "大雪", meanings: ["Forte neige"], readings: ["おおゆき"], mnemonicFr: "FORTE NEIGE - chutes de neige abondantes.", targetKanji: ["大", "雪"] },
  { word: "雪山", meanings: ["Montagne enneigee"], readings: ["ゆきやま"], mnemonicFr: "MONTAGNE ENNEIGEE - sommet couvert de neige.", targetKanji: ["雪", "山"] },

  // 風 (Vent)
  { word: "風", meanings: ["Vent"], readings: ["かぜ"], mnemonicFr: "VENT - mouvement de l'air.", targetKanji: ["風"] },
  { word: "風景", meanings: ["Paysage"], readings: ["ふうけい"], mnemonicFr: "PAYSAGE - vue panoramique de la nature.", targetKanji: ["風"] },
  { word: "台風", meanings: ["Typhon"], readings: ["たいふう"], mnemonicFr: "TYPHON - tempete tropicale violente.", targetKanji: ["台", "風"] },
  { word: "風邪", meanings: ["Rhume"], readings: ["かぜ"], mnemonicFr: "RHUME - maladie du vent froid.", targetKanji: ["風"] },
  { word: "風呂", meanings: ["Bain"], readings: ["ふろ"], mnemonicFr: "BAIN - baignoire japonaise.", targetKanji: ["風"] },

  // 雷 (Tonnerre)
  { word: "雷", meanings: ["Tonnerre", "Foudre"], readings: ["かみなり"], mnemonicFr: "TONNERRE - eclairs et grondements.", targetKanji: ["雷"] },
  { word: "雷雨", meanings: ["Orage"], readings: ["らいう"], mnemonicFr: "ORAGE - pluie avec tonnerre et eclairs.", targetKanji: ["雷", "雨"] },

  // 熱 (Chaleur)
  { word: "熱い", meanings: ["Chaud", "Brulant"], readings: ["あつい"], mnemonicFr: "CHAUD - temperature elevee au toucher.", targetKanji: ["熱"] },
  { word: "熱", meanings: ["Fievre", "Chaleur"], readings: ["ねつ"], mnemonicFr: "FIEVRE - temperature corporelle elevee.", targetKanji: ["熱"] },
  { word: "熱帯", meanings: ["Zone tropicale"], readings: ["ねったい"], mnemonicFr: "ZONE TROPICALE - region chaude de la Terre.", targetKanji: ["熱"] },
  { word: "熱心", meanings: ["Zele", "Enthousiaste"], readings: ["ねっしん"], mnemonicFr: "ZELE - passion ardente pour quelque chose.", targetKanji: ["熱", "心"] },

  // 寒 (Froid)
  { word: "寒い", meanings: ["Froid"], readings: ["さむい"], mnemonicFr: "FROID - basse temperature atmospherique.", targetKanji: ["寒"] },
  { word: "寒さ", meanings: ["Le froid"], readings: ["さむさ"], mnemonicFr: "LE FROID - sensation de froid.", targetKanji: ["寒"] },
  { word: "寒気", meanings: ["Frisson", "Froid"], readings: ["さむけ"], mnemonicFr: "FRISSON - sensation de froid soudaine.", targetKanji: ["寒", "気"] },

  // 暖 (Tiede/Chaud)
  { word: "暖かい", meanings: ["Tiede", "Chaud"], readings: ["あたたかい"], mnemonicFr: "TIEDE - temperature agreablement chaude.", targetKanji: ["暖"] },
  { word: "暖房", meanings: ["Chauffage"], readings: ["だんぼう"], mnemonicFr: "CHAUFFAGE - systeme pour rechauffer.", targetKanji: ["暖"] },
  { word: "温暖", meanings: ["Doux", "Tempere"], readings: ["おんだん"], mnemonicFr: "TEMPERE - climat ni chaud ni froid.", targetKanji: ["暖"] },

  // 涼 (Frais)
  { word: "涼しい", meanings: ["Frais"], readings: ["すずしい"], mnemonicFr: "FRAIS - temperature agreablement froide.", targetKanji: ["涼"] },
  { word: "涼む", meanings: ["Se rafraichir"], readings: ["すずむ"], mnemonicFr: "SE RAFRAICHIR - prendre le frais.", targetKanji: ["涼"] },
  { word: "納涼", meanings: ["Recherche de fraicheur"], readings: ["のうりょう"], mnemonicFr: "RECHERCHE DE FRAICHEUR - fuir la chaleur estivale.", targetKanji: ["涼"] },

  // 星 (Etoile)
  { word: "星", meanings: ["Etoile"], readings: ["ほし"], mnemonicFr: "ETOILE - astre brillant dans le ciel nocturne.", targetKanji: ["星"] },
  { word: "星空", meanings: ["Ciel etoile"], readings: ["ほしぞら"], mnemonicFr: "CIEL ETOILE - nuit pleine d'etoiles.", targetKanji: ["星", "空"] },
  { word: "流れ星", meanings: ["Etoile filante"], readings: ["ながれぼし"], mnemonicFr: "ETOILE FILANTE - meteore traversant le ciel.", targetKanji: ["星"] },
  { word: "惑星", meanings: ["Planete"], readings: ["わくせい"], mnemonicFr: "PLANETE - astre orbitant une etoile.", targetKanji: ["星"] },
];

// Part 3: Nature and Landscape (海、山、森、林、木、花、草、竹)
const vocabNature = [
  // 海 (Mer)
  { word: "海", meanings: ["Mer", "Ocean"], readings: ["うみ"], mnemonicFr: "MER - grande etendue d'eau salee.", targetKanji: ["海"] },
  { word: "海外", meanings: ["Etranger", "Outre-mer"], readings: ["かいがい"], mnemonicFr: "ETRANGER - au-dela des mers.", targetKanji: ["海", "外"] },
  { word: "海岸", meanings: ["Cote", "Rivage"], readings: ["かいがん"], mnemonicFr: "COTE - bord de la mer.", targetKanji: ["海"] },
  { word: "海水", meanings: ["Eau de mer"], readings: ["かいすい"], mnemonicFr: "EAU DE MER - eau salee de l'ocean.", targetKanji: ["海", "水"] },
  { word: "日本海", meanings: ["Mer du Japon"], readings: ["にほんかい"], mnemonicFr: "MER DU JAPON - mer entre le Japon et la Coree.", targetKanji: ["日", "本", "海"] },

  // 山 (Montagne)
  { word: "山", meanings: ["Montagne"], readings: ["やま"], mnemonicFr: "MONTAGNE - relief eleve du terrain.", targetKanji: ["山"] },
  { word: "山道", meanings: ["Chemin de montagne"], readings: ["やまみち"], mnemonicFr: "CHEMIN DE MONTAGNE - sentier en montagne.", targetKanji: ["山", "道"] },
  { word: "山頂", meanings: ["Sommet"], readings: ["さんちょう"], mnemonicFr: "SOMMET - point le plus haut de la montagne.", targetKanji: ["山"] },
  { word: "火山", meanings: ["Volcan"], readings: ["かざん"], mnemonicFr: "VOLCAN - montagne crachant du feu.", targetKanji: ["火", "山"] },
  { word: "富士山", meanings: ["Mont Fuji"], readings: ["ふじさん"], mnemonicFr: "MONT FUJI - montagne sacree du Japon.", targetKanji: ["富", "山"] },

  // 森 (Foret)
  { word: "森", meanings: ["Foret"], readings: ["もり"], mnemonicFr: "FORET - grande etendue boisee.", targetKanji: ["森"] },
  { word: "森林", meanings: ["Foret", "Bois"], readings: ["しんりん"], mnemonicFr: "FORET - zone dense d'arbres.", targetKanji: ["森", "林"] },

  // 林 (Bois)
  { word: "林", meanings: ["Bois", "Bosquet"], readings: ["はやし"], mnemonicFr: "BOIS - petit groupe d'arbres.", targetKanji: ["林"] },
  { word: "林道", meanings: ["Chemin forestier"], readings: ["りんどう"], mnemonicFr: "CHEMIN FORESTIER - route a travers les bois.", targetKanji: ["林", "道"] },

  // 木 (Arbre)
  { word: "木", meanings: ["Arbre", "Bois"], readings: ["き"], mnemonicFr: "ARBRE - plante a tronc ligneux.", targetKanji: ["木"] },
  { word: "木曜日", meanings: ["Jeudi"], readings: ["もくようび"], mnemonicFr: "JEUDI - jour du bois.", targetKanji: ["木", "曜", "日"] },
  { word: "木材", meanings: ["Bois de construction"], readings: ["もくざい"], mnemonicFr: "BOIS DE CONSTRUCTION - materiau de l'arbre.", targetKanji: ["木", "材"] },
  { word: "大木", meanings: ["Grand arbre"], readings: ["たいぼく"], mnemonicFr: "GRAND ARBRE - arbre imposant.", targetKanji: ["大", "木"] },

  // 花 (Fleur)
  { word: "花", meanings: ["Fleur"], readings: ["はな"], mnemonicFr: "FLEUR - organe reproducteur colore des plantes.", targetKanji: ["花"] },
  { word: "花見", meanings: ["Hanami"], readings: ["はなみ"], mnemonicFr: "HANAMI - contemplation des fleurs de cerisier.", targetKanji: ["花", "見"] },
  { word: "花火", meanings: ["Feu d'artifice"], readings: ["はなび"], mnemonicFr: "FEU D'ARTIFICE - fleurs de feu dans le ciel.", targetKanji: ["花", "火"] },
  { word: "花束", meanings: ["Bouquet"], readings: ["はなたば"], mnemonicFr: "BOUQUET - ensemble de fleurs coupees.", targetKanji: ["花"] },
  { word: "花屋", meanings: ["Fleuriste"], readings: ["はなや"], mnemonicFr: "FLEURISTE - magasin de fleurs.", targetKanji: ["花", "屋"] },

  // 草 (Herbe)
  { word: "草", meanings: ["Herbe"], readings: ["くさ"], mnemonicFr: "HERBE - plante verte basse.", targetKanji: ["草"] },
  { word: "草原", meanings: ["Prairie"], readings: ["そうげん"], mnemonicFr: "PRAIRIE - grande etendue d'herbe.", targetKanji: ["草", "原"] },
  { word: "雑草", meanings: ["Mauvaise herbe"], readings: ["ざっそう"], mnemonicFr: "MAUVAISE HERBE - plante indesirable.", targetKanji: ["草"] },

  // 竹 (Bambou)
  { word: "竹", meanings: ["Bambou"], readings: ["たけ"], mnemonicFr: "BAMBOU - plante aux tiges creuses.", targetKanji: ["竹"] },
  { word: "竹林", meanings: ["Bambouseraie"], readings: ["ちくりん"], mnemonicFr: "BAMBOUSERAIE - foret de bambous.", targetKanji: ["竹", "林"] },
  { word: "竹の子", meanings: ["Pousse de bambou"], readings: ["たけのこ"], mnemonicFr: "POUSSE DE BAMBOU - jeune bambou comestible.", targetKanji: ["竹", "子"] },
];

// Part 4: Animals (鳥、魚、虫、犬、猫、馬、牛、羊)
const vocabAnimals = [
  // 鳥 (Oiseau)
  { word: "鳥", meanings: ["Oiseau"], readings: ["とり"], mnemonicFr: "OISEAU - animal a plumes qui vole.", targetKanji: ["鳥"] },
  { word: "鳥類", meanings: ["Oiseaux", "Classe des oiseaux"], readings: ["ちょうるい"], mnemonicFr: "OISEAUX - la classe des volatiles.", targetKanji: ["鳥"] },
  { word: "小鳥", meanings: ["Petit oiseau"], readings: ["ことり"], mnemonicFr: "PETIT OISEAU - oiseau de petite taille.", targetKanji: ["小", "鳥"] },
  { word: "野鳥", meanings: ["Oiseau sauvage"], readings: ["やちょう"], mnemonicFr: "OISEAU SAUVAGE - oiseau vivant en liberte.", targetKanji: ["野", "鳥"] },
  { word: "白鳥", meanings: ["Cygne"], readings: ["はくちょう"], mnemonicFr: "CYGNE - grand oiseau blanc elegant.", targetKanji: ["白", "鳥"] },

  // 魚 (Poisson)
  { word: "魚", meanings: ["Poisson"], readings: ["さかな"], mnemonicFr: "POISSON - animal aquatique a nageoires.", targetKanji: ["魚"] },
  { word: "魚類", meanings: ["Poissons", "Classe des poissons"], readings: ["ぎょるい"], mnemonicFr: "POISSONS - la classe des animaux aquatiques.", targetKanji: ["魚"] },
  { word: "金魚", meanings: ["Poisson rouge"], readings: ["きんぎょ"], mnemonicFr: "POISSON ROUGE - poisson d'ornement dore.", targetKanji: ["金", "魚"] },
  { word: "魚市場", meanings: ["Marche au poisson"], readings: ["うおいちば"], mnemonicFr: "MARCHE AU POISSON - lieu de vente de poissons.", targetKanji: ["魚", "市", "場"] },
  { word: "焼き魚", meanings: ["Poisson grille"], readings: ["やきざかな"], mnemonicFr: "POISSON GRILLE - poisson cuit au feu.", targetKanji: ["魚"] },

  // 虫 (Insecte)
  { word: "虫", meanings: ["Insecte"], readings: ["むし"], mnemonicFr: "INSECTE - petit animal a six pattes.", targetKanji: ["虫"] },
  { word: "昆虫", meanings: ["Insecte"], readings: ["こんちゅう"], mnemonicFr: "INSECTE - arthropode a six pattes.", targetKanji: ["虫"] },
  { word: "害虫", meanings: ["Insecte nuisible"], readings: ["がいちゅう"], mnemonicFr: "INSECTE NUISIBLE - insecte qui cause des degats.", targetKanji: ["虫"] },
  { word: "虫歯", meanings: ["Carie"], readings: ["むしば"], mnemonicFr: "CARIE - dent attaquee par les vers.", targetKanji: ["虫", "歯"] },

  // 犬 (Chien)
  { word: "犬", meanings: ["Chien"], readings: ["いぬ"], mnemonicFr: "CHIEN - animal domestique fidele.", targetKanji: ["犬"] },
  { word: "子犬", meanings: ["Chiot"], readings: ["こいぬ"], mnemonicFr: "CHIOT - jeune chien.", targetKanji: ["子", "犬"] },
  { word: "番犬", meanings: ["Chien de garde"], readings: ["ばんけん"], mnemonicFr: "CHIEN DE GARDE - chien qui protege.", targetKanji: ["犬"] },
  { word: "盲導犬", meanings: ["Chien-guide"], readings: ["もうどうけん"], mnemonicFr: "CHIEN-GUIDE - chien pour aveugles.", targetKanji: ["犬"] },

  // 猫 (Chat)
  { word: "猫", meanings: ["Chat"], readings: ["ねこ"], mnemonicFr: "CHAT - felin domestique.", targetKanji: ["猫"] },
  { word: "子猫", meanings: ["Chaton"], readings: ["こねこ"], mnemonicFr: "CHATON - jeune chat.", targetKanji: ["子", "猫"] },
  { word: "野良猫", meanings: ["Chat errant"], readings: ["のらねこ"], mnemonicFr: "CHAT ERRANT - chat sans maitre.", targetKanji: ["野", "猫"] },
  { word: "黒猫", meanings: ["Chat noir"], readings: ["くろねこ"], mnemonicFr: "CHAT NOIR - felin a pelage sombre.", targetKanji: ["黒", "猫"] },

  // 馬 (Cheval)
  { word: "馬", meanings: ["Cheval"], readings: ["うま"], mnemonicFr: "CHEVAL - grand mammifere equide.", targetKanji: ["馬"] },
  { word: "競馬", meanings: ["Courses de chevaux"], readings: ["けいば"], mnemonicFr: "COURSES DE CHEVAUX - competition equestre.", targetKanji: ["馬"] },
  { word: "馬車", meanings: ["Caleche"], readings: ["ばしゃ"], mnemonicFr: "CALECHE - voiture tiree par un cheval.", targetKanji: ["馬", "車"] },
  { word: "木馬", meanings: ["Cheval de bois"], readings: ["もくば"], mnemonicFr: "CHEVAL DE BOIS - jouet en forme de cheval.", targetKanji: ["木", "馬"] },

  // 牛 (Vache/Boeuf)
  { word: "牛", meanings: ["Vache", "Boeuf"], readings: ["うし"], mnemonicFr: "VACHE - bovin domestique.", targetKanji: ["牛"] },
  { word: "牛肉", meanings: ["Viande de boeuf"], readings: ["ぎゅうにく"], mnemonicFr: "VIANDE DE BOEUF - chair de bovide.", targetKanji: ["牛", "肉"] },
  { word: "牛乳", meanings: ["Lait"], readings: ["ぎゅうにゅう"], mnemonicFr: "LAIT - liquide produit par la vache.", targetKanji: ["牛", "乳"] },
  { word: "子牛", meanings: ["Veau"], readings: ["こうし"], mnemonicFr: "VEAU - jeune bovin.", targetKanji: ["子", "牛"] },

  // 羊 (Mouton)
  { word: "羊", meanings: ["Mouton"], readings: ["ひつじ"], mnemonicFr: "MOUTON - animal a laine.", targetKanji: ["羊"] },
  { word: "羊毛", meanings: ["Laine"], readings: ["ようもう"], mnemonicFr: "LAINE - poil du mouton.", targetKanji: ["羊", "毛"] },
  { word: "羊肉", meanings: ["Viande de mouton"], readings: ["ようにく"], mnemonicFr: "VIANDE DE MOUTON - chair ovine.", targetKanji: ["羊", "肉"] },
  { word: "子羊", meanings: ["Agneau"], readings: ["こひつじ"], mnemonicFr: "AGNEAU - jeune mouton.", targetKanji: ["子", "羊"] },
];

// Part 5: Music and Arts (音、楽、歌、絵、写、真、映、画)
const vocabMusic = [
  // 音 (Son)
  { word: "音", meanings: ["Son", "Bruit"], readings: ["おと"], mnemonicFr: "SON - vibration audible.", targetKanji: ["音"] },
  { word: "音楽", meanings: ["Musique"], readings: ["おんがく"], mnemonicFr: "MUSIQUE - art des sons harmonieux.", targetKanji: ["音", "楽"] },
  { word: "音声", meanings: ["Voix", "Audio"], readings: ["おんせい"], mnemonicFr: "AUDIO - son de la voix.", targetKanji: ["音", "声"] },
  { word: "発音", meanings: ["Prononciation"], readings: ["はつおん"], mnemonicFr: "PRONONCIATION - maniere d'emettre les sons.", targetKanji: ["発", "音"] },
  { word: "騒音", meanings: ["Bruit", "Nuisance sonore"], readings: ["そうおん"], mnemonicFr: "BRUIT - son desagreable et derangeant.", targetKanji: ["音"] },

  // 楽 (Musique/Plaisir)
  { word: "楽しい", meanings: ["Amusant", "Agreable"], readings: ["たのしい"], mnemonicFr: "AMUSANT - qui procure du plaisir.", targetKanji: ["楽"] },
  { word: "楽しむ", meanings: ["S'amuser", "Profiter"], readings: ["たのしむ"], mnemonicFr: "S'AMUSER - prendre du plaisir.", targetKanji: ["楽"] },
  { word: "楽器", meanings: ["Instrument de musique"], readings: ["がっき"], mnemonicFr: "INSTRUMENT DE MUSIQUE - outil pour faire de la musique.", targetKanji: ["楽", "器"] },
  { word: "楽曲", meanings: ["Morceau de musique"], readings: ["がっきょく"], mnemonicFr: "MORCEAU DE MUSIQUE - composition musicale.", targetKanji: ["楽", "曲"] },
  { word: "楽団", meanings: ["Orchestre"], readings: ["がくだん"], mnemonicFr: "ORCHESTRE - groupe de musiciens.", targetKanji: ["楽", "団"] },

  // 歌 (Chanson)
  { word: "歌", meanings: ["Chanson"], readings: ["うた"], mnemonicFr: "CHANSON - composition musicale avec paroles.", targetKanji: ["歌"] },
  { word: "歌う", meanings: ["Chanter"], readings: ["うたう"], mnemonicFr: "CHANTER - produire de la musique vocale.", targetKanji: ["歌"] },
  { word: "歌手", meanings: ["Chanteur"], readings: ["かしゅ"], mnemonicFr: "CHANTEUR - artiste qui chante.", targetKanji: ["歌", "手"] },
  { word: "歌詞", meanings: ["Paroles"], readings: ["かし"], mnemonicFr: "PAROLES - texte d'une chanson.", targetKanji: ["歌"] },
  { word: "国歌", meanings: ["Hymne national"], readings: ["こっか"], mnemonicFr: "HYMNE NATIONAL - chanson patriotique.", targetKanji: ["国", "歌"] },

  // 絵 (Image/Dessin)
  { word: "絵", meanings: ["Image", "Dessin"], readings: ["え"], mnemonicFr: "DESSIN - representation graphique.", targetKanji: ["絵"] },
  { word: "絵画", meanings: ["Peinture"], readings: ["かいが"], mnemonicFr: "PEINTURE - art pictural.", targetKanji: ["絵", "画"] },
  { word: "絵本", meanings: ["Livre d'images"], readings: ["えほん"], mnemonicFr: "LIVRE D'IMAGES - livre illustre pour enfants.", targetKanji: ["絵", "本"] },
  { word: "油絵", meanings: ["Peinture a l'huile"], readings: ["あぶらえ"], mnemonicFr: "PEINTURE A L'HUILE - tableau peint a l'huile.", targetKanji: ["油", "絵"] },

  // 写 (Copier/Photo)
  { word: "写す", meanings: ["Copier", "Photographier"], readings: ["うつす"], mnemonicFr: "COPIER - reproduire une image.", targetKanji: ["写"] },
  { word: "写真", meanings: ["Photo"], readings: ["しゃしん"], mnemonicFr: "PHOTO - image capturee par appareil.", targetKanji: ["写", "真"] },
  { word: "写真家", meanings: ["Photographe"], readings: ["しゃしんか"], mnemonicFr: "PHOTOGRAPHE - artiste de la photographie.", targetKanji: ["写", "真", "家"] },

  // 真 (Vrai/Verite)
  { word: "真", meanings: ["Vrai", "Verite"], readings: ["ま"], mnemonicFr: "VRAI - conforme a la realite.", targetKanji: ["真"] },
  { word: "真実", meanings: ["Verite"], readings: ["しんじつ"], mnemonicFr: "VERITE - ce qui est vrai.", targetKanji: ["真", "実"] },
  { word: "真面目", meanings: ["Serieux"], readings: ["まじめ"], mnemonicFr: "SERIEUX - attitude responsable.", targetKanji: ["真", "面", "目"] },
  { word: "真中", meanings: ["Centre", "Milieu"], readings: ["まんなか"], mnemonicFr: "CENTRE - point central exact.", targetKanji: ["真", "中"] },

  // 映 (Reflet/Film)
  { word: "映る", meanings: ["Se refleter"], readings: ["うつる"], mnemonicFr: "SE REFLETER - apparaitre en image.", targetKanji: ["映"] },
  { word: "映画", meanings: ["Film", "Cinema"], readings: ["えいが"], mnemonicFr: "FILM - oeuvre cinematographique.", targetKanji: ["映", "画"] },
  { word: "映画館", meanings: ["Cinema"], readings: ["えいがかん"], mnemonicFr: "CINEMA - salle de projection de films.", targetKanji: ["映", "画", "館"] },
  { word: "映像", meanings: ["Image", "Video"], readings: ["えいぞう"], mnemonicFr: "VIDEO - images en mouvement.", targetKanji: ["映", "像"] },

  // 画 (Image/Dessin)
  { word: "画", meanings: ["Image", "Trait"], readings: ["が"], mnemonicFr: "IMAGE - representation visuelle.", targetKanji: ["画"] },
  { word: "画家", meanings: ["Peintre"], readings: ["がか"], mnemonicFr: "PEINTRE - artiste qui peint.", targetKanji: ["画", "家"] },
  { word: "画面", meanings: ["Ecran"], readings: ["がめん"], mnemonicFr: "ECRAN - surface d'affichage.", targetKanji: ["画", "面"] },
  { word: "漫画", meanings: ["Manga"], readings: ["まんが"], mnemonicFr: "MANGA - bande dessinee japonaise.", targetKanji: ["画"] },
  { word: "計画", meanings: ["Plan", "Projet"], readings: ["けいかく"], mnemonicFr: "PLAN - projet organise.", targetKanji: ["計", "画"] },
];

// Part 6: School Subjects (科、理、数、英、社、歴、史、体、育)
const vocabSchool = [
  // 科 (Section/Matiere)
  { word: "科", meanings: ["Section", "Departement"], readings: ["か"], mnemonicFr: "SECTION - division d'une organisation.", targetKanji: ["科"] },
  { word: "科学", meanings: ["Science"], readings: ["かがく"], mnemonicFr: "SCIENCE - etude methodique du monde.", targetKanji: ["科", "学"] },
  { word: "科目", meanings: ["Matiere scolaire"], readings: ["かもく"], mnemonicFr: "MATIERE SCOLAIRE - sujet d'etude.", targetKanji: ["科", "目"] },
  { word: "教科書", meanings: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "MANUEL SCOLAIRE - livre d'enseignement.", targetKanji: ["教", "科", "書"] },
  { word: "理科", meanings: ["Sciences naturelles"], readings: ["りか"], mnemonicFr: "SCIENCES NATURELLES - etude de la nature.", targetKanji: ["理", "科"] },

  // 理 (Raison/Logique)
  { word: "理由", meanings: ["Raison", "Motif"], readings: ["りゆう"], mnemonicFr: "RAISON - explication logique.", targetKanji: ["理", "由"] },
  { word: "理解", meanings: ["Comprehension"], readings: ["りかい"], mnemonicFr: "COMPREHENSION - saisir le sens.", targetKanji: ["理", "解"] },
  { word: "理想", meanings: ["Ideal"], readings: ["りそう"], mnemonicFr: "IDEAL - modele parfait.", targetKanji: ["理", "想"] },
  { word: "物理", meanings: ["Physique"], readings: ["ぶつり"], mnemonicFr: "PHYSIQUE - science de la matiere.", targetKanji: ["物", "理"] },
  { word: "心理", meanings: ["Psychologie"], readings: ["しんり"], mnemonicFr: "PSYCHOLOGIE - etude de l'esprit.", targetKanji: ["心", "理"] },

  // 数 (Nombre)
  { word: "数", meanings: ["Nombre"], readings: ["かず"], mnemonicFr: "NOMBRE - quantite numerique.", targetKanji: ["数"] },
  { word: "数学", meanings: ["Mathematiques"], readings: ["すうがく"], mnemonicFr: "MATHEMATIQUES - science des nombres.", targetKanji: ["数", "学"] },
  { word: "数字", meanings: ["Chiffre"], readings: ["すうじ"], mnemonicFr: "CHIFFRE - symbole numerique.", targetKanji: ["数", "字"] },
  { word: "回数", meanings: ["Nombre de fois"], readings: ["かいすう"], mnemonicFr: "NOMBRE DE FOIS - frequence.", targetKanji: ["回", "数"] },
  { word: "多数", meanings: ["Majorite"], readings: ["たすう"], mnemonicFr: "MAJORITE - grand nombre.", targetKanji: ["多", "数"] },

  // 英 (Anglais/Excellence)
  { word: "英語", meanings: ["Anglais"], readings: ["えいご"], mnemonicFr: "ANGLAIS - langue de l'Angleterre.", targetKanji: ["英", "語"] },
  { word: "英国", meanings: ["Angleterre"], readings: ["えいこく"], mnemonicFr: "ANGLETERRE - pays britannique.", targetKanji: ["英", "国"] },
  { word: "英会話", meanings: ["Conversation anglaise"], readings: ["えいかいわ"], mnemonicFr: "CONVERSATION ANGLAISE - parler en anglais.", targetKanji: ["英", "会", "話"] },
  { word: "英文", meanings: ["Texte anglais"], readings: ["えいぶん"], mnemonicFr: "TEXTE ANGLAIS - ecrit en anglais.", targetKanji: ["英", "文"] },

  // 社 (Societe)
  { word: "社会", meanings: ["Societe"], readings: ["しゃかい"], mnemonicFr: "SOCIETE - communaute humaine.", targetKanji: ["社", "会"] },
  { word: "社会学", meanings: ["Sociologie"], readings: ["しゃかいがく"], mnemonicFr: "SOCIOLOGIE - etude de la societe.", targetKanji: ["社", "会", "学"] },
  { word: "会社", meanings: ["Entreprise"], readings: ["かいしゃ"], mnemonicFr: "ENTREPRISE - organisation commerciale.", targetKanji: ["会", "社"] },
  { word: "神社", meanings: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonicFr: "SANCTUAIRE SHINTO - lieu de culte japonais.", targetKanji: ["神", "社"] },

  // 歴 (Histoire)
  { word: "歴史", meanings: ["Histoire"], readings: ["れきし"], mnemonicFr: "HISTOIRE - recit du passe.", targetKanji: ["歴", "史"] },
  { word: "学歴", meanings: ["Parcours scolaire"], readings: ["がくれき"], mnemonicFr: "PARCOURS SCOLAIRE - historique d'etudes.", targetKanji: ["学", "歴"] },
  { word: "経歴", meanings: ["Carriere"], readings: ["けいれき"], mnemonicFr: "CARRIERE - parcours professionnel.", targetKanji: ["経", "歴"] },

  // 史 (Histoire)
  { word: "史", meanings: ["Histoire", "Chronique"], readings: ["し"], mnemonicFr: "HISTOIRE - annales du passe.", targetKanji: ["史"] },
  { word: "歴史的", meanings: ["Historique"], readings: ["れきしてき"], mnemonicFr: "HISTORIQUE - qui appartient a l'histoire.", targetKanji: ["歴", "史", "的"] },
  { word: "日本史", meanings: ["Histoire du Japon"], readings: ["にほんし"], mnemonicFr: "HISTOIRE DU JAPON - passe du Japon.", targetKanji: ["日", "本", "史"] },
  { word: "世界史", meanings: ["Histoire mondiale"], readings: ["せかいし"], mnemonicFr: "HISTOIRE MONDIALE - histoire du monde.", targetKanji: ["世", "界", "史"] },

  // 体 (Corps)
  { word: "体", meanings: ["Corps"], readings: ["からだ"], mnemonicFr: "CORPS - physique humain.", targetKanji: ["体"] },
  { word: "体育", meanings: ["Education physique"], readings: ["たいいく"], mnemonicFr: "EDUCATION PHYSIQUE - sport a l'ecole.", targetKanji: ["体", "育"] },
  { word: "体力", meanings: ["Force physique"], readings: ["たいりょく"], mnemonicFr: "FORCE PHYSIQUE - endurance corporelle.", targetKanji: ["体", "力"] },
  { word: "体重", meanings: ["Poids corporel"], readings: ["たいじゅう"], mnemonicFr: "POIDS CORPOREL - masse du corps.", targetKanji: ["体", "重"] },
  { word: "体温", meanings: ["Temperature corporelle"], readings: ["たいおん"], mnemonicFr: "TEMPERATURE CORPORELLE - chaleur du corps.", targetKanji: ["体", "温"] },

  // 育 (Elever/Eduquer)
  { word: "育てる", meanings: ["Elever", "Cultiver"], readings: ["そだてる"], mnemonicFr: "ELEVER - faire grandir.", targetKanji: ["育"] },
  { word: "教育", meanings: ["Education"], readings: ["きょういく"], mnemonicFr: "EDUCATION - formation intellectuelle.", targetKanji: ["教", "育"] },
  { word: "育児", meanings: ["Puericulture"], readings: ["いくじ"], mnemonicFr: "PUERICULTURE - soin des enfants.", targetKanji: ["育", "児"] },
  { word: "成育", meanings: ["Croissance"], readings: ["せいいく"], mnemonicFr: "CROISSANCE - developpement.", targetKanji: ["成", "育"] },
];

// Part 7: Medical Terms (医、病、薬、痛、治)
const vocabMedical = [
  // 医 (Medecine)
  { word: "医者", meanings: ["Medecin"], readings: ["いしゃ"], mnemonicFr: "MEDECIN - praticien de la medecine.", targetKanji: ["医", "者"] },
  { word: "医学", meanings: ["Medecine"], readings: ["いがく"], mnemonicFr: "MEDECINE - science medicale.", targetKanji: ["医", "学"] },
  { word: "医院", meanings: ["Clinique"], readings: ["いいん"], mnemonicFr: "CLINIQUE - etablissement medical.", targetKanji: ["医", "院"] },
  { word: "医療", meanings: ["Soins medicaux"], readings: ["いりょう"], mnemonicFr: "SOINS MEDICAUX - traitement medical.", targetKanji: ["医", "療"] },
  { word: "歯医者", meanings: ["Dentiste"], readings: ["はいしゃ"], mnemonicFr: "DENTISTE - medecin des dents.", targetKanji: ["歯", "医", "者"] },

  // 病 (Maladie)
  { word: "病気", meanings: ["Maladie"], readings: ["びょうき"], mnemonicFr: "MALADIE - trouble de sante.", targetKanji: ["病", "気"] },
  { word: "病院", meanings: ["Hopital"], readings: ["びょういん"], mnemonicFr: "HOPITAL - etablissement de soins.", targetKanji: ["病", "院"] },
  { word: "病人", meanings: ["Malade"], readings: ["びょうにん"], mnemonicFr: "MALADE - personne souffrante.", targetKanji: ["病", "人"] },
  { word: "病室", meanings: ["Chambre d'hopital"], readings: ["びょうしつ"], mnemonicFr: "CHAMBRE D'HOPITAL - piece pour malades.", targetKanji: ["病", "室"] },
  { word: "看病", meanings: ["Soigner un malade"], readings: ["かんびょう"], mnemonicFr: "SOIGNER UN MALADE - prendre soin.", targetKanji: ["看", "病"] },

  // 薬 (Medicament)
  { word: "薬", meanings: ["Medicament"], readings: ["くすり"], mnemonicFr: "MEDICAMENT - substance therapeutique.", targetKanji: ["薬"] },
  { word: "薬局", meanings: ["Pharmacie"], readings: ["やっきょく"], mnemonicFr: "PHARMACIE - magasin de medicaments.", targetKanji: ["薬", "局"] },
  { word: "薬品", meanings: ["Produit chimique"], readings: ["やくひん"], mnemonicFr: "PRODUIT CHIMIQUE - substance medicale.", targetKanji: ["薬", "品"] },
  { word: "飲み薬", meanings: ["Medicament oral"], readings: ["のみぐすり"], mnemonicFr: "MEDICAMENT ORAL - remede a avaler.", targetKanji: ["飲", "薬"] },
  { word: "目薬", meanings: ["Collyre"], readings: ["めぐすり"], mnemonicFr: "COLLYRE - gouttes pour les yeux.", targetKanji: ["目", "薬"] },

  // 痛 (Douleur)
  { word: "痛い", meanings: ["Douloureux"], readings: ["いたい"], mnemonicFr: "DOULOUREUX - qui fait mal.", targetKanji: ["痛"] },
  { word: "痛み", meanings: ["Douleur"], readings: ["いたみ"], mnemonicFr: "DOULEUR - sensation desagreable.", targetKanji: ["痛"] },
  { word: "頭痛", meanings: ["Mal de tete"], readings: ["ずつう"], mnemonicFr: "MAL DE TETE - douleur cranienne.", targetKanji: ["頭", "痛"] },
  { word: "腹痛", meanings: ["Mal de ventre"], readings: ["ふくつう"], mnemonicFr: "MAL DE VENTRE - douleur abdominale.", targetKanji: ["腹", "痛"] },
  { word: "苦痛", meanings: ["Souffrance"], readings: ["くつう"], mnemonicFr: "SOUFFRANCE - douleur intense.", targetKanji: ["苦", "痛"] },

  // 治 (Guerir)
  { word: "治る", meanings: ["Guerir"], readings: ["なおる"], mnemonicFr: "GUERIR - retrouver la sante.", targetKanji: ["治"] },
  { word: "治す", meanings: ["Soigner"], readings: ["なおす"], mnemonicFr: "SOIGNER - faire guerir.", targetKanji: ["治"] },
  { word: "治療", meanings: ["Traitement"], readings: ["ちりょう"], mnemonicFr: "TRAITEMENT - soin medical.", targetKanji: ["治", "療"] },
  { word: "政治", meanings: ["Politique"], readings: ["せいじ"], mnemonicFr: "POLITIQUE - art de gouverner.", targetKanji: ["政", "治"] },
  { word: "治安", meanings: ["Ordre public"], readings: ["ちあん"], mnemonicFr: "ORDRE PUBLIC - securite sociale.", targetKanji: ["治", "安"] },
];

// Part 8: Sports (体、育 continued + general sports vocabulary)
const vocabSports = [
  // Sports generaux
  { word: "運動", meanings: ["Exercice", "Sport"], readings: ["うんどう"], mnemonicFr: "EXERCICE - activite physique.", targetKanji: ["運", "動"] },
  { word: "運動会", meanings: ["Journee sportive"], readings: ["うんどうかい"], mnemonicFr: "JOURNEE SPORTIVE - competition scolaire.", targetKanji: ["運", "動", "会"] },
  { word: "試合", meanings: ["Match", "Competition"], readings: ["しあい"], mnemonicFr: "MATCH - competition sportive.", targetKanji: ["試", "合"] },
  { word: "選手", meanings: ["Athlete", "Joueur"], readings: ["せんしゅ"], mnemonicFr: "ATHLETE - sportif professionnel.", targetKanji: ["選", "手"] },
  { word: "勝負", meanings: ["Competition", "Duel"], readings: ["しょうぶ"], mnemonicFr: "COMPETITION - affrontement.", targetKanji: ["勝", "負"] },
  { word: "勝つ", meanings: ["Gagner"], readings: ["かつ"], mnemonicFr: "GAGNER - remporter la victoire.", targetKanji: ["勝"] },
  { word: "負ける", meanings: ["Perdre"], readings: ["まける"], mnemonicFr: "PERDRE - etre vaincu.", targetKanji: ["負"] },
  { word: "走る", meanings: ["Courir"], readings: ["はしる"], mnemonicFr: "COURIR - se deplacer rapidement.", targetKanji: ["走"] },
  { word: "泳ぐ", meanings: ["Nager"], readings: ["およぐ"], mnemonicFr: "NAGER - se deplacer dans l'eau.", targetKanji: ["泳"] },
  { word: "水泳", meanings: ["Natation"], readings: ["すいえい"], mnemonicFr: "NATATION - sport aquatique.", targetKanji: ["水", "泳"] },
  { word: "投げる", meanings: ["Lancer"], readings: ["なげる"], mnemonicFr: "LANCER - projeter un objet.", targetKanji: ["投"] },
  { word: "打つ", meanings: ["Frapper"], readings: ["うつ"], mnemonicFr: "FRAPPER - donner un coup.", targetKanji: ["打"] },
  { word: "蹴る", meanings: ["Donner un coup de pied"], readings: ["ける"], mnemonicFr: "DONNER UN COUP DE PIED - frapper avec le pied.", targetKanji: ["蹴"] },
  { word: "野球", meanings: ["Baseball"], readings: ["やきゅう"], mnemonicFr: "BASEBALL - sport de batte et balle.", targetKanji: ["野", "球"] },
  { word: "柔道", meanings: ["Judo"], readings: ["じゅうどう"], mnemonicFr: "JUDO - art martial japonais.", targetKanji: ["柔", "道"] },
  { word: "剣道", meanings: ["Kendo"], readings: ["けんどう"], mnemonicFr: "KENDO - escrime japonaise.", targetKanji: ["剣", "道"] },
  { word: "相撲", meanings: ["Sumo"], readings: ["すもう"], mnemonicFr: "SUMO - lutte traditionnelle japonaise.", targetKanji: ["相"] },
];

// Part 9: Additional Nature and Environment vocabulary
const vocabEnvironment = [
  // 台 (Support/Compteur)
  { word: "台", meanings: ["Support", "Plateforme"], readings: ["だい"], mnemonicFr: "SUPPORT - base pour poser quelque chose.", targetKanji: ["台"] },
  { word: "台所", meanings: ["Cuisine"], readings: ["だいどころ"], mnemonicFr: "CUISINE - piece pour preparer les repas.", targetKanji: ["台", "所"] },
  { word: "台風", meanings: ["Typhon"], readings: ["たいふう"], mnemonicFr: "TYPHON - tempete tropicale violente.", targetKanji: ["台", "風"] },
  { word: "舞台", meanings: ["Scene"], readings: ["ぶたい"], mnemonicFr: "SCENE - plateforme de spectacle.", targetKanji: ["舞", "台"] },

  // Additional weather
  { word: "雨", meanings: ["Pluie"], readings: ["あめ"], mnemonicFr: "PLUIE - eau tombant du ciel.", targetKanji: ["雨"] },
  { word: "大雨", meanings: ["Forte pluie"], readings: ["おおあめ"], mnemonicFr: "FORTE PLUIE - precipitation abondante.", targetKanji: ["大", "雨"] },
  { word: "梅雨", meanings: ["Saison des pluies"], readings: ["つゆ"], mnemonicFr: "SAISON DES PLUIES - periode humide au Japon.", targetKanji: ["梅", "雨"] },
  { word: "雨季", meanings: ["Saison des pluies"], readings: ["うき"], mnemonicFr: "SAISON DES PLUIES - periode pluvieuse.", targetKanji: ["雨"] },

  // More nature
  { word: "川", meanings: ["Riviere"], readings: ["かわ"], mnemonicFr: "RIVIERE - cours d'eau.", targetKanji: ["川"] },
  { word: "河", meanings: ["Fleuve"], readings: ["かわ"], mnemonicFr: "FLEUVE - grand cours d'eau.", targetKanji: ["河"] },
  { word: "湖", meanings: ["Lac"], readings: ["みずうみ"], mnemonicFr: "LAC - grande etendue d'eau douce.", targetKanji: ["湖"] },
  { word: "池", meanings: ["Etang"], readings: ["いけ"], mnemonicFr: "ETANG - petite etendue d'eau.", targetKanji: ["池"] },
  { word: "島", meanings: ["Ile"], readings: ["しま"], mnemonicFr: "ILE - terre entouree d'eau.", targetKanji: ["島"] },
  { word: "岩", meanings: ["Rocher"], readings: ["いわ"], mnemonicFr: "ROCHER - grosse pierre.", targetKanji: ["岩"] },
  { word: "石", meanings: ["Pierre"], readings: ["いし"], mnemonicFr: "PIERRE - fragment de roche.", targetKanji: ["石"] },
  { word: "土", meanings: ["Terre", "Sol"], readings: ["つち"], mnemonicFr: "TERRE - sol, surface terrestre.", targetKanji: ["土"] },
  { word: "砂", meanings: ["Sable"], readings: ["すな"], mnemonicFr: "SABLE - grains fins de roche.", targetKanji: ["砂"] },
  { word: "波", meanings: ["Vague"], readings: ["なみ"], mnemonicFr: "VAGUE - ondulation de l'eau.", targetKanji: ["波"] },
];

// Part 10: Additional vocabulary to reach 200+
const vocabAdditional = [
  // More music related
  { word: "弾く", meanings: ["Jouer (instrument)"], readings: ["ひく"], mnemonicFr: "JOUER - produire de la musique avec un instrument.", targetKanji: ["弾"] },
  { word: "吹く", meanings: ["Souffler", "Jouer (vent)"], readings: ["ふく"], mnemonicFr: "SOUFFLER - jouer d'un instrument a vent.", targetKanji: ["吹"] },
  { word: "踊る", meanings: ["Danser"], readings: ["おどる"], mnemonicFr: "DANSER - bouger au rythme de la musique.", targetKanji: ["踊"] },
  { word: "踊り", meanings: ["Danse"], readings: ["おどり"], mnemonicFr: "DANSE - art du mouvement.", targetKanji: ["踊"] },
  { word: "曲", meanings: ["Morceau", "Melodie"], readings: ["きょく"], mnemonicFr: "MORCEAU - piece musicale.", targetKanji: ["曲"] },
  { word: "声", meanings: ["Voix"], readings: ["こえ"], mnemonicFr: "VOIX - son produit par la gorge.", targetKanji: ["声"] },
  { word: "大声", meanings: ["Voix forte"], readings: ["おおごえ"], mnemonicFr: "VOIX FORTE - parler fort.", targetKanji: ["大", "声"] },

  // More school related
  { word: "学校", meanings: ["Ecole"], readings: ["がっこう"], mnemonicFr: "ECOLE - etablissement d'enseignement.", targetKanji: ["学", "校"] },
  { word: "小学校", meanings: ["Ecole primaire"], readings: ["しょうがっこう"], mnemonicFr: "ECOLE PRIMAIRE - premier niveau scolaire.", targetKanji: ["小", "学", "校"] },
  { word: "中学校", meanings: ["College"], readings: ["ちゅうがっこう"], mnemonicFr: "COLLEGE - ecole secondaire inferieure.", targetKanji: ["中", "学", "校"] },
  { word: "高校", meanings: ["Lycee"], readings: ["こうこう"], mnemonicFr: "LYCEE - ecole secondaire superieure.", targetKanji: ["高", "校"] },
  { word: "大学", meanings: ["Universite"], readings: ["だいがく"], mnemonicFr: "UNIVERSITE - enseignement superieur.", targetKanji: ["大", "学"] },
  { word: "先生", meanings: ["Professeur"], readings: ["せんせい"], mnemonicFr: "PROFESSEUR - enseignant.", targetKanji: ["先", "生"] },
  { word: "生徒", meanings: ["Eleve"], readings: ["せいと"], mnemonicFr: "ELEVE - apprenant a l'ecole.", targetKanji: ["生", "徒"] },
  { word: "学生", meanings: ["Etudiant"], readings: ["がくせい"], mnemonicFr: "ETUDIANT - apprenant a l'universite.", targetKanji: ["学", "生"] },
  { word: "授業", meanings: ["Cours"], readings: ["じゅぎょう"], mnemonicFr: "COURS - lecon, classe.", targetKanji: ["授", "業"] },
  { word: "宿題", meanings: ["Devoirs"], readings: ["しゅくだい"], mnemonicFr: "DEVOIRS - travail a faire a la maison.", targetKanji: ["宿", "題"] },
  { word: "試験", meanings: ["Examen"], readings: ["しけん"], mnemonicFr: "EXAMEN - evaluation des connaissances.", targetKanji: ["試", "験"] },

  // More medical
  { word: "健康", meanings: ["Sante"], readings: ["けんこう"], mnemonicFr: "SANTE - bon etat physique.", targetKanji: ["健", "康"] },
  { word: "注射", meanings: ["Injection"], readings: ["ちゅうしゃ"], mnemonicFr: "INJECTION - piqure medicale.", targetKanji: ["注", "射"] },
  { word: "手術", meanings: ["Operation chirurgicale"], readings: ["しゅじゅつ"], mnemonicFr: "OPERATION - intervention chirurgicale.", targetKanji: ["手", "術"] },
  { word: "怪我", meanings: ["Blessure"], readings: ["けが"], mnemonicFr: "BLESSURE - dommage corporel.", targetKanji: ["怪", "我"] },
  { word: "熱がある", meanings: ["Avoir de la fievre"], readings: ["ねつがある"], mnemonicFr: "AVOIR DE LA FIEVRE - temperature elevee.", targetKanji: ["熱"] },

  // More animals
  { word: "動物", meanings: ["Animal"], readings: ["どうぶつ"], mnemonicFr: "ANIMAL - etre vivant mobile.", targetKanji: ["動", "物"] },
  { word: "動物園", meanings: ["Zoo"], readings: ["どうぶつえん"], mnemonicFr: "ZOO - parc animalier.", targetKanji: ["動", "物", "園"] },
  { word: "水族館", meanings: ["Aquarium"], readings: ["すいぞくかん"], mnemonicFr: "AQUARIUM - musee de creatures marines.", targetKanji: ["水", "族", "館"] },
  { word: "象", meanings: ["Elephant"], readings: ["ぞう"], mnemonicFr: "ELEPHANT - grand mammifere a trompe.", targetKanji: ["象"] },
  { word: "猿", meanings: ["Singe"], readings: ["さる"], mnemonicFr: "SINGE - primate.", targetKanji: ["猿"] },
  { word: "熊", meanings: ["Ours"], readings: ["くま"], mnemonicFr: "OURS - grand mammifere plantigrade.", targetKanji: ["熊"] },
  { word: "狼", meanings: ["Loup"], readings: ["おおかみ"], mnemonicFr: "LOUP - canide sauvage.", targetKanji: ["狼"] },
  { word: "狐", meanings: ["Renard"], readings: ["きつね"], mnemonicFr: "RENARD - canide ruse.", targetKanji: ["狐"] },
  { word: "兎", meanings: ["Lapin"], readings: ["うさぎ"], mnemonicFr: "LAPIN - petit mammifere aux longues oreilles.", targetKanji: ["兎"] },
  { word: "蛇", meanings: ["Serpent"], readings: ["へび"], mnemonicFr: "SERPENT - reptile sans pattes.", targetKanji: ["蛇"] },
  { word: "亀", meanings: ["Tortue"], readings: ["かめ"], mnemonicFr: "TORTUE - reptile a carapace.", targetKanji: ["亀"] },
  { word: "蝶", meanings: ["Papillon"], readings: ["ちょう"], mnemonicFr: "PAPILLON - insecte aux ailes colorees.", targetKanji: ["蝶"] },
  { word: "蜂", meanings: ["Abeille"], readings: ["はち"], mnemonicFr: "ABEILLE - insecte producteur de miel.", targetKanji: ["蜂"] },
  { word: "蟻", meanings: ["Fourmi"], readings: ["あり"], mnemonicFr: "FOURMI - petit insecte social.", targetKanji: ["蟻"] },
  { word: "蚊", meanings: ["Moustique"], readings: ["か"], mnemonicFr: "MOUSTIQUE - insecte piqueur.", targetKanji: ["蚊"] },
  { word: "蝉", meanings: ["Cigale"], readings: ["せみ"], mnemonicFr: "CIGALE - insecte bruyant de l'ete.", targetKanji: ["蝉"] },

  // More nature/plants
  { word: "桜", meanings: ["Cerisier"], readings: ["さくら"], mnemonicFr: "CERISIER - arbre aux fleurs roses.", targetKanji: ["桜"] },
  { word: "桜花", meanings: ["Fleur de cerisier"], readings: ["おうか"], mnemonicFr: "FLEUR DE CERISIER - symbole du Japon.", targetKanji: ["桜", "花"] },
  { word: "梅", meanings: ["Prunier"], readings: ["うめ"], mnemonicFr: "PRUNIER - arbre fruitier.", targetKanji: ["梅"] },
  { word: "松", meanings: ["Pin"], readings: ["まつ"], mnemonicFr: "PIN - conifere a aiguilles.", targetKanji: ["松"] },
  { word: "葉", meanings: ["Feuille"], readings: ["は"], mnemonicFr: "FEUILLE - organe vegetal.", targetKanji: ["葉"] },
  { word: "紅葉", meanings: ["Feuilles d'automne"], readings: ["こうよう"], mnemonicFr: "FEUILLES D'AUTOMNE - feuillage colore.", targetKanji: ["紅", "葉"] },
  { word: "種", meanings: ["Graine"], readings: ["たね"], mnemonicFr: "GRAINE - semence de plante.", targetKanji: ["種"] },
  { word: "根", meanings: ["Racine"], readings: ["ね"], mnemonicFr: "RACINE - partie souterraine.", targetKanji: ["根"] },
  { word: "枝", meanings: ["Branche"], readings: ["えだ"], mnemonicFr: "BRANCHE - rameau d'arbre.", targetKanji: ["枝"] },
  { word: "幹", meanings: ["Tronc"], readings: ["みき"], mnemonicFr: "TRONC - partie principale de l'arbre.", targetKanji: ["幹"] },
];

// Combine all vocabulary
const vocabBatch3 = [
  ...vocabSeasons,
  ...vocabWeather,
  ...vocabNature,
  ...vocabAnimals,
  ...vocabMusic,
  ...vocabSchool,
  ...vocabMedical,
  ...vocabSports,
  ...vocabEnvironment,
  ...vocabAdditional,
];

async function main() {
  console.log("=== SEED VOCABULARY BATCH 3 ===\n");
  console.log(`Total vocabulary entries to process: ${vocabBatch3.length}\n`);

  // Get existing vocabulary to avoid duplicates
  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));
  console.log(`Existing vocabulary count: ${existingWords.size}`);

  // Get all kanji to check if they exist in the database
  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true, id: true }
  });
  const kanjiMap = new Map(allKanji.map(k => [k.character, { levelId: k.levelId, id: k.id }]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));
  console.log(`Existing kanji count: ${existingKanjiSet.size}\n`);

  let added = 0;
  let skipped = 0;
  let skippedMissingKanji = 0;

  for (const vocab of vocabBatch3) {
    // Skip if word already exists
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    // Extract kanji from the word
    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    // Check if any kanji in the word are missing from the database
    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));

    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skippedMissingKanji++;
      continue;
    }

    // Find the maximum level of kanji used (vocabulary appears at the highest level kanji)
    let maxLevel = 1;
    for (const char of wordKanji) {
      const kanjiInfo = kanjiMap.get(char);
      if (kanjiInfo && kanjiInfo.levelId > maxLevel) {
        maxLevel = kanjiInfo.levelId;
      }
    }

    try {
      // Create the vocabulary entry
      const newVocab = await prisma.vocabulary.create({
        data: {
          word: vocab.word,
          meaningsFr: vocab.meanings,
          readings: vocab.readings,
          mnemonicFr: vocab.mnemonicFr,
          levelId: maxLevel,
        }
      });

      // Create VocabularyKanji links
      for (const char of kanjiInWord) {
        const kanjiInfo = kanjiMap.get(char);
        if (kanjiInfo) {
          await prisma.vocabularyKanji.create({
            data: {
              vocabularyId: newVocab.id,
              kanjiId: kanjiInfo.id
            }
          }).catch(() => {
            // Ignore if link already exists
          });
        }
      }

      added++;
    } catch (e: any) {
      if (e.code !== "P2002") {
        // P2002 is unique constraint violation - ignore duplicates
        console.log(`Error adding ${vocab.word}: ${e.message}`);
      }
      skipped++;
    }
  }

  // Final counts
  const totalVocab = await prisma.vocabulary.count();

  console.log("\n=== SUMMARY ===");
  console.log(`Added: ${added}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Skipped (missing kanji): ${skippedMissingKanji}`);
  console.log(`Total vocabulary in database: ${totalVocab}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
