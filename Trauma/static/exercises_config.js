const EXERCISE_CATEGORIES = [
    { id: 'evaluation', label: 'Évaluation & Triage', icon: 'fa-clipboard-check', color: '#8b5cf6' },
    { id: 'stabilisation', label: 'Stabilisation & Gestion', icon: 'fa-hand-holding-heart', color: '#10b981' },
    { id: 'cognitif', label: 'Restructuration Cognitive', icon: 'fa-brain', color: '#3b82f6' },
    { id: 'exposition', label: 'Exposition Prolongée', icon: 'fa-fire', color: '#ef4444' },
    { id: 'maintien', label: 'Consolidation & Maintien', icon: 'fa-shield-heart', color: '#6366f1' },
    { id: 'trauma_guide', label: 'Guides Cliniques (Psychoéducation)', icon: 'fa-book-medical', color: '#0ea5e9' }
];

const EXERCISES = [
    // =====================================================
    // SECTION 0 : ÉVALUATION ET TRIAGE
    // =====================================================
    {
        id: 'lec_5', ref: 'EV-01',
        title: "LEC-5 — Liste des événements de vie",
        category: 'evaluation',
        type: 'structured_form',
        defaultSessions: [1, 2],
        description: "Identifier le type de trauma et sa date. Le système calcule le nombre de jours post-trauma pour orienter le choix du protocole (ESA < 30 jours vs TSPT > 30 jours).",
        fields: [
            { key: 'event_type', label: "Type d'événement traumatique", type: 'select', options: [
                "Catastrophe naturelle", "Incendie ou explosion", "Accident de transport",
                "Accident grave au travail / à domicile", "Exposition à une substance toxique",
                "Agression physique", "Agression avec arme", "Agression sexuelle",
                "Combat ou exposition en zone de guerre", "Captivité (otage, prisonnier)",
                "Maladie ou blessure engageant le pronostic vital", "Souffrance humaine grave (témoin)",
                "Mort violente d'un proche", "Mort accidentelle d'un proche",
                "Autre événement très stressant"
            ]},
            { key: 'event_date', label: "Date de l'événement traumatique", placeholder: "AAAA-MM-JJ", rows: 1 },
            { key: 'event_description', label: "Description brève de l'événement", placeholder: "Décrivez les circonstances de l'événement...", rows: 3 },
            { key: 'exposure_type', label: "Type d'exposition", type: 'select', options: [
                "Expérience directe (vécu personnellement)",
                "Témoin direct (vu se produire à quelqu'un d'autre)",
                "Apprendre que c'est arrivé à un proche",
                "Exposition professionnelle répétée (premiers répondants)"
            ]},
            { key: 'immediate_reactions', label: "Réactions immédiates du patient (premières 48h)", placeholder: "Décrivez les réactions immédiates : dissociation, sidération, peur intense, etc.", rows: 3 },
            { key: 'current_symptoms', label: "Symptômes actuels rapportés", placeholder: "Cauchemars, flashbacks, hypervigilance, évitement, insomnie...", rows: 3 }
        ]
    },

    // =====================================================
    // SECTION 1 : STABILISATION (ESA)
    // =====================================================
    {
        id: 'echelle_gradation_emotions', ref: 'ST-01',
        title: "Échelle de gradation des émotions (0-10)",
        category: 'stabilisation',
        type: 'structured_form',
        defaultSessions: [3, 4, 5, 6],
        description: "Permet au patient d'identifier et de quantifier son niveau de détresse. Le psychologue note les sensations physiques associées à chaque palier.",
        fields: [
            { key: 'niveau_0_2', label: "Niveau 0-2 : Calme / Sécurité — Sensations physiques", placeholder: "Ex: Respiration lente, muscles détendus, mains chaudes...", rows: 2 },
            { key: 'niveau_3_4', label: "Niveau 3-4 : Inconfort léger — Sensations physiques", placeholder: "Ex: Légère tension dans les épaules, estomac noué...", rows: 2 },
            { key: 'niveau_5_6', label: "Niveau 5-6 : Détresse modérée — Sensations physiques", placeholder: "Ex: Palpitations, transpiration, difficulté de concentration...", rows: 2 },
            { key: 'niveau_7_8', label: "Niveau 7-8 : Détresse élevée — Sensations physiques", placeholder: "Ex: Tremblements, sensation d'étouffement, hyperventilation, nausées...", rows: 2 },
            { key: 'niveau_9_10', label: "Niveau 9-10 : Crise / Panique — Sensations physiques", placeholder: "Ex: Dissociation, paralysie, cris, sensation de mort imminente...", rows: 2 },
            { key: 'declencheurs', label: "Principaux déclencheurs identifiés", placeholder: "Quelles situations, sons, odeurs, images font monter le niveau ?", rows: 3 }
        ]
    },
    {
        id: 'references_patient', ref: 'ST-02',
        title: "Prescriptions de techniques d'auto-régulation",
        category: 'stabilisation',
        type: 'checklist',
        defaultSessions: [3, 4, 5, 6],
        description: "Liste des exercices prescrits au patient pour la gestion de la détresse à domicile. Le psychologue coche ceux qu'il enseigne en séance.",
        items: [
            { label: "Cohérence cardiaque (5 sec inspir / 5 sec expir × 5 min)", tag: "Quotidien" },
            { label: "Technique d'ancrage 5-4-3-2-1 (5 choses vues, 4 touchées, 3 entendues, 2 senties, 1 goûtée)", tag: "En cas de flashback" },
            { label: "Respiration diaphragmatique (main sur le ventre)", tag: "Quotidien" },
            { label: "Lieu sûr en imagination (visualisation guidée)", tag: "Au coucher" },
            { label: "Relaxation musculaire progressive de Jacobson", tag: "3x/semaine" },
            { label: "Journal d'ancrage positif (3 moments positifs/jour)", tag: "Quotidien" },
            { label: "Limitation de l'exposition aux médias / réseaux sociaux", tag: "Continu" },
            { label: "Hygiène du sommeil (horaires fixes, pas d'écran)", tag: "Continu" }
        ]
    },

    // =====================================================
    // SECTION 2A : RESTRUCTURATION COGNITIVE
    // =====================================================
    {
        id: 'tarte_hypotheses', ref: 'RC-01',
        title: "La Tarte des Hypothèses (Responsabilité)",
        category: 'cognitif',
        type: 'structured_form',
        defaultSessions: [7, 8],
        description: "Outil puissant pour cibler la culpabilité du survivant. Le psychologue aide le patient à lister tous les facteurs qui ont contribué à l'événement et à attribuer un pourcentage de responsabilité à chacun.",
        fields: [
            { key: 'event_summary', label: "Résumé de l'événement traumatique", placeholder: "Brève description de l'événement...", rows: 2 },
            { key: 'guilt_thought', label: "Pensée de culpabilité du patient", placeholder: "Ex: 'C'est ma faute, j'aurais dû me défendre / partir plus tôt / crier'", rows: 2 },
            { key: 'factor_1', label: "Facteur 1 (ex: L'agresseur) — % de responsabilité", placeholder: "Ex: L'agresseur — 40%", rows: 1 },
            { key: 'factor_2', label: "Facteur 2 (ex: L'éclairage insuffisant) — %", placeholder: "Ex: Éclairage urbain insuffisant — 15%", rows: 1 },
            { key: 'factor_3', label: "Facteur 3 (ex: L'heure tardive) — %", placeholder: "Ex: Horaire de livraison nocturne — 15%", rows: 1 },
            { key: 'factor_4', label: "Facteur 4 (ex: L'employeur) — %", placeholder: "Ex: Absence de mesures de sécurité — 15%", rows: 1 },
            { key: 'factor_5', label: "Facteur 5 (ex: Le hasard / la malchance) — %", placeholder: "Ex: Hasard — 10%", rows: 1 },
            { key: 'factor_patient', label: "Part réelle du patient — %", placeholder: "Ex: Ma part — 5%", rows: 1 },
            { key: 'conclusion', label: "Conclusion du psychologue (reformulation)", placeholder: "En répartissant objectivement les responsabilités, quelle part revient réellement au patient ?", rows: 3 }
        ]
    },
    {
        id: 'restructuration_socratique', ref: 'RC-02',
        title: "Questionnement Socratique (4 questions)",
        category: 'cognitif',
        type: 'structured_form',
        defaultSessions: [7, 8, 9],
        description: "Guide en 4 questions utilisé par le psychologue en séance pour remettre en question les pensées automatiques liées au trauma.",
        fields: [
            { key: 'thought', label: "Pensée automatique identifiée", placeholder: "Ex: 'Le monde est dangereux', 'Je suis faible', 'C'est ma faute'", rows: 2 },
            { key: 'q1_evidence_for', label: "Q1 — Quelles sont les preuves QUI SOUTIENNENT cette pensée ?", placeholder: "Le patient donne des arguments en faveur de la pensée...", rows: 3 },
            { key: 'q2_evidence_against', label: "Q2 — Quelles sont les preuves QUI CONTREDISENT cette pensée ?", placeholder: "Y a-t-il des faits qui ne correspondent pas à cette croyance ?", rows: 3 },
            { key: 'q3_alternative', label: "Q3 — Existe-t-il une explication ALTERNATIVE plus équilibrée ?", placeholder: "Comment quelqu'un d'autre verrait-il cette situation ?", rows: 3 },
            { key: 'q4_consequence', label: "Q4 — Que se passe-t-il si vous continuez à croire cela ? Et si vous adoptez la pensée alternative ?", placeholder: "Impact sur le comportement, les émotions, la vie quotidienne...", rows: 3 },
            { key: 'new_thought', label: "Nouvelle pensée formulée", placeholder: "Reformulation équilibrée de la pensée initiale...", rows: 2 }
        ]
    },
    {
        id: 'grille_auto_observation_rc', ref: 'RC-03',
        title: "Grille d'auto-observation cognitive",
        category: 'cognitif',
        type: 'daily_log',
        defaultSessions: [7, 8, 9],
        description: "Tableau à 4 colonnes que le patient remplit entre les séances : Situation / Émotions / Comportements / Pensées automatiques.",
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '120px' },
            { key: 'situation', label: 'Situation', inputType: 'text', placeholder: 'Décrivez la situation...' },
            { key: 'emotions', label: 'Émotions (0-10)', inputType: 'text', placeholder: 'Peur 8/10, Colère 6/10...' },
            { key: 'pensees', label: 'Pensées automatiques', inputType: 'text', placeholder: 'Ce que je me suis dit...' },
            { key: 'comportement', label: 'Comportement', inputType: 'text', placeholder: 'Ce que j\'ai fait (évitement, fuite...)' }
        ]
    },

    // =====================================================
    // SECTION 2B : EXPOSITION PROLONGÉE
    // =====================================================
    {
        id: 'hierarchie_invivo', ref: 'EX-01',
        title: "Hiérarchie d'exposition in-vivo (Situations)",
        category: 'exposition',
        type: 'structured_form',
        defaultSessions: [10, 11],
        description: "Le psychologue liste les situations évitées par le patient et leur attribue un NAS (Niveau d'Anxiété Subjective 0-100). Le système les trie du plus bas au plus élevé.",
        fields: [
            { key: 'sit_1', label: "Situation 1 — NAS estimé", placeholder: "Ex: Marcher dans ma rue le soir — NAS 30", rows: 1 },
            { key: 'sit_2', label: "Situation 2 — NAS estimé", placeholder: "Ex: Prendre le bus — NAS 40", rows: 1 },
            { key: 'sit_3', label: "Situation 3 — NAS estimé", placeholder: "Ex: Aller au centre commercial seul — NAS 50", rows: 1 },
            { key: 'sit_4', label: "Situation 4 — NAS estimé", placeholder: "Ex: Se promener dans une rue animée la nuit — NAS 60", rows: 1 },
            { key: 'sit_5', label: "Situation 5 — NAS estimé", placeholder: "Ex: Retourner sur le lieu de l'agression — NAS 75", rows: 1 },
            { key: 'sit_6', label: "Situation 6 — NAS estimé", placeholder: "Ex: Livrer seul la nuit dans le même quartier — NAS 90", rows: 1 },
            { key: 'sit_7', label: "Situation 7 — NAS (optionnel)", placeholder: "", rows: 1 },
            { key: 'sit_8', label: "Situation 8 — NAS (optionnel)", placeholder: "", rows: 1 },
            { key: 'notes', label: "Notes cliniques sur la hiérarchie", placeholder: "Observations sur les comportements d'évitement, les béquilles sécurisantes...", rows: 3 }
        ]
    },
    {
        id: 'grille_exposition_invivo', ref: 'EX-02',
        title: "Grille d'auto-observation — Exposition in-vivo",
        category: 'exposition',
        type: 'daily_log',
        alwaysAvailable: true,
        defaultSessions: [10, 11, 12, 13, 14],
        description: "Le psychologue consigne les résultats des missions d'exposition rapportés par le patient : NAS avant, pendant (pic), et après.",
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '110px' },
            { key: 'situation', label: 'Situation affrontée', inputType: 'text', placeholder: 'Ex: Bus ligne 5...' },
            { key: 'duree', label: 'Durée (min)', inputType: 'number', width: '70px', min: 0, max: 300 },
            { key: 'nas_avant', label: 'NAS Avant', inputType: 'number', width: '70px', min: 0, max: 100 },
            { key: 'nas_pic', label: 'NAS Pic', inputType: 'number', width: '70px', min: 0, max: 100 },
            { key: 'nas_apres', label: 'NAS Après', inputType: 'number', width: '70px', min: 0, max: 100 }
        ]
    },
    {
        id: 'hierarchie_points_chauds', ref: 'EX-03',
        title: "Hiérarchie des « Points Chauds » (Imagination)",
        category: 'exposition',
        type: 'structured_form',
        defaultSessions: [10, 11, 12],
        description: "Le psychologue identifie les pires moments (« hot spots ») du souvenir traumatique et leur attribue un NAS. Ces points seront traités en priorité lors de l'exposition en imagination.",
        fields: [
            { key: 'hotspot_1', label: "Point chaud 1 — Moment le plus perturbant", placeholder: "Ex: Le moment où j'ai senti le coup — NAS 95", rows: 2 },
            { key: 'hotspot_2', label: "Point chaud 2", placeholder: "Ex: Le regard de l'agresseur — NAS 85", rows: 2 },
            { key: 'hotspot_3', label: "Point chaud 3", placeholder: "Ex: L'incapacité de crier — NAS 80", rows: 2 },
            { key: 'hotspot_4', label: "Point chaud 4", placeholder: "Ex: Le bruit de mes clés tombant au sol — NAS 70", rows: 2 },
            { key: 'hotspot_5', label: "Point chaud 5 (optionnel)", placeholder: "", rows: 2 },
            { key: 'cognitions', label: "Cognitions associées aux points chauds", placeholder: "Ex: 'Je vais mourir', 'C'est ma faute', 'Personne ne viendra m'aider'", rows: 3 }
        ]
    },
    {
        id: 'grille_nas_imagination', ref: 'EX-04',
        title: "Grille des NAS — Exposition en Imagination",
        category: 'exposition',
        type: 'daily_log',
        alwaysAvailable: true,
        defaultSessions: [11, 12, 13, 14],
        description: "Pendant que le patient raconte le trauma en séance (90 min), le psychologue note le NAS toutes les 5 minutes. Le système génère la courbe d'habituation.",
        columns: [
            { key: 'date', label: 'Date séance', inputType: 'date', width: '110px' },
            { key: 'min_0', label: '0 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_5', label: '5 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_10', label: '10 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_15', label: '15 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_20', label: '20 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_25', label: '25 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_30', label: '30 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_35', label: '35 min', inputType: 'number', width: '55px', min: 0, max: 100 },
            { key: 'min_40', label: '40 min', inputType: 'number', width: '55px', min: 0, max: 100 }
        ]
    },

    // =====================================================
    // SECTION 2C : CONSOLIDATION ET MAINTIEN
    // =====================================================
    {
        id: 'resume_therapie', ref: 'MN-01',
        title: "Résumé de la thérapie — Bilan des acquis",
        category: 'maintien',
        type: 'structured_form',
        defaultSessions: [15, 16],
        description: "Le psychologue compile avec le patient les outils et les enseignements qui ont fonctionné durant la thérapie.",
        fields: [
            { key: 'comprehension', label: "Ce que le patient a compris sur sa réaction au trauma", placeholder: "Reformuler comment le patient explique maintenant ses symptômes...", rows: 3 },
            { key: 'outils_efficaces', label: "Outils qui ont le mieux fonctionné", placeholder: "Ex: La cohérence cardiaque, la tarte des hypothèses, l'exposition in-vivo au bus...", rows: 3 },
            { key: 'progres_scores', label: "Évolution des scores cliniques (PCL-5 initial → final)", placeholder: "Ex: PCL-5 : 52 → 18 | IES-R : 48 → 15 | BDI : 18 → 8", rows: 2 },
            { key: 'situations_recuperees', label: "Situations récupérées (plus évitées)", placeholder: "Ex: Reprend le bus seul, retourné sur le lieu de l'agression, travaille de nuit...", rows: 3 },
            { key: 'difficultes_persistantes', label: "Difficultés persistantes à surveiller", placeholder: "Ex: Sursaut encore marqué aux bruits forts, sommeil fragile en période de stress...", rows: 3 }
        ]
    },
    {
        id: 'fiche_prevention_rechutes', ref: 'MN-02',
        title: "Fiche de prévention des rechutes",
        category: 'maintien',
        type: 'structured_form',
        alwaysAvailable: true,
        defaultSessions: [15, 16],
        description: "Plan d'action d'urgence personnalisé que le patient garde : symptômes précurseurs, situations à risque, et actions à entreprendre.",
        fields: [
            { key: 'precurseurs', label: "Symptômes précurseurs d'une rechute", placeholder: "Ex: Retour des cauchemars, irritabilité croissante, envie d'éviter les situations récupérées...", rows: 3 },
            { key: 'situations_risque', label: "Situations à risque identifiées", placeholder: "Ex: Anniversaire du trauma, stress professionnel intense, exposition médiatique à des faits similaires...", rows: 3 },
            { key: 'actions_immediates', label: "Actions immédiates à entreprendre (To-Do List 1-2-3)", placeholder: "1. Reprendre la cohérence cardiaque quotidienne\n2. Relire mes fiches d'exposition réussies\n3. Appeler mon psychologue si les symptômes persistent > 2 semaines", rows: 4 },
            { key: 'personne_ressource', label: "Personne(s) ressource", placeholder: "Nom, téléphone, lien...", rows: 2 },
            { key: 'medication', label: "Médication d'urgence (si applicable)", placeholder: "Ex: Hydroxyzine 25mg au besoin pour le sommeil", rows: 1 }
        ]
    },

    // =====================================================
    // GUIDES CLINIQUES (PSYCHOÉDUCATION)
    // =====================================================
    {
        id: 'trauma_guide_esa',
        ref: 'GUI-01',
        title: "Guide : L'État de Stress Aigu (ESA)",
        category: 'trauma_guide',
        type: 'info',
        defaultSessions: [1, 2, 3, 4, 5, 6],
        description: "Psychoéducation pour le thérapeute et le patient sur le mécanisme de la réaction aiguë au stress.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-bolt me-2 text-warning"></i>L'État de Stress Aigu (ESA)</h5>
            <p><strong>À utiliser pour :</strong> Tout patient vu dans le premier mois suivant le trauma, ou pour stabiliser un patient TSPT très dysrégulé avant de commencer l'exposition.</p>

            <h6>Qu'est-ce que l'ESA ?</h6>
            <p>L'ESA est une réaction <strong>normale</strong> du cerveau face à un événement anormal. Le système d'alarme du corps (l'amygdale) s'est activé en mode « survie ». Les symptômes (flashbacks, cauchemars, hypervigilance) sont les séquelles de cette activation. <strong>Ce n'est PAS de la faiblesse.</strong></p>

            <h6>Le mécanisme de la fausse alarme :</h6>
            <ol>
                <li><strong>Encodage fragmenté :</strong> Pendant le trauma, le cerveau enregistre le souvenir en « morceaux » (sons, images, odeurs) au lieu de le ranger en mémoire narrative complète.</li>
                <li><strong>Déclencheurs :</strong> N'importe quel fragment similaire (un bruit, une odeur, une obscurité) réactive l'alarme comme si le danger était présent <em>maintenant</em>.</li>
                <li><strong>Réaction de survie :</strong> Le corps répond par la fuite, le combat, ou la sidération (freeze) — même en l'absence de danger réel.</li>
            </ol>

            <h6>Objectifs thérapeutiques de la phase ESA :</h6>
            <ul>
                <li>Restaurer le <strong>sentiment de sécurité</strong> (le patient doit savoir qu'il est en sécurité maintenant)</li>
                <li>Enseigner les <strong>techniques d'ancrage</strong> (5-4-3-2-1, cohérence cardiaque) pour couper court aux flashbacks</li>
                <li>Restaurer le <strong>sommeil</strong> (priorité clinique absolue)</li>
                <li>Prévenir le développement d'un <strong>TSPT chronique</strong></li>
            </ul>

            <div class="alert alert-warning mt-3" style="font-size:0.85rem;">
                <i class="fas fa-exclamation-triangle me-1"></i> <strong>Attention :</strong> Ne PAS commencer d'exposition (in-vivo ou en imagination) pendant la phase ESA. Le patient doit d'abord être stabilisé. L'exposition prématurée peut aggraver la dissociation.
            </div>
        </div>`
    },
    {
        id: 'trauma_guide_tspt',
        ref: 'GUI-02',
        title: "Guide : Le TSPT — Comprendre et Restructurer",
        category: 'trauma_guide',
        type: 'info',
        defaultSessions: [7, 8, 9],
        description: "Guide pour la phase de restructuration cognitive : cibler les cognitions post-traumatiques.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-brain me-2 text-primary"></i>Le Trouble de Stress Post-Traumatique</h5>
            <p><strong>Diagnostic :</strong> Lorsque les symptômes de l'ESA persistent au-delà de 30 jours avec un retentissement fonctionnel significatif, on parle de TSPT (F43.10).</p>

            <h6>Les 4 clusters symptomatiques du DSM-5 :</h6>
            <ol>
                <li><strong>Reviviscences :</strong> Flashbacks, cauchemars, détresse aux rappels</li>
                <li><strong>Évitement :</strong> Des pensées, sentiments, situations ou personnes liés au trauma</li>
                <li><strong>Altérations cognitives et de l'humeur :</strong> Culpabilité, honte, détachement, amnésie</li>
                <li><strong>Hyperactivation :</strong> Hypervigilance, sursauts, irritabilité, insomnie</li>
            </ol>

            <h6>Restructuration cognitive — Cibles prioritaires :</h6>
            <ul>
                <li><strong>La culpabilité du survivant :</strong> « C'est ma faute » → Utiliser la <em>Tarte des hypothèses</em> pour répartir objectivement les responsabilités</li>
                <li><strong>La sur-généralisation du danger :</strong> « Le monde entier est dangereux » → Distinguer le contexte du trauma de la réalité actuelle</li>
                <li><strong>L'incompétence perçue :</strong> « Je suis faible, je n'ai pas su me défendre » → Reconnaître que la réaction de sidération est automatique et protectrice</li>
            </ul>

            <h6>Outil central : Le questionnement socratique</h6>
            <p>Jamais dire au patient « vous avez tort de penser ça ». Toujours l'amener à <strong>découvrir lui-même</strong> l'alternative par les 4 questions :</p>
            <ol>
                <li>Quelles preuves soutiennent cette pensée ?</li>
                <li>Quelles preuves la contredisent ?</li>
                <li>Existe-t-il une explication alternative ?</li>
                <li>Quel est l'impact de maintenir cette croyance vs l'alternative ?</li>
            </ol>
        </div>`
    },
    {
        id: 'trauma_guide_exposition',
        ref: 'GUI-03',
        title: "Guide : L'Exposition Prolongée (Protocole Foa)",
        category: 'trauma_guide',
        type: 'info',
        defaultSessions: [10, 11, 12, 13, 14],
        description: "Protocole d'exposition pour le psychologue : exposition in-vivo et en imagination selon le modèle d'Edna Foa.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-fire me-2 text-danger"></i>L'Exposition Prolongée — Protocole Foa</h5>
            <p><strong>Principe fondamental :</strong> Le souvenir traumatique est « piégé » dans un réseau de peur. L'exposition répétée et prolongée permet au cerveau de <strong>retraiter</strong> le souvenir et de le ranger en mémoire narrative (« c'est fini, je suis en sécurité maintenant »).</p>

            <div class="card mb-3 border-info">
                <div class="card-body">
                    <h6 class="text-info"><i class="fas fa-road me-2"></i>Dossier B1 : Exposition In-Vivo</h6>
                    <p>Le patient affronte <strong>progressivement les situations réelles</strong> qu'il évite (lieux, horaires, transports).</p>
                    <ol>
                        <li>Construire la <strong>Hiérarchie des situations</strong> (NAS 0-100) avec le patient</li>
                        <li>Commencer par les situations à <strong>NAS 30-50</strong> (ne jamais commencer par le haut)</li>
                        <li>Le patient doit rester dans la situation <strong>jusqu'à ce que le NAS diminue de 50%</strong></li>
                        <li>Chaque mission est <strong>répétée</strong> jusqu'à ce que le NAS initial diminue à ≤ 20</li>
                        <li><strong>Pas de neutralisation</strong> (téléphone, alcool, accompagnement systématique)</li>
                    </ol>
                </div>
            </div>

            <div class="card mb-3 border-danger">
                <div class="card-body">
                    <h6 class="text-danger"><i class="fas fa-microphone me-2"></i>Dossier B2 : Exposition en Imagination</h6>
                    <p>Le patient <strong>raconte son trauma à voix haute</strong> en séance, au présent, les yeux fermés. Le psychologue note le NAS toutes les 5 minutes.</p>
                    <ol>
                        <li><strong>Durée :</strong> Ces séances durent <strong>90 minutes</strong> (au lieu de 60). Il faut laisser le temps au NAS de monter PUIS de redescendre avant de laisser le patient rentrer chez lui.</li>
                        <li><strong>Enregistrement :</strong> L'exposition est enregistrée (audio). Le patient réécoute l'enregistrement entre les séances comme exercice d'habituation.</li>
                        <li><strong>Points chauds :</strong> Identifier et cibler les « hot spots » — les pires moments du souvenir — pour une exposition ciblée répétée.</li>
                        <li><strong>Habituation inter-séances :</strong> Le NAS pic diminue de séance en séance. Quand le NAS pic < 30, l'exposition en imagination est terminée.</li>
                    </ol>
                </div>
            </div>

            <div class="alert alert-danger mt-3" style="font-size:0.85rem;">
                <i class="fas fa-exclamation-circle me-1"></i> <strong>Règle absolue :</strong> Ne JAMAIS laisser repartir un patient dont le NAS est > 50 en fin de séance. Utilisez les 10-15 dernières minutes pour l'ancrage (cohérence cardiaque, lieu sûr en imagination) et assurez-vous que le NAS est redescendu.
            </div>
        </div>`
    },
    {
        id: 'trauma_guide_brochure',
        ref: 'GUI-04',
        title: "Brochure patient : Comprendre le TSPT",
        category: 'trauma_guide',
        type: 'info',
        defaultSessions: [15, 16],
        description: "Document à remettre au patient en fin de thérapie pour le maintien des acquis.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-file-medical me-2 text-success"></i>Brochure : Comprendre et Vivre Après le Trauma</h5>
            <p><strong>À remettre au patient lors de la dernière séance.</strong></p>

            <h6>Ce que vous avez accompli :</h6>
            <ul>
                <li>Vous avez appris à <strong>reconnaître</strong> vos déclencheurs et à comprendre pourquoi votre corps réagissait</li>
                <li>Vous avez <strong>affronté</strong> les situations et les souvenirs que vous évitiez — et votre cerveau a appris qu'il n'y avait plus de danger</li>
                <li>Vous avez <strong>remis en question</strong> les pensées de culpabilité et de honte qui n'étaient pas les vôtres</li>
            </ul>

            <h6>Ce qu'il faut savoir pour la suite :</h6>
            <ul>
                <li><strong>Un « faux-pas » n'est pas une rechute :</strong> Si un cauchemar ou un flashback revient (anniversaire du trauma, stress intense), c'est normal. Appliquez immédiatement vos outils (ancrage, cohérence cardiaque). Si les symptômes persistent plus de 2 semaines, consultez.</li>
                <li><strong>Les dates anniversaires :</strong> Autour de la date de l'événement, il est courant de ressentir une recrudescence. Préparez-vous et prévenez votre entourage.</li>
                <li><strong>L'hygiène de vie reste vitale :</strong> Sommeil régulier, activité physique, limitation de l'alcool et des écrans nocturnes.</li>
            </ul>

            <h6>Numéros utiles :</h6>
            <ul>
                <li>Votre psychologue : [coordonnées dans le plan]</li>
                <li>Ligne de crise : [numéro local]</li>
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
    "LEC_5": ['lec_5'],
    "Echelle_Gradation_Emotions": ['echelle_gradation_emotions'],
    "References_Patient": ['references_patient'],
    "Tarte_Hypotheses": ['tarte_hypotheses'],
    "Restructuration_Socratique": ['restructuration_socratique'],
    "Grille_Auto_Observation_RC": ['grille_auto_observation_rc'],
    "Hierarchie_InVivo": ['hierarchie_invivo'],
    "Grille_Exposition_InVivo": ['grille_exposition_invivo'],
    "Hierarchie_Points_Chauds": ['hierarchie_points_chauds'],
    "Grille_NAS_Imagination": ['grille_nas_imagination'],
    "Resume_Therapie": ['resume_therapie'],
    "Fiche_Prevention_Rechutes": ['fiche_prevention_rechutes'],
    "Guide_ESA": ['trauma_guide_esa'],
    "Guide_TSPT": ['trauma_guide_tspt'],
    "Guide_Exposition": ['trauma_guide_exposition'],
    "Guide_TSPT_Brochure": ['trauma_guide_brochure']
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
