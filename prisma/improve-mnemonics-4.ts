import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Improved mnemonics batch 4 - Levels 31-40
// Rich French storytelling with cultural references

const improvements = [
  // Level 31
  {
    character: "石",
    meaningMnemonicFr: "Les menhirs de Carnac en Bretagne ! Une falaise 厂 avec une bouche 口 grande ouverte de stupeur devant ces PIERRES millénaires. Obélix y taille ses menhirs. Chaque PIERRE raconte une histoire celte !",
    readingMnemonicFr: "ISHI sonne comme 'il chit' - 'Il chit sur la PIERRE !' (pardon, mais c'est mémorable). SEKI comme 'sec' - une PIERRE bien SÈCHE au soleil !",
  },
  {
    character: "岩",
    meaningMnemonicFr: "Le Mont-Saint-Michel ! Une montagne 山 faite de PIERRES 石 massives. Ce ROCHER mythique se dresse fièrement dans la baie. Les pèlerins grimpent ce ROCHER sacré depuis des siècles. Un monument de ROCHE française !",
    readingMnemonicFr: "IWA sonne comme 'il va' - 'Il VA escalader ce ROCHER !' GAN comme 'gant' - tu portes des GANTS pour grimper le ROCHER !",
  },
  {
    character: "菜",
    meaningMnemonicFr: "Le potager de Villandry ! Des herbes 艹 qu'on cueille 采 pour faire un LÉGUME délicieux. Un chef étoilé prépare un PLAT avec ces LÉGUMES du terroir. La gastronomie française commence au potager !",
    readingMnemonicFr: "NA comme 'nah' - 'NAH, ce LÉGUME est trop bon !' SAI comme 'sais' - 'Je SAIS cuisiner ce LÉGUME à la perfection !'",
  },
  {
    character: "散",
    meaningMnemonicFr: "Les feuilles mortes qui se DISPERSENT sur les Champs-Élysées ! Le vent d'automne frappe 攵 le lin 林. Les touristes voient les feuilles ÉPARPILLÉES partout. Yves Montand chante pendant que tout se DISPERSE !",
    readingMnemonicFr: "CHIRU comme 'chi-rue' - les pétales se DISPERSENT dans la RUE ! SAN comme 'sans' - 'SANS ce vent, rien ne se DISPERSERAIT !'",
  },
  {
    character: "泥",
    meaningMnemonicFr: "Les tranchées de Verdun ! L'eau 氵 et les frères 尼 soldats pataugeaient dans la BOUE. Cette BOUE collante qui engloutissait tout. Un souvenir terrible de l'histoire française !",
    readingMnemonicFr: "DORO sonne comme 'Dorothée' - Dorothée est tombée dans la BOUE ! DEI comme 'dé' - lance le DÉ dans la BOUE !",
  },
  {
    character: "炎",
    meaningMnemonicFr: "L'incendie de Notre-Dame ! Deux feux 火火 superposés créent une FLAMME monstrueuse. Le monde entier pleurait devant ces FLAMMES. La FLAMME dévoratrice qui a failli tout détruire !",
    readingMnemonicFr: "HONOO sonne comme 'oh no' - 'OH NOO, la FLAMME !' EN comme 'en' - 'EN feu, la FLAMME danse !'",
  },
  {
    character: "巣",
    meaningMnemonicFr: "Un NID de cigognes en Alsace ! Sur l'arbre 木 avec des fruits 果, les cigognes construisent leur NID. C'est un porte-bonheur ! Le NID domine les toits des villages alsaciens !",
    readingMnemonicFr: "SU comme 'su' (vu) - 'T'as VU ce NID énorme ?' SOU comme 'sou' - 'Pas un SOU pour déloger ce NID !'",
  },
  {
    character: "棒",
    meaningMnemonicFr: "La baguette magique d'Astérix ! Du bois 木 qu'on offre 奉 pour faire un BÂTON. Panoramix prépare sa potion avec ce BÂTON. Une BARRE de bois qui donne une force surhumaine !",
    readingMnemonicFr: "BOU comme 'bout' - 'Un BOUT de BÂTON pour la soupe !' Le son 'BOU' rappelle directement BÂTON !",
  },
  {
    character: "伸",
    meaningMnemonicFr: "Un mime sur le Pont des Arts qui S'ÉTEND ! Une personne 亻 avec sa ceinture 申 fait semblant de tirer un élastique. Il ÉTEND ses bras à l'infini. Le public est émerveillé par cette illusion !",
    readingMnemonicFr: "NOBIRU comme 'no-bi-rue' - 'NO, la rue s'ÉTEND trop loin !' SHIN comme 'chine' - 'La muraille de CHINE S'ÉTEND sur des milliers de km !'",
  },

  // Level 32
  {
    character: "宇",
    meaningMnemonicFr: "Thomas Pesquet sous le toit 宀 de la station spatiale ! Le trait en dessous représente l'immensité de l'UNIVERS. Il regarde la Terre depuis l'espace. L'UNIVERS appartient aux explorateurs français !",
    readingMnemonicFr: "U comme 'ou' - 'OÙ s'arrête l'UNIVERS ?' Le son U évoque l'immensité !",
  },
  {
    character: "祖",
    meaningMnemonicFr: "Au cimetière du Père-Lachaise ! L'autel 礻 et le groupe 且 d'ANCÊTRES reposent ensemble. Les familles viennent honorer leurs GRANDS-PARENTS. Les tombes racontent l'histoire des ANCÊTRES français !",
    readingMnemonicFr: "SO comme 'sot' - 'Seul un SOT oublie ses ANCÊTRES !'",
  },
  {
    character: "液",
    meaningMnemonicFr: "Le vin qui coule dans les caves de Bordeaux ! L'eau 氵 de la nuit 夜 fermente pour créer ce LIQUIDE précieux. Un FLUIDE rouge rubis qui fait la fierté de la France !",
    readingMnemonicFr: "EKI comme 'et qui' - 'ET QUI a renversé ce LIQUIDE ?' Le son rappelle l'écoulement !",
  },
  {
    character: "月",
    meaningMnemonicFr: "Le croissant de LUNE au-dessus de Paris ! Le boulanger pétrit son croissant en regardant la LUNE. Cette forme parfaite inspire la pâtisserie française. Un croissant de LUNE, un croissant au beurre !",
    readingMnemonicFr: "TSUKI sonne comme 'tout ski' - 'TOUT le monde fait du SKI sous la LUNE !' GETSU comme 'get-su' - 'GET, regarde la LUNE !'",
  },
  {
    character: "汚",
    meaningMnemonicFr: "La Seine polluée avant les Jeux de Paris ! L'eau 氵 qu'on compare 亏 aux égouts. C'est SALE ! On POLLUE ce fleuve depuis des siècles. Mais la France nettoie tout pour les athlètes !",
    readingMnemonicFr: "KITANAI comme 'qui t'a nait' - 'QUI T'A fait NAÎTRE dans ce quartier SALE ?' O comme 'oh' - 'OH c'est SALE !'",
  },
  {
    character: "銭",
    meaningMnemonicFr: "Les pièces d'or des Templiers ! Le métal 金 et les lances 戔 gardaient l'ARGENT du trésor. Ces PIÈCES financèrent les croisades. L'ARGENT des Templiers, un mystère français !",
    readingMnemonicFr: "ZENI comme 'Zénith' - 'Au ZÉNITH de sa gloire, il comptait son ARGENT !' SEN comme 'cent' - 'CENT PIÈCES d'ARGENT !'",
  },
  {
    character: "飼",
    meaningMnemonicFr: "À la ferme normande ! On mange 食 selon les ordres 司 pour ÉLEVER les animaux. La fermière NOURRIT ses vaches qui produiront le camembert. ÉLEVER du bétail, c'est l'art normand !",
    readingMnemonicFr: "KAU comme 'cou' - 'Le COU de la vache qu'on ÉLÈVE !' SHI comme 'chi' - 'CHI, le bruit de l'animal qu'on NOURRIT !'",
  },
  {
    character: "欲",
    meaningMnemonicFr: "Louis XIV et son DÉSIR de grandeur ! La vallée 谷 et le VOULOIR 欠 de bâtir Versailles. Son DÉSIR était infini. Il VOULAIT tout, et il l'a eu ! Le Roi-Soleil incarnait le DÉSIR absolu !",
    readingMnemonicFr: "HOSHII comme 'oh-shi' - 'OH, je VEUX ça !' YOKU comme 'yoga' - 'Le YOGA calme mes DÉSIRS !'",
  },
  {
    character: "党",
    meaningMnemonicFr: "L'Assemblée nationale ! En haut 尚 les idéaux, en bas 儿 les frères militants du PARTI. Les FACTIONS politiques françaises débattent passionnément. Chaque PARTI défend sa vision !",
    readingMnemonicFr: "TOU comme 'tout' - 'TOUT le PARTI est mobilisé !'",
  },
  {
    character: "星",
    meaningMnemonicFr: "Le Petit Prince sur son ÉTOILE ! Le soleil 日 qui naît 生 dans le ciel nocturne. Saint-Exupéry regardait les ÉTOILES depuis son avion. Chaque ÉTOILE est un monde à explorer !",
    readingMnemonicFr: "HOSHI comme 'oh-shi' - 'OH regarde cette ÉTOILE !' SEI comme 'c'est' - 'C'EST une belle ÉTOILE !'",
  },
  {
    character: "宙",
    meaningMnemonicFr: "Ariane décolle vers le COSMOS ! Sous le toit 宀 du hangar, au milieu 由 de l'espace. La fusée française part explorer le COSMOS. Le centre spatial de Kourou ouvre les portes du COSMOS !",
    readingMnemonicFr: "CHUU comme 'chou' - 'Mon petit CHOU explore le COSMOS !'",
  },
  {
    character: "卵",
    meaningMnemonicFr: "Les ŒUFS mimosa de mamie ! Deux formes ovales côte à côte. Ces ŒUFS mayonnaise sont incontournables aux repas de famille. Un ŒUF parfait à la française !",
    readingMnemonicFr: "TAMAGO sonne comme 'ta ma go' - 'TA MAnière de cuire l'ŒUF, c'est GO !' RAN comme 'rang' - 'Le premier RANG des ŒUFS au marché !'",
  },
  {
    character: "衛",
    meaningMnemonicFr: "La Garde républicaine à l'Élysée ! Le chemin 行 et l'équilibre 韋 pour la DÉFENSE du président. Cette PROTECTION est solennelle. Les gardes assurent la DÉFENSE de la République !",
    readingMnemonicFr: "EI comme 'et' - 'ET voici la DÉFENSE du palais !'",
  },

  // Level 33
  {
    character: "肺",
    meaningMnemonicFr: "Les POUMONS d'un fumeur de Gauloises ! La chair 月 et le marché 市 où on vendait ces cigarettes. Mais attention à tes POUMONS ! Aujourd'hui, les Français protègent mieux leurs POUMONS !",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE, mes POUMONS me font mal !'",
  },
  {
    character: "銀",
    meaningMnemonicFr: "L'argenterie de Christofle ! Le métal 金 dur 艮 qu'on polit. Les couverts en ARGENT brillent sur les tables françaises. L'ARGENT de famille se transmet de génération en génération !",
    readingMnemonicFr: "GIN comme 'gin' - 'Un GIN servi dans une coupe en ARGENT !'",
  },
  {
    character: "揺",
    meaningMnemonicFr: "La Tour Eiffel qui SECOUE par grand vent ! La main 扌 sous le toit 宀 qui balance. Quand Gustave a construit la tour, il savait qu'elle devait pouvoir SE SECOUER pour résister !",
    readingMnemonicFr: "YURERU comme 'you-ré-rue' - 'YOU, la RUE SE SECOUE !' YOU comme 'you' - 'HEY YOU, ça SECOUE !'",
  },
  {
    character: "銅",
    meaningMnemonicFr: "La Statue de la Liberté en CUIVRE ! Le métal 金 semblable 同 au bronze. Ce cadeau de la France est fait de CUIVRE. Le CUIVRE vert-de-gris symbolise l'amitié franco-américaine !",
    readingMnemonicFr: "DOU comme 'doux' - 'Le CUIVRE est DOUX au toucher !'",
  },
  {
    character: "紙",
    meaningMnemonicFr: "Les imprimeurs de Lyon et leur PAPIER ! Le fil 糸 et la famille 氏 des papetiers. Le PAPIER français était le meilleur d'Europe. L'imprimerie a révolutionné le monde grâce au PAPIER !",
    readingMnemonicFr: "KAMI comme 'calme-i' - 'CALME-toi et écris sur ce PAPIER !' SHI comme 'chi' - 'CHI, le son du PAPIER qu'on déchire !'",
  },
  {
    character: "宣",
    meaningMnemonicFr: "La DÉCLARATION des droits de l'homme ! Sous le toit 宀 de l'Assemblée, on dit 宣 les mots qui changent le monde. PROCLAMER la liberté ! DÉCLARER l'égalité !",
    readingMnemonicFr: "SEN comme 'sens' - 'SENS le poids de cette DÉCLARATION !'",
  },
  {
    character: "糖",
    meaningMnemonicFr: "Le SUCRE des betteraves de Picardie ! Le riz 米 doux 唐 qu'on transforme. Napoléon a développé le SUCRE de betterave. Le SUCRE français parfume les pâtisseries !",
    readingMnemonicFr: "TOU comme 'tout' - 'TOUT le SUCRE pour mon café !'",
  },
  {
    character: "鉄",
    meaningMnemonicFr: "La Tour Eiffel en FER ! Le métal 金 qui perd 失 sa rouille. 7 300 tonnes de FER assemblées par Gustave. Ce FER est devenu le symbole de Paris !",
    readingMnemonicFr: "TETSU comme 'têtu' - 'TÊTU comme du FER !'",
  },
  {
    character: "納",
    meaningMnemonicFr: "Les impôts de Bercy ! Le fil 糸 de l'intérieur 内 du portefeuille. Il faut PAYER, FOURNIR sa contribution. 'Rendez à César ce qui est à César' - PAYEZ vos impôts !",
    readingMnemonicFr: "NOU comme 'nous' - 'NOUS devons PAYER !' NATTOU - le plat qu'on PAIE cher !",
  },
  {
    character: "操",
    meaningMnemonicFr: "Le pilote d'Airbus qui MANIPULE les commandes ! La main 扌 parmi les arbres 喿 d'instruments. Il OPÈRE l'avion avec précision. MANIPULER un A380, c'est l'excellence française !",
    readingMnemonicFr: "SOU comme 'sous' - 'SOUS mes mains, je MANIPULE tout !' AYATSURU comme 'ayatsu-rue' - 'Je MANIPULE dans la RUE !'",
  },

  // Level 34
  {
    character: "吐",
    meaningMnemonicFr: "Après une dégustation de vin trop généreuse ! La bouche 口 et la terre 土 se rencontrent. On VOMIT, on CRACHE ! Même les plus grands œnologues peuvent avoir ce problème !",
    readingMnemonicFr: "HAKU comme 'hack' - 'HACK, je VOMIS !' TO comme 'trop' - 'TROP bu, je CRACHE !'",
  },
  {
    character: "射",
    meaningMnemonicFr: "Le tir à l'arc aux Jeux de Paris ! Le corps 身 et le pouce 寸 qui LANCE la flèche. On TIRE avec précision olympique. Les archers français TIRENT vers la victoire !",
    readingMnemonicFr: "SHA comme 'chat' - 'Le CHAT bondit comme une flèche qu'on TIRE !' IRU - 'Tu TIRES ou tu pointes ?'",
  },
  {
    character: "糸",
    meaningMnemonicFr: "Les soieries de Lyon ! Ce FIL de soie précieux tissé par des artisans. Le FIL qui habillait les rois de France. Un FIL d'or vaut une fortune !",
    readingMnemonicFr: "ITO comme 'il tôt' - 'IL tisse TÔT le matin son FIL !' SHI comme 'chi' - 'CHI, le bruit du FIL qui se tend !'",
  },
  {
    character: "絹",
    meaningMnemonicFr: "Les robes de SOIE de Dior ! Le fil 糸 du roi 君. La SOIE française habillait les reines. Chaque robe de SOIE est une œuvre d'art de la haute couture !",
    readingMnemonicFr: "KINU comme 'qui nu' - 'QUI est NU sous sa SOIE ?' KEN comme 'Ken' - 'KEN (de Barbie) porte de la SOIE !'",
  },
  {
    character: "源",
    meaningMnemonicFr: "La SOURCE de la Seine à Bourgogne ! L'eau 氵 et l'original 原. La SOURCE du fleuve qui traverse Paris. Retourner à la SOURCE, c'est comprendre l'ORIGINE de tout !",
    readingMnemonicFr: "GEN comme 'gène' - 'Dans mes GÈNES, l'ORIGINE de ma famille !' MINAMOTO comme 'mina-moto' - 'MINA (tous) cherchent la SOURCE !'",
  },
  {
    character: "綿",
    meaningMnemonicFr: "Les champs de COTON des colonies françaises ! Le fil 糸 du chapeau 帛. Le COTON doux qui a fait la richesse des marchands. Le COTON égyptien reste le plus prisé !",
    readingMnemonicFr: "WATA comme 'ouate' - 'La OUATE de COTON pour se démaquiller !' MEN comme 'main' - 'Dans ma MAIN, du COTON doux !'",
  },
  {
    character: "毛",
    meaningMnemonicFr: "La moustache de Dalí exposée à Paris ! Le POIL qui dépasse, frisé et excentrique. Les POILS de ce pinceau peignent des chefs-d'œuvre. La LAINE des moutons du Larzac !",
    readingMnemonicFr: "KE comme 'quai' - 'Un POIL sur le QUAI du métro !' MOU comme 'mou' - 'Ce POIL est tout MOU !'",
  },
  {
    character: "皮",
    meaningMnemonicFr: "Le cuir de Maroquinerie Hermès ! La PEAU tannée avec soin. Cette PEAU devient un sac à main de luxe. La PEAU d'un crocodile vaut des milliers d'euros !",
    readingMnemonicFr: "KAWA comme 'cave-a' - 'Dans la CAVE, la PEAU sèche !' HI comme 'hic' - 'HIC, j'ai gratté ma PEAU !'",
  },

  // Level 35
  {
    character: "酒",
    meaningMnemonicFr: "Le vin de Bordeaux, roi des ALCOOLS ! L'eau 氵 et la jarre 酉 qui fermente. Le SAKÉ japonais, mais surtout le vin français ! L'ALCOOL qui accompagne la gastronomie française !",
    readingMnemonicFr: "SAKE comme 'saquer' - 'Il s'est fait SAQUER pour avoir bu trop de SAKÉ !' SHU comme 'chou' - 'Un CHOU au SAKÉ !'",
  },
  {
    character: "己",
    meaningMnemonicFr: "Le 'Je pense donc je suis' de Descartes ! Le SOI qui se courbe sur lui-même pour réfléchir. SOI-MÊME est le premier sujet de la philosophie française !",
    readingMnemonicFr: "ONORE comme 'honore' - 'HONORE-toi TOI-MÊME !' KO comme 'co' - 'CO-naître SOI-MÊME !'",
  },
  {
    character: "語",
    meaningMnemonicFr: "L'Académie française qui préserve la LANGUE ! Les paroles 言 qui m'appartiennent 吾. PARLER le français correctement est un art. La LANGUE de Molière rayonne dans le monde !",
    readingMnemonicFr: "GO comme 'goth' - 'Les GOTH PARLENT leur propre LANGUE !' KATARU - 'KATA-rue où on PARLE !'",
  },
  {
    character: "塩",
    meaningMnemonicFr: "Le SEL de Guérande ! La terre 土 et le récipient 監 des marais salants. Ce SEL gris est un trésor breton. Le SEL qui relève tous les plats français !",
    readingMnemonicFr: "SHIO comme 'schiop' - 'SCHLOP, du SEL dans la soupe !' EN comme 'hein' - 'HEIN, encore du SEL ?'",
  },
  {
    character: "麦",
    meaningMnemonicFr: "Les champs de BLÉ de la Beauce ! Le BLÉ doré ondule sous le vent. La baguette naît de ce BLÉ. Le BLÉ français nourrit le monde entier !",
    readingMnemonicFr: "MUGI comme 'mou-gui' - 'Le BLÉ MOU pour le pain !' BAKU comme 'back' - 'BACK to BLÉ, retour aux sources !'",
  },
  {
    character: "米",
    meaningMnemonicFr: "Le RIZ de Camargue ! Les grains de RIZ dispersés comme une étoile. Le seul RIZ cultivé en France métropolitaine. Le RIZ camarguais accompagne la gardiane de taureau !",
    readingMnemonicFr: "KOME comme 'comme' - 'COMME du RIZ parfait !' MAI comme 'mais' - 'MAIS non, c'est du RIZ, pas du blé !'",
  },
  {
    character: "終",
    meaningMnemonicFr: "Le mot 'FIN' au cinéma français ! Le fil 糸 de l'hiver 冬 qui se coupe. La FIN d'un film de la Nouvelle Vague. Tout se TERMINE, même les plus belles histoires !",
    readingMnemonicFr: "SHUU comme 'chou' - 'C'est la FIN, mon CHOU !' OWARU - 'Oh-va-rue, la rue se TERMINE !'",
  },
  {
    character: "滞",
    meaningMnemonicFr: "Les embouteillages sur le périphérique ! L'eau 氵 qui STAGNE, bloquée 帯. Le trafic RESTE immobile des heures. STAGNER dans les bouchons, le quotidien parisien !",
    readingMnemonicFr: "TAI comme 'taille' - 'Ma TAILLE STAGNE, je ne grandis plus !' TODOKOORU - 'To-do qui STAGNE !'",
  },
  {
    character: "沸",
    meaningMnemonicFr: "L'eau du thé qui BOUT chez Mariage Frères ! L'eau 氵 et l'arc 弗 de vapeur qui s'élève. L'eau BOUT à gros bouillons. Le thé parfait exige une eau qui vient de BOUILLIR !",
    readingMnemonicFr: "WAKU comme 'waouh-ku' - 'WAOUH, ça BOUT !' FUTSU comme 'foot-su' - 'Après le FOOT, l'eau BOUT pour le thé !'",
  },
  {
    character: "昼",
    meaningMnemonicFr: "La pause déjeuner sacrée des Français ! Le soleil 日 qui mesure 尺 l'heure de MIDI. À MIDI, on ferme les bureaux pour déjeuner. La JOURNÉE s'arrête pour bien manger !",
    readingMnemonicFr: "HIRU comme 'il rue' - 'IL RUE vers le restaurant à MIDI !' CHUU comme 'chou' - 'Un CHOU-fleur pour le déjeuner de MIDI !'",
  },

  // Level 36
  {
    character: "依",
    meaningMnemonicFr: "L'enfant qui DÉPEND de sa mère ! Une personne 亻 et son vêtement 衣 protecteur. On DÉPEND DE ceux qu'on aime. DÉPENDRE, c'est humain !",
    readingMnemonicFr: "I comme 'y' - 'J'Y DÉPENDS de toi !' E comme 'eh' - 'EH, je DÉPENDS DE toi !'",
  },
  {
    character: "青",
    meaningMnemonicFr: "Le BLEU des Bleus de France ! La vie 生 avec la lune 月 crée ce BLEU profond. Le maillot BLEU de l'équipe de France. BLEU comme le ciel de Provence !",
    readingMnemonicFr: "AO comme 'oh' - 'OH, quel BLEU magnifique !' SEI comme 'c'est' - 'C'EST BLEU, c'est beau !'",
  },
  {
    character: "廃",
    meaningMnemonicFr: "Les friches industrielles du Nord ! Sous le toit 广 qui se développe 發, tout est ABANDONNÉ. ABOLIR les vieilles usines. La France ABANDONNE son passé industriel !",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE, c'est ABANDONNÉ !' SUTARERU - 'Sut-are-u, c'est ABOLI !'",
  },
  {
    character: "組",
    meaningMnemonicFr: "Les GROUPES de résistants pendant la guerre ! Le fil 糸 et l'ancêtre 且 qui ASSEMBLENT les troupes. Le GROUPE des maquisards. S'ASSEMBLER pour résister !",
    readingMnemonicFr: "KUMI comme 'qui mi' - 'QUI fait partie de mon GROUPE ?' SO comme 'sot' - 'Le SOT est sorti du GROUPE !'",
  },
  {
    character: "凍",
    meaningMnemonicFr: "Le lac d'Annecy GELÉ en hiver ! La glace 冫 et l'est 東 où le froid vient. L'eau GÈLE sous le froid alpin. Tout est GELÉ dans les montagnes françaises !",
    readingMnemonicFr: "KOORU comme 'cool-rue' - 'La rue est COOL car GELÉE !' TOU comme 'tout' - 'TOUT est GELÉ !'",
  },
  {
    character: "超",
    meaningMnemonicFr: "Le Concorde qui DÉPASSE le mur du son ! Courir 走 et appeler 召 au-delà des limites. SUPER sonique ! DÉPASSER tout ce qui existe !",
    readingMnemonicFr: "CHOU comme 'chou' - 'C'est SUPER CHOU !' KOERU - 'Ko-é-rue, DÉPASSER la rue !'",
  },
  {
    character: "混",
    meaningMnemonicFr: "Le pot-au-feu qui MÉLANGE tous les légumes ! L'eau 氵 d'hier 昆. On MÉLANGE les saveurs. La cuisine française MÉLANGE les traditions !",
    readingMnemonicFr: "MAZERU comme 'ma-ze-rue' - 'MA RUE est un MÉLANGE de cultures !' KON comme 'con' - 'Quel CON de tout MÉLANGER !'",
  },
  {
    character: "津",
    meaningMnemonicFr: "Le PORT de Marseille ! L'eau 氵 et le pinceau 聿 qui dessine la côte. Le PORT le plus important de France. Les navires mouillent dans ce PORT millénaire !",
    readingMnemonicFr: "TSU comme 'tout su' - 'J'ai TOUT SU sur ce PORT !' SHIN comme 'chine' - 'De CHINE, les bateaux arrivent au PORT !'",
  },
  {
    character: "旧",
    meaningMnemonicFr: "Le vieux Lyon et ses traboules ! Le un 丨 et le jour 日 d'AUTREFOIS. L'ANCIEN quartier médiéval. Les VIEILLES pierres racontent l'histoire !",
    readingMnemonicFr: "KYUU comme 'qui-u' - 'QUI connaît l'ANCIEN temps ?' FURUI - 'Fou-rue-i, la VIEILLE rue !'",
  },

  // Level 37
  {
    character: "酸",
    meaningMnemonicFr: "Le vinaigre de cidre normand, si ACIDE ! L'alcool 酉 et le paquet 夋 qui fermente. L'ACIDE du citron. Le goût ACIDE qui fait grimacer !",
    readingMnemonicFr: "SUI comme 'suie' - 'La SUIE est ACIDE !' SAN comme 'sans' - 'SANS ACIDE, pas de goût !'",
  },
  {
    character: "兆",
    meaningMnemonicFr: "Les SIGNES du zodiaque à l'Observatoire de Paris ! Les deux qui courent 兆 représentent un TRILLION d'étoiles. Un SIGNE dans le ciel. Le budget de l'État en TRILLIONS !",
    readingMnemonicFr: "CHOU comme 'chou' - 'CHOU, c'est un bon SIGNE !' KIZASU - 'Ki-za-su, le SIGNE apparaît !'",
  },
  {
    character: "戻",
    meaningMnemonicFr: "RETOUR vers le passé à Versailles ! La porte 戸 et le grand 大 château. REVENIR à l'époque de Louis XIV. RETOURNER dans le temps en visitant ce palais !",
    readingMnemonicFr: "MODORU comme 'mode-oh-rue' - 'La MODE RETOURNE dans la RUE !' REI comme 'raie' - 'La RAIE RETOURNE à la mer !'",
  },
  {
    character: "臨",
    meaningMnemonicFr: "FAIRE FACE au jury du bac ! L'œil 臣 et le précieux 品 moment. ASSISTER à l'examen. Les élèves FONT FACE à leur destin !",
    readingMnemonicFr: "RIN comme 'rien' - 'RIEN ne peut te faire perdre, FAIS FACE !' NOZOMU - 'No-zo-mu, FAIRE FACE au défi !'",
  },
  {
    character: "狙",
    meaningMnemonicFr: "Le chasseur qui VISE le sanglier en Sologne ! Le chien 犭 et le groupe 且 de proies. CIBLER sa cible. VISER avec précision !",
    readingMnemonicFr: "NERAU comme 'né-raw' - 'Né pour VISER juste !' SO comme 'sot' - 'Le SOT a raté sa CIBLE !'",
  },
  {
    character: "遠",
    meaningMnemonicFr: "La Côte d'Azur si LOIN de Paris ! Marcher 辶 avec le vêtement 袁. C'est LOIN mais ça vaut le voyage. La distance est LONGUE mais le soleil attend !",
    readingMnemonicFr: "TOOI comme 'to-oui' - 'OUI, c'est très LOIN !' EN comme 'hein' - 'HEIN, c'est si LOIN ?'",
  },
  {
    character: "募",
    meaningMnemonicFr: "L'armée française qui RECRUTE ! L'herbe 艹 et la force 募 de rassemblement. RASSEMBLER les volontaires. RECRUTER pour la Légion étrangère !",
    readingMnemonicFr: "BO comme 'beau' - 'Un BEAU jour pour RECRUTER !' TSUNORU - 'Tsu-no-rue, RECRUTER dans la RUE !'",
  },

  // Level 38
  {
    character: "飛",
    meaningMnemonicFr: "L'Airbus A380 qui VOLE dans le ciel ! Les ailes qui s'élèvent vers l'infini. VOLER comme un oiseau. L'aéronautique française fait VOLER le monde !",
    readingMnemonicFr: "TOBU comme 'to-bu' - 'TO the sky, on VOLE !' HI comme 'hiii' - 'HIII, on VOLE haut !'",
  },
  {
    character: "絵",
    meaningMnemonicFr: "Les PEINTURES du Louvre ! Le fil 糸 qui réunit 会 les couleurs. Chaque IMAGE raconte une histoire. La PEINTURE impressionniste est née en France !",
    readingMnemonicFr: "E comme 'et' - 'ET voici la PEINTURE !' KAI comme 'quai' - 'Sur le QUAI, une belle IMAGE !'",
  },
  {
    character: "南",
    meaningMnemonicFr: "Le SUD de la France, terre de soleil ! Dix 十 dans l'enclos 冂, chaleur concentrée. Le SUD avec ses cigales et sa lavande. Direction le SUD pour les vacances !",
    readingMnemonicFr: "MINAMI comme 'mina-mi' - 'MINA (tous) partent au SUD !' NAN comme 'nan' - 'NAN, je préfère le SUD !'",
  },
  {
    character: "灰",
    meaningMnemonicFr: "Les CENDRES de la cheminée en Auvergne ! Le feu 火 de la falaise 厂. La couleur GRISE des volcans éteints. Les CENDRES volcaniques fertilisent la terre !",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE, des CENDRES dans l'œil !' KAI comme 'quai' - 'Le QUAI est GRIS de CENDRES !'",
  },
  {
    character: "双",
    meaningMnemonicFr: "Les jumeaux de Monaco, une PAIRE royale ! Deux mains 又又 identiques. La PAIRE parfaite. DOUBLE de tout, DOUBLE bonheur !",
    readingMnemonicFr: "SOU comme 'sou' - 'Pas un SOU pour acheter cette PAIRE !' FUTA comme 'foot-a' - 'Au FOOT, jouer en DOUBLE !'",
  },
  {
    character: "込",
    meaningMnemonicFr: "Les touristes qui ENTRENT dans le métro ! Marcher 辶 vers l'intérieur 入. S'INCLURE dans la foule. ENTRER dans le flux parisien !",
    readingMnemonicFr: "KOMU comme 'comme' - 'COMME tout le monde, j'ENTRE !'",
  },
  {
    character: "北",
    meaningMnemonicFr: "Le NORD de la France, terre des Ch'tis ! Deux personnes dos à dos, fuyant le froid. Le NORD industriel et chaleureux. Direction le NORD pour les moules-frites !",
    readingMnemonicFr: "KITA comme 'qui t'a' - 'QUI T'A dit que le NORD est froid ?' HOKU comme 'hockey' - 'Au NORD, on joue au HOCKEY sur glace !'",
  },
  {
    character: "扱",
    meaningMnemonicFr: "MANIPULER les fromages affinés ! La main 扌 et le liquide 及. TRAITER avec soin. MANIPULER un camembert parfait demande de l'expertise !",
    readingMnemonicFr: "ATSUKAU comme 'at-su-cow' - 'MANIPULER la vache (cow) avec soin !'",
  },
  {
    character: "線",
    meaningMnemonicFr: "La LIGNE de métro parisienne ! Le fil 糸 et la source 泉. Une LIGNE qui traverse la ville. 14 LIGNES pour explorer Paris !",
    readingMnemonicFr: "SEN comme 'sens' - 'Dans quel SENS va cette LIGNE ?'",
  },
  {
    character: "併",
    meaningMnemonicFr: "FUSIONNER deux régions françaises ! La personne 亻 et ensemble 并. COMBINER les départements. La France FUSIONNE ses régions pour plus d'efficacité !",
    readingMnemonicFr: "HEI comme 'hé' - 'HÉ, on COMBINE nos forces !' AWASERU - 'Awa-se-rue, FUSIONNER dans la RUE !'",
  },
  {
    character: "刊",
    meaningMnemonicFr: "PUBLIER Le Monde ou Le Figaro ! Le sec 干 et le couteau 刂 de l'imprimerie. L'ÉDITION quotidienne. PUBLIER les nouvelles chaque jour !",
    readingMnemonicFr: "KAN comme 'quand' - 'QUAND sera PUBLIÉ l'article ?'",
  },
  {
    character: "致",
    meaningMnemonicFr: "CAUSER la Révolution française ! Aller 至 et frapper 攵. ATTEINDRE son but. CAUSER des changements historiques !",
    readingMnemonicFr: "CHI comme 'chi' - 'CHI, ça a CAUSÉ des dégâts !' ITASU - 'I-ta-su, CAUSER du tort !'",
  },
  {
    character: "娠",
    meaningMnemonicFr: "La GROSSESSE à la maternité des Lilas ! La femme 女 et le temps 辰 qui passe. La GROSSESSE, neuf mois d'attente. Une GROSSESSE heureuse !",
    readingMnemonicFr: "SHIN comme 'chine' - 'En CHINE ou en France, la GROSSESSE dure 9 mois !'",
  },
  {
    character: "妊",
    meaningMnemonicFr: "Être ENCEINTE, porter la vie ! La femme 女 qui porte 壬. ENCEINTE et rayonnante. La GROSSESSE est un miracle !",
    readingMnemonicFr: "NIN comme 'non' - 'NON, je ne suis pas ENCEINTE... si, en fait !'",
  },
  {
    character: "需",
    meaningMnemonicFr: "Le BESOIN de pain quotidien ! La pluie 雨 et demander 而. La DEMANDE de baguettes ne faiblit jamais. Les Français ont BESOIN de leur pain !",
    readingMnemonicFr: "JU comme 'joue' - 'Ma JOUE a BESOIN de ce croissant !'",
  },
  {
    character: "東",
    meaningMnemonicFr: "Le soleil qui se lève à l'EST ! Le soleil 日 dans l'arbre 木. L'EST où le jour commence. L'Alsace, à l'EST de la France !",
    readingMnemonicFr: "HIGASHI comme 'il gâche' - 'IL ne GÂCHE rien à l'EST !' TOU comme 'tout' - 'TOUT vient de l'EST !'",
  },
  {
    character: "西",
    meaningMnemonicFr: "Le soleil couchant à l'OUEST ! L'oiseau qui se couche dans son nid. L'OUEST où le jour finit. La Bretagne, à l'OUEST de la France !",
    readingMnemonicFr: "NISHI comme 'ni-chi' - 'NI ici NI là, mais à l'OUEST !' SEI comme 'c'est' - 'C'EST à l'OUEST !'",
  },

  // Level 39
  {
    character: "上",
    meaningMnemonicFr: "Monter au sommet de l'Arc de Triomphe ! La ligne au-dessus de la base. En HAUT, la vue sur Paris. Toujours viser plus HAUT !",
    readingMnemonicFr: "UE comme 'ouais' - 'OUAIS, c'est en HAUT !' JOU comme 'joue' - 'La JOUE levée vers le HAUT !'",
  },
  {
    character: "内",
    meaningMnemonicFr: "L'INTÉRIEUR des palais royaux ! La personne 人 dans l'enclos 冂. L'INTÉRIEUR décoré de dorures. Pénétrer à l'INTÉRIEUR de l'histoire !",
    readingMnemonicFr: "UCHI comme 'ouch-i' - 'OUCH, c'est beau à l'INTÉRIEUR !' NAI comme 'nez' - 'Mon NEZ sent l'INTÉRIEUR du four !'",
  },
  {
    character: "緑",
    meaningMnemonicFr: "Le VERT des jardins de Giverny ! Le fil 糸 et l'eau 彔 qui créent cette couleur. Le VERT des nymphéas de Monet. La France est VERTE de forêts !",
    readingMnemonicFr: "MIDORI comme 'mi-do-ri' - 'MI DO RÉ, la musique du VERT !' RYOKU comme 'rio-ku' - 'À RIO, le VERT des tropiques !'",
  },
  {
    character: "御",
    meaningMnemonicFr: "L'HONORABLE président de la République ! Le pas 彳 et arrêter 卸. CONTRÔLER avec dignité. L'HONORABLE fonction suprême !",
    readingMnemonicFr: "GO comme 'go' - 'GO, l'HONORABLE président arrive !' O/ON comme 'on' - 'ON respecte l'HONORABLE tradition !'",
  },
  {
    character: "甲",
    meaningMnemonicFr: "L'ARMURE des chevaliers de France ! La carapace 甲 qui protège. PREMIER en protection. L'ARMURE des croisés !",
    readingMnemonicFr: "KOU comme 'coup' - 'Un COUP sur l'ARMURE !' KAN comme 'quand' - 'QUAND porterai-je cette ARMURE ?'",
  },
  {
    character: "祉",
    meaningMnemonicFr: "Le BIEN-ÊTRE de la Sécurité sociale française ! L'autel 礻 et le sol 止 stable. Le BONHEUR garanti. Le BIEN-ÊTRE pour tous, fierté française !",
    readingMnemonicFr: "SHI comme 'chi' - 'CHI, le son du BONHEUR !'",
  },
  {
    character: "下",
    meaningMnemonicFr: "Descendre dans le métro parisien ! La ligne en BAS de la base. Le BAS de la ville, sous terre. Tout en BAS, le métro gronde !",
    readingMnemonicFr: "SHITA comme 'chita' - 'Le guépard CHITA court vers le BAS !' KA comme 'cas' - 'En CAS de pluie, descends en BAS !'",
  },
  {
    character: "雇",
    meaningMnemonicFr: "EMPLOYER des ouvriers chez Renault ! La porte 户 et l'oiseau 隹 qui travaille. ENGAGER du personnel. EMPLOYER les talents français !",
    readingMnemonicFr: "YATOU comme 'ya-tout' - 'Y'A TOUT pour EMPLOYER quelqu'un !' KO comme 'ko' - 'KO après avoir trop TRAVAILLÉ !'",
  },
  {
    character: "片",
    meaningMnemonicFr: "Un MORCEAU de camembert ! Le bois 片 coupé en tranches. Un CÔTÉ du fromage. Ce MORCEAU fond dans la bouche !",
    readingMnemonicFr: "KATA comme 'quatre' - 'QUATRE MORCEAUX de fromage !' HEN comme 'hein' - 'HEIN, un MORCEAU pour moi ?'",
  },
  {
    character: "右",
    meaningMnemonicFr: "Tourner à DROITE sur les Champs-Élysées ! La main 又 et la bouche 口 qui indique. À DROITE, l'Arc de Triomphe. La DROITE politique française !",
    readingMnemonicFr: "MIGI comme 'mi-gui' - 'Le gui est à DROITE du sapin !' U comme 'ou' - 'OÙ ? À DROITE !'",
  },
  {
    character: "群",
    meaningMnemonicFr: "Un GROUPE de touristes au Louvre ! Le roi 君 et le mouton 羊 qui suivent. Le TROUPEAU devant la Joconde. Un GROUPE fasciné par Mona Lisa !",
    readingMnemonicFr: "GUN comme 'gueun' - 'GUEUN, quel GROUPE énorme !' MURERU - 'Mu-ré-rue, le TROUPEAU dans la RUE !'",
  },
  {
    character: "仙",
    meaningMnemonicFr: "L'ERMITE des montagnes des Pyrénées ! La personne 亻 et la montagne 山. L'IMMORTEL solitaire. L'ERMITE médite en altitude !",
    readingMnemonicFr: "SEN comme 'sens' - 'L'ERMITE a le SENS de la vie !'",
  },
  {
    character: "充",
    meaningMnemonicFr: "REMPLIR son verre de champagne ! Le haut 亠 et les jambes 儿 qui dansent de joie. SUFFIRE à son bonheur. Le champagne REMPLIT les coupes !",
    readingMnemonicFr: "JUU comme 'joue' - 'Ma JOUE est REMPLIE de champagne !' ATERU - 'A-té-rue, REMPLIR la RUE de joie !'",
  },
  {
    character: "左",
    meaningMnemonicFr: "Tourner à GAUCHE vers Montmartre ! La main 工 qui travaille à GAUCHE. À GAUCHE, le Sacré-Cœur. La GAUCHE politique française !",
    readingMnemonicFr: "HIDARI comme 'il a ri' - 'IL A RI quand je lui ai dit à GAUCHE !' SA comme 'ça' - 'C'est par là, à GAUCHE, ÇA !'",
  },
  {
    character: "免",
    meaningMnemonicFr: "EXEMPTER d'impôts comme les nobles d'antan ! Le lapin 兔 qui s'échappe. ÉVITER les taxes. EXEMPTER quelqu'un de ses obligations !",
    readingMnemonicFr: "MEN comme 'main' - 'Lève la MAIN pour être EXEMPTÉ !' MANUKARERU - 'Manu-ka-ré-rue, ÉVITER dans la RUE !'",
  },

  // Level 40
  {
    character: "外",
    meaningMnemonicFr: "L'EXTÉRIEUR des remparts de Carcassonne ! Le soir 夕 et la divination 卜. À l'EXTÉRIEUR de la cité. Dehors, à l'EXTÉRIEUR des murs protecteurs !",
    readingMnemonicFr: "SOTO comme 'sot-eau' - 'Le SOT verse son EAU à l'EXTÉRIEUR !' GAI comme 'gai' - 'Je suis GAI d'être à l'EXTÉRIEUR !'",
  },
  {
    character: "殖",
    meaningMnemonicFr: "Les vignes qui MULTIPLIENT leurs raisins ! Le reste 歹 et le droit 直 à la croissance. CROÎTRE chaque année. Les cépages se MULTIPLIENT en France !",
    readingMnemonicFr: "SHOKU comme 'choc' - 'Quel CHOC de voir la vigne MULTIPLIER ses fruits !' FUERU - 'Feu-é-rue, ça CROÎT dans la RUE !'",
  },
  {
    character: "褒",
    meaningMnemonicFr: "LOUER le talent d'un chef étoilé ! Le vêtement 衣 qu'on protège 保. COMPLIMENTER l'excellence. LOUER le génie français de la cuisine !",
    readingMnemonicFr: "HOU comme 'oh' - 'OH, je te LOUE pour ce plat !' HOMERU - 'Home-rue, COMPLIMENTER dans la RUE !'",
  },
  {
    character: "萎",
    meaningMnemonicFr: "Les fleurs qui SE FLÉTRISSENT au marché ! La plante 艹 et la femme 委 fatiguée. SE FLÉTRIR sous le soleil. Les roses SE FLÉTRISSENT sans eau !",
    readingMnemonicFr: "SHIBOMU comme 'chi-beau-mu' - 'Ce qui était BEAU SE FLÉTRIT !' I comme 'y' - 'J'Y vois les fleurs SE FLÉTRIR !'",
  },
  {
    character: "振",
    meaningMnemonicFr: "SECOUER le cocktail comme un barman parisien ! La main 扌 qui se lève 辰. AGITER le shaker. SECOUER avec style français !",
    readingMnemonicFr: "FURU comme 'fou-rue' - 'Un FOU SECOUE tout dans la RUE !' SHIN comme 'chine' - 'En CHINE aussi on SECOUE les dés !'",
  },
  {
    character: "唱",
    meaningMnemonicFr: "CHANTER à l'Opéra Garnier ! La bouche 口 et le jour 昌 de gloire. RÉCITER les grands airs. CHANTER comme une diva française !",
    readingMnemonicFr: "SHOU comme 'show' - 'Quel SHOW de CHANTER !' TONAERU - 'To-na-é-rue, CHANTER dans la RUE !'",
  },
  {
    character: "続",
    meaningMnemonicFr: "Le Tour de France qui CONTINUE jour après jour ! Le fil 糸 qui vend 売 l'effort. CONTINUER malgré la fatigue. SUIVRE l'étape jusqu'au bout !",
    readingMnemonicFr: "ZOKU comme 'zo-coup' - 'Zo, encore un COUP, ça CONTINUE !' TSUZUKU - 'Tsu-zu-ku, CONTINUER à avancer !'",
  },
  {
    character: "表",
    meaningMnemonicFr: "La SURFACE du lac d'Annecy ! La robe 衣 exposée 王. La SURFACE de l'eau miroir. À la SURFACE, les reflets des montagnes !",
    readingMnemonicFr: "OMOTE comme 'oh-moté' - 'OH, quelle belle SURFACE !' HYOU comme 'yo' - 'YO, regarde la SURFACE !'",
  },
  {
    character: "裏",
    meaningMnemonicFr: "L'ENVERS du décor à Versailles ! Le village 里 sous la robe 衣. L'ENVERS des apparences. Derrière les dorures, l'ENVERS de la cour !",
    readingMnemonicFr: "URA comme 'hura' - 'HOURA, découvre l'ENVERS !' RI comme 'riz' - 'Le RIZ a un ENVERS aussi !'",
  },
  {
    character: "孝",
    meaningMnemonicFr: "La PIÉTÉ FILIALE dans les familles françaises ! Le vieux 耂 et l'enfant 子. Respecter ses parents. La PIÉTÉ FILIALE, valeur universelle !",
    readingMnemonicFr: "KOU comme 'coup' - 'Un COUP de fil à mes parents, c'est la PIÉTÉ FILIALE !'",
  },
  {
    character: "吹",
    meaningMnemonicFr: "SOUFFLER sur les bougies d'anniversaire ! La bouche 口 qui manque 欠 d'air. SOUFFLER fort. Le mistral SOUFFLE en Provence !",
    readingMnemonicFr: "FUKU comme 'fou-cou' - 'Le FOU SOUFFLE dans son COU !' SUI comme 'suisse' - 'En SUISSE, le vent SOUFFLE fort !'",
  },
  {
    character: "結",
    meaningMnemonicFr: "ATTACHER le nœud papillon avant le gala ! Le fil 糸 chanceux 吉. CONCLURE un mariage. ATTACHER les liens du bonheur !",
    readingMnemonicFr: "KETSU comme 'quet-su' - 'QUET-su, c'est ATTACHÉ !' MUSUBU - 'Mu-su-bu, ATTACHER le bu-quet !'",
  },
];

async function main() {
  console.log("Improving mnemonics batch 4 - Levels 31-40...");

  let updated = 0;
  for (const imp of improvements) {
    await prisma.kanji.updateMany({
      where: { character: imp.character },
      data: {
        meaningMnemonicFr: imp.meaningMnemonicFr,
        readingMnemonicFr: imp.readingMnemonicFr,
      },
    });
    updated++;
    process.stdout.write(`\rUpdated ${updated}/${improvements.length}`);
  }

  console.log(`\nImproved ${improvements.length} kanji mnemonics!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
