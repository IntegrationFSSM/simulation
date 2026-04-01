window.PROTOCOLS_DB = {
    "TOC": {
        "trouble_id": "TOC",
        "trouble_name": "Trouble Obsessionnel Compulsif (EPR)",
        "default_total_sessions": 20,
        "phases": [
            {
                "phase_id": "phase_0_evaluation",
                "phase_name": "Phase 0 : Évaluation et Triage",
                "recommended_sessions": [1, 2],
                "assessments": ["YBOCS", "DSM5_TOC", "BDI", "QEP"],
                "worksheets": ["Index_Symptomes_TOC", "Analyse_Fonctionnelle_TOC"],
                "guides": ["Guide_TOC_Modele"]
            },
            {
                "phase_id": "phase_1_restructuration",
                "phase_name": "Phase 1 : Psychoéducation et Restructuration Cognitive",
                "recommended_sessions": [3, 4, 5],
                "assessments": ["YBOCS"],
                "worksheets": ["Tableau_Pensees_Dysfonctionnelles"],
                "guides": ["Guide_TOC_Cognitif"]
            },
            {
                "phase_id": "phase_2a_epr_imagination",
                "phase_name": "Phase 2A : Exposition en Imagination (Rituels mentaux/Craintes catastrophiques)",
                "recommended_sessions": [6, 7, 8],
                "assessments": ["YBOCS"],
                "worksheets": ["Formulaire_Scenario", "Grille_NAS_Imagination"],
                "guides": ["Guide_TOC_EPR"]
            },
            {
                "phase_id": "phase_2b_epr_invivo",
                "phase_name": "Phase 2B : Exposition In-Vivo avec Prévention de la Réponse (EIVPR)",
                "recommended_sessions": [9, 10, 11, 12, 13, 14, 15, 16],
                "assessments": ["YBOCS", "DSM5_TOC"],
                "worksheets": ["Registre_Obsessions", "Fiche_OptEx", "Grille_EPR_InVivo"],
                "guides": ["Guide_TOC_EPR"]
            },
            {
                "phase_id": "phase_3_consolidation",
                "phase_name": "Phase 3 : Consolidation et Prévention des Rechutes",
                "recommended_sessions": [17, 18, 19, 20],
                "assessments": ["YBOCS", "DSM5_TOC", "BDI", "QEP"],
                "worksheets": ["Bilan_Therapie_TOC", "Prevention_Rechutes_TOC"],
                "guides": ["Guide_TOC_Maintien"]
            }
        ]
    }
};
