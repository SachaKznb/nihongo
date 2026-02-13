import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// More kanji to reach 2000 target
const kanjiData = [
  // Level 11-15 additions
  { character: "空", meaningsFr: ["Ciel", "Vide"], readingsOn: ["クウ"], readingsKun: ["そら", "あ-く"], meaningMnemonicFr: "Le trou dans le travail - CIEL vide.", readingMnemonicFr: "SORA - ciel.", levelId: 11 },
  { character: "海", meaningsFr: ["Mer"], readingsOn: ["カイ"], readingsKun: ["うみ"], meaningMnemonicFr: "L'eau avec chaque mère - MER.", readingMnemonicFr: "UMI - mer.", levelId: 11 },
  { character: "川", meaningsFr: ["Rivière"], readingsOn: ["セン"], readingsKun: ["かわ"], meaningMnemonicFr: "L'eau qui coule - RIVIÈRE.", readingMnemonicFr: "KAWA - rivière.", levelId: 11 },
  { character: "池", meaningsFr: ["Étang"], readingsOn: ["チ"], readingsKun: ["いけ"], meaningMnemonicFr: "L'eau qui reste - ÉTANG.", readingMnemonicFr: "IKE - étang.", levelId: 11 },
  { character: "湖", meaningsFr: ["Lac"], readingsOn: ["コ"], readingsKun: ["みずうみ"], meaningMnemonicFr: "L'eau ancienne - LAC.", readingMnemonicFr: "MIZUUMI - lac.", levelId: 11 },

  { character: "島", meaningsFr: ["Île"], readingsOn: ["トウ"], readingsKun: ["しま"], meaningMnemonicFr: "L'oiseau sur la montagne - ÎLE.", readingMnemonicFr: "SHIMA - île.", levelId: 12 },
  { character: "岸", meaningsFr: ["Rive"], readingsOn: ["ガン"], readingsKun: ["きし"], meaningMnemonicFr: "La montagne au bord - RIVE.", readingMnemonicFr: "KISHI - rive.", levelId: 12 },
  { character: "港", meaningsFr: ["Port"], readingsOn: ["コウ"], readingsKun: ["みなと"], meaningMnemonicFr: "L'eau commune avec un toit - PORT.", readingMnemonicFr: "MINATO - port.", levelId: 12 },
  { character: "橋", meaningsFr: ["Pont"], readingsOn: ["キョウ"], readingsKun: ["はし"], meaningMnemonicFr: "Le bois qui traverse haut - PONT.", readingMnemonicFr: "HASHI - pont.", levelId: 12 },
  { character: "道", meaningsFr: ["Chemin"], readingsOn: ["ドウ"], readingsKun: ["みち"], meaningMnemonicFr: "La tête qui avance - CHEMIN.", readingMnemonicFr: "MICHI - chemin.", levelId: 12 },

  { character: "坂", meaningsFr: ["Pente"], readingsOn: ["ハン"], readingsKun: ["さか"], meaningMnemonicFr: "La terre en opposition - PENTE.", readingMnemonicFr: "SAKA - pente.", levelId: 13 },
  { character: "谷", meaningsFr: ["Vallée"], readingsOn: ["コク"], readingsKun: ["たに"], meaningMnemonicFr: "La bouche de la montagne - VALLÉE.", readingMnemonicFr: "TANI - vallée.", levelId: 13 },
  { character: "森", meaningsFr: ["Forêt"], readingsOn: ["シン"], readingsKun: ["もり"], meaningMnemonicFr: "Trois arbres ensemble - FORÊT dense.", readingMnemonicFr: "MORI - forêt.", levelId: 13 },
  { character: "林", meaningsFr: ["Bois"], readingsOn: ["リン"], readingsKun: ["はやし"], meaningMnemonicFr: "Deux arbres côte à côte - BOIS.", readingMnemonicFr: "HAYASHI - bois.", levelId: 13 },
  { character: "畑", meaningsFr: ["Champ"], readingsOn: [], readingsKun: ["はたけ"], meaningMnemonicFr: "Le feu sur la rizière - CHAMP sec.", readingMnemonicFr: "HATAKE - champ.", levelId: 13 },

  { character: "田", meaningsFr: ["Rizière"], readingsOn: ["デン"], readingsKun: ["た"], meaningMnemonicFr: "Le carré divisé - RIZIÈRE.", readingMnemonicFr: "TA - rizière.", levelId: 14 },
  { character: "草", meaningsFr: ["Herbe"], readingsOn: ["ソウ"], readingsKun: ["くさ"], meaningMnemonicFr: "La plante tôt - HERBE.", readingMnemonicFr: "KUSA - herbe.", levelId: 14 },
  { character: "竹", meaningsFr: ["Bambou"], readingsOn: ["チク"], readingsKun: ["たけ"], meaningMnemonicFr: "Les tiges qui poussent - BAMBOU.", readingMnemonicFr: "TAKE - bambou.", levelId: 14 },
  { character: "松", meaningsFr: ["Pin"], readingsOn: ["ショウ"], readingsKun: ["まつ"], meaningMnemonicFr: "L'arbre public - PIN.", readingMnemonicFr: "MATSU - pin.", levelId: 14 },
  { character: "桜", meaningsFr: ["Cerisier"], readingsOn: ["オウ"], readingsKun: ["さくら"], meaningMnemonicFr: "L'arbre de la femme - CERISIER en fleurs.", readingMnemonicFr: "SAKURA - cerisier.", levelId: 14 },

  { character: "花", meaningsFr: ["Fleur"], readingsOn: ["カ"], readingsKun: ["はな"], meaningMnemonicFr: "La plante qui change - FLEUR.", readingMnemonicFr: "HANA - fleur.", levelId: 15 },
  { character: "葉", meaningsFr: ["Feuille"], readingsOn: ["ヨウ"], readingsKun: ["は"], meaningMnemonicFr: "La plante du monde - FEUILLE.", readingMnemonicFr: "HA - feuille.", levelId: 15 },
  { character: "実", meaningsFr: ["Fruit", "Réalité"], readingsOn: ["ジツ"], readingsKun: ["み"], meaningMnemonicFr: "Le toit sur l'arbre - FRUIT.", readingMnemonicFr: "MI - fruit.", levelId: 15 },
  { character: "根", meaningsFr: ["Racine"], readingsOn: ["コン"], readingsKun: ["ね"], meaningMnemonicFr: "L'arbre qui s'étend - RACINE.", readingMnemonicFr: "NE - racine.", levelId: 15 },
  { character: "枝", meaningsFr: ["Branche"], readingsOn: ["シ"], readingsKun: ["えだ"], meaningMnemonicFr: "L'arbre qui divise - BRANCHE.", readingMnemonicFr: "EDA - branche.", levelId: 15 },

  // Level 16-20 additions
  { character: "鳥", meaningsFr: ["Oiseau"], readingsOn: ["チョウ"], readingsKun: ["とり"], meaningMnemonicFr: "L'OISEAU sur son perchoir.", readingMnemonicFr: "TORI - oiseau.", levelId: 16 },
  { character: "魚", meaningsFr: ["Poisson"], readingsOn: ["ギョ"], readingsKun: ["さかな"], meaningMnemonicFr: "Le POISSON dans l'eau.", readingMnemonicFr: "SAKANA - poisson.", levelId: 16 },
  { character: "虫", meaningsFr: ["Insecte"], readingsOn: ["チュウ"], readingsKun: ["むし"], meaningMnemonicFr: "L'INSECTE qui rampe.", readingMnemonicFr: "MUSHI - insecte.", levelId: 16 },
  { character: "貝", meaningsFr: ["Coquillage"], readingsOn: ["バイ"], readingsKun: ["かい"], meaningMnemonicFr: "Le COQUILLAGE précieux.", readingMnemonicFr: "KAI - coquillage.", levelId: 16 },
  { character: "犬", meaningsFr: ["Chien"], readingsOn: ["ケン"], readingsKun: ["いぬ"], meaningMnemonicFr: "Le grand CHIEN fidèle.", readingMnemonicFr: "INU - chien.", levelId: 16 },

  { character: "猫", meaningsFr: ["Chat"], readingsOn: ["ビョウ"], readingsKun: ["ねこ"], meaningMnemonicFr: "L'animal des champs - CHAT.", readingMnemonicFr: "NEKO - chat.", levelId: 17 },
  { character: "牛", meaningsFr: ["Vache"], readingsOn: ["ギュウ"], readingsKun: ["うし"], meaningMnemonicFr: "La VACHE avec ses cornes.", readingMnemonicFr: "USHI - vache.", levelId: 17 },
  { character: "馬", meaningsFr: ["Cheval"], readingsOn: ["バ"], readingsKun: ["うま"], meaningMnemonicFr: "Le CHEVAL au galop.", readingMnemonicFr: "UMA - cheval.", levelId: 17 },
  { character: "豚", meaningsFr: ["Cochon"], readingsOn: ["トン"], readingsKun: ["ぶた"], meaningMnemonicFr: "La viande de l'animal - COCHON.", readingMnemonicFr: "BUTA - cochon.", levelId: 17 },
  { character: "羊", meaningsFr: ["Mouton"], readingsOn: ["ヨウ"], readingsKun: ["ひつじ"], meaningMnemonicFr: "Le MOUTON avec ses cornes.", readingMnemonicFr: "HITSUJI - mouton.", levelId: 17 },

  { character: "象", meaningsFr: ["Éléphant"], readingsOn: ["ショウ", "ゾウ"], readingsKun: [], meaningMnemonicFr: "L'ÉLÉPHANT majestueux.", readingMnemonicFr: "ZOU - éléphant.", levelId: 18 },
  { character: "熊", meaningsFr: ["Ours"], readingsOn: ["ユウ"], readingsKun: ["くま"], meaningMnemonicFr: "L'OURS des montagnes.", readingMnemonicFr: "KUMA - ours.", levelId: 18 },
  { character: "狼", meaningsFr: ["Loup"], readingsOn: ["ロウ"], readingsKun: ["おおかみ"], meaningMnemonicFr: "L'animal bon et méchant - LOUP.", readingMnemonicFr: "OOKAMI - loup.", levelId: 18 },
  { character: "狐", meaningsFr: ["Renard"], readingsOn: ["コ"], readingsKun: ["きつね"], meaningMnemonicFr: "L'animal de la melon - RENARD rusé.", readingMnemonicFr: "KITSUNE - renard.", levelId: 18 },
  { character: "蛇", meaningsFr: ["Serpent"], readingsOn: ["ジャ"], readingsKun: ["へび"], meaningMnemonicFr: "L'insecte qui rampe - SERPENT.", readingMnemonicFr: "HEBI - serpent.", levelId: 18 },

  { character: "亀", meaningsFr: ["Tortue"], readingsOn: ["キ"], readingsKun: ["かめ"], meaningMnemonicFr: "La TORTUE sage.", readingMnemonicFr: "KAME - tortue.", levelId: 19 },
  { character: "蛙", meaningsFr: ["Grenouille"], readingsOn: [], readingsKun: ["かえる"], meaningMnemonicFr: "L'insecte de la terre - GRENOUILLE.", readingMnemonicFr: "KAERU - grenouille.", levelId: 19 },
  { character: "蝶", meaningsFr: ["Papillon"], readingsOn: ["チョウ"], readingsKun: [], meaningMnemonicFr: "L'insecte qui vole - PAPILLON.", readingMnemonicFr: "CHOU - papillon.", levelId: 19 },
  { character: "蜂", meaningsFr: ["Abeille"], readingsOn: ["ホウ"], readingsKun: ["はち"], meaningMnemonicFr: "L'insecte pointu - ABEILLE.", readingMnemonicFr: "HACHI - abeille.", levelId: 19 },
  { character: "蟻", meaningsFr: ["Fourmi"], readingsOn: ["ギ"], readingsKun: ["あり"], meaningMnemonicFr: "L'insecte juste - FOURMI travailleuse.", readingMnemonicFr: "ARI - fourmi.", levelId: 19 },

  { character: "雨", meaningsFr: ["Pluie"], readingsOn: ["ウ"], readingsKun: ["あめ"], meaningMnemonicFr: "Les gouttes qui tombent - PLUIE.", readingMnemonicFr: "AME - pluie.", levelId: 20 },
  { character: "雪", meaningsFr: ["Neige"], readingsOn: ["セツ"], readingsKun: ["ゆき"], meaningMnemonicFr: "La pluie qui balaye - NEIGE.", readingMnemonicFr: "YUKI - neige.", levelId: 20 },
  { character: "雲", meaningsFr: ["Nuage"], readingsOn: ["ウン"], readingsKun: ["くも"], meaningMnemonicFr: "La pluie qui dit - NUAGE.", readingMnemonicFr: "KUMO - nuage.", levelId: 20 },
  { character: "雷", meaningsFr: ["Tonnerre"], readingsOn: ["ライ"], readingsKun: ["かみなり"], meaningMnemonicFr: "La pluie sur le champ - TONNERRE.", readingMnemonicFr: "KAMINARI - tonnerre.", levelId: 20 },
  { character: "霧", meaningsFr: ["Brouillard"], readingsOn: ["ム"], readingsKun: ["きり"], meaningMnemonicFr: "La pluie qui n'est pas - BROUILLARD.", readingMnemonicFr: "KIRI - brouillard.", levelId: 20 },

  // Level 21-25 more
  { character: "朝", meaningsFr: ["Matin"], readingsOn: ["チョウ"], readingsKun: ["あさ"], meaningMnemonicFr: "Le soleil et la lune ensemble - MATIN.", readingMnemonicFr: "ASA - matin.", levelId: 21 },
  { character: "昼", meaningsFr: ["Midi"], readingsOn: ["チュウ"], readingsKun: ["ひる"], meaningMnemonicFr: "Le soleil au milieu - MIDI.", readingMnemonicFr: "HIRU - midi.", levelId: 21 },
  { character: "夕", meaningsFr: ["Soir"], readingsOn: ["セキ"], readingsKun: ["ゆう"], meaningMnemonicFr: "Le demi-soleil - SOIR.", readingMnemonicFr: "YUU - soir.", levelId: 21 },
  { character: "夜", meaningsFr: ["Nuit"], readingsOn: ["ヤ"], readingsKun: ["よる"], meaningMnemonicFr: "La personne sous le toit la NUIT.", readingMnemonicFr: "YORU - nuit.", levelId: 21 },
  { character: "暗", meaningsFr: ["Sombre"], readingsOn: ["アン"], readingsKun: ["くら-い"], meaningMnemonicFr: "Le soleil caché - SOMBRE.", readingMnemonicFr: "KURAI - sombre.", levelId: 21 },

  { character: "明", meaningsFr: ["Lumière", "Clair"], readingsOn: ["メイ"], readingsKun: ["あか-るい"], meaningMnemonicFr: "Le soleil et la lune - LUMIÈRE.", readingMnemonicFr: "AKARUI - clair.", levelId: 22 },
  { character: "光", meaningsFr: ["Lumière"], readingsOn: ["コウ"], readingsKun: ["ひかり"], meaningMnemonicFr: "Le feu sur les jambes - LUMIÈRE.", readingMnemonicFr: "HIKARI - lumière.", levelId: 22 },
  { character: "影", meaningsFr: ["Ombre"], readingsOn: ["エイ"], readingsKun: ["かげ"], meaningMnemonicFr: "Le soleil + les cheveux = OMBRE.", readingMnemonicFr: "KAGE - ombre.", levelId: 22 },
  { character: "照", meaningsFr: ["Éclairer"], readingsOn: ["ショウ"], readingsKun: ["て-らす"], meaningMnemonicFr: "Le soleil sur le couteau - ÉCLAIRER.", readingMnemonicFr: "TERASU - éclairer.", levelId: 22 },
  { character: "輝", meaningsFr: ["Briller"], readingsOn: ["キ"], readingsKun: ["かがや-く"], meaningMnemonicFr: "La lumière intense - BRILLER.", readingMnemonicFr: "KAGAYAKU - briller.", levelId: 22 },

  { character: "熱", meaningsFr: ["Chaleur"], readingsOn: ["ネツ"], readingsKun: ["あつ-い"], meaningMnemonicFr: "Le feu rond - CHALEUR.", readingMnemonicFr: "NETSU - chaleur.", levelId: 23 },
  { character: "冷", meaningsFr: ["Froid"], readingsOn: ["レイ"], readingsKun: ["つめ-たい"], meaningMnemonicFr: "La glace qui ordonne - FROID.", readingMnemonicFr: "TSUMETAI - froid.", levelId: 23 },
  { character: "温", meaningsFr: ["Tiède"], readingsOn: ["オン"], readingsKun: ["あたた-かい"], meaningMnemonicFr: "L'eau + le soleil + le plat = TIÈDE.", readingMnemonicFr: "ATATAKAI - tiède.", levelId: 23 },
  { character: "涼", meaningsFr: ["Frais"], readingsOn: ["リョウ"], readingsKun: ["すず-しい"], meaningMnemonicFr: "L'eau de la capitale - FRAIS.", readingMnemonicFr: "SUZUSHII - frais.", levelId: 23 },
  { character: "暖", meaningsFr: ["Chaud"], readingsOn: ["ダン"], readingsKun: ["あたた-かい"], meaningMnemonicFr: "Le soleil ami - CHAUD.", readingMnemonicFr: "ATATAKAI - chaud.", levelId: 23 },

  { character: "静", meaningsFr: ["Calme"], readingsOn: ["セイ"], readingsKun: ["しず-か"], meaningMnemonicFr: "Le bleu qui conteste - CALME.", readingMnemonicFr: "SHIZUKA - calme.", levelId: 24 },
  { character: "動", meaningsFr: ["Mouvement"], readingsOn: ["ドウ"], readingsKun: ["うご-く"], meaningMnemonicFr: "La force lourde - MOUVEMENT.", readingMnemonicFr: "UGOKU - bouger.", levelId: 24 },
  { character: "速", meaningsFr: ["Rapide"], readingsOn: ["ソク"], readingsKun: ["はや-い"], meaningMnemonicFr: "Le paquet qui avance - RAPIDE.", readingMnemonicFr: "HAYAI - rapide.", levelId: 24 },
  { character: "遅", meaningsFr: ["Lent"], readingsOn: ["チ"], readingsKun: ["おそ-い"], meaningMnemonicFr: "La queue qui avance - LENT.", readingMnemonicFr: "OSOI - lent.", levelId: 24 },
  { character: "急", meaningsFr: ["Urgent"], readingsOn: ["キュウ"], readingsKun: ["いそ-ぐ"], meaningMnemonicFr: "Le cœur qui aspire - URGENT.", readingMnemonicFr: "ISOGU - se presser.", levelId: 24 },

  { character: "止", meaningsFr: ["Arrêter"], readingsOn: ["シ"], readingsKun: ["と-まる"], meaningMnemonicFr: "Le pied qui s'ARRÊTE.", readingMnemonicFr: "TOMARU - s'arrêter.", levelId: 25 },
  { character: "歩", meaningsFr: ["Marcher"], readingsOn: ["ホ"], readingsKun: ["ある-く"], meaningMnemonicFr: "Le peu qui s'arrête - MARCHER.", readingMnemonicFr: "ARUKU - marcher.", levelId: 25 },
  { character: "走", meaningsFr: ["Courir"], readingsOn: ["ソウ"], readingsKun: ["はし-る"], meaningMnemonicFr: "La terre et l'arrêt - COURIR.", readingMnemonicFr: "HASHIRU - courir.", levelId: 25 },
  { character: "跳", meaningsFr: ["Sauter"], readingsOn: ["チョウ"], readingsKun: ["と-ぶ"], meaningMnemonicFr: "Le pied qui s'envole - SAUTER.", readingMnemonicFr: "TOBU - sauter.", levelId: 25 },
  { character: "泳", meaningsFr: ["Nager"], readingsOn: ["エイ"], readingsKun: ["およ-ぐ"], meaningMnemonicFr: "L'eau éternelle - NAGER.", readingMnemonicFr: "OYOGU - nager.", levelId: 25 },

  // More levels 26-30
  { character: "座", meaningsFr: ["S'asseoir"], readingsOn: ["ザ"], readingsKun: ["すわ-る"], meaningMnemonicFr: "Deux personnes sur le sol - S'ASSEOIR.", readingMnemonicFr: "SUWARU - s'asseoir.", levelId: 26 },
  { character: "立", meaningsFr: ["Se lever"], readingsOn: ["リツ"], readingsKun: ["た-つ"], meaningMnemonicFr: "Une personne qui se LÈVE sur le sol.", readingMnemonicFr: "TATSU - se lever.", levelId: 26 },
  { character: "寝", meaningsFr: ["Dormir"], readingsOn: ["シン"], readingsKun: ["ね-る"], meaningMnemonicFr: "Le toit avec les mains - DORMIR.", readingMnemonicFr: "NERU - dormir.", levelId: 26 },
  { character: "起", meaningsFr: ["Se réveiller"], readingsOn: ["キ"], readingsKun: ["お-きる"], meaningMnemonicFr: "Courir et soi - SE RÉVEILLER.", readingMnemonicFr: "OKIRU - se réveiller.", levelId: 26 },
  { character: "働", meaningsFr: ["Travailler"], readingsOn: ["ドウ"], readingsKun: ["はたら-く"], meaningMnemonicFr: "La personne qui bouge lourdement - TRAVAILLER.", readingMnemonicFr: "HATARAKU - travailler.", levelId: 26 },

  { character: "遊", meaningsFr: ["Jouer"], readingsOn: ["ユウ"], readingsKun: ["あそ-ぶ"], meaningMnemonicFr: "L'enfant qui avance avec le drapeau - JOUER.", readingMnemonicFr: "ASOBU - jouer.", levelId: 27 },
  { character: "転", meaningsFr: ["Tourner", "Tomber"], readingsOn: ["テン"], readingsKun: ["ころ-ぶ"], meaningMnemonicFr: "La voiture qui se retourne - TOURNER.", readingMnemonicFr: "KOROBU - tomber.", levelId: 27 },
  { character: "届", meaningsFr: ["Livrer"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "Le corps qui sort - LIVRER.", readingMnemonicFr: "TODOKU - livrer.", levelId: 27 },
  { character: "届", meaningsFr: ["Atteindre"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "ATTEINDRE la destination.", readingMnemonicFr: "TODOKERU - atteindre.", levelId: 27 },
  { character: "届", meaningsFr: ["Parvenir"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "PARVENIR à destination.", readingMnemonicFr: "TODOKU - parvenir.", levelId: 27 },
];

async function main() {
  console.log("Seeding kanji supplement 7...");

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
