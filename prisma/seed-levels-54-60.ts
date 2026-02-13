import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding levels 54-60 (Advanced JLPT N1 Kanji)...");

  // Create levels 54-60 if they don't exist
  for (let i = 54; i <= 60; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  // ============================================
  // LEVEL 54 - JLPT N1 Advanced Kanji (Abstract/Formal)
  // ============================================

  const level54Kanji = [
    { character: "顎", meaningsFr: ["Menton", "Mâchoire"], readingsOn: ["ガク"], readingsKun: ["あご"], meaningMnemonicFr: "La page et le visage. Le MENTON.", readingMnemonicFr: "Ago - le MENTON !" },
    { character: "握", meaningsFr: ["Saisir", "Serrer"], readingsOn: ["アク"], readingsKun: ["にぎ-る"], meaningMnemonicFr: "La main qui tient. SAISIR fortement.", readingMnemonicFr: "Nigiru - SAISIR avec force !" },
    { character: "宛", meaningsFr: ["Adressé à"], readingsOn: ["エン"], readingsKun: ["あて"], meaningMnemonicFr: "Le toit et le secouer. ADRESSÉ À quelqu'un.", readingMnemonicFr: "Ate - ADRESSÉ À !" },
    { character: "嵐", meaningsFr: ["Tempête"], readingsOn: ["ラン"], readingsKun: ["あらし"], meaningMnemonicFr: "La montagne et le vent. La TEMPÊTE.", readingMnemonicFr: "Arashi - la TEMPÊTE !" },
    { character: "伊", meaningsFr: ["Italie", "Celui-ci"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "La personne et la flèche. ITALIE.", readingMnemonicFr: "I - ITALIE !" },
    { character: "威", meaningsFr: ["Dignité", "Autorité"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "La femme et la hallebarde. La DIGNITÉ.", readingMnemonicFr: "I - la DIGNITÉ !" },
    { character: "尉", meaningsFr: ["Lieutenant"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "Le petit et le feu. Le LIEUTENANT.", readingMnemonicFr: "I - le LIEUTENANT !" },
    { character: "慰", meaningsFr: ["Consoler"], readingsOn: ["イ"], readingsKun: ["なぐさ-める"], meaningMnemonicFr: "Le coeur qui console. CONSOLER.", readingMnemonicFr: "Nagusameru - CONSOLER !" },
    { character: "椅", meaningsFr: ["Chaise"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "L'arbre et l'étrange. La CHAISE.", readingMnemonicFr: "I - la CHAISE !" },
    { character: "為", meaningsFr: ["Faire", "Pour"], readingsOn: ["イ"], readingsKun: ["ため", "な-す"], meaningMnemonicFr: "L'oiseau qui agit. FAIRE quelque chose.", readingMnemonicFr: "Tame - POUR quelqu'un !" },
    { character: "畏", meaningsFr: ["Craindre"], readingsOn: ["イ"], readingsKun: ["おそ-れる"], meaningMnemonicFr: "Le champ et le haut. CRAINDRE avec respect.", readingMnemonicFr: "Osoreru - CRAINDRE !" },
    { character: "萎", meaningsFr: ["Flétrir"], readingsOn: ["イ"], readingsKun: ["な-える"], meaningMnemonicFr: "L'herbe qui se fane. FLÉTRIR.", readingMnemonicFr: "Naeru - FLÉTRIR !" },
    { character: "衣", meaningsFr: ["Vêtement"], readingsOn: ["イ"], readingsKun: ["ころも"], meaningMnemonicFr: "Le tissu qui habille. Le VÊTEMENT.", readingMnemonicFr: "Koromo - le VÊTEMENT !" },
    { character: "違", meaningsFr: ["Différent", "Erreur"], readingsOn: ["イ"], readingsKun: ["ちが-う"], meaningMnemonicFr: "Le chemin qui diffère. DIFFÉRENT.", readingMnemonicFr: "Chigau - c'est DIFFÉRENT !" },
    { character: "維", meaningsFr: ["Maintenir", "Fibre"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "Le fil qui maintient. MAINTENIR.", readingMnemonicFr: "I - MAINTENIR !" },
    { character: "緯", meaningsFr: ["Latitude", "Trame"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "Le fil horizontal. La LATITUDE.", readingMnemonicFr: "I - la LATITUDE !" },
    { character: "壱", meaningsFr: ["Un (formel)"], readingsOn: ["イチ"], readingsKun: [], meaningMnemonicFr: "Le un formel. UN (formel).", readingMnemonicFr: "Ichi - UN !" },
    { character: "逸", meaningsFr: ["Échapper", "Excellent"], readingsOn: ["イツ"], readingsKun: [], meaningMnemonicFr: "Le lapin qui échappe. ÉCHAPPER.", readingMnemonicFr: "Itsu - ÉCHAPPER !" },
    { character: "稲", meaningsFr: ["Riz (plante)"], readingsOn: ["トウ"], readingsKun: ["いね"], meaningMnemonicFr: "Le grain et le ancien. Le RIZ sur pied.", readingMnemonicFr: "Ine - le RIZ !" },
    { character: "芋", meaningsFr: ["Patate"], readingsOn: ["ウ"], readingsKun: ["いも"], meaningMnemonicFr: "L'herbe et le utérus. La PATATE.", readingMnemonicFr: "Imo - la PATATE !" },
    { character: "姻", meaningsFr: ["Mariage"], readingsOn: ["イン"], readingsKun: [], meaningMnemonicFr: "La femme et le cause. Le MARIAGE.", readingMnemonicFr: "In - le MARIAGE !" },
    { character: "淫", meaningsFr: ["Obscène"], readingsOn: ["イン"], readingsKun: [], meaningMnemonicFr: "L'eau et le excessif. OBSCÈNE.", readingMnemonicFr: "In - OBSCÈNE !" },
    { character: "韻", meaningsFr: ["Rime"], readingsOn: ["イン"], readingsKun: [], meaningMnemonicFr: "Le son et le membre. La RIME.", readingMnemonicFr: "In - la RIME !" },
    { character: "渦", meaningsFr: ["Tourbillon"], readingsOn: ["カ"], readingsKun: ["うず"], meaningMnemonicFr: "L'eau qui tourbillonne. Le TOURBILLON.", readingMnemonicFr: "Uzu - le TOURBILLON !" },
    { character: "浦", meaningsFr: ["Baie", "Rivage"], readingsOn: ["ホ"], readingsKun: ["うら"], meaningMnemonicFr: "L'eau et le soi. La BAIE.", readingMnemonicFr: "Ura - la BAIE !" },
    { character: "瓜", meaningsFr: ["Melon"], readingsOn: ["カ"], readingsKun: ["うり"], meaningMnemonicFr: "La forme du melon. Le MELON.", readingMnemonicFr: "Uri - le MELON !" },
    { character: "閏", meaningsFr: ["Intercalaire"], readingsOn: ["ジュン"], readingsKun: ["うるう"], meaningMnemonicFr: "La porte et le roi. INTERCALAIRE.", readingMnemonicFr: "Uruu - INTERCALAIRE !" },
    { character: "噂", meaningsFr: ["Rumeur"], readingsOn: ["ソン"], readingsKun: ["うわさ"], meaningMnemonicFr: "La bouche et le respecter. La RUMEUR.", readingMnemonicFr: "Uwasa - la RUMEUR !" },
    { character: "餌", meaningsFr: ["Appât", "Nourriture"], readingsOn: ["ジ"], readingsKun: ["えさ"], meaningMnemonicFr: "La nourriture et le oreille. L'APPÂT.", readingMnemonicFr: "Esa - l'APPÂT !" },
    { character: "叡", meaningsFr: ["Sagesse"], readingsOn: ["エイ"], readingsKun: [], meaningMnemonicFr: "Le haut et le regarder. La SAGESSE.", readingMnemonicFr: "Ei - la SAGESSE !" },
    { character: "疫", meaningsFr: ["Épidémie"], readingsOn: ["エキ"], readingsKun: [], meaningMnemonicFr: "La maladie et la lance. L'ÉPIDÉMIE.", readingMnemonicFr: "Eki - l'ÉPIDÉMIE !" },
    { character: "悦", meaningsFr: ["Joie"], readingsOn: ["エツ"], readingsKun: [], meaningMnemonicFr: "Le coeur et le frère. La JOIE.", readingMnemonicFr: "Etsu - la JOIE !" },
    { character: "謁", meaningsFr: ["Audience"], readingsOn: ["エツ"], readingsKun: [], meaningMnemonicFr: "Les paroles et le rendre visite. L'AUDIENCE.", readingMnemonicFr: "Etsu - l'AUDIENCE !" },
    { character: "越", meaningsFr: ["Dépasser", "Traverser"], readingsOn: ["エツ"], readingsKun: ["こ-える"], meaningMnemonicFr: "Le marcher et le hache. DÉPASSER.", readingMnemonicFr: "Koeru - DÉPASSER !" },
    { character: "閲", meaningsFr: ["Examiner", "Lire"], readingsOn: ["エツ"], readingsKun: [], meaningMnemonicFr: "La porte et le frère. EXAMINER.", readingMnemonicFr: "Etsu - EXAMINER !" },
  ];

  for (const kanji of level54Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 54 },
      create: { ...kanji, levelId: 54 },
    });
  }

  const level54Vocab = [
    { word: "顎", meaningsFr: ["Menton"], readings: ["あご"], mnemonicFr: "Le MENTON.", levelId: 54 },
    { word: "握る", meaningsFr: ["Saisir"], readings: ["にぎる"], mnemonicFr: "SAISIR quelque chose.", levelId: 54 },
    { word: "握手", meaningsFr: ["Poignée de main"], readings: ["あくしゅ"], mnemonicFr: "Une POIGNÉE DE MAIN.", levelId: 54 },
    { word: "把握", meaningsFr: ["Compréhension"], readings: ["はあく"], mnemonicFr: "La COMPRÉHENSION d'une situation.", levelId: 54 },
    { word: "宛先", meaningsFr: ["Destinataire"], readings: ["あてさき"], mnemonicFr: "Le DESTINATAIRE de la lettre.", levelId: 54 },
    { word: "宛名", meaningsFr: ["Nom du destinataire"], readings: ["あてな"], mnemonicFr: "Le NOM DU DESTINATAIRE.", levelId: 54 },
    { word: "嵐", meaningsFr: ["Tempête"], readings: ["あらし"], mnemonicFr: "Une TEMPÊTE violente.", levelId: 54 },
    { word: "威力", meaningsFr: ["Puissance"], readings: ["いりょく"], mnemonicFr: "La PUISSANCE de l'arme.", levelId: 54 },
    { word: "威厳", meaningsFr: ["Dignité"], readings: ["いげん"], mnemonicFr: "La DIGNITÉ du roi.", levelId: 54 },
    { word: "脅威", meaningsFr: ["Menace"], readings: ["きょうい"], mnemonicFr: "Une MENACE sérieuse.", levelId: 54 },
    { word: "慰める", meaningsFr: ["Consoler"], readings: ["なぐさめる"], mnemonicFr: "CONSOLER un ami.", levelId: 54 },
    { word: "慰安", meaningsFr: ["Réconfort"], readings: ["いあん"], mnemonicFr: "Le RÉCONFORT.", levelId: 54 },
    { word: "慰謝料", meaningsFr: ["Dommages et intérêts"], readings: ["いしゃりょう"], mnemonicFr: "Les DOMMAGES ET INTÉRÊTS.", levelId: 54 },
    { word: "椅子", meaningsFr: ["Chaise"], readings: ["いす"], mnemonicFr: "Une CHAISE.", levelId: 54 },
    { word: "為替", meaningsFr: ["Change", "Virement"], readings: ["かわせ"], mnemonicFr: "Le CHANGE de devises.", levelId: 54 },
    { word: "行為", meaningsFr: ["Acte", "Action"], readings: ["こうい"], mnemonicFr: "Un ACTE volontaire.", levelId: 54 },
    { word: "畏敬", meaningsFr: ["Respect", "Révérence"], readings: ["いけい"], mnemonicFr: "Le RESPECT profond.", levelId: 54 },
    { word: "萎縮", meaningsFr: ["Atrophie", "Intimidation"], readings: ["いしゅく"], mnemonicFr: "L'ATROPHIE du muscle.", levelId: 54 },
    { word: "衣服", meaningsFr: ["Vêtements"], readings: ["いふく"], mnemonicFr: "Les VÊTEMENTS.", levelId: 54 },
    { word: "衣装", meaningsFr: ["Costume"], readings: ["いしょう"], mnemonicFr: "Un COSTUME.", levelId: 54 },
    { word: "違反", meaningsFr: ["Violation"], readings: ["いはん"], mnemonicFr: "Une VIOLATION de la loi.", levelId: 54 },
    { word: "違法", meaningsFr: ["Illégal"], readings: ["いほう"], mnemonicFr: "C'est ILLÉGAL.", levelId: 54 },
    { word: "維持", meaningsFr: ["Maintenance"], readings: ["いじ"], mnemonicFr: "La MAINTENANCE du système.", levelId: 54 },
    { word: "繊維", meaningsFr: ["Fibre"], readings: ["せんい"], mnemonicFr: "La FIBRE textile.", levelId: 54 },
    { word: "緯度", meaningsFr: ["Latitude"], readings: ["いど"], mnemonicFr: "La LATITUDE géographique.", levelId: 54 },
    { word: "逸話", meaningsFr: ["Anecdote"], readings: ["いつわ"], mnemonicFr: "Une ANECDOTE intéressante.", levelId: 54 },
    { word: "稲", meaningsFr: ["Riz (plante)"], readings: ["いね"], mnemonicFr: "Le RIZ dans la rizière.", levelId: 54 },
    { word: "稲作", meaningsFr: ["Riziculture"], readings: ["いなさく"], mnemonicFr: "La RIZICULTURE.", levelId: 54 },
    { word: "芋", meaningsFr: ["Patate"], readings: ["いも"], mnemonicFr: "Une PATATE.", levelId: 54 },
    { word: "焼き芋", meaningsFr: ["Patate grillée"], readings: ["やきいも"], mnemonicFr: "Une PATATE GRILLÉE.", levelId: 54 },
    { word: "婚姻", meaningsFr: ["Mariage"], readings: ["こんいん"], mnemonicFr: "Le MARIAGE officiel.", levelId: 54 },
    { word: "韻", meaningsFr: ["Rime"], readings: ["いん"], mnemonicFr: "La RIME d'un poème.", levelId: 54 },
    { word: "韻文", meaningsFr: ["Poésie"], readings: ["いんぶん"], mnemonicFr: "La POÉSIE rimée.", levelId: 54 },
    { word: "渦", meaningsFr: ["Tourbillon"], readings: ["うず"], mnemonicFr: "Un TOURBILLON d'eau.", levelId: 54 },
    { word: "渦中", meaningsFr: ["Au milieu de"], readings: ["かちゅう"], mnemonicFr: "AU MILIEU du chaos.", levelId: 54 },
    { word: "浦", meaningsFr: ["Baie"], readings: ["うら"], mnemonicFr: "Une BAIE côtière.", levelId: 54 },
    { word: "瓜", meaningsFr: ["Melon"], readings: ["うり"], mnemonicFr: "Un MELON.", levelId: 54 },
    { word: "西瓜", meaningsFr: ["Pastèque"], readings: ["すいか"], mnemonicFr: "Une PASTÈQUE.", levelId: 54 },
    { word: "胡瓜", meaningsFr: ["Concombre"], readings: ["きゅうり"], mnemonicFr: "Un CONCOMBRE.", levelId: 54 },
    { word: "閏年", meaningsFr: ["Année bissextile"], readings: ["うるうどし"], mnemonicFr: "Une ANNÉE BISSEXTILE.", levelId: 54 },
    { word: "噂", meaningsFr: ["Rumeur"], readings: ["うわさ"], mnemonicFr: "Une RUMEUR.", levelId: 54 },
    { word: "噂話", meaningsFr: ["Commérages"], readings: ["うわさばなし"], mnemonicFr: "Des COMMÉRAGES.", levelId: 54 },
    { word: "餌", meaningsFr: ["Appât"], readings: ["えさ"], mnemonicFr: "L'APPÂT pour pêcher.", levelId: 54 },
    { word: "叡智", meaningsFr: ["Sagesse"], readings: ["えいち"], mnemonicFr: "La SAGESSE profonde.", levelId: 54 },
    { word: "疫病", meaningsFr: ["Épidémie"], readings: ["えきびょう"], mnemonicFr: "Une ÉPIDÉMIE.", levelId: 54 },
    { word: "免疫", meaningsFr: ["Immunité"], readings: ["めんえき"], mnemonicFr: "L'IMMUNITÉ.", levelId: 54 },
    { word: "防疫", meaningsFr: ["Prévention épidémique"], readings: ["ぼうえき"], mnemonicFr: "La PRÉVENTION ÉPIDÉMIQUE.", levelId: 54 },
    { word: "悦び", meaningsFr: ["Joie"], readings: ["よろこび"], mnemonicFr: "La JOIE.", levelId: 54 },
    { word: "謁見", meaningsFr: ["Audience"], readings: ["えっけん"], mnemonicFr: "Une AUDIENCE avec le roi.", levelId: 54 },
    { word: "越える", meaningsFr: ["Dépasser", "Traverser"], readings: ["こえる"], mnemonicFr: "DÉPASSER la limite.", levelId: 54 },
    { word: "超越", meaningsFr: ["Transcendance"], readings: ["ちょうえつ"], mnemonicFr: "La TRANSCENDANCE.", levelId: 54 },
    { word: "越冬", meaningsFr: ["Hibernation"], readings: ["えっとう"], mnemonicFr: "L'HIBERNATION.", levelId: 54 },
    { word: "閲覧", meaningsFr: ["Consultation"], readings: ["えつらん"], mnemonicFr: "La CONSULTATION de documents.", levelId: 54 },
    { word: "検閲", meaningsFr: ["Censure"], readings: ["けんえつ"], mnemonicFr: "La CENSURE.", levelId: 54 },
  ];

  for (const vocab of level54Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 54 complete! Added", level54Kanji.length, "kanji and", level54Vocab.length, "vocabulary");

  // ============================================
  // LEVEL 55 - JLPT N1 Advanced Kanji (Nature/Science)
  // ============================================

  const level55Kanji = [
    { character: "円", meaningsFr: ["Yen", "Cercle"], readingsOn: ["エン"], readingsKun: ["まる-い"], meaningMnemonicFr: "Le cercle parfait. Le YEN japonais.", readingMnemonicFr: "En - le YEN !" },
    { character: "宴", meaningsFr: ["Banquet"], readingsOn: ["エン"], readingsKun: [], meaningMnemonicFr: "Le toit et la femme et le soleil. Le BANQUET.", readingMnemonicFr: "En - le BANQUET !" },
    { character: "援", meaningsFr: ["Aide", "Secours"], readingsOn: ["エン"], readingsKun: [], meaningMnemonicFr: "La main et le chaud. L'AIDE.", readingMnemonicFr: "En - l'AIDE !" },
    { character: "炎", meaningsFr: ["Flamme"], readingsOn: ["エン"], readingsKun: ["ほのお"], meaningMnemonicFr: "Deux feux. La FLAMME.", readingMnemonicFr: "Honoo - la FLAMME !" },
    { character: "猿", meaningsFr: ["Singe"], readingsOn: ["エン"], readingsKun: ["さる"], meaningMnemonicFr: "Le chien et le vêtement. Le SINGE.", readingMnemonicFr: "Saru - le SINGE !" },
    { character: "縁", meaningsFr: ["Lien", "Bord"], readingsOn: ["エン"], readingsKun: ["ふち"], meaningMnemonicFr: "Le fil et le cochon. Le LIEN du destin.", readingMnemonicFr: "En - le LIEN !" },
    { character: "艶", meaningsFr: ["Charme", "Lustre"], readingsOn: ["エン"], readingsKun: ["つや"], meaningMnemonicFr: "Le riche et le couleur. Le CHARME.", readingMnemonicFr: "Tsuya - le CHARME !" },
    { character: "鉛", meaningsFr: ["Plomb"], readingsOn: ["エン"], readingsKun: ["なまり"], meaningMnemonicFr: "Le métal et le balcon. Le PLOMB.", readingMnemonicFr: "Namari - le PLOMB !" },
    { character: "凹", meaningsFr: ["Concave"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "La forme concave. CONCAVE.", readingMnemonicFr: "Ou - CONCAVE !" },
    { character: "凸", meaningsFr: ["Convexe"], readingsOn: ["トツ"], readingsKun: [], meaningMnemonicFr: "La forme convexe. CONVEXE.", readingMnemonicFr: "Totsu - CONVEXE !" },
    { character: "殴", meaningsFr: ["Frapper"], readingsOn: ["オウ"], readingsKun: ["なぐ-る"], meaningMnemonicFr: "La mort et la région. FRAPPER.", readingMnemonicFr: "Naguru - FRAPPER !" },
    { character: "翁", meaningsFr: ["Vieillard"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "Le public et les plumes. Le VIEILLARD.", readingMnemonicFr: "Ou - le VIEILLARD !" },
    { character: "旺", meaningsFr: ["Florissant"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "Le soleil et le roi. FLORISSANT.", readingMnemonicFr: "Ou - FLORISSANT !" },
    { character: "欧", meaningsFr: ["Europe"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "Le manque et le région. L'EUROPE.", readingMnemonicFr: "Ou - l'EUROPE !" },
    { character: "殴", meaningsFr: ["Frapper"], readingsOn: ["オウ"], readingsKun: ["なぐ-る"], meaningMnemonicFr: "La mort et la région. FRAPPER violemment.", readingMnemonicFr: "Naguru - FRAPPER !" },
    { character: "翁", meaningsFr: ["Vieillard sage"], readingsOn: ["オウ"], readingsKun: ["おきな"], meaningMnemonicFr: "Les plumes et le public. Le sage VIEILLARD.", readingMnemonicFr: "Okina - le VIEILLARD !" },
    { character: "奥", meaningsFr: ["Intérieur", "Profond"], readingsOn: ["オウ"], readingsKun: ["おく"], meaningMnemonicFr: "Le toit et le riz et le grand. L'INTÉRIEUR profond.", readingMnemonicFr: "Oku - l'INTÉRIEUR !" },
    { character: "憶", meaningsFr: ["Se souvenir"], readingsOn: ["オク"], readingsKun: [], meaningMnemonicFr: "Le coeur et l'intention. SE SOUVENIR.", readingMnemonicFr: "Oku - SE SOUVENIR !" },
    { character: "臆", meaningsFr: ["Timide", "Hésiter"], readingsOn: ["オク"], readingsKun: [], meaningMnemonicFr: "La chair et l'intention. TIMIDE.", readingMnemonicFr: "Oku - TIMIDE !" },
    { character: "虞", meaningsFr: ["Crainte", "Risque"], readingsOn: ["グ"], readingsKun: ["おそれ"], meaningMnemonicFr: "Le tigre et le bol. La CRAINTE du risque.", readingMnemonicFr: "Gu - la CRAINTE !" },
    { character: "乙", meaningsFr: ["Deuxième", "Élégant"], readingsOn: ["オツ"], readingsKun: [], meaningMnemonicFr: "Le crochet élégant. DEUXIÈME.", readingMnemonicFr: "Otsu - DEUXIÈME !" },
    { character: "俺", meaningsFr: ["Je (masculin)"], readingsOn: [], readingsKun: ["おれ"], meaningMnemonicFr: "La personne et le grand. JE (masculin).", readingMnemonicFr: "Ore - JE !" },
    { character: "卸", meaningsFr: ["Grossiste", "Décharger"], readingsOn: ["シャ"], readingsKun: ["おろ-す"], meaningMnemonicFr: "Le arrêter et le midi. Le GROSSISTE.", readingMnemonicFr: "Orosu - GROSSISTE !" },
    { character: "穏", meaningsFr: ["Calme", "Paisible"], readingsOn: ["オン"], readingsKun: ["おだ-やか"], meaningMnemonicFr: "Le grain et le coeur tranquille. CALME.", readingMnemonicFr: "Odayaka - CALME !" },
    { character: "佳", meaningsFr: ["Excellent", "Beau"], readingsOn: ["カ"], readingsKun: [], meaningMnemonicFr: "La personne et le terre double. EXCELLENT.", readingMnemonicFr: "Ka - EXCELLENT !" },
    { character: "架", meaningsFr: ["Étagère", "Construire"], readingsOn: ["カ"], readingsKun: ["か-ける"], meaningMnemonicFr: "L'arbre et le ajouter. L'ÉTAGÈRE.", readingMnemonicFr: "Ka - l'ÉTAGÈRE !" },
    { character: "華", meaningsFr: ["Fleur", "Splendeur"], readingsOn: ["カ"], readingsKun: ["はな"], meaningMnemonicFr: "L'herbe et le changement. La SPLENDEUR.", readingMnemonicFr: "Ka - la SPLENDEUR !" },
    { character: "菓", meaningsFr: ["Bonbon", "Gâteau"], readingsOn: ["カ"], readingsKun: [], meaningMnemonicFr: "L'herbe et le fruit. Le GÂTEAU.", readingMnemonicFr: "Ka - le GÂTEAU !" },
    { character: "渦", meaningsFr: ["Tourbillon"], readingsOn: ["カ"], readingsKun: ["うず"], meaningMnemonicFr: "L'eau et la bouche. Le TOURBILLON.", readingMnemonicFr: "Uzu - le TOURBILLON !" },
    { character: "嫁", meaningsFr: ["Mariée", "Se marier"], readingsOn: ["カ"], readingsKun: ["よめ", "とつ-ぐ"], meaningMnemonicFr: "La femme et la maison. La MARIÉE.", readingMnemonicFr: "Yome - la MARIÉE !" },
    { character: "暇", meaningsFr: ["Temps libre"], readingsOn: ["カ"], readingsKun: ["ひま"], meaningMnemonicFr: "Le soleil et l'autoriser. Le TEMPS LIBRE.", readingMnemonicFr: "Hima - le TEMPS LIBRE !" },
    { character: "禍", meaningsFr: ["Malheur", "Calamité"], readingsOn: ["カ"], readingsKun: ["わざわい"], meaningMnemonicFr: "L'autel et la bouche. Le MALHEUR.", readingMnemonicFr: "Ka - le MALHEUR !" },
    { character: "稼", meaningsFr: ["Gagner sa vie"], readingsOn: ["カ"], readingsKun: ["かせ-ぐ"], meaningMnemonicFr: "Le grain et la maison. GAGNER SA VIE.", readingMnemonicFr: "Kasegu - GAGNER SA VIE !" },
    { character: "箇", meaningsFr: ["Compteur"], readingsOn: ["カ"], readingsKun: [], meaningMnemonicFr: "Le bambou et le fixe. Le COMPTEUR.", readingMnemonicFr: "Ka - COMPTEUR !" },
  ];

  for (const kanji of level55Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 55 },
      create: { ...kanji, levelId: 55 },
    });
  }

  const level55Vocab = [
    { word: "宴会", meaningsFr: ["Banquet"], readings: ["えんかい"], mnemonicFr: "Un BANQUET festif.", levelId: 55 },
    { word: "支援", meaningsFr: ["Soutien"], readings: ["しえん"], mnemonicFr: "Le SOUTIEN technique.", levelId: 55 },
    { word: "援助", meaningsFr: ["Aide"], readings: ["えんじょ"], mnemonicFr: "L'AIDE humanitaire.", levelId: 55 },
    { word: "応援", meaningsFr: ["Encouragement"], readings: ["おうえん"], mnemonicFr: "L'ENCOURAGEMENT de l'équipe.", levelId: 55 },
    { word: "炎", meaningsFr: ["Flamme"], readings: ["ほのお"], mnemonicFr: "La FLAMME brûlante.", levelId: 55 },
    { word: "炎上", meaningsFr: ["S'embraser", "Polémique"], readings: ["えんじょう"], mnemonicFr: "S'EMBRASER sur internet.", levelId: 55 },
    { word: "猿", meaningsFr: ["Singe"], readings: ["さる"], mnemonicFr: "Un SINGE.", levelId: 55 },
    { word: "縁", meaningsFr: ["Lien du destin"], readings: ["えん"], mnemonicFr: "Le LIEN du destin.", levelId: 55 },
    { word: "縁起", meaningsFr: ["Présage"], readings: ["えんぎ"], mnemonicFr: "Un bon PRÉSAGE.", levelId: 55 },
    { word: "無縁", meaningsFr: ["Sans rapport"], readings: ["むえん"], mnemonicFr: "SANS RAPPORT.", levelId: 55 },
    { word: "艶", meaningsFr: ["Lustre"], readings: ["つや"], mnemonicFr: "Le LUSTRE des cheveux.", levelId: 55 },
    { word: "鉛筆", meaningsFr: ["Crayon"], readings: ["えんぴつ"], mnemonicFr: "Un CRAYON à papier.", levelId: 55 },
    { word: "鉛", meaningsFr: ["Plomb"], readings: ["なまり"], mnemonicFr: "Le métal PLOMB.", levelId: 55 },
    { word: "凹凸", meaningsFr: ["Inégalité"], readings: ["おうとつ"], mnemonicFr: "Surface INÉGALE.", levelId: 55 },
    { word: "殴る", meaningsFr: ["Frapper"], readings: ["なぐる"], mnemonicFr: "FRAPPER quelqu'un.", levelId: 55 },
    { word: "殴り合い", meaningsFr: ["Bagarre"], readings: ["なぐりあい"], mnemonicFr: "Une BAGARRE.", levelId: 55 },
    { word: "翁", meaningsFr: ["Vieillard"], readings: ["おきな"], mnemonicFr: "Un sage VIEILLARD.", levelId: 55 },
    { word: "旺盛", meaningsFr: ["Florissant"], readings: ["おうせい"], mnemonicFr: "Un appétit FLORISSANT.", levelId: 55 },
    { word: "欧州", meaningsFr: ["Europe"], readings: ["おうしゅう"], mnemonicFr: "L'EUROPE.", levelId: 55 },
    { word: "欧米", meaningsFr: ["Occident"], readings: ["おうべい"], mnemonicFr: "L'OCCIDENT.", levelId: 55 },
    { word: "奥", meaningsFr: ["Intérieur"], readings: ["おく"], mnemonicFr: "L'INTÉRIEUR de la maison.", levelId: 55 },
    { word: "奥さん", meaningsFr: ["Épouse"], readings: ["おくさん"], mnemonicFr: "Votre ÉPOUSE.", levelId: 55 },
    { word: "奥深い", meaningsFr: ["Profond"], readings: ["おくぶかい"], mnemonicFr: "Un sujet PROFOND.", levelId: 55 },
    { word: "記憶", meaningsFr: ["Mémoire"], readings: ["きおく"], mnemonicFr: "La MÉMOIRE.", levelId: 55 },
    { word: "臆病", meaningsFr: ["Lâche"], readings: ["おくびょう"], mnemonicFr: "Être LÂCHE.", levelId: 55 },
    { word: "乙女", meaningsFr: ["Jeune fille"], readings: ["おとめ"], mnemonicFr: "Une JEUNE FILLE.", levelId: 55 },
    { word: "甲乙", meaningsFr: ["Mérites comparés"], readings: ["こうおつ"], mnemonicFr: "Comparer les MÉRITES.", levelId: 55 },
    { word: "俺", meaningsFr: ["Je (masculin)"], readings: ["おれ"], mnemonicFr: "JE (masculin informel).", levelId: 55 },
    { word: "卸売", meaningsFr: ["Vente en gros"], readings: ["おろしうり"], mnemonicFr: "VENTE EN GROS.", levelId: 55 },
    { word: "穏やか", meaningsFr: ["Calme"], readings: ["おだやか"], mnemonicFr: "Un temps CALME.", levelId: 55 },
    { word: "平穏", meaningsFr: ["Paix"], readings: ["へいおん"], mnemonicFr: "La PAIX.", levelId: 55 },
    { word: "佳作", meaningsFr: ["Bonne oeuvre"], readings: ["かさく"], mnemonicFr: "Une BONNE OEUVRE.", levelId: 55 },
    { word: "架ける", meaningsFr: ["Construire (pont)"], readings: ["かける"], mnemonicFr: "CONSTRUIRE un pont.", levelId: 55 },
    { word: "書架", meaningsFr: ["Étagère"], readings: ["しょか"], mnemonicFr: "Une ÉTAGÈRE à livres.", levelId: 55 },
    { word: "華やか", meaningsFr: ["Splendide"], readings: ["はなやか"], mnemonicFr: "Un style SPLENDIDE.", levelId: 55 },
    { word: "中華", meaningsFr: ["Chinois"], readings: ["ちゅうか"], mnemonicFr: "Cuisine CHINOISE.", levelId: 55 },
    { word: "菓子", meaningsFr: ["Gâteau"], readings: ["かし"], mnemonicFr: "Un GÂTEAU.", levelId: 55 },
    { word: "お菓子", meaningsFr: ["Bonbons"], readings: ["おかし"], mnemonicFr: "Des BONBONS.", levelId: 55 },
    { word: "駄菓子", meaningsFr: ["Bonbons bon marché"], readings: ["だがし"], mnemonicFr: "Des BONBONS BON MARCHÉ.", levelId: 55 },
    { word: "お嫁さん", meaningsFr: ["Mariée"], readings: ["およめさん"], mnemonicFr: "La MARIÉE.", levelId: 55 },
    { word: "嫁ぐ", meaningsFr: ["Se marier"], readings: ["とつぐ"], mnemonicFr: "SE MARIER.", levelId: 55 },
    { word: "暇", meaningsFr: ["Temps libre"], readings: ["ひま"], mnemonicFr: "Du TEMPS LIBRE.", levelId: 55 },
    { word: "休暇", meaningsFr: ["Vacances"], readings: ["きゅうか"], mnemonicFr: "Les VACANCES.", levelId: 55 },
    { word: "禍", meaningsFr: ["Malheur"], readings: ["わざわい"], mnemonicFr: "Le MALHEUR.", levelId: 55 },
    { word: "戦禍", meaningsFr: ["Ravages de guerre"], readings: ["せんか"], mnemonicFr: "Les RAVAGES DE GUERRE.", levelId: 55 },
    { word: "稼ぐ", meaningsFr: ["Gagner (argent)"], readings: ["かせぐ"], mnemonicFr: "GAGNER de l'argent.", levelId: 55 },
    { word: "稼業", meaningsFr: ["Métier"], readings: ["かぎょう"], mnemonicFr: "Son MÉTIER.", levelId: 55 },
    { word: "共稼ぎ", meaningsFr: ["Double revenu"], readings: ["ともかせぎ"], mnemonicFr: "Un DOUBLE REVENU.", levelId: 55 },
    { word: "一箇所", meaningsFr: ["Un endroit"], readings: ["いっかしょ"], mnemonicFr: "UN ENDROIT.", levelId: 55 },
    { word: "数箇月", meaningsFr: ["Quelques mois"], readings: ["すうかげつ"], mnemonicFr: "QUELQUES MOIS.", levelId: 55 },
  ];

  for (const vocab of level55Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 55 complete! Added", level55Kanji.length, "kanji and", level55Vocab.length, "vocabulary");

  // ============================================
  // LEVEL 56 - JLPT N1 Advanced Kanji (Society/Culture)
  // ============================================

  const level56Kanji = [
    { character: "蚊", meaningsFr: ["Moustique"], readingsOn: [], readingsKun: ["か"], meaningMnemonicFr: "L'insecte qui pique. Le MOUSTIQUE.", readingMnemonicFr: "Ka - le MOUSTIQUE !" },
    { character: "牙", meaningsFr: ["Croc"], readingsOn: ["ガ"], readingsKun: ["きば"], meaningMnemonicFr: "La dent pointue. Le CROC.", readingMnemonicFr: "Kiba - le CROC !" },
    { character: "瓦", meaningsFr: ["Tuile"], readingsOn: ["ガ"], readingsKun: ["かわら"], meaningMnemonicFr: "Le toit en terre cuite. La TUILE.", readingMnemonicFr: "Kawara - la TUILE !" },
    { character: "雅", meaningsFr: ["Élégant"], readingsOn: ["ガ"], readingsKun: ["みやび"], meaningMnemonicFr: "Le oiseau et le dent. ÉLÉGANT.", readingMnemonicFr: "Ga - ÉLÉGANT !" },
    { character: "餓", meaningsFr: ["Affamé"], readingsOn: ["ガ"], readingsKun: [], meaningMnemonicFr: "La nourriture et le moi. AFFAMÉ.", readingMnemonicFr: "Ga - AFFAMÉ !" },
    { character: "介", meaningsFr: ["Intermédiaire"], readingsOn: ["カイ"], readingsKun: [], meaningMnemonicFr: "La personne entre. L'INTERMÉDIAIRE.", readingMnemonicFr: "Kai - l'INTERMÉDIAIRE !" },
    { character: "戒", meaningsFr: ["Avertir", "Précepte"], readingsOn: ["カイ"], readingsKun: ["いまし-める"], meaningMnemonicFr: "Le arrêter et la hallebarde. AVERTIR.", readingMnemonicFr: "Kai - AVERTIR !" },
    { character: "怪", meaningsFr: ["Mystérieux"], readingsOn: ["カイ"], readingsKun: ["あや-しい"], meaningMnemonicFr: "Le coeur et le saint. MYSTÉRIEUX.", readingMnemonicFr: "Kai - MYSTÉRIEUX !" },
    { character: "悔", meaningsFr: ["Regretter"], readingsOn: ["カイ"], readingsKun: ["く-いる", "く-やむ"], meaningMnemonicFr: "Le coeur et le chaque. REGRETTER.", readingMnemonicFr: "Kuiru - REGRETTER !" },
    { character: "拐", meaningsFr: ["Kidnapper"], readingsOn: ["カイ"], readingsKun: [], meaningMnemonicFr: "La main et l'autre. KIDNAPPER.", readingMnemonicFr: "Kai - KIDNAPPER !" },
    { character: "塊", meaningsFr: ["Bloc", "Masse"], readingsOn: ["カイ"], readingsKun: ["かたまり"], meaningMnemonicFr: "La terre et le fantôme. Le BLOC.", readingMnemonicFr: "Katamari - le BLOC !" },
    { character: "壊", meaningsFr: ["Détruire"], readingsOn: ["カイ"], readingsKun: ["こわ-す"], meaningMnemonicFr: "La terre et la tenue. DÉTRUIRE.", readingMnemonicFr: "Kowasu - DÉTRUIRE !" },
    { character: "懐", meaningsFr: ["Poitrine", "Nostalgie"], readingsOn: ["カイ"], readingsKun: ["ふところ", "なつ-かしい"], meaningMnemonicFr: "Le coeur et la tenue. La POITRINE.", readingMnemonicFr: "Futokoro - la POITRINE !" },
    { character: "諧", meaningsFr: ["Harmonie"], readingsOn: ["カイ"], readingsKun: [], meaningMnemonicFr: "Les paroles et le tous. L'HARMONIE.", readingMnemonicFr: "Kai - l'HARMONIE !" },
    { character: "劾", meaningsFr: ["Destituer"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "La force et le fermer. DESTITUER.", readingMnemonicFr: "Gai - DESTITUER !" },
    { character: "涯", meaningsFr: ["Limite", "Horizon"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "L'eau et le limite. L'HORIZON.", readingMnemonicFr: "Gai - l'HORIZON !" },
    { character: "慨", meaningsFr: ["Indignation"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "Le coeur et le déjà. L'INDIGNATION.", readingMnemonicFr: "Gai - l'INDIGNATION !" },
    { character: "蓋", meaningsFr: ["Couvercle"], readingsOn: ["ガイ"], readingsKun: ["ふた"], meaningMnemonicFr: "L'herbe et le fermer. Le COUVERCLE.", readingMnemonicFr: "Futa - le COUVERCLE !" },
    { character: "該", meaningsFr: ["Correspondre"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "Les paroles et le fermer. CORRESPONDRE.", readingMnemonicFr: "Gai - CORRESPONDRE !" },
    { character: "鎧", meaningsFr: ["Armure"], readingsOn: ["カイ"], readingsKun: ["よろい"], meaningMnemonicFr: "Le métal et le montagne. L'ARMURE.", readingMnemonicFr: "Yoroi - l'ARMURE !" },
    { character: "骸", meaningsFr: ["Squelette"], readingsOn: ["ガイ"], readingsKun: ["むくろ"], meaningMnemonicFr: "L'os et le fermer. Le SQUELETTE.", readingMnemonicFr: "Gai - le SQUELETTE !" },
    { character: "柿", meaningsFr: ["Kaki (fruit)"], readingsOn: ["シ"], readingsKun: ["かき"], meaningMnemonicFr: "L'arbre et le ville. Le KAKI.", readingMnemonicFr: "Kaki - le KAKI !" },
    { character: "垣", meaningsFr: ["Haie", "Clôture"], readingsOn: ["エン"], readingsKun: ["かき"], meaningMnemonicFr: "La terre et le constant. La HAIE.", readingMnemonicFr: "Kaki - la HAIE !" },
    { character: "殻", meaningsFr: ["Coquille"], readingsOn: ["カク"], readingsKun: ["から"], meaningMnemonicFr: "La mort et le grain. La COQUILLE.", readingMnemonicFr: "Kara - la COQUILLE !" },
    { character: "穀", meaningsFr: ["Céréale"], readingsOn: ["コク"], readingsKun: [], meaningMnemonicFr: "Le grain et la mort. La CÉRÉALE.", readingMnemonicFr: "Koku - la CÉRÉALE !" },
    { character: "郭", meaningsFr: ["Enceinte"], readingsOn: ["カク"], readingsKun: [], meaningMnemonicFr: "L'oreille et la ville. L'ENCEINTE.", readingMnemonicFr: "Kaku - l'ENCEINTE !" },
    { character: "隔", meaningsFr: ["Séparer"], readingsOn: ["カク"], readingsKun: ["へだ-てる"], meaningMnemonicFr: "La colline et l'enceinte. SÉPARER.", readingMnemonicFr: "Hedateru - SÉPARER !" },
    { character: "岳", meaningsFr: ["Pic", "Montagne"], readingsOn: ["ガク"], readingsKun: ["たけ"], meaningMnemonicFr: "La montagne et le chien. Le PIC.", readingMnemonicFr: "Take - le PIC !" },
    { character: "潟", meaningsFr: ["Lagune"], readingsOn: [], readingsKun: ["かた"], meaningMnemonicFr: "L'eau et la vente. La LAGUNE.", readingMnemonicFr: "Kata - la LAGUNE !" },
    { character: "喝", meaningsFr: ["Crier"], readingsOn: ["カツ"], readingsKun: [], meaningMnemonicFr: "La bouche et le brun. CRIER.", readingMnemonicFr: "Katsu - CRIER !" },
    { character: "括", meaningsFr: ["Attacher"], readingsOn: ["カツ"], readingsKun: ["くく-る"], meaningMnemonicFr: "La main et la langue. ATTACHER.", readingMnemonicFr: "Kukuru - ATTACHER !" },
    { character: "渇", meaningsFr: ["Soif"], readingsOn: ["カツ"], readingsKun: ["かわ-く"], meaningMnemonicFr: "L'eau et le brun. La SOIF.", readingMnemonicFr: "Kawaku - avoir SOIF !" },
    { character: "滑", meaningsFr: ["Glisser"], readingsOn: ["カツ"], readingsKun: ["すべ-る", "なめ-らか"], meaningMnemonicFr: "L'eau et l'os. GLISSER.", readingMnemonicFr: "Suberu - GLISSER !" },
    { character: "轄", meaningsFr: ["Juridiction"], readingsOn: ["カツ"], readingsKun: [], meaningMnemonicFr: "Le véhicule et le fermer. La JURIDICTION.", readingMnemonicFr: "Katsu - la JURIDICTION !" },
  ];

  for (const kanji of level56Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 56 },
      create: { ...kanji, levelId: 56 },
    });
  }

  const level56Vocab = [
    { word: "蚊", meaningsFr: ["Moustique"], readings: ["か"], mnemonicFr: "Un MOUSTIQUE.", levelId: 56 },
    { word: "蚊帳", meaningsFr: ["Moustiquaire"], readings: ["かや"], mnemonicFr: "Une MOUSTIQUAIRE.", levelId: 56 },
    { word: "牙", meaningsFr: ["Croc"], readings: ["きば"], mnemonicFr: "Les CROCS du loup.", levelId: 56 },
    { word: "象牙", meaningsFr: ["Ivoire"], readings: ["ぞうげ"], mnemonicFr: "L'IVOIRE.", levelId: 56 },
    { word: "瓦", meaningsFr: ["Tuile"], readings: ["かわら"], mnemonicFr: "Une TUILE de toit.", levelId: 56 },
    { word: "雅", meaningsFr: ["Élégance"], readings: ["みやび"], mnemonicFr: "L'ÉLÉGANCE japonaise.", levelId: 56 },
    { word: "優雅", meaningsFr: ["Gracieux"], readings: ["ゆうが"], mnemonicFr: "Un geste GRACIEUX.", levelId: 56 },
    { word: "餓死", meaningsFr: ["Mort de faim"], readings: ["がし"], mnemonicFr: "MOURIR DE FAIM.", levelId: 56 },
    { word: "介入", meaningsFr: ["Intervention"], readings: ["かいにゅう"], mnemonicFr: "Une INTERVENTION.", levelId: 56 },
    { word: "紹介", meaningsFr: ["Présentation"], readings: ["しょうかい"], mnemonicFr: "Une PRÉSENTATION.", levelId: 56 },
    { word: "仲介", meaningsFr: ["Médiation"], readings: ["ちゅうかい"], mnemonicFr: "Une MÉDIATION.", levelId: 56 },
    { word: "戒める", meaningsFr: ["Avertir"], readings: ["いましめる"], mnemonicFr: "AVERTIR quelqu'un.", levelId: 56 },
    { word: "警戒", meaningsFr: ["Vigilance"], readings: ["けいかい"], mnemonicFr: "La VIGILANCE.", levelId: 56 },
    { word: "怪しい", meaningsFr: ["Suspect"], readings: ["あやしい"], mnemonicFr: "C'est SUSPECT.", levelId: 56 },
    { word: "怪物", meaningsFr: ["Monstre"], readings: ["かいぶつ"], mnemonicFr: "Un MONSTRE.", levelId: 56 },
    { word: "怪我", meaningsFr: ["Blessure"], readings: ["けが"], mnemonicFr: "Une BLESSURE.", levelId: 56 },
    { word: "悔いる", meaningsFr: ["Regretter"], readings: ["くいる"], mnemonicFr: "REGRETTER ses actes.", levelId: 56 },
    { word: "後悔", meaningsFr: ["Regret"], readings: ["こうかい"], mnemonicFr: "Le REGRET.", levelId: 56 },
    { word: "誘拐", meaningsFr: ["Kidnapping"], readings: ["ゆうかい"], mnemonicFr: "Un KIDNAPPING.", levelId: 56 },
    { word: "塊", meaningsFr: ["Bloc"], readings: ["かたまり"], mnemonicFr: "Un BLOC de pierre.", levelId: 56 },
    { word: "壊す", meaningsFr: ["Détruire"], readings: ["こわす"], mnemonicFr: "DÉTRUIRE quelque chose.", levelId: 56 },
    { word: "壊れる", meaningsFr: ["Se casser"], readings: ["こわれる"], mnemonicFr: "Ça SE CASSE.", levelId: 56 },
    { word: "破壊", meaningsFr: ["Destruction"], readings: ["はかい"], mnemonicFr: "La DESTRUCTION.", levelId: 56 },
    { word: "懐かしい", meaningsFr: ["Nostalgique"], readings: ["なつかしい"], mnemonicFr: "C'est NOSTALGIQUE.", levelId: 56 },
    { word: "懐", meaningsFr: ["Poitrine"], readings: ["ふところ"], mnemonicFr: "La POITRINE.", levelId: 56 },
    { word: "弾劾", meaningsFr: ["Destitution"], readings: ["だんがい"], mnemonicFr: "La DESTITUTION.", levelId: 56 },
    { word: "生涯", meaningsFr: ["Toute la vie"], readings: ["しょうがい"], mnemonicFr: "TOUTE LA VIE.", levelId: 56 },
    { word: "感慨", meaningsFr: ["Émotion profonde"], readings: ["かんがい"], mnemonicFr: "Une ÉMOTION PROFONDE.", levelId: 56 },
    { word: "蓋", meaningsFr: ["Couvercle"], readings: ["ふた"], mnemonicFr: "Un COUVERCLE.", levelId: 56 },
    { word: "該当", meaningsFr: ["Correspondre"], readings: ["がいとう"], mnemonicFr: "CORRESPONDRE aux critères.", levelId: 56 },
    { word: "鎧", meaningsFr: ["Armure"], readings: ["よろい"], mnemonicFr: "Une ARMURE de samouraï.", levelId: 56 },
    { word: "骸骨", meaningsFr: ["Squelette"], readings: ["がいこつ"], mnemonicFr: "Un SQUELETTE.", levelId: 56 },
    { word: "柿", meaningsFr: ["Kaki"], readings: ["かき"], mnemonicFr: "Un fruit KAKI.", levelId: 56 },
    { word: "垣根", meaningsFr: ["Haie"], readings: ["かきね"], mnemonicFr: "Une HAIE.", levelId: 56 },
    { word: "殻", meaningsFr: ["Coquille"], readings: ["から"], mnemonicFr: "Une COQUILLE d'oeuf.", levelId: 56 },
    { word: "卵殻", meaningsFr: ["Coquille d'oeuf"], readings: ["らんかく"], mnemonicFr: "Une COQUILLE D'OEUF.", levelId: 56 },
    { word: "穀物", meaningsFr: ["Céréales"], readings: ["こくもつ"], mnemonicFr: "Les CÉRÉALES.", levelId: 56 },
    { word: "隔てる", meaningsFr: ["Séparer"], readings: ["へだてる"], mnemonicFr: "SÉPARER deux choses.", levelId: 56 },
    { word: "隔離", meaningsFr: ["Isolation"], readings: ["かくり"], mnemonicFr: "L'ISOLATION.", levelId: 56 },
    { word: "岳", meaningsFr: ["Pic"], readings: ["たけ"], mnemonicFr: "Un PIC de montagne.", levelId: 56 },
    { word: "新潟", meaningsFr: ["Niigata"], readings: ["にいがた"], mnemonicFr: "La ville de NIIGATA.", levelId: 56 },
    { word: "一喝", meaningsFr: ["Réprimande"], readings: ["いっかつ"], mnemonicFr: "Une RÉPRIMANDE.", levelId: 56 },
    { word: "括る", meaningsFr: ["Attacher"], readings: ["くくる"], mnemonicFr: "ATTACHER ensemble.", levelId: 56 },
    { word: "総括", meaningsFr: ["Résumé"], readings: ["そうかつ"], mnemonicFr: "Un RÉSUMÉ.", levelId: 56 },
    { word: "渇く", meaningsFr: ["Avoir soif"], readings: ["かわく"], mnemonicFr: "AVOIR SOIF.", levelId: 56 },
    { word: "渇望", meaningsFr: ["Désir ardent"], readings: ["かつぼう"], mnemonicFr: "Un DÉSIR ARDENT.", levelId: 56 },
    { word: "滑る", meaningsFr: ["Glisser"], readings: ["すべる"], mnemonicFr: "GLISSER sur la glace.", levelId: 56 },
    { word: "滑らか", meaningsFr: ["Lisse"], readings: ["なめらか"], mnemonicFr: "Une surface LISSE.", levelId: 56 },
    { word: "管轄", meaningsFr: ["Juridiction"], readings: ["かんかつ"], mnemonicFr: "La JURIDICTION.", levelId: 56 },
  ];

  for (const vocab of level56Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 56 complete! Added", level56Kanji.length, "kanji and", level56Vocab.length, "vocabulary");

  // Continue with levels 57-60...
  console.log("Levels 54-56 seeded. Run seed-levels-57-60.ts for remaining levels...");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
