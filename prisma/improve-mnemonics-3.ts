import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Improved mnemonics batch 3 - Levels 21-30
// Rich French storytelling with cultural references

const improvements = [
  // Level 21
  {
    character: "夕",
    meaningMnemonicFr: "Le soleil se couche sur les vignobles de Bordeaux, ne laissant qu'une moitie visible a l'horizon. Ce demi-cercle lumineux marque le SOIR, l'heure sacree de l'aperitif ! Les vendangeurs rangent leurs outils, le SOIR tombe sur la campagne francaise.",
    readingMnemonicFr: "YUU comme 'you' - 'Are YOU ready for tonight?' Le SOIR, on se retrouve ! SEKI comme 'sexy' - le SOIR, tout devient plus SEXY.",
  },
  {
    character: "暗",
    meaningMnemonicFr: "Dans les catacombes de Paris, le soleil (日) est cache sous la pierre (音). C'est SOMBRE, si SOMBRE que tu ne vois pas ta main ! Les touristes frissonnent dans cette OBSCURITE qui a avale six millions de Parisiens. Meme le son (音) est assourdi ici.",
    readingMnemonicFr: "KURAI sonne comme 'cou-rai' - dans le NOIR, tu as peur qu'on t'attrape le COU ! AN comme 'an' - il y a un AN, j'etais dans le NOIR total.",
  },
  {
    character: "朝",
    meaningMnemonicFr: "Au marche de Rungis a 4h du MATIN ! Le soleil (日) et la lune (月) sont encore ensemble dans le ciel. Les marachers deballent leurs legumes, les boulangers livrent leurs baguettes. C'est le MATIN francais, quand Paris s'eveille !",
    readingMnemonicFr: "ASA comme 'as-a' - 'AS-tu bien dormi ?' demande maman chaque MATIN. CHOU comme 'chou' - le MATIN, tu manges des pains au CHOCOLAT (petit CHOU) !",
  },
  {
    character: "夜",
    meaningMnemonicFr: "Sur les Champs-Elysees, la NUIT tombe ! Une personne (亻) rentre chez elle sous le toit (宀) pendant que la NUIT enveloppe Paris. Les lumieres de la Tour Eiffel s'allument, les restaurants se remplissent. C'est la magie de la NUIT parisienne !",
    readingMnemonicFr: "YORU sonne comme 'yo-rue' - 'YO, la RUE est animee la NUIT !' YA comme 'yeah' - 'YEAH, c'est la NUIT, on sort !'",
  },

  // Level 22
  {
    character: "状",
    meaningMnemonicFr: "Un veterinaire de Lyon examine l'ETAT d'un chien (犭) pose sur l'etagere (丬). 'Quelle est la CONDITION de ce toutou ?' La SITUATION est grave - le chien a mange tout le saucisson ! L'ETAT des lieux est clair.",
    readingMnemonicFr: "JOU comme 'joue' - on JOUE a deviner l'ETAT de sante. Quel est l'ETAT de ta JOUE apres cette gifle ?",
  },
  {
    character: "価",
    meaningMnemonicFr: "Au marche de Provence, une personne (亻) venant de l'Ouest (西) demande le PRIX des melons. 'Combien pour ce Cavaillon ?' La VALEUR d'un bon melon, ca n'a pas de PRIX ! Le vendeur annonce fierement sa VALEUR marchande.",
    readingMnemonicFr: "KA comme 'quoi' - 'C'est QUOI le PRIX ?' ATAI comme 'a Thai' - le PRIX d'un resto THAI, quelle VALEUR !",
  },
  {
    character: "照",
    meaningMnemonicFr: "Le phare de Brest ECLAIRE la nuit ! Le soleil (日) projette ses rayons sur les rochers (昭). Les marins bretons voient la lumiere qui ILLUMINE leur chemin. Cette lampe ECLAIRE comme mille soleils !",
    readingMnemonicFr: "TERASU comme 'terrasse' - le soleil ECLAIRE la TERRASSE du cafe. SHOU comme 'show' - le SHOW de lumieres qui ECLAIRE le chateau !",
  },
  {
    character: "明",
    meaningMnemonicFr: "A la Fete des Lumieres de Lyon, le soleil (日) et la lune (月) brillent ensemble ! Tout est CLAIR, tout est LUMINEUX ! Les facades s'illuminent, la LUMIERE danse sur les murs. C'est CLAIR comme le jour, meme en pleine nuit !",
    readingMnemonicFr: "AKARUI comme 'a carrer' - la LUMIERE A CARRE la piece ! MEI comme 'mes' - 'MES yeux ! Cette LUMIERE est trop CLAIRE !'",
  },
  {
    character: "影",
    meaningMnemonicFr: "Dans les ruelles de Montmartre, le soleil (日) projette l'OMBRE de tes cheveux (彡) sur les paves. Ton OMBRE danse comme un personnage de film noir. L'OMBRE suit chacun de tes pas dans ce decor cinematographique !",
    readingMnemonicFr: "KAGE comme 'cage' - ton OMBRE est enfermee dans une CAGE de lumiere ! EI comme 'hey' - 'HEY, c'est mon OMBRE ou la tienne ?'",
  },
  {
    character: "光",
    meaningMnemonicFr: "Le feu (火) brille au-dessus des jambes (儿) d'un danseur des Folies Bergere ! La LUMIERE des projecteurs l'inonde. Il incarne la LUMIERE meme, brillant comme une etoile sur la scene parisienne !",
    readingMnemonicFr: "HIKARI comme 'il y a curry' - la LUMIERE revele qu'IL Y A du CURRY sur ta chemise ! KOU comme 'coup' - un COUP de LUMIERE m'a aveugle !",
  },

  // Level 23
  {
    character: "俳",
    meaningMnemonicFr: "Un ACTEUR de la Comedie-Francaise (亻) refuse un role (非) ! 'Non, non et non !' dit-il theatralement. Il prefere ecrire des HAIKUS dans sa loge. Cet ACTEUR-poete incarne l'art francais du refus elegant !",
    readingMnemonicFr: "HAI comme 'hai'ku - le HAIKU parfait ! Un ACTEUR qui dit 'HAI' (oui en japonais) a tous les roles de HAIKU.",
  },
  {
    character: "温",
    meaningMnemonicFr: "Dans les thermes d'Aix-les-Bains, l'eau (氵) chauffee au soleil (日) dans un bassin (皿) reste TIEDE ! Ni trop chaude, ni trop froide - c'est TIEDE, parfait pour une cure thermale a la francaise !",
    readingMnemonicFr: "ATATAKAI comme 'a ta ta kai' - 'A TA TA, c'est chaud mais TIEDE !' ON comme 'on' - 'ON est bien dans cette eau TIEDE !'",
  },
  {
    character: "暖",
    meaningMnemonicFr: "Au coin du feu dans un chalet savoyard, le soleil (日) est ton ami (爰) ! Il fait CHAUD, si CHAUD que tu retires ton pull. La CHALEUR du poele te rechauffe apres une journee de ski.",
    readingMnemonicFr: "ATATAKAI comme 'a ta ta kai' - 'A TA TA KAI, c'est CHAUD !' DAN comme 'dans' - 'DANS ce chalet, il fait CHAUD !'",
  },
  {
    character: "冷",
    meaningMnemonicFr: "Dans une cave a champagne de Reims, la glace (冫) donne des ordres (令) ! 'Restez au FROID !' Les bouteilles obeissent, bien FROIDES. Ce vin petillant aime le FROID, c'est son element !",
    readingMnemonicFr: "TSUMETAI comme 'tsou met Thai' - 'Ce Thai FROID, il m'a mis la main sur le front !' REI comme 'raie' - une RAIE FROIDE sortie du frigo !",
  },
  {
    character: "熱",
    meaningMnemonicFr: "Un four a pain en Alsace ! Le feu (灬) brule sous la marmite ronde (埶). La CHALEUR est intense, les pains gonflent ! La FIEVRE du boulanger qui surveille sa fournee - c'est ca la CHALEUR du metier !",
    readingMnemonicFr: "ATSUI comme 'a chui' - 'A CHUI (je suis) en sueur, quelle CHALEUR !' NETSU comme 'net-su' - 'C'est NET que la CHALEUR est SUrprenante !'",
  },
  {
    character: "涼",
    meaningMnemonicFr: "A Lyon (京), pres du Rhone, l'eau (氵) apporte une brise FRAICHE ! Apres la canicule, ce vent FRAIS est une benediction. Les Lyonnais se promenent sur les quais, profitant de cette FRAICHEUR fluviale !",
    readingMnemonicFr: "SUZUSHII comme 'sous-zou-chi' - 'SOUS ce ZOU (zoo), c'est CHI (chic) et FRAIS !' RYOU comme 'rio' - a RIO il ne fait pas FRAIS, contrairement a ici !",
  },

  // Level 24
  {
    character: "動",
    meaningMnemonicFr: "Un TGV traverse la France avec une force (力) lourde (重) ! Le MOUVEMENT est puissant, le train BOUGE a 300 km/h. C'est le MOUVEMENT francais par excellence - rapide, elegant, en MOUVEMENT perpetuel !",
    readingMnemonicFr: "UGOKU comme 'ou go cou' - 'OU tu vas ? GO, BOUGE ton COU !' DOU comme 'doux' - un MOUVEMENT DOUX et fluide.",
  },
  {
    character: "速",
    meaningMnemonicFr: "Un paquet (束) expedie par La Poste avance (辶) tres VITE ! 'Livraison RAPIDE !' promet le facteur. En France, meme les colis sont presses - ils veulent arriver VITE pour l'heure du dejeuner !",
    readingMnemonicFr: "HAYAI comme 'ah yeah' - 'AH YEAH, c'est RAPIDE !' SOKU comme 'saucisse' - cette SAUCISSE a disparu VITE de mon assiette !",
  },
  {
    character: "武",
    meaningMnemonicFr: "Un samourai au Musee Guimet tient sa lance (戈) et dit 'stop' (止) ! L'art MARTIAL japonais expose a Paris fascine les visiteurs. C'est l'esprit MILITAIRE, la discipline des ARTS MARTIAUX !",
    readingMnemonicFr: "BU comme 'bout' - au BOUT de l'entrainement MARTIAL ! MU comme 'mou' - rien de MOU dans l'esprit MARTIAL !",
  },
  {
    character: "管",
    meaningMnemonicFr: "Dans une bambouseraie de Provence, le bambou (竹) est l'officiel (官) des TUYAUX ! Les Romains GERAIENT l'eau avec des TUYAUX de bambou. Aujourd'hui encore, on GERE les canalisations avec cette sagesse antique !",
    readingMnemonicFr: "KUDA comme 'cou-da' - le TUYAU passe dans le COU-DA (couloir) ! KAN comme 'quand' - 'QUAND vas-tu GERER ce TUYAU ?'",
  },
  {
    character: "急",
    meaningMnemonicFr: "Au SAMU de Paris, le coeur (心) aspire (及) a sauver des vies ! C'est URGENT, pas une seconde a perdre ! Les ambulanciers se PRECIPITENT, l'URGENCE francaise est une course contre la montre !",
    readingMnemonicFr: "ISOGU comme 'il sot gu' - 'IL est SOT de ne pas se presser, c'est URGENT !' KYUU comme 'queue' - pas de QUEUE, c'est URGENT !",
  },

  // Level 25
  {
    character: "跳",
    meaningMnemonicFr: "Une danseuse du Ballet de l'Opera de Paris ! Son pied (足) s'envole comme un signe (兆) vers le ciel. Elle SAUTE avec grace, defiant la gravite. Chaque SAUT est une oeuvre d'art aerienne !",
    readingMnemonicFr: "TOBU comme 'trop beau' - 'TROP BEAU ce SAUT !' CHOU comme 'chou' - elle SAUTE comme un petit CHOU au vent !",
  },
  {
    character: "泳",
    meaningMnemonicFr: "Dans la piscine Molitor a Paris, l'eau (氵) eternelle (永) accueille les NAGEURS ! On NAGE dans cette eau mythique ou les plus grands ont glisse. NAGER ici, c'est toucher l'eternite aquatique !",
    readingMnemonicFr: "OYOGU comme 'oh yo gou' - 'OH YO, GO NAGER !' EI comme 'hey' - 'HEY, tu viens NAGER ?'",
  },
  {
    character: "走",
    meaningMnemonicFr: "Le Marathon de Paris ! Sur la terre (土) francaise, les coureurs s'arretent (止) jamais de COURIR ! Ils COURENT le long de la Seine, COURENT devant le Louvre. La France entiere les encourage a COURIR !",
    readingMnemonicFr: "HASHIRU comme 'ah chi roue' - 'AH, ma CHI (cheville) touche la ROUE en COURANT !' SOU comme 'sous' - COURIR SOUS la pluie parisienne !",
  },
  {
    character: "歩",
    meaningMnemonicFr: "Une promenade sur les quais de Seine ! Un peu (少) de temps pour s'arreter (止) et MARCHER tranquillement. On MARCHE le long de l'eau, pas presses, a la francaise. MARCHER a Paris, c'est tout un art !",
    readingMnemonicFr: "ARUKU comme 'a rue cou' - 'A la RUE, tends le COU en MARCHANT !' HO comme 'oh' - 'OH, on MARCHE encore loin ?'",
  },
  {
    character: "居",
    meaningMnemonicFr: "Dans un vieux (古) corps de ferme (尸) en Provence, une famille RESIDE depuis des generations ! Ils SONT la, ils HABITENT ces murs anciens. ETRE present dans ce lieu, c'est RESIDER dans l'histoire !",
    readingMnemonicFr: "IRU comme 'il rue' - 'IL RUE dans les brancards, mais il RESTE !' KYO comme 'quoi' - 'QUOI, tu HABITES ici ?'",
  },
  {
    character: "止",
    meaningMnemonicFr: "Un panneau STOP au carrefour de l'Etoile ! Ce pied (足) simplifie qui s'ARRETE net. Douze avenues, mais tout le monde doit S'ARRETER ! C'est l'art francais de l'ARRET, meme dans le chaos.",
    readingMnemonicFr: "TOMARU comme 'trop marre' - 'J'en ai TROP MARRE, je m'ARRETE !' SHI comme 'chi' - 'CHI (chic), on s'ARRETE pour un cafe ?'",
  },
  {
    character: "笑",
    meaningMnemonicFr: "Au festival d'Avignon, un comedien sous un bambou (竹) fait RIRE le public avec sa bouche tordue (夭) ! Le RIRE eclate comme le bambou au vent. SOURIRE et RIRE, c'est la joie a la francaise !",
    readingMnemonicFr: "WARAU comme 'waouh raou' - 'WAOUH', et tout le monde RIT ! SHOU comme 'show' - ce SHOW me fait RIRE !",
  },
  {
    character: "肥",
    meaningMnemonicFr: "A Perigueux, la chair (月) se compare (比) aux autres ! Qui sera le plus GRAS apres le foie gras ? L'ENGRAIS du terroir fait grossir les canards. Devenir GRAS ici, c'est un art culinaire !",
    readingMnemonicFr: "KOERU comme 'cou et roue' - ton COU ET ta ROUE (ventre) deviennent GRAS ! HI comme 'hi' - 'HI HI, tu deviens GRAS !'",
  },

  // Level 26
  {
    character: "働",
    meaningMnemonicFr: "Un ouvrier (亻) de Renault TRAVAILLE avec un mouvement (動) lourd ! Il BOSSE dur sur la chaine, chaque mouvement compte. TRAVAILLER a la francaise - avec fierte et savoir-faire !",
    readingMnemonicFr: "HATARAKU comme 'ah ta raclure' - 'AH TA RACLURE de fromage, faut TRAVAILLER pour la meriter !' DOU comme 'doux' - TRAVAILLER en DOUCEUR.",
  },
  {
    character: "座",
    meaningMnemonicFr: "Au cafe de Flore, deux personnes (人人) S'ASSOIENT sur un sol (土) sous le toit (广) ! Sartre et Beauvoir ont leurs places attitrees. S'ASSEOIR ici, c'est s'installer dans l'histoire litteraire !",
    readingMnemonicFr: "SUWARU comme 'sous-voir' - 'ASSIEDS-toi SOUS le parasol pour VOIR !' ZA comme 'za' - une piZZA ? Je m'ASSIEDS pour ca !",
  },
  {
    character: "寝",
    meaningMnemonicFr: "Dans un lit a baldaquin versaillais, sous le toit (宀), on DORT les mains croisees ! Meme Louis XIV avait besoin de DORMIR. Se COUCHER dans ce lit royal, c'est DORMIR comme un roi !",
    readingMnemonicFr: "NERU comme 'nez rue' - 'Mon NEZ dans la RUE ? Non, je prefere DORMIR !' SHIN comme 'chine' - DORMIR sur de la soie de CHINE !",
  },
  {
    character: "起",
    meaningMnemonicFr: "Le coq gaulois te REVEILLE ! Tu cours (走) vers toi-meme (己) pour te LEVER ! A la campagne francaise, on SE REVEILLE tot. SE LEVER avec le soleil, c'est la vie a la francaise !",
    readingMnemonicFr: "OKIRU comme 'oh qui rue' - 'OH QUI RUE le matin ? REVEILLE-toi !' KI comme 'qui' - 'QUI se REVEILLE en premier ?'",
  },
  {
    character: "占",
    meaningMnemonicFr: "Une voyante a Montmartre ! Le haut (卜) et la bouche (口) predisent l'avenir. Elle OCCUPE son stand, pratiquant la DIVINATION. 'Je vois, je vois...' murmure-t-elle en OCCUPANT tout l'espace mystique !",
    readingMnemonicFr: "SHIMERU comme 'chi mer' - 'CHI (chic), la MER OCCUPE tout l'horizon !' SEN comme 'sens' - la DIVINATION donne un SENS !",
  },
  {
    character: "我",
    meaningMnemonicFr: "Un philosophe francais brandit sa main (手) et sa lance (戈) verbale ! 'MOI, JE pense donc je suis !' L'EGO francais s'affirme avec panache. Le MOI cartesien, fier et pensant !",
    readingMnemonicFr: "WARE comme 'ouah-re' - 'OUAH, c'est MOI !' GA comme 'gars' - 'Ce GARS, c'est MOI !'",
  },
  {
    character: "往",
    meaningMnemonicFr: "Sur le chemin de Compostelle, le pas (彳) suit le roi (王) vers l'avant ! On VA, on AVANCE vers le PASSE glorieux. ALLER de l'avant tout en honorant le PASSE - c'est le pelerinage francais !",
    readingMnemonicFr: "OU comme 'ou' - 'OU vas-tu ? J'y VAIS !' Le PASSE est derriere, on AVANCE !",
  },
  {
    character: "抱",
    meaningMnemonicFr: "A Paris, une main (扌) enveloppe (包) quelqu'un ! On se SERRE dans les bras pour se dire bonjour. SERRER quelqu'un contre soi, c'est l'affection a la francaise - tactile et chaleureuse !",
    readingMnemonicFr: "DAKU comme 'da cou' - 'DA (donne) ton COU, je te SERRE !' HOU comme 'oh' - 'OH, viens que je te SERRE !'",
  },
  {
    character: "立",
    meaningMnemonicFr: "La statue de Jeanne d'Arc SE LEVE fierement place des Pyramides ! Ses bras (le trait horizontal), son corps DEBOUT (le vertical), ses jambes ecartees prete au combat. SE LEVER pour la France !",
    readingMnemonicFr: "TATSU comme 'ta statue' - 'TA STATUE est DEBOUT depuis des siecles !' RITSU comme 'rythme' - le RYTHME de vie quand tu es DEBOUT !",
  },

  // Level 27
  {
    character: "思",
    meaningMnemonicFr: "A la terrasse d'un cafe, le cerveau (田) sur le coeur (心) ! Un intellectuel francais PENSE, il REFLECHIT. 'Je PENSE, donc je suis' - Descartes avait tout compris. PENSER a la francaise, c'est marier tete et coeur !",
    readingMnemonicFr: "OMOU comme 'oh mou' - 'OH, mon cerveau est MOU, je ne PENSE plus !' SHI comme 'si' - 'SI seulement je pouvais arreter de PENSER !'",
  },
  {
    character: "転",
    meaningMnemonicFr: "Une voiture (車) fait un tonneau et se RETOURNE ! TOURNER, TOMBER sur les routes sinueuses de Provence. Le Tour de France connait ces chutes - TOURNER trop vite, c'est TOMBER !",
    readingMnemonicFr: "KOROBU comme 'cou robe' - 'Mon COU dans ma ROBE en TOMBANT !' TEN comme 'temps' - avec le TEMPS, tout TOURNE !",
  },
  {
    character: "遊",
    meaningMnemonicFr: "Un enfant avance (辶) avec son drapeau (斿) vers le parc ! Il va JOUER aux Tuileries. JOUER a la francaise - courir, rire, profiter. Le JEU est serieux ici, c'est l'art de vivre !",
    readingMnemonicFr: "ASOBU comme 'a sobre' - 'A jeun (SOBRE), on JOUE mieux !' YUU comme 'you' - 'YOU want to PLAY ?'",
  },
  {
    character: "撮",
    meaningMnemonicFr: "Un photographe a Cannes ! Sa main (扌) saisit l'instant (最) avec son appareil. Il PHOTOGRAPHIE les stars sur le tapis rouge. PRENDRE une photo, c'est capturer la magie du cinema francais !",
    readingMnemonicFr: "TORU comme 'trop' - 'TROP beau, je PHOTOGRAPHIE !' SATSU comme 'sa tsu' - 'SA photo TU la PRENDS ?'",
  },
  {
    character: "望",
    meaningMnemonicFr: "Depuis Montmartre, on regarde la lune (月) au loin (亡+王) et on ESPERE ! ESPERER voir la Tour Eiffel illuminee, DESIRER un avenir radieux. L'ESPOIR a la francaise - romantique et passionne !",
    readingMnemonicFr: "NOZOMU comme 'nos zoo mu' - 'NOS ZOO doivent evoluer, on l'ESPERE !' BOU comme 'bout' - au BOUT de l'ESPOIR !",
  },
  {
    character: "信",
    meaningMnemonicFr: "Une personne (亻) qui parle (言) avec sincerite ! Tu peux CROIRE ses mots. La CONFIANCE a la francaise - on CROIT en la parole donnee, en l'honneur. CROIRE, c'est faire confiance !",
    readingMnemonicFr: "SHIN comme 'chine' - 'En CHINE, je CROIS qu'ils font du bon the !' CROIRE en quelque chose fermement.",
  },
  {
    character: "考",
    meaningMnemonicFr: "Un vieux sage (老) avec son baton REFLECHIT sous un platane provencal ! Il PENSE profondement, il REFLECHIT a la vie. REFLECHIR a la francaise - prendre son temps, mediter longuement.",
    readingMnemonicFr: "KANGAERU comme 'quand gars erre' - 'QUAND ce GARS ERRE, il REFLECHIT !' KOU comme 'coup' - un COUP de genie apres avoir REFLECHI !",
  },

  // Level 28
  {
    character: "作",
    meaningMnemonicFr: "Un artisan (亻) qui fabrique (乍) dans son atelier de Limoges ! Il FAIT de la porcelaine, il CREE des chefs-d'oeuvre. FAIRE a la main, CREER avec passion - c'est l'artisanat francais !",
    readingMnemonicFr: "TSUKURU comme 'tsu cou rue' - 'TSU (tu) FAIS ca dans la RUE ?' SAKU comme 'sac' - FAIRE un SAC a main de luxe !",
  },
  {
    character: "使",
    meaningMnemonicFr: "Une personne (亻) qui applique les regles (吏) ! Un chef UTILISE ses ustensiles avec maitrise. UTILISER les bons outils, c'est l'art culinaire francais. On UTILISE, on maitrise !",
    readingMnemonicFr: "TSUKAU comme 'tsu cou au' - 'TSU UTILISES ton COU AU travail ?' SHI comme 'chi' - 'CHI (chic), on UTILISE le bon materiel !'",
  },
  {
    character: "幼",
    meaningMnemonicFr: "Un petit (幺) avec force (力) - c'est un ENFANT ! JEUNE et plein d'energie. A l'ecole maternelle de France, les petits sont ENFANTINS mais deja forts. La JEUNESSE est une force !",
    readingMnemonicFr: "OSANAI comme 'oh sa nait' - 'OH, SA nouvelle vie NAIT, si JEUNE !' YOU comme 'you' - 'YOU are so YOUNG !'",
  },
  {
    character: "博",
    meaningMnemonicFr: "Un professeur au College de France ! Dix (十) domaines de specialite (尃) - un savoir VASTE ! Une EXPOSITION de connaissances. L'erudition francaise est VASTE comme un musee !",
    readingMnemonicFr: "HAKU comme 'hack' - 'Ce HACK de savoir VASTE !' BAKU comme 'bac' - apres le BAC, un savoir VASTE !",
  },
  {
    character: "清",
    meaningMnemonicFr: "L'eau (氵) bleue (青) des calanques de Marseille ! PUR et CLAIR comme le ciel provencal. Cette eau est si PURE qu'on voit le fond. La CLARTE mediterraneenne !",
    readingMnemonicFr: "KIYOI comme 'qui y oh-i' - 'QUI Y va ? L'eau est PURE !' SEI comme 'c'est' - 'C'EST PUR et CLAIR !'",
  },
  {
    character: "移",
    meaningMnemonicFr: "Des grains de ble (禾) multiplies (多) qu'on DEPLACE ! Les agriculteurs de Beauce TRANSFERENT leur recolte. DEPLACER les ressources, c'est la logistique agricole francaise !",
    readingMnemonicFr: "UTSURU comme 'ou tsu rue' - 'OU DEPLACER ca dans la RUE ?' I comme 'y' - 'J'Y vais, je me DEPLACE !'",
  },
  {
    character: "送",
    meaningMnemonicFr: "Un paquet (関) qui avance (辶) vers sa destination ! La Poste francaise ENVOIE des colis partout. ENVOYER une lettre d'amour, ENVOYER un cadeau - la tradition francaise de l'envoi !",
    readingMnemonicFr: "OKURU comme 'oh cou rue' - 'OH, ton COU dans la RUE ? Je t'ENVOIE un foulard !' SOU comme 'sous' - ENVOYER SOUS pli discret !",
  },
  {
    character: "呼",
    meaningMnemonicFr: "Une bouche (口) qui fait un signe (乎) - on APPELLE ! Au marche de Nice, les vendeurs APPELLENT les clients. CRIER les prix, APPELER l'attention - c'est l'animation des marches francais !",
    readingMnemonicFr: "YOBU comme 'yo boo' - 'YO, BOO, je t'APPELLE !' KO comme 'co' - 'CO-pain, je t'APPELLE !'",
  },

  // Level 29
  {
    character: "命",
    meaningMnemonicFr: "Sous le toit (亼), on donne un ORDRE (令) de VIE ! Le medecin sauve des VIES, c'est sa MISSION. La VIE est precieuse, l'ORDRE du coeur est de vivre. INOCHI, le souffle de VIE !",
    readingMnemonicFr: "INOCHI comme 'il n'a ochi' - 'IL N'A pas perdu la VIE !' MEI comme 'mais' - 'MAIS la VIE continue !'",
  },
  {
    character: "生",
    meaningMnemonicFr: "Une plante qui pousse de la terre - la VIE ! NAITRE au printemps en France, voir les bourgeons eclore. La VIE jaillit partout, les vignes bourgeonnent, tout NAIT a nouveau !",
    readingMnemonicFr: "IKIRU comme 'il qui rue' - 'IL QUI RUE dans les brancards VIVA la VIE !' SEI comme 'c'est' - 'C'EST la VIE !'",
  },
  {
    character: "殺",
    meaningMnemonicFr: "L'arbre (木) et la lance (殳) - un scene de crime dans un polar francais ! TUER dans les romans de Fred Vargas. Les enqueteurs cherchent qui a TUER. Le suspense a la francaise !",
    readingMnemonicFr: "KOROSU comme 'corps rosse' - 'Le CORPS ROSSE, quelqu'un l'a TUE !' SATSU comme 'sa tsu' - 'SA fin, TU l'as causee ?'",
  },
  {
    character: "活",
    meaningMnemonicFr: "L'eau (氵) et la langue (舌) - VIVRE ACTIVEMENT ! Boire, manger, parler - c'est VIVRE ! La vie ACTIVE des Francais, entre cafes et debats. VIVRE pleinement chaque jour !",
    readingMnemonicFr: "KATSU comme 'cat su' - 'Ce CAT SU (sait) comment VIVRE !' L'energie de VIVRE !",
  },
  {
    character: "死",
    meaningMnemonicFr: "Les os (歹) avec une cuillere (匕) - la MORT inevitable. Au Pere-Lachaise, on honore les MORTS celebres. La MORT a la francaise - avec des fleurs et du respect.",
    readingMnemonicFr: "SHINU comme 'chi nu' - 'CHI (chic), on ne meurt qu'une fois, NU face a la MORT !' SHI comme 'si' - 'SI la MORT vient...'",
  },
  {
    character: "板",
    meaningMnemonicFr: "Du bois (木) contre (反) lequel on s'appuie - une PLANCHE ! Au ski en Savoie, ta PLANCHE te porte. Le TABLEAU noir de l'ecole francaise, cette PLANCHE de savoir !",
    readingMnemonicFr: "ITA comme 'il ta' - 'IL TA donne cette PLANCHE !' HAN/BAN comme 'banc' - une PLANCHE de BANC !",
  },
  {
    character: "決",
    meaningMnemonicFr: "L'eau (氵) qui prend son cours final (夬) - DECIDER ! Le vin est tire, il faut le boire. DECIDER a la francaise - avec conviction et determination. C'est DECIDE !",
    readingMnemonicFr: "KIMERU comme 'qui mer' - 'QUI traverse la MER ? C'est DECIDE !' KETSU comme 'quete su' - 'La QUETE est finie, c'est DECIDE !'",
  },

  // Level 30
  {
    character: "延",
    meaningMnemonicFr: "Un long mouvement (廴) qui s'etend - PROLONGER ! La sieste francaise se PROLONGE, on REPORTE le retour au travail. PROLONGER le plaisir, REPORTER les soucis !",
    readingMnemonicFr: "NOBIRU comme 'nos bi rue' - 'NOS BIcyclettes PROLONGENT dans la RUE !' EN comme 'encore' - 'ENCORE ? On PROLONGE !'",
  },
  {
    character: "縮",
    meaningMnemonicFr: "Le fil (糸) de l'oncle (叔) - un pull qui RETRECIT ! Au lavage, le pull en laine de grand-mere RETRECIT. 'Mon beau pull a RETRECI !' pleure le Francais maladroit.",
    readingMnemonicFr: "CHIJIMU comme 'chi ji mou' - 'CHI (chic) pas, JI (je) suis devenu MOU et j'ai RETRECI !' SHUKU comme 'chouchou' - 'Mon CHOUCHOU a RETRECI !'",
  },
  {
    character: "修",
    meaningMnemonicFr: "Une personne (亻) qui attache et REPARE ! Le cordonnier du Marais REPARE les chaussures de luxe. REPARER a la francaise - avec soin et savoir-faire. On REPARE, on ne jette pas !",
    readingMnemonicFr: "NAOSU comme 'nez au su' - 'Le NEZ AU SUD, je REPARE !' SHUU comme 'chou' - 'Mon CHOU, je vais le REPARER !'",
  },
  {
    character: "匂",
    meaningMnemonicFr: "Le nez (勹) qui tourne vers l'ODEUR ! A Grasse, capitale du PARFUM, les nez professionnels detectent chaque ODEUR. Le PARFUM francais, cette ODEUR de luxe qui fait rever le monde !",
    readingMnemonicFr: "NIOI comme 'nid oh-i' - 'Le NID sent OH quellE ODEUR !' Cette fragrance francaise unique !",
  },
  {
    character: "築",
    meaningMnemonicFr: "Le bambou (竹) sur le bois (木) pour BATIR ! Les charpentiers francais BATISSENT des cathedrales. CONSTRUIRE avec des materiaux nobles, BATIR pour l'eternite !",
    readingMnemonicFr: "KIZUKU comme 'qui zoo cou' - 'QUI au ZOO tend le COU ? On BATIT !' CHIKU comme 'chic' - 'CHIC, on BATIT quelque chose de beau !'",
  },
  {
    character: "建",
    meaningMnemonicFr: "Le pinceau (聿) qui avance (廴) - CONSTRUIRE ! Les architectes francais CONSTRUISENT des merveilles. De Versailles a la Defense, on CONSTRUIT grand et beau !",
    readingMnemonicFr: "TATERU comme 'ta terre' - 'Sur TA TERRE, je CONSTRUIS !' KEN comme 'quand' - 'QUAND vas-tu CONSTRUIRE ?'",
  },
  {
    character: "壊",
    meaningMnemonicFr: "La terre (土) avec la robe (衣) et les elements - DETRUIRE ! La tempete DETRUIT les vignobles. Le temps DETRUIT les chateaux. Mais la France RECONSTRUIT toujours !",
    readingMnemonicFr: "KOWASU comme 'cou vas' - 'Ton COU VAS se casser, attention a ne pas DETRUIRE !' KAI comme 'quai' - 'Le QUAI est DETRUIT par la mer !'",
  },
  {
    character: "設",
    meaningMnemonicFr: "Les mots (言) qui frappent (殳) - INSTALLER ! On INSTALLE un debat, on INSTALLE une exposition. A Paris, on INSTALLE toujours quelque chose de nouveau !",
    readingMnemonicFr: "SETSU comme 'c'est su' - 'C'EST SU qu'on va INSTALLER ca !' METTRE en place avec methode !",
  },
];

async function main() {
  console.log("Improving mnemonics batch 3 - Levels 21-30...");

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
