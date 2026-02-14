import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary batch 16: Two-kanji compounds using common position/size/quantity kanji
// Focus: 大, 小, 中, 上, 下, 左, 右, 前, 後, 内, 外, 新, 古, 高, 低, 長, 短, 多, 少

const vocabPart1 = [
  // 大 (Grand) compounds
  { word: "大人", meanings: ["Adulte"], readings: ["おとな"], mnemonicFr: "ADULTE - une grande personne." },
  { word: "大会", meanings: ["Grande reunion", "Tournoi"], readings: ["たいかい"], mnemonicFr: "TOURNOI - une grande assemblee pour une competition." },
  { word: "大学", meanings: ["Universite"], readings: ["だいがく"], mnemonicFr: "UNIVERSITE - le grand etablissement d'etudes." },
  { word: "大切", meanings: ["Important", "Precieux"], readings: ["たいせつ"], mnemonicFr: "PRECIEUX - ce qui est grandement a couper (preserver)." },
  { word: "大事", meanings: ["Important", "Serieux"], readings: ["だいじ"], mnemonicFr: "IMPORTANT - une grande affaire a ne pas negliger." },
  { word: "大変", meanings: ["Tres", "Difficile", "Grave"], readings: ["たいへん"], mnemonicFr: "GRAVE - un grand changement, une situation difficile." },
  { word: "大量", meanings: ["Grande quantite"], readings: ["たいりょう"], mnemonicFr: "GRANDE QUANTITE - un grand volume de quelque chose." },
  { word: "大型", meanings: ["Grand format", "Grande taille"], readings: ["おおがた"], mnemonicFr: "GRAND FORMAT - de grande forme ou taille." },
  { word: "大手", meanings: ["Grande entreprise", "Majeur"], readings: ["おおて"], mnemonicFr: "GRANDE ENTREPRISE - les grandes mains du marche." },
  { word: "大金", meanings: ["Grosse somme d'argent"], readings: ["たいきん"], mnemonicFr: "GROSSE SOMME - beaucoup d'argent." },
  { word: "大国", meanings: ["Grande puissance", "Grand pays"], readings: ["たいこく"], mnemonicFr: "GRANDE PUISSANCE - un pays de grande importance." },
  { word: "大使", meanings: ["Ambassadeur"], readings: ["たいし"], mnemonicFr: "AMBASSADEUR - le grand envoye d'un pays." },
  { word: "大臣", meanings: ["Ministre"], readings: ["だいじん"], mnemonicFr: "MINISTRE - un grand serviteur de l'Etat." },
  { word: "大陸", meanings: ["Continent"], readings: ["たいりく"], mnemonicFr: "CONTINENT - une grande masse de terre." },
  { word: "大雨", meanings: ["Forte pluie"], readings: ["おおあめ"], mnemonicFr: "FORTE PLUIE - une grande pluie." },
  { word: "大通り", meanings: ["Grande rue", "Avenue"], readings: ["おおどおり"], mnemonicFr: "AVENUE - une grande voie de passage." },
  { word: "大声", meanings: ["Voix forte"], readings: ["おおごえ"], mnemonicFr: "VOIX FORTE - une grande voix." },
  { word: "大勢", meanings: ["Foule", "Beaucoup de gens"], readings: ["おおぜい"], mnemonicFr: "FOULE - une grande force de personnes." },
  { word: "大半", meanings: ["Majorite", "La plupart"], readings: ["たいはん"], mnemonicFr: "MAJORITE - la grande moitie, plus de la moitie." },
  { word: "大部分", meanings: ["La plus grande partie"], readings: ["だいぶぶん"], mnemonicFr: "LA PLUS GRANDE PARTIE - une grande portion." },

  // 小 (Petit) compounds
  { word: "小説", meanings: ["Roman"], readings: ["しょうせつ"], mnemonicFr: "ROMAN - une petite theorie, une histoire fictive." },
  { word: "小学", meanings: ["Ecole primaire"], readings: ["しょうがく"], mnemonicFr: "ECOLE PRIMAIRE - les petites etudes." },
  { word: "小型", meanings: ["Petit format", "Compact"], readings: ["こがた"], mnemonicFr: "COMPACT - de petite forme." },
  { word: "小物", meanings: ["Petit objet", "Accessoire"], readings: ["こもの"], mnemonicFr: "ACCESSOIRE - une petite chose." },
  { word: "小声", meanings: ["Voix basse", "Chuchotement"], readings: ["こごえ"], mnemonicFr: "VOIX BASSE - une petite voix." },
  { word: "小屋", meanings: ["Cabane", "Hutte"], readings: ["こや"], mnemonicFr: "CABANE - une petite maison." },
  { word: "小鳥", meanings: ["Petit oiseau"], readings: ["ことり"], mnemonicFr: "PETIT OISEAU - un oiseau de petite taille." },
  { word: "小麦", meanings: ["Ble"], readings: ["こむぎ"], mnemonicFr: "BLE - le petit grain, la cereale." },
  { word: "小川", meanings: ["Ruisseau"], readings: ["おがわ"], mnemonicFr: "RUISSEAU - une petite riviere." },
  { word: "小銭", meanings: ["Monnaie", "Petite monnaie"], readings: ["こぜに"], mnemonicFr: "PETITE MONNAIE - de petites pieces." },
  { word: "小包", meanings: ["Colis", "Petit paquet"], readings: ["こづつみ"], mnemonicFr: "COLIS - un petit paquet enveloppe." },
  { word: "小数", meanings: ["Nombre decimal"], readings: ["しょうすう"], mnemonicFr: "DECIMAL - un petit nombre, une fraction." },

  // 中 (Milieu/Interieur) compounds
  { word: "中心", meanings: ["Centre", "Coeur"], readings: ["ちゅうしん"], mnemonicFr: "CENTRE - le coeur du milieu." },
  { word: "中間", meanings: ["Intermediaire", "Milieu"], readings: ["ちゅうかん"], mnemonicFr: "INTERMEDIAIRE - l'espace du milieu." },
  { word: "中身", meanings: ["Contenu"], readings: ["なかみ"], mnemonicFr: "CONTENU - ce qui est a l'interieur." },
  { word: "中古", meanings: ["Occasion", "D'occasion"], readings: ["ちゅうこ"], mnemonicFr: "OCCASION - entre neuf et vieux." },
  { word: "中止", meanings: ["Annulation", "Interruption"], readings: ["ちゅうし"], mnemonicFr: "ANNULATION - arreter au milieu." },
  { word: "中央", meanings: ["Centre", "Central"], readings: ["ちゅうおう"], mnemonicFr: "CENTRE - le milieu central." },
  { word: "中学", meanings: ["College"], readings: ["ちゅうがく"], mnemonicFr: "COLLEGE - l'ecole du milieu entre primaire et lycee." },
  { word: "中国", meanings: ["Chine"], readings: ["ちゅうごく"], mnemonicFr: "CHINE - le pays du milieu." },
  { word: "中年", meanings: ["Age moyen", "Quadragenaire"], readings: ["ちゅうねん"], mnemonicFr: "AGE MOYEN - les annees du milieu de la vie." },
  { word: "中途", meanings: ["A mi-chemin", "En cours de route"], readings: ["ちゅうと"], mnemonicFr: "A MI-CHEMIN - au milieu du chemin." },
  { word: "中立", meanings: ["Neutralite"], readings: ["ちゅうりつ"], mnemonicFr: "NEUTRALITE - se tenir au milieu." },
  { word: "中毒", meanings: ["Intoxication", "Addiction"], readings: ["ちゅうどく"], mnemonicFr: "INTOXICATION - du poison a l'interieur." },
  { word: "中性", meanings: ["Neutre", "Neutralite"], readings: ["ちゅうせい"], mnemonicFr: "NEUTRE - de nature intermediaire." },

  // 上 (Haut/Sur) compounds
  { word: "上手", meanings: ["Habile", "Doue"], readings: ["じょうず"], mnemonicFr: "HABILE - avoir la main haute, etre competent." },
  { word: "上達", meanings: ["Progres", "Amelioration"], readings: ["じょうたつ"], mnemonicFr: "PROGRES - atteindre le haut, s'ameliorer." },
  { word: "上司", meanings: ["Superieur hierarchique"], readings: ["じょうし"], mnemonicFr: "SUPERIEUR - celui qui dirige d'en haut." },
  { word: "上品", meanings: ["Elegant", "Raffine"], readings: ["じょうひん"], mnemonicFr: "ELEGANT - un article de qualite superieure." },
  { word: "上昇", meanings: ["Montee", "Hausse"], readings: ["じょうしょう"], mnemonicFr: "HAUSSE - monter vers le haut." },
  { word: "上記", meanings: ["Ci-dessus", "Mentionne plus haut"], readings: ["じょうき"], mnemonicFr: "CI-DESSUS - ecrit en haut." },
  { word: "上下", meanings: ["Haut et bas"], readings: ["じょうげ"], mnemonicFr: "HAUT ET BAS - de haut en bas." },
  { word: "上着", meanings: ["Veste", "Vetement du haut"], readings: ["うわぎ"], mnemonicFr: "VESTE - le vetement du dessus." },
  { word: "上位", meanings: ["Rang superieur"], readings: ["じょうい"], mnemonicFr: "RANG SUPERIEUR - une position elevee." },
  { word: "上級", meanings: ["Niveau avance"], readings: ["じょうきゅう"], mnemonicFr: "AVANCE - le niveau superieur." },
  { word: "上旬", meanings: ["Debut du mois"], readings: ["じょうじゅん"], mnemonicFr: "DEBUT DU MOIS - la periode du haut du mois." },
  { word: "上場", meanings: ["Introduction en bourse"], readings: ["じょうじょう"], mnemonicFr: "INTRODUCTION EN BOURSE - monter sur le marche." },
];

