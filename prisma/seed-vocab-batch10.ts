import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary Batch 10: Geography, Countries, Places, and Locations
// Focus on JLPT N5-N3 kanji

// Part 1: Countries and Nationalities
const vocabPart1 = [
  // Countries
  { word: "日本", meanings: ["Japon"], readings: ["にほん", "にっぽん"], mnemonicFr: "JAPON - le pays du soleil levant, origine du soleil.", targetKanji: ["日", "本"] },
  { word: "中国", meanings: ["Chine"], readings: ["ちゅうごく"], mnemonicFr: "CHINE - le pays du milieu, empire central.", targetKanji: ["中", "国"] },
  { word: "外国", meanings: ["Pays etranger"], readings: ["がいこく"], mnemonicFr: "PAYS ETRANGER - pays exterieur au notre.", targetKanji: ["外", "国"] },
  { word: "米国", meanings: ["Etats-Unis"], readings: ["べいこく"], mnemonicFr: "ETATS-UNIS - pays du riz (amerique).", targetKanji: ["米", "国"] },
  { word: "英国", meanings: ["Royaume-Uni", "Angleterre"], readings: ["えいこく"], mnemonicFr: "ROYAUME-UNI - pays anglais.", targetKanji: ["英", "国"] },
  { word: "韓国", meanings: ["Coree du Sud"], readings: ["かんこく"], mnemonicFr: "COREE DU SUD - pays coreen.", targetKanji: ["韓", "国"] },
  { word: "全国", meanings: ["Tout le pays", "National"], readings: ["ぜんこく"], mnemonicFr: "NATIONAL - l'ensemble du pays.", targetKanji: ["全", "国"] },
  { word: "各国", meanings: ["Chaque pays", "Tous les pays"], readings: ["かっこく"], mnemonicFr: "CHAQUE PAYS - tous les pays individuellement.", targetKanji: ["各", "国"] },
  { word: "王国", meanings: ["Royaume"], readings: ["おうこく"], mnemonicFr: "ROYAUME - pays gouverne par un roi.", targetKanji: ["王", "国"] },
  { word: "帝国", meanings: ["Empire"], readings: ["ていこく"], mnemonicFr: "EMPIRE - vaste territoire sous un empereur.", targetKanji: ["帝", "国"] },

  // Japanese regions
  { word: "北海道", meanings: ["Hokkaido"], readings: ["ほっかいどう"], mnemonicFr: "HOKKAIDO - la voie de la mer du nord.", targetKanji: ["北", "海", "道"] },
  { word: "東京", meanings: ["Tokyo"], readings: ["とうきょう"], mnemonicFr: "TOKYO - la capitale de l'est.", targetKanji: ["東", "京"] },
  { word: "京都", meanings: ["Kyoto"], readings: ["きょうと"], mnemonicFr: "KYOTO - l'ancienne capitale.", targetKanji: ["京", "都"] },
  { word: "大阪", meanings: ["Osaka"], readings: ["おおさか"], mnemonicFr: "OSAKA - grande pente, ville commerciale.", targetKanji: ["大", "阪"] },
  { word: "関東", meanings: ["Kanto", "Region de Tokyo"], readings: ["かんとう"], mnemonicFr: "KANTO - a l'est de la barriere, region de Tokyo.", targetKanji: ["関", "東"] },
  { word: "関西", meanings: ["Kansai", "Region d'Osaka"], readings: ["かんさい"], mnemonicFr: "KANSAI - a l'ouest de la barriere, region d'Osaka.", targetKanji: ["関", "西"] },
  { word: "東北", meanings: ["Tohoku", "Nord-Est"], readings: ["とうほく"], mnemonicFr: "TOHOKU - region nord-est du Japon.", targetKanji: ["東", "北"] },
  { word: "九州", meanings: ["Kyushu"], readings: ["きゅうしゅう"], mnemonicFr: "KYUSHU - les neuf provinces du sud.", targetKanji: ["九", "州"] },
  { word: "四国", meanings: ["Shikoku"], readings: ["しこく"], mnemonicFr: "SHIKOKU - les quatre pays, ile du sud.", targetKanji: ["四", "国"] },
  { word: "本州", meanings: ["Honshu", "Ile principale"], readings: ["ほんしゅう"], mnemonicFr: "HONSHU - la province principale du Japon.", targetKanji: ["本", "州"] },

  // Geography terms
  { word: "半島", meanings: ["Peninsule"], readings: ["はんとう"], mnemonicFr: "PENINSULE - moitie ile, terre entouree d'eau sur trois cotes.", targetKanji: ["半", "島"] },
  { word: "列島", meanings: ["Archipel", "Chaine d'iles"], readings: ["れっとう"], mnemonicFr: "ARCHIPEL - rangee d'iles.", targetKanji: ["列", "島"] },
  { word: "大陸", meanings: ["Continent"], readings: ["たいりく"], mnemonicFr: "CONTINENT - grande masse de terre.", targetKanji: ["大", "陸"] },
  { word: "島国", meanings: ["Pays insulaire"], readings: ["しまぐに"], mnemonicFr: "PAYS INSULAIRE - pays constitue d'iles.", targetKanji: ["島", "国"] },
  { word: "諸島", meanings: ["Archipel", "Iles"], readings: ["しょとう"], mnemonicFr: "ARCHIPEL - groupe d'iles.", targetKanji: ["諸", "島"] },
  { word: "群島", meanings: ["Archipel", "Groupe d'iles"], readings: ["ぐんとう"], mnemonicFr: "GROUPE D'ILES - ensemble d'iles.", targetKanji: ["群", "島"] },
  { word: "小島", meanings: ["Ilot", "Petite ile"], readings: ["こじま"], mnemonicFr: "ILOT - petite ile.", targetKanji: ["小", "島"] },
  { word: "離島", meanings: ["Ile isolee"], readings: ["りとう"], mnemonicFr: "ILE ISOLEE - ile eloignee du continent.", targetKanji: ["離", "島"] },
  { word: "無人島", meanings: ["Ile deserte"], readings: ["むじんとう"], mnemonicFr: "ILE DESERTE - ile sans habitants.", targetKanji: ["無", "人", "島"] },
  { word: "火山島", meanings: ["Ile volcanique"], readings: ["かざんとう"], mnemonicFr: "ILE VOLCANIQUE - ile formee par un volcan.", targetKanji: ["火", "山", "島"] },
];

