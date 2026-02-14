import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary Batch 8: Technology, Modern Life, Internet, Communication
// For French speakers learning Japanese - JLPT N5-N3 kanji

const vocabPart1 = [
  // === COMMUNICATION (電話, 通信, etc.) ===
  { word: "電話", meanings: ["Telephone"], readings: ["でんわ"], mnemonicFr: "TELEPHONE - l'eclair (電) de la parole (話), communication instantanee.", targetKanji: ["電", "話"] },
  { word: "電報", meanings: ["Telegramme"], readings: ["でんぽう"], mnemonicFr: "TELEGRAMME - message electrique envoye au loin.", targetKanji: ["電", "報"] },
  { word: "通話", meanings: ["Appel telephonique", "Conversation"], readings: ["つうわ"], mnemonicFr: "APPEL - la parole qui passe a travers.", targetKanji: ["通", "話"] },
  { word: "通信", meanings: ["Communication", "Correspondance"], readings: ["つうしん"], mnemonicFr: "COMMUNICATION - transmettre une lettre ou un message.", targetKanji: ["通", "信"] },
  { word: "受信", meanings: ["Reception (signal)"], readings: ["じゅしん"], mnemonicFr: "RECEPTION - recevoir un message ou signal.", targetKanji: ["受", "信"] },
  { word: "発信", meanings: ["Emission", "Envoi (message)"], readings: ["はっしん"], mnemonicFr: "EMISSION - envoyer un message vers l'exterieur.", targetKanji: ["発", "信"] },
  { word: "送信", meanings: ["Transmission", "Envoi"], readings: ["そうしん"], mnemonicFr: "TRANSMISSION - envoyer des donnees.", targetKanji: ["送", "信"] },
  { word: "着信", meanings: ["Appel entrant"], readings: ["ちゃくしん"], mnemonicFr: "APPEL ENTRANT - un message qui arrive.", targetKanji: ["着", "信"] },
  { word: "返信", meanings: ["Reponse", "Repondre"], readings: ["へんしん"], mnemonicFr: "REPONSE - renvoyer un message.", targetKanji: ["返", "信"] },
  { word: "信号", meanings: ["Signal", "Feu de signalisation"], readings: ["しんごう"], mnemonicFr: "SIGNAL - un signe qui transmet une information.", targetKanji: ["信", "号"] },

  // === TECHNOLOGY - ELECTRICITY (電気, 電力, etc.) ===
  { word: "電気", meanings: ["Electricite"], readings: ["でんき"], mnemonicFr: "ELECTRICITE - l'energie de l'eclair.", targetKanji: ["電", "気"] },
  { word: "電力", meanings: ["Energie electrique"], readings: ["でんりょく"], mnemonicFr: "ENERGIE ELECTRIQUE - la puissance de l'electricite.", targetKanji: ["電", "力"] },
  { word: "電子", meanings: ["Electron", "Electronique"], readings: ["でんし"], mnemonicFr: "ELECTRON - la particule de l'electricite.", targetKanji: ["電", "子"] },
  { word: "電池", meanings: ["Pile", "Batterie"], readings: ["でんち"], mnemonicFr: "PILE - un reservoir d'electricite.", targetKanji: ["電", "池"] },
  { word: "充電", meanings: ["Recharge", "Charger"], readings: ["じゅうでん"], mnemonicFr: "RECHARGE - remplir d'electricite.", targetKanji: ["充", "電"] },
  { word: "停電", meanings: ["Coupure de courant"], readings: ["ていでん"], mnemonicFr: "COUPURE - l'electricite s'arrete.", targetKanji: ["停", "電"] },
  { word: "配電", meanings: ["Distribution electrique"], readings: ["はいでん"], mnemonicFr: "DISTRIBUTION - repartir l'electricite.", targetKanji: ["配", "電"] },
  { word: "発電", meanings: ["Production d'electricite"], readings: ["はつでん"], mnemonicFr: "PRODUCTION - generer de l'electricite.", targetKanji: ["発", "電"] },
  { word: "電線", meanings: ["Cable electrique"], readings: ["でんせん"], mnemonicFr: "CABLE - fil qui transporte l'electricite.", targetKanji: ["電", "線"] },
  { word: "電流", meanings: ["Courant electrique"], readings: ["でんりゅう"], mnemonicFr: "COURANT - flux d'electricite.", targetKanji: ["電", "流"] },

  // === INFORMATION AGE (情報, 通報, etc.) ===
  { word: "情報", meanings: ["Information"], readings: ["じょうほう"], mnemonicFr: "INFORMATION - rapport sur une situation.", targetKanji: ["情", "報"] },
  { word: "通報", meanings: ["Signalement", "Rapport"], readings: ["つうほう"], mnemonicFr: "SIGNALEMENT - transmettre un rapport.", targetKanji: ["通", "報"] },
  { word: "広報", meanings: ["Relations publiques", "Communication"], readings: ["こうほう"], mnemonicFr: "RELATIONS PUBLIQUES - diffuser largement.", targetKanji: ["広", "報"] },
  { word: "報道", meanings: ["Reportage", "Presse"], readings: ["ほうどう"], mnemonicFr: "REPORTAGE - voie de l'information.", targetKanji: ["報", "道"] },
  { word: "報告", meanings: ["Rapport", "Compte-rendu"], readings: ["ほうこく"], mnemonicFr: "RAPPORT - informer officiellement.", targetKanji: ["報", "告"] },
  { word: "速報", meanings: ["Flash info", "Derniere minute"], readings: ["そくほう"], mnemonicFr: "FLASH INFO - information rapide.", targetKanji: ["速", "報"] },
  { word: "予報", meanings: ["Prevision", "Meteo"], readings: ["よほう"], mnemonicFr: "PREVISION - information a l'avance.", targetKanji: ["予", "報"] },
  { word: "天気予報", meanings: ["Meteo", "Previsions meteo"], readings: ["てんきよほう"], mnemonicFr: "METEO - prevision du temps.", targetKanji: ["天", "気", "予", "報"] },
  { word: "新聞", meanings: ["Journal"], readings: ["しんぶん"], mnemonicFr: "JOURNAL - nouvelles ecrites.", targetKanji: ["新", "聞"] },
  { word: "記事", meanings: ["Article"], readings: ["きじ"], mnemonicFr: "ARTICLE - texte d'information.", targetKanji: ["記", "事"] },

  // === TRANSPORTATION (電車, 汽車, etc.) ===
  { word: "電車", meanings: ["Train electrique"], readings: ["でんしゃ"], mnemonicFr: "TRAIN - vehicule qui roule a l'electricite.", targetKanji: ["電", "車"] },
  { word: "汽車", meanings: ["Train a vapeur"], readings: ["きしゃ"], mnemonicFr: "TRAIN A VAPEUR - vehicule a vapeur d'eau.", targetKanji: ["汽", "車"] },
  { word: "自動車", meanings: ["Automobile", "Voiture"], readings: ["じどうしゃ"], mnemonicFr: "AUTOMOBILE - vehicule qui bouge tout seul.", targetKanji: ["自", "動", "車"] },
  { word: "自転車", meanings: ["Velo", "Bicyclette"], readings: ["じてんしゃ"], mnemonicFr: "VELO - vehicule qui tourne par soi-meme.", targetKanji: ["自", "転", "車"] },
  { word: "乗車", meanings: ["Embarquement", "Monter"], readings: ["じょうしゃ"], mnemonicFr: "EMBARQUEMENT - monter dans un vehicule.", targetKanji: ["乗", "車"] },
  { word: "下車", meanings: ["Descente", "Descendre"], readings: ["げしゃ"], mnemonicFr: "DESCENTE - descendre d'un vehicule.", targetKanji: ["下", "車"] },
  { word: "発車", meanings: ["Depart (vehicule)"], readings: ["はっしゃ"], mnemonicFr: "DEPART - le vehicule part.", targetKanji: ["発", "車"] },
  { word: "停車", meanings: ["Arret (vehicule)"], readings: ["ていしゃ"], mnemonicFr: "ARRET - le vehicule s'arrete.", targetKanji: ["停", "車"] },
  { word: "車両", meanings: ["Wagon", "Vehicule"], readings: ["しゃりょう"], mnemonicFr: "WAGON - unite de vehicule.", targetKanji: ["車", "両"] },
  { word: "終電", meanings: ["Dernier train"], readings: ["しゅうでん"], mnemonicFr: "DERNIER TRAIN - le train de fin de service.", targetKanji: ["終", "電"] },
];

