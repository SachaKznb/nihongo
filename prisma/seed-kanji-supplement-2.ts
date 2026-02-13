import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Additional N2/N3 kanji for levels 21-40 with French storytelling mnemonics

const kanjiData = [
  // Level 21
  { character: "届", meaningsFr: ["Livrer", "Atteindre"], readingsOn: [], readingsKun: ["とど-く", "とど-ける"], meaningMnemonicFr: "Un corps (尸) qui pousse quelque chose dehors (由) - LIVRER. Le facteur glisse votre colis sous la porte.", readingMnemonicFr: "TODOKU - 'Tout doux' le facteur.", levelId: 21 },
  { character: "押", meaningsFr: ["Pousser", "Presser"], readingsOn: ["オウ"], readingsKun: ["お-す"], meaningMnemonicFr: "Une main (扌) qui pousse avec énergie (甲) - POUSSER. Comme dans le métro parisien aux heures de pointe.", readingMnemonicFr: "OSU - on pousse 'Oh!'", levelId: 21 },
  { character: "引", meaningsFr: ["Tirer", "Attirer"], readingsOn: ["イン"], readingsKun: ["ひ-く"], meaningMnemonicFr: "Un arc (弓) tendu avec une ligne - TIRER. Le mouvement qui précède le vol de la flèche.", readingMnemonicFr: "HIKU - 'tirer' vers soi.", levelId: 21 },

  // Level 22
  { character: "掛", meaningsFr: ["Accrocher", "Suspendre"], readingsOn: ["カイ"], readingsKun: ["か-ける", "か-かる"], meaningMnemonicFr: "Une main (扌) avec de la terre empilée (圭) - ACCROCHER. Suspendre un tableau au mur du Louvre.", readingMnemonicFr: "KAKERU - 'accrocher' au clou.", levelId: 22 },
  { character: "磨", meaningsFr: ["Frotter", "Polir"], readingsOn: ["マ"], readingsKun: ["みが-く"], meaningMnemonicFr: "Une main (扌) avec du lin (麻) sur une pierre (石) - POLIR. L'artisan qui fait briller le marbre.", readingMnemonicFr: "MIGAKU - polir jusqu'à briller.", levelId: 22 },

  // Level 23
  { character: "屈", meaningsFr: ["Plier", "Courber"], readingsOn: ["クツ"], readingsKun: ["かが-む"], meaningMnemonicFr: "Un corps (尸) qui sort (出) - PLIER. La révérence japonaise profonde.", readingMnemonicFr: "KAGAMU - on se 'courbe'.", levelId: 23 },
  { character: "伸", meaningsFr: ["Étendre", "Allonger"], readingsOn: ["シン"], readingsKun: ["の-びる", "の-ばす"], meaningMnemonicFr: "Une personne (亻) qui s'étire vers le ciel (申) - ÉTENDRE. Le chat qui s'étire au soleil.", readingMnemonicFr: "NOBIRU - 's'allonger' paresseusement.", levelId: 23 },

  // Level 24
  { character: "握", meaningsFr: ["Saisir", "Tenir"], readingsOn: ["アク"], readingsKun: ["にぎ-る"], meaningMnemonicFr: "Une main (扌) qui saisit la maison (屋) - SAISIR fermement. Le serrement de main traditionnel.", readingMnemonicFr: "NIGIRU - 'tenir' fort le sushi.", levelId: 24 },
  { character: "放", meaningsFr: ["Lâcher", "Libérer"], readingsOn: ["ホウ"], readingsKun: ["はな-す", "はな-つ"], meaningMnemonicFr: "Une main avec une direction (方) et frapper (攵) - LIBÉRER. Lâcher un oiseau dans le ciel.", readingMnemonicFr: "HANASU - 'lâcher' prise.", levelId: 24 },

  // Level 25
  { character: "泣", meaningsFr: ["Pleurer"], readingsOn: ["キュウ"], readingsKun: ["な-く"], meaningMnemonicFr: "L'eau (氵) qui coule debout (立) - PLEURER. Les larmes qui tombent sur les joues.", readingMnemonicFr: "NAKU - pleurer à chaudes larmes.", levelId: 25 },
  { character: "笑", meaningsFr: ["Rire", "Sourire"], readingsOn: ["ショウ"], readingsKun: ["わら-う", "え-む"], meaningMnemonicFr: "Un bambou (竹) avec une bouche (夭) - RIRE. Le rire qui secoue comme le bambou au vent.", readingMnemonicFr: "WARAU - rire aux éclats.", levelId: 25 },

  // Level 26
  { character: "眠", meaningsFr: ["Dormir", "Sommeiller"], readingsOn: ["ミン"], readingsKun: ["ねむ-る"], meaningMnemonicFr: "Des yeux (目) avec le peuple (民) - DORMIR. Fermer les yeux comme tout le monde la nuit.", readingMnemonicFr: "NEMURU - 'au dodo!' on dort.", levelId: 26 },
  { character: "覚", meaningsFr: ["Se réveiller", "Mémoriser"], readingsOn: ["カク"], readingsKun: ["おぼ-える", "さ-める"], meaningMnemonicFr: "Apprendre (学) avec des yeux (見) - SE RÉVEILLER et apprendre. L'esprit qui s'éveille.", readingMnemonicFr: "SAMERU - 'debout!' on se réveille.", levelId: 26 },

  // Level 27
  { character: "借", meaningsFr: ["Emprunter"], readingsOn: ["シャク"], readingsKun: ["か-りる"], meaningMnemonicFr: "Une personne (亻) avec le passé (昔) - EMPRUNTER. Ce qu'on prend pour rendre plus tard.", readingMnemonicFr: "KARIRU - 'emprunter' un livre.", levelId: 27 },
  { character: "貸", meaningsFr: ["Prêter"], readingsOn: ["タイ"], readingsKun: ["か-す"], meaningMnemonicFr: "Remplacer (代) avec des coquillages (貝) - PRÊTER. Donner son argent temporairement.", readingMnemonicFr: "KASU - 'prêter' avec confiance.", levelId: 27 },

  // Level 28
  { character: "失", meaningsFr: ["Perdre", "Échouer"], readingsOn: ["シツ"], readingsKun: ["うしな-う"], meaningMnemonicFr: "Une main (夫) qui laisse tomber - PERDRE quelque chose de précieux.", readingMnemonicFr: "USHINAU - 'perdre' le chemin.", levelId: 28 },
  { character: "探", meaningsFr: ["Chercher", "Explorer"], readingsOn: ["タン"], readingsKun: ["さが-す", "さぐ-る"], meaningMnemonicFr: "Une main (扌) qui fouille profondément (深) - CHERCHER. L'explorateur qui fouille les ruines.", readingMnemonicFr: "SAGASU - 'chercher' partout.", levelId: 28 },

  // Level 29
  { character: "選", meaningsFr: ["Choisir", "Sélectionner"], readingsOn: ["セン"], readingsKun: ["えら-ぶ"], meaningMnemonicFr: "Marcher (辶) vers la meilleure option (巽) - CHOISIR. Sélectionner parmi plusieurs options.", readingMnemonicFr: "ERABU - 'choisir' le meilleur.", levelId: 29 },
  { character: "決", meaningsFr: ["Décider", "Déterminer"], readingsOn: ["ケツ"], readingsKun: ["き-める"], meaningMnemonicFr: "L'eau (氵) qui prend son cours final (夬) - DÉCIDER. Trancher une fois pour toutes.", readingMnemonicFr: "KIMERU - 'c'est décidé!'", levelId: 29 },

  // Level 30
  { character: "解", meaningsFr: ["Résoudre", "Comprendre"], readingsOn: ["カイ", "ゲ"], readingsKun: ["と-く", "わか-る"], meaningMnemonicFr: "Des cornes (角) avec un couteau (刀) et un bœuf (牛) - RÉSOUDRE. Décortiquer un problème complexe.", readingMnemonicFr: "TOKU - 'résolu!' le mystère.", levelId: 30 },
  { character: "答", meaningsFr: ["Répondre", "Réponse"], readingsOn: ["トウ"], readingsKun: ["こた-える"], meaningMnemonicFr: "Un bambou (竹) qui couvre une bouche (合) - RÉPONDRE. La réponse qui vient naturellement.", readingMnemonicFr: "KOTAERU - 'voilà la réponse!'", levelId: 30 },

  // Level 31
  { character: "疑", meaningsFr: ["Douter", "Soupçonner"], readingsOn: ["ギ"], readingsKun: ["うたが-う"], meaningMnemonicFr: "Un homme (匕) avec un enfant qui marche - DOUTER. Hésiter comme un enfant devant l'inconnu.", readingMnemonicFr: "UTAGAU - 'j'en doute'.", levelId: 31 },
  { character: "信", meaningsFr: ["Croire", "Faire confiance"], readingsOn: ["シン"], readingsKun: [], meaningMnemonicFr: "Une personne (亻) avec des paroles (言) - CROIRE. La parole d'un homme de confiance.", readingMnemonicFr: "SHIN - 'je crois' en toi.", levelId: 31 },

  // Level 32
  { character: "救", meaningsFr: ["Sauver", "Secourir"], readingsOn: ["キュウ"], readingsKun: ["すく-う"], meaningMnemonicFr: "Demander (求) avec frapper (攵) - SAUVER. Frapper à la porte pour demander de l'aide.", readingMnemonicFr: "SUKUU - 'au secours!' on sauve.", levelId: 32 },
  { character: "助", meaningsFr: ["Aider", "Assister"], readingsOn: ["ジョ"], readingsKun: ["たす-ける", "たす-かる"], meaningMnemonicFr: "De la force (力) ajoutée à côté (且) - AIDER. Apporter son soutien à quelqu'un.", readingMnemonicFr: "TASUKERU - 'à l'aide!'", levelId: 32 },

  // Level 33
  { character: "守", meaningsFr: ["Protéger", "Garder"], readingsOn: ["シュ", "ス"], readingsKun: ["まも-る"], meaningMnemonicFr: "Un toit (宀) avec une main (寸) - PROTÉGER. Garder sa maison en sécurité.", readingMnemonicFr: "MAMORU - 'protéger' les siens.", levelId: 33 },
  { character: "攻", meaningsFr: ["Attaquer", "Étudier"], readingsOn: ["コウ"], readingsKun: ["せ-める"], meaningMnemonicFr: "Du travail (工) avec frapper (攵) - ATTAQUER. L'assaut stratégique de l'ennemi.", readingMnemonicFr: "SEMERU - 'à l'attaque!'", levelId: 33 },

  // Level 34
  { character: "約", meaningsFr: ["Promettre", "Environ"], readingsOn: ["ヤク"], readingsKun: [], meaningMnemonicFr: "Un fil (糸) avec une louche (勺) - PROMETTRE. Le fil qui lie deux personnes par une promesse.", readingMnemonicFr: "YAKU - la 'promesse' sacrée.", levelId: 34 },
  { character: "背", meaningsFr: ["Dos", "Trahir"], readingsOn: ["ハイ"], readingsKun: ["せ", "そむ-く"], meaningMnemonicFr: "La chair (月) au nord (北) - le DOS. La partie du corps qu'on tourne quand on trahit.", readingMnemonicFr: "SOMUKU - 'tourner le dos'.", levelId: 34 },

  // Level 35
  { character: "招", meaningsFr: ["Inviter", "Appeler"], readingsOn: ["ショウ"], readingsKun: ["まね-く"], meaningMnemonicFr: "Une main (扌) qui appelle (召) - INVITER. Faire signe de venir avec la main.", readingMnemonicFr: "MANEKU - 'venez!' l'invitation.", levelId: 35 },
  { character: "拒", meaningsFr: ["Refuser", "Rejeter"], readingsOn: ["キョ"], readingsKun: ["こば-む"], meaningMnemonicFr: "Une main (扌) avec un carré (巨) - REFUSER. Repousser fermement une proposition.", readingMnemonicFr: "KOBAMU - 'non!' je refuse.", levelId: 35 },

  // Level 36
  { character: "報", meaningsFr: ["Informer", "Rapport"], readingsOn: ["ホウ"], readingsKun: ["むく-いる"], meaningMnemonicFr: "Bonheur (幸) avec un serviteur (卩) et une main - INFORMER. Rapporter les nouvelles.", readingMnemonicFr: "HOU - 'écoutez!' le rapport.", levelId: 36 },
  { character: "隠", meaningsFr: ["Cacher", "Dissimuler"], readingsOn: ["イン"], readingsKun: ["かく-す", "かく-れる"], meaningMnemonicFr: "Une colline (阝) où l'on se cache - CACHER. Se dissimuler derrière la montagne.", readingMnemonicFr: "KAKUSU - 'caché!' bien dissimulé.", levelId: 36 },

  // Level 37
  { character: "示", meaningsFr: ["Montrer", "Indiquer"], readingsOn: ["ジ", "シ"], readingsKun: ["しめ-す"], meaningMnemonicFr: "L'autel des dieux qui MONTRE le chemin spirituel. Le signe divin.", readingMnemonicFr: "SHIMESU - 'regardez!' je montre.", levelId: 37 },
  { character: "述", meaningsFr: ["Décrire", "Mentionner"], readingsOn: ["ジュツ"], readingsKun: ["の-べる"], meaningMnemonicFr: "Marcher (辶) avec de l'art (術) - DÉCRIRE. Raconter son voyage avec des mots.", readingMnemonicFr: "NOBERU - 'je décris' ce que j'ai vu.", levelId: 37 },

  // Level 38
  { character: "替", meaningsFr: ["Remplacer", "Changer"], readingsOn: ["タイ"], readingsKun: ["か-える", "か-わる"], meaningMnemonicFr: "Deux personnes (夫夫) qui changent de jour (日) - REMPLACER. Prendre la place de quelqu'un.", readingMnemonicFr: "KAERU - on 'change' de place.", levelId: 38 },
  { character: "混", meaningsFr: ["Mélanger", "Confondre"], readingsOn: ["コン"], readingsKun: ["ま-じる", "ま-ぜる"], meaningMnemonicFr: "De l'eau (氵) avec le soleil couchant (昆) - MÉLANGER. Les couleurs qui se mélangent au crépuscule.", readingMnemonicFr: "MAZERU - 'mélangez' bien!", levelId: 38 },

  // Level 39
  { character: "離", meaningsFr: ["Séparer", "S'éloigner"], readingsOn: ["リ"], readingsKun: ["はな-れる"], meaningMnemonicFr: "Un oiseau bizarre (离) avec des queues (隹) - SE SÉPARER. L'oiseau qui quitte le nid.", readingMnemonicFr: "HANARERU - 'séparons-nous'.", levelId: 39 },
  { character: "集", meaningsFr: ["Rassembler", "Collecter"], readingsOn: ["シュウ"], readingsKun: ["あつ-める", "あつ-まる"], meaningMnemonicFr: "Des oiseaux (隹) sur un arbre (木) - RASSEMBLER. Les oiseaux qui se réunissent au crépuscule.", readingMnemonicFr: "ATSUMERU - 'réunion!' tous ensemble.", levelId: 39 },

  // Level 40
  { character: "増", meaningsFr: ["Augmenter", "Accroître"], readingsOn: ["ゾウ"], readingsKun: ["ふ-える", "ふ-やす"], meaningMnemonicFr: "De la terre (土) avec des couches (曽) - AUGMENTER. La terre qui s'accumule couche par couche.", readingMnemonicFr: "FUERU - 'ça augmente!' de plus en plus.", levelId: 40 },
  { character: "減", meaningsFr: ["Diminuer", "Réduire"], readingsOn: ["ゲン"], readingsKun: ["へ-る", "へ-らす"], meaningMnemonicFr: "De l'eau (氵) qui diminue (咸) - RÉDUIRE. Le niveau d'eau qui baisse progressivement.", readingMnemonicFr: "HERU - 'ça diminue!' petit à petit.", levelId: 40 },
];

async function main() {
  console.log("Seeding additional kanji (part 2 - levels 21-40)...");

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
