import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Additional vocabulary to reach 6,000 target
// Focus on useful everyday words with French mnemonics

const vocabData = [
  // Level 21 vocabulary
  { word: "届く", meaningsFr: ["Arriver", "Atteindre"], readings: ["とどく"], mnemonicFr: "Le colis qui ARRIVE enfin.", levelId: 21 },
  { word: "届ける", meaningsFr: ["Livrer", "Remettre"], readings: ["とどける"], mnemonicFr: "LIVRER un paquet.", levelId: 21 },
  { word: "届け", meaningsFr: ["Notification", "Déclaration"], readings: ["とどけ"], mnemonicFr: "La NOTIFICATION officielle.", levelId: 21 },
  { word: "拾う", meaningsFr: ["Ramasser"], readings: ["ひろう"], mnemonicFr: "RAMASSER des marrons.", levelId: 21 },
  { word: "捨てる", meaningsFr: ["Jeter"], readings: ["すてる"], mnemonicFr: "JETER à la poubelle.", levelId: 21 },
  { word: "払う", meaningsFr: ["Payer"], readings: ["はらう"], mnemonicFr: "PAYER l'addition.", levelId: 21 },
  { word: "押す", meaningsFr: ["Pousser"], readings: ["おす"], mnemonicFr: "POUSSER la porte.", levelId: 21 },
  { word: "引く", meaningsFr: ["Tirer"], readings: ["ひく"], mnemonicFr: "TIRER le rideau.", levelId: 21 },
  { word: "引き出し", meaningsFr: ["Tiroir"], readings: ["ひきだし"], mnemonicFr: "Le TIROIR du bureau.", levelId: 21 },
  { word: "引っ越す", meaningsFr: ["Déménager"], readings: ["ひっこす"], mnemonicFr: "DÉMÉNAGER dans un nouvel appartement.", levelId: 21 },

  // Level 22 vocabulary
  { word: "滑る", meaningsFr: ["Glisser"], readings: ["すべる"], mnemonicFr: "GLISSER sur la glace.", levelId: 22 },
  { word: "跳ぶ", meaningsFr: ["Sauter"], readings: ["とぶ"], mnemonicFr: "SAUTER de joie.", levelId: 22 },
  { word: "歩く", meaningsFr: ["Marcher"], readings: ["あるく"], mnemonicFr: "MARCHER dans la rue.", levelId: 22 },
  { word: "歩道", meaningsFr: ["Trottoir"], readings: ["ほどう"], mnemonicFr: "Le TROTTOIR piétonnier.", levelId: 22 },
  { word: "散歩", meaningsFr: ["Promenade"], readings: ["さんぽ"], mnemonicFr: "Une PROMENADE au parc.", levelId: 22 },
  { word: "掛ける", meaningsFr: ["Accrocher"], readings: ["かける"], mnemonicFr: "ACCROCHER un tableau.", levelId: 22 },
  { word: "掛かる", meaningsFr: ["Être accroché"], readings: ["かかる"], mnemonicFr: "Le manteau EST ACCROCHÉ.", levelId: 22 },
  { word: "磨く", meaningsFr: ["Polir", "Brosser"], readings: ["みがく"], mnemonicFr: "BROSSER ses dents.", levelId: 22 },
  { word: "歯磨き", meaningsFr: ["Brossage de dents"], readings: ["はみがき"], mnemonicFr: "Le BROSSAGE DE DENTS.", levelId: 22 },
  { word: "進歩", meaningsFr: ["Progrès"], readings: ["しんぽ"], mnemonicFr: "Le PROGRÈS technologique.", levelId: 22 },

  // Level 23 vocabulary
  { word: "波", meaningsFr: ["Vague"], readings: ["なみ"], mnemonicFr: "La VAGUE de l'océan.", levelId: 23 },
  { word: "風", meaningsFr: ["Vent"], readings: ["かぜ"], mnemonicFr: "Le VENT qui souffle.", levelId: 23 },
  { word: "風邪", meaningsFr: ["Rhume"], readings: ["かぜ"], mnemonicFr: "Attraper un RHUME.", levelId: 23 },
  { word: "台風", meaningsFr: ["Typhon"], readings: ["たいふう"], mnemonicFr: "Le TYPHON dévastateur.", levelId: 23 },
  { word: "雲", meaningsFr: ["Nuage"], readings: ["くも"], mnemonicFr: "Le NUAGE dans le ciel.", levelId: 23 },
  { word: "曇り", meaningsFr: ["Nuageux"], readings: ["くもり"], mnemonicFr: "Temps NUAGEUX.", levelId: 23 },
  { word: "屈む", meaningsFr: ["Se courber"], readings: ["かがむ"], mnemonicFr: "SE COURBER pour ramasser.", levelId: 23 },
  { word: "伸びる", meaningsFr: ["S'étendre"], readings: ["のびる"], mnemonicFr: "La plante S'ÉTEND.", levelId: 23 },
  { word: "伸ばす", meaningsFr: ["Étendre"], readings: ["のばす"], mnemonicFr: "ÉTENDRE les bras.", levelId: 23 },
  { word: "背伸び", meaningsFr: ["Se dresser sur la pointe des pieds"], readings: ["せのび"], mnemonicFr: "SE DRESSER pour voir.", levelId: 23 },

  // Level 24 vocabulary
  { word: "喜ぶ", meaningsFr: ["Se réjouir"], readings: ["よろこぶ"], mnemonicFr: "SE RÉJOUIR d'une nouvelle.", levelId: 24 },
  { word: "喜び", meaningsFr: ["Joie"], readings: ["よろこび"], mnemonicFr: "La JOIE du succès.", levelId: 24 },
  { word: "怒る", meaningsFr: ["Se fâcher"], readings: ["おこる"], mnemonicFr: "SE FÂCHER contre quelqu'un.", levelId: 24 },
  { word: "怒り", meaningsFr: ["Colère"], readings: ["いかり"], mnemonicFr: "La COLÈRE qui monte.", levelId: 24 },
  { word: "悲しい", meaningsFr: ["Triste"], readings: ["かなしい"], mnemonicFr: "Être TRISTE.", levelId: 24 },
  { word: "悲しみ", meaningsFr: ["Tristesse"], readings: ["かなしみ"], mnemonicFr: "La TRISTESSE profonde.", levelId: 24 },
  { word: "握る", meaningsFr: ["Saisir"], readings: ["にぎる"], mnemonicFr: "SAISIR fermement.", levelId: 24 },
  { word: "握手", meaningsFr: ["Poignée de main"], readings: ["あくしゅ"], mnemonicFr: "Une POIGNÉE DE MAIN.", levelId: 24 },
  { word: "放す", meaningsFr: ["Relâcher"], readings: ["はなす"], mnemonicFr: "RELÂCHER sa prise.", levelId: 24 },
  { word: "解放", meaningsFr: ["Libération"], readings: ["かいほう"], mnemonicFr: "La LIBÉRATION des prisonniers.", levelId: 24 },

  // Level 25 vocabulary
  { word: "泣く", meaningsFr: ["Pleurer"], readings: ["なく"], mnemonicFr: "PLEURER de tristesse.", levelId: 25 },
  { word: "泣き声", meaningsFr: ["Pleurs"], readings: ["なきごえ"], mnemonicFr: "Les PLEURS d'un bébé.", levelId: 25 },
  { word: "笑う", meaningsFr: ["Rire"], readings: ["わらう"], mnemonicFr: "RIRE aux éclats.", levelId: 25 },
  { word: "笑顔", meaningsFr: ["Sourire"], readings: ["えがお"], mnemonicFr: "Un beau SOURIRE.", levelId: 25 },
  { word: "会う", meaningsFr: ["Rencontrer"], readings: ["あう"], mnemonicFr: "RENCONTRER un ami.", levelId: 25 },
  { word: "会議", meaningsFr: ["Réunion"], readings: ["かいぎ"], mnemonicFr: "Une RÉUNION de travail.", levelId: 25 },
  { word: "別れる", meaningsFr: ["Se séparer"], readings: ["わかれる"], mnemonicFr: "SE SÉPARER de quelqu'un.", levelId: 25 },
  { word: "別々", meaningsFr: ["Séparément"], readings: ["べつべつ"], mnemonicFr: "Partir SÉPARÉMENT.", levelId: 25 },
  { word: "送る", meaningsFr: ["Envoyer"], readings: ["おくる"], mnemonicFr: "ENVOYER une lettre.", levelId: 25 },
  { word: "送料", meaningsFr: ["Frais d'envoi"], readings: ["そうりょう"], mnemonicFr: "Les FRAIS D'ENVOI.", levelId: 25 },

  // Level 26 vocabulary
  { word: "住む", meaningsFr: ["Habiter"], readings: ["すむ"], mnemonicFr: "HABITER à Paris.", levelId: 26 },
  { word: "住所", meaningsFr: ["Adresse"], readings: ["じゅうしょ"], mnemonicFr: "L'ADRESSE du domicile.", levelId: 26 },
  { word: "住民", meaningsFr: ["Habitants"], readings: ["じゅうみん"], mnemonicFr: "Les HABITANTS du quartier.", levelId: 26 },
  { word: "建てる", meaningsFr: ["Construire"], readings: ["たてる"], mnemonicFr: "CONSTRUIRE une maison.", levelId: 26 },
  { word: "建物", meaningsFr: ["Bâtiment"], readings: ["たてもの"], mnemonicFr: "Un grand BÂTIMENT.", levelId: 26 },
  { word: "修理", meaningsFr: ["Réparation"], readings: ["しゅうり"], mnemonicFr: "La RÉPARATION de la voiture.", levelId: 26 },
  { word: "眠る", meaningsFr: ["Dormir"], readings: ["ねむる"], mnemonicFr: "DORMIR profondément.", levelId: 26 },
  { word: "眠い", meaningsFr: ["Avoir sommeil"], readings: ["ねむい"], mnemonicFr: "AVOIR SOMMEIL.", levelId: 26 },
  { word: "覚める", meaningsFr: ["Se réveiller"], readings: ["さめる"], mnemonicFr: "SE RÉVEILLER tôt.", levelId: 26 },
  { word: "覚える", meaningsFr: ["Mémoriser"], readings: ["おぼえる"], mnemonicFr: "MÉMORISER une leçon.", levelId: 26 },

  // Level 27 vocabulary
  { word: "借りる", meaningsFr: ["Emprunter"], readings: ["かりる"], mnemonicFr: "EMPRUNTER un livre.", levelId: 27 },
  { word: "借金", meaningsFr: ["Dette"], readings: ["しゃっきん"], mnemonicFr: "Avoir une DETTE.", levelId: 27 },
  { word: "貸す", meaningsFr: ["Prêter"], readings: ["かす"], mnemonicFr: "PRÊTER de l'argent.", levelId: 27 },
  { word: "勤める", meaningsFr: ["Travailler pour"], readings: ["つとめる"], mnemonicFr: "TRAVAILLER pour une entreprise.", levelId: 27 },
  { word: "勤務", meaningsFr: ["Service", "Travail"], readings: ["きんむ"], mnemonicFr: "Le SERVICE au bureau.", levelId: 27 },
  { word: "休む", meaningsFr: ["Se reposer"], readings: ["やすむ"], mnemonicFr: "SE REPOSER un peu.", levelId: 27 },
  { word: "休憩", meaningsFr: ["Pause"], readings: ["きゅうけい"], mnemonicFr: "Une PAUSE café.", levelId: 27 },
  { word: "休日", meaningsFr: ["Jour de congé"], readings: ["きゅうじつ"], mnemonicFr: "Un JOUR DE CONGÉ.", levelId: 27 },
  { word: "続く", meaningsFr: ["Continuer"], readings: ["つづく"], mnemonicFr: "La pluie CONTINUE.", levelId: 27 },
  { word: "続ける", meaningsFr: ["Poursuivre"], readings: ["つづける"], mnemonicFr: "POURSUIVRE ses efforts.", levelId: 27 },

  // Level 28 vocabulary
  { word: "呼ぶ", meaningsFr: ["Appeler"], readings: ["よぶ"], mnemonicFr: "APPELER quelqu'un.", levelId: 28 },
  { word: "呼び出す", meaningsFr: ["Convoquer"], readings: ["よびだす"], mnemonicFr: "CONVOQUER à une réunion.", levelId: 28 },
  { word: "聴く", meaningsFr: ["Écouter"], readings: ["きく"], mnemonicFr: "ÉCOUTER de la musique.", levelId: 28 },
  { word: "話す", meaningsFr: ["Parler"], readings: ["はなす"], mnemonicFr: "PARLER français.", levelId: 28 },
  { word: "話", meaningsFr: ["Histoire", "Conversation"], readings: ["はなし"], mnemonicFr: "Une HISTOIRE intéressante.", levelId: 28 },
  { word: "電話", meaningsFr: ["Téléphone"], readings: ["でんわ"], mnemonicFr: "Le TÉLÉPHONE sonne.", levelId: 28 },
  { word: "会話", meaningsFr: ["Conversation"], readings: ["かいわ"], mnemonicFr: "Une CONVERSATION agréable.", levelId: 28 },
  { word: "失う", meaningsFr: ["Perdre"], readings: ["うしなう"], mnemonicFr: "PERDRE ses clés.", levelId: 28 },
  { word: "失敗", meaningsFr: ["Échec"], readings: ["しっぱい"], mnemonicFr: "Un ÉCHEC cuisant.", levelId: 28 },
  { word: "探す", meaningsFr: ["Chercher"], readings: ["さがす"], mnemonicFr: "CHERCHER son chemin.", levelId: 28 },

  // Level 29 vocabulary
  { word: "選ぶ", meaningsFr: ["Choisir"], readings: ["えらぶ"], mnemonicFr: "CHOISIR un cadeau.", levelId: 29 },
  { word: "選挙", meaningsFr: ["Élection"], readings: ["せんきょ"], mnemonicFr: "Une ÉLECTION présidentielle.", levelId: 29 },
  { word: "決める", meaningsFr: ["Décider"], readings: ["きめる"], mnemonicFr: "DÉCIDER du menu.", levelId: 29 },
  { word: "決定", meaningsFr: ["Décision"], readings: ["けってい"], mnemonicFr: "Une DÉCISION importante.", levelId: 29 },
  { word: "教える", meaningsFr: ["Enseigner"], readings: ["おしえる"], mnemonicFr: "ENSEIGNER le français.", levelId: 29 },
  { word: "教室", meaningsFr: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "La SALLE DE CLASSE.", levelId: 29 },
  { word: "学ぶ", meaningsFr: ["Apprendre"], readings: ["まなぶ"], mnemonicFr: "APPRENDRE le japonais.", levelId: 29 },
  { word: "学生", meaningsFr: ["Étudiant"], readings: ["がくせい"], mnemonicFr: "Un ÉTUDIANT sérieux.", levelId: 29 },
  { word: "思う", meaningsFr: ["Penser"], readings: ["おもう"], mnemonicFr: "PENSER à quelqu'un.", levelId: 29 },
  { word: "思い出", meaningsFr: ["Souvenir"], readings: ["おもいで"], mnemonicFr: "Un beau SOUVENIR.", levelId: 29 },

  // Level 30 vocabulary
  { word: "開く", meaningsFr: ["Ouvrir"], readings: ["あく", "ひらく"], mnemonicFr: "OUVRIR la porte.", levelId: 30 },
  { word: "開ける", meaningsFr: ["Ouvrir (transitif)"], readings: ["あける"], mnemonicFr: "OUVRIR une fenêtre.", levelId: 30 },
  { word: "閉める", meaningsFr: ["Fermer"], readings: ["しめる"], mnemonicFr: "FERMER le magasin.", levelId: 30 },
  { word: "閉まる", meaningsFr: ["Se fermer"], readings: ["しまる"], mnemonicFr: "La porte SE FERME.", levelId: 30 },
  { word: "回る", meaningsFr: ["Tourner"], readings: ["まわる"], mnemonicFr: "Le manège TOURNE.", levelId: 30 },
  { word: "回す", meaningsFr: ["Faire tourner"], readings: ["まわす"], mnemonicFr: "FAIRE TOURNER la roue.", levelId: 30 },
  { word: "解く", meaningsFr: ["Résoudre"], readings: ["とく"], mnemonicFr: "RÉSOUDRE un problème.", levelId: 30 },
  { word: "解決", meaningsFr: ["Solution"], readings: ["かいけつ"], mnemonicFr: "Trouver une SOLUTION.", levelId: 30 },
  { word: "答える", meaningsFr: ["Répondre"], readings: ["こたえる"], mnemonicFr: "RÉPONDRE à une question.", levelId: 30 },
  { word: "答え", meaningsFr: ["Réponse"], readings: ["こたえ"], mnemonicFr: "La RÉPONSE correcte.", levelId: 30 },
];

async function main() {
  console.log("Seeding additional vocabulary (final supplement)...");

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

  console.log(`Seeded ${vocabData.length} additional vocabulary words.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
