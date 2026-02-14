import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final batch of vocabulary - Part 1: New kanji vocabulary (軽, 嬉, 役, 州, 冊, 枚, 羽, 皿)
const vocabPart1 = [
  // 軽 (Leger)
  { word: "軽い", meanings: ["Leger"], readings: ["かるい"], mnemonicFr: "LEGER - qui ne pese pas lourd.", targetKanji: ["軽"] },
  { word: "軽減", meanings: ["Reduction", "Allegement"], readings: ["けいげん"], mnemonicFr: "REDUCTION - diminuer le poids ou la charge.", targetKanji: ["軽"] },
  { word: "軽食", meanings: ["Collation", "Repas leger"], readings: ["けいしょく"], mnemonicFr: "COLLATION - petit repas leger.", targetKanji: ["軽", "食"] },
  { word: "軽量", meanings: ["Leger", "Poids plume"], readings: ["けいりょう"], mnemonicFr: "POIDS LEGER - de faible masse.", targetKanji: ["軽"] },
  { word: "手軽", meanings: ["Simple", "Facile"], readings: ["てがる"], mnemonicFr: "SIMPLE - facile a faire.", targetKanji: ["手", "軽"] },
  { word: "気軽", meanings: ["Decontracte", "Sans facon"], readings: ["きがる"], mnemonicFr: "DECONTRACTE - de maniere detendue.", targetKanji: ["気", "軽"] },

  // 嬉 (Content/Joyeux)
  { word: "嬉しい", meanings: ["Content", "Heureux"], readings: ["うれしい"], mnemonicFr: "CONTENT - sentiment de joie.", targetKanji: ["嬉"] },
  { word: "嬉しがる", meanings: ["Montrer sa joie"], readings: ["うれしがる"], mnemonicFr: "MONTRER SA JOIE - exprimer son bonheur.", targetKanji: ["嬉"] },

  // 役 (Role/Service)
  { word: "役", meanings: ["Role", "Fonction"], readings: ["やく"], mnemonicFr: "ROLE - fonction a remplir.", targetKanji: ["役"] },
  { word: "役目", meanings: ["Devoir", "Role"], readings: ["やくめ"], mnemonicFr: "DEVOIR - ce qu'on doit faire.", targetKanji: ["役", "目"] },
  { word: "役割", meanings: ["Role", "Part"], readings: ["やくわり"], mnemonicFr: "ROLE - la part de chacun.", targetKanji: ["役"] },
  { word: "役所", meanings: ["Bureau administratif", "Mairie"], readings: ["やくしょ"], mnemonicFr: "BUREAU ADMINISTRATIF - lieu du gouvernement local.", targetKanji: ["役", "所"] },
  { word: "役員", meanings: ["Cadre", "Dirigeant"], readings: ["やくいん"], mnemonicFr: "CADRE - membre de la direction.", targetKanji: ["役", "員"] },
  { word: "役者", meanings: ["Acteur"], readings: ["やくしゃ"], mnemonicFr: "ACTEUR - personne qui joue un role.", targetKanji: ["役", "者"] },
  { word: "役に立つ", meanings: ["Etre utile"], readings: ["やくにたつ"], mnemonicFr: "ETRE UTILE - servir a quelque chose.", targetKanji: ["役", "立"] },
  { word: "主役", meanings: ["Role principal"], readings: ["しゅやく"], mnemonicFr: "ROLE PRINCIPAL - le personnage central.", targetKanji: ["主", "役"] },
  { word: "脇役", meanings: ["Role secondaire"], readings: ["わきやく"], mnemonicFr: "ROLE SECONDAIRE - personnage de soutien.", targetKanji: ["役"] },

  // 州 (Etat/Province)
  { word: "州", meanings: ["Etat", "Province"], readings: ["しゅう"], mnemonicFr: "ETAT - division administrative.", targetKanji: ["州"] },
  { word: "九州", meanings: ["Kyushu"], readings: ["きゅうしゅう"], mnemonicFr: "KYUSHU - ile du sud du Japon.", targetKanji: ["九", "州"] },
  { word: "本州", meanings: ["Honshu"], readings: ["ほんしゅう"], mnemonicFr: "HONSHU - ile principale du Japon.", targetKanji: ["本", "州"] },
  { word: "各州", meanings: ["Chaque etat"], readings: ["かくしゅう"], mnemonicFr: "CHAQUE ETAT - tous les etats.", targetKanji: ["各", "州"] },

  // 冊 (Volume/Compteur de livres)
  { word: "一冊", meanings: ["Un livre", "Un volume"], readings: ["いっさつ"], mnemonicFr: "UN LIVRE - compteur pour un livre.", targetKanji: ["一", "冊"] },
  { word: "二冊", meanings: ["Deux livres"], readings: ["にさつ"], mnemonicFr: "DEUX LIVRES - compteur pour deux livres.", targetKanji: ["二", "冊"] },
  { word: "三冊", meanings: ["Trois livres"], readings: ["さんさつ"], mnemonicFr: "TROIS LIVRES - compteur pour trois livres.", targetKanji: ["三", "冊"] },
  { word: "冊子", meanings: ["Brochure", "Livret"], readings: ["さっし"], mnemonicFr: "BROCHURE - petit livre.", targetKanji: ["冊"] },
  { word: "何冊", meanings: ["Combien de livres"], readings: ["なんさつ"], mnemonicFr: "COMBIEN DE LIVRES - question sur le nombre de livres.", targetKanji: ["何", "冊"] },

  // 枚 (Compteur objets plats)
  { word: "一枚", meanings: ["Un (objet plat)"], readings: ["いちまい"], mnemonicFr: "UN - compteur pour objets plats.", targetKanji: ["一", "枚"] },
  { word: "二枚", meanings: ["Deux (objets plats)"], readings: ["にまい"], mnemonicFr: "DEUX - compteur pour objets plats.", targetKanji: ["二", "枚"] },
  { word: "三枚", meanings: ["Trois (objets plats)"], readings: ["さんまい"], mnemonicFr: "TROIS - compteur pour objets plats.", targetKanji: ["三", "枚"] },
  { word: "何枚", meanings: ["Combien (objets plats)"], readings: ["なんまい"], mnemonicFr: "COMBIEN - question pour objets plats.", targetKanji: ["何", "枚"] },
  { word: "枚数", meanings: ["Nombre de feuilles"], readings: ["まいすう"], mnemonicFr: "NOMBRE DE FEUILLES - quantite d'objets plats.", targetKanji: ["枚", "数"] },

  // 羽 (Plume/Compteur oiseaux)
  { word: "羽", meanings: ["Plume", "Aile"], readings: ["はね"], mnemonicFr: "PLUME - plumage d'un oiseau.", targetKanji: ["羽"] },
  { word: "一羽", meanings: ["Un oiseau"], readings: ["いちわ"], mnemonicFr: "UN OISEAU - compteur pour un oiseau.", targetKanji: ["一", "羽"] },
  { word: "二羽", meanings: ["Deux oiseaux"], readings: ["にわ"], mnemonicFr: "DEUX OISEAUX - compteur pour deux oiseaux.", targetKanji: ["二", "羽"] },
  { word: "三羽", meanings: ["Trois oiseaux"], readings: ["さんば"], mnemonicFr: "TROIS OISEAUX - compteur pour trois oiseaux.", targetKanji: ["三", "羽"] },
  { word: "白羽", meanings: ["Plume blanche"], readings: ["しらは"], mnemonicFr: "PLUME BLANCHE - plume de couleur blanche.", targetKanji: ["白", "羽"] },

  // 皿 (Assiette)
  { word: "皿", meanings: ["Assiette"], readings: ["さら"], mnemonicFr: "ASSIETTE - vaisselle pour servir.", targetKanji: ["皿"] },
  { word: "お皿", meanings: ["Assiette (poli)"], readings: ["おさら"], mnemonicFr: "ASSIETTE - forme polie.", targetKanji: ["皿"] },
  { word: "皿洗い", meanings: ["Vaisselle", "Lavage de vaisselle"], readings: ["さらあらい"], mnemonicFr: "VAISSELLE - laver les assiettes.", targetKanji: ["皿"] },
  { word: "一皿", meanings: ["Un plat", "Une assiettee"], readings: ["ひとさら"], mnemonicFr: "UN PLAT - une portion sur assiette.", targetKanji: ["一", "皿"] },
  { word: "灰皿", meanings: ["Cendrier"], readings: ["はいざら"], mnemonicFr: "CENDRIER - recipient pour cendres.", targetKanji: ["皿"] },
  { word: "小皿", meanings: ["Petite assiette"], readings: ["こざら"], mnemonicFr: "PETITE ASSIETTE - assiette de petite taille.", targetKanji: ["小", "皿"] },

  // 匹 (Compteur petits animaux)
  { word: "一匹", meanings: ["Un (petit animal)"], readings: ["いっぴき"], mnemonicFr: "UN - compteur pour petits animaux.", targetKanji: ["一", "匹"] },
  { word: "二匹", meanings: ["Deux (petits animaux)"], readings: ["にひき"], mnemonicFr: "DEUX - compteur pour petits animaux.", targetKanji: ["二", "匹"] },
  { word: "三匹", meanings: ["Trois (petits animaux)"], readings: ["さんびき"], mnemonicFr: "TROIS - compteur pour petits animaux.", targetKanji: ["三", "匹"] },

  // 台 (Compteur machines/vehicules)
  { word: "一台", meanings: ["Une machine", "Un vehicule"], readings: ["いちだい"], mnemonicFr: "UN - compteur pour machines/vehicules.", targetKanji: ["一", "台"] },
  { word: "二台", meanings: ["Deux machines"], readings: ["にだい"], mnemonicFr: "DEUX - compteur pour machines.", targetKanji: ["二", "台"] },
  { word: "三台", meanings: ["Trois machines"], readings: ["さんだい"], mnemonicFr: "TROIS - compteur pour machines.", targetKanji: ["三", "台"] },

  // 本 (Compteur objets longs)
  { word: "一本", meanings: ["Un (objet long)"], readings: ["いっぽん"], mnemonicFr: "UN - compteur pour objets longs.", targetKanji: ["一", "本"] },
  { word: "二本", meanings: ["Deux (objets longs)"], readings: ["にほん"], mnemonicFr: "DEUX - compteur pour objets longs.", targetKanji: ["二", "本"] },
  { word: "三本", meanings: ["Trois (objets longs)"], readings: ["さんぼん"], mnemonicFr: "TROIS - compteur pour objets longs.", targetKanji: ["三", "本"] },
];

