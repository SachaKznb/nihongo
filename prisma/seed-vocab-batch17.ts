import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Batch 17: Verb forms, compounds, and action words for French speakers
// Focus on: potential forms, compound verbs, nominalized verbs, 方 patterns, etc.

const vocabPart1 = [
  // === POTENTIAL FORMS AS STANDALONE VOCABULARY ===
  { word: "出来る", meanings: ["Pouvoir faire", "Etre capable"], readings: ["できる"], mnemonicFr: "POUVOIR FAIRE - la forme potentielle de 'faire', exprime la capacité.", targetKanji: ["出", "来"] },
  { word: "見える", meanings: ["Etre visible", "Pouvoir voir"], readings: ["みえる"], mnemonicFr: "ETRE VISIBLE - quand quelque chose peut être vu naturellement.", targetKanji: ["見"] },
  { word: "聞こえる", meanings: ["Etre audible", "Pouvoir entendre"], readings: ["きこえる"], mnemonicFr: "ETRE AUDIBLE - quand un son peut être entendu naturellement.", targetKanji: ["聞"] },
  { word: "分かる", meanings: ["Comprendre", "Savoir"], readings: ["わかる"], mnemonicFr: "COMPRENDRE - quand quelque chose devient clair dans l'esprit.", targetKanji: ["分"] },
  { word: "読める", meanings: ["Pouvoir lire", "Etre lisible"], readings: ["よめる"], mnemonicFr: "POUVOIR LIRE - capacite de lire quelque chose.", targetKanji: ["読"] },
  { word: "書ける", meanings: ["Pouvoir ecrire"], readings: ["かける"], mnemonicFr: "POUVOIR ECRIRE - capacite d'ecrire.", targetKanji: ["書"] },
  { word: "話せる", meanings: ["Pouvoir parler"], readings: ["はなせる"], mnemonicFr: "POUVOIR PARLER - capacite de s'exprimer oralement.", targetKanji: ["話"] },
  { word: "食べられる", meanings: ["Pouvoir manger", "Etre mangeable"], readings: ["たべられる"], mnemonicFr: "POUVOIR MANGER - capacite de manger ou comestible.", targetKanji: ["食"] },
  { word: "飲める", meanings: ["Pouvoir boire", "Etre buvable"], readings: ["のめる"], mnemonicFr: "POUVOIR BOIRE - capacite de boire.", targetKanji: ["飲"] },
  { word: "歩ける", meanings: ["Pouvoir marcher"], readings: ["あるける"], mnemonicFr: "POUVOIR MARCHER - capacite de se deplacer a pied.", targetKanji: ["歩"] },

  // === 出す COMPOUND VERBS (Faire sortir, commencer) ===
  { word: "思い出す", meanings: ["Se souvenir", "Se rappeler"], readings: ["おもいだす"], mnemonicFr: "SE SOUVENIR - faire sortir une pensee de la memoire.", targetKanji: ["思", "出"] },
  { word: "取り出す", meanings: ["Sortir", "Extraire"], readings: ["とりだす"], mnemonicFr: "SORTIR - prendre quelque chose et le faire sortir.", targetKanji: ["取", "出"] },
  { word: "引き出す", meanings: ["Tirer", "Retirer"], readings: ["ひきだす"], mnemonicFr: "TIRER - faire sortir en tirant.", targetKanji: ["引", "出"] },
  { word: "押し出す", meanings: ["Pousser dehors", "Expulser"], readings: ["おしだす"], mnemonicFr: "EXPULSER - faire sortir en poussant.", targetKanji: ["押", "出"] },
  { word: "飛び出す", meanings: ["S'elancer", "Jaillir"], readings: ["とびだす"], mnemonicFr: "JAILLIR - sortir en volant/sautant.", targetKanji: ["飛", "出"] },
  { word: "走り出す", meanings: ["Se mettre a courir"], readings: ["はしりだす"], mnemonicFr: "SE METTRE A COURIR - commencer a courir.", targetKanji: ["走", "出"] },
  { word: "言い出す", meanings: ["Commencer a dire", "Proposer"], readings: ["いいだす"], mnemonicFr: "PROPOSER - commencer a exprimer une idee.", targetKanji: ["言", "出"] },
  { word: "持ち出す", meanings: ["Emporter", "Sortir"], readings: ["もちだす"], mnemonicFr: "EMPORTER - prendre et faire sortir.", targetKanji: ["持", "出"] },
  { word: "呼び出す", meanings: ["Appeler", "Convoquer"], readings: ["よびだす"], mnemonicFr: "CONVOQUER - faire sortir quelqu'un en l'appelant.", targetKanji: ["呼", "出"] },
  { word: "生み出す", meanings: ["Creer", "Produire"], readings: ["うみだす"], mnemonicFr: "CREER - faire naitre quelque chose.", targetKanji: ["生", "出"] },

  // === 取る COMPOUND VERBS (Prendre, saisir) ===
  { word: "切り取る", meanings: ["Decouper", "Detacher"], readings: ["きりとる"], mnemonicFr: "DECOUPER - prendre en coupant.", targetKanji: ["切", "取"] },
  { word: "受け取る", meanings: ["Recevoir", "Accepter"], readings: ["うけとる"], mnemonicFr: "RECEVOIR - prendre ce qui est donne.", targetKanji: ["受", "取"] },
  { word: "聞き取る", meanings: ["Saisir (a l'oreille)", "Comprendre"], readings: ["ききとる"], mnemonicFr: "SAISIR - comprendre en ecoutant.", targetKanji: ["聞", "取"] },
  { word: "読み取る", meanings: ["Dechiffrer", "Interpreter"], readings: ["よみとる"], mnemonicFr: "DECHIFFRER - comprendre en lisant.", targetKanji: ["読", "取"] },
  { word: "見取る", meanings: ["Percevoir", "Comprendre"], readings: ["みとる"], mnemonicFr: "PERCEVOIR - comprendre en voyant.", targetKanji: ["見", "取"] },
  { word: "書き取る", meanings: ["Prendre en note", "Copier"], readings: ["かきとる"], mnemonicFr: "NOTER - ecrire ce qu'on entend.", targetKanji: ["書", "取"] },

  // === 上がる/上げる COMPOUND VERBS (Monter) ===
  { word: "立ち上がる", meanings: ["Se lever"], readings: ["たちあがる"], mnemonicFr: "SE LEVER - se mettre debout.", targetKanji: ["立", "上"] },
  { word: "起き上がる", meanings: ["Se relever", "Se redresser"], readings: ["おきあがる"], mnemonicFr: "SE REDRESSER - se lever apres etre couche.", targetKanji: ["起", "上"] },
  { word: "飛び上がる", meanings: ["Bondir", "Sauter"], readings: ["とびあがる"], mnemonicFr: "BONDIR - s'elever en sautant.", targetKanji: ["飛", "上"] },
  { word: "持ち上げる", meanings: ["Soulever"], readings: ["もちあげる"], mnemonicFr: "SOULEVER - porter vers le haut.", targetKanji: ["持", "上"] },
  { word: "引き上げる", meanings: ["Remonter", "Relever"], readings: ["ひきあげる"], mnemonicFr: "REMONTER - tirer vers le haut.", targetKanji: ["引", "上"] },
  { word: "取り上げる", meanings: ["Confisquer", "Aborder"], readings: ["とりあげる"], mnemonicFr: "CONFISQUER - prendre vers le haut (enlever).", targetKanji: ["取", "上"] },
  { word: "出来上がる", meanings: ["Etre termine", "Etre acheve"], readings: ["できあがる"], mnemonicFr: "ETRE ACHEVE - la creation est complete.", targetKanji: ["出", "来", "上"] },
  { word: "仕上げる", meanings: ["Terminer", "Achever"], readings: ["しあげる"], mnemonicFr: "TERMINER - porter le travail a son terme.", targetKanji: ["仕", "上"] },
  { word: "売り上げ", meanings: ["Chiffre d'affaires", "Ventes"], readings: ["うりあげ"], mnemonicFr: "VENTES - le total des ventes.", targetKanji: ["売", "上"] },
];

