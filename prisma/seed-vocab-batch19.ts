import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Batch 19: State descriptions, manner adverbs, conditions, qualities, feelings, comparisons, degrees
// Focus on onomatopoeia-related words, descriptive vocabulary, manner expressions

const vocabPart1 = [
  // State descriptions - 静か, 元気, 有名, 大切, 大事, 便利, 不便
  { word: "静か", meanings: ["Calme", "Silencieux"], readings: ["しずか"], mnemonicFr: "CALME - paisible et sans bruit.", targetKanji: ["静"] },
  { word: "静かに", meanings: ["Calmement", "Silencieusement"], readings: ["しずかに"], mnemonicFr: "CALMEMENT - de manière calme et posée.", targetKanji: ["静"] },
  { word: "元気", meanings: ["En forme", "Énergique"], readings: ["げんき"], mnemonicFr: "EN FORME - plein d'énergie et de vitalité.", targetKanji: ["元", "気"] },
  { word: "元気な", meanings: ["Énergique", "Vigoureux"], readings: ["げんきな"], mnemonicFr: "ÉNERGIQUE - qui déborde de vie.", targetKanji: ["元", "気"] },
  { word: "有名", meanings: ["Célèbre", "Connu"], readings: ["ゆうめい"], mnemonicFr: "CÉLÈBRE - dont le nom est connu de tous.", targetKanji: ["有", "名"] },
  { word: "有名な", meanings: ["Célèbre", "Fameux"], readings: ["ゆうめいな"], mnemonicFr: "FAMEUX - reconnu par beaucoup.", targetKanji: ["有", "名"] },
  { word: "大切", meanings: ["Important", "Précieux"], readings: ["たいせつ"], mnemonicFr: "IMPORTANT - qui compte beaucoup.", targetKanji: ["大", "切"] },
  { word: "大切な", meanings: ["Précieux", "Cher"], readings: ["たいせつな"], mnemonicFr: "PRÉCIEUX - qu'on chérit.", targetKanji: ["大", "切"] },
  { word: "大事", meanings: ["Important", "Grave"], readings: ["だいじ"], mnemonicFr: "IMPORTANT - de grande importance.", targetKanji: ["大", "事"] },
  { word: "大事な", meanings: ["Important", "Essentiel"], readings: ["だいじな"], mnemonicFr: "ESSENTIEL - qu'il faut préserver.", targetKanji: ["大", "事"] },
  { word: "便利", meanings: ["Pratique", "Commode"], readings: ["べんり"], mnemonicFr: "PRATIQUE - facile à utiliser.", targetKanji: ["便", "利"] },
  { word: "便利な", meanings: ["Pratique", "Utile"], readings: ["べんりな"], mnemonicFr: "UTILE - qui rend service.", targetKanji: ["便", "利"] },
  { word: "不便", meanings: ["Peu pratique", "Gênant"], readings: ["ふべん"], mnemonicFr: "PEU PRATIQUE - qui cause des difficultés.", targetKanji: ["不", "便"] },
  { word: "不便な", meanings: ["Incommode", "Peu pratique"], readings: ["ふべんな"], mnemonicFr: "INCOMMODE - difficile à utiliser.", targetKanji: ["不", "便"] },

  // Manner adverbs - 急に, 突然, 自然に, 正確に, 確実に
  { word: "急に", meanings: ["Soudainement", "Brusquement"], readings: ["きゅうに"], mnemonicFr: "SOUDAINEMENT - de façon inattendue.", targetKanji: ["急"] },
  { word: "急ぐ", meanings: ["Se dépêcher", "Se presser"], readings: ["いそぐ"], mnemonicFr: "SE DÉPÊCHER - faire vite.", targetKanji: ["急"] },
  { word: "急", meanings: ["Urgent", "Soudain"], readings: ["きゅう"], mnemonicFr: "URGENT - qui ne peut pas attendre.", targetKanji: ["急"] },
  { word: "突然", meanings: ["Soudain", "Brusque"], readings: ["とつぜん"], mnemonicFr: "SOUDAIN - qui arrive sans prévenir.", targetKanji: ["突", "然"] },
  { word: "自然に", meanings: ["Naturellement", "Spontanément"], readings: ["しぜんに"], mnemonicFr: "NATURELLEMENT - de manière naturelle.", targetKanji: ["自", "然"] },
  { word: "正確", meanings: ["Exact", "Précis"], readings: ["せいかく"], mnemonicFr: "EXACT - sans erreur.", targetKanji: ["正", "確"] },
  { word: "正確に", meanings: ["Exactement", "Précisément"], readings: ["せいかくに"], mnemonicFr: "EXACTEMENT - avec précision.", targetKanji: ["正", "確"] },
  { word: "確実", meanings: ["Certain", "Sûr"], readings: ["かくじつ"], mnemonicFr: "CERTAIN - sans aucun doute.", targetKanji: ["確", "実"] },
  { word: "確実に", meanings: ["Certainement", "Sûrement"], readings: ["かくじつに"], mnemonicFr: "CERTAINEMENT - de manière sûre.", targetKanji: ["確", "実"] },
  { word: "確か", meanings: ["Sûr", "Certain"], readings: ["たしか"], mnemonicFr: "SÛR - dont on est certain.", targetKanji: ["確"] },
  { word: "確かに", meanings: ["Certainement", "Effectivement"], readings: ["たしかに"], mnemonicFr: "EFFECTIVEMENT - c'est bien vrai.", targetKanji: ["確"] },

  // Conditions - 安全, 危険, 必要, 可能, 不可能
  { word: "安全", meanings: ["Sécurité", "Sûreté"], readings: ["あんぜん"], mnemonicFr: "SÉCURITÉ - état sans danger.", targetKanji: ["安", "全"] },
  { word: "安全な", meanings: ["Sûr", "Sans danger"], readings: ["あんぜんな"], mnemonicFr: "SÛR - qui ne présente pas de risque.", targetKanji: ["安", "全"] },
  { word: "危険", meanings: ["Danger", "Risque"], readings: ["きけん"], mnemonicFr: "DANGER - situation risquée.", targetKanji: ["危", "険"] },
  { word: "危険な", meanings: ["Dangereux", "Risqué"], readings: ["きけんな"], mnemonicFr: "DANGEREUX - qui présente un risque.", targetKanji: ["危", "険"] },
  { word: "危ない", meanings: ["Dangereux", "Attention"], readings: ["あぶない"], mnemonicFr: "DANGEREUX - qui peut blesser.", targetKanji: ["危"] },
  { word: "可能", meanings: ["Possible", "Faisable"], readings: ["かのう"], mnemonicFr: "POSSIBLE - qui peut se faire.", targetKanji: ["可", "能"] },
  { word: "可能な", meanings: ["Possible", "Réalisable"], readings: ["かのうな"], mnemonicFr: "RÉALISABLE - qu'on peut accomplir.", targetKanji: ["可", "能"] },
  { word: "不可能", meanings: ["Impossible"], readings: ["ふかのう"], mnemonicFr: "IMPOSSIBLE - qui ne peut pas se faire.", targetKanji: ["不", "可", "能"] },
  { word: "不可能な", meanings: ["Impossible", "Irréalisable"], readings: ["ふかのうな"], mnemonicFr: "IRRÉALISABLE - qu'on ne peut pas accomplir.", targetKanji: ["不", "可", "能"] },
];

