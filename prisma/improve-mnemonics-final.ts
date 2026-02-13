import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const improvedMnemonics: {
  character: string;
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
}[] = [
  // ===== LEVEL 48 =====
  {
    character: "覆",
    meaningMnemonicFr: "L'ouest 覀 avec le retour 復 qui COUVRE tout! Comme les couvertures de laine des Pyrénées qu'on étale sur le lit pour se protéger du froid montagnard.",
    readingMnemonicFr: "FUKU sonne comme 'fou cou' - 'Fou ce cou couvert d'écharpes!' dit le Parisien frigorifié.",
  },
  {
    character: "漂",
    meaningMnemonicFr: "L'eau 氵 qui porte le billet 票 qui FLOTTE! Les feuilles mortes qui flottent sur la Seine à l'automne, dérivant doucement vers les ponts de Paris.",
    readingMnemonicFr: "HYO sonne comme 'hypo' - 'Hypothermie en flottant!' prévient le maître-nageur inquiet.",
  },
  {
    character: "膜",
    meaningMnemonicFr: "La chair 月 protégée par le soir 莫 forme une MEMBRANE fine! Comme le voile délicat du foie gras qu'on prépare pour les fêtes de fin d'année en France.",
    readingMnemonicFr: "MAKU sonne comme 'ma cou' - 'Ma couche de membrane!' explique le biologiste passionné.",
  },
  {
    character: "癒",
    meaningMnemonicFr: "La maladie 疒 avec le transport 愈 qui GUÉRIT progressivement! Les cures thermales de Vichy où les malades venaient se soigner dans les eaux miraculeuses.",
    readingMnemonicFr: "YU sonne comme 'you' - 'You allez guérir!' encourage le médecin avec un accent anglais.",
  },
  {
    character: "麗",
    meaningMnemonicFr: "Le cerf 鹿 majestueux est BEAU et élégant! Les cerfs de la forêt de Chambord, gracieux animaux que les rois chassaient dans leurs domaines royaux.",
    readingMnemonicFr: "REI sonne comme 'raie' - 'Une raie de beauté!' s'exclame le coiffeur devant sa création.",
  },
  {
    character: "逸",
    meaningMnemonicFr: "Marcher 辶 avec le lapin 兔 qui ÉCHAPPE à toute vitesse! Le lapin de La Fontaine qui s'échappe pendant que la tortue avance, confiant mais imprudent.",
    readingMnemonicFr: "ITSU sonne comme 'y'a su' - 'Y'a su s'échapper!' constate le chasseur bredouille.",
  },
  {
    character: "瓦",
    meaningMnemonicFr: "Ce signe représente une TUILE de toit provençal! Les tuiles romaines orangées des mas provençaux, chauffées par le soleil du Midi depuis des siècles.",
    readingMnemonicFr: "GA sonne comme 'gars' - 'Le gars répare les tuiles!' annonce l'artisan couvreur sur le toit.",
  },
  {
    character: "殻",
    meaningMnemonicFr: "Le corps 殳 protégé par plusieurs éléments forme une COQUILLE! Les huîtres de Marennes-Oléron, leur coquille nacrée gardant le trésor iodé à l'intérieur.",
    readingMnemonicFr: "KAKU sonne comme 'cacao' - 'Cacao dans la coquille!' dit l'enfant trouvant un œuf surprise.",
  },
  {
    character: "戯",
    meaningMnemonicFr: "Le vide 虚 avec l'arme 戈 factice pour JOUER comme au théâtre! Les comédiens de Molière jouant la comédie avec des épées en bois sur les planches.",
    readingMnemonicFr: "GI sonne comme 'gui' - 'Au gui l'an neuf, on joue!' s'amuse la famille réunie à Noël.",
  },
  {
    character: "窮",
    meaningMnemonicFr: "La grotte 穴 où le corps 身 est coincé en DÉTRESSE! Le spéléologue bloqué dans une grotte des Causses, appelant à l'aide dans l'obscurité totale.",
    readingMnemonicFr: "KYU sonne comme 'cul' - 'Le cul dans la détresse!' grimace le randonneur embourbé.",
  },
  {
    character: "勲",
    meaningMnemonicFr: "La force 力 qui brûle 熏 d'héroïsme obtient le MÉRITE! La Légion d'honneur, décoration suprême que la France décerne à ses héros et serviteurs exemplaires.",
    readingMnemonicFr: "KUN sonne comme 'qu'un' - 'Qu'un seul mérite suffit!' proclame le général décorant le soldat.",
  },
  {
    character: "数",
    meaningMnemonicFr: "La femme 女 compte le riz avec la main 攵 pour obtenir le NOMBRE! La marchande du marché qui compte ses légumes un par un avant de donner le prix.",
    readingMnemonicFr: "SU sonne comme 'su' - 'Su combien? Le nombre!' demande l'acheteur curieux du total.",
  },
  {
    character: "付",
    meaningMnemonicFr: "La personne 亻 avec un point reçoit quelque chose d'ATTACHÉ! Le facteur qui attache le colis à la poignée de porte quand personne ne répond.",
    readingMnemonicFr: "FU sonne comme 'fou' - 'Fou d'attacher ça là!' s'étonne le voisin voyant le paquet.",
  },
  {
    character: "縫",
    meaningMnemonicFr: "Le fil 糸 qui rencontre 逢 sert à COUDRE les tissus! Les couturières de la haute couture parisienne qui cousent à la main les robes des défilés.",
    readingMnemonicFr: "HO sonne comme 'oh' - 'Oh, quelle belle couture!' admire la cliente devant le travail fin.",
  },
  {
    character: "詠",
    meaningMnemonicFr: "Les paroles 言 éternelles 永 sont RÉCITÉES avec passion! Les poètes qui déclament leurs vers dans les cafés littéraires de Saint-Germain-des-Prés.",
    readingMnemonicFr: "EI sonne comme 'hé' - 'Hé, récite-nous un poème!' demande l'assemblée enthousiaste.",
  },
  {
    character: "斧",
    meaningMnemonicFr: "Le père 父 qui manie l'arme 斤 possède une HACHE! Le bûcheron des forêts vosgiennes qui abat les sapins avec sa hache au petit matin glacé.",
    readingMnemonicFr: "FU sonne comme 'fou' - 'Fou de manier la hache ainsi!' s'inquiète l'apprenti bûcheron.",
  },
  {
    character: "濁",
    meaningMnemonicFr: "L'eau 氵 avec le ver 蜀 devient TROUBLE et impure! L'étang après la pluie, l'eau brouillée par la boue que les grenouilles adorent mais pas les baigneurs.",
    readingMnemonicFr: "DAKU sonne comme 'dac cou' - 'D'accord, l'eau est trouble au cou!' constate le nageur.",
  },
  {
    character: "裳",
    meaningMnemonicFr: "Le vêtement 衣 avec le constant 尚 forme la JUPE traditionnelle! Les jupes plissées des danseuses de ballet de l'Opéra de Paris virevoltant sur scène.",
    readingMnemonicFr: "MO sonne comme 'mot' - 'Un mot pour cette jupe: magnifique!' s'exclame le costumier ravi.",
  },
  {
    character: "椿",
    meaningMnemonicFr: "L'arbre 木 du printemps 春 produit le CAMÉLIA fleuri! Les camélias du jardin de Claude Monet à Giverny, roses et blancs parmi les nymphéas célèbres.",
    readingMnemonicFr: "TSUBAKI sonne comme 'su bas qui' - 'Su bas qui fleurit? Le camélia!' répond le jardinier.",
  },
  {
    character: "蛸",
    meaningMnemonicFr: "L'insecte 虫 avec le petit 肖 est en fait le POULPE marin! Les poulpes de Méditerranée que les pêcheurs de Marseille attrapent pour la bouillabaisse.",
    readingMnemonicFr: "TAKO sonne comme 'taco' - 'Taco au poulpe!' invente le chef fusion franco-mexicain.",
  },
  {
    character: "笛",
    meaningMnemonicFr: "Le bambou 竹 avec le frère 由 produit une FLÛTE mélodieuse! La flûte traversière des orchestres de chambre français, instrument délicat et cristallin.",
    readingMnemonicFr: "FUE sonne comme 'feu' - 'Feu! Non, flûte!' se corrige le pompier mélomane distrait.",
  },
  {
    character: "沃",
    meaningMnemonicFr: "L'eau 氵 qui nourrit le grand 夭 rend la terre FERTILE! Les plaines fertiles de la Beauce, grenier à blé de la France, riches et généreuses.",
    readingMnemonicFr: "YOKU sonne comme 'yocourt' - 'Yaourt de terre fertile!' plaisante le fermier bio fier.",
  },
  {
    character: "匙",
    meaningMnemonicFr: "L'enclos 匕 avec la mesure 是 désigne la CUILLÈRE de cuisine! La cuillère en argent de grand-mère qu'on sort pour les grandes occasions familiales.",
    readingMnemonicFr: "SAJI sonne comme 'sa ji' - 'Sa ji-jolie cuillère!' admire l'enfant au repas de Noël.",
  },
  {
    character: "紡",
    meaningMnemonicFr: "Le fil 糸 de la direction 方 sert à FILER la laine! Les fileuses de Bretagne qui transformaient la laine des moutons en fil pour les tricots marins.",
    readingMnemonicFr: "BO sonne comme 'beau' - 'Beau fil qu'on file!' complimente la tisserande expérimentée.",
  },
  {
    character: "瑛",
    meaningMnemonicFr: "Le roi 王 avec l'éclat 英 possède un CRISTAL précieux! Les lustres en cristal de Baccarat qui illuminent les palais et châteaux de France depuis des siècles.",
    readingMnemonicFr: "EI sonne comme 'hé' - 'Hé, quel cristal brillant!' s'émerveille le visiteur de Versailles.",
  },
  {
    character: "妖",
    meaningMnemonicFr: "La femme 女 avec le jeune 夭 crée l'ENCHANTEMENT mystérieux! Les fées de Brocéliande, créatures enchantées des légendes bretonnes qui fascinent les voyageurs.",
    readingMnemonicFr: "YO sonne comme 'yo' - 'Yo, quel enchantement!' s'exclame le jeune visitant la forêt magique.",
  },
  {
    character: "悼",
    meaningMnemonicFr: "Le cœur 忄 qui s'élève 卓 PLEURE les disparus! Les cérémonies du 11 novembre où la France pleure ses soldats tombés au champ d'honneur.",
    readingMnemonicFr: "TO sonne comme 'tôt' - 'Trop tôt parti, on le pleure!' sanglote la veuve éplorée.",
  },
  {
    character: "遍",
    meaningMnemonicFr: "Marcher 辶 avec le plat 扁 qu'on porte PARTOUT dans le monde! Le fromage français exporté partout, du camembert au roquefort, fierté nationale.",
    readingMnemonicFr: "HEN sonne comme 'hein' - 'Hein? C'est partout pareil!' constate le voyageur surpris.",
  },
  {
    character: "肯",
    meaningMnemonicFr: "L'arrêt 止 sur la chair 月 signifie CONSENTIR et accepter! Le notaire qui hoche la tête pour consentir à la signature du contrat important.",
    readingMnemonicFr: "KO sonne comme 'ko' - 'OK, je consens!' acquiesce le signataire convaincu finalement.",
  },
  {
    character: "咳",
    meaningMnemonicFr: "La bouche 口 avec le cochon 亥 produit une TOUX bruyante! La toux grasse de l'hiver parisien quand le froid s'installe et que les rhumes se propagent.",
    readingMnemonicFr: "GAI sonne comme 'gai' - 'Pas gai de tousser ainsi!' se plaint le malade enrhumé.",
  },
  {
    character: "抹",
    meaningMnemonicFr: "La main 扌 qui atteint la fin 末 pour EFFACER les traces! La gomme de l'écolier qui efface les erreurs sur le cahier avant que le maître ne voie.",
    readingMnemonicFr: "MATSU sonne comme 'ma su' - 'Ma su-perbe gomme efface tout!' se réjouit l'élève.",
  },
  {
    character: "紺",
    meaningMnemonicFr: "Le fil 糸 très doux 甘 teint en BLEU MARINE profond! Les uniformes bleu marine de la Marine nationale française, couleur de tradition et d'élégance.",
    readingMnemonicFr: "KON sonne comme 'con' - 'Qu'on est beau en bleu marine!' admire le marin fier.",
  },
  {
    character: "挫",
    meaningMnemonicFr: "La main 扌 qui s'assoit 坐 lourdement est FRUSTRÉE d'échec! L'artiste qui jette ses pinceaux, frustré que sa toile ne corresponde pas à sa vision.",
    readingMnemonicFr: "ZA sonne comme 'za' - 'Za alors, quelle frustration!' soupire l'artiste déçu de lui-même.",
  },
  {
    character: "奔",
    meaningMnemonicFr: "Le grand 大 qui dérive avec l'herbe 卉 COURT sans s'arrêter! Le marathonien français qui court les rues de Paris pendant les 42 kilomètres de la course.",
    readingMnemonicFr: "HON sonne comme 'on' - 'On court, on court!' halète le jogger du dimanche matin.",
  },
  {
    character: "叙",
    meaningMnemonicFr: "Le reste 余 avec la main 又 RACONTE une histoire! Le conteur des veillées qui raconte les légendes du terroir au coin du feu hivernal.",
    readingMnemonicFr: "JO sonne comme 'jo' - 'Jo-lie histoire racontée!' applaudit l'auditoire captivé.",
  },
  {
    character: "薦",
    meaningMnemonicFr: "L'herbe 艹 avec l'animal sur la natte 廌 RECOMMANDE vivement! Le critique gastronomique qui recommande les meilleures tables étoilées de France.",
    readingMnemonicFr: "SEN sonne comme 'sens' - 'Sens mon conseil, je recommande!' insiste le guide Michelin.",
  },
  {
    character: "践",
    meaningMnemonicFr: "Le pied 足 avec le combat 戔 PRATIQUE sans relâche! Le judoka français qui pratique ses techniques au dojo chaque jour pour atteindre la ceinture noire.",
    readingMnemonicFr: "SEN sonne comme 'sens' - 'Sens la pratique dans tes muscles!' encourage le sensei.",
  },
  {
    character: "辰",
    meaningMnemonicFr: "Ce signe du zodiaque chinois représente le DRAGON mythique! Le dragon des carnavals de Nice qui défile dans les rues pendant les festivités colorées.",
    readingMnemonicFr: "SHIN sonne comme 'chine' - 'En Chine, le dragon est sacré!' explique le guide culturel.",
  },
  {
    character: "逐",
    meaningMnemonicFr: "Marcher 辶 avec le cochon 豕 qui POURSUIT sans relâche! Le chasseur à courre qui poursuit le sanglier à travers les forêts de Sologne.",
    readingMnemonicFr: "CHIKU sonne comme 'chic cul' - 'Chic, on le poursuit!' crie le cavalier à la chasse.",
  },
  {
    character: "錯",
    meaningMnemonicFr: "Le métal 金 du passé 昔 mène à l'ERREUR de jugement! L'erreur judiciaire que la justice française cherche toujours à éviter dans ses procès.",
    readingMnemonicFr: "SAKU sonne comme 'sac cou' - 'Sac au cou, quelle erreur!' regrette le cambrioleur attrapé.",
  },
  {
    character: "雌",
    meaningMnemonicFr: "L'oiseau 隹 qui s'arrête 此 est une FEMELLE qui couve! La poule de Bresse qui couve ses œufs pour donner les meilleurs poulets de France.",
    readingMnemonicFr: "SHI sonne comme 'si' - 'Si c'est une femelle, elle couve!' observe le fermier expert.",
  },
  {
    character: "侮",
    meaningMnemonicFr: "La personne 亻 chaque 毎 jour peut MÉPRISER injustement! Le snob parisien qui méprise les provinciaux, attitude condamnable et ridicule.",
    readingMnemonicFr: "BU sonne comme 'bou' - 'Bou, quel mépris!' s'indigne la victime de l'arrogance.",
  },
  {
    character: "倣",
    meaningMnemonicFr: "La personne 亻 qui suit la direction 放 IMITE les autres! L'apprenti pâtissier qui imite les gestes de son maître pour reproduire le parfait éclair au chocolat.",
    readingMnemonicFr: "HO sonne comme 'oh' - 'Oh, j'imite parfaitement!' se félicite l'apprenti doué.",
  },
  {
    character: "扶",
    meaningMnemonicFr: "La main 扌 avec le mari 夫 AIDE les personnes âgées! L'aide à domicile qui soutient les seniors français dans leur quotidien avec dévouement.",
    readingMnemonicFr: "FU sonne comme 'fou' - 'Fou comme j'aide bien!' sourit l'auxiliaire de vie satisfaite.",
  },
  {
    character: "碑",
    meaningMnemonicFr: "La pierre 石 humble 卑 devient un MONUMENT commémoratif! Les monuments aux morts dans chaque village de France, témoins silencieux des sacrifices passés.",
    readingMnemonicFr: "HI sonne comme 'i' - 'Ici repose un héros!' lit-on sur le monument de pierre gravée.",
  },

  // ===== LEVEL 49 =====
  {
    character: "箸",
    meaningMnemonicFr: "Le bambou 竹 avec la personne 者 tient des BAGUETTES pour manger! Les baguettes du restaurant japonais de la rue Sainte-Anne à Paris, quartier nippon.",
    readingMnemonicFr: "HASHI sonne comme 'a si' - 'A si bien mangé avec ces baguettes!' dit le gourmet satisfait.",
  },
  {
    character: "遂",
    meaningMnemonicFr: "Marcher 辶 avec détermination 㒸 pour ACCOMPLIR sa mission! Napoléon qui accomplit ses conquêtes, traversant l'Europe avec son armée victorieuse.",
    readingMnemonicFr: "SUI sonne comme 'su-it' - 'Suite et accomplissement!' proclame le général triomphant.",
  },
  {
    character: "礎",
    meaningMnemonicFr: "La pierre 石 de la Chu-té 楚 forme la FONDATION solide! Les fondations des cathédrales gothiques françaises, pierres millénaires qui supportent Notre-Dame.",
    readingMnemonicFr: "SO sonne comme 'seau' - 'Seau de ciment pour la fondation!' ordonne le maçon au chantier.",
  },
  {
    character: "壇",
    meaningMnemonicFr: "La terre 土 avec le soleil levant 亶 forme une ESTRADE surélevée! L'estrade de l'Assemblée nationale où les députés français débattent des lois.",
    readingMnemonicFr: "DAN sonne comme 'dans' - 'Dans l'estrade, l'orateur brille!' observe le journaliste politique.",
  },
  {
    character: "尼",
    meaningMnemonicFr: "Le corps 尸 agenouillé représente une NONNE en prière! Les nonnes de l'abbaye de Fontevraud, vie de contemplation et de silence depuis le Moyen Âge.",
    readingMnemonicFr: "NI sonne comme 'nid' - 'Ni dans le nid, la nonne prie!' plaisante le moine voisin.",
  },
  {
    character: "概",
    meaningMnemonicFr: "L'arbre 木 avec l'existant 既 donne une vue APPROXIMATIVE générale! L'estimation du maçon qui donne un devis approximatif avant de préciser les détails.",
    readingMnemonicFr: "GAI sonne comme 'gai' - 'En gai, c'est approximatif!' explique l'expert prudent.",
  },
  {
    character: "陶",
    meaningMnemonicFr: "La colline 阝 avec l'enveloppe 匋 produit la POTERIE artisanale! Les poteries de Vallauris où Picasso a créé ses céramiques, art méditerranéen ancestral.",
    readingMnemonicFr: "TO sonne comme 'tôt' - 'Tôt le matin, le potier tourne!' décrit l'artisan matinal.",
  },
  {
    character: "征",
    meaningMnemonicFr: "La marche 彳 correcte 正 part CONQUÉRIR de nouveaux territoires! Les croisades où les chevaliers français partaient conquérir la Terre Sainte.",
    readingMnemonicFr: "SEI sonne comme 'c'est' - 'C'est parti pour conquérir!' crie le chevalier en armure.",
  },
  {
    character: "陛",
    meaningMnemonicFr: "La colline 阝 où l'on compare 比 les rangs mène à Sa MAJESTÉ! Les marches de Versailles où Louis XIV recevait ses sujets en grande pompe royale.",
    readingMnemonicFr: "HEI sonne comme 'hé' - 'Hé, voici Sa Majesté!' annonce le chambellan cérémonieux.",
  },
  {
    character: "奨",
    meaningMnemonicFr: "Le grand 大 avec le bois 将 brûlant ENCOURAGE les efforts! Le professeur qui encourage ses élèves à persévérer, distribuant les bonnes notes méritées.",
    readingMnemonicFr: "SHO sonne comme 'show' - 'Quel show d'encouragement!' applaudit la classe motivée.",
  },
  {
    character: "諭",
    meaningMnemonicFr: "Les paroles 言 qui transportent 兪 servent à CONSEILLER sagement! Le sage du village qui conseille les jeunes mariés sur la vie conjugale.",
    readingMnemonicFr: "YU sonne comme 'you' - 'You devriez écouter ce conseil!' suggère le mentor bienveillant.",
  },
  {
    character: "猶",
    meaningMnemonicFr: "Le chien 犭 qui suit le chef 酋 hésite ENCORE et toujours! L'indécis au restaurant qui hésite encore entre le bœuf bourguignon et le coq au vin.",
    readingMnemonicFr: "YU sonne comme 'you' - 'You hésitez encore?' demande le serveur patient mais pressé.",
  },
  {
    character: "酪",
    meaningMnemonicFr: "L'alcool 酉 de chaque 各 fermentation crée les PRODUITS LAITIERS! Les fromages affinés de France, du camembert au comté, trésors de nos terroirs.",
    readingMnemonicFr: "RAKU sonne comme 'lac cou' - 'Au lac, le cou de vache donne du lait!' sourit le fermier.",
  },
  {
    character: "濫",
    meaningMnemonicFr: "L'eau 氵 qui dépasse la surveillance 監 DÉBORDE de partout! Les crues de la Garonne qui débordent sur les terres agricoles du Sud-Ouest chaque printemps.",
    readingMnemonicFr: "RAN sonne comme 'rang' - 'Le rang déborde d'eau!' alerte le pompier face à l'inondation.",
  },
  {
    character: "虜",
    meaningMnemonicFr: "Le tigre 虍 avec l'homme 男 capturé devient CAPTIF de guerre! Les prisonniers des guerres napoléoniennes, captifs loin de leur patrie pendant des années.",
    readingMnemonicFr: "RYO sonne comme 'rio' - 'À Rio, les captifs rêvent de France!' soupire le prisonnier.",
  },
  {
    character: "尉",
    meaningMnemonicFr: "Le corps 尸 avec le feu 火 et la mesure 寸 désigne le LIEUTENANT! Le lieutenant de gendarmerie qui patrouille dans les campagnes françaises avec dévouement.",
    readingMnemonicFr: "I sonne comme 'y' - 'Y'a le lieutenant qui arrive!' prévient le gendarme de faction.",
  },
  {
    character: "畏",
    meaningMnemonicFr: "Le champ 田 avec le tigre caché inspire la CRAINTE respectueuse! La crainte révérencielle devant la cathédrale de Chartres, chef-d'œuvre gothique imposant.",
    readingMnemonicFr: "I sonne comme 'y' - 'Y'a de quoi avoir crainte!' murmure le visiteur impressionné.",
  },
  {
    character: "韻",
    meaningMnemonicFr: "Le son 音 avec le groupe 員 forme la RIME poétique! Les rimes de Victor Hugo qui résonnent dans la mémoire collective française depuis des générations.",
    readingMnemonicFr: "IN sonne comme 'hein' - 'Hein, quelle belle rime!' apprécie le poète amateur au slam.",
  },
  {
    character: "艶",
    meaningMnemonicFr: "La richesse 豊 avec la couleur 色 crée le CHARME irrésistible! Le charme des actrices françaises, de Brigitte Bardot à Marion Cotillard, élégance légendaire.",
    readingMnemonicFr: "EN sonne comme 'hein' - 'Hein, quel charme fou!' soupire l'admirateur ébloui par l'actrice.",
  },
  {
    character: "翁",
    meaningMnemonicFr: "Le public 公 avec les plumes 羽 grises représente le VIEIL HOMME sage! Le vieux pêcheur breton aux cheveux blancs qui connaît tous les secrets de la mer.",
    readingMnemonicFr: "O sonne comme 'oh' - 'Oh, quel sage vieil homme!' respecte le jeune apprenti pêcheur.",
  },
  {
    character: "諧",
    meaningMnemonicFr: "Les paroles 言 de tous 皆 ensemble créent l'HARMONIE sociale! L'harmonie des chants corses à plusieurs voix, tradition musicale insulaire unique.",
    readingMnemonicFr: "KAI sonne comme 'quai' - 'Au quai, quelle harmonie!' s'émerveille le touriste au port.",
  },
  {
    character: "棺",
    meaningMnemonicFr: "L'arbre 木 officiel 官 transformé en CERCUEIL solennel! Les cercueils de chêne des pompes funèbres françaises, dernière demeure respectueuse.",
    readingMnemonicFr: "KAN sonne comme 'camp' - 'Au camp, on respecte le cercueil!' ordonne l'officier aux soldats.",
  },
  {
    character: "糾",
    meaningMnemonicFr: "Le fil 糸 qui se courbe 丩 se TORSADE et s'emmêle pour enquêter! L'enquêteur qui démêle les fils d'une affaire compliquée, torsadant les indices.",
    readingMnemonicFr: "KYU sonne comme 'cul' - 'Le cul dans l'enquête torsadée!' grimace l'inspecteur perplexe.",
  },
  {
    character: "枯",
    meaningMnemonicFr: "Le bois 木 avec l'ancien 古 devient FANÉ et sec! Les roses fanées du jardin d'automne, pétales secs qui tombent sur le sol humide de rosée.",
    readingMnemonicFr: "KO sonne comme 'K.O.' - 'K.O. la fleur, elle est fanée!' constate le jardinier attristé.",
  },
  {
    character: "揃",
    meaningMnemonicFr: "La main 扌 devant 前 qui RÉUNIT et aligne parfaitement! Le maître d'hôtel qui réunit et aligne les couverts sur la table du grand restaurant étoilé.",
    readingMnemonicFr: "SOROERU sonne comme 'sors au reu' - 'Sors au rendez-vous, tout est réuni!' appelle l'hôtesse.",
  },
  {
    character: "膨",
    meaningMnemonicFr: "La chair 月 qui devient abondante 彭 GONFLE progressivement! Le soufflé au fromage qui gonfle dans le four, moment magique de la cuisine française.",
    readingMnemonicFr: "BO sonne comme 'beau' - 'Beau gonflement du soufflé!' admire le chef pâtissier satisfait.",
  },
  {
    character: "呟",
    meaningMnemonicFr: "La bouche 口 sombre 玄 qui MURMURE des secrets! Les murmures des amoureux sur les bords de Seine, confidences échangées sous les étoiles parisiennes.",
    readingMnemonicFr: "TSUBUYAKU sonne comme 'su bu ya cou' - 'Su bu, murmure au cou!' chuchote l'amoureux.",
  },
  {
    character: "諫",
    meaningMnemonicFr: "Les mots 言 de l'Est 柬 pour REMONTRER et critiquer poliment! Le conseiller du roi qui ose remontrer à son souverain ses erreurs avec diplomatie.",
    readingMnemonicFr: "KAN sonne comme 'camp' - 'Au camp, on reçoit des remontrances!' grimace le soldat puni.",
  },
  {
    character: "袴",
    meaningMnemonicFr: "Le vêtement 衤 ample 夸 est le HAKAMA traditionnel! Le hakama du pratiquant d'aïkido français, pantalon ample pour les arts martiaux japonais.",
    readingMnemonicFr: "HAKAMA est déjà le mot français! Le hakama se prononce pareil, facile à retenir!",
  },
  {
    character: "烏賊",
    meaningMnemonicFr: "Le corbeau 烏 et le voleur 賊 désignent le CALAMAR qui vole l'encre! Les calamars frits des restaurants de bord de mer en Provence, délice méditerranéen.",
    readingMnemonicFr: "IKA sonne comme 'y cas' - 'Y'a cas manger du calamar!' propose le chef du restaurant.",
  },
  {
    character: "槍",
    meaningMnemonicFr: "L'arbre 木 dans l'entrepôt 倉 devient une LANCE de guerre! Les lances des chevaliers français aux tournois médiévaux, arme noble et redoutable.",
    readingMnemonicFr: "YARI sonne comme 'y a ri' - 'Y'a rien comme une bonne lance!' affirme le chevalier fier.",
  },
  {
    character: "釜",
    meaningMnemonicFr: "Le métal 金 du père 父 forme un CHAUDRON de cuisine! Le chaudron de cuivre où mijote la soupe de grand-mère, tradition familiale française.",
    readingMnemonicFr: "KAMA sonne comme 'came à' - 'Ça m'a donné faim, ce chaudron!' dit le gourmand affamé.",
  },
  {
    character: "繊",
    meaningMnemonicFr: "Le fil 糸 fin comme mille 韱 cheveux est une FIBRE délicate! Les fibres de soie de Lyon, industrie textile qui a fait la renommée de la ville.",
    readingMnemonicFr: "SEN sonne comme 'sens' - 'Sens cette fibre douce!' invite le marchand de tissus fins.",
  },
  {
    character: "袖",
    meaningMnemonicFr: "Le vêtement 衤 du frère aîné 由 a de longues MANCHES élégantes! Les manches bouffantes des chemises de mousquetaire, mode du Grand Siècle français.",
    readingMnemonicFr: "SODE sonne comme 'saut de' - 'Saut de manche élégant!' complimente le costumier de théâtre.",
  },
  {
    character: "痴",
    meaningMnemonicFr: "La maladie 疒 qui affecte la connaissance 知 rend IDIOT et fou! Le fou du roi à la cour de France, personnage qui amusait par sa folie feinte.",
    readingMnemonicFr: "CHI sonne comme 'chi' - 'Chi chi, quel idiot!' se moque le courtisan moqueur et cruel.",
  },
  {
    character: "焔",
    meaningMnemonicFr: "Le feu 火 avec le souffle 臽 produit la FLAMME vive! Les flammes du feu de la Saint-Jean que les villages français allument chaque été.",
    readingMnemonicFr: "HONOO sonne comme 'oh no' - 'Oh no, quelle flamme!' s'écrie le pompier face à l'incendie.",
  },
  {
    character: "軟",
    meaningMnemonicFr: "Le véhicule 車 qui manque 欠 de rigidité est MOU et souple! Le matelas mou du lit douillet où l'on s'enfonce pour une bonne nuit de sommeil.",
    readingMnemonicFr: "NAN sonne comme 'naan' - 'Le naan est mou et délicieux!' savoure le client au restaurant indien.",
  },
  {
    character: "庶",
    meaningMnemonicFr: "Le bâtiment 广 avec le feu 灬 qui brûle abrite le PEUPLE COMMUN! Les gens du commun de l'Ancien Régime, le Tiers-État qui fera la Révolution.",
    readingMnemonicFr: "SHO sonne comme 'show' - 'Quel show du peuple commun!' s'émerveille l'historien révolutionnaire.",
  },
  {
    character: "匿",
    meaningMnemonicFr: "La boîte 匚 avec le jeune 若 qui SE CACHE dedans! L'enfant qui se cache dans l'armoire pendant une partie de cache-cache endiablée.",
    readingMnemonicFr: "TOKU sonne comme 'toc cou' - 'Toc toc, tu te caches où?' cherche l'ami au jeu.",
  },
  {
    character: "憤",
    meaningMnemonicFr: "Le cœur 忄 qui brûle de colère 賁 ressent l'INDIGNATION profonde! L'indignation des Gilets Jaunes manifestant leur colère sur les ronds-points de France.",
    readingMnemonicFr: "FUN sonne comme 'fun' - 'Pas fun du tout cette indignation!' soupire le manifestant fatigué.",
  },
  {
    character: "剃",
    meaningMnemonicFr: "Le couteau 刂 du frère 弟 RASE la barbe proprement! Le barbier de la rue de Rivoli qui rase les messieurs avec un rasoir coupe-choux traditionnel.",
    readingMnemonicFr: "TEI sonne comme 'tes' - 'Tes joues sont bien rasées!' complimente le barbier professionnel.",
  },
  {
    character: "窃",
    meaningMnemonicFr: "La grotte 穴 où l'on coupe 切 discrètement pour VOLER! Le cambrioleur du Louvre qui tente de voler la Joconde en pleine nuit, échec célèbre.",
    readingMnemonicFr: "SETSU sonne comme 'c'est su' - 'C'est su qu'il a volé!' annonce l'inspecteur triomphant.",
  },
  {
    character: "堕",
    meaningMnemonicFr: "La terre 土 avec l'équipe 隋 qui TOMBE dans la déchéance! La chute de l'aristocratie française pendant la Révolution, fin d'un monde de privilèges.",
    readingMnemonicFr: "DA sonne comme 'dah' - 'Dah, quelle chute!' s'exclame le témoin de la déchéance.",
  },
  {
    character: "畔",
    meaningMnemonicFr: "Le champ 田 à moitié 半 désigne le BORD de la rizière! Les bords des étangs de Dombes où les oiseaux migrateurs se posent chaque année.",
    readingMnemonicFr: "HAN sonne comme 'an' - 'Chaque an, au bord du champ!' observe le naturaliste patient.",
  },
  {
    character: "礁",
    meaningMnemonicFr: "La pierre 石 qui brûle 焦 sous le soleil forme un RÉCIF dangereux! Les récifs coralliens de Nouvelle-Calédonie, territoire français d'outre-mer paradisiaque.",
    readingMnemonicFr: "SHO sonne comme 'show' - 'Quel show sous-marin près du récif!' s'émerveille le plongeur.",
  },

  // ===== LEVEL 50 =====
  {
    character: "届",
    meaningMnemonicFr: "Le corps 尸 qui atteint sa destination 由 pour PORTER et livrer! Le livreur Deliveroo qui porte les repas jusqu'à la porte des Parisiens affamés.",
    readingMnemonicFr: "TODOKERU sonne comme 'tôt deux cœurs' - 'Tôt livré à deux cœurs!' sourit le livreur romantique.",
  },
  {
    character: "消",
    meaningMnemonicFr: "L'eau 氵 qui rend petit 肖 fait DISPARAÎTRE les traces! L'encre effaçable qui disparaît sous la chaleur, invention pratique pour les écoliers français.",
    readingMnemonicFr: "KIERU sonne comme 'qui erre' - 'Qui erre a disparu!' constate le détective sur l'affaire.",
  },
  {
    character: "整",
    meaningMnemonicFr: "Le pinceau 攵 du contrôle 束 et le correct 正 pour ARRANGER l'ordre! Marie Kondo française qui arrange les armoires pour le bonheur du rangement.",
    readingMnemonicFr: "TOTONOERU sonne comme 'tôt tôt nos heurts' - 'Tôt arrangé, nos soucis!' promet l'organisatrice.",
  },
  {
    character: "変",
    meaningMnemonicFr: "Le fil 亦 qui frappe 攵 provoque un CHANGEMENT radical! La Révolution qui a changé la France de monarchie en république, transformation historique.",
    readingMnemonicFr: "KAWARU sonne comme 'cas va rue' - 'Ça va changer dans la rue!' prédit le révolutionnaire.",
  },
  {
    character: "存",
    meaningMnemonicFr: "L'enfant 子 qui tient ferme 才 prouve qu'il EXISTE vraiment! Descartes et son 'Je pense donc je suis', preuve de l'existence par la pensée française.",
    readingMnemonicFr: "SON sonne comme 'son' - 'Son existence est prouvée!' confirme le philosophe cartésien.",
  },
  {
    character: "備",
    meaningMnemonicFr: "La personne 亻 qui possède tout 備 se PRÉPARE correctement! Le scout français qui prépare son sac pour le camp d'été, toujours prêt comme le veut la devise.",
    readingMnemonicFr: "SONAERU sonne comme 'saut n'y heure' - 'Saute, l'heure de se préparer!' commande le chef scout.",
  },
  {
    character: "棚",
    meaningMnemonicFr: "Le bois 木 avec le drapeau 朋 forme une ÉTAGÈRE pour ranger! L'étagère IKEA que tout Français monte un dimanche, entre jurons et satisfaction finale.",
    readingMnemonicFr: "TANA sonne comme 'ta n'a' - 'Ta n'a pas d'étagère?' s'étonne l'ami en visite.",
  },
  {
    character: "漁",
    meaningMnemonicFr: "L'eau 氵 où l'on cherche le poisson 魚 pour PÊCHER! Les pêcheurs de Concarneau qui pêchent la sardine au petit matin, tradition bretonne séculaire.",
    readingMnemonicFr: "RYO sonne comme 'rio' - 'Au rio, on pêche bien!' plaisante le pêcheur du Lot en vacances.",
  },
  {
    character: "範",
    meaningMnemonicFr: "Le bambou 竹 avec le véhicule 車 et le vent 㔾 donne le MODÈLE à suivre! Le modèle de la haute couture française, standard d'élégance mondiale.",
    readingMnemonicFr: "HAN sonne comme 'an' - 'Chaque an, un nouveau modèle!' annonce le styliste ambitieux.",
  },
  {
    character: "巧",
    meaningMnemonicFr: "Le travail 工 avec la courbure 丂 rend HABILE et adroit! L'artisan ébéniste du Faubourg Saint-Antoine, habile de ses mains depuis des générations.",
    readingMnemonicFr: "TAKUMI sonne comme 'ta cou mi' - 'Ta habileté au cou mis!' complimente le client impressionné.",
  },
  {
    character: "邪",
    meaningMnemonicFr: "Les dents 牙 de la ville 阝 apportent le MAL et le mauvais! Le mal de la grande ville qui corrompt les âmes innocentes, thème du roman réaliste français.",
    readingMnemonicFr: "JA sonne comme 'jà' - 'Déjà le mal s'installe!' observe le moraliste inquiet de son époque.",
  },
  {
    character: "駄",
    meaningMnemonicFr: "Le cheval 馬 trop grand 大 est INUTILE pour la course! Le cheval de trait devenu inutile avec les tracteurs, nostalgie de l'agriculture d'antan.",
    readingMnemonicFr: "DA sonne comme 'dah' - 'Dah, c'est inutile!' soupire le fermier modernisé à regret.",
  },
  {
    character: "唐",
    meaningMnemonicFr: "Le toit 广 avec la bouche 口 évoque la dynastie TANG de CHINE! Les porcelaines Tang importées en France, trésors des collectionneurs depuis Louis XIV.",
    readingMnemonicFr: "TO sonne comme 'tôt' - 'Tôt en Chine Tang!' situe le professeur d'histoire asiatique.",
  },
  {
    character: "廷",
    meaningMnemonicFr: "Le bâtiment 廴 où règne le roi 壬 est la COUR IMPÉRIALE! La cour de Versailles où Louis XIV régnait en maître absolu sur la noblesse française.",
    readingMnemonicFr: "TEI sonne comme 'tes' - 'Tes révérences à la cour!' ordonne le maître de cérémonie.",
  },
  {
    character: "蟹",
    meaningMnemonicFr: "L'insecte 虫 qui résout 解 les problèmes est le CRABE malin! Les crabes de la côte normande qu'on déguste avec du pain frais et du beurre salé.",
    readingMnemonicFr: "KANI sonne comme 'qu'a ni' - 'Qu'a-t-il ce crabe? Il est délicieux!' savoure le gourmet.",
  },
  {
    character: "簿",
    meaningMnemonicFr: "Le bambou 竹 qui s'étend 溥 forme un REGISTRE pour noter! Le registre du maire où sont inscrits les mariages de la commune depuis des siècles.",
    readingMnemonicFr: "BO sonne comme 'beau' - 'Beau registre bien tenu!' apprécie l'archiviste méticuleux.",
  },
  {
    character: "彰",
    meaningMnemonicFr: "Le motif 章 qui brille est MANIFESTE et évident pour tous! La médaille du Mérite qui rend manifeste le courage du récipiendaire devant tous.",
    readingMnemonicFr: "SHO sonne comme 'show' - 'Quel show manifeste!' s'impressionne le public à la cérémonie.",
  },
  {
    character: "銘",
    meaningMnemonicFr: "Le métal 金 avec le nom 名 porte une INSCRIPTION gravée! Les inscriptions sur les cloches des églises françaises, témoignages des siècles passés.",
    readingMnemonicFr: "MEI sonne comme 'mes' - 'Mes inscriptions pour l'éternité!' grave le fondeur de cloches.",
  },
  {
    character: "堰",
    meaningMnemonicFr: "La terre 土 qui censure 匽 l'eau forme un BARRAGE solide! Les barrages EDF qui produisent l'électricité propre des vallées alpines françaises.",
    readingMnemonicFr: "SEKI sonne comme 'c'est qui' - 'C'est qui ce barrage? EDF!' répond l'ingénieur fièrement.",
  },
  {
    character: "亭",
    meaningMnemonicFr: "Le toit 亠 avec le clou 丁 protège le PAVILLON de jardin! Les pavillons des jardins à la française, refuges ombragés pour les promeneurs de Versailles.",
    readingMnemonicFr: "TEI sonne comme 'tes' - 'Tes rendez-vous au pavillon!' suggère le romantique discret.",
  },
  {
    character: "淀",
    meaningMnemonicFr: "L'eau 氵 qui se fixe 定 devient STAGNANTE et immobile! L'eau stagnante des marais de Camargue, royaume des moustiques et des flamants roses.",
    readingMnemonicFr: "YODOMU sonne comme 'yod au mur' - 'L'eau dort au mur, stagnante!' observe le naturaliste.",
  },
  {
    character: "墳",
    meaningMnemonicFr: "La terre 土 qui brûle 賁 de mémoire devient une TOMBE monumentale! Les tumulus bretons, tombes préhistoriques qui gardent les secrets des ancêtres celtes.",
    readingMnemonicFr: "FUN sonne comme 'fun' - 'Pas fun une tombe, mais historique!' nuance l'archéologue passionné.",
  },
  {
    character: "壮",
    meaningMnemonicFr: "Le guerrier 士 grand 爿 est ROBUSTE et vigoureux! Les Gaulois robustes qui résistaient à César, force légendaire célébrée dans Astérix.",
    readingMnemonicFr: "SO sonne comme 'saut' - 'Quel saut robuste!' admire l'entraîneur devant l'athlète musclé.",
  },
  {
    character: "把",
    meaningMnemonicFr: "La main 扌 avec le serpent 巴 qui SAISIT fermement! Le dompteur de serpents qui saisit le cobra sans peur au cirque Pinder en tournée.",
    readingMnemonicFr: "HA sonne comme 'ah' - 'Ah, bien saisi!' félicite le maître au disciple martial.",
  },
  {
    character: "玲",
    meaningMnemonicFr: "Le roi 王 avec l'ordre 令 entend un TINTEMENT cristallin! Le tintement des verres en cristal de Baccarat qu'on trinque lors des grandes occasions.",
    readingMnemonicFr: "REI sonne comme 'raie' - 'Une raie de son tinte!' décrit le musicien poétiquement.",
  },
  {
    character: "傲",
    meaningMnemonicFr: "La personne 亻 qui joue 敖 est ARROGANTE et hautaine! L'aristocrate arrogant de l'Ancien Régime qui méprisait le peuple, cause de sa chute.",
    readingMnemonicFr: "GO sonne comme 'go' - 'Go away, arrogant!' chasse le révolutionnaire en colère justifiée.",
  },
  {
    character: "嗅",
    meaningMnemonicFr: "La bouche 口 qui détecte l'odeur 臭 SENT et flaire! Le nez de Grasse qui sent les parfums et crée les fragrances de la haute parfumerie française.",
    readingMnemonicFr: "KYU sonne comme 'cul' - 'Le cul du chien sent tout!' plaisante le maître-chien policier.",
  },
  {
    character: "矯",
    meaningMnemonicFr: "La flèche 矢 qui s'élève 喬 droite CORRIGE la trajectoire! L'orthodontiste qui corrige les dents avec un appareil, sourire parfait garanti.",
    readingMnemonicFr: "KYO sonne comme 'quoi' - 'Quoi? On corrige tout!' promet le dentiste confiant en son art.",
  },
  {
    character: "串",
    meaningMnemonicFr: "Deux carrés traversés par une ligne forment une BROCHETTE! Les brochettes de l'été français, merguez et chipolatas qui grillent au barbecue familial.",
    readingMnemonicFr: "KUSHI sonne comme 'cou si' - 'Si le cou tourne, la brochette aussi!' conseille le cuisinier.",
  },
  {
    character: "玩",
    meaningMnemonicFr: "Le jade 王 avec l'origine 元 sert à JOUER comme un jouet! Les jouets en bois du Jura, tradition artisanale française que les enfants adorent.",
    readingMnemonicFr: "GAN sonne comme 'gant' - 'Gant de jeu pour jouer!' offre le parent à l'enfant joueur.",
  },
  {
    character: "鴨",
    meaningMnemonicFr: "L'oiseau 鳥 avec le chapeau 甲 est le CANARD du lac! Les canards du Jardin du Luxembourg que les enfants nourrissent de pain le dimanche.",
    readingMnemonicFr: "KAMO sonne comme 'came oh' - 'Came oh le canard!' s'exclame l'enfant en voyant l'oiseau.",
  },
  {
    character: "氷",
    meaningMnemonicFr: "L'eau 水 avec un point qui gèle devient GLACE solide! La glace des patinoires de Noël installées sur les places de France chaque décembre.",
    readingMnemonicFr: "KOORI sonne comme 'corps y' - 'Mon corps y glisse sur la glace!' rit le patineur débutant.",
  },
  {
    character: "湧",
    meaningMnemonicFr: "L'eau 氵 qui brave 勇 la terre pour JAILLIR avec force! Les sources qui jaillissent à Évian et Vittel, eaux minérales françaises célèbres mondialement.",
    readingMnemonicFr: "WAKU sonne comme 'va cou' - 'Ça va, le cou jaillit d'eau!' blague le plombier face au tuyau percé.",
  },
  {
    character: "臍",
    meaningMnemonicFr: "La chair 月 avec la régularité 齊 au centre forme le NOMBRIL! Le nombril du monde, comme les Français pensent parfois être avec leur culture universelle.",
    readingMnemonicFr: "HESO sonne comme 'et so' - 'Et so, le nombril est au centre!' confirme l'anatomiste amusé.",
  },
  {
    character: "鯛",
    meaningMnemonicFr: "Le poisson 魚 célébré 周 est la DAURADE des grandes fêtes! La daurade royale grillée des restaurants de la Côte d'Azur, mets raffiné des bords de mer.",
    readingMnemonicFr: "TAI sonne comme 'taie' - 'Une taie pour la daurade? Non, un plat!' corrige le serveur amusé.",
  },
  {
    character: "蝦",
    meaningMnemonicFr: "L'insecte 虫 avec le faux 叚 est en fait la CREVETTE marine! Les crevettes roses de l'apéritif français, mayonnaise obligatoire pour les tremper.",
    readingMnemonicFr: "EBI sonne comme 'et bi' - 'Et bien, quelle crevette!' s'exclame le gourmet au plateau de fruits de mer.",
  },
  {
    character: "曙",
    meaningMnemonicFr: "Le soleil 日 avec le chef 署 qui se lève marque l'AURORE naissante! L'aurore sur le Mont-Saint-Michel, spectacle magique que les photographes capturent.",
    readingMnemonicFr: "AKEBONO sonne comme 'à quai bonheur' - 'À quai, quel bonheur cette aurore!' s'émerveille le marin.",
  },
  {
    character: "裾",
    meaningMnemonicFr: "Le vêtement 衤 qui habite 居 le bas du corps est l'OURLET de la robe! L'ourlet de la robe de mariée que la couturière ajuste avec précision.",
    readingMnemonicFr: "SUSO sonne comme 'su so' - 'Su so, l'ourlet est parfait!' approuve la mariée ravie.",
  },
  {
    character: "痢",
    meaningMnemonicFr: "La maladie 疒 avec le profit 利 qui file cause la DIARRHÉE désagréable! La tourista des vacanciers français imprudents avec l'eau locale à l'étranger.",
    readingMnemonicFr: "RI sonne comme 'rit' - 'Personne ne rit de la diarrhée!' souffre le malade aux toilettes.",
  },
  {
    character: "痩",
    meaningMnemonicFr: "La maladie 疒 qui sèche 叟 fait MAIGRIR dangereusement! Les mannequins trop maigres que la loi française interdit désormais sur les podiums.",
    readingMnemonicFr: "YASERU sonne comme 'ya se rue' - 'Y'a pas à se ruer pour maigrir!' prévient le médecin.",
  },
  {
    character: "熾",
    meaningMnemonicFr: "Le feu 火 de la cérémonie 戠 brûle ARDENT et intense! Le feu ardent de la forge où le forgeron français crée ses œuvres de métal incandescent.",
    readingMnemonicFr: "SAKAN sonne comme 'sac en' - 'Sac en feu, trop ardent!' crie le pompier en intervention.",
  },
  {
    character: "頬",
    meaningMnemonicFr: "La tête 頁 avec deux côtés 夾 montre les JOUES du visage! Les joues roses des enfants après avoir joué dans la neige des Alpes françaises.",
    readingMnemonicFr: "HOHO sonne comme 'oh oh' - 'Oh oh, quelles belles joues roses!' pince la grand-mère attendrie.",
  },
  {
    character: "桶",
    meaningMnemonicFr: "Le bois 木 qui contient 甬 l'eau est un SEAU rustique! Le seau en bois du puits de ferme, accessoire d'un temps révolu mais romantique.",
    readingMnemonicFr: "OKE sonne comme 'OK' - 'OK pour ce seau!' approuve le fermier satisfait de son achat.",
  },
  {
    character: "剥",
    meaningMnemonicFr: "Le couteau 刂 qui enregistre 彔 le geste de PELER la peau! Peler les pommes pour la tarte Tatin, geste traditionnel des cuisinières françaises.",
    readingMnemonicFr: "MUKU sonne comme 'mou cou' - 'Mou le cou de poulet à peler!' grimace le cuisinier novice.",
  },
  {
    character: "窟",
    meaningMnemonicFr: "La grotte 穴 où l'on se recourbe 屈 est une CAVERNE profonde! Les grottes de Lascaux, cavernes préhistoriques aux peintures rupestres extraordinaires.",
    readingMnemonicFr: "KUTSU sonne comme 'cou tsu' - 'Cou tordu dans la caverne!' se plaint le spéléologue coincé.",
  },
  {
    character: "寡",
    meaningMnemonicFr: "Le toit 宀 avec peu de gens 頁 désigne le PEU NOMBREUX et rare! La veuve solitaire de la chanson française, figure de la solitude romantique.",
    readingMnemonicFr: "KA sonne comme 'cas' - 'Cas rare et peu nombreux!' analyse le statisticien sur les données.",
  },
  {
    character: "弊",
    meaningMnemonicFr: "Le tissu 敝 usé et abîmé représente un ABUS du système! Les abus de la bureaucratie française que les citoyens dénoncent régulièrement dans la presse.",
    readingMnemonicFr: "HEI sonne comme 'hé' - 'Hé, c'est un abus!' proteste le contribuable lésé face à l'injustice.",
  },
  {
    character: "繕",
    meaningMnemonicFr: "Le fil 糸 du bien 善 sert à RÉPARER ce qui est cassé! La couturière qui répare les vêtements usés, geste écologique avant l'heure en France.",
    readingMnemonicFr: "ZEN sonne comme 'zen' - 'Zen, je répare tout!' rassure le bricoleur du dimanche patient.",
  },
  {
    character: "莫",
    meaningMnemonicFr: "L'herbe 艹 avec le soleil 日 qui se couche 大 signifie AUCUN ou rien! Le philosophe nihiliste français qui proclame qu'aucune vérité n'existe vraiment.",
    readingMnemonicFr: "BAKU sonne comme 'bac cou' - 'Bac ou pas, aucune importance!' provoque le rebelle scolaire.",
  },
  {
    character: "藩",
    meaningMnemonicFr: "L'herbe 艹 avec la clôture 潘 délimite le territoire du CLAN féodal! Les clans des seigneurs de l'ancienne France, chacun protégeant son domaine.",
    readingMnemonicFr: "HAN sonne comme 'an' - 'Chaque an, le clan se réunit!' annonce le patriarche de la famille.",
  },
  {
    character: "藻",
    meaningMnemonicFr: "L'herbe 艹 dans l'eau du bain 澡 est une ALGUE marine! Les algues de Bretagne récoltées pour la thalassothérapie, bienfaits de l'océan Atlantique.",
    readingMnemonicFr: "MO sonne comme 'mot' - 'Un mot: algue délicieuse!' savoure le chef cuisinier breton.",
  },
  {
    character: "頒",
    meaningMnemonicFr: "La division 分 de la tête 頁 sert à DISTRIBUER équitablement! La distribution des prix à l'école républicaine française, tradition de fin d'année.",
    readingMnemonicFr: "HAN sonne comme 'an' - 'Chaque an, on distribue les prix!' rappelle le directeur d'école.",
  },
  {
    character: "龍",
    meaningMnemonicFr: "Cette créature mythique majestueuse est le DRAGON légendaire! Le dragon des défilés du Nouvel An chinois dans le 13e arrondissement de Paris.",
    readingMnemonicFr: "RYU sonne comme 'rue' - 'Le dragon dans la rue!' s'émerveille l'enfant au défilé festif.",
  },

  // ===== LEVELS 32, 35, 38, 42 - ADDITIONAL WEAK KANJI =====
  {
    character: "太陽",
    meaningMnemonicFr: "Le grand 太 positif 陽 qui brille dans le ciel est le SOLEIL radieux! Le soleil de la Côte d'Azur qui attire les touristes du monde entier chaque été.",
    readingMnemonicFr: "TAIYO sonne comme 'ta hypo' - 'Ta hypothèse: le soleil brille!' confirme le météorologue optimiste.",
  },
  {
    character: "砂糖",
    meaningMnemonicFr: "Le sable 砂 doux comme la dynastie Tang 糖 est le SUCRE précieux! Le sucre de canne des Antilles françaises, douceur des îles paradisiaques.",
    readingMnemonicFr: "SATO sonne comme 'sat tôt' - 'Saturé de sucre trop tôt!' prévient le dentiste aux enfants.",
  },
  {
    character: "中央",
    meaningMnemonicFr: "Le milieu 中 de l'enclos 央 désigne le CENTRE exact! Le Centre Pompidou au cœur de Paris, musée d'art moderne au centre de la capitale.",
    readingMnemonicFr: "CHUO sonne comme 'chuot' - 'Chouette, on est au centre!' se réjouit le touriste bien placé.",
  },
  {
    character: "稲妻",
    meaningMnemonicFr: "Le riz 稲 et la femme 妻 du ciel créent l'ÉCLAIR foudroyant! Les éclairs des orages d'été sur les champs de blé de la Beauce, spectacle naturel.",
    readingMnemonicFr: "INAZUMA sonne comme 'hein as zuma' - 'Hein, as-tu vu cet éclair!' s'exclame le témoin ébloui.",
  },
];

async function main() {
  console.log("Starting final mnemonic improvements for levels 32, 35, 38, 42, 48, 49, 50...\n");

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
