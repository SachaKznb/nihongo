import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const prisma = new PrismaClient();
  const hash = await bcrypt.hash('TempPass123!', 10);
  await prisma.user.update({
    where: { email: 'sacha@kaizen-media.co' },
    data: { passwordHash: hash }
  });
  console.log('Password reset to: TempPass123!');
  await prisma.$disconnect();
}

main();
