window.PROTOCOLS_DB = {
    "TRAUMA": {
        "trouble_id": "TRAUMA",
        "trouble_name": "Trauma (ESA / TSPT)",
        "default_total_sessions": 16,
        "phases": [
            {
                "phase_id": "phase_0_evaluation",
                "phase_name": "Phase 0 : Évaluation et Triage",
                "recommended_sessions": [1, 2],
                "assessments": ["PCL5", "PDEQ", "IES_R", "BDI", "BAI"],
                "worksheets": ["LEC_5"],
                "guides": ["Guide_ESA"]
            },
            {
                "phase_id": "phase_1_stabilisation",
                "phase_name": "Phase 1 : Stabilisation (ESA) — 50-60 min",
                "recommended_sessions": [3, 4, 5, 6],
                "assessments": ["PCL5"],
                "worksheets": ["Echelle_Gradation_Emotions", "References_Patient"],
                "guides": ["Guide_ESA"]
            },
            {
                "phase_id": "phase_2a_cognitive",
                "phase_name": "Phase 2A : Restructuration Cognitive",
                "recommended_sessions": [7, 8, 9],
                "assessments": ["PCL5"],
                "worksheets": ["Tarte_Hypotheses", "Restructuration_Socratique", "Grille_Auto_Observation_RC"],
                "guides": ["Guide_TSPT"]
            },
            {
                "phase_id": "phase_2b_exposition",
                "phase_name": "Phase 2B : Exposition Prolongée — Séances de 90 min",
                "recommended_sessions": [10, 11, 12, 13, 14],
                "assessments": ["PCL5", "IES_R"],
                "worksheets": ["Hierarchie_InVivo", "Grille_Exposition_InVivo", "Hierarchie_Points_Chauds", "Grille_NAS_Imagination"],
                "guides": ["Guide_Exposition"]
            },
            {
                "phase_id": "phase_2c_consolidation",
                "phase_name": "Phase 2C : Consolidation et Prévention des Rechutes",
                "recommended_sessions": [15, 16],
                "assessments": ["PCL5", "BDI", "BAI"],
                "worksheets": ["Resume_Therapie", "Fiche_Prevention_Rechutes"],
                "guides": ["Guide_TSPT_Brochure"]
            }
        ]
    }
};
