import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Batch 11: Abstract concepts, emotions, and states of mind for French speakers
// JLPT N5-N3 vocabulary focusing on feelings, mental states, and abstract concepts

const vocabPart1 = [
  // Emotions - Basic
  { word: "喜び", meanings: ["Joie", "Bonheur"], readings: ["よろこび"], mnemonicFr: "JOIE - sentiment de bonheur intense.", targetKanji: ["喜"] },
  { word: "悲しみ", meanings: ["Tristesse", "Chagrin"], readings: ["かなしみ"], mnemonicFr: "TRISTESSE - sentiment de peine profonde.", targetKanji: ["悲"] },
  { word: "怒り", meanings: ["Colere", "Fureur"], readings: ["いかり"], mnemonicFr: "COLERE - sentiment de rage.", targetKanji: ["怒"] },
  { word: "楽しみ", meanings: ["Plaisir", "Amusement"], readings: ["たのしみ"], mnemonicFr: "PLAISIR - ce qu'on attend avec joie.", targetKanji: ["楽"] },
  { word: "喜ぶ", meanings: ["Se rejouir", "Etre content"], readings: ["よろこぶ"], mnemonicFr: "SE REJOUIR - exprimer sa joie.", targetKanji: ["喜"] },
  { word: "悲しい", meanings: ["Triste"], readings: ["かなしい"], mnemonicFr: "TRISTE - qui ressent de la peine.", targetKanji: ["悲"] },
  { word: "怒る", meanings: ["Se facher", "Se mettre en colere"], readings: ["おこる"], mnemonicFr: "SE FACHER - exprimer sa colere.", targetKanji: ["怒"] },
  { word: "楽しい", meanings: ["Agreable", "Amusant"], readings: ["たのしい"], mnemonicFr: "AGREABLE - qui procure du plaisir.", targetKanji: ["楽"] },

  // States - Happiness/Unhappiness
  { word: "幸福", meanings: ["Bonheur", "Felicite"], readings: ["こうふく"], mnemonicFr: "BONHEUR - etat de satisfaction complete.", targetKanji: ["幸", "福"] },
  { word: "不幸", meanings: ["Malheur", "Infortune"], readings: ["ふこう"], mnemonicFr: "MALHEUR - absence de bonheur.", targetKanji: ["不", "幸"] },
  { word: "成功", meanings: ["Succes", "Reussite"], readings: ["せいこう"], mnemonicFr: "SUCCES - atteindre son objectif.", targetKanji: ["成", "功"] },
  { word: "失敗", meanings: ["Echec", "Erreur"], readings: ["しっぱい"], mnemonicFr: "ECHEC - ne pas reussir.", targetKanji: ["失", "敗"] },
  { word: "幸せ", meanings: ["Bonheur", "Chance"], readings: ["しあわせ"], mnemonicFr: "BONHEUR - etat heureux.", targetKanji: ["幸"] },
  { word: "不幸せ", meanings: ["Malheureux"], readings: ["ふしあわせ"], mnemonicFr: "MALHEUREUX - qui n'est pas heureux.", targetKanji: ["不", "幸"] },

  // Feelings - Kan compounds
  { word: "感動", meanings: ["Emotion", "Etre emu"], readings: ["かんどう"], mnemonicFr: "EMOTION - etre profondement touche.", targetKanji: ["感", "動"] },
  { word: "感謝", meanings: ["Gratitude", "Remerciement"], readings: ["かんしゃ"], mnemonicFr: "GRATITUDE - reconnaissance envers quelqu'un.", targetKanji: ["感", "謝"] },
  { word: "感情", meanings: ["Sentiment", "Emotion"], readings: ["かんじょう"], mnemonicFr: "SENTIMENT - etat affectif.", targetKanji: ["感", "情"] },
  { word: "感心", meanings: ["Admiration", "Etre impressionne"], readings: ["かんしん"], mnemonicFr: "ADMIRATION - etre impressionne par quelqu'un.", targetKanji: ["感", "心"] },
  { word: "感覚", meanings: ["Sensation", "Sens"], readings: ["かんかく"], mnemonicFr: "SENSATION - perception par les sens.", targetKanji: ["感", "覚"] },
  { word: "感じる", meanings: ["Ressentir", "Sentir"], readings: ["かんじる"], mnemonicFr: "RESSENTIR - eprouver une sensation.", targetKanji: ["感"] },
  { word: "感想", meanings: ["Impression", "Opinion"], readings: ["かんそう"], mnemonicFr: "IMPRESSION - ce qu'on pense apres une experience.", targetKanji: ["感", "想"] },

  // Abstract - Possibility
  { word: "可能", meanings: ["Possible", "Faisable"], readings: ["かのう"], mnemonicFr: "POSSIBLE - qui peut etre fait.", targetKanji: ["可", "能"] },
  { word: "不可能", meanings: ["Impossible"], readings: ["ふかのう"], mnemonicFr: "IMPOSSIBLE - qui ne peut pas etre fait.", targetKanji: ["不", "可", "能"] },
  { word: "必要", meanings: ["Necessaire", "Indispensable"], readings: ["ひつよう"], mnemonicFr: "NECESSAIRE - dont on a besoin.", targetKanji: ["必", "要"] },
  { word: "不必要", meanings: ["Inutile", "Superflu"], readings: ["ふひつよう"], mnemonicFr: "INUTILE - dont on n'a pas besoin.", targetKanji: ["不", "必", "要"] },
  { word: "可能性", meanings: ["Possibilite", "Probabilite"], readings: ["かのうせい"], mnemonicFr: "POSSIBILITE - ce qui peut arriver.", targetKanji: ["可", "能", "性"] },

  // Concepts - Freedom/Justice
  { word: "自由", meanings: ["Liberte"], readings: ["じゆう"], mnemonicFr: "LIBERTE - pouvoir agir comme on veut.", targetKanji: ["自", "由"] },
  { word: "平等", meanings: ["Egalite"], readings: ["びょうどう"], mnemonicFr: "EGALITE - meme traitement pour tous.", targetKanji: ["平", "等"] },
  { word: "正義", meanings: ["Justice"], readings: ["せいぎ"], mnemonicFr: "JUSTICE - ce qui est juste et equitable.", targetKanji: ["正", "義"] },
  { word: "真実", meanings: ["Verite", "Realite"], readings: ["しんじつ"], mnemonicFr: "VERITE - ce qui est vrai.", targetKanji: ["真", "実"] },
  { word: "平和", meanings: ["Paix"], readings: ["へいわ"], mnemonicFr: "PAIX - absence de conflit.", targetKanji: ["平", "和"] },
  { word: "自由自在", meanings: ["Librement", "A volonte"], readings: ["じゆうじざい"], mnemonicFr: "LIBREMENT - sans aucune contrainte.", targetKanji: ["自", "由", "在"] },

  // Qualities - Adjective nouns with さ
  { word: "美しさ", meanings: ["Beaute"], readings: ["うつくしさ"], mnemonicFr: "BEAUTE - qualite de ce qui est beau.", targetKanji: ["美"] },
  { word: "強さ", meanings: ["Force", "Puissance"], readings: ["つよさ"], mnemonicFr: "FORCE - qualite de ce qui est fort.", targetKanji: ["強"] },
  { word: "弱さ", meanings: ["Faiblesse"], readings: ["よわさ"], mnemonicFr: "FAIBLESSE - qualite de ce qui est faible.", targetKanji: ["弱"] },
  { word: "大きさ", meanings: ["Taille", "Grandeur"], readings: ["おおきさ"], mnemonicFr: "TAILLE - dimension d'une chose.", targetKanji: ["大"] },
  { word: "高さ", meanings: ["Hauteur"], readings: ["たかさ"], mnemonicFr: "HAUTEUR - dimension verticale.", targetKanji: ["高"] },
  { word: "長さ", meanings: ["Longueur"], readings: ["ながさ"], mnemonicFr: "LONGUEUR - dimension horizontale.", targetKanji: ["長"] },
  { word: "深さ", meanings: ["Profondeur"], readings: ["ふかさ"], mnemonicFr: "PROFONDEUR - distance vers le bas.", targetKanji: ["深"] },
  { word: "広さ", meanings: ["Largeur", "Etendue"], readings: ["ひろさ"], mnemonicFr: "LARGEUR - dimension de l'espace.", targetKanji: ["広"] },
  { word: "重さ", meanings: ["Poids"], readings: ["おもさ"], mnemonicFr: "POIDS - mesure de la masse.", targetKanji: ["重"] },
  { word: "明るさ", meanings: ["Luminosite", "Clarte"], readings: ["あかるさ"], mnemonicFr: "LUMINOSITE - quantite de lumiere.", targetKanji: ["明"] },
];