const vocabPart2 = [
  // Qualities - 正直, 親切, 熱心, 真面目, 丁寧
  { word: "正直", meanings: ["Honnête", "Franc"], readings: ["しょうじき"], mnemonicFr: "HONNÊTE - qui dit la vérité.", targetKanji: ["正", "直"] },
  { word: "正直な", meanings: ["Honnête", "Sincère"], readings: ["しょうじきな"], mnemonicFr: "SINCÈRE - qui ne ment pas.", targetKanji: ["正", "直"] },
  { word: "正直に", meanings: ["Honnêtement", "Franchement"], readings: ["しょうじきに"], mnemonicFr: "FRANCHEMENT - en disant la vérité.", targetKanji: ["正", "直"] },
  { word: "熱心", meanings: ["Enthousiaste", "Zélé"], readings: ["ねっしん"], mnemonicFr: "ENTHOUSIASTE - plein d'ardeur.", targetKanji: ["熱", "心"] },
  { word: "熱心な", meanings: ["Passionné", "Fervent"], readings: ["ねっしんな"], mnemonicFr: "PASSIONNÉ - très motivé.", targetKanji: ["熱", "心"] },
  { word: "熱心に", meanings: ["Avec ardeur", "Passionnément"], readings: ["ねっしんに"], mnemonicFr: "AVEC ARDEUR - de manière passionnée.", targetKanji: ["熱", "心"] },
  { word: "真面目", meanings: ["Sérieux", "Consciencieux"], readings: ["まじめ"], mnemonicFr: "SÉRIEUX - qui fait les choses bien.", targetKanji: ["真", "面", "目"] },
  { word: "真面目な", meanings: ["Sérieux", "Appliqué"], readings: ["まじめな"], mnemonicFr: "APPLIQUÉ - qui travaille avec soin.", targetKanji: ["真", "面", "目"] },
  { word: "真面目に", meanings: ["Sérieusement", "Consciencieusement"], readings: ["まじめに"], mnemonicFr: "SÉRIEUSEMENT - avec application.", targetKanji: ["真", "面", "目"] },
  { word: "丁寧", meanings: ["Poli", "Soigné"], readings: ["ていねい"], mnemonicFr: "POLI - qui fait attention aux autres.", targetKanji: ["丁", "寧"] },
  { word: "丁寧な", meanings: ["Poli", "Soigneux"], readings: ["ていねいな"], mnemonicFr: "SOIGNEUX - qui fait les choses avec soin.", targetKanji: ["丁", "寧"] },
  { word: "丁寧に", meanings: ["Poliment", "Soigneusement"], readings: ["ていねいに"], mnemonicFr: "POLIMENT - avec politesse et soin.", targetKanji: ["丁", "寧"] },

  // Feelings - 楽しい, 嬉しい, 悲しい, 寂しい, 恥ずかしい
  { word: "楽しい", meanings: ["Amusant", "Agréable"], readings: ["たのしい"], mnemonicFr: "AMUSANT - qui procure du plaisir.", targetKanji: ["楽"] },
  { word: "楽しむ", meanings: ["S'amuser", "Profiter"], readings: ["たのしむ"], mnemonicFr: "S'AMUSER - prendre du plaisir.", targetKanji: ["楽"] },
  { word: "楽しみ", meanings: ["Plaisir", "Joie"], readings: ["たのしみ"], mnemonicFr: "PLAISIR - ce qu'on attend avec joie.", targetKanji: ["楽"] },
  { word: "楽", meanings: ["Facile", "Confortable"], readings: ["らく"], mnemonicFr: "FACILE - sans effort.", targetKanji: ["楽"] },
  { word: "嬉しい", meanings: ["Content", "Heureux"], readings: ["うれしい"], mnemonicFr: "CONTENT - qui ressent de la joie.", targetKanji: ["嬉"] },
  { word: "悲しい", meanings: ["Triste"], readings: ["かなしい"], mnemonicFr: "TRISTE - qui ressent du chagrin.", targetKanji: ["悲"] },
  { word: "悲しむ", meanings: ["Être triste", "S'attrister"], readings: ["かなしむ"], mnemonicFr: "S'ATTRISTER - ressentir de la tristesse.", targetKanji: ["悲"] },
  { word: "悲しみ", meanings: ["Tristesse", "Chagrin"], readings: ["かなしみ"], mnemonicFr: "TRISTESSE - sentiment de peine.", targetKanji: ["悲"] },
  { word: "寂しい", meanings: ["Seul", "Solitaire"], readings: ["さびしい"], mnemonicFr: "SEUL - qui se sent abandonné.", targetKanji: ["寂"] },
  { word: "恥ずかしい", meanings: ["Gêné", "Honteux"], readings: ["はずかしい"], mnemonicFr: "GÊNÉ - qui ressent de la honte.", targetKanji: ["恥"] },
  { word: "恥", meanings: ["Honte", "Embarras"], readings: ["はじ"], mnemonicFr: "HONTE - sentiment de gêne.", targetKanji: ["恥"] },

  // States - 忙しい, 暇, 疲れる, 飽きる
  { word: "忙しい", meanings: ["Occupé", "Affairé"], readings: ["いそがしい"], mnemonicFr: "OCCUPÉ - qui a beaucoup à faire.", targetKanji: ["忙"] },
  { word: "暇", meanings: ["Temps libre", "Loisir"], readings: ["ひま"], mnemonicFr: "TEMPS LIBRE - moment sans obligation.", targetKanji: ["暇"] },
  { word: "暇な", meanings: ["Libre", "Disponible"], readings: ["ひまな"], mnemonicFr: "LIBRE - qui n'a rien à faire.", targetKanji: ["暇"] },
  { word: "疲れる", meanings: ["Se fatiguer", "Être fatigué"], readings: ["つかれる"], mnemonicFr: "SE FATIGUER - perdre son énergie.", targetKanji: ["疲"] },
  { word: "疲れ", meanings: ["Fatigue", "Lassitude"], readings: ["つかれ"], mnemonicFr: "FATIGUE - état d'épuisement.", targetKanji: ["疲"] },
  { word: "飽きる", meanings: ["Se lasser", "En avoir assez"], readings: ["あきる"], mnemonicFr: "SE LASSER - ne plus avoir envie.", targetKanji: ["飽"] },
];

