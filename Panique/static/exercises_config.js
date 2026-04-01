const EXERCISE_CATEGORIES = [
    { id: 'evaluation', label: 'Évaluation & Observation', icon: 'fa-magnifying-glass', color: '#8b5cf6' },
    { id: 'physio', label: 'Gestion Physiologique', icon: 'fa-lungs', color: '#10b981' },
    { id: 'interoceptive', label: 'Exposition Interoceptive', icon: 'fa-heart-pulse', color: '#f59e0b' },
    { id: 'invivo', label: 'Exposition In-Vivo', icon: 'fa-walking', color: '#ef4444' },
    { id: 'rechute', label: 'Prévention de la rechute', icon: 'fa-shield-heart', color: '#6366f1' },
    { id: 'tpa_guide', label: 'Guides Cliniques (Psychoéducation)', icon: 'fa-book-medical', color: '#3b82f6' }
];

const EXERCISES = [

    {
        id: 'respiration_tracker', ref: 'PH-01',
        title: "Fiche d'exercices respiratoires",
        category: 'physio',
        type: 'respiration_tracker',
        defaultSessions: [3, 4, 5],
        description: "Prouver au cerveau que la respiration diaphragmatique fonctionne (suivi du taux de succès).",
    },
    {
        id: 'interoceptive_grid', ref: 'EX-01',
        title: "Création du profil de provocation (Interoceptive)",
        category: 'interoceptive',
        type: 'interoceptive_grid',
        defaultSessions: [5, 6, 7],
        description: "Isoler les exercices de provocation dont la similitude > 7/10 (le « talon d'Achille »).",
    },
    {
        id: 'ima_hierarchy', ref: 'EX-02',
        title: "Inventaire de Mobilité (IMA) & Hiérarchie",
        category: 'invivo',
        type: 'ima_hierarchy',
        defaultSessions: [8, 9, 10],
        description: "Construire l'échelle d'exposition in-vivo (débloque les niveaux 30-40% en premier).",
    },
    {
        id: 'habituation_tracker', ref: 'EX-03',
        title: "Tracker d'exposition in-vivo (Habituation)",
        category: 'invivo',
        type: 'habituation_tracker',
        alwaysAvailable: true,
        defaultSessions: [9, 10, 11, 12, 13],
        description: "Suivi des missions d'exposition au supermarché, ascenseur, etc., avec gestion des neutralisations.",
    },
    {
        id: 'relapse_plan', ref: 'PR-01',
        title: "Plan d'action d'urgence personnalisé",
        category: 'rechute',
        type: 'relapse_plan',
        alwaysAvailable: true,
        defaultSessions: [14],
        description: "To-Do list générée par le patient pour prévenir la rechute (Bouton d'urgence sur l'accueil du logiciel).",
    },
    // --- GUIDES CLINIQUES ---
    {
        id: 'tpa_guide_manuel_panique',
        ref: 'GUI-01',
        title: 'Manuel d\'information : La nature de la panique',
        category: 'tpa_guide',
        type: 'info',
        defaultSessions: [1, 2],
        description: 'Explication adressée au patient du mécanisme de combat-fuite (Fausse alarme).',
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-exclamation-triangle me-2 text-warning"></i>Concept Clé : Qu'est-ce qu'une attaque de panique ?</h5>
            <p><strong>Directives d'intervention :</strong> Expliquez au patient de façon métaphorique que l'attaque de panique est le système d'alarme naturel de son corps (le mode "combat ou fuite") qui se déclenche au mauvais moment (comme un détecteur de fumée face à un grille-pain). C'est une <strong>fausse alarme</strong>.</p>
            <h6>Dédramatisation des symptômes physiques :</h6>
            <ul>
                <li><strong>Palpitations :</strong> Expliquez que le cœur pompe le sang plus vite pour préparer les muscles à courir face à un danger perçu.</li>
                <li><strong>Étourdissements et picotements :</strong> Indiquez qu'ils sont causés par l'hyperventilation (respiration trop rapide) modifiant temporairement le taux de CO2 dans le sang.</li>
                <li><strong>Sensation d'étouffement :</strong> Mentionnez que ce sont les muscles de la poitrine qui se tendent pour protéger la cage thoracique.</li>
            </ul>
            <p class="alert alert-info"><strong>Règle d'or à transmettre :</strong> C'est une réaction extrêmement inconfortable et intense, mais <strong>absolument pas dangereuse</strong>. Le patient ne fera pas de crise cardiaque et ne perdra pas le contrôle.</p>
        </div>`
    },
    {
        id: 'tpa_guide_respiration',
        ref: 'GUI-02',
        title: 'Technique de rééducation respiratoire',
        category: 'tpa_guide',
        type: 'info',
        defaultSessions: [3, 4],
        description: 'Guide des 5 étapes pour bloquer l\'hyperventilation (à enseigner au patient).',
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-wind me-2 text-info"></i>Contrôler la physiologie de la panique</h5>
            <p><strong>Instructions pour la séance :</strong> Guidez le patient à travers ces 5 étapes de respiration diaphragmatique, conçues pour neutraliser le système sympathique et prouver que la réponse d'anxiété est contrôlable.</p>
            <ol>
                <li><strong>Inspiration abdominale :</strong> Le patient prend une inspiration lente. C'est le ventre qui doit se gonfler (invitez-le à mettre une main sur le ventre pour vérifier).</li>
                <li><strong>Expiration très lente :</strong> Le patient expire longuement. Demandez-lui d'imaginer une vague de relâchement corporel avec l'expiration.</li>
                <li><strong>Répétition :</strong> Recommencez le cycle pour briser la boucle d'adrénaline.</li>
                <li><strong>Remédiation cognitive :</strong> Dites au patient de se répéter mentalement : <em>"C'est une attaque de panique. C'est désagréable mais inoffensif. J'accepte cette décharge hormonale sans la fuir."</em></li>
                <li><strong>Action :</strong> Incitez le patient à reprendre doucement son ancrage dans le moment présent ou ses activités sans se centrer en boucle sur ses ressentis profonds.</li>
            </ol>
        </div>`
    },
    {
        id: 'tpa_guide_courbes',
        ref: 'GUI-03',
        title: 'Comprendre l\'Exposition : Les 3 Courbes',
        category: 'tpa_guide',
        type: 'info',
        defaultSessions: [5, 8],
        description: 'Explication visuelle de l\'habituation vs l\'évitement pour préparer les expositions in-vivo.',
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-chart-area me-2 text-primary"></i>Préparation à l'Exposition : Les Courbes de l'Anxiété</h5>
            <p><strong>Objectif Clinique :</strong> Utilisez ces 3 scénarios pour faire comprendre au patient l'impact de ses stratégies sécurisantes sur son cerveau avant le début du plan d'exposition (IMA).</p>
            
            <div class="card mb-3 border-danger">
                <div class="card-body">
                    <h6 class="text-danger">1. La courbe d'évitement / échappement (Le Piège)</h6>
                    <p>Le patient entre dans la situation redoutée, la panique monte, il fuit. L'anxiété chute immédiatement. <strong>Le problème de cet apprentissage court-terme :</strong> Le cortex reptilien apprend que fuir lui a "sauvé la vie", et associera encore plus fortement le lieu au danger à la prochaine occurrence.</p>
                </div>
            </div>

            <div class="card mb-3 border-warning">
                <div class="card-body">
                    <h6 class="text-warning">2. La courbe de neutralisation (La Béquille)</h6>
                    <p>Le patient s'expose, mais recourt à un objet ou comportement sécurisant (serrer les clés, boire répétitivement, écouter de la musique pour s'isoler). L'anxiété baisse à moitié de manière "superficielle". <strong>Le problème :</strong> Le cerveau en déduit qu'il a survécu *grâce* à cette béquille. Il n'y a donc pas de recâblage neuronal d'habituation de sécurité (absence de nouveau schéma d'apprentissage).</p>
                </div>
            </div>

            <div class="card mb-3 border-success">
                <div class="card-body">
                    <h6 class="text-success">3. La courbe d'habituation (La Guérison Neuro-cognitive)</h6>
                    <p>Le patient s'expose purement, sans évitement cognitif. L'anxiété grimpe, s'y maintient, <strong>puis finit irrémédiablement par redescendre seule</strong> (par épuisement des ressources catécholaminergiques). <strong>Résultat :</strong> Le cerveau constate l'absence totale de dommage réel, créant un nouvel apprentissage inhibiteur durable prouvant la sécurité du lieu.</p>
                </div>
            </div>
        </div>`
    },
    {
        id: 'tpa_guide_exposition_invivo',
        ref: 'GUI-04',
        title: 'Guide d\'Exposition In-Vivo (Agoraphobie)',
        category: 'tpa_guide',
        type: 'info',
        defaultSessions: [8, 9, 10, 11, 12, 13],
        description: 'Directives cliniques pour l\'accompagnement du patient lors des situations redoutées.',
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-walking me-2 text-danger"></i>Mener l'Exposition In-Vivo</h5>
            <p><strong>Rôle du Thérapeute :</strong> L'objectif de l'exposition in-vivo est d'aider le cerveau émotionnel (amygdale) à désapprendre la peur associée aux lieux publics (supermarchés, ascenseurs, transports).</p>
            <h6>Les 4 règles d'or de l'exposition :</h6>
            <ol>
                <li><strong>Progressive :</strong> Utilisez l'Inventaire de Mobilité (IMA) pour choisir des missions dont le score d'appréhension se situe entre 30% et 50% pour commencer. Ne brûlez pas les étapes.</li>
                <li><strong>Prolongée :</strong> Le patient doit rester dans la situation <em>jusqu'à ce que</em> l'anxiété redescende d'au moins 50% par rapport à son pic (Habituation). S'il fuit au pic d'anxiété, il renforce la phobie phobique.</li>
                <li><strong>Répétée :</strong> Une exposition réussie doit être répétée plusieurs jours de suite pour que l'apprentissage consolide la "mémoire de sécurité".</li>
                <li><strong>Sans neutralisation :</strong> (Crucial) Le patient ne doit pas utiliser de béquilles (ex: fuir dans la musique de son téléphone, serrer les poings, être accompagné en permanence). L'apprentissage nécessite d'être pleinement face à la peur.</li>
            </ol>
        </div>`
    },
    {
        id: 'tpa_guide_prevention_rechute',
        ref: 'GUI-05',
        title: 'Clôture et Prévention de la Rechute',
        category: 'tpa_guide',
        type: 'info',
        defaultSessions: [14],
        description: 'Comment préparer le patient à la fin de la thérapie et gérer les "faux-pas".',
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-shield-heart me-2 text-primary"></i>Prévention de la Rechute</h5>
            <p><strong>Objectif :</strong> Transformer le patient en son propre thérapeute et dédramatiser les futurs retours éventuels de la panique.</p>
            <h6>Concepts à transmettre :</h6>
            <ul>
                <li><strong>Faux-pas vs Rechute :</strong> Expliquez qu'avoir une nouvelle attaque de panique dans 6 mois (suite à un stress intense, fatigue, deuil) est un "faux-pas" normal. Cela ne signifie pas que la thérapie a échoué (Rechute), à condition d'utiliser <em>immédiatement</em> les outils appris.</li>
                <li><strong>Vulnérabilité physiologique :</strong> Rappelez l'importance fondamentale de l'hygiène de vie (sommeil, sport, absence d'excitants) pour maintenir le seuil d'activation physiologique bas.</li>
                <li><strong>Plan de Sortie d'Urgence :</strong> Vous devez remplir avec le patient son plan personnalisé. Ce plan servira d'ancrage en cas de résurgence des symptômes.</li>
            </ul>
        </div>`
    }
];

function getExerciseById(id) {
    let ex = EXERCISES.find(e => e.id === id);
    if (ex) return ex;
    return null;
}

const PROTOCOL_TOOL_MAP = {

    "Exercices_Respiratoires": ['respiration_tracker'],
    "Grille_Identification_Interoceptive": ['interoceptive_grid'],
    "Inventaire_Mobilite_Agoraphobie": ['ima_hierarchy'],
    "Tracker_Exposition_Habituation": ['habituation_tracker'],
    "Plan_Sortie_Urgence": ['relapse_plan'],
    "Guide_Manuel_Panique": ['tpa_guide_manuel_panique'],
    "Guide_Respiration": ['tpa_guide_respiration'],
    "Guide_Courbes": ['tpa_guide_courbes'],
    "Guide_Exposition_InVivo": ['tpa_guide_exposition_invivo'],
    "Guide_Prevention_Rechute": ['tpa_guide_prevention_rechute']
};

function getExercisesForSession(sessionNo) {
    const frac = sessionNo - Math.floor(sessionNo);
    const isGuideSession = sessionNo !== Math.floor(sessionNo) && Math.abs(frac - 0.9) < 1e-6;
    const lookupNo = isGuideSession ? Math.ceil(sessionNo) : ((sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo);
    let theoreticalIds = [];

    if (window.PROTOCOL) {
        const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(lookupNo));
        if (phase) {
            let requestedTools = [];
            
            if (isGuideSession) {
                if (phase.guides) requestedTools = requestedTools.concat(phase.guides);
            } else {
                if (phase.worksheets) requestedTools = requestedTools.concat(phase.worksheets);
                if (phase.assessments) requestedTools = requestedTools.concat(phase.assessments);
            }
            
            requestedTools.forEach(tool => {
                if (PROTOCOL_TOOL_MAP[tool]) {
                    theoreticalIds = theoreticalIds.concat(PROTOCOL_TOOL_MAP[tool]);
                }
            });
        }
    } else {
        theoreticalIds = EXERCISES.filter(e => e.defaultSessions.includes(lookupNo)).map(e => e.id);
    }
    
    // Add dynamic added exercises and always-available tools only for non-guide sessions
    let added = [];
    let always = [];
    
    if (!isGuideSession) {
        if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.addedExercises) {
            added = app.state.selectedPatient.addedExercises[lookupNo] || [];
        }
        always = EXERCISES.filter(e => e.alwaysAvailable === true).map(e => e.id);
    }

    const allIds = [...new Set([...theoreticalIds, ...added, ...always])];
    return allIds.map(id => getExerciseById(id)).filter(e => e);
}

function getExercisesByCategory(catId) {
    return EXERCISES.filter(e => e.category === catId);
}

function getActiveExercises() {
    return EXERCISES.filter(e => e.type !== 'info' && e.type !== 'model');
}
