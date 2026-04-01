// Configuration Data for Panique et Agoraphobie

const SCALES = {
    "BURNS": {
        name: "Inventaire de Burns (Anxiété)",
        abbr: "BURNS",
        items: [
            "1. Anxiété, nervosité, inquiétude ou peur", "2. Sentiment que les choses échappent à votre contrôle", 
            "3. Sentiments de panique", "4. Sentiment qu'une catastrophe va se produire", 
            "5. Sentiment d'être très bousculé(e) ou sur le point d'exploser", "6. Sentiment de désarroi ou de confusion",
            "7. Impossibilité de se concentrer", "8. Difficulté à prendre des décisions",
            "9. Peur de perdre le contrôle de soi", "10. Peur d'être l'objet d'un examen minutieux",
            "11. Impressions d'étrangeté concernant les gens ou les choses", "12. Sentiment de devenir fou / folle",
            "13. Peur d'être rejeté(e) ou critiqué(e)", "14. Peur d'être ridicule",
            "15. Peur d'attraper une maladie grave", "16. Peur de faire quelque chose de honteux",
            "17. Peur de la mort",
            "18. Impression que le cœur s'arrête ou s'emballe", "19. Sentiment d'étouffement", "20. Sensations d'étourdissement",
            "21. Transpiration intense", "22. Jambes molles", "23. Tendance à trembler", "24. Sentiment de suffocation",
            "25. Serrements dans le ventre", "26. Serrements dans la poitrine", "27. Étourdissement",
            "28. Picotements", "29. Fourmillements", "30. Impression d'estomac serré", "31. Mains froides",
            "32. Bouffées de chaleur ou frissons", "33. Impression de perte de connaissance"
        ],
        options: [
            "Pas du tout (0)",
            "Un peu (1)",
            "Modérément (2)",
            "Beaucoup (3)"
        ],
        maxScore: 99,
        interpretation: [
            { min: 0, max: 4, label: "Anxiété minimale", color: "success" },
            { min: 5, max: 10, label: "Anxiété à la limite", color: "warning" },
            { min: 11, max: 20, label: "Anxiété légère", color: "warning" },
            { min: 21, max: 30, label: "Anxiété modérée", color: "danger" },
            { min: 31, max: 99, label: "Anxiété sévère", color: "danger" }
        ]
    },
    "PANIC_OBS": {
        name: "Grille d'Observation de la Panique",
        abbr: "GOP",
        items: [
            "Présence d'Étouffement ?", "Étourdissements ?", "Palpitations / Tachycardie ?", "Tremblements ?", 
            "Transpiration abondante ?", "Sensation d'étranglement ?", "Nausée / gène abdominale ?", "Irréalité / Dépersonnalisation ?", 
            "Engourdissements / Picotements ?", "Chaleurs / frissons ?", "Douleur ou gêne thoracique ?", 
            "Peur de mourir ?", "Peur de devenir fou / de perdre le contrôle ?"
        ],
        options: [
            "Absent (0)",
            "Présent (1)"
        ],
        maxScore: 13,
        interpretation: [
            { min: 0, max: 3, label: "Attaque avec symptômes limités", color: "warning" },
            { min: 4, max: 13, label: "Attaque de panique complète", color: "danger" }
        ]
    }
};

const simulationData = {
    trouble_id: "PANIQUE",
    trouble_name: "Trouble Panique et Agoraphobie",

    getSessionsForPatient: function(patient) {
        return Array.from({length: patient.totalSessions}, (_, i) => ({
            no: i + 1,
            completed: patient.completedSessions.includes(i + 1)
        }));
    },
    
    patients: [
        {
            id: 1,
            name: "Julien M.",
            age: 34,
            profession: "Représentant commercial",
            avatar: "👨‍💼",
            status: "En traitement",
            totalSessions: 14,
            completedSessions: [],
            currentSession: 1,
            motif: "Attaques de panique récurrentes depuis 6 mois avec agoraphobie naissante.",
            diagnoses: ["Trouble Panique avec Agoraphobie (F41.0)"],
            antecedents: "Première attaque survenue sur l'autoroute sans déclencheur apparent. Évitement croissant des lieux publics (centres commerciaux, transports). Pas de comorbidité dépressive majeure, bien que l'humeur soit impactée par la restriction du champ de vie.",
            consultation: {
                medecinReferent: "Dr. Lemoine",
                specialite: "Médecin Généraliste",
                dateConsultation: "2026-03-22",
                lieuConsultation: "Clinique Lavale",
                resumeConsultation: "Le patient consulte suite à des passages répétés aux urgences pour des douleurs thoraciques et tachycardies (bilan cardio sans particularité). Présente une anxiété d'anticipation constante de faire une nouvelle attaque. Orienté en psychologie pour une TCC centrée sur le trouble panique.",
                examensCliniques: [
                    { label: "Bilan sanguin (Thyroïde)", resultat: "Normal", statut: "ok" },
                    { label: "ECG", resultat: "Normal, rythme sinusal régulier", statut: "ok" }
                ],
                diagnosticMedical: "Trouble Panique et Agoraphobie.",
                orientationPsy: "Thérapie cognitivo-comportementale (Protocole 14 séances)."
            },
            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Psychoéducation",
                    description: "Comprendre le mécanisme de la panique (faux système d'alarme) et la boucle vicieuse de la peur de la peur.",
                    seances: "Phase 1"
                },
                {
                    numero: 2,
                    titre: "Gestion Physiologique",
                    description: "Maîtriser la respiration diaphragmatique pour diminuer l'hyperventilation durant la crise.",
                    seances: "Phase 2"
                },
                {
                    numero: 3,
                    titre: "Exposition Interoceptive",
                    description: "Se confronter volontairement aux sensations physiques redoutées (tachycardie, vertiges) pour briser l'association au danger.",
                    seances: "Phase 3"
                },
                {
                    numero: 4,
                    titre: "Exposition In-Vivo",
                    description: "Reprendre progressivement la conduite sur autoroute et l'accès aux supermarchés via une hiérarchie d'exposition (IMA).",
                    seances: "Phase 4"
                },
                {
                    numero: 5,
                    titre: "Maintien des acquis",
                    description: "Consolider la thérapie avec un plan de prévention des rechutes.",
                    seances: "Phase 5"
                }
            ],
            score_initial: { BURNS: 42, PANIC_OBS: 9 },
            sessionScores: {},
            notes: {},
            customExercises: {},
            addedExercises: {},
            intermediateSessions: []
        }
    ]
};
