import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Complete kanji-radical mapping script
 * Maps the 628 kanji that were missing decomposition mappings
 * Each kanji is mapped to its main visual component radicals
 */

// Kanji to radicals decomposition for the 628 missing kanji
// Using only radicals that exist in the database
const kanjiRadicalMappings: [string, string[]][] = [
  // Fix the 3 that were still missing after first run
  ["院", ["阝"]], // hospital/institution - mound radical
  ["科", ["禾"]], // subject/department - grain radical
  ["主", ["一", "王"]], // main/master - use existing radicals

  // Basic/Common kanji
  ["円", ["口", "冫"]], // yen/circle - enclosure with strokes
  ["字", ["宀", "子"]], // character - roof + child
  ["万", ["一", "勹"]], // ten thousand
  ["午", ["十", "干"]], // noon
  ["市", ["巾"]], // city/market - cloth
  ["弟", ["弓"]], // younger brother
  ["兄", ["口", "儿"]], // older brother
  ["春", ["日", "大"]], // spring
  ["冬", ["夂", "冫"]], // winter - walking slowly + ice
  ["者", ["日", "老"]], // person/thing - use 老 radical
  ["事", ["一", "口"]], // thing/matter
  ["試", ["言", "工"]], // try/test
  ["究", ["穴", "九"]], // research - hole + nine
  ["族", ["方", "矢"]], // tribe/family
  ["教", ["子", "攴"]], // teach
  ["強", ["弓", "虫"]], // strong
  ["死", ["歹", "匕"]], // death
  ["正", ["一", "止"]], // correct
  ["彼", ["彳", "皮"]], // he/that
  ["自", ["目", "一"]], // self
  ["早", ["日", "十"]], // early
  ["王", ["一", "土"]], // king
  ["堂", ["土", "尚"]], // hall
  ["元", ["二", "儿"]], // origin
  ["用", ["月", "丨"]], // use
  ["太", ["大", "丶"]], // fat/thick
  ["交", ["亠", "父"]], // exchange
  ["当", ["尚", "彐"]], // hit/appropriate
  ["京", ["亠", "口", "小"]], // capital
  ["弱", ["弓", "冫"]], // weak
  ["公", ["八", "厶"]], // public
  ["野", ["里", "予"]], // field
  ["合", ["人", "口"]], // fit/combine
  ["理", ["王", "里"]], // reason/logic
  ["数", ["米", "女", "攴"]], // number
  ["遠", ["辶", "袁"]], // far
  ["同", ["口", "一"]], // same
  ["考", ["耂", "巧"]], // think/consider
  ["星", ["日", "生"]], // star
  ["岩", ["山", "石"]], // rock
  ["楽", ["白", "木"]], // pleasure/music
  ["歩", ["止", "少"]], // walk
  ["晴", ["日", "青"]], // clear weather
  ["歌", ["可", "欠"]], // song
  ["引", ["弓", "丨"]], // pull
  ["世", ["廿", "一"]], // world/generation
  ["去", ["土", "厶"]], // leave/past
  ["写", ["冖", "与"]], // copy/write
  ["反", ["厂", "又"]], // anti/opposite
  ["服", ["月", "又"]], // clothes/serve
  ["有", ["月", "一"]], // have/exist
  ["要", ["西", "女"]], // need/main point
  ["化", ["人", "匕"]], // change/transform
  ["重", ["里", "一"]], // heavy/important
  ["私", ["禾", "厶"]], // private/I
  ["漢", ["水", "廿"]], // China/man
  ["物", ["牛", "勿"]], // thing
  ["対", ["文", "寸"]], // opposite/pair
  ["発", ["癶", "弓"]], // emit/departure
  ["所", ["戸", "斤"]], // place
  ["予", ["亅", "一"]], // beforehand
  ["不", ["一", "人"]], // not/un-
  ["率", ["玄", "十"]], // rate/lead
  ["斎", ["齊", "示"]], // purify
  ["局", ["尸", "口"]], // bureau/situation
  ["曲", ["曰", "丨"]], // bend/music
  ["最", ["日", "又"]], // most
  ["具", ["目", "八"]], // tool
  ["美", ["羊", "大"]], // beauty
  ["虜", ["虎", "力"]], // captive
  ["孔", ["子", "乙"]], // hole/Confucius
  ["玲", ["玉", "令"]], // tinkling
  ["箱", ["竹", "目", "木"]], // box
  ["糾", ["糸", "丩"]], // twist/investigate
  ["乗", ["禾", "一"]], // ride
  ["民", ["氏", "一"]], // people
  ["厘", ["厂", "里"]], // rin (unit)
  ["桑", ["又", "木"]], // mulberry
  ["粧", ["米", "庄"]], // makeup
  ["散", ["月", "攴"]], // scatter
  ["農", ["辰", "曲"]], // agriculture
  ["戦", ["戈", "単"]], // war/battle
  ["街", ["行", "圭"]], // street
  ["巣", ["木", "果"]], // nest
  ["命", ["人", "口"]], // life/command
  ["即", ["皀", "卩"]], // immediately
  ["柿", ["木", "市"]], // persimmon
  ["暑", ["日", "者"]], // hot
  ["第", ["竹", "弟"]], // ordinal prefix
  ["詩", ["言", "寺"]], // poem
  ["錯", ["金", "昔"]], // mistake
  ["術", ["行", "木"]], // art/technique
  ["粋", ["米", "卒"]], // essence/pure
  ["殻", ["士", "殳"]], // shell/husk
  ["覚", ["見", "学"]], // remember/feel
  ["得", ["彳", "日"]], // gain/obtain
  ["易", ["日", "勿"]], // easy/change
  ["観", ["見", "雚"]], // observe
  ["解", ["角", "刀", "牛"]], // solve/untie
  ["職", ["耳", "戈"]], // employment
  ["張", ["弓", "長"]], // stretch
  ["撲", ["手", "菐"]], // strike
  ["視", ["示", "見"]], // look at
  ["律", ["彳", "聿"]], // law/rhythm
  ["復", ["彳", "日", "夂"]], // return/repeat
  ["奇", ["大", "可"]], // strange
  ["並", ["一", "丷"]], // line up
  ["衆", ["血", "众"]], // masses/many
  ["就", ["京", "尤"]], // take position
  ["系", ["糸", "一"]], // system/lineage
  ["博", ["十", "専"]], // extensive
  ["乏", ["丿", "之"]], // lack
  ["児", ["旧", "儿"]], // child
  ["更", ["一", "曰"]], // renew/again
  ["漏", ["水", "尸", "雨"]], // leak
  ["渇", ["水", "曷"]], // thirsty
  ["処", ["夂", "几"]], // place/deal with
  ["久", ["ノ", "人"]], // long time
  ["延", ["廴", "止"]], // extend
  ["版", ["片", "反"]], // printing/edition
  ["尊", ["酉", "寸"]], // honor/revere
  ["否", ["口", "不"]], // no/negate
  ["厳", ["厂", "敢"]], // strict/severe
  ["党", ["尚", "儿"]], // party/faction
  ["雑", ["隹", "九"]], // miscellaneous
  ["攻", ["工", "攴"]], // attack
  ["衛", ["行", "韋"]], // guard/protect
  ["隊", ["阝", "隹"]], // group/squad
  ["径", ["彳", "工"]], // path/diameter
  ["豪", ["高", "豕"]], // powerful
  ["普", ["並", "日"]], // universal
  ["枕", ["木", "冘"]], // pillow
  ["覧", ["見", "監"]], // look at
  ["永", ["水", "丶"]], // eternity
  ["起", ["走", "己"]], // rise/wake up
  ["恩", ["因", "心"]], // grace/favor
  ["舎", ["人", "屮", "口"]], // building
  ["寿", ["士", "寸"]], // longevity
  ["興", ["同", "舁"]], // interest/rise
  ["救", ["求", "攴"]], // rescue
  ["孫", ["子", "系"]], // grandchild
  ["肺", ["月", "市"]], // lung
  ["次", ["冫", "欠"]], // next
  ["聴", ["耳", "王", "心"]], // listen
  ["糖", ["米", "唐"]], // sugar
  ["舞", ["舛", "無"]], // dance
  ["臨", ["臣", "品"]], // face/attend
  ["厄", ["厂", "巳"]], // misfortune
  ["塁", ["田", "土"]], // base/fort
  ["及", ["人", "又"]], // reach/extend
  ["血", ["皿", "一"]], // blood
  ["丁", ["一", "亅"]], // street/block
  ["央", ["大", "冂"]], // center
  ["受", ["爪", "又"]], // receive
  ["将", ["爿", "寸"]], // general/will
  ["債", ["人", "責"]], // debt
  ["粉", ["米", "分"]], // powder
  ["歓", ["欠", "雚"]], // joy/pleasure
  ["免", ["刀", "儿"]], // exempt
  ["却", ["去", "卩"]], // reject
  ["犠", ["牛", "義"]], // sacrifice
  ["脈", ["月", "永"]], // vein/pulse
  ["誠", ["言", "成"]], // sincerity
  ["崩", ["山", "朋"]], // collapse
  ["旬", ["日", "勹"]], // ten days
  ["滅", ["水", "戌"]], // destroy
  ["求", ["一", "水"]], // seek/request
  ["徒", ["彳", "走"]], // on foot/follower
  ["紛", ["糸", "分"]], // confused
  ["鈴", ["金", "令"]], // bell
  ["嬉", ["女", "喜"]], // happy
  ["嵐", ["山", "風"]], // storm
  ["遜", ["辶", "孫"]], // humble
  ["巡", ["辶", "巛"]], // patrol
  ["敷", ["尃", "攴"]], // spread/lay
  ["黙", ["黒", "犬"]], // silence
  ["柳", ["木", "卯"]], // willow
  ["揺", ["手", "缶"]], // shake
  ["包", ["勹", "巳"]], // wrap
  ["暫", ["車", "日"]], // temporary
  ["暦", ["日", "厂"]], // calendar
  ["蜜", ["宀", "虫"]], // honey
  ["崖", ["山", "厓"]], // cliff
  ["髪", ["髟", "友"]], // hair
  ["缶", ["午", "凵"]], // can/tin
  ["忌", ["己", "心"]], // mourning/taboo
  ["沼", ["水", "召"]], // marsh
  ["梨", ["利", "木"]], // pear
  ["脚", ["月", "却"]], // leg/foot
  ["涙", ["水", "戾"]], // tear
  ["牧", ["牛", "攴"]], // pasture
  ["封", ["土", "寸"]], // seal
  ["朽", ["木", "丂"]], // decay
  ["拶", ["手", "夕"]], // approach (as in 挨拶)
  ["凶", ["凵", "乂"]], // evil/bad luck
  ["趣", ["走", "取"]], // interest/taste
  ["椅", ["木", "奇"]], // chair
  ["疎", ["疋", "束"]], // sparse/alienate
  ["泡", ["水", "包"]], // bubble
  ["魔", ["麻", "鬼"]], // demon/magic
  ["欺", ["其", "欠"]], // deceive
  ["瑞", ["玉", "耑"]], // auspicious
  ["扇", ["戸", "羽"]], // fan
  ["潮", ["水", "朝"]], // tide
  ["滋", ["水", "兹"]], // nourish
  ["伊", ["人", "尹"]], // Italy/that
  ["隙", ["阝", "小", "日"]], // gap/crevice
  ["唇", ["辰", "口"]], // lips
  ["諮", ["言", "咨"]], // consult
  ["菌", ["艹", "囷"]], // bacteria
  ["廷", ["廴", "壬"]], // court
  ["庶", ["广", "灬"]], // commoner
  ["皿", ["皿"]], // dish (radical itself)
  ["州", ["川", "丶"]], // state/province
  ["役", ["彳", "殳"]], // duty/service
  ["炸", ["火", "乍"]], // explode/fry
  ["諭", ["言", "兪"]], // admonish
  ["亭", ["亠", "口", "丁"]], // pavilion
  ["甚", ["甘", "匹"]], // very/extreme
  ["虹", ["虫", "工"]], // rainbow
  ["焔", ["火", "臽"]], // flame
  ["峰", ["山", "夆"]], // peak
  ["渦", ["水", "咼"]], // whirlpool
  ["盾", ["厂", "目"]], // shield
  ["穫", ["禾", "蒦"]], // harvest
  ["尽", ["尸", "火"]], // exhaust
  ["覆", ["襾", "復"]], // cover/overturn
  ["顎", ["頁", "咢"]], // jaw
  ["喩", ["口", "兪"]], // metaphor
  ["刹", ["刀", "殺"]], // temple/instant
  ["瞑", ["目", "冥"]], // close eyes
  ["浪", ["水", "良"]], // wave
  ["嗅", ["口", "臭"]], // smell
  ["璃", ["玉", "离"]], // glass/lapis lazuli
  ["吏", ["一", "口"]], // official
  ["羅", ["网", "維"]], // gauze/silk
  ["洞", ["水", "同"]], // cave
  ["閏", ["門", "王"]], // leap (year)
  ["緯", ["糸", "韋"]], // weft/latitude
  ["尉", ["尸", "寸"]], // military officer
  ["毀", ["臼", "土", "殳"]], // destroy
  ["墳", ["土", "賁"]], // grave/mound
  ["畿", ["田", "幾"]], // capital region
  ["渓", ["水", "奚"]], // valley stream
  ["桁", ["木", "行"]], // beam/digit
  ["傲", ["人", "敖"]], // proud
  ["泣", ["水", "立"]], // cry
  ["款", ["士", "欠"]], // article/funds
  ["噌", ["口", "曽"]], // boisterous
  ["臆", ["月", "意"]], // timid
  ["乙", ["乙"]], // second (radical)
  ["卸", ["卩", "午"]], // unload
  ["謁", ["言", "曷"]], // audience
  ["諧", ["言", "皆"]], // harmony
  ["乾", ["乙", "日"]], // dry
  ["叡", ["目", "又"]], // wise
  ["帥", ["師", "丨"]], // commander
  ["慨", ["心", "既"]], // regret
  ["凸", ["凸"]], // convex
  ["凹", ["凹"]], // concave
  ["稽", ["禾", "尤", "旨"]], // consider/bow
  ["繋", ["糸", "車"]], // connect
  ["隅", ["阝", "禺"]], // corner
  ["虞", ["虍", "呉"]], // fear/concern
  ["炒", ["火", "少"]], // stir-fry
  ["襟", ["衣", "禁"]], // collar
  ["諺", ["言", "彦"]], // proverb
  ["且", ["一", "月"]], // moreover
  ["伎", ["人", "支"]], // skill
  ["岐", ["山", "支"]], // branch
  ["虐", ["虍", "一"]], // cruel
  ["魂", ["云", "鬼"]], // soul
  ["冊", ["冂", "一"]], // book/volume
  ["幻", ["幺", "一"]], // illusion
  ["棺", ["木", "官"]], // coffin
  ["螺", ["虫", "累"]], // spiral/snail
  ["胸", ["月", "匈"]], // chest
  ["峠", ["山", "上", "下"]], // mountain pass
  ["鋸", ["金", "居"]], // saw
  ["瓶", ["瓦", "并"]], // bottle
  ["烹", ["亠", "火"]], // cook
  ["脳", ["月", "囟"]], // brain
  ["負", ["貝", "一"]], // lose/bear
  ["珊", ["玉", "册"]], // coral
  ["嶺", ["山", "領"]], // peak/ridge
  ["邁", ["辶", "萬"]], // advance
  ["塑", ["朔", "土"]], // model/mold
  ["曖", ["日", "愛"]], // dim/vague
  ["騙", ["馬", "扁"]], // deceive
  ["昧", ["日", "未"]], // dark/obscure
  ["揉", ["手", "柔"]], // rub/massage
  ["陸", ["阝", "坴"]], // land
  ["斧", ["父", "斤"]], // axe
  ["慄", ["心", "栗"]], // fear/chestnut
  ["漬", ["水", "責"]], // pickle
  ["鑿", ["金", "業"]], // chisel
  ["靭", ["革", "刀"]], // tough/flexible
  ["釘", ["金", "丁"]], // nail
  ["麺", ["麦", "面"]], // noodles
  ["鋏", ["金", "夾"]], // scissors
  ["詮", ["言", "全"]], // explain
  ["膀", ["月", "旁"]], // bladder
  ["雫", ["雨", "下"]], // droplet
  ["覇", ["襾", "革", "月"]], // supremacy
  ["跨", ["足", "夸"]], // straddle
  ["諫", ["言", "柬"]], // remonstrate
  ["允", ["厶", "儿"]], // permit
  ["跪", ["足", "危"]], // kneel
  ["蔽", ["艹", "敝"]], // cover/hide
  ["是", ["日", "正"]], // this/right
  ["崇", ["山", "宗"]], // worship/sublime
  ["昂", ["日", "卬"]], // rise/high
  ["鮫", ["魚", "交"]], // shark
  ["詔", ["言", "召"]], // imperial edict
  ["拷", ["手", "考"]], // torture
  ["飴", ["食", "台"]], // candy
  ["榎", ["木", "夏"]], // hackberry
  ["遵", ["辶", "尊"]], // obey
  ["唾", ["口", "垂"]], // saliva
  ["桐", ["木", "同"]], // paulownia
  ["頬", ["頁", "夾"]], // cheek
  ["拭", ["手", "式"]], // wipe
  ["粥", ["米", "弓", "弓"]], // rice porridge
  ["膝", ["月", "桼"]], // knee
  ["蛛", ["虫", "朱"]], // spider
  ["蜘", ["虫", "知"]], // spider
  ["遡", ["辶", "朔"]], // go back
  ["癖", ["疒", "辟"]], // habit/quirk
  ["底", ["广", "氐"]], // bottom
  ["桶", ["木", "甬"]], // bucket
  ["庇", ["广", "比"]], // protect/eaves
  ["庵", ["广", "奄"]], // hermitage
  ["抉", ["手", "夬"]], // gouge
  ["痺", ["疒", "卑"]], // numb
  ["晦", ["日", "毎"]], // dark/last day
  ["詣", ["言", "旨"]], // visit/skill
  ["窟", ["穴", "屈"]], // cave
  ["昏", ["氏", "日"]], // dark/marriage
  ["將", ["爿", "寸"]], // general (variant)
  ["槌", ["木", "追"]], // hammer/mallet
  ["膜", ["月", "莫"]], // membrane
  ["訃", ["言", "卜"]], // obituary
  ["射", ["身", "寸"]], // shoot
  ["捧", ["手", "奉"]], // offer/hold up
  ["註", ["言", "主"]], // note/comment
  ["宵", ["宀", "肖"]], // evening
  ["旧", ["丨", "日"]], // old/former
  ["滞", ["水", "帯"]], // stagnate
  ["誤", ["言", "呉"]], // mistake
  ["煎", ["前", "灬"]], // roast/boil
  ["腸", ["月", "昜"]], // intestine
  ["丼", ["丼"]], // donburi
  ["萎", ["艹", "委"]], // wither
  ["致", ["至", "攴"]], // bring about
  ["矯", ["矢", "喬"]], // correct/straighten
  ["署", ["网", "者"]], // government office
  ["濫", ["水", "監"]], // overflow
  ["銘", ["金", "名"]], // inscription
  ["芝", ["艹", "之"]], // lawn
  ["島", ["山", "鳥"]], // island
  ["尚", ["小", "冂", "口"]], // esteem
  ["辱", ["辰", "寸"]], // humiliate
  ["艶", ["豊", "色"]], // glamour
  ["雀", ["小", "隹"]], // sparrow
  ["皮", ["皮"]], // skin (radical)
  ["睦", ["目", "坴"]], // harmonious
  ["戴", ["戈", "異"]], // wear on head
  ["窃", ["穴", "切"]], // steal
  ["璧", ["辟", "玉"]], // jade/wall
  ["望", ["亡", "月", "王"]], // hope/gaze
  ["殖", ["歹", "直"]], // multiply/colonize
  ["暖", ["日", "爰"]], // warm
  ["鬱", ["林", "缶"]], // depression
  ["匂", ["勹", "匕"]], // smell/fragrance
  ["奥", ["大", "米"]], // deep/interior
  ["劣", ["少", "力"]], // inferior
  ["羊", ["羊"]], // sheep (radical)
  ["愉", ["心", "兪"]], // pleasant
  ["旺", ["日", "王"]], // prosperous
  ["嘘", ["口", "虚"]], // lie/sigh
  ["冥", ["冖", "日"]], // dark/underworld
  ["窯", ["穴", "缶"]], // kiln
  ["耗", ["耒", "毛"]], // consume
  ["嘲", ["口", "朝"]], // ridicule
  ["粛", ["米", "聿"]], // solemn
  ["平", ["干", "丷"]], // flat/peace
  ["瞼", ["目", "僉"]], // eyelid
  ["媼", ["女", "温"]], // old woman
  ["鎚", ["金", "追"]], // hammer
  ["冤", ["冖", "兔"]], // false charge
  ["巌", ["山", "厳"]], // rock
  ["噂", ["口", "尊"]], // rumor
  ["僻", ["人", "辟"]], // rural/biased
  ["屍", ["尸", "死"]], // corpse
  ["堪", ["土", "甚"]], // endure
  ["淫", ["水", "壬"]], // lewd
  ["壱", ["士", "壺"]], // one (formal)
  ["従", ["彳", "足"]], // follow
  ["朧", ["月", "龍"]], // hazy
  ["腎", ["臣", "月"]], // kidney
  ["腕", ["月", "宛"]], // arm
  ["肌", ["月", "几"]], // skin/muscle
  ["藁", ["艹", "高"]], // straw
  ["冠", ["冖", "元", "寸"]], // crown
  ["無", ["無"]], // nothing (complex)
  ["爽", ["大", "乂"]], // refreshing
  ["尺", ["尸", "丶"]], // shaku (unit)
  ["俵", ["人", "表"]], // straw bag
  ["品", ["口", "口", "口"]], // goods
  ["冷", ["冫", "令"]], // cold
  ["宛", ["宀", "夗"]], // address to
  ["嘩", ["口", "華"]], // noisy
  ["鉱", ["金", "広"]], // ore
  ["忍", ["刃", "心"]], // endure/ninja
  ["庄", ["广", "土"]], // manor
  ["匁", ["刀", "乂"]], // momme (unit)
  ["琲", ["玉", "非"]], // string of gems
  ["蕾", ["艹", "雷"]], // bud
  ["膳", ["月", "善"]], // meal/tray
  ["腰", ["月", "要"]], // waist
  ["肩", ["戸", "月"]], // shoulder
  ["妙", ["女", "少"]], // strange/clever
  ["暮", ["莫", "日"]], // dusk/live
  ["凄", ["冫", "妻"]], // terrible/amazing
  ["枢", ["木", "区"]], // pivot
  ["摩", ["麻", "手"]], // rub/friction
  ["泰", ["大", "水"]], // peaceful
  ["叱", ["口", "七"]], // scold
  ["析", ["木", "斤"]], // analyze
  ["貧", ["分", "貝"]], // poor
  ["弾", ["弓", "単"]], // bullet/play
  ["瑠", ["玉", "流"]], // lapis lazuli
  ["漠", ["水", "莫"]], // vague/desert
  ["后", ["一", "口"]], // empress
  ["錐", ["金", "隹"]], // awl
  ["謡", ["言", "揺"]], // song/chant
  ["溢", ["水", "益"]], // overflow
  ["克", ["十", "口", "儿"]], // overcome
  ["挨", ["手", "矣"]], // push/approach
  ["貼", ["貝", "占"]], // paste/stick
  ["囁", ["口", "聶"]], // whisper
  ["詫", ["言", "宅"]], // apologize
  ["濯", ["水", "翟"]], // wash
  ["竈", ["穴", "土"]], // stove
  ["劾", ["刀", "亥"]], // impeach
  ["岳", ["山", "丘"]], // mountain peak
  ["赦", ["赤", "攴"]], // pardon
  ["栗", ["西", "木"]], // chestnut
  ["堀", ["土", "屈"]], // moat/ditch
  ["弧", ["弓", "瓜"]], // arc
  ["楼", ["木", "婁"]], // tower/building
  ["丘", ["一", "斤"]], // hill
  ["憾", ["心", "感"]], // regret
  ["骸", ["骨", "亥"]], // remains
  ["賤", ["貝", "戔"]], // lowly
  ["凖", ["冫", "準"]], // standard (variant)
  ["孤", ["子", "瓜"]], // orphan/alone
  ["仰", ["人", "卬"]], // look up
  ["暁", ["日", "尭"]], // dawn
  ["慶", ["广", "心"]], // celebrate
  ["珠", ["玉", "朱"]], // pearl
  ["抽", ["手", "由"]], // extract
  ["梯", ["木", "弟"]], // ladder
  ["逓", ["辶", "虒"]], // relay
  ["髄", ["骨", "隋"]], // marrow
  ["楔", ["木", "契"]], // wedge
  ["旋", ["方", "疋"]], // revolve
  ["始", ["女", "台"]], // begin
  ["彰", ["章", "彡"]], // manifest
  ["熾", ["火", "識"]], // blaze
  ["玩", ["玉", "元"]], // play/toy
  ["臍", ["月", "齊"]], // navel
  ["串", ["口", "丨"]], // skewer
  ["淀", ["水", "定"]], // settle/sediment
  ["堰", ["土", "偃"]], // dam
  ["槍", ["木", "倉"]], // spear
  ["袴", ["衣", "夸"]], // hakama
  ["倣", ["人", "放"]], // imitate
  ["践", ["足", "戔"]], // tread/practice
  ["奔", ["大", "卉"]], // run/rush
  ["呟", ["口", "玄"]], // mutter
  ["揃", ["手", "前"]], // arrange
  ["奨", ["爿", "大"]], // encourage
  ["征", ["彳", "正"]], // conquer
  ["枯", ["木", "古"]], // wither
  ["存", ["子", "才"]], // exist
  ["氷", ["冫", "水"]], // ice
  ["損", ["手", "員"]], // loss/damage
  ["浸", ["水", "寝"]], // soak
  ["昇", ["日", "升"]], // rise
  ["貸", ["貝", "代"]], // lend
  ["朗", ["月", "良"]], // cheerful
  ["耐", ["而", "寸"]], // endure
  ["呆", ["口", "木"]], // dumbfounded
  ["昭", ["日", "召"]], // shining
  ["頃", ["匕", "頁"]], // time/about
  ["旨", ["匕", "日"]], // purport/delicious
  ["浄", ["水", "争"]], // pure/clean
  ["匠", ["匚", "斤"]], // craftsman
  ["敏", ["每", "攴"]], // quick/clever
  ["核", ["木", "亥"]], // core/nuclear
  ["紹", ["糸", "召"]], // introduce
  ["沿", ["水", "八"]], // along
  ["詰", ["言", "吉"]], // packed/question
  ["弦", ["弓", "玄"]], // string/chord
  ["珍", ["玉", "彡"]], // rare/precious
  ["斉", ["齊"]], // equal/together
  ["奮", ["大", "隹"]], // rouse
  ["晶", ["日", "日", "日"]], // crystal
  ["徴", ["彳", "山", "王"]], // sign/collect
  ["越", ["走", "戉"]], // surpass
  ["杖", ["木", "丈"]], // cane/staff
  ["斬", ["車", "斤"]], // kill/behead
  ["継", ["糸", "米"]], // inherit
  ["鉢", ["金", "本"]], // bowl
  ["斜", ["斗", "余"]], // diagonal
  ["訂", ["言", "丁"]], // revise
  ["戒", ["戈", "廾"]], // admonish
  ["卑", ["田", "丿"]], // lowly
  ["尋", ["彐", "工", "口", "寸"]], // inquire
  ["徳", ["彳", "心"]], // virtue
  ["傾", ["人", "頃"]], // incline
  ["湾", ["水", "弯"]], // bay
  ["吾", ["五", "口"]], // I/my
  ["溝", ["水", "冓"]], // ditch
  ["託", ["言", "乇"]], // entrust
  ["抵", ["手", "氐"]], // resist
  ["敢", ["干", "攴"]], // dare
  ["弔", ["弓", "丨"]], // condole
  ["脂", ["月", "旨"]], // fat/grease
  ["粗", ["米", "且"]], // coarse
  ["微", ["彳", "山", "一"]], // slight
  ["歳", ["止", "戈"]], // age/year
  ["粘", ["米", "占"]], // sticky
  ["哀", ["衣", "口"]], // sorrow
  ["憲", ["宀", "心"]], // constitution
  ["房", ["戸", "方"]], // room/cluster
  ["班", ["王", "丬"]], // squad
  ["浦", ["水", "甫"]], // bay/shore
  ["渉", ["水", "歩"]], // ford/involve
  ["譲", ["言", "襄"]], // yield
  ["渋", ["水", "止"]], // astringent
  ["郷", ["郎", "阝"]], // hometown
  ["虚", ["虍", "业"]], // void/empty
  ["牲", ["牛", "生"]], // sacrifice/animal
  ["釈", ["釆", "尺"]], // interpret
  ["奪", ["大", "隹"]], // seize
  ["肝", ["月", "干"]], // liver
  ["拘", ["手", "句"]], // arrest
  ["衝", ["行", "重"]], // collide
  ["徹", ["彳", "育"]], // penetrate
  ["誉", ["言", "興"]], // praise
  ["叔", ["又", "小"]], // uncle
  ["垣", ["土", "亘"]], // fence
  ["徐", ["彳", "余"]], // slowly
  ["涯", ["水", "厓"]], // shore/limit
  ["芯", ["艹", "心"]], // wick/core
  ["殴", ["殳", "区"]], // beat
  ["凝", ["冫", "疑"]], // congeal
  ["恭", ["共", "心"]], // respectful
  ["栓", ["木", "全"]], // plug/stopper
  ["披", ["手", "皮"]], // expose/spread
  ["胆", ["月", "旦"]], // gallbladder
  ["芳", ["艹", "方"]], // fragrant
  ["謙", ["言", "兼"]], // humble
  ["峡", ["山", "夾"]], // gorge
  ["諦", ["言", "帝"]], // abandon/truth
  ["維", ["糸", "隹"]], // maintain
  ["准", ["冫", "隹"]], // quasi/approve
  ["酎", ["酉", "寸"]], // sake
  ["呪", ["口", "兄"]], // curse
  ["戯", ["戈", "虚"]], // play/drama
  ["幽", ["山", "幺"]], // secluded
  ["麗", ["鹿", "一"]], // beautiful
  ["澄", ["水", "登"]], // clear
  ["逐", ["辶", "豕"]], // pursue
  ["脇", ["月", "劦"]], // side/armpit
  ["幾", ["幺", "戈"]], // how many
  ["霰", ["雨", "散"]], // hail
  ["扶", ["手", "夫"]], // support
  ["詐", ["言", "乍"]], // deceive
  ["抹", ["手", "末"]], // rub/erase
  ["悼", ["心", "卓"]], // mourn
  ["挫", ["手", "坐"]], // crush/sprain
  ["叙", ["又", "余"]], // describe
  ["窮", ["穴", "弓"]], // poor/exhaust
  ["詠", ["言", "永"]], // recite/poem
  ["寄", ["宀", "奇"]], // send/approach
  ["珀", ["玉", "白"]], // amber
  ["至", ["一", "土"]], // arrive
  ["粒", ["米", "立"]], // grain
  ["巧", ["工", "丂"]], // skillful
  ["糧", ["米", "量"]], // provisions
  ["奏", ["大", "天"]], // play music
  ["睫", ["目", "疌"]], // eyelash
  ["浅", ["水", "戔"]], // shallow
  ["了", ["了"]], // finish (basic)
  ["欲", ["谷", "欠"]], // desire
  ["鎧", ["金", "豈"]], // armor
  ["琥", ["玉", "虎"]], // amber/tiger
  ["鎮", ["金", "真"]], // calm/suppress
  ["痒", ["疒", "羊"]], // itch
  ["胎", ["月", "台"]], // womb
  ["匿", ["匚", "若"]], // hide
  ["踝", ["足", "果"]], // ankle
  ["捻", ["手", "念"]], // twist
  ["暗", ["日", "音"]], // dark
  ["添", ["水", "忝"]], // add
  ["匹", ["匚", "儿"]], // counter/equal
  ["曇", ["日", "雲"]], // cloudy
  ["拓", ["手", "石"]], // open/expand
  ["豚", ["月", "豕"]], // pig
  ["精", ["米", "青"]], // essence/spirit
  ["縄", ["糸", "亀"]], // rope
  ["剤", ["齊", "刀"]], // dose/medicine
  ["喧", ["口", "宣"]], // noisy
  ["胴", ["月", "同"]], // torso
  ["脅", ["月", "劦"]], // threaten
  ["湧", ["水", "勇"]], // gush
  ["殊", ["歹", "朱"]], // especially
  ["彫", ["彡", "周"]], // carve
  ["滴", ["水", "啇"]], // drip
  ["舷", ["舟", "玄"]], // gunwale
  ["靄", ["雨", "謁"]], // mist/haze
  ["静", ["青", "争"]], // quiet
  ["該", ["言", "亥"]], // applicable
];