const vocabPart2 = [
  // Situations - Danger/Safety
  { word: "危険", meanings: ["Danger", "Risque"], readings: ["きけん"], mnemonicFr: "DANGER - situation perilleuse.", targetKanji: ["危", "険"] },
  { word: "安全", meanings: ["Securite", "Surete"], readings: ["あんぜん"], mnemonicFr: "SECURITE - absence de danger.", targetKanji: ["安", "全"] },
  { word: "困難", meanings: ["Difficulte", "Epreuve"], readings: ["こんなん"], mnemonicFr: "DIFFICULTE - ce qui est dur a faire.", targetKanji: ["困", "難"] },
  { word: "容易", meanings: ["Facile", "Aise"], readings: ["ようい"], mnemonicFr: "FACILE - qui ne demande pas d'effort.", targetKanji: ["容", "易"] },
  { word: "危ない", meanings: ["Dangereux"], readings: ["あぶない"], mnemonicFr: "DANGEREUX - qui presente un danger.", targetKanji: ["危"] },
  { word: "安心", meanings: ["Tranquillite d'esprit"], readings: ["あんしん"], mnemonicFr: "TRANQUILLITE - etre rassure.", targetKanji: ["安", "心"] },

  // Mental states - Consciousness
  { word: "意識", meanings: ["Conscience", "Connaissance"], readings: ["いしき"], mnemonicFr: "CONSCIENCE - etat d'eveil mental.", targetKanji: ["意", "識"] },
  { word: "無意識", meanings: ["Inconscience", "Subconscient"], readings: ["むいしき"], mnemonicFr: "INCONSCIENCE - sans conscience.", targetKanji: ["無", "意", "識"] },
  { word: "記憶", meanings: ["Memoire", "Souvenir"], readings: ["きおく"], mnemonicFr: "MEMOIRE - capacite de se souvenir.", targetKanji: ["記", "憶"] },
  { word: "想像", meanings: ["Imagination"], readings: ["そうぞう"], mnemonicFr: "IMAGINATION - creer des images dans l'esprit.", targetKanji: ["想", "像"] },
  { word: "思考", meanings: ["Pensee", "Reflexion"], readings: ["しこう"], mnemonicFr: "PENSEE - activite de l'esprit.", targetKanji: ["思", "考"] },
  { word: "理解", meanings: ["Comprehension"], readings: ["りかい"], mnemonicFr: "COMPREHENSION - saisir le sens.", targetKanji: ["理", "解"] },
  { word: "判断", meanings: ["Jugement", "Decision"], readings: ["はんだん"], mnemonicFr: "JUGEMENT - former une opinion.", targetKanji: ["判", "断"] },

  // Emotions - Love/Hate
  { word: "愛", meanings: ["Amour"], readings: ["あい"], mnemonicFr: "AMOUR - sentiment d'affection profonde.", targetKanji: ["愛"] },
  { word: "愛情", meanings: ["Affection", "Tendresse"], readings: ["あいじょう"], mnemonicFr: "AFFECTION - sentiment d'amour tendre.", targetKanji: ["愛", "情"] },
  { word: "恋", meanings: ["Amour romantique"], readings: ["こい"], mnemonicFr: "AMOUR - passion amoureuse.", targetKanji: ["恋"] },
  { word: "恋愛", meanings: ["Romance", "Amour"], readings: ["れんあい"], mnemonicFr: "ROMANCE - relation amoureuse.", targetKanji: ["恋", "愛"] },
  { word: "憎む", meanings: ["Hair", "Detester"], readings: ["にくむ"], mnemonicFr: "HAIR - eprouver de la haine.", targetKanji: ["憎"] },
  { word: "憎しみ", meanings: ["Haine", "Aversion"], readings: ["にくしみ"], mnemonicFr: "HAINE - sentiment de repulsion.", targetKanji: ["憎"] },

  // States - Worry/Peace
  { word: "心配", meanings: ["Inquietude", "Souci"], readings: ["しんぱい"], mnemonicFr: "INQUIETUDE - se faire du souci.", targetKanji: ["心", "配"] },
  { word: "不安", meanings: ["Anxiete", "Inquietude"], readings: ["ふあん"], mnemonicFr: "ANXIETE - sentiment d'insecurite.", targetKanji: ["不", "安"] },
  { word: "恐怖", meanings: ["Peur", "Terreur"], readings: ["きょうふ"], mnemonicFr: "PEUR - sentiment de crainte intense.", targetKanji: ["恐", "怖"] },
  { word: "恐い", meanings: ["Effrayant", "Terrifiant"], readings: ["こわい"], mnemonicFr: "EFFRAYANT - qui fait peur.", targetKanji: ["恐"] },
  { word: "怖い", meanings: ["Avoir peur", "Effrayant"], readings: ["こわい"], mnemonicFr: "AVOIR PEUR - craindre quelque chose.", targetKanji: ["怖"] },
  { word: "落ち着く", meanings: ["Se calmer", "Se detendre"], readings: ["おちつく"], mnemonicFr: "SE CALMER - retrouver son calme.", targetKanji: ["落", "着"] },

  // Abstract concepts - Time
  { word: "過去", meanings: ["Passe"], readings: ["かこ"], mnemonicFr: "PASSE - ce qui s'est deja produit.", targetKanji: ["過", "去"] },
  { word: "現在", meanings: ["Present", "Actuel"], readings: ["げんざい"], mnemonicFr: "PRESENT - le moment actuel.", targetKanji: ["現", "在"] },
  { word: "将来", meanings: ["Avenir", "Futur"], readings: ["しょうらい"], mnemonicFr: "AVENIR - ce qui va arriver.", targetKanji: ["将", "来"] },
  { word: "未来", meanings: ["Futur"], readings: ["みらい"], mnemonicFr: "FUTUR - temps a venir.", targetKanji: ["未", "来"] },
  { word: "永遠", meanings: ["Eternite"], readings: ["えいえん"], mnemonicFr: "ETERNITE - duree sans fin.", targetKanji: ["永", "遠"] },
  { word: "瞬間", meanings: ["Instant", "Moment"], readings: ["しゅんかん"], mnemonicFr: "INSTANT - tres court moment.", targetKanji: ["瞬", "間"] },

  // States - Energy/Fatigue
  { word: "元気", meanings: ["Energie", "Vitalite"], readings: ["げんき"], mnemonicFr: "ENERGIE - force vitale.", targetKanji: ["元", "気"] },
  { word: "疲れ", meanings: ["Fatigue"], readings: ["つかれ"], mnemonicFr: "FATIGUE - etat d'epuisement.", targetKanji: ["疲"] },
  { word: "疲れる", meanings: ["Se fatiguer", "Etre epuise"], readings: ["つかれる"], mnemonicFr: "SE FATIGUER - perdre ses forces.", targetKanji: ["疲"] },
  { word: "休息", meanings: ["Repos"], readings: ["きゅうそく"], mnemonicFr: "REPOS - cesser toute activite.", targetKanji: ["休", "息"] },
  { word: "活力", meanings: ["Vitalite", "Dynamisme"], readings: ["かつりょく"], mnemonicFr: "VITALITE - energie de vie.", targetKanji: ["活", "力"] },
];

