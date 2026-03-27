/**
 * Ory+ TCC Simulator — Exercise Registry
 * Module TPL (Thérapie Comportementale Dialectique - TCD)
 */

const EXERCISE_CATEGORIES = [
    { id: 'tcd_base', label: 'Outils Transversaux TCD', icon: 'fa-layer-group', color: '#7c3aed' },
    { id: 'pleine_conscience', label: 'Pleine Conscience', icon: 'fa-spa', color: '#0d9488' },
    { id: 'gestion_crise', label: 'Tolérance à la Détresse', icon: 'fa-shield-alt', color: '#e11d48' }
];

const EXERCISES = [
    {
        id: 'diary_card_dbt', ref: 'TCD-01',
        title: 'Fiche d\'auto-observation quotidienne (Diary Card)',
        category: 'tcd_base',
        type: 'daily_log',
        alwaysAvailable: true,
        description: 'Suivi hebdomadaire: détresse, urges d’automutilation, comportements à risque, substances, compétences utilisées.',
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '130px' },
            { key: 'detresse', label: 'Détresse (0-5)', inputType: 'number', min: 0, max: 5, width: '120px' },
            { key: 'urge_auto', label: 'Urge auto-agressif (0-5)', inputType: 'number', min: 0, max: 5, width: '170px' },
            { key: 'substances', label: 'Substances', inputType: 'select', options: ['Non', 'Oui'], width: '120px' },
            { key: 'competences', label: 'Compétences utilisées', inputType: 'text', placeholder: 'Ex: TIP, STOP…' }
        ]
    },
    {
        id: 'chain_analysis', ref: 'TCD-02',
        title: 'Analyse en chaîne (Chain Analysis)',
        category: 'tcd_base',
        type: 'structured_form',
        alwaysAvailable: true,
        description: 'Outil en 9 étapes pour analyser une crise: déclencheurs, vulnérabilités, pensées, actions, conséquences.',
        fields: [
            { key: 'probleme', label: '1) Comportement / problème cible', type: 'textarea', rows: 2 },
            { key: 'vulnerabilites', label: '2) Vulnérabilités (fatigue, stress, substances…)', type: 'textarea', rows: 3 },
            { key: 'declencheur', label: '3) Événement déclencheur (prompting event)', type: 'textarea', rows: 3 },
            { key: 'liens', label: '4) Liens en chaîne (pensées, émotions, sensations, actions)', type: 'textarea', rows: 5 },
            { key: 'comportement', label: '5) Comportement problème', type: 'textarea', rows: 2 },
            { key: 'consequences', label: '6) Conséquences (court / long terme)', type: 'textarea', rows: 3 },
            { key: 'competences', label: '7) Compétences possibles / alternatives', type: 'textarea', rows: 3 },
            { key: 'plan', label: '8) Plan de prévention / réparation', type: 'textarea', rows: 3 },
            { key: 'apprentissages', label: '9) Apprentissages (ce que je retiens)', type: 'textarea', rows: 2 }
        ]
    }
];

function getExerciseById(id) {
    // Check if it's a dynamic instance ID (e.g. diary_card_dbt_s4)
    let baseId = id;
    if (id && id.match(/_s\d+$/)) {
        baseId = id.replace(/_s\d+$/, '');
    }

    let ex = EXERCISES.find(e => e.id === baseId);
    if (ex) {
        // Return a cloned exercise overriding the id so data maps correctly per session
        return { ...ex, id: id };
    }

    // Support "Créer un exercice personnalisé" flow
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.customExercises) {
        return app.state.selectedPatient.customExercises[id] || null;
    }
    return null;
}

const PROTOCOL_TOOL_MAP = {
    "DBT_Diary_Card": ['diary_card_dbt'],
    "DBT_Chain_Analysis": ['chain_analysis']
};

// PROTOCOLS_DB is now defined in protocols.js to avoid conflicts

function getExercisesForSession(sessionNo) {
    const lookupNo = (sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo;
    let theoreticalIds = [];

    if (window.PROTOCOL) {
        const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(lookupNo));
        if (phase) {
            const requestedTools = phase.worksheets || [];
            requestedTools.forEach(tool => {
                if (PROTOCOL_TOOL_MAP[tool]) {
                    theoreticalIds = theoreticalIds.concat(PROTOCOL_TOOL_MAP[tool]);
                }
            });
        }
    }

    // Assign session-unique IDs for DBT tools so their data isolates per session
    theoreticalIds = theoreticalIds.map(id => id + "_s" + lookupNo);

    let added = [];
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.addedExercises) {
        added = app.state.selectedPatient.addedExercises[sessionNo] || [];
    }

    // For DBT tools we use session-scoped IDs (`*_s{no}`) to isolate data.
    // Do not add base always-available IDs here to avoid duplicates in sessions.
    const always = EXERCISES.filter(e => e.alwaysAvailable === true).map(e => `${e.id}_s${lookupNo}`);
    const allIds = [...new Set([...theoreticalIds, ...added, ...always])];
    return allIds.map(id => getExerciseById(id)).filter(Boolean);
}

function getExercisesByCategory(catId) {
    return EXERCISES.filter(e => e.category === catId);
}

function getActiveExercises() {
    return EXERCISES.filter(e => e.type !== 'info' && e.type !== 'model');
}
