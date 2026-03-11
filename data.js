/**
 * Ory+ TCC Simulator — Enriched Data Layer
 * Protocole TAG 15 séances (Dugas & Robichaud)
 */

const SCALES = {
    GAD7: {
        name: "GAD-7 (Trouble Anxiété Généralisée)",
        abbr: "GAD-7",
        items: [
            "Sentiment d'être nerveux, anxieux ou à bout",
            "Incapacité à arrêter de vous inquiéter ou à contrôler vos inquiétudes",
            "Inquiétudes excessives à propos de différentes choses",
            "Difficultés à vous détendre",
            "Agitation telle qu'il est difficile de rester tranquille",
            "Tendance à vous énerver ou à vous irriter facilement",
            "Sentiment de craindre qu'il arrive quelque chose de terrible"
        ],
        options: ["Jamais (0)", "Plusieurs jours (1)", "Plus de la moitié des jours (2)", "Presque tous les jours (3)"],
        maxScore: 21,
        interpretation: [
            { min: 0, max: 4, label: "Anxiété minimale", color: "success" },
            { min: 5, max: 9, label: "Anxiété légère", color: "info" },
            { min: 10, max: 14, label: "Anxiété modérée", color: "warning" },
            { min: 15, max: 21, label: "Anxiété sévère", color: "danger" }
        ]
    },
    BAI: {
        name: "BAI (Inventaire d'Anxiété de Beck)",
        abbr: "BAI",
        items: [
            "Engourdissements ou picotements", "Bouffées de chaleur", "Jambes qui flageolent", "Incapacité à se relaxer",
            "Crainte que le pire arrive", "Étourdissements ou vertige", "Battements cardiaques forts ou rapides",
            "Instabilité", "Sensation de terreur", "Nervosité", "Sensation d'étouffer", "Mains tremblantes",
            "Instabilité, tremblements dans tout le corps", "Peur de perdre le contrôle", "Difficulté à respirer",
            "Peur de mourir", "Anxiété", "Indigestion ou malaise abdominal", "Évanouissements",
            "Rougissement du visage", "Transpiration (non liée à la chaleur)"
        ],
        options: ["Pas du tout (0)", "Un peu (1)", "Modérément (2)", "Beaucoup (3)"],
        maxScore: 63,
        interpretation: [
            { min: 0, max: 7, label: "Niveau minimal", color: "success" },
            { min: 8, max: 15, label: "Niveau léger", color: "info" },
            { min: 16, max: 25, label: "Niveau modéré", color: "warning" },
            { min: 26, max: 63, label: "Niveau sévère", color: "danger" }
        ]
    },
    BDI: {
        name: "BDI-II (Inventaire de Dépression de Beck)",
        abbr: "BDI",
        items: [
            "Tristesse", "Pessimisme", "Échecs passés", "Manque de plaisir", "Sentiments de culpabilité",
            "Sentiment d'être puni", "Insatisfaction de soi", "Auto-critique", "Pensées suicidaires",
            "Pleurs", "Agitation", "Intérêts", "Indécision", "Dévalorisation",
            "Perte d'énergie", "Modifications du sommeil", "Irritabilité", "Modifications de l'appétit",
            "Difficulté de concentration", "Fatigue", "Intérêt pour le sexe"
        ],
        options: ["0 — Absent", "1 — Léger", "2 — Modéré", "3 — Sévère"],
        maxScore: 63,
        interpretation: [
            { min: 0, max: 13, label: "Dépression minimale", color: "success" },
            { min: 14, max: 19, label: "Dépression légère", color: "info" },
            { min: 20, max: 28, label: "Dépression modérée", color: "warning" },
            { min: 29, max: 63, label: "Dépression sévère", color: "danger" }
        ]
    }
};

