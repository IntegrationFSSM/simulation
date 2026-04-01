// Configuration Data for Trauma (ESA / TSPT)

const SCALES = {
    PCL5: {
        name: "PCL-5 — Liste de Contrôle du TSPT (DSM-5)",
        abbr: "PCL-5",
        items: [
            "Souvenirs répétitifs, pénibles et involontaires de l'événement stressant",
            "Rêves répétitifs et pénibles en rapport avec l'événement",
            "Réactions dissociatives (flashbacks) — impression que l'événement se reproduit",
            "Sentiment intense ou prolongé de détresse psychologique lors de l'exposition à des indices",
            "Réactions physiologiques marquées lors de l'exposition à des indices",
            "Évitement ou efforts pour éviter les souvenirs, pensées ou sentiments pénibles",
            "Évitement ou efforts pour éviter les rappels extérieurs (personnes, lieux, situations)",
            "Incapacité de se rappeler un aspect important de l'événement",
            "Croyances ou attentes négatives persistantes et exagérées concernant soi-même",
            "Distorsions cognitives persistantes sur la cause ou les conséquences de l'événement (culpabilité)",
            "État émotionnel négatif persistant (peur, horreur, colère, culpabilité, honte)",
            "Réduction nette de l'intérêt pour des activités importantes ou de la participation",
            "Sentiment de détachement d'autrui ou de devenir étranger",
            "Incapacité persistante d'éprouver des émotions positives",
            "Comportement irritable ou accès de colère",
            "Comportement imprudent ou autodestructeur",
            "Hypervigilance",
            "Réaction de sursaut exagérée",
            "Problèmes de concentration",
            "Perturbation du sommeil"
        ],
        options: [
            "Pas du tout (0)",
            "Un peu (1)",
            "Modérément (2)",
            "Beaucoup (3)",
            "Extrêmement (4)"
        ],
        maxScore: 80,
        interpretation: [
            { min: 0, max: 10, label: "Symptômes minimaux", color: "success" },
            { min: 11, max: 32, label: "Symptômes modérés (sous-seuil)", color: "warning" },
            { min: 33, max: 80, label: "TSPT probable — Alerte clinique", color: "danger" }
        ]
    },
    PDEQ: {
        name: "PDEQ — Questionnaire de Dissociation Péritraumatique",
        abbr: "PDEQ",
        items: [
            "J'ai eu des moments où j'ai perdu le fil de ce qui se passait",
            "Je me suis retrouvé(e) en « pilote automatique »",
            "Mon sens du temps a été altéré — les choses semblaient se dérouler au ralenti",
            "Ce qui arrivait me semblait irréel, comme si j'étais dans un rêve",
            "Je me suis senti(e) comme un(e) spectateur(trice) regardant la scène de l'extérieur",
            "J'ai eu des moments de flottement ou d'absence",
            "La situation m'a semblé se dérouler comme dans un brouillard",
            "J'ai été surpris(e) de découvrir après coup que des choses s'étaient passées dont je n'avais pas eu conscience",
            "J'ai été désorienté(e) — c'est-à-dire qu'il y a eu des moments où je ne savais plus trop où j'étais",
            "J'ai eu du mal à identifier ce que je ressentais"
        ],
        options: [
            "Pas du tout vrai (1)",
            "Légèrement vrai (2)",
            "Assez vrai (3)",
            "Très vrai (4)",
            "Extrêmement vrai (5)"
        ],
        maxScore: 50,
        interpretation: [
            { min: 0, max: 15, label: "Dissociation faible", color: "success" },
            { min: 16, max: 25, label: "Dissociation modérée", color: "warning" },
            { min: 26, max: 50, label: "Dissociation sévère", color: "danger" }
        ]
    },
    IES_R: {
        name: "IES-R — Impact de l'Événement (révisée)",
        abbr: "IES-R",
        items: [
            "Tout rappel de l'événement ravivait mes sentiments",
            "J'avais des difficultés à rester endormi(e)",
            "D'autres choses me faisaient sans cesse penser à l'événement",
            "Je me sentais irritable et en colère",
            "Quand j'y repensais ou qu'on me le rappelait, j'évitais d'en être perturbé(e)",
            "J'y pensais alors que je ne le voulais pas",
            "J'avais l'impression que l'événement n'était pas arrivé ou n'était pas réel",
            "Je me tenais à l'écart de ce qui m'y faisait penser",
            "Des images de l'événement surgissaient dans mon esprit",
            "J'étais nerveux(se) et je sursautais facilement",
            "J'essayais de ne pas y penser",
            "J'étais conscient(e) d'avoir encore beaucoup d'émotions à propos de l'événement mais je n'y faisais pas face",
            "Mes sentiments à propos de l'événement étaient comme engourdis",
            "Je me comportais ou je me sentais comme si j'étais revenu(e) à cette époque",
            "J'avais du mal à m'endormir",
            "J'avais des bouffées d'émotions intenses à propos de l'événement",
            "J'essayais de l'effacer de ma mémoire",
            "J'avais du mal à me concentrer",
            "Les rappels de l'événement me causaient des réactions physiques (sueurs, difficultés à respirer, nausées, palpitations)",
            "J'ai rêvé de l'événement",
            "Je me sentais sur le qui-vive, sur mes gardes",
            "J'essayais de ne pas en parler"
        ],
        options: [
            "Pas du tout (0)",
            "Un peu (1)",
            "Moyennement (2)",
            "Beaucoup (3)",
            "Extrêmement (4)"
        ],
        maxScore: 88,
        interpretation: [
            { min: 0, max: 23, label: "Impact normal", color: "success" },
            { min: 24, max: 32, label: "Impact cliniquement significatif", color: "warning" },
            { min: 33, max: 88, label: "TSPT probable", color: "danger" }
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
    trouble_id: "TRAUMA",
    trouble_name: "Trauma (ESA / TSPT)",

    getSessionsForPatient: function(patient) {
        return Array.from({length: patient.totalSessions}, (_, i) => ({
            no: i + 1,
            completed: patient.completedSessions.includes(i + 1)
        }));
    },

    patients: [
        {
            id: 1,
            name: "Samir K.",
            age: 29,
            sexe: "M",
            profession: "Livreur",
            avatar: "👨",
            status: "En traitement",
            totalSessions: 16,
            completedSessions: [],
            currentSession: 1,
            motif: "Le patient consulte 6 semaines après une agression physique violente survenue lors d'une livraison nocturne. Présente des cauchemars récurrents, des flashbacks, une hypervigilance marquée, un évitement des zones urbaines nocturnes, et un état d'alerte permanent. Insomnie d'endormissement sévère. Ne parvient plus à reprendre le travail de nuit.",
            diagnoses: ["Trouble de Stress Post-Traumatique (F43.10)"],
            antecedents: "Aucun antécédent psychiatrique. Pas de traumatismes antérieurs connus. Pas de consommation de substances. Bonne adaptation prémorbide.",
            consultation: {
                medecinReferent: "Dr. Benali",
                specialite: "Médecin Urgentiste (orientation post-hospitalisation)",
                dateConsultation: "2026-03-01",
                lieuConsultation: "Clinique Lavale",
                resumeConsultation: "Le patient a été vu aux urgences la nuit de l'agression pour contusions multiples et un traumatisme crânien léger (scanner normal). Suivi somatique sans particularité. Le médecin urgentiste oriente vers une prise en charge psychotraumatologique devant la persistance des symptômes au-delà de 30 jours. Le patient rapporte des reviviscences quotidiennes et un sentiment permanent de danger.",
                examensCliniques: [
                    { label: "Scanner cérébral", resultat: "Normal", statut: "ok" },
                    { label: "Bilan sanguin complet", resultat: "Normal", statut: "ok" },
                    { label: "Examen neurologique", resultat: "Normal", statut: "ok" }
                ],
                diagnosticMedical: "Trouble de Stress Post-Traumatique consécutif à une agression physique. Symptômes de reviviscence, évitement, altération cognitive/humeur, et hyperactivation neurovégétative présents depuis plus de 30 jours.",
                orientationPsy: "Protocole TCC-T (Thérapie Cognitivo-Comportementale centrée sur le Trauma) incluant restructuration cognitive et exposition prolongée (modèle Foa). 16 séances recommandées."
            },
            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Évaluation et Ligne de Base",
                    description: "Administrer la LEC-5, le PCL-5, le PDEQ et l'IES-R pour établir le profil symptomatique initial et confirmer le diagnostic de TSPT.",
                    seances: "Phase 0 (S1-S2)"
                },
                {
                    numero: 2,
                    titre: "Stabilisation et Gestion de Crise",
                    description: "Restaurer le sommeil, enseigner les techniques d'ancrage (5-4-3-2-1) et la cohérence cardiaque. Prévenir le développement d'une chronicisation.",
                    seances: "Phase 1 (S3-S6)"
                },
                {
                    numero: 3,
                    titre: "Restructuration Cognitive",
                    description: "Cibler la culpabilité du survivant ('J'aurais dû me défendre') et les cognitions déformées via le questionnement socratique et la tarte des hypothèses.",
                    seances: "Phase 2A (S7-S9)"
                },
                {
                    numero: 4,
                    titre: "Exposition Prolongée",
                    description: "Exposition in-vivo aux situations évitées (zones nocturnes, foules) et exposition en imagination au récit du trauma avec suivi des NAS. Séances de 90 min.",
                    seances: "Phase 2B (S10-S14)"
                },
                {
                    numero: 5,
                    titre: "Consolidation et Maintien",
                    description: "Bilan des acquis, plan de prévention des rechutes, et remise de la brochure TSPT au patient.",
                    seances: "Phase 2C (S15-S16)"
                }
            ],
            score_initial: { PCL5: 52, PDEQ: 28, IES_R: 48, BDI: 18, BAI: 22 },
            sessionScores: {},
            notes: {},
            customExercises: {},
            addedExercises: {},
            intermediateSessions: []
        }
    ]
};
