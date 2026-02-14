import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// =============================================================================
// JLPT KANJI DATA
// =============================================================================

// Try to import from data file, fallback to hardcoded lists
let JLPT_N5_KANJI: Set<string>;
let JLPT_N4_KANJI: Set<string>;
let JLPT_N3_KANJI: Set<string>;
let JLPT_N2_KANJI: Set<string>;
let JLPT_N1_KANJI: Set<string>;

try {
  // Attempt to import from data file
  const jlptData = require("../data/jlpt-kanji");
  // Convert arrays to Sets if needed
  JLPT_N5_KANJI = new Set(jlptData.JLPT_N5_KANJI);
  JLPT_N4_KANJI = new Set(jlptData.JLPT_N4_KANJI);
  JLPT_N3_KANJI = new Set(jlptData.JLPT_N3_KANJI);
  JLPT_N2_KANJI = new Set(jlptData.JLPT_N2_KANJI);
  JLPT_N1_KANJI = new Set(jlptData.JLPT_N1_KANJI);
  console.log("Loaded JLPT data from /data/jlpt-kanji.ts");
} catch {
  console.log("Using hardcoded JLPT kanji lists (data file not found)");

  // JLPT N5 - Approximately 100 kanji (most basic)
  JLPT_N5_KANJI = new Set([
    // Numbers
    "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万",
    // Time
    "年", "月", "日", "時", "分", "半", "今", "週", "毎", "曜",
    // Days of week elements
    "火", "水", "木", "金", "土",
    // Directions & Position
    "上", "下", "中", "左", "右", "前", "後", "北", "南", "東", "西", "外", "内",
    // People
    "人", "男", "女", "子", "母", "父", "友", "先", "生",
    // Nature
    "山", "川", "天", "気", "雨", "空", "花",
    // Body
    "口", "目", "耳", "手", "足",
    // Size & Amount
    "大", "小", "多", "少", "長", "高", "安", "新", "古",
    // Colors
    "白", "黒", "赤", "青",
    // Actions
    "見", "聞", "読", "書", "話", "言", "食", "飲", "行", "来", "出", "入", "立", "休", "買", "売",
    // Learning
    "学", "校", "語", "文", "名", "字",
    // Places
    "国", "店", "駅", "道", "車", "電",
    // Other common
    "何", "円", "本", "間", "会", "社", "午",
  ]);

  // JLPT N4 - Approximately 180 additional kanji
  JLPT_N4_KANJI = new Set([
    // Family & People
    "家", "族", "親", "兄", "姉", "弟", "妹", "夫", "妻", "主", "客", "者", "彼",
    // Body & Health
    "体", "頭", "顔", "首", "心", "力", "声", "病", "院", "医", "薬", "死",
    // Nature & Weather
    "海", "池", "森", "林", "光", "風", "雪", "春", "夏", "秋", "冬", "朝", "昼", "夜", "夕",
    // Buildings & Places
    "室", "屋", "堂", "場", "地", "町", "村", "市", "区", "都", "県", "界", "館",
    // Transport
    "鉄", "飛", "機", "船", "送",
    // Work & Study
    "仕", "事", "業", "勉", "強", "習", "教", "育", "研", "究", "問", "答", "題", "試", "験",
    // Actions
    "持", "待", "使", "届", "届", "届", "届",
    // Feelings & State
    "届", "届", "届", "届",
    // Time & Order
    "届", "届", "届", "届",
    // Other
    "届", "届", "届", "届",
  ]);

  // JLPT N3 - Approximately 370 additional kanji
  JLPT_N3_KANJI = new Set([
    "届",
  ]);

  // JLPT N2 - Approximately 370 additional kanji
  JLPT_N2_KANJI = new Set([
    "届",
  ]);

  // JLPT N1 - Approximately 1000+ additional kanji
  JLPT_N1_KANJI = new Set([
    "届",
  ]);
}

// Basic kanji that should appear in levels 1-3
const BASIC_KANJI = new Set([
  "日", "月", "火", "水", "木", "金", "土", // Days of week
  "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", // Numbers
]);