async function main() {
  console.log("Starting complete kanji-radical relationship fix...\n");
  console.log("=".repeat(60));
  console.log("ADDING MAPPINGS FOR 628 MISSING KANJI");
  console.log("=".repeat(60));
  console.log("\n");

  // Get all radicals from the database
  const allRadicals = await prisma.radical.findMany({
    select: {
      id: true,
      character: true,
    },
  });
  console.log(`Total radicals in database: ${allRadicals.length}\n`);

  // Create a map of radical character to radical IDs
  const radicalMap = new Map<string, number[]>();
  for (const radical of allRadicals) {
    if (radical.character) {
      const ids = radicalMap.get(radical.character) || [];
      ids.push(radical.id);
      radicalMap.set(radical.character, ids);
    }
  }
  console.log(`Unique radical characters mapped: ${radicalMap.size}\n`);

  // Get all kanji from the database
  const allKanji = await prisma.kanji.findMany({
    select: {
      id: true,
      character: true,
    },
  });

  // Create kanji character to ID map
  const kanjiMap = new Map<string, number>();
  for (const kanji of allKanji) {
    kanjiMap.set(kanji.character, kanji.id);
  }

  let created = 0;
  let skipped = 0;
  let kanjiNotFound = 0;
  const missingRadicals: Set<string> = new Set();

  // Process each mapping
  for (const [kanjiChar, radicalChars] of kanjiRadicalMappings) {
    const kanjiId = kanjiMap.get(kanjiChar);

    if (!kanjiId) {
      kanjiNotFound++;
      continue;
    }

    for (const radChar of radicalChars) {
      const radicalIds = radicalMap.get(radChar);

      if (radicalIds && radicalIds.length > 0) {
        const radicalId = radicalIds[0];

        // Check if relationship already exists
        const existing = await prisma.kanjiRadical.findUnique({
          where: {
            kanjiId_radicalId: {
              kanjiId: kanjiId,
              radicalId: radicalId,
            },
          },
        });

        if (!existing) {
          await prisma.kanjiRadical.create({
            data: {
              kanjiId: kanjiId,
              radicalId: radicalId,
            },
          });
          created++;
        } else {
          skipped++;
        }
      } else {
        missingRadicals.add(radChar);
      }
    }
  }

  // Final statistics
  const finalRelations = await prisma.kanjiRadical.count();
  const kanjiWithoutRadicals = await prisma.kanji.count({
    where: {
      radicals: {
        none: {},
      },
    },
  });

  console.log("=".repeat(60));
  console.log("SUMMARY REPORT");
  console.log("=".repeat(60));
  console.log(`New relationships created: ${created}`);
  console.log(`Relationships already existed (skipped): ${skipped}`);
  console.log(`Kanji not found in database: ${kanjiNotFound}`);
  console.log(`\nTotal relationships now: ${finalRelations}`);
  console.log(`Kanji still without radicals: ${kanjiWithoutRadicals}`);
  console.log("=".repeat(60));
  console.log("\n");

  if (missingRadicals.size > 0) {
    console.log("Radicals referenced but not in database:");
    console.log(Array.from(missingRadicals).join(" "));
    console.log("\n");
  }

  // List any kanji still missing radicals
  if (kanjiWithoutRadicals > 0) {
    const stillMissing = await prisma.kanji.findMany({
      where: {
        radicals: {
          none: {},
        },
      },
      select: {
        character: true,
        levelId: true,
      },
      orderBy: { levelId: "asc" },
      take: 100, // Show first 100
    });

    console.log(`First ${Math.min(100, stillMissing.length)} kanji still without radicals:`);
    console.log(stillMissing.map(k => k.character).join(" "));
  }
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
