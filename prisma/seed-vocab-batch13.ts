import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary with number compounds - Part 1 (一, 二, 三)
const vocabPart1 = [
  // 一 (Un) - Counting people
  { word: "一人", meanings: ["Une personne", "Seul"], readings: ["ひとり"], mnemonicFr: "UNE PERSONNE - seul, une seule personne.", targetKanji: ["一", "人"] },
  { word: "一人暮らし", meanings: ["Vivre seul"], readings: ["ひとりぐらし"], mnemonicFr: "VIVRE SEUL - habiter seul sans famille.", targetKanji: ["一", "人", "暮"] },
  { word: "一人前", meanings: ["Une portion", "Adulte accompli"], readings: ["いちにんまえ"], mnemonicFr: "UNE PORTION - quantite pour une personne, ou etre devenu adulte.", targetKanji: ["一", "人", "前"] },

  // 一 (Un) - Counting things (つ)
  { word: "一つ", meanings: ["Un (chose)"], readings: ["ひとつ"], mnemonicFr: "UN - compteur general pour une chose.", targetKanji: ["一"] },

  // 一 (Un) - Days and dates
  { word: "一日", meanings: ["Premier jour", "Un jour"], readings: ["ついたち", "いちにち"], mnemonicFr: "PREMIER JOUR - le premier du mois ou une journee entiere.", targetKanji: ["一", "日"] },
  { word: "一日中", meanings: ["Toute la journee"], readings: ["いちにちじゅう"], mnemonicFr: "TOUTE LA JOURNEE - du matin au soir.", targetKanji: ["一", "日", "中"] },

  // 一 (Un) - Months
  { word: "一月", meanings: ["Janvier"], readings: ["いちがつ"], mnemonicFr: "JANVIER - le premier mois de l'annee.", targetKanji: ["一", "月"] },
  { word: "一ヶ月", meanings: ["Un mois"], readings: ["いっかげつ"], mnemonicFr: "UN MOIS - duree d'un mois.", targetKanji: ["一", "月"] },

  // 一 (Un) - Years
  { word: "一年", meanings: ["Un an", "Premiere annee"], readings: ["いちねん"], mnemonicFr: "UN AN - duree d'une annee ou premiere annee.", targetKanji: ["一", "年"] },
  { word: "一年生", meanings: ["Eleve de premiere annee"], readings: ["いちねんせい"], mnemonicFr: "PREMIERE ANNEE - etudiant de premiere annee.", targetKanji: ["一", "年", "生"] },
  { word: "一年中", meanings: ["Toute l'annee"], readings: ["いちねんじゅう"], mnemonicFr: "TOUTE L'ANNEE - pendant douze mois.", targetKanji: ["一", "年", "中"] },

  // 一 (Un) - Times/occasions
  { word: "一度", meanings: ["Une fois"], readings: ["いちど"], mnemonicFr: "UNE FOIS - a une seule occasion.", targetKanji: ["一", "度"] },
  { word: "一回", meanings: ["Une fois"], readings: ["いっかい"], mnemonicFr: "UNE FOIS - une seule repetition.", targetKanji: ["一", "回"] },
  { word: "一度に", meanings: ["En une seule fois"], readings: ["いちどに"], mnemonicFr: "D'UN COUP - tout en meme temps.", targetKanji: ["一", "度"] },

  // 一 (Un) - Position/rank
  { word: "一番", meanings: ["Numero un", "Le meilleur"], readings: ["いちばん"], mnemonicFr: "NUMERO UN - le premier, le meilleur.", targetKanji: ["一", "番"] },
  { word: "一位", meanings: ["Premiere place"], readings: ["いちい"], mnemonicFr: "PREMIERE PLACE - classement numero un.", targetKanji: ["一", "位"] },
  { word: "一等", meanings: ["Premiere classe"], readings: ["いっとう"], mnemonicFr: "PREMIERE CLASSE - le rang le plus eleve.", targetKanji: ["一", "等"] },
  { word: "第一", meanings: ["Premier", "Numero un"], readings: ["だいいち"], mnemonicFr: "PREMIER - en premiere position.", targetKanji: ["第", "一"] },

  // 一 (Un) - General compounds
  { word: "一方", meanings: ["D'un cote", "Tandis que"], readings: ["いっぽう"], mnemonicFr: "D'UN COTE - une direction, ou pendant ce temps.", targetKanji: ["一", "方"] },
  { word: "一部", meanings: ["Une partie"], readings: ["いちぶ"], mnemonicFr: "UNE PARTIE - une portion de l'ensemble.", targetKanji: ["一", "部"] },
  { word: "一般", meanings: ["General", "Ordinaire"], readings: ["いっぱん"], mnemonicFr: "GENERAL - ce qui est commun a tous.", targetKanji: ["一", "般"] },
  { word: "一般的", meanings: ["En general"], readings: ["いっぱんてき"], mnemonicFr: "EN GENERAL - de maniere generale.", targetKanji: ["一", "般", "的"] },
  { word: "一流", meanings: ["Premiere classe", "De premier ordre"], readings: ["いちりゅう"], mnemonicFr: "PREMIERE CLASSE - de qualite superieure.", targetKanji: ["一", "流"] },
  { word: "一生", meanings: ["Toute la vie"], readings: ["いっしょう"], mnemonicFr: "TOUTE LA VIE - du debut a la fin de l'existence.", targetKanji: ["一", "生"] },
  { word: "一緒", meanings: ["Ensemble"], readings: ["いっしょ"], mnemonicFr: "ENSEMBLE - unis, en meme temps.", targetKanji: ["一", "緒"] },
  { word: "一緒に", meanings: ["Ensemble", "Avec"], readings: ["いっしょに"], mnemonicFr: "ENSEMBLE - faire quelque chose avec quelqu'un.", targetKanji: ["一", "緒"] },
  { word: "一定", meanings: ["Fixe", "Constant"], readings: ["いってい"], mnemonicFr: "CONSTANT - qui ne change pas.", targetKanji: ["一", "定"] },
  { word: "一時", meanings: ["Un moment", "Temporaire"], readings: ["いちじ", "いっとき"], mnemonicFr: "TEMPORAIRE - pour un temps limite.", targetKanji: ["一", "時"] },
  { word: "一時的", meanings: ["Temporaire"], readings: ["いちじてき"], mnemonicFr: "TEMPORAIRE - qui ne dure pas.", targetKanji: ["一", "時", "的"] },
  { word: "一応", meanings: ["Pour l'instant", "En principe"], readings: ["いちおう"], mnemonicFr: "POUR L'INSTANT - provisoirement, en theorie.", targetKanji: ["一", "応"] },
  { word: "一段と", meanings: ["Encore plus"], readings: ["いちだんと"], mnemonicFr: "ENCORE PLUS - d'un degre superieur.", targetKanji: ["一", "段"] },
  { word: "一層", meanings: ["Davantage", "Encore plus"], readings: ["いっそう"], mnemonicFr: "DAVANTAGE - a un plus haut degre.", targetKanji: ["一", "層"] },
  { word: "一切", meanings: ["Tout", "Absolument pas"], readings: ["いっさい"], mnemonicFr: "TOUT - la totalite, ou rien du tout.", targetKanji: ["一", "切"] },
  { word: "一体", meanings: ["Que diable", "Au fond"], readings: ["いったい"], mnemonicFr: "QUE DIABLE - expression d'etonnement.", targetKanji: ["一", "体"] },
  { word: "一瞬", meanings: ["Un instant"], readings: ["いっしゅん"], mnemonicFr: "UN INSTANT - un moment tres bref.", targetKanji: ["一", "瞬"] },
  { word: "一言", meanings: ["Un mot"], readings: ["ひとこと"], mnemonicFr: "UN MOT - une seule parole.", targetKanji: ["一", "言"] },
  { word: "一歩", meanings: ["Un pas"], readings: ["いっぽ"], mnemonicFr: "UN PAS - un seul pas en avant.", targetKanji: ["一", "歩"] },
  { word: "一本", meanings: ["Une (chose longue)"], readings: ["いっぽん"], mnemonicFr: "UN - compteur pour objets longs.", targetKanji: ["一", "本"] },
  { word: "一枚", meanings: ["Une (feuille)"], readings: ["いちまい"], mnemonicFr: "UNE - compteur pour objets plats.", targetKanji: ["一", "枚"] },
  { word: "一杯", meanings: ["Un verre", "Plein"], readings: ["いっぱい"], mnemonicFr: "UN VERRE - un recipient plein.", targetKanji: ["一", "杯"] },
  { word: "一種", meanings: ["Une sorte"], readings: ["いっしゅ"], mnemonicFr: "UNE SORTE - un type de quelque chose.", targetKanji: ["一", "種"] },
  { word: "一次", meanings: ["Premier", "Primaire"], readings: ["いちじ"], mnemonicFr: "PREMIER - de premier ordre.", targetKanji: ["一", "次"] },
  { word: "一致", meanings: ["Accord", "Correspondance"], readings: ["いっち"], mnemonicFr: "ACCORD - etre en harmonie.", targetKanji: ["一", "致"] },
  { word: "統一", meanings: ["Unification"], readings: ["とういつ"], mnemonicFr: "UNIFICATION - rassembler en un.", targetKanji: ["統", "一"] },
  { word: "均一", meanings: ["Uniforme"], readings: ["きんいつ"], mnemonicFr: "UNIFORME - egal partout.", targetKanji: ["均", "一"] },
  { word: "唯一", meanings: ["Unique", "Seul"], readings: ["ゆいいつ"], mnemonicFr: "UNIQUE - le seul et l'unique.", targetKanji: ["唯", "一"] },

  // 二 (Deux) - Counting people
  { word: "二人", meanings: ["Deux personnes"], readings: ["ふたり"], mnemonicFr: "DEUX PERSONNES - un couple ou duo.", targetKanji: ["二", "人"] },
  { word: "二人組", meanings: ["Duo", "Paire"], readings: ["ふたりぐみ"], mnemonicFr: "DUO - groupe de deux personnes.", targetKanji: ["二", "人", "組"] },

  // 二 (Deux) - Counting things
  { word: "二つ", meanings: ["Deux (choses)"], readings: ["ふたつ"], mnemonicFr: "DEUX - compteur general pour deux choses.", targetKanji: ["二"] },

  // 二 (Deux) - Days and dates
  { word: "二日", meanings: ["Le deux", "Deux jours"], readings: ["ふつか"], mnemonicFr: "LE DEUX - deuxieme jour du mois.", targetKanji: ["二", "日"] },

  // 二 (Deux) - Months
  { word: "二月", meanings: ["Fevrier"], readings: ["にがつ"], mnemonicFr: "FEVRIER - le deuxieme mois.", targetKanji: ["二", "月"] },
  { word: "二ヶ月", meanings: ["Deux mois"], readings: ["にかげつ"], mnemonicFr: "DEUX MOIS - duree de deux mois.", targetKanji: ["二", "月"] },

  // 二 (Deux) - Years
  { word: "二年", meanings: ["Deux ans", "Deuxieme annee"], readings: ["にねん"], mnemonicFr: "DEUX ANS - duree de deux annees.", targetKanji: ["二", "年"] },
  { word: "二年生", meanings: ["Eleve de deuxieme annee"], readings: ["にねんせい"], mnemonicFr: "DEUXIEME ANNEE - etudiant de deuxieme annee.", targetKanji: ["二", "年", "生"] },

  // 二 (Deux) - Times
  { word: "二度", meanings: ["Deux fois"], readings: ["にど"], mnemonicFr: "DEUX FOIS - a deux occasions.", targetKanji: ["二", "度"] },
  { word: "二回", meanings: ["Deux fois"], readings: ["にかい"], mnemonicFr: "DEUX FOIS - deux repetitions.", targetKanji: ["二", "回"] },
  { word: "二度と", meanings: ["Plus jamais"], readings: ["にどと"], mnemonicFr: "PLUS JAMAIS - jamais une seconde fois.", targetKanji: ["二", "度"] },

  // 二 (Deux) - Position/rank
  { word: "二番", meanings: ["Deuxieme"], readings: ["にばん"], mnemonicFr: "DEUXIEME - en deuxieme position.", targetKanji: ["二", "番"] },
  { word: "二位", meanings: ["Deuxieme place"], readings: ["にい"], mnemonicFr: "DEUXIEME PLACE - classement numero deux.", targetKanji: ["二", "位"] },
  { word: "二等", meanings: ["Deuxieme classe"], readings: ["にとう"], mnemonicFr: "DEUXIEME CLASSE - rang suivant.", targetKanji: ["二", "等"] },
  { word: "第二", meanings: ["Deuxieme"], readings: ["だいに"], mnemonicFr: "DEUXIEME - en deuxieme position.", targetKanji: ["第", "二"] },

  // 二 (Deux) - General compounds
  { word: "二次", meanings: ["Secondaire"], readings: ["にじ"], mnemonicFr: "SECONDAIRE - de deuxieme ordre.", targetKanji: ["二", "次"] },
  { word: "二重", meanings: ["Double"], readings: ["にじゅう"], mnemonicFr: "DOUBLE - en deux couches.", targetKanji: ["二", "重"] },
  { word: "二倍", meanings: ["Double"], readings: ["にばい"], mnemonicFr: "DOUBLE - deux fois plus.", targetKanji: ["二", "倍"] },

  // 三 (Trois) - Counting people
  { word: "三人", meanings: ["Trois personnes"], readings: ["さんにん"], mnemonicFr: "TROIS PERSONNES - un trio.", targetKanji: ["三", "人"] },

  // 三 (Trois) - Counting things
  { word: "三つ", meanings: ["Trois (choses)"], readings: ["みっつ"], mnemonicFr: "TROIS - compteur general pour trois choses.", targetKanji: ["三"] },

  // 三 (Trois) - Days
  { word: "三日", meanings: ["Le trois", "Trois jours"], readings: ["みっか"], mnemonicFr: "LE TROIS - troisieme jour du mois.", targetKanji: ["三", "日"] },
  { word: "三日月", meanings: ["Croissant de lune"], readings: ["みかづき"], mnemonicFr: "CROISSANT - lune du troisieme jour.", targetKanji: ["三", "日", "月"] },

  // 三 (Trois) - Months
  { word: "三月", meanings: ["Mars"], readings: ["さんがつ"], mnemonicFr: "MARS - le troisieme mois.", targetKanji: ["三", "月"] },

  // 三 (Trois) - Years
  { word: "三年", meanings: ["Trois ans"], readings: ["さんねん"], mnemonicFr: "TROIS ANS - duree de trois annees.", targetKanji: ["三", "年"] },
  { word: "三年生", meanings: ["Eleve de troisieme annee"], readings: ["さんねんせい"], mnemonicFr: "TROISIEME ANNEE - etudiant de troisieme annee.", targetKanji: ["三", "年", "生"] },

  // 三 (Trois) - Times
  { word: "三回", meanings: ["Trois fois"], readings: ["さんかい"], mnemonicFr: "TROIS FOIS - trois repetitions.", targetKanji: ["三", "回"] },
  { word: "三度", meanings: ["Trois fois"], readings: ["さんど"], mnemonicFr: "TROIS FOIS - a trois occasions.", targetKanji: ["三", "度"] },

  // 三 (Trois) - Position
  { word: "三番", meanings: ["Troisieme"], readings: ["さんばん"], mnemonicFr: "TROISIEME - en troisieme position.", targetKanji: ["三", "番"] },
  { word: "三位", meanings: ["Troisieme place"], readings: ["さんい"], mnemonicFr: "TROISIEME PLACE - classement numero trois.", targetKanji: ["三", "位"] },
  { word: "第三", meanings: ["Troisieme"], readings: ["だいさん"], mnemonicFr: "TROISIEME - en troisieme position.", targetKanji: ["第", "三"] },

  // 三 (Trois) - General
  { word: "三角", meanings: ["Triangle"], readings: ["さんかく"], mnemonicFr: "TRIANGLE - forme a trois angles.", targetKanji: ["三", "角"] },
  { word: "三角形", meanings: ["Triangle"], readings: ["さんかくけい"], mnemonicFr: "TRIANGLE - forme geometrique a trois cotes.", targetKanji: ["三", "角", "形"] },
  { word: "三倍", meanings: ["Triple"], readings: ["さんばい"], mnemonicFr: "TRIPLE - trois fois plus.", targetKanji: ["三", "倍"] },
];

