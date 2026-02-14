import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Academic, Scientific, and Intellectual Vocabulary for French Speakers - Batch 9

// Part 1: Research and Science vocabulary
const vocabPart1 = [
  // 研究 (Research) family
  { word: "研究", meanings: ["Recherche", "Etude"], readings: ["けんきゅう"], mnemonicFr: "RECHERCHE - explorer un sujet en profondeur pour en comprendre les secrets.", targetKanji: ["研", "究"] },
  { word: "研究者", meanings: ["Chercheur"], readings: ["けんきゅうしゃ"], mnemonicFr: "CHERCHEUR - celui qui consacre sa vie a la recherche scientifique.", targetKanji: ["研", "究", "者"] },
  { word: "研究所", meanings: ["Institut de recherche", "Laboratoire"], readings: ["けんきゅうしょ"], mnemonicFr: "INSTITUT DE RECHERCHE - lieu ou les chercheurs menent leurs travaux.", targetKanji: ["研", "究", "所"] },
  { word: "研究室", meanings: ["Laboratoire", "Bureau de recherche"], readings: ["けんきゅうしつ"], mnemonicFr: "LABORATOIRE - salle dediee aux travaux de recherche.", targetKanji: ["研", "究", "室"] },
  { word: "研修", meanings: ["Formation", "Stage"], readings: ["けんしゅう"], mnemonicFr: "FORMATION - periode d'apprentissage professionnel.", targetKanji: ["研", "修"] },

  // 科学 (Science) family
  { word: "科学", meanings: ["Science"], readings: ["かがく"], mnemonicFr: "SCIENCE - etude systematique du monde naturel.", targetKanji: ["科", "学"] },
  { word: "科学者", meanings: ["Scientifique"], readings: ["かがくしゃ"], mnemonicFr: "SCIENTIFIQUE - expert en sciences.", targetKanji: ["科", "学", "者"] },
  { word: "科学的", meanings: ["Scientifique (adj.)"], readings: ["かがくてき"], mnemonicFr: "SCIENTIFIQUE - base sur la methode scientifique.", targetKanji: ["科", "学", "的"] },
  { word: "化学", meanings: ["Chimie"], readings: ["かがく"], mnemonicFr: "CHIMIE - science des transformations de la matiere.", targetKanji: ["化", "学"] },
  { word: "物理", meanings: ["Physique"], readings: ["ぶつり"], mnemonicFr: "PHYSIQUE - science des lois fondamentales de la nature.", targetKanji: ["物", "理"] },
  { word: "物理学", meanings: ["Physique (discipline)"], readings: ["ぶつりがく"], mnemonicFr: "PHYSIQUE - etude des phenomenes naturels.", targetKanji: ["物", "理", "学"] },
  { word: "数学", meanings: ["Mathematiques"], readings: ["すうがく"], mnemonicFr: "MATHEMATIQUES - science des nombres et des formes.", targetKanji: ["数", "学"] },
  { word: "数学者", meanings: ["Mathematicien"], readings: ["すうがくしゃ"], mnemonicFr: "MATHEMATICIEN - specialiste des mathematiques.", targetKanji: ["数", "学", "者"] },

  // 実験 (Experiment) family
  { word: "実験", meanings: ["Experience", "Experimentation"], readings: ["じっけん"], mnemonicFr: "EXPERIENCE - test pour verifier une hypothese.", targetKanji: ["実", "験"] },
  { word: "実験室", meanings: ["Laboratoire"], readings: ["じっけんしつ"], mnemonicFr: "LABORATOIRE - salle ou l'on mene des experiences.", targetKanji: ["実", "験", "室"] },
  { word: "実験的", meanings: ["Experimental"], readings: ["じっけんてき"], mnemonicFr: "EXPERIMENTAL - qui releve de l'experimentation.", targetKanji: ["実", "験", "的"] },
  { word: "実行", meanings: ["Execution", "Mise en oeuvre"], readings: ["じっこう"], mnemonicFr: "EXECUTION - passer a l'action.", targetKanji: ["実", "行"] },
  { word: "実現", meanings: ["Realisation", "Concretisation"], readings: ["じつげん"], mnemonicFr: "REALISATION - rendre reel ce qui etait planifie.", targetKanji: ["実", "現"] },
  { word: "実用", meanings: ["Pratique", "Utilitaire"], readings: ["じつよう"], mnemonicFr: "PRATIQUE - applicable dans la vie reelle.", targetKanji: ["実", "用"] },
  { word: "実用的", meanings: ["Pratique (adj.)"], readings: ["じつようてき"], mnemonicFr: "PRATIQUE - qui a une utilite concrete.", targetKanji: ["実", "用", "的"] },

  // 理論 (Theory) family
  { word: "理論", meanings: ["Theorie"], readings: ["りろん"], mnemonicFr: "THEORIE - ensemble d'idees expliquant un phenomene.", targetKanji: ["理", "論"] },
  { word: "理論的", meanings: ["Theorique"], readings: ["りろんてき"], mnemonicFr: "THEORIQUE - relatif a la theorie.", targetKanji: ["理", "論", "的"] },
  { word: "理由", meanings: ["Raison", "Motif"], readings: ["りゆう"], mnemonicFr: "RAISON - explication logique d'un fait.", targetKanji: ["理", "由"] },
  { word: "理解", meanings: ["Comprehension"], readings: ["りかい"], mnemonicFr: "COMPREHENSION - saisir le sens de quelque chose.", targetKanji: ["理", "解"] },
  { word: "道理", meanings: ["Logique", "Raison"], readings: ["どうり"], mnemonicFr: "LOGIQUE - ce qui est conforme a la raison.", targetKanji: ["道", "理"] },
  { word: "原理", meanings: ["Principe"], readings: ["げんり"], mnemonicFr: "PRINCIPE - loi fondamentale.", targetKanji: ["原", "理"] },
  { word: "心理", meanings: ["Psychologie"], readings: ["しんり"], mnemonicFr: "PSYCHOLOGIE - etude de l'esprit humain.", targetKanji: ["心", "理"] },
  { word: "心理学", meanings: ["Psychologie (discipline)"], readings: ["しんりがく"], mnemonicFr: "PSYCHOLOGIE - science du comportement.", targetKanji: ["心", "理", "学"] },

  // 分析 (Analysis) family
  { word: "分析", meanings: ["Analyse"], readings: ["ぶんせき"], mnemonicFr: "ANALYSE - decomposer pour comprendre.", targetKanji: ["分", "析"] },
  { word: "分類", meanings: ["Classification"], readings: ["ぶんるい"], mnemonicFr: "CLASSIFICATION - organiser par categories.", targetKanji: ["分", "類"] },
  { word: "分野", meanings: ["Domaine", "Champ"], readings: ["ぶんや"], mnemonicFr: "DOMAINE - secteur d'activite ou d'etude.", targetKanji: ["分", "野"] },
  { word: "分解", meanings: ["Decomposition"], readings: ["ぶんかい"], mnemonicFr: "DECOMPOSITION - separer en elements.", targetKanji: ["分", "解"] },
  { word: "分子", meanings: ["Molecule"], readings: ["ぶんし"], mnemonicFr: "MOLECULE - plus petite unite d'une substance.", targetKanji: ["分", "子"] },
  { word: "分配", meanings: ["Distribution", "Repartition"], readings: ["ぶんぱい"], mnemonicFr: "DISTRIBUTION - partager entre plusieurs.", targetKanji: ["分", "配"] },

  // 発見 (Discovery) family
  { word: "発見", meanings: ["Decouverte"], readings: ["はっけん"], mnemonicFr: "DECOUVERTE - trouver quelque chose de nouveau.", targetKanji: ["発", "見"] },
  { word: "発明", meanings: ["Invention"], readings: ["はつめい"], mnemonicFr: "INVENTION - creer quelque chose de nouveau.", targetKanji: ["発", "明"] },
  { word: "発明家", meanings: ["Inventeur"], readings: ["はつめいか"], mnemonicFr: "INVENTEUR - celui qui cree des inventions.", targetKanji: ["発", "明", "家"] },
  { word: "発展", meanings: ["Developpement", "Expansion"], readings: ["はってん"], mnemonicFr: "DEVELOPPEMENT - croissance et progres.", targetKanji: ["発", "展"] },
  { word: "発達", meanings: ["Developpement", "Progression"], readings: ["はったつ"], mnemonicFr: "DEVELOPPEMENT - evolution vers la maturite.", targetKanji: ["発", "達"] },
  { word: "発表", meanings: ["Presentation", "Annonce"], readings: ["はっぴょう"], mnemonicFr: "PRESENTATION - rendre public ses travaux.", targetKanji: ["発", "表"] },
  { word: "発生", meanings: ["Apparition", "Genese"], readings: ["はっせい"], mnemonicFr: "APPARITION - commencement d'un phenomene.", targetKanji: ["発", "生"] },
  { word: "発想", meanings: ["Idee", "Conception"], readings: ["はっそう"], mnemonicFr: "IDEE - pensee creatrice originale.", targetKanji: ["発", "想"] },
];

