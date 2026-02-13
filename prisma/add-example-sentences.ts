import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the sentence structure
interface ExampleSentence {
  japanese: string;
  french: string;
}

// Example sentences database - organized by vocabulary word
// Each entry contains 1-2 simple example sentences appropriate for the vocabulary's level
const EXAMPLE_SENTENCES: Record<string, ExampleSentence[]> = {
  // Level 1 - Basic numbers and days
  "一": [
    { japanese: "これは一です。", french: "C'est un." },
    { japanese: "一から始めましょう。", french: "Commencons par un." }
  ],
  "二": [
    { japanese: "二つください。", french: "Deux, s'il vous plait." },
    { japanese: "一足す一は二です。", french: "Un plus un fait deux." }
  ],
  "三": [
    { japanese: "三人います。", french: "Il y a trois personnes." },
    { japanese: "三つの山があります。", french: "Il y a trois montagnes." }
  ],
  "十": [
    { japanese: "十まで数えて。", french: "Compte jusqu'a dix." },
    { japanese: "今日は十日です。", french: "Aujourd'hui, c'est le dix." }
  ],
  "一日": [
    { japanese: "一日休みです。", french: "C'est un jour de repos." },
    { japanese: "一日中雨でした。", french: "Il a plu toute la journee." }
  ],
  "二日": [
    { japanese: "二日後に会いましょう。", french: "Retrouvons-nous dans deux jours." },
    { japanese: "旅行は二日です。", french: "Le voyage dure deux jours." }
  ],

  // Level 2 - Basic nature and directions
  "山": [
    { japanese: "山が見えます。", french: "Je vois la montagne." },
    { japanese: "あの山は高いです。", french: "Cette montagne est haute." }
  ],
  "川": [
    { japanese: "川で泳ぎます。", french: "Je nage dans la riviere." },
    { japanese: "きれいな川ですね。", french: "C'est une jolie riviere." }
  ],
  "木": [
    { japanese: "木の下で休みます。", french: "Je me repose sous l'arbre." },
    { japanese: "大きい木があります。", french: "Il y a un grand arbre." }
  ],
  "日": [
    { japanese: "今日はいい日です。", french: "C'est une belle journee." },
    { japanese: "日が出ています。", french: "Le soleil brille." }
  ],
  "月": [
    { japanese: "月がきれいです。", french: "La lune est belle." },
    { japanese: "来月会いましょう。", french: "Retrouvons-nous le mois prochain." }
  ],
  "火": [
    { japanese: "火を使います。", french: "J'utilise le feu." },
    { japanese: "火は熱いです。", french: "Le feu est chaud." }
  ],
  "水": [
    { japanese: "水を飲みます。", french: "Je bois de l'eau." },
    { japanese: "水がほしいです。", french: "Je veux de l'eau." }
  ],
  "土": [
    { japanese: "土を掘ります。", french: "Je creuse la terre." },
    { japanese: "土曜日は休みです。", french: "Samedi est un jour de repos." }
  ],
  "金": [
    { japanese: "金は高いです。", french: "L'or est cher." },
    { japanese: "金曜日に会いましょう。", french: "Retrouvons-nous vendredi." }
  ],
  "上": [
    { japanese: "上に置いてください。", french: "Posez-le en haut." },
    { japanese: "上を見て。", french: "Regarde en haut." }
  ],
  "下": [
    { japanese: "下に降りましょう。", french: "Descendons." },
    { japanese: "机の下にあります。", french: "C'est sous le bureau." }
  ],
  "中": [
    { japanese: "中に入ってください。", french: "Entrez a l'interieur." },
    { japanese: "箱の中は空です。", french: "L'interieur de la boite est vide." }
  ],
  "大": [
    { japanese: "大きい犬です。", french: "C'est un grand chien." },
    { japanese: "大きな家に住んでいます。", french: "J'habite dans une grande maison." }
  ],
  "小": [
    { japanese: "小さい猫です。", french: "C'est un petit chat." },
    { japanese: "小さな花があります。", french: "Il y a une petite fleur." }
  ],
  "人": [
    { japanese: "あの人は先生です。", french: "Cette personne est professeur." },
    { japanese: "たくさんの人がいます。", french: "Il y a beaucoup de personnes." }
  ],
  "口": [
    { japanese: "口を開けてください。", french: "Ouvrez la bouche." },
    { japanese: "口が大きいです。", french: "La bouche est grande." }
  ],
  "目": [
    { japanese: "目が青いです。", french: "Les yeux sont bleus." },
    { japanese: "目を閉じてください。", french: "Fermez les yeux." }
  ],
  "耳": [
    { japanese: "耳が聞こえません。", french: "Je n'entends pas." },
    { japanese: "耳を傾けて。", french: "Tends l'oreille." }
  ],
  "手": [
    { japanese: "手を洗いましょう。", french: "Lavons-nous les mains." },
    { japanese: "手がきれいです。", french: "Les mains sont propres." }
  ],
  "足": [
    { japanese: "足が痛いです。", french: "J'ai mal aux pieds." },
    { japanese: "足が長いですね。", french: "Vous avez de longues jambes." }
  ],

  // Level 3-4 - Actions and adjectives
  "見る": [
    { japanese: "テレビを見ます。", french: "Je regarde la television." },
    { japanese: "映画を見ましょう。", french: "Regardons un film." }
  ],
  "行く": [
    { japanese: "学校に行きます。", french: "Je vais a l'ecole." },
    { japanese: "どこに行きますか。", french: "Ou allez-vous?" }
  ],
  "来る": [
    { japanese: "友達が来ます。", french: "Mon ami vient." },
    { japanese: "いつ来ますか。", french: "Quand venez-vous?" }
  ],
  "食べる": [
    { japanese: "ご飯を食べます。", french: "Je mange du riz." },
    { japanese: "何を食べますか。", french: "Que mangez-vous?" }
  ],
  "飲む": [
    { japanese: "お茶を飲みます。", french: "Je bois du the." },
    { japanese: "何か飲みますか。", french: "Voulez-vous boire quelque chose?" }
  ],
  "言う": [
    { japanese: "本当のことを言います。", french: "Je dis la verite." },
    { japanese: "何と言いましたか。", french: "Qu'avez-vous dit?" }
  ],
  "上手": [
    { japanese: "料理が上手です。", french: "Vous etes doue en cuisine." },
    { japanese: "日本語が上手ですね。", french: "Vous parlez bien japonais." }
  ],
  "下手": [
    { japanese: "歌が下手です。", french: "Je chante mal." },
    { japanese: "下手でもいいです。", french: "Ce n'est pas grave si c'est maladroit." }
  ],
  "来年": [
    { japanese: "来年、日本に行きます。", french: "J'irai au Japon l'annee prochaine." },
    { japanese: "来年は何をしますか。", french: "Que ferez-vous l'annee prochaine?" }
  ],
  "来月": [
    { japanese: "来月、引っ越します。", french: "Je demenage le mois prochain." },
    { japanese: "来月会いましょう。", french: "Retrouvons-nous le mois prochain." }
  ],
  "人口": [
    { japanese: "日本の人口は多いです。", french: "La population du Japon est importante." },
    { japanese: "この町の人口は少ないです。", french: "La population de cette ville est faible." }
  ],
  "入手": [
    { japanese: "チケットを入手しました。", french: "J'ai obtenu les billets." },
    { japanese: "情報を入手しました。", french: "J'ai obtenu les informations." }
  ],

  // Level 5 - Body parts and verbs
  "入る": [
    { japanese: "部屋に入ります。", french: "J'entre dans la chambre." },
    { japanese: "お風呂に入りましょう。", french: "Prenons un bain." }
  ],
  "出る": [
    { japanese: "外に出ます。", french: "Je sors dehors." },
    { japanese: "電車が出ます。", french: "Le train part." }
  ],
  "立つ": [
    { japanese: "ここに立ってください。", french: "Tenez-vous ici." },
    { japanese: "立って話しましょう。", french: "Parlons debout." }
  ],
  "休む": [
    { japanese: "少し休みます。", french: "Je me repose un peu." },
    { japanese: "今日は休みましょう。", french: "Reposons-nous aujourd'hui." }
  ],
  "聞く": [
    { japanese: "音楽を聞きます。", french: "J'ecoute de la musique." },
    { japanese: "話を聞いてください。", french: "Ecoutez l'histoire." }
  ],
  "読む": [
    { japanese: "本を読みます。", french: "Je lis un livre." },
    { japanese: "新聞を読みますか。", french: "Lisez-vous le journal?" }
  ],
  "書く": [
    { japanese: "手紙を書きます。", french: "J'ecris une lettre." },
    { japanese: "名前を書いてください。", french: "Ecrivez votre nom." }
  ],
  "話す": [
    { japanese: "日本語を話します。", french: "Je parle japonais." },
    { japanese: "友達と話します。", french: "Je parle avec mon ami." }
  ],

  // Level 6-7 - More complex vocabulary
  "白": [
    { japanese: "白い雪が降っています。", french: "De la neige blanche tombe." },
    { japanese: "白いシャツを着ています。", french: "Je porte une chemise blanche." }
  ],
  "黒": [
    { japanese: "黒い猫がいます。", french: "Il y a un chat noir." },
    { japanese: "黒いコーヒーをください。", french: "Un cafe noir, s'il vous plait." }
  ],
  "赤": [
    { japanese: "赤い花がきれいです。", french: "Les fleurs rouges sont belles." },
    { japanese: "赤いりんごを食べます。", french: "Je mange une pomme rouge." }
  ],
  "青": [
    { japanese: "空は青いです。", french: "Le ciel est bleu." },
    { japanese: "青い海が見えます。", french: "Je vois la mer bleue." }
  ],
  "電気": [
    { japanese: "電気をつけてください。", french: "Allumez la lumiere." },
    { japanese: "電気を消します。", french: "J'eteins la lumiere." }
  ],
  "電車": [
    { japanese: "電車に乗ります。", french: "Je prends le train." },
    { japanese: "電車が来ました。", french: "Le train est arrive." }
  ],
  "電話": [
    { japanese: "電話をかけます。", french: "Je passe un coup de telephone." },
    { japanese: "電話が鳴っています。", french: "Le telephone sonne." }
  ],
  "先生": [
    { japanese: "先生に聞きます。", french: "Je demande au professeur." },
    { japanese: "先生は優しいです。", french: "Le professeur est gentil." }
  ],
  "学生": [
    { japanese: "私は学生です。", french: "Je suis etudiant." },
    { japanese: "学生が多いです。", french: "Il y a beaucoup d'etudiants." }
  ],
  "学校": [
    { japanese: "学校に行きます。", french: "Je vais a l'ecole." },
    { japanese: "学校は楽しいです。", french: "L'ecole est amusante." }
  ],
  "会社": [
    { japanese: "会社で働きます。", french: "Je travaille dans une entreprise." },
    { japanese: "会社に遅れました。", french: "Je suis en retard au travail." }
  ],
  "仕事": [
    { japanese: "仕事は大変です。", french: "Le travail est difficile." },
    { japanese: "仕事が終わりました。", french: "Le travail est termine." }
  ],

  // Level 8-10 - Intermediate vocabulary
  "毎日": [
    { japanese: "毎日日本語を勉強します。", french: "J'etudie le japonais tous les jours." },
    { japanese: "毎日運動しています。", french: "Je fais de l'exercice tous les jours." }
  ],
  "毎週": [
    { japanese: "毎週映画を見ます。", french: "Je regarde un film chaque semaine." },
    { japanese: "毎週日曜日に会います。", french: "Nous nous voyons chaque dimanche." }
  ],
  "毎月": [
    { japanese: "毎月本を買います。", french: "J'achete un livre chaque mois." },
    { japanese: "毎月貯金しています。", french: "J'economise chaque mois." }
  ],
  "毎年": [
    { japanese: "毎年旅行します。", french: "Je voyage chaque annee." },
    { japanese: "毎年正月に会います。", french: "Nous nous voyons au Nouvel An chaque annee." }
  ],
  "今日": [
    { japanese: "今日は暑いです。", french: "Il fait chaud aujourd'hui." },
    { japanese: "今日、何をしますか。", french: "Que faites-vous aujourd'hui?" }
  ],
  "今週": [
    { japanese: "今週は忙しいです。", french: "Cette semaine est chargee." },
    { japanese: "今週、会えますか。", french: "Pouvons-nous nous voir cette semaine?" }
  ],
  "今月": [
    { japanese: "今月は休みがありません。", french: "Je n'ai pas de conge ce mois-ci." },
    { japanese: "今月、何をしますか。", french: "Que faites-vous ce mois-ci?" }
  ],
  "今年": [
    { japanese: "今年は特別です。", french: "Cette annee est speciale." },
    { japanese: "今年、結婚します。", french: "Je me marie cette annee." }
  ],
  "午前": [
    { japanese: "午前中は忙しいです。", french: "Je suis occupe le matin." },
    { japanese: "午前九時に会いましょう。", french: "Retrouvons-nous a neuf heures du matin." }
  ],
  "午後": [
    { japanese: "午後は暇です。", french: "Je suis libre l'apres-midi." },
    { japanese: "午後三時に来てください。", french: "Venez a trois heures de l'apres-midi." }
  ],
  "新しい": [
    { japanese: "新しい本を買いました。", french: "J'ai achete un nouveau livre." },
    { japanese: "新しい家は大きいです。", french: "La nouvelle maison est grande." }
  ],
  "古い": [
    { japanese: "古い建物が好きです。", french: "J'aime les vieux batiments." },
    { japanese: "この車は古いです。", french: "Cette voiture est vieille." }
  ],
  "高い": [
    { japanese: "このビルは高いです。", french: "Cet immeuble est haut." },
    { japanese: "値段が高いです。", french: "Le prix est eleve." }
  ],
  "安い": [
    { japanese: "この店は安いです。", french: "Ce magasin est bon marche." },
    { japanese: "安い物を探しています。", french: "Je cherche quelque chose de pas cher." }
  ],
  "長い": [
    { japanese: "髪が長いですね。", french: "Vous avez les cheveux longs." },
    { japanese: "長い道を歩きました。", french: "J'ai marche sur une longue route." }
  ],
  "短い": [
    { japanese: "夏は短いです。", french: "L'ete est court." },
    { japanese: "短いスカートです。", french: "C'est une jupe courte." }
  ],
  "広い": [
    { japanese: "この部屋は広いです。", french: "Cette piece est spacieuse." },
    { japanese: "広い公園で遊びます。", french: "Je joue dans un grand parc." }
  ],
  "狭い": [
    { japanese: "この道は狭いです。", french: "Cette route est etroite." },
    { japanese: "狭い部屋に住んでいます。", french: "J'habite dans une petite piece." }
  ],
  "明るい": [
    { japanese: "部屋が明るいです。", french: "La piece est lumineuse." },
    { japanese: "明るい色が好きです。", french: "J'aime les couleurs vives." }
  ],
  "暗い": [
    { japanese: "外は暗いです。", french: "Il fait sombre dehors." },
    { japanese: "暗い所が怖いです。", french: "J'ai peur des endroits sombres." }
  ],
  "暑い": [
    { japanese: "今日は暑いです。", french: "Il fait chaud aujourd'hui." },
    { japanese: "夏は暑いです。", french: "L'ete est chaud." }
  ],
  "寒い": [
    { japanese: "冬は寒いです。", french: "L'hiver est froid." },
    { japanese: "今日は寒いですね。", french: "Il fait froid aujourd'hui." }
  ],
  "暖かい": [
    { japanese: "今日は暖かいです。", french: "Il fait doux aujourd'hui." },
    { japanese: "暖かいコートを着ます。", french: "Je porte un manteau chaud." }
  ],
  "涼しい": [
    { japanese: "今日は涼しいですね。", french: "Il fait frais aujourd'hui." },
    { japanese: "山は涼しいです。", french: "La montagne est fraiche." }
  ],

  // More vocabulary
  "買う": [
    { japanese: "本を買います。", french: "J'achete un livre." },
    { japanese: "何を買いますか。", french: "Qu'achetez-vous?" }
  ],
  "売る": [
    { japanese: "車を売ります。", french: "Je vends ma voiture." },
    { japanese: "この店で何を売っていますか。", french: "Que vend-on dans ce magasin?" }
  ],
  "待つ": [
    { japanese: "友達を待っています。", french: "J'attends mon ami." },
    { japanese: "少し待ってください。", french: "Attendez un moment, s'il vous plait." }
  ],
  "持つ": [
    { japanese: "かばんを持っています。", french: "Je porte un sac." },
    { japanese: "傘を持っていますか。", french: "Avez-vous un parapluie?" }
  ],
  "使う": [
    { japanese: "パソコンを使います。", french: "J'utilise un ordinateur." },
    { japanese: "箸を使えますか。", french: "Savez-vous utiliser des baguettes?" }
  ],
  "始める": [
    { japanese: "仕事を始めます。", french: "Je commence le travail." },
    { japanese: "何時に始まりますか。", french: "A quelle heure cela commence-t-il?" }
  ],
  "終わる": [
    { japanese: "仕事が終わりました。", french: "Le travail est termine." },
    { japanese: "映画は何時に終わりますか。", french: "A quelle heure se termine le film?" }
  ],
  "開ける": [
    { japanese: "窓を開けてください。", french: "Ouvrez la fenetre, s'il vous plait." },
    { japanese: "ドアを開けます。", french: "J'ouvre la porte." }
  ],
  "閉める": [
    { japanese: "ドアを閉めてください。", french: "Fermez la porte, s'il vous plait." },
    { japanese: "窓を閉めます。", french: "Je ferme la fenetre." }
  ],
  "教える": [
    { japanese: "日本語を教えます。", french: "J'enseigne le japonais." },
    { japanese: "道を教えてください。", french: "Indiquez-moi le chemin, s'il vous plait." }
  ],
  "習う": [
    { japanese: "ピアノを習っています。", french: "J'apprends le piano." },
    { japanese: "日本語を習いたいです。", french: "Je veux apprendre le japonais." }
  ],
  "覚える": [
    { japanese: "漢字を覚えます。", french: "J'apprends les kanji." },
    { japanese: "名前を覚えました。", french: "J'ai retenu le nom." }
  ],
  "忘れる": [
    { japanese: "約束を忘れました。", french: "J'ai oublie le rendez-vous." },
    { japanese: "名前を忘れないでください。", french: "N'oubliez pas le nom." }
  ],
  "知る": [
    { japanese: "答えを知っています。", french: "Je connais la reponse." },
    { japanese: "あの人を知っていますか。", french: "Connaissez-vous cette personne?" }
  ],
  "分かる": [
    { japanese: "日本語が分かります。", french: "Je comprends le japonais." },
    { japanese: "意味が分かりません。", french: "Je ne comprends pas le sens." }
  ],
  "思う": [
    { japanese: "そう思います。", french: "Je pense que oui." },
    { japanese: "何を思いますか。", french: "Qu'en pensez-vous?" }
  ],
  "考える": [
    { japanese: "よく考えます。", french: "Je reflechis bien." },
    { japanese: "答えを考えています。", french: "Je reflechis a la reponse." }
  ],
  "作る": [
    { japanese: "料理を作ります。", french: "Je prepare un plat." },
    { japanese: "何を作りましたか。", french: "Qu'avez-vous fait?" }
  ],
  "働く": [
    { japanese: "会社で働きます。", french: "Je travaille dans une entreprise." },
    { japanese: "毎日働いています。", french: "Je travaille tous les jours." }
  ],
  "遊ぶ": [
    { japanese: "公園で遊びます。", french: "Je joue dans le parc." },
    { japanese: "子供と遊びます。", french: "Je joue avec les enfants." }
  ],
  "歩く": [
    { japanese: "学校まで歩きます。", french: "Je marche jusqu'a l'ecole." },
    { japanese: "公園を歩きましょう。", french: "Marchons dans le parc." }
  ],
  "走る": [
    { japanese: "毎朝走ります。", french: "Je cours chaque matin." },
    { japanese: "速く走れます。", french: "Je peux courir vite." }
  ],
  "泳ぐ": [
    { japanese: "プールで泳ぎます。", french: "Je nage dans la piscine." },
    { japanese: "海で泳ぎたいです。", french: "Je veux nager dans la mer." }
  ],
  "乗る": [
    { japanese: "電車に乗ります。", french: "Je prends le train." },
    { japanese: "自転車に乗れますか。", french: "Savez-vous faire du velo?" }
  ],
  "降りる": [
    { japanese: "次の駅で降ります。", french: "Je descends a la prochaine station." },
    { japanese: "バスを降ります。", french: "Je descends du bus." }
  ],
  "帰る": [
    { japanese: "家に帰ります。", french: "Je rentre a la maison." },
    { japanese: "何時に帰りますか。", french: "A quelle heure rentrez-vous?" }
  ],
  "着く": [
    { japanese: "駅に着きました。", french: "Je suis arrive a la gare." },
    { japanese: "何時に着きますか。", french: "A quelle heure arrivez-vous?" }
  ],
  "送る": [
    { japanese: "手紙を送ります。", french: "J'envoie une lettre." },
    { japanese: "メールを送りました。", french: "J'ai envoye un email." }
  ],
  "届く": [
    { japanese: "荷物が届きました。", french: "Le colis est arrive." },
    { japanese: "いつ届きますか。", french: "Quand arrivera-t-il?" }
  ],
  "貸す": [
    { japanese: "本を貸します。", french: "Je prete un livre." },
    { japanese: "傘を貸してください。", french: "Pretez-moi un parapluie." }
  ],
  "借りる": [
    { japanese: "本を借りました。", french: "J'ai emprunte un livre." },
    { japanese: "お金を借りたいです。", french: "Je voudrais emprunter de l'argent." }
  ],
  "返す": [
    { japanese: "本を返します。", french: "Je rends le livre." },
    { japanese: "お金を返してください。", french: "Rendez-moi l'argent." }
  ],
  "探す": [
    { japanese: "鍵を探しています。", french: "Je cherche mes cles." },
    { japanese: "仕事を探しています。", french: "Je cherche du travail." }
  ],
  "見つける": [
    { japanese: "鍵を見つけました。", french: "J'ai trouve les cles." },
    { japanese: "答えを見つけました。", french: "J'ai trouve la reponse." }
  ],
  "決める": [
    { japanese: "日程を決めましょう。", french: "Decidons de la date." },
    { japanese: "何も決めていません。", french: "Je n'ai rien decide." }
  ],
  "選ぶ": [
    { japanese: "好きなものを選んでください。", french: "Choisissez ce que vous aimez." },
    { japanese: "色を選びます。", french: "Je choisis une couleur." }
  ],
  "集める": [
    { japanese: "切手を集めています。", french: "Je collectionne les timbres." },
    { japanese: "情報を集めます。", french: "Je rassemble des informations." }
  ],
  "集まる": [
    { japanese: "駅に集まりましょう。", french: "Retrouvons-nous a la gare." },
    { japanese: "人が集まっています。", french: "Les gens se rassemblent." }
  ],
  "変わる": [
    { japanese: "天気が変わりました。", french: "Le temps a change." },
    { japanese: "世界は変わります。", french: "Le monde change." }
  ],
  "変える": [
    { japanese: "計画を変えます。", french: "Je change les plans." },
    { japanese: "髪型を変えました。", french: "J'ai change de coiffure." }
  ],
  "起きる": [
    { japanese: "毎朝六時に起きます。", french: "Je me leve a six heures chaque matin." },
    { japanese: "何時に起きましたか。", french: "A quelle heure vous etes-vous leve?" }
  ],
  "寝る": [
    { japanese: "十時に寝ます。", french: "Je me couche a dix heures." },
    { japanese: "よく寝ましたか。", french: "Avez-vous bien dormi?" }
  ],
  "起こす": [
    { japanese: "朝、起こしてください。", french: "Reveillez-moi le matin." },
    { japanese: "子供を起こします。", french: "Je reveille les enfants." }
  ],
  "眠る": [
    { japanese: "よく眠れましたか。", french: "Avez-vous bien dormi?" },
    { japanese: "まだ眠いです。", french: "J'ai encore sommeil." }
  ],
  "疲れる": [
    { japanese: "今日は疲れました。", french: "Je suis fatigue aujourd'hui." },
    { japanese: "仕事で疲れています。", french: "Je suis fatigue par le travail." }
  ],
  "困る": [
    { japanese: "お金がなくて困っています。", french: "Je suis en difficulte car je n'ai pas d'argent." },
    { japanese: "困りました。", french: "Je suis embete." }
  ],
  "喜ぶ": [
    { japanese: "プレゼントを喜びました。", french: "Il/Elle s'est rejoui du cadeau." },
    { japanese: "みんなが喜んでいます。", french: "Tout le monde est content." }
  ],
  "怒る": [
    { japanese: "先生が怒りました。", french: "Le professeur s'est fache." },
    { japanese: "怒らないでください。", french: "Ne vous fâchez pas." }
  ],
  "笑う": [
    { japanese: "みんなで笑いました。", french: "Nous avons tous ri." },
    { japanese: "よく笑います。", french: "Je ris souvent." }
  ],
  "泣く": [
    { japanese: "映画を見て泣きました。", french: "J'ai pleure en regardant le film." },
    { japanese: "赤ちゃんが泣いています。", french: "Le bebe pleure." }
  ],

  // More words
  "友達": [
    { japanese: "友達と遊びます。", french: "Je joue avec mes amis." },
    { japanese: "新しい友達ができました。", french: "Je me suis fait de nouveaux amis." }
  ],
  "家族": [
    { japanese: "家族は四人です。", french: "Ma famille compte quatre personnes." },
    { japanese: "家族と住んでいます。", french: "J'habite avec ma famille." }
  ],
  "父": [
    { japanese: "父は会社員です。", french: "Mon pere est employe de bureau." },
    { japanese: "父に電話します。", french: "J'appelle mon pere." }
  ],
  "母": [
    { japanese: "母は料理が上手です。", french: "Ma mere cuisine bien." },
    { japanese: "母に会いたいです。", french: "Je veux voir ma mere." }
  ],
  "兄": [
    { japanese: "兄は大学生です。", french: "Mon grand frere est etudiant." },
    { japanese: "兄がいます。", french: "J'ai un grand frere." }
  ],
  "姉": [
    { japanese: "姉は東京に住んでいます。", french: "Ma grande soeur habite a Tokyo." },
    { japanese: "姉と買い物に行きます。", french: "Je vais faire des courses avec ma grande soeur." }
  ],
  "弟": [
    { japanese: "弟は高校生です。", french: "Mon petit frere est lyceen." },
    { japanese: "弟と遊びます。", french: "Je joue avec mon petit frere." }
  ],
  "妹": [
    { japanese: "妹は可愛いです。", french: "Ma petite soeur est mignonne." },
    { japanese: "妹がいます。", french: "J'ai une petite soeur." }
  ],
  "子供": [
    { japanese: "子供が二人います。", french: "J'ai deux enfants." },
    { japanese: "子供と遊びます。", french: "Je joue avec les enfants." }
  ],
  "男": [
    { japanese: "あの男の人は誰ですか。", french: "Qui est cet homme?" },
    { japanese: "男の子が走っています。", french: "Un garcon court." }
  ],
  "女": [
    { japanese: "あの女の人は先生です。", french: "Cette femme est professeur." },
    { japanese: "女の子が歌っています。", french: "Une fille chante." }
  ],
  "彼": [
    { japanese: "彼は学生です。", french: "Il est etudiant." },
    { japanese: "彼に会いました。", french: "Je l'ai rencontre." }
  ],
  "彼女": [
    { japanese: "彼女は医者です。", french: "Elle est medecin." },
    { japanese: "彼女と映画を見ました。", french: "J'ai vu un film avec elle." }
  ],
  "私": [
    { japanese: "私は日本人です。", french: "Je suis japonais." },
    { japanese: "私の名前は田中です。", french: "Je m'appelle Tanaka." }
  ],
  "食事": [
    { japanese: "食事をしましょう。", french: "Mangeons." },
    { japanese: "食事の準備をします。", french: "Je prepare le repas." }
  ],
  "朝ご飯": [
    { japanese: "朝ご飯を食べましたか。", french: "Avez-vous pris le petit-dejeuner?" },
    { japanese: "朝ご飯は何を食べますか。", french: "Que mangez-vous au petit-dejeuner?" }
  ],
  "昼ご飯": [
    { japanese: "昼ご飯を食べましょう。", french: "Dejeunons." },
    { japanese: "昼ご飯は何がいいですか。", french: "Que voulez-vous pour le dejeuner?" }
  ],
  "晩ご飯": [
    { japanese: "晩ご飯を作ります。", french: "Je prepare le diner." },
    { japanese: "晩ご飯は何時ですか。", french: "A quelle heure est le diner?" }
  ],
  "夕食": [
    { japanese: "夕食を食べました。", french: "J'ai dine." },
    { japanese: "夕食に何を食べますか。", french: "Que mangez-vous pour le diner?" }
  ],

  // Places
  "家": [
    { japanese: "家に帰ります。", french: "Je rentre a la maison." },
    { japanese: "新しい家を買いました。", french: "J'ai achete une nouvelle maison." }
  ],
  "部屋": [
    { japanese: "部屋を掃除します。", french: "Je nettoie la chambre." },
    { japanese: "この部屋は広いです。", french: "Cette piece est spacieuse." }
  ],
  "庭": [
    { japanese: "庭に花があります。", french: "Il y a des fleurs dans le jardin." },
    { japanese: "庭で遊びます。", french: "Je joue dans le jardin." }
  ],
  "店": [
    { japanese: "店で買い物をします。", french: "Je fais des courses au magasin." },
    { japanese: "あの店は安いです。", french: "Ce magasin est bon marche." }
  ],
  "駅": [
    { japanese: "駅はどこですか。", french: "Ou est la gare?" },
    { japanese: "駅まで歩きます。", french: "Je marche jusqu'a la gare." }
  ],
  "空港": [
    { japanese: "空港に行きます。", french: "Je vais a l'aeroport." },
    { japanese: "空港は遠いです。", french: "L'aeroport est loin." }
  ],
  "病院": [
    { japanese: "病院に行きます。", french: "Je vais a l'hopital." },
    { japanese: "病院は近いですか。", french: "L'hopital est-il proche?" }
  ],
  "銀行": [
    { japanese: "銀行でお金を下ろします。", french: "Je retire de l'argent a la banque." },
    { japanese: "銀行は何時まで開いていますか。", french: "Jusqu'a quelle heure la banque est-elle ouverte?" }
  ],
  "図書館": [
    { japanese: "図書館で本を借ります。", french: "J'emprunte des livres a la bibliotheque." },
    { japanese: "図書館で勉強します。", french: "J'etudie a la bibliotheque." }
  ],
  "公園": [
    { japanese: "公園を散歩します。", french: "Je me promene dans le parc." },
    { japanese: "公園で遊びましょう。", french: "Jouons dans le parc." }
  ],
  "映画館": [
    { japanese: "映画館に行きます。", french: "Je vais au cinema." },
    { japanese: "映画館は混んでいます。", french: "Le cinema est bonde." }
  ],
  "レストラン": [
    { japanese: "レストランで食事します。", french: "Je mange au restaurant." },
    { japanese: "このレストランは美味しいです。", french: "Ce restaurant est delicieux." }
  ],

  // Time words
  "朝": [
    { japanese: "朝、起きます。", french: "Je me leve le matin." },
    { japanese: "朝は忙しいです。", french: "Le matin est charge." }
  ],
  "昼": [
    { japanese: "昼は暑いです。", french: "Il fait chaud a midi." },
    { japanese: "昼に会いましょう。", french: "Retrouvons-nous a midi." }
  ],
  "夕方": [
    { japanese: "夕方に帰ります。", french: "Je rentre en fin d'apres-midi." },
    { japanese: "夕方は涼しいです。", french: "Il fait frais en fin d'apres-midi." }
  ],
  "夜": [
    { japanese: "夜、勉強します。", french: "J'etudie le soir." },
    { japanese: "夜は静かです。", french: "La nuit est calme." }
  ],
  "週末": [
    { japanese: "週末は何をしますか。", french: "Que faites-vous ce week-end?" },
    { japanese: "週末は休みです。", french: "Le week-end est un jour de repos." }
  ],
  "平日": [
    { japanese: "平日は仕事です。", french: "Je travaille en semaine." },
    { japanese: "平日は忙しいです。", french: "La semaine est chargee." }
  ],
  "休日": [
    { japanese: "休日は何をしますか。", french: "Que faites-vous les jours de conge?" },
    { japanese: "休日にゆっくりします。", french: "Je me repose les jours de conge." }
  ],
  "去年": [
    { japanese: "去年、日本に行きました。", french: "Je suis alle au Japon l'annee derniere." },
    { japanese: "去年は忙しかったです。", french: "L'annee derniere etait chargee." }
  ],
  "先週": [
    { japanese: "先週、友達に会いました。", french: "J'ai vu mon ami la semaine derniere." },
    { japanese: "先週は雨でした。", french: "Il a plu la semaine derniere." }
  ],
  "先月": [
    { japanese: "先月、引っ越しました。", french: "J'ai demenage le mois dernier." },
    { japanese: "先月は寒かったです。", french: "Le mois dernier etait froid." }
  ],
  "昨日": [
    { japanese: "昨日、映画を見ました。", french: "J'ai vu un film hier." },
    { japanese: "昨日は忙しかったです。", french: "Hier etait charge." }
  ],
  "明日": [
    { japanese: "明日、会いましょう。", french: "Retrouvons-nous demain." },
    { japanese: "明日は休みです。", french: "Demain est un jour de repos." }
  ],

  // Objects
  "本": [
    { japanese: "本を読みます。", french: "Je lis un livre." },
    { japanese: "この本は面白いです。", french: "Ce livre est interessant." }
  ],
  "新聞": [
    { japanese: "新聞を読みます。", french: "Je lis le journal." },
    { japanese: "新聞を買いました。", french: "J'ai achete un journal." }
  ],
  "雑誌": [
    { japanese: "雑誌を読んでいます。", french: "Je lis un magazine." },
    { japanese: "雑誌を買いました。", french: "J'ai achete un magazine." }
  ],
  "写真": [
    { japanese: "写真を撮ります。", french: "Je prends une photo." },
    { japanese: "写真を見せてください。", french: "Montrez-moi la photo." }
  ],
  "映画": [
    { japanese: "映画を見ます。", french: "Je regarde un film." },
    { japanese: "この映画は面白いです。", french: "Ce film est interessant." }
  ],
  "音楽": [
    { japanese: "音楽を聞きます。", french: "J'ecoute de la musique." },
    { japanese: "音楽が好きです。", french: "J'aime la musique." }
  ],
  "歌": [
    { japanese: "歌を歌います。", french: "Je chante une chanson." },
    { japanese: "この歌は有名です。", french: "Cette chanson est celebre." }
  ],
  "絵": [
    { japanese: "絵を描きます。", french: "Je dessine." },
    { japanese: "この絵はきれいです。", french: "Ce tableau est beau." }
  ],
  "紙": [
    { japanese: "紙に書いてください。", french: "Ecrivez sur le papier." },
    { japanese: "紙がありません。", french: "Il n'y a pas de papier." }
  ],
  "鉛筆": [
    { japanese: "鉛筆で書きます。", french: "J'ecris au crayon." },
    { japanese: "鉛筆を貸してください。", french: "Pretez-moi un crayon." }
  ],
  "ペン": [
    { japanese: "ペンで書いてください。", french: "Ecrivez au stylo." },
    { japanese: "ペンがありますか。", french: "Avez-vous un stylo?" }
  ],
  "かばん": [
    { japanese: "かばんを持っています。", french: "Je porte un sac." },
    { japanese: "かばんは重いです。", french: "Le sac est lourd." }
  ],
  "傘": [
    { japanese: "傘を持っていますか。", french: "Avez-vous un parapluie?" },
    { japanese: "傘を忘れました。", french: "J'ai oublie mon parapluie." }
  ],
  "鍵": [
    { japanese: "鍵をなくしました。", french: "J'ai perdu mes cles." },
    { japanese: "鍵を持っていますか。", french: "Avez-vous les cles?" }
  ],
  "財布": [
    { japanese: "財布を忘れました。", french: "J'ai oublie mon portefeuille." },
    { japanese: "財布がありません。", french: "Je n'ai pas mon portefeuille." }
  ],
  "時計": [
    { japanese: "時計を見てください。", french: "Regardez la montre." },
    { japanese: "時計が止まりました。", french: "La montre s'est arretee." }
  ],
  "眼鏡": [
    { japanese: "眼鏡をかけています。", french: "Je porte des lunettes." },
    { japanese: "眼鏡をなくしました。", french: "J'ai perdu mes lunettes." }
  ],
  "服": [
    { japanese: "服を買います。", french: "J'achete des vetements." },
    { japanese: "新しい服を着ています。", french: "Je porte de nouveaux vetements." }
  ],
  "靴": [
    { japanese: "靴を履きます。", french: "Je mets mes chaussures." },
    { japanese: "新しい靴を買いました。", french: "J'ai achete de nouvelles chaussures." }
  ],
  "帽子": [
    { japanese: "帽子をかぶっています。", french: "Je porte un chapeau." },
    { japanese: "帽子を取ってください。", french: "Enlevez votre chapeau." }
  ],
};

