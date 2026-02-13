import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Additional kanji to reach 2,000 target
// Focus on N1 kanji with French storytelling mnemonics

const kanjiData = [
  // Level 51 additions
  { character: "顧", meaningsFr: ["Regarder en arrière", "Considérer"], readingsOn: ["コ"], readingsKun: ["かえり-みる"], meaningMnemonicFr: "Une TÊTE (頁) dans un magasin (雇) qui se retourne pour REGARDER EN ARRIÈRE. Comme quand vous quittez une boutique et jetez un dernier regard sur ce que vous n'avez pas acheté.", readingMnemonicFr: "KO comme 'encore' - on regarde encore en arrière.", levelId: 51 },
  { character: "顕", meaningsFr: ["Manifeste", "Apparent"], readingsOn: ["ケン"], readingsKun: ["あらわ-れる"], meaningMnemonicFr: "Le soleil (日) brille sur une tête (頁) - tout devient MANIFESTE et visible. Impossible de cacher quoi que ce soit sous cette lumière.", readingMnemonicFr: "KEN comme 'clair' - c'est clairement visible.", levelId: 51 },
  { character: "魂", meaningsFr: ["Âme", "Esprit"], readingsOn: ["コン"], readingsKun: ["たましい"], meaningMnemonicFr: "Le nuage (云) au-dessus d'un démon (鬼) représente l'ÂME qui s'échappe. Dans les contes japonais, l'âme apparaît comme une lueur bleue.", readingMnemonicFr: "KON - l'âme qui s'en va 'comme' un souffle.", levelId: 51 },
  { character: "魅", meaningsFr: ["Charmer", "Fasciner"], readingsOn: ["ミ"], readingsKun: [], meaningMnemonicFr: "Un démon (鬼) qui n'est pas encore (未) complet - il vous CHARME pour vous attirer. Le charme est une magie dangereuse.", readingMnemonicFr: "MI comme 'mirage' - le charme est une illusion.", levelId: 51 },
  { character: "塊", meaningsFr: ["Bloc", "Masse"], readingsOn: ["カイ"], readingsKun: ["かたまり"], meaningMnemonicFr: "De la terre (土) avec un fantôme (鬼) dedans - un BLOC mystérieux. Comme ces pierres qu'on trouve et qui semblent habitées.", readingMnemonicFr: "KAI comme un gros 'caillou' - un bloc de pierre.", levelId: 51 },
  { character: "渇", meaningsFr: ["Soif", "Asséché"], readingsOn: ["カツ"], readingsKun: ["かわ-く"], meaningMnemonicFr: "L'eau (氵) qui manque, on la réclame (曷) - c'est la SOIF. Quand vous avez soif, vous criez pour de l'eau.", readingMnemonicFr: "KATSU - quand on a soif, on 'coupe' tout pour boire.", levelId: 51 },
  { character: "褐", meaningsFr: ["Brun", "Marron"], readingsOn: ["カツ"], readingsKun: [], meaningMnemonicFr: "Un vêtement (衤) de la couleur qu'on réclame (曷) - le BRUN, couleur des moines mendiants qui réclament l'aumône.", readingMnemonicFr: "KATSU comme 'cacao' - la couleur brune.", levelId: 51 },
  { character: "轄", meaningsFr: ["Contrôler", "Juridiction"], readingsOn: ["カツ"], readingsKun: [], meaningMnemonicFr: "Un véhicule (車) qu'on réclame (曷) - c'est sous votre CONTRÔLE, votre juridiction. Vous décidez qui monte.", readingMnemonicFr: "KATSU - contrôler comme un 'capitaine'.", levelId: 51 },
  { character: "且", meaningsFr: ["De plus", "En outre"], readingsOn: ["ショ", "ソ"], readingsKun: ["か-つ"], meaningMnemonicFr: "Un autel avec des offrandes empilées - DE PLUS, on ajoute encore. Toujours plus d'offrandes aux dieux.", readingMnemonicFr: "SHO/SO - 'aussi' en plus.", levelId: 51 },
  { character: "嘆", meaningsFr: ["Soupirer", "Se lamenter"], readingsOn: ["タン"], readingsKun: ["なげ-く"], meaningMnemonicFr: "Une bouche (口) qui soupire devant un spectacle (嘆) - SE LAMENTER. Quand les mots ne suffisent plus, on soupire.", readingMnemonicFr: "TAN comme 'tant' de tristesse.", levelId: 51 },

  // Level 52 additions
  { character: "堪", meaningsFr: ["Endurer", "Supporter"], readingsOn: ["カン"], readingsKun: ["た-える"], meaningMnemonicFr: "La terre (土) qui supporte même ce qui est excessif (甚) - ENDURER. Le sol supporte tout le poids du monde.", readingMnemonicFr: "KAN - 'quand' même, on endure.", levelId: 52 },
  { character: "勘", meaningsFr: ["Intuition", "Sixième sens"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "La force (力) de sentir même l'excessif (甚) - l'INTUITION. Ce sixième sens qui vous avertit du danger.", readingMnemonicFr: "KAN - on 'sent' les choses.", levelId: 52 },
  { character: "喚", meaningsFr: ["Appeler", "Convoquer"], readingsOn: ["カン"], readingsKun: ["よ-ぶ"], meaningMnemonicFr: "Une bouche (口) qui crie avec force et échange (奐) - APPELER quelqu'un. Crier un nom dans la foule.", readingMnemonicFr: "KAN comme 'crier' pour appeler.", levelId: 52 },
  { character: "換", meaningsFr: ["Échanger", "Remplacer"], readingsOn: ["カン"], readingsKun: ["か-える"], meaningMnemonicFr: "Une main (扌) qui fait un échange (奐) - ÉCHANGER. Troquer une chose contre une autre.", readingMnemonicFr: "KAN - 'changer' une chose.", levelId: 52 },
  { character: "敢", meaningsFr: ["Oser", "Audacieux"], readingsOn: ["カン"], readingsKun: ["あ-えて"], meaningMnemonicFr: "Frapper (攵) avec audace (耳+亠) - OSER. Avoir le courage de frapper le premier.", readingMnemonicFr: "KAN - le courage de celui qui 'peut'.", levelId: 52 },
  { character: "棺", meaningsFr: ["Cercueil"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Du bois (木) pour un officiel (官) - le CERCUEIL. Même les officiels finissent dans une boîte en bois.", readingMnemonicFr: "KAN - la dernière 'caisse'.", levelId: 52 },
  { character: "款", meaningsFr: ["Article", "Clause"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Un trou (穴) dans le travail - l'ARTICLE de loi qui manque toujours quelque chose.", readingMnemonicFr: "KAN comme 'clause' du contrat.", levelId: 52 },
  { character: "歓", meaningsFr: ["Joie", "Plaisir"], readingsOn: ["カン"], readingsKun: ["よろこ-ぶ"], meaningMnemonicFr: "Manquer (欠) de quelque chose avec des oiseaux (雚) - la JOIE quand ils reviennent ! Le plaisir des retrouvailles.", readingMnemonicFr: "KAN - la joie qui fait 'chanter'.", levelId: 52 },
  { character: "汗", meaningsFr: ["Sueur"], readingsOn: ["カン"], readingsKun: ["あせ"], meaningMnemonicFr: "L'eau (氵) qui sort quand il fait sec (干) - la SUEUR. Votre corps qui tente de se refroidir.", readingMnemonicFr: "KAN - la sueur qui 'coule'.", levelId: 52 },
  { character: "缶", meaningsFr: ["Boîte de conserve"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Un récipient en forme de 缶 - une BOÎTE DE CONSERVE. Le métal qui garde la nourriture fraîche.", readingMnemonicFr: "KAN comme 'canette'.", levelId: 52 },

  // Level 53 additions
  { character: "肝", meaningsFr: ["Foie", "Courage"], readingsOn: ["カン"], readingsKun: ["きも"], meaningMnemonicFr: "La chair (月) qui est sèche (干) - le FOIE, organe vital. Au Japon, avoir du 'foie' signifie avoir du courage.", readingMnemonicFr: "KAN - le foie qui filtre 'tout'.", levelId: 53 },
  { character: "艦", meaningsFr: ["Navire de guerre"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Un bateau (舟) qui surveille (監) - un NAVIRE DE GUERRE. Les yeux de la flotte.", readingMnemonicFr: "KAN comme 'cuirassé'.", levelId: 53 },
  { character: "貫", meaningsFr: ["Transpercer", "Persévérer"], readingsOn: ["カン"], readingsKun: ["つらぬ-く"], meaningMnemonicFr: "Une mère (母) avec des coquillages (貝) - elle TRANSPERCE les difficultés pour nourrir ses enfants. La persévérance maternelle.", readingMnemonicFr: "KAN - percer 'jusqu'au' bout.", levelId: 53 },
  { character: "還", meaningsFr: ["Retourner", "Rendre"], readingsOn: ["カン"], readingsKun: ["かえ-る"], meaningMnemonicFr: "Marcher (辶) autour d'un œil (目) et revenir - RETOURNER. Le chemin qui ramène toujours à la maison.", readingMnemonicFr: "KAN - 'quand' on revient.", levelId: 53 },
  { character: "鑑", meaningsFr: ["Miroir", "Modèle"], readingsOn: ["カン"], readingsKun: ["かがみ"], meaningMnemonicFr: "Du métal (金) qui surveille (監) - un MIROIR. Il reflète la vérité sans mentir.", readingMnemonicFr: "KAN - le miroir qui 'montre' tout.", levelId: 53 },
  { character: "閑", meaningsFr: ["Loisir", "Tranquillité"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Une porte (門) avec un arbre (木) - le LOISIR. Un jardin tranquille derrière la porte.", readingMnemonicFr: "KAN - le calme 'quand' on se repose.", levelId: 53 },
  { character: "陥", meaningsFr: ["Tomber dans", "Piège"], readingsOn: ["カン"], readingsKun: ["おちい-る"], meaningMnemonicFr: "Une colline (阝) avec un trou (臼) - TOMBER DANS un piège. Le sol qui s'effondre sous vos pieds.", readingMnemonicFr: "KAN - 'quand' on tombe.", levelId: 53 },
  { character: "韓", meaningsFr: ["Corée"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le caractère historique pour la CORÉE. Un pays voisin avec une riche histoire partagée.", readingMnemonicFr: "KAN - la Corée.", levelId: 53 },
  { character: "玩", meaningsFr: ["Jouer", "Jouet"], readingsOn: ["ガン"], readingsKun: ["もてあそ-ぶ"], meaningMnemonicFr: "Un jade (王) qu'on garde comme un yuan (元) - un JOUET précieux. Les enfants jouent avec des trésors.", readingMnemonicFr: "GAN comme 'gamin' qui joue.", levelId: 53 },
  { character: "岩", meaningsFr: ["Rocher"], readingsOn: ["ガン"], readingsKun: ["いわ"], meaningMnemonicFr: "Une montagne (山) avec une pierre (石) - un ROCHER. Les géants de pierre qui forment les montagnes.", readingMnemonicFr: "GAN - le rocher 'géant'.", levelId: 53 },

  // Level 54 additions
  { character: "眼", meaningsFr: ["Œil"], readingsOn: ["ガン", "ゲン"], readingsKun: ["まなこ"], meaningMnemonicFr: "L'œil (目) qui est fondamental (艮) - l'ŒIL. La fenêtre de l'âme qui voit tout.", readingMnemonicFr: "GAN/GEN - les yeux qui 'guettent'.", levelId: 54 },
  { character: "頑", meaningsFr: ["Têtu", "Obstiné"], readingsOn: ["ガン"], readingsKun: ["かたく-な"], meaningMnemonicFr: "Une tête (頁) qui reste au yuan (元) - TÊTU. Quelqu'un qui ne change jamais d'avis, comme une pierre.", readingMnemonicFr: "GAN - têtu comme un 'gamin'.", levelId: 54 },
  { character: "企", meaningsFr: ["Planifier", "Entreprendre"], readingsOn: ["キ"], readingsKun: ["くわだ-てる"], meaningMnemonicFr: "Une personne (人) qui s'arrête (止) pour PLANIFIER. Avant d'agir, on réfléchit.", readingMnemonicFr: "KI - planifier 'qui' fait quoi.", levelId: 54 },
  { character: "伎", meaningsFr: ["Habileté", "Art"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "Une personne (亻) avec une branche (支) - l'HABILETÉ. L'art de manier les choses avec grâce.", readingMnemonicFr: "GI comme dans 'kabuki' - l'art du théâtre.", levelId: 54 },
  { character: "岐", meaningsFr: ["Bifurcation", "Carrefour"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Une montagne (山) avec des branches (支) - une BIFURCATION. Le chemin qui se divise en montagne.", readingMnemonicFr: "KI - le carrefour où on 'choisit'.", levelId: 54 },
  { character: "忌", meaningsFr: ["Tabou", "Éviter"], readingsOn: ["キ"], readingsKun: ["い-む"], meaningMnemonicFr: "Soi-même (己) dans le cœur (心) - un TABOU. Ce qu'on s'interdit au plus profond de soi.", readingMnemonicFr: "KI - ce qu'on 'évite'.", levelId: 54 },
  { character: "既", meaningsFr: ["Déjà"], readingsOn: ["キ"], readingsKun: ["すで-に"], meaningMnemonicFr: "Manger (艮) avec joie (旡) - c'est DÉJÀ fait. Le repas est fini avant qu'on s'en rende compte.", readingMnemonicFr: "KI - 'déjà' accompli.", levelId: 54 },
  { character: "棋", meaningsFr: ["Pièce d'échecs", "Jeu de go"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Du bois (木) pour son (其) jeu - une PIÈCE D'ÉCHECS. Les pièces sculptées du shogi.", readingMnemonicFr: "KI - les pièces du 'jeu'.", levelId: 54 },
  { character: "棄", meaningsFr: ["Abandonner", "Rejeter"], readingsOn: ["キ"], readingsKun: ["す-てる"], meaningMnemonicFr: "Un enfant (子) sous un arbre (木) avec les mains vides - ABANDONNER. L'enfant laissé seul.", readingMnemonicFr: "KI - 'quitter' quelque chose.", levelId: 54 },
  { character: "祈", meaningsFr: ["Prier"], readingsOn: ["キ"], readingsKun: ["いの-る"], meaningMnemonicFr: "Montrer (示) avec une hache (斤) - PRIER. Offrir quelque chose de précieux aux dieux.", readingMnemonicFr: "KI - la prière qui 'demande'.", levelId: 54 },

  // Level 55 additions
  { character: "軌", meaningsFr: ["Rail", "Orbite"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Un véhicule (車) avec neuf (九) - les RAILS. Le chemin tracé que suit le train.", readingMnemonicFr: "KI - le chemin 'tracé'.", levelId: 55 },
  { character: "飢", meaningsFr: ["Faim", "Famine"], readingsOn: ["キ"], readingsKun: ["う-える"], meaningMnemonicFr: "La nourriture (食) qui manque (几) - la FAIM. Le ventre vide qui crie.", readingMnemonicFr: "KI - la faim qui 'crie'.", levelId: 55 },
  { character: "騎", meaningsFr: ["Monter à cheval"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Un cheval (馬) avec quelque chose de bizarre (奇) - MONTER À CHEVAL. L'art équestre des samouraïs.", readingMnemonicFr: "KI - le 'cavalier'.", levelId: 55 },
  { character: "鬼", meaningsFr: ["Démon", "Ogre"], readingsOn: ["キ"], readingsKun: ["おに"], meaningMnemonicFr: "Le DÉMON oni avec ses cornes et ses crocs. Les créatures terrifiantes du folklore japonais qui punissent les méchants.", readingMnemonicFr: "KI/ONI - le démon qui fait 'peur'.", levelId: 55 },
  { character: "偽", meaningsFr: ["Faux", "Contrefait"], readingsOn: ["ギ"], readingsKun: ["いつわ-る"], meaningMnemonicFr: "Une personne (亻) qui fait quelque chose (為) - c'est FAUX. L'humain qui fabrique des mensonges.", readingMnemonicFr: "GI - le 'faux' qui trompe.", levelId: 55 },
  { character: "儀", meaningsFr: ["Cérémonie", "Rite"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "Une personne (亻) avec justice (義) - la CÉRÉMONIE. Les rituels qui maintiennent l'ordre social.", readingMnemonicFr: "GI - les 'gestes' rituels.", levelId: 55 },
  { character: "宜", meaningsFr: ["Convenable", "Approprié"], readingsOn: ["ギ"], readingsKun: ["よろ-しい"], meaningMnemonicFr: "Sous un toit (宀) avec un autel (且) - c'est CONVENABLE. Ce qui est approprié pour la maison et les dieux.", readingMnemonicFr: "GI - ce qui 'va bien'.", levelId: 55 },
  { character: "戯", meaningsFr: ["Jouer", "S'amuser"], readingsOn: ["ギ", "ゲ"], readingsKun: ["たわむ-れる"], meaningMnemonicFr: "Une hallebarde (戈) avec une fausse personne - JOUER. Le théâtre et les jeux de combat simulé.", readingMnemonicFr: "GI/GE - les 'jeux' d'acteurs.", levelId: 55 },
  { character: "擬", meaningsFr: ["Imiter", "Simuler"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "Une main (扌) qui doute (疑) - IMITER. Copier quelque chose sans être sûr.", readingMnemonicFr: "GI - 'imiter' les gestes.", levelId: 55 },
  { character: "犠", meaningsFr: ["Sacrifice"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "Un bœuf (牛) avec justice (義) - le SACRIFICE. L'animal offert aux dieux pour le bien commun.", readingMnemonicFr: "GI - le 'don' de soi.", levelId: 55 },

  // Level 56 additions
  { character: "菊", meaningsFr: ["Chrysanthème"], readingsOn: ["キク"], readingsKun: [], meaningMnemonicFr: "Une herbe (艹) qui se courbe (匊) - le CHRYSANTHÈME. La fleur impériale du Japon, symbole de longévité.", readingMnemonicFr: "KIKU - la fleur 'impériale'.", levelId: 56 },
  { character: "吉", meaningsFr: ["Chance", "Bon augure"], readingsOn: ["キチ", "キツ"], readingsKun: [], meaningMnemonicFr: "Un samouraï (士) avec une bouche (口) qui annonce la CHANCE. Les bonnes nouvelles proclamées.", readingMnemonicFr: "KICHI - la 'bonne' fortune.", levelId: 56 },
  { character: "喫", meaningsFr: ["Manger", "Fumer"], readingsOn: ["キツ"], readingsKun: [], meaningMnemonicFr: "Une bouche (口) qui contracte (契) - MANGER ou fumer. Absorber quelque chose par la bouche.", readingMnemonicFr: "KITSU - 'consommer' quelque chose.", levelId: 56 },
  { character: "詰", meaningsFr: ["Remplir", "Bourrer"], readingsOn: ["キツ"], readingsKun: ["つ-める"], meaningMnemonicFr: "Des paroles (言) qui arrivent à la chance (吉) - REMPLIR. Bourrer jusqu'à ce que ce soit complet.", readingMnemonicFr: "KITSU - 'remplir' à ras bord.", levelId: 56 },
  { character: "却", meaningsFr: ["Rejeter", "Plutôt"], readingsOn: ["キャク"], readingsKun: [], meaningMnemonicFr: "Aller (去) en reculant (卩) - REJETER. Faire un pas en arrière pour refuser.", readingMnemonicFr: "KYAKU - 'repousser' quelque chose.", levelId: 56 },
  { character: "脚", meaningsFr: ["Jambe", "Pied"], readingsOn: ["キャク", "キャ"], readingsKun: ["あし"], meaningMnemonicFr: "La chair (月) qui va (去) quelque part - la JAMBE. Ce qui nous porte à travers le monde.", readingMnemonicFr: "KYAKU - les 'jambes' qui marchent.", levelId: 56 },
  { character: "虐", meaningsFr: ["Cruauté", "Maltraiter"], readingsOn: ["ギャク"], readingsKun: ["しいた-げる"], meaningMnemonicFr: "Un tigre (虍) qui griffe (爪) - la CRUAUTÉ. La violence gratuite du prédateur.", readingMnemonicFr: "GYAKU - la 'cruauté' du fort.", levelId: 56 },
  { character: "及", meaningsFr: ["Atteindre", "Et"], readingsOn: ["キュウ"], readingsKun: ["およ-ぶ"], meaningMnemonicFr: "Une main qui ATTEINT quelque chose. Tendre le bras et toucher son but.", readingMnemonicFr: "KYU - 'atteindre' enfin.", levelId: 56 },
  { character: "朽", meaningsFr: ["Pourrir", "Décomposer"], readingsOn: ["キュウ"], readingsKun: ["く-ちる"], meaningMnemonicFr: "Un arbre (木) qui se courbe (丂) - POURRIR. Le bois qui retourne à la terre.", readingMnemonicFr: "KYU - le bois qui 'meurt'.", levelId: 56 },
  { character: "窮", meaningsFr: ["Extrémité", "Pauvreté"], readingsOn: ["キュウ"], readingsKun: ["きわ-める"], meaningMnemonicFr: "Un trou (穴) où l'on se courbe (躬) - l'EXTRÉMITÉ. Être acculé dans un coin.", readingMnemonicFr: "KYU - la 'fin' du chemin.", levelId: 56 },
];

async function main() {
  console.log("Seeding additional kanji (part 1)...");

  for (const kanji of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonicFr,
        readingMnemonicFr: kanji.readingMnemonicFr,
        levelId: kanji.levelId,
      },
      create: kanji,
    });
  }

  console.log(`Seeded ${kanjiData.length} additional kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