// Vocabulary with number compounds - Part 2 (四, 五, 六)
const vocabPart2 = [
  // 四 (Quatre) - Counting people
  { word: "四人", meanings: ["Quatre personnes"], readings: ["よにん"], mnemonicFr: "QUATRE PERSONNES - un groupe de quatre.", targetKanji: ["四", "人"] },

  // 四 (Quatre) - Counting things
  { word: "四つ", meanings: ["Quatre (choses)"], readings: ["よっつ"], mnemonicFr: "QUATRE - compteur general pour quatre choses.", targetKanji: ["四"] },

  // 四 (Quatre) - Days
  { word: "四日", meanings: ["Le quatre", "Quatre jours"], readings: ["よっか"], mnemonicFr: "LE QUATRE - quatrieme jour du mois.", targetKanji: ["四", "日"] },

  // 四 (Quatre) - Months
  { word: "四月", meanings: ["Avril"], readings: ["しがつ"], mnemonicFr: "AVRIL - le quatrieme mois.", targetKanji: ["四", "月"] },

  // 四 (Quatre) - Years
  { word: "四年", meanings: ["Quatre ans"], readings: ["よねん"], mnemonicFr: "QUATRE ANS - duree de quatre annees.", targetKanji: ["四", "年"] },

  // 四 (Quatre) - General
  { word: "四角", meanings: ["Carre", "Rectangle"], readings: ["しかく"], mnemonicFr: "CARRE - forme a quatre angles.", targetKanji: ["四", "角"] },
  { word: "四角形", meanings: ["Quadrilatere"], readings: ["しかくけい"], mnemonicFr: "QUADRILATERE - forme a quatre cotes.", targetKanji: ["四", "角", "形"] },
  { word: "四季", meanings: ["Quatre saisons"], readings: ["しき"], mnemonicFr: "QUATRE SAISONS - printemps, ete, automne, hiver.", targetKanji: ["四", "季"] },
  { word: "四方", meanings: ["Quatre directions"], readings: ["しほう"], mnemonicFr: "QUATRE DIRECTIONS - nord, sud, est, ouest.", targetKanji: ["四", "方"] },
  { word: "四倍", meanings: ["Quadruple"], readings: ["よんばい"], mnemonicFr: "QUADRUPLE - quatre fois plus.", targetKanji: ["四", "倍"] },
  { word: "第四", meanings: ["Quatrieme"], readings: ["だいよん"], mnemonicFr: "QUATRIEME - en quatrieme position.", targetKanji: ["第", "四"] },

  // 五 (Cinq) - Counting people
  { word: "五人", meanings: ["Cinq personnes"], readings: ["ごにん"], mnemonicFr: "CINQ PERSONNES - un groupe de cinq.", targetKanji: ["五", "人"] },

  // 五 (Cinq) - Counting things
  { word: "五つ", meanings: ["Cinq (choses)"], readings: ["いつつ"], mnemonicFr: "CINQ - compteur general pour cinq choses.", targetKanji: ["五"] },

  // 五 (Cinq) - Days
  { word: "五日", meanings: ["Le cinq", "Cinq jours"], readings: ["いつか"], mnemonicFr: "LE CINQ - cinquieme jour du mois.", targetKanji: ["五", "日"] },

  // 五 (Cinq) - Months
  { word: "五月", meanings: ["Mai"], readings: ["ごがつ"], mnemonicFr: "MAI - le cinquieme mois.", targetKanji: ["五", "月"] },

  // 五 (Cinq) - Years
  { word: "五年", meanings: ["Cinq ans"], readings: ["ごねん"], mnemonicFr: "CINQ ANS - duree de cinq annees.", targetKanji: ["五", "年"] },

  // 五 (Cinq) - General
  { word: "五十", meanings: ["Cinquante"], readings: ["ごじゅう"], mnemonicFr: "CINQUANTE - cinq fois dix.", targetKanji: ["五", "十"] },
  { word: "五十音", meanings: ["Syllabaire japonais"], readings: ["ごじゅうおん"], mnemonicFr: "SYLLABAIRE - les cinquante sons du japonais.", targetKanji: ["五", "十", "音"] },
  { word: "五感", meanings: ["Cinq sens"], readings: ["ごかん"], mnemonicFr: "CINQ SENS - vue, ouie, odorat, gout, toucher.", targetKanji: ["五", "感"] },
  { word: "五輪", meanings: ["Jeux olympiques"], readings: ["ごりん"], mnemonicFr: "JEUX OLYMPIQUES - les cinq anneaux.", targetKanji: ["五", "輪"] },
  { word: "第五", meanings: ["Cinquieme"], readings: ["だいご"], mnemonicFr: "CINQUIEME - en cinquieme position.", targetKanji: ["第", "五"] },

  // 六 (Six) - Counting people
  { word: "六人", meanings: ["Six personnes"], readings: ["ろくにん"], mnemonicFr: "SIX PERSONNES - un groupe de six.", targetKanji: ["六", "人"] },

  // 六 (Six) - Counting things
  { word: "六つ", meanings: ["Six (choses)"], readings: ["むっつ"], mnemonicFr: "SIX - compteur general pour six choses.", targetKanji: ["六"] },

  // 六 (Six) - Days
  { word: "六日", meanings: ["Le six", "Six jours"], readings: ["むいか"], mnemonicFr: "LE SIX - sixieme jour du mois.", targetKanji: ["六", "日"] },

  // 六 (Six) - Months
  { word: "六月", meanings: ["Juin"], readings: ["ろくがつ"], mnemonicFr: "JUIN - le sixieme mois.", targetKanji: ["六", "月"] },

  // 六 (Six) - Years
  { word: "六年", meanings: ["Six ans"], readings: ["ろくねん"], mnemonicFr: "SIX ANS - duree de six annees.", targetKanji: ["六", "年"] },

  // 六 (Six) - General
  { word: "六十", meanings: ["Soixante"], readings: ["ろくじゅう"], mnemonicFr: "SOIXANTE - six fois dix.", targetKanji: ["六", "十"] },
  { word: "第六", meanings: ["Sixieme"], readings: ["だいろく"], mnemonicFr: "SIXIEME - en sixieme position.", targetKanji: ["第", "六"] },
];

