/**
 * Ory+ TCC Simulator — Data Layer
 * Protocole TAG  
 */

const SCALES = {
    GAD7: {
        name: "GAD-7 (Trouble Anxiété Généralisée)",
        abbr: "GAD-7",
        items: [
            "Sentiment d'être nerveux, anxieux ou à bout",
            "Incapacité à arrêter de vous inquiéter ou à contrôler vos inquiétudes",
            "Inquiétudes excessives à propos de différentes choses",
            "Difficultés à vous détendre",
            "Agitation telle qu'il est difficile de rester tranquille",
            "Tendance à vous énerver ou à vous irriter facilement",
            "Sentiment de craindre qu'il arrive quelque chose de terrible"
        ],
        options: ["Jamais (0)", "Plusieurs jours (1)", "Plus de la moitié des jours (2)", "Presque tous les jours (3)"],
        maxScore: 21,
        interpretation: [
            { min: 0, max: 4, label: "Anxiété minimale", color: "success" },
            { min: 5, max: 9, label: "Anxiété légère", color: "info" },
            { min: 10, max: 14, label: "Anxiété modérée", color: "warning" },
            { min: 15, max: 21, label: "Anxiété sévère", color: "danger" }
        ]
    },
    BAI: {
        name: "BAI (Inventaire d'Anxiété de Beck)",
        abbr: "BAI",
        items: [
            "Engourdissements ou picotements",
            "Bouffées de chaleur",
            "Jambes qui flageolent",
            "Incapacité à se relaxer",
            "Crainte que le pire arrive",
            "Étourdissements ou vertige",
            "Battements cardiaques forts ou rapides",
            "Instabilité",
            "Sensation de terreur",
            "Nervosité",
            "Sensation d'étouffer",
            "Mains tremblantes",
            "Instabilité, tremblements dans tout le corps",
            "Peur de perdre le contrôle",
            "Difficulté à respirer",
            "Peur de mourir",
            "Anxiété",
            "Indigestion ou malaise abdominal",
            "Évanouissements",
            "Rougissement du visage",
            "Transpiration (non liée à la chaleur)"
        ],
        options: ["Pas du tout (0)", "Un peu (1)", "Modérément (2)", "Beaucoup (3)"],
        maxScore: 63,
        interpretation: [
            { min: 0, max: 7, label: "Niveau minimal", color: "success" },
            { min: 8, max: 15, label: "Niveau léger", color: "info" },
            { min: 16, max: 25, label: "Niveau modéré", color: "warning" },
            { min: 26, max: 63, label: "Niveau sévère", color: "danger" }
        ]
    },
    BDI: {
        name: "BDI-II (Inventaire de Dépression de Beck)",
        abbr: "BDI-II",
        items: [
            "Tristesse",
            "Pessimisme",
            "Échecs passés",
            "Manque de plaisir",
            "Sentiments de culpabilité",
            "Sentiment d'être puni",
            "Insatisfaction de soi",
            "Auto-critique",
            "Pensées suicidaires",
            "Pleurs",
            "Agitation",
            "Intérêts",
            "Indécision",
            "Dévalorisation",
            "Perte d'énergie",
            "Modifications du sommeil",
            "Irritabilité",
            "Modifications de l'appétit",
            "Difficulté de concentration",
            "Fatigue",
            "Intérêt pour le sexe"
        ],
        options: ["0 — Absent", "1 — Léger", "2 — Modéré", "3 — Sévère"],
        maxScore: 63,
        interpretation: [
            { min: 0, max: 13, label: "Dépression minimale", color: "success" },
            { min: 14, max: 19, label: "Dépression légère", color: "info" },
            { min: 20, max: 28, label: "Dépression modérée", color: "warning" },
            { min: 29, max: 63, label: "Dépression sévère", color: "danger" }
        ]
    },
    QIA: {
        name: "QIA — Questionnaire sur l'inquiétude et l'anxiété (Dugas et al., 2001)",
        abbr: "QIA",
        items: [
            "Est-ce que vos inquiétudes vous semblent excessives ou exagérées ? (Aucunement → Complètement excessives)",
            "Durant les derniers six mois, combien de jours avez-vous été troublé(e) par des inquiétudes excessives ? (Jamais → Tous les jours)",
            "Avez-vous de la difficulté à contrôler vos inquiétudes ? (Aucune difficulté → Difficulté extrême)",
            "5a. Agité(e), surexcité(e) ou avoir les nerfs à vif (Aucunement → Très sévèrement)",
            "5b. Facilement fatigué(e) (Aucunement → Très sévèrement)",
            "5c. Difficulté à se concentrer ou blanc de mémoire (Aucunement → Très sévèrement)",
            "5d. Irritabilité (Aucunement → Très sévèrement)",
            "5e. Tensions musculaires (Aucunement → Très sévèrement)",
            "5f. Problèmes de sommeil — difficulté à tomber ou rester endormi(e), sommeil agité (Aucunement → Très sévèrement)",
            "À quel point l'anxiété ou l'inquiétude interfère avec votre vie (travail, activités sociales, famille) ? (Aucunement → Très sévèrement)"
        ],
        options: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
        maxScore: 80,
        interpretation: [
            { min: 0, max: 20, label: "Symptômes légers", color: "success" },
            { min: 21, max: 40, label: "Symptômes modérés", color: "info" },
            { min: 41, max: 60, label: "Symptômes élevés", color: "warning" },
            { min: 61, max: 80, label: "Symptômes sévères — critères TAG probables", color: "danger" }
        ]
    },
    EII: {
        name: "ÉII — Échelle d'intolérance à l'incertitude",
        abbr: "ÉII",
        items: [
            "L'incertitude m'empêche de prendre position.",
            "Être incertain(e) veut dire qu'on est une personne désorganisée.",
            "L'incertitude rend la vie intolérable.",
            "C'est injuste de ne pas avoir de garanties dans la vie.",
            "Je ne peux pas avoir l'esprit tranquille tant que je ne sais pas ce qui va arriver le lendemain.",
            "L'incertitude me rend mal à l'aise, anxieux(se) ou stressé(e).",
            "Les imprévus me dérangent énormément.",
            "Ça me frustre de ne pas avoir toute l'information dont j'ai besoin.",
            "L'incertitude m'empêche de profiter pleinement de la vie.",
            "On devrait tout prévenir pour éviter les surprises.",
            "Un léger imprévu peut tout gâcher, même la meilleure des planifications.",
            "Lorsque c'est le temps d'agir, l'incertitude me paralyse.",
            "Être incertain(e) veut dire que je ne suis pas à la hauteur.",
            "Lorsque je suis incertain(e), je ne peux pas aller de l'avant.",
            "Lorsque je suis incertain(e), je ne peux pas bien fonctionner.",
            "Contrairement à moi, les autres semblent toujours savoir où ils vont dans la vie.",
            "L'incertitude me rend vulnérable, malheureux(se) ou triste.",
            "Je veux toujours savoir ce que l'avenir me réserve.",
            "Je déteste être pris(e) au dépourvu.",
            "Le moindre doute peut m'empêcher d'agir.",
            "Je devrais être capable de tout organiser à l'avance.",
            "Être incertain(e), ça veut dire que je manque de confiance.",
            "Je trouve injuste que d'autres personnes semblent certaines face à leur avenir.",
            "L'incertitude m'empêche de bien dormir.",
            "Je dois me retirer de toute situation incertaine."
        ],
        options: ["Pas du tout correspondant (0)", "Un peu correspondant (1)", "Assez correspondant (2)", "Très correspondant (3)", "Tout à fait correspondant (4)"],
        maxScore: 100,
        interpretation: [
            { min: 0, max: 25, label: "Faible intolérance", color: "success" },
            { min: 26, max: 50, label: "Intolérance modérée", color: "info" },
            { min: 51, max: 75, label: "Intolérance élevée", color: "warning" },
            { min: 76, max: 100, label: "Intolérance très élevée", color: "danger" }
        ]
    },
    PSI_II: {
        name: "PSI-II — Pourquoi s'inquiéter - Version II",
        abbr: "PSI-II",
        items: [
            "Si je ne m'inquiétais pas, je serais insouciant(e) et irresponsable.",
            "Si je m'inquiète, je serai moins ébranlé(e) lorsque des événements imprévus se produiront.",
            "Je m'inquiète dans le but de savoir quoi faire.",
            "Si je m'inquiète à l'avance, je serai moins déçu(e) si quelque chose de grave se produit.",
            "Le fait de m'inquiéter m'aide à planifier mes actions pour résoudre un problème.",
            "Le simple fait de m'inquiéter peut empêcher les malheurs d'arriver.",
            "Si je ne m'inquiétais pas, cela ferait de moi une personne négligente.",
            "C'est en m'inquiétant que je finis par entreprendre le travail que j'ai à faire.",
            "Je m'inquiète parce que je pense que cela peut m'aider à trouver une solution à mon problème.",
            "Le fait de m'inquiéter prouve que je suis une personne qui voit à ses affaires.",
            "Trop penser à des choses positives peut les empêcher de se produire.",
            "Le fait de m'inquiéter confirme que je suis une personne prévoyante.",
            "Si un malheur arrive, je me sentirai moins responsable si je m'en suis inquiété auparavant.",
            "En m'inquiétant, je peux trouver une meilleure façon de faire.",
            "L'inquiétude me stimule et me rend plus efficace.",
            "Le fait de m'inquiéter m'incite à passer à l'action.",
            "Le simple fait de m'inquiéter diminue le risque que quelque chose de grave arrive.",
            "En m'inquiétant, je fais certaines choses que je ne me déciderais pas à faire autrement.",
            "Le fait de m'inquiéter me motive à faire les choses que je dois faire.",
            "Mes inquiétudes à elles seules peuvent diminuer les risques de danger.",
            "En m'inquiétant, j'augmente mes chances de trouver la meilleure solution.",
            "Le fait de m'inquiéter me permettra de me sentir moins coupable si quelque chose de grave se produit.",
            "Si je m'inquiète, je serai moins triste lorsqu'un événement négatif se produira.",
            "En ne s'inquiétant pas, on peut attirer les malheurs.",
            "Le fait de m'inquiéter démontre que je suis une bonne personne."
        ],
        options: ["Pas du tout vrai (1)", "Un peu vrai (2)", "Assez vrai (3)", "Très vrai (4)", "Tout à fait vrai (5)"],
        maxScore: 100,
        interpretation: [
            { min: 25, max: 50, label: "Faibles croyances sur l'utilité", color: "success" },
            { min: 51, max: 75, label: "Croyances modérées", color: "info" },
            { min: 76, max: 100, label: "Croyances élevées", color: "warning" },
            { min: 101, max: 125, label: "Croyances très élevées", color: "danger" },
            { min: 0, max: 24, label: "Score minimal", color: "success" }
        ]
    }
};