const vocabPart2 = [
  // 下 (Bas/Sous) compounds
  { word: "下手", meanings: ["Maladroit", "Pas doue"], readings: ["へた"], mnemonicFr: "MALADROIT - avoir la main basse, etre incompetent." },
  { word: "下品", meanings: ["Vulgaire", "Grossier"], readings: ["げひん"], mnemonicFr: "VULGAIRE - un article de basse qualite." },
  { word: "下記", meanings: ["Ci-dessous", "Mentionne ci-apres"], readings: ["かき"], mnemonicFr: "CI-DESSOUS - ecrit en bas." },
  { word: "下落", meanings: ["Chute", "Baisse"], readings: ["げらく"], mnemonicFr: "CHUTE - tomber vers le bas." },
  { word: "下降", meanings: ["Descente", "Declin"], readings: ["かこう"], mnemonicFr: "DESCENTE - aller vers le bas." },
  { word: "下着", meanings: ["Sous-vetement"], readings: ["したぎ"], mnemonicFr: "SOUS-VETEMENT - le vetement du dessous." },
  { word: "下旬", meanings: ["Fin du mois"], readings: ["げじゅん"], mnemonicFr: "FIN DU MOIS - la periode du bas du mois." },
  { word: "下水", meanings: ["Egout", "Eaux usees"], readings: ["げすい"], mnemonicFr: "EGOUT - l'eau du dessous." },
  { word: "下車", meanings: ["Descendre (vehicule)"], readings: ["げしゃ"], mnemonicFr: "DESCENDRE - quitter le vehicule en descendant." },
  { word: "下宿", meanings: ["Pension", "Logement"], readings: ["げしゅく"], mnemonicFr: "PENSION - loger en dessous, chez quelqu'un." },
  { word: "下書き", meanings: ["Brouillon"], readings: ["したがき"], mnemonicFr: "BROUILLON - l'ecriture d'en dessous, le premier jet." },
  { word: "地下", meanings: ["Souterrain", "Sous terre"], readings: ["ちか"], mnemonicFr: "SOUTERRAIN - en dessous de la terre." },
  { word: "地下鉄", meanings: ["Metro"], readings: ["ちかてつ"], mnemonicFr: "METRO - le train souterrain." },

  // 左 (Gauche) compounds
  { word: "左手", meanings: ["Main gauche"], readings: ["ひだりて"], mnemonicFr: "MAIN GAUCHE - la main du cote gauche." },
  { word: "左右", meanings: ["Gauche et droite", "Influence"], readings: ["さゆう"], mnemonicFr: "GAUCHE ET DROITE - les deux cotes." },
  { word: "左側", meanings: ["Cote gauche"], readings: ["ひだりがわ"], mnemonicFr: "COTE GAUCHE - le flanc gauche." },
  { word: "左折", meanings: ["Tourner a gauche"], readings: ["させつ"], mnemonicFr: "TOURNER A GAUCHE - plier vers la gauche." },
  { word: "左翼", meanings: ["Aile gauche", "Gauche politique"], readings: ["さよく"], mnemonicFr: "GAUCHE POLITIQUE - l'aile gauche." },

  // 右 (Droite) compounds
  { word: "右手", meanings: ["Main droite"], readings: ["みぎて"], mnemonicFr: "MAIN DROITE - la main du cote droit." },
  { word: "右側", meanings: ["Cote droit"], readings: ["みぎがわ"], mnemonicFr: "COTE DROIT - le flanc droit." },
  { word: "右折", meanings: ["Tourner a droite"], readings: ["うせつ"], mnemonicFr: "TOURNER A DROITE - plier vers la droite." },
  { word: "右翼", meanings: ["Aile droite", "Droite politique"], readings: ["うよく"], mnemonicFr: "DROITE POLITIQUE - l'aile droite." },

  // 前 (Avant/Devant) compounds
  { word: "前方", meanings: ["Devant", "En avant"], readings: ["ぜんぽう"], mnemonicFr: "EN AVANT - la direction de devant." },
  { word: "前半", meanings: ["Premiere moitie"], readings: ["ぜんはん"], mnemonicFr: "PREMIERE MOITIE - la moitie d'avant." },
  { word: "前後", meanings: ["Avant et apres", "Environ"], readings: ["ぜんご"], mnemonicFr: "AVANT ET APRES - devant et derriere." },
  { word: "前日", meanings: ["Veille", "Jour precedent"], readings: ["ぜんじつ"], mnemonicFr: "VEILLE - le jour d'avant." },
  { word: "前回", meanings: ["Fois precedente"], readings: ["ぜんかい"], mnemonicFr: "FOIS PRECEDENTE - la derniere fois." },
  { word: "前者", meanings: ["Le premier (des deux)"], readings: ["ぜんしゃ"], mnemonicFr: "LE PREMIER - la personne mentionnee avant." },
  { word: "前進", meanings: ["Avancer", "Progression"], readings: ["ぜんしん"], mnemonicFr: "AVANCER - progresser vers l'avant." },
  { word: "前提", meanings: ["Premisse", "Condition prealable"], readings: ["ぜんてい"], mnemonicFr: "PREMISSE - ce qui est pose devant, la base." },
  { word: "前例", meanings: ["Precedent"], readings: ["ぜんれい"], mnemonicFr: "PRECEDENT - un exemple anterieur." },
  { word: "以前", meanings: ["Avant", "Autrefois"], readings: ["いぜん"], mnemonicFr: "AVANT - a partir d'avant." },
  { word: "午前", meanings: ["Matin", "AM"], readings: ["ごぜん"], mnemonicFr: "MATIN - avant midi." },
  { word: "名前", meanings: ["Nom"], readings: ["なまえ"], mnemonicFr: "NOM - ce qui est devant, l'identite." },
  { word: "目の前", meanings: ["Devant les yeux"], readings: ["めのまえ"], mnemonicFr: "DEVANT LES YEUX - juste la, visible." },

  // 後 (Apres/Derriere) compounds
  { word: "後方", meanings: ["Arriere", "Derriere"], readings: ["こうほう"], mnemonicFr: "ARRIERE - la direction de derriere." },
  { word: "後半", meanings: ["Deuxieme moitie"], readings: ["こうはん"], mnemonicFr: "DEUXIEME MOITIE - la moitie d'apres." },
  { word: "後日", meanings: ["Plus tard", "Un autre jour"], readings: ["ごじつ"], mnemonicFr: "PLUS TARD - un jour posterieur." },
  { word: "後者", meanings: ["Le dernier (des deux)"], readings: ["こうしゃ"], mnemonicFr: "LE DERNIER - la personne mentionnee apres." },
  { word: "後輩", meanings: ["Cadet", "Junior"], readings: ["こうはい"], mnemonicFr: "JUNIOR - celui qui vient apres, le cadet." },
  { word: "後悔", meanings: ["Regret"], readings: ["こうかい"], mnemonicFr: "REGRET - repenser a apres, regretter." },
  { word: "後退", meanings: ["Recul", "Regression"], readings: ["こうたい"], mnemonicFr: "RECUL - reculer vers l'arriere." },
  { word: "以後", meanings: ["Apres", "Desormais"], readings: ["いご"], mnemonicFr: "APRES - a partir de maintenant." },
  { word: "午後", meanings: ["Apres-midi", "PM"], readings: ["ごご"], mnemonicFr: "APRES-MIDI - apres midi." },
  { word: "最後", meanings: ["Dernier", "Final"], readings: ["さいご"], mnemonicFr: "DERNIER - le plus en arriere, la fin." },
  { word: "今後", meanings: ["A l'avenir", "Desormais"], readings: ["こんご"], mnemonicFr: "A L'AVENIR - apres maintenant." },
  { word: "背後", meanings: ["Derriere", "Dans le dos"], readings: ["はいご"], mnemonicFr: "DERRIERE - dans le dos de quelqu'un." },
];

