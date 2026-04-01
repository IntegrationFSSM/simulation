window.PROTOCOLS_DB = window.PROTOCOLS_DB || {};

window.PROTOCOLS_DB["DEPRESSION_INDIVIDUEL"] = {
    "trouble_id": "DEPRESSION_INDIVIDUEL",
    "trouble_code_icd11": "6A70",
    "trouble_name": "Thérapie Individuelle (Dépression)",
    "default_total_sessions": 12,
    "phases": [
        {
            "phase_id": "indiv_phase_A",
            "phase_name": "Phase A : Triage, Sécurité et Psychoéducation",
            "recommended_sessions": [1],
            "assessments": [
                { "tool_id": "PHQ_9", "required": true },
                { "tool_id": "BDI", "required": true },
                { "tool_id": "BAI", "required": true }
            ],
            "worksheets": ["DEP_Indiv_Contrat_Non_Suicide"],
            "guides": ["DEP_Indiv_Manuel_Patient"]
        },
        {
            "phase_id": "indiv_phase_B1",
            "phase_name": "Phase B : Auto-thérapie quotidienne (Activation)",
            "recommended_sessions": [2, 3],
            "assessments": [],
            "worksheets": ["DEP_Grp_Registre_Activites"],
            "guides": []
        },
        {
            "phase_id": "indiv_phase_B2",
            "phase_name": "Phase B : Auto-thérapie quotidienne (Restructuration)",
            "recommended_sessions": [4, 5, 6, 7, 8, 9, 10],
            "assessments": [],
            "worksheets": ["DEP_Grp_Registre_Activites", "DEP_Grp_Tableau_Pensees", "DEP_Grp_Remettre_Question"],
            "guides": []
        },
        {
            "phase_id": "indiv_phase_C",
            "phase_name": "Phase C : Maintien et Prévention des rechutes",
            "recommended_sessions": [11, 12],
            "assessments": [
                { "tool_id": "PHQ_9", "required": true },
                { "tool_id": "BDI", "required": true }
            ],
            "worksheets": ["DEP_Grp_Resume_Therapie", "DEP_Grp_Plan_Rechute"],
            "guides": []
        }
    ],
    "session_worksheets": {}
};

window.PROTOCOLS_DB["DEPRESSION_GROUP"] = {
    "trouble_id": "DEPRESSION_GROUP",
    "trouble_code_icd11": "6A70",
    "trouble_name": "Trouble Dépressif Majeur (Groupe)",
    "default_total_sessions": 12,
    "phases": [
        {
            "phase_id": "mod_1_foundations",
            "phase_name": "Module 1 : Fondations (Groupe)",
            "recommended_sessions": [1],
            "assessments": [],
            "worksheets": [],
            "guides": ["DEP_Grp_Manuel_Groupe"]
        },
        {
            "phase_id": "mod_2_activation",
            "phase_name": "Module 2 : Activation Comportementale (Groupe)",
            "recommended_sessions": [2, 3],
            "assessments": [],
            "worksheets": ["DEP_Grp_Planification_Activites"],
            "guides": ["DEP_Grp_Guide_Activation", "DEP_Grp_Liste_Activites"]
        },
        {
            "phase_id": "mod_3_cognition",
            "phase_name": "Module 3 : Restructuration Cognitive (Groupe)",
            "recommended_sessions": [4, 5, 6],
            "assessments": [],
            "worksheets": ["DEP_Grp_Tableau_Pensees", "DEP_Grp_Remettre_Question"],
            "guides": ["DEP_Grp_Guide_Cognitif", "DEP_Grp_Biais_Interpretation", "DEP_Grp_Metaphore_Tribunal"]
        },
        {
            "phase_id": "mod_4_coping",
            "phase_name": "Module 4 : Résolution de Problèmes & Survie (Groupe)",
            "recommended_sessions": [7, 8],
            "assessments": [
                { "tool_id": "PHQ_9", "required": false, "recurrence": "session_8" }
            ],
            "worksheets": ["DEP_Grp_Resolution_Problemes"],
            "guides": ["DEP_Grp_Affirmation_Soi"]
        },
        {
            "phase_id": "mod_5_schemas",
            "phase_name": "Module 5 : Croyances Fondamentales & Schémas (Groupe)",
            "recommended_sessions": [9, 10],
            "assessments": [],
            "worksheets": ["DEP_Grp_Fleche_Descendante"],
            "guides": []
        },
        {
            "phase_id": "mod_6_closing",
            "phase_name": "Module 6 : Prévention des Rechutes & Clôture (Groupe)",
            "recommended_sessions": [11, 12],
            "assessments": [
                { "tool_id": "PHQ_9", "required": true },
                { "tool_id": "BDI", "required": true }
            ],
            "worksheets": ["DEP_Grp_Resume_Therapie", "DEP_Grp_Plan_Rechute"],
            "guides": ["DEP_Grp_Cloture_Groupe"]
        }
    ],
    "session_worksheets": {}
};
