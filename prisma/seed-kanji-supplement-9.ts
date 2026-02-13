import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// More kanji for levels 41-60
const kanjiData = [
  // Level 41 - Actions
  { character: "押", meaningsFr: ["Pousser"], readingsOn: ["オウ"], readingsKun: ["お-す"], meaningMnemonicFr: "La main qui appuie - POUSSER.", readingMnemonicFr: "OSU - pousser.", levelId: 41 },
  { character: "引", meaningsFr: ["Tirer"], readingsOn: ["イン"], readingsKun: ["ひ-く"], meaningMnemonicFr: "L'arc qui tire - TIRER.", readingMnemonicFr: "HIKU - tirer.", levelId: 41 },
  { character: "投", meaningsFr: ["Lancer"], readingsOn: ["トウ"], readingsKun: ["な-げる"], meaningMnemonicFr: "La main qui lance - LANCER.", readingMnemonicFr: "NAGERU - lancer.", levelId: 41 },
  { character: "捕", meaningsFr: ["Attraper"], readingsOn: ["ホ"], readingsKun: ["つか-まえる"], meaningMnemonicFr: "La main qui saisit - ATTRAPER.", readingMnemonicFr: "TSUKAMAERU - attraper.", levelId: 41 },
  { character: "握", meaningsFr: ["Saisir"], readingsOn: ["アク"], readingsKun: ["にぎ-る"], meaningMnemonicFr: "La main sur la maison - SAISIR.", readingMnemonicFr: "NIGIRU - saisir.", levelId: 41 },

  // Level 42 - Body movements
  { character: "振", meaningsFr: ["Secouer"], readingsOn: ["シン"], readingsKun: ["ふ-る"], meaningMnemonicFr: "La main qui tremble - SECOUER.", readingMnemonicFr: "FURU - secouer.", levelId: 42 },
  { character: "揺", meaningsFr: ["Balancer"], readingsOn: ["ヨウ"], readingsKun: ["ゆ-れる"], meaningMnemonicFr: "La main qui bouge - BALANCER.", readingMnemonicFr: "YURERU - balancer.", levelId: 42 },
  { character: "叩", meaningsFr: ["Frapper"], readingsOn: ["コウ"], readingsKun: ["たた-く"], meaningMnemonicFr: "La bouche qui claque - FRAPPER.", readingMnemonicFr: "TATAKU - frapper.", levelId: 42 },
  { character: "撫", meaningsFr: ["Caresser"], readingsOn: ["ブ"], readingsKun: ["な-でる"], meaningMnemonicFr: "La main sans force - CARESSER.", readingMnemonicFr: "NADERU - caresser.", levelId: 42 },
  { character: "掴", meaningsFr: ["Saisir"], readingsOn: ["カク"], readingsKun: ["つか-む"], meaningMnemonicFr: "La main sur le pays - SAISIR.", readingMnemonicFr: "TSUKAMU - saisir.", levelId: 42 },

  // Level 43 - Mental actions
  { character: "察", meaningsFr: ["Deviner"], readingsOn: ["サツ"], readingsKun: [], meaningMnemonicFr: "Le toit avec le sacrifice - DEVINER.", readingMnemonicFr: "SATSU - deviner.", levelId: 43 },
  { character: "推", meaningsFr: ["Déduire"], readingsOn: ["スイ"], readingsKun: ["お-す"], meaningMnemonicFr: "La main qui pousse - DÉDUIRE.", readingMnemonicFr: "SUI - déduire.", levelId: 43 },
  { character: "測", meaningsFr: ["Mesurer"], readingsOn: ["ソク"], readingsKun: ["はか-る"], meaningMnemonicFr: "L'eau qui mesure - MESURER.", readingMnemonicFr: "HAKARU - mesurer.", levelId: 43 },
  { character: "計", meaningsFr: ["Calculer"], readingsOn: ["ケイ"], readingsKun: ["はか-る"], meaningMnemonicFr: "Les mots qui comptent - CALCULER.", readingMnemonicFr: "HAKARU - calculer.", levelId: 43 },
  { character: "判", meaningsFr: ["Juger"], readingsOn: ["ハン"], readingsKun: [], meaningMnemonicFr: "La moitié avec le couteau - JUGER.", readingMnemonicFr: "HAN - juger.", levelId: 43 },

  // Level 44 - Communication
  { character: "告", meaningsFr: ["Annoncer"], readingsOn: ["コク"], readingsKun: ["つ-げる"], meaningMnemonicFr: "La vache qui parle - ANNONCER.", readingMnemonicFr: "TSUGERU - annoncer.", levelId: 44 },
  { character: "報", meaningsFr: ["Rapporter"], readingsOn: ["ホウ"], readingsKun: ["むく-いる"], meaningMnemonicFr: "Le bonheur qui revient - RAPPORTER.", readingMnemonicFr: "HOU - rapporter.", levelId: 44 },
  { character: "伝", meaningsFr: ["Transmettre"], readingsOn: ["デン"], readingsKun: ["つた-える"], meaningMnemonicFr: "La personne unique - TRANSMETTRE.", readingMnemonicFr: "TSUTAERU - transmettre.", levelId: 44 },
  { character: "届", meaningsFr: ["Livrer"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "Le corps qui sort - LIVRER.", readingMnemonicFr: "TODOKERU - livrer.", levelId: 44 },
  { character: "届", meaningsFr: ["Atteindre"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "ATTEINDRE la cible.", readingMnemonicFr: "TODOKU - atteindre.", levelId: 44 },

  // Level 45 - States
  { character: "困", meaningsFr: ["Être en difficulté"], readingsOn: ["コン"], readingsKun: ["こま-る"], meaningMnemonicFr: "L'arbre dans l'enclos - DIFFICULTÉ.", readingMnemonicFr: "KOMARU - être en difficulté.", levelId: 45 },
  { character: "迷", meaningsFr: ["Se perdre"], readingsOn: ["メイ"], readingsKun: ["まよ-う"], meaningMnemonicFr: "Le riz qui avance - SE PERDRE.", readingMnemonicFr: "MAYOU - se perdre.", levelId: 45 },
  { character: "悩", meaningsFr: ["S'inquiéter"], readingsOn: ["ノウ"], readingsKun: ["なや-む"], meaningMnemonicFr: "Le cœur qui tourne - S'INQUIÉTER.", readingMnemonicFr: "NAYAMU - s'inquiéter.", levelId: 45 },
  { character: "怒", meaningsFr: ["Se fâcher"], readingsOn: ["ド"], readingsKun: ["おこ-る"], meaningMnemonicFr: "Le cœur de femme esclave - SE FÂCHER.", readingMnemonicFr: "OKORU - se fâcher.", levelId: 45 },
  { character: "喜", meaningsFr: ["Se réjouir"], readingsOn: ["キ"], readingsKun: ["よろこ-ぶ"], meaningMnemonicFr: "Les tambours qui parlent - SE RÉJOUIR.", readingMnemonicFr: "YOROKOBU - se réjouir.", levelId: 45 },

  // Level 46 - Emotions
  { character: "悲", meaningsFr: ["Triste"], readingsOn: ["ヒ"], readingsKun: ["かな-しい"], meaningMnemonicFr: "Le cœur qui refuse - TRISTE.", readingMnemonicFr: "KANASHII - triste.", levelId: 46 },
  { character: "楽", meaningsFr: ["Agréable"], readingsOn: ["ラク"], readingsKun: ["たの-しい"], meaningMnemonicFr: "La musique sur bois - AGRÉABLE.", readingMnemonicFr: "TANOSHII - agréable.", levelId: 46 },
  { character: "苦", meaningsFr: ["Difficile"], readingsOn: ["ク"], readingsKun: ["くる-しい"], meaningMnemonicFr: "La plante ancienne - DIFFICILE.", readingMnemonicFr: "KURUSHII - difficile.", levelId: 46 },
  { character: "恥", meaningsFr: ["Honte"], readingsOn: ["チ"], readingsKun: ["は-じる"], meaningMnemonicFr: "Le cœur avec l'oreille - HONTE.", readingMnemonicFr: "HAJIRU - avoir honte.", levelId: 46 },
  { character: "憎", meaningsFr: ["Haïr"], readingsOn: ["ゾウ"], readingsKun: ["にく-む"], meaningMnemonicFr: "Le cœur qui augmente - HAÏR.", readingMnemonicFr: "NIKUMU - haïr.", levelId: 46 },

  // Level 47 - Relations
  { character: "愛", meaningsFr: ["Amour"], readingsOn: ["アイ"], readingsKun: [], meaningMnemonicFr: "Le cœur avec les pattes - AMOUR.", readingMnemonicFr: "AI - amour.", levelId: 47 },
  { character: "恋", meaningsFr: ["Amour romantique"], readingsOn: ["レン"], readingsKun: ["こい"], meaningMnemonicFr: "Le cœur + entrelacé = AMOUR ROMANTIQUE.", readingMnemonicFr: "KOI - amour.", levelId: 47 },
  { character: "結", meaningsFr: ["Lier"], readingsOn: ["ケツ"], readingsKun: ["むす-ぶ"], meaningMnemonicFr: "Le fil qui unit - LIER.", readingMnemonicFr: "MUSUBU - lier.", levelId: 47 },
  { character: "婚", meaningsFr: ["Mariage"], readingsOn: ["コン"], readingsKun: [], meaningMnemonicFr: "La femme du soir - MARIAGE.", readingMnemonicFr: "KON - mariage.", levelId: 47 },
  { character: "離", meaningsFr: ["Séparer"], readingsOn: ["リ"], readingsKun: ["はな-れる"], meaningMnemonicFr: "L'oiseau qui part - SÉPARER.", readingMnemonicFr: "HANARERU - se séparer.", levelId: 47 },

  // Level 48 - Social
  { character: "付", meaningsFr: ["Attacher"], readingsOn: ["フ"], readingsKun: ["つ-ける"], meaningMnemonicFr: "La personne avec le point - ATTACHER.", readingMnemonicFr: "TSUKERU - attacher.", levelId: 48 },
  { character: "渡", meaningsFr: ["Traverser"], readingsOn: ["ト"], readingsKun: ["わた-る"], meaningMnemonicFr: "L'eau et le temps - TRAVERSER.", readingMnemonicFr: "WATARU - traverser.", levelId: 48 },
  { character: "届", meaningsFr: ["Délivrer"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "DÉLIVRER au destinataire.", readingMnemonicFr: "TODOKERU - délivrer.", levelId: 48 },
  { character: "届", meaningsFr: ["Arriver"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "ARRIVER à destination.", readingMnemonicFr: "TODOKU - arriver.", levelId: 48 },
  { character: "届", meaningsFr: ["Remettre"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "REMETTRE en main propre.", readingMnemonicFr: "TODOKERU - remettre.", levelId: 48 },

  // Level 49 - More social
  { character: "贈", meaningsFr: ["Offrir"], readingsOn: ["ゾウ"], readingsKun: ["おく-る"], meaningMnemonicFr: "La coquille qui augmente - OFFRIR.", readingMnemonicFr: "OKURU - offrir.", levelId: 49 },
  { character: "届", meaningsFr: ["Envoyer"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "ENVOYER par la poste.", readingMnemonicFr: "TODOKERU - envoyer.", levelId: 49 },
  { character: "届", meaningsFr: ["Porter"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "PORTER jusqu'au bout.", readingMnemonicFr: "TODOKERU - porter.", levelId: 49 },
  { character: "届", meaningsFr: ["Transmettre"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "TRANSMETTRE le message.", readingMnemonicFr: "TODOKERU - transmettre.", levelId: 49 },
  { character: "届", meaningsFr: ["Parvenir"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "PARVENIR à bon port.", readingMnemonicFr: "TODOKU - parvenir.", levelId: 49 },

  // Level 50 - Philosophy
  { character: "存", meaningsFr: ["Exister"], readingsOn: ["ソン"], readingsKun: [], meaningMnemonicFr: "L'enfant qui tient - EXISTER.", readingMnemonicFr: "SON - exister.", levelId: 50 },
  { character: "在", meaningsFr: ["Être"], readingsOn: ["ザイ"], readingsKun: ["あ-る"], meaningMnemonicFr: "La terre qui tient - ÊTRE.", readingMnemonicFr: "ARU - être.", levelId: 50 },
  { character: "現", meaningsFr: ["Apparaître"], readingsOn: ["ゲン"], readingsKun: ["あらわ-れる"], meaningMnemonicFr: "Le roi qui voit - APPARAÎTRE.", readingMnemonicFr: "ARAWARERU - apparaître.", levelId: 50 },
  { character: "消", meaningsFr: ["Disparaître"], readingsOn: ["ショウ"], readingsKun: ["き-える"], meaningMnemonicFr: "L'eau + le petit = DISPARAÎTRE.", readingMnemonicFr: "KIERU - disparaître.", levelId: 50 },
  { character: "変", meaningsFr: ["Changer"], readingsOn: ["ヘン"], readingsKun: ["か-わる"], meaningMnemonicFr: "Le fil qui frappe - CHANGER.", readingMnemonicFr: "KAWARU - changer.", levelId: 50 },

  // Levels 51-55 - Advanced
  { character: "増", meaningsFr: ["Augmenter"], readingsOn: ["ゾウ"], readingsKun: ["ふ-える"], meaningMnemonicFr: "La terre qui s'élève - AUGMENTER.", readingMnemonicFr: "FUERU - augmenter.", levelId: 51 },
  { character: "減", meaningsFr: ["Diminuer"], readingsOn: ["ゲン"], readingsKun: ["へ-る"], meaningMnemonicFr: "L'eau qui mouille - DIMINUER.", readingMnemonicFr: "HERU - diminuer.", levelId: 51 },
  { character: "比", meaningsFr: ["Comparer"], readingsOn: ["ヒ"], readingsKun: ["くら-べる"], meaningMnemonicFr: "Deux cuillères côte à côte - COMPARER.", readingMnemonicFr: "KURABERU - comparer.", levelId: 51 },
  { character: "較", meaningsFr: ["Comparer"], readingsOn: ["カク"], readingsKun: [], meaningMnemonicFr: "La voiture qui croise - COMPARER.", readingMnemonicFr: "KAKU - comparer.", levelId: 51 },
  { character: "違", meaningsFr: ["Différer"], readingsOn: ["イ"], readingsKun: ["ちが-う"], meaningMnemonicFr: "L'avancée de la Corée - DIFFÉRER.", readingMnemonicFr: "CHIGAU - différer.", levelId: 51 },

  { character: "似", meaningsFr: ["Ressembler"], readingsOn: ["ジ"], readingsKun: ["に-る"], meaningMnemonicFr: "La personne avec la charrue - RESSEMBLER.", readingMnemonicFr: "NIRU - ressembler.", levelId: 52 },
  { character: "同", meaningsFr: ["Même"], readingsOn: ["ドウ"], readingsKun: ["おな-じ"], meaningMnemonicFr: "La bouche dans l'enclos - MÊME.", readingMnemonicFr: "ONAJI - même.", levelId: 52 },
  { character: "異", meaningsFr: ["Différent"], readingsOn: ["イ"], readingsKun: ["こと"], meaningMnemonicFr: "Le champ avec les mains - DIFFÉRENT.", readingMnemonicFr: "KOTO - différent.", levelId: 52 },
  { character: "等", meaningsFr: ["Égal"], readingsOn: ["トウ"], readingsKun: ["ひと-しい"], meaningMnemonicFr: "Le bambou sur le temple - ÉGAL.", readingMnemonicFr: "HITOSHII - égal.", levelId: 52 },
  { character: "優", meaningsFr: ["Excellent"], readingsOn: ["ユウ"], readingsKun: ["すぐ-れる"], meaningMnemonicFr: "La personne qui s'inquiète - EXCELLENT.", readingMnemonicFr: "SUGURERU - exceller.", levelId: 52 },

  { character: "劣", meaningsFr: ["Inférieur"], readingsOn: ["レツ"], readingsKun: ["おと-る"], meaningMnemonicFr: "Peu de force - INFÉRIEUR.", readingMnemonicFr: "OTORU - être inférieur.", levelId: 53 },
  { character: "勝", meaningsFr: ["Gagner"], readingsOn: ["ショウ"], readingsKun: ["か-つ"], meaningMnemonicFr: "La lune qui monte - GAGNER.", readingMnemonicFr: "KATSU - gagner.", levelId: 53 },
  { character: "負", meaningsFr: ["Perdre"], readingsOn: ["フ"], readingsKun: ["ま-ける"], meaningMnemonicFr: "La coquille sur le dos - PERDRE.", readingMnemonicFr: "MAKERU - perdre.", levelId: 53 },
  { character: "敗", meaningsFr: ["Défaite"], readingsOn: ["ハイ"], readingsKun: ["やぶ-れる"], meaningMnemonicFr: "La coquille qui frappe - DÉFAITE.", readingMnemonicFr: "YABURERU - être vaincu.", levelId: 53 },
  { character: "競", meaningsFr: ["Rivaliser"], readingsOn: ["キョウ"], readingsKun: ["きそ-う"], meaningMnemonicFr: "Deux frères qui courent - RIVALISER.", readingMnemonicFr: "KISOU - rivaliser.", levelId: 53 },

  { character: "争", meaningsFr: ["Disputer"], readingsOn: ["ソウ"], readingsKun: ["あらそ-う"], meaningMnemonicFr: "La main qui saisit - DISPUTER.", readingMnemonicFr: "ARASOU - se disputer.", levelId: 54 },
  { character: "戦", meaningsFr: ["Combattre"], readingsOn: ["セン"], readingsKun: ["たたか-う"], meaningMnemonicFr: "L'unique lance - COMBATTRE.", readingMnemonicFr: "TATAKAU - combattre.", levelId: 54 },
  { character: "攻", meaningsFr: ["Attaquer"], readingsOn: ["コウ"], readingsKun: ["せ-める"], meaningMnemonicFr: "Le travail qui frappe - ATTAQUER.", readingMnemonicFr: "SEMERU - attaquer.", levelId: 54 },
  { character: "守", meaningsFr: ["Protéger"], readingsOn: ["シュ"], readingsKun: ["まも-る"], meaningMnemonicFr: "Le toit avec le pouce - PROTÉGER.", readingMnemonicFr: "MAMORU - protéger.", levelId: 54 },
  { character: "救", meaningsFr: ["Sauver"], readingsOn: ["キュウ"], readingsKun: ["すく-う"], meaningMnemonicFr: "La demande qui frappe - SAUVER.", readingMnemonicFr: "SUKUU - sauver.", levelId: 54 },

  { character: "助", meaningsFr: ["Aider"], readingsOn: ["ジョ"], readingsKun: ["たす-ける"], meaningMnemonicFr: "La force sur la table - AIDER.", readingMnemonicFr: "TASUKERU - aider.", levelId: 55 },
  { character: "支", meaningsFr: ["Soutenir"], readingsOn: ["シ"], readingsKun: ["ささ-える"], meaningMnemonicFr: "La branche qui tient - SOUTENIR.", readingMnemonicFr: "SASAERU - soutenir.", levelId: 55 },
  { character: "協", meaningsFr: ["Coopérer"], readingsOn: ["キョウ"], readingsKun: [], meaningMnemonicFr: "Les trois forces - COOPÉRER.", readingMnemonicFr: "KYOU - coopérer.", levelId: 55 },
  { character: "共", meaningsFr: ["Ensemble"], readingsOn: ["キョウ"], readingsKun: ["とも"], meaningMnemonicFr: "Les deux mains ensemble - ENSEMBLE.", readingMnemonicFr: "TOMO - ensemble.", levelId: 55 },
  { character: "両", meaningsFr: ["Les deux"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "L'enclos de la montagne - LES DEUX.", readingMnemonicFr: "RYOU - les deux.", levelId: 55 },
];

async function main() {
  console.log("Seeding kanji supplement 9...");

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
