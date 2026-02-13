import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Expanded mnemonics for kanji with short meaningMnemonicFr (< 50 chars)
// Each mnemonic is 80-200 chars with French cultural references and visual component breakdowns

interface MnemonicData {
  meaningMnemonicFr: string;
  readingMnemonicFr?: string;
}

const expandedMnemonics: Record<string, MnemonicData> = {
  // Batch 1: First 50 kanji
  "毎": {
    meaningMnemonicFr: "Imagine une mère française qui fait la même chose CHAQUE jour : croissant le matin, café à 10h, déjeuner à midi. CHAQUE jour, sans exception ! Cette routine immuable, c'est le kanji 毎 - la répétition quotidienne de la vie française !",
    readingMnemonicFr: "MAI comme 'mais' - 'MAIS maman, tu fais ça CHAQUE jour !' Elle répond : 'Oui, MAI-ntenant va te préparer !' GOTO sonne comme 'go to' - tu vas faire la même chose CHAQUE fois."
  },
  "家": {
    meaningMnemonicFr: "Sous un toit typiquement français 宀, un cochon 豕 se prélasse ! Dans les fermes de Gascogne, le cochon vivait souvent sous le même toit que la famille. Une vraie MAISON à la campagne française, où animaux et humains cohabitent !",
    readingMnemonicFr: "KA comme 'cas' - 'En CAS de pluie, rentre à la MAISON !' IE sonne comme 'yeah' - 'YEAH, je rentre à la MAISON !' UCHI comme 'ouch-i' - tu te cognes en entrant dans ta MAISON."
  },
  "泉": {
    meaningMnemonicFr: "L'eau 水 jaillit de la terre blanche 白 comme à Évian ou Vittel ! C'est une SOURCE d'eau pure des montagnes françaises. Les Romains venaient déjà à ces SOURCES thermales pour leurs vertus curatives !",
    readingMnemonicFr: "SEN comme 'sans' - 'SANS cette SOURCE, pas de vie !' IZUMI sonne comme 'is you me' - 'Cette SOURCE, c'est toi et moi qui l'avons découverte !'"
  },
  "問": {
    meaningMnemonicFr: "Une bouche 口 frappe à la porte 門 d'un professeur de la Sorbonne ! Elle vient poser une QUESTION philosophique. En France, on adore QUESTIONNER, débattre, remettre en cause. C'est l'art de la QUESTION socratique !",
    readingMnemonicFr: "MON comme 'mon' - 'MON professeur, j'ai une QUESTION !' TOI comme 'toi' - 'TOI, tu poses toujours des QUESTIONS !'"
  },
  "宿": {
    meaningMnemonicFr: "Sous le toit 宀, cent 百 personnes 人 dorment ! C'est une AUBERGE de jeunesse en Provence, bondée de voyageurs. Les pèlerins de Saint-Jacques-de-Compostelle s'y arrêtent pour la nuit. Une AUBERGE française chaleureuse !",
    readingMnemonicFr: "SHUKU comme 'choucroute' - on mange une CHOUCROUTE à l'AUBERGE alsacienne ! YADO sonne comme 'y a de l'eau' - 'Y A DE l'eau chaude dans cette AUBERGE ?'"
  },
  "様": {
    meaningMnemonicFr: "L'arbre 木 avec le mouton 羊 et l'eau 氵 représentent la MANIÈRE élégante des bergers de Provence. Chaque région a sa MANIÈRE de faire, son style propre. C'est la FAÇON française de vivre avec classe !",
    readingMnemonicFr: "SAMA comme le suffixe japonais de respect - à la MANIÈRE des nobles ! YŌ comme 'yo' - 'YO, c'est ma MANIÈRE de faire !'"
  },
  "輪": {
    meaningMnemonicFr: "Le véhicule 車 avec l'ordre 侖 forme une ROUE parfaite ! Comme les roues du Tour de France qui tournent en ordre sur les routes. Chaque ROUE suit la précédente dans un ballet mécanique parfait !",
    readingMnemonicFr: "RIN comme 'reine' - la REINE du peloton a les meilleures ROUES ! WA comme 'waouh' - 'WAOUH, quelle belle ROUE de vélo !'"
  },
  "鏡": {
    meaningMnemonicFr: "Le métal 金 poli jusqu'à la perfection 竟 devient un MIROIR ! À Versailles, la Galerie des Glaces compte 357 MIROIRS qui reflètent la grandeur de Louis XIV. Un MIROIR digne des rois de France !",
    readingMnemonicFr: "KYOU comme 'quoi' - 'QUOI ?!' tu cries en te voyant dans le MIROIR le matin ! KAGAMI sonne comme 'cas-game' - le MIROIR ne ment jamais, c'est le CAS du GAME de beauté !"
  },
  "謝": {
    meaningMnemonicFr: "Les paroles 言 qui tirent comme un arc 射 touchent le cœur ! REMERCIER en France, c'est un art. On dit merci avec éloquence, on s'excuse avec panache. Les mots sont des flèches de gratitude !",
    readingMnemonicFr: "SHA comme 'chat' - le CHAT te REMERCIE en ronronnant ! AYAMARU sonne comme 'à y'a ma rue' - tu t'EXCUSES d'avoir bloqué MA RUE !"
  },
  "皆": {
    meaningMnemonicFr: "Comparer 比 avec le blanc 白 inclut TOUT LE MONDE ! Quand on compare, on met tout le monde sur un pied d'égalité. En France, la devise 'Égalité' signifie que TOUS sont concernés, sans exception !",
    readingMnemonicFr: "KAI comme 'quai' - TOUT LE MONDE attend sur le QUAI du métro ! MINA sonne comme 'mina' - 'MINA, TOUT LE MONDE est là ?'"
  },
  "薬": {
    meaningMnemonicFr: "L'herbe 艹 transformée en musique 楽 pour le corps, c'est le MÉDICAMENT ! Les herboristes de Grasse créent des remèdes depuis des siècles. Un MÉDICAMENT français qui guérit comme une symphonie apaise l'âme !",
    readingMnemonicFr: "YAKU comme 'yaourt' - le YAOURT est ton MÉDICAMENT naturel ! KUSURI sonne comme 'cou-souri' - le MÉDICAMENT fait sourire ton COU qui ne fait plus mal !"
  },
  "栄": {
    meaningMnemonicFr: "Le feu 火 qui brille sur l'arbre 木 symbolise la PROSPÉRITÉ ! Comme les illuminations de Noël sur les Champs-Élysées, signe de GLOIRE et d'abondance. La France rayonne de cette lumière prospère !",
    readingMnemonicFr: "EI comme 'et' - 'ET voilà la PROSPÉRITÉ !' SAKAE sonne comme 'saké' - on boit du SAKÉ pour célébrer la PROSPÉRITÉ !"
  },
  "警": {
    meaningMnemonicFr: "Les paroles 言 qui respectent 敬 la loi AVERTISSENT ! Un gendarme français AVERTIT avant de sévir. 'Je vous PRÉVIENS, monsieur !' C'est l'art français de l'AVERTISSEMENT poli mais ferme !",
    readingMnemonicFr: "KEI comme 'quai' - la police AVERTIT sur le QUAI ! IMASHIME sonne comme 'il ma chimère' - on t'AVERTIT que ta chimère est dangereuse !"
  },
  "説": {
    meaningMnemonicFr: "Les paroles 言 qui libèrent 兌 la pensée EXPLIQUENT ! Les philosophes français adorent EXPLIQUER leurs théories dans les cafés. Sartre, Camus, Beauvoir - tous maîtres de l'EXPLICATION !",
    readingMnemonicFr: "SETSU comme 'c'est su' - 'C'EST SU, je t'ai EXPLIQUÉ !' TOKU sonne comme 'toc' - tu fais 'TOC TOC' pour qu'on t'EXPLIQUE !"
  },
  "静": {
    meaningMnemonicFr: "Le bleu 青 du ciel après la dispute 争 devient CALME ! Après une grève à la française, le silence revient. Le CALME après la tempête, comme un dimanche tranquille dans un village provençal !",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'EST si CALME ici !' SHIZU sonne comme 'chut' - 'CHUT, reste CALME et SILENCIEUX !'"
  },
  "論": {
    meaningMnemonicFr: "Les paroles 言 bien organisées 侖 forment une THÉORIE ! La France, pays des grandes THÉORIES ! De Descartes à Foucault, on adore construire des ARGUMENTS logiques et les défendre avec passion !",
    readingMnemonicFr: "RON comme 'rond' - ta THÉORIE tourne en ROND ! GIRON sonne comme 'giron' - cette THÉORIE est née dans le GIRON universitaire !"
  },
  "資": {
    meaningMnemonicFr: "La prochaine 次 richesse 貝 est une RESSOURCE à exploiter ! Les RESSOURCES naturelles de la France - ses vignobles, ses forêts, son terroir - sont des trésors à préserver pour les générations futures !",
    readingMnemonicFr: "SHI comme 'si' - 'SI seulement j'avais plus de RESSOURCES !' MOTO sonne comme 'moto' - ta MOTO consomme des RESSOURCES en essence !"
  },
  "断": {
    meaningMnemonicFr: "La hache 斤 qui frappe le fil de soie 糸 COUPE net ! Comme Napoléon tranchant le nœud gordien, parfois il faut REFUSER catégoriquement. COUPER les ponts à la française, avec décision !",
    readingMnemonicFr: "DAN comme 'dans' - 'DANS ce cas, je REFUSE !' KOTOWARU sonne comme 'côte ou a rue' - tu REFUSES de choisir entre la CÔTE OU la RUE !"
  },
  "税": {
    meaningMnemonicFr: "Le grain 禾 qu'on échange 兌 contre de l'argent, c'est la TAXE ! Depuis la gabelle jusqu'à la TVA, les Français connaissent bien les IMPÔTS. Payer ses TAXES, c'est le prix de la civilisation !",
    readingMnemonicFr: "ZEI comme 'zèle' - le percepteur met du ZÈLE à collecter les TAXES ! MITSUGI sonne comme 'mi-suggère' - on me SUGGÈRE de payer mes IMPÔTS !"
  },
  "領": {
    meaningMnemonicFr: "L'ordre 令 donné par la tête 頁 gouverne le TERRITOIRE ! Les seigneurs français commandaient leurs DOMAINES depuis leurs châteaux. Chaque TERRITOIRE avait son maître, de la Bretagne à la Provence !",
    readingMnemonicFr: "RYŌ comme 'rio' - le RIO coule dans mon TERRITOIRE ! OSAME sonne comme 'oh same' - 'OH, c'est le MÊME TERRITOIRE qu'avant !'"
  },
  "吸": {
    meaningMnemonicFr: "La bouche 口 qui attire 及 l'air ASPIRE profondément ! Comme humer le parfum d'un bon vin de Bourgogne, INHALER l'arôme des lavandes de Provence. ASPIRER la vie à pleins poumons !",
    readingMnemonicFr: "KYŪ comme 'cul' - tu ASPIRES avec le... non, avec la bouche ! SŪ sonne comme 'sous' - ASPIRE l'air SOUS l'eau avec un tuba !"
  },
  "護": {
    meaningMnemonicFr: "Les paroles 言 combinées à l'action 蒦 PROTÈGENT ! Comme les gardes suisses qui PROTÈGENT avec serment, ou les avocats qui défendent avec leurs mots. PROTÉGER, c'est agir ET parler !",
    readingMnemonicFr: "GO comme 'go' - 'GO, je te PROTÈGE !' MAMORU sonne comme 'ma mort ou' - 'MA MORT OU ta vie, je te PROTÈGE !'"
  },
  "額": {
    meaningMnemonicFr: "Le client 客 montre sa tête 頁 et son FRONT ! Au guichet de la banque, on lève le FRONT pour annoncer le MONTANT. Le FRONT plissé quand on voit la SOMME à payer !",
    readingMnemonicFr: "GAKU comme 'gag' - le MONTANT est si élevé que c'est un GAG ! HITAI sonne comme 'hit eye' - tu te frappes le FRONT de surprise !"
  },
  "製": {
    meaningMnemonicFr: "Le couteau qui contrôle 制 travaille le vêtement 衣 pour FABRIQUER ! Les ateliers de haute couture parisiens FABRIQUENT des merveilles. MADE IN FRANCE, gage de qualité et de savoir-faire !",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'EST FABRIQUÉ en France !' TSUKURU sonne comme 'tsu-cru' - on FABRIQUE du fromage avec du lait CRU !"
  },
  "輸": {
    meaningMnemonicFr: "Le véhicule 車 qui voyage chaque mois 俞 TRANSPORTE des marchandises ! Les camions sur l'autoroute du Soleil TRANSPORTENT les produits du Sud vers Paris. Le TRANSPORT, artère vitale de l'économie !",
    readingMnemonicFr: "YU comme 'you' - 'YOU TRANSPORTES ça où ?' SHU sonne comme 'chou' - on TRANSPORTE des CHOUX de Bruxelles !"
  },
  "環": {
    meaningMnemonicFr: "Le jade précieux 王 qui revient en boucle 睘 forme un ANNEAU parfait ! Comme l'ANNEAU du périphérique parisien ou les ANNEAUX de Saturne. Un cercle parfait, sans début ni fin !",
    readingMnemonicFr: "KAN comme 'quand' - 'QUAND as-tu trouvé cet ANNEAU ?' WA sonne comme 'waouh' - 'WAOUH, quel bel ANNEAU !'"
  },
  "票": {
    meaningMnemonicFr: "L'ouest 西 où le feu 示 éclaire le BULLETIN de vote ! Le jour du VOTE en France est sacré. On glisse son BULLETIN dans l'urne avec fierté. Chaque VOTE compte dans la République !",
    readingMnemonicFr: "HYŌ comme 'yo' - 'YO, t'as voté ? Ton BULLETIN ?' FUDA sonne comme 'food-ah' - après le VOTE, on mange - 'FOOD, AH !'"
  },
  "訟": {
    meaningMnemonicFr: "Les paroles 言 rendues publiques 公 devant le tribunal forment un PROCÈS ! Les avocats français plaident avec éloquence. Le PROCÈS, théâtre de la justice où chaque mot compte !",
    readingMnemonicFr: "SHŌ comme 'show' - le PROCÈS est un SHOW judiciaire ! UTTAE sonne comme 'ou t'es' - 'OU T'ES ? Le PROCÈS commence !'"
  },
  "模": {
    meaningMnemonicFr: "Le bois 木 sculpté selon un grand 莫 patron devient un MODÈLE ! Les apprentis des Compagnons du Devoir copient les MODÈLES des maîtres. IMITER pour apprendre, puis créer son propre style !",
    readingMnemonicFr: "MO comme 'mot' - ce MODÈLE est le MOT de la fin ! BO sonne comme 'beau' - 'BEAU MODÈLE à suivre !'"
  },
  "豊": {
    meaningMnemonicFr: "Le tambour 豆 débordant de grains 丰 symbolise l'ABONDANCE ! Les marchés de Provence croulent sous les fruits, les légumes, les fromages. L'ABONDANCE à la française, généreuse et savoureuse !",
    readingMnemonicFr: "HŌ comme 'oh' - 'OH, quelle ABONDANCE !' YUTAKA sonne comme 'you taka' - 'YOU TAKA tout, il y a tant d'ABONDANCE !'"
  },
  "満": {
    meaningMnemonicFr: "L'eau 氵 qui remplit tout l'espace avec les deux 両 côtés est PLEINE ! Comme un verre de vin rempli à ras bord, COMPLET, SATISFAIT. La PLÉNITUDE d'un bon repas français !",
    readingMnemonicFr: "MAN comme 'man' - 'MAN, je suis PLEIN !' MICHIRU sonne comme 'mi-chirurgie' - après la chirurgie, l'estomac est PLEIN !"
  },
  "河": {
    meaningMnemonicFr: "L'eau 氵 avec le possible 可 forme une RIVIÈRE ! La Seine, la Loire, le Rhône - les grandes RIVIÈRES de France qui ont façonné l'histoire. Une RIVIÈRE qui rend tout possible !",
    readingMnemonicFr: "KA comme 'cas' - 'En CAS de crue, la RIVIÈRE déborde !' KAWA sonne comme 'cave à' - la RIVIÈRE coule vers la CAVE À vin !"
  },
  "再": {
    meaningMnemonicFr: "Le un 一 dans le rectangle 冂 avec des traits représente ENCORE une fois ! Comme un film français qu'on revoit, ENCORE et ENCORE. RÉPÉTER pour le plaisir, car c'était si bon !",
    readingMnemonicFr: "SAI comme 'c'est' - 'C'EST ENCORE toi !' FUTATA sonne comme 'foot-à-ta' - ENCORE un match de FOOT À TA télé !"
  },
  "悩": {
    meaningMnemonicFr: "Le cœur 忄 tourmenté par le cerveau 悩 a des SOUCIS ! Les Français adorent se faire du SOUCI - pour la politique, la cuisine, l'amour. Le SOUCI existentiel à la française !",
    readingMnemonicFr: "NŌ comme 'no' - 'NO, j'ai trop de SOUCIS !' NAYAMU sonne comme 'na y'a mu' - 'N'Y A-t-il MU-ltiples SOUCIS ?'"
  },
  "惑": {
    meaningMnemonicFr: "Quelqu'un 或 avec le cœur 心 empli d'incertitude a des DOUTES ! Le doute cartésien, si français ! DOUTER de tout pour mieux comprendre. L'hésitation philosophique devenue art de vivre !",
    readingMnemonicFr: "WAKU comme 'wok' - tu DOUTES que ce WOK soit propre ! MADOU sonne comme 'ma doux' - 'MA DOUCE, j'ai des DOUTES...'"
  },
  "巨": {
    meaningMnemonicFr: "Ce grand carré 巨 représente quelque chose de GÉANT ! Comme la Tour Eiffel qui domine Paris, ÉNORME et majestueuse. Les mégalithes de Carnac, GÉANTS de pierre plantés par nos ancêtres !",
    readingMnemonicFr: "KYO comme 'quoi' - 'QUOI ?! C'est GÉANT !' OO sonne comme 'oh oh' - 'OH OH, c'est ÉNORME !'"
  },
  "児": {
    meaningMnemonicFr: "Ce petit être 児 représente l'ENFANT innocent ! Les crèches françaises accueillent les BÉBÉS dès 3 mois. L'ENFANT, trésor de la République, éduqué avec soin dès le plus jeune âge !",
    readingMnemonicFr: "JI comme 'j'y' - 'J'Y vais avec mon ENFANT !' NI sonne comme 'nid' - l'ENFANT dort dans son NID douillet !"
  },
  "婦": {
    meaningMnemonicFr: "La femme 女 qui tient le balai 帚 était autrefois la FEMME MARIÉE au foyer ! Aujourd'hui, l'ÉPOUSE française travaille et partage les tâches. L'évolution de la FEMME MARIÉE moderne !",
    readingMnemonicFr: "FU comme 'fou' - 'FOU amoureux de mon ÉPOUSE !' YOME sonne comme 'yo mère' - 'YO MÈRE, voici ta belle-fille, mon ÉPOUSE !'"
  },
  "衆": {
    meaningMnemonicFr: "Le sang 血 partagé par les gens 众 forme la FOULE ! La FOULE française qui manifeste, qui célèbre, qui vibre ensemble. Le 14 juillet, la FOULE envahit les Champs-Élysées !",
    readingMnemonicFr: "SHŪ comme 'chou' - la FOULE se bat pour le dernier CHOU ! MURE sonne comme 'mur' - la FOULE forme un MUR humain !"
  },
  "杯": {
    meaningMnemonicFr: "Le bois 木 qui dit non 不 à être vide forme une COUPE ! Une COUPE de champagne levée pour trinquer, un VERRE de vin partagé entre amis. La convivialité française dans une COUPE !",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE, j'ai cassé ma COUPE !' SAKAZUKI sonne comme 'saké-zuki' - une COUPE à SAKÉ pour les amateurs !"
  },
  "診": {
    meaningMnemonicFr: "Les paroles 言 du médecin qui vérifie 㐱 le patient EXAMINENT ! Le médecin de famille français EXAMINE avec soin. 'Tirez la langue, dites AAH !' L'art du DIAGNOSTIC à la française !",
    readingMnemonicFr: "SHIN comme 'chine' - le médecin EXAMINE ta colonne comme en CHINE ! MIRU sonne comme 'mire' - le docteur te MIRE en t'EXAMINANT !"
  },
  "閣": {
    meaningMnemonicFr: "La porte 門 qui mène à chaque 各 ministère forme le CABINET ! Le CABINET ministériel français, où se prennent les grandes décisions. Derrière ces portes, le pouvoir s'exerce !",
    readingMnemonicFr: "KAKU comme 'cas-cul' - 'CAS-CUL-butant, ce CABINET !' TANA sonne comme 'ta-na' - 'TA place N'A pas été donnée au CABINET !'"
  },
  "僚": {
    meaningMnemonicFr: "La personne 亻 qui travaille avec ses amis 尞 est un COLLÈGUE ! Les COLLÈGUES de bureau français partagent la pause café. Un COLLÈGUE devient souvent un ami, à la française !",
    readingMnemonicFr: "RYŌ comme 'rio' - mes COLLÈGUES et moi partons en vacances à RIO ! TOMO sonne comme 'tôt mot' - un COLLÈGUE dit un MOT TÔT le matin !"
  },
  "寄": {
    meaningMnemonicFr: "Le toit 宀 abrite quelque chose d'étrange 奇 qui S'APPROCHE ! Comme un visiteur inattendu qui CONTRIBUE au repas. S'APPROCHER pour partager, CONTRIBUER à la vie commune !",
    readingMnemonicFr: "KI comme 'qui' - 'QUI S'APPROCHE ?' YORU sonne comme 'y'or' - 'Y'a de l'OR qui S'APPROCHE !'"
  },
  "宗": {
    meaningMnemonicFr: "Le toit 宀 qui protège et montre 示 les rituels, c'est la RELIGION ! Les cathédrales françaises, Notre-Dame, Chartres - temples de la RELIGION chrétienne. La SECTE des bâtisseurs de foi !",
    readingMnemonicFr: "SHŪ comme 'chou' - la RELIGION du CHOU à la crème existe ! MU sonne comme 'mou' - sans RELIGION, certains se sentent MOUs !"
  },
  "娘": {
    meaningMnemonicFr: "La femme 女 qui est bonne 良 et jeune est une FILLE ! La JEUNE FEMME française, élégante et cultivée. Une FILLE qui marche sur les traces de Simone de Beauvoir !",
    readingMnemonicFr: "MUSUME comme 'mousse-oumé' - la FILLE fait de la MOUSSE au chocolat ! JŌ sonne comme 'joli' - quelle JOLIE FILLE !"
  },
  "猛": {
    meaningMnemonicFr: "Le chien 犭 avec l'aîné 孟 devient FÉROCE ! Comme un chien de garde dans un château de la Loire, FÉROCE pour protéger son territoire. La FÉROCITÉ contrôlée du gardien fidèle !",
    readingMnemonicFr: "MŌ comme 'mot' - aucun MOT ne peut décrire sa FÉROCITÉ ! TAKESHI sonne comme 'take-chi' - TAKE attention, il est FÉROCE !"
  },
  "懐": {
    meaningMnemonicFr: "Le cœur 忄 qui revient vers le passé 懷 garde la NOSTALGIE ! La NOSTALGIE française pour les années yéyé, pour les films de Truffaut. Le doux regret du temps passé !",
    readingMnemonicFr: "KAI comme 'quai' - sur le QUAI de la gare, quelle NOSTALGIE ! NATSUKASHII sonne comme 'na-tsu-cash' - 'N'AS-TU CASH pour raviver ta NOSTALGIE ?'"
  },

  // Batch 2: Kanji 51-100
  "枕": {
    meaningMnemonicFr: "L'arbre 木 transformé pour se coucher 冘 devient un OREILLER ! Les OREILLERS en plumes d'oie des hôtels de luxe parisiens. Poser sa tête sur un OREILLER moelleux après une longue journée !",
    readingMnemonicFr: "CHIN comme 'chine' - un OREILLER en soie de CHINE ! MAKURA sonne comme 'ma-cura' - 'MA CURA-tion commence sur cet OREILLER !'"
  },
  "浮": {
    meaningMnemonicFr: "L'eau 氵 qui porte l'enfant 孚 le fait FLOTTER ! Comme un bouchon de liège sur les eaux de la Garonne, LÉGER et insouciant. FLOTTER sur les vagues de la vie à la française !",
    readingMnemonicFr: "FU comme 'fou' - il est FOU de FLOTTER sur l'eau ! UKU sonne comme 'you cou' - 'YOU COULES pas, tu FLOTTES !'"
  },
  "騒": {
    meaningMnemonicFr: "Le cheval 馬 agité par les insectes 蚤 fait du BRUIT ! Comme la Fête de la Musique où le BRUIT envahit les rues. L'agitation joyeuse qui fait vibrer Paris !",
    readingMnemonicFr: "SŌ comme 'sot' - quel SOT fait tout ce BRUIT ! SAWAGU sonne comme 'sa vague' - SA VAGUE de BRUIT déferle !"
  },
  "華": {
    meaningMnemonicFr: "L'herbe 艹 qui s'épanouit dans toute sa splendeur 華 est une FLEUR ! Les FLEURS de Grasse qui parfument le monde entier. La splendeur florale à la française !",
    readingMnemonicFr: "KA comme 'cas' - en CAS de fête, offre des FLEURS ! HANA sonne comme 'Anna' - ANNA adore les FLEURS !"
  },
  "嘆": {
    meaningMnemonicFr: "La bouche 口 qui pousse un grand soupir 𦰩 pour DÉPLORER ! Le soupir français, ce 'pfff' expressif qui dit tout. SOUPIRER devant les malheurs du monde !",
    readingMnemonicFr: "TAN comme 'temps' - je SOUPIRE sur le TEMPS qui passe ! NAGEKU sonne comme 'nage-ku' - tu NAGES dans les KU-ries en SOUPIRANT !"
  },
  "倉": {
    meaningMnemonicFr: "Le toit 人 qui couvre la bouche 口 cache l'ENTREPÔT ! Les ENTREPÔTS de Bordeaux où vieillissent les grands crus. Un ENTREPÔT secret rempli de trésors !",
    readingMnemonicFr: "SŌ comme 'seau' - des SEAUX rangés dans l'ENTREPÔT ! KURA sonne comme 'cul-rat' - les rats courent dans l'ENTREPÔT !"
  },
  "帯": {
    meaningMnemonicFr: "La montagne et le tissu 巾 forment une CEINTURE ! Le cordon bleu, CEINTURE des grands chefs français. La ZONE parisienne encercle la capitale comme une CEINTURE !",
    readingMnemonicFr: "TAI comme 'taille' - la CEINTURE serre la TAILLE ! OBI sonne comme 'oh bi' - 'OH BI-en serré, cette CEINTURE !'"
  },
  "径": {
    meaningMnemonicFr: "Le pas 彳 qui va droit 圣 trace un CHEMIN ! Les CHEMINS de randonnée du GR20 en Corse. Le DIAMÈTRE d'un cercle, CHEMIN direct d'un point à l'autre !",
    readingMnemonicFr: "KEI comme 'quai' - le CHEMIN mène au QUAI ! MICHI sonne comme 'mi-chi' - 'MI-CHEMIN, on fait une pause ?'"
  },
  "粉": {
    meaningMnemonicFr: "Le riz 米 divisé 分 en petits morceaux devient POUDRE ! La FARINE des moulins français, fine comme de la POUDRE. Les crêpes bretonnes naissent de cette POUDRE magique !",
    readingMnemonicFr: "FUN comme 'fun' - c'est FUN de jouer avec la POUDRE ! KONA sonne comme 'co-na' - 'CO-NApolitain en POUDRE de cacao !'"
  },
  "脈": {
    meaningMnemonicFr: "La chair 月 avec ses dérivations forme les VEINES ! Les VEINES du marbre de Carrare dans les sculptures françaises. Le réseau de VEINES qui irrigue le corps !",
    readingMnemonicFr: "MYAKU comme 'mi-yak' - je MIRE le YAK et ses VEINES ! SU sonne comme 'sous' - les VEINES coulent SOUS la peau !"
  },
  "均": {
    meaningMnemonicFr: "La terre 土 distribuée en équilibre 匀 est ÉGALE ! L'égalité, valeur française par excellence. Chaque part UNIFORME, ÉGALE pour tous, comme dans une bonne république !",
    readingMnemonicFr: "KIN comme 'quin' - QUIN-ze parts ÉGALES ! HITOSHII sonne comme 'hit-oh-chi' - tout doit être ÉGAL, HIT OH CHI-c !"
  },
  "富": {
    meaningMnemonicFr: "Le toit 宀 qui abrite l'abondance 畐 symbolise la RICHESSE ! Les châteaux de la Loire, symboles de RICHESSE et de FORTUNE. La RICHESSE patrimoniale française !",
    readingMnemonicFr: "FU comme 'fou' - FOU de RICHESSE ! TOMI sonne comme 'Tommy' - TOMMY a trouvé la RICHESSE !"
  },
  "恩": {
    meaningMnemonicFr: "La cause 因 touchant le cœur 心 crée la GRÂCE ! La GRÂCE présidentielle, tradition française. Recevoir une FAVEUR qu'on n'oubliera jamais !",
    readingMnemonicFr: "ON comme 'on' - 'ON te doit une FAVEUR !' MEGUMI sonne comme 'mes gummies' - 'MES GUMMIES, quelle GRÂCE !'"
  },
  "興": {
    meaningMnemonicFr: "Les mains qui soulèvent 同臼 symbolisent l'INTÉRÊT et la PROSPÉRITÉ ! L'INTÉRÊT des investisseurs pour le French Tech. PROSPÉRER grâce à l'enthousiasme collectif !",
    readingMnemonicFr: "KYŌ comme 'quoi' - 'QUOI, ça t'INTÉRESSE ?' OKORU sonne comme 'oh corps' - 'OH, ton CORPS s'INTÉRESSE au sport !'"
  },
  "賛": {
    meaningMnemonicFr: "Les deux personnes 夫夫 unies par la richesse 貝 APPROUVENT ! APPROUVER un projet ensemble, comme les députés français votant une loi. Le consensus qui enrichit !",
    readingMnemonicFr: "SAN comme 'sans' - 'SANS hésiter, j'APPROUVE !' HOMERU sonne comme 'homme-ru' - l'HOMME RU-sse APPROUVE aussi !"
  },
  "皇": {
    meaningMnemonicFr: "Le blanc 白 royal avec le roi 王 forme l'EMPEREUR ! Napoléon, EMPEREUR des Français, couronné à Notre-Dame. La grandeur impériale à la française !",
    readingMnemonicFr: "KŌ comme 'côté' - l'EMPEREUR se tient du CÔTÉ du pouvoir ! SUMERAGI sonne comme 'sous-mère-âgé' - l'EMPEREUR est SOUS la MÈRE ÂGÉE (impératrice douairière) !"
  },
  "盛": {
    meaningMnemonicFr: "Le fait 成 de remplir le plat 皿 montre la PROSPÉRITÉ ! Un plat PROSPÈRE, débordant de victuailles ! Les marchés français qui débordent, signe de PROSPÉRITÉ !",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'EST PROSPÈRE ici !' MORU sonne comme 'mort-tu' - même MORT TU restes PROSPÈRE dans les mémoires !"
  },
  "装": {
    meaningMnemonicFr: "Le vêtement 衣 porté par le soldat 壮 forme l'ÉQUIPEMENT ! S'HABILLER pour impressionner, ÉQUIPER les troupes. La haute couture française HABILLE le monde !",
    readingMnemonicFr: "SŌ comme 'saut' - un SAUT dans ce nouveau VÊTEMENT ! YOSOOU sonne comme 'yo-so-où' - 'YO, SO, OÙ est mon HABIT ?'"
  },
  "諸": {
    meaningMnemonicFr: "Les paroles 言 de l'auteur 者 sont DIVERSES ! Les DIVERS philosophes français, de Voltaire à Derrida. La DIVERSITÉ des pensées, richesse intellectuelle !",
    readingMnemonicFr: "SHO comme 'show' - un SHOW de DIVERS talents ! MORO sonne comme 'mord-oh' - il MORD OH tant de sujets DIVERS !"
  },
  "聖": {
    meaningMnemonicFr: "L'oreille 耳 qui entend, la bouche 口 qui parle, le roi 王 qui gouverne - c'est le SAINT ! Saint Louis rendant la justice sous son chêne. La SAINTETÉ royale française !",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'EST un SAINT homme !' HIJIRI sonne comme 'il gît ici' - le SAINT 'IL GÎT ICI' dans cette cathédrale !"
  },
  "磁": {
    meaningMnemonicFr: "La pierre 石 qui nourrit 兹 une force invisible est un AIMANT ! L'attraction MAGNÉTIQUE de Paris, qui attire les artistes du monde entier. Une force AIMANTÉE !",
    readingMnemonicFr: "JI comme 'j'y' - 'J'Y suis attiré comme par un AIMANT !' JISHAKU sonne comme 'j'y-chaque' - J'Y vais CHAQUE fois, attiré par l'AIMANT !"
  },
  "紅": {
    meaningMnemonicFr: "Le fil 糸 travaillé 工 devient ROUGE cramoisi ! Le ROUGE des lèvres françaises, le vin ROUGE de Bordeaux. Cette couleur passion qui symbolise l'amour à la française !",
    readingMnemonicFr: "KŌ comme 'côté' - du CÔTÉ ROUGE du drapeau ! BENI sonne comme 'béni' - BÉNI soit ce ROUGE magnifique !"
  },
  "枝": {
    meaningMnemonicFr: "L'arbre 木 qui se divise 支 forme des BRANCHES ! Les BRANCHES des platanes sur les boulevards parisiens. Chaque BRANCHE porte son histoire, ses feuilles !",
    readingMnemonicFr: "SHI comme 'si' - 'SI cette BRANCHE casse...' EDA sonne comme 'et dà' - 'ET DÀ-ns cette BRANCHE, un nid !'"
  },
  "舎": {
    meaningMnemonicFr: "Rassembler des gens sous un toit forme un BÂTIMENT ! Les BÂTIMENTS haussmanniens de Paris, élégants et uniformes. Une MAISON où se retrouver, un abri collectif !",
    readingMnemonicFr: "SHA comme 'chat' - le CHAT vit dans ce BÂTIMENT ! YA sonne comme 'ya' - 'YA un BÂTIMENT là-bas !'"
  },
  "介": {
    meaningMnemonicFr: "La personne 人 placée entre deux autres est l'INTERMÉDIAIRE ! Le courtier, l'agent immobilier - l'INTERMÉDIAIRE à la française qui facilite les transactions !",
    readingMnemonicFr: "KAI comme 'quai' - l'INTERMÉDIAIRE attend sur le QUAI ! SUKE sonne comme 'sous-que' - 'SOUS QUE-l prétexte sers-tu d'INTERMÉDIAIRE ?'"
  },
  "厄": {
    meaningMnemonicFr: "La falaise 厂 qui piège 卩 apporte le MALHEUR ! Les années de MALHEUR, comme la Grande Guerre. Éviter le MALHEUR, conjurer le mauvais sort !",
    readingMnemonicFr: "YAKU comme 'yak' - ce YAK porte MALHEUR ! WAZAWAI sonne comme 'vase-à-ouais' - le VASE À OUAIS qui casse porte MALHEUR !"
  },
  "剣": {
    meaningMnemonicFr: "Le couteau 刂 combiné à 僉 forme une ÉPÉE ! L'ÉPÉE de Durendal, l'ÉPÉE de Jeanne d'Arc. L'ÉPÉE française, symbole de chevalerie et d'honneur !",
    readingMnemonicFr: "KEN comme 'quand' - 'QUAND dégaines-tu ton ÉPÉE ?' TSURUGI sonne comme 'tsu-rug-i' - l'ÉPÉE brille sur le TAPIS (RUG) !"
  },
  "恥": {
    meaningMnemonicFr: "L'oreille 耳 qui rougit avec le cœur 心 ressent la HONTE ! Rougir de HONTE quand on fait une gaffe. La HONTE française, ce sentiment si humain !",
    readingMnemonicFr: "CHI comme 'chi' - 'CHI-c, quelle HONTE !' HAJI sonne comme 'à j'y' - 'À J'Y aller, j'ai eu HONTE !'"
  },
  "杉": {
    meaningMnemonicFr: "L'arbre 木 aux trois branches élégantes 彡 est le CÈDRE japonais ! Les CÈDRES majestueux des parcs à la française, symboles de longévité et de noblesse !",
    readingMnemonicFr: "SAN comme 'sans' - SANS ce CÈDRE, le jardin serait triste ! SUGI sonne comme 'sous-gui' - SOUS le GUI du CÈDRE on s'embrasse !"
  },
  "獄": {
    meaningMnemonicFr: "Les chiens 犭犭 qui gardent celui qui parle forment la PRISON ! La Bastille, PRISON royale détruite. Les barreaux qui enferment, gardés férocement !",
    readingMnemonicFr: "GOKU comme 'go cou' - en PRISON, tu risques le COU ! HITOYA sonne comme 'hit-oh-ya' - HIT-té, OH, YA va en PRISON !"
  },
  "姓": {
    meaningMnemonicFr: "La femme 女 qui donne la vie 生 transmet le NOM DE FAMILLE ! Le NOM DE FAMILLE français, héritage maternel ou paternel. Porter son NOM avec fierté !",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'EST mon NOM DE FAMILLE !' UIJI sonne comme 'oui-j'y' - 'OUI, J'Y tiens à mon NOM !'"
  },
  "貿": {
    meaningMnemonicFr: "L'échange 卯 de richesses 貝 crée le COMMERCE ! Le COMMERCE international, les marchands de Marseille. COMMERCER avec le monde, tradition française !",
    readingMnemonicFr: "BŌ comme 'beau' - 'BEAU COMMERCE que voilà !' AKINA sonne comme 'à qui n'a' - 'À QUI N'A pas, le COMMERCE donne !'"
  },
  "遺": {
    meaningMnemonicFr: "Le mouvement 辶 vers quelque chose de précieux 貴 LAISSE un HÉRITAGE ! LAISSER un HÉRITAGE culturel, comme le patrimoine français. Ce qu'on LAISSE aux générations futures !",
    readingMnemonicFr: "I comme 'il' - 'IL a LAISSÉ un HÉRITAGE !' NOKORU sonne comme 'no-corps' - 'NO CORPS ne reste, mais l'HÉRITAGE demeure !'"
  },
  "幅": {
    meaningMnemonicFr: "Le tissu 巾 avec la richesse 畐 a de la LARGEUR ! La LARGEUR des boulevards haussmanniens, généreux et imposants. Un tissu de qualité a toujours de la LARGEUR !",
    readingMnemonicFr: "FUKU comme 'fuck-ou' - 'FUCK, OÙ est passée la LARGEUR ?' HABA sonne comme 'à bas' - 'À BAS les trucs sans LARGEUR !'"
  },
  "療": {
    meaningMnemonicFr: "La maladie 疒 qui demande 尞 un TRAITEMENT ! Les TRAITEMENTS thermaux de Vichy, tradition française. GUÉRIR grâce aux soins attentifs !",
    readingMnemonicFr: "RYŌ comme 'rio' - à RIO, quel TRAITEMENT de star ! IYASU sonne comme 'il y a su' - 'IL Y A SU me donner le bon TRAITEMENT !'"
  },
  "諾": {
    meaningMnemonicFr: "Les paroles 言 de droite 若 qui disent oui CONSENTENT ! CONSENTIR après réflexion, à la française. Donner son accord, approuver formellement !",
    readingMnemonicFr: "DAKU comme 'da coup' - 'DA COUP, je CONSENS !' UKERU sonne comme 'ou queur' - 'OU QUEUR-e tu mon CONSENTEMENT ?'"
  },
  "償": {
    meaningMnemonicFr: "La personne 亻 qui offre une récompense 賞 COMPENSE ! COMPENSER les torts, REMBOURSER les dettes. La justice française qui demande réparation !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW doit COMPENSER les dégâts ! TSUGUNAU sonne comme 'tsu-guna-ou' - je COMPENSE, TSU-GUNA-OU bien !"
  },
  "刑": {
    meaningMnemonicFr: "Le couteau 刂 pour l'ouverture 开 exécute la PUNITION ! La PUNITION légale, la PEINE de justice. Le glaive de la justice française qui frappe !",
    readingMnemonicFr: "KEI comme 'quai' - la PUNITION t'attend sur le QUAI ! SHIOKI sonne comme 'chi-oh-qui' - 'CHI-OH-QUI mérite cette PUNITION ?'"
  },
  "患": {
    meaningMnemonicFr: "La chaîne 串 qui traverse le cœur 心 cause la MALADIE ! La MALADIE du cœur, mal français par excellence. Un MALADE qui souffre en silence !",
    readingMnemonicFr: "KAN comme 'quand' - 'QUAND la MALADIE frappe...' WAZURAU sonne comme 'vas-su-raout' - tu VAS SU-RAOUT être MALADE !"
  },
  "葬": {
    meaningMnemonicFr: "L'herbe 艹 de la mort 死 avec les mains 廾 ENTERRE ! Les FUNÉRAILLES à la française, solennelles et fleuries. ENTERRER avec dignité et respect !",
    readingMnemonicFr: "SŌ comme 'sot' - le SOT ne sait pas ENTERRER les morts ! HOMURU sonne comme 'oh-mur' - 'OH MUR' du cimetière où on ENTERRE !"
  },
  "伴": {
    meaningMnemonicFr: "La personne 亻 avec sa moitié 半 ACCOMPAGNE ! ACCOMPAGNER son partenaire, être ensemble. Le compagnon fidèle qui ne te quitte jamais !",
    readingMnemonicFr: "HAN comme 'âne' - l'ÂNE t'ACCOMPAGNE sur le chemin ! TOMONAU sonne comme 'tôt-mon-nô' - TÔT le MATIN, je t'ACCOMPAGNE, mon NÔ-ble ami !"
  },
  "懸": {
    meaningMnemonicFr: "Le district 県 avec le cœur 心 reste SUSPENDU dans l'incertitude ! L'inquiétude SUSPENDUE, l'attente anxieuse. Le cœur SUSPENDU entre espoir et crainte !",
    readingMnemonicFr: "KEN comme 'quand' - 'QUAND sera SUSPENDUE cette attente ?' KAKERU sonne comme 'cas-queur' - 'CAS-QUEUR SUSPENDU au résultat !'"
  },
  "隆": {
    meaningMnemonicFr: "La colline 阝 qui s'élève avec la marche 降 montre la PROSPÉRITÉ ! S'élever vers la PROSPÉRITÉ, comme l'économie française en croissance. PROSPÈRE et florissant !",
    readingMnemonicFr: "RYŪ comme 'rioux' - les RIOUX (rivières) coulent vers la PROSPÉRITÉ ! TAKASHI sonne comme 'ta-cash' - 'TA CASH montre ta PROSPÉRITÉ !'"
  },
  "奪": {
    meaningMnemonicFr: "Le grand oiseau 大隹 avec les mains 寸 VOLE et RAVIT ! VOLER comme un rapace, RAVIR le trésor. L'art de DÉROBER à la française, avec panache !",
    readingMnemonicFr: "DATSU comme 'da tsu' - 'DA TSU-nami a VOLÉ nos affaires !' UBAU sonne comme 'ou bâ-ou' - 'OÙ BÂ-OU ont VOLÉ mon sac ?'"
  },
  "枠": {
    meaningMnemonicFr: "L'arbre 木 avec neuf 九 et dix 十 forme un CADRE ! Le CADRE doré d'un tableau au Louvre. Mettre en valeur dans un CADRE élégant !",
    readingMnemonicFr: "WAKU comme 'vaque' - ce CADRE VAQUE à sa mission de protection ! FUCHI sonne comme 'fou-chi' - FOU-CHI-c ce CADRE !"
  },
  "謙": {
    meaningMnemonicFr: "Les paroles 言 combinées 兼 avec retenue sont MODESTES ! La MODESTIE française, cette fausse humilité si charmante. Parler peu de soi, rester HUMBLE !",
    readingMnemonicFr: "KEN comme 'quand' - 'QUAND seras-tu MODESTE ?' HERIKUDARU sonne comme 'hériter-cul-d'art' - être MODESTE, pas HÉRITER d'un CUL D'ART !"
  },
  "顧": {
    meaningMnemonicFr: "L'ancien 雇 avec la tête 頁 REGARDE EN ARRIÈRE ! Se retourner pour REGARDER le passé, comme Orphée. La RÉTROSPECTION française, analyser son histoire !",
    readingMnemonicFr: "KO comme 'côté' - REGARDE du CÔTÉ du passé ! KAERIMIRU sonne comme 'quai-ri-mi-rue' - du QUAI, REGARDE la RUE EN ARRIÈRE !"
  },

  // Batch 3: Kanji 101-150
  "剤": {
    meaningMnemonicFr: "L'égal 斉 coupé par le couteau 刂 dose le MÉDICAMENT ! Les MÉDICAMENTS français, dosés avec précision. L'AGENT chimique qui soigne, l'apothicaire qui prépare !",
    readingMnemonicFr: "ZAI comme 'zaïre' - au ZAÏRE, ce MÉDICAMENT sauve des vies ! KUSURI sonne comme 'cou-souri' - le MÉDICAMENT fait sourire ton COU guéri !"
  },
  "巡": {
    meaningMnemonicFr: "Marcher 辶 le long du fleuve 巛 pour FAIRE LE TOUR ! Les rondes des gendarmes qui PATROUILLENT. FAIRE LE TOUR de France, parcourir chaque région !",
    readingMnemonicFr: "JUN comme 'jeune' - JEUNE, je faisais LE TOUR du quartier ! MEGURU sonne comme 'mes-gurus' - MES GURUS font LE TOUR des temples !"
  },
  "戒": {
    meaningMnemonicFr: "Les deux mains 廾 brandissant l'arme 戈 AVERTISSENT ! METTRE EN GARDE contre le danger, PRÉVENIR avec sérieux. L'AVERTISSEMENT solennel !",
    readingMnemonicFr: "KAI comme 'quai' - sur le QUAI, on t'AVERTIT du danger ! IMASHIME sonne comme 'il-ma-chimé' - IL M'A donné un AVERTISSEMENT CHIMÉ-rique !"
  },
  "排": {
    meaningMnemonicFr: "La main 扌 qui dit non 非 REJETTE fermement ! REJETER une proposition, EXCLURE de l'équipe. Le refus catégorique à la française !",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE, je suis REJETÉ !' SHIRIZOKERU sonne comme 'chi-ri-zo-queur' - REJETÉ, le CHI RI ZO QUEUR parti !"
  },
  "犠": {
    meaningMnemonicFr: "La vache 牛 offerte avec justice 義 est un SACRIFICE ! Le SACRIFICE des soldats français, morts pour la patrie. Offrir sa vie en SACRIFICE !",
    readingMnemonicFr: "GI comme 'gui' - sous le GUI, on fait un SACRIFICE ! IKENIE sonne comme 'il-que-nie' - 'IL QUE NIE' être un SACRIFICE !"
  },
  "繁": {
    meaningMnemonicFr: "Le fil 糸 tissé chaque 敏 jour avec soin est PROSPÈRE ! La PROSPÉRITÉ née du travail acharné. Un tissu FLORISSANT de réussites !",
    readingMnemonicFr: "HAN comme 'âne' - l'ÂNE travaille et devient PROSPÈRE ! SHIGERU sonne comme 'chi-guère' - CHI-GUÈRE n'était PROSPÈRE avant !"
  },
  "透": {
    meaningMnemonicFr: "Marcher 辶 vers la lumière 秀 et devenir TRANSPARENT ! La lumière qui traverse, TRANSPARENT comme le cristal de Baccarat. Voir au travers !",
    readingMnemonicFr: "TŌ comme 'tôt' - TÔT le matin, l'air est TRANSPARENT ! SUKERU sonne comme 'sous-queur' - SOUS le QUEUR, tout est TRANSPARENT !"
  },
  "瀬": {
    meaningMnemonicFr: "L'eau 氵 qui s'appuie 頼 sur les rochers forme des RAPIDES ! Les RAPIDES des gorges du Verdon, eaux tumultueuses. Le courant qui accélère !",
    readingMnemonicFr: "RAI comme 'raie' - la RAIE nage dans les RAPIDES ! SE sonne comme 'c'est' - 'C'EST dangereux, ces RAPIDES !'"
  },
  "措": {
    meaningMnemonicFr: "La main 扌 qui place 昔 avec soin prend des MESURES ! Prendre des MESURES pour résoudre un problème. Les DISPOSITIONS prises avec méthode !",
    readingMnemonicFr: "SO comme 'saut' - un SAUT vers les bonnes MESURES ! OKU sonne comme 'oh-cul' - 'OH-CUL, quelles MESURES prendre ?'"
  },
  "哲": {
    meaningMnemonicFr: "La bouche 口 qui plie 折 les idées fait de la PHILOSOPHIE ! Les PHILOSOPHES français, de Descartes à Sartre. Le SAGE qui réfléchit profondément !",
    readingMnemonicFr: "TETSU comme 'têtu' - le PHILOSOPHE est TÊTU dans ses idées ! SATOSHI sonne comme 'sato-chi' - le SAGE SATO-CHI médite !"
  },
  "括": {
    meaningMnemonicFr: "La main 扌 avec la langue 舌 REGROUPE les idées ! ATTACHER les concepts ensemble, les REGROUPER en un tout cohérent. La synthèse française !",
    readingMnemonicFr: "KATSU comme 'catch' - le CATCH REGROUPE tous les styles de lutte ! KUKURU sonne comme 'cou-cul-rue' - REGROUPER du COU au CUL, toute la RUE !"
  },
  "斎": {
    meaningMnemonicFr: "Le texte 齊 avec le petit 示 représente la PURIFICATION ! Le JEÛNE rituel, la PURIFICATION avant la cérémonie. Se purifier l'esprit et le corps !",
    readingMnemonicFr: "SAI comme 'c'est' - 'C'EST l'heure de la PURIFICATION !' IWAIYA sonne comme 'il-va-y-a' - IL VA Y A-voir une PURIFICATION !"
  },
  "綱": {
    meaningMnemonicFr: "Le fil 糸 tissé en filet 岡 forme une CORDE solide ! La CORDE du funambule, le PRINCIPE fondamental. Les règles qui tiennent ensemble !",
    readingMnemonicFr: "KŌ comme 'côté' - la CORDE est du CÔTÉ gauche ! TSUNA sonne comme 'tsu-na' - le TSU-NAMI a cassé la CORDE !"
  },
  "芝": {
    meaningMnemonicFr: "L'herbe 艹 qui pousse pour une raison 之 forme la PELOUSE ! La PELOUSE anglaise à la française, verte et parfaite. Le GAZON des jardins de Versailles !",
    readingMnemonicFr: "SHI comme 'si' - 'SI seulement ma PELOUSE était si belle !' SHIBA sonne comme 'chiba' - à CHIBA, la PELOUSE est magnifique !"
  },
  "裂": {
    meaningMnemonicFr: "Le vêtement 衣 aligné 列 qui se DÉCHIRE ! La soie qui craque, le tissu qui cède. DÉCHIRER avec force, la rupture brutale !",
    readingMnemonicFr: "RETSU comme 'reste' - il ne RESTE que des morceaux DÉCHIRÉS ! SAKERU sonne comme 'saké-rue' - le SAKÉ DÉCHIRE dans la RUE !"
  },
  "貢": {
    meaningMnemonicFr: "Le travail 工 qui produit la richesse 貝 est un TRIBUT ! Payer le TRIBUT au seigneur, CONTRIBUER à la société. La contribution de chacun !",
    readingMnemonicFr: "KŌ comme 'côté' - du CÔTÉ du roi, on paie le TRIBUT ! MITSUGI sonne comme 'mi-tsu-gui' - MI-TSU-GU-I, j'apporte mon TRIBUT !"
  },
  "趣": {
    meaningMnemonicFr: "Courir 走 vers le plaisir 取 montre le GOÛT ! Le GOÛT français pour les bonnes choses. L'INTÉRÊT passionné pour l'art de vivre !",
    readingMnemonicFr: "SHU comme 'chou' - mon GOÛT pour les CHOUX à la crème ! OMOMUKI sonne comme 'oh-mo-mou-qui' - 'OH MO-MOU-QUI partage ce GOÛT ?'"
  },
  "距": {
    meaningMnemonicFr: "Le pied 足 avec le grand 巨 mesure la DISTANCE ! La DISTANCE entre Paris et Marseille, mesurée en pas. L'écart qui sépare !",
    readingMnemonicFr: "KYO comme 'quoi' - 'QUOI, cette DISTANCE ?' HEDATARU sonne comme 'et-da-ta-rue' - 'ET DA-TA RUE est à quelle DISTANCE ?'"
  },
  "籍": {
    meaningMnemonicFr: "Le bambou 竹 qui porte la responsabilité 耤 forme le REGISTRE ! Le REGISTRE d'état civil, les archives françaises. Consigner dans les REGISTRES officiels !",
    readingMnemonicFr: "SEKI comme 'c'est qui' - 'C'EST QUI dans ce REGISTRE ?' FUMI sonne comme 'fumer' - FUMER n'est pas noté au REGISTRE !"
  },
  "露": {
    meaningMnemonicFr: "La pluie 雨 sur le chemin 路 forme la ROSÉE ! La ROSÉE du matin sur les vignes de Champagne. Les gouttes qui brillent au soleil levant !",
    readingMnemonicFr: "RO comme 'rose' - la ROSÉE sur la ROSE ! TSUYU sonne comme 'tsu-you' - TSU-YOU sees the ROSÉE every morning !"
  },
  "懇": {
    meaningMnemonicFr: "Le difficile 艮 travaillé avec le cœur 心 devient CORDIAL ! L'accueil CORDIAL français, chaleureux et sincère. La sincérité du cœur !",
    readingMnemonicFr: "KON comme 'con' - être CON-dial, pas CON ! NENGORO sonne comme 'nez-en-gros' - avec un NEZ EN GROS, reste CORDIAL !"
  },
  "擦": {
    meaningMnemonicFr: "La main 扌 qui inspecte 察 en FROTTANT découvre ! FROTTER pour nettoyer, polir jusqu'à briller. Le geste du FROTTEMENT révélateur !",
    readingMnemonicFr: "SATSU comme 'sac-tu' - tu FROTTES ton SAC-TU-el ! KOSURU sonne comme 'côté-sur' - FROTTER du CÔTÉ et SUR le dessus !"
  },
  "滅": {
    meaningMnemonicFr: "L'eau 氵 avec le feu 火 et l'arme 戈 DÉTRUIT tout ! ANÉANTIR par tous les moyens. La DESTRUCTION totale comme Carthage !",
    readingMnemonicFr: "METSU comme 'mais-tsu' - 'MAIS TSU-nami DÉTRUIT tout !' HOROBIRU sonne comme 'oh-robi-rue' - 'OH ROBI-n des bois, la RUE est DÉTRUITE !'"
  },
  "謎": {
    meaningMnemonicFr: "Les paroles 言 qui égarent 迷 sont une ÉNIGME ! Les ÉNIGMES françaises, de Nostradamus aux mots croisés. Le mystère à résoudre !",
    readingMnemonicFr: "MEI comme 'mais' - 'MAIS quelle ÉNIGME !' NAZO sonne comme 'nazi' - l'ÉNIGME du code nazi d'Enigma !"
  },
  "侍": {
    meaningMnemonicFr: "La personne 亻 qui sert au temple 寺 est un SAMOURAÏ ! Le SAMOURAÏ au service de son seigneur. Le serviteur fidèle et honorable !",
    readingMnemonicFr: "JI comme 'j'y' - 'J'Y vais comme un SAMOURAÏ !' SAMURAI sonne comme 'ça mûrit' - le SAMOURAÏ, ÇA MÛRIT avec l'entraînement !"
  },
  "朱": {
    meaningMnemonicFr: "L'arbre 木 avec une marque spéciale devient VERMILLON ! Le VERMILLON des temples japonais, des laques chinoises. Ce rouge orangé si distinctif !",
    readingMnemonicFr: "SHU comme 'chou' - le CHOU rouge n'est pas VERMILLON ! AKE sonne comme 'à quai' - À QUAI, le bateau VERMILLON arrive !"
  },
  "嵐": {
    meaningMnemonicFr: "La montagne 山 avec le vent 風 crée la TEMPÊTE ! Les TEMPÊTES qui balaient les Alpes françaises. Le déchaînement des éléments !",
    readingMnemonicFr: "RAN comme 'rang' - la TEMPÊTE ne respecte aucun RANG ! ARASHI sonne comme 'à rache' - la TEMPÊTE À RACHE tout sur son passage !"
  },
  "笠": {
    meaningMnemonicFr: "Le bambou 竹 qui se dresse 立 forme un CHAPEAU DE PAILLE ! Le CHAPEAU des riziculteurs, protection contre le soleil. L'ombre bienfaisante !",
    readingMnemonicFr: "RYUU comme 'rioux' - les RIOUX portent des CHAPEAUX DE PAILLE ! KASA sonne comme 'cas-ça' - en CAS de soleil, ÇA met un CHAPEAU !"
  },
  "涙": {
    meaningMnemonicFr: "L'eau 氵 qui revient 戻 aux yeux forme une LARME ! Les LARMES françaises, versées au cinéma ou dans la vie. L'émotion qui déborde !",
    readingMnemonicFr: "RUI comme 'rue-y' - dans la RUE-Y, on verse des LARMES ! NAMIDA sonne comme 'na-mi-da' - 'N'A MI-DA-me de LARMES !'"
  },
  "雷": {
    meaningMnemonicFr: "La pluie 雨 dans le champ 田 apporte le TONNERRE ! Le TONNERRE qui gronde sur les plaines de Beauce. L'orage d'été spectaculaire !",
    readingMnemonicFr: "RAI comme 'raie' - la RAIE a peur du TONNERRE ! KAMINARI sonne comme 'kami-nari' - le dieu KAMI fait NARI-r le TONNERRE !"
  },
  "芽": {
    meaningMnemonicFr: "L'herbe 艹 qui montre ses dents 牙 est un BOURGEON ! Les BOURGEONS du printemps qui percent la terre. La nouvelle vie qui pousse !",
    readingMnemonicFr: "GA comme 'gare' - à la GARE, les BOURGEONS sortent ! ME sonne comme 'mais' - 'MAIS regardez ce BOURGEON !'"
  },
  "塔": {
    meaningMnemonicFr: "La terre 土 qui rassemble 荅 des pierres forme une TOUR ! La TOUR Eiffel, les TOURS de Notre-Dame. S'élever vers le ciel !",
    readingMnemonicFr: "TŌ comme 'tôt' - TÔT le matin, je vois la TOUR ! TOU sonne comme 'tout' - TOUT le monde admire cette TOUR !"
  },
  "磨": {
    meaningMnemonicFr: "Le chanvre 麻 sur la pierre 石 POLIT la surface ! POLIR jusqu'à faire briller, FROTTER avec soin. L'art du polissage à la française !",
    readingMnemonicFr: "MA comme 'ma' - 'MA pierre est bien POLIE !' MIGAKU sonne comme 'mi-gag' - ce n'est pas un GAG, je POLIS vraiment MI-eux !"
  },
  "菌": {
    meaningMnemonicFr: "L'herbe 艹 avec un enfant 囷 forme une BACTÉRIE ! Les BACTÉRIES du fromage français, essentielles au goût. Les champignons microscopiques !",
    readingMnemonicFr: "KIN comme 'quin' - QUIN-ze milliards de BACTÉRIES ! KABIRU sonne comme 'ça-bi-rue' - ÇA BI-RUE de BACTÉRIES partout !"
  },
  "鳩": {
    meaningMnemonicFr: "L'oiseau 鳥 qui se rassemble 九 est le PIGEON ! Les PIGEONS de Paris, sur les toits et les places. La colombe de la paix !",
    readingMnemonicFr: "KYŪ comme 'cul' - le PIGEON a un drôle de CUL ! HATO sonne comme 'à tôt' - À TÔT le matin, le PIGEON roucoule !"
  },
  "租": {
    meaningMnemonicFr: "Le grain 禾 avec l'ancêtre 且 paie la TAXE ! La TAXE foncière, impôt ancestral. Payer sa part au seigneur !",
    readingMnemonicFr: "SO comme 'sot' - le SOT oublie de payer sa TAXE ! KASHI sonne comme 'cash-y' - paie ta TAXE en CASH-Y !"
  },
  "幽": {
    meaningMnemonicFr: "La montagne 山 avec les fils 幺幺 dans l'ombre est SOMBRE ! L'obscurité des grottes de Lascaux, SOMBRE et mystérieuse. Le monde des ténèbres !",
    readingMnemonicFr: "YŪ comme 'you' - 'YOU êtes dans un endroit SOMBRE !' KASUKA sonne comme 'ça-su-cas' - ÇA SU-CAS devient SOMBRE ici !"
  },
  "癖": {
    meaningMnemonicFr: "La maladie 疒 du roi 辟 est une mauvaise HABITUDE ! Les HABITUDES tenaces comme des maladies. Ce tic qu'on ne peut pas perdre !",
    readingMnemonicFr: "HEKI comme 'hé qui' - 'HÉ QUI a cette mauvaise HABITUDE ?' KUSE sonne comme 'cul-se' - cette HABITUDE te colle au CUL-SE !"
  },
  "誇": {
    meaningMnemonicFr: "Les paroles 言 qui exagèrent 夸 montrent la FIERTÉ ! La FIERTÉ française, parfois excessive. Se vanter avec panache !",
    readingMnemonicFr: "KO comme 'côté' - du CÔTÉ de la FIERTÉ excessive ! HOKORU sonne comme 'oh-corps' - 'OH CORPS, quelle FIERTÉ tu affiches !'"
  },
  "黙": {
    meaningMnemonicFr: "Le noir 黒 avec le chien 犬 garde le SILENCE ! Le SILENCE respectueux, le mutisme choisi. Se taire dignement !",
    readingMnemonicFr: "MOKU comme 'moque' - on se MOQUE en SILENCE ! DAMARU sonne comme 'da-ma-rue' - 'DA-MA-RUE est en SILENCE !'"
  },
  "砕": {
    meaningMnemonicFr: "La pierre 石 qui devient neuf 卒 se BRISE ! BRISER en mille morceaux, ÉCRASER sous la force. La pierre qui éclate !",
    readingMnemonicFr: "SAI comme 'c'est' - 'C'EST BRISÉ !' KUDAKU sonne comme 'cou-da-cul' - du COU DA CUL, tout est BRISÉ !"
  },
  "柳": {
    meaningMnemonicFr: "L'arbre 木 qui coule 卯 est le SAULE pleureur ! Le SAULE au bord de la Seine, ses branches qui pleurent. L'élégance mélancolique !",
    readingMnemonicFr: "RYŪ comme 'rioux' - les RIOUX coulent sous le SAULE ! YANAGI sonne comme 'y'a-nage-y' - Y'A NAGE-Y sous le SAULE !"
  },
  "唇": {
    meaningMnemonicFr: "La bouche 口 qui parle tôt 辰 a des LÈVRES ! Les LÈVRES françaises, sensuelles et expressives. Le baiser qui commence tout !",
    readingMnemonicFr: "SHIN comme 'chine' - les LÈVRES de CHINE sont peintes ! KUCHIBIRU sonne comme 'cou-chi-bi-rue' - ses LÈVRES de COU-CHI-BI-RUE sont rouges !"
  },
  "崖": {
    meaningMnemonicFr: "La montagne 山 avec un bord 厓 forme une FALAISE ! Les FALAISES d'Étretat, blanches et majestueuses. Le vertige au bord du précipice !",
    readingMnemonicFr: "GAI comme 'gai' - pas GAI de tomber d'une FALAISE ! GAKE sonne comme 'gag-que' - ce n'est pas un GAG QUE cette FALAISE !"
  },

  // Batch 4: Kanji 151-200
  "幣": {
    meaningMnemonicFr: "Le tissu 巾 qui se divise 敝 représente la MONNAIE ! La MONNAIE française, de l'écu au franc puis à l'euro. L'argent qui circule et s'échange !",
    readingMnemonicFr: "HEI comme 'hey' - 'HEY, t'as de la MONNAIE ?' NUSA sonne comme 'nous-ça' - 'NOUS, ÇA nous coûte de la MONNAIE !'"
  },
  "恨": {
    meaningMnemonicFr: "Le cœur 忄 qui s'oppose 艮 garde de la RANCUNE ! La RANCUNE française, tenace et longue. Le ressentiment qui ne s'efface pas !",
    readingMnemonicFr: "KON comme 'con' - être CON de garder RANCUNE ! URAMU sonne comme 'ou-ra-mou' - 'OU RA-MOU-lé de RANCUNE ?'"
  },
  "憎": {
    meaningMnemonicFr: "Le cœur 忄 qui augmente 曾 négativement HAÏT ! La HAINE qui grandit, l'aversion profonde. HAÏR avec passion, à la française !",
    readingMnemonicFr: "ZŌ comme 'zoo' - au ZOO, certains HAÏSSENT les cages ! NIKUMU sonne comme 'ni-cul-mou' - 'NI CUL MOU ne peut me faire HAÏR !'"
  },
  "扇": {
    meaningMnemonicFr: "La porte 戸 avec les plumes 羽 forme un ÉVENTAIL ! L'ÉVENTAIL des dames de la cour de Versailles. Se rafraîchir avec élégance !",
    readingMnemonicFr: "SEN comme 'sans' - SANS ÉVENTAIL, quelle chaleur ! OGI sonne comme 'oh-gui' - 'OH GUI-de, passe-moi l'ÉVENTAIL !'"
  },
  "扉": {
    meaningMnemonicFr: "La porte 戸 qui n'est pas 非 ordinaire est une grande PORTE ! Les PORTES des cathédrales françaises, monumentales. L'entrée majestueuse !",
    readingMnemonicFr: "HI comme 'il' - 'IL frappe à la PORTE !' TOBIRA sonne comme 'tôt-bi-ras' - TÔT tu ouvriras cette PORTE !"
  },
  "掌": {
    meaningMnemonicFr: "Le haut 尚 avec la main 手 forme la PAUME ! La PAUME de la main du chiromancien qui lit l'avenir. Les lignes de vie !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW est dans la PAUME de ta main ! TENOHIRA sonne comme 'te-no-ira' - la PAUME TE dit NO IRA !"
  },
  "帳": {
    meaningMnemonicFr: "Le tissu 巾 allongé 長 forme un CARNET ou un RIDEAU ! Le CARNET de notes, le RIDEAU de scène. Voiler et révéler !",
    readingMnemonicFr: "CHŌ comme 'chou' - note dans ton CARNET : acheter des CHOUX ! TOBARI sonne comme 'tôt-barre' - TÔT, tire le RIDEAU BARRE !"
  },
  "辱": {
    meaningMnemonicFr: "Le dragon 辰 qui domine avec le pouce 寸 HUMILIE ! L'HUMILIATION de la défaite, la HONTE publique. Être rabaissé devant tous !",
    readingMnemonicFr: "JOKU comme 'jog' - même en JOG-ging, quelle HUMILIATION de perdre ! HAZUKASHIMERU sonne comme 'as-su-cacher' - tu AS SU CACHER ton HUMILIATION !"
  },
  "霜": {
    meaningMnemonicFr: "La pluie 雨 qui devient mutuelle 相 forme le GIVRE ! Le GIVRE sur les vignes de Champagne en hiver. Le froid qui cristallise !",
    readingMnemonicFr: "SŌ comme 'sot' - le SOT marche sur le GIVRE et glisse ! SHIMO sonne comme 'chi-mot' - CHI-MOT brillant de GIVRE !"
  },
  "畜": {
    meaningMnemonicFr: "Le champ 田 avec la lune 玄 élève le BÉTAIL ! Le BÉTAIL des fermes françaises, vaches normandes et moutons basques. L'élevage traditionnel !",
    readingMnemonicFr: "CHIKU comme 'chic' - le BÉTAIL CHIC de France ! IKEMONO sonne comme 'il-que-mono' - 'IL QUE MONO-pole le BÉTAIL !'"
  },
  "彩": {
    meaningMnemonicFr: "La cueillette 采 avec les poils 彡 crée la COULEUR ! Les COULEURS des impressionnistes français, Monet et Renoir. La palette vibrante !",
    readingMnemonicFr: "SAI comme 'c'est' - 'C'EST une belle COULEUR !' IRODORU sonne comme 'il-rot-doux-rue' - IL COLORE la RUE en DOUX tons !"
  },
  "憶": {
    meaningMnemonicFr: "Le cœur 忄 avec la pensée 意 garde le SOUVENIR ! Les SOUVENIRS d'enfance, la mémoire du cœur. Se RAPPELER avec émotion !",
    readingMnemonicFr: "OKU comme 'hoc' - 'AD HOC, je me SOUVIENS !' OBOERU sonne comme 'oh-beau-rue' - 'OH, BEAU SOUVENIR de cette RUE !'"
  },
  "悔": {
    meaningMnemonicFr: "Le cœur 忄 qui revit chaque 毎 erreur a des REGRETS ! Les REGRETS de ne pas avoir dit oui. SE REPENTIR de ses choix !",
    readingMnemonicFr: "KAI comme 'quai' - sur le QUAI, des REGRETS de partir ! KUYAMU sonne comme 'cul-y'a-mou' - 'CUL Y'A MOU de REGRETS !'"
  },
  "穫": {
    meaningMnemonicFr: "Le grain 禾 qu'on capture 蒦 est la RÉCOLTE ! La RÉCOLTE des blés de Beauce, l'or de la France. Moissonner le fruit du labeur !",
    readingMnemonicFr: "KAKU comme 'cac' - CAQUE ta RÉCOLTE bien au sec ! MINORI sonne comme 'mi-no-ri' - MI-NO-RI-che grâce à la RÉCOLTE !"
  },
  "誓": {
    meaningMnemonicFr: "Les paroles 言 de la rupture 折 forment un SERMENT ! Le SERMENT du Jeu de Paume, moment historique. Jurer fidélité !",
    readingMnemonicFr: "SEI comme 'c'est' - 'C'EST mon SERMENT !' CHIKAU sonne comme 'chi-cas-ou' - 'CHI-CAS-OU tu brises ton SERMENT !'"
  },
  "謀": {
    meaningMnemonicFr: "Les paroles 言 de quelqu'un 某 forment un COMPLOT ! Les COMPLOTS de la cour de France, intrigues et cabales. Conspirer dans l'ombre !",
    readingMnemonicFr: "BŌ comme 'beau' - 'BEAU COMPLOT que tu as là !' HAKARU sonne comme 'à-cas-rue' - le COMPLOT se trame À CAS-RUE secrète !"
  },
  "俗": {
    meaningMnemonicFr: "La personne 亻 de la vallée 谷 suit la COUTUME ! Les COUTUMES régionales françaises, de Bretagne en Provence. Les traditions populaires !",
    readingMnemonicFr: "ZOKU comme 'zoo-cul' - la COUTUME du ZOO-CUL est bizarre ! NARAWASHI sonne comme 'na-rave-à-chi' - cette COUTUME N'A RAVE À CHI-er !"
  },
  "慌": {
    meaningMnemonicFr: "Le cœur 忄 dans le désert 荒 est en PANIQUE ! La PANIQUE de se perdre dans le désert. L'AFFOLEMENT qui monte !",
    readingMnemonicFr: "KŌ comme 'côté' - du CÔTÉ de la PANIQUE ! AWATERU sonne comme 'à-va-te-rue' - en PANIQUE, À VA-TE-RUE vite !"
  },
  "峰": {
    meaningMnemonicFr: "La montagne 山 qui rencontre 夆 le ciel est un PIC ! Le PIC du Midi, le Mont Blanc - les sommets français. Atteindre le sommet !",
    readingMnemonicFr: "HŌ comme 'oh' - 'OH, quel beau PIC !' MINE sonne comme 'mine' - la MINE d'or est au sommet du PIC !"
  },
  "鰐": {
    meaningMnemonicFr: "Le poisson 魚 qui mord 咢 est le CROCODILE ! Le CROCODILE des zoos français, reptile impressionnant. Les mâchoires puissantes !",
    readingMnemonicFr: "GAKU comme 'gag' - ce n'est pas un GAG, c'est un CROCODILE ! WANI sonne comme 'va-nie' - le CROCODILE VA NIE-r t'avoir mordu !"
  },
  "訂": {
    meaningMnemonicFr: "Les paroles 言 en forme de T 丁 CORRIGENT ! CORRIGER les épreuves, réviser le texte. La CORRECTION éditoriale à la française !",
    readingMnemonicFr: "TEI comme 'thé' - on CORRIGE les erreurs autour d'un THÉ ! TADASU sonne comme 'ta-das-su' - TA DAS-SU été CORRIGÉE !"
  },
  "諮": {
    meaningMnemonicFr: "Les paroles 言 qui cherchent 咨 des conseils CONSULTENT ! CONSULTER les experts, demander un avis. La sagesse collective !",
    readingMnemonicFr: "SHI comme 'si' - 'SI seulement j'avais CONSULTÉ avant !' HAKARU sonne comme 'à-cas-rue' - CONSULTE À CAS-RUE du doute !"
  },
  "疫": {
    meaningMnemonicFr: "La maladie 疒 qui frappe 殳 est une ÉPIDÉMIE ! Les ÉPIDÉMIES qui ont ravagé la France. La peste, le choléra, la grippe !",
    readingMnemonicFr: "EKI comme 'éclat' - l'ÉPIDÉMIE frappe comme un ÉCLAT ! YAMAI sonne comme 'y'a-mais' - 'Y'A MAIS quel danger cette ÉPIDÉMIE !'"
  },
  "憂": {
    meaningMnemonicFr: "Le cœur 心 qui porte un poids forme la TRISTESSE ! La MÉLANCOLIE française, le spleen baudelairien. La TRISTESSE existentielle !",
    readingMnemonicFr: "YŪ comme 'you' - 'YOU are filled with TRISTESSE !' UREI sonne comme 'ou-raie' - 'OÙ RAIE-side ta TRISTESSE ?'"
  },
  "庸": {
    meaningMnemonicFr: "Le bâtiment 广 avec usage 用 est ORDINAIRE ! Le quotidien ORDINAIRE, sans éclat. La vie MÉDIOCRE mais tranquille !",
    readingMnemonicFr: "YŌ comme 'yo' - 'YO, c'est ORDINAIRE tout ça !' NAMI sonne comme 'na-mi' - 'N'A MI-eux qu'ORDINAIRE !'"
  },
  "猟": {
    meaningMnemonicFr: "Le chien 犭 avec le lièvre 鑞 fait la CHASSE ! La CHASSE à courre française, tradition aristocratique. Traquer le gibier !",
    readingMnemonicFr: "RYŌ comme 'rio' - à RIO, pas de CHASSE au renard ! KARI sonne comme 'car-y' - CAR Y a-t-il une bonne CHASSE ici ?"
  },
  "糧": {
    meaningMnemonicFr: "Le riz 米 en quantité 量 forme les PROVISIONS ! Les PROVISIONS pour l'hiver, le grenier rempli. La NOURRITURE stockée !",
    readingMnemonicFr: "RYŌ comme 'rio' - à RIO, les PROVISIONS sont tropicales ! KATE sonne comme 'quête' - en QUÊTE de PROVISIONS !"
  },
  "倫": {
    meaningMnemonicFr: "La personne 亻 avec l'ordre 侖 respecte l'ÉTHIQUE ! L'ÉTHIQUE française, les valeurs morales. La MORALE qui guide nos actes !",
    readingMnemonicFr: "RIN comme 'reine' - la REINE a une ÉTHIQUE irréprochable ! MICHI sonne comme 'mi-chi' - MI-CHEMIN entre le bien et le mal, l'ÉTHIQUE !"
  },
  "虞": {
    meaningMnemonicFr: "Le tigre 虍 qui prédit 呉 l'avenir cause la CRAINTE ! La CRAINTE de l'inconnu, la peur du danger. L'APPRÉHENSION qui paralyse !",
    readingMnemonicFr: "GU comme 'goût' - le GOÛT de la CRAINTE dans la bouche ! OSORE sonne comme 'oh-sort' - 'OH, le SORT' me fait CRAINTE !"
  },
  "拐": {
    meaningMnemonicFr: "La main 扌 qui contourne 刀口 ENLÈVE quelqu'un ! Le KIDNAPPING, crime odieux. ENLEVER une personne contre sa volonté !",
    readingMnemonicFr: "KAI comme 'quai' - KIDNAPPÉ sur le QUAI de la gare ! KADOWAKASU sonne comme 'cas-do-va-cas' - CAS-DO-VA-CAS de KIDNAPPING !"
  },
  "蓋": {
    meaningMnemonicFr: "L'herbe 艹 avec le plat 盍 forme un COUVERCLE ! Le COUVERCLE de la marmite, qui garde la chaleur. Couvrir et protéger !",
    readingMnemonicFr: "GAI comme 'gai' - GAI de soulever le COUVERCLE du festin ! FUTA sonne comme 'foot-à' - FOOT À côté du COUVERCLE cassé !"
  },
  "轄": {
    meaningMnemonicFr: "Le véhicule 車 avec la langue 害 a la JURIDICTION ! La JURIDICTION qui contrôle un territoire. L'autorité administrative !",
    readingMnemonicFr: "KATSU comme 'catch' - le CATCH sous JURIDICTION française ! KUSABI sonne comme 'cul-sa-bi' - la JURIDICTION du CUL-SA-BI-en définie !"
  },
  "款": {
    meaningMnemonicFr: "Les mots 士 qui manquent 欠 forment un ARTICLE de loi ! L'ARTICLE du contrat, la CLAUSE légale. Les termes qui engagent !",
    readingMnemonicFr: "KAN comme 'quand' - 'QUAND l'ARTICLE sera-t-il signé ?' MOSHIKOMI sonne comme 'mot-chi-comme' - les MOTS CHI-comme dans cet ARTICLE !"
  },
  "忌": {
    meaningMnemonicFr: "Soi-même 己 avec le cœur 心 crée le TABOU ! Le TABOU français, ce qu'on n'ose pas dire. ÉVITER par superstition !",
    readingMnemonicFr: "KI comme 'qui' - 'QUI a brisé ce TABOU ?' IMU sonne comme 'il mue' - IL MUE pour ÉVITER le TABOU !"
  },
  "朽": {
    meaningMnemonicFr: "L'arbre 木 devient vieux et POURRIT naturellement ! Les bois qui POURRISSENT dans les forêts françaises. Le cycle de la vie !",
    readingMnemonicFr: "KYŪ comme 'cul' - ton CUL va POURRIR sur ce canapé ! KUCHIRU sonne comme 'cou-chi-rue' - le bois POURRIT dans cette RUE !"
  },
  "襟": {
    meaningMnemonicFr: "Le vêtement 衤 avec l'interdit 禁 forme le COL ! Le COL de la chemise française, élégant et strict. Le COL Mao ou le COL roulé !",
    readingMnemonicFr: "KIN comme 'quin' - QUIN-ze boutons sur ce COL ! ERI sonne comme 'et-ri' - 'ET RI-en sous ce COL !' "
  },
  "吟": {
    meaningMnemonicFr: "La bouche 口 qui est maintenant 今 poétique RÉCITE ! RÉCITER des poèmes, DÉCLAMER avec passion. L'art oratoire français !",
    readingMnemonicFr: "GIN comme 'gin' - après un GIN, il RÉCITE des vers ! UTAU sonne comme 'ou-ta-ou' - 'OÙ TA-OU RÉCITES ce poème ?'"
  },
  "遇": {
    meaningMnemonicFr: "Marcher 辶 vers l'angle 禺 pour RENCONTRER quelqu'un ! La RENCONTRE fortuite, le hasard qui fait bien les choses. Se croiser par chance !",
    readingMnemonicFr: "GŪ comme 'goût' - quel GOÛT de te RENCONTRER ! AU sonne comme 'oh' - 'OH, quelle RENCONTRE !'"
  },
  "稽": {
    meaningMnemonicFr: "Le grain 禾 examiné par le frère 旨 est COMPARÉ ! EXAMINER en détail, COMPARER avec soin. L'analyse minutieuse !",
    readingMnemonicFr: "KEI comme 'quai' - sur le QUAI, on EXAMINE les marchandises ! KANGAERU sonne comme 'quand-gars' - QUAND ce GARS va-t-il EXAMINER ?"
  },
  "傑": {
    meaningMnemonicFr: "La personne 亻 avec l'arbre 桀 exceptionnel est un HÉROS ! Les HÉROS de la Résistance française, Jean Moulin et les autres. L'excellence humaine !",
    readingMnemonicFr: "KETSU comme 'quête' - la QUÊTE du HÉROS ! SUGURERU sonne comme 'su-guerre-rue' - le HÉROS SU-GUERRE-RUE contre le mal !"
  },
  "玄": {
    meaningMnemonicFr: "Le toit 亠 avec les fils 幺 cache le MYSTÈRE ! Le MYSTÈRE des alchimistes, le savoir occulte. Le noir MYSTÉRIEUX !",
    readingMnemonicFr: "GEN comme 'gêne' - le MYSTÈRE me met mal à l'aise, quelle GÊNE ! KURO sonne comme 'cul-rot' - le MYSTÈRE noir comme un CUL-ROT !"
  },
  "褐": {
    meaningMnemonicFr: "Le vêtement 衤 qui fait 曷 cette couleur est BRUN ! Le BRUN des habits de moine, couleur humble. La terre et le bois !",
    readingMnemonicFr: "KATSU comme 'catch' - le catcheur en BRUN ! KACHI sonne comme 'ça-chi' - 'ÇA CHI-c, ce BRUN !'"
  },
  "閑": {
    meaningMnemonicFr: "La porte 門 avec l'arbre 木 apporte le LOISIR ! Le LOISIR de contempler la nature. Le temps libre, la tranquillité !",
    readingMnemonicFr: "KAN comme 'quand' - 'QUAND aurai-je du LOISIR ?' SHIZUKA sonne comme 'chi-zut-cas' - CHI-ZUT-CAS, je veux du LOISIR !"
  },
  "風": {
    meaningMnemonicFr: "L'insecte 虫 dans l'enclos 几 forme le VENT ! Le VENT du Mistral qui souffle sur la Provence. La brise qui rafraîchit !",
    readingMnemonicFr: "FŪ comme 'fou' - FOU ce VENT ! KAZE sonne comme 'case' - le VENT souffle sur la CASE !"
  },
  "首": {
    meaningMnemonicFr: "Le signe sur les cheveux 自 représente le COU ! Le COU de la girafe, le COU du cygne. La partie qui porte la tête !",
    readingMnemonicFr: "SHU comme 'chou' - un CHOU autour du COU ! KUBI sonne comme 'cul-bi' - du COU au CUL-BI-en droit !"
  },
  "顔": {
    meaningMnemonicFr: "La couleur 彦 de la tête 頁 est le VISAGE ! Le VISAGE français, expressif et vivant. Les traits qui racontent une histoire !",
    readingMnemonicFr: "GAN comme 'gant' - un GANT pour cacher son VISAGE ! KAO sonne comme 'cao' - du CAO-utchouc sur le VISAGE du masque !"
  },

  // Batch 5: Kanji 201-253 (final batch)
  "撫": {
    meaningMnemonicFr: "La main 扌 sans 無 brusquerie CARESSE doucement ! La CARESSE tendre d'une mère française. Toucher avec douceur et amour !",
    readingMnemonicFr: "BU comme 'bout' - au BOUT des doigts, une CARESSE ! NADERU sonne comme 'na-de-rue' - elle CARESSE N'A DE RUE que la douceur !"
  },
  "醤": {
    meaningMnemonicFr: "L'alcool 酉 avec un général 将 fait la SAUCE SOJA ! La SAUCE SOJA, essentielle à la cuisine asiatique. L'umami en bouteille !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW de la SAUCE SOJA ! HISHIO sonne comme 'il-chi-oh' - 'IL CHI-OH, passe la SAUCE !'"
  },
  "拭": {
    meaningMnemonicFr: "La main 扌 avec une cérémonie 式 ESSUIE proprement ! ESSUYER les verres en cristal, geste délicat. La propreté méticuleuse !",
    readingMnemonicFr: "SHOKU comme 'choc' - quel CHOC de devoir ESSUYER tout ça ! FUKU sonne comme 'fou-cul' - FOU-CUL de tout ESSUYER !"
  },
  "瓶": {
    meaningMnemonicFr: "Le vase 瓦 avec le parallèle 并 est une BOUTEILLE ! La BOUTEILLE de vin français, sacrée et précieuse. Le contenant du nectar !",
    readingMnemonicFr: "BIN comme 'bien' - une BIEN belle BOUTEILLE ! KABIN sonne comme 'cabine' - dans la CABINE, une BOUTEILLE de champagne !"
  },
  "鋸": {
    meaningMnemonicFr: "Le métal 金 qui s'assoit 居 et coupe est une SCIE ! La SCIE du menuisier français, outil indispensable. Couper le bois avec précision !",
    readingMnemonicFr: "KYO comme 'quoi' - 'QUOI, tu prends la SCIE ?' NOKOGIRI sonne comme 'no-co-gui-ri' - NO-CO-GUI-RI la SCIE coupe !"
  },
  "肘": {
    meaningMnemonicFr: "La chair 月 avec un pouce 寸 forme le COUDE ! Le COUDE qu'on pose sur la table (impoli en France !). L'articulation du bras !",
    readingMnemonicFr: "CHŪ comme 'chou' - le CHOU coincé au COUDE ! HIJI sonne comme 'il-j'y' - 'IL J'Y cogne son COUDE !'"
  },
  "踵": {
    meaningMnemonicFr: "Le pied 足 qui se répète 重 marche sur le TALON ! Le TALON des escarpins français, élégant mais douloureux. La partie arrière du pied !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW des TALONS aiguilles ! KAKATO sonne comme 'cas-cas-tôt' - CAS-CAS-TÔT j'use mes TALONS !"
  },
  "鼓": {
    meaningMnemonicFr: "Le tambour 壴 avec la main 支 bat le TAMBOUR ! Le TAMBOUR de la garde républicaine, rythme martial. Battre la mesure !",
    readingMnemonicFr: "KO comme 'côté' - du CÔTÉ du TAMBOUR ! TSUZUMI sonne comme 'tsu-zut-mi' - TSU-ZUT-MI le TAMBOUR résonne !"
  },
  "紳": {
    meaningMnemonicFr: "Le fil 糸 qui s'étend 申 fait le GENTLEMAN ! Le GENTLEMAN français, élégant en costume. La distinction aristocratique !",
    readingMnemonicFr: "SHIN comme 'chine' - le GENTLEMAN achète sa soie en CHINE ! SHINSHI sonne comme 'chin-chi' - CHIN-CHI-c ce GENTLEMAN !"
  },
  "祥": {
    meaningMnemonicFr: "Le dieu 礻 du mouton 羊 est de BON AUGURE ! Le BON AUGURE des sacrifices anciens. Un présage favorable !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW de BON AUGURE ! SAIWAI sonne comme 'ça-il-va' - 'ÇA IL VA bien, BON AUGURE !'"
  },
  "瑞": {
    meaningMnemonicFr: "Le jade 王 qui monte 耑 est de BON AUGURE ! Le jade porte-bonheur, symbole de prospérité. L'auspice favorable !",
    readingMnemonicFr: "ZUI comme 'zut' - 'ZUT alors, quel BON AUGURE !' MIZUHO sonne comme 'mi-zu-oh' - MI-ZU-OH quel BON AUGURE !"
  },
  "疾": {
    meaningMnemonicFr: "La maladie 疒 qui frappe comme une flèche 矢 est RAPIDE ! La MALADIE qui arrive vite, le mal soudain. Tomber MALADE rapidement !",
    readingMnemonicFr: "SHITSU comme 'chut' - 'CHUT, la MALADIE est RAPIDE !' TOSHI sonne comme 'tôt-chi' - TÔT-CHI, la MALADIE frappe VITE !"
  },
  "瘍": {
    meaningMnemonicFr: "La maladie 疒 qui s'élève 昜 forme un ULCÈRE ! L'ULCÈRE à l'estomac, mal français classique. La plaie qui ne guérit pas !",
    readingMnemonicFr: "YŌ comme 'yo' - 'YO, j'ai un ULCÈRE !' KASA sonne comme 'cas-ça' - en CAS de douleur, ÇA peut être un ULCÈRE !"
  },
  "遮": {
    meaningMnemonicFr: "Marcher 辶 avec une barrière 庶 pour BLOQUER le passage ! BLOQUER la route, OBSTRUER le chemin. Faire obstacle !",
    readingMnemonicFr: "SHA comme 'chat' - le CHAT BLOQUE le passage ! SAEGIRU sonne comme 'c'est-gui-rue' - 'C'EST GUI-RUE, ça BLOQUE !'"
  },
  "披": {
    meaningMnemonicFr: "La main 扌 avec la peau 皮 OUVRE et DÉVOILE le secret ! DÉVOILER la vérité, OUVRIR les yeux. Révéler ce qui était caché !",
    readingMnemonicFr: "HI comme 'il' - 'IL DÉVOILE tout !' HIRAKU sonne comme 'il-rack' - IL RACK-onte en DÉVOILANT !"
  },
  "捻": {
    meaningMnemonicFr: "La main 扌 qui fait des pensées 念 en TORDANT le fil ! TORDRE pour créer, tourner avec les doigts. Le geste du fileur !",
    readingMnemonicFr: "NEN comme 'naine' - la NAINE TORD le fil ! HINERU sonne comme 'il-ne-rue' - IL NE RUE pas, il TORD !"
  },
  "揉": {
    meaningMnemonicFr: "La main 扌 douce 柔 qui MASSE les muscles tendus ! Le MASSAGE à la française, détente et bien-être. Pétrir avec soin !",
    readingMnemonicFr: "JŪ comme 'jus' - après le JUS, un bon MASSAGE ! MOMU sonne comme 'mot-mu' - MOT-MU-et pendant le MASSAGE !"
  },
  "峡": {
    meaningMnemonicFr: "La montagne 山 étroite 狭 forme une GORGE ! Les GORGES du Verdon, spectaculaires et profondes. Le défilé rocheux !",
    readingMnemonicFr: "KYŌ comme 'quoi' - 'QUOI, quelle GORGE profonde !' HASAMA sonne comme 'as-sa-ma' - tu AS SA MA-gnifique GORGE devant toi !"
  },
  "雫": {
    meaningMnemonicFr: "La pluie 雨 qui descend 下 forme une GOUTTE ! La GOUTTE de rosée, la GOUTTE de pluie. Le diamant liquide !",
    readingMnemonicFr: "SHIZUKU comme 'chi-zu-cou' - une GOUTTE CHI-ZU-COU-le ! DA sonne comme 'da' - 'DA-ns cette GOUTTE, tout l'univers !'"
  },
  "鮫": {
    meaningMnemonicFr: "Le poisson 魚 qui croise 交 les autres est le REQUIN ! Le REQUIN des mers françaises, prédateur redouté. Le seigneur des océans !",
    readingMnemonicFr: "KŌ comme 'côté' - du CÔTÉ du REQUIN, méfie-toi ! SAME sonne comme 'same' - 'SAME old REQUIN qui rôde !'"
  },
  "踝": {
    meaningMnemonicFr: "Le pied 足 avec un fruit 果 a une CHEVILLE ! La CHEVILLE, articulation fragile. Se tordre la CHEVILLE en marchant !",
    readingMnemonicFr: "KA comme 'cas' - en CAS de foulure à la CHEVILLE ! KURUBUSHI sonne comme 'cul-rue-bush' - CUL-RUE-BUSH, j'ai mal à la CHEVILLE !"
  },
  "飴": {
    meaningMnemonicFr: "La nourriture 食 de la plateforme 台 est le BONBON ! Le BONBON français, caramel au beurre salé de Bretagne. La douceur sucrée !",
    readingMnemonicFr: "I comme 'il' - 'IL mange un BONBON !' AME sonne comme 'âme' - le BONBON réconforte l'ÂME !"
  },
  "惜": {
    meaningMnemonicFr: "Le cœur 忄 qui tient au passé 昔 REGRETTE ! REGRETTER le temps perdu, la nostalgie du passé. Le regret sincère !",
    readingMnemonicFr: "SEKI comme 'c'est qui' - 'C'EST QUI qui REGRETTE ?' OSHIMU sonne comme 'oh-chi-mou' - 'OH CHI-MOU de REGRET !'"
  },
  "慈": {
    meaningMnemonicFr: "Le cœur 心 qui nourrit 兹 avec amour montre la COMPASSION ! La MISÉRICORDE divine, la bonté du cœur. L'amour inconditionnel !",
    readingMnemonicFr: "JI comme 'j'y' - 'J'Y mets toute ma COMPASSION !' ITSUKUSHIMI sonne comme 'il-tsu-cul-chi-mi' - la COMPASSION est sans limite !"
  },
  "賜": {
    meaningMnemonicFr: "La richesse 貝 qui change 易 de main est ACCORDÉE ! ACCORDER une faveur royale, donner généreusement. Le don du supérieur !",
    readingMnemonicFr: "SHI comme 'si' - 'SI le roi t'ACCORDE cette faveur !' TAMAWARU sonne comme 'ta-ma-va-rue' - 'TA MA-VA-RUE est ACCORDÉE !'"
  },
  "桐": {
    meaningMnemonicFr: "L'arbre 木 pareil 同 au ciel est le PAULOWNIA ! Le PAULOWNIA impérial, arbre noble du Japon. Le bois précieux !",
    readingMnemonicFr: "TŌ comme 'tôt' - TÔT le matin, le PAULOWNIA fleurit ! KIRI sonne comme 'qui-ri' - 'QUI RI-t sous le PAULOWNIA ?'"
  },
  "榎": {
    meaningMnemonicFr: "L'arbre 木 du couple 夏 est le MICOCOULIER ! Le MICOCOULIER des jardins français, arbre d'ombre. La fraîcheur en été !",
    readingMnemonicFr: "KA comme 'cas' - en CAS de chaleur, sous le MICOCOULIER ! ENOKI sonne comme 'et-no-qui' - 'ET NO-QUI connaît ce MICOCOULIER ?'"
  },
  "遵": {
    meaningMnemonicFr: "Marcher 辶 en respectant 尊 les règles pour OBÉIR ! OBÉIR aux lois, suivre les règles. Le respect de l'autorité !",
    readingMnemonicFr: "JUN comme 'jeune' - JEUNE, tu dois OBÉIR ! SHITAGAU sonne comme 'chi-ta-gâteau' - tu OBÉIS pour avoir du GÂTEAU !"
  },
  "唾": {
    meaningMnemonicFr: "La bouche 口 qui tombe 垂 crache sa SALIVE ! La SALIVE, liquide buccal. Cracher ou saliver de gourmandise !",
    readingMnemonicFr: "DA comme 'da' - 'DA-ns la bouche, la SALIVE !' TSUBA sonne comme 'tsu-bas' - TSU-BAS, la SALIVE coule !"
  },
  "呆": {
    meaningMnemonicFr: "La bouche 口 de l'arbre 木 reste STUPÉFAITE ! Rester bouche bée, ABASOURDI par la nouvelle. La stupéfaction totale !",
    readingMnemonicFr: "HŌ comme 'oh' - 'OH !' fait la bouche STUPÉFAITE ! AKIRE sonne comme 'à quire' - 'À QUIRE, je reste STUPÉFAIT !'"
  },
  "痒": {
    meaningMnemonicFr: "La maladie 疒 du mouton 羊 cause une DÉMANGEAISON ! La DÉMANGEAISON insupportable, l'envie de se gratter. Ça gratte !",
    readingMnemonicFr: "YŌ comme 'yo' - 'YO, ça DÉMANGE !' KAYUI sonne comme 'cas-you-y' - 'CAS YOU Y' te grattes, ça DÉMANGE !"
  },
  "疎": {
    meaningMnemonicFr: "La maladie 疒 qui rend distant 疋束 crée la NÉGLIGENCE ! Être DISTANT, NÉGLIGÉ dans ses relations. L'éloignement progressif !",
    readingMnemonicFr: "SO comme 'sot' - le SOT devient NÉGLIGENT ! UTOI sonne comme 'ou-toi' - 'OÙ TOI qui étais si proche, maintenant DISTANT ?'"
  },
  "抄": {
    meaningMnemonicFr: "La main 扌 qui prend peu 少 COPIE l'essentiel ! COPIER les extraits importants, prendre des notes. L'art du résumé !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW de la COPIE ! UTSURU sonne comme 'ou-tsu-rue' - 'OÙ TSU-RUE' tu as COPIÉ ça ?"
  },
  "抉": {
    meaningMnemonicFr: "La main 扌 qui décide 決 CREUSE profondément ! CREUSER pour extraire, approfondir avec force. Aller au fond des choses !",
    readingMnemonicFr: "KETSU comme 'quête' - la QUÊTE de CREUSER la vérité ! EGURU sonne comme 'et-guru' - ET GURU CREUSE pour trouver la sagesse !"
  },
  "詔": {
    meaningMnemonicFr: "Les paroles 言 qui appellent 召 sont un ÉDIT impérial ! L'ÉDIT royal, la proclamation officielle. La parole du souverain !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW de l'ÉDIT royal ! MIKOTONORI sonne comme 'mi-côté-no-ri' - MI-CÔTÉ NO-RI-diculise pas l'ÉDIT !"
  },
  "庇": {
    meaningMnemonicFr: "Le bâtiment 广 qui compare 比 et protège forme un AUVENT ! L'AUVENT qui protège de la pluie. L'abri bienvenu !",
    readingMnemonicFr: "HI comme 'il' - 'IL s'abrite sous l'AUVENT !' HISASHI sonne comme 'il-sa-chi' - 'IL SA-CHI sous l'AUVENT !'"
  },
  "尿": {
    meaningMnemonicFr: "Le corps 尸 avec l'eau 水 produit l'URINE ! L'URINE, déchet liquide du corps. La fonction naturelle !",
    readingMnemonicFr: "NYŌ comme 'niô' - 'NIÔ, quelle URINE !' YUBARI sonne comme 'you-barre' - 'YOU BARRE pour faire de l'URINE !'"
  },
  "酬": {
    meaningMnemonicFr: "L'alcool 酉 qu'on verse 州 est une RÉCOMPENSE ! La RÉCOMPENSE du travail bien fait, un verre mérité. La rétribution !",
    readingMnemonicFr: "SHŪ comme 'chou' - un CHOU comme RÉCOMPENSE ! MUKUIRU sonne comme 'mou-cui-rue' - MOU-CUI-RUE, quelle RÉCOMPENSE !"
  },
  "酵": {
    meaningMnemonicFr: "L'alcool 酉 avec la piété filiale 孝 FERMENTE ! La FERMENTATION du vin, du fromage. Le processus qui transforme !",
    readingMnemonicFr: "KŌ comme 'côté' - du CÔTÉ de la FERMENTATION ! HAKKO sonne comme 'à-côté' - À CÔTÉ, ça FERMENTE bien !"
  },
  "捧": {
    meaningMnemonicFr: "La main 扌 qui réunit 奉 OFFRE avec respect ! OFFRIR un présent, tendre avec déférence. Le don solennel !",
    readingMnemonicFr: "HŌ comme 'oh' - 'OH, il m'OFFRE un cadeau !' SASAGERU sonne comme 'ça-sage-rue' - 'ÇA SAGE-RUE d'OFFRIR ainsi !'"
  },
  "怠": {
    meaningMnemonicFr: "Le cœur 心 de la plateforme 台 est PARESSEUX ! La PARESSE française, l'art de ne rien faire. La NÉGLIGENCE coupable !",
    readingMnemonicFr: "TAI comme 'taille' - la TAILLE de sa PARESSE est énorme ! OKOTARU sonne comme 'oh-cote-à-rue' - 'OH COTE À RUE de PARESSE !'"
  },
  "槌": {
    meaningMnemonicFr: "L'arbre 木 qui suit 追 la forme est un MARTEAU ! Le MARTEAU du forgeron, outil de création. Frapper pour façonner !",
    readingMnemonicFr: "TSUI comme 'tu-y' - 'TU Y vas au MARTEAU !' TSUCHI sonne comme 'tsu-chi' - TSU-CHI-c ce MARTEAU en bois !"
  },
  "荘": {
    meaningMnemonicFr: "L'herbe 艹 près du lit 壮 forme une VILLA ! La VILLA de campagne, résidence secondaire. Le domaine bucolique !",
    readingMnemonicFr: "SŌ comme 'sot' - le SOT rêve d'une VILLA ! OGOSOKA sonne comme 'oh-go-so-cas' - 'OH GO SO-CAS dans cette VILLA !'"
  },
  "僅": {
    meaningMnemonicFr: "La personne 亻 avec peu 堇 n'a que SEULEMENT cela ! SEULEMENT une miette, à peine quelque chose. La quantité infime !",
    readingMnemonicFr: "KIN comme 'quin' - QUIN-ze, SEULEMENT ? ! WAZUKA sonne comme 'va-zu-cas' - 'VA ZU-CAS, il n'y a SEULEMENT ça !'"
  },
  "呈": {
    meaningMnemonicFr: "La bouche 口 qui offre un roi 王 PRÉSENTE formellement ! PRÉSENTER un document, offrir officiellement. La soumission respectueuse !",
    readingMnemonicFr: "TEI comme 'thé' - je PRÉSENTE le THÉ ! SHIMERU sonne comme 'chi-mère' - CHI-MÈRE, je PRÉSENTE mes respects !"
  },
  "尚": {
    meaningMnemonicFr: "Le petit 小 avec la bouche 冂口 signifie ENCORE plus ! ENCORE du respect, ENCORE de l'estime. Toujours plus haut !",
    readingMnemonicFr: "SHŌ comme 'show' - le SHOW continue ENCORE ! TATTOI sonne comme 'ta-toi' - 'TA TOI ENCORE plus précieux !'"
  },
  "帆": {
    meaningMnemonicFr: "Le tissu 巾 qui prend le vent 凡 est une VOILE ! La VOILE des bateaux bretons, gonflée par le vent. Naviguer sur les flots !",
    readingMnemonicFr: "HAN comme 'âne' - l'ÂNE ne comprend pas la VOILE ! HO sonne comme 'oh' - 'OH, quelle belle VOILE !'"
  },
  "帥": {
    meaningMnemonicFr: "Le tissu 巾 qui coupe 帀 est le COMMANDANT ! Le COMMANDANT en chef, le général qui dirige. L'autorité militaire !",
    readingMnemonicFr: "SUI comme 'suit' - le COMMANDANT SUIT son plan ! HIKIRU sonne comme 'il-qui-rue' - 'IL QUI RUE' comme COMMANDANT !"
  },
  "畝": {
    meaningMnemonicFr: "Le champ 田 qui tourne 久 forme un SILLON ! Le SILLON creusé par la charrue, ligne de vie. L'agriculture française !",
    readingMnemonicFr: "BŌ comme 'beau' - 'BEAU SILLON que voilà !' UNE sonne comme 'une' - UNE ligne droite, un SILLON parfait !"
  },
  "索": {
    meaningMnemonicFr: "Le toit 宀 avec le fil 糸 sert à CHERCHER ! CHERCHER avec une CORDE, explorer. La recherche méthodique !",
    readingMnemonicFr: "SAKU comme 'sac' - CHERCHE dans le SAC ! MOTOMERU sonne comme 'moto-mère' - MOTO-MÈRE CHERCHE partout !"
  },
  "署": {
    meaningMnemonicFr: "Le filet 罒 de l'auteur 者 forme un BUREAU ! Le BUREAU de police, l'administration. Le lieu officiel !",
    readingMnemonicFr: "SHO comme 'show' - le SHOW au BUREAU ! KAKARI sonne comme 'cas-car-y' - CAS-CAR-Y travaille au BUREAU !"
  },
  "胎": {
    meaningMnemonicFr: "La chair 月 avec la plateforme 台 porte le FŒTUS ! Le FŒTUS en développement, la vie qui commence. L'embryon protégé !",
    readingMnemonicFr: "TAI comme 'taille' - la TAILLE du FŒTUS grandit ! HARAWATA sonne comme 'à-ra-va-ta' - À RA-VA-TA voir le FŒTUS !"
  },
  "腸": {
    meaningMnemonicFr: "La chair 月 avec le soleil 昜 forme l'INTESTIN ! L'INTESTIN qui digère, le tube digestif. Les entrailles !",
    readingMnemonicFr: "CHŌ comme 'chou' - le CHOU est bon pour l'INTESTIN ! HARAWATA sonne comme 'à-ra-va-ta' - l'INTESTIN À RA-VA-TA bien !"
  },
  "訓": {
    meaningMnemonicFr: "Les paroles 言 du fleuve 川 sont une INSTRUCTION ! L'INSTRUCTION qui coule comme un fleuve. L'enseignement continu !",
    readingMnemonicFr: "KUN comme 'cune' - la lecure KUN-yomi est une INSTRUCTION ! OSHIE sonne comme 'oh-chi-et' - 'OH CHI-ET l'INSTRUCTION !'"
  },
  "註": {
    meaningMnemonicFr: "Les paroles 言 du maître 主 sont une ANNOTATION ! L'ANNOTATION en marge, la note explicative. Le commentaire savant !",
    readingMnemonicFr: "CHŪ comme 'chou' - note dans la marge : CHOU ! L'ANNOTATION ! SHIRUSHI sonne comme 'chi-rue-chi' - CHI-RUE-CHI cette ANNOTATION !"
  },
  "諦": {
    meaningMnemonicFr: "Les paroles 言 de l'empereur 帝 ABANDONNENT l'espoir ! ABANDONNER la lutte, renoncer. La résignation philosophique !",
    readingMnemonicFr: "TEI comme 'thé' - devant son THÉ, il ABANDONNE ! AKIRAMERU sonne comme 'à-qui-ra-mère' - 'À QUI RA-MÈRE qui ABANDONNE ?'"
  },
  "輩": {
    meaningMnemonicFr: "Ce qui n'est pas 非 un véhicule 車 mais des gens du même rang, ce sont des COLLÈGUES ! Les COLLÈGUES de même génération !",
    readingMnemonicFr: "HAI comme 'aïe' - 'AÏE, mes COLLÈGUES !' YAKARA sonne comme 'y'a-cara' - Y'A CARA-ctère chez ces COLLÈGUES !"
  },
  "郊": {
    meaningMnemonicFr: "La croix 交 avec la ville 阝 est la BANLIEUE ! La BANLIEUE parisienne, la périphérie. Les environs de la ville !",
    readingMnemonicFr: "KŌ comme 'côté' - du CÔTÉ de la BANLIEUE ! SOTO sonne comme 'sot-oh' - SOT-OH habite en BANLIEUE !"
  },
  "郡": {
    meaningMnemonicFr: "Le seigneur 君 avec la ville 阝 gouverne un DISTRICT ! Le DISTRICT administratif, le comté. La division territoriale !",
    readingMnemonicFr: "GUN comme 'gant' - le GANT du seigneur du DISTRICT ! KŌRI sonne comme 'côté-ri' - CÔTÉ-RI-vière, le DISTRICT commence !"
  },
  "閥": {
    meaningMnemonicFr: "La porte 門 qui coupe 伐 forme une FACTION ! La CLIQUE politique, le groupe de pouvoir. L'alliance secrète !",
    readingMnemonicFr: "BATSU comme 'bas-tsu' - BAS-TSU dans cette FACTION ! KUMI sonne comme 'cul-mi' - CUL-MI-e de cette FACTION !"
  },
  "伏": {
    meaningMnemonicFr: "La personne 亻 avec le chien 犬 S'INCLINE comme lui ! S'INCLINER en signe de respect, se prosterner. La révérence profonde !",
    readingMnemonicFr: "FUKU comme 'fou-cul' - FOU-CUL de S'INCLINER si bas ! FUSERU sonne comme 'fou-c'est-rue' - FOU C'EST RUE où il S'INCLINE !"
  },
  "偉": {
    meaningMnemonicFr: "La personne 亻 avec le différent 韋 est GRANDE et remarquable ! La GRANDEUR des héros français, l'excellence. Être ILLUSTRE !",
    readingMnemonicFr: "I comme 'il' - 'IL est GRAND !' ERAI sonne comme 'et-raie' - ET RAIE-marque sa GRANDEUR !"
  },
  "僧": {
    meaningMnemonicFr: "La personne 亻 qui augmente 曾 en sagesse est un MOINE ! Le MOINE bouddhiste, le religieux contemplatif. La vie monastique !",
    readingMnemonicFr: "SŌ comme 'sot' - le SOT devient MOINE ! BŌZU sonne comme 'beau-zu' - BEAU-ZU ce MOINE chauve !"
  },
  "慢": {
    meaningMnemonicFr: "Le cœur 忄 avec le long 曼 devient ARROGANT ! L'ARROGANCE française, parfois excessive. La fierté mal placée !",
    readingMnemonicFr: "MAN comme 'man' - 'MAN, t'es ARROGANT !' OKOTARU sonne comme 'oh-côte-à-rue' - OH CÔTE À RUE d'ARROGANCE !"
  },
  "戴": {
    meaningMnemonicFr: "L'arme 戈 avec la différence 異 REÇOIT sur la tête ! RECEVOIR un honneur, porter sur la tête. L'investiture !",
    readingMnemonicFr: "TAI comme 'taille' - RECEVOIR à la TAILLE de son mérite ! ITADAKU sonne comme 'il-ta-da-cul' - IL TA DA-CUL REÇOIT l'honneur !"
  },
  "甚": {
    meaningMnemonicFr: "Le doux 甘 avec les jambes 匹 est TRÈS important ! TRÈS, EXTRÊMEMENT significatif. L'intensité maximale !",
    readingMnemonicFr: "JIN comme 'j'y' - 'J'Y suis TRÈS attaché !' HANAHADA sonne comme 'à-na-à-da' - À NA-À-DA TRÈS impressionnant !"
  },
  "痕": {
    meaningMnemonicFr: "La maladie 疒 avec la marque 艮 laisse une TRACE ! La TRACE du temps, la cicatrice. La marque indélébile !",
    readingMnemonicFr: "KON comme 'con' - CON de laisser une TRACE ! ATO sonne comme 'à tôt' - À TÔT ou tard, la TRACE reste !"
  },
  "睦": {
    meaningMnemonicFr: "L'œil 目 qui atterrit 坴 trouve l'HARMONIE ! L'HARMONIE entre voisins, la bonne entente. L'amitié sincère !",
    readingMnemonicFr: "BOKU comme 'beau-cul' - BEAU-CUL d'HARMONIE entre nous ! MUTSU sonne comme 'mou-tsu' - MOU-TSU-nami d'HARMONIE !"
  }
};

