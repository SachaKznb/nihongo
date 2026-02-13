import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const improvedMnemonics: {
  character: string;
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
}[] = [
  // Level 3
  {
    character: "年",
    meaningMnemonicFr: "Un paysan récolte le blé sous le toit de sa grange chaque ANNÉE. En France, on célèbre le Nouvel An avec du champagne et des huîtres, une tradition qui revient chaque année comme les saisons.",
    readingMnemonicFr: "TOSHI sonne comme 'tôt si' - 'Tôt si l'année commence, tard si elle finit!' dit le vieux fermier.",
  },

  // Level 4
  {
    character: "読",
    meaningMnemonicFr: "Les paroles 言 passent par les yeux 売 quand on LIT un livre. Comme Victor Hugo dévorant les livres à la bibliothèque de Paris, chaque mot entre par les yeux et nourrit l'esprit.",
    readingMnemonicFr: "YOMU sonne comme 'yo mou' - 'Yo, c'est mou ce livre!' dit l'étudiant qui s'endort en lisant.",
  },
  {
    character: "舌",
    meaningMnemonicFr: "La bouche 口 laisse sortir quelque chose de pointu: la LANGUE qui goûte! Imaginez un chef étoilé français qui utilise sa langue pour goûter chaque sauce, chaque plat avec précision.",
    readingMnemonicFr: "SHITA sonne comme 'chi ta' - 'Chi ta langue qui goûte tout!' dit mamie au petit gourmand.",
  },

  // Level 5
  {
    character: "店",
    meaningMnemonicFr: "Sous le toit 广 on pratique la divination 占 des prix: c'est un MAGASIN! Comme une belle boutique parisienne du Marais où l'on devine quel trésor on va trouver parmi les étagères.",
    readingMnemonicFr: "MISE sonne exactement comme 'mise' en français - on fait une mise (pari) en entrant au magasin!",
  },
  {
    character: "駅",
    meaningMnemonicFr: "Le cheval 馬 s'arrête à la station 尺: c'est la GARE! Autrefois, les diligences tirées par des chevaux s'arrêtaient aux relais, ancêtres de nos gares SNCF modernes.",
    readingMnemonicFr: "EKI sonne comme 'équi' de équidé - les chevaux (équidés) s'arrêtaient à la gare autrefois!",
  },
  {
    character: "館",
    meaningMnemonicFr: "La nourriture 食 sous un toit avec un officiel 官: c'est un BÂTIMENT public! Comme les grandes bibliothèques ou les musées de Paris où l'on nourrit l'esprit sous de beaux plafonds.",
    readingMnemonicFr: "KAN sonne comme 'quand' - 'Quand vas-tu visiter ce bâtiment?' demande le touriste à Paris.",
  },
  {
    character: "園",
    meaningMnemonicFr: "L'enclos 囗 où l'on porte de beaux vêtements 衣 et des souvenirs 元: c'est un JARDIN! Comme le Jardin des Tuileries où les Parisiens se promènent en tenue élégante le dimanche.",
    readingMnemonicFr: "SONO sonne comme 'son eau' - 'Son eau du jardin arrose les fleurs!' dit le jardinier de Versailles.",
  },

  // Level 6
  {
    character: "肌",
    meaningMnemonicFr: "La chair 月 avec quelques 几 cellules qui la recouvrent: c'est la PEAU! Pensez aux produits de beauté français qui promettent une peau douce comme celle des mannequins parisiens.",
    readingMnemonicFr: "HADA sonne comme 'a d'A' - 'Elle a d'A-dmirables qualités, cette peau!' dit l'esthéticienne.",
  },
  {
    character: "兄",
    meaningMnemonicFr: "La bouche 口 sur des jambes 儿 qui courent: c'est le FRÈRE AÎNÉ qui donne des ordres! Dans les familles françaises, c'est souvent lui qui commande les plus petits.",
    readingMnemonicFr: "ANI sonne comme 'a ni' - 'Il a ni peur ni reproche, ce grand frère!' dit maman fièrement.",
  },
  {
    character: "姉",
    meaningMnemonicFr: "La femme 女 du marché 市: c'est la SŒUR AÎNÉE qui fait les courses pour la famille! En France, c'est souvent elle qui aide maman à préparer le repas dominical.",
    readingMnemonicFr: "ANE sonne comme 'âne' - 'Pas un âne ma sœur, elle est brillante!' proteste le petit frère.",
  },

  // Level 7
  {
    character: "夫",
    meaningMnemonicFr: "Un grand 大 homme avec une épingle dans les cheveux: c'est le MARI! Comme un homme français élégant qui porte une cravate pour son mariage à la mairie du village.",
    readingMnemonicFr: "OTTO sonne comme 'auto' - 'Mon mari conduit l'auto pour aller au travail!' dit l'épouse.",
  },
  {
    character: "妻",
    meaningMnemonicFr: "La femme 女 avec le balai et les cheveux 彐 en bataille: c'est l'ÉPOUSE qui gère la maison! Comme les femmes françaises qui jonglent entre travail et vie de famille avec brio.",
    readingMnemonicFr: "TSUMA sonne comme 'tu m'as' - 'Tu m'as épousé, maintenant tu fais la vaisselle!' dit-elle en riant.",
  },
  {
    character: "弟",
    meaningMnemonicFr: "L'arc 弓 avec une flèche ノ et des jambes 儿: c'est le FRÈRE CADET qui s'entraîne! Il suit toujours son grand frère partout, essayant d'apprendre à tirer à l'arc.",
    readingMnemonicFr: "OTOUTO sonne comme 'oh tout tôt' - 'Oh, tout tôt il veut jouer!' dit le frère aîné du petit.",
  },
  {
    character: "妹",
    meaningMnemonicFr: "La femme 女 pas encore 未 grande: c'est la SŒUR CADETTE! La petite dernière de la famille française qui réclame toujours l'attention et les câlins.",
    readingMnemonicFr: "IMOUTO sonne comme 'i mouto' - 'Hi! Mouto jolie ma petite sœur!' dit le grand frère.",
  },

  // Level 8
  {
    character: "勉",
    meaningMnemonicFr: "La force 力 de l'immunité 免 contre la paresse: c'est l'EFFORT! Comme les étudiants français qui bachotent pour le bac, surmontant leur envie de sortir avec leurs amis.",
    readingMnemonicFr: "BEN sonne comme 'ben' - 'Ben oui, faut faire des efforts!' dit le prof à l'élève distrait.",
  },
  {
    character: "教",
    meaningMnemonicFr: "L'enfant 子 qui apprend 孝 avec le bâton 攵 du maître: c'est ENSEIGNER! Les instituteurs français transmettent le savoir avec passion, de la maternelle au lycée.",
    readingMnemonicFr: "OSHIERU sonne comme 'oh si heureux' - 'Oh si heureux d'enseigner!' dit le prof passionné.",
  },
  {
    character: "習",
    meaningMnemonicFr: "Les plumes 羽 de l'oiseau qui vole au-dessus du soleil blanc 白: c'est APPRENDRE! Comme un oisillon qui apprend à voler, l'élève français répète jusqu'à maîtriser ses leçons.",
    readingMnemonicFr: "NARAU sonne comme 'n'a rôle' - 'Il n'a rôle que d'apprendre!' dit le maître à l'apprenti.",
  },
  {
    character: "強",
    meaningMnemonicFr: "L'arc 弓 tendu par quelqu'un 厶 avec un insecte 虫 costaud: c'est FORT! Pensez à un scarabée qui soulève 850 fois son poids, plus fort que n'importe quel haltérophile.",
    readingMnemonicFr: "TSUYOI sonne comme 'tu y vois' - 'Tu y vois la force!' dit le coach sportif à son élève.",
  },

  // Level 9
  {
    character: "寒",
    meaningMnemonicFr: "Sous le toit 宀, deux personnes 丷 avec de la glace 冫 autour: c'est FROID! Comme les hivers rigoureux de Strasbourg où l'on se blottit près du feu avec un vin chaud.",
    readingMnemonicFr: "SAMUI sonne comme 'ça m'oui' - 'Ça m'oui, il fait froid!' grelotte le touriste à Chamonix.",
  },
  {
    character: "暑",
    meaningMnemonicFr: "Le soleil 日 qui tape sur quelqu'un 者 au sol: c'est CHAUD! Comme les étés brûlants de Provence où l'on cherche l'ombre des platanes et la fraîcheur du pastis.",
    readingMnemonicFr: "ATSUI sonne comme 'a tu i' - 'A tu idée comme il fait chaud!' dit-on en éventant son visage.",
  },
  {
    character: "晴",
    meaningMnemonicFr: "Le soleil 日 bleu 青 dans le ciel: c'est le BEAU TEMPS! Comme ces magnifiques journées sur la Côte d'Azur où le ciel est d'un bleu azur parfait.",
    readingMnemonicFr: "HARERU sonne comme 'ah rare euh' - 'Ah, rare euh ce beau temps en Bretagne!' plaisante le Breton.",
  },

  // Level 10
  {
    character: "車",
    meaningMnemonicFr: "Vue de dessus, c'est une roue avec son axe central: une VOITURE! Comme les belles voitures françaises, de la 2CV vintage aux Peugeot modernes qui sillonnent les routes de France.",
    readingMnemonicFr: "KURUMA sonne comme 'cou rouma' - 'Le cou rouma-tique du conducteur!' dit le kiné après un long trajet.",
  },
  {
    character: "腕",
    meaningMnemonicFr: "La chair 月 du soir 宛 quand on se repose: c'est le BRAS! Imaginez rentrer d'une longue journée et poser vos bras fatigués sur l'accoudoir de votre fauteuil préféré.",
    readingMnemonicFr: "UDE sonne comme 'ou des' - 'Où des bras forts comme ça?' demande-t-on au culturiste breton.",
  },
  {
    character: "船",
    meaningMnemonicFr: "Le navire 舟 avec les bouches 口 qui commandent: c'est un BATEAU! Comme les grands voiliers de Saint-Malo où le capitaine crie ses ordres à l'équipage sur le pont.",
    readingMnemonicFr: "FUNE sonne comme 'fût ne' - 'Le fût ne flotte pas, mais le bateau si!' dit le marin breton.",
  },
  {
    character: "乗",
    meaningMnemonicFr: "L'arbre 木 sur lequel on grimpe avec les pieds 禾: c'est MONTER! Comme monter dans le TGV à la Gare de Lyon pour partir en vacances vers le Sud de la France.",
    readingMnemonicFr: "NORU sonne comme 'nos roues' - 'Nos roues montent dans le train!' dit le cycliste avec son vélo.",
  },
];

async function main() {
  console.log("Starting mnemonic improvements for levels 1-10...\n");

  let updatedCount = 0;
  let notFoundCount = 0;

  for (const item of improvedMnemonics) {
    try {
      const result = await prisma.kanji.updateMany({
        where: { character: item.character },
        data: {
          meaningMnemonicFr: item.meaningMnemonicFr,
          readingMnemonicFr: item.readingMnemonicFr,
        },
      });

      if (result.count > 0) {
        updatedCount++;
        console.log(`✓ Updated: ${item.character}`);
      } else {
        notFoundCount++;
        console.log(`✗ Not found: ${item.character}`);
      }
    } catch (error) {
      console.error(`Error updating ${item.character}:`, error);
    }
  }

  console.log(`\n========== Summary ==========`);
  console.log(`Updated: ${updatedCount} kanji`);
  console.log(`Not found: ${notFoundCount} kanji`);
  console.log(`Total processed: ${improvedMnemonics.length} kanji`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