const simulationData = {
    patients: [
        {
            id: 1,
            name: "Nadia Benhaddou",
            age: 34,
            sexe: "F",
            profession: "Enseignante",
            motif: "Anxiété persistante, soucis excessifs depuis 3 ans.",
            diagnoses: ["TAG"],
            score_initial: { GAD7: 16, BAI: 18, BDI: 9 },
            currentSession: 3,
            completedSessions: [1, 2],
            sessionScores: { 1: { GAD7: 16 }, 2: { GAD7: 14 } },
            notes: {}
        },
        {
            id: 2,
            name: "Youssef Ait Taleb",
            age: 45,
            sexe: "M",
            profession: "Comptable",
            motif: "Inquiétudes constantes, insomnies, tensions musculaires.",
            diagnoses: ["TAG"],
            score_initial: { GAD7: 18, BAI: 22, BDI: 12 },
            currentSession: 1,
            completedSessions: [],
            sessionScores: {},
            notes: {}
        },
        {
            id: 3,
            name: "Fatima Zahra El Idrissi",
            age: 29,
            sexe: "F",
            profession: "Infirmière",
            motif: "Peur des catastrophes, inquiétudes sur la santé des proches.",
            diagnoses: ["TAG", "Hypocondrie légère"],
            score_initial: { GAD7: 14, BAI: 15, BDI: 7 },
            currentSession: 7,
            completedSessions: [1, 2, 3, 4, 5, 6],
            sessionScores: { 1: { GAD7: 14 }, 3: { GAD7: 12 }, 5: { GAD7: 10 }, 7: { GAD7: 9 } },
            notes: {}
        },
        {
            id: 4,
            name: "Khalid Berrada",
            age: 52,
            sexe: "M",
            profession: "Ingénieur",
            motif: "Perfectionnisme excessif, peur de l'échec professionnel.",
            diagnoses: ["TAG", "Burn-out partiel"],
            score_initial: { GAD7: 17, BAI: 20, BDI: 15 },
            currentSession: 12,
            completedSessions: [1,2,3,4,5,6,7,8,9,10,11],
            sessionScores: { 1:{GAD7:17}, 3:{GAD7:15}, 5:{GAD7:13}, 7:{GAD7:11}, 9:{GAD7:9}, 11:{GAD7:8} },
            notes: {}
        },
        {
            id: 5,
            name: "Salma Ouali",
            age: 38,
            sexe: "F",
            profession: "Directrice de projet",
            motif: "Anxiété sociale et généralisée, évitement des prises de décision.",
            diagnoses: ["TAG"],
            score_initial: { GAD7: 15, BAI: 17, BDI: 8 },
            currentSession: 15,
            completedSessions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
            sessionScores: { 1:{GAD7:15}, 3:{GAD7:13}, 5:{GAD7:11}, 7:{GAD7:9}, 9:{GAD7:7}, 11:{GAD7:6}, 13:{GAD7:5}, 15:{GAD7:4} },
            notes: {}
        }
    ],

    tcc_sessions: [
        {
            no: 1,
            title: "Évaluation et Psychoéducation I",
            phase: "Évaluation",
            duration: 60,
            objectives: [
                "Établir l'alliance thérapeutique",
                "Évaluer la sévérité des symptômes du TAG",
                "Expliquer au patient le modèle cognitif du TAG"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Bonjour. Je suis content(e) de vous accueillir aujourd'hui. Comment vous sentez-vous ce matin ?" },
                { speaker: "Patient", text: "Je suis assez anxieux(se), comme d'habitude. J'espère que vous pourrez m'aider." },
                { speaker: "Thérapeute", text: "C'est compréhensible. Avant tout, j'aimerais qu'on parle ensemble de ce que vous vivez depuis quelque temps. Pouvez-vous me décrire vos inquiétudes principales ?" },
                { speaker: "Patient", text: "Je m'inquiète de tout... mon travail, ma famille, ma santé. Même quand tout va bien, je m'attends toujours au pire." },
                { speaker: "Thérapeute", text: "Ce que vous décrivez est caractéristique d'un trouble qu'on appelle l'anxiété généralisée — le TAG. La bonne nouvelle est qu'il existe un traitement très efficace, fondé sur des recherches solides. Nous allons travailler ensemble en 15 séances structurées." },
                { speaker: "Thérapeute", text: "Le TAG, c'est un état où les inquiétudes s'enchaînent en cascade. Imaginez une porte tournante : chaque 'et si?' en ouvre une autre. La question n'est pas de savoir si votre inquiétude est réaliste, mais pourquoi vous avez du mal à l'arrêter." },
                { speaker: "Patient", text: "Oui, c'est exactement ça. Je sais souvent que c'est exagéré, mais je ne peux pas m'arrêter." },
                { speaker: "Thérapeute", text: "Exactement. Nous allons d'abord mesurer ensemble votre niveau d'anxiété à l'aide d'une échelle standardisée — le GAD-7. Cela nous permettra de suivre vos progrès d'une séance à l'autre." }
            ],
            tasks: [
                "Accueillir le patient, établir l'alliance",
                "Présenter le modèle du TAG (cascade d'inquiétudes)",
                "Administrer le GAD-7 et l'inventaire initial",
                "Expliquer la logique du protocole en 15 séances",
                "Distinguer anxiété normale et TAG",
                "Expliquer la courbe en U inversé (performance vs anxiété)"
            ],
            homeworks: [
                "Lire le document 'Trouble d'anxiété généralisée' (M. Dugas)",
                "Observer et noter 3 situations d'inquiétude dans la semaine"
            ],
            materials: ["Document TAG — Michel Dugas", "Fiche de psychoéducation Anxiété", "GAD-7 (formulaire)"],
            scales: ["GAD7", "BAI"],
            activityType: "scale_gad7"
        },
        {
            no: 2,
            title: "Psychoéducation II et Auto-enregistrement",
            phase: "Évaluation",
            duration: 50,
            objectives: [
                "Introduire le carnet d'auto-enregistrement quotidien",
                "Aider le patient à distinguer inquiétude, anxiété et dépression",
                "Définir l'inquiétude comme pensée automatique"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Lors de notre dernière séance, nous avons vu ce qu'est le TAG. Avez-vous eu l'occasion de lire le document et d'observer vos inquiétudes ?" },
                { speaker: "Patient", text: "Oui. J'ai réalisé que je m'inquiète beaucoup plus que je ne le pensais — même pour des petites choses insignifiantes." },
                { speaker: "Thérapeute", text: "C'est une observation très précieuse. Aujourd'hui, nous allons mettre en place un outil fondamental : le carnet d'auto-enregistrement. Il va vous permettre de repérer vos déclencheurs d'anxiété, vos pensées automatiques, et l'intensité de l'anxiété sur une échelle de 0 à 8." },
                { speaker: "Patient", text: "Comment je dois l'utiliser exactement ?" },
                { speaker: "Thérapeute", text: "C'est simple : dès que vous remarquez une inquiétude, vous notez la situation (où, quand), la pensée 'et si?', et votre niveau d'anxiété de 0 à 8. 0 = parfaitement calme, 8 = panique maximale. L'objectif n'est pas d'éliminer l'anxiété, mais d'en prendre conscience." },
                { speaker: "Thérapeute", text: "Il est important de noter que l'inquiétude est différente de la tristesse ou de la dépression. L'inquiétude est toujours centrée sur le futur — 'et si ça arrivait?' — tandis que la dépression est souvent centrée sur le passé ou le présent." }
            ],
            tasks: [
                "Révision de la semaine passée",
                "Présenter le carnet d'auto-enregistrement",
                "Expliquer l'échelle d'anxiété 0-8",
                "Distinguer inquiétude / anxiété / dépression",
                "Définir l'inquiétude comme pensée automatique orientée vers l'avenir"
            ],
            homeworks: [
                "Compléter le carnet d'auto-enregistrement chaque jour (au moins 2 entrées/jour)",
                "Identifier la première pensée 'et si?' pour chaque inquiétude"
            ],
            materials: ["Carnet d'auto-enregistrement des inquiétudes", "Guide d'utilisation du carnet"],
            scales: ["GAD7"],
            activityType: "auto_record"
        },
        {
            no: 3,
            title: "L'Utilité des Inquiétudes",
            phase: "Psychoéducation",
            duration: 50,
            objectives: [
                "Explorer les croyances positives sur l'utilité des inquiétudes",
                "Appliquer la technique de l'Avocat du Diable",
                "Amorcer la réévaluation cognitive"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "La semaine passée, vous aviez le carnet. Avez-vous remarqué des patterns dans vos inquiétudes ?" },
                { speaker: "Patient", text: "Je me suis rendu(e) compte que je m'inquiète souvent parce que je crois que ça m'aide à me préparer au pire." },
                { speaker: "Thérapeute", text: "C'est exactement ce que nous allons explorer aujourd'hui. Beaucoup de personnes avec un TAG croient, au fond, que s'inquiéter est utile — ça prépare, ça protège, ça motive. Ces croyances positives sur l'inquiétude entretiennent le cycle." },
                { speaker: "Patient", text: "Mais c'est vrai non ? Si je ne m'inquiète pas, il pourrait m'arriver des mauvaises surprises." },
                { speaker: "Thérapeute", text: "C'est une croyance très répandue. Nous allons la tester avec une technique que j'appelle 'l'Avocat du Diable'. Vous allez énoncer votre croyance sur l'utilité de l'inquiétude, et ensemble nous allons chercher des contre-preuves — des arguments qui montrent que cette croyance est peut-être inexacte." },
                { speaker: "Thérapeute", text: "Par exemple : 'S'inquiéter m'aide à trouver des solutions.' Contre-preuve : 'La plupart du temps, les choses que je redoute ne se produisent pas, et quand elles se produisent, je les gère avec les ressources du moment — pas grâce à mes inquiétudes d'à l'avance.'" }
            ],
            tasks: [
                "Révision du carnet d'auto-enregistrement",
                "Identifier les croyances positives sur l'inquiétude du patient",
                "Présenter la technique de l'Avocat du Diable",
                "Appliquer la technique à 2-3 croyances du patient",
                "Initier la réévaluation cognitive"
            ],
            homeworks: [
                "Compléter la grille Avocat du Diable pour 2 nouvelles croyances",
                "Poursuivre le carnet d'auto-enregistrement"
            ],
            materials: ["Grille Avocat du Diable", "Liste des croyances communes sur l'anxiété"],
            scales: ["GAD7"],
            activityType: "avocat_diable"
        },
        {
            no: 4,
            title: "Définir l'Intolérance à l'Incertitude",
            phase: "Psychoéducation",
            duration: 50,
            objectives: [
                "Définir et comprendre l'intolérance à l'incertitude (II)",
                "Identifier les comportements d'évitement et de surréaction",
                "Faire le lien entre II et inquiétudes excessives"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Nous avons vu que l'inquiétude peut sembler utile. Aujourd'hui, nous allons explorer la cause profonde du TAG : l'intolérance à l'incertitude." },
                { speaker: "Patient", text: "Qu'est-ce que ça veut dire exactement, l'intolérance à l'incertitude ?" },
                { speaker: "Thérapeute", text: "C'est la difficulté à tolérer le fait de ne pas savoir comment les choses vont se passer. Les personnes avec un TAG évaluent l'incertitude comme dangereuse ou inacceptable, même si le risque est minime. L'incertitude déclenche l'inquiétude, qui tente de 'contrôler' l'inconnu." },
                { speaker: "Thérapeute", text: "Il y a deux grands types de réactions à l'incertitude : la Surréaction — vous vérifiez sans cesse, vous demandez des confirmations, vous planifiez à l'excès. Et l'Évitement — vous procrastinez, vous évitez les décisions, vous fuyez les situations incertaines." },
                { speaker: "Patient", text: "Je me reconnais beaucoup dans la vérification. Je vérifie mes emails des dizaines de fois par jour." },
                { speaker: "Thérapeute", text: "C'est un excellent exemple. Paradoxalement, ces comportements renforcent l'intolérance — ils empêchent votre cerveau d'apprendre que l'incertitude est tolérable. Nous allons identifier ensemble vos manifestations personnelles d'II." }
            ],
            tasks: [
                "Définir l'intolérance à l'incertitude (II)",
                "Présenter le lien II → Inquiétude",
                "Identifier les comportements de Surréaction et d'Évitement chez le patient",
                "Expliquer comment les comportements maintiennent l'II",
                "Compléter la fiche 'Manifestations d'II'"
            ],
            homeworks: [
                "Compléter la fiche des manifestations d'II personnelles",
                "Observer sans agir sur l'une des vérifications habituelles"
            ],
            materials: ["Fiche Manifestations d'Intolérance à l'Incertitude", "Schéma II → Inquiétude"],
            scales: ["GAD7"],
            activityType: "ii_grid"
        },
        {
            no: 5,
            title: "Action face à l'Incertitude I",
            phase: "Traitement",
            duration: 50,
            objectives: [
                "Identifier une action comportementale pour affronter l'incertitude",
                "Comprendre que la motivation suit l'action (pas l'inverse)",
                "Graduer la difficulté des exercices comportementaux"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Nous savons maintenant que l'intolérance à l'incertitude est au cœur de votre anxiété. La solution logique est d'apprendre à tolérer l'incertitude — pas de l'éliminer, mais de l'apprivoiser." },
                { speaker: "Patient", text: "Mais comment on fait ça ? L'incertitude m'est insupportable." },
                { speaker: "Thérapeute", text: "En agissant 'comme si' l'incertitude était acceptable. Votre cerveau apprend par l'expérience. Si vous attendez de vous sentir à l'aise avant d'agir, vous attendrez indéfiniment. C'est l'action qui crée le sentiment de compétence, pas l'inverse." },
                { speaker: "Thérapeute", text: "Nous allons choisir ensemble une action concrète : quelque chose que vous évitez à cause de l'incertitude. Quelque chose de gérable pour commencer — pas le plus difficile." },
                { speaker: "Patient", text: "Je pourrais essayer d'envoyer un email important sans le relire 10 fois." },
                { speaker: "Thérapeute", text: "C'est un excellent exemple! Nous allons décrire cet exercice précisément, et vous allez le pratiquer cette semaine. En faisant cela, vous dites à votre cerveau : 'Je peux gérer l'incertitude.'" }
            ],
            tasks: [
                "Expliquer le principe de l'action comportementale",
                "Clarifier que la motivation suit l'action",
                "Identifier avec le patient une action face à l'incertitude",
                "Définir précisément l'exercice (quoi, quand, comment)",
                "Graduer la difficulté (facile → difficile)"
            ],
            homeworks: [
                "Réaliser l'action comportementale choisie au moins 3 fois dans la semaine",
                "Noter l'anxiété avant et après chaque tentative (0-8)",
                "Poursuivre le carnet d'auto-enregistrement"
            ],
            materials: ["Fiche Incertitude et changement de comportement", "Journal des actions"],
            scales: ["GAD7"],
            activityType: "action_planner"
        },
        {
            no: 6,
            title: "Action face à l'Incertitude II",
            phase: "Traitement",
            duration: 50,
            objectives: [
                "Analyser les résultats de l'exercice comportemental",
                "Consolider les apprentissages sur la tolérance à l'incertitude",
                "Planifier le prochain exercice comportemental"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Comment s'est passé votre exercice de la semaine dernière ?" },
                { speaker: "Patient", text: "C'était difficile au début. J'avais très peur. Mais j'ai réussi à envoyer l'email sans le relire autant. Et... il ne s'est rien passé de grave." },
                { speaker: "Thérapeute", text: "C'est fantastique ! Qu'est-ce que vous avez appris de cette expérience ?" },
                { speaker: "Patient", text: "Que ma peur était plus grande que le danger réel. Même si c'était inconfortable, j'ai pu le faire." },
                { speaker: "Thérapeute", text: "C'est exactement le message que votre cerveau intègre : 'L'incertitude est tolérable.' Chaque fois que vous le faites, vous renforcez cette nouvelle croyance. Nous allons maintenant identifier le prochain exercice, un peu plus difficile." }
            ],
            tasks: [
                "Analyser en détail les résultats de l'exercice comportemental",
                "Identifier ce que le patient a appris",
                "Renforcer positivement l'effort",
                "Choisir un nouvel exercice comportemental (niveau supérieur)",
                "Poursuivre le carnet d'auto-enregistrement"
            ],
            homeworks: [
                "Réaliser le nouvel exercice comportemental",
                "Continuer à noter l'anxiété avant/après (0-8)"
            ],
            materials: ["Journal des actions (suite)"],
            scales: ["GAD7"],
            activityType: "action_review"
        },
        {
            no: 7,
            title: "Réaction face aux Problèmes",
            phase: "Traitement",
            duration: 50,
            objectives: [
                "Distinguer inquiétude (imaginaire) et problème actuel (réel)",
                "Identifier l'orientation négative face aux problèmes",
                "Normaliser le ressentiment face aux problèmes"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Aujourd'hui, nous abordons un nouveau thème : comment vous réagissez face aux problèmes concrets. Il y a une différence fondamentale entre une inquiétude et un problème." },
                { speaker: "Patient", text: "Quelle est la différence ?" },
                { speaker: "Thérapeute", text: "Une inquiétude est imaginaire — c'est un 'et si?' qui concerne un événement futur et incertain. Un problème est actuel — c'est quelque chose qui se passe maintenant et qui nécessite une action. Par exemple : 'Et si mon chauffe-eau tombait en panne?' est une inquiétude. 'Mon chauffe-eau est en panne' est un problème." },
                { speaker: "Thérapeute", text: "Les personnes anxieuses ont souvent une orientation négative face aux problèmes — elles perçoivent les problèmes comme des menaces, doutent de leur capacité à les résoudre, et ressentent beaucoup de frustration." },
                { speaker: "Patient", text: "Oui, dès qu'un problème survient, je panique et je ne sais plus quoi faire." },
                { speaker: "Thérapeute", text: "C'est tout à fait normal au départ. Nous allons apprendre une méthode structurée de résolution de problèmes dans les prochaines séances. Commençons par identifier vos problèmes actuels et vos réactions habituelles." }
            ],
            tasks: [
                "Distinguer inquiétude (futur imaginaire) et problème (présent réel)",
                "Identifier l'orientation négative face aux problèmes",
                "Expliquer comment l'orientation négative maintient l'anxiété",
                "Normaliser les émotions face aux problèmes",
                "Lister les problèmes actuels du patient"
            ],
            homeworks: [
                "Classer chaque inquiétude de la semaine : Inquiétude ou Problème réel?",
                "Pour les problèmes réels, noter la réaction initiale"
            ],
            materials: ["Liste des problèmes actuels et récurrents", "Fiche Inquiétude vs Problème"],
            scales: ["GAD7"],
            activityType: "problem_sort"
        },
        {
            no: 8,
            title: "Résolution de Problèmes I",
            phase: "Traitement",
            duration: 50,
            objectives: [
                "Enseigner la méthode structurée de résolution de problèmes",
                "Définir précisément un problème cible",
                "Générer un maximum de solutions par brainstorming"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Cette semaine, nous allons apprendre la démarche de résolution de problèmes. Le but n'est pas de trouver la solution parfaite — il n'en existe pas. Le but est d'avoir un plan d'action réaliste." },
                { speaker: "Thérapeute", text: "La première étape est la définition précise du problème. Qui est impliqué? Quoi exactement se passe-t-il? Quand et où cela arrive-t-il? Et surtout : quel est l'obstacle concret?" },
                { speaker: "Patient", text: "Mon problème, c'est que je procrastine sur les tâches importantes au travail parce que j'ai peur d'échouer." },
                { speaker: "Thérapeute", text: "Très bien. La deuxième étape est le brainstorming de solutions. L'idée est de générer le plus grand nombre de solutions possible — sans les juger. Même les idées qui semblent folles ou impossibles. La censure vient plus tard." },
                { speaker: "Thérapeute", text: "Troisièmement, nous allons évaluer chaque solution selon ses avantages et inconvénients, puis choisir la meilleure — non pas la parfaite, mais la 'assez bonne'." }
            ],
            tasks: [
                "Présenter la méthode de résolution de problèmes (4 étapes)",
                "Définir précisément un problème cible avec le patient",
                "Générer 8-10 solutions par brainstorming",
                "Évaluer les solutions (avantages/inconvénients)",
                "Choisir une solution 'assez bonne'"
            ],
            homeworks: [
                "Appliquer la solution choisie d'ici la prochaine séance",
                "Compléter la grille de résolution pour un deuxième problème"
            ],
            materials: ["Grille de Résolution de Problèmes", "Feuille de Brainstorming"],
            scales: ["GAD7"],
            activityType: "problem_solving"
        },
        {
            no: 9,
            title: "Résolution de Problèmes II",
            phase: "Traitement",
            duration: 50,
            objectives: [
                "Évaluer les résultats de l'application de la solution",
                "Ajuster si nécessaire",
                "Consolider la méthode de résolution"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "La semaine dernière, vous deviez appliquer la solution que nous avions choisie. Comment cela s'est-il passé ?" },
                { speaker: "Patient", text: "J'ai essayé. Ça n'a pas parfaitement fonctionné, mais j'ai quand même avancé sur ma tâche." },
                { speaker: "Thérapeute", text: "C'est un succès! Le but n'était pas la perfection. Qu'avez-vous appris de cette tentative ?" },
                { speaker: "Patient", text: "Que le fait d'essayer réduit mon anxiété plus que le fait d'éviter." },
                { speaker: "Thérapeute", text: "Exactement. L'action tronque le cycle d'anxiété. Si la solution n'a pas complètement fonctionné, nous pouvons l'ajuster ou essayer la deuxième option de votre liste. Résoudre un problème est un processus itératif." }
            ],
            tasks: [
                "Retour sur l'application de la solution",
                "Évaluer les résultats (succès partiel ou total)",
                "Identifier les apprentissages",
                "Ajuster ou passer à une autre solution si nécessaire",
                "Appliquer la méthode à un nouveau problème"
            ],
            homeworks: [
                "Continuer à appliquer la méthode de résolution pour tout nouveau problème",
                "Poursuivre les exercices comportementaux face à l'incertitude"
            ],
            materials: ["Grille de Résolution (suite)"],
            scales: ["GAD7"],
            activityType: "complete_session"
        },
        {
            no: 10,
            title: "Consolidation Résolution",
            phase: "Traitement",
            duration: 50,
            objectives: [
                "Réviser et consolider la méthode de résolution de problèmes",
                "Automatiser l'approche structurée face aux difficultés",
                "Appliquer à un problème complexe"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Nous avons maintenant deux outils majeurs : la tolérance à l'incertitude et la résolution de problèmes. Aujourd'hui nous allons consolider ces apprentissages en les appliquant à un problème plus complexe." },
                { speaker: "Patient", text: "Je commence à voir la logique. Quand je m'inquiète, je dois d'abord demander si c'est une inquiétude ou un problème réel." },
                { speaker: "Thérapeute", text: "Exactement! C'est le diagnostic initial. Si c'est une inquiétude sur quelque chose d'incertain, on travaille la tolérance à l'incertitude. Si c'est un problème réel, on applique la méthode de résolution. Vous voyez como ces deux approches se complètent?" }
            ],
            tasks: [
                "Révision globale des outils acquis",
                "Application à un problème complexe multi-facettes",
                "Renforcer l'automatisation de la méthode",
                "Préparer la transition vers la phase d'exposition"
            ],
            homeworks: [
                "Continuer les exercices comportementaux et le carnet",
                "Appliquer la grille de résolution dès qu'un problème surgit"
            ],
            materials: ["Récapitulatif des techniques apprises"],
            scales: ["GAD7"],
            activityType: "complete_session"
        },
        {
            no: 11,
            title: "Évitement Cognitif et Exposition",
            phase: "Traitement",
            duration: 55,
            objectives: [
                "Expliquer l'effet rebond de la suppression des pensées (ours blanc)",
                "Présenter l'exposition écrite comme traitement de l'évitement cognitif",
                "Rédiger le premier scénario d'exposition"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Aujourd'hui, nous abordons le troisième et dernier mécanisme du TAG : l'évitement cognitif. Avez-vous remarqué que, parfois, vous essayez d'arrêter de penser à quelque chose, ou que vous vous distrayez dès qu'une peur surgit ?" },
                { speaker: "Patient", text: "Oui, constamment. Je mets de la musique ou je pense à autre chose pour ne pas y penser." },
                { speaker: "Thérapeute", text: "Je vais vous faire une démonstration. Pendant 30 secondes, essayez de ne pas penser à un ours blanc. Ne pensez surtout pas à un ours blanc." },
                { speaker: "Patient", text: "(Après 30 secondes) C'est impossible ! Je n'ai pensé qu'à ça." },
                { speaker: "Thérapeute", text: "C'est l'effet rebond. En tentant de supprimer une pensée, on l'amplifie. L'évitement cognitif maintient votre anxiété. La solution est contre-intuitive : exposer le cerveau à la peur de manière contrôlée, jusqu'à habituation." },
                { speaker: "Thérapeute", text: "Nous allons rédiger ensemble un scénario : une description détaillée de votre peur la plus intense, écrite au présent, en 1ère personne, avec les émotions. Ce scénario, vous le relirez chaque jour pendant 30 minutes. L'anxiété augmentera puis diminuera — c'est l'habituation." }
            ],
            tasks: [
                "Définir l'évitement cognitif et ses formes",
                "Démonstration de l'effet rebond (ours blanc)",
                "Expliquer le principe d'habituation",
                "Identifier les thèmes de peur principaux du patient",
                "Rédiger le premier scénario d'exposition",
                "Expliquer le protocole d'exposition (30 min/jour, 5 jours/semaine)"
            ],
            homeworks: [
                "Lire le scénario 30 minutes par jour, 5 jours consécutifs",
                "Noter le niveau d'anxiété toutes les 5 minutes (0-10)",
                "NE PAS interrompre l'exposition avant la baisse de l'anxiété"
            ],
            materials: ["Fiche d'Exposition Écrite", "Grille de suivi de l'habituation"],
            scales: ["GAD7", "BAI"],
            activityType: "scenario_writer"
        },
        {
            no: 12,
            title: "Exposition en Imagination I",
            phase: "Traitement",
            duration: 55,
            objectives: [
                "Pratiquer l'exposition au scénario en séance",
                "Observer la courbe d'habituation en temps réel",
                "Éliminer les comportements de rassurance"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Comment s'est passée l'exposition de la semaine ? Avez-vous pu pratiquer ?" },
                { speaker: "Patient", text: "C'était très difficile. L'anxiété montait beaucoup. Mais vers les 20 minutes, ça diminuait." },
                { speaker: "Thérapeute", text: "C'est exactement la courbe d'habituation que nous attendons! L'anxiété monte, puis redescend naturellement. L'important est de rester dans le scénario sans fuir." },
                { speaker: "Thérapeute", text: "Aujourd'hui, nous allons faire une session d'exposition en séance. Vous allez lire votre scénario à voix haute, en essayant de vraiment ressentir les émotions. Moi, je vais noter votre niveau d'anxiété toutes les 5 minutes." },
                { speaker: "Thérapeute", text: "Attention : pas de rassurance verbale de ma part pendant l'exposition. Pas de 'c'est ok' ou 'ça ne se passera pas comme ça'. L'habituation doit se faire naturellement." }
            ],
            tasks: [
                "Retour sur l'exposition de la semaine",
                "Pratiquer l'exposition en séance (20-30 minutes)",
                "Mesurer l'anxiété toutes les 5 minutes",
                "Observer et pointer la courbe d'habituation",
                "Éliminer tous les comportements de rassurance",
                "Renforcer l'engagement à poursuivre"
            ],
            homeworks: [
                "Continuer l'exposition 30 min/jour, 5 jours",
                "Enregistrer l'anxiété sur le graphique d'habituation"
            ],
            materials: ["Graphique d'habituation", "Scénario du patient"],
            scales: ["GAD7"],
            activityType: "exposure_timer"
        },
        {
            no: 13,
            title: "Exposition en Imagination II",
            phase: "Traitement",
            duration: 55,
            objectives: [
                "Varier les thèmes d'exposition",
                "Pratiquer l'habituation croisée entre différents scénarios",
                "Consolider les acquis de l'exposition"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Excellent travail ces deux dernières semaines. Vous avez constaté que l'anxiété baisse si vous ne fuyez pas. Aujourd'hui, nous allons élargir l'exposition à d'autres thèmes de peur." },
                { speaker: "Patient", text: "J'ai aussi peur pour la santé de mon conjoint et pour mes finances." },
                { speaker: "Thérapeute", text: "Nous allons rédiger des scénarios sur ces thèmes également. La bonne nouvelle est que l'habituation est générale — en exposant votre cerveau à différentes peurs, il apprend globalement que les émotions sont gérables." },
                { speaker: "Thérapeute", text: "Nous appelons ça l'habituation croisée. Après quelques semaines d'exposition, beaucoup de patients constatent une réduction globale de leur anxiété, même sur des thèmes qu'ils n'ont pas spécifiquement travaillés." }
            ],
            tasks: [
                "Retour sur l'exposition de la semaine",
                "Identifier 2-3 nouveaux thèmes de scénarios",
                "Rédiger de nouveaux scénarios",
                "Expliquer l'habituation croisée",
                "Planifier l'exposition multiple"
            ],
            homeworks: [
                "Alterner les scénarios sur différents thèmes (santé, finances, famille...)",
                "30 min / 5 jours sur chaque thème en rotation"
            ],
            materials: ["Nouveaux scénarios d'exposition", "Grille de suivi multi-thèmes"],
            scales: ["GAD7"],
            activityType: "exposure_timer"
        },
        {
            no: 14,
            title: "Fin d'Exposition et Bilan",
            phase: "Consolidation",
            duration: 60,
            objectives: [
                "Faire le bilan des séances d'exposition",
                "Réévaluation cognitive de l'issue des peurs",
                "Administrer les échelles de fin (BAI, BDI)"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Nous arrivons à la fin de la phase d'exposition. Comment vous sentez-vous par rapport à votre anxiété aujourd'hui, comparé au début de notre travail ?" },
                { speaker: "Patient", text: "Vraiment mieux. Je m'inquiète encore, mais je peux le gérer différemment. Je ne panique plus autant." },
                { speaker: "Thérapeute", text: "C'est un changement fondamental. Vous avez appris que l'anxiété est un malaise — intense mais non dangereux. Que faire avec une peur n'est pas fuir, c'est la traverser." },
                { speaker: "Thérapeute", text: "Aujourd'hui nous allons réévaluer vos peurs : quelle est la probabilité que le pire scénario se réalise? Et même s'il se réalisait, pourriez-vous y faire face? Souvent les patients réalisent que la conséquence, même redoutée, serait gérable." },
                { speaker: "Thérapeute", text: "Nous allons également repasser les questionnaires du début — le GAD-7, le BAI et le BDI — pour mesurer vos progrès." }
            ],
            tasks: [
                "Bilan des séances d'exposition",
                "Réévaluation cognitive des peurs principales",
                "Administrer GAD-7, BAI, BDI finaux",
                "Comparer avec les scores initiaux",
                "Célébrer les progrès et renforcer positivement",
                "Préparer la séance de terminaison"
            ],
            homeworks: [
                "Continuer l'exposition 2-3 fois par semaine",
                "Lire le document 'Maintien des acquis'"
            ],
            materials: ["Inventaires BAI/BDI de fin", "GAD-7 de fin", "Document Maintien des acquis"],
            scales: ["GAD7", "BAI", "BDI"],
            activityType: "final_assessment"
        },
        {
            no: 15,
            title: "Terminaison et Prévention de Rechute",
            phase: "Consolidation",
            duration: 60,
            objectives: [
                "Consolider les apprentissages de tout le protocole",
                "Établir un plan de prévention de rechute",
                "Planifier les séances de rappel (booster sessions)"
            ],
            verbatim: [
                { speaker: "Thérapeute", text: "Voici notre dernière séance formelle. C'est un moment important — pas une fin, mais le début de votre autonomie dans la gestion de l'anxiété." },
                { speaker: "Patient", text: "Je me sens beaucoup mieux, mais j'ai peur que ça revienne." },
                { speaker: "Thérapeute", text: "Cette peur est normale et saine. Les fluctuations de l'humeur font partie de la vie. Il y aura des périodes plus difficiles — c'est inévitable. L'important, c'est que vous saurez reconnaître les signes et agir." },
                { speaker: "Thérapeute", text: "Une rechute n'est pas un échec — c'est un signal. Si vous remarquez que votre anxiété remonte, c'est le signe de reprendre vos outils : le carnet d'auto-enregistrement, les actions comportementales, la résolution de problèmes, l'exposition." },
                { speaker: "Thérapeute", text: "Nous allons établir ensemble un plan écrit de prévention de rechute : vos signes d'alarme personnels, les outils à utiliser selon la situation, et un plan de 'booster sessions' — des séances de rappel dans 1 mois, 3 mois et 6 mois." },
                { speaker: "Thérapeute", text: "Je suis très fier(fière) du chemin parcouru. Vous avez travaillé dur. Ces outils vous appartiennent maintenant pour la vie." }
            ],
            tasks: [
                "Révision de l'ensemble des outils du protocole",
                "Expliquer les rechutes comme normales et gérables",
                "Identifier les signes d'alarme personnels du patient",
                "Élaborer le plan de prévention de rechute",
                "Planifier les booster sessions (1 mois, 3 mois, 6 mois)",
                "Clôturer la thérapie positivement"
            ],
            homeworks: [
                "Relire le plan de prévention de rechute une fois par mois",
                "Maintenir les habitudes : exposition si nécessaire, actions comportementales"
            ],
            materials: ["Plan de prévention de rechute", "Récapitulatif du protocole TAG", "Contact en cas de besoin"],
            scales: ["GAD7"],
            activityType: "relapse_plan"
        }
    ]
};
