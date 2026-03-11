/**
 * Ory+ TCC Simulator — Application Logic v2.0
 * Protocole TAG 15 séances (Dugas & Robichaud)
 */

// Map: nom du document → fichier HTML dans /documents/
const DOCUMENT_LINKS = {
    "Document TAG — Michel Dugas":              "documents/document_tag_psychoeducation.html",
    "Fiche de psychoéducation Anxiété":         "documents/document_tag_psychoeducation.html",
    "Carnet d'auto-enregistrement des inquiétudes": "documents/carnet_auto_enregistrement.html",
    "Guide d'utilisation du carnet":            "documents/carnet_auto_enregistrement.html",
    "Grille Avocat du Diable":                  "documents/grille_avocat_diable.html",
    "Liste des croyances communes sur l'anxiété": "documents/grille_avocat_diable.html",
    "Fiche Manifestations d'Intolérance à l'Incertitude": "documents/fiche_ii.html",
    "Schéma II → Inquiétude":                   "documents/fiche_ii.html",
    "Fiche Incertitude et changement de comportement": "documents/fiche_ii.html",
    "Journal des actions":                      "documents/carnet_auto_enregistrement.html",
    "Liste des problèmes actuels et récurrents": "documents/grille_resolution_problemes.html",
    "Fiche Inquiétude vs Problème":             "documents/grille_resolution_problemes.html",
    "Grille de Résolution de Problèmes":        "documents/grille_resolution_problemes.html",
    "Feuille de Brainstorming":                 "documents/grille_resolution_problemes.html",
    "Récapitulatif des techniques apprises":    "documents/document_tag_psychoeducation.html",
    "Fiche d'Exposition Écrite":                "documents/fiche_exposition.html",
    "Grille de suivi de l'habituation":         "documents/fiche_exposition.html",
    "Graphique d'habituation":                  "documents/fiche_exposition.html",
    "Grille de suivi multi-thèmes":             "documents/fiche_exposition.html",
    "Nouveaux scénarios d'exposition":          "documents/fiche_exposition.html",
    "Inventaires BAI/BDI de fin":               "documents/document_tag_psychoeducation.html",
    "Document Maintien des acquis":             "documents/plan_prevention_rechute.html",
    "Plan de prévention de rechute":            "documents/plan_prevention_rechute.html",
    "Récapitulatif du protocole TAG":           "documents/document_tag_psychoeducation.html",
    "Contact en cas de besoin":                 "documents/plan_prevention_rechute.html",
};
const app = {
    state: {
        activePanel: 'dashboard',
        selectedPatient: null,
        activeSession: null,
        verbatimIndex: 0,
        taskChecked: {},
        chartInstance: null
    },

    init() {
        this.renderSidebarPatients();
        this.render();
    },

    /* =================== NAVIGATION =================== */
    showPanel(panelId, sessionNo = null) {
        this.state.activePanel = panelId;
        if (sessionNo) {
            this.state.activeSession = simulationData.tcc_sessions.find(s => s.no === sessionNo);
            this.state.verbatimIndex = 0;
        }
        this.render();
        this.updateSidebarActive(panelId, sessionNo);
    },

    updateSidebarActive(panelId, sessionNo) {
        document.querySelectorAll('.menu-item, .patient-menu-item').forEach(el => el.classList.remove('active'));
        if (panelId === 'dashboard') {
            document.getElementById('nav-dashboard')?.classList.add('active');
            document.getElementById('breadcrumb-current').textContent = 'Tableau de Bord';
        } else if (panelId === 'dossier' && this.state.selectedPatient) {
            const el = document.getElementById(`nav-patient-${this.state.selectedPatient.id}`);
            el?.classList.add('active');
            document.getElementById('breadcrumb-current').textContent = `Dossier — ${this.state.selectedPatient.name}`;
        } else if (panelId === 'session' && this.state.activeSession) {
            const el = document.getElementById(`nav-session-${this.state.activeSession.no}`);
            el?.classList.add('active');
            document.getElementById('breadcrumb-current').textContent = `Séance ${this.state.activeSession.no} — ${this.state.activeSession.title}`;
        }
    },

    selectPatient(id) {
        this.state.selectedPatient = simulationData.patients.find(p => p.id === id);
        this.state.activeSession = null;
        this.renderSidebarSessions();
        document.getElementById('sessions-nav-label').style.display = 'block';
        this.showPanel('dossier');
    },

    /* =================== RENDER ROUTER =================== */
    render() {
        const view = document.getElementById('app-view');
        if (this.state.chartInstance) {
            this.state.chartInstance.destroy();
            this.state.chartInstance = null;
        }
        if (this.state.activePanel === 'dashboard') this.renderDashboard(view);
        else if (this.state.activePanel === 'dossier') this.renderDossier(view);
        else if (this.state.activePanel === 'session') this.renderSession(view);
    },

    /* =================== SIDEBAR =================== */
    renderSidebarPatients() {
        const el = document.getElementById('sidebar-patients');
        el.innerHTML = simulationData.patients.map(p => `
            <div class="patient-menu-item ${this.state.selectedPatient?.id === p.id ? 'active' : ''}"
                 id="nav-patient-${p.id}" onclick="app.selectPatient(${p.id})">
                <div class="patient-avatar-sm">${p.name.split(' ').map(n => n[0]).join('')}</div>
                <div style="flex:1;min-width:0;">
                    <div style="font-size:0.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</div>
                    <div style="font-size:0.68rem;opacity:0.6;">S${p.completedSessions.length}/${15} complétées</div>
                </div>
            </div>
        `).join('');
    },

    renderSidebarSessions() {
        const el = document.getElementById('sidebar-sessions');
        const p = this.state.selectedPatient;
        if (!p) { el.innerHTML = ''; return; }

        el.innerHTML = simulationData.tcc_sessions.map(s => {
            const isDone = p.completedSessions.includes(s.no);
            const isCurrent = s.no === p.currentSession;
            const statusClass = isDone ? 'done' : isCurrent ? 'current' : 'pending';
            return `
                <a class="menu-item ${this.state.activeSession?.no === s.no ? 'active' : ''}"
                   id="nav-session-${s.no}" onclick="app.showPanel('session', ${s.no})" style="font-size:0.82rem;padding:0.5rem 1.5rem;">
                    <i class="fas ${isDone ? 'fa-check-circle' : isCurrent ? 'fa-circle-dot' : 'fa-circle'}"
                       style="color:${isDone ? 'var(--success)' : isCurrent ? 'var(--warning)' : 'rgba(255,255,255,0.25)'}"></i>
                    <span>S${s.no}. ${s.title.length > 22 ? s.title.slice(0, 22) + '…' : s.title}</span>
                </a>
            `;
        }).join('');
    },

    /* =================== DASHBOARD =================== */
    renderDashboard(view) {
        view.innerHTML = document.getElementById('tpl-dashboard').innerHTML;

        // Stats
        const totalSessions = simulationData.patients.reduce((a, p) => a + p.completedSessions.length, 0);
        const avgGAD = simulationData.patients.reduce((a, p) => a + (p.score_initial?.GAD7 || 0), 0) / simulationData.patients.length;
        const active = simulationData.patients.filter(p => p.completedSessions.length > 0 && p.completedSessions.length < 15).length;

        document.getElementById('stats-row').innerHTML = `
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon blue"><i class="fas fa-users"></i></div>
                    <div>
                        <div class="stat-value">${simulationData.patients.length}</div>
                        <div class="stat-label">Patients actifs</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon green"><i class="fas fa-calendar-check"></i></div>
                    <div>
                        <div class="stat-value">${totalSessions}</div>
                        <div class="stat-label">Séances complétées</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon orange"><i class="fas fa-chart-line"></i></div>
                    <div>
                        <div class="stat-value">${avgGAD.toFixed(1)}</div>
                        <div class="stat-label">GAD-7 moyen initial</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon purple"><i class="fas fa-spinner"></i></div>
                    <div>
                        <div class="stat-value">${active}</div>
                        <div class="stat-label">En cours de traitement</div>
                    </div>
                </div>
            </div>
        `;

        // Patient cards
        const grid = document.getElementById('patients-grid');
        simulationData.patients.forEach(p => {
            const pct = Math.round((p.completedSessions.length / 15) * 100);
            const gad = p.score_initial?.GAD7 || 0;
            const gadInterp = this.interpretGAD7(gad);
            const isSelected = this.state.selectedPatient?.id === p.id;
            const avatarClass = p.sexe === 'F' ? 'female' : 'male';

            const div = document.createElement('div');
            div.className = 'col-md-6 col-lg-4';
            div.innerHTML = `
                <div class="patient-card ${isSelected ? 'selected' : ''}" onclick="app.selectPatient(${p.id})">
                    <div class="patient-card-header">
                        <div class="patient-card-avatar ${avatarClass}">
                            ${p.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div class="patient-card-info" style="flex:1;min-width:0;">
                            <h6>${p.name} ${isSelected ? '<i class="fas fa-check-circle" style="color:var(--primary);font-size:0.8rem;"></i>' : ''}</h6>
                            <p>${p.age} ans &bull; ${p.sexe === 'F' ? 'Femme' : 'Homme'} &bull; ${p.profession}</p>
                        </div>
                    </div>
                    <div class="patient-card-body">
                        <div style="margin-bottom:8px;">
                            ${p.diagnoses.map(d => `<span class="diagnosis-badge">${d}</span>`).join('')}
                        </div>
                        <div style="font-size:0.79rem;color:var(--text-muted);margin-bottom:10px;line-height:1.4;">
                            <i class="fas fa-quote-left" style="font-size:0.7rem;opacity:0.5;"></i> ${p.motif}
                        </div>
                        <div class="progress-wrap">
                            <div class="progress-label">
                                <span>Avancement du protocole</span>
                                <span style="font-weight:700;color:var(--primary);">${p.completedSessions.length}/15 séances</span>
                            </div>
                            <div class="progress-bar-track">
                                <div class="progress-bar-fill" style="width:${pct}%"></div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="gad-score-pill ${gadInterp.color}">
                                <i class="fas fa-stethoscope"></i> GAD-7 : ${gad}
                            </span>
                            <span style="font-size:0.73rem;color:var(--text-muted);">Séance actuelle : S${p.currentSession}</span>
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

    interpretGAD7(score) {
        if (score <= 4) return { label: 'Minimale', color: 'success' };
        if (score <= 9) return { label: 'Légère', color: 'info' };
        if (score <= 14) return { label: 'Modérée', color: 'warning' };
        return { label: 'Sévère', color: 'danger' };
    },

    /* =================== DOSSIER =================== */
    renderDossier(view) {
        const p = this.state.selectedPatient;
        if (!p) { this.showPanel('dashboard'); return; }

        view.innerHTML = document.getElementById('tpl-dossier').innerHTML;

        // Header
        document.getElementById('dossier-header-content').innerHTML = `
            <div class="d-flex align-items-center gap-4">
                <div style="width:70px;height:70px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;color:white;flex-shrink:0;">
                    ${p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style="flex:1;">
                    <h4 style="margin:0 0 4px;font-weight:800;">${p.name}</h4>
                    <p style="margin:0 0 8px;opacity:0.8;font-size:0.88rem;">${p.age} ans &bull; ${p.sexe === 'F' ? 'Femme' : 'Homme'} &bull; ${p.profession}</p>
                    <div style="font-size:0.82rem;opacity:0.75;"><i class="fas fa-notes-medical me-1"></i>${p.motif}</div>
                    <div style="margin-top:10px;">${p.diagnoses.map(d => `<span style="background:rgba(255,255,255,0.2);color:white;border-radius:20px;padding:3px 10px;font-size:0.7rem;font-weight:700;margin-right:6px;">${d}</span>`).join('')}</div>
                </div>
                <div style="text-align:right;flex-shrink:0;">
                    <div style="font-size:2.5rem;font-weight:900;">${p.completedSessions.length}<span style="font-size:1rem;opacity:0.7;">/15</span></div>
                    <div style="font-size:0.78rem;opacity:0.7;">séances complétées</div>
                    <button class="btn-primary-custom mt-2" onclick="app.showPanel('session', ${p.currentSession})" style="background:rgba(255,255,255,0.25);border:1px solid rgba(255,255,255,0.4);">
                        <i class="fas fa-play"></i> Séance ${p.currentSession}
                    </button>
                </div>
            </div>
        `;

        // Progress badge
        document.getElementById('dossier-progress-badge').textContent = `${Math.round((p.completedSessions.length / 15) * 100)}%`;

        // Timeline
        const timeline = document.getElementById('dossier-session-timeline');
        timeline.innerHTML = simulationData.tcc_sessions.map(s => {
            const isDone = p.completedSessions.includes(s.no);
            const isCurrent = s.no === p.currentSession;
            return `
                <div class="timeline-row" onclick="app.showPanel('session', ${s.no})">
                    <div class="timeline-dot ${isDone ? 'done' : isCurrent ? 'current' : 'pending'}">
                        ${isDone ? '<i class="fas fa-check" style="font-size:0.65rem;"></i>' : s.no}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.84rem;font-weight:${isCurrent ? '700' : '500'};color:${isCurrent ? 'var(--primary)' : 'var(--text)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">S${s.no}. ${s.title}</div>
                        <div style="font-size:0.72rem;color:var(--text-muted);">${s.phase} &bull; ${s.duration} min</div>
                    </div>
                    <span class="badge-phase ${s.phase}">${s.phase}</span>
                </div>
            `;
        }).join('');

        // Initial Scores
        const si = p.score_initial;
        document.getElementById('dossier-scores-initial').innerHTML = `
            <div class="row g-2">
                ${['GAD7', 'BAI', 'BDI'].map(key => {
                    const scale = SCALES[key];
                    const score = si[key] || 0;
                    const interp = scale.interpretation.find(i => score >= i.min && score <= i.max);
                    return `
                        <div class="col-4 text-center">
                            <div style="font-size:1.6rem;font-weight:900;color:var(--primary);">${score}</div>
                            <div style="font-size:0.7rem;font-weight:700;color:var(--text-muted);">${scale.abbr}</div>
                            <span class="gad-score-pill ${interp?.color || 'info'}" style="margin-top:4px;display:inline-flex;font-size:0.68rem;">${interp?.label}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        // Chart
        this.renderPatientChart(p);
    },

    renderPatientChart(p) {
        const ctx = document.getElementById('patient-chart')?.getContext('2d');
        if (!ctx) return;

        const labels = [];
        const data = [];
        const si = p.score_initial;

        simulationData.tcc_sessions.forEach(s => {
            labels.push(`S${s.no}`);
            if (p.sessionScores && p.sessionScores[s.no]?.GAD7 !== undefined) {
                data.push(p.sessionScores[s.no].GAD7);
            } else if (s.no === 1 && si?.GAD7) {
                data.push(si.GAD7);
            } else if (p.completedSessions.includes(s.no)) {
                data.push(null);
            } else {
                data.push(null);
            }
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
                        label: ctx => `GAD-7: ${ctx.raw} — ${ctx.raw <= 4 ? 'Minimal' : ctx.raw <= 9 ? 'Léger' : ctx.raw <= 14 ? 'Modéré' : 'Sévère'}`
                    }}
                },
                scales: {
                    y: {
                        min: 0, max: 21,
                        grid: { color: 'rgba(0,0,0,0.04)' },
                        ticks: {
                            callback: v => v
                        }
                    },
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

        // Title
        document.getElementById('session-main-title').textContent = `Séance ${s.no} — ${s.title}`;
        document.getElementById('session-patient-name').innerHTML = p
            ? `<i class="fas fa-user me-1"></i>${p.name} &bull; ${p.age} ans &bull; ${p.profession}`
            : 'Aucun patient sélectionné';

        // Badge + phase
        document.getElementById('session-badge').textContent = `#${s.no}`;
        document.getElementById('session-phase-badge').innerHTML = `<span class="badge-phase ${s.phase}">${s.phase}</span>`;
        document.getElementById('session-duration').textContent = s.duration;

        // Objectives
        document.getElementById('session-objectives').innerHTML = s.objectives.map(o => `<li>${o}</li>`).join('');

        // Task checklist
        document.getElementById('task-checklist').innerHTML = s.tasks.map((t, i) => {
            const key = `${s.no}-${i}`;
            const done = this.state.taskChecked[key];
            return `
                <div class="step-item ${done ? 'done' : ''}" onclick="app.toggleTask('${key}', this)" id="task-${key}">
                    <div class="step-num">${done ? '<i class="fas fa-check" style="font-size:0.6rem;"></i>' : (i + 1)}</div>
                    <span>${t}</span>
                </div>
            `;
        }).join('');

        // Materials — clickable document links
        document.getElementById('session-materials-list').innerHTML = s.materials.length
            ? s.materials.map(m => {
                const link = DOCUMENT_LINKS[m];
                if (link) {
                    return `<div style="padding:6px 0;border-bottom:1px solid var(--border);">
                        <a href="${link}" target="_blank" rel="noopener"
                           style="display:flex;align-items:center;gap:8px;text-decoration:none;color:var(--text);transition:color 0.15s;"
                           onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text)'">
                            <i class="fas fa-file-pdf" style="color:var(--danger);flex-shrink:0;"></i>
                            <span style="font-size:0.83rem;flex:1;">${m}</span>
                            <i class="fas fa-external-link-alt" style="font-size:0.65rem;color:var(--text-muted);"></i>
                        </a>
                    </div>`;
                } else {
                    return `<div style="padding:6px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-file" style="color:var(--text-muted);flex-shrink:0;"></i>
                        <span style="font-size:0.83rem;color:var(--text-muted);">${m}</span>
                    </div>`;
                }
            }).join('')
            : '<span style="color:var(--text-muted);font-size:0.82rem;">Aucun document pour cette séance.</span>';

        // Homeworks
        document.getElementById('session-homeworks').innerHTML = s.homeworks.map(h => `<li>${h}</li>`).join('');

        // Verbatim
        this.renderVerbatim();

        // Activity
        this.renderActivity(s);

        // Notes
        const savedNote = p?.notes?.[`session_${s.no}`] || '';
        document.getElementById('clinical-notes').value = savedNote;

        // Complete button state
        if (p && p.completedSessions.includes(s.no)) {
            const btn = document.getElementById('btn-complete-session');
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Séance déjà marquée terminée';
            btn.style.background = 'var(--success)';
            btn.disabled = true;
        }
    },

    /* =================== VERBATIM =================== */
    renderVerbatim() {
        const s = this.state.activeSession;
        const idx = this.state.verbatimIndex;
        const total = s.verbatim.length;
        const area = document.getElementById('verbatim-area');
        if (!area) return;

        area.innerHTML = s.verbatim.slice(0, idx + 1).map(v => `
            <div class="verbatim-bubble ${v.speaker === 'Thérapeute' ? 'therapist' : 'patient'}">
                <div class="bubble-avatar">
                    ${v.speaker === 'Thérapeute' ? '<i class="fas fa-user-md"></i>' : '<i class="fas fa-user"></i>'}
                </div>
                <div class="bubble-content">
                    <div class="bubble-name">${v.speaker}</div>
                    <div class="bubble-text">${v.text}</div>
                </div>
            </div>
        `).join('');

        area.scrollTop = area.scrollHeight;

        document.getElementById('verbatim-progress').textContent = `${idx + 1} / ${total}`;
        document.getElementById('verbatim-counter').textContent = `${idx + 1}/${total} échanges`;
        document.getElementById('btn-verbatim-prev').disabled = idx === 0;
        const nextBtn = document.getElementById('btn-verbatim-next');
        if (idx >= total - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Verbatim complété';
            nextBtn.disabled = true;
        } else {
            nextBtn.innerHTML = 'Suivant <i class="fas fa-arrow-right"></i>';
            nextBtn.disabled = false;
        }
    },

    verbatimNext() {
        const s = this.state.activeSession;
        if (this.state.verbatimIndex < s.verbatim.length - 1) {
            this.state.verbatimIndex++;
            this.renderVerbatim();
        }
    },

    verbatimPrev() {
        if (this.state.verbatimIndex > 0) {
            this.state.verbatimIndex--;
            this.renderVerbatim();
        }
    },

    /* =================== ACTIVITIES =================== */
    renderActivity(s) {
        const area = document.getElementById('session-activity-area');
        if (!area) return;

        const type = s.activityType;

        if (type === 'scale_gad7') {
            area.innerHTML = this.buildScaleWidget('GAD7', s.no);
            this.initScaleWidget('GAD7');
        } else if (type === 'avocat_diable') {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header">
                        <i class="fas fa-gavel"></i>
                        <h6>Activité Interactive : L'Avocat du Diable</h6>
                    </div>
                    <div class="activity-body">
                        <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:1rem;">
                            Listez la croyance positive sur l'inquiétude, puis trouvez ensemble les contre-preuves.
                        </p>
                        <div id="avocat-rows"></div>
                        <button class="btn-ghost mt-2" onclick="app.addAvocatRow()">
                            <i class="fas fa-plus"></i> Ajouter une croyance
                        </button>
                    </div>
                </div>`;
            this.initAvocatDiable();
        } else if (type === 'auto_record') {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-book-open"></i><h6>Carnet d'Auto-Enregistrement</h6></div>
                    <div class="activity-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:5px;">Situation / Déclencheur</label>
                                <textarea class="notes-textarea" id="ar-situation" placeholder="Où? Quand? Quoi?" rows="3"></textarea>
                            </div>
                            <div class="col-md-6">
                                <label style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:5px;">Pensée 'Et si...?' principale</label>
                                <textarea class="notes-textarea" id="ar-pensee" placeholder="Et si... ?" rows="3"></textarea>
                            </div>
                            <div class="col-12">
                                <label style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:8px;">Niveau d'anxiété (0 = calme total &mdash; 8 = panique)</label>
                                <input type="range" id="ar-niveau" min="0" max="8" value="4" style="width:100%;" oninput="document.getElementById('ar-val').textContent=this.value">
                                <div style="text-align:center;margin-top:6px;"><span id="ar-val" style="font-size:2rem;font-weight:900;color:var(--primary);">4</span><span style="font-size:1rem;color:var(--text-muted);">/8</span></div>
                            </div>
                        </div>
                        <button class="btn-primary-custom mt-3" onclick="app.saveAutoRecord()"><i class="fas fa-save"></i> Enregistrer l'entrée</button>
                    </div>
                </div>`;
        } else if (type === 'ii_grid') {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-exclamation-triangle"></i><h6>Grille : Manifestations d'Intolérance à l'Incertitude</h6></div>
                    <div class="activity-body">
                        <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:1rem;">Cocher les comportements observés chez le patient (Surréaction ou Évitement) :</p>
                        ${[
                            ['Surréaction (Contrôle)', ['Vérifier les emails/messages plusieurs fois', 'Demander des confirmations répétées', 'Planifier à l\'excès', 'Chercher à rassurer les autres', 'Lire les politiques/règles en détail']],
                            ['Évitement (Fuite)', ['Procrastiner sur les décisions', 'Éviter les responsabilités', 'Remettre à demain', 'Fuir les situations nouvelles', 'Éviter de s\'informer par peur']]
                        ].map(([cat, items]) => `
                            <div style="margin-bottom:1rem;">
                                <div style="font-weight:700;font-size:0.82rem;color:var(--text);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">${cat}</div>
                                ${items.map(item => `
                                    <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--border);">
                                        <input type="checkbox" class="form-check-input" style="width:17px;height:17px;flex-shrink:0;">
                                        <span style="font-size:0.84rem;">${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                        <div style="margin-top:1rem;">
                            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Autres manifestations personnelles du patient :</label>
                            <textarea class="notes-textarea" placeholder="Comportements spécifiques observés..." rows="2"></textarea>
                        </div>
                    </div>
                </div>`;
        } else if (type === 'action_planner' || type === 'action_review') {
            const isReview = type === 'action_review';
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-person-running"></i><h6>${isReview ? 'Bilan de l\'Action Comportementale' : 'Planifier l\'Action face à l\'Incertitude'}</h6></div>
                    <div class="activity-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:5px;">${isReview ? 'Action réalisée' : 'Action à réaliser'}</label>
                                <textarea class="notes-textarea" id="action-desc" rows="3" placeholder="Décrire l'action précise..."></textarea>
                            </div>
                            <div class="col-md-6">
                                <label style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:5px;">${isReview ? 'Ce que j\'ai appris' : 'Anxiété anticipée (0-8)'}</label>
                                ${isReview
                                    ? '<textarea class="notes-textarea" rows="3" placeholder="Apprentissages, observations..."></textarea>'
                                    : '<input type="range" min="0" max="8" value="5" style="width:100%;margin-top:1rem;" oninput="document.getElementById(\'ap-val\').textContent=this.value"><div style="text-align:center;"><span id="ap-val" style="font-size:2rem;font-weight:900;color:var(--warning);">5</span><span>/8</span></div>'
                                }
                            </div>
                        </div>
                    </div>
                </div>`;
        } else if (type === 'problem_sort') {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-scale-balanced"></i><h6>Activité : Inquiétude ou Problème Réel ?</h6></div>
                    <div class="activity-body">
                        <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:1rem;">Pour chaque item, déterminez s'il s'agit d'une inquiétude (futur incertain) ou d'un problème actuel.</p>
                        <div id="sort-items"></div>
                        <button class="btn-ghost mt-2" onclick="app.addSortItem()"><i class="fas fa-plus"></i> Ajouter un item</button>
                    </div>
                </div>`;
            this.initProblemSort();
        } else if (type === 'problem_solving') {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-lightbulb"></i><h6>Grille de Résolution de Problèmes</h6></div>
                    <div class="activity-body">
                        <div class="mb-3">
                            <label style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:5px;">Définition précise du problème (Qui? Quoi? Quand?)</label>
                            <textarea class="notes-textarea" id="ps-problem" rows="2" placeholder="Le problème est..."></textarea>
                        </div>
                        <label style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:8px;">Brainstorming — Solutions possibles (sans jugement)</label>
                        <div id="ps-solutions"></div>
                        <button class="btn-ghost mt-2" onclick="app.addSolution()"><i class="fas fa-plus"></i> Ajouter une solution</button>
                    </div>
                </div>`;
            this.initProblemSolving();
        } else if (type === 'exposure_timer' || type === 'scenario_writer') {
            const isWriter = type === 'scenario_writer';
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-${isWriter ? 'pen-nib' : 'stopwatch'}"></i><h6>${isWriter ? 'Rédaction du Scénario d\'Exposition' : 'Exposition en Imagination — Suivi d\'Habituation'}</h6></div>
                    <div class="activity-body">
                        ${isWriter ? `
                            <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:1rem;">Rédigez le scénario au présent, 1ère personne, en décrivant la situation redoutée avec toutes les émotions.</p>
                            <textarea class="notes-textarea" id="scenario-text" rows="6" placeholder="Je suis dans... Je ressens... J'entends... Ma plus grande crainte est que..."></textarea>
                            <div style="margin-top:1rem;">
                                <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.5px;">Thème de la peur principale</label>
                                <select class="form-select form-select-sm" style="max-width:320px;">
                                    <option>Santé (la mienne)</option>
                                    <option>Santé d'un proche</option>
                                    <option>Finances / Travail</option>
                                    <option>Relations / Famille</option>
                                    <option>Décisions / L'avenir</option>
                                </select>
                            </div>
                        ` : `
                            <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:1rem;">Saisissez le niveau d'anxiété du patient toutes les 5 minutes et tracez la courbe d'habituation.</p>
                            <div class="anxiety-inputs mb-3" id="exp-inputs">
                                ${['T0','T5','T10','T15','T20','T25','T30'].map((t, i) => `
                                    <div style="text-align:center;">
                                        <div style="font-size:0.7rem;font-weight:700;color:var(--text-muted);margin-bottom:4px;">${t}</div>
                                        <input type="number" min="0" max="10" class="form-control form-control-sm exp-input" id="exp-${i}" placeholder="—" style="width:60px;text-align:center;">
                                    </div>
                                `).join('')}
                                <button class="btn-primary-custom" onclick="app.updateExposureChart()"><i class="fas fa-chart-line"></i></button>
                            </div>
                            <canvas id="exposureChart" height="120"></canvas>
                        `}
                    </div>
                </div>`;
            if (!isWriter) this.initExposureChart();
        } else if (type === 'final_assessment') {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-clipboard-check"></i><h6>Bilan Final — Évaluation des Progrès</h6></div>
                    <div class="activity-body">
                        ${['GAD7', 'BAI', 'BDI'].map(key => `
                            <div style="margin-bottom:1.5rem;">
                                <h6 style="font-weight:700;font-size:0.9rem;margin-bottom:0.75rem;color:var(--text);">${SCALES[key].name}</h6>
                                <button class="btn-primary-custom" onclick="app.openScaleModal('${key}')">
                                    <i class="fas fa-pen"></i> Administrer ${SCALES[key].abbr}
                                </button>
                                <span id="final-score-${key}" style="margin-left:12px;font-size:0.84rem;color:var(--text-muted);"></span>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        } else if (type === 'relapse_plan') {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-shield-heart"></i><h6>Plan de Prévention de Rechute</h6></div>
                    <div class="activity-body">
                        <div class="relapse-grid">
                            <div class="relapse-item">
                                <label>Signes d'alarme personnels</label>
                                <textarea rows="3" placeholder="Ce que je ressens quand l'anxiété revient..."></textarea>
                            </div>
                            <div class="relapse-item">
                                <label>Outils à utiliser en priorité</label>
                                <textarea rows="3" placeholder="Carnet, exposition, résolution de problèmes..."></textarea>
                            </div>
                            <div class="relapse-item">
                                <label>Personne de soutien</label>
                                <input type="text" placeholder="Nom et contact...">
                            </div>
                            <div class="relapse-item">
                                <label>Date booster session (1 mois)</label>
                                <input type="date">
                            </div>
                            <div class="relapse-item" style="grid-column:1/-1;">
                                <label>Mon engagement personnel</label>
                                <textarea rows="2" placeholder="Je m'engage à relire ce plan chaque mois et à..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>`;
        } else {
            area.innerHTML = `
                <div class="activity-box">
                    <div class="activity-header"><i class="fas fa-circle-check"></i><h6>Fin de Séance</h6></div>
                    <div class="activity-body" style="text-align:center;padding:1.5rem;">
                        <i class="fas fa-check-circle" style="font-size:3rem;color:var(--success);margin-bottom:1rem;display:block;"></i>
                        <p style="font-size:0.9rem;color:var(--text-muted);">Complétez le script de verbatim et les tâches cliniques, puis marquez la séance comme terminée.</p>
                    </div>
                </div>`;
        }
    },

    /* =================== SCALE WIDGET =================== */
    buildScaleWidget(scaleKey, sessionNo) {
        const scale = SCALES[scaleKey];
        return `
            <div class="activity-box">
                <div class="activity-header"><i class="fas fa-stethoscope"></i><h6>Échelle ${scale.name}</h6></div>
                <div class="activity-body">
                    <div id="scale-${scaleKey}-items">
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
                    </div>
                    <div class="score-display">
                        <div class="score-number" id="score-${scaleKey}">0</div>
                        <div>
                            <div style="font-weight:700;font-size:0.84rem;" id="score-label-${scaleKey}">Sélectionnez les réponses</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">Score / ${scale.maxScore}</div>
                        </div>
                    </div>
                    <button class="btn-primary-custom mt-3" onclick="app.saveScaleResult('${scaleKey}')">
                        <i class="fas fa-save"></i> Enregistrer le score
                    </button>
                </div>
            </div>
        `;
    },

    scaleAnswers: {},

    initScaleWidget(scaleKey) {
        this.scaleAnswers[scaleKey] = {};
    },

    selectOption(el) {
        const scaleKey = el.dataset.scale;
        const item = parseInt(el.dataset.item);
        const val = parseInt(el.dataset.val);

        // Deselect siblings
        el.closest('.scale-options').querySelectorAll('.scale-option').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');

        if (!this.scaleAnswers[scaleKey]) this.scaleAnswers[scaleKey] = {};
        this.scaleAnswers[scaleKey][item] = val;

        // Recalculate score
        const total = Object.values(this.scaleAnswers[scaleKey]).reduce((a, b) => a + b, 0);
        const scoreEl = document.getElementById(`score-${scaleKey}`);
        const labelEl = document.getElementById(`score-label-${scaleKey}`);
        if (scoreEl) scoreEl.textContent = total;
        if (labelEl) {
            const interp = SCALES[scaleKey].interpretation.find(i => total >= i.min && total <= i.max);
            if (interp) {
                labelEl.textContent = interp.label;
                labelEl.style.color = `var(--${interp.color})`;
            }
        }
    },

    saveScaleResult(scaleKey) {
        const total = Object.values(this.scaleAnswers[scaleKey] || {}).reduce((a, b) => a + b, 0);
        const p = this.state.selectedPatient;
        const s = this.state.activeSession;
        if (p && s) {
            if (!p.sessionScores) p.sessionScores = {};
            if (!p.sessionScores[s.no]) p.sessionScores[s.no] = {};
            p.sessionScores[s.no][scaleKey] = total;
        }
        const interp = SCALES[scaleKey].interpretation.find(i => total >= i.min && total <= i.max);
        this.showToast(`${SCALES[scaleKey].abbr} enregistré : ${total} — ${interp?.label || ''}`, 'success');

        // Update final score display if in assessment
        const finalEl = document.getElementById(`final-score-${scaleKey}`);
        if (finalEl) finalEl.innerHTML = `<span class="gad-score-pill ${interp?.color || 'info'}">${total} — ${interp?.label}</span>`;
    },

    openScaleModal(scaleKey) {
        const scale = SCALES[scaleKey];
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
                            <div style="font-weight:700;" id="score-label-${scaleKey}">Sélectionnez les réponses</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">/ ${scale.maxScore}</div>
                        </div>
                    </div>
                </div>
                <div class="modal-panel-footer">
                    <button class="btn-ghost" onclick="document.getElementById('scale-modal').remove()">Annuler</button>
                    <button class="btn-primary-custom" onclick="app.saveScaleResult('${scaleKey}');document.getElementById('scale-modal').remove()">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        `;
        document.getElementById('modal-root').appendChild(backdrop);
        this.initScaleWidget(scaleKey);
    },

    /* =================== TASK CHECK =================== */
    toggleTask(key, el) {
        this.state.taskChecked[key] = !this.state.taskChecked[key];
        el.classList.toggle('done');
        const num = el.querySelector('.step-num');
        if (this.state.taskChecked[key]) {
            num.innerHTML = '<i class="fas fa-check" style="font-size:0.6rem;"></i>';
        } else {
            const parts = key.split('-');
            num.textContent = parseInt(parts[1]) + 1;
        }
    },

    /* =================== SPECIALTY ACTIVITIES =================== */
    initAvocatDiable() {
        this.addAvocatRow();
    },

    addAvocatRow() {
        const container = document.getElementById('avocat-rows');
        if (!container) return;
        const idx = container.children.length + 1;
        const row = document.createElement('div');
        row.className = 'avocat-grid mb-3';
        row.style.borderBottom = '1px solid var(--border)';
        row.style.paddingBottom = '1rem';
        row.innerHTML = `
            <div class="avocat-col">
                <label>Croyance ${idx} (Utilité perçue)</label>
                <textarea rows="3" placeholder="S'inquiéter permet de..."></textarea>
            </div>
            <div class="avocat-col">
                <label>Contre-preuve (Avocat du Diable)</label>
                <textarea rows="3" placeholder="Cependant, en réalité..."></textarea>
            </div>
        `;
        container.appendChild(row);
    },

    initProblemSort() {
        this.addSortItem();
    },

    addSortItem() {
        const container = document.getElementById('sort-items');
        if (!container) return;
        const row = document.createElement('div');
        row.style.cssText = 'display:grid;grid-template-columns:1fr auto;gap:10px;align-items:start;margin-bottom:10px;padding:10px;background:var(--surface-2);border-radius:var(--r-sm);border:1px solid var(--border);';
        row.innerHTML = `
            <input type="text" class="form-control form-control-sm" placeholder="Décrivez l'inquiétude ou la situation...">
            <div style="display:flex;gap:6px;flex-wrap:nowrap;">
                <button onclick="this.classList.toggle('active');this.closest('div[style]').style.borderColor='var(--warning)'" 
                    class="btn-ghost" style="font-size:0.72rem;padding:4px 8px;white-space:nowrap;">
                    ⚠️ Inquiétude
                </button>
                <button onclick="this.classList.toggle('active');this.closest('div[style]').style.borderColor='var(--danger)'" 
                    class="btn-ghost" style="font-size:0.72rem;padding:4px 8px;white-space:nowrap;">
                    🔴 Problème réel
                </button>
            </div>
        `;
        container.appendChild(row);
    },

    initProblemSolving() {
        for (let i = 0; i < 3; i++) this.addSolution();
    },

    addSolution() {
        const container = document.getElementById('ps-solutions');
        if (!container) return;
        const idx = container.children.length + 1;
        const div = document.createElement('div');
        div.style.cssText = 'display:grid;grid-template-columns:auto 1fr auto auto;gap:10px;align-items:center;margin-bottom:8px;';
        div.innerHTML = `
            <div style="width:24px;height:24px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:800;">${idx}</div>
            <input type="text" class="form-control form-control-sm" placeholder="Solution possible...">
            <select class="form-select form-select-sm" style="width:110px;" title="Faisabilité">
                <option>⭐ Facile</option><option>⭐⭐ Modéré</option><option>⭐⭐⭐ Difficile</option>
            </select>
            <select class="form-select form-select-sm" style="width:110px;" title="Efficacité estimée">
                <option>👍 Bonne</option><option>👎 Faible</option><option>🤔 Incertaine</option>
            </select>
        `;
        container.appendChild(div);
    },

    initExposureChart() {
        const ctx = document.getElementById('exposureChart')?.getContext('2d');
        if (!ctx) return;
        window.exposureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['T0', 'T5', 'T10', 'T15', 'T20', 'T25', 'T30'],
                datasets: [{
                    label: 'Anxiété (0-10)',
                    data: [null, null, null, null, null, null, null],
                    borderColor: '#6c63ff',
                    backgroundColor: 'rgba(108,99,255,0.08)',
                    borderWidth: 2.5,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#6c63ff',
                    pointRadius: 6,
                    spanGaps: false
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { min: 0, max: 10, grid: { color: 'rgba(0,0,0,0.04)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    },

    updateExposureChart() {
        if (!window.exposureChart) return;
        const vals = [0,1,2,3,4,5,6].map(i => {
            const el = document.getElementById(`exp-${i}`);
            return el && el.value !== '' ? parseFloat(el.value) : null;
        });
        window.exposureChart.data.datasets[0].data = vals;
        window.exposureChart.update();
    },

    saveAutoRecord() {
        const sit = document.getElementById('ar-situation')?.value;
        const pens = document.getElementById('ar-pensee')?.value;
        const level = document.getElementById('ar-niveau')?.value;
        if (!sit && !pens) { this.showToast('Veuillez remplir au moins un champ.', 'warning'); return; }
        this.showToast(`Entrée enregistrée — Anxiété : ${level}/8`, 'success');
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
                p.currentSession = Math.min(s.no + 1, 15);
            }
        }

        this.showToast(`✅ Séance ${s.no} — "${s.title}" marquée comme terminée !`, 'success');
        this.renderSidebarPatients();
        this.renderSidebarSessions();

        const btn = document.getElementById('btn-complete-session');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Séance terminée';
            btn.style.background = 'var(--success)';
            btn.disabled = true;
        }

        // Return to dossier after 1.5s
        setTimeout(() => this.showPanel('dossier'), 1500);
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
