import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Business & Formal Vocabulary for French Speakers - Part 1 (Meetings & Organization)
const vocabPart1 = [
  // 会 (Rencontre/Réunion) compounds
  { word: "会議", meanings: ["Réunion", "Conférence"], readings: ["かいぎ"], mnemonicFr: "RÉUNION - rassemblement pour discuter d'affaires.", targetKanji: ["会", "議"] },
  { word: "会場", meanings: ["Lieu de réunion", "Salle"], readings: ["かいじょう"], mnemonicFr: "SALLE - endroit où se tient un événement.", targetKanji: ["会", "場"] },
  { word: "会員", meanings: ["Membre"], readings: ["かいいん"], mnemonicFr: "MEMBRE - personne faisant partie d'un groupe.", targetKanji: ["会", "員"] },
  { word: "会費", meanings: ["Cotisation"], readings: ["かいひ"], mnemonicFr: "COTISATION - frais d'adhésion.", targetKanji: ["会", "費"] },
  { word: "会長", meanings: ["Président"], readings: ["かいちょう"], mnemonicFr: "PRÉSIDENT - chef d'une organisation.", targetKanji: ["会", "長"] },
  { word: "会合", meanings: ["Assemblée", "Réunion"], readings: ["かいごう"], mnemonicFr: "ASSEMBLÉE - rassemblement de personnes.", targetKanji: ["会", "合"] },
  { word: "司会", meanings: ["Animation", "Maître de cérémonie"], readings: ["しかい"], mnemonicFr: "ANIMATION - diriger une réunion ou un événement.", targetKanji: ["司", "会"] },
  { word: "総会", meanings: ["Assemblée générale"], readings: ["そうかい"], mnemonicFr: "ASSEMBLÉE GÉNÉRALE - réunion de tous les membres.", targetKanji: ["総", "会"] },

  // 社 (Entreprise) compounds
  { word: "社長", meanings: ["PDG", "Directeur général"], readings: ["しゃちょう"], mnemonicFr: "PDG - chef d'une entreprise.", targetKanji: ["社", "長"] },
  { word: "社員", meanings: ["Employé"], readings: ["しゃいん"], mnemonicFr: "EMPLOYÉ - personne travaillant dans une entreprise.", targetKanji: ["社", "員"] },
  { word: "会社員", meanings: ["Salarié", "Employé de bureau"], readings: ["かいしゃいん"], mnemonicFr: "SALARIÉ - personne travaillant pour une société.", targetKanji: ["会", "社", "員"] },
  { word: "本社", meanings: ["Siège social"], readings: ["ほんしゃ"], mnemonicFr: "SIÈGE SOCIAL - bureau principal d'une entreprise.", targetKanji: ["本", "社"] },
  { word: "支社", meanings: ["Succursale"], readings: ["ししゃ"], mnemonicFr: "SUCCURSALE - bureau secondaire.", targetKanji: ["支", "社"] },
  { word: "入社", meanings: ["Entrée dans une entreprise"], readings: ["にゅうしゃ"], mnemonicFr: "ENTRÉE - rejoindre une entreprise.", targetKanji: ["入", "社"] },
  { word: "退社", meanings: ["Quitter l'entreprise"], readings: ["たいしゃ"], mnemonicFr: "DÉPART - quitter son emploi.", targetKanji: ["退", "社"] },

  // Hierarchy titles
  { word: "部長", meanings: ["Chef de département"], readings: ["ぶちょう"], mnemonicFr: "CHEF DE DÉPARTEMENT - responsable d'un service.", targetKanji: ["部", "長"] },
  { word: "課長", meanings: ["Chef de section"], readings: ["かちょう"], mnemonicFr: "CHEF DE SECTION - responsable d'une équipe.", targetKanji: ["課", "長"] },
  { word: "係長", meanings: ["Chef d'équipe"], readings: ["かかりちょう"], mnemonicFr: "CHEF D'ÉQUIPE - superviseur direct.", targetKanji: ["係", "長"] },
  { word: "主任", meanings: ["Responsable", "Chef de projet"], readings: ["しゅにん"], mnemonicFr: "RESPONSABLE - personne en charge.", targetKanji: ["主", "任"] },
  { word: "専務", meanings: ["Directeur exécutif"], readings: ["せんむ"], mnemonicFr: "DIRECTEUR EXÉCUTIF - cadre supérieur.", targetKanji: ["専", "務"] },
  { word: "常務", meanings: ["Directeur général adjoint"], readings: ["じょうむ"], mnemonicFr: "DIRECTEUR ADJOINT - second du PDG.", targetKanji: ["常", "務"] },

  // 仕 (Service/Travail) compounds
  { word: "仕事", meanings: ["Travail"], readings: ["しごと"], mnemonicFr: "TRAVAIL - activité professionnelle.", targetKanji: ["仕", "事"] },
  { word: "仕方", meanings: ["Manière de faire", "Méthode"], readings: ["しかた"], mnemonicFr: "MÉTHODE - façon de procéder.", targetKanji: ["仕", "方"] },
  { word: "仕上げ", meanings: ["Finition"], readings: ["しあげ"], mnemonicFr: "FINITION - dernière étape du travail.", targetKanji: ["仕", "上"] },
  { word: "仕入れ", meanings: ["Approvisionnement"], readings: ["しいれ"], mnemonicFr: "APPROVISIONNEMENT - acheter des marchandises.", targetKanji: ["仕", "入"] },
  { word: "仕組み", meanings: ["Structure", "Mécanisme"], readings: ["しくみ"], mnemonicFr: "MÉCANISME - fonctionnement d'un système.", targetKanji: ["仕", "組"] },
  { word: "仕様", meanings: ["Spécifications"], readings: ["しよう"], mnemonicFr: "SPÉCIFICATIONS - détails techniques.", targetKanji: ["仕", "様"] },

  // 名 (Nom) compounds
  { word: "名前", meanings: ["Nom", "Prénom"], readings: ["なまえ"], mnemonicFr: "NOM - appellation d'une personne.", targetKanji: ["名", "前"] },
  { word: "名人", meanings: ["Expert", "Maître"], readings: ["めいじん"], mnemonicFr: "EXPERT - personne très compétente.", targetKanji: ["名", "人"] },
  { word: "名作", meanings: ["Chef-d'oeuvre"], readings: ["めいさく"], mnemonicFr: "CHEF-D'OEUVRE - oeuvre remarquable.", targetKanji: ["名", "作"] },
  { word: "名所", meanings: ["Lieu célèbre"], readings: ["めいしょ"], mnemonicFr: "LIEU CÉLÈBRE - endroit touristique.", targetKanji: ["名", "所"] },
  { word: "有名", meanings: ["Célèbre"], readings: ["ゆうめい"], mnemonicFr: "CÉLÈBRE - connu de tous.", targetKanji: ["有", "名"] },
  { word: "名刺", meanings: ["Carte de visite"], readings: ["めいし"], mnemonicFr: "CARTE DE VISITE - carte professionnelle.", targetKanji: ["名", "刺"] },
  { word: "氏名", meanings: ["Nom complet"], readings: ["しめい"], mnemonicFr: "NOM COMPLET - nom et prénom officiels.", targetKanji: ["氏", "名"] },
  { word: "署名", meanings: ["Signature"], readings: ["しょめい"], mnemonicFr: "SIGNATURE - signer un document.", targetKanji: ["署", "名"] },
];

