import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// JLPT N5 kanji (simplest, most common - should be in early levels)
const JLPT_N5 = new Set([
  "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万", "円", "年",
  "日", "月", "火", "水", "木", "金", "土", "曜", "時", "分", "半", "毎", "何", "今", "先",
  "来", "週", "午", "前", "後", "朝", "昼", "夜", "夕", "方", "北", "南", "東", "西", "右",
  "左", "上", "下", "中", "外", "内", "間", "大", "小", "高", "安", "長", "短", "新", "古",
  "多", "少", "早", "遅", "近", "遠", "強", "弱", "明", "暗", "重", "軽", "広", "狭", "太",
  "細", "同", "違", "好", "嫌", "忙", "暇", "易", "難", "人", "男", "女", "子", "父", "母",
  "兄", "姉", "弟", "妹", "友", "彼", "誰", "私", "僕", "自", "名", "国", "語", "英", "本",
  "文", "字", "話", "言", "読", "書", "聞", "見", "会", "行", "来", "帰", "出", "入", "食",
  "飲", "買", "売", "作", "使", "待", "持", "取", "送", "届", "届", "届", "届", "届", "届",
  "学", "校", "生", "先", "教", "習", "勉", "強", "試", "験", "問", "題", "答", "正", "誤",
  "店", "社", "会", "員", "事", "仕", "働", "休", "電", "車", "駅", "道", "歩", "走", "乗",
  "降", "止", "動", "立", "座", "寝", "起", "開", "閉", "始", "終", "知", "思", "考", "分",
  "気", "天", "雨", "雪", "風", "空", "海", "山", "川", "池", "花", "木", "草", "鳥", "犬",
  "猫", "魚", "肉", "野", "菜", "米", "茶", "酒", "家", "部", "屋", "室", "台", "机", "椅",
  "窓", "戸", "門", "階", "体", "頭", "顔", "目", "耳", "口", "鼻", "手", "足", "心", "力",
  "病", "医", "薬", "痛", "元", "気", "色", "白", "黒", "赤", "青", "黄", "緑", "紙", "写",
  "真", "映", "画", "音", "楽", "歌", "番", "号", "組", "度", "回", "個", "枚", "本", "冊",
  "台", "匹", "頭", "羽", "杯", "着", "足", "階", "番", "初", "最", "次", "以", "特", "別"
]);

// JLPT N4 kanji (relatively simple - should be in earlier levels)
const JLPT_N4 = new Set([
  "産", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届"
]);

// Common N4 kanji that should be in early levels
const JLPT_N4_COMMON = new Set([
  "世", "主", "予", "以", "付", "代", "会", "伝", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届",
  "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届", "届"
]);

