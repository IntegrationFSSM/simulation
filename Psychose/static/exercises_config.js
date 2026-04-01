/**
 * Ory+ TCC Simulator — Exercise Registry
 * Protocol Psychose & Schizophrénie (PARCOURS A + PARCOURS B Groupe)
 */

const EXERCISE_CATEGORIES = [
    // --- Parcours A : TCCp Individuelle ---
    { id: 'engagement', label: 'Engagement & Compréhension', icon: 'fa-handshake', color: 'var(--primary)' },
    { id: 'crise', label: 'Gestion de Crise & Survie', icon: 'fa-life-ring', color: '#ef4444' },
    { id: 'restructuration', label: 'Restructuration Cognitive', icon: 'fa-brain', color: '#8b5cf6' },
    { id: 'consolidation', label: 'Consolidation & Prévention', icon: 'fa-shield-halved', color: '#10b981' },
    // --- Parcours B : Modules de Groupe ---
    { id: 'grp_act', label: 'Mini-Groupe ACT (Acceptation)', icon: 'fa-arrows-to-circle', color: '#06b6d4' },
    { id: 'grp_tfc', label: 'Mini-Groupe TFC (Compassion)', icon: 'fa-hand-holding-heart', color: '#f97316' },
    { id: 'grp_tcd', label: 'Mini-Groupe TCD Adaptée', icon: 'fa-bolt', color: '#ec4899' }
];

