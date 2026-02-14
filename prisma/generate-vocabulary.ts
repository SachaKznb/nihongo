import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary patterns - common word formations in Japanese
// Format: [suffix/pattern, French meaning template, reading pattern]
const vocabPatterns: Record<string, Array<{suffix: string, meaning: string, readingSuffix: string}>> = {
  // Single kanji as word (kun'yomi)
  "single": [],

  // Common suffixes
  "的": [{suffix: "的", meaning: " (adjectif)", readingSuffix: "てき"}],
  "化": [{suffix: "化", meaning: "isation", readingSuffix: "か"}],
  "性": [{suffix: "性", meaning: "ité/nature", readingSuffix: "せい"}],
  "者": [{suffix: "者", meaning: "eur/personne qui", readingSuffix: "しゃ"}],
  "物": [{suffix: "物", meaning: "chose/objet", readingSuffix: "もの"}],
  "所": [{suffix: "所", meaning: "lieu/endroit", readingSuffix: "しょ"}],
  "中": [{suffix: "中", meaning: "en cours de", readingSuffix: "ちゅう"}],
  "人": [{suffix: "人", meaning: "personne", readingSuffix: "じん"}],
  "家": [{suffix: "家", meaning: "expert/maison", readingSuffix: "か"}],
  "力": [{suffix: "力", meaning: "force/capacité", readingSuffix: "りょく"}],
};