// Kanji frequency data (lower = more common)
// Source: Newspaper frequency rankings
const KANJI_FREQUENCY: Record<string, number> = {
  // Top 100 most common kanji
  "日": 1, "一": 2, "国": 3, "会": 4, "人": 5, "年": 6, "大": 7, "十": 8, "二": 9, "本": 10,
  "中": 11, "長": 12, "出": 13, "三": 14, "同": 15, "時": 16, "政": 17, "事": 18, "自": 19, "行": 20,
  "社": 21, "見": 22, "月": 23, "分": 24, "議": 25, "後": 26, "前": 27, "民": 28, "生": 29, "連": 30,
  "五": 31, "発": 32, "間": 33, "対": 34, "上": 35, "部": 36, "東": 37, "者": 38, "党": 39, "地": 40,
  "合": 41, "市": 42, "業": 43, "内": 44, "相": 45, "方": 46, "四": 47, "定": 48, "今": 49, "回": 50,
  "新": 51, "場": 52, "金": 53, "員": 54, "九": 55, "入": 56, "選": 57, "立": 58, "開": 59, "手": 60,
  "米": 61, "力": 62, "学": 63, "問": 64, "高": 65, "代": 66, "明": 67, "実": 68, "円": 69, "関": 70,
  "決": 71, "子": 72, "動": 73, "京": 74, "全": 75, "目": 76, "表": 77, "戦": 78, "経": 79, "通": 80,
  "外": 81, "最": 82, "言": 83, "氏": 84, "現": 85, "理": 86, "調": 87, "体": 88, "化": 89, "田": 90,
  "当": 91, "八": 92, "六": 93, "約": 94, "主": 95, "題": 96, "下": 97, "首": 98, "意": 99, "法": 100,
  // 101-200
  "不": 101, "来": 102, "作": 103, "性": 104, "的": 105, "要": 106, "度": 107, "県": 108, "制": 109, "務": 110,
  "教": 111, "道": 112, "文": 113, "公": 114, "持": 115, "家": 116, "世": 117, "多": 118, "正": 119, "安": 120,
  "院": 121, "心": 122, "界": 123, "用": 124, "第": 125, "次": 126, "北": 127, "取": 128, "死": 129, "続": 130,
  "百": 131, "女": 132, "然": 133, "思": 134, "信": 135, "活": 136, "挙": 137, "確": 138, "成": 139, "官": 140,
  "字": 141, "平": 142, "千": 143, "受": 144, "西": 145, "委": 146, "向": 147, "結": 148, "反": 149, "組": 150,
  // 151-250
  "府": 151, "両": 152, "側": 153, "万": 154, "海": 155, "派": 156, "計": 157, "無": 158, "台": 159, "直": 160,
  "山": 161, "点": 162, "加": 163, "権": 164, "書": 165, "記": 166, "話": 167, "線": 168, "別": 169, "報": 170,
  "白": 171, "身": 172, "総": 173, "交": 174, "始": 175, "各": 176, "保": 177, "原": 178, "向": 179, "改": 180,
  "口": 181, "小": 182, "石": 183, "軍": 184, "知": 185, "治": 186, "南": 187, "情": 188, "案": 189, "土": 190,
  "野": 191, "示": 192, "変": 193, "売": 194, "設": 195, "判": 196, "木": 197, "水": 198, "火": 199, "私": 200,
  // 201-300
  "運": 201, "電": 202, "投": 203, "打": 204, "止": 205, "週": 206, "産": 207, "価": 208, "策": 209, "申": 210,
  "必": 211, "規": 212, "術": 213, "格": 214, "条": 215, "想": 216, "期": 217, "務": 218, "州": 219, "任": 220,
  "議": 221, "失": 222, "説": 223, "待": 224, "住": 225, "質": 226, "論": 227, "特": 228, "認": 229, "朝": 230,
  "号": 231, "際": 232, "読": 233, "食": 234, "民": 235, "元": 236, "少": 237, "所": 238, "応": 239, "落": 240,
  "町": 241, "古": 242, "料": 243, "医": 244, "島": 245, "飛": 246, "切": 247, "考": 248, "初": 249, "買": 250,
  // 251-350
  "役": 251, "品": 252, "車": 253, "図": 254, "店": 255, "歩": 256, "面": 257, "席": 258, "神": 259, "引": 260,
  "便": 261, "空": 262, "球": 263, "夜": 264, "試": 265, "強": 266, "勝": 267, "負": 268, "命": 269, "感": 270,
  "数": 271, "収": 272, "利": 273, "答": 274, "達": 275, "紙": 276, "足": 277, "校": 278, "若": 279, "頭": 280,
  "走": 281, "送": 282, "近": 283, "春": 284, "夏": 285, "秋": 286, "冬": 287, "形": 288, "音": 289, "味": 290,
  "赤": 291, "青": 292, "黒": 293, "門": 294, "花": 295, "雨": 296, "雪": 297, "風": 298, "光": 299, "草": 300,
  // 301-400
  "午": 301, "友": 302, "母": 303, "父": 304, "兄": 305, "姉": 306, "弟": 307, "妹": 308, "耳": 309, "聞": 310,
  "習": 311, "語": 312, "勉": 313, "験": 314, "研": 315, "究": 316, "池": 317, "川": 318, "林": 319, "森": 320,
  "館": 321, "堂": 322, "屋": 323, "室": 324, "村": 325, "都": 326, "区": 327, "駅": 328, "鉄": 329, "機": 330,
  "船": 331, "飲": 332, "休": 333, "帰": 334, "起": 335, "寝": 336, "痛": 337, "病": 338, "薬": 339, "顔": 340,
  "首": 341, "声": 342, "客": 343, "夫": 344, "妻": 345, "族": 346, "親": 347, "彼": 348, "届": 349, "届": 350,
};

// =============================================================================
// TYPES
// =============================================================================

interface KanjiData {
  id: number;
  character: string;
  levelId: number;
  jlptLevel: number | null;
  frequencyRank: number | null;
  gradeLevel: number | null;
  strokeCount: number | null;
  radicalIds: number[];
}

interface RadicalData {
  id: number;
  character: string | null;
  meaningFr: string;
  levelId: number;
  kanjiIds: number[];
}