const vocabPart3 = [
  // 内 (Interieur) compounds
  { word: "内部", meanings: ["Interieur", "Interne"], readings: ["ないぶ"], mnemonicFr: "INTERIEUR - la partie du dedans." },
  { word: "内容", meanings: ["Contenu"], readings: ["ないよう"], mnemonicFr: "CONTENU - ce qui est a l'interieur." },
  { word: "内心", meanings: ["For interieur", "Au fond de soi"], readings: ["ないしん"], mnemonicFr: "FOR INTERIEUR - le coeur interieur." },
  { word: "内側", meanings: ["Cote interieur"], readings: ["うちがわ"], mnemonicFr: "COTE INTERIEUR - le flanc de l'interieur." },
  { word: "内科", meanings: ["Medecine interne"], readings: ["ないか"], mnemonicFr: "MEDECINE INTERNE - le departement de l'interieur du corps." },
  { word: "内線", meanings: ["Ligne interne", "Poste interne"], readings: ["ないせん"], mnemonicFr: "LIGNE INTERNE - la ligne telephonique interieure." },
  { word: "内定", meanings: ["Decision provisoire", "Embauche provisoire"], readings: ["ないてい"], mnemonicFr: "EMBAUCHE PROVISOIRE - fixe interieurement mais pas officiellement." },
  { word: "内閣", meanings: ["Cabinet (gouvernement)"], readings: ["ないかく"], mnemonicFr: "CABINET - le conseil interieur du gouvernement." },
  { word: "国内", meanings: ["National", "Interieur du pays"], readings: ["こくない"], mnemonicFr: "NATIONAL - a l'interieur du pays." },
  { word: "案内", meanings: ["Guide", "Information"], readings: ["あんない"], mnemonicFr: "GUIDE - mener a l'interieur, informer." },
  { word: "市内", meanings: ["Dans la ville"], readings: ["しない"], mnemonicFr: "DANS LA VILLE - a l'interieur de la ville." },
  { word: "室内", meanings: ["Interieur (d'une piece)"], readings: ["しつない"], mnemonicFr: "INTERIEUR - a l'interieur d'une piece." },
  { word: "体内", meanings: ["Dans le corps"], readings: ["たいない"], mnemonicFr: "DANS LE CORPS - a l'interieur du corps." },

  // 外 (Exterieur) compounds
  { word: "外部", meanings: ["Exterieur", "Externe"], readings: ["がいぶ"], mnemonicFr: "EXTERIEUR - la partie du dehors." },
  { word: "外見", meanings: ["Apparence"], readings: ["がいけん"], mnemonicFr: "APPARENCE - ce qu'on voit de l'exterieur." },
  { word: "外側", meanings: ["Cote exterieur"], readings: ["そとがわ"], mnemonicFr: "COTE EXTERIEUR - le flanc de l'exterieur." },
  { word: "外国", meanings: ["Pays etranger"], readings: ["がいこく"], mnemonicFr: "ETRANGER - un pays de l'exterieur." },
  { word: "外科", meanings: ["Chirurgie"], readings: ["げか"], mnemonicFr: "CHIRURGIE - le departement de l'exterieur du corps." },
  { word: "外出", meanings: ["Sortie"], readings: ["がいしゅつ"], mnemonicFr: "SORTIE - sortir a l'exterieur." },
  { word: "外交", meanings: ["Diplomatie"], readings: ["がいこう"], mnemonicFr: "DIPLOMATIE - les relations avec l'exterieur." },
  { word: "外食", meanings: ["Manger dehors"], readings: ["がいしょく"], mnemonicFr: "MANGER DEHORS - repas a l'exterieur." },
  { word: "外来", meanings: ["Consultation externe", "Emprunte"], readings: ["がいらい"], mnemonicFr: "EXTERNE - qui vient de l'exterieur." },
  { word: "海外", meanings: ["Outre-mer", "A l'etranger"], readings: ["かいがい"], mnemonicFr: "OUTRE-MER - au-dela de la mer, a l'etranger." },
  { word: "意外", meanings: ["Inattendu", "Surprenant"], readings: ["いがい"], mnemonicFr: "INATTENDU - en dehors des attentes." },
  { word: "以外", meanings: ["Sauf", "A part"], readings: ["いがい"], mnemonicFr: "SAUF - en dehors de." },
  { word: "例外", meanings: ["Exception"], readings: ["れいがい"], mnemonicFr: "EXCEPTION - en dehors de l'exemple." },

  // 新 (Nouveau) compounds
  { word: "新品", meanings: ["Article neuf"], readings: ["しんぴん"], mnemonicFr: "NEUF - un produit nouveau." },
  { word: "新人", meanings: ["Nouveau venu", "Debutant"], readings: ["しんじん"], mnemonicFr: "DEBUTANT - une nouvelle personne." },
  { word: "新聞", meanings: ["Journal"], readings: ["しんぶん"], mnemonicFr: "JOURNAL - les nouvelles ecrites." },
  { word: "新年", meanings: ["Nouvel An"], readings: ["しんねん"], mnemonicFr: "NOUVEL AN - la nouvelle annee." },
  { word: "新鮮", meanings: ["Frais"], readings: ["しんせん"], mnemonicFr: "FRAIS - nouvellement frais." },
  { word: "新幹線", meanings: ["Shinkansen", "TGV japonais"], readings: ["しんかんせん"], mnemonicFr: "SHINKANSEN - la nouvelle ligne principale." },
  { word: "新築", meanings: ["Construction neuve"], readings: ["しんちく"], mnemonicFr: "NEUF - nouvellement construit." },
  { word: "新婚", meanings: ["Jeunes maries"], readings: ["しんこん"], mnemonicFr: "JEUNES MARIES - nouvellement maries." },
  { word: "新規", meanings: ["Nouveau", "Initial"], readings: ["しんき"], mnemonicFr: "NOUVEAU - une nouvelle norme." },
  { word: "新入", meanings: ["Nouveau membre"], readings: ["しんにゅう"], mnemonicFr: "NOUVEAU MEMBRE - qui entre nouvellement." },
  { word: "新着", meanings: ["Nouveaute", "Nouveau arrivage"], readings: ["しんちゃく"], mnemonicFr: "NOUVEAUTE - nouvellement arrive." },
  { word: "革新", meanings: ["Innovation", "Reforme"], readings: ["かくしん"], mnemonicFr: "INNOVATION - changer vers le nouveau." },
  { word: "更新", meanings: ["Mise a jour", "Renouvellement"], readings: ["こうしん"], mnemonicFr: "MISE A JOUR - rendre nouveau a nouveau." },

  // 古 (Ancien/Vieux) compounds
  { word: "古代", meanings: ["Antiquite", "Temps anciens"], readings: ["こだい"], mnemonicFr: "ANTIQUITE - l'ere ancienne." },
  { word: "古物", meanings: ["Antiquite", "Objet ancien"], readings: ["こぶつ"], mnemonicFr: "ANTIQUITE - une vieille chose." },
  { word: "古典", meanings: ["Classique", "Oeuvre classique"], readings: ["こてん"], mnemonicFr: "CLASSIQUE - un code ancien, une oeuvre classique." },
  { word: "古本", meanings: ["Livre d'occasion"], readings: ["ふるほん"], mnemonicFr: "LIVRE D'OCCASION - un vieux livre." },
  { word: "古着", meanings: ["Vetement d'occasion"], readings: ["ふるぎ"], mnemonicFr: "VETEMENT D'OCCASION - de vieux vetements." },
  { word: "古来", meanings: ["Depuis l'antiquite"], readings: ["こらい"], mnemonicFr: "DEPUIS L'ANTIQUITE - venant de l'ancien temps." },
  { word: "古墳", meanings: ["Tumulus", "Tombe ancienne"], readings: ["こふん"], mnemonicFr: "TUMULUS - une tombe ancienne." },
  { word: "太古", meanings: ["Temps immemoraux"], readings: ["たいこ"], mnemonicFr: "TEMPS IMMEMORAUX - l'ancien tres lointain." },
  { word: "考古学", meanings: ["Archeologie"], readings: ["こうこがく"], mnemonicFr: "ARCHEOLOGIE - l'etude des choses anciennes." },
];

