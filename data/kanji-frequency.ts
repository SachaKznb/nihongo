// Kanji Frequency Rankings
// Based on newspaper frequency analysis (Asahi Shimbun corpus)
// Rankings indicate relative frequency: 1 = most frequent

// Top 200 kanji by frequency in Japanese newspapers
export const KANJI_FREQUENCY: Record<string, number> = {
  // Top 50 (most frequent)
  "日": 1, "一": 2, "国": 3, "会": 4, "人": 5,
  "年": 6, "大": 7, "十": 8, "二": 9, "本": 10,
  "中": 11, "長": 12, "出": 13, "三": 14, "同": 15,
  "時": 16, "政": 17, "事": 18, "自": 19, "行": 20,
  "社": 21, "見": 22, "月": 23, "分": 24, "議": 25,
  "後": 26, "前": 27, "民": 28, "生": 29, "連": 30,
  "五": 31, "発": 32, "間": 33, "対": 34, "上": 35,
  "部": 36, "東": 37, "者": 38, "党": 39, "地": 40,
  "合": 41, "市": 42, "業": 43, "内": 44, "相": 45,
  "方": 46, "四": 47, "定": 48, "今": 49, "回": 50,

  // 51-100
  "新": 51, "場": 52, "金": 53, "員": 54, "九": 55,
  "入": 56, "選": 57, "立": 58, "開": 59, "手": 60,
  "米": 61, "力": 62, "学": 63, "問": 64, "高": 65,
  "代": 66, "明": 67, "実": 68, "円": 69, "関": 70,
  "決": 71, "子": 72, "動": 73, "京": 74, "全": 75,
  "目": 76, "表": 77, "戦": 78, "経": 79, "通": 80,
  "外": 81, "最": 82, "言": 83, "氏": 84, "現": 85,
  "理": 86, "調": 87, "体": 88, "化": 89, "田": 90,
  "当": 91, "八": 92, "六": 93, "約": 94, "主": 95,
  "題": 96, "下": 97, "首": 98, "意": 99, "法": 100,

  // 101-150
  "不": 101, "来": 102, "作": 103, "性": 104, "的": 105,
  "要": 106, "用": 107, "制": 108, "治": 109, "度": 110,
  "務": 111, "強": 112, "気": 113, "小": 114, "七": 115,
  "成": 116, "期": 117, "公": 118, "持": 119, "野": 120,
  "以": 121, "思": 122, "家": 123, "世": 124, "多": 125,
  "正": 126, "安": 127, "院": 128, "心": 129, "界": 130,
  "教": 131, "文": 132, "元": 133, "重": 134, "近": 135,
  "考": 136, "画": 137, "海": 138, "売": 139, "知": 140,
  "道": 141, "集": 142, "別": 143, "物": 144, "使": 145,
  "品": 146, "計": 147, "死": 148, "特": 149, "私": 150,

  // 151-177 (verified unique kanji)
  "始": 151, "朝": 152, "運": 153, "終": 154, "台": 155,
  "広": 156, "住": 157, "真": 158, "有": 159, "口": 160,
  "少": 161, "町": 162, "料": 163, "工": 164, "建": 165,
  "空": 166, "急": 167, "止": 168, "送": 169, "切": 170,
  "転": 171, "研": 172, "足": 173, "究": 174, "楽": 175,
  "起": 176, "着": 177,

  // Note: Full frequency list extends to 2500+ kanji
  // This partial list covers the most common kanji
};

// Get frequency ranking for a kanji (lower = more frequent)
export function getKanjiFrequency(kanji: string): number | null {
  return KANJI_FREQUENCY[kanji] ?? null;
}

// Check if kanji is in top N by frequency
export function isTopFrequencyKanji(kanji: string, topN: number = 500): boolean {
  const freq = KANJI_FREQUENCY[kanji];
  return freq !== undefined && freq <= topN;
}

// Get all kanji sorted by frequency
export function getKanjiByFrequency(): string[] {
  return Object.entries(KANJI_FREQUENCY)
    .sort((a, b) => a[1] - b[1])
    .map(([kanji]) => kanji);
}