// Part 2: Directions and Regions
const vocabPart2 = [
  // Cardinal directions
  { word: "東西南北", meanings: ["Les quatre points cardinaux"], readings: ["とうざいなんぼく"], mnemonicFr: "QUATRE POINTS CARDINAUX - est, ouest, sud, nord.", targetKanji: ["東", "西", "南", "北"] },
  { word: "東部", meanings: ["Partie est", "Region est"], readings: ["とうぶ"], mnemonicFr: "PARTIE EST - zone orientale.", targetKanji: ["東", "部"] },
  { word: "西部", meanings: ["Partie ouest", "Region ouest"], readings: ["せいぶ"], mnemonicFr: "PARTIE OUEST - zone occidentale.", targetKanji: ["西", "部"] },
  { word: "南部", meanings: ["Partie sud", "Region sud"], readings: ["なんぶ"], mnemonicFr: "PARTIE SUD - zone meridionale.", targetKanji: ["南", "部"] },
  { word: "北部", meanings: ["Partie nord", "Region nord"], readings: ["ほくぶ"], mnemonicFr: "PARTIE NORD - zone septentrionale.", targetKanji: ["北", "部"] },
  { word: "中部", meanings: ["Partie centrale", "Centre"], readings: ["ちゅうぶ"], mnemonicFr: "PARTIE CENTRALE - zone du milieu.", targetKanji: ["中", "部"] },
  { word: "東方", meanings: ["Orient", "Est"], readings: ["とうほう"], mnemonicFr: "ORIENT - direction de l'est.", targetKanji: ["東", "方"] },
  { word: "西方", meanings: ["Occident", "Ouest"], readings: ["せいほう"], mnemonicFr: "OCCIDENT - direction de l'ouest.", targetKanji: ["西", "方"] },
  { word: "南方", meanings: ["Sud", "Regions du sud"], readings: ["なんぽう"], mnemonicFr: "SUD - direction du sud.", targetKanji: ["南", "方"] },
  { word: "北方", meanings: ["Nord", "Regions du nord"], readings: ["ほっぽう"], mnemonicFr: "NORD - direction du nord.", targetKanji: ["北", "方"] },

  // More directional compounds
  { word: "東南", meanings: ["Sud-est"], readings: ["とうなん"], mnemonicFr: "SUD-EST - entre l'est et le sud.", targetKanji: ["東", "南"] },
  { word: "東北", meanings: ["Nord-est"], readings: ["とうほく"], mnemonicFr: "NORD-EST - entre l'est et le nord.", targetKanji: ["東", "北"] },
  { word: "西南", meanings: ["Sud-ouest"], readings: ["せいなん"], mnemonicFr: "SUD-OUEST - entre l'ouest et le sud.", targetKanji: ["西", "南"] },
  { word: "西北", meanings: ["Nord-ouest"], readings: ["せいほく"], mnemonicFr: "NORD-OUEST - entre l'ouest et le nord.", targetKanji: ["西", "北"] },
  { word: "方向", meanings: ["Direction", "Sens"], readings: ["ほうこう"], mnemonicFr: "DIRECTION - sens vers lequel on va.", targetKanji: ["方", "向"] },
  { word: "方位", meanings: ["Point cardinal", "Orientation"], readings: ["ほうい"], mnemonicFr: "ORIENTATION - position par rapport aux points cardinaux.", targetKanji: ["方", "位"] },
  { word: "方角", meanings: ["Direction", "Point cardinal"], readings: ["ほうがく"], mnemonicFr: "POINT CARDINAL - direction geographique.", targetKanji: ["方", "角"] },
  { word: "全方位", meanings: ["Toutes directions", "Omnidirectionnel"], readings: ["ぜんほうい"], mnemonicFr: "TOUTES DIRECTIONS - dans tous les sens.", targetKanji: ["全", "方", "位"] },
  { word: "上下左右", meanings: ["Haut, bas, gauche, droite"], readings: ["じょうげさゆう"], mnemonicFr: "QUATRE DIRECTIONS - haut, bas, gauche et droite.", targetKanji: ["上", "下", "左", "右"] },
  { word: "前後左右", meanings: ["Devant, derriere, gauche, droite"], readings: ["ぜんごさゆう"], mnemonicFr: "QUATRE COTES - avant, arriere et cotes.", targetKanji: ["前", "後", "左", "右"] },

  // Places and locations
  { word: "都市", meanings: ["Ville", "Cite"], readings: ["とし"], mnemonicFr: "VILLE - grande agglomeration urbaine.", targetKanji: ["都", "市"] },
  { word: "首都", meanings: ["Capitale"], readings: ["しゅと"], mnemonicFr: "CAPITALE - ville principale d'un pays.", targetKanji: ["首", "都"] },
  { word: "地方", meanings: ["Region", "Province"], readings: ["ちほう"], mnemonicFr: "REGION - zone geographique.", targetKanji: ["地", "方"] },
  { word: "田舎", meanings: ["Campagne", "Rural"], readings: ["いなか"], mnemonicFr: "CAMPAGNE - zone rurale loin des villes.", targetKanji: ["田", "舎"] },
  { word: "郊外", meanings: ["Banlieue", "Peripherie"], readings: ["こうがい"], mnemonicFr: "BANLIEUE - zone autour de la ville.", targetKanji: ["郊", "外"] },
  { word: "市内", meanings: ["Dans la ville", "Centre-ville"], readings: ["しない"], mnemonicFr: "DANS LA VILLE - interieur de la ville.", targetKanji: ["市", "内"] },
  { word: "市外", meanings: ["Hors de la ville"], readings: ["しがい"], mnemonicFr: "HORS DE LA VILLE - exterieur de la ville.", targetKanji: ["市", "外"] },
  { word: "国内", meanings: ["Domestique", "National"], readings: ["こくない"], mnemonicFr: "NATIONAL - a l'interieur du pays.", targetKanji: ["国", "内"] },
  { word: "国外", meanings: ["A l'etranger", "Hors du pays"], readings: ["こくがい"], mnemonicFr: "A L'ETRANGER - en dehors du pays.", targetKanji: ["国", "外"] },
  { word: "海外", meanings: ["Outre-mer", "Etranger"], readings: ["かいがい"], mnemonicFr: "OUTRE-MER - au-dela des mers, a l'etranger.", targetKanji: ["海", "外"] },
];

