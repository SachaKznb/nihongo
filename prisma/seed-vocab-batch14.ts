import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary batch 14 - Common expressions, set phrases, and idiomatic words for French speakers
// Focus on words using お prefix, body parts compounds, and common expressions

const vocabPart1 = [
  // お prefix words (honorific/polite expressions)
  { word: "お願い", meanings: ["S'il vous plait", "Demande"], readings: ["おねがい"], mnemonicFr: "S'IL VOUS PLAIT - formule de politesse pour demander.", targetKanji: ["願"] },
  { word: "お礼", meanings: ["Remerciement", "Gratitude"], readings: ["おれい"], mnemonicFr: "REMERCIEMENT - expression de gratitude polie.", targetKanji: ["礼"] },
  { word: "お金", meanings: ["Argent"], readings: ["おかね"], mnemonicFr: "ARGENT - monnaie (forme polie).", targetKanji: ["金"] },
  { word: "お茶", meanings: ["The"], readings: ["おちゃ"], mnemonicFr: "THE - boisson traditionnelle japonaise.", targetKanji: ["茶"] },
  { word: "お酒", meanings: ["Sake", "Alcool"], readings: ["おさけ"], mnemonicFr: "ALCOOL - boisson alcoolisee (forme polie).", targetKanji: ["酒"] },
  { word: "お湯", meanings: ["Eau chaude"], readings: ["おゆ"], mnemonicFr: "EAU CHAUDE - eau chauffee pour le bain ou le the.", targetKanji: ["湯"] },
  { word: "お腹", meanings: ["Ventre"], readings: ["おなか"], mnemonicFr: "VENTRE - partie du corps (forme polie).", targetKanji: ["腹"] },
  { word: "お寺", meanings: ["Temple bouddhiste"], readings: ["おてら"], mnemonicFr: "TEMPLE - lieu de culte bouddhiste.", targetKanji: ["寺"] },
  { word: "お土産", meanings: ["Souvenir", "Cadeau"], readings: ["おみやげ"], mnemonicFr: "SOUVENIR - cadeau rapporte d'un voyage.", targetKanji: ["土", "産"] },
  { word: "お祭り", meanings: ["Festival"], readings: ["おまつり"], mnemonicFr: "FESTIVAL - fete traditionnelle japonaise.", targetKanji: ["祭"] },
  { word: "お正月", meanings: ["Nouvel An"], readings: ["おしょうがつ"], mnemonicFr: "NOUVEL AN - fete du Jour de l'An.", targetKanji: ["正", "月"] },
  { word: "お客", meanings: ["Client", "Invite"], readings: ["おきゃく"], mnemonicFr: "CLIENT/INVITE - personne qu'on recoit.", targetKanji: ["客"] },
  { word: "お客様", meanings: ["Client", "Invite (honorifique)"], readings: ["おきゃくさま"], mnemonicFr: "CLIENT - forme tres polie pour un client.", targetKanji: ["客", "様"] },
  { word: "お菓子", meanings: ["Confiserie", "Gateau"], readings: ["おかし"], mnemonicFr: "CONFISERIE - sucreries et gateaux.", targetKanji: ["菓", "子"] },
  { word: "お皿", meanings: ["Assiette"], readings: ["おさら"], mnemonicFr: "ASSIETTE - vaisselle pour servir.", targetKanji: ["皿"] },
  { word: "お箸", meanings: ["Baguettes"], readings: ["おはし"], mnemonicFr: "BAGUETTES - ustensiles pour manger.", targetKanji: ["箸"] },
  { word: "お風呂", meanings: ["Bain"], readings: ["おふろ"], mnemonicFr: "BAIN - moment de relaxation japonais.", targetKanji: ["風", "呂"] },
  { word: "お弁当", meanings: ["Bento", "Panier-repas"], readings: ["おべんとう"], mnemonicFr: "BENTO - repas emballe a emporter.", targetKanji: ["弁", "当"] },
  { word: "お見舞い", meanings: ["Visite a un malade"], readings: ["おみまい"], mnemonicFr: "VISITE - rendre visite a quelqu'un de malade.", targetKanji: ["見", "舞"] },
  { word: "お祝い", meanings: ["Celebration", "Felicitations"], readings: ["おいわい"], mnemonicFr: "CELEBRATION - feter un evenement heureux.", targetKanji: ["祝"] },

  // 手 (main) compounds
  { word: "手紙", meanings: ["Lettre"], readings: ["てがみ"], mnemonicFr: "LETTRE - message ecrit a la main.", targetKanji: ["手", "紙"] },
  { word: "手前", meanings: ["Devant soi", "Ce cote-ci"], readings: ["てまえ"], mnemonicFr: "DEVANT SOI - l'espace juste devant.", targetKanji: ["手", "前"] },
  { word: "手元", meanings: ["A portee de main"], readings: ["てもと"], mnemonicFr: "A PORTEE DE MAIN - ce qu'on a sous la main.", targetKanji: ["手", "元"] },
  { word: "手入れ", meanings: ["Entretien", "Soin"], readings: ["ていれ"], mnemonicFr: "ENTRETIEN - prendre soin de quelque chose.", targetKanji: ["手", "入"] },
  { word: "手続き", meanings: ["Procedure", "Formalites"], readings: ["てつづき"], mnemonicFr: "PROCEDURE - demarches administratives.", targetKanji: ["手", "続"] },
  { word: "手間", meanings: ["Temps et effort", "Peine"], readings: ["てま"], mnemonicFr: "PEINE - effort et temps necessaires.", targetKanji: ["手", "間"] },
  { word: "手伝う", meanings: ["Aider"], readings: ["てつだう"], mnemonicFr: "AIDER - donner un coup de main.", targetKanji: ["手", "伝"] },
  { word: "手段", meanings: ["Moyen", "Methode"], readings: ["しゅだん"], mnemonicFr: "MOYEN - methode pour accomplir quelque chose.", targetKanji: ["手", "段"] },
  { word: "手術", meanings: ["Operation chirurgicale"], readings: ["しゅじゅつ"], mnemonicFr: "OPERATION - intervention medicale.", targetKanji: ["手", "術"] },
  { word: "手帳", meanings: ["Carnet", "Agenda"], readings: ["てちょう"], mnemonicFr: "CARNET - petit livre pour noter.", targetKanji: ["手", "帳"] },
  { word: "手首", meanings: ["Poignet"], readings: ["てくび"], mnemonicFr: "POIGNET - articulation de la main.", targetKanji: ["手", "首"] },
  { word: "上手", meanings: ["Doue", "Habile"], readings: ["じょうず"], mnemonicFr: "HABILE - qui fait bien quelque chose.", targetKanji: ["上", "手"] },
  { word: "下手", meanings: ["Maladroit", "Pas doue"], readings: ["へた"], mnemonicFr: "MALADROIT - qui n'est pas habile.", targetKanji: ["下", "手"] },
  { word: "相手", meanings: ["Partenaire", "Adversaire"], readings: ["あいて"], mnemonicFr: "PARTENAIRE - l'autre personne dans une relation.", targetKanji: ["相", "手"] },

  // 足 (pied/jambe) compounds
  { word: "足りる", meanings: ["Suffire", "Etre suffisant"], readings: ["たりる"], mnemonicFr: "SUFFIRE - etre en quantite adequate.", targetKanji: ["足"] },
  { word: "足す", meanings: ["Ajouter"], readings: ["たす"], mnemonicFr: "AJOUTER - mettre en plus.", targetKanji: ["足"] },
  { word: "足元", meanings: ["A ses pieds", "Pas"], readings: ["あしもと"], mnemonicFr: "A SES PIEDS - l'espace autour de ses pieds.", targetKanji: ["足", "元"] },
  { word: "足音", meanings: ["Bruit de pas"], readings: ["あしおと"], mnemonicFr: "BRUIT DE PAS - son des pieds qui marchent.", targetKanji: ["足", "音"] },
  { word: "足跡", meanings: ["Empreinte de pas"], readings: ["あしあと"], mnemonicFr: "EMPREINTE - trace laissee par les pieds.", targetKanji: ["足", "跡"] },
  { word: "足首", meanings: ["Cheville"], readings: ["あしくび"], mnemonicFr: "CHEVILLE - articulation du pied.", targetKanji: ["足", "首"] },
  { word: "不足", meanings: ["Insuffisance", "Manque"], readings: ["ふそく"], mnemonicFr: "MANQUE - ne pas avoir assez.", targetKanji: ["不", "足"] },
  { word: "満足", meanings: ["Satisfaction"], readings: ["まんぞく"], mnemonicFr: "SATISFACTION - etre content et comble.", targetKanji: ["満", "足"] },

  // 目 (oeil) compounds
  { word: "目的", meanings: ["But", "Objectif"], readings: ["もくてき"], mnemonicFr: "BUT - ce qu'on vise a atteindre.", targetKanji: ["目", "的"] },
  { word: "目標", meanings: ["Objectif", "Cible"], readings: ["もくひょう"], mnemonicFr: "OBJECTIF - but a atteindre.", targetKanji: ["目", "標"] },
  { word: "目次", meanings: ["Table des matieres"], readings: ["もくじ"], mnemonicFr: "TABLE DES MATIERES - liste des chapitres.", targetKanji: ["目", "次"] },
  { word: "目立つ", meanings: ["Se remarquer", "Attirer l'attention"], readings: ["めだつ"], mnemonicFr: "SE REMARQUER - etre visible, attirer les yeux.", targetKanji: ["目", "立"] },
  { word: "目覚める", meanings: ["Se reveiller"], readings: ["めざめる"], mnemonicFr: "SE REVEILLER - ouvrir les yeux au matin.", targetKanji: ["目", "覚"] },
  { word: "目覚まし", meanings: ["Reveil"], readings: ["めざまし"], mnemonicFr: "REVEIL - appareil pour se reveiller.", targetKanji: ["目", "覚"] },
  { word: "目指す", meanings: ["Viser", "Aspirer a"], readings: ["めざす"], mnemonicFr: "VISER - avoir pour objectif.", targetKanji: ["目", "指"] },
  { word: "注目", meanings: ["Attention", "Remarque"], readings: ["ちゅうもく"], mnemonicFr: "ATTENTION - attirer les regards.", targetKanji: ["注", "目"] },
  { word: "科目", meanings: ["Matiere scolaire"], readings: ["かもく"], mnemonicFr: "MATIERE - sujet d'etude a l'ecole.", targetKanji: ["科", "目"] },
  { word: "項目", meanings: ["Article", "Point"], readings: ["こうもく"], mnemonicFr: "ARTICLE - element d'une liste.", targetKanji: ["項", "目"] },
];

