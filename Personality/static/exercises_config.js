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
    },
    // ==========================================
    // MODULE GROUPE TCD - 20 NOUVELLES FICHES
    // ==========================================
    {
        id: 'DBT_Fiche_1', ref: 'TCD-F01', title: 'Fiche 1 : Pratique de l\'Esprit Éclairé', category: 'tcd_base', type: 'structured_form',
        description: 'Checklist des pratiques respiratoires et de visualisation de l\'esprit éclairé.',
        fields: [
            { key: 'respiration', label: 'Pratique de la respiration abdominale (min)', type: 'number', width: '100px' },
            { key: 'visualisation', label: 'Visualisation (descente au centre tempéré)', type: 'select', options: ['Non pratiqué', 'Difficulté moyenne', 'Réussi'] },
            { key: 'observations', label: 'Observations', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_2', ref: 'TCD-F02', title: 'Fiche 2 : Habiletés du Quoi', category: 'pleine_conscience', type: 'structured_form',
        description: 'Observer, Décrire, Participer. Suivi des observations sans s\'y attacher.',
        fields: [
            { key: 'observer', label: 'Observer (Juste noter l\'expérience sans mots)', type: 'textarea', rows: 2 },
            { key: 'decrire', label: 'Décrire (Mettre des mots sur les faits)', type: 'textarea', rows: 2 },
            { key: 'participer', label: 'Participer (S\'investir complètement)', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_3', ref: 'TCD-F03', title: 'Fiche 3 : Habiletés du Comment', category: 'pleine_conscience', type: 'structured_form',
        description: 'Non-jugement, Une chose à la fois, Efficacité.',
        fields: [
            { key: 'non_jugement', label: 'Pratique du Non-Jugement', type: 'textarea', rows: 2 },
            { key: 'focalisation', label: 'Focalisation (Une chose à la fois)', type: 'textarea', rows: 2 },
            { key: 'efficacite', label: 'Agir avec Efficacité (Faire ce qui fonctionne)', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_4_5', ref: 'TCD-F04/05', title: 'Fiche 4 & 5 : Journal des émotions', category: 'tcd_base', type: 'structured_form',
        description: 'Grilles d\'analyse : Événement déclencheur, changements physiques, urge et expression.',
        fields: [
            { key: 'emotion', label: 'Émotion principale', type: 'text' },
            { key: 'intensite', label: 'Intensité de l\'émotion (0-100)', type: 'number', min: 0, max: 100 },
            { key: 'declencheur', label: 'Événement déclencheur', type: 'textarea', rows: 2 },
            { key: 'physique', label: 'Changements physiques / Sensations corporelles', type: 'textarea', rows: 2 },
            { key: 'urge', label: 'Pulsion / Tendance à l\'action', type: 'textarea', rows: 2 },
            { key: 'action_faite', label: 'Ce que j\'ai fait finalement', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_6', ref: 'TCD-F06', title: 'Fiche 6 : Vérifiez les Faits', category: 'tcd_base', type: 'structured_form',
        description: 'Séparer les faits observables des interprétations.',
        fields: [
            { key: 'evenement', label: 'Quel est l\'événement déclencheur ?', type: 'textarea', rows: 2 },
            { key: 'interpretations', label: 'Mes pensées, croyances, interprétations', type: 'textarea', rows: 3 },
            { key: 'faits_purs', label: 'Quels sont les faits purs observables ?', type: 'textarea', rows: 3 },
            { key: 'menace', label: 'Y a-t-il une vraie menace objective ?', type: 'select', options: ['Oui, objectivement', 'Probablement', 'Non, c\'est mon interprétation'] }
        ]
    },
    {
        id: 'DBT_Fiche_7', ref: 'TCD-F07', title: 'Fiche 7 : Action Opposée', category: 'tcd_base', type: 'structured_form',
        description: 'Agir à l\'opposé de la pulsion émotionnelle lorsque l\'émotion n\'est pas justifiée.',
        fields: [
            { key: 'pulsion', label: 'Pulsion émotionnelle', type: 'textarea', rows: 1 },
            { key: 'action_opposee', label: 'Action opposée effectuée', type: 'textarea', rows: 3 },
            { key: 'resultat', label: 'Résultat sur l\'intensité de l\'émotion (avant/après)', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_8', ref: 'TCD-F08', title: 'Fiche 8 : Résoudre les Problèmes', category: 'tcd_base', type: 'structured_form',
        description: 'Évaluation des pour et contre avant de prendre une décision corrective.',
        fields: [
            { key: 'probleme', label: 'Description du problème (Faits purs)', type: 'textarea', rows: 2 },
            { key: 'solutions', label: 'Brainstorming - Solutions possibles', type: 'textarea', rows: 3 },
            { key: 'choix', label: 'Solution choisie à essayer', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_10', ref: 'TCD-F10', title: 'Fiche 10 : Valeurs et Actions', category: 'tcd_base', type: 'structured_form',
        description: 'Identifier ses valeurs fondamentales et planifier une action.',
        fields: [
            { key: 'valeur_visee', label: 'Valeur de vie identifiée', type: 'text' },
            { key: 'action_alignee', label: 'Action concrète alignée sur cette valeur', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_11', ref: 'TCD-F11', title: 'Fiche 11 : Bâtir une Expertise', category: 'tcd_base', type: 'structured_form',
        description: 'Planifier d\'accomplir chaque jour une chose qui nous fait nous sentir compétent.',
        fields: [
            { key: 'tache', label: 'Tâche ou activité choisie', type: 'text' },
            { key: 'difficulte', label: 'Niveau de difficulté (Doit être modéré)', type: 'select', options: ['Facile', 'Modéré', 'Difficile'] },
            { key: 'sentiment', label: 'Sentiment d\'accomplissement (0-10)', type: 'number', min: 0, max: 10 }
        ]
    },
    {
        id: 'DBT_Fiche_12', ref: 'TCD-F12', title: 'Fiche 12 : Protocole PLEASE', category: 'tcd_base', type: 'daily_log',
        description: 'Suivi de la santé physique (Maladies, Alimentation, Drogues, Sommeil, Exercice).',
        columns: [
            { key: 'jour', label: 'Jour', inputType: 'select', options: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], width: '80px' },
            { key: 'pathologie', label: 'Soigner Maladies (P,L)', inputType: 'text', width: '130px' },
            { key: 'alimentation', label: 'Alim. Équilibrée (E)', inputType: 'select', options: ['Oui', 'Moyen', 'Non'], width: '100px' },
            { key: 'drogues', label: 'Drogues Évitées (A)', inputType: 'select', options: ['Oui', 'Partiel', 'Non'], width: '100px' },
            { key: 'sommeil', label: 'Sommeil (S) (h)', inputType: 'number', width: '80px' },
            { key: 'exercice', label: 'Exercice (E)', inputType: 'text', placeholder: 'min/type' }
        ]
    },
    {
        id: 'DBT_Fiche_20', ref: 'TCD-F20', title: 'Fiche 20 : Acceptation Radicale', category: 'gestion_crise', type: 'structured_form',
        description: 'Accepter la réalité telle qu\'elle est lorsque l\'on ne peut pas la changer.',
        fields: [
            { key: 'realite', label: 'La réalité perturbante à accepter', type: 'textarea', rows: 2 },
            { key: 'obstacles', label: 'Ce qui interfère avec mon acceptation (colère, déni)', type: 'textarea', rows: 2 },
            { key: 'pratique', label: 'Comment j\'ai pratiqué l\'acceptation aujourd\'hui', type: 'textarea', rows: 2 },
            { key: 'niveau', label: 'Niveau d\'acceptation atteint (0-5)', type: 'number', min: 0, max: 5 }
        ]
    },
    {
        id: 'DBT_Fiche_13', ref: 'TCD-F13', title: 'Fiche 13 : Compétences TIP / STOP', category: 'gestion_crise', type: 'structured_form',
        description: 'Changer la physiologie pour réduire une détresse extrême.',
        fields: [
            { key: 'tip_choisi', label: 'Technique TIP utilisée', type: 'select', options: ['Température', 'Intense (Exercice)', 'Paced Breathing (Respiration rythmée)', 'Progressive (Relaxation musculaire)'] },
            { key: 'stop_choisi', label: 'Avez-vous suivi l\'acronyme STOP ?', type: 'select', options: ['Oui', 'Non'] },
            { key: 'avant', label: 'Détresse AVANT (0-100)', type: 'number', min: 0, max: 100 },
            { key: 'apres', label: 'Détresse APRÈS (0-100)', type: 'number', min: 0, max: 100 }
        ]
    },
    {
        id: 'DBT_Fiche_23', ref: 'TCD-F23', title: 'Fiche 23 : Pleine Conscience des Pensées', category: 'pleine_conscience', type: 'structured_form',
        description: 'Observer ses pensées comme des nuages passant sans s\'y accrocher.',
        fields: [
            { key: 'pensee', label: 'Pensée obsédante / intruse observée', type: 'textarea', rows: 2 },
            { key: 'methode', label: 'Méthode de détachement utilisée (ex: tapis roulant, rivière)', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_13_accepte', ref: 'TCD-F13b', title: 'Fiche 13b : ACCEPTE / IMPROVE', category: 'gestion_crise', type: 'structured_form',
        description: 'Distraction temporaire et amélioration du moment.',
        fields: [
            { key: 'accepte', label: 'Survie à la crise (ACCEPTE) - Qu\'avez-vous fait ?', type: 'textarea', rows: 3, placeholder: 'Activités, Contributions, Comparaisons, Émotions opposées, Repousser, Pensées, Sensations' },
            { key: 'improve', label: 'Améliorer le moment (IMPROVE)', type: 'textarea', rows: 3, placeholder: 'Imagerie, Sens, Prière/Méditation, Relaxation, O (Une chose à la fois), Vacances, Encouragements' }
        ]
    },
    {
        id: 'DBT_Fiche_21', ref: 'TCD-F21', title: 'Fiche 21 : Réorienter l\'Esprit', category: 'pleine_conscience', type: 'structured_form',
        description: 'Quand l\'esprit dérive vers le jugement ou la non-acceptation, pratiquer la réorientation.',
        fields: [
            { key: 'derives', label: 'Où l\'esprit a-t-il dérivé ?', type: 'textarea', rows: 2 },
            { key: 'reorientation', label: 'Comment j\'ai ramené mon esprit vers la réalité', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_22', ref: 'TCD-F22', title: 'Fiche 22 : Demi-Sourire & Mains Volontaires', category: 'gestion_crise', type: 'structured_form',
        description: 'Changer la posture physique pour induire la bonne volonté et l\'acceptation.',
        fields: [
            { key: 'situation', label: 'Situation où la pratique était nécessaire', type: 'textarea', rows: 2 },
            { key: 'duree', label: 'Durée de la pratique (minutes)', type: 'number' },
            { key: 'impact', label: 'Impact sur l\'humeur et l\'acceptation', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_24', ref: 'TCD-F24', title: 'Fiche 24 : Compétences Interpersonnelles', category: 'tcd_base', type: 'structured_form',
        description: 'Suivi des pratiques DEAR MAN, GIVE ou FAST.',
        fields: [
            { key: 'objectif', label: 'Objectif de l\'interaction', type: 'text' },
            { key: 'competence', label: 'Acronyme principalement utilisé', type: 'select', options: ['DEAR MAN (Obtenir qqchose)', 'GIVE (Entretenir la relation)', 'FAST (Garder son respect)'] },
            { key: 'description', label: 'Déroulement de l\'interaction', type: 'textarea', rows: 3 },
            { key: 'resultat', label: 'Ai-je atteint mon objectif ? Ai-je gardé la relation / mon respect ?', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_25', ref: 'TCD-F25', title: 'Fiche 25 : Valider les Autres', category: 'tcd_base', type: 'structured_form',
        description: 'Valider l\'expérience, l\'émotion ou la souffrance de l\'autre de manière authentique.',
        fields: [
            { key: 'personne', label: 'Qui ai-je validé ?', type: 'text' },
            { key: 'niveaux', label: 'Quel niveau de validation ai-je utilisé ?', type: 'select', options: ['1. Être attentif', '2. Relancer/Répéter', '3. Mettre des mots', '4. Historique', '5. Circonstances actuelles', '6. Authenticité radicale'] },
            { key: 'phrase', label: 'Phrase exacte que j\'ai dite', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_26', ref: 'TCD-F26', title: 'Fiche 26 : Auto-Validation', category: 'tcd_base', type: 'structured_form',
        description: 'S\'apporter à soi-même la validation et la compassion.',
        fields: [
            { key: 'invalidations', label: 'Auto-invalidations observées', type: 'textarea', rows: 2, placeholder: 'Ex: "Je suis nul de ressentir ça"' },
            { key: 'auto_val', label: 'Phrase d\'auto-validation utilisée en remplacement', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_27', ref: 'TCD-F27', title: 'Fiche 27 : Renforcement', category: 'tcd_base', type: 'structured_form',
        description: 'Utiliser le renforcement (positif ou négatif) pour augmenter un comportement souhaité.',
        fields: [
            { key: 'cible', label: 'Comportement cible à augmenter (chez moi ou l\'autre)', type: 'textarea', rows: 1 },
            { key: 'renforcateur', label: 'Renforçateur donné ou retiré', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'DBT_Fiche_28', ref: 'TCD-F28', title: 'Fiche 28 : Extinction & Punition', category: 'tcd_base', type: 'structured_form',
        description: 'Principes comportementaux pour diminuer un comportement.',
        fields: [
            { key: 'cible_diminuer', label: 'Comportement à diminuer', type: 'textarea', rows: 1 },
            { key: 'strategie', label: 'Stratégie utilisée', type: 'select', options: ['Extinction (Ignorer totalement)', 'Punition (Conséquence aversive)'] },
            { key: 'resultat', label: 'Résultat observé', type: 'textarea', rows: 2 }
        ]
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
    // Individuel (existant)
    "DBT_Diary_Card": ['diary_card_dbt'],
    "DBT_Chain_Analysis": ['chain_analysis'],

    // Groupe (nouveau)
    "DBT_Fiche_1": ['DBT_Fiche_1'],
    "DBT_Fiche_2": ['DBT_Fiche_2'],
    "DBT_Fiche_3": ['DBT_Fiche_3'],
    "DBT_Fiche_4_5": ['DBT_Fiche_4_5'],
    "DBT_Fiche_6": ['DBT_Fiche_6'],
    "DBT_Fiche_7": ['DBT_Fiche_7'],
    "DBT_Fiche_8": ['DBT_Fiche_8'],
    "DBT_Fiche_10": ['DBT_Fiche_10'],
    "DBT_Fiche_11": ['DBT_Fiche_11'],
    "DBT_Fiche_12": ['DBT_Fiche_12'],
    "DBT_Fiche_13": ['DBT_Fiche_13'],
    "DBT_Fiche_13_accepte": ['DBT_Fiche_13_accepte'],
    "DBT_Fiche_20": ['DBT_Fiche_20'],
    "DBT_Fiche_21": ['DBT_Fiche_21'],
    "DBT_Fiche_22": ['DBT_Fiche_22'],
    "DBT_Fiche_23": ['DBT_Fiche_23'],
    "DBT_Fiche_24": ['DBT_Fiche_24'],
    "DBT_Fiche_25": ['DBT_Fiche_25'],
    "DBT_Fiche_26": ['DBT_Fiche_26'],
    "DBT_Fiche_27": ['DBT_Fiche_27'],
    "DBT_Fiche_28": ['DBT_Fiche_28']
};

// PROTOCOLS_DB is now defined in protocols.js to avoid conflicts

function getExercisesForSession(sessionNo) {
    const frac = sessionNo - Math.floor(sessionNo);
    const isGuideSession = sessionNo !== Math.floor(sessionNo) && Math.abs(frac - 0.9) < 1e-6;
    const lookupNo = isGuideSession ? Math.ceil(sessionNo) : ((sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo);
    let theoreticalIds = [];

    if (window.PROTOCOL) {
        const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(lookupNo));
        if (phase) {
            let requestedTools = isGuideSession ? (phase.guides || []) : (phase.worksheets || []);
            
            // Support per-session Fiche overrides based on protocol configuration
            if (!isGuideSession && window.PROTOCOL.session_worksheets && Array.isArray(window.PROTOCOL.session_worksheets[lookupNo])) {
                requestedTools = window.PROTOCOL.session_worksheets[lookupNo];
            }

            let readableGuideIds = [];
            let fallbackGuideIds = [];

            requestedTools.forEach(tool => {
                if (!isGuideSession) {
                    if (PROTOCOL_TOOL_MAP[tool]) {
                        theoreticalIds = theoreticalIds.concat(PROTOCOL_TOOL_MAP[tool].map(id => id + "_s" + lookupNo));
                    }
                    return;
                }

                if (PROTOCOL_TOOL_MAP[tool]) {
                    const mappedIds = PROTOCOL_TOOL_MAP[tool];
                    const mapped = mappedIds.map(id => EXERCISES.find(e => e.id === id)).filter(Boolean);
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
                if (readableGuideIds.length > 0) {
                    theoreticalIds = theoreticalIds.concat(readableGuideIds);
                } else if (requestedTools.length === 0) {
                    theoreticalIds.push(`__guide__Coming_soon`);
                } else {
                    theoreticalIds = theoreticalIds.concat(fallbackGuideIds);
                }
            }
        }
    }

    let added = [];
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.addedExercises) {
        added = app.state.selectedPatient.addedExercises[sessionNo] || [];
    }

    let always = [];
    if (!isGuideSession) {
        always = EXERCISES.filter(e => e.alwaysAvailable === true).map(e => `${e.id}_s${lookupNo}`);
    }

    const allIds = [...new Set([...theoreticalIds, ...added, ...always])];
    return allIds.map(id => getExerciseById(id)).filter(Boolean);
}

function getExercisesByCategory(catId) {
    return EXERCISES.filter(e => e.category === catId);
}

function getActiveExercises() {
    return EXERCISES.filter(e => e.type !== 'info' && e.type !== 'model');
}
