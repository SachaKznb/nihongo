import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Large final batch of unique kanji - targeting 280+ to exceed 2000 total
const kanjiData = [
  // Body parts
  { character: "瞳", meaningsFr: ["Pupille"], readingsOn: ["ドウ"], readingsKun: ["ひとみ"], meaningMnemonicFr: "L'œil + l'enfant = PUPILLE.", readingMnemonicFr: "HITOMI - pupille.", levelId: 41 },
  { character: "瞼", meaningsFr: ["Paupière"], readingsOn: ["ケン"], readingsKun: ["まぶた"], meaningMnemonicFr: "L'œil + le danger = PAUPIÈRE.", readingMnemonicFr: "MABUTA - paupière.", levelId: 42 },
  { character: "睫", meaningsFr: ["Cil"], readingsOn: ["ショウ"], readingsKun: ["まつげ"], meaningMnemonicFr: "L'œil + l'herbe = CIL.", readingMnemonicFr: "MATSUGE - cil.", levelId: 43 },
  { character: "唇", meaningsFr: ["Lèvre"], readingsOn: ["シン"], readingsKun: ["くちびる"], meaningMnemonicFr: "La bouche + le matin = LÈVRE.", readingMnemonicFr: "KUCHIBIRU - lèvre.", levelId: 44 },
  { character: "喉", meaningsFr: ["Gorge"], readingsOn: ["コウ"], readingsKun: ["のど"], meaningMnemonicFr: "La bouche + le prince = GORGE.", readingMnemonicFr: "NODO - gorge.", levelId: 45 },
  { character: "肘", meaningsFr: ["Coude"], readingsOn: ["チュウ"], readingsKun: ["ひじ"], meaningMnemonicFr: "La chair + le pouce = COUDE.", readingMnemonicFr: "HIJI - coude.", levelId: 46 },
  { character: "膝", meaningsFr: ["Genou"], readingsOn: ["シツ"], readingsKun: ["ひざ"], meaningMnemonicFr: "La chair + le bois = GENOU.", readingMnemonicFr: "HIZA - genou.", levelId: 47 },
  { character: "踵", meaningsFr: ["Talon"], readingsOn: ["ショウ"], readingsKun: ["かかと"], meaningMnemonicFr: "Le pied + le genre = TALON.", readingMnemonicFr: "KAKATO - talon.", levelId: 48 },
  { character: "爪", meaningsFr: ["Ongle"], readingsOn: ["ソウ"], readingsKun: ["つめ"], meaningMnemonicFr: "L'ONGLE qui griffe.", readingMnemonicFr: "TSUME - ongle.", levelId: 49 },
  { character: "臍", meaningsFr: ["Nombril"], readingsOn: ["サイ"], readingsKun: ["へそ"], meaningMnemonicFr: "La chair + le régulier = NOMBRIL.", readingMnemonicFr: "HESO - nombril.", levelId: 50 },

  // Plants and trees
  { character: "椿", meaningsFr: ["Camélia"], readingsOn: ["チン"], readingsKun: ["つばき"], meaningMnemonicFr: "Le bois + le printemps = CAMÉLIA.", readingMnemonicFr: "TSUBAKI - camélia.", levelId: 51 },
  { character: "楓", meaningsFr: ["Érable"], readingsOn: ["フウ"], readingsKun: ["かえで"], meaningMnemonicFr: "Le bois + le vent = ÉRABLE.", readingMnemonicFr: "KAEDE - érable.", levelId: 52 },
  { character: "柳", meaningsFr: ["Saule"], readingsOn: ["リュウ"], readingsKun: ["やなぎ"], meaningMnemonicFr: "Le bois + la lune = SAULE.", readingMnemonicFr: "YANAGI - saule.", levelId: 53 },
  { character: "杉", meaningsFr: ["Cèdre"], readingsOn: ["サン"], readingsKun: ["すぎ"], meaningMnemonicFr: "Le bois + le triple = CÈDRE.", readingMnemonicFr: "SUGI - cèdre.", levelId: 54 },
  { character: "檜", meaningsFr: ["Cyprès"], readingsOn: ["カイ"], readingsKun: ["ひのき"], meaningMnemonicFr: "Le bois + le rassemblement = CYPRÈS.", readingMnemonicFr: "HINOKI - cyprès.", levelId: 55 },
  { character: "栗", meaningsFr: ["Châtaigne"], readingsOn: ["リツ"], readingsKun: ["くり"], meaningMnemonicFr: "Le bois + l'ouest = CHÂTAIGNE.", readingMnemonicFr: "KURI - châtaigne.", levelId: 56 },
  { character: "柿", meaningsFr: ["Kaki"], readingsOn: ["シ"], readingsKun: ["かき"], meaningMnemonicFr: "Le bois + la ville = KAKI.", readingMnemonicFr: "KAKI - kaki.", levelId: 57 },
  { character: "梨", meaningsFr: ["Poire"], readingsOn: ["リ"], readingsKun: ["なし"], meaningMnemonicFr: "Le bois + le profit = POIRE.", readingMnemonicFr: "NASHI - poire.", levelId: 58 },
  { character: "桃", meaningsFr: ["Pêche"], readingsOn: ["トウ"], readingsKun: ["もも"], meaningMnemonicFr: "Le bois + le signe = PÊCHE.", readingMnemonicFr: "MOMO - pêche.", levelId: 59 },
  { character: "梅", meaningsFr: ["Prunier"], readingsOn: ["バイ"], readingsKun: ["うめ"], meaningMnemonicFr: "Le bois + chaque = PRUNIER.", readingMnemonicFr: "UME - prunier.", levelId: 60 },

  // Fish and sea
  { character: "鯉", meaningsFr: ["Carpe"], readingsOn: ["リ"], readingsKun: ["こい"], meaningMnemonicFr: "Le poisson + le village = CARPE.", readingMnemonicFr: "KOI - carpe.", levelId: 41 },
  { character: "鮭", meaningsFr: ["Saumon"], readingsOn: ["サケ"], readingsKun: ["さけ"], meaningMnemonicFr: "Le poisson + le sol = SAUMON.", readingMnemonicFr: "SAKE - saumon.", levelId: 42 },
  { character: "鯛", meaningsFr: ["Daurade"], readingsOn: ["タイ"], readingsKun: ["たい"], meaningMnemonicFr: "Le poisson + le roi = DAURADE.", readingMnemonicFr: "TAI - daurade.", levelId: 43 },
  { character: "鮪", meaningsFr: ["Thon"], readingsOn: ["ユウ"], readingsKun: ["まぐろ"], meaningMnemonicFr: "Le poisson + l'existence = THON.", readingMnemonicFr: "MAGURO - thon.", levelId: 44 },
  { character: "鰹", meaningsFr: ["Bonite"], readingsOn: ["ケン"], readingsKun: ["かつお"], meaningMnemonicFr: "Le poisson + le solide = BONITE.", readingMnemonicFr: "KATSUO - bonite.", levelId: 45 },
  { character: "鯖", meaningsFr: ["Maquereau"], readingsOn: ["サバ"], readingsKun: ["さば"], meaningMnemonicFr: "Le poisson + le bleu = MAQUEREAU.", readingMnemonicFr: "SABA - maquereau.", levelId: 46 },
  { character: "鰻", meaningsFr: ["Anguille"], readingsOn: ["マン"], readingsKun: ["うなぎ"], meaningMnemonicFr: "Le poisson + le long = ANGUILLE.", readingMnemonicFr: "UNAGI - anguille.", levelId: 47 },
  { character: "蛸", meaningsFr: ["Poulpe"], readingsOn: ["タコ"], readingsKun: ["たこ"], meaningMnemonicFr: "L'insecte + le petit = POULPE.", readingMnemonicFr: "TAKO - poulpe.", levelId: 48 },
  { character: "烏賊", meaningsFr: ["Calamar"], readingsOn: ["ウゾク"], readingsKun: ["いか"], meaningMnemonicFr: "L'oiseau + le voleur = CALAMAR.", readingMnemonicFr: "IKA - calamar.", levelId: 49 },
  { character: "蝦", meaningsFr: ["Crevette"], readingsOn: ["カ"], readingsKun: ["えび"], meaningMnemonicFr: "L'insecte + le faux = CREVETTE.", readingMnemonicFr: "EBI - crevette.", levelId: 50 },

  // Insects
  { character: "蜘", meaningsFr: ["Araignée"], readingsOn: ["チ"], readingsKun: ["くも"], meaningMnemonicFr: "L'insecte + le savoir = ARAIGNÉE.", readingMnemonicFr: "KUMO - araignée.", levelId: 51 },
  { character: "蝿", meaningsFr: ["Mouche"], readingsOn: ["ヨウ"], readingsKun: ["はえ"], meaningMnemonicFr: "L'insecte + le toit = MOUCHE.", readingMnemonicFr: "HAE - mouche.", levelId: 52 },
  { character: "蚊", meaningsFr: ["Moustique"], readingsOn: ["ブン"], readingsKun: ["か"], meaningMnemonicFr: "L'insecte + le texte = MOUSTIQUE.", readingMnemonicFr: "KA - moustique.", levelId: 53 },
  { character: "蟬", meaningsFr: ["Cigale"], readingsOn: ["セン"], readingsKun: ["せみ"], meaningMnemonicFr: "L'insecte + le zen = CIGALE.", readingMnemonicFr: "SEMI - cigale.", levelId: 54 },
  { character: "蛾", meaningsFr: ["Papillon de nuit"], readingsOn: ["ガ"], readingsKun: [], meaningMnemonicFr: "L'insecte + le je = PAPILLON DE NUIT.", readingMnemonicFr: "GA - papillon de nuit.", levelId: 55 },
  { character: "蜜", meaningsFr: ["Miel"], readingsOn: ["ミツ"], readingsKun: [], meaningMnemonicFr: "L'insecte + le nécessaire = MIEL.", readingMnemonicFr: "MITSU - miel.", levelId: 56 },
  { character: "繭", meaningsFr: ["Cocon"], readingsOn: ["ケン"], readingsKun: ["まゆ"], meaningMnemonicFr: "Le fil + l'insecte = COCON.", readingMnemonicFr: "MAYU - cocon.", levelId: 57 },
  { character: "蛍", meaningsFr: ["Luciole"], readingsOn: ["ケイ"], readingsKun: ["ほたる"], meaningMnemonicFr: "L'insecte + le feu = LUCIOLE.", readingMnemonicFr: "HOTARU - luciole.", levelId: 58 },
  { character: "蝉", meaningsFr: ["Cigale"], readingsOn: ["セン"], readingsKun: ["せみ"], meaningMnemonicFr: "L'insecte + l'unique = CIGALE.", readingMnemonicFr: "SEMI - cigale.", levelId: 59 },
  { character: "蜂", meaningsFr: ["Abeille"], readingsOn: ["ホウ"], readingsKun: ["はち"], meaningMnemonicFr: "L'insecte + le pic = ABEILLE.", readingMnemonicFr: "HACHI - abeille.", levelId: 60 },

  // Concepts and abstract
  { character: "禅", meaningsFr: ["Zen"], readingsOn: ["ゼン"], readingsKun: [], meaningMnemonicFr: "Le dieu + le simple = ZEN.", readingMnemonicFr: "ZEN - zen.", levelId: 41 },
  { character: "悟", meaningsFr: ["Éveil"], readingsOn: ["ゴ"], readingsKun: ["さと-る"], meaningMnemonicFr: "Le cœur + le je = ÉVEIL.", readingMnemonicFr: "SATORU - s'éveiller.", levelId: 42 },
  { character: "瞑", meaningsFr: ["Fermer les yeux"], readingsOn: ["メイ"], readingsKun: [], meaningMnemonicFr: "L'œil + le sombre = FERMER LES YEUX.", readingMnemonicFr: "MEI - fermer les yeux.", levelId: 43 },
  { character: "黙", meaningsFr: ["Silence"], readingsOn: ["モク"], readingsKun: ["だま-る"], meaningMnemonicFr: "Le noir + le chien = SILENCE.", readingMnemonicFr: "DAMARU - se taire.", levelId: 44 },
  { character: "寂", meaningsFr: ["Solitude"], readingsOn: ["ジャク"], readingsKun: ["さび-しい"], meaningMnemonicFr: "Le toit + le oncle = SOLITUDE.", readingMnemonicFr: "SABISHII - solitaire.", levelId: 45 },
  { character: "虚", meaningsFr: ["Vide"], readingsOn: ["キョ"], readingsKun: ["むな-しい"], meaningMnemonicFr: "Le tigre + l'industrie = VIDE.", readingMnemonicFr: "MUNASHII - vide.", levelId: 46 },
  { character: "幻", meaningsFr: ["Illusion"], readingsOn: ["ゲン"], readingsKun: ["まぼろし"], meaningMnemonicFr: "Le privé = ILLUSION.", readingMnemonicFr: "MABOROSHI - illusion.", levelId: 47 },
  { character: "夢", meaningsFr: ["Rêve"], readingsOn: ["ム"], readingsKun: ["ゆめ"], meaningMnemonicFr: "Le soir + le toit + l'œil = RÊVE.", readingMnemonicFr: "YUME - rêve.", levelId: 48 },
  { character: "魂", meaningsFr: ["Âme"], readingsOn: ["コン"], readingsKun: ["たましい"], meaningMnemonicFr: "Le démon + le nuage = ÂME.", readingMnemonicFr: "TAMASHII - âme.", levelId: 49 },
  { character: "霊", meaningsFr: ["Esprit"], readingsOn: ["レイ"], readingsKun: ["たま"], meaningMnemonicFr: "La pluie + le jade = ESPRIT.", readingMnemonicFr: "REI - esprit.", levelId: 50 },

  // More verbs
  { character: "囲", meaningsFr: ["Entourer"], readingsOn: ["イ"], readingsKun: ["かこ-む"], meaningMnemonicFr: "L'enclos + le puits = ENTOURER.", readingMnemonicFr: "KAKOMU - entourer.", levelId: 51 },
  { character: "詰", meaningsFr: ["Remplir"], readingsOn: ["キツ"], readingsKun: ["つ-める"], meaningMnemonicFr: "Les mots + le bon = REMPLIR.", readingMnemonicFr: "TSUMERU - remplir.", levelId: 52 },
  { character: "挟", meaningsFr: ["Pincer"], readingsOn: ["キョウ"], readingsKun: ["はさ-む"], meaningMnemonicFr: "La main + serrer = PINCER.", readingMnemonicFr: "HASAMU - pincer.", levelId: 53 },
  { character: "刺", meaningsFr: ["Piquer"], readingsOn: ["シ"], readingsKun: ["さ-す"], meaningMnemonicFr: "L'arbre + le couteau = PIQUER.", readingMnemonicFr: "SASU - piquer.", levelId: 54 },
  { character: "縛", meaningsFr: ["Lier"], readingsOn: ["バク"], readingsKun: ["しば-る"], meaningMnemonicFr: "Le fil + l'épais = LIER.", readingMnemonicFr: "SHIBARU - lier.", levelId: 55 },
  { character: "漏", meaningsFr: ["Fuir"], readingsOn: ["ロウ"], readingsKun: ["も-れる"], meaningMnemonicFr: "L'eau + la pluie = FUIR.", readingMnemonicFr: "MORERU - fuir.", levelId: 56 },
  { character: "溢", meaningsFr: ["Déborder"], readingsOn: ["イツ"], readingsKun: ["あふ-れる"], meaningMnemonicFr: "L'eau + le bénéfice = DÉBORDER.", readingMnemonicFr: "AFURERU - déborder.", levelId: 57 },
  { character: "滴", meaningsFr: ["Goutte"], readingsOn: ["テキ"], readingsKun: ["しずく"], meaningMnemonicFr: "L'eau + la cible = GOUTTE.", readingMnemonicFr: "SHIZUKU - goutte.", levelId: 58 },
  { character: "染", meaningsFr: ["Teindre"], readingsOn: ["セン"], readingsKun: ["そ-める"], meaningMnemonicFr: "L'eau + le bois = TEINDRE.", readingMnemonicFr: "SOMERU - teindre.", levelId: 59 },
  { character: "滲", meaningsFr: ["Pénétrer"], readingsOn: ["シン"], readingsKun: ["にじ-む"], meaningMnemonicFr: "L'eau + le participer = PÉNÉTRER.", readingMnemonicFr: "NIJIMU - pénétrer.", levelId: 60 },

  // Tools and items
  { character: "筆", meaningsFr: ["Pinceau"], readingsOn: ["ヒツ"], readingsKun: ["ふで"], meaningMnemonicFr: "Le bambou + le frapper = PINCEAU.", readingMnemonicFr: "FUDE - pinceau.", levelId: 41 },
  { character: "墨", meaningsFr: ["Encre"], readingsOn: ["ボク"], readingsKun: ["すみ"], meaningMnemonicFr: "Le noir + la terre = ENCRE.", readingMnemonicFr: "SUMI - encre.", levelId: 42 },
  { character: "硯", meaningsFr: ["Pierre à encre"], readingsOn: ["ケン"], readingsKun: ["すずり"], meaningMnemonicFr: "La pierre + le voir = PIERRE À ENCRE.", readingMnemonicFr: "SUZURI - pierre à encre.", levelId: 43 },
  { character: "軸", meaningsFr: ["Axe"], readingsOn: ["ジク"], readingsKun: [], meaningMnemonicFr: "La voiture + le frère = AXE.", readingMnemonicFr: "JIKU - axe.", levelId: 44 },
  { character: "傘", meaningsFr: ["Parapluie"], readingsOn: ["サン"], readingsKun: ["かさ"], meaningMnemonicFr: "La personne + le toit = PARAPLUIE.", readingMnemonicFr: "KASA - parapluie.", levelId: 45 },
  { character: "扇", meaningsFr: ["Éventail"], readingsOn: ["セン"], readingsKun: ["おうぎ"], meaningMnemonicFr: "La porte + les plumes = ÉVENTAIL.", readingMnemonicFr: "OUGI - éventail.", levelId: 46 },
  { character: "琴", meaningsFr: ["Koto"], readingsOn: ["キン"], readingsKun: ["こと"], meaningMnemonicFr: "Le roi + le maintenant = KOTO.", readingMnemonicFr: "KOTO - koto.", levelId: 47 },
  { character: "笛", meaningsFr: ["Flûte"], readingsOn: ["テキ"], readingsKun: ["ふえ"], meaningMnemonicFr: "Le bambou + le frère = FLÛTE.", readingMnemonicFr: "FUE - flûte.", levelId: 48 },
  { character: "鼓", meaningsFr: ["Tambour"], readingsOn: ["コ"], readingsKun: ["つづみ"], meaningMnemonicFr: "Le frapper + la main = TAMBOUR.", readingMnemonicFr: "TSUZUMI - tambour.", levelId: 49 },
  { character: "鐘", meaningsFr: ["Cloche"], readingsOn: ["ショウ"], readingsKun: ["かね"], meaningMnemonicFr: "Le métal + le enfant = CLOCHE.", readingMnemonicFr: "KANE - cloche.", levelId: 50 },

  // Additional kanji to reach target
  { character: "鏡", meaningsFr: ["Miroir"], readingsOn: ["キョウ"], readingsKun: ["かがみ"], meaningMnemonicFr: "Le métal + le limite = MIROIR.", readingMnemonicFr: "KAGAMI - miroir.", levelId: 51 },
  { character: "盾", meaningsFr: ["Bouclier"], readingsOn: ["ジュン"], readingsKun: ["たて"], meaningMnemonicFr: "Le récipient + la cible = BOUCLIER.", readingMnemonicFr: "TATE - bouclier.", levelId: 52 },
  { character: "槍", meaningsFr: ["Lance"], readingsOn: ["ソウ"], readingsKun: ["やり"], meaningMnemonicFr: "Le bois + l'entrepôt = LANCE.", readingMnemonicFr: "YARI - lance.", levelId: 53 },
  { character: "弓", meaningsFr: ["Arc"], readingsOn: ["キュウ"], readingsKun: ["ゆみ"], meaningMnemonicFr: "L'ARC courbé.", readingMnemonicFr: "YUMI - arc.", levelId: 54 },
  { character: "矢", meaningsFr: ["Flèche"], readingsOn: ["シ"], readingsKun: ["や"], meaningMnemonicFr: "La FLÈCHE qui vole.", readingMnemonicFr: "YA - flèche.", levelId: 55 },
  { character: "刀", meaningsFr: ["Sabre"], readingsOn: ["トウ"], readingsKun: ["かたな"], meaningMnemonicFr: "Le SABRE tranchant.", readingMnemonicFr: "KATANA - sabre.", levelId: 56 },
  { character: "剣", meaningsFr: ["Épée"], readingsOn: ["ケン"], readingsKun: ["つるぎ"], meaningMnemonicFr: "L'ÉPÉE du samouraï.", readingMnemonicFr: "TSURUGI - épée.", levelId: 57 },
  { character: "鎧", meaningsFr: ["Armure"], readingsOn: ["ガイ"], readingsKun: ["よろい"], meaningMnemonicFr: "Le métal + l'enclos = ARMURE.", readingMnemonicFr: "YOROI - armure.", levelId: 58 },
  { character: "兜", meaningsFr: ["Casque"], readingsOn: ["トウ"], readingsKun: ["かぶと"], meaningMnemonicFr: "Les deux + le fils = CASQUE.", readingMnemonicFr: "KABUTO - casque.", levelId: 59 },
  { character: "旗", meaningsFr: ["Drapeau"], readingsOn: ["キ"], readingsKun: ["はた"], meaningMnemonicFr: "La direction + le bizarre = DRAPEAU.", readingMnemonicFr: "HATA - drapeau.", levelId: 60 },

  // Final stretch
  { character: "旋", meaningsFr: ["Tourner"], readingsOn: ["セン"], readingsKun: [], meaningMnemonicFr: "La direction + le mouvement = TOURNER.", readingMnemonicFr: "SEN - tourner.", levelId: 41 },
  { character: "渦", meaningsFr: ["Tourbillon"], readingsOn: ["カ"], readingsKun: ["うず"], meaningMnemonicFr: "L'eau + le nid = TOURBILLON.", readingMnemonicFr: "UZU - tourbillon.", levelId: 42 },
  { character: "螺", meaningsFr: ["Spirale"], readingsOn: ["ラ"], readingsKun: [], meaningMnemonicFr: "L'insecte + le repasser = SPIRALE.", readingMnemonicFr: "RA - spirale.", levelId: 43 },
  { character: "旬", meaningsFr: ["Décade"], readingsOn: ["ジュン"], readingsKun: [], meaningMnemonicFr: "Le jour + le paquet = DÉCADE.", readingMnemonicFr: "JUN - décade.", levelId: 44 },
  { character: "暦", meaningsFr: ["Calendrier"], readingsOn: ["レキ"], readingsKun: ["こよみ"], meaningMnemonicFr: "Le soleil + le pas = CALENDRIER.", readingMnemonicFr: "KOYOMI - calendrier.", levelId: 45 },
  { character: "潤", meaningsFr: ["Humidifier"], readingsOn: ["ジュン"], readingsKun: ["うるお-う"], meaningMnemonicFr: "L'eau + le fermer = HUMIDIFIER.", readingMnemonicFr: "URUOU - humidifier.", levelId: 46 },
  { character: "濯", meaningsFr: ["Rincer"], readingsOn: ["タク"], readingsKun: ["すす-ぐ"], meaningMnemonicFr: "L'eau + l'oiseau = RINCER.", readingMnemonicFr: "SUSUGU - rincer.", levelId: 47 },
  { character: "沃", meaningsFr: ["Fertile"], readingsOn: ["ヨク"], readingsKun: [], meaningMnemonicFr: "L'eau + le grand = FERTILE.", readingMnemonicFr: "YOKU - fertile.", levelId: 48 },
  { character: "漂", meaningsFr: ["Flotter"], readingsOn: ["ヒョウ"], readingsKun: ["ただよ-う"], meaningMnemonicFr: "L'eau + le billet = FLOTTER.", readingMnemonicFr: "TADAYOU - flotter.", levelId: 49 },
  { character: "漁", meaningsFr: ["Pêcher"], readingsOn: ["リョウ"], readingsKun: ["あさ-る"], meaningMnemonicFr: "L'eau + le poisson = PÊCHER.", readingMnemonicFr: "RYO - pêcher.", levelId: 50 },
];

async function main() {
  console.log("Seeding final kanji batch 3...");

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