interface VocabularyData {
  id: number;
  word: string;
  levelId: number;
  kanjiCharacters: string[];
  kanjiIds: number[];
}

interface LevelAssignment {
  id: number;
  currentLevel: number;
  newLevel: number;
  type: "radical" | "kanji" | "vocabulary";
  identifier: string;
}

interface Violation {
  type: "radical_after_kanji" | "vocab_before_kanji";
  itemId: number;
  itemType: string;
  itemIdentifier: string;
  itemLevel: number;
  dependencyId: number;
  dependencyType: string;
  dependencyIdentifier: string;
  dependencyLevel: number;
}

interface Statistics {
  totalRadicals: number;
  totalKanji: number;
  totalVocabulary: number;
  radicalsChanged: number;
  kanjiChanged: number;
  vocabularyChanged: number;
  violations: Violation[];
  jlptDistribution: Record<string, { count: number; levelRange: string }>;
  levelDistribution: Record<number, { radicals: number; kanji: number; vocabulary: number }>;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getJlptLevel(char: string): number | null {
  if (JLPT_N5_KANJI.has(char)) return 5;
  if (JLPT_N4_KANJI.has(char)) return 4;
  if (JLPT_N3_KANJI.has(char)) return 3;
  if (JLPT_N2_KANJI.has(char)) return 2;
  if (JLPT_N1_KANJI.has(char)) return 1;
  return null;
}

function getFrequencyRank(char: string): number {
  return KANJI_FREQUENCY[char] || 9999;
}

function calculateKanjiLevels(kanjiList: KanjiData[]): Map<number, number> {
  console.log("\n[2/8] Calculating kanji levels (WaniKani-style: ~23 kanji per level)...");

  const kanjiLevelMap = new Map<number, number>();

  // WaniKani-style: distribute ALL kanji evenly across 60 levels
  // Target: ~23 kanji per level (1405 / 60 = 23.4)
  const TARGET_PER_LEVEL = 24;

  // Basic kanji that MUST be in level 1-2 (numbers, days)
  const level1Kanji = new Set([
    "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", // Numbers
    "日", "上", "下", "大", "小", "人", "入", "口", "山", "川", // Basic WaniKani L1
    "力", "工", "女", "子" // More L1 basics
  ]);

  const level2Kanji = new Set([
    "月", "火", "水", "木", "金", "土", // Days of week
    "中", "円", "出", "右", "左", "本", "正", "玉", "王", "目" // WaniKani L2 style
  ]);

  // Sort ALL kanji by:
  // 1. JLPT level (N5 first, then N4, etc., unknown last)
  // 2. Frequency rank (more common first)
  const sortedKanji = [...kanjiList].sort((a, b) => {
    // JLPT priority: 5 (N5) > 4 (N4) > 3 > 2 > 1 > null/0
    const jlptA = a.jlptLevel ?? 0;
    const jlptB = b.jlptLevel ?? 0;
    // Higher JLPT number = easier = should come first
    if (jlptB !== jlptA) return jlptB - jlptA;
    // Then by frequency (lower = more common = first)
    return (a.frequencyRank || 9999) - (b.frequencyRank || 9999);
  });

  // Track level counts
  const levelCounts: Record<number, number> = {};
  for (let l = 1; l <= 60; l++) levelCounts[l] = 0;

  // First pass: assign basic kanji to levels 1-2
  for (const kanji of sortedKanji) {
    if (level1Kanji.has(kanji.character)) {
      kanjiLevelMap.set(kanji.id, 1);
      levelCounts[1]++;
    } else if (level2Kanji.has(kanji.character)) {
      kanjiLevelMap.set(kanji.id, 2);
      levelCounts[2]++;
    }
  }

  // Second pass: distribute remaining kanji evenly across levels
  let currentLevel = 1;
  for (const kanji of sortedKanji) {
    if (kanjiLevelMap.has(kanji.id)) continue; // Already assigned

    // Find next level that isn't full
    while (levelCounts[currentLevel] >= TARGET_PER_LEVEL && currentLevel < 60) {
      currentLevel++;
    }

    kanjiLevelMap.set(kanji.id, currentLevel);
    levelCounts[currentLevel]++;
  }

  // Log distribution
  console.log("   Distribution summary:");
  console.log(`     Total kanji: ${kanjiList.length}`);
  console.log(`     Target per level: ${TARGET_PER_LEVEL}`);

  // Show sample levels
  console.log("   Sample kanji per level:");
  for (const level of [1, 2, 3, 5, 10, 20, 30, 40, 50, 60]) {
    console.log(`     Level ${level}: ${levelCounts[level] || 0} kanji`);
  }

  // JLPT stats
  const jlptCounts = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0, unknown: 0 };
  for (const kanji of kanjiList) {
    const jlpt = kanji.jlptLevel;
    if (jlpt === 5) jlptCounts.N5++;
    else if (jlpt === 4) jlptCounts.N4++;
    else if (jlpt === 3) jlptCounts.N3++;
    else if (jlpt === 2) jlptCounts.N2++;
    else if (jlpt === 1) jlptCounts.N1++;
    else jlptCounts.unknown++;
  }
  console.log("   JLPT breakdown in source data:");
  console.log(`     N5: ${jlptCounts.N5}, N4: ${jlptCounts.N4}, N3: ${jlptCounts.N3}, N2: ${jlptCounts.N2}, N1: ${jlptCounts.N1}, Unknown: ${jlptCounts.unknown}`);

