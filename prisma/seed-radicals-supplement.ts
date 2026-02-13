import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Comprehensive radicals supplement with engaging storytelling mnemonics
// Adding radicals across levels 11-50 to build a complete foundation

const radicalsData = [
  // Level 11 - Building block radicals
  { character: "門", meaningFr: "Portail", mnemonic: "Imaginez deux battants massifs d'un vieux PORTAIL japonais. Quand ils s'ouvrent, vous voyez un monde mystérieux de l'autre côté. Ce radical apparaît dans de nombreux kanji liés aux ouvertures, aux questions (ouvrir la bouche), et aux espaces.", levelId: 11 },
  { character: "田", meaningFr: "Rizière", mnemonic: "Vue du ciel, une RIZIÈRE japonaise ressemble à un carré divisé en quatre. Les paysans japonais ont cultivé le riz pendant des millénaires - c'est le cœur de leur civilisation.", levelId: 11 },
  { character: "石", meaningFr: "Pierre", mnemonic: "Une PIERRE qui repose au pied d'une falaise. Dans les jardins zen, les pierres sont placées avec soin pour représenter des montagnes ou des îles.", levelId: 11 },
  { character: "糸", meaningFr: "Fil", mnemonic: "Un FIL de soie qui descend du plafond. La soie japonaise était si précieuse qu'elle servait de monnaie. Ce radical apparaît dans les kanji liés aux textiles et aux connexions.", levelId: 11 },
  { character: "耳", meaningFr: "Oreille", mnemonic: "Une grande OREILLE tendue pour écouter les secrets. Dans la tradition japonaise, avoir de grandes oreilles est signe de sagesse et de chance.", levelId: 11 },
  { character: "肉", meaningFr: "Chair", mnemonic: "Ce radical représente la CHAIR ou le corps. Quand il est sur le côté d'un kanji, il ressemble à la lune (月). Il apparaît dans presque tous les kanji liés au corps humain.", levelId: 11 },

  // Level 12 - Action radicals
  { character: "辶", meaningFr: "Marcher", mnemonic: "Un homme qui MARCHE sur un chemin sinueux. Ce radical serpente au bas des kanji comme un chemin qui s'étire. Il apparaît dans les kanji liés au mouvement et au voyage.", levelId: 12 },
  { character: "心", meaningFr: "Cœur", mnemonic: "Le CŒUR qui bat au centre de votre poitrine. Dans la pensée japonaise, le cœur est le siège des émotions ET de l'esprit. Ce radical apparaît dans tous les kanji liés aux sentiments.", levelId: 12 },
  { character: "言", meaningFr: "Parole", mnemonic: "Une bouche qui émet des PAROLES représentées par les traits horizontaux. Les mots sont puissants - ils peuvent blesser ou guérir.", levelId: 12 },
  { character: "金", meaningFr: "Métal", mnemonic: "Deux pépites d'or sous un toit - le MÉTAL précieux gardé en sécurité. L'or et l'argent ont toujours fasciné l'humanité.", levelId: 12 },

  // Level 13 - Nature radicals
  { character: "雨", meaningFr: "Pluie", mnemonic: "Les gouttes de PLUIE tombant d'un nuage. Au Japon, la saison des pluies (tsuyu) est essentielle pour les rizières.", levelId: 13 },
  { character: "艹", meaningFr: "Herbe", mnemonic: "Deux brins d'HERBE qui poussent côte à côte. L'herbe pousse partout, même dans les fissures du béton - symbole de résilience.", levelId: 13 },
  { character: "竹", meaningFr: "Bambou", mnemonic: "Deux tiges de BAMBOU qui se balancent dans le vent. Le bambou japonais peut pousser d'un mètre par jour et plie sans jamais se briser.", levelId: 13 },

  // Level 14 - Tool radicals
  { character: "刀", meaningFr: "Sabre", mnemonic: "La lame courbe d'un SABRE de samouraï. Le katana est l'âme du guerrier - forgé pendant des semaines, il peut trancher la soie qui tombe.", levelId: 14 },
  { character: "力", meaningFr: "Force", mnemonic: "Un bras musclé fléchi montrant sa FORCE. Dans les temps anciens, la force physique déterminait qui survivait.", levelId: 14 },

  // Level 15 - Animal radicals
  { character: "貝", meaningFr: "Coquillage", mnemonic: "Un COQUILLAGE précieux. Avant les pièces de monnaie, les coquillages servaient de monnaie au Japon. C'est pourquoi ce radical apparaît dans les kanji liés à l'argent.", levelId: 15 },
  { character: "馬", meaningFr: "Cheval", mnemonic: "Un CHEVAL au galop, crinière au vent. Le cheval était le véhicule noble par excellence - seuls les samouraïs pouvaient en monter.", levelId: 15 },

  // Level 16 - Creature radicals
  { character: "鳥", meaningFr: "Oiseau", mnemonic: "Un OISEAU perché sur une branche. Les oiseaux au Japon sont vénérés - le corbeau est messager des dieux.", levelId: 16 },
  { character: "魚", meaningFr: "Poisson", mnemonic: "Un POISSON qui nage dans l'eau fraîche. L'île du Japon est entourée par la mer, et le poisson est au cœur de l'alimentation.", levelId: 16 },

  // Level 17 - Daily life radicals
  { character: "衣", meaningFr: "Vêtement", mnemonic: "Un VÊTEMENT qui se drape sur le corps. Le kimono traditionnel est une œuvre d'art - chaque pli a un sens.", levelId: 17 },
  { character: "食", meaningFr: "Nourriture", mnemonic: "Un bol de riz chaud - la NOURRITURE de base. Au Japon, on dit 'gohan' pour dire à la fois riz et repas.", levelId: 17 },

  // Level 18 - Structure radicals
  { character: "戸", meaningFr: "Porte", mnemonic: "Une PORTE coulissante japonaise. Les portes shoji laissent passer la lumière tout en préservant l'intimité.", levelId: 18 },
  { character: "車", meaningFr: "Véhicule", mnemonic: "Une roue de VÉHICULE vue de face. De la charrette à bœufs au shinkansen, le transport a toujours été essentiel.", levelId: 18 },

  // Level 19 - Body/Nature radicals
  { character: "頁", meaningFr: "Tête", mnemonic: "Une TÊTE vue de profil - comme une page de livre montrant un portrait. Ce radical apparaît dans les kanji liés à la tête et au visage.", levelId: 19 },
  { character: "風", meaningFr: "Vent", mnemonic: "Le VENT qui souffle à travers les bambous. Au Japon, le vent porte les esprits et les saisons.", levelId: 19 },

  // Level 20 - Travel radicals
  { character: "舟", meaningFr: "Bateau", mnemonic: "Un petit BATEAU qui flotte sur l'eau. Les pêcheurs japonais bravaient les mers depuis l'aube des temps.", levelId: 20 },
  { character: "音", meaningFr: "Son", mnemonic: "Le SON d'une cloche de temple qui résonne. Le silence japonais est ponctué de sons significatifs - chaque note a un sens.", levelId: 20 },

  // Level 21-25 - Advanced radicals
  { character: "矢", meaningFr: "Flèche", mnemonic: "Une FLÈCHE prête à être décochée. L'arc était l'arme noble des samouraïs - le kyudo est un art martial spirituel.", levelId: 21 },
  { character: "革", meaningFr: "Cuir", mnemonic: "Une peau de CUIR tendue pour sécher. Le cuir servait pour les armures et les tambours.", levelId: 21 },
  { character: "骨", meaningFr: "Os", mnemonic: "Un OS - la structure qui nous tient debout. Sans os, nous serions des méduses.", levelId: 22 },
  { character: "鬼", meaningFr: "Démon", mnemonic: "Un DÉMON oni avec ses cornes terrifiantes. Les oni hantent les contes japonais - ils punissent les méchants.", levelId: 22 },
  { character: "黒", meaningFr: "Noir", mnemonic: "La couleur NOIRE de l'encre de calligraphie. Le noir est la couleur de l'élégance au Japon.", levelId: 23 },
  { character: "麻", meaningFr: "Chanvre", mnemonic: "Des fibres de CHANVRE séchant au soleil. Le chanvre était utilisé pour les vêtements et les cordes.", levelId: 23 },
  { character: "鼓", meaningFr: "Tambour", mnemonic: "Un TAMBOUR taiko dont le son fait vibrer l'air. Les tambours annoncent les festivals et les batailles.", levelId: 24 },
  { character: "鼻", meaningFr: "Nez", mnemonic: "Le NEZ au centre du visage. Au Japon, montrer du doigt son nez signifie 'moi'.", levelId: 24 },
  { character: "歯", meaningFr: "Dent", mnemonic: "Des DENTS alignées comme des soldats. Au Japon ancien, les femmes mariées se teignaient les dents en noir.", levelId: 25 },
  { character: "亀", meaningFr: "Tortue", mnemonic: "Une TORTUE sage et lente. La tortue symbolise la longévité au Japon - elle peut vivre 200 ans.", levelId: 25 },

  // Level 26-30 - Specialized radicals
  { character: "虎", meaningFr: "Tigre", mnemonic: "Un TIGRE bondissant de sa cachette. Le tigre symbolise le courage et la force brute.", levelId: 26 },
  { character: "角", meaningFr: "Corne", mnemonic: "Une CORNE pointue comme celle d'un cerf. Les cornes représentent le pouvoir et la dignité.", levelId: 26 },
  { character: "鼎", meaningFr: "Trépied", mnemonic: "Un TRÉPIED de bronze ancien pour les offrandes. Ces objets rituels datent de la Chine antique.", levelId: 27 },
  { character: "黽", meaningFr: "Grenouille", mnemonic: "Une GRENOUILLE qui coasse dans la mare. Au Japon, la grenouille symbolise le retour (kaeru = grenouille = revenir).", levelId: 27 },
  { character: "谷", meaningFr: "Vallée", mnemonic: "Une VALLÉE profonde entre deux montagnes. Les vallées japonaises abritent des villages ancestraux.", levelId: 28 },
  { character: "网", meaningFr: "Filet", mnemonic: "Un FILET de pêcheur étendu pour sécher. Les filets capturent et retiennent - comme nos pensées parfois.", levelId: 28 },
  { character: "香", meaningFr: "Parfum", mnemonic: "Le PARFUM de l'encens qui s'élève. L'encens japonais (koh) est un art à part entière.", levelId: 29 },
  { character: "鹿", meaningFr: "Cerf", mnemonic: "Un CERF majestueux avec ses bois. À Nara, les cerfs sont sacrés et se promènent librement.", levelId: 29 },
  { character: "麦", meaningFr: "Blé", mnemonic: "Un épi de BLÉ qui ondule dans le vent. Le blé était importé de Chine et devint essentiel pour les nouilles.", levelId: 30 },
  { character: "鬲", meaningFr: "Chaudron", mnemonic: "Un CHAUDRON bouillonnant sur le feu. Les chaudrons servaient aux rituels et à la cuisine.", levelId: 30 },

  // Level 31-40 - Expert radicals
  { character: "黍", meaningFr: "Millet", mnemonic: "Des grains de MILLET dorés. Le millet était cultivé avant même le riz.", levelId: 31 },
  { character: "龠", meaningFr: "Flûte", mnemonic: "Une FLÛTE de pan aux sons envoûtants. La musique traverse les frontières et les époques.", levelId: 31 },
  { character: "鼠", meaningFr: "Rat", mnemonic: "Un RAT qui se faufile dans l'ombre. Le rat est le premier animal du zodiaque chinois.", levelId: 32 },
  { character: "齊", meaningFr: "Égal", mnemonic: "Tout est ÉGAL et aligné parfaitement. L'harmonie vient de l'équilibre.", levelId: 32 },
  { character: "龍", meaningFr: "Dragon", mnemonic: "Un DRAGON qui danse dans les nuages. Le dragon asiatique est bienveillant - il apporte la pluie et la prospérité.", levelId: 33 },
  { character: "黹", meaningFr: "Broderie", mnemonic: "Une BRODERIE délicate au fil d'or. Les artisans japonais créent des œuvres d'art sur tissu.", levelId: 33 },
  { character: "韭", meaningFr: "Poireau", mnemonic: "Des POIREAUX qui poussent en rangées. Les légumes verts sont essentiels à la cuisine japonaise.", levelId: 34 },
  { character: "臣", meaningFr: "Ministre", mnemonic: "Un MINISTRE qui s'incline devant l'empereur. La loyauté était la vertu suprême.", levelId: 34 },
  { character: "臼", meaningFr: "Mortier", mnemonic: "Un MORTIER pour piler le riz. Chaque nouvel an, les Japonais pilent le mochi.", levelId: 35 },
  { character: "酉", meaningFr: "Alcool", mnemonic: "Une jarre d'ALCOOL de riz (sake). Le sake accompagne les célébrations depuis toujours.", levelId: 35 },
  { character: "辛", meaningFr: "Amer", mnemonic: "Le goût AMER des échecs. La vie a ses moments difficiles qui nous rendent plus forts.", levelId: 36 },
  { character: "青", meaningFr: "Bleu", mnemonic: "La couleur BLEUE du ciel d'été. En japonais, le même mot désigne le bleu et le vert des feuilles.", levelId: 36 },
  { character: "比", meaningFr: "Comparer", mnemonic: "Deux personnes côte à côte pour COMPARER. La comparaison est humaine mais parfois douloureuse.", levelId: 37 },
  { character: "氏", meaningFr: "Clan", mnemonic: "Le symbole d'un CLAN noble. Au Japon, le nom de famille vient en premier - le clan avant l'individu.", levelId: 37 },
  { character: "寸", meaningFr: "Pouce", mnemonic: "Un POUCE - la plus petite mesure. Chaque pouce compte quand on forge un sabre.", levelId: 38 },
  { character: "舛", meaningFr: "Trace", mnemonic: "Des TRACES de pas dans la neige. Chaque être laisse sa marque sur le monde.", levelId: 38 },
  { character: "匕", meaningFr: "Cuillère", mnemonic: "Une CUILLÈRE simple mais essentielle. Même l'empereur mange avec une cuillère.", levelId: 39 },
  { character: "瓦", meaningFr: "Tuile", mnemonic: "Une TUILE de toit japonais. Les toitures japonaises sont des chefs-d'œuvre d'ingénierie.", levelId: 39 },
  { character: "甘", meaningFr: "Doux", mnemonic: "Le goût DOUX du mochi fourré. La douceur apaise l'âme après l'amertume.", levelId: 40 },
  { character: "瓜", meaningFr: "Melon", mnemonic: "Un MELON juteux coupé en tranches. L'été japonais se savoure avec un melon frais.", levelId: 40 },

  // Level 41-50 - Master radicals
  { character: "羽", meaningFr: "Plume", mnemonic: "Deux PLUMES qui flottent dans le vent. Légères comme un souffle, les plumes permettent l'envol.", levelId: 41 },
  { character: "老", meaningFr: "Vieux", mnemonic: "Un VIEUX sage qui marche avec sa canne. Au Japon, les anciens sont vénérés pour leur sagesse.", levelId: 41 },
  { character: "而", meaningFr: "Et", mnemonic: "Une moustache qui représente ET, une connexion. Les choses sont liées les unes aux autres.", levelId: 42 },
  { character: "耒", meaningFr: "Charrue", mnemonic: "Une CHARRUE qui retourne la terre. Avant les tracteurs, les humains labouraient à la main.", levelId: 42 },
  { character: "豕", meaningFr: "Groin", mnemonic: "Le GROIN d'un sanglier qui fouille la terre. Les sangliers sont communs dans les montagnes japonaises.", levelId: 43 },
  { character: "赤", meaningFr: "Rouge", mnemonic: "Le ROUGE intense du soleil levant. Le rouge est la couleur du Japon - passion, énergie, vie.", levelId: 44 },
  { character: "非", meaningFr: "Non", mnemonic: "Deux ailes qui s'écartent pour dire NON. Parfois, refuser est la bonne réponse.", levelId: 44 },
  { character: "見", meaningFr: "Voir", mnemonic: "Un œil sur des jambes qui VOIT le monde. Observer est le premier pas vers la compréhension.", levelId: 45 },
  { character: "戈", meaningFr: "Hallebarde", mnemonic: "Une HALLEBARDE de guerrier ancien. Cette arme pouvait percer et trancher à la fois.", levelId: 45 },
  { character: "斤", meaningFr: "Hache", mnemonic: "Une HACHE de bûcheron tranchante. La hache abat les arbres et crée de l'espace.", levelId: 46 },
  { character: "方", meaningFr: "Direction", mnemonic: "Un homme debout montrant la DIRECTION. Les quatre directions sont comme les quatre coins de la terre.", levelId: 46 },
  { character: "旦", meaningFr: "Aube", mnemonic: "Le soleil qui se lève à l'AUBE. Chaque jour est une nouvelle chance.", levelId: 47 },
  { character: "支", meaningFr: "Branche", mnemonic: "Une BRANCHE qui soutient les feuilles. Les branches portent le poids du futur.", levelId: 47 },
  { character: "止", meaningFr: "Arrêter", mnemonic: "Un pied qui s'ARRÊTE net. Savoir s'arrêter est une forme de sagesse.", levelId: 48 },
  { character: "斗", meaningFr: "Louche", mnemonic: "Une LOUCHE pour mesurer le riz. La Grande Ourse ressemble à une louche dans le ciel.", levelId: 48 },
  { character: "矛", meaningFr: "Lance", mnemonic: "Une LANCE de fantassin pointée vers l'ennemi. La lance a une portée que le sabre n'a pas.", levelId: 49 },
  { character: "勹", meaningFr: "Envelopper", mnemonic: "ENVELOPPER quelque chose précieusement. Les Japonais excellent dans l'art de l'emballage.", levelId: 49 },
  { character: "厂", meaningFr: "Falaise", mnemonic: "Une FALAISE qui surplombe la mer. Les falaises japonaises offrent des vues spectaculaires.", levelId: 50 },
  { character: "示", meaningFr: "Autel", mnemonic: "Un AUTEL shinto avec ses offrandes. Chaque sanctuaire a son autel où les esprits résident.", levelId: 50 },
];

async function main() {
  console.log("Seeding comprehensive radicals supplement with storytelling mnemonics...");

  for (const radical of radicalsData) {
    await prisma.radical.upsert({
      where: {
        character_levelId: {
          character: radical.character,
          levelId: radical.levelId,
        },
      },
      update: {
        meaningFr: radical.meaningFr,
        mnemonic: radical.mnemonic,
      },
      create: radical,
    });
  }

  console.log(`Seeded ${radicalsData.length} radicals with storytelling mnemonics.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
