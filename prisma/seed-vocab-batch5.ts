import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary batch 5: Compound words using common kanji (JLPT N5-N3)
// Focus: 人, 日, 時, 間, 前, 後, 中, 内, 外, 上, 下, 方, 会, 社, 学, 校, 生, 活, 気

// Part 1: 人 (Person) compounds and related
const vocabPart1 = [
  // 人 compounds
  { word: "日本人", meanings: ["Japonais (personne)"], readings: ["にほんじん"], mnemonicFr: "JAPONAIS - personne du Japon, du pays du soleil levant.", targetKanji: ["日", "本", "人"] },
  { word: "外国人", meanings: ["Etranger"], readings: ["がいこくじん"], mnemonicFr: "ETRANGER - personne d'un pays exterieur.", targetKanji: ["外", "国", "人"] },
  { word: "社会人", meanings: ["Adulte actif", "Membre de la societe"], readings: ["しゃかいじん"], mnemonicFr: "ADULTE ACTIF - personne qui travaille dans la societe.", targetKanji: ["社", "会", "人"] },
  { word: "会社員", meanings: ["Employe de bureau"], readings: ["かいしゃいん"], mnemonicFr: "EMPLOYE - membre d'une entreprise.", targetKanji: ["会", "社", "員"] },
  { word: "大人", meanings: ["Adulte"], readings: ["おとな"], mnemonicFr: "ADULTE - grande personne, personne mature.", targetKanji: ["大", "人"] },
  { word: "一人", meanings: ["Une personne", "Seul"], readings: ["ひとり"], mnemonicFr: "SEUL - une seule personne.", targetKanji: ["一", "人"] },
  { word: "二人", meanings: ["Deux personnes"], readings: ["ふたり"], mnemonicFr: "DEUX PERSONNES - un couple ou duo.", targetKanji: ["二", "人"] },
  { word: "三人", meanings: ["Trois personnes"], readings: ["さんにん"], mnemonicFr: "TROIS PERSONNES - petit groupe.", targetKanji: ["三", "人"] },
  { word: "何人", meanings: ["Combien de personnes"], readings: ["なんにん"], mnemonicFr: "COMBIEN - question sur le nombre de personnes.", targetKanji: ["何", "人"] },
  { word: "人間", meanings: ["Etre humain"], readings: ["にんげん"], mnemonicFr: "ETRE HUMAIN - l'homme entre ciel et terre.", targetKanji: ["人", "間"] },
  { word: "人生", meanings: ["Vie humaine"], readings: ["じんせい"], mnemonicFr: "VIE - la vie d'une personne.", targetKanji: ["人", "生"] },
  { word: "人口", meanings: ["Population"], readings: ["じんこう"], mnemonicFr: "POPULATION - nombre de bouches a nourrir.", targetKanji: ["人", "口"] },
  { word: "人気", meanings: ["Popularite"], readings: ["にんき"], mnemonicFr: "POPULARITE - l'energie des gens vers quelque chose.", targetKanji: ["人", "気"] },
  { word: "人物", meanings: ["Personnage", "Personnalite"], readings: ["じんぶつ"], mnemonicFr: "PERSONNAGE - une personne importante.", targetKanji: ["人", "物"] },
  { word: "恋人", meanings: ["Amoureux", "Petit ami"], readings: ["こいびと"], mnemonicFr: "AMOUREUX - la personne qu'on aime.", targetKanji: ["恋", "人"] },
  { word: "友人", meanings: ["Ami"], readings: ["ゆうじん"], mnemonicFr: "AMI - personne avec qui on est lie.", targetKanji: ["友", "人"] },
  { word: "本人", meanings: ["La personne elle-meme"], readings: ["ほんにん"], mnemonicFr: "LA PERSONNE CONCERNEE - l'individu en question.", targetKanji: ["本", "人"] },
  { word: "個人", meanings: ["Individu"], readings: ["こじん"], mnemonicFr: "INDIVIDU - une personne unique.", targetKanji: ["個", "人"] },
  { word: "全員", meanings: ["Tout le monde"], readings: ["ぜんいん"], mnemonicFr: "TOUT LE MONDE - tous les membres.", targetKanji: ["全", "員"] },

  // 学生 (Student) types
  { word: "大学生", meanings: ["Etudiant universitaire"], readings: ["だいがくせい"], mnemonicFr: "ETUDIANT - celui qui etudie a l'universite.", targetKanji: ["大", "学", "生"] },
  { word: "高校生", meanings: ["Lyceen"], readings: ["こうこうせい"], mnemonicFr: "LYCEEN - eleve du lycee.", targetKanji: ["高", "校", "生"] },
  { word: "中学生", meanings: ["Collegien"], readings: ["ちゅうがくせい"], mnemonicFr: "COLLEGIEN - eleve du college.", targetKanji: ["中", "学", "生"] },
  { word: "小学生", meanings: ["Ecolier"], readings: ["しょうがくせい"], mnemonicFr: "ECOLIER - eleve de l'ecole primaire.", targetKanji: ["小", "学", "生"] },
  { word: "学生", meanings: ["Etudiant"], readings: ["がくせい"], mnemonicFr: "ETUDIANT - personne qui apprend.", targetKanji: ["学", "生"] },
  { word: "留学生", meanings: ["Etudiant etranger"], readings: ["りゅうがくせい"], mnemonicFr: "ETUDIANT ETRANGER - qui etudie a l'etranger.", targetKanji: ["留", "学", "生"] },
  { word: "先生", meanings: ["Professeur", "Maitre"], readings: ["せんせい"], mnemonicFr: "PROFESSEUR - celui qui est ne avant, qui enseigne.", targetKanji: ["先", "生"] },
  { word: "新入生", meanings: ["Nouvel eleve"], readings: ["しんにゅうせい"], mnemonicFr: "NOUVEL ELEVE - qui vient d'entrer.", targetKanji: ["新", "入", "生"] },
];

