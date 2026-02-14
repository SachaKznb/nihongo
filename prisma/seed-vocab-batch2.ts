import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary Batch 2 - Everyday vocabulary for French speakers
// Categories: food, shopping, travel, work, emotions, body parts, household items
// Using common JLPT N5-N3 kanji

const vocabBatch2 = [
  // ===== FOOD & DRINKS (食べ物・飲み物) =====
  { word: "朝食", meanings: ["Petit-dejeuner"], readings: ["ちょうしょく"], mnemonicFr: "PETIT-DEJEUNER - le repas du matin.", targetKanji: ["朝", "食"] },
  { word: "昼食", meanings: ["Dejeuner"], readings: ["ちゅうしょく"], mnemonicFr: "DEJEUNER - le repas de midi.", targetKanji: ["昼", "食"] },
  { word: "夕食", meanings: ["Diner"], readings: ["ゆうしょく"], mnemonicFr: "DINER - le repas du soir.", targetKanji: ["夕", "食"] },
  { word: "食物", meanings: ["Nourriture", "Aliment"], readings: ["しょくもつ"], mnemonicFr: "NOURRITURE - ce qu'on mange.", targetKanji: ["食", "物"] },
  { word: "食べ物", meanings: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "NOURRITURE - choses a manger.", targetKanji: ["食", "物"] },
  { word: "飲み物", meanings: ["Boisson"], readings: ["のみもの"], mnemonicFr: "BOISSON - choses a boire.", targetKanji: ["飲", "物"] },
  { word: "水分", meanings: ["Humidite", "Eau"], readings: ["すいぶん"], mnemonicFr: "EAU - composant liquide.", targetKanji: ["水", "分"] },
  { word: "食料", meanings: ["Vivres", "Provisions"], readings: ["しょくりょう"], mnemonicFr: "VIVRES - nourriture stockee.", targetKanji: ["食", "料"] },
  { word: "食品", meanings: ["Produit alimentaire"], readings: ["しょくひん"], mnemonicFr: "PRODUIT ALIMENTAIRE - article de nourriture.", targetKanji: ["食", "品"] },
  { word: "食後", meanings: ["Apres le repas"], readings: ["しょくご"], mnemonicFr: "APRES LE REPAS - le moment suivant le repas.", targetKanji: ["食", "後"] },
  { word: "食前", meanings: ["Avant le repas"], readings: ["しょくぜん"], mnemonicFr: "AVANT LE REPAS - le moment precedant le repas.", targetKanji: ["食", "前"] },
  { word: "飲食", meanings: ["Manger et boire"], readings: ["いんしょく"], mnemonicFr: "MANGER ET BOIRE - se nourrir.", targetKanji: ["飲", "食"] },
  { word: "飲み水", meanings: ["Eau potable"], readings: ["のみみず"], mnemonicFr: "EAU POTABLE - eau qu'on peut boire.", targetKanji: ["飲", "水"] },

  // ===== TIME & DAYS (時間・日) =====
  { word: "日時", meanings: ["Date et heure"], readings: ["にちじ"], mnemonicFr: "DATE ET HEURE - moment precis.", targetKanji: ["日", "時"] },
  { word: "時分", meanings: ["Heures et minutes"], readings: ["じぶん"], mnemonicFr: "HEURES ET MINUTES - indication du temps.", targetKanji: ["時", "分"] },
  { word: "何時", meanings: ["Quelle heure"], readings: ["なんじ"], mnemonicFr: "QUELLE HEURE - demander l'heure.", targetKanji: ["何", "時"] },
  { word: "何分", meanings: ["Combien de minutes"], readings: ["なんぷん"], mnemonicFr: "COMBIEN DE MINUTES - duree en minutes.", targetKanji: ["何", "分"] },
  { word: "今日", meanings: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "AUJOURD'HUI - ce jour.", targetKanji: ["今", "日"] },
  { word: "今月", meanings: ["Ce mois-ci"], readings: ["こんげつ"], mnemonicFr: "CE MOIS-CI - le mois actuel.", targetKanji: ["今", "月"] },
  { word: "今年", meanings: ["Cette annee"], readings: ["ことし"], mnemonicFr: "CETTE ANNEE - l'annee en cours.", targetKanji: ["今", "年"] },
  { word: "来月", meanings: ["Le mois prochain"], readings: ["らいげつ"], mnemonicFr: "LE MOIS PROCHAIN - le mois qui vient.", targetKanji: ["来", "月"] },
  { word: "来年", meanings: ["L'annee prochaine"], readings: ["らいねん"], mnemonicFr: "L'ANNEE PROCHAINE - l'annee qui vient.", targetKanji: ["来", "年"] },
  { word: "来日", meanings: ["Venir au Japon"], readings: ["らいにち"], mnemonicFr: "VENIR AU JAPON - arriver au pays du soleil levant.", targetKanji: ["来", "日"] },
  { word: "先月", meanings: ["Le mois dernier"], readings: ["せんげつ"], mnemonicFr: "LE MOIS DERNIER - le mois passe.", targetKanji: ["先", "月"] },
  { word: "先日", meanings: ["L'autre jour"], readings: ["せんじつ"], mnemonicFr: "L'AUTRE JOUR - il y a quelques jours.", targetKanji: ["先", "日"] },
  { word: "後日", meanings: ["Un autre jour", "Plus tard"], readings: ["ごじつ"], mnemonicFr: "UN AUTRE JOUR - dans le futur.", targetKanji: ["後", "日"] },
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - quotidiennement.", targetKanji: ["毎", "日"] },
  { word: "毎月", meanings: ["Chaque mois"], readings: ["まいつき"], mnemonicFr: "CHAQUE MOIS - mensuellement.", targetKanji: ["毎", "月"] },
  { word: "毎年", meanings: ["Chaque annee"], readings: ["まいとし"], mnemonicFr: "CHAQUE ANNEE - annuellement.", targetKanji: ["毎", "年"] },
  { word: "年中", meanings: ["Toute l'annee"], readings: ["ねんじゅう"], mnemonicFr: "TOUTE L'ANNEE - pendant douze mois.", targetKanji: ["年", "中"] },
  { word: "月日", meanings: ["Le temps", "Les jours"], readings: ["つきひ"], mnemonicFr: "LE TEMPS - les mois et les jours qui passent.", targetKanji: ["月", "日"] },

  // ===== DAYS OF THE WEEK (曜日) =====
  { word: "月曜日", meanings: ["Lundi"], readings: ["げつようび"], mnemonicFr: "LUNDI - jour de la lune.", targetKanji: ["月", "日"] },
  { word: "火曜日", meanings: ["Mardi"], readings: ["かようび"], mnemonicFr: "MARDI - jour du feu.", targetKanji: ["火", "日"] },
  { word: "水曜日", meanings: ["Mercredi"], readings: ["すいようび"], mnemonicFr: "MERCREDI - jour de l'eau.", targetKanji: ["水", "日"] },
  { word: "木曜日", meanings: ["Jeudi"], readings: ["もくようび"], mnemonicFr: "JEUDI - jour de l'arbre.", targetKanji: ["木", "日"] },
  { word: "金曜日", meanings: ["Vendredi"], readings: ["きんようび"], mnemonicFr: "VENDREDI - jour de l'or.", targetKanji: ["金", "日"] },
  { word: "土曜日", meanings: ["Samedi"], readings: ["どようび"], mnemonicFr: "SAMEDI - jour de la terre.", targetKanji: ["土", "日"] },
  { word: "日曜日", meanings: ["Dimanche"], readings: ["にちようび"], mnemonicFr: "DIMANCHE - jour du soleil.", targetKanji: ["日"] },

  // ===== SHOPPING (買い物) =====
  { word: "買い物", meanings: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "COURSES - faire des achats.", targetKanji: ["買", "物"] },
  { word: "買い方", meanings: ["Facon d'acheter"], readings: ["かいかた"], mnemonicFr: "FACON D'ACHETER - methode d'achat.", targetKanji: ["買", "方"] },
  { word: "売り物", meanings: ["Article a vendre"], readings: ["うりもの"], mnemonicFr: "ARTICLE A VENDRE - produit en vente.", targetKanji: ["売", "物"] },
  { word: "売り出し", meanings: ["Mise en vente", "Soldes"], readings: ["うりだし"], mnemonicFr: "MISE EN VENTE - debut de la vente.", targetKanji: ["売", "出"] },
  { word: "品物", meanings: ["Article", "Marchandise"], readings: ["しなもの"], mnemonicFr: "ARTICLE - objet a vendre.", targetKanji: ["品", "物"] },
  { word: "売店", meanings: ["Kiosque", "Stand"], readings: ["ばいてん"], mnemonicFr: "KIOSQUE - petit magasin.", targetKanji: ["売", "店"] },
  { word: "買う", meanings: ["Acheter"], readings: ["かう"], mnemonicFr: "ACHETER - acquerir contre de l'argent.", targetKanji: ["買"] },
  { word: "売る", meanings: ["Vendre"], readings: ["うる"], mnemonicFr: "VENDRE - echanger contre de l'argent.", targetKanji: ["売"] },
  { word: "店員", meanings: ["Vendeur", "Employe de magasin"], readings: ["てんいん"], mnemonicFr: "VENDEUR - personne travaillant en magasin.", targetKanji: ["店"] },
  { word: "本店", meanings: ["Magasin principal", "Siege"], readings: ["ほんてん"], mnemonicFr: "MAGASIN PRINCIPAL - boutique principale.", targetKanji: ["本", "店"] },
  { word: "新品", meanings: ["Article neuf"], readings: ["しんぴん"], mnemonicFr: "ARTICLE NEUF - produit jamais utilise.", targetKanji: ["新", "品"] },
  { word: "中古品", meanings: ["Article d'occasion"], readings: ["ちゅうこひん"], mnemonicFr: "ARTICLE D'OCCASION - produit deja utilise.", targetKanji: ["中", "古", "品"] },
  { word: "高い", meanings: ["Cher", "Haut"], readings: ["たかい"], mnemonicFr: "CHER/HAUT - prix eleve ou grande hauteur.", targetKanji: ["高"] },
  { word: "安い", meanings: ["Bon marche", "Pas cher"], readings: ["やすい"], mnemonicFr: "PAS CHER - prix bas.", targetKanji: ["安"] },

  // ===== TRAVEL & TRANSPORTATION (旅行・交通) =====
  { word: "電車", meanings: ["Train electrique"], readings: ["でんしゃ"], mnemonicFr: "TRAIN - transport ferroviaire electrique.", targetKanji: ["電", "車"] },
  { word: "車内", meanings: ["Interieur du train/voiture"], readings: ["しゃない"], mnemonicFr: "INTERIEUR DU VEHICULE - dedans du train.", targetKanji: ["車", "内"] },
  { word: "駅前", meanings: ["Devant la gare"], readings: ["えきまえ"], mnemonicFr: "DEVANT LA GARE - zone face a la gare.", targetKanji: ["駅", "前"] },
  { word: "駅員", meanings: ["Employe de gare"], readings: ["えきいん"], mnemonicFr: "EMPLOYE DE GARE - personnel de la gare.", targetKanji: ["駅"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - endroit pour sortir.", targetKanji: ["出", "口"] },
  { word: "入口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - endroit pour entrer.", targetKanji: ["入", "口"] },
  { word: "入国", meanings: ["Entree dans le pays"], readings: ["にゅうこく"], mnemonicFr: "ENTREE DANS LE PAYS - arriver dans un pays.", targetKanji: ["入", "国"] },
  { word: "出国", meanings: ["Sortie du pays"], readings: ["しゅっこく"], mnemonicFr: "SORTIE DU PAYS - quitter un pays.", targetKanji: ["出", "国"] },
  { word: "行き先", meanings: ["Destination"], readings: ["いきさき"], mnemonicFr: "DESTINATION - ou l'on va.", targetKanji: ["行", "先"] },
  { word: "行き方", meanings: ["Facon d'aller", "Itineraire"], readings: ["いきかた"], mnemonicFr: "FACON D'ALLER - comment y aller.", targetKanji: ["行", "方"] },
  { word: "道中", meanings: ["En route", "Pendant le voyage"], readings: ["どうちゅう"], mnemonicFr: "EN ROUTE - durant le trajet.", targetKanji: ["道", "中"] },
  { word: "近道", meanings: ["Raccourci"], readings: ["ちかみち"], mnemonicFr: "RACCOURCI - chemin plus court.", targetKanji: ["近", "道"] },
  { word: "遠道", meanings: ["Detour", "Long chemin"], readings: ["とおみち"], mnemonicFr: "LONG CHEMIN - route plus longue.", targetKanji: ["遠", "道"] },
  { word: "外国", meanings: ["Pays etranger"], readings: ["がいこく"], mnemonicFr: "PAYS ETRANGER - autre nation.", targetKanji: ["外", "国"] },
  { word: "外国人", meanings: ["Etranger"], readings: ["がいこくじん"], mnemonicFr: "ETRANGER - personne d'un autre pays.", targetKanji: ["外", "国", "人"] },

  // ===== WORK & OFFICE (仕事・会社) =====
  { word: "仕事", meanings: ["Travail", "Emploi"], readings: ["しごと"], mnemonicFr: "TRAVAIL - activite professionnelle.", targetKanji: ["仕", "事"] },
  { word: "仕方", meanings: ["Facon de faire", "Methode"], readings: ["しかた"], mnemonicFr: "FACON DE FAIRE - methode.", targetKanji: ["仕", "方"] },
  { word: "仕上げ", meanings: ["Finition"], readings: ["しあげ"], mnemonicFr: "FINITION - achever un travail.", targetKanji: ["仕", "上"] },
  { word: "会社", meanings: ["Entreprise", "Societe"], readings: ["かいしゃ"], mnemonicFr: "ENTREPRISE - organisation commerciale.", targetKanji: ["会", "社"] },
  { word: "会社員", meanings: ["Employe de bureau"], readings: ["かいしゃいん"], mnemonicFr: "EMPLOYE DE BUREAU - salarie d'entreprise.", targetKanji: ["会", "社"] },
  { word: "会議", meanings: ["Reunion", "Conference"], readings: ["かいぎ"], mnemonicFr: "REUNION - rencontre professionnelle.", targetKanji: ["会"] },
  { word: "会話", meanings: ["Conversation"], readings: ["かいわ"], mnemonicFr: "CONVERSATION - echange verbal.", targetKanji: ["会", "話"] },
  { word: "休み", meanings: ["Repos", "Vacances", "Conge"], readings: ["やすみ"], mnemonicFr: "REPOS - temps de pause.", targetKanji: ["休"] },
  { word: "休日", meanings: ["Jour de repos"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS - jour ferie.", targetKanji: ["休", "日"] },
  { word: "休止", meanings: ["Suspension", "Arret"], readings: ["きゅうし"], mnemonicFr: "SUSPENSION - interruption temporaire.", targetKanji: ["休", "止"] },
  { word: "作業", meanings: ["Travail", "Operation"], readings: ["さぎょう"], mnemonicFr: "TRAVAIL - tache a accomplir.", targetKanji: ["作", "業"] },
  { word: "作文", meanings: ["Redaction", "Composition"], readings: ["さくぶん"], mnemonicFr: "REDACTION - ecriture de texte.", targetKanji: ["作", "文"] },
  { word: "工作", meanings: ["Bricolage", "Travaux manuels"], readings: ["こうさく"], mnemonicFr: "BRICOLAGE - travail manuel.", targetKanji: ["工", "作"] },
  { word: "工事", meanings: ["Travaux", "Construction"], readings: ["こうじ"], mnemonicFr: "TRAVAUX - chantier de construction.", targetKanji: ["工", "事"] },

  // ===== EMOTIONS & FEELINGS (感情) =====
  { word: "心", meanings: ["Coeur", "Esprit"], readings: ["こころ"], mnemonicFr: "COEUR - siege des emotions.", targetKanji: ["心"] },
  { word: "気分", meanings: ["Humeur"], readings: ["きぶん"], mnemonicFr: "HUMEUR - etat d'esprit.", targetKanji: ["気", "分"] },
  { word: "気持ち", meanings: ["Sentiment"], readings: ["きもち"], mnemonicFr: "SENTIMENT - ce qu'on ressent.", targetKanji: ["気", "持"] },
  { word: "気力", meanings: ["Energie", "Volonte"], readings: ["きりょく"], mnemonicFr: "ENERGIE - force de volonte.", targetKanji: ["気", "力"] },
  { word: "天気", meanings: ["Temps", "Meteo"], readings: ["てんき"], mnemonicFr: "TEMPS - conditions meteorologiques.", targetKanji: ["天", "気"] },
  { word: "人気", meanings: ["Popularite"], readings: ["にんき"], mnemonicFr: "POPULARITE - etre aime du public.", targetKanji: ["人", "気"] },
  { word: "力強い", meanings: ["Puissant", "Fort"], readings: ["ちからづよい"], mnemonicFr: "PUISSANT - plein de force.", targetKanji: ["力", "強"] },
  { word: "思い", meanings: ["Pensee", "Sentiment"], readings: ["おもい"], mnemonicFr: "PENSEE - ce qu'on pense/ressent.", targetKanji: ["思"] },
  { word: "思い出", meanings: ["Souvenir"], readings: ["おもいで"], mnemonicFr: "SOUVENIR - memoire du passe.", targetKanji: ["思", "出"] },
  { word: "思い出す", meanings: ["Se souvenir"], readings: ["おもいだす"], mnemonicFr: "SE SOUVENIR - rappeler un souvenir.", targetKanji: ["思", "出"] },
  { word: "考え", meanings: ["Pensee", "Idee"], readings: ["かんがえ"], mnemonicFr: "PENSEE - idee reflechie.", targetKanji: ["考"] },
  { word: "考え方", meanings: ["Facon de penser"], readings: ["かんがえかた"], mnemonicFr: "FACON DE PENSER - maniere de reflechir.", targetKanji: ["考", "方"] },
  { word: "安心", meanings: ["Tranquillite d'esprit"], readings: ["あんしん"], mnemonicFr: "TRANQUILLITE D'ESPRIT - etre rassure.", targetKanji: ["安", "心"] },
  { word: "心強い", meanings: ["Rassurant", "Encourageant"], readings: ["こころづよい"], mnemonicFr: "RASSURANT - qui donne du courage.", targetKanji: ["心", "強"] },

  // ===== BODY PARTS (体の部分) =====
  { word: "体力", meanings: ["Force physique"], readings: ["たいりょく"], mnemonicFr: "FORCE PHYSIQUE - energie du corps.", targetKanji: ["体", "力"] },
  { word: "体中", meanings: ["Tout le corps"], readings: ["からだじゅう"], mnemonicFr: "TOUT LE CORPS - le corps entier.", targetKanji: ["体", "中"] },
  { word: "全身", meanings: ["Corps entier"], readings: ["ぜんしん"], mnemonicFr: "CORPS ENTIER - de la tete aux pieds.", targetKanji: ["全", "身"] },
  { word: "手足", meanings: ["Mains et pieds", "Membres"], readings: ["てあし"], mnemonicFr: "MEMBRES - les mains et les pieds.", targetKanji: ["手", "足"] },
  { word: "右手", meanings: ["Main droite"], readings: ["みぎて"], mnemonicFr: "MAIN DROITE - la main du cote droit.", targetKanji: ["右", "手"] },
  { word: "左手", meanings: ["Main gauche"], readings: ["ひだりて"], mnemonicFr: "MAIN GAUCHE - la main du cote gauche.", targetKanji: ["左", "手"] },
  { word: "両手", meanings: ["Les deux mains"], readings: ["りょうて"], mnemonicFr: "LES DEUX MAINS - main droite et gauche.", targetKanji: ["両", "手"] },
  { word: "目上", meanings: ["Superieur"], readings: ["めうえ"], mnemonicFr: "SUPERIEUR - personne de rang plus eleve.", targetKanji: ["目", "上"] },
  { word: "目下", meanings: ["Inferieur"], readings: ["めした"], mnemonicFr: "INFERIEUR - personne de rang plus bas.", targetKanji: ["目", "下"] },
  { word: "耳", meanings: ["Oreille"], readings: ["みみ"], mnemonicFr: "OREILLE - organe de l'ouie.", targetKanji: ["耳"] },
  { word: "足元", meanings: ["A ses pieds"], readings: ["あしもと"], mnemonicFr: "A SES PIEDS - pres des pieds.", targetKanji: ["足", "元"] },
  { word: "口元", meanings: ["Autour de la bouche"], readings: ["くちもと"], mnemonicFr: "AUTOUR DE LA BOUCHE - region de la bouche.", targetKanji: ["口", "元"] },
  { word: "力", meanings: ["Force"], readings: ["ちから"], mnemonicFr: "FORCE - puissance physique.", targetKanji: ["力"] },

  // ===== HOME & HOUSEHOLD (家・家庭) =====
  { word: "家", meanings: ["Maison", "Famille"], readings: ["いえ"], mnemonicFr: "MAISON - lieu d'habitation.", targetKanji: ["家"] },
  { word: "家族", meanings: ["Famille"], readings: ["かぞく"], mnemonicFr: "FAMILLE - les membres du foyer.", targetKanji: ["家", "族"] },
  { word: "家内", meanings: ["Epouse", "Interieur de la maison"], readings: ["かない"], mnemonicFr: "EPOUSE - femme au foyer.", targetKanji: ["家", "内"] },
  { word: "家事", meanings: ["Taches menageres"], readings: ["かじ"], mnemonicFr: "TACHES MENAGERES - travaux domestiques.", targetKanji: ["家", "事"] },
  { word: "部屋", meanings: ["Chambre", "Piece"], readings: ["へや"], mnemonicFr: "PIECE - salle dans une maison.", targetKanji: ["部", "屋"] },
  { word: "和室", meanings: ["Piece japonaise"], readings: ["わしつ"], mnemonicFr: "PIECE JAPONAISE - salle style japonais.", targetKanji: ["和", "室"] },
  { word: "室内", meanings: ["Interieur"], readings: ["しつない"], mnemonicFr: "INTERIEUR - dedans d'une piece.", targetKanji: ["室", "内"] },
  { word: "入室", meanings: ["Entrer dans une piece"], readings: ["にゅうしつ"], mnemonicFr: "ENTRER DANS UNE PIECE - penetrer dans une salle.", targetKanji: ["入", "室"] },
  { word: "開ける", meanings: ["Ouvrir"], readings: ["あける"], mnemonicFr: "OUVRIR - debloquer une ouverture.", targetKanji: ["開"] },
  { word: "閉める", meanings: ["Fermer"], readings: ["しめる"], mnemonicFr: "FERMER - bloquer une ouverture.", targetKanji: ["閉"] },
  { word: "開店", meanings: ["Ouverture du magasin"], readings: ["かいてん"], mnemonicFr: "OUVERTURE DU MAGASIN - debut des heures d'ouverture.", targetKanji: ["開", "店"] },
  { word: "閉店", meanings: ["Fermeture du magasin"], readings: ["へいてん"], mnemonicFr: "FERMETURE DU MAGASIN - fin des heures d'ouverture.", targetKanji: ["閉", "店"] },

  // ===== PEOPLE & RELATIONSHIPS (人間関係) =====
  { word: "人", meanings: ["Personne"], readings: ["ひと"], mnemonicFr: "PERSONNE - etre humain.", targetKanji: ["人"] },
  { word: "大人", meanings: ["Adulte"], readings: ["おとな"], mnemonicFr: "ADULTE - personne majeure.", targetKanji: ["大", "人"] },
  { word: "子供", meanings: ["Enfant"], readings: ["こども"], mnemonicFr: "ENFANT - jeune personne.", targetKanji: ["子", "供"] },
  { word: "男子", meanings: ["Garcon"], readings: ["だんし"], mnemonicFr: "GARCON - jeune de sexe masculin.", targetKanji: ["男", "子"] },
  { word: "女子", meanings: ["Fille"], readings: ["じょし"], mnemonicFr: "FILLE - jeune de sexe feminin.", targetKanji: ["女", "子"] },
  { word: "男女", meanings: ["Hommes et femmes"], readings: ["だんじょ"], mnemonicFr: "HOMMES ET FEMMES - les deux sexes.", targetKanji: ["男", "女"] },
  { word: "友人", meanings: ["Ami"], readings: ["ゆうじん"], mnemonicFr: "AMI - personne proche.", targetKanji: ["友", "人"] },
  { word: "友", meanings: ["Ami", "Camarade"], readings: ["とも"], mnemonicFr: "AMI - compagnon.", targetKanji: ["友"] },
  { word: "親子", meanings: ["Parent et enfant"], readings: ["おやこ"], mnemonicFr: "PARENT ET ENFANT - lien familial.", targetKanji: ["親", "子"] },
  { word: "父親", meanings: ["Pere"], readings: ["ちちおや"], mnemonicFr: "PERE - parent masculin.", targetKanji: ["父", "親"] },
  { word: "母親", meanings: ["Mere"], readings: ["ははおや"], mnemonicFr: "MERE - parent feminin.", targetKanji: ["母", "親"] },
  { word: "先生", meanings: ["Professeur"], readings: ["せんせい"], mnemonicFr: "PROFESSEUR - celui qui enseigne.", targetKanji: ["先", "生"] },
  { word: "学生", meanings: ["Etudiant"], readings: ["がくせい"], mnemonicFr: "ETUDIANT - celui qui apprend.", targetKanji: ["学", "生"] },
  { word: "同人", meanings: ["Membre", "La meme personne"], readings: ["どうじん"], mnemonicFr: "MEMBRE - personne du meme groupe.", targetKanji: ["同", "人"] },

  // ===== EDUCATION & LEARNING (教育・学習) =====
  { word: "学校", meanings: ["Ecole"], readings: ["がっこう"], mnemonicFr: "ECOLE - etablissement d'enseignement.", targetKanji: ["学", "校"] },
  { word: "学ぶ", meanings: ["Apprendre", "Etudier"], readings: ["まなぶ"], mnemonicFr: "APPRENDRE - acquerir des connaissances.", targetKanji: ["学"] },
  { word: "学力", meanings: ["Niveau scolaire"], readings: ["がくりょく"], mnemonicFr: "NIVEAU SCOLAIRE - capacite academique.", targetKanji: ["学", "力"] },
  { word: "教える", meanings: ["Enseigner"], readings: ["おしえる"], mnemonicFr: "ENSEIGNER - transmettre un savoir.", targetKanji: ["教"] },
  { word: "教室", meanings: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "SALLE DE CLASSE - lieu d'enseignement.", targetKanji: ["教", "室"] },
  { word: "教科書", meanings: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "MANUEL SCOLAIRE - livre de cours.", targetKanji: ["教", "科", "書"] },
  { word: "読む", meanings: ["Lire"], readings: ["よむ"], mnemonicFr: "LIRE - dechiffrer un texte.", targetKanji: ["読"] },
  { word: "読書", meanings: ["Lecture"], readings: ["どくしょ"], mnemonicFr: "LECTURE - lire des livres.", targetKanji: ["読", "書"] },
  { word: "読み方", meanings: ["Facon de lire"], readings: ["よみかた"], mnemonicFr: "FACON DE LIRE - maniere de prononcer.", targetKanji: ["読", "方"] },
  { word: "書く", meanings: ["Ecrire"], readings: ["かく"], mnemonicFr: "ECRIRE - tracer des caracteres.", targetKanji: ["書"] },
  { word: "書き方", meanings: ["Facon d'ecrire"], readings: ["かきかた"], mnemonicFr: "FACON D'ECRIRE - maniere d'ecrire.", targetKanji: ["書", "方"] },
  { word: "文字", meanings: ["Caractere", "Lettre"], readings: ["もじ"], mnemonicFr: "CARACTERE - signe d'ecriture.", targetKanji: ["文", "字"] },
  { word: "文", meanings: ["Phrase", "Texte"], readings: ["ぶん"], mnemonicFr: "PHRASE - suite de mots.", targetKanji: ["文"] },
  { word: "言葉", meanings: ["Mot", "Parole"], readings: ["ことば"], mnemonicFr: "MOT - unite de langage.", targetKanji: ["言", "葉"] },
  { word: "言う", meanings: ["Dire"], readings: ["いう"], mnemonicFr: "DIRE - exprimer par la parole.", targetKanji: ["言"] },
  { word: "話す", meanings: ["Parler"], readings: ["はなす"], mnemonicFr: "PARLER - communiquer oralement.", targetKanji: ["話"] },
  { word: "聞く", meanings: ["Ecouter", "Entendre"], readings: ["きく"], mnemonicFr: "ECOUTER - percevoir par l'oreille.", targetKanji: ["聞"] },
  { word: "聞こえる", meanings: ["Etre audible"], readings: ["きこえる"], mnemonicFr: "ETRE AUDIBLE - pouvoir etre entendu.", targetKanji: ["聞"] },

  // ===== NATURE & WEATHER (自然・天気) =====
  { word: "山", meanings: ["Montagne"], readings: ["やま"], mnemonicFr: "MONTAGNE - relief eleve.", targetKanji: ["山"] },
  { word: "山中", meanings: ["Dans la montagne"], readings: ["さんちゅう"], mnemonicFr: "DANS LA MONTAGNE - a l'interieur des monts.", targetKanji: ["山", "中"] },
  { word: "山道", meanings: ["Chemin de montagne"], readings: ["やまみち"], mnemonicFr: "CHEMIN DE MONTAGNE - sentier en montagne.", targetKanji: ["山", "道"] },
  { word: "川", meanings: ["Riviere"], readings: ["かわ"], mnemonicFr: "RIVIERE - cours d'eau.", targetKanji: ["川"] },
  { word: "川上", meanings: ["Amont"], readings: ["かわかみ"], mnemonicFr: "AMONT - partie haute de la riviere.", targetKanji: ["川", "上"] },
  { word: "川下", meanings: ["Aval"], readings: ["かわしも"], mnemonicFr: "AVAL - partie basse de la riviere.", targetKanji: ["川", "下"] },
  { word: "雨", meanings: ["Pluie"], readings: ["あめ"], mnemonicFr: "PLUIE - eau qui tombe du ciel.", targetKanji: ["雨"] },
  { word: "大雨", meanings: ["Forte pluie"], readings: ["おおあめ"], mnemonicFr: "FORTE PLUIE - pluie abondante.", targetKanji: ["大", "雨"] },
  { word: "雨天", meanings: ["Temps pluvieux"], readings: ["うてん"], mnemonicFr: "TEMPS PLUVIEUX - journee de pluie.", targetKanji: ["雨", "天"] },
  { word: "風", meanings: ["Vent"], readings: ["かぜ"], mnemonicFr: "VENT - air en mouvement.", targetKanji: ["風"] },
  { word: "風力", meanings: ["Force du vent"], readings: ["ふうりょく"], mnemonicFr: "FORCE DU VENT - puissance eolienne.", targetKanji: ["風", "力"] },
  { word: "天", meanings: ["Ciel"], readings: ["てん"], mnemonicFr: "CIEL - la voute celeste.", targetKanji: ["天"] },
  { word: "空", meanings: ["Ciel", "Vide"], readings: ["そら"], mnemonicFr: "CIEL - l'espace au-dessus de nous.", targetKanji: ["空"] },

  // ===== COLORS (色) =====
  { word: "色", meanings: ["Couleur"], readings: ["いろ"], mnemonicFr: "COULEUR - teinte visuelle.", targetKanji: ["色"] },
  { word: "白色", meanings: ["Couleur blanche"], readings: ["はくしょく"], mnemonicFr: "COULEUR BLANCHE - la teinte du blanc.", targetKanji: ["白", "色"] },
  { word: "白い", meanings: ["Blanc"], readings: ["しろい"], mnemonicFr: "BLANC - couleur de la neige.", targetKanji: ["白"] },
  { word: "黒色", meanings: ["Couleur noire"], readings: ["こくしょく"], mnemonicFr: "COULEUR NOIRE - la teinte du noir.", targetKanji: ["黒", "色"] },
  { word: "黒い", meanings: ["Noir"], readings: ["くろい"], mnemonicFr: "NOIR - couleur de la nuit.", targetKanji: ["黒"] },
  { word: "赤色", meanings: ["Couleur rouge"], readings: ["せきしょく"], mnemonicFr: "COULEUR ROUGE - la teinte du rouge.", targetKanji: ["赤", "色"] },
  { word: "赤い", meanings: ["Rouge"], readings: ["あかい"], mnemonicFr: "ROUGE - couleur du feu.", targetKanji: ["赤"] },
  { word: "青色", meanings: ["Couleur bleue"], readings: ["あおいろ"], mnemonicFr: "COULEUR BLEUE - la teinte du bleu.", targetKanji: ["青", "色"] },
  { word: "青い", meanings: ["Bleu", "Vert"], readings: ["あおい"], mnemonicFr: "BLEU - couleur du ciel.", targetKanji: ["青"] },

  // ===== NUMBERS & QUANTITIES (数・量) =====
  { word: "数", meanings: ["Nombre"], readings: ["かず"], mnemonicFr: "NOMBRE - quantite.", targetKanji: ["数"] },
  { word: "数字", meanings: ["Chiffre"], readings: ["すうじ"], mnemonicFr: "CHIFFRE - symbole numerique.", targetKanji: ["数", "字"] },
  { word: "多い", meanings: ["Nombreux", "Beaucoup"], readings: ["おおい"], mnemonicFr: "NOMBREUX - en grande quantite.", targetKanji: ["多"] },
  { word: "少ない", meanings: ["Peu nombreux"], readings: ["すくない"], mnemonicFr: "PEU NOMBREUX - en petite quantite.", targetKanji: ["少"] },
  { word: "少し", meanings: ["Un peu"], readings: ["すこし"], mnemonicFr: "UN PEU - petite quantite.", targetKanji: ["少"] },
  { word: "多少", meanings: ["Plus ou moins"], readings: ["たしょう"], mnemonicFr: "PLUS OU MOINS - une certaine quantite.", targetKanji: ["多", "少"] },
  { word: "半分", meanings: ["Moitie"], readings: ["はんぶん"], mnemonicFr: "MOITIE - la partie d'un tout.", targetKanji: ["半", "分"] },
  { word: "全部", meanings: ["Tout", "Totalite"], readings: ["ぜんぶ"], mnemonicFr: "TOUT - l'ensemble complet.", targetKanji: ["全", "部"] },
  { word: "全て", meanings: ["Tout"], readings: ["すべて"], mnemonicFr: "TOUT - la totalite.", targetKanji: ["全"] },

  // ===== SIZE & COMPARISON (大きさ・比較) =====
  { word: "大きい", meanings: ["Grand"], readings: ["おおきい"], mnemonicFr: "GRAND - de grande taille.", targetKanji: ["大"] },
  { word: "小さい", meanings: ["Petit"], readings: ["ちいさい"], mnemonicFr: "PETIT - de petite taille.", targetKanji: ["小"] },
  { word: "中くらい", meanings: ["Moyen"], readings: ["ちゅうくらい"], mnemonicFr: "MOYEN - de taille moyenne.", targetKanji: ["中"] },
  { word: "大小", meanings: ["Grand et petit", "Taille"], readings: ["だいしょう"], mnemonicFr: "GRAND ET PETIT - les tailles.", targetKanji: ["大", "小"] },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - de grande longueur.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - de petite longueur.", targetKanji: ["短"] },
  { word: "長短", meanings: ["Long et court", "Avantages et inconvenients"], readings: ["ちょうたん"], mnemonicFr: "LONG ET COURT - les longueurs.", targetKanji: ["長", "短"] },
  { word: "早い", meanings: ["Tot", "Rapide"], readings: ["はやい"], mnemonicFr: "TOT/RAPIDE - en avance ou rapide.", targetKanji: ["早"] },
  { word: "遅い", meanings: ["Tard", "Lent"], readings: ["おそい"], mnemonicFr: "TARD/LENT - en retard ou lent.", targetKanji: ["遅"] },
  { word: "近い", meanings: ["Proche"], readings: ["ちかい"], mnemonicFr: "PROCHE - pas loin.", targetKanji: ["近"] },
  { word: "遠い", meanings: ["Loin"], readings: ["とおい"], mnemonicFr: "LOIN - a grande distance.", targetKanji: ["遠"] },
  { word: "新しい", meanings: ["Nouveau", "Neuf"], readings: ["あたらしい"], mnemonicFr: "NOUVEAU - recent.", targetKanji: ["新"] },
  { word: "古い", meanings: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonicFr: "VIEUX - qui existe depuis longtemps.", targetKanji: ["古"] },
  { word: "新古", meanings: ["Neuf et ancien"], readings: ["しんこ"], mnemonicFr: "NEUF ET ANCIEN - nouveau et vieux.", targetKanji: ["新", "古"] },

  // ===== POSITION & DIRECTION (位置・方向) =====
  { word: "上", meanings: ["Haut", "Dessus"], readings: ["うえ"], mnemonicFr: "HAUT - partie superieure.", targetKanji: ["上"] },
  { word: "下", meanings: ["Bas", "Dessous"], readings: ["した"], mnemonicFr: "BAS - partie inferieure.", targetKanji: ["下"] },
  { word: "上下", meanings: ["Haut et bas"], readings: ["じょうげ"], mnemonicFr: "HAUT ET BAS - vertical.", targetKanji: ["上", "下"] },
  { word: "中", meanings: ["Milieu", "Interieur"], readings: ["なか"], mnemonicFr: "MILIEU - au centre.", targetKanji: ["中"] },
  { word: "前", meanings: ["Devant", "Avant"], readings: ["まえ"], mnemonicFr: "DEVANT - partie anterieure.", targetKanji: ["前"] },
  { word: "後ろ", meanings: ["Derriere"], readings: ["うしろ"], mnemonicFr: "DERRIERE - partie posterieure.", targetKanji: ["後"] },
  { word: "前後", meanings: ["Avant et apres"], readings: ["ぜんご"], mnemonicFr: "AVANT ET APRES - les deux cotes.", targetKanji: ["前", "後"] },
  { word: "先", meanings: ["Devant", "Futur", "D'abord"], readings: ["さき"], mnemonicFr: "DEVANT/FUTUR - ce qui est en avant.", targetKanji: ["先"] },
  { word: "方", meanings: ["Direction", "Cote"], readings: ["ほう"], mnemonicFr: "DIRECTION - vers ou.", targetKanji: ["方"] },
  { word: "方向", meanings: ["Direction"], readings: ["ほうこう"], mnemonicFr: "DIRECTION - sens du mouvement.", targetKanji: ["方", "向"] },
  { word: "向き", meanings: ["Direction", "Orientation"], readings: ["むき"], mnemonicFr: "ORIENTATION - sens tourne.", targetKanji: ["向"] },
  { word: "向こう", meanings: ["La-bas", "L'autre cote"], readings: ["むこう"], mnemonicFr: "LA-BAS - de l'autre cote.", targetKanji: ["向"] },

  // ===== ACTIONS & MOVEMENTS (動作) =====
  { word: "立つ", meanings: ["Se lever", "Etre debout"], readings: ["たつ"], mnemonicFr: "SE LEVER - position verticale.", targetKanji: ["立"] },
  { word: "立ち上がる", meanings: ["Se lever"], readings: ["たちあがる"], mnemonicFr: "SE LEVER - se mettre debout.", targetKanji: ["立", "上"] },
  { word: "座る", meanings: ["S'asseoir"], readings: ["すわる"], mnemonicFr: "S'ASSEOIR - position assise.", targetKanji: ["座"] },
  { word: "歩く", meanings: ["Marcher"], readings: ["あるく"], mnemonicFr: "MARCHER - se deplacer a pied.", targetKanji: ["歩"] },
  { word: "歩道", meanings: ["Trottoir"], readings: ["ほどう"], mnemonicFr: "TROTTOIR - chemin pour pietons.", targetKanji: ["歩", "道"] },
  { word: "走る", meanings: ["Courir"], readings: ["はしる"], mnemonicFr: "COURIR - se deplacer rapidement.", targetKanji: ["走"] },
  { word: "止まる", meanings: ["S'arreter"], readings: ["とまる"], mnemonicFr: "S'ARRETER - cesser de bouger.", targetKanji: ["止"] },
  { word: "止める", meanings: ["Arreter"], readings: ["とめる"], mnemonicFr: "ARRETER - faire cesser.", targetKanji: ["止"] },
  { word: "動く", meanings: ["Bouger"], readings: ["うごく"], mnemonicFr: "BOUGER - faire un mouvement.", targetKanji: ["動"] },
  { word: "動かす", meanings: ["Deplacer", "Faire bouger"], readings: ["うごかす"], mnemonicFr: "DEPLACER - faire changer de place.", targetKanji: ["動"] },
  { word: "動物", meanings: ["Animal"], readings: ["どうぶつ"], mnemonicFr: "ANIMAL - etre vivant qui bouge.", targetKanji: ["動", "物"] },
  { word: "行く", meanings: ["Aller"], readings: ["いく"], mnemonicFr: "ALLER - se deplacer vers.", targetKanji: ["行"] },
  { word: "来る", meanings: ["Venir"], readings: ["くる"], mnemonicFr: "VENIR - se deplacer vers ici.", targetKanji: ["来"] },
  { word: "出る", meanings: ["Sortir"], readings: ["でる"], mnemonicFr: "SORTIR - aller a l'exterieur.", targetKanji: ["出"] },
  { word: "入る", meanings: ["Entrer"], readings: ["はいる"], mnemonicFr: "ENTRER - aller a l'interieur.", targetKanji: ["入"] },
  { word: "出入り", meanings: ["Entrees et sorties"], readings: ["でいり"], mnemonicFr: "ENTREES ET SORTIES - va-et-vient.", targetKanji: ["出", "入"] },

  // ===== TIME EXPRESSIONS (時間表現) =====
  { word: "始まる", meanings: ["Commencer"], readings: ["はじまる"], mnemonicFr: "COMMENCER - debut d'une action.", targetKanji: ["始"] },
  { word: "始める", meanings: ["Commencer", "Demarrer"], readings: ["はじめる"], mnemonicFr: "COMMENCER - initier une action.", targetKanji: ["始"] },
  { word: "終わる", meanings: ["Finir", "Se terminer"], readings: ["おわる"], mnemonicFr: "FINIR - arriver a la fin.", targetKanji: ["終"] },
  { word: "終わり", meanings: ["Fin"], readings: ["おわり"], mnemonicFr: "FIN - le terme.", targetKanji: ["終"] },
  { word: "始終", meanings: ["Du debut a la fin"], readings: ["しじゅう"], mnemonicFr: "DU DEBUT A LA FIN - tout le temps.", targetKanji: ["始", "終"] },
  { word: "開始", meanings: ["Debut", "Commencement"], readings: ["かいし"], mnemonicFr: "DEBUT - commencement.", targetKanji: ["開", "始"] },
  { word: "終了", meanings: ["Fin", "Achevement"], readings: ["しゅうりょう"], mnemonicFr: "FIN - achevement.", targetKanji: ["終", "了"] },

  // ===== KNOWLEDGE & INFORMATION (知識・情報) =====
  { word: "知る", meanings: ["Savoir", "Connaitre"], readings: ["しる"], mnemonicFr: "SAVOIR - avoir connaissance de.", targetKanji: ["知"] },
  { word: "知り合い", meanings: ["Connaissance"], readings: ["しりあい"], mnemonicFr: "CONNAISSANCE - personne qu'on connait.", targetKanji: ["知", "合"] },
  { word: "見る", meanings: ["Voir", "Regarder"], readings: ["みる"], mnemonicFr: "VOIR - percevoir par les yeux.", targetKanji: ["見"] },
  { word: "見える", meanings: ["Etre visible"], readings: ["みえる"], mnemonicFr: "ETRE VISIBLE - pouvoir etre vu.", targetKanji: ["見"] },
  { word: "見せる", meanings: ["Montrer"], readings: ["みせる"], mnemonicFr: "MONTRER - faire voir.", targetKanji: ["見"] },
  { word: "見物", meanings: ["Visite touristique"], readings: ["けんぶつ"], mnemonicFr: "VISITE TOURISTIQUE - aller voir.", targetKanji: ["見", "物"] },

  // ===== LANGUAGE (言語) =====
  { word: "日本語", meanings: ["Japonais (langue)"], readings: ["にほんご"], mnemonicFr: "JAPONAIS - la langue du Japon.", targetKanji: ["日", "本", "語"] },
  { word: "国語", meanings: ["Langue nationale"], readings: ["こくご"], mnemonicFr: "LANGUE NATIONALE - langue du pays.", targetKanji: ["国", "語"] },
  { word: "外国語", meanings: ["Langue etrangere"], readings: ["がいこくご"], mnemonicFr: "LANGUE ETRANGERE - langue d'un autre pays.", targetKanji: ["外", "国", "語"] },
  { word: "語学", meanings: ["Etude des langues"], readings: ["ごがく"], mnemonicFr: "ETUDE DES LANGUES - apprentissage linguistique.", targetKanji: ["語", "学"] },

  // ===== CLOTHING (服) =====
  { word: "服", meanings: ["Vetement"], readings: ["ふく"], mnemonicFr: "VETEMENT - habit.", targetKanji: ["服"] },
  { word: "服装", meanings: ["Tenue vestimentaire"], readings: ["ふくそう"], mnemonicFr: "TENUE VESTIMENTAIRE - habillement.", targetKanji: ["服", "装"] },
  { word: "和服", meanings: ["Vetement japonais", "Kimono"], readings: ["わふく"], mnemonicFr: "VETEMENT JAPONAIS - tenue traditionnelle.", targetKanji: ["和", "服"] },

  // ===== POSSESSION & HANDLING (持ち物) =====
  { word: "持つ", meanings: ["Tenir", "Posseder"], readings: ["もつ"], mnemonicFr: "TENIR - avoir en main.", targetKanji: ["持"] },
  { word: "持ち物", meanings: ["Affaires", "Effets personnels"], readings: ["もちもの"], mnemonicFr: "AFFAIRES - objets qu'on possede.", targetKanji: ["持", "物"] },
  { word: "持ち主", meanings: ["Proprietaire"], readings: ["もちぬし"], mnemonicFr: "PROPRIETAIRE - celui qui possede.", targetKanji: ["持", "主"] },
  { word: "待つ", meanings: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE - rester en attente.", targetKanji: ["待"] },
  { word: "待ち合わせ", meanings: ["Rendez-vous"], readings: ["まちあわせ"], mnemonicFr: "RENDEZ-VOUS - se retrouver.", targetKanji: ["待", "合"] },

  // ===== SAME & DIFFERENT (同・異) =====
  { word: "同じ", meanings: ["Meme", "Identique"], readings: ["おなじ"], mnemonicFr: "MEME - identique.", targetKanji: ["同"] },
  { word: "同時", meanings: ["En meme temps"], readings: ["どうじ"], mnemonicFr: "EN MEME TEMPS - simultanement.", targetKanji: ["同", "時"] },

  // ===== ELECTRICITY & MODERN LIFE (電気・現代生活) =====
  { word: "電気", meanings: ["Electricite"], readings: ["でんき"], mnemonicFr: "ELECTRICITE - energie electrique.", targetKanji: ["電", "気"] },
  { word: "電話", meanings: ["Telephone"], readings: ["でんわ"], mnemonicFr: "TELEPHONE - appareil de communication.", targetKanji: ["電", "話"] },
  { word: "電子", meanings: ["Electron", "Electronique"], readings: ["でんし"], mnemonicFr: "ELECTRONIQUE - relatif a l'electricite.", targetKanji: ["電", "子"] },

  // ===== ADDITIONAL COMMON VOCABULARY =====
  { word: "物", meanings: ["Chose", "Objet"], readings: ["もの"], mnemonicFr: "CHOSE - objet quelconque.", targetKanji: ["物"] },
  { word: "事", meanings: ["Chose", "Affaire"], readings: ["こと"], mnemonicFr: "AFFAIRE - evenement, chose abstraite.", targetKanji: ["事"] },
  { word: "人間", meanings: ["Etre humain"], readings: ["にんげん"], mnemonicFr: "ETRE HUMAIN - personne.", targetKanji: ["人", "間"] },
  { word: "時間", meanings: ["Temps", "Heure"], readings: ["じかん"], mnemonicFr: "TEMPS - duree.", targetKanji: ["時", "間"] },
  { word: "空間", meanings: ["Espace"], readings: ["くうかん"], mnemonicFr: "ESPACE - etendue vide.", targetKanji: ["空", "間"] },
  { word: "中間", meanings: ["Milieu", "Intermediaire"], readings: ["ちゅうかん"], mnemonicFr: "MILIEU - entre deux.", targetKanji: ["中", "間"] },
  { word: "年間", meanings: ["Durant l'annee"], readings: ["ねんかん"], mnemonicFr: "DURANT L'ANNEE - pendant un an.", targetKanji: ["年", "間"] },
  { word: "週間", meanings: ["Semaine"], readings: ["しゅうかん"], mnemonicFr: "SEMAINE - periode de sept jours.", targetKanji: ["週", "間"] },

  // ===== MORE EVERYDAY WORDS =====
  { word: "毎朝", meanings: ["Chaque matin"], readings: ["まいあさ"], mnemonicFr: "CHAQUE MATIN - tous les matins.", targetKanji: ["毎", "朝"] },
  { word: "毎晩", meanings: ["Chaque soir"], readings: ["まいばん"], mnemonicFr: "CHAQUE SOIR - tous les soirs.", targetKanji: ["毎", "晩"] },
  { word: "毎週", meanings: ["Chaque semaine"], readings: ["まいしゅう"], mnemonicFr: "CHAQUE SEMAINE - hebdomadairement.", targetKanji: ["毎", "週"] },
  { word: "午前", meanings: ["Matin", "AM"], readings: ["ごぜん"], mnemonicFr: "MATIN - avant midi.", targetKanji: ["午", "前"] },
  { word: "午後", meanings: ["Apres-midi", "PM"], readings: ["ごご"], mnemonicFr: "APRES-MIDI - apres midi.", targetKanji: ["午", "後"] },
  { word: "金", meanings: ["Or", "Argent"], readings: ["かね"], mnemonicFr: "ARGENT - monnaie.", targetKanji: ["金"] },
  { word: "金持ち", meanings: ["Riche"], readings: ["かねもち"], mnemonicFr: "RICHE - personne fortunee.", targetKanji: ["金", "持"] },
  { word: "土", meanings: ["Terre", "Sol"], readings: ["つち"], mnemonicFr: "TERRE - le sol.", targetKanji: ["土"] },
  { word: "本", meanings: ["Livre"], readings: ["ほん"], mnemonicFr: "LIVRE - ouvrage imprime.", targetKanji: ["本"] },
  { word: "本当", meanings: ["Vrai", "Vraiment"], readings: ["ほんとう"], mnemonicFr: "VRAI - authentique.", targetKanji: ["本", "当"] },
  { word: "本来", meanings: ["A l'origine"], readings: ["ほんらい"], mnemonicFr: "A L'ORIGINE - originellement.", targetKanji: ["本", "来"] },
  { word: "本人", meanings: ["La personne concernee"], readings: ["ほんにん"], mnemonicFr: "LA PERSONNE CONCERNEE - soi-meme.", targetKanji: ["本", "人"] },
  { word: "日本", meanings: ["Japon"], readings: ["にほん"], mnemonicFr: "JAPON - le pays du soleil levant.", targetKanji: ["日", "本"] },
  { word: "日本人", meanings: ["Japonais (personne)"], readings: ["にほんじん"], mnemonicFr: "JAPONAIS - personne du Japon.", targetKanji: ["日", "本", "人"] },
];

async function main() {
  console.log("=== SEEDING VOCABULARY BATCH 2 ===\n");

  // Get existing vocabulary to avoid duplicates
  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));
  console.log(`Found ${existingWords.size} existing vocabulary entries\n`);

  // Get all kanji in our system
  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, levelId: true }
  });
  const kanjiMap = new Map(allKanji.map(k => [k.character, { id: k.id, levelId: k.levelId }]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));
  console.log(`Found ${existingKanjiSet.size} kanji in our system\n`);

  let added = 0;
  let skipped = 0;
  let skippedMissingKanji = 0;

  for (const vocab of vocabBatch2) {
    // Skip if already exists
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    // Extract kanji from the word
    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (/[\u4e00-\u9faf]/.test(char)) {
        kanjiInWord.push(char);
      }
    }

    // Check if all kanji exist in our system
    const missingKanji = kanjiInWord.filter(k => !existingKanjiSet.has(k));
    if (missingKanji.length > 0) {
      console.log(`Skipping "${vocab.word}" - missing kanji: ${missingKanji.join(", ")}`);
      skippedMissingKanji++;
      continue;
    }

    // Find the max level of kanji used (vocabulary should be at the level of its hardest kanji)
    let maxLevel = 1;
    for (const char of kanjiInWord) {
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

      // Link to kanji via VocabularyKanji junction table
      for (const char of kanjiInWord) {
        const kanjiInfo = kanjiMap.get(char);
        if (kanjiInfo) {
          await prisma.vocabularyKanji.create({
            data: {
              vocabularyId: newVocab.id,
              kanjiId: kanjiInfo.id
            }
          }).catch(() => {
            // Ignore if already exists (shouldn't happen but safety)
          });
        }
      }

      added++;
      console.log(`Added: ${vocab.word} (Level ${maxLevel})`);
    } catch (e: any) {
      if (e.code !== "P2002") {
        console.log(`Error adding ${vocab.word}: ${e.message}`);
      }
      skipped++;
    }
  }

  // Get final count
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
