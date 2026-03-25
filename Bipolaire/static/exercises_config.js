/**
 * Ory+ TCC Simulator — Exercise Registry
 * Modules Spécifiques Bipolarité (TCC & IPSRT)
 */

const EXERCISE_CATEGORIES = [
    { id: 'evaluation', label: 'Évaluation Clinique & IPSRT', icon: 'fa-clipboard-user', color: '#0ea5e9' },
    { id: 'psychoeducation', label: 'Psychoéducation Bipolarité', icon: 'fa-book-open', color: '#06b6d4' },
    { id: 'cognitif_depressif', label: 'Restructuration (Pôle Dépressif)', icon: 'fa-cloud-rain', color: '#3b82f6' },
    { id: 'cognitif_maniaque', label: 'Gestion Impulsivité (Pôle Maniaque)', icon: 'fa-fire-flame-curved', color: '#ef4444' },
    { id: 'prevention', label: 'Prévention de la rechute', icon: 'fa-shield-halved', color: '#10b981' }
];

const EXERCISES = [
    // ===================== ÉVALUATION & IPSRT =====================
    {
        id: 'bp_1_lifechart', ref: 'IPSRT-01',
        title: 'Lifechart Rétrospectif',
        category: 'evaluation',
        type: 'daily_log',
        defaultSessions: [1, 2, 3],
        resourcePdf: 'Resources/Outils/graphiquedelevolutiondelamaladielifechart.pdf',
        description: "Tracez l'historique de vos épisodes majeurs (manie, dépression) avec les événements de vie associés.",
        columns: [
            { key: 'annee', label: 'Année/Mois', inputType: 'text', width: '120px', placeholder: "Ex: Fév 2024" },
            { key: 'episode', label: 'Type d\'épisode', inputType: 'select', options: ['Manie Sévère (+3)', 'Hypomanie (+2)', 'Légère Élévation (+1)', 'Euthymie (0)', 'Légère Baisse (-1)', 'Dépression Modérée (-2)', 'Dépression Sévère (-3)'], width: '180px' },
            { key: 'evenement', label: 'Événement de vie (Stresseur)', inputType: 'text', placeholder: "Ex: Rupture, Perte d'emploi, Déménagement..." },
            { key: 'traitement', label: 'Traitement en cours', inputType: 'text', placeholder: "Ex: Lithium, IRS..." }
        ]
    },
    {
        id: 'bp_2_mood_tracker', ref: 'IPSRT-02',
        title: 'Graphique de l\'Humeur (Mood Tracker)',
        category: 'evaluation',
        type: 'daily_log',
        defaultSessions: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        resourcePdf: 'Resources/Outils/graphiquedelhumeur.pdf',
        description: "Notez quotidiennement votre humeur (de -3 à +3) pour observer les fluctuations et prévenir les virages thymiques.",
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '130px' },
            { key: 'humeur', label: 'Humeur (-3 à +3)', inputType: 'number', min: -3, max: 3, width: '120px' },
            { key: 'sommeil', label: 'Heures de Sommeil', inputType: 'number', min: 0, max: 24, width: '130px' },
            { key: 'medication', label: 'Observance', inputType: 'select', options: ['Oui', 'Partiel', 'Non'], width: '110px' },
            { key: 'notes', label: 'Remarques', inputType: 'text', placeholder: "Événement de la journée..." }
        ]
    },
    {
        id: 'bp_3_rythmes', ref: 'IPSRT-03',
        title: 'Inventaire des Rythmes Sociaux (SRM)',
        category: 'evaluation',
        type: 'structured_form',
        defaultSessions: [4, 5, 6, 7],
        description: "Identifiez vos habitudes quotidiennes. L'irrégularité des rythmes est souvent le premier déclencheur d'un épisode.",
        fields: [
            { key: 'reveil', label: 'À quelle heure vous réveillez-vous habituellement ? Cible d\'amélioration :', type: 'textarea', rows: 2 },
            { key: 'premier_contact', label: 'Premier contact social de la journée (Qui ? À quelle heure ?) :', type: 'textarea', rows: 2 },
            { key: 'repas', label: 'Heures régulières de vos repas (Petit-déjeuner, Déjeuner, Dîner) :', type: 'textarea', rows: 2 },
            { key: 'coucher', label: 'Heure de coucher cible (objectif de régularité) :', type: 'textarea', rows: 1 }
        ],
        repeatable: true
    },

    // ===================== PSYCHOÉDUCATION =====================
    {
        id: 'bp_4_psycho', ref: 'PSY-01',
        title: 'Comprendre le Trouble Bipolaire',
        category: 'psychoeducation',
        type: 'info',
        defaultSessions: [4, 5],
        resourcePdf: 'Resources/Guide/introduction-au-groupe-psychoeducatif-pour-le-trouble-bipolaire-2025.pdf',
        description: "Document explicatif sur les phases du trouble bipolaire (Manie, Hypomanie, Dépression, Euthymie).",
        content: `
            <h5>Qu'est-ce que le Trouble Bipolaire ?</h5>
            <p>C'est une maladie neurologique récurrente caractérisée par des fluctuations extrêmes de l'humeur, de l'énergie et du niveau d'activité.</p>
            <ul>
                <li><strong>La Manie / Hypomanie (+1 à +3) :</strong> Période d'exaltation, besoin de sommeil réduit, pensées accélérées, comportements à risque, logorrhée.</li>
                <li><strong>La Dépression (-1 à -3) :</strong> Tristesse profonde, perte de plaisir (anhédonie), hypersomnie ou insomnie, ralentissement psychomoteur.</li>
                <li><strong>L'Euthymie (0) :</strong> Phase de stabilité et d'humeur neutre que l'on vise à prolonger au maximum.</li>
            </ul>
            <h5>L'importance des Rythmes Sociaux (IPSRT)</h5>
            <p>L'horloge biologique des personnes bipolaires est très fragile. Un changement d'heure de lever, un décalage horaire ou une nuit blanche peuvent suffire à déclencher un épisode maniaque.</p>
        `
    },
    {
        id: 'bp_5_hygiene', ref: 'PSY-02',
        title: 'Hygiène de vie et Protecteurs',
        category: 'psychoeducation',
        type: 'checklist',
        defaultSessions: [4, 5, 6],
        resourcePdf: 'Resources/Outils/rythmessociauxadopteruneroutinedevie.pdf',
        description: "Cochez les règles d'hygiène de vie que vous avez réussi à maintenir ou que vous visez cette semaine.",
        items: [
            { label: 'Prendre mes médicaments à la même heure chaque jour', tag: 'fondamental' },
            { label: 'Me lever à la même heure (même le week-end)', tag: 'sommeil' },
            { label: 'Éviter totalement l\'alcool (désinhibiteur et dépresseur sérotoninergique)', tag: 'substances' },
            { label: 'Éviter le cannabis et autres drogues', tag: 'substances' },
            { label: 'Manger 3 repas par jour à heures fixes', tag: 'rythme' },
            { label: 'Protéger mon environnement de sommeil (noir, silence, frais)', tag: 'sommeil' }
        ]
    },

    // ===================== PÔLE DÉPRESSIF (TCC CLASSIQUE) =====================
    {
        id: 'bp_6_pensees', ref: 'TCC-DEP-01',
        title: 'Tableau d\'enregistrement des pensées (Beck)',
        category: 'cognitif_depressif',
        type: 'problem_solving',
        defaultSessions: [8, 9, 10, 11, 12],
        resourcePdf: 'Resources/Outils/tableau-d_enregistrement-des-pensc3a9es-automatiques.pdf',
        description: "Face à une baisse d'humeur, analysez la situation et identifiez les pensées automatiques négatives.",
        fields: [
            { key: 'situation', label: '1. Situation (Qui, Quand, Où, Quoi)', type: 'textarea', placeholder: "Ex: J'ai reçu un email de mon patron demandant à me voir...", rows: 2 },
            { key: 'emotion', label: '2. Émotion(s) (Tristesse, Anxiété, Colère) & Intensité (0-100%)', type: 'textarea', placeholder: "Ex: Anxiété 80%, Tristesse 60%", rows: 2 },
            { key: 'pensee', label: '3. Pensée(s) Automatique(s) (Qu\'est-ce qui m\'a traversé l\'esprit ?)', type: 'textarea', placeholder: "Ex: Il va me licencier, je fais mal mon travail.", rows: 2 }
        ],
        solutionSlots: 10,
        evaluationFields: [
            { key: 'reponse_rationnelle', label: '4. Réponse Rationnelle (Quels sont les faits ? Quelle serait une pensée plus réaliste ?)', type: 'textarea', rows: 3 },
            { key: 'nouvelle_emotion', label: '5. Nouvelle Intensité de l\'Émotion (0-100%)', type: 'textarea', rows: 1 }
        ],
        repeatable: true
    },
    {
        id: 'bp_7_resolution', ref: 'TCC-DEP-02',
        title: 'Résolution de problème (Activation)',
        category: 'cognitif_depressif',
        type: 'structured_form',
        defaultSessions: [10, 11, 12],
        resourcePdf: 'Resources/Outils/rc3a9solution-de-problc3a8me-tln.pdf',
        description: "En phase dépressive, les problèmes semblent des montagnes. Découpez-les.",
        fields: [
            { key: 'probleme', label: 'Quel est le problème spécifique ?', type: 'textarea', rows: 2 },
            { key: 'brainstorming', label: 'Listez 3 solutions possibles (sans les juger) :', type: 'textarea', rows: 3 },
            { key: 'choix', label: 'Quelle solution choisissez-vous d\'essayer en premier ?', type: 'textarea', rows: 2 },
            { key: 'etapes', label: 'Quelles sont les 3 toutes petites étapes pour le faire ?', type: 'textarea', rows: 3 }
        ],
        repeatable: true
    },

    // ===================== PÔLE MANIAQUE (GESTION DE L'IMPULSIVITÉ) =====================
    {
        id: 'bp_8_biais_manie', ref: 'TCC-MAN-01',
        title: 'Remise en question de l\'hyper-optimisme',
        category: 'cognitif_maniaque',
        type: 'structured_form',
        defaultSessions: [13, 14, 15, 16],
        resourcePdf: 'Resources/Outils/biais-diinterprc3a9tation.pdf',
        description: "En phase d'élévation, on a tendance à minimiser les risques et surévaluer nos capacités. Vérifications croisées.",
        fields: [
            { key: 'projet', label: 'Description du nouveau "Grand Projet" ou de l\'envie soudaine :', type: 'textarea', rows: 2 },
            { key: 'urgence', label: 'Pourquoi cela semble-t-il si urgent de le faire MAINTENANT ?', type: 'textarea', rows: 2 },
            { key: 'risques', label: 'Quels seraient les risques financiers, relationnels ou professionnels si je me trompe ?', type: 'textarea', rows: 3 },
            { key: 'regulateur', label: 'Personne de confiance à qui je DOIS en parler avant d\'agir (Règle des 48h) :', type: 'textarea', rows: 1 }
        ],
        repeatable: true
    },
    {
        id: 'bp_9_avantages_hypo', ref: 'TCC-MAN-02',
        title: 'Avantages et Désavantages de l\'Hypomanie',
        category: 'cognitif_maniaque',
        type: 'two_columns',
        defaultSessions: [13, 14, 15, 16, 17],
        description: "Il est souvent difficile d'accepter le traitement car l'hypomanie semble agréable. Analysons objectivement.",
        columnA: { label: 'Ce que j\'aime dans l\'Hypomanie (Énergie, Créativité...)', placeholder: "Ex: Je me sens brillant..." },
        columnB: { label: 'Le prix à payer (La chute, le regard des autres, la casse...)', placeholder: "Ex: Je dis des choses blessantes, je dépense tout..." }
    },

    // ===================== PRÉVENTION DE LA RECHUTE =====================
    {
        id: 'bp_10_prodromes', ref: 'PREV-01',
        title: 'Identification de mes Signes Avant-Coureurs (Prodromes)',
        category: 'prevention',
        type: 'structured_form',
        defaultSessions: [18, 19, 20],
        description: "Plus on intervient tôt lors d'un virage thymique, plus il est facile de l'enrayer. Quels sont VOS signes ?",
        fields: [
            { key: 'signes_manie', label: 'Mes tous premiers signes d\'une montée (ex: sommeil raccourci sans fatigue, écouter la musique plus fort, achats compulsifs) :', type: 'textarea', rows: 4 },
            { key: 'signes_dep', label: 'Mes tous premiers signes d\'une chute (ex: repli, fatigue matinale, moins de sms) :', type: 'textarea', rows: 4 }
        ],
        repeatable: true
    },
    {
        id: 'bp_11_plan_action', ref: 'PREV-02',
        title: 'Plan d\'Action d\'Urgence',
        category: 'prevention',
        type: 'structured_form',
        defaultSessions: [18, 19, 20],
        description: "Consignes pré-définies avec votre psychiatre à appliquer DÈS l'apparition des prodromes.",
        fields: [
            { key: 'urgence_manie', label: 'Si je repère des signes de MANIE, je dois (ex: Prende Quétiapine 50mg, confier cartes bancaires, forcer le repos) :', type: 'textarea', rows: 4 },
            { key: 'urgence_dep', label: 'Si je repère des signes de DÉPRESSION, je dois (ex: Maintenir l\'activité, appeler psy, ne pas m\'isoler) :', type: 'textarea', rows: 4 },
            { key: 'contacts', label: 'Contacts d\'Urgence (Médecin, Urgences Psy, Proches) :', type: 'textarea', rows: 3 }
        ],
        repeatable: true
    }
];