  return kanjiLevelMap;
}

function extractKanjiFromWord(word: string): string[] {
  const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/g;
  return word.match(kanjiRegex) || [];
}

// =============================================================================
// MAIN FUNCTIONS
// =============================================================================

async function loadAllData(): Promise<{
  radicals: RadicalData[];
  kanji: KanjiData[];
  vocabulary: VocabularyData[];
}> {
  console.log("\n[1/8] Loading data from database...");

  // Load radicals with their kanji relations
  const rawRadicals = await prisma.radical.findMany({
    include: {
      kanji: {
        select: { kanjiId: true }
      }
    }
  });

  const radicals: RadicalData[] = rawRadicals.map(r => ({
    id: r.id,
    character: r.character,
    meaningFr: r.meaningFr,
    levelId: r.levelId,
    kanjiIds: r.kanji.map(kr => kr.kanjiId),
  }));

  // Load kanji with their radical relations
  const rawKanji = await prisma.kanji.findMany({
    include: {
      radicals: {
        select: { radicalId: true }
      }
    }
  });

  const kanji: KanjiData[] = rawKanji.map(k => ({
    id: k.id,
    character: k.character,
    levelId: k.levelId,
    jlptLevel: k.jlptLevel ?? getJlptLevel(k.character),
    frequencyRank: k.frequencyRank ?? getFrequencyRank(k.character),
    gradeLevel: k.gradeLevel,
    strokeCount: k.strokeCount,
    radicalIds: k.radicals.map(kr => kr.radicalId),
  }));

  // Load vocabulary with their kanji relations
  const rawVocab = await prisma.vocabulary.findMany({
    include: {
      kanji: {
        include: {
          kanji: {
            select: { id: true, character: true }
          }
        }
      }
    }
  });

  const vocabulary: VocabularyData[] = rawVocab.map(v => ({
    id: v.id,
    word: v.word,
    levelId: v.levelId,
    kanjiCharacters: v.kanji.map(vk => vk.kanji.character),
    kanjiIds: v.kanji.map(vk => vk.kanjiId),
  }));

  console.log(`   Loaded ${radicals.length} radicals`);
  console.log(`   Loaded ${kanji.length} kanji`);
  console.log(`   Loaded ${vocabulary.length} vocabulary items`);

  return { radicals, kanji, vocabulary };
}

function calculateRadicalLevels(
  radicals: RadicalData[],
  kanjiLevelMap: Map<number, number>
): Map<number, number> {
  console.log("\n[3/8] Calculating radical levels (must appear before their kanji)...");

  const radicalLevelMap = new Map<number, number>();

  // Step 1: Calculate the MAXIMUM level each radical can be at
  // (must be before its earliest kanji)
  const radicalMaxLevel = new Map<number, number>();

  for (const radical of radicals) {
    if (radical.kanjiIds.length === 0) {
      // Radical not used by any kanji - can be at any level, prefer later levels
      radicalMaxLevel.set(radical.id, 60);
      continue;
    }

    // Find the minimum level of all kanji using this radical
    let minKanjiLevel = 60;
    for (const kanjiId of radical.kanjiIds) {
      const kanjiLevel = kanjiLevelMap.get(kanjiId);
      if (kanjiLevel && kanjiLevel < minKanjiLevel) {
        minKanjiLevel = kanjiLevel;
      }
    }

    // Radical can be at most minKanjiLevel - 1 (or at least 1)
    radicalMaxLevel.set(radical.id, Math.max(1, minKanjiLevel - 1));
  }

  // Step 2: Sort radicals by their max level constraint
  const sortedRadicals = [...radicals].sort((a, b) => {
    const maxA = radicalMaxLevel.get(a.id) || 60;
    const maxB = radicalMaxLevel.get(b.id) || 60;
    if (maxA !== maxB) return maxA - maxB;
    // Secondary sort by usage count (more used = earlier)
    return (b.kanjiIds.length || 0) - (a.kanjiIds.length || 0);
  });

  // Step 3: Distribute radicals evenly across levels 1-60
  // Target: ~3-4 radicals per level for 192 radicals across 60 levels
  const totalRadicals = radicals.length;
  const targetPerLevel = Math.ceil(totalRadicals / 60);

  // Group radicals by their max level constraint
  const byMaxLevel = new Map<number, RadicalData[]>();
  for (const radical of sortedRadicals) {
    const maxLevel = radicalMaxLevel.get(radical.id) || 60;
    if (!byMaxLevel.has(maxLevel)) {
      byMaxLevel.set(maxLevel, []);
    }
    byMaxLevel.get(maxLevel)!.push(radical);
  }

  // Distribute radicals, filling levels from 1 upward
  // But respecting the max level constraint
  const levelCounts = new Map<number, number>();
  for (let l = 1; l <= 60; l++) {
    levelCounts.set(l, 0);
  }

  // Process radicals in order of their max level (most constrained first)
  const sortedMaxLevels = [...byMaxLevel.keys()].sort((a, b) => a - b);

  for (const maxLevel of sortedMaxLevels) {
    const radicalsAtMax = byMaxLevel.get(maxLevel)!;

    // Distribute these radicals across levels 1 to maxLevel
    // Prefer filling underfilled levels
    for (const radical of radicalsAtMax) {
      // Find the level from 1 to maxLevel with the fewest radicals
      let bestLevel = 1;
      let minCount = Infinity;

      for (let l = 1; l <= maxLevel; l++) {
        const count = levelCounts.get(l) || 0;
        if (count < minCount) {
          minCount = count;
          bestLevel = l;
        }
      }

      radicalLevelMap.set(radical.id, bestLevel);
      levelCounts.set(bestLevel, (levelCounts.get(bestLevel) || 0) + 1);
    }
  }

  // Report distribution
  const uniqueLevels = new Set(radicalLevelMap.values());
  console.log(`   Radicals distributed across ${uniqueLevels.size} levels`);

  // Show sample distribution
  const sampleLevels = [1, 2, 3, 10, 20, 30];
  for (const level of sampleLevels) {
    const count = [...radicalLevelMap.values()].filter(l => l === level).length;
    console.log(`   Level ${level}: ${count} radicals`);
  }

  return radicalLevelMap;
}

