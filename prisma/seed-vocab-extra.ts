import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Extra vocabulary to reach 6000 - focusing on unique combinations
const extraVocab = [
  // Using new kanji: 軽, 嬉, 役, 州, 冊, 枚, 羽, 皿
  { word: "軽い", meanings: ["Léger"], readings: ["かるい"], mnemonicFr: "LÉGER - Pas lourd.", targetKanji: ["軽"] },
  { word: "軽減", meanings: ["Réduction"], readings: ["けいげん"], mnemonicFr: "RÉDUCTION - Diminution du poids.", targetKanji: ["軽", "減"] },
  { word: "軽食", meanings: ["Collation"], readings: ["けいしょく"], mnemonicFr: "COLLATION - Repas léger.", targetKanji: ["軽", "食"] },
  { word: "軽量", meanings: ["Poids léger"], readings: ["けいりょう"], mnemonicFr: "POIDS LÉGER - De faible poids.", targetKanji: ["軽", "量"] },
  { word: "気軽", meanings: ["Décontracté"], readings: ["きがる"], mnemonicFr: "DÉCONTRACTÉ - Esprit léger.", targetKanji: ["気", "軽"] },
  { word: "手軽", meanings: ["Facile", "Simple"], readings: ["てがる"], mnemonicFr: "FACILE - Léger à faire.", targetKanji: ["手", "軽"] },
  { word: "身軽", meanings: ["Agile"], readings: ["みがる"], mnemonicFr: "AGILE - Corps léger.", targetKanji: ["身", "軽"] },

  { word: "嬉しい", meanings: ["Content", "Heureux"], readings: ["うれしい"], mnemonicFr: "CONTENT - Rempli de joie.", targetKanji: ["嬉"] },
  { word: "嬉しさ", meanings: ["Joie", "Bonheur"], readings: ["うれしさ"], mnemonicFr: "JOIE - L'état d'être content.", targetKanji: ["嬉"] },

  { word: "役", meanings: ["Rôle", "Fonction"], readings: ["やく"], mnemonicFr: "RÔLE - Une fonction à remplir.", targetKanji: ["役"] },
  { word: "役目", meanings: ["Rôle", "Devoir"], readings: ["やくめ"], mnemonicFr: "DEVOIR - Rôle à accomplir.", targetKanji: ["役", "目"] },
  { word: "役割", meanings: ["Rôle", "Part"], readings: ["やくわり"], mnemonicFr: "RÔLE - Part à jouer.", targetKanji: ["役", "割"] },
  { word: "役所", meanings: ["Mairie", "Bureau"], readings: ["やくしょ"], mnemonicFr: "MAIRIE - Bureau administratif.", targetKanji: ["役", "所"] },
  { word: "役員", meanings: ["Dirigeant"], readings: ["やくいん"], mnemonicFr: "DIRIGEANT - Membre du conseil.", targetKanji: ["役", "員"] },
  { word: "役立つ", meanings: ["Être utile"], readings: ["やくだつ"], mnemonicFr: "ÊTRE UTILE - Servir à quelque chose.", targetKanji: ["役", "立"] },
  { word: "役に立つ", meanings: ["Être utile"], readings: ["やくにたつ"], mnemonicFr: "ÊTRE UTILE - Rendre service.", targetKanji: ["役", "立"] },
  { word: "役者", meanings: ["Acteur"], readings: ["やくしゃ"], mnemonicFr: "ACTEUR - Celui qui joue un rôle.", targetKanji: ["役", "者"] },
  { word: "主役", meanings: ["Rôle principal"], readings: ["しゅやく"], mnemonicFr: "RÔLE PRINCIPAL - Le personnage principal.", targetKanji: ["主", "役"] },

  { word: "九州", meanings: ["Kyushu"], readings: ["きゅうしゅう"], mnemonicFr: "KYUSHU - L'île du sud du Japon.", targetKanji: ["九", "州"] },
  { word: "本州", meanings: ["Honshu"], readings: ["ほんしゅう"], mnemonicFr: "HONSHU - L'île principale du Japon.", targetKanji: ["本", "州"] },
  { word: "州", meanings: ["État", "Province"], readings: ["しゅう"], mnemonicFr: "ÉTAT - Région administrative.", targetKanji: ["州"] },

  { word: "一冊", meanings: ["Un livre"], readings: ["いっさつ"], mnemonicFr: "UN LIVRE - Un volume.", targetKanji: ["一", "冊"] },
  { word: "二冊", meanings: ["Deux livres"], readings: ["にさつ"], mnemonicFr: "DEUX LIVRES - Deux volumes.", targetKanji: ["二", "冊"] },
  { word: "三冊", meanings: ["Trois livres"], readings: ["さんさつ"], mnemonicFr: "TROIS LIVRES - Trois volumes.", targetKanji: ["三", "冊"] },
  { word: "何冊", meanings: ["Combien de livres"], readings: ["なんさつ"], mnemonicFr: "COMBIEN DE LIVRES - Nombre de volumes.", targetKanji: ["何", "冊"] },
  { word: "冊子", meanings: ["Brochure", "Livret"], readings: ["さっし"], mnemonicFr: "BROCHURE - Petit livre.", targetKanji: ["冊", "子"] },

  { word: "一枚", meanings: ["Une feuille"], readings: ["いちまい"], mnemonicFr: "UNE FEUILLE - Un objet plat.", targetKanji: ["一", "枚"] },
  { word: "二枚", meanings: ["Deux feuilles"], readings: ["にまい"], mnemonicFr: "DEUX FEUILLES - Deux objets plats.", targetKanji: ["二", "枚"] },
  { word: "三枚", meanings: ["Trois feuilles"], readings: ["さんまい"], mnemonicFr: "TROIS FEUILLES - Trois objets plats.", targetKanji: ["三", "枚"] },
  { word: "何枚", meanings: ["Combien de feuilles"], readings: ["なんまい"], mnemonicFr: "COMBIEN DE FEUILLES - Nombre d'objets plats.", targetKanji: ["何", "枚"] },
  { word: "枚数", meanings: ["Nombre de feuilles"], readings: ["まいすう"], mnemonicFr: "NOMBRE DE FEUILLES - Comptage.", targetKanji: ["枚", "数"] },

  { word: "一羽", meanings: ["Un oiseau"], readings: ["いちわ"], mnemonicFr: "UN OISEAU - Compteur pour oiseaux.", targetKanji: ["一", "羽"] },
  { word: "二羽", meanings: ["Deux oiseaux"], readings: ["にわ"], mnemonicFr: "DEUX OISEAUX - Deux volatiles.", targetKanji: ["二", "羽"] },
  { word: "羽", meanings: ["Plume", "Aile"], readings: ["はね"], mnemonicFr: "PLUME - Aile d'oiseau.", targetKanji: ["羽"] },
  { word: "羽根", meanings: ["Plume", "Aile"], readings: ["はね"], mnemonicFr: "PLUME - Partie d'un oiseau.", targetKanji: ["羽", "根"] },

  { word: "皿", meanings: ["Assiette"], readings: ["さら"], mnemonicFr: "ASSIETTE - Plat pour servir.", targetKanji: ["皿"] },
  { word: "皿洗い", meanings: ["Lavage de vaisselle"], readings: ["さらあらい"], mnemonicFr: "LAVAGE DE VAISSELLE - Laver les assiettes.", targetKanji: ["皿", "洗"] },
  { word: "小皿", meanings: ["Petite assiette"], readings: ["こざら"], mnemonicFr: "PETITE ASSIETTE - Soucoupe.", targetKanji: ["小", "皿"] },
  { word: "大皿", meanings: ["Grande assiette"], readings: ["おおざら"], mnemonicFr: "GRANDE ASSIETTE - Plat de service.", targetKanji: ["大", "皿"] },
  { word: "灰皿", meanings: ["Cendrier"], readings: ["はいざら"], mnemonicFr: "CENDRIER - Assiette pour cendres.", targetKanji: ["灰", "皿"] },

  // More useful vocabulary
  { word: "出来事", meanings: ["Événement"], readings: ["できごと"], mnemonicFr: "ÉVÉNEMENT - Ce qui se passe.", targetKanji: ["出", "来", "事"] },
  { word: "見物", meanings: ["Visite", "Tourisme"], readings: ["けんぶつ"], mnemonicFr: "VISITE - Regarder des choses.", targetKanji: ["見", "物"] },
  { word: "見学", meanings: ["Visite éducative"], readings: ["けんがく"], mnemonicFr: "VISITE ÉDUCATIVE - Apprendre en regardant.", targetKanji: ["見", "学"] },
  { word: "見本", meanings: ["Échantillon"], readings: ["みほん"], mnemonicFr: "ÉCHANTILLON - Exemple à voir.", targetKanji: ["見", "本"] },
  { word: "日帰り", meanings: ["Aller-retour dans la journée"], readings: ["ひがえり"], mnemonicFr: "ALLER-RETOUR - Partir et revenir le même jour.", targetKanji: ["日", "帰"] },
  { word: "出入口", meanings: ["Entrée et sortie"], readings: ["でいりぐち"], mnemonicFr: "ENTRÉE ET SORTIE - Passage.", targetKanji: ["出", "入", "口"] },
  { word: "火事", meanings: ["Incendie"], readings: ["かじ"], mnemonicFr: "INCENDIE - Feu accidentel.", targetKanji: ["火", "事"] },
  { word: "水道", meanings: ["Eau courante"], readings: ["すいどう"], mnemonicFr: "EAU COURANTE - Système d'eau.", targetKanji: ["水", "道"] },
  { word: "水曜", meanings: ["Mercredi"], readings: ["すいよう"], mnemonicFr: "MERCREDI - Jour de l'eau.", targetKanji: ["水", "曜"] },
  { word: "木曜", meanings: ["Jeudi"], readings: ["もくよう"], mnemonicFr: "JEUDI - Jour du bois.", targetKanji: ["木", "曜"] },
  { word: "金曜", meanings: ["Vendredi"], readings: ["きんよう"], mnemonicFr: "VENDREDI - Jour de l'or.", targetKanji: ["金", "曜"] },
  { word: "土曜", meanings: ["Samedi"], readings: ["どよう"], mnemonicFr: "SAMEDI - Jour de la terre.", targetKanji: ["土", "曜"] },
  { word: "日曜", meanings: ["Dimanche"], readings: ["にちよう"], mnemonicFr: "DIMANCHE - Jour du soleil.", targetKanji: ["日", "曜"] },
  { word: "平日", meanings: ["Jour de semaine"], readings: ["へいじつ"], mnemonicFr: "JOUR DE SEMAINE - Jour ordinaire.", targetKanji: ["平", "日"] },
  { word: "週末", meanings: ["Week-end"], readings: ["しゅうまつ"], mnemonicFr: "WEEK-END - Fin de semaine.", targetKanji: ["週", "末"] },
  { word: "月末", meanings: ["Fin du mois"], readings: ["げつまつ"], mnemonicFr: "FIN DU MOIS - Dernier jour.", targetKanji: ["月", "末"] },
  { word: "年末", meanings: ["Fin d'année"], readings: ["ねんまつ"], mnemonicFr: "FIN D'ANNÉE - Dernier moment.", targetKanji: ["年", "末"] },
  { word: "年始", meanings: ["Nouvel an"], readings: ["ねんし"], mnemonicFr: "NOUVEL AN - Début d'année.", targetKanji: ["年", "始"] },
  { word: "正月", meanings: ["Nouvel an"], readings: ["しょうがつ"], mnemonicFr: "NOUVEL AN - Premier mois.", targetKanji: ["正", "月"] },
  { word: "生年月日", meanings: ["Date de naissance"], readings: ["せいねんがっぴ"], mnemonicFr: "DATE DE NAISSANCE - Année mois jour de naissance.", targetKanji: ["生", "年", "月", "日"] },

  // More compound words
  { word: "山道", meanings: ["Chemin de montagne"], readings: ["やまみち"], mnemonicFr: "CHEMIN DE MONTAGNE - Sentier.", targetKanji: ["山", "道"] },
  { word: "川辺", meanings: ["Bord de rivière"], readings: ["かわべ"], mnemonicFr: "BORD DE RIVIÈRE - Berge.", targetKanji: ["川", "辺"] },
  { word: "海辺", meanings: ["Bord de mer"], readings: ["うみべ"], mnemonicFr: "BORD DE MER - Côte.", targetKanji: ["海", "辺"] },
  { word: "道路", meanings: ["Route"], readings: ["どうろ"], mnemonicFr: "ROUTE - Voie de circulation.", targetKanji: ["道", "路"] },
  { word: "線路", meanings: ["Voie ferrée"], readings: ["せんろ"], mnemonicFr: "VOIE FERRÉE - Rails.", targetKanji: ["線", "路"] },
  { word: "進路", meanings: ["Direction"], readings: ["しんろ"], mnemonicFr: "DIRECTION - Chemin à suivre.", targetKanji: ["進", "路"] },
  { word: "通路", meanings: ["Passage"], readings: ["つうろ"], mnemonicFr: "PASSAGE - Couloir.", targetKanji: ["通", "路"] },

  // School and education
  { word: "校長", meanings: ["Directeur d'école"], readings: ["こうちょう"], mnemonicFr: "DIRECTEUR - Chef de l'école.", targetKanji: ["校", "長"] },
  { word: "学長", meanings: ["Président d'université"], readings: ["がくちょう"], mnemonicFr: "PRÉSIDENT - Chef de l'université.", targetKanji: ["学", "長"] },
  { word: "教科", meanings: ["Matière scolaire"], readings: ["きょうか"], mnemonicFr: "MATIÈRE - Sujet enseigné.", targetKanji: ["教", "科"] },
  { word: "教科書", meanings: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "MANUEL - Livre de cours.", targetKanji: ["教", "科", "書"] },
  { word: "参考", meanings: ["Référence"], readings: ["さんこう"], mnemonicFr: "RÉFÉRENCE - Information utile.", targetKanji: ["参", "考"] },
  { word: "参考書", meanings: ["Livre de référence"], readings: ["さんこうしょ"], mnemonicFr: "LIVRE DE RÉFÉRENCE - Guide d'étude.", targetKanji: ["参", "考", "書"] },

  // Work and business
  { word: "会議室", meanings: ["Salle de réunion"], readings: ["かいぎしつ"], mnemonicFr: "SALLE DE RÉUNION - Lieu de discussion.", targetKanji: ["会", "議", "室"] },
  { word: "事務室", meanings: ["Bureau"], readings: ["じむしつ"], mnemonicFr: "BUREAU - Salle de travail.", targetKanji: ["事", "務", "室"] },
  { word: "社内", meanings: ["Interne à l'entreprise"], readings: ["しゃない"], mnemonicFr: "INTERNE - Dans l'entreprise.", targetKanji: ["社", "内"] },
  { word: "社外", meanings: ["Externe à l'entreprise"], readings: ["しゃがい"], mnemonicFr: "EXTERNE - Hors de l'entreprise.", targetKanji: ["社", "外"] },
  { word: "出社", meanings: ["Arriver au travail"], readings: ["しゅっしゃ"], mnemonicFr: "ARRIVER AU TRAVAIL - Venir au bureau.", targetKanji: ["出", "社"] },
  { word: "退社", meanings: ["Quitter le travail"], readings: ["たいしゃ"], mnemonicFr: "QUITTER LE TRAVAIL - Partir du bureau.", targetKanji: ["退", "社"] },

  // More everyday vocabulary
  { word: "買い出し", meanings: ["Faire les courses"], readings: ["かいだし"], mnemonicFr: "FAIRE LES COURSES - Acheter en quantité.", targetKanji: ["買", "出"] },
  { word: "売り出し", meanings: ["Soldes"], readings: ["うりだし"], mnemonicFr: "SOLDES - Vente promotionnelle.", targetKanji: ["売", "出"] },
  { word: "売り場", meanings: ["Rayon"], readings: ["うりば"], mnemonicFr: "RAYON - Lieu de vente.", targetKanji: ["売", "場"] },
  { word: "売り切れ", meanings: ["Épuisé"], readings: ["うりきれ"], mnemonicFr: "ÉPUISÉ - Plus en stock.", targetKanji: ["売", "切"] },
  { word: "売り上げ", meanings: ["Chiffre d'affaires"], readings: ["うりあげ"], mnemonicFr: "CHIFFRE D'AFFAIRES - Ventes totales.", targetKanji: ["売", "上"] },
  { word: "買い取り", meanings: ["Rachat"], readings: ["かいとり"], mnemonicFr: "RACHAT - Acheter d'occasion.", targetKanji: ["買", "取"] },
  { word: "買い替え", meanings: ["Remplacement"], readings: ["かいかえ"], mnemonicFr: "REMPLACEMENT - Acheter un nouveau.", targetKanji: ["買", "替"] },

  // Nature and weather
  { word: "大雨", meanings: ["Forte pluie"], readings: ["おおあめ"], mnemonicFr: "FORTE PLUIE - Pluie abondante.", targetKanji: ["大", "雨"] },
  { word: "小雨", meanings: ["Petite pluie"], readings: ["こさめ"], mnemonicFr: "PETITE PLUIE - Bruine.", targetKanji: ["小", "雨"] },
  { word: "大雪", meanings: ["Forte neige"], readings: ["おおゆき"], mnemonicFr: "FORTE NEIGE - Neige abondante.", targetKanji: ["大", "雪"] },
  { word: "吹雪", meanings: ["Tempête de neige"], readings: ["ふぶき"], mnemonicFr: "TEMPÊTE DE NEIGE - Blizzard.", targetKanji: ["吹", "雪"] },
  { word: "梅雨", meanings: ["Saison des pluies"], readings: ["つゆ"], mnemonicFr: "SAISON DES PLUIES - Mousson japonaise.", targetKanji: ["梅", "雨"] },
  { word: "日光", meanings: ["Lumière du soleil"], readings: ["にっこう"], mnemonicFr: "LUMIÈRE DU SOLEIL - Rayons solaires.", targetKanji: ["日", "光"] },
  { word: "月光", meanings: ["Clair de lune"], readings: ["げっこう"], mnemonicFr: "CLAIR DE LUNE - Lumière lunaire.", targetKanji: ["月", "光"] },
  { word: "日の出", meanings: ["Lever du soleil"], readings: ["ひので"], mnemonicFr: "LEVER DU SOLEIL - Aube.", targetKanji: ["日", "出"] },
  { word: "日の入り", meanings: ["Coucher du soleil"], readings: ["ひのいり"], mnemonicFr: "COUCHER DU SOLEIL - Crépuscule.", targetKanji: ["日", "入"] },

  // Actions and states
  { word: "心配事", meanings: ["Souci"], readings: ["しんぱいごと"], mnemonicFr: "SOUCI - Chose qui inquiète.", targetKanji: ["心", "配", "事"] },
  { word: "出来上がり", meanings: ["Achèvement"], readings: ["できあがり"], mnemonicFr: "ACHÈVEMENT - Finition.", targetKanji: ["出", "来", "上"] },
  { word: "出来上がる", meanings: ["Être achevé"], readings: ["できあがる"], mnemonicFr: "ÊTRE ACHEVÉ - Être terminé.", targetKanji: ["出", "来", "上"] },
  { word: "取り入れる", meanings: ["Adopter"], readings: ["とりいれる"], mnemonicFr: "ADOPTER - Prendre et intégrer.", targetKanji: ["取", "入"] },
  { word: "取り出す", meanings: ["Sortir"], readings: ["とりだす"], mnemonicFr: "SORTIR - Extraire.", targetKanji: ["取", "出"] },
  { word: "引き出す", meanings: ["Retirer"], readings: ["ひきだす"], mnemonicFr: "RETIRER - Tirer dehors.", targetKanji: ["引", "出"] },
  { word: "押し出す", meanings: ["Pousser dehors"], readings: ["おしだす"], mnemonicFr: "POUSSER DEHORS - Expulser.", targetKanji: ["押", "出"] },
  { word: "飛び出す", meanings: ["Bondir dehors"], readings: ["とびだす"], mnemonicFr: "BONDIR DEHORS - Surgir.", targetKanji: ["飛", "出"] },
  { word: "走り出す", meanings: ["Se mettre à courir"], readings: ["はしりだす"], mnemonicFr: "SE METTRE À COURIR - Commencer à courir.", targetKanji: ["走", "出"] },

  // Family and relationships
  { word: "親友", meanings: ["Meilleur ami"], readings: ["しんゆう"], mnemonicFr: "MEILLEUR AMI - Ami proche.", targetKanji: ["親", "友"] },
  { word: "友情", meanings: ["Amitié"], readings: ["ゆうじょう"], mnemonicFr: "AMITIÉ - Lien d'amis.", targetKanji: ["友", "情"] },
  { word: "愛情", meanings: ["Amour"], readings: ["あいじょう"], mnemonicFr: "AMOUR - Sentiment d'affection.", targetKanji: ["愛", "情"] },
  { word: "感情", meanings: ["Émotion"], readings: ["かんじょう"], mnemonicFr: "ÉMOTION - Sentiment.", targetKanji: ["感", "情"] },
  { word: "表情", meanings: ["Expression"], readings: ["ひょうじょう"], mnemonicFr: "EXPRESSION - Visage.", targetKanji: ["表", "情"] },
  { word: "事情", meanings: ["Circonstances"], readings: ["じじょう"], mnemonicFr: "CIRCONSTANCES - Situation.", targetKanji: ["事", "情"] },

  // Technology and modern life
  { word: "電源", meanings: ["Alimentation"], readings: ["でんげん"], mnemonicFr: "ALIMENTATION - Source électrique.", targetKanji: ["電", "源"] },
  { word: "電力", meanings: ["Électricité"], readings: ["でんりょく"], mnemonicFr: "ÉLECTRICITÉ - Puissance électrique.", targetKanji: ["電", "力"] },
  { word: "電池", meanings: ["Pile"], readings: ["でんち"], mnemonicFr: "PILE - Batterie.", targetKanji: ["電", "池"] },
  { word: "電球", meanings: ["Ampoule"], readings: ["でんきゅう"], mnemonicFr: "AMPOULE - Globe lumineux.", targetKanji: ["電", "球"] },
  { word: "電子", meanings: ["Électronique"], readings: ["でんし"], mnemonicFr: "ÉLECTRONIQUE - Particule électrique.", targetKanji: ["電", "子"] },

  // Additional useful vocabulary
  { word: "本当", meanings: ["Vraiment"], readings: ["ほんとう"], mnemonicFr: "VRAIMENT - La vérité.", targetKanji: ["本", "当"] },
  { word: "本気", meanings: ["Sérieux"], readings: ["ほんき"], mnemonicFr: "SÉRIEUX - Esprit vrai.", targetKanji: ["本", "気"] },
  { word: "本音", meanings: ["Vrai sentiment"], readings: ["ほんね"], mnemonicFr: "VRAI SENTIMENT - Pensée réelle.", targetKanji: ["本", "音"] },
  { word: "本物", meanings: ["Authentique"], readings: ["ほんもの"], mnemonicFr: "AUTHENTIQUE - Vrai objet.", targetKanji: ["本", "物"] },
  { word: "本人", meanings: ["La personne elle-même"], readings: ["ほんにん"], mnemonicFr: "LA PERSONNE ELLE-MÊME - L'intéressé.", targetKanji: ["本", "人"] },
  { word: "本来", meanings: ["À l'origine"], readings: ["ほんらい"], mnemonicFr: "À L'ORIGINE - Initialement.", targetKanji: ["本", "来"] },

  // More compound words
  { word: "名所", meanings: ["Lieu célèbre"], readings: ["めいしょ"], mnemonicFr: "LIEU CÉLÈBRE - Site touristique.", targetKanji: ["名", "所"] },
  { word: "名作", meanings: ["Chef-d'œuvre"], readings: ["めいさく"], mnemonicFr: "CHEF-D'ŒUVRE - Œuvre célèbre.", targetKanji: ["名", "作"] },
  { word: "名物", meanings: ["Spécialité"], readings: ["めいぶつ"], mnemonicFr: "SPÉCIALITÉ - Chose célèbre.", targetKanji: ["名", "物"] },
  { word: "名刺", meanings: ["Carte de visite"], readings: ["めいし"], mnemonicFr: "CARTE DE VISITE - Carte avec le nom.", targetKanji: ["名", "刺"] },
  { word: "名字", meanings: ["Nom de famille"], readings: ["みょうじ"], mnemonicFr: "NOM DE FAMILLE - Patronyme.", targetKanji: ["名", "字"] },

  // Time and scheduling
  { word: "時間帯", meanings: ["Tranche horaire"], readings: ["じかんたい"], mnemonicFr: "TRANCHE HORAIRE - Période de temps.", targetKanji: ["時", "間", "帯"] },
  { word: "時間割", meanings: ["Emploi du temps"], readings: ["じかんわり"], mnemonicFr: "EMPLOI DU TEMPS - Programme horaire.", targetKanji: ["時", "間", "割"] },
  { word: "時間外", meanings: ["En dehors des heures"], readings: ["じかんがい"], mnemonicFr: "EN DEHORS DES HEURES - Hors horaire.", targetKanji: ["時", "間", "外"] },
  { word: "時間内", meanings: ["Dans les heures"], readings: ["じかんない"], mnemonicFr: "DANS LES HEURES - Pendant les heures.", targetKanji: ["時", "間", "内"] },

  // More everyday words
  { word: "手書き", meanings: ["Manuscrit"], readings: ["てがき"], mnemonicFr: "MANUSCRIT - Écrit à la main.", targetKanji: ["手", "書"] },
  { word: "手作り", meanings: ["Fait main"], readings: ["てづくり"], mnemonicFr: "FAIT MAIN - Fabriqué à la main.", targetKanji: ["手", "作"] },
  { word: "手入れ", meanings: ["Entretien"], readings: ["ていれ"], mnemonicFr: "ENTRETIEN - Soin apporté.", targetKanji: ["手", "入"] },
  { word: "手順", meanings: ["Procédure"], readings: ["てじゅん"], mnemonicFr: "PROCÉDURE - Ordre des étapes.", targetKanji: ["手", "順"] },
  { word: "手間", meanings: ["Effort"], readings: ["てま"], mnemonicFr: "EFFORT - Travail nécessaire.", targetKanji: ["手", "間"] },
  { word: "手数", meanings: ["Dérangement"], readings: ["てすう"], mnemonicFr: "DÉRANGEMENT - Peine causée.", targetKanji: ["手", "数"] },
  { word: "手数料", meanings: ["Frais"], readings: ["てすうりょう"], mnemonicFr: "FRAIS - Commission.", targetKanji: ["手", "数", "料"] },

  // Communication
  { word: "連絡先", meanings: ["Coordonnées"], readings: ["れんらくさき"], mnemonicFr: "COORDONNÉES - Informations de contact.", targetKanji: ["連", "絡", "先"] },
  { word: "連絡網", meanings: ["Réseau de contact"], readings: ["れんらくもう"], mnemonicFr: "RÉSEAU DE CONTACT - Liste téléphonique.", targetKanji: ["連", "絡", "網"] },
  { word: "伝言", meanings: ["Message"], readings: ["でんごん"], mnemonicFr: "MESSAGE - Parole transmise.", targetKanji: ["伝", "言"] },
  { word: "発言", meanings: ["Déclaration"], readings: ["はつげん"], mnemonicFr: "DÉCLARATION - Prendre la parole.", targetKanji: ["発", "言"] },
  { word: "無言", meanings: ["Silence"], readings: ["むごん"], mnemonicFr: "SILENCE - Sans parole.", targetKanji: ["無", "言"] },

  // Final batch
  { word: "行動", meanings: ["Action"], readings: ["こうどう"], mnemonicFr: "ACTION - Comportement.", targetKanji: ["行", "動"] },
  { word: "活動", meanings: ["Activité"], readings: ["かつどう"], mnemonicFr: "ACTIVITÉ - Action vivante.", targetKanji: ["活", "動"] },
  { word: "運動", meanings: ["Exercice"], readings: ["うんどう"], mnemonicFr: "EXERCICE - Mouvement physique.", targetKanji: ["運", "動"] },
  { word: "動物", meanings: ["Animal"], readings: ["どうぶつ"], mnemonicFr: "ANIMAL - Être qui bouge.", targetKanji: ["動", "物"] },
  { word: "動画", meanings: ["Vidéo"], readings: ["どうが"], mnemonicFr: "VIDÉO - Image en mouvement.", targetKanji: ["動", "画"] },
  { word: "感動", meanings: ["Émotion"], readings: ["かんどう"], mnemonicFr: "ÉMOTION - Être touché.", targetKanji: ["感", "動"] },
  { word: "自動", meanings: ["Automatique"], readings: ["じどう"], mnemonicFr: "AUTOMATIQUE - Qui bouge seul.", targetKanji: ["自", "動"] },
  { word: "手動", meanings: ["Manuel"], readings: ["しゅどう"], mnemonicFr: "MANUEL - Actionné à la main.", targetKanji: ["手", "動"] },

  // More useful words
  { word: "目次", meanings: ["Table des matières"], readings: ["もくじ"], mnemonicFr: "TABLE DES MATIÈRES - Liste des chapitres.", targetKanji: ["目", "次"] },
  { word: "注目", meanings: ["Attention"], readings: ["ちゅうもく"], mnemonicFr: "ATTENTION - Fixer les yeux.", targetKanji: ["注", "目"] },
  { word: "着目", meanings: ["Remarquer"], readings: ["ちゃくもく"], mnemonicFr: "REMARQUER - Porter attention.", targetKanji: ["着", "目"] },
  { word: "科目", meanings: ["Matière"], readings: ["かもく"], mnemonicFr: "MATIÈRE - Sujet d'étude.", targetKanji: ["科", "目"] },
  { word: "項目", meanings: ["Article"], readings: ["こうもく"], mnemonicFr: "ARTICLE - Point de liste.", targetKanji: ["項", "目"] },
  { word: "種目", meanings: ["Épreuve"], readings: ["しゅもく"], mnemonicFr: "ÉPREUVE - Type de compétition.", targetKanji: ["種", "目"] },

  // Additional compounds
  { word: "歴史", meanings: ["Histoire"], readings: ["れきし"], mnemonicFr: "HISTOIRE - Récit du passé.", targetKanji: ["歴", "史"] },
  { word: "歴史的", meanings: ["Historique"], readings: ["れきしてき"], mnemonicFr: "HISTORIQUE - Relatif à l'histoire.", targetKanji: ["歴", "史", "的"] },
  { word: "世界史", meanings: ["Histoire mondiale"], readings: ["せかいし"], mnemonicFr: "HISTOIRE MONDIALE - Histoire du monde.", targetKanji: ["世", "界", "史"] },
  { word: "日本史", meanings: ["Histoire du Japon"], readings: ["にほんし"], mnemonicFr: "HISTOIRE DU JAPON - Histoire japonaise.", targetKanji: ["日", "本", "史"] },

  // Modern vocabulary
  { word: "画面", meanings: ["Écran"], readings: ["がめん"], mnemonicFr: "ÉCRAN - Surface d'affichage.", targetKanji: ["画", "面"] },
  { word: "画像", meanings: ["Image"], readings: ["がぞう"], mnemonicFr: "IMAGE - Représentation visuelle.", targetKanji: ["画", "像"] },
  { word: "映画", meanings: ["Film"], readings: ["えいが"], mnemonicFr: "FILM - Image projetée.", targetKanji: ["映", "画"] },
  { word: "映像", meanings: ["Image vidéo"], readings: ["えいぞう"], mnemonicFr: "IMAGE VIDÉO - Séquence visuelle.", targetKanji: ["映", "像"] },
  { word: "反映", meanings: ["Réflexion"], readings: ["はんえい"], mnemonicFr: "RÉFLEXION - Reflet.", targetKanji: ["反", "映"] },

  // More practical vocabulary
  { word: "予定表", meanings: ["Calendrier"], readings: ["よていひょう"], mnemonicFr: "CALENDRIER - Tableau des prévisions.", targetKanji: ["予", "定", "表"] },
  { word: "時刻表", meanings: ["Horaire"], readings: ["じこくひょう"], mnemonicFr: "HORAIRE - Tableau des heures.", targetKanji: ["時", "刻", "表"] },
  { word: "一覧表", meanings: ["Liste"], readings: ["いちらんひょう"], mnemonicFr: "LISTE - Tableau récapitulatif.", targetKanji: ["一", "覧", "表"] },
  { word: "発表会", meanings: ["Présentation"], readings: ["はっぴょうかい"], mnemonicFr: "PRÉSENTATION - Réunion de présentation.", targetKanji: ["発", "表", "会"] },
];

async function main() {
  console.log("=== SEEDING EXTRA VOCABULARY ===\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  let added = 0;
  let skipped = 0;

  for (const vocab of extraVocab) {
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));
    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skipped++;
      continue;
    }

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
          }).catch(() => {});
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
