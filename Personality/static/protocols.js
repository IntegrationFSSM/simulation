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
                "phase_name": "Pré-traitement et Engagement",
                "recommended_sessions": [1, 2, 3],
                "assessments": [
                    { "tool_id": "DERS", "required": true },
                    { "tool_id": "CRISIS", "required": true }
                ],
                "worksheets": ["DBT_Diary_Card"],
                "guides": ["tcd_guide_contrat", "tcd_guide_postulats"]
            },
            {
                "phase_id": "phase_1_stability",
                "phase_name": "Phase 1 : Stabilité et Sécurité",
                "recommended_sessions": Array.from({length: 37}, (_, i) => i + 4),
                "assessments": [{ "tool_id": "CRISIS", "required": false }],
                "worksheets": ["DBT_Diary_Card", "DBT_Chain_Analysis"],
                "guides": ["tcd_guide_hierarchie", "tcd_guide_strategies", "tcd_guide_communication", "tcd_guide_pieges"]
            },
            {
                "phase_id": "phase_2_trauma",
                "phase_name": "Phase 2 : Exploration des Traumatismes",
                "recommended_sessions": [41, 42, 43, 44, 45],
                "assessments": [],
                "worksheets": ["DBT_Diary_Card", "DBT_Chain_Analysis"],
                "guides": ["tcd_guide_trauma"]
            },
            {
                "phase_id": "phase_3_respect",
                "phase_name": "Phase 3 : Respect de soi",
                "recommended_sessions": [46, 47, 48, 49, 50],
                "assessments": [],
                "worksheets": ["DBT_Diary_Card"],
                "guides": ["tcd_guide_respect"]
            },
            {
                "phase_id": "phase_4_joy",
                "phase_name": "Phase 4 : Capacité à la joie",
                "recommended_sessions": [51, 52, 53, 54, 55],
                "assessments": [{ "tool_id": "DERS", "required": true }],
                "worksheets": ["DBT_Diary_Card"],
                "guides": ["tcd_guide_joie"]
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
    },
    "SCHEMA_INDIVIDUEL": {
        "trouble_id": "SCHEMA_INDIVIDUEL",
        "trouble_code_icd11": "6D60",
        "trouble_name": "TPL — Thérapie des Schémas (Individuel)",
        "default_total_sessions": 50,
        "phases": [
            {
                "phase_id": "schema_phase_1_evaluation",
                "phase_name": "Phase 1 : Évaluation et Éducation",
                "recommended_sessions": [1, 2, 3, 4, 5],
                "assessments": [
                    { "tool_id": "YSQ", "required": true },
                    { "tool_id": "YPI", "required": true },
                    { "tool_id": "COMPENSATION", "required": true },
                    { "tool_id": "BDI", "required": true },
                    { "tool_id": "BAI", "required": true }
                ],
                "worksheets": [],
                "guides": ["Schema_Guide_Indiv_1", "Schema_Guide_Patient"]
            },
            {
                "phase_id": "schema_phase_2_active",
                "phase_name": "Phase 2 : Phase Active de Traitement",
                "recommended_sessions": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
                "assessments": [],
                "worksheets": ["Schema_Diary"],
                "guides": ["Schema_Guide_Indiv_2"]
            },
            {
                "phase_id": "schema_phase_3_termination",
                "phase_name": "Phase 3 : Terminaison",
                "recommended_sessions": [46, 47, 48, 49, 50],
                "assessments": [
                    { "tool_id": "YSQ", "required": true },
                    { "tool_id": "BDI", "required": true },
                    { "tool_id": "BAI", "required": true }
                ],
                "worksheets": ["Schema_Diary"],
                "guides": ["Schema_Guide_Indiv_3"]
            }
        ],
        "session_worksheets": {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: ["Schema_Test_Historique", "Schema_Diary"],
            7: ["Schema_Test_Historique", "Schema_Diary"],
            8: ["Schema_Test_Historique", "Schema_Diary"],
            9: ["Schema_Test_Historique", "Schema_Diary"],
            10: ["Schema_Test_Historique", "Schema_Diary"],
            11: ["Schema_Fiche_Aide", "Schema_Diary"],
            12: ["Schema_Fiche_Aide", "Schema_Diary"],
            13: ["Schema_Fiche_Aide", "Schema_Diary"],
            14: ["Schema_Fiche_Aide", "Schema_Diary"],
            15: ["Schema_Fiche_Aide", "Schema_Diary"],
            16: ["Schema_Fiche_Aide", "Schema_Diary"],
            17: ["Schema_Fiche_Aide", "Schema_Diary"],
            18: ["Schema_Fiche_Aide", "Schema_Diary"],
            19: ["Schema_Fiche_Aide", "Schema_Diary"],
            20: ["Schema_Fiche_Aide", "Schema_Diary"],
            21: ["Schema_Diary"],
            22: ["Schema_Diary"],
            23: ["Schema_Diary"],
            24: ["Schema_Diary"],
            25: ["Schema_Diary"],
            26: ["Schema_Diary"],
            27: ["Schema_Diary"],
            28: ["Schema_Diary"],
            29: ["Schema_Diary"],
            30: ["Schema_Diary"],
            31: ["Schema_Diary"],
            32: ["Schema_Diary"],
            33: ["Schema_Diary"],
            34: ["Schema_Diary"],
            35: ["Schema_Diary"],
            36: ["Schema_Diary"],
            37: ["Schema_Diary"],
            38: ["Schema_Diary"],
            39: ["Schema_Diary"],
            40: ["Schema_Diary"],
            41: ["Schema_Diary"],
            42: ["Schema_Diary"],
            43: ["Schema_Diary"],
            44: ["Schema_Diary"],
            45: ["Schema_Diary"],
            46: [],
            47: [],
            48: [],
            49: [],
            50: []
        }
    },
    "SCHEMA_GROUP": {
        "trouble_id": "SCHEMA_GROUP",
        "trouble_code_icd11": "6D60",
        "trouble_name": "Thérapie des Schémas (Groupe)",
        "default_total_sessions": 30,
        "phases": [
            {
                "phase_id": "phase_1_group_security",
                "phase_name": "Phase 1 : Sécurité, Connexion et Psychoéducation",
                "recommended_sessions": [1, 2, 3, 4, 5, 6],
                "assessments": [
                    { "tool_id": "YSQ", "required": true },
                    { "tool_id": "YPI", "required": true },
                    { "tool_id": "COMPENSATION", "required": true },
                    { "tool_id": "BDI", "required": true },
                    { "tool_id": "BAI", "required": true }
                ],
                "worksheets": ["Schema_Guide_Patient", "Schema_Diary"],
                "guides": ["Schema_Guide_Group_1"]
            },
            {
                "phase_id": "phase_2_mode_change",
                "phase_name": "Phase 2 : Changement des Modes et Travail Expérientiel",
                "recommended_sessions": Array.from({length: 18}, (_, i) => i + 7),
                "assessments": [],
                "worksheets": ["Schema_Test_Historique", "Schema_Fiche_Aide", "Schema_Diary"],
                "guides": ["Schema_Guide_Group_2"]
            },
            {
                "phase_id": "phase_3_termination",
                "phase_name": "Phase 3 : Briser les Patterns et Terminaison",
                "recommended_sessions": [25, 26, 27, 28, 29, 30],
                "assessments": [
                    { "tool_id": "YSQ", "required": true },
                    { "tool_id": "BDI", "required": true },
                    { "tool_id": "BAI", "required": true }
                ],
                "worksheets": ["Schema_Diary"],
                "guides": ["Schema_Guide_Group_3"]
            }
        ],
        "session_worksheets": {
            1: ["Schema_Guide_Patient", "Schema_Diary"],
            2: ["Schema_Guide_Patient", "Schema_Diary"],
            3: ["Schema_Guide_Patient", "Schema_Diary"],
            4: ["Schema_Guide_Patient", "Schema_Diary"],
            5: ["Schema_Guide_Patient", "Schema_Diary"],
            6: ["Schema_Guide_Patient", "Schema_Diary"],
            ...Object.fromEntries(Array.from({length: 18}, (_, i) => [i + 7, ["Schema_Test_Historique", "Schema_Fiche_Aide", "Schema_Diary"]])),
            25: ["Schema_Diary"],
            26: ["Schema_Diary"],
            27: ["Schema_Diary"],
            28: ["Schema_Diary"],
            29: ["Schema_Diary"],
            30: ["Schema_Diary"]
        }
    }
};