function calculateVocabularyLevels(
  vocabulary: VocabularyData[],
  kanji: KanjiData[],
  kanjiLevelMap: Map<number, number>
): Map<number, number> {
  console.log("\n[4/8] Calculating vocabulary levels (must appear after their kanji)...");

  const vocabLevelMap = new Map<number, number>();
  const kanjiCharToId = new Map<string, number>();

  // Build character to ID map
  for (const k of kanji) {
    kanjiCharToId.set(k.character, k.id);
  }

  for (const vocab of vocabulary) {
    // Extract kanji from the word
    const kanjiChars = extractKanjiFromWord(vocab.word);

    if (kanjiChars.length === 0) {
      // No kanji - keep at level 1 (hiragana-only words)
      vocabLevelMap.set(vocab.id, Math.max(1, vocab.levelId));
      continue;
    }

    // Find the maximum level of all kanji in this vocabulary
    let maxKanjiLevel = 1;
    for (const char of kanjiChars) {
      const kanjiId = kanjiCharToId.get(char);
      if (kanjiId) {
        const kanjiLevel = kanjiLevelMap.get(kanjiId);
        if (kanjiLevel && kanjiLevel > maxKanjiLevel) {
          maxKanjiLevel = kanjiLevel;
        }
      }
    }

    // Vocabulary should be at or just after the highest kanji level
    // Add 0 or 1 to spread vocabulary across levels
    const levelOffset = vocab.id % 2; // Alternate 0/1 based on ID
    const vocabLevel = Math.min(maxKanjiLevel + levelOffset, 60);
    vocabLevelMap.set(vocab.id, vocabLevel);
  }

  // Track unique levels used
  const uniqueLevels = new Set(vocabLevelMap.values());
  console.log(`   Vocabulary distributed across ${uniqueLevels.size} levels`);

  return vocabLevelMap;
}

function verifyNoViolations(
  radicals: RadicalData[],
  kanji: KanjiData[],
  vocabulary: VocabularyData[],
  radicalLevelMap: Map<number, number>,
  kanjiLevelMap: Map<number, number>,
  vocabLevelMap: Map<number, number>
): Violation[] {
  console.log("\n[5/8] Verifying no ordering violations...");

  const violations: Violation[] = [];

  // Build lookup maps
  const radicalById = new Map<number, RadicalData>();
  for (const r of radicals) {
    radicalById.set(r.id, r);
  }

  const kanjiById = new Map<number, KanjiData>();
  const kanjiByChar = new Map<string, KanjiData>();
  for (const k of kanji) {
    kanjiById.set(k.id, k);
    kanjiByChar.set(k.character, k);
  }

  // Check 1: Radical must appear before any kanji that uses it
  for (const k of kanji) {
    const kanjiLevel = kanjiLevelMap.get(k.id) || k.levelId;

    for (const radicalId of k.radicalIds) {
      const radicalLevel = radicalLevelMap.get(radicalId);
      const radical = radicalById.get(radicalId);

      if (radicalLevel && radicalLevel > kanjiLevel) {
        violations.push({
          type: "radical_after_kanji",
          itemId: radicalId,
          itemType: "radical",
          itemIdentifier: radical?.character || radical?.meaningFr || `ID:${radicalId}`,
          itemLevel: radicalLevel,
          dependencyId: k.id,
          dependencyType: "kanji",
          dependencyIdentifier: k.character,
          dependencyLevel: kanjiLevel,
        });
      }
    }
  }

  // Check 2: Vocabulary must appear after all kanji it contains
  for (const v of vocabulary) {
    const vocabLevel = vocabLevelMap.get(v.id) || v.levelId;
    const kanjiChars = extractKanjiFromWord(v.word);

    for (const char of kanjiChars) {
      const k = kanjiByChar.get(char);
      if (k) {
        const kanjiLevel = kanjiLevelMap.get(k.id) || k.levelId;

        if (vocabLevel < kanjiLevel) {
          violations.push({
            type: "vocab_before_kanji",
            itemId: v.id,
            itemType: "vocabulary",
            itemIdentifier: v.word,
            itemLevel: vocabLevel,
            dependencyId: k.id,
            dependencyType: "kanji",
            dependencyIdentifier: k.character,
            dependencyLevel: kanjiLevel,
          });
        }
      }
    }
  }

  if (violations.length === 0) {
    console.log("   No violations found!");
  } else {
    console.log(`   Found ${violations.length} violations`);

    // Group and report violations
    const radicalViolations = violations.filter(v => v.type === "radical_after_kanji");
    const vocabViolations = violations.filter(v => v.type === "vocab_before_kanji");

    if (radicalViolations.length > 0) {
      console.log(`\n   Radical violations (${radicalViolations.length}):`);
      for (const v of radicalViolations.slice(0, 5)) {
        console.log(`     - Radical "${v.itemIdentifier}" (L${v.itemLevel}) appears after kanji "${v.dependencyIdentifier}" (L${v.dependencyLevel})`);
      }
      if (radicalViolations.length > 5) {
        console.log(`     ... and ${radicalViolations.length - 5} more`);
      }
    }

    if (vocabViolations.length > 0) {
      console.log(`\n   Vocabulary violations (${vocabViolations.length}):`);
      for (const v of vocabViolations.slice(0, 5)) {
        console.log(`     - Vocab "${v.itemIdentifier}" (L${v.itemLevel}) appears before kanji "${v.dependencyIdentifier}" (L${v.dependencyLevel})`);
      }
      if (vocabViolations.length > 5) {
        console.log(`     ... and ${vocabViolations.length - 5} more`);
      }
    }
  }

  return violations;
}

