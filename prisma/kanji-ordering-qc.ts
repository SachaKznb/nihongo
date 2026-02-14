import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Utility to get stroke count for a kanji character
function getStrokeCount(char: string): number {
  const strokeCounts: Record<string, number> = {
    // 1 stroke
    "一": 1, "乙": 1,
    // 2 strokes
    "二": 2, "十": 2, "七": 2, "八": 2, "九": 2, "入": 2, "又": 2, "人": 2, "刀": 2, "力": 2,
    // 3 strokes
    "三": 3, "上": 3, "下": 3, "大": 3, "小": 3, "山": 3, "川": 3, "口": 3, "土": 3, "女": 3, "子": 3, "千": 3, "才": 3, "工": 3, "夕": 3, "万": 3, "丸": 3, "久": 3,
    // 4 strokes
    "日": 4, "月": 4, "木": 4, "火": 4, "水": 4, "中": 4, "王": 4, "天": 4, "円": 4, "五": 4, "六": 4, "四": 4, "分": 4, "手": 4, "文": 4, "方": 4, "今": 4, "元": 4, "公": 4, "内": 4, "友": 4, "心": 4, "牛": 4, "犬": 4, "毛": 4, "父": 4, "片": 4, "比": 4, "氏": 4, "化": 4, "仁": 4, "井": 4, "介": 4, "不": 4, "切": 4, "止": 4, "少": 4, "太": 4, "戸": 4, "予": 4, "反": 4, "欠": 4,
    // 5 strokes
    "本": 5, "正": 5, "生": 5, "田": 5, "目": 5, "白": 5, "石": 5, "出": 5, "立": 5, "北": 5, "右": 5, "左": 5, "外": 5, "玉": 5, "半": 5, "平": 5, "古": 5, "用": 5, "由": 5, "甲": 5, "世": 5, "主": 5, "他": 5, "代": 5, "令": 5, "冬": 5, "兄": 5, "写": 5, "号": 5, "台": 5, "央": 5, "失": 5, "必": 5, "打": 5, "末": 5, "未": 5, "民": 5, "氷": 5, "永": 5, "申": 5, "皮": 5, "礼": 5, "示": 5, "付": 5, "仕": 5, "以": 5, "加": 5, "功": 5, "包": 5, "史": 5, "司": 5, "可": 5, "句": 5, "召": 5, "巨": 5, "市": 5, "布": 5, "広": 5, "母": 5,
    // 6 strokes
    "休": 6, "先": 6, "名": 6, "年": 6, "早": 6, "百": 6, "竹": 6, "糸": 6, "耳": 6, "肉": 6, "虫": 6, "行": 6, "西": 6, "足": 6, "赤": 6, "車": 6, "村": 6, "花": 6, "字": 6, "光": 6, "色": 6, "回": 6, "会": 6, "自": 6, "同": 6, "当": 6, "地": 6, "多": 6, "次": 6, "交": 6, "両": 6, "全": 6, "共": 6, "再": 6, "各": 6, "合": 6, "向": 6, "在": 6, "好": 6, "安": 6, "存": 6, "宅": 6, "守": 6, "州": 6, "式": 6, "成": 6, "曲": 6, "有": 6, "死": 6, "気": 6, "汚": 6, "灰": 6, "羊": 6, "米": 6, "老": 6, "羽": 6, "考": 6, "肌": 6, "血": 6, "舌": 6, "舟": 6, "衣": 6, "争": 6, "伝": 6, "仲": 6, "件": 6, "任": 6, "企": 6, "伏": 6, "充": 6, "兆": 6, "刑": 6, "印": 6, "危": 6, "吉": 6, "吸": 6, "因": 6, "団": 6, "圧": 6, "壮": 6, "宇": 6, "収": 6,
    // 7 strokes
    "何": 7, "作": 7, "体": 7, "声": 7, "売": 7, "形": 7, "見": 7, "言": 7, "角": 7, "谷": 7, "走": 7, "近": 7, "里": 7, "町": 7, "男": 7, "社": 7, "私": 7, "来": 7, "決": 7, "住": 7, "助": 7, "初": 7, "別": 7, "利": 7, "君": 7, "含": 7, "困": 7, "完": 7, "対": 7, "局": 7, "希": 7, "床": 7, "役": 7, "忘": 7, "技": 7, "抜": 7, "改": 7, "材": 7, "束": 7, "条": 7, "求": 7, "沢": 7, "状": 7, "系": 7, "肝": 7, "良": 7, "芸": 7, "返": 7, "位": 7, "余": 7, "冷": 7, "労": 7, "努": 7, "励": 7, "吹": 7, "告": 7, "囲": 7, "坂": 7, "妙": 7, "孝": 7, "寿": 7, "序": 7, "忍": 7, "応": 7, "快": 7, "戒": 7, "抗": 7, "攻": 7, "更": 7, "杉": 7, "沈": 7, "没": 7, "災": 7, "狂": 7, "秀": 7, "究": 7,
    // 8 strokes
    "雨": 8, "青": 8, "空": 8, "金": 8, "長": 8, "門": 8, "京": 8, "事": 8, "使": 8, "味": 8, "届": 8, "定": 8,
    "学": 8, "国": 8, "林": 8, "明": 8, "夜": 8, "知": 8, "直": 8, "物": 8, "姉": 8, "妹": 8, "性": 8, "所": 8, "放": 8, "服": 8, "法": 8, "注": 8, "波": 8, "泳": 8, "油": 8, "治": 8, "泊": 8, "育": 8, "者": 8, "受": 8, "取": 8, "始": 8, "委": 8, "季": 8, "実": 8, "宗": 8, "宝": 8, "岩": 8, "幸": 8, "底": 8, "店": 8, "府": 8, "忠": 8, "念": 8, "怪": 8, "房": 8, "押": 8, "抱": 8, "披": 8, "拓": 8, "拘": 8, "斉": 8, "昆": 8, "昇": 8, "昔": 8, "易": 8, "松": 8, "析": 8, "枕": 8, "果": 8, "枝": 8, "板": 8, "泉": 8, "河": 8, "沿": 8, "況": 8, "炎": 8, "版": 8, "牧": 8, "画": 8, "的": 8, "祈": 8, "突": 8, "肥": 8, "股": 8, "肩": 8, "舎": 8, "苗": 8, "英": 8, "茂": 8, "虎": 8, "非": 8,
    // 9 strokes
    "音": 9, "風": 9, "食": 9, "首": 9, "思": 9, "室": 9, "後": 9, "待": 9, "春": 9, "秋": 9, "活": 9, "海": 9, "点": 9, "前": 9, "品": 9, "度": 9, "建": 9, "持": 9, "指": 9, "政": 9, "相": 9, "科": 9, "美": 9, "負": 9, "面": 9, "飛": 9, "係": 9, "信": 9, "保": 9, "便": 9, "則": 9, "勇": 9, "南": 9, "変": 9, "城": 9, "姿": 9, "威": 9, "客": 9, "宣": 9, "屋": 9, "帝": 9, "急": 9, "怒": 9, "恋": 9, "故": 9, "星": 9, "映": 9, "柔": 9, "染": 9, "査": 9, "段": 9, "洗": 9, "派": 9, "浄": 9, "津": 9, "炭": 9, "狭": 9, "界": 9, "発": 9, "省": 9, "研": 9, "砂": 9, "祖": 9, "秒": 9, "紀": 9, "約": 9, "背": 9, "胞": 9, "要": 9, "計": 9, "訂": 9, "軌": 9, "迷": 9, "退": 9, "限": 9, "革": 9,
    // 10+ strokes
    "校": 10, "時": 10, "高": 10, "書": 10, "記": 10, "紙": 10, "馬": 10, "帰": 10, "庭": 10, "教": 11, "週": 11, "魚": 11, "鳥": 11, "黄": 11, "黒": 11, "雪": 11, "曜": 18, "親": 16, "読": 14, "電": 13, "話": 13, "道": 12, "遠": 13, "園": 13, "歌": 14, "語": 14, "算": 14, "聞": 14, "新": 13, "数": 13, "楽": 13, "森": 12, "絵": 12, "買": 12, "朝": 12, "答": 12, "番": 12, "間": 12, "場": 12, "勉": 10, "病": 10, "旅": 10, "家": 10, "強": 11, "組": 11, "細": 11, "船": 11, "野": 11,
    "愛": 13, "感": 13, "意": 13, "想": 13, "業": 13, "試": 13, "説": 14, "調": 15, "質": 15, "熱": 15, "練": 15, "線": 15, "論": 15,
    "機": 16, "頭": 16, "題": 18, "議": 20, "聴": 17, "類": 18,
    "部": 11, "動": 11, "開": 12, "問": 11, "理": 11,
  };
  return strokeCounts[char] || 0;
}

