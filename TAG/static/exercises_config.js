/**
 * Ory+ TCC Simulator — Exercise Registry
 * All exercises from Guide de pratique TAG (sections 7.9.1–7.9.24)
 */

const EXERCISE_CATEGORIES = [
    { id: 'psychoeducation', label: 'Psychoéducation', icon: 'fa-book-open', color: '#06b6d4' },
    { id: 'utilite', label: "Utilité des inquiétudes", icon: 'fa-balance-scale', color: '#8b5cf6' },
    { id: 'intolerance', label: "Intolérance à l'incertitude", icon: 'fa-exclamation-triangle', color: '#f59e0b' },
    { id: 'resolution', label: 'Résolution de problèmes', icon: 'fa-lightbulb', color: '#10b981' },
    { id: 'exposition', label: 'Exposition en imagination', icon: 'fa-eye', color: '#ef4444' },
    { id: 'rechute', label: 'Prévention de la rechute', icon: 'fa-shield-heart', color: '#6366f1' }
];

const EXERCISES = [
    // ===================== PSYCHOÉDUCATION =====================
    {
        id: 'ex_7_9_1', ref: '7.9.1',
        title: 'Compréhension du TAG',
        category: 'psychoeducation',
        type: 'info',
        defaultSessions: [1, 2],
        resourcePdf: 'Resources/Guide/tag-dugas-brochure.pdf',
        description: "Document explicatif sur le trouble d'anxiété généralisée, ses symptômes et le rôle de l'évitement.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-book-open me-2" style="color:#06b6d4"></i>Compréhension du TAG</h5>
    <p>Le trouble d'anxiété généralisée est caractérisé par une anxiété et des inquiétudes envahissantes, excessives et incontrôlables.</p>
    <h6>Le cycle de l'anxiété :</h6>
    <ul>
        <li><strong>La situation et le "Et si...?" :</strong> Face à une situation, l'individu se pose des questions à répétition (et si?) générant ainsi un flot d'inquiétudes.</li>
        <li><strong>Définition de l'inquiétude :</strong> Il s'agit d'un ensemble de pensées qui s'enchaînent, au sujet d'événements négatifs futurs, et qui est accompagné d'anxiété. L'inquiétude n'en retiendra que les côtés négatifs, contrairement à la planification.</li>
        <li><strong>Les conséquences :</strong> L'anxiété se manifeste sur le plan somatique (tensions musculaires, fatigue, insomnie) et psychologique (irritabilité, nervosité), suivie de démoralisation et d'épuisement.</li>
    </ul>
    <h6>Les deux types d'inquiétudes :</h6>
    <p>Il est crucial de distinguer celles qui portent sur un problème actuel qui existe déjà (ex: mon chauffe-eau est brisé) et celles qui portent sur un problème potentiel ou éventuel (ex: si mes parents prennent l'avion, il pourrait s'écraser).</p>
</div>
        `
    },
    {
        id: 'ex_7_9_1b', ref: '7.9.1b',
        title: 'Principes de la TCC pour le TAG',
        category: 'psychoeducation', type: 'info',
        defaultSessions: [1],
        description: "Introduction au fonctionnement de la thérapie et au rôle de l'évitement.",
        content: `<div class="exercise-info-content">
        <h5><i class="fas fa-brain me-2" style="color:#06b6d4"></i>Les principes de la TCC</h5>
        <p>La TCC étudie l'interrelation entre les émotions, les pensées et les comportements.</p>
        <ul>
            <li><strong>Collaboration :</strong> Elle s'appuie sur une collaboration active entre le patient (qui connait bien le problème) et le thérapeute (qui connait bien la thérapie).</li>
            <li><strong>Modalités :</strong> Elle est centrée sur le moment présent, et il s'agit d'une thérapie brève et structurée de 15 sessions. Le patient devra mettre en pratique les techniques enseignées entre les séances.</li>
        </ul>
        <h6>Le rôle de l'évitement :</h6>
        <p>Pour éviter l'anxiété, l'individu évite ou fuit les situations appréhendées, ce qui l'empêche de confronter sa peur et de réaliser que rien de catastrophique ne se produit. Il peut aussi tenter d'éviter de faire face à l'incertitude en se rassurant ou en s'inquiétant, ce qui entretient le problème.</p>
    </div>`
    },
    {
        id: 'ex_7_9_2', ref: '7.9.2',
        title: 'Modèle du TAG I — Symptômes',
        category: 'psychoeducation',
        type: 'model',
        defaultSessions: [1, 2],
        description: "Modèle visuel de la chaîne : Situation → Si…? → Inquiétudes → Anxiété → Démoralisation.",
        modelSteps: [
            { label: 'Situation', icon: 'fa-bolt', color: '#64748b' },
            { label: 'Si…?', icon: 'fa-question-circle', color: '#f59e0b' },
            { label: 'Inquiétudes', icon: 'fa-cloud', color: '#ef4444' },
            { label: 'Anxiété', icon: 'fa-heart-pulse', color: '#dc2626' },
            { label: 'Démoralisation', icon: 'fa-face-sad-tear', color: '#7c3aed' },
            { label: 'Épuisement', icon: 'fa-battery-empty', color: '#475569' }
        ]
    },
    {
        id: 'ex_7_9_3', ref: '7.9.3',
        title: 'Prise de conscience des inquiétudes',
        category: 'psychoeducation',
        type: 'daily_log',
        defaultSessions: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        resourcePdf: 'Resources/Fiches_travail/priseconscienceanxiete.pdf',
        description: "Notez vos inquiétudes trois fois par jour, avec le niveau d'anxiété et le type d'inquiétude.",
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '120px' },
            { key: 'heure', label: 'Heure', inputType: 'time', width: '100px' },
            { key: 'inquietude', label: 'Inquiétude', inputType: 'text', placeholder: "Décrire l'inquiétude…" },
            { key: 'niveau', label: 'Anxiété (0-8)', inputType: 'number', min: 0, max: 8, width: '90px' },
            { key: 'type', label: 'Type', inputType: 'select', options: ['Problème réel', 'Problème éventuel'], width: '140px' }
        ]
    },

    // ===================== UTILITÉ DES INQUIÉTUDES =====================
    {
        id: 'ex_7_9_4', ref: '7.9.4',
        title: "Les avantages et désavantages de s'inquiéter",
        category: 'utilite',
        type: 'info',
        defaultSessions: [3],
        description: "Exploration des croyances entretenues au sujet des inquiétudes.",
        content: `
            <h5>À quoi ça sert de s'inquiéter autant ?</h5>
            <p>Si vous vous inquiétez depuis un certain temps, c'est peut-être parce que vous y voyez un certain avantage. Il serait utile de se questionner sur l'utilité potentielle des inquiétudes.</p>
            <h5>Types de croyances face aux inquiétudes</h5>
            <ol type="a">
                <li><strong>Résolution de problèmes</strong> — S'inquiéter aide à régler les problèmes, trouver de meilleures solutions, être plus vigilant.</li>
                <li><strong>Conséquences émotionnelles</strong> — S'inquiéter « d'avance » protège contre la déception, la tristesse, la culpabilité.</li>
                <li><strong>Influencer les autres</strong> — Montrer son soutien à ses proches, démontrer son amour.</li>
                <li><strong>Pouvoir des pensées</strong> — Le fait de s'inquiéter peut avoir un effet sur les événements.</li>
                <li><strong>Origine des inquiétudes</strong> — Les inquiétudes font partie de notre personnalité, c'est un trait immuable.</li>
            </ol>
            <h5>Exercice de l'Avocat du Diable</h5>
            <p>Pour chaque croyance, identifiez : les preuves pour, les arguments contre, les avantages et les désavantages de cette croyance.</p>
        `
    },
    {
        id: 'ex_7_9_5', ref: '7.9.5',
        title: "Modèle du TAG II — Surestimation de l'utilité",
        category: 'utilite',
        type: 'model',
        defaultSessions: [3],
        description: "Le rôle de la surestimation de l'utilité de s'inquiéter dans le cycle du TAG.",
        modelSteps: [
            { label: 'Situation', icon: 'fa-bolt', color: '#64748b' },
            { label: 'Si…?', icon: 'fa-question-circle', color: '#f59e0b' },
            { label: "Surestimation de l'utilité\nde s'inquiéter", icon: 'fa-arrow-up', color: '#8b5cf6', highlight: true },
            { label: 'Inquiétudes', icon: 'fa-cloud', color: '#ef4444' },
            { label: 'Anxiété', icon: 'fa-heart-pulse', color: '#dc2626' },
            { label: 'Démoralisation / Épuisement', icon: 'fa-battery-empty', color: '#475569' }
        ]
    },
    {
        id: 'ex_7_9_6', ref: '7.9.6',
        title: "Liste des avantages et désavantages de s'inquiéter",
        category: 'utilite',
        type: 'two_columns',
        defaultSessions: [3],
        resourcePdf: 'Resources/Fiches_travail/avantagesdesavantagesinquietudes.pdf',
        description: "Lister les avantages (utilité) et les désavantages (inconvénients) de s'inquiéter.",
        columnA: { label: 'Avantages (utilité)', placeholder: "En quoi s'inquiéter m'est utile…" },
        columnB: { label: 'Désavantages (inconvénients)', placeholder: "En quoi s'inquiéter me nuit…" }
    },
    {
        id: 'ex_7_9_7', ref: '7.9.7',
        title: "Exercice de l'Avocat du Diable",
        category: 'utilite',
        type: 'structured_form',
        defaultSessions: [3],
        description: "Remise en question d'une croyance face aux inquiétudes. Identifiez une croyance cible et répondez aux questions.",
        fields: [
            { key: 'croyance', label: 'Description de la croyance', type: 'textarea', placeholder: "La croyance que je veux examiner est…", rows: 2 },
            { key: 'preuves_pour', label: '1. Quelles sont vos preuves ou arguments pour dire que cette croyance est vraie ?', type: 'textarea', rows: 3 },
            { key: 'preuves_contre', label: '2. Si vous aviez à démontrer que cette croyance n\'est pas vraie, quels seraient vos arguments ?', type: 'textarea', rows: 3 },
            { key: 'avantages', label: '3. Quels sont les avantages que cette croyance vous apporte ?', type: 'textarea', rows: 3 },
            { key: 'desavantages', label: '4. Quels sont les désavantages que cette croyance vous apporte ?', type: 'textarea', rows: 3 }
        ],
        repeatable: true
    },

    // ===================== INTOLÉRANCE À L'INCERTITUDE =====================
    {
        id: 'ex_7_9_8', ref: '7.9.8',
        title: "Prendre conscience et atténuer l'intolérance à l'incertitude",
        category: 'intolerance',
        type: 'info',
        defaultSessions: [4, 5],
        description: "Comprendre l'intolérance à l'incertitude et comment l'action permet de la modifier.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-exclamation-triangle me-2" style="color:#f59e0b"></i>L'intolérance à l'incertitude</h5>
    <p>L'intolérance à l'incertitude (i.e. la non-acceptation de la possibilité, même infime, qu'un événement négatif puisse se produire) est un facteur central dans le maintien du TAG. Il s'agit d'une sorte d'allergie à l'incertitude.</p>
    <h6>Les deux réactions dysfonctionnelles :</h6>
    <p>Pour augmenter leur sentiment de certitude, les individus tentent d'éliminer l'incertitude en l'évitant ou en réagissant de façon excessive.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1rem 0;">
        <div style="background:#fef3c7;border-radius:8px;padding:1rem;">
            <strong style="color:#92400e;">L'Évitement</strong>
            <ul style="margin:0.5rem 0 0;padding-left:1.2rem;font-size:0.85rem;">
                <li>Procrastiner</li>
                <li>Trouver des obstacles artificiels</li>
                <li>S'engager partiellement</li>
                <li>S'éparpiller</li>
            </ul>
        </div>
        <div style="background:#fee2e2;border-radius:8px;padding:1rem;">
            <strong style="color:#991b1b;">La Surréaction</strong>
            <ul style="margin:0.5rem 0 0;padding-left:1.2rem;font-size:0.85rem;">
                <li>Ne pas déléguer</li>
                <li>Revérifier</li>
                <li>Rechercher plus d'information</li>
                <li>Chercher la réassurance</li>
            </ul>
        </div>
    </div>
    <h6>La solution par l'action :</h6>
    <p>Le comportement est un moyen privilégié pour modifier ses attitudes et sa façon de penser. Le principe est d'agir comme si on était tolérant, et la plus grande motivation ne précède pas l'action mais la suit.</p>
</div>
        `
    },
    {
        id: 'ex_7_9_9', ref: '7.9.9',
        title: "Modèle du TAG III — Intolérance à l'incertitude",
        category: 'intolerance',
        type: 'model',
        defaultSessions: [4],
        description: "Le rôle central de l'intolérance à l'incertitude dans le cycle du TAG.",
        modelSteps: [
            { label: 'Situation', icon: 'fa-bolt', color: '#64748b' },
            { label: "Intolérance\nà l'incertitude", icon: 'fa-exclamation-triangle', color: '#f59e0b', highlight: true, wide: true },
            { label: 'Si…?', icon: 'fa-question-circle', color: '#f59e0b' },
            { label: "Surestimation de l'utilité\nde s'inquiéter", icon: 'fa-arrow-up', color: '#8b5cf6' },
            { label: 'Inquiétudes', icon: 'fa-cloud', color: '#ef4444' },
            { label: 'Anxiété / Démoralisation / Épuisement', icon: 'fa-heart-pulse', color: '#dc2626' }
        ]
    },
    {
        id: 'ex_7_9_10', ref: '7.9.10',
        title: "Manifestations d'intolérance à l'incertitude",
        category: 'intolerance',
        type: 'checklist_examples',
        defaultSessions: [4],
        resourcePdf: 'Resources/Fiches_travail/manifestationsintoleranceincertitude.pdf',
        description: "Identifiez vos manifestations personnelles d'intolérance à l'incertitude.",
        items: [
            { label: 'Éviter de faire certaines choses', example: "Ex. Éviter d'aborder un sujet délicat avec un ami car on n'est pas certain de sa réaction." },
            { label: 'Trouver des obstacles artificiels pour ne pas faire certaines choses', example: "Ex. Refuser un nouveau projet prétextant qu'on veut passer du temps avec les enfants." },
            { label: 'Procrastiner (remettre à plus tard)', example: "Ex. Remettre à plus tard un téléphone parce qu'on n'est pas certain de la réaction." },
            { label: 'Tout vouloir faire soi-même, ne pas déléguer', example: "Ex. Faire toutes les tâches au bureau parce qu'on n'est pas certain que ce sera bien fait." },
            { label: "S'engager partiellement dans une relation, un travail, un projet", example: "Ex. Ne pas s'investir complètement par crainte de l'issue incertaine." },
            { label: "S'éparpiller, poursuivre plusieurs démarches en parallèle", example: "Ex. Faire une application dans des domaines différents pour augmenter ses chances." },
            { label: "Rechercher plus d'informations avant d'aller de l'avant", example: "Ex. Lire beaucoup de documentation, demander les mêmes informations à plusieurs personnes." },
            { label: 'Remettre en question des décisions déjà prises', example: "Ex. Retourner un vêtement parce qu'on n'est pas certain qu'il nous va." },
            { label: 'Rechercher de la réassurance', example: "Ex. Demander à son partenaire de nous rassurer. S'excuser à répétition." },
            { label: 'Se rassurer soi-même par un optimisme exagéré', example: "Ex. Se dire qu'on est capable sans conviction, chercher à tout expliquer rationnellement." },
            { label: 'Revérifier à plusieurs reprises des actions faites', example: "Ex. Relire un texte pour être sûr d'avoir bien compris. Vérifier si la porte est barrée." },
            { label: 'Surprotéger les autres, faire des choses à leur place', example: "Ex. Prendre des rendez-vous médicaux pour son conjoint. Empêcher son enfant de sortir." }
        ]
    },
    {
        id: 'ex_7_9_11', ref: '7.9.11',
        title: 'Incertitude et changement de comportement',
        category: 'intolerance',
        type: 'structured_form',
        defaultSessions: [4, 5, 6],
        description: "Décrivez une action choisie pour augmenter votre tolérance à l'incertitude.",
        fields: [
            { key: 'action', label: "Description de l'action choisie", type: 'textarea', placeholder: "L'action que j'ai choisie pour affronter l'incertitude est…", rows: 3 },
            { key: 'inconfort', label: "Inconfort ressenti pendant l'action", type: 'textarea', placeholder: "Pendant que je faisais cette action, j'ai ressenti…", rows: 3 },
            { key: 'pensees', label: "Pensées présentes pendant l'action", type: 'textarea', placeholder: "Les pensées qui me traversaient l'esprit étaient…", rows: 3 },
            { key: 'observations', label: "Observations après avoir fait l'action", type: 'textarea', placeholder: "Après avoir fait cette action, j'ai constaté que…", rows: 3 }
        ],
        repeatable: true
    },

    // ===================== RÉSOLUTION DE PROBLÈMES =====================
    {
        id: 'ex_7_9_12', ref: '7.9.12',
        title: 'Étapes de la résolution de problèmes',
        category: 'resolution',
        type: 'info',
        defaultSessions: [7, 8],
        description: "Présentation de la démarche structurée de résolution de problèmes en 5 étapes.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-lightbulb me-2" style="color:#10b981"></i>L'orientation inefficace face aux problèmes</h5>
    <p>Les inquiétudes qui concernent un problème actuel sont en grande partie entretenues par l'orientation inefficace face aux problèmes.</p>
    <h6>Les manifestations de l'orientation inefficace :</h6>
    <ul>
        <li><strong>Ne pas voir le vrai problème :</strong> On s'inquiète sans voir la cause réelle. <em>Solution :</em> Utiliser ses émotions négatives (tristesse, colère) comme indices pour reconnaître la présence d'un problème.</li>
        <li><strong>Croire qu'il est anormal d'avoir un problème :</strong> L'individu se culpabilise (déficit personnel) ou s'indigne (injustice). <em>Solution :</em> Normaliser le fait d'avoir des problèmes, identifier tous les facteurs impliqués, et cultiver l'indulgence.</li>
        <li><strong>Éviter ou trop réagir (sentiment d'urgence) :</strong> Le problème est considéré comme une menace. <em>Solution :</em> Considérer que les problèmes sont des défis plutôt que des menaces (continuum Menace/Défi). Il faut s'arrêter et considérer le problème plutôt que d'agir impulsivement.</li>
    </ul>
</div>
        `
    },
    {
        id: 'ex_7_9_13', ref: '7.9.13',
        title: 'Modèle du TAG IV — Difficultés de résolution',
        category: 'resolution',
        type: 'model',
        defaultSessions: [7],
        description: "Le rôle des difficultés de résolution de problèmes dans le cycle du TAG.",
        modelSteps: [
            { label: 'Situation', icon: 'fa-bolt', color: '#64748b' },
            { label: "Intolérance\nà l'incertitude", icon: 'fa-exclamation-triangle', color: '#f59e0b', wide: true },
            { label: 'Si…?', icon: 'fa-question-circle', color: '#f59e0b' },
            { label: "Surestimation de l'utilité", icon: 'fa-arrow-up', color: '#8b5cf6' },
            { label: "Difficultés de\nrésolution de problèmes", icon: 'fa-puzzle-piece', color: '#10b981', highlight: true },
            { label: 'Inquiétudes → Anxiété → Épuisement', icon: 'fa-cloud', color: '#ef4444' }
        ]
    },
    {
        id: 'ex_7_9_14', ref: '7.9.14',
        title: 'Liste des problèmes actuels et récurrents',
        category: 'resolution',
        type: 'free_list',
        defaultSessions: [7],
        description: "Identifiez les problèmes actuels ou récurrents dans différentes sphères de votre vie.",
        helpText: "Les problèmes peuvent se présenter dans : relations avec vos proches, amis, travail, études, engagements, loisirs, tâches quotidiennes.",
        examples: [
            "J'ai un trop grand nombre de dossiers sous ma responsabilité.",
            "Je n'ai aucun coussin financier pour faire face aux imprévus.",
            "Je ne fais pas suffisamment d'activités physiques."
        ],
        placeholder: "Décrire un problème actuel ou récurrent…"
    },
    {
        id: 'ex_7_9_15', ref: '7.9.15',
        title: 'Exemples de réaction contreproductive aux problèmes',
        category: 'resolution',
        type: 'checklist',
        defaultSessions: [7],
        description: "Identifiez vos principales réactions contreproductives face aux problèmes.",
        items: [
            { label: "Les gens n'ont pas de problèmes. Si j'ai un problème, ça veut dire que je suis anormal(e).", tag: 'anormalité' },
            { label: "Je suis le(la) seul(e) à avoir les problèmes que j'ai.", tag: 'anormalité/injustice' },
            { label: "Ce n'est pas vraiment un problème, ça fait partie de la vie.", tag: 'ne pas voir' },
            { label: "Je ne peux tolérer d'avoir un problème en suspens.", tag: 'trop réagir' },
            { label: "Quand les choses ne vont pas bien dans ma vie, c'est terrible et catastrophique.", tag: 'éviter ou trop réagir' },
            { label: "Je suis la cause de tous mes problèmes.", tag: 'anormalité/déficit' },
            { label: "Mes problèmes sont toujours causés par les autres.", tag: 'anormalité/injustice' },
            { label: "La première solution qui vient à l'esprit est la meilleure.", tag: 'trop réagir' },
            { label: "Je n'ai pas de problème.", tag: 'ne pas voir' },
            { label: "Il y a toujours une réponse parfaite à chaque problème.", tag: 'éviter ou trop réagir' },
            { label: "Les gens ne peuvent pas changer ; je suis fait(e) comme ça.", tag: 'éviter' },
            { label: "Si je règle le problème rapidement, la situation ne s'aggravera pas.", tag: 'trop réagir' },
            { label: "Les gens ordinaires ne peuvent solutionner la plupart des problèmes.", tag: 'éviter' },
            { label: "Si je suis une bonne personne, je mérite une vie sans problèmes.", tag: 'anormalité/injustice' },
            { label: "Je devrais être capable de régler mes problèmes rapidement ; si je n'y arrive pas, c'est que je suis incompétent(e).", tag: 'anormalité/déficit' }
        ]
    },
    {
        id: 'ex_7_9_16', ref: '7.9.16',
        title: "Résolution d'un problème",
        category: 'resolution',
        type: 'problem_solving',
        defaultSessions: [8, 9, 10],
        description: "Appliquez la démarche structurée de résolution de problèmes à un problème concret.",
        fields: [
            { key: 'definition', label: 'Définition du problème', type: 'textarea', placeholder: "Le problème est… (Qui ? Quoi ? Quand ?)", rows: 2 },
            { key: 'objectif', label: "Formulation de l'objectif : Qu'est-ce que je peux faire pour…? Comment faire pour…?", type: 'textarea', placeholder: "Mon objectif est de…", rows: 2 },
            { key: 'reaction', label: "Modification de la réaction : Est-ce que je réagis de façon contreproductive ? Y'aurait-il une autre façon de réagir ?", type: 'textarea', placeholder: "Ma réaction actuelle est… Une alternative serait…", rows: 2 }
        ],
        solutionSlots: 10,
        evaluationFields: [
            { key: 'solution_choisie', label: 'Solution(s) choisie(s)', type: 'textarea', rows: 2 },
            { key: 'strategie', label: "Stratégie d'application : Comment je vais m'y prendre", type: 'textarea', rows: 2 },
            { key: 'evaluation_probleme', label: "Évaluation : Est-ce que le problème est résolu ?", type: 'textarea', rows: 2 },
            { key: 'evaluation_emotions', label: "Évaluation : Est-ce que j'éprouve un soulagement émotionnel ?", type: 'textarea', rows: 2 }
        ],
        repeatable: true
    },

    // ===================== EXPOSITION =====================
    {
        id: 'ex_7_9_17', ref: '7.9.17',
        title: "L'exposition en imagination",
        category: 'exposition',
        type: 'info',
        defaultSessions: [11],
        description: "Comprendre l'évitement cognitif, la neutralisation et le principe d'exposition par habituation.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-eye me-2" style="color:#ef4444"></i>L'évitement, la neutralisation et l'Ours Blanc</h5>
    <p>L'exposition en imagination s'adresse aux problèmes hypothétiques (improbables, flous ou lointains).</p>
    <h6>Le piège de la suppression : Le test de l'ours blanc</h6>
    <p>Dans les prochaines trente secondes, essayez de ne pas penser à un ours blanc. Plus on essaie de ne pas penser à quelque chose, plus on est envahi par la pensée. Il est donc vain de refouler les pensées anxiogènes car elles reviennent en force.</p>
    <h6>L'illusion de la neutralisation</h6>
    <p>La neutralisation (ex: se distraire, se parler pour se rassurer, chasser les pensées) amène une détérioration de la situation. La peur sera moins vive à court terme mais pas à long terme, puisque le fait de ne pas être totalement présent empêche de digérer la peur (traitement émotionnel).</p>
    <h6>La solution par l'habituation</h6>
    <p>L'exposition aux scénarios catastrophiques permet de réaliser que l'anxiété risque de croître, d'atteindre un plateau, puis de redescendre lentement. À chaque exposition, le niveau d'anxiété diminuera plus rapidement par habituation.</p>
</div>
        `
    },
    {
        id: 'ex_7_9_18', ref: '7.9.18',
        title: 'Figures : Neutralisation et Exposition',
        category: 'exposition',
        type: 'model',
        defaultSessions: [11],
        description: "Courbes illustrant l'effet de l'évitement, la neutralisation et l'habituation sur l'anxiété.",
        modelSteps: [
            { label: "Évitement\n→ Anxiété redescend vite\nmais revient au même niveau", icon: 'fa-person-running', color: '#ef4444' },
            { label: "Neutralisation\n→ Anxiété baisse partiellement\nmais ne disparaît pas", icon: 'fa-hand', color: '#f59e0b' },
            { label: "Exposition\n→ Anxiété monte puis\ndiminue par habituation", icon: 'fa-chart-line', color: '#10b981', highlight: true }
        ]
    },
    {
        id: 'ex_7_9_19', ref: '7.9.19',
        title: "Modèle du TAG V — Évitement et Neutralisation",
        category: 'exposition',
        type: 'model',
        defaultSessions: [11],
        description: "Le rôle de l'évitement et de la neutralisation dans le cycle complet du TAG.",
        modelSteps: [
            { label: 'Situation', icon: 'fa-bolt', color: '#64748b' },
            { label: "Intolérance à l'incertitude", icon: 'fa-exclamation-triangle', color: '#f59e0b', wide: true },
            { label: 'Si…?', icon: 'fa-question-circle', color: '#f59e0b' },
            { label: "Surestimation + Difficultés résolution", icon: 'fa-arrow-up', color: '#8b5cf6' },
            { label: "Évitement\nNeutralisation", icon: 'fa-eye-slash', color: '#ef4444', highlight: true },
            { label: 'Inquiétudes → Anxiété → Épuisement', icon: 'fa-cloud', color: '#dc2626' }
        ]
    },
    {
        id: 'ex_7_9_20', ref: '7.9.20',
        title: "Scénario pour l'exposition",
        category: 'exposition',
        type: 'structured_form',
        defaultSessions: [11, 12, 13],
        description: "Rédigez un scénario d'exposition centré sur un seul thème de peur.",
        helpText: "Le scénario doit être : au présent, au « je », en langage parlé, centré sur un seul thème, détaillé (5 sens), sans éléments rassurants, effrayant mais crédible. Durée de lecture : ~55 secondes.",
        fields: [
            { key: 'theme', label: 'Thème de la peur fondamentale', type: 'select', options: ['Santé (la mienne)', "Santé d'un proche", 'Finances / Travail', 'Relations / Famille', "Décisions / L'avenir", 'Autre'] },
            { key: 'scenario', label: "Scénario d'exposition", type: 'textarea', placeholder: "Je suis dans… Je ressens… J'entends… Ma plus grande crainte est que… (Écrire au présent, au « je », avec les émotions et les sens)", rows: 10 }
        ],
        repeatable: true
    },
    {
        id: 'ex_7_9_21', ref: '7.9.21',
        title: "Fiche d'exposition",
        category: 'exposition',
        type: 'exposure_sheet',
        defaultSessions: [11, 12, 13, 14],
        description: "Remplir après chaque séance d'exposition pour suivre l'évolution de l'anxiété.",
        fields: [
            { key: 'theme', label: 'Thème du scénario', type: 'text' },
            { key: 'heure_avant', label: 'Heure (avant)', type: 'time' },
            { key: 'niveau_avant', label: "Niveau de malaise AVANT l'exposition (0-8)", type: 'range', min: 0, max: 8 },
            { key: 'heure_apres', label: 'Heure (après)', type: 'time' },
            { key: 'niveau_apres', label: "Niveau de malaise APRÈS l'exposition (0-8)", type: 'range', min: 0, max: 8 },
            { key: 'niveau_max', label: 'Niveau MAXIMAL de malaise pendant (0-8)', type: 'range', min: 0, max: 8 },
            { key: 'neutralisation', label: "Avez-vous neutralisé pendant l'exposition ?", type: 'select', options: ['Non', 'Oui'] },
            { key: 'neutralisation_comment', label: 'Si oui, comment ?', type: 'textarea', rows: 2, conditional: 'neutralisation:Oui' }
        ],
        repeatable: true
    },

    // ===================== PRÉVENTION DE LA RECHUTE =====================
    {
        id: 'ex_7_9_22', ref: '7.9.22',
        title: 'Résumé de traitement et prévention de la rechute',
        category: 'rechute',
        type: 'info',
        defaultSessions: [15],
        description: "Devenir son propre thérapeute : reconnaître les inquiétudes, appliquer les outils, distinguer chute et rechute.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-shield-heart me-2" style="color:#6366f1"></i>Prévention de la rechute : Devenir son propre thérapeute</h5>
    <p>L'objectif final est que le patient devienne son propre thérapeute en appliquant les techniques enseignées dès qu'il présente des inquiétudes excessives.</p>
    <h6>Résumé décisionnel des compétences :</h6>
    <ul>
        <li><strong>Problème actuel :</strong> Se questionner sur l'utilité de s'inquiéter, puis effectuer une résolution de problèmes structurée.</li>
        <li><strong>Problème hypothétique :</strong> S'exposer par écrit aux pires inquiétudes, car l'exposition permet de tolérer l'anxiété et d'augmenter la tolérance à l'incertitude.</li>
    </ul>
    <h6>Chute vs Rechute</h6>
    <p>Le patient doit faire la différence entre les fluctuations normales du niveau d'inquiétude et une rechute. Il faut éviter de dramatiser si on note la présence de plusieurs inquiétudes concomitantes, mais on ne doit pas non plus les ignorer.</p>
    <p>Lors des périodes difficiles, on peut considérer qu'il s'agit d'une belle occasion de revoir les notions apprises et de les appliquer à la situation. C'est une façon de se protéger de la rechute.</p>
</div>
        `
    },
    {
        id: 'ex_7_9_23', ref: '7.9.23',
        title: "Modèle du TAG VI — Modèle complet",
        category: 'rechute',
        type: 'model',
        defaultSessions: [15],
        description: "Modèle complet intégrant tous les facteurs : II, surestimation, résolution, évitement + événements/émotions.",
        modelSteps: [
            { label: 'Situation', icon: 'fa-bolt', color: '#64748b' },
            { label: "Intolérance à l'incertitude", icon: 'fa-exclamation-triangle', color: '#f59e0b', wide: true },
            { label: 'Si…?', icon: 'fa-question-circle', color: '#f59e0b' },
            { label: "Surestimation de l'utilité", icon: 'fa-arrow-up', color: '#8b5cf6' },
            { label: 'Difficultés résolution', icon: 'fa-puzzle-piece', color: '#10b981' },
            { label: 'Évitement / Neutralisation', icon: 'fa-eye-slash', color: '#ef4444' },
            { label: 'Inquiétudes → Anxiété → Épuisement', icon: 'fa-cloud', color: '#dc2626' },
            { label: 'État émotionnel + Événement de vie', icon: 'fa-heart', color: '#ec4899', highlight: true }
        ]
    },
    {
        id: 'ex_7_9_24', ref: '7.9.24',
        title: 'Objectifs pour poursuivre votre évolution',
        category: 'rechute',
        type: 'goals_form',
        defaultSessions: [15],
        description: "Identifiez les inquiétudes restantes et les moyens que vous utiliserez pour continuer à progresser.",
        minGoals: 2,
        maxGoals: 5
    }
];

function getExerciseById(id) {
    if (id && id.startsWith('__guide__')) {
        const tool = id.substring('__guide__'.length);
        let pdf = null;
        if (typeof PROTOCOL_TOOL_MAP !== 'undefined' && PROTOCOL_TOOL_MAP[tool]) {
            const mapped = PROTOCOL_TOOL_MAP[tool].map(x => EXERCISES.find(e => e.id === x)).filter(Boolean);
            pdf = mapped.find(e => e.resourcePdf)?.resourcePdf || null;
        }
        return {
            id,
            ref: 'Guide',
            category: 'psychoeducation',
            title: tool.replace(/_/g, ' '),
            description: 'Guide (document de phase)',
            type: 'info',
            content: `<div class="exercise-info-content">
                <h5>Guide</h5>
                <p><strong>${tool}</strong></p>
                ${pdf ? `<p><a href="${pdf}" target="_blank" rel="noopener">Ouvrir le document (PDF)</a></p>` : ''}
                <p style="color:var(--text-muted)">Coming soon : ce guide n’est pas encore disponible sous forme de fiche interactive.</p>
            </div>`
        };
    }
    let ex = EXERCISES.find(e => e.id === id);
    if (ex) return ex;
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.customExercises) {
        return app.state.selectedPatient.customExercises[id] || null;
    }
    return null;
}

const PROTOCOL_TOOL_MAP = {
    "Guide_Modele_TAG": ['ex_7_9_1', 'ex_7_9_2'],
    "Guide_Principes_TCC": ['ex_7_9_1b'],
    "Carnet_AutoEnregistrement_Inquietudes": ['ex_7_9_3'],
    "Avantages_Desavantages_Inquietudes": ['ex_7_9_6'],
    "Exercice_Avocat_Du_Diable": ['ex_7_9_4', 'ex_7_9_7'],
    "Liste_12_Comportements": ['ex_7_9_10'],
    "Action_Comportementale_Incertitude": ['ex_7_9_11'],
    "Guide_Definir_Intolerance_Incertitude": ['ex_7_9_8', 'ex_7_9_9'],
    "Liste_Problemes_Actuels": ['ex_7_9_14'],
    "Reactions_Contreproductives": ['ex_7_9_15'],
    "Exercice_Resolution_Probleme_4Etapes": ['ex_7_9_16'],
    "Guide_Introduction_Resolution_Problemes": ['ex_7_9_12', 'ex_7_9_13'],
    "Scenario_Exposition_Imaginaire": ['ex_7_9_20'],
    "Journal_Evaluation_Neutralisation": ['ex_7_9_21'],
    "Guide_Evitement_Ours_Blanc": ['ex_7_9_17', 'ex_7_9_18', 'ex_7_9_19'],
    "Plan_Objectifs_Futurs": ['ex_7_9_24'],
    "Guide_Chute_vs_Rechute": ['ex_7_9_22'],
    "Resume_Competences_TCC": ['ex_7_9_23']
};

function getExercisesForSession(sessionNo) {
    const frac = sessionNo - Math.floor(sessionNo);
    const isGuideSession = sessionNo !== Math.floor(sessionNo) && Math.abs(frac - 0.9) < 1e-6;
    const lookupNo = isGuideSession ? Math.ceil(sessionNo) : ((sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo);
    let theoreticalIds = [];

    if (window.PROTOCOL) {
        const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(lookupNo));
        if (phase) {
            // Guides are moved to a dedicated "Guide" session (X.9) placed before the phase start.
            const requestedTools = isGuideSession ? (phase.guides || []) : (phase.worksheets || []);
            let readableGuideIds = [];
            let fallbackGuideIds = [];
            requestedTools.forEach(tool => {
                if (!isGuideSession) {
                    if (PROTOCOL_TOOL_MAP[tool]) {
                        theoreticalIds = theoreticalIds.concat(PROTOCOL_TOOL_MAP[tool]);
                    }
                    return;
                }

                if (PROTOCOL_TOOL_MAP[tool]) {
                    const mappedIds = PROTOCOL_TOOL_MAP[tool];
                    const mapped = mappedIds.map(id => getExerciseById(id)).filter(Boolean);
                    const allReadable = mapped.length > 0 && mapped.every(e => ['info', 'model'].includes(e.type));
                    if (allReadable) {
                        readableGuideIds = readableGuideIds.concat(mappedIds);
                    } else {
                        fallbackGuideIds.push(`__guide__${tool}`);
                    }
                } else {
                    fallbackGuideIds.push(`__guide__${tool}`);
                }
            });
            if (isGuideSession) {
                // If at least one real guide exists, do not add "Coming soon" fallbacks.
                if (readableGuideIds.length > 0) {
                    theoreticalIds = theoreticalIds.concat(readableGuideIds);
                } else if (requestedTools.length === 0) {
                    theoreticalIds.push(`__guide__Coming_soon`);
                } else {
                    theoreticalIds = theoreticalIds.concat(fallbackGuideIds);
                }
            }
        }
    } else {
        theoreticalIds = EXERCISES.filter(e => e.defaultSessions.includes(lookupNo)).map(e => e.id);
    }
    
    // Add dynamic added exercises
    let added = [];
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.addedExercises) {
        const agendaKey = isGuideSession ? lookupNo : lookupNo;
        added = app.state.selectedPatient.addedExercises[agendaKey] || [];
    }

    // Psychologue library: exercises explicitly marked as always available
    const always = EXERCISES.filter(e => e.alwaysAvailable === true).map(e => e.id);

    const allIds = [...new Set([...theoreticalIds, ...added, ...always])];
    return allIds.map(id => getExerciseById(id)).filter(e => e);
}

function getExercisesByCategory(catId) {
    return EXERCISES.filter(e => e.category === catId);
}

function getActiveExercises() {
    return EXERCISES.filter(e => e.type !== 'info' && e.type !== 'model');
}