// Part 2: Technology and Engineering vocabulary
const vocabPart2 = [
  // 技術 (Technology) family
  { word: "技術", meanings: ["Technique", "Technologie"], readings: ["ぎじゅつ"], mnemonicFr: "TECHNOLOGIE - savoir-faire applique.", targetKanji: ["技", "術"] },
  { word: "技術者", meanings: ["Technicien", "Ingenieur"], readings: ["ぎじゅつしゃ"], mnemonicFr: "TECHNICIEN - expert en techniques.", targetKanji: ["技", "術", "者"] },
  { word: "技術的", meanings: ["Technique (adj.)"], readings: ["ぎじゅつてき"], mnemonicFr: "TECHNIQUE - relatif a la technologie.", targetKanji: ["技", "術", "的"] },
  { word: "技能", meanings: ["Competence", "Habilete"], readings: ["ぎのう"], mnemonicFr: "COMPETENCE - capacite a faire quelque chose.", targetKanji: ["技", "能"] },
  { word: "工学", meanings: ["Ingenierie"], readings: ["こうがく"], mnemonicFr: "INGENIERIE - science de la construction.", targetKanji: ["工", "学"] },
  { word: "工業", meanings: ["Industrie"], readings: ["こうぎょう"], mnemonicFr: "INDUSTRIE - production de biens.", targetKanji: ["工", "業"] },
  { word: "工場", meanings: ["Usine"], readings: ["こうじょう"], mnemonicFr: "USINE - lieu de fabrication.", targetKanji: ["工", "場"] },

  // 構造 (Structure) family
  { word: "構造", meanings: ["Structure"], readings: ["こうぞう"], mnemonicFr: "STRUCTURE - organisation interne.", targetKanji: ["構", "造"] },
  { word: "構成", meanings: ["Composition", "Constitution"], readings: ["こうせい"], mnemonicFr: "COMPOSITION - elements qui forment un ensemble.", targetKanji: ["構", "成"] },
  { word: "構想", meanings: ["Conception", "Plan"], readings: ["こうそう"], mnemonicFr: "CONCEPTION - idee generale d'un projet.", targetKanji: ["構", "想"] },
  { word: "機構", meanings: ["Mecanisme", "Organisation"], readings: ["きこう"], mnemonicFr: "MECANISME - systeme organise.", targetKanji: ["機", "構"] },
  { word: "機能", meanings: ["Fonction"], readings: ["きのう"], mnemonicFr: "FONCTION - role dans un systeme.", targetKanji: ["機", "能"] },
  { word: "機会", meanings: ["Occasion", "Opportunite"], readings: ["きかい"], mnemonicFr: "OCCASION - moment favorable.", targetKanji: ["機", "会"] },
  { word: "機械", meanings: ["Machine"], readings: ["きかい"], mnemonicFr: "MACHINE - appareil mecanique.", targetKanji: ["機", "械"] },

  // 原因 (Cause) family
  { word: "原因", meanings: ["Cause"], readings: ["げんいん"], mnemonicFr: "CAUSE - ce qui provoque un effet.", targetKanji: ["原", "因"] },
  { word: "結果", meanings: ["Resultat", "Consequence"], readings: ["けっか"], mnemonicFr: "RESULTAT - effet d'une cause.", targetKanji: ["結", "果"] },
  { word: "効果", meanings: ["Effet", "Efficacite"], readings: ["こうか"], mnemonicFr: "EFFET - resultat d'une action.", targetKanji: ["効", "果"] },
  { word: "効果的", meanings: ["Efficace"], readings: ["こうかてき"], mnemonicFr: "EFFICACE - qui produit l'effet voulu.", targetKanji: ["効", "果", "的"] },
  { word: "影響", meanings: ["Influence", "Impact"], readings: ["えいきょう"], mnemonicFr: "INFLUENCE - effet sur quelque chose.", targetKanji: ["影", "響"] },
  { word: "影響力", meanings: ["Pouvoir d'influence"], readings: ["えいきょうりょく"], mnemonicFr: "POUVOIR D'INFLUENCE - capacite a influencer.", targetKanji: ["影", "響", "力"] },
  { word: "要因", meanings: ["Facteur", "Cause"], readings: ["よういん"], mnemonicFr: "FACTEUR - element contribuant a un resultat.", targetKanji: ["要", "因"] },

  // 調査 (Survey) family
  { word: "調査", meanings: ["Enquete", "Investigation"], readings: ["ちょうさ"], mnemonicFr: "ENQUETE - recherche systematique.", targetKanji: ["調", "査"] },
  { word: "調整", meanings: ["Ajustement", "Regulation"], readings: ["ちょうせい"], mnemonicFr: "AJUSTEMENT - adapter pour equilibrer.", targetKanji: ["調", "整"] },
  { word: "調子", meanings: ["Etat", "Condition"], readings: ["ちょうし"], mnemonicFr: "ETAT - condition actuelle.", targetKanji: ["調", "子"] },
  { word: "調節", meanings: ["Regulation", "Controle"], readings: ["ちょうせつ"], mnemonicFr: "REGULATION - controler pour maintenir.", targetKanji: ["調", "節"] },
  { word: "調和", meanings: ["Harmonie"], readings: ["ちょうわ"], mnemonicFr: "HARMONIE - equilibre agreable.", targetKanji: ["調", "和"] },

  // 観察 (Observation) family
  { word: "観察", meanings: ["Observation"], readings: ["かんさつ"], mnemonicFr: "OBSERVATION - regarder attentivement.", targetKanji: ["観", "察"] },
  { word: "観察力", meanings: ["Sens de l'observation"], readings: ["かんさつりょく"], mnemonicFr: "SENS DE L'OBSERVATION - capacite a observer.", targetKanji: ["観", "察", "力"] },
  { word: "観点", meanings: ["Point de vue"], readings: ["かんてん"], mnemonicFr: "POINT DE VUE - angle d'analyse.", targetKanji: ["観", "点"] },
  { word: "観光", meanings: ["Tourisme"], readings: ["かんこう"], mnemonicFr: "TOURISME - visiter des lieux.", targetKanji: ["観", "光"] },
  { word: "観客", meanings: ["Spectateur"], readings: ["かんきゃく"], mnemonicFr: "SPECTATEUR - celui qui regarde.", targetKanji: ["観", "客"] },
  { word: "観念", meanings: ["Notion", "Concept"], readings: ["かんねん"], mnemonicFr: "NOTION - idee abstraite.", targetKanji: ["観", "念"] },

  // 証明 (Proof) family
  { word: "証明", meanings: ["Preuve", "Demonstration"], readings: ["しょうめい"], mnemonicFr: "PREUVE - demontrer la verite.", targetKanji: ["証", "明"] },
  { word: "証拠", meanings: ["Preuve", "Evidence"], readings: ["しょうこ"], mnemonicFr: "PREUVE - element qui prouve.", targetKanji: ["証", "拠"] },
  { word: "証人", meanings: ["Temoin"], readings: ["しょうにん"], mnemonicFr: "TEMOIN - personne qui atteste.", targetKanji: ["証", "人"] },
  { word: "証書", meanings: ["Certificat"], readings: ["しょうしょ"], mnemonicFr: "CERTIFICAT - document officiel.", targetKanji: ["証", "書"] },
  { word: "保証", meanings: ["Garantie"], readings: ["ほしょう"], mnemonicFr: "GARANTIE - assurance donnee.", targetKanji: ["保", "証"] },
];