// Part 2: Applications & Requests
const vocabPart2 = [
  // 申 (Déclarer) compounds
  { word: "申し込み", meanings: ["Candidature", "Inscription"], readings: ["もうしこみ"], mnemonicFr: "CANDIDATURE - demande officielle.", targetKanji: ["申", "込"] },
  { word: "申し出", meanings: ["Proposition", "Offre"], readings: ["もうしで"], mnemonicFr: "PROPOSITION - offrir quelque chose.", targetKanji: ["申", "出"] },
  { word: "申請", meanings: ["Demande officielle"], readings: ["しんせい"], mnemonicFr: "DEMANDE OFFICIELLE - formulaire administratif.", targetKanji: ["申", "請"] },
  { word: "申告", meanings: ["Déclaration"], readings: ["しんこく"], mnemonicFr: "DÉCLARATION - déclarer officiellement.", targetKanji: ["申", "告"] },
  { word: "申し訳", meanings: ["Excuse"], readings: ["もうしわけ"], mnemonicFr: "EXCUSE - présenter ses excuses.", targetKanji: ["申", "訳"] },

  // 連 (Lien) compounds
  { word: "連絡", meanings: ["Contact", "Communication"], readings: ["れんらく"], mnemonicFr: "CONTACT - communiquer avec quelqu'un.", targetKanji: ["連", "絡"] },
  { word: "連続", meanings: ["Succession", "Série"], readings: ["れんぞく"], mnemonicFr: "SUCCESSION - suite continue.", targetKanji: ["連", "続"] },
  { word: "連休", meanings: ["Jours fériés consécutifs"], readings: ["れんきゅう"], mnemonicFr: "JOURS FÉRIÉS - vacances continues.", targetKanji: ["連", "休"] },
  { word: "連携", meanings: ["Coopération"], readings: ["れんけい"], mnemonicFr: "COOPÉRATION - travailler ensemble.", targetKanji: ["連", "携"] },

  // 関 (Relation) compounds
  { word: "関連", meanings: ["Lien", "Rapport"], readings: ["かんれん"], mnemonicFr: "LIEN - connexion entre deux choses.", targetKanji: ["関", "連"] },
  { word: "関心", meanings: ["Intérêt"], readings: ["かんしん"], mnemonicFr: "INTÉRÊT - attention portée à quelque chose.", targetKanji: ["関", "心"] },
  { word: "関係者", meanings: ["Personne concernée"], readings: ["かんけいしゃ"], mnemonicFr: "PERSONNE CONCERNÉE - partie prenante.", targetKanji: ["関", "係", "者"] },
  { word: "機関", meanings: ["Organisation", "Institution"], readings: ["きかん"], mnemonicFr: "INSTITUTION - organisme officiel.", targetKanji: ["機", "関"] },
  { word: "税関", meanings: ["Douane"], readings: ["ぜいかん"], mnemonicFr: "DOUANE - contrôle aux frontières.", targetKanji: ["税", "関"] },

  // 報 (Rapport) compounds
  { word: "報告", meanings: ["Rapport", "Compte-rendu"], readings: ["ほうこく"], mnemonicFr: "RAPPORT - présenter les résultats.", targetKanji: ["報", "告"] },
  { word: "報道", meanings: ["Reportage", "Information"], readings: ["ほうどう"], mnemonicFr: "REPORTAGE - diffuser des nouvelles.", targetKanji: ["報", "道"] },
  { word: "天気予報", meanings: ["Prévisions météo"], readings: ["てんきよほう"], mnemonicFr: "MÉTÉO - prévisions du temps.", targetKanji: ["天", "気", "予", "報"] },
  { word: "速報", meanings: ["Flash info"], readings: ["そくほう"], mnemonicFr: "FLASH INFO - nouvelle urgente.", targetKanji: ["速", "報"] },
  { word: "日報", meanings: ["Rapport quotidien"], readings: ["にっぽう"], mnemonicFr: "RAPPORT QUOTIDIEN - compte-rendu journalier.", targetKanji: ["日", "報"] },
  { word: "週報", meanings: ["Rapport hebdomadaire"], readings: ["しゅうほう"], mnemonicFr: "RAPPORT HEBDOMADAIRE - compte-rendu de la semaine.", targetKanji: ["週", "報"] },

  // 確 (Certain) compounds
  { word: "確認", meanings: ["Confirmation", "Vérification"], readings: ["かくにん"], mnemonicFr: "CONFIRMATION - s'assurer de quelque chose.", targetKanji: ["確", "認"] },
  { word: "確実", meanings: ["Certain", "Sûr"], readings: ["かくじつ"], mnemonicFr: "CERTAIN - sans aucun doute.", targetKanji: ["確", "実"] },
  { word: "確定", meanings: ["Fixation", "Définitif"], readings: ["かくてい"], mnemonicFr: "DÉFINITIF - décision finale.", targetKanji: ["確", "定"] },
  { word: "確保", meanings: ["Sécurisation"], readings: ["かくほ"], mnemonicFr: "SÉCURISATION - s'assurer d'avoir.", targetKanji: ["確", "保"] },
  { word: "正確", meanings: ["Exact", "Précis"], readings: ["せいかく"], mnemonicFr: "EXACT - sans erreur.", targetKanji: ["正", "確"] },
  { word: "明確", meanings: ["Clair", "Net"], readings: ["めいかく"], mnemonicFr: "CLAIR - sans ambiguïté.", targetKanji: ["明", "確"] },

  // 担 (Porter) compounds
  { word: "担当者", meanings: ["Responsable"], readings: ["たんとうしゃ"], mnemonicFr: "RESPONSABLE - personne en charge.", targetKanji: ["担", "当", "者"] },
  { word: "担任", meanings: ["Professeur principal"], readings: ["たんにん"], mnemonicFr: "PROFESSEUR PRINCIPAL - enseignant responsable d'une classe.", targetKanji: ["担", "任"] },
  { word: "負担", meanings: ["Charge", "Fardeau"], readings: ["ふたん"], mnemonicFr: "CHARGE - responsabilité à porter.", targetKanji: ["負", "担"] },
  { word: "分担", meanings: ["Répartition"], readings: ["ぶんたん"], mnemonicFr: "RÉPARTITION - partager les tâches.", targetKanji: ["分", "担"] },
];