// Vocabulary with number compounds - Part 3 (七, 八, 九)
const vocabPart3 = [
  // 七 (Sept) - Counting people
  { word: "七人", meanings: ["Sept personnes"], readings: ["しちにん", "ななにん"], mnemonicFr: "SEPT PERSONNES - un groupe de sept.", targetKanji: ["七", "人"] },

  // 七 (Sept) - Counting things
  { word: "七つ", meanings: ["Sept (choses)"], readings: ["ななつ"], mnemonicFr: "SEPT - compteur general pour sept choses.", targetKanji: ["七"] },

  // 七 (Sept) - Days
  { word: "七日", meanings: ["Le sept", "Sept jours"], readings: ["なのか"], mnemonicFr: "LE SEPT - septieme jour du mois.", targetKanji: ["七", "日"] },

  // 七 (Sept) - Months
  { word: "七月", meanings: ["Juillet"], readings: ["しちがつ"], mnemonicFr: "JUILLET - le septieme mois.", targetKanji: ["七", "月"] },

  // 七 (Sept) - Years
  { word: "七年", meanings: ["Sept ans"], readings: ["しちねん", "ななねん"], mnemonicFr: "SEPT ANS - duree de sept annees.", targetKanji: ["七", "年"] },

  // 七 (Sept) - General
  { word: "七十", meanings: ["Soixante-dix"], readings: ["ななじゅう"], mnemonicFr: "SOIXANTE-DIX - sept fois dix.", targetKanji: ["七", "十"] },
  { word: "七夕", meanings: ["Tanabata", "Fete des etoiles"], readings: ["たなばた"], mnemonicFr: "TANABATA - fete japonaise du 7 juillet.", targetKanji: ["七", "夕"] },
  { word: "第七", meanings: ["Septieme"], readings: ["だいなな", "だいしち"], mnemonicFr: "SEPTIEME - en septieme position.", targetKanji: ["第", "七"] },

  // 八 (Huit) - Counting people
  { word: "八人", meanings: ["Huit personnes"], readings: ["はちにん"], mnemonicFr: "HUIT PERSONNES - un groupe de huit.", targetKanji: ["八", "人"] },

  // 八 (Huit) - Counting things
  { word: "八つ", meanings: ["Huit (choses)"], readings: ["やっつ"], mnemonicFr: "HUIT - compteur general pour huit choses.", targetKanji: ["八"] },

  // 八 (Huit) - Days
  { word: "八日", meanings: ["Le huit", "Huit jours"], readings: ["ようか"], mnemonicFr: "LE HUIT - huitieme jour du mois.", targetKanji: ["八", "日"] },

  // 八 (Huit) - Months
  { word: "八月", meanings: ["Aout"], readings: ["はちがつ"], mnemonicFr: "AOUT - le huitieme mois.", targetKanji: ["八", "月"] },

  // 八 (Huit) - Years
  { word: "八年", meanings: ["Huit ans"], readings: ["はちねん"], mnemonicFr: "HUIT ANS - duree de huit annees.", targetKanji: ["八", "年"] },

  // 八 (Huit) - General
  { word: "八十", meanings: ["Quatre-vingts"], readings: ["はちじゅう"], mnemonicFr: "QUATRE-VINGTS - huit fois dix.", targetKanji: ["八", "十"] },
  { word: "八百屋", meanings: ["Marchand de legumes"], readings: ["やおや"], mnemonicFr: "MARCHAND DE LEGUMES - magasin de fruits et legumes.", targetKanji: ["八", "百", "屋"] },
  { word: "第八", meanings: ["Huitieme"], readings: ["だいはち"], mnemonicFr: "HUITIEME - en huitieme position.", targetKanji: ["第", "八"] },

  // 九 (Neuf) - Counting people
  { word: "九人", meanings: ["Neuf personnes"], readings: ["きゅうにん", "くにん"], mnemonicFr: "NEUF PERSONNES - un groupe de neuf.", targetKanji: ["九", "人"] },

  // 九 (Neuf) - Counting things
  { word: "九つ", meanings: ["Neuf (choses)"], readings: ["ここのつ"], mnemonicFr: "NEUF - compteur general pour neuf choses.", targetKanji: ["九"] },

  // 九 (Neuf) - Days
  { word: "九日", meanings: ["Le neuf", "Neuf jours"], readings: ["ここのか"], mnemonicFr: "LE NEUF - neuvieme jour du mois.", targetKanji: ["九", "日"] },

  // 九 (Neuf) - Months
  { word: "九月", meanings: ["Septembre"], readings: ["くがつ"], mnemonicFr: "SEPTEMBRE - le neuvieme mois.", targetKanji: ["九", "月"] },

  // 九 (Neuf) - Years
  { word: "九年", meanings: ["Neuf ans"], readings: ["きゅうねん", "くねん"], mnemonicFr: "NEUF ANS - duree de neuf annees.", targetKanji: ["九", "年"] },

  // 九 (Neuf) - General
  { word: "九十", meanings: ["Quatre-vingt-dix"], readings: ["きゅうじゅう"], mnemonicFr: "QUATRE-VINGT-DIX - neuf fois dix.", targetKanji: ["九", "十"] },
  { word: "九州", meanings: ["Kyushu"], readings: ["きゅうしゅう"], mnemonicFr: "KYUSHU - l'ile des neuf provinces.", targetKanji: ["九", "州"] },
  { word: "第九", meanings: ["Neuvieme"], readings: ["だいきゅう", "だいく"], mnemonicFr: "NEUVIEME - en neuvieme position.", targetKanji: ["第", "九"] },
];

