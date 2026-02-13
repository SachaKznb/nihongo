import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const improvedMnemonics: {
  character: string;
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
}[] = [
  // Level 46
  {
    character: "白",
    meaningMnemonicFr: "Le soleil 日 au-dessus brille d'une lumiere pure comme les murs BLANCS des chateaux de la Loire. Cette blancheur eclatante evoque les nappes immaculees des grands restaurants parisiens.",
    readingMnemonicFr: "HAKU/SHIRO - 'Ah qu'il' est blanc! Shiro comme le chateau (shiro) tout blanc.",
  },
  {
    character: "黒",
    meaningMnemonicFr: "La terre 土 brulee par le feu 灬 devient NOIRE comme le charbon des mines du Nord. Cette noirceur profonde rappelle les robes noires des juges au Palais de Justice.",
    readingMnemonicFr: "KOKU/KURO - 'Cocu' de noir! Kuro comme le cafe noir (kuro) sans sucre.",
  },
  {
    character: "波",
    meaningMnemonicFr: "L'eau 氵 qui ondule comme la peau 皮 forme des VAGUES majestueuses. Les vagues de Biarritz deferlent sur la cote basque, attirant les surfeurs du monde entier.",
    readingMnemonicFr: "HA/NAMI - 'Ha!' quelle vague! Nami comme les vagues de Hokusai.",
  },
  {
    character: "条",
    meaningMnemonicFr: "Le bois 木 frappe 攵 pour creer des ARTICLES de loi. Comme les articles du Code Napoleon, chaque condition est gravee dans le marbre juridique francais.",
    readingMnemonicFr: "JOU - 'Joue' avec les articles - chaque clause est une note de musique legale.",
  },
  {
    character: "訴",
    meaningMnemonicFr: "Les mots 言 qui s'arretent 斥 pour ACCUSER quelqu'un devant la justice. L'avocat de Versailles plaide avec passion pour defendre l'accuse innocent.",
    readingMnemonicFr: "SO/UTTAERU - 'Sot' qui accuse! Uttaeru comme un plaidoyer enflamme.",
  },
  {
    character: "隠",
    meaningMnemonicFr: "La colline 阝 abrite un coeur 㥯 qui SE CACHE des regards. Comme les passages secrets de Marie-Antoinette a Versailles, certains mysteres restent dissimules.",
    readingMnemonicFr: "IN/KAKUSU - 'Hein' ou est-il cache? Kakusu comme un tresor enfoui.",
  },
  {
    character: "屈",
    meaningMnemonicFr: "Le corps 尸 qui sort 出 doit SE PLIER pour passer. Comme les courtisans qui s'inclinent devant Louis XIV, on plie l'echine par respect ou par soumission.",
    readingMnemonicFr: "KUTSU/KAGAMU - 'Coute' de se plier! Kagamu comme une reverence profonde.",
  },
  {
    character: "濃",
    meaningMnemonicFr: "L'eau 氵 de l'agriculture 農 devient EPAISSE et concentree. Comme une sauce bearnaise reduite avec soin, la saveur s'intensifie et devient plus dense.",
    readingMnemonicFr: "NOU/KOI - 'Nous' aimons epais! Koi comme un cafe bien serre.",
  },
  {
    character: "微",
    meaningMnemonicFr: "Le chemin 彳 avec la montagne 山 et l'attaque 攵 montre quelque chose de MINUSCULE. Comme les miniatures de Marie de Medicis, le detail infime revele la grandeur.",
    readingMnemonicFr: "BI/KASUKA - 'Bi' tout petit! Kasuka comme un murmure a peine audible.",
  },
  {
    character: "添",
    meaningMnemonicFr: "L'eau 氵 avec le ciel 天 et le coeur 心 AJOUTE une touche delicate. Le chef etoile de Lyon ajoute une larme de truffe pour sublimer son plat signature.",
    readingMnemonicFr: "TEN/SOERU - 'Tiens' j'ajoute! Soeru comme garnir avec elegance.",
  },
  {
    character: "購",
    meaningMnemonicFr: "La structure 冓 avec la richesse 貝 permet d'ACHETER ce qu'on desire. Aux Galeries Lafayette, les touristes achetent les plus belles creations parisiennes.",
    readingMnemonicFr: "KOU - 'Cout' d'achat - chaque acquisition a son prix!",
  },
  {
    character: "臓",
    meaningMnemonicFr: "La chair 月 qui cache 臧 les secrets vitaux est un ORGANE INTERNE. Les chirurgiens de l'Hotel-Dieu operaient deja ces organes au Moyen Age.",
    readingMnemonicFr: "ZOU - 'Zoo' des organes - chaque viscere a sa fonction vitale!",
  },
  {
    character: "縦",
    meaningMnemonicFr: "Le fil 糸 qui suit 従 une direction forme une ligne VERTICALE. La Tour Eiffel s'eleve verticalement vers le ciel parisien, defiant les lois de la pesanteur.",
    readingMnemonicFr: "JUU/TATE - 'Jus' qui coule vertical! Tate comme une colonne droite.",
  },
  {
    character: "腐",
    meaningMnemonicFr: "La maison 府 avec la chair 肉 qui POURRIT lentement. Le fromage affine de Roquefort transforme la pourriture noble en delice gastronomique francais.",
    readingMnemonicFr: "FU/KUSARU - 'Fou' de pourri! Kusaru comme un fruit bletti.",
  },
  {
    character: "彫",
    meaningMnemonicFr: "La forme 周 avec les lignes 彡 permet de SCULPTER. Rodin sculptait ses oeuvres dans son atelier de Meudon, donnant vie au marbre froid.",
    readingMnemonicFr: "CHOU/HORU - 'Chou' sculpte! Horu comme ciseler le bois precieux.",
  },
  {
    character: "亀",
    meaningMnemonicFr: "Cette creature ancienne avec sa carapace est la TORTUE sage. Dans les jardins du Luxembourg, les tortues se prelassent pres du bassin aux enfants.",
    readingMnemonicFr: "KI/KAME - 'Qui' est cette tortue? Kame comme la carapace de sagesse.",
  },
  {
    character: "盟",
    meaningMnemonicFr: "Le clair 明 sur le plat 皿 scelle une ALLIANCE sacree. Comme l'alliance franco-prussienne de Tilsit, les traites se signent sur des plats d'argent.",
    readingMnemonicFr: "MEI - 'Met' l'alliance - un pacte solennel entre nations!",
  },
  {
    character: "継",
    meaningMnemonicFr: "Le fil 糸 qui continue la lignee permet d'HERITER. Les dynasties des Bourbon heritaient du trone, perpetuant la lignee royale de France.",
    readingMnemonicFr: "KEI/TSUGU - 'Quai' de succession! Tsugu comme passer le flambeau.",
  },
  {
    character: "抵",
    meaningMnemonicFr: "La main 扌 qui pousse vers le bas 氐 pour RESISTER. Les maquisards du Vercors resistaient heroiquement aux envahisseurs pendant la guerre.",
    readingMnemonicFr: "TEI - 'T'es' resistant! La resistance comme art de survie.",
  },
  {
    character: "齢",
    meaningMnemonicFr: "Les dents 歯 avec l'ordre 令 revelent l'AGE veritable. Comme les cernes des arbres de Fontainebleau, chaque annee laisse sa marque indelebile.",
    readingMnemonicFr: "REI - 'Reine' de son age! Chaque annee compte dans la sagesse.",
  },
  {
    character: "避",
    meaningMnemonicFr: "Marcher 辶 avec le roi 辟 permet d'EVITER le danger. Les aristocrates fuyaient Versailles pour eviter la guillotine revolutionnaire.",
    readingMnemonicFr: "HI/SAKERU - 'Hi' j'evite! Sakeru comme esquiver avec elegance.",
  },
  {
    character: "緒",
    meaningMnemonicFr: "Le fil 糸 de l'auteur 者 marque le DEBUT de l'histoire. Le premier chapitre d'un roman de Balzac debute toujours par une description minutieuse.",
    readingMnemonicFr: "SHO/O - 'Chaud' au debut! O comme le commencement de l'aventure.",
  },
  {
    character: "託",
    meaningMnemonicFr: "Les paroles 言 qui liberent 乇 CONFIENT une mission sacree. On confie ses secrets a l'abbe de la paroisse, gardien des ames du village.",
    readingMnemonicFr: "TAKU - 'Ta queue' je confie! Confier avec solennite et confiance.",
  },
  {
    character: "邦",
    meaningMnemonicFr: "Le riche 丰 avec la ville 阝 forme un PAYS prospere. La France, pays des droits de l'homme, rayonne sur le monde depuis des siecles.",
    readingMnemonicFr: "HOU/KUNI - 'Houx' du pays! Kuni comme la patrie bien-aimee.",
  },
  {
    character: "鋼",
    meaningMnemonicFr: "Le metal 金 du filet 岡 forme l'ACIER trempe. Les forges de Saint-Etienne produisaient l'acier le plus resistant de tout le royaume.",
    readingMnemonicFr: "KOU/HAGANE - 'Coup' d'acier! Hagane comme la lame indestructible.",
  },
  {
    character: "駆",
    meaningMnemonicFr: "Le cheval 馬 qui s'ecarte 区 GALOPE vers l'horizon. Les cavaliers de Saumur galopent avec elegance dans le manege de l'Ecole de Cavalerie.",
    readingMnemonicFr: "KU/KAKERU - 'Cul' sur le cheval qui galope! Kakeru comme filer au vent.",
  },
  {
    character: "携",
    meaningMnemonicFr: "La main 扌 avec l'oiseau 隹 PORTE un message precieux. Les messagers royaux portaient les depeches urgentes a travers tout le royaume.",
    readingMnemonicFr: "KEI/TAZUSAERU - 'Quai' je porte! Tazusaeru comme emporter avec soi.",
  },
  {
    character: "獲",
    meaningMnemonicFr: "Le chien 犬 qui protege 蒦 CAPTURE le gibier. Les veneurs de Chambord capturaient cerfs et sangliers pour la table royale.",
    readingMnemonicFr: "KAKU/ERU - 'Ca cul' capture! Eru comme attraper sa proie.",
  },
  {
    character: "薄",
    meaningMnemonicFr: "L'herbe 艹 sur le plat 溥 est MINCE et delicate. Les crepes bretonnes sont si fines qu'on voit le jour a travers leur texture legere.",
    readingMnemonicFr: "HAKU/USUI - 'Ah qu'il' est mince! Usui comme une feuille de papier.",
  },
  {
    character: "潜",
    meaningMnemonicFr: "L'eau 氵 qui remplace 替 permet de PLONGER en profondeur. Les plongeurs de la Cote d'Azur explorent les epaves de la Mediterranee.",
    readingMnemonicFr: "SEN/MOGURU - 'Seine' ou plonger! Moguru comme s'immerger dans l'eau.",
  },
  {
    character: "侵",
    meaningMnemonicFr: "La personne 亻 qui entre furtivement ENVAHIT le territoire. Les armees de Napoleon envahissaient l'Europe, conquerant royaumes et empires.",
    readingMnemonicFr: "SHIN/OKASU - 'Chien' qui envahit! Okasu comme violer les frontieres.",
  },
  {
    character: "紛",
    meaningMnemonicFr: "Le fil 糸 divise 分 cree la CONFUSION totale. Les fils emmeles d'un metier a tisser lyonnais semblent confus mais creent la soie.",
    readingMnemonicFr: "FUN/MAGIRERU - 'Fun' confus! Magireru comme se perdre dans le chaos.",
  },
  {
    character: "網",
    meaningMnemonicFr: "Le fil 糸 qui disparait 亡 dans l'enclos 冂 forme un FILET. Les pecheurs bretons lancent leurs filets dans les eaux tumultueuses de l'Atlantique.",
    readingMnemonicFr: "MOU/AMI - 'Mou' le filet! Ami comme le reseau de fils entrelaces.",
  },
  {
    character: "肝",
    meaningMnemonicFr: "La chair 月 avec le ciel 干 contient le FOIE vital. Le foie gras du Perigord, tresor gastronomique, sublime ce noble organe.",
    readingMnemonicFr: "KAN/KIMO - 'Quand' le foie! Kimo comme l'organe essentiel a la vie.",
  },
  {
    character: "琴",
    meaningMnemonicFr: "Le jade 王 qui resonne 今 est le KOTO melodieux. Les geishas jouaient du koto dans les salons feutres de l'ancien Japon.",
    readingMnemonicFr: "KIN/KOTO - 'Quin' de musique! Koto comme l'instrument aux cordes celestes.",
  },
  {
    character: "翼",
    meaningMnemonicFr: "Les plumes 羽 qui different 異 forment une AILE puissante. Les ailes de l'Airbus s'elevent de Toulouse vers les cieux infinis.",
    readingMnemonicFr: "YOKU/TSUBASA - 'Yoga' avec les ailes! Tsubasa comme s'envoler vers le ciel.",
  },
  {
    character: "叫",
    meaningMnemonicFr: "La bouche 口 qui ouvre grand 丩 laisse echapper un CRI perçant. Les cris de 'Vive la Revolution!' resonnaient dans les rues de Paris en 1789.",
    readingMnemonicFr: "KYOU/SAKEBU - 'Quoi!' je crie! Sakebu comme hurler de toutes ses forces.",
  },
  {
    character: "矛",
    meaningMnemonicFr: "Cette arme pointue est une LANCE de guerrier. Les lanciers de Napoleon chargeaient l'ennemi avec leurs lances brillantes au soleil d'Austerlitz.",
    readingMnemonicFr: "MU/HOKO - 'Mou' la lance! Hoko comme l'arme qui perce les armures.",
  },
  {
    character: "眺",
    meaningMnemonicFr: "L'oeil 目 qui saute 兆 vers l'horizon CONTEMPLE le paysage. Du haut de Montmartre, on contemple tout Paris etendu sous ses pieds.",
    readingMnemonicFr: "CHOU/NAGAMERU - 'Chou' la vue! Nagameru comme admirer le panorama.",
  },
  {
    character: "溝",
    meaningMnemonicFr: "L'eau 氵 qui construit 構 un chemin forme un FOSSE. Les fosses de Vauban protegeaient les citadelles des assauts ennemis.",
    readingMnemonicFr: "KOU/MIZO - 'Coup' dans le fosse! Mizo comme la tranchee qui defend.",
  },
  {
    character: "鈍",
    meaningMnemonicFr: "Le metal 金 qui s'echappe 屯 devient EMOUSSE et LENT. Une lame emoussee ne coupe plus, comme un esprit lent qui ne comprend pas.",
    readingMnemonicFr: "DON/NIBUI - 'Don' lent! Nibui comme une reaction au ralenti.",
  },
  {
    character: "棟",
    meaningMnemonicFr: "L'arbre 木 de l'est 東 forme la POUTRE maitresse. Les poutres de Notre-Dame soutenaient la charpente avant l'incendie devastateur.",
    readingMnemonicFr: "TOU/MUNE - 'Tout' la poutre! Mune comme l'ossature du batiment.",
  },
  {
    character: "吾",
    meaningMnemonicFr: "Le cinq 五 et la bouche 口 expriment le JE profond. 'Je pense donc je suis' disait Descartes, affirmant son existence par la pensee.",
    readingMnemonicFr: "GO/WARE - 'Go' c'est moi! Ware comme l'affirmation de soi.",
  },
  {
    character: "斬",
    meaningMnemonicFr: "La voiture 車 et la hache 斤 permettent de TRANCHER net. Le bourreau de la Bastille tranchait les tetes des condamnes d'un coup sec.",
    readingMnemonicFr: "ZAN/KIRU - 'Zan!' coupe! Kiru comme fendre d'un seul mouvement.",
  },
  {
    character: "歳",
    meaningMnemonicFr: "L'arret 止 et la lance 戈 marquent chaque AN qui passe. Les bougies d'anniversaire comptent les annees de vie, chaque flamme un an de plus.",
    readingMnemonicFr: "SAI/TOSHI - 'Sait' son age! Toshi comme les annees accumulees.",
  },
  {
    character: "穂",
    meaningMnemonicFr: "Le grain 禾 qui favorise 恵 forme un EPI dore. Les epis de ble de la Beauce ondulent sous le vent de juin, promesse de moissons abondantes.",
    readingMnemonicFr: "SUI/HO - 'Suis' l'epi! Ho comme la pointe doree des cereales.",
  },
  {
    character: "庄",
    meaningMnemonicFr: "Le toit 广 sur la terre 土 abrite un VILLAGE paisible. Les villages de Provence sommeillent sous le soleil, leurs toits de tuiles orange brillant.",
    readingMnemonicFr: "SHOU - 'Chaud' le village! La vie tranquille de la campagne.",
  },
  {
    character: "阻",
    meaningMnemonicFr: "La colline 阝 avec l'ancetre 且 EMPECHE le passage. Les Pyrenees empechaient les invasions, barriere naturelle entre France et Espagne.",
    readingMnemonicFr: "SO/HABAMU - 'Sot' bloque! Habamu comme barrer la route.",
  },
  {
    character: "俵",
    meaningMnemonicFr: "La personne 亻 avec la surface 表 porte un SAC DE PAILLE. Les paysans beaucerons transportaient leurs sacs de ble vers les moulins.",
    readingMnemonicFr: "HYOU/TAWARA - 'Pieu' de paille! Tawara comme le ballot de riz.",
  },
  {
    character: "孔",
    meaningMnemonicFr: "L'enfant 子 qui perd 乙 quelque chose laisse un TROU. Les trous du gruyere francais, ces cavites qui font son caractere unique.",
    readingMnemonicFr: "KOU - 'Coup' fait un trou! Chaque perforation a son histoire.",
  },
  {
    character: "鉢",
    meaningMnemonicFr: "Le metal 金 pour l'origine 本 forme un BOL precieux. Les bols a ramen, ces recipients fumants de bouillon savoureux japonais.",
    readingMnemonicFr: "HACHI/HACHI - 'Hache' le bol! Hachi comme le recipient rond.",
  },
  {
    character: "踊",
    meaningMnemonicFr: "Le pied 足 qui utilise 甬 le mouvement DANSE avec grace. Les danseurs de l'Opera de Paris virevoltent sur la scene mythique.",
    readingMnemonicFr: "YOU/ODORU - 'Youpi' je danse! Odoru comme tournoyer de joie.",
  },
  {
    character: "班",
    meaningMnemonicFr: "Le jade 王 divise 王 en parts forme un GROUPE organise. Les equipes de la SNCF travaillent en groupes coordonnes pour faire rouler les trains.",
    readingMnemonicFr: "HAN - 'Han' le groupe! L'equipe soudee qui travaille ensemble.",
  },
  {
    character: "塗",
    meaningMnemonicFr: "La terre 土 de la boutique 涂 sert a PEINDRE les murs. Les artistes de Montmartre peignent leurs toiles avec des couleurs vives.",
    readingMnemonicFr: "TO/NURU - 'Taux' de peinture! Nuru comme etaler la couleur.",
  },
  {
    character: "斜",
    meaningMnemonicFr: "La louche 斗 avec le reste 余 est OBLIQUE et penche. La Tour de Pise n'est pas la seule a pencher - tout peut etre de travers!",
    readingMnemonicFr: "SHA/NANAME - 'Chat' penche! Naname comme l'angle incline.",
  },
  {
    character: "浸",
    meaningMnemonicFr: "L'eau 氵 qui envahit 侵 tout TREMPE completement. Les croissants trempes dans le cafe au lait - le petit-dejeuner parisien classique.",
    readingMnemonicFr: "SHIN/HITASU - 'Chien' trempe! Hitasu comme imbiber totalement.",
  },
  {
    character: "潤",
    meaningMnemonicFr: "L'eau 氵 qui ferme 閏 pour HUMIDIFIER en douceur. La rosee du matin humidifie les vignes de Bourgogne, promesse de grands crus.",
    readingMnemonicFr: "JUN/URUOU - 'Juin' humide! Uruou comme la fraicheur bienfaisante.",
  },
  {
    character: "仰",
    meaningMnemonicFr: "La personne 亻 qui se courbe 卬 LEVE LES YEUX vers le ciel. On leve les yeux vers la voute celeste de la Sainte-Chapelle, emerveille.",
    readingMnemonicFr: "GYOU/AOGU - 'J'y' regarde en haut! Aogu comme lever la tete.",
  },
  {
    character: "累",
    meaningMnemonicFr: "Le champ 田 avec le fil 糸 S'ACCUMULE sans fin. Les dettes s'accumulent comme les interets composes, grandissant sans cesse.",
    readingMnemonicFr: "RUI - 'Rue' d'accumulation! Chaque couche s'ajoute a la precedente.",
  },
  {
    character: "悦",
    meaningMnemonicFr: "Le coeur 忄 qui parle 兌 exprime la JOIE intense. La joie d'un oenologue degustant un Petrus 1982 - l'extase pure!",
    readingMnemonicFr: "ETSU - 'Et su' la joie! Le bonheur qui deborde du coeur.",
  },
  {
    character: "冠",
    meaningMnemonicFr: "Le toit 冖 avec l'origine 元 et le pouce 寸 forme une COURONNE royale. La couronne de Charlemagne brillait lors du sacre a Reims.",
    readingMnemonicFr: "KAN/KANMURI - 'Quand' la couronne! Kanmuri comme le diademe royal.",
  },
  {
    character: "敢",
    meaningMnemonicFr: "Les actions 攵 douces 甘 montrent qu'on OSE agir. Jeanne d'Arc osait defier les Anglais, courageuse face a l'adversite.",
    readingMnemonicFr: "KAN/AETE - 'Quand' j'ose! Aete comme se lancer avec audace.",
  },
  {
    character: "愚",
    meaningMnemonicFr: "L'angle 禺 avec le coeur 心 revele la STUPIDITE. Les bouffons du roi jouaient les idiots pour amuser la cour de Versailles.",
    readingMnemonicFr: "GU/OROKA - 'Goulu' et stupide! Oroka comme la sottise evidente.",
  },
  {
    character: "茎",
    meaningMnemonicFr: "L'herbe 艹 qui passe 経 par le centre forme une TIGE robuste. Les tiges de tournesol de Van Gogh s'elevaient vers le soleil d'Arles.",
    readingMnemonicFr: "KEI/KUKI - 'Quai' de la tige! Kuki comme le support de la fleur.",
  },
  {
    character: "黄",
    meaningMnemonicFr: "Le champ 田 mur sous le soleil devient JAUNE dore. Les champs de colza jaune de Normandie eblouissent les voyageurs au printemps.",
    readingMnemonicFr: "OU/KI - 'Oh' jaune! Ki comme l'eclat du soleil couchant.",
  },
  {
    character: "苦",
    meaningMnemonicFr: "La plante 艹 ancienne 古 a un gout DIFFICILE et amer. L'absinthe, cette fee verte amere que buvaient les poetes maudits.",
    readingMnemonicFr: "KU/KURUSHII - 'Cul' douloureux! Kurushii comme souffrir en silence.",
  },
  {
    character: "錠",
    meaningMnemonicFr: "Le metal 金 fixe 定 forme une SERRURE solide. Les serrures du Louvre protegent les tresors inestimables de la nation.",
    readingMnemonicFr: "JOU - 'Joue' avec la serrure! Le mecanisme qui garde les secrets.",
  },
  {
    character: "藁",
    meaningMnemonicFr: "La plante 艹 avec le haut 高 et l'origine 木 donne la PAILLE seche. La paille des toits de chaume normands, isolant naturel et ecologique.",
    readingMnemonicFr: "KOU/WARA - 'Cou' de paille! Wara comme le foin des granges.",
  },
  {
    character: "楓",
    meaningMnemonicFr: "L'arbre 木 au vent 風 est l'ERABLE majestueux. Les erables du Canada ornent le drapeau, symbole d'automne flamboyant.",
    readingMnemonicFr: "FUU/KAEDE - 'Fou' de l'erable! Kaede aux feuilles rougeoyantes.",
  },
  {
    character: "鯖",
    meaningMnemonicFr: "Le poisson 魚 bleu 青 est le MAQUEREAU frais. Les maquereaux de Bretagne, grilles au feu de bois, un delice maritime.",
    readingMnemonicFr: "SABA - 'Ca va' le maquereau! Frais de la peche du jour.",
  },
  {
    character: "禅",
    meaningMnemonicFr: "Le dieu 礻 avec le simple 単 pratique le ZEN contemplatif. Les jardins zen inspirent la serenite, chaque pierre a sa place.",
    readingMnemonicFr: "ZEN - 'Zen' tout simplement! La paix interieure par la meditation.",
  },
  {
    character: "虚",
    meaningMnemonicFr: "Le tigre 虍 avec la colline 丘 montre le VIDE interieur. Le vide de l'ame que Pascal decrivait dans ses Pensees metaphysiques.",
    readingMnemonicFr: "KYO/MUNASHII - 'Qui' est vide? Munashii comme le neant existentiel.",
  },
  {
    character: "朧",
    meaningMnemonicFr: "La lune 月 avec le dragon 龍 cree une lumiere VAGUE et floue. La lune voilee derriere les nuages, mysterieuse et romantique.",
    readingMnemonicFr: "ROU/OBORO - 'Roue' floue! Oboro comme la brume du petit matin.",
  },
  {
    character: "釈",
    meaningMnemonicFr: "La cueillette 采 qui change 尺 EXPLIQUE le sens cache. Les theologiens de la Sorbonne expliquaient les textes sacres aux etudiants.",
    readingMnemonicFr: "SHAKU - 'Chaque' explication! Eclaircir les mysteres un par un.",
  },
  {
    character: "琲",
    meaningMnemonicFr: "Le roi 王 avec le pas 非 evoque le CAFE parfume. Les cafes de Saint-Germain-des-Pres ou Sartre philosophait devant son express.",
    readingMnemonicFr: "HAI - 'Aie' du cafe! L'arome qui reveille les sens.",
  },
  {
    character: "据",
    meaningMnemonicFr: "La main 扌 qui s'assoit 居 INSTALLE fermement les choses. Les demenageurs parisiens installent les meubles avec precision.",
    readingMnemonicFr: "KYO/SUERU - 'Quoi' j'installe! Sueru comme poser solidement.",
  },
  {
    character: "弔",
    meaningMnemonicFr: "L'arc 弓 qui touche le sol offre les CONDOLEANCES sinceres. Aux funerailles, on presente ses condoleances a la famille eploree.",
    readingMnemonicFr: "CHOU/TOMURAU - 'Chou' triste! Tomurau comme honorer les defunts.",
  },
  {
    character: "渉",
    meaningMnemonicFr: "L'eau 氵 que les pas 歩 TRAVERSENT avec difficulte. Traverser la Manche a la nage, exploit des nageurs les plus temeraires.",
    readingMnemonicFr: "SHOU/WATARU - 'Chaud' a traverser! Wataru comme passer de l'autre cote.",
  },
  {
    character: "牲",
    meaningMnemonicFr: "La vache 牛 qui nait 生 devient un SACRIFICE rituel. Les sacrifices des temples anciens, offrandes aux dieux capricieux.",
    readingMnemonicFr: "SEI - 'C'est' le sacrifice! L'offrande supreme pour les dieux.",
  },
  {
    character: "秩",
    meaningMnemonicFr: "Le grain 禾 qui manque 失 a besoin d'ORDRE strict. L'ordre dans les rangs de l'armee francaise, discipline et rigueur.",
    readingMnemonicFr: "CHITSU - 'Chic' l'ordre! La hierarchie bien etablie.",
  },
  {
    character: "粗",
    meaningMnemonicFr: "Le riz 米 avec l'ancetre 且 est GROSSIER et brut. Le pain de campagne grossier mais savoureux des boulangers d'antan.",
    readingMnemonicFr: "SO/ARAI - 'Sot' et grossier! Arai comme la texture rugueuse.",
  },
  {
    character: "脂",
    meaningMnemonicFr: "La chair 月 qui tourne 旨 contient la GRAISSE fondante. La graisse de canard du Sud-Ouest, or liquide de la gastronomie.",
    readingMnemonicFr: "SHI/ABURA - 'Si' gras! Abura comme l'huile qui nourrit.",
  },
  {
    character: "拍",
    meaningMnemonicFr: "La main 扌 blanche 白 BAT le rythme regulier. Le chef d'orchestre bat la mesure devant la Philharmonie de Paris.",
    readingMnemonicFr: "HAKU/HYOU - 'Ah qu'il' bat bien! Le tempo parfait de la musique.",
  },
  // Level 47
  {
    character: "頑",
    meaningMnemonicFr: "L'origine 元 de la tete 頁 est TETUE comme une mule. Les Bretons, reputes tetus, ne cedent jamais face a l'adversite.",
    readingMnemonicFr: "GAN/KATAKUNA - 'Gant' de tetu! Katakuna comme l'obstination bretonne.",
  },
  {
    character: "督",
    meaningMnemonicFr: "Le haut 叔 de l'oeil 目 SURVEILLE tout le monde. Le surveillant general du lycee observait les eleves avec severite.",
    readingMnemonicFr: "TOKU - 'Toc' je surveille! L'oeil vigilant qui ne dort jamais.",
  },
  {
    character: "廊",
    meaningMnemonicFr: "Le batiment 广 avec l'homme 郎 contient un COULOIR long. Les couloirs de Versailles ou les courtisans complotaient en chuchotant.",
    readingMnemonicFr: "ROU - 'Roux' le couloir! Le passage qui relie les pieces.",
  },
  {
    character: "漠",
    meaningMnemonicFr: "L'eau 氵 du soir 莫 devient VAGUE et indistincte. Le desert du Sahara, immense et vague, ou les mirages trompent les voyageurs.",
    readingMnemonicFr: "BAKU - 'Bac' vague! L'immensite floue et indefinie.",
  },
  {
    character: "摘",
    meaningMnemonicFr: "La main 扌 avec l'ennemi 啇 CUEILLE les fruits murs. Les vendangeurs de Champagne cueillent les grappes avec delicatesse.",
    readingMnemonicFr: "TEKI/TSUMU - 'T'es qui' qui cueilles? Tsumu comme recolter les fruits.",
  },
  {
    character: "献",
    meaningMnemonicFr: "Le sud 南 avec le chien 犬 OFFRE un present precieux. On offre un bouquet a l'Opera pour feliciter la diva apres son aria.",
    readingMnemonicFr: "KEN/KON - 'Qu'on' offre! L'offrande genereuse du coeur.",
  },
  {
    character: "維",
    meaningMnemonicFr: "Le fil 糸 de l'oiseau 隹 MAINTIENT la structure. Les fils de soie maintiennent la toile de l'araignee intacte.",
    readingMnemonicFr: "I - 'Y' maintenir! La fibre qui tient tout ensemble.",
  },
  {
    character: "削",
    meaningMnemonicFr: "Le couteau 刂 avec la lune 肖 permet de RASER finement. Le barbier de Seville rasait les mentons avec une precision chirurgicale.",
    readingMnemonicFr: "SAKU/KEZURU - 'Sac' a raser! Kezuru comme gratter la surface.",
  },
  {
    character: "慮",
    meaningMnemonicFr: "Le tigre 虍 pense 思 avec PRUDENCE et sagesse. La prudence de Richelieu guidait ses decisions politiques strategiques.",
    readingMnemonicFr: "RYO - 'Rio' de reflexion! La pensee profonde et mesuree.",
  },
  {
    character: "房",
    meaningMnemonicFr: "La porte 戸 avec la direction 方 ouvre sur une CHAMBRE privee. Les chambres du Ritz Paris accueillaient Coco Chanel et Hemingway.",
    readingMnemonicFr: "BOU/FUSA - 'Bout' de chambre! Fusa comme la piece intime.",
  },
  {
    character: "渋",
    meaningMnemonicFr: "L'eau 氵 qui s'arrete 止 devient ASTRINGENTE et amere. Le tanin astringent du vin jeune qui fait grimacer les novices.",
    readingMnemonicFr: "JUU/SHIBUI - 'Joue' astringent! Shibui comme le gout qui assèche.",
  },
  {
    character: "譲",
    meaningMnemonicFr: "Les paroles 言 qui cedent 襄 TRANSFERENT la propriete. Le notaire de province transfere les actes de vente avec solennite.",
    readingMnemonicFr: "JOU/YUZURU - 'Joue' et cede! Yuzuru comme passer le relais.",
  },
  {
    character: "躍",
    meaningMnemonicFr: "Le pied 足 avec le saut 翟 BONDIT d'enthousiasme. Les danseurs du Moulin Rouge bondissent sur scene avec energie.",
    readingMnemonicFr: "YAKU/ODORU - 'Yak' qui bondit! Odoru comme sauter de joie.",
  },
  {
    character: "頻",
    meaningMnemonicFr: "Le pas 歩 avec la tete 頁 se repete FREQUEMMENT. Les TGV partent frequemment de la Gare de Lyon vers le sud.",
    readingMnemonicFr: "HIN/SHIKIRI - 'Hein' si frequent! Shikiri comme la repetition constante.",
  },
  {
    character: "誉",
    meaningMnemonicFr: "Les paroles 言 qui elevent 興 conferent l'HONNEUR supreme. La Legion d'Honneur recompense les merites exceptionnels des citoyens.",
    readingMnemonicFr: "YO/HOMARE - 'Yo' l'honneur! Homare comme la gloire meritee.",
  },
  {
    character: "樹",
    meaningMnemonicFr: "Le bois 木 avec les tambours 鼓 evoque l'ARBRE majestueux. Les arbres centenaires du Bois de Boulogne temoignent du temps qui passe.",
    readingMnemonicFr: "JU - 'Joue' sous l'arbre! Le geant vegetal aux racines profondes.",
  },
  {
    character: "拳",
    meaningMnemonicFr: "La main 手 jointe 巻 forme un POING serre. Les boxeurs francais serrent leurs poings avant le combat decisif.",
    readingMnemonicFr: "KEN/KOBUSHI - 'Qu'on' serre le poing! Kobushi comme le geste de force.",
  },
  {
    character: "衣",
    meaningMnemonicFr: "Cette forme enveloppante represente le VETEMENT protecteur. Les vetements de haute couture parisienne habillent les elegantes du monde.",
    readingMnemonicFr: "I/KOROMO - 'Y' porter! Koromo comme l'habit qui protege.",
  },
  {
    character: "床",
    meaningMnemonicFr: "Le bois 木 large 广 forme le SOL sur lequel on marche. Les parquets en point de Hongrie des appartements haussmanniens.",
    readingMnemonicFr: "SHOU/YUKA - 'Chaud' le sol! Yuka comme le plancher confortable.",
  },
  {
    character: "垣",
    meaningMnemonicFr: "La terre 土 continue 亘 forme une CLOTURE de jardin. Les clotures des jardins a la francaise delimient les espaces verts.",
    readingMnemonicFr: "EN/KAKI - 'En' cloture! Kaki comme la haie qui separe.",
  },
  {
    character: "縁",
    meaningMnemonicFr: "Le fil 糸 de la couleur 彖 tisse le DESTIN qui nous lie. Les fils du destin relient les amants comme dans les romans de Flaubert.",
    readingMnemonicFr: "EN/FUCHI - 'En' destin! Fuchi comme le bord ou tout commence.",
  },
  {
    character: "澄",
    meaningMnemonicFr: "L'eau 氵 qui monte 登 devient LIMPIDE et pure. L'eau limpide des sources de Volvic, purete naturelle d'Auvergne.",
    readingMnemonicFr: "CHOU/SUMU - 'Chou' limpide! Sumu comme la clarte cristalline.",
  },
  {
    character: "裸",
    meaningMnemonicFr: "Le vetement 衤 avec le fruit 果 laisse l'homme NU et expose. Les nus de Renoir celebraient la beaute naturelle du corps feminin.",
    readingMnemonicFr: "RA/HADAKA - 'Ra' tout nu! Hadaka comme la nudite sans honte.",
  },
  {
    character: "霊",
    meaningMnemonicFr: "La pluie 雨 avec les mains 业 invoque l'ESPRIT invisible. Les esprits hantent les chateaux de la Loire selon les legendes locales.",
    readingMnemonicFr: "REI/TAMA - 'Raie' de l'esprit! Tama comme l'ame immortelle.",
  },
  {
    character: "穏",
    meaningMnemonicFr: "Le grain 禾 urgent 急 devient CALME sous le coeur 心. Le calme des moines de Cluny, serenite retrouvee dans la priere.",
    readingMnemonicFr: "ON/ODAYAKA - 'On' est calme! Odayaka comme la paix interieure.",
  },
  {
    character: "錬",
    meaningMnemonicFr: "Le metal 金 de l'est 東 se FORGE dans le feu. Les epees forgees de Thiers, trempe parfaite des lames francaises.",
    readingMnemonicFr: "REN/NERU - 'Renne' forge! Neru comme tremper l'acier au feu.",
  },
  {
    character: "瞬",
    meaningMnemonicFr: "L'oeil 目 qui cligne 舜 en un INSTANT fugace. Le clin d'oeil d'une Parisienne, ce geste rapide qui dit tout.",
    readingMnemonicFr: "SHUN/MATATAKU - 'Chun' l'instant! Matataku comme le battement de cils.",
  },
  {
    character: "粘",
    meaningMnemonicFr: "Le riz 米 qui predit 占 devient COLLANT et visqueux. La pate a choux collante que les patissiers travaillent avec patience.",
    readingMnemonicFr: "NEN/NEBARU - 'Nene' collant! Nebaru comme la texture gluante.",
  },
  {
    character: "粧",
    meaningMnemonicFr: "Le riz 米 du village 庄 se transforme en MAQUILLAGE fin. Le maquillage des dames de la cour, poudre de riz sur le visage.",
    readingMnemonicFr: "SHOU - 'Chaud' le maquillage! L'art de sublimer le visage.",
  },
  {
    character: "佐",
    meaningMnemonicFr: "La personne 亻 a gauche 左 offre son AIDE precieuse. L'aide de camp de Napoleon, toujours a sa gauche pour le conseiller.",
    readingMnemonicFr: "SA - 'Sac' d'aide! Le soutien fidele et constant.",
  },
  {
    character: "尺",
    meaningMnemonicFr: "Cette mesure ancienne japonaise est le PIED (unite). Les charpentiers d'antan mesuraient le bois en pieds et pouces.",
    readingMnemonicFr: "SHAKU - 'Chaque' pied compte! L'unite qui mesure tout.",
  },
  {
    character: "哀",
    meaningMnemonicFr: "La bouche 口 et le vetement 衣 expriment la TRISTESSE profonde. La tristesse des veuves en noir aux enterrements de village.",
    readingMnemonicFr: "AI/AWARE - 'Aie' si triste! Aware comme la melancolie qui etreint.",
  },
  {
    character: "如",
    meaningMnemonicFr: "La femme 女 et la bouche 口 disent COMME si c'etait vrai. 'Comme' dans les fables de La Fontaine, 'tel pere tel fils'.",
    readingMnemonicFr: "JO/GOTOSHI - 'Jo' comme! Gotoshi comme si c'etait pareil.",
  },
  {
    character: "婆",
    meaningMnemonicFr: "La vague 波 et la femme 女 deviennent une VIEILLE FEMME sage. Les vieilles femmes du marche qui vendent leurs legumes frais.",
    readingMnemonicFr: "BA/BABA - 'Bah' la vieille! Baba comme la grand-mere du village.",
  },
  {
    character: "帽",
    meaningMnemonicFr: "Le tissu 巾 qui risque 冒 de tomber est un CHAPEAU elegant. Les chapeaux des elegantes aux courses de Longchamp, mode parisienne.",
    readingMnemonicFr: "BOU - 'Bout' du chapeau! Le couvre-chef qui complete la tenue.",
  },
  {
    character: "滴",
    meaningMnemonicFr: "L'eau 氵 de l'ennemi 啇 forme une GOUTTE qui tombe. Les gouttes de pluie sur les toits de Paris, melodie urbaine.",
    readingMnemonicFr: "TEKI/SHIZUKU - 'T'es qui' goutte! Shizuku comme la perle d'eau.",
  },
  {
    character: "爽",
    meaningMnemonicFr: "Le grand 大 avec les croix 爻 est RAFRAICHISSANT et vivifiant. L'air rafraichissant des Alpes, bouffee d'oxygene pur.",
    readingMnemonicFr: "SOU/SAWAYAKA - 'Sous' rafraichissant! Sawayaka comme la brise matinale.",
  },
];

async function main() {
  console.log("Starting mnemonic improvements for levels 46-50...");

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

  console.log(`\nSummary:`);
  console.log(`- Updated: ${updatedCount} kanji`);
  console.log(`- Not found: ${notFoundCount} kanji`);
  console.log(`- Total processed: ${improvedMnemonics.length} kanji`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