const vocabPart3 = [
  // Mental qualities
  { word: "知恵", meanings: ["Sagesse", "Intelligence"], readings: ["ちえ"], mnemonicFr: "SAGESSE - capacite de bien juger.", targetKanji: ["知", "恵"] },
  { word: "知識", meanings: ["Connaissance", "Savoir"], readings: ["ちしき"], mnemonicFr: "CONNAISSANCE - ce qu'on sait.", targetKanji: ["知", "識"] },
  { word: "経験", meanings: ["Experience"], readings: ["けいけん"], mnemonicFr: "EXPERIENCE - vecu personnel.", targetKanji: ["経", "験"] },
  { word: "能力", meanings: ["Capacite", "Aptitude"], readings: ["のうりょく"], mnemonicFr: "CAPACITE - ce qu'on peut faire.", targetKanji: ["能", "力"] },
  { word: "才能", meanings: ["Talent", "Don"], readings: ["さいのう"], mnemonicFr: "TALENT - aptitude naturelle.", targetKanji: ["才", "能"] },
  { word: "技術", meanings: ["Technique", "Competence"], readings: ["ぎじゅつ"], mnemonicFr: "TECHNIQUE - savoir-faire.", targetKanji: ["技", "術"] },

  // Character traits
  { word: "性格", meanings: ["Personnalite", "Caractere"], readings: ["せいかく"], mnemonicFr: "PERSONNALITE - traits de caractere.", targetKanji: ["性", "格"] },
  { word: "優しい", meanings: ["Gentil", "Doux"], readings: ["やさしい"], mnemonicFr: "GENTIL - qui est bienveillant.", targetKanji: ["優"] },
  { word: "優しさ", meanings: ["Gentillesse", "Douceur"], readings: ["やさしさ"], mnemonicFr: "GENTILLESSE - qualite d'etre gentil.", targetKanji: ["優"] },
  { word: "厳しい", meanings: ["Severe", "Strict"], readings: ["きびしい"], mnemonicFr: "SEVERE - qui est exigeant.", targetKanji: ["厳"] },
  { word: "厳しさ", meanings: ["Severite", "Rigueur"], readings: ["きびしさ"], mnemonicFr: "SEVERITE - qualite d'etre strict.", targetKanji: ["厳"] },
  { word: "勇気", meanings: ["Courage", "Bravoure"], readings: ["ゆうき"], mnemonicFr: "COURAGE - force face au danger.", targetKanji: ["勇", "気"] },
  { word: "勇敢", meanings: ["Brave", "Vaillant"], readings: ["ゆうかん"], mnemonicFr: "BRAVE - qui a du courage.", targetKanji: ["勇", "敢"] },

  // Emotions - Complex
  { word: "嫉妬", meanings: ["Jalousie", "Envie"], readings: ["しっと"], mnemonicFr: "JALOUSIE - envie de ce que l'autre a.", targetKanji: ["嫉", "妬"] },
  { word: "後悔", meanings: ["Regret", "Remords"], readings: ["こうかい"], mnemonicFr: "REGRET - regretter une action passee.", targetKanji: ["後", "悔"] },
  { word: "満足", meanings: ["Satisfaction"], readings: ["まんぞく"], mnemonicFr: "SATISFACTION - contentement complet.", targetKanji: ["満", "足"] },
  { word: "不満", meanings: ["Mecontentement", "Insatisfaction"], readings: ["ふまん"], mnemonicFr: "MECONTENTEMENT - ne pas etre satisfait.", targetKanji: ["不", "満"] },
  { word: "期待", meanings: ["Attente", "Espoir"], readings: ["きたい"], mnemonicFr: "ATTENTE - esperer quelque chose.", targetKanji: ["期", "待"] },
  { word: "失望", meanings: ["Deception", "Desillusion"], readings: ["しつぼう"], mnemonicFr: "DECEPTION - perdre espoir.", targetKanji: ["失", "望"] },
  { word: "希望", meanings: ["Espoir", "Souhait"], readings: ["きぼう"], mnemonicFr: "ESPOIR - desir pour l'avenir.", targetKanji: ["希", "望"] },
  { word: "絶望", meanings: ["Desespoir"], readings: ["ぜつぼう"], mnemonicFr: "DESESPOIR - perte totale d'espoir.", targetKanji: ["絶", "望"] },

  // States - Mental
  { word: "集中", meanings: ["Concentration"], readings: ["しゅうちゅう"], mnemonicFr: "CONCENTRATION - focaliser son attention.", targetKanji: ["集", "中"] },
  { word: "緊張", meanings: ["Tension", "Nerveux"], readings: ["きんちょう"], mnemonicFr: "TENSION - etat de stress.", targetKanji: ["緊", "張"] },
  { word: "興奮", meanings: ["Excitation", "Agitation"], readings: ["こうふん"], mnemonicFr: "EXCITATION - etat d'agitation.", targetKanji: ["興", "奮"] },
  { word: "冷静", meanings: ["Calme", "Sang-froid"], readings: ["れいせい"], mnemonicFr: "CALME - garder son sang-froid.", targetKanji: ["冷", "静"] },
  { word: "混乱", meanings: ["Confusion", "Desordre"], readings: ["こんらん"], mnemonicFr: "CONFUSION - etat de desordre mental.", targetKanji: ["混", "乱"] },

  // Abstract - Truth/Lies
  { word: "事実", meanings: ["Fait", "Realite"], readings: ["じじつ"], mnemonicFr: "FAIT - ce qui est reel.", targetKanji: ["事", "実"] },
  { word: "嘘", meanings: ["Mensonge"], readings: ["うそ"], mnemonicFr: "MENSONGE - ce qui n'est pas vrai.", targetKanji: ["嘘"] },
  { word: "本当", meanings: ["Vrai", "Reel"], readings: ["ほんとう"], mnemonicFr: "VRAI - ce qui est authentique.", targetKanji: ["本", "当"] },
  { word: "正直", meanings: ["Honnete", "Franc"], readings: ["しょうじき"], mnemonicFr: "HONNETE - qui dit la verite.", targetKanji: ["正", "直"] },
  { word: "誠実", meanings: ["Sincere", "Loyal"], readings: ["せいじつ"], mnemonicFr: "SINCERE - qui est authentique.", targetKanji: ["誠", "実"] },

  // Concepts - Right/Wrong
  { word: "正しい", meanings: ["Correct", "Juste"], readings: ["ただしい"], mnemonicFr: "CORRECT - qui est exact.", targetKanji: ["正"] },
  { word: "間違い", meanings: ["Erreur", "Faute"], readings: ["まちがい"], mnemonicFr: "ERREUR - ce qui n'est pas juste.", targetKanji: ["間", "違"] },
  { word: "失敗", meanings: ["Echec"], readings: ["しっぱい"], mnemonicFr: "ECHEC - ne pas atteindre son but.", targetKanji: ["失", "敗"] },
  { word: "反省", meanings: ["Reflexion", "Introspection"], readings: ["はんせい"], mnemonicFr: "REFLEXION - examiner ses actions.", targetKanji: ["反", "省"] },
];

