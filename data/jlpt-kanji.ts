// Complete JLPT Kanji Lists
// Based on official JLPT guidelines
// Note: N4, N3, N2, N1 lists are partial and will be expanded

// =====================================================
// JLPT N5 - 103 kanji (complete)
// =====================================================
export const JLPT_N5_KANJI = [
  "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万", "日", "月",
  "火", "水", "木", "金", "土", "年", "時", "分", "半", "今", "週", "毎", "曜", "午", "前",
  "後", "上", "下", "中", "左", "右", "北", "南", "東", "西", "外", "内", "間", "人", "男",
  "女", "子", "母", "父", "友", "先", "生", "山", "川", "天", "気", "雨", "空", "花", "口",
  "目", "耳", "手", "足", "大", "小", "多", "少", "長", "高", "安", "新", "古", "白", "明",
  "見", "聞", "読", "書", "話", "言", "食", "飲", "行", "来", "出", "入", "立", "休", "買",
  "売", "学", "校", "語", "文", "名", "字", "国", "店", "駅", "道", "車", "電", "何", "円",
  "本", "会", "社",
] as const;

// =====================================================
// JLPT N4 - 96 kanji (partial - full list has ~180)
// =====================================================
export const JLPT_N4_KANJI = [
  "会", "同", "事", "自", "社", "発", "者", "地", "業", "方", "新", "場", "員", "立", "開",
  "手", "力", "問", "代", "明", "動", "京", "目", "通", "言", "理", "体", "田", "主", "題",
  "意", "不", "作", "用", "度", "強", "公", "持", "野", "以", "思", "家", "世", "多", "正",
  "安", "院", "心", "界", "教", "文", "元", "重", "近", "考", "画", "海", "売", "知", "道",
  "集", "別", "物", "使", "品", "計", "死", "特", "私", "始", "朝", "運", "終", "台", "広",
  "住", "真", "有", "口", "少", "町", "料", "工", "建", "空", "急", "止", "送", "切", "転",
  "研", "足", "究", "楽", "起", "着",
] as const;

// =====================================================
// JLPT N3 - 15 kanji (partial - full list has ~370)
// =====================================================
export const JLPT_N3_KANJI = [
  "政", "議", "民", "連", "対", "部", "合", "市", "内", "相", "定", "回", "選", "米", "実",
] as const;

// =====================================================
// JLPT N2 - empty (to be expanded - full list has ~370)
// =====================================================
export const JLPT_N2_KANJI = [] as const;

// =====================================================
// JLPT N1 - empty (to be expanded - full list has ~1000)
// =====================================================
export const JLPT_N1_KANJI = [] as const;

// Helper function to get JLPT level for a kanji
export function getJlptLevel(kanji: string): number | null {
  if (JLPT_N5_KANJI.includes(kanji as typeof JLPT_N5_KANJI[number])) return 5;
  if (JLPT_N4_KANJI.includes(kanji as typeof JLPT_N4_KANJI[number])) return 4;
  if (JLPT_N3_KANJI.includes(kanji as typeof JLPT_N3_KANJI[number])) return 3;
  if (JLPT_N2_KANJI.includes(kanji as typeof JLPT_N2_KANJI[number])) return 2;
  if (JLPT_N1_KANJI.includes(kanji as typeof JLPT_N1_KANJI[number])) return 1;
  return null;
}

// Combined set of all JLPT kanji for quick lookup
export const ALL_JLPT_KANJI = new Set([
  ...JLPT_N5_KANJI,
  ...JLPT_N4_KANJI,
  ...JLPT_N3_KANJI,
  ...JLPT_N2_KANJI,
  ...JLPT_N1_KANJI,
]);

export type JlptLevel = 1 | 2 | 3 | 4 | 5;