// Part 2: Body parts and health vocabulary
const vocabPart2 = [
  // Body parts
  { word: "顔", meanings: ["Visage"], readings: ["かお"], mnemonicFr: "VISAGE - face humaine.", targetKanji: ["顔"] },
  { word: "笑顔", meanings: ["Sourire"], readings: ["えがお"], mnemonicFr: "SOURIRE - visage souriant.", targetKanji: ["顔"] },
  { word: "腕", meanings: ["Bras"], readings: ["うで"], mnemonicFr: "BRAS - membre superieur.", targetKanji: ["腕"] },
  { word: "腕時計", meanings: ["Montre-bracelet"], readings: ["うでどけい"], mnemonicFr: "MONTRE-BRACELET - montre au poignet.", targetKanji: ["腕", "時", "計"] },
  { word: "指", meanings: ["Doigt"], readings: ["ゆび"], mnemonicFr: "DOIGT - extremite de la main.", targetKanji: ["指"] },
  { word: "親指", meanings: ["Pouce"], readings: ["おやゆび"], mnemonicFr: "POUCE - le doigt parent.", targetKanji: ["親", "指"] },
  { word: "人差し指", meanings: ["Index"], readings: ["ひとさしゆび"], mnemonicFr: "INDEX - doigt qui montre.", targetKanji: ["人", "指"] },
  { word: "中指", meanings: ["Majeur"], readings: ["なかゆび"], mnemonicFr: "MAJEUR - doigt du milieu.", targetKanji: ["中", "指"] },
  { word: "薬指", meanings: ["Annulaire"], readings: ["くすりゆび"], mnemonicFr: "ANNULAIRE - doigt du remede.", targetKanji: ["指"] },
  { word: "小指", meanings: ["Auriculaire", "Petit doigt"], readings: ["こゆび"], mnemonicFr: "PETIT DOIGT - le plus petit doigt.", targetKanji: ["小", "指"] },
  { word: "足", meanings: ["Pied", "Jambe"], readings: ["あし"], mnemonicFr: "PIED - membre inferieur.", targetKanji: ["足"] },
  { word: "足首", meanings: ["Cheville"], readings: ["あしくび"], mnemonicFr: "CHEVILLE - articulation du pied.", targetKanji: ["足", "首"] },
  { word: "胸", meanings: ["Poitrine"], readings: ["むね"], mnemonicFr: "POITRINE - partie avant du torse.", targetKanji: ["胸"] },
  { word: "背中", meanings: ["Dos"], readings: ["せなか"], mnemonicFr: "DOS - partie arriere du corps.", targetKanji: ["背", "中"] },
  { word: "背", meanings: ["Dos", "Taille"], readings: ["せ"], mnemonicFr: "DOS - la partie posterieure.", targetKanji: ["背"] },
  { word: "肩", meanings: ["Epaule"], readings: ["かた"], mnemonicFr: "EPAULE - haut du bras.", targetKanji: ["肩"] },
  { word: "腰", meanings: ["Hanches", "Taille"], readings: ["こし"], mnemonicFr: "HANCHES - bas du dos.", targetKanji: ["腰"] },
  { word: "膝", meanings: ["Genou"], readings: ["ひざ"], mnemonicFr: "GENOU - articulation de la jambe.", targetKanji: ["膝"] },
  { word: "爪", meanings: ["Ongle"], readings: ["つめ"], mnemonicFr: "ONGLE - bout dur du doigt.", targetKanji: ["爪"] },
  { word: "髪", meanings: ["Cheveux"], readings: ["かみ"], mnemonicFr: "CHEVEUX - poils de la tete.", targetKanji: ["髪"] },
  { word: "髪の毛", meanings: ["Cheveux"], readings: ["かみのけ"], mnemonicFr: "CHEVEUX - les poils de la tete.", targetKanji: ["髪", "毛"] },
  { word: "額", meanings: ["Front"], readings: ["ひたい"], mnemonicFr: "FRONT - partie haute du visage.", targetKanji: ["額"] },
  { word: "眉", meanings: ["Sourcil"], readings: ["まゆ"], mnemonicFr: "SOURCIL - poils au-dessus des yeux.", targetKanji: ["眉"] },
  { word: "唇", meanings: ["Levres"], readings: ["くちびる"], mnemonicFr: "LEVRES - bord de la bouche.", targetKanji: ["唇"] },
  { word: "歯", meanings: ["Dent"], readings: ["は"], mnemonicFr: "DENT - pour mordre et macher.", targetKanji: ["歯"] },
  { word: "舌", meanings: ["Langue"], readings: ["した"], mnemonicFr: "LANGUE - organe du gout.", targetKanji: ["舌"] },
  { word: "喉", meanings: ["Gorge"], readings: ["のど"], mnemonicFr: "GORGE - passage pour la nourriture.", targetKanji: ["喉"] },
  { word: "肌", meanings: ["Peau"], readings: ["はだ"], mnemonicFr: "PEAU - surface du corps.", targetKanji: ["肌"] },
  { word: "骨", meanings: ["Os"], readings: ["ほね"], mnemonicFr: "OS - structure du squelette.", targetKanji: ["骨"] },
  { word: "血", meanings: ["Sang"], readings: ["ち"], mnemonicFr: "SANG - liquide rouge vital.", targetKanji: ["血"] },
  { word: "血液", meanings: ["Sang"], readings: ["けつえき"], mnemonicFr: "SANG - fluide corporel.", targetKanji: ["血"] },

  // Health
  { word: "風邪", meanings: ["Rhume"], readings: ["かぜ"], mnemonicFr: "RHUME - maladie commune.", targetKanji: ["風"] },
  { word: "熱", meanings: ["Fievre"], readings: ["ねつ"], mnemonicFr: "FIEVRE - temperature elevee.", targetKanji: ["熱"] },
  { word: "咳", meanings: ["Toux"], readings: ["せき"], mnemonicFr: "TOUX - reaction respiratoire.", targetKanji: ["咳"] },
  { word: "頭痛", meanings: ["Mal de tete"], readings: ["ずつう"], mnemonicFr: "MAL DE TETE - douleur cranienne.", targetKanji: ["頭", "痛"] },
  { word: "腹痛", meanings: ["Mal de ventre"], readings: ["ふくつう"], mnemonicFr: "MAL DE VENTRE - douleur abdominale.", targetKanji: ["痛"] },
  { word: "歯痛", meanings: ["Mal de dents"], readings: ["しつう"], mnemonicFr: "MAL DE DENTS - douleur dentaire.", targetKanji: ["歯", "痛"] },
  { word: "薬", meanings: ["Medicament"], readings: ["くすり"], mnemonicFr: "MEDICAMENT - remede.", targetKanji: ["薬"] },
  { word: "薬局", meanings: ["Pharmacie"], readings: ["やっきょく"], mnemonicFr: "PHARMACIE - magasin de medicaments.", targetKanji: ["薬"] },
  { word: "怪我", meanings: ["Blessure"], readings: ["けが"], mnemonicFr: "BLESSURE - dommage corporel.", targetKanji: ["怪"] },
  { word: "病", meanings: ["Maladie"], readings: ["やまい"], mnemonicFr: "MALADIE - etat de mauvaise sante.", targetKanji: ["病"] },
  { word: "医者", meanings: ["Medecin"], readings: ["いしゃ"], mnemonicFr: "MEDECIN - docteur.", targetKanji: ["医", "者"] },
  { word: "看護師", meanings: ["Infirmier", "Infirmiere"], readings: ["かんごし"], mnemonicFr: "INFIRMIER - soignant.", targetKanji: ["看", "師"] },
  { word: "診察", meanings: ["Consultation medicale"], readings: ["しんさつ"], mnemonicFr: "CONSULTATION - examen medical.", targetKanji: ["察"] },
  { word: "注射", meanings: ["Piqure", "Injection"], readings: ["ちゅうしゃ"], mnemonicFr: "INJECTION - administration par aiguille.", targetKanji: ["注", "射"] },
];

