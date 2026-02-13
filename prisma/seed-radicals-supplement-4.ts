import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final radicals to complete the collection
const radicalData = [
  { character: "長", meaningFr: "Long", mnemonic: "Le chef aux LONGS cheveux qui flottent au vent, symbole de sagesse et d'âge.", levelId: 60 },
  { character: "門", meaningFr: "Porte", mnemonic: "La grande PORTE qui s'ouvre sur le monde, gardienne des secrets.", levelId: 60 },
];

async function main() {
  console.log("Seeding final radicals...");

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