const vocabPart4 = [
  // 高 (Haut/Cher) compounds
  { word: "高価", meanings: ["Couteux", "Cher"], readings: ["こうか"], mnemonicFr: "COUTEUX - de prix eleve." },
  { word: "高級", meanings: ["Haut de gamme", "Luxueux"], readings: ["こうきゅう"], mnemonicFr: "LUXUEUX - de classe elevee." },
  { word: "高度", meanings: ["Altitude", "Niveau eleve"], readings: ["こうど"], mnemonicFr: "ALTITUDE - le degre de hauteur." },
  { word: "高校", meanings: ["Lycee"], readings: ["こうこう"], mnemonicFr: "LYCEE - l'ecole superieure." },
  { word: "高原", meanings: ["Plateau", "Hautes terres"], readings: ["こうげん"], mnemonicFr: "PLATEAU - une plaine elevee." },
  { word: "高齢", meanings: ["Age avance"], readings: ["こうれい"], mnemonicFr: "AGE AVANCE - un age eleve." },
  { word: "高層", meanings: ["Gratte-ciel", "Grande hauteur"], readings: ["こうそう"], mnemonicFr: "GRATTE-CIEL - de nombreux etages eleves." },
  { word: "高速", meanings: ["Grande vitesse"], readings: ["こうそく"], mnemonicFr: "GRANDE VITESSE - vitesse elevee." },
  { word: "高温", meanings: ["Haute temperature"], readings: ["こうおん"], mnemonicFr: "HAUTE TEMPERATURE - chaleur elevee." },
  { word: "最高", meanings: ["Le meilleur", "Maximum"], readings: ["さいこう"], mnemonicFr: "MAXIMUM - le plus haut." },
  { word: "円高", meanings: ["Hausse du yen"], readings: ["えんだか"], mnemonicFr: "YEN FORT - le yen est haut." },

  // 低 (Bas) compounds
  { word: "低価", meanings: ["Bas prix"], readings: ["ていか"], mnemonicFr: "BAS PRIX - de prix bas." },
  { word: "低下", meanings: ["Baisse", "Declin"], readings: ["ていか"], mnemonicFr: "BAISSE - aller vers le bas." },
  { word: "低温", meanings: ["Basse temperature"], readings: ["ていおん"], mnemonicFr: "BASSE TEMPERATURE - froid, chaleur basse." },
  { word: "低速", meanings: ["Basse vitesse"], readings: ["ていそく"], mnemonicFr: "BASSE VITESSE - vitesse lente." },
  { word: "低地", meanings: ["Terre basse", "Plaine"], readings: ["ていち"], mnemonicFr: "TERRE BASSE - un terrain bas." },
  { word: "低迷", meanings: ["Stagnation", "Depression"], readings: ["ていめい"], mnemonicFr: "STAGNATION - rester bas et perdu." },
  { word: "低調", meanings: ["Mou", "Atone"], readings: ["ていちょう"], mnemonicFr: "ATONE - d'un ton bas, sans energie." },
  { word: "最低", meanings: ["Le pire", "Minimum"], readings: ["さいてい"], mnemonicFr: "MINIMUM - le plus bas." },

  // 長 (Long) compounds
  { word: "長所", meanings: ["Point fort", "Qualite"], readings: ["ちょうしょ"], mnemonicFr: "QUALITE - un endroit long, une force." },
  { word: "長期", meanings: ["Long terme"], readings: ["ちょうき"], mnemonicFr: "LONG TERME - une longue periode." },
  { word: "長時間", meanings: ["Longue duree"], readings: ["ちょうじかん"], mnemonicFr: "LONGUE DUREE - beaucoup de temps." },
  { word: "長男", meanings: ["Fils aine"], readings: ["ちょうなん"], mnemonicFr: "FILS AINE - le premier fils, le plus long en age." },
  { word: "長女", meanings: ["Fille ainee"], readings: ["ちょうじょ"], mnemonicFr: "FILLE AINEE - la premiere fille." },
  { word: "長編", meanings: ["Long metrage", "Roman fleuve"], readings: ["ちょうへん"], mnemonicFr: "LONG METRAGE - une oeuvre de longue duree." },
  { word: "長生き", meanings: ["Longevite"], readings: ["ながいき"], mnemonicFr: "LONGEVITE - vivre longtemps." },
  { word: "長袖", meanings: ["Manches longues"], readings: ["ながそで"], mnemonicFr: "MANCHES LONGUES - vetement a longues manches." },
  { word: "社長", meanings: ["PDG", "President"], readings: ["しゃちょう"], mnemonicFr: "PDG - le chef de l'entreprise." },
  { word: "校長", meanings: ["Directeur d'ecole"], readings: ["こうちょう"], mnemonicFr: "DIRECTEUR - le chef de l'ecole." },
  { word: "部長", meanings: ["Chef de departement"], readings: ["ぶちょう"], mnemonicFr: "CHEF DE DEPARTEMENT - le chef de la division." },
  { word: "課長", meanings: ["Chef de section"], readings: ["かちょう"], mnemonicFr: "CHEF DE SECTION - le chef du cours." },
  { word: "会長", meanings: ["President (association)"], readings: ["かいちょう"], mnemonicFr: "PRESIDENT - le chef de l'assemblee." },
  { word: "延長", meanings: ["Prolongation"], readings: ["えんちょう"], mnemonicFr: "PROLONGATION - etendre la longueur." },
  { word: "成長", meanings: ["Croissance"], readings: ["せいちょう"], mnemonicFr: "CROISSANCE - devenir plus long, grandir." },

  // 短 (Court) compounds
  { word: "短所", meanings: ["Point faible", "Defaut"], readings: ["たんしょ"], mnemonicFr: "DEFAUT - un endroit court, une faiblesse." },
  { word: "短期", meanings: ["Court terme"], readings: ["たんき"], mnemonicFr: "COURT TERME - une courte periode." },
  { word: "短時間", meanings: ["Courte duree"], readings: ["たんじかん"], mnemonicFr: "COURTE DUREE - peu de temps." },
  { word: "短編", meanings: ["Court metrage", "Nouvelle"], readings: ["たんぺん"], mnemonicFr: "COURT METRAGE - une oeuvre de courte duree." },
  { word: "短気", meanings: ["Impatient", "Colere facile"], readings: ["たんき"], mnemonicFr: "IMPATIENT - de courte humeur." },
  { word: "短縮", meanings: ["Reduction", "Raccourcissement"], readings: ["たんしゅく"], mnemonicFr: "REDUCTION - rendre plus court." },
  { word: "短命", meanings: ["Vie courte"], readings: ["たんめい"], mnemonicFr: "VIE COURTE - une courte vie." },
  { word: "短大", meanings: ["Universite de 2 ans"], readings: ["たんだい"], mnemonicFr: "UNIVERSITE COURTE - etudes superieures courtes." },
  { word: "短波", meanings: ["Ondes courtes"], readings: ["たんぱ"], mnemonicFr: "ONDES COURTES - vagues de courte longueur." },
  { word: "短刀", meanings: ["Poignard"], readings: ["たんとう"], mnemonicFr: "POIGNARD - un couteau court." },
];