function getExerciseById(id) {
    return EXERCISES.find(e => e.id === id) || null;
}

const PROTOCOL_TOOL_MAP = {
    // ÉVALUATION & IPSRT
    "Lifechart_Retrospectif": ['bp_1_lifechart'],
    "Graphique_Humeur": ['bp_2_mood_tracker'],
    "Rythmes_Sociaux": ['bp_3_rythmes'],
    
    // PSYCHOÉDUCATION
    "Psychoeducation_Bipolarite": ['bp_4_psycho'],
    "Hygiene_De_Vie": ['bp_5_hygiene'],
    
    // DÉPRESSION
    "Tableau_Pensees_Automatiques": ['bp_6_pensees'],
    "Resolution_Problemes": ['bp_7_resolution'],
    
    // MANIE
    "Remise_Question_Pensees": ['bp_8_biais_manie'],
    "Avantages_Desavantages_Hypomanie": ['bp_9_avantages_hypo'],
    
    // PREVENTION
    "Signes_Rechute": ['bp_10_prodromes'],
    "Plan_Action_Urgence": ['bp_11_plan_action']
};

function getExercisesForSession(sessionNo) {
    const lookupNo = (sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo;

    if (window.PROTOCOL) {
        const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(lookupNo));
        if (phase) {
            const requestedTools = [...(phase.worksheets || []), ...(phase.guides || [])];
            let mappedExIds = [];
            requestedTools.forEach(tool => {
                if (PROTOCOL_TOOL_MAP[tool]) {
                    mappedExIds = mappedExIds.concat(PROTOCOL_TOOL_MAP[tool]);
                }
            });
            return EXERCISES.filter(e => mappedExIds.includes(e.id));
        }
    }
    return EXERCISES.filter(e => e.defaultSessions.includes(lookupNo));
}

function getExercisesByCategory(catId) {
    return EXERCISES.filter(e => e.category === catId);
}

function getActiveExercises() {
    return EXERCISES.filter(e => e.type !== 'info' && e.type !== 'model');
}