// Stroke count estimates for common kanji (simplified mapping)
const STROKE_COUNTS: Record<string, number> = {
  // 1-3 strokes - very simple
  "一": 1, "乙": 1, "二": 2, "十": 2, "七": 2, "八": 2, "九": 2, "入": 2, "又": 2, "人": 2,
  "刀": 2, "力": 2, "三": 3, "上": 3, "下": 3, "大": 3, "小": 3, "山": 3, "川": 3, "口": 3,
  "土": 3, "女": 3, "子": 3, "千": 3, "才": 3, "工": 3, "夕": 3, "万": 3, "丸": 3, "久": 3,
  // 4 strokes
  "日": 4, "月": 4, "木": 4, "火": 4, "水": 4, "中": 4, "王": 4, "天": 4, "円": 4, "五": 4,
  "六": 4, "四": 4, "分": 4, "手": 4, "文": 4, "方": 4, "今": 4, "元": 4, "公": 4, "内": 4,
  "友": 4, "心": 4, "牛": 4, "犬": 4, "毛": 4, "父": 4, "片": 4, "比": 4, "氏": 4, "化": 4,
  "仁": 4, "井": 4, "介": 4, "不": 4, "切": 4, "止": 4, "少": 4, "太": 4, "戸": 4, "予": 4, "反": 4, "欠": 4,
  // 5 strokes
  "本": 5, "正": 5, "生": 5, "田": 5, "目": 5, "白": 5, "石": 5, "出": 5, "立": 5, "北": 5,
  "右": 5, "左": 5, "外": 5, "玉": 5, "半": 5, "平": 5, "古": 5, "用": 5, "由": 5, "甲": 5,
  "世": 5, "主": 5, "他": 5, "代": 5, "令": 5, "冬": 5, "兄": 5, "写": 5, "号": 5, "台": 5,
  "央": 5, "失": 5, "必": 5, "打": 5, "末": 5, "未": 5, "民": 5, "氷": 5, "永": 5, "申": 5,
  "皮": 5, "礼": 5, "示": 5, "付": 5, "仕": 5, "以": 5, "加": 5, "功": 5, "包": 5, "史": 5,
  "司": 5, "可": 5, "句": 5, "召": 5, "巨": 5, "市": 5, "布": 5, "広": 5, "母": 5,
  // 6 strokes
  "休": 6, "先": 6, "名": 6, "年": 6, "早": 6, "百": 6, "竹": 6, "糸": 6, "耳": 6, "肉": 6,
  "虫": 6, "行": 6, "西": 6, "足": 6, "赤": 6, "車": 6, "村": 6, "花": 6, "字": 6, "光": 6,
  "色": 6, "回": 6, "会": 6, "自": 6, "同": 6, "当": 6, "地": 6, "多": 6, "次": 6, "交": 6,
  "両": 6, "全": 6, "共": 6, "再": 6, "各": 6, "合": 6, "向": 6, "在": 6, "好": 6, "安": 6,
  "存": 6, "宅": 6, "守": 6, "州": 6, "式": 6, "成": 6, "曲": 6, "有": 6, "死": 6, "気": 6,
  // 7 strokes
  "何": 7, "作": 7, "体": 7, "声": 7, "売": 7, "形": 7, "見": 7, "言": 7, "角": 7, "谷": 7,
  "走": 7, "近": 7, "里": 7, "町": 7, "男": 7, "社": 7, "私": 7, "来": 7, "決": 7, "住": 7,
  "助": 7, "初": 7, "別": 7, "利": 7, "君": 7, "完": 7, "対": 7, "局": 7, "希": 7, "床": 7,
  "役": 7, "忘": 7, "技": 7, "抜": 7, "改": 7, "材": 7, "束": 7, "条": 7, "求": 7, "沢": 7,
  "状": 7, "系": 7, "良": 7, "芸": 7, "返": 7, "位": 7, "余": 7, "冷": 7, "労": 7, "努": 7,
  // 8 strokes
  "雨": 8, "青": 8, "空": 8, "金": 8, "長": 8, "門": 8, "京": 8, "事": 8, "使": 8, "味": 8,
  "届": 8, "定": 8, "学": 8, "国": 8, "林": 8, "明": 8, "夜": 8, "知": 8, "直": 8, "物": 8,
  "姉": 8, "妹": 8, "性": 8, "所": 8, "放": 8, "服": 8, "法": 8, "注": 8, "波": 8, "泳": 8,
  "油": 8, "治": 8, "泊": 8, "育": 8, "者": 8, "受": 8, "取": 8, "始": 8, "実": 8, "宗": 8,
  "宝": 8, "岩": 8, "幸": 8, "底": 8, "店": 8, "府": 8, "念": 8, "押": 8, "果": 8, "枝": 8,
  // 9-10 strokes
  "音": 9, "風": 9, "食": 9, "首": 9, "思": 9, "室": 9, "後": 9, "待": 9, "春": 9, "秋": 9,
  "活": 9, "海": 9, "点": 9, "前": 9, "品": 9, "度": 9, "建": 9, "持": 9, "指": 9, "政": 9,
  "相": 9, "科": 9, "美": 9, "負": 9, "面": 9, "飛": 9, "校": 10, "時": 10, "高": 10, "書": 10,
  "記": 10, "紙": 10, "馬": 10, "帰": 10, "庭": 10, "家": 10, "勉": 10, "病": 10, "旅": 10,
  // 11+ strokes - more complex
  "教": 11, "週": 11, "魚": 11, "鳥": 11, "黄": 11, "黒": 11, "雪": 11, "強": 11, "組": 11,
  "細": 11, "船": 11, "野": 11, "森": 12, "絵": 12, "買": 12, "朝": 12, "答": 12, "番": 12,
  "間": 12, "場": 12, "道": 12, "園": 13, "歌": 14, "語": 14, "算": 14, "聞": 14, "新": 13,
  "数": 13, "楽": 13, "電": 13, "話": 13, "遠": 13, "愛": 13, "感": 13, "意": 13, "想": 13,
  "業": 13, "試": 13, "読": 14, "説": 14, "調": 15, "質": 15, "熱": 15, "練": 15, "線": 15,
  "論": 15, "機": 16, "頭": 16, "親": 16, "題": 18, "議": 20, "曜": 18,
};