const vocabPart3 = [
  // Comparisons - より, もっと, 最も, 一番
  { word: "最も", meanings: ["Le plus", "Le plus..."], readings: ["もっとも"], mnemonicFr: "LE PLUS - superlatif absolu.", targetKanji: ["最"] },
  { word: "一番", meanings: ["Premier", "Le meilleur"], readings: ["いちばん"], mnemonicFr: "PREMIER - en première position.", targetKanji: ["一", "番"] },
  { word: "番", meanings: ["Numéro", "Tour"], readings: ["ばん"], mnemonicFr: "NUMÉRO - position dans une série.", targetKanji: ["番"] },
  { word: "最高", meanings: ["Le meilleur", "Maximum"], readings: ["さいこう"], mnemonicFr: "LE MEILLEUR - au sommet.", targetKanji: ["最", "高"] },
  { word: "最低", meanings: ["Le pire", "Minimum"], readings: ["さいてい"], mnemonicFr: "LE PIRE - au plus bas.", targetKanji: ["最", "低"] },
  { word: "最大", meanings: ["Maximum", "Le plus grand"], readings: ["さいだい"], mnemonicFr: "MAXIMUM - le plus grand possible.", targetKanji: ["最", "大"] },
  { word: "最小", meanings: ["Minimum", "Le plus petit"], readings: ["さいしょう"], mnemonicFr: "MINIMUM - le plus petit possible.", targetKanji: ["最", "小"] },
  { word: "同じ", meanings: ["Même", "Identique"], readings: ["おなじ"], mnemonicFr: "MÊME - pareil.", targetKanji: ["同"] },
  { word: "違う", meanings: ["Différer", "Être différent"], readings: ["ちがう"], mnemonicFr: "DIFFÉRER - ne pas être pareil.", targetKanji: ["違"] },
  { word: "違い", meanings: ["Différence"], readings: ["ちがい"], mnemonicFr: "DIFFÉRENCE - ce qui distingue.", targetKanji: ["違"] },

  // Degrees - 少し, 少々, 大変, 非常に, 特に
  { word: "少し", meanings: ["Un peu", "Légèrement"], readings: ["すこし"], mnemonicFr: "UN PEU - petite quantité.", targetKanji: ["少"] },
  { word: "少々", meanings: ["Un peu", "Quelque peu"], readings: ["しょうしょう"], mnemonicFr: "QUELQUE PEU - légèrement (formel).", targetKanji: ["少"] },
  { word: "少ない", meanings: ["Peu nombreux", "Rare"], readings: ["すくない"], mnemonicFr: "PEU NOMBREUX - en petite quantité.", targetKanji: ["少"] },
  { word: "多い", meanings: ["Nombreux", "Beaucoup"], readings: ["おおい"], mnemonicFr: "NOMBREUX - en grande quantité.", targetKanji: ["多"] },
  { word: "多く", meanings: ["Beaucoup", "La plupart"], readings: ["おおく"], mnemonicFr: "BEAUCOUP - grande quantité.", targetKanji: ["多"] },
  { word: "特に", meanings: ["Particulièrement", "Surtout"], readings: ["とくに"], mnemonicFr: "PARTICULIÈREMENT - de façon spéciale.", targetKanji: ["特"] },
  { word: "特別", meanings: ["Spécial", "Particulier"], readings: ["とくべつ"], mnemonicFr: "SPÉCIAL - pas ordinaire.", targetKanji: ["特", "別"] },
  { word: "特別な", meanings: ["Spécial", "Exceptionnel"], readings: ["とくべつな"], mnemonicFr: "EXCEPTIONNEL - hors du commun.", targetKanji: ["特", "別"] },
  { word: "全く", meanings: ["Complètement", "Totalement"], readings: ["まったく"], mnemonicFr: "COMPLÈTEMENT - entièrement.", targetKanji: ["全"] },
  { word: "全然", meanings: ["Pas du tout", "Absolument"], readings: ["ぜんぜん"], mnemonicFr: "PAS DU TOUT - aucunement (avec négation).", targetKanji: ["全", "然"] },
  { word: "本当に", meanings: ["Vraiment", "Réellement"], readings: ["ほんとうに"], mnemonicFr: "VRAIMENT - de façon authentique.", targetKanji: ["本", "当"] },
  { word: "本当", meanings: ["Vrai", "Réel"], readings: ["ほんとう"], mnemonicFr: "VRAI - conforme à la réalité.", targetKanji: ["本", "当"] },

  // Time-related manner expressions
  { word: "早い", meanings: ["Tôt", "Rapide"], readings: ["はやい"], mnemonicFr: "TÔT - de bonne heure.", targetKanji: ["早"] },
  { word: "遅い", meanings: ["Tard", "Lent"], readings: ["おそい"], mnemonicFr: "TARD - pas à temps.", targetKanji: ["遅"] },
  { word: "遅れる", meanings: ["Être en retard"], readings: ["おくれる"], mnemonicFr: "ÊTRE EN RETARD - arriver après l'heure.", targetKanji: ["遅"] },
  { word: "間に合う", meanings: ["Être à temps", "Suffire"], readings: ["まにあう"], mnemonicFr: "ÊTRE À TEMPS - arriver avant la limite.", targetKanji: ["間", "合"] },
  { word: "速い", meanings: ["Rapide", "Vite"], readings: ["はやい"], mnemonicFr: "RAPIDE - qui va vite.", targetKanji: ["速"] },
  { word: "速く", meanings: ["Rapidement", "Vite"], readings: ["はやく"], mnemonicFr: "RAPIDEMENT - de façon rapide.", targetKanji: ["速"] },
  { word: "速度", meanings: ["Vitesse"], readings: ["そくど"], mnemonicFr: "VITESSE - rapidité du mouvement.", targetKanji: ["速", "度"] },
];

