import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Batch 12: Everyday Actions, Common Expressions, Daily Life Vocabulary
// Focus: JLPT N5-N3 common kanji

// Part 1: Actions and Movement
const vocabPart1 = [
  // Actions: 手伝う, 助ける, 守る, 戦う
  { word: "手伝う", meanings: ["Aider"], readings: ["てつだう"], mnemonicFr: "AIDER - donner un coup de main.", targetKanji: ["手", "伝"] },
  { word: "助ける", meanings: ["Secourir", "Sauver"], readings: ["たすける"], mnemonicFr: "SECOURIR - venir en aide à quelqu'un en danger.", targetKanji: ["助"] },
  { word: "助け", meanings: ["Aide", "Secours"], readings: ["たすけ"], mnemonicFr: "AIDE - assistance apportée.", targetKanji: ["助"] },
  { word: "助手", meanings: ["Assistant"], readings: ["じょしゅ"], mnemonicFr: "ASSISTANT - personne qui aide.", targetKanji: ["助", "手"] },
  { word: "守る", meanings: ["Proteger", "Defendre"], readings: ["まもる"], mnemonicFr: "PROTEGER - defendre contre le danger.", targetKanji: ["守"] },
  { word: "守備", meanings: ["Defense"], readings: ["しゅび"], mnemonicFr: "DEFENSE - action de defendre.", targetKanji: ["守", "備"] },
  { word: "戦う", meanings: ["Combattre", "Lutter"], readings: ["たたかう"], mnemonicFr: "COMBATTRE - se battre contre quelqu'un.", targetKanji: ["戦"] },
  { word: "戦い", meanings: ["Combat", "Bataille"], readings: ["たたかい"], mnemonicFr: "COMBAT - affrontement.", targetKanji: ["戦"] },

  // Movement: 進む, 戻る, 回る, 曲がる
  { word: "戻る", meanings: ["Retourner", "Revenir"], readings: ["もどる"], mnemonicFr: "RETOURNER - revenir au point de depart.", targetKanji: ["戻"] },
  { word: "戻す", meanings: ["Remettre", "Rendre"], readings: ["もどす"], mnemonicFr: "REMETTRE - remettre quelque chose a sa place.", targetKanji: ["戻"] },
  { word: "回る", meanings: ["Tourner", "Faire le tour"], readings: ["まわる"], mnemonicFr: "TOURNER - effectuer une rotation.", targetKanji: ["回"] },
  { word: "回す", meanings: ["Faire tourner"], readings: ["まわす"], mnemonicFr: "FAIRE TOURNER - mettre en rotation.", targetKanji: ["回"] },
  { word: "回数", meanings: ["Nombre de fois"], readings: ["かいすう"], mnemonicFr: "NOMBRE DE FOIS - frequence.", targetKanji: ["回", "数"] },
  { word: "曲がる", meanings: ["Tourner", "Se courber"], readings: ["まがる"], mnemonicFr: "TOURNER - changer de direction.", targetKanji: ["曲"] },
  { word: "曲げる", meanings: ["Plier", "Courber"], readings: ["まげる"], mnemonicFr: "PLIER - rendre courbe.", targetKanji: ["曲"] },
  { word: "曲", meanings: ["Chanson", "Morceau"], readings: ["きょく"], mnemonicFr: "CHANSON - piece musicale.", targetKanji: ["曲"] },

  // States: 始まる, 終わる, 続く, 変わる
  { word: "始まる", meanings: ["Commencer"], readings: ["はじまる"], mnemonicFr: "COMMENCER - debuter.", targetKanji: ["始"] },
  { word: "始める", meanings: ["Commencer", "Demarrer"], readings: ["はじめる"], mnemonicFr: "COMMENCER - faire debuter.", targetKanji: ["始"] },
  { word: "開始", meanings: ["Debut", "Commencement"], readings: ["かいし"], mnemonicFr: "DEBUT - moment ou cela commence.", targetKanji: ["開", "始"] },
  { word: "終わる", meanings: ["Finir", "Se terminer"], readings: ["おわる"], mnemonicFr: "FINIR - arriver a la fin.", targetKanji: ["終"] },
  { word: "終える", meanings: ["Terminer", "Achever"], readings: ["おえる"], mnemonicFr: "TERMINER - mener a terme.", targetKanji: ["終"] },
  { word: "終了", meanings: ["Fin", "Cloture"], readings: ["しゅうりょう"], mnemonicFr: "FIN - achevement.", targetKanji: ["終", "了"] },
  { word: "続く", meanings: ["Continuer", "Durer"], readings: ["つづく"], mnemonicFr: "CONTINUER - se poursuivre.", targetKanji: ["続"] },
  { word: "続ける", meanings: ["Continuer", "Poursuivre"], readings: ["つづける"], mnemonicFr: "CONTINUER - ne pas s'arreter.", targetKanji: ["続"] },
  { word: "連続", meanings: ["Serie", "Suite"], readings: ["れんぞく"], mnemonicFr: "SERIE - succession continue.", targetKanji: ["連", "続"] },
  { word: "変わる", meanings: ["Changer", "Se transformer"], readings: ["かわる"], mnemonicFr: "CHANGER - devenir different.", targetKanji: ["変"] },

  // Activities: 遊ぶ, 泳ぐ, 登る, 降りる
  { word: "遊ぶ", meanings: ["Jouer", "S'amuser"], readings: ["あそぶ"], mnemonicFr: "JOUER - s'amuser avec des jeux.", targetKanji: ["遊"] },
  { word: "遊び", meanings: ["Jeu", "Amusement"], readings: ["あそび"], mnemonicFr: "JEU - activite ludique.", targetKanji: ["遊"] },
  { word: "遊園地", meanings: ["Parc d'attractions"], readings: ["ゆうえんち"], mnemonicFr: "PARC D'ATTRACTIONS - lieu de divertissement.", targetKanji: ["遊", "園", "地"] },
  { word: "泳ぐ", meanings: ["Nager"], readings: ["およぐ"], mnemonicFr: "NAGER - se deplacer dans l'eau.", targetKanji: ["泳"] },
  { word: "水泳", meanings: ["Natation"], readings: ["すいえい"], mnemonicFr: "NATATION - sport aquatique.", targetKanji: ["水", "泳"] },
  { word: "登る", meanings: ["Monter", "Grimper"], readings: ["のぼる"], mnemonicFr: "MONTER - aller vers le haut.", targetKanji: ["登"] },
  { word: "登山", meanings: ["Alpinisme", "Randonnee en montagne"], readings: ["とざん"], mnemonicFr: "ALPINISME - escalade de montagne.", targetKanji: ["登", "山"] },
  { word: "登録", meanings: ["Inscription", "Enregistrement"], readings: ["とうろく"], mnemonicFr: "INSCRIPTION - enregistrer officiellement.", targetKanji: ["登", "録"] },
  { word: "降りる", meanings: ["Descendre"], readings: ["おりる"], mnemonicFr: "DESCENDRE - aller vers le bas.", targetKanji: ["降"] },
  { word: "降る", meanings: ["Tomber (pluie, neige)"], readings: ["ふる"], mnemonicFr: "TOMBER - precipitation.", targetKanji: ["降"] },
  { word: "降ろす", meanings: ["Faire descendre", "Deposer"], readings: ["おろす"], mnemonicFr: "DEPOSER - mettre quelqu'un ou quelque chose plus bas.", targetKanji: ["降"] },
];