// Part 3: Explanations & Documents
const vocabPart3 = [
  // 説 (Expliquer) compounds
  { word: "解説", meanings: ["Commentaire", "Explication"], readings: ["かいせつ"], mnemonicFr: "COMMENTAIRE - expliquer en détail.", targetKanji: ["解", "説"] },
  { word: "小説", meanings: ["Roman"], readings: ["しょうせつ"], mnemonicFr: "ROMAN - livre de fiction.", targetKanji: ["小", "説"] },
  { word: "説得", meanings: ["Persuasion"], readings: ["せっとく"], mnemonicFr: "PERSUASION - convaincre quelqu'un.", targetKanji: ["説", "得"] },
  { word: "伝説", meanings: ["Légende"], readings: ["でんせつ"], mnemonicFr: "LÉGENDE - histoire traditionnelle.", targetKanji: ["伝", "説"] },
  { word: "仮説", meanings: ["Hypothèse"], readings: ["かせつ"], mnemonicFr: "HYPOTHÈSE - théorie à vérifier.", targetKanji: ["仮", "説"] },

  // 資料 compounds
  { word: "資料", meanings: ["Document", "Données"], readings: ["しりょう"], mnemonicFr: "DOCUMENT - informations de référence.", targetKanji: ["資", "料"] },
  { word: "材料", meanings: ["Matériau", "Ingrédient"], readings: ["ざいりょう"], mnemonicFr: "MATÉRIAU - élément de base.", targetKanji: ["材", "料"] },
  { word: "原料", meanings: ["Matière première"], readings: ["げんりょう"], mnemonicFr: "MATIÈRE PREMIÈRE - ingrédient brut.", targetKanji: ["原", "料"] },
  { word: "料金", meanings: ["Tarif", "Frais"], readings: ["りょうきん"], mnemonicFr: "TARIF - prix à payer.", targetKanji: ["料", "金"] },
  { word: "無料", meanings: ["Gratuit"], readings: ["むりょう"], mnemonicFr: "GRATUIT - sans frais.", targetKanji: ["無", "料"] },
  { word: "有料", meanings: ["Payant"], readings: ["ゆうりょう"], mnemonicFr: "PAYANT - avec frais.", targetKanji: ["有", "料"] },

  // 製品 compounds
  { word: "製造", meanings: ["Fabrication"], readings: ["せいぞう"], mnemonicFr: "FABRICATION - produire industriellement.", targetKanji: ["製", "造"] },
  { word: "製作", meanings: ["Production"], readings: ["せいさく"], mnemonicFr: "PRODUCTION - créer quelque chose.", targetKanji: ["製", "作"] },
  { word: "品質", meanings: ["Qualité"], readings: ["ひんしつ"], mnemonicFr: "QUALITÉ - niveau d'excellence.", targetKanji: ["品", "質"] },
  { word: "品物", meanings: ["Article", "Marchandise"], readings: ["しなもの"], mnemonicFr: "ARTICLE - objet à vendre.", targetKanji: ["品", "物"] },
  { word: "食品", meanings: ["Produit alimentaire"], readings: ["しょくひん"], mnemonicFr: "PRODUIT ALIMENTAIRE - nourriture.", targetKanji: ["食", "品"] },
  { word: "部品", meanings: ["Pièce détachée"], readings: ["ぶひん"], mnemonicFr: "PIÈCE DÉTACHÉE - composant.", targetKanji: ["部", "品"] },

  // 契約 compounds
  { word: "契約", meanings: ["Contrat"], readings: ["けいやく"], mnemonicFr: "CONTRAT - accord légal.", targetKanji: ["契", "約"] },
  { word: "契機", meanings: ["Occasion", "Opportunité"], readings: ["けいき"], mnemonicFr: "OCCASION - moment favorable.", targetKanji: ["契", "機"] },
  { word: "約束", meanings: ["Promesse"], readings: ["やくそく"], mnemonicFr: "PROMESSE - engagement verbal.", targetKanji: ["約", "束"] },
  { word: "予約", meanings: ["Réservation"], readings: ["よやく"], mnemonicFr: "RÉSERVATION - réserver à l'avance.", targetKanji: ["予", "約"] },
  { word: "条約", meanings: ["Traité"], readings: ["じょうやく"], mnemonicFr: "TRAITÉ - accord international.", targetKanji: ["条", "約"] },

  // 提 (Présenter) compounds
  { word: "提案", meanings: ["Proposition"], readings: ["ていあん"], mnemonicFr: "PROPOSITION - suggérer une idée.", targetKanji: ["提", "案"] },
  { word: "提出", meanings: ["Soumission"], readings: ["ていしゅつ"], mnemonicFr: "SOUMISSION - remettre un document.", targetKanji: ["提", "出"] },
  { word: "提示", meanings: ["Présentation"], readings: ["ていじ"], mnemonicFr: "PRÉSENTATION - montrer officiellement.", targetKanji: ["提", "示"] },
  { word: "前提", meanings: ["Prémisse"], readings: ["ぜんてい"], mnemonicFr: "PRÉMISSE - condition préalable.", targetKanji: ["前", "提"] },
];

// Part 4: Business Operations
const vocabPart4 = [
  // 営業 (Ventes/Commerce)
  { word: "営業", meanings: ["Commerce", "Ventes"], readings: ["えいぎょう"], mnemonicFr: "COMMERCE - activité commerciale.", targetKanji: ["営", "業"] },
  { word: "営業所", meanings: ["Bureau commercial"], readings: ["えいぎょうしょ"], mnemonicFr: "BUREAU COMMERCIAL - point de vente.", targetKanji: ["営", "業", "所"] },
  { word: "営業時間", meanings: ["Heures d'ouverture"], readings: ["えいぎょうじかん"], mnemonicFr: "HEURES D'OUVERTURE - horaires de service.", targetKanji: ["営", "業", "時", "間"] },
  { word: "経営", meanings: ["Gestion", "Management"], readings: ["けいえい"], mnemonicFr: "GESTION - diriger une entreprise.", targetKanji: ["経", "営"] },
  { word: "経営者", meanings: ["Dirigeant"], readings: ["けいえいしゃ"], mnemonicFr: "DIRIGEANT - chef d'entreprise.", targetKanji: ["経", "営", "者"] },

  // 取引 (Transaction)
  { word: "取引", meanings: ["Transaction"], readings: ["とりひき"], mnemonicFr: "TRANSACTION - échange commercial.", targetKanji: ["取", "引"] },
  { word: "取引先", meanings: ["Client", "Partenaire commercial"], readings: ["とりひきさき"], mnemonicFr: "PARTENAIRE COMMERCIAL - entreprise cliente.", targetKanji: ["取", "引", "先"] },
  { word: "取り消し", meanings: ["Annulation"], readings: ["とりけし"], mnemonicFr: "ANNULATION - annuler une commande.", targetKanji: ["取", "消"] },
  { word: "取り扱い", meanings: ["Manipulation", "Traitement"], readings: ["とりあつかい"], mnemonicFr: "TRAITEMENT - façon de gérer.", targetKanji: ["取", "扱"] },

  // 注文 (Commande)
  { word: "注文", meanings: ["Commande"], readings: ["ちゅうもん"], mnemonicFr: "COMMANDE - passer une commande.", targetKanji: ["注", "文"] },
  { word: "発注", meanings: ["Passer commande"], readings: ["はっちゅう"], mnemonicFr: "PASSER COMMANDE - commander officiellement.", targetKanji: ["発", "注"] },
  { word: "受注", meanings: ["Réception de commande"], readings: ["じゅちゅう"], mnemonicFr: "RÉCEPTION DE COMMANDE - recevoir une commande.", targetKanji: ["受", "注"] },

  // 売買 (Achat/Vente)
  { word: "売上", meanings: ["Chiffre d'affaires"], readings: ["うりあげ"], mnemonicFr: "CHIFFRE D'AFFAIRES - total des ventes.", targetKanji: ["売", "上"] },
  { word: "売り場", meanings: ["Rayon", "Point de vente"], readings: ["うりば"], mnemonicFr: "RAYON - espace de vente.", targetKanji: ["売", "場"] },
  { word: "販売", meanings: ["Vente"], readings: ["はんばい"], mnemonicFr: "VENTE - commercialiser.", targetKanji: ["販", "売"] },
  { word: "購入", meanings: ["Achat"], readings: ["こうにゅう"], mnemonicFr: "ACHAT - acheter quelque chose.", targetKanji: ["購", "入"] },
  { word: "仕入れ先", meanings: ["Fournisseur"], readings: ["しいれさき"], mnemonicFr: "FOURNISSEUR - source d'approvisionnement.", targetKanji: ["仕", "入", "先"] },

  // 予算 (Budget)
  { word: "予算", meanings: ["Budget"], readings: ["よさん"], mnemonicFr: "BUDGET - somme prévue.", targetKanji: ["予", "算"] },
  { word: "決算", meanings: ["Bilan financier"], readings: ["けっさん"], mnemonicFr: "BILAN FINANCIER - résultats comptables.", targetKanji: ["決", "算"] },
  { word: "計算", meanings: ["Calcul"], readings: ["けいさん"], mnemonicFr: "CALCUL - opération mathématique.", targetKanji: ["計", "算"] },
  { word: "精算", meanings: ["Règlement", "Solde"], readings: ["せいさん"], mnemonicFr: "RÈGLEMENT - payer le solde.", targetKanji: ["精", "算"] },

  // 利益 (Profit)
  { word: "利益", meanings: ["Profit", "Bénéfice"], readings: ["りえき"], mnemonicFr: "PROFIT - gain financier.", targetKanji: ["利", "益"] },
  { word: "収益", meanings: ["Revenus"], readings: ["しゅうえき"], mnemonicFr: "REVENUS - argent gagné.", targetKanji: ["収", "益"] },
  { word: "損益", meanings: ["Pertes et profits"], readings: ["そんえき"], mnemonicFr: "PERTES ET PROFITS - résultat financier.", targetKanji: ["損", "益"] },
  { word: "有益", meanings: ["Utile", "Bénéfique"], readings: ["ゆうえき"], mnemonicFr: "UTILE - qui apporte un avantage.", targetKanji: ["有", "益"] },
];

