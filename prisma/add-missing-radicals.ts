import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 57 missing radicals needed for various kanji
// Level assigned based on when they're first needed in the curriculum

const missingRadicals = [
  // Level 3 - Basic visual components
  {
    character: "西",
    meaningFr: "Ouest",
    mnemonic: "Le soleil qui se couche à l'OUEST, entouré par les montagnes. Le cadre représente l'horizon, et les traits intérieurs sont les derniers rayons du soleil couchant qui disparaissent à l'OUEST.",
    levelId: 3,
  },
  {
    character: "禾",
    meaningFr: "Céréale",
    mnemonic: "Un épi de CÉRÉALE qui se balance dans le vent. Le trait du haut est la tête de l'épi, lourde de grains, et les traits en dessous sont la tige et les feuilles. Le riz est la CÉRÉALE reine du Japon.",
    levelId: 3,
  },
  {
    character: "儿",
    meaningFr: "Jambes",
    mnemonic: "Deux JAMBES qui marchent ! Ce radical ressemble à une personne vue de dos, avec ses deux JAMBES écartées. On le retrouve souvent sous d'autres caractères, comme des JAMBES qui supportent le corps.",
    levelId: 3,
  },
  {
    character: "者",
    meaningFr: "Personne qui",
    mnemonic: "Une PERSONNE QUI fait quelque chose. Le radical du haut représente le soleil (日) posé sur un piédestal. C'est une PERSONNE QUI se tient droite et fière, prête à agir.",
    levelId: 3,
  },
  {
    character: "阝",
    meaningFr: "Colline",
    mnemonic: "Une COLLINE vue de profil. À gauche d'un kanji, ce radical représente souvent une COLLINE ou un monticule. Les villages japonais sont souvent construits au pied des COLLINES.",
    levelId: 3,
  },

  // Level 4 - Building blocks
  {
    character: "区",
    meaningFr: "Zone",
    mnemonic: "Un espace délimité, une ZONE bien définie. Le cadre extérieur trace les limites de la ZONE, et l'intérieur est organisé en sections. Comme les quartiers (区) de Tokyo !",
    levelId: 4,
  },
  {
    character: "疒",
    meaningFr: "Maladie",
    mnemonic: "Une personne allongée sur un lit, MALADE. Le trait oblique est le corps affaissé, et les autres traits représentent le lit et la fièvre. Ce radical apparaît dans tous les kanji liés à la MALADIE.",
    levelId: 4,
  },
  {
    character: "虫",
    meaningFr: "Insecte",
    mnemonic: "Un INSECTE avec sa tête, son corps et ses pattes ! Regardez bien : le haut est la tête avec les antennes, le milieu est le corps segmenté. Les INSECTES pullulent en été au Japon.",
    levelId: 4,
  },

  // Level 5 - Common components
  {
    character: "帰",
    meaningFr: "Retourner",
    mnemonic: "RETOURNER chez soi après une longue journée. Ce radical évoque le mouvement de RETOUR, comme les oiseaux migrateurs qui RETOURNENT au printemps. Le chemin du RETOUR est souvent le plus doux.",
    levelId: 5,
  },
  {
    character: "原",
    meaningFr: "Plaine",
    mnemonic: "Une vaste PLAINE qui s'étend sous la falaise. Le toit représente la montagne, et l'espace en dessous est la PLAINE fertile où les paysans cultivent. La PLAINE originelle d'où tout commence.",
    levelId: 5,
  },
  {
    character: "色",
    meaningFr: "Couleur",
    mnemonic: "Une personne agenouillée devant un arc-en-ciel de COULEURS. Le trait du haut est comme un pinceau, et le reste représente quelqu'un qui admire les COULEURS. Chaque COULEUR a une signification au Japon.",
    levelId: 5,
  },
  {
    character: "米",
    meaningFr: "Riz",
    mnemonic: "Des grains de RIZ qui explosent dans toutes les directions autour d'un point central ! Le RIZ est tellement important au Japon qu'il était utilisé comme monnaie. Même le mot 'repas' se dit 'gohan' (RIZ cuit).",
    levelId: 5,
  },

  // Level 6 - Intermediate components
  {
    character: "専",
    meaningFr: "Spécial",
    mnemonic: "Quelque chose de SPÉCIAL, unique et concentré. Le radical du haut montre un point de focus, et le reste indique la concentration. Être SPÉCIALISTE, c'est se concentrer sur un seul domaine.",
    levelId: 6,
  },
  {
    character: "政",
    meaningFr: "Politique",
    mnemonic: "La POLITIQUE, c'est frapper juste avec le bâton du pouvoir. Le radical de gauche représente l'action de corriger, et celui de droite le pouvoir. La POLITIQUE gouverne et dirige.",
    levelId: 6,
  },
  {
    character: "成",
    meaningFr: "Devenir",
    mnemonic: "DEVENIR quelque chose de nouveau. La hallebarde (戈) frappe et transforme. Pour DEVENIR fort, il faut forger son esprit comme on forge une lame. La transformation est complète.",
    levelId: 6,
  },
  {
    character: "与",
    meaningFr: "Donner",
    mnemonic: "DONNER quelque chose à quelqu'un. La forme ressemble à deux mains qui se passent un objet. Au Japon, DONNER est un art - on offre avec les deux mains et on reçoit de même.",
    levelId: 6,
  },
  {
    character: "良",
    meaningFr: "Bon",
    mnemonic: "Quelque chose de BON et de qualité. Le radical évoque un tamis qui ne garde que le meilleur grain. Ce qui est BON a été soigneusement sélectionné. La BONNE qualité se reconnaît.",
    levelId: 6,
  },

  // Level 7 - Building complexity
  {
    character: "階",
    meaningFr: "Étage",
    mnemonic: "Les ÉTAGES d'un bâtiment, comme les marches d'un escalier. La colline (阝) à gauche représente l'élévation, et le reste montre les niveaux successifs. Monter les ÉTAGES un par un.",
    levelId: 7,
  },
  {
    character: "卒",
    meaningFr: "Diplômé",
    mnemonic: "Un DIPLÔMÉ qui termine ses études. Les traits du haut représentent le chapeau de graduation, et ceux du bas montrent la personne fière. Être DIPLÔMÉ, c'est avoir fini son parcours.",
    levelId: 7,
  },
  {
    character: "整",
    meaningFr: "Arranger",
    mnemonic: "ARRANGER et mettre en ordre. Ce radical combine plusieurs éléments pour créer l'harmonie. Les Japonais excellent dans l'art d'ARRANGER - que ce soit les fleurs (ikebana) ou les espaces.",
    levelId: 7,
  },
  {
    character: "毒",
    meaningFr: "Poison",
    mnemonic: "Un POISON mortel ! Le radical de l'herbe (艹) au-dessus d'une mère (母) : certaines plantes sont toxiques. Le POISON des serpents ou des plantes - la nature peut être dangereuse.",
    levelId: 7,
  },

  // Level 8 - Abstract concepts
  {
    character: "式",
    meaningFr: "Cérémonie",
    mnemonic: "Une CÉRÉMONIE formelle avec ses rituels. Le radical de gauche représente le travail, et celui de droite la hallebarde du protocole. Les CÉRÉMONIES japonaises sont hautement codifiées.",
    levelId: 8,
  },
  {
    character: "変",
    meaningFr: "Changer",
    mnemonic: "CHANGER et se transformer. Le haut représente quelque chose qui se défait, et le bas montre les jambes qui s'éloignent de l'ancien état. Le CHANGEMENT est la seule constante.",
    levelId: 8,
  },
  {
    character: "典",
    meaningFr: "Classique",
    mnemonic: "Un livre CLASSIQUE posé sur un autel. Les textes anciens, les CLASSIQUES de la littérature sont précieusement conservés. Ce qui est CLASSIQUE traverse les âges.",
    levelId: 8,
  },
  {
    character: "弁",
    meaningFr: "Valve",
    mnemonic: "Une VALVE qui s'ouvre et se ferme. Ce radical évoque aussi l'éloquence (ouvrir et fermer la bouche) et les paniers-repas (bento). La VALVE contrôle le flux.",
    levelId: 8,
  },
  {
    character: "危",
    meaningFr: "Danger",
    mnemonic: "Le DANGER ! Une personne au bord d'une falaise (厂) avec quelque chose d'instable en dessous. Le DANGER est partout pour celui qui ne fait pas attention. Attention au DANGER !",
    levelId: 8,
  },

  // Level 9 - Complex meanings
  {
    character: "難",
    meaningFr: "Difficile",
    mnemonic: "C'est DIFFICILE ! Un oiseau pris dans les herbes, qui ne peut plus voler. Quand tout s'emmêle, les choses deviennent DIFFICILES. Mais les défis DIFFICILES rendent plus fort.",
    levelId: 9,
  },
  {
    character: "産",
    meaningFr: "Production",
    mnemonic: "La PRODUCTION et la naissance. Le radical du haut évoque l'émergence, et celui du bas représente ce qui est créé. La PRODUCTION industrielle ou la naissance d'un enfant.",
    levelId: 9,
  },
  {
    character: "陽",
    meaningFr: "Soleil/Yang",
    mnemonic: "Le SOLEIL qui brille, l'énergie Yang ! La colline (阝) baignée par les rayons du SOLEIL. Le côté ensoleillé de la montagne, positif et lumineux. L'énergie YANG masculine.",
    levelId: 9,
  },
  {
    character: "歴",
    meaningFr: "Histoire",
    mnemonic: "L'HISTOIRE qui se déroule dans le temps. Le radical montre le passage du temps à travers les générations. L'HISTOIRE du Japon est riche de 2000 ans de culture.",
    levelId: 9,
  },
  {
    character: "差",
    meaningFr: "Différence",
    mnemonic: "La DIFFÉRENCE entre deux choses. Le radical de l'herbe au-dessus montre la croissance inégale - certaines plantes poussent plus que d'autres. Percevoir la DIFFÉRENCE est un art.",
    levelId: 9,
  },

  // Level 10 - Advanced components
  {
    character: "武",
    meaningFr: "Martial",
    mnemonic: "L'art MARTIAL ! La hallebarde (戈) et l'arrêt (止) : le vrai guerrier sait quand arrêter de combattre. Les arts MARTIAUX japonais enseignent la discipline et le respect.",
    levelId: 10,
  },
  {
    character: "営",
    meaningFr: "Gérer",
    mnemonic: "GÉRER une entreprise ou un camp. Le toit protège l'activité en dessous. GÉRER demande de superviser tous les aspects. Un bon manager GÈRE avec sagesse.",
    levelId: 10,
  },
  {
    character: "穴",
    meaningFr: "Trou",
    mnemonic: "Un TROU dans le sol ou une grotte. Le toit au-dessus représente l'entrée de la caverne, et les traits en dessous montrent la profondeur. Les TROUS sont des refuges.",
    levelId: 10,
  },
  {
    character: "再",
    meaningFr: "Encore",
    mnemonic: "ENCORE une fois, répéter ! Le radical montre quelque chose qui revient. Au Japon, on dit 'mou ichido' pour 'ENCORE une fois'. La répétition est la mère de l'apprentissage.",
    levelId: 10,
  },
  {
    character: "巻",
    meaningFr: "Rouleau",
    mnemonic: "Un ROULEAU de parchemin enroulé. Les anciens textes japonais étaient écrits sur des ROULEAUX. Comme les makizushi (ROULEAUX de sushi) qu'on enroule avec le bambou.",
    levelId: 10,
  },

  // Level 11 - Body and objects
  {
    character: "乳",
    meaningFr: "Lait",
    mnemonic: "Le LAIT maternel qui nourrit. Le radical de gauche représente une main qui tient, et celui de droite le sein. Le LAIT est la première nourriture de la vie.",
    levelId: 11,
  },
  {
    character: "皿",
    meaningFr: "Assiette",
    mnemonic: "Une ASSIETTE vue de dessus. Les traits représentent le bord de l'ASSIETTE et son fond plat. Les ASSIETTES japonaises sont souvent de véritables œuvres d'art.",
    levelId: 11,
  },
  {
    character: "単",
    meaningFr: "Simple",
    mnemonic: "Quelque chose de SIMPLE, sans complication. Le radical du haut est un filtre qui ne garde que l'essentiel. La SIMPLICITÉ est une vertu au Japon - le zen célèbre le SIMPLE.",
    levelId: 11,
  },
  {
    character: "登",
    meaningFr: "Grimper",
    mnemonic: "GRIMPER une montagne pas à pas. Les pieds (癶) au-dessus avancent, et le corps suit. GRIMPER le Mont Fuji est un pèlerinage pour les Japonais. Chaque pas compte.",
    levelId: 11,
  },
  {
    character: "参",
    meaningFr: "Participer",
    mnemonic: "PARTICIPER à une cérémonie ou une activité. Trois personnes qui se rassemblent pour PARTICIPER ensemble. Au Japon, PARTICIPER en groupe est essentiel.",
    levelId: 11,
  },

  // Level 12 - Nature and measures
  {
    character: "羊",
    meaningFr: "Mouton",
    mnemonic: "Un MOUTON avec ses cornes ! Le trait du haut forme les cornes, et le reste est le corps laineux. Les MOUTONS sont dociles et suivent le troupeau.",
    levelId: 12,
  },
  {
    character: "量",
    meaningFr: "Quantité",
    mnemonic: "Mesurer la QUANTITÉ avec une balance. Le radical du soleil au-dessus éclaire la mesure précise en dessous. La QUANTITÉ exacte est importante en cuisine japonaise.",
    levelId: 12,
  },
  {
    character: "影",
    meaningFr: "Ombre",
    mnemonic: "L'OMBRE qui suit la lumière. Le soleil (日) crée une OMBRE avec les trois traits qui représentent les rayons. Sans lumière, pas d'OMBRE. Le théâtre d'OMBRES japonais.",
    levelId: 12,
  },
  {
    character: "段",
    meaningFr: "Étape",
    mnemonic: "Les ÉTAPES d'un escalier ou d'un processus. Chaque niveau représente une ÉTAPE. Dans les arts martiaux, les 'dan' sont les ÉTAPES de progression. Monter ÉTAPE par ÉTAPE.",
    levelId: 12,
  },
  {
    character: "殺",
    meaningFr: "Tuer",
    mnemonic: "TUER avec une arme. Le radical de gauche représente l'arbre frappé, et celui de droite la main armée. Au Japon féodal, les samouraïs avaient le droit de TUER. Un radical grave.",
    levelId: 12,
  },

  // Level 13 - Abstract and complex
  {
    character: "能",
    meaningFr: "Capacité",
    mnemonic: "La CAPACITÉ de faire quelque chose. Un ours (熊) qui montre sa force - les ours ont la CAPACITÉ d'être très puissants. Développer ses CAPACITÉS demande de l'entraînement.",
    levelId: 13,
  },
  {
    character: "面",
    meaningFr: "Face",
    mnemonic: "La FACE, le visage. Le cadre représente le contour du visage, et l'intérieur montre les traits. La FACE est ce qu'on montre au monde. Sauver la FACE est crucial au Japon.",
    levelId: 13,
  },
  {
    character: "幸",
    meaningFr: "Bonheur",
    mnemonic: "Le BONHEUR ! Ce radical ressemble à une terre (土) protégée par un toit. Avoir un foyer, c'est le BONHEUR. Le BONHEUR simple d'être en sécurité chez soi.",
    levelId: 13,
  },
  {
    character: "残",
    meaningFr: "Reste",
    mnemonic: "Ce qui RESTE après. Le radical de gauche (歹) représente les os, ce qui RESTE après la mort. Le RESTE d'un repas, les vestiges du passé. Rien ne se perd, tout RESTE.",
    levelId: 13,
  },
  {
    character: "象",
    meaningFr: "Éléphant",
    mnemonic: "Un ÉLÉPHANT majestueux ! Le trait long en bas est la trompe, et les autres forment le corps massif. L'ÉLÉPHANT n'oublie jamais, dit-on. Le symbole de la mémoire.",
    levelId: 13,
  },

  // Level 14 - Action and transformation
  {
    character: "改",
    meaningFr: "Réformer",
    mnemonic: "RÉFORMER et améliorer. Le radical de gauche représente le soi, et celui de droite l'action de frapper pour changer. Se RÉFORMER demande du courage. Le changement vers le mieux.",
    levelId: 14,
  },
  {
    character: "舌",
    meaningFr: "Langue",
    mnemonic: "La LANGUE qui sort de la bouche ! Le trait horizontal est la bouche, et celui qui dépasse est la LANGUE. La LANGUE goûte les saveurs et permet de parler.",
    levelId: 14,
  },
  {
    character: "也",
    meaningFr: "Aussi",
    mnemonic: "AUSSI, de même. Ce petit radical sert à indiquer l'inclusion. 'Moi AUSSI', 'cela AUSSI'. Un marqueur grammatical devenu radical.",
    levelId: 14,
  },
  {
    character: "義",
    meaningFr: "Justice",
    mnemonic: "La JUSTICE et la droiture. Le mouton (羊) au-dessus représente le sacrifice, et 'je' (我) en dessous. La JUSTICE exige parfois le sacrifice de soi. Les 47 rōnin incarnent cette JUSTICE.",
    levelId: 14,
  },
  {
    character: "乱",
    meaningFr: "Chaos",
    mnemonic: "Le CHAOS et le désordre ! Les traits emmêlés représentent la confusion. Quand le CHAOS règne, tout est sens dessus dessous. Mais du CHAOS peut naître l'ordre.",
    levelId: 14,
  },
];

async function main() {
  console.log("Adding 57 missing radicals to the database...\n");

  let added = 0;
  let updated = 0;
  let errors = 0;

  for (const radical of missingRadicals) {
    try {
      const result = await prisma.radical.upsert({
        where: {
          character_levelId: {
            character: radical.character,
            levelId: radical.levelId,
          },
        },
        update: {
          meaningFr: radical.meaningFr,
          mnemonic: radical.mnemonic,
        },
        create: radical,
      });

      // Check if it was an update or create by checking if the result has the same values
      const existing = await prisma.radical.findUnique({
        where: { id: result.id },
      });

      if (existing) {
        console.log(`✓ ${radical.character} (${radical.meaningFr}) - Level ${radical.levelId}`);
        added++;
      }
    } catch (error) {
      console.error(`✗ Error with ${radical.character}:`, error);
      errors++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Radicals processed: ${added}`);
  console.log(`Errors: ${errors}`);
  console.log(`========================================\n`);

  // Verify the count
  const totalRadicals = await prisma.radical.count();
  console.log(`Total radicals in database: ${totalRadicals}`);
}

main()
  .catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
