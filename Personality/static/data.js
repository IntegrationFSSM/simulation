/**
 * Ory+ TCC Simulator — Data Layer
 * Protocole TPL (DBT / TCD)
 */

const SCALES = {
    DERS: {
        name: "DERS-16 (Difficultés de Régulation Émotionnelle)",
        abbr: "DERS",
        items: [
            "Je suis clair(e) sur ce que je ressens.",
            "Je fais attention à mes émotions.",
            "Mes émotions m'envahissent et m'échappent.",
            "Quand je suis bouleversé(e), je crains de rester comme ça longtemps.",
            "Quand je suis bouleversé(e), j'ai peur de perdre le contrôle.",
            "Quand je suis bouleversé(e), j'ai l'impression que je vais craquer.",
            "Quand je suis bouleversé(e), j'ai du mal à me concentrer.",
            "Quand je suis bouleversé(e), j'ai du mal à finir ce que je fais.",
            "Quand je suis bouleversé(e), je n'arrive pas à penser à autre chose.",
            "Quand je suis bouleversé(e), je me comporte différemment.",
            "Quand je suis bouleversé(e), je n'accepte pas comment je me sens.",
            "Quand je suis bouleversé(e), j'ai honte de me sentir ainsi.",
            "Quand je suis bouleversé(e), je suis en colère contre moi-même.",
            "Quand je suis bouleversé(e), je perds espoir.",
            "Quand je suis bouleversé(e), je crois que rien ne peut m'aider.",
            "Quand je suis bouleversé(e), je mets du temps à m'en remettre."
        ],
        options: ["Presque jamais (1)", "Parfois (2)", "La moitié du temps (3)", "La plupart du temps (4)", "Presque toujours (5)"],
        maxScore: 64,
        interpretation: [
            { min: 16, max: 35, label: "Bonne régulation", color: "success" },
            { min: 36, max: 50, label: "Difficultés modérées", color: "warning" },
            { min: 51, max: 64, label: "Désrégulation sévère", color: "danger" }
        ]
    },
    CRISIS: {
        name: "Indicateurs d'Urgence et de Crise",
        abbr: "URGENCES",
        items: [
            "Nombre de recours à l'hospitalisation depuis la dernière évaluation :",
            "Nombre de visites aux urgences psychiatriques/médicales :"
        ],
        options: ["0 (0)", "1 visite/hospit. (1)", "2 visites/hospit. (2)", "3+ visites/hospit. (3)"],
        maxScore: 6,
        interpretation: [
            { min: 0, max: 0, label: "Sécurité", color: "success" },
            { min: 1, max: 2, label: "Alerte", color: "warning" },
            { min: 3, max: 6, label: "Danger grave", color: "danger" }
        ]
    },

    // ==========================================
    // ÉCHELLES POUR THÉRAPIE DES SCHÉMAS
    // ==========================================
    YSQ: {
        name: "YSQ - Questionnaire des Schémas de Young (version abrégée)",
        abbr: "YSQ",
        items: [
            // Domaine 1 : Déconnexion et Rejet
            "Les gens n'ont pas été là pour répondre à mes besoins affectifs.",
            "Pendant longtemps, je n'ai eu personne sur qui compter pour des conseils et du soutien.",
            "La plupart du temps, je n'ai pas eu quelqu'un pour prendre soin de moi ou partager ses sentiments.",
            "J'ai peur que les gens que j'aime me quittent ou m'abandonnent.",
            "Je m'accroche aux gens proches de moi parce que j'ai peur qu'ils me quittent.",
            "Je sens que les gens vont finir par me quitter.",
            "Je ne fais pas confiance aux autres car je crains qu'ils me trahissent.",
            "Je soupçonne souvent les gens d'avoir des intentions cachées.",
            "C'est normal que les gens profitent les uns des autres.",
            "J'ai souvent le sentiment d'être déficient(e) ou pas à la hauteur.",
            "Si les autres me connaissaient vraiment, ils ne m'aimeraient pas.",
            "Je me sens indigne d'amour et d'attention de la part des autres.",
            "Je ne m'intègre pas avec les autres.",
            "Je suis fondamentalement différent(e) des autres gens.",
            "Je n'appartiens à aucun groupe ; je suis un(e) solitaire.",
            // Domaine 2 : Manque d'Autonomie et Performance
            "Je ne suis pas capable de m'en sortir seul(e) dans la vie quotidienne.",
            "Je me considère comme une personne dépendante, en ce qui concerne le fonctionnement quotidien.",
            "Je n'ai pas assez de bon sens pour me fier à mon propre jugement.",
            "Un malheur (financier, médical, criminel) peut frapper à n'importe quel moment.",
            "J'ai souvent peur qu'une catastrophe se produise.",
            "Je suis très inquiet(e) à propos de ma sécurité et de celle de mes proches.",
            "Je n'ai pas été capable de me séparer de mes parents comme les autres le font.",
            "Mes parents et moi avons tendance à nous mêler trop de la vie et des problèmes de chacun.",
            "Je n'ai pas développé une identité séparée de celle de mes parents.",
            "Je crois que je ne suis pas intelligent(e) dans mon travail.",
            "Je me sens incompétent(e) en ce qui concerne mes résultats.",
            "La plupart des gens sont plus compétents que moi dans les domaines du travail et de l'accomplissement.",
            // Domaine 3 : Limites Déficientes
            "J'ai beaucoup de mal à accepter un « non » comme réponse.",
            "Je suis spécial(e) et je ne devrais pas avoir à accepter les mêmes contraintes que les autres.",
            "Je déteste être contraint(e) ou empêché(e) de faire ce que je veux.",
            "J'ai beaucoup de mal à m'autodiscipliner.",
            "Je n'arrive pas à me forcer à faire des choses ennuyeuses ou routinières.",
            "Si je n'arrive pas facilement à atteindre un objectif, je deviens frustré(e) et j'abandonne.",
            // Domaine 4 : Orientation vers les Autres
            "Les besoins des autres passent avant les miens.",
            "Je suis tellement occupé(e) à m'occuper de tout le monde que j'ai peu de temps pour moi.",
            "J'ai toujours été celui (celle) qui écoute les problèmes des autres.",
            "Les autres me voient comme quelqu'un qui en fait trop pour les autres et pas assez pour soi.",
            "Je suis une bonne personne parce que je pense aux autres avant de penser à moi.",
            "Pour moi, être une bonne personne signifie que je dois me sacrifier.",
            "Je mets beaucoup l'accent sur l'approbation ou la reconnaissance des autres.",
            "Obtenir l'approbation des autres est plus important que ma propre satisfaction.",
            "Mon estime de moi dépend beaucoup de l'opinion des autres.",
            // Domaine 5 : Survigilance et Inhibition
            "Je ressens beaucoup de pression pour être performant(e) et atteindre des objectifs élevés.",
            "Je ne peux pas m'accorder de repos tant que tout n'est pas fini parfaitement.",
            "J'essaie de faire de mon mieux ; je n'accepte pas les résultats « assez bons ».",
            "Je m'efforce de ne pas montrer mes émotions négatives aux autres.",
            "Je ne peux pas m'empêcher de me contrôler dans l'expression de mes sentiments.",
            "Les gens me considèrent comme émotionnellement rigide.",
            "Si quelque chose de bien arrive, je m'inquiète de ce qui pourrait mal tourner ensuite.",
            "Même quand les choses vont bien, j'ai un sentiment que ça ne va pas durer.",
            "Je me concentre sur les aspects négatifs de la vie plutôt que sur les positifs.",
            "Les gens qui font des erreurs méritent d'être punis.",
            "Si je ne fais pas bien, je dois en subir les conséquences.",
            "Quand quelqu'un me fait du tort, je pense qu'il devrait être puni."
        ],
        options: ["Tout à fait faux (1)", "Plutôt faux (2)", "Légèrement vrai (3)", "Moyennement vrai (4)", "Plutôt vrai (5)", "Me décrit parfaitement (6)"],
        maxScore: 270,
        interpretation: [
            { min: 54, max: 130, label: "Schémas peu activés", color: "success" },
            { min: 131, max: 216, label: "Schémas modérément activés", color: "warning" },
            { min: 217, max: 270, label: "Schémas fortement activés", color: "danger" }
        ]
    },
    YPI: {
        name: "YPI - Questionnaire des Parents de Young",
        abbr: "YPI",
        items: [
            "Mon père (ou figure paternelle) était froid et distant avec moi.",
            "Ma mère (ou figure maternelle) était froide et distante avec moi.",
            "Mon père me critiquait souvent et me faisait sentir que je n'étais pas assez bien.",
            "Ma mère me critiquait souvent et me faisait sentir que je n'étais pas assez bien.",
            "Mon père me surprotégeait et ne me laissait pas devenir indépendant(e).",
            "Ma mère me surprotégeait et ne me laissait pas devenir indépendant(e).",
            "Mon père n'a pas su poser de limites ou de règles de discipline.",
            "Ma mère n'a pas su poser de limites ou de règles de discipline.",
            "Mon père utilisait souvent la punition, la honte ou la culpabilité pour me contrôler.",
            "Ma mère utilisait souvent la punition, la honte ou la culpabilité pour me contrôler.",
            "Mon père favorisait un autre membre de la famille par rapport à moi.",
            "Ma mère favorisait un autre membre de la famille par rapport à moi.",
            "Mon père m'envoyait le message que je devais être parfait(e).",
            "Ma mère m'envoyait le message que je devais être parfait(e).",
            "Mon père sacrifiait ses propres besoins pour ses enfants.",
            "Ma mère sacrifiait ses propres besoins pour ses enfants."
        ],
        options: ["Tout à fait faux (1)", "Plutôt faux (2)", "Légèrement vrai (3)", "Moyennement vrai (4)", "Plutôt vrai (5)", "Me décrit parfaitement (6)"],
        maxScore: 80,
        interpretation: [
            { min: 16, max: 38, label: "Environnement parental sain", color: "success" },
            { min: 39, max: 64, label: "Carences parentales modérées", color: "warning" },
            { min: 65, max: 96, label: "Carences parentales significatives", color: "danger" }
        ]
    },
    COMPENSATION: {
        name: "Questionnaire des Compensations et Évitements",
        abbr: "COMP",
        items: [
            "Quand je me sens menacé(e) émotionnellement, je me retire et me coupe de mes émotions.",
            "J'évite les situations qui pourraient déclencher des sentiments douloureux.",
            "Je préfère ne rien ressentir plutôt que de souffrir.",
            "Je m'occupe en permanence pour ne pas avoir à penser à mes émotions.",
            "Je consomme de la nourriture, de l'alcool ou du shopping pour me calmer.",
            "J'utilise l'humour, l'intellectualisation ou la rationalisation pour éviter de ressentir.",
            "Je me soumets aux demandes des autres, même si cela me fait du tort.",
            "J'ai du mal à dire non ou à exprimer mes besoins.",
            "Je laisse les autres prendre les décisions pour moi.",
            "J'essaie d'être parfait(e) pour compenser un sentiment d'inadéquation.",
            "Je contrôle les autres pour m'assurer qu'ils ne me quittent pas ou ne me trahissent pas.",
            "Je domine les interactions sociales pour ne pas me sentir vulnérable.",
            "J'adopte une attitude de supériorité ou de distance par autprotection.",
            "Je critique sévèrement les autres comme je me critique moi-même.",
            "Je suis agressif(ve) ou hostile quand je me sens menacé(e)."
        ],
        options: ["Jamais (1)", "Rarement (2)", "Parfois (3)", "Souvent (4)", "Très souvent (5)", "Toujours (6)"],
        maxScore: 90,
        interpretation: [
            { min: 15, max: 35, label: "Stratégies d'adaptation saines", color: "success" },
            { min: 36, max: 60, label: "Styles d'adaptation modérément dysfonctionnels", color: "warning" },
            { min: 61, max: 90, label: "Styles d'adaptation fortement dysfonctionnels", color: "danger" }
        ]
    },
    BDI: {
        name: "BDI-II (Inventaire de Dépression de Beck)",
        abbr: "BDI",
        items: [
            "Tristesse",
            "Pessimisme",
            "Échecs passés",
            "Perte de plaisir",
            "Sentiments de culpabilité",
            "Sentiment de punition",
            "Déception envers soi",
            "Auto-critiques",
            "Pensées suicidaires",
            "Pleurs",
            "Agitation",
            "Perte d'intérêt",
            "Indécision",
            "Dévalorisation",
            "Perte d'énergie",
            "Changements de sommeil",
            "Irritabilité",
            "Changements d'appétit",
            "Difficulté de concentration",
            "Fatigue",
            "Perte d'intérêt pour le sexe"
        ],
        options: ["Absent (0)", "Léger (1)", "Modéré (2)", "Sévère (3)"],
        maxScore: 63,
        interpretation: [
            { min: 0, max: 13, label: "Dépression minimale", color: "success" },
            { min: 14, max: 19, label: "Dépression légère", color: "warning" },
            { min: 20, max: 28, label: "Dépression modérée", color: "warning" },
            { min: 29, max: 63, label: "Dépression sévère", color: "danger" }
        ]
    },
    BAI: {
        name: "BAI (Inventaire d'Anxiété de Beck)",
        abbr: "BAI",
        items: [
            "Engourdissement ou picotements",
            "Bouffées de chaleur",
            "Jambes flageolantes",
            "Incapacité de se détendre",
            "Peur que le pire arrive",
            "Étourdissements",
            "Palpitations cardiaques",
            "Manque d'équilibre",
            "Terreur",
            "Nervosité",
            "Sensation d'étouffement",
            "Tremblements des mains",
            "Tremblements généralisés",
            "Peur de perdre le contrôle",
            "Difficulté à respirer",
            "Peur de mourir",
            "Sensation d'effroi",
            "Problèmes digestifs",
            "Évanouissements",
            "Bouffissement du visage",
            "Transpiration (non liée à la chaleur)"
        ],
        options: ["Pas du tout (0)", "Légèrement (1)", "Modérément (2)", "Sévèrement (3)"],
        maxScore: 63,
        interpretation: [
            { min: 0, max: 7, label: "Anxiété minimale", color: "success" },
            { min: 8, max: 15, label: "Anxiété légère", color: "warning" },
            { min: 16, max: 25, label: "Anxiété modérée", color: "warning" },
            { min: 26, max: 63, label: "Anxiété sévère", color: "danger" }
        ]
    }
};