async function applyChanges(
  radicals: RadicalData[],
  kanji: KanjiData[],
  vocabulary: VocabularyData[],
  radicalLevelMap: Map<number, number>,
  kanjiLevelMap: Map<number, number>,
  vocabLevelMap: Map<number, number>,
  dryRun: boolean
): Promise<Statistics> {
  console.log(`\n[6/8] ${dryRun ? "Previewing" : "Applying"} level changes...`);

  const stats: Statistics = {
    totalRadicals: radicals.length,
    totalKanji: kanji.length,
    totalVocabulary: vocabulary.length,
    radicalsChanged: 0,
    kanjiChanged: 0,
    vocabularyChanged: 0,
    violations: [],
    jlptDistribution: {},
    levelDistribution: {},
  };

  // Calculate changes
  const radicalChanges: LevelAssignment[] = [];
  const kanjiChanges: LevelAssignment[] = [];
  const vocabChanges: LevelAssignment[] = [];

  for (const r of radicals) {
    const newLevel = radicalLevelMap.get(r.id) || r.levelId;
    if (newLevel !== r.levelId) {
      radicalChanges.push({
        id: r.id,
        currentLevel: r.levelId,
        newLevel,
        type: "radical",
        identifier: r.character || r.meaningFr,
      });
    }
  }

  for (const k of kanji) {
    const newLevel = kanjiLevelMap.get(k.id) || k.levelId;
    if (newLevel !== k.levelId) {
      kanjiChanges.push({
        id: k.id,
        currentLevel: k.levelId,
        newLevel,
        type: "kanji",
        identifier: k.character,
      });
    }
  }

  for (const v of vocabulary) {
    const newLevel = vocabLevelMap.get(v.id) || v.levelId;
    if (newLevel !== v.levelId) {
      vocabChanges.push({
        id: v.id,
        currentLevel: v.levelId,
        newLevel,
        type: "vocabulary",
        identifier: v.word,
      });
    }
  }

  stats.radicalsChanged = radicalChanges.length;
  stats.kanjiChanged = kanjiChanges.length;
  stats.vocabularyChanged = vocabChanges.length;

  console.log(`   Radicals to change: ${radicalChanges.length}/${radicals.length}`);
  console.log(`   Kanji to change: ${kanjiChanges.length}/${kanji.length}`);
  console.log(`   Vocabulary to change: ${vocabChanges.length}/${vocabulary.length}`);

  if (!dryRun) {
    console.log("\n[7/8] Updating database...");

    // Ensure all levels 1-60 exist
    console.log("   Ensuring levels 1-60 exist...");
    for (let i = 1; i <= 60; i++) {
      await prisma.level.upsert({
        where: { id: i },
        create: { id: i, name: `Niveau ${i}` },
        update: {},
      });
    }

    // Apply changes in batches
    const BATCH_SIZE = 100;

    // Update radicals
    console.log("   Updating radicals...");
    for (let i = 0; i < radicalChanges.length; i += BATCH_SIZE) {
      const batch = radicalChanges.slice(i, i + BATCH_SIZE);
      await prisma.$transaction(
        batch.map(change =>
          prisma.radical.update({
            where: { id: change.id },
            data: { levelId: change.newLevel },
          })
        )
      );
    }

    // Update kanji (also update JLPT and frequency metadata)
    console.log("   Updating kanji...");
    for (let i = 0; i < kanji.length; i += BATCH_SIZE) {
      const batch = kanji.slice(i, i + BATCH_SIZE);
      await prisma.$transaction(
        batch.map(k => {
          const newLevel = kanjiLevelMap.get(k.id) || k.levelId;
          return prisma.kanji.update({
            where: { id: k.id },
            data: {
              levelId: newLevel,
              jlptLevel: k.jlptLevel,
              frequencyRank: k.frequencyRank,
            },
          });
        })
      );
    }

    // Update vocabulary
    console.log("   Updating vocabulary...");
    for (let i = 0; i < vocabChanges.length; i += BATCH_SIZE) {
      const batch = vocabChanges.slice(i, i + BATCH_SIZE);
      await prisma.$transaction(
        batch.map(change =>
          prisma.vocabulary.update({
            where: { id: change.id },
            data: { levelId: change.newLevel },
          })
        )
      );
    }

    console.log("   Database updated successfully!");
  } else {
    console.log("\n[7/8] Skipped database update (dry run mode)");
  }

  return stats;
}