// Part 5: Communication & Procedures
const vocabPart5 = [
  // 手続き (Procédures)
  { word: "手続き", meanings: ["Procédure", "Formalités"], readings: ["てつづき"], mnemonicFr: "PROCÉDURE - démarches administratives.", targetKanji: ["手", "続"] },
  { word: "手順", meanings: ["Étapes", "Procédure"], readings: ["てじゅん"], mnemonicFr: "ÉTAPES - ordre des opérations.", targetKanji: ["手", "順"] },
  { word: "手配", meanings: ["Arrangement"], readings: ["てはい"], mnemonicFr: "ARRANGEMENT - organiser à l'avance.", targetKanji: ["手", "配"] },
  { word: "手段", meanings: ["Moyen"], readings: ["しゅだん"], mnemonicFr: "MOYEN - méthode pour atteindre un but.", targetKanji: ["手", "段"] },

  // 書類 (Documents)
  { word: "書類", meanings: ["Documents"], readings: ["しょるい"], mnemonicFr: "DOCUMENTS - papiers officiels.", targetKanji: ["書", "類"] },
  { word: "書式", meanings: ["Format", "Formulaire"], readings: ["しょしき"], mnemonicFr: "FORMAT - modèle de document.", targetKanji: ["書", "式"] },
  { word: "申請書", meanings: ["Formulaire de demande"], readings: ["しんせいしょ"], mnemonicFr: "FORMULAIRE - document de demande.", targetKanji: ["申", "請", "書"] },
  { word: "見積書", meanings: ["Devis"], readings: ["みつもりしょ"], mnemonicFr: "DEVIS - estimation de prix.", targetKanji: ["見", "積", "書"] },
  { word: "請求書", meanings: ["Facture"], readings: ["せいきゅうしょ"], mnemonicFr: "FACTURE - demande de paiement.", targetKanji: ["請", "求", "書"] },
  { word: "領収書", meanings: ["Reçu"], readings: ["りょうしゅうしょ"], mnemonicFr: "REÇU - preuve de paiement.", targetKanji: ["領", "収", "書"] },

  // 議論 (Discussion)
  { word: "議論", meanings: ["Discussion", "Débat"], readings: ["ぎろん"], mnemonicFr: "DÉBAT - échange d'opinions.", targetKanji: ["議", "論"] },
  { word: "議題", meanings: ["Sujet de discussion"], readings: ["ぎだい"], mnemonicFr: "SUJET - thème à discuter.", targetKanji: ["議", "題"] },
  { word: "議事録", meanings: ["Procès-verbal"], readings: ["ぎじろく"], mnemonicFr: "PROCÈS-VERBAL - compte-rendu de réunion.", targetKanji: ["議", "事", "録"] },
  { word: "会議室", meanings: ["Salle de réunion"], readings: ["かいぎしつ"], mnemonicFr: "SALLE DE RÉUNION - pièce pour réunions.", targetKanji: ["会", "議", "室"] },

  // 回答 (Réponse)
  { word: "回答", meanings: ["Réponse"], readings: ["かいとう"], mnemonicFr: "RÉPONSE - répondre à une question.", targetKanji: ["回", "答"] },
  { word: "返答", meanings: ["Réplique"], readings: ["へんとう"], mnemonicFr: "RÉPLIQUE - répondre en retour.", targetKanji: ["返", "答"] },
  { word: "解答", meanings: ["Solution"], readings: ["かいとう"], mnemonicFr: "SOLUTION - réponse à un problème.", targetKanji: ["解", "答"] },

  // 相談 (Consultation)
  { word: "相談窓口", meanings: ["Guichet de conseil"], readings: ["そうだんまどぐち"], mnemonicFr: "GUICHET - point d'accueil.", targetKanji: ["相", "談", "窓", "口"] },
  { word: "商談", meanings: ["Négociation commerciale"], readings: ["しょうだん"], mnemonicFr: "NÉGOCIATION - discussion d'affaires.", targetKanji: ["商", "談"] },
  { word: "面談", meanings: ["Entretien"], readings: ["めんだん"], mnemonicFr: "ENTRETIEN - discussion en personne.", targetKanji: ["面", "談"] },
];

// Part 6: Polite & Formal Expressions
const vocabPart6 = [
  // お礼 (Remerciements)
  { word: "御礼", meanings: ["Remerciement"], readings: ["おれい"], mnemonicFr: "REMERCIEMENT - exprimer sa gratitude.", targetKanji: ["御", "礼"] },
  { word: "失礼", meanings: ["Impolitesse", "Excusez-moi"], readings: ["しつれい"], mnemonicFr: "EXCUSEZ-MOI - formule de politesse.", targetKanji: ["失", "礼"] },
  { word: "礼儀", meanings: ["Politesse", "Étiquette"], readings: ["れいぎ"], mnemonicFr: "ÉTIQUETTE - règles de politesse.", targetKanji: ["礼", "儀"] },

  // 挨拶 (Salutations)
  { word: "挨拶", meanings: ["Salutation"], readings: ["あいさつ"], mnemonicFr: "SALUTATION - formule de politesse.", targetKanji: ["挨", "拶"] },
  { word: "自己紹介", meanings: ["Présentation de soi"], readings: ["じこしょうかい"], mnemonicFr: "PRÉSENTATION - se présenter.", targetKanji: ["自", "己", "紹", "介"] },

  // 敬語 expressions
  { word: "敬語", meanings: ["Langage poli"], readings: ["けいご"], mnemonicFr: "LANGAGE POLI - formes de politesse.", targetKanji: ["敬", "語"] },
  { word: "丁寧", meanings: ["Poli", "Soigné"], readings: ["ていねい"], mnemonicFr: "POLI - fait avec soin.", targetKanji: ["丁", "寧"] },
  { word: "敬意", meanings: ["Respect"], readings: ["けいい"], mnemonicFr: "RESPECT - considération pour autrui.", targetKanji: ["敬", "意"] },

  // 御 prefix
  { word: "御社", meanings: ["Votre entreprise (poli)"], readings: ["おんしゃ"], mnemonicFr: "VOTRE ENTREPRISE - forme respectueuse.", targetKanji: ["御", "社"] },
  { word: "御中", meanings: ["À l'attention de"], readings: ["おんちゅう"], mnemonicFr: "À L'ATTENTION DE - formule d'adresse.", targetKanji: ["御", "中"] },
  { word: "御覧", meanings: ["Regarder (poli)"], readings: ["ごらん"], mnemonicFr: "REGARDER - forme respectueuse de voir.", targetKanji: ["御", "覧"] },

  // お願い (Demandes)
  { word: "お願い", meanings: ["Demande", "S'il vous plaît"], readings: ["おねがい"], mnemonicFr: "S'IL VOUS PLAÎT - formule de demande.", targetKanji: ["願"] },
  { word: "依頼", meanings: ["Demande", "Requête"], readings: ["いらい"], mnemonicFr: "REQUÊTE - demander un service.", targetKanji: ["依", "頼"] },
  { word: "要求", meanings: ["Exigence", "Demande"], readings: ["ようきゅう"], mnemonicFr: "EXIGENCE - demander fermement.", targetKanji: ["要", "求"] },
  { word: "要望", meanings: ["Souhait", "Demande"], readings: ["ようぼう"], mnemonicFr: "SOUHAIT - exprimer un désir.", targetKanji: ["要", "望"] },

  // 承知 (Compréhension)
  { word: "承知", meanings: ["Compris", "Entendu"], readings: ["しょうち"], mnemonicFr: "COMPRIS - accepter une demande.", targetKanji: ["承", "知"] },
  { word: "了解", meanings: ["Compris", "Roger"], readings: ["りょうかい"], mnemonicFr: "COMPRIS - confirmer sa compréhension.", targetKanji: ["了", "解"] },
  { word: "承認", meanings: ["Approbation"], readings: ["しょうにん"], mnemonicFr: "APPROBATION - donner son accord.", targetKanji: ["承", "認"] },
  { word: "認可", meanings: ["Autorisation"], readings: ["にんか"], mnemonicFr: "AUTORISATION - permission officielle.", targetKanji: ["認", "可"] },
];