// Part 3: Academic and Educational vocabulary
const vocabPart3 = [
  // 学 (Study) family
  { word: "学問", meanings: ["Etude", "Savoir"], readings: ["がくもん"], mnemonicFr: "SAVOIR - connaissance academique.", targetKanji: ["学", "問"] },
  { word: "学者", meanings: ["Savant", "Erudit"], readings: ["がくしゃ"], mnemonicFr: "SAVANT - personne de grande connaissance.", targetKanji: ["学", "者"] },
  { word: "学説", meanings: ["Theorie academique"], readings: ["がくせつ"], mnemonicFr: "THEORIE - hypothese scientifique.", targetKanji: ["学", "説"] },
  { word: "学会", meanings: ["Societe savante", "Conference"], readings: ["がっかい"], mnemonicFr: "SOCIETE SAVANTE - reunion de chercheurs.", targetKanji: ["学", "会"] },
  { word: "学位", meanings: ["Diplome", "Grade universitaire"], readings: ["がくい"], mnemonicFr: "DIPLOME - titre academique.", targetKanji: ["学", "位"] },
  { word: "学期", meanings: ["Semestre"], readings: ["がっき"], mnemonicFr: "SEMESTRE - periode scolaire.", targetKanji: ["学", "期"] },
  { word: "学科", meanings: ["Departement", "Discipline"], readings: ["がっか"], mnemonicFr: "DISCIPLINE - domaine d'etude.", targetKanji: ["学", "科"] },
  { word: "学部", meanings: ["Faculte"], readings: ["がくぶ"], mnemonicFr: "FACULTE - division universitaire.", targetKanji: ["学", "部"] },

  // 教 (Teaching) family
  { word: "教授", meanings: ["Professeur"], readings: ["きょうじゅ"], mnemonicFr: "PROFESSEUR - enseignant universitaire.", targetKanji: ["教", "授"] },
  { word: "教育", meanings: ["Education"], readings: ["きょういく"], mnemonicFr: "EDUCATION - formation des esprits.", targetKanji: ["教", "育"] },
  { word: "教育的", meanings: ["Educatif"], readings: ["きょういくてき"], mnemonicFr: "EDUCATIF - relatif a l'education.", targetKanji: ["教", "育", "的"] },
  { word: "教科書", meanings: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "MANUEL - livre d'etude.", targetKanji: ["教", "科", "書"] },
  { word: "教室", meanings: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "SALLE DE CLASSE - lieu d'enseignement.", targetKanji: ["教", "室"] },
  { word: "教師", meanings: ["Enseignant"], readings: ["きょうし"], mnemonicFr: "ENSEIGNANT - personne qui enseigne.", targetKanji: ["教", "師"] },
  { word: "教養", meanings: ["Culture generale"], readings: ["きょうよう"], mnemonicFr: "CULTURE GENERALE - savoir etendu.", targetKanji: ["教", "養"] },

  // 論 (Argument) family
  { word: "論文", meanings: ["These", "Article"], readings: ["ろんぶん"], mnemonicFr: "THESE - texte academique.", targetKanji: ["論", "文"] },
  { word: "論理", meanings: ["Logique"], readings: ["ろんり"], mnemonicFr: "LOGIQUE - raisonnement coherent.", targetKanji: ["論", "理"] },
  { word: "論理的", meanings: ["Logique (adj.)"], readings: ["ろんりてき"], mnemonicFr: "LOGIQUE - conforme a la raison.", targetKanji: ["論", "理", "的"] },
  { word: "論点", meanings: ["Point d'argumentation"], readings: ["ろんてん"], mnemonicFr: "POINT - element du debat.", targetKanji: ["論", "点"] },
  { word: "論争", meanings: ["Controverse", "Debat"], readings: ["ろんそう"], mnemonicFr: "CONTROVERSE - discussion animee.", targetKanji: ["論", "争"] },
  { word: "議論", meanings: ["Debat", "Discussion"], readings: ["ぎろん"], mnemonicFr: "DEBAT - echange d'arguments.", targetKanji: ["議", "論"] },
  { word: "結論", meanings: ["Conclusion"], readings: ["けつろん"], mnemonicFr: "CONCLUSION - point final d'un raisonnement.", targetKanji: ["結", "論"] },

  // 説 (Explain) family
  { word: "説明", meanings: ["Explication"], readings: ["せつめい"], mnemonicFr: "EXPLICATION - rendre clair.", targetKanji: ["説", "明"] },
  { word: "説明書", meanings: ["Mode d'emploi"], readings: ["せつめいしょ"], mnemonicFr: "MODE D'EMPLOI - instructions ecrites.", targetKanji: ["説", "明", "書"] },
  { word: "仮説", meanings: ["Hypothese"], readings: ["かせつ"], mnemonicFr: "HYPOTHESE - supposition a verifier.", targetKanji: ["仮", "説"] },
  { word: "小説", meanings: ["Roman"], readings: ["しょうせつ"], mnemonicFr: "ROMAN - oeuvre de fiction.", targetKanji: ["小", "説"] },
  { word: "小説家", meanings: ["Romancier"], readings: ["しょうせつか"], mnemonicFr: "ROMANCIER - auteur de romans.", targetKanji: ["小", "説", "家"] },

  // 法 (Method) family
  { word: "方法", meanings: ["Methode"], readings: ["ほうほう"], mnemonicFr: "METHODE - maniere de proceder.", targetKanji: ["方", "法"] },
  { word: "法則", meanings: ["Loi", "Regle"], readings: ["ほうそく"], mnemonicFr: "LOI - principe scientifique.", targetKanji: ["法", "則"] },
  { word: "文法", meanings: ["Grammaire"], readings: ["ぶんぽう"], mnemonicFr: "GRAMMAIRE - regles de la langue.", targetKanji: ["文", "法"] },
  { word: "手法", meanings: ["Technique", "Procede"], readings: ["しゅほう"], mnemonicFr: "TECHNIQUE - facon de faire.", targetKanji: ["手", "法"] },
  { word: "作法", meanings: ["Etiquette", "Manieres"], readings: ["さほう"], mnemonicFr: "ETIQUETTE - regles de conduite.", targetKanji: ["作", "法"] },
];

