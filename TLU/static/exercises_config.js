/* =========================================
   Ory+ | TLU Module — Exercices & Outils
   ========================================= */

window.EXERCISE_CATEGORIES = [
    { id: 'tlu_eval', name: 'Évaluation & Conceptualisation', icon: 'fa-clipboard-check' },
    { id: 'tlu_base', name: 'Analyse Fonctionnelle & Registres', icon: 'fa-calendar-day' },
    { id: 'tlu_cog', name: 'Restructuration Cognitive', icon: 'fa-brain' },
    { id: 'tlu_maintien', name: 'Maintien & Prévention de Rechute', icon: 'fa-shield-alt' },
    { id: 'tlu_guide', name: 'Guides Cliniques', icon: 'fa-book-open' }
];

window.EXERCISES = [
    // --- GUIDES ---
    {
        id: 'tlu_guide_triage',
        ref: 'Guide',
        title: 'Les Guides de Triage (Identification du risque)',
        category: 'tlu_guide',
        type: 'info',
        description: 'Ces outils sont administrés avant le début officiel des phases de traitement.',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-stethoscope me-2 text-primary-c"></i>Les Guides de Triage</h5>
                <h6>Contenu de l'AUDIT</h6>
                <p>10 questions à choix multiples (0 à 4 points). Évalue la fréquence de consommation d'alcool, la quantité, la perte de contrôle, la culpabilité, les trous de mémoire et les blessures physiques.</p>
                <h6>Contenu du DAST-10</h6>
                <p>10 questions dichotomiques (Oui/Non). Évalue l'abus de médicaments/drogues, les "flashbacks", la négligence familiale, les activités illégales pour se procurer la substance et les symptômes de sevrage physique.</p>
            </div>
        `
    },
    {
        id: 'tlu_guide_suivi',
        ref: 'Guide',
        title: 'Le Suivi Continu (L\'outil central du système)',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-chart-line me-2 text-primary-c"></i>Le Suivi Continu (BAM-IOP)</h5>
                <p>C'est le tableau de bord de chaque début de séance. Il contient des champs numériques stricts évaluant les 7 derniers jours :</p>
                <ul>
                    <li><strong>Santé globale :</strong> Sommeil, Humeur dépressive/anxieuse.</li>
                    <li><strong>Jours de consommation isolés par substance :</strong> Alcool, Sédatifs, Cocaïne, Stimulants, Opiacés, Inhalants.</li>
                    <li><strong>Intensité du Craving :</strong> de Pas du tout à Extrêmement.</li>
                    <li><strong>Confiance en l'abstinence et Facteurs de protection :</strong> jours passés au travail, jours en contact avec un réseau de soutien, participation à des groupes d'entraide.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'tlu_guide_1',
        ref: 'Guide 1',
        title: 'La Conceptualisation',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-project-diagram me-2 text-primary-c"></i>Guide 1 : La Conceptualisation</h5>
                <p>C'est le logigramme fondamental que le thérapeute remplit dynamiquement avec le patient.</p>
                <h6>Contenu détaillé (Champs à saisir) :</h6>
                <ul>
                    <li><strong>Expériences précoces (Antécédents distaux) :</strong> Génétique/neurobiologique, Psychosocial (traumas, violence), Environnemental (exposition précoce).</li>
                    <li><strong>Développement de la vulnérabilité :</strong> Cognitive (ex: "La substance m'aide à survivre"), Comportementale (stratégies d'évitement), Affective (déficit de gestion de l'anxiété).</li>
                    <li><strong>L'Engrenage :</strong> Exposition, expérimentation, puis développement continu.</li>
                    <li><strong>Le Cycle Actuel :</strong> Identification du Déclencheur interne/externe, des Pensées activées, de l'Envie/Pulsion, menant soit à la Permission de consommer (Rechute) soit à une Occasion d'abstinence.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'tlu_guide_2',
        ref: 'Guide 2',
        title: 'Registre des activités quotidiennes',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-calendar-alt me-2 text-primary-c"></i>Guide 2 : Registre des activités quotidiennes</h5>
                <h6>Contenu détaillé :</h6>
                <p>Une grille horaire allant de 6h00 du matin à minuit, du lundi au dimanche. Le patient doit y inscrire ses actions réelles et les coter avec deux variables : Plaisir (P) de 0 à 10 et Maîtrise/Accomplissement (M) de 0 à 10. Cela permet au système d'identifier les "zones vides" qui favorisent le craving.</p>
            </div>
        `
    },
    {
        id: 'tlu_guide_3',
        ref: 'Guide 3',
        title: 'Planification des activités',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-clock me-2 text-primary-c"></i>Guide 3 : Planification des activités</h5>
                <h6>Contenu détaillé :</h6>
                <p>Contrairement au registre qui observe le passé, cet outil planifie le futur.</p>
                <p><strong>Champs :</strong> Jour, Heure prévue, Description de l'activité (spécifier si elle est plaisante, valorisante ou les deux), Heure à laquelle elle a réellement été faite, et le score final de Plaisir et de Satisfaction (0-10).</p>
            </div>
        `
    },
    {
        id: 'tlu_guide_4',
        ref: 'Guide 4',
        title: 'Explorer les facteurs déclenchants',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-magnifying-glass-chart me-2 text-primary-c"></i>Guide 4 : Explorer les facteurs déclenchants</h5>
                <p>C'est l'outil d'autopsie d'une crise (Analyse Fonctionnelle). Il est déclenché par le système si le BAM-IOP indique une rechute.</p>
                <h6>Contenu détaillé (Colonnes) :</h6>
                <ul>
                    <li><strong>Facteur déclencheur :</strong> Qu'est-ce qui m'a mis à risque (Lieu, personne, fatigue) ?</li>
                    <li><strong>Pensées et émotions :</strong> Qu'est-ce qui traversait mon esprit ?</li>
                    <li><strong>Comportement :</strong> Qu'ai-je fait exactement ?</li>
                    <li><strong>Conséquences positives :</strong> Le bénéfice immédiat (ex: soulagement de l'angoisse).</li>
                    <li><strong>Conséquences négatives :</strong> Le coût à long terme (ex: honte, perte financière, gueule de bois).</li>
                </ul>
            </div>
        `
    },
    {
        id: 'tlu_guide_5',
        ref: 'Guide 5',
        title: 'Tableau d\'enregistrement des pensées automatiques',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-table-list me-2 text-primary-c"></i>Guide 5 : Tableau d'enregistrement des pensées automatiques</h5>
                <h6>Contenu détaillé (La Grille de Beck à 6 colonnes) :</h6>
                <ul>
                    <li><strong>Événement/Situation :</strong> Le fil des pensées ou l'occasion.</li>
                    <li><strong>Émotion :</strong> Spécifier l'émotion et son intensité (0-100%).</li>
                    <li><strong>Pensées automatiques :</strong> Écrire textuellement l'image ou la phrase (ex: "Je suis un raté, autant boire").</li>
                    <li><strong>Faits qui SOUTIENNENT la pensée :</strong> Les preuves apparentes du patient.</li>
                    <li><strong>Faits qui CONTREDISENT la pensée :</strong> Le cœur du travail clinique (trouver les preuves inverses).</li>
                    <li><strong>Résultat :</strong> Réévaluer l'intensité de l'émotion initiale (0-100%).</li>
                </ul>
            </div>
        `
    },
    {
        id: 'tlu_guide_6',
        ref: 'Guide 6',
        title: 'Résumé de la thérapie',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-list-check me-2 text-primary-c"></i>Guide 6 : Résumé de la thérapie</h5>
                <p>Ce document de synthèse compile les données des phases précédentes pour créer le plan d'action de maintien.</p>
                <h6>Contenu détaillé (Le plan d'action) :</h6>
                <ul>
                    <li><strong>Origine des problèmes :</strong> tiré de la conceptualisation.</li>
                    <li><strong>Maintien des symptômes :</strong> tiré des facteurs déclenchants.</li>
                    <li><strong>Outils appris en thérapie :</strong> les stratégies de distraction qui ont fonctionné.</li>
                    <li><strong>Événements pouvant causer une rechute :</strong> La "signature" de rechute du patient.</li>
                    <li><strong>Plan d'action :</strong> Les numéros d'urgence, les comportements de survie.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'tlu_guide_grp_1',
        ref: 'Module 1',
        title: 'Module de Groupe 1 : Entraînement à la Tolérance à la Détresse',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-users me-2 text-primary-c"></i>Module de Groupe 1 : Entraînement à la Tolérance à la Détresse</h5>
                <p>Basé sur la TCD. Le manuel stipule que les compétences interpersonnelles et la tolérance à la détresse doivent être pratiquées.</p>
                <h6>Guide utilisé : 113fichetcd_Form (Compétences de survie en cas de crise)</h6>
                <p><strong>Contenu détaillé pour l'addiction :</strong> Le groupe pratique les compétences STOP (Ne pas bouger lors d'un craving) et TIP (Modifier la Température corporelle avec de l'eau froide pour faire baisser l'adrénaline du craving). Le formulaire demande de noter l'intensité de l'émotion avant et après l'exercice.</p>
                <h6>Guide utilisé : 105fichetcd_Form (Observer et Décrire les Émotions)</h6>
                <p><strong>Contenu détaillé pour l'addiction :</strong> Identifier les vulnérabilités corporelles avant que l'émotion ne se transforme en pulsion de consommation. Le groupe s'entraîne à nommer l'émotion (ex: l'anxiété) et l'envie d'action sans y céder (Urge Surfing).</p>
            </div>
        `
    },
    {
        id: 'tlu_guide_grp_2',
        ref: 'Module 2',
        title: 'Module de Groupe 2 : Affirmation de Soi et Habiletés Sociales',
        category: 'tlu_guide',
        type: 'info',
        content: `
            <div class="exercise-info-content">
                <h5><i class="fas fa-comments me-2 text-primary-c"></i>Module de Groupe 2 : Affirmation de Soi et Habiletés Sociales</h5>
                <p>Axé sur les jeux de rôles interactifs (issu du guide de pratique Section 5.6).</p>
                <h6>Contenu des sessions :</h6>
                <ul>
                    <li><strong>Scénarios interactifs :</strong> S'entraîner à dire "Non" à des offres de consommation.</li>
                    <li><strong>Gestion des conflits :</strong> Apprendre à exprimer une frustration (qui est un puissant déclencheur de rechute) à un proche en utilisant le "Je" plutôt que le recours immédiat à la substance. Les formulaires utilisés ici sont des grilles d'évaluation par les pairs (feedback du groupe sur la posture, le ton de la voix et le regard pendant le jeu de rôle).</li>
                </ul>
            </div>
        `
    },

    // --- MANUALLY BUILT EXERCISES ---
    {
        id: 'tlu_f1_conceptualisation',
        ref: 'F1',
        title: 'Conceptualisation de Cas (Modèle TLU)',
        category: 'tlu_eval',
        type: 'structured_form',
        description: 'Logigramme reliant les expériences précoces (antécédents distaux) aux vulnérabilités (schémas), à l\'exposition, puis à la boucle actuelle de consommation.',
        fields: [
            { key: 'antecedents', label: '1. Antécédents distaux (Traumatismes, Enfance, Apprentissages précoces)', type: 'textarea', rows: 3 },
            { key: 'schemas', label: '2. Vulnérabilités & Croyances de base (Schémas activés)', type: 'textarea', rows: 3 },
            { key: 'declencheur', label: '3. Facteurs Déclenchants Typiques (Stress, Conflit, Ennui, Fête)', type: 'textarea', rows: 2 },
            { key: 'pensees', label: '4. Pensées Permissives ou d\'Attente ("Je gérerai plus tard", "J\'en ai besoin pour tenir")', type: 'textarea', rows: 2 },
            { key: 'comportement', label: '5. La Boucle Actuelle (Pulsion, Décision, Consommation)', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'tlu_f2_registre_activites',
        ref: 'F2',
        title: 'Registre d\'Activités Quotidiennes (P/M)',
        category: 'tlu_base',
        type: 'daily_log',
        description: 'Faire établir au patient sa ligne de base hebdomadaire. Lui demander de noter l\'activité principale et d\'évaluer le Plaisir (P, 0-10) et la Maîtrise (M, 0-10) ressentis.',
        alwaysAvailable: true,
        columns: [
            { key: 'dateStr', label: 'Jour', inputType: 'select', options: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], width: '15%' },
            { key: 'matin', label: 'Matin (Activité + P/10, M/10)', type: 'text', width: '28%' },
            { key: 'apresmidi', label: 'Après-Midi (Activité + P/10, M/10)', type: 'text', width: '28%' },
            { key: 'soir', label: 'Soirée (Activité + P/10, M/10)', type: 'text', width: '28%' }
        ]
    },
    {
        id: 'tlu_f3_planification',
        ref: 'F3',
        title: 'Planification d\'Activités (Activation)',
        category: 'tlu_base',
        type: 'structured_form',
        description: 'Action comportementale : Planifier des activités saines, gratifiantes ou nécessaires, pour remplacer le temps de consommation.',
        fields: [
            { key: 'activite_cible', label: 'Activité saine planifiée', type: 'text' },
            { key: 'quand', label: 'Quand ? (Jour / Heure)', type: 'text' },
            { key: 'obstacles', label: 'Obstacles possibles (Manque de motivation, invitation à boire...)', type: 'textarea', rows: 2 },
            { key: 'solution', label: 'Solution pour contourner cet obstacle', type: 'textarea', rows: 2 },
            { key: 'evaluation', label: 'Évaluation Plaisir/Maîtrise anticipé (P/10, M/10)', type: 'text' }
        ]
    },
    {
        id: 'tlu_f4_analyse_fonctionnelle',
        ref: 'F4',
        title: 'Analyse Fonctionnelle d\'une Crise (Craving/Rechute)',
        category: 'tlu_base',
        type: 'structured_form',
        alwaysAvailable: true,
        description: 'Cartographier le contexte précis d\'une envie impérieuse ou d\'une rechute (Modèle SORC).',
        fields: [
            { key: 'situation', label: '1. Facteur Déclencheur (Lieu, Personne, Heure, Événement interne/externe)', type: 'textarea', rows: 2 },
            { key: 'cognitions', label: '2. Pensées et Émotions (Qu\'est-ce qui traverse l\'esprit du patient ?)', type: 'textarea', rows: 2 },
            { key: 'comportement', label: '3. Comportement (Craving, Action de consommer)', type: 'textarea', rows: 2 },
            { key: 'cons_positives', label: '4. Conséquences Positives à COURT TERME (Soulagement, Euphorie)', type: 'textarea', rows: 2 },
            { key: 'cons_negatives', label: '5. Conséquences Négatives à LONG TERME (Honte, Problèmes pros/persos, Tolérance)', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'tlu_f5_grille_beck',
        ref: 'F5',
        title: 'Tableau d\'Enregistrement des Pensées (Grille de Beck)',
        category: 'tlu_cog',
        type: 'structured_form',
        alwaysAvailable: true,
        description: 'Restructuration cognitive pour évaluer objectivement les pensées permissives.',
        fields: [
            { key: 'situation', label: 'Rappel de la Situation déclenchante & Émotion (Intensité /100)', type: 'textarea', rows: 2 },
            { key: 'pensee_auto', label: 'Pensée Automatique (Ex: "Juste un verre, je gère")', type: 'textarea', rows: 2 },
            { key: 'faits_pour', label: 'Quels faits valident cette pensée ?', type: 'textarea', rows: 2 },
            { key: 'faits_contre', label: 'Quels faits contredisent cette pensée ? (Preuves objectives)', type: 'textarea', rows: 2 },
            { key: 'reponse_alt', label: 'Pensée Alternative & Évaluation finale de l\'émotion', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'tlu_f6_resume_therapie',
        ref: 'F6',
        title: 'Résumé de la Thérapie et Plan d\'Action',
        category: 'tlu_maintien',
        type: 'structured_form',
        description: 'Plan anti-rechute final regroupant les acquis du patient et ses stratégies de maintien.',
        fields: [
            { key: 'origines', label: 'Origine et compréhension du problème d\'addiction du patient', type: 'textarea', rows: 2 },
            { key: 'outils', label: 'Les outils et compétences l\'ayant le plus aidé', type: 'textarea', rows: 2 },
            { key: 'vulnerabilites', label: 'Ses zones de vulnérabilité actuelles (Lieux, stress, proches consommateurs)', type: 'textarea', rows: 2 },
            { key: 'signes', label: 'Quels seraient les signes précurseurs d\'une rechute ?', type: 'textarea', rows: 2 },
            { key: 'plan_action', label: 'Son plan d\'action d\'urgence (Qui appeler ? Quoi faire ?)', type: 'textarea', rows: 3 }
        ]
    }
];

window.PROTOCOL_TOOL_MAP = {
    // GUIDES
    "TLU_Guide_Triage": ['tlu_guide_triage'],
    "TLU_Guide_Suivi": ['tlu_guide_suivi'],
    "TLU_Guide_1": ['tlu_guide_1'],
    "TLU_Guide_2": ['tlu_guide_2'],
    "TLU_Guide_3": ['tlu_guide_3'],
    "TLU_Guide_4": ['tlu_guide_4'],
    "TLU_Guide_5": ['tlu_guide_5'],
    "TLU_Guide_6": ['tlu_guide_6'],
    "TLU_Guide_Grp1": ['tlu_guide_grp_1'],
    "TLU_Guide_Grp2": ['tlu_guide_grp_2'],

    // WORKSHEETS (EXERCISES)
    "TLU_Conceptualisation": ['tlu_f1_conceptualisation'],
    "TLU_RegistreActivites": ['tlu_f2_registre_activites'],
    "TLU_PlanificationActivites": ['tlu_f3_planification'],
    "TLU_PlanificationActivites_Groupe": ['tlu_f3_planification'],
    "TLU_AnalyseFonctionnelle": ['tlu_f4_analyse_fonctionnelle'],
    "TLU_AnalyseFonctionnelle_Groupe": ['tlu_f4_analyse_fonctionnelle'],
    "TLU_GrilleBeck": ['tlu_f5_grille_beck'],
    "TLU_ResumeTherapie": ['tlu_f6_resume_therapie']
};

window.getExerciseById = function(id) {
    if (id && id.startsWith('__guide__')) {
        const tool = id.substring('__guide__'.length);
        return {
            id,
            ref: 'Guide',
            category: 'tlu_guide',
            title: tool.replace(/_/g, ' '),
            description: 'Guide (document de phase)',
            type: 'info',
            content: `<div class="exercise-info-content">
                <h5>Guide Manquant</h5>
                <p><strong>${tool}</strong></p>
                <p style="color:var(--text-muted)">Ce guide n’est pas encore disponible.</p>
            </div>`
        };
    }
    return window.EXERCISES.find(e => e.id === id);
};

window.getExercisesForSession = function(sessionNo) {
    if (!window.PROTOCOL) return [];

    let exercises = [];
    let addedIds = new Set();
    
    // Check if the session is an intermediate guide session (e.g. 1.1)
    const frac = sessionNo - Math.floor(sessionNo);
    const isGuideSession = sessionNo !== Math.floor(sessionNo) && Math.abs(frac - 0.9) < 1e-6;
    const lookupNo = isGuideSession ? Math.ceil(sessionNo) : ((sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo);
    
    // Add explicitly assigned tools from the current phase
    const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(parseInt(lookupNo)));
    if (phase) {
        const requestedTools = isGuideSession ? (phase.guides || []) : (phase.worksheets || []);
        
        requestedTools.forEach(toolKey => {
            const mappedIds = window.PROTOCOL_TOOL_MAP[toolKey];
            if (mappedIds) {
                mappedIds.forEach(id => {
                    const baseEx = window.getExerciseById(id);
                    if (baseEx && !addedIds.has(id)) {
                        exercises.push({ ...baseEx, session_scoped_id: `${id}_s${lookupNo}` });
                        addedIds.add(id);
                    }
                });
            } else if (isGuideSession) {
                // Return dummy placeholder if guide missing
                exercises.push(window.getExerciseById(`__guide__${toolKey}`));
            }
        });
    }
    
    // Always append alwaysAvailable interactive tools (but ONLY when it's not a guide view)
    if (!isGuideSession) {
        window.EXERCISES.forEach(baseEx => {
            if (baseEx.alwaysAvailable && !addedIds.has(baseEx.id)) {
                exercises.push({ ...baseEx, session_scoped_id: `${baseEx.id}_s${lookupNo}` });
                addedIds.add(baseEx.id);
            }
        });
    }
    
    return exercises;
};
