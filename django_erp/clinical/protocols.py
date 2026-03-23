PROTOCOLS = {
    "DSM5_GAD": {
        "trouble_id": "DSM5_GAD",
        "trouble_code_icd11": "6B00",
        "trouble_name": "Trouble d'Anxiété Généralisée",
        "default_total_sessions": 15,
        "phases": [
            {
                "phase_id": "phase_1_initial_interview",
                "phase_name": "Session 1: Initial Interview",
                "recommended_sessions": [1],
                "assessments": [
                    { "tool_id": "BDI", "required": True },
                    { "tool_id": "BAI", "required": True },
                    { "tool_id": "QIA", "required": True },
                    { "tool_id": "EII", "required": True },
                    { "tool_id": "PSI_II", "required": True }
                ],
                "worksheets": [],
                "guides": [
                    "Guide_Modele_TAG",
                    "Guide_Principes_TCC"
                ]
            },
            {
                "phase_id": "phase_2_worry_awareness",
                "phase_name": "Session 2: Worry Awareness",
                "recommended_sessions": [2],
                "assessments": [],
                "worksheets": [
                    "Carnet_AutoEnregistrement_Inquietudes"
                ],
                "guides": []
            },
            {
                "phase_id": "phase_3_reevaluating_usefulness",
                "phase_name": "Session 3: Re-evaluating the Usefulness of Worrying",
                "recommended_sessions": [3],
                "assessments": [],
                "worksheets": [
                    "Avantages_Desavantages_Inquietudes",
                    "Exercice_Avocat_Du_Diable"
                ],
                "guides": []
            },
            {
                "phase_id": "phase_4_intolerance_uncertainty",
                "phase_name": "Sessions 4 to 6: Intolerance to Uncertainty",
                "recommended_sessions": [4, 5, 6],
                "assessments": [],
                "worksheets": [
                    "Liste_12_Comportements",
                    "Action_Comportementale_Incertitude"
                ],
                "guides": [
                    "Guide_Definir_Intolerance_Incertitude"
                ]
            },
            {
                "phase_id": "phase_5_problem_solving",
                "phase_name": "Sessions 7 to 10: Problem Solving",
                "recommended_sessions": [7, 8, 9, 10],
                "assessments": [],
                "worksheets": [
                    "Liste_Problemes_Actuels",
                    "Reactions_Contreproductives",
                    "Exercice_Resolution_Probleme_4Etapes"
                ],
                "guides": [
                    "Guide_Introduction_Resolution_Problemes"
                ]
            },
            {
                "phase_id": "phase_6_imaginal_exposure",
                "phase_name": "Sessions 11 to 14: Imaginal Exposure",
                "recommended_sessions": [11, 12, 13, 14],
                "assessments": [
                    { "tool_id": "BDI", "required": False, "recurrence": "session_14" },
                    { "tool_id": "BAI", "required": False, "recurrence": "session_14" }
                ],
                "worksheets": [
                    "Scenario_Exposition_Imaginaire",
                    "Journal_Evaluation_Neutralisation"
                ],
                "guides": [
                    "Guide_Evitement_Ours_Blanc"
                ]
            },
            {
                "phase_id": "phase_7_termination",
                "phase_name": "Session 15: Termination and Relapse Prevention",
                "recommended_sessions": [15],
                "assessments": [],
                "worksheets": [
                    "Plan_Objectifs_Futurs"
                ],
                "guides": [
                    "Guide_Chute_vs_Rechute",
                    "Resume_Competences_TCC"
                ]
            }
        ]
    }
}
