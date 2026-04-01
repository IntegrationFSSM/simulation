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
        description: "Faire tracer au patient l'historique de ses épisodes majeurs (manie, dépression) avec les événements de vie associés.",
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
        description: "Demander au patient de noter quotidiennement son humeur (de -3 à +3) pour observer les fluctuations et prévenir les virages thymiques.",
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
        description: "Aider le patient à identifier ses habitudes quotidiennes. L'irrégularité des rythmes est le premier déclencheur d'un épisode.",
        fields: [
            { key: 'reveil', label: 'À quelle heure le patient se réveille-t-il habituellement ? Cible d\'amélioration :', type: 'textarea', rows: 2 },
            { key: 'premier_contact', label: 'Premier contact social de la journée du patient (Qui ? À quelle heure ?) :', type: 'textarea', rows: 2 },
            { key: 'repas', label: 'Heures régulières des repas (Petit-déjeuner, Déjeuner, Dîner) :', type: 'textarea', rows: 2 },
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
        description: "Cocher avec le patient les règles d'hygiène de vie qu'il a réussi à maintenir ou qu'il vise cette semaine.",
        items: [
            { label: 'Prendre ses médicaments à la même heure chaque jour', tag: 'fondamental' },
            { label: 'Se lever à la même heure (même le week-end)', tag: 'sommeil' },
            { label: 'Éviter totalement l\'alcool (désinhibiteur et dépresseur sérotoninergique)', tag: 'substances' },
            { label: 'Éviter le cannabis et autres drogues', tag: 'substances' },
            { label: 'Manger 3 repas par jour à heures fixes', tag: 'rythme' },
            { label: 'Protéger son environnement de sommeil (noir, silence, frais)', tag: 'sommeil' }
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
        description: "Face à une baisse d'humeur du patient, analyser avec lui la situation et identifier ses pensées automatiques négatives.",
        fields: [
            { key: 'situation', label: '1. Situation (Qui, Quand, Où, Quoi)', type: 'textarea', placeholder: "Ex: Le patient a reçu un email de son patron demandant à le voir...", rows: 2 },
            { key: 'emotion', label: '2. Émotion(s) (Tristesse, Anxiété, Colère) & Intensité (0-100%)', type: 'textarea', placeholder: "Ex: Anxiété 80%, Tristesse 60%", rows: 2 },
            { key: 'pensee', label: '3. Pensée(s) Automatique(s) (Qu\'est-ce qui a traversé l\'esprit du patient ?)', type: 'textarea', placeholder: "Ex: Il va me licencier, je fais mal mon travail.", rows: 2 }
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
        description: "Aider le patient à découper les problèmes qui lui semblent des montagnes en phase dépressive.",
        fields: [
            { key: 'probleme', label: 'Quel est le problème spécifique ?', type: 'textarea', rows: 2 },
            { key: 'brainstorming', label: 'Lister avec le patient 3 solutions possibles (sans juger) :', type: 'textarea', rows: 3 },
            { key: 'choix', label: 'Quelle solution le patient choisit-il d\'essayer en premier ?', type: 'textarea', rows: 2 },
            { key: 'etapes', label: 'Quelles sont les 3 micro-étapes pour y parvenir ?', type: 'textarea', rows: 3 }
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
        description: "Aider le patient à vérifier objectivement la faisabilité de ses projets naissants (minimisation des risques).",
        fields: [
            { key: 'projet', label: 'Description du nouveau "Grand Projet" ou de l\'envie soudaine du patient :', type: 'textarea', rows: 2 },
            { key: 'urgence', label: 'Pourquoi cela semble-t-il si urgent AU PATIENT de le faire MAINTENANT ?', type: 'textarea', rows: 2 },
            { key: 'risques', label: 'Risques financiers, relationnels ou professionnels en cas d\'erreur de jugement :', type: 'textarea', rows: 3 },
            { key: 'regulateur', label: 'Personne de confiance à qui le patient DOIT en parler avant d\'agir (Règle des 48h) :', type: 'textarea', rows: 1 }
        ],
        repeatable: true
    },
    {
        id: 'bp_9_avantages_hypo', ref: 'TCC-MAN-02',
        title: 'Avantages et Désavantages de l\'Hypomanie',
        category: 'cognitif_maniaque',
        type: 'two_columns',
        defaultSessions: [13, 14, 15, 16, 17],
        description: "Travailler l'ambivalence du patient face au traitement en analysant objectivement les coûts de l'hypomanie.",
        columnA: { label: 'Ce que le patient aime dans l\'Hypomanie (Énergie, Créativité...)', placeholder: "Ex: Le patient se sent brillant..." },
        columnB: { label: 'Le prix à payer (La chute, l\'épuisement, la casse sociale/financière...)', placeholder: "Ex: Achats impulsifs, mots blessants, épuisement..." }
    },

    // ===================== PRÉVENTION DE LA RECHUTE =====================
    {
        id: 'bp_10_prodromes', ref: 'PREV-01',
        title: 'Identification de mes Signes Avant-Coureurs (Prodromes)',
        category: 'prevention',
        type: 'structured_form',
        defaultSessions: [18, 19, 20],
        description: "Aider le patient à identifier ses propres signes avant-coureurs d'un virage thymique pour intervenir tôt.",
        fields: [
            { key: 'signes_manie', label: 'Premiers signes d\'une montée (ex: sommeil raccourci sans fatigue, écouter la musique plus fort, achats compulsifs) :', type: 'textarea', rows: 4 },
            { key: 'signes_dep', label: 'Premiers signes d\'une chute (ex: repli, fatigue matinale, moins de sms) :', type: 'textarea', rows: 4 }
        ],
        repeatable: true
    },
    {
        id: 'bp_11_plan_action', ref: 'PREV-02',
        title: 'Plan d\'Action d\'Urgence',
        category: 'prevention',
        type: 'structured_form',
        defaultSessions: [18, 19, 20],
        description: "Définir avec le patient ses consignes de sécurité d'urgence à appliquer DÈS l'apparition des prodromes.",
        fields: [
            { key: 'urgence_manie', label: 'En cas de signes de MANIE, le patient doit (ex: Prendre Quétiapine 50mg, confier cartes bancaires, forcer le repos) :', type: 'textarea', rows: 4 },
            { key: 'urgence_dep', label: 'En cas de signes de DÉPRESSION, le patient doit (ex: Maintenir l\'activité, appeler psychiatre, ne pas s\'isoler) :', type: 'textarea', rows: 4 },
            { key: 'contacts', label: 'Contacts d\'Urgence (Médecin, Urgences Psy, Proches) :', type: 'textarea', rows: 3 }
        ],
        repeatable: true
    },

    // ===================== GUIDES DU THÉRAPEUTE (Psychoéducation par Phase) =====================
    {
        id: 'bp_guide_1_modele', ref: 'GUIDE-01',
        title: 'Le Modèle Vulnérabilité-Stress et le Balancier de l\'Humeur',
        category: 'psychoeducation',
        type: 'info',
        defaultSessions: [1, 2, 3, 4],
        description: "Guide du thérapeute — Phase 1 : Déculpabiliser le patient, expliquer la nature biologique de la maladie et faire le deuil de la normalité constante.",
        content: `
            <h5><i class="fas fa-user-doctor" style="color:var(--primary);margin-right:8px;"></i>Guide du Thérapeute — Phase 1</h5>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
                <div style="font-size:0.78rem;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;"><i class="fas fa-bullseye me-1"></i>Objectif Clinique</div>
                <div style="font-size:0.86rem;color:#1e40af;line-height:1.6;">Déculpabiliser le patient, expliquer la nature biologique de la maladie (accepter le traitement pharmacologique) et faire le deuil de la normalité constante.</div>
            </div>

            <h5 style="color:#f59e0b;"><i class="fas fa-lightbulb me-2"></i>La Métaphore du Thermostat Défectueux</h5>
            <div style="background:#fffbeb;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« Le trouble bipolaire est une maladie principalement <strong>biologique</strong>. Imaginez que le cerveau possède un <strong>thermostat</strong> pour réguler l'humeur, tout comme une maison a un thermostat pour la température. Chez la plupart des gens, face au stress ou à la joie, le thermostat s'ajuste légèrement et revient à la normale (l'euthymie). »</p>
                <p>« Chez vous, ce thermostat a une <strong>vulnérabilité génétique</strong> : il est déréglé. S'il fait un peu froid (tristesse), le chauffage s'emballe et la maison gèle (<strong>dépression</strong>). S'il fait un peu chaud (succès, manque de sommeil), le thermostat bloque et la maison prend feu (<strong>manie ou hypomanie</strong>). »</p>
            </div>

            <h5 style="color:#10b981;"><i class="fas fa-pills me-2"></i>Le rôle du stabilisateur (Lithium)</h5>
            <div style="background:#ecfdf5;border-left:4px solid #10b981;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« La médication est la <strong>fondation</strong> de votre maison. Elle répare la mécanique du thermostat. Mais la médication seule ne suffit pas : si vous laissez les fenêtres grandes ouvertes en plein hiver (stress, nuits blanches, alcool), même le meilleur thermostat ne pourra pas chauffer la maison. »</p>
                <p>« <strong>La thérapie sert à vous apprendre à fermer ces fenêtres.</strong> »</p>
            </div>

            <div style="background:var(--bg);border-radius:8px;padding:14px 18px;font-size:0.82rem;color:var(--text-muted);">
                <strong><i class="fas fa-clipboard-check me-1"></i>Points clés à transmettre :</strong>
                <ul style="margin:8px 0 0;padding-left:1.2rem;line-height:1.8;">
                    <li>La bipolarité n'est pas un défaut de caractère — c'est une maladie neurologique.</li>
                    <li>Le traitement médicamenteux est la base indispensable (comme l'insuline pour le diabète).</li>
                    <li>La TCC agit sur les facteurs de maintien et de rechute (les « fenêtres ouvertes »).</li>
                    <li>L'objectif n'est pas la guérison, mais la stabilisation durable (euthymie prolongée).</li>
                </ul>
            </div>
        `
    },
    {
        id: 'bp_guide_2_rythmes', ref: 'GUIDE-02',
        title: 'L\'Horloge Biologique et les Rythmes Sociaux (IPSRT)',
        category: 'psychoeducation',
        type: 'info',
        defaultSessions: [5, 6, 7, 8],
        description: "Guide du thérapeute — Phase 2 : Expliquer pourquoi la routine est le traitement psychosocial le plus puissant pour la bipolarité.",
        content: `
            <h5><i class="fas fa-user-doctor" style="color:var(--primary);margin-right:8px;"></i>Guide du Thérapeute — Phase 2</h5>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
                <div style="font-size:0.78rem;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;"><i class="fas fa-bullseye me-1"></i>Objectif Clinique</div>
                <div style="font-size:0.86rem;color:#1e40af;line-height:1.6;">Expliquer pourquoi la routine est le traitement psychosocial le plus puissant pour la bipolarité.</div>
            </div>

            <h5 style="color:#8b5cf6;"><i class="fas fa-clock me-2"></i>La Métaphore du Chef d'Orchestre</h5>
            <div style="background:#f5f3ff;border-left:4px solid #8b5cf6;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« Votre cerveau bipolaire est extrêmement sensible aux variations de l'environnement, en particulier à la <strong>lumière</strong> et aux <strong>interactions sociales</strong>. Nous avons tous une horloge biologique (le rythme circadien). »</p>
                <p>« Pour vous, le sommeil n'est pas qu'un repos, <strong>c'est un médicament</strong>. Une simple nuit blanche peut suffire à déclencher un virage maniaque. Pourquoi ? Parce que l'horloge se dérègle. »</p>
            </div>

            <h5 style="color:#0891b2;"><i class="fas fa-sync-alt me-2"></i>La Thérapie des Rythmes Sociaux (SRM)</h5>
            <div style="background:#ecfeff;border-left:4px solid #0891b2;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« La thérapie des rythmes sociaux (SRM) vise à redonner un <strong>Chef d'Orchestre</strong> à votre cerveau. Le cerveau bipolaire a besoin d'une routine stricte pour ne pas s'emballer : se lever à la même heure, manger à la même heure, avoir ses premiers contacts sociaux à la même heure. »</p>
                <p>« Cette routine agit comme un <strong>"donneur de temps" (Zeitgeber)</strong> qui signale à votre cerveau que tout est sous contrôle et qu'il n'a pas besoin de déclencher un épisode de crise. »</p>
            </div>

            <div style="background:var(--bg);border-radius:8px;padding:14px 18px;font-size:0.82rem;color:var(--text-muted);">
                <strong><i class="fas fa-clipboard-check me-1"></i>Points clés à transmettre :</strong>
                <ul style="margin:8px 0 0;padding-left:1.2rem;line-height:1.8;">
                    <li>Le sommeil est un <strong>médicament</strong> — une nuit blanche peut déclencher un virage.</li>
                    <li>Les « Zeitgebers » (donneurs de temps) : lumière, heures de repas, contacts sociaux, heure de lever.</li>
                    <li>La régularité protège l'horloge biologique même lorsque le stress augmente.</li>
                    <li>Le changement d'heure, le jet lag et les fêtes sont des périodes à haut risque.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'bp_guide_3_depression', ref: 'GUIDE-03',
        title: 'Le Piège de la Dépression Bipolaire et l\'Activation',
        category: 'psychoeducation',
        type: 'info',
        defaultSessions: [9, 10, 11, 12, 13],
        description: "Guide du thérapeute — Phase 3 : Contrer l'inhibition motrice et la distorsion cognitive de la phase dépressive sévère.",
        content: `
            <h5><i class="fas fa-user-doctor" style="color:var(--primary);margin-right:8px;"></i>Guide du Thérapeute — Phase 3</h5>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
                <div style="font-size:0.78rem;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;"><i class="fas fa-bullseye me-1"></i>Objectif Clinique</div>
                <div style="font-size:0.86rem;color:#1e40af;line-height:1.6;">Contrer l'inhibition motrice et la distorsion cognitive associées à la phase dépressive sévère du trouble bipolaire.</div>
            </div>

            <h5 style="color:#3b82f6;"><i class="fas fa-bolt me-2"></i>Le Script : L'Action avant l'Émotion</h5>
            <div style="background:#eff6ff;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« La dépression bipolaire est souvent très lourde, accompagnée d'une <strong>fatigue de plomb</strong> et d'un ralentissement psychomoteur majeur. Votre cerveau vous envoie un message erroné : <em>"Je n'ai pas d'énergie, donc je vais attendre d'en avoir pour faire des choses."</em> »</p>
                <p>« Si vous écoutez ce message, vous n'agirez jamais, et la dépression se nourrira de cette inactivité. »</p>
            </div>

            <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:12px;padding:20px 24px;margin-bottom:20px;text-align:center;">
                <div style="font-size:1.1rem;font-weight:800;color:#92400e;margin-bottom:4px;"><i class="fas fa-star me-2"></i>La Règle d'Or de l'Activation Comportementale</div>
                <div style="font-size:1rem;font-weight:700;color:#78350f;">L'action précède la motivation.</div>
            </div>

            <div style="background:#f0fdf4;border-left:4px solid #10b981;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« Vous n'allez pas attendre d'avoir envie de vous doucher ou de sortir pour le faire. Vous allez le faire de manière mécanique, <strong>comme un robot</strong>, selon le plan que nous allons établir. »</p>
                <p>« C'est l'action mécanique qui, petit à petit, va <strong>remettre la machine en route</strong> et recréer de l'énergie. »</p>
            </div>

            <div style="background:var(--bg);border-radius:8px;padding:14px 18px;font-size:0.82rem;color:var(--text-muted);">
                <strong><i class="fas fa-clipboard-check me-1"></i>Points clés à transmettre :</strong>
                <ul style="margin:8px 0 0;padding-left:1.2rem;line-height:1.8;">
                    <li>Le message « attendre l'envie » est un <strong>symptôme</strong>, pas une vérité — ne pas le suivre.</li>
                    <li>Programmer des micro-actions mécaniques (se lever, se doucher, sortir 10 min).</li>
                    <li>Le Tableau des Pensées Automatiques de Beck aide à identifier les distorsions cognitives dépressives.</li>
                    <li>La Résolution de Problème découpe les « montagnes » en étapes gérables.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'bp_guide_4_manie', ref: 'GUIDE-04',
        title: 'La Séduction de l\'Hypomanie et la Conduite sans Freins',
        category: 'psychoeducation',
        type: 'info',
        defaultSessions: [14, 15, 16, 17],
        description: "Guide du thérapeute — Phase 4 : Aider le patient à voir le danger de l'exaltation, souvent vécue comme agréable, afin qu'il accepte de la freiner.",
        content: `
            <h5><i class="fas fa-user-doctor" style="color:var(--primary);margin-right:8px;"></i>Guide du Thérapeute — Phase 4</h5>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
                <div style="font-size:0.78rem;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;"><i class="fas fa-bullseye me-1"></i>Objectif Clinique</div>
                <div style="font-size:0.86rem;color:#1e40af;line-height:1.6;">Aider le patient à voir le danger de la phase d'exaltation (hypomanie), qui est souvent vécue comme agréable, afin qu'il accepte de la freiner.</div>
            </div>

            <h5 style="color:#ef4444;"><i class="fas fa-car-burst me-2"></i>La Métaphore de la Ferrari sans freins</h5>
            <div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« Traiter la dépression est facile à justifier, car vous souffrez. Traiter l'hypomanie est beaucoup plus difficile, car <strong>vous vous sentez merveilleusement bien</strong>. Vous avez une énergie débordante, vous êtes créatif, confiant, vous avez besoin de peu de sommeil. <strong>C'est le piège de l'hypomanie : elle est séduisante.</strong> »</p>
                <p>« Imaginez que vous êtes au volant d'une <strong>Ferrari</strong>. L'hypomanie, c'est appuyer sur l'accélérateur. C'est grisant. Mais votre voiture <strong>n'a pas de freins</strong>. »</p>
            </div>

            <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
                <div style="font-size:0.82rem;font-weight:700;color:#92400e;margin-bottom:8px;"><i class="fas fa-exclamation-triangle me-2"></i>Les deux issues inévitables de l'accélération :</div>
                <div style="display:flex;gap:16px;flex-wrap:wrap;">
                    <div style="flex:1;min-width:200px;background:white;border-radius:8px;padding:12px 16px;border-left:3px solid #ef4444;">
                        <div style="font-weight:700;color:#ef4444;font-size:0.82rem;"><i class="fas fa-explosion me-1"></i> Le Crash</div>
                        <div style="font-size:0.8rem;color:var(--text);margin-top:4px;">Manie sévère avec hospitalisation, ruine financière, perte de relations.</div>
                    </div>
                    <div style="flex:1;min-width:200px;background:white;border-radius:8px;padding:12px 16px;border-left:3px solid #3b82f6;">
                        <div style="font-weight:700;color:#3b82f6;font-size:0.82rem;"><i class="fas fa-gas-pump me-1"></i> La Panne d'essence</div>
                        <div style="font-size:0.8rem;color:var(--text);margin-top:4px;">Chute libre vers une dépression sévère réactionnelle.</div>
                    </div>
                </div>
            </div>

            <div style="background:#f0fdf4;border-left:4px solid #10b981;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« Notre travail avec le <strong>"Tableau des avantages et désavantages de l'hypomanie"</strong> est de vous rappeler le prix à payer pour ces quelques jours d'euphorie, et d'apprendre à mettre le pied sur le frein (réduire les stimulations, forcer le sommeil) <strong>avant le crash</strong>. »</p>
            </div>

            <div style="background:var(--bg);border-radius:8px;padding:14px 18px;font-size:0.82rem;color:var(--text-muted);">
                <strong><i class="fas fa-clipboard-check me-1"></i>Points clés à transmettre :</strong>
                <ul style="margin:8px 0 0;padding-left:1.2rem;line-height:1.8;">
                    <li>L'hypomanie semble positive mais elle est <strong>toujours suivie d'un crash</strong>.</li>
                    <li>La « Règle des 48h » : ne JAMAIS prendre de grande décision (financière, relationnelle) sans en parler à une personne de confiance et attendre 48h.</li>
                    <li>Forcer le sommeil est le frein d'urgence le plus efficace.</li>
                    <li>Le Tableau Avantages/Désavantages aide à contrer l'ambivalence face au traitement.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'bp_guide_5_prodromes', ref: 'GUIDE-05',
        title: 'Le Détecteur de Fumée (Prodromes) et le Plan d\'Urgence',
        category: 'psychoeducation',
        type: 'info',
        defaultSessions: [18, 19, 20],
        description: "Guide du thérapeute — Phase 5 : Rendre le patient expert de sa propre maladie et créer un filet de sécurité partagé avec l'entourage.",
        content: `
            <h5><i class="fas fa-user-doctor" style="color:var(--primary);margin-right:8px;"></i>Guide du Thérapeute — Phase 5</h5>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
                <div style="font-size:0.78rem;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;"><i class="fas fa-bullseye me-1"></i>Objectif Clinique</div>
                <div style="font-size:0.86rem;color:#1e40af;line-height:1.6;">Rendre le patient expert de sa propre maladie et créer un filet de sécurité partagé avec l'entourage.</div>
            </div>

            <h5 style="color:#ef4444;"><i class="fas fa-fire-extinguisher me-2"></i>La Métaphore du Détecteur de Fumée</h5>
            <div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« Une crise bipolaire (manie ou dépression) n'arrive <strong>jamais</strong> comme un éclair dans un ciel bleu. Il y a <strong>toujours</strong> des signes avant-coureurs, ce qu'on appelle des <strong>prodromes</strong>. C'est la fumée avant l'incendie. »</p>
            </div>

            <div style="display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap;">
                <div style="flex:1;min-width:250px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px 20px;">
                    <div style="font-weight:800;color:#ef4444;font-size:0.85rem;margin-bottom:8px;"><i class="fas fa-arrow-trend-up me-1"></i> Fumée de Manie</div>
                    <ul style="font-size:0.82rem;color:var(--text);line-height:1.8;padding-left:1.2rem;margin:0;">
                        <li>« Je n'ai dormi que 4 heures et je me sens en pleine forme »</li>
                        <li>« Je parle plus vite que d'habitude »</li>
                        <li>« J'ai envie de faire des achats imprévus »</li>
                        <li>Écouter la musique beaucoup plus fort</li>
                        <li>Multiplier les projets simultanés</li>
                    </ul>
                </div>
                <div style="flex:1;min-width:250px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;">
                    <div style="font-weight:800;color:#3b82f6;font-size:0.85rem;margin-bottom:8px;"><i class="fas fa-arrow-trend-down me-1"></i> Fumée de Dépression</div>
                    <ul style="font-size:0.82rem;color:var(--text);line-height:1.8;padding-left:1.2rem;margin:0;">
                        <li>« Je commence à m'isoler »</li>
                        <li>« Je n'ouvre plus mon courrier »</li>
                        <li>Fatigue matinale persistante</li>
                        <li>Moins de SMS envoyés aux proches</li>
                        <li>Repli sur soi, annulation de sorties</li>
                    </ul>
                </div>
            </div>

            <h5 style="color:#10b981;"><i class="fas fa-shield-halved me-2"></i>Le Plan d'Action d'Urgence</h5>
            <div style="background:#f0fdf4;border-left:4px solid #10b981;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;font-size:0.88rem;line-height:1.8;color:var(--text);font-style:italic;">
                <p>« Nous allons rédiger votre <strong>Plan d'Action d'Urgence</strong>. C'est votre détecteur de fumée. Vous allez définir exactement quoi faire à l'étape de la fumée (ex: appeler le psychiatre pour ajuster la médication, annuler les sorties sociales pour forcer le repos) pour ne pas avoir à appeler les pompiers (l'hôpital) quand la maison sera en feu. »</p>
                <p>« <strong>Ce plan doit être partagé avec vos proches</strong> pour qu'ils puissent vous alerter si eux voient la fumée avant vous. »</p>
            </div>

            <div style="background:var(--bg);border-radius:8px;padding:14px 18px;font-size:0.82rem;color:var(--text-muted);">
                <strong><i class="fas fa-clipboard-check me-1"></i>Points clés à transmettre :</strong>
                <ul style="margin:8px 0 0;padding-left:1.2rem;line-height:1.8;">
                    <li>Les prodromes sont <strong>personnels</strong> — chaque patient a ses propres signaux.</li>
                    <li>Intervenir au stade « fumée » évite l'hospitalisation dans la majorité des cas.</li>
                    <li>Le plan d'urgence doit inclure : contacts, actions médicamenteuses, restrictions comportementales.</li>
                    <li>Les proches sont des alliés essentiels — ils voient souvent la fumée avant le patient.</li>
                </ul>
            </div>
        `
    }
];

function getExerciseById(id) {
    if (id && id.startsWith('__guide__')) {
        const tool = id.substring('__guide__'.length);
        // Try to find a PDF resource from mapped exercises, if any.
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
    // Support "Créer un exercice personnalisé" flow (stored on the selected patient)
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.customExercises) {
        return app.state.selectedPatient.customExercises[id] || null;
    }
    return null;
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
    "Plan_Action_Urgence": ['bp_11_plan_action'],

    // GUIDES DU THÉRAPEUTE (un par phase)
    "Guide_Modele_Vulnerabilite_Stress": ['bp_guide_1_modele'],
    "Guide_Horloge_Biologique_IPSRT": ['bp_guide_2_rythmes'],
    "Guide_Depression_Activation": ['bp_guide_3_depression'],
    "Guide_Seduction_Hypomanie": ['bp_guide_4_manie'],
    "Guide_Detecteur_Fumee_Prodromes": ['bp_guide_5_prodromes']
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

                // Guide session: prefer read-only content. If the mapped exercise is not info/model,
                // show a guide-card instead (PDF/Coming soon), not the worksheet.
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
