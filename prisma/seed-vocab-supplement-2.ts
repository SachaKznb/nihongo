import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary supplement for levels 31-45
const vocabData = [
  // Level 31 - Food vocabulary
  { word: "野菜", meaningsFr: ["Légumes"], readings: ["やさい"], mnemonicFr: "Le champ + les légumes = les LÉGUMES du potager.", levelId: 31 },
  { word: "果物", meaningsFr: ["Fruits"], readings: ["くだもの"], mnemonicFr: "Les FRUITS qui pendent des arbres.", levelId: 31 },
  { word: "牛肉", meaningsFr: ["Viande de bœuf"], readings: ["ぎゅうにく"], mnemonicFr: "Vache + chair = BŒUF.", levelId: 31 },
  { word: "豚肉", meaningsFr: ["Viande de porc"], readings: ["ぶたにく"], mnemonicFr: "Cochon + chair = PORC.", levelId: 31 },
  { word: "鶏肉", meaningsFr: ["Viande de poulet"], readings: ["とりにく"], mnemonicFr: "Oiseau + chair = POULET.", levelId: 31 },
  { word: "魚介", meaningsFr: ["Fruits de mer"], readings: ["ぎょかい"], mnemonicFr: "Poisson + coquillage = FRUITS DE MER.", levelId: 31 },
  { word: "調味料", meaningsFr: ["Assaisonnement"], readings: ["ちょうみりょう"], mnemonicFr: "Régler + goût + matière = ASSAISONNEMENT.", levelId: 31 },
  { word: "食材", meaningsFr: ["Ingrédients"], readings: ["しょくざい"], mnemonicFr: "Manger + matériau = INGRÉDIENTS.", levelId: 31 },

  // Level 32 - Cooking
  { word: "料理", meaningsFr: ["Cuisine", "Plat"], readings: ["りょうり"], mnemonicFr: "Mesurer + raison = CUISINE soignée.", levelId: 32 },
  { word: "調理", meaningsFr: ["Préparation culinaire"], readings: ["ちょうり"], mnemonicFr: "Régler + raison = PRÉPARATION.", levelId: 32 },
  { word: "焼く", meaningsFr: ["Griller", "Cuire"], readings: ["やく"], mnemonicFr: "Le feu qui GRILLE.", levelId: 32 },
  { word: "煮る", meaningsFr: ["Mijoter"], readings: ["にる"], mnemonicFr: "L'eau qui bout pour MIJOTER.", levelId: 32 },
  { word: "揚げる", meaningsFr: ["Frire"], readings: ["あげる"], mnemonicFr: "Soulever dans l'huile = FRIRE.", levelId: 32 },
  { word: "蒸す", meaningsFr: ["Cuire à la vapeur"], readings: ["むす"], mnemonicFr: "La vapeur qui monte = CUIRE À LA VAPEUR.", levelId: 32 },
  { word: "炒める", meaningsFr: ["Faire sauter"], readings: ["いためる"], mnemonicFr: "FAIRE SAUTER dans la poêle.", levelId: 32 },
  { word: "味付け", meaningsFr: ["Assaisonnement"], readings: ["あじつけ"], mnemonicFr: "Goût + attacher = ASSAISONNER.", levelId: 32 },

  // Level 33 - House & Rooms
  { word: "居間", meaningsFr: ["Salon"], readings: ["いま"], mnemonicFr: "La pièce où l'on RESTE = SALON.", levelId: 33 },
  { word: "寝室", meaningsFr: ["Chambre"], readings: ["しんしつ"], mnemonicFr: "Pièce pour dormir = CHAMBRE.", levelId: 33 },
  { word: "台所", meaningsFr: ["Cuisine"], readings: ["だいどころ"], mnemonicFr: "L'endroit avec le plan de travail = CUISINE.", levelId: 33 },
  { word: "風呂", meaningsFr: ["Bain"], readings: ["ふろ"], mnemonicFr: "Le vent dans le BAIN.", levelId: 33 },
  { word: "廊下", meaningsFr: ["Couloir"], readings: ["ろうか"], mnemonicFr: "Le passage sous le toit = COULOIR.", levelId: 33 },
  { word: "玄関", meaningsFr: ["Entrée"], readings: ["げんかん"], mnemonicFr: "Le passage profond = ENTRÉE.", levelId: 33 },
  { word: "庭", meaningsFr: ["Jardin"], readings: ["にわ"], mnemonicFr: "La cour devant la maison = JARDIN.", levelId: 33 },
  { word: "屋根", meaningsFr: ["Toit"], readings: ["やね"], mnemonicFr: "La racine de la maison = TOIT.", levelId: 33 },

  // Level 34 - Furniture
  { word: "家具", meaningsFr: ["Meubles"], readings: ["かぐ"], mnemonicFr: "Outils de maison = MEUBLES.", levelId: 34 },
  { word: "机", meaningsFr: ["Bureau"], readings: ["つくえ"], mnemonicFr: "Le meuble en bois pour travailler = BUREAU.", levelId: 34 },
  { word: "椅子", meaningsFr: ["Chaise"], readings: ["いす"], mnemonicFr: "Le siège étrange = CHAISE.", levelId: 34 },
  { word: "棚", meaningsFr: ["Étagère"], readings: ["たな"], mnemonicFr: "Le bois horizontal = ÉTAGÈRE.", levelId: 34 },
  { word: "引き出し", meaningsFr: ["Tiroir"], readings: ["ひきだし"], mnemonicFr: "Tirer + sortir = TIROIR.", levelId: 34 },
  { word: "布団", meaningsFr: ["Futon"], readings: ["ふとん"], mnemonicFr: "Le tissu rond = FUTON.", levelId: 34 },
  { word: "枕", meaningsFr: ["Oreiller"], readings: ["まくら"], mnemonicFr: "Le bois pour la tête = OREILLER.", levelId: 34 },
  { word: "鏡", meaningsFr: ["Miroir"], readings: ["かがみ"], mnemonicFr: "Le métal qui reflète = MIROIR.", levelId: 34 },

  // Level 35 - Appliances
  { word: "冷蔵庫", meaningsFr: ["Réfrigérateur"], readings: ["れいぞうこ"], mnemonicFr: "Entrepôt froid = RÉFRIGÉRATEUR.", levelId: 35 },
  { word: "洗濯機", meaningsFr: ["Machine à laver"], readings: ["せんたくき"], mnemonicFr: "Machine pour laver = LAVE-LINGE.", levelId: 35 },
  { word: "掃除機", meaningsFr: ["Aspirateur"], readings: ["そうじき"], mnemonicFr: "Machine pour nettoyer = ASPIRATEUR.", levelId: 35 },
  { word: "電子レンジ", meaningsFr: ["Micro-ondes"], readings: ["でんしレンジ"], mnemonicFr: "Range électronique = MICRO-ONDES.", levelId: 35 },
  { word: "炊飯器", meaningsFr: ["Cuiseur à riz"], readings: ["すいはんき"], mnemonicFr: "Machine à cuire le riz = CUISEUR À RIZ.", levelId: 35 },
  { word: "エアコン", meaningsFr: ["Climatisation"], readings: ["エアコン"], mnemonicFr: "Air conditionné = CLIMATISATION.", levelId: 35 },
  { word: "扇風機", meaningsFr: ["Ventilateur"], readings: ["せんぷうき"], mnemonicFr: "Machine à éventail = VENTILATEUR.", levelId: 35 },
  { word: "暖房", meaningsFr: ["Chauffage"], readings: ["だんぼう"], mnemonicFr: "Pièce chaude = CHAUFFAGE.", levelId: 35 },

  // Level 36 - Clothing
  { word: "洋服", meaningsFr: ["Vêtements occidentaux"], readings: ["ようふく"], mnemonicFr: "Vêtements de style occidental.", levelId: 36 },
  { word: "和服", meaningsFr: ["Vêtements japonais"], readings: ["わふく"], mnemonicFr: "Vêtements de style japonais.", levelId: 36 },
  { word: "上着", meaningsFr: ["Veste"], readings: ["うわぎ"], mnemonicFr: "Vêtement du haut = VESTE.", levelId: 36 },
  { word: "下着", meaningsFr: ["Sous-vêtements"], readings: ["したぎ"], mnemonicFr: "Vêtement du bas = SOUS-VÊTEMENTS.", levelId: 36 },
  { word: "靴下", meaningsFr: ["Chaussettes"], readings: ["くつした"], mnemonicFr: "Sous les chaussures = CHAUSSETTES.", levelId: 36 },
  { word: "手袋", meaningsFr: ["Gants"], readings: ["てぶくろ"], mnemonicFr: "Sac pour les mains = GANTS.", levelId: 36 },
  { word: "帽子", meaningsFr: ["Chapeau"], readings: ["ぼうし"], mnemonicFr: "Protection pour la tête = CHAPEAU.", levelId: 36 },
  { word: "眼鏡", meaningsFr: ["Lunettes"], readings: ["めがね"], mnemonicFr: "Miroir pour les yeux = LUNETTES.", levelId: 36 },

  // Level 37 - Shopping
  { word: "買い物", meaningsFr: ["Shopping"], readings: ["かいもの"], mnemonicFr: "Acheter des choses = SHOPPING.", levelId: 37 },
  { word: "売り場", meaningsFr: ["Rayon"], readings: ["うりば"], mnemonicFr: "Endroit pour vendre = RAYON.", levelId: 37 },
  { word: "値段", meaningsFr: ["Prix"], readings: ["ねだん"], mnemonicFr: "Niveau de valeur = PRIX.", levelId: 37 },
  { word: "割引", meaningsFr: ["Réduction"], readings: ["わりびき"], mnemonicFr: "Diviser et retirer = RÉDUCTION.", levelId: 37 },
  { word: "税込み", meaningsFr: ["TTC"], readings: ["ぜいこみ"], mnemonicFr: "Taxe incluse = TTC.", levelId: 37 },
  { word: "現金", meaningsFr: ["Espèces"], readings: ["げんきん"], mnemonicFr: "Or présent = ESPÈCES.", levelId: 37 },
  { word: "支払い", meaningsFr: ["Paiement"], readings: ["しはらい"], mnemonicFr: "Distribuer et payer = PAIEMENT.", levelId: 37 },
  { word: "領収書", meaningsFr: ["Reçu"], readings: ["りょうしゅうしょ"], mnemonicFr: "Document de réception = REÇU.", levelId: 37 },

  // Level 38 - Work
  { word: "仕事", meaningsFr: ["Travail"], readings: ["しごと"], mnemonicFr: "Servir une chose = TRAVAIL.", levelId: 38 },
  { word: "会社員", meaningsFr: ["Employé de bureau"], readings: ["かいしゃいん"], mnemonicFr: "Membre de société = EMPLOYÉ.", levelId: 38 },
  { word: "同僚", meaningsFr: ["Collègue"], readings: ["どうりょう"], mnemonicFr: "Même officier = COLLÈGUE.", levelId: 38 },
  { word: "上司", meaningsFr: ["Supérieur"], readings: ["じょうし"], mnemonicFr: "Chef au-dessus = SUPÉRIEUR.", levelId: 38 },
  { word: "部下", meaningsFr: ["Subordonné"], readings: ["ぶか"], mnemonicFr: "Sous la section = SUBORDONNÉ.", levelId: 38 },
  { word: "出勤", meaningsFr: ["Aller au travail"], readings: ["しゅっきん"], mnemonicFr: "Sortir pour travailler = ALLER AU TRAVAIL.", levelId: 38 },
  { word: "退勤", meaningsFr: ["Quitter le travail"], readings: ["たいきん"], mnemonicFr: "Se retirer du travail = QUITTER.", levelId: 38 },
  { word: "残業", meaningsFr: ["Heures sup"], readings: ["ざんぎょう"], mnemonicFr: "Travail restant = HEURES SUP.", levelId: 38 },

  // Level 39 - Office
  { word: "会議", meaningsFr: ["Réunion"], readings: ["かいぎ"], mnemonicFr: "Rassemblement pour discuter = RÉUNION.", levelId: 39 },
  { word: "資料", meaningsFr: ["Documents"], readings: ["しりょう"], mnemonicFr: "Matériaux pour référence = DOCUMENTS.", levelId: 39 },
  { word: "報告", meaningsFr: ["Rapport"], readings: ["ほうこく"], mnemonicFr: "Informer et annoncer = RAPPORT.", levelId: 39 },
  { word: "計画", meaningsFr: ["Plan", "Projet"], readings: ["けいかく"], mnemonicFr: "Calculer et tracer = PLAN.", levelId: 39 },
  { word: "予算", meaningsFr: ["Budget"], readings: ["よさん"], mnemonicFr: "Calculer à l'avance = BUDGET.", levelId: 39 },
  { word: "契約", meaningsFr: ["Contrat"], readings: ["けいやく"], mnemonicFr: "Grande promesse = CONTRAT.", levelId: 39 },
  { word: "締め切り", meaningsFr: ["Date limite"], readings: ["しめきり"], mnemonicFr: "Fermer et couper = DATE LIMITE.", levelId: 39 },
  { word: "納期", meaningsFr: ["Délai de livraison"], readings: ["のうき"], mnemonicFr: "Période de livraison = DÉLAI.", levelId: 39 },

  // Level 40 - Business
  { word: "取引", meaningsFr: ["Transaction"], readings: ["とりひき"], mnemonicFr: "Prendre et tirer = TRANSACTION.", levelId: 40 },
  { word: "営業", meaningsFr: ["Commercial"], readings: ["えいぎょう"], mnemonicFr: "Gérer une affaire = COMMERCIAL.", levelId: 40 },
  { word: "開発", meaningsFr: ["Développement"], readings: ["かいはつ"], mnemonicFr: "Ouvrir et émettre = DÉVELOPPEMENT.", levelId: 40 },
  { word: "製品", meaningsFr: ["Produit fabriqué"], readings: ["せいひん"], mnemonicFr: "Article fabriqué = PRODUIT.", levelId: 40 },
  { word: "品質", meaningsFr: ["Qualité"], readings: ["ひんしつ"], mnemonicFr: "Nature du produit = QUALITÉ.", levelId: 40 },
  { word: "在庫", meaningsFr: ["Stock"], readings: ["ざいこ"], mnemonicFr: "Ce qui existe en entrepôt = STOCK.", levelId: 40 },
  { word: "発注", meaningsFr: ["Commande"], readings: ["はっちゅう"], mnemonicFr: "Émettre une commande = COMMANDER.", levelId: 40 },
  { word: "納品", meaningsFr: ["Livraison"], readings: ["のうひん"], mnemonicFr: "Livrer les articles = LIVRAISON.", levelId: 40 },

  // Level 41 - Health
  { word: "健康", meaningsFr: ["Santé"], readings: ["けんこう"], mnemonicFr: "Corps solide et paisible = SANTÉ.", levelId: 41 },
  { word: "病院", meaningsFr: ["Hôpital"], readings: ["びょういん"], mnemonicFr: "Établissement pour malades = HÔPITAL.", levelId: 41 },
  { word: "診察", meaningsFr: ["Consultation"], readings: ["しんさつ"], mnemonicFr: "Examiner et inspecter = CONSULTATION.", levelId: 41 },
  { word: "処方箋", meaningsFr: ["Ordonnance"], readings: ["しょほうせん"], mnemonicFr: "Document de prescription = ORDONNANCE.", levelId: 41 },
  { word: "症状", meaningsFr: ["Symptômes"], readings: ["しょうじょう"], mnemonicFr: "État de la maladie = SYMPTÔMES.", levelId: 41 },
  { word: "治療", meaningsFr: ["Traitement"], readings: ["ちりょう"], mnemonicFr: "Guérir et soigner = TRAITEMENT.", levelId: 41 },
  { word: "手術", meaningsFr: ["Opération"], readings: ["しゅじゅつ"], mnemonicFr: "Technique de la main = OPÉRATION.", levelId: 41 },
  { word: "入院", meaningsFr: ["Hospitalisation"], readings: ["にゅういん"], mnemonicFr: "Entrer à l'hôpital = HOSPITALISATION.", levelId: 41 },

  // Level 42 - Body
  { word: "体調", meaningsFr: ["Condition physique"], readings: ["たいちょう"], mnemonicFr: "Réglage du corps = CONDITION.", levelId: 42 },
  { word: "筋肉", meaningsFr: ["Muscles"], readings: ["きんにく"], mnemonicFr: "Chair avec des fibres = MUSCLES.", levelId: 42 },
  { word: "骨", meaningsFr: ["Os"], readings: ["ほね"], mnemonicFr: "La structure dure = OS.", levelId: 42 },
  { word: "血液", meaningsFr: ["Sang"], readings: ["けつえき"], mnemonicFr: "Liquide vital = SANG.", levelId: 42 },
  { word: "心臓", meaningsFr: ["Cœur"], readings: ["しんぞう"], mnemonicFr: "Organe du cœur = CŒUR.", levelId: 42 },
  { word: "肺", meaningsFr: ["Poumons"], readings: ["はい"], mnemonicFr: "Organe de la respiration = POUMONS.", levelId: 42 },
  { word: "胃", meaningsFr: ["Estomac"], readings: ["い"], mnemonicFr: "Organe de digestion = ESTOMAC.", levelId: 42 },
  { word: "腸", meaningsFr: ["Intestins"], readings: ["ちょう"], mnemonicFr: "Le long tube = INTESTINS.", levelId: 42 },

  // Level 43 - Sports
  { word: "運動", meaningsFr: ["Exercice"], readings: ["うんどう"], mnemonicFr: "Bouger avec chance = EXERCICE.", levelId: 43 },
  { word: "練習", meaningsFr: ["Entraînement"], readings: ["れんしゅう"], mnemonicFr: "Raffiner et apprendre = ENTRAÎNEMENT.", levelId: 43 },
  { word: "試合", meaningsFr: ["Match"], readings: ["しあい"], mnemonicFr: "Tester ensemble = MATCH.", levelId: 43 },
  { word: "勝負", meaningsFr: ["Compétition"], readings: ["しょうぶ"], mnemonicFr: "Victoire ou défaite = COMPÉTITION.", levelId: 43 },
  { word: "優勝", meaningsFr: ["Championnat"], readings: ["ゆうしょう"], mnemonicFr: "Victoire excellente = CHAMPIONNAT.", levelId: 43 },
  { word: "選手", meaningsFr: ["Athlète"], readings: ["せんしゅ"], mnemonicFr: "Main choisie = ATHLÈTE.", levelId: 43 },
  { word: "観客", meaningsFr: ["Spectateurs"], readings: ["かんきゃく"], mnemonicFr: "Invités qui regardent = SPECTATEURS.", levelId: 43 },
  { word: "応援", meaningsFr: ["Encouragement"], readings: ["おうえん"], mnemonicFr: "Répondre et aider = ENCOURAGEMENT.", levelId: 43 },

  // Level 44 - Music
  { word: "音楽", meaningsFr: ["Musique"], readings: ["おんがく"], mnemonicFr: "Plaisir du son = MUSIQUE.", levelId: 44 },
  { word: "楽器", meaningsFr: ["Instrument"], readings: ["がっき"], mnemonicFr: "Outil pour la musique = INSTRUMENT.", levelId: 44 },
  { word: "演奏", meaningsFr: ["Performance"], readings: ["えんそう"], mnemonicFr: "Jouer et offrir = PERFORMANCE.", levelId: 44 },
  { word: "歌手", meaningsFr: ["Chanteur"], readings: ["かしゅ"], mnemonicFr: "Main qui chante = CHANTEUR.", levelId: 44 },
  { word: "作曲", meaningsFr: ["Composition"], readings: ["さっきょく"], mnemonicFr: "Faire une mélodie = COMPOSITION.", levelId: 44 },
  { word: "歌詞", meaningsFr: ["Paroles"], readings: ["かし"], mnemonicFr: "Mots de la chanson = PAROLES.", levelId: 44 },
  { word: "旋律", meaningsFr: ["Mélodie"], readings: ["せんりつ"], mnemonicFr: "Règle qui tourne = MÉLODIE.", levelId: 44 },
  { word: "拍子", meaningsFr: ["Rythme"], readings: ["ひょうし"], mnemonicFr: "Enfant qui tape = RYTHME.", levelId: 44 },

  // Level 45 - Art
  { word: "芸術", meaningsFr: ["Art"], readings: ["げいじゅつ"], mnemonicFr: "Technique du talent = ART.", levelId: 45 },
  { word: "絵画", meaningsFr: ["Peinture"], readings: ["かいが"], mnemonicFr: "Tableau dessiné = PEINTURE.", levelId: 45 },
  { word: "彫刻", meaningsFr: ["Sculpture"], readings: ["ちょうこく"], mnemonicFr: "Graver et sculpter = SCULPTURE.", levelId: 45 },
  { word: "展覧会", meaningsFr: ["Exposition"], readings: ["てんらんかい"], mnemonicFr: "Rassemblement pour montrer = EXPOSITION.", levelId: 45 },
  { word: "作品", meaningsFr: ["Œuvre"], readings: ["さくひん"], mnemonicFr: "Article créé = ŒUVRE.", levelId: 45 },
  { word: "画家", meaningsFr: ["Peintre"], readings: ["がか"], mnemonicFr: "Maison du tableau = PEINTRE.", levelId: 45 },
  { word: "美術館", meaningsFr: ["Musée d'art"], readings: ["びじゅつかん"], mnemonicFr: "Bâtiment de l'art beau = MUSÉE.", levelId: 45 },
  { word: "創作", meaningsFr: ["Création"], readings: ["そうさく"], mnemonicFr: "Faire quelque chose de nouveau = CRÉATION.", levelId: 45 },
];

async function main() {
  console.log("Seeding vocabulary supplement 2 (levels 31-45)...");

  for (const vocab of vocabData) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: {
        meaningsFr: vocab.meaningsFr,
        readings: vocab.readings,
        mnemonicFr: vocab.mnemonicFr,
      },
      create: vocab,
    });
  }

  console.log(`Seeded ${vocabData.length} vocabulary words.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