const vocabPart2 = [
  // === 合う COMPOUND VERBS (Mutualite, reciprocite) ===
  { word: "話し合う", meanings: ["Discuter", "Se concerter"], readings: ["はなしあう"], mnemonicFr: "DISCUTER - parler ensemble, echanger.", targetKanji: ["話", "合"] },
  { word: "教え合う", meanings: ["S'enseigner mutuellement"], readings: ["おしえあう"], mnemonicFr: "S'ENSEIGNER - apprendre les uns des autres.", targetKanji: ["教", "合"] },
  { word: "助け合う", meanings: ["S'entraider"], readings: ["たすけあう"], mnemonicFr: "S'ENTRAIDER - s'aider mutuellement.", targetKanji: ["助", "合"] },
  { word: "見合う", meanings: ["Se regarder", "Correspondre"], readings: ["みあう"], mnemonicFr: "SE REGARDER - se voir mutuellement ou etre adapte.", targetKanji: ["見", "合"] },
  { word: "知り合う", meanings: ["Faire connaissance"], readings: ["しりあう"], mnemonicFr: "FAIRE CONNAISSANCE - apprendre a se connaitre.", targetKanji: ["知", "合"] },
  { word: "知り合い", meanings: ["Connaissance (personne)"], readings: ["しりあい"], mnemonicFr: "CONNAISSANCE - personne qu'on connait.", targetKanji: ["知", "合"] },
  { word: "出会う", meanings: ["Rencontrer"], readings: ["であう"], mnemonicFr: "RENCONTRER - sortir pour se voir.", targetKanji: ["出", "会"] },
  { word: "出会い", meanings: ["Rencontre"], readings: ["であい"], mnemonicFr: "RENCONTRE - le fait de se rencontrer.", targetKanji: ["出", "会"] },
  { word: "付き合う", meanings: ["Sortir avec", "Frequenter"], readings: ["つきあう"], mnemonicFr: "SORTIR AVEC - etre en relation avec quelqu'un.", targetKanji: ["付", "合"] },
  { word: "付き合い", meanings: ["Relation", "Frequentation"], readings: ["つきあい"], mnemonicFr: "RELATION - le fait de frequenter quelqu'un.", targetKanji: ["付", "合"] },

  // === 方 PATTERNS (Maniere de faire) ===
  { word: "使い方", meanings: ["Mode d'emploi", "Facon d'utiliser"], readings: ["つかいかた"], mnemonicFr: "MODE D'EMPLOI - la maniere d'utiliser.", targetKanji: ["使", "方"] },
  { word: "読み方", meanings: ["Facon de lire", "Prononciation"], readings: ["よみかた"], mnemonicFr: "PRONONCIATION - la maniere de lire.", targetKanji: ["読", "方"] },
  { word: "書き方", meanings: ["Facon d'ecrire"], readings: ["かきかた"], mnemonicFr: "FACON D'ECRIRE - la maniere d'ecrire.", targetKanji: ["書", "方"] },
  { word: "作り方", meanings: ["Facon de faire", "Recette"], readings: ["つくりかた"], mnemonicFr: "RECETTE - la maniere de fabriquer.", targetKanji: ["作", "方"] },
  { word: "話し方", meanings: ["Facon de parler"], readings: ["はなしかた"], mnemonicFr: "FACON DE PARLER - la maniere de s'exprimer.", targetKanji: ["話", "方"] },
  { word: "歩き方", meanings: ["Facon de marcher"], readings: ["あるきかた"], mnemonicFr: "DEMARCHE - la maniere de marcher.", targetKanji: ["歩", "方"] },
  { word: "考え方", meanings: ["Facon de penser", "Point de vue"], readings: ["かんがえかた"], mnemonicFr: "POINT DE VUE - la maniere de reflechir.", targetKanji: ["考", "方"] },
  { word: "生き方", meanings: ["Facon de vivre", "Mode de vie"], readings: ["いきかた"], mnemonicFr: "MODE DE VIE - la maniere de vivre.", targetKanji: ["生", "方"] },
  { word: "見方", meanings: ["Point de vue", "Facon de voir"], readings: ["みかた"], mnemonicFr: "POINT DE VUE - la maniere de regarder les choses.", targetKanji: ["見", "方"] },
  { word: "食べ方", meanings: ["Facon de manger"], readings: ["たべかた"], mnemonicFr: "FACON DE MANGER - la maniere de manger.", targetKanji: ["食", "方"] },
  { word: "仕方", meanings: ["Maniere", "Methode"], readings: ["しかた"], mnemonicFr: "METHODE - la facon de faire quelque chose.", targetKanji: ["仕", "方"] },
  { word: "仕方ない", meanings: ["C'est inevitable", "On n'y peut rien"], readings: ["しかたない"], mnemonicFr: "INEVITABLE - il n'y a pas de methode (pour changer).", targetKanji: ["仕", "方"] },
  { word: "味方", meanings: ["Allie", "Partisan"], readings: ["みかた"], mnemonicFr: "ALLIE - celui qui est du meme cote.", targetKanji: ["味", "方"] },

  // === 物 COMPOUNDS (Chose, objet) ===
  { word: "乗り物", meanings: ["Vehicule", "Moyen de transport"], readings: ["のりもの"], mnemonicFr: "VEHICULE - chose sur laquelle on monte.", targetKanji: ["乗", "物"] },
  { word: "食べ物", meanings: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "NOURRITURE - chose a manger.", targetKanji: ["食", "物"] },
  { word: "飲み物", meanings: ["Boisson"], readings: ["のみもの"], mnemonicFr: "BOISSON - chose a boire.", targetKanji: ["飲", "物"] },
  { word: "生き物", meanings: ["Etre vivant", "Creature"], readings: ["いきもの"], mnemonicFr: "CREATURE - chose qui vit.", targetKanji: ["生", "物"] },
  { word: "読み物", meanings: ["Lecture", "Texte a lire"], readings: ["よみもの"], mnemonicFr: "LECTURE - chose a lire.", targetKanji: ["読", "物"] },
  { word: "買い物", meanings: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "COURSES - choses a acheter.", targetKanji: ["買", "物"] },
  { word: "忘れ物", meanings: ["Objet oublie"], readings: ["わすれもの"], mnemonicFr: "OBJET OUBLIE - chose qu'on a oubliee.", targetKanji: ["忘", "物"] },
  { word: "落とし物", meanings: ["Objet perdu"], readings: ["おとしもの"], mnemonicFr: "OBJET PERDU - chose qu'on a fait tomber.", targetKanji: ["落", "物"] },
  { word: "持ち物", meanings: ["Effets personnels", "Affaires"], readings: ["もちもの"], mnemonicFr: "AFFAIRES - choses qu'on porte sur soi.", targetKanji: ["持", "物"] },
  { word: "着物", meanings: ["Kimono", "Vetement"], readings: ["きもの"], mnemonicFr: "KIMONO - chose qu'on porte (vetement).", targetKanji: ["着", "物"] },
];