// Part 3: Buildings and Structures
const vocabPart3 = [
  { word: "建物", meanings: ["Batiment", "Immeuble"], readings: ["たてもの"], mnemonicFr: "BATIMENT - construction architecturale.", targetKanji: ["建", "物"] },
  { word: "建築", meanings: ["Architecture", "Construction"], readings: ["けんちく"], mnemonicFr: "ARCHITECTURE - art de construire.", targetKanji: ["建", "築"] },
  { word: "建設", meanings: ["Construction"], readings: ["けんせつ"], mnemonicFr: "CONSTRUCTION - action de batir.", targetKanji: ["建", "設"] },
  { word: "構造", meanings: ["Structure", "Architecture"], readings: ["こうぞう"], mnemonicFr: "STRUCTURE - organisation d'un batiment.", targetKanji: ["構", "造"] },
  { word: "高層", meanings: ["Grande hauteur", "Gratte-ciel"], readings: ["こうそう"], mnemonicFr: "GRANDE HAUTEUR - batiment tres haut.", targetKanji: ["高", "層"] },
  { word: "高層ビル", meanings: ["Gratte-ciel", "Tour"], readings: ["こうそうビル"], mnemonicFr: "GRATTE-CIEL - immeuble tres eleve.", targetKanji: ["高", "層"] },
  { word: "地下", meanings: ["Sous-sol", "Souterrain"], readings: ["ちか"], mnemonicFr: "SOUS-SOL - en dessous du sol.", targetKanji: ["地", "下"] },
  { word: "地上", meanings: ["Au sol", "Terrestre"], readings: ["ちじょう"], mnemonicFr: "AU SOL - a la surface de la terre.", targetKanji: ["地", "上"] },
  { word: "地階", meanings: ["Sous-sol", "Niveau souterrain"], readings: ["ちかい"], mnemonicFr: "NIVEAU SOUTERRAIN - etage sous terre.", targetKanji: ["地", "階"] },
  { word: "階段", meanings: ["Escalier"], readings: ["かいだん"], mnemonicFr: "ESCALIER - marches pour monter.", targetKanji: ["階", "段"] },

  // More building types
  { word: "住宅", meanings: ["Residence", "Logement"], readings: ["じゅうたく"], mnemonicFr: "RESIDENCE - lieu d'habitation.", targetKanji: ["住", "宅"] },
  { word: "一戸建て", meanings: ["Maison individuelle"], readings: ["いっこだて"], mnemonicFr: "MAISON INDIVIDUELLE - maison pour une famille.", targetKanji: ["一", "戸", "建"] },
  { word: "集合住宅", meanings: ["Immeuble collectif"], readings: ["しゅうごうじゅうたく"], mnemonicFr: "IMMEUBLE COLLECTIF - logements groupes.", targetKanji: ["集", "合", "住", "宅"] },
  { word: "公団", meanings: ["Logement public"], readings: ["こうだん"], mnemonicFr: "LOGEMENT PUBLIC - HLM japonais.", targetKanji: ["公", "団"] },
  { word: "公営", meanings: ["Gere par l'Etat", "Public"], readings: ["こうえい"], mnemonicFr: "PUBLIC - gere par le gouvernement.", targetKanji: ["公", "営"] },
  { word: "民家", meanings: ["Maison privee", "Habitation"], readings: ["みんか"], mnemonicFr: "MAISON PRIVEE - residence du peuple.", targetKanji: ["民", "家"] },
  { word: "古民家", meanings: ["Vieille maison traditionnelle"], readings: ["こみんか"], mnemonicFr: "MAISON ANCIENNE - habitation traditionnelle.", targetKanji: ["古", "民", "家"] },
  { word: "農家", meanings: ["Ferme", "Maison de paysan"], readings: ["のうか"], mnemonicFr: "FERME - maison d'agriculteur.", targetKanji: ["農", "家"] },
  { word: "店舗", meanings: ["Magasin", "Boutique"], readings: ["てんぽ"], mnemonicFr: "MAGASIN - local commercial.", targetKanji: ["店", "舗"] },
  { word: "事務所", meanings: ["Bureau", "Office"], readings: ["じむしょ"], mnemonicFr: "BUREAU - lieu de travail administratif.", targetKanji: ["事", "務", "所"] },

  // Public buildings
  { word: "市役所", meanings: ["Mairie", "Hotel de ville"], readings: ["しやくしょ"], mnemonicFr: "MAIRIE - administration municipale.", targetKanji: ["市", "役", "所"] },
  { word: "区役所", meanings: ["Mairie d'arrondissement"], readings: ["くやくしょ"], mnemonicFr: "MAIRIE D'ARRONDISSEMENT - administration de quartier.", targetKanji: ["区", "役", "所"] },
  { word: "県庁", meanings: ["Prefecture", "Gouvernement prefectoral"], readings: ["けんちょう"], mnemonicFr: "PREFECTURE - administration regionale.", targetKanji: ["県", "庁"] },
  { word: "都庁", meanings: ["Gouvernement metropolitain"], readings: ["とちょう"], mnemonicFr: "GOUVERNEMENT DE TOKYO - administration de Tokyo.", targetKanji: ["都", "庁"] },
  { word: "警察署", meanings: ["Commissariat de police"], readings: ["けいさつしょ"], mnemonicFr: "COMMISSARIAT - bureau de police.", targetKanji: ["警", "察", "署"] },
  { word: "消防署", meanings: ["Caserne de pompiers"], readings: ["しょうぼうしょ"], mnemonicFr: "CASERNE DE POMPIERS - station des pompiers.", targetKanji: ["消", "防", "署"] },
  { word: "郵便局", meanings: ["Bureau de poste"], readings: ["ゆうびんきょく"], mnemonicFr: "BUREAU DE POSTE - service postal.", targetKanji: ["郵", "便", "局"] },
  { word: "税務署", meanings: ["Centre des impots"], readings: ["ぜいむしょ"], mnemonicFr: "CENTRE DES IMPOTS - bureau fiscal.", targetKanji: ["税", "務", "署"] },
  { word: "裁判所", meanings: ["Tribunal", "Cour de justice"], readings: ["さいばんしょ"], mnemonicFr: "TRIBUNAL - lieu de justice.", targetKanji: ["裁", "判", "所"] },
  { word: "大使館", meanings: ["Ambassade"], readings: ["たいしかん"], mnemonicFr: "AMBASSADE - representation diplomatique.", targetKanji: ["大", "使", "館"] },
];

// Part 4: Natural Places and Landforms
const vocabPart4 = [
  { word: "山地", meanings: ["Region montagneuse"], readings: ["さんち"], mnemonicFr: "REGION MONTAGNEUSE - zone de montagnes.", targetKanji: ["山", "地"] },
  { word: "平地", meanings: ["Plaine", "Terrain plat"], readings: ["へいち"], mnemonicFr: "PLAINE - terrain plat et horizontal.", targetKanji: ["平", "地"] },
  { word: "海岸", meanings: ["Cote", "Littoral"], readings: ["かいがん"], mnemonicFr: "COTE - bord de la mer.", targetKanji: ["海", "岸"] },
  { word: "河口", meanings: ["Embouchure", "Estuaire"], readings: ["かこう"], mnemonicFr: "EMBOUCHURE - ou le fleuve rejoint la mer.", targetKanji: ["河", "口"] },
  { word: "森林", meanings: ["Foret"], readings: ["しんりん"], mnemonicFr: "FORET - grande etendue boisee.", targetKanji: ["森", "林"] },
  { word: "山林", meanings: ["Foret de montagne"], readings: ["さんりん"], mnemonicFr: "FORET DE MONTAGNE - bois en montagne.", targetKanji: ["山", "林"] },
  { word: "草原", meanings: ["Prairie", "Steppe"], readings: ["そうげん"], mnemonicFr: "PRAIRIE - etendue d'herbe.", targetKanji: ["草", "原"] },
  { word: "砂漠", meanings: ["Desert"], readings: ["さばく"], mnemonicFr: "DESERT - region aride et sablonneuse.", targetKanji: ["砂", "漠"] },
  { word: "火山", meanings: ["Volcan"], readings: ["かざん"], mnemonicFr: "VOLCAN - montagne de feu.", targetKanji: ["火", "山"] },
  { word: "活火山", meanings: ["Volcan actif"], readings: ["かっかざん"], mnemonicFr: "VOLCAN ACTIF - volcan qui peut entrer en eruption.", targetKanji: ["活", "火", "山"] },

  // Water bodies
  { word: "湖", meanings: ["Lac"], readings: ["みずうみ"], mnemonicFr: "LAC - grande etendue d'eau douce.", targetKanji: ["湖"] },
  { word: "湖水", meanings: ["Eau de lac"], readings: ["こすい"], mnemonicFr: "EAU DE LAC - eau lacustre.", targetKanji: ["湖", "水"] },
  { word: "池", meanings: ["Etang", "Mare"], readings: ["いけ"], mnemonicFr: "ETANG - petit plan d'eau.", targetKanji: ["池"] },
  { word: "川", meanings: ["Riviere", "Fleuve"], readings: ["かわ"], mnemonicFr: "RIVIERE - cours d'eau.", targetKanji: ["川"] },
  { word: "河川", meanings: ["Cours d'eau", "Fleuve"], readings: ["かせん"], mnemonicFr: "COURS D'EAU - riviere ou fleuve.", targetKanji: ["河", "川"] },
  { word: "大河", meanings: ["Grand fleuve"], readings: ["たいが"], mnemonicFr: "GRAND FLEUVE - tres grand cours d'eau.", targetKanji: ["大", "河"] },
  { word: "小川", meanings: ["Ruisseau"], readings: ["おがわ"], mnemonicFr: "RUISSEAU - petit cours d'eau.", targetKanji: ["小", "川"] },
  { word: "滝", meanings: ["Cascade", "Chute d'eau"], readings: ["たき"], mnemonicFr: "CASCADE - eau qui tombe d'une hauteur.", targetKanji: ["滝"] },
  { word: "海", meanings: ["Mer", "Ocean"], readings: ["うみ"], mnemonicFr: "MER - grande etendue d'eau salee.", targetKanji: ["海"] },
  { word: "深海", meanings: ["Fond marin", "Abysses"], readings: ["しんかい"], mnemonicFr: "FOND MARIN - profondeurs de l'ocean.", targetKanji: ["深", "海"] },

  // More landforms
  { word: "谷", meanings: ["Vallee"], readings: ["たに"], mnemonicFr: "VALLEE - depression entre montagnes.", targetKanji: ["谷"] },
  { word: "渓谷", meanings: ["Gorge", "Canyon"], readings: ["けいこく"], mnemonicFr: "GORGE - vallee etroite et profonde.", targetKanji: ["渓", "谷"] },
  { word: "峠", meanings: ["Col de montagne"], readings: ["とうげ"], mnemonicFr: "COL - passage entre deux montagnes.", targetKanji: ["峠"] },
  { word: "山頂", meanings: ["Sommet", "Cime"], readings: ["さんちょう"], mnemonicFr: "SOMMET - point le plus haut de la montagne.", targetKanji: ["山", "頂"] },
  { word: "山腹", meanings: ["Flanc de montagne"], readings: ["さんぷく"], mnemonicFr: "FLANC - cote de la montagne.", targetKanji: ["山", "腹"] },
  { word: "山麓", meanings: ["Pied de la montagne"], readings: ["さんろく"], mnemonicFr: "PIED DE MONTAGNE - base de la montagne.", targetKanji: ["山", "麓"] },
  { word: "丘", meanings: ["Colline"], readings: ["おか"], mnemonicFr: "COLLINE - petite elevation de terrain.", targetKanji: ["丘"] },
  { word: "丘陵", meanings: ["Collines", "Terrain vallonne"], readings: ["きゅうりょう"], mnemonicFr: "TERRAIN VALLONNE - zone de collines.", targetKanji: ["丘", "陵"] },
  { word: "崖", meanings: ["Falaise", "Precipice"], readings: ["がけ"], mnemonicFr: "FALAISE - paroi rocheuse abrupte.", targetKanji: ["崖"] },
  { word: "洞窟", meanings: ["Grotte", "Caverne"], readings: ["どうくつ"], mnemonicFr: "GROTTE - cavite naturelle dans la roche.", targetKanji: ["洞", "窟"] },
];

