window.PROTOCOLS_DB = {
    // PARCOURS A: TCCp Individuelle (16 Sessions)
    "DSM5_SCHIZO": {
        "trouble_id": "DSM5_SCHIZO",
        "trouble_code_icd11": "6A20",
        "trouble_name": "Psychose et Schizophrénie",
        "default_total_sessions": 16,
        "phases": [
            {
                "phase_id": "phase_1_engagement",
                "phase_name": "Phase 1 : Engagement & Normalisation",
                "recommended_sessions": [1, 2, 3, 4],
                "assessments": [
                    { "tool_id": "PSYRATS", "required": true },
                    { "tool_id": "CDSS", "required": true },
                    { "tool_id": "CHOICE", "required": true }
                ],
                "worksheets": [],
                "guides": ["Psychose_Guide_1", "Modele_Vuln_Stress", "Fiche_105_Observer_Emotions"]
            },
            {
                "phase_id": "phase_2_formulation",
                "phase_name": "Phase 2 : Formulation & Gestion des Crises",
                "recommended_sessions": [5, 6, 7, 8],
                "assessments": [],
                "worksheets": [],
                "guides": ["Psychose_Guide_2", "Fiche_113_Survie_Crise"]
            },
            {
                "phase_id": "phase_3_restructuration",
                "phase_name": "Phase 3 : Restructuration Cognitive & Spécificités",
                "recommended_sessions": [9, 10, 11, 12, 13],
                "assessments": [
                    { "tool_id": "PSYRATS", "required": true },
                    { "tool_id": "CDSS", "required": true }
                ],
                "worksheets": [],
                "guides": ["Psychose_Guide_3", "Fiche_123_Pleine_Conscience_Pensees"]
            },
            {
                "phase_id": "phase_4_consolidation",
                "phase_name": "Phase 4 : Consolidation & Prévention des Rechutes",
                "recommended_sessions": [14, 15, 16],
                "assessments": [
                    { "tool_id": "CHOICE", "required": true },
                    { "tool_id": "PSYRATS", "required": true }
                ],
                "worksheets": [],
                "guides": ["Psychose_Guide_4"]
            }
        ],
        "session_worksheets": {
            1: ["Fiche_104_Journal"],
            2: ["Boussole_Valeurs", "Fiche_104_Journal"],
            3: ["Boussole_Valeurs", "Fiche_104_Journal"],
            4: ["Fiche_104_Journal"],
            5: ["Grille_ABC", "Fiche_112_PLEASE", "Fiche_104_Journal"],
            6: ["Grille_ABC", "Fiche_112_PLEASE", "Fiche_104_Journal"],
            7: ["Grille_ABC", "Fiche_112_PLEASE", "Fiche_104_Journal"],
            8: ["Grille_ABC", "Fiche_104_Journal"],
            9: ["Tarte_Probabilites", "Fiche_104_Journal"],
            10: ["Tarte_Probabilites", "Fiche_106_Verifier_Faits", "Fiche_104_Journal"],
            11: ["Fiche_106_Verifier_Faits", "Fiche_104_Journal"],
            12: ["Fiche_104_Journal"],
            13: ["Fiche_104_Journal"],
            14: ["Fiche_108_Resolution_Problemes", "Fiche_104_Journal"],
            15: ["Fiche_111_Anticiper", "Fiche_104_Journal"],
            16: ["Plan_Anti_Rechute"]
        }
    },

    // PARCOURS B: Modules de Groupe — 3ème Vague (18 Sessions)
    "PSYCHOSE_GROUP": {
        "trouble_id": "PSYCHOSE_GROUP",
        "trouble_code_icd11": "6A20",
        "trouble_name": "Psychose — Modules de Groupe (3ème Vague)",
        "default_total_sessions": 18,
        "phases": [
            {
                "phase_id": "grp_module_1_act",
                "phase_name": "Module 1 : Mini-Groupe ACT — Acceptation et Engagement (4 séances)",
                "recommended_sessions": [1, 2, 3, 4],
                "assessments": [
                    { "tool_id": "PSYRATS", "required": true },
                    { "tool_id": "CHOICE", "required": true }
                ],
                "worksheets": [],
                "guides": ["GRP_Guide_ACT"]
            },
            {
                "phase_id": "grp_module_2_tfc",
                "phase_name": "Module 2 : Mini-Groupe TFC — Thérapie Fondée sur la Compassion (6 séances)",
                "recommended_sessions": [5, 6, 7, 8, 9, 10],
                "assessments": [
                    { "tool_id": "PSYRATS", "required": true }
                ],
                "worksheets": [],
                "guides": ["GRP_Guide_TFC"]
            },
            {
                "phase_id": "grp_module_3_tcd",
                "phase_name": "Module 3 : Mini-Groupe TCD Adaptée (8 séances)",
                "recommended_sessions": [11, 12, 13, 14, 15, 16, 17, 18],
                "assessments": [
                    { "tool_id": "PSYRATS", "required": true },
                    { "tool_id": "CDSS", "required": true },
                    { "tool_id": "CHOICE", "required": true }
                ],
                "worksheets": [],
                "guides": ["GRP_Guide_TCD"]
            }
        ],
        "session_worksheets": {
            1: ["ACT_Matrice"],
            2: ["ACT_Passagers_Autobus", "Fiche_123_Pleine_Conscience_Pensees"],
            3: ["ACT_Tir_Corde"],
            4: ["ACT_Boussole_Valeurs"],
            5: ["TFC_3_Cercles"],
            6: ["TFC_3_Cercles"],
            7: ["TFC_Respiration"],
            8: ["TFC_Respiration"],
            9: ["TFC_Lettre_Compassion"],
            10: ["TFC_Lettre_Compassion"],
            11: ["TCD_Pleine_Conscience"],
            12: ["Fiche_113_Survie_Crise"],
            13: ["Fiche_113_Survie_Crise"],
            14: ["Fiche_104_Journal", "Fiche_105_Observer_Emotions", "Fiche_106_Verifier_Faits"],
            15: ["Fiche_104_Journal", "Fiche_105_Observer_Emotions", "Fiche_106_Verifier_Faits"],
            16: ["Fiche_111_Anticiper", "Fiche_112_PLEASE"],
            17: ["Fiche_111_Anticiper", "Fiche_112_PLEASE"],
            18: ["Fiche_108_Resolution_Problemes"]
        }
    }
};