// JLPT N5 kanji list (most basic, ~80 kanji)
const JLPT_N5_KANJI = [
  "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万",
  "円", "年", "日", "月", "火", "水", "木", "金", "土", "曜", "時", "分", "半",
  "今", "何", "午", "前", "後", "毎", "週", "先", "来", "上", "下", "中", "外",
  "右", "左", "北", "南", "東", "西", "口", "出", "入", "大", "小", "高", "安",
  "新", "古", "長", "白", "人", "子", "女", "男", "父", "母", "友", "名", "学",
  "校", "生", "先", "会", "社", "電", "車", "駅", "国", "語", "本", "書", "読",
  "見", "聞", "話", "食", "飲", "行", "来", "帰", "休", "買", "書", "立", "天",
  "気", "雨", "山", "川", "花", "店"
];

// JLPT N1 kanji (most advanced) - sample of difficult kanji
const JLPT_N1_KANJI_SAMPLE = [
  "曖", "昧", "握", "扱", "宛", "嵐", "依", "威", "為", "畏", "萎", "偉", "慰",
  "遺", "緯", "壱", "逸", "芋", "姻", "陰", "隠", "韻", "渦", "浦", "詠", "影",
  "鋭", "疫", "悦", "謁", "越", "閲", "宴", "援", "炎", "煙", "猿", "縁", "艶",
  "鬼", "棄", "却", "喫", "虐", "窮", "脅", "斤", "勤", "謹", "琴", "緊", "駆",
  "朽", "愚", "偶", "隅", "靴", "掘", "薫", "刑", "契", "啓", "掲", "渓", "蛍",
  "慶", "憩", "鶏", "繁", "殖", "腐", "譜", "膨", "謀", "墨", "撲", "翻", "凡"
];