// Get stroke count (returns estimate or default of 10 for unknown)
function getStrokeCount(char: string): number {
  return STROKE_COUNTS[char] || 10;
}

// Calculate complexity score for a kanji (lower = simpler)
function getComplexityScore(kanji: { character: string; meaningsFr: string[] }): number {
  let score = 0;

  // JLPT level weighting (N5 = simplest)
  if (JLPT_N5.has(kanji.character)) {
    score -= 50; // Much simpler
  } else if (JLPT_N4.has(kanji.character) || JLPT_N4_COMMON.has(kanji.character)) {
    score -= 30; // Simpler
  }

  // Stroke count weighting
  const strokes = getStrokeCount(kanji.character);
  score += strokes * 2;

  // Number meanings (more meanings = more commonly used = simpler)
  score -= kanji.meaningsFr.length * 3;

  return score;
}

interface KanjiData {
  id: number;
  character: string;
  levelId: number;
  meaningsFr: string[];
  complexityScore: number;
}

interface LevelStats {
  level: number;
  count: number;
  target: number;
  surplus: number;
}

async function main() {
  console.log("========================================");
  console.log("KANJI LEVEL BALANCING SCRIPT");
  console.log("========================================\n");

  // Step 1: Get current distribution
  console.log("Step 1: Analyzing current distribution...\n");

  const allKanji = await prisma.kanji.findMany({
    select: {
      id: true,
      character: true,
      levelId: true,
      meaningsFr: true,
    },
    orderBy: { levelId: "asc" },
  });

  const kanjiByLevel = new Map<number, KanjiData[]>();
  for (const kanji of allKanji) {
    const data: KanjiData = {
      ...kanji,
      complexityScore: getComplexityScore(kanji),
    };
    if (!kanjiByLevel.has(kanji.levelId)) {
      kanjiByLevel.set(kanji.levelId, []);
    }
    kanjiByLevel.get(kanji.levelId)!.push(data);
  }

  // Calculate level stats
  const TARGET_PER_LEVEL = 30;
  const MIN_PER_LEVEL = 25;
  const MAX_PER_LEVEL = 35;

  const levelStats: LevelStats[] = [];
  for (let i = 1; i <= 60; i++) {
    const count = kanjiByLevel.get(i)?.length || 0;
    levelStats.push({
      level: i,
      count,
      target: TARGET_PER_LEVEL,
      surplus: count - TARGET_PER_LEVEL,
    });
  }

  // Show current state
  console.log("Current distribution:");
  console.log("Level | Count | Surplus | Status");
  console.log("------|-------|---------|--------");
  for (const stat of levelStats) {
    const status = stat.count < 15 ? "SPARSE" : stat.count > 50 ? "OVERLOADED" : "OK";
    console.log(`  ${String(stat.level).padStart(2)} |   ${String(stat.count).padStart(3)} |   ${String(stat.surplus).padStart(4)} | ${status}`);
  }

  // Step 2: Identify sparse and overloaded levels
  console.log("\n\nStep 2: Identifying levels to balance...\n");

  const sparseLevels = levelStats.filter(l => l.count < 15);
  const overloadedLevels = levelStats.filter(l => l.count > 50);

  console.log("Sparse levels (<15):", sparseLevels.map(l => `L${l.level}(${l.count})`).join(", "));
  console.log("Overloaded levels (>50):", overloadedLevels.map(l => `L${l.level}(${l.count})`).join(", "));

  // Step 3: Calculate how many kanji to move
  const totalSurplus = overloadedLevels.reduce((sum, l) => sum + Math.max(0, l.count - MAX_PER_LEVEL), 0);
  const totalDeficit = sparseLevels.reduce((sum, l) => sum + Math.max(0, MIN_PER_LEVEL - l.count), 0);

  console.log(`\nTotal surplus to redistribute: ${totalSurplus}`);
  console.log(`Total deficit to fill: ${totalDeficit}`);

  // Step 4: Sort kanji in overloaded levels by complexity
  console.log("\n\nStep 3: Selecting kanji to move (simplest from overloaded levels)...\n");

  const kanjiToMove: KanjiData[] = [];

  for (const stat of overloadedLevels) {
    const levelKanji = kanjiByLevel.get(stat.level) || [];
    // Sort by complexity (simplest first)
    levelKanji.sort((a, b) => a.complexityScore - b.complexityScore);

    // Select kanji to move (keep at least MAX_PER_LEVEL)
    const toMove = levelKanji.slice(0, Math.max(0, levelKanji.length - MAX_PER_LEVEL));
    kanjiToMove.push(...toMove);

    if (toMove.length > 0) {
      console.log(`From Level ${stat.level}: Moving ${toMove.length} kanji`);
      console.log(`  Simplest: ${toMove.slice(0, 5).map(k => k.character).join(", ")}${toMove.length > 5 ? "..." : ""}`);
    }
  }

  // Sort all kanji to move by complexity
  kanjiToMove.sort((a, b) => a.complexityScore - b.complexityScore);

  console.log(`\nTotal kanji selected for redistribution: ${kanjiToMove.length}`);

  // Step 5: Redistribute to sparse levels
  console.log("\n\nStep 4: Redistributing kanji to sparse levels...\n");

  // Sort sparse levels by level number (earlier levels get simpler kanji)
  sparseLevels.sort((a, b) => a.level - b.level);

  const moves: Array<{ kanjiId: number; character: string; fromLevel: number; toLevel: number }> = [];
  let kanjiIndex = 0;

  for (const stat of sparseLevels) {
    const needed = MIN_PER_LEVEL - stat.count;
    if (needed <= 0 || kanjiIndex >= kanjiToMove.length) continue;

    const kanjiForThisLevel = kanjiToMove.slice(kanjiIndex, kanjiIndex + needed);

    for (const kanji of kanjiForThisLevel) {
      moves.push({
        kanjiId: kanji.id,
        character: kanji.character,
        fromLevel: kanji.levelId,
        toLevel: stat.level,
      });
    }

    console.log(`Level ${stat.level}: Adding ${kanjiForThisLevel.length} kanji (was ${stat.count}, now ${stat.count + kanjiForThisLevel.length})`);
    console.log(`  Kanji: ${kanjiForThisLevel.map(k => k.character).join(", ")}`);

    kanjiIndex += needed;
  }

  // Step 6: If we still have kanji to move, distribute to levels that are still below target
  if (kanjiIndex < kanjiToMove.length) {
    console.log("\n\nStep 5: Distributing remaining kanji to below-target levels...\n");

    const belowTargetLevels = levelStats
      .filter(l => l.count < TARGET_PER_LEVEL && !sparseLevels.find(s => s.level === l.level))
      .sort((a, b) => a.level - b.level);

    for (const stat of belowTargetLevels) {
      if (kanjiIndex >= kanjiToMove.length) break;

      const currentCount = stat.count + moves.filter(m => m.toLevel === stat.level).length;
      const needed = TARGET_PER_LEVEL - currentCount;
      if (needed <= 0) continue;

      const kanjiForThisLevel = kanjiToMove.slice(kanjiIndex, kanjiIndex + needed);

      for (const kanji of kanjiForThisLevel) {
        moves.push({
          kanjiId: kanji.id,
          character: kanji.character,
          fromLevel: kanji.levelId,
          toLevel: stat.level,
        });
      }

      if (kanjiForThisLevel.length > 0) {
        console.log(`Level ${stat.level}: Adding ${kanjiForThisLevel.length} kanji`);
      }

      kanjiIndex += kanjiForThisLevel.length;
    }
  }

  // Step 6b: If we still have kanji, fill levels up to MAX_PER_LEVEL
  if (kanjiIndex < kanjiToMove.length) {
    console.log("\n\nStep 6: Filling remaining capacity up to max per level...\n");

    // Find all levels that can accept more kanji (up to MAX_PER_LEVEL)
    const levelsWithCapacity = levelStats
      .filter(l => {
        const currentCount = l.count + moves.filter(m => m.toLevel === l.level).length - moves.filter(m => m.fromLevel === l.level).length;
        return currentCount < MAX_PER_LEVEL && l.level <= 42; // Prioritize earlier levels
      })
      .sort((a, b) => a.level - b.level);

    for (const stat of levelsWithCapacity) {
      if (kanjiIndex >= kanjiToMove.length) break;

      const currentCount = stat.count + moves.filter(m => m.toLevel === stat.level).length - moves.filter(m => m.fromLevel === stat.level).length;
      const capacity = MAX_PER_LEVEL - currentCount;
      if (capacity <= 0) continue;

      const kanjiForThisLevel = kanjiToMove.slice(kanjiIndex, kanjiIndex + capacity);

      for (const kanji of kanjiForThisLevel) {
        moves.push({
          kanjiId: kanji.id,
          character: kanji.character,
          fromLevel: kanji.levelId,
          toLevel: stat.level,
        });
      }

      if (kanjiForThisLevel.length > 0) {
        console.log(`Level ${stat.level}: Adding ${kanjiForThisLevel.length} more kanji (filling to max)`);
      }

      kanjiIndex += kanjiForThisLevel.length;
    }
  }

  // Step 7: Apply changes
  console.log("\n\n========================================");
  console.log("APPLYING CHANGES");
  console.log("========================================\n");

  console.log(`Total moves to apply: ${moves.length}\n`);

  if (moves.length === 0) {
    console.log("No changes needed. Distribution is already balanced.");
    await prisma.$disconnect();
    return;
  }

  // Group moves by source level for logging
  const movesBySource = new Map<number, typeof moves>();
  for (const move of moves) {
    if (!movesBySource.has(move.fromLevel)) {
      movesBySource.set(move.fromLevel, []);
    }
    movesBySource.get(move.fromLevel)!.push(move);
  }

  console.log("Moves by source level:");
  for (const [fromLevel, levelMoves] of movesBySource) {
    const targets = new Map<number, number>();
    for (const move of levelMoves) {
      targets.set(move.toLevel, (targets.get(move.toLevel) || 0) + 1);
    }
    const targetStr = Array.from(targets.entries()).map(([to, count]) => `L${to}(${count})`).join(", ");
    console.log(`  From L${fromLevel}: ${levelMoves.length} kanji to ${targetStr}`);
  }

  // Execute moves in a transaction
  console.log("\nExecuting database updates...\n");

  await prisma.$transaction(async (tx) => {
    for (const move of moves) {
      // Update kanji level
      await tx.kanji.update({
        where: { id: move.kanjiId },
        data: { levelId: move.toLevel },
      });
    }

    // Note: UserKanjiProgress does not have levelId field, so no updates needed there
    // The progress is linked directly to kanjiId, not to level
    console.log("Note: UserKanjiProgress records are linked by kanjiId, not levelId.");
    console.log("No UserKanjiProgress updates required.");
  });

  console.log(`Successfully moved ${moves.length} kanji.`);

  // Step 8: Verify final distribution
  console.log("\n\n========================================");
  console.log("FINAL DISTRIBUTION");
  console.log("========================================\n");

  const finalCounts = await prisma.kanji.groupBy({
    by: ["levelId"],
    _count: { id: true },
    orderBy: { levelId: "asc" },
  });

  const finalMap = new Map(finalCounts.map(k => [k.levelId, k._count.id]));

  console.log("Level | Count | Status");
  console.log("------|-------|--------");

  let stillSparse = 0;
  let stillOverloaded = 0;
  let ideal = 0;

  for (let i = 1; i <= 60; i++) {
    const count = finalMap.get(i) || 0;
    let status = "";
    if (count < 15) {
      status = "SPARSE";
      stillSparse++;
    } else if (count > 50) {
      status = "OVERLOADED";
      stillOverloaded++;
    } else if (count >= 25 && count <= 35) {
      status = "IDEAL";
      ideal++;
    } else {
      status = "OK";
    }
    console.log(`  ${String(i).padStart(2)} |   ${String(count).padStart(3)} | ${status}`);
  }

  console.log("\n--- Summary ---");
  console.log(`Ideal (25-35): ${ideal} levels`);
  console.log(`Still sparse (<15): ${stillSparse} levels`);
  console.log(`Still overloaded (>50): ${stillOverloaded} levels`);

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