// Part 5: Urban Areas and Districts
const vocabPart5 = [
  { word: "商店街", meanings: ["Rue commercante", "Galerie marchande"], readings: ["しょうてんがい"], mnemonicFr: "RUE COMMERCANTE - quartier de boutiques.", targetKanji: ["商", "店", "街"] },
  { word: "住宅街", meanings: ["Quartier residentiel"], readings: ["じゅうたくがい"], mnemonicFr: "QUARTIER RESIDENTIEL - zone d'habitations.", targetKanji: ["住", "宅", "街"] },
  { word: "繁華街", meanings: ["Quartier anime", "Centre-ville"], readings: ["はんかがい"], mnemonicFr: "QUARTIER ANIME - zone tres frequentee.", targetKanji: ["繁", "華", "街"] },
  { word: "工業地帯", meanings: ["Zone industrielle"], readings: ["こうぎょうちたい"], mnemonicFr: "ZONE INDUSTRIELLE - region d'usines.", targetKanji: ["工", "業", "地", "帯"] },
  { word: "商業地区", meanings: ["Zone commerciale"], readings: ["しょうぎょうちく"], mnemonicFr: "ZONE COMMERCIALE - quartier d'affaires.", targetKanji: ["商", "業", "地", "区"] },
  { word: "住宅地", meanings: ["Zone residentielle"], readings: ["じゅうたくち"], mnemonicFr: "ZONE RESIDENTIELLE - terrain d'habitation.", targetKanji: ["住", "宅", "地"] },
  { word: "市街地", meanings: ["Zone urbaine", "Centre-ville"], readings: ["しがいち"], mnemonicFr: "ZONE URBAINE - partie batie de la ville.", targetKanji: ["市", "街", "地"] },
  { word: "下町", meanings: ["Quartier populaire", "Vieille ville"], readings: ["したまち"], mnemonicFr: "QUARTIER POPULAIRE - zone traditionnelle.", targetKanji: ["下", "町"] },
  { word: "新町", meanings: ["Quartier neuf"], readings: ["しんまち"], mnemonicFr: "QUARTIER NEUF - zone recemment construite.", targetKanji: ["新", "町"] },
  { word: "港町", meanings: ["Ville portuaire"], readings: ["みなとまち"], mnemonicFr: "VILLE PORTUAIRE - cite avec un port.", targetKanji: ["港", "町"] },

  // Districts and areas
  { word: "地区", meanings: ["District", "Zone"], readings: ["ちく"], mnemonicFr: "DISTRICT - subdivision administrative.", targetKanji: ["地", "区"] },
  { word: "地域", meanings: ["Region", "Zone"], readings: ["ちいき"], mnemonicFr: "REGION - etendue geographique.", targetKanji: ["地", "域"] },
  { word: "区域", meanings: ["Zone", "Secteur"], readings: ["くいき"], mnemonicFr: "ZONE - partie delimitee.", targetKanji: ["区", "域"] },
  { word: "地帯", meanings: ["Zone", "Region"], readings: ["ちたい"], mnemonicFr: "ZONE - bande de terrain.", targetKanji: ["地", "帯"] },
  { word: "一帯", meanings: ["Toute la zone", "Environs"], readings: ["いったい"], mnemonicFr: "TOUTE LA ZONE - l'ensemble d'une region.", targetKanji: ["一", "帯"] },
  { word: "周辺", meanings: ["Environs", "Alentours"], readings: ["しゅうへん"], mnemonicFr: "ENVIRONS - zone autour.", targetKanji: ["周", "辺"] },
  { word: "近辺", meanings: ["Voisinage", "Proximite"], readings: ["きんぺん"], mnemonicFr: "VOISINAGE - zone proche.", targetKanji: ["近", "辺"] },
  { word: "付近", meanings: ["Environs", "Proximite"], readings: ["ふきん"], mnemonicFr: "PROXIMITE - zone avoisinante.", targetKanji: ["付", "近"] },
  { word: "沿岸", meanings: ["Littoral", "Cote"], readings: ["えんがん"], mnemonicFr: "LITTORAL - le long de la cote.", targetKanji: ["沿", "岸"] },
  { word: "内陸", meanings: ["Interieur des terres"], readings: ["ないりく"], mnemonicFr: "INTERIEUR DES TERRES - loin de la mer.", targetKanji: ["内", "陸"] },

  // Administrative divisions
  { word: "県", meanings: ["Prefecture"], readings: ["けん"], mnemonicFr: "PREFECTURE - division administrative.", targetKanji: ["県"] },
  { word: "市", meanings: ["Ville", "Cite"], readings: ["し"], mnemonicFr: "VILLE - municipalite.", targetKanji: ["市"] },
  { word: "区", meanings: ["Arrondissement", "Quartier"], readings: ["く"], mnemonicFr: "ARRONDISSEMENT - subdivision de grande ville.", targetKanji: ["区"] },
  { word: "町", meanings: ["Ville", "Bourg"], readings: ["まち", "ちょう"], mnemonicFr: "BOURG - petite ville.", targetKanji: ["町"] },
  { word: "村", meanings: ["Village"], readings: ["むら"], mnemonicFr: "VILLAGE - petit peuplement rural.", targetKanji: ["村"] },
  { word: "都道府県", meanings: ["Prefectures du Japon"], readings: ["とどうふけん"], mnemonicFr: "PREFECTURES - les 47 regions du Japon.", targetKanji: ["都", "道", "府", "県"] },
  { word: "市町村", meanings: ["Municipalites"], readings: ["しちょうそん"], mnemonicFr: "MUNICIPALITES - villes et villages.", targetKanji: ["市", "町", "村"] },
  { word: "郡", meanings: ["District rural"], readings: ["ぐん"], mnemonicFr: "DISTRICT - subdivision rurale.", targetKanji: ["郡"] },
  { word: "番地", meanings: ["Numero d'adresse"], readings: ["ばんち"], mnemonicFr: "NUMERO D'ADRESSE - identifiant de terrain.", targetKanji: ["番", "地"] },
  { word: "住所", meanings: ["Adresse"], readings: ["じゅうしょ"], mnemonicFr: "ADRESSE - lieu de residence.", targetKanji: ["住", "所"] },
];

