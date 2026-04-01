const SCALES = {
    PHQ_9: {
        name: "PHQ-9 (Questionnaire sur la Santé du Patient)",
        abbr: "PHQ-9",
        items: [
            "Peu d'intérêt ou de plaisir à faire les choses",
            "Sensation de tristesse, d'abattement ou de désespoir",
            "Difficulté à s'endormir, à rester endormi, ou trop dormir",
            "Sensation de fatigue ou manque d'énergie",
            "Manque d'appétit ou fait de manger trop",
            "Mauvaise opinion de vous-même, sentiment d’être nul(le) ou d'avoir déçu votre famille",
            "Difficulté à se concentrer sur des choses, comme lire le journal ou regarder la télévision",
            "Lenteur à vous mouvoir ou à parler, remarquée par d'autres, ou au contraire, agitation",
            "Pensées qu'il vaudrait mieux être mort(e) ou de vous blesser d'une façon ou d'une autre"
        ],
        options: ["Jamais (0)", "Plusieurs jours (1)", "Plus de la moitié du temps (2)", "Presque tous les jours (3)"],
        maxScore: 27,
        interpretation: [
            { min: 0, max: 4, label: "Dépression minimale", color: "success" },
            { min: 5, max: 9, label: "Dépression légère", color: "info" },
            { min: 10, max: 14, label: "Dépression modérée", color: "warning" },
            { min: 15, max: 19, label: "Dépression modérément sévère", color: "danger" },
            { min: 20, max: 27, label: "Dépression sévère", color: "danger" }
        ]
    },
    BDI: {
        name: "BDI-II (Inventaire de Dépression de Beck)",
        abbr: "BDI-II",
        items: [
            "Tristesse", "Pessimisme", "Échecs passés", "Manque de plaisir", "Sentiments de culpabilité",
            "Sentiment d'être puni", "Insatisfaction de soi", "Auto-critique", "Pensées suicidaires",
            "Pleurs", "Agitation", "Intérêts", "Indécision", "Dévalorisation", "Perte d'énergie",
            "Modifications du sommeil", "Irritabilité", "Modifications de l'appétit", "Difficulté de concentration",
            "Fatigue", "Intérêt pour le sexe"
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
    BAI: {
        name: "BAI (Inventaire d'Anxiété de Beck)",
        abbr: "BAI",
        items: [
            "Engourdissements ou picotements", "Bouffées de chaleur", "Jambes qui flageolent",
            "Incapacité à se relaxer", "Crainte que le pire arrive", "Étourdissements ou vertige",
            "Battements cardiaques forts ou rapides", "Instabilité", "Sensation de terreur",
            "Nervosité", "Sensation d'étouffer", "Mains tremblantes", "Instabilité, tremblements",
            "Peur de perdre le contrôle", "Difficulté à respirer", "Peur de mourir", "Anxiété",
            "Indigestion", "Évanouissements", "Rougissement", "Transpiration (non liée à la chaleur)"
        ],
        options: ["Pas du tout (0)", "Un peu (1)", "Modérément (2)", "Beaucoup (3)"],
        maxScore: 63,
        interpretation: [
            { min: 0, max: 7, label: "Anxiété minimale", color: "success" },
            { min: 8, max: 15, label: "Anxiété légère", color: "info" },
            { min: 16, max: 25, label: "Anxiété modérée", color: "warning" },
            { min: 26, max: 63, label: "Anxiété sévère", color: "danger" }
        ]
    }
};

const simulationData = {
    patients: [
        {
            id: 1,
            name: "Julien Dubois",
            age: 42,
            sexe: "M",
            profession: "Enseignant",
            motif: "Perte d'intérêt généralisée, fatigue diurne, insomnie terminale, sentiments de dévalorisation importants. Les symptômes sont apparus progressivement sur les 6 derniers mois suite au décès de son père et à une accumulation de stress professionnel.",
            diagnoses: ["Trouble Dépressif Majeur (Épisode Unique)"],
            antecedents: "Aucun antécédent personnel psychotrope. Père avec antécédents de troubles de l'humeur. Pas de risque suicidaire aigu identifié à ce jour, mais pensées passives ('je serais mieux mort').",
            score_initial: { PHQ_9: 18, BDI: 26, BAI: 12 },
            totalSessions: 12,
            currentSession: 1,
            completedSessions: [],
            sessionScores: {},
            notes: {},

            consultation: {
                medecinReferent: "Dr. Lemoine",
                specialite: "Psychiatre",
                dateConsultation: "2026-03-10",
                lieuConsultation: "Clinique Lavale",
                resumeConsultation: "Le patient présente un épisode dépressif modérément sévère sans caractéristiques psychotiques. L'évaluation initiale ne révèle pas de plan suicidaire actif. Orienté vers un groupe TCC pour dépression afin de travailler l'activation comportementale et la restructuration cognitive.",
                examensCliniques: [
                    { label: "Bilan thyroïdien", resultat: "Normal", statut: "ok" }
                ],
                diagnosticMedical: "Trouble Dépressif Majeur, sévère sans caractéristiques psychotiques (DSM-5).",
                orientationPsy: "Thérapie cognitivo-comportementale (Protocole 12 séances - Groupe)."
            },

            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Évaluation de la sécurité et Alliance",
                    description: "Signature du contrat de non-suicide, évaluation initiale et remise du Manuel Patient.",
                    seances: "Session 1"
                },
                {
                    numero: 2,
                    titre: "Activation Comportementale",
                    description: "Briser le cycle de l'apathie. Reprendre des activités via le Registre.",
                    seances: "Sessions 2-3"
                },
                {
                    numero: 3,
                    titre: "Restructuration Cognitive",
                    description: "Identifier et questionner les biais et distorsions cognitives liés à l'autodépréciation.",
                    seances: "Sessions 4-6"
                },
                {
                    numero: 4,
                    titre: "Résolution de problèmes et Schémas",
                    description: "Renforcer les capacités de coping et aborder les schémas sous-jacents d'échec.",
                    seances: "Sessions 7-10"
                },
                {
                    numero: 5,
                    titre: "Prévention des rechutes",
                    description: "Plan de crise, identification des symptômes précurseurs.",
                    seances: "Sessions 11-12"
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