// Part 4: Philosophy and Thought vocabulary
const vocabPart4 = [
  // 思想 (Thought) family
  { word: "思想", meanings: ["Pensee", "Ideologie"], readings: ["しそう"], mnemonicFr: "PENSEE - systeme d'idees.", targetKanji: ["思", "想"] },
  { word: "思想家", meanings: ["Penseur"], readings: ["しそうか"], mnemonicFr: "PENSEUR - philosophe, intellectuel.", targetKanji: ["思", "想", "家"] },
  { word: "思考", meanings: ["Reflexion", "Pensee"], readings: ["しこう"], mnemonicFr: "REFLEXION - activite de l'esprit.", targetKanji: ["思", "考"] },
  { word: "思考力", meanings: ["Capacite de reflexion"], readings: ["しこうりょく"], mnemonicFr: "CAPACITE DE REFLEXION - aptitude a penser.", targetKanji: ["思", "考", "力"] },
  { word: "考え", meanings: ["Idee", "Opinion"], readings: ["かんがえ"], mnemonicFr: "IDEE - ce qu'on pense.", targetKanji: ["考"] },
  { word: "考える", meanings: ["Penser", "Reflechir"], readings: ["かんがえる"], mnemonicFr: "PENSER - utiliser son esprit.", targetKanji: ["考"] },
  { word: "考案", meanings: ["Conception", "Idee"], readings: ["こうあん"], mnemonicFr: "CONCEPTION - inventer une idee.", targetKanji: ["考", "案"] },
  { word: "考察", meanings: ["Examen", "Analyse"], readings: ["こうさつ"], mnemonicFr: "EXAMEN - etudier attentivement.", targetKanji: ["考", "察"] },

  // 哲学 (Philosophy) family
  { word: "哲学", meanings: ["Philosophie"], readings: ["てつがく"], mnemonicFr: "PHILOSOPHIE - amour de la sagesse.", targetKanji: ["哲", "学"] },
  { word: "哲学者", meanings: ["Philosophe"], readings: ["てつがくしゃ"], mnemonicFr: "PHILOSOPHE - penseur de la sagesse.", targetKanji: ["哲", "学", "者"] },
  { word: "哲学的", meanings: ["Philosophique"], readings: ["てつがくてき"], mnemonicFr: "PHILOSOPHIQUE - relatif a la philosophie.", targetKanji: ["哲", "学", "的"] },

  // 概念 (Concept) family
  { word: "概念", meanings: ["Concept", "Notion"], readings: ["がいねん"], mnemonicFr: "CONCEPT - idee abstraite.", targetKanji: ["概", "念"] },
  { word: "概要", meanings: ["Resume", "Apercu"], readings: ["がいよう"], mnemonicFr: "RESUME - vue d'ensemble.", targetKanji: ["概", "要"] },
  { word: "念", meanings: ["Idee", "Pensee"], readings: ["ねん"], mnemonicFr: "IDEE - pensee dans l'esprit.", targetKanji: ["念"] },
  { word: "信念", meanings: ["Conviction"], readings: ["しんねん"], mnemonicFr: "CONVICTION - croyance forte.", targetKanji: ["信", "念"] },
  { word: "理念", meanings: ["Ideal", "Philosophie"], readings: ["りねん"], mnemonicFr: "IDEAL - principe directeur.", targetKanji: ["理", "念"] },

  // 意 (Meaning) family
  { word: "意味", meanings: ["Sens", "Signification"], readings: ["いみ"], mnemonicFr: "SENS - signification d'un mot.", targetKanji: ["意", "味"] },
  { word: "意識", meanings: ["Conscience"], readings: ["いしき"], mnemonicFr: "CONSCIENCE - etat d'eveil mental.", targetKanji: ["意", "識"] },
  { word: "意見", meanings: ["Opinion", "Avis"], readings: ["いけん"], mnemonicFr: "OPINION - point de vue personnel.", targetKanji: ["意", "見"] },
  { word: "意図", meanings: ["Intention"], readings: ["いと"], mnemonicFr: "INTENTION - but vise.", targetKanji: ["意", "図"] },
  { word: "意志", meanings: ["Volonte"], readings: ["いし"], mnemonicFr: "VOLONTE - determination mentale.", targetKanji: ["意", "志"] },
  { word: "意欲", meanings: ["Motivation", "Desir"], readings: ["いよく"], mnemonicFr: "MOTIVATION - envie d'agir.", targetKanji: ["意", "欲"] },
  { word: "注意", meanings: ["Attention"], readings: ["ちゅうい"], mnemonicFr: "ATTENTION - concentration de l'esprit.", targetKanji: ["注", "意"] },
  { word: "用意", meanings: ["Preparation"], readings: ["ようい"], mnemonicFr: "PREPARATION - se tenir pret.", targetKanji: ["用", "意"] },

  // 知 (Knowledge) family
  { word: "知識", meanings: ["Connaissance"], readings: ["ちしき"], mnemonicFr: "CONNAISSANCE - ce qu'on sait.", targetKanji: ["知", "識"] },
  { word: "知性", meanings: ["Intelligence", "Intellect"], readings: ["ちせい"], mnemonicFr: "INTELLIGENCE - faculte de comprendre.", targetKanji: ["知", "性"] },
  { word: "知的", meanings: ["Intellectuel"], readings: ["ちてき"], mnemonicFr: "INTELLECTUEL - relatif a l'esprit.", targetKanji: ["知", "的"] },
  { word: "知恵", meanings: ["Sagesse"], readings: ["ちえ"], mnemonicFr: "SAGESSE - intelligence pratique.", targetKanji: ["知", "恵"] },
  { word: "認識", meanings: ["Reconnaissance", "Perception"], readings: ["にんしき"], mnemonicFr: "PERCEPTION - prise de conscience.", targetKanji: ["認", "識"] },
  { word: "常識", meanings: ["Bon sens"], readings: ["じょうしき"], mnemonicFr: "BON SENS - sagesse commune.", targetKanji: ["常", "識"] },

  // 真 (Truth) family
  { word: "真理", meanings: ["Verite"], readings: ["しんり"], mnemonicFr: "VERITE - ce qui est vrai.", targetKanji: ["真", "理"] },
  { word: "真実", meanings: ["Realite", "Fait"], readings: ["しんじつ"], mnemonicFr: "REALITE - ce qui est reel.", targetKanji: ["真", "実"] },
  { word: "真相", meanings: ["Verite des faits"], readings: ["しんそう"], mnemonicFr: "VERITE - realite d'une situation.", targetKanji: ["真", "相"] },
  { word: "写真", meanings: ["Photo"], readings: ["しゃしん"], mnemonicFr: "PHOTO - image de la realite.", targetKanji: ["写", "真"] },
];