// Vocabulary with number compounds - Part 4 (十, 百, 千)
const vocabPart4 = [
  // 十 (Dix) - Counting people
  { word: "十人", meanings: ["Dix personnes"], readings: ["じゅうにん"], mnemonicFr: "DIX PERSONNES - un groupe de dix.", targetKanji: ["十", "人"] },

  // 十 (Dix) - Counting things
  { word: "十", meanings: ["Dix"], readings: ["じゅう", "とお"], mnemonicFr: "DIX - le nombre dix.", targetKanji: ["十"] },

  // 十 (Dix) - Days
  { word: "十日", meanings: ["Le dix", "Dix jours"], readings: ["とおか"], mnemonicFr: "LE DIX - dixieme jour du mois.", targetKanji: ["十", "日"] },
  { word: "二十日", meanings: ["Le vingt", "Vingt jours"], readings: ["はつか"], mnemonicFr: "LE VINGT - vingtieme jour du mois.", targetKanji: ["二", "十", "日"] },
  { word: "三十日", meanings: ["Le trente", "Trente jours"], readings: ["さんじゅうにち"], mnemonicFr: "LE TRENTE - trentieme jour du mois.", targetKanji: ["三", "十", "日"] },

  // 十 (Dix) - Months
  { word: "十月", meanings: ["Octobre"], readings: ["じゅうがつ"], mnemonicFr: "OCTOBRE - le dixieme mois.", targetKanji: ["十", "月"] },
  { word: "十一月", meanings: ["Novembre"], readings: ["じゅういちがつ"], mnemonicFr: "NOVEMBRE - le onzieme mois.", targetKanji: ["十", "一", "月"] },
  { word: "十二月", meanings: ["Decembre"], readings: ["じゅうにがつ"], mnemonicFr: "DECEMBRE - le douzieme mois.", targetKanji: ["十", "二", "月"] },

  // 十 (Dix) - Years
  { word: "十年", meanings: ["Dix ans"], readings: ["じゅうねん"], mnemonicFr: "DIX ANS - une decennie.", targetKanji: ["十", "年"] },

  // 十 (Dix) - General
  { word: "十分", meanings: ["Suffisant", "Dix minutes"], readings: ["じゅうぶん", "じっぷん"], mnemonicFr: "SUFFISANT - assez, ou dix minutes.", targetKanji: ["十", "分"] },
  { word: "十字", meanings: ["Croix"], readings: ["じゅうじ"], mnemonicFr: "CROIX - forme en plus.", targetKanji: ["十", "字"] },
  { word: "十字路", meanings: ["Carrefour"], readings: ["じゅうじろ"], mnemonicFr: "CARREFOUR - intersection en croix.", targetKanji: ["十", "字", "路"] },
  { word: "十代", meanings: ["Adolescence"], readings: ["じゅうだい"], mnemonicFr: "ADOLESCENCE - ages de 10 a 19 ans.", targetKanji: ["十", "代"] },
  { word: "第十", meanings: ["Dixieme"], readings: ["だいじゅう"], mnemonicFr: "DIXIEME - en dixieme position.", targetKanji: ["第", "十"] },
  { word: "二十", meanings: ["Vingt"], readings: ["にじゅう"], mnemonicFr: "VINGT - deux fois dix.", targetKanji: ["二", "十"] },
  { word: "三十", meanings: ["Trente"], readings: ["さんじゅう"], mnemonicFr: "TRENTE - trois fois dix.", targetKanji: ["三", "十"] },
  { word: "四十", meanings: ["Quarante"], readings: ["よんじゅう"], mnemonicFr: "QUARANTE - quatre fois dix.", targetKanji: ["四", "十"] },
  { word: "二十歳", meanings: ["Vingt ans"], readings: ["はたち"], mnemonicFr: "VINGT ANS - age de la majorite au Japon.", targetKanji: ["二", "十", "歳"] },

  // 百 (Cent) - Money
  { word: "百円", meanings: ["Cent yens"], readings: ["ひゃくえん"], mnemonicFr: "CENT YENS - piece de cent yens.", targetKanji: ["百", "円"] },
  { word: "二百円", meanings: ["Deux cents yens"], readings: ["にひゃくえん"], mnemonicFr: "DEUX CENTS YENS - prix de deux cent yens.", targetKanji: ["二", "百", "円"] },
  { word: "三百円", meanings: ["Trois cents yens"], readings: ["さんびゃくえん"], mnemonicFr: "TROIS CENTS YENS - prix de trois cent yens.", targetKanji: ["三", "百", "円"] },
  { word: "五百円", meanings: ["Cinq cents yens"], readings: ["ごひゃくえん"], mnemonicFr: "CINQ CENTS YENS - piece de cinq cent yens.", targetKanji: ["五", "百", "円"] },

  // 百 (Cent) - Counting people
  { word: "百人", meanings: ["Cent personnes"], readings: ["ひゃくにん"], mnemonicFr: "CENT PERSONNES - un groupe de cent.", targetKanji: ["百", "人"] },

  // 百 (Cent) - General
  { word: "百", meanings: ["Cent"], readings: ["ひゃく"], mnemonicFr: "CENT - le nombre cent.", targetKanji: ["百"] },
  { word: "二百", meanings: ["Deux cents"], readings: ["にひゃく"], mnemonicFr: "DEUX CENTS - deux fois cent.", targetKanji: ["二", "百"] },
  { word: "三百", meanings: ["Trois cents"], readings: ["さんびゃく"], mnemonicFr: "TROIS CENTS - trois fois cent.", targetKanji: ["三", "百"] },
  { word: "四百", meanings: ["Quatre cents"], readings: ["よんひゃく"], mnemonicFr: "QUATRE CENTS - quatre fois cent.", targetKanji: ["四", "百"] },
  { word: "五百", meanings: ["Cinq cents"], readings: ["ごひゃく"], mnemonicFr: "CINQ CENTS - cinq fois cent.", targetKanji: ["五", "百"] },
  { word: "六百", meanings: ["Six cents"], readings: ["ろっぴゃく"], mnemonicFr: "SIX CENTS - six fois cent.", targetKanji: ["六", "百"] },
  { word: "七百", meanings: ["Sept cents"], readings: ["ななひゃく"], mnemonicFr: "SEPT CENTS - sept fois cent.", targetKanji: ["七", "百"] },
  { word: "八百", meanings: ["Huit cents"], readings: ["はっぴゃく"], mnemonicFr: "HUIT CENTS - huit fois cent.", targetKanji: ["八", "百"] },
  { word: "九百", meanings: ["Neuf cents"], readings: ["きゅうひゃく"], mnemonicFr: "NEUF CENTS - neuf fois cent.", targetKanji: ["九", "百"] },
  { word: "百年", meanings: ["Cent ans"], readings: ["ひゃくねん"], mnemonicFr: "CENT ANS - un siecle.", targetKanji: ["百", "年"] },
  { word: "百点", meanings: ["Cent points"], readings: ["ひゃくてん"], mnemonicFr: "CENT POINTS - score parfait.", targetKanji: ["百", "点"] },
  { word: "百科", meanings: ["Encyclopedie"], readings: ["ひゃっか"], mnemonicFr: "ENCYCLOPEDIE - cent domaines de savoir.", targetKanji: ["百", "科"] },
  { word: "百科事典", meanings: ["Encyclopedie"], readings: ["ひゃっかじてん"], mnemonicFr: "ENCYCLOPEDIE - dictionnaire de tous les savoirs.", targetKanji: ["百", "科", "事", "典"] },
  { word: "百貨店", meanings: ["Grand magasin"], readings: ["ひゃっかてん"], mnemonicFr: "GRAND MAGASIN - magasin aux cent produits.", targetKanji: ["百", "貨", "店"] },
  { word: "百分率", meanings: ["Pourcentage"], readings: ["ひゃくぶんりつ"], mnemonicFr: "POURCENTAGE - taux sur cent.", targetKanji: ["百", "分", "率"] },

  // 千 (Mille) - Money
  { word: "千円", meanings: ["Mille yens"], readings: ["せんえん"], mnemonicFr: "MILLE YENS - billet de mille yens.", targetKanji: ["千", "円"] },
  { word: "二千円", meanings: ["Deux mille yens"], readings: ["にせんえん"], mnemonicFr: "DEUX MILLE YENS - billet de deux mille yens.", targetKanji: ["二", "千", "円"] },
  { word: "三千円", meanings: ["Trois mille yens"], readings: ["さんぜんえん"], mnemonicFr: "TROIS MILLE YENS - prix de trois mille yens.", targetKanji: ["三", "千", "円"] },
  { word: "五千円", meanings: ["Cinq mille yens"], readings: ["ごせんえん"], mnemonicFr: "CINQ MILLE YENS - billet de cinq mille yens.", targetKanji: ["五", "千", "円"] },

  // 千 (Mille) - Counting people
  { word: "千人", meanings: ["Mille personnes"], readings: ["せんにん"], mnemonicFr: "MILLE PERSONNES - un groupe de mille.", targetKanji: ["千", "人"] },

  // 千 (Mille) - General
  { word: "千", meanings: ["Mille"], readings: ["せん"], mnemonicFr: "MILLE - le nombre mille.", targetKanji: ["千"] },
  { word: "二千", meanings: ["Deux mille"], readings: ["にせん"], mnemonicFr: "DEUX MILLE - deux fois mille.", targetKanji: ["二", "千"] },
  { word: "三千", meanings: ["Trois mille"], readings: ["さんぜん"], mnemonicFr: "TROIS MILLE - trois fois mille.", targetKanji: ["三", "千"] },
  { word: "四千", meanings: ["Quatre mille"], readings: ["よんせん"], mnemonicFr: "QUATRE MILLE - quatre fois mille.", targetKanji: ["四", "千"] },
  { word: "五千", meanings: ["Cinq mille"], readings: ["ごせん"], mnemonicFr: "CINQ MILLE - cinq fois mille.", targetKanji: ["五", "千"] },
  { word: "六千", meanings: ["Six mille"], readings: ["ろくせん"], mnemonicFr: "SIX MILLE - six fois mille.", targetKanji: ["六", "千"] },
  { word: "七千", meanings: ["Sept mille"], readings: ["ななせん"], mnemonicFr: "SEPT MILLE - sept fois mille.", targetKanji: ["七", "千"] },
  { word: "八千", meanings: ["Huit mille"], readings: ["はっせん"], mnemonicFr: "HUIT MILLE - huit fois mille.", targetKanji: ["八", "千"] },
  { word: "九千", meanings: ["Neuf mille"], readings: ["きゅうせん"], mnemonicFr: "NEUF MILLE - neuf fois mille.", targetKanji: ["九", "千"] },
  { word: "千年", meanings: ["Mille ans"], readings: ["せんねん"], mnemonicFr: "MILLE ANS - un millenaire.", targetKanji: ["千", "年"] },
  { word: "千葉", meanings: ["Chiba"], readings: ["ちば"], mnemonicFr: "CHIBA - prefecture pres de Tokyo.", targetKanji: ["千", "葉"] },
];