const vocabPart5 = [
  // 多 (Beaucoup) compounds
  { word: "多数", meanings: ["Majorite", "Grand nombre"], readings: ["たすう"], mnemonicFr: "MAJORITE - beaucoup en nombre." },
  { word: "多量", meanings: ["Grande quantite"], readings: ["たりょう"], mnemonicFr: "GRANDE QUANTITE - beaucoup de volume." },
  { word: "多分", meanings: ["Probablement", "Peut-etre"], readings: ["たぶん"], mnemonicFr: "PROBABLEMENT - pour une grande part." },
  { word: "多少", meanings: ["Un peu", "Plus ou moins"], readings: ["たしょう"], mnemonicFr: "UN PEU - beaucoup ou peu." },
  { word: "多様", meanings: ["Divers", "Varie"], readings: ["たよう"], mnemonicFr: "DIVERS - de nombreuses formes." },
  { word: "多忙", meanings: ["Tres occupe"], readings: ["たぼう"], mnemonicFr: "TRES OCCUPE - beaucoup de travail." },
  { word: "多彩", meanings: ["Colore", "Varie"], readings: ["たさい"], mnemonicFr: "COLORE - de nombreuses couleurs." },
  { word: "多額", meanings: ["Grosse somme"], readings: ["たがく"], mnemonicFr: "GROSSE SOMME - beaucoup d'argent." },
  { word: "多角", meanings: ["Polygone", "Multifacette"], readings: ["たかく"], mnemonicFr: "MULTIFACETTE - de nombreux angles." },
  { word: "多国", meanings: ["Multinational"], readings: ["たこく"], mnemonicFr: "MULTINATIONAL - de nombreux pays." },

  // 少 (Peu) compounds
  { word: "少数", meanings: ["Minorite", "Petit nombre"], readings: ["しょうすう"], mnemonicFr: "MINORITE - peu en nombre." },
  { word: "少量", meanings: ["Petite quantite"], readings: ["しょうりょう"], mnemonicFr: "PETITE QUANTITE - peu de volume." },
  { word: "少年", meanings: ["Garcon", "Jeune homme"], readings: ["しょうねん"], mnemonicFr: "GARCON - un jeune de peu d'annees." },
  { word: "少女", meanings: ["Fille", "Jeune fille"], readings: ["しょうじょ"], mnemonicFr: "FILLE - une jeune de peu d'annees." },
  { word: "少々", meanings: ["Un peu"], readings: ["しょうしょう"], mnemonicFr: "UN PEU - peu peu, juste un petit peu." },
  { word: "少額", meanings: ["Petite somme"], readings: ["しょうがく"], mnemonicFr: "PETITE SOMME - peu d'argent." },
  { word: "減少", meanings: ["Diminution", "Baisse"], readings: ["げんしょう"], mnemonicFr: "DIMINUTION - reduire vers peu." },
  { word: "青少年", meanings: ["Adolescent", "Jeunesse"], readings: ["せいしょうねん"], mnemonicFr: "JEUNESSE - les jeunes de peu d'annees." },

  // Additional useful compounds mixing these kanji
  { word: "大小", meanings: ["Grand et petit", "Taille"], readings: ["だいしょう"], mnemonicFr: "TAILLE - grand et petit." },
  { word: "大中小", meanings: ["Grand moyen petit"], readings: ["だいちゅうしょう"], mnemonicFr: "LES TROIS TAILLES - toutes les tailles." },
  { word: "上中下", meanings: ["Haut milieu bas"], readings: ["じょうちゅうげ"], mnemonicFr: "LES TROIS NIVEAUX - tous les niveaux." },
  { word: "内外", meanings: ["Interieur et exterieur"], readings: ["ないがい"], mnemonicFr: "INTERIEUR ET EXTERIEUR - dedans et dehors." },
  { word: "新旧", meanings: ["Nouveau et ancien"], readings: ["しんきゅう"], mnemonicFr: "NOUVEAU ET ANCIEN - le neuf et le vieux." },
  { word: "高低", meanings: ["Haut et bas", "Altitude"], readings: ["こうてい"], mnemonicFr: "HAUTEUR - haut et bas." },
  { word: "長短", meanings: ["Longueur", "Pour et contre"], readings: ["ちょうたん"], mnemonicFr: "POUR ET CONTRE - les avantages et inconvenients." },

  // More 大 compounds
  { word: "大気", meanings: ["Atmosphere"], readings: ["たいき"], mnemonicFr: "ATMOSPHERE - le grand air." },
  { word: "大地", meanings: ["Terre", "Sol"], readings: ["だいち"], mnemonicFr: "TERRE - la grande terre." },
  { word: "大統領", meanings: ["President (pays)"], readings: ["だいとうりょう"], mnemonicFr: "PRESIDENT - le grand chef unifie." },
  { word: "大丈夫", meanings: ["Ca va", "Pas de probleme"], readings: ["だいじょうぶ"], mnemonicFr: "CA VA - un grand homme fort, tout va bien." },
  { word: "拡大", meanings: ["Agrandissement", "Expansion"], readings: ["かくだい"], mnemonicFr: "EXPANSION - etendre vers le grand." },
  { word: "最大", meanings: ["Maximum", "Le plus grand"], readings: ["さいだい"], mnemonicFr: "MAXIMUM - le plus grand." },
  { word: "重大", meanings: ["Grave", "Serieux"], readings: ["じゅうだい"], mnemonicFr: "GRAVE - lourd et grand." },
  { word: "偉大", meanings: ["Grand", "Eminent"], readings: ["いだい"], mnemonicFr: "EMINENT - remarquablement grand." },

  // More 小 compounds
  { word: "小学生", meanings: ["Ecolier"], readings: ["しょうがくせい"], mnemonicFr: "ECOLIER - eleve de l'ecole primaire." },
  { word: "最小", meanings: ["Minimum", "Le plus petit"], readings: ["さいしょう"], mnemonicFr: "MINIMUM - le plus petit." },
  { word: "縮小", meanings: ["Reduction", "Miniaturisation"], readings: ["しゅくしょう"], mnemonicFr: "REDUCTION - retrecir vers petit." },

  // More 中 compounds
  { word: "中旬", meanings: ["Milieu du mois"], readings: ["ちゅうじゅん"], mnemonicFr: "MILIEU DU MOIS - la periode du milieu du mois." },
  { word: "中世", meanings: ["Moyen Age"], readings: ["ちゅうせい"], mnemonicFr: "MOYEN AGE - l'ere du milieu." },
  { word: "中東", meanings: ["Moyen-Orient"], readings: ["ちゅうとう"], mnemonicFr: "MOYEN-ORIENT - l'est du milieu." },
  { word: "中華", meanings: ["Chinois"], readings: ["ちゅうか"], mnemonicFr: "CHINOIS - fleur du milieu, la Chine." },
  { word: "集中", meanings: ["Concentration"], readings: ["しゅうちゅう"], mnemonicFr: "CONCENTRATION - rassembler au centre." },
  { word: "途中", meanings: ["En chemin", "En cours"], readings: ["とちゅう"], mnemonicFr: "EN CHEMIN - au milieu du chemin." },
  { word: "夢中", meanings: ["Absorbe", "Passionne"], readings: ["むちゅう"], mnemonicFr: "ABSORBE - au milieu d'un reve." },
];