const vocabPart4 = [
  // More descriptive vocabulary
  { word: "簡単", meanings: ["Simple", "Facile"], readings: ["かんたん"], mnemonicFr: "SIMPLE - pas compliqué.", targetKanji: ["簡", "単"] },
  { word: "簡単な", meanings: ["Simple", "Facile"], readings: ["かんたんな"], mnemonicFr: "FACILE - qu'on peut faire sans effort.", targetKanji: ["簡", "単"] },
  { word: "簡単に", meanings: ["Simplement", "Facilement"], readings: ["かんたんに"], mnemonicFr: "FACILEMENT - sans difficulté.", targetKanji: ["簡", "単"] },
  { word: "複雑", meanings: ["Complexe", "Compliqué"], readings: ["ふくざつ"], mnemonicFr: "COMPLEXE - difficile à comprendre.", targetKanji: ["複", "雑"] },
  { word: "複雑な", meanings: ["Compliqué", "Complexe"], readings: ["ふくざつな"], mnemonicFr: "COMPLIQUÉ - pas simple.", targetKanji: ["複", "雑"] },
  { word: "明らか", meanings: ["Évident", "Clair"], readings: ["あきらか"], mnemonicFr: "ÉVIDENT - facile à voir.", targetKanji: ["明"] },
  { word: "明らかに", meanings: ["Clairement", "Évidemment"], readings: ["あきらかに"], mnemonicFr: "CLAIREMENT - de façon évidente.", targetKanji: ["明"] },
  { word: "明るい", meanings: ["Lumineux", "Gai"], readings: ["あかるい"], mnemonicFr: "LUMINEUX - plein de lumière.", targetKanji: ["明"] },
  { word: "暗い", meanings: ["Sombre", "Obscur"], readings: ["くらい"], mnemonicFr: "SOMBRE - sans lumière.", targetKanji: ["暗"] },
  { word: "新しい", meanings: ["Nouveau", "Neuf"], readings: ["あたらしい"], mnemonicFr: "NOUVEAU - récent.", targetKanji: ["新"] },
  { word: "新た", meanings: ["Nouveau", "Frais"], readings: ["あらた"], mnemonicFr: "NOUVEAU - qui vient de commencer.", targetKanji: ["新"] },
  { word: "新たに", meanings: ["De nouveau", "À nouveau"], readings: ["あらたに"], mnemonicFr: "À NOUVEAU - encore une fois.", targetKanji: ["新"] },
  { word: "古い", meanings: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonicFr: "VIEUX - qui existe depuis longtemps.", targetKanji: ["古"] },
  { word: "若い", meanings: ["Jeune"], readings: ["わかい"], mnemonicFr: "JEUNE - pas vieux.", targetKanji: ["若"] },
  { word: "若者", meanings: ["Jeune personne", "Jeunesse"], readings: ["わかもの"], mnemonicFr: "JEUNE PERSONNE - personne jeune.", targetKanji: ["若", "者"] },

  // Physical descriptions
  { word: "強い", meanings: ["Fort", "Puissant"], readings: ["つよい"], mnemonicFr: "FORT - qui a de la force.", targetKanji: ["強"] },
  { word: "強く", meanings: ["Fortement", "Vigoureusement"], readings: ["つよく"], mnemonicFr: "FORTEMENT - avec force.", targetKanji: ["強"] },
  { word: "強さ", meanings: ["Force", "Puissance"], readings: ["つよさ"], mnemonicFr: "FORCE - capacité physique.", targetKanji: ["強"] },
  { word: "弱い", meanings: ["Faible"], readings: ["よわい"], mnemonicFr: "FAIBLE - qui manque de force.", targetKanji: ["弱"] },
  { word: "弱さ", meanings: ["Faiblesse"], readings: ["よわさ"], mnemonicFr: "FAIBLESSE - manque de force.", targetKanji: ["弱"] },
  { word: "硬い", meanings: ["Dur", "Rigide"], readings: ["かたい"], mnemonicFr: "DUR - qui ne cède pas.", targetKanji: ["硬"] },
  { word: "柔らかい", meanings: ["Doux", "Souple"], readings: ["やわらかい"], mnemonicFr: "DOUX - agréable au toucher.", targetKanji: ["柔"] },
  { word: "重い", meanings: ["Lourd"], readings: ["おもい"], mnemonicFr: "LOURD - qui pèse beaucoup.", targetKanji: ["重"] },
  { word: "軽い", meanings: ["Léger"], readings: ["かるい"], mnemonicFr: "LÉGER - qui ne pèse pas lourd.", targetKanji: ["軽"] },
  { word: "軽く", meanings: ["Légèrement"], readings: ["かるく"], mnemonicFr: "LÉGÈREMENT - de façon légère.", targetKanji: ["軽"] },
  { word: "厚い", meanings: ["Épais"], readings: ["あつい"], mnemonicFr: "ÉPAIS - qui a de l'épaisseur.", targetKanji: ["厚"] },
  { word: "薄い", meanings: ["Mince", "Fin"], readings: ["うすい"], mnemonicFr: "MINCE - peu épais.", targetKanji: ["薄"] },
  { word: "細い", meanings: ["Fin", "Mince"], readings: ["ほそい"], mnemonicFr: "FIN - de petit diamètre.", targetKanji: ["細"] },
  { word: "太い", meanings: ["Gros", "Épais"], readings: ["ふとい"], mnemonicFr: "GROS - de grand diamètre.", targetKanji: ["太"] },
];

