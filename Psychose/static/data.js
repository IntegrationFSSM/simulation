/**
 * Ory+ TCC Simulator — Data Layer
 * Protocole Psychose & Schizophrénie (PARCOURS A)
 */

const SCALES = {
    PSYRATS_HA: {
        name: "PSYRATS - Hallucinations Auditives",
        abbr: "PSYRATS-HA",
        items: [
            "Fréquence des voix",
            "Durée des voix",
            "Localisation (internes vs externes)",
            "Intensité sonore",
            "Croyance sur l'origine (Conviction)",
            "Quantité de contenu négatif",
            "Degré de croyance dans le contenu négatif",
            "Détresse (Intensité)",
            "Détresse (Quantité)",
            "Perturbation de la vie quotidienne",
            "Contrôlabilité"
        ],
        options: ["0 — Absent", "1 — Léger", "2 — Modéré", "3 — Sévère", "4 — Extrême"],
        maxScore: 44,
        interpretation: [
            { min: 0, max: 10, label: "Hallucinations de faible impact", color: "success" },
            { min: 11, max: 20, label: "Impact modéré", color: "info" },
            { min: 21, max: 30, label: "Impact élevé — Détresse clinique", color: "warning" },
            { min: 31, max: 44, label: "Impact extrême — Risque majeur", color: "danger" }
        ]
    },
    PSYRATS_ID: {
        name: "PSYRATS - Idées Délirantes",
        abbr: "PSYRATS-ID",
        items: [
            "Fréquence de la préoccupation",
            "Durée de la préoccupation",
            "Conviction (Degré de certitude)",
            "Quantité de détresse",
            "Intensité de la détresse",
            "Perturbation de la vie quotidienne"
        ],
        options: ["0 — Absent", "1 — Léger", "2 — Modéré", "3 — Sévère", "4 — Extrême"],
        maxScore: 24,
        interpretation: [
            { min: 0, max: 5, label: "Idées délirantes de faible impact", color: "success" },
            { min: 6, max: 12, label: "Impact modéré", color: "info" },
            { min: 13, max: 18, label: "Impact élevé", color: "warning" },
            { min: 19, max: 24, label: "Impact extrême", color: "danger" }
        ]
    },
    CDSS: {
        name: "CDSS (Calgary Depression Scale for Schizophrenia)",
        abbr: "CDSS",
        items: [
            "Dépression (Humeur exprimée)",
            "Désespoir",
            "Dévalorisation de soi",
            "Autocritique (Idées de culpabilité)",
            "Dépression matinale",
            "Réveil précoce",
            "Suicide",
            "Agitation observée"
        ],
        options: ["0 — Absent", "1 — Léger", "2 — Modéré", "3 — Sévère"],
        maxScore: 24,
        interpretation: [
            { min: 0, max: 6, label: "Dépression peu probable", color: "success" },
            { min: 7, max: 24, label: "Dépression clinique (Cut-off > 6 atteint)", color: "danger" }
        ]
    },
    CHOICE: {
        name: "CHOICE (Consumer's Recovery Questionnaire)",
        abbr: "CHOICE",
        items: [
            "Je me sens confiant(e) dans ma capacité à gérer mes symptômes.",
            "J'ai un but ou une signification dans ma vie.",
            "Je participe à des activités qui ont du sens pour moi.",
            "Je me sens soutenu(e) par mon réseau social.",
            "J'accepte ma situation actuelle tout en espérant l'améliorer."
        ],
        options: ["1 — Pas du tout", "2 — Un peu", "3 — Parfois", "4 — Souvent", "5 — Toujours"],
        maxScore: 20,
        interpretation: [
            { min: 5, max: 10, label: "Niveau de rétablissement initial", color: "danger" },
            { min: 11, max: 15, label: "Niveau de rétablissement modéré", color: "warning" },
            { min: 16, max: 20, label: "Rétablissement fonctionnel élevé", color: "success" }
        ]
    }
};

window.ALL_SCALES = SCALES;

const simulationData = {
    patients: [
        {
            id: 1,
            name: "Marc Dubé",
            age: 26,
            sexe: "M",
            profession: "Étudiant (En pause)",
            motif: "Hallucinations auditives (plusieurs voix commentant ses actions de manière dérogatoire) et méfiance paranoïaque envers ses voisins. Retrait social marqué, perte d'élan vital. Vise un retour partiel aux études.",
            diagnoses: ["F20.9 — Schizophrénie, épisode multiple (DSM-5-TR)"],
            antecedents: "Premier épisode psychotique à 22 ans. Hospitalisation de 3 semaines. Actuellement sous traitement antipsychotique (Aripiprazole) avec observance partielle.",
            totalSessions: 16,
            currentSession: 1,
            completedSessions: [],
            sessionScores: {},
            notes: {},
            consultation: {
                medecinReferent: "Dr. Lavoie (Psychiatre)",
                specialite: "Psychiatrie",
                dateConsultation: "2026-03-25",
                lieuConsultation: "Clinique PEP",
                resumeConsultation: "Le patient est orienté pour une TCC pour psychose (TCCp). Il présente des symptômes positifs résistants malgré la médication, principalement des hallucinations auditives. L'examen clinique montre une détresse importante liée aux voix, ainsi qu'une conviction délirante variable concernant ses voisins (crainte d'espionnage). Le but est de réduire la charge émotionnelle associée aux expériences inhabituelles et de prévenir les comportements d'isolement.",
                diagnosticMedical: "Trouble du spectre de la schizophrénie stabilisé mais persistant. Présence de symptômes positifs (HA, idées de persécution).",
                orientationPsy: "Recommandation d'un protocole TCCp."
            },
            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Engagement et Modèle Vulnérabilité-Stress",
                    description: "Créer une alliance, normaliser la psychose avec le modèle vulnérabilité-stress, et identifier des buts de vie via la boussole des valeurs.",
                    seances: "Phase 1"
                },
                {
                    numero: 2,
                    titre: "Gérer la détresse en crise",
                    description: "Identifier les déclencheurs (ABC) et appliquer des compétences de survie de crise (STOP, TIP) lorsque la détresse atteint un pic insoutenable.",
                    seances: "Phase 2"
                },
                {
                    numero: 3,
                    titre: "Assouplissement cognitif",
                    description: "Restructurer les croyances autour des voix et évaluer objectivement les interprétations paranoïaques via la Tarte des Probabilités.",
                    seances: "Phase 3"
                },
                {
                    numero: 4,
                    titre: "Consolidation et prévention des rechutes",
                    description: "Anticiper les événements stressants futurs et établir un plan de gestion des signes avant-coureurs.",
                    seances: "Phase 4"
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

window.simulationData = simulationData;