// Component kanji that should come before complex kanji
const BASIC_COMPONENT_KANJI = [
  "一", "二", "三", "口", "日", "月", "木", "火", "水", "金", "土", "山", "川",
  "田", "人", "大", "小", "上", "下", "中", "女", "子", "目", "手", "力", "王",
  "心", "言", "糸", "貝", "車", "門", "食", "馬"
];

// Basic numerals and basic kanji expected in levels 1-5
const FUNDAMENTAL_KANJI = [
  "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"
];

const BASIC_EARLY_KANJI = [
  "日", "月", "火", "水", "木", "金", "土", "大", "小", "中", "上", "下"
];

async function main() {
  console.log("================================================================================");
  console.log("KANJI ORDERING AND PROGRESSION QC REPORT");
  console.log("================================================================================\n");

  // ============================================
  // 1. TOTAL COUNTS AND OVERVIEW
  // ============================================
  console.log("1. DATABASE OVERVIEW");
  console.log("--------------------------------------------------------------------------------");

  const totalKanji = await prisma.kanji.count();
  const totalRadicals = await prisma.radical.count();
  const totalVocab = await prisma.vocabulary.count();
  const totalLevels = await prisma.level.count();

  console.log(`Total Kanji:      ${totalKanji}`);
  console.log(`Total Radicals:   ${totalRadicals}`);
  console.log(`Total Vocabulary: ${totalVocab}`);
  console.log(`Total Levels:     ${totalLevels}`);

  // ============================================
  // 2. ALL KANJI ORDERED BY LEVEL
  // ============================================
  console.log("\n\n2. KANJI ORDERED BY LEVEL (Sample per level)");
  console.log("--------------------------------------------------------------------------------");

  const allKanji = await prisma.kanji.findMany({
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
    include: {
      radicals: {
        include: { radical: true }
      }
    }
  });

  // Group by level
  const kanjiByLevel = new Map<number, typeof allKanji>();
  for (const k of allKanji) {
    if (!kanjiByLevel.has(k.levelId)) {
      kanjiByLevel.set(k.levelId, []);
    }
    kanjiByLevel.get(k.levelId)!.push(k);
  }

  console.log("\nLevel | Count | Sample Kanji (first 10)");
  console.log("------|-------|------------------------");
  for (let level = 1; level <= 60; level++) {
    const kanjiList = kanjiByLevel.get(level) || [];
    const sample = kanjiList.slice(0, 10).map(k => k.character).join("");
    console.log(`  ${String(level).padStart(2)}  |   ${String(kanjiList.length).padStart(3)} | ${sample}${kanjiList.length > 10 ? "..." : ""}`);
  }

  // ============================================
  // 3. JLPT N5 KANJI CHECK (should be in levels 1-10)
  // ============================================
  console.log("\n\n3. JLPT N5 KANJI CHECK (Should be in levels 1-10)");
  console.log("--------------------------------------------------------------------------------");

  const jlptN5Issues: { kanji: string; level: number }[] = [];
  const jlptN5Missing: string[] = [];
  const jlptN5InEarlyLevels: string[] = [];

  for (const kanjiChar of JLPT_N5_KANJI) {
    const found = allKanji.find(k => k.character === kanjiChar);
    if (!found) {
      jlptN5Missing.push(kanjiChar);
    } else if (found.levelId > 10) {
      jlptN5Issues.push({ kanji: kanjiChar, level: found.levelId });
    } else {
      jlptN5InEarlyLevels.push(kanjiChar);
    }
  }

  console.log(`\nJLPT N5 kanji in levels 1-10:     ${jlptN5InEarlyLevels.length}/${JLPT_N5_KANJI.length}`);
  console.log(`JLPT N5 kanji in later levels:    ${jlptN5Issues.length}`);
  console.log(`JLPT N5 kanji missing from DB:    ${jlptN5Missing.length}`);

  if (jlptN5Issues.length > 0) {
    console.log("\n[ISSUE] JLPT N5 kanji in LATE levels (should be levels 1-10):");
    for (const issue of jlptN5Issues) {
      console.log(`  - ${issue.kanji} is in level ${issue.level}`);
    }
  }

  if (jlptN5Missing.length > 0) {
    console.log("\n[INFO] JLPT N5 kanji NOT in database:");
    console.log(`  ${jlptN5Missing.join(", ")}`);
  }

  // ============================================
  // 4. JLPT DISTRIBUTION
  // ============================================
  console.log("\n\n4. JLPT LEVEL DISTRIBUTION");
  console.log("--------------------------------------------------------------------------------");

  const jlptCounts = await prisma.kanji.groupBy({
    by: ["jlptLevel"],
    _count: { id: true },
    orderBy: { jlptLevel: "desc" }
  });

  console.log("\nJLPT Level | Count | Percentage");
  console.log("-----------|-------|------------");
  for (const jc of jlptCounts) {
    const level = jc.jlptLevel === null ? "None" : `N${jc.jlptLevel}`;
    const pct = ((jc._count.id / totalKanji) * 100).toFixed(1);
    console.log(`    ${level.padStart(4)}   |  ${String(jc._count.id).padStart(4)} |    ${pct}%`);
  }

  // ============================================
  // 5. GRADE LEVEL DISTRIBUTION
  // ============================================
  console.log("\n\n5. JAPANESE SCHOOL GRADE DISTRIBUTION");
  console.log("--------------------------------------------------------------------------------");

  const gradeCounts = await prisma.kanji.groupBy({
    by: ["gradeLevel"],
    _count: { id: true },
    orderBy: { gradeLevel: "asc" }
  });

  console.log("\nGrade | Count | Description");
  console.log("------|-------|------------");
  const gradeDesc: Record<number, string> = {
    1: "Grade 1 (80 kanji)",
    2: "Grade 2 (160 kanji)",
    3: "Grade 3 (200 kanji)",
    4: "Grade 4 (200 kanji)",
    5: "Grade 5 (185 kanji)",
    6: "Grade 6 (181 kanji)",
    8: "Secondary school",
    9: "Jinmeiyou (names)"
  };
  for (const gc of gradeCounts) {
    const grade = gc.gradeLevel === null ? "None" : String(gc.gradeLevel);
    const desc = gc.gradeLevel !== null ? (gradeDesc[gc.gradeLevel] || "") : "Not assigned";
    console.log(`   ${grade.padStart(2)}  |  ${String(gc._count.id).padStart(4)} | ${desc}`);
  }

  // ============================================
  // 6. FUNDAMENTAL KANJI CHECK (一二三...十)
  // ============================================
  console.log("\n\n6. FUNDAMENTAL NUMBER KANJI CHECK (一二三四五六七八九十)");
  console.log("--------------------------------------------------------------------------------");

  const fundamentalIssues: { kanji: string; level: number; expected: string }[] = [];

  for (const kanjiChar of FUNDAMENTAL_KANJI) {
    const found = allKanji.find(k => k.character === kanjiChar);
    if (!found) {
      console.log(`  [MISSING] ${kanjiChar} is not in the database!`);
    } else if (found.levelId > 3) {
      fundamentalIssues.push({ kanji: kanjiChar, level: found.levelId, expected: "1-3" });
    } else {
      console.log(`  [OK] ${kanjiChar} is in level ${found.levelId}`);
    }
  }

  if (fundamentalIssues.length > 0) {
    console.log("\n[ISSUE] Number kanji in LATE levels (should be 1-3):");
    for (const issue of fundamentalIssues) {
      console.log(`  - ${issue.kanji} is in level ${issue.level}, expected levels ${issue.expected}`);
    }
  }

  // ============================================
  // 7. BASIC KANJI CHECK (日月火水木金土大小中上下)
  // ============================================
  console.log("\n\n7. BASIC KANJI CHECK (日月火水木金土大小中上下)");
  console.log("--------------------------------------------------------------------------------");

  const basicIssues: { kanji: string; level: number; expected: string }[] = [];

  for (const kanjiChar of BASIC_EARLY_KANJI) {
    const found = allKanji.find(k => k.character === kanjiChar);
    if (!found) {
      console.log(`  [MISSING] ${kanjiChar} is not in the database!`);
    } else if (found.levelId > 5) {
      basicIssues.push({ kanji: kanjiChar, level: found.levelId, expected: "1-5" });
    } else {
      console.log(`  [OK] ${kanjiChar} is in level ${found.levelId}`);
    }
  }

  if (basicIssues.length > 0) {
    console.log("\n[ISSUE] Basic kanji in LATE levels (should be 1-5):");
    for (const issue of basicIssues) {
      console.log(`  - ${issue.kanji} is in level ${issue.level}, expected levels ${issue.expected}`);
    }
  }

  // ============================================
  // 8. JLPT N1 KANJI IN EARLY LEVELS CHECK
  // ============================================
  console.log("\n\n8. JLPT N1 (ADVANCED) KANJI IN EARLY LEVELS CHECK");
  console.log("--------------------------------------------------------------------------------");

  const n1InEarlyLevels: { kanji: string; level: number; jlptLevel: number | null }[] = [];

  // Find all kanji with jlptLevel = 1 (N1) that are in levels 1-10
  const earlyN1Kanji = allKanji.filter(k => k.jlptLevel === 1 && k.levelId <= 10);

  // Also check sample N1 kanji
  for (const kanjiChar of JLPT_N1_KANJI_SAMPLE) {
    const found = allKanji.find(k => k.character === kanjiChar);
    if (found && found.levelId <= 10) {
      n1InEarlyLevels.push({ kanji: kanjiChar, level: found.levelId, jlptLevel: found.jlptLevel });
    }
  }

  // Add database N1 kanji in early levels
  for (const k of earlyN1Kanji) {
    if (!n1InEarlyLevels.find(x => x.kanji === k.character)) {
      n1InEarlyLevels.push({ kanji: k.character, level: k.levelId, jlptLevel: k.jlptLevel });
    }
  }

  if (n1InEarlyLevels.length > 0) {
    console.log(`\n[ISSUE] Found ${n1InEarlyLevels.length} JLPT N1 (advanced) kanji in levels 1-10:`);
    for (const issue of n1InEarlyLevels) {
      console.log(`  - ${issue.kanji} is in level ${issue.level} (JLPT N${issue.jlptLevel})`);
    }
  } else {
    console.log("\n[OK] No JLPT N1 kanji found in levels 1-10.");
  }

  // ============================================
  // 9. VISUAL COMPLEXITY PROGRESSION
  // ============================================
  console.log("\n\n9. VISUAL COMPLEXITY (STROKE COUNT) PROGRESSION");
  console.log("--------------------------------------------------------------------------------");

  const strokesByLevel = new Map<number, number[]>();
  let missingStrokeCount = 0;

  for (const k of allKanji) {
    let strokes = k.strokeCount || getStrokeCount(k.character);
    if (!strokes) {
      missingStrokeCount++;
      continue;
    }
    if (!strokesByLevel.has(k.levelId)) {
      strokesByLevel.set(k.levelId, []);
    }
    strokesByLevel.get(k.levelId)!.push(strokes);
  }

  console.log("\nLevel | Avg Strokes | Min | Max | Kanji");
  console.log("------|-------------|-----|-----|------");

  const avgByLevel: { level: number; avg: number }[] = [];
  const complexKanjiInEarlyLevels: { kanji: string; level: number; strokes: number }[] = [];
  const simpleKanjiInLateLevels: { kanji: string; level: number; strokes: number }[] = [];

  for (let level = 1; level <= 60; level++) {
    const strokes = strokesByLevel.get(level) || [];
    if (strokes.length > 0) {
      const avg = strokes.reduce((a, b) => a + b, 0) / strokes.length;
      const min = Math.min(...strokes);
      const max = Math.max(...strokes);
      avgByLevel.push({ level, avg });
      console.log(`  ${String(level).padStart(2)}  |     ${avg.toFixed(1).padStart(5)}   |  ${String(min).padStart(2)} |  ${String(max).padStart(2)} |   ${strokes.length}`);

      // Check for complex kanji (15+ strokes) in early levels (1-10)
      if (level <= 10 && max >= 15) {
        const complexInLevel = allKanji.filter(k =>
          k.levelId === level &&
          (k.strokeCount || getStrokeCount(k.character)) >= 15
        );
        for (const ck of complexInLevel) {
          complexKanjiInEarlyLevels.push({
            kanji: ck.character,
            level: ck.levelId,
            strokes: ck.strokeCount || getStrokeCount(ck.character)
          });
        }
      }

      // Check for simple kanji (1-3 strokes) in late levels (50+)
      if (level >= 50 && min <= 3) {
        const simpleInLevel = allKanji.filter(k =>
          k.levelId === level &&
          (k.strokeCount || getStrokeCount(k.character)) <= 3 &&
          (k.strokeCount || getStrokeCount(k.character)) > 0
        );
        for (const sk of simpleInLevel) {
          simpleKanjiInLateLevels.push({
            kanji: sk.character,
            level: sk.levelId,
            strokes: sk.strokeCount || getStrokeCount(sk.character)
          });
        }
      }
    }
  }

  console.log(`\nNote: ${missingStrokeCount} kanji have no stroke count data`);

  if (complexKanjiInEarlyLevels.length > 0) {
    console.log(`\n[ISSUE] Complex kanji (15+ strokes) in early levels (1-10):`);
    for (const issue of complexKanjiInEarlyLevels.slice(0, 20)) {
      console.log(`  - ${issue.kanji} (${issue.strokes} strokes) is in level ${issue.level}`);
    }
  }

  if (simpleKanjiInLateLevels.length > 0) {
    console.log(`\n[INFO] Very simple kanji (1-3 strokes) in late levels (50+):`);
    for (const issue of simpleKanjiInLateLevels.slice(0, 10)) {
      console.log(`  - ${issue.kanji} (${issue.strokes} strokes) is in level ${issue.level}`);
    }
  }

  // ============================================
  // 10. COMPONENT KANJI ORDERING CHECK
  // ============================================
  console.log("\n\n10. COMPONENT KANJI ORDERING CHECK");
  console.log("--------------------------------------------------------------------------------");
  console.log("Checking if kanji that are components of others come first...\n");

  // Build a map of which kanji use which radicals/components
  const kanjiComponents = new Map<string, { level: number; usedIn: string[] }>();

  for (const k of allKanji) {
    kanjiComponents.set(k.character, { level: k.levelId, usedIn: [] });
  }

  // Check component ordering for basic component kanji
  const componentOrderingIssues: { component: string; componentLevel: number; usedIn: string; usedInLevel: number }[] = [];

  for (const componentChar of BASIC_COMPONENT_KANJI) {
    const component = allKanji.find(k => k.character === componentChar);
    if (!component) continue;

    // Find kanji that might use this as a visual component
    // This is simplified - would need full radical mapping for accuracy
    for (const k of allKanji) {
      if (k.character === componentChar) continue;

      // Check if this kanji's radicals include the component character
      const usesComponent = k.radicals.some(r =>
        r.radical.character === componentChar
      );

      if (usesComponent && k.levelId < component.levelId) {
        componentOrderingIssues.push({
          component: componentChar,
          componentLevel: component.levelId,
          usedIn: k.character,
          usedInLevel: k.levelId
        });
      }
    }
  }

  if (componentOrderingIssues.length > 0) {
    console.log(`[ISSUE] Found ${componentOrderingIssues.length} cases where component kanji come AFTER kanji using them:`);
    for (const issue of componentOrderingIssues.slice(0, 20)) {
      console.log(`  - Component ${issue.component} (L${issue.componentLevel}) used in ${issue.usedIn} (L${issue.usedInLevel})`);
    }
  } else {
    console.log("[OK] Component kanji ordering looks correct.");
  }

  // ============================================
  // 11. LEVEL DISTRIBUTION BALANCE
  // ============================================
  console.log("\n\n11. LEVEL DISTRIBUTION BALANCE");
  console.log("--------------------------------------------------------------------------------");

  const kanjiPerLevel: number[] = [];
  for (let level = 1; level <= 60; level++) {
    kanjiPerLevel.push(kanjiByLevel.get(level)?.length || 0);
  }

  const avgPerLevel = totalKanji / 60;
  const minPerLevel = Math.min(...kanjiPerLevel.filter(n => n > 0));
  const maxPerLevel = Math.max(...kanjiPerLevel);
  const emptyLevels = kanjiPerLevel.filter(n => n === 0).length;

  console.log(`\nTarget: ${totalKanji} kanji across 60 levels = ~${avgPerLevel.toFixed(1)} per level`);
  console.log(`Actual range: ${minPerLevel} to ${maxPerLevel} kanji per level`);
  console.log(`Empty levels: ${emptyLevels}`);

  // Find unbalanced levels
  const unbalancedLevels: { level: number; count: number; deviation: string }[] = [];
  for (let level = 1; level <= 60; level++) {
    const count = kanjiPerLevel[level - 1];
    if (count < avgPerLevel * 0.5 && count > 0) {
      unbalancedLevels.push({ level, count, deviation: "too few" });
    } else if (count > avgPerLevel * 1.5) {
      unbalancedLevels.push({ level, count, deviation: "too many" });
    }
  }

  if (unbalancedLevels.length > 0) {
    console.log("\n[INFO] Unbalanced levels:");
    for (const ul of unbalancedLevels) {
      console.log(`  - Level ${ul.level}: ${ul.count} kanji (${ul.deviation})`);
    }
  }

  // ============================================
  // 12. JLPT vs LEVEL CORRELATION
  // ============================================
  console.log("\n\n12. JLPT vs APP LEVEL CORRELATION");
  console.log("--------------------------------------------------------------------------------");
  console.log("Ideal progression: N5 (easiest) -> L1-10, N4 -> L11-25, N3 -> L26-40, N2 -> L41-50, N1 -> L51-60\n");

  const jlptByAppLevel = new Map<number, Map<number, number>>();

  for (const k of allKanji) {
    if (k.jlptLevel === null) continue;
    if (!jlptByAppLevel.has(k.levelId)) {
      jlptByAppLevel.set(k.levelId, new Map());
    }
    const jlptMap = jlptByAppLevel.get(k.levelId)!;
    jlptMap.set(k.jlptLevel, (jlptMap.get(k.jlptLevel) || 0) + 1);
  }

  console.log("App Level | N5 | N4 | N3 | N2 | N1 | Dominant");
  console.log("----------|----|----|----|----|----|---------");

  for (let level = 1; level <= 60; level++) {
    const jlptMap = jlptByAppLevel.get(level);
    if (!jlptMap) continue;

    const n5 = jlptMap.get(5) || 0;
    const n4 = jlptMap.get(4) || 0;
    const n3 = jlptMap.get(3) || 0;
    const n2 = jlptMap.get(2) || 0;
    const n1 = jlptMap.get(1) || 0;

    const counts = [
      { jlpt: 5, count: n5 },
      { jlpt: 4, count: n4 },
      { jlpt: 3, count: n3 },
      { jlpt: 2, count: n2 },
      { jlpt: 1, count: n1 }
    ];
    const dominant = counts.reduce((a, b) => b.count > a.count ? b : a);

    console.log(`    ${String(level).padStart(2)}    | ${String(n5).padStart(2)} | ${String(n4).padStart(2)} | ${String(n3).padStart(2)} | ${String(n2).padStart(2)} | ${String(n1).padStart(2)} |   N${dominant.jlpt}`);
  }

  // ============================================
  // SUMMARY
  // ============================================
  console.log("\n\n================================================================================");
  console.log("SUMMARY OF ISSUES FOUND");
  console.log("================================================================================\n");

  const issues: { severity: string; issue: string }[] = [];

  // Collect issues
  if (jlptN5Issues.length > 0) {
    issues.push({ severity: "WARNING", issue: `${jlptN5Issues.length} JLPT N5 kanji are in levels after level 10` });
  }
  if (fundamentalIssues.length > 0) {
    issues.push({ severity: "ERROR", issue: `${fundamentalIssues.length} number kanji (一二三...) are not in levels 1-3` });
  }
  if (basicIssues.length > 0) {
    issues.push({ severity: "ERROR", issue: `${basicIssues.length} basic kanji (日月火...) are not in levels 1-5` });
  }
  if (n1InEarlyLevels.length > 0) {
    issues.push({ severity: "WARNING", issue: `${n1InEarlyLevels.length} JLPT N1 kanji found in levels 1-10` });
  }
  if (complexKanjiInEarlyLevels.length > 0) {
    issues.push({ severity: "WARNING", issue: `${complexKanjiInEarlyLevels.length} complex kanji (15+ strokes) in levels 1-10` });
  }
  if (componentOrderingIssues.length > 0) {
    issues.push({ severity: "ERROR", issue: `${componentOrderingIssues.length} component kanji appear after kanji that use them` });
  }
  if (emptyLevels > 0) {
    issues.push({ severity: "ERROR", issue: `${emptyLevels} levels have no kanji` });
  }

  if (issues.length === 0) {
    console.log("[OK] No major issues found in kanji ordering!");
  } else {
    console.log("Issues by severity:\n");
    for (const issue of issues) {
      console.log(`[${issue.severity}] ${issue.issue}`);
    }
  }

  // Detailed examples
  console.log("\n\n================================================================================");
  console.log("DETAILED EXAMPLES OF PROBLEMATIC KANJI");
  console.log("================================================================================");

  if (fundamentalIssues.length > 0) {
    console.log("\n--- Number Kanji Issues ---");
    for (const issue of fundamentalIssues) {
      console.log(`${issue.kanji}: Currently Level ${issue.level}, Expected Level ${issue.expected}`);
    }
  }

  if (basicIssues.length > 0) {
    console.log("\n--- Basic Kanji Issues ---");
    for (const issue of basicIssues) {
      console.log(`${issue.kanji}: Currently Level ${issue.level}, Expected Level ${issue.expected}`);
    }
  }

  if (jlptN5Issues.length > 0) {
    console.log("\n--- JLPT N5 Kanji in Late Levels ---");
    for (const issue of jlptN5Issues.slice(0, 20)) {
      console.log(`${issue.kanji}: Currently Level ${issue.level}, Expected Level 1-10`);
    }
    if (jlptN5Issues.length > 20) {
      console.log(`... and ${jlptN5Issues.length - 20} more`);
    }
  }

  console.log("\n================================================================================");
  console.log("QC COMPLETE");
  console.log("================================================================================\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