// Function to generate sentences for vocabulary that isn't in our database
function generateGenericSentences(word: string, meaningsFr: string[]): ExampleSentence[] {
  const meaning = meaningsFr[0];

  // Generic sentence patterns
  const patterns = [
    { japanese: `${word}があります。`, french: `Il y a ${meaning.toLowerCase()}.` },
    { japanese: `${word}を見ました。`, french: `J'ai vu ${meaning.toLowerCase()}.` },
  ];

  return patterns.slice(0, 2);
}

async function main() {
  console.log("========================================");
  console.log("ADDING EXAMPLE SENTENCES TO VOCABULARY");
  console.log("========================================\n");

  // Get all vocabulary items from levels 1-20 without example sentences
  const vocabularyWithoutSentences = await prisma.vocabulary.findMany({
    where: {
      levelId: { lte: 20 },
      OR: [
        { sentenceJp: null },
        { sentenceJp: "" },
      ],
    },
    orderBy: [
      { levelId: "asc" },
      { id: "asc" },
    ],
  });

  console.log(`Found ${vocabularyWithoutSentences.length} vocabulary items without example sentences (levels 1-20)\n`);

  // Also get items that have a single sentence but could benefit from more
  const vocabularyWithOneSentence = await prisma.vocabulary.findMany({
    where: {
      levelId: { lte: 20 },
      sentenceJp: { not: null },
      NOT: { sentenceJp: "" },
    },
    orderBy: [
      { levelId: "asc" },
      { id: "asc" },
    ],
  });

  console.log(`Found ${vocabularyWithOneSentence.length} vocabulary items with existing sentences (levels 1-20)\n`);

  const BATCH_SIZE = 50;
  let updatedCount = 0;
  let skippedCount = 0;
  let convertedCount = 0;

  // First, convert existing single sentences to JSON array format
  console.log("Converting existing sentences to JSON array format...\n");

  for (let i = 0; i < vocabularyWithOneSentence.length; i += BATCH_SIZE) {
    const batch = vocabularyWithOneSentence.slice(i, i + BATCH_SIZE);

    for (const vocab of batch) {
      // Check if it's already in JSON format
      if (vocab.sentenceJp?.startsWith("[")) {
        continue;
      }

      // Convert single sentence to JSON array format
      const sentences: ExampleSentence[] = [];

      // Add the existing sentence
      if (vocab.sentenceJp && vocab.sentenceFr) {
        sentences.push({
          japanese: vocab.sentenceJp,
          french: vocab.sentenceFr,
        });
      }

      // Add additional sentences from our database if available
      const additionalSentences = EXAMPLE_SENTENCES[vocab.word];
      if (additionalSentences) {
        for (const sentence of additionalSentences) {
          // Avoid duplicates
          if (!sentences.some(s => s.japanese === sentence.japanese)) {
            sentences.push(sentence);
            if (sentences.length >= 2) break;
          }
        }
      }

      if (sentences.length > 0) {
        await prisma.vocabulary.update({
          where: { id: vocab.id },
          data: {
            sentenceJp: JSON.stringify(sentences),
            sentenceFr: JSON.stringify(sentences.map(s => s.french)),
          },
        });
        convertedCount++;
      }
    }

    console.log(`Converted batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(vocabularyWithOneSentence.length / BATCH_SIZE)}`);
  }

  console.log(`\nConverted ${convertedCount} existing sentences to JSON format.\n`);

  // Now add sentences to vocabulary without any
  console.log("Adding sentences to vocabulary without examples...\n");

  for (let i = 0; i < vocabularyWithoutSentences.length; i += BATCH_SIZE) {
    const batch = vocabularyWithoutSentences.slice(i, i + BATCH_SIZE);

    for (const vocab of batch) {
      // Look up sentences from our database
      let sentences = EXAMPLE_SENTENCES[vocab.word];

      if (!sentences || sentences.length === 0) {
        // Generate generic sentences if not in our database
        sentences = generateGenericSentences(vocab.word, vocab.meaningsFr);
        skippedCount++;
      }

      if (sentences && sentences.length > 0) {
        await prisma.vocabulary.update({
          where: { id: vocab.id },
          data: {
            sentenceJp: JSON.stringify(sentences.slice(0, 2)),
            sentenceFr: JSON.stringify(sentences.slice(0, 2).map(s => s.french)),
          },
        });
        updatedCount++;
      }
    }

    console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(vocabularyWithoutSentences.length / BATCH_SIZE)}`);
  }

  console.log("\n========================================");
  console.log("SUMMARY");
  console.log("========================================");
  console.log(`Converted to JSON format: ${convertedCount}`);
  console.log(`Added new sentences: ${updatedCount}`);
  console.log(`Used generic sentences for: ${skippedCount} items (no specific sentences available)`);
  console.log("========================================\n");

  // Verify the results
  const afterCount = await prisma.vocabulary.count({
    where: {
      levelId: { lte: 20 },
      sentenceJp: { not: null },
      NOT: { sentenceJp: "" },
    },
  });

  const totalCount = await prisma.vocabulary.count({
    where: { levelId: { lte: 20 } },
  });

  console.log(`Final coverage: ${afterCount}/${totalCount} vocabulary items have example sentences (${(afterCount / totalCount * 100).toFixed(1)}%)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
