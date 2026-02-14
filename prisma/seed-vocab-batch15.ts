import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary batch 15: Calendar, dates, and time periods
// Focus on: 年, 月, 日, 週, 曜 related vocabulary

const vocabPart1 = [
  // === YEAR (年) RELATED ===
  { word: "今年", meanings: ["Cette annee"], readings: ["ことし"], mnemonicFr: "CETTE ANNEE - l'annee en cours, celle ou nous sommes maintenant.", targetKanji: ["今", "年"] },
  { word: "来年", meanings: ["L'annee prochaine"], readings: ["らいねん"], mnemonicFr: "L'ANNEE PROCHAINE - l'annee qui vient apres celle-ci.", targetKanji: ["来", "年"] },
  { word: "去年", meanings: ["L'annee derniere"], readings: ["きょねん"], mnemonicFr: "L'ANNEE DERNIERE - l'annee qui a precede celle-ci.", targetKanji: ["去", "年"] },
  { word: "毎年", meanings: ["Chaque annee", "Tous les ans"], readings: ["まいとし", "まいねん"], mnemonicFr: "CHAQUE ANNEE - quelque chose qui se repete annuellement.", targetKanji: ["毎", "年"] },
  { word: "年間", meanings: ["Durant l'annee", "Annuel"], readings: ["ねんかん"], mnemonicFr: "DURANT L'ANNEE - la periode d'une annee complete.", targetKanji: ["年", "間"] },
  { word: "年度", meanings: ["Annee fiscale", "Exercice"], readings: ["ねんど"], mnemonicFr: "ANNEE FISCALE - periode administrative d'un an.", targetKanji: ["年", "度"] },
  { word: "年代", meanings: ["Decennie", "Epoque"], readings: ["ねんだい"], mnemonicFr: "DECENNIE - periode de dix ans dans l'histoire.", targetKanji: ["年", "代"] },
  { word: "年末", meanings: ["Fin d'annee"], readings: ["ねんまつ"], mnemonicFr: "FIN D'ANNEE - les derniers jours de decembre.", targetKanji: ["年", "末"] },
  { word: "年始", meanings: ["Debut d'annee", "Nouvel An"], readings: ["ねんし"], mnemonicFr: "DEBUT D'ANNEE - les premiers jours de janvier.", targetKanji: ["年", "始"] },
  { word: "新年", meanings: ["Nouvel An", "Nouvelle annee"], readings: ["しんねん"], mnemonicFr: "NOUVEL AN - le commencement d'une nouvelle annee.", targetKanji: ["新", "年"] },
  { word: "半年", meanings: ["Six mois", "Semestre"], readings: ["はんとし"], mnemonicFr: "SIX MOIS - la moitie d'une annee.", targetKanji: ["半", "年"] },
  { word: "一年", meanings: ["Un an", "Une annee"], readings: ["いちねん"], mnemonicFr: "UN AN - la duree de douze mois.", targetKanji: ["一", "年"] },
  { word: "二年", meanings: ["Deux ans"], readings: ["にねん"], mnemonicFr: "DEUX ANS - la duree de vingt-quatre mois.", targetKanji: ["二", "年"] },
  { word: "三年", meanings: ["Trois ans"], readings: ["さんねん"], mnemonicFr: "TROIS ANS - la duree de trente-six mois.", targetKanji: ["三", "年"] },
  { word: "四年", meanings: ["Quatre ans"], readings: ["よねん"], mnemonicFr: "QUATRE ANS - la duree de quarante-huit mois.", targetKanji: ["四", "年"] },
  { word: "五年", meanings: ["Cinq ans"], readings: ["ごねん"], mnemonicFr: "CINQ ANS - la duree de soixante mois.", targetKanji: ["五", "年"] },
  { word: "十年", meanings: ["Dix ans", "Decennie"], readings: ["じゅうねん"], mnemonicFr: "DIX ANS - une decennie complete.", targetKanji: ["十", "年"] },
  { word: "百年", meanings: ["Cent ans", "Siecle"], readings: ["ひゃくねん"], mnemonicFr: "CENT ANS - un siecle entier.", targetKanji: ["百", "年"] },
  { word: "年中", meanings: ["Toute l'annee"], readings: ["ねんじゅう"], mnemonicFr: "TOUTE L'ANNEE - pendant l'integralite de l'annee.", targetKanji: ["年", "中"] },
  { word: "一年中", meanings: ["Toute l'annee", "Du debut a la fin"], readings: ["いちねんじゅう"], mnemonicFr: "TOUTE L'ANNEE - sans interruption pendant douze mois.", targetKanji: ["一", "年", "中"] },
  { word: "年上", meanings: ["Plus age", "Aine"], readings: ["としうえ"], mnemonicFr: "PLUS AGE - quelqu'un qui a plus d'annees que soi.", targetKanji: ["年", "上"] },
  { word: "年下", meanings: ["Plus jeune", "Cadet"], readings: ["としした"], mnemonicFr: "PLUS JEUNE - quelqu'un qui a moins d'annees que soi.", targetKanji: ["年", "下"] },
  { word: "年生", meanings: ["Eleve de X annee"], readings: ["ねんせい"], mnemonicFr: "ELEVE DE - suffixe pour indiquer l'annee scolaire.", targetKanji: ["年", "生"] },
  { word: "一年生", meanings: ["Eleve de premiere annee"], readings: ["いちねんせい"], mnemonicFr: "PREMIERE ANNEE - etudiant en premiere annee.", targetKanji: ["一", "年", "生"] },
  { word: "年長", meanings: ["Aine", "Le plus age"], readings: ["ねんちょう"], mnemonicFr: "AINE - le plus age d'un groupe.", targetKanji: ["年", "長"] },

  // === MONTH (月) RELATED ===
  { word: "今月", meanings: ["Ce mois-ci"], readings: ["こんげつ"], mnemonicFr: "CE MOIS-CI - le mois en cours.", targetKanji: ["今", "月"] },
  { word: "来月", meanings: ["Le mois prochain"], readings: ["らいげつ"], mnemonicFr: "LE MOIS PROCHAIN - le mois qui suit celui-ci.", targetKanji: ["来", "月"] },
  { word: "先月", meanings: ["Le mois dernier"], readings: ["せんげつ"], mnemonicFr: "LE MOIS DERNIER - le mois qui a precede.", targetKanji: ["先", "月"] },
  { word: "毎月", meanings: ["Chaque mois", "Tous les mois"], readings: ["まいつき", "まいげつ"], mnemonicFr: "CHAQUE MOIS - quelque chose qui se repete mensuellement.", targetKanji: ["毎", "月"] },
  { word: "月末", meanings: ["Fin du mois"], readings: ["げつまつ"], mnemonicFr: "FIN DU MOIS - les derniers jours du mois.", targetKanji: ["月", "末"] },
  { word: "月初", meanings: ["Debut du mois"], readings: ["げっしょ"], mnemonicFr: "DEBUT DU MOIS - les premiers jours du mois.", targetKanji: ["月", "初"] },
  { word: "月間", meanings: ["Durant le mois", "Mensuel"], readings: ["げっかん"], mnemonicFr: "DURANT LE MOIS - la periode d'un mois complet.", targetKanji: ["月", "間"] },
  { word: "一月", meanings: ["Janvier"], readings: ["いちがつ"], mnemonicFr: "JANVIER - le premier mois de l'annee.", targetKanji: ["一", "月"] },
  { word: "二月", meanings: ["Fevrier"], readings: ["にがつ"], mnemonicFr: "FEVRIER - le deuxieme mois de l'annee.", targetKanji: ["二", "月"] },
  { word: "三月", meanings: ["Mars"], readings: ["さんがつ"], mnemonicFr: "MARS - le troisieme mois de l'annee.", targetKanji: ["三", "月"] },
  { word: "四月", meanings: ["Avril"], readings: ["しがつ"], mnemonicFr: "AVRIL - le quatrieme mois de l'annee.", targetKanji: ["四", "月"] },
  { word: "五月", meanings: ["Mai"], readings: ["ごがつ"], mnemonicFr: "MAI - le cinquieme mois de l'annee.", targetKanji: ["五", "月"] },
  { word: "六月", meanings: ["Juin"], readings: ["ろくがつ"], mnemonicFr: "JUIN - le sixieme mois de l'annee.", targetKanji: ["六", "月"] },
  { word: "七月", meanings: ["Juillet"], readings: ["しちがつ"], mnemonicFr: "JUILLET - le septieme mois de l'annee.", targetKanji: ["七", "月"] },
  { word: "八月", meanings: ["Aout"], readings: ["はちがつ"], mnemonicFr: "AOUT - le huitieme mois de l'annee.", targetKanji: ["八", "月"] },
  { word: "九月", meanings: ["Septembre"], readings: ["くがつ"], mnemonicFr: "SEPTEMBRE - le neuvieme mois de l'annee.", targetKanji: ["九", "月"] },
  { word: "十月", meanings: ["Octobre"], readings: ["じゅうがつ"], mnemonicFr: "OCTOBRE - le dixieme mois de l'annee.", targetKanji: ["十", "月"] },
  { word: "十一月", meanings: ["Novembre"], readings: ["じゅういちがつ"], mnemonicFr: "NOVEMBRE - le onzieme mois de l'annee.", targetKanji: ["十", "一", "月"] },
  { word: "十二月", meanings: ["Decembre"], readings: ["じゅうにがつ"], mnemonicFr: "DECEMBRE - le douzieme mois de l'annee.", targetKanji: ["十", "二", "月"] },
  { word: "正月", meanings: ["Nouvel An", "Premier mois"], readings: ["しょうがつ"], mnemonicFr: "NOUVEL AN - les celebrations du Nouvel An japonais.", targetKanji: ["正", "月"] },
  { word: "半月", meanings: ["Demi-lune", "Quinze jours"], readings: ["はんつき", "はんげつ"], mnemonicFr: "DEMI-LUNE - la moitie d'un mois ou forme de la lune.", targetKanji: ["半", "月"] },
  { word: "新月", meanings: ["Nouvelle lune"], readings: ["しんげつ"], mnemonicFr: "NOUVELLE LUNE - phase lunaire sans lumiere visible.", targetKanji: ["新", "月"] },
  { word: "満月", meanings: ["Pleine lune"], readings: ["まんげつ"], mnemonicFr: "PLEINE LUNE - phase lunaire entierement eclairee.", targetKanji: ["満", "月"] },
  { word: "月光", meanings: ["Clair de lune"], readings: ["げっこう"], mnemonicFr: "CLAIR DE LUNE - la lumiere de la lune la nuit.", targetKanji: ["月", "光"] },
];