// Vocabulary with number compounds - Part 5 (万 and more compounds)
const vocabPart5 = [
  // 万 (Dix mille) - Money
  { word: "万円", meanings: ["Dix mille yens"], readings: ["まんえん"], mnemonicFr: "DIX MILLE YENS - billet de dix mille yens.", targetKanji: ["万", "円"] },
  { word: "一万円", meanings: ["Dix mille yens"], readings: ["いちまんえん"], mnemonicFr: "DIX MILLE YENS - un billet de dix mille.", targetKanji: ["一", "万", "円"] },
  { word: "二万円", meanings: ["Vingt mille yens"], readings: ["にまんえん"], mnemonicFr: "VINGT MILLE YENS - deux billets de dix mille.", targetKanji: ["二", "万", "円"] },
  { word: "三万円", meanings: ["Trente mille yens"], readings: ["さんまんえん"], mnemonicFr: "TRENTE MILLE YENS - trois billets de dix mille.", targetKanji: ["三", "万", "円"] },
  { word: "五万円", meanings: ["Cinquante mille yens"], readings: ["ごまんえん"], mnemonicFr: "CINQUANTE MILLE YENS - cinq billets de dix mille.", targetKanji: ["五", "万", "円"] },
  { word: "十万円", meanings: ["Cent mille yens"], readings: ["じゅうまんえん"], mnemonicFr: "CENT MILLE YENS - dix billets de dix mille.", targetKanji: ["十", "万", "円"] },
  { word: "百万円", meanings: ["Un million de yens"], readings: ["ひゃくまんえん"], mnemonicFr: "UN MILLION DE YENS - cent fois dix mille yens.", targetKanji: ["百", "万", "円"] },

  // 万 (Dix mille) - Counting people
  { word: "万人", meanings: ["Dix mille personnes", "Tout le monde"], readings: ["まんにん", "ばんにん"], mnemonicFr: "DIX MILLE PERSONNES - ou tout le monde.", targetKanji: ["万", "人"] },

  // 万 (Dix mille) - General
  { word: "万", meanings: ["Dix mille"], readings: ["まん"], mnemonicFr: "DIX MILLE - le nombre dix mille.", targetKanji: ["万"] },
  { word: "一万", meanings: ["Dix mille"], readings: ["いちまん"], mnemonicFr: "DIX MILLE - une fois dix mille.", targetKanji: ["一", "万"] },
  { word: "二万", meanings: ["Vingt mille"], readings: ["にまん"], mnemonicFr: "VINGT MILLE - deux fois dix mille.", targetKanji: ["二", "万"] },
  { word: "三万", meanings: ["Trente mille"], readings: ["さんまん"], mnemonicFr: "TRENTE MILLE - trois fois dix mille.", targetKanji: ["三", "万"] },
  { word: "十万", meanings: ["Cent mille"], readings: ["じゅうまん"], mnemonicFr: "CENT MILLE - dix fois dix mille.", targetKanji: ["十", "万"] },
  { word: "百万", meanings: ["Un million"], readings: ["ひゃくまん"], mnemonicFr: "UN MILLION - cent fois dix mille.", targetKanji: ["百", "万"] },
  { word: "千万", meanings: ["Dix millions"], readings: ["せんまん"], mnemonicFr: "DIX MILLIONS - mille fois dix mille.", targetKanji: ["千", "万"] },
  { word: "万年筆", meanings: ["Stylo plume"], readings: ["まんねんひつ"], mnemonicFr: "STYLO PLUME - stylo qui dure dix mille ans.", targetKanji: ["万", "年", "筆"] },
  { word: "万が一", meanings: ["Au cas ou"], readings: ["まんがいち"], mnemonicFr: "AU CAS OU - une chance sur dix mille.", targetKanji: ["万", "一"] },
  { word: "万歳", meanings: ["Vive!", "Hourra!"], readings: ["ばんざい"], mnemonicFr: "VIVE - cri de celebration, mille ans!", targetKanji: ["万", "歳"] },
  { word: "万全", meanings: ["Parfait", "Complet"], readings: ["ばんぜん"], mnemonicFr: "PARFAIT - completement prepare.", targetKanji: ["万", "全"] },
  { word: "万能", meanings: ["Omnipotent", "Polyvalent"], readings: ["ばんのう"], mnemonicFr: "POLYVALENT - capable de tout faire.", targetKanji: ["万", "能"] },
  { word: "万国", meanings: ["Tous les pays"], readings: ["ばんこく"], mnemonicFr: "TOUS LES PAYS - international.", targetKanji: ["万", "国"] },

  // More compound numbers
  { word: "数十", meanings: ["Quelques dizaines"], readings: ["すうじゅう"], mnemonicFr: "QUELQUES DIZAINES - plusieurs dizaines.", targetKanji: ["数", "十"] },
  { word: "数百", meanings: ["Quelques centaines"], readings: ["すうひゃく"], mnemonicFr: "QUELQUES CENTAINES - plusieurs centaines.", targetKanji: ["数", "百"] },
  { word: "数千", meanings: ["Quelques milliers"], readings: ["すうせん"], mnemonicFr: "QUELQUES MILLIERS - plusieurs milliers.", targetKanji: ["数", "千"] },
  { word: "数万", meanings: ["Quelques dizaines de milliers"], readings: ["すうまん"], mnemonicFr: "QUELQUES DIZAINES DE MILLIERS - plusieurs myriade.", targetKanji: ["数", "万"] },
  { word: "何十", meanings: ["Combien de dizaines"], readings: ["なんじゅう"], mnemonicFr: "COMBIEN DE DIZAINES - plusieurs dizaines.", targetKanji: ["何", "十"] },
  { word: "何百", meanings: ["Combien de centaines"], readings: ["なんびゃく"], mnemonicFr: "COMBIEN DE CENTAINES - plusieurs centaines.", targetKanji: ["何", "百"] },
  { word: "何千", meanings: ["Combien de milliers"], readings: ["なんぜん"], mnemonicFr: "COMBIEN DE MILLIERS - plusieurs milliers.", targetKanji: ["何", "千"] },
  { word: "何万", meanings: ["Combien de dizaines de milliers"], readings: ["なんまん"], mnemonicFr: "COMBIEN DE DIZAINES DE MILLIERS - plusieurs myriade.", targetKanji: ["何", "万"] },

  // Time-related number compounds
  { word: "一時間", meanings: ["Une heure"], readings: ["いちじかん"], mnemonicFr: "UNE HEURE - duree d'une heure.", targetKanji: ["一", "時", "間"] },
  { word: "二時間", meanings: ["Deux heures"], readings: ["にじかん"], mnemonicFr: "DEUX HEURES - duree de deux heures.", targetKanji: ["二", "時", "間"] },
  { word: "三時間", meanings: ["Trois heures"], readings: ["さんじかん"], mnemonicFr: "TROIS HEURES - duree de trois heures.", targetKanji: ["三", "時", "間"] },
  { word: "半時間", meanings: ["Une demi-heure"], readings: ["はんじかん"], mnemonicFr: "DEMI-HEURE - trente minutes.", targetKanji: ["半", "時", "間"] },
  { word: "一分", meanings: ["Une minute"], readings: ["いっぷん"], mnemonicFr: "UNE MINUTE - duree d'une minute.", targetKanji: ["一", "分"] },
  { word: "二分", meanings: ["Deux minutes"], readings: ["にふん"], mnemonicFr: "DEUX MINUTES - duree de deux minutes.", targetKanji: ["二", "分"] },
  { word: "三分", meanings: ["Trois minutes"], readings: ["さんぷん"], mnemonicFr: "TROIS MINUTES - duree de trois minutes.", targetKanji: ["三", "分"] },
  { word: "五分", meanings: ["Cinq minutes"], readings: ["ごふん"], mnemonicFr: "CINQ MINUTES - duree de cinq minutes.", targetKanji: ["五", "分"] },
  { word: "一秒", meanings: ["Une seconde"], readings: ["いちびょう"], mnemonicFr: "UNE SECONDE - un instant.", targetKanji: ["一", "秒"] },

  // Week-related
  { word: "一週間", meanings: ["Une semaine"], readings: ["いっしゅうかん"], mnemonicFr: "UNE SEMAINE - duree de sept jours.", targetKanji: ["一", "週", "間"] },
  { word: "二週間", meanings: ["Deux semaines"], readings: ["にしゅうかん"], mnemonicFr: "DEUX SEMAINES - duree de quatorze jours.", targetKanji: ["二", "週", "間"] },
  { word: "三週間", meanings: ["Trois semaines"], readings: ["さんしゅうかん"], mnemonicFr: "TROIS SEMAINES - duree de vingt-et-un jours.", targetKanji: ["三", "週", "間"] },
  { word: "四週間", meanings: ["Quatre semaines"], readings: ["よんしゅうかん"], mnemonicFr: "QUATRE SEMAINES - duree d'un mois environ.", targetKanji: ["四", "週", "間"] },
];

