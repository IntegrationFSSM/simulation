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
        name: "Questionnaire sur l'inquiétude et l'anxiété (Diagnostic TAG)",
        abbr: "QIA",
        items: ["Critères diagnostiques TAG"],
        options: ["OUI", "NON"],
        maxScore: 10,
        interpretation: [{ min: 0, max: 10, label: "Diagnostic", color: "primary" }]
    },
    EII: {
        name: "Échelle d'intolérance à l'incertitude",
        abbr: "ÉII",
        items: ["L'incertitude m'empêche d'agir", "Je dois toujours tout planifier"],
        options: ["1", "2", "3", "4", "5"],
        maxScore: 135,
        interpretation: [{ min: 0, max: 135, label: "Score Intolérance", color: "warning" }]
    },
    PSI_II: {
        name: "Pourquoi s'inquiéter - Version II",
        abbr: "PSI-II",
        items: ["S'inquiéter aide à résoudre", "S'inquiéter protège"],
        options: ["1", "2", "3", "4", "5"],
        maxScore: 125,
        interpretation: [{ min: 0, max: 125, label: "Croyances Utilité", color: "info" }]
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
                    seances: "S1 – S3"
                },
                {
                    numero: 2,
                    titre: "Réévaluation de l'utilité des inquiétudes",
                    description: "Remettre en question les croyances sur l'utilité de s'inquiéter (protection, préparation, contrôle) à l'aide de l'exercice de l'Avocat du Diable et du bilan avantages/désavantages.",
                    seances: "S3 – S4"
                },
                {
                    numero: 3,
                    titre: "Augmenter la tolérance à l'incertitude",
                    description: "Identifier les manifestations personnelles d'intolérance à l'incertitude (évitement, procrastination, réassurance) et mettre en place des actions comportementales graduelles pour y faire face.",
                    seances: "S4 – S6"
                },
                {
                    numero: 4,
                    titre: "Développer la résolution de problèmes",
                    description: "Apprendre à distinguer les problèmes actuels des problèmes hypothétiques, appliquer une démarche structurée de résolution (définir, brainstormer, évaluer, appliquer) pour les inquiétudes portant sur des problèmes réels.",
                    seances: "S7 – S10"
                },
                {
                    numero: 5,
                    titre: "Exposition cognitive aux scénarios catastrophiques",
                    description: "Réduire l'évitement cognitif et la neutralisation par l'exposition en imagination aux pires scénarios redoutés (perte d'emploi, maladie d'un proche), avec suivi de l'habituation.",
                    seances: "S11 – S14"
                },
                {
                    numero: 6,
                    titre: "Prévention de la rechute et autonomie",
                    description: "Consolider les acquis, identifier les signaux d'alerte d'une rechute, établir un plan de maintien des progrès avec des objectifs personnels à poursuivre après la fin du traitement.",
                    seances: "S15"
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