const EXERCISES = [
    // --- PHASE 1 : ENGAGEMENT ---
    {
        id: 'Modele_Vuln_Stress', ref: 'PSY-01',
        title: 'Le Modèle Vulnérabilité-Stress',
        category: 'engagement', type: 'model',
        defaultSessions: [1, 2],
        description: "Comprendre comment le stress actuel interagit avec la vulnérabilité biologique pour déclencher les symptômes.",
        modelSteps: [
            { label: 'Vulnérabilité Biologique\n(Génétique, Trauma)', icon: 'fa-dna', color: '#64748b' },
            { label: 'Stress Environnemental\n(Conflits, Sommeil, Cannabis)', icon: 'fa-bolt', color: '#f59e0b' },
            { label: 'Surcharge Cognitive\n(Le seau qui déborde)', icon: 'fa-water', color: '#3b82f6', highlight: true },
            { label: 'Expériences Inhabituelles\n(Voix, Paranoïa)', icon: 'fa-eye', color: '#ef4444' }
        ]
    },
    {
        id: 'Boussole_Valeurs', ref: 'PSY-02',
        title: 'La Boussole des Valeurs',
        category: 'engagement', type: 'structured_form',
        defaultSessions: [2, 3],
        description: "Faire définir au patient ses objectifs de rétablissement (Famille, Travail, Loisirs) au-delà de la simple réduction des symptômes.",
        fields: [
            { key: 'famille', label: 'Famille & Relations : Quelle personne le patient veut-il être ?', type: 'textarea', rows: 2 },
            { key: 'travail', label: 'Travail / Études : Quels sont ses buts ?', type: 'textarea', rows: 2 },
            { key: 'loisirs', label: 'Loisirs & Temps libre : Qu\'est-ce qui nourrit le patient ?', type: 'textarea', rows: 2 },
            { key: 'sante', label: 'Santé & Bien-être : Comment le patient veut-il prendre soin de lui ?', type: 'textarea', rows: 2 }
        ],
        repeatable: false
    },
    {
        id: 'Fiche_105_Observer_Emotions', ref: 'PSY-03',
        title: 'Fiche 105 : Observer et Décrire les Émotions',
        category: 'engagement', type: 'info',
        defaultSessions: [3, 4],
        description: "Prendre un pas de recul et nommer l'émotion sans l'amplifier.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-binoculars me-2" style="color:var(--primary)"></i>Observer et Décrire ses Émotions</h5>
            <p>Il est naturel de ressentir de la peur ou de la colère face à des expériences inhabituelles (comme entendre des voix). Cette fiche vous aide à identifier vos émotions de base.</p>
            <ul>
                <li><strong>Observation :</strong> Remarquez que l'émotion Monte et Descend comme une vague. Vous N'ÊTES PAS votre émotion.</li>
                <li><strong>Description :</strong> Nommez l'émotion ("Je ressens de la panique"). Notez les sensations physiques (ex: cœur qui bat vite, chaleur).</li>
                <li><strong>Ne pas juger :</strong> N'essayez pas de fuir ou de vous punir pour avoir cette émotion.</li>
            </ul>
        </div>`
    },

    // --- PHASE 2 : CRISE ---
    {
        id: 'Grille_ABC', ref: 'PSY-04',
        title: 'Grille ABC (Situation - Croyance - Conséquence)',
        category: 'crise', type: 'structured_form',
        defaultSessions: [5, 6, 7, 8],
        description: "Cartographier avec le patient comment ses interprétations (B) des situations (A) génèrent sa détresse (C).",
        fields: [
            { key: 'A_situation', label: 'A. Événement déclencheur (Qu\'est-ce qui s\'est passé ou quelle voix le patient a-t-il entendue ?)', type: 'textarea', rows: 2 },
            { key: 'B_croyance', label: 'B. Croyance / Pensée (Qu\'est-ce que cela signifie pour lui ? Ex: "Ils veulent me faire du mal")', type: 'textarea', rows: 2 },
            { key: 'C_consequence', label: 'C. Conséquence Émotionnelle & Comportementale (Qu\'est-ce que le patient a ressenti (0-100) et fait ?)', type: 'textarea', rows: 2 }
        ],
        repeatable: true
    },
    {
        id: 'Fiche_113_Survie_Crise', ref: 'PSY-SOS',
        title: 'Fiche 113 : Compétences de Survie en cas de Crise (Bouton SOS)',
        category: 'crise', type: 'info',
        defaultSessions: [6, 7],
        description: "Compétences de tolérance à la détresse de la TCD adaptées à la psychose aiguë.",
        content: `
        <div class="exercise-info-content" style="border-left: 5px solid #ef4444; background: #fef2f2;">
            <h5 style="color:#b91c1c;"><i class="fas fa-life-ring me-2"></i>SOS - Survivre à la Crise</h5>
            <p>Utilisez ces compétences lorsque la détresse (liée aux voix ou aux idées paranoïaques) dépasse 80/100 et que vous ne pouvez plus réfléchir logiquement.</p>
            <h6>1. Compétence S.T.O.P.</h6>
            <p><strong>S</strong>toppez ! Ne bougez plus.<br><strong>T</strong>irez-vous en arrière (prenez du recul physiquement/mentalement).<br><strong>O</strong>bservez (Qu'est-ce que je ressens ?).<br><strong>P</strong>oursuivez en pleine conscience.</p>
            <h6>2. Compétence T.I.P. (Changer la physiologie)</h6>
            <ul>
                <li><strong>T</strong>empérature : Plongez votre visage dans l'eau très froide pendant 30 sec (déclenche le réflexe d'apaisement).</li>
                <li><strong>I</strong>ntense (Exercice) : Faites des jumping jacks rapides ou courez sur place pour épuiser l'adrénaline.</li>
                <li><strong>P</strong>aced Breathing : Respirez lentement... (Inspirez 5s, expirez 7s).</li>
            </ul>
            <h6>3. Distraction (ACCEPTS)</h6>
            <p>Mettez de la musique très forte, occupez vos mains (dessin, glace), écrivez ce que vous ressentez pour détourner l'attention des voix.</p>
        </div>`
    },
    {
        id: 'Fiche_112_PLEASE', ref: 'PSY-05',
        title: 'Fiche 112 : Compétences PLEASE (Hygiène de Vie)',
        category: 'crise', type: 'checklist',
        defaultSessions: [5, 6],
        description: "Vérifier les vulnérabilités somatiques qui augmentent les symptômes psychotiques et dépressifs.",
        items: [
            { label: "P. L. (Physical Illness) : Le patient a soigné ses douleurs ou maladies physiques." },
            { label: "E. (Eating) : Le patient a mangé de manière équilibrée aujourd'hui." },
            { label: "A. (Avoid substances) : Le patient a évité l'alcool, le cannabis et autres drogues." },
            { label: "S. (Sleep) : Le patient a dormi au moins 7-8 heures cette nuit." },
            { label: "E. (Exercise) : Le patient a fait au moins 20 minutes d'activité physique." }
        ]
    },

    // --- PHASE 3 : RESTRUCTURATION ---
    {
        id: 'Tarte_Probabilites', ref: 'PSY-06',
        title: 'La Tarte des Probabilités',
        category: 'restructuration', type: 'structured_form',
        defaultSessions: [9, 10],
        description: "Réévaluer les croyances absolues en trouvant des explications alternatives (Assouplissement cognitif).",
        fields: [
            { key: 'croyance_initiale', label: 'Croyance Initiale (ex: "Mes voisins m\'espionnent")', type: 'text' },
            { key: 'conviction_initiale', label: 'Conviction initiale (0 à 100%)', type: 'number', min: 0, max: 100 },
            { key: 'alternative_1', label: 'Explication Alternative 1', type: 'text', placeholder: 'ex: Il y a juste des travaux dans la rue' },
            { key: 'prob_1', label: 'Probabilité Alt 1 (%)', type: 'number', min: 0, max: 100 },
            { key: 'alternative_2', label: 'Explication Alternative 2', type: 'text' },
            { key: 'prob_2', label: 'Probabilité Alt 2 (%)', type: 'number', min: 0, max: 100 },
            { key: 'conviction_finale', label: 'Nouvelle Conviction dans la Croyance Initiale (%)', type: 'number', min: 0, max: 100 }
        ],
        repeatable: true
    },
    {
        id: 'Fiche_106_Verifier_Faits', ref: 'PSY-07',
        title: 'Fiche 106 : Vérifiez les faits',
        category: 'restructuration', type: 'structured_form',
        defaultSessions: [10, 11],
        description: "Aider le patient à distinguer les faits réels observables (caméra vidéo) de ses interprétations.",
        fields: [
            { key: 'emotion', label: '1. Quelle est l\'émotion ou la pensée paranoïaque que le patient veut modifier ?', type: 'textarea', rows: 2 },
            { key: 'faits', label: '2. Quels sont les faits purs ? (Vus comme par une caméra vidéo objective)', type: 'textarea', rows: 3 },
            { key: 'interpretations', label: '3. Quelles sont les interprétations ou ajouts du patient à la situation ?', type: 'textarea', rows: 3 },
            { key: 'menace', label: '4. Y a-t-il vraiment une menace immédiate et réelle ?', type: 'select', options: ['Non', 'Oui, et le patient doit agir', 'Peut-être, mais c\'est incertain'] }
        ],
        repeatable: true
    },
    {
        id: 'Fiche_123_Pleine_Conscience_Pensees', ref: 'PSY-08',
        title: 'Fiche 123 : Pleine Conscience (Défusion) des Pensées',
        category: 'restructuration', type: 'info',
        defaultSessions: [11],
        description: "Créer une distance vis-à-vis des voix : les observer sans y obéir.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-wind me-2" style="color:#8b5cf6"></i>Défusion des Pensées et des Voix</h5>
            <p>Une voix ou une pensée n'est qu'un événement mental. Elle n'est PAS un ordre auquel vous devez obéir, et elle n'est PAS toujours la vérité.</p>
            <ul>
                <li><strong>La méthode des feuilles sur l'eau :</strong> Imaginez vos pensées ou les voix placées sur des feuilles mortes flottant sur une rivière. Regardez-les passer sans essayer de les retenir ni de les couler.</li>
                <li><strong>Étiquetage :</strong> Au lieu de dire "Je suis en danger", dites mentalement "Je remarque que j'ai la pensée que je suis en danger". Cela crée une distance (Défusion cognitive).</li>
                <li><strong>Ne pas argumenter :</strong> Ne débattez pas avec la voix. Dites simplement : "Merci chère pensée (ou voix), mais je suis occupé(e) à vivre ma vie maintenant."</li>
            </ul>
        </div>`
    },

    // --- PHASE 4 : CONSOLIDATION ---
    {
        id: 'Fiche_108_Resolution_Problemes', ref: 'PSY-09',
        title: 'Fiche 108 : Résolution de Problèmes',
        category: 'consolidation', type: 'problem_solving',
        defaultSessions: [14],
        description: "Maintenant que les symptômes sont réduits, résolvons les barrières de la vie réelle (emploi, amis).",
        fields: [
            { key: 'probleme', label: '1. Définir le problème objectivement', type: 'textarea', rows: 2 },
            { key: 'brainstorming', label: '2. Brainstorming (Écrire TOUTES les solutions possibles sans juger)', type: 'textarea', rows: 3 },
            { key: 'choix', label: '3. Solution choisie (Avantages > Inconvénients)', type: 'textarea', rows: 2 },
            { key: 'action', label: '4. Plan d\'action (Quand et comment le patient va-t-il essayer cette solution ?)', type: 'textarea', rows: 2 }
        ],
        solutionSlots: 0,
        repeatable: true
    },
    {
        id: 'Fiche_111_Anticiper', ref: 'PSY-10',
        title: 'Fiche 111 : Bâtir une expertise et Anticiper',
        category: 'consolidation', type: 'structured_form',
        defaultSessions: [15],
        description: "Planifier des activités positives (maîtrise) et anticiper les stresseurs.",
        fields: [
            { key: 'activite', label: 'Activité de Maîtrise (Qu\'est-ce qui fait se sentir compétent et bien le patient ?)', type: 'text' },
            { key: 'anticipation', label: 'Situation stressante à venir (ex: prendre le métro plein)', type: 'textarea', rows: 2 },
            { key: 'coping', label: 'Compétence(s) que le patient va utiliser préventivement', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'Plan_Anti_Rechute', ref: 'PSY-RECHUTE',
        title: 'Plan Anti-Rechute (Carte de Sécurité)',
        category: 'consolidation', type: 'structured_form',
        defaultSessions: [16],
        description: "La synthèse des signaux d'alerte du patient et de son filet de sécurité clinique.",
        fields: [
            { key: 'signes_precoces', label: 'Signes Précurseurs du patient (Ex: perte de sommeil, isolement, début de voix floues)', type: 'textarea', rows: 3 },
            { key: 'declencheurs', label: 'Déclencheurs / Stressors habituels', type: 'textarea', rows: 2 },
            { key: 'strategies', label: 'Ce que le patient peut faire IMMÉDIATEMENT (Outils, Fiche 113, Tarte des probabilités)', type: 'textarea', rows: 3 },
            { key: 'soutien', label: 'Personnes à contacter urgemment (Proches, Thérapeute, Urgences)', type: 'textarea', rows: 2 }
        ]
    },

    // --- GUIDES CLINIQUES (Pré-séance) ---
    {
        id: 'Psychose_Guide_1', ref: 'GUIDE-P1',
        title: 'Guide Phase 1 : Stabilité et Sécurité',
        category: 'engagement', type: 'info',
        description: "Guide d'animation pour la Phase 1 : Hiérarchie du traitement, stratégies cardinales, styles de communication et pièges thérapeutiques.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-shield-halved me-2" style="color:var(--primary)"></i>Phase 1 : Stabilité et Sécurité</h5>
    <p>Cette phase fondatrice vise à établir une alliance thérapeutique solide et à garantir la sécurité immédiate du patient avant tout travail exploratoire.</p>

    <h6><i class="fas fa-list-ol me-2" style="color:#ef4444"></i>Hiérarchie du traitement (Treatment Hierarchy)</h6>
    <p>L'ordre de priorité clinique est <strong>non négociable</strong> :</p>
    <ol>
        <li><strong>Comportements suicidaires et d'automutilation :</strong> Réduction immédiate de tout comportement mettant la vie en danger. Si le patient présente des idéations suicidaires actives, cet objectif prime sur tous les autres. Utilisez l'analyse en chaîne pour comprendre la séquence menant à la crise.</li>
        <li><strong>Comportements interférant avec la thérapie :</strong> Absences, retards chroniques, non-compliance médicamenteuse, dissociation en séance.</li>
        <li><strong>Comportements interférant avec la qualité de vie :</strong> Abus de substances, conflits interpersonnels graves, isolement social.</li>
        <li><strong>Acquisition de compétences comportementales :</strong> Pleine conscience, tolérance à la détresse, régulation des émotions.</li>
    </ol>

    <h6><i class="fas fa-balance-scale me-2" style="color:#8b5cf6"></i>Stratégies cardinales (Validation vs. Résolution de problèmes)</h6>
    <p>Le thérapeute doit constamment <strong>balancer</strong> deux postures :</p>
    <ul>
        <li><strong>Validation :</strong> Reconnaître que la souffrance du patient est réelle et compréhensible dans son contexte. "Je comprends que quand vous entendez ces voix, la terreur que vous ressentez est absolument réelle pour vous."</li>
        <li><strong>Résolution de problèmes :</strong> Pousser activement vers le changement. "Et en même temps, nous devons trouver ensemble des moyens pour que cette terreur ne contrôle plus votre vie."</li>
    </ul>
    <p style="font-size:0.82rem;color:var(--text-muted);border-left:3px solid var(--primary);padding-left:12px;margin-top:8px;"><em>Trop de validation sans changement = stagnation. Trop de changement sans validation = rupture d'alliance. L'équilibre est l'art de la TCCp.</em></p>

    <h6><i class="fas fa-comments me-2" style="color:#f59e0b"></i>Styles de communication</h6>
    <ul>
        <li><strong>Style réciproque (chaleureux) :</strong> Utilisé la majorité du temps. Authenticité, écoute empathique, partage émotionnel mesuré. Particulièrement crucial en début de traitement pour bâtir la confiance.</li>
        <li><strong>Style irrévérencieux :</strong> Utilisé ponctuellement pour "bousculer" un patient bloqué dans un schéma rigide. Ton direct, parfois humoristique, qui confronte les patterns sans attaquer la personne. <em>Exemple : "Alors, votre plan c'est de rester enfermé chez vous jusqu'à ce que les voix décident de partir ? Comment ça marche jusqu'ici ?"</em></li>
    </ul>

    <h6><i class="fas fa-triangle-exclamation me-2" style="color:#ef4444"></i>Pièges thérapeutiques à éviter</h6>
    <ul>
        <li><strong>Le piège de la confrontation directe :</strong> Ne jamais dire au patient que ses voix "n'existent pas" ou que ses croyances sont "fausses". Cela détruit l'alliance immédiatement.</li>
        <li><strong>Le piège de la collusion :</strong> Entrer dans le système délirant du patient ("Oui, vos voisins vous espionnent peut-être"). Rester neutre et curieux.</li>
        <li><strong>Le piège de la surprotection :</strong> Traiter le patient comme incapable d'agir, renforçant l'impuissance acquise.</li>
        <li><strong>Le piège de l'urgence permanente :</strong> Chaque séance ne peut pas être une gestion de crise. Structurer un calendrier clair.</li>
    </ul>
</div>`
    },
    {
        id: 'Psychose_Guide_2', ref: 'GUIDE-P2',
        title: 'Guide Phase 2 : Exploration et Formulation',
        category: 'crise', type: 'info',
        description: "Guide d'animation pour la Phase 2 : Protocole d'exposition aux traumatismes passés et maintien de la stabilité.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-map me-2" style="color:#ef4444"></i>Phase 2 : Exploration des Traumatismes et Formulation</h5>
    <p>Cette phase ne commence <strong>que si la stabilité de la Phase 1 est acquise</strong> (pas de comportement suicidaire actif depuis au moins 4 semaines). L'objectif est de cartographier les déclencheurs spécifiques des symptômes psychotiques et d'aborder prudemment le matériel traumatique sous-jacent.</p>

    <h6><i class="fas fa-route me-2" style="color:#8b5cf6"></i>Protocole d'exposition aux traumatismes passés</h6>
    <p>De nombreux patients psychotiques ont un historique de <strong>traumatismes précoces</strong> (abus, négligence, harcèlement). Ces expériences alimentent directement les thèmes des voix et des délires.</p>
    <ul>
        <li><strong>Évaluation de la fenêtre de tolérance :</strong> Avant toute exposition, vérifier que le patient dispose des compétences de la Phase 1 (STOP, TIP, PLEASE). Si la détresse dépasse la fenêtre, revenir immédiatement aux compétences de survie.</li>
        <li><strong>Exposition graduelle et narrative :</strong> Travailler le récit du trauma en utilisant la Grille ABC. A = le souvenir traumatique. B = la croyance associée ("C'est ma faute", "Je suis défectueux"). C = l'émotion et le comportement actuels.</li>
        <li><strong>Réduction de l'auto-accusation :</strong> Beaucoup de patients s'attribuent la responsabilité de leur trauma. Le thérapeute doit activement contextualiser : "Vous étiez un enfant. La responsabilité appartenait à l'adulte."</li>
    </ul>

    <h6><i class="fas fa-clipboard-list me-2" style="color:var(--primary)"></i>Construction de la formulation individualisée</h6>
    <p>À la fin de cette phase, le thérapeute et le patient doivent avoir co-construit une <strong>formulation de cas</strong> qui relie :</p>
    <ol>
        <li>Les <strong>expériences précoces</strong> (trauma, isolement, harcèlement).</li>
        <li>Les <strong>croyances centrales</strong> qui en découlent ("Je suis vulnérable", "Les autres sont dangereux").</li>
        <li>Les <strong>déclencheurs actuels</strong> (stress, conflit, manque de sommeil).</li>
        <li>Les <strong>symptômes</strong> (voix, paranoïa) comme des réponses compréhensibles à cette chaîne.</li>
    </ol>
    <p style="font-size:0.82rem;color:var(--text-muted);border-left:3px solid #ef4444;padding-left:12px;margin-top:8px;"><em>Surveillance constante : Si le patient décompense (retour des idéations suicidaires, augmentation brutale des hallucinations), arrêter l'exploration et revenir à la Phase 1.</em></p>
</div>`
    },
    {
        id: 'Psychose_Guide_3', ref: 'GUIDE-P3',
        title: 'Guide Phase 3 : Synthèse et Respect de soi',
        category: 'restructuration', type: 'info',
        description: "Guide d'animation pour la Phase 3 : Consolidation, atteinte des objectifs personnels et construction du respect de soi.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-star me-2" style="color:#8b5cf6"></i>Phase 3 : Synthèse et Respect de soi</h5>
    <p>Le patient a maintenant des outils de crise et une compréhension de ses schémas. Cette phase pivote vers la <strong>construction identitaire positive</strong> et l'autonomisation.</p>

    <h6><i class="fas fa-bullseye me-2" style="color:#10b981"></i>Consolidation et atteinte des objectifs</h6>
    <ul>
        <li><strong>Revisiter la Boussole des Valeurs :</strong> Comparer les objectifs définis en Phase 1 avec la situation actuelle. Quels progrès ont été faits ? Quels domaines restent à travailler ?</li>
        <li><strong>Micro-objectifs concrets :</strong> Au lieu de "retourner aux études", découper : "Cette semaine, je vais appeler le service d'admission pour demander les documents nécessaires."</li>
        <li><strong>Expériences de maîtrise :</strong> Planifier des activités qui génèrent un sentiment de compétence (cuisiner un repas, faire du sport, terminer un projet). Chaque réussite combat le sentiment d'impuissance.</li>
    </ul>

    <h6><i class="fas fa-heart me-2" style="color:#ec4899"></i>Construction du respect de soi</h6>
    <ul>
        <li><strong>De la validation externe à l'auto-validation :</strong> Le patient doit apprendre à reconnaître ses propres progrès sans avoir besoin que le thérapeute ou un proche les confirme. "Comment VOUS évaluez-vous cette semaine, indépendamment de ce que les autres pensent ?"</li>
        <li><strong>Agir en accord avec ses valeurs :</strong> Chaque action alignée avec la Boussole renforce le respect de soi. Chaque compromission l'érode.</li>
        <li><strong>Acceptation radicale de la maladie :</strong> Le patient peut avoir une vulnérabilité biologique permanente. L'accepter n'est pas renoncer — c'est choisir de vivre pleinement AVEC cette réalité plutôt que de lutter contre elle.</li>
    </ul>

    <h6><i class="fas fa-handshake me-2" style="color:var(--primary)"></i>Autonomie vis-à-vis du thérapeute</h6>
    <p>Commencer à espacer les séances (toutes les 2 semaines). Le patient doit se sentir capable de gérer les fluctuations mineures seul. Le thérapeute devient un "consultant" plutôt qu'un "sauveur".</p>
</div>`
    },
    {
        id: 'Psychose_Guide_4', ref: 'GUIDE-P4',
        title: 'Guide Phase 4 : Capacité à la Joie',
        category: 'consolidation', type: 'info',
        description: "Guide d'animation pour la Phase 4 : Intégration du passé, maintien du bien-être et développement d'une capacité durable à la joie.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-sun me-2" style="color:#f59e0b"></i>Phase 4 : Capacité à la Joie</h5>
    <p>La dernière phase transcende la gestion des symptômes. Elle vise à ce que le patient ne survive plus, mais <strong>vive véritablement</strong>.</p>

    <h6><i class="fas fa-puzzle-piece me-2" style="color:#8b5cf6"></i>Intégration et synthèse</h6>
    <ul>
        <li><strong>Récit de vie cohérent :</strong> Aider le patient à construire un récit qui intègre son passé (y compris les épisodes psychotiques) dans une histoire de vie qui a du sens. "Ces expériences font partie de mon histoire, mais elles ne SONT pas mon histoire."</li>
        <li><strong>Passé, Présent, Futur :</strong> Le patient peut maintenant regarder son passé sans être submergé, vivre son présent avec conscience, et envisager son futur avec espoir réaliste.</li>
    </ul>

    <h6><i class="fas fa-spa me-2" style="color:#10b981"></i>Développer une capacité durable à la joie</h6>
    <ul>
        <li><strong>Acceptation radicale de la réalité :</strong> La réalité est ce qu'elle est, pas ce que nous voudrions qu'elle soit. Le patient apprend à lâcher l'amertume ("Pourquoi moi ?") pour embrasser ce qui EST possible.</li>
        <li><strong>Activités nourrissantes :</strong> Identifier et planifier régulièrement des expériences qui génèrent de la joie authentique — pas juste l'absence de souffrance, mais la présence active de plaisir et de sens.</li>
        <li><strong>Connexion spirituelle ou existentielle :</strong> Pour certains patients, cela peut impliquer une pratique méditative, artistique, ou communautaire. L'objectif est de trouver quelque chose de plus grand que soi.</li>
    </ul>

    <h6><i class="fas fa-shield-halved me-2" style="color:#ef4444"></i>Maintien et prévention à long terme</h6>
    <ul>
        <li><strong>Plan Anti-Rechute finalisé :</strong> Le document vivant créé tout au long du parcours est maintenant complet. Le patient sait exactement quels sont ses signaux d'alerte, quels outils utiliser, et qui contacter.</li>
        <li><strong>Séances de rappel :</strong> Prévoir des séances de suivi ("booster sessions") à 3 mois, 6 mois, et 12 mois pour vérifier le maintien des acquis.</li>
        <li><strong>Graduation :</strong> Marquer symboliquement la fin du parcours. Reconnaître le courage du patient et le chemin parcouru.</li>
    </ul>
    <p style="font-size:0.82rem;color:var(--text-muted);border-left:3px solid #f59e0b;padding-left:12px;margin-top:8px;"><em>"Le but de la thérapie n'est pas de supprimer toute souffrance — c'est de construire une vie qui vaut la peine d'être vécue, même quand la souffrance est présente." — M. Linehan</em></p>
</div>`
    },

    // --- TRANSVERSAL ---
    {
        id: 'Fiche_104_Journal', ref: 'PSY-DAILY',
        title: 'Fiche 104 : Journal des Émotions et Signes',
        category: 'engagement', type: 'daily_log',
        defaultSessions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        description: "Demander au patient de tracer quotidiennement ses expériences psychotiques et ses émotions.",
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '130px' },
            { key: 'evenement', label: 'Àvénement / Déclencheur', inputType: 'text', placeholder: "Qu'est-ce qui s'est passé ?" },
            { key: 'emotion', label: 'Émotion', inputType: 'text', placeholder: "Peur, Tristesse..." },
            { key: 'intensite', label: 'Intensité (0-10)', inputType: 'number', min: 0, max: 10, width: '90px' },
            { key: 'voix_delire', label: 'Présence Voix/Idées (Oui/Non)', inputType: 'select', options: ['Non', 'Oui (Léger)', 'Oui (Intense)'], width: '140px' }
        ]
    },

    // ====================================================================
    // PARCOURS B — MODULES DE GROUPE (3ème Vague)
    // ====================================================================

    // ===================== MODULE 1 : MINI-GROUPE ACT (4 séances) =====================
    {
        id: 'ACT_Matrice', ref: 'ACT-01',
        title: 'La Matrice ACT',
        category: 'grp_act', type: 'structured_form',
        defaultSessions: [1],
        description: "Aider le patient à identifier ce qu'il ressent intérieurement et les actions d'évitement qui l'éloignent de ses objectifs.",
        fields: [
            { key: 'interieur', label: '1. INTÉRIEUR — Ce que ressent le patient (voix, peur, douleur) :', type: 'textarea', rows: 3, placeholder: 'Ex: Il entend des voix menaçantes, ressent une peur de sortir...' },
            { key: 'eloignement', label: '2. ACTIONS D\'ÉLOIGNEMENT — Ce que le patient fait pour fuir/éviter :', type: 'textarea', rows: 3, placeholder: 'Ex: S\'isoler, rester au lit, éviter les gens...' },
            { key: 'valeurs', label: '3. CE QUI EST IMPORTANT — Les valeurs et buts du patient :', type: 'textarea', rows: 3, placeholder: 'Ex: Famille, études, amis...' },
            { key: 'rapprochement', label: '4. ACTIONS DE RAPPROCHEMENT — Ce qui le rapproche de ses valeurs :', type: 'textarea', rows: 3, placeholder: 'Ex: Appeler un proche, sortir 10 min...' },
            { key: 'prise_conscience', label: '5. PRISE DE CONSCIENCE — Les actions d\'éloignement aident-elles le patient ?', type: 'textarea', rows: 2 }
        ],
        repeatable: true
    },
    {
        id: 'ACT_Passagers_Autobus', ref: 'ACT-02',
        title: 'Les Passagers de l\'Autobus',
        category: 'grp_act', type: 'structured_form',
        defaultSessions: [2],
        description: "Exercice de défusion cognitive : les voix sont des passagers à l'arrière du bus, mais c'est le patient qui tient le volant.",
        fields: [
            { key: 'direction', label: '1. LE CONDUCTEUR — La direction choisie par le patient (ses valeurs) :', type: 'textarea', rows: 2, placeholder: 'Ex: Vers une vie sociale active...' },
            { key: 'passager_1', label: '2. PASSAGER 1 — Nommer une voix/peur qui essaie de prendre le volant :', type: 'textarea', rows: 1, placeholder: 'Ex: La voix qui dit "En danger"' },
            { key: 'passager_1_dit', label: 'Que dit ce passager pour faire changer le patient de direction ?', type: 'textarea', rows: 2, placeholder: 'Ex: "Si tu sors, terrible"' },
            { key: 'passager_2', label: '3. PASSAGER 2 — Autre voix/peur/pensée :', type: 'textarea', rows: 1, placeholder: 'Ex: La pensée "Personne ne t\'apprécie"' },
            { key: 'passager_2_dit', label: 'Que dit ce passager ?', type: 'textarea', rows: 2 },
            { key: 'defusion', label: '4. DÉFUSION — Reformuler chaque voix avec distance ("J\'ai la pensée que...") :', type: 'textarea', rows: 3, placeholder: 'Ex: Le patient se dit "J\'ai la pensée que je suis en danger"' },
            { key: 'volant', label: '5. Comment le patient va-t-il garder le volant dirigé vers l\'avant malgré cela ?', type: 'textarea', rows: 2 }
        ],
        repeatable: true
    },
    {
        id: 'ACT_Tir_Corde', ref: 'ACT-03',
        title: 'Le Tir à la Corde avec le Monstre',
        category: 'grp_act', type: 'structured_form',
        defaultSessions: [3],
        description: "Comprendre que lutter contre les symptômes épuise : la solution est de lâcher la corde, pas de tirer plus fort.",
        fields: [
            { key: 'monstre', label: '1. LE MONSTRE — Ce contre quoi le patient lutte (voix, paranoïa, anxiété) :', type: 'textarea', rows: 2, placeholder: 'Ex: Les voix, la peur d\'être suivi...' },
            { key: 'corde', label: '2. LA CORDE — Les stratégies de lutte qu\'il utilise (comment il tire) :', type: 'textarea', rows: 3, placeholder: 'Ex: Argumenter, vérifier, s\'isoler...' },
            { key: 'cout', label: '3. LE COÛT — L\'énergie que cette lutte lui coûte (relations, santé, projets) :', type: 'textarea', rows: 2 },
            { key: 'lacher', label: '4. LÂCHER LA CORDE — Que se passe-t-il s\'il accepte sa présence sans lutter ?', type: 'textarea', rows: 3, placeholder: 'Ex: Laisser parler les voix tout en agissant.' },
            { key: 'energie', label: '5. L\'ÉNERGIE LIBÉRÉE — Ce que le patient pourrait faire avec cette énergie :', type: 'textarea', rows: 2 }
        ],
        repeatable: true
    },
    {
        id: 'ACT_Boussole_Valeurs', ref: 'ACT-04',
        title: 'La Boussole des Valeurs (ACT)',
        category: 'grp_act', type: 'structured_form',
        defaultSessions: [4],
        description: "Faire définir au patient ce qui est important pour lui, pour guider l'action engagée.",
        fields: [
            { key: 'famille', label: '1. FAMILLE & RELATIONS — Quelle personne le patient veut-il être ?', type: 'textarea', rows: 2, placeholder: 'Ex: Ami fiable, parent présent...' },
            { key: 'travail', label: '2. TRAVAIL / ÉTUDES — Quels buts professionnels comptent pour lui ?', type: 'textarea', rows: 2, placeholder: 'Ex: Reprendre une formation...' },
            { key: 'loisirs', label: '3. LOISIRS & CRÉATIVITÉ — Qu\'est-ce qui le nourrit intérieurement ?', type: 'textarea', rows: 2, placeholder: 'Ex: Musique, marche...' },
            { key: 'sante', label: '4. SANTÉ & BIEN-ÊTRE — Comment le patient veut-il prendre soin de lui ?', type: 'textarea', rows: 2 },
            { key: 'spiritualite', label: '5. SENS & SPIRITUALITÉ — Qu\'est-ce qui donne du sens à sa vie ?', type: 'textarea', rows: 2 },
            { key: 'action_engagee', label: '6. ACTION ENGAGÉE — Une action concrète que le patient fera cette semaine :', type: 'textarea', rows: 2, placeholder: 'Ex: Appeler sa sœur (famille).' }
        ],
        repeatable: true
    },

    // ===================== MODULE 2 : MINI-GROUPE TFC — COMPASSION (6 séances) =====================
    {
        id: 'TFC_3_Cercles', ref: 'TFC-01',
        title: 'Le Modèle des 3 Cercles',
        category: 'grp_tfc', type: 'structured_form',
        defaultSessions: [5, 6],
        description: "Visualisez votre système émotionnel : quelle proportion occupent la Menace (rouge), la Motivation (bleu) et l'Apaisement (vert) ?",
        fields: [
            { key: 'menace', label: '1. CERCLE ROUGE — Système de MENACE : Quand s\'active-t-il ? (peur, colère, dégoût, paranoïa)', type: 'textarea', rows: 2, placeholder: 'Ex: Dès que je suis en groupe, quand les voix s\'intensifient, quand je me sens observé...' },
            { key: 'menace_pct', label: 'Quelle place occupe la Menace dans ma vie actuellement ? (0-100%)', type: 'select', options: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'] },
            { key: 'menace_reponse', label: 'Mes réponses habituelles de menace (combat, fuite, figement) :', type: 'textarea', rows: 2 },
            { key: 'motivation', label: '2. CERCLE BLEU — Système de MOTIVATION : Qu\'est-ce qui me pousse à agir ? (désir, ambition, compétition)', type: 'textarea', rows: 2 },
            { key: 'motivation_pct', label: 'Quelle place occupe la Motivation ? (0-100%)', type: 'select', options: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'] },
            { key: 'apaisement', label: '3. CERCLE VERT — Système d\'APAISEMENT : Quand me sens-je calme, en sécurité, connecté ? (lien, tendresse, repos)', type: 'textarea', rows: 2 },
            { key: 'apaisement_pct', label: 'Quelle place occupe l\'Apaisement ? (0-100%)', type: 'select', options: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'] },
            { key: 'objectif', label: '4. OBJECTIF — Comment augmenter le vert ? Quelle action apaisante puis-je ajouter cette semaine ?', type: 'textarea', rows: 2 }
        ],
        repeatable: true
    },
    {
        id: 'TFC_Respiration', ref: 'TFC-02',
        title: 'Respiration au Rythme Apaisant',
        category: 'grp_tfc', type: 'structured_form',
        defaultSessions: [7, 8],
        description: "Entraînement physiologique pour activer le système nerveux parasympathique : respiration guidée, posture, demi-sourire.",
        fields: [
            { key: 'posture', label: '1. POSTURE — Pieds au sol, épaules détendues, mains ouvertes sur les genoux. Adoptez un demi-sourire léger (même forcé, il envoie un signal d\'apaisement au cerveau).', type: 'select', options: ['✓ Posture adoptée', '⚠ Partiellement (tension résiduelle)', '✗ Difficile à adopter'] },
            { key: 'rythme', label: '2. RYTHME — 5 secondes inspiration, 5 secondes expiration (cycle de 6 respirations par minute). Durée de la pratique :', type: 'select', options: ['3 minutes', '5 minutes', '10 minutes', '15 minutes', '20 minutes'] },
            { key: 'detresse_avant', label: '3. Niveau de détresse AVANT la pratique (0-10) :', type: 'select', options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
            { key: 'detresse_apres', label: '4. Niveau de détresse APRÈS la pratique (0-10) :', type: 'select', options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
            { key: 'sensations', label: '5. OBSERVATIONS — Quelles sensations physiques avez-vous remarquées ? (chaleur, lourdeur, picotements, ralentissement cardiaque)', type: 'textarea', rows: 3 },
            { key: 'image', label: '6. IMAGE COMPASSIONNÉE — En respirant, imaginez un lieu de sécurité parfaite, ou un être profondément bienveillant avec vous. Décrivez-le :', type: 'textarea', rows: 2 },
            { key: 'detresse_avant', label: '3. Niveau de détresse AVANT la pratique (0-10) :', type: 'select', options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
            { key: 'detresse_apres', label: '4. Niveau de détresse APRÈS la pratique (0-10) :', type: 'select', options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
            { key: 'sensations', label: '5. OBSERVATIONS — Quelles sensations physiques avez-vous remarquées ? (chaleur, lourdeur, picotements, ralentissement cardiaque)', type: 'textarea', rows: 3 },
            { key: 'image', label: '6. IMAGE COMPASSIONNÀE — En respirant, imaginez un lieu de sécurité parfaite, ou un être profondément bienveillant avec vous. Décrivez-le :', type: 'textarea', rows: 2 }
        ],
        repeatable: true
    },
    {
        id: 'TFC_Lettre_Compassion', ref: 'TFC-03',
        title: 'La Lettre de Compassion',
        category: 'grp_tfc', type: 'structured_form',
        defaultSessions: [9, 10],
        description: "Àcrivez-vous une lettre du point de vue d'un ami profondément sage et compatissant, à relire lors des attaques de voix hostiles.",
        fields: [
            { key: 'situation', label: '1. LA SITUATION DOULOUREUSE — Ce que je vis actuellement :', type: 'textarea', rows: 3, placeholder: 'Ex: Les voix me disent que je suis un raté, que personne ne m\'aime...' },
            { key: 'critiques', label: '2. CE QUE LES VOIX/CRITIQUES INTERNES ME DISENT :', type: 'textarea', rows: 3, placeholder: 'Ex: "Tu ne vaux rien", "Tu es un fardeau", "Personne ne te veut"...' },
            { key: 'lettre', label: '3. LA LETTRE — Imaginez un ami profondément sage, bienveillant et compatissant qui vous connaît parfaitement. Il comprend votre souffrance sans la minimiser. Qu\'écrirait-il ?', type: 'textarea', rows: 8, placeholder: 'Cher(e) [moi-même],\n\nJe vois combien tu souffres en ce moment, et je veux que tu saches que cette souffrance est réelle et qu\'elle compte. Ce que les voix te disent n\'est pas la vérité sur qui tu es...\n\nCe que je vois quand je te regarde, c\'est quelqu\'un qui se bat chaque jour avec un courage que la plupart des gens ne peuvent pas imaginer...' },
            { key: 'relecture', label: '4. APRÈS RELECTURE — Comment vous sentez-vous après avoir lu cette lettre ?', type: 'textarea', rows: 2 },
            { key: 'engagement', label: '5. ENGAGEMENT — Je m\'engage à relire cette lettre la prochaine fois que les voix hostiles attaquent. Où vais-je la garder accessible ?', type: 'textarea', rows: 1, placeholder: 'Ex: Sur mon téléphone, dans ma poche, sur ma table de nuit...' }
        ],
        repeatable: true
    },

    // ===================== MODULE 3 : MINI-GROUPE TCD ADAPTÀE (8 séances) =====================
    {
        id: 'TCD_Pleine_Conscience', ref: 'TCD-01',
        title: 'Pleine Conscience — Fiches 102 & 103',
        category: 'grp_tcd', type: 'checklist',
        defaultSessions: [11],
        description: "Checklist d'observation et de participation au moment présent. L'Esprit Sage (Wise Mind) intègre l'esprit rationnel et l'esprit émotionnel.",
        items: [
            { label: 'J\'ai pratiqué l\'OBSERVATION (remarquer mes pensées, émotions et sensations sans y réagir)', tag: 'Quoi' },
            { label: 'J\'ai pratiqué la DESCRIPTION (mettre des mots factuels sur mes expériences internes)', tag: 'Quoi' },
            { label: 'J\'ai pratiqué la PARTICIPATION (me jeter entièrement dans une activité, sans réserve)', tag: 'Quoi' },
            { label: 'J\'ai adopté une posture NON-JUGEANTE (remplacer "bon/mauvais" par des faits)', tag: 'Comment' },
            { label: 'J\'ai fait UNE CHOSE À LA FOIS (concentration totale, pas de multi-tâche mental)', tag: 'Comment' },
            { label: 'J\'ai fait CE QUI MARCHE (efficacité plutôt que fierté ou principe)', tag: 'Comment' },
            { label: 'J\'ai cherché mon ESPRIT SAGE (ni purement émotionnel, ni purement rationnel)', tag: 'Wise Mind' }
        ]
    },

    // ===================== GUIDES DES MODULES DE GROUPE =====================
    {
        id: 'GRP_Guide_ACT', ref: 'GRP-GUIDE-ACT',
        title: 'Guide Module 1 : Mini-Groupe ACT',
        category: 'grp_act', type: 'info',
        description: "Guide d'animation du Module ACT : désespoir créatif, défusion cognitive, acceptation et valeurs.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-arrows-to-circle me-2" style="color:#06b6d4"></i>Module 1 : Mini-Groupe ACT — Acceptation et Engagement</h5>
    <p><strong>Durée :</strong> 4 séances | <strong>Cible :</strong> Patients présentant un fort évitement expérientiel (refusent de sortir par peur des voix) ou une fusion cognitive (prennent leurs pensées délirantes pour des vérités absolues).</p>

    <h6><i class="fas fa-lightbulb me-2" style="color:#f59e0b"></i>Séance 1 — Le Désespoir Créatif et l'Observation</h6>
    <p>Introduction au concept que <strong>"lutter contre les symptômes" (le contrôle) est souvent le vrai problème</strong>, pas la solution. Toutes les stratégies d'évitement que le patient a utilisées — s'isoler, argumenter avec les voix, consommer — ont-elles résolu le problème ? Si non, peut-être que la solution est ailleurs.</p>
    <p><em>Outil : La Matrice ACT</em> — Le patient cartographie ses ressentis internes, ses actions d'éloignement, ses valeurs et ses actions de rapprochement.</p>

    <h6><i class="fas fa-eye me-2" style="color:#8b5cf6"></i>Séance 2 — La Défusion Cognitive</h6>
    <p>Apprendre à observer ses pensées sans s'y accrocher. La clé : <strong>différencier "Je suis en danger" de "J'ai la pensée que je suis en danger"</strong>. Cette distance linguistique réduit le pouvoir des pensées délirantes sur le comportement.</p>
    <p><em>Outil : Les Passagers de l'Autobus</em> — Les voix et peurs sont des passagers bruyants à l'arrière du bus, mais c'est le patient qui tient le volant.</p>
    <p><em>Complément : Fiche 123</em> — Suivi quotidien de la distanciation des pensées.</p>

    <h6><i class="fas fa-hands me-2" style="color:#10b981"></i>Séance 3 — L'Acceptation et la Volonté</h6>
    <p>Faire de la place aux émotions et sensations désagréables <strong>sans essayer de les repousser</strong>. Le combat contre les symptômes consomme toute l'énergie disponible pour vivre.</p>
    <p><em>Outil : Le Tir à la Corde avec le Monstre</em> — Tirer sur la corde (lutter contre les voix) épuise. La solution est de lâcher la corde. Le monstre est toujours là, mais le patient est libre de ses mouvements.</p>

    <h6><i class="fas fa-compass me-2" style="color:#06b6d4"></i>Séance 4 — Les Valeurs et l'Action Engagée</h6>
    <p>Définir ce qui est <strong>réellement important</strong> pour la personne (famille, études, spiritualité) pour donner un sens à la tolérance de la détresse. Les valeurs ne sont pas des objectifs à atteindre — ce sont des <strong>directions</strong> dans lesquelles on choisit de marcher.</p>
    <p><em>Outil : La Boussole des Valeurs ACT</em></p>
    <p style="font-size:0.82rem;color:var(--text-muted);border-left:3px solid #06b6d4;padding-left:12px;margin-top:8px;"><em>"Tu n'as pas à attendre que les voix s'arrêtent pour commencer à vivre. Tu peux avancer AVEC elles, en choisissant ta direction."</em></p>
</div>`
    },
    {
        id: 'GRP_Guide_TFC', ref: 'GRP-GUIDE-TFC',
        title: 'Guide Module 2 : Mini-Groupe TFC (Compassion)',
        category: 'grp_tfc', type: 'info',
        description: "Guide d'animation du Module TFC : le cerveau 'rusé', les 3 systèmes émotionnels, l'entraînement compassionné et les 3 flux de compassion.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-hand-holding-heart me-2" style="color:#f97316"></i>Module 2 : Mini-Groupe TFC — Thérapie Fondée sur la Compassion</h5>
    <p><strong>Durée :</strong> 6 séances | <strong>Cible :</strong> Patients présentant une forte honte intériorisée, une autocritique sévère, ou souffrant d'hallucinations auditives hostiles, malveillantes et dénigrantes.</p>

    <h6><i class="fas fa-brain me-2" style="color:#ef4444"></i>Séances 1 & 2 — Comprendre notre cerveau "rusé" (tricky brain)</h6>
    <p>Psychoéducation <strong>déculpabilisante</strong> sur l'évolution du cerveau humain. La paranoïa est une "sur-activation" normale d'un système de survie ancien. Ce n'est <strong>pas votre faute</strong> — c'est la façon dont votre cerveau essaie de vous protéger, mais de manière mal calibrée.</p>
    <p><em>Outil : Le Modèle des 3 Cercles</em> — Le patient visualise la taille relative de son système de Menace (rouge), Motivation (bleu) et Apaisement (vert). Chez les patients psychotiques avec honte, le rouge écrase tout.</p>

    <h6><i class="fas fa-wind me-2" style="color:#3b82f6"></i>Séances 3 & 4 — L'Entraînement de l'Esprit Compassionné</h6>
    <p>Techniques physiologiques pour <strong>activer le système nerveux parasympathique</strong> et calmer le cercle de la Menace. Le corps est le levier le plus rapide pour modifier l'état émotionnel.</p>
    <p><em>Outil : Respiration au Rythme Apaisant</em> — Cycle 5s inspiration / 5s expiration couplé à la posture (pieds au sol, épaules détendues) et l'expression faciale (demi-sourire). Même forcé, le demi-sourire envoie un signal d'apaisement au cerveau via le nerf facial.</p>

    <h6><i class="fas fa-heart me-2" style="color:#ec4899"></i>Séances 5 & 6 — Diriger la Compassion (Les 3 Flux)</h6>
    <p>Apprendre à <strong>générer de la compassion</strong> pour les autres, la <strong>recevoir des autres</strong>, et la <strong>diriger vers soi-même</strong> (le plus dur pour ces patients). L'autocompassion n'est pas de la faiblesse — c'est le courage de se traiter avec la même gentillesse qu'on offrirait à un ami souffrant.</p>
    <p><em>Outil : La Lettre de Compassion</em> — Le patient s'écrit une lettre du point de vue d'un ami profondément sage et compatissant, à relire lors des attaques de voix hostiles.</p>
    <p style="font-size:0.82rem;color:var(--text-muted);border-left:3px solid #f97316;padding-left:12px;margin-top:8px;"><em>"Ce qui rend les voix si douloureuses, ce n'est pas qu'elles vous parlent — c'est que vous les croyez. La compassion ne les fait pas taire, mais elle change la voix que VOUS choisissez d'écouter."</em></p>
</div>`
    },
    {
        id: 'GRP_Guide_TCD', ref: 'GRP-GUIDE-TCD',
        title: 'Guide Module 3 : Mini-Groupe TCD Adaptée',
        category: 'grp_tcd', type: 'info',
        description: "Guide d'animation du Module TCD Adaptée : pleine conscience, tolérance à la détresse, régulation émotionnelle, hygiène de vie PLEASE et résolution de problèmes.",
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-bolt me-2" style="color:#ec4899"></i>Module 3 : Mini-Groupe TCD Adaptée</h5>
    <p><strong>Durée :</strong> 8 séances | <strong>Cible :</strong> Patients en crise aiguë, présentant une forte dysrégulation émotionnelle, un passage à l'acte impulsif (automutilation sous injonction hallucinatoire), ou une incapacité à utiliser la restructuration cognitive classique (TCCp).</p>

    <h6><i class="fas fa-om me-2" style="color:#8b5cf6"></i>Séance 11 — Pleine Conscience (Mindfulness)</h6>
    <p>L'esprit rationnel vs l'esprit émotionnel. Trouver l'<strong>Esprit Sage (Wise Mind)</strong> — l'intégration des deux qui ajoute l'intuition profonde.</p>
    <p><em>Outils : Fiches 102 & 103</em> — Checklists d'observation et de participation au moment présent.</p>

    <h6><i class="fas fa-life-ring me-2" style="color:#ef4444"></i>Séances 12 & 13 — Tolérance à la Détresse (Survie aux crises)</h6>
    <p>Comment traverser un pic de détresse <strong>sans aggraver la situation</strong>, lorsque la douleur est inévitable et le problème irrésoluble dans l'immédiat. Compétences TIP (Température, Intensité de l'exercice, Respiration rythmée) et ACCEPTS (distraction).</p>
    <p><em>Outil : Fiche 113</em> — Compétences de survie en crise.</p>

    <h6><i class="fas fa-heart-pulse me-2" style="color:#ec4899"></i>Séances 14 & 15 — Régulation des Émotions</h6>
    <p>Identifier la <strong>fonction des émotions</strong> et bloquer les réactions automatiques. Le journal des émotions permet de tracer la chaîne complète : événement À' interprétation À' émotion À' envie d'agir À' comportement. L'outil "Vérifier les faits" est particulièrement puissant pour <strong>désamorcer les boucles paranoïaques</strong>.</p>
    <p><em>Outils : Fiches 104, 105 & 106</em> — Journal des émotions, Observer et décrire, Vérifier les faits.</p>

    <h6><i class="fas fa-shield-halved me-2" style="color:#10b981"></i>Séances 16 & 17 — Réduire la Vulnérabilité (Hygiène de vie)</h6>
    <p>L'impact <strong>massif</strong> du corps sur l'esprit, particulièrement dans la prévention des rechutes psychotiques. Le manque de sommeil et les substances sont souvent les déclencheurs n°1 des décompensations.</p>
    <p><em>Outils : Fiches 111 & 112</em> — Compétences PLEASE (Pathologie physique, Liqueurs/drogues, Exercice, Alimentation, Sommeil).</p>

    <h6><i class="fas fa-puzzle-piece me-2" style="color:#3b82f6"></i>Séance 18 — Résolution de Problèmes</h6>
    <p>Transformer les <strong>inquiétudes vagues</strong> en problèmes pratiques à résoudre étape par étape. Quand le patient rumine ("Tout va mal"), la résolution de problèmes recadre : "Quel est le problème spécifique ? Quelles sont les options ?"</p>
    <p><em>Outil : Fiche 108</em> — Matrice de résolution avec évaluation des Pour et Contre.</p>
    <p style="font-size:0.82rem;color:var(--text-muted);border-left:3px solid #ec4899;padding-left:12px;margin-top:8px;"><em>"La TCD pour la psychose n'est pas un programme de plus — c'est un kit de survie. Quand le cerveau ne peut plus penser clairement, le corps et les compétences automatisées prennent le relais."</em></p>
</div>`
    }
];


// Provide dynamic resolution in exercises_config
const PROTOCOL_TOOL_MAP = {
    // --- Parcours A ---
    "Psychose_Guide_1": ["Psychose_Guide_1"],
    "Psychose_Guide_2": ["Psychose_Guide_2"],
    "Psychose_Guide_3": ["Psychose_Guide_3"],
    "Psychose_Guide_4": ["Psychose_Guide_4"],
    "Modele_Vuln_Stress": ["Modele_Vuln_Stress"],
    "Fiche_105_Observer_Emotions": ["Fiche_105_Observer_Emotions"],
    "Fiche_113_Survie_Crise": ["Fiche_113_Survie_Crise"],
    "Fiche_123_Pleine_Conscience_Pensees": ["Fiche_123_Pleine_Conscience_Pensees"],
    // --- Parcours B (Groupe) ---
    "GRP_Guide_ACT": ["GRP_Guide_ACT"],
    "GRP_Guide_TFC": ["GRP_Guide_TFC"],
    "GRP_Guide_TCD": ["GRP_Guide_TCD"]
};

function getExerciseById(id) {
    if (id && id.startsWith('__guide__')) {
        const tool = id.substring('__guide__'.length);
        return {
            id,
            ref: 'Guide',
            category: 'engagement',
            title: tool.replace(/_/g, ' '),
            description: 'Guide Thérapeutique (document)',
            type: 'info',
            content: `<div class="exercise-info-content">
                <h5>${tool.replace(/_/g, ' ')}</h5>
                <p>Consultez votre manuel TCCp pour guider cette session.</p>
            </div>`
        };
    }
    
    let baseId = id;
    if (id && id.match(/_s\d+$/)) {
        baseId = id.replace(/_s\d+$/, '');
    }

    let ex = EXERCISES.find(e => e.id === baseId);
    if(ex) return { ...ex, id: id };
    
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.customExercises) {
        return app.state.selectedPatient.customExercises[id] || null;
    }
    return null;
}

// -------------------------------------------------------------
// CORE LOGIC: DYNAMIC DIAGNOSTIC ROUTING ENGINE 
// (CDSS & PSYRATS Score Evaluation)
// -------------------------------------------------------------
function getExercisesForSession(sessionNo) {
    const frac = sessionNo - Math.floor(sessionNo);
    const isGuideSession = sessionNo !== Math.floor(sessionNo) && Math.abs(frac - 0.9) < 1e-6;
    const lookupNo = isGuideSession ? Math.ceil(sessionNo) : ((sessionNo !== Math.floor(sessionNo)) ? Math.floor(sessionNo) : sessionNo);
    let theoreticalIds = [];
    
    let injectedTools = [];

    // --- CLINICAL SYSTEM ROUTING ---
    // Extract Patient scores for CDSS and PSYRATS to dynamically inject tools over riding standard roadmap
    if (window.app && app.state && app.state.selectedPatient) {
        const p = app.state.selectedPatient;
        const allScaleSaves = p.sessionScores || {};
        
        // 1. Evaluate CDSS Cut-Off
        const cdssScoreObj = Object.values(allScaleSaves).find(s => s && s.scaleId === 'CDSS');
        if (cdssScoreObj && cdssScoreObj.score > 6) {
            // Cut-off > 6 => Depressive comorbidity -> Prioritize Fiche 112 PLEASE
            injectedTools.push('Fiche_112_PLEASE');
        }

        // 2. Evaluate PSYRATS 
        const psyratsHA = Object.values(allScaleSaves).find(s => s && s.scaleId === 'PSYRATS_HA');
        const psyratsID = Object.values(allScaleSaves).find(s => s && s.scaleId === 'PSYRATS_ID');

        // PSYRATS HA Logistics:
        if (psyratsHA && psyratsHA.rawAnswers) {
            // Index 7 = Détresse (Intensité), Index 8 = Détresse (Quantité)
            const detresseIntensite = parseInt(psyratsHA.rawAnswers[7] || 0);
            const detresseQuantite = parseInt(psyratsHA.rawAnswers[8] || 0);
            const origineCroyance = parseInt(psyratsHA.rawAnswers[4] || 0); // Index 4 = Conviction Origine
            
            if (detresseIntensite >= 3 || detresseQuantite >= 3) {
                // High Distress => Trigger Crisis Protocol
                injectedTools.push('Fiche_113_Survie_Crise');
            }
            if (origineCroyance >= 3) {
                // High external origin belief => Challenge with ABC and Fact Verification
                injectedTools.push('Grille_ABC');
                injectedTools.push('Fiche_106_Verifier_Faits');
            }
        }

        // PSYRATS ID Logistics:
        if (psyratsID && psyratsID.rawAnswers) {
            // Index 2 = Conviction
            const certitude = parseInt(psyratsID.rawAnswers[2] || 0);
            
            if (certitude === 4) {
                // Absolute certainty = Do not confront directly. Defusion needed.
                injectedTools.push('Fiche_123_Pleine_Conscience_Pensees');
            } else if (certitude === 2 || certitude === 3) {
                // Doubt present = Probability Pie is effective
                injectedTools.push('Tarte_Probabilites');
            }
        }
    }

    // Clean up injected tools to be unique
    injectedTools = [...new Set(injectedTools)];

    if (window.PROTOCOL) {
        const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(lookupNo));
        if (phase) {
            if (isGuideSession) {
                // Return guides — resolve through PROTOCOL_TOOL_MAP to display rich content
                const gTools = phase.guides || [];
                let readableGuideIds = [];
                let fallbackGuideIds = [];
                gTools.forEach(tool => {
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
                if (readableGuideIds.length > 0) {
                    theoreticalIds = theoreticalIds.concat(readableGuideIds);
                } else if (gTools.length === 0) {
                    theoreticalIds.push(`__guide__Coming_soon`);
                } else {
                    theoreticalIds = theoreticalIds.concat(fallbackGuideIds);
                }
            } else {
                // Return session explicitly mapped tools
                let requestedTools = [];
                if (window.PROTOCOL.session_worksheets && Array.isArray(window.PROTOCOL.session_worksheets[lookupNo])) {
                    requestedTools = window.PROTOCOL.session_worksheets[lookupNo];
                }
                
                // Combine the standard tools with any Algorithm Injected tools!
                const combinedBaseTools = [...new Set([...requestedTools, ...injectedTools])];
                theoreticalIds = theoreticalIds.concat(combinedBaseTools.map(id => id + "_s" + lookupNo));
            }
        }
    }

    let added = [];
    if (window.app && app.state && app.state.selectedPatient && app.state.selectedPatient.addedExercises) {
        added = app.state.selectedPatient.addedExercises[sessionNo] || [];
    }
    
    const allIds = [...new Set([...theoreticalIds, ...added])];
    return allIds.map(id => getExerciseById(id)).filter(Boolean);
}

function getExercisesByCategory(catId) {
    return EXERCISES.filter(e => e.category === catId);
}

function getActiveExercises() {
    return EXERCISES.filter(e => e.type !== 'info' && e.type !== 'model');
}