// Part 7: Time & Schedule
const vocabPart7 = [
  // 日程 (Planning)
  { word: "日程", meanings: ["Programme", "Calendrier"], readings: ["にってい"], mnemonicFr: "PROGRAMME - planning prévu.", targetKanji: ["日", "程"] },
  { word: "予定", meanings: ["Prévu", "Planning"], readings: ["よてい"], mnemonicFr: "PRÉVU - ce qui est planifié.", targetKanji: ["予", "定"] },
  { word: "日時", meanings: ["Date et heure"], readings: ["にちじ"], mnemonicFr: "DATE ET HEURE - moment précis.", targetKanji: ["日", "時"] },
  { word: "期日", meanings: ["Date limite"], readings: ["きじつ"], mnemonicFr: "DATE LIMITE - échéance.", targetKanji: ["期", "日"] },
  { word: "締め切り", meanings: ["Date limite", "Deadline"], readings: ["しめきり"], mnemonicFr: "DEADLINE - dernière échéance.", targetKanji: ["締", "切"] },

  // 期間 (Période)
  { word: "期間", meanings: ["Période", "Durée"], readings: ["きかん"], mnemonicFr: "PÉRIODE - intervalle de temps.", targetKanji: ["期", "間"] },
  { word: "期限", meanings: ["Échéance"], readings: ["きげん"], mnemonicFr: "ÉCHÉANCE - date finale.", targetKanji: ["期", "限"] },
  { word: "長期", meanings: ["Long terme"], readings: ["ちょうき"], mnemonicFr: "LONG TERME - sur une longue période.", targetKanji: ["長", "期"] },
  { word: "短期", meanings: ["Court terme"], readings: ["たんき"], mnemonicFr: "COURT TERME - sur une courte période.", targetKanji: ["短", "期"] },
  { word: "定期", meanings: ["Régulier", "Périodique"], readings: ["ていき"], mnemonicFr: "RÉGULIER - à intervalles fixes.", targetKanji: ["定", "期"] },

  // 延期 (Report)
  { word: "延期", meanings: ["Report"], readings: ["えんき"], mnemonicFr: "REPORT - repousser à plus tard.", targetKanji: ["延", "期"] },
  { word: "延長", meanings: ["Prolongation"], readings: ["えんちょう"], mnemonicFr: "PROLONGATION - étendre la durée.", targetKanji: ["延", "長"] },
  { word: "変更", meanings: ["Modification"], readings: ["へんこう"], mnemonicFr: "MODIFICATION - changer quelque chose.", targetKanji: ["変", "更"] },
  { word: "中止", meanings: ["Annulation"], readings: ["ちゅうし"], mnemonicFr: "ANNULATION - arrêter complètement.", targetKanji: ["中", "止"] },
  { word: "再開", meanings: ["Reprise"], readings: ["さいかい"], mnemonicFr: "REPRISE - recommencer.", targetKanji: ["再", "開"] },

  // 出勤 (Présence au travail)
  { word: "出勤", meanings: ["Aller au travail"], readings: ["しゅっきん"], mnemonicFr: "ALLER AU TRAVAIL - se rendre au bureau.", targetKanji: ["出", "勤"] },
  { word: "退勤", meanings: ["Quitter le travail"], readings: ["たいきん"], mnemonicFr: "QUITTER LE TRAVAIL - partir du bureau.", targetKanji: ["退", "勤"] },
  { word: "欠勤", meanings: ["Absence"], readings: ["けっきん"], mnemonicFr: "ABSENCE - ne pas venir au travail.", targetKanji: ["欠", "勤"] },
  { word: "勤務", meanings: ["Service", "Travail"], readings: ["きんむ"], mnemonicFr: "SERVICE - heures de travail.", targetKanji: ["勤", "務"] },
  { word: "残業", meanings: ["Heures supplémentaires"], readings: ["ざんぎょう"], mnemonicFr: "HEURES SUPPLÉMENTAIRES - travailler tard.", targetKanji: ["残", "業"] },
  { word: "休暇", meanings: ["Congé", "Vacances"], readings: ["きゅうか"], mnemonicFr: "CONGÉ - jour de repos.", targetKanji: ["休", "暇"] },
  { word: "有給休暇", meanings: ["Congé payé"], readings: ["ゆうきゅうきゅうか"], mnemonicFr: "CONGÉ PAYÉ - vacances rémunérées.", targetKanji: ["有", "給", "休", "暇"] },
];

// Part 8: Projects & Goals
const vocabPart8 = [
  // 目標 (Objectifs)
  { word: "目標", meanings: ["Objectif"], readings: ["もくひょう"], mnemonicFr: "OBJECTIF - but à atteindre.", targetKanji: ["目", "標"] },
  { word: "目的", meanings: ["But", "Objectif"], readings: ["もくてき"], mnemonicFr: "BUT - raison d'être.", targetKanji: ["目", "的"] },
  { word: "達成", meanings: ["Réalisation"], readings: ["たっせい"], mnemonicFr: "RÉALISATION - atteindre un objectif.", targetKanji: ["達", "成"] },
  { word: "成果", meanings: ["Résultat", "Fruit"], readings: ["せいか"], mnemonicFr: "RÉSULTAT - ce qui a été accompli.", targetKanji: ["成", "果"] },

  // 計画 (Planification)
  { word: "企画", meanings: ["Projet", "Plan"], readings: ["きかく"], mnemonicFr: "PROJET - plan d'action.", targetKanji: ["企", "画"] },
  { word: "企業", meanings: ["Entreprise"], readings: ["きぎょう"], mnemonicFr: "ENTREPRISE - société commerciale.", targetKanji: ["企", "業"] },
  { word: "立案", meanings: ["Élaboration"], readings: ["りつあん"], mnemonicFr: "ÉLABORATION - créer un plan.", targetKanji: ["立", "案"] },
  { word: "方針", meanings: ["Politique", "Orientation"], readings: ["ほうしん"], mnemonicFr: "POLITIQUE - direction à suivre.", targetKanji: ["方", "針"] },
  { word: "戦略", meanings: ["Stratégie"], readings: ["せんりゃく"], mnemonicFr: "STRATÉGIE - plan d'action global.", targetKanji: ["戦", "略"] },

  // 進捗 (Progression)
  { word: "進捗", meanings: ["Progression", "Avancement"], readings: ["しんちょく"], mnemonicFr: "PROGRESSION - état d'avancement.", targetKanji: ["進", "捗"] },
  { word: "進行", meanings: ["Déroulement"], readings: ["しんこう"], mnemonicFr: "DÉROULEMENT - avancer.", targetKanji: ["進", "行"] },
  { word: "遅延", meanings: ["Retard"], readings: ["ちえん"], mnemonicFr: "RETARD - être en retard.", targetKanji: ["遅", "延"] },
  { word: "完了", meanings: ["Achèvement"], readings: ["かんりょう"], mnemonicFr: "ACHÈVEMENT - terminer complètement.", targetKanji: ["完", "了"] },
  { word: "完成", meanings: ["Achèvement", "Finition"], readings: ["かんせい"], mnemonicFr: "FINITION - terminer une création.", targetKanji: ["完", "成"] },

  // 問題 (Problèmes)
  { word: "課題", meanings: ["Problème", "Défi"], readings: ["かだい"], mnemonicFr: "DÉFI - problème à résoudre.", targetKanji: ["課", "題"] },
  { word: "問題点", meanings: ["Point problématique"], readings: ["もんだいてん"], mnemonicFr: "POINT PROBLÉMATIQUE - aspect à améliorer.", targetKanji: ["問", "題", "点"] },
  { word: "解決", meanings: ["Résolution"], readings: ["かいけつ"], mnemonicFr: "RÉSOLUTION - trouver une solution.", targetKanji: ["解", "決"] },
  { word: "対策", meanings: ["Mesures", "Contre-mesures"], readings: ["たいさく"], mnemonicFr: "MESURES - actions correctives.", targetKanji: ["対", "策"] },
  { word: "改善", meanings: ["Amélioration"], readings: ["かいぜん"], mnemonicFr: "AMÉLIORATION - rendre meilleur.", targetKanji: ["改", "善"] },
];