// Part 2: Communication and Daily Verbs
const vocabPart2 = [
  // Communication: 伝える, 知らせる, 報告する
  { word: "知らせる", meanings: ["Informer", "Notifier"], readings: ["しらせる"], mnemonicFr: "INFORMER - faire savoir.", targetKanji: ["知"] },
  { word: "知らせ", meanings: ["Nouvelle", "Information"], readings: ["しらせ"], mnemonicFr: "NOUVELLE - information recue.", targetKanji: ["知"] },
  { word: "報告", meanings: ["Rapport", "Compte-rendu"], readings: ["ほうこく"], mnemonicFr: "RAPPORT - presentation d'informations.", targetKanji: ["報", "告"] },
  { word: "報告する", meanings: ["Faire un rapport"], readings: ["ほうこくする"], mnemonicFr: "RAPPORTER - presenter les faits.", targetKanji: ["報", "告"] },
  { word: "報道", meanings: ["Reportage", "Presse"], readings: ["ほうどう"], mnemonicFr: "REPORTAGE - diffusion d'informations.", targetKanji: ["報", "道"] },
  { word: "告げる", meanings: ["Annoncer", "Dire"], readings: ["つげる"], mnemonicFr: "ANNONCER - faire connaitre.", targetKanji: ["告"] },
  { word: "広告", meanings: ["Publicite"], readings: ["こうこく"], mnemonicFr: "PUBLICITE - annonce commerciale.", targetKanji: ["広", "告"] },
  { word: "話し合う", meanings: ["Discuter"], readings: ["はなしあう"], mnemonicFr: "DISCUTER - echanger des idees.", targetKanji: ["話", "合"] },
  { word: "言い出す", meanings: ["Commencer a dire"], readings: ["いいだす"], mnemonicFr: "DIRE - emettre des paroles.", targetKanji: ["言", "出"] },
  { word: "伝言", meanings: ["Message"], readings: ["でんごん"], mnemonicFr: "MESSAGE - paroles transmises.", targetKanji: ["伝", "言"] },

  // Daily verbs: 洗う, 乾く, 拭く, 磨く
  { word: "洗う", meanings: ["Laver"], readings: ["あらう"], mnemonicFr: "LAVER - nettoyer avec de l'eau.", targetKanji: ["洗"] },
  { word: "洗濯", meanings: ["Lessive"], readings: ["せんたく"], mnemonicFr: "LESSIVE - lavage du linge.", targetKanji: ["洗"] },
  { word: "洗面", meanings: ["Toilette (visage)"], readings: ["せんめん"], mnemonicFr: "TOILETTE - se laver le visage.", targetKanji: ["洗", "面"] },
  { word: "乾く", meanings: ["Secher"], readings: ["かわく"], mnemonicFr: "SECHER - devenir sec.", targetKanji: ["乾"] },
  { word: "乾かす", meanings: ["Faire secher"], readings: ["かわかす"], mnemonicFr: "FAIRE SECHER - rendre sec.", targetKanji: ["乾"] },
  { word: "乾燥", meanings: ["Secheresse"], readings: ["かんそう"], mnemonicFr: "SECHERESSE - absence d'humidite.", targetKanji: ["乾"] },
  { word: "拭く", meanings: ["Essuyer"], readings: ["ふく"], mnemonicFr: "ESSUYER - nettoyer en frottant.", targetKanji: ["拭"] },
  { word: "磨く", meanings: ["Polir", "Brosser"], readings: ["みがく"], mnemonicFr: "POLIR - rendre brillant.", targetKanji: ["磨"] },
  { word: "歯磨き", meanings: ["Brossage de dents"], readings: ["はみがき"], mnemonicFr: "BROSSAGE DE DENTS - nettoyer les dents.", targetKanji: ["歯", "磨"] },

  // Shopping: 選ぶ, 比べる, 試す, 決める
  { word: "比べる", meanings: ["Comparer"], readings: ["くらべる"], mnemonicFr: "COMPARER - evaluer les differences.", targetKanji: ["比"] },
  { word: "比較", meanings: ["Comparaison"], readings: ["ひかく"], mnemonicFr: "COMPARAISON - mise en parallele.", targetKanji: ["比", "較"] },
  { word: "試す", meanings: ["Essayer", "Tester"], readings: ["ためす"], mnemonicFr: "ESSAYER - tenter de faire.", targetKanji: ["試"] },
  { word: "試み", meanings: ["Tentative", "Essai"], readings: ["こころみ"], mnemonicFr: "TENTATIVE - effort pour reussir.", targetKanji: ["試"] },
  { word: "試験", meanings: ["Examen", "Test"], readings: ["しけん"], mnemonicFr: "EXAMEN - evaluation des connaissances.", targetKanji: ["試", "験"] },
  { word: "決める", meanings: ["Decider"], readings: ["きめる"], mnemonicFr: "DECIDER - faire un choix.", targetKanji: ["決"] },
  { word: "決まる", meanings: ["Etre decide"], readings: ["きまる"], mnemonicFr: "ETRE DECIDE - etre arrete.", targetKanji: ["決"] },
  { word: "決定", meanings: ["Decision"], readings: ["けってい"], mnemonicFr: "DECISION - choix fait.", targetKanji: ["決", "定"] },
  { word: "決心", meanings: ["Resolution"], readings: ["けっしん"], mnemonicFr: "RESOLUTION - determination.", targetKanji: ["決", "心"] },
  { word: "解決", meanings: ["Solution"], readings: ["かいけつ"], mnemonicFr: "SOLUTION - reponse a un probleme.", targetKanji: ["解", "決"] },

  // Social: 招く, 訪ねる, 迎える, 送る
  { word: "招く", meanings: ["Inviter"], readings: ["まねく"], mnemonicFr: "INVITER - convier quelqu'un.", targetKanji: ["招"] },
  { word: "招待", meanings: ["Invitation"], readings: ["しょうたい"], mnemonicFr: "INVITATION - convocation amicale.", targetKanji: ["招", "待"] },
  { word: "訪ねる", meanings: ["Visiter", "Rendre visite"], readings: ["たずねる"], mnemonicFr: "VISITER - aller voir quelqu'un.", targetKanji: ["訪"] },
  { word: "訪問", meanings: ["Visite"], readings: ["ほうもん"], mnemonicFr: "VISITE - action d'aller voir.", targetKanji: ["訪", "問"] },
  { word: "迎える", meanings: ["Accueillir"], readings: ["むかえる"], mnemonicFr: "ACCUEILLIR - recevoir quelqu'un.", targetKanji: ["迎"] },
  { word: "歓迎", meanings: ["Bienvenue"], readings: ["かんげい"], mnemonicFr: "BIENVENUE - accueil chaleureux.", targetKanji: ["歓", "迎"] },
  { word: "出迎え", meanings: ["Accueil"], readings: ["でむかえ"], mnemonicFr: "ACCUEIL - aller chercher quelqu'un.", targetKanji: ["出", "迎"] },
  { word: "見送る", meanings: ["Accompagner", "Dire au revoir"], readings: ["みおくる"], mnemonicFr: "ACCOMPAGNER - raccompagner quelqu'un.", targetKanji: ["見", "送"] },
];

