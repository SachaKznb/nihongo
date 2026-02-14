import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Batch 4: Verbs, Adjectives, and Adverbs for French speakers
// Focus on JLPT N5-N3 level common kanji

// Part 1: Essential Verbs (Basic Actions)
const verbsPart1 = [
  // Eating & Drinking
  { word: "食べる", meanings: ["Manger"], readings: ["たべる"], mnemonicFr: "MANGER - mettre de la nourriture dans sa bouche.", targetKanji: ["食"] },
  { word: "飲む", meanings: ["Boire"], readings: ["のむ"], mnemonicFr: "BOIRE - avaler un liquide.", targetKanji: ["飲"] },
  { word: "食べ物", meanings: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "NOURRITURE - ce qu'on mange.", targetKanji: ["食", "物"] },
  { word: "飲み物", meanings: ["Boisson"], readings: ["のみもの"], mnemonicFr: "BOISSON - ce qu'on boit.", targetKanji: ["飲", "物"] },
  { word: "飲食", meanings: ["Manger et boire"], readings: ["いんしょく"], mnemonicFr: "MANGER ET BOIRE - se restaurer.", targetKanji: ["飲", "食"] },

  // Seeing & Hearing
  { word: "見る", meanings: ["Voir", "Regarder"], readings: ["みる"], mnemonicFr: "VOIR - percevoir avec les yeux.", targetKanji: ["見"] },
  { word: "聞く", meanings: ["Entendre", "Demander"], readings: ["きく"], mnemonicFr: "ENTENDRE - percevoir par l'oreille.", targetKanji: ["聞"] },
  { word: "見える", meanings: ["Etre visible"], readings: ["みえる"], mnemonicFr: "ETRE VISIBLE - pouvoir etre vu.", targetKanji: ["見"] },
  { word: "見せる", meanings: ["Montrer"], readings: ["みせる"], mnemonicFr: "MONTRER - faire voir a quelqu'un.", targetKanji: ["見"] },
  { word: "見つける", meanings: ["Trouver", "Decouvrir"], readings: ["みつける"], mnemonicFr: "TROUVER - decouvrir quelque chose.", targetKanji: ["見"] },
  { word: "見学", meanings: ["Visite guidee"], readings: ["けんがく"], mnemonicFr: "VISITE GUIDEE - apprendre en regardant.", targetKanji: ["見", "学"] },

  // Going & Coming
  { word: "行く", meanings: ["Aller"], readings: ["いく"], mnemonicFr: "ALLER - se deplacer vers un lieu.", targetKanji: ["行"] },
  { word: "来る", meanings: ["Venir"], readings: ["くる"], mnemonicFr: "VENIR - se deplacer vers ici.", targetKanji: ["来"] },
  { word: "帰る", meanings: ["Rentrer"], readings: ["かえる"], mnemonicFr: "RENTRER - retourner chez soi.", targetKanji: ["帰"] },
  { word: "帰り", meanings: ["Retour"], readings: ["かえり"], mnemonicFr: "RETOUR - le chemin du retour.", targetKanji: ["帰"] },
  { word: "帰国", meanings: ["Retour au pays"], readings: ["きこく"], mnemonicFr: "RETOUR AU PAYS - rentrer dans son pays.", targetKanji: ["帰", "国"] },
  { word: "行動", meanings: ["Action", "Comportement"], readings: ["こうどう"], mnemonicFr: "ACTION - maniere d'agir.", targetKanji: ["行", "動"] },

  // Buying & Selling
  { word: "買う", meanings: ["Acheter"], readings: ["かう"], mnemonicFr: "ACHETER - obtenir en payant.", targetKanji: ["買"] },
  { word: "売る", meanings: ["Vendre"], readings: ["うる"], mnemonicFr: "VENDRE - ceder contre de l'argent.", targetKanji: ["売"] },
  { word: "買い物", meanings: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "COURSES - faire des achats.", targetKanji: ["買", "物"] },
  { word: "売り場", meanings: ["Rayon", "Comptoir de vente"], readings: ["うりば"], mnemonicFr: "RAYON - endroit ou l'on vend.", targetKanji: ["売", "場"] },
  { word: "売り切れ", meanings: ["Epuise", "Rupture de stock"], readings: ["うりきれ"], mnemonicFr: "EPUISE - tout a ete vendu.", targetKanji: ["売", "切"] },

  // Making & Creating
  { word: "作る", meanings: ["Faire", "Fabriquer"], readings: ["つくる"], mnemonicFr: "FAIRE - creer quelque chose.", targetKanji: ["作"] },
  { word: "作り方", meanings: ["Facon de faire"], readings: ["つくりかた"], mnemonicFr: "FACON DE FAIRE - methode de fabrication.", targetKanji: ["作", "方"] },
  { word: "作業", meanings: ["Travail", "Operation"], readings: ["さぎょう"], mnemonicFr: "TRAVAIL - tache a accomplir.", targetKanji: ["作", "業"] },
  { word: "作文", meanings: ["Redaction", "Composition"], readings: ["さくぶん"], mnemonicFr: "REDACTION - ecrire un texte.", targetKanji: ["作", "文"] },
];

// Part 2: More Essential Verbs (Communication & Learning)
const verbsPart2 = [
  // Writing & Reading
  { word: "書く", meanings: ["Ecrire"], readings: ["かく"], mnemonicFr: "ECRIRE - tracer des lettres.", targetKanji: ["書"] },
  { word: "読む", meanings: ["Lire"], readings: ["よむ"], mnemonicFr: "LIRE - dechiffrer un texte.", targetKanji: ["読"] },
  { word: "書き方", meanings: ["Facon d'ecrire"], readings: ["かきかた"], mnemonicFr: "FACON D'ECRIRE - maniere d'ecrire.", targetKanji: ["書", "方"] },
  { word: "読み方", meanings: ["Facon de lire"], readings: ["よみかた"], mnemonicFr: "FACON DE LIRE - prononciation.", targetKanji: ["読", "方"] },
  { word: "書類", meanings: ["Documents"], readings: ["しょるい"], mnemonicFr: "DOCUMENTS - papiers officiels.", targetKanji: ["書", "類"] },

  // Speaking & Saying
  { word: "話す", meanings: ["Parler"], readings: ["はなす"], mnemonicFr: "PARLER - s'exprimer oralement.", targetKanji: ["話"] },
  { word: "言う", meanings: ["Dire"], readings: ["いう"], mnemonicFr: "DIRE - exprimer par la parole.", targetKanji: ["言"] },
  { word: "話し合う", meanings: ["Discuter"], readings: ["はなしあう"], mnemonicFr: "DISCUTER - parler ensemble.", targetKanji: ["話", "合"] },
  { word: "会話", meanings: ["Conversation"], readings: ["かいわ"], mnemonicFr: "CONVERSATION - echange verbal.", targetKanji: ["会", "話"] },
  { word: "言葉", meanings: ["Mot", "Parole"], readings: ["ことば"], mnemonicFr: "MOT - unite de langage.", targetKanji: ["言", "葉"] },

  // Thinking & Knowing
  { word: "思う", meanings: ["Penser", "Croire"], readings: ["おもう"], mnemonicFr: "PENSER - avoir une idee en tete.", targetKanji: ["思"] },
  { word: "考える", meanings: ["Reflechir"], readings: ["かんがえる"], mnemonicFr: "REFLECHIR - penser profondement.", targetKanji: ["考"] },
  { word: "知る", meanings: ["Savoir", "Connaitre"], readings: ["しる"], mnemonicFr: "SAVOIR - avoir la connaissance.", targetKanji: ["知"] },
  { word: "思い出す", meanings: ["Se souvenir"], readings: ["おもいだす"], mnemonicFr: "SE SOUVENIR - rappeler a la memoire.", targetKanji: ["思", "出"] },
  { word: "思い出", meanings: ["Souvenir"], readings: ["おもいで"], mnemonicFr: "SOUVENIR - memoire du passe.", targetKanji: ["思", "出"] },
  { word: "考え方", meanings: ["Facon de penser"], readings: ["かんがえかた"], mnemonicFr: "FACON DE PENSER - maniere de reflechir.", targetKanji: ["考", "方"] },

  // Learning & Teaching
  { word: "学ぶ", meanings: ["Apprendre", "Etudier"], readings: ["まなぶ"], mnemonicFr: "APPRENDRE - acquerir des connaissances.", targetKanji: ["学"] },
  { word: "教える", meanings: ["Enseigner"], readings: ["おしえる"], mnemonicFr: "ENSEIGNER - transmettre un savoir.", targetKanji: ["教"] },
  { word: "習う", meanings: ["Apprendre (aupr. de qqn)"], readings: ["ならう"], mnemonicFr: "APPRENDRE - recevoir un enseignement.", targetKanji: ["習"] },
  { word: "教室", meanings: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "SALLE DE CLASSE - lieu d'enseignement.", targetKanji: ["教", "室"] },
  { word: "教科書", meanings: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "MANUEL SCOLAIRE - livre pour etudier.", targetKanji: ["教", "科", "書"] },
];

