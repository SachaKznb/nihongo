import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Improved mnemonics for kanji in levels 41-45 with weak mnemonics
// Using French cultural references, vivid imagery, and phonetic links

const improvedKanji = [
  // Level 41
  {
    character: "拾",
    meaningMnemonicFr:
      "La main 扌 ramasse ce qui est en synthèse 合 sur le sol. Tel un clochard parisien qui RAMASSE les pièces tombées près de la fontaine des Innocents, chaque centime compte. DIX pièces ramassées font un euro!",
    readingMnemonicFr: "SHUU comme 'chou' - tu RAMASSES des choux au marché. HIROU - 'il roue' en ramassant.",
  },
  {
    character: "若",
    meaningMnemonicFr:
      "L'herbe 艹 de droite 右 représente la JEUNESSE. Comme les jeunes pousses du printemps dans les jardins de Versailles, tout ce qui est JEUNE est frais et plein de vie. SI tu es JEUNE, profite!",
    readingMnemonicFr: "WAKAI comme 'ouais, quai' - les JEUNES traînent sur les quais de Seine. JAKU - 'Jacques' est JEUNE.",
  },
  {
    character: "経",
    meaningMnemonicFr:
      "Le fil 糸 qui passe légèrement 巠 à travers le temps. GÉRER une entreprise française demande de PASSER par de nombreuses épreuves. Les fils du temps tissent l'expérience de ceux qui GÈRENT!",
    readingMnemonicFr: "KEI comme 'quai' - GÉRER le trafic sur le quai. HERU - 'l'heure' PASSE vite.",
  },
  {
    character: "汁",
    meaningMnemonicFr:
      "L'eau 氵 avec dix 十 ingrédients forme un JUS savoureux. La SOUPE à l'oignon gratinée des bistrots parisiens, ce JUS réconfortant qui réchauffe les nuits froides. Un bouillon de dix légumes!",
    readingMnemonicFr: "SHIRU comme 'si rue' - le JUS coule dans la rue. JUU - 'jus' tout simplement!",
  },
  {
    character: "甘",
    meaningMnemonicFr:
      "Ce caractère ressemble à une bouche qui goûte quelque chose de SUCRÉ. Les macarons de Ladurée, si DOUX et SUCRÉS! La pâtisserie française excelle dans l'art du SUCRÉ qui fond sur la langue.",
    readingMnemonicFr: "AMAI comme 'à maie' - le pétrin (maie) plein de pâte SUCRÉE. KAN - 'quand' c'est SUCRÉ, c'est bon!",
  },
  {
    character: "鉱",
    meaningMnemonicFr:
      "Le métal 金 qui s'étend large 広. Les MINES de charbon du Nord de la France, le MINERAI extrait par des générations de mineurs courageux. Le MINERAI de fer de Lorraine a forgé l'industrie française!",
    readingMnemonicFr: "KOU comme 'coup' - un COUP de pioche dans la MINE pour extraire le MINERAI.",
  },
  {
    character: "至",
    meaningMnemonicFr:
      "Une flèche qui ATTEINT sa cible, l'EXTRÊME précision. Comme les archers médiévaux au château de Chambord qui devaient ATTEINDRE leur but. Aller jusqu'à l'EXTRÊME de ses capacités!",
    readingMnemonicFr: "SHI comme 'si' - SI tu veux ATTEINDRE ton but. ITARU - 'il tare' quand il ATTEINT la limite.",
  },
  {
    character: "凄",
    meaningMnemonicFr:
      "La glace 冫 et la femme 妻 créent quelque chose de TERRIBLE. Une tempête de neige INCROYABLE sur les Alpes françaises! C'est TERRIBLE comme c'est beau, INCROYABLE comme la nature peut être féroce!",
    readingMnemonicFr: "SUGOI comme 'su-go-i' - c'est INCROYABLE! SEI - 'c'est' TERRIBLE!",
  },
  {
    character: "喧",
    meaningMnemonicFr:
      "La bouche 口 qui proclame 宣 fort. Le BRUIT des marchés de Provence, les vendeurs qui crient leurs prix! Cette QUERELLE BRUYANTE typiquement française où tout le monde parle en même temps!",
    readingMnemonicFr: "KEN comme 'qu'on' - QU'ON se taise, c'est trop BRUYANT! YAKAMASHII - 'y'a qu'à ma chie' dans le BRUIT.",
  },
  {
    character: "嘩",
    meaningMnemonicFr:
      "La bouche 口 avec la magnificence 華 du BRUIT. Le VACARME du carnaval de Nice, les pétards et les fanfares! Ce BRUIT festif qui remplit les rues de joie et de couleurs!",
    readingMnemonicFr: "KA comme 'cas' - en CAS de VACARME, bouchez-vous les oreilles! Le BRUIT du carnaval.",
  },
  {
    character: "投",
    meaningMnemonicFr:
      "La main 扌 qui frappe avec lance 殳 pour LANCER. Les joueurs de pétanque à Marseille qui LANCENT leurs boules avec précision. LANCER le cochonnet et viser juste, voilà l'art provençal!",
    readingMnemonicFr: "TOU comme 'tout' - TOUT le monde LANCE sa boule. NAGERU - 'n'a gère' le temps avant de LANCER.",
  },
  {
    character: "蕾",
    meaningMnemonicFr:
      "L'herbe 艹 avec le tonnerre 雷 annonce les BOURGEONS du printemps. Les roses de Grasse en BOURGEON, prêtes à éclore pour créer les plus beaux parfums. Chaque BOURGEON est une promesse de beauté!",
    readingMnemonicFr: "TSUBOMI comme 'tsu-bo-mi' - le BOURGEON qui attend. RAI - 'raie' de lumière sur le BOURGEON.",
  },
  {
    character: "鯉",
    meaningMnemonicFr:
      "Le poisson 魚 du village 里. La CARPE koï des jardins japonais de Paris au parc de Bagatelle. Cette CARPE majestueuse qui nage dans les bassins, symbole de persévérance et de force!",
    readingMnemonicFr: "KOI comme 'quoi' - QUOI, une CARPE! RI - 'riz' que mange la CARPE.",
  },
  {
    character: "膳",
    meaningMnemonicFr:
      "La chair 月 avec le bon 善 pour un PLATEAU-REPAS parfait. Le plateau de fromages français servi avec élégance! Ce PLATEAU-REPAS gastronomique digne des grands restaurants étoilés de Lyon!",
    readingMnemonicFr: "ZEN comme 'zen' - reste ZEN devant ce beau PLATEAU-REPAS. La sérénité du repas japonais.",
  },
  {
    character: "琥",
    meaningMnemonicFr:
      "Le jade 王 du tigre 虎 forme l'AMBRE précieux. L'AMBRE de la Baltique exposé au Musée d'Histoire Naturelle de Paris, cette résine fossile dorée qui emprisonne le temps depuis des millions d'années!",
    readingMnemonicFr: "KO comme 'corps' - l'AMBRE préserve les corps d'insectes depuis des millions d'années.",
  },
  {
    character: "鎮",
    meaningMnemonicFr:
      "Le métal 金 qui est vrai 真 pour CALMER les esprits. La cloche de Notre-Dame qui CALME les fidèles. CALMER une foule en colère demande la force et la vérité d'une cloche qui résonne!",
    readingMnemonicFr: "CHIN comme 'chine' - la porcelaine de CHINE CALME par sa beauté. SHIZUMERU - 'si zu mer' CALME.",
  },
  {
    character: "調",
    meaningMnemonicFr:
      "Les paroles 言 autour du cercle 周 pour ENQUÊTER sur tout. Le commissaire Maigret qui ENQUÊTE dans les bistrots parisiens. Le TON de l'interrogatoire, l'art d'ENQUÊTER à la française!",
    readingMnemonicFr: "CHOU comme 'chou' - ENQUÊTER sur qui a mangé le dernier CHOU. SHIRABERU - 'si la beurre' en ENQUÊTANT.",
  },
  {
    character: "亡",
    meaningMnemonicFr:
      "Ce caractère simple montre quelque chose qui s'échappe, qui DISPARAÎT. Les fantômes des châteaux de la Loire, les MORTS qui hantent encore les couloirs. DISPARU mais jamais oublié dans la mémoire française!",
    readingMnemonicFr: "BOU comme 'bout' - au BOUT de la vie, on MEURT. MOU - 'mou' comme un corps sans vie.",
  },

  // Level 42
  {
    character: "課",
    meaningMnemonicFr:
      "Les paroles 言 avec les fruits 果 du travail forment une SECTION. Chaque LEÇON de français est une SECTION à maîtriser. Au ministère, chaque SECTION a sa spécialité et ses responsabilités!",
    readingMnemonicFr: "KA comme 'cas' - chaque CAS est une LEÇON. Cette SECTION traite ce CAS précis.",
  },
  {
    character: "非",
    meaningMnemonicFr:
      "Deux ailes qui s'opposent signifient NON, c'est une FAUTE! 'Non, non et non!' dit le Français en croisant les bras. Cette négation française si catégorique, ce refus qui ne laisse aucun doute!",
    readingMnemonicFr: "HI comme 'hi' - 'HI HI' dit celui qui rit d'une FAUTE. NON, ce n'est pas drôle!",
  },
  {
    character: "捕",
    meaningMnemonicFr:
      "La main 扌 qui nourrit 甫 pour ATTRAPER. Les gendarmes de Saint-Tropez qui ATTRAPENT les voleurs. CAPTURER avec dextérité, comme un chat qui ATTRAPE une souris dans les rues de Paris!",
    readingMnemonicFr: "HO comme 'oh' - 'OH' je t'ai ATTRAPÉ! TSUKAMAERU - 'tsu qu'à m'a' CAPTURÉ.",
  },
  {
    character: "怪",
    meaningMnemonicFr:
      "Le cœur 忄 et le saint 圣 créent l'ÉTRANGE. Les mystères des catacombes de Paris, si ÉTRANGES et MYSTÉRIEUX! Ces ossements qui forment des motifs MYSTÉRIEUX sous la ville lumière!",
    readingMnemonicFr: "KAI comme 'quai' - quelque chose d'ÉTRANGE sur le QUAI. AYASHII - 'ah y'a chi' MYSTÉRIEUX.",
  },
  {
    character: "菓",
    meaningMnemonicFr:
      "L'herbe 艹 avec les fruits 果 forme la CONFISERIE. Les bonbons de Vichy, ces pastilles célèbres depuis Napoléon III! La CONFISERIE française, un art sucré transmis de génération en génération!",
    readingMnemonicFr: "KA comme 'cas' - en CAS de faim, mange une CONFISERIE. Les bonbons KA-ramel!",
  },
  {
    character: "汗",
    meaningMnemonicFr:
      "L'eau 氵 qui sort par le sec 干 représente la SUEUR. La TRANSPIRATION des cyclistes du Tour de France dans les cols des Pyrénées! Cette SUEUR qui coule sous l'effort, témoignage du travail accompli!",
    readingMnemonicFr: "KAN comme 'quand' - QUAND tu travailles dur, tu as de la SUEUR. ASE - 'assez' de TRANSPIRATION!",
  },
  {
    character: "給",
    meaningMnemonicFr:
      "Le fil 糸 avec ce qui est uni 合 pour FOURNIR. Le SALAIRE que l'entreprise FOURNIT à ses employés. FOURNIR le nécessaire, comme la cantine qui FOURNIT les repas aux écoliers français!",
    readingMnemonicFr: "KYUU comme 'cul' - bouger son CUL pour recevoir son SALAIRE. TAMAU - 'ta maux' FOURNIS.",
  },
  {
    character: "逆",
    meaningMnemonicFr:
      "La marche 辶 qui monte à l'envers 屰 est INVERSE. Remonter les Champs-Élysées à contresens, quelle idée OPPOSÉE! L'INVERSE de ce qui est normal, comme conduire à gauche en Angleterre!",
    readingMnemonicFr: "GYAKU comme 'jac' - JACQUES fait l'INVERSE de tout le monde. SAKA - 'sa cas' est OPPOSÉ.",
  },
  {
    character: "閉",
    meaningMnemonicFr:
      "La porte 門 avec le talent 才 bien caché qui FERME. Les portes du Louvre qui se FERMENT à 18h! FERMER boutique à la française, avec le rideau de fer qui descend sur les commerces parisiens!",
    readingMnemonicFr: "HEI comme 'hé' - 'HÉ, on FERME!' SHIMERU - 'chimère' derrière la porte FERMÉE.",
  },
  {
    character: "砂",
    meaningMnemonicFr:
      "La pierre 石 peu 少 nombreuse forme le SABLE. Les plages de sable fin de la Côte d'Azur! Ce SABLE doré de Saint-Tropez où les célébrités prennent le soleil. Le SABLE qui glisse entre les doigts!",
    readingMnemonicFr: "SA comme 'ça' - ÇA c'est du SABLE fin! SUNA - 'su-na' le SABLE chaud.",
  },
  {
    character: "拝",
    meaningMnemonicFr:
      "Les mains 手 jointes avec le bas 卑 pour PRIER humblement. VÉNÉRER la Vierge Marie à Lourdes où des millions de pèlerins viennent PRIER. L'acte humble de PRIER dans les cathédrales gothiques!",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE' dit celui qui a mal aux genoux de PRIER. OGAMU - 'oh gamin' qui PRIE.",
  },
  {
    character: "般",
    meaningMnemonicFr:
      "Le bateau 舟 qui frappe 殳 de manière GÉNÉRALE. En GÉNÉRAL, les ferries traversent la Manche sans problème! Le mode de transport GÉNÉRAL entre Douvres et Calais depuis des siècles!",
    readingMnemonicFr: "HAN comme 'an' - depuis des ANS, c'est GÉNÉRAL. Le transport GÉNÉRAL par bateau.",
  },
  {
    character: "棋",
    meaningMnemonicFr:
      "Le bois 木 de son 其 propre jeu d'ÉCHECS. Les parties d'ÉCHECS au Jardin du Luxembourg! Les retraités parisiens qui jouent aux ÉCHECS sous les marronniers, concentrés sur leurs pions de bois!",
    readingMnemonicFr: "KI comme 'qui' - QUI veut jouer aux ÉCHECS? Les pions sur l'échiquier.",
  },
  {
    character: "到",
    meaningMnemonicFr:
      "Le couteau 刂 qui va 至 jusqu'au but pour ARRIVER. Le TGV qui ARRIVE à destination à l'heure, la précision française! ATTEINDRE sa destination finale, comme ARRIVER à bon port après un long voyage!",
    readingMnemonicFr: "TOU comme 'tout' - TOUT le monde ARRIVE à destination. L'objectif est ATTEINT!",
  },
  {
    character: "喪",
    meaningMnemonicFr:
      "Plusieurs bouches 口 avec le vêtement 衣 de DEUIL. Les funérailles françaises en habits noirs, le DEUIL national après la mort d'un grand homme. PERDRE un être cher, porter le DEUIL avec dignité!",
    readingMnemonicFr: "SOU comme 'sou' - pas un SOU pour le DEUIL, on est en peine. MO - les MOts du DEUIL.",
  },
  {
    character: "析",
    meaningMnemonicFr:
      "Le bois 木 avec la hache 斤 pour ANALYSER en morceaux. DIVISER un problème complexe pour mieux le comprendre. Les philosophes français ANALYSENT tout, DIVISENT pour mieux régner intellectuellement!",
    readingMnemonicFr: "SEKI comme 'c'est qui' - C'EST QUI qui ANALYSE ce dossier? DIVISER pour comprendre.",
  },
  {
    character: "枢",
    meaningMnemonicFr:
      "Le bois 木 qui fait tourner 区 comme un PIVOT. Le rôle ESSENTIEL de Paris comme PIVOT de l'Europe! Le point PIVOT autour duquel tout tourne, ESSENTIEL au fonctionnement du mécanisme!",
    readingMnemonicFr: "SUU comme 'sous' - SOUS le PIVOT, tout tourne. Le mécanisme ESSENTIEL.",
  },
  {
    character: "泊",
    meaningMnemonicFr:
      "L'eau 氵 blanche 白 où les bateaux MOUILLENT. SÉJOURNER dans un port de la côte bretonne! Les voiliers qui MOUILLENT l'ancre dans les calanques. Un SÉJOUR paisible au bord de l'eau!",
    readingMnemonicFr: "HAKU comme 'hack' - HACKER ton séjour pour MOUILLER dans un beau port. TOMARU - 'tôt ma rue' pour SÉJOURNER.",
  },
  {
    character: "疲",
    meaningMnemonicFr:
      "La maladie 疒 de la peau 皮 c'est être FATIGUÉ. ÉPUISÉ après une journée de travail à la française! Cette FATIGUE qui s'accumule comme les Français qui comptent leurs RTT avec impatience!",
    readingMnemonicFr: "HI comme 'hi' - 'HI' rit le FATIGUÉ qui délire. TSUKARERU - 'tsu car erreur' d'être ÉPUISÉ.",
  },
  {
    character: "墨",
    meaningMnemonicFr:
      "La terre 土 noire 黒 forme l'ENCRE. L'ENCRE de Chine utilisée par les calligraphes du Marais! Cette ENCRE noire qui trace les caractères sur le papier de riz, art millénaire adopté par les artistes parisiens!",
    readingMnemonicFr: "BOKU comme 'beau cul' - avec l'ENCRE, on dessine de beaux... caractères! SUMI - 'su mi' l'ENCRE noire.",
  },
  {
    character: "翻",
    meaningMnemonicFr:
      "Les plumes 羽 qui se retournent 番 pour TRADUIRE. TRADUIRE les grands classiques français vers le japonais! Faire se retourner les mots d'une langue à l'autre, l'art subtil de la TRADUCTION!",
    readingMnemonicFr: "HON comme 'on' - ON va TRADUIRE ce livre. HIRUGAESU - 'il rue gaie su' en TRADUISANT.",
  },
  {
    character: "叩",
    meaningMnemonicFr:
      "La bouche 口 avec le clou 丁 pour FRAPPER. FRAPPER à la porte comme un facteur français! Toc toc toc, on FRAPPE trois fois pour annoncer sa présence. L'art de FRAPPER poliment!",
    readingMnemonicFr: "KOU comme 'coup' - un COUP pour FRAPPER à la porte. TATAKU - 'ta ta cul' en FRAPPANT.",
  },
  {
    character: "鮭",
    meaningMnemonicFr:
      "Le poisson 魚 de la terre 圭 qui remonte les rivières. Le SAUMON de l'Atlantique qui remonte les rivières françaises! Ce SAUMON fumé de luxe servi dans les grandes brasseries parisiennes!",
    readingMnemonicFr: "SAKE comme 'saké' - boire du SAKÉ avec du SAUMON. Le SAUMON grillé traditionnel!",
  },
  {
    character: "椀",
    meaningMnemonicFr:
      "Le bois 木 en forme ronde 宛 crée un BOL. Le BOL de soupe miso servi dans les restaurants japonais de Paris! Ce BOL en bois laqué, objet d'art autant que ustensile de cuisine!",
    readingMnemonicFr: "WAN comme 'ouane' - OUANE (one) BOL suffit pour la soupe. Le BOL traditionnel.",
  },
  {
    character: "珀",
    meaningMnemonicFr:
      "Le jade 王 blanc 白 forme l'AMBRE BLANC. L'AMBRE précieux des bijouteries de la Place Vendôme! Cette résine fossilisée dorée ou blanche qui capture la lumière comme un trésor du temps!",
    readingMnemonicFr: "HAKU comme 'hack' - HACKER la lumière avec l'AMBRE qui brille. L'AMBRE BLANC rare.",
  },
  {
    character: "鳴",
    meaningMnemonicFr:
      "L'oiseau 鳥 avec la bouche 口 qui CRIE. Les oiseaux qui SONNENT l'aube dans les parcs parisiens! Le coq gaulois qui CRIE cocorico, symbole de la France qui s'éveille chaque matin!",
    readingMnemonicFr: "MEI comme 'mais' - MAIS pourquoi ça SONNE si fort? NAKU - 'n'a cul' qui CRIE. NARU - ça SONNE!",
  },

  // Level 43
  {
    character: "煙",
    meaningMnemonicFr:
      "Le feu 火 qui produit une terre 土 du soir 西. La FUMÉE des cheminées parisiennes en hiver! Cette FUMÉE qui s'élève des toits de zinc, créant l'atmosphère unique des matins brumeux de la capitale!",
    readingMnemonicFr: "EN comme 'hein' - 'HEIN, c'est de la FUMÉE?' KEMURI - 'que mûrit' dans la FUMÉE.",
  },
  {
    character: "順",
    meaningMnemonicFr:
      "Le fleuve 川 qui suit la page 頁 dans l'ORDRE. Faire les choses dans l'ORDRE, OBÉIR aux règles françaises! La file d'attente bien ORDONNÉE devant les boulangeries, chacun respectant son tour!",
    readingMnemonicFr: "JUN comme 'jeune' - les JEUNES doivent OBÉIR à l'ORDRE. Respecter la hiérarchie.",
  },
  {
    character: "倒",
    meaningMnemonicFr:
      "La personne 亻 qui atteint 到 le sol pour TOMBER. RENVERSER comme les révolutionnaires ont RENVERSÉ la monarchie! TOMBER de son piédestal, comme les statues RENVERSÉES de la Révolution française!",
    readingMnemonicFr: "TOU comme 'tout' - TOUT le monde peut TOMBER. TAORERU - 'ta eau ré rue' en TOMBANT.",
  },
  {
    character: "議",
    meaningMnemonicFr:
      "Les paroles 言 de justice 義 pour DÉLIBÉRER. L'Assemblée nationale où les députés DISCUTENT avec passion! DÉLIBÉRER sur les grandes questions, la DISCUSSION animée à la française!",
    readingMnemonicFr: "GI comme 'j'y' - J'Y vais pour DÉLIBÉRER! La DISCUSSION au parlement.",
  },
  {
    character: "挙",
    meaningMnemonicFr:
      "Les mains 手 avec le surplus 与 pour LEVER haut. LEVER la main pour voter à la française! ÉLEVER un problème au niveau national, comme on LÈVE son verre pour trinquer!",
    readingMnemonicFr: "KYO comme 'quoi' - QUOI, tu LÈVES la main? AGERU - 'ah guère' temps de LEVER.",
  },
  {
    character: "判",
    meaningMnemonicFr:
      "La moitié 半 avec le couteau 刂 pour JUGER. Le tribunal de Paris qui JUGE les affaires complexes! JUGER avec la balance de la justice, trancher avec précision comme le couteau coupe en deux!",
    readingMnemonicFr: "HAN comme 'an' - depuis des ANS, on JUGE ainsi. Le verdict du tribunal.",
  },
  {
    character: "肩",
    meaningMnemonicFr:
      "La porte 户 et la lune 月 de chair forment l'ÉPAULE. Les ÉPAULES larges des rugbymen toulousains! Porter le monde sur ses ÉPAULES comme Atlas, la force et la responsabilité françaises!",
    readingMnemonicFr: "KEN comme 'quand' - QUAND j'ai mal à l'ÉPAULE. KATA - 'qu'a ta' ÉPAULE? Elle est forte!",
  },
  {
    character: "腰",
    meaningMnemonicFr:
      "La chair 月 qui demande 要 de l'attention, les HANCHES. Les HANCHES qui dansent le cancan au Moulin Rouge! Ces HANCHES qui bougent au rythme de la musique française, sensuelles et expressives!",
    readingMnemonicFr: "YOU comme 'you' - YOU avez de belles HANCHES! KOSHI - 'coche si' tes HANCHES bougent.",
  },
  {
    character: "独",
    meaningMnemonicFr:
      "Le chien 犭 avec l'insecte 蜀 créent la solitude UNIQUE. SEUL comme le loup solitaire des Cévennes! Être UNIQUE en son genre, marcher SEUL sur son chemin comme un artiste du Montmartre bohème!",
    readingMnemonicFr: "DOKU comme 'dock' - SEUL sur le DOCK, UNIQUE. HITORI - 'il tôt ri' tout SEUL.",
  },
  {
    character: "貸",
    meaningMnemonicFr:
      "Le substitut 代 avec la coquille 貝 pour PRÊTER. Les banques françaises qui PRÊTENT aux entrepreneurs! LOUER un appartement parisien, PRÊTER de l'argent avec confiance et contrat!",
    readingMnemonicFr: "TAI comme 'taie' - une TAIE d'oreiller PRÊTÉE. KASU - 'cas su' pour LOUER.",
  },
  {
    character: "昇",
    meaningMnemonicFr:
      "Le soleil 日 qui s'élève 升 pour MONTER. Le soleil qui SE LÈVE sur les toits de Paris! MONTER les marches de la butte Montmartre, S'ÉLEVER vers le Sacré-Cœur au petit matin!",
    readingMnemonicFr: "SHOU comme 'show' - quel SHOW de voir le soleil MONTER! NOBORU - 'nos beau rue' en MONTANT.",
  },
  {
    character: "録",
    meaningMnemonicFr:
      "Le métal 金 qui tombe 彔 pour ENREGISTRER. Les studios d'ENREGISTREMENT parisiens! COPIER et ENREGISTRER la musique française qui enchante le monde, chaque note gravée dans le métal!",
    readingMnemonicFr: "ROKU comme 'rock' - ENREGISTRER du ROCK français! La musique COPIÉE sur disque.",
  },
  {
    character: "奇",
    meaningMnemonicFr:
      "Le grand 大 et le possible 可 créent l'ÉTRANGE. Les mystères ÉTRANGES du château de Versailles! Ce qui est ÉTRANGE fascine, comme les illusions des magiciens du Grand Rex de Paris!",
    readingMnemonicFr: "KI comme 'qui' - QUI fait ces choses ÉTRANGES? Le mystère persiste!",
  },
  {
    character: "貧",
    meaningMnemonicFr:
      "Partager 分 la coquille 貝 rend PAUVRE. Les Misérables de Victor Hugo, ces PAUVRES de Paris! L'INDIGENCE des sans-abris sous les ponts de la Seine, une réalité que la France combat!",
    readingMnemonicFr: "HIN comme 'hein' - 'HEIN, tu es PAUVRE?' MAZUSHII - 'ma zu chic' malgré être INDIGENT.",
  },
  {
    character: "押",
    meaningMnemonicFr:
      "La main 扌 avec le kana 甲 pour POUSSER. APPUYER sur le bouton du métro parisien! POUSSER la porte du café, cette main qui APPUIE avec la nonchalance française!",
    readingMnemonicFr: "OU comme 'ou' - POUSSER OÙ exactement? OSU - 'oh su' pour APPUYER.",
  },
  {
    character: "背",
    meaningMnemonicFr:
      "Le nord 北 et la chair 月 forment le DOS. Le DOS voûté des vieux Parisiens qui traversent le Pont Neuf! Tourner le DOS aux problèmes, cette attitude française désinvolte mais efficace!",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE, j'ai mal au DOS!' SE - 'c'est' mon DOS qui me fait mal.",
  },
  {
    character: "探",
    meaningMnemonicFr:
      "La main 扌 avec la caverne 穴 et le bois 木 pour CHERCHER. EXPLORER les grottes de Lascaux! CHERCHER des trésors comme les archéologues français qui EXPLORENT le passé de l'humanité!",
    readingMnemonicFr: "TAN comme 'temps' - prendre le TEMPS de CHERCHER. SAGURU - 'ça guru' qui EXPLORE.",
  },
  {
    character: "迎",
    meaningMnemonicFr:
      "La marche 辶 vers l'opposé 卬 pour ACCUEILLIR. ALLER CHERCHER quelqu'un à la gare! L'art français d'ACCUEILLIR les invités avec chaleur et générosité, les bras ouverts!",
    readingMnemonicFr: "GEI comme 'guet' - faire le GUET pour ACCUEILLIR. MUKAERU - 'mou qu'a' en ALLANT CHERCHER.",
  },
  {
    character: "捨",
    meaningMnemonicFr:
      "La main 扌 qui donne 舎 pour JETER. ABANDONNER les vieilles habitudes! JETER ce qui n'est plus utile, le tri sélectif à la française pour une planète plus propre!",
    readingMnemonicFr: "SHA comme 'chat' - le CHAT JETTE ses jouets. SUTERU - 'su ter' pour ABANDONNER.",
  },
  {
    character: "拡",
    meaningMnemonicFr:
      "La main 扌 qui s'étend 広 pour ÉTENDRE. ÉLARGIR les boulevards haussmanniens! Le baron Haussmann qui a ÉTENDU les rues de Paris, ÉLARGI les perspectives de la ville lumière!",
    readingMnemonicFr: "KAKU comme 'caque' - ÉLARGIR la CAQUE de poisson. HIROGARU - 'il rogue a rue' en S'ÉTENDANT.",
  },
  {
    character: "純",
    meaningMnemonicFr:
      "Le fil 糸 qui tourne 屯 de façon PURE. L'eau PURE des sources de Volvic! SIMPLE et PUR comme le style français minimaliste, cette élégance dépouillée qui fait la signature de la mode parisienne!",
    readingMnemonicFr: "JUN comme 'jeune' - les JEUNES sont PURS de cœur. La simplicité PURE.",
  },
  {
    character: "推",
    meaningMnemonicFr:
      "La main 扌 qui avance 隹 pour POUSSER. RECOMMANDER un bon restaurant parisien! POUSSER une porte avec confiance, RECOMMANDER ce qu'on a aimé à ses amis!",
    readingMnemonicFr: "SUI comme 'suie' - POUSSER la SUIE du ramoneur. OSU - 'oh su' pour RECOMMANDER.",
  },
  {
    character: "損",
    meaningMnemonicFr:
      "La main 扌 avec le membre 員 créent la PERTE. Le DOMMAGE des inondations de la Seine! Subir une PERTE financière, les DOMMAGES que l'assurance française couvre généreusement!",
    readingMnemonicFr: "SON comme 'son' - le SON d'une PERTE. SOKONAU - 'soco n'a ou' DOMMAGE.",
  },
  {
    character: "測",
    meaningMnemonicFr:
      "L'eau 氵 avec la règle 則 pour MESURER. Les géomètres de l'IGN qui MESURENT le territoire français! MESURER avec précision, cartographier chaque parcelle du beau pays de France!",
    readingMnemonicFr: "SOKU comme 'soc' - le SOC de la charrue pour MESURER la terre. HAKARU - 'ha! car' on MESURE.",
  },
  {
    character: "互",
    meaningMnemonicFr:
      "Deux crochets entrelacés pour le MUTUEL. La solidarité RÉCIPROQUE entre Français! L'entraide MUTUELLE, cette tradition française de s'aider les uns les autres dans les moments difficiles!",
    readingMnemonicFr: "GO comme 'go' - GO pour l'aide MUTUELLE! TAGAI - 'ta gai' RÉCIPROQUE.",
  },
  {
    character: "択",
    meaningMnemonicFr:
      "La main 扌 et l'abri 尺 pour CHOISIR. SÉLECTIONNER les meilleurs vins de Bourgogne! L'art de CHOISIR avec discernement, la sélection rigoureuse qui fait la qualité française!",
    readingMnemonicFr: "TAKU comme 'tac' - faire un choix du TAC au tac. ERABU - 'et ra bu' pour SÉLECTIONNER.",
  },
  {
    character: "描",
    meaningMnemonicFr:
      "La main 扌 avec le chat 苗 pour DESSINER. Les artistes de Montmartre qui DESSINENT les portraits! DÉCRIRE une scène avec des mots ou DESSINER avec des traits, l'art français de capturer la beauté!",
    readingMnemonicFr: "BYOU comme 'bio' - DESSINER en mode BIO, naturel. EGAKU - 'et gâteau' qu'on DESSINE.",
  },
  {
    character: "銃",
    meaningMnemonicFr:
      "Le métal 金 et le plein 充 forment le FUSIL. Les mousquetaires du roi avec leurs FUSILS! Le FUSIL de chasse des campagnes françaises, symbole de la tradition cynégétique!",
    readingMnemonicFr: "JUU comme 'joue' - viser la JOUE avec le FUSIL! Pan! Le tir du FUSIL.",
  },
  {
    character: "炭",
    meaningMnemonicFr:
      "La montagne 山 avec le feu 火 produit le CHARBON. Les mines de CHARBON du Nord de la France! Ce CHARBON noir qui a fait tourner l'industrie, le combustible de la révolution industrielle française!",
    readingMnemonicFr: "TAN comme 'temps' - le TEMPS du CHARBON est révolu. SUMI - 'su mi' le CHARBON noir.",
  },
  {
    character: "誰",
    meaningMnemonicFr:
      "Les paroles 言 de l'oiseau 隹 demandent QUI. QUI va là? Le garde suisse de l'Élysée qui demande l'identité! QUI es-tu? La question universelle posée à chaque nouveau venu!",
    readingMnemonicFr: "SUI comme 'suie' - QUI a mis de la SUIE partout? DARE - 'dard' de la question QUI?",
  },
  {
    character: "襲",
    meaningMnemonicFr:
      "Le dragon 龍 avec les vêtements 衣 pour ATTAQUER. Les Vikings qui ATTAQUAIENT les côtes normandes! L'ATTAQUE surprise, comme le dragon qui fond sur sa proie avec férocité!",
    readingMnemonicFr: "SHUU comme 'chou' - ATTAQUER le CHOU! OSOU - 'oh sou' pour ATTAQUER.",
  },
  {
    character: "刷",
    meaningMnemonicFr:
      "La pointe 尸 avec le couteau 刂 et le drap 巾 pour IMPRIMER. L'imprimerie de Gutenberg qui a révolutionné la France! IMPRIMER les livres des Lumières, diffuser le savoir à tous!",
    readingMnemonicFr: "SATSU comme 'sa tu' - SA TU vas IMPRIMER? SURU - 'su rue' pour IMPRIMER.",
  },
  {
    character: "潮",
    meaningMnemonicFr:
      "L'eau 氵 du matin 朝 forme la MARÉE. La MARÉE du Mont-Saint-Michel, la plus grande d'Europe! Ce COURANT puissant qui transforme l'île en presqu'île deux fois par jour!",
    readingMnemonicFr: "CHOU comme 'chou' - la MARÉE emporte mon CHOU! SHIO - 'si eau' le COURANT de MARÉE.",
  },
  {
    character: "即",
    meaningMnemonicFr:
      "L'assiette 皀 avec le signe 卩 créent l'IMMÉDIAT. Le service IMMÉDIAT des cafés parisiens! Tout de suite, sans attendre, la réponse IMMÉDIATE qui caractérise l'efficacité française!",
    readingMnemonicFr: "SOKU comme 'soc' - IMMÉDIATEMENT le SOC dans la terre! SUNAWACHI - 'su n'a ouais chi' IMMÉDIAT.",
  },
  {
    character: "封",
    meaningMnemonicFr:
      "La terre 土 avec le pouce 寸 pour SCELLER. SCELLER une lettre avec de la cire comme au temps de Louis XIV! Le sceau royal qui SCELLE les décrets, la fermeture officielle des documents!",
    readingMnemonicFr: "FUU comme 'fou' - un FOU qui SCELLE tout! L'enveloppe SCELLÉE avec soin.",
  },
  {
    character: "筒",
    meaningMnemonicFr:
      "Le bambou 竹 qui forme un TUBE 同. Les CYLINDRES de bambou des fontaines japonaises! Ce TUBE de pâte de dentifrice, ce CYLINDRE qui contient les surprises comme un rouleau de parchemin!",
    readingMnemonicFr: "TOU comme 'tout' - TOUT dans ce TUBE. TSUTSU - 'tsu-tsu' le CYLINDRE creux.",
  },
  {
    character: "慰",
    meaningMnemonicFr:
      "Le cœur 心 avec l'armée 尉 pour CONSOLER. CONSOLER les veuves de guerre au monument aux morts! Apporter du réconfort, CONSOLER ceux qui souffrent avec compassion à la française!",
    readingMnemonicFr: "I comme 'il' - IL vient te CONSOLER. NAGUSSAMERU - 'nage ça mer' pour CONSOLER.",
  },
  {
    character: "摩",
    meaningMnemonicFr:
      "La main 手 avec le chanvre 麻 pour FROTTER. FROTTER le parquet à la cire comme autrefois! Les femmes de ménage qui FROTTENT jusqu'à ce que ça brille, l'art français du nettoyage!",
    readingMnemonicFr: "MA comme 'ma' - MA main qui FROTTE. Le massage par FRICTION.",
  },
  {
    character: "撲",
    meaningMnemonicFr:
      "La main 扌 avec l'arbre 菐 pour FRAPPER fort. Les lutteurs de sumo qui se FRAPPENT! FRAPPER avec puissance, le combat au corps-à-corps qui requiert force et technique!",
    readingMnemonicFr: "BOKU comme 'boxe' - la BOXE pour FRAPPER! Le combat qui FRAPPE.",
  },
  {
    character: "旨",
    meaningMnemonicFr:
      "Le soleil 日 et la cuillère 匕 forment le BUT et le SAVOUREUX. Le BUT de la gastronomie française: être SAVOUREUX! Atteindre son BUT en créant des plats délicieux, la mission des chefs étoilés!",
    readingMnemonicFr: "SHI comme 'si' - SI c'est SAVOUREUX, c'est réussi! MUNE - le BUT est atteint.",
  },
  {
    character: "沈",
    meaningMnemonicFr:
      "L'eau 氵 qui prend 冘 pour COULER. Le Titanic qui a COULÉ, emportant des passagers français! S'ENFONCER dans les profondeurs, COULER comme un navire touché par les flots!",
    readingMnemonicFr: "CHIN comme 'chine' - la porcelaine de CHINE qui COULE! SHIZUMU - 'si zu mu' pour S'ENFONCER.",
  },
  {
    character: "泰",
    meaningMnemonicFr:
      "L'eau 氵 sous le grand 大 et le feu 火 créent le PAISIBLE. La Thaïlande, pays PAISIBLE! Cette sérénité PAISIBLE des jardins zen, la paix intérieure recherchée par les philosophes!",
    readingMnemonicFr: "TAI comme 'Thai' - la cuisine THAI est PAISIBLE pour l'esprit. Le calme serein.",
  },
  {
    character: "滋",
    meaningMnemonicFr:
      "L'eau 氵 avec deux 兹 pour NOURRIR doublement. Les eaux thermales qui NOURRISSENT la peau! NOURRIR le corps et l'esprit, les bienfaits nutritifs des sources françaises!",
    readingMnemonicFr: "JI comme 'j'y' - J'Y vais pour me NOURRIR! Les nutriments qui NOURRISSENT.",
  },

  // Level 44
  {
    character: "伝",
    meaningMnemonicFr:
      "La personne 亻 avec le nuage 云 pour TRANSMETTRE. TRANSMETTRE le savoir des maîtres français! La tradition orale qui passe de génération en génération, TRANSMETTRE l'héritage culturel!",
    readingMnemonicFr: "DEN comme 'dent' - TRANSMETTRE de bouche à DENT! TSUTAERU - 'tsu ta' pour TRANSMETTRE.",
  },
  {
    character: "味",
    meaningMnemonicFr:
      "La bouche 口 qui n'a pas encore 未 goûté. Le GOÛT exquis de la cuisine française! Savourer chaque GOÛT, cette explosion de saveurs qui caractérise la gastronomie française!",
    readingMnemonicFr: "MI comme 'mi' - à MI-chemin du GOÛT parfait! AJI - 'à j'y' goûte, quel GOÛT!",
  },
  {
    character: "告",
    meaningMnemonicFr:
      "La vache 牛 avec la bouche 口 pour ANNONCER. Le crieur public qui ANNONCE les nouvelles! ANNONCER à haute voix comme au temps des rois, proclamer les décrets sur la place du village!",
    readingMnemonicFr: "KOKU comme 'coq' - le COQ ANNONCE le matin! TSUGERU - 'tsu guère' pour ANNONCER.",
  },
  {
    character: "報",
    meaningMnemonicFr:
      "Le bonheur 幸 avec la main 又 pour RAPPORTER. Les journalistes de France 24 qui RAPPORTENT les nouvelles! RAPPORTER les faits avec précision, la mission sacrée de l'information!",
    readingMnemonicFr: "HOU comme 'ho!' - 'HO!' quelle nouvelle à RAPPORTER! MUKUIRU - 'mu qu'y rue' pour RAPPORTER.",
  },
  {
    character: "統",
    meaningMnemonicFr:
      "Le fil 糸 qui passe par l'infanterie 充 pour UNIFIER. Le président qui UNIFIE la nation française! DIRIGER avec autorité, UNIFIER les régions sous un même drapeau tricolore!",
    readingMnemonicFr: "TOU comme 'tout' - TOUT le monde est UNIFIÉ! SUBERU - 'su beurre' pour DIRIGER.",
  },
  {
    character: "睡",
    meaningMnemonicFr:
      "L'œil 目 qui pend 垂 dans le SOMMEIL. La sieste française, ce moment sacré de SOMMEIL! DORMIR paisiblement après un bon déjeuner, la tradition du repos de l'après-midi!",
    readingMnemonicFr: "SUI comme 'suie' - les yeux pleins de SUIE de SOMMEIL! Dormir profondément.",
  },
  {
    character: "妙",
    meaningMnemonicFr:
      "La femme 女 qui est peu 少 ordinaire est MYSTÉRIEUSE. Les mystères MYSTÉRIEUX des femmes françaises! Cette aura MYSTÉRIEUSE qui fascine, l'élégance énigmatique à la parisienne!",
    readingMnemonicFr: "MYOU comme 'miaou' - le chat MYSTÉRIEUX fait MIAOU! L'énigme féline.",
  },
  {
    character: "暮",
    meaningMnemonicFr:
      "La plante 艹 avec le soleil 日 et le grand 大 marquent la FIN DU JOUR. Le crépuscule sur les lavandes de Provence! La FIN DU JOUR quand le soleil se couche sur les champs violets!",
    readingMnemonicFr: "BO comme 'beau' - BEAU coucher de soleil en FIN DE JOUR! KURERU - 'qu'ré rue' au crépuscule.",
  },
  {
    character: "声",
    meaningMnemonicFr:
      "La forme ancienne du son qui sort représente la VOIX. La VOIX d'Édith Piaf qui résonne encore! Cette VOIX française unique qui a chanté l'amour et la vie, écho immortel de l'âme parisienne!",
    readingMnemonicFr: "SEI comme 'c'est' - C'EST ta VOIX que j'entends! KOE - 'quoi?' dit la VOIX.",
  },
  {
    character: "音",
    meaningMnemonicFr:
      "Le soleil 日 qui se lève 立 produit un SON. Le SON des cloches de Notre-Dame! Chaque SON raconte une histoire, la mélodie de Paris qui s'éveille au petit matin!",
    readingMnemonicFr: "ON comme 'on' - ON entend un SON! OTO - 'oh tôt' le SON du matin.",
  },
  {
    character: "苗",
    meaningMnemonicFr:
      "L'herbe 艹 du champ 田 forme un PLANT. Les PLANTS de vigne de Champagne! Chaque PLANT soigneusement cultivé pour produire le meilleur champagne du monde, trésor viticole français!",
    readingMnemonicFr: "BYOU comme 'bio' - le PLANT est BIO! NAE - 'n'est' qu'un petit PLANT.",
  },
  {
    character: "軸",
    meaningMnemonicFr:
      "La voiture 車 avec le centre 由 forme l'AXE. L'AXE de rotation de la roue! Les grandes avenues parisiennes qui forment l'AXE principal de la ville, du Louvre à La Défense!",
    readingMnemonicFr: "JIKU comme 'j'y cul' - l'AXE au centre de tout! Le point pivotant.",
  },
  {
    character: "滑",
    meaningMnemonicFr:
      "L'eau 氵 avec l'os 骨 pour GLISSER. Les patineurs qui GLISSENT sur la glace à l'Hôtel de Ville! LISSE comme du verre, GLISSER avec grâce sur la surface polie!",
    readingMnemonicFr: "KATSU comme 'cat su' - le chat qui GLISSE! SUBERU - 'su beurre' pour GLISSER sur du beurre!",
  },
  {
    character: "焦",
    meaningMnemonicFr:
      "L'oiseau 隹 sur le feu 火 qui BRÛLE. La crème brûlée, ce dessert français qui est légèrement BRÛLÉ! La HÂTE du cuisinier qui surveille son plat pour qu'il ne BRÛLE pas!",
    readingMnemonicFr: "SHOU comme 'show' - quel SHOW quand ça BRÛLE! KOGERU - 'co guère' avant de BRÛLER.",
  },
  {
    character: "荒",
    meaningMnemonicFr:
      "L'herbe 艹 avec le fleuve 川 et les os 亡 créent le SAUVAGE. Les landes bretonnes, SAUVAGES et battues par les vents! GROSSIER comme la mer déchaînée sur les côtes SAUVAGES de Normandie!",
    readingMnemonicFr: "KOU comme 'coup' - un COUP de vent SAUVAGE! ARAI - 'ah raie' GROSSIER.",
  },
  {
    character: "袋",
    meaningMnemonicFr:
      "Le substitut 代 avec les vêtements 衣 forme un SAC. Le SAC à main Hermès, icône de luxe française! Cette POCHE élégante qui contient les essentiels de la Parisienne chic!",
    readingMnemonicFr: "TAI comme 'taie' - une TAIE d'oreiller en forme de SAC! FUKURO - 'fou cul robe' SAC.",
  },
  {
    character: "朗",
    meaningMnemonicFr:
      "La lune 月 qui est bonne 良 est CLAIRE. Les nuits CLAIRES de pleine lune sur Paris! Cette lumière JOYEUSE qui éclaire les amoureux sur les bords de Seine!",
    readingMnemonicFr: "ROU comme 'roue' - la ROUE de la lune CLAIRE! HOGARAKA - 'ho gars' JOYEUX.",
  },
  {
    character: "寸",
    meaningMnemonicFr:
      "Une petite mesure, le POUCE japonais. La précision du POUCE du tailleur parisien! Mesurer au POUCE près, l'exactitude qui fait la différence dans la haute couture!",
    readingMnemonicFr: "SUN comme 'son' - le SON d'un POUCE qui claque! La mesure précise.",
  },
  {
    character: "刃",
    meaningMnemonicFr:
      "Le couteau 刀 avec le point de la LAME. La LAME aiguisée des couteaux de Thiers! Cette LAME qui tranche net, le tranchant parfait des artisans couteliers français!",
    readingMnemonicFr: "JIN comme 'jean' - le JEAN coupé par la LAME! HA - 'ah!' dit la LAME.",
  },
  {
    character: "叱",
    meaningMnemonicFr:
      "La bouche 口 avec le sept 七 pour GRONDER. La maîtresse d'école qui GRONDE les élèves dissipés! GRONDER avec autorité mais justice, l'art de la discipline à la française!",
    readingMnemonicFr: "SHITSU comme 'chut su' - 'CHUT!' dit celui qui GRONDE! SHIKARU - 'si car' je GRONDE.",
  },
  {
    character: "娯",
    meaningMnemonicFr:
      "La femme 女 qui s'amuse 呉 dans le DIVERTISSEMENT. Les cabarets de Paris, haut lieu du DIVERTISSEMENT! Se DIVERTIR comme au Moulin Rouge, l'art français de s'amuser avec style!",
    readingMnemonicFr: "GO comme 'go' - GO pour le DIVERTISSEMENT! S'amuser à la française.",
  },
  {
    character: "斗",
    meaningMnemonicFr:
      "Une LOUCHE pour servir le vin. La LOUCHE du sommelier qui sert le grand cru! Cette LOUCHE qui mesure avec précision les portions, outil ancestral des cuisiniers!",
    readingMnemonicFr: "TO comme 'taux' - le TAUX mesuré par la LOUCHE! L'instrument de mesure.",
  },
  {
    character: "匹",
    meaningMnemonicFr:
      "L'enclos 匚 avec le cheval 儿 forme le COMPTEUR POUR ANIMAUX. Compter les chevaux de course à Longchamp! Un cheval, deux chevaux - le compteur spécial pour nos amis les bêtes!",
    readingMnemonicFr: "HIKI comme 'il qui' - IL compte QUI? Les ANIMAUX! Le compteur de bêtes.",
  },
  {
    character: "釣",
    meaningMnemonicFr:
      "Le métal 金 et la cuillère 勺 pour PÊCHER. PÊCHER la truite dans les rivières des Alpes! L'hameçon métallique qui capture le poisson, l'art de la PÊCHE à la ligne!",
    readingMnemonicFr: "CHOU comme 'chou' - PÊCHER un CHOU? Non, un poisson! TSURU - 'tsu rue' pour PÊCHER.",
  },
  {
    character: "粒",
    meaningMnemonicFr:
      "Le riz 米 qui se lève 立 en GRAINS. Les GRAINS de raisin du champagne! Chaque GRAIN compte, comme les GRAINS de sable de la plage de Saint-Tropez!",
    readingMnemonicFr: "RYUU comme 'rue' - les GRAINS dans la RUE! TSUBU - 'tsu bu' chaque GRAIN.",
  },
  {
    character: "挨",
    meaningMnemonicFr:
      "La main 扌 qui pousse 矣 pour POUSSER vers les salutations. Le début de la salutation 'aisatsu'! POUSSER poliment pour dire bonjour à la japonaise, l'art de la courtoisie!",
    readingMnemonicFr: "AI comme 'aïe' - 'AÏE' dit celui qu'on POUSSE! La première partie du salut.",
  },
  {
    character: "拶",
    meaningMnemonicFr:
      "La main 扌 qui serre 夕 pour APPROCHER. Compléter 'aisatsu' pour saluer! S'APPROCHER pour serrer la main, la conclusion du rituel de salutation!",
    readingMnemonicFr: "SATSU comme 'sa tsu' - SA façon de s'APPROCHER! La suite du salut.",
  },

  // Level 45
  {
    character: "赤",
    meaningMnemonicFr:
      "Le grand 大 feu 火 brûle ROUGE. Le drapeau ROUGE des révolutionnaires! Ce ROUGE sang qui symbolise la passion française, la couleur de l'amour et du vin de Bordeaux!",
    readingMnemonicFr: "SEKI comme 'c'est qui' - C'EST QUI en ROUGE? AKA - 'ah! ça' c'est ROUGE!",
  },
  {
    character: "疑",
    meaningMnemonicFr:
      "Le caractère complexe représente le DOUTE. DOUTER comme Descartes doutait de tout! Le DOUTE méthodique, cette méfiance philosophique qui mène à la vérité française!",
    readingMnemonicFr: "GI comme 'j'y' - J'Y DOUTE! UTAGAU - 'ou t'a gau' pour DOUTER.",
  },
  {
    character: "踏",
    meaningMnemonicFr:
      "Le pied 足 sur l'eau 沓 pour MARCHER SUR. PIÉTINER le raisin dans les cuves de Bourgogne! MARCHER SUR les pavés de Paris, chaque pas une histoire sous les semelles!",
    readingMnemonicFr: "TOU comme 'tout' - MARCHER SUR TOUT! FUMU - 'fou mu' qui PIÉTINE.",
  },
  {
    character: "弾",
    meaningMnemonicFr:
      "L'arc 弓 avec l'unique 単 pour la BALLE. La BALLE du fusil, projectile mortel! Cette BALLE qui siffle dans l'air, l'arme des soldats français à travers les âges!",
    readingMnemonicFr: "DAN comme 'dans' - DANS le canon, la BALLE! TAMA - 'ta ma' BALLE.",
  },
  {
    character: "盤",
    meaningMnemonicFr:
      "Le général 般 sur le plat 皿 forme le PLATEAU. Le PLATEAU de fromages français! Ce PLATEAU d'échecs sur lequel on joue, surface plane pour les grands jeux de l'esprit!",
    readingMnemonicFr: "BAN comme 'banc' - le BANC qui sert de PLATEAU! La surface de jeu.",
  },
  {
    character: "項",
    meaningMnemonicFr:
      "L'atteindre 工 avec la page 頁 forme l'ARTICLE. Les ARTICLES de loi du Code Napoléon! Chaque ARTICLE définit un point précis, la structure juridique française!",
    readingMnemonicFr: "KOU comme 'coup' - un COUP par ARTICLE! Les points de la liste.",
  },
  {
    character: "刻",
    meaningMnemonicFr:
      "Le cochon 亥 avec le couteau 刂 pour GRAVER. GRAVER les noms sur les monuments aux morts! Cette GRAVURE qui immortalise, l'art de GRAVER dans la pierre l'histoire française!",
    readingMnemonicFr: "KOKU comme 'coq' - GRAVER le COQ gaulois! KIZAMU - 'qui za mu' pour GRAVER.",
  },
  {
    character: "鍋",
    meaningMnemonicFr:
      "Le métal 金 avec l'intérieur 内 forme la MARMITE. La MARMITE du pot-au-feu qui mijote! Cette MARMITE en cuivre des cuisines françaises, garante des plats traditionnels!",
    readingMnemonicFr: "KA comme 'cas' - en CAS de faim, la MARMITE! NABE - 'n'a bé' la MARMITE.",
  },
  {
    character: "舟",
    meaningMnemonicFr:
      "La forme d'un petit BATEAU. Les BATEAUX-mouches sur la Seine! Ce BATEAU qui glisse sur l'eau, transportant touristes et rêveurs à travers Paris!",
    readingMnemonicFr: "SHUU comme 'chou' - le BATEAU en forme de CHOU! FUNE - 'fou né' sur le BATEAU.",
  },
  {
    character: "凶",
    meaningMnemonicFr:
      "La croix dans l'enclos représente le MAUVAIS PRÉSAGE. Le MAUVAIS PRÉSAGE des corbeaux noirs! Ce signe néfaste qui annonce le malheur, la superstition des campagnes françaises!",
    readingMnemonicFr: "KYOU comme 'quoi?' - QUOI, un MAUVAIS PRÉSAGE? Le signe inquiétant.",
  },
  {
    character: "狩",
    meaningMnemonicFr:
      "Le chien 犭 qui garde 守 pour la CHASSE. La CHASSE à courre en forêt de Fontainebleau! CHASSER le cerf avec les chiens, tradition aristocratique française!",
    readingMnemonicFr: "SHU comme 'chou' - CHASSER le CHOU? Non, le gibier! KARU - 'car' on CHASSE.",
  },
  {
    character: "頃",
    meaningMnemonicFr:
      "L'appeler 匕 avec la page 頁 indique ENVIRON ce moment. VERS cette époque, À PEU PRÈS ce moment! ENVIRON l'heure du déjeuner, les Français se mettent à table!",
    readingMnemonicFr: "KEI comme 'quai' - VERS le QUAI, ENVIRON. KORO - 'corps oh' VERS ce moment.",
  },
  {
    character: "也",
    meaningMnemonicFr:
      "Ce caractère ancien signifie ÊTRE ou AUSSI. AUSSI utilisé comme suffixe! ÊTRE présent, AUSSI participer, la polyvalence de ce petit caractère!",
    readingMnemonicFr: "YA comme 'y'a' - Y'A AUSSI cela! ÊTRE et AUSSI.",
  },
  {
    character: "井",
    meaningMnemonicFr:
      "Le caractère en forme de grille représente un PUITS. Le PUITS du village français d'antan! Ce PUITS où les femmes venaient chercher l'eau, point de rencontre social!",
    readingMnemonicFr: "SEI comme 'c'est' - C'EST un PUITS! I - 'il' y a un PUITS ici.",
  },
  {
    character: "賭",
    meaningMnemonicFr:
      "La coquille 貝 avec le chef 者 pour PARIER. Les casinos de Monte-Carlo où l'on PARIE gros! PARIER sur le rouge ou le noir, le frisson du jeu à la française!",
    readingMnemonicFr: "TO comme 'tôt' - TÔT ou tard, on PARIE! KAKERU - 'cas qu'ré' pour PARIER.",
  },
  {
    character: "塾",
    meaningMnemonicFr:
      "La terre 土 avec le mûr 孰 forme l'ÉCOLE PRIVÉE. Les cours particuliers des ÉCOLES PRIVÉES françaises! Cette ÉCOLE PRIVÉE qui prépare à l'excellence, le soutien scolaire à la française!",
    readingMnemonicFr: "JUKU comme 'joue cul' - JOUER pour apprendre à l'ÉCOLE PRIVÉE! L'académie.",
  },
  {
    character: "翔",
    meaningMnemonicFr:
      "L'agneau 羊 avec les ailes 羽 pour PLANER. VOLER comme un aigle au-dessus des Alpes! PLANER librement dans le ciel bleu, le rêve d'Icare réalisé par les parapentistes français!",
    readingMnemonicFr: "SHOU comme 'show' - quel SHOW de PLANER! KAKERU - 'cas qu'ré' pour VOLER.",
  },
  {
    character: "泡",
    meaningMnemonicFr:
      "L'eau 氵 qui enveloppe 包 forme les BULLES. Les BULLES du champagne qui pétillent! Ces BULLES dorées qui montent dans la flûte, l'effervescence du bonheur français!",
    readingMnemonicFr: "HOU comme 'oh!' - 'OH!' les BULLES! AWA - 'ah oua' les BULLES pétillantes.",
  },
  {
    character: "霞",
    meaningMnemonicFr:
      "La pluie 雨 avec le lointain 叚 forme la BRUME. La BRUME matinale sur les châteaux de la Loire! Cette BRUME qui enveloppe les paysages français d'un voile mystérieux!",
    readingMnemonicFr: "KA comme 'cas' - en CAS de BRUME, attendez! KASUMI - 'cas su mi' la BRUME.",
  },
  {
    character: "飽",
    meaningMnemonicFr:
      "Manger 食 avec envelopper 包 jusqu'à être RASSASIÉ. Être RASSASIÉ après un repas gastronomique français! Manger jusqu'à être complètement RASSASIÉ, le plaisir de la table!",
    readingMnemonicFr: "HOU comme 'oh!' - 'OH!' je suis RASSASIÉ! AKIRU - 'à qui rue' pour être RASSASIÉ.",
  },
  {
    character: "鰹",
    meaningMnemonicFr:
      "Le poisson 魚 solide 堅 comme la BONITE. La BONITE séchée du dashi japonais! Ce poisson robuste qui donne le goût umami, base de la cuisine japonaise adoptée en France!",
    readingMnemonicFr: "KEN comme 'qu'on' - QU'ON mange de la BONITE! KATSUO - 'cat suo' la BONITE.",
  },
  {
    character: "寂",
    meaningMnemonicFr:
      "Le toit 宀 avec le petit 叔 créent la SOLITUDE. La SOLITUDE des nuits d'hiver parisiennes! Cette SOLITUDE mélancolique des poètes maudits, Verlaine errant dans les rues désertes!",
    readingMnemonicFr: "JAKU comme 'Jacques' - JACQUES est en SOLITUDE! SABISHII - 'sa bi chi' SOLITAIRE.",
  },
  {
    character: "珈",
    meaningMnemonicFr:
      "Le jade 王 ajouté 加 forme le CAFÉ. Le CAFÉ serré des bistros parisiens! Ce CAFÉ qui réveille les matins français, noir comme la nuit et fort comme l'esprit!",
    readingMnemonicFr: "KA comme 'café' - KA pour CAFÉ! La boisson qui réveille.",
  },
];

async function main() {
  console.log("Improving mnemonics for kanji in levels 41-45...\n");

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