const vocabPart6 = [
  // More position/direction compounds
  { word: "上流", meanings: ["Amont", "Classe superieure"], readings: ["じょうりゅう"], mnemonicFr: "AMONT - le flux du haut." },
  { word: "下流", meanings: ["Aval", "Classe inferieure"], readings: ["かりゅう"], mnemonicFr: "AVAL - le flux du bas." },
  { word: "上空", meanings: ["Au-dessus", "Dans le ciel"], readings: ["じょうくう"], mnemonicFr: "AU-DESSUS - l'espace du haut." },
  { word: "地上", meanings: ["Sur terre", "Au sol"], readings: ["ちじょう"], mnemonicFr: "AU SOL - sur la terre." },
  { word: "屋上", meanings: ["Toit", "Terrasse"], readings: ["おくじょう"], mnemonicFr: "TOIT - le dessus du batiment." },
  { word: "路上", meanings: ["Sur la route"], readings: ["ろじょう"], mnemonicFr: "SUR LA ROUTE - sur le chemin." },
  { word: "世の中", meanings: ["Le monde", "La societe"], readings: ["よのなか"], mnemonicFr: "LE MONDE - au milieu de la generation." },
  { word: "水中", meanings: ["Sous l'eau"], readings: ["すいちゅう"], mnemonicFr: "SOUS L'EAU - au milieu de l'eau." },
  { word: "空中", meanings: ["En l'air", "Aerien"], readings: ["くうちゅう"], mnemonicFr: "EN L'AIR - au milieu du vide." },

  // More 前/後 compounds
  { word: "前売り", meanings: ["Prevente"], readings: ["まえうり"], mnemonicFr: "PREVENTE - vendre avant." },
  { word: "前向き", meanings: ["Positif", "Optimiste"], readings: ["まえむき"], mnemonicFr: "POSITIF - oriente vers l'avant." },
  { word: "直前", meanings: ["Juste avant"], readings: ["ちょくぜん"], mnemonicFr: "JUSTE AVANT - directement avant." },
  { word: "事前", meanings: ["A l'avance", "Prealable"], readings: ["じぜん"], mnemonicFr: "A L'AVANCE - avant l'affaire." },
  { word: "後ろ", meanings: ["Derriere"], readings: ["うしろ"], mnemonicFr: "DERRIERE - l'arriere." },
  { word: "後ほど", meanings: ["Plus tard"], readings: ["のちほど"], mnemonicFr: "PLUS TARD - apres un moment." },
  { word: "前後左右", meanings: ["Toutes les directions"], readings: ["ぜんごさゆう"], mnemonicFr: "TOUTES DIRECTIONS - avant arriere gauche droite." },

  // More 内/外 compounds
  { word: "車内", meanings: ["Dans le vehicule"], readings: ["しゃない"], mnemonicFr: "DANS LE VEHICULE - a l'interieur de la voiture." },
  { word: "店内", meanings: ["Dans le magasin"], readings: ["てんない"], mnemonicFr: "DANS LE MAGASIN - a l'interieur du magasin." },
  { word: "社内", meanings: ["Dans l'entreprise"], readings: ["しゃない"], mnemonicFr: "DANS L'ENTREPRISE - a l'interieur de la societe." },
  { word: "校内", meanings: ["Dans l'ecole"], readings: ["こうない"], mnemonicFr: "DANS L'ECOLE - a l'interieur de l'etablissement." },
  { word: "都内", meanings: ["Dans Tokyo"], readings: ["とない"], mnemonicFr: "DANS TOKYO - a l'interieur de la capitale." },
  { word: "屋外", meanings: ["En plein air"], readings: ["おくがい"], mnemonicFr: "EN PLEIN AIR - a l'exterieur du batiment." },
  { word: "野外", meanings: ["En plein air"], readings: ["やがい"], mnemonicFr: "EN PLEIN AIR - a l'exterieur, dans les champs." },
  { word: "郊外", meanings: ["Banlieue"], readings: ["こうがい"], mnemonicFr: "BANLIEUE - l'exterieur de la ville." },

  // More 新/古 compounds
  { word: "新型", meanings: ["Nouveau modele"], readings: ["しんがた"], mnemonicFr: "NOUVEAU MODELE - nouvelle forme." },
  { word: "新車", meanings: ["Voiture neuve"], readings: ["しんしゃ"], mnemonicFr: "VOITURE NEUVE - nouvelle voiture." },
  { word: "新作", meanings: ["Nouvelle creation"], readings: ["しんさく"], mnemonicFr: "NOUVELLE CREATION - nouvelle oeuvre." },
  { word: "新設", meanings: ["Nouvelle installation"], readings: ["しんせつ"], mnemonicFr: "NOUVELLE INSTALLATION - nouvellement etabli." },
  { word: "新記録", meanings: ["Nouveau record"], readings: ["しんきろく"], mnemonicFr: "NOUVEAU RECORD - un nouveau resultat." },
  { word: "古い", meanings: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonicFr: "VIEUX - de temps ancien." },
  { word: "古風", meanings: ["A l'ancienne", "Demode"], readings: ["こふう"], mnemonicFr: "A L'ANCIENNE - style ancien." },
  { word: "古都", meanings: ["Ancienne capitale"], readings: ["こと"], mnemonicFr: "ANCIENNE CAPITALE - la vieille capitale." },
  { word: "中古車", meanings: ["Voiture d'occasion"], readings: ["ちゅうこしゃ"], mnemonicFr: "VOITURE D'OCCASION - vehicule entre neuf et vieux." },

  // More 高/低 compounds
  { word: "高める", meanings: ["Elever", "Augmenter"], readings: ["たかめる"], mnemonicFr: "ELEVER - rendre plus haut." },
  { word: "高まる", meanings: ["S'elever", "Augmenter"], readings: ["たかまる"], mnemonicFr: "S'ELEVER - devenir plus haut." },
  { word: "高血圧", meanings: ["Hypertension"], readings: ["こうけつあつ"], mnemonicFr: "HYPERTENSION - pression sanguine elevee." },
  { word: "高収入", meanings: ["Haut revenu"], readings: ["こうしゅうにゅう"], mnemonicFr: "HAUT REVENU - entrees elevees." },
  { word: "低い", meanings: ["Bas", "Peu eleve"], readings: ["ひくい"], mnemonicFr: "BAS - de faible hauteur." },
  { word: "低める", meanings: ["Baisser", "Diminuer"], readings: ["ひくめる"], mnemonicFr: "BAISSER - rendre plus bas." },
  { word: "低血圧", meanings: ["Hypotension"], readings: ["ていけつあつ"], mnemonicFr: "HYPOTENSION - pression sanguine basse." },

  // More 長/短 compounds
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - de grande longueur." },
  { word: "長さ", meanings: ["Longueur"], readings: ["ながさ"], mnemonicFr: "LONGUEUR - la mesure de ce qui est long." },
  { word: "長年", meanings: ["De longues annees"], readings: ["ながねん"], mnemonicFr: "LONGUES ANNEES - pendant de nombreuses annees." },
  { word: "長文", meanings: ["Texte long"], readings: ["ちょうぶん"], mnemonicFr: "TEXTE LONG - une longue phrase." },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - de petite longueur." },
  { word: "短く", meanings: ["Brievement"], readings: ["みじかく"], mnemonicFr: "BRIEVEMENT - de maniere courte." },
  { word: "手短", meanings: ["Bref", "Concis"], readings: ["てみじか"], mnemonicFr: "CONCIS - court par la main, bref." },
];