// Pre-defined high-quality vocabulary to add
const additionalVocabulary = [
  // Numbers and counting
  { word: "千円", meanings: ["Mille yens"], readings: ["せんえん"], mnemonic: "MILLE YENS - un billet commun au Japon.", targetKanji: "千" },
  { word: "一万", meanings: ["Dix mille"], readings: ["いちまん"], mnemonic: "DIX MILLE - un grand nombre.", targetKanji: "万" },
  { word: "万年筆", meanings: ["Stylo-plume"], readings: ["まんねんひつ"], mnemonic: "STYLO-PLUME - littéralement 'stylo de dix mille ans'.", targetKanji: "万" },

  // Family
  { word: "兄弟", meanings: ["Frères", "Frères et sœurs"], readings: ["きょうだい"], mnemonic: "FRÈRES - le lien fraternel.", targetKanji: "兄" },
  { word: "お兄さん", meanings: ["Grand frère (poli)"], readings: ["おにいさん"], mnemonic: "GRAND FRÈRE en langage respectueux.", targetKanji: "兄" },
  { word: "弟子", meanings: ["Disciple", "Élève"], readings: ["でし"], mnemonic: "DISCIPLE - celui qui apprend d'un maître.", targetKanji: "弟" },
  { word: "姉妹", meanings: ["Sœurs"], readings: ["しまい"], mnemonic: "SŒURS - le lien sororal.", targetKanji: "姉" },

  // Seasons
  { word: "冬休み", meanings: ["Vacances d'hiver"], readings: ["ふゆやすみ"], mnemonic: "VACANCES D'HIVER - repos pendant la saison froide.", targetKanji: "冬" },
  { word: "秋分", meanings: ["Équinoxe d'automne"], readings: ["しゅうぶん"], mnemonic: "ÉQUINOXE D'AUTOMNE - jour et nuit égaux.", targetKanji: "秋" },
  { word: "夕方", meanings: ["Soir", "Fin d'après-midi"], readings: ["ゆうがた"], mnemonic: "LE SOIR - quand le soleil se couche.", targetKanji: "夕" },
  { word: "夕食", meanings: ["Dîner"], readings: ["ゆうしょく"], mnemonic: "DÎNER - le repas du soir.", targetKanji: "夕" },

  // Nature
  { word: "森林", meanings: ["Forêt"], readings: ["しんりん"], mnemonic: "FORÊT - arbres nombreux et denses.", targetKanji: "森" },
  { word: "林道", meanings: ["Chemin forestier"], readings: ["りんどう"], mnemonic: "CHEMIN FORESTIER - sentier dans les bois.", targetKanji: "林" },
  { word: "池水", meanings: ["Eau de l'étang"], readings: ["いけみず"], mnemonic: "EAU DE L'ÉTANG - eau calme et paisible.", targetKanji: "池" },
  { word: "竹林", meanings: ["Bambouseraie"], readings: ["ちくりん"], mnemonic: "BAMBOUSERAIE - forêt de bambous.", targetKanji: "竹" },

  // Transportation
  { word: "船旅", meanings: ["Voyage en bateau"], readings: ["ふなたび"], mnemonic: "VOYAGE EN BATEAU - traversée maritime.", targetKanji: "船" },
  { word: "船長", meanings: ["Capitaine"], readings: ["せんちょう"], mnemonic: "CAPITAINE - chef du navire.", targetKanji: "船" },

  // Buildings/Places
  { word: "県立", meanings: ["Préfectoral"], readings: ["けんりつ"], mnemonic: "PRÉFECTORAL - géré par la préfecture.", targetKanji: "県" },
  { word: "県庁", meanings: ["Préfecture (bâtiment)"], readings: ["けんちょう"], mnemonic: "BÂTIMENT DE LA PRÉFECTURE.", targetKanji: "県" },
  { word: "屋上", meanings: ["Toit-terrasse"], readings: ["おくじょう"], mnemonic: "TOIT-TERRASSE - sommet du bâtiment.", targetKanji: "屋" },
  { word: "部屋", meanings: ["Chambre", "Pièce"], readings: ["へや"], mnemonic: "CHAMBRE - espace personnel.", targetKanji: "屋" },
  { word: "食堂", meanings: ["Cafétéria", "Réfectoire"], readings: ["しょくどう"], mnemonic: "CAFÉTÉRIA - lieu pour manger.", targetKanji: "堂" },

  // Animals
  { word: "犬小屋", meanings: ["Niche"], readings: ["いぬごや"], mnemonic: "NICHE - maison pour chien.", targetKanji: "犬" },
  { word: "子犬", meanings: ["Chiot"], readings: ["こいぬ"], mnemonic: "CHIOT - bébé chien.", targetKanji: "犬" },
  { word: "貝殻", meanings: ["Coquille"], readings: ["かいがら"], mnemonic: "COQUILLE - enveloppe du coquillage.", targetKanji: "貝" },

  // Body/Health
  { word: "弱点", meanings: ["Point faible"], readings: ["じゃくてん"], mnemonic: "POINT FAIBLE - vulnérabilité.", targetKanji: "弱" },
  { word: "弱者", meanings: ["Personne faible"], readings: ["じゃくしゃ"], mnemonic: "PERSONNE FAIBLE - les vulnérables.", targetKanji: "弱" },

  // Size/Space
  { word: "広場", meanings: ["Place", "Esplanade"], readings: ["ひろば"], mnemonic: "PLACE - espace ouvert en ville.", targetKanji: "広" },
  { word: "広大", meanings: ["Vaste", "Immense"], readings: ["こうだい"], mnemonic: "VASTE - très grand espace.", targetKanji: "広" },

  // Objects
  { word: "日本刀", meanings: ["Katana", "Sabre japonais"], readings: ["にほんとう"], mnemonic: "KATANA - le sabre traditionnel japonais.", targetKanji: "刀" },
  { word: "木刀", meanings: ["Sabre en bois"], readings: ["ぼくとう"], mnemonic: "SABRE EN BOIS - pour l'entraînement.", targetKanji: "刀" },
  { word: "糸口", meanings: ["Début", "Indice"], readings: ["いとぐち"], mnemonic: "INDICE - le bout du fil à suivre.", targetKanji: "糸" },
  { word: "毛糸", meanings: ["Laine"], readings: ["けいと"], mnemonic: "LAINE - fil de poils.", targetKanji: "糸" },
  { word: "小麦", meanings: ["Blé"], readings: ["こむぎ"], mnemonic: "BLÉ - céréale de base.", targetKanji: "麦" },
  { word: "麦茶", meanings: ["Thé d'orge"], readings: ["むぎちゃ"], mnemonic: "THÉ D'ORGE - boisson rafraîchissante.", targetKanji: "麦" },

  // Academic/Study
  { word: "試合", meanings: ["Match", "Compétition"], readings: ["しあい"], mnemonic: "MATCH - test de compétences.", targetKanji: "試" },
  { word: "試食", meanings: ["Dégustation"], readings: ["ししょく"], mnemonic: "DÉGUSTATION - essayer de la nourriture.", targetKanji: "試" },
  { word: "研究所", meanings: ["Institut de recherche"], readings: ["けんきゅうしょ"], mnemonic: "INSTITUT DE RECHERCHE - lieu d'études.", targetKanji: "究" },
  { word: "探究", meanings: ["Investigation"], readings: ["たんきゅう"], mnemonic: "INVESTIGATION - recherche approfondie.", targetKanji: "究" },

  // People/Relations
  { word: "彼女", meanings: ["Elle", "Petite amie"], readings: ["かのじょ"], mnemonic: "ELLE - cette femme, ou petite amie.", targetKanji: "彼" },
  { word: "彼氏", meanings: ["Petit ami"], readings: ["かれし"], mnemonic: "PETIT AMI - partenaire masculin.", targetKanji: "彼" },
  { word: "妻子", meanings: ["Femme et enfants"], readings: ["さいし"], mnemonic: "FEMME ET ENFANTS - la famille.", targetKanji: "妻" },
  { word: "夫妻", meanings: ["Couple marié"], readings: ["ふさい"], mnemonic: "COUPLE MARIÉ - mari et femme.", targetKanji: "妻" },
  { word: "田舎", meanings: ["Campagne"], readings: ["いなか"], mnemonic: "CAMPAGNE - zone rurale.", targetKanji: "田" },
  { word: "田畑", meanings: ["Champs"], readings: ["たはた"], mnemonic: "CHAMPS - terres agricoles.", targetKanji: "田" },

  // Abstract concepts
  { word: "答案", meanings: ["Copie d'examen"], readings: ["とうあん"], mnemonic: "COPIE D'EXAMEN - feuille de réponses.", targetKanji: "答" },
  { word: "回答", meanings: ["Réponse"], readings: ["かいとう"], mnemonic: "RÉPONSE - donner une réponse.", targetKanji: "答" },

  // More essential vocabulary for levels 1-20
  { word: "入学", meanings: ["Entrée à l'école"], readings: ["にゅうがく"], mnemonic: "ENTRÉE À L'ÉCOLE - début des études.", targetKanji: "入" },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonic: "SORTIE - là où on sort.", targetKanji: "出" },
  { word: "入口", meanings: ["Entrée"], readings: ["いりぐち"], mnemonic: "ENTRÉE - là où on entre.", targetKanji: "入" },
  { word: "出発", meanings: ["Départ"], readings: ["しゅっぱつ"], mnemonic: "DÉPART - partir en voyage.", targetKanji: "出" },
  { word: "休日", meanings: ["Jour de repos"], readings: ["きゅうじつ"], mnemonic: "JOUR DE REPOS - jour férié.", targetKanji: "休" },
  { word: "休憩", meanings: ["Pause"], readings: ["きゅうけい"], mnemonic: "PAUSE - moment de repos.", targetKanji: "休" },
  { word: "立場", meanings: ["Position", "Point de vue"], readings: ["たちば"], mnemonic: "POSITION - où on se tient.", targetKanji: "立" },
  { word: "独立", meanings: ["Indépendance"], readings: ["どくりつ"], mnemonic: "INDÉPENDANCE - se tenir seul.", targetKanji: "立" },
  { word: "見物", meanings: ["Visite touristique"], readings: ["けんぶつ"], mnemonic: "VISITE TOURISTIQUE - voir les choses.", targetKanji: "見" },
  { word: "見学", meanings: ["Visite éducative"], readings: ["けんがく"], mnemonic: "VISITE ÉDUCATIVE - apprendre en voyant.", targetKanji: "見" },
  { word: "花見", meanings: ["Hanami", "Contemplation des cerisiers"], readings: ["はなみ"], mnemonic: "HANAMI - admirer les fleurs de cerisier.", targetKanji: "花" },
  { word: "花火", meanings: ["Feux d'artifice"], readings: ["はなび"], mnemonic: "FEUX D'ARTIFICE - fleurs de feu.", targetKanji: "花" },
  { word: "雨季", meanings: ["Saison des pluies"], readings: ["うき"], mnemonic: "SAISON DES PLUIES - période humide.", targetKanji: "雨" },
  { word: "大雨", meanings: ["Forte pluie"], readings: ["おおあめ"], mnemonic: "FORTE PLUIE - pluie abondante.", targetKanji: "雨" },
  { word: "青空", meanings: ["Ciel bleu"], readings: ["あおぞら"], mnemonic: "CIEL BLEU - ciel clair et beau.", targetKanji: "空" },
  { word: "空気", meanings: ["Air", "Atmosphère"], readings: ["くうき"], mnemonic: "AIR - ce qu'on respire.", targetKanji: "空" },
  { word: "天気予報", meanings: ["Prévisions météo"], readings: ["てんきよほう"], mnemonic: "PRÉVISIONS MÉTÉO - prédire le temps.", targetKanji: "天" },
  { word: "天国", meanings: ["Paradis"], readings: ["てんごく"], mnemonic: "PARADIS - le royaume céleste.", targetKanji: "天" },
  { word: "友情", meanings: ["Amitié"], readings: ["ゆうじょう"], mnemonic: "AMITIÉ - le sentiment entre amis.", targetKanji: "友" },
  { word: "親友", meanings: ["Meilleur ami"], readings: ["しんゆう"], mnemonic: "MEILLEUR AMI - ami proche.", targetKanji: "友" },
  { word: "先日", meanings: ["L'autre jour"], readings: ["せんじつ"], mnemonic: "L'AUTRE JOUR - récemment.", targetKanji: "先" },
  { word: "先月", meanings: ["Le mois dernier"], readings: ["せんげつ"], mnemonic: "LE MOIS DERNIER.", targetKanji: "先" },
  { word: "生活", meanings: ["Vie quotidienne"], readings: ["せいかつ"], mnemonic: "VIE QUOTIDIENNE - la vie de tous les jours.", targetKanji: "生" },
  { word: "生命", meanings: ["Vie"], readings: ["せいめい"], mnemonic: "VIE - l'existence.", targetKanji: "生" },
  { word: "学生", meanings: ["Étudiant"], readings: ["がくせい"], mnemonic: "ÉTUDIANT - celui qui étudie.", targetKanji: "学" },
  { word: "留学", meanings: ["Études à l'étranger"], readings: ["りゅうがく"], mnemonic: "ÉTUDES À L'ÉTRANGER.", targetKanji: "学" },
  { word: "高校", meanings: ["Lycée"], readings: ["こうこう"], mnemonic: "LYCÉE - école secondaire supérieure.", targetKanji: "校" },
  { word: "学校", meanings: ["École"], readings: ["がっこう"], mnemonic: "ÉCOLE - lieu d'apprentissage.", targetKanji: "校" },
  { word: "外国語", meanings: ["Langue étrangère"], readings: ["がいこくご"], mnemonic: "LANGUE ÉTRANGÈRE.", targetKanji: "語" },
  { word: "物語", meanings: ["Histoire", "Conte"], readings: ["ものがたり"], mnemonic: "HISTOIRE - récit narratif.", targetKanji: "語" },
  { word: "名前", meanings: ["Nom"], readings: ["なまえ"], mnemonic: "NOM - comment on s'appelle.", targetKanji: "名" },
  { word: "有名", meanings: ["Célèbre"], readings: ["ゆうめい"], mnemonic: "CÉLÈBRE - nom connu.", targetKanji: "名" },

  // More vocabulary for common kanji
  { word: "文字", meanings: ["Caractère", "Lettre"], readings: ["もじ"], mnemonic: "CARACTÈRE - symbole écrit.", targetKanji: "字" },
  { word: "漢字", meanings: ["Kanji"], readings: ["かんじ"], mnemonic: "KANJI - caractères chinois.", targetKanji: "字" },
  { word: "国語", meanings: ["Langue nationale"], readings: ["こくご"], mnemonic: "LANGUE NATIONALE - le japonais.", targetKanji: "国" },
  { word: "外国", meanings: ["Pays étranger"], readings: ["がいこく"], mnemonic: "PAYS ÉTRANGER.", targetKanji: "国" },
  { word: "電車", meanings: ["Train"], readings: ["でんしゃ"], mnemonic: "TRAIN - véhicule électrique.", targetKanji: "電" },
  { word: "電話", meanings: ["Téléphone"], readings: ["でんわ"], mnemonic: "TÉLÉPHONE - parole électrique.", targetKanji: "電" },
  { word: "駅前", meanings: ["Devant la gare"], readings: ["えきまえ"], mnemonic: "DEVANT LA GARE.", targetKanji: "駅" },
  { word: "駅員", meanings: ["Agent de gare"], readings: ["えきいん"], mnemonic: "AGENT DE GARE.", targetKanji: "駅" },
  { word: "道路", meanings: ["Route"], readings: ["どうろ"], mnemonic: "ROUTE - chemin pour véhicules.", targetKanji: "道" },
  { word: "道具", meanings: ["Outil"], readings: ["どうぐ"], mnemonic: "OUTIL - instrument.", targetKanji: "道" },
  { word: "山道", meanings: ["Chemin de montagne"], readings: ["やまみち"], mnemonic: "CHEMIN DE MONTAGNE.", targetKanji: "山" },
  { word: "登山", meanings: ["Alpinisme"], readings: ["とざん"], mnemonic: "ALPINISME - grimper les montagnes.", targetKanji: "山" },
  { word: "川沿い", meanings: ["Le long de la rivière"], readings: ["かわぞい"], mnemonic: "LE LONG DE LA RIVIÈRE.", targetKanji: "川" },
  { word: "河川", meanings: ["Rivières"], readings: ["かせん"], mnemonic: "RIVIÈRES - cours d'eau.", targetKanji: "川" },

  // Time expressions
  { word: "今日", meanings: ["Aujourd'hui"], readings: ["きょう"], mnemonic: "AUJOURD'HUI - ce jour.", targetKanji: "今" },
  { word: "今週", meanings: ["Cette semaine"], readings: ["こんしゅう"], mnemonic: "CETTE SEMAINE.", targetKanji: "今" },
  { word: "今月", meanings: ["Ce mois"], readings: ["こんげつ"], mnemonic: "CE MOIS-CI.", targetKanji: "今" },
  { word: "年中", meanings: ["Toute l'année"], readings: ["ねんじゅう"], mnemonic: "TOUTE L'ANNÉE.", targetKanji: "年" },
  { word: "来年", meanings: ["L'année prochaine"], readings: ["らいねん"], mnemonic: "L'ANNÉE PROCHAINE.", targetKanji: "来" },
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonic: "CHAQUE JOUR - quotidien.", targetKanji: "毎" },
  { word: "毎月", meanings: ["Chaque mois"], readings: ["まいつき"], mnemonic: "CHAQUE MOIS - mensuel.", targetKanji: "毎" },
  { word: "毎年", meanings: ["Chaque année"], readings: ["まいとし"], mnemonic: "CHAQUE ANNÉE - annuel.", targetKanji: "毎" },
  { word: "週末", meanings: ["Week-end"], readings: ["しゅうまつ"], mnemonic: "WEEK-END - fin de semaine.", targetKanji: "週" },
  { word: "先週", meanings: ["La semaine dernière"], readings: ["せんしゅう"], mnemonic: "LA SEMAINE DERNIÈRE.", targetKanji: "週" },
  { word: "来週", meanings: ["La semaine prochaine"], readings: ["らいしゅう"], mnemonic: "LA SEMAINE PROCHAINE.", targetKanji: "週" },
  { word: "時間", meanings: ["Temps", "Heure"], readings: ["じかん"], mnemonic: "TEMPS - durée.", targetKanji: "時" },
  { word: "時代", meanings: ["Époque", "Ère"], readings: ["じだい"], mnemonic: "ÉPOQUE - période historique.", targetKanji: "時" },
  { word: "午前", meanings: ["Matin", "AM"], readings: ["ごぜん"], mnemonic: "MATIN - avant midi.", targetKanji: "午" },
  { word: "午後", meanings: ["Après-midi", "PM"], readings: ["ごご"], mnemonic: "APRÈS-MIDI - après midi.", targetKanji: "午" },

  // Actions/Verbs
  { word: "食事", meanings: ["Repas"], readings: ["しょくじ"], mnemonic: "REPAS - acte de manger.", targetKanji: "食" },
  { word: "食料", meanings: ["Nourriture", "Provisions"], readings: ["しょくりょう"], mnemonic: "NOURRITURE - provisions.", targetKanji: "食" },
  { word: "飲料", meanings: ["Boisson"], readings: ["いんりょう"], mnemonic: "BOISSON - ce qu'on boit.", targetKanji: "飲" },
  { word: "飲食", meanings: ["Nourriture et boisson"], readings: ["いんしょく"], mnemonic: "MANGER ET BOIRE.", targetKanji: "飲" },
  { word: "行動", meanings: ["Action", "Comportement"], readings: ["こうどう"], mnemonic: "ACTION - ce qu'on fait.", targetKanji: "行" },
  { word: "旅行", meanings: ["Voyage"], readings: ["りょこう"], mnemonic: "VOYAGE - aller quelque part.", targetKanji: "行" },
  { word: "銀行", meanings: ["Banque"], readings: ["ぎんこう"], mnemonic: "BANQUE - institution financière.", targetKanji: "行" },
  { word: "来日", meanings: ["Venir au Japon"], readings: ["らいにち"], mnemonic: "VENIR AU JAPON.", targetKanji: "来" },
  { word: "将来", meanings: ["Avenir"], readings: ["しょうらい"], mnemonic: "AVENIR - le futur.", targetKanji: "来" },
  { word: "読書", meanings: ["Lecture"], readings: ["どくしょ"], mnemonic: "LECTURE - lire des livres.", targetKanji: "読" },
  { word: "読者", meanings: ["Lecteur"], readings: ["どくしゃ"], mnemonic: "LECTEUR - celui qui lit.", targetKanji: "読" },
  { word: "書道", meanings: ["Calligraphie"], readings: ["しょどう"], mnemonic: "CALLIGRAPHIE - art de l'écriture.", targetKanji: "書" },
  { word: "図書", meanings: ["Livre"], readings: ["としょ"], mnemonic: "LIVRE - ouvrage écrit.", targetKanji: "書" },
  { word: "話題", meanings: ["Sujet de conversation"], readings: ["わだい"], mnemonic: "SUJET - de quoi on parle.", targetKanji: "話" },
  { word: "会話", meanings: ["Conversation"], readings: ["かいわ"], mnemonic: "CONVERSATION - échange verbal.", targetKanji: "話" },
  { word: "新聞", meanings: ["Journal"], readings: ["しんぶん"], mnemonic: "JOURNAL - nouvelles écrites.", targetKanji: "聞" },
  { word: "聞こえる", meanings: ["Être audible"], readings: ["きこえる"], mnemonic: "ÊTRE AUDIBLE - pouvoir entendre.", targetKanji: "聞" },
  { word: "言葉", meanings: ["Mot", "Parole"], readings: ["ことば"], mnemonic: "MOT - unité de langage.", targetKanji: "言" },
  { word: "発言", meanings: ["Déclaration"], readings: ["はつげん"], mnemonic: "DÉCLARATION - prendre la parole.", targetKanji: "言" },
  { word: "買い物", meanings: ["Shopping"], readings: ["かいもの"], mnemonic: "SHOPPING - acheter des choses.", targetKanji: "買" },
  { word: "売り場", meanings: ["Rayon", "Comptoir"], readings: ["うりば"], mnemonic: "RAYON - où on vend.", targetKanji: "売" },
  { word: "会社", meanings: ["Entreprise"], readings: ["かいしゃ"], mnemonic: "ENTREPRISE - société commerciale.", targetKanji: "社" },
  { word: "神社", meanings: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonic: "SANCTUAIRE SHINTO.", targetKanji: "社" },
  { word: "会議", meanings: ["Réunion"], readings: ["かいぎ"], mnemonic: "RÉUNION - rassemblement.", targetKanji: "会" },
  { word: "大会", meanings: ["Tournoi", "Compétition"], readings: ["たいかい"], mnemonic: "TOURNOI - grande réunion.", targetKanji: "会" },

  // More practical vocabulary
  { word: "店員", meanings: ["Vendeur"], readings: ["てんいん"], mnemonic: "VENDEUR - employé de magasin.", targetKanji: "店" },
  { word: "本店", meanings: ["Siège social"], readings: ["ほんてん"], mnemonic: "SIÈGE SOCIAL - magasin principal.", targetKanji: "店" },
  { word: "車内", meanings: ["Intérieur du véhicule"], readings: ["しゃない"], mnemonic: "INTÉRIEUR DU VÉHICULE.", targetKanji: "車" },
  { word: "自転車", meanings: ["Vélo"], readings: ["じてんしゃ"], mnemonic: "VÉLO - véhicule à pédales.", targetKanji: "車" },
  { word: "円高", meanings: ["Yen fort"], readings: ["えんだか"], mnemonic: "YEN FORT - devise appréciée.", targetKanji: "円" },
  { word: "円安", meanings: ["Yen faible"], readings: ["えんやす"], mnemonic: "YEN FAIBLE - devise dépréciée.", targetKanji: "円" },
  { word: "本当", meanings: ["Vrai", "Vraiment"], readings: ["ほんとう"], mnemonic: "VRAIMENT - la vérité.", targetKanji: "本" },
  { word: "本人", meanings: ["La personne elle-même"], readings: ["ほんにん"], mnemonic: "LA PERSONNE ELLE-MÊME.", targetKanji: "本" },
  { word: "本日", meanings: ["Aujourd'hui (formel)"], readings: ["ほんじつ"], mnemonic: "AUJOURD'HUI - formel.", targetKanji: "本" },
  { word: "日本語", meanings: ["Japonais (langue)"], readings: ["にほんご"], mnemonic: "JAPONAIS - la langue du Japon.", targetKanji: "本" },

  // Additional vocabulary for other kanji
  { word: "白紙", meanings: ["Feuille blanche"], readings: ["はくし"], mnemonic: "FEUILLE BLANCHE - papier vierge.", targetKanji: "白" },
  { word: "白黒", meanings: ["Noir et blanc"], readings: ["しろくろ"], mnemonic: "NOIR ET BLANC.", targetKanji: "白" },
  { word: "黒板", meanings: ["Tableau noir"], readings: ["こくばん"], mnemonic: "TABLEAU NOIR - pour écrire en classe.", targetKanji: "黒" },
  { word: "真っ黒", meanings: ["Tout noir"], readings: ["まっくろ"], mnemonic: "TOUT NOIR - complètement noir.", targetKanji: "黒" },
  { word: "赤字", meanings: ["Déficit"], readings: ["あかじ"], mnemonic: "DÉFICIT - chiffres rouges.", targetKanji: "赤" },
  { word: "赤ちゃん", meanings: ["Bébé"], readings: ["あかちゃん"], mnemonic: "BÉBÉ - petit rouge (visage).", targetKanji: "赤" },
  { word: "青年", meanings: ["Jeune homme"], readings: ["せいねん"], mnemonic: "JEUNE HOMME - dans la fleur de l'âge.", targetKanji: "青" },
  { word: "青春", meanings: ["Jeunesse"], readings: ["せいしゅん"], mnemonic: "JEUNESSE - printemps de la vie.", targetKanji: "青" },
  { word: "大切", meanings: ["Important", "Précieux"], readings: ["たいせつ"], mnemonic: "IMPORTANT - à chérir.", targetKanji: "大" },
  { word: "大人", meanings: ["Adulte"], readings: ["おとな"], mnemonic: "ADULTE - grande personne.", targetKanji: "大" },
  { word: "大事", meanings: ["Important"], readings: ["だいじ"], mnemonic: "IMPORTANT - de grande importance.", targetKanji: "大" },
  { word: "小説", meanings: ["Roman"], readings: ["しょうせつ"], mnemonic: "ROMAN - histoire fictive.", targetKanji: "小" },
  { word: "小学生", meanings: ["Écolier"], readings: ["しょうがくせい"], mnemonic: "ÉCOLIER - élève de primaire.", targetKanji: "小" },
  { word: "高い", meanings: ["Cher", "Haut"], readings: ["たかい"], mnemonic: "CHER/HAUT - élevé.", targetKanji: "高" },
  { word: "高校生", meanings: ["Lycéen"], readings: ["こうこうせい"], mnemonic: "LYCÉEN - élève de lycée.", targetKanji: "高" },
  { word: "安心", meanings: ["Tranquillité"], readings: ["あんしん"], mnemonic: "TRANQUILLITÉ - esprit en paix.", targetKanji: "安" },
  { word: "安全", meanings: ["Sécurité"], readings: ["あんぜん"], mnemonic: "SÉCURITÉ - sans danger.", targetKanji: "安" },
  { word: "新しい", meanings: ["Nouveau"], readings: ["あたらしい"], mnemonic: "NOUVEAU - récent.", targetKanji: "新" },
  { word: "新年", meanings: ["Nouvel An"], readings: ["しんねん"], mnemonic: "NOUVEL AN - nouvelle année.", targetKanji: "新" },
  { word: "古い", meanings: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonic: "VIEUX - pas récent.", targetKanji: "古" },
  { word: "中古", meanings: ["D'occasion"], readings: ["ちゅうこ"], mnemonic: "D'OCCASION - déjà utilisé.", targetKanji: "古" },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonic: "LONG - de grande longueur.", targetKanji: "長" },
  { word: "社長", meanings: ["PDG"], readings: ["しゃちょう"], mnemonic: "PDG - chef de l'entreprise.", targetKanji: "長" },
  { word: "多い", meanings: ["Nombreux"], readings: ["おおい"], mnemonic: "NOMBREUX - en grande quantité.", targetKanji: "多" },
  { word: "多分", meanings: ["Probablement"], readings: ["たぶん"], mnemonic: "PROBABLEMENT - sans doute.", targetKanji: "多" },
  { word: "少ない", meanings: ["Peu nombreux"], readings: ["すくない"], mnemonic: "PEU NOMBREUX - en petite quantité.", targetKanji: "少" },
  { word: "少年", meanings: ["Garçon"], readings: ["しょうねん"], mnemonic: "GARÇON - jeune homme.", targetKanji: "少" },
  { word: "少女", meanings: ["Fille"], readings: ["しょうじょ"], mnemonic: "FILLE - jeune femme.", targetKanji: "少" },
];