const vocabPart4 = [
  // Emotions - Surprise/Interest
  { word: "驚き", meanings: ["Surprise", "Etonnement"], readings: ["おどろき"], mnemonicFr: "SURPRISE - reaction inattendue.", targetKanji: ["驚"] },
  { word: "驚く", meanings: ["Etre surpris", "S'etonner"], readings: ["おどろく"], mnemonicFr: "ETRE SURPRIS - reagir a l'inattendu.", targetKanji: ["驚"] },
  { word: "興味", meanings: ["Interet", "Curiosite"], readings: ["きょうみ"], mnemonicFr: "INTERET - attention portee a quelque chose.", targetKanji: ["興", "味"] },
  { word: "好奇心", meanings: ["Curiosite"], readings: ["こうきしん"], mnemonicFr: "CURIOSITE - desir de savoir.", targetKanji: ["好", "奇", "心"] },
  { word: "退屈", meanings: ["Ennui"], readings: ["たいくつ"], mnemonicFr: "ENNUI - manque d'interet.", targetKanji: ["退", "屈"] },

  // States - Pride/Shame
  { word: "誇り", meanings: ["Fierte", "Orgueil"], readings: ["ほこり"], mnemonicFr: "FIERTE - satisfaction de soi.", targetKanji: ["誇"] },
  { word: "恥", meanings: ["Honte"], readings: ["はじ"], mnemonicFr: "HONTE - sentiment de gene.", targetKanji: ["恥"] },
  { word: "恥ずかしい", meanings: ["Avoir honte", "Embarrasse"], readings: ["はずかしい"], mnemonicFr: "AVOIR HONTE - se sentir gene.", targetKanji: ["恥"] },
  { word: "自信", meanings: ["Confiance en soi"], readings: ["じしん"], mnemonicFr: "CONFIANCE EN SOI - croire en ses capacites.", targetKanji: ["自", "信"] },
  { word: "謙虚", meanings: ["Humble", "Modeste"], readings: ["けんきょ"], mnemonicFr: "HUMBLE - qui ne se vante pas.", targetKanji: ["謙", "虚"] },

  // Abstract - Change
  { word: "変化", meanings: ["Changement", "Transformation"], readings: ["へんか"], mnemonicFr: "CHANGEMENT - devenir different.", targetKanji: ["変", "化"] },
  { word: "進歩", meanings: ["Progres"], readings: ["しんぽ"], mnemonicFr: "PROGRES - amelioration continue.", targetKanji: ["進", "歩"] },
  { word: "発展", meanings: ["Developpement", "Expansion"], readings: ["はってん"], mnemonicFr: "DEVELOPPEMENT - croissance.", targetKanji: ["発", "展"] },
  { word: "成長", meanings: ["Croissance", "Developpement"], readings: ["せいちょう"], mnemonicFr: "CROISSANCE - grandir, evoluer.", targetKanji: ["成", "長"] },
  { word: "衰退", meanings: ["Declin", "Decadence"], readings: ["すいたい"], mnemonicFr: "DECLIN - perdre de la force.", targetKanji: ["衰", "退"] },

  // Concepts - Existence
  { word: "存在", meanings: ["Existence"], readings: ["そんざい"], mnemonicFr: "EXISTENCE - fait d'exister.", targetKanji: ["存", "在"] },
  { word: "生命", meanings: ["Vie"], readings: ["せいめい"], mnemonicFr: "VIE - etat d'etre vivant.", targetKanji: ["生", "命"] },
  { word: "死", meanings: ["Mort"], readings: ["し"], mnemonicFr: "MORT - fin de la vie.", targetKanji: ["死"] },
  { word: "運命", meanings: ["Destin", "Destinee"], readings: ["うんめい"], mnemonicFr: "DESTIN - ce qui doit arriver.", targetKanji: ["運", "命"] },
  { word: "人生", meanings: ["Vie humaine"], readings: ["じんせい"], mnemonicFr: "VIE - existence d'une personne.", targetKanji: ["人", "生"] },

  // States - Social
  { word: "関係", meanings: ["Relation", "Rapport"], readings: ["かんけい"], mnemonicFr: "RELATION - lien entre personnes.", targetKanji: ["関", "係"] },
  { word: "友情", meanings: ["Amitie"], readings: ["ゆうじょう"], mnemonicFr: "AMITIE - sentiment entre amis.", targetKanji: ["友", "情"] },
  { word: "信頼", meanings: ["Confiance"], readings: ["しんらい"], mnemonicFr: "CONFIANCE - croire en quelqu'un.", targetKanji: ["信", "頼"] },
  { word: "尊敬", meanings: ["Respect", "Estime"], readings: ["そんけい"], mnemonicFr: "RESPECT - considerer avec estime.", targetKanji: ["尊", "敬"] },
  { word: "軽蔑", meanings: ["Mepris", "Dedain"], readings: ["けいべつ"], mnemonicFr: "MEPRIS - considerer comme inferieur.", targetKanji: ["軽", "蔑"] },

  // Emotions - Loneliness
  { word: "孤独", meanings: ["Solitude"], readings: ["こどく"], mnemonicFr: "SOLITUDE - etat d'etre seul.", targetKanji: ["孤", "独"] },
  { word: "寂しい", meanings: ["Seul", "Triste"], readings: ["さびしい"], mnemonicFr: "SEUL - qui ressent la solitude.", targetKanji: ["寂"] },
  { word: "寂しさ", meanings: ["Solitude", "Melancolie"], readings: ["さびしさ"], mnemonicFr: "SOLITUDE - sentiment d'etre seul.", targetKanji: ["寂"] },
  { word: "懐かしい", meanings: ["Nostalgique"], readings: ["なつかしい"], mnemonicFr: "NOSTALGIQUE - qui rappelle le passe.", targetKanji: ["懐"] },

  // Abstract - Value
  { word: "価値", meanings: ["Valeur"], readings: ["かち"], mnemonicFr: "VALEUR - importance de quelque chose.", targetKanji: ["価", "値"] },
  { word: "意味", meanings: ["Sens", "Signification"], readings: ["いみ"], mnemonicFr: "SENS - ce que quelque chose veut dire.", targetKanji: ["意", "味"] },
  { word: "目的", meanings: ["But", "Objectif"], readings: ["もくてき"], mnemonicFr: "BUT - ce qu'on veut atteindre.", targetKanji: ["目", "的"] },
  { word: "理由", meanings: ["Raison", "Motif"], readings: ["りゆう"], mnemonicFr: "RAISON - pourquoi quelque chose.", targetKanji: ["理", "由"] },
  { word: "原因", meanings: ["Cause"], readings: ["げんいん"], mnemonicFr: "CAUSE - ce qui produit un effet.", targetKanji: ["原", "因"] },
  { word: "結果", meanings: ["Resultat", "Consequence"], readings: ["けっか"], mnemonicFr: "RESULTAT - ce qui decoule d'une cause.", targetKanji: ["結", "果"] },
];

