import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary for kanji that currently have 0 vocabulary
const missingVocab = [
  // 他 (Autre)
  { word: "他", meanings: ["Autre"], readings: ["た"], mnemonicFr: "AUTRE - Ce qui est différent.", targetKanji: ["他"] },
  { word: "他人", meanings: ["Autrui"], readings: ["たにん"], mnemonicFr: "AUTRUI - Une autre personne.", targetKanji: ["他", "人"] },
  { word: "他国", meanings: ["Autre pays"], readings: ["たこく"], mnemonicFr: "AUTRE PAYS - Pays étranger.", targetKanji: ["他", "国"] },
  { word: "他方", meanings: ["D'autre part"], readings: ["たほう"], mnemonicFr: "D'AUTRE PART - D'un autre côté.", targetKanji: ["他", "方"] },
  { word: "その他", meanings: ["Autres", "Et cetera"], readings: ["そのた"], mnemonicFr: "AUTRES - Et le reste.", targetKanji: ["他"] },

  // 求 (Chercher)
  { word: "求める", meanings: ["Demander", "Chercher"], readings: ["もとめる"], mnemonicFr: "DEMANDER - Solliciter.", targetKanji: ["求"] },
  { word: "求人", meanings: ["Offre d'emploi"], readings: ["きゅうじん"], mnemonicFr: "OFFRE D'EMPLOI - Chercher des employés.", targetKanji: ["求", "人"] },
  { word: "要求", meanings: ["Exigence"], readings: ["ようきゅう"], mnemonicFr: "EXIGENCE - Demande ferme.", targetKanji: ["要", "求"] },
  { word: "請求", meanings: ["Demande", "Facture"], readings: ["せいきゅう"], mnemonicFr: "FACTURE - Demande de paiement.", targetKanji: ["請", "求"] },
  { word: "追求", meanings: ["Poursuite"], readings: ["ついきゅう"], mnemonicFr: "POURSUITE - Chercher à atteindre.", targetKanji: ["追", "求"] },

  // 央 (Centre)
  { word: "中央", meanings: ["Centre"], readings: ["ちゅうおう"], mnemonicFr: "CENTRE - Le milieu.", targetKanji: ["中", "央"] },

  // 未 (Pas encore)
  { word: "未来", meanings: ["Futur"], readings: ["みらい"], mnemonicFr: "FUTUR - Ce qui n'est pas encore arrivé.", targetKanji: ["未", "来"] },
  { word: "未定", meanings: ["Indéterminé"], readings: ["みてい"], mnemonicFr: "INDÉTERMINÉ - Pas encore décidé.", targetKanji: ["未", "定"] },
  { word: "未知", meanings: ["Inconnu"], readings: ["みち"], mnemonicFr: "INCONNU - Pas encore connu.", targetKanji: ["未", "知"] },
  { word: "未満", meanings: ["Moins de"], readings: ["みまん"], mnemonicFr: "MOINS DE - Pas encore atteint.", targetKanji: ["未", "満"] },
  { word: "未熟", meanings: ["Immature"], readings: ["みじゅく"], mnemonicFr: "IMMATURE - Pas encore mûr.", targetKanji: ["未", "熟"] },

  // 必 (Nécessaire)
  { word: "必ず", meanings: ["Certainement"], readings: ["かならず"], mnemonicFr: "CERTAINEMENT - Sans faute.", targetKanji: ["必"] },
  { word: "必要", meanings: ["Nécessaire"], readings: ["ひつよう"], mnemonicFr: "NÉCESSAIRE - Indispensable.", targetKanji: ["必", "要"] },
  { word: "必死", meanings: ["Désespéré"], readings: ["ひっし"], mnemonicFr: "DÉSESPÉRÉ - Mort certaine.", targetKanji: ["必", "死"] },
  { word: "必然", meanings: ["Inévitable"], readings: ["ひつぜん"], mnemonicFr: "INÉVITABLE - Qui doit arriver.", targetKanji: ["必", "然"] },

  // 次 (Suivant)
  { word: "次", meanings: ["Suivant"], readings: ["つぎ"], mnemonicFr: "SUIVANT - Qui vient après.", targetKanji: ["次"] },
  { word: "次回", meanings: ["Prochaine fois"], readings: ["じかい"], mnemonicFr: "PROCHAINE FOIS - La fois suivante.", targetKanji: ["次", "回"] },
  { word: "次第", meanings: ["Dépendre de"], readings: ["しだい"], mnemonicFr: "DÉPENDRE DE - Selon.", targetKanji: ["次", "第"] },
  { word: "次男", meanings: ["Deuxième fils"], readings: ["じなん"], mnemonicFr: "DEUXIÈME FILS - Le fils cadet.", targetKanji: ["次", "男"] },
  { word: "次女", meanings: ["Deuxième fille"], readings: ["じじょ"], mnemonicFr: "DEUXIÈME FILLE - La fille cadette.", targetKanji: ["次", "女"] },
  { word: "目次", meanings: ["Table des matières"], readings: ["もくじ"], mnemonicFr: "TABLE DES MATIÈRES - Index.", targetKanji: ["目", "次"] },

  // 氏 (Monsieur)
  { word: "氏名", meanings: ["Nom complet"], readings: ["しめい"], mnemonicFr: "NOM COMPLET - Nom de famille et prénom.", targetKanji: ["氏", "名"] },
  { word: "彼氏", meanings: ["Petit ami"], readings: ["かれし"], mnemonicFr: "PETIT AMI - Compagnon.", targetKanji: ["彼", "氏"] },

  // 戸 (Porte)
  { word: "戸", meanings: ["Porte"], readings: ["と"], mnemonicFr: "PORTE - Battant.", targetKanji: ["戸"] },
  { word: "戸口", meanings: ["Porte d'entrée"], readings: ["とぐち"], mnemonicFr: "PORTE D'ENTRÉE - Entrée de maison.", targetKanji: ["戸", "口"] },
  { word: "江戸", meanings: ["Edo"], readings: ["えど"], mnemonicFr: "EDO - Ancien nom de Tokyo.", targetKanji: ["江", "戸"] },
  { word: "戸外", meanings: ["Extérieur"], readings: ["こがい"], mnemonicFr: "EXTÉRIEUR - Dehors.", targetKanji: ["戸", "外"] },

  // 底 (Fond)
  { word: "底", meanings: ["Fond"], readings: ["そこ"], mnemonicFr: "FOND - La partie la plus basse.", targetKanji: ["底"] },
  { word: "海底", meanings: ["Fond marin"], readings: ["かいてい"], mnemonicFr: "FOND MARIN - Sous la mer.", targetKanji: ["海", "底"] },
  { word: "根底", meanings: ["Base"], readings: ["こんてい"], mnemonicFr: "BASE - Fondement.", targetKanji: ["根", "底"] },

  // 辺 (Alentours)
  { word: "辺", meanings: ["Alentours"], readings: ["へん"], mnemonicFr: "ALENTOURS - Les environs.", targetKanji: ["辺"] },
  { word: "辺り", meanings: ["Environs"], readings: ["あたり"], mnemonicFr: "ENVIRONS - Dans les parages.", targetKanji: ["辺"] },
  { word: "周辺", meanings: ["Périphérie"], readings: ["しゅうへん"], mnemonicFr: "PÉRIPHÉRIE - Autour.", targetKanji: ["周", "辺"] },
  { word: "海辺", meanings: ["Bord de mer"], readings: ["うみべ"], mnemonicFr: "BORD DE MER - Côte.", targetKanji: ["海", "辺"] },

  // 受 (Recevoir)
  { word: "受ける", meanings: ["Recevoir"], readings: ["うける"], mnemonicFr: "RECEVOIR - Accepter.", targetKanji: ["受"] },
  { word: "受付", meanings: ["Réception"], readings: ["うけつけ"], mnemonicFr: "RÉCEPTION - Accueil.", targetKanji: ["受", "付"] },
  { word: "受験", meanings: ["Examen"], readings: ["じゅけん"], mnemonicFr: "EXAMEN - Passer un test.", targetKanji: ["受", "験"] },
  { word: "受信", meanings: ["Réception"], readings: ["じゅしん"], mnemonicFr: "RÉCEPTION - Recevoir un signal.", targetKanji: ["受", "信"] },
  { word: "受取", meanings: ["Reçu"], readings: ["うけとり"], mnemonicFr: "REÇU - Accusé de réception.", targetKanji: ["受", "取"] },

  // 欠 (Manquer)
  { word: "欠ける", meanings: ["Manquer"], readings: ["かける"], mnemonicFr: "MANQUER - Faire défaut.", targetKanji: ["欠"] },
  { word: "欠点", meanings: ["Défaut"], readings: ["けってん"], mnemonicFr: "DÉFAUT - Point faible.", targetKanji: ["欠", "点"] },
  { word: "欠席", meanings: ["Absence"], readings: ["けっせき"], mnemonicFr: "ABSENCE - Ne pas être présent.", targetKanji: ["欠", "席"] },
  { word: "欠陥", meanings: ["Défectuosité"], readings: ["けっかん"], mnemonicFr: "DÉFECTUOSITÉ - Imperfection.", targetKanji: ["欠", "陥"] },

  // 史 (Histoire)
  { word: "歴史", meanings: ["Histoire"], readings: ["れきし"], mnemonicFr: "HISTOIRE - Récit du passé.", targetKanji: ["歴", "史"] },
  { word: "史上", meanings: ["Dans l'histoire"], readings: ["しじょう"], mnemonicFr: "DANS L'HISTOIRE - Historiquement.", targetKanji: ["史", "上"] },
  { word: "日本史", meanings: ["Histoire du Japon"], readings: ["にほんし"], mnemonicFr: "HISTOIRE DU JAPON - Histoire japonaise.", targetKanji: ["日", "本", "史"] },
  { word: "世界史", meanings: ["Histoire mondiale"], readings: ["せかいし"], mnemonicFr: "HISTOIRE MONDIALE - Histoire du monde.", targetKanji: ["世", "界", "史"] },

  // 路 (Route)
  { word: "道路", meanings: ["Route"], readings: ["どうろ"], mnemonicFr: "ROUTE - Voie de circulation.", targetKanji: ["道", "路"] },
  { word: "路線", meanings: ["Ligne"], readings: ["ろせん"], mnemonicFr: "LIGNE - Trajet.", targetKanji: ["路", "線"] },
  { word: "進路", meanings: ["Direction"], readings: ["しんろ"], mnemonicFr: "DIRECTION - Chemin à suivre.", targetKanji: ["進", "路"] },
  { word: "通路", meanings: ["Passage"], readings: ["つうろ"], mnemonicFr: "PASSAGE - Couloir.", targetKanji: ["通", "路"] },

  // 徒 (Élève)
  { word: "生徒", meanings: ["Élève"], readings: ["せいと"], mnemonicFr: "ÉLÈVE - Étudiant.", targetKanji: ["生", "徒"] },
  { word: "徒歩", meanings: ["À pied"], readings: ["とほ"], mnemonicFr: "À PIED - Marcher.", targetKanji: ["徒", "歩"] },

  // 血 (Sang)
  { word: "血", meanings: ["Sang"], readings: ["ち"], mnemonicFr: "SANG - Liquide vital.", targetKanji: ["血"] },
  { word: "血液", meanings: ["Sang"], readings: ["けつえき"], mnemonicFr: "SANG - Fluide corporel.", targetKanji: ["血", "液"] },
  { word: "血圧", meanings: ["Tension artérielle"], readings: ["けつあつ"], mnemonicFr: "TENSION - Pression du sang.", targetKanji: ["血", "圧"] },
  { word: "出血", meanings: ["Saignement"], readings: ["しゅっけつ"], mnemonicFr: "SAIGNEMENT - Perte de sang.", targetKanji: ["出", "血"] },

  // 圧 (Pression)
  { word: "圧力", meanings: ["Pression"], readings: ["あつりょく"], mnemonicFr: "PRESSION - Force exercée.", targetKanji: ["圧", "力"] },
  { word: "気圧", meanings: ["Pression atmosphérique"], readings: ["きあつ"], mnemonicFr: "PRESSION ATMOSPHÉRIQUE - Pression de l'air.", targetKanji: ["気", "圧"] },
  { word: "圧縮", meanings: ["Compression"], readings: ["あっしゅく"], mnemonicFr: "COMPRESSION - Réduire le volume.", targetKanji: ["圧", "縮"] },

  // More useful vocabulary
  { word: "軽い", meanings: ["Léger"], readings: ["かるい"], mnemonicFr: "LÉGER - Pas lourd.", targetKanji: ["軽"] },
  { word: "軽減", meanings: ["Réduction"], readings: ["けいげん"], mnemonicFr: "RÉDUCTION - Diminuer.", targetKanji: ["軽", "減"] },
  { word: "軽食", meanings: ["Collation"], readings: ["けいしょく"], mnemonicFr: "COLLATION - Repas léger.", targetKanji: ["軽", "食"] },
  { word: "手軽", meanings: ["Simple"], readings: ["てがる"], mnemonicFr: "SIMPLE - Facile à faire.", targetKanji: ["手", "軽"] },

  { word: "嬉しい", meanings: ["Content"], readings: ["うれしい"], mnemonicFr: "CONTENT - Joyeux.", targetKanji: ["嬉"] },

  { word: "役", meanings: ["Rôle"], readings: ["やく"], mnemonicFr: "RÔLE - Fonction.", targetKanji: ["役"] },
  { word: "役目", meanings: ["Devoir"], readings: ["やくめ"], mnemonicFr: "DEVOIR - Responsabilité.", targetKanji: ["役", "目"] },
  { word: "役割", meanings: ["Rôle"], readings: ["やくわり"], mnemonicFr: "RÔLE - Part à jouer.", targetKanji: ["役", "割"] },
  { word: "役所", meanings: ["Mairie"], readings: ["やくしょ"], mnemonicFr: "MAIRIE - Bureau administratif.", targetKanji: ["役", "所"] },
  { word: "役立つ", meanings: ["Être utile"], readings: ["やくだつ"], mnemonicFr: "ÊTRE UTILE - Servir.", targetKanji: ["役", "立"] },
  { word: "役員", meanings: ["Dirigeant"], readings: ["やくいん"], mnemonicFr: "DIRIGEANT - Cadre.", targetKanji: ["役", "員"] },
  { word: "役者", meanings: ["Acteur"], readings: ["やくしゃ"], mnemonicFr: "ACTEUR - Comédien.", targetKanji: ["役", "者"] },
  { word: "主役", meanings: ["Rôle principal"], readings: ["しゅやく"], mnemonicFr: "RÔLE PRINCIPAL - Personnage principal.", targetKanji: ["主", "役"] },

  { word: "州", meanings: ["État"], readings: ["しゅう"], mnemonicFr: "ÉTAT - Province.", targetKanji: ["州"] },
  { word: "九州", meanings: ["Kyushu"], readings: ["きゅうしゅう"], mnemonicFr: "KYUSHU - Île du Japon.", targetKanji: ["九", "州"] },
  { word: "本州", meanings: ["Honshu"], readings: ["ほんしゅう"], mnemonicFr: "HONSHU - Île principale.", targetKanji: ["本", "州"] },

  { word: "一冊", meanings: ["Un livre"], readings: ["いっさつ"], mnemonicFr: "UN LIVRE - Un volume.", targetKanji: ["一", "冊"] },
  { word: "二冊", meanings: ["Deux livres"], readings: ["にさつ"], mnemonicFr: "DEUX LIVRES - Deux volumes.", targetKanji: ["二", "冊"] },
  { word: "何冊", meanings: ["Combien de livres"], readings: ["なんさつ"], mnemonicFr: "COMBIEN DE LIVRES - Nombre de livres.", targetKanji: ["何", "冊"] },

  { word: "一枚", meanings: ["Une feuille"], readings: ["いちまい"], mnemonicFr: "UNE FEUILLE - Un objet plat.", targetKanji: ["一", "枚"] },
  { word: "二枚", meanings: ["Deux feuilles"], readings: ["にまい"], mnemonicFr: "DEUX FEUILLES - Deux objets plats.", targetKanji: ["二", "枚"] },
  { word: "何枚", meanings: ["Combien de feuilles"], readings: ["なんまい"], mnemonicFr: "COMBIEN DE FEUILLES - Nombre d'objets plats.", targetKanji: ["何", "枚"] },

  { word: "一羽", meanings: ["Un oiseau"], readings: ["いちわ"], mnemonicFr: "UN OISEAU - Un volatile.", targetKanji: ["一", "羽"] },
  { word: "羽", meanings: ["Plume"], readings: ["はね"], mnemonicFr: "PLUME - Aile d'oiseau.", targetKanji: ["羽"] },

  { word: "皿", meanings: ["Assiette"], readings: ["さら"], mnemonicFr: "ASSIETTE - Plat.", targetKanji: ["皿"] },
  { word: "皿洗い", meanings: ["Vaisselle"], readings: ["さらあらい"], mnemonicFr: "VAISSELLE - Laver les assiettes.", targetKanji: ["皿", "洗"] },
  { word: "小皿", meanings: ["Petite assiette"], readings: ["こざら"], mnemonicFr: "PETITE ASSIETTE - Soucoupe.", targetKanji: ["小", "皿"] },
  { word: "大皿", meanings: ["Grande assiette"], readings: ["おおざら"], mnemonicFr: "GRANDE ASSIETTE - Plat de service.", targetKanji: ["大", "皿"] },

  // Additional vocabulary
  { word: "丁寧", meanings: ["Poli", "Soigné"], readings: ["ていねい"], mnemonicFr: "POLI - Courtois.", targetKanji: ["丁", "寧"] },
  { word: "丁度", meanings: ["Exactement"], readings: ["ちょうど"], mnemonicFr: "EXACTEMENT - Juste.", targetKanji: ["丁", "度"] },

  // More compounds
  { word: "身体", meanings: ["Corps"], readings: ["しんたい"], mnemonicFr: "CORPS - Physique.", targetKanji: ["身", "体"] },
  { word: "全身", meanings: ["Corps entier"], readings: ["ぜんしん"], mnemonicFr: "CORPS ENTIER - Tout le corps.", targetKanji: ["全", "身"] },
  { word: "出身", meanings: ["Origine"], readings: ["しゅっしん"], mnemonicFr: "ORIGINE - D'où on vient.", targetKanji: ["出", "身"] },

  { word: "界", meanings: ["Monde"], readings: ["かい"], mnemonicFr: "MONDE - Domaine.", targetKanji: ["界"] },
  { word: "世界", meanings: ["Monde"], readings: ["せかい"], mnemonicFr: "MONDE - La Terre.", targetKanji: ["世", "界"] },
  { word: "限界", meanings: ["Limite"], readings: ["げんかい"], mnemonicFr: "LIMITE - Borne.", targetKanji: ["限", "界"] },
  { word: "境界", meanings: ["Frontière"], readings: ["きょうかい"], mnemonicFr: "FRONTIÈRE - Limite.", targetKanji: ["境", "界"] },

  { word: "相手", meanings: ["Partenaire"], readings: ["あいて"], mnemonicFr: "PARTENAIRE - L'autre partie.", targetKanji: ["相", "手"] },
  { word: "相談", meanings: ["Consultation"], readings: ["そうだん"], mnemonicFr: "CONSULTATION - Demander conseil.", targetKanji: ["相", "談"] },
  { word: "相続", meanings: ["Héritage"], readings: ["そうぞく"], mnemonicFr: "HÉRITAGE - Succession.", targetKanji: ["相", "続"] },

  { word: "現在", meanings: ["Actuel"], readings: ["げんざい"], mnemonicFr: "ACTUEL - Présent.", targetKanji: ["現", "在"] },
  { word: "現金", meanings: ["Espèces"], readings: ["げんきん"], mnemonicFr: "ESPÈCES - Argent liquide.", targetKanji: ["現", "金"] },
  { word: "現実", meanings: ["Réalité"], readings: ["げんじつ"], mnemonicFr: "RÉALITÉ - Ce qui est vrai.", targetKanji: ["現", "実"] },
  { word: "現場", meanings: ["Sur place"], readings: ["げんば"], mnemonicFr: "SUR PLACE - Le terrain.", targetKanji: ["現", "場"] },
  { word: "出現", meanings: ["Apparition"], readings: ["しゅつげん"], mnemonicFr: "APPARITION - Se montrer.", targetKanji: ["出", "現"] },

  { word: "原因", meanings: ["Cause"], readings: ["げんいん"], mnemonicFr: "CAUSE - Raison.", targetKanji: ["原", "因"] },
  { word: "原料", meanings: ["Matière première"], readings: ["げんりょう"], mnemonicFr: "MATIÈRE PREMIÈRE - Ingrédient.", targetKanji: ["原", "料"] },
  { word: "原則", meanings: ["Principe"], readings: ["げんそく"], mnemonicFr: "PRINCIPE - Règle de base.", targetKanji: ["原", "則"] },

  { word: "制度", meanings: ["Système"], readings: ["せいど"], mnemonicFr: "SYSTÈME - Organisation.", targetKanji: ["制", "度"] },
  { word: "制限", meanings: ["Restriction"], readings: ["せいげん"], mnemonicFr: "RESTRICTION - Limite.", targetKanji: ["制", "限"] },
  { word: "制作", meanings: ["Production"], readings: ["せいさく"], mnemonicFr: "PRODUCTION - Création.", targetKanji: ["制", "作"] },

  { word: "性格", meanings: ["Personnalité"], readings: ["せいかく"], mnemonicFr: "PERSONNALITÉ - Caractère.", targetKanji: ["性", "格"] },
  { word: "性質", meanings: ["Nature"], readings: ["せいしつ"], mnemonicFr: "NATURE - Caractéristique.", targetKanji: ["性", "質"] },
  { word: "男性", meanings: ["Homme"], readings: ["だんせい"], mnemonicFr: "HOMME - Sexe masculin.", targetKanji: ["男", "性"] },
  { word: "女性", meanings: ["Femme"], readings: ["じょせい"], mnemonicFr: "FEMME - Sexe féminin.", targetKanji: ["女", "性"] },
];

async function main() {
  console.log("=== SEEDING MISSING VOCABULARY ===\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  let added = 0;
  let skipped = 0;

  for (const vocab of missingVocab) {
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));
    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skipped++;
      continue;
    }

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
          }).catch(() => {});
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