const vocabPart2 = [
  // === WEEK (週) RELATED ===
  { word: "今週", meanings: ["Cette semaine"], readings: ["こんしゅう"], mnemonicFr: "CETTE SEMAINE - la semaine en cours.", targetKanji: ["今", "週"] },
  { word: "来週", meanings: ["La semaine prochaine"], readings: ["らいしゅう"], mnemonicFr: "LA SEMAINE PROCHAINE - la semaine qui suit celle-ci.", targetKanji: ["来", "週"] },
  { word: "先週", meanings: ["La semaine derniere"], readings: ["せんしゅう"], mnemonicFr: "LA SEMAINE DERNIERE - la semaine qui a precede.", targetKanji: ["先", "週"] },
  { word: "毎週", meanings: ["Chaque semaine", "Hebdomadaire"], readings: ["まいしゅう"], mnemonicFr: "CHAQUE SEMAINE - quelque chose qui se repete hebdomadairement.", targetKanji: ["毎", "週"] },
  { word: "週末", meanings: ["Week-end", "Fin de semaine"], readings: ["しゅうまつ"], mnemonicFr: "WEEK-END - samedi et dimanche.", targetKanji: ["週", "末"] },
  { word: "週間", meanings: ["Semaine", "Periode d'une semaine"], readings: ["しゅうかん"], mnemonicFr: "SEMAINE - periode de sept jours.", targetKanji: ["週", "間"] },
  { word: "一週間", meanings: ["Une semaine"], readings: ["いっしゅうかん"], mnemonicFr: "UNE SEMAINE - sept jours complets.", targetKanji: ["一", "週", "間"] },
  { word: "二週間", meanings: ["Deux semaines"], readings: ["にしゅうかん"], mnemonicFr: "DEUX SEMAINES - quatorze jours.", targetKanji: ["二", "週", "間"] },
  { word: "三週間", meanings: ["Trois semaines"], readings: ["さんしゅうかん"], mnemonicFr: "TROIS SEMAINES - vingt-et-un jours.", targetKanji: ["三", "週", "間"] },
  { word: "週刊", meanings: ["Hebdomadaire", "Publication hebdo"], readings: ["しゅうかん"], mnemonicFr: "HEBDOMADAIRE - publie chaque semaine.", targetKanji: ["週", "刊"] },

  // === DAYS OF THE WEEK (曜日) ===
  { word: "曜日", meanings: ["Jour de la semaine"], readings: ["ようび"], mnemonicFr: "JOUR DE LA SEMAINE - lundi, mardi, etc.", targetKanji: ["曜", "日"] },
  { word: "月曜日", meanings: ["Lundi"], readings: ["げつようび"], mnemonicFr: "LUNDI - le jour de la lune, premier jour de la semaine.", targetKanji: ["月", "曜", "日"] },
  { word: "火曜日", meanings: ["Mardi"], readings: ["かようび"], mnemonicFr: "MARDI - le jour du feu, deuxieme jour de la semaine.", targetKanji: ["火", "曜", "日"] },
  { word: "水曜日", meanings: ["Mercredi"], readings: ["すいようび"], mnemonicFr: "MERCREDI - le jour de l'eau, milieu de la semaine.", targetKanji: ["水", "曜", "日"] },
  { word: "木曜日", meanings: ["Jeudi"], readings: ["もくようび"], mnemonicFr: "JEUDI - le jour du bois, quatrieme jour de la semaine.", targetKanji: ["木", "曜", "日"] },
  { word: "金曜日", meanings: ["Vendredi"], readings: ["きんようび"], mnemonicFr: "VENDREDI - le jour de l'or, avant le week-end.", targetKanji: ["金", "曜", "日"] },
  { word: "土曜日", meanings: ["Samedi"], readings: ["どようび"], mnemonicFr: "SAMEDI - le jour de la terre, debut du week-end.", targetKanji: ["土", "曜", "日"] },
  { word: "日曜日", meanings: ["Dimanche"], readings: ["にちようび"], mnemonicFr: "DIMANCHE - le jour du soleil, jour de repos.", targetKanji: ["日", "曜", "日"] },
  { word: "月曜", meanings: ["Lundi"], readings: ["げつよう"], mnemonicFr: "LUNDI - forme courte de lundi.", targetKanji: ["月", "曜"] },
  { word: "火曜", meanings: ["Mardi"], readings: ["かよう"], mnemonicFr: "MARDI - forme courte de mardi.", targetKanji: ["火", "曜"] },
  { word: "水曜", meanings: ["Mercredi"], readings: ["すいよう"], mnemonicFr: "MERCREDI - forme courte de mercredi.", targetKanji: ["水", "曜"] },
  { word: "木曜", meanings: ["Jeudi"], readings: ["もくよう"], mnemonicFr: "JEUDI - forme courte de jeudi.", targetKanji: ["木", "曜"] },
  { word: "金曜", meanings: ["Vendredi"], readings: ["きんよう"], mnemonicFr: "VENDREDI - forme courte de vendredi.", targetKanji: ["金", "曜"] },
  { word: "土曜", meanings: ["Samedi"], readings: ["どよう"], mnemonicFr: "SAMEDI - forme courte de samedi.", targetKanji: ["土", "曜"] },
  { word: "日曜", meanings: ["Dimanche"], readings: ["にちよう"], mnemonicFr: "DIMANCHE - forme courte de dimanche.", targetKanji: ["日", "曜"] },

  // === DAY (日) RELATED ===
  { word: "今日", meanings: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "AUJOURD'HUI - le jour present.", targetKanji: ["今", "日"] },
  { word: "明日", meanings: ["Demain"], readings: ["あした", "あす"], mnemonicFr: "DEMAIN - le jour qui suit aujourd'hui.", targetKanji: ["明", "日"] },
  { word: "昨日", meanings: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER - le jour qui a precede aujourd'hui.", targetKanji: ["昨", "日"] },
  { word: "毎日", meanings: ["Chaque jour", "Tous les jours"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - quotidiennement.", targetKanji: ["毎", "日"] },
  { word: "日中", meanings: ["Durant la journee", "En journee"], readings: ["にっちゅう"], mnemonicFr: "EN JOURNEE - pendant les heures de jour.", targetKanji: ["日", "中"] },
  { word: "日常", meanings: ["Quotidien", "Vie de tous les jours"], readings: ["にちじょう"], mnemonicFr: "QUOTIDIEN - la routine de tous les jours.", targetKanji: ["日", "常"] },
  { word: "日記", meanings: ["Journal intime"], readings: ["にっき"], mnemonicFr: "JOURNAL INTIME - ecrire ses pensees chaque jour.", targetKanji: ["日", "記"] },
  { word: "半日", meanings: ["Demi-journee"], readings: ["はんにち"], mnemonicFr: "DEMI-JOURNEE - la moitie d'une journee.", targetKanji: ["半", "日"] },
  { word: "一日", meanings: ["Un jour", "Premier du mois"], readings: ["いちにち", "ついたち"], mnemonicFr: "UN JOUR - vingt-quatre heures ou le 1er du mois.", targetKanji: ["一", "日"] },
  { word: "二日", meanings: ["Deux jours", "Le deux"], readings: ["ふつか"], mnemonicFr: "DEUX JOURS - ou le 2 du mois.", targetKanji: ["二", "日"] },
  { word: "三日", meanings: ["Trois jours", "Le trois"], readings: ["みっか"], mnemonicFr: "TROIS JOURS - ou le 3 du mois.", targetKanji: ["三", "日"] },
  { word: "四日", meanings: ["Quatre jours", "Le quatre"], readings: ["よっか"], mnemonicFr: "QUATRE JOURS - ou le 4 du mois.", targetKanji: ["四", "日"] },
  { word: "五日", meanings: ["Cinq jours", "Le cinq"], readings: ["いつか"], mnemonicFr: "CINQ JOURS - ou le 5 du mois.", targetKanji: ["五", "日"] },
  { word: "六日", meanings: ["Six jours", "Le six"], readings: ["むいか"], mnemonicFr: "SIX JOURS - ou le 6 du mois.", targetKanji: ["六", "日"] },
  { word: "七日", meanings: ["Sept jours", "Le sept"], readings: ["なのか"], mnemonicFr: "SEPT JOURS - ou le 7 du mois.", targetKanji: ["七", "日"] },
  { word: "八日", meanings: ["Huit jours", "Le huit"], readings: ["ようか"], mnemonicFr: "HUIT JOURS - ou le 8 du mois.", targetKanji: ["八", "日"] },
  { word: "九日", meanings: ["Neuf jours", "Le neuf"], readings: ["ここのか"], mnemonicFr: "NEUF JOURS - ou le 9 du mois.", targetKanji: ["九", "日"] },
  { word: "十日", meanings: ["Dix jours", "Le dix"], readings: ["とおか"], mnemonicFr: "DIX JOURS - ou le 10 du mois.", targetKanji: ["十", "日"] },
];

const vocabPart3 = [
  // === MORE DAYS OF MONTH ===
  { word: "十一日", meanings: ["Onze jours", "Le onze"], readings: ["じゅういちにち"], mnemonicFr: "ONZE - le 11 du mois.", targetKanji: ["十", "一", "日"] },
  { word: "十二日", meanings: ["Douze jours", "Le douze"], readings: ["じゅうににち"], mnemonicFr: "DOUZE - le 12 du mois.", targetKanji: ["十", "二", "日"] },
  { word: "十三日", meanings: ["Treize jours", "Le treize"], readings: ["じゅうさんにち"], mnemonicFr: "TREIZE - le 13 du mois.", targetKanji: ["十", "三", "日"] },
  { word: "十四日", meanings: ["Quatorze jours", "Le quatorze"], readings: ["じゅうよっか"], mnemonicFr: "QUATORZE - le 14 du mois.", targetKanji: ["十", "四", "日"] },
  { word: "十五日", meanings: ["Quinze jours", "Le quinze"], readings: ["じゅうごにち"], mnemonicFr: "QUINZE - le 15 du mois.", targetKanji: ["十", "五", "日"] },
  { word: "二十日", meanings: ["Vingt jours", "Le vingt"], readings: ["はつか"], mnemonicFr: "VINGT - le 20 du mois.", targetKanji: ["二", "十", "日"] },
  { word: "二十四日", meanings: ["Le vingt-quatre"], readings: ["にじゅうよっか"], mnemonicFr: "VINGT-QUATRE - le 24 du mois.", targetKanji: ["二", "十", "四", "日"] },

  // === SPECIAL DAYS ===
  { word: "祝日", meanings: ["Jour ferie"], readings: ["しゅくじつ"], mnemonicFr: "JOUR FERIE - jour de celebration nationale.", targetKanji: ["祝", "日"] },
  { word: "休日", meanings: ["Jour de repos", "Jour de conge"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS - journee sans travail.", targetKanji: ["休", "日"] },
  { word: "平日", meanings: ["Jour de semaine", "Jour ouvrable"], readings: ["へいじつ"], mnemonicFr: "JOUR OUVRABLE - du lundi au vendredi.", targetKanji: ["平", "日"] },
  { word: "記念日", meanings: ["Anniversaire", "Commemoration"], readings: ["きねんび"], mnemonicFr: "ANNIVERSAIRE - jour marquant un evenement special.", targetKanji: ["記", "念", "日"] },
  { word: "誕生日", meanings: ["Anniversaire de naissance"], readings: ["たんじょうび"], mnemonicFr: "ANNIVERSAIRE - le jour ou l'on est ne.", targetKanji: ["誕", "生", "日"] },
  { word: "生年月日", meanings: ["Date de naissance"], readings: ["せいねんがっぴ"], mnemonicFr: "DATE DE NAISSANCE - jour, mois et annee de naissance.", targetKanji: ["生", "年", "月", "日"] },
  { word: "本日", meanings: ["Aujourd'hui", "Ce jour"], readings: ["ほんじつ"], mnemonicFr: "AUJOURD'HUI - forme formelle pour dire aujourd'hui.", targetKanji: ["本", "日"] },
  { word: "前日", meanings: ["La veille", "Le jour precedent"], readings: ["ぜんじつ"], mnemonicFr: "LA VEILLE - le jour d'avant.", targetKanji: ["前", "日"] },
  { word: "後日", meanings: ["Un autre jour", "Plus tard"], readings: ["ごじつ"], mnemonicFr: "UN AUTRE JOUR - dans le futur.", targetKanji: ["後", "日"] },
  { word: "連日", meanings: ["Jour apres jour", "Consecutivement"], readings: ["れんじつ"], mnemonicFr: "JOUR APRES JOUR - plusieurs jours de suite.", targetKanji: ["連", "日"] },
  { word: "翌日", meanings: ["Le lendemain"], readings: ["よくじつ"], mnemonicFr: "LE LENDEMAIN - le jour suivant.", targetKanji: ["翌", "日"] },
  { word: "当日", meanings: ["Le jour meme"], readings: ["とうじつ"], mnemonicFr: "LE JOUR MEME - ce jour precis.", targetKanji: ["当", "日"] },
  { word: "日光", meanings: ["Lumiere du soleil"], readings: ["にっこう"], mnemonicFr: "LUMIERE DU SOLEIL - les rayons du soleil.", targetKanji: ["日", "光"] },
  { word: "日本", meanings: ["Japon"], readings: ["にほん", "にっぽん"], mnemonicFr: "JAPON - le pays du soleil levant.", targetKanji: ["日", "本"] },
  { word: "日本語", meanings: ["Japonais (langue)"], readings: ["にほんご"], mnemonicFr: "JAPONAIS - la langue du Japon.", targetKanji: ["日", "本", "語"] },
  { word: "日本人", meanings: ["Japonais (personne)"], readings: ["にほんじん"], mnemonicFr: "JAPONAIS - une personne du Japon.", targetKanji: ["日", "本", "人"] },

  // === SEASONS (四季) ===
  { word: "四季", meanings: ["Quatre saisons"], readings: ["しき"], mnemonicFr: "QUATRE SAISONS - printemps, ete, automne, hiver.", targetKanji: ["四", "季"] },
  { word: "季節", meanings: ["Saison"], readings: ["きせつ"], mnemonicFr: "SAISON - une des quatre periodes de l'annee.", targetKanji: ["季", "節"] },
  { word: "春", meanings: ["Printemps"], readings: ["はる"], mnemonicFr: "PRINTEMPS - saison du renouveau.", targetKanji: ["春"] },
  { word: "夏", meanings: ["Ete"], readings: ["なつ"], mnemonicFr: "ETE - saison chaude.", targetKanji: ["夏"] },
  { word: "秋", meanings: ["Automne"], readings: ["あき"], mnemonicFr: "AUTOMNE - saison des feuilles mortes.", targetKanji: ["秋"] },
  { word: "冬", meanings: ["Hiver"], readings: ["ふゆ"], mnemonicFr: "HIVER - saison froide.", targetKanji: ["冬"] },
  { word: "春夏秋冬", meanings: ["Les quatre saisons"], readings: ["しゅんかしゅうとう"], mnemonicFr: "LES QUATRE SAISONS - le cycle annuel complet.", targetKanji: ["春", "夏", "秋", "冬"] },
  { word: "初夏", meanings: ["Debut de l'ete"], readings: ["しょか"], mnemonicFr: "DEBUT DE L'ETE - les premiers jours chauds.", targetKanji: ["初", "夏"] },
  { word: "真夏", meanings: ["Plein ete"], readings: ["まなつ"], mnemonicFr: "PLEIN ETE - le coeur de l'ete.", targetKanji: ["真", "夏"] },
  { word: "晩秋", meanings: ["Fin de l'automne"], readings: ["ばんしゅう"], mnemonicFr: "FIN DE L'AUTOMNE - les derniers jours d'automne.", targetKanji: ["晩", "秋"] },
  { word: "初冬", meanings: ["Debut de l'hiver"], readings: ["しょとう"], mnemonicFr: "DEBUT DE L'HIVER - les premiers froids.", targetKanji: ["初", "冬"] },
  { word: "真冬", meanings: ["Plein hiver"], readings: ["まふゆ"], mnemonicFr: "PLEIN HIVER - le coeur de l'hiver.", targetKanji: ["真", "冬"] },
];

const vocabPart4 = [
  // === TIME PERIODS ===
  { word: "世紀", meanings: ["Siecle"], readings: ["せいき"], mnemonicFr: "SIECLE - periode de cent ans.", targetKanji: ["世", "紀"] },
  { word: "時代", meanings: ["Epoque", "Ere"], readings: ["じだい"], mnemonicFr: "EPOQUE - periode historique.", targetKanji: ["時", "代"] },
  { word: "時期", meanings: ["Periode", "Moment"], readings: ["じき"], mnemonicFr: "PERIODE - moment particulier.", targetKanji: ["時", "期"] },
  { word: "期間", meanings: ["Duree", "Periode"], readings: ["きかん"], mnemonicFr: "DUREE - laps de temps defini.", targetKanji: ["期", "間"] },
  { word: "時間", meanings: ["Temps", "Heure"], readings: ["じかん"], mnemonicFr: "TEMPS - la duree qui passe.", targetKanji: ["時", "間"] },
  { word: "一時間", meanings: ["Une heure"], readings: ["いちじかん"], mnemonicFr: "UNE HEURE - soixante minutes.", targetKanji: ["一", "時", "間"] },
  { word: "二時間", meanings: ["Deux heures"], readings: ["にじかん"], mnemonicFr: "DEUX HEURES - cent vingt minutes.", targetKanji: ["二", "時", "間"] },
  { word: "長期", meanings: ["Long terme"], readings: ["ちょうき"], mnemonicFr: "LONG TERME - sur une longue periode.", targetKanji: ["長", "期"] },
  { word: "短期", meanings: ["Court terme"], readings: ["たんき"], mnemonicFr: "COURT TERME - sur une courte periode.", targetKanji: ["短", "期"] },
  { word: "前期", meanings: ["Premier semestre", "Premiere partie"], readings: ["ぜんき"], mnemonicFr: "PREMIER SEMESTRE - la premiere moitie.", targetKanji: ["前", "期"] },
  { word: "後期", meanings: ["Deuxieme semestre", "Derniere partie"], readings: ["こうき"], mnemonicFr: "DEUXIEME SEMESTRE - la seconde moitie.", targetKanji: ["後", "期"] },
  { word: "学期", meanings: ["Semestre scolaire"], readings: ["がっき"], mnemonicFr: "SEMESTRE SCOLAIRE - periode d'etudes.", targetKanji: ["学", "期"] },
  { word: "定期", meanings: ["Regulier", "Periodique"], readings: ["ていき"], mnemonicFr: "REGULIER - qui revient a intervalles fixes.", targetKanji: ["定", "期"] },
  { word: "現代", meanings: ["Epoque moderne", "Actuel"], readings: ["げんだい"], mnemonicFr: "EPOQUE MODERNE - notre temps present.", targetKanji: ["現", "代"] },
  { word: "古代", meanings: ["Antiquite"], readings: ["こだい"], mnemonicFr: "ANTIQUITE - les temps anciens.", targetKanji: ["古", "代"] },
  { word: "近代", meanings: ["Ere moderne"], readings: ["きんだい"], mnemonicFr: "ERE MODERNE - periode recente de l'histoire.", targetKanji: ["近", "代"] },
  { word: "中世", meanings: ["Moyen Age"], readings: ["ちゅうせい"], mnemonicFr: "MOYEN AGE - periode medievale.", targetKanji: ["中", "世"] },

  // === MORE TIME EXPRESSIONS ===
  { word: "朝", meanings: ["Matin"], readings: ["あさ"], mnemonicFr: "MATIN - le debut de la journee.", targetKanji: ["朝"] },
  { word: "昼", meanings: ["Midi", "Journee"], readings: ["ひる"], mnemonicFr: "MIDI - le milieu de la journee.", targetKanji: ["昼"] },
  { word: "夜", meanings: ["Nuit"], readings: ["よる"], mnemonicFr: "NUIT - la periode sombre de la journee.", targetKanji: ["夜"] },
  { word: "夕方", meanings: ["Soir", "Crepuscule"], readings: ["ゆうがた"], mnemonicFr: "SOIR - la fin de l'apres-midi.", targetKanji: ["夕", "方"] },
  { word: "午前", meanings: ["Matin", "AM"], readings: ["ごぜん"], mnemonicFr: "MATIN - avant midi.", targetKanji: ["午", "前"] },
  { word: "午後", meanings: ["Apres-midi", "PM"], readings: ["ごご"], mnemonicFr: "APRES-MIDI - apres midi.", targetKanji: ["午", "後"] },
  { word: "早朝", meanings: ["Tot le matin"], readings: ["そうちょう"], mnemonicFr: "TOT LE MATIN - les premieres heures du jour.", targetKanji: ["早", "朝"] },
  { word: "深夜", meanings: ["Tard dans la nuit"], readings: ["しんや"], mnemonicFr: "TARD DANS LA NUIT - les heures avancees.", targetKanji: ["深", "夜"] },
  { word: "真夜中", meanings: ["Minuit"], readings: ["まよなか"], mnemonicFr: "MINUIT - le milieu de la nuit.", targetKanji: ["真", "夜", "中"] },
  { word: "毎朝", meanings: ["Chaque matin"], readings: ["まいあさ"], mnemonicFr: "CHAQUE MATIN - tous les matins.", targetKanji: ["毎", "朝"] },
  { word: "毎晩", meanings: ["Chaque soir"], readings: ["まいばん"], mnemonicFr: "CHAQUE SOIR - tous les soirs.", targetKanji: ["毎", "晩"] },
  { word: "今朝", meanings: ["Ce matin"], readings: ["けさ"], mnemonicFr: "CE MATIN - le matin d'aujourd'hui.", targetKanji: ["今", "朝"] },
  { word: "今夜", meanings: ["Ce soir", "Cette nuit"], readings: ["こんや"], mnemonicFr: "CE SOIR - la nuit d'aujourd'hui.", targetKanji: ["今", "夜"] },
  { word: "昼間", meanings: ["Durant la journee"], readings: ["ひるま"], mnemonicFr: "DURANT LA JOURNEE - les heures de lumiere.", targetKanji: ["昼", "間"] },
  { word: "夜間", meanings: ["Durant la nuit"], readings: ["やかん"], mnemonicFr: "DURANT LA NUIT - les heures sombres.", targetKanji: ["夜", "間"] },
  { word: "朝食", meanings: ["Petit-dejeuner"], readings: ["ちょうしょく"], mnemonicFr: "PETIT-DEJEUNER - le repas du matin.", targetKanji: ["朝", "食"] },
  { word: "昼食", meanings: ["Dejeuner"], readings: ["ちゅうしょく"], mnemonicFr: "DEJEUNER - le repas de midi.", targetKanji: ["昼", "食"] },
  { word: "夕食", meanings: ["Diner"], readings: ["ゆうしょく"], mnemonicFr: "DINER - le repas du soir.", targetKanji: ["夕", "食"] },
];

const vocabPart5 = [
  // === PAST/FUTURE/PRESENT ===
  { word: "過去", meanings: ["Passe"], readings: ["かこ"], mnemonicFr: "PASSE - ce qui s'est deja produit.", targetKanji: ["過", "去"] },
  { word: "現在", meanings: ["Present", "Actuel"], readings: ["げんざい"], mnemonicFr: "PRESENT - le moment actuel.", targetKanji: ["現", "在"] },
  { word: "未来", meanings: ["Futur", "Avenir"], readings: ["みらい"], mnemonicFr: "FUTUR - ce qui va arriver.", targetKanji: ["未", "来"] },
  { word: "将来", meanings: ["Avenir"], readings: ["しょうらい"], mnemonicFr: "AVENIR - le futur proche ou lointain.", targetKanji: ["将", "来"] },
  { word: "以前", meanings: ["Avant", "Auparavant"], readings: ["いぜん"], mnemonicFr: "AVANT - dans le passe.", targetKanji: ["以", "前"] },
  { word: "以後", meanings: ["Apres", "Desormais"], readings: ["いご"], mnemonicFr: "APRES - a partir de ce moment.", targetKanji: ["以", "後"] },
  { word: "以来", meanings: ["Depuis"], readings: ["いらい"], mnemonicFr: "DEPUIS - a partir d'un moment.", targetKanji: ["以", "来"] },
  { word: "今後", meanings: ["Desormais", "A l'avenir"], readings: ["こんご"], mnemonicFr: "DESORMAIS - a partir de maintenant.", targetKanji: ["今", "後"] },
  { word: "昔", meanings: ["Autrefois", "Jadis"], readings: ["むかし"], mnemonicFr: "AUTREFOIS - il y a longtemps.", targetKanji: ["昔"] },
  { word: "今", meanings: ["Maintenant"], readings: ["いま"], mnemonicFr: "MAINTENANT - en ce moment.", targetKanji: ["今"] },
  { word: "先", meanings: ["Avant", "D'abord"], readings: ["さき"], mnemonicFr: "AVANT - qui precede.", targetKanji: ["先"] },
  { word: "後", meanings: ["Apres", "Derriere"], readings: ["あと"], mnemonicFr: "APRES - qui suit.", targetKanji: ["後"] },
  { word: "前", meanings: ["Avant", "Devant"], readings: ["まえ"], mnemonicFr: "AVANT - ce qui precede.", targetKanji: ["前"] },
  { word: "次", meanings: ["Suivant", "Prochain"], readings: ["つぎ"], mnemonicFr: "SUIVANT - ce qui vient apres.", targetKanji: ["次"] },

  // === FREQUENCY ===
  { word: "一度", meanings: ["Une fois"], readings: ["いちど"], mnemonicFr: "UNE FOIS - une seule occurrence.", targetKanji: ["一", "度"] },
  { word: "二度", meanings: ["Deux fois"], readings: ["にど"], mnemonicFr: "DEUX FOIS - deux occurrences.", targetKanji: ["二", "度"] },
  { word: "何度", meanings: ["Combien de fois"], readings: ["なんど"], mnemonicFr: "COMBIEN DE FOIS - question sur la frequence.", targetKanji: ["何", "度"] },
  { word: "何度も", meanings: ["Plusieurs fois"], readings: ["なんども"], mnemonicFr: "PLUSIEURS FOIS - de nombreuses occurrences.", targetKanji: ["何", "度"] },
  { word: "時々", meanings: ["Parfois", "De temps en temps"], readings: ["ときどき"], mnemonicFr: "PARFOIS - de maniere occasionnelle.", targetKanji: ["時", "時"] },
  { word: "常に", meanings: ["Toujours", "Constamment"], readings: ["つねに"], mnemonicFr: "TOUJOURS - de facon permanente.", targetKanji: ["常"] },
  { word: "日々", meanings: ["Jour apres jour", "Quotidiennement"], readings: ["ひび"], mnemonicFr: "JOUR APRES JOUR - chaque jour qui passe.", targetKanji: ["日", "日"] },

  // === DURATION ===
  { word: "終日", meanings: ["Toute la journee"], readings: ["しゅうじつ"], mnemonicFr: "TOUTE LA JOURNEE - du matin au soir.", targetKanji: ["終", "日"] },
  { word: "永久", meanings: ["Eternel", "Permanent"], readings: ["えいきゅう"], mnemonicFr: "ETERNEL - qui dure toujours.", targetKanji: ["永", "久"] },
  { word: "一生", meanings: ["Toute la vie"], readings: ["いっしょう"], mnemonicFr: "TOUTE LA VIE - de la naissance a la mort.", targetKanji: ["一", "生"] },
  { word: "生涯", meanings: ["Vie entiere"], readings: ["しょうがい"], mnemonicFr: "VIE ENTIERE - l'integralite de sa vie.", targetKanji: ["生", "涯"] },
  { word: "瞬間", meanings: ["Instant", "Moment"], readings: ["しゅんかん"], mnemonicFr: "INSTANT - un tres court moment.", targetKanji: ["瞬", "間"] },
  { word: "一瞬", meanings: ["Un instant"], readings: ["いっしゅん"], mnemonicFr: "UN INSTANT - une fraction de seconde.", targetKanji: ["一", "瞬"] },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - qui dure longtemps.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court", "Bref"], readings: ["みじかい"], mnemonicFr: "COURT - qui dure peu de temps.", targetKanji: ["短"] },
];

const vocabPart6 = [
  // === CALENDAR SPECIFIC ===
  { word: "暦", meanings: ["Calendrier"], readings: ["こよみ"], mnemonicFr: "CALENDRIER - systeme de comptage des jours.", targetKanji: ["暦"] },
  { word: "旧暦", meanings: ["Ancien calendrier", "Calendrier lunaire"], readings: ["きゅうれき"], mnemonicFr: "ANCIEN CALENDRIER - le calendrier traditionnel.", targetKanji: ["旧", "暦"] },
  { word: "新暦", meanings: ["Nouveau calendrier", "Calendrier solaire"], readings: ["しんれき"], mnemonicFr: "NOUVEAU CALENDRIER - le calendrier gregorien.", targetKanji: ["新", "暦"] },
  { word: "日付", meanings: ["Date"], readings: ["ひづけ"], mnemonicFr: "DATE - jour du mois.", targetKanji: ["日", "付"] },
  { word: "日程", meanings: ["Programme", "Calendrier"], readings: ["にってい"], mnemonicFr: "PROGRAMME - planning des evenements.", targetKanji: ["日", "程"] },
  { word: "予定", meanings: ["Programme", "Prevision"], readings: ["よてい"], mnemonicFr: "PROGRAMME - ce qui est planifie.", targetKanji: ["予", "定"] },
  { word: "日時", meanings: ["Date et heure"], readings: ["にちじ"], mnemonicFr: "DATE ET HEURE - moment precis.", targetKanji: ["日", "時"] },

  // === STARTING/ENDING ===
  { word: "始まり", meanings: ["Debut", "Commencement"], readings: ["はじまり"], mnemonicFr: "DEBUT - le commencement de quelque chose.", targetKanji: ["始"] },
  { word: "終わり", meanings: ["Fin"], readings: ["おわり"], mnemonicFr: "FIN - la conclusion de quelque chose.", targetKanji: ["終"] },
  { word: "開始", meanings: ["Commencement", "Debut"], readings: ["かいし"], mnemonicFr: "COMMENCEMENT - le debut d'une action.", targetKanji: ["開", "始"] },
  { word: "終了", meanings: ["Fin", "Conclusion"], readings: ["しゅうりょう"], mnemonicFr: "FIN - la conclusion d'une action.", targetKanji: ["終", "了"] },
  { word: "始める", meanings: ["Commencer"], readings: ["はじめる"], mnemonicFr: "COMMENCER - debuter quelque chose.", targetKanji: ["始"] },
  { word: "終わる", meanings: ["Finir", "Se terminer"], readings: ["おわる"], mnemonicFr: "FINIR - arriver a la fin.", targetKanji: ["終"] },

  // === AGE ===
  { word: "年齢", meanings: ["Age"], readings: ["ねんれい"], mnemonicFr: "AGE - le nombre d'annees vecues.", targetKanji: ["年", "齢"] },
  { word: "歳", meanings: ["An (age)", "Annee"], readings: ["さい"], mnemonicFr: "AN - unite pour compter l'age.", targetKanji: ["歳"] },
  { word: "一歳", meanings: ["Un an"], readings: ["いっさい"], mnemonicFr: "UN AN - avoir un an d'age.", targetKanji: ["一", "歳"] },
  { word: "二歳", meanings: ["Deux ans"], readings: ["にさい"], mnemonicFr: "DEUX ANS - avoir deux ans d'age.", targetKanji: ["二", "歳"] },
  { word: "三歳", meanings: ["Trois ans"], readings: ["さんさい"], mnemonicFr: "TROIS ANS - avoir trois ans d'age.", targetKanji: ["三", "歳"] },
  { word: "十歳", meanings: ["Dix ans"], readings: ["じゅっさい"], mnemonicFr: "DIX ANS - avoir dix ans d'age.", targetKanji: ["十", "歳"] },
  { word: "二十歳", meanings: ["Vingt ans", "Majorite"], readings: ["はたち"], mnemonicFr: "VINGT ANS - l'age de la majorite au Japon.", targetKanji: ["二", "十", "歳"] },
  { word: "何歳", meanings: ["Quel age"], readings: ["なんさい"], mnemonicFr: "QUEL AGE - question sur l'age.", targetKanji: ["何", "歳"] },

  // === YEARLY EVENTS ===
  { word: "元日", meanings: ["Jour de l'An"], readings: ["がんじつ"], mnemonicFr: "JOUR DE L'AN - le premier janvier.", targetKanji: ["元", "日"] },
  { word: "元旦", meanings: ["Matin du Nouvel An"], readings: ["がんたん"], mnemonicFr: "MATIN DU NOUVEL AN - l'aube du premier janvier.", targetKanji: ["元", "旦"] },
  { word: "大晦日", meanings: ["Saint-Sylvestre", "31 decembre"], readings: ["おおみそか"], mnemonicFr: "SAINT-SYLVESTRE - le dernier jour de l'annee.", targetKanji: ["大", "晦", "日"] },
  { word: "節分", meanings: ["Setsubun", "Fete du printemps"], readings: ["せつぶん"], mnemonicFr: "SETSUBUN - fete marquant le debut du printemps.", targetKanji: ["節", "分"] },
  { word: "七夕", meanings: ["Tanabata", "Fete des etoiles"], readings: ["たなばた"], mnemonicFr: "TANABATA - fete des etoiles le 7 juillet.", targetKanji: ["七", "夕"] },
  { word: "花見", meanings: ["Hanami", "Contemplation des cerisiers"], readings: ["はなみ"], mnemonicFr: "HANAMI - admirer les fleurs de cerisier.", targetKanji: ["花", "見"] },
  { word: "紅葉", meanings: ["Feuilles d'automne", "Momiji"], readings: ["こうよう", "もみじ"], mnemonicFr: "FEUILLES D'AUTOMNE - les couleurs de l'automne.", targetKanji: ["紅", "葉"] },
];

const vocabPart7 = [
  // === MORE TIME EXPRESSIONS ===
  { word: "明後日", meanings: ["Apres-demain"], readings: ["あさって"], mnemonicFr: "APRES-DEMAIN - dans deux jours.", targetKanji: ["明", "後", "日"] },
  { word: "一昨日", meanings: ["Avant-hier"], readings: ["おととい"], mnemonicFr: "AVANT-HIER - il y a deux jours.", targetKanji: ["一", "昨", "日"] },
  { word: "一昨年", meanings: ["Il y a deux ans"], readings: ["おととし"], mnemonicFr: "IL Y A DEUX ANS - l'annee avant l'annee derniere.", targetKanji: ["一", "昨", "年"] },
  { word: "再来年", meanings: ["Dans deux ans"], readings: ["さらいねん"], mnemonicFr: "DANS DEUX ANS - l'annee apres l'annee prochaine.", targetKanji: ["再", "来", "年"] },
  { word: "再来週", meanings: ["Dans deux semaines"], readings: ["さらいしゅう"], mnemonicFr: "DANS DEUX SEMAINES - la semaine apres la prochaine.", targetKanji: ["再", "来", "週"] },
  { word: "再来月", meanings: ["Dans deux mois"], readings: ["さらいげつ"], mnemonicFr: "DANS DEUX MOIS - le mois apres le prochain.", targetKanji: ["再", "来", "月"] },

  // === EARLY/LATE ===
  { word: "早い", meanings: ["Tot", "Rapide"], readings: ["はやい"], mnemonicFr: "TOT - qui arrive en avance.", targetKanji: ["早"] },
  { word: "遅い", meanings: ["Tard", "Lent"], readings: ["おそい"], mnemonicFr: "TARD - qui arrive en retard.", targetKanji: ["遅"] },
  { word: "早く", meanings: ["Tot", "Vite"], readings: ["はやく"], mnemonicFr: "VITE - de maniere rapide.", targetKanji: ["早"] },
  { word: "遅く", meanings: ["Tard"], readings: ["おそく"], mnemonicFr: "TARD - a une heure avancee.", targetKanji: ["遅"] },
  { word: "早起き", meanings: ["Lever tot"], readings: ["はやおき"], mnemonicFr: "LEVER TOT - se reveiller de bonne heure.", targetKanji: ["早", "起"] },
  { word: "夜更かし", meanings: ["Veiller tard"], readings: ["よふかし"], mnemonicFr: "VEILLER TARD - rester eveille la nuit.", targetKanji: ["夜", "更"] },

  // === REGULAR/IRREGULAR ===
  { word: "定期的", meanings: ["Regulier", "Periodique"], readings: ["ていきてき"], mnemonicFr: "REGULIER - qui revient a intervalles fixes.", targetKanji: ["定", "期", "的"] },
  { word: "不定期", meanings: ["Irregulier"], readings: ["ふていき"], mnemonicFr: "IRREGULIER - sans calendrier fixe.", targetKanji: ["不", "定", "期"] },
  { word: "臨時", meanings: ["Temporaire", "Special"], readings: ["りんじ"], mnemonicFr: "TEMPORAIRE - pour une occasion speciale.", targetKanji: ["臨", "時"] },
  { word: "通常", meanings: ["Normal", "Habituel"], readings: ["つうじょう"], mnemonicFr: "NORMAL - dans les conditions habituelles.", targetKanji: ["通", "常"] },
  { word: "非常", meanings: ["Urgence", "Extraordinaire"], readings: ["ひじょう"], mnemonicFr: "URGENCE - situation inhabituelle.", targetKanji: ["非", "常"] },
  { word: "異常", meanings: ["Anormal"], readings: ["いじょう"], mnemonicFr: "ANORMAL - qui n'est pas normal.", targetKanji: ["異", "常"] },

  // === WAITING/DEADLINE ===
  { word: "待つ", meanings: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE - rester jusqu'a ce que.", targetKanji: ["待"] },
  { word: "期待", meanings: ["Attente", "Espoir"], readings: ["きたい"], mnemonicFr: "ATTENTE - esperer quelque chose.", targetKanji: ["期", "待"] },
  { word: "期限", meanings: ["Date limite", "Echeance"], readings: ["きげん"], mnemonicFr: "DATE LIMITE - dernier jour pour faire quelque chose.", targetKanji: ["期", "限"] },
  { word: "締め切り", meanings: ["Date limite", "Deadline"], readings: ["しめきり"], mnemonicFr: "DEADLINE - la date butoir.", targetKanji: ["締", "切"] },
  { word: "遅刻", meanings: ["Retard"], readings: ["ちこく"], mnemonicFr: "RETARD - arriver apres l'heure.", targetKanji: ["遅", "刻"] },
  { word: "時刻", meanings: ["Heure", "Moment"], readings: ["じこく"], mnemonicFr: "HEURE - moment precis de la journee.", targetKanji: ["時", "刻"] },
  { word: "刻む", meanings: ["Graver", "Marquer le temps"], readings: ["きざむ"], mnemonicFr: "GRAVER - marquer dans la memoire.", targetKanji: ["刻"] },
];

const vocabPart8 = [
  // === HOURS ===
  { word: "一時", meanings: ["Une heure"], readings: ["いちじ"], mnemonicFr: "UNE HEURE - 1h00.", targetKanji: ["一", "時"] },
  { word: "二時", meanings: ["Deux heures"], readings: ["にじ"], mnemonicFr: "DEUX HEURES - 2h00.", targetKanji: ["二", "時"] },
  { word: "三時", meanings: ["Trois heures"], readings: ["さんじ"], mnemonicFr: "TROIS HEURES - 3h00.", targetKanji: ["三", "時"] },
  { word: "四時", meanings: ["Quatre heures"], readings: ["よじ"], mnemonicFr: "QUATRE HEURES - 4h00.", targetKanji: ["四", "時"] },
  { word: "五時", meanings: ["Cinq heures"], readings: ["ごじ"], mnemonicFr: "CINQ HEURES - 5h00.", targetKanji: ["五", "時"] },
  { word: "六時", meanings: ["Six heures"], readings: ["ろくじ"], mnemonicFr: "SIX HEURES - 6h00.", targetKanji: ["六", "時"] },
  { word: "七時", meanings: ["Sept heures"], readings: ["しちじ"], mnemonicFr: "SEPT HEURES - 7h00.", targetKanji: ["七", "時"] },
  { word: "八時", meanings: ["Huit heures"], readings: ["はちじ"], mnemonicFr: "HUIT HEURES - 8h00.", targetKanji: ["八", "時"] },
  { word: "九時", meanings: ["Neuf heures"], readings: ["くじ"], mnemonicFr: "NEUF HEURES - 9h00.", targetKanji: ["九", "時"] },
  { word: "十時", meanings: ["Dix heures"], readings: ["じゅうじ"], mnemonicFr: "DIX HEURES - 10h00.", targetKanji: ["十", "時"] },
  { word: "十一時", meanings: ["Onze heures"], readings: ["じゅういちじ"], mnemonicFr: "ONZE HEURES - 11h00.", targetKanji: ["十", "一", "時"] },
  { word: "十二時", meanings: ["Midi", "Douze heures"], readings: ["じゅうにじ"], mnemonicFr: "MIDI - 12h00.", targetKanji: ["十", "二", "時"] },
  { word: "何時", meanings: ["Quelle heure"], readings: ["なんじ"], mnemonicFr: "QUELLE HEURE - question sur l'heure.", targetKanji: ["何", "時"] },

  // === MINUTES ===
  { word: "分", meanings: ["Minute"], readings: ["ふん", "ぷん"], mnemonicFr: "MINUTE - soixante secondes.", targetKanji: ["分"] },
  { word: "一分", meanings: ["Une minute"], readings: ["いっぷん"], mnemonicFr: "UNE MINUTE - soixante secondes.", targetKanji: ["一", "分"] },
  { word: "五分", meanings: ["Cinq minutes"], readings: ["ごふん"], mnemonicFr: "CINQ MINUTES - un vingtieme d'heure.", targetKanji: ["五", "分"] },
  { word: "十分", meanings: ["Dix minutes", "Suffisant"], readings: ["じゅっぷん", "じゅうぶん"], mnemonicFr: "DIX MINUTES - un sixieme d'heure.", targetKanji: ["十", "分"] },
  { word: "十五分", meanings: ["Quinze minutes", "Quart d'heure"], readings: ["じゅうごふん"], mnemonicFr: "QUINZE MINUTES - un quart d'heure.", targetKanji: ["十", "五", "分"] },
  { word: "三十分", meanings: ["Trente minutes", "Demi-heure"], readings: ["さんじゅっぷん"], mnemonicFr: "TRENTE MINUTES - une demi-heure.", targetKanji: ["三", "十", "分"] },
  { word: "半", meanings: ["Demi", "Moitie"], readings: ["はん"], mnemonicFr: "DEMI - la moitie de quelque chose.", targetKanji: ["半"] },
  { word: "何分", meanings: ["Combien de minutes"], readings: ["なんぷん"], mnemonicFr: "COMBIEN DE MINUTES - question sur la duree.", targetKanji: ["何", "分"] },

  // === SECONDS ===
  { word: "秒", meanings: ["Seconde"], readings: ["びょう"], mnemonicFr: "SECONDE - unite de temps tres courte.", targetKanji: ["秒"] },
  { word: "一秒", meanings: ["Une seconde"], readings: ["いちびょう"], mnemonicFr: "UNE SECONDE - un bref instant.", targetKanji: ["一", "秒"] },

  // === SCHEDULE/TIMETABLE ===
  { word: "時間割", meanings: ["Emploi du temps"], readings: ["じかんわり"], mnemonicFr: "EMPLOI DU TEMPS - programme des cours.", targetKanji: ["時", "間", "割"] },
  { word: "時刻表", meanings: ["Horaire", "Planning"], readings: ["じこくひょう"], mnemonicFr: "HORAIRE - tableau des heures.", targetKanji: ["時", "刻", "表"] },
  { word: "予約", meanings: ["Reservation"], readings: ["よやく"], mnemonicFr: "RESERVATION - reserver a l'avance.", targetKanji: ["予", "約"] },
  { word: "約束", meanings: ["Promesse", "Rendez-vous"], readings: ["やくそく"], mnemonicFr: "PROMESSE - engagement pris.", targetKanji: ["約", "束"] },
];

const vocabPart9 = [
  // === HOLIDAY/VACATION ===
  { word: "休み", meanings: ["Repos", "Vacances", "Conge"], readings: ["やすみ"], mnemonicFr: "REPOS - periode sans travail.", targetKanji: ["休"] },
  { word: "休暇", meanings: ["Vacances", "Conge"], readings: ["きゅうか"], mnemonicFr: "VACANCES - periode de conge.", targetKanji: ["休", "暇"] },
  { word: "夏休み", meanings: ["Vacances d'ete"], readings: ["なつやすみ"], mnemonicFr: "VACANCES D'ETE - conges en ete.", targetKanji: ["夏", "休"] },
  { word: "冬休み", meanings: ["Vacances d'hiver"], readings: ["ふゆやすみ"], mnemonicFr: "VACANCES D'HIVER - conges en hiver.", targetKanji: ["冬", "休"] },
  { word: "春休み", meanings: ["Vacances de printemps"], readings: ["はるやすみ"], mnemonicFr: "VACANCES DE PRINTEMPS - conges au printemps.", targetKanji: ["春", "休"] },
  { word: "連休", meanings: ["Week-end prolonge"], readings: ["れんきゅう"], mnemonicFr: "WEEK-END PROLONGE - plusieurs jours de conge.", targetKanji: ["連", "休"] },
  { word: "有休", meanings: ["Conge paye"], readings: ["ゆうきゅう"], mnemonicFr: "CONGE PAYE - jour de repos remunere.", targetKanji: ["有", "休"] },

  // === WORK DAYS ===
  { word: "出勤", meanings: ["Aller au travail"], readings: ["しゅっきん"], mnemonicFr: "ALLER AU TRAVAIL - se rendre au bureau.", targetKanji: ["出", "勤"] },
  { word: "退勤", meanings: ["Quitter le travail"], readings: ["たいきん"], mnemonicFr: "QUITTER LE TRAVAIL - partir du bureau.", targetKanji: ["退", "勤"] },
  { word: "勤務", meanings: ["Service", "Travail"], readings: ["きんむ"], mnemonicFr: "SERVICE - heures de travail.", targetKanji: ["勤", "務"] },
  { word: "残業", meanings: ["Heures supplementaires"], readings: ["ざんぎょう"], mnemonicFr: "HEURES SUPPLEMENTAIRES - travail apres les heures.", targetKanji: ["残", "業"] },
  { word: "出張", meanings: ["Voyage d'affaires"], readings: ["しゅっちょう"], mnemonicFr: "VOYAGE D'AFFAIRES - deplacement professionnel.", targetKanji: ["出", "張"] },

  // === CONTINUATION ===
  { word: "続く", meanings: ["Continuer", "Durer"], readings: ["つづく"], mnemonicFr: "CONTINUER - se prolonger dans le temps.", targetKanji: ["続"] },
  { word: "続ける", meanings: ["Poursuivre", "Maintenir"], readings: ["つづける"], mnemonicFr: "POURSUIVRE - ne pas arreter.", targetKanji: ["続"] },
  { word: "継続", meanings: ["Continuation"], readings: ["けいぞく"], mnemonicFr: "CONTINUATION - action de continuer.", targetKanji: ["継", "続"] },
  { word: "持続", meanings: ["Duree", "Persistance"], readings: ["じぞく"], mnemonicFr: "PERSISTANCE - qui dure longtemps.", targetKanji: ["持", "続"] },

  // === CHANGE/SWITCH ===
  { word: "変わる", meanings: ["Changer"], readings: ["かわる"], mnemonicFr: "CHANGER - devenir different.", targetKanji: ["変"] },
  { word: "変更", meanings: ["Modification"], readings: ["へんこう"], mnemonicFr: "MODIFICATION - changement effectue.", targetKanji: ["変", "更"] },
  { word: "更新", meanings: ["Mise a jour", "Renouvellement"], readings: ["こうしん"], mnemonicFr: "MISE A JOUR - actualiser.", targetKanji: ["更", "新"] },
  { word: "延期", meanings: ["Report", "Ajournement"], readings: ["えんき"], mnemonicFr: "REPORT - remettre a plus tard.", targetKanji: ["延", "期"] },
  { word: "延長", meanings: ["Prolongation"], readings: ["えんちょう"], mnemonicFr: "PROLONGATION - etendre la duree.", targetKanji: ["延", "長"] },

  // === MEMORY/HISTORY ===
  { word: "記録", meanings: ["Record", "Enregistrement"], readings: ["きろく"], mnemonicFr: "RECORD - noter pour garder en memoire.", targetKanji: ["記", "録"] },
  { word: "歴史", meanings: ["Histoire"], readings: ["れきし"], mnemonicFr: "HISTOIRE - le passe de l'humanite.", targetKanji: ["歴", "史"] },
  { word: "史上", meanings: ["Dans l'histoire"], readings: ["しじょう"], mnemonicFr: "DANS L'HISTOIRE - de tous les temps.", targetKanji: ["史", "上"] },
  { word: "伝説", meanings: ["Legende"], readings: ["でんせつ"], mnemonicFr: "LEGENDE - histoire transmise.", targetKanji: ["伝", "説"] },
];

async function main() {
  console.log("=== SEEDING VOCABULARY BATCH 15: Calendar, Dates, Time Periods ===\n");

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
