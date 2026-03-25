/**
 * Ory+ TCC Simulator — Data Layer
 * Protocole Bipolaire & IPSRT
 */

const SCALES = {
    BDI: {
        name: "BDI-II (Inventaire de Dépression de Beck)",
        abbr: "BDI-II",
        items: [
            "Tristesse", "Pessimisme", "Échecs passés", "Manque de plaisir", "Sentiments de culpabilité",
            "Sentiment d'être puni", "Insatisfaction de soi", "Auto-critique", "Pensées suicidaires",
            "Pleurs", "Agitation", "Intérêts", "Indécision", "Dévalorisation", "Perte d'énergie",
            "Modifications du sommeil", "Irritabilité", "Modifications de l'appétit",
            "Difficulté de concentration", "Fatigue", "Intérêt pour le sexe"
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
    MDQ: {
        name: "Mood Disorder Questionnaire (MDQ)",
        abbr: "MDQ",
        items: [
            "Étiez-vous si hyperactif(ve) que vous faisiez beaucoup plus de choses que d'habitude ?",
            "Vous sentiez-vous tellement bien ou hyper(actif) que d'autres pensaient que vous n'étiez pas dans votre état normal ?",
            "Étiez-vous plus irritable que d'habitude, au point de crier ou de commencer des disputes ?",
            "Aviez-vous tellement confiance en vous que vous pensiez pouvoir tout faire ?",
            "Avez-vous eu besoin de beaucoup moins de sommeil que d'habitude ?",
            "Étiez-vous beaucoup plus bavard(e) ou parliez-vous plus vite que d'habitude ?",
            "Aviez-vous l'impression que vos pensées défilaient rapidement dans votre tête ?",
            "Étiez-vous si facilement distrait(e) que vous aviez du mal à vous concentrer ?",
            "Avez-vous fait des choses inhabituelles ou dangereuses (achats excessifs, conduite dangereuse) ?"
        ],
        options: ["OUI (1)", "NON (0)"],
        maxScore: 9,
        interpretation: [
            { min: 0, max: 6, label: "Dépistage Négatif", color: "info" },
            { min: 7, max: 15, label: "Dépistage Positif (Suspicion)", color: "danger" }
        ]
    },
    ASRM: {
        name: "Questionnaire d'Altman pour la Manie (ASRM)",
        abbr: "ASRM",
        items: [
            "Humeur (Triste à Très Joyeuse/Élevée)",
            "Confiance en soi (Basse à Grandiose)",
            "Sommeil (Besoin normal à Aucun besoin)",
            "Élocution (Normale à Pression forte/Bavardage constant)",
            "Activité (Normale à Hyperactivité constante)"
        ],
        options: ["0", "1", "2", "3", "4"],
        maxScore: 20,
        interpretation: [
            { min: 0, max: 5, label: "Euthymique / Normal", color: "success" },
            { min: 6, max: 20, label: "État Maniaque / Hypomaniaque", color: "danger" }
        ]
    }
};

const simulationData = {
    patients: [
        {
            id: 1,
            name: "Lucas Girard",
            age: 28,
            sexe: "M",
            profession: "Développeur Freelance",
            motif: "Épisodes de dépression sévère alternant avec des périodes de suractivité, réduction du besoin de sommeil et achats compulsifs récents.",
            diagnoses: ["Trouble Bipolaire Type I"],
            antecedents: "Premier épisode dépressif à 22 ans. Hospitalisation à 26 ans pour épisode maniaque (délire de grandeur léger). Sous traitement Thymorégulateur (Lithium) depuis 1 an.",
            score_initial: { MDQ: 8, BDI: 24, ASRM: 4 },
            totalSessions: 20,
            currentSession: 1,
            completedSessions: [],
            sessionScores: {},
            notes: {},

            consultation: {
                medecinReferent: "Dr. Laurent",
                specialite: "Psychiatre",
                dateConsultation: "2026-03-10",
                lieuConsultation: "Cabinet Psychiatrique",
                resumeConsultation: "Patient de 28 ans référé suite à un épisode hypomaniaque récent (achats compulsifs intenses, nuits blanches, logorrhée). Antécédents d'épisodes dépressifs majeurs depuis l'âge de 22 ans, initialement traités par antidépresseurs en monothérapie ce qui a potentiellement induit un virage.",
                examensCliniques: [
                    { label: "Lithémie", resultat: "0.8 mEq/L (Zone Thérapeutique)", statut: "ok" },
                    { label: "Bilan sanguin", resultat: "Normal", statut: "ok" },
                    { label: "Toxicologie", resultat: "Négatif", statut: "ok" }
                ],
                diagnosticMedical: "Trouble Bipolaire Type I. Épisode récent de nature maniaque/hypomaniaque avec stabilisation sous traitement.",
                orientationPsy: "Indication pour une TCC orientée Bipolarité et mise en place de l'IPSRT (Aménagement des rythmes sociaux) pour prévenir les rechutes."
            },

            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Évaluation et Alliance Thérapeutique",
                    description: "Créer une base solide, comprendre l'historique de la maladie (Lifechart).",
                    seances: "S1 – S3"
                },
                {
                    numero: 2,
                    titre: "Psychoéducation et Rythmes Sociaux (IPSRT)",
                    description: "Régulariser les cycles de sommeil, l'alimentation, et identifier les stresseurs perturbant l'horloge biologique.",
                    seances: "S4 – S7"
                },
                {
                    numero: 3,
                    titre: "Restructuration Cognitive (Pôle Dépressif)",
                    description: "Travailler sur les symptômes dépressifs résiduels, la culpabilité liée aux épisodes maniaques passés.",
                    seances: "S8 – S12"
                },
                {
                    numero: 4,
                    titre: "Gestion de l'Impulsivité (Pôle Maniaque)",
                    description: "Reconnaître l'hyperactivité naissante, freiner les comportements à risque, remettre en question les idées de grandeur.",
                    seances: "S13 – S17"
                },
                {
                    numero: 5,
                    titre: "Prévention des Rechutes",
                    description: "Lister les signes précurseurs (prodromes) de manie et de dépression, établir un plan d'urgence.",
                    seances: "S18 – S20"
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
