import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final vocabulary batch - targeting kanji with few vocabulary
const lastVocab = [
  // Basic early level vocabulary
  { word: "日々", meanings: ["Chaque jour"], readings: ["ひび"], mnemonicFr: "CHAQUE JOUR - Jour après jour.", targetKanji: ["日"] },
  { word: "人々", meanings: ["Les gens"], readings: ["ひとびと"], mnemonicFr: "LES GENS - Plusieurs personnes.", targetKanji: ["人"] },
  { word: "山々", meanings: ["Les montagnes"], readings: ["やまやま"], mnemonicFr: "LES MONTAGNES - Plusieurs montagnes.", targetKanji: ["山"] },
  { word: "木々", meanings: ["Les arbres"], readings: ["きぎ"], mnemonicFr: "LES ARBRES - Plusieurs arbres.", targetKanji: ["木"] },
  { word: "国々", meanings: ["Les pays"], readings: ["くにぐに"], mnemonicFr: "LES PAYS - Plusieurs nations.", targetKanji: ["国"] },

  // More compound words
  { word: "入門", meanings: ["Introduction"], readings: ["にゅうもん"], mnemonicFr: "INTRODUCTION - Entrer par la porte.", targetKanji: ["入", "門"] },
  { word: "門", meanings: ["Portail"], readings: ["もん"], mnemonicFr: "PORTAIL - Grande porte.", targetKanji: ["門"] },
  { word: "専門", meanings: ["Spécialité"], readings: ["せんもん"], mnemonicFr: "SPÉCIALITÉ - Domaine d'expertise.", targetKanji: ["専", "門"] },
  { word: "正門", meanings: ["Porte principale"], readings: ["せいもん"], mnemonicFr: "PORTE PRINCIPALE - Entrée officielle.", targetKanji: ["正", "門"] },
  { word: "校門", meanings: ["Portail de l'école"], readings: ["こうもん"], mnemonicFr: "PORTAIL DE L'ÉCOLE - Entrée de l'école.", targetKanji: ["校", "門"] },

  // Body and health
  { word: "目", meanings: ["Œil"], readings: ["め"], mnemonicFr: "ŒIL - Organe de la vue.", targetKanji: ["目"] },
  { word: "耳", meanings: ["Oreille"], readings: ["みみ"], mnemonicFr: "OREILLE - Organe de l'ouïe.", targetKanji: ["耳"] },
  { word: "口", meanings: ["Bouche"], readings: ["くち"], mnemonicFr: "BOUCHE - Orifice pour manger et parler.", targetKanji: ["口"] },
  { word: "手", meanings: ["Main"], readings: ["て"], mnemonicFr: "MAIN - Membre pour saisir.", targetKanji: ["手"] },
  { word: "足", meanings: ["Pied"], readings: ["あし"], mnemonicFr: "PIED - Membre pour marcher.", targetKanji: ["足"] },

  // Nature
  { word: "空", meanings: ["Ciel"], readings: ["そら"], mnemonicFr: "CIEL - L'espace au-dessus de nous.", targetKanji: ["空"] },
  { word: "星", meanings: ["Étoile"], readings: ["ほし"], mnemonicFr: "ÉTOILE - Astre lumineux.", targetKanji: ["星"] },
  { word: "花", meanings: ["Fleur"], readings: ["はな"], mnemonicFr: "FLEUR - Partie de la plante.", targetKanji: ["花"] },
  { word: "草", meanings: ["Herbe"], readings: ["くさ"], mnemonicFr: "HERBE - Végétation basse.", targetKanji: ["草"] },
  { word: "葉", meanings: ["Feuille"], readings: ["は"], mnemonicFr: "FEUILLE - Partie verte de la plante.", targetKanji: ["葉"] },

  // Time expressions
  { word: "朝", meanings: ["Matin"], readings: ["あさ"], mnemonicFr: "MATIN - Début de journée.", targetKanji: ["朝"] },
  { word: "昼", meanings: ["Midi"], readings: ["ひる"], mnemonicFr: "MIDI - Milieu de journée.", targetKanji: ["昼"] },
  { word: "夜", meanings: ["Nuit"], readings: ["よる"], mnemonicFr: "NUIT - Période sombre.", targetKanji: ["夜"] },
  { word: "夕", meanings: ["Soir"], readings: ["ゆう"], mnemonicFr: "SOIR - Fin de journée.", targetKanji: ["夕"] },

  // Places
  { word: "店", meanings: ["Magasin"], readings: ["みせ"], mnemonicFr: "MAGASIN - Lieu de commerce.", targetKanji: ["店"] },
  { word: "駅", meanings: ["Gare"], readings: ["えき"], mnemonicFr: "GARE - Station de train.", targetKanji: ["駅"] },
  { word: "橋", meanings: ["Pont"], readings: ["はし"], mnemonicFr: "PONT - Structure pour traverser.", targetKanji: ["橋"] },
  { word: "港", meanings: ["Port"], readings: ["みなと"], mnemonicFr: "PORT - Lieu d'accostage.", targetKanji: ["港"] },

  // Actions
  { word: "泳ぐ", meanings: ["Nager"], readings: ["およぐ"], mnemonicFr: "NAGER - Se déplacer dans l'eau.", targetKanji: ["泳"] },
  { word: "登る", meanings: ["Grimper"], readings: ["のぼる"], mnemonicFr: "GRIMPER - Monter.", targetKanji: ["登"] },
  { word: "降りる", meanings: ["Descendre"], readings: ["おりる"], mnemonicFr: "DESCENDRE - Aller vers le bas.", targetKanji: ["降"] },
  { word: "払う", meanings: ["Payer"], readings: ["はらう"], mnemonicFr: "PAYER - Donner de l'argent.", targetKanji: ["払"] },
  { word: "届く", meanings: ["Arriver"], readings: ["とどく"], mnemonicFr: "ARRIVER - Parvenir à destination.", targetKanji: ["届"] },
  { word: "届ける", meanings: ["Livrer"], readings: ["とどける"], mnemonicFr: "LIVRER - Apporter.", targetKanji: ["届"] },
  { word: "届け", meanings: ["Déclaration"], readings: ["とどけ"], mnemonicFr: "DÉCLARATION - Document officiel.", targetKanji: ["届"] },

  // More everyday words
  { word: "茶", meanings: ["Thé"], readings: ["ちゃ"], mnemonicFr: "THÉ - Boisson traditionnelle.", targetKanji: ["茶"] },
  { word: "酒", meanings: ["Alcool"], readings: ["さけ"], mnemonicFr: "ALCOOL - Boisson fermentée.", targetKanji: ["酒"] },
  { word: "肉", meanings: ["Viande"], readings: ["にく"], mnemonicFr: "VIANDE - Chair animale.", targetKanji: ["肉"] },
  { word: "魚", meanings: ["Poisson"], readings: ["さかな"], mnemonicFr: "POISSON - Animal aquatique.", targetKanji: ["魚"] },
  { word: "野菜", meanings: ["Légumes"], readings: ["やさい"], mnemonicFr: "LÉGUMES - Plantes comestibles.", targetKanji: ["野", "菜"] },
  { word: "果物", meanings: ["Fruits"], readings: ["くだもの"], mnemonicFr: "FRUITS - Produits des arbres.", targetKanji: ["果", "物"] },

  // Transportation
  { word: "船", meanings: ["Bateau"], readings: ["ふね"], mnemonicFr: "BATEAU - Véhicule aquatique.", targetKanji: ["船"] },
  { word: "飛行機", meanings: ["Avion"], readings: ["ひこうき"], mnemonicFr: "AVION - Véhicule aérien.", targetKanji: ["飛", "行", "機"] },

  // Family
  { word: "父", meanings: ["Père"], readings: ["ちち"], mnemonicFr: "PÈRE - Parent masculin.", targetKanji: ["父"] },
  { word: "母", meanings: ["Mère"], readings: ["はは"], mnemonicFr: "MÈRE - Parent féminin.", targetKanji: ["母"] },
  { word: "兄", meanings: ["Grand frère"], readings: ["あに"], mnemonicFr: "GRAND FRÈRE - Frère aîné.", targetKanji: ["兄"] },
  { word: "姉", meanings: ["Grande sœur"], readings: ["あね"], mnemonicFr: "GRANDE SŒUR - Sœur aînée.", targetKanji: ["姉"] },
  { word: "弟", meanings: ["Petit frère"], readings: ["おとうと"], mnemonicFr: "PETIT FRÈRE - Frère cadet.", targetKanji: ["弟"] },
  { word: "妹", meanings: ["Petite sœur"], readings: ["いもうと"], mnemonicFr: "PETITE SŒUR - Sœur cadette.", targetKanji: ["妹"] },

  // More useful vocabulary
  { word: "声", meanings: ["Voix"], readings: ["こえ"], mnemonicFr: "VOIX - Son émis par la bouche.", targetKanji: ["声"] },
  { word: "音", meanings: ["Son"], readings: ["おと"], mnemonicFr: "SON - Bruit.", targetKanji: ["音"] },
  { word: "色", meanings: ["Couleur"], readings: ["いろ"], mnemonicFr: "COULEUR - Teinte.", targetKanji: ["色"] },
  { word: "形", meanings: ["Forme"], readings: ["かたち"], mnemonicFr: "FORME - Silhouette.", targetKanji: ["形"] },
  { word: "味", meanings: ["Goût"], readings: ["あじ"], mnemonicFr: "GOÛT - Saveur.", targetKanji: ["味"] },
  { word: "匂い", meanings: ["Odeur"], readings: ["におい"], mnemonicFr: "ODEUR - Parfum.", targetKanji: ["匂"] },

  // Buildings and structures
  { word: "建物", meanings: ["Bâtiment"], readings: ["たてもの"], mnemonicFr: "BÂTIMENT - Construction.", targetKanji: ["建", "物"] },
  { word: "建てる", meanings: ["Construire"], readings: ["たてる"], mnemonicFr: "CONSTRUIRE - Ériger.", targetKanji: ["建"] },
  { word: "建築", meanings: ["Architecture"], readings: ["けんちく"], mnemonicFr: "ARCHITECTURE - Art de construire.", targetKanji: ["建", "築"] },

  // More words
  { word: "石", meanings: ["Pierre"], readings: ["いし"], mnemonicFr: "PIERRE - Roche.", targetKanji: ["石"] },
  { word: "岩", meanings: ["Rocher"], readings: ["いわ"], mnemonicFr: "ROCHER - Grosse pierre.", targetKanji: ["岩"] },
  { word: "砂", meanings: ["Sable"], readings: ["すな"], mnemonicFr: "SABLE - Grains fins.", targetKanji: ["砂"] },
  { word: "土", meanings: ["Terre"], readings: ["つち"], mnemonicFr: "TERRE - Sol.", targetKanji: ["土"] },

  // Actions and states
  { word: "笑う", meanings: ["Rire"], readings: ["わらう"], mnemonicFr: "RIRE - Exprimer la joie.", targetKanji: ["笑"] },
  { word: "泣く", meanings: ["Pleurer"], readings: ["なく"], mnemonicFr: "PLEURER - Verser des larmes.", targetKanji: ["泣"] },
  { word: "怒る", meanings: ["Se fâcher"], readings: ["おこる"], mnemonicFr: "SE FÂCHER - Être en colère.", targetKanji: ["怒"] },
  { word: "驚く", meanings: ["Être surpris"], readings: ["おどろく"], mnemonicFr: "ÊTRE SURPRIS - Être étonné.", targetKanji: ["驚"] },

  // More everyday vocabulary
  { word: "窓", meanings: ["Fenêtre"], readings: ["まど"], mnemonicFr: "FENÊTRE - Ouverture dans le mur.", targetKanji: ["窓"] },
  { word: "壁", meanings: ["Mur"], readings: ["かべ"], mnemonicFr: "MUR - Paroi.", targetKanji: ["壁"] },
  { word: "床", meanings: ["Sol"], readings: ["ゆか"], mnemonicFr: "SOL - Surface de marche.", targetKanji: ["床"] },
  { word: "天井", meanings: ["Plafond"], readings: ["てんじょう"], mnemonicFr: "PLAFOND - Surface au-dessus.", targetKanji: ["天", "井"] },
  { word: "階段", meanings: ["Escalier"], readings: ["かいだん"], mnemonicFr: "ESCALIER - Marches.", targetKanji: ["階", "段"] },

  // Work and study
  { word: "仕", meanings: ["Servir"], readings: ["し"], mnemonicFr: "SERVIR - Travailler pour.", targetKanji: ["仕"] },
  { word: "働く", meanings: ["Travailler"], readings: ["はたらく"], mnemonicFr: "TRAVAILLER - Exercer une activité.", targetKanji: ["働"] },
  { word: "勤める", meanings: ["Être employé"], readings: ["つとめる"], mnemonicFr: "ÊTRE EMPLOYÉ - Travailler pour une entreprise.", targetKanji: ["勤"] },
  { word: "勤め", meanings: ["Emploi"], readings: ["つとめ"], mnemonicFr: "EMPLOI - Travail.", targetKanji: ["勤"] },

  // Numbers and counting
  { word: "両方", meanings: ["Les deux"], readings: ["りょうほう"], mnemonicFr: "LES DEUX - Les deux côtés.", targetKanji: ["両", "方"] },
  { word: "片方", meanings: ["Un côté"], readings: ["かたほう"], mnemonicFr: "UN CÔTÉ - Un seul des deux.", targetKanji: ["片", "方"] },
  { word: "一方", meanings: ["D'un côté"], readings: ["いっぽう"], mnemonicFr: "D'UN CÔTÉ - Par ailleurs.", targetKanji: ["一", "方"] },

  // Communication
  { word: "言う", meanings: ["Dire"], readings: ["いう"], mnemonicFr: "DIRE - Exprimer oralement.", targetKanji: ["言"] },
  { word: "話す", meanings: ["Parler"], readings: ["はなす"], mnemonicFr: "PARLER - Communiquer.", targetKanji: ["話"] },
  { word: "聞く", meanings: ["Écouter"], readings: ["きく"], mnemonicFr: "ÉCOUTER - Entendre.", targetKanji: ["聞"] },
  { word: "読む", meanings: ["Lire"], readings: ["よむ"], mnemonicFr: "LIRE - Déchiffrer un texte.", targetKanji: ["読"] },
  { word: "書く", meanings: ["Écrire"], readings: ["かく"], mnemonicFr: "ÉCRIRE - Tracer des caractères.", targetKanji: ["書"] },

  // More verbs
  { word: "買う", meanings: ["Acheter"], readings: ["かう"], mnemonicFr: "ACHETER - Acquérir en payant.", targetKanji: ["買"] },
  { word: "売る", meanings: ["Vendre"], readings: ["うる"], mnemonicFr: "VENDRE - Céder contre paiement.", targetKanji: ["売"] },
  { word: "作る", meanings: ["Faire"], readings: ["つくる"], mnemonicFr: "FAIRE - Créer.", targetKanji: ["作"] },
  { word: "使う", meanings: ["Utiliser"], readings: ["つかう"], mnemonicFr: "UTILISER - Se servir de.", targetKanji: ["使"] },
  { word: "持つ", meanings: ["Avoir"], readings: ["もつ"], mnemonicFr: "AVOIR - Posséder.", targetKanji: ["持"] },

  // Directions
  { word: "右", meanings: ["Droite"], readings: ["みぎ"], mnemonicFr: "DROITE - Côté droit.", targetKanji: ["右"] },
  { word: "左", meanings: ["Gauche"], readings: ["ひだり"], mnemonicFr: "GAUCHE - Côté gauche.", targetKanji: ["左"] },
  { word: "前", meanings: ["Devant"], readings: ["まえ"], mnemonicFr: "DEVANT - En face.", targetKanji: ["前"] },
  { word: "後ろ", meanings: ["Derrière"], readings: ["うしろ"], mnemonicFr: "DERRIÈRE - En arrière.", targetKanji: ["後"] },
  { word: "中", meanings: ["Intérieur"], readings: ["なか"], mnemonicFr: "INTÉRIEUR - Dedans.", targetKanji: ["中"] },
  { word: "外", meanings: ["Extérieur"], readings: ["そと"], mnemonicFr: "EXTÉRIEUR - Dehors.", targetKanji: ["外"] },

  // Size and quantity
  { word: "大きい", meanings: ["Grand"], readings: ["おおきい"], mnemonicFr: "GRAND - De grande taille.", targetKanji: ["大"] },
  { word: "小さい", meanings: ["Petit"], readings: ["ちいさい"], mnemonicFr: "PETIT - De petite taille.", targetKanji: ["小"] },
  { word: "長い", meanings: ["Long"], readings: ["ながい"], mnemonicFr: "LONG - De grande longueur.", targetKanji: ["長"] },
  { word: "短い", meanings: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT - De petite longueur.", targetKanji: ["短"] },
  { word: "高い", meanings: ["Haut"], readings: ["たかい"], mnemonicFr: "HAUT - Élevé.", targetKanji: ["高"] },
  { word: "低い", meanings: ["Bas"], readings: ["ひくい"], mnemonicFr: "BAS - Peu élevé.", targetKanji: ["低"] },
  { word: "広い", meanings: ["Large"], readings: ["ひろい"], mnemonicFr: "LARGE - Spacieux.", targetKanji: ["広"] },
  { word: "狭い", meanings: ["Étroit"], readings: ["せまい"], mnemonicFr: "ÉTROIT - Peu spacieux.", targetKanji: ["狭"] },

  // Temperature
  { word: "暑い", meanings: ["Chaud (temps)"], readings: ["あつい"], mnemonicFr: "CHAUD - Température élevée.", targetKanji: ["暑"] },
  { word: "寒い", meanings: ["Froid (temps)"], readings: ["さむい"], mnemonicFr: "FROID - Température basse.", targetKanji: ["寒"] },
  { word: "熱い", meanings: ["Chaud (objet)"], readings: ["あつい"], mnemonicFr: "CHAUD - Objet brûlant.", targetKanji: ["熱"] },
  { word: "冷たい", meanings: ["Froid (objet)"], readings: ["つめたい"], mnemonicFr: "FROID - Objet glacé.", targetKanji: ["冷"] },
  { word: "温かい", meanings: ["Tiède"], readings: ["あたたかい"], mnemonicFr: "TIÈDE - Agréablement chaud.", targetKanji: ["温"] },
  { word: "涼しい", meanings: ["Frais"], readings: ["すずしい"], mnemonicFr: "FRAIS - Agréablement froid.", targetKanji: ["涼"] },

  // More words
  { word: "速い", meanings: ["Rapide"], readings: ["はやい"], mnemonicFr: "RAPIDE - Qui va vite.", targetKanji: ["速"] },
  { word: "遅い", meanings: ["Lent"], readings: ["おそい"], mnemonicFr: "LENT - Qui va lentement.", targetKanji: ["遅"] },
  { word: "近い", meanings: ["Proche"], readings: ["ちかい"], mnemonicFr: "PROCHE - À courte distance.", targetKanji: ["近"] },
  { word: "遠い", meanings: ["Loin"], readings: ["とおい"], mnemonicFr: "LOIN - À grande distance.", targetKanji: ["遠"] },

  // Feelings
  { word: "楽しい", meanings: ["Amusant"], readings: ["たのしい"], mnemonicFr: "AMUSANT - Qui procure du plaisir.", targetKanji: ["楽"] },
  { word: "悲しい", meanings: ["Triste"], readings: ["かなしい"], mnemonicFr: "TRISTE - Qui cause de la peine.", targetKanji: ["悲"] },
  { word: "寂しい", meanings: ["Solitaire"], readings: ["さびしい"], mnemonicFr: "SOLITAIRE - Qui se sent seul.", targetKanji: ["寂"] },
  { word: "難しい", meanings: ["Difficile"], readings: ["むずかしい"], mnemonicFr: "DIFFICILE - Pas facile.", targetKanji: ["難"] },
  { word: "易しい", meanings: ["Facile"], readings: ["やさしい"], mnemonicFr: "FACILE - Pas difficile.", targetKanji: ["易"] },

  // Materials
  { word: "紙", meanings: ["Papier"], readings: ["かみ"], mnemonicFr: "PAPIER - Feuille mince.", targetKanji: ["紙"] },
  { word: "布", meanings: ["Tissu"], readings: ["ぬの"], mnemonicFr: "TISSU - Étoffe.", targetKanji: ["布"] },
  { word: "金", meanings: ["Or"], readings: ["きん"], mnemonicFr: "OR - Métal précieux.", targetKanji: ["金"] },
  { word: "銀", meanings: ["Argent"], readings: ["ぎん"], mnemonicFr: "ARGENT - Métal blanc.", targetKanji: ["銀"] },
  { word: "鉄", meanings: ["Fer"], readings: ["てつ"], mnemonicFr: "FER - Métal courant.", targetKanji: ["鉄"] },

  // Final batch
  { word: "光", meanings: ["Lumière"], readings: ["ひかり"], mnemonicFr: "LUMIÈRE - Clarté.", targetKanji: ["光"] },
  { word: "影", meanings: ["Ombre"], readings: ["かげ"], mnemonicFr: "OMBRE - Obscurité.", targetKanji: ["影"] },
  { word: "夢", meanings: ["Rêve"], readings: ["ゆめ"], mnemonicFr: "RÊVE - Vision pendant le sommeil.", targetKanji: ["夢"] },
  { word: "願い", meanings: ["Souhait"], readings: ["ねがい"], mnemonicFr: "SOUHAIT - Désir.", targetKanji: ["願"] },
  { word: "望み", meanings: ["Espoir"], readings: ["のぞみ"], mnemonicFr: "ESPOIR - Attente positive.", targetKanji: ["望"] },

  // Additional useful words
  { word: "問い", meanings: ["Question"], readings: ["とい"], mnemonicFr: "QUESTION - Interrogation.", targetKanji: ["問"] },
  { word: "答え", meanings: ["Réponse"], readings: ["こたえ"], mnemonicFr: "RÉPONSE - Solution.", targetKanji: ["答"] },
  { word: "意味", meanings: ["Signification"], readings: ["いみ"], mnemonicFr: "SIGNIFICATION - Sens.", targetKanji: ["意", "味"] },
  { word: "理由", meanings: ["Raison"], readings: ["りゆう"], mnemonicFr: "RAISON - Motif.", targetKanji: ["理", "由"] },
  { word: "結果", meanings: ["Résultat"], readings: ["けっか"], mnemonicFr: "RÉSULTAT - Conséquence.", targetKanji: ["結", "果"] },
];

async function main() {
  console.log("=== SEEDING FINAL VOCABULARY ===\n");

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

  for (const vocab of lastVocab) {
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
