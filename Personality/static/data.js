/**
 * Ory+ TCC Simulator — Data Layer
 * Protocole TPL (DBT / TCD)
 */

const SCALES = {
    DERS: {
        name: "DERS-16 (Difficultés de Régulation Émotionnelle)",
        abbr: "DERS",
        items: [
            "Je suis clair(e) sur ce que je ressens.",
            "Je fais attention à mes émotions.",
            "Mes émotions m'envahissent et m'échappent.",
            "Quand je suis bouleversé(e), je crains de rester comme ça longtemps.",
            "Quand je suis bouleversé(e), j'ai peur de perdre le contrôle.",
            "Quand je suis bouleversé(e), j'ai l'impression que je vais craquer.",
            "Quand je suis bouleversé(e), j'ai du mal à me concentrer.",
            "Quand je suis bouleversé(e), j'ai du mal à finir ce que je fais.",
            "Quand je suis bouleversé(e), je n'arrive pas à penser à autre chose.",
            "Quand je suis bouleversé(e), je me comporte différemment.",
            "Quand je suis bouleversé(e), je n'accepte pas comment je me sens.",
            "Quand je suis bouleversé(e), j'ai honte de me sentir ainsi.",
            "Quand je suis bouleversé(e), je suis en colère contre moi-même.",
            "Quand je suis bouleversé(e), je perds espoir.",
            "Quand je suis bouleversé(e), je crois que rien ne peut m'aider.",
            "Quand je suis bouleversé(e), je mets du temps à m'en remettre."
        ],
        options: ["Presque jamais (1)", "Parfois (2)", "La moitié du temps (3)", "La plupart du temps (4)", "Presque toujours (5)"],
        maxScore: 80,
        interpretation: [
            { min: 16, max: 35, label: "Bonne régulation", color: "success" },
            { min: 36, max: 50, label: "Difficultés modérées", color: "warning" },
            { min: 51, max: 80, label: "Désrégulation sévère", color: "danger" }
        ]
    },
    CRISIS: {
        name: "Indicateurs d'Urgence et de Crise",
        abbr: "URGENCES",
        items: [
            "Nombre de recours à l'hospitalisation depuis la dernière évaluation :",
            "Nombre de visites aux urgences psychiatriques/médicales :"
        ],
        options: ["0 (0)", "1 visite/hospit. (1)", "2 visites/hospit. (2)", "3+ visites/hospit. (3)"],
        maxScore: 6,
        interpretation: [
            { min: 0, max: 0, label: "Sécurité", color: "success" },
            { min: 1, max: 2, label: "Alerte", color: "warning" },
            { min: 3, max: 6, label: "Danger grave", color: "danger" }
        ]
    }
};

// ========================== SIMULATION DATA ==========================
const simulationData = {
    patients: [
        {
            id: 1,
            name: "Sophie Tremblay",
            age: 31,
            sexe: "F",
            profession: "Étudiante en art",
            motif: "Instabilité émotionnelle intense, automutilations répétées, relations interpersonnelles chaotiques, tentatives de suicide antérieures.",
            diagnoses: ["Trouble de la Personnalité Limite (TPL / Borderline)"],
            antecedents: "Diagnostic de TPL posé à 27 ans. Multiples hospitalisations (3) pour crises suicidaires. Séjour de 6 semaines en clinique spécialisée. Traitement actuel : Quétiapine 100mg (PRN).",
            score_initial: { DERS: 62, CRISIS: 3 },
            totalSessions: 55,
            currentSession: 1,
            completedSessions: [],
            sessionScores: {},
            notes: {},

            consultation: {
                medecinReferent: "Dr. Bergeron",
                specialite: "Psychiatre",
                dateConsultation: "2026-03-15",
                lieuConsultation: "Clinique Ory+",
                resumeConsultation: "Patiente de 31 ans présentant un Trouble de la Personnalité Limite diagnostiqué depuis 4 ans. Histoire d'automutilations (scarifications aux avant-bras) depuis l'adolescence, 3 tentatives de suicide (la dernière il y a 8 mois). Relations interpersonnelles instables avec peur intense de l'abandon. Épisodes de dissociation rapportés sous stress intense.",
                examensCliniques: [
                    { label: "Évaluation du risque suicidaire", resultat: "Modéré (idéations passives, sans plan actuel)", statut: "warning" },
                    { label: "DERS-16", resultat: "62/80 — Désrégulation sévère", statut: "danger" },
                    { label: "Bilan sanguin", resultat: "Normal", statut: "ok" }
                ],
                diagnosticMedical: "Trouble de la Personnalité Limite (F60.3). Comorbidité : Épisode dépressif majeur en rémission partielle.",
                orientationPsy: "Indication pour un programme de Thérapie Comportementale Dialectique (TCD/DBT) structuré : thérapie individuelle hebdomadaire + groupe d'apprentissage des compétences. Contrat thérapeutique d'un an minimum."
            },

            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Pré-traitement et Engagement",
                    description: "Évaluation, explication du modèle biosocial, signature du contrat thérapeutique (engagement 1 an, règle des 4 absences).",
                    seances: "Séances 1-3"
                },
                {
                    numero: 2,
                    titre: "Phase 1 — Stabilité et Sécurité",
                    description: "Éliminer les comportements suicidaires et auto-dommageables, réduire les comportements interférant avec la thérapie et la qualité de vie.",
                    seances: "Séances 4-40"
                },
                {
                    numero: 3,
                    titre: "Phase 2 — Exploration des Traumatismes",
                    description: "Diminuer l'évitement émotionnel, réduire l'auto-invalidation et le blâme, exposer aux émotions du passé.",
                    seances: "Séances 41-45"
                },
                {
                    numero: 4,
                    titre: "Phase 3 — Respect de soi",
                    description: "Favoriser la fierté et le respect de soi, soutenir l'atteinte des objectifs personnels et professionnels.",
                    seances: "Séances 46-50"
                },
                {
                    numero: 5,
                    titre: "Phase 4 — Capacité à la joie",
                    description: "Intégrer les représentations contradictoires de soi et des autres, accepter la réalité et maintenir un sentiment de joie soutenu.",
                    seances: "Séances 51-55"
                }
            ]
        }
    ],

    buildSessions(total) {
        const sessions = [];
        const n = Number.isFinite(Number(total)) && Number(total) > 0
            ? Math.floor(Number(total))
            : (window.PROTOCOL?.default_total_sessions || 55);
        for (let i = 1; i <= n; i++) {
            sessions.push({ no: i });
        }
        return sessions;
    },

    getSessionsForPatient(patient) {
        return this.buildSessions(patient?.totalSessions);
    }
};

window.PROTOCOLS_DB = window.PROTOCOLS_DB || {};

// Make simulationData available globally for TAG app.js
window.simulationData = simulationData;
