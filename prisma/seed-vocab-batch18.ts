import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary Batch 18: Pairs, Opposites, and Related Words
// Focus on JLPT N5-N3 common kanji

const vocabPairsAndOpposites = [
  // === VERB PAIRS: Enter/Exit ===
  { word: "入る", meanings: ["Entrer"], readings: ["はいる"], mnemonicFr: "ENTRER - passer de l'exterieur vers l'interieur.", targetKanji: ["入"] },
  { word: "出る", meanings: ["Sortir"], readings: ["でる"], mnemonicFr: "SORTIR - passer de l'interieur vers l'exterieur.", targetKanji: ["出"] },
  { word: "入口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - la bouche par laquelle on entre.", targetKanji: ["入", "口"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - la bouche par laquelle on sort.", targetKanji: ["出", "口"] },

  // === VERB PAIRS: Go up/Go down ===
  { word: "上がる", meanings: ["Monter", "S'elever"], readings: ["あがる"], mnemonicFr: "MONTER - aller vers le haut.", targetKanji: ["上"] },
  { word: "下がる", meanings: ["Descendre", "Baisser"], readings: ["さがる"], mnemonicFr: "DESCENDRE - aller vers le bas.", targetKanji: ["下"] },
  { word: "上げる", meanings: ["Lever", "Augmenter"], readings: ["あげる"], mnemonicFr: "LEVER - faire monter quelque chose.", targetKanji: ["上"] },
  { word: "下げる", meanings: ["Baisser", "Diminuer"], readings: ["さげる"], mnemonicFr: "BAISSER - faire descendre quelque chose.", targetKanji: ["下"] },

  // === VERB PAIRS: Increase/Decrease ===
  { word: "増える", meanings: ["Augmenter", "S'accroitre"], readings: ["ふえる"], mnemonicFr: "AUGMENTER - devenir plus nombreux.", targetKanji: ["増"] },
  { word: "減る", meanings: ["Diminuer", "Decroitre"], readings: ["へる"], mnemonicFr: "DIMINUER - devenir moins nombreux.", targetKanji: ["減"] },
  { word: "増加", meanings: ["Augmentation", "Croissance"], readings: ["ぞうか"], mnemonicFr: "AUGMENTATION - processus d'accroissement.", targetKanji: ["増", "加"] },
  { word: "減少", meanings: ["Diminution", "Baisse"], readings: ["げんしょう"], mnemonicFr: "DIMINUTION - processus de decroissance.", targetKanji: ["減", "少"] },

  // === VERB PAIRS: Open/Close ===
  { word: "開く", meanings: ["Ouvrir"], readings: ["あく"], mnemonicFr: "OUVRIR - rendre accessible.", targetKanji: ["開"] },
  { word: "閉まる", meanings: ["Se fermer"], readings: ["しまる"], mnemonicFr: "SE FERMER - devenir inaccessible.", targetKanji: ["閉"] },
  { word: "開ける", meanings: ["Ouvrir (transitif)"], readings: ["あける"], mnemonicFr: "OUVRIR - faire en sorte que quelque chose soit ouvert.", targetKanji: ["開"] },
  { word: "閉める", meanings: ["Fermer (transitif)"], readings: ["しめる"], mnemonicFr: "FERMER - faire en sorte que quelque chose soit ferme.", targetKanji: ["閉"] },

  // === VERB PAIRS: Start/End ===
  { word: "始める", meanings: ["Commencer (transitif)"], readings: ["はじめる"], mnemonicFr: "COMMENCER - donner le depart a quelque chose.", targetKanji: ["始"] },
  { word: "終わる", meanings: ["Finir", "Se terminer"], readings: ["おわる"], mnemonicFr: "FINIR - arriver a son terme.", targetKanji: ["終"] },
  { word: "始まる", meanings: ["Commencer (intransitif)"], readings: ["はじまる"], mnemonicFr: "COMMENCER - debuter naturellement.", targetKanji: ["始"] },
  { word: "終える", meanings: ["Terminer (transitif)"], readings: ["おえる"], mnemonicFr: "TERMINER - mettre fin a quelque chose.", targetKanji: ["終"] },

  // === VERB PAIRS: Wake/Sleep ===
  { word: "起きる", meanings: ["Se lever", "Se reveiller"], readings: ["おきる"], mnemonicFr: "SE LEVER - sortir du sommeil.", targetKanji: ["起"] },
  { word: "寝る", meanings: ["Dormir", "Se coucher"], readings: ["ねる"], mnemonicFr: "DORMIR - etre dans le sommeil.", targetKanji: ["寝"] },
  { word: "起こす", meanings: ["Reveiller", "Provoquer"], readings: ["おこす"], mnemonicFr: "REVEILLER - faire sortir quelqu'un du sommeil.", targetKanji: ["起"] },
  { word: "寝かせる", meanings: ["Coucher", "Faire dormir"], readings: ["ねかせる"], mnemonicFr: "COUCHER - mettre quelqu'un au lit.", targetKanji: ["寝"] },

  // === VERB PAIRS: Buy/Sell ===
  { word: "買う", meanings: ["Acheter"], readings: ["かう"], mnemonicFr: "ACHETER - acquerir en payant.", targetKanji: ["買"] },
  { word: "売る", meanings: ["Vendre"], readings: ["うる"], mnemonicFr: "VENDRE - ceder contre de l'argent.", targetKanji: ["売"] },
  { word: "買い物", meanings: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "COURSES - l'action d'acheter des choses.", targetKanji: ["買", "物"] },
  { word: "売り場", meanings: ["Rayon", "Point de vente"], readings: ["うりば"], mnemonicFr: "RAYON - endroit ou l'on vend.", targetKanji: ["売", "場"] },

  // === VERB PAIRS: Teach/Learn ===
  { word: "教える", meanings: ["Enseigner", "Apprendre a"], readings: ["おしえる"], mnemonicFr: "ENSEIGNER - transmettre des connaissances.", targetKanji: ["教"] },
  { word: "学ぶ", meanings: ["Etudier", "Apprendre"], readings: ["まなぶ"], mnemonicFr: "APPRENDRE - acquerir des connaissances.", targetKanji: ["学"] },
  { word: "教育", meanings: ["Education"], readings: ["きょういく"], mnemonicFr: "EDUCATION - processus d'enseignement.", targetKanji: ["教", "育"] },
  { word: "学習", meanings: ["Apprentissage", "Etude"], readings: ["がくしゅう"], mnemonicFr: "APPRENTISSAGE - processus d'etude.", targetKanji: ["学", "習"] },

  // === VERB PAIRS: Lend/Borrow ===
  { word: "貸す", meanings: ["Preter"], readings: ["かす"], mnemonicFr: "PRETER - donner temporairement.", targetKanji: ["貸"] },
  { word: "借りる", meanings: ["Emprunter"], readings: ["かりる"], mnemonicFr: "EMPRUNTER - recevoir temporairement.", targetKanji: ["借"] },
  { word: "貸出", meanings: ["Pret"], readings: ["かしだし"], mnemonicFr: "PRET - action de preter.", targetKanji: ["貸", "出"] },
  { word: "借金", meanings: ["Dette", "Emprunt"], readings: ["しゃっきん"], mnemonicFr: "DETTE - argent emprunte.", targetKanji: ["借", "金"] },

  // === VERB PAIRS: Win/Lose ===
  { word: "勝つ", meanings: ["Gagner", "Vaincre"], readings: ["かつ"], mnemonicFr: "GAGNER - remporter la victoire.", targetKanji: ["勝"] },
  { word: "負ける", meanings: ["Perdre", "Etre vaincu"], readings: ["まける"], mnemonicFr: "PERDRE - subir une defaite.", targetKanji: ["負"] },
  { word: "勝利", meanings: ["Victoire"], readings: ["しょうり"], mnemonicFr: "VICTOIRE - fait de gagner.", targetKanji: ["勝", "利"] },
  { word: "敗北", meanings: ["Defaite"], readings: ["はいぼく"], mnemonicFr: "DEFAITE - fait de perdre.", targetKanji: ["敗", "北"] },

  // === VERB PAIRS: Born/Die ===
  { word: "生まれる", meanings: ["Naitre"], readings: ["うまれる"], mnemonicFr: "NAITRE - venir au monde.", targetKanji: ["生"] },
  { word: "死ぬ", meanings: ["Mourir"], readings: ["しぬ"], mnemonicFr: "MOURIR - cesser de vivre.", targetKanji: ["死"] },
  { word: "生年", meanings: ["Annee de naissance"], readings: ["せいねん"], mnemonicFr: "ANNEE DE NAISSANCE - l'annee ou l'on est ne.", targetKanji: ["生", "年"] },
  { word: "死亡", meanings: ["Deces", "Mort"], readings: ["しぼう"], mnemonicFr: "DECES - fait de mourir.", targetKanji: ["死", "亡"] },

  // === ADJECTIVE PAIRS: Bright/Dark ===
  { word: "明るい", meanings: ["Clair", "Lumineux"], readings: ["あかるい"], mnemonicFr: "CLAIR - qui a beaucoup de lumiere.", targetKanji: ["明"] },
  { word: "暗い", meanings: ["Sombre", "Obscur"], readings: ["くらい"], mnemonicFr: "SOMBRE - qui manque de lumiere.", targetKanji: ["暗"] },
  { word: "明暗", meanings: ["Clarte et obscurite", "Contraste"], readings: ["めいあん"], mnemonicFr: "CONTRASTE - la difference entre lumiere et ombre.", targetKanji: ["明", "暗"] },

  // === ADJECTIVE PAIRS: Strong/Weak ===
  { word: "強い", meanings: ["Fort", "Puissant"], readings: ["つよい"], mnemonicFr: "FORT - qui a beaucoup de force.", targetKanji: ["強"] },
  { word: "弱い", meanings: ["Faible"], readings: ["よわい"], mnemonicFr: "FAIBLE - qui manque de force.", targetKanji: ["弱"] },
  { word: "強化", meanings: ["Renforcement"], readings: ["きょうか"], mnemonicFr: "RENFORCEMENT - action de rendre plus fort.", targetKanji: ["強", "化"] },
  { word: "弱点", meanings: ["Point faible"], readings: ["じゃくてん"], mnemonicFr: "POINT FAIBLE - endroit vulnerable.", targetKanji: ["弱", "点"] },

  // === ADJECTIVE PAIRS: Fast/Slow ===
  { word: "速い", meanings: ["Rapide", "Vite"], readings: ["はやい"], mnemonicFr: "RAPIDE - qui se deplace vite.", targetKanji: ["速"] },
  { word: "遅い", meanings: ["Lent", "En retard"], readings: ["おそい"], mnemonicFr: "LENT - qui se deplace doucement.", targetKanji: ["遅"] },
  { word: "速度", meanings: ["Vitesse"], readings: ["そくど"], mnemonicFr: "VITESSE - mesure de la rapidite.", targetKanji: ["速", "度"] },
  { word: "遅刻", meanings: ["Retard"], readings: ["ちこく"], mnemonicFr: "RETARD - arriver apres l'heure prevue.", targetKanji: ["遅", "刻"] },

  // === ADJECTIVE PAIRS: Correct/Wrong ===
  { word: "正しい", meanings: ["Correct", "Juste"], readings: ["ただしい"], mnemonicFr: "CORRECT - qui est conforme a la verite.", targetKanji: ["正"] },
  { word: "間違い", meanings: ["Erreur", "Faute"], readings: ["まちがい"], mnemonicFr: "ERREUR - ce qui n'est pas correct.", targetKanji: ["間", "違"] },
  { word: "正解", meanings: ["Bonne reponse"], readings: ["せいかい"], mnemonicFr: "BONNE REPONSE - la reponse correcte.", targetKanji: ["正", "解"] },
  { word: "間違える", meanings: ["Se tromper"], readings: ["まちがえる"], mnemonicFr: "SE TROMPER - faire une erreur.", targetKanji: ["間", "違"] },

  // === ADJECTIVE PAIRS: Same/Different ===
  { word: "同じ", meanings: ["Meme", "Identique"], readings: ["おなじ"], mnemonicFr: "MEME - qui est pareil.", targetKanji: ["同"] },
  { word: "違う", meanings: ["Different", "Se tromper"], readings: ["ちがう"], mnemonicFr: "DIFFERENT - qui n'est pas pareil.", targetKanji: ["違"] },
  { word: "同一", meanings: ["Identique"], readings: ["どういつ"], mnemonicFr: "IDENTIQUE - exactement le meme.", targetKanji: ["同", "一"] },
  { word: "違反", meanings: ["Infraction", "Violation"], readings: ["いはん"], mnemonicFr: "INFRACTION - aller contre les regles.", targetKanji: ["違", "反"] },

  // === NOUN PAIRS: All/Part ===
  { word: "全部", meanings: ["Tout", "Totalite"], readings: ["ぜんぶ"], mnemonicFr: "TOUT - l'ensemble complet.", targetKanji: ["全", "部"] },
  { word: "一部", meanings: ["Une partie"], readings: ["いちぶ"], mnemonicFr: "UNE PARTIE - une portion de l'ensemble.", targetKanji: ["一", "部"] },
  { word: "全体", meanings: ["Ensemble", "Totalite"], readings: ["ぜんたい"], mnemonicFr: "ENSEMBLE - le tout considere.", targetKanji: ["全", "体"] },
  { word: "部分", meanings: ["Partie", "Portion"], readings: ["ぶぶん"], mnemonicFr: "PARTIE - element d'un ensemble.", targetKanji: ["部", "分"] },

  // === NOUN PAIRS: Enrollment/Graduation ===
  { word: "入学", meanings: ["Entree a l'ecole"], readings: ["にゅうがく"], mnemonicFr: "ENTREE A L'ECOLE - commencer ses etudes.", targetKanji: ["入", "学"] },
  { word: "卒業", meanings: ["Diplome", "Fin des etudes"], readings: ["そつぎょう"], mnemonicFr: "DIPLOME - terminer ses etudes.", targetKanji: ["卒", "業"] },
  { word: "入学式", meanings: ["Ceremonie de rentree"], readings: ["にゅうがくしき"], mnemonicFr: "CEREMONIE DE RENTREE - fete pour les nouveaux eleves.", targetKanji: ["入", "学", "式"] },
  { word: "卒業式", meanings: ["Ceremonie de remise des diplomes"], readings: ["そつぎょうしき"], mnemonicFr: "CEREMONIE DE DIPLOME - fete pour les diplomes.", targetKanji: ["卒", "業", "式"] },

  // === NOUN PAIRS: Departure/Arrival ===
  { word: "出発", meanings: ["Depart"], readings: ["しゅっぱつ"], mnemonicFr: "DEPART - commencer un voyage.", targetKanji: ["出", "発"] },
  { word: "到着", meanings: ["Arrivee"], readings: ["とうちゃく"], mnemonicFr: "ARRIVEE - atteindre sa destination.", targetKanji: ["到", "着"] },
  { word: "出発点", meanings: ["Point de depart"], readings: ["しゅっぱつてん"], mnemonicFr: "POINT DE DEPART - lieu d'ou l'on part.", targetKanji: ["出", "発", "点"] },
  { word: "到着時間", meanings: ["Heure d'arrivee"], readings: ["とうちゃくじかん"], mnemonicFr: "HEURE D'ARRIVEE - moment ou l'on arrive.", targetKanji: ["到", "着", "時", "間"] },

  // === NOUN PAIRS: Question/Answer ===
  { word: "質問", meanings: ["Question"], readings: ["しつもん"], mnemonicFr: "QUESTION - demande d'information.", targetKanji: ["質", "問"] },
  { word: "回答", meanings: ["Reponse"], readings: ["かいとう"], mnemonicFr: "REPONSE - information donnee.", targetKanji: ["回", "答"] },
  { word: "質疑", meanings: ["Questions et debats"], readings: ["しつぎ"], mnemonicFr: "QUESTIONS ET DEBATS - echange de questions.", targetKanji: ["質", "疑"] },
  { word: "答案", meanings: ["Copie d'examen"], readings: ["とうあん"], mnemonicFr: "COPIE D'EXAMEN - feuille avec les reponses.", targetKanji: ["答", "案"] },

  // === NOUN PAIRS: Problem/Solution ===
  { word: "問題", meanings: ["Probleme", "Question"], readings: ["もんだい"], mnemonicFr: "PROBLEME - difficulte a resoudre.", targetKanji: ["問", "題"] },
  { word: "解決", meanings: ["Solution", "Resolution"], readings: ["かいけつ"], mnemonicFr: "SOLUTION - reponse a un probleme.", targetKanji: ["解", "決"] },
  { word: "問題点", meanings: ["Point problematique"], readings: ["もんだいてん"], mnemonicFr: "POINT PROBLEMATIQUE - aspect qui pose probleme.", targetKanji: ["問", "題", "点"] },
  { word: "解答", meanings: ["Reponse", "Solution"], readings: ["かいとう"], mnemonicFr: "REPONSE - solution a une question.", targetKanji: ["解", "答"] },

  // === NOUN PAIRS: Success/Failure ===
  { word: "成功", meanings: ["Succes", "Reussite"], readings: ["せいこう"], mnemonicFr: "SUCCES - atteinte de son objectif.", targetKanji: ["成", "功"] },
  { word: "失敗", meanings: ["Echec"], readings: ["しっぱい"], mnemonicFr: "ECHEC - ne pas atteindre son objectif.", targetKanji: ["失", "敗"] },
  { word: "成功者", meanings: ["Personne qui a reussi"], readings: ["せいこうしゃ"], mnemonicFr: "PERSONNE QUI A REUSSI - quelqu'un qui a du succes.", targetKanji: ["成", "功", "者"] },
  { word: "失敗作", meanings: ["Echec", "Ratage"], readings: ["しっぱいさく"], mnemonicFr: "RATAGE - oeuvre qui n'a pas reussi.", targetKanji: ["失", "敗", "作"] },

  // === NOUN PAIRS: Progress/Retreat ===
  { word: "進歩", meanings: ["Progres"], readings: ["しんぽ"], mnemonicFr: "PROGRES - avancement vers le mieux.", targetKanji: ["進", "歩"] },
  { word: "後退", meanings: ["Recul", "Regression"], readings: ["こうたい"], mnemonicFr: "RECUL - mouvement vers l'arriere.", targetKanji: ["後", "退"] },
  { word: "前進", meanings: ["Avancee", "Progression"], readings: ["ぜんしん"], mnemonicFr: "AVANCEE - mouvement vers l'avant.", targetKanji: ["前", "進"] },
  { word: "退歩", meanings: ["Regression"], readings: ["たいほ"], mnemonicFr: "REGRESSION - perte de progres.", targetKanji: ["退", "歩"] },

  // === NOUN PAIRS: Import/Export ===
  { word: "輸入", meanings: ["Importation"], readings: ["ゆにゅう"], mnemonicFr: "IMPORTATION - faire entrer des marchandises.", targetKanji: ["輸", "入"] },
  { word: "輸出", meanings: ["Exportation"], readings: ["ゆしゅつ"], mnemonicFr: "EXPORTATION - faire sortir des marchandises.", targetKanji: ["輸", "出"] },
  { word: "輸入品", meanings: ["Produit importe"], readings: ["ゆにゅうひん"], mnemonicFr: "PRODUIT IMPORTE - article venant de l'etranger.", targetKanji: ["輸", "入", "品"] },
  { word: "輸出国", meanings: ["Pays exportateur"], readings: ["ゆしゅつこく"], mnemonicFr: "PAYS EXPORTATEUR - nation qui exporte.", targetKanji: ["輸", "出", "国"] },

  // === NOUN PAIRS: Public/Private ===
  { word: "公共", meanings: ["Public", "Commun"], readings: ["こうきょう"], mnemonicFr: "PUBLIC - qui appartient a tous.", targetKanji: ["公", "共"] },
  { word: "私立", meanings: ["Prive"], readings: ["しりつ"], mnemonicFr: "PRIVE - qui appartient a un particulier.", targetKanji: ["私", "立"] },
  { word: "公立", meanings: ["Public (etablissement)"], readings: ["こうりつ"], mnemonicFr: "PUBLIC - gere par l'Etat.", targetKanji: ["公", "立"] },
  { word: "私有", meanings: ["Propriete privee"], readings: ["しゆう"], mnemonicFr: "PROPRIETE PRIVEE - appartenant a un individu.", targetKanji: ["私", "有"] },

  // === NOUN PAIRS: Supply/Demand ===
  { word: "供給", meanings: ["Offre", "Approvisionnement"], readings: ["きょうきゅう"], mnemonicFr: "OFFRE - ce qui est disponible.", targetKanji: ["供", "給"] },
  { word: "需要", meanings: ["Demande"], readings: ["じゅよう"], mnemonicFr: "DEMANDE - ce qui est desire.", targetKanji: ["需", "要"] },

  // === NOUN PAIRS: Advantage/Disadvantage ===
  { word: "利点", meanings: ["Avantage"], readings: ["りてん"], mnemonicFr: "AVANTAGE - point positif.", targetKanji: ["利", "点"] },
  { word: "欠点", meanings: ["Defaut", "Inconvenient"], readings: ["けってん"], mnemonicFr: "DEFAUT - point negatif.", targetKanji: ["欠", "点"] },
  { word: "利益", meanings: ["Profit", "Benefice"], readings: ["りえき"], mnemonicFr: "PROFIT - gain financier.", targetKanji: ["利", "益"] },
  { word: "損害", meanings: ["Dommage", "Prejudice"], readings: ["そんがい"], mnemonicFr: "DOMMAGE - perte subie.", targetKanji: ["損", "害"] },

  // === VERB PAIRS: Give/Receive ===
  { word: "与える", meanings: ["Donner", "Accorder"], readings: ["あたえる"], mnemonicFr: "DONNER - transmettre quelque chose.", targetKanji: ["与"] },
  { word: "受ける", meanings: ["Recevoir", "Subir"], readings: ["うける"], mnemonicFr: "RECEVOIR - accepter ce qui est donne.", targetKanji: ["受"] },
  { word: "受付", meanings: ["Reception", "Accueil"], readings: ["うけつけ"], mnemonicFr: "RECEPTION - lieu ou l'on recoit les visiteurs.", targetKanji: ["受", "付"] },

  // === VERB PAIRS: Go/Come ===
  { word: "行く", meanings: ["Aller"], readings: ["いく"], mnemonicFr: "ALLER - se deplacer vers un lieu.", targetKanji: ["行"] },
  { word: "来る", meanings: ["Venir"], readings: ["くる"], mnemonicFr: "VENIR - se deplacer vers ici.", targetKanji: ["来"] },
  { word: "行き", meanings: ["Aller (trajet)"], readings: ["いき"], mnemonicFr: "ALLER - direction vers un lieu.", targetKanji: ["行"] },
  { word: "帰り", meanings: ["Retour"], readings: ["かえり"], mnemonicFr: "RETOUR - revenir vers le point de depart.", targetKanji: ["帰"] },

  // === NOUN PAIRS: Inside/Outside ===
  { word: "内部", meanings: ["Interieur"], readings: ["ないぶ"], mnemonicFr: "INTERIEUR - ce qui est dedans.", targetKanji: ["内", "部"] },
  { word: "外部", meanings: ["Exterieur"], readings: ["がいぶ"], mnemonicFr: "EXTERIEUR - ce qui est dehors.", targetKanji: ["外", "部"] },
  { word: "国内", meanings: ["Domestique", "National"], readings: ["こくない"], mnemonicFr: "DOMESTIQUE - a l'interieur du pays.", targetKanji: ["国", "内"] },
  { word: "国外", meanings: ["Etranger", "A l'exterieur"], readings: ["こくがい"], mnemonicFr: "ETRANGER - en dehors du pays.", targetKanji: ["国", "外"] },

  // === ADJECTIVE PAIRS: Long/Short ===
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - qui a une grande longueur.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - qui a une petite longueur.", targetKanji: ["短"] },
  { word: "長所", meanings: ["Point fort", "Qualite"], readings: ["ちょうしょ"], mnemonicFr: "POINT FORT - aspect positif.", targetKanji: ["長", "所"] },
  { word: "短所", meanings: ["Point faible", "Defaut"], readings: ["たんしょ"], mnemonicFr: "POINT FAIBLE - aspect negatif.", targetKanji: ["短", "所"] },

  // === ADJECTIVE PAIRS: Hot/Cold ===
  { word: "熱い", meanings: ["Chaud (objet)"], readings: ["あつい"], mnemonicFr: "CHAUD - qui a une haute temperature.", targetKanji: ["熱"] },
  { word: "冷たい", meanings: ["Froid (objet)"], readings: ["つめたい"], mnemonicFr: "FROID - qui a une basse temperature.", targetKanji: ["冷"] },
  { word: "暑い", meanings: ["Chaud (climat)"], readings: ["あつい"], mnemonicFr: "CHAUD - temps ou il fait chaud.", targetKanji: ["暑"] },
  { word: "寒い", meanings: ["Froid (climat)"], readings: ["さむい"], mnemonicFr: "FROID - temps ou il fait froid.", targetKanji: ["寒"] },

  // === ADJECTIVE PAIRS: Wide/Narrow ===
  { word: "広い", meanings: ["Large", "Spacieux"], readings: ["ひろい"], mnemonicFr: "LARGE - qui a beaucoup d'espace.", targetKanji: ["広"] },
  { word: "狭い", meanings: ["Etroit"], readings: ["せまい"], mnemonicFr: "ETROIT - qui manque d'espace.", targetKanji: ["狭"] },
  { word: "広場", meanings: ["Place", "Esplanade"], readings: ["ひろば"], mnemonicFr: "PLACE - grand espace ouvert.", targetKanji: ["広", "場"] },

  // === ADJECTIVE PAIRS: Heavy/Light ===
  { word: "重い", meanings: ["Lourd"], readings: ["おもい"], mnemonicFr: "LOURD - qui a beaucoup de poids.", targetKanji: ["重"] },
  { word: "軽い", meanings: ["Leger"], readings: ["かるい"], mnemonicFr: "LEGER - qui a peu de poids.", targetKanji: ["軽"] },
  { word: "重大", meanings: ["Grave", "Important"], readings: ["じゅうだい"], mnemonicFr: "GRAVE - tres important.", targetKanji: ["重", "大"] },
  { word: "軽減", meanings: ["Reduction", "Allegement"], readings: ["けいげん"], mnemonicFr: "REDUCTION - rendre plus leger.", targetKanji: ["軽", "減"] },

  // === NOUN PAIRS: Safety/Danger ===
  { word: "安全", meanings: ["Securite", "Surete"], readings: ["あんぜん"], mnemonicFr: "SECURITE - absence de danger.", targetKanji: ["安", "全"] },
  { word: "危険", meanings: ["Danger", "Risque"], readings: ["きけん"], mnemonicFr: "DANGER - possibilite de mal.", targetKanji: ["危", "険"] },
  { word: "安心", meanings: ["Tranquillite d'esprit"], readings: ["あんしん"], mnemonicFr: "TRANQUILLITE - sentiment de securite.", targetKanji: ["安", "心"] },
  { word: "危機", meanings: ["Crise"], readings: ["きき"], mnemonicFr: "CRISE - situation dangereuse.", targetKanji: ["危", "機"] },

  // === NOUN PAIRS: East/West ===
  { word: "東", meanings: ["Est"], readings: ["ひがし"], mnemonicFr: "EST - direction du lever du soleil.", targetKanji: ["東"] },
  { word: "西", meanings: ["Ouest"], readings: ["にし"], mnemonicFr: "OUEST - direction du coucher du soleil.", targetKanji: ["西"] },
  { word: "東西", meanings: ["Est et ouest"], readings: ["とうざい"], mnemonicFr: "EST ET OUEST - les deux directions.", targetKanji: ["東", "西"] },

  // === NOUN PAIRS: North/South ===
  { word: "北", meanings: ["Nord"], readings: ["きた"], mnemonicFr: "NORD - direction vers le pole nord.", targetKanji: ["北"] },
  { word: "南", meanings: ["Sud"], readings: ["みなみ"], mnemonicFr: "SUD - direction vers le pole sud.", targetKanji: ["南"] },
  { word: "南北", meanings: ["Nord et sud"], readings: ["なんぼく"], mnemonicFr: "NORD ET SUD - les deux directions.", targetKanji: ["南", "北"] },

  // === VERB PAIRS: Remember/Forget ===
  { word: "覚える", meanings: ["Memoriser", "Se souvenir"], readings: ["おぼえる"], mnemonicFr: "MEMORISER - garder en memoire.", targetKanji: ["覚"] },
  { word: "忘れる", meanings: ["Oublier"], readings: ["わすれる"], mnemonicFr: "OUBLIER - perdre de la memoire.", targetKanji: ["忘"] },
  { word: "記憶", meanings: ["Memoire", "Souvenir"], readings: ["きおく"], mnemonicFr: "MEMOIRE - capacite de se souvenir.", targetKanji: ["記", "憶"] },

  // === NOUN PAIRS: Past/Future ===
  { word: "過去", meanings: ["Passe"], readings: ["かこ"], mnemonicFr: "PASSE - temps revolu.", targetKanji: ["過", "去"] },
  { word: "未来", meanings: ["Futur", "Avenir"], readings: ["みらい"], mnemonicFr: "FUTUR - temps a venir.", targetKanji: ["未", "来"] },
  { word: "将来", meanings: ["Avenir"], readings: ["しょうらい"], mnemonicFr: "AVENIR - temps qui va venir.", targetKanji: ["将", "来"] },

  // === NOUN PAIRS: Beginning/End ===
  { word: "最初", meanings: ["Debut", "Premier"], readings: ["さいしょ"], mnemonicFr: "DEBUT - le commencement.", targetKanji: ["最", "初"] },
  { word: "最後", meanings: ["Fin", "Dernier"], readings: ["さいご"], mnemonicFr: "FIN - la conclusion.", targetKanji: ["最", "後"] },
  { word: "初め", meanings: ["Debut", "Commencement"], readings: ["はじめ"], mnemonicFr: "DEBUT - le point de depart.", targetKanji: ["初"] },
  { word: "終わり", meanings: ["Fin"], readings: ["おわり"], mnemonicFr: "FIN - le point d'arrivee.", targetKanji: ["終"] },

  // === VERB PAIRS: Push/Pull ===
  { word: "押す", meanings: ["Pousser", "Appuyer"], readings: ["おす"], mnemonicFr: "POUSSER - exercer une force vers l'avant.", targetKanji: ["押"] },
  { word: "引く", meanings: ["Tirer"], readings: ["ひく"], mnemonicFr: "TIRER - exercer une force vers soi.", targetKanji: ["引"] },
  { word: "引力", meanings: ["Gravite", "Attraction"], readings: ["いんりょく"], mnemonicFr: "GRAVITE - force qui attire.", targetKanji: ["引", "力"] },

  // === VERB PAIRS: Send/Receive ===
  { word: "送る", meanings: ["Envoyer"], readings: ["おくる"], mnemonicFr: "ENVOYER - faire parvenir.", targetKanji: ["送"] },
  { word: "届く", meanings: ["Arriver", "Parvenir"], readings: ["とどく"], mnemonicFr: "ARRIVER - atteindre sa destination.", targetKanji: ["届"] },
  { word: "送信", meanings: ["Envoi", "Transmission"], readings: ["そうしん"], mnemonicFr: "ENVOI - action d'envoyer un message.", targetKanji: ["送", "信"] },
  { word: "受信", meanings: ["Reception"], readings: ["じゅしん"], mnemonicFr: "RECEPTION - action de recevoir un message.", targetKanji: ["受", "信"] },
];

async function main() {
  console.log("=== ADDING VOCABULARY BATCH 18: PAIRS AND OPPOSITES ===\n");

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

  for (const vocab of vocabPairsAndOpposites) {
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
      console.log(`Added: ${vocab.word} (${vocab.meanings.join(", ")})`);
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