const vocabPart5 = [
  // Temperature and sensations
  { word: "暑い", meanings: ["Chaud (climat)"], readings: ["あつい"], mnemonicFr: "CHAUD - température élevée.", targetKanji: ["暑"] },
  { word: "寒い", meanings: ["Froid (climat)"], readings: ["さむい"], mnemonicFr: "FROID - température basse.", targetKanji: ["寒"] },
  { word: "熱い", meanings: ["Chaud (au toucher)"], readings: ["あつい"], mnemonicFr: "CHAUD - brûlant au toucher.", targetKanji: ["熱"] },
  { word: "冷たい", meanings: ["Froid (au toucher)"], readings: ["つめたい"], mnemonicFr: "FROID - glacé au toucher.", targetKanji: ["冷"] },
  { word: "冷える", meanings: ["Refroidir", "Se refroidir"], readings: ["ひえる"], mnemonicFr: "REFROIDIR - devenir froid.", targetKanji: ["冷"] },
  { word: "冷やす", meanings: ["Refroidir", "Rafraîchir"], readings: ["ひやす"], mnemonicFr: "RAFRAÎCHIR - rendre froid.", targetKanji: ["冷"] },
  { word: "温かい", meanings: ["Tiède", "Chaleureux"], readings: ["あたたかい"], mnemonicFr: "TIÈDE - agréablement chaud.", targetKanji: ["温"] },
  { word: "温める", meanings: ["Réchauffer"], readings: ["あたためる"], mnemonicFr: "RÉCHAUFFER - rendre chaud.", targetKanji: ["温"] },
  { word: "温度", meanings: ["Température"], readings: ["おんど"], mnemonicFr: "TEMPÉRATURE - degré de chaleur.", targetKanji: ["温", "度"] },

  // Color-related
  { word: "白い", meanings: ["Blanc"], readings: ["しろい"], mnemonicFr: "BLANC - couleur de la neige.", targetKanji: ["白"] },
  { word: "黒い", meanings: ["Noir"], readings: ["くろい"], mnemonicFr: "NOIR - couleur de la nuit.", targetKanji: ["黒"] },
  { word: "赤い", meanings: ["Rouge"], readings: ["あかい"], mnemonicFr: "ROUGE - couleur du sang.", targetKanji: ["赤"] },
  { word: "青い", meanings: ["Bleu", "Vert"], readings: ["あおい"], mnemonicFr: "BLEU - couleur du ciel.", targetKanji: ["青"] },
  { word: "黄色い", meanings: ["Jaune"], readings: ["きいろい"], mnemonicFr: "JAUNE - couleur du soleil.", targetKanji: ["黄", "色"] },
  { word: "色", meanings: ["Couleur"], readings: ["いろ"], mnemonicFr: "COULEUR - teinte visuelle.", targetKanji: ["色"] },

  // Emotional states
  { word: "怒る", meanings: ["Se fâcher", "Se mettre en colère"], readings: ["おこる"], mnemonicFr: "SE FÂCHER - ressentir de la colère.", targetKanji: ["怒"] },
  { word: "怒り", meanings: ["Colère"], readings: ["いかり"], mnemonicFr: "COLÈRE - sentiment de rage.", targetKanji: ["怒"] },
  { word: "驚く", meanings: ["Être surpris", "S'étonner"], readings: ["おどろく"], mnemonicFr: "ÊTRE SURPRIS - ne pas s'attendre.", targetKanji: ["驚"] },
  { word: "驚き", meanings: ["Surprise", "Étonnement"], readings: ["おどろき"], mnemonicFr: "SURPRISE - ce qui étonne.", targetKanji: ["驚"] },
  { word: "喜ぶ", meanings: ["Se réjouir", "Être content"], readings: ["よろこぶ"], mnemonicFr: "SE RÉJOUIR - ressentir de la joie.", targetKanji: ["喜"] },
  { word: "喜び", meanings: ["Joie", "Plaisir"], readings: ["よろこび"], mnemonicFr: "JOIE - sentiment de bonheur.", targetKanji: ["喜"] },
  { word: "苦しい", meanings: ["Pénible", "Difficile"], readings: ["くるしい"], mnemonicFr: "PÉNIBLE - qui cause de la souffrance.", targetKanji: ["苦"] },
  { word: "苦しむ", meanings: ["Souffrir"], readings: ["くるしむ"], mnemonicFr: "SOUFFRIR - ressentir de la douleur.", targetKanji: ["苦"] },
  { word: "苦労", meanings: ["Peine", "Difficulté"], readings: ["くろう"], mnemonicFr: "PEINE - effort difficile.", targetKanji: ["苦", "労"] },
  { word: "困る", meanings: ["Être embêté", "Avoir un problème"], readings: ["こまる"], mnemonicFr: "ÊTRE EMBÊTÉ - avoir des difficultés.", targetKanji: ["困"] },
  { word: "困難", meanings: ["Difficulté", "Obstacle"], readings: ["こんなん"], mnemonicFr: "DIFFICULTÉ - problème à surmonter.", targetKanji: ["困", "難"] },
  { word: "困難な", meanings: ["Difficile", "Ardu"], readings: ["こんなんな"], mnemonicFr: "DIFFICILE - pas facile à faire.", targetKanji: ["困", "難"] },
];

