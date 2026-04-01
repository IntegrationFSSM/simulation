const EXERCISE_CATEGORIES = [
    { id: 'evaluation', label: 'Triage & Évaluation', icon: 'fa-clipboard-check', color: '#8b5cf6' },
    { id: 'cognitif', label: 'Psychoéducation & Restructuration', icon: 'fa-brain', color: '#3b82f6' },
    { id: 'exposition_a', label: 'Dossier A: Exposition en Imagination', icon: 'fa-cloud-moon', color: '#f59e0b' },
    { id: 'exposition_b', label: 'Dossier B: Exposition In-Vivo (EIVPR)', icon: 'fa-fire', color: '#ef4444' },
    { id: 'maintien', label: 'Consolidation & Maintien', icon: 'fa-shield-heart', color: '#10b981' },
    { id: 'toc_guide', label: 'Guides Cliniques', icon: 'fa-book-medical', color: '#0ea5e9' }
];

const EXERCISES = [
    // =====================================================
    // SECTION 0 : ÉVALUATION ET TRIAGE
    // =====================================================
    {
        id: 'index_symptomes_toc', ref: 'EV-01',
        title: "Index des Thèmes (Checklist)",
        category: 'evaluation',
        type: 'checklist',
        defaultSessions: [1, 2],
        description: "Identifier les thèmes spécifiques des obsessions du patient (Y-BOCS Symptom Checklist).",
        items: [
            { label: "Contamination (Saleté, germes, maladies, produits toxiques)", tag: "Fréquent" },
            { label: "Agressivité / Perte de contrôle (Peur de blesser physiquement un proche)", tag: "Souvent caché" },
            { label: "Agressivité / Perte de contrôle (Peur d'insulter, de blasphémer)", tag: "" },
            { label: "Sexuel (Pensées interdites, inceste, homosexualité non désirée)", tag: "Tabou" },
            { label: "Symétrie / Exactitude (Besoin que les choses soient « parfaites » ou alignées)", tag: "Vérification" },
            { label: "Thésaurisation (Peur de jeter, accumulation)", tag: "Syllogomanie" },
            { label: "Religieux / Scrupules (Peur du péché, pensées impures envers Dieu)", tag: "" },
            { label: "Somatique (Préoccupation excessive pour une partie du corps, rythme cardiaque)", tag: "" },
            { label: "Superstition / Magie (Chiffres de chance/malchance, couleurs interdites)", tag: "Pensée magique" }
        ]
    },
    {
        id: 'analyse_fonctionnelle_toc', ref: 'EV-02',
        title: "TOC : Analyse Fonctionnelle et Formulation",
        category: 'evaluation',
        type: 'structured_form',
        defaultSessions: [1, 2],
        description: "Cartographier le déclencheur, la pensée obsessionnelle, la conséquence redoutée et le rituel pour établir la ligne de base du modèle cognitif.",
        fields: [
            { key: 'external_triggers', label: "Déclencheurs Externes (Situations, Lieux, Personnes)", placeholder: "Ex: Toucher la poignée des toilettes publiques...", rows: 2 },
            { key: 'internal_triggers', label: "Déclencheurs Internes (Pensées, Images soudaines, Sensations)", placeholder: "Ex: Image mentale de poignarder mon conjoint...", rows: 2 },
            { key: 'obsessions', label: "L'Obsession principale exprimée", placeholder: "Ex: 'Mes mains sont infectées par le VIH'", rows: 2 },
            { key: 'anticipated_consequences', label: "Conséquences Anticipées (Pire scénario)", placeholder: "Ex: 'Je vais transmettre le VIH à mes enfants et être responsable de leur mort'", rows: 2 },
            { key: 'compulsions', label: "Compulsions (Rituels Mentaux et Physiques)", placeholder: "Ex: Se laver les mains 15 fois, réciter mentalement 'je suis sain'...", rows: 3 },
            { key: 'avoidance', label: "Stratégies d'Évitement utilisées", placeholder: "Ex: Ne plus utiliser d'ascenseurs, cacher tous les couteaux...", rows: 2 }
        ]
    },

    // =====================================================
    // SECTION 1 : RESTRUCTURATION COGNITIVE
    // =====================================================
    {
        id: 'tableau_pensees_toc', ref: 'RC-01',
        title: "Tableau d'enregistrement des pensées dysfonctionnelles",
        category: 'cognitif',
        type: 'daily_log',
        alwaysAvailable: true,
        defaultSessions: [3, 4, 5],
        description: "Grille classique à 6 colonnes pour cibler la « Responsabilité Démesurée » et la « Fusion Pensée-Action ». Outil d'auto-enregistrement quotidien.",
        columns: [
            { key: 'date', label: 'Date/Heure', inputType: 'date', width: '100px' },
            { key: 'situation', label: 'Situation déclenchante', inputType: 'text', placeholder: 'Ex: En croisant un sans-abri' },
            { key: 'emotion', label: 'Émotion & NAS (0-100%)', inputType: 'text', placeholder: 'Ex: Peur 90%' },
            { key: 'auto_thought', label: 'Pensée Automatique (L\'Obsession)', inputType: 'text', placeholder: 'Ex: Si j\'ai pensé à le pousser = Je suis un meurtrier' },
            { key: 'adapted_thought', label: 'Pensée Adaptée (Restructurée)', inputType: 'text', placeholder: 'Ex: Une pensée n\'est pas un acte. C\'est juste un événement mental.' },
            { key: 'new_emotion', label: 'Nouveau NAS %', inputType: 'number', width: '60px', min: 0, max: 100 }
        ]
    },

    // =====================================================
    // SECTION 2A : EXPOSITION EN IMAGINATION (DOSSIER A)
    // =====================================================
    {
        id: 'formulaire_scenario', ref: 'IMA-01',
        title: "Formulaire du Scénario (Pire Crainte)",
        category: 'exposition_a',
        type: 'structured_form',
        defaultSessions: [6, 7, 8],
        description: "Utilisé lorsque la peur ne peut pas être récréée en in-vivo (ex: peur de tuer quelqu'un ou d'être damné). Rédiger un scénario hautement anxiogène au présent.",
        fields: [
            { key: 'titre_scenario', label: "Titre du scénario redouté", placeholder: "Ex: L'accident mortel sur l'autoroute", rows: 1 },
            { key: 'peur_centrale', label: "La Peur Centrale (Le 'Désastre')", placeholder: "Ex: Être la cause directe de la mort d'une famille parce que je n'ai pas vérifié mes freins.", rows: 2 },
            { key: 'details_sensoriels', label: "Détails Sensoriels à inclure obligatoirement", placeholder: "Sons, odeurs, lumière, dialogues. Plus c'est vivant, plus c'est efficace.", rows: 3 },
            { key: 'script_recit', label: "Le Script (1 à 5 minutes au présent)", placeholder: "Je suis au volant sur l'A6. Il pleut. Soudain, je ressens qu'un pneu me lâche car je ne l'ai pas vérifié à 14h. La voiture dévie... (Continuez en décrivant le pire).", rows: 10 },
            { key: 'enregistrement_audio', label: "Rôle du patient (Prescription)", placeholder: "Mettre 'S'enregistrer sur son smartphone en lisant ce texte et l'écouter en boucle pendant 45 min chaque soir.'", rows: 2 }
        ]
    },
    {
        id: 'grille_nas_imagination_toc', ref: 'IMA-02',
        title: "Grille d'auto-observation (Exposition Imagination)",
        category: 'exposition_a',
        type: 'daily_log',
        alwaysAvailable: true,
        defaultSessions: [6, 7, 8, 9, 10],
        description: "Suivi du NAS (0-10) pendant l'écoute du scénario enregistré. Noter toutes les 5 minutes sur 60 minutes pour valider l'habituation émotionnelle.",
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '100px' },
            { key: 'min_0', label: '0 min', inputType: 'number', width: '50px', min: 0, max: 10 },
            { key: 'min_10', label: '10 m', inputType: 'number', width: '50px', min: 0, max: 10 },
            { key: 'min_20', label: '20 m', inputType: 'number', width: '50px', min: 0, max: 10 },
            { key: 'min_30', label: '30 m', inputType: 'number', width: '50px', min: 0, max: 10 },
            { key: 'min_40', label: '40 m', inputType: 'number', width: '50px', min: 0, max: 10 },
            { key: 'min_50', label: '50 m', inputType: 'number', width: '50px', min: 0, max: 10 },
            { key: 'min_60', label: '60 m', inputType: 'number', width: '50px', min: 0, max: 10 },
            { key: 'rituels_bloques', label: 'Rituels mentaux bloqués ?', inputType: 'text', placeholder: 'Oui/Non/Partiellement' }
        ]
    },

    // =====================================================
    // SECTION 2B : EXPOSITION IN-VIVO (DOSSIER B)
    // =====================================================
    {
        id: 'registre_obsessions', ref: 'EIV-01',
        title: "Registre des obsessions, rituels et évitements",
        category: 'exposition_b',
        type: 'daily_log',
        alwaysAvailable: true,
        defaultSessions: [8, 9, 10, 11, 12, 13, 14, 15, 16],
        description: "Tableau de suivi hebdomadaire rempli par le patient ou le psychologue : Fréquence et Intensité (0-100%). C'est le baromètre du traitement.",
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '110px' },
            { key: 'freq_obsessions', label: 'Fréq. Obsessions (/jour)', inputType: 'number', width: '80px', min: 0, max: 500 },
            { key: 'nas_obsessions', label: 'Détresse max (0-100)', inputType: 'number', width: '80px', min: 0, max: 100 },
            { key: 'freq_rituels_phys', label: 'Nb Rituels (Lavages, Rangs, etc)', inputType: 'number', width: '80px', min: 0, max: 500 },
            { key: 'freq_rituels_ment', label: 'Nb Rituels (Compter, Prier)', inputType: 'number', width: '80px', min: 0, max: 500 },
            { key: 'evitements', label: 'Situations Évitées', inputType: 'text', placeholder: 'Rivières, couteaux, poubelles...' }
        ]
    },
    {
        id: 'fiche_optex', ref: 'EIV-02',
        title: "Fiche d'Exposition Optimale (OptEx)",
        category: 'exposition_b',
        type: 'structured_form',
        defaultSessions: [9, 10, 11, 12, 13, 14, 15],
        description: "Planification d'une mission d'Exposition (EIVPR) visant à maximiser la brèche des attentes (Dissonance cognitive) du cerveau face au danger perçu.",
        fields: [
            { key: 'mission_title', label: "Situation cible (Mission)", placeholder: "Ex: Toucher l'urine d'un chien errant et toucher mon propre visage", rows: 1 },
            { key: 'nas_estime', label: "NAS estimé (0-10)", placeholder: "Rappel: Choisir un NAS entre 4 et 7 pour l'exposition optimale.", rows: 1 },
            { key: 'pire_scenario', label: "Attente (Que va-t-il se passer de terrible ?)", placeholder: "Ex: 'Je vais contracter une maladie foudroyante en moins de 48h'.", rows: 2 },
            { key: 'safety_behaviors', label: "Comportements de sécurité à BANNIR obligatoirement", placeholder: "Ex: S'essuyer discrètement sur son pantalon, prier mentalement, se relaver après 5 minutes.", rows: 3 },
            { key: 'triggers_maximise', label: "Déclencheurs à combiner (pour maximiser l'apprentissage)", placeholder: "Ex: Le faire spécifiquement quand je suis fatigué et à proximité d'un hôpital.", rows: 2 },
            { key: 'surprises', label: "Bilan post-EPR (Surprise/Violation de l'attente)", placeholder: "Qu'est-ce qui a contredit mon attente pendant cette EPR ? (Ex: Je ne suis pas mort après 48h et le dégoût a fini par passer seul).", rows: 3 }
        ]
    },
    {
        id: 'grille_epr_invivo', ref: 'EIV-03',
        title: "Grille d'auto-observation des situations problématiques",
        category: 'exposition_b',
        type: 'daily_log',
        alwaysAvailable: true,
        defaultSessions: [10, 11, 12, 13, 14, 15, 16],
        description: "Le traqueur post-exercice ultime. Réalisé après chaque EPR in-vivo pour attester de l'empêchement de la compulsion.",
        columns: [
            { key: 'date', label: 'Date/Heure', inputType: 'date', width: '100px' },
            { key: 'situation', label: 'Situation affrontée', inputType: 'text', placeholder: 'Ex: Tenir un couteau devant mon fils' },
            { key: 'duree_min', label: 'Durée expo. (Minutes)', inputType: 'number', width: '70px', min: 1, max: 999 },
            { key: 'nas_avant', label: 'NAS Avant (0-100)', inputType: 'number', width: '60px', min: 0, max: 100 },
            { key: 'nas_pic', label: 'NAS Pic (0-100)', inputType: 'number', width: '60px', min: 0, max: 100 },
            { key: 'nas_apres', label: 'NAS Après (0-100)', inputType: 'number', width: '60px', min: 0, max: 100 },
            { key: 'rituel_failed', label: 'Rituels/Compulsions empêchés ?', inputType: 'text', placeholder: 'OUI (Réussi) / NON (Echec)' }
        ]
    },

    // =====================================================
    // SECTION 3 : CONSOLIDATION ET MAINTIEN
    // =====================================================
    {
        id: 'bilan_therapie_toc', ref: 'MN-01',
        title: "Bilan de fin de thérapie TOC",
        category: 'maintien',
        type: 'structured_form',
        defaultSessions: [17, 18, 19, 20],
        description: "Synthétiser l'ensemble du parcours héroïque du patient et ancrer la fierté d'avoir brisé les rituels.",
        fields: [
            { key: 'scores_evolution', label: "Évolution Y-BOCS (Score de base vs Fin)", placeholder: "Ex: Y-BOCS Initial 32 (Sévère) --> Y-BOCS Final 11 (Léger/Infra-clinique). BDI: 18 -> 4", rows: 1 },
            { key: 'rituels_vaincus', label: "Rituels détruits ou récupérés", placeholder: "Listez les victoires écrasantes (ex: prend une douche en 5 min au lieu d'1h).", rows: 3 },
            { key: 'outil_clef', label: "L'outil / La phrase qui a cliqué", placeholder: "Quelle métaphore ou mécanisme EPR a le plus aidé ce patient à tolérer l'incertitude ?", rows: 3 }
        ]
    },
    {
        id: 'prevention_rechutes_toc', ref: 'MN-02',
        title: "Plan de prévention des rechutes (TOC)",
        category: 'maintien',
        type: 'structured_form',
        alwaysAvailable: true,
        defaultSessions: [18, 19, 20],
        description: "Préparer le cerveau du patient aux potentiels 'faux-pas' et identifier les symptômes invisibles (rituels mutants).",
        fields: [
            { key: 'faux_pas', label: "Comprendre qu'un Faux-pas ≠ Rechute", placeholder: "Expliquer que céder 1 fois à l'obsession en période de grand stress est normal. Il faut juste recommencer l'EPR le lendemain matin.", rows: 2 },
            { key: 'signes_precoces', label: "Signes précurseurs (Alertes Rouges)", placeholder: "Quels sont les premiers indices que le TOC tente de revenir ? (ex: Je recompte mes mails avant envoi, je ressens plus de fatigue...).", rows: 3 },
            { key: 'rituels_mutants', label: "Méfiance : Les Nouveaux Rituels ('Rituels mutés')", placeholder: "Le cerveau peut chercher à créer de NOUVEAUX rituels, plus subtils (des rituels de vérification purement mentaux). Listez-les.", rows: 3 },
            { key: 'actions_ugence', label: "Action immédiate en cas de retour des TOC", placeholder: "1. Stoppez l'évitement immédiatement.\n2. Exposez-vous au déclencheur en créant une Fiche OptEx.\n3. Ne PAS faire le rituel.", rows: 4 },
            { key: 'contacts', label: "Numéros d'urgence / Psychologue", placeholder: "Ory+ Clinique : ...", rows: 1 }
        ]
    },

    // =====================================================
    // GUIDES CLINICO-PÉDAGOGIQUES (PSYCHOÉDUCATION)
    // =====================================================
    {
        id: 'guide_toc_modele',
        ref: 'GUI-T01',
        title: "Psychoéducation : Le Modèle Cognitivo-Comportemental du TOC",
        category: 'toc_guide',
        type: 'info',
        defaultSessions: [1, 2, 3],
        description: "Cœur de la phase 1. Explique pourquoi les rituels maintiennent et aggravent l'anxiété.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-brain me-2 text-primary"></i>Le Cercle Vicieux du TOC (CBT Model)</h5>
            <p><strong>Note Clinique :</strong> Cet écran est conçu pour que le psychologue l'affiche ou le lise avec le patient pour briser la honte associée aux idées obsédantes.</p>
            
            <h6>1. La Pensée Intrusive (L'Étincelle)</h6>
            <p>Tout être humain à la surface de la Terre a, au moins une fois, eu une pensée bizarre, violente, sale ou farfelue (ex: "Et si je sautais de ce pont ?", "Et si je crachais dans la soupe ?"). <strong>Le problème du TOC, ce n'est pas d'avoir la pensée, c'est ce que l'on en fait.</strong></p>

            <h6>2. L'Évaluation Catastrophique (Le Carburant)</h6>
            <p>Chez la personne souffrant de TOC, cette pensée normale est interprétée comme <strong>VRAIE, IMMINENTE, ET DANGEREUSE.</strong> Le patient se dit : "Si je pense ça, ça veut dire que je suis capable de le faire ! C'est horrible, je dois l'empêcher !".</p>
            
            <h6>3. Le Rituel ou Compulsion (Le Piège)</h6>
            <p>Pour faire baisser l'anxiété insupportable générée par cette pensée, le patient va agir : vérifier 10 fois que la porte est fermée, se laver les mains jusqu'au sang, ou prier 100 fois dans sa tête. 
            <br><strong>Résultat : L'anxiété baisse temporairement.</strong></p>

            <div class="alert alert-danger mt-3" style="font-size:0.85rem;">
                <i class="fas fa-exclamation-triangle me-1"></i> <strong>LE PIÈGE ABSOLU :</strong> Parce que le rituel fait baisser l'anxiété, le cerveau <b>apprend</b> que le rituel l'a sauvé d'une mort certaine. La prochaine fois, l'obsession reviendra ENCORE PLUS FORTE. Le rituel nourrit la maladie. Pour guérir, il faut couper les rituels.
            </div>
        </div>`
    },
    {
        id: 'guide_toc_cognitif',
        ref: 'GUI-T02',
        title: "Restructuration : Responsabilité et Fusion",
        category: 'toc_guide',
        type: 'info',
        defaultSessions: [3, 4, 5],
        description: "Focus sur les deux distorsions cognitives majeures du TOC.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-hammer me-2 text-info"></i>Construire la Métacognition</h5>

            <div class="card mb-3 border-info">
                <div class="card-body">
                    <h6 class="text-info"><i class="fas fa-bolt me-2"></i>La Fusion Pensée-Action</h6>
                    <p>Le patient souffrant de TOC agit souvent comme si PENSER à quelque chose équivalait à le FAIRE. "Si je pense à insulter mon chef, c'est comme si je l'avais déjà fait, je suis coupable."</p>
                    <p><strong>Intervention :</strong> Entraînez le patient à différencier "événement privé interne" (la pensée) et "comportement moteur externe" (l'acte). Les pensées n'ont aucun pouvoir magique.</p>
                </div>
            </div>

            <div class="card mb-3 border-warning">
                <div class="card-body">
                    <h6 class="text-warning"><i class="fas fa-weight-hanging me-2"></i>La Responsabilité Démesurée</h6>
                    <p>C'est l'essence du TOC de "Vérification". Le patient croit fermement que non seulement un désastre est possible (ex: incendie, accident, contamination virale), mais que s'il se produit, <strong>ce sera 100% DE SA FAUTE</strong> pour ne pas l'avoir anticipé (Erreur d'omission).</p>
                    <p><strong>Intervention :</strong> Utiliser le Tableau des pensées dysfonctionnelles et explorer un "camembert/tarte des responsabilités" pour évaluer objectivement la vraie chance qu'il soit blâmé pour un événement hors de son contrôle.</p>
                </div>
            </div>
        </div>`
    },
    {
        id: 'guide_toc_epr',
        ref: 'GUI-T03',
        title: "Guide d'Exposition avec Prévention Réponse (EPR)",
        category: 'toc_guide',
        type: 'info',
        defaultSessions: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        description: "Règles strictes de l'engine de la guérison des TOC : L'Exposition avec Prévention de la Réponse.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-fire me-2 text-danger"></i>Exposition avec Prévention de Réponse (EPR)</h5>
            <p>Le patient s'expose volontairement à ce qui déclenche l'obsession <strong>ET bloque strictement</strong> 100% de ses rituels. C'est inconfortable, anxiogène, mais c'est le SEUL MOYEN pour le système nerveux de réaliser par <em>habituation</em> que l'obsession était un mensonge.</p>

            <h6>Option A : Exposition In-Vivo (Dossier B)</h6>
            <ul>
                <li><strong>Exemples :</strong> Toucher les poignées de porte, rouler sans vérifier le rétroviseur pour voir si on a renversé quelqu'un, laisser des couteaux en évidence.</li>
                <li><strong>La Règle d'or :</strong> 0 neutralisation. Si le patient touche les toilettes, mais qu'il chante une chanson dans sa tête pour "conjurer le sort" (rituel mental), l'exposition est un ÉCHEC.</li>
                <li>On s'expose jusqu'à ce que l'anxiété (NAS) diminue d'elle-même (Habituation par extinction).</li>
            </ul>

            <h6>Option B : Exposition en Imagination (Dossier A)</h6>
            <ul>
                <li><strong>Exemples :</strong> S'exposer mentalement au fait d'aller en enfer, de s'infecter au VIH, ou d'abuser de son enfant involontairement.</li>
                <li>Le patient lit en boucle un scénario enregistré extrêmement violent relatant sa pire peur, sans aucune censure ni rassurance. Il écoute cet audio de 3 à 5 minutes en boucle pendant 60 minutes.</li>
            </ul>
            
            <p><strong>Indication vitale :</strong> Le psychologue ne doit <strong>JAMAIS</strong> rassurer le patient ("Je te promets que tes mains sont propres", "Ne t'en fais pas, tu n'as renversé personne"). Rassurer un TOC, c'est accomplir le rituel à sa place. Le mot d'ordre est l'acceptation de l'Incertitude ("Peut-être bien que tes mains sont sales, l'avenir nous le dira").</p>
        </div>`
    },
    {
        id: 'guide_toc_maintien',
        ref: 'GUI-T04',
        title: "Guide de Consolidation : Devenir son propre thérapeute",
        category: 'toc_guide',
        type: 'info',
        defaultSessions: [17, 18, 19, 20],
        description: "Outil de clôture : préparer le patient à affronter seul le reste de sa vie sans les rituels.",
        content: `
        <div class="exercise-info-content">
            <h5><i class="fas fa-shield-heart me-2 text-success"></i>Consolidation : Vivre dans l'Incertitude</h5>
            <p>Félicitations au patient. Il a toléré des mois de détresse sans céder à ses compulsions. Son amygdale a été reprogrammée.</p>

            <h6>L'objectif suprême du traitement :</h6>
            <p>Le but n'était pas de ne plus jamais avoir d'idéation ou de craintes (c'est impossible d'arrêter le cerveau humain de lancer des pensées bizarres). Le but était de changer <strong>sa relation</strong> avec ces pensées.</p>

            <h6>Désormais, le patient comprend que :</h6>
            <ol>
                <li>Il faut accepter 100% de tolérance à l'incertitude. Et s'il y avait un germe mortel invisible ici ? "Et bien tant pis, je ne le vérifierai pas."</li>
                <li>L'observance doit continuer 1 mois ou 1 an après la thérapie : si la lueur d'une ancienne obsession apparaît, le patient sait qu'il doit <strong>s'exposer volontairement</strong> à l'élément redouté pour éviter que le TOC reprenne racine.</li>
            </ol>
        </div>`
    }
];

function getExerciseById(id) {
    let ex = EXERCISES.find(e => e.id === id);
    if (ex) return ex;
    return null;
}

const PROTOCOL_TOOL_MAP = {
    // Évaluation
    "Index_Symptomes_TOC": ['index_symptomes_toc'],
    "Analyse_Fonctionnelle_TOC": ['analyse_fonctionnelle_toc'],
    "Guide_TOC_Modele": ['guide_toc_modele'],
    // Restructuration
    "Tableau_Pensees_Dysfonctionnelles": ['tableau_pensees_toc'],
    "Guide_TOC_Cognitif": ['guide_toc_cognitif'],
    // Expo Imagination
    "Formulaire_Scenario": ['formulaire_scenario'],
    "Grille_NAS_Imagination": ['grille_nas_imagination_toc'],
    "Guide_TOC_EPR": ['guide_toc_epr'],
    // Expo In Vivo
    "Registre_Obsessions": ['registre_obsessions'],
    "Fiche_OptEx": ['fiche_optex'],
    "Grille_EPR_InVivo": ['grille_epr_invivo'],
    // Consolidation
    "Bilan_Therapie_TOC": ['bilan_therapie_toc'],
    "Prevention_Rechutes_TOC": ['prevention_rechutes_toc'],
    "Guide_TOC_Maintien": ['guide_toc_maintien']
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
    
    // Add dynamically added exercises and always-available tools only for non-guide sessions
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