// Part 5: History and Society vocabulary
const vocabPart5 = [
  // 歴史 (History) family
  { word: "歴史", meanings: ["Histoire"], readings: ["れきし"], mnemonicFr: "HISTOIRE - recit du passe.", targetKanji: ["歴", "史"] },
  { word: "歴史的", meanings: ["Historique"], readings: ["れきしてき"], mnemonicFr: "HISTORIQUE - relatif a l'histoire.", targetKanji: ["歴", "史", "的"] },
  { word: "歴史家", meanings: ["Historien"], readings: ["れきしか"], mnemonicFr: "HISTORIEN - specialiste de l'histoire.", targetKanji: ["歴", "史", "家"] },
  { word: "史料", meanings: ["Document historique"], readings: ["しりょう"], mnemonicFr: "DOCUMENT - source historique.", targetKanji: ["史", "料"] },

  // 社会 (Society) family
  { word: "社会", meanings: ["Societe"], readings: ["しゃかい"], mnemonicFr: "SOCIETE - communaute humaine.", targetKanji: ["社", "会"] },
  { word: "社会的", meanings: ["Social"], readings: ["しゃかいてき"], mnemonicFr: "SOCIAL - relatif a la societe.", targetKanji: ["社", "会", "的"] },
  { word: "社会学", meanings: ["Sociologie"], readings: ["しゃかいがく"], mnemonicFr: "SOCIOLOGIE - etude de la societe.", targetKanji: ["社", "会", "学"] },
  { word: "社会科学", meanings: ["Sciences sociales"], readings: ["しゃかいかがく"], mnemonicFr: "SCIENCES SOCIALES - etude des societes.", targetKanji: ["社", "会", "科", "学"] },

  // 経済 (Economy) family
  { word: "経済", meanings: ["Economie"], readings: ["けいざい"], mnemonicFr: "ECONOMIE - systeme de production.", targetKanji: ["経", "済"] },
  { word: "経済的", meanings: ["Economique"], readings: ["けいざいてき"], mnemonicFr: "ECONOMIQUE - relatif a l'economie.", targetKanji: ["経", "済", "的"] },
  { word: "経済学", meanings: ["Sciences economiques"], readings: ["けいざいがく"], mnemonicFr: "SCIENCES ECONOMIQUES - etude de l'economie.", targetKanji: ["経", "済", "学"] },
  { word: "経験", meanings: ["Experience"], readings: ["けいけん"], mnemonicFr: "EXPERIENCE - vecu personnel.", targetKanji: ["経", "験"] },
  { word: "経過", meanings: ["Deroulement", "Progression"], readings: ["けいか"], mnemonicFr: "DEROULEMENT - evolution dans le temps.", targetKanji: ["経", "過"] },

  // 政治 (Politics) family
  { word: "政治", meanings: ["Politique"], readings: ["せいじ"], mnemonicFr: "POLITIQUE - gestion de l'Etat.", targetKanji: ["政", "治"] },
  { word: "政治的", meanings: ["Politique (adj.)"], readings: ["せいじてき"], mnemonicFr: "POLITIQUE - relatif au gouvernement.", targetKanji: ["政", "治", "的"] },
  { word: "政治家", meanings: ["Homme politique"], readings: ["せいじか"], mnemonicFr: "HOMME POLITIQUE - acteur de la politique.", targetKanji: ["政", "治", "家"] },
  { word: "政治学", meanings: ["Sciences politiques"], readings: ["せいじがく"], mnemonicFr: "SCIENCES POLITIQUES - etude du pouvoir.", targetKanji: ["政", "治", "学"] },
  { word: "政府", meanings: ["Gouvernement"], readings: ["せいふ"], mnemonicFr: "GOUVERNEMENT - organisme dirigeant.", targetKanji: ["政", "府"] },
  { word: "政策", meanings: ["Politique", "Mesures"], readings: ["せいさく"], mnemonicFr: "POLITIQUE - ensemble de mesures.", targetKanji: ["政", "策"] },

  // 文化 (Culture) family
  { word: "文化", meanings: ["Culture"], readings: ["ぶんか"], mnemonicFr: "CULTURE - heritage d'une civilisation.", targetKanji: ["文", "化"] },
  { word: "文化的", meanings: ["Culturel"], readings: ["ぶんかてき"], mnemonicFr: "CULTUREL - relatif a la culture.", targetKanji: ["文", "化", "的"] },
  { word: "文明", meanings: ["Civilisation"], readings: ["ぶんめい"], mnemonicFr: "CIVILISATION - societe avancee.", targetKanji: ["文", "明"] },
  { word: "文学", meanings: ["Litterature"], readings: ["ぶんがく"], mnemonicFr: "LITTERATURE - art de l'ecriture.", targetKanji: ["文", "学"] },
  { word: "文章", meanings: ["Texte", "Redaction"], readings: ["ぶんしょう"], mnemonicFr: "TEXTE - ecrit structure.", targetKanji: ["文", "章"] },

  // 民 (People) family
  { word: "国民", meanings: ["Citoyens", "Peuple"], readings: ["こくみん"], mnemonicFr: "CITOYENS - peuple d'un pays.", targetKanji: ["国", "民"] },
  { word: "市民", meanings: ["Citadin"], readings: ["しみん"], mnemonicFr: "CITADIN - habitant d'une ville.", targetKanji: ["市", "民"] },
  { word: "民族", meanings: ["Ethnie", "Peuple"], readings: ["みんぞく"], mnemonicFr: "ETHNIE - groupe culturel.", targetKanji: ["民", "族"] },
  { word: "民主", meanings: ["Democratie"], readings: ["みんしゅ"], mnemonicFr: "DEMOCRATIE - pouvoir du peuple.", targetKanji: ["民", "主"] },
  { word: "民主主義", meanings: ["Democratie (ideologie)"], readings: ["みんしゅしゅぎ"], mnemonicFr: "DEMOCRATIE - systeme politique.", targetKanji: ["民", "主", "主", "義"] },
];

// Part 6: Mathematics and Logic vocabulary
const vocabPart6 = [
  // 数 (Number) family
  { word: "数", meanings: ["Nombre"], readings: ["かず"], mnemonicFr: "NOMBRE - quantite.", targetKanji: ["数"] },
  { word: "数字", meanings: ["Chiffre"], readings: ["すうじ"], mnemonicFr: "CHIFFRE - symbole numerique.", targetKanji: ["数", "字"] },
  { word: "数量", meanings: ["Quantite"], readings: ["すうりょう"], mnemonicFr: "QUANTITE - mesure numerique.", targetKanji: ["数", "量"] },
  { word: "数式", meanings: ["Formule mathematique"], readings: ["すうしき"], mnemonicFr: "FORMULE - expression mathematique.", targetKanji: ["数", "式"] },
  { word: "少数", meanings: ["Minorite", "Nombre decimal"], readings: ["しょうすう"], mnemonicFr: "MINORITE - petit nombre.", targetKanji: ["少", "数"] },
  { word: "多数", meanings: ["Majorite"], readings: ["たすう"], mnemonicFr: "MAJORITE - grand nombre.", targetKanji: ["多", "数"] },

  // 計算 (Calculation) family
  { word: "計算", meanings: ["Calcul"], readings: ["けいさん"], mnemonicFr: "CALCUL - operation mathematique.", targetKanji: ["計", "算"] },
  { word: "計算機", meanings: ["Calculatrice"], readings: ["けいさんき"], mnemonicFr: "CALCULATRICE - machine a calculer.", targetKanji: ["計", "算", "機"] },
  { word: "計画", meanings: ["Plan", "Projet"], readings: ["けいかく"], mnemonicFr: "PLAN - projet organise.", targetKanji: ["計", "画"] },
  { word: "計画的", meanings: ["Planifie"], readings: ["けいかくてき"], mnemonicFr: "PLANIFIE - fait selon un plan.", targetKanji: ["計", "画", "的"] },
  { word: "設計", meanings: ["Conception", "Design"], readings: ["せっけい"], mnemonicFr: "CONCEPTION - planification technique.", targetKanji: ["設", "計"] },
  { word: "統計", meanings: ["Statistiques"], readings: ["とうけい"], mnemonicFr: "STATISTIQUES - donnees numeriques.", targetKanji: ["統", "計"] },
  { word: "統計学", meanings: ["Statistique (discipline)"], readings: ["とうけいがく"], mnemonicFr: "STATISTIQUE - science des donnees.", targetKanji: ["統", "計", "学"] },

  // 式 (Formula) family
  { word: "公式", meanings: ["Formule officielle"], readings: ["こうしき"], mnemonicFr: "FORMULE - expression standard.", targetKanji: ["公", "式"] },
  { word: "方程式", meanings: ["Equation"], readings: ["ほうていしき"], mnemonicFr: "EQUATION - egalite mathematique.", targetKanji: ["方", "程", "式"] },
  { word: "形式", meanings: ["Forme", "Format"], readings: ["けいしき"], mnemonicFr: "FORME - structure externe.", targetKanji: ["形", "式"] },
  { word: "形式的", meanings: ["Formel"], readings: ["けいしきてき"], mnemonicFr: "FORMEL - selon les regles.", targetKanji: ["形", "式", "的"] },

  // 比 (Ratio) family
  { word: "比較", meanings: ["Comparaison"], readings: ["ひかく"], mnemonicFr: "COMPARAISON - mettre en parallele.", targetKanji: ["比", "較"] },
  { word: "比較的", meanings: ["Relativement"], readings: ["ひかくてき"], mnemonicFr: "RELATIVEMENT - par comparaison.", targetKanji: ["比", "較", "的"] },
  { word: "比率", meanings: ["Ratio", "Taux"], readings: ["ひりつ"], mnemonicFr: "RATIO - proportion.", targetKanji: ["比", "率"] },
  { word: "比例", meanings: ["Proportion"], readings: ["ひれい"], mnemonicFr: "PROPORTION - rapport constant.", targetKanji: ["比", "例"] },

  // 量 (Quantity) family
  { word: "量", meanings: ["Quantite"], readings: ["りょう"], mnemonicFr: "QUANTITE - mesure.", targetKanji: ["量"] },
  { word: "大量", meanings: ["Grande quantite"], readings: ["たいりょう"], mnemonicFr: "GRANDE QUANTITE - beaucoup.", targetKanji: ["大", "量"] },
  { word: "少量", meanings: ["Petite quantite"], readings: ["しょうりょう"], mnemonicFr: "PETITE QUANTITE - peu.", targetKanji: ["少", "量"] },
  { word: "質量", meanings: ["Masse"], readings: ["しつりょう"], mnemonicFr: "MASSE - quantite de matiere.", targetKanji: ["質", "量"] },
  { word: "測量", meanings: ["Mesure", "Arpentage"], readings: ["そくりょう"], mnemonicFr: "MESURE - determiner les dimensions.", targetKanji: ["測", "量"] },
  { word: "重量", meanings: ["Poids"], readings: ["じゅうりょう"], mnemonicFr: "POIDS - mesure de la pesanteur.", targetKanji: ["重", "量"] },

  // 点 (Point) family
  { word: "点", meanings: ["Point"], readings: ["てん"], mnemonicFr: "POINT - position precise.", targetKanji: ["点"] },
  { word: "点数", meanings: ["Score"], readings: ["てんすう"], mnemonicFr: "SCORE - nombre de points.", targetKanji: ["点", "数"] },
  { word: "視点", meanings: ["Point de vue"], readings: ["してん"], mnemonicFr: "POINT DE VUE - perspective.", targetKanji: ["視", "点"] },
  { word: "焦点", meanings: ["Point focal"], readings: ["しょうてん"], mnemonicFr: "POINT FOCAL - centre d'attention.", targetKanji: ["焦", "点"] },
  { word: "頂点", meanings: ["Sommet"], readings: ["ちょうてん"], mnemonicFr: "SOMMET - point le plus haut.", targetKanji: ["頂", "点"] },
];