const vocabPart3 = [
  // === 入り/出 COMPOUNDS (Entree/Sortie) ===
  { word: "入り口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - la bouche par laquelle on entre.", targetKanji: ["入", "口"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - la bouche par laquelle on sort.", targetKanji: ["出", "口"] },
  { word: "通り道", meanings: ["Passage", "Chemin"], readings: ["とおりみち"], mnemonicFr: "PASSAGE - chemin par lequel on passe.", targetKanji: ["通", "道"] },
  { word: "帰り道", meanings: ["Chemin du retour"], readings: ["かえりみち"], mnemonicFr: "CHEMIN DU RETOUR - la route pour rentrer.", targetKanji: ["帰", "道"] },
  { word: "行き先", meanings: ["Destination"], readings: ["いきさき"], mnemonicFr: "DESTINATION - le lieu ou l'on va.", targetKanji: ["行", "先"] },
  { word: "入り", meanings: ["Entree", "Debut"], readings: ["いり"], mnemonicFr: "ENTREE - le fait d'entrer.", targetKanji: ["入"] },
  { word: "出入り", meanings: ["Entree et sortie", "Acces"], readings: ["でいり"], mnemonicFr: "ACCES - le fait d'entrer et sortir.", targetKanji: ["出", "入"] },
  { word: "立ち入り", meanings: ["Entree", "Acces"], readings: ["たちいり"], mnemonicFr: "ACCES - le fait de penetrer.", targetKanji: ["立", "入"] },
  { word: "立ち入り禁止", meanings: ["Entree interdite"], readings: ["たちいりきんし"], mnemonicFr: "ENTREE INTERDITE - defense de penetrer.", targetKanji: ["立", "入", "禁", "止"] },
  { word: "引き出し", meanings: ["Tiroir"], readings: ["ひきだし"], mnemonicFr: "TIROIR - chose qu'on tire pour sortir.", targetKanji: ["引", "出"] },

  // === 回る/廻る COMPOUNDS (Tourner) ===
  { word: "回る", meanings: ["Tourner", "Faire le tour"], readings: ["まわる"], mnemonicFr: "TOURNER - effectuer une rotation.", targetKanji: ["回"] },
  { word: "回す", meanings: ["Faire tourner"], readings: ["まわす"], mnemonicFr: "FAIRE TOURNER - provoquer une rotation.", targetKanji: ["回"] },
  { word: "回り", meanings: ["Alentours", "Tour"], readings: ["まわり"], mnemonicFr: "ALENTOURS - ce qui est autour.", targetKanji: ["回"] },
  { word: "見回す", meanings: ["Regarder autour"], readings: ["みまわす"], mnemonicFr: "REGARDER AUTOUR - observer les alentours.", targetKanji: ["見", "回"] },
  { word: "歩き回る", meanings: ["Se promener", "Deambuler"], readings: ["あるきまわる"], mnemonicFr: "DEAMBULER - marcher un peu partout.", targetKanji: ["歩", "回"] },
  { word: "走り回る", meanings: ["Courir partout"], readings: ["はしりまわる"], mnemonicFr: "COURIR PARTOUT - courir dans tous les sens.", targetKanji: ["走", "回"] },

  // === 込む COMPOUNDS (Entrer, se remplir) ===
  { word: "込む", meanings: ["Etre bonde", "Se remplir"], readings: ["こむ"], mnemonicFr: "ETRE BONDE - etre rempli de monde.", targetKanji: ["込"] },
  { word: "申し込む", meanings: ["S'inscrire", "Postuler"], readings: ["もうしこむ"], mnemonicFr: "S'INSCRIRE - soumettre une demande.", targetKanji: ["申", "込"] },
  { word: "申し込み", meanings: ["Inscription", "Candidature"], readings: ["もうしこみ"], mnemonicFr: "INSCRIPTION - demande d'adhesion.", targetKanji: ["申", "込"] },
  { word: "飛び込む", meanings: ["Plonger", "Se jeter"], readings: ["とびこむ"], mnemonicFr: "PLONGER - entrer en sautant.", targetKanji: ["飛", "込"] },
  { word: "走り込む", meanings: ["Courir a l'interieur"], readings: ["はしりこむ"], mnemonicFr: "COURIR DEDANS - entrer en courant.", targetKanji: ["走", "込"] },
  { word: "入り込む", meanings: ["S'introduire", "Penetrer"], readings: ["はいりこむ"], mnemonicFr: "S'INTRODUIRE - entrer profondement.", targetKanji: ["入", "込"] },
  { word: "思い込む", meanings: ["Etre persuade", "Croire fermement"], readings: ["おもいこむ"], mnemonicFr: "ETRE PERSUADE - croire profondement.", targetKanji: ["思", "込"] },
  { word: "読み込む", meanings: ["Charger", "Importer (donnees)"], readings: ["よみこむ"], mnemonicFr: "CHARGER - lire des donnees dans un systeme.", targetKanji: ["読", "込"] },
  { word: "書き込む", meanings: ["Ecrire (dedans)", "Poster"], readings: ["かきこむ"], mnemonicFr: "ECRIRE DEDANS - inscrire a l'interieur.", targetKanji: ["書", "込"] },

  // === 付く/付ける COMPOUNDS (Attacher) ===
  { word: "付く", meanings: ["S'attacher", "Etre allume"], readings: ["つく"], mnemonicFr: "S'ATTACHER - etre fixe a quelque chose.", targetKanji: ["付"] },
  { word: "付ける", meanings: ["Attacher", "Allumer"], readings: ["つける"], mnemonicFr: "ATTACHER - fixer quelque chose.", targetKanji: ["付"] },
  { word: "気付く", meanings: ["Remarquer", "S'apercevoir"], readings: ["きづく"], mnemonicFr: "REMARQUER - l'esprit s'attache a quelque chose.", targetKanji: ["気", "付"] },
  { word: "見付ける", meanings: ["Trouver", "Decouvrir"], readings: ["みつける"], mnemonicFr: "TROUVER - fixer les yeux sur quelque chose.", targetKanji: ["見", "付"] },
  { word: "見付かる", meanings: ["Etre trouve"], readings: ["みつかる"], mnemonicFr: "ETRE TROUVE - devenir visible.", targetKanji: ["見", "付"] },
  { word: "名付ける", meanings: ["Nommer", "Appeler"], readings: ["なづける"], mnemonicFr: "NOMMER - attacher un nom.", targetKanji: ["名", "付"] },
  { word: "片付ける", meanings: ["Ranger", "Regler"], readings: ["かたづける"], mnemonicFr: "RANGER - mettre les choses en ordre.", targetKanji: ["片", "付"] },
  { word: "片付く", meanings: ["Etre range", "Etre regle"], readings: ["かたづく"], mnemonicFr: "ETRE RANGE - les choses sont en ordre.", targetKanji: ["片", "付"] },
];

const vocabPart4 = [
  // === 切る COMPOUNDS (Couper, completement) ===
  { word: "切る", meanings: ["Couper"], readings: ["きる"], mnemonicFr: "COUPER - separer avec un objet tranchant.", targetKanji: ["切"] },
  { word: "切れる", meanings: ["Se couper", "Etre coupe"], readings: ["きれる"], mnemonicFr: "SE COUPER - devenir coupe.", targetKanji: ["切"] },
  { word: "売り切れる", meanings: ["Etre epuise (stock)"], readings: ["うりきれる"], mnemonicFr: "ETRE EPUISE - completement vendu.", targetKanji: ["売", "切"] },
  { word: "売り切れ", meanings: ["Rupture de stock"], readings: ["うりきれ"], mnemonicFr: "RUPTURE DE STOCK - tout est vendu.", targetKanji: ["売", "切"] },
  { word: "使い切る", meanings: ["Epuiser", "Utiliser entierement"], readings: ["つかいきる"], mnemonicFr: "EPUISER - utiliser jusqu'au bout.", targetKanji: ["使", "切"] },
  { word: "読み切る", meanings: ["Lire jusqu'au bout"], readings: ["よみきる"], mnemonicFr: "LIRE ENTIEREMENT - finir de lire.", targetKanji: ["読", "切"] },
  { word: "言い切る", meanings: ["Affirmer", "Declarer fermement"], readings: ["いいきる"], mnemonicFr: "AFFIRMER - dire completement, sans hesitation.", targetKanji: ["言", "切"] },
  { word: "割り切る", meanings: ["Diviser exactement", "Accepter"], readings: ["わりきる"], mnemonicFr: "ACCEPTER - separer clairement (emotionnellement).", targetKanji: ["割", "切"] },
  { word: "思い切る", meanings: ["Se decider", "Se resoudre"], readings: ["おもいきる"], mnemonicFr: "SE DECIDER - couper ses hesitations.", targetKanji: ["思", "切"] },
  { word: "思い切って", meanings: ["Hardiment", "Resolument"], readings: ["おもいきって"], mnemonicFr: "HARDIMENT - avec determination.", targetKanji: ["思", "切"] },
  { word: "踏み切る", meanings: ["Se decider", "Prendre le saut"], readings: ["ふみきる"], mnemonicFr: "SE DECIDER - marcher et trancher.", targetKanji: ["踏", "切"] },

  // === 直す COMPOUNDS (Reparer, refaire) ===
  { word: "直す", meanings: ["Reparer", "Corriger"], readings: ["なおす"], mnemonicFr: "REPARER - remettre en bon etat.", targetKanji: ["直"] },
  { word: "直る", meanings: ["Etre repare", "Guerir"], readings: ["なおる"], mnemonicFr: "ETRE REPARE - revenir a l'etat normal.", targetKanji: ["直"] },
  { word: "書き直す", meanings: ["Reecrire"], readings: ["かきなおす"], mnemonicFr: "REECRIRE - ecrire de nouveau.", targetKanji: ["書", "直"] },
  { word: "読み直す", meanings: ["Relire"], readings: ["よみなおす"], mnemonicFr: "RELIRE - lire de nouveau.", targetKanji: ["読", "直"] },
  { word: "作り直す", meanings: ["Refaire"], readings: ["つくりなおす"], mnemonicFr: "REFAIRE - fabriquer de nouveau.", targetKanji: ["作", "直"] },
  { word: "考え直す", meanings: ["Reconsiderer"], readings: ["かんがえなおす"], mnemonicFr: "RECONSIDERER - reflechir de nouveau.", targetKanji: ["考", "直"] },
  { word: "見直す", meanings: ["Reexaminer", "Revoir"], readings: ["みなおす"], mnemonicFr: "REEXAMINER - regarder de nouveau.", targetKanji: ["見", "直"] },
  { word: "言い直す", meanings: ["Reformuler"], readings: ["いいなおす"], mnemonicFr: "REFORMULER - dire de nouveau.", targetKanji: ["言", "直"] },
  { word: "やり直す", meanings: ["Recommencer"], readings: ["やりなおす"], mnemonicFr: "RECOMMENCER - faire de nouveau.", targetKanji: ["直"] },

  // === 過ぎる COMPOUNDS (Trop, passer) ===
  { word: "過ぎる", meanings: ["Passer", "Depasser"], readings: ["すぎる"], mnemonicFr: "PASSER - aller au-dela.", targetKanji: ["過"] },
  { word: "食べ過ぎる", meanings: ["Trop manger"], readings: ["たべすぎる"], mnemonicFr: "TROP MANGER - manger excessivement.", targetKanji: ["食", "過"] },
  { word: "飲み過ぎる", meanings: ["Trop boire"], readings: ["のみすぎる"], mnemonicFr: "TROP BOIRE - boire excessivement.", targetKanji: ["飲", "過"] },
  { word: "働き過ぎる", meanings: ["Trop travailler"], readings: ["はたらきすぎる"], mnemonicFr: "TROP TRAVAILLER - travailler excessivement.", targetKanji: ["働", "過"] },
  { word: "言い過ぎる", meanings: ["En dire trop"], readings: ["いいすぎる"], mnemonicFr: "EN DIRE TROP - parler excessivement.", targetKanji: ["言", "過"] },
  { word: "通り過ぎる", meanings: ["Passer devant", "Depasser"], readings: ["とおりすぎる"], mnemonicFr: "PASSER DEVANT - traverser sans s'arreter.", targetKanji: ["通", "過"] },

  // === 始める/終わる COMPOUNDS (Commencer/Finir) ===
  { word: "始める", meanings: ["Commencer (tr.)"], readings: ["はじめる"], mnemonicFr: "COMMENCER - initier une action.", targetKanji: ["始"] },
  { word: "始まる", meanings: ["Commencer (intr.)"], readings: ["はじまる"], mnemonicFr: "COMMENCER - une action debute.", targetKanji: ["始"] },
  { word: "終わる", meanings: ["Finir", "Se terminer"], readings: ["おわる"], mnemonicFr: "FINIR - arriver a la fin.", targetKanji: ["終"] },
  { word: "終える", meanings: ["Terminer", "Achever"], readings: ["おえる"], mnemonicFr: "TERMINER - mettre fin a quelque chose.", targetKanji: ["終"] },
  { word: "読み始める", meanings: ["Commencer a lire"], readings: ["よみはじめる"], mnemonicFr: "COMMENCER A LIRE - debuter la lecture.", targetKanji: ["読", "始"] },
  { word: "書き始める", meanings: ["Commencer a ecrire"], readings: ["かきはじめる"], mnemonicFr: "COMMENCER A ECRIRE - debuter l'ecriture.", targetKanji: ["書", "始"] },
  { word: "読み終わる", meanings: ["Finir de lire"], readings: ["よみおわる"], mnemonicFr: "FINIR DE LIRE - terminer la lecture.", targetKanji: ["読", "終"] },
  { word: "食べ終わる", meanings: ["Finir de manger"], readings: ["たべおわる"], mnemonicFr: "FINIR DE MANGER - terminer le repas.", targetKanji: ["食", "終"] },
];

const vocabPart5 = [
  // === 続く/続ける COMPOUNDS (Continuer) ===
  { word: "続く", meanings: ["Continuer", "Se poursuivre"], readings: ["つづく"], mnemonicFr: "CONTINUER - persister dans le temps.", targetKanji: ["続"] },
  { word: "続ける", meanings: ["Continuer (tr.)", "Poursuivre"], readings: ["つづける"], mnemonicFr: "POURSUIVRE - maintenir une action.", targetKanji: ["続"] },
  { word: "続き", meanings: ["Suite"], readings: ["つづき"], mnemonicFr: "SUITE - ce qui vient apres.", targetKanji: ["続"] },
  { word: "読み続ける", meanings: ["Continuer a lire"], readings: ["よみつづける"], mnemonicFr: "CONTINUER A LIRE - poursuivre la lecture.", targetKanji: ["読", "続"] },
  { word: "歩き続ける", meanings: ["Continuer a marcher"], readings: ["あるきつづける"], mnemonicFr: "CONTINUER A MARCHER - poursuivre la marche.", targetKanji: ["歩", "続"] },
  { word: "働き続ける", meanings: ["Continuer a travailler"], readings: ["はたらきつづける"], mnemonicFr: "CONTINUER A TRAVAILLER - poursuivre le travail.", targetKanji: ["働", "続"] },

  // === 落とす/落ちる COMPOUNDS (Tomber) ===
  { word: "落ちる", meanings: ["Tomber"], readings: ["おちる"], mnemonicFr: "TOMBER - descendre par gravite.", targetKanji: ["落"] },
  { word: "落とす", meanings: ["Faire tomber", "Perdre"], readings: ["おとす"], mnemonicFr: "FAIRE TOMBER - provoquer une chute.", targetKanji: ["落"] },
  { word: "見落とす", meanings: ["Manquer", "Oublier de voir"], readings: ["みおとす"], mnemonicFr: "MANQUER - ne pas voir quelque chose.", targetKanji: ["見", "落"] },
  { word: "聞き落とす", meanings: ["Manquer (a l'oreille)"], readings: ["ききおとす"], mnemonicFr: "MANQUER - ne pas entendre quelque chose.", targetKanji: ["聞", "落"] },
  { word: "落ち着く", meanings: ["Se calmer", "S'installer"], readings: ["おちつく"], mnemonicFr: "SE CALMER - devenir stable.", targetKanji: ["落", "着"] },
  { word: "落ち着き", meanings: ["Calme", "Serenite"], readings: ["おちつき"], mnemonicFr: "CALME - etat de serenite.", targetKanji: ["落", "着"] },

  // === 返す/返る COMPOUNDS (Rendre, retourner) ===
  { word: "返す", meanings: ["Rendre", "Retourner"], readings: ["かえす"], mnemonicFr: "RENDRE - donner en retour.", targetKanji: ["返"] },
  { word: "返る", meanings: ["Retourner", "Revenir"], readings: ["かえる"], mnemonicFr: "RETOURNER - revenir a l'origine.", targetKanji: ["返"] },
  { word: "言い返す", meanings: ["Repliquer", "Repondre"], readings: ["いいかえす"], mnemonicFr: "REPLIQUER - repondre en retour.", targetKanji: ["言", "返"] },
  { word: "取り返す", meanings: ["Recuperer"], readings: ["とりかえす"], mnemonicFr: "RECUPERER - reprendre ce qu'on a perdu.", targetKanji: ["取", "返"] },
  { word: "振り返る", meanings: ["Se retourner"], readings: ["ふりかえる"], mnemonicFr: "SE RETOURNER - regarder en arriere.", targetKanji: ["振", "返"] },
  { word: "見返す", meanings: ["Regarder en retour", "Revoir"], readings: ["みかえす"], mnemonicFr: "REVOIR - regarder de nouveau.", targetKanji: ["見", "返"] },
  { word: "繰り返す", meanings: ["Repeter"], readings: ["くりかえす"], mnemonicFr: "REPETER - faire encore et encore.", targetKanji: ["繰", "返"] },
  { word: "繰り返し", meanings: ["Repetition"], readings: ["くりかえし"], mnemonicFr: "REPETITION - le fait de repeter.", targetKanji: ["繰", "返"] },

  // === 掛ける/掛かる COMPOUNDS (Suspendre, depenser) ===
  { word: "掛ける", meanings: ["Suspendre", "Appeler"], readings: ["かける"], mnemonicFr: "SUSPENDRE - accrocher quelque chose.", targetKanji: ["掛"] },
  { word: "掛かる", meanings: ["Etre suspendu", "Couter"], readings: ["かかる"], mnemonicFr: "COUTER - etre necessaire (temps, argent).", targetKanji: ["掛"] },
  { word: "時間が掛かる", meanings: ["Prendre du temps"], readings: ["じかんがかかる"], mnemonicFr: "PRENDRE DU TEMPS - necessiter du temps.", targetKanji: ["時", "間", "掛"] },
  { word: "話し掛ける", meanings: ["Adresser la parole"], readings: ["はなしかける"], mnemonicFr: "ADRESSER LA PAROLE - commencer a parler a quelqu'un.", targetKanji: ["話", "掛"] },
  { word: "呼び掛ける", meanings: ["Interpeller", "Appeler"], readings: ["よびかける"], mnemonicFr: "INTERPELLER - appeler quelqu'un.", targetKanji: ["呼", "掛"] },
  { word: "働き掛ける", meanings: ["Faire pression", "Influencer"], readings: ["はたらきかける"], mnemonicFr: "INFLUENCER - agir pour persuader.", targetKanji: ["働", "掛"] },

  // === 向く/向ける COMPOUNDS (Diriger) ===
  { word: "向く", meanings: ["Faire face", "Etre adapte"], readings: ["むく"], mnemonicFr: "FAIRE FACE - etre tourne vers.", targetKanji: ["向"] },
  { word: "向ける", meanings: ["Diriger", "Tourner vers"], readings: ["むける"], mnemonicFr: "DIRIGER - tourner quelque chose vers.", targetKanji: ["向"] },
  { word: "向かう", meanings: ["Se diriger vers"], readings: ["むかう"], mnemonicFr: "SE DIRIGER - aller vers.", targetKanji: ["向"] },
  { word: "向こう", meanings: ["La-bas", "L'autre cote"], readings: ["むこう"], mnemonicFr: "LA-BAS - de l'autre cote.", targetKanji: ["向"] },
  { word: "振り向く", meanings: ["Se retourner"], readings: ["ふりむく"], mnemonicFr: "SE RETOURNER - tourner la tete.", targetKanji: ["振", "向"] },
  { word: "前向き", meanings: ["Positif", "Optimiste"], readings: ["まえむき"], mnemonicFr: "POSITIF - tourne vers l'avant.", targetKanji: ["前", "向"] },
  { word: "上向き", meanings: ["A la hausse", "Vers le haut"], readings: ["うわむき"], mnemonicFr: "A LA HAUSSE - oriente vers le haut.", targetKanji: ["上", "向"] },
  { word: "下向き", meanings: ["A la baisse", "Vers le bas"], readings: ["したむき"], mnemonicFr: "A LA BAISSE - oriente vers le bas.", targetKanji: ["下", "向"] },
];

const vocabPart6 = [
  // === 立つ/立てる COMPOUNDS (Se lever, etablir) ===
  { word: "立つ", meanings: ["Se lever", "Etre debout"], readings: ["たつ"], mnemonicFr: "SE LEVER - etre en position verticale.", targetKanji: ["立"] },
  { word: "立てる", meanings: ["Dresser", "Etablir"], readings: ["たてる"], mnemonicFr: "DRESSER - mettre en position verticale.", targetKanji: ["立"] },
  { word: "目立つ", meanings: ["Etre remarquable", "Se distinguer"], readings: ["めだつ"], mnemonicFr: "SE DISTINGUER - attirer les yeux.", targetKanji: ["目", "立"] },
  { word: "役に立つ", meanings: ["Etre utile"], readings: ["やくにたつ"], mnemonicFr: "ETRE UTILE - avoir un role.", targetKanji: ["役", "立"] },
  { word: "組み立てる", meanings: ["Assembler", "Monter"], readings: ["くみたてる"], mnemonicFr: "ASSEMBLER - mettre ensemble.", targetKanji: ["組", "立"] },
  { word: "取り立てる", meanings: ["Collecter", "Prelever"], readings: ["とりたてる"], mnemonicFr: "PRELEVER - prendre et etablir.", targetKanji: ["取", "立"] },
  { word: "申し立てる", meanings: ["Declarer", "Revendiquer"], readings: ["もうしたてる"], mnemonicFr: "DECLARER - soumettre officiellement.", targetKanji: ["申", "立"] },

  // === 置く COMPOUNDS (Poser, laisser) ===
  { word: "置く", meanings: ["Poser", "Mettre"], readings: ["おく"], mnemonicFr: "POSER - mettre quelque part.", targetKanji: ["置"] },
  { word: "置き", meanings: ["Intervalle", "Placement"], readings: ["おき"], mnemonicFr: "INTERVALLE - espacement.", targetKanji: ["置"] },
  { word: "見て置く", meanings: ["Regarder d'avance"], readings: ["みておく"], mnemonicFr: "REGARDER D'AVANCE - voir pour se preparer.", targetKanji: ["見", "置"] },
  { word: "読んで置く", meanings: ["Lire d'avance"], readings: ["よんでおく"], mnemonicFr: "LIRE D'AVANCE - lire pour se preparer.", targetKanji: ["読", "置"] },
  { word: "書いて置く", meanings: ["Ecrire d'avance"], readings: ["かいておく"], mnemonicFr: "ECRIRE D'AVANCE - noter pour plus tard.", targetKanji: ["書", "置"] },
  { word: "買って置く", meanings: ["Acheter d'avance"], readings: ["かっておく"], mnemonicFr: "ACHETER D'AVANCE - acheter pour plus tard.", targetKanji: ["買", "置"] },
  { word: "置き場", meanings: ["Lieu de rangement"], readings: ["おきば"], mnemonicFr: "LIEU DE RANGEMENT - endroit ou on pose.", targetKanji: ["置", "場"] },

  // === 残る/残す COMPOUNDS (Rester, laisser) ===
  { word: "残る", meanings: ["Rester"], readings: ["のこる"], mnemonicFr: "RESTER - demeurer en place.", targetKanji: ["残"] },
  { word: "残す", meanings: ["Laisser"], readings: ["のこす"], mnemonicFr: "LAISSER - ne pas emporter.", targetKanji: ["残"] },
  { word: "残り", meanings: ["Reste", "Restant"], readings: ["のこり"], mnemonicFr: "RESTE - ce qui demeure.", targetKanji: ["残"] },
  { word: "食べ残す", meanings: ["Laisser de la nourriture"], readings: ["たべのこす"], mnemonicFr: "LAISSER DE LA NOURRITURE - ne pas tout manger.", targetKanji: ["食", "残"] },
  { word: "言い残す", meanings: ["Laisser un message"], readings: ["いいのこす"], mnemonicFr: "LAISSER UN MESSAGE - dire avant de partir.", targetKanji: ["言", "残"] },
  { word: "書き残す", meanings: ["Laisser par ecrit"], readings: ["かきのこす"], mnemonicFr: "LAISSER PAR ECRIT - ecrire pour la posterite.", targetKanji: ["書", "残"] },
  { word: "生き残る", meanings: ["Survivre"], readings: ["いきのこる"], mnemonicFr: "SURVIVRE - rester en vie.", targetKanji: ["生", "残"] },

  // === 分かる/分ける COMPOUNDS (Diviser, comprendre) ===
  { word: "分かる", meanings: ["Comprendre"], readings: ["わかる"], mnemonicFr: "COMPRENDRE - saisir le sens.", targetKanji: ["分"] },
  { word: "分ける", meanings: ["Diviser", "Separer"], readings: ["わける"], mnemonicFr: "DIVISER - separer en parties.", targetKanji: ["分"] },
  { word: "分かれる", meanings: ["Se separer", "Se diviser"], readings: ["わかれる"], mnemonicFr: "SE SEPARER - devenir divise.", targetKanji: ["分"] },
  { word: "見分ける", meanings: ["Distinguer"], readings: ["みわける"], mnemonicFr: "DISTINGUER - voir la difference.", targetKanji: ["見", "分"] },
  { word: "聞き分ける", meanings: ["Discerner (par l'ouie)"], readings: ["ききわける"], mnemonicFr: "DISCERNER - distinguer les sons.", targetKanji: ["聞", "分"] },
  { word: "使い分ける", meanings: ["Utiliser de facon appropriee"], readings: ["つかいわける"], mnemonicFr: "UTILISER CORRECTEMENT - employer selon le contexte.", targetKanji: ["使", "分"] },

  // === 待つ COMPOUNDS (Attendre) ===
  { word: "待つ", meanings: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE - rester en attendant.", targetKanji: ["待"] },
  { word: "待ち", meanings: ["Attente"], readings: ["まち"], mnemonicFr: "ATTENTE - le fait d'attendre.", targetKanji: ["待"] },
  { word: "待ち合わせ", meanings: ["Rendez-vous"], readings: ["まちあわせ"], mnemonicFr: "RENDEZ-VOUS - s'attendre mutuellement.", targetKanji: ["待", "合"] },
  { word: "待ち合わせる", meanings: ["Se donner rendez-vous"], readings: ["まちあわせる"], mnemonicFr: "SE DONNER RENDEZ-VOUS - convenir d'un lieu.", targetKanji: ["待", "合"] },
  { word: "待ち遠しい", meanings: ["Avoir hate"], readings: ["まちどおしい"], mnemonicFr: "AVOIR HATE - l'attente semble longue.", targetKanji: ["待", "遠"] },
];

async function main() {
  console.log("=== SEED VOCAB BATCH 17: Verb Compounds & Action Words ===\n");

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