// Part 6: Transportation and Routes
const vocabPart6 = [
  { word: "道路", meanings: ["Route", "Voie"], readings: ["どうろ"], mnemonicFr: "ROUTE - voie de circulation.", targetKanji: ["道", "路"] },
  { word: "国道", meanings: ["Route nationale"], readings: ["こくどう"], mnemonicFr: "ROUTE NATIONALE - grande route du pays.", targetKanji: ["国", "道"] },
  { word: "県道", meanings: ["Route prefectorale"], readings: ["けんどう"], mnemonicFr: "ROUTE PREFECTORALE - route regionale.", targetKanji: ["県", "道"] },
  { word: "市道", meanings: ["Route municipale"], readings: ["しどう"], mnemonicFr: "ROUTE MUNICIPALE - voie de la ville.", targetKanji: ["市", "道"] },
  { word: "高速道路", meanings: ["Autoroute"], readings: ["こうそくどうろ"], mnemonicFr: "AUTOROUTE - voie rapide.", targetKanji: ["高", "速", "道", "路"] },
  { word: "歩道", meanings: ["Trottoir", "Chemin pietpn"], readings: ["ほどう"], mnemonicFr: "TROTTOIR - voie pour pietons.", targetKanji: ["歩", "道"] },
  { word: "車道", meanings: ["Chaussee", "Voie pour voitures"], readings: ["しゃどう"], mnemonicFr: "CHAUSSEE - voie pour vehicules.", targetKanji: ["車", "道"] },
  { word: "側道", meanings: ["Voie laterale"], readings: ["そくどう"], mnemonicFr: "VOIE LATERALE - route sur le cote.", targetKanji: ["側", "道"] },
  { word: "裏道", meanings: ["Rue secondaire", "Raccourci"], readings: ["うらみち"], mnemonicFr: "RUE SECONDAIRE - chemin de derriere.", targetKanji: ["裏", "道"] },
  { word: "近道", meanings: ["Raccourci"], readings: ["ちかみち"], mnemonicFr: "RACCOURCI - chemin plus court.", targetKanji: ["近", "道"] },

  // Train and rail
  { word: "駅", meanings: ["Gare", "Station"], readings: ["えき"], mnemonicFr: "GARE - station de train.", targetKanji: ["駅"] },
  { word: "駅前", meanings: ["Devant la gare"], readings: ["えきまえ"], mnemonicFr: "DEVANT LA GARE - zone pres de la station.", targetKanji: ["駅", "前"] },
  { word: "終点", meanings: ["Terminus"], readings: ["しゅうてん"], mnemonicFr: "TERMINUS - derniere station.", targetKanji: ["終", "点"] },
  { word: "始発", meanings: ["Premier train", "Depart"], readings: ["しはつ"], mnemonicFr: "PREMIER TRAIN - premier depart.", targetKanji: ["始", "発"] },
  { word: "終電", meanings: ["Dernier train"], readings: ["しゅうでん"], mnemonicFr: "DERNIER TRAIN - derniere rame.", targetKanji: ["終", "電"] },
  { word: "鉄道", meanings: ["Chemin de fer"], readings: ["てつどう"], mnemonicFr: "CHEMIN DE FER - transport ferroviaire.", targetKanji: ["鉄", "道"] },
  { word: "路線", meanings: ["Ligne", "Itineraire"], readings: ["ろせん"], mnemonicFr: "LIGNE - parcours de transport.", targetKanji: ["路", "線"] },
  { word: "本線", meanings: ["Ligne principale"], readings: ["ほんせん"], mnemonicFr: "LIGNE PRINCIPALE - voie principale.", targetKanji: ["本", "線"] },
  { word: "支線", meanings: ["Embranchement", "Ligne secondaire"], readings: ["しせん"], mnemonicFr: "EMBRANCHEMENT - ligne annexe.", targetKanji: ["支", "線"] },
  { word: "地下鉄", meanings: ["Metro"], readings: ["ちかてつ"], mnemonicFr: "METRO - train souterrain.", targetKanji: ["地", "下", "鉄"] },

  // Air and sea travel
  { word: "空港", meanings: ["Aeroport"], readings: ["くうこう"], mnemonicFr: "AEROPORT - port aerien.", targetKanji: ["空", "港"] },
  { word: "港", meanings: ["Port"], readings: ["みなと"], mnemonicFr: "PORT - lieu d'accostage des bateaux.", targetKanji: ["港"] },
  { word: "港湾", meanings: ["Port", "Havre"], readings: ["こうわん"], mnemonicFr: "PORT - installation portuaire.", targetKanji: ["港", "湾"] },
  { word: "湾", meanings: ["Baie", "Golfe"], readings: ["わん"], mnemonicFr: "BAIE - echancrure du littoral.", targetKanji: ["湾"] },
  { word: "東京湾", meanings: ["Baie de Tokyo"], readings: ["とうきょうわん"], mnemonicFr: "BAIE DE TOKYO - golfe de la capitale.", targetKanji: ["東", "京", "湾"] },
  { word: "入り江", meanings: ["Crique", "Anse"], readings: ["いりえ"], mnemonicFr: "CRIQUE - petite baie.", targetKanji: ["入", "江"] },
  { word: "渡し場", meanings: ["Embarcadere"], readings: ["わたしば"], mnemonicFr: "EMBARCADERE - lieu pour traverser.", targetKanji: ["渡", "場"] },
  { word: "船着き場", meanings: ["Quai", "Debarcadere"], readings: ["ふなつきば"], mnemonicFr: "QUAI - lieu d'accostage.", targetKanji: ["船", "着", "場"] },
  { word: "停留所", meanings: ["Arret de bus"], readings: ["ていりゅうじょ"], mnemonicFr: "ARRET DE BUS - station de bus.", targetKanji: ["停", "留", "所"] },
  { word: "乗り場", meanings: ["Quai d'embarquement"], readings: ["のりば"], mnemonicFr: "QUAI - endroit pour monter.", targetKanji: ["乗", "場"] },
];