const vocabPart2 = [
  // === WORK & COMMUTE (通勤, 通学, etc.) ===
  { word: "通勤", meanings: ["Trajet domicile-travail"], readings: ["つうきん"], mnemonicFr: "TRAJET - aller au travail regulierement.", targetKanji: ["通", "勤"] },
  { word: "通学", meanings: ["Trajet domicile-ecole"], readings: ["つうがく"], mnemonicFr: "TRAJET SCOLAIRE - aller a l'ecole regulierement.", targetKanji: ["通", "学"] },
  { word: "通行", meanings: ["Passage", "Circulation"], readings: ["つうこう"], mnemonicFr: "PASSAGE - aller et venir.", targetKanji: ["通", "行"] },
  { word: "交通", meanings: ["Circulation", "Transport"], readings: ["こうつう"], mnemonicFr: "CIRCULATION - les echanges de passage.", targetKanji: ["交", "通"] },
  { word: "通過", meanings: ["Passage", "Transit"], readings: ["つうか"], mnemonicFr: "TRANSIT - passer a travers.", targetKanji: ["通", "過"] },
  { word: "通用", meanings: ["Valide", "En usage"], readings: ["つうよう"], mnemonicFr: "VALIDE - qui peut etre utilise.", targetKanji: ["通", "用"] },
  { word: "通常", meanings: ["Habituel", "Normal"], readings: ["つうじょう"], mnemonicFr: "HABITUEL - de maniere normale.", targetKanji: ["通", "常"] },
  { word: "普通", meanings: ["Ordinaire", "Normal"], readings: ["ふつう"], mnemonicFr: "NORMAL - comme d'habitude.", targetKanji: ["普", "通"] },
  { word: "共通", meanings: ["Commun", "Partage"], readings: ["きょうつう"], mnemonicFr: "COMMUN - partage par tous.", targetKanji: ["共", "通"] },
  { word: "流通", meanings: ["Distribution", "Circulation"], readings: ["りゅうつう"], mnemonicFr: "DISTRIBUTION - flux de marchandises.", targetKanji: ["流", "通"] },

  // === HOME ELECTRONICS (電灯, 暖房, etc.) ===
  { word: "電灯", meanings: ["Lampe electrique"], readings: ["でんとう"], mnemonicFr: "LAMPE - lumiere electrique.", targetKanji: ["電", "灯"] },
  { word: "電球", meanings: ["Ampoule"], readings: ["でんきゅう"], mnemonicFr: "AMPOULE - boule de lumiere electrique.", targetKanji: ["電", "球"] },
  { word: "照明", meanings: ["Eclairage"], readings: ["しょうめい"], mnemonicFr: "ECLAIRAGE - rendre lumineux.", targetKanji: ["照", "明"] },
  { word: "暖房", meanings: ["Chauffage"], readings: ["だんぼう"], mnemonicFr: "CHAUFFAGE - piece chaude.", targetKanji: ["暖", "房"] },
  { word: "冷房", meanings: ["Climatisation"], readings: ["れいぼう"], mnemonicFr: "CLIMATISATION - piece froide.", targetKanji: ["冷", "房"] },
  { word: "空調", meanings: ["Climatisation", "Air conditionne"], readings: ["くうちょう"], mnemonicFr: "CLIMATISATION - regler l'air.", targetKanji: ["空", "調"] },
  { word: "冷蔵庫", meanings: ["Refrigerateur"], readings: ["れいぞうこ"], mnemonicFr: "REFRIGERATEUR - boite pour garder froid.", targetKanji: ["冷", "蔵", "庫"] },
  { word: "洗濯機", meanings: ["Machine a laver"], readings: ["せんたくき"], mnemonicFr: "MACHINE A LAVER - appareil pour laver.", targetKanji: ["洗", "濯", "機"] },
  { word: "掃除機", meanings: ["Aspirateur"], readings: ["そうじき"], mnemonicFr: "ASPIRATEUR - machine pour nettoyer.", targetKanji: ["掃", "除", "機"] },
  { word: "電子レンジ", meanings: ["Micro-ondes"], readings: ["でんしレンジ"], mnemonicFr: "MICRO-ONDES - four electronique.", targetKanji: ["電", "子"] },

  // === ACTION WORDS - EMIT/SEND (発送, 発行, etc.) ===
  { word: "発送", meanings: ["Expedition", "Envoi"], readings: ["はっそう"], mnemonicFr: "EXPEDITION - envoyer au loin.", targetKanji: ["発", "送"] },
  { word: "発行", meanings: ["Publication", "Emission"], readings: ["はっこう"], mnemonicFr: "PUBLICATION - mettre en circulation.", targetKanji: ["発", "行"] },
  { word: "発売", meanings: ["Mise en vente"], readings: ["はつばい"], mnemonicFr: "MISE EN VENTE - commencer a vendre.", targetKanji: ["発", "売"] },
  { word: "発表", meanings: ["Annonce", "Presentation"], readings: ["はっぴょう"], mnemonicFr: "ANNONCE - presenter publiquement.", targetKanji: ["発", "表"] },
  { word: "発明", meanings: ["Invention"], readings: ["はつめい"], mnemonicFr: "INVENTION - creer quelque chose de nouveau.", targetKanji: ["発", "明"] },
  { word: "発見", meanings: ["Decouverte"], readings: ["はっけん"], mnemonicFr: "DECOUVERTE - trouver quelque chose.", targetKanji: ["発", "見"] },
  { word: "発展", meanings: ["Developpement"], readings: ["はってん"], mnemonicFr: "DEVELOPPEMENT - s'etendre et progresser.", targetKanji: ["発", "展"] },
  { word: "発達", meanings: ["Developpement", "Croissance"], readings: ["はったつ"], mnemonicFr: "CROISSANCE - atteindre un niveau superieur.", targetKanji: ["発", "達"] },
  { word: "開発", meanings: ["Developpement", "Mise au point"], readings: ["かいはつ"], mnemonicFr: "DEVELOPPEMENT - ouvrir et creer.", targetKanji: ["開", "発"] },
  { word: "出発", meanings: ["Depart"], readings: ["しゅっぱつ"], mnemonicFr: "DEPART - sortir et partir.", targetKanji: ["出", "発"] },

  // === EQUIPMENT (機械, 機能, etc.) ===
  { word: "機械", meanings: ["Machine", "Mecanique"], readings: ["きかい"], mnemonicFr: "MACHINE - appareil mecanique.", targetKanji: ["機", "械"] },
  { word: "機会", meanings: ["Occasion", "Opportunite"], readings: ["きかい"], mnemonicFr: "OCCASION - moment favorable.", targetKanji: ["機", "会"] },
  { word: "機能", meanings: ["Fonction", "Fonctionnalite"], readings: ["きのう"], mnemonicFr: "FONCTION - capacite d'un appareil.", targetKanji: ["機", "能"] },
  { word: "時計", meanings: ["Montre", "Horloge"], readings: ["とけい"], mnemonicFr: "MONTRE - instrument pour mesurer le temps.", targetKanji: ["時", "計"] },
  { word: "体重計", meanings: ["Balance", "Pese-personne"], readings: ["たいじゅうけい"], mnemonicFr: "BALANCE - appareil pour mesurer le poids.", targetKanji: ["体", "重", "計"] },
  { word: "温度計", meanings: ["Thermometre"], readings: ["おんどけい"], mnemonicFr: "THERMOMETRE - appareil pour mesurer la temperature.", targetKanji: ["温", "度", "計"] },
  { word: "計算機", meanings: ["Calculatrice"], readings: ["けいさんき"], mnemonicFr: "CALCULATRICE - machine pour calculer.", targetKanji: ["計", "算", "機"] },
  { word: "飛行機", meanings: ["Avion"], readings: ["ひこうき"], mnemonicFr: "AVION - machine qui vole.", targetKanji: ["飛", "行", "機"] },
  { word: "写真機", meanings: ["Appareil photo"], readings: ["しゃしんき"], mnemonicFr: "APPAREIL PHOTO - machine pour photographier.", targetKanji: ["写", "真", "機"] },
  { word: "録音機", meanings: ["Enregistreur"], readings: ["ろくおんき"], mnemonicFr: "ENREGISTREUR - machine pour enregistrer le son.", targetKanji: ["録", "音", "機"] },
];

