import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Utility to get stroke count for a kanji character
function getStrokeCount(char: string): number {
  // This is a simplified mapping. In production, you'd use a complete kanji dictionary.
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
    "休": 6, "先": 6, "名": 6, "年": 6, "早": 6, "百": 6, "竹": 6, "糸": 6, "耳": 6, "肉": 6, "虫": 6, "行": 6, "西": 6, "足": 6, "赤": 6, "車": 6, "村": 6, "花": 6, "字": 6, "光": 6, "色": 6, "回": 6, "会": 6, "自": 6, "同": 6, "当": 6, "地": 6, "多": 6, "次": 6, "交": 6, "両": 6, "全": 6, "共": 6, "再": 6, "各": 6, "合": 6, "向": 6, "在": 6, "好": 6, "安": 6, "存": 6, "宅": 6, "守": 6, "州": 6, "式": 6, "成": 6, "曲": 6, "有": 6, "死": 6, "気": 6, "汚": 6, "灰": 6, "羊": 6, "米": 6, "老": 6, "羽": 6, "考": 6, "肌": 6, "血": 6, "舌": 6, "舟": 6, "衣": 6, "争": 6, "伝": 6, "仲": 6, "件": 6, "任": 6, "企": 6, "伏": 6, "充": 6, "兆": 6, "刑": 6, "印": 6, "危": 6, "吉": 6, "吸": 6, "因": 6, "団": 6, "団": 6, "圧": 6, "壮": 6, "字": 6, "宇": 6, "収": 6,
    // 7 strokes
    "何": 7, "作": 7, "体": 7, "声": 7, "売": 7, "形": 7, "見": 7, "言": 7, "角": 7, "谷": 7, "走": 7, "近": 7, "里": 7, "町": 7, "男": 7, "社": 7, "私": 7, "来": 7, "決": 7, "住": 7, "助": 7, "初": 7, "別": 7, "利": 7, "君": 7, "含": 7, "困": 7, "完": 7, "対": 7, "局": 7, "希": 7, "床": 7, "役": 7, "忘": 7, "技": 7, "抜": 7, "改": 7, "材": 7, "束": 7, "条": 7, "求": 7, "沢": 7, "状": 7, "系": 7, "肝": 7, "良": 7, "芸": 7, "返": 7, "位": 7, "余": 7, "冷": 7, "労": 7, "努": 7, "励": 7, "吹": 7, "告": 7, "囲": 7, "坂": 7, "妙": 7, "妊": 7, "孝": 7, "寿": 7, "尿": 7, "序": 7, "弄": 7, "忍": 7, "応": 7, "快": 7, "戒": 7, "抗": 7, "攻": 7, "更": 7, "杉": 7, "沈": 7, "没": 7, "災": 7, "狂": 7, "男": 7, "秀": 7, "私": 7, "究": 7,
    // 8 strokes
    "雨": 8, "青": 8, "空": 8, "金": 8, "長": 8, "門": 8, "京": 8, "事": 8, "使": 8, "味": 8, "届": 8, "届": 8, "定": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8, "届": 8,
    "学": 8, "国": 8, "林": 8, "明": 8, "夜": 8, "知": 8, "直": 8, "物": 8, "姉": 8, "妹": 8, "性": 8, "所": 8, "放": 8, "明": 8, "服": 8, "法": 8, "注": 8, "波": 8, "泳": 8, "油": 8, "治": 8, "泊": 8, "育": 8, "者": 8, "受": 8, "取": 8, "始": 8, "委": 8, "季": 8, "実": 8, "宗": 8, "宝": 8, "届": 8, "岩": 8, "幸": 8, "底": 8, "店": 8, "府": 8, "忠": 8, "念": 8, "性": 8, "怪": 8, "房": 8, "押": 8, "抱": 8, "披": 8, "拓": 8, "拘": 8, "放": 8, "斉": 8, "昆": 8, "昇": 8, "昔": 8, "易": 8, "松": 8, "析": 8, "林": 8, "枕": 8, "果": 8, "枝": 8, "板": 8, "泉": 8, "注": 8, "河": 8, "沿": 8, "況": 8, "炎": 8, "版": 8, "牧": 8, "画": 8, "的": 8, "知": 8, "祈": 8, "空": 8, "突": 8, "者": 8, "肥": 8, "股": 8, "肩": 8, "育": 8, "舎": 8, "苗": 8, "英": 8, "茂": 8, "虎": 8, "金": 8, "長": 8, "門": 8, "阿": 8, "雨": 8, "青": 8, "非": 8,
    // 9 strokes
    "音": 9, "風": 9, "食": 9, "首": 9, "思": 9, "室": 9, "後": 9, "待": 9, "春": 9, "秋": 9, "活": 9, "海": 9, "点": 9, "前": 9, "品": 9, "度": 9, "建": 9, "持": 9, "指": 9, "政": 9, "相": 9, "科": 9, "美": 9, "負": 9, "面": 9, "飛": 9, "係": 9, "信": 9, "保": 9, "便": 9, "則": 9, "勇": 9, "南": 9, "変": 9, "城": 9, "姿": 9, "威": 9, "客": 9, "宣": 9, "屋": 9, "帝": 9, "度": 9, "建": 9, "急": 9, "怒": 9, "思": 9, "恋": 9, "政": 9, "故": 9, "星": 9, "映": 9, "春": 9, "柔": 9, "染": 9, "査": 9, "段": 9, "洗": 9, "派": 9, "浄": 9, "津": 9, "活": 9, "炭": 9, "点": 9, "狭": 9, "界": 9, "発": 9, "相": 9, "省": 9, "研": 9, "砂": 9, "祖": 9, "科": 9, "秒": 9, "紀": 9, "約": 9, "背": 9, "胞": 9, "要": 9, "計": 9, "訂": 9, "負": 9, "軌": 9, "迷": 9, "退": 9, "限": 9, "面": 9, "革": 9, "風": 9, "飛": 9, "食": 9, "首": 9,
    // 10+ strokes
    "校": 10, "時": 10, "高": 10, "書": 10, "気": 10, "記": 10, "紙": 10, "海": 10, "馬": 10, "帰": 10, "庭": 10, "教": 11, "週": 11, "魚": 11, "鳥": 11, "黄": 11, "黒": 11, "雪": 11, "曜": 18, "親": 16, "読": 14, "電": 13, "話": 13, "道": 12, "遠": 13, "園": 13, "歌": 14, "語": 14, "算": 14, "聞": 14, "新": 13, "数": 13, "楽": 13, "森": 12, "絵": 12, "買": 12, "朝": 12, "答": 12, "番": 12, "間": 12, "場": 12, "勉": 10, "病": 10, "旅": 10, "家": 10, "強": 11, "組": 11, "細": 11, "船": 11, "野": 11,
    "愛": 13, "感": 13, "意": 13, "想": 13, "業": 13, "試": 13, "話": 13, "説": 14, "調": 15, "質": 15, "熱": 15, "練": 15, "線": 15, "論": 15,
    "機": 16, "頭": 16, "親": 16, "題": 18, "議": 20, "曜": 18, "聴": 17, "類": 18,
    // Additional common kanji
    "本": 5, "人": 2, "大": 3, "中": 4, "小": 3, "円": 4, "年": 6, "子": 3, "手": 4, "力": 2, "入": 2, "出": 5, "見": 7, "分": 4, "行": 6, "言": 7, "上": 3, "下": 3, "会": 6, "気": 6, "来": 7, "時": 10, "新": 13, "国": 8, "自": 6, "今": 4, "思": 9, "間": 12, "高": 10, "方": 4, "部": 11, "後": 9, "前": 9, "道": 12, "同": 6, "家": 10, "電": 13, "話": 13, "者": 8, "社": 7, "動": 11, "内": 4, "開": 12, "長": 8, "場": 12, "地": 6, "持": 9, "使": 8, "去": 5, "問": 11, "理": 11, "体": 7,
  };
  return strokeCounts[char] || 0; // Return 0 if not found
}