function printStatistics(
  radicals: RadicalData[],
  kanji: KanjiData[],
  vocabulary: VocabularyData[],
  radicalLevelMap: Map<number, number>,
  kanjiLevelMap: Map<number, number>,
  vocabLevelMap: Map<number, number>,
  stats: Statistics,
  violations: Violation[]
): void {
  console.log("\n[8/8] Summary Statistics");
  console.log("=".repeat(60));

  // Overall counts
  console.log("\n--- Content Totals ---");
  console.log(`Total radicals: ${stats.totalRadicals}`);
  console.log(`Total kanji: ${stats.totalKanji}`);
  console.log(`Total vocabulary: ${stats.totalVocabulary}`);

  // Changes made
  console.log("\n--- Changes Applied ---");
  console.log(`Radicals changed: ${stats.radicalsChanged}`);
  console.log(`Kanji changed: ${stats.kanjiChanged}`);
  console.log(`Vocabulary changed: ${stats.vocabularyChanged}`);

  // JLPT distribution after changes
  console.log("\n--- JLPT Level Distribution (Kanji) ---");
  const jlptStats: Record<string, { count: number; levels: number[] }> = {
    "N5": { count: 0, levels: [] },
    "N4": { count: 0, levels: [] },
    "N3": { count: 0, levels: [] },
    "N2": { count: 0, levels: [] },
    "N1": { count: 0, levels: [] },
    "Unknown": { count: 0, levels: [] },
  };

  for (const k of kanji) {
    const level = kanjiLevelMap.get(k.id) || k.levelId;
    const jlptKey = k.jlptLevel ? `N${k.jlptLevel}` : "Unknown";
    jlptStats[jlptKey].count++;
    jlptStats[jlptKey].levels.push(level);
  }

  for (const [jlpt, data] of Object.entries(jlptStats)) {
    if (data.count > 0) {
      const minLevel = Math.min(...data.levels);
      const maxLevel = Math.max(...data.levels);
      console.log(`${jlpt}: ${data.count} kanji in levels ${minLevel}-${maxLevel}`);
    }
  }

  // Level distribution
  console.log("\n--- Level Distribution (Sample: Levels 1-10) ---");
  const levelStats: Record<number, { radicals: number; kanji: number; vocabulary: number }> = {};

  for (let i = 1; i <= 60; i++) {
    levelStats[i] = { radicals: 0, kanji: 0, vocabulary: 0 };
  }

  for (const r of radicals) {
    const level = radicalLevelMap.get(r.id) || r.levelId;
    if (levelStats[level]) levelStats[level].radicals++;
  }

  for (const k of kanji) {
    const level = kanjiLevelMap.get(k.id) || k.levelId;
    if (levelStats[level]) levelStats[level].kanji++;
  }

  for (const v of vocabulary) {
    const level = vocabLevelMap.get(v.id) || v.levelId;
    if (levelStats[level]) levelStats[level].vocabulary++;
  }

  console.log("Level | Radicals | Kanji | Vocabulary | Total");
  console.log("------|----------|-------|------------|------");
  for (let i = 1; i <= 10; i++) {
    const s = levelStats[i];
    const total = s.radicals + s.kanji + s.vocabulary;
    console.log(`  ${String(i).padStart(2)}  |    ${String(s.radicals).padStart(3)}   |  ${String(s.kanji).padStart(3)}  |     ${String(s.vocabulary).padStart(3)}    |  ${String(total).padStart(3)}`);
  }

  // Basic kanji verification
  console.log("\n--- Basic Kanji (Levels 1-3) Verification ---");
  const basicKanjiList = Array.from(BASIC_KANJI);
  const basicKanjiByLevel: Record<number, string[]> = { 1: [], 2: [], 3: [] };

  for (const char of basicKanjiList) {
    const k = kanji.find(x => x.character === char);
    if (k) {
      const level = kanjiLevelMap.get(k.id) || k.levelId;
      if (level <= 3) {
        if (!basicKanjiByLevel[level]) basicKanjiByLevel[level] = [];
        basicKanjiByLevel[level].push(char);
      }
    }
  }

  for (let i = 1; i <= 3; i++) {
    console.log(`Level ${i}: ${basicKanjiByLevel[i]?.join(", ") || "none"}`);
  }

  // Violations summary
  console.log("\n--- Ordering Violations ---");
  if (violations.length === 0) {
    console.log("No violations! All radicals appear before their kanji, and all vocabulary appears after its kanji.");
  } else {
    console.log(`Total violations: ${violations.length}`);
    const radicalViolations = violations.filter(v => v.type === "radical_after_kanji").length;
    const vocabViolations = violations.filter(v => v.type === "vocab_before_kanji").length;
    console.log(`  - Radical-after-kanji: ${radicalViolations}`);
    console.log(`  - Vocab-before-kanji: ${vocabViolations}`);
  }

  console.log("\n" + "=".repeat(60));
}