// Part 3: Everyday Objects and Places
const vocabPart3 = [
  // Home items
  { word: "窓", meanings: ["Fenetre"], readings: ["まど"], mnemonicFr: "FENETRE - ouverture pour la lumiere.", targetKanji: ["窓"] },
  { word: "扉", meanings: ["Porte", "Battant"], readings: ["とびら"], mnemonicFr: "PORTE - panneau qui ferme.", targetKanji: ["扉"] },
  { word: "壁", meanings: ["Mur"], readings: ["かべ"], mnemonicFr: "MUR - surface verticale.", targetKanji: ["壁"] },
  { word: "床", meanings: ["Sol", "Plancher"], readings: ["ゆか"], mnemonicFr: "SOL - surface horizontale.", targetKanji: ["床"] },
  { word: "天井", meanings: ["Plafond"], readings: ["てんじょう"], mnemonicFr: "PLAFOND - surface au-dessus.", targetKanji: ["天", "井"] },
  { word: "階段", meanings: ["Escalier"], readings: ["かいだん"], mnemonicFr: "ESCALIER - marches pour monter.", targetKanji: ["階", "段"] },
  { word: "鏡", meanings: ["Miroir"], readings: ["かがみ"], mnemonicFr: "MIROIR - surface reflechissante.", targetKanji: ["鏡"] },
  { word: "布団", meanings: ["Futon"], readings: ["ふとん"], mnemonicFr: "FUTON - matelas japonais.", targetKanji: ["布", "団"] },
  { word: "毛布", meanings: ["Couverture"], readings: ["もうふ"], mnemonicFr: "COUVERTURE - tissu pour se couvrir.", targetKanji: ["毛", "布"] },
  { word: "枕", meanings: ["Oreiller"], readings: ["まくら"], mnemonicFr: "OREILLER - coussin pour la tete.", targetKanji: ["枕"] },

  // Kitchen items
  { word: "皿", meanings: ["Assiette"], readings: ["さら"], mnemonicFr: "ASSIETTE - recipient plat.", targetKanji: ["皿"] },
  { word: "茶碗", meanings: ["Bol a riz"], readings: ["ちゃわん"], mnemonicFr: "BOL - recipient pour manger.", targetKanji: ["茶", "碗"] },
  { word: "箸", meanings: ["Baguettes"], readings: ["はし"], mnemonicFr: "BAGUETTES - ustensiles pour manger.", targetKanji: ["箸"] },
  { word: "包丁", meanings: ["Couteau de cuisine"], readings: ["ほうちょう"], mnemonicFr: "COUTEAU - lame pour couper.", targetKanji: ["包", "丁"] },
  { word: "鍋", meanings: ["Casserole", "Marmite"], readings: ["なべ"], mnemonicFr: "CASSEROLE - recipient pour cuire.", targetKanji: ["鍋"] },
  { word: "冷蔵庫", meanings: ["Refrigerateur"], readings: ["れいぞうこ"], mnemonicFr: "REFRIGERATEUR - appareil pour conserver.", targetKanji: ["冷", "蔵", "庫"] },
  { word: "電子レンジ", meanings: ["Micro-ondes"], readings: ["でんしれんじ"], mnemonicFr: "MICRO-ONDES - appareil pour chauffer.", targetKanji: ["電", "子"] },
  { word: "炊飯器", meanings: ["Cuiseur a riz"], readings: ["すいはんき"], mnemonicFr: "CUISEUR A RIZ - appareil pour cuire le riz.", targetKanji: ["炊", "飯", "器"] },

  // Common places
  { word: "駅", meanings: ["Gare"], readings: ["えき"], mnemonicFr: "GARE - lieu pour les trains.", targetKanji: ["駅"] },
  { word: "空港", meanings: ["Aeroport"], readings: ["くうこう"], mnemonicFr: "AEROPORT - lieu pour les avions.", targetKanji: ["空", "港"] },
  { word: "港", meanings: ["Port"], readings: ["みなと"], mnemonicFr: "PORT - lieu pour les bateaux.", targetKanji: ["港"] },
  { word: "橋", meanings: ["Pont"], readings: ["はし"], mnemonicFr: "PONT - passage au-dessus de l'eau.", targetKanji: ["橋"] },
  { word: "交差点", meanings: ["Carrefour"], readings: ["こうさてん"], mnemonicFr: "CARREFOUR - croisement de routes.", targetKanji: ["交", "差", "点"] },
  { word: "信号", meanings: ["Feu de signalisation"], readings: ["しんごう"], mnemonicFr: "FEU - signal lumineux.", targetKanji: ["信", "号"] },
  { word: "歩道", meanings: ["Trottoir"], readings: ["ほどう"], mnemonicFr: "TROTTOIR - chemin pour pietons.", targetKanji: ["歩", "道"] },
  { word: "横断歩道", meanings: ["Passage pieton"], readings: ["おうだんほどう"], mnemonicFr: "PASSAGE PIETON - pour traverser.", targetKanji: ["横", "断", "歩", "道"] },
];