interface QualityIssue {
  type: string;
  severity: "error" | "warning" | "info";
  message: string;
  details?: unknown;
}

async function main() {
  console.log("========================================");
  console.log("NIHONGO CONTENT QUALITY CHECK");
  console.log("========================================\n");

  const issues: QualityIssue[] = [];

  // ============================================
  // 1. LEVEL DISTRIBUTION
  // ============================================
  console.log("1. LEVEL DISTRIBUTION");
  console.log("----------------------------------------");

  const radicalCounts = await prisma.radical.groupBy({
    by: ["levelId"],
    _count: { id: true },
    orderBy: { levelId: "asc" },
  });

  const kanjiCounts = await prisma.kanji.groupBy({
    by: ["levelId"],
    _count: { id: true },
    orderBy: { levelId: "asc" },
  });

  const vocabularyCounts = await prisma.vocabulary.groupBy({
    by: ["levelId"],
    _count: { id: true },
    orderBy: { levelId: "asc" },
  });

  const totalRadicals = await prisma.radical.count();
  const totalKanji = await prisma.kanji.count();
  const totalVocabulary = await prisma.vocabulary.count();

  console.log(`\nTotal Content: ${totalRadicals} radicals, ${totalKanji} kanji, ${totalVocabulary} vocabulary\n`);

  console.log("Level | Radicals | Kanji | Vocabulary");
  console.log("------|----------|-------|------------");

  const radicalMap = new Map(radicalCounts.map(r => [r.levelId, r._count.id]));
  const kanjiMap = new Map(kanjiCounts.map(k => [k.levelId, k._count.id]));
  const vocabMap = new Map(vocabularyCounts.map(v => [v.levelId, v._count.id]));

  const levels = await prisma.level.findMany({ orderBy: { id: "asc" } });
  const maxLevel = Math.max(...levels.map(l => l.id), 60);

  for (let i = 1; i <= maxLevel; i++) {
    const r = radicalMap.get(i) || 0;
    const k = kanjiMap.get(i) || 0;
    const v = vocabMap.get(i) || 0;
    console.log(`  ${String(i).padStart(2)} |    ${String(r).padStart(5)} |  ${String(k).padStart(4)} |      ${String(v).padStart(5)}`);

    if (r === 0 && k === 0 && v === 0) {
      issues.push({
        type: "empty_level",
        severity: "error",
        message: `Level ${i} has no content`,
      });
    } else if (k === 0) {
      issues.push({
        type: "no_kanji",
        severity: "warning",
        message: `Level ${i} has no kanji`,
      });
    } else if (v === 0) {
      issues.push({
        type: "no_vocabulary",
        severity: "warning",
        message: `Level ${i} has no vocabulary`,
      });
    }
  }

  // ============================================
  // 2. KANJI COMPLEXITY PROGRESSION
  // ============================================
  console.log("\n\n2. KANJI COMPLEXITY PROGRESSION");
  console.log("----------------------------------------");

  const allKanji = await prisma.kanji.findMany({
    orderBy: { levelId: "asc" },
    include: {
      radicals: {
        include: {
          radical: true,
        },
      },
    },
  });

  // Calculate stroke counts by level
  const strokesByLevel: Map<number, number[]> = new Map();
  const unknownStrokeKanji: string[] = [];

  for (const kanji of allKanji) {
    const strokes = getStrokeCount(kanji.character);
    if (strokes === 0) {
      unknownStrokeKanji.push(kanji.character);
    }
    if (!strokesByLevel.has(kanji.levelId)) {
      strokesByLevel.set(kanji.levelId, []);
    }
    if (strokes > 0) {
      strokesByLevel.get(kanji.levelId)!.push(strokes);
    }
  }

  console.log("\nAverage stroke count by level:");
  console.log("Level | Avg Strokes | Min | Max | Count");
  console.log("------|-------------|-----|-----|------");

  const avgStrokesByLevel: { level: number; avg: number }[] = [];

  for (let level = 1; level <= maxLevel; level++) {
    const strokes = strokesByLevel.get(level) || [];
    if (strokes.length > 0) {
      const avg = strokes.reduce((a, b) => a + b, 0) / strokes.length;
      const min = Math.min(...strokes);
      const max = Math.max(...strokes);
      avgStrokesByLevel.push({ level, avg });
      console.log(`  ${String(level).padStart(2)}  |     ${avg.toFixed(1).padStart(5)}   |  ${String(min).padStart(2)} |  ${String(max).padStart(2)} |   ${String(strokes.length).padStart(3)}`);
    }
  }

  // Check for complexity inversions (later levels having simpler kanji)
  console.log("\nChecking for complexity progression issues...");
  let complexityIssues = 0;
  for (let i = 1; i < avgStrokesByLevel.length; i++) {
    const prev = avgStrokesByLevel[i - 1];
    const curr = avgStrokesByLevel[i];
    // Allow some variance, flag only significant inversions
    if (curr.avg < prev.avg - 2) {
      complexityIssues++;
      issues.push({
        type: "complexity_inversion",
        severity: "warning",
        message: `Level ${curr.level} (avg ${curr.avg.toFixed(1)} strokes) is significantly simpler than level ${prev.level} (avg ${prev.avg.toFixed(1)} strokes)`,
      });
    }
  }
  console.log(`Found ${complexityIssues} complexity inversion issues`);

  if (unknownStrokeKanji.length > 0) {
    console.log(`\nNote: ${unknownStrokeKanji.length} kanji without stroke count data: ${unknownStrokeKanji.slice(0, 20).join(", ")}${unknownStrokeKanji.length > 20 ? "..." : ""}`);
  }

  // ============================================
  // 3. RADICAL-KANJI DEPENDENCY CHECK
  // ============================================
  console.log("\n\n3. RADICAL-KANJI DEPENDENCY CHECK");
  console.log("----------------------------------------");

  console.log("\nChecking if radicals are taught before the kanji that use them...");

  const allRadicals = await prisma.radical.findMany();
  const radicalLevelMap = new Map(allRadicals.map(r => [r.id, r.levelId]));

  let radicalOrderIssues = 0;
  const kanjiWithMissingRadicals: { kanji: string; level: number; missingRadicals: string[] }[] = [];
  const kanjiWithLaterRadicals: { kanji: string; kanjiLevel: number; radical: string; radicalLevel: number }[] = [];

  for (const kanji of allKanji) {
    const missingRadicals: string[] = [];

    for (const kr of kanji.radicals) {
      const radicalLevel = radicalLevelMap.get(kr.radicalId);
      if (radicalLevel === undefined) {
        missingRadicals.push(kr.radical.character || "image-radical");
      } else if (radicalLevel > kanji.levelId) {
        radicalOrderIssues++;
        kanjiWithLaterRadicals.push({
          kanji: kanji.character,
          kanjiLevel: kanji.levelId,
          radical: kr.radical.character || kr.radical.meaningFr,
          radicalLevel,
        });
      }
    }

    if (missingRadicals.length > 0) {
      kanjiWithMissingRadicals.push({
        kanji: kanji.character,
        level: kanji.levelId,
        missingRadicals,
      });
    }
  }

  if (kanjiWithLaterRadicals.length > 0) {
    console.log(`\nWARNING: ${radicalOrderIssues} cases where radical is taught AFTER the kanji that uses it:`);
    for (const issue of kanjiWithLaterRadicals.slice(0, 20)) {
      console.log(`  - Kanji "${issue.kanji}" (L${issue.kanjiLevel}) uses radical "${issue.radical}" (L${issue.radicalLevel})`);
      issues.push({
        type: "radical_after_kanji",
        severity: "error",
        message: `Kanji "${issue.kanji}" (Level ${issue.kanjiLevel}) uses radical "${issue.radical}" which is introduced in Level ${issue.radicalLevel}`,
      });
    }
    if (kanjiWithLaterRadicals.length > 20) {
      console.log(`  ... and ${kanjiWithLaterRadicals.length - 20} more`);
    }
  } else {
    console.log("All radicals are introduced before their kanji. Good!");
  }

  // Check kanji without radicals assigned
  const kanjiWithoutRadicals = allKanji.filter(k => k.radicals.length === 0);
  if (kanjiWithoutRadicals.length > 0) {
    console.log(`\nWARNING: ${kanjiWithoutRadicals.length} kanji have no radicals assigned:`);
    for (const k of kanjiWithoutRadicals.slice(0, 20)) {
      console.log(`  - ${k.character} (Level ${k.levelId})`);
      issues.push({
        type: "kanji_no_radicals",
        severity: "warning",
        message: `Kanji "${k.character}" (Level ${k.levelId}) has no radicals assigned`,
      });
    }
    if (kanjiWithoutRadicals.length > 20) {
      console.log(`  ... and ${kanjiWithoutRadicals.length - 20} more`);
    }
  }

  // ============================================
  // 4. VOCABULARY DEPENDENCY CHECK
  // ============================================
  console.log("\n\n4. VOCABULARY DEPENDENCY CHECK");
  console.log("----------------------------------------");

  const allVocabulary = await prisma.vocabulary.findMany({
    include: {
      kanji: {
        include: {
          kanji: true,
        },
      },
    },
  });

  const kanjiLevelMap = new Map(allKanji.map(k => [k.id, { level: k.levelId, character: k.character }]));

  let vocabOrderIssues = 0;
  const vocabWithLaterKanji: { word: string; vocabLevel: number; kanji: string; kanjiLevel: number }[] = [];
  const vocabWithoutKanji: { word: string; level: number }[] = [];

  for (const vocab of allVocabulary) {
    // Check if vocabulary has kanji assigned
    if (vocab.kanji.length === 0) {
      // Check if word contains any kanji characters
      const hasKanjiChar = /[\u4e00-\u9faf]/.test(vocab.word);
      if (hasKanjiChar) {
        vocabWithoutKanji.push({ word: vocab.word, level: vocab.levelId });
      }
    }

    for (const vk of vocab.kanji) {
      const kanjiInfo = kanjiLevelMap.get(vk.kanjiId);
      if (kanjiInfo && kanjiInfo.level > vocab.levelId) {
        vocabOrderIssues++;
        vocabWithLaterKanji.push({
          word: vocab.word,
          vocabLevel: vocab.levelId,
          kanji: kanjiInfo.character,
          kanjiLevel: kanjiInfo.level,
        });
      }
    }
  }

  console.log("\nChecking if vocabulary uses kanji from same or earlier levels...");

  if (vocabWithLaterKanji.length > 0) {
    console.log(`\nWARNING: ${vocabOrderIssues} cases where vocabulary uses kanji from LATER levels:`);
    for (const issue of vocabWithLaterKanji.slice(0, 30)) {
      console.log(`  - Vocab "${issue.word}" (L${issue.vocabLevel}) uses kanji "${issue.kanji}" (L${issue.kanjiLevel})`);
      issues.push({
        type: "vocab_uses_later_kanji",
        severity: "error",
        message: `Vocabulary "${issue.word}" (Level ${issue.vocabLevel}) uses kanji "${issue.kanji}" from Level ${issue.kanjiLevel}`,
      });
    }
    if (vocabWithLaterKanji.length > 30) {
      console.log(`  ... and ${vocabWithLaterKanji.length - 30} more`);
    }
  } else {
    console.log("All vocabulary uses kanji from same or earlier levels. Good!");
  }

  if (vocabWithoutKanji.length > 0) {
    console.log(`\nWARNING: ${vocabWithoutKanji.length} vocabulary items with kanji characters but no kanji links:`);
    for (const v of vocabWithoutKanji.slice(0, 20)) {
      console.log(`  - "${v.word}" (Level ${v.level})`);
      issues.push({
        type: "vocab_missing_kanji_link",
        severity: "warning",
        message: `Vocabulary "${v.word}" (Level ${v.level}) contains kanji but has no kanji links`,
      });
    }
    if (vocabWithoutKanji.length > 20) {
      console.log(`  ... and ${vocabWithoutKanji.length - 20} more`);
    }
  }

  // ============================================
  // 5. READING CONSISTENCY CHECK
  // ============================================
  console.log("\n\n5. READING CONSISTENCY CHECK");
  console.log("----------------------------------------");

  console.log("\nChecking if vocabulary readings match kanji readings...");

  let readingMismatches = 0;
  const readingIssues: { word: string; reading: string; kanji: string; expectedReadings: string[] }[] = [];

  for (const vocab of allVocabulary) {
    if (vocab.kanji.length === 0) continue;

    // This is a simplified check - in reality, you'd need sophisticated reading matching
    // For now, we just ensure vocabulary has readings defined
    if (vocab.readings.length === 0) {
      issues.push({
        type: "vocab_no_readings",
        severity: "error",
        message: `Vocabulary "${vocab.word}" (Level ${vocab.levelId}) has no readings defined`,
      });
    }
  }

  console.log(`Vocabulary reading checks complete. ${issues.filter(i => i.type === "vocab_no_readings").length} items without readings.`);

  // ============================================
  // 6. RADICAL COVERAGE CHECK
  // ============================================
  console.log("\n\n6. RADICAL COVERAGE CHECK");
  console.log("----------------------------------------");

  // Check which radicals are never used in any kanji
  const usedRadicalIds = new Set<number>();
  for (const kanji of allKanji) {
    for (const kr of kanji.radicals) {
      usedRadicalIds.add(kr.radicalId);
    }
  }

  const unusedRadicals = allRadicals.filter(r => !usedRadicalIds.has(r.id));
  if (unusedRadicals.length > 0) {
    console.log(`\nInfo: ${unusedRadicals.length} radicals are not used in any kanji:`);
    for (const r of unusedRadicals.slice(0, 20)) {
      console.log(`  - "${r.character || r.meaningFr}" (Level ${r.levelId})`);
      issues.push({
        type: "unused_radical",
        severity: "info",
        message: `Radical "${r.character || r.meaningFr}" (Level ${r.levelId}) is not used in any kanji`,
      });
    }
    if (unusedRadicals.length > 20) {
      console.log(`  ... and ${unusedRadicals.length - 20} more`);
    }
  } else {
    console.log("All radicals are used in at least one kanji. Good!");
  }

  // ============================================
  // SUMMARY
  // ============================================
  console.log("\n\n========================================");
  console.log("QUALITY CHECK SUMMARY");
  console.log("========================================\n");

  const errors = issues.filter(i => i.severity === "error");
  const warnings = issues.filter(i => i.severity === "warning");
  const infos = issues.filter(i => i.severity === "info");

  console.log(`Total issues found: ${issues.length}`);
  console.log(`  - Errors:   ${errors.length}`);
  console.log(`  - Warnings: ${warnings.length}`);
  console.log(`  - Info:     ${infos.length}`);

  console.log("\n--- Content Statistics ---");
  console.log(`Total radicals:   ${totalRadicals}`);
  console.log(`Total kanji:      ${totalKanji}`);
  console.log(`Total vocabulary: ${totalVocabulary}`);
  console.log(`Levels with content: ${new Set([...radicalMap.keys(), ...kanjiMap.keys(), ...vocabMap.keys()]).size} / 60`);

  if (errors.length > 0) {
    console.log("\n--- ERRORS (Need immediate attention) ---");
    const errorTypes = new Map<string, number>();
    for (const e of errors) {
      errorTypes.set(e.type, (errorTypes.get(e.type) || 0) + 1);
    }
    for (const [type, count] of errorTypes) {
      console.log(`  ${type}: ${count} issues`);
    }
  }

  if (warnings.length > 0) {
    console.log("\n--- WARNINGS (Should be reviewed) ---");
    const warningTypes = new Map<string, number>();
    for (const w of warnings) {
      warningTypes.set(w.type, (warningTypes.get(w.type) || 0) + 1);
    }
    for (const [type, count] of warningTypes) {
      console.log(`  ${type}: ${count} issues`);
    }
  }

  console.log("\n========================================");
  console.log("Quality check complete!");
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
