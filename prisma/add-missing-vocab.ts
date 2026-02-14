import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary for all kanji that currently have no vocabulary
// Each entry has: word, meanings, readings, mnemonicFr (story-based), targetKanji
const missingVocab = [
  // === LEVEL 10 ===

  // 垂 (Pendre) - Level 10
  { word: "垂れる", meanings: ["Pendre", "Tomber"], readings: ["たれる"], mnemonicFr: "Les gouttes de pluie PENDENT du toit, prêtes à tomber une à une comme des larmes du ciel.", targetKanji: ["垂"] },
  { word: "垂直", meanings: ["Vertical"], readings: ["すいちょく"], mnemonicFr: "La tour Eiffel se dresse VERTICALEMENT, parfaitement perpendiculaire au sol parisien.", targetKanji: ["垂", "直"] },

  // 吐 (Vomir) - Level 10
  { word: "吐く", meanings: ["Vomir", "Cracher"], readings: ["はく"], mnemonicFr: "Après avoir trop mangé de sushi, il doit VOMIR dans les toilettes du restaurant.", targetKanji: ["吐"] },
  { word: "吐息", meanings: ["Soupir"], readings: ["といき"], mnemonicFr: "Elle pousse un long SOUPIR de soulagement, l'air s'échappant doucement de ses lèvres.", targetKanji: ["吐", "息"] },

  // 仙 (Ermite) - Level 10
  { word: "仙人", meanings: ["Ermite", "Sage immortel"], readings: ["せんにん"], mnemonicFr: "L'ERMITE vit seul dans la montagne depuis des siècles, méditant pour atteindre l'immortalité.", targetKanji: ["仙", "人"] },
  { word: "仙台", meanings: ["Sendai"], readings: ["せんだい"], mnemonicFr: "SENDAI, la ville des ermites, est célèbre pour sa beauté naturelle au nord du Japon.", targetKanji: ["仙", "台"] },

  // 斎 (Purification) - Level 10
  { word: "書斎", meanings: ["Bureau", "Cabinet de travail"], readings: ["しょさい"], mnemonicFr: "Le CABINET de travail est un lieu PURIFIÉ où l'écrivain trouve l'inspiration.", targetKanji: ["書", "斎"] },
  { word: "斎場", meanings: ["Salle funéraire"], readings: ["さいじょう"], mnemonicFr: "La SALLE FUNÉRAIRE est un lieu de PURIFICATION pour accompagner les défunts.", targetKanji: ["斎", "場"] },

  // 軸 (Axe) - Level 10
  { word: "軸", meanings: ["Axe", "Pivot"], readings: ["じく"], mnemonicFr: "La Terre tourne sur son AXE, comme une toupie géante dans l'espace.", targetKanji: ["軸"] },
  { word: "中軸", meanings: ["Axe central"], readings: ["ちゅうじく"], mnemonicFr: "L'AXE CENTRAL de la roue permet à tout le mécanisme de tourner harmonieusement.", targetKanji: ["中", "軸"] },

  // === LEVEL 11 ===

  // 笠 (Chapeau de paille) - Level 11
  { word: "笠", meanings: ["Chapeau de paille"], readings: ["かさ"], mnemonicFr: "Le fermier porte son CHAPEAU DE PAILLE pour se protéger du soleil brûlant dans les rizières.", targetKanji: ["笠"] },
  { word: "笠間", meanings: ["Kasama"], readings: ["かさま"], mnemonicFr: "KASAMA, la ville des chapeaux de paille, est célèbre pour sa poterie traditionnelle.", targetKanji: ["笠", "間"] },

  // 孔 (Trou) - Level 11
  { word: "孔子", meanings: ["Confucius"], readings: ["こうし"], mnemonicFr: "CONFUCIUS, le grand sage, a creusé un TROU profond dans la pensée philosophique asiatique.", targetKanji: ["孔", "子"] },
  { word: "気孔", meanings: ["Stomate", "Pore"], readings: ["きこう"], mnemonicFr: "Les PORES de la peau sont de minuscules TROUS qui permettent à la sueur de s'échapper.", targetKanji: ["気", "孔"] },

  // 佐 (Aide) - Level 11
  { word: "補佐", meanings: ["Assistant", "Adjoint"], readings: ["ほさ"], mnemonicFr: "L'ASSISTANT du directeur est toujours là pour l'AIDER dans ses tâches quotidiennes.", targetKanji: ["補", "佐"] },
  { word: "佐藤", meanings: ["Sato"], readings: ["さとう"], mnemonicFr: "SATO est le nom de famille le plus répandu au Japon, symbolisant l'entraide communautaire.", targetKanji: ["佐", "藤"] },

  // 桑 (Mûrier) - Level 11
  { word: "桑", meanings: ["Mûrier"], readings: ["くわ"], mnemonicFr: "Le MÛRIER produit des feuilles dont les vers à soie raffolent pour tisser leurs cocons précieux.", targetKanji: ["桑"] },
  { word: "桑畑", meanings: ["Champ de mûriers"], readings: ["くわばたけ"], mnemonicFr: "Le CHAMP DE MÛRIERS s'étend à perte de vue, nourrissant des milliers de vers à soie.", targetKanji: ["桑", "畑"] },

  // 厘 (Rin - unité) - Level 11
  { word: "一厘", meanings: ["Un rin"], readings: ["いちりん"], mnemonicFr: "UN RIN était la plus petite unité monétaire, valant un millième de yen.", targetKanji: ["一", "厘"] },

  // 玲 (Clair - son) - Level 11
  { word: "玲瓏", meanings: ["Clair et pur", "Cristallin"], readings: ["れいろう"], mnemonicFr: "Le son CRISTALLIN de la cloche résonne CLAIREMENT dans le temple au lever du soleil.", targetKanji: ["玲", "瓏"] },

  // === LEVEL 27-28 ===

  // 伊 (Italie) - Level 27
  { word: "伊太利", meanings: ["Italie"], readings: ["イタリア"], mnemonicFr: "L'ITALIE, pays de la pizza et des pâtes, est le berceau de la Renaissance artistique.", targetKanji: ["伊", "太", "利"] },

  // 亭 (Pavillon) - Level 28
  { word: "亭主", meanings: ["Maître de maison", "Mari"], readings: ["ていしゅ"], mnemonicFr: "Le MAÎTRE DE MAISON accueille ses invités dans son PAVILLON de thé avec élégance.", targetKanji: ["亭", "主"] },
  { word: "料亭", meanings: ["Restaurant japonais chic"], readings: ["りょうてい"], mnemonicFr: "Le RESTAURANT CHIC ressemble à un PAVILLON traditionnel où l'on sert une cuisine raffinée.", targetKanji: ["料", "亭"] },

  // 炸 (Éclater) - Level 28
  { word: "炸裂", meanings: ["Explosion"], readings: ["さくれつ"], mnemonicFr: "La bombe EXPLOSE avec violence, ÉCLATANT en mille morceaux de feu et de fumée.", targetKanji: ["炸", "裂"] },

  // 焔 (Flamme) - Level 28
  { word: "火焔", meanings: ["Flammes"], readings: ["かえん"], mnemonicFr: "Les FLAMMES dansent sauvagement, dévorant tout sur leur passage comme un dragon affamé.", targetKanji: ["火", "焔"] },

  // 庶 (Commun) - Level 28
  { word: "庶民", meanings: ["Peuple", "Gens ordinaires"], readings: ["しょみん"], mnemonicFr: "Le PEUPLE, les GENS ORDINAIRES, forme la base de toute société civilisée.", targetKanji: ["庶", "民"] },
  { word: "庶務", meanings: ["Affaires générales"], readings: ["しょむ"], mnemonicFr: "Les AFFAIRES GÉNÉRALES concernent les tâches COMMUNES du bureau.", targetKanji: ["庶", "務"] },

  // 甚 (Très) - Level 28
  { word: "甚大", meanings: ["Énorme", "Considérable"], readings: ["じんだい"], mnemonicFr: "Les dégâts sont ÉNORMES, TRÈS importants après le passage du typhon dévastateur.", targetKanji: ["甚", "大"] },
  { word: "甚だ", meanings: ["Extrêmement"], readings: ["はなはだ"], mnemonicFr: "Il est EXTRÊMEMENT satisfait, TRÈS content du résultat de ses efforts.", targetKanji: ["甚"] },

  // 痕 (Trace) - Level 28
  { word: "痕跡", meanings: ["Trace", "Vestige"], readings: ["こんせき"], mnemonicFr: "Les TRACES de pas dans la neige révèlent le passage d'un visiteur mystérieux.", targetKanji: ["痕", "跡"] },
  { word: "傷痕", meanings: ["Cicatrice"], readings: ["しょうこん"], mnemonicFr: "La CICATRICE sur son visage est la TRACE d'une ancienne blessure de guerre.", targetKanji: ["傷", "痕"] },

  // === LEVEL 29 ===

  // 璃 (Verre) - Level 29
  { word: "瑠璃", meanings: ["Lapis-lazuli"], readings: ["るり"], mnemonicFr: "Le LAPIS-LAZULI brille comme du VERRE bleu, une pierre précieuse venue d'Orient.", targetKanji: ["瑠", "璃"] },
  { word: "玻璃", meanings: ["Verre", "Cristal"], readings: ["はり"], mnemonicFr: "Le CRISTAL transparent comme du VERRE laisse passer la lumière du soleil.", targetKanji: ["玻", "璃"] },

  // 刹 (Temple) - Level 29
  { word: "刹那", meanings: ["Instant"], readings: ["せつな"], mnemonicFr: "En un INSTANT, le temps du TEMPLE semble s'arrêter dans une méditation profonde.", targetKanji: ["刹", "那"] },
  { word: "古刹", meanings: ["Vieux temple"], readings: ["こさつ"], mnemonicFr: "Le VIEUX TEMPLE se dresse depuis des siècles, témoin silencieux de l'histoire.", targetKanji: ["古", "刹"] },

  // 毀 (Détruire) - Level 29
  { word: "毀損", meanings: ["Dommage", "Détérioration"], readings: ["きそん"], mnemonicFr: "Le DOMMAGE causé au monument ancien est irréparable, DÉTRUIT à jamais.", targetKanji: ["毀", "損"] },
  { word: "毀滅", meanings: ["Destruction"], readings: ["きめつ"], mnemonicFr: "La DESTRUCTION totale de la ville l'a réduite en cendres et en ruines.", targetKanji: ["毀", "滅"] },

  // 尉 (Lieutenant) - Level 29
  { word: "大尉", meanings: ["Capitaine"], readings: ["たいい"], mnemonicFr: "Le CAPITAINE commande ses troupes avec autorité, grade supérieur au LIEUTENANT.", targetKanji: ["大", "尉"] },
  { word: "少尉", meanings: ["Sous-lieutenant"], readings: ["しょうい"], mnemonicFr: "Le SOUS-LIEUTENANT est le plus jeune officier, apprenant son métier de soldat.", targetKanji: ["少", "尉"] },

  // === LEVEL 30 ===

  // 傲 (Arrogant) - Level 30
  { word: "傲慢", meanings: ["Arrogance", "Orgueil"], readings: ["ごうまん"], mnemonicFr: "Son ARROGANCE est insupportable, il se croit supérieur à tous les autres.", targetKanji: ["傲", "慢"] },
  { word: "傲岸", meanings: ["Hautain"], readings: ["ごうがん"], mnemonicFr: "Son attitude HAUTAINE et ARROGANTE lui a fait perdre tous ses amis.", targetKanji: ["傲", "岸"] },

  // 叡 (Sagesse) - Level 30
  { word: "叡智", meanings: ["Sagesse profonde"], readings: ["えいち"], mnemonicFr: "La SAGESSE PROFONDE du philosophe éclaire les esprits de ses disciples.", targetKanji: ["叡", "智"] },

  // 虞 (Crainte) - Level 30
  { word: "虞", meanings: ["Crainte", "Appréhension"], readings: ["おそれ"], mnemonicFr: "La CRAINTE l'envahit à l'idée de perdre tout ce qu'il a construit.", targetKanji: ["虞"] },

  // 諧 (Harmonie) - Level 30
  { word: "諧謔", meanings: ["Humour", "Plaisanterie"], readings: ["かいぎゃく"], mnemonicFr: "L'HUMOUR crée une HARMONIE joyeuse entre les personnes qui rient ensemble.", targetKanji: ["諧", "謔"] },

  // 帥 (Commandant) - Level 30
  { word: "元帥", meanings: ["Maréchal"], readings: ["げんすい"], mnemonicFr: "Le MARÉCHAL est le plus haut grade militaire, COMMANDANT suprême des armées.", targetKanji: ["元", "帥"] },
  { word: "統帥", meanings: ["Commandement suprême"], readings: ["とうすい"], mnemonicFr: "Le COMMANDEMENT SUPRÊME des forces armées revient au chef de l'État.", targetKanji: ["統", "帥"] },

  // === LEVEL 31 ===

  // 且 (De plus) - Level 31
  { word: "且つ", meanings: ["De plus", "Et aussi"], readings: ["かつ"], mnemonicFr: "Il est intelligent, ET DE PLUS travailleur, ce qui explique son succès.", targetKanji: ["且"] },
  { word: "尚且つ", meanings: ["De plus", "En outre"], readings: ["なおかつ"], mnemonicFr: "Il a réussi l'examen, EN OUTRE avec les félicitations du jury.", targetKanji: ["尚", "且"] },

  // 褐 (Brun) - Level 31
  { word: "褐色", meanings: ["Brun", "Marron"], readings: ["かっしょく"], mnemonicFr: "La couleur BRUNE des feuilles d'automne tapisse le sol de la forêt.", targetKanji: ["褐", "色"] },

  // 螺 (Spirale) - Level 31
  { word: "螺旋", meanings: ["Spirale", "Hélice"], readings: ["らせん"], mnemonicFr: "L'escalier en SPIRALE monte vers le ciel comme une hélice géante.", targetKanji: ["螺", "旋"] },
  { word: "法螺", meanings: ["Mensonge", "Vantardise"], readings: ["ほら"], mnemonicFr: "Ses VANTARDISES sont comme une coquille en SPIRALE: vide à l'intérieur.", targetKanji: ["法", "螺"] },

  // === LEVEL 32 ===

  // 鷹 (Faucon) - Level 32
  { word: "鷹", meanings: ["Faucon"], readings: ["たか"], mnemonicFr: "Le FAUCON plane majestueusement au-dessus de la vallée, scrutant sa proie.", targetKanji: ["鷹"] },
  { word: "鷹狩り", meanings: ["Fauconnerie"], readings: ["たかがり"], mnemonicFr: "La FAUCONNERIE est un art ancien où le chasseur utilise un FAUCON dressé.", targetKanji: ["鷹", "狩"] },

  // 鴨 (Canard) - Level 32
  { word: "鴨", meanings: ["Canard sauvage"], readings: ["かも"], mnemonicFr: "Le CANARD SAUVAGE nage tranquillement sur l'étang au coucher du soleil.", targetKanji: ["鴨"] },
  { word: "鴨肉", meanings: ["Viande de canard"], readings: ["かもにく"], mnemonicFr: "La VIANDE DE CANARD est un plat délicat apprécié dans la cuisine française.", targetKanji: ["鴨", "肉"] },

  // 鋸 (Scie) - Level 32
  { word: "鋸", meanings: ["Scie"], readings: ["のこぎり"], mnemonicFr: "La SCIE coupe le bois avec des dents acérées, créant de la sciure.", targetKanji: ["鋸"] },

  // 珊 (Corail) - Level 32
  { word: "珊瑚", meanings: ["Corail"], readings: ["さんご"], mnemonicFr: "Le CORAIL forme des récifs magnifiques où vivent des milliers de poissons colorés.", targetKanji: ["珊", "瑚"] },

  // 烹 (Bouillir) - Level 32
  { word: "烹炊", meanings: ["Cuisine"], readings: ["ほうすい"], mnemonicFr: "La CUISINE implique de FAIRE BOUILLIR et cuire les aliments avec soin.", targetKanji: ["烹", "炊"] },

  // 遭 (Rencontrer) - Level 32
  { word: "遭遇", meanings: ["Rencontre inattendue"], readings: ["そうぐう"], mnemonicFr: "La RENCONTRE INATTENDUE avec son vieil ami l'a ému aux larmes.", targetKanji: ["遭", "遇"] },
  { word: "遭難", meanings: ["Accident", "Naufrage"], readings: ["そうなん"], mnemonicFr: "Le NAUFRAGE du bateau a été une RENCONTRE tragique avec le destin.", targetKanji: ["遭", "難"] },

  // 邁 (Avancer) - Level 32
  { word: "邁進", meanings: ["Avancer résolument"], readings: ["まいしん"], mnemonicFr: "Il AVANCE RÉSOLUMENT vers son objectif, sans jamais regarder en arrière.", targetKanji: ["邁", "進"] },

  // === LEVEL 33 ===

  // 膀 (Vessie) - Level 33
  { word: "膀胱", meanings: ["Vessie"], readings: ["ぼうこう"], mnemonicFr: "La VESSIE est l'organe qui stocke l'urine avant son élimination.", targetKanji: ["膀", "胱"] },

  // 苗 (Plant) - Level 33
  { word: "苗", meanings: ["Plant", "Semis"], readings: ["なえ"], mnemonicFr: "Les PLANTS de riz sont repiqués dans les rizières inondées au printemps.", targetKanji: ["苗"] },
  { word: "苗木", meanings: ["Jeune arbre"], readings: ["なえぎ"], mnemonicFr: "Le JEUNE ARBRE grandira pour devenir un chêne majestueux un jour.", targetKanji: ["苗", "木"] },

  // 釘 (Clou) - Level 33
  { word: "釘", meanings: ["Clou"], readings: ["くぎ"], mnemonicFr: "Le menuisier enfonce le CLOU dans le bois d'un coup de marteau précis.", targetKanji: ["釘"] },
  { word: "釘付け", meanings: ["Cloué", "Fasciné"], readings: ["くぎづけ"], mnemonicFr: "Il reste CLOUÉ sur place, FASCINÉ par le spectacle extraordinaire.", targetKanji: ["釘", "付"] },

  // 鋏 (Ciseaux) - Level 33
  { word: "鋏", meanings: ["Ciseaux"], readings: ["はさみ"], mnemonicFr: "Les CISEAUX coupent le papier avec précision pour l'origami.", targetKanji: ["鋏"] },

  // 斧 (Hache) - Level 33
  { word: "斧", meanings: ["Hache"], readings: ["おの"], mnemonicFr: "Le bûcheron lève sa HACHE pour fendre le tronc d'arbre en deux.", targetKanji: ["斧"] },

  // 鑿 (Ciseau à bois) - Level 33
  { word: "鑿", meanings: ["Ciseau à bois"], readings: ["のみ"], mnemonicFr: "Le sculpteur utilise son CISEAU À BOIS pour créer une statue délicate.", targetKanji: ["鑿"] },

  // 慄 (Frissonner) - Level 33
  { word: "戦慄", meanings: ["Frisson", "Terreur"], readings: ["せんりつ"], mnemonicFr: "Un FRISSON de TERREUR le parcourt en voyant le fantôme apparaître.", targetKanji: ["戦", "慄"] },
  { word: "慄く", meanings: ["Trembler"], readings: ["おののく"], mnemonicFr: "Il TREMBLE de peur, FRISSONNANT dans l'obscurité glaciale.", targetKanji: ["慄"] },

  // 崇 (Vénérer) - Level 33
  { word: "崇拝", meanings: ["Vénération", "Culte"], readings: ["すうはい"], mnemonicFr: "La VÉNÉRATION des ancêtres est une tradition profonde au Japon.", targetKanji: ["崇", "拝"] },
  { word: "崇高", meanings: ["Sublime", "Noble"], readings: ["すうこう"], mnemonicFr: "Son sacrifice SUBLIME mérite d'être VÉNÉRÉ pour les générations futures.", targetKanji: ["崇", "高"] },

  // 跪 (S'agenouiller) - Level 33
  { word: "跪く", meanings: ["S'agenouiller"], readings: ["ひざまずく"], mnemonicFr: "Il S'AGENOUILLE devant l'empereur en signe de respect absolu.", targetKanji: ["跪"] },

  // 跨 (Enjamber) - Level 33
  { word: "跨ぐ", meanings: ["Enjamber"], readings: ["またぐ"], mnemonicFr: "Il ENJAMBE la flaque d'eau pour ne pas mouiller ses chaussures.", targetKanji: ["跨"] },

  // 鋳 (Couler/fondre) - Level 33
  { word: "鋳造", meanings: ["Fonderie", "Moulage"], readings: ["ちゅうぞう"], mnemonicFr: "La FONDERIE coule le métal liquide dans les moules pour créer des pièces.", targetKanji: ["鋳", "造"] },
  { word: "鋳型", meanings: ["Moule"], readings: ["いがた"], mnemonicFr: "Le MOULE reçoit le métal fondu pour COULER la forme désirée.", targetKanji: ["鋳", "型"] },

  // 塚 (Tumulus) - Level 33
  { word: "塚", meanings: ["Tumulus", "Tertre"], readings: ["つか"], mnemonicFr: "Le TUMULUS ancien cache les secrets d'un empereur oublié.", targetKanji: ["塚"] },
  { word: "貝塚", meanings: ["Amas coquillier"], readings: ["かいづか"], mnemonicFr: "L'AMAS COQUILLIER est un TUMULUS de coquillages laissé par les anciens.", targetKanji: ["貝", "塚"] },

  // 昂 (Élever) - Level 33
  { word: "昂揚", meanings: ["Exaltation"], readings: ["こうよう"], mnemonicFr: "L'EXALTATION de la victoire ÉLÈVE les esprits de toute l'équipe.", targetKanji: ["昂", "揚"] },
  { word: "昂奮", meanings: ["Excitation"], readings: ["こうふん"], mnemonicFr: "L'EXCITATION l'envahit, son cœur s'ÉLÈVE de joie intense.", targetKanji: ["昂", "奮"] },

  // 允 (Permettre) - Level 33
  { word: "允許", meanings: ["Permission"], readings: ["いんきょ"], mnemonicFr: "La PERMISSION est accordée, on vous PERMET d'entrer dans le sanctuaire.", targetKanji: ["允", "許"] },

  // 是 (Correct) - Level 33
  { word: "是非", meanings: ["Bien et mal", "À tout prix"], readings: ["ぜひ"], mnemonicFr: "À TOUT PRIX, distinguons le BIEN du mal, le CORRECT de l'erroné.", targetKanji: ["是", "非"] },
  { word: "是正", meanings: ["Correction", "Rectification"], readings: ["ぜせい"], mnemonicFr: "La CORRECTION des erreurs remet les choses dans l'ordre CORRECT.", targetKanji: ["是", "正"] },

  // 蔽 (Couvrir) - Level 33
  { word: "隠蔽", meanings: ["Dissimulation"], readings: ["いんぺい"], mnemonicFr: "La DISSIMULATION des preuves COUVRE les traces du crime commis.", targetKanji: ["隠", "蔽"] },

  // 騙 (Duper) - Level 33
  { word: "騙す", meanings: ["Tromper", "Duper"], readings: ["だます"], mnemonicFr: "L'escroc TROMPE ses victimes avec des promesses mensongères.", targetKanji: ["騙"] },
  { word: "詐騙", meanings: ["Fraude"], readings: ["さへん"], mnemonicFr: "La FRAUDE consiste à DUPER les gens pour leur voler leur argent.", targetKanji: ["詐", "騙"] },

  // 揉 (Masser) - Level 33
  { word: "揉む", meanings: ["Masser", "Pétrir"], readings: ["もむ"], mnemonicFr: "Le masseur MASSE ses muscles tendus pour soulager la douleur.", targetKanji: ["揉"] },
  { word: "揉め事", meanings: ["Dispute", "Conflit"], readings: ["もめごと"], mnemonicFr: "La DISPUTE a éclaté, les gens se FROTTENT les uns aux autres verbalement.", targetKanji: ["揉", "事"] },

  // 鮫 (Requin) - Level 33
  { word: "鮫", meanings: ["Requin"], readings: ["さめ"], mnemonicFr: "Le REQUIN nage silencieusement, prédateur redoutable des océans.", targetKanji: ["鮫"] },

  // 覇 (Hégémonie) - Level 33
  { word: "覇権", meanings: ["Hégémonie", "Suprématie"], readings: ["はけん"], mnemonicFr: "L'HÉGÉMONIE du pays dominant s'étend sur toute la région.", targetKanji: ["覇", "権"] },
  { word: "制覇", meanings: ["Conquête", "Domination"], readings: ["せいは"], mnemonicFr: "La CONQUÊTE du championnat établit son HÉGÉMONIE sur le sport.", targetKanji: ["制", "覇"] },

  // === LEVEL 34 ===

  // 杉 (Cèdre) - Level 34
  { word: "杉", meanings: ["Cèdre japonais"], readings: ["すぎ"], mnemonicFr: "Le CÈDRE JAPONAIS s'élève majestueusement dans la forêt ancestrale.", targetKanji: ["杉"] },
  { word: "杉並", meanings: ["Suginami"], readings: ["すぎなみ"], mnemonicFr: "SUGINAMI est un quartier de Tokyo bordé de rangées de CÈDRES.", targetKanji: ["杉", "並"] },

  // 蜘 (Araignée) - Level 34
  { word: "蜘蛛", meanings: ["Araignée"], readings: ["くも"], mnemonicFr: "L'ARAIGNÉE tisse sa toile dans le coin de la fenêtre avec patience.", targetKanji: ["蜘", "蛛"] },

  // 痺 (Engourdissement) - Level 34
  { word: "痺れる", meanings: ["S'engourdir"], readings: ["しびれる"], mnemonicFr: "Sa jambe S'ENGOURDIT après être resté assis trop longtemps en seiza.", targetKanji: ["痺"] },
  { word: "麻痺", meanings: ["Paralysie"], readings: ["まひ"], mnemonicFr: "La PARALYSIE l'empêche de bouger, ses membres sont complètement ENGOURDIS.", targetKanji: ["麻", "痺"] },

  // 蛛 (Araignée) - Level 34
  { word: "蜘蛛の巣", meanings: ["Toile d'araignée"], readings: ["くものす"], mnemonicFr: "La TOILE D'ARAIGNÉE brille de rosée dans la lumière du matin.", targetKanji: ["蜘", "蛛", "巣"] },

  // 頬 (Joue) - Level 34
  { word: "頬", meanings: ["Joue"], readings: ["ほお"], mnemonicFr: "Ses JOUES rougissent de gêne quand on lui fait un compliment.", targetKanji: ["頬"] },
  { word: "頬笑み", meanings: ["Sourire"], readings: ["ほおえみ"], mnemonicFr: "Son SOURIRE illumine ses JOUES d'une lumière chaleureuse.", targetKanji: ["頬", "笑"] },

  // 飴 (Bonbon) - Level 34
  { word: "飴", meanings: ["Bonbon", "Caramel"], readings: ["あめ"], mnemonicFr: "Le BONBON fond sur la langue, libérant sa saveur sucrée.", targetKanji: ["飴"] },
  { word: "飴玉", meanings: ["Sucette", "Boule de bonbon"], readings: ["あめだま"], mnemonicFr: "La BOULE DE BONBON roule joyeusement dans sa bouche.", targetKanji: ["飴", "玉"] },

  // 粥 (Bouillie de riz) - Level 34
  { word: "粥", meanings: ["Bouillie de riz", "Congee"], readings: ["かゆ"], mnemonicFr: "La BOUILLIE DE RIZ réchauffe le corps quand on est malade.", targetKanji: ["粥"] },
  { word: "お粥", meanings: ["Bouillie de riz"], readings: ["おかゆ"], mnemonicFr: "On sert le CONGEE chaud avec des garnitures variées le matin.", targetKanji: ["粥"] },

  // 賜 (Accorder) - Level 34
  { word: "賜る", meanings: ["Recevoir (humble)"], readings: ["たまわる"], mnemonicFr: "Il REÇOIT humblement le prix que l'empereur lui ACCORDE.", targetKanji: ["賜"] },
  { word: "恩賜", meanings: ["Don impérial"], readings: ["おんし"], mnemonicFr: "Le DON IMPÉRIAL est un honneur ACCORDÉ par l'empereur lui-même.", targetKanji: ["恩", "賜"] },

  // 桐 (Paulownia) - Level 34
  { word: "桐", meanings: ["Paulownia"], readings: ["きり"], mnemonicFr: "Le PAULOWNIA produit un bois léger utilisé pour les meubles traditionnels.", targetKanji: ["桐"] },

  // 榎 (Micocoulier) - Level 34
  { word: "榎", meanings: ["Micocoulier"], readings: ["えのき"], mnemonicFr: "Le MICOCOULIER japonais pousse dans les forêts tempérées du pays.", targetKanji: ["榎"] },

  // 遡 (Remonter le courant) - Level 34
  { word: "遡る", meanings: ["Remonter"], readings: ["さかのぼる"], mnemonicFr: "Les saumons REMONTENT le courant pour pondre leurs œufs.", targetKanji: ["遡"] },
  { word: "遡及", meanings: ["Rétroactif"], readings: ["そきゅう"], mnemonicFr: "La loi RÉTROACTIVE REMONTE dans le temps pour s'appliquer.", targetKanji: ["遡", "及"] },

  // 唾 (Salive) - Level 34
  { word: "唾", meanings: ["Salive"], readings: ["つば"], mnemonicFr: "La SALIVE aide à digérer la nourriture dès qu'on la mâche.", targetKanji: ["唾"] },
  { word: "唾液", meanings: ["Salive"], readings: ["だえき"], mnemonicFr: "La SALIVE est sécrétée par les glandes salivaires de la bouche.", targetKanji: ["唾", "液"] },

  // 桶 (Seau) - Level 34
  { word: "桶", meanings: ["Seau", "Baquet"], readings: ["おけ"], mnemonicFr: "Le SEAU en bois sert à puiser l'eau du puits traditionnel.", targetKanji: ["桶"] },
  { word: "風呂桶", meanings: ["Baquet de bain"], readings: ["ふろおけ"], mnemonicFr: "Le BAQUET DE BAIN en bois parfume l'eau chaude du onsen.", targetKanji: ["風", "呂", "桶"] },

  // 拷 (Torturer) - Level 34
  { word: "拷問", meanings: ["Torture"], readings: ["ごうもん"], mnemonicFr: "La TORTURE était utilisée pour extorquer des aveux aux prisonniers.", targetKanji: ["拷", "問"] },

  // 抉 (Creuser) - Level 34
  { word: "抉る", meanings: ["Creuser", "Évider"], readings: ["えぐる"], mnemonicFr: "Il CREUSE le bois pour créer une sculpture en creux.", targetKanji: ["抉"] },

  // 詔 (Édit impérial) - Level 34
  { word: "詔書", meanings: ["Édit impérial"], readings: ["しょうしょ"], mnemonicFr: "L'ÉDIT IMPÉRIAL est lu solennellement devant la cour assemblée.", targetKanji: ["詔", "書"] },

  // 庵 (Ermitage) - Level 34
  { word: "庵", meanings: ["Ermitage", "Hutte"], readings: ["いおり"], mnemonicFr: "L'ERMITAGE du poète est une simple HUTTE au cœur de la montagne.", targetKanji: ["庵"] },
  { word: "草庵", meanings: ["Chaumière"], readings: ["そうあん"], mnemonicFr: "La CHAUMIÈRE au toit de paille est l'ERMITAGE du moine zen.", targetKanji: ["草", "庵"] },

  // 庇 (Protéger) - Level 34
  { word: "庇う", meanings: ["Protéger", "Défendre"], readings: ["かばう"], mnemonicFr: "Elle PROTÈGE son petit frère des critiques injustes.", targetKanji: ["庇"] },
  { word: "庇", meanings: ["Auvent"], readings: ["ひさし"], mnemonicFr: "L'AUVENT PROTÈGE l'entrée de la pluie battante.", targetKanji: ["庇"] },

  // 尿 (Urine) - Level 34
  { word: "尿", meanings: ["Urine"], readings: ["にょう"], mnemonicFr: "L'URINE est analysée pour détecter des problèmes de santé.", targetKanji: ["尿"] },
  { word: "排尿", meanings: ["Miction"], readings: ["はいにょう"], mnemonicFr: "La MICTION est l'acte d'évacuer l'URINE du corps.", targetKanji: ["排", "尿"] },

  // === LEVEL 35 ===

  // 昏 (Crépuscule) - Level 35
  { word: "昏睡", meanings: ["Coma"], readings: ["こんすい"], mnemonicFr: "Le patient est dans le COMA, comme plongé dans un CRÉPUSCULE éternel.", targetKanji: ["昏", "睡"] },
  { word: "黄昏", meanings: ["Crépuscule"], readings: ["たそがれ"], mnemonicFr: "Au CRÉPUSCULE, le ciel se teinte d'or et de pourpre.", targetKanji: ["黄", "昏"] },

  // 宵 (Soir) - Level 35
  { word: "宵", meanings: ["Soir", "Début de nuit"], readings: ["よい"], mnemonicFr: "Le SOIR tombe doucement, annonçant le début de la nuit étoilée.", targetKanji: ["宵"] },
  { word: "宵祭り", meanings: ["Veille de fête"], readings: ["よいまつり"], mnemonicFr: "La VEILLE DE FÊTE, le SOIR précédent le grand festival.", targetKanji: ["宵", "祭"] },

  // 將 (Général - forme ancienne) - Level 35
  { word: "將来", meanings: ["Futur"], readings: ["しょうらい"], mnemonicFr: "Le FUTUR s'étend devant nous comme un champ de bataille que le GÉNÉRAL doit conquérir.", targetKanji: ["將", "来"] },

  // 捧 (Offrir) - Level 35
  { word: "捧げる", meanings: ["Offrir", "Dédier"], readings: ["ささげる"], mnemonicFr: "Il OFFRE sa vie au service de son pays avec dévotion.", targetKanji: ["捧"] },

  // 槌 (Marteau) - Level 35
  { word: "槌", meanings: ["Marteau"], readings: ["つち"], mnemonicFr: "Le forgeron frappe le métal avec son MARTEAU pour le façonner.", targetKanji: ["槌"] },
  { word: "金槌", meanings: ["Marteau"], readings: ["かなづち"], mnemonicFr: "Le MARTEAU en métal enfonce les clous dans le bois solide.", targetKanji: ["金", "槌"] },

  // 帆 (Voile) - Level 35
  { word: "帆", meanings: ["Voile"], readings: ["ほ"], mnemonicFr: "La VOILE du bateau se gonfle au vent, poussant le navire vers le large.", targetKanji: ["帆"] },
  { word: "帆船", meanings: ["Voilier"], readings: ["はんせん"], mnemonicFr: "Le VOILIER glisse gracieusement sur les vagues avec ses grandes VOILES.", targetKanji: ["帆", "船"] },

  // 繕 (Réparer) - Level 35
  { word: "繕う", meanings: ["Réparer", "Raccommoder"], readings: ["つくろう"], mnemonicFr: "Elle RÉPARE le vêtement déchiré avec fil et aiguille.", targetKanji: ["繕"] },
  { word: "修繕", meanings: ["Réparation"], readings: ["しゅうぜん"], mnemonicFr: "Les RÉPARATIONS du temple ancien durent plusieurs mois.", targetKanji: ["修", "繕"] },

  // 訃 (Avis de décès) - Level 35
  { word: "訃報", meanings: ["Nouvelle d'un décès"], readings: ["ふほう"], mnemonicFr: "La NOUVELLE DU DÉCÈS de son ami l'a profondément attristé.", targetKanji: ["訃", "報"] },

  // 註 (Annotation) - Level 35
  { word: "註釈", meanings: ["Annotation", "Commentaire"], readings: ["ちゅうしゃく"], mnemonicFr: "Les ANNOTATIONS dans la marge expliquent les passages difficiles.", targetKanji: ["註", "釈"] },

  // === LEVEL 36 ===

  // 沸 (Bouillir) - Level 36
  { word: "沸く", meanings: ["Bouillir"], readings: ["わく"], mnemonicFr: "L'eau BOUT dans la casserole, les bulles éclatent à la surface.", targetKanji: ["沸"] },
  { word: "沸騰", meanings: ["Ébullition"], readings: ["ふっとう"], mnemonicFr: "L'ÉBULLITION commence quand l'eau atteint cent degrés.", targetKanji: ["沸", "騰"] },

  // 硯 (Pierre à encre) - Level 36
  { word: "硯", meanings: ["Pierre à encre"], readings: ["すずり"], mnemonicFr: "Le calligraphe frotte son bâton d'encre sur la PIERRE À ENCRE.", targetKanji: ["硯"] },

  // 薪 (Bois de chauffage) - Level 36
  { word: "薪", meanings: ["Bois de chauffage"], readings: ["たきぎ"], mnemonicFr: "Le BOIS DE CHAUFFAGE crépite dans la cheminée, réchauffant la maison.", targetKanji: ["薪"] },
  { word: "薪割り", meanings: ["Fendre du bois"], readings: ["まきわり"], mnemonicFr: "FENDRE DU BOIS est une tâche quotidienne dans les campagnes.", targetKanji: ["薪", "割"] },

  // 藻 (Algue) - Level 36
  { word: "藻", meanings: ["Algue"], readings: ["も"], mnemonicFr: "Les ALGUES vertes ondulent au gré des courants sous-marins.", targetKanji: ["藻"] },
  { word: "海藻", meanings: ["Algue marine"], readings: ["かいそう"], mnemonicFr: "Les ALGUES MARINES sont riches en minéraux et vitamines.", targetKanji: ["海", "藻"] },

  // === LEVEL 37 ===

  // 濫 (Déborder) - Level 37
  { word: "氾濫", meanings: ["Inondation", "Débordement"], readings: ["はんらん"], mnemonicFr: "L'INONDATION DÉBORDE des rives, envahissant les maisons.", targetKanji: ["氾", "濫"] },
  { word: "濫用", meanings: ["Abus"], readings: ["らんよう"], mnemonicFr: "L'ABUS de pouvoir DÉBORDE les limites acceptables.", targetKanji: ["濫", "用"] },

  // 縫 (Coudre) - Level 37
  { word: "縫う", meanings: ["Coudre"], readings: ["ぬう"], mnemonicFr: "Elle COUD un bouton sur la chemise avec précision.", targetKanji: ["縫"] },
  { word: "縫い目", meanings: ["Couture"], readings: ["ぬいめ"], mnemonicFr: "La COUTURE est presque invisible, parfaitement alignée.", targetKanji: ["縫", "目"] },

  // 鼓 (Tambour) - Level 37
  { word: "鼓", meanings: ["Tambour"], readings: ["つづみ"], mnemonicFr: "Le TAMBOUR résonne dans le théâtre nô, rythmant le spectacle.", targetKanji: ["鼓"] },
  { word: "太鼓", meanings: ["Gros tambour"], readings: ["たいこ"], mnemonicFr: "Le GROS TAMBOUR taiko fait trembler les murs avec sa puissance.", targetKanji: ["太", "鼓"] },

  // 憤 (Indignation) - Level 37
  { word: "憤る", meanings: ["S'indigner"], readings: ["いきどおる"], mnemonicFr: "Il S'INDIGNE face à l'injustice, la colère l'envahit.", targetKanji: ["憤"] },
  { word: "憤慨", meanings: ["Indignation"], readings: ["ふんがい"], mnemonicFr: "Son INDIGNATION éclate devant cette décision inacceptable.", targetKanji: ["憤", "慨"] },

  // 戴 (Recevoir) - Level 37
  { word: "戴く", meanings: ["Recevoir (humble)"], readings: ["いただく"], mnemonicFr: "Je REÇOIS humblement ce cadeau précieux avec gratitude.", targetKanji: ["戴"] },
  { word: "頂戴", meanings: ["S'il vous plaît (donnez-moi)"], readings: ["ちょうだい"], mnemonicFr: "S'IL VOUS PLAÎT, donnez-moi ce que je désire RECEVOIR.", targetKanji: ["頂", "戴"] },

  // 睦 (Harmonie) - Level 37
  { word: "親睦", meanings: ["Amitié", "Fraternité"], readings: ["しんぼく"], mnemonicFr: "L'AMITIÉ crée une HARMONIE entre les membres du groupe.", targetKanji: ["親", "睦"] },
  { word: "睦まじい", meanings: ["Harmonieux", "Intime"], readings: ["むつまじい"], mnemonicFr: "Leur relation HARMONIEUSE inspire tous ceux qui les voient.", targetKanji: ["睦"] },

  // === LEVEL 38 ===

  // 猶 (Encore) - Level 38
  { word: "猶予", meanings: ["Délai", "Sursis"], readings: ["ゆうよ"], mnemonicFr: "Le DÉLAI lui donne ENCORE du temps pour préparer sa défense.", targetKanji: ["猶", "予"] },
  { word: "猶更", meanings: ["Encore plus", "D'autant plus"], readings: ["なおさら"], mnemonicFr: "C'est ENCORE PLUS important maintenant que la situation a changé.", targetKanji: ["猶", "更"] },

  // 頒 (Distribuer) - Level 38
  { word: "頒布", meanings: ["Distribution"], readings: ["はんぷ"], mnemonicFr: "La DISTRIBUTION des documents se fait à l'entrée du bâtiment.", targetKanji: ["頒", "布"] },

  // === LEVEL 40 ===

  // 嘲 (Se moquer) - Level 40
  { word: "嘲る", meanings: ["Se moquer", "Railler"], readings: ["あざける"], mnemonicFr: "Il SE MOQUE de ses rivaux avec un sourire narquois.", targetKanji: ["嘲"] },
  { word: "嘲笑", meanings: ["Moquerie", "Raillerie"], readings: ["ちょうしょう"], mnemonicFr: "Sa MOQUERIE blesse profondément celui qui en est la cible.", targetKanji: ["嘲", "笑"] },

  // 蛙 (Grenouille) - Level 40
  { word: "蛙", meanings: ["Grenouille"], readings: ["かえる"], mnemonicFr: "La GRENOUILLE coasse dans la mare au clair de lune.", targetKanji: ["蛙"] },
  { word: "蛙飛び", meanings: ["Sauts de grenouille"], readings: ["かえるとび"], mnemonicFr: "Les SAUTS DE GRENOUILLE sont un exercice physique épuisant.", targetKanji: ["蛙", "飛"] },

  // 烏 (Corbeau) - Level 40
  { word: "烏", meanings: ["Corbeau"], readings: ["からす"], mnemonicFr: "Le CORBEAU noir croasse sur le toit du temple au crépuscule.", targetKanji: ["烏"] },

  // 冥 (Sombre) - Level 40
  { word: "冥土", meanings: ["Monde des morts"], readings: ["めいど"], mnemonicFr: "Le MONDE DES MORTS est un lieu SOMBRE où errent les âmes.", targetKanji: ["冥", "土"] },
  { word: "冥想", meanings: ["Méditation"], readings: ["めいそう"], mnemonicFr: "La MÉDITATION plonge l'esprit dans un silence SOMBRE et profond.", targetKanji: ["冥", "想"] },

  // === LEVEL 41 ===

  // 壱 (Un formel) - Level 41
  { word: "壱万円", meanings: ["Dix mille yens"], readings: ["いちまんえん"], mnemonicFr: "Le billet de DIX MILLE YENS utilise le caractère formel UN.", targetKanji: ["壱", "万", "円"] },

  // 淫 (Obscène) - Level 41
  { word: "淫ら", meanings: ["Obscène", "Indécent"], readings: ["みだら"], mnemonicFr: "Ce comportement OBSCÈNE choque tous les témoins présents.", targetKanji: ["淫"] },

  // 鎚 (Marteau) - Level 41
  { word: "鉄鎚", meanings: ["Marteau de fer"], readings: ["てっつい"], mnemonicFr: "Le MARTEAU DE FER du forgeron frappe l'enclume avec force.", targetKanji: ["鉄", "鎚"] },

  // 巌 (Rocher) - Level 41
  { word: "巌", meanings: ["Rocher", "Falaise"], readings: ["いわお"], mnemonicFr: "Le ROCHER massif se dresse au-dessus de la mer déchaînée.", targetKanji: ["巌"] },

  // 瞼 (Paupière) - Level 41
  { word: "瞼", meanings: ["Paupière"], readings: ["まぶた"], mnemonicFr: "Ses PAUPIÈRES lourdes se ferment, le sommeil l'envahit.", targetKanji: ["瞼"] },

  // 醒 (Se réveiller) - Level 41
  { word: "覚醒", meanings: ["Éveil", "Réveil"], readings: ["かくせい"], mnemonicFr: "L'ÉVEIL spirituel le fait SE RÉVEILLER à une nouvelle conscience.", targetKanji: ["覚", "醒"] },
  { word: "醒める", meanings: ["Se réveiller", "Dégriser"], readings: ["さめる"], mnemonicFr: "Il SE RÉVEILLE lentement de son ivresse nocturne.", targetKanji: ["醒"] },

  // 媼 (Vieille femme) - Level 41
  { word: "媼", meanings: ["Vieille femme"], readings: ["おうな"], mnemonicFr: "La VIEILLE FEMME raconte des histoires anciennes aux enfants.", targetKanji: ["媼"] },

  // 冤 (Injustice) - Level 41
  { word: "冤罪", meanings: ["Accusation injuste"], readings: ["えんざい"], mnemonicFr: "L'ACCUSATION INJUSTE a détruit la vie d'un innocent.", targetKanji: ["冤", "罪"] },

  // 粛 (Solennel) - Level 41
  { word: "粛清", meanings: ["Purge"], readings: ["しゅくせい"], mnemonicFr: "La PURGE politique élimine SOLENNELLEMENT les opposants.", targetKanji: ["粛", "清"] },
  { word: "厳粛", meanings: ["Solennel", "Grave"], readings: ["げんしゅく"], mnemonicFr: "L'atmosphère SOLENNELLE de la cérémonie impose le respect.", targetKanji: ["厳", "粛"] },

  // 醸 (Brasser) - Level 41
  { word: "醸造", meanings: ["Brassage", "Fermentation"], readings: ["じょうぞう"], mnemonicFr: "Le BRASSAGE du saké demande des mois de fermentation patiente.", targetKanji: ["醸", "造"] },
  { word: "醸す", meanings: ["Brasser", "Créer"], readings: ["かもす"], mnemonicFr: "Cette atmosphère BRASSE des sentiments de malaise.", targetKanji: ["醸"] },

  // 屍 (Cadavre) - Level 41
  { word: "屍", meanings: ["Cadavre"], readings: ["しかばね"], mnemonicFr: "Le CADAVRE gît sur le champ de bataille après le combat.", targetKanji: ["屍"] },
  { word: "屍体", meanings: ["Corps mort"], readings: ["したい"], mnemonicFr: "Le CORPS MORT a été découvert au petit matin.", targetKanji: ["屍", "体"] },

  // 僻 (Éloigné) - Level 41
  { word: "僻地", meanings: ["Région éloignée"], readings: ["へきち"], mnemonicFr: "Cette RÉGION ÉLOIGNÉE est difficile d'accès pour les voyageurs.", targetKanji: ["僻", "地"] },
  { word: "偏僻", meanings: ["Isolé"], readings: ["へんぺき"], mnemonicFr: "Le village ISOLÉ est ÉLOIGNÉ de toute civilisation moderne.", targetKanji: ["偏", "僻"] },

  // === LEVEL 42 ===

  // 俵 (Sac de paille) - Level 42
  { word: "俵", meanings: ["Sac de paille", "Balle de riz"], readings: ["たわら"], mnemonicFr: "Le SAC DE PAILLE contient soixante kilos de riz récolté.", targetKanji: ["俵"] },
  { word: "米俵", meanings: ["Sac de riz"], readings: ["こめだわら"], mnemonicFr: "Les SACS DE RIZ sont empilés dans l'entrepôt du fermier.", targetKanji: ["米", "俵"] },

  // 尺 (Pied - mesure) - Level 42
  { word: "尺", meanings: ["Shaku (mesure)"], readings: ["しゃく"], mnemonicFr: "Le SHAKU est une unité de mesure japonaise d'environ 30 cm.", targetKanji: ["尺"] },
  { word: "尺度", meanings: ["Échelle", "Critère"], readings: ["しゃくど"], mnemonicFr: "L'ÉCHELLE de valeurs sert de CRITÈRE pour juger les actions.", targetKanji: ["尺", "度"] },

  // 腎 (Rein) - Level 42
  { word: "腎臓", meanings: ["Rein"], readings: ["じんぞう"], mnemonicFr: "Les REINS filtrent le sang et éliminent les toxines du corps.", targetKanji: ["腎", "臓"] },

  // 藁 (Paille) - Level 42
  { word: "藁", meanings: ["Paille"], readings: ["わら"], mnemonicFr: "La PAILLE de riz sert à fabriquer des sandales et des nattes.", targetKanji: ["藁"] },
  { word: "藁葺き", meanings: ["Toit de chaume"], readings: ["わらぶき"], mnemonicFr: "Le TOIT DE CHAUME en PAILLE protège la maison traditionnelle.", targetKanji: ["藁", "葺"] },

  // 朧 (Vague) - Level 42
  { word: "朧月", meanings: ["Lune voilée"], readings: ["おぼろづき"], mnemonicFr: "La LUNE VOILÉE apparaît VAGUEMENT à travers les nuages légers.", targetKanji: ["朧", "月"] },
  { word: "朧げ", meanings: ["Vague", "Flou"], readings: ["おぼろげ"], mnemonicFr: "Ses souvenirs sont VAGUES, comme une image floue et lointaine.", targetKanji: ["朧"] },

  // === LEVEL 43 ===

  // 庄 (Village) - Level 43
  { word: "庄屋", meanings: ["Chef de village"], readings: ["しょうや"], mnemonicFr: "Le CHEF DE VILLAGE administre les affaires locales avec sagesse.", targetKanji: ["庄", "屋"] },

  // 匁 (Momme - unité) - Level 43
  { word: "匁", meanings: ["Momme"], readings: ["もんめ"], mnemonicFr: "Le MOMME est une unité de poids pour les perles et la soie.", targetKanji: ["匁"] },

  // 蕾 (Bourgeon) - Level 43
  { word: "蕾", meanings: ["Bourgeon"], readings: ["つぼみ"], mnemonicFr: "Le BOURGEON de cerisier attend le printemps pour s'épanouir.", targetKanji: ["蕾"] },
  { word: "花蕾", meanings: ["Bouton de fleur"], readings: ["からい"], mnemonicFr: "Le BOUTON DE FLEUR est un BOURGEON prêt à éclore.", targetKanji: ["花", "蕾"] },

  // 鯉 (Carpe) - Level 43
  { word: "鯉", meanings: ["Carpe"], readings: ["こい"], mnemonicFr: "La CARPE koï nage gracieusement dans l'étang du jardin japonais.", targetKanji: ["鯉"] },
  { word: "鯉のぼり", meanings: ["Cerf-volant carpe"], readings: ["こいのぼり"], mnemonicFr: "Les CERFS-VOLANTS CARPE flottent au vent pour la fête des enfants.", targetKanji: ["鯉"] },

  // 鮭 (Saumon) - Level 43
  { word: "鮭", meanings: ["Saumon"], readings: ["さけ"], mnemonicFr: "Le SAUMON remonte la rivière pour pondre ses œufs.", targetKanji: ["鮭"] },
  { word: "鮭弁当", meanings: ["Bentô au saumon"], readings: ["しゃけべんとう"], mnemonicFr: "Le BENTÔ AU SAUMON est un repas populaire au Japon.", targetKanji: ["鮭", "弁", "当"] },

  // 膳 (Plateau-repas) - Level 43
  { word: "膳", meanings: ["Plateau-repas"], readings: ["ぜん"], mnemonicFr: "Le PLATEAU-REPAS présente les plats de façon élégante.", targetKanji: ["膳"] },
  { word: "御膳", meanings: ["Repas servi"], readings: ["ごぜん"], mnemonicFr: "Le REPAS SERVI sur plateau respecte la tradition culinaire.", targetKanji: ["御", "膳"] },

  // 琲 (Café) - Level 43
  { word: "珈琲", meanings: ["Café"], readings: ["コーヒー"], mnemonicFr: "Le CAFÉ fumant réchauffe les mains par un matin d'hiver.", targetKanji: ["珈", "琲"] },

  // === LEVEL 44 ===

  // 泰 (Paisible) - Level 44
  { word: "泰然", meanings: ["Calme", "Serein"], readings: ["たいぜん"], mnemonicFr: "Il reste CALME et SEREIN face à l'adversité, PAISIBLE.", targetKanji: ["泰", "然"] },
  { word: "泰平", meanings: ["Paix", "Tranquillité"], readings: ["たいへい"], mnemonicFr: "L'ère de PAIX PAISIBLE a duré plus de deux siècles.", targetKanji: ["泰", "平"] },

  // 巾 (Tissu) - Level 44
  { word: "布巾", meanings: ["Torchon"], readings: ["ふきん"], mnemonicFr: "Le TORCHON en TISSU sert à essuyer la vaisselle.", targetKanji: ["布", "巾"] },
  { word: "雑巾", meanings: ["Serpillière"], readings: ["ぞうきん"], mnemonicFr: "La SERPILLIÈRE en TISSU nettoie le sol de la maison.", targetKanji: ["雑", "巾"] },

  // 培 (Cultiver) - Level 44
  { word: "培う", meanings: ["Cultiver", "Développer"], readings: ["つちかう"], mnemonicFr: "Il CULTIVE ses talents avec patience et persévérance.", targetKanji: ["培"] },
  { word: "栽培", meanings: ["Culture", "Cultivation"], readings: ["さいばい"], mnemonicFr: "La CULTURE des légumes demande du soin et de l'attention.", targetKanji: ["栽", "培"] },

  // 霞 (Brume) - Level 44
  { word: "霞", meanings: ["Brume"], readings: ["かすみ"], mnemonicFr: "La BRUME matinale enveloppe la montagne d'un voile mystérieux.", targetKanji: ["霞"] },
  { word: "霞む", meanings: ["Être brumeux"], readings: ["かすむ"], mnemonicFr: "Le paysage EST BRUMEUX, les contours s'estompent au loin.", targetKanji: ["霞"] },

  // === LEVEL 45 ===

  // 堀 (Fossé) - Level 45
  { word: "堀", meanings: ["Fossé", "Douve"], readings: ["ほり"], mnemonicFr: "Le FOSSÉ autour du château protège contre les envahisseurs.", targetKanji: ["堀"] },
  { word: "外堀", meanings: ["Douve extérieure"], readings: ["そとぼり"], mnemonicFr: "La DOUVE EXTÉRIEURE est la première ligne de défense du château.", targetKanji: ["外", "堀"] },

  // 郭 (Enceinte) - Level 45
  { word: "城郭", meanings: ["Château fortifié"], readings: ["じょうかく"], mnemonicFr: "Le CHÂTEAU FORTIFIÉ avec son ENCEINTE domine la vallée.", targetKanji: ["城", "郭"] },
  { word: "外郭", meanings: ["Contour", "Enceinte extérieure"], readings: ["がいかく"], mnemonicFr: "L'ENCEINTE EXTÉRIEURE délimite le périmètre de la forteresse.", targetKanji: ["外", "郭"] },

  // 斤 (Jin - mesure) - Level 45
  { word: "一斤", meanings: ["Un kin", "Une miche"], readings: ["いっきん"], mnemonicFr: "UNE MICHE de pain équivaut à environ 600 grammes.", targetKanji: ["一", "斤"] },

  // 赦 (Pardonner) - Level 45
  { word: "赦す", meanings: ["Pardonner"], readings: ["ゆるす"], mnemonicFr: "Il PARDONNE les offenses passées avec magnanimité.", targetKanji: ["赦"] },
  { word: "恩赦", meanings: ["Amnistie"], readings: ["おんしゃ"], mnemonicFr: "L'AMNISTIE royale PARDONNE les condamnés à l'occasion du couronnement.", targetKanji: ["恩", "赦"] },

  // 錐 (Poinçon) - Level 45
  { word: "錐", meanings: ["Poinçon", "Alène"], readings: ["きり"], mnemonicFr: "Le POINÇON perce le cuir pour créer des trous précis.", targetKanji: ["錐"] },

  // 詫 (S'excuser) - Level 45
  { word: "詫びる", meanings: ["S'excuser"], readings: ["わびる"], mnemonicFr: "Il S'EXCUSE humblement pour l'erreur qu'il a commise.", targetKanji: ["詫"] },
  { word: "詫び", meanings: ["Excuse"], readings: ["わび"], mnemonicFr: "Son EXCUSE sincère est acceptée par la personne offensée.", targetKanji: ["詫"] },

  // 栗 (Châtaigne) - Level 45
  { word: "栗", meanings: ["Châtaigne"], readings: ["くり"], mnemonicFr: "Les CHÂTAIGNES grillées parfument les rues en automne.", targetKanji: ["栗"] },
  { word: "栗拾い", meanings: ["Cueillette de châtaignes"], readings: ["くりひろい"], mnemonicFr: "La CUEILLETTE DE CHÂTAIGNES est une activité familiale en automne.", targetKanji: ["栗", "拾"] },

  // 鰻 (Anguille) - Level 45
  { word: "鰻", meanings: ["Anguille"], readings: ["うなぎ"], mnemonicFr: "L'ANGUILLE grillée est un plat d'été délicieux au Japon.", targetKanji: ["鰻"] },
  { word: "鰻丼", meanings: ["Bol d'anguille"], readings: ["うなどん"], mnemonicFr: "Le BOL D'ANGUILLE sur riz est un repas populaire et savoureux.", targetKanji: ["鰻", "丼"] },

  // 溢 (Déborder) - Level 45
  { word: "溢れる", meanings: ["Déborder"], readings: ["あふれる"], mnemonicFr: "L'eau DÉBORDE de la baignoire trop remplie.", targetKanji: ["溢"] },
  { word: "横溢", meanings: ["Abondance"], readings: ["おういつ"], mnemonicFr: "L'ABONDANCE de talent DÉBORDE de cette jeune artiste.", targetKanji: ["横", "溢"] },

  // 竈 (Fourneau) - Level 45
  { word: "竈", meanings: ["Fourneau", "Four"], readings: ["かまど"], mnemonicFr: "Le FOURNEAU traditionnel cuit le riz à la perfection.", targetKanji: ["竈"] },

  // 瑠 (Lapis-lazuli) - Level 45
  { word: "瑠璃色", meanings: ["Bleu lapis"], readings: ["るりいろ"], mnemonicFr: "Le BLEU LAPIS est une couleur profonde comme le ciel d'été.", targetKanji: ["瑠", "璃", "色"] },

  // === LEVEL 46 ===

  // 楼 (Tour) - Level 46
  { word: "高楼", meanings: ["Haute tour"], readings: ["こうろう"], mnemonicFr: "La HAUTE TOUR domine la ville du haut de ses étages.", targetKanji: ["高", "楼"] },
  { word: "楼閣", meanings: ["Tour", "Château"], readings: ["ろうかく"], mnemonicFr: "Le CHÂTEAU aux multiples TOURS s'élève majestueusement.", targetKanji: ["楼", "閣"] },

  // 髄 (Moelle) - Level 46
  { word: "骨髄", meanings: ["Moelle osseuse"], readings: ["こつずい"], mnemonicFr: "La MOELLE OSSEUSE produit les cellules du sang.", targetKanji: ["骨", "髄"] },
  { word: "脊髄", meanings: ["Moelle épinière"], readings: ["せきずい"], mnemonicFr: "La MOELLE ÉPINIÈRE transmet les signaux nerveux au corps.", targetKanji: ["脊", "髄"] },

  // 楔 (Cale) - Level 46
  { word: "楔", meanings: ["Cale", "Coin"], readings: ["くさび"], mnemonicFr: "La CALE en bois maintient la porte ouverte contre le vent.", targetKanji: ["楔"] },

  // 梯 (Échelle) - Level 46
  { word: "梯子", meanings: ["Échelle"], readings: ["はしご"], mnemonicFr: "L'ÉCHELLE permet de monter sur le toit de la maison.", targetKanji: ["梯", "子"] },

  // 鮪 (Thon) - Level 46
  { word: "鮪", meanings: ["Thon"], readings: ["まぐろ"], mnemonicFr: "Le THON frais est utilisé pour les meilleurs sushis.", targetKanji: ["鮪"] },

  // 翠 (Émeraude) - Level 46
  { word: "翡翠", meanings: ["Jade"], readings: ["ひすい"], mnemonicFr: "Le JADE vert ÉMERAUDE est une pierre précieuse recherchée.", targetKanji: ["翡", "翠"] },
  { word: "翠緑", meanings: ["Vert émeraude"], readings: ["すいりょく"], mnemonicFr: "La couleur VERT ÉMERAUDE brille comme une pierre précieuse.", targetKanji: ["翠", "緑"] },

  // 賤 (Bas/vil) - Level 46
  { word: "卑賤", meanings: ["Bas", "Vil"], readings: ["ひせん"], mnemonicFr: "Son comportement VIL et BAS lui a fait perdre tout respect.", targetKanji: ["卑", "賤"] },

  // 逝 (Mourir) - Level 46
  { word: "逝く", meanings: ["Partir", "Mourir"], readings: ["ゆく"], mnemonicFr: "Le grand-père est PARTI paisiblement dans son sommeil.", targetKanji: ["逝"] },
  { word: "逝去", meanings: ["Décès"], readings: ["せいきょ"], mnemonicFr: "Le DÉCÈS du maître a attristé tous ses disciples.", targetKanji: ["逝", "去"] },

  // 逓 (Transmettre) - Level 46
  { word: "逓信", meanings: ["Poste et télécommunications"], readings: ["ていしん"], mnemonicFr: "Le ministère des POSTES TRANSMET les courriers dans tout le pays.", targetKanji: ["逓", "信"] },

  // 凖 (Standard) - Level 46
  { word: "凖備", meanings: ["Préparation"], readings: ["じゅんび"], mnemonicFr: "La PRÉPARATION selon les STANDARDS assure le succès.", targetKanji: ["凖", "備"] },

  // === LEVEL 47 ===

  // 堰 (Barrage) - Level 47
  { word: "堰", meanings: ["Barrage", "Digue"], readings: ["せき"], mnemonicFr: "Le BARRAGE retient les eaux de la rivière pour l'irrigation.", targetKanji: ["堰"] },

  // 淀 (Stagnant) - Level 47
  { word: "淀む", meanings: ["Stagner"], readings: ["よどむ"], mnemonicFr: "L'eau STAGNE dans le fossé, sans mouvement ni vie.", targetKanji: ["淀"] },
  { word: "淀み", meanings: ["Stagnation"], readings: ["よどみ"], mnemonicFr: "La STAGNATION de l'eau crée une odeur désagréable.", targetKanji: ["淀"] },

  // 玩 (Jouer) - Level 47
  { word: "玩具", meanings: ["Jouet"], readings: ["がんぐ"], mnemonicFr: "Les JOUETS pour enfants sont faits pour JOUER et s'amuser.", targetKanji: ["玩", "具"] },

  // 揃 (Réunir) - Level 47
  { word: "揃う", meanings: ["Être réuni"], readings: ["そろう"], mnemonicFr: "Toute la famille est RÉUNIE pour le repas du nouvel an.", targetKanji: ["揃"] },
  { word: "揃える", meanings: ["Réunir", "Aligner"], readings: ["そろえる"], mnemonicFr: "Il RÉUNIT tous les documents nécessaires pour le dossier.", targetKanji: ["揃"] },

  // 呟 (Murmurer) - Level 47
  { word: "呟く", meanings: ["Murmurer"], readings: ["つぶやく"], mnemonicFr: "Elle MURMURE des mots doux à l'oreille de son enfant.", targetKanji: ["呟"] },

  // 袴 (Hakama) - Level 47
  { word: "袴", meanings: ["Hakama"], readings: ["はかま"], mnemonicFr: "Le HAKAMA est un pantalon large porté sur le kimono.", targetKanji: ["袴"] },

  // 臍 (Nombril) - Level 47
  { word: "臍", meanings: ["Nombril"], readings: ["へそ"], mnemonicFr: "Le NOMBRIL est la cicatrice du cordon ombilical coupé.", targetKanji: ["臍"] },

  // 鯛 (Daurade) - Level 47
  { word: "鯛", meanings: ["Daurade"], readings: ["たい"], mnemonicFr: "La DAURADE est un poisson prisé pour les célébrations.", targetKanji: ["鯛"] },
  { word: "鯛焼き", meanings: ["Taiyaki"], readings: ["たいやき"], mnemonicFr: "Le TAIYAKI est un gâteau en forme de DAURADE fourré de pâte de haricots.", targetKanji: ["鯛", "焼"] },

  // 槍 (Lance) - Level 47
  { word: "槍", meanings: ["Lance"], readings: ["やり"], mnemonicFr: "Le samouraï brandit sa LANCE contre son adversaire.", targetKanji: ["槍"] },

  // 熾 (Ardent) - Level 47
  { word: "熾烈", meanings: ["Intense", "Acharné"], readings: ["しれつ"], mnemonicFr: "La compétition INTENSE est ARDENTE entre les deux équipes.", targetKanji: ["熾", "烈"] },

  // 剃 (Raser) - Level 47
  { word: "剃る", meanings: ["Raser"], readings: ["そる"], mnemonicFr: "Le barbier RASE la barbe du client avec précision.", targetKanji: ["剃"] },
  { word: "剃刀", meanings: ["Rasoir"], readings: ["かみそり"], mnemonicFr: "Le RASOIR coupe les poils près de la peau.", targetKanji: ["剃", "刀"] },

  // 奔 (Courir) - Level 47
  { word: "奔走", meanings: ["Se démener"], readings: ["ほんそう"], mnemonicFr: "Il SE DÉMÈNE COURANT partout pour résoudre le problème.", targetKanji: ["奔", "走"] },
  { word: "奔放", meanings: ["Effréné", "Libre"], readings: ["ほんぽう"], mnemonicFr: "Son style EFFRÉNÉ et LIBRE COURT sans contrainte.", targetKanji: ["奔", "放"] },

  // 雌 (Femelle) - Level 47
  { word: "雌", meanings: ["Femelle"], readings: ["めす"], mnemonicFr: "La FEMELLE du lion protège ses petits avec férocité.", targetKanji: ["雌"] },
  { word: "雌雄", meanings: ["Mâle et femelle"], readings: ["しゆう"], mnemonicFr: "On distingue le MÂLE ET LA FEMELLE par leur plumage.", targetKanji: ["雌", "雄"] },

  // 龍 (Dragon) - Level 47
  { word: "龍", meanings: ["Dragon"], readings: ["りゅう"], mnemonicFr: "Le DRAGON légendaire crache du feu sur ses ennemis.", targetKanji: ["龍"] },

  // 倣 (Imiter) - Level 47
  { word: "倣う", meanings: ["Imiter", "Suivre l'exemple"], readings: ["ならう"], mnemonicFr: "L'apprenti IMITE les gestes du maître pour apprendre.", targetKanji: ["倣"] },
  { word: "模倣", meanings: ["Imitation"], readings: ["もほう"], mnemonicFr: "L'IMITATION du style du maître montre son influence.", targetKanji: ["模", "倣"] },

  // 碑 (Monument) - Level 47
  { word: "石碑", meanings: ["Stèle"], readings: ["せきひ"], mnemonicFr: "La STÈLE commémore les héros tombés au combat.", targetKanji: ["石", "碑"] },
  { word: "記念碑", meanings: ["Monument commémoratif"], readings: ["きねんひ"], mnemonicFr: "Le MONUMENT COMMÉMORATIF honore la mémoire des disparus.", targetKanji: ["記", "念", "碑"] },

  // === LEVEL 48 ===

  // 郎 (Fils) - Level 48
  { word: "太郎", meanings: ["Tarô"], readings: ["たろう"], mnemonicFr: "TARÔ, le premier FILS, est un prénom masculin traditionnel.", targetKanji: ["太", "郎"] },
  { word: "新郎", meanings: ["Marié"], readings: ["しんろう"], mnemonicFr: "Le MARIÉ attend nerveusement l'arrivée de sa future épouse.", targetKanji: ["新", "郎"] },

  // 沢 (Marais) - Level 48
  { word: "沢山", meanings: ["Beaucoup"], readings: ["たくさん"], mnemonicFr: "Il y a BEAUCOUP de poissons dans le MARAIS du village.", targetKanji: ["沢", "山"] },
  { word: "沢", meanings: ["Marais", "Marécage"], readings: ["さわ"], mnemonicFr: "Le MARAIS abrite une faune et une flore uniques.", targetKanji: ["沢"] },

  // === LEVEL 49 ===

  // 呆 (Stupéfait) - Level 49
  { word: "呆れる", meanings: ["Être stupéfait"], readings: ["あきれる"], mnemonicFr: "Elle est STUPÉFAITE par l'audace de sa proposition.", targetKanji: ["呆"] },
  { word: "呆然", meanings: ["Stupéfié"], readings: ["ぼうぜん"], mnemonicFr: "Il reste STUPÉFIÉ, bouche bée devant le spectacle.", targetKanji: ["呆", "然"] },

  // 浄 (Pur) - Level 49
  { word: "清浄", meanings: ["Pureté"], readings: ["せいじょう"], mnemonicFr: "La PURETÉ de l'eau de source est PUR et cristalline.", targetKanji: ["清", "浄"] },
  { word: "浄化", meanings: ["Purification"], readings: ["じょうか"], mnemonicFr: "La PURIFICATION de l'eau la rend PURE et potable.", targetKanji: ["浄", "化"] },

  // === LEVEL 50 ===

  // 也 (Être) - Level 50
  { word: "也", meanings: ["Aussi", "Également"], readings: ["なり"], mnemonicFr: "Ceci EST le début d'une grande aventure.", targetKanji: ["也"] },

  // 惜 (Regretter) - Level 50
  { word: "惜しい", meanings: ["Regrettable"], readings: ["おしい"], mnemonicFr: "C'est REGRETTABLE de perdre une telle opportunité.", targetKanji: ["惜"] },
  { word: "惜しむ", meanings: ["Regretter"], readings: ["おしむ"], mnemonicFr: "Elle REGRETTE de ne pas avoir pu lui dire au revoir.", targetKanji: ["惜"] },

  // 杖 (Canne) - Level 50
  { word: "杖", meanings: ["Canne"], readings: ["つえ"], mnemonicFr: "Le vieil homme s'appuie sur sa CANNE pour marcher.", targetKanji: ["杖"] },
  { word: "杖術", meanings: ["Art de la canne"], readings: ["じょうじゅつ"], mnemonicFr: "L'ART DE LA CANNE est un art martial japonais ancien.", targetKanji: ["杖", "術"] },

  // === LEVEL 51 ===

  // 卑 (Humble/vil) - Level 51
  { word: "卑怯", meanings: ["Lâche"], readings: ["ひきょう"], mnemonicFr: "Son comportement LÂCHE et VIL est méprisable.", targetKanji: ["卑", "怯"] },
  { word: "卑しい", meanings: ["Vil", "Bas"], readings: ["いやしい"], mnemonicFr: "Ses manières VILES révèlent son manque d'éducation.", targetKanji: ["卑"] },

  // === LEVEL 52 ===

  // 邦 (Pays) - Level 52
  { word: "邦人", meanings: ["Ressortissant japonais"], readings: ["ほうじん"], mnemonicFr: "Les RESSORTISSANTS JAPONAIS à l'étranger sont protégés par l'ambassade.", targetKanji: ["邦", "人"] },
  { word: "連邦", meanings: ["Fédération"], readings: ["れんぽう"], mnemonicFr: "La FÉDÉRATION unit plusieurs PAYS sous un même gouvernement.", targetKanji: ["連", "邦"] },

  // 吾 (Je) - Level 52
  { word: "吾輩", meanings: ["Je (littéraire)"], readings: ["わがはい"], mnemonicFr: "JE suis un chat, comme dans le roman célèbre de Sōseki.", targetKanji: ["吾", "輩"] },

  // 錠 (Serrure) - Level 52
  { word: "錠", meanings: ["Serrure", "Verrou"], readings: ["じょう"], mnemonicFr: "La SERRURE protège la porte contre les intrus.", targetKanji: ["錠"] },
  { word: "錠前", meanings: ["Serrure", "Cadenas"], readings: ["じょうまえ"], mnemonicFr: "Le CADENAS sécurise le coffre aux trésors.", targetKanji: ["錠", "前"] },

  // 据 (Installer) - Level 52
  { word: "据える", meanings: ["Installer"], readings: ["すえる"], mnemonicFr: "L'électricien INSTALLE le nouveau climatiseur au mur.", targetKanji: ["据"] },
  { word: "据付", meanings: ["Installation"], readings: ["すえつけ"], mnemonicFr: "L'INSTALLATION de l'équipement demande des techniciens qualifiés.", targetKanji: ["据", "付"] },

  // 慈 (Miséricorde) - Level 52
  { word: "慈悲", meanings: ["Miséricorde", "Compassion"], readings: ["じひ"], mnemonicFr: "La MISÉRICORDE du Bouddha s'étend à tous les êtres vivants.", targetKanji: ["慈", "悲"] },
  { word: "慈愛", meanings: ["Amour bienveillant"], readings: ["じあい"], mnemonicFr: "L'AMOUR BIENVEILLANT d'une mère pour son enfant est infini.", targetKanji: ["慈", "愛"] },

  // 賊 (Voleur) - Level 52
  { word: "海賊", meanings: ["Pirate"], readings: ["かいぞく"], mnemonicFr: "Le PIRATE VOLEUR des mers attaque les navires marchands.", targetKanji: ["海", "賊"] },
  { word: "盗賊", meanings: ["Bandit"], readings: ["とうぞく"], mnemonicFr: "Le BANDIT VOLEUR se cache dans la forêt pour attaquer les voyageurs.", targetKanji: ["盗", "賊"] },

  // 弔 (Condoléances) - Level 52
  { word: "弔う", meanings: ["Présenter ses condoléances"], readings: ["とむらう"], mnemonicFr: "Il PRÉSENTE SES CONDOLÉANCES à la famille endeuillée.", targetKanji: ["弔"] },
  { word: "弔辞", meanings: ["Oraison funèbre"], readings: ["ちょうじ"], mnemonicFr: "L'ORAISON FUNÈBRE rend hommage au défunt avec émotion.", targetKanji: ["弔", "辞"] },

  // 脂 (Graisse) - Level 52
  { word: "脂", meanings: ["Graisse", "Gras"], readings: ["あぶら"], mnemonicFr: "La GRAISSE de cuisson parfume délicieusement le plat.", targetKanji: ["脂"] },
  { word: "脂肪", meanings: ["Graisse corporelle"], readings: ["しぼう"], mnemonicFr: "La GRAISSE CORPORELLE stocke l'énergie pour le corps.", targetKanji: ["脂", "肪"] },

  // === LEVEL 54 ===

  // 徹 (Pénétrer) - Level 54
  { word: "徹底", meanings: ["Thorough", "Complet"], readings: ["てってい"], mnemonicFr: "L'enquête est COMPLÈTE, PÉNÉTRANT tous les aspects de l'affaire.", targetKanji: ["徹", "底"] },
  { word: "貫徹", meanings: ["Accomplir jusqu'au bout"], readings: ["かんてつ"], mnemonicFr: "Il ACCOMPLIT son projet JUSQU'AU BOUT, le PÉNÉTRANT entièrement.", targetKanji: ["貫", "徹"] },

  // 芯 (Noyau) - Level 54
  { word: "芯", meanings: ["Noyau", "Cœur"], readings: ["しん"], mnemonicFr: "Le NOYAU de l'entreprise est son équipe de direction.", targetKanji: ["芯"] },
  { word: "鉛筆の芯", meanings: ["Mine de crayon"], readings: ["えんぴつのしん"], mnemonicFr: "La MINE DE CRAYON est le NOYAU qui laisse des traces.", targetKanji: ["鉛", "筆", "芯"] },

  // 栓 (Bouchon) - Level 54
  { word: "栓", meanings: ["Bouchon", "Bonde"], readings: ["せん"], mnemonicFr: "Le BOUCHON de la bouteille empêche le vin de s'évaporer.", targetKanji: ["栓"] },
  { word: "血栓", meanings: ["Caillot sanguin"], readings: ["けっせん"], mnemonicFr: "Le CAILLOT SANGUIN BOUCHONNE les vaisseaux sanguins.", targetKanji: ["血", "栓"] },

  // 披 (Ouvrir) - Level 54
  { word: "披露", meanings: ["Présentation", "Dévoilement"], readings: ["ひろう"], mnemonicFr: "La PRÉSENTATION OUVRE le voile sur le nouveau produit.", targetKanji: ["披", "露"] },

  // 恭 (Respect) - Level 54
  { word: "恭しい", meanings: ["Respectueux"], readings: ["うやうやしい"], mnemonicFr: "Son attitude RESPECTUEUSE montre son profond RESPECT.", targetKanji: ["恭"] },

  // 徐 (Lent) - Level 54
  { word: "徐々に", meanings: ["Graduellement"], readings: ["じょじょに"], mnemonicFr: "Le changement arrive GRADUELLEMENT, LENTEMENT mais sûrement.", targetKanji: ["徐"] },
  { word: "徐行", meanings: ["Ralentir"], readings: ["じょこう"], mnemonicFr: "Le panneau demande de RALENTIR, d'aller LENTEMENT.", targetKanji: ["徐", "行"] },

  // 搭 (Monter) - Level 54
  { word: "搭乗", meanings: ["Embarquement"], readings: ["とうじょう"], mnemonicFr: "L'EMBARQUEMENT des passagers MONTANT dans l'avion commence.", targetKanji: ["搭", "乗"] },
  { word: "搭載", meanings: ["Équipé de"], readings: ["とうさい"], mnemonicFr: "Le véhicule est ÉQUIPÉ DE systèmes de navigation avancés.", targetKanji: ["搭", "載"] },

  // 附 (Attacher) - Level 54
  { word: "附属", meanings: ["Annexe", "Affilié"], readings: ["ふぞく"], mnemonicFr: "L'école AFFILIÉE est ATTACHÉE à l'université principale.", targetKanji: ["附", "属"] },

  // === LEVEL 55 ===

  // 摘 (Cueillir) - Level 55
  { word: "摘む", meanings: ["Cueillir", "Pincer"], readings: ["つむ"], mnemonicFr: "Elle CUEILLE les fleurs du jardin pour faire un bouquet.", targetKanji: ["摘"] },
  { word: "指摘", meanings: ["Faire remarquer"], readings: ["してき"], mnemonicFr: "Il FAIT REMARQUER l'erreur, la CUEILLANT du regard.", targetKanji: ["指", "摘"] },

  // 瀬 (Rapide) - Level 55
  { word: "瀬", meanings: ["Rapide", "Haut-fond"], readings: ["せ"], mnemonicFr: "Le RAPIDE de la rivière crée des tourbillons dangereux.", targetKanji: ["瀬"] },
  { word: "浅瀬", meanings: ["Haut-fond"], readings: ["あさせ"], mnemonicFr: "Le HAUT-FOND permet de traverser la rivière à pied.", targetKanji: ["浅", "瀬"] },

  // 租 (Impôt) - Level 55
  { word: "租税", meanings: ["Impôt"], readings: ["そぜい"], mnemonicFr: "Les IMPÔTS financent les services publics de l'État.", targetKanji: ["租", "税"] },

  // 喚 (Appeler) - Level 55
  { word: "喚く", meanings: ["Crier"], readings: ["わめく"], mnemonicFr: "L'enfant CRIE fort pour APPELER sa mère.", targetKanji: ["喚"] },
  { word: "召喚", meanings: ["Convocation"], readings: ["しょうかん"], mnemonicFr: "La CONVOCATION APPELLE le témoin à comparaître.", targetKanji: ["召", "喚"] },

  // 遮 (Bloquer) - Level 55
  { word: "遮る", meanings: ["Bloquer", "Intercepter"], readings: ["さえぎる"], mnemonicFr: "Le garde BLOQUE l'entrée aux personnes non autorisées.", targetKanji: ["遮"] },
  { word: "遮断", meanings: ["Interruption"], readings: ["しゃだん"], mnemonicFr: "L'INTERRUPTION du courant BLOQUE tous les appareils.", targetKanji: ["遮", "断"] },

  // 准 (Approuver) - Level 55
  { word: "准将", meanings: ["Général de brigade"], readings: ["じゅんしょう"], mnemonicFr: "Le GÉNÉRAL DE BRIGADE est APPROUVÉ pour ce rang intermédiaire.", targetKanji: ["准", "将"] },

  // 峡 (Gorge) - Level 55
  { word: "海峡", meanings: ["Détroit"], readings: ["かいきょう"], mnemonicFr: "Le DÉTROIT est une GORGE entre deux mers.", targetKanji: ["海", "峡"] },
  { word: "峡谷", meanings: ["Canyon"], readings: ["きょうこく"], mnemonicFr: "Le CANYON est une GORGE profonde creusée par la rivière.", targetKanji: ["峡", "谷"] },

  // 酵 (Fermentation) - Level 55
  { word: "発酵", meanings: ["Fermentation"], readings: ["はっこう"], mnemonicFr: "La FERMENTATION transforme le raisin en vin délicieux.", targetKanji: ["発", "酵"] },
  { word: "酵母", meanings: ["Levure"], readings: ["こうぼ"], mnemonicFr: "La LEVURE provoque la FERMENTATION de la pâte à pain.", targetKanji: ["酵", "母"] },

  // 僅 (Seulement) - Level 55
  { word: "僅か", meanings: ["Seulement", "À peine"], readings: ["わずか"], mnemonicFr: "Il reste SEULEMENT quelques minutes avant la fin.", targetKanji: ["僅"] },

  // 呈 (Présenter) - Level 55
  { word: "呈する", meanings: ["Présenter", "Offrir"], readings: ["ていする"], mnemonicFr: "Il PRÉSENTE ses respects au maître avec humilité.", targetKanji: ["呈"] },
  { word: "露呈", meanings: ["Révélation"], readings: ["ろてい"], mnemonicFr: "La RÉVÉLATION PRÉSENTE la vérité au grand jour.", targetKanji: ["露", "呈"] },

  // 絞 (Tordre) - Level 55
  { word: "絞る", meanings: ["Tordre", "Essorer"], readings: ["しぼる"], mnemonicFr: "Elle TORD le linge pour l'essorer avant de le sécher.", targetKanji: ["絞"] },
  { word: "絞殺", meanings: ["Strangulation"], readings: ["こうさつ"], mnemonicFr: "La STRANGULATION TORD la gorge de la victime.", targetKanji: ["絞", "殺"] },

  // 胆 (Vésicule biliaire) - Level 55
  { word: "胆", meanings: ["Courage", "Vésicule biliaire"], readings: ["きも"], mnemonicFr: "Son COURAGE vient de ses tripes, de sa VÉSICULE.", targetKanji: ["胆"] },
  { word: "大胆", meanings: ["Audacieux"], readings: ["だいたん"], mnemonicFr: "Son plan AUDACIEUX demande beaucoup de COURAGE.", targetKanji: ["大", "胆"] },

  // 芳 (Parfumé) - Level 55
  { word: "芳香", meanings: ["Parfum", "Arôme"], readings: ["ほうこう"], mnemonicFr: "Le PARFUM des fleurs PARFUMÉES embaume le jardin.", targetKanji: ["芳", "香"] },
  { word: "芳しい", meanings: ["Parfumé", "Admirable"], readings: ["かんばしい"], mnemonicFr: "L'odeur PARFUMÉE des roses remplit la pièce.", targetKanji: ["芳"] },

  // 諦 (Abandonner) - Level 55
  { word: "諦める", meanings: ["Abandonner", "Renoncer"], readings: ["あきらめる"], mnemonicFr: "Il ABANDONNE son rêve après des années d'échecs.", targetKanji: ["諦"] },

  // 俊 (Talent) - Level 55
  { word: "俊才", meanings: ["Génie", "Talent"], readings: ["しゅんさい"], mnemonicFr: "Ce GÉNIE musical possède un TALENT extraordinaire.", targetKanji: ["俊", "才"] },
  { word: "俊敏", meanings: ["Agile", "Vif"], readings: ["しゅんびん"], mnemonicFr: "Son agilité VIVE révèle son TALENT naturel.", targetKanji: ["俊", "敏"] },

  // === LEVEL 56 ===

  // 詠 (Réciter) - Level 56
  { word: "詠む", meanings: ["Composer", "Réciter"], readings: ["よむ"], mnemonicFr: "Le poète RÉCITE son haïku devant l'assemblée émue.", targetKanji: ["詠"] },
  { word: "詠唱", meanings: ["Chant", "Récitation"], readings: ["えいしょう"], mnemonicFr: "La RÉCITATION des sutras résonne dans le temple.", targetKanji: ["詠", "唱"] },

  // 霰 (Grêle) - Level 56
  { word: "霰", meanings: ["Grêle", "Grésil"], readings: ["あられ"], mnemonicFr: "La GRÊLE tombe du ciel, frappant les toits avec force.", targetKanji: ["霰"] },

  // 悼 (Pleurer) - Level 56
  { word: "悼む", meanings: ["Pleurer", "Déplorer"], readings: ["いたむ"], mnemonicFr: "La nation PLEURE la perte de son leader bien-aimé.", targetKanji: ["悼"] },
  { word: "追悼", meanings: ["Commémoration"], readings: ["ついとう"], mnemonicFr: "La cérémonie de COMMÉMORATION PLEURE les victimes.", targetKanji: ["追", "悼"] },

  // 抹 (Effacer) - Level 56
  { word: "抹消", meanings: ["Effacement"], readings: ["まっしょう"], mnemonicFr: "L'EFFACEMENT des données EFFACE toute trace.", targetKanji: ["抹", "消"] },
  { word: "抹茶", meanings: ["Thé vert en poudre"], readings: ["まっちゃ"], mnemonicFr: "Le THÉ VERT EN POUDRE est préparé pour la cérémonie du thé.", targetKanji: ["抹", "茶"] },

  // 辰 (Dragon - zodiac) - Level 56
  { word: "辰年", meanings: ["Année du dragon"], readings: ["たつどし"], mnemonicFr: "L'ANNÉE DU DRAGON est considérée comme favorable.", targetKanji: ["辰", "年"] },

  // 逐 (Poursuivre) - Level 56
  { word: "逐一", meanings: ["Un par un"], readings: ["ちくいち"], mnemonicFr: "Il vérifie UN PAR UN, POURSUIVANT chaque détail.", targetKanji: ["逐", "一"] },
  { word: "駆逐", meanings: ["Expulsion"], readings: ["くちく"], mnemonicFr: "L'EXPULSION POURSUIT les intrus hors du territoire.", targetKanji: ["駆", "逐"] },

  // 扶 (Aider) - Level 56
  { word: "扶養", meanings: ["Entretien", "Charge"], readings: ["ふよう"], mnemonicFr: "L'ENTRETIEN de la famille est une responsabilité, AIDER ses proches.", targetKanji: ["扶", "養"] },

  // === LEVEL 57 ===

  // 睫 (Cil) - Level 57
  { word: "睫毛", meanings: ["Cils"], readings: ["まつげ"], mnemonicFr: "Ses longs CILS battent comme des ailes de papillon.", targetKanji: ["睫", "毛"] },

  // 珀 (Ambre blanc) - Level 57
  { word: "琥珀", meanings: ["Ambre"], readings: ["こはく"], mnemonicFr: "L'AMBRE fossilise les insectes depuis des millions d'années.", targetKanji: ["琥", "珀"] },

  // === LEVEL 58 ===

  // 鯖 (Maquereau) - Level 58
  { word: "鯖", meanings: ["Maquereau"], readings: ["さば"], mnemonicFr: "Le MAQUEREAU grillé est un plat populaire au Japon.", targetKanji: ["鯖"] },

  // 琥 (Ambre) - Level 58
  { word: "琥珀色", meanings: ["Couleur ambre"], readings: ["こはくいろ"], mnemonicFr: "La bière a une belle COULEUR AMBRE dorée.", targetKanji: ["琥", "珀", "色"] },

  // 匿 (Cacher) - Level 58
  { word: "匿名", meanings: ["Anonyme"], readings: ["とくめい"], mnemonicFr: "L'ANONYME CACHE son identité pour se protéger.", targetKanji: ["匿", "名"] },
  { word: "隠匿", meanings: ["Dissimulation"], readings: ["いんとく"], mnemonicFr: "La DISSIMULATION CACHE les preuves du crime.", targetKanji: ["隠", "匿"] },

  // 捻 (Tordre) - Level 58
  { word: "捻る", meanings: ["Tordre", "Tourner"], readings: ["ねじる"], mnemonicFr: "Il TORD le bouchon pour ouvrir la bouteille.", targetKanji: ["捻"] },
  { word: "捻挫", meanings: ["Entorse"], readings: ["ねんざ"], mnemonicFr: "L'ENTORSE est une TORSION douloureuse de la cheville.", targetKanji: ["捻", "挫"] },

  // 踝 (Cheville) - Level 58
  { word: "踝", meanings: ["Cheville"], readings: ["くるぶし"], mnemonicFr: "La CHEVILLE est l'articulation entre la jambe et le pied.", targetKanji: ["踝"] },

  // 痒 (Démangeaison) - Level 58
  { word: "痒い", meanings: ["Qui démange"], readings: ["かゆい"], mnemonicFr: "La piqûre de moustique DÉMANGE terriblement.", targetKanji: ["痒"] },
  { word: "痒み", meanings: ["Démangeaison"], readings: ["かゆみ"], mnemonicFr: "La DÉMANGEAISON l'empêche de dormir paisiblement.", targetKanji: ["痒"] },

  // 胎 (Fœtus) - Level 58
  { word: "胎児", meanings: ["Fœtus"], readings: ["たいじ"], mnemonicFr: "Le FŒTUS se développe dans le ventre de la mère.", targetKanji: ["胎", "児"] },
  { word: "胎内", meanings: ["Dans l'utérus"], readings: ["たいない"], mnemonicFr: "DANS L'UTÉRUS, le bébé grandit en sécurité.", targetKanji: ["胎", "内"] },

  // 藩 (Clan) - Level 58
  { word: "藩主", meanings: ["Seigneur féodal"], readings: ["はんしゅ"], mnemonicFr: "Le SEIGNEUR FÉODAL dirige son CLAN avec autorité.", targetKanji: ["藩", "主"] },
  { word: "藩士", meanings: ["Samouraï de clan"], readings: ["はんし"], mnemonicFr: "Le SAMOURAÏ DE CLAN sert fidèlement son seigneur.", targetKanji: ["藩", "士"] },

  // === LEVEL 59 ===

  // 茂 (Luxuriant) - Level 59
  { word: "茂る", meanings: ["Pousser abondamment"], readings: ["しげる"], mnemonicFr: "Les plantes POUSSENT ABONDAMMENT dans la forêt LUXURIANTE.", targetKanji: ["茂"] },
  { word: "繁茂", meanings: ["Luxuriance"], readings: ["はんも"], mnemonicFr: "La LUXURIANCE de la végétation est impressionnante.", targetKanji: ["繁", "茂"] },

  // 滴 (Goutte) - Level 59
  { word: "滴", meanings: ["Goutte"], readings: ["しずく"], mnemonicFr: "Une GOUTTE de rosée perle sur le pétale de la fleur.", targetKanji: ["滴"] },
  { word: "水滴", meanings: ["Goutte d'eau"], readings: ["すいてき"], mnemonicFr: "Les GOUTTES D'EAU brillent au soleil du matin.", targetKanji: ["水", "滴"] },

  // 舷 (Bord du navire) - Level 59
  { word: "舷側", meanings: ["Flanc du navire"], readings: ["げんそく"], mnemonicFr: "Le FLANC DU NAVIRE est peint en noir et blanc.", targetKanji: ["舷", "側"] },
  { word: "右舷", meanings: ["Tribord"], readings: ["うげん"], mnemonicFr: "TRIBORD est le côté droit du navire, le BORD droit.", targetKanji: ["右", "舷"] },

  // 湧 (Jaillir) - Level 59
  { word: "湧く", meanings: ["Jaillir", "Sourdre"], readings: ["わく"], mnemonicFr: "L'eau JAILLIT de la source avec force et fraîcheur.", targetKanji: ["湧"] },
  { word: "湧水", meanings: ["Eau de source"], readings: ["ゆうすい"], mnemonicFr: "L'EAU DE SOURCE JAILLIT des profondeurs de la montagne.", targetKanji: ["湧", "水"] },

  // 靄 (Brume) - Level 59
  { word: "靄", meanings: ["Brume", "Brouillard"], readings: ["もや"], mnemonicFr: "La BRUME matinale enveloppe la vallée d'un voile mystérieux.", targetKanji: ["靄"] },

  // 殊 (Spécial) - Level 59
  { word: "特殊", meanings: ["Spécial", "Particulier"], readings: ["とくしゅ"], mnemonicFr: "Ce cas SPÉCIAL nécessite une attention PARTICULIÈRE.", targetKanji: ["特", "殊"] },
  { word: "殊に", meanings: ["Particulièrement"], readings: ["ことに"], mnemonicFr: "Il est PARTICULIÈREMENT doué pour la musique.", targetKanji: ["殊"] },
];

