import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Radicals for levels 51-60 with French storytelling mnemonics
const radicalData = [
  // Level 51
  { character: "麻", meaningFr: "Chanvre", mnemonic: "La plante du CHANVRE qui pousse sous l'abri, tissée en corde depuis des millénaires.", levelId: 51 },
  { character: "黄", meaningFr: "Jaune", mnemonic: "La couleur JAUNE du soleil d'automne sur les champs de blé mûr.", levelId: 51 },
  { character: "鹿", meaningFr: "Cerf", mnemonic: "Le CERF majestueux avec ses bois qui court dans la forêt.", levelId: 51 },
  { character: "麦", meaningFr: "Blé", mnemonic: "Le BLÉ doré qui nourrit les villages, ses épis balancés par le vent.", levelId: 51 },
  { character: "亀", meaningFr: "Tortue", mnemonic: "La TORTUE sage qui porte sa maison sur le dos.", levelId: 51 },
  { character: "齿", meaningFr: "Dent", mnemonic: "Les DENTS alignées dans la bouche, prêtes à mordre.", levelId: 51 },

  // Level 52
  { character: "鼓", meaningFr: "Tambour", mnemonic: "Le TAMBOUR qui résonne, appelant les guerriers au combat.", levelId: 52 },
  { character: "鼠", meaningFr: "Rat", mnemonic: "Le RAT rusé qui se faufile dans l'ombre.", levelId: 52 },
  { character: "鼻", meaningFr: "Nez", mnemonic: "Le NEZ qui sent les parfums et les dangers.", levelId: 52 },
  { character: "齊", meaningFr: "Égal", mnemonic: "Tout est ÉGAL, aligné parfaitement comme des épis de riz.", levelId: 52 },
  { character: "龍", meaningFr: "Dragon", mnemonic: "Le DRAGON mythique qui vole dans les nuages et crache le feu.", levelId: 52 },
  { character: "龟", meaningFr: "Tortue (simplifié)", mnemonic: "La TORTUE ancienne, symbole de longévité.", levelId: 52 },

  // Level 53
  { character: "非", meaningFr: "Non", mnemonic: "Les deux ailes qui disent NON, refusant de se plier.", levelId: 53 },
  { character: "韋", meaningFr: "Cuir tanné", mnemonic: "Le CUIR TANNÉ, souple et résistant pour l'armure.", levelId: 53 },
  { character: "韭", meaningFr: "Poireau", mnemonic: "Le POIREAU qui pousse en rangs serrés dans le potager.", levelId: 53 },
  { character: "音", meaningFr: "Son", mnemonic: "Le SON qui se propage, né du soleil levant sur la bouche.", levelId: 53 },
  { character: "頁", meaningFr: "Page / Tête", mnemonic: "La PAGE d'un livre, ou la TÊTE qui la lit.", levelId: 53 },
  { character: "風", meaningFr: "Vent", mnemonic: "Le VENT qui souffle, portant les insectes dans sa course.", levelId: 53 },

  // Level 54
  { character: "飛", meaningFr: "Voler", mnemonic: "Les ailes déployées pour VOLER haut dans le ciel.", levelId: 54 },
  { character: "食", meaningFr: "Manger", mnemonic: "MANGER sous le toit, rassemblés autour du bon riz.", levelId: 54 },
  { character: "首", meaningFr: "Cou / Chef", mnemonic: "Le COU qui supporte la tête, le CHEF qui dirige.", levelId: 54 },
  { character: "香", meaningFr: "Parfum", mnemonic: "Le PARFUM du riz qui cuit, montant vers le soleil.", levelId: 54 },
  { character: "馬", meaningFr: "Cheval", mnemonic: "Le CHEVAL au galop, crinière au vent.", levelId: 54 },
  { character: "骨", meaningFr: "Os", mnemonic: "Les OS qui forment la charpente du corps.", levelId: 54 },

  // Level 55
  { character: "高", meaningFr: "Haut", mnemonic: "La tour HAUTE qui domine la ville.", levelId: 55 },
  { character: "髟", meaningFr: "Cheveux", mnemonic: "Les CHEVEUX longs qui cascadent sur les épaules.", levelId: 55 },
  { character: "鬥", meaningFr: "Combat", mnemonic: "Deux guerriers face à face, prêts au COMBAT.", levelId: 55 },
  { character: "鬯", meaningFr: "Herbe parfumée", mnemonic: "L'HERBE PARFUMÉE utilisée dans les rituels anciens.", levelId: 55 },
  { character: "鬲", meaningFr: "Chaudron", mnemonic: "Le CHAUDRON à trois pieds, bouillonnant sur le feu.", levelId: 55 },
  { character: "鬼", meaningFr: "Fantôme / Démon", mnemonic: "Le FANTÔME qui hante les nuits, le DÉMON aux cornes pointues.", levelId: 55 },

  // Level 56
  { character: "魚", meaningFr: "Poisson", mnemonic: "Le POISSON qui nage dans les eaux claires.", levelId: 56 },
  { character: "鳥", meaningFr: "Oiseau", mnemonic: "L'OISEAU perché sur la branche, chantant à l'aube.", levelId: 56 },
  { character: "鹵", meaningFr: "Sel", mnemonic: "Le SEL précieux, extrait de la terre.", levelId: 56 },
  { character: "鹿", meaningFr: "Cerf", mnemonic: "Le CERF noble aux bois ramifiés.", levelId: 56 },
  { character: "麦", meaningFr: "Blé", mnemonic: "Le BLÉ doré, nourriture des peuples.", levelId: 56 },
  { character: "黑", meaningFr: "Noir", mnemonic: "Le NOIR profond de la nuit sans lune.", levelId: 56 },

  // Level 57
  { character: "黍", meaningFr: "Millet", mnemonic: "Le MILLET qui nourrit les pauvres et les riches.", levelId: 57 },
  { character: "黹", meaningFr: "Broderie", mnemonic: "La BRODERIE délicate sur la soie précieuse.", levelId: 57 },
  { character: "黽", meaningFr: "Grenouille", mnemonic: "La GRENOUILLE qui coasse au bord de l'étang.", levelId: 57 },
  { character: "鼎", meaningFr: "Trépied", mnemonic: "Le TRÉPIED cérémoniel, symbole de pouvoir.", levelId: 57 },
  { character: "齒", meaningFr: "Dent (traditionnel)", mnemonic: "Les DENTS qui mastiquent, gardiens de la bouche.", levelId: 57 },
  { character: "龠", meaningFr: "Flûte", mnemonic: "La FLÛTE qui joue des mélodies envoûtantes.", levelId: 57 },

  // Level 58
  { character: "言", meaningFr: "Parole", mnemonic: "La PAROLE qui sort de la bouche, transformant le monde.", levelId: 58 },
  { character: "谷", meaningFr: "Vallée", mnemonic: "La VALLÉE profonde entre deux montagnes.", levelId: 58 },
  { character: "豆", meaningFr: "Haricot", mnemonic: "Le HARICOT humble mais nourrissant.", levelId: 58 },
  { character: "豕", meaningFr: "Cochon", mnemonic: "Le COCHON qui fouille la terre de son groin.", levelId: 58 },
  { character: "豸", meaningFr: "Félin", mnemonic: "Le FÉLIN aux pattes silencieuses, chasseur de la nuit.", levelId: 58 },
  { character: "貝", meaningFr: "Coquillage", mnemonic: "Le COQUILLAGE précieux, ancienne monnaie.", levelId: 58 },

  // Level 59
  { character: "赤", meaningFr: "Rouge", mnemonic: "Le ROUGE du sang et du feu, couleur de passion.", levelId: 59 },
  { character: "走", meaningFr: "Courir", mnemonic: "COURIR avec la terre sous les pieds.", levelId: 59 },
  { character: "足", meaningFr: "Pied", mnemonic: "Le PIED qui porte le corps à travers le monde.", levelId: 59 },
  { character: "身", meaningFr: "Corps", mnemonic: "Le CORPS entier, de la tête aux pieds.", levelId: 59 },
  { character: "車", meaningFr: "Véhicule", mnemonic: "Le VÉHICULE à roues qui transporte hommes et marchandises.", levelId: 59 },
  { character: "辛", meaningFr: "Épicé / Amer", mnemonic: "Le goût ÉPICÉ qui brûle la langue.", levelId: 59 },

  // Level 60
  { character: "辰", meaningFr: "Dragon (zodiaque)", mnemonic: "Le DRAGON du zodiaque, gardien du temps.", levelId: 60 },
  { character: "辵", meaningFr: "Marcher", mnemonic: "MARCHER pas à pas sur le chemin.", levelId: 60 },
  { character: "邑", meaningFr: "Village", mnemonic: "Le VILLAGE où les gens se rassemblent.", levelId: 60 },
  { character: "酉", meaningFr: "Coq / Alcool", mnemonic: "Le COQ du zodiaque, ou la jarre d'ALCOOL.", levelId: 60 },
  { character: "釆", meaningFr: "Distinguer", mnemonic: "DISTINGUER le bon grain de l'ivraie.", levelId: 60 },
  { character: "里", meaningFr: "Village / Ri", mnemonic: "Le VILLAGE natal, mesure de distance.", levelId: 60 },
  { character: "金", meaningFr: "Métal / Or", mnemonic: "L'OR brillant enfoui sous la terre.", levelId: 60 },
];

async function main() {
  console.log("Seeding radicals supplement 3 (levels 51-60)...");

  for (const radical of radicalData) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: radical.levelId } },
      update: {
        meaningFr: radical.meaningFr,
        mnemonic: radical.mnemonic,
      },
      create: radical,
    });
  }

  console.log(`Seeded ${radicalData.length} radicals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
