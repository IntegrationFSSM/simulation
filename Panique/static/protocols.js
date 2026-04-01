window.PROTOCOLS_DB = {
    "PANIQUE": {
        "trouble_id": "PANIQUE",
        "trouble_name": "Trouble Panique et Agoraphobie",
        "default_total_sessions": 14,
        "phases": [
            {
                "phase_id": "phase_1_baseline",
                "phase_name": "Phase 1 : Évaluation et Profilage (Ligne de base)",
                "recommended_sessions": [1, 2],
                "assessments": ["BURNS", "PANIC_OBS"],
                "worksheets": [],
                "guides": ["Guide_Manuel_Panique"]
            },
            {
                "phase_id": "phase_2_physio",
                "phase_name": "Phase 2 : Gestion Physiologique",
                "recommended_sessions": [3, 4],
                "assessments": ["BURNS", "PANIC_OBS"],
                "worksheets": ["Exercices_Respiratoires"],
                "guides": ["Guide_Respiration"]
            },
            {
                "phase_id": "phase_3_interoceptive",
                "phase_name": "Phase 3 : Exposition Interoceptive",
                "recommended_sessions": [5, 6, 7],
                "assessments": ["BURNS", "PANIC_OBS"],
                "worksheets": ["Grille_Identification_Interoceptive"],
                "guides": ["Guide_Courbes"]
            },
            {
                "phase_id": "phase_4_invivo",
                "phase_name": "Phase 4 : Exposition In-Vivo (Agoraphobie)",
                "recommended_sessions": [8, 9, 10, 11, 12, 13],
                "assessments": ["BURNS", "PANIC_OBS"],
                "worksheets": ["Inventaire_Mobilite_Agoraphobie", "Tracker_Exposition_Habituation"],
                "guides": ["Guide_Exposition_InVivo"]
            },
            {
                "phase_id": "phase_5_relapse",
                "phase_name": "Phase 5 : Prévention des Rechutes",
                "recommended_sessions": [14],
                "assessments": ["BURNS", "PANIC_OBS"],
                "worksheets": ["Plan_Sortie_Urgence"],
                "guides": ["Guide_Prevention_Rechute"]
            }
        ]
    }
};
