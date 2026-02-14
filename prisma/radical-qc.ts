import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RadicalWithLevel {
  id: number;
  character: string | null;
  meaningFr: string;
  mnemonic: string;
  levelId: number;
  complexity: number | null;
}

interface KanjiWithRadicals {
  id: number;
  character: string;
  levelId: number;
  radicals: { radical: { id: number; character: string | null; levelId: number } }[];
}

async function runRadicalQC() {
  console.log('='.repeat(80));
  console.log('NIHONGO DATABASE - RADICAL QUALITY CONTROL REPORT');
  console.log('='.repeat(80));
  console.log(`Generated: ${new Date().toISOString()}\n`);

  // 1. Query all radicals ordered by levelId
  console.log('\n' + '='.repeat(80));
  console.log('1. ALL RADICALS ORDERED BY LEVEL');
  console.log('='.repeat(80));

  const allRadicals = await prisma.radical.findMany({
    orderBy: [
      { levelId: 'asc' },
      { id: 'asc' }
    ],
    select: {
      id: true,
      character: true,
      meaningFr: true,
      mnemonic: true,
      levelId: true,
      complexity: true,
    }
  }) as RadicalWithLevel[];

  console.log(`\nTotal Radicals: ${allRadicals.length}\n`);

  // Group by level
  const radicalsByLevel: Record<number, RadicalWithLevel[]> = {};
  for (const radical of allRadicals) {
    if (!radicalsByLevel[radical.levelId]) {
      radicalsByLevel[radical.levelId] = [];
    }
    radicalsByLevel[radical.levelId].push(radical);
  }

  console.log('Distribution by Level:');
  console.log('-'.repeat(50));
  const sortedLevels = Object.keys(radicalsByLevel).map(Number).sort((a, b) => a - b);
  for (const level of sortedLevels) {
    const radicals = radicalsByLevel[level];
    const chars = radicals.map(r => r.character || '[IMG]').join(' ');
    console.log(`Level ${level.toString().padStart(2)}: ${radicals.length.toString().padStart(3)} radicals | ${chars}`);
  }

  // 2. Check for mnemonics (French mnemonic = mnemonic field)
  console.log('\n' + '='.repeat(80));
  console.log('2. MNEMONIC CHECK (French Mnemonic)');
  console.log('='.repeat(80));

  const withMnemonic = allRadicals.filter(r => r.mnemonic && r.mnemonic.trim().length > 0);
  const withoutMnemonic = allRadicals.filter(r => !r.mnemonic || r.mnemonic.trim().length === 0);

  console.log(`\nRadicals WITH mnemonic:    ${withMnemonic.length} (${(withMnemonic.length / allRadicals.length * 100).toFixed(1)}%)`);
  console.log(`Radicals WITHOUT mnemonic: ${withoutMnemonic.length} (${(withoutMnemonic.length / allRadicals.length * 100).toFixed(1)}%)`);

  if (withoutMnemonic.length > 0) {
    console.log('\nRadicals missing mnemonics:');
    for (const r of withoutMnemonic) {
      console.log(`  - Level ${r.levelId}: ${r.character || '[IMG]'} (${r.meaningFr})`);
    }
  }

  // Check mnemonic quality (length)
  const shortMnemonics = withMnemonic.filter(r => r.mnemonic.length < 20);
  const longMnemonics = withMnemonic.filter(r => r.mnemonic.length > 500);

  console.log(`\nMnemonic length analysis:`);
  console.log(`  - Very short (<20 chars): ${shortMnemonics.length}`);
  console.log(`  - Very long (>500 chars): ${longMnemonics.length}`);

  if (shortMnemonics.length > 0 && shortMnemonics.length <= 20) {
    console.log('\nShort mnemonics (may need expansion):');
    for (const r of shortMnemonics.slice(0, 10)) {
      console.log(`  - Level ${r.levelId}: ${r.character || '[IMG]'} (${r.meaningFr}): "${r.mnemonic.substring(0, 50)}..."`);
    }
  }

  // 3. Check if simple radicals come before complex ones
  console.log('\n' + '='.repeat(80));
  console.log('3. COMPLEXITY ORDERING CHECK');
  console.log('='.repeat(80));

  const radicalsWithComplexity = allRadicals.filter(r => r.complexity !== null);
  console.log(`\nRadicals with complexity rating: ${radicalsWithComplexity.length}/${allRadicals.length}`);

  if (radicalsWithComplexity.length > 0) {
    // Check if lower complexity comes in earlier levels
    const complexityByLevel: Record<number, number[]> = {};
    for (const r of radicalsWithComplexity) {
      if (!complexityByLevel[r.levelId]) {
        complexityByLevel[r.levelId] = [];
      }
      complexityByLevel[r.levelId].push(r.complexity!);
    }

    console.log('\nAverage complexity by level:');
    for (const level of sortedLevels) {
      if (complexityByLevel[level]) {
        const avg = complexityByLevel[level].reduce((a, b) => a + b, 0) / complexityByLevel[level].length;
        console.log(`  Level ${level.toString().padStart(2)}: ${avg.toFixed(2)}`);
      }
    }
  } else {
    console.log('(No complexity data available - skipping this check)');
  }

  // 4. Verify radicals appear BEFORE any kanji that use them
  console.log('\n' + '='.repeat(80));
  console.log('4. RADICAL-BEFORE-KANJI ORDERING CHECK');
  console.log('='.repeat(80));

  const allKanji = await prisma.kanji.findMany({
    select: {
      id: true,
      character: true,
      levelId: true,
      radicals: {
        select: {
          radical: {
            select: {
              id: true,
              character: true,
              levelId: true,
            }
          }
        }
      }
    },
    orderBy: { levelId: 'asc' }
  }) as KanjiWithRadicals[];

  console.log(`\nTotal Kanji: ${allKanji.length}`);

  const violations: { kanji: string; kanjiLevel: number; radical: string; radicalLevel: number }[] = [];

  for (const kanji of allKanji) {
    for (const kr of kanji.radicals) {
      if (kr.radical.levelId > kanji.levelId) {
        violations.push({
          kanji: kanji.character,
          kanjiLevel: kanji.levelId,
          radical: kr.radical.character || '[IMG]',
          radicalLevel: kr.radical.levelId,
        });
      }
    }
  }

  if (violations.length === 0) {
    console.log('\n[PASS] All radicals appear at or before the kanji that use them.');
  } else {
    console.log(`\n[FAIL] Found ${violations.length} ordering violations:`);
    for (const v of violations) {
      console.log(`  - Kanji "${v.kanji}" (Level ${v.kanjiLevel}) uses radical "${v.radical}" from Level ${v.radicalLevel}`);
    }
  }

  // 5. Check for duplicate radicals (same character in different levels)
  console.log('\n' + '='.repeat(80));
  console.log('5. DUPLICATE RADICAL CHECK');
  console.log('='.repeat(80));

  const characterMap: Record<string, RadicalWithLevel[]> = {};
  for (const r of allRadicals) {
    if (r.character) {
      if (!characterMap[r.character]) {
        characterMap[r.character] = [];
      }
      characterMap[r.character].push(r);
    }
  }

  const duplicates = Object.entries(characterMap).filter(([_, radicals]) => radicals.length > 1);

  if (duplicates.length === 0) {
    console.log('\n[PASS] No duplicate radicals found.');
  } else {
    console.log(`\n[FAIL] Found ${duplicates.length} duplicate radicals:`);
    for (const [char, radicals] of duplicates) {
      const levels = radicals.map(r => `Level ${r.levelId} (ID ${r.id})`).join(', ');
      console.log(`  - "${char}" appears in: ${levels}`);
    }
  }

  // 6. Verify basic radicals are in early levels
  console.log('\n' + '='.repeat(80));
  console.log('6. BASIC RADICALS PLACEMENT CHECK');
  console.log('='.repeat(80));

  const basicRadicals = ['一', '丨', '丶', 'ノ', '口', '日', '月', '木', '水', '火', '土'];
  console.log(`\nChecking basic radicals: ${basicRadicals.join(' ')}`);
  console.log('(These should ideally be in levels 1-5)\n');

  const basicRadicalPlacements: { char: string; level: number | null; meaning: string | null }[] = [];

  for (const char of basicRadicals) {
    const found = allRadicals.find(r => r.character === char);
    if (found) {
      basicRadicalPlacements.push({ char, level: found.levelId, meaning: found.meaningFr });
    } else {
      basicRadicalPlacements.push({ char, level: null, meaning: null });
    }
  }

  const missingBasic = basicRadicalPlacements.filter(b => b.level === null);
  const lateBasic = basicRadicalPlacements.filter(b => b.level !== null && b.level > 5);
  const earlyBasic = basicRadicalPlacements.filter(b => b.level !== null && b.level <= 5);

  console.log('Basic radicals in early levels (1-5):');
  for (const b of earlyBasic) {
    console.log(`  [GOOD] "${b.char}" - Level ${b.level} (${b.meaning})`);
  }

  if (lateBasic.length > 0) {
    console.log('\nBasic radicals in later levels (should be earlier):');
    for (const b of lateBasic) {
      console.log(`  [WARN] "${b.char}" - Level ${b.level} (${b.meaning})`);
    }
  }

  if (missingBasic.length > 0) {
    console.log('\nMissing basic radicals:');
    for (const b of missingBasic) {
      console.log(`  [MISSING] "${b.char}" - Not found in database`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('QUALITY ASSESSMENT SUMMARY');
  console.log('='.repeat(80));

  const totalChecks = 5;
  let passedChecks = 0;

  // Mnemonic check
  const mnemonicPass = withoutMnemonic.length === 0;
  passedChecks += mnemonicPass ? 1 : 0;
  console.log(`\n1. Mnemonic Coverage: ${mnemonicPass ? '[PASS]' : '[FAIL]'} - ${withMnemonic.length}/${allRadicals.length} have mnemonics`);

  // Ordering check
  const orderingPass = violations.length === 0;
  passedChecks += orderingPass ? 1 : 0;
  console.log(`2. Radical-Kanji Ordering: ${orderingPass ? '[PASS]' : '[FAIL]'} - ${violations.length} violations`);

  // Duplicate check
  const duplicatePass = duplicates.length === 0;
  passedChecks += duplicatePass ? 1 : 0;
  console.log(`3. No Duplicates: ${duplicatePass ? '[PASS]' : '[FAIL]'} - ${duplicates.length} duplicates found`);

  // Basic radicals check
  const basicPass = missingBasic.length === 0 && lateBasic.length === 0;
  passedChecks += basicPass ? 1 : 0;
  console.log(`4. Basic Radicals Placement: ${basicPass ? '[PASS]' : (missingBasic.length > 0 ? '[FAIL]' : '[WARN]')} - ${earlyBasic.length}/${basicRadicals.length} in early levels`);

  // Level distribution check (at least 60 levels with radicals is good)
  const levelDistributionPass = sortedLevels.length >= 10;
  passedChecks += levelDistributionPass ? 1 : 0;
  console.log(`5. Level Distribution: ${levelDistributionPass ? '[PASS]' : '[WARN]'} - ${sortedLevels.length} levels have radicals`);

  console.log(`\nOverall Score: ${passedChecks}/${totalChecks} checks passed`);

  // Detailed statistics
  console.log('\n' + '='.repeat(80));
  console.log('DETAILED STATISTICS');
  console.log('='.repeat(80));

  console.log(`\nTotal Radicals: ${allRadicals.length}`);
  console.log(`Total Kanji: ${allKanji.length}`);
  console.log(`Levels with Radicals: ${sortedLevels.length} (Level ${sortedLevels[0]} to Level ${sortedLevels[sortedLevels.length - 1]})`);

  const avgRadicalsPerLevel = allRadicals.length / sortedLevels.length;
  console.log(`Average Radicals per Level: ${avgRadicalsPerLevel.toFixed(1)}`);

  // Kanji without radicals
  const kanjiWithoutRadicals = allKanji.filter(k => k.radicals.length === 0);
  console.log(`\nKanji without assigned radicals: ${kanjiWithoutRadicals.length}`);
  if (kanjiWithoutRadicals.length > 0 && kanjiWithoutRadicals.length <= 20) {
    for (const k of kanjiWithoutRadicals) {
      console.log(`  - ${k.character} (Level ${k.levelId})`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('END OF REPORT');
  console.log('='.repeat(80));
}

runRadicalQC()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
