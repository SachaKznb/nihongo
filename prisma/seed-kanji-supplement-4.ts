import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Additional N2 kanji for levels 36-50 with quality French storytelling mnemonics

const kanjiData = [
  // Level 36 - Business and work
  { character: "商", meaningsFr: ["Commerce", "Marchander"], readingsOn: ["ショウ"], readingsKun: ["あきな-う"], meaningMnemonicFr: "Un chapeau (亠) avec des bouches (口) qui négocient - le COMMERCE. Le marché de la rue Mouffetard, les cris des marchands.", readingMnemonicFr: "SHOU - le commerce qui 'sonne'.", levelId: 36 },
  { character: "売", meaningsFr: ["Vendre"], readingsOn: ["バイ"], readingsKun: ["う-る"], meaningMnemonicFr: "Un lettré (士) qui se sépare de quelque chose - VENDRE. Le brocanteur aux puces de Saint-Ouen.", readingMnemonicFr: "URU - 'Vendu!' à l'enchère.", levelId: 36 },
  { character: "買", meaningsFr: ["Acheter"], readingsOn: ["バイ"], readingsKun: ["か-う"], meaningMnemonicFr: "Un filet (罒) pour attraper des coquillages (貝) - ACHETER. Faire ses courses au marché.", readingMnemonicFr: "KAU - 'C'est combien?' on achète.", levelId: 36 },

  // Level 37 - Abstract concepts
  { character: "相", meaningsFr: ["Mutuel", "Aspect"], readingsOn: ["ソウ", "ショウ"], readingsKun: ["あい"], meaningMnemonicFr: "Un arbre (木) et un œil (目) - l'ASPECT mutuel. Se regarder dans les yeux, la relation réciproque.", readingMnemonicFr: "SOU - 'ensemble' on se regarde.", levelId: 37 },
  { character: "想", meaningsFr: ["Imaginer", "Pensée"], readingsOn: ["ソウ", "ソ"], readingsKun: [], meaningMnemonicFr: "L'aspect (相) dans le cœur (心) - IMAGINER. Rêver éveillé, laisser vagabonder ses pensées.", readingMnemonicFr: "SOU - 'songer' à quelque chose.", levelId: 37 },
  { character: "感", meaningsFr: ["Sentiment", "Ressentir"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Tout (咸) dans le cœur (心) - le SENTIMENT. L'émotion qui envahit tout l'être.", readingMnemonicFr: "KAN - le sentiment qui 'touche'.", levelId: 37 },

  // Level 38 - Society
  { character: "社", meaningsFr: ["Société", "Entreprise"], readingsOn: ["シャ"], readingsKun: ["やしろ"], meaningMnemonicFr: "L'autel (示) de la terre (土) - la SOCIÉTÉ. Le sanctuaire où la communauté se rassemble.", readingMnemonicFr: "SHA - la 'société' qui unit.", levelId: 38 },
  { character: "団", meaningsFr: ["Groupe", "Association"], readingsOn: ["ダン", "トン"], readingsKun: [], meaningMnemonicFr: "Un enclos (囗) avec un spécialiste - le GROUPE. L'équipe soudée, le cercle d'amis.", readingMnemonicFr: "DAN - le groupe 'dans' l'enclos.", levelId: 38 },
  { character: "組", meaningsFr: ["Groupe", "Assembler"], readingsOn: ["ソ"], readingsKun: ["く-む", "くみ"], meaningMnemonicFr: "Un fil (糸) avec un amas (且) - ASSEMBLER. Tisser des liens, former une équipe.", readingMnemonicFr: "KUMU - 'on combine' ensemble.", levelId: 38 },

  // Level 39 - Time and seasons
  { character: "季", meaningsFr: ["Saison"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le riz (禾) avec un enfant (子) - la SAISON. Le cycle des récoltes qui rythme l'année.", readingMnemonicFr: "KI - la saison qui 'revient'.", levelId: 39 },
  { character: "春", meaningsFr: ["Printemps"], readingsOn: ["シュン"], readingsKun: ["はる"], meaningMnemonicFr: "Trois personnes (三人) avec le soleil (日) - le PRINTEMPS. Les gens qui sortent au soleil, les cerisiers en fleurs.", readingMnemonicFr: "HARU - le printemps qui 'arrive'.", levelId: 39 },
  { character: "夏", meaningsFr: ["Été"], readingsOn: ["カ", "ゲ"], readingsKun: ["なつ"], meaningMnemonicFr: "Une tête (頁) qui danse sous le soleil - l'ÉTÉ. La chaleur, les vacances à la plage.", readingMnemonicFr: "NATSU - l'été qui 'chauffe'.", levelId: 39 },

  // Level 40 - More seasons and time
  { character: "秋", meaningsFr: ["Automne"], readingsOn: ["シュウ"], readingsKun: ["あき"], meaningMnemonicFr: "Le riz (禾) avec le feu (火) - l'AUTOMNE. Les récoltes dorées, les feuilles qui brûlent de couleurs.", readingMnemonicFr: "AKI - l'automne qui 'dore'.", levelId: 40 },
  { character: "冬", meaningsFr: ["Hiver"], readingsOn: ["トウ"], readingsKun: ["ふゆ"], meaningMnemonicFr: "La glace qui tombe en bas - l'HIVER. Le froid qui mord, la neige qui recouvre tout.", readingMnemonicFr: "FUYU - l'hiver qui 'gèle'.", levelId: 40 },
  { character: "暖", meaningsFr: ["Chaud", "Chaleureux"], readingsOn: ["ダン"], readingsKun: ["あたた-かい"], meaningMnemonicFr: "Le soleil (日) avec l'ami (爰) - CHAUD. La chaleur réconfortante de l'amitié.", readingMnemonicFr: "ATATAKAI - la chaleur qui 'enveloppe'.", levelId: 40 },

  // Level 41 - Health
  { character: "医", meaningsFr: ["Médecine", "Médecin"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "Une flèche (矢) dans un enclos (匚) - la MÉDECINE. Le médecin qui vise juste pour guérir.", readingMnemonicFr: "I - le médecin qui 'aide'.", levelId: 41 },
  { character: "病", meaningsFr: ["Maladie", "Malade"], readingsOn: ["ビョウ", "ヘイ"], readingsKun: ["やまい", "や-む"], meaningMnemonicFr: "Le lit (疒) avec le troisième (丙) patient - la MALADIE. Le repos forcé au lit.", readingMnemonicFr: "BYOU - la maladie qui 'pèse'.", levelId: 41 },
  { character: "痛", meaningsFr: ["Douleur", "Avoir mal"], readingsOn: ["ツウ"], readingsKun: ["いた-い", "いた-む"], meaningMnemonicFr: "Le lit (疒) avec le passage (甬) de la douleur - DOULEUR. La souffrance qui traverse le corps.", readingMnemonicFr: "ITAI - 'Aïe!' ça fait mal.", levelId: 41 },

  // Level 42 - Body parts
  { character: "頭", meaningsFr: ["Tête", "Chef"], readingsOn: ["トウ", "ズ"], readingsKun: ["あたま", "かしら"], meaningMnemonicFr: "Un haricot (豆) avec une page (頁) - la TÊTE. Le siège de la pensée, le chef du corps.", readingMnemonicFr: "ATAMA - la tête qui 'pense'.", levelId: 42 },
  { character: "首", meaningsFr: ["Cou", "Chef"], readingsOn: ["シュ"], readingsKun: ["くび"], meaningMnemonicFr: "Le COU qui relie la tête au corps. Le point vulnérable, le chef qui guide.", readingMnemonicFr: "KUBI - le cou qui 'tourne'.", levelId: 42 },
  { character: "顔", meaningsFr: ["Visage", "Face"], readingsOn: ["ガン"], readingsKun: ["かお"], meaningMnemonicFr: "L'origine (彦) avec une page (頁) - le VISAGE. Le miroir de l'âme, l'identité visible.", readingMnemonicFr: "KAO - le visage qui 'parle'.", levelId: 42 },

  // Level 43 - More body
  { character: "胸", meaningsFr: ["Poitrine", "Cœur"], readingsOn: ["キョウ"], readingsKun: ["むね"], meaningMnemonicFr: "La chair (月) avec le mal (凶) potentiel - la POITRINE. Le coffre qui protège le cœur.", readingMnemonicFr: "MUNE - la poitrine qui 'bat'.", levelId: 43 },
  { character: "腹", meaningsFr: ["Ventre", "Abdomen"], readingsOn: ["フク"], readingsKun: ["はら"], meaningMnemonicFr: "La chair (月) qui se replie (复) - le VENTRE. Le centre de gravité du corps.", readingMnemonicFr: "HARA - le ventre qui 'gronde'.", levelId: 43 },
  { character: "腰", meaningsFr: ["Hanches", "Taille"], readingsOn: ["ヨウ"], readingsKun: ["こし"], meaningMnemonicFr: "La chair (月) avec ce qui est important (要) - les HANCHES. Le pivot du corps.", readingMnemonicFr: "KOSHI - les hanches qui 'pivotent'.", levelId: 43 },

  // Level 44 - Senses
  { character: "声", meaningsFr: ["Voix", "Son"], readingsOn: ["セイ", "ショウ"], readingsKun: ["こえ"], meaningMnemonicFr: "Le lettré (士) avec l'oreille qui écoute - la VOIX. Le son qui porte l'âme.", readingMnemonicFr: "KOE - la voix qui 'porte'.", levelId: 44 },
  { character: "音", meaningsFr: ["Son", "Bruit"], readingsOn: ["オン", "イン"], readingsKun: ["おと", "ね"], meaningMnemonicFr: "Le jour (日) qui se lève (立) - le SON. Le premier bruit du matin.", readingMnemonicFr: "OTO - le son qui 'résonne'.", levelId: 44 },
  { character: "味", meaningsFr: ["Goût", "Saveur"], readingsOn: ["ミ"], readingsKun: ["あじ"], meaningMnemonicFr: "Une bouche (口) qui n'a pas encore (未) goûté - le GOÛT. La curiosité du palais.", readingMnemonicFr: "AJI - le goût qui 'délecte'.", levelId: 44 },

  // Level 45 - Colors
  { character: "色", meaningsFr: ["Couleur", "Teinte"], readingsOn: ["ショク", "シキ"], readingsKun: ["いろ"], meaningMnemonicFr: "Une personne agenouillée avec un sceau - la COULEUR. Les nuances qui colorent la vie.", readingMnemonicFr: "IRO - la couleur qui 'éclaire'.", levelId: 45 },
  { character: "赤", meaningsFr: ["Rouge"], readingsOn: ["セキ", "シャク"], readingsKun: ["あか"], meaningMnemonicFr: "De la terre (土) avec du feu (火) - ROUGE. La couleur du sang, de la passion.", readingMnemonicFr: "AKA - le rouge qui 'brûle'.", levelId: 45 },
  { character: "青", meaningsFr: ["Bleu", "Vert"], readingsOn: ["セイ", "ショウ"], readingsKun: ["あお"], meaningMnemonicFr: "La vie (生) avec la lune (月) - BLEU. Le ciel, la mer, la jeunesse.", readingMnemonicFr: "AO - le bleu qui 'apaise'.", levelId: 45 },

  // Level 46 - More colors
  { character: "白", meaningsFr: ["Blanc"], readingsOn: ["ハク", "ビャク"], readingsKun: ["しろ"], meaningMnemonicFr: "Le soleil qui brille pur - BLANC. La pureté, la neige immaculée.", readingMnemonicFr: "SHIRO - le blanc qui 'brille'.", levelId: 46 },
  { character: "黒", meaningsFr: ["Noir"], readingsOn: ["コク"], readingsKun: ["くろ"], meaningMnemonicFr: "La terre (里) avec le feu (灬) éteint - NOIR. L'absence de lumière, le mystère.", readingMnemonicFr: "KURO - le noir qui 'absorbe'.", levelId: 46 },
  { character: "黄", meaningsFr: ["Jaune"], readingsOn: ["コウ", "オウ"], readingsKun: ["き"], meaningMnemonicFr: "Le champ (田) mûr avec les jambes - JAUNE. La couleur du blé, du soleil.", readingMnemonicFr: "KI - le jaune qui 'dore'.", levelId: 46 },

  // Level 47 - Shapes and sizes
  { character: "丸", meaningsFr: ["Rond", "Cercle"], readingsOn: ["ガン"], readingsKun: ["まる"], meaningMnemonicFr: "Neuf (九) avec un point - ROND. La perfection du cercle, la lune pleine.", readingMnemonicFr: "MARU - rond comme une 'balle'.", levelId: 47 },
  { character: "角", meaningsFr: ["Angle", "Corne"], readingsOn: ["カク"], readingsKun: ["かど", "つの"], meaningMnemonicFr: "La CORNE avec ses angles pointus. Le coin d'une rue, la pointe d'un argument.", readingMnemonicFr: "KADO - l'angle qui 'coupe'.", levelId: 47 },
  { character: "線", meaningsFr: ["Ligne", "Fil"], readingsOn: ["セン"], readingsKun: [], meaningMnemonicFr: "Un fil (糸) avec une source (泉) - la LIGNE. Le trait qui relie deux points.", readingMnemonicFr: "SEN - la ligne qui 'trace'.", levelId: 47 },

  // Level 48 - Quantities
  { character: "数", meaningsFr: ["Nombre", "Compter"], readingsOn: ["スウ"], readingsKun: ["かず", "かぞ-える"], meaningMnemonicFr: "Du riz (米) avec une femme (女) qui frappe (攵) - le NOMBRE. Compter les grains un par un.", readingMnemonicFr: "KAZU - le nombre qui 'compte'.", levelId: 48 },
  { character: "量", meaningsFr: ["Quantité", "Mesurer"], readingsOn: ["リョウ"], readingsKun: ["はか-る"], meaningMnemonicFr: "Le jour (日) avec le village (里) - la QUANTITÉ. Mesurer l'étendue du domaine.", readingMnemonicFr: "RYOU - la quantité qui 'pèse'.", levelId: 48 },
  { character: "倍", meaningsFr: ["Double", "Fois"], readingsOn: ["バイ"], readingsKun: [], meaningMnemonicFr: "Une personne (亻) avec un autre (咅) - DOUBLE. Multiplier par deux.", readingMnemonicFr: "BAI - le double qui 'grandit'.", levelId: 48 },

  // Level 49 - Actions
  { character: "落", meaningsFr: ["Tomber", "Laisser tomber"], readingsOn: ["ラク"], readingsKun: ["お-ちる", "お-とす"], meaningMnemonicFr: "Une plante (艹) avec l'eau (氵) et chaque (各) - TOMBER. Les feuilles qui tombent en automne.", readingMnemonicFr: "OCHIRU - 'Oups!' ça tombe.", levelId: 49 },
  { character: "届", meaningsFr: ["Atteindre", "Livrer"], readingsOn: [], readingsKun: ["とど-く", "とど-ける"], meaningMnemonicFr: "Un corps (尸) qui pousse (由) - LIVRER. Le colis qui arrive enfin à destination.", readingMnemonicFr: "TODOKU - 'Tout doux' la livraison.", levelId: 49 },
  { character: "持", meaningsFr: ["Tenir", "Avoir"], readingsOn: ["ジ"], readingsKun: ["も-つ"], meaningMnemonicFr: "Une main (扌) qui garde un temple (寺) - TENIR. Garder précieusement ce qu'on a.", readingMnemonicFr: "MOTSU - 'Je tiens!' fermement.", levelId: 49 },

  // Level 50 - Final concepts
  { character: "終", meaningsFr: ["Fin", "Terminé"], readingsOn: ["シュウ"], readingsKun: ["お-わる"], meaningMnemonicFr: "Un fil (糸) avec l'hiver (冬) - la FIN. La conclusion d'une histoire.", readingMnemonicFr: "OWARU - 'C'est fini!' le rideau tombe.", levelId: 50 },
  { character: "始", meaningsFr: ["Début", "Commencer"], readingsOn: ["シ"], readingsKun: ["はじ-める", "はじ-まる"], meaningMnemonicFr: "Une femme (女) avec un enclos (台) - le DÉBUT. Le commencement d'une nouvelle vie.", readingMnemonicFr: "HAJIMERU - 'On commence!' c'est parti.", levelId: 50 },
  { character: "中", meaningsFr: ["Milieu", "Intérieur"], readingsOn: ["チュウ"], readingsKun: ["なか"], meaningMnemonicFr: "Une ligne qui traverse un rectangle - le MILIEU. Le centre de tout, l'équilibre parfait.", readingMnemonicFr: "NAKA - le milieu qui 'équilibre'.", levelId: 50 },
];

async function main() {
  console.log("Seeding additional kanji (part 4 - levels 36-50)...");

  for (const kanji of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonicFr,
        readingMnemonicFr: kanji.readingMnemonicFr,
        levelId: kanji.levelId,
      },
      create: kanji,
    });
  }

  console.log(`Seeded ${kanjiData.length} additional kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
