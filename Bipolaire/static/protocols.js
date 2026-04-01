window.PROTOCOLS_DB = {
    "BIPOLAR": {
        "trouble_id": "BIPOLAR",
        "trouble_code_icd11": "6A60",
        "trouble_name": "Trouble Bipolaire (Type I & II)",
        "default_total_sessions": 20,
        "phases": [
            {
                "phase_id": "phase_1_evaluation",
                "phase_name": "Phase 1 : Évaluation, Alliance et Psychoéducation (Séances 1 à 4)",
                "recommended_sessions": [1, 2, 3, 4],
                "assessments": [
                    { "tool_id": "MDQ", "required": true, "recurrence": "session_1" },
                    { "tool_id": "BDI", "required": true, "recurrence": "session_1" },
                    { "tool_id": "ASRM", "required": true, "recurrence": "session_1" }
                ],
                "worksheets": ["Lifechart_Retrospectif", "Graphique_Humeur"],
                "guides": ["Guide_Modele_Vulnerabilite_Stress"]
            },
            {
                "phase_id": "phase_2_stabilisation",
                "phase_name": "Phase 2 : Stabilisation Biologique et Rythmes Sociaux (Séances 5 à 8)",
                "recommended_sessions": [5, 6, 7, 8],
                "assessments": [
                    { "tool_id": "BDI", "required": false, "recurrence": "session_8" },
                    { "tool_id": "ASRM", "required": false, "recurrence": "session_8" }
                ],
                "worksheets": ["Rythmes_Sociaux", "Hygiene_De_Vie"],
                "guides": ["Guide_Horloge_Biologique_IPSRT"]
            },
            {
                "phase_id": "phase_3_pole_depressif",
                "phase_name": "Phase 3 : Restructuration Cognitive — Le Pôle Dépressif (Séances 9 à 13)",
                "recommended_sessions": [9, 10, 11, 12, 13],
                "assessments": [],
                "worksheets": ["Tableau_Pensees_Automatiques", "Resolution_Problemes"],
                "guides": ["Guide_Depression_Activation"]
            },
            {
                "phase_id": "phase_4_pole_maniaque",
                "phase_name": "Phase 4 : Freinage Cognitif — Le Pôle Maniaque/Hypomaniaque (Séances 14 à 17)",
                "recommended_sessions": [14, 15, 16, 17],
                "assessments": [
                    { "tool_id": "BDI", "required": false, "recurrence": "session_17" },
                    { "tool_id": "ASRM", "required": false, "recurrence": "session_17" }
                ],
                "worksheets": ["Avantages_Desavantages_Hypomanie", "Remise_Question_Pensees"],
                "guides": ["Guide_Seduction_Hypomanie"]
            },
            {
                "phase_id": "phase_5_prevention_rechutes",
                "phase_name": "Phase 5 : Prévention des Rechutes et Autonomie (Séances 18 à 20)",
                "recommended_sessions": [18, 19, 20],
                "assessments": [
                    { "tool_id": "BDI", "required": false, "recurrence": "session_20" },
                    { "tool_id": "ASRM", "required": false, "recurrence": "session_20" }
                ],
                "worksheets": ["Signes_Rechute", "Plan_Action_Urgence"],
                "guides": ["Guide_Detecteur_Fumee_Prodromes"]
            }
        ]
    }
};