// Additional number compounds - Part 6
const vocabPart6 = [
  // Floor/Story compounds
  { word: "一階", meanings: ["Premier etage", "Rez-de-chaussee"], readings: ["いっかい"], mnemonicFr: "PREMIER ETAGE - le niveau le plus bas.", targetKanji: ["一", "階"] },
  { word: "二階", meanings: ["Deuxieme etage"], readings: ["にかい"], mnemonicFr: "DEUXIEME ETAGE - l'etage au-dessus.", targetKanji: ["二", "階"] },
  { word: "三階", meanings: ["Troisieme etage"], readings: ["さんがい"], mnemonicFr: "TROISIEME ETAGE - deux etages au-dessus.", targetKanji: ["三", "階"] },
  { word: "四階", meanings: ["Quatrieme etage"], readings: ["よんかい"], mnemonicFr: "QUATRIEME ETAGE - trois etages au-dessus.", targetKanji: ["四", "階"] },
  { word: "五階", meanings: ["Cinquieme etage"], readings: ["ごかい"], mnemonicFr: "CINQUIEME ETAGE - quatre etages au-dessus.", targetKanji: ["五", "階"] },
  { word: "地下一階", meanings: ["Sous-sol"], readings: ["ちかいっかい"], mnemonicFr: "SOUS-SOL - premier niveau sous terre.", targetKanji: ["地", "下", "一", "階"] },

  // Age compounds
  { word: "一歳", meanings: ["Un an (age)"], readings: ["いっさい"], mnemonicFr: "UN AN - age d'un an.", targetKanji: ["一", "歳"] },
  { word: "二歳", meanings: ["Deux ans (age)"], readings: ["にさい"], mnemonicFr: "DEUX ANS - age de deux ans.", targetKanji: ["二", "歳"] },
  { word: "三歳", meanings: ["Trois ans (age)"], readings: ["さんさい"], mnemonicFr: "TROIS ANS - age de trois ans.", targetKanji: ["三", "歳"] },
  { word: "五歳", meanings: ["Cinq ans (age)"], readings: ["ごさい"], mnemonicFr: "CINQ ANS - age de cinq ans.", targetKanji: ["五", "歳"] },
  { word: "十歳", meanings: ["Dix ans (age)"], readings: ["じゅっさい"], mnemonicFr: "DIX ANS - age de dix ans.", targetKanji: ["十", "歳"] },

  // Book/volume compounds
  { word: "一冊", meanings: ["Un livre (compteur)"], readings: ["いっさつ"], mnemonicFr: "UN LIVRE - compteur pour un livre.", targetKanji: ["一", "冊"] },
  { word: "二冊", meanings: ["Deux livres"], readings: ["にさつ"], mnemonicFr: "DEUX LIVRES - compteur pour deux livres.", targetKanji: ["二", "冊"] },
  { word: "三冊", meanings: ["Trois livres"], readings: ["さんさつ"], mnemonicFr: "TROIS LIVRES - compteur pour trois livres.", targetKanji: ["三", "冊"] },

  // Animal compounds
  { word: "一匹", meanings: ["Un animal (petit)"], readings: ["いっぴき"], mnemonicFr: "UN ANIMAL - compteur pour petits animaux.", targetKanji: ["一", "匹"] },
  { word: "二匹", meanings: ["Deux animaux"], readings: ["にひき"], mnemonicFr: "DEUX ANIMAUX - compteur pour deux animaux.", targetKanji: ["二", "匹"] },
  { word: "三匹", meanings: ["Trois animaux"], readings: ["さんびき"], mnemonicFr: "TROIS ANIMAUX - compteur pour trois animaux.", targetKanji: ["三", "匹"] },
  { word: "一頭", meanings: ["Un animal (gros)"], readings: ["いっとう"], mnemonicFr: "UN ANIMAL - compteur pour gros animaux.", targetKanji: ["一", "頭"] },
  { word: "一羽", meanings: ["Un oiseau"], readings: ["いちわ"], mnemonicFr: "UN OISEAU - compteur pour oiseaux.", targetKanji: ["一", "羽"] },

  // Vehicle compounds
  { word: "一台", meanings: ["Un vehicule/machine"], readings: ["いちだい"], mnemonicFr: "UN VEHICULE - compteur pour machines.", targetKanji: ["一", "台"] },
  { word: "二台", meanings: ["Deux vehicules"], readings: ["にだい"], mnemonicFr: "DEUX VEHICULES - compteur pour deux machines.", targetKanji: ["二", "台"] },
  { word: "三台", meanings: ["Trois vehicules"], readings: ["さんだい"], mnemonicFr: "TROIS VEHICULES - compteur pour trois machines.", targetKanji: ["三", "台"] },

  // Cup/glass compounds
  { word: "一杯", meanings: ["Un verre", "Plein"], readings: ["いっぱい"], mnemonicFr: "UN VERRE - un recipient rempli.", targetKanji: ["一", "杯"] },
  { word: "二杯", meanings: ["Deux verres"], readings: ["にはい"], mnemonicFr: "DEUX VERRES - deux recipients.", targetKanji: ["二", "杯"] },
  { word: "三杯", meanings: ["Trois verres"], readings: ["さんばい"], mnemonicFr: "TROIS VERRES - trois recipients.", targetKanji: ["三", "杯"] },

  // Sheet/flat object compounds
  { word: "一枚", meanings: ["Une feuille"], readings: ["いちまい"], mnemonicFr: "UNE FEUILLE - compteur pour objets plats.", targetKanji: ["一", "枚"] },
  { word: "二枚", meanings: ["Deux feuilles"], readings: ["にまい"], mnemonicFr: "DEUX FEUILLES - compteur pour objets plats.", targetKanji: ["二", "枚"] },
  { word: "三枚", meanings: ["Trois feuilles"], readings: ["さんまい"], mnemonicFr: "TROIS FEUILLES - compteur pour objets plats.", targetKanji: ["三", "枚"] },

  // Long object compounds
  { word: "一本", meanings: ["Un (objet long)"], readings: ["いっぽん"], mnemonicFr: "UN - compteur pour objets longs.", targetKanji: ["一", "本"] },
  { word: "二本", meanings: ["Deux (objets longs)"], readings: ["にほん"], mnemonicFr: "DEUX - compteur pour objets longs.", targetKanji: ["二", "本"] },
  { word: "三本", meanings: ["Trois (objets longs)"], readings: ["さんぼん"], mnemonicFr: "TROIS - compteur pour objets longs.", targetKanji: ["三", "本"] },

  // Percentage and fraction
  { word: "一割", meanings: ["Dix pour cent"], readings: ["いちわり"], mnemonicFr: "DIX POUR CENT - une partie sur dix.", targetKanji: ["一", "割"] },
  { word: "二割", meanings: ["Vingt pour cent"], readings: ["にわり"], mnemonicFr: "VINGT POUR CENT - deux parties sur dix.", targetKanji: ["二", "割"] },
  { word: "三割", meanings: ["Trente pour cent"], readings: ["さんわり"], mnemonicFr: "TRENTE POUR CENT - trois parties sur dix.", targetKanji: ["三", "割"] },
  { word: "五割", meanings: ["Cinquante pour cent"], readings: ["ごわり"], mnemonicFr: "CINQUANTE POUR CENT - la moitie.", targetKanji: ["五", "割"] },
  { word: "半分", meanings: ["Moitie"], readings: ["はんぶん"], mnemonicFr: "MOITIE - une partie sur deux.", targetKanji: ["半", "分"] },
  { word: "四分の一", meanings: ["Un quart"], readings: ["よんぶんのいち"], mnemonicFr: "UN QUART - une partie sur quatre.", targetKanji: ["四", "分", "一"] },
  { word: "三分の一", meanings: ["Un tiers"], readings: ["さんぶんのいち"], mnemonicFr: "UN TIERS - une partie sur trois.", targetKanji: ["三", "分", "一"] },
  { word: "三分の二", meanings: ["Deux tiers"], readings: ["さんぶんのに"], mnemonicFr: "DEUX TIERS - deux parties sur trois.", targetKanji: ["三", "分", "二"] },

  // More general number expressions
  { word: "一番目", meanings: ["Le premier"], readings: ["いちばんめ"], mnemonicFr: "LE PREMIER - en premiere position.", targetKanji: ["一", "番", "目"] },
  { word: "二番目", meanings: ["Le deuxieme"], readings: ["にばんめ"], mnemonicFr: "LE DEUXIEME - en deuxieme position.", targetKanji: ["二", "番", "目"] },
  { word: "三番目", meanings: ["Le troisieme"], readings: ["さんばんめ"], mnemonicFr: "LE TROISIEME - en troisieme position.", targetKanji: ["三", "番", "目"] },
  { word: "何番目", meanings: ["Quel numero"], readings: ["なんばんめ"], mnemonicFr: "QUEL NUMERO - quelle position.", targetKanji: ["何", "番", "目"] },
  { word: "一人一人", meanings: ["Un par un"], readings: ["ひとりひとり"], mnemonicFr: "UN PAR UN - chaque personne individuellement.", targetKanji: ["一", "人"] },
  { word: "一日一日", meanings: ["Jour apres jour"], readings: ["いちにちいちにち"], mnemonicFr: "JOUR APRES JOUR - chaque jour qui passe.", targetKanji: ["一", "日"] },
  { word: "一歩一歩", meanings: ["Pas a pas"], readings: ["いっぽいっぽ"], mnemonicFr: "PAS A PAS - progresser lentement.", targetKanji: ["一", "歩"] },

  // More complex compounds
  { word: "世界一", meanings: ["Numero un mondial"], readings: ["せかいいち"], mnemonicFr: "NUMERO UN MONDIAL - le meilleur du monde.", targetKanji: ["世", "界", "一"] },
  { word: "日本一", meanings: ["Numero un au Japon"], readings: ["にほんいち"], mnemonicFr: "NUMERO UN AU JAPON - le meilleur du Japon.", targetKanji: ["日", "本", "一"] },
  { word: "一番好き", meanings: ["Prefere"], readings: ["いちばんすき"], mnemonicFr: "PREFERE - ce qu'on aime le plus.", targetKanji: ["一", "番", "好"] },
];

async function main() {
  console.log("=== ADDING NUMBER COMPOUND VOCABULARY ===\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  const allVocab = [...vocabPart1, ...vocabPart2, ...vocabPart3, ...vocabPart4, ...vocabPart5, ...vocabPart6];

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
  console.log(`Total vocabulary: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
