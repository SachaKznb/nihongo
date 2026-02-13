import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Improved mnemonics batch 2 - Levels 11-20
// Rich French storytelling with cultural references

const improvements = [
  // Level 11
  {
    character: "湖",
    meaningMnemonicFr: "L'eau 氵qui s'est accumulée pendant des siècles près d'un vieux château 古. C'est le LAC du Bourget, le plus grand LAC naturel de France ! Les romantiques venaient y contempler leur reflet dans les eaux calmes du LAC.",
    readingMnemonicFr: "MIZUUMI - 'mizu' (eau) + 'umi' (mer) = une petite mer intérieure, un LAC ! KO comme 'coco' - les noix de coco flottent sur le LAC.",
  },
  {
    character: "空",
    meaningMnemonicFr: "Sous un toit 穴 où les artisans travaillent 工, on lève les yeux vers le CIEL VIDE de Paris. Un trou dans le plafond révèle l'immensité du CIEL bleu. C'est le VIDE absolu au-dessus de nos têtes, comme l'infini qu'on contemple depuis la Tour Eiffel !",
    readingMnemonicFr: "SORA sonne comme 'seau-ra' - un seau lancé en l'air vers le CIEL ! KUU comme 'coucou' - l'oiseau qui chante dans le CIEL VIDE !",
  },
  {
    character: "川",
    meaningMnemonicFr: "Trois lignes qui coulent comme la Seine à travers Paris ! C'est la RIVIÈRE qui serpente, qui descend des montagnes vers la mer. Les péniches glissent sur cette RIVIÈRE française, transportant du vin de Bourgogne !",
    readingMnemonicFr: "KAWA sonne comme 'kawai' mais c'est la RIVIÈRE ! SEN comme 'cent' - CENT bateaux naviguent sur cette RIVIÈRE !",
  },
  {
    character: "海",
    meaningMnemonicFr: "L'eau 氵 où chaque 每 vague ressemble à une mère qui berce. C'est la MER Méditerranée, la grande bleue ! Les Français adorent leurs vacances à la MER, entre Côte d'Azur et Bretagne. La MER, c'est l'évasion !",
    readingMnemonicFr: "UMI sonne comme 'ou-mi' - 'OÙ est la MER ?' demande le Parisien en vacances ! KAI comme 'quai' - on attend sur le QUAI avant d'aller en MER !",
  },
  {
    character: "池",
    meaningMnemonicFr: "L'eau 氵qui reste aussi 也 en place. C'est l'ÉTANG du jardin du Luxembourg ! Les enfants y font naviguer leurs petits bateaux. Un ÉTANG parisien où les canards font coin-coin sous les marronniers.",
    readingMnemonicFr: "IKE sonne comme 'IKEA' - même IKEA a des ÉTANGS décoratifs ! CHI comme 'chi' (énergie) - l'énergie calme de l'ÉTANG.",
  },
  {
    character: "令",
    meaningMnemonicFr: "Sous le chapeau de l'autorité 人, on donne des ORDRES ! C'est Napoléon qui COMMANDE ses troupes à Austerlitz ! Un ORDRE impérial qu'on ne discute pas. 'Je donne les ORDRES ici !' clame le général français.",
    readingMnemonicFr: "REI comme 'raie' - le poisson obéit aux ORDRES de l'océan ! Ou comme 'reine' - la REINE donne des ORDRES à la cour de Versailles !",
  },

  // Level 12
  {
    character: "橋",
    meaningMnemonicFr: "Le bois 木 qui s'élève haut 喬 au-dessus de l'eau. C'est le Pont des Arts à Paris, le PONT des amoureux ! Les cadenas d'amour brillaient sur ce PONT mythique. Traverser un PONT français, c'est traverser l'Histoire !",
    readingMnemonicFr: "HASHI sonne comme 'à cheval' (hâche-i) - on traverse le PONT à cheval comme les chevaliers ! KYOU comme 'Kyoto' - les PONTS de Kyoto sont célèbres !",
  },
  {
    character: "短",
    meaningMnemonicFr: "La flèche 矢 et le haricot 豆 - une flèche aussi COURTE qu'un haricot vert français ! Les haricots verts sont COURTS et croquants. 'La vie est COURTE, mange des haricots !' dit mamie en Provence.",
    readingMnemonicFr: "MIJIKAI - 'mi-ji-kai' comme 'mis j'y vais' - c'est COURT, j'y vais vite ! TAN comme 'temps' - le TEMPS est COURT !",
  },
  {
    character: "島",
    meaningMnemonicFr: "Un oiseau 鳥 qui se pose sur une montagne 山 au milieu de la mer. C'est l'ÎLE de la Corse, l'ÎLE de Beauté ! Napoléon est né sur cette ÎLE. Les ÎLES françaises : Réunion, Martinique, paradis au milieu des océans !",
    readingMnemonicFr: "SHIMA sonne comme 'chimère' - une ÎLE de rêve, une chimère ! TOU comme 'tout' - TOUT le monde rêve d'une ÎLE déserte !",
  },
  {
    character: "道",
    meaningMnemonicFr: "La tête du chef 首 qui avance sur le CHEMIN 辶. C'est le CHEMIN de Saint-Jacques-de-Compostelle ! Les pèlerins français marchent sur ce CHEMIN sacré depuis mille ans. La VOIE, le TAO, le CHEMIN de la vie !",
    readingMnemonicFr: "MICHI sonne comme 'Michelin' - le guide qui montre le CHEMIN aux gourmands ! DOU comme 'doux' - le CHEMIN est DOUX sous les pieds !",
  },
  {
    character: "球",
    meaningMnemonicFr: "Le roi 王 du jade précieux 求. Une BALLE parfaite comme une SPHÈRE de pétanque provençale ! Les joueurs de boules à Marseille lancent leurs SPHÈRES brillantes. 'Tu tires ou tu pointes ?' La BALLE roule vers le cochonnet !",
    readingMnemonicFr: "TAMA sonne comme 'ta maman' - TA MAMAN joue à la BALLE ! KYUU comme 'cuit' - la BALLE est CUITE au four comme une poterie ronde !",
  },
  {
    character: "深",
    meaningMnemonicFr: "L'eau 氵qu'on explore 探 avec une bougie 火. C'est une grotte sous-marine PROFONDE comme les calanques de Marseille ! Les plongeurs descendent dans les eaux PROFONDES. Plus c'est PROFOND, plus c'est mystérieux !",
    readingMnemonicFr: "FUKAI - 'fou-kai' comme 'fou de la mer PROFONDE' ! SHIN comme 'chêne' - les racines du CHÊNE sont PROFONDES !",
  },
  {
    character: "悪",
    meaningMnemonicFr: "Un deuxième cœur 亜 sous le cœur 心 - un cœur MAUVAIS qui complote ! C'est le MAL incarné, comme les méchants dans les films de Jean-Pierre Jeunet. 'C'est pas bien, c'est MAUVAIS !' gronde la mère française.",
    readingMnemonicFr: "WARUI sonne comme 'oua-roui' - 'Ouah, c'est vraiment MAUVAIS !' AKU comme 'à cul' - c'est nul, MAUVAIS !",
  },
  {
    character: "野",
    meaningMnemonicFr: "La terre 里 et ce qui est donné 予 par la nature. C'est le CHAMP SAUVAGE de la Beauce ! Des hectares de blé ondulent sous le vent. La campagne française, SAUVAGE et libre, où les coquelicots rougissent les CHAMPS !",
    readingMnemonicFr: "NO comme 'nos' - NOS CHAMPS sont SAUVAGES ! YA comme 'yeah' - YEAH, vive la nature SAUVAGE !",
  },
  {
    character: "岸",
    meaningMnemonicFr: "La montagne 山 au bord de l'eau, c'est la RIVE ! Les falaises d'Étretat, cette RIVE spectaculaire de Normandie ! Les peintres impressionnistes adoraient peindre ces RIVES. Monet sur la RIVE, pinceau en main !",
    readingMnemonicFr: "KISHI sonne comme 'qui chie' - 'QUI est sur la RIVE ?' GAN comme 'gant' - mets tes GANTS pour pêcher sur la RIVE !",
  },
  {
    character: "港",
    meaningMnemonicFr: "L'eau 氵sous un toit 广 où tout est commun 共. C'est le PORT de Marseille, la porte de l'Orient ! Les bateaux arrivent au PORT chargés d'épices. 'Bienvenue au PORT !' crient les dockers en provençal.",
    readingMnemonicFr: "MINATO sonne comme 'mi-nato' - 'MIS dans le NATO' (alliance) - les PORTS sont stratégiques ! KOU comme 'coup' - un COUP de sirène annonce l'arrivée au PORT !",
  },

  // Level 13
  {
    character: "坂",
    meaningMnemonicFr: "La terre 土 en opposition 反 à la gravité. C'est la PENTE de Montmartre ! Les artistes grimpent cette PENTE pour atteindre le Sacré-Cœur. Une PENTE raide où les vélos souffrent et les mollets brûlent !",
    readingMnemonicFr: "SAKA sonne comme 'sac-à' - ton SAC À dos pèse lourd dans la PENTE ! HAN comme 'Han Solo' - même Han aurait du mal à monter cette PENTE !",
  },
  {
    character: "映",
    meaningMnemonicFr: "Le soleil 日 au centre 央 qui REFLÈTE sa lumière. C'est le cinéma français qui PROJETTE ses films ! 'Lumière !' crient les frères Lumière en inventant le cinéma. Les images se REFLÈTENT sur l'écran du Grand Rex !",
    readingMnemonicFr: "UTSURU - 'out-sou-rou' comme 'tout se REFLÈTE' ! EI comme 'hey' - HEY, regarde ce film PROJETÉ !",
  },
  {
    character: "情",
    meaningMnemonicFr: "Le cœur 忄 et le bleu 青 profond. C'est l'ÉMOTION pure, le SENTIMENT à la française ! L'amour, la passion, la mélancolie - les ÉMOTIONS qui font vibrer l'âme. Les chansons de Piaf sont pleines d'ÉMOTION !",
    readingMnemonicFr: "NASAKE sonne comme 'n'a sa queue' - un animal triste sans queue, quelle ÉMOTION ! JOU comme 'joue' - les larmes coulent sur ta JOUE d'ÉMOTION !",
  },
  {
    character: "賞",
    meaningMnemonicFr: "Le chapeau 尚 d'honneur sur le coquillage 貝 précieux. C'est le PRIX César du cinéma français ! Recevoir un PRIX sur la scène, quelle RÉCOMPENSE ! Les palmes d'or à Cannes, le plus beau PRIX !",
    readingMnemonicFr: "SHOU comme 'show' - le SHOW de la remise des PRIX ! C'est ton moment de gloire pour recevoir ta RÉCOMPENSE !",
  },
  {
    character: "森",
    meaningMnemonicFr: "Trois arbres 木木木 qui forment une FORÊT dense dans les Vosges ! Les champignons poussent, les sangliers se cachent. C'est la FORÊT française mystérieuse où le Petit Chaperon Rouge se promenait. FORÊT de Brocéliande, terre de légendes !",
    readingMnemonicFr: "MORI sonne comme 'mort-y' - dans cette FORÊT sombre, les arbres semblent morts ! SHIN comme 'chêne' - les CHÊNES dominent cette FORÊT !",
  },
  {
    character: "福",
    meaningMnemonicFr: "L'autel sacré 示 et la richesse 畐 bénie. C'est le BONHEUR à la française : du bon vin, du fromage, et la famille réunie ! La FORTUNE sourit aux audacieux. 'Santé, BONHEUR, prospérité !' trinque-t-on à la Saint-Sylvestre !",
    readingMnemonicFr: "FUKU sonne comme 'foutou' (bonheur en créole) - le BONHEUR des îles ! Ou comme 'fou-cou' - FOU de BONHEUR !",
  },
  {
    character: "料",
    meaningMnemonicFr: "Le riz 米 qu'on mesure 斗 précisément. Ce sont les FRAIS, le MATÉRIAU ! Au restaurant français, on regarde les FRAIS sur l'addition. 'C'est combien les FRAIS de livraison ?' demande le Parisien pressé.",
    readingMnemonicFr: "RYOU comme 'rio' - à RIO, les FRAIS de la vie sont élevés ! Les MATÉRIAUX coûtent cher partout !",
  },
  {
    character: "士",
    meaningMnemonicFr: "Un homme debout avec son armure - c'est le SAMOURAÏ, le GUERRIER ! Mais aussi les mousquetaires français, ces GUERRIERS du roi ! D'Artagnan, GUERRIER gascon au service de la France. 'Un pour tous, tous pour un !'",
    readingMnemonicFr: "SHI comme 'chi' (énergie) - l'énergie du GUERRIER ! Le CHI du SAMOURAÏ est puissant !",
  },
  {
    character: "器",
    meaningMnemonicFr: "Quatre bouches 口口口口 autour d'un chien 大. C'est un USTENSILE de cuisine française ! Les casseroles en cuivre, les RÉCIPIENTS de chef, le matériel des grandes cuisines. Un bon cuisinier soigne ses USTENSILES !",
    readingMnemonicFr: "UTSUWA sonne comme 'out-soua' - cet USTENSILE est OUT (démodé) ! KI comme 'qui' - QUI a pris mon RÉCIPIENT ?",
  },
  {
    character: "題",
    meaningMnemonicFr: "Le soleil 日 qui éclaire la page 頁. C'est le SUJET du jour, le TITRE du film ! 'Quel est le SUJET de la dissertation ?' demande le prof de philo. Le TITRE d'un roman de Victor Hugo !",
    readingMnemonicFr: "DAI comme 'daille' - 'Quelle DAILLE ce SUJET de maths !' C'est le TITRE du problème !",
  },
  {
    character: "億",
    meaningMnemonicFr: "La personne 亻qui a l'intention 意 de compter très haut. C'est CENT MILLIONS ! Le budget de la France en MILLIARDS ! 'Ça coûte des MILLIONS !' s'exclame le contribuable. CENT MILLIONS d'euros pour un projet fou !",
    readingMnemonicFr: "OKU comme 'OK-ou' - 'OK, ça fait CENT MILLIONS, on signe ?' Un nombre astronomique !",
  },
  {
    character: "然",
    meaningMnemonicFr: "La viande 月, le chien 犬 et le feu 灬 - c'est NATUREL comme un barbecue ! 'NATURELLEMENT !' dit le Français en haussant les épaules. C'est AINSI que ça se passe, c'est la NATURE des choses !",
    readingMnemonicFr: "ZEN comme 'zen' - sois ZEN, c'est NATUREL ! NEN comme 'N-N' (non-non) - NON, c'est pas NATUREL !",
  },
  {
    character: "練",
    meaningMnemonicFr: "Le fil 糸 tendu vers l'Est 東 comme un arc. Il faut S'ENTRAÎNER, PRATIQUER ! Les footballeurs français S'ENTRAÎNENT dur pour la Coupe du Monde. 'La PRATIQUE rend parfait !' dit le coach.",
    readingMnemonicFr: "NERU sonne comme 'nerfs' - tes NERFS sont tendus à force de t'ENTRAÎNER ! REN comme 'renne' - même le RENNE doit S'ENTRAÎNER à tirer le traîneau !",
  },
  {
    character: "詩",
    meaningMnemonicFr: "Les mots 言 du temple 寺 sacré. C'est le POÈME, la POÉSIE ! Baudelaire écrivant ses POÈMES dans un café parisien. 'Les Fleurs du Mal', POÉSIE immortelle ! La France, terre de POÉSIE et de romantisme !",
    readingMnemonicFr: "SHI comme 'chi' (poésie en japonais aussi !) - le CHI créatif du POÈTE ! Les vers qui riment, quelle magie !",
  },
  {
    character: "畑",
    meaningMnemonicFr: "Le feu 火 sur la rizière 田 - c'est un CHAMP sec, pas inondé ! Les CHAMPS de lavande en Provence brûlent sous le soleil. Les CHAMPS de blé de la Beauce ondulent comme une mer dorée !",
    readingMnemonicFr: "HATAKE sonne comme 'ha-ta-ké' - 'Ah, TA clé du CHAMP !' Le paysan a perdu sa clé dans le CHAMP !",
  },
  {
    character: "谷",
    meaningMnemonicFr: "La bouche 口 qui s'ouvre entre les montagnes 八. C'est une VALLÉE ! La VALLÉE de la Loire avec ses châteaux magnifiques ! Les rivières coulent au fond des VALLÉES françaises, entre vignobles et forêts.",
    readingMnemonicFr: "TANI sonne comme 'ta nid' - 'TA NID est dans la VALLÉE !' Les oiseaux nichent dans la VALLÉE. KOKU comme 'coque' - la COQUE d'un bateau dans la VALLÉE inondée !",
  },
  {
    character: "標",
    meaningMnemonicFr: "L'arbre 木 et le vote 票 - un SIGNE sur un arbre pour MARQUER le chemin ! Les randonneurs suivent les SIGNES dans les forêts françaises. Le GR20 en Corse avec ses MARQUES rouges et blanches !",
    readingMnemonicFr: "HYOU comme 'yo !' - 'YO, regarde le SIGNE !' La MARQUE indique le chemin !",
  },
  {
    character: "林",
    meaningMnemonicFr: "Deux arbres 木木 côte à côte - c'est un BOIS, pas encore une forêt ! Le petit BOIS derrière la maison de campagne. Les enfants jouent dans le BOIS de Boulogne. Un BOIS où l'on ramasse des champignons !",
    readingMnemonicFr: "HAYASHI sonne comme 'à yachis' - 'Ah, Y'A des BOIS partout !' RIN comme 'reine' - la REINE se promène dans le BOIS !",
  },

  // Level 14
  {
    character: "妥",
    meaningMnemonicFr: "La main 爫 sur la femme 女 qui négocie. C'est le COMPROMIS à la française ! L'art de la diplomatie, trouver un accord. 'On fait un COMPROMIS ?' propose le négociateur. La France, pays du COMPROMIS politique !",
    readingMnemonicFr: "DA comme 'da' (oui en russe) - 'DA, on fait un COMPROMIS !' Tout le monde dit oui !",
  },
  {
    character: "例",
    meaningMnemonicFr: "La personne 亻qui suit la ligne 列 établie. C'est l'EXEMPLE à suivre ! 'Par EXEMPLE...' dit le prof de français. 'Prenez EXEMPLE sur lui !' dit le patron. Un EXEMPLE de vertu !",
    readingMnemonicFr: "TATOERU sonne comme 'ta toile' - 'TA TOILE est un EXEMPLE de peinture !' REI comme 'raie' - la RAIE nage en EXEMPLE pour les autres poissons !",
  },
  {
    character: "基",
    meaningMnemonicFr: "Le dessous 其 sur la terre 土 solide. C'est la BASE, la FONDATION ! La BASE de la Tour Eiffel, ces quatre pieds massifs ! Sans FONDATION solide, tout s'écroule. 'Les BASES d'abord !' dit l'architecte.",
    readingMnemonicFr: "MOTO sonne comme 'moto' - une MOTO a besoin d'une bonne BASE pour rouler ! KI comme 'qui' - 'QUI a posé cette BASE ?'",
  },
  {
    character: "芸",
    meaningMnemonicFr: "L'herbe 艹 qui pousse vers le nuage 云. C'est l'ART, la COMPÉTENCE ! L'ART de vivre à la française, cette COMPÉTENCE culturelle ! Les artistes du Marais pratiquent leur ART. La gastronomie est un ART !",
    readingMnemonicFr: "GEI comme 'gay Paris' - l'ART fleurit dans le GAI Paris ! La ville de l'ART et de la COMPÉTENCE !",
  },
  {
    character: "参",
    meaningMnemonicFr: "Les trois 彡 rayons et les cheveux qui s'impliquent. C'est PARTICIPER ! On PARTICIPE à la fête du 14 juillet ! 'Tout le monde PARTICIPE !' crie l'animateur. PARTICIPER à la vie citoyenne française !",
    readingMnemonicFr: "MAIRU sonne comme 'ma ire' - 'MA IRE monte si je ne peux pas PARTICIPER !' SAN comme 'sans' - SANS PARTICIPER, on rate tout !",
  },
  {
    character: "的",
    meaningMnemonicFr: "Le blanc 白 et la cuillère 勺 - viser la CIBLE blanche ! C'est le BUT à atteindre ! Le tir à l'arc aux Jeux Olympiques de Paris, viser la CIBLE. 'Dans le mille, en plein dans la CIBLE !'",
    readingMnemonicFr: "MATO comme 'ma taux' - 'MA CIBLE, c'est un bon TAUX d'intérêt !' TEKI comme 'tic' - TIC, la flèche touche la CIBLE !",
  },
  {
    character: "桜",
    meaningMnemonicFr: "L'arbre 木 de la femme 女 qui danse sous les pétales. C'est le CERISIER en fleurs ! Le Jardin des Plantes en avril, les CERISIERS japonais offerts à Paris ! Les pétales roses qui volent, c'est le hanami à la française !",
    readingMnemonicFr: "SAKURA - le mot le plus beau du japonais ! Les SAKURA (CERISIERS) fleurissent ! OU comme 'où' - 'OÙ sont les CERISIERS en fleurs ?'",
  },
  {
    character: "竹",
    meaningMnemonicFr: "Les tiges qui poussent vers le ciel - c'est le BAMBOU ! Pas très français, mais on en fait des meubles design ! Le BAMBOU pousse vite, flexible mais solide. Les baguettes en BAMBOU pour manger chinois !",
    readingMnemonicFr: "TAKE sonne comme 'ta clé' - 'TA CLÉ est en BAMBOU !' Original ! CHIKU comme 'chic' - le BAMBOU, c'est CHIC !",
  },
  {
    character: "草",
    meaningMnemonicFr: "La plante 艹 du matin tôt 早. C'est l'HERBE fraîche de la rosée ! Les prairies normandes couvertes d'HERBE verte. Les vaches broutent l'HERBE qui fait le bon lait du camembert !",
    readingMnemonicFr: "KUSA sonne comme 'coussa' - 'COUSSA (casse) pas l'HERBE !' SOU comme 'sous' - l'HERBE pousse SOUS nos pieds !",
  },
  {
    character: "残",
    meaningMnemonicFr: "Le cadavre 歹 et les os 戋 - ce qui RESTE après la mort. C'est CRUEL mais vrai ! Les RESTES du festin sur la table. 'Il RESTE du fromage ?' demande le gourmand. Ce qui RESTE est parfois le meilleur !",
    readingMnemonicFr: "NOKORU sonne comme 'no-corps' - 'NO CORPS ne RESTE !' C'est parti ! ZAN comme 'zan' (zen) - RESTE ZAN (zen) !",
  },
  {
    character: "材",
    meaningMnemonicFr: "L'arbre 木 et le talent 才 brut. C'est le MATÉRIAU ! Le bois, MATÉRIAU noble des ébénistes français ! 'De quel MATÉRIAU est fait ce meuble ?' demande l'antiquaire. Le MATÉRIAU fait l'artisan !",
    readingMnemonicFr: "ZAI comme 'zaille' - 'Quelle ZAILLE ce MATÉRIAU !' (quelle tuile). Le MATÉRIAU de base !",
  },
  {
    character: "松",
    meaningMnemonicFr: "L'arbre 木 public 公 qui pousse partout. C'est le PIN ! Les PINS des Landes, cette immense forêt de PINS ! L'odeur de résine de PIN dans les forêts du Sud-Ouest. Le PIN parasol méditerranéen !",
    readingMnemonicFr: "MATSU sonne comme 'ma tsu' - 'MA TSU-nami de PINS !' Une vague de PINS ! SHOU comme 'show' - le SHOW des PINS qui dansent au vent !",
  },
  {
    character: "固",
    meaningMnemonicFr: "L'enclos 囗 et le vieux 古 - quelque chose d'ancien et DUR comme de la pierre ! Le fromage bien affiné devient DUR et SOLIDE. 'C'est DUR comme du biscuit de marin !' SOLIDE comme le roc !",
    readingMnemonicFr: "KATAI sonne comme 'qu'a-t-il' - 'QU'A-T-IL de si DUR ?' KO comme 'corps' - un CORPS SOLIDE !",
  },
  {
    character: "念",
    meaningMnemonicFr: "Le maintenant 今 dans le cœur 心. C'est le DÉSIR ardent, la PENSÉE profonde ! Le DÉSIR de réussir, cette PENSÉE qui obsède. 'J'ai une seule PENSÉE en tête !' La force du DÉSIR !",
    readingMnemonicFr: "NEN comme 'N-N' (énergique) - l'énergie du DÉSIR ! Ta PENSÉE te pousse en avant !",
  },
  {
    character: "希",
    meaningMnemonicFr: "Le croisé ✕ et le tissu 巾 précieux car RARE. C'est l'ESPOIR, ce qui est RARE et précieux ! L'ESPOIR fait vivre, dit-on. Un trésor RARE comme l'ESPOIR d'un rêve. 'Gardez ESPOIR !' dit le sage.",
    readingMnemonicFr: "KI comme 'qui' - 'QUI a encore de l'ESPOIR ?' Celui qui espère le RARE !",
  },
  {
    character: "能",
    meaningMnemonicFr: "Le mois 月 et les pattes d'ours 匕 - la CAPACITÉ de l'ours ! C'est le TALENT, la CAPACITÉ naturelle ! 'Il a la CAPACITÉ de réussir !' Son TALENT est indéniable !",
    readingMnemonicFr: "NOU comme 'nous' - 'NOUS avons la CAPACITÉ !' Le TALENT est en NOUS !",
  },
  {
    character: "卒",
    meaningMnemonicFr: "Le dix 十 et les vêtements 衣 de cérémonie. C'est DIPLÔMER, FINIR ses études ! La remise des diplômes à la Sorbonne, chapeau carré sur la tête ! 'Je suis DIPLÔMÉ !' crie l'étudiant heureux.",
    readingMnemonicFr: "SOTSU comme 'sauts' - des SAUTS de joie en étant DIPLÔMÉ ! On a FINI !",
  },
  {
    character: "格",
    meaningMnemonicFr: "L'arbre 木 et chaque 各 niveau. C'est le STATUT, le RANG ! Les grades de l'armée française, chaque RANG a son importance. Le STATUT social à Versailles, crucial ! Un RANG élevé !",
    readingMnemonicFr: "KAKU comme 'caque' - 'Chaque CAQUE (tonneau) a son RANG !' Le STATUT du grand cru !",
  },
  {
    character: "田",
    meaningMnemonicFr: "Un carré divisé en quatre - c'est la RIZIÈRE vue du ciel ! Les RIZIÈRES en terrasse, paysage d'Asie. Mais aussi les champs français divisés en parcelles. La RIZIÈRE nourrit des milliards de gens !",
    readingMnemonicFr: "TA comme 'ta' - 'TA RIZIÈRE est belle !' DEN comme 'dense' - les plants de riz sont DENSES dans la RIZIÈRE !",
  },
  {
    character: "雰",
    meaningMnemonicFr: "La pluie 雨 et le partage 分 de l'air. C'est l'ATMOSPHÈRE ! L'ATMOSPHÈRE d'un café parisien, ce je-ne-sais-quoi ! 'Quelle ATMOSPHÈRE dans ce bistrot !' L'ATMOSPHÈRE fait tout le charme d'un lieu !",
    readingMnemonicFr: "FUN comme 'fun' - l'ATMOSPHÈRE est FUN ! C'est l'ambiance qui rend tout agréable !",
  },
  {
    character: "周",
    meaningMnemonicFr: "Le couvercle 冂 et la bouche 口 qui fait le TOUR. C'est faire le TOUR complet, les ALENTOURS ! Faire le TOUR de France à vélo ! 'Regardez aux ALENTOURS !' dit le guide touristique.",
    readingMnemonicFr: "MAWARI sonne comme 'ma-oua-ri' - 'MA voiture fait le TOUR !' SHUU comme 'chou' - le CHOU est rond, il fait le TOUR !",
  },

  // Level 15
  {
    character: "司",
    meaningMnemonicFr: "L'enclos 𠃌 avec une bouche 口 qui donne des ordres. C'est DIRIGER, être OFFICIER ! Le commandant qui DIRIGE son navire. 'Je DIRIGE les opérations !' dit l'OFFICIER français.",
    readingMnemonicFr: "SHI comme 'chi' (leader en qi) - le CHI du chef qui DIRIGE ! L'énergie de l'OFFICIER !",
  },
  {
    character: "式",
    meaningMnemonicFr: "Le travail 工 qu'on couvre 弋 de formalités. C'est la CÉRÉMONIE, le STYLE ! Une CÉRÉMONIE de mariage à la mairie française ! Le STYLE Empire de Napoléon, quelle classe !",
    readingMnemonicFr: "SHIKI comme 'chic-y' - la CÉRÉMONIE est CHIC ! Le STYLE français !",
  },
  {
    character: "列",
    meaningMnemonicFr: "Le cadavre 歹 et le couteau 刂 - alignés en RANGÉE comme à la boucherie ! C'est la FILE d'attente devant une boulangerie ! 'Faites la RANGÉE !' dit le boulanger aux clients.",
    readingMnemonicFr: "RETSU comme 'reste' - 'RESTE dans la RANGÉE !' Ne dépasse pas dans la FILE !",
  },
  {
    character: "帰",
    meaningMnemonicFr: "Le balai 帚 et la femme qui rentre 帚 - c'est RETOURNER chez soi ! Après le travail, on RETOURNE à la maison. 'Je RENTRE !' dit le Parisien épuisé par le métro.",
    readingMnemonicFr: "KAERU sonne comme 'qu'à-eu-rue' - 'QU'À-t-il EU en RUE pour RENTRER si vite ?' KI comme 'qui' - 'QUI RETOURNE à la maison ?'",
  },
  {
    character: "寺",
    meaningMnemonicFr: "La terre 土 et le pouce 寸 qui mesure le sacré. C'est le TEMPLE ! Les TEMPLES bouddhistes qu'on visite au Japon. Mais aussi les églises romanes françaises, nos TEMPLES à nous !",
    readingMnemonicFr: "TERA sonne comme 'terrasse' - la TERRASSE du TEMPLE où on médite ! JI comme 'j'y' - 'J'Y vais, au TEMPLE !'",
  },
  {
    character: "術",
    meaningMnemonicFr: "Le chemin 行 et le grain 朮 de savoir-faire. C'est l'ART, la TECHNIQUE ! L'ART culinaire français, une TECHNIQUE millénaire ! Les TECHNIQUES des maîtres artisans. 'C'est tout un ART !' dit le chef.",
    readingMnemonicFr: "JUTSU comme 'juste' - la TECHNIQUE JUSTE ! L'ART précis !",
  },
  {
    character: "実",
    meaningMnemonicFr: "Le toit 宀 sur le prix 貫 - la RÉALITÉ concrète, le FRUIT du travail ! Le FRUIT mûr qu'on récolte. 'Les FRUITS de mes efforts !' La RÉALITÉ dépasse la fiction !",
    readingMnemonicFr: "MI comme 'mis' - 'MIS en RÉALITÉ, c'est le FRUIT de ton travail !' JITSU comme 'juste' - la RÉALITÉ, JUSTE les faits !",
  },
  {
    character: "技",
    meaningMnemonicFr: "La main 扌 et le support 支 du savoir-faire. C'est la TECHNIQUE, la COMPÉTENCE ! Les TECHNIQUES des artisans français, transmises de génération en génération. Une COMPÉTENCE rare !",
    readingMnemonicFr: "WAZA sonne comme 'ouah-za' - 'OUAH, quelle TECHNIQUE !' GI comme 'j'y' - 'J'Y mets ma COMPÉTENCE !'",
  },
  {
    character: "葉",
    meaningMnemonicFr: "La plante 艹 du monde 世 qui respire. C'est la FEUILLE ! Les FEUILLES d'automne dans les jardins du Luxembourg, rouges et dorées ! Les FEUILLES de vigne qui enveloppent le fromage.",
    readingMnemonicFr: "HA comme 'ah' - 'AH, quelle belle FEUILLE !' YOU comme 'you' - 'YOU want this FEUILLE ?' pour un herbier !",
  },
  {
    character: "花",
    meaningMnemonicFr: "La plante 艹 qui change 化 de beauté. C'est la FLEUR ! Les FLEURS du marché aux fleurs de l'Île de la Cité ! Les bouquets français, art de la composition florale. 'Des FLEURS pour madame !'",
    readingMnemonicFr: "HANA sonne comme 'Anna' - 'ANNA adore les FLEURS !' KA comme 'cas' - 'En CAS de tristesse, offre des FLEURS !'",
  },
  {
    character: "晩",
    meaningMnemonicFr: "Le soleil 日 qui se fait exempter 免 de briller. C'est le SOIR ! Le SOIR à Paris quand les lumières s'allument. 'Ce SOIR, on sort !' dit le Parisien. Le dîner du SOIR, rituel sacré !",
    readingMnemonicFr: "BAN comme 'bonne' - 'BONNE SOIRÉE !' C'est le SOIR qui commence !",
  },
  {
    character: "仏",
    meaningMnemonicFr: "La personne 亻 et le privé 厶 - celui qui médite en privé. C'est BOUDDHA ! Les statues de BOUDDHA dans les musées parisiens. Le zen BOUDDHISTE qui fascine les Français en quête de sérénité.",
    readingMnemonicFr: "HOTOKE sonne comme 'hôte-OK' - 'L'HÔTE est OK, c'est BOUDDHA !' BUTSU comme 'boutche' - le BOUCHE-à-bouche spirituel de BOUDDHA !",
  },
  {
    character: "軍",
    meaningMnemonicFr: "Le véhicule 車 sous un couvercle 冖 de protection. C'est l'ARMÉE ! L'ARMÉE française qui défile sur les Champs-Élysées le 14 juillet ! Les chars de l'ARMÉE, impressionnants !",
    readingMnemonicFr: "GUN comme 'gun' - les GUNS de l'ARMÉE ! Les armes militaires !",
  },
  {
    character: "英",
    meaningMnemonicFr: "L'herbe 艹 au centre 央 de l'excellence. C'est ANGLAIS mais aussi EXCELLENT ! 'L'ANGLAIS est une langue excellente !' L'excellence française rivalise avec l'ANGLAISE !",
    readingMnemonicFr: "EI comme 'hey' - 'HEY, tu parles ANGLAIS ?' C'est EXCELLENT !",
  },
  {
    character: "紀",
    meaningMnemonicFr: "Le fil 糸 de soi-même 己 à travers le temps. C'est l'ÈRE, le SIÈCLE ! Le 21ème SIÈCLE, notre ÈRE numérique ! 'L'ÈRE des Lumières', SIÈCLE français glorieux !",
    readingMnemonicFr: "KI comme 'qui' - 'QUI vivra au prochain SIÈCLE ?' L'ÈRE qui vient !",
  },
  {
    character: "浅",
    meaningMnemonicFr: "L'eau 氵 et les deux 戔 pieds qui touchent le fond. C'est PEU PROFOND ! La mer PEU PROFONDE où les enfants jouent. 'L'eau est PEU PROFONDE ici, pas de danger !'",
    readingMnemonicFr: "ASAI sonne comme 'assez' - 'ASSEZ PEU PROFOND pour moi !' SEN comme 'sans' - SANS profondeur !",
  },
  {
    character: "根",
    meaningMnemonicFr: "L'arbre 木 qui s'étend 艮 dans la terre. C'est la RACINE ! Les RACINES des platanes parisiens qui soulèvent les trottoirs ! Retour aux RACINES, aux origines françaises.",
    readingMnemonicFr: "NE comme 'nez' - le NEZ de l'arbre, c'est ses RACINES ! KON comme 'con' - 'CON-naître ses RACINES !'",
  },
  {
    character: "毒",
    meaningMnemonicFr: "La mère 母 et le bizarre 毋 - un cadeau empoisonné ! C'est le POISON ! Les champignons vénéneux dans les forêts françaises, attention au POISON ! 'C'est du POISON !' crie le detective.",
    readingMnemonicFr: "DOKU comme 'dock' - au DOCK, méfie-toi du POISON dans les cargaisons !",
  },
  {
    character: "昨",
    meaningMnemonicFr: "Le soleil 日 et faire 乍 dans le passé. C'est HIER ! 'HIER, j'ai mangé au restaurant.' HIER semble si loin ! La nostalgie d'HIER à Paris.",
    readingMnemonicFr: "SAKU comme 'sac' - 'J'ai laissé mon SAC HIER !' Où était-ce déjà ?",
  },
  {
    character: "峠",
    meaningMnemonicFr: "La montagne 山 avec le haut 上 et le bas 下 - c'est le COL de montagne ! Le COL du Tourmalet dans les Pyrénées ! Les cyclistes du Tour de France souffrent dans les COLS !",
    readingMnemonicFr: "TOUGE sonne comme 'tou-je' - 'TOUS, JE vous attends au COL !' Le sommet du COL !",
  },

  // Level 16
  {
    character: "浴",
    meaningMnemonicFr: "L'eau 氵 de la vallée 谷. C'est SE BAIGNER ! Se BAIGNER dans les thermes français, quelle détente ! Vichy, Evian, les stations thermales où l'on se BAIGNE.",
    readingMnemonicFr: "ABIRU sonne comme 'à boire' - 'À BOIRE ou à se BAIGNER ?' Les deux ! YOKU comme 'yak' - même le YAK se BAIGNE !",
  },
  {
    character: "書",
    meaningMnemonicFr: "Le pinceau 聿 et le soleil 日 qui éclaire la page. C'est ÉCRIRE ! ÉCRIRE à la plume comme les grands auteurs français ! Balzac qui ÉCRIT ses romans la nuit. L'art d'ÉCRIRE à la française !",
    readingMnemonicFr: "KAKU sonne comme 'caque' - 'CAQUE (tonneau) rempli d'encre pour ÉCRIRE !' SHO comme 'show' - le SHOW de l'ÉCRITURE !",
  },
  {
    character: "関",
    meaningMnemonicFr: "La porte 門 avec le ciel 天 au-dessus. C'est la RELATION, la BARRIÈRE ! Les RELATIONS diplomatiques françaises. La BARRIÈRE de péage sur l'autoroute !",
    readingMnemonicFr: "KAN comme 'quand' - 'QUAND la RELATION sera-t-elle meilleure ?' SEKI comme 'c'est qui' - 'C'EST QUI à la BARRIÈRE ?'",
  },
  {
    character: "辞",
    meaningMnemonicFr: "La langue 舌 et le vêtement 辛 qu'on enlève. C'est DÉMISSIONNER, c'est un MOT du dictionnaire ! 'Je DÉMISSIONNE !' dit le ministre. Les MOTS du dictionnaire Larousse.",
    readingMnemonicFr: "YAMERU sonne comme 'y'a mer' - 'Y'A MER à traverser après avoir DÉMISSIONNÉ !' JI comme 'j'y' - 'J'Y vais, je DÉMISSIONNE !'",
  },
  {
    character: "弁",
    meaningMnemonicFr: "Le chapeau 厶 et la force 力 des mots. C'est PARLER avec éloquence, c'est une VALVE ! L'avocat qui PARLE au tribunal. La VALVE qui régule le flux.",
    readingMnemonicFr: "BEN comme 'bien' - 'BIEN PARLÉ !' L'éloquence française !",
  },
  {
    character: "犬",
    meaningMnemonicFr: "Le grand 大 avec un point - c'est le CHIEN fidèle ! Le CHIEN qui garde la maison française. Le berger allemand, le caniche royal - les CHIENS de France !",
    readingMnemonicFr: "INU sonne comme 'inouï' - 'INOUÏ comme ce CHIEN est fidèle !' KEN comme 'Ken' - KEN a un CHIEN !",
  },
  {
    character: "阪",
    meaningMnemonicFr: "La colline 阝 et l'opposé 反 - la PENTE d'Osaka ! Cette PENTE japonaise célèbre. Les pentes de Lyon, la 'ville aux deux collines', notre Osaka français !",
    readingMnemonicFr: "HAN comme 'Han' - 'HAN Solo descendrait cette PENTE à Osaka !'",
  },
  {
    character: "冗",
    meaningMnemonicFr: "Le toit 冖 et le grand 几 espace vide. C'est SUPERFLU ! Trop de place, trop de tout. 'C'est SUPERFLU !' dit Marie Kondo à la française. Le minimalisme contre le SUPERFLU !",
    readingMnemonicFr: "JOU comme 'joue' - trop de JOUES, c'est SUPERFLU ! Un seul visage suffit !",
  },
  {
    character: "冒",
    meaningMnemonicFr: "Le soleil 日 sur l'œil 目 qui s'aveugle. C'est RISQUER ! RISQUER sa vie comme les aventuriers français ! 'Je RISQUE le tout pour le tout !' L'audace de RISQUER !",
    readingMnemonicFr: "BOU comme 'bout' - au BOUT du RISQUE, la victoire ! RISQUER jusqu'au BOUT !",
  },
  {
    character: "専",
    meaningMnemonicFr: "Le dix 十 dans un champ 田 unique. C'est se SPÉCIALISER ! 'Je me SPÉCIALISE en fromages français !' L'art de se SPÉCIALISER dans un domaine.",
    readingMnemonicFr: "SEN comme 'sans' - SANS se SPÉCIALISER, on reste amateur !",
  },
  {
    character: "険",
    meaningMnemonicFr: "La colline 阝 et l'ensemble 僉 de dangers. C'est DANGEREUX ! Les montagnes DANGEREUSES des Alpes ! 'Attention, c'est DANGEREUX !' crie le guide de haute montagne.",
    readingMnemonicFr: "KEN comme 'Ken' - 'KEN, c'est DANGEREUX par là !' Attention !",
  },
  {
    character: "鳥",
    meaningMnemonicFr: "L'OISEAU avec sa tête, son corps et ses plumes ! Les OISEAUX du Jardin des Tuileries, pigeons et moineaux. L'OISEAU qui chante au petit matin parisien !",
    readingMnemonicFr: "TORI sonne comme 'tory' - le TORY (conservateur) observe les OISEAUX ! CHOU comme 'chou' - l'OISEAU picore le CHOU !",
  },
  {
    character: "貝",
    meaningMnemonicFr: "Le COQUILLAGE avec ses deux valves ! Les COQUILLAGES des plages bretonnes, moules et huîtres ! Le COQUILLAGE qu'on ramasse à marée basse. Autrefois monnaie, le COQUILLAGE précieux !",
    readingMnemonicFr: "KAI comme 'quai' - sur le QUAI, on vend des COQUILLAGES ! BAI comme 'baie' - dans la BAIE, plein de COQUILLAGES !",
  },
  {
    character: "虫",
    meaningMnemonicFr: "L'INSECTE qui rampe avec ses pattes ! Les INSECTES de la campagne française, grillons et cigales. L'INSECTE qui chante dans la Provence estivale !",
    readingMnemonicFr: "MUSHI sonne comme 'mouche-i' - la MOUCHE est un INSECTE ! CHUU comme 'tchou' - le train TCHOU-TCHOU écrase l'INSECTE !",
  },
  {
    character: "留",
    meaningMnemonicFr: "Le champ 田 et le couteau 刂 qui ancre. C'est RESTER, RETENIR ! 'Je RESTE en France !' L'étudiant qui RESTE pour ses études. RETENIR sa place !",
    readingMnemonicFr: "TOMERU sonne comme 'to-mer' - 'TO MER et RESTER !' RYUU comme 'rieur' - le RIEUR qui RESTE longtemps !",
  },
  {
    character: "魚",
    meaningMnemonicFr: "Le POISSON avec sa tête, son corps et sa queue ! Le POISSON du marché de Rungis, frais du matin ! Les POISSONS de la Méditerranée : loup, daurade, rouget !",
    readingMnemonicFr: "SAKANA - le POISSON qu'on mange au Japon ! GYO comme 'jeu' - le JEU de la pêche au POISSON !",
  },
  {
    character: "面",
    meaningMnemonicFr: "L'enclos 囗 avec la tête 首 à l'intérieur. C'est la SURFACE, le VISAGE ! La SURFACE d'un tableau au Louvre. Le VISAGE souriant de la Joconde, SURFACE la plus célèbre du monde !",
    readingMnemonicFr: "MEN comme 'main' - la MAIN touche le VISAGE ! OMO comme 'homo' - chaque HOMO SAPIENS a un VISAGE !",
  },
  {
    character: "典",
    meaningMnemonicFr: "Le livre 冊 sur la table 八. C'est un CLASSIQUE ! Les CLASSIQUES de la littérature française : Molière, Hugo, Zola ! Un chef-d'œuvre CLASSIQUE qu'on étudie au lycée.",
    readingMnemonicFr: "TEN comme 'temps' - les CLASSIQUES traversent le TEMPS ! Immortels !",
  },
  {
    character: "治",
    meaningMnemonicFr: "L'eau 氵 et le plateau 台 d'équilibre. C'est GOUVERNER, GUÉRIR ! Louis XIV qui GOUVERNE la France. Le médecin qui GUÉRIT avec des eaux thermales !",
    readingMnemonicFr: "OSAMERU sonne comme 'aux-sa-mer' - 'AUX bords de la MER, on GUÉRIT !' JI/CHI comme 'j'y' - 'J'Y GOUVERNE !'",
  },
  {
    character: "荷",
    meaningMnemonicFr: "L'herbe 艹 et ce qui 何 pèse. C'est le BAGAGE, la CHARGE ! Le BAGAGE du voyageur français, toujours trop lourd ! 'Quelle CHARGE ces valises !' râle le touriste.",
    readingMnemonicFr: "NI comme 'nid' - le NID est un BAGAGE pour l'oiseau ! KA comme 'cas' - 'En CAS de voyage, prépare tes BAGAGES !'",
  },
  {
    character: "幸",
    meaningMnemonicFr: "Le sol 土 et le travail qui apporte le BONHEUR ! Le BONHEUR simple des choses : un bon repas, des amis. 'Le BONHEUR est dans le pré !' chante le Français heureux !",
    readingMnemonicFr: "SHIAWASE - le BONHEUR en japonais, un mot précieux ! KOU comme 'coup' - un COUP de chance, quel BONHEUR !",
  },
  {
    character: "取",
    meaningMnemonicFr: "L'oreille 耳 et la main 又 qui saisit. C'est PRENDRE ! PRENDRE quelqu'un par l'oreille, à la française ! 'Je PRENDS ce fromage !' dit le client au marché.",
    readingMnemonicFr: "TORU sonne comme 'taureau' - le TAUREAU PREND ses cornes ! SHU comme 'chou' - PRENDS ce CHOU !",
  },
  {
    character: "門",
    meaningMnemonicFr: "Les deux battants qui s'ouvrent - c'est la PORTE ! La PORTE de Versailles, la PORTE Saint-Denis ! Les grandes PORTES de Paris, entrées majestueuses !",
    readingMnemonicFr: "MON comme 'mont' - la PORTE du MONT-Saint-Michel ! KADO comme 'cadeau' - le CADEAU passe par la PORTE !",
  },

  // Level 17
  {
    character: "席",
    meaningMnemonicFr: "Le bâtiment 广 et le tissu 巾 où l'on s'assoit. C'est le SIÈGE, la PLACE ! Le SIÈGE réservé à l'Opéra de Paris. 'Cette PLACE est prise !' Une PLACE de choix !",
    readingMnemonicFr: "SEKI comme 'c'est qui' - 'C'EST QUI sur mon SIÈGE ?' Ma PLACE !",
  },
  {
    character: "側",
    meaningMnemonicFr: "La personne 亻 et le règle 則 à côté. C'est le CÔTÉ ! 'De quel CÔTÉ es-tu ?' Le CÔTÉ gauche de la Seine, le CÔTÉ droit !",
    readingMnemonicFr: "GAWA comme 'gavé' - 'GAVÉ d'être de ce CÔTÉ !' SOKU comme 'saucisse' - la SAUCISSE de ce CÔTÉ-là !",
  },
  {
    character: "鼻",
    meaningMnemonicFr: "Le soi-même 自 et le champ 田 où l'on respire. C'est le NEZ ! Le NEZ du sommelier qui hume le vin. Le grand NEZ de Cyrano de Bergerac, fierté française !",
    readingMnemonicFr: "HANA sonne comme 'Anna' - 'ANNA a un joli NEZ !' BI comme 'bi' - le BI-spectacle du NEZ qui renifle !",
  },
  {
    character: "細",
    meaningMnemonicFr: "Le fil 糸 et le champ 田 minuscule. C'est FIN, DÉTAILLÉ ! Les broderies FINES des dentellières françaises. Un travail DÉTAILLÉ et minutieux !",
    readingMnemonicFr: "HOSOI sonne comme 'oh-soi' - 'OH, SOI-gne les détails FINS !' SAI comme 'scie' - la SCIE coupe FIN !",
  },
  {
    character: "原",
    meaningMnemonicFr: "La falaise 厂 et la source 泉 qui jaillit. C'est l'ORIGINE, la PLAINE ! L'ORIGINE du monde de Courbet ! Les PLAINES de la Beauce, origine du blé français !",
    readingMnemonicFr: "HARA sonne comme 'haras' - le HARAS dans la PLAINE ! GEN comme 'gène' - le GÈNE de l'ORIGINE !",
  },
  {
    character: "豚",
    meaningMnemonicFr: "La viande 月 de l'animal au museau. C'est le COCHON ! Le COCHON qui fait le jambon de Bayonne ! Le COCHON rose des fermes françaises, base de la charcuterie !",
    readingMnemonicFr: "BUTA comme 'bouta' - 'BOUTA (bout à) oreilles, c'est le COCHON !' TON comme 'thon' - pas THON, mais COCHON !",
  },
  {
    character: "馬",
    meaningMnemonicFr: "Le CHEVAL au galop avec sa crinière ! Le CHEVAL de course à Longchamp ! Le CHEVAL blanc de Camargue, sauvage et libre ! Les chevaux de trait du Perche !",
    readingMnemonicFr: "UMA sonne comme 'ou-ma' - 'OÙ est MA jument ?' Un beau CHEVAL ! BA comme 'bas' - le CHEVAL a les pattes BAS !",
  },
  {
    character: "羊",
    meaningMnemonicFr: "Le MOUTON avec ses cornes bouclées ! Le MOUTON qui donne la laine pour les pulls bretons ! Les MOUTONS de pré-salé du Mont-Saint-Michel, délicieux !",
    readingMnemonicFr: "HITSUJI sonne comme 'il-tsu-ji' - 'IL a TSU (tous) ses MOUTONS !' YOU comme 'you' - 'YOU like MOUTON ?'",
  },
  {
    character: "牛",
    meaningMnemonicFr: "La VACHE avec ses cornes ! La VACHE normande qui fait le camembert ! La VACHE charolaise pour le bœuf bourguignon ! Les VACHES sacrées de la campagne française !",
    readingMnemonicFr: "USHI sonne comme 'ou-chi' - 'OÙ est la VACHE, CHÉRI ?' GYUU comme 'gue-you' - 'GUE-YOU want VACHE ?'",
  },
  {
    character: "猫",
    meaningMnemonicFr: "L'animal 犭 des champs 苗. C'est le CHAT ! Le CHAT noir qui porte bonheur (ou malheur) ! Les CHATS de gouttière de Paris. Le CHAT de concierge qui surveille tout !",
    readingMnemonicFr: "NEKO sonne comme 'nez-ko' - le CHAT a un petit NEZ ! BYOU comme 'bio' - le CHAT mange BIO !",
  },
  {
    character: "常",
    meaningMnemonicFr: "Le chapeau 尚 et le tissu 巾 qu'on porte TOUJOURS. C'est NORMAL, TOUJOURS pareil ! 'C'est NORMAL !' dit le Français blasé. TOUJOURS la même routine !",
    readingMnemonicFr: "TSUNE sonne comme 'tsou-né' - 'TSOU-JOURS NORMAL !' JOU comme 'joue' - TOUJOURS la même JOUE qui sourit !",
  },
  {
    character: "因",
    meaningMnemonicFr: "L'enclos 囗 et le grand 大 effet. C'est la CAUSE ! 'Quelle est la CAUSE du problème ?' enquête le commissaire français. La CAUSE et l'effet !",
    readingMnemonicFr: "IN comme 'in' - 'IN' vestigation sur la CAUSE ! Cherche la CAUSE !",
  },
  {
    character: "無",
    meaningMnemonicFr: "Le feu 灬 et le rien qui brûle 舞. C'est RIEN, SANS ! RIEN du tout ! 'Je n'ai RIEN fait !' plaide l'accusé. SANS argent, SANS souci. Le vide, le NÉANT !",
    readingMnemonicFr: "NAI sonne comme 'naille' - 'NAILLE (rien) à faire !' MU comme 'mou' - MOU comme RIEN ! BU comme 'bou' - BOUH, y'a RIEN !",
  },
  {
    character: "果",
    meaningMnemonicFr: "Le champ 田 sur l'arbre 木. C'est le FRUIT, le RÉSULTAT ! Le FRUIT du verger français : pommes, poires, cerises ! Le RÉSULTAT de ton travail, voilà le FRUIT !",
    readingMnemonicFr: "HATERU sonne comme 'à terre' - le FRUIT tombe À TERRE ! KA comme 'cas' - le RÉSULTAT dans ce CAS !",
  },
  {
    character: "兵",
    meaningMnemonicFr: "Le drap 丘 et le huit 八 - les soldats rangés. C'est le SOLDAT ! Les SOLDATS de la Grande Armée de Napoléon ! Le SOLDAT inconnu sous l'Arc de Triomphe.",
    readingMnemonicFr: "HEI comme 'hey' - 'HEY SOLDAT, au garde-à-vous !'",
  },

  // Level 18
  {
    character: "種",
    meaningMnemonicFr: "Le riz 禾 et le lourd 重. C'est la GRAINE, le TYPE ! Les GRAINES qu'on plante au potager. Un TYPE de fromage parmi les 400 TYPES français !",
    readingMnemonicFr: "TANE sonne comme 'ta nez' - 'TA NEZ sent cette GRAINE ?' SHU comme 'chou' - le CHOU vient d'une GRAINE !",
  },
  {
    character: "洗",
    meaningMnemonicFr: "L'eau 氵 et le premier 先. C'est LAVER ! LAVER le linge à la main comme autrefois ! 'Je LAVE ma voiture tous les dimanches !' Le lavoir où les femmes LAVAIENT.",
    readingMnemonicFr: "ARAU sonne comme 'à raout' - 'À RAOUT (fête), il faut se LAVER !' SEN comme 'sans' - SANS te LAVER, tu pues !",
  },
  {
    character: "可",
    meaningMnemonicFr: "La bouche 口 et le pouvoir 丁. C'est POSSIBLE ! 'C'est POSSIBLE !' dit l'optimiste français. Tout est POSSIBLE avec de la volonté !",
    readingMnemonicFr: "KA comme 'cas' - 'En CAS de besoin, c'est POSSIBLE !'",
  },
  {
    character: "許",
    meaningMnemonicFr: "Les mots 言 du midi 午. C'est PERMETTRE ! 'Je te PERMETS d'y aller !' L'autorisation de PERMETTRE, le pardon !",
    readingMnemonicFr: "YURUSU sonne comme 'you-rousse' - 'YOU ROUSSE, je te PERMETS !' KYO comme 'kyo' (aujourd'hui) - 'Aujourd'hui, je PERMETS !'",
  },
  {
    character: "禁",
    meaningMnemonicFr: "L'autel 示 et le bois 林 qu'on ne touche pas. C'est INTERDIRE ! 'INTERDIT de fumer !' 'Stationnement INTERDIT !' Les panneaux français qui INTERDISENT !",
    readingMnemonicFr: "KIN comme 'kin' (parent) - même les PARENTS peuvent INTERDIRE !",
  },
  {
    character: "狼",
    meaningMnemonicFr: "L'animal 犭 bon 良 et méchant. C'est le LOUP ! Le LOUP des contes de Perrault ! Le LOUP du Gévaudan, terreur de la France ! 'Attention au LOUP !' crie le berger.",
    readingMnemonicFr: "OOKAMI - le grand LOUP japonais ! ROU comme 'roux' - le LOUP ROUX des forêts !",
  },
  {
    character: "狐",
    meaningMnemonicFr: "L'animal 犭 et le melon 瓜 qu'il vole. C'est le RENARD ! Le RENARD rusé des fables de La Fontaine ! 'Maître RENARD, par l'odeur alléché...'",
    readingMnemonicFr: "KITSUNE - le RENARD magique japonais ! KO comme 'co' - le CO-pain du RENARD !",
  },
  {
    character: "象",
    meaningMnemonicFr: "L'ÉLÉPHANT majestueux avec sa trompe ! L'ÉLÉPHANT du zoo de Vincennes ! 'Grand comme un ÉLÉPHANT !' dit-on pour exagérer.",
    readingMnemonicFr: "ZOU comme 'zou' - 'ALLEZ ZOU, l'ÉLÉPHANT !' SHOU comme 'show' - le SHOW de l'ÉLÉPHANT au cirque !",
  },
  {
    character: "熊",
    meaningMnemonicFr: "L'OURS des montagnes avec sa fourrure 能 et le feu 灬. L'OURS des Pyrénées, espèce protégée ! L'OURS qui hiberne dans sa tanière française.",
    readingMnemonicFr: "KUMA sonne comme 'cou-ma' - 'COU MA mère, un OURS !' YUU comme 'you' - 'YOU voir l'OURS ?'",
  },

  // Level 19
  {
    character: "加",
    meaningMnemonicFr: "La force 力 et la bouche 口 qui s'AJOUTENT. C'est AJOUTER ! 'J'AJOUTE du sel !' dit le chef français. AJOUTER une pincée de ceci, un soupçon de cela !",
    readingMnemonicFr: "KUWAERU sonne comme 'couvert' - AJOUTER un COUVERT à table ! KA comme 'cas' - en CAS de besoin, AJOUTER !",
  },
  {
    character: "乱",
    meaningMnemonicFr: "La langue 舌 et le crochet 乚 qui emmêle tout. C'est le DÉSORDRE ! Le DÉSORDRE dans la chambre d'ado français ! 'Quel DÉSORDRE ici !' gronde la mère.",
    readingMnemonicFr: "MIDARERU sonne comme 'mi-da-ré' - 'MIS DAnS le DÉSORDRE !' RAN comme 'rang' - plus de RANG, c'est le DÉSORDRE !",
  },
  {
    character: "財",
    meaningMnemonicFr: "Le coquillage 貝 précieux et le talent 才. C'est la RICHESSE ! La RICHESSE de la France : son patrimoine, sa culture ! 'La RICHESSE ne fait pas le bonheur !' (mais elle aide).",
    readingMnemonicFr: "ZAI comme 'zaille' - 'Quelle ZAILLE cette RICHESSE !' (quelle tuile d'être riche !).",
  },
  {
    character: "雀",
    meaningMnemonicFr: "Le petit 少 oiseau 隹. C'est le MOINEAU ! Les MOINEAUX de Paris qui picorent les miettes ! Le petit MOINEAU qui chante sur le balcon.",
    readingMnemonicFr: "SUZUME sonne comme 'sou-zou-mé' - 'SOUS ZOO, c'est MÉ (moi) qui nourris les MOINEAUX !' JAKU comme 'Jacques' - JACQUES aime les MOINEAUX !",
  },
  {
    character: "歴",
    meaningMnemonicFr: "La falaise 厂 et les grains de riz 禾 du passé. C'est l'HISTOIRE ! L'HISTOIRE de France, si riche ! Les cours d'HISTOIRE au lycée français.",
    readingMnemonicFr: "REKI comme 'réqui' - le REQUIEM de l'HISTOIRE ! Les leçons du passé !",
  },
  {
    character: "善",
    meaningMnemonicFr: "Le mouton 羊 et la parole 言 douces. C'est le BIEN, ce qui est BON ! 'Le BIEN triomphe toujours !' dit l'optimiste. Faire le BIEN autour de soi !",
    readingMnemonicFr: "YOI sonne comme 'yoyo' - le YOYO du BIEN qui monte ! ZEN comme 'zen' - le ZEN, c'est le BIEN !",
  },
  {
    character: "容",
    meaningMnemonicFr: "Le toit 宀 et la vallée 谷 qui CONTIENT. C'est CONTENIR ! Ce sac CONTIENT des croissants ! 'Que CONTIENT cette boîte mystère ?'",
    readingMnemonicFr: "YOU comme 'you' - 'YOU CONTIENS quoi ?' Le récipient qui CONTIENT !",
  },
  {
    character: "改",
    meaningMnemonicFr: "Le soi-même 己 qu'on frappe 攵 pour changer. C'est RÉFORMER ! Les RÉFORMES françaises, toujours controversées ! 'Il faut RÉFORMER le système !' crie le politique.",
    readingMnemonicFr: "ARATAMERU sonne comme 'à ra-ta-mé' - 'À RATA MER (à la mer), on RÉFORME !' KAI comme 'quai' - sur le QUAI, on discute des RÉFORMES !",
  },
  {
    character: "蛙",
    meaningMnemonicFr: "L'insecte 虫 de la terre 圭. C'est la GRENOUILLE ! Les GRENOUILLES des marais français ! Les cuisses de GRENOUILLES, spécialité française que les Anglais trouvent bizarre !",
    readingMnemonicFr: "KAERU sonne comme 'qu'à l'heure' - la GRENOUILLE coasse QU'À L'HEURE de la pluie !",
  },
  {
    character: "得",
    meaningMnemonicFr: "Le chemin 彳 et le jour 旦 qui rapporte. C'est OBTENIR, GAGNER ! 'J'ai OBTENU mon diplôme !' GAGNER à la loterie française !",
    readingMnemonicFr: "ERU sonne comme 'heure' - à cette HEURE, j'OBTIENS ! TOKU comme 'toc' - TOC TOC, j'ai OBTENU !",
  },
  {
    character: "忙",
    meaningMnemonicFr: "Le cœur 忄 qui meurt 亡 de travail. C'est être OCCUPÉ ! 'Je suis trop OCCUPÉ !' dit le Parisien stressé. OCCUPÉ du matin au soir !",
    readingMnemonicFr: "ISOGASHII sonne comme 'il-so-ga-chi' - 'IL SO (sait) qu'il est OCCUPÉ !' BOU comme 'bout' - au BOUT du rouleau, OCCUPÉ !",
  },
  {
    character: "節",
    meaningMnemonicFr: "Le bambou 竹 et l'arrêter 即. C'est le NŒUD, la SAISON ! Le NŒUD du bambou qui marque les SAISONS. Les quatre SAISONS françaises !",
    readingMnemonicFr: "FUSHI sonne comme 'foutchi' - 'FOUTCHI (foutu) ce NŒUD !' SETSU comme 'c'est su' - 'C'EST SU que la SAISON change !'",
  },
  {
    character: "暴",
    meaningMnemonicFr: "Le soleil 日 au-dessus du commun 共. C'est la VIOLENCE ! La VIOLENCE qui éclate comme le soleil brûlant ! 'Non à la VIOLENCE !' scandent les manifestants.",
    readingMnemonicFr: "ABARERU sonne comme 'à bas-ré' - 'À BAS la VIOLENCE !' BOU comme 'bout' - au BOUT de la VIOLENCE, la paix !",
  },
  {
    character: "易",
    meaningMnemonicFr: "Le soleil 日 et le changement 勿. C'est FACILE ! 'C'est FACILE comme bonjour !' dit le Français confiant. Un examen FACILE, quel soulagement !",
    readingMnemonicFr: "YASASHII sonne comme 'y'a sa chérie' - 'Y'A SA CHÉRIE, c'est FACILE !' EKI/I comme 'et qui' - 'ET QUI trouve ça FACILE ?'",
  },

  // Level 20
  {
    character: "雪",
    meaningMnemonicFr: "La pluie 雨 qu'on balaye 彐. C'est la NEIGE ! La NEIGE sur les Alpes françaises, paradis des skieurs ! La NEIGE qui tombe à Noël à Paris, rare et magique !",
    readingMnemonicFr: "YUKI sonne comme 'you-qui' - 'YOU QUI aimes la NEIGE ?' SETSU comme 'c'est su' - 'C'EST SU qu'il va NEIGER !'",
  },
  {
    character: "雲",
    meaningMnemonicFr: "La pluie 雨 qui dit 云 ses secrets. C'est le NUAGE ! Les NUAGES de Normandie, gris et pluvieux ! Les NUAGES qui passent sur la Tour Eiffel !",
    readingMnemonicFr: "KUMO sonne comme 'cou-mot' - le NUAGE murmure des MOTS ! UN comme 'un' - UN NUAGE passe !",
  },
  {
    character: "災",
    meaningMnemonicFr: "Le fleuve 巛 et le feu 火. C'est le DÉSASTRE ! Les DÉSASTRES naturels : inondations, incendies ! Le DÉSASTRE de la canicule en France.",
    readingMnemonicFr: "WAZAWAI sonne comme 'ouah-za-ouaille' - 'OUAH, quel DÉSASTRE !' SAI comme 'saille' - le DÉSASTRE qui SAILLE (ressort) !",
  },
  {
    character: "烏",
    meaningMnemonicFr: "L'oiseau 鳥 noir sans œil visible. C'est le CORBEAU ! Le CORBEAU noir de mauvais augure ! Les CORBEAUX croassent dans les champs français.",
    readingMnemonicFr: "KARASU sonne comme 'qu'a-ra-su' - 'QU'A-t-il ce CORBEAU ?' U comme 'où' - 'OÙ va le CORBEAU ?'",
  },
  {
    character: "機",
    meaningMnemonicFr: "L'arbre 木 et le tissage 幾 complexe. C'est la MACHINE, l'OCCASION ! La MACHINE à coudre de grand-mère ! L'OCCASION qui fait le larron français.",
    readingMnemonicFr: "KI comme 'qui' - 'QUI répare cette MACHINE ?' L'OCCASION pour QUI ?",
  },
  {
    character: "雨",
    meaningMnemonicFr: "Les gouttes qui tombent du ciel. C'est la PLUIE ! La PLUIE bretonne, fine et persistante ! 'Encore la PLUIE !' soupire le Parisien. La PLUIE qui fait pousser les vignes !",
    readingMnemonicFr: "AME sonne comme 'âme' - la PLUIE lave l'ÂME ! U comme 'ou' - PLUIE OU beau temps !",
  },
  {
    character: "余",
    meaningMnemonicFr: "Le toit 人 et le bois 木 en trop. C'est l'EXTRA, le RESTE ! Le RESTE du repas qu'on emporte. 'J'ai du temps en EXTRA !' Un bonus SUPPLÉMENTAIRE !",
    readingMnemonicFr: "AMARU sonne comme 'à ma rue' - 'À MA RUE, il RESTE des places !' YO comme 'yo' - 'YO, il RESTE quoi ?'",
  },
  {
    character: "確",
    meaningMnemonicFr: "La pierre 石 et l'oiseau 隹 qui ne bouge pas. C'est CERTAIN ! 'C'est CERTAIN, j'y serai !' La certitude du Français têtu. CERTAIN et sûr !",
    readingMnemonicFr: "TASHIKA sonne comme 'ta-chic-a' - 'TA CHIC Attitude est CERTAINE !' KAKU comme 'caque' - CERTAIN comme un tonneau bien fermé !",
  },
  {
    character: "個",
    meaningMnemonicFr: "La personne 亻 et le solide 固. C'est INDIVIDUEL ! 'C'est mon choix INDIVIDUEL !' Chaque Français, un INDIVIDU unique.",
    readingMnemonicFr: "KO comme 'co' - chaque CO-équipier est INDIVIDUEL !",
  },
  {
    character: "厚",
    meaningMnemonicFr: "La falaise 厂 et l'enfant 子 protégé. C'est ÉPAIS ! Un pull ÉPAIS pour l'hiver français. 'Ce livre est ÉPAIS !' 300 pages de lecture !",
    readingMnemonicFr: "ATSUI sonne comme 'à-tsu-y' - 'À TSU (tout) cela, c'est ÉPAIS !' KOU comme 'coup' - un COUP ÉPAIS de pinceau !",
  },
  {
    character: "犯",
    meaningMnemonicFr: "Le chien 犭 et le dangereux 㔾. C'est le CRIME ! Le CRIME parfait n'existe pas, dit le commissaire français. 'Un CRIME a été commis !'",
    readingMnemonicFr: "OKASU sonne comme 'aux cas' - 'AUX CAS de CRIME, appelez la police !' HAN comme 'Han' - même HAN Solo pourrait commettre un CRIME !",
  },
];

async function main() {
  console.log("Improving mnemonics batch 2 - Levels 11-20...");

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