// Part 7: Medical and Biological vocabulary
const vocabPart7 = [
  // 医 (Medicine) family
  { word: "医学", meanings: ["Medecine"], readings: ["いがく"], mnemonicFr: "MEDECINE - science de la sante.", targetKanji: ["医", "学"] },
  { word: "医者", meanings: ["Medecin"], readings: ["いしゃ"], mnemonicFr: "MEDECIN - professionnel de sante.", targetKanji: ["医", "者"] },
  { word: "医師", meanings: ["Docteur"], readings: ["いし"], mnemonicFr: "DOCTEUR - medecin.", targetKanji: ["医", "師"] },
  { word: "医院", meanings: ["Clinique"], readings: ["いいん"], mnemonicFr: "CLINIQUE - etablissement medical.", targetKanji: ["医", "院"] },
  { word: "医療", meanings: ["Soins medicaux"], readings: ["いりょう"], mnemonicFr: "SOINS MEDICAUX - traitement medical.", targetKanji: ["医", "療"] },

  // 生物 (Biology) family
  { word: "生物", meanings: ["Etre vivant", "Biologie"], readings: ["せいぶつ"], mnemonicFr: "ETRE VIVANT - organisme.", targetKanji: ["生", "物"] },
  { word: "生物学", meanings: ["Biologie"], readings: ["せいぶつがく"], mnemonicFr: "BIOLOGIE - science du vivant.", targetKanji: ["生", "物", "学"] },
  { word: "生命", meanings: ["Vie"], readings: ["せいめい"], mnemonicFr: "VIE - etat d'un etre vivant.", targetKanji: ["生", "命"] },
  { word: "生命力", meanings: ["Vitalite"], readings: ["せいめいりょく"], mnemonicFr: "VITALITE - force vitale.", targetKanji: ["生", "命", "力"] },
  { word: "生態", meanings: ["Ecologie"], readings: ["せいたい"], mnemonicFr: "ECOLOGIE - etude des ecosystemes.", targetKanji: ["生", "態"] },
  { word: "生態系", meanings: ["Ecosysteme"], readings: ["せいたいけい"], mnemonicFr: "ECOSYSTEME - systeme ecologique.", targetKanji: ["生", "態", "系"] },

  // 細胞 (Cell) family
  { word: "細胞", meanings: ["Cellule"], readings: ["さいぼう"], mnemonicFr: "CELLULE - unite de vie.", targetKanji: ["細", "胞"] },
  { word: "細菌", meanings: ["Bacterie"], readings: ["さいきん"], mnemonicFr: "BACTERIE - micro-organisme.", targetKanji: ["細", "菌"] },
  { word: "細部", meanings: ["Detail"], readings: ["さいぶ"], mnemonicFr: "DETAIL - partie minuscule.", targetKanji: ["細", "部"] },

  // 遺伝 (Genetics) family
  { word: "遺伝", meanings: ["Heredite"], readings: ["いでん"], mnemonicFr: "HEREDITE - transmission genetique.", targetKanji: ["遺", "伝"] },
  { word: "遺伝子", meanings: ["Gene"], readings: ["いでんし"], mnemonicFr: "GENE - unite d'heredite.", targetKanji: ["遺", "伝", "子"] },

  // 病 (Disease) family
  { word: "病気", meanings: ["Maladie"], readings: ["びょうき"], mnemonicFr: "MALADIE - etat de mauvaise sante.", targetKanji: ["病", "気"] },
  { word: "病院", meanings: ["Hopital"], readings: ["びょういん"], mnemonicFr: "HOPITAL - etablissement de soins.", targetKanji: ["病", "院"] },
  { word: "病状", meanings: ["Symptomes"], readings: ["びょうじょう"], mnemonicFr: "SYMPTOMES - signes de maladie.", targetKanji: ["病", "状"] },
  { word: "疾病", meanings: ["Maladie"], readings: ["しっぺい"], mnemonicFr: "MALADIE - affection.", targetKanji: ["疾", "病"] },

  // 治療 (Treatment) family
  { word: "治療", meanings: ["Traitement"], readings: ["ちりょう"], mnemonicFr: "TRAITEMENT - soins medicaux.", targetKanji: ["治", "療"] },
  { word: "治療法", meanings: ["Methode de traitement"], readings: ["ちりょうほう"], mnemonicFr: "METHODE DE TRAITEMENT - facon de soigner.", targetKanji: ["治", "療", "法"] },
  { word: "治る", meanings: ["Guerir"], readings: ["なおる"], mnemonicFr: "GUERIR - retrouver la sante.", targetKanji: ["治"] },
  { word: "治す", meanings: ["Soigner"], readings: ["なおす"], mnemonicFr: "SOIGNER - donner des soins.", targetKanji: ["治"] },

  // 健康 (Health) family
  { word: "健康", meanings: ["Sante"], readings: ["けんこう"], mnemonicFr: "SANTE - bon etat physique.", targetKanji: ["健", "康"] },
  { word: "健康的", meanings: ["Sain"], readings: ["けんこうてき"], mnemonicFr: "SAIN - bon pour la sante.", targetKanji: ["健", "康", "的"] },
];