const vocabPart2 = [
  // 口 (bouche) compounds
  { word: "口語", meanings: ["Langue parlee"], readings: ["こうご"], mnemonicFr: "LANGUE PARLEE - langage de conversation.", targetKanji: ["口", "語"] },
  { word: "口調", meanings: ["Ton", "Maniere de parler"], readings: ["くちょう"], mnemonicFr: "TON - facon de s'exprimer.", targetKanji: ["口", "調"] },
  { word: "口実", meanings: ["Pretexte", "Excuse"], readings: ["こうじつ"], mnemonicFr: "PRETEXTE - raison inventee.", targetKanji: ["口", "実"] },
  { word: "口元", meanings: ["Autour de la bouche"], readings: ["くちもと"], mnemonicFr: "AUTOUR DE LA BOUCHE - zone pres des levres.", targetKanji: ["口", "元"] },
  { word: "入口", meanings: ["Entree"], readings: ["いりぐち"], mnemonicFr: "ENTREE - porte pour entrer.", targetKanji: ["入", "口"] },
  { word: "出口", meanings: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIE - porte pour sortir.", targetKanji: ["出", "口"] },
  { word: "窓口", meanings: ["Guichet"], readings: ["まどぐち"], mnemonicFr: "GUICHET - fenetre de service.", targetKanji: ["窓", "口"] },
  { word: "人口", meanings: ["Population"], readings: ["じんこう"], mnemonicFr: "POPULATION - nombre d'habitants.", targetKanji: ["人", "口"] },

  // 耳 (oreille) compounds
  { word: "耳打ち", meanings: ["Chuchotement a l'oreille"], readings: ["みみうち"], mnemonicFr: "CHUCHOTEMENT - parler discretement a l'oreille.", targetKanji: ["耳", "打"] },
  { word: "耳鳴り", meanings: ["Acouphene", "Bourdonnement"], readings: ["みみなり"], mnemonicFr: "ACOUPHENE - bruit dans les oreilles.", targetKanji: ["耳", "鳴"] },
  { word: "初耳", meanings: ["Premiere fois qu'on entend"], readings: ["はつみみ"], mnemonicFr: "PREMIERE FOIS - nouvelle jamais entendue.", targetKanji: ["初", "耳"] },
  { word: "早耳", meanings: ["Etre au courant rapidement"], readings: ["はやみみ"], mnemonicFr: "AU COURANT - apprendre vite les nouvelles.", targetKanji: ["早", "耳"] },

  // 心 (coeur/esprit) compounds
  { word: "心配", meanings: ["Inquietude", "Souci"], readings: ["しんぱい"], mnemonicFr: "INQUIETUDE - se faire du souci.", targetKanji: ["心", "配"] },
  { word: "心理", meanings: ["Psychologie"], readings: ["しんり"], mnemonicFr: "PSYCHOLOGIE - etude de l'esprit.", targetKanji: ["心", "理"] },
  { word: "心情", meanings: ["Sentiments", "Etat d'esprit"], readings: ["しんじょう"], mnemonicFr: "SENTIMENTS - emotions du coeur.", targetKanji: ["心", "情"] },
  { word: "心当たり", meanings: ["Idee", "Indice"], readings: ["こころあたり"], mnemonicFr: "IDEE - avoir une intuition.", targetKanji: ["心", "当"] },
  { word: "心得る", meanings: ["Comprendre", "Savoir"], readings: ["こころえる"], mnemonicFr: "COMPRENDRE - avoir conscience de.", targetKanji: ["心", "得"] },
  { word: "心地", meanings: ["Sensation", "Sentiment"], readings: ["ここち"], mnemonicFr: "SENSATION - comment on se sent.", targetKanji: ["心", "地"] },
  { word: "心臓", meanings: ["Coeur (organe)"], readings: ["しんぞう"], mnemonicFr: "COEUR - organe vital.", targetKanji: ["心", "臓"] },
  { word: "安心", meanings: ["Tranquillite d'esprit"], readings: ["あんしん"], mnemonicFr: "TRANQUILLITE - esprit en paix.", targetKanji: ["安", "心"] },
  { word: "決心", meanings: ["Decision", "Resolution"], readings: ["けっしん"], mnemonicFr: "DECISION - se decider fermement.", targetKanji: ["決", "心"] },
  { word: "関心", meanings: ["Interet"], readings: ["かんしん"], mnemonicFr: "INTERET - ce qui attire l'attention.", targetKanji: ["関", "心"] },
  { word: "熱心", meanings: ["Zele", "Ardeur"], readings: ["ねっしん"], mnemonicFr: "ZELE - passion et enthousiasme.", targetKanji: ["熱", "心"] },
  { word: "中心", meanings: ["Centre"], readings: ["ちゅうしん"], mnemonicFr: "CENTRE - le coeur de quelque chose.", targetKanji: ["中", "心"] },

  // 顔 (visage) compounds
  { word: "顔色", meanings: ["Teint", "Mine"], readings: ["かおいろ"], mnemonicFr: "TEINT - couleur du visage.", targetKanji: ["顔", "色"] },
  { word: "顔つき", meanings: ["Expression", "Air"], readings: ["かおつき"], mnemonicFr: "EXPRESSION - air du visage.", targetKanji: ["顔"] },
  { word: "顔見知り", meanings: ["Connaissance"], readings: ["かおみしり"], mnemonicFr: "CONNAISSANCE - personne qu'on connait de vue.", targetKanji: ["顔", "見", "知"] },
  { word: "笑顔", meanings: ["Sourire", "Visage souriant"], readings: ["えがお"], mnemonicFr: "SOURIRE - visage heureux.", targetKanji: ["笑", "顔"] },
  { word: "似顔絵", meanings: ["Portrait", "Caricature"], readings: ["にがおえ"], mnemonicFr: "PORTRAIT - dessin du visage.", targetKanji: ["似", "顔", "絵"] },
  { word: "素顔", meanings: ["Visage nature"], readings: ["すがお"], mnemonicFr: "VISAGE NATUREL - sans maquillage.", targetKanji: ["素", "顔"] },

  // 言 (parole) compounds
  { word: "言い方", meanings: ["Facon de dire"], readings: ["いいかた"], mnemonicFr: "FACON DE DIRE - maniere de s'exprimer.", targetKanji: ["言", "方"] },
  { word: "言い分", meanings: ["Arguments", "Point de vue"], readings: ["いいぶん"], mnemonicFr: "ARGUMENTS - ce qu'on a a dire.", targetKanji: ["言", "分"] },
  { word: "言い訳", meanings: ["Excuse"], readings: ["いいわけ"], mnemonicFr: "EXCUSE - justification.", targetKanji: ["言", "訳"] },
  { word: "言葉", meanings: ["Mot", "Parole"], readings: ["ことば"], mnemonicFr: "MOT - unite de langage.", targetKanji: ["言", "葉"] },
  { word: "言語", meanings: ["Langue", "Langage"], readings: ["げんご"], mnemonicFr: "LANGUE - systeme de communication.", targetKanji: ["言", "語"] },
  { word: "発言", meanings: ["Declaration", "Prise de parole"], readings: ["はつげん"], mnemonicFr: "DECLARATION - prendre la parole.", targetKanji: ["発", "言"] },
  { word: "方言", meanings: ["Dialecte"], readings: ["ほうげん"], mnemonicFr: "DIALECTE - parler regional.", targetKanji: ["方", "言"] },
  { word: "伝言", meanings: ["Message"], readings: ["でんごん"], mnemonicFr: "MESSAGE - parole transmise.", targetKanji: ["伝", "言"] },
  { word: "独り言", meanings: ["Monologue", "Parler seul"], readings: ["ひとりごと"], mnemonicFr: "MONOLOGUE - parler a soi-meme.", targetKanji: ["独", "言"] },

  // 気 (esprit/energie) compounds
  { word: "気分", meanings: ["Humeur"], readings: ["きぶん"], mnemonicFr: "HUMEUR - etat emotionnel.", targetKanji: ["気", "分"] },
  { word: "気持ち", meanings: ["Sentiment"], readings: ["きもち"], mnemonicFr: "SENTIMENT - ce qu'on ressent.", targetKanji: ["気", "持"] },
  { word: "気温", meanings: ["Temperature"], readings: ["きおん"], mnemonicFr: "TEMPERATURE - chaleur de l'air.", targetKanji: ["気", "温"] },
  { word: "気候", meanings: ["Climat"], readings: ["きこう"], mnemonicFr: "CLIMAT - conditions meteorologiques.", targetKanji: ["気", "候"] },
  { word: "気付く", meanings: ["Remarquer", "Se rendre compte"], readings: ["きづく"], mnemonicFr: "REMARQUER - prendre conscience.", targetKanji: ["気", "付"] },
  { word: "気味", meanings: ["Sensation", "Tendance"], readings: ["ぎみ"], mnemonicFr: "SENSATION - leger sentiment.", targetKanji: ["気", "味"] },
  { word: "元気", meanings: ["Energie", "Bonne sante"], readings: ["げんき"], mnemonicFr: "ENERGIE - etre en forme.", targetKanji: ["元", "気"] },
  { word: "天気", meanings: ["Temps", "Meteo"], readings: ["てんき"], mnemonicFr: "METEO - conditions du ciel.", targetKanji: ["天", "気"] },
  { word: "人気", meanings: ["Popularite"], readings: ["にんき"], mnemonicFr: "POPULARITE - etre aime du public.", targetKanji: ["人", "気"] },
  { word: "空気", meanings: ["Air", "Atmosphere"], readings: ["くうき"], mnemonicFr: "AIR - gaz qu'on respire.", targetKanji: ["空", "気"] },
  { word: "電気", meanings: ["Electricite"], readings: ["でんき"], mnemonicFr: "ELECTRICITE - energie electrique.", targetKanji: ["電", "気"] },
  { word: "景気", meanings: ["Conjoncture economique"], readings: ["けいき"], mnemonicFr: "CONJONCTURE - etat de l'economie.", targetKanji: ["景", "気"] },
  { word: "勇気", meanings: ["Courage"], readings: ["ゆうき"], mnemonicFr: "COURAGE - bravoure.", targetKanji: ["勇", "気"] },
  { word: "本気", meanings: ["Serieux"], readings: ["ほんき"], mnemonicFr: "SERIEUX - etre sincere.", targetKanji: ["本", "気"] },
];

const vocabPart3 = [
  // 物 (chose) compounds
  { word: "物語", meanings: ["Histoire", "Recit"], readings: ["ものがたり"], mnemonicFr: "HISTOIRE - narration.", targetKanji: ["物", "語"] },
  { word: "物事", meanings: ["Choses", "Affaires"], readings: ["ものごと"], mnemonicFr: "CHOSES - les affaires en general.", targetKanji: ["物", "事"] },
  { word: "買い物", meanings: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "COURSES - faire des achats.", targetKanji: ["買", "物"] },
  { word: "食べ物", meanings: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "NOURRITURE - ce qu'on mange.", targetKanji: ["食", "物"] },
  { word: "飲み物", meanings: ["Boisson"], readings: ["のみもの"], mnemonicFr: "BOISSON - ce qu'on boit.", targetKanji: ["飲", "物"] },
  { word: "生き物", meanings: ["Etre vivant"], readings: ["いきもの"], mnemonicFr: "ETRE VIVANT - creature vivante.", targetKanji: ["生", "物"] },
  { word: "乗り物", meanings: ["Vehicule"], readings: ["のりもの"], mnemonicFr: "VEHICULE - moyen de transport.", targetKanji: ["乗", "物"] },
  { word: "着物", meanings: ["Kimono"], readings: ["きもの"], mnemonicFr: "KIMONO - vetement traditionnel.", targetKanji: ["着", "物"] },
  { word: "荷物", meanings: ["Bagages"], readings: ["にもつ"], mnemonicFr: "BAGAGES - affaires a transporter.", targetKanji: ["荷", "物"] },
  { word: "建物", meanings: ["Batiment"], readings: ["たてもの"], mnemonicFr: "BATIMENT - construction.", targetKanji: ["建", "物"] },
  { word: "動物", meanings: ["Animal"], readings: ["どうぶつ"], mnemonicFr: "ANIMAL - etre vivant qui bouge.", targetKanji: ["動", "物"] },
  { word: "植物", meanings: ["Plante"], readings: ["しょくぶつ"], mnemonicFr: "PLANTE - vegetal.", targetKanji: ["植", "物"] },
  { word: "人物", meanings: ["Personnage"], readings: ["じんぶつ"], mnemonicFr: "PERSONNAGE - personne importante.", targetKanji: ["人", "物"] },
  { word: "本物", meanings: ["Authentique", "Vrai"], readings: ["ほんもの"], mnemonicFr: "AUTHENTIQUE - la vraie chose.", targetKanji: ["本", "物"] },
  { word: "見物", meanings: ["Visite touristique"], readings: ["けんぶつ"], mnemonicFr: "VISITE - aller voir un lieu.", targetKanji: ["見", "物"] },

  // 事 (chose/affaire) compounds
  { word: "事実", meanings: ["Fait", "Realite"], readings: ["じじつ"], mnemonicFr: "FAIT - ce qui est vrai.", targetKanji: ["事", "実"] },
  { word: "事件", meanings: ["Incident", "Affaire"], readings: ["じけん"], mnemonicFr: "INCIDENT - evenement notable.", targetKanji: ["事", "件"] },
  { word: "事故", meanings: ["Accident"], readings: ["じこ"], mnemonicFr: "ACCIDENT - evenement malheureux.", targetKanji: ["事", "故"] },
  { word: "事情", meanings: ["Circonstances"], readings: ["じじょう"], mnemonicFr: "CIRCONSTANCES - situation.", targetKanji: ["事", "情"] },
  { word: "事務", meanings: ["Travail de bureau"], readings: ["じむ"], mnemonicFr: "TRAVAIL DE BUREAU - taches administratives.", targetKanji: ["事", "務"] },
  { word: "事務所", meanings: ["Bureau"], readings: ["じむしょ"], mnemonicFr: "BUREAU - lieu de travail.", targetKanji: ["事", "務", "所"] },
  { word: "仕事", meanings: ["Travail"], readings: ["しごと"], mnemonicFr: "TRAVAIL - activite professionnelle.", targetKanji: ["仕", "事"] },
  { word: "食事", meanings: ["Repas"], readings: ["しょくじ"], mnemonicFr: "REPAS - moment de manger.", targetKanji: ["食", "事"] },
  { word: "記事", meanings: ["Article"], readings: ["きじ"], mnemonicFr: "ARTICLE - texte de journal.", targetKanji: ["記", "事"] },
  { word: "行事", meanings: ["Evenement", "Ceremonie"], readings: ["ぎょうじ"], mnemonicFr: "EVENEMENT - occasion speciale.", targetKanji: ["行", "事"] },
  { word: "大事", meanings: ["Important"], readings: ["だいじ"], mnemonicFr: "IMPORTANT - qui compte beaucoup.", targetKanji: ["大", "事"] },
  { word: "火事", meanings: ["Incendie"], readings: ["かじ"], mnemonicFr: "INCENDIE - feu destructeur.", targetKanji: ["火", "事"] },
  { word: "無事", meanings: ["Sain et sauf"], readings: ["ぶじ"], mnemonicFr: "SAIN ET SAUF - sans probleme.", targetKanji: ["無", "事"] },
  { word: "家事", meanings: ["Taches menageres"], readings: ["かじ"], mnemonicFr: "TACHES MENAGERES - travaux de la maison.", targetKanji: ["家", "事"] },
  { word: "返事", meanings: ["Reponse"], readings: ["へんじ"], mnemonicFr: "REPONSE - reaction a une question.", targetKanji: ["返", "事"] },

  // 場 (lieu) compounds
  { word: "場所", meanings: ["Endroit", "Lieu"], readings: ["ばしょ"], mnemonicFr: "ENDROIT - emplacement.", targetKanji: ["場", "所"] },
  { word: "場合", meanings: ["Cas", "Situation"], readings: ["ばあい"], mnemonicFr: "CAS - dans cette situation.", targetKanji: ["場", "合"] },
  { word: "場面", meanings: ["Scene"], readings: ["ばめん"], mnemonicFr: "SCENE - moment d'une histoire.", targetKanji: ["場", "面"] },
  { word: "工場", meanings: ["Usine"], readings: ["こうじょう"], mnemonicFr: "USINE - lieu de fabrication.", targetKanji: ["工", "場"] },
  { word: "市場", meanings: ["Marche"], readings: ["いちば"], mnemonicFr: "MARCHE - lieu de vente.", targetKanji: ["市", "場"] },
  { word: "会場", meanings: ["Lieu de reunion"], readings: ["かいじょう"], mnemonicFr: "LIEU - endroit d'un evenement.", targetKanji: ["会", "場"] },
  { word: "駐車場", meanings: ["Parking"], readings: ["ちゅうしゃじょう"], mnemonicFr: "PARKING - lieu pour garer.", targetKanji: ["駐", "車", "場"] },
  { word: "広場", meanings: ["Place publique"], readings: ["ひろば"], mnemonicFr: "PLACE - espace public ouvert.", targetKanji: ["広", "場"] },
  { word: "立場", meanings: ["Position", "Point de vue"], readings: ["たちば"], mnemonicFr: "POSITION - ou l'on se tient.", targetKanji: ["立", "場"] },
  { word: "入場", meanings: ["Entree", "Admission"], readings: ["にゅうじょう"], mnemonicFr: "ENTREE - acces a un lieu.", targetKanji: ["入", "場"] },

  // 方 (direction/maniere) compounds
  { word: "方法", meanings: ["Methode"], readings: ["ほうほう"], mnemonicFr: "METHODE - facon de faire.", targetKanji: ["方", "法"] },
  { word: "方向", meanings: ["Direction"], readings: ["ほうこう"], mnemonicFr: "DIRECTION - vers ou aller.", targetKanji: ["方", "向"] },
  { word: "方面", meanings: ["Direction", "Domaine"], readings: ["ほうめん"], mnemonicFr: "DIRECTION - cote, aspect.", targetKanji: ["方", "面"] },
  { word: "見方", meanings: ["Point de vue"], readings: ["みかた"], mnemonicFr: "POINT DE VUE - facon de voir.", targetKanji: ["見", "方"] },
  { word: "味方", meanings: ["Allie"], readings: ["みかた"], mnemonicFr: "ALLIE - personne de son cote.", targetKanji: ["味", "方"] },
  { word: "考え方", meanings: ["Facon de penser"], readings: ["かんがえかた"], mnemonicFr: "FACON DE PENSER - maniere de reflechir.", targetKanji: ["考", "方"] },
  { word: "書き方", meanings: ["Facon d'ecrire"], readings: ["かきかた"], mnemonicFr: "FACON D'ECRIRE - maniere d'ecrire.", targetKanji: ["書", "方"] },
  { word: "読み方", meanings: ["Facon de lire", "Lecture"], readings: ["よみかた"], mnemonicFr: "LECTURE - comment lire.", targetKanji: ["読", "方"] },
  { word: "使い方", meanings: ["Facon d'utiliser"], readings: ["つかいかた"], mnemonicFr: "UTILISATION - comment utiliser.", targetKanji: ["使", "方"] },
  { word: "作り方", meanings: ["Facon de faire"], readings: ["つくりかた"], mnemonicFr: "FABRICATION - comment faire.", targetKanji: ["作", "方"] },
  { word: "地方", meanings: ["Region", "Province"], readings: ["ちほう"], mnemonicFr: "REGION - zone geographique.", targetKanji: ["地", "方"] },
  { word: "夕方", meanings: ["Soir"], readings: ["ゆうがた"], mnemonicFr: "SOIR - fin de journee.", targetKanji: ["夕", "方"] },
];

const vocabPart4 = [
  // 時 (temps) compounds
  { word: "時間", meanings: ["Temps", "Heure"], readings: ["じかん"], mnemonicFr: "TEMPS - duree.", targetKanji: ["時", "間"] },
  { word: "時代", meanings: ["Epoque"], readings: ["じだい"], mnemonicFr: "EPOQUE - periode historique.", targetKanji: ["時", "代"] },
  { word: "時期", meanings: ["Periode", "Moment"], readings: ["じき"], mnemonicFr: "PERIODE - moment particulier.", targetKanji: ["時", "期"] },
  { word: "時計", meanings: ["Montre", "Horloge"], readings: ["とけい"], mnemonicFr: "MONTRE - appareil pour l'heure.", targetKanji: ["時", "計"] },
  { word: "当時", meanings: ["A l'epoque"], readings: ["とうじ"], mnemonicFr: "A L'EPOQUE - a ce moment-la.", targetKanji: ["当", "時"] },
  { word: "同時", meanings: ["Simultanement"], readings: ["どうじ"], mnemonicFr: "SIMULTANEMENT - en meme temps.", targetKanji: ["同", "時"] },
  { word: "一時", meanings: ["Un moment", "Temporairement"], readings: ["いちじ"], mnemonicFr: "TEMPORAIREMENT - pour un temps.", targetKanji: ["一", "時"] },
  { word: "随時", meanings: ["A tout moment"], readings: ["ずいじ"], mnemonicFr: "A TOUT MOMENT - quand on veut.", targetKanji: ["随", "時"] },
  { word: "常時", meanings: ["En permanence"], readings: ["じょうじ"], mnemonicFr: "EN PERMANENCE - toujours.", targetKanji: ["常", "時"] },

  // 日 (jour/soleil) compounds
  { word: "日記", meanings: ["Journal intime"], readings: ["にっき"], mnemonicFr: "JOURNAL - ecrits quotidiens.", targetKanji: ["日", "記"] },
  { word: "日常", meanings: ["Quotidien"], readings: ["にちじょう"], mnemonicFr: "QUOTIDIEN - de tous les jours.", targetKanji: ["日", "常"] },
  { word: "日程", meanings: ["Programme", "Calendrier"], readings: ["にってい"], mnemonicFr: "PROGRAMME - plan des jours.", targetKanji: ["日", "程"] },
  { word: "日付", meanings: ["Date"], readings: ["ひづけ"], mnemonicFr: "DATE - jour du mois.", targetKanji: ["日", "付"] },
  { word: "休日", meanings: ["Jour de repos"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS - jour ferie.", targetKanji: ["休", "日"] },
  { word: "祝日", meanings: ["Jour ferie"], readings: ["しゅくじつ"], mnemonicFr: "JOUR FERIE - fete nationale.", targetKanji: ["祝", "日"] },
  { word: "平日", meanings: ["Jour de semaine"], readings: ["へいじつ"], mnemonicFr: "JOUR DE SEMAINE - jour ouvrable.", targetKanji: ["平", "日"] },
  { word: "本日", meanings: ["Aujourd'hui (formel)"], readings: ["ほんじつ"], mnemonicFr: "AUJOURD'HUI - ce jour.", targetKanji: ["本", "日"] },
  { word: "毎日", meanings: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "CHAQUE JOUR - quotidiennement.", targetKanji: ["毎", "日"] },
  { word: "誕生日", meanings: ["Anniversaire"], readings: ["たんじょうび"], mnemonicFr: "ANNIVERSAIRE - jour de naissance.", targetKanji: ["誕", "生", "日"] },
  { word: "記念日", meanings: ["Anniversaire", "Commemoration"], readings: ["きねんび"], mnemonicFr: "COMMEMORATION - jour special.", targetKanji: ["記", "念", "日"] },

  // 年 (annee) compounds
  { word: "年齢", meanings: ["Age"], readings: ["ねんれい"], mnemonicFr: "AGE - nombre d'annees.", targetKanji: ["年", "齢"] },
  { word: "年代", meanings: ["Decennie", "Epoque"], readings: ["ねんだい"], mnemonicFr: "DECENNIE - periode de dix ans.", targetKanji: ["年", "代"] },
  { word: "年間", meanings: ["Pendant l'annee"], readings: ["ねんかん"], mnemonicFr: "ANNEE - sur une annee.", targetKanji: ["年", "間"] },
  { word: "年度", meanings: ["Annee fiscale"], readings: ["ねんど"], mnemonicFr: "ANNEE FISCALE - exercice.", targetKanji: ["年", "度"] },
  { word: "去年", meanings: ["L'annee derniere"], readings: ["きょねん"], mnemonicFr: "L'ANNEE DERNIERE - l'an passe.", targetKanji: ["去", "年"] },
  { word: "来年", meanings: ["L'annee prochaine"], readings: ["らいねん"], mnemonicFr: "L'ANNEE PROCHAINE - l'an qui vient.", targetKanji: ["来", "年"] },
  { word: "今年", meanings: ["Cette annee"], readings: ["ことし"], mnemonicFr: "CETTE ANNEE - l'annee en cours.", targetKanji: ["今", "年"] },
  { word: "毎年", meanings: ["Chaque annee"], readings: ["まいとし"], mnemonicFr: "CHAQUE ANNEE - annuellement.", targetKanji: ["毎", "年"] },
  { word: "新年", meanings: ["Nouvel An"], readings: ["しんねん"], mnemonicFr: "NOUVEL AN - nouvelle annee.", targetKanji: ["新", "年"] },
  { word: "少年", meanings: ["Garcon", "Adolescent"], readings: ["しょうねん"], mnemonicFr: "GARCON - jeune homme.", targetKanji: ["少", "年"] },
  { word: "青年", meanings: ["Jeune homme"], readings: ["せいねん"], mnemonicFr: "JEUNE HOMME - adulte jeune.", targetKanji: ["青", "年"] },

  // 間 (entre/intervalle) compounds
  { word: "時間", meanings: ["Temps"], readings: ["じかん"], mnemonicFr: "TEMPS - duree entre deux moments.", targetKanji: ["時", "間"] },
  { word: "空間", meanings: ["Espace"], readings: ["くうかん"], mnemonicFr: "ESPACE - etendue vide.", targetKanji: ["空", "間"] },
  { word: "期間", meanings: ["Periode"], readings: ["きかん"], mnemonicFr: "PERIODE - intervalle de temps.", targetKanji: ["期", "間"] },
  { word: "人間", meanings: ["Etre humain"], readings: ["にんげん"], mnemonicFr: "ETRE HUMAIN - personne.", targetKanji: ["人", "間"] },
  { word: "世間", meanings: ["Societe", "Le monde"], readings: ["せけん"], mnemonicFr: "SOCIETE - le monde social.", targetKanji: ["世", "間"] },
  { word: "仲間", meanings: ["Camarade"], readings: ["なかま"], mnemonicFr: "CAMARADE - compagnon.", targetKanji: ["仲", "間"] },
  { word: "週間", meanings: ["Semaine"], readings: ["しゅうかん"], mnemonicFr: "SEMAINE - periode de sept jours.", targetKanji: ["週", "間"] },
  { word: "居間", meanings: ["Salon", "Sejour"], readings: ["いま"], mnemonicFr: "SALON - piece principale.", targetKanji: ["居", "間"] },
  { word: "茶の間", meanings: ["Salon japonais"], readings: ["ちゃのま"], mnemonicFr: "SALON - piece pour le the.", targetKanji: ["茶", "間"] },

  // Common action compounds
  { word: "出発", meanings: ["Depart"], readings: ["しゅっぱつ"], mnemonicFr: "DEPART - commencer un voyage.", targetKanji: ["出", "発"] },
  { word: "出席", meanings: ["Presence"], readings: ["しゅっせき"], mnemonicFr: "PRESENCE - etre present.", targetKanji: ["出", "席"] },
  { word: "出張", meanings: ["Voyage d'affaires"], readings: ["しゅっちょう"], mnemonicFr: "VOYAGE D'AFFAIRES - deplacement pro.", targetKanji: ["出", "張"] },
  { word: "出来事", meanings: ["Evenement"], readings: ["できごと"], mnemonicFr: "EVENEMENT - ce qui arrive.", targetKanji: ["出", "来", "事"] },
  { word: "思い出", meanings: ["Souvenir"], readings: ["おもいで"], mnemonicFr: "SOUVENIR - memoire du passe.", targetKanji: ["思", "出"] },
  { word: "取り出す", meanings: ["Sortir", "Extraire"], readings: ["とりだす"], mnemonicFr: "SORTIR - prendre quelque chose.", targetKanji: ["取", "出"] },
  { word: "見付ける", meanings: ["Trouver"], readings: ["みつける"], mnemonicFr: "TROUVER - decouvrir.", targetKanji: ["見", "付"] },
  { word: "見直す", meanings: ["Revoir", "Reconsiderer"], readings: ["みなおす"], mnemonicFr: "REVOIR - regarder a nouveau.", targetKanji: ["見", "直"] },
  { word: "見送る", meanings: ["Accompagner", "Raccompagner"], readings: ["みおくる"], mnemonicFr: "RACCOMPAGNER - dire au revoir.", targetKanji: ["見", "送"] },
  { word: "見舞う", meanings: ["Rendre visite (malade)"], readings: ["みまう"], mnemonicFr: "RENDRE VISITE - voir un malade.", targetKanji: ["見", "舞"] },
];

const vocabPart5 = [
  // More expressions with common kanji
  { word: "申し込む", meanings: ["Postuler", "S'inscrire"], readings: ["もうしこむ"], mnemonicFr: "POSTULER - faire une demande.", targetKanji: ["申", "込"] },
  { word: "申し訳ない", meanings: ["Desole", "Inexcusable"], readings: ["もうしわけない"], mnemonicFr: "DESOLE - sans excuse.", targetKanji: ["申", "訳"] },
  { word: "引き受ける", meanings: ["Accepter", "Se charger de"], readings: ["ひきうける"], mnemonicFr: "ACCEPTER - prendre en charge.", targetKanji: ["引", "受"] },
  { word: "引き出し", meanings: ["Tiroir"], readings: ["ひきだし"], mnemonicFr: "TIROIR - compartiment a tirer.", targetKanji: ["引", "出"] },
  { word: "引っ越す", meanings: ["Demenager"], readings: ["ひっこす"], mnemonicFr: "DEMENAGER - changer de maison.", targetKanji: ["引", "越"] },
  { word: "引退", meanings: ["Retraite"], readings: ["いんたい"], mnemonicFr: "RETRAITE - se retirer.", targetKanji: ["引", "退"] },
  { word: "取り消す", meanings: ["Annuler"], readings: ["とりけす"], mnemonicFr: "ANNULER - supprimer.", targetKanji: ["取", "消"] },
  { word: "取り扱う", meanings: ["Manipuler", "Traiter"], readings: ["とりあつかう"], mnemonicFr: "MANIPULER - s'occuper de.", targetKanji: ["取", "扱"] },
  { word: "取り組む", meanings: ["S'attaquer a"], readings: ["とりくむ"], mnemonicFr: "S'ATTAQUER - faire face a.", targetKanji: ["取", "組"] },

  // Weather and nature expressions
  { word: "天候", meanings: ["Conditions meteorologiques"], readings: ["てんこう"], mnemonicFr: "METEO - etat du temps.", targetKanji: ["天", "候"] },
  { word: "晴れ", meanings: ["Beau temps"], readings: ["はれ"], mnemonicFr: "BEAU TEMPS - ciel degage.", targetKanji: ["晴"] },
  { word: "曇り", meanings: ["Temps nuageux"], readings: ["くもり"], mnemonicFr: "NUAGEUX - ciel couvert.", targetKanji: ["曇"] },
  { word: "風景", meanings: ["Paysage"], readings: ["ふうけい"], mnemonicFr: "PAYSAGE - vue naturelle.", targetKanji: ["風", "景"] },
  { word: "景色", meanings: ["Paysage", "Vue"], readings: ["けしき"], mnemonicFr: "VUE - panorama.", targetKanji: ["景", "色"] },
  { word: "自然", meanings: ["Nature"], readings: ["しぜん"], mnemonicFr: "NATURE - monde naturel.", targetKanji: ["自", "然"] },
  { word: "季節", meanings: ["Saison"], readings: ["きせつ"], mnemonicFr: "SAISON - periode de l'annee.", targetKanji: ["季", "節"] },
  { word: "四季", meanings: ["Quatre saisons"], readings: ["しき"], mnemonicFr: "QUATRE SAISONS - cycle annuel.", targetKanji: ["四", "季"] },

  // Social expressions
  { word: "挨拶", meanings: ["Salutation"], readings: ["あいさつ"], mnemonicFr: "SALUTATION - formule de politesse.", targetKanji: ["挨", "拶"] },
  { word: "紹介", meanings: ["Presentation"], readings: ["しょうかい"], mnemonicFr: "PRESENTATION - faire connaitre.", targetKanji: ["紹", "介"] },
  { word: "自己紹介", meanings: ["Se presenter"], readings: ["じこしょうかい"], mnemonicFr: "SE PRESENTER - parler de soi.", targetKanji: ["自", "己", "紹", "介"] },
  { word: "案内", meanings: ["Guide", "Information"], readings: ["あんない"], mnemonicFr: "GUIDE - montrer le chemin.", targetKanji: ["案", "内"] },
  { word: "招待", meanings: ["Invitation"], readings: ["しょうたい"], mnemonicFr: "INVITATION - convier quelqu'un.", targetKanji: ["招", "待"] },
  { word: "訪問", meanings: ["Visite"], readings: ["ほうもん"], mnemonicFr: "VISITE - aller voir quelqu'un.", targetKanji: ["訪", "問"] },
  { word: "連絡", meanings: ["Contact"], readings: ["れんらく"], mnemonicFr: "CONTACT - communiquer.", targetKanji: ["連", "絡"] },
  { word: "約束", meanings: ["Promesse", "Rendez-vous"], readings: ["やくそく"], mnemonicFr: "PROMESSE - engagement.", targetKanji: ["約", "束"] },
  { word: "予約", meanings: ["Reservation"], readings: ["よやく"], mnemonicFr: "RESERVATION - reserver a l'avance.", targetKanji: ["予", "約"] },
  { word: "予定", meanings: ["Prevision", "Programme"], readings: ["よてい"], mnemonicFr: "PREVISION - ce qui est prevu.", targetKanji: ["予", "定"] },
  { word: "計画", meanings: ["Plan", "Projet"], readings: ["けいかく"], mnemonicFr: "PLAN - projet organise.", targetKanji: ["計", "画"] },

  // Work and study expressions
  { word: "勉強", meanings: ["Etude"], readings: ["べんきょう"], mnemonicFr: "ETUDE - travailler pour apprendre.", targetKanji: ["勉", "強"] },
  { word: "練習", meanings: ["Entrainement"], readings: ["れんしゅう"], mnemonicFr: "ENTRAINEMENT - s'exercer.", targetKanji: ["練", "習"] },
  { word: "復習", meanings: ["Revision"], readings: ["ふくしゅう"], mnemonicFr: "REVISION - revoir ce qu'on a appris.", targetKanji: ["復", "習"] },
  { word: "予習", meanings: ["Preparation"], readings: ["よしゅう"], mnemonicFr: "PREPARATION - etudier a l'avance.", targetKanji: ["予", "習"] },
  { word: "学習", meanings: ["Apprentissage"], readings: ["がくしゅう"], mnemonicFr: "APPRENTISSAGE - processus d'apprendre.", targetKanji: ["学", "習"] },
  { word: "経験", meanings: ["Experience"], readings: ["けいけん"], mnemonicFr: "EXPERIENCE - vecu.", targetKanji: ["経", "験"] },
  { word: "試験", meanings: ["Examen"], readings: ["しけん"], mnemonicFr: "EXAMEN - test.", targetKanji: ["試", "験"] },
  { word: "実験", meanings: ["Experience scientifique"], readings: ["じっけん"], mnemonicFr: "EXPERIENCE - test scientifique.", targetKanji: ["実", "験"] },
  { word: "研究", meanings: ["Recherche"], readings: ["けんきゅう"], mnemonicFr: "RECHERCHE - etude approfondie.", targetKanji: ["研", "究"] },
  { word: "調査", meanings: ["Enquete"], readings: ["ちょうさ"], mnemonicFr: "ENQUETE - investigation.", targetKanji: ["調", "査"] },

  // Feelings and emotions
  { word: "感動", meanings: ["Emotion", "Etre emu"], readings: ["かんどう"], mnemonicFr: "EMOTION - etre touche.", targetKanji: ["感", "動"] },
  { word: "感謝", meanings: ["Gratitude"], readings: ["かんしゃ"], mnemonicFr: "GRATITUDE - reconnaissance.", targetKanji: ["感", "謝"] },
  { word: "感想", meanings: ["Impression"], readings: ["かんそう"], mnemonicFr: "IMPRESSION - ce qu'on pense.", targetKanji: ["感", "想"] },
  { word: "感情", meanings: ["Sentiments"], readings: ["かんじょう"], mnemonicFr: "SENTIMENTS - emotions.", targetKanji: ["感", "情"] },
  { word: "感覚", meanings: ["Sensation"], readings: ["かんかく"], mnemonicFr: "SENSATION - perception.", targetKanji: ["感", "覚"] },
  { word: "興味", meanings: ["Interet"], readings: ["きょうみ"], mnemonicFr: "INTERET - curiosite.", targetKanji: ["興", "味"] },
  { word: "関心", meanings: ["Interet"], readings: ["かんしん"], mnemonicFr: "INTERET - attention portee.", targetKanji: ["関", "心"] },
  { word: "期待", meanings: ["Attente", "Espoir"], readings: ["きたい"], mnemonicFr: "ATTENTE - esperer.", targetKanji: ["期", "待"] },
  { word: "希望", meanings: ["Espoir", "Souhait"], readings: ["きぼう"], mnemonicFr: "ESPOIR - ce qu'on desire.", targetKanji: ["希", "望"] },
  { word: "失望", meanings: ["Deception"], readings: ["しつぼう"], mnemonicFr: "DECEPTION - perdre espoir.", targetKanji: ["失", "望"] },
  { word: "絶望", meanings: ["Desespoir"], readings: ["ぜつぼう"], mnemonicFr: "DESESPOIR - perte totale d'espoir.", targetKanji: ["絶", "望"] },
  { word: "幸福", meanings: ["Bonheur"], readings: ["こうふく"], mnemonicFr: "BONHEUR - etat de felicite.", targetKanji: ["幸", "福"] },
  { word: "不幸", meanings: ["Malheur"], readings: ["ふこう"], mnemonicFr: "MALHEUR - infortune.", targetKanji: ["不", "幸"] },
  { word: "悲しみ", meanings: ["Tristesse"], readings: ["かなしみ"], mnemonicFr: "TRISTESSE - chagrin.", targetKanji: ["悲"] },
  { word: "喜び", meanings: ["Joie"], readings: ["よろこび"], mnemonicFr: "JOIE - sentiment de bonheur.", targetKanji: ["喜"] },
  { word: "怒り", meanings: ["Colere"], readings: ["いかり"], mnemonicFr: "COLERE - sentiment de fureur.", targetKanji: ["怒"] },
  { word: "驚き", meanings: ["Surprise"], readings: ["おどろき"], mnemonicFr: "SURPRISE - etonnement.", targetKanji: ["驚"] },
  { word: "恐れ", meanings: ["Peur", "Crainte"], readings: ["おそれ"], mnemonicFr: "PEUR - crainte.", targetKanji: ["恐"] },
];

async function main() {
  console.log("=== SEEDING VOCABULARY BATCH 14 ===\n");
  console.log("Common expressions, set phrases, and idiomatic words for French speakers\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  const allVocab = [...vocabPart1, ...vocabPart2, ...vocabPart3, ...vocabPart4, ...vocabPart5];

  console.log(`Total vocabulary to process: ${allVocab.length}`);

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
