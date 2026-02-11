import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setAdmin() {
  // Get your email as argument or find the first user
  const email = process.argv[2];

  if (email) {
    // Set specific user as admin
    const user = await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
    });
    console.log(`✅ Set ${user.email} as admin`);
  } else {
    // List all users so you can pick one
    const users = await prisma.user.findMany({
      select: { id: true, email: true, username: true, isAdmin: true },
    });

    if (users.length === 0) {
      console.log("No users found in database");
    } else {
      console.log("Users in database:");
      users.forEach((u) => {
        console.log(`  - ${u.email} (${u.username}) - isAdmin: ${u.isAdmin}`);
      });
      console.log("\nRun with email to set admin: npx tsx scripts/set-admin.ts your@email.com");
    }
  }

  await prisma.$disconnect();
}

setAdmin().catch(console.error);