async function main() {
  console.log("=== GENERATING VOCABULARY ===\n");

  // Get all kanji in our system
  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, levelId: true }
  });
  const kanjiMap = new Map(allKanji.map(k => [k.character, k]));
  const kanjiChars = new Set(allKanji.map(k => k.character));

  // Get existing vocabulary
  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  console.log(`Existing vocabulary: ${existingWords.size}`);
  console.log(`Vocabulary to add: ${additionalVocabulary.length}`);

  let added = 0;
  let skipped = 0;

  for (const vocab of additionalVocabulary) {
    // Skip if already exists
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    // Check all kanji in word are in our system
    const kanjiInWord = vocab.word.split("").filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = kanjiInWord.filter(k => !kanjiChars.has(k));

    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skipped++;
      continue;
    }

    // Find the appropriate level (max of component kanji levels)
    let maxLevel = 1;
    for (const char of kanjiInWord) {
      const kanji = kanjiMap.get(char);
      if (kanji && kanji.levelId > maxLevel) {
        maxLevel = kanji.levelId;
      }
    }

    try {
      // Create vocabulary
      const created = await prisma.vocabulary.create({
        data: {
          word: vocab.word,
          meaningsFr: vocab.meanings,
          readings: vocab.readings,
          mnemonicFr: vocab.mnemonic,
          levelId: maxLevel,
        }
      });

      // Create kanji links
      const uniqueKanji = [...new Set(kanjiInWord)];
      for (const char of uniqueKanji) {
        const kanji = kanjiMap.get(char);
        if (kanji) {
          await prisma.vocabularyKanji.create({
            data: { vocabularyId: created.id, kanjiId: kanji.id }
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

  console.log(`\nAdded: ${added}`);
  console.log(`Skipped: ${skipped}`);

  const totalVocab = await prisma.vocabulary.count();
  console.log(`\nTotal vocabulary: ${totalVocab}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
