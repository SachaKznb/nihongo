import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const improvedMnemonics: {
  character: string;
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
}[] = [
  // ===== LEVEL 56 =====
  {
    character: "単",
    meaningMnemonicFr: "Un champ 田 avec un seul chapeau ⺌ au-dessus: c'est SIMPLE comme bonjour! Comme un plat unique au bistrot parisien, pas de chichis, juste l'essentiel bien fait.",
    readingMnemonicFr: "TAN sonne comme 'temps' - 'Prends ton temps, c'est simple!' dit le chef zen.",
  },
  {
    character: "複",
    meaningMnemonicFr: "Le vêtement 衤 qui se répète 复 encore et encore: c'est MULTIPLE! Comme les couches d'un mille-feuille parisien, chaque niveau ajoutant de la complexité au dessert.",
    readingMnemonicFr: "FUKU sonne comme 'fou cou' - 'Fou ce cou avec multiple écharpes!' dit-on en hiver.",
  },
  {
    character: "及",
    meaningMnemonicFr: "Une main qui s'étire pour ATTEINDRE quelque chose juste hors de portée. Comme un enfant sur la pointe des pieds pour attraper le pot de confiture sur l'étagère.",
    readingMnemonicFr: "KYU sonne comme 'cul' - 'On l'atteint sur le cul!' dit le marathonien épuisé.",
  },
  {
    character: "奏",
    meaningMnemonicFr: "Les mains 大 qui manipulent les instruments célestes 天: c'est JOUER de la musique! Imaginez un concert à l'Opéra Garnier, le chef d'orchestre dirigeant une symphonie.",
    readingMnemonicFr: "SO sonne comme 'saut' - 'Quel saut musical!' s'exclame le public au concert de Debussy.",
  },
  {
    character: "蜜",
    meaningMnemonicFr: "L'insecte 虫 travaille dans la montagne 宓 pour créer le MIEL! Les abeilles de Provence butinent la lavande pour produire ce nectar doré des marchés français.",
    readingMnemonicFr: "MITSU sonne comme 'mitsou' - 'Mitsou adore le miel!' chante la star des années 80.",
  },
  {
    character: "岳",
    meaningMnemonicFr: "La montagne 山 majestueuse au-dessus de la plaine 丘: c'est un PIC! Le Mont Blanc s'élève au-dessus des Alpes, sommet mythique que contemplent les alpinistes.",
    readingMnemonicFr: "TAKE sonne comme 'tac' - 'Tac! On arrive au pic!' dit l'alpiniste en plantant son piolet.",
  },
  {
    character: "餓",
    meaningMnemonicFr: "La nourriture 食 que le moi 我 réclame désespérément: être AFFAMÉ! Comme à midi pile à Paris quand l'estomac gronde et que la boulangerie semble à des kilomètres.",
    readingMnemonicFr: "GA sonne comme 'gare' - 'Gare à l'affamé!' prévient mamie en servant le ragoût.",
  },
  {
    character: "牙",
    meaningMnemonicFr: "Une dent pointue et acérée qui dépasse: le CROC du loup! Dans les forêts des Vosges, le loup montre ses crocs pour protéger sa meute.",
    readingMnemonicFr: "KIBA sonne comme 'qui bat' - 'Qui bat le loup aux crocs?' demande le Petit Chaperon.",
  },
  {
    character: "劾",
    meaningMnemonicFr: "La force 力 pour fermer 亥 définitivement une porte: DESTITUER! Comme un ministre français qui perd son poste après un scandale et doit rendre les clés.",
    readingMnemonicFr: "GAI sonne comme 'gai' - 'Pas gai d'être destitué!' soupire l'ex-ministre.",
  },
  {
    character: "慨",
    meaningMnemonicFr: "Le cœur 忄 qui déjà 既 bout de colère: l'INDIGNATION! Comme un Français à une terrasse qui proteste contre une injustice sociale, le cœur rempli de révolte.",
    readingMnemonicFr: "GAI sonne comme 'gai' - 'Pas du tout gai, cette indignation!' clame le manifestant.",
  },
  {
    character: "郭",
    meaningMnemonicFr: "La ville 阝 avec ses hautes oreilles 享 protectrices: l'ENCEINTE fortifiée! Les remparts de Carcassonne, cette enceinte médiévale qui protégeait les habitants.",
    readingMnemonicFr: "KAKU sonne comme 'cacao' - 'Cacao dans l'enceinte!' criaient les marchands médiévaux.",
  },
  {
    character: "潟",
    meaningMnemonicFr: "L'eau 氵 du marché 臼 se mélange: une LAGUNE! Les étangs de Camargue, ces lagunes où flamants roses et chevaux sauvages cohabitent sous le soleil.",
    readingMnemonicFr: "KATA sonne comme 'cata' - 'Cata-strophe si la lagune s'assèche!' dit l'écologue.",
  },
  {
    character: "喝",
    meaningMnemonicFr: "La bouche 口 qui s'ouvre pour un cri brun 曷 de colère: CRIER! Comme le sergent-chef qui hurle ses ordres aux recrues au petit matin glacial.",
    readingMnemonicFr: "KATSU sonne comme 'catch' - 'Catch!' crie l'arbitre sur le ring de lutte.",
  },
  {
    character: "栗",
    meaningMnemonicFr: "L'arbre 木 à l'ouest 覀 porte des fruits piquants: la CHÂTAIGNE! À l'automne en Ardèche, on ramasse ces trésors épineux pour les griller au coin du feu.",
    readingMnemonicFr: "KURI sonne comme 'curi' - 'Curiosité! Des châtaignes partout!' s'émerveille l'enfant.",
  },
  {
    character: "祠",
    meaningMnemonicFr: "Le dieu 礻 qu'on sert 司 dans un lieu sacré: un PETIT TEMPLE! Ces petits oratoires au bord des chemins en Bretagne, où les pèlerins s'arrêtent pour prier.",
    readingMnemonicFr: "HOKORA sonne comme 'aux coraux' - 'Au petit temple près des coraux!' dit le pêcheur breton.",
  },
  {
    character: "痘",
    meaningMnemonicFr: "La maladie 疒 qui fait pousser des haricots 豆 sur la peau: la VARIOLE! Ces pustules redoutées autrefois, vaincues par la vaccination de Jenner.",
    readingMnemonicFr: "TOU sonne comme 'tout' - 'Tout le monde avait peur de la variole!' raconte grand-père.",
  },
  {
    character: "遭",
    meaningMnemonicFr: "En avançant 辶 on croise 曹 quelqu'un: RENCONTRER par hasard! Comme tomber sur un vieil ami au détour d'une rue du Marais, quelle surprise!",
    readingMnemonicFr: "AU sonne comme 'oh' - 'Oh! Quelle rencontre!' s'exclame-t-on au coin de la rue.",
  },
  {
    character: "允",
    meaningMnemonicFr: "L'enfant 儿 sous la couverture ム reçoit la PERMISSION: PERMETTRE! Quand maman dit oui pour une glace supplémentaire, quel bonheur pour le petit.",
    readingMnemonicFr: "IN sonne comme 'hein' - 'Hein? C'est permis?' demande l'enfant surpris et ravi.",
  },

  // ===== LEVEL 57 =====
  {
    character: "忘",
    meaningMnemonicFr: "Le cœur 心 qui meurt 亡 au souvenir: OUBLIER! Comme ces moments où on entre dans une pièce et on ne sait plus pourquoi. Fichue mémoire!",
    readingMnemonicFr: "WASURERU sonne comme 'va sur heure' - 'Va, sur l'heure j'ai tout oublié!' dit l'étourdi.",
  },
  {
    character: "看",
    meaningMnemonicFr: "La main 手 au-dessus de l'œil 目 pour mieux voir: REGARDER! L'infirmière surveille son patient avec attention, une main protectrice toujours prête.",
    readingMnemonicFr: "KAN sonne comme 'camp' - 'Au camp, l'infirmière regarde tout!' dit le soldat blessé.",
  },
  {
    character: "揮",
    meaningMnemonicFr: "La main 扌 qui fait briller 軍 son épée: BRANDIR! Le général français brandit son sabre, dirigeant ses troupes vers la victoire avec panache.",
    readingMnemonicFr: "KI sonne comme 'qui' - 'Qui brandit son épée?' demande le spectateur au défilé.",
  },
  {
    character: "緩",
    meaningMnemonicFr: "Le fil 糸 et les yeux 爰 fatigués: c'est LENT et RELÂCHÉ! Comme un dimanche après-midi au bord de la Loire, le temps s'écoule doucement.",
    readingMnemonicFr: "YURUI sonne comme 'yeux rouillés' - 'Yeux rouillés, tout est lent!' bâille le paresseux.",
  },
  {
    character: "勧",
    meaningMnemonicFr: "La force 力 de celui qui a vu 観: CONSEILLER! Le sage du village partage son expérience, ses conseils sont précieux comme l'or pour les jeunes.",
    readingMnemonicFr: "SUSUMERU sonne comme 'su su mère' - 'Su su, mère te conseille bien!' dit maman.",
  },
  {
    character: "陰",
    meaningMnemonicFr: "La colline 阝 où le présent 今 se cache sous le nuage 云: l'OMBRE! Les ruelles ombragées du Vieux Lyon, fraîches refuges contre le soleil d'été.",
    readingMnemonicFr: "KAGE sonne comme 'cage' - 'Dans la cage de l'ombre!' murmure le chat paresseux.",
  },
  {
    character: "妃",
    meaningMnemonicFr: "La femme 女 qui sert 己 le royaume: l'IMPÉRATRICE! Marie-Antoinette dans ses robes somptueuses, régnant sur la cour de Versailles avec grâce.",
    readingMnemonicFr: "KISAKI sonne comme 'qui sac qui' - 'Qui porte le sac de l'impératrice?' s'enquiert le valet.",
  },
  {
    character: "楼",
    meaningMnemonicFr: "L'arbre 木 avec la femme 女 et le riz 米 au sommet: une TOUR! La Tour Eiffel, cette dame de fer qui domine Paris depuis plus d'un siècle.",
    readingMnemonicFr: "ROU sonne comme 'roux' - 'Le roux de la Tour Eiffel au coucher du soleil!' dit le poète.",
  },
  {
    character: "柿",
    meaningMnemonicFr: "L'arbre 木 au marché 市 porte un fruit orange: le KAKI! Ce fruit d'automne qu'on trouve sur les étals des marchés du Sud, doux et sucré comme le miel.",
    readingMnemonicFr: "KAKI sonne exactement comme 'kaki' en français! Facile à retenir, c'est le même mot!",
  },
  {
    character: "寛",
    meaningMnemonicFr: "Sous le toit 宀, on voit 見 avec un grand cœur 萈: être GÉNÉREUX! L'hospitalité française, accueillir l'étranger avec chaleur et générosité.",
    readingMnemonicFr: "KAN sonne comme 'camp' - 'Au camp, le chef est généreux!' dit le scout reconnaissant.",
  },
  {
    character: "憾",
    meaningMnemonicFr: "Le cœur 忄 qui ressent 感: le REGRET profond! Ces nuits où l'on repense aux paroles qu'on aurait dû dire, aux gestes qu'on n'a pas faits.",
    readingMnemonicFr: "KAN sonne comme 'quand' - 'Quand j'y repense, quel regret!' soupire le romantique.",
  },
  {
    character: "謹",
    meaningMnemonicFr: "Les mots 言 difficiles 堇 à prononcer avec respect: être RESPECTUEUX! L'élève qui s'adresse à son maître avec déférence, pesant chaque mot.",
    readingMnemonicFr: "KIN sonne comme 'qu'un' - 'Qu'un seul mot respectueux suffit!' enseigne le sage.",
  },
  {
    character: "繭",
    meaningMnemonicFr: "L'herbe 艹 entoure l'insecte 虫 et le fil 糸: le COCON! Les cocons de soie des Cévennes, précieux trésors des magnaneries d'antan.",
    readingMnemonicFr: "MAYU sonne comme 'ma you' - 'Ma you-you, un cocon!' s'émerveille l'enfant curieux.",
  },
  {
    character: "市",
    meaningMnemonicFr: "Le tissu 亠 qui pend sur l'étal 巾: le MARCHÉ et la VILLE! Les marchés provençaux où tissus colorés et légumes frais attirent les foules chaque dimanche.",
    readingMnemonicFr: "ICHI sonne comme 'ici' - 'Ichi le marché, venez!' crie le marchand enthousiaste.",
  },
  {
    character: "赦",
    meaningMnemonicFr: "Le rouge 赤 de la honte et le frapper 攵 qu'on arrête: PARDONNER! Le roi qui gracie le condamné, une tradition de clémence royale française.",
    readingMnemonicFr: "SHA sonne comme 'chat' - 'Chat pardonné pour le vase cassé!' dit le maître indulgent.",
  },
  {
    character: "靭",
    meaningMnemonicFr: "Le cuir 革 avec la lame 刃: le TENDON solide et flexible! Les tendons des athlètes, souples comme le cuir mais forts comme l'acier.",
    readingMnemonicFr: "JIN sonne comme 'gin' - 'Un gin pour mes tendons fatigués!' plaisante le sportif.",
  },
  {
    character: "錐",
    meaningMnemonicFr: "Le métal 金 qui suit 隹 une ligne: le POINÇON! L'outil du cordonnier parisien qui perce le cuir avec précision pour créer des chaussures sur mesure.",
    readingMnemonicFr: "KIRI sonne comme 'qui rit' - 'Qui rit du poinçon se pique!' prévient l'artisan.",
  },
  {
    character: "溢",
    meaningMnemonicFr: "L'eau 氵 qui profite 益 et s'échappe: DÉBORDER! La Seine en crue qui envahit les quais de Paris, l'eau qui ne peut être contenue.",
    readingMnemonicFr: "AFURERU sonne comme 'à fleur' - 'À fleur d'eau, ça déborde!' constate le Parisien.",
  },
  {
    character: "瑠",
    meaningMnemonicFr: "Le roi 王 avec le flux 流: la pierre précieuse LAPIS-LAZULI! Ce bleu profond des bijoux royaux français, couleur du ciel méditerranéen.",
    readingMnemonicFr: "RU sonne comme 'rue' - 'Rue du Lapis-Lazuli!' invente le joaillier parisien.",
  },
  {
    character: "邁",
    meaningMnemonicFr: "Le chemin 辶 des dix mille 萬: AVANCER sans relâche! Le marcheur du Compostelle qui avance jour après jour, déterminé à atteindre son but.",
    readingMnemonicFr: "MAI sonne comme 'mais' - 'Mais avance donc!' encourage le guide du pèlerinage.",
  },
  {
    character: "准",
    meaningMnemonicFr: "La glace 冫 et le court 隹: APPROUVER rapidement! Le tampon officiel qui valide un document, froid et efficace comme l'administration française.",
    readingMnemonicFr: "JUN sonne comme 'juin' - 'En juin, c'est approuvé!' annonce le fonctionnaire pressé.",
  },
  {
    character: "蔽",
    meaningMnemonicFr: "L'herbe 艹 qui couvre 敝: COUVRIR et cacher! Les feuilles de vigne qui cachent les raisins, protection naturelle contre le soleil brûlant.",
    readingMnemonicFr: "OOU sonne comme 'où où' - 'Où où est-il couvert?' cherche le jardinier inquiet.",
  },

  // ===== LEVEL 58 =====
  {
    character: "幾",
    meaningMnemonicFr: "Les fils 幺 entrelacés avec une personne 戈: COMBIEN de possibilités! Comme compter les étoiles la nuit en Provence, impossible de savoir combien.",
    readingMnemonicFr: "IKU sonne comme 'y coût' - 'Y a combien? Quel coût!' demande le curieux au marché.",
  },
  {
    character: "旬",
    meaningMnemonicFr: "Le paquet 勹 des jours 日: une DÉCADE de dix jours! Le calendrier révolutionnaire français divisait le mois en trois décades. Original, non?",
    readingMnemonicFr: "JUN sonne comme 'juin' - 'En juin, trois décades!' calcule le révolutionnaire.",
  },
  {
    character: "蛍",
    meaningMnemonicFr: "L'insecte 虫 qui brille sous le feu 火 du toit 冖: la LUCIOLE! Ces petites lumières magiques des soirs d'été dans les campagnes françaises.",
    readingMnemonicFr: "HOTARU sonne comme 'oh ta rue' - 'Oh, ta rue est pleine de lucioles!' s'émerveille l'enfant.",
  },
  {
    character: "牧",
    meaningMnemonicFr: "La vache 牛 qu'on guide 攵 avec un bâton: le PÂTURAGE! Les alpages normands où les vaches broutent paisiblement pour faire le meilleur fromage.",
    readingMnemonicFr: "MAKI sonne comme 'ma qui' - 'Ma qui mène le pâturage?' demande le fermier cherchant son vacher.",
  },
  {
    character: "丘",
    meaningMnemonicFr: "La forme arrondie d'une élévation douce: une COLLINE! Les collines du Luberon couvertes de lavande, paysage de carte postale provençale.",
    readingMnemonicFr: "OKA sonne comme 'okay' - 'Okay, on grimpe la colline!' propose le randonneur optimiste.",
  },
  {
    character: "梨",
    meaningMnemonicFr: "L'arbre 木 qui profite 利: la POIRE juteuse! Les poires de la vallée du Rhône, sucrées et fondantes, parfaites pour une tarte aux poires.",
    readingMnemonicFr: "NASHI sonne comme 'na si' - 'N'a-t-il pas cueilli la poire?' demande le gourmand impatient.",
  },
  {
    character: "后",
    meaningMnemonicFr: "La bouche 口 au-dessus de tout: la REINE qui commande! Marie de Médicis régnant sur la France, sa parole était loi à la cour.",
    readingMnemonicFr: "KISAKI sonne comme 'qui sac qui' - 'Qui porte le sac de la reine?' demande le courtisan.",
  },
  {
    character: "鎧",
    meaningMnemonicFr: "Le métal 金 qui entoure 豈: l'ARMURE du chevalier! Les armures étincelantes exposées au Musée de l'Armée aux Invalides, témoins des batailles passées.",
    readingMnemonicFr: "YOROI sonne comme 'y a roi' - 'Y a roi sous l'armure!' découvre le page surpris.",
  },
  {
    character: "骸",
    meaningMnemonicFr: "L'os 骨 et le tout 亥: le SQUELETTE complet! Les catacombes de Paris, où des millions de squelettes forment les murs de ce labyrinthe macabre.",
    readingMnemonicFr: "GAI sonne comme 'gai' - 'Pas gai le squelette!' frissonne le visiteur des catacombes.",
  },
  {
    character: "畿",
    meaningMnemonicFr: "Le champ 田 avec les fils 幺 de pouvoir: la région de la CAPITALE! L'Île-de-France, cœur battant de la nation autour de Paris.",
    readingMnemonicFr: "KI sonne comme 'qui' - 'Qui règne sur la capitale?' demande le provincial curieux.",
  },
  {
    character: "鑿",
    meaningMnemonicFr: "Le métal 金 qui creuse avec force: le CISEAU À BOIS! L'ébéniste du Faubourg Saint-Antoine sculpte les meubles avec son ciseau, geste précis d'artisan.",
    readingMnemonicFr: "NOMI sonne comme 'nos mis' - 'Nos ciseaux mis au travail!' dit le maître ébéniste.",
  },
  {
    character: "炒",
    meaningMnemonicFr: "Le feu 火 avec peu 少: FAIRE SAUTER rapidement! Le wok qui crépite dans une cuisine asiatique du 13e arrondissement, les légumes qui sautent.",
    readingMnemonicFr: "ITAMERU sonne comme 'il t'a mer' - 'Il t'a mer-veilleusement fait sauter!' complimente le gourmet.",
  },
  {
    character: "賤",
    meaningMnemonicFr: "L'argent 貝 qui combat 戔 pour peu: être de condition BASSE! Les misérables de Victor Hugo, ces gens du peuple méprisés par la bourgeoisie.",
    readingMnemonicFr: "SEN sonne comme 'sans' - 'Sans valeur, de basse condition!' dit le noble méprisant.",
  },
  {
    character: "凖",
    meaningMnemonicFr: "La glace 冫 et la mesure 準: le STANDARD gelé, fixe! Les normes AFNOR qui définissent les standards français, rigides et précises.",
    readingMnemonicFr: "JUN sonne comme 'juin' - 'En juin, nouveau standard!' annonce le normalisateur.",
  },
  {
    character: "靄",
    meaningMnemonicFr: "La pluie 雨 qui crée un voile apaisant 靉: la BRUME matinale! Le brouillard sur la Loire à l'aube, mystérieux et poétique comme un tableau impressionniste.",
    readingMnemonicFr: "AI sonne comme 'aïe' - 'Aïe, je ne vois rien dans cette brume!' dit le navigateur perdu.",
  },

  // ===== LEVEL 59 =====
  {
    character: "靴",
    meaningMnemonicFr: "Le cuir 革 qui change 化 de forme pour les pieds: la CHAUSSURE! Les souliers de Christian Louboutin, chef-d'œuvre de l'artisanat français aux semelles rouges.",
    readingMnemonicFr: "KUTSU sonne comme 'cou tsu' - 'Cou tordu à force de regarder tes chaussures!' plaisante l'ami.",
  },
  {
    character: "契",
    meaningMnemonicFr: "Le grand 大 et le sabre 丰 qui gravé 刀: le CONTRAT officiel! Les notaires français qui scellent les contrats depuis des siècles avec solennité.",
    readingMnemonicFr: "KEI sonne comme 'quai' - 'Sur le quai, on signe le contrat!' dit le notaire pressé.",
  },
  {
    character: "掲",
    meaningMnemonicFr: "La main 扌 qui montre le soleil 曷: AFFICHER au grand jour! Les affiches de Toulouse-Lautrec placardées dans tout Montmartre, art publicitaire révolutionnaire.",
    readingMnemonicFr: "KAKAGERU sonne comme 'caca guère' - 'Caca guère intéressant à afficher!' grogne le censeur.",
  },
  {
    character: "桑",
    meaningMnemonicFr: "Les mains 叒 sur l'arbre 木: le MÛRIER qu'on récolte! Les mûriers des Cévennes qui nourrissaient les vers à soie de l'industrie soyeuse française.",
    readingMnemonicFr: "KUWA sonne comme 'coi ah' - 'Coi ah! Quel beau mûrier!' admire le sériciculteur.",
  },
  {
    character: "搬",
    meaningMnemonicFr: "La main 扌 et le général 般 qui organise: TRANSPORTER les troupes! Les déménageurs parisiens qui portent armoires et pianos dans les escaliers étroits.",
    readingMnemonicFr: "HAN sonne comme 'an' - 'En un an, tout transporté!' promet le déménageur efficace.",
  },
  {
    character: "陵",
    meaningMnemonicFr: "La colline 阝 où repose le grand 夌: la COLLINE funéraire! Les tumulus de Bretagne, tombeaux des anciens rois celtes perdus dans la lande.",
    readingMnemonicFr: "MISASAGI sonne comme 'mi-sagace' - 'Mi-sagace pour trouver cette colline!' dit l'archéologue.",
  },
  {
    character: "斤",
    meaningMnemonicFr: "La hache 斤 qui coupe avec précision: le JIN, ancienne unité de mesure! Le boucher qui pèse la viande avec exactitude pour le client exigeant.",
    readingMnemonicFr: "KIN sonne comme 'qu'un' - 'Qu'un seul jin de viande!' commande le client frugal.",
  },
  {
    character: "隅",
    meaningMnemonicFr: "La colline 阝 avec le coin 禺: le COIN reculé! Les coins perdus de la Creuse où le temps semble s'être arrêté, paradis des amoureux de nature.",
    readingMnemonicFr: "SUMI sonne comme 'su mi' - 'Su mi dans le coin!' se cache l'enfant jouant à cache-cache.",
  },
  {
    character: "薫",
    meaningMnemonicFr: "L'herbe 艹 qui fume 熏: le PARFUM qui s'élève! Les champs de lavande de Grasse, capitale mondiale du parfum où naissent les fragrances légendaires.",
    readingMnemonicFr: "KAORU sonne comme 'cas aux rues' - 'Cas aux rues, ce parfum!' s'étonne le nez de Grasse.",
  },
  {
    character: "啓",
    meaningMnemonicFr: "La porte 戸 et la bouche 口 qui enseigne 攵: ÉCLAIRER l'esprit! Le philosophe des Lumières qui ouvre les portes de la connaissance avec ses mots.",
    readingMnemonicFr: "KEI sonne comme 'quai' - 'Sur le quai des idées, on éclaire!' proclame le philosophe.",
  },
  {
    character: "慶",
    meaningMnemonicFr: "Le cerf 鹿 et le cœur 心 en fête: FÉLICITER avec joie! Les félicitations à la française, bisous sur les joues et champagne qui coule.",
    readingMnemonicFr: "KEI sonne comme 'quai' - 'Sur le quai, on félicite les mariés!' crie la foule joyeuse.",
  },
  {
    character: "髄",
    meaningMnemonicFr: "L'os 骨 et l'essence 隋: la MOELLE au cœur! La moelle osseuse, trésor caché dans les os que le chef utilise pour son bouillon parfait.",
    readingMnemonicFr: "ZUI sonne comme 'z'oui' - 'Z'oui, la moelle c'est le meilleur!' confirme le gourmet.",
  },
  {
    character: "楔",
    meaningMnemonicFr: "Le bois 木 et le système 契: la CALE qui coince! Le charpentier qui enfonce sa cale pour stabiliser la charpente d'une vieille église normande.",
    readingMnemonicFr: "KUSABI sonne comme 'cou sa bi' - 'Cou sa biche, une cale!' crie le charpentier distrait.",
  },
  {
    character: "蝉",
    meaningMnemonicFr: "L'insecte 虫 unique 単 qui chante: la CIGALE! Les cigales de Provence qui chantent tout l'été, bande-son des apéros sous les platanes.",
    readingMnemonicFr: "SEMI sonne comme 'semi' - 'Semi-ton, la cigale!' analyse le musicien provençal.",
  },
  {
    character: "兜",
    meaningMnemonicFr: "Les deux cornes 儿 et le fils 白 du guerrier: le CASQUE samouraï! Les casques à cornes des samouraïs exposés au musée Guimet, terrifiants et beaux.",
    readingMnemonicFr: "KABUTO sonne comme 'cap bout tôt' - 'Cap au bout tôt avec ce casque!' ordonne le général.",
  },
  {
    character: "翠",
    meaningMnemonicFr: "Les plumes 羽 et le soldat 卒: le vert ÉMERAUDE des plumes! L'éclat vert intense d'une émeraude à la vitrine de Cartier, place Vendôme.",
    readingMnemonicFr: "MIDORI sonne comme 'mi-dort i' - 'Mi-dort, il rêve d'émeraude!' dit le bijoutier fatigué.",
  },
  {
    character: "儲",
    meaningMnemonicFr: "La personne 亻 remarquable 諸: qui fait du PROFIT! Le banquier parisien qui accumule les profits avec son flair légendaire pour les affaires.",
    readingMnemonicFr: "MOUKERU sonne comme 'mou cœur' - 'Mou cœur pour le profit!' accuse le critique du capitalisme.",
  },
  {
    character: "逝",
    meaningMnemonicFr: "Le chemin 辶 vers le reflet 折: MOURIR, partir pour l'au-delà! Les chrysanthèmes de la Toussaint, fleurs du souvenir pour ceux qui sont partis.",
    readingMnemonicFr: "YUKU sonne comme 'y cou' - 'Y cou penché, il est parti...' murmure l'endeuillé.",
  },
  {
    character: "是",
    meaningMnemonicFr: "Le soleil 日 sur le pied 疋 qui se dresse droit: c'est CORRECT! L'arbitre de rugby qui confirme l'essai, le bras levé: c'est bon!",
    readingMnemonicFr: "ZE sonne comme 'zeste' - 'Un zeste de correction!' dit le chef perfectionniste.",
  },
  {
    character: "被",
    meaningMnemonicFr: "Le vêtement 衤 et la peau 皮: SUBIR les coups sur sa peau! La victime qui subit les épreuves mais reste debout, courage français.",
    readingMnemonicFr: "KOUMURU sonne comme 'cou mûre' - 'Cou mûr pour subir!' ironise le philosophe stoïque.",
  },

  // ===== LEVEL 60 =====
  {
    character: "隷",
    meaningMnemonicFr: "La colline 阝 où on attache 隶 les gens: l'ESCLAVE! L'histoire sombre de l'esclavage, abolie en France par Schœlcher en 1848, devoir de mémoire.",
    readingMnemonicFr: "REI sonne comme 'raie' - 'Comme une raie, l'esclave devait se taire!' enseigne l'historien.",
  },
  {
    character: "圏",
    meaningMnemonicFr: "L'enclos 囗 du rouleau 巻: la SPHÈRE d'influence! La sphère d'influence française en Afrique, cercle géopolitique hérité de l'histoire coloniale.",
    readingMnemonicFr: "KEN sonne comme 'qu'en' - 'Qu'en est-il de ta sphère?' demande le géopoliticien curieux.",
  },
  {
    character: "兼",
    meaningMnemonicFr: "Les deux grains 禾 tenus ensemble: CUMULER les fonctions! Le Français qui cumule les mandats, tradition politique bien française, non?",
    readingMnemonicFr: "KANERU sonne comme 'qu'à ne rien' - 'Qu'à ne rien faire, il cumule!' critique l'électeur mécontent.",
  },
  {
    character: "弧",
    meaningMnemonicFr: "L'arc 弓 et le melon 瓜: la courbe de l'ARC parfait! L'Arc de Triomphe, courbe majestueuse qui domine les Champs-Élysées depuis Napoléon.",
    readingMnemonicFr: "KO sonne comme 'corps' - 'Le corps fait un arc!' observe le professeur de yoga.",
  },
  {
    character: "隙",
    meaningMnemonicFr: "La colline 阝 avec le petit 小 et la lumière 日: la FISSURE par où passe le jour! Les fissures dans les murs des vieux châteaux de la Loire.",
    readingMnemonicFr: "SUKI sonne comme 'su qui' - 'Su qui passe par la fissure?' demande le fantôme du château.",
  },
  {
    character: "謡",
    meaningMnemonicFr: "Les mots 言 qui secouent 䍃 l'air: le CHANT traditionnel! Les chants des chorales bretonnes qui résonnent dans les églises de granit.",
    readingMnemonicFr: "UTAI sonne comme 'où t'es' - 'Où t'es? J'entends ton chant!' appelle l'amoureux transi.",
  },
  {
    character: "繋",
    meaningMnemonicFr: "Le fil 糸 qui lie 撃: ATTACHER solidement! Les liens des marins bretons, nœuds solides qui tiennent contre vents et marées.",
    readingMnemonicFr: "TSUNAGU sonne comme 'tu n'a goût' - 'Tu n'as goût qu'à attacher!' dit le maître des nœuds.",
  },
  {
    character: "鶏",
    meaningMnemonicFr: "L'oiseau 鳥 domestique 奚: le POULET de la basse-cour! Le coq gaulois, symbole de la France, chante au petit matin dans les fermes.",
    readingMnemonicFr: "NIWATORI sonne comme 'ni va trop' - 'Ni va trop vite, le poulet!' conseille le fermier.",
  },
  {
    character: "桁",
    meaningMnemonicFr: "L'arbre 木 et le marcher 行: le CHIFFRE qui avance! Les chiffres du budget de la France, avec beaucoup de zéros qui s'alignent.",
    readingMnemonicFr: "KETA sonne comme 'qu'éta' - 'Qu'est-ce? Un chiffre à tant de zéros!' s'étonne le comptable.",
  },
  {
    character: "舷",
    meaningMnemonicFr: "Le bateau 舟 et le mystère 玄: le BORD DU NAVIRE dans la brume! Le bastingage des ferries qui traversent la Manche, frontière liquide avec l'Angleterre.",
    readingMnemonicFr: "GEN sonne comme 'gens' - 'Les gens au bord du navire!' compte le capitaine du ferry.",
  },
  {
    character: "諺",
    meaningMnemonicFr: "Les paroles 言 et la règle 彦: le PROVERBE transmis! 'Petit à petit, l'oiseau fait son nid' - sagesse française qui traverse les générations.",
    readingMnemonicFr: "KOTOWAZA sonne comme 'cote oh waza' - 'C'te technique du proverbe!' admire l'élève.",
  },
  {
    character: "孤",
    meaningMnemonicFr: "L'enfant 子 et le melon 瓜 seul: être SEUL au monde! L'orphelin de Dickens, seul dans la grande ville, cherchant chaleur et famille.",
    readingMnemonicFr: "KO sonne comme 'corps' - 'Corps seul, cœur seul!' soupire le solitaire mélancolique.",
  },
  {
    character: "漬",
    meaningMnemonicFr: "L'eau 氵 et le responsable 責: MARINER les légumes! Les cornichons marinés dans le vinaigre, accompagnement incontournable des charcuteries françaises.",
    readingMnemonicFr: "TSUKERU sonne comme 'tu cœur' - 'Tu cœur à mariner tout!' dit la grand-mère cuisinière.",
  },
  {
    character: "梯",
    meaningMnemonicFr: "Le bois 木 et le frère 弟 qui grimpe: l'ÉCHELLE pour monter! L'échelle du pompier de Paris qui sauve les Parisiens des incendies, héros du quotidien.",
    readingMnemonicFr: "HASHIGO sonne comme 'a si gô' - 'A si haut, l'échelle!' calcule le pompier courageux.",
  },
  {
    character: "慄",
    meaningMnemonicFr: "Le cœur 忄 et la châtaigne 栗 qui pique: FRISSONNER de peur! Les frissons d'horreur devant un film d'épouvante, le cœur qui bat la chamade.",
    readingMnemonicFr: "ONONOKU sonne comme 'oh non oh cou' - 'Oh non, oh quel frisson!' crie le spectateur terrifié.",
  },
  {
    character: "崇",
    meaningMnemonicFr: "La montagne 山 et le culte 宗: VÉNÉRER ce qui est élevé! Le pèlerin qui gravit le Mont-Saint-Michel, lieu de vénération millénaire en Normandie.",
    readingMnemonicFr: "SUU sonne comme 'su' - 'Su-prême vénération!' s'exclame le pèlerin émerveillé.",
  },
  {
    character: "滲",
    meaningMnemonicFr: "L'eau 氵 qui participe 參: PÉNÉTRER lentement! L'encre qui pénètre le papier, l'humidité qui s'infiltre dans les vieilles pierres bretonnes.",
    readingMnemonicFr: "NIJIMU sonne comme 'ni j'mue' - 'Ni je mue, ça pénètre!' constate le maçon résigné.",
  },
  {
    character: "憧",
    meaningMnemonicFr: "Le cœur 忄 de l'enfant 童: ASPIRER à un rêve! L'enfant qui rêve de devenir astronaute, les yeux pleins d'étoiles et d'espoir.",
    readingMnemonicFr: "AKOGARERU sonne comme 'à quoi garer' - 'À quoi garer mes rêves?' se demande le rêveur.",
  },
  {
    character: "碧",
    meaningMnemonicFr: "Le roi 王, le blanc 白 et la pierre 石: le JADE bleu-vert! Le jade de l'impératrice Cixi, vert comme les eaux de la Méditerranée en été.",
    readingMnemonicFr: "HEKI sonne comme 'et qui' - 'Et qui possède ce jade?' demande le collectionneur fasciné.",
  },
  {
    character: "逓",
    meaningMnemonicFr: "Le chemin 辶 du frère 弟 aîné: TRANSMETTRE de génération en génération! La Poste française, service de transmission depuis Louis XI.",
    readingMnemonicFr: "TEI sonne comme 'tes' - 'Tes lettres transmises!' promet le facteur fidèle.",
  },
  {
    character: "昂",
    meaningMnemonicFr: "Le soleil 日 qui monte haut 卬: S'ÉLEVER avec fierté! L'ascension sociale, cette ambition française de s'élever par l'éducation et le mérite.",
    readingMnemonicFr: "KOU sonne comme 'cou' - 'Cou tendu, on s'élève!' conseille le coach de vie.",
  },
];

async function main() {
  console.log("Starting mnemonic improvements for levels 56-60...\n");

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
        console.log(`Updated: ${item.character}`);
      } else {
        notFoundCount++;
        console.log(`Not found: ${item.character}`);
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
