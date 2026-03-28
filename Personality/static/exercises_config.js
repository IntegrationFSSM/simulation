/**
 * Ory+ TCC Simulator — Exercise Registry
 * Module TPL (Thérapie Comportementale Dialectique - TCD)
 */

let EXERCISE_CATEGORIES = [
    { id: 'tcd_base', label: 'Outils Transversaux TCD', icon: 'fa-layer-group', color: '#7c3aed' },
    { id: 'pleine_conscience', label: 'Pleine Conscience', icon: 'fa-spa', color: '#0d9488' },
    { id: 'gestion_crise', label: 'Tolérance à la Détresse', icon: 'fa-shield-alt', color: '#e11d48' },
    { id: 'schema_therapy', label: 'Thérapie des Schémas', icon: 'fa-project-diagram', color: '#8b5cf6' }
];
window.ALL_CATEGORIES = [...EXERCISE_CATEGORIES];

let EXERCISES = [
    {
        id: 'diary_card_dbt', ref: 'TCD-01',
        title: 'Fiche d\'auto-observation quotidienne (Diary Card)',
        category: 'tcd_base',
        type: 'daily_log',
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
    // MODULE TPL INDIVIDUEL - GUIDES THERAPEUTIQUES
    // ==========================================
    {
        id: 'tcd_guide_contrat', ref: 'TCD-G01',
        title: 'Évaluation et Contrat d\'Engagement',
        category: 'tcd_base', type: 'info',
        description: 'Ce guide oriente le thérapeute sur l\'évaluation initiale du patient et la clarification de ses attentes. Il détaille les éléments du contrat thérapeutique, incluant l\'engagement formel d\'un an, la règle stricte de fin unilatérale de la thérapie après 4 absences consécutives, et l\'engagement du patient à réduire ses comportements suicidaires et auto-dommageables.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-file-signature me-2" style="color:#7c3aed"></i>Évaluation et Contrat d'Engagement</h5>
    <p>Cette période est essentielle pour permettre au patient et au thérapeute de décider s'ils peuvent travailler ensemble. Le thérapeute procède à une évaluation complète et tente de nuancer certaines attentes ou croyances du patient qui pourraient influencer négativement la thérapie.</p>
    <h6>Les engagements formels :</h6>
    <ul>
        <li><strong>Durée :</strong> Un engagement explicite à travailler ensemble pour un an, renouvelable vers le 8e mois de la thérapie.</li>
        <li><strong>La règle des absences :</strong> Dans le modèle classique, le patient ne peut manquer plus de 4 séances en ligne de thérapie (groupe et individuel combiné) sous peine de fin unilatérale de la thérapie.</li>
        <li><strong>Cibles comportementales :</strong> Le patient s'engage à travailler à éliminer les comportements auto-destructeurs (suicidaires et auto-dommageables). S'il refuse, la TCD n'est probablement pas appropriée.</li>
        <li><strong>Facteurs interférants :</strong> Le patient et le thérapeute s'engagent à travailler sur les comportements qui interfèrent avec la thérapie.</li>
    </ul>
</div>
        `
    },
    {
        id: 'tcd_guide_postulats', ref: 'TCD-G02',
        title: 'Les Grands Postulats de la TCD',
        category: 'tcd_base', type: 'info',
        description: 'Un rappel philosophique essentiel pour le thérapeute, incluant des principes fondamentaux tels que : le patient fait de son mieux, il veut s\'améliorer, mais sa vie actuelle est intolérable telle qu\'elle est vécue. Il rappelle également que le patient ne peut pas échouer en thérapie ; si échec il y a, le blâme repose sur la thérapie elle-même.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-balance-scale me-2" style="color:#7c3aed"></i>Les Grands Postulats de la TCD</h5>
    <p>Voici la philosophie fondamentale (les postulats) que le thérapeute doit garder à l'esprit en tout temps :</p>
    <ul>
        <li>Le patient fait de son mieux.</li>
        <li>Le patient veut s'améliorer.</li>
        <li>Le patient doit faire mieux et être plus motivé au changement.</li>
        <li>Le patient n'est peut-être pas responsable de tous ses problèmes, mais il doit quand même les résoudre.</li>
        <li>La vie des patients avec TPL est intolérable telle qu'elle est présentement vécue.</li>
        <li>Le patient doit apprendre de nouveaux comportements appropriés aux situations.</li>
        <li>Le patient ne peut pas échouer en thérapie (le blâme repose sur la thérapie).</li>
        <li>Les thérapeutes traitant des patients limites ont besoin de soutien.</li>
    </ul>
</div>
        `
    },
    {
        id: 'tcd_guide_hierarchie', ref: 'TCD-G03',
        title: 'La Hiérarchie des Cibles de Traitement',
        category: 'tcd_base', type: 'info',
        description: 'Ce guide rappelle au clinicien l\'ordre strict des priorités à aborder en séance individuelle : 1) Les comportements suicidaires ou menaçant l\'intégrité physique. 2) Les comportements interférant avec la thérapie (ex: retards, manque de collaboration). 3) Les comportements interférant avec la qualité de vie (ex: abus de substances, criminalité, instabilité au logement).',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-sort-numeric-down me-2" style="color:#7c3aed"></i>La Hiérarchie des Cibles de Traitement</h5>
    <p>La TCD est stricte quant aux priorités de traitement en thérapie individuelle. L'ordre suivant doit être respecté :</p>
    <ol>
        <li><strong>Comportements suicidaires :</strong> Cible de première ligne (1er focus). Comprend les menaces suicidaires, la planification, les gestes auto-dommageables, les idées inattendues et les croyances concernant la valeur du suicide.</li>
        <li><strong>Comportements interférant avec la thérapie :</strong> Cible de deuxième ligne (2e focus). Inattention, absence de collaboration, remarques hostiles, ou comportements du thérapeute (ex: trop orienté vers le changement, épuisement).</li>
        <li><strong>Comportements interférant avec la qualité de vie :</strong> Cible de troisième ligne (3e focus). Abus de substances, instabilité à l'emploi, comportements criminels, instabilité du logement, refus de prendre soin de sa santé, relations abusives.</li>
        <li><strong>Compétences comportementales :</strong> Remplacer graduellement les réponses dysfonctionnelles par l'apprentissage et le maintien de nouvelles compétences.</li>
    </ol>
</div>
        `
    },
    {
        id: 'tcd_guide_strategies', ref: 'TCD-G04',
        title: 'Stratégies Cardinales (Validation et RP)',
        category: 'tcd_base', type: 'info',
        description: 'Instructions sur l\'équilibre dialectique fondamental : valider l\'expérience du patient (communiquer que ses pensées et émotions ont un sens et sont compréhensibles) tout en appliquant des stratégies de résolution de problèmes pour encourager le changement.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-hands-helping me-2" style="color:#7c3aed"></i>Stratégies Cardinales</h5>
    <p>Au cœur de la TCD se retrouvent les stratégies de résolution de problèmes en équilibre avec les stratégies de validation.</p>
    <ul>
        <li><strong>La Validation :</strong> Comprend la validation de l'expérience (réponses cognitives, comportementales et émotives) et la validation de la capacité de l'individu à bâtir une vie satisfaisante. Il s'agit de communiquer au patient que ses pensées, ses émotions et comportements ont un sens, sont explicables et compréhensibles.</li>
        <li><strong>La Résolution de problèmes :</strong> Favorise le changement via l'analyse en chaîne du comportement (évaluation contextuelle), l'analyse de solution (générer des comportements alternatifs), et l'engagement du patient à appliquer le traitement.</li>
    </ul>
</div>
        `
    },
    {
        id: 'tcd_guide_communication', ref: 'TCD-G05',
        title: 'Les Styles de Communication',
        category: 'tcd_base', type: 'info',
        description: 'Guide sur l\'utilisation de la communication irrévérencieuse (pour déstabiliser le patient en situation d\'impasse et attirer son attention) balancée avec la communication réciproque (engagement chaleureux et dévoilement de soi pour équilibrer la relation de pouvoir).',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-comments me-2" style="color:#7c3aed"></i>Les Styles de Communication</h5>
    <p>La TCD combine deux types de styles de communication interpersonnelle, qui doivent être en équilibre :</p>
    <ul>
        <li><strong>La communication irrévérencieuse :</strong> Utilisée en situation d'impasse pour attirer l'attention du patient, l'aider à voir la situation de façon différente et le déstabiliser pour favoriser une rééquilibration. (Ex: Thérapeute : "Mais vous vous êtes engagée à rester en traitement pendant un an !").</li>
        <li><strong>La communication réciproque :</strong> Un engagement chaleureux du thérapeute, impliquant sa disponibilité et le dévoilement de soi, visant à équilibrer la relation de pouvoir. (Ex: Thérapeute : "J'ai l'impression que vous ne prenez pas le temps de considérer mes suggestions, c'est pas très motivant !").</li>
    </ul>
</div>
        `
    },
    {
        id: 'tcd_guide_pieges', ref: 'TCD-G06',
        title: 'Pièges Thérapeutiques et Comportements Iatrogènes',
        category: 'tcd_base', type: 'info',
        description: 'Un outil de prévention pour le thérapeute l\'aidant à identifier ses propres réactions problématiques face à une clientèle stressante. Il répertorie les signes d\'épuisement, de cynisme, de panique/urgence, ainsi que le contre-transfert positif ou négatif.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-exclamation-triangle me-2" style="color:#7c3aed"></i>Les Pièges Thérapeutiques (Iatrogènes)</h5>
    <p>Le thérapeute œuvrant seul peut facilement tomber dans une polarisation ou un épuisement. Restez vigilant face à ces pièges :</p>
    <ul>
        <li><strong>L'épuisement :</strong> "Je n'en peux plus, j'ai besoin de vacances... mais mes patients ont besoin de moi".</li>
        <li><strong>Le cynisme ou désespoir :</strong> "À quoi bon modifier ce traitement, mon patient ne s'améliorera jamais".</li>
        <li><strong>Le contre-transfert négatif :</strong> "Oh, non, pas encore ce patient! Il fait exprès pour rendre les gens autour de lui misérables".</li>
        <li><strong>Le contre-transfert positif :</strong> "Mon patient ne fait jamais d'erreur, ce sont les gens autour qui ne comprennent rien".</li>
        <li><strong>La panique ou l'urgence :</strong> "Mon patient est à l'urgence, je dois immédiatement changer son traitement !".</li>
    </ul>
</div>
        `
    },
    {
        id: 'tcd_guide_trauma', ref: 'TCD-G07',
        title: 'Protocole d\'Exposition aux Traumatismes',
        category: 'tcd_base', type: 'info',
        description: 'Ce guide rappelle que cette phase ne doit être abordée qu\'une fois la stabilité de la Phase 1 atteinte (habituellement après 1 ou 2 ans). Les objectifs cliniques sont d\'aider le patient à reconnaître l\'expérience traumatique, diminuer son sentiment de blâme ou de stigmatisation, et réduire ses réponses émotionnelles extrêmes face aux indices rappelant le trauma.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-door-open me-2" style="color:#7c3aed"></i>Exposition aux Traumatismes du Passé</h5>
    <p>Cette phase n'est abordée que lorsque la phase 1 est complétée (habituellement après 1 ou 2 ans) et vise à réduire la détresse associée aux expériences traumatiques du passé.</p>
    <h6>Les 4 objectifs cliniques graduels :</h6>
    <ol>
        <li>Reconnaître et accepter l'expérience traumatique.</li>
        <li>Tenter de diminuer le blâme que pourrait s'attribuer le patient, les tendances à l'auto-invalidation ou dévalorisation ainsi que le sentiment de stigmatisation.</li>
        <li>Réduire les réponses émotionnelles extrêmes provoquées par l'exposition aux indices (internes ou externes) rappelant le traumatisme.</li>
        <li>Réconcilier ou synthétiser les représentations contradictoires ou opposées du traumatisme.</li>
    </ol>
</div>
        `
    },
    {
        id: 'tcd_guide_respect', ref: 'TCD-G08',
        title: 'Consolidation et Atteinte des Objectifs',
        category: 'tcd_base', type: 'info',
        description: 'Un guide pour aider le psychologue à faire la synthèse des apprentissages réalisés par le patient tout au long de la thérapie. Il met l\'accent sur le renforcement du sentiment de fierté, le respect de soi et le soutien actif dans l\'atteinte des objectifs de vie personnels du patient.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-seedling me-2" style="color:#7c3aed"></i>Synthèse et Respect de soi</h5>
    <p>Dans cette phase avancée, les cibles comportementales dangereuses sont sous contrôle. Le travail consiste désormais à consolider une vie fonctionnelle.</p>
    <ul>
        <li>Faire la synthèse des apprentissages faits au courant de la thérapie.</li>
        <li>Travailler à favoriser un sentiment de fierté et de respect de soi chez le patient.</li>
        <li>Soutenir le patient dans l'atteinte de ses objectifs de vie.</li>
    </ul>
</div>
        `
    },
    {
        id: 'tcd_guide_joie', ref: 'TCD-G09',
        title: 'Intégration et Maintien du Bien-être',
        category: 'tcd_base', type: 'info',
        description: 'Ce guide final vise à travailler la capacité du patient à maintenir un sentiment de joie sur une plus longue période. Il instruit le thérapeute sur la façon d\'aider le patient à faire la synthèse du passé, du présent et du futur, à intégrer les représentations contradictoires de lui-même et d\'autrui, et à accepter la réalité de façon durable.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-sun me-2" style="color:#7c3aed"></i>Capacité à la Joie</h5>
    <p>Malgré la réussite des étapes précédentes, certains patients éprouvent encore beaucoup de difficultés à maintenir un sentiment de joie ou de bien-être durant une période plus longue.</p>
    <p>Cette capacité sera travaillée lors de la phase finale et sollicitera particulièrement l'esprit dialectique du patient :</p>
    <ul>
        <li>Faire la synthèse du passé, du moment présent et du futur.</li>
        <li>Intégrer les représentations parfois contradictoires qu'a le patient de lui-même et d'autrui.</li>
        <li>Accepter la réalité.</li>
    </ul>
</div>
        `
    },
    // ==========================================
    // MODULE GROUPE TCD - 20 NOUVELLES FICHES
    // ==========================================
    {
        id: 'Guide_Module_1', ref: 'GRP-M1',
        title: 'Guide d\'animation : Pleine Conscience',
        category: 'tcd_base', type: 'info',
        description: 'Ce module introduit les fondements de la TCD et les compétences d\'attention au moment présent.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-spa me-2" style="color:#0d9488"></i>Guide d'animation : Module 1 (Pleine Conscience)</h5>
    <p>Ce module introduit les fondements de la TCD et les compétences d'attention au moment présent.</p>
    <h6>Concepts théoriques à enseigner :</h6>
    <ul>
        <li><strong>Le modèle biosocial du TPL :</strong> Expliquer que le TPL résulte de l'interaction entre une vulnérabilité émotionnelle biologique (réactivité intense, retour lent au calme) et un environnement invalidant. Utiliser la métaphore de la fleur (l'orchidée).</li>
        <li><strong>Les 3 états de l'esprit :</strong> Enseigner la différence entre l'Esprit Rationnel (logique, sans émotion), l'Esprit Émotionnel (humeur en contrôle), et l'Esprit Sage (l'intégration des deux, la sagesse intérieure).</li>
        <li><strong>Les habiletés du « Quoi » :</strong> Apprendre aux patients à Observer (porter attention sans mots), Décrire (mettre des mots sur les faits), et Participer (s'immerger complètement).</li>
        <li><strong>Les habiletés du « Comment » :</strong> Pratiquer ces compétences Sans jugement, Une chose à la fois (focus), et Efficacement (faire ce qui fonctionne).</li>
    </ul>
</div>
        `
    },
    {
        id: 'Guide_Module_2', ref: 'GRP-M2',
        title: 'Guide d\'animation : Régulation des Émotions',
        category: 'tcd_base', type: 'info',
        description: 'L\'objectif de ce module n\'est pas de supprimer les émotions, mais d\'exercer un contrôle sur les comportements impulsifs qui y sont liés et d\'en moduler l\'intensité.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-water me-2" style="color:#0d9488"></i>Guide d'animation : Module 2 (Régulation des Émotions)</h5>
    <p>L'objectif de ce module n'est pas de supprimer les émotions, mais d'exercer un contrôle sur les comportements impulsifs qui y sont liés et d'en moduler l'intensité.</p>
    <h6>Les 4 étapes d'apprentissage :</h6>
    <ol>
        <li><strong>Comprendre le vécu émotionnel :</strong> Apprendre à décortiquer une émotion (déclencheur, interprétation, changements physiologiques, urgence d'agir).</li>
        <li><strong>Diminuer la fréquence :</strong> Enseigner la compétence « Vérifier les faits » (l'émotion correspond-elle à la réalité ?) et l'« Action contraire » (agir à l'opposé de la pulsion si l'émotion n'est pas justifiée).</li>
        <li><strong>Diminuer la vulnérabilité :</strong> Enseigner le protocole PLEASE (traiter les maladies, alimentation, substances, sommeil, exercice) et encourager l'accumulation d'émotions positives (à court et long terme).</li>
        <li><strong>Diminuer l'intensité :</strong> Pratiquer l'exposition aux émotions douloureuses sans les agir ("surfer sur la vague").</li>
    </ol>
</div>
        `
    },
    {
        id: 'Guide_Module_3', ref: 'GRP-M3',
        title: 'Guide d\'animation : Tolérance à la Détresse',
        category: 'tcd_base', type: 'info',
        description: 'Ce module enseigne comment soutenir un état émotionnel douloureux et survivre à une crise sans l\'exacerber.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-shield-alt me-2" style="color:#0d9488"></i>Guide d'animation : Module 3 (Tolérance à la Détresse)</h5>
    <p>Ce module enseigne comment soutenir un état émotionnel douloureux et survivre à une crise sans l'exacerber (sans avoir recours à des gestes auto-dommageables).</p>
    <h6>Compétences de crise à enseigner :</h6>
    <ul>
        <li><strong>L'Acronyme STOP :</strong> Statue, Temps de recul, Observez, Poursuivez en pleine conscience.</li>
        <li><strong>Changer la physiologie (TIP) :</strong> Utiliser la Température (eau glacée sur le visage), l'Intense exercice, et la respiration/relaxation Progressive pour calmer l'Esprit Émotionnel.</li>
        <li><strong>La distraction (ACCEPTE) :</strong> S'éloigner temporairement via des Activités, Contributions, Comparaisons, Émotions opposées, Pousser (se), Tête (pensées), ou Écouter ses sens.</li>
        <li><strong>L'Acceptation Radicale :</strong> Pratiquer l'acceptation de la réalité telle qu'elle est (avec le demi-sourire et l'ouverture de l'esprit) pour ne pas transformer la douleur inévitable en souffrance.</li>
    </ul>
</div>
        `
    },
    {
        id: 'Guide_Module_4', ref: 'GRP-M4',
        title: 'Guide d\'animation : Efficacité Interpersonnelle',
        category: 'tcd_base', type: 'info',
        description: 'Ce module aide les patients à s\'affirmer, à demander ce qu\'ils veulent ou à dire non tout en préservant leurs relations.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-users me-2" style="color:#0d9488"></i>Guide d'animation : Module 4 (Efficacité Interpersonnelle)</h5>
    <p>Ce module aide les patients à s'affirmer, à demander ce qu'ils veulent ou à dire non, tout en préservant leurs relations et leur respect d'eux-mêmes.</p>
    <h6>Les stratégies relationnelles :</h6>
    <ul>
        <li><strong>Obtenir ce que l'on veut (DEAR MAN) :</strong> Décrire, Exprimer, Affirmer, Récompenser, Mindful (concentré), Avoir l'air confiant, Négocier.</li>
        <li><strong>Maintenir la relation (GIVE) :</strong> Être Gentil, s'Intéresser, Valider, Essayer d'être calme.</li>
        <li><strong>Préserver le respect de soi (FAST) :</strong> Être Franc, Arrêter les excuses, Soyez juste, Tenir à ses valeurs.</li>
        <li><strong>Principes comportementaux :</strong> Comprendre comment utiliser le renforcement, la punition et l'extinction dans les relations quotidiennes.</li>
    </ul>
</div>
        `
    },
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
    },
    // ==========================================
    // THÉRAPIE DES SCHÉMAS — OUTILS
    // ==========================================
    {
        id: 'Schema_Guide_Indiv_1', ref: 'SCH-IND-1',
        title: 'Guide : Phase 1 (Évaluation)',
        category: 'schema_therapy', type: 'info',
        description: 'Guide clinique pour la Phase 1 : Évaluation et Éducation.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-search me-2" style="color:#8b5cf6"></i>Phase 1 : Évaluation et Éducation</h5>
    <p>Cette phase initiale vise à comprendre l'histoire du patient et à cartographier sa personnalité.</p>
    <h6>Objectifs et actions du thérapeute :</h6>
    <ul>
        <li><strong>Évaluation psychométrique :</strong> Faire passer et analyser les questionnaires (YSQ pour les schémas, YPI pour l'origine parentale, BDI/BAI pour l'humeur).</li>
        <li><strong>Psychoéducation :</strong> Remettre le « Guide du patient » et expliquer le modèle des schémas, des styles d'adaptation (fuite, soumission, contre-attaque) et des modes.</li>
        <li><strong>Conceptualisation de cas (Séance 5) :</strong> Présenter au patient sa "carte" des schémas. Expliquer comment ses schémas se sont formés dans l'enfance et comment ils s'activent aujourd'hui. </li>
    </ul>
</div>
        `
    },
    {
        id: 'Schema_Guide_Indiv_2', ref: 'SCH-IND-2',
        title: 'Guide : Phase 2 (Active)',
        category: 'schema_therapy', type: 'info',
        description: 'Guide clinique pour la Phase 2 : Phase Active de Traitement.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-tools me-2" style="color:#8b5cf6"></i>Phase 2 : Phase Active de Traitement</h5>
    <p>C'est le cœur de la thérapie, fonctionnant en boucle ouverte jusqu'à l'assouplissement des schémas.</p>
    <h6>Arsenal thérapeutique à utiliser :</h6>
    <ul>
        <li><strong>Restructuration cognitive :</strong> Aider le patient à remettre en question la validité de ses schémas (ex: utiliser le Test Historique pour trouver des preuves contre le schéma).</li>
        <li><strong>Techniques expérientielles :</strong> Utiliser l'imagerie mentale (re-materner l'enfant vulnérable) et les dialogues entre chaises pour combattre le Parent Punitif ou Exigeant. </li>
        <li><strong>Modification comportementale :</strong> Briser les patterns en planifiant de nouveaux comportements sains (Mode Adulte Sain) et rédiger des Fiches d'aide thérapeutiques (Flashcards) pour la gestion des crises.</li>
        <li><strong>Suivi continu :</strong> Analyser hebdomadairement le Tableau d'enregistrement des schémas rempli par le patient.</li>
    </ul>
</div>
        `
    },
    {
        id: 'Schema_Guide_Indiv_3', ref: 'SCH-IND-3',
        title: 'Guide : Phase 3 (Terminaison)',
        category: 'schema_therapy', type: 'info',
        description: 'Guide clinique pour la Phase 3 : Terminaison.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-flag-checkered me-2" style="color:#8b5cf6"></i>Phase 3 : Terminaison</h5>
    <p>Cette phase clôture le travail thérapeutique en favorisant l'autonomie et en gérant l'anxiété de séparation.</p>
    <h6>Objectifs de fin de thérapie :</h6>
    <ul>
        <li><strong>Espacement des séances :</strong> Réduire progressivement la fréquence des rencontres (ex: aux deux semaines, puis au mois) pour consolider l'autonomie du patient.</li>
        <li><strong>Prévention de la rechute :</strong> Anticiper les situations futures à haut risque d'activation des schémas et planifier les réponses de l'Adulte Sain.</li>
        <li><strong>Objectivation des progrès :</strong> Repasser les échelles cliniques (YSQ, BDI, BAI) pour démontrer concrètement au patient la réduction de l'intensité de ses schémas et de ses symptômes depuis le début du suivi.</li>
    </ul>
</div>
        `
    },
    {
        id: 'Schema_Guide_Group_1', ref: 'SCH-GRP-1',
        title: 'Guide Groupe : Sécurité et Connexion',
        category: 'schema_therapy', type: 'info',
        description: 'Guide clinique pour le Groupe Phase 1 : Sécurité et Connexion.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-users-cog me-2" style="color:#8b5cf6"></i>Groupe - Phase 1 : Sécurité et Connexion</h5>
    <p>L'objectif initial est de créer un attachement sécurisant entre les membres pour que le groupe devienne une figure parentale saine.</p>
    <h6>Stratégies d'animation :</h6>
    <ul>
        <li><strong>Cadre sécurisant :</strong> Établir des règles de groupe strictes basées sur la bienveillance et l'absence de jugement.</li>
        <li><strong>Psychoéducation collective :</strong> Lire et discuter du modèle des schémas en groupe. Aider les patients à normaliser leurs diagnostics.</li>
        <li><strong>Partage :</strong> Inviter les membres à partager la "carte" de leurs schémas avec le groupe de manière vulnérable et soutenue.</li>
    </ul>
</div>
        `
    },
    {
        id: 'Schema_Guide_Group_2', ref: 'SCH-GRP-2',
        title: 'Guide Groupe : Changement des Modes',
        category: 'schema_therapy', type: 'info',
        description: 'Guide clinique pour le Groupe Phase 2 : Changement des Modes.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-theater-masks me-2" style="color:#8b5cf6"></i>Groupe - Phase 2 : Changement des Modes</h5>
    <p>Cette phase mobilise la force du groupe pour combattre les modes dysfonctionnels de façon expérientielle.</p>
    <h6>Activités thérapeutiques :</h6>
    <ul>
        <li><strong>Rematernage par les pairs :</strong> Encourager les membres du groupe à se valider émotionnellement les uns les autres lorsque l'Enfant Vulnérable d'un membre s'active. </li>
        <li><strong>Lutte collective :</strong> Utiliser des jeux de rôles où le groupe entier s'unit pour confronter et repousser le "Parent Punitif" ou "Exigeant" d'un membre spécifique.</li>
        <li><strong>Co-construction :</strong> Aider les patients à rédiger leurs Tests Historiques et leurs Fiches d'aide (Flashcards) en petits sous-groupes.</li>
    </ul>
</div>
        `
    },
    {
        id: 'Schema_Guide_Group_3', ref: 'SCH-GRP-3',
        title: 'Guide Groupe : Briser les Patterns',
        category: 'schema_therapy', type: 'info',
        description: 'Guide clinique pour le Groupe Phase 3 : Terminaison.',
        content: `
<div class="exercise-info-content">
    <h5><i class="fas fa-route me-2" style="color:#8b5cf6"></i>Groupe - Phase 3 : Briser les Patterns et Terminaison</h5>
    <p>Le groupe se tourne vers l'extérieur pour appliquer les changements dans la vie réelle et se prépare à la fin des rencontres.</p>
    <h6>Focalisation de fin de groupe :</h6>
    <ul>
        <li><strong>Généralisation :</strong> Pratiquer (via des jeux de rôles en groupe) les nouveaux comportements sains à utiliser avec la famille, les amis ou les collègues de travail.</li>
        <li><strong>Gestion de la séparation :</strong> Aborder directement la fin imminente du groupe, qui active souvent le schéma d'Abandon chez les patients TPL.</li>
        <li><strong>Bilan :</strong> Évaluer les progrès à l'aide des échelles et célébrer les succès collectifs et individuels.</li>
    </ul>
</div>
        `
    },
    {
        id: 'Schema_Guide_Patient', ref: 'SCH-01',
        title: 'Guide du patient pour la Thérapie des Schémas',
        category: 'schema_therapy', type: 'info',
        description: 'Document de psychoéducation expliquant le modèle de la thérapie des schémas avec des exemples concrets. Bibliothérapie (à lire entre les séances).',
        resourcePdf: 'Resources/introductionschémapourclients.pdf',
        content: `<div class="exercise-info-content">
            <h5><i class="fas fa-book-open me-2" style="color:var(--tpl-purple)"></i>Guide du patient — Thérapie des Schémas</h5>
            <p>Ce guide est un document de <strong>bibliothérapie</strong> à remettre au patient lors des séances 1 à 4. Il explique :</p>
            <ul>
                <li>Le modèle des <strong>18 schémas précoces inadaptés</strong> de J. Young</li>
                <li>Les <strong>5 domaines de schémas</strong> (Déconnexion/Rejet, Manque d'autonomie, Limites déficientes, Orientation vers les autres, Survigilance)</li>
                <li>Les <strong>3 styles d'adaptation dysfonctionnels</strong> : Capitulation, Évitement, Contre-attaque</li>
                <li>Les <strong>modes de schémas</strong> (Enfant vulnérable, Parent punitif, Protecteur détaché, Adulte sain)</li>
                <li>Des exemples cliniques concrets (ex: le cas de Harry)</li>
            </ul>
            <p class="mt-3"><strong>Objectif :</strong> Le patient doit identifier ses propres schémas et comprendre comment ils se sont formés dans l'enfance.</p>
        </div>`
    },
    {
        id: 'Schema_Test_Historique', ref: 'SCH-02',
        title: 'Test Historique des Schémas',
        category: 'schema_therapy', type: 'structured_form',
        resourcePdf: 'Resources/test-historique.pdf',
        description: 'Grille cognitive où le patient liste objectivement les preuves pour et contre chaque schéma identifié, en remontant dans toute sa biographie.',
        fields: [
            { key: 'schema_cible', label: 'Schéma ciblé (ex: Abandon, Méfiance, Imperfection…)', type: 'text' },
            { key: 'preuves_pour', label: 'Preuves allant EN FAVEUR du schéma (expériences de vie qui le confirment)', type: 'textarea', rows: 5, placeholder: 'Listez chaque événement, relation ou souvenir qui semble confirmer ce schéma…' },
            { key: 'preuves_contre', label: 'Preuves allant CONTRE le schéma (expériences qui le contredisent)', type: 'textarea', rows: 5, placeholder: 'Listez les moments où ce schéma ne s\'est PAS vérifié, les relations positives, les réussites…' },
            { key: 'conclusion', label: 'Conclusion : Le schéma est-il une vérité absolue ou un biais ?', type: 'textarea', rows: 3 },
            { key: 'nouvelle_croyance', label: 'Nouvelle croyance plus équilibrée', type: 'textarea', rows: 2 }
        ]
    },
    {
        id: 'Schema_Diary', ref: 'SCH-03',
        title: 'Tableau d\'enregistrement des Schémas et Modes',
        category: 'schema_therapy', type: 'daily_log',
        alwaysAvailable: false,
        description: 'Journal quotidien à 6 colonnes pour observer l\'activation des schémas au quotidien. Équivalent de la Diary Card pour la Thérapie des Schémas.',
        columns: [
            { key: 'date', label: 'Date', inputType: 'date', width: '120px' },
            { key: 'situation', label: 'Situation déclenchante', inputType: 'text', placeholder: 'Décrivez brièvement…' },
            { key: 'schema_emotion', label: 'Schéma activé / Émotion', inputType: 'text', placeholder: 'Ex: Abandon → Panique' },
            { key: 'pensees_auto', label: 'Pensées automatiques', inputType: 'text', placeholder: 'Ex: Il va me quitter' },
            { key: 'pensees_adaptees', label: 'Réponse de l\'Adulte Sain', inputType: 'text', placeholder: 'Ex: Ce n\'est pas un abandon' },
            { key: 'action', label: 'Action / Résultat', inputType: 'text', placeholder: 'Ce que j\'ai fait' }
        ]
    },
    {
        id: 'Schema_Fiche_Aide', ref: 'SCH-04',
        title: 'Fiche d\'Aide Thérapeutique (Flashcard)',
        category: 'schema_therapy', type: 'structured_form',
        resourcePdf: 'Resources/fiche-daide-thérapeutique.pdf',
        description: 'Formulaire à trous rédigé à froid avec le thérapeute. Le patient la garde sur lui et la relit en situation de crise pour court-circuiter le schéma.',
        fields: [
            { key: 'moment', label: 'En ce moment, je ressens…', type: 'textarea', rows: 2, placeholder: 'Décrivez l\'émotion et les sensations physiques actuelles' },
            { key: 'schema_actif', label: 'C\'est probablement mon schéma de… qui s\'active.', type: 'text', placeholder: 'Ex: Abandon, Méfiance, Imperfection' },
            { key: 'mode_actif', label: 'Je suis dans le mode…', type: 'select', options: ['Enfant vulnérable', 'Enfant en colère', 'Parent punitif', 'Parent exigeant', 'Protecteur détaché', 'Capitulateur docile', 'Sur-compensateur'] },
            { key: 'realite', label: 'Je sais que la réalité, c\'est que…', type: 'textarea', rows: 3, placeholder: 'Reformulez les faits objectifs, ce que votre Adulte Sain dirait' },
            { key: 'action_saine', label: 'En tant qu\'Adulte Sain, je vais…', type: 'textarea', rows: 2, placeholder: 'L\'action concrète et saine que je vais poser maintenant' },
            { key: 'rappel', label: 'Je mérite…', type: 'textarea', rows: 1, placeholder: 'Ex: d\'être aimé(e), d\'être traité(e) avec respect, de me faire confiance' }
        ]
    }
];
window.ALL_EXERCISES = [...EXERCISES];

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

    // Guides Thérapeutiques Individuels
    "tcd_guide_contrat": ["tcd_guide_contrat"],
    "tcd_guide_postulats": ["tcd_guide_postulats"],
    "tcd_guide_hierarchie": ["tcd_guide_hierarchie"],
    "tcd_guide_strategies": ["tcd_guide_strategies"],
    "tcd_guide_communication": ["tcd_guide_communication"],
    "tcd_guide_pieges": ["tcd_guide_pieges"],
    "tcd_guide_trauma": ["tcd_guide_trauma"],
    "tcd_guide_respect": ["tcd_guide_respect"],
    "tcd_guide_joie": ["tcd_guide_joie"],

    // Groupe (nouveau)
    "Guide_Module_1": ["Guide_Module_1"],
    "Guide_Module_2": ["Guide_Module_2"],
    "Guide_Module_3": ["Guide_Module_3"],
    "Guide_Module_4": ["Guide_Module_4"],
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
    "DBT_Fiche_28": ['DBT_Fiche_28'],

    // Thérapie des Schémas
    "Schema_Guide_Indiv_1": ["Schema_Guide_Indiv_1"],
    "Schema_Guide_Indiv_2": ["Schema_Guide_Indiv_2"],
    "Schema_Guide_Indiv_3": ["Schema_Guide_Indiv_3"],
    "Schema_Guide_Group_1": ["Schema_Guide_Group_1"],
    "Schema_Guide_Group_2": ["Schema_Guide_Group_2"],
    "Schema_Guide_Group_3": ["Schema_Guide_Group_3"],
    "Schema_Guide_Patient": ['Schema_Guide_Patient'],
    "Schema_Test_Historique": ['Schema_Test_Historique'],
    "Schema_Diary": ['Schema_Diary'],
    "Schema_Fiche_Aide": ['Schema_Fiche_Aide']
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