// Part 8: Environment and Nature vocabulary
const vocabPart8 = [
  // 環境 (Environment) family
  { word: "環境", meanings: ["Environnement"], readings: ["かんきょう"], mnemonicFr: "ENVIRONNEMENT - milieu naturel.", targetKanji: ["環", "境"] },
  { word: "環境問題", meanings: ["Probleme environnemental"], readings: ["かんきょうもんだい"], mnemonicFr: "PROBLEME ENVIRONNEMENTAL - question ecologique.", targetKanji: ["環", "境", "問", "題"] },

  // 自然 (Nature) family
  { word: "自然", meanings: ["Nature"], readings: ["しぜん"], mnemonicFr: "NATURE - monde naturel.", targetKanji: ["自", "然"] },
  { word: "自然科学", meanings: ["Sciences naturelles"], readings: ["しぜんかがく"], mnemonicFr: "SCIENCES NATURELLES - etude de la nature.", targetKanji: ["自", "然", "科", "学"] },
  { word: "天然", meanings: ["Naturel"], readings: ["てんねん"], mnemonicFr: "NATUREL - non artificiel.", targetKanji: ["天", "然"] },
  { word: "天然資源", meanings: ["Ressources naturelles"], readings: ["てんねんしげん"], mnemonicFr: "RESSOURCES NATURELLES - richesses de la nature.", targetKanji: ["天", "然", "資", "源"] },

  // 地球 (Earth) family
  { word: "地球", meanings: ["Terre (planete)"], readings: ["ちきゅう"], mnemonicFr: "TERRE - notre planete.", targetKanji: ["地", "球"] },
  { word: "地理", meanings: ["Geographie"], readings: ["ちり"], mnemonicFr: "GEOGRAPHIE - etude de la Terre.", targetKanji: ["地", "理"] },
  { word: "地理学", meanings: ["Geographie (discipline)"], readings: ["ちりがく"], mnemonicFr: "GEOGRAPHIE - science de la Terre.", targetKanji: ["地", "理", "学"] },
  { word: "地質", meanings: ["Geologie"], readings: ["ちしつ"], mnemonicFr: "GEOLOGIE - etude des roches.", targetKanji: ["地", "質"] },
  { word: "地質学", meanings: ["Geologie (discipline)"], readings: ["ちしつがく"], mnemonicFr: "GEOLOGIE - science de la Terre.", targetKanji: ["地", "質", "学"] },

  // 気候 (Climate) family
  { word: "気候", meanings: ["Climat"], readings: ["きこう"], mnemonicFr: "CLIMAT - conditions meteorologiques.", targetKanji: ["気", "候"] },
  { word: "気温", meanings: ["Temperature"], readings: ["きおん"], mnemonicFr: "TEMPERATURE - chaleur de l'air.", targetKanji: ["気", "温"] },
  { word: "大気", meanings: ["Atmosphere"], readings: ["たいき"], mnemonicFr: "ATMOSPHERE - air autour de la Terre.", targetKanji: ["大", "気"] },
  { word: "天気", meanings: ["Meteo"], readings: ["てんき"], mnemonicFr: "METEO - temps qu'il fait.", targetKanji: ["天", "気"] },

  // 水 (Water) family
  { word: "水質", meanings: ["Qualite de l'eau"], readings: ["すいしつ"], mnemonicFr: "QUALITE DE L'EAU - proprietes de l'eau.", targetKanji: ["水", "質"] },
  { word: "水分", meanings: ["Humidite"], readings: ["すいぶん"], mnemonicFr: "HUMIDITE - teneur en eau.", targetKanji: ["水", "分"] },
  { word: "水素", meanings: ["Hydrogene"], readings: ["すいそ"], mnemonicFr: "HYDROGENE - element chimique.", targetKanji: ["水", "素"] },
  { word: "海水", meanings: ["Eau de mer"], readings: ["かいすい"], mnemonicFr: "EAU DE MER - eau salee.", targetKanji: ["海", "水"] },

  // 資源 (Resources) family
  { word: "資源", meanings: ["Ressources"], readings: ["しげん"], mnemonicFr: "RESSOURCES - richesses disponibles.", targetKanji: ["資", "源"] },
  { word: "資料", meanings: ["Documents", "Materiaux"], readings: ["しりょう"], mnemonicFr: "DOCUMENTS - informations ecrites.", targetKanji: ["資", "料"] },
  { word: "資金", meanings: ["Fonds", "Capital"], readings: ["しきん"], mnemonicFr: "FONDS - argent disponible.", targetKanji: ["資", "金"] },
  { word: "資本", meanings: ["Capital"], readings: ["しほん"], mnemonicFr: "CAPITAL - richesse economique.", targetKanji: ["資", "本"] },

  // エネルギー related
  { word: "電力", meanings: ["Electricite"], readings: ["でんりょく"], mnemonicFr: "ELECTRICITE - energie electrique.", targetKanji: ["電", "力"] },
  { word: "原子力", meanings: ["Energie nucleaire"], readings: ["げんしりょく"], mnemonicFr: "ENERGIE NUCLEAIRE - puissance de l'atome.", targetKanji: ["原", "子", "力"] },
  { word: "太陽光", meanings: ["Lumiere solaire"], readings: ["たいようこう"], mnemonicFr: "LUMIERE SOLAIRE - energie du soleil.", targetKanji: ["太", "陽", "光"] },
];

// Part 9: Information and Communication vocabulary
const vocabPart9 = [
  // 情報 (Information) family
  { word: "情報", meanings: ["Information"], readings: ["じょうほう"], mnemonicFr: "INFORMATION - donnees utiles.", targetKanji: ["情", "報"] },
  { word: "情報化", meanings: ["Informatisation"], readings: ["じょうほうか"], mnemonicFr: "INFORMATISATION - passage au numerique.", targetKanji: ["情", "報", "化"] },
  { word: "情報学", meanings: ["Informatique"], readings: ["じょうほうがく"], mnemonicFr: "INFORMATIQUE - science de l'information.", targetKanji: ["情", "報", "学"] },

  // 通信 (Communication) family
  { word: "通信", meanings: ["Communication"], readings: ["つうしん"], mnemonicFr: "COMMUNICATION - transmission d'information.", targetKanji: ["通", "信"] },
  { word: "通知", meanings: ["Notification"], readings: ["つうち"], mnemonicFr: "NOTIFICATION - avis informe.", targetKanji: ["通", "知"] },
  { word: "交通", meanings: ["Circulation", "Transport"], readings: ["こうつう"], mnemonicFr: "CIRCULATION - mouvement des vehicules.", targetKanji: ["交", "通"] },

  // 報告 (Report) family
  { word: "報告", meanings: ["Rapport"], readings: ["ほうこく"], mnemonicFr: "RAPPORT - compte rendu.", targetKanji: ["報", "告"] },
  { word: "報告書", meanings: ["Rapport ecrit"], readings: ["ほうこくしょ"], mnemonicFr: "RAPPORT ECRIT - document de compte rendu.", targetKanji: ["報", "告", "書"] },
  { word: "報道", meanings: ["Reportage"], readings: ["ほうどう"], mnemonicFr: "REPORTAGE - information mediatique.", targetKanji: ["報", "道"] },
  { word: "広報", meanings: ["Relations publiques"], readings: ["こうほう"], mnemonicFr: "RELATIONS PUBLIQUES - communication officielle.", targetKanji: ["広", "報"] },

  // 記録 (Record) family
  { word: "記録", meanings: ["Enregistrement"], readings: ["きろく"], mnemonicFr: "ENREGISTREMENT - conservation des donnees.", targetKanji: ["記", "録"] },
  { word: "記事", meanings: ["Article"], readings: ["きじ"], mnemonicFr: "ARTICLE - texte de journal.", targetKanji: ["記", "事"] },
  { word: "記憶", meanings: ["Memoire"], readings: ["きおく"], mnemonicFr: "MEMOIRE - capacite de se souvenir.", targetKanji: ["記", "憶"] },
  { word: "記号", meanings: ["Symbole"], readings: ["きごう"], mnemonicFr: "SYMBOLE - signe representatif.", targetKanji: ["記", "号"] },
  { word: "日記", meanings: ["Journal intime"], readings: ["にっき"], mnemonicFr: "JOURNAL INTIME - notes quotidiennes.", targetKanji: ["日", "記"] },

  // 出版 (Publishing) family
  { word: "出版", meanings: ["Edition"], readings: ["しゅっぱん"], mnemonicFr: "EDITION - publication de livres.", targetKanji: ["出", "版"] },
  { word: "出版社", meanings: ["Maison d'edition"], readings: ["しゅっぱんしゃ"], mnemonicFr: "MAISON D'EDITION - entreprise editoriale.", targetKanji: ["出", "版", "社"] },

  // 放送 (Broadcasting) family
  { word: "放送", meanings: ["Diffusion"], readings: ["ほうそう"], mnemonicFr: "DIFFUSION - transmission mediatique.", targetKanji: ["放", "送"] },
  { word: "放送局", meanings: ["Station de radio/TV"], readings: ["ほうそうきょく"], mnemonicFr: "STATION - lieu de diffusion.", targetKanji: ["放", "送", "局"] },

  // 新聞 (Newspaper) family
  { word: "新聞", meanings: ["Journal"], readings: ["しんぶん"], mnemonicFr: "JOURNAL - publication quotidienne.", targetKanji: ["新", "聞"] },
  { word: "新聞社", meanings: ["Agence de presse"], readings: ["しんぶんしゃ"], mnemonicFr: "AGENCE DE PRESSE - entreprise journalistique.", targetKanji: ["新", "聞", "社"] },

  // 言語 (Language) family
  { word: "言語", meanings: ["Langue"], readings: ["げんご"], mnemonicFr: "LANGUE - systeme de communication.", targetKanji: ["言", "語"] },
  { word: "言語学", meanings: ["Linguistique"], readings: ["げんごがく"], mnemonicFr: "LINGUISTIQUE - science du langage.", targetKanji: ["言", "語", "学"] },
  { word: "外国語", meanings: ["Langue etrangere"], readings: ["がいこくご"], mnemonicFr: "LANGUE ETRANGERE - langue d'un autre pays.", targetKanji: ["外", "国", "語"] },
  { word: "日本語", meanings: ["Japonais"], readings: ["にほんご"], mnemonicFr: "JAPONAIS - langue du Japon.", targetKanji: ["日", "本", "語"] },
];