const vocabPart5 = [
  // Emotions - Attachment
  { word: "執着", meanings: ["Attachement", "Obsession"], readings: ["しゅうちゃく"], mnemonicFr: "ATTACHEMENT - s'accrocher a quelque chose.", targetKanji: ["執", "着"] },
  { word: "依存", meanings: ["Dependance"], readings: ["いぞん"], mnemonicFr: "DEPENDANCE - avoir besoin de quelque chose.", targetKanji: ["依", "存"] },
  { word: "欲望", meanings: ["Desir", "Envie"], readings: ["よくぼう"], mnemonicFr: "DESIR - envie intense.", targetKanji: ["欲", "望"] },
  { word: "欲", meanings: ["Desir", "Avidite"], readings: ["よく"], mnemonicFr: "DESIR - vouloir quelque chose.", targetKanji: ["欲"] },

  // States - Mind
  { word: "精神", meanings: ["Esprit", "Mental"], readings: ["せいしん"], mnemonicFr: "ESPRIT - l'ame, le mental.", targetKanji: ["精", "神"] },
  { word: "心理", meanings: ["Psychologie"], readings: ["しんり"], mnemonicFr: "PSYCHOLOGIE - etude de l'esprit.", targetKanji: ["心", "理"] },
  { word: "気持ち", meanings: ["Sentiment", "Humeur"], readings: ["きもち"], mnemonicFr: "SENTIMENT - ce qu'on ressent.", targetKanji: ["気", "持"] },
  { word: "気分", meanings: ["Humeur", "Disposition"], readings: ["きぶん"], mnemonicFr: "HUMEUR - etat d'esprit du moment.", targetKanji: ["気", "分"] },
  { word: "機嫌", meanings: ["Humeur", "Disposition"], readings: ["きげん"], mnemonicFr: "HUMEUR - disposition d'esprit.", targetKanji: ["機", "嫌"] },

  // Abstract - Quality
  { word: "品質", meanings: ["Qualite"], readings: ["ひんしつ"], mnemonicFr: "QUALITE - niveau d'excellence.", targetKanji: ["品", "質"] },
  { word: "特徴", meanings: ["Caracteristique"], readings: ["とくちょう"], mnemonicFr: "CARACTERISTIQUE - trait distinctif.", targetKanji: ["特", "徴"] },
  { word: "性質", meanings: ["Nature", "Propriete"], readings: ["せいしつ"], mnemonicFr: "NATURE - qualite inherente.", targetKanji: ["性", "質"] },
  { word: "本質", meanings: ["Essence"], readings: ["ほんしつ"], mnemonicFr: "ESSENCE - nature fondamentale.", targetKanji: ["本", "質"] },

  // Concepts - Society
  { word: "社会", meanings: ["Societe"], readings: ["しゃかい"], mnemonicFr: "SOCIETE - ensemble des personnes.", targetKanji: ["社", "会"] },
  { word: "文化", meanings: ["Culture"], readings: ["ぶんか"], mnemonicFr: "CULTURE - ensemble des traditions.", targetKanji: ["文", "化"] },
  { word: "伝統", meanings: ["Tradition"], readings: ["でんとう"], mnemonicFr: "TRADITION - coutume transmise.", targetKanji: ["伝", "統"] },
  { word: "習慣", meanings: ["Habitude", "Coutume"], readings: ["しゅうかん"], mnemonicFr: "HABITUDE - comportement regulier.", targetKanji: ["習", "慣"] },
  { word: "常識", meanings: ["Sens commun"], readings: ["じょうしき"], mnemonicFr: "SENS COMMUN - connaissance partagee.", targetKanji: ["常", "識"] },

  // States - Acceptance
  { word: "受け入れ", meanings: ["Acceptation"], readings: ["うけいれ"], mnemonicFr: "ACCEPTATION - accepter quelque chose.", targetKanji: ["受", "入"] },
  { word: "拒否", meanings: ["Refus", "Rejet"], readings: ["きょひ"], mnemonicFr: "REFUS - ne pas accepter.", targetKanji: ["拒", "否"] },
  { word: "許可", meanings: ["Permission", "Autorisation"], readings: ["きょか"], mnemonicFr: "PERMISSION - donner le droit.", targetKanji: ["許", "可"] },
  { word: "禁止", meanings: ["Interdiction"], readings: ["きんし"], mnemonicFr: "INTERDICTION - ne pas permettre.", targetKanji: ["禁", "止"] },

  // Emotions - Envy/Desire
  { word: "羨望", meanings: ["Envie", "Convoitise"], readings: ["せんぼう"], mnemonicFr: "ENVIE - desirer ce que l'autre a.", targetKanji: ["羨", "望"] },
  { word: "羨ましい", meanings: ["Envieux", "Jaloux"], readings: ["うらやましい"], mnemonicFr: "ENVIEUX - qui desire ce que l'autre a.", targetKanji: ["羨"] },
  { word: "願望", meanings: ["Souhait", "Aspiration"], readings: ["がんぼう"], mnemonicFr: "SOUHAIT - ce qu'on desire.", targetKanji: ["願", "望"] },
  { word: "願い", meanings: ["Voeu", "Souhait"], readings: ["ねがい"], mnemonicFr: "VOEU - ce qu'on espere.", targetKanji: ["願"] },

  // Abstract - Thought
  { word: "考え", meanings: ["Pensee", "Idee"], readings: ["かんがえ"], mnemonicFr: "PENSEE - ce qu'on pense.", targetKanji: ["考"] },
  { word: "意見", meanings: ["Opinion", "Avis"], readings: ["いけん"], mnemonicFr: "OPINION - point de vue personnel.", targetKanji: ["意", "見"] },
  { word: "観点", meanings: ["Point de vue"], readings: ["かんてん"], mnemonicFr: "POINT DE VUE - perspective.", targetKanji: ["観", "点"] },
  { word: "立場", meanings: ["Position", "Point de vue"], readings: ["たちば"], mnemonicFr: "POSITION - situation sociale.", targetKanji: ["立", "場"] },

  // States - Determination
  { word: "決意", meanings: ["Resolution", "Determination"], readings: ["けつい"], mnemonicFr: "RESOLUTION - decision ferme.", targetKanji: ["決", "意"] },
  { word: "決心", meanings: ["Decision", "Resolution"], readings: ["けっしん"], mnemonicFr: "DECISION - se decider fermement.", targetKanji: ["決", "心"] },
  { word: "覚悟", meanings: ["Resolution", "Preparation mentale"], readings: ["かくご"], mnemonicFr: "RESOLUTION - etre pret mentalement.", targetKanji: ["覚", "悟"] },
  { word: "努力", meanings: ["Effort"], readings: ["どりょく"], mnemonicFr: "EFFORT - travail acharne.", targetKanji: ["努", "力"] },
  { word: "忍耐", meanings: ["Patience", "Perseverance"], readings: ["にんたい"], mnemonicFr: "PATIENCE - supporter avec calme.", targetKanji: ["忍", "耐"] },
];

