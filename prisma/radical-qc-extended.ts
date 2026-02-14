import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getKanjiWithoutRadicals() {
  console.log('='.repeat(80));
  console.log('KANJI WITHOUT ASSIGNED RADICALS - DETAILED LIST');
  console.log('='.repeat(80));

  const kanjiWithoutRadicals = await prisma.kanji.findMany({
    where: {
      radicals: {
        none: {}
      }
    },
    orderBy: { levelId: 'asc' },
    select: {
      id: true,
      character: true,
      levelId: true,
      meaningsFr: true,
    }
  });

  console.log(`\nTotal kanji without radicals: ${kanjiWithoutRadicals.length}\n`);

  // Group by level
  const byLevel: Record<number, typeof kanjiWithoutRadicals> = {};
  for (const k of kanjiWithoutRadicals) {
    if (!byLevel[k.levelId]) {
      byLevel[k.levelId] = [];
    }
    byLevel[k.levelId].push(k);
  }

  for (const level of Object.keys(byLevel).map(Number).sort((a, b) => a - b)) {
    const kanji = byLevel[level];
    console.log(`\nLevel ${level} (${kanji.length} kanji without radicals):`);
    for (const k of kanji) {
      console.log(`  - ${k.character} (${k.meaningsFr[0] || 'no meaning'})`);
    }
  }
}

async function checkRadicalUsage() {
  console.log('\n' + '='.repeat(80));
  console.log('RADICAL USAGE ANALYSIS');
  console.log('='.repeat(80));

  const radicals = await prisma.radical.findMany({
    select: {
      id: true,
      character: true,
      meaningFr: true,
      levelId: true,
      _count: {
        select: { kanji: true }
      }
    },
    orderBy: { levelId: 'asc' }
  });

  const unusedRadicals = radicals.filter(r => r._count.kanji === 0);
  const highlyUsed = radicals.filter(r => r._count.kanji >= 10).sort((a, b) => b._count.kanji - a._count.kanji);

  console.log(`\nTotal radicals: ${radicals.length}`);
  console.log(`Unused radicals (not linked to any kanji): ${unusedRadicals.length}`);
  console.log(`Highly used radicals (10+ kanji): ${highlyUsed.length}`);

  if (unusedRadicals.length > 0) {
    console.log('\nUnused radicals:');
    for (const r of unusedRadicals.slice(0, 30)) {
      console.log(`  - Level ${r.levelId}: ${r.character || '[IMG]'} (${r.meaningFr})`);
    }
    if (unusedRadicals.length > 30) {
      console.log(`  ... and ${unusedRadicals.length - 30} more`);
    }
  }

  console.log('\nMost frequently used radicals:');
  for (const r of highlyUsed.slice(0, 20)) {
    console.log(`  - ${r.character || '[IMG]'} (${r.meaningFr}): used in ${r._count.kanji} kanji (Level ${r.levelId})`);
  }
}

async function main() {
  await getKanjiWithoutRadicals();
  await checkRadicalUsage();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