const vocabPart6 = [
  // Sound-related / Onomatopoeia-adjacent vocabulary
  { word: "静まる", meanings: ["Se calmer", "S'apaiser"], readings: ["しずまる"], mnemonicFr: "SE CALMER - devenir silencieux.", targetKanji: ["静"] },
  { word: "騒ぐ", meanings: ["Faire du bruit", "S'agiter"], readings: ["さわぐ"], mnemonicFr: "FAIRE DU BRUIT - être bruyant.", targetKanji: ["騒"] },
  { word: "騒がしい", meanings: ["Bruyant", "Tapageur"], readings: ["さわがしい"], mnemonicFr: "BRUYANT - qui fait beaucoup de bruit.", targetKanji: ["騒"] },
  { word: "響く", meanings: ["Résonner", "Retentir"], readings: ["ひびく"], mnemonicFr: "RÉSONNER - produire un son prolongé.", targetKanji: ["響"] },
  { word: "響き", meanings: ["Résonance", "Écho"], readings: ["ひびき"], mnemonicFr: "RÉSONANCE - prolongement du son.", targetKanji: ["響"] },
  { word: "叫ぶ", meanings: ["Crier", "Hurler"], readings: ["さけぶ"], mnemonicFr: "CRIER - émettre un son fort.", targetKanji: ["叫"] },
  { word: "叫び", meanings: ["Cri"], readings: ["さけび"], mnemonicFr: "CRI - son fort et brusque.", targetKanji: ["叫"] },
  { word: "囁く", meanings: ["Chuchoter", "Murmurer"], readings: ["ささやく"], mnemonicFr: "CHUCHOTER - parler très bas.", targetKanji: ["囁"] },
  { word: "黙る", meanings: ["Se taire"], readings: ["だまる"], mnemonicFr: "SE TAIRE - arrêter de parler.", targetKanji: ["黙"] },

  // Movement descriptions
  { word: "動く", meanings: ["Bouger", "Se déplacer"], readings: ["うごく"], mnemonicFr: "BOUGER - changer de position.", targetKanji: ["動"] },
  { word: "動かす", meanings: ["Déplacer", "Faire bouger"], readings: ["うごかす"], mnemonicFr: "DÉPLACER - changer la position de.", targetKanji: ["動"] },
  { word: "動き", meanings: ["Mouvement"], readings: ["うごき"], mnemonicFr: "MOUVEMENT - action de bouger.", targetKanji: ["動"] },
  { word: "止まる", meanings: ["S'arrêter"], readings: ["とまる"], mnemonicFr: "S'ARRÊTER - cesser de bouger.", targetKanji: ["止"] },
  { word: "止める", meanings: ["Arrêter"], readings: ["とめる"], mnemonicFr: "ARRÊTER - faire cesser.", targetKanji: ["止"] },
  { word: "続く", meanings: ["Continuer", "Se poursuivre"], readings: ["つづく"], mnemonicFr: "CONTINUER - ne pas s'arrêter.", targetKanji: ["続"] },
  { word: "続ける", meanings: ["Continuer", "Poursuivre"], readings: ["つづける"], mnemonicFr: "POURSUIVRE - maintenir l'action.", targetKanji: ["続"] },
  { word: "始まる", meanings: ["Commencer (intransitif)"], readings: ["はじまる"], mnemonicFr: "COMMENCER - débuter.", targetKanji: ["始"] },
  { word: "始める", meanings: ["Commencer (transitif)"], readings: ["はじめる"], mnemonicFr: "COMMENCER - entreprendre.", targetKanji: ["始"] },
  { word: "終わる", meanings: ["Finir", "Se terminer"], readings: ["おわる"], mnemonicFr: "FINIR - arriver à la fin.", targetKanji: ["終"] },
  { word: "終わり", meanings: ["Fin"], readings: ["おわり"], mnemonicFr: "FIN - moment final.", targetKanji: ["終"] },

  // Quantity and extent
  { word: "十分", meanings: ["Suffisant", "Assez"], readings: ["じゅうぶん"], mnemonicFr: "SUFFISANT - en quantité adéquate.", targetKanji: ["十", "分"] },
  { word: "十分に", meanings: ["Suffisamment", "Assez"], readings: ["じゅうぶんに"], mnemonicFr: "SUFFISAMMENT - de manière adéquate.", targetKanji: ["十", "分"] },
  { word: "余分", meanings: ["Excédent", "Surplus"], readings: ["よぶん"], mnemonicFr: "EXCÉDENT - en trop.", targetKanji: ["余", "分"] },
  { word: "余分な", meanings: ["Superflu", "En trop"], readings: ["よぶんな"], mnemonicFr: "SUPERFLU - pas nécessaire.", targetKanji: ["余", "分"] },
  { word: "過度", meanings: ["Excès", "Excessif"], readings: ["かど"], mnemonicFr: "EXCÈS - au-delà de la limite.", targetKanji: ["過", "度"] },
  { word: "過度に", meanings: ["Excessivement"], readings: ["かどに"], mnemonicFr: "EXCESSIVEMENT - de façon excessive.", targetKanji: ["過", "度"] },
  { word: "適度", meanings: ["Modération", "Juste mesure"], readings: ["てきど"], mnemonicFr: "MODÉRATION - ni trop ni trop peu.", targetKanji: ["適", "度"] },
  { word: "適度に", meanings: ["Modérément"], readings: ["てきどに"], mnemonicFr: "MODÉRÉMENT - avec mesure.", targetKanji: ["適", "度"] },
];