const vocabPart6 = [
  // Emotions - Comfort
  { word: "安らぎ", meanings: ["Serenite", "Paix"], readings: ["やすらぎ"], mnemonicFr: "SERENITE - etat de calme profond.", targetKanji: ["安"] },
  { word: "癒し", meanings: ["Guerison", "Reconfort"], readings: ["いやし"], mnemonicFr: "GUERISON - processus de recuperation.", targetKanji: ["癒"] },
  { word: "慰め", meanings: ["Consolation", "Reconfort"], readings: ["なぐさめ"], mnemonicFr: "CONSOLATION - soulager la peine.", targetKanji: ["慰"] },
  { word: "励まし", meanings: ["Encouragement"], readings: ["はげまし"], mnemonicFr: "ENCOURAGEMENT - donner du courage.", targetKanji: ["励"] },

  // Abstract - Luck/Fate
  { word: "運", meanings: ["Chance", "Destin"], readings: ["うん"], mnemonicFr: "CHANCE - ce qui arrive par hasard.", targetKanji: ["運"] },
  { word: "幸運", meanings: ["Bonne chance"], readings: ["こううん"], mnemonicFr: "BONNE CHANCE - fortune favorable.", targetKanji: ["幸", "運"] },
  { word: "不運", meanings: ["Malchance"], readings: ["ふうん"], mnemonicFr: "MALCHANCE - fortune defavorable.", targetKanji: ["不", "運"] },
  { word: "偶然", meanings: ["Hasard", "Coincidence"], readings: ["ぐうぜん"], mnemonicFr: "HASARD - ce qui arrive par chance.", targetKanji: ["偶", "然"] },
  { word: "必然", meanings: ["Inevitable", "Necessaire"], readings: ["ひつぜん"], mnemonicFr: "INEVITABLE - qui doit arriver.", targetKanji: ["必", "然"] },

  // States - Difficulty
  { word: "苦労", meanings: ["Peine", "Difficulte"], readings: ["くろう"], mnemonicFr: "PEINE - effort difficile.", targetKanji: ["苦", "労"] },
  { word: "苦しみ", meanings: ["Souffrance"], readings: ["くるしみ"], mnemonicFr: "SOUFFRANCE - douleur physique ou mentale.", targetKanji: ["苦"] },
  { word: "苦しい", meanings: ["Penible", "Douloureux"], readings: ["くるしい"], mnemonicFr: "PENIBLE - qui cause de la peine.", targetKanji: ["苦"] },
  { word: "辛い", meanings: ["Difficile", "Penible"], readings: ["つらい"], mnemonicFr: "DIFFICILE - qui est dur a supporter.", targetKanji: ["辛"] },
  { word: "楽", meanings: ["Facile", "Confortable"], readings: ["らく"], mnemonicFr: "FACILE - qui ne demande pas d'effort.", targetKanji: ["楽"] },

  // Concepts - Time perception
  { word: "一瞬", meanings: ["Un instant"], readings: ["いっしゅん"], mnemonicFr: "UN INSTANT - tres court moment.", targetKanji: ["一", "瞬"] },
  { word: "永久", meanings: ["Eternel", "Permanent"], readings: ["えいきゅう"], mnemonicFr: "ETERNEL - qui dure toujours.", targetKanji: ["永", "久"] },
  { word: "一時的", meanings: ["Temporaire"], readings: ["いちじてき"], mnemonicFr: "TEMPORAIRE - qui ne dure pas.", targetKanji: ["一", "時", "的"] },
  { word: "継続", meanings: ["Continuation"], readings: ["けいぞく"], mnemonicFr: "CONTINUATION - ne pas s'arreter.", targetKanji: ["継", "続"] },

  // Abstract - Knowledge
  { word: "学問", meanings: ["Etude", "Savoir"], readings: ["がくもん"], mnemonicFr: "ETUDE - acquisition de connaissances.", targetKanji: ["学", "問"] },
  { word: "理論", meanings: ["Theorie"], readings: ["りろん"], mnemonicFr: "THEORIE - explication systematique.", targetKanji: ["理", "論"] },
  { word: "実践", meanings: ["Pratique"], readings: ["じっせん"], mnemonicFr: "PRATIQUE - mise en application.", targetKanji: ["実", "践"] },
  { word: "発見", meanings: ["Decouverte"], readings: ["はっけん"], mnemonicFr: "DECOUVERTE - trouver quelque chose de nouveau.", targetKanji: ["発", "見"] },
  { word: "発明", meanings: ["Invention"], readings: ["はつめい"], mnemonicFr: "INVENTION - creer quelque chose de nouveau.", targetKanji: ["発", "明"] },

  // Emotions - Admiration
  { word: "尊敬", meanings: ["Respect", "Admiration"], readings: ["そんけい"], mnemonicFr: "RESPECT - tenir en haute estime.", targetKanji: ["尊", "敬"] },
  { word: "敬意", meanings: ["Respect", "Deference"], readings: ["けいい"], mnemonicFr: "RESPECT - sentiment de consideration.", targetKanji: ["敬", "意"] },
  { word: "感嘆", meanings: ["Admiration", "Emerveillement"], readings: ["かんたん"], mnemonicFr: "ADMIRATION - etre emerveille.", targetKanji: ["感", "嘆"] },

  // States - Balance
  { word: "均衡", meanings: ["Equilibre", "Balance"], readings: ["きんこう"], mnemonicFr: "EQUILIBRE - etat de balance.", targetKanji: ["均", "衡"] },
  { word: "調和", meanings: ["Harmonie"], readings: ["ちょうわ"], mnemonicFr: "HARMONIE - accord parfait.", targetKanji: ["調", "和"] },
  { word: "安定", meanings: ["Stabilite"], readings: ["あんてい"], mnemonicFr: "STABILITE - etat stable.", targetKanji: ["安", "定"] },
  { word: "不安定", meanings: ["Instabilite"], readings: ["ふあんてい"], mnemonicFr: "INSTABILITE - manque de stabilite.", targetKanji: ["不", "安", "定"] },

  // Abstract - Appearance
  { word: "外見", meanings: ["Apparence exterieure"], readings: ["がいけん"], mnemonicFr: "APPARENCE - ce qu'on voit de l'exterieur.", targetKanji: ["外", "見"] },
  { word: "内面", meanings: ["Interieur", "Aspect interne"], readings: ["ないめん"], mnemonicFr: "INTERIEUR - ce qui est a l'interieur.", targetKanji: ["内", "面"] },
  { word: "表面", meanings: ["Surface"], readings: ["ひょうめん"], mnemonicFr: "SURFACE - partie exterieure.", targetKanji: ["表", "面"] },
  { word: "本音", meanings: ["Vraies pensees"], readings: ["ほんね"], mnemonicFr: "VRAIES PENSEES - ce qu'on pense vraiment.", targetKanji: ["本", "音"] },
  { word: "建前", meanings: ["Apparences", "Facade"], readings: ["たてまえ"], mnemonicFr: "FACADE - ce qu'on montre aux autres.", targetKanji: ["建", "前"] },
];

