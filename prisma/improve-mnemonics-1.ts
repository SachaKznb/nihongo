import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Improved mnemonics batch 1 - Levels 1-10
// Rich French storytelling with cultural references

const improvements = [
  // Level 1
  {
    character: "口",
    meaningMnemonicFr: "Imagine un croissant parfaitement carré posé sur le comptoir d'une boulangerie parisienne. Le boulanger l'a fait exprès pour choquer les clients ! Ce carré, c'est une BOUCHE grande ouverte de stupéfaction. Quand tu vois quelque chose d'incroyable, ta bouche forme ce carré parfait !",
    readingMnemonicFr: "KUCHI sonne comme 'cou-chi' - imagine quelqu'un qui chuchote un secret. Pour chuchoter, il approche sa BOUCHE de ton oreille et dit 'couuuu-chi'. KOU c'est quand tu tousses avec ta BOUCHE - 'KOU KOU KOU !'",
  },
  {
    character: "手",
    meaningMnemonicFr: "C'est un serveur parisien qui jongle avec un plateau ! Tu vois le trait horizontal du haut ? C'est le plateau. Les lignes en dessous, ce sont ses doigts et sa MAIN qui équilibrent. Un vrai artiste de la restauration française !",
    readingMnemonicFr: "TE comme 'thé' ! Pour servir le thé à la française, tu dois avoir une MAIN stable et élégante. 'Un peu de THÉ ?' demande le serveur en tendant sa MAIN. SHU comme 'chou' - tu pétris la pâte à chou avec tes MAINS !",
  },
  {
    character: "目",
    meaningMnemonicFr: "Un tableau exposé au Louvre ! Le cadre rectangulaire contient des lignes horizontales - ce sont les paupières et l'iris d'un ŒIL géant peint par un artiste surréaliste. Les visiteurs le fixent et l'ŒIL les fixe en retour. C'est l'œuvre la plus troublante du musée !",
    readingMnemonicFr: "ME comme 'mais' ! 'MAIS qu'est-ce que tu regardes avec tes yeux ?' Tu écarquilles les YEUX de surprise - 'ME ?!' MOKU sonne comme 'moqueur' - un ŒIL moqueur qui te juge depuis le tableau !",
  },
  {
    character: "耳",
    meaningMnemonicFr: "Sur les marchés de Provence, un vendeur crie ses prix si fort que les OREILLES des clients grandissent ! Ce kanji montre une oreille qui s'est étirée à force d'écouter les bonimenteurs. Les trois traits horizontaux ? Les ondes sonores qui entrent dedans !",
    readingMnemonicFr: "MIMI comme 'mimi' (mignon en français familier) ! 'Oh, quelles mignonnes petites OREILLES !' dit mamie en pinçant tes oreilles. JI comme 'j'y' - 'J'y entends rien !' quand tes OREILLES sont bouchées.",
  },
  {
    character: "足",
    meaningMnemonicFr: "Un danseur de cancan au Moulin Rouge ! En haut, c'est son genou plié. En bas, son PIED qui donne des kicks spectaculaires. La ligne verticale ? Sa JAMBE qui monte, monte, monte ! Les touristes applaudissent ce magnifique PIED français !",
    readingMnemonicFr: "ASHI sonne comme 'à chier' (pardon !) - 'J'ai mal aux PIEDS, c'est à chier cette randonnée !' SOKU comme 'saucisse' - tes PIEDS sont gonflés comme des saucisses après avoir marché toute la journée !",
  },

  // Level 2
  {
    character: "木",
    meaningMnemonicFr: "Un platane majestueux sur les Champs-Élysées ! Le trait vertical central, c'est le tronc solide. Le trait horizontal, ce sont les branches qui s'étendent. Les deux traits diagonaux en bas ? Les racines qui plongent sous le trottoir parisien. Cet ARBRE a vu passer Napoléon !",
    readingMnemonicFr: "KI comme 'qui' ! 'QUI a planté cet ARBRE ici ?' demande le touriste ébahi. MOKU sonne comme 'moquette' - mais non, c'est pas de la moquette sous tes pieds, c'est les feuilles de l'ARBRE !",
  },
  {
    character: "金",
    meaningMnemonicFr: "Le trésor caché dans les catacombes de Paris ! Le toit en haut protège un coffre (le carré) rempli de pièces d'OR (les traits en bas qui brillent). Les rois de France y cachaient leur ARGENT. Le tout forme une montagne de richesses dorées !",
    readingMnemonicFr: "KANE sonne comme 'canne' - une CANNE en OR massif, l'accessoire des nobles français ! KIN comme 'quinze' - tu as trouvé QUINZE lingots d'OR dans le coffre !",
  },
  {
    character: "水",
    meaningMnemonicFr: "Une fontaine Wallace à Paris ! Le trait central vertical, c'est le jet d'EAU principal. Les gouttes éclaboussent de chaque côté - ce sont les petits traits latéraux. Les Parisiens viennent y remplir leurs gourdes d'EAU fraîche gratuite depuis 1872 !",
    readingMnemonicFr: "MIZU sonne comme 'mi-zut' - 'Mince, j'ai renversé mon EAU !' SUI comme 'suisse' - l'EAU minérale suisse, pure comme celle des Alpes !",
  },
  {
    character: "土",
    meaningMnemonicFr: "Un potier de Vallauris (le village de Picasso) au travail ! Le trait horizontal du bas, c'est son tour de potier. Le trait vertical, c'est la motte de TERRE glaise qui monte. Le trait du haut, c'est le vase qui prend forme. De la TERRE française naît l'art !",
    readingMnemonicFr: "TSUCHI sonne comme 'toutchi' - tu touches la TERRE avec tes mains ! DO comme 'dos' - tu as de la TERRE plein le DOS après avoir jardiné !",
  },
  {
    character: "指",
    meaningMnemonicFr: "À la pâtisserie Ladurée, le chef pointe du DOIGT le macaron parfait ! La partie gauche 扌c'est sa main, la partie droite c'est le DOIGT tendu qui désigne le chef-d'œuvre. 'Celui-ci !' dit-il avec son DOIGT autoritaire. C'est le DOIGT du maître pâtissier !",
    readingMnemonicFr: "YUBI sonne comme 'you-bi' - 'Hey YOU, regarde mon BIjou !' en montrant la bague sur ton DOIGT. SHI comme 'chic' - un DOIGT CHIC avec du vernis français !",
  },

  // Level 3
  {
    character: "今",
    meaningMnemonicFr: "Un mime sur la place du Tertre à Montmartre ! Il est figé, immobile, capturant l'instant présent. Le toit (人) c'est son béret, en dessous c'est son corps figé dans le MAINTENANT. Il ne bouge pas car seul l'instant présent existe pour lui !",
    readingMnemonicFr: "IMA sonne comme 'il m'a' - 'Il m'a dit de venir MAINTENANT !' KON comme 'con' - 'T'es con ou quoi ? C'est MAINTENANT qu'il faut partir !'",
  },
  {
    character: "歯",
    meaningMnemonicFr: "Un dentiste de la place Vendôme examine la bouche d'un aristocrate ! En haut 止 c'est sa main qui dit 'stop, arrêtez de mâcher'. En bas, les traits représentent les DENTS alignées comme des perles. Des DENTS si parfaites qu'on pourrait y voir son reflet !",
    readingMnemonicFr: "HA comme 'ah' - 'Ouvrez et dites AAAH' pour montrer vos DENTS au dentiste ! SHI comme 'chi' - le bruit quand tu serres les DENTS : 'SSSSHI' !",
  },
  {
    character: "前",
    meaningMnemonicFr: "La queue DEVANT une boulangerie parisienne à 7h du matin ! En haut, les deux personnes qui attendent. En bas, le couteau (刂) du boulanger prêt à couper les baguettes. Tout le monde veut être DEVANT pour avoir la baguette la plus fraîche !",
    readingMnemonicFr: "MAE sonne comme 'mais' - 'MAIS avance, t'es DEVANT moi !' ZEN comme 'zen' - reste ZEN même si tu es DEVANT dans la file, pas de stress !",
  },
  {
    character: "後",
    meaningMnemonicFr: "Tu marches dans le Marais et quelqu'un te suit DERRIÈRE ! La partie gauche 彳montre les pas. La partie droite, c'est la personne qui traîne DERRIÈRE toi. Tu accélères, elle accélère. DERRIÈRE toi, toujours DERRIÈRE ! (C'est juste un touriste perdu)",
    readingMnemonicFr: "ATO sonne comme 'à taux' - 'Je te rembourse à taux zéro, mais APRÈS !' GO comme 'go' - 'GO, on y va, tu viens APRÈS !' USHIRO comme 'ouch, zero' - tu te retournes et DERRIÈRE toi, y'a personne !",
  },
  {
    character: "上",
    meaningMnemonicFr: "La Tour Eiffel qui pointe vers le HAUT ! Le trait horizontal du bas, c'est le Champ de Mars. Le trait vertical, c'est la tour qui s'élève. Le petit trait du haut, c'est l'antenne tout en HAUT ! Toujours plus HAUT, comme les ambitions françaises !",
    readingMnemonicFr: "UE sonne comme 'ouais' - 'OUAIS, c'est en HAUT !' JOU comme 'joue' - le rouge te monte aux JOUES quand tu arrives en HAUT de la tour !",
  },

  // Level 4
  {
    character: "下",
    meaningMnemonicFr: "Le métro parisien qui descend sous terre ! Le trait horizontal du haut, c'est le trottoir. Le trait vertical qui descend, c'est l'escalier. Le petit trait en BAS, c'est le quai du métro. On descend, on descend, tout en BAS sous Paris !",
    readingMnemonicFr: "SHITA sonne comme 'chita' (guépard) - un guépard rapide qui court vers le BAS de la colline ! KA comme 'cas' - 'En CAS de pluie, descends en BAS !' GE comme 'gai' - tu es GAI de descendre jouer en BAS !",
  },
  {
    character: "左",
    meaningMnemonicFr: "Un chef d'orchestre français à l'Opéra Garnier ! Sa main GAUCHE (le trait horizontal et diagonal) tient la baguette. Le carré en bas c'est la partition. En France, on commence toujours par la GAUCHE (comme en politique aussi, haha) !",
    readingMnemonicFr: "HIDARI sonne comme 'il a ri' - 'Il a ri quand je lui ai dit de tourner à GAUCHE !' SA comme 'ça' - 'C'est par là, à GAUCHE, ÇA !'",
  },
  {
    character: "右",
    meaningMnemonicFr: "Un sommelier dans un grand restaurant étoilé ! Sa main DROITE (le trait en haut) tient le tire-bouchon. En bas, c'est la bouteille de vin 口. De la main DROITE, il débouche avec élégance. En France, on trinque de la main DROITE !",
    readingMnemonicFr: "MIGI sonne comme 'mi-gui' - le gui du Nouvel An est à DROITE de la porte ! YUU comme 'you' - 'Hey YOU, c'est à DROITE !'",
  },
  {
    character: "女",
    meaningMnemonicFr: "Une danseuse de ballet à l'Opéra de Paris ! Elle fait une révérence gracieuse, les bras croisés devant elle (les traits diagonaux), les jambes élégamment positionnées. C'est la grâce de la FEMME française capturée en un seul caractère !",
    readingMnemonicFr: "ONNA sonne comme 'on a' - 'ON A une FEMME formidable dans l'équipe !' JO comme 'joli' - une JOLI FEMME passe dans la rue !",
  },
  {
    character: "男",
    meaningMnemonicFr: "Un paysan du Beaujolais dans son champ 田 avec sa bêche 力 ! Il travaille la terre avec force. En France, un HOMME se définissait par son travail aux champs. Le champ + la force = l'HOMME qui nourrit le pays !",
    readingMnemonicFr: "OTOKO sonne comme 'auto-ko' - cet HOMME est un peu auto-ko (KO de lui-même) après le travail ! DAN comme 'dans' - 'DANS cette maison vit un HOMME courageux !'",
  },

  // Level 5
  {
    character: "子",
    meaningMnemonicFr: "Un bébé emmailloté à la maternité des Bluets à Paris ! Le trait horizontal, ce sont ses petits bras qui dépassent du lange. Le trait vertical avec le crochet, c'est son corps enveloppé. Un petit ENFANT français qui vient de naître, prêt à crier 'Waouh !' !",
    readingMnemonicFr: "KO comme 'co' - 'Mon ENFANT est mon CO-pilote dans la vie !' SHI comme 'chi' (chou en français familier) - 'Mon petit CHOU, mon ENFANT adoré !'",
  },
  {
    character: "父",
    meaningMnemonicFr: "Un PÈRE français qui fait un barbecue ! Les deux traits du haut, ce sont les pinces à viande qu'il brandit fièrement. Les traits en dessous, c'est lui devant son grill. Chaque PÈRE français pense être le roi du barbecue !",
    readingMnemonicFr: "CHICHI sonne comme 'chichi' - un PÈRE un peu CHICHI qui fait des manières ! FU comme 'fou' - ce PÈRE est FOU de ses enfants !",
  },
  {
    character: "母",
    meaningMnemonicFr: "Une MÈRE qui allaite ses jumeaux ! Le cadre extérieur, c'est son corps protecteur. Les deux points à l'intérieur ? Ses deux seins nourriciers. C'est l'image universelle de la MÈRE nourricière, le premier amour de chaque Français !",
    readingMnemonicFr: "HAHA - c'est le rire de la MÈRE quand son bébé fait des bêtises ! 'HAHAHA !' elle rit. BO comme 'beau' - 'Ma MÈRE est la plus BELLE du monde !'",
  },
  {
    character: "力",
    meaningMnemonicFr: "Le bras musclé d'un rugbyman du Stade Toulousain ! Ce trait courbé avec le crochet, c'est son biceps gonflé après des années d'entraînement. La FORCE brute du rugby français, le sport de l'ovalie qui demande une PUISSANCE incroyable !",
    readingMnemonicFr: "CHIKARA sonne comme 'chic-ara' - ce mec a la FORCE, il est CHIC en plus ! RYOKU comme 'rigoler' - on RIGOLE pas avec la FORCE de ce type !",
  },

  // Level 6
  {
    character: "心",
    meaningMnemonicFr: "Un CŒUR dessiné sur la buée d'un café parisien ! Le point en haut à gauche, c'est un battement. Le crochet, c'est la forme du CŒUR qui palpite. Les deux autres points, ce sont les derniers battements. L'amour à la française, passionné et intense !",
    readingMnemonicFr: "KOKORO sonne comme 'coco-ro' - ton CŒUR fait 'coco-ro, coco-ro' quand tu es amoureux ! SHIN comme 'chéri(e)' - 'Mon CHÉRI, tu as volé mon CŒUR !'",
  },
  {
    character: "思",
    meaningMnemonicFr: "À la terrasse d'un café, un philosophe français PENSE ! En haut 田 c'est son cerveau quadrillé d'idées. En bas 心 c'est son cœur. Il PENSE avec sa tête ET son cœur - c'est ça l'intellectualisme français ! 'Je pense donc je suis' disait Descartes !",
    readingMnemonicFr: "OMOU sonne comme 'oh mou' - 'Oh, mon cerveau est MOU, je n'arrive plus à PENSER !' SHI comme 'si' - 'SI seulement je pouvais arrêter de PENSER !'",
  },
  {
    character: "言",
    meaningMnemonicFr: "Un professeur de la Sorbonne qui PARLE ! Le trait du haut, c'est sa bouche ouverte. En dessous, les lignes représentent les mots qui sortent, empilés comme des arguments philosophiques. Il PARLE, il PARLE - impossible de l'arrêter !",
    readingMnemonicFr: "IU sonne comme 'il vous' - 'Il vous a DIT quoi exactement ?' GEN comme 'gêne' - ça te GÊNE quand quelqu'un PARLE trop ! KOTO comme 'côteau' - il PARLE du COTEAU de Bourgogne avec passion !",
  },
  {
    character: "話",
    meaningMnemonicFr: "Deux commères au marché de Rungis ! À gauche 言 l'une PARLE. À droite 舌 l'autre tire la langue de surprise ! Elles PARLENT des ragots du quartier. Une vraie CONVERSATION à la française, avec gesticulations et expressions théâtrales !",
    readingMnemonicFr: "HANASHI sonne comme 'Anna-chi' - 'ANNA, raconte-moi cette HISTOIRE !' WA comme 'waouh' - 'WAOUH, quelle HISTOIRE incroyable !'",
  },

  // Level 7
  {
    character: "行",
    meaningMnemonicFr: "Un carrefour parisien où les gens VONT dans toutes les directions ! Les deux colonnes représentent deux rues qui se croisent. Les petits traits, ce sont les piétons pressés qui MARCHENT. 'Allez, on y VA !' crient les Parisiens toujours pressés !",
    readingMnemonicFr: "IKU sonne comme 'il coupe' - 'Il coupe par là pour Y ALLER plus vite !' KOU comme 'coup' - d'un COUP, il est parti, il est ALLÉ ! GYOU comme 'gyoza' - on VA manger des GYOZA !",
  },
  {
    character: "来",
    meaningMnemonicFr: "Le TGV qui ARRIVE en gare de Lyon ! Les traits horizontaux, ce sont les rails. Les traits qui convergent, c'est le train qui VIENT vers toi à 300 km/h. Il ARRIVE, il ARRIVE ! Les passagers sur le quai voient le train VENIR !",
    readingMnemonicFr: "KURU sonne comme 'cou-rou' - le train fait 'cou-rou, cou-rou' en VENANT ! RAI comme 'raie' - une RAIE (le poisson) VIENT vers toi dans l'eau !",
  },
  {
    character: "見",
    meaningMnemonicFr: "Un œil géant 目 sur des jambes 儿 qui se promène au Louvre ! C'est un touriste qui VOIT tout, qui REGARDE chaque tableau. Son œil est tellement grand qu'on dirait qu'il n'est QUE ça - un œil qui OBSERVE Paris !",
    readingMnemonicFr: "MIRU sonne comme 'mire' - tu REGARDES dans le miroir ! KEN comme 'ken' (le poing) - REGARDE mon poing, Ken le guerrier !",
  },
  {
    character: "聞",
    meaningMnemonicFr: "Au marché aux puces de Saint-Ouen, une oreille 耳 se colle à une porte 門 pour ÉCOUTER les négociations ! C'est l'art d'ENTENDRE les bonnes affaires. 'J'ai ENTENDU qu'il y a des trésors là-dedans !' murmure le chineur !",
    readingMnemonicFr: "KIKU sonne comme 'qui coud' - 'QUI COUD ? J'ENTENDS la machine à coudre !' BUN comme 'bonne' - 'J'ai ENTENDU une BONNE nouvelle !'",
  },

  // Level 8
  {
    character: "食",
    meaningMnemonicFr: "La grande bouffe à la française ! En haut 人 c'est le toit d'un restaurant. En dessous, c'est une table mise avec une cloche 良. Un repas gastronomique, l'art de MANGER à la française ! 'On ne rigole pas avec la NOURRITURE !' dit le chef étoilé !",
    readingMnemonicFr: "TABERU sonne comme 'table-ru' - on MANGE à TABLE ! SHOKU comme 'choc' - 'Quel CHOC de goûts quand je MANGE ce plat !'",
  },
  {
    character: "飲",
    meaningMnemonicFr: "Un apéro au comptoir d'un bistrot parisien ! À gauche 食 la nourriture, à droite 欠 un homme qui ouvre la bouche pour BOIRE. 'Un petit canon ?' demande le barman. BOIRE un verre, c'est le rituel sacré de l'apéritif français !",
    readingMnemonicFr: "NOMU sonne comme 'no mu' - 'NO MU (pas de vache), je BOIS du vin, pas du lait !' IN comme 'un' - 'Je BOIS UN verre, juste UN !'",
  },
  {
    character: "立",
    meaningMnemonicFr: "La statue de Jeanne d'Arc, DEBOUT sur son cheval, place des Pyramides ! Le trait horizontal du haut, ce sont ses bras levés. Le trait vertical, c'est elle DEBOUT, droite et fière. Les jambes écartées en bas, prêtes au combat. SE LEVER pour la France !",
    readingMnemonicFr: "TATSU sonne comme 'ta statue' - 'TA STATUE est DEBOUT depuis des siècles !' RITSU comme 'rythme' - le RYTHME de vie quand tu es DEBOUT toute la journée !",
  },
  {
    character: "座",
    meaningMnemonicFr: "Le trône de Napoléon aux Tuileries ! En haut 广 le dais royal. En dessous, deux personnes 人人 qui S'ASSOIENT sur le sol. Tout en bas 土 la terre ferme. Même l'Empereur devait S'ASSEOIR parfois ! Un SIÈGE digne d'un roi !",
    readingMnemonicFr: "SUWARU sonne comme 'sous-voir' - 'Je m'ASSIEDS SOUS le parasol pour VOIR !' ZA comme 'za' (pizza) - 'Je m'ASSIEDS pour manger ma piZZA !'",
  },

  // Level 9
  {
    character: "出",
    meaningMnemonicFr: "L'éruption d'un volcan d'Auvergne ! Une montagne qui crache sa lave vers le HAUT, puis une autre couche qui SORT. Ça SORT de partout ! Comme quand tu quittes le métro bondé aux heures de pointe - tout le monde SORT en même temps !",
    readingMnemonicFr: "DERU sonne comme 'de rue' - 'Je SORS DE la RUE principale !' SHUTSU comme 'chut-su' - 'CHUT, je SORS en douce !'",
  },
  {
    character: "入",
    meaningMnemonicFr: "Les deux battants d'une porte cochère parisienne qui s'ouvrent ! Tu ENTRES dans la cour d'un immeuble haussmannien. Les deux traits forment un passage accueillant. 'ENTREZ, ENTREZ !' dit la concierge. Tu ENTRES dans un autre monde !",
    readingMnemonicFr: "HAIRU sonne comme 'air-u' - tu ENTRES dans l'AIR climatisé, ouf ! NYUU comme 'new' - tu ENTRES dans une NEW maison !",
  },
  {
    character: "学",
    meaningMnemonicFr: "Un élève studieux sous le toit 冖 de la Sorbonne ! Les deux points en haut, ce sont ses lunettes. En dessous 子 c'est l'enfant qui ÉTUDIE. L'APPRENTISSAGE à la française : rigueur et excellence ! 'APPRENDRE, c'est la clé !' dit le maître !",
    readingMnemonicFr: "MANABU sonne comme 'mana-bu' - tu APPRENDS à gérer ta MANA comme dans un jeu vidéo ! GAKU comme 'gag' - tu APPRENDS des GAGS pour faire rire les copains !",
  },
  {
    character: "校",
    meaningMnemonicFr: "Une ÉCOLE alsacienne à colombages ! À gauche 木 le bois des poutres. À droite 交 les élèves qui se croisent dans la cour. C'est la rentrée des classes ! L'ÉCOLE française, gratuite et obligatoire, où tous les enfants se retrouvent !",
    readingMnemonicFr: "KOU sonne comme 'coup' - 'Un COUP de sifflet et c'est la récré à l'ÉCOLE !'",
  },

  // Level 10
  {
    character: "時",
    meaningMnemonicFr: "L'horloge de la gare de Lyon qui marque le TEMPS ! À gauche 日 le soleil qui tourne. À droite 寺 un temple où les moines prient à heures fixes. Le TEMPS s'écoule, chaque HEURE compte ! 'Quelle HEURE est-il ?' demande le voyageur pressé !",
    readingMnemonicFr: "TOKI sonne comme 'toqué' - tu es TOQUÉ de regarder l'HEURE tout le TEMPS ! JI comme 'j'y' - 'J'Y vais, il est l'HEURE !'",
  },
  {
    character: "間",
    meaningMnemonicFr: "Le soleil 日 qui passe par l'ESPACE entre deux portes 門 ! Tu regardes par l'entrebâillement, un rayon de lumière traverse l'INTERVALLE. C'est l'ESPACE ENTRE les choses, le moment ENTRE deux instants. Le MA japonais, le vide qui a du sens !",
    readingMnemonicFr: "AIDA sonne comme 'aïe-da' - 'AÏÏE, j'ai coincé mes doigts dans l'ESPACE entre les portes !' KAN comme 'khan' - le grand Khan attend ENTRE deux batailles ! MA comme 'ma' - 'MA place est dans cet ESPACE !'",
  },
  {
    character: "週",
    meaningMnemonicFr: "Une SEMAINE de tour de France ! Le vélo 辶 fait le tour 周 de la France en une SEMAINE. Chaque jour, une nouvelle étape. Du lundi au dimanche, les coureurs pédalent ! Une SEMAINE complète de souffrance et de gloire !",
    readingMnemonicFr: "SHUU sonne comme 'chou' - 'Cette SEMAINE, je mange des CHOUX de Bruxelles chaque jour !'",
  },
  {
    character: "曜",
    meaningMnemonicFr: "Les jours de la semaine au calendrier des Postes ! Le soleil 日 illumine chaque JOUR de la semaine. Les plumes 羽 en dessous représentent les oiseaux qui chantent chaque matin. 'Quel JOUR sommes-nous ?' demande papi en regardant son calendrier !",
    readingMnemonicFr: "YOU sonne comme 'you' - 'YOU are the sunshine of my day!' - chaque JOUR de la semaine !",
  },
];

async function main() {
  console.log("Improving mnemonics batch 1 - Levels 1-10...");

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
