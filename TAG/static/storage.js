const LocalAPI = {
    getPatients: async () => {
        let pts = localStorage.getItem('ory_patients');
        if (!pts) {
            pts = [
                {
                    id: 1,
                    name: "Nadia El Amrani",
                    age: 34,
                    sexe: "F",
                    profession: "Comptable en cabinet",
                    motif: "Inquiétudes envahissantes et persistantes depuis environ 2 ans touchant principalement le domaine professionnel, la santé de ses parents âgés et l'éducation de son fils.",
                    diagnoses: ["F41.1 — TAG"],
                    antecedents: "Aucun suivi psychiatrique antérieur. Épisode de stress aigu en 2022.",
                    totalSessions: 15,
                    currentSession: 1,
                    completedSessions: [],
                    sessionScores: {},
                    notes: {},
                    score_initial: { GAD7: 16, BAI: 18, BDI: 9 },
                    intermediateSessions: []
                }
            ];
            localStorage.setItem('ory_patients', JSON.stringify(pts));
        } else {
            pts = JSON.parse(pts);
        }
        return { patients: pts };
    },

    getPatientProgress: async (id) => {
        let pts = JSON.parse(localStorage.getItem('ory_patients') || "[]");
        let p = pts.find(x => x.id === id);
        if (!p) return {};
        return {
            completed_sessions: p.completedSessions || [],
            current_session: p.currentSession || 1,
            intermediate_sessions: p.intermediateSessions || [],
            session_scores: p.sessionScores || {},
            notes: p.notes || {}
        };
    },

    savePatientData: (id, dataUpdater) => {
        let pts = JSON.parse(localStorage.getItem('ory_patients') || "[]");
        let idx = pts.findIndex(x => x.id === id);
        if (idx !== -1) {
            dataUpdater(pts[idx]);
            localStorage.setItem('ory_patients', JSON.stringify(pts));
        }
    },

    completeSession: async (patientId, sessionNo, notes) => {
        LocalAPI.savePatientData(patientId, (p) => {
            if (!p.notes) p.notes = {};
            if (notes) p.notes[`session_${sessionNo}`] = notes;
            
            if (!p.completedSessions.includes(sessionNo)) {
                p.completedSessions.push(sessionNo);
                p.completedSessions.sort((a,b) => a - b);
                
                const ints = p.completedSessions.filter(x => x === Math.floor(x));
                p.currentSession = ints.length > 0 ? Math.max(...ints) + 1 : 1;
            }

            // Mark intermediate session as completed if applicable
            if (sessionNo !== Math.floor(sessionNo) && p.intermediateSessions) {
                const inter = p.intermediateSessions.find(i => i.session_number === sessionNo);
                if (inter) inter.completed = true;
            }
        });
        return { status: 'success' };
    },

    addIntermediateSession: async (patientId, parentSession) => {
        let newSessionNo = parentSession + 0.1;
        LocalAPI.savePatientData(patientId, (p) => {
            if (!p.intermediateSessions) p.intermediateSessions = [];
            const existing = p.intermediateSessions.filter(x => x.parent_session === parentSession);
            if (existing.length > 0) {
                const maxEx = Math.max(...existing.map(x => x.session_number));
                newSessionNo = maxEx + 0.1;
            }
            newSessionNo = parseFloat(newSessionNo.toFixed(1));
            p.intermediateSessions.push({
                parent_session: parentSession,
                session_number: newSessionNo,
                completed: false
            });
        });
        return { session_number: newSessionNo };
    }
};