// Part 4: Emotions and States
const vocabPart4 = [
  // Emotions
  { word: "嬉しい", meanings: ["Content", "Heureux"], readings: ["うれしい"], mnemonicFr: "CONTENT - sentiment de joie.", targetKanji: ["嬉"] },
  { word: "悲しい", meanings: ["Triste"], readings: ["かなしい"], mnemonicFr: "TRISTE - sentiment de peine.", targetKanji: ["悲"] },
  { word: "悲しむ", meanings: ["Etre triste"], readings: ["かなしむ"], mnemonicFr: "ETRE TRISTE - ressentir de la peine.", targetKanji: ["悲"] },
  { word: "怒る", meanings: ["Se facher"], readings: ["おこる"], mnemonicFr: "SE FACHER - exprimer sa colere.", targetKanji: ["怒"] },
  { word: "怒り", meanings: ["Colere"], readings: ["いかり"], mnemonicFr: "COLERE - sentiment d'irritation.", targetKanji: ["怒"] },
  { word: "驚く", meanings: ["Etre surpris"], readings: ["おどろく"], mnemonicFr: "ETRE SURPRIS - reaction inattendue.", targetKanji: ["驚"] },
  { word: "驚き", meanings: ["Surprise"], readings: ["おどろき"], mnemonicFr: "SURPRISE - etonnement.", targetKanji: ["驚"] },
  { word: "恐れる", meanings: ["Craindre"], readings: ["おそれる"], mnemonicFr: "CRAINDRE - avoir peur.", targetKanji: ["恐"] },
  { word: "恐怖", meanings: ["Peur", "Terreur"], readings: ["きょうふ"], mnemonicFr: "PEUR - sentiment de frayeur.", targetKanji: ["恐", "怖"] },
  { word: "恥ずかしい", meanings: ["Honteux", "Gene"], readings: ["はずかしい"], mnemonicFr: "GENE - sentiment de honte.", targetKanji: ["恥"] },
  { word: "寂しい", meanings: ["Solitaire", "Seul"], readings: ["さびしい"], mnemonicFr: "SOLITAIRE - sentiment d'isolement.", targetKanji: ["寂"] },
  { word: "懐かしい", meanings: ["Nostalgique"], readings: ["なつかしい"], mnemonicFr: "NOSTALGIQUE - souvenir emu.", targetKanji: ["懐"] },
  { word: "羨ましい", meanings: ["Envieux"], readings: ["うらやましい"], mnemonicFr: "ENVIEUX - desir de ce que l'autre a.", targetKanji: ["羨"] },

  // Physical states
  { word: "疲れる", meanings: ["Etre fatigue"], readings: ["つかれる"], mnemonicFr: "ETRE FATIGUE - manquer d'energie.", targetKanji: ["疲"] },
  { word: "疲労", meanings: ["Fatigue"], readings: ["ひろう"], mnemonicFr: "FATIGUE - epuisement.", targetKanji: ["疲", "労"] },
  { word: "眠い", meanings: ["Somnolent"], readings: ["ねむい"], mnemonicFr: "SOMNOLENT - avoir envie de dormir.", targetKanji: ["眠"] },
  { word: "眠る", meanings: ["Dormir"], readings: ["ねむる"], mnemonicFr: "DORMIR - etre endormi.", targetKanji: ["眠"] },
  { word: "起きる", meanings: ["Se lever", "Se reveiller"], readings: ["おきる"], mnemonicFr: "SE LEVER - sortir du lit.", targetKanji: ["起"] },
  { word: "起こす", meanings: ["Reveiller"], readings: ["おこす"], mnemonicFr: "REVEILLER - faire se lever.", targetKanji: ["起"] },
  { word: "空腹", meanings: ["Faim"], readings: ["くうふく"], mnemonicFr: "FAIM - estomac vide.", targetKanji: ["空", "腹"] },
  { word: "満腹", meanings: ["Rassasie"], readings: ["まんぷく"], mnemonicFr: "RASSASIE - estomac plein.", targetKanji: ["満", "腹"] },
  { word: "喉が渇く", meanings: ["Avoir soif"], readings: ["のどがかわく"], mnemonicFr: "AVOIR SOIF - gorge seche.", targetKanji: ["喉", "渇"] },
];

// Part 5: Time and Weather
const vocabPart5 = [
  // Time expressions
  { word: "朝", meanings: ["Matin"], readings: ["あさ"], mnemonicFr: "MATIN - debut de la journee.", targetKanji: ["朝"] },
  { word: "朝食", meanings: ["Petit-dejeuner"], readings: ["ちょうしょく"], mnemonicFr: "PETIT-DEJEUNER - repas du matin.", targetKanji: ["朝", "食"] },
  { word: "昼", meanings: ["Midi", "Jour"], readings: ["ひる"], mnemonicFr: "MIDI - milieu de la journee.", targetKanji: ["昼"] },
  { word: "昼食", meanings: ["Dejeuner"], readings: ["ちゅうしょく"], mnemonicFr: "DEJEUNER - repas de midi.", targetKanji: ["昼", "食"] },
  { word: "昼間", meanings: ["La journee"], readings: ["ひるま"], mnemonicFr: "JOURNEE - pendant le jour.", targetKanji: ["昼", "間"] },
  { word: "夕方", meanings: ["Soir"], readings: ["ゆうがた"], mnemonicFr: "SOIR - fin de journee.", targetKanji: ["夕", "方"] },
  { word: "夕食", meanings: ["Diner"], readings: ["ゆうしょく"], mnemonicFr: "DINER - repas du soir.", targetKanji: ["夕", "食"] },
  { word: "夜中", meanings: ["Milieu de la nuit"], readings: ["よなか"], mnemonicFr: "MILIEU DE LA NUIT - tres tard.", targetKanji: ["夜", "中"] },
  { word: "深夜", meanings: ["Nuit profonde"], readings: ["しんや"], mnemonicFr: "NUIT PROFONDE - tres tard le soir.", targetKanji: ["深", "夜"] },
  { word: "明け方", meanings: ["Aube"], readings: ["あけがた"], mnemonicFr: "AUBE - debut du jour.", targetKanji: ["明", "方"] },
  { word: "日の出", meanings: ["Lever du soleil"], readings: ["ひので"], mnemonicFr: "LEVER DU SOLEIL - l'aube.", targetKanji: ["日", "出"] },
  { word: "日没", meanings: ["Coucher du soleil"], readings: ["にちぼつ"], mnemonicFr: "COUCHER DU SOLEIL - crepuscule.", targetKanji: ["日", "没"] },

  // Weather
  { word: "天気", meanings: ["Temps", "Meteo"], readings: ["てんき"], mnemonicFr: "TEMPS - conditions meteorologiques.", targetKanji: ["天", "気"] },
  { word: "天気予報", meanings: ["Previsions meteo"], readings: ["てんきよほう"], mnemonicFr: "PREVISIONS METEO - annonce du temps.", targetKanji: ["天", "気", "予", "報"] },
  { word: "晴れ", meanings: ["Beau temps"], readings: ["はれ"], mnemonicFr: "BEAU TEMPS - ciel degage.", targetKanji: ["晴"] },
  { word: "晴れる", meanings: ["S'eclaircir"], readings: ["はれる"], mnemonicFr: "S'ECLAIRCIR - devenir ensoleille.", targetKanji: ["晴"] },
  { word: "曇り", meanings: ["Nuageux"], readings: ["くもり"], mnemonicFr: "NUAGEUX - ciel couvert.", targetKanji: ["曇"] },
  { word: "曇る", meanings: ["Se couvrir"], readings: ["くもる"], mnemonicFr: "SE COUVRIR - devenir nuageux.", targetKanji: ["曇"] },
  { word: "雷", meanings: ["Tonnerre", "Foudre"], readings: ["かみなり"], mnemonicFr: "TONNERRE - bruit de l'orage.", targetKanji: ["雷"] },
  { word: "台風", meanings: ["Typhon"], readings: ["たいふう"], mnemonicFr: "TYPHON - tempete tropicale.", targetKanji: ["台", "風"] },
  { word: "地震", meanings: ["Tremblement de terre"], readings: ["じしん"], mnemonicFr: "SEISME - secousse tellurique.", targetKanji: ["地", "震"] },
  { word: "霧", meanings: ["Brouillard"], readings: ["きり"], mnemonicFr: "BROUILLARD - vapeur d'eau basse.", targetKanji: ["霧"] },
];

