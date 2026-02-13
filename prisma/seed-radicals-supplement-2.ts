import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Additional radicals with French storytelling mnemonics
// Focus on intermediate and advanced radicals for levels 21-50

const radicalsData = [
  // Level 21 radicals
  { character: "冫", meaningFr: "Glace", mnemonic: "Deux petits traits qui représentent des cristaux de GLACE. Imaginez la buée qui gèle sur la vitre d'un café parisien en hiver, formant ces deux petites gouttes gelées.", levelId: 21 },
  { character: "刂", meaningFr: "Sabre", mnemonic: "Un SABRE vertical, tranchant comme les épées des Trois Mousquetaires. Cette lame droite coupe net tout ce qu'elle touche.", levelId: 21 },
  { character: "勹", meaningFr: "Envelopper", mnemonic: "Un bras qui ENVELOPPE quelque chose. Comme une mère qui enlace son enfant, ou un croissant qui enroule sa pâte.", levelId: 21 },

  // Level 22 radicals
  { character: "匕", meaningFr: "Cuillère", mnemonic: "Une CUILLÈRE pour servir le potage. L'outil qui nourrit depuis l'enfance, la cuillère en argent des familles bourgeoises.", levelId: 22 },
  { character: "匚", meaningFr: "Boîte ouverte", mnemonic: "Une BOÎTE OUVERTE sur le côté. Le coffre au trésor qui attend d'être rempli, le tiroir qui cache des secrets.", levelId: 22 },
  { character: "十", meaningFr: "Dix", mnemonic: "Le chiffre DIX, une croix parfaite. Les dix commandements, les dix doigts de la main qui comptent.", levelId: 22 },

  // Level 23 radicals
  { character: "厂", meaningFr: "Falaise", mnemonic: "Une FALAISE qui surplombe. Les falaises d'Étretat qui inspiraient Monet, le rebord rocheux qui domine la mer.", levelId: 23 },
  { character: "厶", meaningFr: "Privé", mnemonic: "Quelque chose de PRIVÉ, personnel. Le journal intime qu'on cache sous le lit, le secret qu'on garde pour soi.", levelId: 23 },
  { character: "又", meaningFr: "Encore", mnemonic: "ENCORE une fois! La main qui revient pour prendre, l'action répétée. Encore un croissant au petit-déjeuner!", levelId: 23 },

  // Level 24 radicals
  { character: "口", meaningFr: "Bouche", mnemonic: "Une BOUCHE ouverte, prête à parler ou manger. Le français qui aime débattre, la gourmandise nationale.", levelId: 24 },
  { character: "囗", meaningFr: "Enclos", mnemonic: "Un ENCLOS, un mur d'enceinte. Les remparts des châteaux de la Loire, la protection contre l'extérieur.", levelId: 24 },
  { character: "土", meaningFr: "Terre", mnemonic: "La TERRE, le sol sous nos pieds. Le terroir français, la terre qui donne le vin et le fromage.", levelId: 24 },

  // Level 25 radicals
  { character: "士", meaningFr: "Samouraï", mnemonic: "Un SAMOURAÏ, un guerrier noble. L'homme de lettres et d'épée, comme d'Artagnan servait le roi.", levelId: 25 },
  { character: "夂", meaningFr: "Hiver", mnemonic: "L'HIVER qui descend. Les pas qui glissent dans la neige, la saison qui ralentit tout.", levelId: 25 },
  { character: "夕", meaningFr: "Soir", mnemonic: "Le SOIR, la lune qui se lève. L'heure de l'apéro, le crépuscule sur les Champs-Élysées.", levelId: 25 },

  // Level 26 radicals
  { character: "大", meaningFr: "Grand", mnemonic: "Un homme les bras écartés - GRAND! La Tour Eiffel qui domine Paris, l'ambition française.", levelId: 26 },
  { character: "女", meaningFr: "Femme", mnemonic: "Une FEMME assise élégamment. Marianne, symbole de la France, la grâce féminine.", levelId: 26 },
  { character: "子", meaningFr: "Enfant", mnemonic: "Un ENFANT emmailloté. Le petit prince de Saint-Exupéry, l'innocence et la curiosité.", levelId: 26 },

  // Level 27 radicals
  { character: "宀", meaningFr: "Toit", mnemonic: "Un TOIT qui protège. Les toits de Paris en zinc, l'abri contre la pluie et le froid.", levelId: 27 },
  { character: "寸", meaningFr: "Pouce", mnemonic: "Un POUCE, une petite mesure. Le pouce levé pour dire 'super', la précision artisanale.", levelId: 27 },
  { character: "小", meaningFr: "Petit", mnemonic: "Trois petites gouttes - PETIT. Les petits plaisirs de la vie, un petit café, un petit bisou.", levelId: 27 },

  // Level 28 radicals
  { character: "尢", meaningFr: "Boiteux", mnemonic: "Quelqu'un qui BOITE, une jambe tordue. L'imperfection qui rend unique, le pas claudicant.", levelId: 28 },
  { character: "尸", meaningFr: "Corps", mnemonic: "Un CORPS allongé, une silhouette. Le corps humain, temple de l'âme selon les philosophes.", levelId: 28 },
  { character: "屮", meaningFr: "Pousse", mnemonic: "Une POUSSE qui sort de terre. Le printemps qui arrive, la vie qui renaît dans les jardins.", levelId: 28 },

  // Level 29 radicals
  { character: "山", meaningFr: "Montagne", mnemonic: "Trois pics - une MONTAGNE! Les Alpes majestueuses, le Mont Blanc enneigé.", levelId: 29 },
  { character: "巛", meaningFr: "Rivière", mnemonic: "Une RIVIÈRE qui coule. La Seine qui traverse Paris, les méandres de la Loire.", levelId: 29 },
  { character: "工", meaningFr: "Travail", mnemonic: "Un établi de TRAVAIL. L'artisan dans son atelier, le compagnon du Tour de France.", levelId: 29 },

  // Level 30 radicals
  { character: "己", meaningFr: "Soi-même", mnemonic: "SOI-MÊME, le moi intérieur. La connaissance de soi, 'Connais-toi toi-même' de Socrate.", levelId: 30 },
  { character: "巾", meaningFr: "Serviette", mnemonic: "Une SERVIETTE qui pend. Le torchon du bistrot, la serviette de table bien pliée.", levelId: 30 },
  { character: "干", meaningFr: "Sec", mnemonic: "Quelque chose de SEC, un poteau. Le linge qui sèche au soleil de Provence.", levelId: 30 },

  // Level 31 radicals
  { character: "幺", meaningFr: "Minuscule", mnemonic: "Quelque chose de MINUSCULE, un fil ténu. Le fil d'araignée dans la rosée du matin.", levelId: 31 },
  { character: "广", meaningFr: "Falaise/Toit", mnemonic: "Un grand TOIT ou une FALAISE. L'abri sous la corniche, la grotte préhistorique.", levelId: 31 },
  { character: "廴", meaningFr: "Marcher loin", mnemonic: "MARCHER LOIN, avancer. Le pèlerin sur le chemin de Compostelle.", levelId: 31 },

  // Level 32 radicals
  { character: "廾", meaningFr: "Deux mains", mnemonic: "DEUX MAINS jointes. L'applaudissement, l'offrande au ciel, la prière.", levelId: 32 },
  { character: "弋", meaningFr: "Flèche à corde", mnemonic: "Une FLÈCHE AVEC CORDE pour chasser. L'archer qui récupère sa flèche.", levelId: 32 },
  { character: "弓", meaningFr: "Arc", mnemonic: "Un ARC tendu. L'arc de Robin des Bois, l'arme noble des chevaliers.", levelId: 32 },

  // Level 33 radicals
  { character: "彐", meaningFr: "Museau de porc", mnemonic: "Un MUSEAU DE PORC. Le cochon qui cherche des truffes dans le Périgord.", levelId: 33 },
  { character: "彡", meaningFr: "Cheveux", mnemonic: "Des CHEVEUX qui flottent. La chevelure au vent, les trois traits de lumière.", levelId: 33 },
  { character: "彳", meaningFr: "Pas", mnemonic: "Un PAS en avant. La démarche élégante, avancer petit à petit.", levelId: 33 },

  // Level 34 radicals
  { character: "心", meaningFr: "Cœur", mnemonic: "Le CŒUR, siège des émotions. L'amour à la française, le cœur qui bat.", levelId: 34 },
  { character: "忄", meaningFr: "Cœur vertical", mnemonic: "Le CŒUR en version compacte. Les émotions qui montent, le sentiment pressé.", levelId: 34 },
  { character: "戈", meaningFr: "Hallebarde", mnemonic: "Une HALLEBARDE, arme des gardes. L'arme qui protège le château.", levelId: 34 },

  // Level 35 radicals
  { character: "戸", meaningFr: "Porte", mnemonic: "Une PORTE à un battant. L'entrée du salon, le passage vers l'intérieur.", levelId: 35 },
  { character: "手", meaningFr: "Main", mnemonic: "Une MAIN avec ses doigts. La main qui crée, qui caresse, qui donne.", levelId: 35 },
  { character: "扌", meaningFr: "Main radicale", mnemonic: "La MAIN en version radicale. L'action de la main, le geste rapide.", levelId: 35 },

  // Level 36 radicals
  { character: "支", meaningFr: "Branche", mnemonic: "Une BRANCHE avec des feuilles. La branche de l'arbre généalogique, le rameau d'olivier.", levelId: 36 },
  { character: "攴", meaningFr: "Frapper", mnemonic: "Une main qui FRAPPE avec un bâton. L'action de discipliner, de marquer le rythme.", levelId: 36 },
  { character: "文", meaningFr: "Culture", mnemonic: "La CULTURE, les motifs décoratifs. L'art de vivre à la française, le raffinement.", levelId: 36 },

  // Level 37 radicals
  { character: "斗", meaningFr: "Louche", mnemonic: "Une LOUCHE pour servir. La louche de la soupe populaire, l'outil du partage.", levelId: 37 },
  { character: "斤", meaningFr: "Hache", mnemonic: "Une HACHE pour couper. Le bûcheron dans la forêt, l'outil qui fend.", levelId: 37 },
  { character: "方", meaningFr: "Direction", mnemonic: "Une DIRECTION, un côté. Les quatre points cardinaux, le chemin à suivre.", levelId: 37 },

  // Level 38 radicals
  { character: "无", meaningFr: "Sans", mnemonic: "SANS rien, le néant. L'absence qui se remarque, le vide qui attend.", levelId: 38 },
  { character: "日", meaningFr: "Soleil", mnemonic: "Le SOLEIL qui brille. L'astre du jour, la lumière de la Côte d'Azur.", levelId: 38 },
  { character: "曰", meaningFr: "Dire", mnemonic: "DIRE quelque chose, une bouche qui parle. La parole donnée, la citation.", levelId: 38 },

  // Level 39 radicals
  { character: "月", meaningFr: "Lune", mnemonic: "La LUNE dans le ciel. Les croissants de lune, la marée qui monte.", levelId: 39 },
  { character: "木", meaningFr: "Arbre", mnemonic: "Un ARBRE avec ses branches. Les platanes des boulevards, le chêne centenaire.", levelId: 39 },
  { character: "欠", meaningFr: "Manquer", mnemonic: "MANQUER de quelque chose, bâiller. Le désir inassouvi, la bouche ouverte de surprise.", levelId: 39 },

  // Level 40 radicals
  { character: "止", meaningFr: "Arrêter", mnemonic: "S'ARRÊTER, un pied qui marque la pause. Le stop à l'intersection, la fin du voyage.", levelId: 40 },
  { character: "歹", meaningFr: "Mort", mnemonic: "La MORT, les os qui restent. La fin inévitable, le crâne qui sourit.", levelId: 40 },
  { character: "殳", meaningFr: "Lance", mnemonic: "Une LANCE, arme de jet. L'arme du guerrier antique, le javelot olympique.", levelId: 40 },

  // Level 41-45 radicals
  { character: "毋", meaningFr: "Ne pas", mnemonic: "NE PAS faire, l'interdiction. Le doigt levé de la mère qui dit non.", levelId: 41 },
  { character: "比", meaningFr: "Comparer", mnemonic: "COMPARER deux personnes côte à côte. Le miroir qui révèle les différences.", levelId: 41 },
  { character: "毛", meaningFr: "Poil", mnemonic: "Un POIL, une fourrure. Le pelage du chat, le pinceau du calligraphe.", levelId: 42 },
  { character: "氏", meaningFr: "Clan", mnemonic: "Un CLAN, une famille. Les grandes dynasties, le nom de famille qui unit.", levelId: 42 },
  { character: "气", meaningFr: "Air", mnemonic: "L'AIR qui circule, le souffle. L'atmosphère de Paris, le vent qui rafraîchit.", levelId: 43 },
  { character: "水", meaningFr: "Eau", mnemonic: "L'EAU qui coule. La fontaine de Versailles, la source de vie.", levelId: 43 },
  { character: "氵", meaningFr: "Eau radicale", mnemonic: "L'EAU en version radicale. Les trois gouttes qui mouillent.", levelId: 44 },
  { character: "火", meaningFr: "Feu", mnemonic: "Le FEU qui crépite. La cheminée en hiver, la flamme olympique.", levelId: 44 },
  { character: "灬", meaningFr: "Feu en bas", mnemonic: "Le FEU sous quelque chose. La cuisson lente du ragoût, la chaleur qui monte.", levelId: 45 },
  { character: "爪", meaningFr: "Griffe", mnemonic: "Une GRIFFE, la main qui saisit. Le chat qui sort ses griffes.", levelId: 45 },

  // Level 46-50 radicals
  { character: "父", meaningFr: "Père", mnemonic: "Le PÈRE, figure d'autorité. Le patriarche de la famille, la main protectrice.", levelId: 46 },
  { character: "爻", meaningFr: "Croiser", mnemonic: "CROISER deux lignes. Le tissage, l'entrelacement des destins.", levelId: 46 },
  { character: "片", meaningFr: "Morceau", mnemonic: "Un MORCEAU, un fragment. La part de gâteau, l'éclat de verre.", levelId: 47 },
  { character: "牙", meaningFr: "Croc", mnemonic: "Un CROC, la dent du prédateur. Le loup qui montre les dents.", levelId: 47 },
  { character: "牛", meaningFr: "Bœuf", mnemonic: "Un BŒUF, l'animal puissant. Le bœuf bourguignon, la force tranquille.", levelId: 48 },
  { character: "犬", meaningFr: "Chien", mnemonic: "Un CHIEN fidèle. Le meilleur ami de l'homme, le compagnon loyal.", levelId: 48 },
  { character: "玄", meaningFr: "Mystère", mnemonic: "Le MYSTÈRE, ce qui est profond et sombre. Les secrets de l'univers.", levelId: 49 },
  { character: "玉", meaningFr: "Jade", mnemonic: "Le JADE, pierre précieuse. Le trésor oriental, la pureté cristallisée.", levelId: 49 },
  { character: "瓜", meaningFr: "Melon", mnemonic: "Un MELON, le fruit rond. Le melon de Cavaillon, la fraîcheur de l'été.", levelId: 50 },
  { character: "瓦", meaningFr: "Tuile", mnemonic: "Une TUILE de toit. Les toits de Provence, la protection contre la pluie.", levelId: 50 },
];

async function main() {
  console.log("Seeding additional radicals (part 2 - levels 21-50)...");

  for (const radical of radicalsData) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: radical.levelId } },
      update: {
        meaningFr: radical.meaningFr,
        mnemonic: radical.mnemonic,
      },
      create: radical,
    });
  }

  console.log(`Seeded ${radicalsData.length} additional radicals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
