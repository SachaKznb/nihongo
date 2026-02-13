import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final large batch to reach 2000+ kanji
const kanjiData = [
  // Buildings and places
  { character: "殿", meaningsFr: ["Palais"], readingsOn: ["デン"], readingsKun: ["との"], meaningMnemonicFr: "Le bâtiment royal = PALAIS.", readingMnemonicFr: "TONO - palais.", levelId: 51 },
  { character: "閣", meaningsFr: ["Pavillon"], readingsOn: ["カク"], readingsKun: [], meaningMnemonicFr: "La porte + chaque = PAVILLON.", readingMnemonicFr: "KAKU - pavillon.", levelId: 52 },
  { character: "棟", meaningsFr: ["Bâtiment"], readingsOn: ["トウ"], readingsKun: ["むね"], meaningMnemonicFr: "Le bois + l'est = BÂTIMENT.", readingMnemonicFr: "MUNE - bâtiment.", levelId: 53 },
  { character: "堂", meaningsFr: ["Temple"], readingsOn: ["ドウ"], readingsKun: [], meaningMnemonicFr: "Le haut + la terre = TEMPLE.", readingMnemonicFr: "DOU - temple.", levelId: 54 },
  { character: "廟", meaningsFr: ["Sanctuaire"], readingsOn: ["ビョウ"], readingsKun: [], meaningMnemonicFr: "Le toit + le matin = SANCTUAIRE.", readingMnemonicFr: "BYOU - sanctuaire.", levelId: 55 },
  { character: "祠", meaningsFr: ["Petit temple"], readingsOn: ["シ"], readingsKun: ["ほこら"], meaningMnemonicFr: "Le dieu + le servir = PETIT TEMPLE.", readingMnemonicFr: "HOKORA - petit temple.", levelId: 56 },
  { character: "楼", meaningsFr: ["Tour"], readingsOn: ["ロウ"], readingsKun: [], meaningMnemonicFr: "Le bois + la femme + la riz = TOUR.", readingMnemonicFr: "ROU - tour.", levelId: 57 },
  { character: "蔵", meaningsFr: ["Entrepôt"], readingsOn: ["ゾウ"], readingsKun: ["くら"], meaningMnemonicFr: "La plante + le cacher = ENTREPÔT.", readingMnemonicFr: "KURA - entrepôt.", levelId: 58 },
  { character: "庫", meaningsFr: ["Dépôt"], readingsOn: ["コ"], readingsKun: [], meaningMnemonicFr: "Le toit + la voiture = DÉPÔT.", readingMnemonicFr: "KO - dépôt.", levelId: 59 },
  { character: "廊", meaningsFr: ["Corridor"], readingsOn: ["ロウ"], readingsKun: [], meaningMnemonicFr: "Le toit + le bon = CORRIDOR.", readingMnemonicFr: "ROU - corridor.", levelId: 60 },

  // More nature kanji
  { character: "嵐", meaningsFr: ["Tempête"], readingsOn: ["ラン"], readingsKun: ["あらし"], meaningMnemonicFr: "La montagne + le vent = TEMPÊTE.", readingMnemonicFr: "ARASHI - tempête.", levelId: 41 },
  { character: "稲妻", meaningsFr: ["Éclair"], readingsOn: ["イナズマ"], readingsKun: ["いなずま"], meaningMnemonicFr: "Le riz + la femme = ÉCLAIR.", readingMnemonicFr: "INAZUMA - éclair.", levelId: 42 },
  { character: "霰", meaningsFr: ["Grêle"], readingsOn: ["サン"], readingsKun: ["あられ"], meaningMnemonicFr: "La pluie + le disperser = GRÊLE.", readingMnemonicFr: "ARARE - grêle.", levelId: 43 },
  { character: "霙", meaningsFr: ["Neige fondue"], readingsOn: ["エイ"], readingsKun: ["みぞれ"], meaningMnemonicFr: "La pluie + l'anglais = NEIGE FONDUE.", readingMnemonicFr: "MIZORE - neige fondue.", levelId: 44 },
  { character: "霞", meaningsFr: ["Brume"], readingsOn: ["カ"], readingsKun: ["かすみ"], meaningMnemonicFr: "La pluie + le soldat = BRUME.", readingMnemonicFr: "KASUMI - brume.", levelId: 45 },
  { character: "朧", meaningsFr: ["Vague"], readingsOn: ["ロウ"], readingsKun: ["おぼろ"], meaningMnemonicFr: "La lune + le dragon = VAGUE.", readingMnemonicFr: "OBORO - vague.", levelId: 46 },
  { character: "陽", meaningsFr: ["Soleil"], readingsOn: ["ヨウ"], readingsKun: ["ひ"], meaningMnemonicFr: "La colline + le changement = SOLEIL.", readingMnemonicFr: "HI - soleil.", levelId: 47 },
  { character: "陰", meaningsFr: ["Ombre"], readingsOn: ["イン"], readingsKun: ["かげ"], meaningMnemonicFr: "La colline + le maintenant = OMBRE.", readingMnemonicFr: "KAGE - ombre.", levelId: 48 },
  { character: "暁", meaningsFr: ["Aube"], readingsOn: ["ギョウ"], readingsKun: ["あかつき"], meaningMnemonicFr: "Le soleil + le frère = AUBE.", readingMnemonicFr: "AKATSUKI - aube.", levelId: 49 },
  { character: "曙", meaningsFr: ["Aurore"], readingsOn: ["ショ"], readingsKun: ["あけぼの"], meaningMnemonicFr: "Le soleil + le chef = AURORE.", readingMnemonicFr: "AKEBONO - aurore.", levelId: 50 },

  // Verbs and actions
  { character: "眺", meaningsFr: ["Contempler"], readingsOn: ["チョウ"], readingsKun: ["なが-める"], meaningMnemonicFr: "L'œil + le signe = CONTEMPLER.", readingMnemonicFr: "NAGAMERU - contempler.", levelId: 51 },
  { character: "睨", meaningsFr: ["Fixer"], readingsOn: ["ゲイ"], readingsKun: ["にら-む"], meaningMnemonicFr: "L'œil + les deux = FIXER.", readingMnemonicFr: "NIRAMU - fixer.", levelId: 52 },
  { character: "瞬", meaningsFr: ["Cligner"], readingsOn: ["シュン"], readingsKun: ["またた-く"], meaningMnemonicFr: "L'œil + le soleil = CLIGNER.", readingMnemonicFr: "MATATAKU - cligner.", levelId: 53 },
  { character: "眠", meaningsFr: ["Dormir"], readingsOn: ["ミン"], readingsKun: ["ねむ-る"], meaningMnemonicFr: "L'œil + le peuple = DORMIR.", readingMnemonicFr: "NEMURU - dormir.", levelId: 54 },
  { character: "醒", meaningsFr: ["Se réveiller"], readingsOn: ["セイ"], readingsKun: ["さ-める"], meaningMnemonicFr: "L'alcool + la naissance = SE RÉVEILLER.", readingMnemonicFr: "SAMERU - se réveiller.", levelId: 55 },
  { character: "覚", meaningsFr: ["Se souvenir"], readingsOn: ["カク"], readingsKun: ["おぼ-える"], meaningMnemonicFr: "L'apprendre + voir = SE SOUVENIR.", readingMnemonicFr: "OBOERU - se souvenir.", levelId: 56 },
  { character: "忘", meaningsFr: ["Oublier"], readingsOn: ["ボウ"], readingsKun: ["わす-れる"], meaningMnemonicFr: "Le cœur + la mort = OUBLIER.", readingMnemonicFr: "WASURERU - oublier.", levelId: 57 },
  { character: "懐", meaningsFr: ["Se rappeler"], readingsOn: ["カイ"], readingsKun: ["なつ-かしい"], meaningMnemonicFr: "Le cœur + le vêtement = SE RAPPELER.", readingMnemonicFr: "NATSUKASHII - nostalgique.", levelId: 58 },
  { character: "慕", meaningsFr: ["Admirer"], readingsOn: ["ボ"], readingsKun: ["した-う"], meaningMnemonicFr: "La plante + le soleil + le cœur = ADMIRER.", readingMnemonicFr: "SHITAU - admirer.", levelId: 59 },
  { character: "憧", meaningsFr: ["Aspirer"], readingsOn: ["ショウ"], readingsKun: ["あこが-れる"], meaningMnemonicFr: "Le cœur + l'enfant = ASPIRER.", readingMnemonicFr: "AKOGARERU - aspirer.", levelId: 60 },

  // Food and cuisine
  { character: "膳", meaningsFr: ["Plateau-repas"], readingsOn: ["ゼン"], readingsKun: [], meaningMnemonicFr: "La chair + le bien = PLATEAU-REPAS.", readingMnemonicFr: "ZEN - plateau-repas.", levelId: 41 },
  { character: "椀", meaningsFr: ["Bol"], readingsOn: ["ワン"], readingsKun: [], meaningMnemonicFr: "Le bois + le soir = BOL.", readingMnemonicFr: "WAN - bol.", levelId: 42 },
  { character: "皿", meaningsFr: ["Assiette"], readingsOn: ["ベイ"], readingsKun: ["さら"], meaningMnemonicFr: "L'ASSIETTE plate.", readingMnemonicFr: "SARA - assiette.", levelId: 43 },
  { character: "盆", meaningsFr: ["Plateau"], readingsOn: ["ボン"], readingsKun: [], meaningMnemonicFr: "La division + le récipient = PLATEAU.", readingMnemonicFr: "BON - plateau.", levelId: 44 },
  { character: "鍋", meaningsFr: ["Marmite"], readingsOn: ["カ"], readingsKun: ["なべ"], meaningMnemonicFr: "Le métal + le intérieur = MARMITE.", readingMnemonicFr: "NABE - marmite.", levelId: 45 },
  { character: "釜", meaningsFr: ["Chaudron"], readingsOn: ["フ"], readingsKun: ["かま"], meaningMnemonicFr: "Le père + le métal = CHAUDRON.", readingMnemonicFr: "KAMA - chaudron.", levelId: 46 },
  { character: "竈", meaningsFr: ["Fourneau"], readingsOn: ["ソウ"], readingsKun: ["かまど"], meaningMnemonicFr: "Le trou + le riz = FOURNEAU.", readingMnemonicFr: "KAMADO - fourneau.", levelId: 47 },
  { character: "匙", meaningsFr: ["Cuillère"], readingsOn: ["シ"], readingsKun: ["さじ"], meaningMnemonicFr: "L'enclos + le est = CUILLÈRE.", readingMnemonicFr: "SAJI - cuillère.", levelId: 48 },
  { character: "箸", meaningsFr: ["Baguettes"], readingsOn: ["チョ"], readingsKun: ["はし"], meaningMnemonicFr: "Le bambou + le personne = BAGUETTES.", readingMnemonicFr: "HASHI - baguettes.", levelId: 49 },
  { character: "串", meaningsFr: ["Brochette"], readingsOn: ["カン"], readingsKun: ["くし"], meaningMnemonicFr: "La BROCHETTE qui traverse.", readingMnemonicFr: "KUSHI - brochette.", levelId: 50 },

  // Society and people
  { character: "翁", meaningsFr: ["Vieillard"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "Les plumes + le public = VIEILLARD.", readingMnemonicFr: "OU - vieillard.", levelId: 51 },
  { character: "媼", meaningsFr: ["Vieille femme"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "La femme + le chaud = VIEILLE FEMME.", readingMnemonicFr: "OU - vieille femme.", levelId: 52 },
  { character: "嫗", meaningsFr: ["Vieille femme"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "La femme + la zone = VIEILLE FEMME.", readingMnemonicFr: "OU - vieille femme.", levelId: 53 },
  { character: "翁", meaningsFr: ["Ancêtre"], readingsOn: ["オウ"], readingsKun: ["おきな"], meaningMnemonicFr: "Les plumes + public = ANCÊTRE.", readingMnemonicFr: "OKINA - ancêtre.", levelId: 54 },
  { character: "嬢", meaningsFr: ["Demoiselle"], readingsOn: ["ジョウ"], readingsKun: [], meaningMnemonicFr: "La femme + le sol = DEMOISELLE.", readingMnemonicFr: "JOU - demoiselle.", levelId: 55 },
  { character: "姫", meaningsFr: ["Princesse"], readingsOn: ["キ"], readingsKun: ["ひめ"], meaningMnemonicFr: "La femme + la bouche = PRINCESSE.", readingMnemonicFr: "HIME - princesse.", levelId: 56 },
  { character: "妃", meaningsFr: ["Impératrice"], readingsOn: ["ヒ"], readingsKun: ["きさき"], meaningMnemonicFr: "La femme + le servir = IMPÉRATRICE.", readingMnemonicFr: "KISAKI - impératrice.", levelId: 57 },
  { character: "后", meaningsFr: ["Reine"], readingsOn: ["コウ"], readingsKun: ["きさき"], meaningMnemonicFr: "La bouche + un = REINE.", readingMnemonicFr: "KISAKI - reine.", levelId: 58 },
  { character: "帝", meaningsFr: ["Empereur"], readingsOn: ["テイ"], readingsKun: ["みかど"], meaningMnemonicFr: "Le chapeau + le haut = EMPEREUR.", readingMnemonicFr: "MIKADO - empereur.", levelId: 59 },
  { character: "皇", meaningsFr: ["Souverain"], readingsOn: ["コウ"], readingsKun: [], meaningMnemonicFr: "Le blanc + le roi = SOUVERAIN.", readingMnemonicFr: "KOU - souverain.", levelId: 60 },

  // Professions
  { character: "匠", meaningsFr: ["Artisan"], readingsOn: ["ショウ"], readingsKun: ["たくみ"], meaningMnemonicFr: "L'enclos + le bâton = ARTISAN.", readingMnemonicFr: "TAKUMI - artisan.", levelId: 41 },
  { character: "翻", meaningsFr: ["Traduire"], readingsOn: ["ホン"], readingsKun: ["ひるがえ-す"], meaningMnemonicFr: "Le voleter + le plume = TRADUIRE.", readingMnemonicFr: "HIRUGAESU - traduire.", levelId: 42 },
  { character: "訳", meaningsFr: ["Traduire"], readingsOn: ["ヤク"], readingsKun: ["わけ"], meaningMnemonicFr: "Les mots + le différent = TRADUIRE.", readingMnemonicFr: "WAKE - raison.", levelId: 43 },
  { character: "釈", meaningsFr: ["Expliquer"], readingsOn: ["シャク"], readingsKun: [], meaningMnemonicFr: "Le bonheur + la naissance = EXPLIQUER.", readingMnemonicFr: "SHAKU - expliquer.", levelId: 44 },
  { character: "紡", meaningsFr: ["Filer"], readingsOn: ["ボウ"], readingsKun: ["つむ-ぐ"], meaningMnemonicFr: "Le fil + la direction = FILER.", readingMnemonicFr: "TSUMUGU - filer.", levelId: 45 },
  { character: "繊", meaningsFr: ["Fibre"], readingsOn: ["セン"], readingsKun: [], meaningMnemonicFr: "Le fil + le mille = FIBRE.", readingMnemonicFr: "SEN - fibre.", levelId: 46 },
  { character: "縫", meaningsFr: ["Coudre"], readingsOn: ["ホウ"], readingsKun: ["ぬ-う"], meaningMnemonicFr: "Le fil + avancer = COUDRE.", readingMnemonicFr: "NUU - coudre.", levelId: 47 },
  { character: "紳", meaningsFr: ["Gentleman"], readingsOn: ["シン"], readingsKun: [], meaningMnemonicFr: "Le fil + le étendre = GENTLEMAN.", readingMnemonicFr: "SHIN - gentleman.", levelId: 48 },
  { character: "袖", meaningsFr: ["Manche"], readingsOn: ["シュウ"], readingsKun: ["そで"], meaningMnemonicFr: "Le vêtement + le frère = MANCHE.", readingMnemonicFr: "SODE - manche.", levelId: 49 },
  { character: "裾", meaningsFr: ["Ourlet"], readingsOn: ["キョ"], readingsKun: ["すそ"], meaningMnemonicFr: "Le vêtement + le habiter = OURLET.", readingMnemonicFr: "SUSO - ourlet.", levelId: 50 },

  // More unique kanji
  { character: "冥", meaningsFr: ["Sombre"], readingsOn: ["メイ"], readingsKun: [], meaningMnemonicFr: "Le toit + le soleil + le six = SOMBRE.", readingMnemonicFr: "MEI - sombre.", levelId: 51 },
  { character: "冤", meaningsFr: ["Injustice"], readingsOn: ["エン"], readingsKun: [], meaningMnemonicFr: "Le toit + le lapin = INJUSTICE.", readingMnemonicFr: "EN - injustice.", levelId: 52 },
  { character: "宴", meaningsFr: ["Banquet"], readingsOn: ["エン"], readingsKun: ["うたげ"], meaningMnemonicFr: "Le toit + le soleil + la femme = BANQUET.", readingMnemonicFr: "UTAGE - banquet.", levelId: 53 },
  { character: "寿", meaningsFr: ["Longévité"], readingsOn: ["ジュ"], readingsKun: ["ことぶき"], meaningMnemonicFr: "La vie + le pouce = LONGÉVITÉ.", readingMnemonicFr: "KOTOBUKI - longévité.", levelId: 54 },
  { character: "祥", meaningsFr: ["Bonheur"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Le dieu + le mouton = BONHEUR.", readingMnemonicFr: "SHOU - bonheur.", levelId: 55 },
  { character: "瑞", meaningsFr: ["Auspicieux"], readingsOn: ["ズイ"], readingsKun: ["みず"], meaningMnemonicFr: "Le roi + la montagne = AUSPICIEUX.", readingMnemonicFr: "ZUI - auspicieux.", levelId: 56 },
  { character: "瑠", meaningsFr: ["Lapis-lazuli"], readingsOn: ["ル"], readingsKun: [], meaningMnemonicFr: "Le roi + le flux = LAPIS-LAZULI.", readingMnemonicFr: "RU - lapis-lazuli.", levelId: 57 },
  { character: "璃", meaningsFr: ["Verre"], readingsOn: ["リ"], readingsKun: [], meaningMnemonicFr: "Le roi + le village = VERRE.", readingMnemonicFr: "RI - verre.", levelId: 58 },
  { character: "翠", meaningsFr: ["Émeraude"], readingsOn: ["スイ"], readingsKun: ["みどり"], meaningMnemonicFr: "Le plume + le soldat = ÉMERAUDE.", readingMnemonicFr: "MIDORI - émeraude.", levelId: 59 },
  { character: "碧", meaningsFr: ["Jade"], readingsOn: ["ヘキ"], readingsKun: [], meaningMnemonicFr: "Le roi + le blanc + la pierre = JADE.", readingMnemonicFr: "HEKI - jade.", levelId: 60 },

  // Final kanji to exceed 2000
  { character: "琥", meaningsFr: ["Ambre"], readingsOn: ["コ"], readingsKun: [], meaningMnemonicFr: "Le roi + le tigre = AMBRE.", readingMnemonicFr: "KO - ambre.", levelId: 41 },
  { character: "珀", meaningsFr: ["Ambre blanc"], readingsOn: ["ハク"], readingsKun: [], meaningMnemonicFr: "Le roi + le blanc = AMBRE BLANC.", readingMnemonicFr: "HAKU - ambre blanc.", levelId: 42 },
  { character: "珊", meaningsFr: ["Corail"], readingsOn: ["サン"], readingsKun: [], meaningMnemonicFr: "Le roi + le montagne = CORAIL.", readingMnemonicFr: "SAN - corail.", levelId: 43 },
  { character: "瑚", meaningsFr: ["Corail"], readingsOn: ["コ"], readingsKun: [], meaningMnemonicFr: "Le roi + le lac = CORAIL.", readingMnemonicFr: "KO - corail.", levelId: 44 },
  { character: "珈", meaningsFr: ["Café"], readingsOn: ["カ"], readingsKun: [], meaningMnemonicFr: "Le roi + le joindre = CAFÉ.", readingMnemonicFr: "KA - café.", levelId: 45 },
  { character: "琲", meaningsFr: ["Café"], readingsOn: ["ハイ"], readingsKun: [], meaningMnemonicFr: "Le roi + le pas = CAFÉ.", readingMnemonicFr: "HAI - café.", levelId: 46 },
  { character: "琳", meaningsFr: ["Bijou"], readingsOn: ["リン"], readingsKun: [], meaningMnemonicFr: "Le roi + le forêt = BIJOU.", readingMnemonicFr: "RIN - bijou.", levelId: 47 },
  { character: "瑛", meaningsFr: ["Cristal"], readingsOn: ["エイ"], readingsKun: [], meaningMnemonicFr: "Le roi + l'anglais = CRISTAL.", readingMnemonicFr: "EI - cristal.", levelId: 48 },
  { character: "珠", meaningsFr: ["Perle"], readingsOn: ["シュ"], readingsKun: ["たま"], meaningMnemonicFr: "Le roi + le rouge = PERLE.", readingMnemonicFr: "TAMA - perle.", levelId: 49 },
  { character: "玲", meaningsFr: ["Tintement"], readingsOn: ["レイ"], readingsKun: [], meaningMnemonicFr: "Le roi + l'ordre = TINTEMENT.", readingMnemonicFr: "REI - tintement.", levelId: 50 },
];

async function main() {
  console.log("Seeding final kanji batch 4 to exceed 2000...");

  for (const kanji of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonicFr,
        readingMnemonicFr: kanji.readingMnemonicFr,
        levelId: kanji.levelId,
      },
      create: kanji,
    });
  }

  console.log(`Seeded ${kanjiData.length} kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
