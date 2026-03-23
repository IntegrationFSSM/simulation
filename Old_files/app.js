/**
 * Ory+ TCC Simulator — Application Logic
 * Protocole TAG (Dugas & Robichaud, 2007)
 */

const app = {
    state: {
        activePanel: 'dashboard',
        selectedPatient: null,
        activeSession: null,
        activeExerciseId: null,
        exerciseCategory: null,
        sessionExerciseId: null,
        chartInstance: null,
        scaleAnswers: {}
    },

    init() {
        this.render();
    },

    /* =================== NAVIGATION =================== */
    showPanel(panelId, sessionNo = null) {
        this.state.activePanel = panelId;
        if (sessionNo) {
            const p = this.state.selectedPatient;
            if (p) {
                this.state.activeSession = { no: sessionNo };
            }
        }
        this.render();
        this.updateSidebarActive(panelId);
    },

    updateSidebarActive(panelId) {
        document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
        const bc = document.getElementById('breadcrumb-current');
        if (panelId === 'dashboard') {
            document.getElementById('nav-dashboard')?.classList.add('active');
            bc.textContent = 'Tableau de Bord';
        } else if (panelId === 'psy') {
            document.getElementById('nav-psy')?.classList.add('active');
            bc.textContent = 'Espace Psychologue';
        } else if (panelId === 'dossier' && this.state.selectedPatient) {
            bc.textContent = `Dossier — ${this.state.selectedPatient.name}`;
        } else if (panelId === 'session' && this.state.activeSession) {
            bc.textContent = `Séance ${this.state.activeSession.no}`;
        } else if (panelId === 'exercises' || panelId === 'exercise_detail') {
            bc.textContent = 'Exercices TAG';
        }
    },

    selectPatient(id) {
        this.state.selectedPatient = simulationData.patients.find(p => p.id === id);
        this.state.activeSession = null;
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
        if (panel === 'dashboard') this.renderDashboard(view);
        else if (panel === 'psy') this.renderPsy(view);
        else if (panel === 'dossier') this.renderDossier(view);
        else if (panel === 'session') this.renderSession(view);
        else if (panel === 'exercises') this.renderExercises(view);
        else if (panel === 'exercise_detail') this.renderExerciseDetail(view);
    },

    /* =================== DASHBOARD =================== */
    renderDashboard(view) {
        view.innerHTML = document.getElementById('tpl-dashboard').innerHTML;

        const totalCompleted = simulationData.patients.reduce((a, p) => a + p.completedSessions.length, 0);
        const avgGAD = simulationData.patients.reduce((a, p) => a + (p.score_initial?.GAD7 || 0), 0) / simulationData.patients.length;

        document.getElementById('stats-row').innerHTML = `
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon blue"><i class="fas fa-users"></i></div>
                    <div><div class="stat-value">${simulationData.patients.length}</div><div class="stat-label">Patients actifs</div></div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon green"><i class="fas fa-calendar-check"></i></div>
                    <div><div class="stat-value">${totalCompleted}</div><div class="stat-label">Séances complétées</div></div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon orange"><i class="fas fa-chart-line"></i></div>
                    <div><div class="stat-value">${avgGAD.toFixed(1)}</div><div class="stat-label">GAD-7 moyen initial</div></div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon purple"><i class="fas fa-clipboard-list"></i></div>
                    <div><div class="stat-value">${EXERCISES.length}</div><div class="stat-label">Exercices TAG</div></div>
                </div>
            </div>
        `;

        const grid = document.getElementById('patients-grid');
        simulationData.patients.forEach(p => {
            const pct = Math.round((p.completedSessions.length / p.totalSessions) * 100);
            const gad = p.score_initial?.GAD7 || 0;
            const gadInterp = this.interpretScale('GAD7', gad);
            const avatarClass = p.sexe === 'F' ? 'female' : 'male';

            const div = document.createElement('div');
            div.className = 'col-md-6 col-lg-4';
            div.innerHTML = `
                <div class="patient-card" onclick="app.selectPatient(${p.id})">
                    <div class="patient-card-header">
                        <div class="patient-card-avatar ${avatarClass}">
                            ${this.initials(p.name)}
                        </div>
                        <div class="patient-card-info" style="flex:1;min-width:0;">
                            <h6>${p.name}</h6>
                            <p>${p.age} ans &bull; ${p.sexe === 'F' ? 'Femme' : 'Homme'} &bull; ${p.profession}</p>
                        </div>
                    </div>
                    <div class="patient-card-body">
                        <div style="margin-bottom:8px;">
                            ${p.diagnoses.map(d => `<span class="diagnosis-badge">${d}</span>`).join('')}
                        </div>
                        <div style="font-size:0.79rem;color:var(--text-muted);margin-bottom:10px;line-height:1.4;">
                            <i class="fas fa-quote-left" style="font-size:0.7rem;opacity:0.5;"></i> ${this.truncate(p.motif, 120)}
                        </div>
                        <div class="progress-wrap">
                            <div class="progress-label">
                                <span>Avancement</span>
                                <span style="font-weight:700;color:var(--primary);">${p.completedSessions.length}/${p.totalSessions}</span>
                            </div>
                            <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="gad-score-pill ${gadInterp.color}"><i class="fas fa-stethoscope"></i> GAD-7 : ${gad}</span>
                            <span style="font-size:0.73rem;color:var(--text-muted);">Séance ${p.currentSession}</span>
                        </div>
                    </div>
                    <div class="patient-card-footer">
                        <button class="btn-primary-custom w-100" style="justify-content:center;" onclick="event.stopPropagation();app.selectPatient(${p.id})">
                            <i class="fas fa-folder-open"></i> Ouvrir le dossier
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(div);
        });
    },

    /* =================== ESPACE PSYCHOLOGUE =================== */
    renderPsy(view) {
        view.innerHTML = document.getElementById('tpl-psy').innerHTML;

        const listEl = document.getElementById('psy-patient-list');
        listEl.innerHTML = simulationData.patients.map(p => {
            const isSelected = this.state.selectedPatient?.id === p.id;
            return `
                <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;cursor:pointer;margin-bottom:4px;${isSelected ? 'background:var(--primary-light);border-left:3px solid var(--primary);' : 'border-left:3px solid transparent;'}" onclick="app.psySelectPatient(${p.id})">
                    <div style="width:38px;height:38px;border-radius:50%;background:${isSelected ? 'var(--primary)' : 'var(--primary-light)'};color:${isSelected ? 'white' : 'var(--primary)'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.78rem;flex-shrink:0;">
                        ${this.initials(p.name)}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:600;font-size:0.88rem;">${p.name}</div>
                        <div style="font-size:0.75rem;color:var(--text-muted);">${p.diagnoses.join(', ')} &bull; ${p.age} ans</div>
                    </div>
                </div>
            `;
        }).join('');

        if (this.state.selectedPatient) {
            this.renderPsyDetail(this.state.selectedPatient);
        }
    },

    psySelectPatient(id) {
        this.state.selectedPatient = simulationData.patients.find(p => p.id === id);
        this.renderPsy(document.getElementById('app-view'));
    },

    renderPsyDetail(p) {
        const detailEl = document.getElementById('psy-patient-detail');
        detailEl.innerHTML = `
            <div style="display:flex;gap:14px;align-items:flex-start;">
                <div style="width:52px;height:52px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0;">
                    ${this.initials(p.name)}
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:700;font-size:1rem;margin-bottom:2px;">${p.name}</div>
                    <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:6px;">${p.age} ans &bull; ${p.sexe === 'F' ? 'Femme' : 'Homme'} &bull; ${p.profession}</div>
                    <div style="margin-bottom:8px;">${p.diagnoses.map(d => `<span class="diagnosis-badge">${d}</span>`).join('')}</div>
                    <div style="font-size:0.82rem;color:var(--text);line-height:1.5;margin-bottom:8px;">
                        <strong>Motif de consultation :</strong> ${p.motif}
                    </div>
                    ${p.antecedents ? `<div style="font-size:0.82rem;color:var(--text);line-height:1.5;">
                        <strong>Antécédents :</strong> ${p.antecedents}
                    </div>` : ''}
                    <div style="margin-top:12px;">
                        <button class="btn-primary-custom" style="font-size:0.8rem;" onclick="app.selectPatient(${p.id})">
                            <i class="fas fa-folder-open"></i> Ouvrir le dossier complet
                        </button>
                    </div>
                </div>
            </div>
        `;

        const scoresEl = document.getElementById('psy-scores-area');
        const si = p.score_initial;
        scoresEl.innerHTML = ['GAD7', 'BAI', 'BDI'].map(key => {
            const scale = SCALES[key];
            const score = si[key] || 0;
            const interp = this.interpretScale(key, score);
            return `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
                    <div>
                        <div style="font-weight:600;font-size:0.84rem;">${scale.abbr}</div>
                        <div style="font-size:0.72rem;color:var(--text-muted);">Score initial</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:1.1rem;font-weight:800;color:var(--primary);">${score}</span><span style="font-size:0.72rem;color:var(--text-muted);">/${scale.maxScore}</span>
                        <div><span class="gad-score-pill ${interp.color}" style="font-size:0.65rem;">${interp.label}</span></div>
                    </div>
                </div>
            `;
        }).join('');

        const sessEl = document.getElementById('psy-session-list');
        const pct = Math.round((p.completedSessions.length / p.totalSessions) * 100);
        sessEl.innerHTML = `
            <div style="text-align:center;margin-bottom:10px;">
                <div style="font-size:1.8rem;font-weight:900;color:var(--primary);">${p.completedSessions.length}<span style="font-size:0.85rem;opacity:0.7;">/${p.totalSessions}</span></div>
                <div style="font-size:0.75rem;color:var(--text-muted);">séances réalisées</div>
            </div>
            <div class="progress-bar-track" style="margin-bottom:10px;"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
            <div style="font-size:0.78rem;color:var(--text-muted);text-align:center;">
                Prochaine séance : <strong style="color:var(--primary);">Séance ${p.currentSession}</strong>
            </div>
            <div style="text-align:center;margin-top:10px;">
                <button class="btn-ghost" style="font-size:0.78rem;" onclick="app.showPanel('session', ${p.currentSession})">
                    <i class="fas fa-play-circle"></i> Démarrer la séance ${p.currentSession}
                </button>
            </div>
        `;

        this.renderConsultation(p, 'psy-consultation-card', 'psy-consultation-area');
        this.renderObjectifs(p, 'psy-objectifs-card', 'psy-objectifs-area');
    },

    /* =================== DOSSIER =================== */
    renderDossier(view) {
        const p = this.state.selectedPatient;
        if (!p) { this.showPanel('dashboard'); return; }

        view.innerHTML = document.getElementById('tpl-dossier').innerHTML;
        const sessions = simulationData.getSessionsForPatient(p);

        document.getElementById('dossier-header-content').innerHTML = `
            <div class="d-flex align-items-center gap-4 flex-wrap">
                <div style="width:70px;height:70px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;color:white;flex-shrink:0;">
                    ${this.initials(p.name)}
                </div>
                <div style="flex:1;min-width:220px;">
                    <h4 style="margin:0 0 4px;font-weight:800;">${p.name}</h4>
                    <p style="margin:0 0 8px;opacity:0.85;font-size:0.88rem;">${p.age} ans &bull; ${p.sexe === 'F' ? 'Femme' : 'Homme'} &bull; ${p.profession}</p>
                    <div style="font-size:0.82rem;opacity:0.8;line-height:1.4;"><i class="fas fa-notes-medical me-1"></i>${p.motif}</div>
                    <div style="margin-top:10px;">${p.diagnoses.map(d => `<span style="background:rgba(255,255,255,0.2);color:white;border-radius:20px;padding:3px 12px;font-size:0.72rem;font-weight:700;margin-right:6px;">${d}</span>`).join('')}</div>
                </div>
                <div style="text-align:right;flex-shrink:0;min-width:220px;">
                    <div style="font-size:2.1rem;font-weight:900;">${p.completedSessions.length}<span style="font-size:0.95rem;opacity:0.8;">/${p.totalSessions}</span></div>
                    <div style="font-size:0.78rem;opacity:0.8;margin-bottom:6px;">séances prévues</div>
                    <div class="d-flex gap-2" style="justify-content:flex-end;">
                        <button class="btn-primary-custom" style="font-size:0.78rem;padding:6px 14px;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.3);" onclick="app.addSession()">
                            <i class="fas fa-plus"></i> Ajouter séance
                        </button>
                        <button class="btn-ghost" style="font-size:0.78rem;padding:6px 14px;color:white;border:1px solid rgba(255,255,255,0.3);" onclick="app.removeSession()">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('dossier-progress-badge').textContent = `${Math.round((p.completedSessions.length / p.totalSessions) * 100)}%`;

        const timeline = document.getElementById('dossier-session-timeline');
        timeline.innerHTML = sessions.map(s => {
            const isDone = p.completedSessions.includes(s.no);
            const isCurrent = s.no === p.currentSession;
            const exercisesForSession = getExercisesForSession(s.no);
            const exerciseCount = exercisesForSession.length;
            return `
                <div class="timeline-row" onclick="app.showPanel('session', ${s.no})">
                    <div class="timeline-dot ${isDone ? 'done' : isCurrent ? 'current' : 'pending'}">
                        ${isDone ? '<i class="fas fa-check" style="font-size:0.65rem;"></i>' : s.no}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.84rem;font-weight:${isCurrent ? '700' : '500'};color:${isCurrent ? 'var(--primary)' : 'var(--text)'};">
                            Séance ${s.no}
                        </div>
                        <div style="font-size:0.72rem;color:var(--text-muted);">
                            ${exerciseCount} exercice${exerciseCount > 1 ? 's' : ''} associé${exerciseCount > 1 ? 's' : ''}
                        </div>
                    </div>
                    ${isDone
                        ? '<span class="badge" style="background:var(--success);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">Terminée</span>'
                        : isCurrent
                            ? '<span class="badge" style="background:var(--warning);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">En cours</span>'
                            : ''
                    }
                </div>
            `;
        }).join('');

        const si = p.score_initial;
        document.getElementById('dossier-scores-initial').innerHTML = `
            <div class="row g-2">
                ${['GAD7', 'BAI', 'BDI'].map(key => {
                    const scale = SCALES[key];
                    const score = si[key] || 0;
                    const interp = this.interpretScale(key, score);
                    return `
                        <div class="col-4 text-center">
                            <div style="font-size:1.6rem;font-weight:900;color:var(--primary);">${score}</div>
                            <div style="font-size:0.72rem;font-weight:700;color:var(--text-muted);">${scale.abbr}</div>
                            <span class="gad-score-pill ${interp.color}" style="margin-top:4px;display:inline-flex;font-size:0.68rem;">${interp.label}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        this.renderPatientChart(p);
        this.renderDossierExercisesTab(p);
        this.renderConsultation(p, 'dossier-consultation-card', 'dossier-consultation-area');
        this.renderObjectifs(p, 'dossier-objectifs-card', 'dossier-objectifs-area');
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

        document.getElementById('session-main-title').textContent = `Séance ${s.no}`;
        document.getElementById('session-patient-name').innerHTML = p
            ? `<i class="fas fa-user me-1"></i>${p.name} &bull; ${p.age} ans &bull; ${p.profession}`
            : '';
        document.getElementById('session-badge').textContent = `#${s.no}`;

        const infoArea = document.getElementById('session-info-area');
        const exercises = getExercisesForSession(s.no);
        infoArea.innerHTML = `
            <div style="font-size:0.84rem;margin-bottom:12px;">
                <i class="fas fa-user me-1 text-primary-c"></i>
                <strong>${p?.name || '—'}</strong>
            </div>
            <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:8px;">
                <i class="fas fa-clipboard-list me-1"></i> ${exercises.length} exercice${exercises.length > 1 ? 's' : ''} disponible${exercises.length > 1 ? 's' : ''}
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
        const sessionExercises = getExercisesForSession(s.no);
        const allExercises = EXERCISES;
        const otherExercises = allExercises.filter(ex => !sessionExercises.some(se => se.id === ex.id));
        const pid = this.state.selectedPatient?.id || 1;

        const optionHtml = (ex, isSession) => {
            const status = ExerciseStorage.getStatus(pid, ex.id);
            const mark = status === 'completed' ? ' \u2713' : status === 'in_progress' ? ' \u25CF' : '';
            return `<option value="${ex.id}" ${this.state.sessionExerciseId === ex.id ? 'selected' : ''}>${ex.ref} ${ex.title}${mark}</option>`;
        };

        area.innerHTML = `
            <div style="margin-bottom:10px;">
                <select class="form-select form-select-sm" id="session-exercise-select" onchange="app.selectSessionExercise(this.value)">
                    <option value="">— Choisir un exercice —</option>
                    <optgroup label="Exercices de cette séance">
                        ${sessionExercises.map(ex => optionHtml(ex, true)).join('')}
                    </optgroup>
                    ${otherExercises.length ? `
                        <optgroup label="Autres exercices">
                            ${otherExercises.map(ex => optionHtml(ex, false)).join('')}
                        </optgroup>
                    ` : ''}
                </select>
            </div>
            ${sessionExercises.length ? `
                <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);margin-bottom:6px;padding-left:2px;">
                    Séance ${s.no}
                </div>
            ` : ''}
            ${sessionExercises.map(ex => {
                const status = ExerciseStorage.getStatus(pid, ex.id);
                const isForm = !['info', 'model'].includes(ex.type);
                const isActive = this.state.sessionExerciseId === ex.id;
                const statusIcon = isForm ? (
                    status === 'completed' ? '<i class="fas fa-check-circle" style="color:var(--success);"></i>' :
                    status === 'in_progress' ? '<i class="fas fa-circle-half-stroke" style="color:var(--warning);"></i>' :
                    '<i class="fas fa-circle" style="color:var(--text-light);font-size:0.6rem;"></i>'
                ) : '<i class="fas fa-book-open" style="color:var(--info);font-size:0.7rem;"></i>';
                return `
                    <div class="ex-session-item ${isActive ? 'active' : ''}" onclick="app.selectSessionExercise('${ex.id}')" style="${isActive ? 'background:var(--primary-light);border-left:3px solid var(--primary);' : ''}">
                        ${statusIcon}
                        <div style="flex:1;min-width:0;">
                            <div style="font-size:0.8rem;font-weight:600;">${ex.ref} ${ex.title}</div>
                        </div>
                    </div>
                `;
            }).join('')}
            ${this.state.sessionExerciseId && !sessionExercises.some(e => e.id === this.state.sessionExerciseId) ? (() => {
                const ex = getExerciseById(this.state.sessionExerciseId);
                if (!ex) return '';
                const status = ExerciseStorage.getStatus(pid, ex.id);
                const isForm = !['info', 'model'].includes(ex.type);
                const statusIcon = isForm ? (
                    status === 'completed' ? '<i class="fas fa-check-circle" style="color:var(--success);"></i>' :
                    status === 'in_progress' ? '<i class="fas fa-circle-half-stroke" style="color:var(--warning);"></i>' :
                    '<i class="fas fa-circle" style="color:var(--text-light);font-size:0.6rem;"></i>'
                ) : '<i class="fas fa-book-open" style="color:var(--info);font-size:0.7rem;"></i>';
                return `
                    <div class="divider" style="margin:8px 0;"></div>
                    <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);margin-bottom:6px;padding-left:2px;">
                        Exercice sélectionné
                    </div>
                    <div class="ex-session-item active" onclick="app.selectSessionExercise('${ex.id}')" style="background:var(--primary-light);border-left:3px solid var(--primary);">
                        ${statusIcon}
                        <div style="flex:1;min-width:0;">
                            <div style="font-size:0.8rem;font-weight:600;">${ex.ref} ${ex.title}</div>
                        </div>
                    </div>
                `;
            })() : ''}
        `;
    },

    renderSessionScales(s) {
        const area = document.getElementById('session-scales-area');
        if (!area) return;
        area.innerHTML = ['GAD7', 'BAI', 'BDI'].map(key => {
            const scale = SCALES[key];
            const p = this.state.selectedPatient;
            const score = p?.sessionScores?.[s.no]?.[key];
            return `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);">
                    <span style="font-size:0.82rem;font-weight:600;">${scale.abbr}</span>
                    ${score !== undefined
                        ? `<span class="gad-score-pill ${this.interpretScale(key, score).color}" style="font-size:0.68rem;">${score}</span>`
                        : `<button class="btn-ghost" style="font-size:0.72rem;padding:3px 8px;" onclick="app.openScaleModal('${key}')"><i class="fas fa-pen"></i> Passer</button>`
                    }
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

    renderSessionMainArea(s) {
        const area = document.getElementById('session-exercise-render-area');
        if (!area) return;

        const exId = this.state.sessionExerciseId;
        if (!exId) {
            const exercises = getExercisesForSession(s.no);
            area.innerHTML = `
                <div class="panel-card">
                    <div class="panel-card-body" style="text-align:center;padding:3rem;">
                        <i class="fas fa-clipboard-list" style="font-size:3rem;color:var(--primary-light);margin-bottom:1rem;display:block;"></i>
                        <h5 style="font-weight:700;color:var(--text);margin-bottom:8px;">Séance ${s.no}</h5>
                        <p style="font-size:0.88rem;color:var(--text-muted);max-width:500px;margin:0 auto 1.5rem;">
                            Sélectionnez un exercice dans le panneau de gauche pour commencer.
                        </p>
                        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
                            ${exercises.slice(0, 6).map(ex => `
                                <button class="btn-ghost" style="font-size:0.78rem;" onclick="app.selectSessionExercise('${ex.id}')">
                                    <i class="fas fa-arrow-right"></i> ${ex.ref} ${ex.title}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const ex = getExerciseById(exId);
        if (!ex) return;
        const pid = this.state.selectedPatient?.id || 1;
        ExerciseRenderer.render(ex, pid, area);
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
                Plan de traitement TCC selon le protocole de Dugas & Robichaud (2007) — ${p.totalSessions} séances prévues.
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
                    ${scale.items.map((q, i) => `
                        <div class="scale-item">
                            <div class="scale-question">${i + 1}. ${q}</div>
                            <div class="scale-options">
                                ${scale.options.map((opt, v) => `
                                    <div class="scale-option" data-scale="${scaleKey}" data-item="${i}" data-val="${v}" onclick="app.selectOption(this)">${opt}</div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
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

    completeCurrentSession() {
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

    /* =================== TOAST =================== */
    showToast(message, type = 'info') {
        const stack = document.getElementById('toast-stack');
        if (!stack) return;
        const id = 'toast-' + Date.now();
        const icons = { success: 'fa-check-circle', warning: 'fa-triangle-exclamation', danger: 'fa-circle-xmark', info: 'fa-circle-info' };
        const colors = { success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)', info: 'var(--primary)' };
        const toast = document.createElement('div');
        toast.className = `toast-item ${type}`;
        toast.id = id;
        toast.style.borderLeftColor = colors[type] || colors.info;
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}" style="color:${colors[type]};font-size:1.1rem;"></i>
            <span style="flex:1;">${message}</span>
            <button class="btn-sm-icon" onclick="document.getElementById('${id}').remove()" style="border:none;background:none;width:24px;height:24px;">
                <i class="fas fa-xmark"></i>
            </button>
        `;
        stack.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }
};

window.onload = () => app.init();