const vocabPart7 = [
  // Emotions - Complex feelings
  { word: "複雑", meanings: ["Complexe", "Complique"], readings: ["ふくざつ"], mnemonicFr: "COMPLEXE - difficile a comprendre.", targetKanji: ["複", "雑"] },
  { word: "単純", meanings: ["Simple"], readings: ["たんじゅん"], mnemonicFr: "SIMPLE - facile a comprendre.", targetKanji: ["単", "純"] },
  { word: "矛盾", meanings: ["Contradiction"], readings: ["むじゅん"], mnemonicFr: "CONTRADICTION - idees opposees.", targetKanji: ["矛", "盾"] },
  { word: "葛藤", meanings: ["Conflit interieur"], readings: ["かっとう"], mnemonicFr: "CONFLIT - lutte interieure.", targetKanji: ["葛", "藤"] },

  // States - Growth
  { word: "成熟", meanings: ["Maturite"], readings: ["せいじゅく"], mnemonicFr: "MATURITE - etat adulte.", targetKanji: ["成", "熟"] },
  { word: "未熟", meanings: ["Immature"], readings: ["みじゅく"], mnemonicFr: "IMMATURE - pas encore mature.", targetKanji: ["未", "熟"] },
  { word: "向上", meanings: ["Amelioration"], readings: ["こうじょう"], mnemonicFr: "AMELIORATION - devenir meilleur.", targetKanji: ["向", "上"] },
  { word: "退化", meanings: ["Degeneration"], readings: ["たいか"], mnemonicFr: "DEGENERATION - devenir moins bon.", targetKanji: ["退", "化"] },

  // Abstract - Limits
  { word: "限界", meanings: ["Limite"], readings: ["げんかい"], mnemonicFr: "LIMITE - point qu'on ne peut depasser.", targetKanji: ["限", "界"] },
  { word: "無限", meanings: ["Infini"], readings: ["むげん"], mnemonicFr: "INFINI - sans limite.", targetKanji: ["無", "限"] },
  { word: "境界", meanings: ["Frontiere", "Limite"], readings: ["きょうかい"], mnemonicFr: "FRONTIERE - ligne de separation.", targetKanji: ["境", "界"] },
  { word: "制限", meanings: ["Restriction"], readings: ["せいげん"], mnemonicFr: "RESTRICTION - limitation imposee.", targetKanji: ["制", "限"] },

  // Concepts - Morality
  { word: "道徳", meanings: ["Morale", "Ethique"], readings: ["どうとく"], mnemonicFr: "MORALE - principes du bien et du mal.", targetKanji: ["道", "徳"] },
  { word: "善", meanings: ["Bien", "Bonte"], readings: ["ぜん"], mnemonicFr: "BIEN - ce qui est moralement bon.", targetKanji: ["善"] },
  { word: "悪", meanings: ["Mal", "Mechancete"], readings: ["あく"], mnemonicFr: "MAL - ce qui est moralement mauvais.", targetKanji: ["悪"] },
  { word: "罪", meanings: ["Crime", "Peche"], readings: ["つみ"], mnemonicFr: "CRIME - acte reprehensible.", targetKanji: ["罪"] },
  { word: "罰", meanings: ["Punition"], readings: ["ばつ"], mnemonicFr: "PUNITION - sanction pour une faute.", targetKanji: ["罰"] },

  // Emotions - Relief
  { word: "安堵", meanings: ["Soulagement"], readings: ["あんど"], mnemonicFr: "SOULAGEMENT - liberation d'une inquietude.", targetKanji: ["安", "堵"] },
  { word: "解放", meanings: ["Liberation"], readings: ["かいほう"], mnemonicFr: "LIBERATION - etre libre.", targetKanji: ["解", "放"] },
  { word: "緩和", meanings: ["Detente", "Assouplissement"], readings: ["かんわ"], mnemonicFr: "DETENTE - reduction de la tension.", targetKanji: ["緩", "和"] },

  // States - Stability
  { word: "平静", meanings: ["Calme", "Serenite"], readings: ["へいせい"], mnemonicFr: "CALME - etat paisible.", targetKanji: ["平", "静"] },
  { word: "動揺", meanings: ["Agitation", "Trouble"], readings: ["どうよう"], mnemonicFr: "AGITATION - etat perturbe.", targetKanji: ["動", "揺"] },
  { word: "揺れ", meanings: ["Oscillation", "Balancement"], readings: ["ゆれ"], mnemonicFr: "OSCILLATION - mouvement d'avant en arriere.", targetKanji: ["揺"] },

  // Abstract - Perception
  { word: "認識", meanings: ["Reconnaissance", "Perception"], readings: ["にんしき"], mnemonicFr: "RECONNAISSANCE - percevoir et comprendre.", targetKanji: ["認", "識"] },
  { word: "直感", meanings: ["Intuition"], readings: ["ちょっかん"], mnemonicFr: "INTUITION - connaissance immediate.", targetKanji: ["直", "感"] },
  { word: "予感", meanings: ["Pressentiment"], readings: ["よかん"], mnemonicFr: "PRESSENTIMENT - sentir a l'avance.", targetKanji: ["予", "感"] },
  { word: "第六感", meanings: ["Sixieme sens"], readings: ["だいろっかん"], mnemonicFr: "SIXIEME SENS - perception extrasensorielle.", targetKanji: ["第", "六", "感"] },

  // Concepts - Reality
  { word: "現実", meanings: ["Realite"], readings: ["げんじつ"], mnemonicFr: "REALITE - ce qui existe vraiment.", targetKanji: ["現", "実"] },
  { word: "幻想", meanings: ["Illusion", "Fantasme"], readings: ["げんそう"], mnemonicFr: "ILLUSION - image fausse.", targetKanji: ["幻", "想"] },
  { word: "夢", meanings: ["Reve"], readings: ["ゆめ"], mnemonicFr: "REVE - images pendant le sommeil.", targetKanji: ["夢"] },
  { word: "理想", meanings: ["Ideal"], readings: ["りそう"], mnemonicFr: "IDEAL - modele parfait.", targetKanji: ["理", "想"] },
  { word: "目標", meanings: ["Objectif", "But"], readings: ["もくひょう"], mnemonicFr: "OBJECTIF - ce qu'on vise.", targetKanji: ["目", "標"] },
];

