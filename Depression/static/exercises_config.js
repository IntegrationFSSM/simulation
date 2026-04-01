// Configuration des exercices pour le module Dépression

const EXERCISE_CATEGORIES = [
    { id: 'eval_initiale', label: '1. Évaluation & Sécurité', icon: 'fa-shield-heart' },
    { id: 'activation', label: '2. Activation Comportementale', icon: 'fa-person-running' },
    { id: 'cognition', label: '3. Restructuration Cognitive', icon: 'fa-brain' },
    { id: 'schemas', label: '4. Résolution & Schémas', icon: 'fa-puzzle-piece' },
    { id: 'prevention', label: '5. Prévention des rechutes', icon: 'fa-route' },
    { id: 'guides', label: '6. Guides Patient & Psychoéducation', icon: 'fa-book-open' }
];

const EXERCISES = [
    // --- EVALUATION ---
    {
        id: 'contrat_non_suicide',
        ref: 'DEP-01',
        title: 'Contrat de non-suicide',
        category: 'eval_initiale',
        type: 'structured_form',
        description: 'Document d\'engagement à la sécurité à remplir avec le clinicien lors de l\'évaluation initiale.',
        fields: [
            { key: 'engagement', label: 'Dans le cadre de ma thérapie, je m\'engage à ne pas attenter à ma vie.', type: 'select', options: ['Oui, je m\'y engage', 'Je ne peux pas m\'y engager aujourd\'hui'] },
            { key: 'personnes_ressources', label: 'Personnes à contacter en cas d\'urgence (noms et numéros)', type: 'textarea', rows: 2 },
            { key: 'numero_crise', label: 'Ligne d\'urgence (ex: Centre de crise, SAMU)', type: 'text', placeholder: 'Ex: 15, ou Ligne 0800...' },
            { key: 'signature', label: 'Signature symbolique (Nom)', type: 'text' }
        ]
    },
    // --- ACTIVATION COMPORTEMENTALE ---
    {
        id: 'registre_activites_pmt',
        ref: 'DEP-02',
        title: 'Registre des activités (Plaisir & Maîtrise)',
        category: 'activation',
        type: 'daily_log',
        description: 'Enregistrez vos activités quotidiennes heure par heure. Notez de 0 à 10 le Plaisir (P) et le sentiment de Maîtrise/Dépassement (M).',
        columns: [
            { key: 'heure', label: 'Heure', type: 'text', placeholder: 'ex: 10h-11h' },
            { key: 'activite', label: 'Activité réalisée', type: 'text' },
            { key: 'plaisir', label: 'Plaisir (0-10)', type: 'number', min: 0, max: 10 },
            { key: 'maitrise', label: 'Maîtrise (0-10)', type: 'number', min: 0, max: 10 }
        ]
    },
    // --- COGNITION ---
    {
        id: 'tableau_pensees_auto',
        ref: 'DEP-03',
        title: 'Tableau d\'enregistrement des pensées automatiques',
        category: 'cognition',
        type: 'structured_form',
        description: 'Utilisez la méthode des colonnes pour identifier et remettre en question vos pensées biaisées.',
        fields: [
            { key: 'situation', label: '1. Situation (Qui, Quoi, Quand, Où ?)', type: 'textarea', rows: 2 },
            { key: 'emotion', label: '2. Émotion et intensité (0-100%)', type: 'text' },
            { key: 'pensee', label: '3. Pensée automatique (Qu\'est-ce qui m\'a traversé l\'esprit ?)', type: 'textarea', rows: 2 },
            { key: 'preuves', label: '4. Preuves pour et contre (Analyse objective)', type: 'textarea', rows: 3 },
            { key: 'pensee_alt', label: '5. Pensée alternative / équilibrée', type: 'textarea', rows: 2 },
            { key: 'emotion_reb', label: '6. Nouvelle intensité de l\'émotion (0-100%)', type: 'text' }
        ]
    },
    {
        id: 'trap_trac',
        ref: 'DEP-04',
        title: 'TRAP / TRAC : Modifier l\'évitement',
        category: 'cognition',
        type: 'structured_form',
        description: 'Identifier les déclencheurs et l\'évitement (TRAP) pour les remplacer par un coping alternatif (TRAC).',
        fields: [
            { key: 'trigger', label: 'T - Trigger (Déclencheur)', type: 'textarea', rows: 2 },
            { key: 'response', label: 'R - Response (Réponse émotionnelle/physique)', type: 'text' },
            { key: 'avoidance', label: 'AP - Avoidance Pattern (Évitement habituel)', type: 'textarea', rows: 2 },
            { key: 'ac_coping', label: 'AC - Alternative Coping (Action alternative saine)', type: 'textarea', rows: 2 }
        ]
    },
    // --- SCHEMAS ---
    {
        id: 'grille_resolution',
        ref: 'DEP-05',
        title: 'Grille de Résolution de Problèmes',
        category: 'schemas',
        type: 'structured_form',
        description: 'Méthode en 5 étapes pour faire face à un stresseur réel.',
        fields: [
            { key: 'definition', label: '1. Définition claire du problème', type: 'textarea', rows: 2 },
            { key: 'brainstorming', label: '2. Scénarios / Brainstorming de solutions', type: 'textarea', rows: 3 },
            { key: 'evaluation', label: '3. Évaluation (Avantages / Inconvénients)', type: 'textarea', rows: 2 },
            { key: 'choix', label: '4. Décision (Quelle solution choisir ?)', type: 'textarea', rows: 1 },
            { key: 'plan', label: '5. Plan d\'action et application', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'fleche_descendante',
        ref: 'DEP-06',
        title: 'Technique de la Flèche Descendante',
        category: 'schemas',
        type: 'structured_form',
        description: 'Descendre d\'une pensée automatique vers la croyance fondamentale ou le schéma sous-jacent.',
        fields: [
            { key: 'p_surface', label: 'Pensée de surface', type: 'text' },
            { key: 'niveau1', label: '"Et si cela était vrai, qu\'est-ce que ça signifierait pour moi ?"', type: 'textarea', rows: 2 },
            { key: 'niveau2', label: 'Encore plus profond...', type: 'textarea', rows: 2 },
            { key: 'croyance_fond', label: 'Schéma ou croyance fondamentale identifiée', type: 'text', placeholder: 'ex: "Je suis un échec", "Personne ne m\'aimera"' }
        ]
    },
    // --- MAINTIEN ---
    {
        id: 'resume_therapie',
        ref: 'DEP-07',
        title: 'Résumé de la Thérapie',
        category: 'prevention',
        type: 'structured_form',
        description: 'Bilan de ce qui a fonctionné.',
        fields: [
            { key: 'succes', label: 'Quels ont été mes plus grands succès ?', type: 'textarea', rows: 3 },
            { key: 'outils', label: 'Quels outils m\'ont été le plus utiles ?', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'plan_rechute',
        ref: 'DEP-08',
        title: 'Plan de Prévention des Rechutes',
        category: 'prevention',
        type: 'structured_form',
        description: 'Identifier les signes avant-coureurs d\'une baisse d\'humeur.',
        fields: [
            { key: 'signaux', label: 'Signes avant-coureurs personnels (physiques, comportementaux)', type: 'textarea', rows: 2 },
            { key: 'situations', label: 'Situations à haut risque', type: 'textarea', rows: 2 },
            { key: 'actions', label: 'Actions immédiates à entreprendre', type: 'textarea', rows: 2 },
            { key: 'contacts', label: 'Personnes ressources et urgence', type: 'textarea', rows: 2 }
        ]
    },
    // --- GUIDES ---
    {
        id: 'guide_manuel_dep',
        ref: 'GUI-01',
        title: 'Manuel Patient : Comprendre la Dépression',
        category: 'guides',
        type: 'info',
        description: 'Lectures sur le modèle TCC de la dépression, le triangle pensées-émotions-comportements.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-book-open me-2" style="color:#06b6d4"></i>Comprendre la dépression</h5>
    <p>La dépression implique des interactions complexes entre vos pensées, vos émotions et vos comportements.</p>
    <h6>Le modèle Cognitivo-Comportemental :</h6>
    <ul>
        <li><strong>Pensées :</strong> Vision négative de soi, du monde et de l'avenir.</li>
        <li><strong>Émotions :</strong> Tristesse, apathie, vide, irritabilité.</li>
        <li><strong>Comportements :</strong> Isolement, diminution des activités, évitement.</li>
    </ul>
    <p>La TCC vise à briser ce cercle vicieux en travaillant simultanément sur l'activation comportementale et la restructuration cognitive.</p>
</div>`
    },
    {
        id: 'guide_activation',
        ref: 'GUI-02',
        title: 'L\'Activation Comportementale : Agir avant la motivation',
        category: 'guides',
        type: 'info',
        description: 'Explication du cycle de l\'apathie. Pourquoi l\'action doit précéder l\'envie.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-person-running me-2" style="color:#10b981"></i>L'Activation Comportementale</h5>
    <p>Dans la dépression, la baisse d'énergie amène à réduire ses activités. Cette inactivité diminue les sources de plaisir et de maîtrise, ce qui renforce la fatigue et la tristesse : c'est <strong>le cycle de l'apathie</strong>.</p>
    <h6>Briser ce cycle :</h6>
    <p>Contrairement au sens commun, il ne faut pas attendre d'avoir de l'énergie ou de la motivation pour agir. <strong>L'action doit précéder la motivation.</strong></p>
    <p>En reprenant progressivement des activités (même de courte durée), on recommence à injecter du plaisir et de la satisfaction dans son quotidien, ce qui rétablit peu à peu l'humeur.</p>
</div>`
    },
    {
        id: 'guide_distorsions',
        ref: 'GUI-03',
        title: 'Liste des Distorsions Cognitives',
        category: 'guides',
        type: 'info',
        description: 'Pensée tout-ou-rien, surgénéralisation, abstraction sélective, dramatisation, etc.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-brain me-2" style="color:#8b5cf6"></i>Les Distorsions Cognitives</h5>
    <p>Ce sont des filtres ou des "lunettes sombres" qui déforment notre perception de la réalité d'une manière qui génère ou maintient la tristesse viscérale.</p>
    <ul>
        <li><strong>Pensée tout ou rien :</strong> Juger de façon extrême (ex: "Si ce n'est pas parfait, c'est raté").</li>
        <li><strong>Surgénéralisation :</strong> Tirer une règle générale et définitive d'un seul échec ("Ça se passe toujours mal").</li>
        <li><strong>Filtre mental :</strong> Ne voir que le détail négatif en ignorant complètement les aspects positifs de la journée.</li>
        <li><strong>Rejet du positif :</strong> Rabaisser ses réussites ("C'était juste de la chance").</li>
        <li><strong>Saut aux conclusions :</strong> Lire dans les pensées ("Il me déteste") ou l'erreur de divination ("Je vais échouer de toute façon").</li>
        <li><strong>Raisonnement émotionnel :</strong> "Je me sens nul(le), donc je dois être nul(le)".</li>
    </ul>
</div>`
    },
    {
        id: 'guide_tribunal',
        ref: 'GUI-04',
        title: 'La Métaphore du Tribunal',
        category: 'guides',
        type: 'info',
        description: 'Apprendre à être l\'avocat de la défense face à son propre juge intérieur.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-scale-balanced me-2" style="color:#f59e0b"></i>La Métaphore du Tribunal</h5>
    <p>Imaginez qu'une salle d'audience réside dans votre tête.</p>
    <p>Souvent en période de dépression, la partie <strong>Accusatrice/Juge</strong> prend toute la place. Elle crie fort, vous accuse de tous les maux, rassemble uniquement des preuves à charge très sévères et prononce des condamnations sans appel ("Tu ne vaux rien").</p>
    <h6>Votre mission : Devenir l'Avocat de la Défense</h6>
    <p>En remplissant le "Tableau des Pensées", vous allez endosser le rôle d'un avocat impartial :</p>
    <ul>
        <li>Exiger des <strong>preuves factuelles et objectives</strong>.</li>
        <li>Apporter des pièces à décharge (vos réussites documentées, des témoignages contraires).</li>
        <li>Recadrer le Juge lorsqu'il utilise des biais illogiques (distorsions).</li>
        <li>Proposer un verdict final équilibré, et plus indulgent.</li>
    </ul>
</div>`
    },
    {
        id: 'guide_manuel_groupe',
        ref: 'GUI-05',
        title: 'Manuel TCC Unipolaire (Introduction)',
        category: 'guides',
        type: 'info',
        description: 'Module 1 - C\'est quoi la dépression ? (Fondations)',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-book me-2" style="color:var(--primary)"></i>La Maladie Dépressive</h5>
    <p>La dépression n'est pas une faiblesse. C'est une condition médicale où la "batterie" émotionnelle est déchargée (biais noradrénergique et sérotoninergique).</p>
    <h6>Le Modèle P-E-C</h6>
    <p>Le cercle vicieux s'entretient par trois pôles : <strong>Pensées</strong> (je suis nul), <strong>Émotions</strong> (Tristesse, anhédonie), <strong>Comportements</strong> (Isolement, inaction).</p>
    <p>Le groupe va vous apprendre à d'abord briser ce cycle par l'action (Activation) puis par la restructuration (Cognitions).</p>
</div>`
    },
    {
        id: 'liste_activites',
        ref: 'GUI-06',
        title: 'Liste des Activités Agréables',
        category: 'guides',
        type: 'info',
        description: 'Idées d\'activités pour l\'activation comportementale.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-list me-2" style="color:#2ecc71"></i>Inspirations d'Activités</h5>
    <p>Ciblez des activités qui génèrent <strong>du Plaisir (P)</strong> ou un sentiment de <strong>Maîtrise (M)</strong>.</p>
    <ul>
        <li>Prendre une marche de 15 minutes à l'extérieur (P)</li>
        <li>Ranger un bureau encombré ou faire une brassée de linge (M)</li>
        <li>Appeler un ami pendant 10 minutes (P/M)</li>
        <li>Prendre le temps de lire un roman ou écouter un podcast (P)</li>
    </ul>
</div>`
    },
    {
        id: 'planification_activites',
        ref: 'F-08',
        title: 'Planification d\'Activités',
        category: 'activation',
        type: 'structured_form',
        description: 'Planifier à l\'avance des activités comportementales.',
        fields: [
            { key: 'activite', label: 'Activité prévue', type: 'text', placeholder: 'Ex: Faire la vaisselle' },
            { key: 'moment', label: 'Moment planifié', type: 'text', placeholder: 'Ex: Ce soir vers 19h' },
            { key: 'obstacle', label: 'Obstacles anticipés (Ex: Je n\'aurai pas l\'énergie)', type: 'textarea', rows: 2 },
            { key: 'reponse', label: 'Solution (Ex: Je vais le faire 5 minutes seulement pour commencer)', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'remettre_en_question',
        ref: 'F-09',
        title: 'Remettre en Question la Pensée',
        category: 'cognition',
        type: 'structured_form',
        description: 'Cibler et déconstruire une distorsion cognitive.',
        fields: [
            { key: 'pensee_cible', label: 'Pensée (Juge intérieur)', type: 'textarea', rows: 2 },
            { key: 'faits_contre', label: 'L\'Avocat de la Défense : Quels faits prouvent que c\'est faux/exagéré ?', type: 'textarea', rows: 4 },
            { key: 'nouvelle_pensee', label: 'Verdict Équilibré : Nouvelle pensée nuancée', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'biais_interpretation',
        ref: 'GUI-07',
        title: 'Les Biais d\'Interprétation',
        category: 'guides',
        type: 'info',
        description: 'Module 3 - Exemples de biais cognitifs',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-eye me-2" style="color:#f59e0b"></i>Filtres de réalité</h5>
    <ul>
        <li><strong>Filtre mental :</strong> Les lunettes noires. Ne voir que les défauts de la journée.</li>
        <li><strong>Surgénéralisation :</strong> "J'ai échoué à cet examen, donc je raterai toute ma vie." (mot clé: toujours, jamais).</li>
        <li><strong>Lecture de pensée :</strong> Croire savoir qu'une personne nous juge sans preuve ("Il n'a pas dit bonjour car il me déteste").</li>
    </ul>
</div>`
    },
    {
        id: 'affirmation_soi',
        ref: 'GUI-08',
        title: 'Affirmation de Soi (Le DESC)',
        category: 'guides',
        type: 'info',
        description: 'Gérer les conflits sans s\'écraser ni agresser.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-comments me-2" style="color:#9b59b6"></i>La méthode DESC</h5>
    <p>Où placer ses limites ?</p>
    <ul>
        <li><strong>D</strong>écrire les faits objectivement : <em>"Quand le compte rendu tarde..."</em></li>
        <li><strong>E</strong>xprimer son émotion : <em>"...je me sens anxieux."</em></li>
        <li><strong>S</strong>pécifier des solutions : <em>"Pourrais-tu m'envoyer un brouillon à 15h ?"</em></li>
        <li><strong>C</strong>onséquences positives : <em>"Ainsi on sera à l'heure pour la réunion."</em></li>
    </ul>
</div>`
    },
    {
        id: 'guide_cloture_groupe',
        ref: 'GUI-09',
        title: 'Clôture et Normalisation',
        category: 'guides',
        type: 'info',
        description: 'Module 6 - Prévenir la rechute.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-door-open me-2" style="color:var(--primary)"></i>Terminer le cycle</h5>
    <p>Une rechute commence bien avant le retour au point zéro. Elle débute quand on arrête l'hygiène de vie (sommeil, PM/PMT).</p>
    <p>Rappelez-vous : Avoir une baisse de moral ("faux pas") est 100% normal. L'important est d'utiliser vos outils le jour même.</p>
</div>`
    }
];

const PROTOCOL_TOOL_MAP = {
    // === INDIVIDUAL PHASE (EVALUATION/HOMEWORK) ===
    "DEP_Indiv_Contrat_Non_Suicide": ['contrat_non_suicide'],
    "DEP_Indiv_Manuel_Patient": ['guide_manuel_dep'],
    
    // === GROUP MANUALS & WORKSHEETS ===
    // Guides (Manuels de groupe)
    "DEP_Grp_Manuel_Groupe": ['guide_manuel_groupe'],
    "DEP_Grp_Guide_Activation": ['guide_activation'],
    "DEP_Grp_Liste_Activites": ['liste_activites'],
    "DEP_Grp_Guide_Cognitif": ['guide_distorsions'], 
    "DEP_Grp_Biais_Interpretation": ['biais_interpretation'],
    "DEP_Grp_Liste_Distorsions": ['guide_distorsions'],
    "DEP_Grp_Metaphore_Tribunal": ['guide_tribunal'],
    "DEP_Grp_Affirmation_Soi": ['affirmation_soi'],
    "DEP_Grp_Cloture_Groupe": ['guide_cloture_groupe'],
    
    // Worksheets (Exercices de groupe)
    "DEP_Grp_Planification_Activites": ['planification_activites'],
    "DEP_Grp_Registre_Activites": ['registre_activites_pmt'],
    "DEP_Grp_Tableau_Pensees": ['tableau_pensees_auto'],
    "DEP_Grp_Remettre_Question": ['remettre_en_question'],
    "DEP_Grp_TRAP_TRAC": ['trap_trac'],
    "DEP_Grp_Resolution_Problemes": ['grille_resolution'],
    "DEP_Grp_Fleche_Descendante": ['fleche_descendante'],
    "DEP_Grp_Resume_Therapie": ['resume_therapie'],
    "DEP_Grp_Plan_Rechute": ['plan_rechute']
};

window.getExerciseById = function(id) {
    return EXERCISES.find(e => e.id === id);
};

window.getExercisesForSession = function(sessionNo) {
    const frac = sessionNo - Math.floor(sessionNo);
    const isGuideSession = sessionNo !== Math.floor(sessionNo) && Math.abs(frac - 0.9) < 1e-6;
    const lookupNo = isGuideSession ? Math.ceil(sessionNo) : ((sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo);

    let list = [];
    if (!window.PROTOCOL) return list;

    // Pure dynamic routing based on current chosen Protocol
    let currentPhase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(lookupNo));
    
    if (currentPhase) {
        const requestedTools = isGuideSession ? (currentPhase.guides || []) : (currentPhase.worksheets || []);
        
        requestedTools.forEach(toolKey => {
            let mappedIds = PROTOCOL_TOOL_MAP[toolKey];
            if (mappedIds) {
                mappedIds.forEach(mId => {
                    let baseEx = getExerciseById(mId);
                    if (baseEx) {
                        if (!list.some(e => e.id === baseEx.id)) {
                            list.push(baseEx);
                        }
                    }
                });
            }
        });
    }

    return list;
};
