import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Improved mnemonics for kanji in levels 41-50
// Using French cultural references, vivid imagery, and phonetic links

const improvedKanji = [
  // Level 41
  {
    character: "医",
    meaningMnemonicFr:
      "Une fleche (矢) dans un enclos represente le medecin de la cour de Louis XIV qui visait toujours juste avec ses remedes. La MEDECINE royale francaise etait la meilleure d'Europe!",
    readingMnemonicFr: "I comme dans 'hippocrate', le pere de la medecine.",
  },
  {
    character: "鬼",
    meaningMnemonicFr:
      "Comme les gargouilles de Notre-Dame de Paris, cette creature cornue surveille la nuit. Le DEMON japonais ressemble aux monstres qui ornent les cathedrales gothiques francaises!",
    readingMnemonicFr: "KI - 'Qui' est ce demon qui rode dans la nuit?",
  },
  {
    character: "虎",
    meaningMnemonicFr:
      "Tel un tigre du zoo de Vincennes bondissant dans sa cage, ce kanji montre la puissance feline. Le TIGRE rugit comme les lions du Jardin des Plantes!",
    readingMnemonicFr: "TORA - Le tigre fait 'tor-re' quand il rugit!",
  },
  {
    character: "痛",
    meaningMnemonicFr:
      "Comme quand on se cogne le petit orteil contre un meuble Louis XV, la DOULEUR traverse tout le corps. Le lit de malade (疒) avec un passage represente cette souffrance!",
    readingMnemonicFr: "ITAI - 'Aie!' crie le francais qui a mal.",
  },
  {
    character: "病",
    meaningMnemonicFr:
      "Un patient alite dans un hopital parisien, tel l'Hotel-Dieu au Moyen Age. Le lit (疒) abrite le malade - c'est la MALADIE qui frappe sans prevenir!",
    readingMnemonicFr: "BYOU - 'Beurk!' dit-on quand on est malade.",
  },
  {
    character: "折",
    meaningMnemonicFr:
      "Comme un origami de la Tour Eiffel, la main plie le papier avec precision. L'art de PLIER est aussi delicat que la patisserie francaise - une main experte et une hache de precision!",
    readingMnemonicFr: "ORU - 'Or' tu plies ce papier dore!",
  },
  {
    character: "筆",
    meaningMnemonicFr:
      "Le bambou qui frappe le papier comme un calligraphe a Montmartre cree des chefs-d'oeuvre. Le PINCEAU des artistes du Sacre-Coeur capture la beaute de Paris!",
    readingMnemonicFr: "FUDE - Le pinceau fait 'fou' de joie!",
  },
  {
    character: "欧",
    meaningMnemonicFr:
      "L'eau qui manque rappelle les fontaines de Versailles a sec. L'EUROPE fut baptisee par les Grecs, mais c'est la France qui en est le coeur culturel!",
    readingMnemonicFr: "OU - 'Oh!' s'exclament les touristes en Europe!",
  },
  {
    character: "破",
    meaningMnemonicFr:
      "La pierre qui perce la peau comme un revolutionnaire francais brisant les chaines de la Bastille! CASSER les barrieres de l'Ancien Regime!",
    readingMnemonicFr: "YABURU - 'Y a plus rien' apres avoir casse!",
  },
  {
    character: "引",
    meaningMnemonicFr:
      "L'arc qui tire comme Guillaume Tell, le heros qui a inspire la France. TIRER sur la corde avec la precision d'un archer des Compagnies d'Ordonnance!",
    readingMnemonicFr: "HIKU - 'Hic!' fait l'archer qui tire trop!",
  },

  // Level 42
  {
    character: "掃",
    meaningMnemonicFr:
      "La main avec le balai, comme une femme de chambre au chateau de Chambord qui BALAIE les couloirs royaux. Le menage a la francaise est un art!",
    readingMnemonicFr: "SOU - 'Sous' le tapis, on balaie la poussiere!",
  },
  {
    character: "燃",
    meaningMnemonicFr:
      "Le feu naturel comme celui qui a devore Notre-Dame en 2019. BRULER avec l'intensite des flammes qui ont emu toute la France et le monde!",
    readingMnemonicFr: "NEN - 'N'en' reste plus apres le feu!",
  },
  {
    character: "割",
    meaningMnemonicFr:
      "Le couteau qui divise comme un fromager affine coupe un camembert parfait. DIVISER le fromage est un art francais transmis de generation en generation!",
    readingMnemonicFr: "WARU - 'Ou a-t-il' coupe ce gateau?",
  },
  {
    character: "逃",
    meaningMnemonicFr:
      "Marcher avec le signe du destin comme Napoleon s'echappant de l'ile d'Elbe. FUIR pour revenir plus fort, tel le retour des Cent-Jours!",
    readingMnemonicFr: "TOU - 'Tourne' les talons et fuis vite!",
  },
  {
    character: "豪",
    meaningMnemonicFr:
      "Le haut cochon symbolise l'opulence des banquets royaux de Versailles. MAGNIFIQUE comme le festin du Roi-Soleil, ou les plats etaient des oeuvres d'art!",
    readingMnemonicFr: "GOU - 'Gout' magnifique de ce festin royal!",
  },
  {
    character: "胸",
    meaningMnemonicFr:
      "La chair avec le danger - comme le coeur d'un mousquetaire qui bat fort avant un duel. La POITRINE gonflee de fierte, prete a defendre l'honneur!",
    readingMnemonicFr: "MUNE - 'Mou ne' pas, garde ta poitrine fiere!",
  },
  {
    character: "頭",
    meaningMnemonicFr:
      "Le haricot sur la page comme Marie-Antoinette qui a perdu la TETE a la guillotine. Un moment historique qui a change la France a jamais!",
    readingMnemonicFr: "ATAMA - 'A ta ma-man', montre ta tete!",
  },
  {
    character: "怒",
    meaningMnemonicFr:
      "L'esclave avec le coeur bouillant comme la COLERE du peuple francais pendant la Revolution. La fureur populaire qui a renverse la monarchie!",
    readingMnemonicFr: "DO - 'Dos' tourne, il part en colere!",
  },
  {
    character: "費",
    meaningMnemonicFr:
      "L'opposition avec la richesse - les DEPENSES folles de la cour de Versailles! Les frais somptueux qui ont vide les caisses royales!",
    readingMnemonicFr: "HI - 'Hi hi!' rit le noble qui depense!",
  },

  // Level 43
  {
    character: "願",
    meaningMnemonicFr:
      "L'origine de la tete forme le SOUHAIT - comme les prieres des pelerins a Lourdes esperant un miracle. Le desir profond de guerison!",
    readingMnemonicFr: "GAN - 'Gagne' ton souhait, fais un voeu!",
  },
  {
    character: "盗",
    meaningMnemonicFr:
      "Les yeux sur le plat comme Arsene Lupin observant le Louvre avant de VOLER la Joconde. Le gentleman cambrioleur a la francaise!",
    readingMnemonicFr: "TOU - 'Tout' a ete vole par le voleur!",
  },
  {
    character: "払",
    meaningMnemonicFr:
      "La main avec le pas comme un francais au cafe qui sort son portefeuille pour PAYER l'addition. L'art de regler la note avec elegance!",
    readingMnemonicFr: "HARAU - 'A roue' libre, paie ta dette!",
  },
  {
    character: "悲",
    meaningMnemonicFr:
      "Le non avec le coeur - la TRISTESSE d'Edith Piaf chantant 'Non, je ne regrette rien'. Le chagrin transforme en art musical!",
    readingMnemonicFr: "HI - 'Hi...' sanglote la chanteuse triste.",
  },
  {
    character: "訳",
    meaningMnemonicFr:
      "Les mots differents comme un interprete a l'ONU traduisant le francais pour le monde. TRADUIRE les nuances subtiles de la langue de Moliere!",
    readingMnemonicFr: "WAKE - 'Ouais que' ca veut dire en francais?",
  },
  {
    character: "罪",
    meaningMnemonicFr:
      "Le filet sur ce qui n'est pas - comme Jean Valjean attrape pour un CRIME mineur dans Les Miserables. La justice impitoyable de Javert!",
    readingMnemonicFr: "ZAI - 'Zappe' pas ton crime, assume!",
  },
  {
    character: "眠",
    meaningMnemonicFr:
      "L'oeil du peuple qui se ferme comme la Belle au Bois Dormant dans le conte de Perrault. DORMIR pendant cent ans dans un chateau francais!",
    readingMnemonicFr: "MIN - 'Mine' fatiguee, je vais dormir!",
  },
  {
    character: "計",
    meaningMnemonicFr:
      "Les mots qui comptent comme les ingenieurs de Gustave Eiffel CALCULANT les 7 300 tonnes de fer de la Tour. Precision mathematique francaise!",
    readingMnemonicFr: "KEI - 'Quai' de la gare, calcule ton temps!",
  },
  {
    character: "腹",
    meaningMnemonicFr:
      "La chair qui se replie comme le VENTRE d'un gourmet francais apres un repas gastronomique. Bien manger est un art de vivre!",
    readingMnemonicFr: "HARA - 'Ah rat-a-touille!' dit le ventre plein!",
  },

  // Level 44
  {
    character: "香",
    meaningMnemonicFr:
      "Le grain avec le jour forme le PARFUM - comme les champs de lavande en Provence au soleil. L'essence de Grasse, capitale mondiale du parfum!",
    readingMnemonicFr: "KOU - 'Cou-leur' et parfum de lavande!",
  },
  {
    character: "難",
    meaningMnemonicFr:
      "L'oiseau qui brule - DIFFICILE comme l'ascension du Mont Blanc, le plus haut sommet des Alpes. Un defi que seuls les braves relevent!",
    readingMnemonicFr: "NAN - 'Nan!' c'est trop difficile!",
  },
  {
    character: "途",
    meaningMnemonicFr:
      "Marcher avec le reste forme la ROUTE - comme le chemin de Saint-Jacques de Compostelle qui traverse la France. Le pelerinage millenaire!",
    readingMnemonicFr: "TO - 'Taux' de kilometres sur la route!",
  },
  {
    character: "暇",
    meaningMnemonicFr:
      "Le soleil avec le faux donne du TEMPS LIBRE - comme les vacances d'ete des francais sur la Cote d'Azur. L'art du farniente a la francaise!",
    readingMnemonicFr: "KA - 'Ca' va, j'ai du temps libre!",
  },
  {
    character: "窓",
    meaningMnemonicFr:
      "Le trou avec le coeur - la FENETRE des mansardes parisiennes ou les artistes revaient. Vue sur les toits de zinc de Paris!",
    readingMnemonicFr: "MADO - 'Ma dose' de lumiere par la fenetre!",
  },
  {
    character: "油",
    meaningMnemonicFr:
      "L'eau avec le champ - l'HUILE d'olive de Provence, or liquide de la cuisine mediterraneenne francaise. L'ingredient secret des chefs!",
    readingMnemonicFr: "ABURA - 'A bu-lle' d'huile dans la poele!",
  },
  {
    character: "励",
    meaningMnemonicFr:
      "La force avec le strict - ENCOURAGER comme un entraineur du Tour de France criant 'Allez!' aux cyclistes dans les cols des Pyrenees!",
    readingMnemonicFr: "REI - 'Raye' ta peur, courage!",
  },

  // Level 45
  {
    character: "柱",
    meaningMnemonicFr:
      "Le bois avec le maitre forme le PILIER - comme les colonnes du Pantheon a Paris qui soutiennent la grandeur republicaine francaise!",
    readingMnemonicFr: "HASHIRA - 'A chira' le pilier qui soutient!",
  },
  {
    character: "闘",
    meaningMnemonicFr:
      "La porte avec la louche - le COMBAT des gladiateurs imaginaires dans les arenes de Nimes, heritage romain en terre francaise!",
    readingMnemonicFr: "TOU - 'Tout' ou rien dans ce combat!",
  },
  {
    character: "昔",
    meaningMnemonicFr:
      "Trois jours empiles forment AUTREFOIS - comme les siecles d'histoire au chateau de Chenonceau sur le Cher. Le temps des rois!",
    readingMnemonicFr: "MUKASHI - 'Mouche a-sit' autrefois ici!",
  },
  {
    character: "色",
    meaningMnemonicFr:
      "Personne agenouillee - la COULEUR des vitraux de la Sainte-Chapelle a Paris, joyaux de lumiere du XIII siecle. Art gothique supreme!",
    readingMnemonicFr: "IRO - 'I rose' est ma couleur preferee!",
  },
  {
    character: "迷",
    meaningMnemonicFr:
      "Le riz qui avance - SE PERDRE dans le labyrinthe du chateau de Villandry ou dans les ruelles du Marais parisien. Quelle aventure!",
    readingMnemonicFr: "MAYOU - 'Ma you-te' est perdue, je suis egare!",
  },
  {
    character: "喜",
    meaningMnemonicFr:
      "Les tambours qui parlent - SE REJOUIR comme les Parisiens lors du 14 juillet, fete nationale avec feux d'artifice sur la Tour Eiffel!",
    readingMnemonicFr: "YOROKOBU - 'Yo! Rock au bout!' de joie!",
  },
  {
    character: "困",
    meaningMnemonicFr:
      "L'arbre dans l'enclos - ETRE EN DIFFICULTE comme Asterix encercle par les Romains! Mais avec sa potion magique, il s'en sortira!",
    readingMnemonicFr: "KOMARU - 'Comment a rue' sortir de la?",
  },
  {
    character: "震",
    meaningMnemonicFr:
      "La pluie avec le dragon - TREMBLER comme le sol lors du seisme de Nice de 1887. La terre qui gronde sous les pieds!",
    readingMnemonicFr: "SHIN - 'Chine' et Japon tremblent souvent!",
  },

  // Level 46
  {
    character: "偶",
    meaningMnemonicFr:
      "La personne avec l'angle forme une PAIRE - comme les amoureux qui se rencontrent PAR HASARD sous les lumieres du Pont des Arts a Paris!",
    readingMnemonicFr: "GUU - 'Gou-rmand' de hasards heureux!",
  },
  {
    character: "離",
    meaningMnemonicFr:
      "L'oiseau qui s'envole - SE SEPARER comme les adieux dechirantes dans le film 'Les Parapluies de Cherbourg'. L'amour impossible!",
    readingMnemonicFr: "RI - 'Rit' plus, il est parti, separe!",
  },
  {
    character: "壁",
    meaningMnemonicFr:
      "La terre avec la perle - le MUR des fresques de Giverny ou Monet a peint ses nympheas. L'art impressionniste sur les murs!",
    readingMnemonicFr: "KABE - 'Ca belle' peinture sur le mur!",
  },
  {
    character: "響",
    meaningMnemonicFr:
      "La campagne avec le son - RESONNER comme les cloches de Notre-Dame qui font vibrer tout Paris. Le bourdon qui chante!",
    readingMnemonicFr: "KYOU - 'Quoi?' dit l'echo qui resonne!",
  },
  {
    character: "茶",
    meaningMnemonicFr:
      "Plante avec surplus - le THE servi dans les salons de the parisiens comme Angelina. L'elegance a la francaise pour cette boisson asiatique!",
    readingMnemonicFr: "CHA - 'Chat' boit du the, quelle image!",
  },
  {
    character: "魔",
    meaningMnemonicFr:
      "Le demon avec le chanvre - la MAGIE des spectacles de Houdini a Paris au Theatre Robert-Houdin. L'illusion qui enchante!",
    readingMnemonicFr: "MA - 'Ma' magie est impressionnante!",
  },
  {
    character: "楽",
    meaningMnemonicFr:
      "La musique sur bois - AGREABLE comme un concert a l'Opera Garnier, joyau architectural de Paris. La musique qui enchante les sens!",
    readingMnemonicFr: "RAKU - 'Rack' de musique agreable!",
  },

  // Level 47
  {
    character: "贈",
    meaningMnemonicFr:
      "L'augmentation de richesse - OFFRIR comme les Francais qui offrent du champagne pour celebrer. Le cadeau parfait!",
    readingMnemonicFr: "ZOU - 'Zoo' recu en cadeau, quel present!",
  },
  {
    character: "婚",
    meaningMnemonicFr:
      "La femme du soir - le MARIAGE romantique a la mairie puis a l'eglise, tradition francaise. La robe blanche et le vin d'honneur!",
    readingMnemonicFr: "KON - 'Qu'on' se marie vite, mon amour!",
  },
  {
    character: "恋",
    meaningMnemonicFr:
      "Le coeur entrelace - l'AMOUR ROMANTIQUE des bords de Seine, les baisers sous le Pont Marie. Paris, ville de l'amour eternel!",
    readingMnemonicFr: "KOI - 'Quoi' de plus beau que l'amour?",
  },
  {
    character: "雅",
    meaningMnemonicFr:
      "L'oiseau avec la dent - ELEGANT comme les soirees a l'Academie Francaise, temple du raffinement et de la langue. L'immortel en habit vert!",
    readingMnemonicFr: "GA - 'Ga-la' elegant et raffine!",
  },
  {
    character: "衝",
    meaningMnemonicFr:
      "La rue avec le poids - la COLLISION des chars lors du Liberation de Paris en 1944. Le choc historique qui a libere la capitale!",
    readingMnemonicFr: "SHOU - 'Choc!' fait l'impact violent!",
  },
  {
    character: "愛",
    meaningMnemonicFr:
      "Le coeur avec les pattes - l'AMOUR universel chante par Edith Piaf. 'La Vie en Rose', l'hymne de l'amour a la francaise!",
    readingMnemonicFr: "AI - 'Aie!' mon coeur bat d'amour!",
  },
  {
    character: "柔",
    meaningMnemonicFr:
      "La lance avec le bois - SOUPLE comme les judokas francais, champions olympiques. L'art martial qui allie force et souplesse!",
    readingMnemonicFr: "JUU - 'Judo' est souple et puissant!",
  },

  // Level 48
  {
    character: "夢",
    meaningMnemonicFr:
      "Le soir avec le toit et l'oeil - le REVE des Francais d'une maison de campagne en Provence. Le songe d'une vie paisible au soleil!",
    readingMnemonicFr: "YUME - 'You may' rever, fais de beaux reves!",
  },
  {
    character: "渡",
    meaningMnemonicFr:
      "L'eau et le temps - TRAVERSER la Manche comme Napoleon le revait. Le tunnel sous la mer est finalement devenu realite!",
    readingMnemonicFr: "WATARU - 'Ouah! Ta rue' traverse l'eau!",
  },
  {
    character: "量",
    meaningMnemonicFr:
      "Jour et village - la QUANTITE de vin produite dans les vignobles de Bordeaux. Hectolitres de nectar des dieux!",
    readingMnemonicFr: "RYOU - 'Rio' de vin, grande quantite!",
  },
  {
    character: "積",
    meaningMnemonicFr:
      "Le riz qui s'ajoute - ACCUMULER les kilos de croissants comme un boulanger parisien avant l'aube. La pile de viennoiseries!",
    readingMnemonicFr: "TSUMU - 'Tsu-nami' de choses accumulees!",
  },
  {
    character: "全",
    meaningMnemonicFr:
      "Toit sur roi - TOUT comme le royaume de France sous Louis XIV, le Roi-Soleil qui controlait tout l'hexagone!",
    readingMnemonicFr: "ZEN - 'Zenit' de tout, la totalite!",
  },
  {
    character: "流",
    meaningMnemonicFr:
      "L'eau qui flux - COULER comme la Seine a travers Paris, le fleuve qui a vu naitre et grandir la capitale. Les bateaux-mouches!",
    readingMnemonicFr: "RYUU - 'Rue' de la riviere qui coule!",
  },
  {
    character: "幹",
    meaningMnemonicFr:
      "Le sec avec le premier - le TRONC des chenes de la foret de Fontainebleau, arbres majestueux qui ont inspire les peintres!",
    readingMnemonicFr: "MIKI - 'Mi-queue' du tronc de l'arbre!",
  },

  // Level 49
  {
    character: "段",
    meaningMnemonicFr:
      "Le tissu avec la lance - les MARCHES du grand escalier de l'Opera Garnier. L'elegance de monter les degres en tenue de gala!",
    readingMnemonicFr: "DAN - 'Danse' sur chaque marche!",
  },
  {
    character: "並",
    meaningMnemonicFr:
      "Deux debout ensemble - ALIGNER comme les soldats de la Garde Republicaine sur les Champs-Elysees le 14 juillet!",
    readingMnemonicFr: "HEI - 'Hey!' alignez-vous!",
  },
  {
    character: "魂",
    meaningMnemonicFr:
      "Le demon avec le nuage - l'AME des poetes francais comme Baudelaire et Rimbaud, leurs esprits planant sur la litterature mondiale!",
    readingMnemonicFr: "KON - 'Qu'on' garde son ame pure!",
  },
  {
    character: "落",
    meaningMnemonicFr:
      "Plante avec eau et chaque - TOMBER comme les feuilles mortes de Prevert, le poeme recite par tous les ecoliers francais!",
    readingMnemonicFr: "RAKU - 'Rack' de feuilles qui tombent!",
  },
  {
    character: "持",
    meaningMnemonicFr:
      "Main et temple - TENIR comme un sommelier qui porte le plateau de fromages dans un restaurant etoile. L'art de servir!",
    readingMnemonicFr: "JI - 'G' pour grip, je tiens bien!",
  },

  // Level 50
  {
    character: "始",
    meaningMnemonicFr:
      "Femme avec enclos - le DEBUT d'une histoire d'amour dans un jardin du Luxembourg. Tout commence par un regard!",
    readingMnemonicFr: "SHI - 'Si' on commencait maintenant?",
  },
  {
    character: "中",
    meaningMnemonicFr:
      "Ligne qui traverse - le MILIEU de la France, le centre geographique pres de Bourges. Le coeur de l'hexagone!",
    readingMnemonicFr: "NAKA - 'Nac-hos' au milieu de la table!",
  },
  {
    character: "部",
    meaningMnemonicFr:
      "Ville avec debout - la PARTIE administrative de la France, divisee en departements depuis la Revolution. L'organisation territoriale!",
    readingMnemonicFr: "BU - 'Bout' de la partie, la section!",
  },
  {
    character: "現",
    meaningMnemonicFr:
      "Le roi qui voit - APPARAITRE comme le soleil sur la Baie du Mont-Saint-Michel, spectacle magique a maree basse!",
    readingMnemonicFr: "GEN - 'Gens' qui apparaissent soudain!",
  },
  {
    character: "在",
    meaningMnemonicFr:
      "La terre qui tient - ETRE present comme la France l'est au Conseil de Securite de l'ONU. L'existence sur la scene mondiale!",
    readingMnemonicFr: "ZAI - 'Z'ai' existe, je suis la!",
  },
  {
    character: "鐘",
    meaningMnemonicFr:
      "Le metal avec l'enfant - la CLOCHE de Notre-Dame, le bourdon Emmanuel qui a survecu a l'incendie. Le son de Paris depuis des siecles!",
    readingMnemonicFr: "KANE - 'Ca ne' s'arrete pas, la cloche sonne!",
  },
];

