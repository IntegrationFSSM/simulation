window.PROTOCOLS_DB = {
    "DSM5_GAD": {
        "trouble_id": "DSM5_GAD",
        "trouble_code_icd11": "6B00",
        "trouble_name": "Trouble d'Anxiété Généralisée",
        "default_total_sessions": 15,
        "phases": [
            {
                "phase_id": "phase_1_initial_interview",
                "phase_name": "Séance 1 : Évaluation initiale",
                "recommended_sessions": [1],
                "assessments": [
                    { "tool_id": "BDI", "required": true },
                    { "tool_id": "BAI", "required": true },
                    { "tool_id": "QIA", "required": true },
                    { "tool_id": "EII", "required": true },
                    { "tool_id": "PSI_II", "required": true }
                ],
                "worksheets": [],
                "guides": ["Guide_Modele_TAG", "Guide_Principes_TCC"]
            },
            {
                "phase_id": "phase_2_worry_awareness",
                "phase_name": "Séance 2 : Prise de conscience des inquiétudes",
                "recommended_sessions": [2],
                "assessments": [],
                "worksheets": ["Carnet_AutoEnregistrement_Inquietudes"],
                "guides": []
            },
            {
                "phase_id": "phase_3_reevaluating_usefulness",
                "phase_name": "Séance 3 : Réévaluation de l'utilité des inquiétudes",
                "recommended_sessions": [3],
                "assessments": [],
                "worksheets": ["Avantages_Desavantages_Inquietudes", "Exercice_Avocat_Du_Diable"],
                "guides": []
            },
            {
                "phase_id": "phase_4_intolerance_uncertainty",
                "phase_name": "Séances 4 à 6 : Intolérance à l'incertitude",
                "recommended_sessions": [4, 5, 6],
                "assessments": [],
                "worksheets": ["Liste_12_Comportements", "Action_Comportementale_Incertitude"],
                "guides": ["Guide_Definir_Intolerance_Incertitude"]
            },
            {
                "phase_id": "phase_5_problem_solving",
                "phase_name": "Séances 7 à 10 : Résolution de problèmes",
                "recommended_sessions": [7, 8, 9, 10],
                "assessments": [],
                "worksheets": ["Liste_Problemes_Actuels", "Reactions_Contreproductives", "Exercice_Resolution_Probleme_4Etapes"],
                "guides": ["Guide_Introduction_Resolution_Problemes"]
            },
            {
                "phase_id": "phase_6_imaginal_exposure",
                "phase_name": "Séances 11 à 14 : Exposition en imagination",
                "recommended_sessions": [11, 12, 13, 14],
                "assessments": [
                    { "tool_id": "BDI", "required": false, "recurrence": "session_14" },
                    { "tool_id": "BAI", "required": false, "recurrence": "session_14" }
                ],
                "worksheets": ["Scenario_Exposition_Imaginaire", "Journal_Evaluation_Neutralisation"],
                "guides": ["Guide_Evitement_Ours_Blanc"]
            },
            {
                "phase_id": "phase_7_termination",
                "phase_name": "Séance 15 : Clôture et prévention des rechutes",
                "recommended_sessions": [15],
                "assessments": [],
                "worksheets": ["Plan_Objectifs_Futurs"],
                "guides": ["Guide_Chute_vs_Rechute", "Resume_Competences_TCC"]
            }
        ]
    }
};