// Part 3: Time vocabulary
const vocabPart3 = [
  { word: "今朝", meanings: ["Ce matin"], readings: ["けさ"], mnemonicFr: "CE MATIN - le matin d'aujourd'hui.", targetKanji: ["今", "朝"] },
  { word: "今晩", meanings: ["Ce soir"], readings: ["こんばん"], mnemonicFr: "CE SOIR - le soir d'aujourd'hui.", targetKanji: ["今"] },
  { word: "今夜", meanings: ["Cette nuit"], readings: ["こんや"], mnemonicFr: "CETTE NUIT - la nuit d'aujourd'hui.", targetKanji: ["今", "夜"] },
  { word: "昨日", meanings: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER - le jour precedent.", targetKanji: ["昨", "日"] },
  { word: "明日", meanings: ["Demain"], readings: ["あした"], mnemonicFr: "DEMAIN - le jour suivant.", targetKanji: ["明", "日"] },
  { word: "明後日", meanings: ["Apres-demain"], readings: ["あさって"], mnemonicFr: "APRES-DEMAIN - deux jours apres.", targetKanji: ["明", "後", "日"] },
  { word: "一昨日", meanings: ["Avant-hier"], readings: ["おととい"], mnemonicFr: "AVANT-HIER - deux jours avant.", targetKanji: ["一", "昨", "日"] },
  { word: "先週", meanings: ["La semaine derniere"], readings: ["せんしゅう"], mnemonicFr: "SEMAINE DERNIERE - semaine passee.", targetKanji: ["先", "週"] },
  { word: "来週", meanings: ["La semaine prochaine"], readings: ["らいしゅう"], mnemonicFr: "SEMAINE PROCHAINE - semaine suivante.", targetKanji: ["来", "週"] },
  { word: "今週", meanings: ["Cette semaine"], readings: ["こんしゅう"], mnemonicFr: "CETTE SEMAINE - semaine en cours.", targetKanji: ["今", "週"] },
  { word: "先月", meanings: ["Le mois dernier"], readings: ["せんげつ"], mnemonicFr: "MOIS DERNIER - mois passe.", targetKanji: ["先", "月"] },
  { word: "来月", meanings: ["Le mois prochain"], readings: ["らいげつ"], mnemonicFr: "MOIS PROCHAIN - mois suivant.", targetKanji: ["来", "月"] },
  { word: "今月", meanings: ["Ce mois"], readings: ["こんげつ"], mnemonicFr: "CE MOIS - mois en cours.", targetKanji: ["今", "月"] },
  { word: "去年", meanings: ["L'annee derniere"], readings: ["きょねん"], mnemonicFr: "ANNEE DERNIERE - annee passee.", targetKanji: ["去", "年"] },
  { word: "来年", meanings: ["L'annee prochaine"], readings: ["らいねん"], mnemonicFr: "ANNEE PROCHAINE - annee suivante.", targetKanji: ["来", "年"] },
  { word: "今年", meanings: ["Cette annee"], readings: ["ことし"], mnemonicFr: "CETTE ANNEE - annee en cours.", targetKanji: ["今", "年"] },
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - tous les jours.", targetKanji: ["毎", "日"] },
  { word: "毎週", meanings: ["Chaque semaine"], readings: ["まいしゅう"], mnemonicFr: "CHAQUE SEMAINE - toutes les semaines.", targetKanji: ["毎", "週"] },
  { word: "毎月", meanings: ["Chaque mois"], readings: ["まいつき"], mnemonicFr: "CHAQUE MOIS - tous les mois.", targetKanji: ["毎", "月"] },
  { word: "毎年", meanings: ["Chaque annee"], readings: ["まいとし"], mnemonicFr: "CHAQUE ANNEE - toutes les annees.", targetKanji: ["毎", "年"] },
  { word: "毎朝", meanings: ["Chaque matin"], readings: ["まいあさ"], mnemonicFr: "CHAQUE MATIN - tous les matins.", targetKanji: ["毎", "朝"] },
  { word: "毎晩", meanings: ["Chaque soir"], readings: ["まいばん"], mnemonicFr: "CHAQUE SOIR - tous les soirs.", targetKanji: ["毎"] },
  { word: "午前", meanings: ["Matin", "AM"], readings: ["ごぜん"], mnemonicFr: "MATIN - avant midi.", targetKanji: ["午", "前"] },
  { word: "午後", meanings: ["Apres-midi", "PM"], readings: ["ごご"], mnemonicFr: "APRES-MIDI - apres midi.", targetKanji: ["午", "後"] },
  { word: "正午", meanings: ["Midi"], readings: ["しょうご"], mnemonicFr: "MIDI - 12 heures.", targetKanji: ["正", "午"] },
  { word: "夜中", meanings: ["Minuit", "Milieu de la nuit"], readings: ["よなか"], mnemonicFr: "MILIEU DE LA NUIT - vers minuit.", targetKanji: ["夜", "中"] },
  { word: "朝食", meanings: ["Petit-dejeuner"], readings: ["ちょうしょく"], mnemonicFr: "PETIT-DEJEUNER - repas du matin.", targetKanji: ["朝", "食"] },
  { word: "昼食", meanings: ["Dejeuner"], readings: ["ちゅうしょく"], mnemonicFr: "DEJEUNER - repas de midi.", targetKanji: ["昼", "食"] },
  { word: "夕食", meanings: ["Diner"], readings: ["ゆうしょく"], mnemonicFr: "DINER - repas du soir.", targetKanji: ["夕", "食"] },
  { word: "夕方", meanings: ["Soir", "Crepuscule"], readings: ["ゆうがた"], mnemonicFr: "SOIR - fin d'apres-midi.", targetKanji: ["夕", "方"] },
  { word: "夜明け", meanings: ["Aube"], readings: ["よあけ"], mnemonicFr: "AUBE - debut du jour.", targetKanji: ["夜", "明"] },
  { word: "日の出", meanings: ["Lever du soleil"], readings: ["ひので"], mnemonicFr: "LEVER DU SOLEIL - apparition du soleil.", targetKanji: ["日", "出"] },
  { word: "日の入り", meanings: ["Coucher du soleil"], readings: ["ひのいり"], mnemonicFr: "COUCHER DU SOLEIL - disparition du soleil.", targetKanji: ["日", "入"] },
];

// Part 4: Place vocabulary
const vocabPart4 = [
  { word: "駅", meanings: ["Gare"], readings: ["えき"], mnemonicFr: "GARE - station de train.", targetKanji: ["駅"] },
  { word: "駅前", meanings: ["Devant la gare"], readings: ["えきまえ"], mnemonicFr: "DEVANT LA GARE - zone face a la gare.", targetKanji: ["駅", "前"] },
  { word: "駅員", meanings: ["Employe de gare"], readings: ["えきいん"], mnemonicFr: "EMPLOYE DE GARE - personnel de station.", targetKanji: ["駅", "員"] },
  { word: "空港", meanings: ["Aeroport"], readings: ["くうこう"], mnemonicFr: "AEROPORT - port aerien.", targetKanji: ["空", "港"] },
  { word: "港", meanings: ["Port"], readings: ["みなと"], mnemonicFr: "PORT - lieu d'amarrage.", targetKanji: ["港"] },
  { word: "銀行", meanings: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "BANQUE - etablissement financier.", targetKanji: ["銀", "行"] },
  { word: "郵便局", meanings: ["Bureau de poste"], readings: ["ゆうびんきょく"], mnemonicFr: "BUREAU DE POSTE - service postal.", targetKanji: ["便"] },
  { word: "交番", meanings: ["Poste de police"], readings: ["こうばん"], mnemonicFr: "POSTE DE POLICE - petit commissariat.", targetKanji: ["交", "番"] },
  { word: "消防署", meanings: ["Caserne de pompiers"], readings: ["しょうぼうしょ"], mnemonicFr: "CASERNE - station de pompiers.", targetKanji: ["消", "署"] },
  { word: "美術館", meanings: ["Musee d'art"], readings: ["びじゅつかん"], mnemonicFr: "MUSEE D'ART - galerie d'art.", targetKanji: ["美", "術", "館"] },
  { word: "博物館", meanings: ["Musee"], readings: ["はくぶつかん"], mnemonicFr: "MUSEE - lieu d'exposition.", targetKanji: ["博", "物", "館"] },
  { word: "動物園", meanings: ["Zoo"], readings: ["どうぶつえん"], mnemonicFr: "ZOO - jardin d'animaux.", targetKanji: ["動", "物", "園"] },
  { word: "植物園", meanings: ["Jardin botanique"], readings: ["しょくぶつえん"], mnemonicFr: "JARDIN BOTANIQUE - jardin de plantes.", targetKanji: ["植", "物", "園"] },
  { word: "遊園地", meanings: ["Parc d'attractions"], readings: ["ゆうえんち"], mnemonicFr: "PARC D'ATTRACTIONS - lieu de divertissement.", targetKanji: ["遊", "園", "地"] },
  { word: "映画館", meanings: ["Cinema"], readings: ["えいがかん"], mnemonicFr: "CINEMA - salle de films.", targetKanji: ["映", "画", "館"] },
  { word: "体育館", meanings: ["Gymnase"], readings: ["たいいくかん"], mnemonicFr: "GYMNASE - salle de sport.", targetKanji: ["体", "育", "館"] },
  { word: "市場", meanings: ["Marche"], readings: ["いちば"], mnemonicFr: "MARCHE - lieu de commerce.", targetKanji: ["市", "場"] },
  { word: "商店街", meanings: ["Rue commercante"], readings: ["しょうてんがい"], mnemonicFr: "RUE COMMERCANTE - quartier des magasins.", targetKanji: ["商", "店", "街"] },
  { word: "百貨店", meanings: ["Grand magasin"], readings: ["ひゃっかてん"], mnemonicFr: "GRAND MAGASIN - magasin de tout.", targetKanji: ["百", "店"] },
  { word: "本屋", meanings: ["Librairie"], readings: ["ほんや"], mnemonicFr: "LIBRAIRIE - magasin de livres.", targetKanji: ["本", "屋"] },
  { word: "花屋", meanings: ["Fleuriste"], readings: ["はなや"], mnemonicFr: "FLEURISTE - magasin de fleurs.", targetKanji: ["花", "屋"] },
  { word: "肉屋", meanings: ["Boucherie"], readings: ["にくや"], mnemonicFr: "BOUCHERIE - magasin de viande.", targetKanji: ["肉", "屋"] },
  { word: "魚屋", meanings: ["Poissonnerie"], readings: ["さかなや"], mnemonicFr: "POISSONNERIE - magasin de poisson.", targetKanji: ["魚", "屋"] },
  { word: "八百屋", meanings: ["Marchand de legumes"], readings: ["やおや"], mnemonicFr: "PRIMEUR - magasin de legumes.", targetKanji: ["八", "百", "屋"] },
  { word: "パン屋", meanings: ["Boulangerie"], readings: ["パンや"], mnemonicFr: "BOULANGERIE - magasin de pain.", targetKanji: ["屋"] },
  { word: "靴屋", meanings: ["Magasin de chaussures"], readings: ["くつや"], mnemonicFr: "MAGASIN DE CHAUSSURES - vendeur de chaussures.", targetKanji: ["屋"] },
  { word: "床屋", meanings: ["Coiffeur pour hommes"], readings: ["とこや"], mnemonicFr: "COIFFEUR - salon de coiffure.", targetKanji: ["床", "屋"] },
  { word: "喫茶店", meanings: ["Cafe", "Salon de the"], readings: ["きっさてん"], mnemonicFr: "CAFE - lieu pour boire du the.", targetKanji: ["茶", "店"] },
  { word: "食堂", meanings: ["Cantine", "Restaurant"], readings: ["しょくどう"], mnemonicFr: "CANTINE - salle a manger.", targetKanji: ["食", "堂"] },
  { word: "居酒屋", meanings: ["Izakaya", "Bar japonais"], readings: ["いざかや"], mnemonicFr: "IZAKAYA - bar restaurant japonais.", targetKanji: ["居", "酒", "屋"] },
];

// Part 5: Food and drink vocabulary
const vocabPart5 = [
  { word: "飲み物", meanings: ["Boisson"], readings: ["のみもの"], mnemonicFr: "BOISSON - liquide a boire.", targetKanji: ["飲", "物"] },
  { word: "食べ物", meanings: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "NOURRITURE - chose a manger.", targetKanji: ["食", "物"] },
  { word: "野菜", meanings: ["Legumes"], readings: ["やさい"], mnemonicFr: "LEGUMES - plantes comestibles.", targetKanji: ["野", "菜"] },
  { word: "果物", meanings: ["Fruits"], readings: ["くだもの"], mnemonicFr: "FRUITS - fruits a manger.", targetKanji: ["果", "物"] },
  { word: "肉", meanings: ["Viande"], readings: ["にく"], mnemonicFr: "VIANDE - chair animale.", targetKanji: ["肉"] },
  { word: "牛肉", meanings: ["Boeuf"], readings: ["ぎゅうにく"], mnemonicFr: "BOEUF - viande de vache.", targetKanji: ["牛", "肉"] },
  { word: "豚肉", meanings: ["Porc"], readings: ["ぶたにく"], mnemonicFr: "PORC - viande de cochon.", targetKanji: ["肉"] },
  { word: "鶏肉", meanings: ["Poulet"], readings: ["とりにく"], mnemonicFr: "POULET - viande de poulet.", targetKanji: ["肉"] },
  { word: "魚", meanings: ["Poisson"], readings: ["さかな"], mnemonicFr: "POISSON - animal aquatique.", targetKanji: ["魚"] },
  { word: "卵", meanings: ["Oeuf"], readings: ["たまご"], mnemonicFr: "OEUF - produit de poule.", targetKanji: ["卵"] },
  { word: "塩", meanings: ["Sel"], readings: ["しお"], mnemonicFr: "SEL - assaisonnement sale.", targetKanji: ["塩"] },
  { word: "砂糖", meanings: ["Sucre"], readings: ["さとう"], mnemonicFr: "SUCRE - assaisonnement sucre.", targetKanji: ["砂"] },
  { word: "醤油", meanings: ["Sauce soja"], readings: ["しょうゆ"], mnemonicFr: "SAUCE SOJA - condiment japonais.", targetKanji: ["油"] },
  { word: "味噌", meanings: ["Miso"], readings: ["みそ"], mnemonicFr: "MISO - pate de soja fermentee.", targetKanji: ["味"] },
  { word: "酢", meanings: ["Vinaigre"], readings: ["す"], mnemonicFr: "VINAIGRE - acide pour cuisine.", targetKanji: ["酢"] },
  { word: "酒", meanings: ["Sake", "Alcool"], readings: ["さけ"], mnemonicFr: "SAKE - alcool de riz.", targetKanji: ["酒"] },
  { word: "日本酒", meanings: ["Sake japonais"], readings: ["にほんしゅ"], mnemonicFr: "SAKE JAPONAIS - alcool de riz japonais.", targetKanji: ["日", "本", "酒"] },
  { word: "水", meanings: ["Eau"], readings: ["みず"], mnemonicFr: "EAU - liquide vital.", targetKanji: ["水"] },
  { word: "お湯", meanings: ["Eau chaude"], readings: ["おゆ"], mnemonicFr: "EAU CHAUDE - eau rechauffee.", targetKanji: ["湯"] },
  { word: "茶", meanings: ["The"], readings: ["ちゃ"], mnemonicFr: "THE - boisson chaude.", targetKanji: ["茶"] },
  { word: "緑茶", meanings: ["The vert"], readings: ["りょくちゃ"], mnemonicFr: "THE VERT - the non fermente.", targetKanji: ["緑", "茶"] },
  { word: "紅茶", meanings: ["The noir"], readings: ["こうちゃ"], mnemonicFr: "THE NOIR - the fermente.", targetKanji: ["紅", "茶"] },
  { word: "牛乳", meanings: ["Lait"], readings: ["ぎゅうにゅう"], mnemonicFr: "LAIT - lait de vache.", targetKanji: ["牛", "乳"] },
  { word: "ご飯", meanings: ["Riz cuit", "Repas"], readings: ["ごはん"], mnemonicFr: "RIZ - riz cuit ou repas.", targetKanji: ["飯"] },
  { word: "麺", meanings: ["Nouilles"], readings: ["めん"], mnemonicFr: "NOUILLES - pates alimentaires.", targetKanji: ["麺"] },
  { word: "パン", meanings: ["Pain"], readings: ["パン"], mnemonicFr: "PAIN - produit de boulangerie.", targetKanji: [] },
  { word: "弁当", meanings: ["Bento", "Panier-repas"], readings: ["べんとう"], mnemonicFr: "BENTO - repas en boite.", targetKanji: ["弁", "当"] },
  { word: "刺身", meanings: ["Sashimi"], readings: ["さしみ"], mnemonicFr: "SASHIMI - poisson cru.", targetKanji: ["刺", "身"] },
  { word: "寿司", meanings: ["Sushi"], readings: ["すし"], mnemonicFr: "SUSHI - riz vinaigre avec poisson.", targetKanji: ["寿"] },
  { word: "天ぷら", meanings: ["Tempura"], readings: ["てんぷら"], mnemonicFr: "TEMPURA - friture japonaise.", targetKanji: ["天"] },
];

// Part 6: Weather and nature vocabulary
const vocabPart6 = [
  { word: "天気", meanings: ["Temps", "Meteo"], readings: ["てんき"], mnemonicFr: "METEO - conditions atmospheriques.", targetKanji: ["天", "気"] },
  { word: "天気予報", meanings: ["Previsions meteo"], readings: ["てんきよほう"], mnemonicFr: "PREVISIONS METEO - annonce du temps.", targetKanji: ["天", "気", "予", "報"] },
  { word: "晴れ", meanings: ["Beau temps"], readings: ["はれ"], mnemonicFr: "BEAU TEMPS - ciel degage.", targetKanji: ["晴"] },
  { word: "曇り", meanings: ["Nuageux"], readings: ["くもり"], mnemonicFr: "NUAGEUX - ciel couvert.", targetKanji: ["曇"] },
  { word: "雨", meanings: ["Pluie"], readings: ["あめ"], mnemonicFr: "PLUIE - eau qui tombe.", targetKanji: ["雨"] },
  { word: "大雨", meanings: ["Forte pluie"], readings: ["おおあめ"], mnemonicFr: "FORTE PLUIE - pluie intense.", targetKanji: ["大", "雨"] },
  { word: "雪", meanings: ["Neige"], readings: ["ゆき"], mnemonicFr: "NEIGE - precipitation blanche.", targetKanji: ["雪"] },
  { word: "大雪", meanings: ["Forte neige"], readings: ["おおゆき"], mnemonicFr: "FORTE NEIGE - chute de neige importante.", targetKanji: ["大", "雪"] },
  { word: "風", meanings: ["Vent"], readings: ["かぜ"], mnemonicFr: "VENT - mouvement d'air.", targetKanji: ["風"] },
  { word: "台風", meanings: ["Typhon"], readings: ["たいふう"], mnemonicFr: "TYPHON - tempete tropicale.", targetKanji: ["台", "風"] },
  { word: "雷", meanings: ["Foudre", "Tonnerre"], readings: ["かみなり"], mnemonicFr: "FOUDRE - decharge electrique.", targetKanji: ["雷"] },
  { word: "虹", meanings: ["Arc-en-ciel"], readings: ["にじ"], mnemonicFr: "ARC-EN-CIEL - phenomene lumineux.", targetKanji: ["虹"] },
  { word: "霧", meanings: ["Brouillard"], readings: ["きり"], mnemonicFr: "BROUILLARD - nuage au sol.", targetKanji: ["霧"] },
  { word: "氷", meanings: ["Glace"], readings: ["こおり"], mnemonicFr: "GLACE - eau gelee.", targetKanji: ["氷"] },
  { word: "温度", meanings: ["Temperature"], readings: ["おんど"], mnemonicFr: "TEMPERATURE - degre de chaleur.", targetKanji: ["温", "度"] },
  { word: "湿度", meanings: ["Humidite"], readings: ["しつど"], mnemonicFr: "HUMIDITE - taux d'eau dans l'air.", targetKanji: ["湿", "度"] },
  { word: "暑い", meanings: ["Chaud (temps)"], readings: ["あつい"], mnemonicFr: "CHAUD - temperature elevee.", targetKanji: ["暑"] },
  { word: "寒い", meanings: ["Froid (temps)"], readings: ["さむい"], mnemonicFr: "FROID - temperature basse.", targetKanji: ["寒"] },
  { word: "涼しい", meanings: ["Frais"], readings: ["すずしい"], mnemonicFr: "FRAIS - agreablement froid.", targetKanji: ["涼"] },
  { word: "暖かい", meanings: ["Tiede", "Doux"], readings: ["あたたかい"], mnemonicFr: "TIEDE - agreablement chaud.", targetKanji: ["暖"] },
  { word: "山", meanings: ["Montagne"], readings: ["やま"], mnemonicFr: "MONTAGNE - elevation naturelle.", targetKanji: ["山"] },
  { word: "川", meanings: ["Riviere"], readings: ["かわ"], mnemonicFr: "RIVIERE - cours d'eau.", targetKanji: ["川"] },
  { word: "海", meanings: ["Mer"], readings: ["うみ"], mnemonicFr: "MER - grande etendue d'eau salee.", targetKanji: ["海"] },
  { word: "森", meanings: ["Foret"], readings: ["もり"], mnemonicFr: "FORET - grande zone boisee.", targetKanji: ["森"] },
  { word: "林", meanings: ["Bois"], readings: ["はやし"], mnemonicFr: "BOIS - petite foret.", targetKanji: ["林"] },
  { word: "草", meanings: ["Herbe"], readings: ["くさ"], mnemonicFr: "HERBE - plante verte.", targetKanji: ["草"] },
  { word: "花", meanings: ["Fleur"], readings: ["はな"], mnemonicFr: "FLEUR - partie de la plante.", targetKanji: ["花"] },
  { word: "木", meanings: ["Arbre"], readings: ["き"], mnemonicFr: "ARBRE - grande plante.", targetKanji: ["木"] },
  { word: "葉", meanings: ["Feuille"], readings: ["は"], mnemonicFr: "FEUILLE - partie de l'arbre.", targetKanji: ["葉"] },
  { word: "石", meanings: ["Pierre"], readings: ["いし"], mnemonicFr: "PIERRE - roche.", targetKanji: ["石"] },
  { word: "砂", meanings: ["Sable"], readings: ["すな"], mnemonicFr: "SABLE - grains fins.", targetKanji: ["砂"] },
  { word: "土", meanings: ["Terre", "Sol"], readings: ["つち"], mnemonicFr: "TERRE - sol.", targetKanji: ["土"] },
  { word: "星", meanings: ["Etoile"], readings: ["ほし"], mnemonicFr: "ETOILE - astre lumineux.", targetKanji: ["星"] },
  { word: "太陽", meanings: ["Soleil"], readings: ["たいよう"], mnemonicFr: "SOLEIL - notre etoile.", targetKanji: ["太", "陽"] },
  { word: "月", meanings: ["Lune", "Mois"], readings: ["つき"], mnemonicFr: "LUNE - satellite de la Terre.", targetKanji: ["月"] },
  { word: "空", meanings: ["Ciel"], readings: ["そら"], mnemonicFr: "CIEL - l'espace au-dessus.", targetKanji: ["空"] },
];

// Part 7: Family and relationships
const vocabPart7 = [
  { word: "家族", meanings: ["Famille"], readings: ["かぞく"], mnemonicFr: "FAMILLE - groupe familial.", targetKanji: ["家", "族"] },
  { word: "両親", meanings: ["Parents"], readings: ["りょうしん"], mnemonicFr: "PARENTS - pere et mere.", targetKanji: ["両", "親"] },
  { word: "父", meanings: ["Pere"], readings: ["ちち"], mnemonicFr: "PERE - parent masculin.", targetKanji: ["父"] },
  { word: "母", meanings: ["Mere"], readings: ["はは"], mnemonicFr: "MERE - parent feminin.", targetKanji: ["母"] },
  { word: "お父さん", meanings: ["Papa"], readings: ["おとうさん"], mnemonicFr: "PAPA - pere (poli).", targetKanji: ["父"] },
  { word: "お母さん", meanings: ["Maman"], readings: ["おかあさん"], mnemonicFr: "MAMAN - mere (poli).", targetKanji: ["母"] },
  { word: "兄", meanings: ["Grand frere"], readings: ["あに"], mnemonicFr: "GRAND FRERE - frere aine.", targetKanji: ["兄"] },
  { word: "姉", meanings: ["Grande soeur"], readings: ["あね"], mnemonicFr: "GRANDE SOEUR - soeur ainee.", targetKanji: ["姉"] },
  { word: "弟", meanings: ["Petit frere"], readings: ["おとうと"], mnemonicFr: "PETIT FRERE - frere cadet.", targetKanji: ["弟"] },
  { word: "妹", meanings: ["Petite soeur"], readings: ["いもうと"], mnemonicFr: "PETITE SOEUR - soeur cadette.", targetKanji: ["妹"] },
  { word: "お兄さん", meanings: ["Grand frere (poli)"], readings: ["おにいさん"], mnemonicFr: "GRAND FRERE - forme polie.", targetKanji: ["兄"] },
  { word: "お姉さん", meanings: ["Grande soeur (poli)"], readings: ["おねえさん"], mnemonicFr: "GRANDE SOEUR - forme polie.", targetKanji: ["姉"] },
  { word: "祖父", meanings: ["Grand-pere"], readings: ["そふ"], mnemonicFr: "GRAND-PERE - pere du parent.", targetKanji: ["祖", "父"] },
  { word: "祖母", meanings: ["Grand-mere"], readings: ["そぼ"], mnemonicFr: "GRAND-MERE - mere du parent.", targetKanji: ["祖", "母"] },
  { word: "おじいさん", meanings: ["Grand-pere (poli)"], readings: ["おじいさん"], mnemonicFr: "GRAND-PERE - forme polie.", targetKanji: [] },
  { word: "おばあさん", meanings: ["Grand-mere (poli)"], readings: ["おばあさん"], mnemonicFr: "GRAND-MERE - forme polie.", targetKanji: [] },
  { word: "叔父", meanings: ["Oncle"], readings: ["おじ"], mnemonicFr: "ONCLE - frere du parent.", targetKanji: ["叔", "父"] },
  { word: "叔母", meanings: ["Tante"], readings: ["おば"], mnemonicFr: "TANTE - soeur du parent.", targetKanji: ["叔", "母"] },
  { word: "息子", meanings: ["Fils"], readings: ["むすこ"], mnemonicFr: "FILS - enfant masculin.", targetKanji: ["息", "子"] },
  { word: "娘", meanings: ["Fille"], readings: ["むすめ"], mnemonicFr: "FILLE - enfant feminin.", targetKanji: ["娘"] },
  { word: "子供", meanings: ["Enfant"], readings: ["こども"], mnemonicFr: "ENFANT - jeune personne.", targetKanji: ["子", "供"] },
  { word: "孫", meanings: ["Petit-enfant"], readings: ["まご"], mnemonicFr: "PETIT-ENFANT - enfant de l'enfant.", targetKanji: ["孫"] },
  { word: "夫", meanings: ["Mari"], readings: ["おっと"], mnemonicFr: "MARI - epoux.", targetKanji: ["夫"] },
  { word: "妻", meanings: ["Femme", "Epouse"], readings: ["つま"], mnemonicFr: "FEMME - epouse.", targetKanji: ["妻"] },
  { word: "主人", meanings: ["Mari", "Patron"], readings: ["しゅじん"], mnemonicFr: "MARI - le maitre de maison.", targetKanji: ["主", "人"] },
  { word: "奥さん", meanings: ["Epouse (d'autrui)"], readings: ["おくさん"], mnemonicFr: "EPOUSE - femme de quelqu'un.", targetKanji: ["奥"] },
  { word: "彼", meanings: ["Lui", "Petit ami"], readings: ["かれ"], mnemonicFr: "LUI - personne masculine.", targetKanji: ["彼"] },
  { word: "彼女", meanings: ["Elle", "Petite amie"], readings: ["かのじょ"], mnemonicFr: "ELLE - personne feminine.", targetKanji: ["彼", "女"] },
  { word: "友達", meanings: ["Ami"], readings: ["ともだち"], mnemonicFr: "AMI - personne proche.", targetKanji: ["友", "達"] },
  { word: "親友", meanings: ["Meilleur ami"], readings: ["しんゆう"], mnemonicFr: "MEILLEUR AMI - ami intime.", targetKanji: ["親", "友"] },
  { word: "恋人", meanings: ["Amoureux"], readings: ["こいびと"], mnemonicFr: "AMOUREUX - personne aimee.", targetKanji: ["恋", "人"] },
  { word: "結婚", meanings: ["Mariage"], readings: ["けっこん"], mnemonicFr: "MARIAGE - union conjugale.", targetKanji: ["結", "婚"] },
  { word: "離婚", meanings: ["Divorce"], readings: ["りこん"], mnemonicFr: "DIVORCE - fin du mariage.", targetKanji: ["離", "婚"] },
];

// Part 8: School and work vocabulary
const vocabPart8 = [
  { word: "学校", meanings: ["Ecole"], readings: ["がっこう"], mnemonicFr: "ECOLE - lieu d'etude.", targetKanji: ["学", "校"] },
  { word: "小学校", meanings: ["Ecole primaire"], readings: ["しょうがっこう"], mnemonicFr: "ECOLE PRIMAIRE - premiere ecole.", targetKanji: ["小", "学", "校"] },
  { word: "中学校", meanings: ["College"], readings: ["ちゅうがっこう"], mnemonicFr: "COLLEGE - ecole du milieu.", targetKanji: ["中", "学", "校"] },
  { word: "高校", meanings: ["Lycee"], readings: ["こうこう"], mnemonicFr: "LYCEE - ecole superieure.", targetKanji: ["高", "校"] },
  { word: "大学", meanings: ["Universite"], readings: ["だいがく"], mnemonicFr: "UNIVERSITE - grande etude.", targetKanji: ["大", "学"] },
  { word: "教室", meanings: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "SALLE DE CLASSE - lieu d'enseignement.", targetKanji: ["教", "室"] },
  { word: "先生", meanings: ["Professeur"], readings: ["せんせい"], mnemonicFr: "PROFESSEUR - celui qui enseigne.", targetKanji: ["先", "生"] },
  { word: "生徒", meanings: ["Eleve"], readings: ["せいと"], mnemonicFr: "ELEVE - celui qui apprend.", targetKanji: ["生", "徒"] },
  { word: "学生", meanings: ["Etudiant"], readings: ["がくせい"], mnemonicFr: "ETUDIANT - celui qui etudie.", targetKanji: ["学", "生"] },
  { word: "授業", meanings: ["Cours"], readings: ["じゅぎょう"], mnemonicFr: "COURS - lecon.", targetKanji: ["授", "業"] },
  { word: "宿題", meanings: ["Devoirs"], readings: ["しゅくだい"], mnemonicFr: "DEVOIRS - travail a la maison.", targetKanji: ["宿", "題"] },
  { word: "試験", meanings: ["Examen"], readings: ["しけん"], mnemonicFr: "EXAMEN - test.", targetKanji: ["試", "験"] },
  { word: "成績", meanings: ["Notes", "Resultats"], readings: ["せいせき"], mnemonicFr: "NOTES - resultats scolaires.", targetKanji: ["成", "績"] },
  { word: "卒業", meanings: ["Diplome"], readings: ["そつぎょう"], mnemonicFr: "DIPLOME - fin des etudes.", targetKanji: ["卒", "業"] },
  { word: "入学", meanings: ["Rentree scolaire"], readings: ["にゅうがく"], mnemonicFr: "RENTREE - entrer a l'ecole.", targetKanji: ["入", "学"] },
  { word: "会社", meanings: ["Entreprise"], readings: ["かいしゃ"], mnemonicFr: "ENTREPRISE - societe.", targetKanji: ["会", "社"] },
  { word: "会社員", meanings: ["Employe de bureau"], readings: ["かいしゃいん"], mnemonicFr: "EMPLOYE - salarie.", targetKanji: ["会", "社", "員"] },
  { word: "社長", meanings: ["PDG", "Directeur"], readings: ["しゃちょう"], mnemonicFr: "PDG - chef d'entreprise.", targetKanji: ["社", "長"] },
  { word: "部長", meanings: ["Chef de departement"], readings: ["ぶちょう"], mnemonicFr: "CHEF - responsable de division.", targetKanji: ["部", "長"] },
  { word: "課長", meanings: ["Chef de section"], readings: ["かちょう"], mnemonicFr: "CHEF DE SECTION - responsable.", targetKanji: ["課", "長"] },
  { word: "同僚", meanings: ["Collegue"], readings: ["どうりょう"], mnemonicFr: "COLLEGUE - compagnon de travail.", targetKanji: ["同", "僚"] },
  { word: "給料", meanings: ["Salaire"], readings: ["きゅうりょう"], mnemonicFr: "SALAIRE - remuneration.", targetKanji: ["給", "料"] },
  { word: "仕事", meanings: ["Travail"], readings: ["しごと"], mnemonicFr: "TRAVAIL - emploi.", targetKanji: ["仕", "事"] },
  { word: "残業", meanings: ["Heures supplementaires"], readings: ["ざんぎょう"], mnemonicFr: "HEURES SUP - travail en plus.", targetKanji: ["残", "業"] },
  { word: "休暇", meanings: ["Vacances", "Conge"], readings: ["きゅうか"], mnemonicFr: "VACANCES - temps de repos.", targetKanji: ["休", "暇"] },
  { word: "会議", meanings: ["Reunion"], readings: ["かいぎ"], mnemonicFr: "REUNION - rassemblement de travail.", targetKanji: ["会", "議"] },
  { word: "出張", meanings: ["Voyage d'affaires"], readings: ["しゅっちょう"], mnemonicFr: "VOYAGE D'AFFAIRES - deplacement professionnel.", targetKanji: ["出", "張"] },
  { word: "名刺", meanings: ["Carte de visite"], readings: ["めいし"], mnemonicFr: "CARTE DE VISITE - carte professionnelle.", targetKanji: ["名", "刺"] },
];

// Part 9: Transportation vocabulary
const vocabPart9 = [
  { word: "電車", meanings: ["Train electrique"], readings: ["でんしゃ"], mnemonicFr: "TRAIN - transport ferroviaire.", targetKanji: ["電", "車"] },
  { word: "地下鉄", meanings: ["Metro"], readings: ["ちかてつ"], mnemonicFr: "METRO - train souterrain.", targetKanji: ["地", "下", "鉄"] },
  { word: "新幹線", meanings: ["Shinkansen", "TGV"], readings: ["しんかんせん"], mnemonicFr: "SHINKANSEN - train a grande vitesse.", targetKanji: ["新", "幹", "線"] },
  { word: "バス", meanings: ["Bus"], readings: ["バス"], mnemonicFr: "BUS - autobus.", targetKanji: [] },
  { word: "タクシー", meanings: ["Taxi"], readings: ["タクシー"], mnemonicFr: "TAXI - voiture avec chauffeur.", targetKanji: [] },
  { word: "車", meanings: ["Voiture"], readings: ["くるま"], mnemonicFr: "VOITURE - automobile.", targetKanji: ["車"] },
  { word: "自転車", meanings: ["Velo"], readings: ["じてんしゃ"], mnemonicFr: "VELO - bicyclette.", targetKanji: ["自", "転", "車"] },
  { word: "バイク", meanings: ["Moto"], readings: ["バイク"], mnemonicFr: "MOTO - deux-roues motorise.", targetKanji: [] },
  { word: "飛行機", meanings: ["Avion"], readings: ["ひこうき"], mnemonicFr: "AVION - appareil volant.", targetKanji: ["飛", "行", "機"] },
  { word: "船", meanings: ["Bateau"], readings: ["ふね"], mnemonicFr: "BATEAU - embarcation.", targetKanji: ["船"] },
  { word: "歩く", meanings: ["Marcher"], readings: ["あるく"], mnemonicFr: "MARCHER - se deplacer a pied.", targetKanji: ["歩"] },
  { word: "走る", meanings: ["Courir"], readings: ["はしる"], mnemonicFr: "COURIR - aller vite a pied.", targetKanji: ["走"] },
  { word: "乗る", meanings: ["Monter", "Prendre (transport)"], readings: ["のる"], mnemonicFr: "MONTER - prendre un vehicule.", targetKanji: ["乗"] },
  { word: "降りる", meanings: ["Descendre"], readings: ["おりる"], mnemonicFr: "DESCENDRE - quitter un vehicule.", targetKanji: ["降"] },
  { word: "乗り換える", meanings: ["Changer (de ligne)"], readings: ["のりかえる"], mnemonicFr: "CHANGER - prendre une correspondance.", targetKanji: ["乗", "換"] },
  { word: "切符", meanings: ["Billet"], readings: ["きっぷ"], mnemonicFr: "BILLET - titre de transport.", targetKanji: ["切", "符"] },
  { word: "運転", meanings: ["Conduite"], readings: ["うんてん"], mnemonicFr: "CONDUITE - piloter un vehicule.", targetKanji: ["運", "転"] },
  { word: "運転手", meanings: ["Chauffeur"], readings: ["うんてんしゅ"], mnemonicFr: "CHAUFFEUR - conducteur.", targetKanji: ["運", "転", "手"] },
  { word: "免許", meanings: ["Permis"], readings: ["めんきょ"], mnemonicFr: "PERMIS - autorisation de conduire.", targetKanji: ["免", "許"] },
  { word: "道路", meanings: ["Route"], readings: ["どうろ"], mnemonicFr: "ROUTE - voie de circulation.", targetKanji: ["道", "路"] },
  { word: "交差点", meanings: ["Carrefour"], readings: ["こうさてん"], mnemonicFr: "CARREFOUR - croisement de routes.", targetKanji: ["交", "差", "点"] },
  { word: "信号", meanings: ["Feu de signalisation"], readings: ["しんごう"], mnemonicFr: "FEU - signal lumineux.", targetKanji: ["信", "号"] },
  { word: "横断歩道", meanings: ["Passage pieton"], readings: ["おうだんほどう"], mnemonicFr: "PASSAGE PIETON - traversee pour pietons.", targetKanji: ["横", "断", "歩", "道"] },
  { word: "歩道", meanings: ["Trottoir"], readings: ["ほどう"], mnemonicFr: "TROTTOIR - chemin pour pietons.", targetKanji: ["歩", "道"] },
  { word: "駐車場", meanings: ["Parking"], readings: ["ちゅうしゃじょう"], mnemonicFr: "PARKING - lieu de stationnement.", targetKanji: ["駐", "車", "場"] },
];

// Part 10: Colors, shapes, and descriptions
const vocabPart10 = [
  // Colors
  { word: "色", meanings: ["Couleur"], readings: ["いろ"], mnemonicFr: "COULEUR - teinte.", targetKanji: ["色"] },
  { word: "赤", meanings: ["Rouge"], readings: ["あか"], mnemonicFr: "ROUGE - couleur du feu.", targetKanji: ["赤"] },
  { word: "赤い", meanings: ["Rouge (adj)"], readings: ["あかい"], mnemonicFr: "ROUGE - de couleur rouge.", targetKanji: ["赤"] },
  { word: "青", meanings: ["Bleu"], readings: ["あお"], mnemonicFr: "BLEU - couleur du ciel.", targetKanji: ["青"] },
  { word: "青い", meanings: ["Bleu (adj)"], readings: ["あおい"], mnemonicFr: "BLEU - de couleur bleue.", targetKanji: ["青"] },
  { word: "白", meanings: ["Blanc"], readings: ["しろ"], mnemonicFr: "BLANC - couleur pure.", targetKanji: ["白"] },
  { word: "白い", meanings: ["Blanc (adj)"], readings: ["しろい"], mnemonicFr: "BLANC - de couleur blanche.", targetKanji: ["白"] },
  { word: "黒", meanings: ["Noir"], readings: ["くろ"], mnemonicFr: "NOIR - absence de lumiere.", targetKanji: ["黒"] },
  { word: "黒い", meanings: ["Noir (adj)"], readings: ["くろい"], mnemonicFr: "NOIR - de couleur noire.", targetKanji: ["黒"] },
  { word: "黄色", meanings: ["Jaune"], readings: ["きいろ"], mnemonicFr: "JAUNE - couleur du soleil.", targetKanji: ["黄", "色"] },
  { word: "黄色い", meanings: ["Jaune (adj)"], readings: ["きいろい"], mnemonicFr: "JAUNE - de couleur jaune.", targetKanji: ["黄", "色"] },
  { word: "緑", meanings: ["Vert"], readings: ["みどり"], mnemonicFr: "VERT - couleur des plantes.", targetKanji: ["緑"] },
  { word: "茶色", meanings: ["Marron"], readings: ["ちゃいろ"], mnemonicFr: "MARRON - couleur du the.", targetKanji: ["茶", "色"] },
  { word: "灰色", meanings: ["Gris"], readings: ["はいいろ"], mnemonicFr: "GRIS - couleur des cendres.", targetKanji: ["灰", "色"] },
  { word: "紫", meanings: ["Violet"], readings: ["むらさき"], mnemonicFr: "VIOLET - couleur royale.", targetKanji: ["紫"] },
  { word: "ピンク", meanings: ["Rose"], readings: ["ピンク"], mnemonicFr: "ROSE - couleur douce.", targetKanji: [] },
  { word: "オレンジ", meanings: ["Orange"], readings: ["オレンジ"], mnemonicFr: "ORANGE - couleur du fruit.", targetKanji: [] },

  // Shapes
  { word: "形", meanings: ["Forme"], readings: ["かたち"], mnemonicFr: "FORME - apparence.", targetKanji: ["形"] },
  { word: "丸", meanings: ["Cercle", "Rond"], readings: ["まる"], mnemonicFr: "CERCLE - forme ronde.", targetKanji: ["丸"] },
  { word: "丸い", meanings: ["Rond (adj)"], readings: ["まるい"], mnemonicFr: "ROND - de forme circulaire.", targetKanji: ["丸"] },
  { word: "四角", meanings: ["Carre", "Rectangle"], readings: ["しかく"], mnemonicFr: "CARRE - forme a quatre cotes.", targetKanji: ["四", "角"] },
  { word: "三角", meanings: ["Triangle"], readings: ["さんかく"], mnemonicFr: "TRIANGLE - forme a trois cotes.", targetKanji: ["三", "角"] },
  { word: "角", meanings: ["Angle", "Coin"], readings: ["かど"], mnemonicFr: "ANGLE - point ou deux lignes se rencontrent.", targetKanji: ["角"] },

  // Descriptions
  { word: "大きい", meanings: ["Grand"], readings: ["おおきい"], mnemonicFr: "GRAND - de grande taille.", targetKanji: ["大"] },
  { word: "小さい", meanings: ["Petit"], readings: ["ちいさい"], mnemonicFr: "PETIT - de petite taille.", targetKanji: ["小"] },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - de grande longueur.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - de faible longueur.", targetKanji: ["短"] },
  { word: "高い", meanings: ["Haut", "Cher"], readings: ["たかい"], mnemonicFr: "HAUT - eleve.", targetKanji: ["高"] },
  { word: "低い", meanings: ["Bas"], readings: ["ひくい"], mnemonicFr: "BAS - peu eleve.", targetKanji: ["低"] },
  { word: "広い", meanings: ["Large", "Spacieux"], readings: ["ひろい"], mnemonicFr: "LARGE - de grande etendue.", targetKanji: ["広"] },
  { word: "狭い", meanings: ["Etroit"], readings: ["せまい"], mnemonicFr: "ETROIT - de faible largeur.", targetKanji: ["狭"] },
  { word: "太い", meanings: ["Epais", "Gros"], readings: ["ふとい"], mnemonicFr: "EPAIS - de grande epaisseur.", targetKanji: ["太"] },
  { word: "細い", meanings: ["Fin", "Mince"], readings: ["ほそい"], mnemonicFr: "FIN - de faible epaisseur.", targetKanji: ["細"] },
  { word: "重い", meanings: ["Lourd"], readings: ["おもい"], mnemonicFr: "LOURD - de grand poids.", targetKanji: ["重"] },
  { word: "速い", meanings: ["Rapide"], readings: ["はやい"], mnemonicFr: "RAPIDE - qui va vite.", targetKanji: ["速"] },
  { word: "遅い", meanings: ["Lent", "En retard"], readings: ["おそい"], mnemonicFr: "LENT - qui va doucement.", targetKanji: ["遅"] },
  { word: "新しい", meanings: ["Nouveau"], readings: ["あたらしい"], mnemonicFr: "NOUVEAU - recent.", targetKanji: ["新"] },
  { word: "古い", meanings: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonicFr: "VIEUX - qui a de l'age.", targetKanji: ["古"] },
  { word: "強い", meanings: ["Fort"], readings: ["つよい"], mnemonicFr: "FORT - puissant.", targetKanji: ["強"] },
  { word: "弱い", meanings: ["Faible"], readings: ["よわい"], mnemonicFr: "FAIBLE - sans force.", targetKanji: ["弱"] },
  { word: "明るい", meanings: ["Clair", "Lumineux"], readings: ["あかるい"], mnemonicFr: "CLAIR - bien eclaire.", targetKanji: ["明"] },
  { word: "暗い", meanings: ["Sombre"], readings: ["くらい"], mnemonicFr: "SOMBRE - peu eclaire.", targetKanji: ["暗"] },
  { word: "正しい", meanings: ["Correct", "Juste"], readings: ["ただしい"], mnemonicFr: "CORRECT - sans erreur.", targetKanji: ["正"] },
  { word: "間違い", meanings: ["Erreur"], readings: ["まちがい"], mnemonicFr: "ERREUR - faute.", targetKanji: ["間", "違"] },
];

// Part 11: Numbers and counting
const vocabPart11 = [
  { word: "数字", meanings: ["Chiffre", "Nombre"], readings: ["すうじ"], mnemonicFr: "CHIFFRE - symbole numerique.", targetKanji: ["数", "字"] },
  { word: "番号", meanings: ["Numero"], readings: ["ばんごう"], mnemonicFr: "NUMERO - identifiant numerique.", targetKanji: ["番", "号"] },
  { word: "電話番号", meanings: ["Numero de telephone"], readings: ["でんわばんごう"], mnemonicFr: "NUMERO DE TELEPHONE - pour appeler.", targetKanji: ["電", "話", "番", "号"] },
  { word: "半分", meanings: ["Moitie"], readings: ["はんぶん"], mnemonicFr: "MOITIE - la demi-partie.", targetKanji: ["半", "分"] },
  { word: "倍", meanings: ["Double"], readings: ["ばい"], mnemonicFr: "DOUBLE - deux fois.", targetKanji: ["倍"] },
  { word: "全部", meanings: ["Tout", "Totalite"], readings: ["ぜんぶ"], mnemonicFr: "TOUT - l'ensemble.", targetKanji: ["全", "部"] },
  { word: "一部", meanings: ["Une partie"], readings: ["いちぶ"], mnemonicFr: "UNE PARTIE - une portion.", targetKanji: ["一", "部"] },
  { word: "最初", meanings: ["Premier"], readings: ["さいしょ"], mnemonicFr: "PREMIER - au debut.", targetKanji: ["最", "初"] },
  { word: "最後", meanings: ["Dernier"], readings: ["さいご"], mnemonicFr: "DERNIER - a la fin.", targetKanji: ["最", "後"] },
  { word: "一番", meanings: ["Le plus", "Numero un"], readings: ["いちばん"], mnemonicFr: "NUMERO UN - le premier.", targetKanji: ["一", "番"] },
  { word: "二番目", meanings: ["Deuxieme"], readings: ["にばんめ"], mnemonicFr: "DEUXIEME - en seconde position.", targetKanji: ["二", "番", "目"] },
  { word: "何番目", meanings: ["Quel numero"], readings: ["なんばんめ"], mnemonicFr: "QUEL NUMERO - quelle position.", targetKanji: ["何", "番", "目"] },
  { word: "以上", meanings: ["Plus de", "Au-dessus"], readings: ["いじょう"], mnemonicFr: "PLUS DE - superieur a.", targetKanji: ["以", "上"] },
  { word: "以下", meanings: ["Moins de", "En dessous"], readings: ["いか"], mnemonicFr: "MOINS DE - inferieur a.", targetKanji: ["以", "下"] },
  { word: "以内", meanings: ["Dans", "En moins de"], readings: ["いない"], mnemonicFr: "EN MOINS DE - dans les limites.", targetKanji: ["以", "内"] },
  { word: "以外", meanings: ["Sauf", "Excepte"], readings: ["いがい"], mnemonicFr: "SAUF - a l'exception de.", targetKanji: ["以", "外"] },
  { word: "約", meanings: ["Environ"], readings: ["やく"], mnemonicFr: "ENVIRON - approximativement.", targetKanji: ["約"] },
  { word: "余り", meanings: ["Reste", "Trop"], readings: ["あまり"], mnemonicFr: "RESTE - ce qui depasse.", targetKanji: ["余"] },
  { word: "多い", meanings: ["Nombreux", "Beaucoup"], readings: ["おおい"], mnemonicFr: "NOMBREUX - en grande quantite.", targetKanji: ["多"] },
  { word: "少ない", meanings: ["Peu nombreux"], readings: ["すくない"], mnemonicFr: "PEU NOMBREUX - en petite quantite.", targetKanji: ["少"] },
  { word: "増える", meanings: ["Augmenter"], readings: ["ふえる"], mnemonicFr: "AUGMENTER - devenir plus.", targetKanji: ["増"] },
  { word: "減る", meanings: ["Diminuer"], readings: ["へる"], mnemonicFr: "DIMINUER - devenir moins.", targetKanji: ["減"] },
  { word: "足りる", meanings: ["Suffire"], readings: ["たりる"], mnemonicFr: "SUFFIRE - etre assez.", targetKanji: ["足"] },
  { word: "足りない", meanings: ["Manquer"], readings: ["たりない"], mnemonicFr: "MANQUER - ne pas suffire.", targetKanji: ["足"] },
];

// Part 12: Common verbs and expressions
const vocabPart12 = [
  { word: "始まる", meanings: ["Commencer (intrans)"], readings: ["はじまる"], mnemonicFr: "COMMENCER - debuter.", targetKanji: ["始"] },
  { word: "始める", meanings: ["Commencer (trans)"], readings: ["はじめる"], mnemonicFr: "COMMENCER - faire debuter.", targetKanji: ["始"] },
  { word: "終わる", meanings: ["Finir (intrans)"], readings: ["おわる"], mnemonicFr: "FINIR - se terminer.", targetKanji: ["終"] },
  { word: "終える", meanings: ["Finir (trans)"], readings: ["おえる"], mnemonicFr: "FINIR - terminer.", targetKanji: ["終"] },
  { word: "続く", meanings: ["Continuer (intrans)"], readings: ["つづく"], mnemonicFr: "CONTINUER - se poursuivre.", targetKanji: ["続"] },
  { word: "続ける", meanings: ["Continuer (trans)"], readings: ["つづける"], mnemonicFr: "CONTINUER - poursuivre.", targetKanji: ["続"] },
  { word: "止まる", meanings: ["S'arreter"], readings: ["とまる"], mnemonicFr: "S'ARRETER - cesser de bouger.", targetKanji: ["止"] },
  { word: "止める", meanings: ["Arreter"], readings: ["とめる"], mnemonicFr: "ARRETER - faire cesser.", targetKanji: ["止"] },
  { word: "開く", meanings: ["Ouvrir (intrans)"], readings: ["あく"], mnemonicFr: "S'OUVRIR - devenir ouvert.", targetKanji: ["開"] },
  { word: "開ける", meanings: ["Ouvrir (trans)"], readings: ["あける"], mnemonicFr: "OUVRIR - rendre ouvert.", targetKanji: ["開"] },
  { word: "閉まる", meanings: ["Fermer (intrans)"], readings: ["しまる"], mnemonicFr: "SE FERMER - devenir ferme.", targetKanji: ["閉"] },
  { word: "閉める", meanings: ["Fermer (trans)"], readings: ["しめる"], mnemonicFr: "FERMER - rendre ferme.", targetKanji: ["閉"] },
  { word: "入る", meanings: ["Entrer"], readings: ["はいる"], mnemonicFr: "ENTRER - aller a l'interieur.", targetKanji: ["入"] },
  { word: "出る", meanings: ["Sortir"], readings: ["でる"], mnemonicFr: "SORTIR - aller a l'exterieur.", targetKanji: ["出"] },
  { word: "上がる", meanings: ["Monter"], readings: ["あがる"], mnemonicFr: "MONTER - aller vers le haut.", targetKanji: ["上"] },
  { word: "下がる", meanings: ["Descendre"], readings: ["さがる"], mnemonicFr: "DESCENDRE - aller vers le bas.", targetKanji: ["下"] },
  { word: "上げる", meanings: ["Lever", "Donner"], readings: ["あげる"], mnemonicFr: "LEVER - elever.", targetKanji: ["上"] },
  { word: "下げる", meanings: ["Baisser"], readings: ["さげる"], mnemonicFr: "BAISSER - abaisser.", targetKanji: ["下"] },
  { word: "決める", meanings: ["Decider"], readings: ["きめる"], mnemonicFr: "DECIDER - faire un choix.", targetKanji: ["決"] },
  { word: "決まる", meanings: ["Etre decide"], readings: ["きまる"], mnemonicFr: "ETRE DECIDE - etre fixe.", targetKanji: ["決"] },
  { word: "変わる", meanings: ["Changer (intrans)"], readings: ["かわる"], mnemonicFr: "CHANGER - se transformer.", targetKanji: ["変"] },
  { word: "変える", meanings: ["Changer (trans)"], readings: ["かえる"], mnemonicFr: "CHANGER - transformer.", targetKanji: ["変"] },
  { word: "集まる", meanings: ["Se rassembler"], readings: ["あつまる"], mnemonicFr: "SE RASSEMBLER - se reunir.", targetKanji: ["集"] },
  { word: "集める", meanings: ["Rassembler"], readings: ["あつめる"], mnemonicFr: "RASSEMBLER - reunir.", targetKanji: ["集"] },
  { word: "見つかる", meanings: ["Etre trouve"], readings: ["みつかる"], mnemonicFr: "ETRE TROUVE - etre decouvert.", targetKanji: ["見"] },
  { word: "見つける", meanings: ["Trouver"], readings: ["みつける"], mnemonicFr: "TROUVER - decouvrir.", targetKanji: ["見"] },
  { word: "思う", meanings: ["Penser"], readings: ["おもう"], mnemonicFr: "PENSER - avoir une pensee.", targetKanji: ["思"] },
  { word: "考える", meanings: ["Reflechir"], readings: ["かんがえる"], mnemonicFr: "REFLECHIR - mediter.", targetKanji: ["考"] },
  { word: "感じる", meanings: ["Ressentir"], readings: ["かんじる"], mnemonicFr: "RESSENTIR - eprouver.", targetKanji: ["感"] },
  { word: "覚える", meanings: ["Memoriser"], readings: ["おぼえる"], mnemonicFr: "MEMORISER - retenir.", targetKanji: ["覚"] },
  { word: "忘れる", meanings: ["Oublier"], readings: ["わすれる"], mnemonicFr: "OUBLIER - ne plus se souvenir.", targetKanji: ["忘"] },
  { word: "分かる", meanings: ["Comprendre"], readings: ["わかる"], mnemonicFr: "COMPRENDRE - saisir le sens.", targetKanji: ["分"] },
  { word: "知る", meanings: ["Savoir"], readings: ["しる"], mnemonicFr: "SAVOIR - avoir connaissance.", targetKanji: ["知"] },
  { word: "教える", meanings: ["Enseigner"], readings: ["おしえる"], mnemonicFr: "ENSEIGNER - transmettre le savoir.", targetKanji: ["教"] },
  { word: "習う", meanings: ["Apprendre"], readings: ["ならう"], mnemonicFr: "APPRENDRE - acquerir une competence.", targetKanji: ["習"] },
  { word: "使う", meanings: ["Utiliser"], readings: ["つかう"], mnemonicFr: "UTILISER - se servir de.", targetKanji: ["使"] },
  { word: "作る", meanings: ["Faire", "Fabriquer"], readings: ["つくる"], mnemonicFr: "FAIRE - creer.", targetKanji: ["作"] },
  { word: "直す", meanings: ["Reparer", "Corriger"], readings: ["なおす"], mnemonicFr: "REPARER - remettre en etat.", targetKanji: ["直"] },
  { word: "壊す", meanings: ["Casser"], readings: ["こわす"], mnemonicFr: "CASSER - briser.", targetKanji: ["壊"] },
  { word: "壊れる", meanings: ["Se casser"], readings: ["こわれる"], mnemonicFr: "SE CASSER - etre brise.", targetKanji: ["壊"] },
];

async function main() {
  console.log("=== SEEDING FINAL VOCABULARY BATCH ===\n");

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
    ...vocabPart11,
    ...vocabPart12,
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
  console.log(`\nAdded: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