// Part 3: Daily Life Verbs
const verbsPart3 = [
  // Waking & Sleeping
  { word: "起きる", meanings: ["Se lever", "Se reveiller"], readings: ["おきる"], mnemonicFr: "SE LEVER - sortir du lit.", targetKanji: ["起"] },
  { word: "寝る", meanings: ["Dormir", "Se coucher"], readings: ["ねる"], mnemonicFr: "DORMIR - etre en etat de sommeil.", targetKanji: ["寝"] },
  { word: "休む", meanings: ["Se reposer"], readings: ["やすむ"], mnemonicFr: "SE REPOSER - prendre du repos.", targetKanji: ["休"] },
  { word: "起こす", meanings: ["Reveiller qqn"], readings: ["おこす"], mnemonicFr: "REVEILLER - faire sortir du sommeil.", targetKanji: ["起"] },
  { word: "寝坊", meanings: ["Grasse matinee"], readings: ["ねぼう"], mnemonicFr: "GRASSE MATINEE - dormir tard.", targetKanji: ["寝"] },
  { word: "休日", meanings: ["Jour de repos"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS - jour ferie.", targetKanji: ["休", "日"] },
  { word: "休暇", meanings: ["Vacances", "Conge"], readings: ["きゅうか"], mnemonicFr: "VACANCES - periode de repos.", targetKanji: ["休"] },

  // Standing & Sitting
  { word: "立つ", meanings: ["Se lever", "Etre debout"], readings: ["たつ"], mnemonicFr: "SE LEVER - etre en position verticale.", targetKanji: ["立"] },
  { word: "座る", meanings: ["S'asseoir"], readings: ["すわる"], mnemonicFr: "S'ASSEOIR - prendre place sur un siege.", targetKanji: ["座"] },
  { word: "立ち上がる", meanings: ["Se mettre debout"], readings: ["たちあがる"], mnemonicFr: "SE METTRE DEBOUT - se lever.", targetKanji: ["立", "上"] },
  { word: "立場", meanings: ["Position", "Point de vue"], readings: ["たちば"], mnemonicFr: "POSITION - situation sociale.", targetKanji: ["立", "場"] },

  // Walking & Running
  { word: "歩く", meanings: ["Marcher"], readings: ["あるく"], mnemonicFr: "MARCHER - se deplacer a pied.", targetKanji: ["歩"] },
  { word: "走る", meanings: ["Courir"], readings: ["はしる"], mnemonicFr: "COURIR - se deplacer rapidement.", targetKanji: ["走"] },
  { word: "散歩", meanings: ["Promenade"], readings: ["さんぽ"], mnemonicFr: "PROMENADE - marcher pour le plaisir.", targetKanji: ["散", "歩"] },
  { word: "歩道", meanings: ["Trottoir"], readings: ["ほどう"], mnemonicFr: "TROTTOIR - chemin pour pietons.", targetKanji: ["歩", "道"] },

  // Entering & Exiting
  { word: "入る", meanings: ["Entrer"], readings: ["はいる"], mnemonicFr: "ENTRER - penetrer dans un lieu.", targetKanji: ["入"] },
  { word: "出る", meanings: ["Sortir"], readings: ["でる"], mnemonicFr: "SORTIR - quitter un lieu.", targetKanji: ["出"] },
  { word: "入口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - porte pour entrer.", targetKanji: ["入", "口"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - porte pour sortir.", targetKanji: ["出", "口"] },
  { word: "入学", meanings: ["Entree a l'ecole"], readings: ["にゅうがく"], mnemonicFr: "ENTREE A L'ECOLE - commencer l'ecole.", targetKanji: ["入", "学"] },
  { word: "出身", meanings: ["Origine", "Natif de"], readings: ["しゅっしん"], mnemonicFr: "ORIGINE - d'ou l'on vient.", targetKanji: ["出", "身"] },
];

// Part 4: Action Verbs
const verbsPart4 = [
  // Opening & Closing
  { word: "開く", meanings: ["Ouvrir"], readings: ["あく", "ひらく"], mnemonicFr: "OUVRIR - rendre accessible.", targetKanji: ["開"] },
  { word: "閉める", meanings: ["Fermer"], readings: ["しめる"], mnemonicFr: "FERMER - rendre inaccessible.", targetKanji: ["閉"] },
  { word: "開ける", meanings: ["Ouvrir (trans.)"], readings: ["あける"], mnemonicFr: "OUVRIR - faire ouvrir qqch.", targetKanji: ["開"] },
  { word: "開始", meanings: ["Debut", "Commencement"], readings: ["かいし"], mnemonicFr: "DEBUT - commencer quelque chose.", targetKanji: ["開", "始"] },
  { word: "公開", meanings: ["Ouverture au public"], readings: ["こうかい"], mnemonicFr: "OUVERTURE AU PUBLIC - rendre public.", targetKanji: ["公", "開"] },

  // Starting & Ending
  { word: "始める", meanings: ["Commencer"], readings: ["はじめる"], mnemonicFr: "COMMENCER - debuter une action.", targetKanji: ["始"] },
  { word: "終わる", meanings: ["Finir"], readings: ["おわる"], mnemonicFr: "FINIR - arriver a la fin.", targetKanji: ["終"] },
  { word: "始まる", meanings: ["Commencer (intrans.)"], readings: ["はじまる"], mnemonicFr: "COMMENCER - debuter.", targetKanji: ["始"] },
  { word: "終了", meanings: ["Fin", "Cloture"], readings: ["しゅうりょう"], mnemonicFr: "FIN - achever completement.", targetKanji: ["終", "了"] },
  { word: "最終", meanings: ["Final", "Dernier"], readings: ["さいしゅう"], mnemonicFr: "FINAL - le tout dernier.", targetKanji: ["最", "終"] },

  // Waiting & Meeting
  { word: "待つ", meanings: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE - rester en attendant.", targetKanji: ["待"] },
  { word: "会う", meanings: ["Rencontrer"], readings: ["あう"], mnemonicFr: "RENCONTRER - voir quelqu'un.", targetKanji: ["会"] },
  { word: "待ち合わせ", meanings: ["Rendez-vous"], readings: ["まちあわせ"], mnemonicFr: "RENDEZ-VOUS - se retrouver.", targetKanji: ["待", "合"] },
  { word: "会議", meanings: ["Reunion", "Conference"], readings: ["かいぎ"], mnemonicFr: "REUNION - se reunir pour discuter.", targetKanji: ["会", "議"] },
  { word: "出会う", meanings: ["Rencontrer (par hasard)"], readings: ["であう"], mnemonicFr: "RENCONTRER PAR HASARD - croiser qqn.", targetKanji: ["出", "会"] },

  // Using & Helping
  { word: "使う", meanings: ["Utiliser"], readings: ["つかう"], mnemonicFr: "UTILISER - se servir de qqch.", targetKanji: ["使"] },
  { word: "助ける", meanings: ["Aider"], readings: ["たすける"], mnemonicFr: "AIDER - porter secours.", targetKanji: ["助"] },
  { word: "使い方", meanings: ["Mode d'emploi"], readings: ["つかいかた"], mnemonicFr: "MODE D'EMPLOI - facon d'utiliser.", targetKanji: ["使", "方"] },
  { word: "助かる", meanings: ["Etre sauve"], readings: ["たすかる"], mnemonicFr: "ETRE SAUVE - echapper au danger.", targetKanji: ["助"] },
];

// Part 5: Emotional & State Verbs
const verbsPart5 = [
  // Liking & Disliking
  { word: "好む", meanings: ["Aimer", "Preferer"], readings: ["このむ"], mnemonicFr: "AIMER - avoir une preference pour.", targetKanji: ["好"] },
  { word: "嫌う", meanings: ["Detester"], readings: ["きらう"], mnemonicFr: "DETESTER - avoir de l'aversion pour.", targetKanji: ["嫌"] },
  { word: "好き", meanings: ["Aimer", "Apprecier"], readings: ["すき"], mnemonicFr: "AIMER - avoir de l'affection pour.", targetKanji: ["好"] },
  { word: "嫌い", meanings: ["Detester"], readings: ["きらい"], mnemonicFr: "DETESTER - ne pas aimer.", targetKanji: ["嫌"] },
  { word: "大好き", meanings: ["Adorer"], readings: ["だいすき"], mnemonicFr: "ADORER - aimer enormement.", targetKanji: ["大", "好"] },

  // Laughing & Crying
  { word: "笑う", meanings: ["Rire"], readings: ["わらう"], mnemonicFr: "RIRE - exprimer la joie.", targetKanji: ["笑"] },
  { word: "泣く", meanings: ["Pleurer"], readings: ["なく"], mnemonicFr: "PLEURER - verser des larmes.", targetKanji: ["泣"] },
  { word: "笑顔", meanings: ["Sourire"], readings: ["えがお"], mnemonicFr: "SOURIRE - visage souriant.", targetKanji: ["笑", "顔"] },
  { word: "泣き声", meanings: ["Pleurs"], readings: ["なきごえ"], mnemonicFr: "PLEURS - voix de quelqu'un qui pleure.", targetKanji: ["泣", "声"] },

  // Becoming & Changing
  { word: "なる", meanings: ["Devenir"], readings: ["なる"], mnemonicFr: "DEVENIR - changer d'etat.", targetKanji: [] },
  { word: "変わる", meanings: ["Changer (intrans.)"], readings: ["かわる"], mnemonicFr: "CHANGER - se transformer.", targetKanji: ["変"] },
  { word: "変える", meanings: ["Changer (trans.)"], readings: ["かえる"], mnemonicFr: "CHANGER - modifier qqch.", targetKanji: ["変"] },
  { word: "成る", meanings: ["Devenir", "Consister en"], readings: ["なる"], mnemonicFr: "DEVENIR - se transformer en.", targetKanji: ["成"] },
  { word: "成長", meanings: ["Croissance"], readings: ["せいちょう"], mnemonicFr: "CROISSANCE - grandir.", targetKanji: ["成", "長"] },

  // Living & Dying
  { word: "生きる", meanings: ["Vivre"], readings: ["いきる"], mnemonicFr: "VIVRE - etre en vie.", targetKanji: ["生"] },
  { word: "死ぬ", meanings: ["Mourir"], readings: ["しぬ"], mnemonicFr: "MOURIR - cesser de vivre.", targetKanji: ["死"] },
  { word: "生まれる", meanings: ["Naitre"], readings: ["うまれる"], mnemonicFr: "NAITRE - venir au monde.", targetKanji: ["生"] },
  { word: "生年月日", meanings: ["Date de naissance"], readings: ["せいねんがっぴ"], mnemonicFr: "DATE DE NAISSANCE - jour de naissance.", targetKanji: ["生", "年", "月", "日"] },
];

// Part 6: I-Adjectives (Size & Quantity)
const iAdjectivesPart1 = [
  // Size
  { word: "大きい", meanings: ["Grand"], readings: ["おおきい"], mnemonicFr: "GRAND - de grande taille.", targetKanji: ["大"] },
  { word: "小さい", meanings: ["Petit"], readings: ["ちいさい"], mnemonicFr: "PETIT - de petite taille.", targetKanji: ["小"] },
  { word: "高い", meanings: ["Haut", "Cher"], readings: ["たかい"], mnemonicFr: "HAUT/CHER - eleve en hauteur ou en prix.", targetKanji: ["高"] },
  { word: "低い", meanings: ["Bas"], readings: ["ひくい"], mnemonicFr: "BAS - peu eleve.", targetKanji: ["低"] },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - de grande longueur.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - de petite longueur.", targetKanji: ["短"] },
  { word: "広い", meanings: ["Large", "Spacieux"], readings: ["ひろい"], mnemonicFr: "LARGE - de grande etendue.", targetKanji: ["広"] },
  { word: "狭い", meanings: ["Etroit"], readings: ["せまい"], mnemonicFr: "ETROIT - de petite largeur.", targetKanji: ["狭"] },
  { word: "太い", meanings: ["Epais", "Gros"], readings: ["ふとい"], mnemonicFr: "EPAIS - de grande epaisseur.", targetKanji: ["太"] },
  { word: "細い", meanings: ["Fin", "Mince"], readings: ["ほそい"], mnemonicFr: "FIN - de petite epaisseur.", targetKanji: ["細"] },

  // Weight & Speed
  { word: "重い", meanings: ["Lourd"], readings: ["おもい"], mnemonicFr: "LOURD - de grand poids.", targetKanji: ["重"] },
  { word: "軽い", meanings: ["Leger"], readings: ["かるい"], mnemonicFr: "LEGER - de petit poids.", targetKanji: ["軽"] },
  { word: "速い", meanings: ["Rapide"], readings: ["はやい"], mnemonicFr: "RAPIDE - a grande vitesse.", targetKanji: ["速"] },
  { word: "遅い", meanings: ["Lent", "En retard"], readings: ["おそい"], mnemonicFr: "LENT - a petite vitesse.", targetKanji: ["遅"] },
  { word: "早い", meanings: ["Tot", "Rapide"], readings: ["はやい"], mnemonicFr: "TOT - de bonne heure.", targetKanji: ["早"] },
];

// Part 7: I-Adjectives (Price & Age)
const iAdjectivesPart2 = [
  // Price
  { word: "安い", meanings: ["Bon marche"], readings: ["やすい"], mnemonicFr: "BON MARCHE - pas cher.", targetKanji: ["安"] },
  { word: "高価", meanings: ["Cher", "De valeur"], readings: ["こうか"], mnemonicFr: "CHER - de grande valeur.", targetKanji: ["高", "価"] },

  // Age & Time
  { word: "新しい", meanings: ["Nouveau"], readings: ["あたらしい"], mnemonicFr: "NOUVEAU - recent.", targetKanji: ["新"] },
  { word: "古い", meanings: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonicFr: "VIEUX - datant de longtemps.", targetKanji: ["古"] },
  { word: "若い", meanings: ["Jeune"], readings: ["わかい"], mnemonicFr: "JEUNE - peu age.", targetKanji: ["若"] },
  { word: "若者", meanings: ["Jeune personne"], readings: ["わかもの"], mnemonicFr: "JEUNE PERSONNE - les jeunes.", targetKanji: ["若", "者"] },
  { word: "新鮮", meanings: ["Frais"], readings: ["しんせん"], mnemonicFr: "FRAIS - recemment produit.", targetKanji: ["新", "鮮"] },
  { word: "古代", meanings: ["Antiquite"], readings: ["こだい"], mnemonicFr: "ANTIQUITE - temps anciens.", targetKanji: ["古", "代"] },

  // Distance
  { word: "近い", meanings: ["Proche"], readings: ["ちかい"], mnemonicFr: "PROCHE - a courte distance.", targetKanji: ["近"] },
  { word: "遠い", meanings: ["Loin"], readings: ["とおい"], mnemonicFr: "LOIN - a grande distance.", targetKanji: ["遠"] },
  { word: "近所", meanings: ["Voisinage"], readings: ["きんじょ"], mnemonicFr: "VOISINAGE - les alentours.", targetKanji: ["近", "所"] },
  { word: "遠足", meanings: ["Excursion"], readings: ["えんそく"], mnemonicFr: "EXCURSION - sortie scolaire.", targetKanji: ["遠", "足"] },
  { word: "近代", meanings: ["Temps modernes"], readings: ["きんだい"], mnemonicFr: "TEMPS MODERNES - epoque recente.", targetKanji: ["近", "代"] },
];

// Part 8: I-Adjectives (Temperature & Weather)
const iAdjectivesPart3 = [
  // Temperature
  { word: "暑い", meanings: ["Chaud (temps)"], readings: ["あつい"], mnemonicFr: "CHAUD - temperature elevee (meteo).", targetKanji: ["暑"] },
  { word: "寒い", meanings: ["Froid"], readings: ["さむい"], mnemonicFr: "FROID - temperature basse.", targetKanji: ["寒"] },
  { word: "暖かい", meanings: ["Tiede", "Doux"], readings: ["あたたかい"], mnemonicFr: "TIEDE - agreablement chaud.", targetKanji: ["暖"] },
  { word: "涼しい", meanings: ["Frais"], readings: ["すずしい"], mnemonicFr: "FRAIS - agreablement froid.", targetKanji: ["涼"] },
  { word: "熱い", meanings: ["Chaud (objet)"], readings: ["あつい"], mnemonicFr: "CHAUD - brulant au toucher.", targetKanji: ["熱"] },
  { word: "冷たい", meanings: ["Froid (objet)"], readings: ["つめたい"], mnemonicFr: "FROID - glace au toucher.", targetKanji: ["冷"] },
  { word: "温かい", meanings: ["Chaud (agreablement)"], readings: ["あたたかい"], mnemonicFr: "CHAUD - agreablement tiede.", targetKanji: ["温"] },
  { word: "暖房", meanings: ["Chauffage"], readings: ["だんぼう"], mnemonicFr: "CHAUFFAGE - systeme pour chauffer.", targetKanji: ["暖", "房"] },
  { word: "冷房", meanings: ["Climatisation"], readings: ["れいぼう"], mnemonicFr: "CLIMATISATION - systeme pour refroidir.", targetKanji: ["冷", "房"] },
];

// Part 9: I-Adjectives (Feelings & Emotions)
const iAdjectivesPart4 = [
  // Positive feelings
  { word: "楽しい", meanings: ["Amusant", "Agreable"], readings: ["たのしい"], mnemonicFr: "AMUSANT - qui procure du plaisir.", targetKanji: ["楽"] },
  { word: "面白い", meanings: ["Interessant", "Drole"], readings: ["おもしろい"], mnemonicFr: "INTERESSANT - qui captive.", targetKanji: ["面", "白"] },
  { word: "嬉しい", meanings: ["Content", "Heureux"], readings: ["うれしい"], mnemonicFr: "CONTENT - etat de joie.", targetKanji: ["嬉"] },
  { word: "優しい", meanings: ["Gentil", "Doux"], readings: ["やさしい"], mnemonicFr: "GENTIL - plein de bonte.", targetKanji: ["優"] },
  { word: "楽しみ", meanings: ["Plaisir", "Attente"], readings: ["たのしみ"], mnemonicFr: "PLAISIR - joie anticipee.", targetKanji: ["楽"] },

  // Negative feelings
  { word: "悲しい", meanings: ["Triste"], readings: ["かなしい"], mnemonicFr: "TRISTE - etat de chagrin.", targetKanji: ["悲"] },
  { word: "寂しい", meanings: ["Solitaire", "Seul"], readings: ["さびしい"], mnemonicFr: "SOLITAIRE - sentiment de solitude.", targetKanji: ["寂"] },
  { word: "怖い", meanings: ["Effrayant"], readings: ["こわい"], mnemonicFr: "EFFRAYANT - qui fait peur.", targetKanji: ["怖"] },
  { word: "恥ずかしい", meanings: ["Embarrassant", "Honteux"], readings: ["はずかしい"], mnemonicFr: "EMBARRASSANT - qui cause de la honte.", targetKanji: ["恥"] },
  { word: "悔しい", meanings: ["Frustrant", "Rageant"], readings: ["くやしい"], mnemonicFr: "FRUSTRANT - sentiment de regret.", targetKanji: ["悔"] },
];

// Part 10: I-Adjectives (Difficulty & Quality)
const iAdjectivesPart5 = [
  // Difficulty
  { word: "難しい", meanings: ["Difficile"], readings: ["むずかしい"], mnemonicFr: "DIFFICILE - pas facile.", targetKanji: ["難"] },
  { word: "易しい", meanings: ["Facile", "Simple"], readings: ["やさしい"], mnemonicFr: "FACILE - sans difficulte.", targetKanji: ["易"] },
  { word: "厳しい", meanings: ["Severe", "Strict"], readings: ["きびしい"], mnemonicFr: "SEVERE - rigoureux.", targetKanji: ["厳"] },
  { word: "忙しい", meanings: ["Occupe"], readings: ["いそがしい"], mnemonicFr: "OCCUPE - ayant beaucoup a faire.", targetKanji: ["忙"] },
  { word: "難易度", meanings: ["Niveau de difficulte"], readings: ["なんいど"], mnemonicFr: "NIVEAU DE DIFFICULTE - degre de complexite.", targetKanji: ["難", "易", "度"] },

  // Quality
  { word: "良い", meanings: ["Bon"], readings: ["よい", "いい"], mnemonicFr: "BON - de bonne qualite.", targetKanji: ["良"] },
  { word: "悪い", meanings: ["Mauvais"], readings: ["わるい"], mnemonicFr: "MAUVAIS - de mauvaise qualite.", targetKanji: ["悪"] },
  { word: "正しい", meanings: ["Correct", "Juste"], readings: ["ただしい"], mnemonicFr: "CORRECT - sans erreur.", targetKanji: ["正"] },
  { word: "美味しい", meanings: ["Delicieux"], readings: ["おいしい"], mnemonicFr: "DELICIEUX - tres bon gout.", targetKanji: ["美", "味"] },
  { word: "不味い", meanings: ["Mauvais gout"], readings: ["まずい"], mnemonicFr: "MAUVAIS GOUT - desagreable au gout.", targetKanji: ["不", "味"] },

  // Strength
  { word: "強い", meanings: ["Fort"], readings: ["つよい"], mnemonicFr: "FORT - puissant.", targetKanji: ["強"] },
  { word: "弱い", meanings: ["Faible"], readings: ["よわい"], mnemonicFr: "FAIBLE - sans force.", targetKanji: ["弱"] },
  { word: "強化", meanings: ["Renforcement"], readings: ["きょうか"], mnemonicFr: "RENFORCEMENT - rendre plus fort.", targetKanji: ["強", "化"] },
  { word: "弱点", meanings: ["Point faible"], readings: ["じゃくてん"], mnemonicFr: "POINT FAIBLE - faiblesse.", targetKanji: ["弱", "点"] },
];

// Part 11: I-Adjectives (Physical States)
const iAdjectivesPart6 = [
  // Physical conditions
  { word: "明るい", meanings: ["Clair", "Lumineux"], readings: ["あかるい"], mnemonicFr: "CLAIR - bien eclaire.", targetKanji: ["明"] },
  { word: "暗い", meanings: ["Sombre"], readings: ["くらい"], mnemonicFr: "SOMBRE - peu eclaire.", targetKanji: ["暗"] },
  { word: "白い", meanings: ["Blanc"], readings: ["しろい"], mnemonicFr: "BLANC - de couleur blanche.", targetKanji: ["白"] },
  { word: "黒い", meanings: ["Noir"], readings: ["くろい"], mnemonicFr: "NOIR - de couleur noire.", targetKanji: ["黒"] },
  { word: "赤い", meanings: ["Rouge"], readings: ["あかい"], mnemonicFr: "ROUGE - de couleur rouge.", targetKanji: ["赤"] },
  { word: "青い", meanings: ["Bleu", "Vert"], readings: ["あおい"], mnemonicFr: "BLEU - de couleur bleue.", targetKanji: ["青"] },
  { word: "黄色い", meanings: ["Jaune"], readings: ["きいろい"], mnemonicFr: "JAUNE - de couleur jaune.", targetKanji: ["黄", "色"] },

  // Texture & State
  { word: "硬い", meanings: ["Dur"], readings: ["かたい"], mnemonicFr: "DUR - resistant a la pression.", targetKanji: ["硬"] },
  { word: "柔らかい", meanings: ["Mou", "Souple"], readings: ["やわらかい"], mnemonicFr: "MOU - qui cede facilement.", targetKanji: ["柔"] },
  { word: "丸い", meanings: ["Rond"], readings: ["まるい"], mnemonicFr: "ROND - de forme circulaire.", targetKanji: ["丸"] },
  { word: "四角い", meanings: ["Carre"], readings: ["しかくい"], mnemonicFr: "CARRE - de forme carree.", targetKanji: ["四", "角"] },
];

// Part 12: Na-Adjectives
const naAdjectives = [
  // Common na-adjectives
  { word: "静か", meanings: ["Calme", "Silencieux"], readings: ["しずか"], mnemonicFr: "CALME - sans bruit.", targetKanji: ["静"] },
  { word: "賑やか", meanings: ["Anime", "Vivant"], readings: ["にぎやか"], mnemonicFr: "ANIME - plein de vie.", targetKanji: ["賑"] },
  { word: "綺麗", meanings: ["Beau", "Propre"], readings: ["きれい"], mnemonicFr: "BEAU - agreable a regarder.", targetKanji: ["綺", "麗"] },
  { word: "有名", meanings: ["Celebre"], readings: ["ゆうめい"], mnemonicFr: "CELEBRE - connu de tous.", targetKanji: ["有", "名"] },
  { word: "元気", meanings: ["En forme"], readings: ["げんき"], mnemonicFr: "EN FORME - en bonne sante.", targetKanji: ["元", "気"] },
  { word: "丈夫", meanings: ["Solide", "Robuste"], readings: ["じょうぶ"], mnemonicFr: "SOLIDE - resistant.", targetKanji: ["丈", "夫"] },
  { word: "便利", meanings: ["Pratique"], readings: ["べんり"], mnemonicFr: "PRATIQUE - utile et commode.", targetKanji: ["便", "利"] },
  { word: "不便", meanings: ["Peu pratique"], readings: ["ふべん"], mnemonicFr: "PEU PRATIQUE - pas commode.", targetKanji: ["不", "便"] },
  { word: "簡単", meanings: ["Simple"], readings: ["かんたん"], mnemonicFr: "SIMPLE - pas complique.", targetKanji: ["簡", "単"] },
  { word: "複雑", meanings: ["Complique"], readings: ["ふくざつ"], mnemonicFr: "COMPLIQUE - difficile a comprendre.", targetKanji: ["複", "雑"] },
  { word: "大切", meanings: ["Important", "Precieux"], readings: ["たいせつ"], mnemonicFr: "IMPORTANT - de grande valeur.", targetKanji: ["大", "切"] },
  { word: "大事", meanings: ["Important"], readings: ["だいじ"], mnemonicFr: "IMPORTANT - qui compte beaucoup.", targetKanji: ["大", "事"] },
  { word: "特別", meanings: ["Special"], readings: ["とくべつ"], mnemonicFr: "SPECIAL - hors du commun.", targetKanji: ["特", "別"] },
  { word: "普通", meanings: ["Ordinaire"], readings: ["ふつう"], mnemonicFr: "ORDINAIRE - normal, banal.", targetKanji: ["普", "通"] },
  { word: "安全", meanings: ["Sur", "Securise"], readings: ["あんぜん"], mnemonicFr: "SUR - sans danger.", targetKanji: ["安", "全"] },
  { word: "危険", meanings: ["Dangereux"], readings: ["きけん"], mnemonicFr: "DANGEREUX - qui presente un risque.", targetKanji: ["危", "険"] },
  { word: "自由", meanings: ["Libre"], readings: ["じゆう"], mnemonicFr: "LIBRE - sans contrainte.", targetKanji: ["自", "由"] },
  { word: "確か", meanings: ["Certain", "Sur"], readings: ["たしか"], mnemonicFr: "CERTAIN - sans doute.", targetKanji: ["確"] },
  { word: "十分", meanings: ["Suffisant"], readings: ["じゅうぶん"], mnemonicFr: "SUFFISANT - assez.", targetKanji: ["十", "分"] },
  { word: "必要", meanings: ["Necessaire"], readings: ["ひつよう"], mnemonicFr: "NECESSAIRE - indispensable.", targetKanji: ["必", "要"] },
];

// Part 13: Adverbs (Time)
const adverbsTime = [
  { word: "今", meanings: ["Maintenant"], readings: ["いま"], mnemonicFr: "MAINTENANT - en ce moment.", targetKanji: ["今"] },
  { word: "後", meanings: ["Apres", "Plus tard"], readings: ["あと"], mnemonicFr: "APRES - dans le futur.", targetKanji: ["後"] },
  { word: "先", meanings: ["Avant", "D'abord"], readings: ["さき"], mnemonicFr: "AVANT - anterieurement.", targetKanji: ["先"] },
  { word: "前", meanings: ["Avant", "Devant"], readings: ["まえ"], mnemonicFr: "AVANT - precedemment.", targetKanji: ["前"] },
  { word: "今日", meanings: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "AUJOURD'HUI - ce jour.", targetKanji: ["今", "日"] },
  { word: "明日", meanings: ["Demain"], readings: ["あした", "あす"], mnemonicFr: "DEMAIN - le jour suivant.", targetKanji: ["明", "日"] },
  { word: "昨日", meanings: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER - le jour precedent.", targetKanji: ["昨", "日"] },
  { word: "今週", meanings: ["Cette semaine"], readings: ["こんしゅう"], mnemonicFr: "CETTE SEMAINE - la semaine actuelle.", targetKanji: ["今", "週"] },
  { word: "来週", meanings: ["La semaine prochaine"], readings: ["らいしゅう"], mnemonicFr: "LA SEMAINE PROCHAINE - la semaine suivante.", targetKanji: ["来", "週"] },
  { word: "先週", meanings: ["La semaine derniere"], readings: ["せんしゅう"], mnemonicFr: "LA SEMAINE DERNIERE - la semaine precedente.", targetKanji: ["先", "週"] },
  { word: "今月", meanings: ["Ce mois-ci"], readings: ["こんげつ"], mnemonicFr: "CE MOIS-CI - le mois actuel.", targetKanji: ["今", "月"] },
  { word: "来月", meanings: ["Le mois prochain"], readings: ["らいげつ"], mnemonicFr: "LE MOIS PROCHAIN - le mois suivant.", targetKanji: ["来", "月"] },
  { word: "先月", meanings: ["Le mois dernier"], readings: ["せんげつ"], mnemonicFr: "LE MOIS DERNIER - le mois precedent.", targetKanji: ["先", "月"] },
  { word: "今年", meanings: ["Cette annee"], readings: ["ことし"], mnemonicFr: "CETTE ANNEE - l'annee actuelle.", targetKanji: ["今", "年"] },
  { word: "来年", meanings: ["L'annee prochaine"], readings: ["らいねん"], mnemonicFr: "L'ANNEE PROCHAINE - l'annee suivante.", targetKanji: ["来", "年"] },
  { word: "去年", meanings: ["L'annee derniere"], readings: ["きょねん"], mnemonicFr: "L'ANNEE DERNIERE - l'annee precedente.", targetKanji: ["去", "年"] },
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - quotidiennement.", targetKanji: ["毎", "日"] },
  { word: "毎週", meanings: ["Chaque semaine"], readings: ["まいしゅう"], mnemonicFr: "CHAQUE SEMAINE - hebdomadairement.", targetKanji: ["毎", "週"] },
  { word: "毎月", meanings: ["Chaque mois"], readings: ["まいつき"], mnemonicFr: "CHAQUE MOIS - mensuellement.", targetKanji: ["毎", "月"] },
  { word: "毎年", meanings: ["Chaque annee"], readings: ["まいとし", "まいねん"], mnemonicFr: "CHAQUE ANNEE - annuellement.", targetKanji: ["毎", "年"] },
];

// Part 14: Adverbs (Manner & Degree)
const adverbsManner = [
  // Frequency
  { word: "いつも", meanings: ["Toujours"], readings: ["いつも"], mnemonicFr: "TOUJOURS - en permanence.", targetKanji: [] },
  { word: "時々", meanings: ["Parfois"], readings: ["ときどき"], mnemonicFr: "PARFOIS - de temps en temps.", targetKanji: ["時"] },
  { word: "たまに", meanings: ["Rarement"], readings: ["たまに"], mnemonicFr: "RAREMENT - peu souvent.", targetKanji: [] },
  { word: "よく", meanings: ["Souvent", "Bien"], readings: ["よく"], mnemonicFr: "SOUVENT - frequemment.", targetKanji: [] },
  { word: "全然", meanings: ["Pas du tout"], readings: ["ぜんぜん"], mnemonicFr: "PAS DU TOUT - absolument pas.", targetKanji: ["全", "然"] },
  { word: "絶対", meanings: ["Absolument"], readings: ["ぜったい"], mnemonicFr: "ABSOLUMENT - sans exception.", targetKanji: ["絶", "対"] },

  // Degree
  { word: "とても", meanings: ["Tres"], readings: ["とても"], mnemonicFr: "TRES - a un haut degre.", targetKanji: [] },
  { word: "少し", meanings: ["Un peu"], readings: ["すこし"], mnemonicFr: "UN PEU - en petite quantite.", targetKanji: ["少"] },
  { word: "たくさん", meanings: ["Beaucoup"], readings: ["たくさん"], mnemonicFr: "BEAUCOUP - en grande quantite.", targetKanji: [] },
  { word: "多く", meanings: ["Beaucoup", "Nombreux"], readings: ["おおく"], mnemonicFr: "BEAUCOUP - en grand nombre.", targetKanji: ["多"] },
  { word: "少ない", meanings: ["Peu nombreux"], readings: ["すくない"], mnemonicFr: "PEU NOMBREUX - en petit nombre.", targetKanji: ["少"] },
  { word: "多い", meanings: ["Nombreux"], readings: ["おおい"], mnemonicFr: "NOMBREUX - en grande quantite.", targetKanji: ["多"] },
  { word: "全部", meanings: ["Tout", "Entier"], readings: ["ぜんぶ"], mnemonicFr: "TOUT - la totalite.", targetKanji: ["全", "部"] },
  { word: "半分", meanings: ["Moitie"], readings: ["はんぶん"], mnemonicFr: "MOITIE - la moitie.", targetKanji: ["半", "分"] },

  // Manner
  { word: "本当に", meanings: ["Vraiment"], readings: ["ほんとうに"], mnemonicFr: "VRAIMENT - reellement.", targetKanji: ["本", "当"] },
  { word: "特に", meanings: ["Particulierement"], readings: ["とくに"], mnemonicFr: "PARTICULIEREMENT - surtout.", targetKanji: ["特"] },
  { word: "急に", meanings: ["Soudainement"], readings: ["きゅうに"], mnemonicFr: "SOUDAINEMENT - tout a coup.", targetKanji: ["急"] },
  { word: "静かに", meanings: ["Calmement"], readings: ["しずかに"], mnemonicFr: "CALMEMENT - sans bruit.", targetKanji: ["静"] },
  { word: "速く", meanings: ["Rapidement"], readings: ["はやく"], mnemonicFr: "RAPIDEMENT - a grande vitesse.", targetKanji: ["速"] },
  { word: "ゆっくり", meanings: ["Lentement"], readings: ["ゆっくり"], mnemonicFr: "LENTEMENT - sans se presser.", targetKanji: [] },
];

// Part 15: More Essential Verbs
const verbsPart6 = [
  // Communication verbs
  { word: "答える", meanings: ["Repondre"], readings: ["こたえる"], mnemonicFr: "REPONDRE - donner une reponse.", targetKanji: ["答"] },
  { word: "質問", meanings: ["Question"], readings: ["しつもん"], mnemonicFr: "QUESTION - demande d'info.", targetKanji: ["質", "問"] },
  { word: "呼ぶ", meanings: ["Appeler"], readings: ["よぶ"], mnemonicFr: "APPELER - faire venir qqn.", targetKanji: ["呼"] },
  { word: "説明", meanings: ["Explication"], readings: ["せつめい"], mnemonicFr: "EXPLICATION - rendre clair.", targetKanji: ["説", "明"] },
  { word: "伝える", meanings: ["Transmettre"], readings: ["つたえる"], mnemonicFr: "TRANSMETTRE - faire passer.", targetKanji: ["伝"] },

  // Physical actions
  { word: "持つ", meanings: ["Tenir", "Avoir"], readings: ["もつ"], mnemonicFr: "TENIR - avoir en main.", targetKanji: ["持"] },
  { word: "置く", meanings: ["Poser", "Mettre"], readings: ["おく"], mnemonicFr: "POSER - mettre quelque part.", targetKanji: ["置"] },
  { word: "取る", meanings: ["Prendre"], readings: ["とる"], mnemonicFr: "PRENDRE - saisir.", targetKanji: ["取"] },
  { word: "投げる", meanings: ["Lancer"], readings: ["なげる"], mnemonicFr: "LANCER - jeter.", targetKanji: ["投"] },
  { word: "押す", meanings: ["Pousser", "Appuyer"], readings: ["おす"], mnemonicFr: "POUSSER - exercer une pression.", targetKanji: ["押"] },
  { word: "引く", meanings: ["Tirer"], readings: ["ひく"], mnemonicFr: "TIRER - attirer vers soi.", targetKanji: ["引"] },
  { word: "切る", meanings: ["Couper"], readings: ["きる"], mnemonicFr: "COUPER - separer avec un outil.", targetKanji: ["切"] },
  { word: "折る", meanings: ["Plier", "Casser"], readings: ["おる"], mnemonicFr: "PLIER - faire un pli.", targetKanji: ["折"] },
  { word: "割る", meanings: ["Casser", "Diviser"], readings: ["わる"], mnemonicFr: "CASSER - briser en morceaux.", targetKanji: ["割"] },
  { word: "落ちる", meanings: ["Tomber"], readings: ["おちる"], mnemonicFr: "TOMBER - chuter.", targetKanji: ["落"] },
  { word: "落とす", meanings: ["Faire tomber"], readings: ["おとす"], mnemonicFr: "FAIRE TOMBER - lacher.", targetKanji: ["落"] },
  { word: "上げる", meanings: ["Lever", "Donner"], readings: ["あげる"], mnemonicFr: "LEVER - monter.", targetKanji: ["上"] },
  { word: "下げる", meanings: ["Baisser"], readings: ["さげる"], mnemonicFr: "BAISSER - descendre.", targetKanji: ["下"] },
  { word: "上がる", meanings: ["Monter"], readings: ["あがる"], mnemonicFr: "MONTER - aller vers le haut.", targetKanji: ["上"] },
  { word: "下がる", meanings: ["Descendre"], readings: ["さがる"], mnemonicFr: "DESCENDRE - aller vers le bas.", targetKanji: ["下"] },
];

// Part 16: State & Position Verbs
const verbsPart7 = [
  // Position verbs
  { word: "ある", meanings: ["Il y a", "Exister (inanime)"], readings: ["ある"], mnemonicFr: "IL Y A - existence d'une chose.", targetKanji: [] },
  { word: "いる", meanings: ["Il y a", "Exister (anime)"], readings: ["いる"], mnemonicFr: "IL Y A - presence d'un etre vivant.", targetKanji: [] },
  { word: "在る", meanings: ["Exister"], readings: ["ある"], mnemonicFr: "EXISTER - etre present.", targetKanji: ["在"] },
  { word: "居る", meanings: ["Etre present"], readings: ["いる"], mnemonicFr: "ETRE PRESENT - se trouver quelque part.", targetKanji: ["居"] },

  // Giving & Receiving
  { word: "あげる", meanings: ["Donner"], readings: ["あげる"], mnemonicFr: "DONNER - offrir a quelqu'un.", targetKanji: [] },
  { word: "もらう", meanings: ["Recevoir"], readings: ["もらう"], mnemonicFr: "RECEVOIR - obtenir de quelqu'un.", targetKanji: [] },
  { word: "くれる", meanings: ["Donner (a moi)"], readings: ["くれる"], mnemonicFr: "DONNER - offrir (a moi/ma famille).", targetKanji: [] },
  { word: "貸す", meanings: ["Preter"], readings: ["かす"], mnemonicFr: "PRETER - donner temporairement.", targetKanji: ["貸"] },
  { word: "借りる", meanings: ["Emprunter"], readings: ["かりる"], mnemonicFr: "EMPRUNTER - prendre temporairement.", targetKanji: ["借"] },

  // Wearing
  { word: "着る", meanings: ["Porter (vetement)"], readings: ["きる"], mnemonicFr: "PORTER - mettre un vetement.", targetKanji: ["着"] },
  { word: "履く", meanings: ["Porter (chaussure)"], readings: ["はく"], mnemonicFr: "PORTER - mettre des chaussures.", targetKanji: ["履"] },
  { word: "被る", meanings: ["Porter (chapeau)"], readings: ["かぶる"], mnemonicFr: "PORTER - mettre sur la tete.", targetKanji: ["被"] },
  { word: "脱ぐ", meanings: ["Enlever (vetement)"], readings: ["ぬぐ"], mnemonicFr: "ENLEVER - oter un vetement.", targetKanji: ["脱"] },
  { word: "着替える", meanings: ["Se changer"], readings: ["きがえる"], mnemonicFr: "SE CHANGER - changer de vetements.", targetKanji: ["着", "替"] },

  // Cleaning
  { word: "洗う", meanings: ["Laver"], readings: ["あらう"], mnemonicFr: "LAVER - nettoyer avec de l'eau.", targetKanji: ["洗"] },
  { word: "掃除", meanings: ["Nettoyage", "Menage"], readings: ["そうじ"], mnemonicFr: "NETTOYAGE - nettoyer un lieu.", targetKanji: ["掃", "除"] },
  { word: "片付ける", meanings: ["Ranger"], readings: ["かたづける"], mnemonicFr: "RANGER - mettre en ordre.", targetKanji: ["片", "付"] },
];

// Part 17: Movement & Transportation Verbs
const verbsPart8 = [
  // Transportation
  { word: "乗る", meanings: ["Monter (vehicule)"], readings: ["のる"], mnemonicFr: "MONTER - prendre un transport.", targetKanji: ["乗"] },
  { word: "降りる", meanings: ["Descendre"], readings: ["おりる"], mnemonicFr: "DESCENDRE - quitter un transport.", targetKanji: ["降"] },
  { word: "運転", meanings: ["Conduite"], readings: ["うんてん"], mnemonicFr: "CONDUITE - conduire un vehicule.", targetKanji: ["運", "転"] },
  { word: "運ぶ", meanings: ["Transporter"], readings: ["はこぶ"], mnemonicFr: "TRANSPORTER - deplacer qqch.", targetKanji: ["運"] },
  { word: "届ける", meanings: ["Livrer", "Apporter"], readings: ["とどける"], mnemonicFr: "LIVRER - apporter a destination.", targetKanji: ["届"] },
  { word: "届く", meanings: ["Arriver"], readings: ["とどく"], mnemonicFr: "ARRIVER - parvenir a destination.", targetKanji: ["届"] },
  { word: "渡る", meanings: ["Traverser"], readings: ["わたる"], mnemonicFr: "TRAVERSER - passer de l'autre cote.", targetKanji: ["渡"] },
  { word: "渡す", meanings: ["Remettre"], readings: ["わたす"], mnemonicFr: "REMETTRE - donner en main propre.", targetKanji: ["渡"] },
  { word: "曲がる", meanings: ["Tourner"], readings: ["まがる"], mnemonicFr: "TOURNER - changer de direction.", targetKanji: ["曲"] },
  { word: "止まる", meanings: ["S'arreter"], readings: ["とまる"], mnemonicFr: "S'ARRETER - cesser de bouger.", targetKanji: ["止"] },
  { word: "止める", meanings: ["Arreter"], readings: ["とめる"], mnemonicFr: "ARRETER - faire cesser.", targetKanji: ["止"] },
  { word: "動く", meanings: ["Bouger"], readings: ["うごく"], mnemonicFr: "BOUGER - changer de place.", targetKanji: ["動"] },
  { word: "動かす", meanings: ["Deplacer"], readings: ["うごかす"], mnemonicFr: "DEPLACER - faire bouger.", targetKanji: ["動"] },
];

// Part 18: Perception & Mental Verbs
const verbsPart9 = [
  // Understanding
  { word: "分かる", meanings: ["Comprendre"], readings: ["わかる"], mnemonicFr: "COMPRENDRE - saisir le sens.", targetKanji: ["分"] },
  { word: "理解", meanings: ["Comprehension"], readings: ["りかい"], mnemonicFr: "COMPREHENSION - comprendre bien.", targetKanji: ["理", "解"] },
  { word: "覚える", meanings: ["Memoriser", "Se souvenir"], readings: ["おぼえる"], mnemonicFr: "MEMORISER - retenir dans la memoire.", targetKanji: ["覚"] },
  { word: "忘れる", meanings: ["Oublier"], readings: ["わすれる"], mnemonicFr: "OUBLIER - ne plus se rappeler.", targetKanji: ["忘"] },
  { word: "気づく", meanings: ["Remarquer", "Se rendre compte"], readings: ["きづく"], mnemonicFr: "REMARQUER - prendre conscience.", targetKanji: ["気"] },

  // Deciding & Choosing
  { word: "決める", meanings: ["Decider"], readings: ["きめる"], mnemonicFr: "DECIDER - faire un choix.", targetKanji: ["決"] },
  { word: "決まる", meanings: ["Etre decide"], readings: ["きまる"], mnemonicFr: "ETRE DECIDE - etre fixe.", targetKanji: ["決"] },
  { word: "選ぶ", meanings: ["Choisir"], readings: ["えらぶ"], mnemonicFr: "CHOISIR - faire une selection.", targetKanji: ["選"] },
  { word: "比べる", meanings: ["Comparer"], readings: ["くらべる"], mnemonicFr: "COMPARER - mettre en parallele.", targetKanji: ["比"] },

  // Trying & Attempting
  { word: "試す", meanings: ["Essayer", "Tester"], readings: ["ためす"], mnemonicFr: "ESSAYER - faire un essai.", targetKanji: ["試"] },
  { word: "試験", meanings: ["Examen"], readings: ["しけん"], mnemonicFr: "EXAMEN - test de connaissances.", targetKanji: ["試", "験"] },
  { word: "練習", meanings: ["Entrainement"], readings: ["れんしゅう"], mnemonicFr: "ENTRAINEMENT - s'exercer.", targetKanji: ["練", "習"] },
  { word: "努力", meanings: ["Effort"], readings: ["どりょく"], mnemonicFr: "EFFORT - travailler dur.", targetKanji: ["努", "力"] },
  { word: "頑張る", meanings: ["Faire de son mieux"], readings: ["がんばる"], mnemonicFr: "FAIRE DE SON MIEUX - perseverer.", targetKanji: ["頑", "張"] },
];

// Part 19: Work & Activity Verbs
const verbsPart10 = [
  // Working
  { word: "働く", meanings: ["Travailler"], readings: ["はたらく"], mnemonicFr: "TRAVAILLER - exercer un metier.", targetKanji: ["働"] },
  { word: "仕事", meanings: ["Travail"], readings: ["しごと"], mnemonicFr: "TRAVAIL - activite professionnelle.", targetKanji: ["仕", "事"] },
  { word: "務める", meanings: ["Servir", "Travailler pour"], readings: ["つとめる"], mnemonicFr: "SERVIR - exercer une fonction.", targetKanji: ["務"] },
  { word: "勤める", meanings: ["Etre employe"], readings: ["つとめる"], mnemonicFr: "ETRE EMPLOYE - travailler quelque part.", targetKanji: ["勤"] },

  // Playing & Sports
  { word: "遊ぶ", meanings: ["Jouer", "S'amuser"], readings: ["あそぶ"], mnemonicFr: "JOUER - s'amuser.", targetKanji: ["遊"] },
  { word: "泳ぐ", meanings: ["Nager"], readings: ["およぐ"], mnemonicFr: "NAGER - se deplacer dans l'eau.", targetKanji: ["泳"] },
  { word: "登る", meanings: ["Grimper", "Monter"], readings: ["のぼる"], mnemonicFr: "GRIMPER - escalader.", targetKanji: ["登"] },
  { word: "飛ぶ", meanings: ["Voler"], readings: ["とぶ"], mnemonicFr: "VOLER - se deplacer dans l'air.", targetKanji: ["飛"] },
  { word: "跳ぶ", meanings: ["Sauter"], readings: ["とぶ"], mnemonicFr: "SAUTER - bondir.", targetKanji: ["跳"] },
  { word: "勝つ", meanings: ["Gagner"], readings: ["かつ"], mnemonicFr: "GAGNER - remporter.", targetKanji: ["勝"] },
  { word: "負ける", meanings: ["Perdre"], readings: ["まける"], mnemonicFr: "PERDRE - etre vaincu.", targetKanji: ["負"] },

  // Creating
  { word: "描く", meanings: ["Dessiner"], readings: ["えがく", "かく"], mnemonicFr: "DESSINER - tracer une image.", targetKanji: ["描"] },
  { word: "歌う", meanings: ["Chanter"], readings: ["うたう"], mnemonicFr: "CHANTER - produire de la musique.", targetKanji: ["歌"] },
  { word: "踊る", meanings: ["Danser"], readings: ["おどる"], mnemonicFr: "DANSER - bouger en musique.", targetKanji: ["踊"] },
  { word: "弾く", meanings: ["Jouer (instrument)"], readings: ["ひく"], mnemonicFr: "JOUER - jouer d'un instrument.", targetKanji: ["弾"] },
];

// Part 20: Additional Adjectives & Expressions
const additionalAdjectives = [
  // More emotions
  { word: "幸せ", meanings: ["Heureux", "Bonheur"], readings: ["しあわせ"], mnemonicFr: "HEUREUX - etat de bonheur.", targetKanji: ["幸"] },
  { word: "不幸", meanings: ["Malheureux"], readings: ["ふこう"], mnemonicFr: "MALHEUREUX - pas de chance.", targetKanji: ["不", "幸"] },
  { word: "心配", meanings: ["Inquiet"], readings: ["しんぱい"], mnemonicFr: "INQUIET - preoccupe.", targetKanji: ["心", "配"] },
  { word: "安心", meanings: ["Rassure"], readings: ["あんしん"], mnemonicFr: "RASSURE - sans souci.", targetKanji: ["安", "心"] },
  { word: "残念", meanings: ["Dommage", "Regrettable"], readings: ["ざんねん"], mnemonicFr: "DOMMAGE - c'est regrettable.", targetKanji: ["残", "念"] },

  // Certainty
  { word: "確実", meanings: ["Certain", "Sur"], readings: ["かくじつ"], mnemonicFr: "CERTAIN - sans doute.", targetKanji: ["確", "実"] },
  { word: "明確", meanings: ["Clair", "Net"], readings: ["めいかく"], mnemonicFr: "CLAIR - sans ambiguite.", targetKanji: ["明", "確"] },
  { word: "不明", meanings: ["Inconnu", "Incertain"], readings: ["ふめい"], mnemonicFr: "INCONNU - pas clair.", targetKanji: ["不", "明"] },

  // Size & Shape related
  { word: "巨大", meanings: ["Enorme", "Gigantesque"], readings: ["きょだい"], mnemonicFr: "ENORME - tres grand.", targetKanji: ["巨", "大"] },
  { word: "微小", meanings: ["Minuscule"], readings: ["びしょう"], mnemonicFr: "MINUSCULE - tres petit.", targetKanji: ["微", "小"] },
  { word: "均等", meanings: ["Egal", "Uniforme"], readings: ["きんとう"], mnemonicFr: "EGAL - reparti egalement.", targetKanji: ["均", "等"] },
  { word: "同等", meanings: ["Equivalent"], readings: ["どうとう"], mnemonicFr: "EQUIVALENT - de meme niveau.", targetKanji: ["同", "等"] },

  // Time-related adjectives
  { word: "急", meanings: ["Urgent", "Soudain"], readings: ["きゅう"], mnemonicFr: "URGENT - qui presse.", targetKanji: ["急"] },
  { word: "緩やか", meanings: ["Doux", "Progressif"], readings: ["ゆるやか"], mnemonicFr: "DOUX - pas brusque.", targetKanji: ["緩"] },
  { word: "永遠", meanings: ["Eternel"], readings: ["えいえん"], mnemonicFr: "ETERNEL - pour toujours.", targetKanji: ["永", "遠"] },
  { word: "一時的", meanings: ["Temporaire"], readings: ["いちじてき"], mnemonicFr: "TEMPORAIRE - pour un temps.", targetKanji: ["一", "時", "的"] },
];

async function main() {
  console.log("=== BATCH 4: VERBS, ADJECTIVES & ADVERBS ===\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true, id: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const kanjiIds = new Map(allKanji.map(k => [k.character, k.id]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  const allVocab = [
    ...verbsPart1,
    ...verbsPart2,
    ...verbsPart3,
    ...verbsPart4,
    ...verbsPart5,
    ...verbsPart6,
    ...verbsPart7,
    ...verbsPart8,
    ...verbsPart9,
    ...verbsPart10,
    ...iAdjectivesPart1,
    ...iAdjectivesPart2,
    ...iAdjectivesPart3,
    ...iAdjectivesPart4,
    ...iAdjectivesPart5,
    ...iAdjectivesPart6,
    ...naAdjectives,
    ...adverbsTime,
    ...adverbsManner,
    ...additionalAdjectives,
  ];

  console.log(`Total vocabulary entries to process: ${allVocab.length}`);

  let added = 0;
  let skipped = 0;
  let missingKanjiCount = 0;

  for (const vocab of allVocab) {
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    // Find kanji in the word
    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    // Check if word uses kanji we don't have
    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));

    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      missingKanjiCount++;
      skipped++;
      continue;
    }

    // Find the max level of kanji used (default to level 1 for words without kanji)
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
        const kanjiId = kanjiIds.get(char);
        if (kanjiId) {
          await prisma.vocabularyKanji.create({
            data: {
              vocabularyId: newVocab.id,
              kanjiId: kanjiId
            }
          }).catch(() => {}); // Ignore if already exists
        }
      }

      added++;
      if (added % 50 === 0) {
        console.log(`Progress: ${added} vocabulary items added...`);
      }
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
  console.log(`Skipped (existing or errors): ${skipped}`);
  console.log(`Skipped (missing kanji): ${missingKanjiCount}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