const vocabPart7 = [
  // More 多/少 compounds
  { word: "多い", meanings: ["Nombreux", "Beaucoup"], readings: ["おおい"], mnemonicFr: "NOMBREUX - en grande quantite." },
  { word: "多く", meanings: ["Beaucoup", "La plupart"], readings: ["おおく"], mnemonicFr: "BEAUCOUP - en grand nombre." },
  { word: "多発", meanings: ["Frequents", "Nombreux cas"], readings: ["たはつ"], mnemonicFr: "FREQUENTS - beaucoup d'occurrences." },
  { word: "少ない", meanings: ["Peu nombreux"], readings: ["すくない"], mnemonicFr: "PEU NOMBREUX - en petite quantite." },
  { word: "少なく", meanings: ["Peu", "Au moins"], readings: ["すくなく"], mnemonicFr: "PEU - en petit nombre." },
  { word: "少なくとも", meanings: ["Au moins"], readings: ["すくなくとも"], mnemonicFr: "AU MOINS - meme peu." },

  // Additional useful vocabulary with these kanji
  { word: "前年", meanings: ["Annee precedente"], readings: ["ぜんねん"], mnemonicFr: "ANNEE PRECEDENTE - l'annee d'avant." },
  { word: "年上", meanings: ["Aine", "Plus age"], readings: ["としうえ"], mnemonicFr: "AINE - au-dessus en annees." },
  { word: "年下", meanings: ["Cadet", "Plus jeune"], readings: ["としした"], mnemonicFr: "CADET - en dessous en annees." },
  { word: "目上", meanings: ["Superieur"], readings: ["めうえ"], mnemonicFr: "SUPERIEUR - au-dessus des yeux, hierarchie." },
  { word: "目下", meanings: ["Inferieur"], readings: ["めした"], mnemonicFr: "INFERIEUR - en dessous des yeux, hierarchie." },
  { word: "上がる", meanings: ["Monter", "S'elever"], readings: ["あがる"], mnemonicFr: "MONTER - aller vers le haut." },
  { word: "下がる", meanings: ["Descendre", "Baisser"], readings: ["さがる"], mnemonicFr: "DESCENDRE - aller vers le bas." },
  { word: "上げる", meanings: ["Lever", "Donner"], readings: ["あげる"], mnemonicFr: "LEVER - faire monter." },
  { word: "下げる", meanings: ["Baisser", "Suspendre"], readings: ["さげる"], mnemonicFr: "BAISSER - faire descendre." },

  // Direction/position with verbs
  { word: "前に", meanings: ["Devant", "Avant"], readings: ["まえに"], mnemonicFr: "DEVANT - en position avant." },
  { word: "後で", meanings: ["Plus tard", "Apres"], readings: ["あとで"], mnemonicFr: "PLUS TARD - a un moment ulterieur." },
  { word: "中に", meanings: ["A l'interieur", "Dedans"], readings: ["なかに"], mnemonicFr: "A L'INTERIEUR - dans le milieu." },
  { word: "外に", meanings: ["A l'exterieur", "Dehors"], readings: ["そとに"], mnemonicFr: "A L'EXTERIEUR - au dehors." },

  // More compounds
  { word: "真ん中", meanings: ["Centre", "Milieu exact"], readings: ["まんなか"], mnemonicFr: "CENTRE EXACT - le vrai milieu." },
  { word: "手前", meanings: ["Avant", "De ce cote"], readings: ["てまえ"], mnemonicFr: "DE CE COTE - devant la main." },
  { word: "間違い", meanings: ["Erreur"], readings: ["まちがい"], mnemonicFr: "ERREUR - ecart de l'espace intermediaire." },
  { word: "一番", meanings: ["Premier", "Le plus"], readings: ["いちばん"], mnemonicFr: "PREMIER - le numero un." },

  // Final batch to reach 200+
  { word: "大好き", meanings: ["Adorer", "Aimer beaucoup"], readings: ["だいすき"], mnemonicFr: "ADORER - grandement aimer." },
  { word: "大嫌い", meanings: ["Detester"], readings: ["だいきらい"], mnemonicFr: "DETESTER - grandement hair." },
  { word: "大抵", meanings: ["Generalement", "La plupart du temps"], readings: ["たいてい"], mnemonicFr: "GENERALEMENT - dans la grande partie." },
  { word: "大分", meanings: ["Considerablement"], readings: ["だいぶ"], mnemonicFr: "CONSIDERABLEMENT - une grande part." },
  { word: "大体", meanings: ["A peu pres", "Globalement"], readings: ["だいたい"], mnemonicFr: "GLOBALEMENT - dans le grand corps." },
  { word: "小さな", meanings: ["Petit"], readings: ["ちいさな"], mnemonicFr: "PETIT - de petite taille." },
  { word: "中々", meanings: ["Assez", "Plutot"], readings: ["なかなか"], mnemonicFr: "ASSEZ - moyen moyen, pas mal." },
  { word: "外れる", meanings: ["Manquer", "Se detacher"], readings: ["はずれる"], mnemonicFr: "MANQUER - sortir a l'exterieur, rater." },
  { word: "外す", meanings: ["Enlever", "Oter"], readings: ["はずす"], mnemonicFr: "ENLEVER - mettre a l'exterieur." },
  { word: "新た", meanings: ["Nouveau", "Frais"], readings: ["あらた"], mnemonicFr: "NOUVEAU - de nouveau." },
  { word: "高さ", meanings: ["Hauteur"], readings: ["たかさ"], mnemonicFr: "HAUTEUR - la mesure du haut." },
  { word: "低さ", meanings: ["Bassesse"], readings: ["ひくさ"], mnemonicFr: "BASSESSE - la mesure du bas." },

  // Additional compounds to ensure 200+ entries
  { word: "上部", meanings: ["Partie superieure"], readings: ["じょうぶ"], mnemonicFr: "PARTIE SUPERIEURE - la section du haut." },
  { word: "下部", meanings: ["Partie inferieure"], readings: ["かぶ"], mnemonicFr: "PARTIE INFERIEURE - la section du bas." },
  { word: "前部", meanings: ["Partie avant"], readings: ["ぜんぶ"], mnemonicFr: "PARTIE AVANT - la section de devant." },
  { word: "後部", meanings: ["Partie arriere"], readings: ["こうぶ"], mnemonicFr: "PARTIE ARRIERE - la section de derriere." },
  { word: "上限", meanings: ["Limite superieure"], readings: ["じょうげん"], mnemonicFr: "LIMITE SUPERIEURE - la borne du haut." },
  { word: "下限", meanings: ["Limite inferieure"], readings: ["かげん"], mnemonicFr: "LIMITE INFERIEURE - la borne du bas." },
  { word: "上り", meanings: ["Montee"], readings: ["のぼり"], mnemonicFr: "MONTEE - l'action de monter." },
  { word: "下り", meanings: ["Descente"], readings: ["くだり"], mnemonicFr: "DESCENTE - l'action de descendre." },
];

async function main() {
  console.log("=== SEED VOCAB BATCH 16: Position/Size/Quantity Kanji Compounds ===\n");

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
    ...vocabPart7
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
  console.log(`\n=== RESULTS ===`);
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
