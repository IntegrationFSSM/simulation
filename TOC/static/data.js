// Configuration Data for Trouble Obsessionnel Compulsif (TOC)

const SCALES = {
    YBOCS: {
        name: "Échelle Y-BOCS (Yale-Brown) pour les TOC",
        abbr: "Y-BOCS",
        description: "L'outil de référence pour évaluer la sévérité des obsessions et des compulsions.",
        items: [
            // Obsessions
            "Temps passé à avoir des pensées obsessionnelles",
            "Interférence des pensées obsessionnelles avec le fonctionnement quotidien",
            "Détresse associée aux pensées obsessionnelles",
            "Résistance aux pensées obsessionnelles (Effort pour les repousser)",
            "Degré de contrôle sur les pensées obsessionnelles",
            // Compulsions
            "Temps passé à accomplir des comportements compulsifs",
            "Interférence des comportements compulsifs avec le fonctionnement quotidien",
            "Détresse (anxiété) ressentie si on vous empêchait d'exécuter vos compulsions",
            "Résistance à accomplir les compulsions (Effort pour ne pas les faire)",
            "Degré de contrôle sur les comportements compulsifs"
        ],
        options: [
            "0 — Aucun symptôme",
            "1 — Léger",
            "2 — Moyen / Modéré",
            "3 — Sévère",
            "4 — Extrême"
        ],
        maxScore: 40,
        interpretation: [
            { min: 0, max: 7, label: "TOC infra-clinique", color: "success" },
            { min: 8, max: 15, label: "TOC léger", color: "info" },
            { min: 16, max: 23, label: "TOC modéré", color: "warning" },
            { min: 24, max: 31, label: "TOC sévère", color: "danger" },
            { min: 32, max: 40, label: "TOC extrêmement sévère", color: "dark" }
        ]
    },
    DSM5_TOC: {
        name: "Questionnaire de Gravité du DSM-5 (TOC)",
        abbr: "DSM-5 TOC",
        description: "Indice global de sévérité basé sur les critères du DSM-5.",
        items: [
            "Au cours de la dernière semaine, combien de temps les pensées ou actes liés au TOC ont-ils occupé ?",
            "Dans quelle mesure vous êtes-vous senti(e) de plus en plus anxieux(se) ou en détresse ?",
            "Dans quelle mesure avez-vous eu du mal à contrôler ces pensées ou actes ?",
            "Dans quelle mesure avez-vous évité certaines situations pour éviter l'apparition des TOC ?",
            "Dans quelle mesure ces pensées/actes ont-ils interféré avec vos activités (travail, vie sociale, amis) ?"
        ],
        options: [
            "0 — Jamais / Pas du tout",
            "1 — Un peu / Rarement",
            "2 — Moyennement / Moitié du temps",
            "3 — Beaucoup / Souvent",
            "4 — Constamment / Extrêmement"
        ],
        maxScore: 20,
        interpretation: [
            { min: 0, max: 4, label: "Gravité minimale", color: "success" },
            { min: 5, max: 9, label: "Gravité légère", color: "info" },
            { min: 10, max: 14, label: "Gravité modérée", color: "warning" },
            { min: 15, max: 20, label: "Gravité sévère", color: "danger" }
        ]
    },
    BDI: {
        name: "Inventaire de Dépression de Beck (BDI-II)",
        abbr: "BDI-II",
        description: "Recherche d'une comorbidité dépressive.",
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
    QEP: {
        name: "Questionnaire d'Évaluation de la Peur (QEP)",
        abbr: "QEP",
        description: "Évaluation de l'intensité de la peur liée à différentes situations phobogènes (spécifique ou non au TOC).",
        items: [
            "Peur de la saleté ou des germes",
            "Peur de se blesser physiquement (ou de blesser autrui)",
            "Peur des produits toxiques (chimiques, poisons)",
            "Peur des endroits fermés",
            "Peur des espaces ouverts (rues, ponts)",
            "Peur des animaux ou des insectes",
            "Peur des maladies cardiaques / mort imminente",
            "Peur des situations sociales / foules",
            "Peur de perdre le contrôle",
            "Peur de commettre une erreur fatale"
        ],
        options: [
            "0 — Aucune anxiété",
            "1 — Légère anxiété",
            "2 — Anxiété modérée",
            "3 — Forte anxiété",
            "4 — Terreur / Panique extrême"
        ],
        maxScore: 40,
        interpretation: [
            { min: 0, max: 10, label: "Niveau bas de peurs", color: "success" },
            { min: 11, max: 20, label: "Peur modérée (phobies circonscrites)", color: "warning" },
            { min: 21, max: 40, label: "Anxiété/Peur généralisée", color: "danger" }
        ]
    }
};

const simulationData = {
    trouble_id: "TOC",
    trouble_name: "Trouble Obsessionnel Compulsif",

    getSessionsForPatient: function(patient) {
        return Array.from({length: patient.totalSessions}, (_, i) => ({
            no: i + 1,
            completed: patient.completedSessions.includes(i + 1)
        }));
    },

    patients: [
        {
            id: 1,
            name: "Lucas V.",
            age: 34,
            sexe: "M",
            profession: "Ingénieur Informatique",
            avatar: "👨",
            status: "En traitement",
            totalSessions: 20,
            completedSessions: [],
            currentSession: 1,
            motif: "TOC de contamination et vérification sévère. Peur obsédante d'avoir attrapé une maladie grave (VIH, hépatite) en touchant des surfaces publiques. Rituels de lavage des mains qui occupent entre 3 et 4 heures par jour. Crainte associée de contaminer sa femme - ce qui le pousse à vérifier méticuleusement l'état de son environnement (fusion pensée-action). Impact fonctionnel très lourd (télétravail exclusif, évite les sorties).",
            diagnoses: ["Trouble Obsessionnel-Compulsif (F42.2) avec insight (prise de conscience) correct"],
            antecedents: "Début des symptômes vers 22 ans, aggravation progressive depuis la pandémie. Échec d'un premier suivi, possiblement dû à l'absence de protocole d'exposition in-vivo (EPR). Pas de comportements auto-agressifs. Troubles du sommeil liés aux ruminations nocturnes.",
            consultation: {
                medecinReferent: "Dr. Morin (Psychiatre)",
                specialite: "Psychiatrie - Adultes",
                dateConsultation: "2026-03-10",
                lieuConsultation: "Clinique Lavale",
                resumeConsultation: "Le patient présente un profil obsessionnel avec prédominance de craintes nosophobiques (contamination). Rituels épuisants aboutissant à des lésions cutanées sur les poignets et mains. Le patient indique que son Y-BOCS avait atteint un score pic de 32 il y a 6 mois. Dépression secondaire légère à modérée due au confinement lié aux TOC.",
                examensCliniques: [
                    { label: "Bilan dermatologique", resultat: "Dermatite de contact d'irritation, prescription d'émollients", statut: "warning" },
                    { label: "Dosage SRI", resultat: "Sertraline 150mg/j débutée il y a 2 mois", statut: "ok" },
                    { label: "Bilan sanguin standard", resultat: "Normal", statut: "ok" }
                ],
                diagnosticMedical: "TOC sévère axé Contamination/Responsabilité. Indication formelle à combiner psychopharmacologie (ISRS à dose filée) et protocole d'Exposition In-Vivo avec Prévention de Réponse (EPR).",
                orientationPsy: "Thérapie Comportementale et Cognitive (EPR/TCC). 20 séances. Cibles : distorsions de la responsabilité démesurée et EPR stricte avec retrait progressif des réassurances de l'épouse."
            },
            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Évaluation & Ligne de Base (S1-S2)",
                    description: "Administration de l'Index des symptômes, Y-BOCS, BDI et Analyse Fonctionnelle afin de cartographier la 'chaîne' obsession-compulsion.",
                    seances: "Phase 0"
                },
                {
                    numero: 2,
                    titre: "Restructuration Cognitive (S3-S5)",
                    description: "Cibler la distorsion de la 'responsabilité démesurée' (\"Je vais être responsable de la mort de ma femme\") via la grille des pensées dysfonctionnelles.",
                    seances: "Phase 1"
                },
                {
                    numero: 3,
                    titre: "Exposition en Imagination (S6-S8)",
                    description: "Rédiger et lire le 'Pire Scénario' (ex: le patient transmet une pathologie fatale) pour générer l'habituation de l'anxiété sans besoin d'action physique réelle.",
                    seances: "Phase 2A (Dossier A)"
                },
                {
                    numero: 4,
                    titre: "EIVPR - Exposition in Vivo avec Prévention de la Réponse (S9-S16)",
                    description: "Création d'une Hiérarchie d'exposition (OptEx). Toucher des poignées de porte à la clinique SANS se laver les mains, et consigner le NAS jusqu'à redescendre l'anxiété.",
                    seances: "Phase 2B (Dossier B)"
                },
                {
                    numero: 5,
                    titre: "Consolidation & Maintien (S17-S20)",
                    description: "Bilan des résultats, prévention de l'identification des 'Nouveaux rituels mutants' (rituels cachés) et suivi post-traitement.",
                    seances: "Phase 3"
                }
            ],
            score_initial: { YBOCS: 28, DSM5_TOC: 15, BDI: 14, QEP: 18 },
            sessionScores: {},
            notes: {},
            customExercises: {},
            addedExercises: {},
            intermediateSessions: []
        }
    ]
};
