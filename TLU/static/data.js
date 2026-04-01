/* =========================================
   Ory+ | TLU Module — Data & Scales
   ========================================= */

const SCALES = {
    AUDIT: {
        name: "AUDIT (Alcohol Use Disorders Identification Test)",
        abbr: "AUDIT",
        description: "Évalue la consommation d'alcool, les comportements de dépendance et les problèmes liés.",
        items: [
            "1. À quelle fréquence vous arrive-t-il de consommer des boissons contenant de l'alcool ?",
            "2. Combien de verres standard buvez-vous un jour typique où vous buvez de l'alcool ?",
            "3. À quelle fréquence buvez-vous six verres ou plus lors d'une même occasion ?",
            "4. (Dernière année) Incapable d'arrêter de boire une fois commencé ?",
            "5. (Dernière année) Omis de faire ce qui était attendu à cause de la boisson ?",
            "6. (Dernière année) Besoin d'un premier verre le matin pour vous remettre en forme ?",
            "7. (Dernière année) Sentiment de culpabilité ou de remords après avoir bu ?",
            "8. (Dernière année) Incapable de vous rappeler la soirée précédente ?",
            "9. Vous êtes-vous déjà blessé ou avez-vous blessé quelqu'un sous l'effet de l'alcool ?",
            "10. Un proche ou médecin s'est-il déjà inquiété de votre consommation ?"
        ],
        options: [
            "0 (Jamais / 1 à 2 verres)",
            "1 (Moins d'une fois par mois / 3 à 4)",
            "2 (Une fois par mois / 5 à 6)",
            "3 (Une fois par semaine / 7 à 9)",
            "4 (Presque tous les jours / 10 ou plus)"
        ],
        maxScore: 40,
        interpretation: [
            { min: 0, max: 7, label: "Risque Faible", color: "success" },
            { min: 8, max: 15, label: "Risque Moyen / Consommation à Risque", color: "warning" },
            { min: 16, max: 19, label: "Risque Élevé / Consommation Nocive", color: "danger" },
            { min: 20, max: 40, label: "Dépendance Probable", color: "danger" }
        ]
    },
    DAST_10: {
        name: "DAST-10 (Drug Abuse Screening Test)",
        abbr: "DAST-10",
        description: "Évalue l'abus de drogues (cannabis, cocaïne, opiacés) à l'exclusion de l'alcool et du tabac.",
        items: [
            "1. Avez-vous consommé des drogues autres que médicales ?",
            "2. Prenez-vous plus d’une drogue à la fois ?",
            { text: "3. Êtes-vous toujours en mesure d'arrêter de consommer des drogues lorsque vous le souhaitez ?", inverseScore: true },
            "4. Avez-vous déjà eu des baisses de mémoire / flash-back suite aux drogues ?",
            "5. Vous sentez-vous déjà coupable à propos de votre consommation ?",
            "6. Votre entourage se plaint-il de votre consommation ?",
            "7. Avez-vous négligé votre famille à cause de la drogue ?",
            "8. Avez-vous été impliqué dans des gestes illégaux pour obtenir des drogues ?",
            "9. Éprouvez-vous des maux physiques de sevrage (nausées, tremblements) ?",
            "10. Avez-vous déjà eu des problèmes médicaux dus à votre consommation ?"
        ],
        options: ["Non (0)", "Oui (1)"],
        maxScore: 10,
        interpretation: [
            { min: 0, max: 0, label: "Aucun problème", color: "success" },
            { min: 1, max: 2, label: "Niveau bas", color: "success" },
            { min: 3, max: 5, label: "Niveau intermédiaire", color: "warning" },
            { min: 6, max: 8, label: "Niveau substantiel", color: "danger" },
            { min: 9, max: 10, label: "Niveau sévère", color: "danger" }
        ]
    },
    CAGE: {
        name: "Dépistage CAGE (Cut down, Annoyed, Guilty, Eye-opener)",
        abbr: "CAGE",
        items: [
            "1. Avez-vous déjà ressenti le besoin de diminuer votre consommation ?",
            "2. Votre entourage vous a-t-il déjà fait des remarques sur votre consommation ?",
            "3. Avez-vous déjà eu l'impression que vous buviez trop (culpabilité) ?",
            "4. Avez-vous déjà eu besoin de consommer dès le matin pour vous sentir en forme ?"
        ],
        options: ["Non (0)", "Oui (1)"],
        maxScore: 4,
        interpretation: [
            { min: 0, max: 1, label: "Négatif", color: "success" },
            { min: 2, max: 4, label: "Positif (Présence possible d'addiction clinique)", color: "danger" }
        ]
    },
    BAM_IOP: {
        name: "BAM-IOP (Brief Addiction Monitor - 7 Jours)",
        abbr: "BAM-IOP",
        description: "Suivi continu hebdomadaire (17 items) : santé, usage ciblé et facteurs de protection.",
        items: [
            { text: "1. Comment évaluez-vous votre santé physique générale ?", options: ["Mauvaise (0)", "Moyenne (1)", "Bonne (2)", "Très bonne (3)", "Excellente (4)"], inverseScore: true },
            { text: "2. Problèmes de sommeil (difficulté à s'endormir ou rester endormi) ?", options: ["Pas du tout (0)", "1-2 nuits (1)", "3-4 nuits (2)", "5-6 nuits (3)", "Toutes les nuits (4)"] },
            { text: "3. Vous êtes-vous senti déprimé, triste ou désespéré ?", options: ["Pas du tout (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "Tous les jours (4)"] },
            { text: "4. Vous êtes-vous senti anxieux, nerveux ou tendu ?", options: ["Pas du tout (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "Tous les jours (4)"] },
            { text: "5. Jours de consommation d'ALCOOL (toute quantité) :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "6. Jours de consommation EXCESSIVE d'alcool (5 verres ou +) :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "7. Jours de consommation de CANNABIS :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "8. Jours de consommation de SÉDATIFS / Tranquillisants :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "9. Jours de consommation de COCAÏNE / Crack :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "10. Jours de consommation d'OPIACÉS (Héroïne, antidouleurs illicites) :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "11. Jours de consommation d'AUTRES DROGUES (Stimulants, inhalants, etc.) :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "12. Jours où vous avez été dans des situations à haut risque (lieux, personnes) :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"] },
            { text: "13. Intensité de votre ENVIE IMPÉRIEUSE (Craving) de consommer :", options: ["Pas du tout (0)", "Un peu (1)", "Moyennement (2)", "Beaucoup (3)", "Extrêmement (4)"] },
            { text: "14. Quelle est votre confiance en votre capacité à rester abstinent ?", options: ["Pas du tout (0)", "Un peu (1)", "Moyennement (2)", "Beaucoup (3)", "Extrêmement (4)"], inverseScore: true },
            { text: "15. Jours travaillés, à l'école, ou en bénévolat :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"], inverseScore: true },
            { text: "16. Jours en contact avec votre famille / personnes soutenantes :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"], inverseScore: true },
            { text: "17. Jours de participation à des groupes d'entraide (ex: AA/NA) :", options: ["0 jours (0)", "1-2 jours (1)", "3-4 jours (2)", "5-6 jours (3)", "7 jours (4)"], inverseScore: true }
        ],
        options: ["0", "1", "2", "3", "4"],
        maxScore: 68,
        interpretation: [
            { min: 0, max: 20, label: "Indice global faussement bas ou protection maximale", color: "success" },
            { min: 21, max: 35, label: "Vulnérabilité légère", color: "success" },
            { min: 36, max: 50, label: "Risque modéré - Consolidation requise", color: "warning" },
            { min: 51, max: 68, label: "Risque élevé de rechute", color: "danger" }
        ]
    },
    BAM_R: {
        name: "BAM-R (Brief Addiction Monitor - Bilan 30 Jours)",
        abbr: "BAM-R",
        items: [
            { text: "1. (30 Jours) Comment évaluez-vous votre santé physique générale ?", options: ["Mauvaise (0)", "Moyenne (1)", "Bonne (2)", "Très bonne (3)", "Excellente (4)"], inverseScore: true },
            { text: "2. (30 Jours) Problèmes de sommeil (s'endormir/rester endormi) ?", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "3. (30 Jours) Vous êtes-vous senti déprimé, triste ou désespéré ?", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "4. (30 Jours) Vous êtes-vous senti anxieux, nerveux ou tendu ?", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "5. (30 Jours) Consommation d'ALCOOL (toute quantité) :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "6. (30 Jours) Consommation EXCESSIVE d'alcool (5 verres ou +) :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "7. (30 Jours) Consommation de CANNABIS :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "8. (30 Jours) Consommation de SÉDATIFS / Tranquillisants :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "9. (30 Jours) Consommation de COCAÏNE / Crack :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "10. (30 Jours) Consommation d'OPIACÉS (Héroïne, antidouleurs illicites) :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "11. (30 Jours) Consommation d'AUTRES DROGUES (Stimulants, inhalants, etc.) :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "12. (30 Jours) Situations à haut risque (lieux, personnes) :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"] },
            { text: "13. (30 Jours) Intensité de votre ENVIE IMPÉRIEUSE (Craving) de consommer :", options: ["Pas du tout (0)", "Un peu (1)", "Moyennement (2)", "Beaucoup (3)", "Extrêmement (4)"] },
            { text: "14. Quelle est votre confiance en votre capacité à rester abstinent ?", options: ["Pas du tout (0)", "Un peu (1)", "Moyennement (2)", "Beaucoup (3)", "Extrêmement (4)"], inverseScore: true },
            { text: "15. (30 Jours) Jours travaillés, à l'école, ou en bénévolat :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"], inverseScore: true },
            { text: "16. (30 Jours) Jours en contact avec votre famille / personnes soutenantes :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"], inverseScore: true },
            { text: "17. (30 Jours) Jours de participation à des groupes d'entraide (ex: AA/NA) :", options: ["0j (0)", "1-7j (1)", "8-15j (2)", "16-25j (3)", "26-30j (4)"], inverseScore: true }
        ],
        options: ["0", "1", "2", "3", "4"],
        maxScore: 68,
        interpretation: [
            { min: 0, max: 20, label: "Indice global faussement bas ou protection maximale", color: "success" },
            { min: 21, max: 35, label: "Vulnérabilité légère", color: "success" },
            { min: 36, max: 50, label: "Risque modéré - Consolidation requise", color: "warning" },
            { min: 51, max: 68, label: "Risque élevé de rechute", color: "danger" }
        ]
    }
};

window.ALL_SCALES = SCALES;

window.simulationData = {
    scales: SCALES,
    patients: [
        {
            id: 'tlu-01',
            name: 'Marc, 42 ans',
            age: 42,
            diagnosis: 'Trouble de l’usage de l’alcool, sévère (DSM-5)',
            status: 'En évaluation',
            currentSession: 1,
            totalSessions: 16,
            description: "Marc est référé suite à un ultimatum de son employeur en raison de retards répétés. Il consomme 6 à 8 verres d'alcool fort par soir pour 'gérer le stress' professionnel. Il nie la gravité de son problème, arguant qu'il est fonctionnel la journée.",
            avatar: 'male',
            sessionScores: {}
        },
        {
            id: 'tlu-02',
            name: 'Sonia, 28 ans',
            age: 28,
            diagnosis: 'Trouble de l’usage des stimulants (Cocaïne), modéré',
            status: 'Suivi de Groupe en cours',
            currentSession: 5,
            totalSessions: 16,
            description: "Sonia participe au programme de groupe après une cure de désintoxication. Elle peine à gérer les 'craving' en situation sociale (fêtes) et manque d'affirmation de soi pour refuser la substance face à ses anciens amis.",
            avatar: 'female',
            sessionScores: {
                2: {
                    BAM_IOP: { score: 14, interpretation: window.ALL_SCALES.BAM_IOP.interpretation[1], answers: [] }
                }
            }
        }
    ],
    getPatient: function(id) {
        return this.patients.find(p => p.id === id);
    },
    getSessionsForPatient: function(patient) {
        let sessions = [];
        for (let i = 1; i <= patient.totalSessions; i++) {
            sessions.push({ no: i, completed: i < patient.currentSession, active: i === patient.currentSession });
        }
        return sessions;
    }
};
