/**
 * Ory+ TCC Simulator — Application Logic
 * Protocole TAG ( , 2007)
 */

const app = {
    state: {
        activePanel: 'dossier',
        selectedPatient: null,
        activeSession: null,
        activeExerciseId: null,
        exerciseCategory: null,
        sessionExerciseId: null,
        chartInstance: null,
        scaleAnswers: {},
        navigationHistory: []
    },

    async init() {
        if (window.currentTroubleId && window.PROTOCOLS_DB) {
            window.PROTOCOL = window.PROTOCOLS_DB[window.currentTroubleId];
        }

        // Fetch patients from LocalAPI equivalent
        try {
            const data = await LocalAPI.getPatients();
            if (data && data.patients && data.patients.length > 0) {
                // Keep the first hardcoded patient's rich data (consultation, objectifs) as defaults
                const defaults = simulationData.patients[0] || {};
                simulationData.patients = data.patients.map(p => ({
                    ...defaults,
                    ...p,
                    // Preserve arrays/objects from API, don't inherit from defaults
                    completedSessions: p.completedSessions || [],
                    sessionScores: p.sessionScores || {},
                    notes: p.notes || {},
                    score_initial: p.score_initial || defaults.score_initial || {},
                    intermediateSessions: p.intermediateSessions || [],
                    // Preserve custom tools/exercises created by the psychologue
                    customExercises: p.customExercises || {},
                    addedExercises: p.addedExercises || {},
                }));
            }
        } catch (e) { console.error('Erreur chargement patients:', e); }

        // Auto-select the first patient and go directly to dossier
        const p = simulationData.patients[0];
        if (p && p.id) {
            await this._loadPatientProgress(p);
        }
        this.state.selectedPatient = p || null;

        this.render();
    },

    _isGuideSessionNo(no) {
        if (no === Math.floor(no)) return false;
        const frac = no - Math.floor(no);
        return Math.abs(frac - 0.9) < 1e-6;
    },

    async _loadPatientProgress(p) {
        try {
            const progress = await LocalAPI.getPatientProgress(p.id);
            if (progress) {
                p.completedSessions = progress.completed_sessions || [];
                p.currentSession = progress.current_session || 1;
                p.intermediateSessions = progress.intermediate_sessions || [];
                if (progress.session_scores) p.sessionScores = progress.session_scores;
                if (progress.notes) p.notes = progress.notes;
             }
        } catch (e) { console.error('Erreur chargement progression:', e); }
    },

    isExerciseCompletedAnywhere(patientId, exId, parentNo) {
        // The user wants an exercise to be hidden in intermediate sessions if it was completed
        // in ANY previous session across the entire therapy, not just the parent session.
        const allKeys = Object.keys(ExerciseStorage._loadAll());
        // Keys are formatted as: p{patientId}_s{sessionNo}_{exId}
        const prefixMatch = `p${patientId}_`;
        const suffixMatch = `_${exId}`;
        
        for (let key of allKeys) {
            // Check if key belongs to this patient and this exercise
            if (key.startsWith(prefixMatch) && key.includes(suffixMatch)) {
                // If it doesn't have a trailing underscore, it's the main completion key (not an entry row)
                if (!key.substring(key.indexOf(suffixMatch) + suffixMatch.length).includes('_')) {
                    // It was completed in SOME session
                    return true;
                }
            }
        }
        
        return false;
    },

    hasIncompleteExercises(patientId, sessionNo) {
        // For the warning banner on the parent session, we only care if the exercises
        // of THIS parent session and its direct intermediates are undone.
        const isIntermediate = sessionNo !== Math.floor(sessionNo);
        const parentNo = isIntermediate ? Math.floor(sessionNo) : sessionNo;
        const exercises = getExercisesForSession(parentNo);
        
        const prevContext = window.activeSessionNo;
        let scopesToCheck = [parentNo];
        const p = simulationData.patients.find(x => x.id === patientId) || this.state.selectedPatient;
        if (p && p.intermediateSessions) {
            const intermediates = p.intermediateSessions.filter(i => i.parent_session === parentNo);
            scopesToCheck = scopesToCheck.concat(intermediates.map(i => i.session_number));
        }
        
        for (let ex of exercises) {
            let doneInScope = false;
            for (let scope of scopesToCheck) {
                window.activeSessionNo = scope;
                if (ExerciseStorage.getStatus(patientId, ex.id) === 'completed') {
                    doneInScope = true;
                    break;
                }
            }
            if (!doneInScope) {
                window.activeSessionNo = prevContext;
                return true; // Found an exercise not completed in this session's scope
            }
        }
        
        window.activeSessionNo = prevContext;
        return false;
    },

    /* =================== NAVIGATION =================== */
    showPanel(panelId, sessionNo = null, isBack = false) {
        if (!isBack && (this.state.activePanel !== panelId || this.state.activeSession?.no !== sessionNo)) {
            this.state.navigationHistory.push({ panel: this.state.activePanel, sessionNo: this.state.activeSession?.no });
        }
        
        this.state.activePanel = panelId;
        if (sessionNo) {
            const p = this.state.selectedPatient;
            if (p) {
                // Clear selected exercise when switching to a different session
                if (this.state.activeSession && this.state.activeSession.no !== sessionNo) {
                    this.state.sessionExerciseId = null;
                }
                this.state.activeSession = { no: sessionNo };
            }
            // Set session context for ExerciseStorage scoping
            window.activeSessionNo = sessionNo;
        } else if (panelId !== 'session') {
            // Clear session context and selected exercise when not in a session
            this.state.sessionExerciseId = null;
            window.activeSessionNo = undefined;
        }
        this.render();
        this.updateSidebarActive(panelId);
    },

    goBack() {
        if (this.state.navigationHistory.length > 0) {
            const prev = this.state.navigationHistory.pop();
            this.showPanel(prev.panel, prev.sessionNo, true);
        } else {
            this.showPanel('dossier', null, true);
        }
    },

    updateSidebarActive(panelId) {
        document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
        const bc = document.getElementById('breadcrumb-current');
        if (panelId === 'dossier' && this.state.selectedPatient) {
            bc.textContent = `Dossier — ${this.state.selectedPatient.name}`;
        } else if (panelId === 'session' && this.state.activeSession) {
            bc.textContent = `Séance ${this.state.activeSession.no}`;
        } else if (panelId === 'exercises' || panelId === 'exercise_detail') {
            bc.textContent = 'Exercices TAG';
        }
    },

    togglePhase(phaseId, isOpen) {
        if (!this.state.openPhases) this.state.openPhases = {};
        this.state.openPhases[phaseId] = isOpen;
    },

    async selectPatient(id) {
        const p = simulationData.patients.find(p => p.id === id);
        if (p) {
            await this._loadPatientProgress(p);
        }
        this.state.selectedPatient = p;
        this.state.activeSession = null;
        this.state.navigationHistory = []; // Reset history on patient change
        this.showPanel('dossier');
    },

    /* =================== RENDER ROUTER =================== */
    render() {
        const view = document.getElementById('app-view');
        if (this.state.chartInstance) {
            this.state.chartInstance.destroy();
            this.state.chartInstance = null;
        }
        const panel = this.state.activePanel;
        if (panel === 'dossier') this.renderDossier(view);
        else if (panel === 'session') this.renderSession(view);
        else if (panel === 'exercises') this.renderExercises(view);
        else if (panel === 'exercise_detail') this.renderExerciseDetail(view);
    },


    /* =================== DOSSIER =================== */
    renderDossier(view) {
        const p = this.state.selectedPatient;
        if (!p) { this.showPanel('dashboard'); return; }

        view.innerHTML = document.getElementById('tpl-dossier').innerHTML;
        const sessions = simulationData.getSessionsForPatient(p);

        document.getElementById('dossier-progress-badge').textContent = `${Math.round((p.completedSessions.length / p.totalSessions) * 100)}%`;

        const timeline = document.getElementById('dossier-session-timeline');
        let timelineHtml = '';

        // Build full session list including intermediates
        const allSessions = [...sessions];
        if (p.intermediateSessions) {
            p.intermediateSessions.forEach(inter => {
                allSessions.push({
                    no: inter.session_number,
                    isIntermediate: true,
                    parentSession: inter.parent_session,
                    completed: inter.completed
                });
            });
        }

        // Add "Guide" sessions before the first session of each phase (X.9).
        if (window.PROTOCOL && Array.isArray(window.PROTOCOL.phases)) {
            window.PROTOCOL.phases.forEach(phase => {
                const starts = (phase.recommended_sessions || []).slice().sort((a, b) => a - b);
                const startNo = starts.length ? starts[0] : null;
                if (!Number.isFinite(startNo) || startNo < 1) return;
                const guideNo = parseFloat((startNo - 0.1).toFixed(1));
                allSessions.push({ no: guideNo, isGuide: true, guideForSession: startNo });
            });
        }
        allSessions.sort((a, b) => a.no - b.no);

        // Compute dynamic indexing for display 1, 2, 3...
        // Do NOT count guide sessions (X.9) in numbering to avoid gaps.
        let displayIndex = 1;
        allSessions.forEach(s => {
            const isGuide = !!s.isGuide || this._isGuideSessionNo(s.no);
            if (!isGuide) {
                s.displayIndex = displayIndex++;
            } else {
                s.displayIndex = null;
            }
        });

        const buildSessionHtml = (s) => {
            try {
                const completed = Array.isArray(p.completedSessions) ? p.completedSessions : [];
                const isDone = completed.includes(s.no);
                const isGuide = !!s.isGuide || this._isGuideSessionNo(s.no);
                const isCurrent = !s.isIntermediate && !isGuide && s.no === p.currentSession;
                const parentNo = s.isIntermediate ? s.parentSession : s.no;
                let exerciseCount = 0;
                try {
                    const exercisesForSession = getExercisesForSession(isGuide ? s.no : parentNo) || [];
                    exerciseCount = exercisesForSession.length || 0;
                } catch (e) {
                    console.error('Erreur getExercisesForSession:', e, { session: s, parentNo });
                    exerciseCount = 0;
                }

                let label, dotContent, badgeHtml;

                let hasIncompletes = false;
                if (isDone) {
                    hasIncompletes = app.hasIncompleteExercises(p.id, s.no);
                }

                if (isGuide) {
                    const guideFor = s.guideForSession || Math.ceil(s.no);
                    label = `Guide — Avant Séance ${guideFor}`;
                    dotContent = `<i class="fas fa-book-open" style="font-size:0.65rem;"></i>`;
                    badgeHtml = '<span class="badge" style="background:var(--info);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">Guide</span>';
                } else if (s.isIntermediate) {
                    label = `S\u00e9ance ${s.displayIndex}`;
                    // Optional: keep an indicator that it's an intermediate mapping
                    dotContent = `<i class="fas fa-rotate" style="font-size:0.6rem;"></i>`;
                    badgeHtml = isDone
                        ? '<span class="badge" style="background:var(--success);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">Termin\u00e9e</span>'
                        : '<span class="badge" style="background:#8b5cf6;color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">Interm\u00e9diaire</span>';
                    badgeHtml += `<button class="btn-sm-icon ms-2 no-print" title="Supprimer cette s\u00e9ance" onclick="event.stopPropagation(); app.deleteIntermediateSession(${s.no}, ${s.parentSession})"><i class="fas fa-trash" style="color:var(--danger);font-size:0.75rem;"></i></button>`;
                } else {
                    label = `S\u00e9ance ${s.displayIndex}`;
                    dotContent = isDone ? '<i class="fas fa-check" style="font-size:0.65rem;"></i>' : s.displayIndex;
                    badgeHtml = isDone
                        ? '<span class="badge" style="background:var(--success);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">Termin\u00e9e</span>'
                        : isCurrent
                            ? '<span class="badge" style="background:var(--warning);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">En cours</span>'
                            : '';
                }

                if (hasIncompletes) {
                    badgeHtml += ' <span style="color:var(--warning);font-size:0.8rem;margin-left:4px;" title="Exercices non termin\u00e9s"><i class="fas fa-exclamation-triangle"></i></span>';
                }

                let row = `
                <div class="timeline-row" onclick="app.showPanel('session', ${s.no})" style="${s.isIntermediate ? 'padding-left:20px;border-left:3px solid #8b5cf6;margin-left:14px;' : isGuide ? 'padding-left:20px;border-left:3px solid var(--info);margin-left:14px;' : ''}">
                    <div class="timeline-dot ${isDone ? 'done' : isCurrent ? 'current' : 'pending'}" style="${s.isIntermediate ? 'background:#8b5cf6;color:white;border-color:#8b5cf6;' : isGuide ? 'background:var(--info);color:white;border-color:var(--info);' : ''}">
                        ${dotContent}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.84rem;font-weight:${isCurrent ? '700' : '500'};color:${s.isIntermediate ? '#8b5cf6' : isGuide ? 'var(--info)' : isCurrent ? 'var(--primary)' : 'var(--text)'};">
                            ${label}
                        </div>
                        <div style="font-size:0.72rem;color:var(--text-muted);">
                            ${exerciseCount} ${isGuide ? ('guide' + (exerciseCount > 1 ? 's' : '')) : ('exercice' + (exerciseCount > 1 ? 's' : ''))} associ\u00e9${exerciseCount > 1 ? 's' : ''}
                        </div>
                    </div>
                    ${badgeHtml}
                </div>
            `;

            // Add "+ Intermédiaire" button only on the last completed session
            if (!s.isIntermediate && !isGuide && isDone) {
                // Find the highest completed regular session number
                const completedRegulars = (Array.isArray(p.completedSessions) ? p.completedSessions : []).filter(n => n === Math.floor(n) && !app._isGuideSessionNo(n));
                const lastDoneNo = completedRegulars.length > 0 ? Math.max(...completedRegulars) : -1;
                if (s.no === lastDoneNo) {
                    row += `
                        <div style="margin-left:28px;margin-bottom:4px;">
                            <button class="btn-ghost" style="font-size:0.68rem;padding:2px 10px;color:#8b5cf6;border:1px dashed #c4b5fd;border-radius:8px;"
                                    onclick="event.stopPropagation(); app.addIntermediateSession(${s.no})">
                                <i class="fas fa-plus me-1"></i>Ajouter s\u00e9ance interm\u00e9diaire
                            </button>
                        </div>
                    `;
                }
            }

            return row;
            } catch (e) {
                console.error('Erreur buildSessionHtml:', e, s);
                const no = s?.no ?? '?';
                return `<div class="timeline-row" onclick="app.showPanel('session', ${no})">
                    <div class="timeline-dot pending">${no}</div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.84rem;font-weight:600;color:var(--text);">Séance ${no}</div>
                        <div style="font-size:0.72rem;color:var(--text-muted);">—</div>
                    </div>
                </div>`;
            }
        };

        if (window.PROTOCOL && window.PROTOCOL.phases && window.PROTOCOL.phases.length > 0) {
            window.PROTOCOL.phases.forEach((phase) => {
                const phaseSessions = allSessions.filter(s => {
                    const isGuide = !!s.isGuide || app._isGuideSessionNo(s.no);
                    if (isGuide) {
                        const guideFor = s.guideForSession || Math.ceil(s.no);
                        return phase.recommended_sessions.includes(guideFor);
                    }
                    const parentNo = s.isIntermediate ? s.parentSession : s.no;
                    return phase.recommended_sessions.includes(parentNo);
                });

                if (phaseSessions.length === 0) return;

                if (!app.state.openPhases) app.state.openPhases = {};
                let isActive = app.state.openPhases[phase.phase_name];
                if (isActive === undefined) {
                    isActive = phase.recommended_sessions.includes(Math.floor(p.currentSession));
                }

                timelineHtml += `
                    <div class="phase-group mb-3" style="border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: #fff;">
                        <div class="phase-header d-flex justify-content-between align-items-center p-3" 
                             style="cursor:pointer; background: ${isActive ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-secondary)'}; border-bottom: 1px solid var(--border);"
                             onclick="const body = this.nextElementSibling; const icon = this.querySelector('.fa-chevron-down'); if (body.style.display === 'none') { body.style.display = 'block'; icon.style.transform = 'rotate(0deg)'; app.togglePhase('${phase.phase_name.replace(/'/g, "\\'")}', true); } else { body.style.display = 'none'; icon.style.transform = 'rotate(-90deg)'; app.togglePhase('${phase.phase_name.replace(/'/g, "\\'")}', false); }">
                            <h6 class="m-0" style="font-size:0.95rem; color: ${isActive ? 'var(--primary)' : 'var(--text)'}; font-weight:700;">
                                <i class="fas fa-layer-group me-2"></i>${phase.phase_name}
                            </h6>
                            <i class="fas fa-chevron-down" style="transition:transform 0.2s; color:var(--text-muted); ${isActive ? '' : 'transform:rotate(-90deg);'}"></i>
                        </div>
                        <div class="phase-sessions" style="display: ${isActive ? 'block' : 'none'}; padding: 12px 16px;">
                            ${phaseSessions.map(buildSessionHtml).join('')}
                        </div>
                    </div>
                `;
            });
            // Fallback: if protocol mapping yields no phase sessions, show the raw session list.
            if (!timelineHtml || timelineHtml.trim() === '') {
                timelineHtml = allSessions.map(buildSessionHtml).join('');
            }
        } else {
            timelineHtml = allSessions.map(buildSessionHtml).join('');
        }

        timeline.innerHTML = timelineHtml;


    },

    async addIntermediateSession(afterSessionNo) {
        const p = this.state.selectedPatient;
        if (!p) return;
        try {
            const data = await LocalAPI.addIntermediateSession(p.id, afterSessionNo);
            if (!p.intermediateSessions) p.intermediateSessions = [];
            p.intermediateSessions.push({
                session_number: data.session_number,
                parent_session: afterSessionNo,
                completed: false
            });
            this.showToast(`S\u00e9ance interm\u00e9diaire ${data.session_number} ajout\u00e9e apr\u00e8s la s\u00e9ance ${afterSessionNo}.`, 'success');
            this.renderDossier(document.getElementById('app-view'));
        } catch (e) {
            console.error('Erreur ajout interm\u00e9diaire:', e);
            this.showToast('Erreur de cr\u00e9ation.', 'danger');
        }
    },

    addSession() {
        const p = this.state.selectedPatient;
        if (!p) return;
        p.totalSessions++;
        this.showToast(`Séance ${p.totalSessions} ajoutée au plan de traitement.`, 'success');
        this.renderDossier(document.getElementById('app-view'));
    },

    removeSession() {
        const p = this.state.selectedPatient;
        if (!p || p.totalSessions <= 1) return;
        if (p.completedSessions.includes(p.totalSessions)) {
            this.showToast('Impossible de supprimer une séance déjà réalisée.', 'warning');
            return;
        }
        p.totalSessions--;
        if (p.currentSession > p.totalSessions) p.currentSession = p.totalSessions;
        this.showToast(`Séance retirée. Plan ajusté à ${p.totalSessions} séances.`, 'info');
        this.renderDossier(document.getElementById('app-view'));
    },

    renderPatientChart(p) {
        const ctx = document.getElementById('patient-chart')?.getContext('2d');
        if (!ctx) return;

        const sessions = simulationData.getSessionsForPatient(p);
        const labels = sessions.map(s => `S${s.no}`);
        const data = sessions.map(s => {
            if (p.sessionScores?.[s.no]?.GAD7 !== undefined) return p.sessionScores[s.no].GAD7;
            if (s.no === 1 && p.score_initial?.GAD7) return p.score_initial.GAD7;
            return null;
        });

        this.state.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Score GAD-7',
                    data,
                    borderColor: '#1e90ff',
                    backgroundColor: 'rgba(30,144,255,0.08)',
                    borderWidth: 2.5,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#1e90ff',
                    pointRadius: 5,
                    spanGaps: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: {
                        label: ctx => {
                            const v = ctx.raw;
                            const lbl = v <= 4 ? 'Minimal' : v <= 9 ? 'Léger' : v <= 14 ? 'Modéré' : 'Sévère';
                            return `GAD-7 : ${v} — ${lbl}`;
                        }
                    }}
                },
                scales: {
                    y: { min: 0, max: 21, grid: { color: 'rgba(0,0,0,0.04)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    },

    /* =================== SESSION =================== */
    renderSession(view) {
        const s = this.state.activeSession;
        const p = this.state.selectedPatient;
        if (!s) { this.showPanel('dashboard'); return; }

        view.innerHTML = document.getElementById('tpl-session').innerHTML;

        let sessionTitle = `Séance ${s.no}`;
        if (this._isGuideSessionNo(s.no)) {
            const startNo = Math.ceil(s.no);
            const phase = window.PROTOCOL?.phases?.find(p => p.recommended_sessions.includes(startNo));
            sessionTitle = phase ? `Guide — ${phase.phase_name}` : `Guide — Avant séance ${startNo}`;
        } else if (s.no !== Math.floor(s.no)) {
            // This is an intermediate session
            const parentNo = Math.floor(s.no);
            sessionTitle = `Séance ${parentNo} — Intermédiaire`;
        } else if (window.PROTOCOL) {
            const phase = window.PROTOCOL.phases.find(p => p.recommended_sessions.includes(s.no));
            if (phase) sessionTitle = phase.phase_name;
        }

        document.getElementById('session-main-title').textContent = sessionTitle;
        document.getElementById('session-patient-name').innerHTML = p
            ? `<i class="fas fa-user me-1"></i>${p.name} &bull; ${p.age} ans &bull; ${p.profession}`
            : '';
        document.getElementById('session-badge').textContent = `#${s.no}`;

        const infoArea = document.getElementById('session-info-area');
        const isGuide = this._isGuideSessionNo(s.no);
        const isIntermediate = !isGuide && s.no !== Math.floor(s.no);
        const infoLookupNo = isGuide ? s.no : (isIntermediate ? Math.floor(s.no) : s.no);
        let infoExercises = getExercisesForSession(infoLookupNo);

        // Apply same filtering as sidebar for intermediate sessions
        if (isIntermediate && p) {
            const parentCompleted = p.completedSessions.includes(infoParentNo);
            if (!parentCompleted) {
                const pid = p.id || 1;
                infoExercises = infoExercises.filter(ex => !this.isExerciseCompletedAnywhere(pid, ex.id, infoParentNo));
            }
        }

        infoArea.innerHTML = `
            <div style="font-size:0.84rem;margin-bottom:12px;">
                <i class="fas fa-user me-1 text-primary-c"></i>
                <strong>${p?.name || '—'}</strong>
            </div>
            <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:8px;">
                <i class="fas fa-clipboard-list me-1"></i> ${infoExercises.length} exercice${infoExercises.length > 1 ? 's' : ''} disponible${infoExercises.length > 1 ? 's' : ''}
            </div>
            <div class="divider"></div>
            <div style="font-size:0.78rem;color:var(--text-muted);">
                Choisissez un exercice pour travailler avec le patient.
            </div>
        `;

        this.renderSessionExercises(s);
        this.renderSessionScales(s);
        this.renderSessionMainArea(s);

        const savedNote = p?.notes?.[`session_${s.no}`] || '';
        document.getElementById('clinical-notes').value = savedNote;

        if (p && p.completedSessions.includes(s.no)) {
            const btn = document.getElementById('btn-complete-session');
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Séance clôturée';
            btn.style.background = 'var(--success)';
            btn.disabled = true;
        }
    },

    renderSessionExercises(s) {
        const area = document.getElementById('session-exercises-area');
        if (!area) return;

        const isGuide = this._isGuideSessionNo(s.no);
        const isIntermediate = !isGuide && s.no !== Math.floor(s.no);
        const parentNo = isIntermediate ? Math.floor(s.no) : s.no;
        const lookupNo = isGuide ? s.no : parentNo;
        let sessionExercises = getExercisesForSession(lookupNo);
        const pid = this.state.selectedPatient?.id || 1;
        const p = this.state.selectedPatient;

        // For intermediate sessions, adapt exercises based on parent session status
        if (isIntermediate && p) {
            const parentCompleted = p.completedSessions.includes(parentNo);
            if (parentCompleted) {
                // Parent session was completed → show ALL exercises (repeat)
                // No filtering needed, keep the full list
            } else {
                // Parent session is incomplete → show only remaining undone exercises
                sessionExercises = sessionExercises.filter(ex => {
                    return !this.isExerciseCompletedAnywhere(pid, ex.id, parentNo);
                });
            }
        }

        const optionHtml = (ex) => {
            const status = ExerciseStorage.getStatus(pid, ex.id);
            const mark = status === 'completed' ? ' \u2713' : status === 'in_progress' ? ' \u25CF' : '';
            return `<option value="${ex.id}" ${this.state.sessionExerciseId === ex.id ? 'selected' : ''}>${ex.ref} ${ex.title}${mark}</option>`;
        };

        // Separate guides from interactive exercises
        const guideExercises = sessionExercises.filter(ex => ex && ex.type === 'info');
        const alwaysExercises = sessionExercises.filter(ex => ex && ex.alwaysAvailable === true && ex.type !== 'info');
        const regularExercises = sessionExercises.filter(ex => ex && ex.alwaysAvailable !== true && ex.type !== 'info');

        const sessionLabel = isGuide
            ? `Guide \u2014 Avant s\u00e9ance ${Math.ceil(s.no)}`
            : isIntermediate
                ? `S\u00e9ance ${parentNo} \u2014 Interm\u00e9diaire`
                : `S\u00e9ance ${s.no}`;

        // Agenda key where dynamic/custom exercises are stored
        const agendaKey = isGuide ? Math.ceil(s.no) : parentNo;
        const addedIds = (p && p.addedExercises && p.addedExercises[agendaKey]) ? p.addedExercises[agendaKey] : [];
        const addedItems = addedIds.map(id => getExerciseById(id)).filter(Boolean);
        const addedCustom = addedItems.filter(ex => ex.isCustom);

        area.innerHTML = `
            <div style="margin-bottom:10px;">
                <select class="form-select form-select-sm" id="session-exercise-select" onchange="app.selectSessionExercise(this.value)">
                    <option value="">\u2014 Choisir un exercice \u2014</option>
                    <optgroup label="Exercices de cette s\u00e9ance">
                        ${regularExercises.map(ex => optionHtml(ex)).join('')}
                    </optgroup>
                    ${alwaysExercises.length ? `
                        <optgroup label="Biblioth\u00e8que psychologue">
                            ${alwaysExercises.map(ex => optionHtml(ex)).join('')}
                        </optgroup>
                    ` : ''}
                </select>
            </div>
            ${isIntermediate && sessionExercises.length === 0 ? `
                <div style="text-align:center;padding:20px;color:var(--success);font-size:0.88rem;">
                    <i class="fas fa-check-circle" style="font-size:1.5rem;display:block;margin-bottom:8px;"></i>
                    Tous les exercices de la s\u00e9ance ${parentNo} sont compl\u00e9t\u00e9s !
                </div>
            ` : ''}
            ${sessionExercises.length ? `
                <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);margin-bottom:6px;padding-left:2px;">
                    ${sessionLabel}${isIntermediate ? (p && p.completedSessions.includes(parentNo) ? ' \u2014 reprise compl\u00e8te' : ' \u2014 exercices restants') : ''}
                </div>
            ` : ''}
            ${sessionExercises.map(ex => {
                const status = ExerciseStorage.getStatus(pid, ex.id);
                const isForm = !['info', 'model'].includes(ex.type);
                const isActive = this.state.sessionExerciseId === ex.id;
                const showCustomActions = !!ex.isCustom;
                const statusIcon = isForm ? (
                    status === 'completed' ? '<i class="fas fa-check-circle" style="color:var(--success);"></i>' :
                    status === 'in_progress' ? '<i class="fas fa-circle-half-stroke" style="color:var(--warning);"></i>' :
                    '<i class="fas fa-circle" style="color:var(--text-light);font-size:0.6rem;"></i>'
                ) : '<i class="fas fa-book-open" style="color:var(--info);font-size:0.7rem;"></i>';
                return `
                    <div class="ex-session-item ${isActive ? 'active' : ''}" onclick="app.selectSessionExercise('${ex.id}')" style="${isActive ? 'background:var(--primary-light);border-left:3px solid var(--primary);' : ''};${showCustomActions ? 'justify-content:space-between;' : ''}">
                        <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
                            ${statusIcon}
                            <div style="min-width:0;">
                                <div style="font-size:0.8rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${ex.ref} ${ex.title}</div>
                            </div>
                        </div>
                        ${showCustomActions ? `
                            <div style="display:flex;gap:6px;flex-shrink:0;">
                                <button class="btn-sm-icon" title="Modifier" onclick="event.stopPropagation(); app.openEditCustomExercise('${ex.id}')">
                                    <i class="fas fa-pen"></i>
                                </button>
                                <button class="btn-sm-icon" title="Retirer de la séance" onclick="event.stopPropagation(); app.removeAddedExerciseFromSession('${ex.id}', ${agendaKey})">
                                    <i class="fas fa-trash" style="color:var(--danger);"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}

            <div class="mt-3 pt-3 border-top" style="display:flex;flex-direction:column;gap:8px;">
                <button class="btn-ghost btn-sm w-100" style="color:var(--accent);" onclick="app.openCustomExerciseBuilder()">
                    <i class="fas fa-pencil-ruler me-1"></i> Créer un exercice personnalisé
                </button>
            </div>
        `;
    },

    async removeAddedExerciseFromSession(exerciseId, agendaKey) {
        const p = this.state.selectedPatient;
        if (!p) return;
        if (!p.addedExercises) p.addedExercises = {};
        if (!p.addedExercises[agendaKey]) p.addedExercises[agendaKey] = [];
        p.addedExercises[agendaKey] = p.addedExercises[agendaKey].filter(id => id !== exerciseId);
        await LocalAPI.savePatientProgress(p);
        if (this.state.sessionExerciseId === exerciseId) this.state.sessionExerciseId = null;
        this.showToast("Exercice retiré de la séance.", "success");
        const s = this.state.activeSession;
        if (s) {
            this.renderSessionExercises(s);
            this.renderSessionMainArea(s);
        }
    },

    openEditCustomExercise(exerciseId) {
        const p = this.state.selectedPatient;
        if (!p || !p.customExercises || !p.customExercises[exerciseId]) {
            this.showToast("Exercice introuvable.", "warning");
            return;
        }
        const ex = p.customExercises[exerciseId];
        const root = document.getElementById('modal-root');
        if (!root) return;
        const safeTitle = (ex.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
        root.innerHTML = `
            <div class="modal-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1050;display:flex;align-items:center;justify-content:center;padding:16px;">
                <div style="background:var(--surface);border-radius:var(--r-lg);box-shadow:var(--shadow-lg);width:100%;max-width:600px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;">
                    <div style="padding:1.2rem 1.4rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
                        <h5 style="margin:0;font-weight:800;"><i class="fas fa-pen me-2 text-primary-c"></i>Modifier l’exercice</h5>
                        <button class="btn-sm-icon" onclick="document.getElementById('modal-root').innerHTML=''"><i class="fas fa-xmark"></i></button>
                    </div>
                    <div style="padding:1.2rem 1.4rem;overflow-y:auto;flex:1;">
                        <div class="mb-3">
                            <label style="font-size:0.82rem;font-weight:700;color:var(--text-muted);">Titre *</label>
                            <input type="text" id="edit-custom-ex-title" class="form-control form-control-sm mt-1" value="${safeTitle}" />
                        </div>
                        <div class="mb-3">
                            <label style="font-size:0.82rem;font-weight:700;color:var(--text-muted);">Description</label>
                            <textarea id="edit-custom-ex-desc" class="form-control form-control-sm mt-1" rows="2">${ex.description || ''}</textarea>
                        </div>
                        <div style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:0.82rem;font-weight:700;color:var(--text-muted);">Questions</span>
                            <button class="btn-ghost" style="font-size:0.75rem;color:var(--primary);" onclick="app.addEditCustomQuestion()">
                                <i class="fas fa-plus"></i> Ajouter une question
                            </button>
                        </div>
                        <div id="edit-custom-ex-questions" style="display:flex;flex-direction:column;gap:8px;"></div>
                    </div>
                    <div style="padding:1rem 1.4rem;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;">
                        <button class="btn-ghost" onclick="document.getElementById('modal-root').innerHTML=''">Annuler</button>
                        <button class="btn-primary-custom" onclick="app.saveEditedCustomExercise('${exerciseId}')"><i class="fas fa-save me-1"></i>Enregistrer</button>
                    </div>
                </div>
            </div>
        `;

        // Seed existing questions
        this._editCustomQuestionCount = 0;
        const qs = Array.isArray(ex.questions) ? ex.questions : [];
        if (qs.length) {
            qs.forEach(q => this.addEditCustomQuestion(q));
        } else {
            this.addEditCustomQuestion();
        }
    },

    _editCustomQuestionCount: 0,
    addEditCustomQuestion(seed = null) {
        const container = document.getElementById('edit-custom-ex-questions');
        if (!container) return;
        const idx = ++this._editCustomQuestionCount;
        const div = document.createElement('div');
        div.id = `ecq-${idx}`;
        div.style.cssText = 'background:var(--surface-2);border-radius:var(--r-sm);padding:10px 12px;display:flex;flex-direction:column;gap:6px;';
        const text = (seed && seed.text) ? seed.text : '';
        const type = (seed && seed.type) ? seed.type : 'text';
        const safeText = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
        div.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:0.75rem;font-weight:700;color:var(--primary);">Question ${idx}</span>
                <button class="btn-sm-icon" onclick="document.getElementById('ecq-${idx}').remove()" title="Supprimer"><i class="fas fa-trash" style="color:var(--danger);font-size:0.7rem;"></i></button>
            </div>
            <input type="text" class="form-control form-control-sm ecq-text" placeholder="Libellé de la question..." value="${safeText}" />
            <div style="display:flex;align-items:center;gap:8px;">
                <label style="font-size:0.75rem;font-weight:600;color:var(--text-muted);white-space:nowrap;">Type :</label>
                <select class="form-select form-select-sm ecq-type" style="font-size:0.75rem;max-width:200px;">
                    <option value="text" ${type === 'text' ? 'selected' : ''}>Réponse libre (texte)</option>
                    <option value="likert5" ${type === 'likert5' ? 'selected' : ''}>Likert 0–5</option>
                    <option value="likert10" ${type === 'likert10' ? 'selected' : ''}>Likert 0–10</option>
                    <option value="yesno" ${type === 'yesno' ? 'selected' : ''}>Oui / Non</option>
                </select>
            </div>
        `;
        container.appendChild(div);
    },

    async saveEditedCustomExercise(exerciseId) {
        const p = this.state.selectedPatient;
        if (!p || !p.customExercises || !p.customExercises[exerciseId]) return;
        const title = document.getElementById('edit-custom-ex-title')?.value.trim();
        const desc = document.getElementById('edit-custom-ex-desc')?.value.trim();
        if (!title) { this.showToast("Le titre est obligatoire.", "warning"); return; }

        const questions = [];
        document.querySelectorAll('#edit-custom-ex-questions > div').forEach(div => {
            const text = div.querySelector('.ecq-text')?.value.trim();
            const type = div.querySelector('.ecq-type')?.value || 'text';
            if (text) questions.push({ text, type });
        });
        if (questions.length === 0) { this.showToast('Ajoutez au moins une question.', 'warning'); return; }

        p.customExercises[exerciseId].title = title;
        p.customExercises[exerciseId].description = desc || '';
        p.customExercises[exerciseId].questions = questions;
        await LocalAPI.savePatientProgress(p);
        document.getElementById('modal-root').innerHTML = '';
        this.showToast("Exercice modifié.", "success");
        const s = this.state.activeSession;
        if (s) {
            this.renderSessionExercises(s);
            this.renderSessionMainArea(s);
        }
    },

    renderSessionScales(s) {
        const area = document.getElementById('session-scales-area');
        if (!area) return;
        
        // Use all available scales for the current module universally
        const scaleKeys = Object.keys(SCALES);
        
        if (scaleKeys.length === 0) {
            area.innerHTML = '<div style="font-size:0.75rem;color:var(--text-muted);padding:8px 0;text-align:center;">Aucune échelle clinique définie.</div>';
            return;
        }

        area.innerHTML = scaleKeys.map(key => {
            const scale = SCALES[key] || { abbr: key, interpretation: []};
            const p = this.state.selectedPatient;
            const score = p?.sessionScores?.[s.no]?.[key];
            return `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);">
                    <span style="font-size:0.82rem;font-weight:600;">${scale.abbr}</span>
                    <div style="display:flex;align-items:center;gap:8px;">
                        ${score !== undefined
                            ? `<span class="gad-score-pill ${this.interpretScale(key, score).color}" style="font-size:0.68rem;padding:3px 8px;">${score}</span>`
                            : ''
                        }
                        <button class="btn-ghost" style="font-size:0.72rem;padding:3px 8px;color:var(--primary);" onclick="app.openScaleModal('${key}')">
                            <i class="fas fa-pen"></i> ${score !== undefined ? 'Repasser' : 'Passer'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    selectSessionExercise(exerciseId) {
        this.state.sessionExerciseId = exerciseId || null;
        const s = this.state.activeSession;
        if (s) {
            this.renderSessionExercises(s);
            this.renderSessionMainArea(s);
        }
    },

    markDoneAndNext(currentExId, nextExId) {
        const pid = this.state.selectedPatient?.id || 1;
        const ex = getExerciseById(currentExId);
        const area = document.getElementById('session-exercise-render-area');
        let savedDailyCount = 0;

        // Auto-save current exercise data if it's a form type
        if (ex && area && !['info', 'model'].includes(ex.type)) {
            // daily_log is a table with repeating rows, so we must save it row-wise.
            if (ex.type === 'daily_log') {
                savedDailyCount = ExerciseRenderer._saveDailyLog(ex, pid, area) || 0;
            } else {
                const data = ExerciseRenderer._collectFormData(ex, area);
                ExerciseStorage.save(pid, currentExId, data);
            }
        } else if (ex) {
            // For info/model types, mark as viewed
            ExerciseStorage.save(pid, currentExId, { _viewed: true });
        }

        // For daily_log we decide completion from the rows saved from the DOM.
        const status = ex && ex.type === 'daily_log'
            ? (savedDailyCount > 0 ? 'completed' : 'in_progress')
            : ExerciseStorage.getStatus(pid, currentExId);
        if (status === 'completed') {
            this.showToast(`Exercice « ${ex?.title || currentExId} » complété ✓`, 'success');
        } else {
            this.showToast(`Avancement de « ${ex?.title || currentExId} » sauvegardé.`, 'info');
        }
        
        this.selectSessionExercise(nextExId);
    },

    markDoneAndFinish(currentExId) {
        const pid = this.state.selectedPatient?.id || 1;
        const ex = getExerciseById(currentExId);
        const area = document.getElementById('session-exercise-render-area');
        let savedDailyCount = 0;

        // Auto-save current exercise data
        if (ex && area && !['info', 'model'].includes(ex.type)) {
            if (ex.type === 'daily_log') {
                savedDailyCount = ExerciseRenderer._saveDailyLog(ex, pid, area) || 0;
            } else {
                const data = ExerciseRenderer._collectFormData(ex, area);
                ExerciseStorage.save(pid, currentExId, data);
            }
        } else if (ex) {
            ExerciseStorage.save(pid, currentExId, { _viewed: true });
        }

        const status = ex && ex.type === 'daily_log'
            ? (savedDailyCount > 0 ? 'completed' : 'in_progress')
            : ExerciseStorage.getStatus(pid, currentExId);
        if (status === 'completed') {
            this.showToast(`Exercice « ${ex?.title || currentExId} » complété ✓`, 'success');
        } else {
            this.showToast(`Avancement de « ${ex?.title || currentExId} » sauvegardé.`, 'info');
        }

        this.state.sessionExerciseId = null;
        const s = this.state.activeSession;
        if (s) {
            this.renderSessionExercises(s);
            this.renderSessionMainArea(s);
        }
    },
    
    _validateExerciseData(ex, data, pid = 1) {
        if (!data && ex.type !== 'daily_log') return false;
        
        // Custom logic based on exercise type
        if (ex.type === 'two_columns') {
            return !!(data.colA && data.colB && data.colA.trim() !== '' && data.colB.trim() !== '');
        } 
        
        if (ex.type === 'structured_form') {
            for (const field of ex.fields) {
                if (!data[field.key] || data[field.key].toString().trim() === '') return false;
            }
            return true;
        }
        
        if (ex.type === 'free_list') {
            return data.items && data.items.length > 0;
        }
        
        if (ex.type === 'custom') {
            if (!ex.questions || ex.questions.length === 0) return true;
            for (let i = 0; i < ex.questions.length; i++) {
                const val = data[`q_${i}`];
                if (val === undefined || val === null || val.toString().trim() === '') return false;
            }
            return true;
        }

        if (ex.type === 'chain_analysis') {
            for (let i = 0; i < 9; i++) {
                const val = data[`step_${i}`];
                if (!val || val.trim() === '') return false;
            }
            return true;
        }

        if (ex.type === 'diary_card_dbt') {
            // Un journal TCD est considéré validé si les 7 jours de souffrance sont complétés
            for (let i = 0; i < 7; i++) {
                const val = data[`souffrance_${i}`];
                if (!val || val.toString().trim() === '') return false;
            }
            return true;
        }
        
        if (ex.type === 'problem_solving') {
            // Check basic fields
            for (const field of ex.fields || []) {
                if (!data[field.key] || data[field.key].toString().trim() === '') return false;
            }
            // Require at least one solution
            if (!data.sol_0 || data.sol_0.toString().trim() === '') return false;
            
            // Check evaluation fields if they exist
            if (ex.evaluationFields) {
                 for (const field of ex.evaluationFields) {
                     if (!data[field.key] || data[field.key].toString().trim() === '') return false;
                 }
            }
            return true;
        }

        if (ex.type === 'daily_log') {
             const entries = ExerciseStorage.getAllEntries(pid, ex.id);
             if (entries.length === 0) return false;
             
             // At least one entry must have ALL columns filled
             return entries.some(entry => {
                 for (const col of ex.columns) {
                     if (!entry[col.key] || entry[col.key].toString().trim() === '') {
                         return false;
                     }
                 }
                 return true;
             });
        }

        if (ex.type === 'exposure_sheet') {
             return !!(data.theme && data.niveau_max !== undefined && data.heure_avant && data.heure_apres);
        }
        
        if (ex.type === 'goals_form') {
             return !!(data.objectif_0 && data.objectif_0.trim() !== '' && data.moyens_0 && data.moyens_0.trim() !== '');
        }
        
        if (ex.type === 'checklist') {
            // Check if at least one checkbox is checked
            return Object.keys(data).some(k => k.startsWith('item_') && data[k] === true);
        }
        
        if (ex.type === 'checklist_examples') {
             // Requires all text fields mapped to questions to be filled
             const itemKeys = Object.keys(data).filter(k => k.startsWith('personal_'));
             if (itemKeys.length === 0) return false;
             for (const k of itemKeys) {
                 if (!data[k] || data[k].trim() === '') return false;
             }
             return true;
        }

        return true;
    },

    renderSessionMainArea(s) {
        const area = document.getElementById('session-exercise-render-area');
        if (!area) return;

        const exId = this.state.sessionExerciseId;
        const isGuide = this._isGuideSessionNo(s.no);
        const isIntermediate = !isGuide && s.no !== Math.floor(s.no);
        const parentNo = isIntermediate ? Math.floor(s.no) : s.no;
        const lookupNo = isGuide ? s.no : parentNo;
        let sessionExercises = getExercisesForSession(lookupNo);
        const pid = this.state.selectedPatient?.id || 1;
        const p = this.state.selectedPatient;

        // For intermediate sessions, adapt exercises based on parent session status
        if (isIntermediate && p) {
            const parentCompleted = p.completedSessions.includes(parentNo);
            if (parentCompleted) {
                // Parent session was completed → show ALL exercises (repeat)
            } else {
                // Parent session is incomplete → show only remaining undone exercises
                sessionExercises = sessionExercises.filter(ex => {
                    return !this.isExerciseCompletedAnywhere(pid, ex.id, parentNo);
                });
            }
        }

        let warningBanner = '';
        if (!exId && !isIntermediate && s.no > 1) {
            const prevSessionNo = s.no - 1;
            const patient = this.state.selectedPatient;
            if (patient && patient.completedSessions.includes(prevSessionNo) && this.hasIncompleteExercises(pid, prevSessionNo)) {
                warningBanner = `
                    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin-bottom:1.5rem;display:flex;align-items:flex-start;gap:12px;text-align:left;">
                        <i class="fas fa-exclamation-triangle" style="color:#f59e0b;margin-top:3px;font-size:1.1rem;"></i>
                        <div>
                            <div style="font-weight:600;color:#92400e;font-size:0.85rem;margin-bottom:4px;">Exercices non termin\u00e9s (S\u00e9ance ${prevSessionNo})</div>
                            <div style="font-size:0.8rem;color:#92400e;line-height:1.4;">
                                La s\u00e9ance pr\u00e9c\u00e9dente contient des exercices inachev\u00e9s. Vous pouvez cr\u00e9er une s\u00e9ance interm\u00e9diaire pour les finaliser, ou les ignorer pour le moment.
                            </div>
                            <div style="margin-top:8px;">
                                <button class="btn-primary-custom" style="padding:4px 10px;font-size:0.75rem;background:#d97706;" onclick="app.addIntermediateSession(${prevSessionNo}); app.showPanel('dossier');">
                                    Cr\u00e9er une s\u00e9ance interm\u00e9diaire
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        if (!exId) {
            const exercises = sessionExercises;
            area.innerHTML = `
                <div class="panel-card">
                    <div class="panel-card-body" style="text-align:center;padding:3rem;">
                        ${warningBanner}
                        <i class="fas fa-clipboard-list" style="font-size:3rem;color:var(--primary-light);margin-bottom:1rem;display:block;"></i>
                        <h5 style="font-weight:700;color:var(--text);margin-bottom:8px;">${isGuide ? ('Guide — Avant séance ' + Math.ceil(s.no)) : ('Séance ' + (isIntermediate ? (parentNo + ' — Intermédiaire') : s.no))}</h5>
                        <p style="font-size:0.88rem;color:var(--text-muted);max-width:500px;margin:0 auto 1.5rem;">
                            ${exercises.length > 0
                                ? 'S\u00e9lectionnez un exercice ou cliquez sur le premier pour commencer.'
                                : 'Tous les exercices sont compl\u00e9t\u00e9s !'}
                        </p>
                        ${exercises.length > 0 ? `
                            <button class="btn-primary-custom" onclick="app.selectSessionExercise('${exercises[0].id}')">
                                <i class="fas fa-play me-1"></i> Commencer (${exercises[0].ref} ${exercises[0].title})
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
            return;
        }

        const ex = getExerciseById(exId);
        if (!ex) return;

        // Find current position in the session exercise list
        const currentIdx = sessionExercises.findIndex(e => e.id === exId);
        const prevEx = currentIdx > 0 ? sessionExercises[currentIdx - 1] : null;
        const nextEx = currentIdx < sessionExercises.length - 1 ? sessionExercises[currentIdx + 1] : null;
        const total = sessionExercises.length;
        const pos = currentIdx >= 0 ? currentIdx + 1 : '?';

        // Render the exercise
        ExerciseRenderer.render(ex, pid, area);

        // Add pagination bar AFTER the exercise
        const paginationHtml = `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;margin-top:16px;background:var(--bg-secondary, #f8fafc);border-radius:12px;border:1px solid var(--border, #e2e8f0);">
                <div>
                    ${prevEx ? `
                        <button class="btn-ghost" style="font-size:0.82rem;padding:6px 14px;" onclick="app.selectSessionExercise('${prevEx.id}')">
                            <i class="fas fa-arrow-left me-1"></i> Pr\u00e9c\u00e9dent
                        </button>
                    ` : '<div></div>'}
                </div>
                <div style="font-size:0.78rem;color:var(--text-muted, #64748b);font-weight:600;">
                    <i class="fas fa-list-ol me-1"></i> ${pos} / ${total}
                </div>
                <div>
                    ${nextEx ? `
                        <button class="btn-primary-custom" style="font-size:0.82rem;padding:6px 14px;" onclick="app.markDoneAndNext('${ex.id}', '${nextEx.id}')">
                            Suivant <i class="fas fa-arrow-right ms-1"></i>
                        </button>
                    ` : `
                        <button class="btn-primary-custom" style="font-size:0.82rem;padding:6px 14px;background:var(--success, #10b981);" onclick="app.markDoneAndFinish('${ex.id}')">
                            <i class="fas fa-check me-1"></i> Terminer
                        </button>
                    `}
                </div>
            </div>
        `;
        area.insertAdjacentHTML('beforeend', paginationHtml);
    },

    /* =================== EXERCISES PANEL =================== */
    renderExercises(view) {
        view.innerHTML = document.getElementById('tpl-exercises').innerHTML;

        const catList = document.getElementById('exercise-category-list');
        const activeCat = this.state.exerciseCategory || EXERCISE_CATEGORIES[0].id;

        catList.innerHTML = EXERCISE_CATEGORIES.map(cat => {
            const exercises = getExercisesByCategory(cat.id);
            const isActive = cat.id === activeCat;
            return `
                <div class="ex-cat-item ${isActive ? 'active' : ''}" onclick="app.selectExerciseCategory('${cat.id}')" style="${isActive ? 'border-left:3px solid ' + cat.color : ''}">
                    <i class="fas ${cat.icon}" style="color:${cat.color};width:20px;text-align:center;"></i>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.84rem;font-weight:${isActive ? '700' : '500'};">${cat.label}</div>
                        <div style="font-size:0.7rem;color:var(--text-muted);">${exercises.length} fiches</div>
                    </div>
                </div>
            `;
        }).join('');

        this.renderExerciseList(activeCat);
    },

    selectExerciseCategory(catId) {
        this.state.exerciseCategory = catId;
        this.renderExercises(document.getElementById('app-view'));
    },

    renderExerciseList(catId) {
        const area = document.getElementById('exercise-list-area');
        if (!area) return;
        const exercises = getExercisesByCategory(catId);
        const cat = EXERCISE_CATEGORIES.find(c => c.id === catId);
        const pid = this.state.selectedPatient?.id || 1;

        area.innerHTML = `
            <div class="panel-card">
                <div class="panel-card-header">
                    <h6><i class="fas ${cat.icon} me-2" style="color:${cat.color}"></i>${cat.label}</h6>
                </div>
                <div class="panel-card-body p-0">
                    ${exercises.map(ex => {
                        const status = ExerciseStorage.getStatus(pid, ex.id);
                        const isForm = !['info', 'model'].includes(ex.type);
                        const statusBadge = isForm ? (
                            status === 'completed' ? '<span class="ex-status-badge completed"><i class="fas fa-check"></i> Complété</span>' :
                            status === 'in_progress' ? '<span class="ex-status-badge in-progress"><i class="fas fa-pen"></i> En cours</span>' :
                            '<span class="ex-status-badge not-started">Non commencé</span>'
                        ) : '<span class="ex-status-badge info-badge"><i class="fas fa-book-open"></i> Lecture</span>';
                        return `
                            <div class="ex-list-item" onclick="app.openExercise('${ex.id}')">
                                <div class="ex-list-ref" style="background:${cat.color}">${ex.ref}</div>
                                <div style="flex:1;min-width:0;">
                                    <div class="ex-list-title">${ex.title}</div>
                                    <div class="ex-list-desc">${ex.description}</div>
                                    <div class="ex-list-sessions">
                                        <i class="fas fa-calendar-alt"></i>
                                        Séances ${ex.defaultSessions.map(sn => 'S' + sn).join(', ')}
                                    </div>
                                </div>
                                ${statusBadge}
                                <i class="fas fa-chevron-right" style="color:var(--text-light);font-size:0.7rem;"></i>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    openExercise(exerciseId) {
        this.state.activeExerciseId = exerciseId;
        this.state.activePanel = 'exercise_detail';
        this.render();
        this.updateSidebarActive('exercises');
    },

    printExercise(exerciseId) {
        const ex = getExerciseById(exerciseId);
        
        // If the exercise has a pre-made PDF available in the Resources folder, download/open it instead
        if (ex && ex.resourcePdf) {
            window.open(ex.resourcePdf, '_blank');
            return;
        }

        const exElement = document.querySelector('.exercise-detail');
        if (!exElement) return;
        
        // Create an isolated wrapper that sits on top of everything
        const printWrap = document.createElement('div');
        printWrap.id = 'print-exercise-wrapper';
        printWrap.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:999999;overflow:visible;padding:20px;';
        
        // Clone the exercise node to preserve the original view
        const clone = exElement.cloneNode(true);
        printWrap.appendChild(clone);
        document.body.appendChild(printWrap);
        
        // Add a class to body to trigger our specific @media print rules
        document.body.classList.add('is-printing-exercise');
        
        window.print();
        
        // Cleanup after the print dialog closes
        setTimeout(() => {
            if (document.body.contains(printWrap)) {
                document.body.removeChild(printWrap);
            }
            document.body.classList.remove('is-printing-exercise');
        }, 500);
    },

    renderExerciseDetail(view) {
        const ex = getExerciseById(this.state.activeExerciseId);
        if (!ex) { this.showPanel('exercises'); return; }
        const pid = this.state.selectedPatient?.id || 1;

        view.innerHTML = `
            <div class="mb-3">
                <button class="btn-ghost" onclick="app.showPanel('exercises')">
                    <i class="fas fa-arrow-left"></i> Retour aux exercices
                </button>
            </div>
            <div id="exercise-render-area"></div>
        `;

        ExerciseRenderer.render(ex, pid, document.getElementById('exercise-render-area'));
    },

    /* =================== DOSSIER EXERCISES TAB =================== */
    renderDossierExercisesTab(p) {
        const tabEl = document.getElementById('dossier-exercises-tab');
        if (!tabEl) return;
        const pid = p.id;

        const activeExercises = getActiveExercises();
        let completedCount = 0;
        let inProgressCount = 0;
        activeExercises.forEach(ex => {
            const s = ExerciseStorage.getStatus(pid, ex.id);
            if (s === 'completed') completedCount++;
            else if (s === 'in_progress') inProgressCount++;
        });

        tabEl.innerHTML = `
            <div class="d-flex gap-3 mb-3">
                <div class="ex-stat-pill"><i class="fas fa-check-circle" style="color:var(--success)"></i> ${completedCount} complétés</div>
                <div class="ex-stat-pill"><i class="fas fa-pen" style="color:var(--warning)"></i> ${inProgressCount} en cours</div>
                <div class="ex-stat-pill"><i class="fas fa-circle" style="color:var(--text-light)"></i> ${activeExercises.length - completedCount - inProgressCount} à faire</div>
            </div>
            ${EXERCISE_CATEGORIES.map(cat => {
                const exercises = getExercisesByCategory(cat.id).filter(e => !['info', 'model'].includes(e.type));
                if (!exercises.length) return '';
                return `
                    <div class="mb-3">
                        <div style="font-size:0.78rem;font-weight:700;color:${cat.color};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">
                            <i class="fas ${cat.icon} me-1"></i>${cat.label}
                        </div>
                        ${exercises.map(ex => {
                            const status = ExerciseStorage.getStatus(pid, ex.id);
                            const icon = status === 'completed' ? 'fa-check-circle' : status === 'in_progress' ? 'fa-circle-half-stroke' : 'fa-circle';
                            const iconColor = status === 'completed' ? 'var(--success)' : status === 'in_progress' ? 'var(--warning)' : 'var(--text-light)';
                            return `<div class="ex-dossier-item" onclick="app.openExercise('${ex.id}')">
                                <i class="fas ${icon}" style="color:${iconColor};font-size:0.75rem;flex-shrink:0;"></i>
                                <span class="ex-dossier-ref">${ex.ref}</span>
                                <span style="flex:1;font-size:0.82rem;">${ex.title}</span>
                                <i class="fas fa-chevron-right" style="color:var(--text-light);font-size:0.6rem;"></i>
                            </div>`;
                        }).join('')}
                    </div>
                `;
            }).join('')}
        `;
    },

    /* =================== CONSULTATION & OBJECTIFS =================== */
    renderConsultation(p, cardId, areaId) {
        const card = document.getElementById(cardId);
        const area = document.getElementById(areaId);
        if (!card || !area || !p.consultation) return;

        card.style.display = '';
        if (app.state.consultationOpen === false) {
            area.style.display = 'none';
            const icon = card.querySelector('.fa-chevron-down');
            if(icon) icon.style.transform = 'rotate(-90deg)';
        } else {
            area.style.display = 'block';
            const icon = card.querySelector('.fa-chevron-down');
            if(icon) icon.style.transform = 'rotate(0deg)';
        }

        const c = p.consultation;
        const dateStr = c.dateConsultation ? new Date(c.dateConsultation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

        card.style.display = '';
        area.innerHTML = `
            <div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:16px;">
                <div style="width:44px;height:44px;border-radius:50%;background:#d1fae5;color:#059669;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">
                    <i class="fas fa-user-doctor"></i>
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:700;font-size:0.92rem;">${c.medecinReferent}</div>

                    <div style="font-size:0.78rem;color:var(--text-muted);">${c.specialite}</div>
                    <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px;">
                        <i class="fas fa-calendar me-1"></i>${dateStr} &bull; <i class="fas fa-location-dot me-1"></i>${c.lieuConsultation}
                    </div>
                </div>
            </div>

            <div style="font-size:0.84rem;line-height:1.6;color:var(--text);margin-bottom:16px;padding:12px 14px;background:var(--bg);border-radius:8px;border-left:3px solid #10b981;">
                ${c.resumeConsultation}
            </div>

            ${c.examensCliniques?.length ? `
                <div style="margin-bottom:16px;">
                    <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);margin-bottom:8px;">
                        <i class="fas fa-flask me-1"></i>Examens complémentaires
                    </div>
                    ${c.examensCliniques.map(ex => `
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border);">
                            <span style="font-size:0.82rem;">${ex.label}</span>
                            <span style="font-size:0.78rem;font-weight:600;color:${ex.statut === 'ok' ? 'var(--success)' : ex.statut === 'alert' ? 'var(--danger)' : 'var(--text-muted)'};">
                                ${ex.statut === 'ok' ? '<i class="fas fa-check-circle me-1"></i>' : ex.statut === 'alert' ? '<i class="fas fa-exclamation-circle me-1"></i>' : ''}${ex.resultat}
                            </span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <div style="margin-bottom:12px;">
                <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);margin-bottom:8px;">
                    <i class="fas fa-file-medical me-1"></i>Diagnostic retenu
                </div>
                <div style="font-size:0.84rem;line-height:1.6;color:var(--text);padding:12px 14px;background:#fef3c7;border-radius:8px;border-left:3px solid #f59e0b;">
                    ${c.diagnosticMedical}
                </div>
            </div>

            <div>
                <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);margin-bottom:8px;">
                    <i class="fas fa-arrow-right-to-bracket me-1"></i>Orientation vers le psychologue
                </div>
                <div style="font-size:0.84rem;line-height:1.6;color:var(--text);padding:12px 14px;background:#ede9fe;border-radius:8px;border-left:3px solid #8b5cf6;">
                    ${c.orientationPsy}
                </div>
            </div>
        `;
    },

    renderObjectifs(p, cardId, areaId) {
        const card = document.getElementById(cardId);
        const area = document.getElementById(areaId);
        if (!card || !area || !p.objectifsTherapeutiques?.length) return;

        card.style.display = '';
        area.innerHTML = `
            <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:16px;line-height:1.5;">
                Plan de traitement TCC selon le protocole de   (2007) — ${p.totalSessions} séances prévues.
            </div>
            ${p.objectifsTherapeutiques.map(obj => `
                <div style="display:flex;gap:14px;align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--border);">
                    <div style="width:32px;height:32px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.82rem;flex-shrink:0;">
                        ${obj.numero}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:700;font-size:0.88rem;margin-bottom:3px;">${obj.titre}</div>
                        <div style="font-size:0.82rem;color:var(--text);line-height:1.5;margin-bottom:4px;">${obj.description}</div>
                        <span style="font-size:0.72rem;color:var(--primary);font-weight:600;background:var(--primary-light);padding:2px 8px;border-radius:10px;">
                            <i class="fas fa-calendar-alt me-1"></i>${obj.seances}
                        </span>
                    </div>
                </div>
            `).join('')}
        `;
    },

    /* =================== SCALE MODAL =================== */
    openScaleModal(scaleKey) {
        const scale = SCALES[scaleKey];
        this.state.scaleAnswers[scaleKey] = {};
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop-custom';
        backdrop.id = 'scale-modal';
        backdrop.innerHTML = `
            <div class="modal-panel">
                <div class="modal-panel-header">
                    <h5><i class="fas fa-stethoscope me-2 text-primary-c"></i>${scale.name}</h5>
                    <button class="btn-sm-icon" onclick="document.getElementById('scale-modal').remove()"><i class="fas fa-xmark"></i></button>
                </div>
                <div class="modal-panel-body">
                    ${scale.items.map((q, i) => {
                        const qText = typeof q === 'object' ? q.text : q;
                        const qInverse = typeof q === 'object' ? q.inverseScore : false;
                        const qOptions = (typeof q === 'object' && q.options) ? q.options : scale.options;
                        return `
                        <div class="scale-item">
                            <div class="scale-question">${i + 1}. ${qText}</div>
                            <div class="scale-options">
                                ${qOptions.map((opt, v) => {
                                    const actualVal = qInverse ? (qOptions.length - 1 - v) : v;
                                    const displayOpt = opt.replace(/\s*\(\d+\)$/, "");
                                    return `<div class="scale-option" data-scale="${scaleKey}" data-item="${i}" data-val="${actualVal}" onclick="app.selectOption(this)">${displayOpt}</div>`;
                                }).join('')}
                            </div>
                        </div>
                        `;
                    }).join('')}
                    <div class="score-display mt-3">
                        <div class="score-number" id="score-${scaleKey}">0</div>
                        <div>
                            <div style="font-weight:700;" id="score-label-${scaleKey}">Répondez à toutes les questions</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">/ ${scale.maxScore}</div>
                        </div>
                    </div>
                </div>
                <div class="modal-panel-footer">
                    <button class="btn-ghost" onclick="document.getElementById('scale-modal').remove()">Annuler</button>
                    <button class="btn-primary-custom" onclick="app.saveScaleResult('${scaleKey}');document.getElementById('scale-modal').remove()">
                        <i class="fas fa-save"></i> Enregistrer le score
                    </button>
                </div>
            </div>
        `;
        document.getElementById('modal-root').appendChild(backdrop);
    },

    selectOption(el) {
        const scaleKey = el.dataset.scale;
        const item = parseInt(el.dataset.item);
        const val = parseInt(el.dataset.val);
        el.closest('.scale-options').querySelectorAll('.scale-option').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        if (!this.state.scaleAnswers[scaleKey]) this.state.scaleAnswers[scaleKey] = {};
        this.state.scaleAnswers[scaleKey][item] = val;
        const total = Object.values(this.state.scaleAnswers[scaleKey]).reduce((a, b) => a + b, 0);
        const scoreEl = document.getElementById(`score-${scaleKey}`);
        const labelEl = document.getElementById(`score-label-${scaleKey}`);
        if (scoreEl) scoreEl.textContent = total;
        if (labelEl) {
            const interp = this.interpretScale(scaleKey, total);
            labelEl.textContent = interp.label;
            labelEl.style.color = `var(--${interp.color})`;
        }
    },

    saveScaleResult(scaleKey) {
        const total = Object.values(this.state.scaleAnswers[scaleKey] || {}).reduce((a, b) => a + b, 0);
        const p = this.state.selectedPatient;
        const s = this.state.activeSession;
        if (p && s) {
            if (!p.sessionScores) p.sessionScores = {};
            if (!p.sessionScores[s.no]) p.sessionScores[s.no] = {};
            p.sessionScores[s.no][scaleKey] = total;
        }
        const interp = this.interpretScale(scaleKey, total);
        this.showToast(`${SCALES[scaleKey].abbr} enregistré : ${total} — ${interp.label}`, 'success');
        if (s) this.renderSessionScales(s);
    },

    /* =================== NOTES & COMPLETION =================== */
    saveNotes() {
        const p = this.state.selectedPatient;
        const s = this.state.activeSession;
        if (!p || !s) return;
        const text = document.getElementById('clinical-notes')?.value || '';
        if (!p.notes) p.notes = {};
        p.notes[`session_${s.no}`] = text;
        this.showToast('Notes cliniques sauvegardées.', 'success');
    },

    async deleteIntermediateSession(sessionNo, parentNo) {
        if (!confirm('Voulez-vous vraiment supprimer cette s\u00e9ance interm\u00e9diaire ? Toute donnée associée sera perdue.')) return;
        const p = this.state.selectedPatient;
        if (!p) return;
        p.intermediateSessions = p.intermediateSessions.filter(i => i.session_number !== sessionNo);
        p.completedSessions = p.completedSessions.filter(n => n !== sessionNo);
        await LocalAPI.savePatientProgress(p);
        this.render();
    },

    async addDynamicExercise(exerciseId) {
        if (!exerciseId) return;
        const p = this.state.selectedPatient;
        const s = this.state.activeSession;
        if (!p || !s) return;
        
        const parentNo = Math.floor(s.no);
        if (!p.addedExercises) p.addedExercises = {};
        if (!p.addedExercises[parentNo]) p.addedExercises[parentNo] = [];
        
        if (!p.addedExercises[parentNo].includes(exerciseId)) {
            p.addedExercises[parentNo].push(exerciseId);
            await LocalAPI.savePatientProgress(p);
            this.showToast("Exercice ou test ajouté à l'agenda.", "success");
            this.render(); 
        } else {
            this.showToast("Cet outil est déjà dans l'agenda de cette séance.", "warning");
        }
    },
    async completeCurrentSession() {
        const p = this.state.selectedPatient;
        const s = this.state.activeSession;
        if (!p || !s) return;
        this.saveNotes();
        if (!p.completedSessions.includes(s.no)) {
            p.completedSessions.push(s.no);
            if (s.no >= p.currentSession) {
                p.currentSession = Math.min(s.no + 1, p.totalSessions);
            }
        }

        // Persist to LocalAPI
        try {
            const notes = document.getElementById('clinical-notes')?.value || '';
            await LocalAPI.completeSession(p.id, s.no, notes);
        } catch (e) { console.error('Erreur sauvegarde session:', e); }

        this.showToast(`Séance ${s.no} clôturée avec succès.`, 'success');
        const btn = document.getElementById('btn-complete-session');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Séance clôturée';
            btn.style.background = 'var(--success)';
            btn.disabled = true;
        }
        setTimeout(() => this.showPanel('dossier'), 1500);
    },

    /* =================== HELPERS =================== */
    interpretScale(scaleKey, score) {
        const scale = SCALES[scaleKey];
        if (!scale) return { label: '—', color: 'info' };
        const interp = scale.interpretation.find(i => score >= i.min && score <= i.max);
        return interp || { label: '—', color: 'info' };
    },

    initials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },

    truncate(str, max) {
        return str.length > max ? str.substring(0, max) + '…' : str;
    },

    /* =================== CUSTOM EXERCISE BUILDER =================== */
    openCustomExerciseBuilder() {
        const root = document.getElementById('modal-root');
        if (!root) return;
        root.innerHTML = `
            <div class="modal-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1050;display:flex;align-items:center;justify-content:center;padding:16px;">
                <div style="background:var(--surface);border-radius:var(--r-lg);box-shadow:var(--shadow-lg);width:100%;max-width:600px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;">
                    <div style="padding:1.2rem 1.4rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
                        <h5 style="margin:0;font-weight:800;"><i class="fas fa-pencil-ruler me-2 text-primary-c"></i>Créer un exercice personnalisé</h5>
                        <button class="btn-sm-icon" onclick="document.getElementById('modal-root').innerHTML=''"><i class="fas fa-xmark"></i></button>
                    </div>
                    <div style="padding:1.2rem 1.4rem;overflow-y:auto;flex:1;">
                        <div class="mb-3">
                            <label style="font-size:0.82rem;font-weight:700;color:var(--text-muted);">Titre de l'exercice *</label>
                            <input type="text" id="custom-ex-title" class="form-control form-control-sm mt-1" placeholder="Ex: Fiche de suivi du sommeil" />
                        </div>
                        <div class="mb-3">
                            <label style="font-size:0.82rem;font-weight:700;color:var(--text-muted);">Description / Instructions</label>
                            <textarea id="custom-ex-desc" class="form-control form-control-sm mt-1" rows="2" placeholder="Expliquez les consignes pour le patient..."></textarea>
                        </div>
                        <div style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:0.82rem;font-weight:700;color:var(--text-muted);">Questions</span>
                            <button class="btn-ghost" style="font-size:0.75rem;color:var(--primary);" onclick="app.addCustomQuestion()">
                                <i class="fas fa-plus"></i> Ajouter une question
                            </button>
                        </div>
                        <div id="custom-ex-questions" style="display:flex;flex-direction:column;gap:8px;"></div>
                    </div>
                    <div style="padding:1rem 1.4rem;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;">
                        <button class="btn-ghost" onclick="document.getElementById('modal-root').innerHTML=''">Annuler</button>
                        <button class="btn-primary-custom" onclick="app.saveCustomExercise()"><i class="fas fa-save me-1"></i>Créer & Ajouter à la séance</button>
                    </div>
                </div>
            </div>
        `;
        // Add first question automatically
        this.addCustomQuestion();
    },

    _customQuestionCount: 0,
    addCustomQuestion() {
        const container = document.getElementById('custom-ex-questions');
        if (!container) return;
        const idx = ++this._customQuestionCount;
        const div = document.createElement('div');
        div.id = `cq-${idx}`;
        div.style.cssText = 'background:var(--surface-2);border-radius:var(--r-sm);padding:10px 12px;display:flex;flex-direction:column;gap:6px;';
        div.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:0.75rem;font-weight:700;color:var(--primary);">Question ${idx}</span>
                <button class="btn-sm-icon" onclick="document.getElementById('cq-${idx}').remove()" title="Supprimer"><i class="fas fa-trash" style="color:var(--danger);font-size:0.7rem;"></i></button>
            </div>
            <input type="text" class="form-control form-control-sm cq-text" placeholder="Libellé de la question..." />
            <div style="display:flex;align-items:center;gap:8px;">
                <label style="font-size:0.75rem;font-weight:600;color:var(--text-muted);white-space:nowrap;">Type :</label>
                <select class="form-select form-select-sm cq-type" style="font-size:0.75rem;max-width:200px;">
                    <option value="text">Réponse libre (texte)</option>
                    <option value="likert5">Likert 0–5</option>
                    <option value="likert10">Likert 0–10</option>
                    <option value="yesno">Oui / Non</option>
                </select>
            </div>
        `;
        container.appendChild(div);
    },

    async saveCustomExercise() {
        const title = document.getElementById('custom-ex-title')?.value.trim();
        const desc = document.getElementById('custom-ex-desc')?.value.trim();
        if (!title) { this.showToast('Le titre est obligatoire.', 'warning'); return; }

        const questions = [];
        document.querySelectorAll('#custom-ex-questions > div').forEach(div => {
            const text = div.querySelector('.cq-text')?.value.trim();
            const type = div.querySelector('.cq-type')?.value || 'text';
            if (text) questions.push({ text, type });
        });

        if (questions.length === 0) { this.showToast('Ajoutez au moins une question.', 'warning'); return; }

        const p = this.state.selectedPatient;
        const s = this.state.activeSession;
        if (!p || !s) return;

        const exerciseId = 'custom_' + Date.now();
        const customEx = { id: exerciseId, ref: 'Perso', category: 'custom', title, description: desc || '', questions, type: 'custom', isCustom: true, createdAt: new Date().toISOString() };

        if (!p.customExercises) p.customExercises = {};
        p.customExercises[exerciseId] = customEx;

        const parentNo = Math.floor(s.no);
        if (!p.addedExercises) p.addedExercises = {};
        if (!p.addedExercises[parentNo]) p.addedExercises[parentNo] = [];
        if (!p.addedExercises[parentNo].includes(exerciseId)) {
            p.addedExercises[parentNo].push(exerciseId);
        }

        await LocalAPI.savePatientProgress(p);
        document.getElementById('modal-root').innerHTML = '';
        this.showToast(`Exercice "${title}" créé et ajouté à l'agenda.`, 'success');
        this.render();
    },

    /* =================== PANIQUE ET AGORAPHOBIE LOGIC =================== */
    _calcBurnsScore(container) {
        if(!container) return;
        let c1=0, c2=0, c3=0;
        let answered = 0;
        container.querySelectorAll('.ex-check:checked').forEach(el => {
            const v = parseInt(el.dataset.val);
            const key = el.dataset.key; // item_1 to item_33
            const num = parseInt(key.split('_')[1]);
            answered++;
            if(num >= 1 && num <= 6) c1 += v;
            else if(num >= 7 && num <= 17) c2 += v;
            else if(num >= 18 && num <= 33) c3 += v;
        });
        
        const area = container.querySelector('.burns-score-area');
        if(!area) return;
        if(answered === 0) { area.style.display = 'none'; return; }
        
        const total = c1 + c2 + c3;
        let html = `<strong>Score Total : ${total}/99</strong><br>
        <span style="font-size:0.85rem;color:var(--text-muted);">Cat 1 (Sentiments) : ${c1}/18 | Cat 2 (Pensées) : ${c2}/33 | Cat 3 (Physiques) : ${c3}/48</span>`;
        
        if (c3 > 15) {
            html += `<div class="alert alert-danger mt-2 mb-0" style="font-size:0.85rem;"><i class="fas fa-exclamation-circle"></i> <strong>Alerte Psychologue :</strong> Symptômes physiologiques disproportionnés ! Prévoyez un exercice de rééducation respiratoire d'urgence.</div>`;
        }
        area.innerHTML = html;
        area.style.display = 'block';
    },

    _checkPanicAlert(container) {
        if(!container) return;
        const area = container.querySelector('.panic-alert-container');
        if(!area) return;
        
        let hasDeathFear = false;
        container.querySelectorAll('.symp-check:checked').forEach(e => {
            const lbl = e.dataset.label || '';
            if (lbl.includes("Peur de mourir") || lbl.includes("Douleur thoracique")) hasDeathFear = true;
        });
        
        if (hasDeathFear) {
            area.innerHTML = `<div class="alert alert-warning mt-2 mb-0" style="font-size:0.85rem;"><i class="fas fa-lightbulb"></i> <strong>Modèle Fausse Alarme :</strong> Il est recommandé d'expliquer au patient que la douleur thoracique et la peur de mourir sont des conséquences normales de de l'hyperventilation.</div>`;
        } else {
            area.innerHTML = '';
        }
    },

    _updateDelta(input) {
        const tr = input.closest('tr');
        const av = parseInt(tr.querySelector('[data-arr="avant"]').value);
        const ap = parseInt(tr.querySelector('[data-arr="apres"]').value);
        const dt = tr.querySelector('.delta-val');
        if(!isNaN(av) && !isNaN(ap)) {
            const delta = av - ap;
            dt.dataset.delta = delta;
            dt.textContent = delta > 0 ? '-'+delta : (delta == 0 ? '0' : '+'+Math.abs(delta));
            dt.className = 'align-middle fw-bold delta-disp delta-val ' + (delta > 0 ? 'text-success' : 'text-danger');
        } else {
            dt.textContent = "—";
            dt.dataset.delta = 0;
            dt.className = 'align-middle fw-bold delta-disp delta-val';
        }
    },
    
    _drawRespChart(exId) {
        const area = document.getElementById('resp-chart-' + exId);
        if(!area) return;
        const pts = [];
        document.querySelectorAll(`#resp-table-${exId} tbody tr:not(:last-child)`).forEach(tr => {
            const dt = tr.querySelector('.delta-val');
            if(dt && dt.textContent.trim() !== '—') {
                const d = parseFloat(dt.dataset.delta || 0);
                pts.push(d);
            }
        });
        if(pts.length === 0) { area.innerHTML = "[Le graphique Taux de Succès s'affichera après ajout de données]"; return; }
        
        area.innerHTML = `<strong>Tendance des succès respiratoires :</strong><br><div style="display:flex;gap:5px;align-items:flex-end;height:120px;margin-top:10px;">
           ${pts.map(p => {
               const h = Math.abs(p) * 10;
               const c = p > 0 ? 'var(--success)' : (p < 0 ? 'var(--danger)' : '#ccc');
               return `<div style="width:20px;height:${h}px;background:${c};" title="${p}"></div>`;
           }).join('')}
        </div><br><span style="font-size:0.8rem;">(Vert = Réduction d'anxiété)</span>`;
    },

    _updateInteroceptiveRow(input) {
        const val = parseInt(input.value);
        const d = input.closest('tr').querySelector('.target-col');
        if(val > 7) {
            d.innerHTML = '<span class="badge bg-danger">Mission requise</span>';
            input.closest('tr').style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
        } else {
            d.innerHTML = '<span style="color:var(--text-muted);font-size:0.75rem;">—</span>';
            input.closest('tr').style.backgroundColor = 'transparent';
        }
    },

    _updateIMA(container) {
        if(!container) return;
        if(container instanceof HTMLElement === false) {
            // Might be a direct call with exId or so, wrap logic safely
        }
        const selects = container.querySelectorAll('.avoid-select');
        let selectedPlaces = [];
        selects.forEach(sel => {
            const val = parseInt(sel.value);
            if(val >= 3) {
                const pname = sel.closest('div').querySelector('.place-name').textContent;
                selectedPlaces.push({name: pname, avoid: val, key: sel.dataset.key});
            }
        });
        
        const area = container.querySelector('.ima-hierarchy-container');
        if(!area) return;
        
        if(selectedPlaces.length === 0) {
            area.innerHTML = `<div class="alert alert-secondary mt-3" style="font-size:0.85rem;">Aucun lieu évité significativement (3+) n'a été sélectionné.</div>`;
            return;
        }
        
        let html = `<h6 class="mt-4">Étape 2 & 3 : Hiérarchie (Ordonner les missions)</h6><div class="alert alert-info" style="font-size:0.85rem;"><i class="fas fa-info-circle"></i> Le patient doit évaluer sa Peur (0-100) pour chaque lieu évité. Indiquez la peur ci-dessous :</div><div class="row g-2 mb-3">`;
        
        selectedPlaces.forEach(p => {
            html += `<div class="col-md-6 d-flex align-items-center justify-content-between" style="font-size:0.85rem;padding:6px;border-bottom:1px solid var(--border);">
                <span>${p.name} (Évt: ${p.avoid})</span>
                <div class="d-flex align-items-center">
                    <span class="me-2 text-muted">Peur:</span>
                    <input type="number" class="form-control form-control-sm ex-input ima-peur-input" style="width:70px;" data-key="peur_${p.key.split('_')[1]}" placeholder="0-100">
                </div>
            </div>`;
        });
        html += `</div>`;
        area.innerHTML = html;
        
        // Let user fill peur inputs. 
        // In reality we should fetch saved ones if we just re-rendered.
    },

    _checkNeutralization(container) {
        if(!container) return;
        const strat = container.querySelector('input[type="radio"]:checked')?.dataset.val;
        const alertArea = container.querySelector('.habituation-alert-container');
        if(!alertArea) return;
        
        if (strat === '2') {
            alertArea.style.display = 'block';
            alertArea.className = 'alert alert-danger mt-2 mb-0 habituation-alert-container';
            alertArea.innerHTML = `<i class="fas fa-running"></i> <strong>Évitement (Fuite)</strong> : L'exposition a échoué. Discutez des déclencheurs et recommanez à un niveau IMA inférieur.`;
        } else if (strat === '3') {
            alertArea.style.display = 'block';
            alertArea.className = 'alert alert-warning mt-2 mb-0 habituation-alert-container';
            alertArea.innerHTML = `<i class="fas fa-shield-alt"></i> <strong>Surutilisation d'une béquille</strong> : L'anxiété baissera superficiellement, mais le cerveau ne fera pas l'habituation. Il faut refaire l'exercice SANS cet objet de sécurité.`;
        } else if (strat === '1') {
            alertArea.style.display = 'block';
            alertArea.className = 'alert alert-success mt-2 mb-0 habituation-alert-container';
            alertArea.innerHTML = `<i class="fas fa-check-circle"></i> <strong>Succès pur</strong> : Habituation neurologique enclenchée.`;
        } else {
            alertArea.style.display = 'none';
        }
    },

    /* =================== TOAST =================== */
    showToast(message, type = 'info') {
        // Some trouble pages may not include the toast container immediately.
        // Create it on-demand to avoid silent failures.
        let stack = document.getElementById('toast-stack');
        if (!stack) {
            stack = document.createElement('div');
            stack.id = 'toast-stack';
            stack.className = 'toast-stack';
            document.body.appendChild(stack);
        }
        const id = 'toast-' + Date.now();
        const icons = { success: 'fa-check-circle', warning: 'fa-triangle-exclamation', danger: 'fa-circle-xmark', info: 'fa-circle-info' };
        const colors = { success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)', info: 'var(--primary)' };
        const toast = document.createElement('div');
        toast.className = `toast-item ${type}`;
        toast.id = id;
        toast.style.borderLeftColor = colors[type] || colors.info;
        toast.innerHTML = `
            <i class="fa-solid ${icons[type] || icons.info}" style="color:${colors[type]};font-size:1.1rem;"></i>
            <span style="flex:1;">${message}</span>
            <button class="btn-sm-icon" onclick="document.getElementById('${id}').remove()" style="border:none;background:none;width:24px;height:24px;">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        stack.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }
};

// Expose app for registry helpers (custom exercises / added exercises).
// Some helper files check `window.app` explicitly.
window.app = app;

window.onload = () => app.init();
