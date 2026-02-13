import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const improvedMnemonics: {
  character: string;
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
}[] = [
  // ============== LEVEL 43 ==============
  {
    character: "辛",
    meaningMnemonicFr: "Cette aiguille 立 avec le chapeau 十 pique comme un piment: c'est ÉPICÉ! Imaginez un chef lyonnais qui goute sa sauce au piment d'Espelette et grimace - c'est pénible mais délicieux!",
    readingMnemonicFr: "SHIN comme 'chine' - En Chine, la cuisine est si épicée que ca pique le shin (tibia)!",
  },
  {
    character: "曇",
    meaningMnemonicFr: "Le soleil 日 tente de percer les nuages 雲: le ciel est NUAGEUX! Comme un jour gris en Normandie où le soleil joue à cache-cache derrière les nuages, typique du climat français.",
    readingMnemonicFr: "DON sonne comme 'donc' - 'Donc il fait nuageux, prends ton parapluie!' dit maman à Paris.",
  },
  {
    character: "炊",
    meaningMnemonicFr: "Le feu 火 sous quelqu'un qui manque 欠 de nourriture: il faut CUIRE! Un chef français devant ses fourneaux, la flamme dansant sous la casserole de pot-au-feu mijotant doucement.",
    readingMnemonicFr: "SUI comme 'suie' - La suie noire du feu qui a trop cuit le repas du chef étoilé!",
  },
  {
    character: "悟",
    meaningMnemonicFr: "Le coeur 忄 qui m'appartient 吾 atteint l'illumination: RÉALISER! Comme Descartes dans son poêle, ayant soudain l'illumination du 'Je pense donc je suis' - un moment de pure réalisation.",
    readingMnemonicFr: "GO comme le jeu de go - En jouant au go, on réalise soudain la stratégie parfaite!",
  },
  {
    character: "刈",
    meaningMnemonicFr: "Le couteau 刂 qui coupe 乂 en croisant: FAUCHER! Les paysans de la Beauce avec leurs faux, récoltant le blé doré sous le soleil d'été, geste ancestral de la France agricole.",
    readingMnemonicFr: "GAI comme 'gai' - Le faucheur est gai quand la récolte est bonne dans les champs!",
  },
  {
    character: "該",
    meaningMnemonicFr: "Les paroles 言 du sanglier 亥 sont CONCERNÉES par le sujet! Comme Obélix concerné quand on parle de sangliers - 'Ils sont fous ces Romains!' dit-il, toujours impliqué dans la discussion.",
    readingMnemonicFr: "GAI comme 'gai' - 'Je suis gai d'être concerné par cette affaire!' dit l'avocat français.",
  },
  {
    character: "験",
    meaningMnemonicFr: "Le cheval 馬 qui passe le test 僉: c'est l'EXPÉRIENCE! Comme les chevaux de course à Longchamp, testés et expérimentés avant le grand prix, sous les yeux des parieurs parisiens.",
    readingMnemonicFr: "KEN comme 'ken' de barbie - Ken teste l'expérience de monter à cheval pour Barbie!",
  },
  {
    character: "察",
    meaningMnemonicFr: "Sous le toit 宀 on fait le sacrifice 祭 pour DEVINER l'avenir! Les druides gaulois sous leur dolmen, sacrifiant et observant les signes pour prédire le destin de la tribu.",
    readingMnemonicFr: "SATSU comme 'ça tue' - 'Ça tue comme il devine bien!' s'exclame le public du mentaliste.",
  },
  {
    character: "跪",
    meaningMnemonicFr: "Le pied 足 face au danger 危: S'AGENOUILLER! Comme les chevaliers français s'agenouillant devant leur roi à Versailles, un genou au sol en signe de respect absolu.",
    readingMnemonicFr: "HIZAMAZUKU - 'His amazing look' fait s'agenouiller tout le monde devant le roi!",
  },
  {
    character: "宵",
    meaningMnemonicFr: "Sous le toit 宀 le petit 小 et la lune 月 apparaissent: c'est le SOIR! Les terrasses parisiennes qui s'animent au crépuscule, quand les lumières s'allument le long des boulevards.",
    readingMnemonicFr: "YOI comme 'yoyo' - Le soir, les enfants rangent leurs yoyos et vont se coucher!",
  },
  {
    character: "睫",
    meaningMnemonicFr: "L'oeil 目 avec quelque chose de délicat comme l'herbe 疌: les CILS! Les cils de Sophie Marceau, longs et soyeux, battant doucement comme les ailes d'un papillon parisien.",
    readingMnemonicFr: "MATSUGE sonne comme 'ma joue' - 'Mes cils touchent ma joue quand je ferme les yeux!'",
  },
  {
    character: "瞑",
    meaningMnemonicFr: "L'oeil 目 plongé dans l'obscurité 冥: FERMER LES YEUX! Comme un moine du Mont Saint-Michel méditant dans sa cellule, les yeux fermés, cherchant la paix intérieure.",
    readingMnemonicFr: "MEI comme 'mes yeux' - 'Mes yeux se ferment pour méditer', dit le moine breton.",
  },
  {
    character: "硯",
    meaningMnemonicFr: "La pierre 石 où l'on voit 見 l'encre: PIERRE À ENCRE! Les calligraphes du Quartier Latin frottant leur bâton d'encre sur la pierre, préparant l'art de l'écriture.",
    readingMnemonicFr: "SUZURI comme 'sous zéro' - L'encre gèle sous zéro sur la pierre à encre en hiver!",
  },
  {
    character: "螺",
    meaningMnemonicFr: "L'insecte 虫 avec la spirale 累: SPIRALE! Comme un escargot de Bourgogne, sa coquille en spirale parfaite, délice des tables françaises avec du beurre persillé.",
    readingMnemonicFr: "RA comme 'rat' - Le rat court en spirale pour échapper au chat dans les rues de Paris!",
  },
  {
    character: "霰",
    meaningMnemonicFr: "La pluie 雨 qui se disperse 散: c'est la GRÊLE! Les vignerons de Champagne redoutant ces billes de glace qui tombent du ciel et détruisent les précieuses grappes.",
    readingMnemonicFr: "ARARE comme 'à rare' - 'À rare qu'il grêle en été!' dit le vigneron soulagé.",
  },
  {
    character: "皿",
    meaningMnemonicFr: "Ce rectangle avec des pieds est une ASSIETTE vue de côté! Comme les belles assiettes de porcelaine de Limoges, fierté de l'artisanat français depuis des siècles.",
    readingMnemonicFr: "SARA comme 'ça ira' - 'Ça ira, cette assiette est parfaite!' dit le serveur du bistrot.",
  },
  {
    character: "珊",
    meaningMnemonicFr: "Le jade précieux 王 du mont 册: c'est le CORAIL! Les plongeurs de la Méditerranée française cherchant le corail rouge au large de la Corse, trésor des profondeurs.",
    readingMnemonicFr: "SAN comme 'sang' - Le corail rouge a la couleur du sang, précieux comme des rubis!",
  },
  {
    character: "將",
    meaningMnemonicFr: "Sous le toit 宀 le guerrier avec son pouce levé est un GÉNÉRAL! Comme Napoléon à Austerlitz, commandant ses troupes avec autorité, le soleil se levant sur sa victoire.",
    readingMnemonicFr: "SHOU comme 'show' - Le général fait son show sur le champ de bataille d'Austerlitz!",
  },
  {
    character: "旦",
    meaningMnemonicFr: "Le soleil 日 posé sur l'horizon 一: c'est l'AUBE! Les pêcheurs bretons qui partent à l'aube, le soleil se levant sur l'océan Atlantique, promesse d'une belle journée.",
    readingMnemonicFr: "TAN comme 'tant' - 'Tant de beauté à l'aube!' s'émerveille le peintre impressionniste.",
  },
  {
    character: "沢",
    meaningMnemonicFr: "L'eau 氵 qui s'étend sur une mesure 尺: un MARAIS! Les marais salants de Guérande où l'eau s'étale en abondance, produisant le sel précieux de la côte atlantique.",
    readingMnemonicFr: "TAKU comme 'tac' - 'Tac!' fait le paludier en récoltant le sel du marais!",
  },

  // ============== LEVEL 44 ==============
  {
    character: "養",
    meaningMnemonicFr: "Le mouton 羊 nourri avec de la nourriture 食: ÉLEVER! Comme les bergers du Larzac qui élèvent leurs brebis pour le fameux fromage Roquefort, tradition millénaire française.",
    readingMnemonicFr: "YO comme 'yo' - 'Yo, mes moutons sont bien élevés!' dit fièrement le berger aveyronnais.",
  },
  {
    character: "像",
    meaningMnemonicFr: "La personne 亻 aussi grande qu'un éléphant 象: une STATUE! Comme les statues de Notre-Dame de Paris, ces figures géantes qui gardent la cathédrale depuis des siècles.",
    readingMnemonicFr: "ZO comme 'zoo' - La statue d'éléphant au zoo de Vincennes, impressionnante et majestueuse!",
  },
  {
    character: "骨",
    meaningMnemonicFr: "Le corps 冎 et la chair 月 révèlent l'OS! Dans les catacombes de Paris, six millions de squelettes reposent, leurs os formant des motifs macabres sous la ville lumière.",
    readingMnemonicFr: "KOTSU comme 'côte' - Les côtes sont des os, évidemment! Simple comme bonjour!",
  },
  {
    character: "総",
    meaningMnemonicFr: "Le fil 糸 public 公 avec le coeur 心: le TOTAL! Comme le bilan total des impôts français, où chaque fil d'information se rejoint pour former le montant final.",
    readingMnemonicFr: "SO comme 'sot' - 'Je suis sot, j'ai oublié de calculer le total!' dit le comptable.",
  },
  {
    character: "批",
    meaningMnemonicFr: "La main 扌 qui compare 比 les choses: CRITIQUER! Les critiques gastronomiques du Guide Michelin, comparant les restaurants parisiens avec leurs stylos acérés.",
    readingMnemonicFr: "HI comme 'hi' - 'Hi hi!' rit le critique en écrivant une mauvaise critique!",
  },
  {
    character: "援",
    meaningMnemonicFr: "La main 扌 tendue vers l'ami 爰: l'AIDE! Comme la Croix-Rouge française qui tend la main aux plus démunis, tradition d'entraide depuis Henri Dunant.",
    readingMnemonicFr: "EN comme 'en' - 'En avant pour l'aide!' crie le bénévole des Restos du Coeur.",
  },
  {
    character: "秀",
    meaningMnemonicFr: "Le grain 禾 qui s'élève 乃 au-dessus des autres: EXCELLENT! Comme les grands crus de Bordeaux qui surpassent tous les autres vins, excellence viticole française.",
    readingMnemonicFr: "SHU comme 'chou' - 'C'est chou, c'est excellent!' s'exclame le critique de vin!",
  },
  {
    character: "触",
    meaningMnemonicFr: "La corne 角 et l'insecte 虫 qui se TOUCHENT! Comme un scarabée qui frôle les cornes d'un escargot dans un jardin français, contact délicat de la nature.",
    readingMnemonicFr: "SHOKU comme 'choc' - Le choc du contact quand on touche quelque chose d'inattendu!",
  },
  {
    character: "補",
    meaningMnemonicFr: "Le vêtement 衤 avec la pièce plate 甫: COMPLÉTER! Une couturière parisienne qui ajoute des compléments à une robe, perfectionnant chaque détail avec soin.",
    readingMnemonicFr: "HO comme 'oh' - 'Ho! Ce complément parfait la tenue!' dit le styliste français.",
  },
  {
    character: "貯",
    meaningMnemonicFr: "La richesse 貝 qui reste sous le toit 宁: ÉPARGNER! Comme les Français qui gardent précieusement leur argent sur leur Livret A, tradition d'épargne nationale.",
    readingMnemonicFr: "CHO comme 'chaud' - Garder son argent au chaud dans l'épargne, c'est prudent!",
  },
  {
    character: "症",
    meaningMnemonicFr: "La maladie 疒 avec le signe correct 正: un SYMPTÔME! Le médecin de famille français qui diagnostique les symptômes, tradition médicale depuis Hippocrate.",
    readingMnemonicFr: "SHO comme 'show' - Le symptôme fait son show quand on est malade, impossible à ignorer!",
  },
  {
    character: "請",
    meaningMnemonicFr: "Les paroles 言 claires et pures 青: DEMANDER! Comme un courtisan à Versailles qui demande humblement une audience au roi, avec les mots les plus choisis.",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'est une demande officielle!' dit le notaire français.",
  },
  {
    character: "越",
    meaningMnemonicFr: "Marcher 走 au-delà avec la hache 戉: DÉPASSER! Les coureurs du Tour de France qui dépassent leurs limites dans les cols des Pyrénées, exploit surhumain.",
    readingMnemonicFr: "ETSU comme 'et su' - 'Et su-r ce, je dépasse tout le monde!' crie le cycliste!",
  },
  {
    character: "編",
    meaningMnemonicFr: "Le fil 糸 aplati 扁: ÉDITER ou TRICOTER! Les maisons d'édition du Quartier Latin qui tissent les mots en livres, ou les grand-mères qui tricotent près du feu.",
    readingMnemonicFr: "HEN comme 'haine' - L'éditeur a la haine quand le manuscrit est mal écrit!",
  },
  {
    character: "賃",
    meaningMnemonicFr: "La responsabilité 任 de la richesse 貝: le LOYER! Les propriétaires parisiens qui attendent le loyer chaque mois, tradition immobilière de la capitale.",
    readingMnemonicFr: "CHIN comme 'chine' - En Chine ou en France, le loyer c'est le loyer, il faut payer!",
  },
  {
    character: "遅",
    meaningMnemonicFr: "Marcher 辶 lentement comme un rhinocéros 犀: être en RETARD! Les trains SNCF qui arrivent parfois en retard, faisant attendre les voyageurs sur les quais.",
    readingMnemonicFr: "CHI comme 'chi' - Le chi (énergie) est lent quand on est en retard, tout va mal!",
  },
  {
    character: "紹",
    meaningMnemonicFr: "Le fil 糸 qui appelle 召 pour relier: INTRODUIRE! Les présentations officielles à l'Élysée où l'on introduit les invités au Président de la République.",
    readingMnemonicFr: "SHO comme 'show' - L'introduction est un vrai show diplomatique à l'Élysée!",
  },
  {
    character: "核",
    meaningMnemonicFr: "L'arbre 木 avec le cochon 亥 qui a un coeur: le NOYAU! Comme le noyau d'une prune de Damas, au centre du fruit, essentiel et central.",
    readingMnemonicFr: "KAKU comme 'caca' - Le noyau d'avocat, on le jette, c'est comme du caca pour le compost!",
  },
  {
    character: "沖",
    meaningMnemonicFr: "L'eau 氵 au milieu 中 de tout: le LARGE! Les marins bretons qui partent au large, là où l'horizon n'est que mer et ciel, aventure maritime.",
    readingMnemonicFr: "CHU comme 'chou' - 'Mon chou, je pars au large!' dit le marin à sa femme bretonne.",
  },
  {
    character: "昭",
    meaningMnemonicFr: "Le soleil 日 qui appelle 召: c'est LUMINEUX! Comme les vitraux de la Sainte-Chapelle qui appellent la lumière du soleil, créant un spectacle divin.",
    readingMnemonicFr: "SHO comme 'show' - Le show de lumière à travers les vitraux est époustouflant!",
  },
  {
    character: "抗",
    meaningMnemonicFr: "La main 扌 qui se dresse haute 亢: RÉSISTER! Les résistants français de 1940, la main levée contre l'occupant, symbole éternel de la liberté.",
    readingMnemonicFr: "KO comme 'ko' - Résister jusqu'à mettre l'ennemi KO, voilà l'esprit français!",
  },
  {
    character: "爆",
    meaningMnemonicFr: "Le feu 火 avec la violence 暴: EXPLOSER! Les feux d'artifice du 14 juillet qui explosent au-dessus de la Tour Eiffel, célébration pyrotechnique nationale.",
    readingMnemonicFr: "BAKU comme 'back' - 'Back!' crie-t-on quand quelque chose va exploser! Recule vite!",
  },
  {
    character: "跡",
    meaningMnemonicFr: "Le pied 足 du passé 亦: une TRACE! Les traces de pas dans les grottes de Lascaux, vestiges de nos ancêtres préhistoriques dans le Sud-Ouest français.",
    readingMnemonicFr: "SEKI comme 'c'est qui' - 'C'est qui qui a laissé cette trace?' demande l'archéologue.",
  },
  {
    character: "拒",
    meaningMnemonicFr: "La main 扌 grande et massive 巨: REFUSER! Comme le videur d'une boîte de nuit parisienne qui refuse l'entrée d'un geste de sa grande main.",
    readingMnemonicFr: "KYO comme 'quoi' - 'Quoi? Tu refuses?' s'indigne le client refoulé du club parisien!",
  },
  {
    character: "稲",
    meaningMnemonicFr: "Le grain 禾 d'autrefois 旧: le PLANT DE RIZ! Même si la France cultive le riz en Camargue, ce kanji rappelle l'importance ancestrale de cette céréale.",
    readingMnemonicFr: "TO comme 'tôt' - Le riziculteur se lève tôt pour cultiver son riz en Camargue!",
  },
  {
    character: "敏",
    meaningMnemonicFr: "Chaque 毎 action rapide 攵: AGILE! Comme les joueurs de l'équipe de France de football, agiles sur le terrain, remportant la Coupe du Monde.",
    readingMnemonicFr: "BIN comme 'bien' - 'Bien joué, quelle agilité!' crie le commentateur sportif!",
  },
  {
    character: "儀",
    meaningMnemonicFr: "La personne 亻 suivant la justice 義: la CÉRÉMONIE! Les cérémonies officielles au Panthéon, où la France honore ses grands hommes avec solennité.",
    readingMnemonicFr: "GI comme 'gui' - Sous le gui, la cérémonie du Nouvel An est magique en France!",
  },
  {
    character: "掘",
    meaningMnemonicFr: "La main 扌 qui se plie 屈 pour fouiller: CREUSER! Les archéologues français creusant à Carnac, découvrant les mystères des mégalithes bretons.",
    readingMnemonicFr: "KUTSU comme 'couteau' - On creuse avec un couteau d'archéologue, délicatement!",
  },
  {
    character: "湿",
    meaningMnemonicFr: "L'eau 氵 visible 顕: c'est HUMIDE! Le climat de Bretagne, où l'humidité imprègne l'air et fait briller les hortensias bleus dans les jardins.",
    readingMnemonicFr: "SHITSU comme 'chute' - La chute de pluie rend tout humide en Bretagne!",
  },
  {
    character: "硬",
    meaningMnemonicFr: "La pierre 石 qui change 更 avec le temps: elle devient DURE! Comme le fromage Comté affiné dans les caves du Jura, plus il vieillit, plus il est dur.",
    readingMnemonicFr: "KO comme 'ko' - Cette pierre est si dure qu'elle peut mettre quelqu'un KO!",
  },
  {
    character: "狂",
    meaningMnemonicFr: "Le chien 犭 qui se croit roi 王: il est FOU! Comme un chien qui court follement après sa queue dans un jardin parisien, délire canin total.",
    readingMnemonicFr: "KYO comme 'quoi' - 'Quoi? Il est complètement fou ce chien!' s'exclame le passant.",
  },
  {
    character: "飢",
    meaningMnemonicFr: "La nourriture 食 rare, quelques miettes 几: la FAMINE! Les famines du Moyen Âge français quand les récoltes échouaient et que le peuple souffrait de la faim.",
    readingMnemonicFr: "KI comme 'qui' - 'Qui a faim pendant la famine? Tout le monde!' hélas.",
  },
  {
    character: "耐",
    meaningMnemonicFr: "L'oreille 耳 qui résiste avec mesure 寸: ENDURER! Les Poilus de Verdun qui ont enduré les bombardements, symbole de la résistance française.",
    readingMnemonicFr: "TAI comme 'taie' - La taie d'oreiller endure les nuits, même les cauchemars!",
  },
  {
    character: "駒",
    meaningMnemonicFr: "Le cheval 馬 avec la phrase 句: un PION de shogi! Comme les pièces d'un jeu d'échecs français, le cavalier bondissant sur l'échiquier stratégique.",
    readingMnemonicFr: "KOMA comme 'coma' - Le pion est en 'coma' quand il est capturé sur l'échiquier!",
  },
  {
    character: "紫",
    meaningMnemonicFr: "Le fil 糸 de cette couleur 此: VIOLET! La pourpre royale des rois de France, couleur de la noblesse depuis les mérovingiens jusqu'à Versailles.",
    readingMnemonicFr: "SHI comme 'chic' - Le violet c'est chic, couleur des rois de France!",
  },
  {
    character: "珠",
    meaningMnemonicFr: "Le jade précieux 王 vermillon 朱: une PERLE! Les perles des huîtres de Cancale, trésors rares de la mer qui ornent les bijoux des dames élégantes.",
    readingMnemonicFr: "SHU comme 'chou' - 'Mon chou, cette perle est magnifique!' dit le bijoutier.",
  },
  {
    character: "郎",
    meaningMnemonicFr: "Le bon 良 gars de la ville 阝: un jeune HOMME! Les jeunes hommes parisiens qui se promènent sur les Champs-Élysées, élégants et pleins d'avenir.",
    readingMnemonicFr: "RO comme 'rôle' - Le jeune homme joue son rôle dans la société française!",
  },
  {
    character: "跨",
    meaningMnemonicFr: "Le pied 足 qui s'étend grand 夸: ENJAMBER! Un Parisien qui enjambe une flaque d'eau sur le trottoir, évitant élégamment de se mouiller les chaussures.",
    readingMnemonicFr: "MATAGARU - 'Matador' enjambe le taureau! Imaginez le mouvement du torero!",
  },
  {
    character: "鮪",
    meaningMnemonicFr: "Le poisson 魚 qui existe 有 en abondance: le THON! Les thons de Méditerranée que les pêcheurs de Sète capturent pour les conserveries françaises.",
    readingMnemonicFr: "MAGURO comme 'ma gueule' - 'Ma gueule adore le thon!' dit le chat gourmand.",
  },
  {
    character: "霙",
    meaningMnemonicFr: "La pluie 雨 avec l'anglais 英: NEIGE FONDUE! Ce mélange typique des hivers parisiens, ni pluie ni neige, qui mouille et refroidit les promeneurs.",
    readingMnemonicFr: "MIZORE comme 'misère' - 'Quelle misère cette neige fondue!' dit le Parisien grelottant.",
  },
  {
    character: "匠",
    meaningMnemonicFr: "Dans la boîte 匚 avec la hache 斤: l'ARTISAN! Les compagnons du Tour de France, maîtres artisans qui transmettent leur savoir de génération en génération.",
    readingMnemonicFr: "SHO comme 'show' - L'artisan fait un show avec ses outils, c'est de l'art!",
  },
  {
    character: "瑚",
    meaningMnemonicFr: "Le jade précieux 王 du lac ancien 胡: le CORAIL! Le corail rouge de Corse, bijou naturel que les joailliers français transforment en parures précieuses.",
    readingMnemonicFr: "KO comme 'côte' - Le corail vit près des côtes, dans les eaux chaudes!",
  },
  {
    character: "尻",
    meaningMnemonicFr: "Le corps 尸 avec neuf 九: les FESSES! La partie du corps sur laquelle on s'assoit, que les Français appellent aussi le 'popotin' avec humour.",
    readingMnemonicFr: "KO comme 'coco' - 'Tu as mal au coco (fesses)?' demande le médecin au patient.",
  },
  {
    character: "捜",
    meaningMnemonicFr: "La main 扌 du vieux sage 叟 qui fouille: CHERCHER! Les inspecteurs de police français qui cherchent des indices, façon Maigret dans les ruelles de Paris.",
    readingMnemonicFr: "SO comme 'sot' - 'Ne sois pas sot, cherche mieux!' dit le commissaire Maigret.",
  },
  {
    character: "浄",
    meaningMnemonicFr: "L'eau 氵 qui rivalise 争 de clarté: PURE! L'eau de source d'Évian, jaillissant pure des Alpes françaises, symbole de pureté naturelle.",
    readingMnemonicFr: "JO comme 'joli' - 'Joli comme de l'eau pure!' dit le randonneur des Alpes.",
  },
  {
    character: "頂",
    meaningMnemonicFr: "Le clou 丁 sur la tête 頁: le SOMMET! Le sommet du Mont Blanc, point culminant de l'Europe occidentale, où les alpinistes français triomphent.",
    readingMnemonicFr: "CHO comme 'chaud' - 'Il fait pas chaud au sommet!' dit l'alpiniste frigorifié!",
  },

  // ============== LEVEL 45 ==============
  {
    character: "裁",
    meaningMnemonicFr: "Le vêtement 衣 que la lance 戈 découpe: COUPER ou JUGER! Le juge en robe noire qui tranche les affaires au Palais de Justice de Paris, coupant court aux débats.",
    readingMnemonicFr: "SAI comme 'c'est' - 'C'est jugé, affaire classée!' déclare le magistrat français.",
  },
  {
    character: "狭",
    meaningMnemonicFr: "Le chien 犭 coincé dans un espace 夾: c'est ÉTROIT! Les ruelles médiévales du Vieux Lyon où deux personnes peinent à se croiser, charme des quartiers anciens.",
    readingMnemonicFr: "KYO comme 'quoi' - 'Quoi? C'est trop étroit ici!' dit le touriste dans le passage.",
  },
  {
    character: "討",
    meaningMnemonicFr: "Les paroles 言 avec la mesure 寸: DISCUTER ou ATTAQUER! Les débats enflammés de l'Assemblée Nationale où les députés attaquent et discutent les projets de loi.",
    readingMnemonicFr: "TO comme 'tôt' - 'On discute tôt le matin à l'Assemblée!' dit le député matinal.",
  },
  {
    character: "獣",
    meaningMnemonicFr: "Le chien 犬 avec des traits de champ: une BÊTE sauvage! Les loups qui rôdent dans les forêts des Vosges, bêtes sauvages revenues en France.",
    readingMnemonicFr: "JU comme 'joue' - La bête sauvage montre sa joue menaçante dans la forêt!",
  },
  {
    character: "織",
    meaningMnemonicFr: "Le fil 糸 avec la force 戠: TISSER! Les soyeux de Lyon qui tissaient les plus beaux tissus du monde, tradition textile française depuis des siècles.",
    readingMnemonicFr: "SHOKU comme 'choc' - Le choc de voir un tissu si bien tissé, quelle beauté!",
  },
  {
    character: "誘",
    meaningMnemonicFr: "Les paroles 言 qui guident excellemment 秀: INVITER ou SÉDUIRE! Les guides du Louvre qui invitent les visiteurs à découvrir la Joconde avec charme.",
    readingMnemonicFr: "YU comme 'you' - 'You! Come with me!' dit le séducteur français au touriste.",
  },
  {
    character: "締",
    meaningMnemonicFr: "Le fil 糸 de l'empereur 帝: SERRER ou CONCLURE! Les traités signés et scellés à Versailles, conclusions diplomatiques qui ont changé l'Histoire.",
    readingMnemonicFr: "TEI comme 'thé' - On serre un accord autour d'un thé, façon diplomatie française!",
  },
  {
    character: "雄",
    meaningMnemonicFr: "L'oiseau 隹 avec le bras fort 厷: le MÂLE héroïque! Le coq gaulois, symbole mâle de la France, chantant fièrement au lever du soleil.",
    readingMnemonicFr: "YU comme 'you' - 'You are the man!' dit-on au héros masculin français!",
  },
  {
    character: "緊",
    meaningMnemonicFr: "Le fil 糸 lié fermement 臤: c'est SERRÉ et URGENT! Le plan Vigipirate quand la situation est tendue, urgence nationale aux rues françaises.",
    readingMnemonicFr: "KIN comme 'kin' (famille) - La famille se serre les coudes en cas d'urgence!",
  },
  {
    character: "預",
    meaningMnemonicFr: "Le préalable 予 avec la tête sage 頁: CONFIER ou DÉPOSER! Les Français qui confient leur argent à la Caisse d'Épargne, institution de confiance.",
    readingMnemonicFr: "YO comme 'yo' - 'Yo, je te confie mon argent!' dit le client à son banquier.",
  },
  {
    character: "既",
    meaningMnemonicFr: "Manger 艮 le riz qui manque 旡: c'est DÉJÀ fait! Le repas est déjà terminé, comme au restaurant français quand les assiettes sont vides.",
    readingMnemonicFr: "KI comme 'qui' - 'Qui a déjà mangé?' demande maman à table.",
  },
  {
    character: "徳",
    meaningMnemonicFr: "Le chemin 彳 avec le coeur 心 droit 直: la VERTU! Les vertus républicaines 'Liberté, Égalité, Fraternité' gravées sur les frontons des mairies.",
    readingMnemonicFr: "TOKU comme 'toc' - 'Toc toc!' La vertu frappe à la porte du coeur français!",
  },
  {
    character: "蒸",
    meaningMnemonicFr: "L'herbe 艹 avec les grains chauffés 烝: la VAPEUR! Les légumes cuits à la vapeur, technique de cuisine française légère et savoureuse.",
    readingMnemonicFr: "JO comme 'joli' - 'Joli, cette vapeur qui s'élève!' dit le chef étoilé.",
  },
  {
    character: "沿",
    meaningMnemonicFr: "L'eau 氵 qui suit le bord 㕣: LONGER! Les promeneurs qui longent la Seine à Paris, suivant le fleuve sous les ponts romantiques.",
    readingMnemonicFr: "EN comme 'en' - 'En longeant la Seine...' commence le poète parisien.",
  },
  {
    character: "承",
    meaningMnemonicFr: "Les mains tendues qui reçoivent: ACCEPTER! Le serveur du café parisien qui accepte la commande avec un léger hochement de tête professionnel.",
    readingMnemonicFr: "SHO comme 'show' - 'Show me your acceptance!' L'accord est accepté formellement!",
  },
  {
    character: "酔",
    meaningMnemonicFr: "L'alcool 酉 qui fait chanceler comme un soldat 卒: IVRE! Les convives d'un banquet bourguignon, ivres de bons vins après les nombreux toasts.",
    readingMnemonicFr: "SUI comme 'suie' - La suie dans les yeux? Non, c'est l'ivresse du bon vin!",
  },
  {
    character: "湾",
    meaningMnemonicFr: "L'eau 氵 qui se courbe 弯: une BAIE! La baie de Saint-Tropez où les yachts des stars se balancent doucement dans les eaux azuréennes.",
    readingMnemonicFr: "WAN comme 'one' - La baie numéro one de la Côte d'Azur, c'est Saint-Tropez!",
  },
  {
    character: "傾",
    meaningMnemonicFr: "La personne 亻 dont la tête 頃 penche: INCLINER! La Tour de Pise? Non, les Français restent droits, mais parfois on penche la tête pour écouter.",
    readingMnemonicFr: "KEI comme 'quai' - Sur le quai, le bateau penche avant de partir!",
  },
  {
    character: "抑",
    meaningMnemonicFr: "La main 扌 qui courbe 卬: RÉPRIMER! Les forces de l'ordre françaises qui répriment les manifestations qui dérapent sur les Champs-Élysées.",
    readingMnemonicFr: "YOKU comme 'yoke' (joug) - Le joug de la répression pèse sur les épaules!",
  },
  {
    character: "称",
    meaningMnemonicFr: "Le grain 禾 qu'on nomme ainsi 尔: APPELER ou donner un TITRE! Les titres de noblesse français: Duc, Comte, Marquis, appelés ainsi depuis des siècles.",
    readingMnemonicFr: "SHO comme 'show' - Le titre fait son show, Monsieur le Comte s'avance!",
  },
  {
    character: "控",
    meaningMnemonicFr: "La main 扌 qui reste vide 空: SE RETENIR! Se retenir de manger le dernier macaron de chez Ladurée, exercice de volonté parisien.",
    readingMnemonicFr: "KO comme 'ko' - Se retenir jusqu'à être KO de frustration!",
  },
  {
    character: "慎",
    meaningMnemonicFr: "Le coeur 忄 vraiment 真 attentif: PRUDENT! Traverser la rue parisienne avec prudence, les voitures ne s'arrêtent pas toujours pour les piétons.",
    readingMnemonicFr: "SHIN comme 'chine' - En Chine comme en France, sois prudent en traversant!",
  },
  {
    character: "駐",
    meaningMnemonicFr: "Le cheval 馬 qui reste comme maître 主: STATIONNER! Les voitures garées le long des boulevards parisiens, stationnement toujours difficile dans la capitale.",
    readingMnemonicFr: "CHU comme 'chou' - 'Mon chou, trouve une place pour stationner!' dit la Parisienne.",
  },
  {
    character: "鋭",
    meaningMnemonicFr: "Le métal 金 qui s'échange 兌: AIGU et POINTU! Les couteaux Laguiole, lames aiguës et pointues, fierté de la coutellerie française.",
    readingMnemonicFr: "EI comme 'aïe' - 'Aïe!' Attention, c'est pointu comme un Laguiole!",
  },
  {
    character: "茂",
    meaningMnemonicFr: "L'herbe 艹 qui prospère 戊: LUXURIANT! Les jardins de Monet à Giverny, végétation luxuriante inspirant les plus belles toiles impressionnistes.",
    readingMnemonicFr: "MO comme 'mot' - Aucun mot ne décrit cette végétation luxuriante de Giverny!",
  },
  {
    character: "隣",
    meaningMnemonicFr: "La colline 阝 avec le riz scintillant 粦: le VOISIN! Les voisins de palier parisiens qui se croisent dans l'escalier avec un petit bonjour.",
    readingMnemonicFr: "RIN comme 'rien' - 'Rien à signaler chez le voisin!' dit la concierge curieuse.",
  },
  {
    character: "拠",
    meaningMnemonicFr: "La main 扌 avec le lieu 処: une BASE ou s'APPUYER! Le quartier général des armées à Balard, base stratégique de la défense française.",
    readingMnemonicFr: "KYO comme 'quoi' - 'Quoi? C'est ta base d'opérations?' demande le général.",
  },
  {
    character: "挑",
    meaningMnemonicFr: "La main 扌 qui bondit comme un signe 兆: DÉFIER! Les chevaliers français qui lançaient leur gant pour défier leurs adversaires en duel.",
    readingMnemonicFr: "CHO comme 'chaud' - Le défi est chaud, on se bat pour l'honneur!",
  },
  {
    character: "揚",
    meaningMnemonicFr: "La main 扌 vers le soleil qui se lève 昜: ÉLEVER ou FRIRE! Les frites françaises dorées qui s'élèvent de l'huile bouillante, croustillantes à souhait.",
    readingMnemonicFr: "YO comme 'yo' - 'Yo, élève ces frites!' dit le chef de la friterie du Nord!",
  },
  {
    character: "柄",
    meaningMnemonicFr: "L'arbre 木 avec l'intérieur 丙: un MANCHE ou MOTIF! Les manches des parapluies Cherbourg, élégants accessoires français contre la pluie normande.",
    readingMnemonicFr: "HEI comme 'hey' - 'Hey, quel beau manche de parapluie!' dit le dandy.",
  },
  {
    character: "珍",
    meaningMnemonicFr: "Le jade 王 aux cheveux particuliers 㐱: RARE et PRÉCIEUX! Les truffes du Périgord, rares et précieuses comme des diamants noirs de la gastronomie.",
    readingMnemonicFr: "CHIN comme 'chine' - En Chine ou en France, les truffes sont rares et chères!",
  },
  {
    character: "斉",
    meaningMnemonicFr: "Les lignes parallèles bien alignées: ÉGAL et UNIFORME! Les soldats de la Garde Républicaine, alignés uniformément devant l'Élysée, perfection militaire.",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'est égal, c'est parfait!' dit le général inspectant les troupes.",
  },
  {
    character: "炉",
    meaningMnemonicFr: "Le feu 火 dans la porte 戸: un FOUR! Le four à pain du boulanger français, où les baguettes dorent à la perfection chaque matin.",
    readingMnemonicFr: "RO comme 'rôt' - Le rôt cuit dans le four du boucher traditionnel!",
  },
  {
    character: "砲",
    meaningMnemonicFr: "La pierre 石 qui enveloppe 包: un CANON! Les canons des Invalides à Paris, témoins des guerres napoléoniennes et de la gloire militaire française.",
    readingMnemonicFr: "HO comme 'oh' - 'Oh!' s'exclame-t-on quand le canon tonne aux Invalides!",
  },
  {
    character: "盆",
    meaningMnemonicFr: "La division 分 sur le plat 皿: un PLATEAU! Le plateau de fromages français, divisé en portions de Brie, Comté et Roquefort, tradition du repas.",
    readingMnemonicFr: "BON comme 'bon' - 'Bon, ce plateau de fromages!' dit le gourmet français!",
  },
  {
    character: "椅",
    meaningMnemonicFr: "L'arbre 木 étrange 奇: une CHAISE! Les chaises des cafés parisiens, en bois et en rotin, où l'on s'assoit pour regarder passer les gens.",
    readingMnemonicFr: "I comme 'y' - 'Y a-t-il une chaise libre?' demande le client au garçon de café.",
  },
  {
    character: "鍵",
    meaningMnemonicFr: "Le métal 金 pour construire 建: une CLÉ! Les clés des chambres du château de Chambord, ouvrant les portes de l'Histoire de France.",
    readingMnemonicFr: "KEN comme 'quand' - 'Quand trouverai-je la clé du mystère?' se demande l'enquêteur.",
  },
  {
    character: "溶",
    meaningMnemonicFr: "L'eau 氵 de la vallée 谷: FONDRE et DISSOUDRE! Le fromage raclette qui fond délicieusement dans les stations de ski des Alpes françaises.",
    readingMnemonicFr: "YO comme 'yo' - 'Yo, ça fond!' dit le skieur devant sa raclette fumante!",
  },
  {
    character: "輝",
    meaningMnemonicFr: "La lumière 光 du char militaire 軍: BRILLER! La Tour Eiffel qui brille de mille feux chaque soir, scintillant au-dessus de Paris endormi.",
    readingMnemonicFr: "KI comme 'qui' - 'Qui brille ainsi?' La Tour Eiffel, pardi!",
  },
  {
    character: "抽",
    meaningMnemonicFr: "La main 扌 qui tire le centre 由: EXTRAIRE! Le vigneron bordelais qui extrait le jus des raisins pour faire le meilleur vin du monde.",
    readingMnemonicFr: "CHU comme 'chou' - 'Mon chou, extrait le bouchon!' dit l'oenologue au sommelier.",
  },
  {
    character: "淡",
    meaningMnemonicFr: "L'eau 氵 avec deux flammes 炎: PÂLE et FADE! Les couleurs pastel des maisons de l'île de Ré, tons pâles et doux du littoral atlantique.",
    readingMnemonicFr: "TAN comme 'tant' - 'Tant pâle, cette couleur!' dit le peintre impressionniste.",
  },
  {
    character: "勘",
    meaningMnemonicFr: "La force 力 avec le profond 甚: l'INTUITION! Le sixième sens des enquêteurs français, cette intuition qui résout les mystères les plus complexes.",
    readingMnemonicFr: "KAN comme 'quand' - 'Quand l'intuition parle, il faut écouter!' dit le détective.",
  },
  {
    character: "漫",
    meaningMnemonicFr: "L'eau 氵 qui coule librement 曼: LIBRE, aussi MANGA! Les dessinateurs de BD français à Angoulême, créant librement leurs histoires illustrées.",
    readingMnemonicFr: "MAN comme 'man' - 'Man, c'est libre comme un manga!' dit le fan de BD.",
  },
  {
    character: "奮",
    meaningMnemonicFr: "Le grand 大 oiseau 隹 dans le champ 田: S'EFFORCER et STIMULER! Les agriculteurs français qui s'efforcent de produire le meilleur blé de Beauce.",
    readingMnemonicFr: "FUN comme 'fun' - 'C'est fun de s'efforcer!' dit l'agriculteur motivé.",
  },
  {
    character: "晶",
    meaningMnemonicFr: "Trois soleils 日 brillants: un CRISTAL! Les lustres en cristal de Baccarat qui illuminent les palais et les opéras de France depuis des siècles.",
    readingMnemonicFr: "SHO comme 'show' - Le cristal de Baccarat fait un show lumineux au plafond!",
  },
  {
    character: "絡",
    meaningMnemonicFr: "Le fil 糸 de chaque côté 各: S'EMMÊLER ou CONTACTER! Les fils de téléphone anciens qui s'emmêlaient, avant les portables qui nous contactent partout.",
    readingMnemonicFr: "RAKU comme 'rack' - Le rack de fils s'emmêle, impossible de contacter quelqu'un!",
  },
  {
    character: "詰",
    meaningMnemonicFr: "Les paroles 言 chanceuses 吉: REMPLIR et SERRER! Les conserves de sardines de Bretagne, remplies et serrées dans leurs boîtes métalliques.",
    readingMnemonicFr: "KITSU comme 'kits' - Les kits sont remplis et serrés dans la boîte!",
  },
  {
    character: "弦",
    meaningMnemonicFr: "L'arc 弓 avec le mystère 玄: la CORDE! Les cordes du violon de Stradivarius joué à l'Opéra de Paris, vibrant sous l'archet du virtuose.",
    readingMnemonicFr: "GEN comme 'gêne' - La corde gêne le doigt du guitariste débutant!",
  },
  {
    character: "眉",
    meaningMnemonicFr: "Au-dessus de l'œil 目: le SOURCIL! Les sourcils expressifs des actrices françaises, arcs parfaits qui parlent autant que les mots.",
    readingMnemonicFr: "BI comme 'bi' (bisou) - Un bisou sur le sourcil, geste tendre français!",
  },
  {
    character: "卑",
    meaningMnemonicFr: "Le signe bas avec le champ 田: HUMBLE et BAS! L'humilité des moines de l'abbaye de Cîteaux, vivant simplement dans la prière et le travail.",
    readingMnemonicFr: "HI comme 'hi' - 'Hi!' rit humblement le moine, sans prétention.",
  },
  {
    character: "杖",
    meaningMnemonicFr: "L'arbre 木 de grande taille 丈: une CANNE! La canne de Balzac, accessoire indispensable de l'écrivain parisien flânant sur les boulevards.",
    readingMnemonicFr: "JO comme 'joli' - 'Jolie canne!' dit-on à l'élégant monsieur au chapeau.",
  },
  {
    character: "浜",
    meaningMnemonicFr: "L'eau 氵 près du soldat 兵: la PLAGE! Les plages du débarquement en Normandie, où les soldats ont donné leur vie pour la liberté de la France.",
    readingMnemonicFr: "HIN comme 'hein' - 'Hein, quelle belle plage!' dit le touriste à Deauville.",
  },
];

async function main() {
  console.log("Starting mnemonic improvements for levels 43-45...\n");

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