const vocabPart8 = [
  // Emotions - Deep feelings
  { word: "情熱", meanings: ["Passion"], readings: ["じょうねつ"], mnemonicFr: "PASSION - emotion intense.", targetKanji: ["情", "熱"] },
  { word: "熱意", meanings: ["Enthousiasme", "Ardeur"], readings: ["ねつい"], mnemonicFr: "ENTHOUSIASME - energie passionnee.", targetKanji: ["熱", "意"] },
  { word: "意欲", meanings: ["Motivation", "Volonte"], readings: ["いよく"], mnemonicFr: "MOTIVATION - desir d'agir.", targetKanji: ["意", "欲"] },
  { word: "無気力", meanings: ["Apathie", "Lethargie"], readings: ["むきりょく"], mnemonicFr: "APATHIE - manque d'energie.", targetKanji: ["無", "気", "力"] },

  // States - Clarity
  { word: "明確", meanings: ["Clair", "Net"], readings: ["めいかく"], mnemonicFr: "CLAIR - facile a comprendre.", targetKanji: ["明", "確"] },
  { word: "曖昧", meanings: ["Ambigu", "Vague"], readings: ["あいまい"], mnemonicFr: "AMBIGU - pas clair.", targetKanji: ["曖", "昧"] },
  { word: "確信", meanings: ["Conviction", "Certitude"], readings: ["かくしん"], mnemonicFr: "CONVICTION - croyance ferme.", targetKanji: ["確", "信"] },
  { word: "疑問", meanings: ["Doute", "Question"], readings: ["ぎもん"], mnemonicFr: "DOUTE - incertitude.", targetKanji: ["疑", "問"] },
  { word: "疑い", meanings: ["Soupcon", "Doute"], readings: ["うたがい"], mnemonicFr: "SOUPCON - manque de confiance.", targetKanji: ["疑"] },

  // Abstract - Order
  { word: "秩序", meanings: ["Ordre"], readings: ["ちつじょ"], mnemonicFr: "ORDRE - arrangement systematique.", targetKanji: ["秩", "序"] },
  { word: "混沌", meanings: ["Chaos"], readings: ["こんとん"], mnemonicFr: "CHAOS - desordre total.", targetKanji: ["混", "沌"] },
  { word: "規則", meanings: ["Regle", "Reglement"], readings: ["きそく"], mnemonicFr: "REGLE - norme a suivre.", targetKanji: ["規", "則"] },
  { word: "例外", meanings: ["Exception"], readings: ["れいがい"], mnemonicFr: "EXCEPTION - ce qui sort de la regle.", targetKanji: ["例", "外"] },

  // Concepts - Connection
  { word: "結合", meanings: ["Union", "Liaison"], readings: ["けつごう"], mnemonicFr: "UNION - joindre ensemble.", targetKanji: ["結", "合"] },
  { word: "分離", meanings: ["Separation"], readings: ["ぶんり"], mnemonicFr: "SEPARATION - diviser en parties.", targetKanji: ["分", "離"] },
  { word: "統一", meanings: ["Unification"], readings: ["とういつ"], mnemonicFr: "UNIFICATION - reunir en un seul.", targetKanji: ["統", "一"] },
  { word: "独立", meanings: ["Independance"], readings: ["どくりつ"], mnemonicFr: "INDEPENDANCE - ne pas dependre.", targetKanji: ["独", "立"] },

  // Emotions - Empathy
  { word: "共感", meanings: ["Empathie", "Sympathie"], readings: ["きょうかん"], mnemonicFr: "EMPATHIE - comprendre les sentiments d'autrui.", targetKanji: ["共", "感"] },
  { word: "同情", meanings: ["Compassion", "Pitie"], readings: ["どうじょう"], mnemonicFr: "COMPASSION - partager la souffrance.", targetKanji: ["同", "情"] },
  { word: "思いやり", meanings: ["Consideration", "Prevenance"], readings: ["おもいやり"], mnemonicFr: "CONSIDERATION - penser aux autres.", targetKanji: ["思"] },
  { word: "無関心", meanings: ["Indifference"], readings: ["むかんしん"], mnemonicFr: "INDIFFERENCE - ne pas s'interesser.", targetKanji: ["無", "関", "心"] },

  // States - Readiness
  { word: "準備", meanings: ["Preparation"], readings: ["じゅんび"], mnemonicFr: "PREPARATION - se preparer.", targetKanji: ["準", "備"] },
  { word: "用意", meanings: ["Preparation", "Pret"], readings: ["ようい"], mnemonicFr: "PREPARATION - etre pret.", targetKanji: ["用", "意"] },
  { word: "完了", meanings: ["Achevement"], readings: ["かんりょう"], mnemonicFr: "ACHEVEMENT - terminer completement.", targetKanji: ["完", "了"] },
  { word: "未完", meanings: ["Inacheve"], readings: ["みかん"], mnemonicFr: "INACHEVE - pas encore termine.", targetKanji: ["未", "完"] },

  // Abstract - Movement
  { word: "移動", meanings: ["Deplacement"], readings: ["いどう"], mnemonicFr: "DEPLACEMENT - changer de place.", targetKanji: ["移", "動"] },
  { word: "停止", meanings: ["Arret"], readings: ["ていし"], mnemonicFr: "ARRET - cesser de bouger.", targetKanji: ["停", "止"] },
  { word: "前進", meanings: ["Avancee", "Progres"], readings: ["ぜんしん"], mnemonicFr: "AVANCEE - aller de l'avant.", targetKanji: ["前", "進"] },
  { word: "後退", meanings: ["Recul"], readings: ["こうたい"], mnemonicFr: "RECUL - aller en arriere.", targetKanji: ["後", "退"] },

  // Concepts - Comparison
  { word: "比較", meanings: ["Comparaison"], readings: ["ひかく"], mnemonicFr: "COMPARAISON - examiner les differences.", targetKanji: ["比", "較"] },
  { word: "類似", meanings: ["Similitude"], readings: ["るいじ"], mnemonicFr: "SIMILITUDE - etre semblable.", targetKanji: ["類", "似"] },
  { word: "相違", meanings: ["Difference"], readings: ["そうい"], mnemonicFr: "DIFFERENCE - ce qui n'est pas pareil.", targetKanji: ["相", "違"] },
  { word: "対照", meanings: ["Contraste"], readings: ["たいしょう"], mnemonicFr: "CONTRASTE - opposition marquee.", targetKanji: ["対", "照"] },
];

async function main() {
  console.log("=== SEED VOCAB BATCH 11: Abstract Concepts & Emotions ===\n");

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