async function main() {
  console.log("=== ADDING VOCABULARY FOR KANJI WITHOUT VOCABULARY ===\n");

  // Get existing vocabulary
  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  // Get all kanji with their levels
  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, levelId: true }
  });
  const kanjiMap = new Map(allKanji.map(k => [k.character, { id: k.id, levelId: k.levelId }]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  let added = 0;
  let skipped = 0;
  let errors = 0;

  for (const vocab of missingVocab) {
    if (existingWords.has(vocab.word)) {
      console.log(`Skipping ${vocab.word} - already exists`);
      skipped++;
      continue;
    }

    // Check which kanji are in the word
    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    // Check for any kanji not in our database
    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));
    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skipped++;
      continue;
    }

    // Calculate level based on highest kanji level
    let maxLevel = 1;
    for (const char of wordKanji) {
      const kanjiInfo = kanjiMap.get(char);
      if (kanjiInfo && kanjiInfo.levelId > maxLevel) {
        maxLevel = kanjiInfo.levelId;
      }
    }

    try {
      // Create vocabulary
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
        const kanjiInfo = kanjiMap.get(char);
        if (kanjiInfo) {
          await prisma.vocabularyKanji.create({
            data: {
              vocabularyId: newVocab.id,
              kanjiId: kanjiInfo.id
            }
          }).catch(() => {
            // Ignore duplicate link errors
          });
        }
      }

      console.log(`Added: ${vocab.word} (Level ${maxLevel})`);
      added++;
    } catch (e: any) {
      if (e.code === "P2002") {
        console.log(`Skipping ${vocab.word} - duplicate`);
        skipped++;
      } else {
        console.error(`Error adding ${vocab.word}: ${e.message}`);
        errors++;
      }
    }
  }

  // Final statistics
  const totalVocab = await prisma.vocabulary.count();

  // Check remaining kanji without vocabulary
  const kanjiWithoutVocab = await prisma.$queryRaw`
    SELECT k.id, k.character, k."meaningsFr"[1] as meaning, k."levelId"
    FROM "Kanji" k
    LEFT JOIN "VocabularyKanji" vk ON k.id = vk."kanjiId"
    WHERE vk."kanjiId" IS NULL
    ORDER BY k."levelId", k.id
  ` as any[];

  console.log("\n=== SUMMARY ===");
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total vocabulary: ${totalVocab}`);
  console.log(`Remaining kanji without vocabulary: ${kanjiWithoutVocab.length}`);

  if (kanjiWithoutVocab.length > 0) {
    console.log("\nKanji still needing vocabulary:");
    for (const k of kanjiWithoutVocab) {
      console.log(`  ${k.character} (${k.meaning}) - Level ${k.levelId}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
