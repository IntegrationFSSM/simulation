/* =========================================
   Ory+ | TLU Module — Protocol Definitions
   ========================================= */

window.PROTOCOLS_DB = window.PROTOCOLS_DB || {};

window.PROTOCOLS_DB["TLU_INDIVIDUEL"] = {
    trouble_id: "TLU_INDIVIDUEL",
    trouble_name: "Troubles Liés à l'Usage de Substances (Individuel)",
    default_total_sessions: 16,
    phases: [
        {
            phase_id: "tlu_phase_1_initial",
            phase_name: "Phase 1 : Se préparer et planifier le changement (Alliance & Décision)",
            recommended_sessions: [1, 2, 3],
            assessments: [
                { tool_id: "AUDIT", required: true },
                { tool_id: "DAST_10", required: true },
                { tool_id: "CAGE", required: false }
            ],
            worksheets: ["TLU_Conceptualisation", "TLU_RegistreActivites"],
            guides: ["TLU_Guide_Triage", "TLU_Guide_Suivi", "TLU_Guide_1", "TLU_Guide_2"]
        },
        {
            phase_id: "tlu_phase_2_tcc",
            phase_name: "Phase 2 : Stratégies cognitivo-comportementales (Régulation & Abstinence)",
            recommended_sessions: [4, 5, 6, 7, 8],
            assessments: [
                { tool_id: "BAM_IOP", required: true }
            ],
            worksheets: ["TLU_AnalyseFonctionnelle", "TLU_PlanificationActivites"],
            guides: ["TLU_Guide_3", "TLU_Guide_4"]
        },
        {
            phase_id: "tlu_phase_3_restructuration",
            phase_name: "Phase 3 : Restructuration Cognitive (Croyances permissives)",
            recommended_sessions: [9, 10, 11, 12, 13],
            assessments: [
                { tool_id: "BAM_IOP", required: true }
            ],
            worksheets: ["TLU_GrilleBeck"],
            guides: ["TLU_Guide_5"]
        },
        {
            phase_id: "tlu_phase_4_maintien",
            phase_name: "Phase 4 : Maintenir le changement et prévention de la rechute",
            recommended_sessions: [14, 15, 16],
            assessments: [
                { tool_id: "BAM_R", required: true },
                { tool_id: "BAM_IOP", required: false }
            ],
            worksheets: ["TLU_ResumeTherapie"],
            guides: ["TLU_Guide_6"]
        }
    ]
};

window.PROTOCOLS_DB["TLU_GROUP"] = {
    trouble_id: "TLU_GROUP",
    trouble_name: "Entraînement des Compétences Addictions (Groupe)",
    default_total_sessions: 16,
    phases: [
        {
            phase_id: "tlu_group_phase_1",
            phase_name: "Module 1 : Motivation et Tolérance à la Détresse (Craving)",
            recommended_sessions: [1, 2, 3, 4],
            assessments: [
                { tool_id: "BAM_IOP", required: true }
            ],
            worksheets: ["TLU_AnalyseFonctionnelle"],
            guides: ["TLU_Guide_Grp1"]
        },
        {
            phase_id: "tlu_group_phase_2",
            phase_name: "Module 2 : Efficacité Interpersonnelle (Affirmation et Refus)",
            recommended_sessions: [5, 6, 7, 8],
            assessments: [
                { tool_id: "BAM_IOP", required: true }
            ],
            worksheets: ["TLU_PlanificationActivites"],
            guides: ["TLU_Guide_Grp2"]
        },
        {
            phase_id: "tlu_group_phase_3",
            phase_name: "Module 3 : Régulation Émotionnelle (Réévaluation)",
            recommended_sessions: [9, 10, 11, 12],
            assessments: [
                { tool_id: "BAM_IOP", required: true }
            ],
            worksheets: ["TLU_GrilleBeck"],
            guides: ["TLU_Guide_5"]
        },
        {
            phase_id: "tlu_group_phase_4",
            phase_name: "Module 4 : Prévention de la Rechute (Maintien)",
            recommended_sessions: [13, 14, 15, 16],
            assessments: [
                { tool_id: "BAM_R", required: true }
            ],
            worksheets: ["TLU_ResumeTherapie"],
            guides: ["TLU_Guide_6"]
        }
    ]
};
