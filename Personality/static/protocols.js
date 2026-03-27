/**
 * Ory+ TCC Simulator — Protocol Definitions
 * Protocole TPL (DBT / TCD)
 */

window.PROTOCOLS_DB = {
    "TPL": {
        "trouble_id": "TPL",
        "trouble_code_icd11": "6D60",
        "trouble_name": "Trouble de la Personnalité Limite",
        "default_total_sessions": 55,
        "phases": [
            {
                "phase_id": "phase_0_pretreatment",
                "phase_name": "Phase 0 : Pré-traitement et Engagement",
                "recommended_sessions": [1, 2, 3],
                "assessments": [
                    { "tool_id": "DERS", "required": true },
                    { "tool_id": "CRISIS", "required": true }
                ],
                "worksheets": ["DBT_Diary_Card"],
                "guides": []
            },
            {
                "phase_id": "phase_1_mindfulness",
                "phase_name": "Phase 1 : Compétences de Pleine Conscience",
                "recommended_sessions": [4, 5, 6, 7, 8],
                "assessments": [],
                "worksheets": ["DBT_Diary_Card"],
                "guides": []
            },
            {
                "phase_id": "phase_2_distress_tolerance",
                "phase_name": "Phase 2 : Tolérance à la Détresse",
                "recommended_sessions": [9, 10, 11, 12, 13, 14],
                "assessments": [],
                "worksheets": ["DBT_Diary_Card", "DBT_Chain_Analysis"],
                "guides": []
            },
            {
                "phase_id": "phase_3_emotion_regulation",
                "phase_name": "Phase 3 : Régulation Émotionnelle",
                "recommended_sessions": [15, 16, 17, 18, 19, 20, 21],
                "assessments": [],
                "worksheets": ["DBT_Diary_Card", "DBT_Chain_Analysis"],
                "guides": []
            },
            {
                "phase_id": "phase_4_interpersonal_effectiveness",
                "phase_name": "Phase 4 : Efficacité Interpersonnelle",
                "recommended_sessions": [22, 23, 24, 25, 26, 27, 28],
                "assessments": [],
                "worksheets": ["DBT_Diary_Card"],
                "guides": []
            },
            {
                "phase_id": "phase_5_integration",
                "phase_name": "Phase 5 : Intégration et Prévention de la Rechute",
                "recommended_sessions": [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
                "assessments": [],
                "worksheets": ["DBT_Diary_Card"],
                "guides": []
            }
        ]
    },
    "TPL_GROUP": {
        "trouble_id": "TPL_GROUP",
        "trouble_code_icd11": "6D60",
        "trouble_name": "TPL — Entraînement aux Compétences (Groupe)",
        "default_total_sessions": 16,
        "phases": [
            {
                "phase_id": "group_module_1",
                "phase_name": "Module 1 : Pleine Conscience",
                "recommended_sessions": [1, 2],
                "assessments": [{ "tool_id": "DERS", "required": true }],
                "worksheets": [],
                "guides": ["Guide_Module_1"]
            },
            {
                "phase_id": "group_module_2",
                "phase_name": "Module 2 : Régulation des Émotions",
                "recommended_sessions": [3, 4, 5, 6, 7, 8, 9],
                "assessments": [{ "tool_id": "DERS", "required": true }],
                "worksheets": [],
                "guides": ["Guide_Module_2"]
            },
            {
                "phase_id": "group_module_3",
                "phase_name": "Module 3 : Tolérance à la Détresse",
                "recommended_sessions": [10, 11, 12, 13],
                "assessments": [{ "tool_id": "DERS", "required": true }],
                "worksheets": [],
                "guides": ["Guide_Module_3"]
            },
            {
                "phase_id": "group_module_4",
                "phase_name": "Module 4 : Efficacité Interpersonnelle",
                "recommended_sessions": [14, 15, 16],
                "assessments": [{ "tool_id": "DERS", "required": true }],
                "worksheets": [],
                "guides": ["Guide_Module_4"]
            }
        ],
        "session_worksheets": {
            1: ["DBT_Fiche_1"],
            2: ["DBT_Fiche_2", "DBT_Fiche_3"],
            3: ["DBT_Fiche_4_5"],
            4: ["DBT_Fiche_6"],
            5: ["DBT_Fiche_7"],
            6: ["DBT_Fiche_8"],
            7: ["DBT_Fiche_10", "DBT_Fiche_11"],
            8: ["DBT_Fiche_12"],
            9: [], 
            10: ["DBT_Fiche_20"],
            11: ["DBT_Fiche_13", "DBT_Fiche_23"],
            12: ["DBT_Fiche_13_accepte"],
            13: ["DBT_Fiche_21", "DBT_Fiche_22"],
            14: ["DBT_Fiche_24"],
            15: ["DBT_Fiche_25", "DBT_Fiche_26"],
            16: ["DBT_Fiche_27", "DBT_Fiche_28"]
        }
    }
};