const vocabPart3 = [
  // === INTERNET & COMPUTERS ===
  { word: "画面", meanings: ["Ecran"], readings: ["がめん"], mnemonicFr: "ECRAN - surface d'image.", targetKanji: ["画", "面"] },
  { word: "入力", meanings: ["Saisie", "Entree"], readings: ["にゅうりょく"], mnemonicFr: "SAISIE - entrer des donnees.", targetKanji: ["入", "力"] },
  { word: "出力", meanings: ["Sortie", "Output"], readings: ["しゅつりょく"], mnemonicFr: "SORTIE - donnees produites.", targetKanji: ["出", "力"] },
  { word: "検索", meanings: ["Recherche"], readings: ["けんさく"], mnemonicFr: "RECHERCHE - chercher des informations.", targetKanji: ["検", "索"] },
  { word: "接続", meanings: ["Connexion"], readings: ["せつぞく"], mnemonicFr: "CONNEXION - se relier.", targetKanji: ["接", "続"] },
  { word: "保存", meanings: ["Sauvegarde"], readings: ["ほぞん"], mnemonicFr: "SAUVEGARDE - garder en securite.", targetKanji: ["保", "存"] },
  { word: "削除", meanings: ["Suppression"], readings: ["さくじょ"], mnemonicFr: "SUPPRESSION - enlever, effacer.", targetKanji: ["削", "除"] },
  { word: "複写", meanings: ["Copie"], readings: ["ふくしゃ"], mnemonicFr: "COPIE - reproduire.", targetKanji: ["複", "写"] },
  { word: "印刷", meanings: ["Impression"], readings: ["いんさつ"], mnemonicFr: "IMPRESSION - imprimer sur papier.", targetKanji: ["印", "刷"] },
  { word: "登録", meanings: ["Inscription", "Enregistrement"], readings: ["とうろく"], mnemonicFr: "INSCRIPTION - s'enregistrer.", targetKanji: ["登", "録"] },

  // === MODERN WORK ===
  { word: "会議", meanings: ["Reunion", "Conference"], readings: ["かいぎ"], mnemonicFr: "REUNION - discuter ensemble.", targetKanji: ["会", "議"] },
  { word: "会社", meanings: ["Entreprise", "Societe"], readings: ["かいしゃ"], mnemonicFr: "ENTREPRISE - groupe de travail.", targetKanji: ["会", "社"] },
  { word: "事務所", meanings: ["Bureau", "Office"], readings: ["じむしょ"], mnemonicFr: "BUREAU - lieu des affaires.", targetKanji: ["事", "務", "所"] },
  { word: "事務", meanings: ["Travail de bureau"], readings: ["じむ"], mnemonicFr: "TRAVAIL DE BUREAU - taches administratives.", targetKanji: ["事", "務"] },
  { word: "業務", meanings: ["Activite professionnelle"], readings: ["ぎょうむ"], mnemonicFr: "ACTIVITE - travail de l'entreprise.", targetKanji: ["業", "務"] },
  { word: "勤務", meanings: ["Service", "Travail"], readings: ["きんむ"], mnemonicFr: "SERVICE - etre au travail.", targetKanji: ["勤", "務"] },
  { word: "出勤", meanings: ["Aller au travail"], readings: ["しゅっきん"], mnemonicFr: "ALLER AU TRAVAIL - se rendre au bureau.", targetKanji: ["出", "勤"] },
  { word: "退勤", meanings: ["Quitter le travail"], readings: ["たいきん"], mnemonicFr: "QUITTER LE TRAVAIL - partir du bureau.", targetKanji: ["退", "勤"] },
  { word: "残業", meanings: ["Heures supplementaires"], readings: ["ざんぎょう"], mnemonicFr: "HEURES SUPPLEMENTAIRES - travail restant.", targetKanji: ["残", "業"] },
  { word: "休日", meanings: ["Jour de repos"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS - jour sans travail.", targetKanji: ["休", "日"] },

  // === SHOPPING & COMMERCE ===
  { word: "買い物", meanings: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "COURSES - acheter des choses.", targetKanji: ["買", "物"] },
  { word: "売り場", meanings: ["Rayon", "Comptoir"], readings: ["うりば"], mnemonicFr: "RAYON - endroit pour vendre.", targetKanji: ["売", "場"] },
  { word: "売り切れ", meanings: ["Rupture de stock"], readings: ["うりきれ"], mnemonicFr: "RUPTURE DE STOCK - tout vendu.", targetKanji: ["売", "切"] },
  { word: "品切れ", meanings: ["Rupture de stock"], readings: ["しなぎれ"], mnemonicFr: "RUPTURE - articles epuises.", targetKanji: ["品", "切"] },
  { word: "定価", meanings: ["Prix fixe"], readings: ["ていか"], mnemonicFr: "PRIX FIXE - prix determine.", targetKanji: ["定", "価"] },
  { word: "値段", meanings: ["Prix"], readings: ["ねだん"], mnemonicFr: "PRIX - valeur en argent.", targetKanji: ["値", "段"] },
  { word: "割引", meanings: ["Reduction", "Remise"], readings: ["わりびき"], mnemonicFr: "REDUCTION - prix diminue.", targetKanji: ["割", "引"] },
  { word: "支払い", meanings: ["Paiement"], readings: ["しはらい"], mnemonicFr: "PAIEMENT - donner de l'argent.", targetKanji: ["支", "払"] },
  { word: "現金", meanings: ["Especes", "Liquide"], readings: ["げんきん"], mnemonicFr: "ESPECES - argent en main.", targetKanji: ["現", "金"] },
  { word: "領収書", meanings: ["Recu", "Facture"], readings: ["りょうしゅうしょ"], mnemonicFr: "RECU - document de paiement.", targetKanji: ["領", "収", "書"] },

  // === DAILY LIFE ===
  { word: "生活", meanings: ["Vie quotidienne"], readings: ["せいかつ"], mnemonicFr: "VIE QUOTIDIENNE - vivre au jour le jour.", targetKanji: ["生", "活"] },
  { word: "日常", meanings: ["Quotidien"], readings: ["にちじょう"], mnemonicFr: "QUOTIDIEN - de tous les jours.", targetKanji: ["日", "常"] },
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - tous les jours.", targetKanji: ["毎", "日"] },
  { word: "毎週", meanings: ["Chaque semaine"], readings: ["まいしゅう"], mnemonicFr: "CHAQUE SEMAINE - toutes les semaines.", targetKanji: ["毎", "週"] },
  { word: "毎月", meanings: ["Chaque mois"], readings: ["まいつき"], mnemonicFr: "CHAQUE MOIS - tous les mois.", targetKanji: ["毎", "月"] },
  { word: "毎年", meanings: ["Chaque annee"], readings: ["まいとし"], mnemonicFr: "CHAQUE ANNEE - toutes les annees.", targetKanji: ["毎", "年"] },
  { word: "朝食", meanings: ["Petit-dejeuner"], readings: ["ちょうしょく"], mnemonicFr: "PETIT-DEJEUNER - repas du matin.", targetKanji: ["朝", "食"] },
  { word: "昼食", meanings: ["Dejeuner"], readings: ["ちゅうしょく"], mnemonicFr: "DEJEUNER - repas de midi.", targetKanji: ["昼", "食"] },
  { word: "夕食", meanings: ["Diner"], readings: ["ゆうしょく"], mnemonicFr: "DINER - repas du soir.", targetKanji: ["夕", "食"] },
  { word: "外食", meanings: ["Manger dehors"], readings: ["がいしょく"], mnemonicFr: "MANGER DEHORS - repas a l'exterieur.", targetKanji: ["外", "食"] },
];

const vocabPart4 = [
  // === SOCIAL MEDIA & INTERNET CULTURE ===
  { word: "動画", meanings: ["Video"], readings: ["どうが"], mnemonicFr: "VIDEO - image en mouvement.", targetKanji: ["動", "画"] },
  { word: "映像", meanings: ["Image", "Video"], readings: ["えいぞう"], mnemonicFr: "IMAGE - projection visuelle.", targetKanji: ["映", "像"] },
  { word: "音声", meanings: ["Audio", "Voix"], readings: ["おんせい"], mnemonicFr: "AUDIO - son de la voix.", targetKanji: ["音", "声"] },
  { word: "配信", meanings: ["Diffusion", "Streaming"], readings: ["はいしん"], mnemonicFr: "STREAMING - distribuer du contenu.", targetKanji: ["配", "信"] },
  { word: "公開", meanings: ["Publication", "Ouverture"], readings: ["こうかい"], mnemonicFr: "PUBLICATION - rendre public.", targetKanji: ["公", "開"] },
  { word: "非公開", meanings: ["Prive"], readings: ["ひこうかい"], mnemonicFr: "PRIVE - non public.", targetKanji: ["非", "公", "開"] },
  { word: "共有", meanings: ["Partage"], readings: ["きょうゆう"], mnemonicFr: "PARTAGE - avoir en commun.", targetKanji: ["共", "有"] },
  { word: "投稿", meanings: ["Publication", "Post"], readings: ["とうこう"], mnemonicFr: "POST - soumettre un message.", targetKanji: ["投", "稿"] },
  { word: "返答", meanings: ["Reponse"], readings: ["へんとう"], mnemonicFr: "REPONSE - repondre a quelqu'un.", targetKanji: ["返", "答"] },
  { word: "質問", meanings: ["Question"], readings: ["しつもん"], mnemonicFr: "QUESTION - demander quelque chose.", targetKanji: ["質", "問"] },

  // === BANKING & FINANCE ===
  { word: "銀行", meanings: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "BANQUE - etablissement d'argent.", targetKanji: ["銀", "行"] },
  { word: "口座", meanings: ["Compte bancaire"], readings: ["こうざ"], mnemonicFr: "COMPTE - place pour l'argent.", targetKanji: ["口", "座"] },
  { word: "預金", meanings: ["Depot", "Epargne"], readings: ["よきん"], mnemonicFr: "DEPOT - argent confie a la banque.", targetKanji: ["預", "金"] },
  { word: "送金", meanings: ["Virement"], readings: ["そうきん"], mnemonicFr: "VIREMENT - envoyer de l'argent.", targetKanji: ["送", "金"] },
  { word: "振込", meanings: ["Virement bancaire"], readings: ["ふりこみ"], mnemonicFr: "VIREMENT - transferer de l'argent.", targetKanji: ["振", "込"] },
  { word: "引き出し", meanings: ["Retrait"], readings: ["ひきだし"], mnemonicFr: "RETRAIT - sortir de l'argent.", targetKanji: ["引", "出"] },
  { word: "借金", meanings: ["Dette", "Emprunt"], readings: ["しゃっきん"], mnemonicFr: "DETTE - argent emprunte.", targetKanji: ["借", "金"] },
  { word: "貯金", meanings: ["Epargne"], readings: ["ちょきん"], mnemonicFr: "EPARGNE - argent economise.", targetKanji: ["貯", "金"] },
  { word: "両替", meanings: ["Change", "Echange"], readings: ["りょうがえ"], mnemonicFr: "CHANGE - echanger des devises.", targetKanji: ["両", "替"] },
  { word: "手数料", meanings: ["Frais de service"], readings: ["てすうりょう"], mnemonicFr: "FRAIS - cout du service.", targetKanji: ["手", "数", "料"] },

  // === TRAVEL & TOURISM ===
  { word: "旅行", meanings: ["Voyage"], readings: ["りょこう"], mnemonicFr: "VOYAGE - aller quelque part.", targetKanji: ["旅", "行"] },
  { word: "出張", meanings: ["Deplacement professionnel"], readings: ["しゅっちょう"], mnemonicFr: "DEPLACEMENT - voyage d'affaires.", targetKanji: ["出", "張"] },
  { word: "観光", meanings: ["Tourisme"], readings: ["かんこう"], mnemonicFr: "TOURISME - voir les sites.", targetKanji: ["観", "光"] },
  { word: "予約", meanings: ["Reservation"], readings: ["よやく"], mnemonicFr: "RESERVATION - reserver a l'avance.", targetKanji: ["予", "約"] },
  { word: "案内", meanings: ["Guide", "Information"], readings: ["あんない"], mnemonicFr: "GUIDE - montrer le chemin.", targetKanji: ["案", "内"] },
  { word: "目的地", meanings: ["Destination"], readings: ["もくてきち"], mnemonicFr: "DESTINATION - lieu vise.", targetKanji: ["目", "的", "地"] },
  { word: "出入国", meanings: ["Immigration"], readings: ["しゅつにゅうこく"], mnemonicFr: "IMMIGRATION - entrer et sortir d'un pays.", targetKanji: ["出", "入", "国"] },
  { word: "荷物", meanings: ["Bagages"], readings: ["にもつ"], mnemonicFr: "BAGAGES - affaires a transporter.", targetKanji: ["荷", "物"] },
  { word: "手荷物", meanings: ["Bagage a main"], readings: ["てにもつ"], mnemonicFr: "BAGAGE A MAIN - affaires portees.", targetKanji: ["手", "荷", "物"] },
  { word: "空港", meanings: ["Aeroport"], readings: ["くうこう"], mnemonicFr: "AEROPORT - port du ciel.", targetKanji: ["空", "港"] },

  // === HEALTH & MEDICAL ===
  { word: "健康", meanings: ["Sante"], readings: ["けんこう"], mnemonicFr: "SANTE - etre en bonne forme.", targetKanji: ["健", "康"] },
  { word: "病気", meanings: ["Maladie"], readings: ["びょうき"], mnemonicFr: "MALADIE - etat de sante deteriore.", targetKanji: ["病", "気"] },
  { word: "病院", meanings: ["Hopital"], readings: ["びょういん"], mnemonicFr: "HOPITAL - etablissement de soins.", targetKanji: ["病", "院"] },
  { word: "診察", meanings: ["Consultation medicale"], readings: ["しんさつ"], mnemonicFr: "CONSULTATION - examen medical.", targetKanji: ["診", "察"] },
  { word: "治療", meanings: ["Traitement"], readings: ["ちりょう"], mnemonicFr: "TRAITEMENT - soigner une maladie.", targetKanji: ["治", "療"] },
  { word: "手術", meanings: ["Operation chirurgicale"], readings: ["しゅじゅつ"], mnemonicFr: "OPERATION - intervention medicale.", targetKanji: ["手", "術"] },
  { word: "薬局", meanings: ["Pharmacie"], readings: ["やっきょく"], mnemonicFr: "PHARMACIE - magasin de medicaments.", targetKanji: ["薬", "局"] },
  { word: "処方", meanings: ["Ordonnance"], readings: ["しょほう"], mnemonicFr: "ORDONNANCE - prescription medicale.", targetKanji: ["処", "方"] },
  { word: "体温", meanings: ["Temperature corporelle"], readings: ["たいおん"], mnemonicFr: "TEMPERATURE - chaleur du corps.", targetKanji: ["体", "温"] },
  { word: "血圧", meanings: ["Tension arterielle"], readings: ["けつあつ"], mnemonicFr: "TENSION - pression du sang.", targetKanji: ["血", "圧"] },
];

const vocabPart5 = [
  // === EDUCATION & LEARNING ===
  { word: "教育", meanings: ["Education"], readings: ["きょういく"], mnemonicFr: "EDUCATION - enseigner et elever.", targetKanji: ["教", "育"] },
  { word: "学校", meanings: ["Ecole"], readings: ["がっこう"], mnemonicFr: "ECOLE - lieu d'apprentissage.", targetKanji: ["学", "校"] },
  { word: "授業", meanings: ["Cours", "Lecon"], readings: ["じゅぎょう"], mnemonicFr: "COURS - transmission du savoir.", targetKanji: ["授", "業"] },
  { word: "試験", meanings: ["Examen"], readings: ["しけん"], mnemonicFr: "EXAMEN - test de connaissances.", targetKanji: ["試", "験"] },
  { word: "成績", meanings: ["Notes", "Resultats"], readings: ["せいせき"], mnemonicFr: "NOTES - resultats scolaires.", targetKanji: ["成", "績"] },
  { word: "卒業", meanings: ["Diplome", "Fin d'etudes"], readings: ["そつぎょう"], mnemonicFr: "DIPLOME - finir ses etudes.", targetKanji: ["卒", "業"] },
  { word: "入学", meanings: ["Entree a l'ecole"], readings: ["にゅうがく"], mnemonicFr: "ENTREE - commencer l'ecole.", targetKanji: ["入", "学"] },
  { word: "入試", meanings: ["Concours d'entree"], readings: ["にゅうし"], mnemonicFr: "CONCOURS - examen d'admission.", targetKanji: ["入", "試"] },
  { word: "勉強", meanings: ["Etude"], readings: ["べんきょう"], mnemonicFr: "ETUDE - s'efforcer d'apprendre.", targetKanji: ["勉", "強"] },
  { word: "練習", meanings: ["Entrainement", "Pratique"], readings: ["れんしゅう"], mnemonicFr: "ENTRAINEMENT - pratiquer regulierement.", targetKanji: ["練", "習"] },

  // === SERVICES & UTILITIES ===
  { word: "水道", meanings: ["Eau courante"], readings: ["すいどう"], mnemonicFr: "EAU COURANTE - canalisation d'eau.", targetKanji: ["水", "道"] },
  { word: "電気代", meanings: ["Facture d'electricite"], readings: ["でんきだい"], mnemonicFr: "FACTURE ELECTRICITE - cout de l'electricite.", targetKanji: ["電", "気", "代"] },
  { word: "水道代", meanings: ["Facture d'eau"], readings: ["すいどうだい"], mnemonicFr: "FACTURE EAU - cout de l'eau.", targetKanji: ["水", "道", "代"] },
  { word: "家賃", meanings: ["Loyer"], readings: ["やちん"], mnemonicFr: "LOYER - prix de la location.", targetKanji: ["家", "賃"] },
  { word: "引っ越し", meanings: ["Demenagement"], readings: ["ひっこし"], mnemonicFr: "DEMENAGEMENT - changer de maison.", targetKanji: ["引", "越"] },
  { word: "契約", meanings: ["Contrat"], readings: ["けいやく"], mnemonicFr: "CONTRAT - accord officiel.", targetKanji: ["契", "約"] },
  { word: "手続き", meanings: ["Procedure", "Formalites"], readings: ["てつづき"], mnemonicFr: "PROCEDURE - etapes a suivre.", targetKanji: ["手", "続"] },
  { word: "届け", meanings: ["Declaration", "Notification"], readings: ["とどけ"], mnemonicFr: "DECLARATION - informer officiellement.", targetKanji: ["届"] },
  { word: "届出", meanings: ["Declaration officielle"], readings: ["とどけで"], mnemonicFr: "DECLARATION - notification aux autorites.", targetKanji: ["届", "出"] },
  { word: "郵便", meanings: ["Courrier", "Poste"], readings: ["ゆうびん"], mnemonicFr: "COURRIER - service postal.", targetKanji: ["郵", "便"] },

  // === TIME & SCHEDULING ===
  { word: "予定", meanings: ["Programme", "Projet"], readings: ["よてい"], mnemonicFr: "PROGRAMME - ce qui est prevu.", targetKanji: ["予", "定"] },
  { word: "日程", meanings: ["Calendrier", "Programme"], readings: ["にってい"], mnemonicFr: "CALENDRIER - programme des jours.", targetKanji: ["日", "程"] },
  { word: "時間割", meanings: ["Emploi du temps"], readings: ["じかんわり"], mnemonicFr: "EMPLOI DU TEMPS - division des heures.", targetKanji: ["時", "間", "割"] },
  { word: "期間", meanings: ["Periode", "Duree"], readings: ["きかん"], mnemonicFr: "PERIODE - espace de temps.", targetKanji: ["期", "間"] },
  { word: "期限", meanings: ["Date limite"], readings: ["きげん"], mnemonicFr: "DATE LIMITE - fin de la periode.", targetKanji: ["期", "限"] },
  { word: "締め切り", meanings: ["Date limite", "Deadline"], readings: ["しめきり"], mnemonicFr: "DEADLINE - fermeture des inscriptions.", targetKanji: ["締", "切"] },
  { word: "延長", meanings: ["Prolongation"], readings: ["えんちょう"], mnemonicFr: "PROLONGATION - etendre la duree.", targetKanji: ["延", "長"] },
  { word: "短縮", meanings: ["Reduction", "Raccourci"], readings: ["たんしゅく"], mnemonicFr: "REDUCTION - rendre plus court.", targetKanji: ["短", "縮"] },
  { word: "開始", meanings: ["Debut", "Commencement"], readings: ["かいし"], mnemonicFr: "DEBUT - commencer.", targetKanji: ["開", "始"] },
  { word: "終了", meanings: ["Fin", "Terminaison"], readings: ["しゅうりょう"], mnemonicFr: "FIN - terminer.", targetKanji: ["終", "了"] },

  // === ENVIRONMENT & WEATHER ===
  { word: "天気", meanings: ["Meteo", "Temps"], readings: ["てんき"], mnemonicFr: "METEO - etat du ciel.", targetKanji: ["天", "気"] },
  { word: "気温", meanings: ["Temperature"], readings: ["きおん"], mnemonicFr: "TEMPERATURE - chaleur de l'air.", targetKanji: ["気", "温"] },
  { word: "湿度", meanings: ["Humidite"], readings: ["しつど"], mnemonicFr: "HUMIDITE - degre d'eau dans l'air.", targetKanji: ["湿", "度"] },
  { word: "台風", meanings: ["Typhon"], readings: ["たいふう"], mnemonicFr: "TYPHON - grande tempete.", targetKanji: ["台", "風"] },
  { word: "地震", meanings: ["Tremblement de terre"], readings: ["じしん"], mnemonicFr: "SEISME - la terre qui tremble.", targetKanji: ["地", "震"] },
  { word: "津波", meanings: ["Tsunami"], readings: ["つなみ"], mnemonicFr: "TSUNAMI - vague du port.", targetKanji: ["津", "波"] },
  { word: "環境", meanings: ["Environnement"], readings: ["かんきょう"], mnemonicFr: "ENVIRONNEMENT - ce qui nous entoure.", targetKanji: ["環", "境"] },
  { word: "自然", meanings: ["Nature"], readings: ["しぜん"], mnemonicFr: "NATURE - le monde naturel.", targetKanji: ["自", "然"] },
  { word: "公害", meanings: ["Pollution"], readings: ["こうがい"], mnemonicFr: "POLLUTION - dommage public.", targetKanji: ["公", "害"] },
  { word: "省エネ", meanings: ["Economie d'energie"], readings: ["しょうエネ"], mnemonicFr: "ECONOMIE D'ENERGIE - reduire la consommation.", targetKanji: ["省"] },
];

const vocabPart6 = [
  // === SAFETY & SECURITY ===
  { word: "安全", meanings: ["Securite"], readings: ["あんぜん"], mnemonicFr: "SECURITE - etat de calme et de surete.", targetKanji: ["安", "全"] },
  { word: "危険", meanings: ["Danger"], readings: ["きけん"], mnemonicFr: "DANGER - risque de probleme.", targetKanji: ["危", "険"] },
  { word: "注意", meanings: ["Attention", "Prudence"], readings: ["ちゅうい"], mnemonicFr: "ATTENTION - faire attention.", targetKanji: ["注", "意"] },
  { word: "警告", meanings: ["Avertissement"], readings: ["けいこく"], mnemonicFr: "AVERTISSEMENT - prevenir du danger.", targetKanji: ["警", "告"] },
  { word: "警察", meanings: ["Police"], readings: ["けいさつ"], mnemonicFr: "POLICE - force de l'ordre.", targetKanji: ["警", "察"] },
  { word: "消防", meanings: ["Pompiers"], readings: ["しょうぼう"], mnemonicFr: "POMPIERS - eteindre les incendies.", targetKanji: ["消", "防"] },
  { word: "救急", meanings: ["Urgences"], readings: ["きゅうきゅう"], mnemonicFr: "URGENCES - secours rapide.", targetKanji: ["救", "急"] },
  { word: "非常口", meanings: ["Sortie de secours"], readings: ["ひじょうぐち"], mnemonicFr: "SORTIE DE SECOURS - sortie d'urgence.", targetKanji: ["非", "常", "口"] },
  { word: "避難", meanings: ["Evacuation"], readings: ["ひなん"], mnemonicFr: "EVACUATION - fuir le danger.", targetKanji: ["避", "難"] },
  { word: "防災", meanings: ["Prevention des catastrophes"], readings: ["ぼうさい"], mnemonicFr: "PREVENTION - se proteger des desastres.", targetKanji: ["防", "災"] },

  // === GOVERNMENT & SOCIETY ===
  { word: "政治", meanings: ["Politique"], readings: ["せいじ"], mnemonicFr: "POLITIQUE - gestion de l'Etat.", targetKanji: ["政", "治"] },
  { word: "政府", meanings: ["Gouvernement"], readings: ["せいふ"], mnemonicFr: "GOUVERNEMENT - autorite centrale.", targetKanji: ["政", "府"] },
  { word: "法律", meanings: ["Loi"], readings: ["ほうりつ"], mnemonicFr: "LOI - regles de la societe.", targetKanji: ["法", "律"] },
  { word: "規則", meanings: ["Reglement"], readings: ["きそく"], mnemonicFr: "REGLEMENT - regles a suivre.", targetKanji: ["規", "則"] },
  { word: "選挙", meanings: ["Election"], readings: ["せんきょ"], mnemonicFr: "ELECTION - choisir ses representants.", targetKanji: ["選", "挙"] },
  { word: "投票", meanings: ["Vote"], readings: ["とうひょう"], mnemonicFr: "VOTE - deposer son bulletin.", targetKanji: ["投", "票"] },
  { word: "市民", meanings: ["Citoyen"], readings: ["しみん"], mnemonicFr: "CITOYEN - habitant de la ville.", targetKanji: ["市", "民"] },
  { word: "国民", meanings: ["Peuple", "Nation"], readings: ["こくみん"], mnemonicFr: "PEUPLE - citoyens d'un pays.", targetKanji: ["国", "民"] },
  { word: "住民", meanings: ["Habitant"], readings: ["じゅうみん"], mnemonicFr: "HABITANT - personne qui reside.", targetKanji: ["住", "民"] },
  { word: "社会", meanings: ["Societe"], readings: ["しゃかい"], mnemonicFr: "SOCIETE - communaute humaine.", targetKanji: ["社", "会"] },

  // === MEDIA & ENTERTAINMENT ===
  { word: "放送", meanings: ["Emission", "Diffusion"], readings: ["ほうそう"], mnemonicFr: "EMISSION - transmettre par les ondes.", targetKanji: ["放", "送"] },
  { word: "番組", meanings: ["Programme TV"], readings: ["ばんぐみ"], mnemonicFr: "PROGRAMME - emission de television.", targetKanji: ["番", "組"] },
  { word: "映画", meanings: ["Film", "Cinema"], readings: ["えいが"], mnemonicFr: "FILM - image projetee.", targetKanji: ["映", "画"] },
  { word: "音楽", meanings: ["Musique"], readings: ["おんがく"], mnemonicFr: "MUSIQUE - art des sons.", targetKanji: ["音", "楽"] },
  { word: "演奏", meanings: ["Performance musicale"], readings: ["えんそう"], mnemonicFr: "PERFORMANCE - jouer de la musique.", targetKanji: ["演", "奏"] },
  { word: "芸術", meanings: ["Art"], readings: ["げいじゅつ"], mnemonicFr: "ART - expression artistique.", targetKanji: ["芸", "術"] },
  { word: "娯楽", meanings: ["Divertissement"], readings: ["ごらく"], mnemonicFr: "DIVERTISSEMENT - plaisir et loisirs.", targetKanji: ["娯", "楽"] },
  { word: "趣味", meanings: ["Loisir", "Hobby"], readings: ["しゅみ"], mnemonicFr: "HOBBY - activite de plaisir.", targetKanji: ["趣", "味"] },
  { word: "試合", meanings: ["Match", "Competition"], readings: ["しあい"], mnemonicFr: "MATCH - rencontre sportive.", targetKanji: ["試", "合"] },
  { word: "大会", meanings: ["Tournoi", "Competition"], readings: ["たいかい"], mnemonicFr: "TOURNOI - grande competition.", targetKanji: ["大", "会"] },

  // === RELATIONSHIPS ===
  { word: "友人", meanings: ["Ami"], readings: ["ゆうじん"], mnemonicFr: "AMI - personne amicale.", targetKanji: ["友", "人"] },
  { word: "友達", meanings: ["Ami", "Copain"], readings: ["ともだち"], mnemonicFr: "AMI - compagnon amical.", targetKanji: ["友", "達"] },
  { word: "知人", meanings: ["Connaissance"], readings: ["ちじん"], mnemonicFr: "CONNAISSANCE - personne qu'on connait.", targetKanji: ["知", "人"] },
  { word: "家族", meanings: ["Famille"], readings: ["かぞく"], mnemonicFr: "FAMILLE - groupe familial.", targetKanji: ["家", "族"] },
  { word: "親戚", meanings: ["Parents", "Famille elargie"], readings: ["しんせき"], mnemonicFr: "PARENTS - membres de la famille.", targetKanji: ["親", "戚"] },
  { word: "夫婦", meanings: ["Couple marie"], readings: ["ふうふ"], mnemonicFr: "COUPLE - mari et femme.", targetKanji: ["夫", "婦"] },
  { word: "結婚", meanings: ["Mariage"], readings: ["けっこん"], mnemonicFr: "MARIAGE - union officielle.", targetKanji: ["結", "婚"] },
  { word: "離婚", meanings: ["Divorce"], readings: ["りこん"], mnemonicFr: "DIVORCE - separation legale.", targetKanji: ["離", "婚"] },
  { word: "恋人", meanings: ["Petit ami", "Petite amie"], readings: ["こいびと"], mnemonicFr: "AMOUREUX - personne aimee.", targetKanji: ["恋", "人"] },
  { word: "交際", meanings: ["Relation", "Frequentation"], readings: ["こうさい"], mnemonicFr: "RELATION - avoir des rapports.", targetKanji: ["交", "際"] },
];

const vocabPart7 = [
  // === EMOTIONS & FEELINGS ===
  { word: "感情", meanings: ["Emotion", "Sentiment"], readings: ["かんじょう"], mnemonicFr: "EMOTION - ce qu'on ressent.", targetKanji: ["感", "情"] },
  { word: "感動", meanings: ["Emotion", "Etre emu"], readings: ["かんどう"], mnemonicFr: "ETRE EMU - etre touche.", targetKanji: ["感", "動"] },
  { word: "感謝", meanings: ["Gratitude", "Remerciement"], readings: ["かんしゃ"], mnemonicFr: "GRATITUDE - etre reconnaissant.", targetKanji: ["感", "謝"] },
  { word: "心配", meanings: ["Inquietude", "Souci"], readings: ["しんぱい"], mnemonicFr: "INQUIETUDE - se faire du souci.", targetKanji: ["心", "配"] },
  { word: "安心", meanings: ["Tranquillite", "Soulagement"], readings: ["あんしん"], mnemonicFr: "SOULAGEMENT - coeur en paix.", targetKanji: ["安", "心"] },
  { word: "不安", meanings: ["Anxiete", "Inquietude"], readings: ["ふあん"], mnemonicFr: "ANXIETE - pas en paix.", targetKanji: ["不", "安"] },
  { word: "期待", meanings: ["Attente", "Espoir"], readings: ["きたい"], mnemonicFr: "ATTENTE - esperer quelque chose.", targetKanji: ["期", "待"] },
  { word: "興味", meanings: ["Interet"], readings: ["きょうみ"], mnemonicFr: "INTERET - curiosite pour quelque chose.", targetKanji: ["興", "味"] },
  { word: "満足", meanings: ["Satisfaction"], readings: ["まんぞく"], mnemonicFr: "SATISFACTION - etre content.", targetKanji: ["満", "足"] },
  { word: "不満", meanings: ["Mecontentement"], readings: ["ふまん"], mnemonicFr: "MECONTENTEMENT - pas satisfait.", targetKanji: ["不", "満"] },

  // === THINKING & UNDERSTANDING ===
  { word: "考え", meanings: ["Pensee", "Idee"], readings: ["かんがえ"], mnemonicFr: "PENSEE - reflexion mentale.", targetKanji: ["考"] },
  { word: "意見", meanings: ["Opinion", "Avis"], readings: ["いけん"], mnemonicFr: "OPINION - point de vue.", targetKanji: ["意", "見"] },
  { word: "理解", meanings: ["Comprehension"], readings: ["りかい"], mnemonicFr: "COMPREHENSION - comprendre.", targetKanji: ["理", "解"] },
  { word: "説明", meanings: ["Explication"], readings: ["せつめい"], mnemonicFr: "EXPLICATION - rendre clair.", targetKanji: ["説", "明"] },
  { word: "確認", meanings: ["Verification", "Confirmation"], readings: ["かくにん"], mnemonicFr: "VERIFICATION - s'assurer.", targetKanji: ["確", "認"] },
  { word: "判断", meanings: ["Jugement", "Decision"], readings: ["はんだん"], mnemonicFr: "JUGEMENT - prendre une decision.", targetKanji: ["判", "断"] },
  { word: "決定", meanings: ["Decision"], readings: ["けってい"], mnemonicFr: "DECISION - choisir definitivement.", targetKanji: ["決", "定"] },
  { word: "選択", meanings: ["Choix", "Selection"], readings: ["せんたく"], mnemonicFr: "CHOIX - selectionner.", targetKanji: ["選", "択"] },
  { word: "比較", meanings: ["Comparaison"], readings: ["ひかく"], mnemonicFr: "COMPARAISON - mettre en parallele.", targetKanji: ["比", "較"] },
  { word: "分析", meanings: ["Analyse"], readings: ["ぶんせき"], mnemonicFr: "ANALYSE - examiner en detail.", targetKanji: ["分", "析"] },

  // === ACTION VERBS - MODERN LIFE ===
  { word: "利用", meanings: ["Utilisation"], readings: ["りよう"], mnemonicFr: "UTILISATION - se servir de.", targetKanji: ["利", "用"] },
  { word: "使用", meanings: ["Usage", "Emploi"], readings: ["しよう"], mnemonicFr: "USAGE - employer quelque chose.", targetKanji: ["使", "用"] },
  { word: "活用", meanings: ["Application", "Mise en pratique"], readings: ["かつよう"], mnemonicFr: "APPLICATION - utiliser activement.", targetKanji: ["活", "用"] },
  { word: "運用", meanings: ["Operation", "Gestion"], readings: ["うんよう"], mnemonicFr: "OPERATION - faire fonctionner.", targetKanji: ["運", "用"] },
  { word: "作成", meanings: ["Creation", "Elaboration"], readings: ["さくせい"], mnemonicFr: "CREATION - fabriquer.", targetKanji: ["作", "成"] },
  { word: "作業", meanings: ["Travail", "Operation"], readings: ["さぎょう"], mnemonicFr: "TRAVAIL - effectuer une tache.", targetKanji: ["作", "業"] },
  { word: "処理", meanings: ["Traitement", "Gestion"], readings: ["しょり"], mnemonicFr: "TRAITEMENT - gerer une tache.", targetKanji: ["処", "理"] },
  { word: "管理", meanings: ["Gestion", "Administration"], readings: ["かんり"], mnemonicFr: "GESTION - administrer.", targetKanji: ["管", "理"] },
  { word: "整備", meanings: ["Maintenance", "Entretien"], readings: ["せいび"], mnemonicFr: "MAINTENANCE - preparer et maintenir.", targetKanji: ["整", "備"] },
  { word: "改善", meanings: ["Amelioration"], readings: ["かいぜん"], mnemonicFr: "AMELIORATION - rendre meilleur.", targetKanji: ["改", "善"] },

  // === QUANTITIES & MEASUREMENTS ===
  { word: "数量", meanings: ["Quantite"], readings: ["すうりょう"], mnemonicFr: "QUANTITE - nombre et mesure.", targetKanji: ["数", "量"] },
  { word: "金額", meanings: ["Montant"], readings: ["きんがく"], mnemonicFr: "MONTANT - somme d'argent.", targetKanji: ["金", "額"] },
  { word: "合計", meanings: ["Total"], readings: ["ごうけい"], mnemonicFr: "TOTAL - somme de tout.", targetKanji: ["合", "計"] },
  { word: "平均", meanings: ["Moyenne"], readings: ["へいきん"], mnemonicFr: "MOYENNE - valeur centrale.", targetKanji: ["平", "均"] },
  { word: "最大", meanings: ["Maximum"], readings: ["さいだい"], mnemonicFr: "MAXIMUM - le plus grand.", targetKanji: ["最", "大"] },
  { word: "最小", meanings: ["Minimum"], readings: ["さいしょう"], mnemonicFr: "MINIMUM - le plus petit.", targetKanji: ["最", "小"] },
  { word: "増加", meanings: ["Augmentation"], readings: ["ぞうか"], mnemonicFr: "AUGMENTATION - devenir plus.", targetKanji: ["増", "加"] },
  { word: "減少", meanings: ["Diminution"], readings: ["げんしょう"], mnemonicFr: "DIMINUTION - devenir moins.", targetKanji: ["減", "少"] },
  { word: "割合", meanings: ["Proportion", "Taux"], readings: ["わりあい"], mnemonicFr: "PROPORTION - rapport entre quantites.", targetKanji: ["割", "合"] },
  { word: "倍率", meanings: ["Taux", "Multiplicateur"], readings: ["ばいりつ"], mnemonicFr: "MULTIPLICATEUR - combien de fois.", targetKanji: ["倍", "率"] },
];

async function main() {
  console.log("=== SEEDING VOCABULARY BATCH 8: Technology & Modern Life ===\n");

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
      missingKanjiCount++;
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
      if (added % 20 === 0) {
        console.log(`Progress: ${added} vocabulary entries added...`);
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
  console.log(`Skipped (already exists): ${skipped - missingKanjiCount}`);
  console.log(`Skipped (missing kanji): ${missingKanjiCount}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