window.ALL_SCALES = { ...SCALES };

// ========================== SIMULATION DATA ==========================
const simulationData = {
    patients: [
        {
            id: 1,
            name: "Sophie Tremblay",
            age: 31,
            sexe: "F",
            profession: "Étudiante en art",
            motif: "Instabilité émotionnelle intense, automutilations répétées, relations interpersonnelles chaotiques, tentatives de suicide antérieures.",
            diagnoses: ["Trouble de la Personnalité Limite (TPL / Borderline)"],
            antecedents: "Diagnostic de TPL posé à 27 ans. Multiples hospitalisations (3) pour crises suicidaires. Séjour de 6 semaines en clinique spécialisée. Traitement actuel : Quétiapine 100mg (PRN).",
            score_initial: { DERS: 62, CRISIS: 3 },
            totalSessions: 55,
            currentSession: 1,
            completedSessions: [],
            sessionScores: {},
            notes: {},

            consultation: {
                medecinReferent: "Dr. Bergeron",
                specialite: "Psychiatre",
                dateConsultation: "2026-03-15",
                lieuConsultation: "Clinique Ory+",
                resumeConsultation: "Patiente de 31 ans présentant un Trouble de la Personnalité Limite diagnostiqué depuis 4 ans. Histoire d'automutilations (scarifications aux avant-bras) depuis l'adolescence, 3 tentatives de suicide (la dernière il y a 8 mois). Relations interpersonnelles instables avec peur intense de l'abandon. Épisodes de dissociation rapportés sous stress intense.",
                examensCliniques: [
                    { label: "Évaluation du risque suicidaire", resultat: "Modéré (idéations passives, sans plan actuel)", statut: "warning" },
                    { label: "DERS-16", resultat: "62/80 — Désrégulation sévère", statut: "danger" },
                    { label: "Bilan sanguin", resultat: "Normal", statut: "ok" }
                ],
                diagnosticMedical: "Trouble de la Personnalité Limite (F60.3). Comorbidité : Épisode dépressif majeur en rémission partielle.",
                orientationPsy: "Indication pour un programme de Thérapie Comportementale Dialectique (TCD/DBT) structuré : thérapie individuelle hebdomadaire + groupe d'apprentissage des compétences. Contrat thérapeutique d'un an minimum."
            },

            objectifsTherapeutiques: [
                {
                    numero: 1,
                    titre: "Pré-traitement et Engagement",
                    description: "Évaluation, explication du modèle biosocial, signature du contrat thérapeutique (engagement 1 an, règle des 4 absences).",
                    seances: "Séances 1-3"
                },
                {
                    numero: 2,
                    titre: "Phase 1 — Stabilité et Sécurité",
                    description: "Éliminer les comportements suicidaires et auto-dommageables, réduire les comportements interférant avec la thérapie et la qualité de vie.",
                    seances: "Séances 4-40"
                },
                {
                    numero: 3,
                    titre: "Phase 2 — Exploration des Traumatismes",
                    description: "Diminuer l'évitement émotionnel, réduire l'auto-invalidation et le blâme, exposer aux émotions du passé.",
                    seances: "Séances 41-45"
                },
                {
                    numero: 4,
                    titre: "Phase 3 — Respect de soi",
                    description: "Favoriser la fierté et le respect de soi, soutenir l'atteinte des objectifs personnels et professionnels.",
                    seances: "Séances 46-50"
                },
                {
                    numero: 5,
                    titre: "Phase 4 — Capacité à la joie",
                    description: "Intégrer les représentations contradictoires de soi et des autres, accepter la réalité et maintenir un sentiment de joie soutenu.",
                    seances: "Séances 51-55"
                }
            ]
        }
    ],

    buildSessions(total) {
        const sessions = [];
        const n = Number.isFinite(Number(total)) && Number(total) > 0
            ? Math.floor(Number(total))
            : (window.PROTOCOL?.default_total_sessions || 55);
        for (let i = 1; i <= n; i++) {
            sessions.push({ no: i });
        }
        return sessions;
    },

    getSessionsForPatient(patient) {
        // Use the protocol's default if available, to seamlessly swap between 55 (Individuel) and 16 (Groupe)
        const activeCount = window.PROTOCOL?.default_total_sessions || patient?.totalSessions || 55;
        return this.buildSessions(activeCount);
    }
};

window.PROTOCOLS_DB = window.PROTOCOLS_DB || {};

// Make simulationData available globally for TAG app.js
window.simulationData = simulationData;
