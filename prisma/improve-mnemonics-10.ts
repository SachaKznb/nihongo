import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const improvedMnemonics: {
  character: string;
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
}[] = [
  // ========== Level 47 ==========
  {
    character: "胴",
    meaningMnemonicFr: "La chair 月 du corps reste la MEME 同 partout: c'est le TRONC! Imaginez un mannequin de couturier parisien, ce buste sans bras ni jambes qui sert a creer les plus belles robes de haute couture.",
    readingMnemonicFr: "DOU sonne comme 'doux' - 'Le tronc doux du mannequin!' dit la couturiere de chez Chanel.",
  },
  {
    character: "芯",
    meaningMnemonicFr: "L'herbe 艹 cache un coeur 心 secret: c'est le NOYAU! Comme le coeur tendre d'un artichaut breton que l'on decouvre apres avoir enleve toutes les feuilles, trempe dans la vinaigrette.",
    readingMnemonicFr: "SHIN sonne comme 'chine' - 'Je chine le noyau parfait!' dit le chef au marche de Rungis.",
  },
  {
    character: "巾",
    meaningMnemonicFr: "Un morceau de TISSU suspendu a un crochet, comme les belles nappes en lin provencal que l'on etend au soleil apres la lessive. Ce kanji simple represente l'etoffe qui habille nos tables de fete.",
    readingMnemonicFr: "KIN sonne comme 'quine' - 'Faire un quine avec ce tissu!' dit la brodeuse de Calais.",
  },
  {
    character: "迅",
    meaningMnemonicFr: "Marcher 辶 avec la vitesse d'un oiseau qui file: c'est RAPIDE! Pensez au TGV qui traverse la France a 320 km/h, reliant Paris a Lyon en moins de deux heures, un eclair sur les rails.",
    readingMnemonicFr: "JIN sonne comme 'djinn' - 'Rapide comme un djinn!' dit le controleur SNCF emerveille.",
  },
  {
    character: "騎",
    meaningMnemonicFr: "Le cheval 馬 porte quelque chose d'etrange 奇: un CAVALIER! Comme les Gardes Republicains sur leurs chevaux a l'Elysee, ou les chevaliers de Jeanne d'Arc chargeant a Orleans.",
    readingMnemonicFr: "KI sonne comme 'qui' - 'Qui est ce cavalier mysterieux?' demande-t-on a Versailles.",
  },
  {
    character: "蓄",
    meaningMnemonicFr: "L'herbe 艹 nourrit le betail 畜 qu'on ACCUMULE: le stockage! Les fermiers du Beauce engrangent les recoltes pour l'hiver, remplissant les silos de ble dore comme des tresors.",
    readingMnemonicFr: "CHIKU sonne comme 'chic cou' - 'Chic, cou-rons stocker!' dit le fermier avant l'orage.",
  },
  {
    character: "脅",
    meaningMnemonicFr: "La chair 月 sous la pression de trois forces 劦: c'est MENACER! Comme un syndicaliste CGT qui menace de greve, ou un garde du corps qui intimide d'un simple regard.",
    readingMnemonicFr: "KYOU sonne comme 'quoi' - 'Tu me menaces? Quoi?!' s'insurge le manifestant parisien.",
  },
  {
    character: "拓",
    meaningMnemonicFr: "La main 扌 qui brise la pierre 石: c'est DEFRICHER! Comme les pionniers qui ont construit les routes de montagne dans les Alpes, taillant la roche pour ouvrir de nouveaux chemins.",
    readingMnemonicFr: "TAKU sonne comme 'tac' - 'Tac! On defriche!' crie le bucheron vosgien a chaque coup.",
  },
  {
    character: "拘",
    meaningMnemonicFr: "La main 扌 qui tient une phrase 句: c'est RETENIR! Comme la police qui arrete un suspect, ou un douanier de Roissy qui retient un voyageur pour verification.",
    readingMnemonicFr: "KOU sonne comme 'coup' - 'D'un seul coup, je te retiens!' dit le gendarme a l'arret.",
  },
  {
    character: "隔",
    meaningMnemonicFr: "La colline 阝 avec un ancien vase 鬲: c'est SEPARER! Comme les Pyrenees qui separent la France de l'Espagne, ou la Manche qui isole la France de l'Angleterre.",
    readingMnemonicFr: "KAKU sonne comme 'caque' - 'La caque separe les harengs!' dit le poissonnier breton.",
  },
  {
    character: "伯",
    meaningMnemonicFr: "Une personne 亻 de rang eleve, blanche 白 de noblesse: le COMTE! Pensez au Comte de Monte-Cristo d'Alexandre Dumas, ce noble mysterieux qui revient se venger avec elegance.",
    readingMnemonicFr: "HAKU sonne comme 'ac' - 'Le comte habite au chateau, ac!' dit le paysan du Perigord.",
  },
  {
    character: "涯",
    meaningMnemonicFr: "L'eau 氵 rencontre le bord de la falaise 厓: c'est la LIMITE! Comme les falaises d'Etretat ou l'horizon marin marque la fin du monde visible, l'infini bleu de la Manche.",
    readingMnemonicFr: "GAI sonne comme 'gai' - 'Gai, la limite est si belle!' dit le peintre devant l'horizon.",
  },
  {
    character: "盲",
    meaningMnemonicFr: "L'oeil 目 qui disparait, s'en va 亡: c'est AVEUGLE! Comme Louis Braille, ce Francais qui inventa l'ecriture pour aveugles, transformant son handicap en don pour l'humanite.",
    readingMnemonicFr: "MOU sonne comme 'mou' - 'L'aveugle avance a pas mous!' observe le passant compatissant.",
  },
  {
    character: "紋",
    meaningMnemonicFr: "Le fil 糸 tisse un texte 文 decoratif: c'est l'EMBLEME! Comme la fleur de lys des rois de France, brodee sur les tapisseries royales, symbole de la monarchie francaise.",
    readingMnemonicFr: "MON sonne comme 'mon' - 'Mon embleme familial!' dit le duc en montrant ses armoiries.",
  },
  {
    character: "浦",
    meaningMnemonicFr: "L'eau 氵 s'etend sur un terrain plat 甫: c'est la BAIE! Comme la baie du Mont-Saint-Michel, cette merveille ou la mer se retire sur des kilometres a chaque maree.",
    readingMnemonicFr: "HO sonne comme 'eau' - 'Oh, l'eau de la baie!' s'emerveille le touriste normand.",
  },
  {
    character: "喚",
    meaningMnemonicFr: "La bouche 口 qui echange 奐 des sons forts: c'est APPELER! Comme les marchands des Halles de Lyon qui crient leurs produits frais, ou un berger pyreneeen appelant son troupeau.",
    readingMnemonicFr: "KAN sonne comme 'quand' - 'Quand on appelle, on crie fort!' dit le crieur du marche.",
  },
  {
    character: "陥",
    meaningMnemonicFr: "La colline 阝 creusee en manque 臽: c'est un PIEGE! Comme les tranchees de Verdun ou tant de soldats sont tombes, ou les oubliettes des chateaux medievaux.",
    readingMnemonicFr: "KAN sonne comme 'camp' - 'Le camp ennemi est un piege!' previent le general en 1914.",
  },
  {
    character: "凝",
    meaningMnemonicFr: "La glace 冫 saisit le doute 疑: ca SE FIGE! Comme le champagne qui se cristallise en cave, ou la gelee de Cointreau qui prend forme dans le refrigerateur du chef.",
    readingMnemonicFr: "GYOU sonne comme 'giouh' - 'Gyou! Ca se fige!' s'etonne le patissier devant sa gelee.",
  },
  {
    character: "暁",
    meaningMnemonicFr: "Le soleil 日 qui s'eleve haut 尭: c'est l'AUBE! Comme les premieres lueurs sur les toits de Paris, quand Montmartre s'eveille doucement et que les boulangers enfournent les croissants.",
    readingMnemonicFr: "GYOU sonne comme 'joyeux' - 'Joyeux lever du jour!' chante le coq gaulois a l'aube.",
  },
  {
    character: "幻",
    meaningMnemonicFr: "Un signe prive, cache aux yeux: c'est l'ILLUSION! Comme les mirages dans le desert du Petit Prince de Saint-Exupery, ou les tours de magie d'un prestidigitateur parisien.",
    readingMnemonicFr: "GEN sonne comme 'gaine' - 'La gaine de l'illusion!' dit le magicien en faisant disparaitre le lapin.",
  },
  {
    character: "丸",
    meaningMnemonicFr: "Le chiffre neuf avec un point central forme quelque chose de ROND! Comme les boules de petanque marseillaises, ces spheres parfaites qui roulent vers le cochonnet sur la place du village.",
    readingMnemonicFr: "MARU sonne comme 'ma roue' - 'Ma roue est bien ronde!' dit le cycliste du Tour de France.",
  },
  {
    character: "角",
    meaningMnemonicFr: "Une corne avec des angles nets: c'est l'ANGLE! Comme les angles droits de la Tour Eiffel, cette geometrie parfaite de metal qui defie le ciel de Paris depuis 1889.",
    readingMnemonicFr: "KAKU sonne comme 'caque' - 'Chaque angle compte!' dit l'architecte devant ses plans.",
  },
  {
    character: "点",
    meaningMnemonicFr: "Le devin 占 marque un feu 灬 precis: c'est le POINT! Comme le point final d'un roman de Flaubert, ou le point de suture d'un chirurgien de l'Hopital de la Pitie-Salpetriere.",
    readingMnemonicFr: "TEN sonne comme 'temps' - 'Un point dans le temps!' dit le philosophe francais.",
  },
  {
    character: "麺",
    meaningMnemonicFr: "Le ble 麦 travaille face 面 au cuisinier: ce sont les NOUILLES! Comme les pates fraiches faites maison par une grand-mere lyonnaise, ou les nouilles d'un restaurant asiatique du 13eme.",
    readingMnemonicFr: "MEN sonne comme 'men' - 'Les men-uilles sont delicieuses!' dit le gourmet au restaurant.",
  },
  {
    character: "囁",
    meaningMnemonicFr: "La bouche 口 entouree d'oreilles attentives: c'est CHUCHOTER! Comme les secrets murmures dans les couloirs de Versailles, les intrigues de cour a l'oreille du roi.",
    readingMnemonicFr: "SASAYAKU sonne comme 'sa sa' - 'Ssa, ssa...' fait-on en chuchotant des secrets a la cour.",
  },
  {
    character: "栓",
    meaningMnemonicFr: "L'arbre 木 entier 全 bouche l'ouverture: c'est le BOUCHON! Comme les bouchons de liege du Roussillon qui ferment les meilleures bouteilles de vin de Bordeaux et de Bourgogne.",
    readingMnemonicFr: "SEN sonne comme 'scène' - 'La scene du debouchage!' dit le sommelier en faisant sauter le bouchon.",
  },
  {
    character: "釘",
    meaningMnemonicFr: "Le metal 金 en forme de T 丁: c'est le CLOU! Comme les clous forges a l'ancienne par un marechal-ferrant auvergnat, ou ceux qui assemblent les charpentes des cathedrales.",
    readingMnemonicFr: "TEI sonne comme 'te' - 'Te voila plante, petit clou!' dit le menuisier en frappant.",
  },
  {
    character: "詫",
    meaningMnemonicFr: "Les mots 言 prononces dans son domicile 宅: c'est S'EXCUSER! Comme un Francais qui presente ses excuses formelles, avec toute la politesse et l'elegance de l'art de vivre a la francaise.",
    readingMnemonicFr: "WABI sonne comme 'oui, bise' - 'Oui, une bise pour s'excuser!' dit-on en faisant la paix.",
  },
  {
    character: "喉",
    meaningMnemonicFr: "La bouche 口 du noble seigneur 侯 a une GORGE profonde! Comme la gorge d'un chanteur d'opera a l'Opera Garnier, ou celle d'un crieur de vins au marche de Beaune.",
    readingMnemonicFr: "KOU sonne comme 'cou' - 'Le cou et la gorge ne font qu'un!' chante le tenor parisien.",
  },
  {
    character: "鰻",
    meaningMnemonicFr: "Le poisson 魚 long et sinueux 曼: c'est l'ANGUILLE! Comme les anguilles du Marais Poitevin, ces serpents d'eau douce que l'on peche dans les canaux verdoyants.",
    readingMnemonicFr: "UNAGI sonne comme 'ou nage' - 'Ou nage l'anguille?' demande le pecheur vendeen.",
  },
  {
    character: "旋",
    meaningMnemonicFr: "Le drapeau 方 avec les pieds 疋 qui dansent: ca TOURNE! Comme les derviches tourneurs, ou la grande roue de la place de la Concorde qui tourne majestueusement a Noel.",
    readingMnemonicFr: "SEN sonne comme 'sens' - 'Dans quel sens ca tourne?' demande l'enfant emerveille.",
  },
  {
    character: "濯",
    meaningMnemonicFr: "L'eau 氵 qui nettoie comme un oiseau 翟 se baigne: c'est RINCER! Comme les lavandieres d'antan qui rincaient le linge dans les rivieres de Provence, battant les draps au soleil.",
    readingMnemonicFr: "TAKU sonne comme 'tac' - 'Tac, tac, on rince!' fait la lavandiere au bord de l'eau.",
  },
  {
    character: "慕",
    meaningMnemonicFr: "Le soir 莫 tombe et le coeur 心 pense a l'etre aime: c'est ADMIRER! Comme Cyrano admirant Roxane de loin, ou un poete romantique contemplant sa muse au clair de lune.",
    readingMnemonicFr: "BO sonne comme 'beau' - 'Si beau que je l'admire!' soupire l'amoureux transi.",
  },
  {
    character: "竈",
    meaningMnemonicFr: "Le trou 穴 dans la terre 土 avec le feu pour cuire: c'est le FOURNEAU! Comme les vieilles cuisinieres en fonte des fermes bretonnes, ou le four a bois d'un boulanger traditionnel.",
    readingMnemonicFr: "KAMADO sonne comme 'camarade' - 'Camarade, le fourneau est pret!' dit le boulanger a son apprenti.",
  },
  {
    character: "琳",
    meaningMnemonicFr: "Le roi 王 dans la foret 林 trouve un tresor: c'est un BIJOU! Comme les joyaux de la Couronne de France au Louvre, ces pierres precieuses qui brillent sous les lumieres du musee.",
    readingMnemonicFr: "RIN sonne comme 'reine' - 'Un bijou digne d'une reine!' s'exclame le joaillier de la place Vendome.",
  },
  {
    character: "炸",
    meaningMnemonicFr: "Le feu 火 d'hier 乍 qui revient: ca ECLATE! Comme les feux d'artifice du 14 juillet au-dessus de la Tour Eiffel, ces explosions de couleurs qui illuminent le ciel de Paris.",
    readingMnemonicFr: "SAKU sonne comme 'sac' - 'Sac a surprises qui eclate!' crie l'enfant devant les feux d'artifice.",
  },
  {
    character: "徐",
    meaningMnemonicFr: "Marcher 彳 avec le reste 余 du temps: c'est LENTEMENT! Comme une promenade dominicale le long de la Seine, ou les pas mesures d'un vigneron inspectant ses vignes en Bourgogne.",
    readingMnemonicFr: "JO sonne comme 'joli' - 'Joli, ce pas lent et elegant!' admire le flâneur parisien.",
  },
  {
    character: "搭",
    meaningMnemonicFr: "La main 扌 qui aide a monter sur la tour 荅: c'est EMBARQUER! Comme monter a bord du ferry a Calais pour traverser la Manche, ou embarquer sur un bateau-mouche a Paris.",
    readingMnemonicFr: "TOU sonne comme 'tout' - 'Tout le monde embarque!' crie le capitaine du bateau.",
  },
  {
    character: "殊",
    meaningMnemonicFr: "La mort 歹 teinte de vermillon 朱: c'est SPECIAL! Comme les cas particuliers juges par la Cour de Cassation, ou les editions speciales de grands crus exceptionnels.",
    readingMnemonicFr: "SHU sonne comme 'chou' - 'C'est mon chou-chou special!' dit la grand-mere a son petit-fils prefere.",
  },
  {
    character: "絞",
    meaningMnemonicFr: "Le fil 糸 qui croise 交 et s'entortille: c'est TORDRE! Comme essorer le linge a la main, ou tordre la pate a brioche dans une boulangerie parisienne.",
    readingMnemonicFr: "KOU sonne comme 'coup' - 'Un bon coup de torsion!' dit la boulangere en formant la brioche.",
  },
  {
    character: "胆",
    meaningMnemonicFr: "La chair 月 qui se leve chaque jour 旦: c'est le COURAGE! Comme l'audace des resistants francais pendant la guerre, ou le cran des pompiers de Paris face aux flammes.",
    readingMnemonicFr: "TAN sonne comme 'tant' - 'Tant de courage!' admire-t-on devant l'exploit heroique.",
  },
  {
    character: "芳",
    meaningMnemonicFr: "L'herbe 艹 de cette direction 方: c'est PARFUME! Comme les champs de lavande de Provence, cette mer violette qui embaume l'air du Luberon en ete.",
    readingMnemonicFr: "HOU sonne comme 'ou' - 'Ou ce parfum si doux?' demande le touriste en Provence.",
  },
  {
    character: "逮",
    meaningMnemonicFr: "Marcher 辶 pour attraper quelqu'un 隶: c'est ARRETER! Comme la police nationale qui procede a une arrestation, ou un gendarme qui interpelle un suspect sur l'autoroute.",
    readingMnemonicFr: "TAI sonne comme 'taie' - 'Dans la taie, on t'arrete!' dit le policier en passant les menottes.",
  },
  {
    character: "附",
    meaningMnemonicFr: "La colline 阝 ou l'on attache 付 quelque chose: c'est JOINDRE! Comme une piece jointe a un courrier officiel, ou un document annexe a un dossier administratif francais.",
    readingMnemonicFr: "FU sonne comme 'fou' - 'Fou ce que j'ai joint!' dit l'employe en ajoutant les papiers.",
  },
  {
    character: "俊",
    meaningMnemonicFr: "La personne 亻 qui surpasse 夋 les autres: c'est le TALENT! Comme Mozart enfant prodige, ou un jeune chef francais qui decroche ses etoiles Michelin avant trente ans.",
    readingMnemonicFr: "SHUN sonne comme 'chun' - 'Chun talent incroyable!' s'exclame le jury du concours.",
  },
  {
    character: "偏",
    meaningMnemonicFr: "La personne 亻 avec une vue plate 扁: c'est PARTIAL! Comme un arbitre accuse de favoritisme, ou un juge qui penche d'un cote dans un proces controverse.",
    readingMnemonicFr: "HEN sonne comme 'haine' - 'La haine rend partial!' avertit le sage philosophe.",
  },
  {
    character: "傍",
    meaningMnemonicFr: "La personne 亻 dans le pays 旁 voisin: c'est A COTE! Comme la maison d'a cote dans un village francais, ou le cafe du coin a deux pas de chez soi.",
    readingMnemonicFr: "BOU sonne comme 'boue' - 'Dans la boue, juste a cote!' indique le paysan montrant le champ voisin.",
  },

  // ========== Level 48 ==========
  {
    character: "半",
    meaningMnemonicFr: "Le boeuf 牛 coupe en deux parties: c'est la MOITIE! Comme une baguette coupee en deux pour un sandwich jambon-beurre, ou le partage equitable d'une tarte aux pommes.",
    readingMnemonicFr: "HAN sonne comme 'Han' - 'Han! Juste la moitie!' dit l'enfant en coupant le gateau.",
  },
  {
    character: "稚",
    meaningMnemonicFr: "Le grain 禾 et l'oiseau 隹 encore petit: c'est JEUNE! Comme un poussin qui vient d'eclore dans une ferme du Gers, ou un jeune plant de vigne dans un vignoble bordelais.",
    readingMnemonicFr: "CHI sonne comme 'chi' - 'Chi-c, ce jeune talent!' dit le vigneron devant sa jeune vigne.",
  },
  {
    character: "粋",
    meaningMnemonicFr: "Le riz 米 pur comme un soldat 卒: c'est l'ELEGANCE! Comme le chic parisien, cette elegance naturelle qui fait la reputation mondiale de la mode francaise.",
    readingMnemonicFr: "SUI sonne comme 'oui' - 'Sui-vre l'elegance, oui!' dit le styliste de la Fashion Week.",
  },
  {
    character: "酢",
    meaningMnemonicFr: "L'alcool 酉 qui fermente et tourne 乍: c'est le VINAIGRE! Comme le vinaigre de vin de la maison Maille a Dijon, ou le vinaigre balsamique d'une vinaigrette raffinee.",
    readingMnemonicFr: "SAKU sonne comme 'sac' - 'Un sac de vinaigre!' plaisante le chef en assaisonnant la salade.",
  },
  {
    character: "縄",
    meaningMnemonicFr: "Le fil 糸 tresse comme une mouche 蝿 tourne: c'est la CORDE! Comme les cordes des clochers de village, ou les amarres des bateaux de peche a Saint-Malo.",
    readingMnemonicFr: "JOU sonne comme 'joue' - 'La joue contre la corde!' dit le marin en tirant l'amarre.",
  },
  {
    character: "繰",
    meaningMnemonicFr: "Le fil 糸 qui passe par l'arbre 喿 encore et encore: c'est DEVIDER! Comme le metier a tisser des Canuts de Lyon, qui repetaient inlassablement les memes gestes.",
    readingMnemonicFr: "SOU sonne comme 'sous' - 'Sous le fil qui se devide!' observe le tisserand lyonnais.",
  },
  {
    character: "埋",
    meaningMnemonicFr: "La terre 土 recouvre le village 里: c'est ENTERRER! Comme les tresors enfouis par les pirates sur les cotes bretonnes, ou les capsules temporelles qu'on enterre pour l'avenir.",
    readingMnemonicFr: "MAI sonne comme 'mais' - 'Mais ou l'a-t-on enterre?' demande le chercheur de tresor.",
  },
  {
    character: "撤",
    meaningMnemonicFr: "La main 扌 qui traverse 徹: c'est RETIRER! Comme le retrait des troupes apres une bataille, ou l'evacuation ordonnee d'un batiment en cas d'incendie.",
    readingMnemonicFr: "TETSU sonne comme 'tetu' - 'Tetu, mais on se retire!' ordonne le general en retraite.",
  },
  {
    character: "酎",
    meaningMnemonicFr: "L'alcool 酉 mesure au pouce 寸: c'est le SAKE! Comme le sake servi dans les restaurants japonais de Paris, ou l'alcool de riz delicat qui accompagne les sushis.",
    readingMnemonicFr: "CHUU sonne comme 'chou' - 'Chou-ette, du sake!' dit le Parisien au restaurant japonais.",
  },
  {
    character: "克",
    meaningMnemonicFr: "Dix 十 efforts avec les bras 儿: c'est SURMONTER! Comme les obstacles surmontes par les athletes francais aux JO, ou les defis releves par les entrepreneurs.",
    readingMnemonicFr: "KOKU sonne comme 'coque' - 'Coque dure a surmonter!' dit le sportif face au defi.",
  },
  {
    character: "呪",
    meaningMnemonicFr: "La bouche 口 du frere aine 兄 qui maudit: c'est la MALEDICTION! Comme les sorts des sorcieres dans les contes de Perrault, ou les maledictions des vieux chateaux hantes.",
    readingMnemonicFr: "JU sonne comme 'joue' - 'Joue pas avec les maledictions!' avertit la vieille du village.",
  },
  {
    character: "猿",
    meaningMnemonicFr: "Le chien 犭 dans un parc 袁: c'est le SINGE! Comme les singes du zoo de Vincennes, ces primates farceurs qui amusent les enfants parisiens en visite.",
    readingMnemonicFr: "EN sonne comme 'hein' - 'Hein, regarde le singe!' crie l'enfant au zoo.",
  },
  {
    character: "瞳",
    meaningMnemonicFr: "L'oeil 目 de l'enfant 童 qui regarde: c'est la PUPILLE! Comme les yeux ecarquilles d'un enfant devant les vitrines de Noel aux Galeries Lafayette.",
    readingMnemonicFr: "DOU sonne comme 'doux' - 'Doux regard de cette pupille!' admire la maman emue.",
  },
  {
    character: "碁",
    meaningMnemonicFr: "La pierre 石 sur la base 其 du plateau: c'est le GO! Ce jeu de strategie asiatique joue dans les cafes parisiens, ou deux adversaires s'affrontent en silence.",
    readingMnemonicFr: "GO sonne exactement comme 'go' - 'Go, a toi de jouer!' dit le maitre de go a son eleve.",
  },
  {
    character: "塀",
    meaningMnemonicFr: "La terre 土 qui s'aligne 并: c'est le MUR! Comme les murs de pierre seche des campagnes provencales, ou les clotures des jardins parisiens.",
    readingMnemonicFr: "HEI sonne comme 'hey' - 'Hey, quel beau mur!' admire le promeneur.",
  },
  {
    character: "墜",
    meaningMnemonicFr: "La terre 土 attire l'equipe 隊 vers le bas: c'est TOMBER! Comme la chute des feuilles en automne dans les forets de Fontainebleau, ou un avion qui descend en pique.",
    readingMnemonicFr: "TSUI sonne comme 'tu y' - 'Tu y tombes pas!' previent l'ami au bord de la falaise.",
  },
  {
    character: "憩",
    meaningMnemonicFr: "Soi 自 avec le coeur 心 qui respire 息: c'est le REPOS! Comme une pause cafe a la terrasse d'un bistrot parisien, ou une sieste sous un platane provencal.",
    readingMnemonicFr: "KEI sonne comme 'quai' - 'Sur le quai, je me repose!' dit le promeneur au bord du canal.",
  },
  {
    character: "貼",
    meaningMnemonicFr: "Le coquillage 貝 avec le devin 占: c'est COLLER! Comme coller un timbre sur une lettre a La Poste, ou afficher des posters dans sa chambre d'etudiant.",
    readingMnemonicFr: "HARU sonne comme 'ah rue' - 'Ah, rue affichee partout!' dit-on devant les affiches collees.",
  },
  {
    character: "闇",
    meaningMnemonicFr: "La porte 門 cache le son 音: c'est l'OBSCURITE! Comme les catacombes de Paris, ces tunnels sombres ou le silence regne sous la ville lumiere.",
    readingMnemonicFr: "YAMI sonne comme 'y a mis' - 'Y a mis l'obscurite partout!' murmure le visiteur des catacombes.",
  },
  {
    character: "尽",
    meaningMnemonicFr: "Le plateau vide avec juste un point: c'est EPUISER! Comme un marathonien a bout de forces sur les Champs-Elysees, ou une bouteille de vin videe entre amis.",
    readingMnemonicFr: "JIN sonne comme 'djinn' - 'Le djinn a tout epuise!' raconte le conteur.",
  },
  {
    character: "麻",
    meaningMnemonicFr: "Sous le toit 广, des plantes 木 en abondance: c'est le CHANVRE! Comme les cordages en chanvre des navires bretons, ou les vetements en lin naturel de Normandie.",
    readingMnemonicFr: "MA sonne comme 'ma' - 'Ma culture de chanvre!' dit le paysan ecolo.",
  },
  {
    character: "咲",
    meaningMnemonicFr: "La bouche 口 qui s'epanouit en sourire 关: c'est FLEURIR! Comme les cerisiers en fleurs du Jardin des Plantes, ou les roses du parc de Bagatelle au printemps.",
    readingMnemonicFr: "SAKU sonne comme 'sac' - 'Sac a fleurs qui s'ouvre!' dit le jardinier emerveille.",
  },
  {
    character: "培",
    meaningMnemonicFr: "La terre 土 qui nourrit ce qui pousse 倍: c'est CULTIVER! Comme les maraichers de l'Ile-de-France qui cultivent leurs legumes, ou un viticulteur soignant ses vignes.",
    readingMnemonicFr: "BAI sonne comme 'baie' - 'Des baies a cultiver!' planifie le jardinier.",
  },
  {
    character: "脇",
    meaningMnemonicFr: "La chair 月 avec trois forces 劦: c'est le COTE, l'AISSELLE! Comme les aisselles qu'on parfume avec du deodorant francais, ou le cote discret d'une scene de theatre.",
    readingMnemonicFr: "WAKI sonne comme 'ouaqui' - 'Ouaqui, sur le cote!' indique le metteur en scene au comedien.",
  },
  {
    character: "鶴",
    meaningMnemonicFr: "L'oiseau 鳥 au cri percant 隺: c'est la GRUE! Comme les grues cendrées qui migrent au-dessus de la Champagne, ces grands oiseaux elegants aux longues pattes.",
    readingMnemonicFr: "KAKU sonne comme 'caque' - 'Caque, caque!' fait la grue en s'envolant.",
  },
  {
    character: "剛",
    meaningMnemonicFr: "La montagne 岡 avec le couteau 刂: c'est ROBUSTE! Comme la solidite des chenes centenaires de la foret de Troncais, ou la robustesse des murs medievaux.",
    readingMnemonicFr: "GOU sonne comme 'gout' - 'Gout robuste!' dit le sommelier du vin puissant.",
  },

  // ========== Level 49 ==========
  {
    character: "域",
    meaningMnemonicFr: "La terre 土 avec des frontieres 或: c'est le DOMAINE! Comme le domaine viticole d'un chateau bordelais, ou le territoire d'un seigneur medieval.",
    readingMnemonicFr: "IKI sonne comme 'ici' - 'Ici c'est mon domaine!' declare le proprietaire du chateau.",
  },
  {
    character: "爪",
    meaningMnemonicFr: "La griffe qui descend et s'accroche: c'est l'ONGLE! Comme les ongles parfaits d'une manucure parisienne, ou les griffes d'un chat qui chasse dans la campagne.",
    readingMnemonicFr: "TSUME sonne comme 'tu me' - 'Tu me griffes avec tes ongles!' proteste le chat.",
  },
  {
    character: "堀",
    meaningMnemonicFr: "La terre 土 creusee en profondeur 屈: c'est le FOSSE! Comme les douves des chateaux de la Loire, ces fosses remplis d'eau qui protegeaient les forteresses.",
    readingMnemonicFr: "HORI sonne comme 'horreur' - 'Horreur, il tombe dans le fosse!' crie la princesse.",
  },
  {
    character: "蜂",
    meaningMnemonicFr: "L'insecte 虫 qui se multiplie abondamment 夆: c'est l'ABEILLE! Comme les abeilles des ruches de Provence qui butinent la lavande pour faire du miel dore.",
    readingMnemonicFr: "HOU sonne comme 'où' - 'Ou va cette abeille?' demande l'apiculteur curieux.",
  },
  {
    character: "懲",
    meaningMnemonicFr: "Le signe 徴 grave dans le coeur 心: c'est PUNIR! Comme les punitions a l'ecole d'antan, ou les sanctions du code penal francais contre les delits.",
    readingMnemonicFr: "CHOU sonne comme 'chou' - 'Chou-ette, pas de punition!' espere l'eleve turbulent.",
  },
  {
    character: "瞭",
    meaningMnemonicFr: "L'oeil 目 qui brille de clarte 尞: c'est CLAIR! Comme une explication limpide d'un professeur de la Sorbonne, ou l'evidence d'un raisonnement cartesien.",
    readingMnemonicFr: "RYOU sonne comme 'rio' - 'Rio, c'est clair comme l'eau!' dit l'etudiant qui comprend.",
  },
];

async function main() {
  console.log("Starting mnemonic improvements for levels 47-50 (batch 10)...\n");

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