// Part 10: Additional intellectual vocabulary
const vocabPart10 = [
  // 定義 (Definition) family
  { word: "定義", meanings: ["Definition"], readings: ["ていぎ"], mnemonicFr: "DEFINITION - sens precis d'un mot.", targetKanji: ["定", "義"] },
  { word: "定理", meanings: ["Theoreme"], readings: ["ていり"], mnemonicFr: "THEOREME - verite demontree.", targetKanji: ["定", "理"] },
  { word: "定数", meanings: ["Constante"], readings: ["ていすう"], mnemonicFr: "CONSTANTE - valeur fixe.", targetKanji: ["定", "数"] },
  { word: "規定", meanings: ["Reglement"], readings: ["きてい"], mnemonicFr: "REGLEMENT - regles etablies.", targetKanji: ["規", "定"] },
  { word: "決定", meanings: ["Decision"], readings: ["けってい"], mnemonicFr: "DECISION - choix arrete.", targetKanji: ["決", "定"] },
  { word: "否定", meanings: ["Negation"], readings: ["ひてい"], mnemonicFr: "NEGATION - refus d'admettre.", targetKanji: ["否", "定"] },
  { word: "肯定", meanings: ["Affirmation"], readings: ["こうてい"], mnemonicFr: "AFFIRMATION - acceptation.", targetKanji: ["肯", "定"] },
  { word: "安定", meanings: ["Stabilite"], readings: ["あんてい"], mnemonicFr: "STABILITE - etat equilibre.", targetKanji: ["安", "定"] },

  // 問題 (Problem) family
  { word: "問題", meanings: ["Probleme", "Question"], readings: ["もんだい"], mnemonicFr: "PROBLEME - difficulte a resoudre.", targetKanji: ["問", "題"] },
  { word: "問題点", meanings: ["Point problematique"], readings: ["もんだいてん"], mnemonicFr: "POINT PROBLEMATIQUE - aspect difficile.", targetKanji: ["問", "題", "点"] },
  { word: "課題", meanings: ["Sujet", "Devoir"], readings: ["かだい"], mnemonicFr: "SUJET - tache a accomplir.", targetKanji: ["課", "題"] },
  { word: "題名", meanings: ["Titre"], readings: ["だいめい"], mnemonicFr: "TITRE - nom d'une oeuvre.", targetKanji: ["題", "名"] },
  { word: "話題", meanings: ["Sujet de conversation"], readings: ["わだい"], mnemonicFr: "SUJET - theme de discussion.", targetKanji: ["話", "題"] },

  // 解決 (Solution) family
  { word: "解決", meanings: ["Resolution"], readings: ["かいけつ"], mnemonicFr: "RESOLUTION - trouver une solution.", targetKanji: ["解", "決"] },
  { word: "解答", meanings: ["Reponse"], readings: ["かいとう"], mnemonicFr: "REPONSE - solution a une question.", targetKanji: ["解", "答"] },
  { word: "解釈", meanings: ["Interpretation"], readings: ["かいしゃく"], mnemonicFr: "INTERPRETATION - comprendre le sens.", targetKanji: ["解", "釈"] },
  { word: "解説", meanings: ["Commentaire"], readings: ["かいせつ"], mnemonicFr: "COMMENTAIRE - explication detaillee.", targetKanji: ["解", "説"] },
  { word: "理解", meanings: ["Comprehension"], readings: ["りかい"], mnemonicFr: "COMPREHENSION - saisir le sens.", targetKanji: ["理", "解"] },
  { word: "理解力", meanings: ["Capacite de comprehension"], readings: ["りかいりょく"], mnemonicFr: "CAPACITE DE COMPREHENSION - aptitude a comprendre.", targetKanji: ["理", "解", "力"] },

  // 基本 (Basic) family
  { word: "基本", meanings: ["Base", "Fondement"], readings: ["きほん"], mnemonicFr: "BASE - fondation.", targetKanji: ["基", "本"] },
  { word: "基本的", meanings: ["Fondamental"], readings: ["きほんてき"], mnemonicFr: "FONDAMENTAL - essentiel.", targetKanji: ["基", "本", "的"] },
  { word: "基準", meanings: ["Critere", "Norme"], readings: ["きじゅん"], mnemonicFr: "CRITERE - reference pour juger.", targetKanji: ["基", "準"] },
  { word: "基礎", meanings: ["Fondation"], readings: ["きそ"], mnemonicFr: "FONDATION - base solide.", targetKanji: ["基", "礎"] },
  { word: "基礎的", meanings: ["Elementaire"], readings: ["きそてき"], mnemonicFr: "ELEMENTAIRE - de base.", targetKanji: ["基", "礎", "的"] },

  // 発展 (Development) family
  { word: "発展", meanings: ["Developpement"], readings: ["はってん"], mnemonicFr: "DEVELOPPEMENT - croissance.", targetKanji: ["発", "展"] },
  { word: "展開", meanings: ["Deploiement"], readings: ["てんかい"], mnemonicFr: "DEPLOIEMENT - mise en oeuvre.", targetKanji: ["展", "開"] },
  { word: "展示", meanings: ["Exposition"], readings: ["てんじ"], mnemonicFr: "EXPOSITION - presentation au public.", targetKanji: ["展", "示"] },
  { word: "展望", meanings: ["Perspective"], readings: ["てんぼう"], mnemonicFr: "PERSPECTIVE - vue d'ensemble.", targetKanji: ["展", "望"] },
  { word: "進展", meanings: ["Progres"], readings: ["しんてん"], mnemonicFr: "PROGRES - avancement.", targetKanji: ["進", "展"] },

  // 応用 (Application) family
  { word: "応用", meanings: ["Application"], readings: ["おうよう"], mnemonicFr: "APPLICATION - mise en pratique.", targetKanji: ["応", "用"] },
  { word: "応用的", meanings: ["Applique"], readings: ["おうようてき"], mnemonicFr: "APPLIQUE - mis en pratique.", targetKanji: ["応", "用", "的"] },
  { word: "適用", meanings: ["Application (regles)"], readings: ["てきよう"], mnemonicFr: "APPLICATION - mettre en vigueur.", targetKanji: ["適", "用"] },
  { word: "利用", meanings: ["Utilisation"], readings: ["りよう"], mnemonicFr: "UTILISATION - se servir de.", targetKanji: ["利", "用"] },
  { word: "活用", meanings: ["Utilisation active"], readings: ["かつよう"], mnemonicFr: "UTILISATION ACTIVE - exploiter.", targetKanji: ["活", "用"] },
  { word: "採用", meanings: ["Adoption", "Recrutement"], readings: ["さいよう"], mnemonicFr: "ADOPTION - accepter d'utiliser.", targetKanji: ["採", "用"] },
];

async function main() {
  console.log("=== SEEDING ACADEMIC & SCIENTIFIC VOCABULARY (BATCH 9) ===\n");

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