// Part 7: Educational and Cultural Places
const vocabPart7 = [
  { word: "学校", meanings: ["Ecole"], readings: ["がっこう"], mnemonicFr: "ECOLE - etablissement d'enseignement.", targetKanji: ["学", "校"] },
  { word: "小学校", meanings: ["Ecole primaire"], readings: ["しょうがっこう"], mnemonicFr: "ECOLE PRIMAIRE - pour les enfants.", targetKanji: ["小", "学", "校"] },
  { word: "中学校", meanings: ["College"], readings: ["ちゅうがっこう"], mnemonicFr: "COLLEGE - ecole secondaire.", targetKanji: ["中", "学", "校"] },
  { word: "高校", meanings: ["Lycee"], readings: ["こうこう"], mnemonicFr: "LYCEE - ecole superieure.", targetKanji: ["高", "校"] },
  { word: "大学", meanings: ["Universite"], readings: ["だいがく"], mnemonicFr: "UNIVERSITE - enseignement superieur.", targetKanji: ["大", "学"] },
  { word: "専門学校", meanings: ["Ecole professionnelle"], readings: ["せんもんがっこう"], mnemonicFr: "ECOLE PROFESSIONNELLE - formation specialisee.", targetKanji: ["専", "門", "学", "校"] },
  { word: "図書館", meanings: ["Bibliotheque"], readings: ["としょかん"], mnemonicFr: "BIBLIOTHEQUE - lieu des livres.", targetKanji: ["図", "書", "館"] },
  { word: "美術館", meanings: ["Musee d'art"], readings: ["びじゅつかん"], mnemonicFr: "MUSEE D'ART - galerie artistique.", targetKanji: ["美", "術", "館"] },
  { word: "博物館", meanings: ["Musee"], readings: ["はくぶつかん"], mnemonicFr: "MUSEE - lieu d'exposition.", targetKanji: ["博", "物", "館"] },
  { word: "科学館", meanings: ["Musee des sciences"], readings: ["かがくかん"], mnemonicFr: "MUSEE DES SCIENCES - centre scientifique.", targetKanji: ["科", "学", "館"] },

  // Cultural and religious places
  { word: "神社", meanings: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonicFr: "SANCTUAIRE SHINTO - lieu de culte shinto.", targetKanji: ["神", "社"] },
  { word: "寺", meanings: ["Temple bouddhiste"], readings: ["てら"], mnemonicFr: "TEMPLE - lieu de culte bouddhiste.", targetKanji: ["寺"] },
  { word: "寺院", meanings: ["Temple", "Monastere"], readings: ["じいん"], mnemonicFr: "TEMPLE - etablissement religieux.", targetKanji: ["寺", "院"] },
  { word: "教会", meanings: ["Eglise"], readings: ["きょうかい"], mnemonicFr: "EGLISE - lieu de culte chretien.", targetKanji: ["教", "会"] },
  { word: "城", meanings: ["Chateau"], readings: ["しろ"], mnemonicFr: "CHATEAU - forteresse.", targetKanji: ["城"] },
  { word: "城跡", meanings: ["Ruines de chateau"], readings: ["しろあと"], mnemonicFr: "RUINES DE CHATEAU - vestiges.", targetKanji: ["城", "跡"] },
  { word: "史跡", meanings: ["Site historique"], readings: ["しせき"], mnemonicFr: "SITE HISTORIQUE - lieu d'histoire.", targetKanji: ["史", "跡"] },
  { word: "遺跡", meanings: ["Vestiges", "Ruines"], readings: ["いせき"], mnemonicFr: "VESTIGES - restes du passe.", targetKanji: ["遺", "跡"] },
  { word: "庭園", meanings: ["Jardin"], readings: ["ていえん"], mnemonicFr: "JARDIN - espace paysager.", targetKanji: ["庭", "園"] },
  { word: "公園", meanings: ["Parc"], readings: ["こうえん"], mnemonicFr: "PARC - espace vert public.", targetKanji: ["公", "園"] },

  // Entertainment venues
  { word: "映画館", meanings: ["Cinema"], readings: ["えいがかん"], mnemonicFr: "CINEMA - salle de projection.", targetKanji: ["映", "画", "館"] },
  { word: "劇場", meanings: ["Theatre"], readings: ["げきじょう"], mnemonicFr: "THEATRE - salle de spectacle.", targetKanji: ["劇", "場"] },
  { word: "音楽堂", meanings: ["Salle de concert"], readings: ["おんがくどう"], mnemonicFr: "SALLE DE CONCERT - lieu de musique.", targetKanji: ["音", "楽", "堂"] },
  { word: "体育館", meanings: ["Gymnase"], readings: ["たいいくかん"], mnemonicFr: "GYMNASE - salle de sport.", targetKanji: ["体", "育", "館"] },
  { word: "競技場", meanings: ["Stade", "Arena"], readings: ["きょうぎじょう"], mnemonicFr: "STADE - lieu de competition.", targetKanji: ["競", "技", "場"] },
  { word: "野球場", meanings: ["Stade de baseball"], readings: ["やきゅうじょう"], mnemonicFr: "STADE DE BASEBALL - terrain de jeu.", targetKanji: ["野", "球", "場"] },
  { word: "水泳場", meanings: ["Piscine"], readings: ["すいえいじょう"], mnemonicFr: "PISCINE - bassin de natation.", targetKanji: ["水", "泳", "場"] },
  { word: "遊園地", meanings: ["Parc d'attractions"], readings: ["ゆうえんち"], mnemonicFr: "PARC D'ATTRACTIONS - lieu de divertissement.", targetKanji: ["遊", "園", "地"] },
  { word: "動物園", meanings: ["Zoo"], readings: ["どうぶつえん"], mnemonicFr: "ZOO - jardin des animaux.", targetKanji: ["動", "物", "園"] },
  { word: "水族館", meanings: ["Aquarium"], readings: ["すいぞくかん"], mnemonicFr: "AQUARIUM - musee aquatique.", targetKanji: ["水", "族", "館"] },
];

// Part 8: Commercial and Service Places
const vocabPart8 = [
  { word: "店", meanings: ["Magasin", "Boutique"], readings: ["みせ"], mnemonicFr: "MAGASIN - lieu de commerce.", targetKanji: ["店"] },
  { word: "商店", meanings: ["Boutique", "Commerce"], readings: ["しょうてん"], mnemonicFr: "BOUTIQUE - petit commerce.", targetKanji: ["商", "店"] },
  { word: "百貨店", meanings: ["Grand magasin"], readings: ["ひゃっかてん"], mnemonicFr: "GRAND MAGASIN - magasin de cent articles.", targetKanji: ["百", "貨", "店"] },
  { word: "専門店", meanings: ["Magasin specialise"], readings: ["せんもんてん"], mnemonicFr: "MAGASIN SPECIALISE - boutique specifique.", targetKanji: ["専", "門", "店"] },
  { word: "書店", meanings: ["Librairie"], readings: ["しょてん"], mnemonicFr: "LIBRAIRIE - magasin de livres.", targetKanji: ["書", "店"] },
  { word: "本屋", meanings: ["Librairie"], readings: ["ほんや"], mnemonicFr: "LIBRAIRIE - boutique de livres.", targetKanji: ["本", "屋"] },
  { word: "薬局", meanings: ["Pharmacie"], readings: ["やっきょく"], mnemonicFr: "PHARMACIE - officine.", targetKanji: ["薬", "局"] },
  { word: "銀行", meanings: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "BANQUE - etablissement financier.", targetKanji: ["銀", "行"] },
  { word: "病院", meanings: ["Hopital"], readings: ["びょういん"], mnemonicFr: "HOPITAL - etablissement de soins.", targetKanji: ["病", "院"] },
  { word: "診療所", meanings: ["Clinique"], readings: ["しんりょうじょ"], mnemonicFr: "CLINIQUE - petit etablissement medical.", targetKanji: ["診", "療", "所"] },

  // Restaurants and food
  { word: "食堂", meanings: ["Cantine", "Restaurant"], readings: ["しょくどう"], mnemonicFr: "CANTINE - salle a manger.", targetKanji: ["食", "堂"] },
  { word: "飲食店", meanings: ["Restaurant", "Cafe"], readings: ["いんしょくてん"], mnemonicFr: "RESTAURANT - etablissement de restauration.", targetKanji: ["飲", "食", "店"] },
  { word: "喫茶店", meanings: ["Cafe", "Salon de the"], readings: ["きっさてん"], mnemonicFr: "CAFE - salon de the.", targetKanji: ["喫", "茶", "店"] },
  { word: "居酒屋", meanings: ["Izakaya", "Bar japonais"], readings: ["いざかや"], mnemonicFr: "IZAKAYA - taverne japonaise.", targetKanji: ["居", "酒", "屋"] },
  { word: "酒場", meanings: ["Bar", "Taverne"], readings: ["さかば"], mnemonicFr: "BAR - lieu pour boire.", targetKanji: ["酒", "場"] },
  { word: "市場", meanings: ["Marche"], readings: ["いちば", "しじょう"], mnemonicFr: "MARCHE - lieu de vente.", targetKanji: ["市", "場"] },
  { word: "魚市場", meanings: ["Marche aux poissons"], readings: ["うおいちば"], mnemonicFr: "MARCHE AUX POISSONS - criee.", targetKanji: ["魚", "市", "場"] },
  { word: "青果市場", meanings: ["Marche de fruits et legumes"], readings: ["せいかいちば"], mnemonicFr: "MARCHE DE FRUITS ET LEGUMES - halle.", targetKanji: ["青", "果", "市", "場"] },
  { word: "宿", meanings: ["Auberge", "Logement"], readings: ["やど"], mnemonicFr: "AUBERGE - lieu d'hebergement.", targetKanji: ["宿"] },
  { word: "旅館", meanings: ["Auberge japonaise"], readings: ["りょかん"], mnemonicFr: "RYOKAN - auberge traditionnelle.", targetKanji: ["旅", "館"] },

  // Accommodation and services
  { word: "温泉", meanings: ["Source chaude", "Onsen"], readings: ["おんせん"], mnemonicFr: "ONSEN - source d'eau chaude.", targetKanji: ["温", "泉"] },
  { word: "銭湯", meanings: ["Bain public"], readings: ["せんとう"], mnemonicFr: "BAIN PUBLIC - bains communs.", targetKanji: ["銭", "湯"] },
  { word: "工場", meanings: ["Usine", "Fabrique"], readings: ["こうじょう"], mnemonicFr: "USINE - lieu de production.", targetKanji: ["工", "場"] },
  { word: "会社", meanings: ["Entreprise", "Societe"], readings: ["かいしゃ"], mnemonicFr: "ENTREPRISE - societe commerciale.", targetKanji: ["会", "社"] },
  { word: "本社", meanings: ["Siege social"], readings: ["ほんしゃ"], mnemonicFr: "SIEGE SOCIAL - bureau principal.", targetKanji: ["本", "社"] },
  { word: "支社", meanings: ["Succursale", "Filiale"], readings: ["ししゃ"], mnemonicFr: "SUCCURSALE - bureau secondaire.", targetKanji: ["支", "社"] },
  { word: "営業所", meanings: ["Bureau commercial"], readings: ["えいぎょうしょ"], mnemonicFr: "BUREAU COMMERCIAL - point de vente.", targetKanji: ["営", "業", "所"] },
  { word: "研究所", meanings: ["Institut de recherche"], readings: ["けんきゅうじょ"], mnemonicFr: "INSTITUT DE RECHERCHE - laboratoire.", targetKanji: ["研", "究", "所"] },
  { word: "保育所", meanings: ["Creche", "Garderie"], readings: ["ほいくじょ"], mnemonicFr: "CRECHE - garde d'enfants.", targetKanji: ["保", "育", "所"] },
  { word: "養老院", meanings: ["Maison de retraite"], readings: ["ようろういん"], mnemonicFr: "MAISON DE RETRAITE - residence pour personnes agees.", targetKanji: ["養", "老", "院"] },
];