async function main() {
  console.log("Improving mnemonics for kanji in levels 41-50...\n");

  let updatedCount = 0;
  let errorCount = 0;

  for (const kanji of improvedKanji) {
    try {
      // Find the kanji in the database
      const existingKanji = await prisma.kanji.findUnique({
        where: { character: kanji.character },
        include: { level: true },
      });

      if (existingKanji) {
        // Check if this kanji is in levels 41-50
        if (existingKanji.levelId >= 41 && existingKanji.levelId <= 50) {
          await prisma.kanji.update({
            where: { character: kanji.character },
            data: {
              meaningMnemonicFr: kanji.meaningMnemonicFr,
              readingMnemonicFr: kanji.readingMnemonicFr,
            },
          });
          console.log(
            `Updated ${kanji.character} (Level ${existingKanji.levelId})`
          );
          updatedCount++;
        } else {
          // Update anyway if found but in different level
          await prisma.kanji.update({
            where: { character: kanji.character },
            data: {
              meaningMnemonicFr: kanji.meaningMnemonicFr,
              readingMnemonicFr: kanji.readingMnemonicFr,
            },
          });
          console.log(
            `Updated ${kanji.character} (Found in Level ${existingKanji.levelId})`
          );
          updatedCount++;
        }
      } else {
        console.log(`Kanji ${kanji.character} not found in database`);
        errorCount++;
      }
    } catch (error) {
      console.error(`Error updating ${kanji.character}:`, error);
      errorCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Mnemonic improvement complete!`);
  console.log(`Updated: ${updatedCount} kanji`);
  console.log(`Errors: ${errorCount}`);
  console.log(`========================================`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