const vocabPart7 = [
  // Appearance and shape
  { word: "丸い", meanings: ["Rond", "Circulaire"], readings: ["まるい"], mnemonicFr: "ROND - en forme de cercle.", targetKanji: ["丸"] },
  { word: "丸", meanings: ["Cercle", "Rond"], readings: ["まる"], mnemonicFr: "CERCLE - forme ronde.", targetKanji: ["丸"] },
  { word: "四角い", meanings: ["Carré", "Rectangulaire"], readings: ["しかくい"], mnemonicFr: "CARRÉ - à quatre angles.", targetKanji: ["四", "角"] },
  { word: "角", meanings: ["Angle", "Coin"], readings: ["かど"], mnemonicFr: "ANGLE - point de rencontre de lignes.", targetKanji: ["角"] },
  { word: "形", meanings: ["Forme", "Figure"], readings: ["かたち"], mnemonicFr: "FORME - aspect extérieur.", targetKanji: ["形"] },
  { word: "形式", meanings: ["Forme", "Formalité"], readings: ["けいしき"], mnemonicFr: "FORME - manière de faire.", targetKanji: ["形", "式"] },

  // Position and direction
  { word: "近い", meanings: ["Proche"], readings: ["ちかい"], mnemonicFr: "PROCHE - pas loin.", targetKanji: ["近"] },
  { word: "遠い", meanings: ["Loin", "Éloigné"], readings: ["とおい"], mnemonicFr: "LOIN - à grande distance.", targetKanji: ["遠"] },
  { word: "遠く", meanings: ["Au loin", "Dans le lointain"], readings: ["とおく"], mnemonicFr: "AU LOIN - à distance.", targetKanji: ["遠"] },
  { word: "高い", meanings: ["Haut", "Cher"], readings: ["たかい"], mnemonicFr: "HAUT - en altitude élevée.", targetKanji: ["高"] },
  { word: "低い", meanings: ["Bas"], readings: ["ひくい"], mnemonicFr: "BAS - peu élevé.", targetKanji: ["低"] },
  { word: "深い", meanings: ["Profond"], readings: ["ふかい"], mnemonicFr: "PROFOND - qui va loin vers le bas.", targetKanji: ["深"] },
  { word: "浅い", meanings: ["Peu profond"], readings: ["あさい"], mnemonicFr: "PEU PROFOND - qui ne va pas loin vers le bas.", targetKanji: ["浅"] },
  { word: "広い", meanings: ["Large", "Vaste"], readings: ["ひろい"], mnemonicFr: "LARGE - de grande étendue.", targetKanji: ["広"] },
  { word: "狭い", meanings: ["Étroit"], readings: ["せまい"], mnemonicFr: "ÉTROIT - de petite largeur.", targetKanji: ["狭"] },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - de grande longueur.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - de petite longueur.", targetKanji: ["短"] },

  // Quality judgments
  { word: "良い", meanings: ["Bon", "Bien"], readings: ["よい"], mnemonicFr: "BON - de bonne qualité.", targetKanji: ["良"] },
  { word: "悪い", meanings: ["Mauvais"], readings: ["わるい"], mnemonicFr: "MAUVAIS - de mauvaise qualité.", targetKanji: ["悪"] },
  { word: "正しい", meanings: ["Correct", "Juste"], readings: ["ただしい"], mnemonicFr: "CORRECT - conforme à la règle.", targetKanji: ["正"] },
  { word: "間違い", meanings: ["Erreur", "Faute"], readings: ["まちがい"], mnemonicFr: "ERREUR - ce qui n'est pas correct.", targetKanji: ["間", "違"] },
  { word: "間違う", meanings: ["Se tromper"], readings: ["まちがう"], mnemonicFr: "SE TROMPER - faire une erreur.", targetKanji: ["間", "違"] },
  { word: "間違える", meanings: ["Se tromper", "Confondre"], readings: ["まちがえる"], mnemonicFr: "CONFONDRE - prendre une chose pour une autre.", targetKanji: ["間", "違"] },
];

async function main() {
  console.log("=== SEED VOCAB BATCH 19 ===\n");
  console.log("State descriptions, manner adverbs, conditions, qualities, feelings, comparisons, degrees\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  const allVocab = [...vocabPart1, ...vocabPart2, ...vocabPart3, ...vocabPart4, ...vocabPart5, ...vocabPart6, ...vocabPart7];

  console.log(`Total vocabulary entries to process: ${allVocab.length}\n`);

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