// Part 9: Specific Locations and Features
const vocabPart9 = [
  { word: "入口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - ouverture pour entrer.", targetKanji: ["入", "口"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - ouverture pour sortir.", targetKanji: ["出", "口"] },
  { word: "非常口", meanings: ["Sortie de secours"], readings: ["ひじょうぐち"], mnemonicFr: "SORTIE DE SECOURS - issue d'urgence.", targetKanji: ["非", "常", "口"] },
  { word: "正門", meanings: ["Entree principale", "Portail"], readings: ["せいもん"], mnemonicFr: "ENTREE PRINCIPALE - porte officielle.", targetKanji: ["正", "門"] },
  { word: "裏門", meanings: ["Entree de service", "Porte arriere"], readings: ["うらもん"], mnemonicFr: "PORTE ARRIERE - entree secondaire.", targetKanji: ["裏", "門"] },
  { word: "窓口", meanings: ["Guichet"], readings: ["まどぐち"], mnemonicFr: "GUICHET - fenetre de service.", targetKanji: ["窓", "口"] },
  { word: "受付", meanings: ["Reception", "Accueil"], readings: ["うけつけ"], mnemonicFr: "RECEPTION - accueil.", targetKanji: ["受", "付"] },
  { word: "案内所", meanings: ["Bureau d'information"], readings: ["あんないじょ"], mnemonicFr: "BUREAU D'INFORMATION - point d'accueil.", targetKanji: ["案", "内", "所"] },
  { word: "待合室", meanings: ["Salle d'attente"], readings: ["まちあいしつ"], mnemonicFr: "SALLE D'ATTENTE - lieu pour patienter.", targetKanji: ["待", "合", "室"] },
  { word: "休憩所", meanings: ["Aire de repos"], readings: ["きゅうけいじょ"], mnemonicFr: "AIRE DE REPOS - lieu de pause.", targetKanji: ["休", "憩", "所"] },

  // Facilities
  { word: "駐車場", meanings: ["Parking"], readings: ["ちゅうしゃじょう"], mnemonicFr: "PARKING - lieu de stationnement.", targetKanji: ["駐", "車", "場"] },
  { word: "駐輪場", meanings: ["Parking a velos"], readings: ["ちゅうりんじょう"], mnemonicFr: "PARKING A VELOS - stationnement velos.", targetKanji: ["駐", "輪", "場"] },
  { word: "給油所", meanings: ["Station-service"], readings: ["きゅうゆじょ"], mnemonicFr: "STATION-SERVICE - point de carburant.", targetKanji: ["給", "油", "所"] },
  { word: "洗車場", meanings: ["Station de lavage"], readings: ["せんしゃじょう"], mnemonicFr: "STATION DE LAVAGE - lavage auto.", targetKanji: ["洗", "車", "場"] },
  { word: "公衆電話", meanings: ["Telephone public"], readings: ["こうしゅうでんわ"], mnemonicFr: "TELEPHONE PUBLIC - cabine telephonique.", targetKanji: ["公", "衆", "電", "話"] },
  { word: "自動販売機", meanings: ["Distributeur automatique"], readings: ["じどうはんばいき"], mnemonicFr: "DISTRIBUTEUR - machine de vente.", targetKanji: ["自", "動", "販", "売", "機"] },
  { word: "手洗い", meanings: ["Toilettes", "Lavabo"], readings: ["てあらい"], mnemonicFr: "TOILETTES - lieu pour se laver les mains.", targetKanji: ["手", "洗"] },
  { word: "便所", meanings: ["Toilettes", "WC"], readings: ["べんじょ"], mnemonicFr: "TOILETTES - cabinet d'aisance.", targetKanji: ["便", "所"] },
  { word: "更衣室", meanings: ["Vestiaire"], readings: ["こういしつ"], mnemonicFr: "VESTIAIRE - salle pour se changer.", targetKanji: ["更", "衣", "室"] },
  { word: "喫煙所", meanings: ["Espace fumeur"], readings: ["きつえんじょ"], mnemonicFr: "ESPACE FUMEUR - lieu autorise a fumer.", targetKanji: ["喫", "煙", "所"] },

  // Natural features
  { word: "砂浜", meanings: ["Plage de sable"], readings: ["すなはま"], mnemonicFr: "PLAGE DE SABLE - rivage sablonneux.", targetKanji: ["砂", "浜"] },
  { word: "浜辺", meanings: ["Plage", "Rivage"], readings: ["はまべ"], mnemonicFr: "PLAGE - bord de mer.", targetKanji: ["浜", "辺"] },
  { word: "岩場", meanings: ["Zone rocheuse"], readings: ["いわば"], mnemonicFr: "ZONE ROCHEUSE - terrain de rochers.", targetKanji: ["岩", "場"] },
  { word: "湿地", meanings: ["Zone humide", "Marecage"], readings: ["しっち"], mnemonicFr: "ZONE HUMIDE - terrain marecageux.", targetKanji: ["湿", "地"] },
  { word: "干潟", meanings: ["Estran", "Zone intertidale"], readings: ["ひがた"], mnemonicFr: "ESTRAN - zone decouverte a maree basse.", targetKanji: ["干", "潟"] },
  { word: "温泉地", meanings: ["Station thermale"], readings: ["おんせんち"], mnemonicFr: "STATION THERMALE - lieu de sources chaudes.", targetKanji: ["温", "泉", "地"] },
  { word: "景勝地", meanings: ["Site pittoresque"], readings: ["けいしょうち"], mnemonicFr: "SITE PITTORESQUE - lieu de beaute.", targetKanji: ["景", "勝", "地"] },
  { word: "名所", meanings: ["Lieu celebre", "Site touristique"], readings: ["めいしょ"], mnemonicFr: "LIEU CELEBRE - endroit connu.", targetKanji: ["名", "所"] },
  { word: "旧跡", meanings: ["Site historique"], readings: ["きゅうせき"], mnemonicFr: "SITE HISTORIQUE - vestiges anciens.", targetKanji: ["旧", "跡"] },
  { word: "観光地", meanings: ["Site touristique"], readings: ["かんこうち"], mnemonicFr: "SITE TOURISTIQUE - destination de voyage.", targetKanji: ["観", "光", "地"] },
];

// Part 10: Additional Geography Terms
const vocabPart10 = [
  { word: "国境", meanings: ["Frontiere"], readings: ["こっきょう"], mnemonicFr: "FRONTIERE - limite entre pays.", targetKanji: ["国", "境"] },
  { word: "境界", meanings: ["Limite", "Frontiere"], readings: ["きょうかい"], mnemonicFr: "LIMITE - ligne de separation.", targetKanji: ["境", "界"] },
  { word: "領土", meanings: ["Territoire"], readings: ["りょうど"], mnemonicFr: "TERRITOIRE - terre d'un pays.", targetKanji: ["領", "土"] },
  { word: "領海", meanings: ["Eaux territoriales"], readings: ["りょうかい"], mnemonicFr: "EAUX TERRITORIALES - mer nationale.", targetKanji: ["領", "海"] },
  { word: "領空", meanings: ["Espace aerien"], readings: ["りょうくう"], mnemonicFr: "ESPACE AERIEN - ciel national.", targetKanji: ["領", "空"] },
  { word: "南極", meanings: ["Antarctique", "Pole Sud"], readings: ["なんきょく"], mnemonicFr: "ANTARCTIQUE - pole sud de la Terre.", targetKanji: ["南", "極"] },
  { word: "北極", meanings: ["Arctique", "Pole Nord"], readings: ["ほっきょく"], mnemonicFr: "ARCTIQUE - pole nord de la Terre.", targetKanji: ["北", "極"] },
  { word: "赤道", meanings: ["Equateur"], readings: ["せきどう"], mnemonicFr: "EQUATEUR - ligne centrale de la Terre.", targetKanji: ["赤", "道"] },
  { word: "熱帯", meanings: ["Zone tropicale", "Tropiques"], readings: ["ねったい"], mnemonicFr: "TROPIQUES - region chaude.", targetKanji: ["熱", "帯"] },
  { word: "温帯", meanings: ["Zone temperee"], readings: ["おんたい"], mnemonicFr: "ZONE TEMPEREE - climat modere.", targetKanji: ["温", "帯"] },

  // Climate regions
  { word: "寒帯", meanings: ["Zone polaire", "Zone froide"], readings: ["かんたい"], mnemonicFr: "ZONE POLAIRE - region froide.", targetKanji: ["寒", "帯"] },
  { word: "乾燥地帯", meanings: ["Zone aride"], readings: ["かんそうちたい"], mnemonicFr: "ZONE ARIDE - region seche.", targetKanji: ["乾", "燥", "地", "帯"] },
  { word: "雨林", meanings: ["Foret tropicale"], readings: ["うりん"], mnemonicFr: "FORET TROPICALE - jungle.", targetKanji: ["雨", "林"] },
  { word: "針葉樹林", meanings: ["Foret de coniferes"], readings: ["しんようじゅりん"], mnemonicFr: "FORET DE CONIFERES - bois de resineux.", targetKanji: ["針", "葉", "樹", "林"] },
  { word: "広葉樹林", meanings: ["Foret de feuillus"], readings: ["こうようじゅりん"], mnemonicFr: "FORET DE FEUILLUS - bois de decidus.", targetKanji: ["広", "葉", "樹", "林"] },
  { word: "原野", meanings: ["Terre sauvage", "Lande"], readings: ["げんや"], mnemonicFr: "TERRE SAUVAGE - terrain non cultive.", targetKanji: ["原", "野"] },
  { word: "荒野", meanings: ["Desert", "Terre inculte"], readings: ["こうや"], mnemonicFr: "DESERT - terre desolee.", targetKanji: ["荒", "野"] },
  { word: "平野", meanings: ["Plaine"], readings: ["へいや"], mnemonicFr: "PLAINE - terrain plat etendu.", targetKanji: ["平", "野"] },
  { word: "盆地", meanings: ["Bassin", "Cuvette"], readings: ["ぼんち"], mnemonicFr: "BASSIN - depression entouree de hauteurs.", targetKanji: ["盆", "地"] },
  { word: "高原", meanings: ["Plateau", "Hautes terres"], readings: ["こうげん"], mnemonicFr: "PLATEAU - terrain eleve et plat.", targetKanji: ["高", "原"] },

  // More geographic features
  { word: "河岸", meanings: ["Rive", "Berge"], readings: ["かわぎし"], mnemonicFr: "RIVE - bord de la riviere.", targetKanji: ["河", "岸"] },
  { word: "川岸", meanings: ["Berge", "Rive"], readings: ["かわぎし"], mnemonicFr: "BERGE - cote du cours d'eau.", targetKanji: ["川", "岸"] },
  { word: "湖岸", meanings: ["Rive du lac"], readings: ["こがん"], mnemonicFr: "RIVE DU LAC - bord du lac.", targetKanji: ["湖", "岸"] },
  { word: "海底", meanings: ["Fond marin"], readings: ["かいてい"], mnemonicFr: "FOND MARIN - plancher oceanique.", targetKanji: ["海", "底"] },
  { word: "海面", meanings: ["Surface de la mer"], readings: ["かいめん"], mnemonicFr: "SURFACE DE LA MER - niveau de l'eau.", targetKanji: ["海", "面"] },
  { word: "水面", meanings: ["Surface de l'eau"], readings: ["すいめん"], mnemonicFr: "SURFACE DE L'EAU - niveau de l'eau.", targetKanji: ["水", "面"] },
  { word: "地表", meanings: ["Surface de la terre"], readings: ["ちひょう"], mnemonicFr: "SURFACE DE LA TERRE - sol.", targetKanji: ["地", "表"] },
  { word: "地中", meanings: ["Sous terre", "Souterrain"], readings: ["ちちゅう"], mnemonicFr: "SOUS TERRE - dans le sol.", targetKanji: ["地", "中"] },
  { word: "地底", meanings: ["Profondeurs de la terre"], readings: ["ちてい"], mnemonicFr: "PROFONDEURS - fond de la terre.", targetKanji: ["地", "底"] },
  { word: "地形", meanings: ["Terrain", "Topographie"], readings: ["ちけい"], mnemonicFr: "TOPOGRAPHIE - forme du terrain.", targetKanji: ["地", "形"] },
];

async function main() {
  console.log("=== SEEDING VOCABULARY BATCH 10: Geography, Countries, Places ===\n");

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
    ...vocabPart1,
    ...vocabPart2,
    ...vocabPart3,
    ...vocabPart4,
    ...vocabPart5,
    ...vocabPart6,
    ...vocabPart7,
    ...vocabPart8,
    ...vocabPart9,
    ...vocabPart10,
  ];

  console.log(`Total vocabulary entries to process: ${allVocab.length}`);

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
  console.log(`\n=== SUMMARY ===`);
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