// Part 6: Work and School
const vocabPart6 = [
  // Work
  { word: "仕事", meanings: ["Travail"], readings: ["しごと"], mnemonicFr: "TRAVAIL - activite professionnelle.", targetKanji: ["仕", "事"] },
  { word: "会議", meanings: ["Reunion"], readings: ["かいぎ"], mnemonicFr: "REUNION - rassemblement de travail.", targetKanji: ["会", "議"] },
  { word: "会社員", meanings: ["Employe de bureau"], readings: ["かいしゃいん"], mnemonicFr: "EMPLOYE - travailleur de societe.", targetKanji: ["会", "社", "員"] },
  { word: "上司", meanings: ["Superieur"], readings: ["じょうし"], mnemonicFr: "SUPERIEUR - chef au travail.", targetKanji: ["上", "司"] },
  { word: "部下", meanings: ["Subordonne"], readings: ["ぶか"], mnemonicFr: "SUBORDONNE - employe sous les ordres.", targetKanji: ["部", "下"] },
  { word: "同僚", meanings: ["Collegue"], readings: ["どうりょう"], mnemonicFr: "COLLEGUE - camarade de travail.", targetKanji: ["同", "僚"] },
  { word: "給料", meanings: ["Salaire"], readings: ["きゅうりょう"], mnemonicFr: "SALAIRE - paiement du travail.", targetKanji: ["給", "料"] },
  { word: "残業", meanings: ["Heures supplementaires"], readings: ["ざんぎょう"], mnemonicFr: "HEURES SUP - travail en plus.", targetKanji: ["残", "業"] },
  { word: "休憩", meanings: ["Pause"], readings: ["きゅうけい"], mnemonicFr: "PAUSE - moment de repos.", targetKanji: ["休", "憩"] },
  { word: "退社", meanings: ["Quitter le bureau"], readings: ["たいしゃ"], mnemonicFr: "QUITTER - partir du travail.", targetKanji: ["退", "社"] },
  { word: "出社", meanings: ["Aller au bureau"], readings: ["しゅっしゃ"], mnemonicFr: "ALLER AU BUREAU - arriver au travail.", targetKanji: ["出", "社"] },

  // School
  { word: "授業", meanings: ["Cours"], readings: ["じゅぎょう"], mnemonicFr: "COURS - lecon a l'ecole.", targetKanji: ["授", "業"] },
  { word: "宿題", meanings: ["Devoirs"], readings: ["しゅくだい"], mnemonicFr: "DEVOIRS - travail a la maison.", targetKanji: ["宿", "題"] },
  { word: "教科書", meanings: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "MANUEL - livre de cours.", targetKanji: ["教", "科", "書"] },
  { word: "黒板", meanings: ["Tableau noir"], readings: ["こくばん"], mnemonicFr: "TABLEAU - surface pour ecrire.", targetKanji: ["黒", "板"] },
  { word: "成績", meanings: ["Notes", "Resultats"], readings: ["せいせき"], mnemonicFr: "NOTES - evaluation scolaire.", targetKanji: ["成", "績"] },
  { word: "卒業", meanings: ["Diplome"], readings: ["そつぎょう"], mnemonicFr: "DIPLOME - fin des etudes.", targetKanji: ["卒", "業"] },
  { word: "入学", meanings: ["Entree a l'ecole"], readings: ["にゅうがく"], mnemonicFr: "ENTREE - debut des etudes.", targetKanji: ["入", "学"] },
  { word: "学期", meanings: ["Semestre"], readings: ["がっき"], mnemonicFr: "SEMESTRE - periode scolaire.", targetKanji: ["学", "期"] },
  { word: "夏休み", meanings: ["Vacances d'ete"], readings: ["なつやすみ"], mnemonicFr: "VACANCES D'ETE - conge estival.", targetKanji: ["夏", "休"] },
  { word: "冬休み", meanings: ["Vacances d'hiver"], readings: ["ふゆやすみ"], mnemonicFr: "VACANCES D'HIVER - conge hivernal.", targetKanji: ["冬", "休"] },
];