// Part 9: Office & Workplace
const vocabPart9 = [
  // 事務 (Administration)
  { word: "事務所", meanings: ["Bureau"], readings: ["じむしょ"], mnemonicFr: "BUREAU - lieu de travail administratif.", targetKanji: ["事", "務", "所"] },
  { word: "事務員", meanings: ["Employé de bureau"], readings: ["じむいん"], mnemonicFr: "EMPLOYÉ DE BUREAU - personnel administratif.", targetKanji: ["事", "務", "員"] },
  { word: "総務", meanings: ["Affaires générales"], readings: ["そうむ"], mnemonicFr: "AFFAIRES GÉNÉRALES - département administratif.", targetKanji: ["総", "務"] },
  { word: "人事", meanings: ["Ressources humaines"], readings: ["じんじ"], mnemonicFr: "RH - gestion du personnel.", targetKanji: ["人", "事"] },
  { word: "経理", meanings: ["Comptabilité"], readings: ["けいり"], mnemonicFr: "COMPTABILITÉ - gestion financière.", targetKanji: ["経", "理"] },

  // 受付 (Accueil)
  { word: "受付", meanings: ["Accueil", "Réception"], readings: ["うけつけ"], mnemonicFr: "ACCUEIL - bureau d'entrée.", targetKanji: ["受", "付"] },
  { word: "対応", meanings: ["Réponse", "Gestion"], readings: ["たいおう"], mnemonicFr: "RÉPONSE - gérer une situation.", targetKanji: ["対", "応"] },
  { word: "接客", meanings: ["Service client"], readings: ["せっきゃく"], mnemonicFr: "SERVICE CLIENT - accueillir les clients.", targetKanji: ["接", "客"] },
  { word: "来客", meanings: ["Visiteur"], readings: ["らいきゃく"], mnemonicFr: "VISITEUR - personne qui vient.", targetKanji: ["来", "客"] },

  // 部署 (Départements)
  { word: "部署", meanings: ["Département", "Service"], readings: ["ぶしょ"], mnemonicFr: "DÉPARTEMENT - division de l'entreprise.", targetKanji: ["部", "署"] },
  { word: "所属", meanings: ["Appartenance"], readings: ["しょぞく"], mnemonicFr: "APPARTENANCE - faire partie de.", targetKanji: ["所", "属"] },
  { word: "配属", meanings: ["Affectation"], readings: ["はいぞく"], mnemonicFr: "AFFECTATION - être assigné à.", targetKanji: ["配", "属"] },
  { word: "異動", meanings: ["Mutation"], readings: ["いどう"], mnemonicFr: "MUTATION - changement de poste.", targetKanji: ["異", "動"] },
  { word: "転勤", meanings: ["Mutation géographique"], readings: ["てんきん"], mnemonicFr: "MUTATION - changer de lieu de travail.", targetKanji: ["転", "勤"] },

  // 会社設備 (Équipements)
  { word: "備品", meanings: ["Fournitures"], readings: ["びひん"], mnemonicFr: "FOURNITURES - matériel de bureau.", targetKanji: ["備", "品"] },
  { word: "設備", meanings: ["Équipement"], readings: ["せつび"], mnemonicFr: "ÉQUIPEMENT - installations.", targetKanji: ["設", "備"] },
  { word: "複合機", meanings: ["Photocopieur multifonction"], readings: ["ふくごうき"], mnemonicFr: "PHOTOCOPIEUR - machine multifonction.", targetKanji: ["複", "合", "機"] },
  { word: "印刷", meanings: ["Impression"], readings: ["いんさつ"], mnemonicFr: "IMPRESSION - imprimer des documents.", targetKanji: ["印", "刷"] },
];

// Part 10: Human Resources
const vocabPart10 = [
  // 採用 (Recrutement)
  { word: "採用", meanings: ["Recrutement", "Embauche"], readings: ["さいよう"], mnemonicFr: "RECRUTEMENT - embaucher quelqu'un.", targetKanji: ["採", "用"] },
  { word: "募集", meanings: ["Recrutement", "Offre"], readings: ["ぼしゅう"], mnemonicFr: "OFFRE D'EMPLOI - chercher des candidats.", targetKanji: ["募", "集"] },
  { word: "応募", meanings: ["Candidature"], readings: ["おうぼ"], mnemonicFr: "CANDIDATURE - postuler à un emploi.", targetKanji: ["応", "募"] },
  { word: "選考", meanings: ["Sélection"], readings: ["せんこう"], mnemonicFr: "SÉLECTION - processus de choix.", targetKanji: ["選", "考"] },
  { word: "面接", meanings: ["Entretien d'embauche"], readings: ["めんせつ"], mnemonicFr: "ENTRETIEN - interview pour un emploi.", targetKanji: ["面", "接"] },
  { word: "内定", meanings: ["Offre préliminaire"], readings: ["ないてい"], mnemonicFr: "OFFRE PRÉLIMINAIRE - promesse d'embauche.", targetKanji: ["内", "定"] },

  // 給与 (Salaire)
  { word: "給与", meanings: ["Salaire"], readings: ["きゅうよ"], mnemonicFr: "SALAIRE - rémunération.", targetKanji: ["給", "与"] },
  { word: "給料", meanings: ["Salaire", "Paie"], readings: ["きゅうりょう"], mnemonicFr: "PAIE - argent reçu pour le travail.", targetKanji: ["給", "料"] },
  { word: "賞与", meanings: ["Prime", "Bonus"], readings: ["しょうよ"], mnemonicFr: "BONUS - prime exceptionnelle.", targetKanji: ["賞", "与"] },
  { word: "昇給", meanings: ["Augmentation"], readings: ["しょうきゅう"], mnemonicFr: "AUGMENTATION - hausse de salaire.", targetKanji: ["昇", "給"] },
  { word: "減給", meanings: ["Baisse de salaire"], readings: ["げんきゅう"], mnemonicFr: "BAISSE - réduction de salaire.", targetKanji: ["減", "給"] },

  // 昇進 (Promotion)
  { word: "昇進", meanings: ["Promotion"], readings: ["しょうしん"], mnemonicFr: "PROMOTION - monter en grade.", targetKanji: ["昇", "進"] },
  { word: "昇格", meanings: ["Avancement"], readings: ["しょうかく"], mnemonicFr: "AVANCEMENT - élévation de rang.", targetKanji: ["昇", "格"] },
  { word: "降格", meanings: ["Rétrogradation"], readings: ["こうかく"], mnemonicFr: "RÉTROGRADATION - descendre en grade.", targetKanji: ["降", "格"] },

  // 退職 (Départ)
  { word: "退職", meanings: ["Démission", "Retraite"], readings: ["たいしょく"], mnemonicFr: "DÉMISSION - quitter son emploi.", targetKanji: ["退", "職"] },
  { word: "辞職", meanings: ["Démission"], readings: ["じしょく"], mnemonicFr: "DÉMISSION - renoncer à son poste.", targetKanji: ["辞", "職"] },
  { word: "解雇", meanings: ["Licenciement"], readings: ["かいこ"], mnemonicFr: "LICENCIEMENT - être renvoyé.", targetKanji: ["解", "雇"] },
  { word: "定年", meanings: ["Âge de la retraite"], readings: ["ていねん"], mnemonicFr: "RETRAITE - âge limite de travail.", targetKanji: ["定", "年"] },

  // 研修 (Formation)
  { word: "研修", meanings: ["Formation"], readings: ["けんしゅう"], mnemonicFr: "FORMATION - apprentissage professionnel.", targetKanji: ["研", "修"] },
  { word: "新人研修", meanings: ["Formation d'intégration"], readings: ["しんじんけんしゅう"], mnemonicFr: "FORMATION D'INTÉGRATION - pour les nouveaux.", targetKanji: ["新", "人", "研", "修"] },
  { word: "出張", meanings: ["Voyage d'affaires"], readings: ["しゅっちょう"], mnemonicFr: "VOYAGE D'AFFAIRES - déplacement professionnel.", targetKanji: ["出", "張"] },
];