const simulationData = {
    patients: [
        {
            id: 1,
            name: "Nadia El Amrani",
            age: 34,
            sexe: "F",
            profession: "Comptable en cabinet",
            motif: "Inquiétudes envahissantes et persistantes depuis environ 2 ans touchant principalement le domaine professionnel (peur de commettre des erreurs, crainte de perdre son emploi), la santé de ses parents âgés et l'éducation de son fils de 6 ans. Difficultés de concentration au travail, insomnie d'endormissement, tensions cervicales et lombaires chroniques, fatigue persistante malgré le repos.",
            diagnoses: ["F41.1 — TAG"],
            antecedents: "Aucun suivi psychiatrique antérieur. Épisode de stress aigu en 2022 suite à un licenciement économique (résolu). Pas d'antécédent psychiatrique familial connu. Pas de médication psychotrope actuelle.",
            score_initial: { GAD7: 16, BAI: 18, BDI: 9 },
            totalSessions: 15,
            currentSession: 1,
            completedSessions: [],
            sessionScores: {},
            notes: {},

            consultation: {
                medecinReferent: "Dr. Karim Benali",
                specialite: "Médecin généraliste",
                dateConsultation: "2026-02-18",
                lieuConsultation: "Cabinet médical Ain Borja, Casablanca",
                resumeConsultation: "Patiente adressée pour prise en charge psychologique d'un trouble anxieux généralisé. L'examen clinique général est sans particularité. Le bilan thyroïdien (TSH, T4) est normal, excluant une cause endocrinienne. L'ECG est normal. La patiente rapporte des plaintes somatiques compatibles avec une anxiété chronique : céphalées de tension fréquentes, bruxisme nocturne, douleurs musculaires diffuses. Aucun syndrome dépressif majeur identifié à ce stade.",
                examensCliniques: [
                    { label: "Bilan thyroïdien (TSH, T4)", resultat: "Normal", statut: "ok" },
                    { label: "ECG de repos", resultat: "Rythme sinusal, sans anomalie", statut: "ok" },
                    { label: "Bilan sanguin complet (NFS)", resultat: "Normal", statut: "ok" },
                    { label: "Glycémie à jeun", resultat: "0.92 g/L — Normal", statut: "ok" },
                    { label: "Tension artérielle", resultat: "125/80 mmHg — Normale", statut: "ok" }
                ],
                diagnosticMedical: "Trouble d'anxiété généralisée (F41.1 — CIM-10). Symptomatologie anxieuse chronique avec retentissement fonctionnel significatif sur le plan professionnel et familial. Pas de comorbidité dépressive majeure. Pas d'indication de traitement médicamenteux à ce stade — orientation vers une prise en charge psychothérapeutique de type TCC.",
                orientationPsy: "Recommandation d'un protocole de thérapie cognitivo-comportementale (TCC) spécifique au TAG, basé sur le modèle de  . Objectif : réduction des inquiétudes excessives, amélioration de la tolérance à l'incertitude, restauration du fonctionnement socioprofessionnel."
            },

            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Psychoéducation et prise de conscience",
                    description: "Comprendre le modèle cognitif du TAG, identifier le cycle situation → inquiétude → anxiété, et développer la capacité à reconnaître ses propres schémas d'inquiétude.",
                    seances: "Phase 1"
                },
                {
                    numero: 2,
                    titre: "Réévaluation de l'utilité des inquiétudes",
                    description: "Remettre en question les croyances sur l'utilité de s'inquiéter (protection, préparation, contrôle) à l'aide de l'exercice de l'Avocat du Diable et du bilan avantages/désavantages.",
                    seances: "Phase 2"
                },
                {
                    numero: 3,
                    titre: "Augmenter la tolérance à l'incertitude",
                    description: "Identifier les manifestations personnelles d'intolérance à l'incertitude (évitement, procrastination, réassurance) et mettre en place des actions comportementales graduelles pour y faire face.",
                    seances: "Phase 3"
                },
                {
                    numero: 4,
                    titre: "Développer la résolution de problèmes",
                    description: "Apprendre à distinguer les problèmes actuels des problèmes hypothétiques, appliquer une démarche structurée de résolution (définir, brainstormer, évaluer, appliquer) pour les inquiétudes portant sur des problèmes réels.",
                    seances: "Phase 4"
                },
                {
                    numero: 5,
                    titre: "Exposition cognitive aux scénarios catastrophiques",
                    description: "Réduire l'évitement cognitif et la neutralisation par l'exposition en imagination aux pires scénarios redoutés (perte d'emploi, maladie d'un proche), avec suivi de l'habituation.",
                    seances: "Phase 5"
                },
                {
                    numero: 6,
                    titre: "Prévention de la rechute et autonomie",
                    description: "Consolider les acquis, identifier les signaux d'alerte d'une rechute, établir un plan de maintien des progrès avec des objectifs personnels à poursuivre après la fin du traitement.",
                    seances: "Phase 6"
                }
            ]
        }
    ],

    buildSessions(total) {
        const sessions = [];
        for (let i = 1; i <= total; i++) {
            sessions.push({ no: i });
        }
        return sessions;
    },

    getSessionsForPatient(patient) {
        return this.buildSessions(patient.totalSessions);
    }
};