// Part 2: 日 (Day/Sun) and 時 (Time) compounds
const vocabPart2 = [
  // 日 compounds
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - tous les jours sans exception.", targetKanji: ["毎", "日"] },
  { word: "今日", meanings: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "AUJOURD'HUI - ce jour present.", targetKanji: ["今", "日"] },
  { word: "明日", meanings: ["Demain"], readings: ["あした"], mnemonicFr: "DEMAIN - le jour brillant qui vient.", targetKanji: ["明", "日"] },
  { word: "昨日", meanings: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER - le jour passe.", targetKanji: ["昨", "日"] },
  { word: "前日", meanings: ["La veille", "Jour precedent"], readings: ["ぜんじつ"], mnemonicFr: "LA VEILLE - le jour d'avant.", targetKanji: ["前", "日"] },
  { word: "翌日", meanings: ["Le lendemain"], readings: ["よくじつ"], mnemonicFr: "LE LENDEMAIN - le jour suivant.", targetKanji: ["翌", "日"] },
  { word: "平日", meanings: ["Jour de semaine"], readings: ["へいじつ"], mnemonicFr: "JOUR DE SEMAINE - jour ordinaire.", targetKanji: ["平", "日"] },
  { word: "休日", meanings: ["Jour de repos"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS - jour de conge.", targetKanji: ["休", "日"] },
  { word: "祝日", meanings: ["Jour ferie"], readings: ["しゅくじつ"], mnemonicFr: "JOUR FERIE - jour de celebration.", targetKanji: ["祝", "日"] },
  { word: "誕生日", meanings: ["Anniversaire"], readings: ["たんじょうび"], mnemonicFr: "ANNIVERSAIRE - jour de naissance.", targetKanji: ["誕", "生", "日"] },
  { word: "記念日", meanings: ["Anniversaire", "Commemoration"], readings: ["きねんび"], mnemonicFr: "COMMEMORATION - jour a se rappeler.", targetKanji: ["記", "念", "日"] },
  { word: "一日", meanings: ["Un jour", "Premier du mois"], readings: ["いちにち", "ついたち"], mnemonicFr: "UN JOUR - une journee complete.", targetKanji: ["一", "日"] },
  { word: "二日", meanings: ["Deux jours", "Le 2 du mois"], readings: ["ふつか"], mnemonicFr: "DEUX JOURS - deux journees.", targetKanji: ["二", "日"] },
  { word: "三日", meanings: ["Trois jours", "Le 3 du mois"], readings: ["みっか"], mnemonicFr: "TROIS JOURS - trois journees.", targetKanji: ["三", "日"] },
  { word: "日記", meanings: ["Journal intime"], readings: ["にっき"], mnemonicFr: "JOURNAL - ecrire chaque jour.", targetKanji: ["日", "記"] },
  { word: "日光", meanings: ["Lumiere du soleil"], readings: ["にっこう"], mnemonicFr: "LUMIERE DU SOLEIL - rayons solaires.", targetKanji: ["日", "光"] },
  { word: "日曜日", meanings: ["Dimanche"], readings: ["にちようび"], mnemonicFr: "DIMANCHE - jour du soleil.", targetKanji: ["日", "曜", "日"] },
  { word: "月曜日", meanings: ["Lundi"], readings: ["げつようび"], mnemonicFr: "LUNDI - jour de la lune.", targetKanji: ["月", "曜", "日"] },
  { word: "火曜日", meanings: ["Mardi"], readings: ["かようび"], mnemonicFr: "MARDI - jour du feu.", targetKanji: ["火", "曜", "日"] },
  { word: "水曜日", meanings: ["Mercredi"], readings: ["すいようび"], mnemonicFr: "MERCREDI - jour de l'eau.", targetKanji: ["水", "曜", "日"] },
  { word: "木曜日", meanings: ["Jeudi"], readings: ["もくようび"], mnemonicFr: "JEUDI - jour du bois.", targetKanji: ["木", "曜", "日"] },
  { word: "金曜日", meanings: ["Vendredi"], readings: ["きんようび"], mnemonicFr: "VENDREDI - jour de l'or.", targetKanji: ["金", "曜", "日"] },
  { word: "土曜日", meanings: ["Samedi"], readings: ["どようび"], mnemonicFr: "SAMEDI - jour de la terre.", targetKanji: ["土", "曜", "日"] },

  // 時 compounds
  { word: "時間", meanings: ["Temps", "Heure"], readings: ["じかん"], mnemonicFr: "TEMPS - l'intervalle entre les moments.", targetKanji: ["時", "間"] },
  { word: "時計", meanings: ["Montre", "Horloge"], readings: ["とけい"], mnemonicFr: "MONTRE - instrument pour mesurer le temps.", targetKanji: ["時", "計"] },
  { word: "時代", meanings: ["Epoque", "Ere"], readings: ["じだい"], mnemonicFr: "EPOQUE - periode de l'histoire.", targetKanji: ["時", "代"] },
  { word: "時期", meanings: ["Periode", "Saison"], readings: ["じき"], mnemonicFr: "PERIODE - moment particulier.", targetKanji: ["時", "期"] },
  { word: "当時", meanings: ["A cette epoque"], readings: ["とうじ"], mnemonicFr: "A CETTE EPOQUE - a ce moment-la.", targetKanji: ["当", "時"] },
  { word: "同時", meanings: ["En meme temps"], readings: ["どうじ"], mnemonicFr: "EN MEME TEMPS - simultanement.", targetKanji: ["同", "時"] },
  { word: "臨時", meanings: ["Temporaire", "Special"], readings: ["りんじ"], mnemonicFr: "TEMPORAIRE - pour un moment seulement.", targetKanji: ["臨", "時"] },
  { word: "何時", meanings: ["Quelle heure"], readings: ["なんじ"], mnemonicFr: "QUELLE HEURE - question sur le temps.", targetKanji: ["何", "時"] },
  { word: "一時", meanings: ["Une heure", "Un moment"], readings: ["いちじ"], mnemonicFr: "UNE HEURE - un bref instant.", targetKanji: ["一", "時"] },
];

// Part 3: 間 (Between/Space) compounds
const vocabPart3 = [
  { word: "空間", meanings: ["Espace"], readings: ["くうかん"], mnemonicFr: "ESPACE - l'intervalle vide entre les choses.", targetKanji: ["空", "間"] },
  { word: "期間", meanings: ["Periode", "Duree"], readings: ["きかん"], mnemonicFr: "PERIODE - intervalle de temps defini.", targetKanji: ["期", "間"] },
  { word: "一年間", meanings: ["Pendant un an"], readings: ["いちねんかん"], mnemonicFr: "PENDANT UN AN - duree d'une annee.", targetKanji: ["一", "年", "間"] },
  { word: "週間", meanings: ["Semaine(s)"], readings: ["しゅうかん"], mnemonicFr: "SEMAINE - periode de sept jours.", targetKanji: ["週", "間"] },
  { word: "瞬間", meanings: ["Instant"], readings: ["しゅんかん"], mnemonicFr: "INSTANT - un court moment.", targetKanji: ["瞬", "間"] },
  { word: "夜間", meanings: ["Pendant la nuit"], readings: ["やかん"], mnemonicFr: "PENDANT LA NUIT - heures nocturnes.", targetKanji: ["夜", "間"] },
  { word: "昼間", meanings: ["Pendant la journee"], readings: ["ひるま"], mnemonicFr: "PENDANT LA JOURNEE - heures diurnes.", targetKanji: ["昼", "間"] },
  { word: "人間", meanings: ["Etre humain"], readings: ["にんげん"], mnemonicFr: "ETRE HUMAIN - entre ciel et terre.", targetKanji: ["人", "間"] },
  { word: "仲間", meanings: ["Camarade", "Compagnon"], readings: ["なかま"], mnemonicFr: "CAMARADE - quelqu'un entre amis.", targetKanji: ["仲", "間"] },
  { word: "世間", meanings: ["Societe", "Monde"], readings: ["せけん"], mnemonicFr: "SOCIETE - l'espace entre les generations.", targetKanji: ["世", "間"] },
  { word: "客間", meanings: ["Salon"], readings: ["きゃくま"], mnemonicFr: "SALON - piece pour les invites.", targetKanji: ["客", "間"] },
  { word: "居間", meanings: ["Salon", "Sejour"], readings: ["いま"], mnemonicFr: "SEJOUR - piece ou l'on vit.", targetKanji: ["居", "間"] },
  { word: "部屋", meanings: ["Chambre", "Piece"], readings: ["へや"], mnemonicFr: "CHAMBRE - espace d'une maison.", targetKanji: ["部", "屋"] },
  { word: "間違い", meanings: ["Erreur"], readings: ["まちがい"], mnemonicFr: "ERREUR - se tromper d'espace.", targetKanji: ["間", "違"] },
  { word: "間違える", meanings: ["Se tromper"], readings: ["まちがえる"], mnemonicFr: "SE TROMPER - faire une erreur.", targetKanji: ["間", "違"] },
];

// Part 4: 前/後 (Before/After) and position compounds
const vocabPart4 = [
  // 前 compounds
  { word: "前", meanings: ["Avant", "Devant"], readings: ["まえ"], mnemonicFr: "AVANT - ce qui est devant.", targetKanji: ["前"] },
  { word: "以前", meanings: ["Avant", "Auparavant"], readings: ["いぜん"], mnemonicFr: "AUPARAVANT - dans le passe.", targetKanji: ["以", "前"] },
  { word: "午前", meanings: ["Matin", "AM"], readings: ["ごぜん"], mnemonicFr: "MATIN - avant midi.", targetKanji: ["午", "前"] },
  { word: "前年", meanings: ["Annee precedente"], readings: ["ぜんねん"], mnemonicFr: "ANNEE PRECEDENTE - l'an d'avant.", targetKanji: ["前", "年"] },
  { word: "名前", meanings: ["Nom", "Prenom"], readings: ["なまえ"], mnemonicFr: "NOM - ce qui vient avant vous.", targetKanji: ["名", "前"] },
  { word: "前回", meanings: ["La derniere fois"], readings: ["ぜんかい"], mnemonicFr: "LA DERNIERE FOIS - la fois precedente.", targetKanji: ["前", "回"] },
  { word: "直前", meanings: ["Juste avant"], readings: ["ちょくぜん"], mnemonicFr: "JUSTE AVANT - immediatement avant.", targetKanji: ["直", "前"] },
  { word: "目の前", meanings: ["Devant les yeux"], readings: ["めのまえ"], mnemonicFr: "DEVANT LES YEUX - visible directement.", targetKanji: ["目", "前"] },

  // 後 compounds
  { word: "後", meanings: ["Apres", "Derriere"], readings: ["あと", "うしろ"], mnemonicFr: "APRES - ce qui suit.", targetKanji: ["後"] },
  { word: "以後", meanings: ["Apres", "Desormais"], readings: ["いご"], mnemonicFr: "DESORMAIS - a partir de maintenant.", targetKanji: ["以", "後"] },
  { word: "午後", meanings: ["Apres-midi", "PM"], readings: ["ごご"], mnemonicFr: "APRES-MIDI - apres midi.", targetKanji: ["午", "後"] },
  { word: "今後", meanings: ["A l'avenir"], readings: ["こんご"], mnemonicFr: "A L'AVENIR - apres maintenant.", targetKanji: ["今", "後"] },
  { word: "最後", meanings: ["Dernier", "Final"], readings: ["さいご"], mnemonicFr: "DERNIER - le plus apres.", targetKanji: ["最", "後"] },
  { word: "後半", meanings: ["Deuxieme moitie"], readings: ["こうはん"], mnemonicFr: "DEUXIEME MOITIE - la partie apres.", targetKanji: ["後", "半"] },
  { word: "前後", meanings: ["Avant et apres"], readings: ["ぜんご"], mnemonicFr: "AVANT ET APRES - devant et derriere.", targetKanji: ["前", "後"] },
  { word: "背後", meanings: ["Derriere", "Dans le dos"], readings: ["はいご"], mnemonicFr: "DERRIERE - dans le dos.", targetKanji: ["背", "後"] },
  { word: "後悔", meanings: ["Regret"], readings: ["こうかい"], mnemonicFr: "REGRET - regretter apres coup.", targetKanji: ["後", "悔"] },

  // 週 (Week) compounds
  { word: "先週", meanings: ["La semaine derniere"], readings: ["せんしゅう"], mnemonicFr: "SEMAINE DERNIERE - la semaine passee.", targetKanji: ["先", "週"] },
  { word: "今週", meanings: ["Cette semaine"], readings: ["こんしゅう"], mnemonicFr: "CETTE SEMAINE - la semaine actuelle.", targetKanji: ["今", "週"] },
  { word: "来週", meanings: ["La semaine prochaine"], readings: ["らいしゅう"], mnemonicFr: "SEMAINE PROCHAINE - la semaine qui vient.", targetKanji: ["来", "週"] },
  { word: "毎週", meanings: ["Chaque semaine"], readings: ["まいしゅう"], mnemonicFr: "CHAQUE SEMAINE - toutes les semaines.", targetKanji: ["毎", "週"] },

  // 月/年 (Month/Year) compounds
  { word: "先月", meanings: ["Le mois dernier"], readings: ["せんげつ"], mnemonicFr: "MOIS DERNIER - le mois passe.", targetKanji: ["先", "月"] },
  { word: "今月", meanings: ["Ce mois-ci"], readings: ["こんげつ"], mnemonicFr: "CE MOIS-CI - le mois actuel.", targetKanji: ["今", "月"] },
  { word: "来月", meanings: ["Le mois prochain"], readings: ["らいげつ"], mnemonicFr: "MOIS PROCHAIN - le mois qui vient.", targetKanji: ["来", "月"] },
  { word: "去年", meanings: ["L'annee derniere"], readings: ["きょねん"], mnemonicFr: "ANNEE DERNIERE - l'an passe.", targetKanji: ["去", "年"] },
  { word: "今年", meanings: ["Cette annee"], readings: ["ことし"], mnemonicFr: "CETTE ANNEE - l'annee actuelle.", targetKanji: ["今", "年"] },
  { word: "来年", meanings: ["L'annee prochaine"], readings: ["らいねん"], mnemonicFr: "ANNEE PROCHAINE - l'an qui vient.", targetKanji: ["来", "年"] },
  { word: "毎年", meanings: ["Chaque annee"], readings: ["まいとし", "まいねん"], mnemonicFr: "CHAQUE ANNEE - tous les ans.", targetKanji: ["毎", "年"] },
];

// Part 5: 中/内/外 (Inside/Outside) compounds
const vocabPart5 = [
  // 中 compounds
  { word: "中", meanings: ["Interieur", "Milieu"], readings: ["なか"], mnemonicFr: "INTERIEUR - ce qui est dedans.", targetKanji: ["中"] },
  { word: "中心", meanings: ["Centre", "Coeur"], readings: ["ちゅうしん"], mnemonicFr: "CENTRE - le coeur du milieu.", targetKanji: ["中", "心"] },
  { word: "中央", meanings: ["Centre", "Central"], readings: ["ちゅうおう"], mnemonicFr: "CENTRAL - au milieu exactement.", targetKanji: ["中", "央"] },
  { word: "中間", meanings: ["Milieu", "Intermediaire"], readings: ["ちゅうかん"], mnemonicFr: "MILIEU - entre deux choses.", targetKanji: ["中", "間"] },
  { word: "中国", meanings: ["Chine"], readings: ["ちゅうごく"], mnemonicFr: "CHINE - le pays du milieu.", targetKanji: ["中", "国"] },
  { word: "中国語", meanings: ["Chinois (langue)"], readings: ["ちゅうごくご"], mnemonicFr: "CHINOIS - la langue de Chine.", targetKanji: ["中", "国", "語"] },
  { word: "集中", meanings: ["Concentration"], readings: ["しゅうちゅう"], mnemonicFr: "CONCENTRATION - rassembler au centre.", targetKanji: ["集", "中"] },
  { word: "途中", meanings: ["En chemin", "En cours"], readings: ["とちゅう"], mnemonicFr: "EN CHEMIN - au milieu du trajet.", targetKanji: ["途", "中"] },
  { word: "一日中", meanings: ["Toute la journee"], readings: ["いちにちじゅう"], mnemonicFr: "TOUTE LA JOURNEE - du debut a la fin.", targetKanji: ["一", "日", "中"] },
  { word: "一年中", meanings: ["Toute l'annee"], readings: ["いちねんじゅう"], mnemonicFr: "TOUTE L'ANNEE - pendant douze mois.", targetKanji: ["一", "年", "中"] },

  // 内 compounds
  { word: "内", meanings: ["Interieur"], readings: ["うち"], mnemonicFr: "INTERIEUR - ce qui est a l'interieur.", targetKanji: ["内"] },
  { word: "内容", meanings: ["Contenu"], readings: ["ないよう"], mnemonicFr: "CONTENU - ce qui est a l'interieur.", targetKanji: ["内", "容"] },
  { word: "以内", meanings: ["Dans", "Moins de"], readings: ["いない"], mnemonicFr: "DANS - a l'interieur de limites.", targetKanji: ["以", "内"] },
  { word: "国内", meanings: ["National", "Interieur du pays"], readings: ["こくない"], mnemonicFr: "NATIONAL - a l'interieur du pays.", targetKanji: ["国", "内"] },
  { word: "家内", meanings: ["Epouse", "A la maison"], readings: ["かない"], mnemonicFr: "EPOUSE - celle qui est dans la maison.", targetKanji: ["家", "内"] },
  { word: "案内", meanings: ["Guide", "Information"], readings: ["あんない"], mnemonicFr: "GUIDE - mener a l'interieur.", targetKanji: ["案", "内"] },

  // 外 compounds
  { word: "外", meanings: ["Exterieur", "Dehors"], readings: ["そと"], mnemonicFr: "EXTERIEUR - ce qui est dehors.", targetKanji: ["外"] },
  { word: "外出", meanings: ["Sortie"], readings: ["がいしゅつ"], mnemonicFr: "SORTIE - aller a l'exterieur.", targetKanji: ["外", "出"] },
  { word: "外国", meanings: ["Pays etranger"], readings: ["がいこく"], mnemonicFr: "PAYS ETRANGER - pays exterieur.", targetKanji: ["外", "国"] },
  { word: "外国語", meanings: ["Langue etrangere"], readings: ["がいこくご"], mnemonicFr: "LANGUE ETRANGERE - langue d'un autre pays.", targetKanji: ["外", "国", "語"] },
  { word: "海外", meanings: ["A l'etranger"], readings: ["かいがい"], mnemonicFr: "A L'ETRANGER - au-dela des mers.", targetKanji: ["海", "外"] },
  { word: "以外", meanings: ["Sauf", "Excepte"], readings: ["いがい"], mnemonicFr: "SAUF - en dehors de.", targetKanji: ["以", "外"] },
  { word: "意外", meanings: ["Inattendu", "Surprenant"], readings: ["いがい"], mnemonicFr: "INATTENDU - hors de ce qu'on pensait.", targetKanji: ["意", "外"] },
  { word: "室外", meanings: ["A l'exterieur"], readings: ["しつがい"], mnemonicFr: "A L'EXTERIEUR - hors de la piece.", targetKanji: ["室", "外"] },
];

// Part 6: 上/下 (Up/Down) compounds
const vocabPart6 = [
  // 上 compounds
  { word: "上", meanings: ["Haut", "Dessus"], readings: ["うえ"], mnemonicFr: "HAUT - ce qui est au-dessus.", targetKanji: ["上"] },
  { word: "以上", meanings: ["Plus de", "Ci-dessus"], readings: ["いじょう"], mnemonicFr: "PLUS DE - au-dessus de la limite.", targetKanji: ["以", "上"] },
  { word: "上手", meanings: ["Habile", "Doue"], readings: ["じょうず"], mnemonicFr: "HABILE - avoir la main haute.", targetKanji: ["上", "手"] },
  { word: "上達", meanings: ["Progres", "Amelioration"], readings: ["じょうたつ"], mnemonicFr: "PROGRES - atteindre le haut.", targetKanji: ["上", "達"] },
  { word: "目上", meanings: ["Superieur"], readings: ["めうえ"], mnemonicFr: "SUPERIEUR - au-dessus des yeux.", targetKanji: ["目", "上"] },
  { word: "年上", meanings: ["Plus age"], readings: ["としうえ"], mnemonicFr: "PLUS AGE - plus haut en annees.", targetKanji: ["年", "上"] },
  { word: "上る", meanings: ["Monter"], readings: ["のぼる"], mnemonicFr: "MONTER - aller vers le haut.", targetKanji: ["上"] },
  { word: "上げる", meanings: ["Lever", "Elever"], readings: ["あげる"], mnemonicFr: "LEVER - faire monter.", targetKanji: ["上"] },
  { word: "上司", meanings: ["Superieur hierarchique"], readings: ["じょうし"], mnemonicFr: "SUPERIEUR - chef au-dessus.", targetKanji: ["上", "司"] },
  { word: "向上", meanings: ["Amelioration"], readings: ["こうじょう"], mnemonicFr: "AMELIORATION - se diriger vers le haut.", targetKanji: ["向", "上"] },

  // 下 compounds
  { word: "下", meanings: ["Bas", "Dessous"], readings: ["した"], mnemonicFr: "BAS - ce qui est en dessous.", targetKanji: ["下"] },
  { word: "以下", meanings: ["Moins de", "Ci-dessous"], readings: ["いか"], mnemonicFr: "MOINS DE - en dessous de la limite.", targetKanji: ["以", "下"] },
  { word: "下手", meanings: ["Maladroit"], readings: ["へた"], mnemonicFr: "MALADROIT - avoir la main basse.", targetKanji: ["下", "手"] },
  { word: "目下", meanings: ["Inferieur", "Subalterne"], readings: ["めした"], mnemonicFr: "INFERIEUR - en dessous des yeux.", targetKanji: ["目", "下"] },
  { word: "年下", meanings: ["Plus jeune"], readings: ["としした"], mnemonicFr: "PLUS JEUNE - plus bas en annees.", targetKanji: ["年", "下"] },
  { word: "下りる", meanings: ["Descendre"], readings: ["おりる"], mnemonicFr: "DESCENDRE - aller vers le bas.", targetKanji: ["下"] },
  { word: "下げる", meanings: ["Baisser"], readings: ["さげる"], mnemonicFr: "BAISSER - faire descendre.", targetKanji: ["下"] },
  { word: "地下", meanings: ["Souterrain"], readings: ["ちか"], mnemonicFr: "SOUTERRAIN - sous la terre.", targetKanji: ["地", "下"] },
  { word: "地下鉄", meanings: ["Metro"], readings: ["ちかてつ"], mnemonicFr: "METRO - train souterrain.", targetKanji: ["地", "下", "鉄"] },
  { word: "靴下", meanings: ["Chaussettes"], readings: ["くつした"], mnemonicFr: "CHAUSSETTES - sous les chaussures.", targetKanji: ["靴", "下"] },
];

// Part 7: 方 (Direction/Way) compounds
const vocabPart7 = [
  { word: "方", meanings: ["Direction", "Maniere"], readings: ["かた", "ほう"], mnemonicFr: "DIRECTION - la facon d'aller.", targetKanji: ["方"] },
  { word: "方法", meanings: ["Methode", "Facon"], readings: ["ほうほう"], mnemonicFr: "METHODE - la facon de faire.", targetKanji: ["方", "法"] },
  { word: "方向", meanings: ["Direction"], readings: ["ほうこう"], mnemonicFr: "DIRECTION - vers ou aller.", targetKanji: ["方", "向"] },
  { word: "地方", meanings: ["Region", "Province"], readings: ["ちほう"], mnemonicFr: "REGION - direction de la terre.", targetKanji: ["地", "方"] },
  { word: "味方", meanings: ["Allie"], readings: ["みかた"], mnemonicFr: "ALLIE - celui qui est de notre cote.", targetKanji: ["味", "方"] },
  { word: "見方", meanings: ["Point de vue"], readings: ["みかた"], mnemonicFr: "POINT DE VUE - facon de voir.", targetKanji: ["見", "方"] },
  { word: "考え方", meanings: ["Facon de penser"], readings: ["かんがえかた"], mnemonicFr: "FACON DE PENSER - maniere de reflechir.", targetKanji: ["考", "方"] },
  { word: "使い方", meanings: ["Mode d'emploi"], readings: ["つかいかた"], mnemonicFr: "MODE D'EMPLOI - facon d'utiliser.", targetKanji: ["使", "方"] },
  { word: "読み方", meanings: ["Facon de lire"], readings: ["よみかた"], mnemonicFr: "FACON DE LIRE - comment lire.", targetKanji: ["読", "方"] },
  { word: "書き方", meanings: ["Facon d'ecrire"], readings: ["かきかた"], mnemonicFr: "FACON D'ECRIRE - comment ecrire.", targetKanji: ["書", "方"] },
  { word: "両方", meanings: ["Les deux"], readings: ["りょうほう"], mnemonicFr: "LES DEUX - les deux directions.", targetKanji: ["両", "方"] },
  { word: "一方", meanings: ["D'un cote", "D'autre part"], readings: ["いっぽう"], mnemonicFr: "D'UN COTE - une direction.", targetKanji: ["一", "方"] },
  { word: "夕方", meanings: ["Soir"], readings: ["ゆうがた"], mnemonicFr: "SOIR - direction du crepuscule.", targetKanji: ["夕", "方"] },
];

// Part 8: 会/社 (Meeting/Company) compounds
const vocabPart8 = [
  // 会 compounds
  { word: "会う", meanings: ["Rencontrer"], readings: ["あう"], mnemonicFr: "RENCONTRER - se reunir.", targetKanji: ["会"] },
  { word: "会議", meanings: ["Reunion", "Conference"], readings: ["かいぎ"], mnemonicFr: "REUNION - assemblee pour discuter.", targetKanji: ["会", "議"] },
  { word: "会話", meanings: ["Conversation"], readings: ["かいわ"], mnemonicFr: "CONVERSATION - parler ensemble.", targetKanji: ["会", "話"] },
  { word: "会場", meanings: ["Salle de reunion"], readings: ["かいじょう"], mnemonicFr: "SALLE DE REUNION - lieu de rencontre.", targetKanji: ["会", "場"] },
  { word: "社会", meanings: ["Societe"], readings: ["しゃかい"], mnemonicFr: "SOCIETE - reunion de personnes.", targetKanji: ["社", "会"] },
  { word: "大会", meanings: ["Grand rassemblement", "Tournoi"], readings: ["たいかい"], mnemonicFr: "TOURNOI - grande reunion.", targetKanji: ["大", "会"] },
  { word: "出会い", meanings: ["Rencontre"], readings: ["であい"], mnemonicFr: "RENCONTRE - sortir pour se voir.", targetKanji: ["出", "会"] },
  { word: "出会う", meanings: ["Rencontrer"], readings: ["であう"], mnemonicFr: "RENCONTRER - tomber sur quelqu'un.", targetKanji: ["出", "会"] },
  { word: "機会", meanings: ["Occasion", "Opportunite"], readings: ["きかい"], mnemonicFr: "OCCASION - moment de rencontre.", targetKanji: ["機", "会"] },

  // 社 compounds
  { word: "会社", meanings: ["Entreprise", "Societe"], readings: ["かいしゃ"], mnemonicFr: "ENTREPRISE - lieu de reunion pour travailler.", targetKanji: ["会", "社"] },
  { word: "神社", meanings: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonicFr: "SANCTUAIRE - lieu des dieux.", targetKanji: ["神", "社"] },
  { word: "社長", meanings: ["President (d'entreprise)"], readings: ["しゃちょう"], mnemonicFr: "PRESIDENT - chef de l'entreprise.", targetKanji: ["社", "長"] },
  { word: "本社", meanings: ["Siege social"], readings: ["ほんしゃ"], mnemonicFr: "SIEGE SOCIAL - societe principale.", targetKanji: ["本", "社"] },
  { word: "入社", meanings: ["Entree dans une entreprise"], readings: ["にゅうしゃ"], mnemonicFr: "ENTREE - rejoindre une entreprise.", targetKanji: ["入", "社"] },
];

// Part 9: 学/校 (Study/School) compounds
const vocabPart9 = [
  // 学 compounds
  { word: "学ぶ", meanings: ["Apprendre", "Etudier"], readings: ["まなぶ"], mnemonicFr: "APPRENDRE - acquerir du savoir.", targetKanji: ["学"] },
  { word: "学校", meanings: ["Ecole"], readings: ["がっこう"], mnemonicFr: "ECOLE - lieu pour etudier.", targetKanji: ["学", "校"] },
  { word: "大学", meanings: ["Universite"], readings: ["だいがく"], mnemonicFr: "UNIVERSITE - grande ecole.", targetKanji: ["大", "学"] },
  { word: "小学校", meanings: ["Ecole primaire"], readings: ["しょうがっこう"], mnemonicFr: "ECOLE PRIMAIRE - petite ecole.", targetKanji: ["小", "学", "校"] },
  { word: "中学校", meanings: ["College"], readings: ["ちゅうがっこう"], mnemonicFr: "COLLEGE - ecole du milieu.", targetKanji: ["中", "学", "校"] },
  { word: "高校", meanings: ["Lycee"], readings: ["こうこう"], mnemonicFr: "LYCEE - ecole haute.", targetKanji: ["高", "校"] },
  { word: "入学", meanings: ["Entree a l'ecole"], readings: ["にゅうがく"], mnemonicFr: "ENTREE A L'ECOLE - commencer les etudes.", targetKanji: ["入", "学"] },
  { word: "卒業", meanings: ["Diplome", "Fin des etudes"], readings: ["そつぎょう"], mnemonicFr: "DIPLOME - terminer les etudes.", targetKanji: ["卒", "業"] },
  { word: "科学", meanings: ["Science"], readings: ["かがく"], mnemonicFr: "SCIENCE - etude par domaine.", targetKanji: ["科", "学"] },
  { word: "数学", meanings: ["Mathematiques"], readings: ["すうがく"], mnemonicFr: "MATHEMATIQUES - etude des nombres.", targetKanji: ["数", "学"] },
  { word: "文学", meanings: ["Litterature"], readings: ["ぶんがく"], mnemonicFr: "LITTERATURE - etude des textes.", targetKanji: ["文", "学"] },
  { word: "語学", meanings: ["Linguistique", "Etude des langues"], readings: ["ごがく"], mnemonicFr: "LINGUISTIQUE - etude des langues.", targetKanji: ["語", "学"] },
  { word: "独学", meanings: ["Autodidacte"], readings: ["どくがく"], mnemonicFr: "AUTODIDACTE - apprendre seul.", targetKanji: ["独", "学"] },
];

// Part 10: 生/活 (Life/Living) compounds
const vocabPart10 = [
  // 生 compounds
  { word: "生きる", meanings: ["Vivre"], readings: ["いきる"], mnemonicFr: "VIVRE - etre en vie.", targetKanji: ["生"] },
  { word: "生まれる", meanings: ["Naitre"], readings: ["うまれる"], mnemonicFr: "NAITRE - venir au monde.", targetKanji: ["生"] },
  { word: "生活", meanings: ["Vie quotidienne"], readings: ["せいかつ"], mnemonicFr: "VIE QUOTIDIENNE - vivre activement.", targetKanji: ["生", "活"] },
  { word: "一生", meanings: ["Toute la vie"], readings: ["いっしょう"], mnemonicFr: "TOUTE LA VIE - une vie entiere.", targetKanji: ["一", "生"] },
  { word: "誕生", meanings: ["Naissance"], readings: ["たんじょう"], mnemonicFr: "NAISSANCE - venir au monde.", targetKanji: ["誕", "生"] },
  { word: "発生", meanings: ["Apparition", "Eclosion"], readings: ["はっせい"], mnemonicFr: "APPARITION - commencer a exister.", targetKanji: ["発", "生"] },
  { word: "野生", meanings: ["Sauvage"], readings: ["やせい"], mnemonicFr: "SAUVAGE - vie dans la nature.", targetKanji: ["野", "生"] },

  // 活 compounds
  { word: "活動", meanings: ["Activite"], readings: ["かつどう"], mnemonicFr: "ACTIVITE - mouvement de vie.", targetKanji: ["活", "動"] },
  { word: "活力", meanings: ["Vitalite"], readings: ["かつりょく"], mnemonicFr: "VITALITE - force de vie.", targetKanji: ["活", "力"] },
  { word: "活用", meanings: ["Utilisation", "Conjugaison"], readings: ["かつよう"], mnemonicFr: "UTILISATION - mettre en action.", targetKanji: ["活", "用"] },
  { word: "活躍", meanings: ["Succes actif"], readings: ["かつやく"], mnemonicFr: "SUCCES ACTIF - s'activer avec succes.", targetKanji: ["活", "躍"] },
  { word: "復活", meanings: ["Resurrection", "Retour"], readings: ["ふっかつ"], mnemonicFr: "RESURRECTION - revenir a la vie.", targetKanji: ["復", "活"] },
  { word: "生活費", meanings: ["Frais de vie"], readings: ["せいかつひ"], mnemonicFr: "FRAIS DE VIE - cout de la vie.", targetKanji: ["生", "活", "費"] },
];

// Part 11: 気 (Spirit/Energy) compounds
const vocabPart11 = [
  { word: "気", meanings: ["Esprit", "Energie"], readings: ["き"], mnemonicFr: "ESPRIT - l'energie vitale.", targetKanji: ["気"] },
  { word: "気分", meanings: ["Humeur"], readings: ["きぶん"], mnemonicFr: "HUMEUR - partie de l'esprit.", targetKanji: ["気", "分"] },
  { word: "天気", meanings: ["Meteo", "Temps"], readings: ["てんき"], mnemonicFr: "METEO - l'energie du ciel.", targetKanji: ["天", "気"] },
  { word: "元気", meanings: ["En forme", "Energique"], readings: ["げんき"], mnemonicFr: "EN FORME - energie originelle.", targetKanji: ["元", "気"] },
  { word: "本気", meanings: ["Serieux"], readings: ["ほんき"], mnemonicFr: "SERIEUX - esprit veritable.", targetKanji: ["本", "気"] },
  { word: "空気", meanings: ["Air", "Atmosphere"], readings: ["くうき"], mnemonicFr: "AIR - energie du vide.", targetKanji: ["空", "気"] },
  { word: "病気", meanings: ["Maladie"], readings: ["びょうき"], mnemonicFr: "MALADIE - energie malade.", targetKanji: ["病", "気"] },
  { word: "電気", meanings: ["Electricite"], readings: ["でんき"], mnemonicFr: "ELECTRICITE - energie de l'eclair.", targetKanji: ["電", "気"] },
  { word: "気持ち", meanings: ["Sentiment"], readings: ["きもち"], mnemonicFr: "SENTIMENT - ce que l'esprit ressent.", targetKanji: ["気", "持"] },
  { word: "気をつける", meanings: ["Faire attention"], readings: ["きをつける"], mnemonicFr: "FAIRE ATTENTION - attacher son esprit.", targetKanji: ["気"] },
  { word: "気になる", meanings: ["S'inquieter de"], readings: ["きになる"], mnemonicFr: "S'INQUIETER - devenir dans l'esprit.", targetKanji: ["気"] },
  { word: "気がする", meanings: ["Avoir l'impression"], readings: ["きがする"], mnemonicFr: "AVOIR L'IMPRESSION - l'esprit fait.", targetKanji: ["気"] },
  { word: "勇気", meanings: ["Courage"], readings: ["ゆうき"], mnemonicFr: "COURAGE - esprit brave.", targetKanji: ["勇", "気"] },
  { word: "景気", meanings: ["Economie", "Conjoncture"], readings: ["けいき"], mnemonicFr: "ECONOMIE - energie du paysage.", targetKanji: ["景", "気"] },
];

// Part 12: Languages (語) and common expressions
const vocabPart12 = [
  // 語 compounds
  { word: "日本語", meanings: ["Japonais (langue)"], readings: ["にほんご"], mnemonicFr: "JAPONAIS - la langue du Japon.", targetKanji: ["日", "本", "語"] },
  { word: "英語", meanings: ["Anglais"], readings: ["えいご"], mnemonicFr: "ANGLAIS - la langue d'Angleterre.", targetKanji: ["英", "語"] },
  { word: "言語", meanings: ["Langue", "Langage"], readings: ["げんご"], mnemonicFr: "LANGUE - mots et paroles.", targetKanji: ["言", "語"] },
  { word: "単語", meanings: ["Mot", "Vocabulaire"], readings: ["たんご"], mnemonicFr: "MOT - une seule parole.", targetKanji: ["単", "語"] },
  { word: "物語", meanings: ["Histoire", "Recit"], readings: ["ものがたり"], mnemonicFr: "HISTOIRE - parler de choses.", targetKanji: ["物", "語"] },
  { word: "敬語", meanings: ["Langage poli"], readings: ["けいご"], mnemonicFr: "LANGAGE POLI - mots de respect.", targetKanji: ["敬", "語"] },

  // 由/理由 compounds
  { word: "理由", meanings: ["Raison"], readings: ["りゆう"], mnemonicFr: "RAISON - origine logique.", targetKanji: ["理", "由"] },
  { word: "自由", meanings: ["Liberte"], readings: ["じゆう"], mnemonicFr: "LIBERTE - venir de soi.", targetKanji: ["自", "由"] },
  { word: "不自由", meanings: ["Inconvenient", "Gene"], readings: ["ふじゆう"], mnemonicFr: "INCONVENIENT - pas de liberte.", targetKanji: ["不", "自", "由"] },

  // 問/題 compounds
  { word: "問題", meanings: ["Probleme", "Question"], readings: ["もんだい"], mnemonicFr: "PROBLEME - sujet a questionner.", targetKanji: ["問", "題"] },
  { word: "話題", meanings: ["Sujet de conversation"], readings: ["わだい"], mnemonicFr: "SUJET DE CONVERSATION - theme a discuter.", targetKanji: ["話", "題"] },
  { word: "課題", meanings: ["Devoir", "Tache"], readings: ["かだい"], mnemonicFr: "DEVOIR - sujet de lecon.", targetKanji: ["課", "題"] },
  { word: "宿題", meanings: ["Devoirs (ecole)"], readings: ["しゅくだい"], mnemonicFr: "DEVOIRS - tache de la maison.", targetKanji: ["宿", "題"] },
  { word: "題名", meanings: ["Titre"], readings: ["だいめい"], mnemonicFr: "TITRE - nom du sujet.", targetKanji: ["題", "名"] },
];

// Part 13: 意/見/味/注 (Meaning/Opinion) compounds
const vocabPart13 = [
  { word: "意見", meanings: ["Opinion", "Avis"], readings: ["いけん"], mnemonicFr: "OPINION - ce que l'on voit avec l'esprit.", targetKanji: ["意", "見"] },
  { word: "意味", meanings: ["Sens", "Signification"], readings: ["いみ"], mnemonicFr: "SENS - le gout de l'intention.", targetKanji: ["意", "味"] },
  { word: "注意", meanings: ["Attention", "Prudence"], readings: ["ちゅうい"], mnemonicFr: "ATTENTION - verser son intention.", targetKanji: ["注", "意"] },
  { word: "用意", meanings: ["Preparation"], readings: ["ようい"], mnemonicFr: "PREPARATION - intention d'utiliser.", targetKanji: ["用", "意"] },
  { word: "決意", meanings: ["Determination"], readings: ["けつい"], mnemonicFr: "DETERMINATION - intention decidee.", targetKanji: ["決", "意"] },
  { word: "同意", meanings: ["Accord", "Consentement"], readings: ["どうい"], mnemonicFr: "ACCORD - meme intention.", targetKanji: ["同", "意"] },
  { word: "意識", meanings: ["Conscience"], readings: ["いしき"], mnemonicFr: "CONSCIENCE - connaissance intentionnelle.", targetKanji: ["意", "識"] },
  { word: "意外", meanings: ["Inattendu"], readings: ["いがい"], mnemonicFr: "INATTENDU - hors de l'intention.", targetKanji: ["意", "外"] },
  { word: "意志", meanings: ["Volonte"], readings: ["いし"], mnemonicFr: "VOLONTE - intention du coeur.", targetKanji: ["意", "志"] },

  // 味 compounds
  { word: "味", meanings: ["Gout", "Saveur"], readings: ["あじ"], mnemonicFr: "GOUT - ce qu'on savoure.", targetKanji: ["味"] },
  { word: "興味", meanings: ["Interet"], readings: ["きょうみ"], mnemonicFr: "INTERET - gout pour quelque chose.", targetKanji: ["興", "味"] },
  { word: "趣味", meanings: ["Hobby", "Loisir"], readings: ["しゅみ"], mnemonicFr: "HOBBY - ce qu'on aime faire.", targetKanji: ["趣", "味"] },
  { word: "意味", meanings: ["Signification"], readings: ["いみ"], mnemonicFr: "SIGNIFICATION - le gout de l'intention.", targetKanji: ["意", "味"] },
];

// Part 14: 出/来/事 (Come out/Happen) compounds
const vocabPart14 = [
  { word: "出来る", meanings: ["Pouvoir", "Etre capable"], readings: ["できる"], mnemonicFr: "POUVOIR - quelque chose sort et vient.", targetKanji: ["出", "来"] },
  { word: "出来事", meanings: ["Evenement"], readings: ["できごと"], mnemonicFr: "EVENEMENT - chose qui arrive.", targetKanji: ["出", "来", "事"] },
  { word: "出来上がる", meanings: ["Etre termine"], readings: ["できあがる"], mnemonicFr: "ETRE TERMINE - monter et finir.", targetKanji: ["出", "来", "上"] },
  { word: "出る", meanings: ["Sortir"], readings: ["でる"], mnemonicFr: "SORTIR - aller dehors.", targetKanji: ["出"] },
  { word: "出す", meanings: ["Sortir (transitif)"], readings: ["だす"], mnemonicFr: "SORTIR - faire sortir.", targetKanji: ["出"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - bouche pour sortir.", targetKanji: ["出", "口"] },
  { word: "出発", meanings: ["Depart"], readings: ["しゅっぱつ"], mnemonicFr: "DEPART - sortir et partir.", targetKanji: ["出", "発"] },
  { word: "出席", meanings: ["Presence"], readings: ["しゅっせき"], mnemonicFr: "PRESENCE - sortir a sa place.", targetKanji: ["出", "席"] },
  { word: "出身", meanings: ["Origine"], readings: ["しゅっしん"], mnemonicFr: "ORIGINE - d'ou l'on vient.", targetKanji: ["出", "身"] },
  { word: "出版", meanings: ["Publication"], readings: ["しゅっぱん"], mnemonicFr: "PUBLICATION - faire sortir un livre.", targetKanji: ["出", "版"] },

  // 来 compounds
  { word: "来る", meanings: ["Venir"], readings: ["くる"], mnemonicFr: "VENIR - approcher.", targetKanji: ["来"] },
  { word: "将来", meanings: ["Avenir"], readings: ["しょうらい"], mnemonicFr: "AVENIR - ce qui vient.", targetKanji: ["将", "来"] },
  { word: "未来", meanings: ["Futur"], readings: ["みらい"], mnemonicFr: "FUTUR - ce qui n'est pas encore venu.", targetKanji: ["未", "来"] },
  { word: "本来", meanings: ["A l'origine"], readings: ["ほんらい"], mnemonicFr: "A L'ORIGINE - venir de la base.", targetKanji: ["本", "来"] },
  { word: "外来", meanings: ["D'origine etrangere"], readings: ["がいらい"], mnemonicFr: "D'ORIGINE ETRANGERE - venu de l'exterieur.", targetKanji: ["外", "来"] },

  // 事 compounds
  { word: "事", meanings: ["Chose", "Affaire"], readings: ["こと"], mnemonicFr: "CHOSE - une affaire.", targetKanji: ["事"] },
  { word: "仕事", meanings: ["Travail"], readings: ["しごと"], mnemonicFr: "TRAVAIL - affaire a servir.", targetKanji: ["仕", "事"] },
  { word: "事件", meanings: ["Incident", "Affaire"], readings: ["じけん"], mnemonicFr: "INCIDENT - une affaire importante.", targetKanji: ["事", "件"] },
  { word: "事故", meanings: ["Accident"], readings: ["じこ"], mnemonicFr: "ACCIDENT - affaire malheureuse.", targetKanji: ["事", "故"] },
  { word: "事実", meanings: ["Fait", "Realite"], readings: ["じじつ"], mnemonicFr: "FAIT - affaire reelle.", targetKanji: ["事", "実"] },
  { word: "食事", meanings: ["Repas"], readings: ["しょくじ"], mnemonicFr: "REPAS - affaire de manger.", targetKanji: ["食", "事"] },
  { word: "返事", meanings: ["Reponse"], readings: ["へんじ"], mnemonicFr: "REPONSE - affaire de retour.", targetKanji: ["返", "事"] },
  { word: "用事", meanings: ["Affaire a faire"], readings: ["ようじ"], mnemonicFr: "AFFAIRE A FAIRE - chose a utiliser.", targetKanji: ["用", "事"] },
  { word: "大事", meanings: ["Important"], readings: ["だいじ"], mnemonicFr: "IMPORTANT - grande affaire.", targetKanji: ["大", "事"] },
];

// Part 15: Additional common compounds
const vocabPart15 = [
  // More common words
  { word: "入口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - bouche pour entrer.", targetKanji: ["入", "口"] },
  { word: "入る", meanings: ["Entrer"], readings: ["はいる"], mnemonicFr: "ENTRER - aller a l'interieur.", targetKanji: ["入"] },
  { word: "入れる", meanings: ["Mettre dedans"], readings: ["いれる"], mnemonicFr: "METTRE DEDANS - faire entrer.", targetKanji: ["入"] },

  { word: "言う", meanings: ["Dire"], readings: ["いう"], mnemonicFr: "DIRE - exprimer en paroles.", targetKanji: ["言"] },
  { word: "言葉", meanings: ["Mot", "Parole"], readings: ["ことば"], mnemonicFr: "MOT - feuille de paroles.", targetKanji: ["言", "葉"] },

  { word: "思う", meanings: ["Penser"], readings: ["おもう"], mnemonicFr: "PENSER - avoir une pensee.", targetKanji: ["思"] },
  { word: "思い出", meanings: ["Souvenir"], readings: ["おもいで"], mnemonicFr: "SOUVENIR - pensee qui sort.", targetKanji: ["思", "出"] },
  { word: "思い出す", meanings: ["Se souvenir"], readings: ["おもいだす"], mnemonicFr: "SE SOUVENIR - faire sortir une pensee.", targetKanji: ["思", "出"] },

  { word: "知る", meanings: ["Savoir", "Connaitre"], readings: ["しる"], mnemonicFr: "SAVOIR - avoir la connaissance.", targetKanji: ["知"] },
  { word: "知らせる", meanings: ["Informer"], readings: ["しらせる"], mnemonicFr: "INFORMER - faire savoir.", targetKanji: ["知"] },
  { word: "知らない", meanings: ["Ne pas savoir"], readings: ["しらない"], mnemonicFr: "NE PAS SAVOIR - sans connaissance.", targetKanji: ["知"] },

  { word: "作る", meanings: ["Faire", "Fabriquer"], readings: ["つくる"], mnemonicFr: "FAIRE - creer quelque chose.", targetKanji: ["作"] },
  { word: "作品", meanings: ["Oeuvre"], readings: ["さくひん"], mnemonicFr: "OEUVRE - chose creee.", targetKanji: ["作", "品"] },
  { word: "作家", meanings: ["Ecrivain"], readings: ["さっか"], mnemonicFr: "ECRIVAIN - specialiste de la creation.", targetKanji: ["作", "家"] },

  { word: "持つ", meanings: ["Tenir", "Avoir"], readings: ["もつ"], mnemonicFr: "TENIR - avoir en main.", targetKanji: ["持"] },
  { word: "気持ち", meanings: ["Sentiment"], readings: ["きもち"], mnemonicFr: "SENTIMENT - ce que l'esprit tient.", targetKanji: ["気", "持"] },
  { word: "持ち物", meanings: ["Affaires personnelles"], readings: ["もちもの"], mnemonicFr: "AFFAIRES - choses qu'on a.", targetKanji: ["持", "物"] },

  { word: "見る", meanings: ["Voir", "Regarder"], readings: ["みる"], mnemonicFr: "VOIR - percevoir par les yeux.", targetKanji: ["見"] },
  { word: "見える", meanings: ["Etre visible"], readings: ["みえる"], mnemonicFr: "ETRE VISIBLE - pouvoir etre vu.", targetKanji: ["見"] },
  { word: "見せる", meanings: ["Montrer"], readings: ["みせる"], mnemonicFr: "MONTRER - faire voir.", targetKanji: ["見"] },
  { word: "見つける", meanings: ["Trouver"], readings: ["みつける"], mnemonicFr: "TROUVER - decouvrir en regardant.", targetKanji: ["見"] },
  { word: "見学", meanings: ["Visite d'etude"], readings: ["けんがく"], mnemonicFr: "VISITE D'ETUDE - apprendre en voyant.", targetKanji: ["見", "学"] },

  { word: "聞く", meanings: ["Ecouter", "Demander"], readings: ["きく"], mnemonicFr: "ECOUTER - percevoir par les oreilles.", targetKanji: ["聞"] },
  { word: "聞こえる", meanings: ["Etre audible"], readings: ["きこえる"], mnemonicFr: "ETRE AUDIBLE - pouvoir etre entendu.", targetKanji: ["聞"] },
  { word: "新聞", meanings: ["Journal"], readings: ["しんぶん"], mnemonicFr: "JOURNAL - nouvelles a entendre.", targetKanji: ["新", "聞"] },
];

async function main() {
  console.log("=== SEEDING VOCABULARY BATCH 5 ===\n");
  console.log("Focus: Compound words using common kanji (JLPT N5-N3)\n");

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
    ...vocabPart13,
    ...vocabPart14,
    ...vocabPart15,
  ];

  console.log(`Total vocabulary entries to process: ${allVocab.length}\n`);

  let added = 0;
  let skipped = 0;
  let skippedMissingKanji = 0;

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
      skippedMissingKanji++;
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
      if (added % 25 === 0) {
        console.log(`Progress: ${added} words added...`);
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
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Skipped (missing kanji): ${skippedMissingKanji}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