// Part 11: Additional Formal Vocabulary
const vocabPart11 = [
  // 調整 (Coordination)
  { word: "調整", meanings: ["Ajustement", "Coordination"], readings: ["ちょうせい"], mnemonicFr: "COORDINATION - harmoniser les éléments.", targetKanji: ["調", "整"] },
  { word: "調達", meanings: ["Approvisionnement"], readings: ["ちょうたつ"], mnemonicFr: "APPROVISIONNEMENT - obtenir des ressources.", targetKanji: ["調", "達"] },
  { word: "整備", meanings: ["Maintenance"], readings: ["せいび"], mnemonicFr: "MAINTENANCE - entretenir en bon état.", targetKanji: ["整", "備"] },

  // 検討 (Examen)
  { word: "検討", meanings: ["Examen", "Étude"], readings: ["けんとう"], mnemonicFr: "EXAMEN - étudier attentivement.", targetKanji: ["検", "討"] },
  { word: "検査", meanings: ["Inspection"], readings: ["けんさ"], mnemonicFr: "INSPECTION - vérifier la qualité.", targetKanji: ["検", "査"] },
  { word: "検証", meanings: ["Vérification"], readings: ["けんしょう"], mnemonicFr: "VÉRIFICATION - confirmer par des preuves.", targetKanji: ["検", "証"] },
  { word: "点検", meanings: ["Contrôle"], readings: ["てんけん"], mnemonicFr: "CONTRÔLE - vérifier point par point.", targetKanji: ["点", "検"] },

  // 審査 (Évaluation)
  { word: "審査", meanings: ["Examen", "Évaluation"], readings: ["しんさ"], mnemonicFr: "ÉVALUATION - juger officiellement.", targetKanji: ["審", "査"] },
  { word: "審議", meanings: ["Délibération"], readings: ["しんぎ"], mnemonicFr: "DÉLIBÉRATION - discuter formellement.", targetKanji: ["審", "議"] },
  { word: "査定", meanings: ["Évaluation"], readings: ["さてい"], mnemonicFr: "ÉVALUATION - estimer la valeur.", targetKanji: ["査", "定"] },

  // 実施 (Mise en oeuvre)
  { word: "実施", meanings: ["Mise en oeuvre"], readings: ["じっし"], mnemonicFr: "MISE EN OEUVRE - mettre en pratique.", targetKanji: ["実", "施"] },
  { word: "実行", meanings: ["Exécution"], readings: ["じっこう"], mnemonicFr: "EXÉCUTION - réaliser concrètement.", targetKanji: ["実", "行"] },
  { word: "施行", meanings: ["Application"], readings: ["しこう"], mnemonicFr: "APPLICATION - mettre en vigueur.", targetKanji: ["施", "行"] },
  { word: "施設", meanings: ["Installation"], readings: ["しせつ"], mnemonicFr: "INSTALLATION - bâtiment équipé.", targetKanji: ["施", "設"] },

  // 管理 (Gestion)
  { word: "管理", meanings: ["Gestion", "Administration"], readings: ["かんり"], mnemonicFr: "GESTION - administrer quelque chose.", targetKanji: ["管", "理"] },
  { word: "管理者", meanings: ["Administrateur"], readings: ["かんりしゃ"], mnemonicFr: "ADMINISTRATEUR - personne qui gère.", targetKanji: ["管", "理", "者"] },
  { word: "監督", meanings: ["Supervision"], readings: ["かんとく"], mnemonicFr: "SUPERVISION - surveiller le travail.", targetKanji: ["監", "督"] },

  // 運営 (Opérations)
  { word: "運営", meanings: ["Gestion", "Opération"], readings: ["うんえい"], mnemonicFr: "OPÉRATION - faire fonctionner.", targetKanji: ["運", "営"] },
  { word: "運用", meanings: ["Utilisation"], readings: ["うんよう"], mnemonicFr: "UTILISATION - employer efficacement.", targetKanji: ["運", "用"] },
  { word: "運転", meanings: ["Conduite"], readings: ["うんてん"], mnemonicFr: "CONDUITE - faire fonctionner une machine.", targetKanji: ["運", "転"] },
];

// Part 12: More Business Terms
const vocabPart12 = [
  // 基準 (Standards)
  { word: "基準", meanings: ["Norme", "Standard"], readings: ["きじゅん"], mnemonicFr: "NORME - règle de référence.", targetKanji: ["基", "準"] },
  { word: "基本", meanings: ["Base", "Fondamental"], readings: ["きほん"], mnemonicFr: "BASE - élément fondamental.", targetKanji: ["基", "本"] },
  { word: "基礎", meanings: ["Fondation"], readings: ["きそ"], mnemonicFr: "FONDATION - base essentielle.", targetKanji: ["基", "礎"] },
  { word: "水準", meanings: ["Niveau"], readings: ["すいじゅん"], mnemonicFr: "NIVEAU - degré de qualité.", targetKanji: ["水", "準"] },

  // 規則 (Règles)
  { word: "規則", meanings: ["Règlement"], readings: ["きそく"], mnemonicFr: "RÈGLEMENT - règles à suivre.", targetKanji: ["規", "則"] },
  { word: "規定", meanings: ["Disposition"], readings: ["きてい"], mnemonicFr: "DISPOSITION - règle établie.", targetKanji: ["規", "定"] },
  { word: "規模", meanings: ["Échelle", "Envergure"], readings: ["きぼ"], mnemonicFr: "ÉCHELLE - taille d'une opération.", targetKanji: ["規", "模"] },
  { word: "規格", meanings: ["Norme technique"], readings: ["きかく"], mnemonicFr: "NORME TECHNIQUE - spécification standard.", targetKanji: ["規", "格"] },

  // 方法 (Méthodes)
  { word: "方法", meanings: ["Méthode"], readings: ["ほうほう"], mnemonicFr: "MÉTHODE - façon de faire.", targetKanji: ["方", "法"] },
  { word: "方式", meanings: ["Système", "Formule"], readings: ["ほうしき"], mnemonicFr: "SYSTÈME - méthode standardisée.", targetKanji: ["方", "式"] },
  { word: "方向", meanings: ["Direction"], readings: ["ほうこう"], mnemonicFr: "DIRECTION - sens à suivre.", targetKanji: ["方", "向"] },

  // 効率 (Efficacité)
  { word: "効率", meanings: ["Efficacité"], readings: ["こうりつ"], mnemonicFr: "EFFICACITÉ - rendement optimal.", targetKanji: ["効", "率"] },
  { word: "効果的", meanings: ["Efficace"], readings: ["こうかてき"], mnemonicFr: "EFFICACE - qui produit des résultats.", targetKanji: ["効", "果", "的"] },
  { word: "有効", meanings: ["Valide", "Efficace"], readings: ["ゆうこう"], mnemonicFr: "VALIDE - qui a effet.", targetKanji: ["有", "効"] },
  { word: "無効", meanings: ["Invalide"], readings: ["むこう"], mnemonicFr: "INVALIDE - sans effet.", targetKanji: ["無", "効"] },

  // 優先 (Priorité)
  { word: "優先", meanings: ["Priorité"], readings: ["ゆうせん"], mnemonicFr: "PRIORITÉ - passer en premier.", targetKanji: ["優", "先"] },
  { word: "優秀", meanings: ["Excellent"], readings: ["ゆうしゅう"], mnemonicFr: "EXCELLENT - de haute qualité.", targetKanji: ["優", "秀"] },
  { word: "最優先", meanings: ["Priorité absolue"], readings: ["さいゆうせん"], mnemonicFr: "PRIORITÉ ABSOLUE - le plus important.", targetKanji: ["最", "優", "先"] },

  // 適切 (Approprié)
  { word: "適切", meanings: ["Approprié"], readings: ["てきせつ"], mnemonicFr: "APPROPRIÉ - qui convient parfaitement.", targetKanji: ["適", "切"] },
  { word: "適用", meanings: ["Application"], readings: ["てきよう"], mnemonicFr: "APPLICATION - appliquer une règle.", targetKanji: ["適", "用"] },
  { word: "適正", meanings: ["Adéquat"], readings: ["てきせい"], mnemonicFr: "ADÉQUAT - juste et convenable.", targetKanji: ["適", "正"] },
];