// Part 7: Transportation and Travel
const vocabPart7 = [
  // Transportation
  { word: "電車", meanings: ["Train"], readings: ["でんしゃ"], mnemonicFr: "TRAIN - transport ferroviaire.", targetKanji: ["電", "車"] },
  { word: "地下鉄", meanings: ["Metro"], readings: ["ちかてつ"], mnemonicFr: "METRO - train souterrain.", targetKanji: ["地", "下", "鉄"] },
  { word: "新幹線", meanings: ["Shinkansen"], readings: ["しんかんせん"], mnemonicFr: "SHINKANSEN - train a grande vitesse.", targetKanji: ["新", "幹", "線"] },
  { word: "乗る", meanings: ["Monter (vehicule)"], readings: ["のる"], mnemonicFr: "MONTER - prendre un transport.", targetKanji: ["乗"] },
  { word: "乗り換える", meanings: ["Changer (de ligne)"], readings: ["のりかえる"], mnemonicFr: "CHANGER - prendre une correspondance.", targetKanji: ["乗", "換"] },
  { word: "乗り物", meanings: ["Vehicule"], readings: ["のりもの"], mnemonicFr: "VEHICULE - moyen de transport.", targetKanji: ["乗", "物"] },
  { word: "切符", meanings: ["Billet"], readings: ["きっぷ"], mnemonicFr: "BILLET - titre de transport.", targetKanji: ["切", "符"] },
  { word: "定期券", meanings: ["Abonnement"], readings: ["ていきけん"], mnemonicFr: "ABONNEMENT - pass de transport.", targetKanji: ["定", "期", "券"] },
  { word: "改札", meanings: ["Portillon"], readings: ["かいさつ"], mnemonicFr: "PORTILLON - entree de gare.", targetKanji: ["改", "札"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - passage pour sortir.", targetKanji: ["出", "口"] },
  { word: "入口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - passage pour entrer.", targetKanji: ["入", "口"] },
  { word: "乗客", meanings: ["Passager"], readings: ["じょうきゃく"], mnemonicFr: "PASSAGER - personne transportee.", targetKanji: ["乗", "客"] },

  // Travel
  { word: "旅行", meanings: ["Voyage"], readings: ["りょこう"], mnemonicFr: "VOYAGE - deplacement lointain.", targetKanji: ["旅", "行"] },
  { word: "旅館", meanings: ["Auberge japonaise"], readings: ["りょかん"], mnemonicFr: "RYOKAN - hotel traditionnel.", targetKanji: ["旅", "館"] },
  { word: "予約", meanings: ["Reservation"], readings: ["よやく"], mnemonicFr: "RESERVATION - reserver a l'avance.", targetKanji: ["予", "約"] },
  { word: "観光", meanings: ["Tourisme"], readings: ["かんこう"], mnemonicFr: "TOURISME - visite touristique.", targetKanji: ["観", "光"] },
  { word: "観光客", meanings: ["Touriste"], readings: ["かんこうきゃく"], mnemonicFr: "TOURISTE - visiteur.", targetKanji: ["観", "光", "客"] },
  { word: "名所", meanings: ["Site celebre"], readings: ["めいしょ"], mnemonicFr: "SITE CELEBRE - lieu connu.", targetKanji: ["名", "所"] },
  { word: "温泉", meanings: ["Source chaude"], readings: ["おんせん"], mnemonicFr: "ONSEN - bain thermal.", targetKanji: ["温", "泉"] },
  { word: "土産", meanings: ["Souvenir"], readings: ["みやげ"], mnemonicFr: "SOUVENIR - cadeau de voyage.", targetKanji: ["土", "産"] },
];

// Part 8: Food and Cooking
const vocabPart8 = [
  // Cooking actions
  { word: "料理", meanings: ["Cuisine", "Plat"], readings: ["りょうり"], mnemonicFr: "CUISINE - art culinaire.", targetKanji: ["料", "理"] },
  { word: "調理", meanings: ["Preparation culinaire"], readings: ["ちょうり"], mnemonicFr: "PREPARATION - preparer un plat.", targetKanji: ["調", "理"] },
  { word: "焼く", meanings: ["Griller", "Cuire"], readings: ["やく"], mnemonicFr: "GRILLER - cuire au feu.", targetKanji: ["焼"] },
  { word: "煮る", meanings: ["Mijoter"], readings: ["にる"], mnemonicFr: "MIJOTER - cuire dans un liquide.", targetKanji: ["煮"] },
  { word: "蒸す", meanings: ["Cuire a la vapeur"], readings: ["むす"], mnemonicFr: "VAPEUR - cuire par la vapeur.", targetKanji: ["蒸"] },
  { word: "揚げる", meanings: ["Frire"], readings: ["あげる"], mnemonicFr: "FRIRE - cuire dans l'huile.", targetKanji: ["揚"] },
  { word: "炒める", meanings: ["Sauter", "Faire revenir"], readings: ["いためる"], mnemonicFr: "SAUTER - cuire rapidement.", targetKanji: ["炒"] },
  { word: "切る", meanings: ["Couper"], readings: ["きる"], mnemonicFr: "COUPER - diviser avec une lame.", targetKanji: ["切"] },
  { word: "混ぜる", meanings: ["Melanger"], readings: ["まぜる"], mnemonicFr: "MELANGER - combiner ensemble.", targetKanji: ["混"] },
  { word: "味", meanings: ["Gout"], readings: ["あじ"], mnemonicFr: "GOUT - saveur.", targetKanji: ["味"] },
  { word: "味わう", meanings: ["Savourer"], readings: ["あじわう"], mnemonicFr: "SAVOURER - apprecier le gout.", targetKanji: ["味"] },

  // Food items
  { word: "野菜", meanings: ["Legume"], readings: ["やさい"], mnemonicFr: "LEGUME - plante comestible.", targetKanji: ["野", "菜"] },
  { word: "果物", meanings: ["Fruit"], readings: ["くだもの"], mnemonicFr: "FRUIT - produit d'un arbre.", targetKanji: ["果", "物"] },
  { word: "肉", meanings: ["Viande"], readings: ["にく"], mnemonicFr: "VIANDE - chair animale.", targetKanji: ["肉"] },
  { word: "牛肉", meanings: ["Boeuf"], readings: ["ぎゅうにく"], mnemonicFr: "BOEUF - viande de vache.", targetKanji: ["牛", "肉"] },
  { word: "豚肉", meanings: ["Porc"], readings: ["ぶたにく"], mnemonicFr: "PORC - viande de cochon.", targetKanji: ["豚", "肉"] },
  { word: "鶏肉", meanings: ["Poulet"], readings: ["とりにく"], mnemonicFr: "POULET - viande de volaille.", targetKanji: ["鶏", "肉"] },
  { word: "魚", meanings: ["Poisson"], readings: ["さかな"], mnemonicFr: "POISSON - animal aquatique.", targetKanji: ["魚"] },
  { word: "卵", meanings: ["Oeuf"], readings: ["たまご"], mnemonicFr: "OEUF - produit de poule.", targetKanji: ["卵"] },
  { word: "塩", meanings: ["Sel"], readings: ["しお"], mnemonicFr: "SEL - assaisonnement sale.", targetKanji: ["塩"] },
  { word: "砂糖", meanings: ["Sucre"], readings: ["さとう"], mnemonicFr: "SUCRE - substance sucree.", targetKanji: ["砂", "糖"] },
  { word: "醤油", meanings: ["Sauce soja"], readings: ["しょうゆ"], mnemonicFr: "SAUCE SOJA - assaisonnement japonais.", targetKanji: ["醤", "油"] },
];

// Part 9: Body and Health
const vocabPart9 = [
  // Body parts
  { word: "顔", meanings: ["Visage"], readings: ["かお"], mnemonicFr: "VISAGE - face.", targetKanji: ["顔"] },
  { word: "目", meanings: ["Oeil"], readings: ["め"], mnemonicFr: "OEIL - organe de la vue.", targetKanji: ["目"] },
  { word: "耳", meanings: ["Oreille"], readings: ["みみ"], mnemonicFr: "OREILLE - organe de l'ouie.", targetKanji: ["耳"] },
  { word: "鼻", meanings: ["Nez"], readings: ["はな"], mnemonicFr: "NEZ - organe de l'odorat.", targetKanji: ["鼻"] },
  { word: "口", meanings: ["Bouche"], readings: ["くち"], mnemonicFr: "BOUCHE - organe de la parole.", targetKanji: ["口"] },
  { word: "歯", meanings: ["Dent"], readings: ["は"], mnemonicFr: "DENT - pour macher.", targetKanji: ["歯"] },
  { word: "舌", meanings: ["Langue"], readings: ["した"], mnemonicFr: "LANGUE - organe du gout.", targetKanji: ["舌"] },
  { word: "喉", meanings: ["Gorge"], readings: ["のど"], mnemonicFr: "GORGE - passage de la nourriture.", targetKanji: ["喉"] },
  { word: "肩", meanings: ["Epaule"], readings: ["かた"], mnemonicFr: "EPAULE - haut du bras.", targetKanji: ["肩"] },
  { word: "腕", meanings: ["Bras"], readings: ["うで"], mnemonicFr: "BRAS - membre superieur.", targetKanji: ["腕"] },
  { word: "手", meanings: ["Main"], readings: ["て"], mnemonicFr: "MAIN - extremite du bras.", targetKanji: ["手"] },
  { word: "胸", meanings: ["Poitrine"], readings: ["むね"], mnemonicFr: "POITRINE - torse.", targetKanji: ["胸"] },
  { word: "腹", meanings: ["Ventre"], readings: ["はら"], mnemonicFr: "VENTRE - abdomen.", targetKanji: ["腹"] },
  { word: "背中", meanings: ["Dos"], readings: ["せなか"], mnemonicFr: "DOS - partie arriere du corps.", targetKanji: ["背", "中"] },
  { word: "腰", meanings: ["Hanches", "Taille"], readings: ["こし"], mnemonicFr: "HANCHES - partie du bassin.", targetKanji: ["腰"] },
  { word: "脚", meanings: ["Jambe"], readings: ["あし"], mnemonicFr: "JAMBE - membre inferieur.", targetKanji: ["脚"] },
  { word: "膝", meanings: ["Genou"], readings: ["ひざ"], mnemonicFr: "GENOU - articulation de la jambe.", targetKanji: ["膝"] },
  { word: "足首", meanings: ["Cheville"], readings: ["あしくび"], mnemonicFr: "CHEVILLE - articulation du pied.", targetKanji: ["足", "首"] },

  // Health
  { word: "風邪", meanings: ["Rhume"], readings: ["かぜ"], mnemonicFr: "RHUME - maladie courante.", targetKanji: ["風", "邪"] },
  { word: "熱がある", meanings: ["Avoir de la fievre"], readings: ["ねつがある"], mnemonicFr: "FIEVRE - temperature elevee.", targetKanji: ["熱"] },
  { word: "頭痛", meanings: ["Mal de tete"], readings: ["ずつう"], mnemonicFr: "MAL DE TETE - douleur cranienne.", targetKanji: ["頭", "痛"] },
  { word: "腹痛", meanings: ["Mal de ventre"], readings: ["ふくつう"], mnemonicFr: "MAL DE VENTRE - douleur abdominale.", targetKanji: ["腹", "痛"] },
  { word: "咳", meanings: ["Toux"], readings: ["せき"], mnemonicFr: "TOUX - expulsion d'air.", targetKanji: ["咳"] },
  { word: "薬", meanings: ["Medicament"], readings: ["くすり"], mnemonicFr: "MEDICAMENT - remede.", targetKanji: ["薬"] },
  { word: "注射", meanings: ["Injection"], readings: ["ちゅうしゃ"], mnemonicFr: "INJECTION - piqure.", targetKanji: ["注", "射"] },
  { word: "診察", meanings: ["Examen medical"], readings: ["しんさつ"], mnemonicFr: "EXAMEN - consultation medicale.", targetKanji: ["診", "察"] },
  { word: "治療", meanings: ["Traitement"], readings: ["ちりょう"], mnemonicFr: "TRAITEMENT - soins medicaux.", targetKanji: ["治", "療"] },
  { word: "回復", meanings: ["Retablissement"], readings: ["かいふく"], mnemonicFr: "RETABLISSEMENT - guerison.", targetKanji: ["回", "復"] },
];

// Part 10: Numbers and Quantities
const vocabPart10 = [
  // Numbers
  { word: "数字", meanings: ["Chiffre"], readings: ["すうじ"], mnemonicFr: "CHIFFRE - symbole numerique.", targetKanji: ["数", "字"] },
  { word: "番号", meanings: ["Numero"], readings: ["ばんごう"], mnemonicFr: "NUMERO - chiffre d'identification.", targetKanji: ["番", "号"] },
  { word: "半分", meanings: ["Moitie"], readings: ["はんぶん"], mnemonicFr: "MOITIE - la moitie.", targetKanji: ["半", "分"] },
  { word: "倍", meanings: ["Double", "Fois"], readings: ["ばい"], mnemonicFr: "DOUBLE - multiplie par deux.", targetKanji: ["倍"] },
  { word: "合計", meanings: ["Total"], readings: ["ごうけい"], mnemonicFr: "TOTAL - somme de tout.", targetKanji: ["合", "計"] },
  { word: "平均", meanings: ["Moyenne"], readings: ["へいきん"], mnemonicFr: "MOYENNE - valeur centrale.", targetKanji: ["平", "均"] },
  { word: "余り", meanings: ["Reste"], readings: ["あまり"], mnemonicFr: "RESTE - ce qui reste.", targetKanji: ["余"] },
  { word: "増加", meanings: ["Augmentation"], readings: ["ぞうか"], mnemonicFr: "AUGMENTATION - hausse.", targetKanji: ["増", "加"] },
  { word: "減少", meanings: ["Diminution"], readings: ["げんしょう"], mnemonicFr: "DIMINUTION - baisse.", targetKanji: ["減", "少"] },

  // Quantities
  { word: "全部", meanings: ["Tout", "Totalite"], readings: ["ぜんぶ"], mnemonicFr: "TOUT - la totalite.", targetKanji: ["全", "部"] },
  { word: "一部", meanings: ["Une partie"], readings: ["いちぶ"], mnemonicFr: "PARTIE - une portion.", targetKanji: ["一", "部"] },
  { word: "大部分", meanings: ["La plupart"], readings: ["だいぶぶん"], mnemonicFr: "LA PLUPART - majorite.", targetKanji: ["大", "部", "分"] },
  { word: "少し", meanings: ["Un peu"], readings: ["すこし"], mnemonicFr: "UN PEU - petite quantite.", targetKanji: ["少"] },
  { word: "多く", meanings: ["Beaucoup"], readings: ["おおく"], mnemonicFr: "BEAUCOUP - grande quantite.", targetKanji: ["多"] },
  { word: "十分", meanings: ["Suffisant"], readings: ["じゅうぶん"], mnemonicFr: "SUFFISANT - assez.", targetKanji: ["十", "分"] },
  { word: "不足", meanings: ["Insuffisance"], readings: ["ふそく"], mnemonicFr: "INSUFFISANCE - manque.", targetKanji: ["不", "足"] },
  { word: "過剰", meanings: ["Exces"], readings: ["かじょう"], mnemonicFr: "EXCES - trop.", targetKanji: ["過", "剰"] },
];

// Part 11: Nature and Environment
const vocabPart11 = [
  // Nature
  { word: "森", meanings: ["Foret"], readings: ["もり"], mnemonicFr: "FORET - zone boisee.", targetKanji: ["森"] },
  { word: "林", meanings: ["Bois"], readings: ["はやし"], mnemonicFr: "BOIS - petite foret.", targetKanji: ["林"] },
  { word: "川", meanings: ["Riviere"], readings: ["かわ"], mnemonicFr: "RIVIERE - cours d'eau.", targetKanji: ["川"] },
  { word: "海", meanings: ["Mer"], readings: ["うみ"], mnemonicFr: "MER - grande etendue d'eau salee.", targetKanji: ["海"] },
  { word: "山", meanings: ["Montagne"], readings: ["やま"], mnemonicFr: "MONTAGNE - elevation de terrain.", targetKanji: ["山"] },
  { word: "丘", meanings: ["Colline"], readings: ["おか"], mnemonicFr: "COLLINE - petite montagne.", targetKanji: ["丘"] },
  { word: "谷", meanings: ["Vallee"], readings: ["たに"], mnemonicFr: "VALLEE - creux entre montagnes.", targetKanji: ["谷"] },
  { word: "滝", meanings: ["Cascade"], readings: ["たき"], mnemonicFr: "CASCADE - chute d'eau.", targetKanji: ["滝"] },
  { word: "池", meanings: ["Etang"], readings: ["いけ"], mnemonicFr: "ETANG - petite etendue d'eau.", targetKanji: ["池"] },
  { word: "岩", meanings: ["Rocher"], readings: ["いわ"], mnemonicFr: "ROCHER - grosse pierre.", targetKanji: ["岩"] },
  { word: "砂", meanings: ["Sable"], readings: ["すな"], mnemonicFr: "SABLE - grains fins.", targetKanji: ["砂"] },
  { word: "草", meanings: ["Herbe"], readings: ["くさ"], mnemonicFr: "HERBE - vegetation basse.", targetKanji: ["草"] },
  { word: "花", meanings: ["Fleur"], readings: ["はな"], mnemonicFr: "FLEUR - partie coloree de la plante.", targetKanji: ["花"] },
  { word: "木の葉", meanings: ["Feuille d'arbre"], readings: ["このは"], mnemonicFr: "FEUILLE - partie verte de l'arbre.", targetKanji: ["木", "葉"] },
  { word: "枝", meanings: ["Branche"], readings: ["えだ"], mnemonicFr: "BRANCHE - partie de l'arbre.", targetKanji: ["枝"] },
  { word: "根", meanings: ["Racine"], readings: ["ね"], mnemonicFr: "RACINE - partie souterraine.", targetKanji: ["根"] },

  // Animals
  { word: "動物", meanings: ["Animal"], readings: ["どうぶつ"], mnemonicFr: "ANIMAL - etre vivant.", targetKanji: ["動", "物"] },
  { word: "犬", meanings: ["Chien"], readings: ["いぬ"], mnemonicFr: "CHIEN - animal domestique.", targetKanji: ["犬"] },
  { word: "猫", meanings: ["Chat"], readings: ["ねこ"], mnemonicFr: "CHAT - felin domestique.", targetKanji: ["猫"] },
  { word: "鳥", meanings: ["Oiseau"], readings: ["とり"], mnemonicFr: "OISEAU - animal a plumes.", targetKanji: ["鳥"] },
  { word: "虫", meanings: ["Insecte"], readings: ["むし"], mnemonicFr: "INSECTE - petit animal.", targetKanji: ["虫"] },
  { word: "蝶", meanings: ["Papillon"], readings: ["ちょう"], mnemonicFr: "PAPILLON - insecte volant.", targetKanji: ["蝶"] },
  { word: "蜂", meanings: ["Abeille"], readings: ["はち"], mnemonicFr: "ABEILLE - insecte producteur de miel.", targetKanji: ["蜂"] },
  { word: "蛇", meanings: ["Serpent"], readings: ["へび"], mnemonicFr: "SERPENT - reptile sans pattes.", targetKanji: ["蛇"] },
];

// Part 12: Additional Daily Expressions
const vocabPart12 = [
  // Daily expressions
  { word: "挨拶", meanings: ["Salutation"], readings: ["あいさつ"], mnemonicFr: "SALUTATION - formule de politesse.", targetKanji: ["挨", "拶"] },
  { word: "約束", meanings: ["Promesse"], readings: ["やくそく"], mnemonicFr: "PROMESSE - engagement.", targetKanji: ["約", "束"] },
  { word: "予定", meanings: ["Programme", "Plan"], readings: ["よてい"], mnemonicFr: "PROGRAMME - ce qui est prevu.", targetKanji: ["予", "定"] },
  { word: "計画", meanings: ["Plan", "Projet"], readings: ["けいかく"], mnemonicFr: "PLAN - projet organise.", targetKanji: ["計", "画"] },
  { word: "準備", meanings: ["Preparation"], readings: ["じゅんび"], mnemonicFr: "PREPARATION - se preparer.", targetKanji: ["準", "備"] },
  { word: "支度", meanings: ["Preparation"], readings: ["したく"], mnemonicFr: "PREPARATION - se preparer.", targetKanji: ["支", "度"] },
  { word: "確認", meanings: ["Confirmation"], readings: ["かくにん"], mnemonicFr: "CONFIRMATION - verifier.", targetKanji: ["確", "認"] },
  { word: "連絡", meanings: ["Contact"], readings: ["れんらく"], mnemonicFr: "CONTACT - communication.", targetKanji: ["連", "絡"] },
  { word: "返事", meanings: ["Reponse"], readings: ["へんじ"], mnemonicFr: "REPONSE - reaction.", targetKanji: ["返", "事"] },
  { word: "質問", meanings: ["Question"], readings: ["しつもん"], mnemonicFr: "QUESTION - demande.", targetKanji: ["質", "問"] },
  { word: "回答", meanings: ["Reponse"], readings: ["かいとう"], mnemonicFr: "REPONSE - solution.", targetKanji: ["回", "答"] },
  { word: "理由", meanings: ["Raison"], readings: ["りゆう"], mnemonicFr: "RAISON - motif.", targetKanji: ["理", "由"] },
  { word: "結論", meanings: ["Conclusion"], readings: ["けつろん"], mnemonicFr: "CONCLUSION - fin du raisonnement.", targetKanji: ["結", "論"] },
  { word: "意味", meanings: ["Sens", "Signification"], readings: ["いみ"], mnemonicFr: "SENS - ce que cela veut dire.", targetKanji: ["意", "味"] },
  { word: "目的", meanings: ["But", "Objectif"], readings: ["もくてき"], mnemonicFr: "BUT - ce qu'on veut atteindre.", targetKanji: ["目", "的"] },
  { word: "方法", meanings: ["Methode"], readings: ["ほうほう"], mnemonicFr: "METHODE - facon de faire.", targetKanji: ["方", "法"] },
  { word: "問題", meanings: ["Probleme"], readings: ["もんだい"], mnemonicFr: "PROBLEME - difficulte.", targetKanji: ["問", "題"] },
  { word: "原因", meanings: ["Cause"], readings: ["げんいん"], mnemonicFr: "CAUSE - origine.", targetKanji: ["原", "因"] },
  { word: "結果", meanings: ["Resultat"], readings: ["けっか"], mnemonicFr: "RESULTAT - consequence.", targetKanji: ["結", "果"] },
  { word: "影響", meanings: ["Influence"], readings: ["えいきょう"], mnemonicFr: "INFLUENCE - effet sur quelque chose.", targetKanji: ["影", "響"] },
  { word: "関係", meanings: ["Relation"], readings: ["かんけい"], mnemonicFr: "RELATION - lien.", targetKanji: ["関", "係"] },
  { word: "違い", meanings: ["Difference"], readings: ["ちがい"], mnemonicFr: "DIFFERENCE - ce qui distingue.", targetKanji: ["違"] },
  { word: "違う", meanings: ["Differer", "Etre different"], readings: ["ちがう"], mnemonicFr: "DIFFERER - ne pas etre pareil.", targetKanji: ["違"] },
  { word: "同じ", meanings: ["Meme", "Identique"], readings: ["おなじ"], mnemonicFr: "MEME - identique.", targetKanji: ["同"] },
  { word: "似る", meanings: ["Ressembler"], readings: ["にる"], mnemonicFr: "RESSEMBLER - etre similaire.", targetKanji: ["似"] },
  { word: "似ている", meanings: ["Se ressembler"], readings: ["にている"], mnemonicFr: "SE RESSEMBLER - etre semblable.", targetKanji: ["似"] },
];

async function main() {
  console.log("=== SEED VOCAB BATCH 12: Everyday Actions & Daily Life ===\n");

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

  console.log(`Total vocabulary items to process: ${allVocab.length}`);

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
  console.log(`\n=== RESULTS ===`);
  console.log(`Added: ${added}`);
  console.log(`Skipped (already exists): ${skipped - missingKanjiCount}`);
  console.log(`Skipped (missing kanji): ${missingKanjiCount}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