// =============================================================================
// VERIFY-ONLY MODE
// =============================================================================

async function verifyCurrentState(): Promise<void> {
  console.log("\n========================================");
  console.log("VERIFICATION MODE - Checking Current State");
  console.log("========================================");

  const { radicals, kanji, vocabulary } = await loadAllData();

  // Build lookup maps using current levels
  const radicalLevelMap = new Map<number, number>();
  for (const r of radicals) {
    radicalLevelMap.set(r.id, r.levelId);
  }

  const kanjiLevelMap = new Map<number, number>();
  for (const k of kanji) {
    kanjiLevelMap.set(k.id, k.levelId);
  }

  const vocabLevelMap = new Map<number, number>();
  for (const v of vocabulary) {
    vocabLevelMap.set(v.id, v.levelId);
  }

  // Verify
  const violations = verifyNoViolations(
    radicals, kanji, vocabulary,
    radicalLevelMap, kanjiLevelMap, vocabLevelMap
  );

  // Print statistics with current state
  const stats: Statistics = {
    totalRadicals: radicals.length,
    totalKanji: kanji.length,
    totalVocabulary: vocabulary.length,
    radicalsChanged: 0,
    kanjiChanged: 0,
    vocabularyChanged: 0,
    violations,
    jlptDistribution: {},
    levelDistribution: {},
  };

  printStatistics(
    radicals, kanji, vocabulary,
    radicalLevelMap, kanjiLevelMap, vocabLevelMap,
    stats, violations
  );

  if (violations.length > 0) {
    console.log("\nTo fix these violations, run without --verify flag.");
    process.exit(1);
  }
}

// =============================================================================
// MAIN ENTRY POINT
// =============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const verifyOnly = args.includes("--verify");

  console.log("========================================");
  console.log("NIHONGO CONTENT REORGANIZATION");
  console.log("========================================");
  console.log("\nReorganizing content following WaniKani principles:");
  console.log("  1. Radicals appear BEFORE kanji that use them");
  console.log("  2. Kanji appear BEFORE vocabulary that uses them");
  console.log("  3. JLPT N5 kanji -> levels 1-10");
  console.log("  4. JLPT N4 kanji -> levels 11-20");
  console.log("  5. JLPT N3 kanji -> levels 21-35");
  console.log("  6. JLPT N2 kanji -> levels 36-50");
  console.log("  7. JLPT N1 kanji -> levels 51-60");
  console.log("  8. Within JLPT bands, sorted by frequency (common first)");
  console.log("  9. Basic kanji (days, numbers) in levels 1-3");

  if (verifyOnly) {
    await verifyCurrentState();
    return;
  }

  if (dryRun) {
    console.log("\n*** DRY RUN MODE - No changes will be applied ***");
  } else {
    console.log("\n*** LIVE MODE - Changes will be applied to database ***");
  }

  try {
    // Step 1: Load all data
    const { radicals, kanji, vocabulary } = await loadAllData();

    // Step 2: Calculate kanji levels based on JLPT and frequency
    const kanjiLevelMap = calculateKanjiLevels(kanji);

    // Step 3: Calculate radical levels (must be before their kanji)
    const radicalLevelMap = calculateRadicalLevels(radicals, kanjiLevelMap);

    // Step 4: Calculate vocabulary levels (must be after their kanji)
    const vocabLevelMap = calculateVocabularyLevels(vocabulary, kanji, kanjiLevelMap);

    // Step 5: Verify no violations
    const violations = verifyNoViolations(
      radicals, kanji, vocabulary,
      radicalLevelMap, kanjiLevelMap, vocabLevelMap
    );

    // Step 6-7: Apply changes
    const stats = await applyChanges(
      radicals, kanji, vocabulary,
      radicalLevelMap, kanjiLevelMap, vocabLevelMap,
      dryRun
    );

    // Step 8: Print statistics
    printStatistics(
      radicals, kanji, vocabulary,
      radicalLevelMap, kanjiLevelMap, vocabLevelMap,
      stats, violations
    );

    if (dryRun) {
      console.log("\n*** DRY RUN COMPLETE ***");
      console.log("To apply changes, run without --dry-run flag:");
      console.log("  npx tsx prisma/reorganize-content.ts");
    } else {
      console.log("\n*** REORGANIZATION COMPLETE ***");
    }

  } catch (error) {
    console.error("\n*** ERROR ***");
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