async function main() {
  console.log("Expanding short kanji mnemonics...\n");

  // Query for all kanji with short meaningMnemonicFr
  const shortKanji = await prisma.$queryRaw<Array<{
    id: number;
    character: string;
    meaningsFr: string[];
    meaningMnemonicFr: string;
    readingMnemonicFr: string;
  }>>`
    SELECT id, character, "meaningsFr", "meaningMnemonicFr", "readingMnemonicFr"
    FROM "Kanji"
    WHERE LENGTH("meaningMnemonicFr") < 50
    ORDER BY id
  `;

  console.log(`Found ${shortKanji.length} kanji with short mnemonics (<50 chars)`);
  console.log(`Prepared ${Object.keys(expandedMnemonics).length} expanded mnemonics\n`);

  let updated = 0;
  let skipped = 0;
  const notFound: string[] = [];

  for (const kanji of shortKanji) {
    const expanded = expandedMnemonics[kanji.character];

    if (expanded) {
      // Update the kanji with expanded mnemonic
      const updateData: { meaningMnemonicFr: string; readingMnemonicFr?: string } = {
        meaningMnemonicFr: expanded.meaningMnemonicFr
      };

      // Also update reading mnemonic if provided and current one is short
      if (expanded.readingMnemonicFr && kanji.readingMnemonicFr.length < 30) {
        updateData.readingMnemonicFr = expanded.readingMnemonicFr;
      }

      await prisma.kanji.update({
        where: { id: kanji.id },
        data: updateData
      });

      updated++;
      process.stdout.write(`\rUpdated ${updated}/${shortKanji.length} kanji...`);
    } else {
      skipped++;
      notFound.push(kanji.character);
    }
  }

  console.log(`\n\n=== Summary ===`);
  console.log(`Updated: ${updated} kanji`);
  console.log(`Skipped (no expanded mnemonic): ${skipped} kanji`);

  if (notFound.length > 0) {
    console.log(`\nKanji without expanded mnemonics: ${notFound.join(', ')}`);
  }

  // Verify the updates
  const verifyResult = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count FROM "Kanji" WHERE LENGTH("meaningMnemonicFr") < 50
  `;

  console.log(`\nRemaining kanji with short mnemonics: ${verifyResult[0].count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
