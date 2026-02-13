import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding levels 57-60 (Final Advanced JLPT N1 Kanji)...");

  // ============================================
  // LEVEL 57 - JLPT N1 Advanced Kanji (Business/Formal)
  // ============================================

  const level57Kanji = [
    { character: "且", meaningsFr: ["De plus"], readingsOn: ["ショ"], readingsKun: ["か-つ"], meaningMnemonicFr: "La forme empilée. DE PLUS.", readingMnemonicFr: "Katsu - DE PLUS !" },
    { character: "刈", meaningsFr: ["Couper", "Faucher"], readingsOn: ["ガイ"], readingsKun: ["か-る"], meaningMnemonicFr: "Le sabre et la force. FAUCHER.", readingMnemonicFr: "Karu - FAUCHER !" },
    { character: "乾", meaningsFr: ["Sec"], readingsOn: ["カン"], readingsKun: ["かわ-く"], meaningMnemonicFr: "Le soleil et la force. SEC.", readingMnemonicFr: "Kawaku - devenir SEC !" },
    { character: "冠", meaningsFr: ["Couronne"], readingsOn: ["カン"], readingsKun: ["かんむり"], meaningMnemonicFr: "Le toit et le premier. La COURONNE.", readingMnemonicFr: "Kan - la COURONNE !" },
    { character: "勘", meaningsFr: ["Intuition"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le champ et la force. L'INTUITION.", readingMnemonicFr: "Kan - l'INTUITION !" },
    { character: "勧", meaningsFr: ["Conseiller"], readingsOn: ["カン"], readingsKun: ["すす-める"], meaningMnemonicFr: "La force et le difficile. CONSEILLER.", readingMnemonicFr: "Susumeru - CONSEILLER !" },
    { character: "喚", meaningsFr: ["Appeler"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "La bouche et le échanger. APPELER.", readingMnemonicFr: "Kan - APPELER !" },
    { character: "堪", meaningsFr: ["Supporter"], readingsOn: ["カン"], readingsKun: ["た-える"], meaningMnemonicFr: "La terre et le premier. SUPPORTER.", readingMnemonicFr: "Taeru - SUPPORTER !" },
    { character: "寛", meaningsFr: ["Généreux"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le toit et le voir. GÉNÉREUX.", readingMnemonicFr: "Kan - GÉNÉREUX !" },
    { character: "患", meaningsFr: ["Malade"], readingsOn: ["カン"], readingsKun: ["わずら-う"], meaningMnemonicFr: "Le coeur et le fermé. MALADE.", readingMnemonicFr: "Wazurau - être MALADE !" },
    { character: "憾", meaningsFr: ["Regret"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le coeur et le sentir. Le REGRET.", readingMnemonicFr: "Kan - le REGRET !" },
    { character: "換", meaningsFr: ["Échanger"], readingsOn: ["カン"], readingsKun: ["か-える"], meaningMnemonicFr: "La main et le cri. ÉCHANGER.", readingMnemonicFr: "Kaeru - ÉCHANGER !" },
    { character: "敢", meaningsFr: ["Oser"], readingsOn: ["カン"], readingsKun: ["あ-えて"], meaningMnemonicFr: "Le fermer et la force. OSER.", readingMnemonicFr: "Aete - OSER !" },
    { character: "棺", meaningsFr: ["Cercueil"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "L'arbre et le officiel. Le CERCUEIL.", readingMnemonicFr: "Kan - le CERCUEIL !" },
    { character: "款", meaningsFr: ["Article", "Clause"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le manque et le bois. L'ARTICLE.", readingMnemonicFr: "Kan - l'ARTICLE !" },
    { character: "歓", meaningsFr: ["Joie"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le manque et le voir. La JOIE.", readingMnemonicFr: "Kan - la JOIE !" },
    { character: "汗", meaningsFr: ["Sueur"], readingsOn: ["カン"], readingsKun: ["あせ"], meaningMnemonicFr: "L'eau et le sec. La SUEUR.", readingMnemonicFr: "Ase - la SUEUR !" },
    { character: "環", meaningsFr: ["Anneau", "Environnement"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le jade et le retour. L'ANNEAU.", readingMnemonicFr: "Kan - l'ANNEAU !" },
    { character: "甘", meaningsFr: ["Sucré"], readingsOn: ["カン"], readingsKun: ["あま-い"], meaningMnemonicFr: "La bouche avec quelque chose. SUCRÉ.", readingMnemonicFr: "Amai - c'est SUCRÉ !" },
    { character: "監", meaningsFr: ["Surveiller"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "L'oeil et le bol. SURVEILLER.", readingMnemonicFr: "Kan - SURVEILLER !" },
    { character: "看", meaningsFr: ["Regarder", "Soigner"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "La main et l'oeil. REGARDER.", readingMnemonicFr: "Kan - REGARDER !" },
    { character: "緩", meaningsFr: ["Lent", "Relâcher"], readingsOn: ["カン"], readingsKun: ["ゆる-い", "ゆる-める"], meaningMnemonicFr: "Le fil et le champ. RELÂCHER.", readingMnemonicFr: "Yurui - c'est LENT !" },
    { character: "缶", meaningsFr: ["Boîte"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le récipient. La BOÎTE.", readingMnemonicFr: "Kan - la BOÎTE !" },
    { character: "肝", meaningsFr: ["Foie"], readingsOn: ["カン"], readingsKun: ["きも"], meaningMnemonicFr: "La chair et le sec. Le FOIE.", readingMnemonicFr: "Kimo - le FOIE !" },
    { character: "艦", meaningsFr: ["Navire de guerre"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le bateau et le surveiller. Le NAVIRE DE GUERRE.", readingMnemonicFr: "Kan - le NAVIRE !" },
    { character: "貫", meaningsFr: ["Percer"], readingsOn: ["カン"], readingsKun: ["つらぬ-く"], meaningMnemonicFr: "Le mère et l'argent. PERCER.", readingMnemonicFr: "Tsuranuku - PERCER !" },
    { character: "還", meaningsFr: ["Retourner"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le chemin et le retour. RETOURNER.", readingMnemonicFr: "Kan - RETOURNER !" },
    { character: "鑑", meaningsFr: ["Miroir", "Examiner"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le métal et le surveiller. Le MIROIR.", readingMnemonicFr: "Kan - le MIROIR !" },
    { character: "陥", meaningsFr: ["Tomber dans"], readingsOn: ["カン"], readingsKun: ["おちい-る"], meaningMnemonicFr: "La colline et le fermer. TOMBER DANS.", readingMnemonicFr: "Ochiiru - TOMBER DANS !" },
    { character: "韓", meaningsFr: ["Corée"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le dix et le difficile. La CORÉE.", readingMnemonicFr: "Kan - la CORÉE !" },
    { character: "頑", meaningsFr: ["Têtu"], readingsOn: ["ガン"], readingsKun: [], meaningMnemonicFr: "L'original et la page. TÊTU.", readingMnemonicFr: "Gan - TÊTU !" },
    { character: "企", meaningsFr: ["Planifier"], readingsOn: ["キ"], readingsKun: ["くわだ-てる"], meaningMnemonicFr: "La personne et le arrêter. PLANIFIER.", readingMnemonicFr: "Ki - PLANIFIER !" },
    { character: "伎", meaningsFr: ["Art", "Acteur"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "La personne et la branche. L'ART.", readingMnemonicFr: "Gi - l'ART !" },
    { character: "危", meaningsFr: ["Danger"], readingsOn: ["キ"], readingsKun: ["あぶ-ない"], meaningMnemonicFr: "Le haut et la main. Le DANGER.", readingMnemonicFr: "Abunai - c'est DANGEREUX !" },
  ];

  for (const kanji of level57Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 57 },
      create: { ...kanji, levelId: 57 },
    });
  }

  const level57Vocab = [
    { word: "刈る", meaningsFr: ["Couper", "Faucher"], readings: ["かる"], mnemonicFr: "COUPER l'herbe.", levelId: 57 },
    { word: "草刈り", meaningsFr: ["Fauchage"], readings: ["くさかり"], mnemonicFr: "Le FAUCHAGE de l'herbe.", levelId: 57 },
    { word: "乾く", meaningsFr: ["Sécher"], readings: ["かわく"], mnemonicFr: "Le linge SÈCHE.", levelId: 57 },
    { word: "乾燥", meaningsFr: ["Sécheresse"], readings: ["かんそう"], mnemonicFr: "La SÉCHERESSE.", levelId: 57 },
    { word: "乾杯", meaningsFr: ["Toast"], readings: ["かんぱい"], mnemonicFr: "Un TOAST !", levelId: 57 },
    { word: "冠", meaningsFr: ["Couronne"], readings: ["かんむり"], mnemonicFr: "Une COURONNE royale.", levelId: 57 },
    { word: "王冠", meaningsFr: ["Couronne royale"], readings: ["おうかん"], mnemonicFr: "La COURONNE du roi.", levelId: 57 },
    { word: "勘", meaningsFr: ["Intuition"], readings: ["かん"], mnemonicFr: "L'INTUITION.", levelId: 57 },
    { word: "勘違い", meaningsFr: ["Malentendu"], readings: ["かんちがい"], mnemonicFr: "Un MALENTENDU.", levelId: 57 },
    { word: "勧める", meaningsFr: ["Conseiller"], readings: ["すすめる"], mnemonicFr: "CONSEILLER quelque chose.", levelId: 57 },
    { word: "勧誘", meaningsFr: ["Sollicitation"], readings: ["かんゆう"], mnemonicFr: "Une SOLLICITATION.", levelId: 57 },
    { word: "召喚", meaningsFr: ["Convocation"], readings: ["しょうかん"], mnemonicFr: "Une CONVOCATION.", levelId: 57 },
    { word: "堪える", meaningsFr: ["Supporter"], readings: ["たえる"], mnemonicFr: "SUPPORTER la douleur.", levelId: 57 },
    { word: "堪能", meaningsFr: ["Maîtrise"], readings: ["たんのう"], mnemonicFr: "La MAÎTRISE d'une langue.", levelId: 57 },
    { word: "寛大", meaningsFr: ["Généreux"], readings: ["かんだい"], mnemonicFr: "Être GÉNÉREUX.", levelId: 57 },
    { word: "患者", meaningsFr: ["Patient"], readings: ["かんじゃ"], mnemonicFr: "Un PATIENT à l'hôpital.", levelId: 57 },
    { word: "疾患", meaningsFr: ["Maladie"], readings: ["しっかん"], mnemonicFr: "Une MALADIE.", levelId: 57 },
    { word: "遺憾", meaningsFr: ["Regrettable"], readings: ["いかん"], mnemonicFr: "C'est REGRETTABLE.", levelId: 57 },
    { word: "換える", meaningsFr: ["Échanger"], readings: ["かえる"], mnemonicFr: "ÉCHANGER de l'argent.", levelId: 57 },
    { word: "交換", meaningsFr: ["Échange"], readings: ["こうかん"], mnemonicFr: "Un ÉCHANGE.", levelId: 57 },
    { word: "敢えて", meaningsFr: ["Oser"], readings: ["あえて"], mnemonicFr: "OSER faire quelque chose.", levelId: 57 },
    { word: "勇敢", meaningsFr: ["Courageux"], readings: ["ゆうかん"], mnemonicFr: "Être COURAGEUX.", levelId: 57 },
    { word: "棺", meaningsFr: ["Cercueil"], readings: ["ひつぎ"], mnemonicFr: "Un CERCUEIL.", levelId: 57 },
    { word: "条款", meaningsFr: ["Clause"], readings: ["じょうかん"], mnemonicFr: "Une CLAUSE de contrat.", levelId: 57 },
    { word: "歓迎", meaningsFr: ["Bienvenue"], readings: ["かんげい"], mnemonicFr: "BIENVENUE !", levelId: 57 },
    { word: "歓声", meaningsFr: ["Acclamations"], readings: ["かんせい"], mnemonicFr: "Des ACCLAMATIONS.", levelId: 57 },
    { word: "汗", meaningsFr: ["Sueur"], readings: ["あせ"], mnemonicFr: "La SUEUR.", levelId: 57 },
    { word: "発汗", meaningsFr: ["Transpiration"], readings: ["はっかん"], mnemonicFr: "La TRANSPIRATION.", levelId: 57 },
    { word: "環境", meaningsFr: ["Environnement"], readings: ["かんきょう"], mnemonicFr: "L'ENVIRONNEMENT.", levelId: 57 },
    { word: "循環", meaningsFr: ["Circulation"], readings: ["じゅんかん"], mnemonicFr: "La CIRCULATION.", levelId: 57 },
    { word: "甘い", meaningsFr: ["Sucré"], readings: ["あまい"], mnemonicFr: "C'est SUCRÉ.", levelId: 57 },
    { word: "甘える", meaningsFr: ["Se faire dorloter"], readings: ["あまえる"], mnemonicFr: "SE FAIRE DORLOTER.", levelId: 57 },
    { word: "監督", meaningsFr: ["Directeur"], readings: ["かんとく"], mnemonicFr: "Le DIRECTEUR.", levelId: 57 },
    { word: "監視", meaningsFr: ["Surveillance"], readings: ["かんし"], mnemonicFr: "La SURVEILLANCE.", levelId: 57 },
    { word: "看護", meaningsFr: ["Soins infirmiers"], readings: ["かんご"], mnemonicFr: "Les SOINS INFIRMIERS.", levelId: 57 },
    { word: "看板", meaningsFr: ["Enseigne"], readings: ["かんばん"], mnemonicFr: "Une ENSEIGNE.", levelId: 57 },
    { word: "緩い", meaningsFr: ["Lâche"], readings: ["ゆるい"], mnemonicFr: "C'est LÂCHE.", levelId: 57 },
    { word: "緩和", meaningsFr: ["Assouplissement"], readings: ["かんわ"], mnemonicFr: "L'ASSOUPLISSEMENT.", levelId: 57 },
    { word: "缶", meaningsFr: ["Boîte"], readings: ["かん"], mnemonicFr: "Une BOÎTE de conserve.", levelId: 57 },
    { word: "缶詰", meaningsFr: ["Conserve"], readings: ["かんづめ"], mnemonicFr: "Une CONSERVE.", levelId: 57 },
    { word: "肝心", meaningsFr: ["Essentiel"], readings: ["かんじん"], mnemonicFr: "C'est ESSENTIEL.", levelId: 57 },
    { word: "肝臓", meaningsFr: ["Foie"], readings: ["かんぞう"], mnemonicFr: "Le FOIE.", levelId: 57 },
    { word: "軍艦", meaningsFr: ["Navire de guerre"], readings: ["ぐんかん"], mnemonicFr: "Un NAVIRE DE GUERRE.", levelId: 57 },
    { word: "貫く", meaningsFr: ["Percer"], readings: ["つらぬく"], mnemonicFr: "PERCER de part en part.", levelId: 57 },
    { word: "一貫", meaningsFr: ["Cohérence"], readings: ["いっかん"], mnemonicFr: "La COHÉRENCE.", levelId: 57 },
    { word: "還元", meaningsFr: ["Réduction"], readings: ["かんげん"], mnemonicFr: "Une RÉDUCTION.", levelId: 57 },
    { word: "生還", meaningsFr: ["Retour sain et sauf"], readings: ["せいかん"], mnemonicFr: "RETOUR SAIN ET SAUF.", levelId: 57 },
    { word: "鑑定", meaningsFr: ["Expertise"], readings: ["かんてい"], mnemonicFr: "Une EXPERTISE.", levelId: 57 },
    { word: "陥る", meaningsFr: ["Tomber dans"], readings: ["おちいる"], mnemonicFr: "TOMBER DANS un piège.", levelId: 57 },
    { word: "韓国", meaningsFr: ["Corée du Sud"], readings: ["かんこく"], mnemonicFr: "La CORÉE DU SUD.", levelId: 57 },
    { word: "頑固", meaningsFr: ["Têtu"], readings: ["がんこ"], mnemonicFr: "Être TÊTU.", levelId: 57 },
    { word: "頑張る", meaningsFr: ["Faire de son mieux"], readings: ["がんばる"], mnemonicFr: "FAIRE DE SON MIEUX.", levelId: 57 },
    { word: "企業", meaningsFr: ["Entreprise"], readings: ["きぎょう"], mnemonicFr: "Une ENTREPRISE.", levelId: 57 },
    { word: "企画", meaningsFr: ["Projet"], readings: ["きかく"], mnemonicFr: "Un PROJET.", levelId: 57 },
    { word: "歌舞伎", meaningsFr: ["Kabuki"], readings: ["かぶき"], mnemonicFr: "Le théâtre KABUKI.", levelId: 57 },
    { word: "危ない", meaningsFr: ["Dangereux"], readings: ["あぶない"], mnemonicFr: "C'est DANGEREUX !", levelId: 57 },
    { word: "危険", meaningsFr: ["Danger"], readings: ["きけん"], mnemonicFr: "Le DANGER.", levelId: 57 },
  ];

  for (const vocab of level57Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 57 complete! Added", level57Kanji.length, "kanji and", level57Vocab.length, "vocabulary");

  // ============================================
  // LEVEL 58 - JLPT N1 Advanced Kanji (Medical/Technical)
  // ============================================

  const level58Kanji = [
    { character: "奇", meaningsFr: ["Étrange"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le grand et le possible. ÉTRANGE.", readingMnemonicFr: "Ki - ÉTRANGE !" },
    { character: "岐", meaningsFr: ["Bifurcation"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "La montagne et la branche. La BIFURCATION.", readingMnemonicFr: "Ki - la BIFURCATION !" },
    { character: "幾", meaningsFr: ["Combien"], readingsOn: ["キ"], readingsKun: ["いく"], meaningMnemonicFr: "Les fils et la personne. COMBIEN.", readingMnemonicFr: "Iku - COMBIEN !" },
    { character: "忌", meaningsFr: ["Éviter", "Deuil"], readingsOn: ["キ"], readingsKun: ["い-む"], meaningMnemonicFr: "Le coeur et le soi. ÉVITER.", readingMnemonicFr: "Ki - ÉVITER !" },
    { character: "既", meaningsFr: ["Déjà"], readingsOn: ["キ"], readingsKun: ["すで-に"], meaningMnemonicFr: "Le manger et le fin. DÉJÀ.", readingMnemonicFr: "Sudeni - DÉJÀ !" },
    { character: "棋", meaningsFr: ["Échecs"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "L'arbre et le base. Les ÉCHECS.", readingMnemonicFr: "Ki - les ÉCHECS !" },
    { character: "棄", meaningsFr: ["Abandonner"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "L'arbre et l'enfant. ABANDONNER.", readingMnemonicFr: "Ki - ABANDONNER !" },
    { character: "畿", meaningsFr: ["Capitale"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le champ et les fils. La CAPITALE.", readingMnemonicFr: "Ki - la CAPITALE !" },
    { character: "輝", meaningsFr: ["Briller"], readingsOn: ["キ"], readingsKun: ["かがや-く"], meaningMnemonicFr: "La lumière et le militaire. BRILLER.", readingMnemonicFr: "Kagayaku - BRILLER !" },
    { character: "飢", meaningsFr: ["Famine"], readingsOn: ["キ"], readingsKun: ["う-える"], meaningMnemonicFr: "La nourriture et le soi. La FAMINE.", readingMnemonicFr: "Ueru - avoir FAIM !" },
    { character: "騎", meaningsFr: ["Cavalier"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le cheval et le étrange. Le CAVALIER.", readingMnemonicFr: "Ki - le CAVALIER !" },
    { character: "鬼", meaningsFr: ["Démon"], readingsOn: ["キ"], readingsKun: ["おに"], meaningMnemonicFr: "Le fantôme avec cornes. Le DÉMON.", readingMnemonicFr: "Oni - le DÉMON !" },
    { character: "偽", meaningsFr: ["Faux"], readingsOn: ["ギ"], readingsKun: ["いつわ-る", "にせ"], meaningMnemonicFr: "La personne et le agir. FAUX.", readingMnemonicFr: "Nise - c'est FAUX !" },
    { character: "儀", meaningsFr: ["Cérémonie"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "La personne et la justice. La CÉRÉMONIE.", readingMnemonicFr: "Gi - la CÉRÉMONIE !" },
    { character: "宜", meaningsFr: ["Convenable"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "Le toit et le utiliser. CONVENABLE.", readingMnemonicFr: "Gi - CONVENABLE !" },
    { character: "戯", meaningsFr: ["Jouer", "Plaisanter"], readingsOn: ["ギ"], readingsKun: ["たわむ-れる"], meaningMnemonicFr: "Le vide et la hallebarde. JOUER.", readingMnemonicFr: "Tawamureru - JOUER !" },
    { character: "擬", meaningsFr: ["Imiter"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "La main et le douter. IMITER.", readingMnemonicFr: "Gi - IMITER !" },
    { character: "犠", meaningsFr: ["Sacrifice"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "La vache et la justice. Le SACRIFICE.", readingMnemonicFr: "Gi - le SACRIFICE !" },
    { character: "菊", meaningsFr: ["Chrysanthème"], readingsOn: ["キク"], readingsKun: [], meaningMnemonicFr: "L'herbe et le riz. Le CHRYSANTHÈME.", readingMnemonicFr: "Kiku - le CHRYSANTHÈME !" },
    { character: "吉", meaningsFr: ["Chance"], readingsOn: ["キチ"], readingsKun: [], meaningMnemonicFr: "Le soldat et la bouche. La CHANCE.", readingMnemonicFr: "Kichi - la CHANCE !" },
    { character: "喫", meaningsFr: ["Consommer"], readingsOn: ["キツ"], readingsKun: [], meaningMnemonicFr: "La bouche et le contrat. CONSOMMER.", readingMnemonicFr: "Kitsu - CONSOMMER !" },
    { character: "詰", meaningsFr: ["Remplir", "Bourrer"], readingsOn: ["キツ"], readingsKun: ["つ-める", "つ-まる"], meaningMnemonicFr: "Les paroles et le sol. REMPLIR.", readingMnemonicFr: "Tsumeru - REMPLIR !" },
    { character: "却", meaningsFr: ["Rejeter"], readingsOn: ["キャク"], readingsKun: [], meaningMnemonicFr: "Le aller et le forcer. REJETER.", readingMnemonicFr: "Kyaku - REJETER !" },
    { character: "脚", meaningsFr: ["Jambe"], readingsOn: ["キャク"], readingsKun: ["あし"], meaningMnemonicFr: "La chair et le aller. La JAMBE.", readingMnemonicFr: "Ashi - la JAMBE !" },
    { character: "虐", meaningsFr: ["Maltraiter"], readingsOn: ["ギャク"], readingsKun: ["しいた-げる"], meaningMnemonicFr: "Le tigre et l'inverse. MALTRAITER.", readingMnemonicFr: "Shitageru - MALTRAITER !" },
    { character: "丘", meaningsFr: ["Colline"], readingsOn: ["キュウ"], readingsKun: ["おか"], meaningMnemonicFr: "La forme de la colline. La COLLINE.", readingMnemonicFr: "Oka - la COLLINE !" },
    { character: "及", meaningsFr: ["Atteindre"], readingsOn: ["キュウ"], readingsKun: ["およ-ぶ"], meaningMnemonicFr: "La main qui attrape. ATTEINDRE.", readingMnemonicFr: "Oyobu - ATTEINDRE !" },
    { character: "朽", meaningsFr: ["Pourrir"], readingsOn: ["キュウ"], readingsKun: ["く-ちる"], meaningMnemonicFr: "L'arbre et le tordre. POURRIR.", readingMnemonicFr: "Kuchiru - POURRIR !" },
    { character: "窮", meaningsFr: ["Acculé"], readingsOn: ["キュウ"], readingsKun: ["きわ-める"], meaningMnemonicFr: "Le trou et la force. ACCULÉ.", readingMnemonicFr: "Kiwameru - être ACCULÉ !" },
    { character: "糾", meaningsFr: ["Tordre"], readingsOn: ["キュウ"], readingsKun: [], meaningMnemonicFr: "Le fil et le tordre. TORDRE.", readingMnemonicFr: "Kyuu - TORDRE !" },
    { character: "嗅", meaningsFr: ["Sentir (odeur)"], readingsOn: ["キュウ"], readingsKun: ["か-ぐ"], meaningMnemonicFr: "La bouche et l'odeur. SENTIR.", readingMnemonicFr: "Kagu - SENTIR !" },
    { character: "矯", meaningsFr: ["Corriger"], readingsOn: ["キョウ"], readingsKun: ["た-める"], meaningMnemonicFr: "La flèche et le haut. CORRIGER.", readingMnemonicFr: "Tameru - CORRIGER !" },
    { character: "郷", meaningsFr: ["Village natal"], readingsOn: ["キョウ"], readingsKun: [], meaningMnemonicFr: "Le campagne et la ville. Le VILLAGE NATAL.", readingMnemonicFr: "Kyou - le VILLAGE !" },
    { character: "鏡", meaningsFr: ["Miroir"], readingsOn: ["キョウ"], readingsKun: ["かがみ"], meaningMnemonicFr: "Le métal et le limite. Le MIROIR.", readingMnemonicFr: "Kagami - le MIROIR !" },
  ];

  for (const kanji of level58Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 58 },
      create: { ...kanji, levelId: 58 },
    });
  }

  const level58Vocab = [
    { word: "奇妙", meaningsFr: ["Étrange"], readings: ["きみょう"], mnemonicFr: "C'est ÉTRANGE.", levelId: 58 },
    { word: "奇跡", meaningsFr: ["Miracle"], readings: ["きせき"], mnemonicFr: "Un MIRACLE.", levelId: 58 },
    { word: "岐阜", meaningsFr: ["Gifu"], readings: ["ぎふ"], mnemonicFr: "La préfecture de GIFU.", levelId: 58 },
    { word: "分岐", meaningsFr: ["Bifurcation"], readings: ["ぶんき"], mnemonicFr: "Une BIFURCATION.", levelId: 58 },
    { word: "幾つ", meaningsFr: ["Combien"], readings: ["いくつ"], mnemonicFr: "COMBIEN ?", levelId: 58 },
    { word: "幾ら", meaningsFr: ["Combien (prix)"], readings: ["いくら"], mnemonicFr: "Ça coûte COMBIEN ?", levelId: 58 },
    { word: "忌む", meaningsFr: ["Éviter"], readings: ["いむ"], mnemonicFr: "ÉVITER quelque chose.", levelId: 58 },
    { word: "禁忌", meaningsFr: ["Tabou"], readings: ["きんき"], mnemonicFr: "Un TABOU.", levelId: 58 },
    { word: "既に", meaningsFr: ["Déjà"], readings: ["すでに"], mnemonicFr: "C'est DÉJÀ fait.", levelId: 58 },
    { word: "既存", meaningsFr: ["Existant"], readings: ["きそん"], mnemonicFr: "EXISTANT.", levelId: 58 },
    { word: "将棋", meaningsFr: ["Shogi"], readings: ["しょうぎ"], mnemonicFr: "Le jeu de SHOGI.", levelId: 58 },
    { word: "棄権", meaningsFr: ["Abstention"], readings: ["きけん"], mnemonicFr: "L'ABSTENTION.", levelId: 58 },
    { word: "廃棄", meaningsFr: ["Élimination"], readings: ["はいき"], mnemonicFr: "L'ÉLIMINATION.", levelId: 58 },
    { word: "近畿", meaningsFr: ["Kinki"], readings: ["きんき"], mnemonicFr: "La région KINKI.", levelId: 58 },
    { word: "輝く", meaningsFr: ["Briller"], readings: ["かがやく"], mnemonicFr: "BRILLER de mille feux.", levelId: 58 },
    { word: "光輝", meaningsFr: ["Éclat"], readings: ["こうき"], mnemonicFr: "L'ÉCLAT de la lumière.", levelId: 58 },
    { word: "飢える", meaningsFr: ["Avoir faim"], readings: ["うえる"], mnemonicFr: "AVOIR FAIM.", levelId: 58 },
    { word: "飢餓", meaningsFr: ["Famine"], readings: ["きが"], mnemonicFr: "La FAMINE.", levelId: 58 },
    { word: "騎士", meaningsFr: ["Chevalier"], readings: ["きし"], mnemonicFr: "Un CHEVALIER.", levelId: 58 },
    { word: "騎馬", meaningsFr: ["À cheval"], readings: ["きば"], mnemonicFr: "À CHEVAL.", levelId: 58 },
    { word: "鬼", meaningsFr: ["Démon"], readings: ["おに"], mnemonicFr: "Un DÉMON.", levelId: 58 },
    { word: "鬼ごっこ", meaningsFr: ["Chat (jeu)"], readings: ["おにごっこ"], mnemonicFr: "Jouer au CHAT.", levelId: 58 },
    { word: "偽物", meaningsFr: ["Faux"], readings: ["にせもの"], mnemonicFr: "Un FAUX.", levelId: 58 },
    { word: "偽る", meaningsFr: ["Mentir"], readings: ["いつわる"], mnemonicFr: "MENTIR.", levelId: 58 },
    { word: "儀式", meaningsFr: ["Cérémonie"], readings: ["ぎしき"], mnemonicFr: "Une CÉRÉMONIE.", levelId: 58 },
    { word: "礼儀", meaningsFr: ["Politesse"], readings: ["れいぎ"], mnemonicFr: "La POLITESSE.", levelId: 58 },
    { word: "便宜", meaningsFr: ["Commodité"], readings: ["べんぎ"], mnemonicFr: "La COMMODITÉ.", levelId: 58 },
    { word: "戯れる", meaningsFr: ["S'amuser"], readings: ["たわむれる"], mnemonicFr: "S'AMUSER.", levelId: 58 },
    { word: "遊戯", meaningsFr: ["Jeu"], readings: ["ゆうぎ"], mnemonicFr: "Un JEU.", levelId: 58 },
    { word: "模擬", meaningsFr: ["Simulation"], readings: ["もぎ"], mnemonicFr: "Une SIMULATION.", levelId: 58 },
    { word: "犠牲", meaningsFr: ["Sacrifice"], readings: ["ぎせい"], mnemonicFr: "Un SACRIFICE.", levelId: 58 },
    { word: "菊", meaningsFr: ["Chrysanthème"], readings: ["きく"], mnemonicFr: "Un CHRYSANTHÈME.", levelId: 58 },
    { word: "吉日", meaningsFr: ["Jour de chance"], readings: ["きちじつ"], mnemonicFr: "Un JOUR DE CHANCE.", levelId: 58 },
    { word: "喫茶店", meaningsFr: ["Café"], readings: ["きっさてん"], mnemonicFr: "Un CAFÉ.", levelId: 58 },
    { word: "喫煙", meaningsFr: ["Fumer"], readings: ["きつえん"], mnemonicFr: "FUMER.", levelId: 58 },
    { word: "詰める", meaningsFr: ["Remplir"], readings: ["つめる"], mnemonicFr: "REMPLIR un sac.", levelId: 58 },
    { word: "行き詰まる", meaningsFr: ["Bloquer"], readings: ["いきづまる"], mnemonicFr: "Être BLOQUÉ.", levelId: 58 },
    { word: "返却", meaningsFr: ["Retour"], readings: ["へんきゃく"], mnemonicFr: "RETOUR d'un objet.", levelId: 58 },
    { word: "脚本", meaningsFr: ["Scénario"], readings: ["きゃくほん"], mnemonicFr: "Un SCÉNARIO.", levelId: 58 },
    { word: "虐待", meaningsFr: ["Maltraitance"], readings: ["ぎゃくたい"], mnemonicFr: "La MALTRAITANCE.", levelId: 58 },
    { word: "丘", meaningsFr: ["Colline"], readings: ["おか"], mnemonicFr: "Une COLLINE.", levelId: 58 },
    { word: "砂丘", meaningsFr: ["Dune"], readings: ["さきゅう"], mnemonicFr: "Une DUNE de sable.", levelId: 58 },
    { word: "及ぶ", meaningsFr: ["Atteindre"], readings: ["およぶ"], mnemonicFr: "ATTEINDRE un niveau.", levelId: 58 },
    { word: "普及", meaningsFr: ["Propagation"], readings: ["ふきゅう"], mnemonicFr: "La PROPAGATION.", levelId: 58 },
    { word: "朽ちる", meaningsFr: ["Pourrir"], readings: ["くちる"], mnemonicFr: "POURRIR avec le temps.", levelId: 58 },
    { word: "老朽", meaningsFr: ["Vétuste"], readings: ["ろうきゅう"], mnemonicFr: "VÉTUSTE.", levelId: 58 },
    { word: "窮屈", meaningsFr: ["Étroit"], readings: ["きゅうくつ"], mnemonicFr: "C'est ÉTROIT.", levelId: 58 },
    { word: "嗅ぐ", meaningsFr: ["Sentir (odeur)"], readings: ["かぐ"], mnemonicFr: "SENTIR une odeur.", levelId: 58 },
    { word: "矯正", meaningsFr: ["Correction"], readings: ["きょうせい"], mnemonicFr: "La CORRECTION.", levelId: 58 },
    { word: "故郷", meaningsFr: ["Pays natal"], readings: ["ふるさと"], mnemonicFr: "Le PAYS NATAL.", levelId: 58 },
    { word: "郷愁", meaningsFr: ["Nostalgie"], readings: ["きょうしゅう"], mnemonicFr: "La NOSTALGIE.", levelId: 58 },
    { word: "鏡", meaningsFr: ["Miroir"], readings: ["かがみ"], mnemonicFr: "Un MIROIR.", levelId: 58 },
    { word: "眼鏡", meaningsFr: ["Lunettes"], readings: ["めがね"], mnemonicFr: "Des LUNETTES.", levelId: 58 },
  ];

  for (const vocab of level58Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 58 complete! Added", level58Kanji.length, "kanji and", level58Vocab.length, "vocabulary");

  // ============================================
  // LEVEL 59 - JLPT N1 Advanced Kanji (Literature/Philosophy)
  // ============================================

  const level59Kanji = [
    { character: "響", meaningsFr: ["Résonner"], readingsOn: ["キョウ"], readingsKun: ["ひび-く"], meaningMnemonicFr: "Le son et la direction. RÉSONNER.", readingMnemonicFr: "Hibiku - RÉSONNER !" },
    { character: "驚", meaningsFr: ["Surprendre"], readingsOn: ["キョウ"], readingsKun: ["おどろ-く"], meaningMnemonicFr: "Le cheval et le respect. SURPRENDRE.", readingMnemonicFr: "Odoroku - SURPRENDRE !" },
    { character: "仰", meaningsFr: ["Regarder en haut"], readingsOn: ["ギョウ"], readingsKun: ["あお-ぐ"], meaningMnemonicFr: "La personne et le haut. REGARDER EN HAUT.", readingMnemonicFr: "Aogu - REGARDER EN HAUT !" },
    { character: "凝", meaningsFr: ["Se figer"], readingsOn: ["ギョウ"], readingsKun: ["こ-る"], meaningMnemonicFr: "La glace et le douter. SE FIGER.", readingMnemonicFr: "Koru - SE FIGER !" },
    { character: "暁", meaningsFr: ["Aube"], readingsOn: ["ギョウ"], readingsKun: ["あかつき"], meaningMnemonicFr: "Le soleil et le haut. L'AUBE.", readingMnemonicFr: "Akatsuki - l'AUBE !" },
    { character: "斤", meaningsFr: ["Jin (mesure)"], readingsOn: ["キン"], readingsKun: [], meaningMnemonicFr: "La hache. Le JIN.", readingMnemonicFr: "Kin - le JIN !" },
    { character: "琴", meaningsFr: ["Koto"], readingsOn: ["キン"], readingsKun: ["こと"], meaningMnemonicFr: "Les deux jades et le bois. Le KOTO.", readingMnemonicFr: "Koto - le KOTO !" },
    { character: "緊", meaningsFr: ["Tendu"], readingsOn: ["キン"], readingsKun: [], meaningMnemonicFr: "Le fil et le difficile. TENDU.", readingMnemonicFr: "Kin - TENDU !" },
    { character: "菌", meaningsFr: ["Bactérie"], readingsOn: ["キン"], readingsKun: [], meaningMnemonicFr: "L'herbe et le égal. La BACTÉRIE.", readingMnemonicFr: "Kin - la BACTÉRIE !" },
    { character: "襟", meaningsFr: ["Col"], readingsOn: ["キン"], readingsKun: ["えり"], meaningMnemonicFr: "Le vêtement et le interdit. Le COL.", readingMnemonicFr: "Eri - le COL !" },
    { character: "謹", meaningsFr: ["Respectueux"], readingsOn: ["キン"], readingsKun: [], meaningMnemonicFr: "Les paroles et le difficile. RESPECTUEUX.", readingMnemonicFr: "Kin - RESPECTUEUX !" },
    { character: "吟", meaningsFr: ["Réciter"], readingsOn: ["ギン"], readingsKun: [], meaningMnemonicFr: "La bouche et le maintenant. RÉCITER.", readingMnemonicFr: "Gin - RÉCITER !" },
    { character: "駆", meaningsFr: ["Galoper"], readingsOn: ["ク"], readingsKun: ["か-ける"], meaningMnemonicFr: "Le cheval et le région. GALOPER.", readingMnemonicFr: "Kakeru - GALOPER !" },
    { character: "愚", meaningsFr: ["Stupide"], readingsOn: ["グ"], readingsKun: ["おろ-か"], meaningMnemonicFr: "Le coeur et le même. STUPIDE.", readingMnemonicFr: "Oroka - STUPIDE !" },
    { character: "虞", meaningsFr: ["Crainte"], readingsOn: ["グ"], readingsKun: [], meaningMnemonicFr: "Le tigre et le bol. La CRAINTE.", readingMnemonicFr: "Gu - la CRAINTE !" },
    { character: "偶", meaningsFr: ["Pair", "Accidentel"], readingsOn: ["グウ"], readingsKun: [], meaningMnemonicFr: "La personne et le coin. PAIR.", readingMnemonicFr: "Guu - PAIR !" },
    { character: "遇", meaningsFr: ["Rencontrer"], readingsOn: ["グウ"], readingsKun: [], meaningMnemonicFr: "Le chemin et le coin. RENCONTRER.", readingMnemonicFr: "Guu - RENCONTRER !" },
    { character: "隅", meaningsFr: ["Coin"], readingsOn: ["グウ"], readingsKun: ["すみ"], meaningMnemonicFr: "La colline et le coin. Le COIN.", readingMnemonicFr: "Sumi - le COIN !" },
    { character: "串", meaningsFr: ["Brochette"], readingsOn: [], readingsKun: ["くし"], meaningMnemonicFr: "Les deux bouches percées. La BROCHETTE.", readingMnemonicFr: "Kushi - la BROCHETTE !" },
    { character: "屈", meaningsFr: ["Plier"], readingsOn: ["クツ"], readingsKun: [], meaningMnemonicFr: "Le corps et le sortir. PLIER.", readingMnemonicFr: "Kutsu - PLIER !" },
    { character: "掘", meaningsFr: ["Creuser"], readingsOn: ["クツ"], readingsKun: ["ほ-る"], meaningMnemonicFr: "La main et le sortir. CREUSER.", readingMnemonicFr: "Horu - CREUSER !" },
    { character: "靴", meaningsFr: ["Chaussure"], readingsOn: ["カ"], readingsKun: ["くつ"], meaningMnemonicFr: "Le cuir et le changement. La CHAUSSURE.", readingMnemonicFr: "Kutsu - la CHAUSSURE !" },
    { character: "繰", meaningsFr: ["Dévider"], readingsOn: ["ソウ"], readingsKun: ["く-る"], meaningMnemonicFr: "Le fil et l'arbre. DÉVIDER.", readingMnemonicFr: "Kuru - DÉVIDER !" },
    { character: "桑", meaningsFr: ["Mûrier"], readingsOn: ["ソウ"], readingsKun: ["くわ"], meaningMnemonicFr: "Les mains et l'arbre. Le MÛRIER.", readingMnemonicFr: "Kuwa - le MÛRIER !" },
    { character: "勲", meaningsFr: ["Mérite"], readingsOn: ["クン"], readingsKun: [], meaningMnemonicFr: "La force et le fumer. Le MÉRITE.", readingMnemonicFr: "Kun - le MÉRITE !" },
    { character: "薫", meaningsFr: ["Parfum"], readingsOn: ["クン"], readingsKun: ["かお-る"], meaningMnemonicFr: "L'herbe et le fumer. Le PARFUM.", readingMnemonicFr: "Kaoru - le PARFUM !" },
    { character: "傾", meaningsFr: ["Pencher"], readingsOn: ["ケイ"], readingsKun: ["かたむ-く"], meaningMnemonicFr: "La personne et la page. PENCHER.", readingMnemonicFr: "Katamuku - PENCHER !" },
    { character: "刑", meaningsFr: ["Peine"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "Le ouvrir et le sabre. La PEINE.", readingMnemonicFr: "Kei - la PEINE !" },
    { character: "啓", meaningsFr: ["Éclairer"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "La porte et la bouche. ÉCLAIRER.", readingMnemonicFr: "Kei - ÉCLAIRER !" },
    { character: "契", meaningsFr: ["Contrat"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "Le grand et le sabre. Le CONTRAT.", readingMnemonicFr: "Kei - le CONTRAT !" },
    { character: "恵", meaningsFr: ["Bienfait"], readingsOn: ["ケイ"], readingsKun: ["めぐ-む"], meaningMnemonicFr: "Le coeur et le dix. Le BIENFAIT.", readingMnemonicFr: "Megumu - le BIENFAIT !" },
    { character: "慶", meaningsFr: ["Féliciter"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "Le cerf et le coeur. FÉLICITER.", readingMnemonicFr: "Kei - FÉLICITER !" },
    { character: "憩", meaningsFr: ["Repos"], readingsOn: ["ケイ"], readingsKun: ["いこ-う"], meaningMnemonicFr: "Le coeur et le soi. Le REPOS.", readingMnemonicFr: "Ikou - le REPOS !" },
    { character: "掲", meaningsFr: ["Afficher"], readingsOn: ["ケイ"], readingsKun: ["かか-げる"], meaningMnemonicFr: "La main et le soleil. AFFICHER.", readingMnemonicFr: "Kakageru - AFFICHER !" },
  ];

  for (const kanji of level59Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 59 },
      create: { ...kanji, levelId: 59 },
    });
  }

  const level59Vocab = [
    { word: "響く", meaningsFr: ["Résonner"], readings: ["ひびく"], mnemonicFr: "Le son RÉSONNE.", levelId: 59 },
    { word: "影響", meaningsFr: ["Influence"], readings: ["えいきょう"], mnemonicFr: "L'INFLUENCE.", levelId: 59 },
    { word: "驚く", meaningsFr: ["Être surpris"], readings: ["おどろく"], mnemonicFr: "ÊTRE SURPRIS.", levelId: 59 },
    { word: "驚き", meaningsFr: ["Surprise"], readings: ["おどろき"], mnemonicFr: "Une SURPRISE.", levelId: 59 },
    { word: "仰ぐ", meaningsFr: ["Lever les yeux"], readings: ["あおぐ"], mnemonicFr: "LEVER LES YEUX.", levelId: 59 },
    { word: "信仰", meaningsFr: ["Foi"], readings: ["しんこう"], mnemonicFr: "La FOI.", levelId: 59 },
    { word: "凝る", meaningsFr: ["S'appliquer"], readings: ["こる"], mnemonicFr: "S'APPLIQUER à une tâche.", levelId: 59 },
    { word: "凝視", meaningsFr: ["Fixer"], readings: ["ぎょうし"], mnemonicFr: "FIXER du regard.", levelId: 59 },
    { word: "暁", meaningsFr: ["Aube"], readings: ["あかつき"], mnemonicFr: "L'AUBE.", levelId: 59 },
    { word: "琴", meaningsFr: ["Koto"], readings: ["こと"], mnemonicFr: "Un instrument KOTO.", levelId: 59 },
    { word: "緊張", meaningsFr: ["Tension"], readings: ["きんちょう"], mnemonicFr: "La TENSION.", levelId: 59 },
    { word: "緊急", meaningsFr: ["Urgent"], readings: ["きんきゅう"], mnemonicFr: "C'est URGENT.", levelId: 59 },
    { word: "細菌", meaningsFr: ["Bactérie"], readings: ["さいきん"], mnemonicFr: "Une BACTÉRIE.", levelId: 59 },
    { word: "殺菌", meaningsFr: ["Stérilisation"], readings: ["さっきん"], mnemonicFr: "La STÉRILISATION.", levelId: 59 },
    { word: "襟", meaningsFr: ["Col"], readings: ["えり"], mnemonicFr: "Le COL de la chemise.", levelId: 59 },
    { word: "謹賀新年", meaningsFr: ["Bonne année"], readings: ["きんがしんねん"], mnemonicFr: "BONNE ANNÉE !", levelId: 59 },
    { word: "吟味", meaningsFr: ["Examen"], readings: ["ぎんみ"], mnemonicFr: "L'EXAMEN attentif.", levelId: 59 },
    { word: "駆ける", meaningsFr: ["Courir"], readings: ["かける"], mnemonicFr: "COURIR vite.", levelId: 59 },
    { word: "駆動", meaningsFr: ["Propulsion"], readings: ["くどう"], mnemonicFr: "La PROPULSION.", levelId: 59 },
    { word: "愚か", meaningsFr: ["Stupide"], readings: ["おろか"], mnemonicFr: "C'est STUPIDE.", levelId: 59 },
    { word: "愚痴", meaningsFr: ["Plainte"], readings: ["ぐち"], mnemonicFr: "Une PLAINTE.", levelId: 59 },
    { word: "偶然", meaningsFr: ["Par hasard"], readings: ["ぐうぜん"], mnemonicFr: "PAR HASARD.", levelId: 59 },
    { word: "配偶者", meaningsFr: ["Conjoint"], readings: ["はいぐうしゃ"], mnemonicFr: "Le CONJOINT.", levelId: 59 },
    { word: "待遇", meaningsFr: ["Traitement"], readings: ["たいぐう"], mnemonicFr: "Le TRAITEMENT.", levelId: 59 },
    { word: "隅", meaningsFr: ["Coin"], readings: ["すみ"], mnemonicFr: "Un COIN de la pièce.", levelId: 59 },
    { word: "串", meaningsFr: ["Brochette"], readings: ["くし"], mnemonicFr: "Une BROCHETTE.", levelId: 59 },
    { word: "焼き鳥", meaningsFr: ["Yakitori"], readings: ["やきとり"], mnemonicFr: "Du YAKITORI.", levelId: 59 },
    { word: "屈辱", meaningsFr: ["Humiliation"], readings: ["くつじょく"], mnemonicFr: "L'HUMILIATION.", levelId: 59 },
    { word: "掘る", meaningsFr: ["Creuser"], readings: ["ほる"], mnemonicFr: "CREUSER un trou.", levelId: 59 },
    { word: "発掘", meaningsFr: ["Excavation"], readings: ["はっくつ"], mnemonicFr: "L'EXCAVATION.", levelId: 59 },
    { word: "靴", meaningsFr: ["Chaussure"], readings: ["くつ"], mnemonicFr: "Des CHAUSSURES.", levelId: 59 },
    { word: "靴下", meaningsFr: ["Chaussettes"], readings: ["くつした"], mnemonicFr: "Des CHAUSSETTES.", levelId: 59 },
    { word: "繰り返す", meaningsFr: ["Répéter"], readings: ["くりかえす"], mnemonicFr: "RÉPÉTER.", levelId: 59 },
    { word: "勲章", meaningsFr: ["Médaille"], readings: ["くんしょう"], mnemonicFr: "Une MÉDAILLE.", levelId: 59 },
    { word: "傾く", meaningsFr: ["Pencher"], readings: ["かたむく"], mnemonicFr: "PENCHER d'un côté.", levelId: 59 },
    { word: "傾向", meaningsFr: ["Tendance"], readings: ["けいこう"], mnemonicFr: "Une TENDANCE.", levelId: 59 },
    { word: "刑事", meaningsFr: ["Détective"], readings: ["けいじ"], mnemonicFr: "Un DÉTECTIVE.", levelId: 59 },
    { word: "刑務所", meaningsFr: ["Prison"], readings: ["けいむしょ"], mnemonicFr: "La PRISON.", levelId: 59 },
    { word: "啓発", meaningsFr: ["Sensibilisation"], readings: ["けいはつ"], mnemonicFr: "La SENSIBILISATION.", levelId: 59 },
    { word: "契約", meaningsFr: ["Contrat"], readings: ["けいやく"], mnemonicFr: "Un CONTRAT.", levelId: 59 },
    { word: "恵み", meaningsFr: ["Bienfait"], readings: ["めぐみ"], mnemonicFr: "Un BIENFAIT.", levelId: 59 },
    { word: "知恵", meaningsFr: ["Sagesse"], readings: ["ちえ"], mnemonicFr: "La SAGESSE.", levelId: 59 },
    { word: "慶祝", meaningsFr: ["Célébration"], readings: ["けいしゅく"], mnemonicFr: "Une CÉLÉBRATION.", levelId: 59 },
    { word: "休憩", meaningsFr: ["Pause"], readings: ["きゅうけい"], mnemonicFr: "Une PAUSE.", levelId: 59 },
    { word: "掲載", meaningsFr: ["Publication"], readings: ["けいさい"], mnemonicFr: "La PUBLICATION.", levelId: 59 },
  ];

  for (const vocab of level59Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 59 complete! Added", level59Kanji.length, "kanji and", level59Vocab.length, "vocabulary");

  // ============================================
  // LEVEL 60 - JLPT N1 Final Advanced Kanji
  // ============================================

  const level60Kanji = [
    { character: "携", meaningsFr: ["Porter"], readingsOn: ["ケイ"], readingsKun: ["たずさ-える"], meaningMnemonicFr: "La main et le oiseau. PORTER.", readingMnemonicFr: "Tazusaeru - PORTER !" },
    { character: "渓", meaningsFr: ["Vallée"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "L'eau et le poulet. La VALLÉE.", readingMnemonicFr: "Kei - la VALLÉE !" },
    { character: "稽", meaningsFr: ["Pratiquer"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "Le grain et le frapper. PRATIQUER.", readingMnemonicFr: "Kei - PRATIQUER !" },
    { character: "繋", meaningsFr: ["Attacher"], readingsOn: ["ケイ"], readingsKun: ["つな-ぐ"], meaningMnemonicFr: "Le fil et le système. ATTACHER.", readingMnemonicFr: "Tsunagu - ATTACHER !" },
    { character: "茎", meaningsFr: ["Tige"], readingsOn: ["ケイ"], readingsKun: ["くき"], meaningMnemonicFr: "L'herbe et le chemin. La TIGE.", readingMnemonicFr: "Kuki - la TIGE !" },
    { character: "蛍", meaningsFr: ["Luciole"], readingsOn: ["ケイ"], readingsKun: ["ほたる"], meaningMnemonicFr: "L'insecte et le feu. La LUCIOLE.", readingMnemonicFr: "Hotaru - la LUCIOLE !" },
    { character: "鶏", meaningsFr: ["Poulet"], readingsOn: ["ケイ"], readingsKun: ["にわとり"], meaningMnemonicFr: "L'oiseau et le poulet. Le POULET.", readingMnemonicFr: "Niwatori - le POULET !" },
    { character: "鯨", meaningsFr: ["Baleine"], readingsOn: ["ゲイ"], readingsKun: ["くじら"], meaningMnemonicFr: "Le poisson et la capitale. La BALEINE.", readingMnemonicFr: "Kujira - la BALEINE !" },
    { character: "迎", meaningsFr: ["Accueillir"], readingsOn: ["ゲイ"], readingsKun: ["むか-える"], meaningMnemonicFr: "Le chemin et le haut. ACCUEILLIR.", readingMnemonicFr: "Mukaeru - ACCUEILLIR !" },
    { character: "撃", meaningsFr: ["Frapper"], readingsOn: ["ゲキ"], readingsKun: ["う-つ"], meaningMnemonicFr: "Le véhicule et la main. FRAPPER.", readingMnemonicFr: "Utsu - FRAPPER !" },
    { character: "隙", meaningsFr: ["Fissure"], readingsOn: ["ゲキ"], readingsKun: ["すき"], meaningMnemonicFr: "La colline et le petit. La FISSURE.", readingMnemonicFr: "Suki - la FISSURE !" },
    { character: "桁", meaningsFr: ["Chiffre"], readingsOn: ["コウ"], readingsKun: ["けた"], meaningMnemonicFr: "L'arbre et le aller. Le CHIFFRE.", readingMnemonicFr: "Keta - le CHIFFRE !" },
    { character: "傑", meaningsFr: ["Excellent"], readingsOn: ["ケツ"], readingsKun: [], meaningMnemonicFr: "La personne et le bois. EXCELLENT.", readingMnemonicFr: "Ketsu - EXCELLENT !" },
    { character: "潔", meaningsFr: ["Pur"], readingsOn: ["ケツ"], readingsKun: ["いさぎよ-い"], meaningMnemonicFr: "L'eau et le fil. PUR.", readingMnemonicFr: "Isagiyoi - PUR !" },
    { character: "穴", meaningsFr: ["Trou"], readingsOn: ["ケツ"], readingsKun: ["あな"], meaningMnemonicFr: "Le toit et le huit. Le TROU.", readingMnemonicFr: "Ana - le TROU !" },
    { character: "兼", meaningsFr: ["Cumuler"], readingsOn: ["ケン"], readingsKun: ["か-ねる"], meaningMnemonicFr: "Le deux et le grain. CUMULER.", readingMnemonicFr: "Kaneru - CUMULER !" },
    { character: "剣", meaningsFr: ["Épée"], readingsOn: ["ケン"], readingsKun: ["つるぎ"], meaningMnemonicFr: "Le sabre et le tout. L'ÉPÉE.", readingMnemonicFr: "Tsurugi - l'ÉPÉE !" },
    { character: "圏", meaningsFr: ["Sphère"], readingsOn: ["ケン"], readingsKun: [], meaningMnemonicFr: "Le entourer et le rouleau. La SPHÈRE.", readingMnemonicFr: "Ken - la SPHÈRE !" },
    { character: "堅", meaningsFr: ["Dur"], readingsOn: ["ケン"], readingsKun: ["かた-い"], meaningMnemonicFr: "La terre et le difficile. DUR.", readingMnemonicFr: "Katai - DUR !" },
    { character: "嫌", meaningsFr: ["Détester"], readingsOn: ["ケン"], readingsKun: ["きら-う", "いや"], meaningMnemonicFr: "La femme et le double. DÉTESTER.", readingMnemonicFr: "Kirau - DÉTESTER !" },
    { character: "献", meaningsFr: ["Offrir"], readingsOn: ["ケン"], readingsKun: [], meaningMnemonicFr: "Le chien et le sud. OFFRIR.", readingMnemonicFr: "Ken - OFFRIR !" },
    { character: "繭", meaningsFr: ["Cocon"], readingsOn: ["ケン"], readingsKun: ["まゆ"], meaningMnemonicFr: "Le fil et l'herbe. Le COCON.", readingMnemonicFr: "Mayu - le COCON !" },
    { character: "遣", meaningsFr: ["Envoyer"], readingsOn: ["ケン"], readingsKun: ["つか-う"], meaningMnemonicFr: "Le chemin et le difficile. ENVOYER.", readingMnemonicFr: "Tsukau - ENVOYER !" },
    { character: "顕", meaningsFr: ["Manifeste"], readingsOn: ["ケン"], readingsKun: [], meaningMnemonicFr: "Le soleil et la page. MANIFESTE.", readingMnemonicFr: "Ken - MANIFESTE !" },
    { character: "懸", meaningsFr: ["Suspendre"], readingsOn: ["ケン"], readingsKun: ["か-ける"], meaningMnemonicFr: "Le coeur et le comté. SUSPENDRE.", readingMnemonicFr: "Kakeru - SUSPENDRE !" },
    { character: "幻", meaningsFr: ["Illusion"], readingsOn: ["ゲン"], readingsKun: ["まぼろし"], meaningMnemonicFr: "Le petit et la force. L'ILLUSION.", readingMnemonicFr: "Maboroshi - l'ILLUSION !" },
    { character: "玄", meaningsFr: ["Mystérieux"], readingsOn: ["ゲン"], readingsKun: [], meaningMnemonicFr: "Le toit et le point. MYSTÉRIEUX.", readingMnemonicFr: "Gen - MYSTÉRIEUX !" },
    { character: "弦", meaningsFr: ["Corde"], readingsOn: ["ゲン"], readingsKun: ["つる"], meaningMnemonicFr: "L'arc et le mystérieux. La CORDE.", readingMnemonicFr: "Tsuru - la CORDE !" },
    { character: "舷", meaningsFr: ["Bord du navire"], readingsOn: ["ゲン"], readingsKun: [], meaningMnemonicFr: "Le bateau et le mystérieux. Le BORD DU NAVIRE.", readingMnemonicFr: "Gen - le BORD !" },
    { character: "諺", meaningsFr: ["Proverbe"], readingsOn: ["ゲン"], readingsKun: ["ことわざ"], meaningMnemonicFr: "Les paroles et la règle. Le PROVERBE.", readingMnemonicFr: "Kotowaza - le PROVERBE !" },
    { character: "孤", meaningsFr: ["Seul"], readingsOn: ["コ"], readingsKun: [], meaningMnemonicFr: "L'enfant et le melon. SEUL.", readingMnemonicFr: "Ko - SEUL !" },
    { character: "弧", meaningsFr: ["Arc"], readingsOn: ["コ"], readingsKun: [], meaningMnemonicFr: "L'arc et le melon. L'ARC.", readingMnemonicFr: "Ko - l'ARC !" },
    { character: "枯", meaningsFr: ["Flétrir"], readingsOn: ["コ"], readingsKun: ["か-れる"], meaningMnemonicFr: "L'arbre et le ancien. FLÉTRIR.", readingMnemonicFr: "Kareru - FLÉTRIR !" },
    { character: "誇", meaningsFr: ["Fier"], readingsOn: ["コ"], readingsKun: ["ほこ-る"], meaningMnemonicFr: "Les paroles et le grand. FIER.", readingMnemonicFr: "Hokoru - être FIER !" },
  ];

  for (const kanji of level60Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 60 },
      create: { ...kanji, levelId: 60 },
    });
  }

  const level60Vocab = [
    { word: "携帯", meaningsFr: ["Portable"], readings: ["けいたい"], mnemonicFr: "Un téléphone PORTABLE.", levelId: 60 },
    { word: "携わる", meaningsFr: ["S'engager"], readings: ["たずさわる"], mnemonicFr: "S'ENGAGER dans un projet.", levelId: 60 },
    { word: "渓谷", meaningsFr: ["Vallée"], readings: ["けいこく"], mnemonicFr: "Une VALLÉE.", levelId: 60 },
    { word: "稽古", meaningsFr: ["Entraînement"], readings: ["けいこ"], mnemonicFr: "L'ENTRAÎNEMENT.", levelId: 60 },
    { word: "繋ぐ", meaningsFr: ["Attacher"], readings: ["つなぐ"], mnemonicFr: "ATTACHER ensemble.", levelId: 60 },
    { word: "繋がる", meaningsFr: ["Être connecté"], readings: ["つながる"], mnemonicFr: "ÊTRE CONNECTÉ.", levelId: 60 },
    { word: "茎", meaningsFr: ["Tige"], readings: ["くき"], mnemonicFr: "La TIGE de la fleur.", levelId: 60 },
    { word: "蛍", meaningsFr: ["Luciole"], readings: ["ほたる"], mnemonicFr: "Une LUCIOLE.", levelId: 60 },
    { word: "鶏", meaningsFr: ["Poulet"], readings: ["にわとり"], mnemonicFr: "Un POULET.", levelId: 60 },
    { word: "鶏肉", meaningsFr: ["Poulet (viande)"], readings: ["とりにく"], mnemonicFr: "Du POULET.", levelId: 60 },
    { word: "鯨", meaningsFr: ["Baleine"], readings: ["くじら"], mnemonicFr: "Une BALEINE.", levelId: 60 },
    { word: "迎える", meaningsFr: ["Accueillir"], readings: ["むかえる"], mnemonicFr: "ACCUEILLIR quelqu'un.", levelId: 60 },
    { word: "歓迎", meaningsFr: ["Bienvenue"], readings: ["かんげい"], mnemonicFr: "BIENVENUE !", levelId: 60 },
    { word: "攻撃", meaningsFr: ["Attaque"], readings: ["こうげき"], mnemonicFr: "Une ATTAQUE.", levelId: 60 },
    { word: "衝撃", meaningsFr: ["Choc"], readings: ["しょうげき"], mnemonicFr: "Un CHOC.", levelId: 60 },
    { word: "隙間", meaningsFr: ["Fissure"], readings: ["すきま"], mnemonicFr: "Une FISSURE.", levelId: 60 },
    { word: "桁", meaningsFr: ["Chiffre"], readings: ["けた"], mnemonicFr: "Le nombre de CHIFFRES.", levelId: 60 },
    { word: "傑作", meaningsFr: ["Chef-d'oeuvre"], readings: ["けっさく"], mnemonicFr: "Un CHEF-D'OEUVRE.", levelId: 60 },
    { word: "清潔", meaningsFr: ["Propreté"], readings: ["せいけつ"], mnemonicFr: "La PROPRETÉ.", levelId: 60 },
    { word: "穴", meaningsFr: ["Trou"], readings: ["あな"], mnemonicFr: "Un TROU.", levelId: 60 },
    { word: "兼ねる", meaningsFr: ["Cumuler"], readings: ["かねる"], mnemonicFr: "CUMULER deux fonctions.", levelId: 60 },
    { word: "剣", meaningsFr: ["Épée"], readings: ["つるぎ"], mnemonicFr: "Une ÉPÉE.", levelId: 60 },
    { word: "剣道", meaningsFr: ["Kendo"], readings: ["けんどう"], mnemonicFr: "Le KENDO.", levelId: 60 },
    { word: "首都圏", meaningsFr: ["Région capitale"], readings: ["しゅとけん"], mnemonicFr: "La RÉGION CAPITALE.", levelId: 60 },
    { word: "堅い", meaningsFr: ["Dur"], readings: ["かたい"], mnemonicFr: "C'est DUR.", levelId: 60 },
    { word: "嫌い", meaningsFr: ["Détester"], readings: ["きらい"], mnemonicFr: "Je DÉTESTE ça.", levelId: 60 },
    { word: "嫌う", meaningsFr: ["Haïr"], readings: ["きらう"], mnemonicFr: "HAÏR quelqu'un.", levelId: 60 },
    { word: "貢献", meaningsFr: ["Contribution"], readings: ["こうけん"], mnemonicFr: "Une CONTRIBUTION.", levelId: 60 },
    { word: "繭", meaningsFr: ["Cocon"], readings: ["まゆ"], mnemonicFr: "Un COCON de soie.", levelId: 60 },
    { word: "派遣", meaningsFr: ["Envoi"], readings: ["はけん"], mnemonicFr: "L'ENVOI de personnel.", levelId: 60 },
    { word: "顕著", meaningsFr: ["Remarquable"], readings: ["けんちょ"], mnemonicFr: "C'est REMARQUABLE.", levelId: 60 },
    { word: "懸念", meaningsFr: ["Inquiétude"], readings: ["けねん"], mnemonicFr: "L'INQUIÉTUDE.", levelId: 60 },
    { word: "幻", meaningsFr: ["Illusion"], readings: ["まぼろし"], mnemonicFr: "Une ILLUSION.", levelId: 60 },
    { word: "幻想", meaningsFr: ["Fantaisie"], readings: ["げんそう"], mnemonicFr: "Une FANTAISIE.", levelId: 60 },
    { word: "玄関", meaningsFr: ["Entrée"], readings: ["げんかん"], mnemonicFr: "L'ENTRÉE de la maison.", levelId: 60 },
    { word: "弦", meaningsFr: ["Corde"], readings: ["つる"], mnemonicFr: "Une CORDE de guitare.", levelId: 60 },
    { word: "諺", meaningsFr: ["Proverbe"], readings: ["ことわざ"], mnemonicFr: "Un PROVERBE.", levelId: 60 },
    { word: "孤独", meaningsFr: ["Solitude"], readings: ["こどく"], mnemonicFr: "La SOLITUDE.", levelId: 60 },
    { word: "孤立", meaningsFr: ["Isolement"], readings: ["こりつ"], mnemonicFr: "L'ISOLEMENT.", levelId: 60 },
    { word: "枯れる", meaningsFr: ["Se faner"], readings: ["かれる"], mnemonicFr: "La fleur SE FANE.", levelId: 60 },
    { word: "誇り", meaningsFr: ["Fierté"], readings: ["ほこり"], mnemonicFr: "La FIERTÉ.", levelId: 60 },
    { word: "誇る", meaningsFr: ["Se vanter"], readings: ["ほこる"], mnemonicFr: "SE VANTER.", levelId: 60 },
    { word: "お疲れ様", meaningsFr: ["Bon travail"], readings: ["おつかれさま"], mnemonicFr: "BON TRAVAIL !", levelId: 60 },
    { word: "頑張って", meaningsFr: ["Bon courage"], readings: ["がんばって"], mnemonicFr: "BON COURAGE !", levelId: 60 },
    { word: "おめでとう", meaningsFr: ["Félicitations"], readings: ["おめでとう"], mnemonicFr: "FÉLICITATIONS !", levelId: 60 },
  ];

  for (const vocab of level60Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 60 complete! Added", level60Kanji.length, "kanji and", level60Vocab.length, "vocabulary");

  // Final Summary
  const totalKanji = level57Kanji.length + level58Kanji.length + level59Kanji.length + level60Kanji.length;
  const totalVocab = level57Vocab.length + level58Vocab.length + level59Vocab.length + level60Vocab.length;

  console.log("\n========================================");
  console.log("LEVELS 57-60 SEEDING COMPLETE!");
  console.log("========================================");
  console.log("Total Kanji Added:", totalKanji);
  console.log("Total Vocabulary Added:", totalVocab);
  console.log("========================================");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