// Part 13: Additional Vocabulary
const vocabPart13 = [
  // 必要 (Nécessité)
  { word: "必須", meanings: ["Obligatoire"], readings: ["ひっす"], mnemonicFr: "OBLIGATOIRE - absolument nécessaire.", targetKanji: ["必", "須"] },
  { word: "不可欠", meanings: ["Indispensable"], readings: ["ふかけつ"], mnemonicFr: "INDISPENSABLE - qu'on ne peut pas supprimer.", targetKanji: ["不", "可", "欠"] },

  // 重要 (Importance)
  { word: "重大", meanings: ["Grave", "Majeur"], readings: ["じゅうだい"], mnemonicFr: "GRAVE - très important.", targetKanji: ["重", "大"] },
  { word: "重点", meanings: ["Point principal"], readings: ["じゅうてん"], mnemonicFr: "POINT PRINCIPAL - aspect essentiel.", targetKanji: ["重", "点"] },

  // 緊急 (Urgence)
  { word: "緊急", meanings: ["Urgence"], readings: ["きんきゅう"], mnemonicFr: "URGENCE - situation pressante.", targetKanji: ["緊", "急"] },
  { word: "至急", meanings: ["Urgent"], readings: ["しきゅう"], mnemonicFr: "URGENT - à traiter immédiatement.", targetKanji: ["至", "急"] },
  { word: "早急", meanings: ["Rapide", "Prompt"], readings: ["さっきゅう"], mnemonicFr: "RAPIDE - à faire vite.", targetKanji: ["早", "急"] },

  // 対応 (Correspondance)
  { word: "該当", meanings: ["Correspondant", "Applicable"], readings: ["がいとう"], mnemonicFr: "APPLICABLE - qui correspond.", targetKanji: ["該", "当"] },
  { word: "相当", meanings: ["Considérable"], readings: ["そうとう"], mnemonicFr: "CONSIDÉRABLE - assez important.", targetKanji: ["相", "当"] },

  // 以下/以上 (Au-dessus/dessous)
  { word: "以上", meanings: ["Au-dessus", "Et plus"], readings: ["いじょう"], mnemonicFr: "ET PLUS - à partir de.", targetKanji: ["以", "上"] },
  { word: "以下", meanings: ["En dessous", "Suivant"], readings: ["いか"], mnemonicFr: "EN DESSOUS - jusqu'à.", targetKanji: ["以", "下"] },
  { word: "以内", meanings: ["Dans les limites de"], readings: ["いない"], mnemonicFr: "DANS LES LIMITES - au maximum.", targetKanji: ["以", "内"] },
  { word: "以外", meanings: ["Sauf", "Autre que"], readings: ["いがい"], mnemonicFr: "SAUF - excepté.", targetKanji: ["以", "外"] },
  { word: "以前", meanings: ["Avant", "Auparavant"], readings: ["いぜん"], mnemonicFr: "AVANT - dans le passé.", targetKanji: ["以", "前"] },
  { word: "以後", meanings: ["Après", "Désormais"], readings: ["いご"], mnemonicFr: "APRÈS - à partir de maintenant.", targetKanji: ["以", "後"] },
  { word: "以降", meanings: ["À partir de"], readings: ["いこう"], mnemonicFr: "À PARTIR DE - depuis ce moment.", targetKanji: ["以", "降"] },

  // 向上 (Amélioration)
  { word: "向上", meanings: ["Amélioration"], readings: ["こうじょう"], mnemonicFr: "AMÉLIORATION - progresser.", targetKanji: ["向", "上"] },
  { word: "向き", meanings: ["Direction", "Orientation"], readings: ["むき"], mnemonicFr: "ORIENTATION - sens de direction.", targetKanji: ["向"] },

  // 全般 (Général)
  { word: "全般", meanings: ["Général", "Ensemble"], readings: ["ぜんぱん"], mnemonicFr: "GÉNÉRAL - dans l'ensemble.", targetKanji: ["全", "般"] },
  { word: "一般", meanings: ["Général", "Commun"], readings: ["いっぱん"], mnemonicFr: "COMMUN - ordinaire.", targetKanji: ["一", "般"] },
  { word: "一般的", meanings: ["Général", "Typique"], readings: ["いっぱんてき"], mnemonicFr: "TYPIQUE - habituel.", targetKanji: ["一", "般", "的"] },
];

async function main() {
  console.log("=== ADDING BUSINESS & FORMAL VOCABULARY (BATCH 6) ===\n");

  const existingVocab = await prisma.vocabulary.findMany({
    select: { word: true }
  });
  const existingWords = new Set(existingVocab.map(v => v.word));

  const allKanji = await prisma.kanji.findMany({
    select: { character: true, levelId: true }
  });
  const kanjiLevels = new Map(allKanji.map(k => [k.character, k.levelId]));
  const existingKanjiSet = new Set(allKanji.map(k => k.character));

  const allVocab = [
    ...vocabPart1,
    ...vocabPart2,
    ...vocabPart3,
    ...vocabPart4,
    ...vocabPart5,
    ...vocabPart6,
    ...vocabPart7,
    ...vocabPart8,
    ...vocabPart9,
    ...vocabPart10,
    ...vocabPart11,
    ...vocabPart12,
    ...vocabPart13,
  ];

  console.log(`Total vocabulary entries to process: ${allVocab.length}`);

  let added = 0;
  let skipped = 0;

  for (const vocab of allVocab) {
    if (existingWords.has(vocab.word)) {
      skipped++;
      continue;
    }

    // Check all kanji exist
    const kanjiInWord: string[] = [];
    for (const char of vocab.word) {
      if (existingKanjiSet.has(char)) {
        kanjiInWord.push(char);
      }
    }

    // Skip if word uses kanji we don't have
    const wordKanji = [...vocab.word].filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = wordKanji.filter(k => !existingKanjiSet.has(k));
    if (missingKanji.length > 0) {
      console.log(`Skipping ${vocab.word} - missing kanji: ${missingKanji.join(", ")}`);
      skipped++;
      continue;
    }

    // Find the max level of kanji used
    let maxLevel = 1;
    for (const char of wordKanji) {
      const level = kanjiLevels.get(char);
      if (level && level > maxLevel) maxLevel = level;
    }

    try {
      const newVocab = await prisma.vocabulary.create({
        data: {
          word: vocab.word,
          meaningsFr: vocab.meanings,
          readings: vocab.readings,
          mnemonicFr: vocab.mnemonicFr,
          levelId: maxLevel,
        }
      });

      // Link to kanji
      for (const char of kanjiInWord) {
        const kanji = await prisma.kanji.findFirst({
          where: { character: char }
        });
        if (kanji) {
          await prisma.vocabularyKanji.create({
            data: {
              vocabularyId: newVocab.id,
              kanjiId: kanji.id
            }
          }).catch(() => {}); // Ignore if already exists
        }
      }

      added++;
    } catch (e: any) {
      if (e.code !== "P2002") {
        console.log(`Error adding ${vocab.word}: ${e.message}`);
      }
      skipped++;
    }
  }

  const total = await prisma.vocabulary.count();
  console.log(`\nAdded: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total vocabulary in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
