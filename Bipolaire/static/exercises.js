/**
 * Ory+ TCC Simulator — Exercise Storage & Rendering
 * localStorage-based persistence + reusable UI builders
 */

const STORAGE_KEY = 'tag_sim_exercises_v1';

const ExerciseStorage = {
    _cache: null,

    _loadAll() {
        if (this._cache) return this._cache;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            this._cache = raw ? JSON.parse(raw) : {};
        } catch {
            this._cache = {};
        }
        return this._cache;
    },

    _saveAll() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cache || {}));
        } catch { /* quota exceeded — degrade gracefully */ }
    },

    _key(patientId, exerciseId, entryIndex) {
        // Include session number to scope exercise status per session
        const sessionPart = window.activeSessionNo !== undefined ? `_s${window.activeSessionNo}` : '';
        const base = `p${patientId}${sessionPart}_${exerciseId}`;
        return entryIndex !== undefined ? `${base}_${entryIndex}` : base;
    },

    get(patientId, exerciseId, entryIndex) {
        const all = this._loadAll();
        return all[this._key(patientId, exerciseId, entryIndex)] || null;
    },

    save(patientId, exerciseId, data, entryIndex) {
        const all = this._loadAll();
        const key = this._key(patientId, exerciseId, entryIndex);
        all[key] = { ...data, _ts: Date.now() };
        this._saveAll();
    },

    getEntryCount(patientId, exerciseId) {
        const all = this._loadAll();
        // Keys are session-scoped (via window.activeSessionNo), so we must
        // build the prefix from the same base key used by _key().
        const base = this._key(patientId, exerciseId);
        const prefix = base + '_';
        return Object.keys(all).filter(k => k.startsWith(prefix)).length;
    },

    getAllEntries(patientId, exerciseId) {
        const all = this._loadAll();
        const base = this._key(patientId, exerciseId);
        const prefix = base + '_';
        const entries = [];
        Object.keys(all).filter(k => k.startsWith(prefix)).sort().forEach(k => {
            entries.push(all[k]);
        });
        return entries;
    },

    getStatus(patientId, exerciseId) {
        const all = this._loadAll();
        const directKey = this._key(patientId, exerciseId);
        const data = all[directKey];
        if (data) {
            // Validate completion for form types based on the current trouble app rules.
            if (app && typeof app._validateExerciseData === 'function') {
                const ex = getExerciseById(exerciseId);
                if (ex && ['info', 'model'].includes(ex.type)) {
                    return 'completed'; // Reading exercises are always complete once viewed
                }
                const isComplete = app._validateExerciseData(ex, data, patientId);
                return isComplete ? 'completed' : 'in_progress';
            }
            return 'completed'; // Fallback
        }

        // If session-scoped entries exist, validate completion based on entry data.
        const base = this._key(patientId, exerciseId);
        const prefix = base + '_';
        if (Object.keys(all).some(k => k.startsWith(prefix))) {
            const ex = getExerciseById(exerciseId);
            if (ex && app && typeof app._validateExerciseData === 'function') {
                return app._validateExerciseData(ex, null, patientId) ? 'completed' : 'in_progress';
            }
            return 'in_progress';
        }

        return 'not_started';
    },

    clearExercise(patientId, exerciseId) {
        const all = this._loadAll();
        const base = this._key(patientId, exerciseId);
        Object.keys(all)
            .filter(k => k === base || k.startsWith(base + '_'))
            .forEach(k => delete all[k]);
        this._saveAll();
    }
};

// =====================================================
// EXERCISE RENDERER — builds HTML for each exercise type
// =====================================================
const ExerciseRenderer = {

    render(exercise, patientId, container) {
        const type = exercise.type;
        let html = '';
        switch (type) {
            case 'info': html = this.renderInfo(exercise); break;
            case 'model': html = this.renderModel(exercise); break;
            case 'daily_log': html = this.renderDailyLog(exercise, patientId); break;
            case 'two_columns': html = this.renderTwoColumns(exercise, patientId); break;
            case 'structured_form': html = this.renderStructuredForm(exercise, patientId); break;
            case 'checklist': html = this.renderChecklist(exercise, patientId); break;
            case 'checklist_examples': html = this.renderChecklistExamples(exercise, patientId); break;
            case 'free_list': html = this.renderFreeList(exercise, patientId); break;
            case 'problem_solving': html = this.renderProblemSolving(exercise, patientId); break;
            case 'exposure_sheet': html = this.renderExposureSheet(exercise, patientId); break;
            case 'goals_form': html = this.renderGoalsForm(exercise, patientId); break;
            default: html = `<p>Type d'exercice inconnu : ${type}</p>`;
        }
        container.innerHTML = this._wrapExercise(exercise, html);
        this._bindSaveButtons(exercise, patientId, container);
    },

    _wrapExercise(ex, innerHtml) {
        const cat = EXERCISE_CATEGORIES.find(c => c.id === ex.category);
        const isForm = !['info', 'model'].includes(ex.type);
        return `
            <div class="exercise-detail">
                <div class="exercise-detail-header d-flex justify-content-between align-items-center" style="border-left:4px solid ${cat?.color || '#1e90ff'}">
                    <div>
                        <span class="exercise-ref-badge">${ex.ref}</span>
                        <h5 class="exercise-detail-title d-inline-block ms-2 mb-0">${ex.title}</h5>
                        <p class="exercise-detail-desc mt-1 mb-0">${ex.description}</p>
                    </div>
                    <button class="btn-ghost no-print" onclick="app.printExercise('${ex.id}')" title="Télécharger en PDF / Imprimer vierge" style="font-size: 1.3rem; color: var(--primary); padding: 8px 12px;">
                        <i class="fas fa-file-pdf"></i>
                    </button>
                </div>
                ${ex.helpText ? `<div class="exercise-help"><i class="fas fa-info-circle"></i> ${ex.helpText}</div>` : ''}
                <div class="exercise-detail-body">
                    ${innerHtml}
                </div>
                ${isForm ? `
                    <div class="exercise-detail-footer">
                        <button class="btn-primary-custom exercise-save-btn" data-exercise-id="${ex.id}">
                            <i class="fas fa-save"></i> Sauvegarder
                        </button>
                        <button class="btn-ghost exercise-reset-btn" data-exercise-id="${ex.id}">
                            <i class="fas fa-rotate-left"></i> Réinitialiser
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // ---- INFO PAGE ----
    renderInfo(ex) {
        return `<div class="exercise-info-content">${ex.content}</div>`;
    },

    // ---- MODEL DIAGRAM ----
    renderModel(ex) {
        return `
            <div class="model-flow">
                ${ex.modelSteps.map((step, i) => `
                    ${i > 0 ? '<div class="model-arrow"><i class="fas fa-arrow-down"></i></div>' : ''}
                    <div class="model-step ${step.highlight ? 'highlight' : ''} ${step.wide ? 'wide' : ''}" style="border-color:${step.color}">
                        <div class="model-step-icon" style="background:${step.color}"><i class="fas ${step.icon}"></i></div>
                        <div class="model-step-label">${step.label.replace(/\n/g, '<br>')}</div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // ---- DAILY LOG (repeating table) ----
    renderDailyLog(ex, pid) {
        const saved = ExerciseStorage.getAllEntries(pid, ex.id);
        const printRowsHtml = Array(7).fill(0).map((_, i) => this._logRow(ex, {}, `print-${i}`, true)).join('');
        
        return `
            <div class="table-responsive">
                <table class="table exercise-log-table" id="log-table-${ex.id}">
                    <thead><tr>${ex.columns.map(c => `<th style="${c.width ? 'width:' + c.width : ''}">${c.label}</th>`).join('')}<th class="no-print" style="width:40px"></th></tr></thead>
                    <tbody>
                        ${saved.map((entry, i) => this._logRow(ex, entry, i)).join('')}
                        ${this._logRow(ex, {}, saved.length)}
                        ${printRowsHtml}
                    </tbody>
                </table>
            </div>
            <button class="btn-ghost btn-sm mt-2 no-print" onclick="ExerciseRenderer.addLogRow('${ex.id}')"><i class="fas fa-plus"></i> Ajouter une ligne</button>
        `;
    },

    _logRow(ex, data, idx, isPrintOnly = false) {
        const trClass = isPrintOnly ? 'print-only-row' : '';
        return `<tr data-row="${idx}" class="${trClass}">${ex.columns.map(c => {
            const val = data[c.key] || '';
            if (c.inputType === 'select') {
                // Add an empty option so untouched rows don't count as "filled" (select defaults to first option otherwise).
                return `<td><select class="form-select form-select-sm ex-input print-input" data-key="${c.key}">
                    <option value="" ${val === '' ? 'selected' : ''}>—</option>
                    ${c.options.map(o => `<option ${val === o ? 'selected' : ''} value="${o}">${o}</option>`).join('')}
                </select></td>`;
            }
            if (c.inputType === 'number') {
                return `<td><input type="number" class="form-control form-control-sm ex-input print-input" data-key="${c.key}" value="${val}" min="${c.min||0}" max="${c.max||100}" style="width:${c.width||'80px'}"></td>`;
            }
            return `<td><input type="${c.inputType||'text'}" class="form-control form-control-sm ex-input print-input" data-key="${c.key}" value="${val}" placeholder="${c.placeholder||''}" style="${c.width?'width:'+c.width:''}"></td>`;
        }).join('')}<td class="no-print"><button class="btn-sm-icon" onclick="this.closest('tr').remove()" title="Supprimer"><i class="fas fa-trash" style="font-size:0.7rem;color:var(--danger);"></i></button></td></tr>`;
    },

    addLogRow(exId) {
        const ex = getExerciseById(exId);
        if (!ex) return;
        const tbody = document.querySelector(`#log-table-${exId} tbody`);
        if (!tbody) return;
        const idx = tbody.rows.length;
        tbody.insertAdjacentHTML('beforeend', this._logRow(ex, {}, idx));
    },

    // ---- TWO COLUMNS ----
    renderTwoColumns(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        return `
            <div class="exercise-two-cols">
                <div class="exercise-col">
                    <label>${ex.columnA.label}</label>
                    <textarea class="notes-textarea ex-input" data-key="colA" rows="8" placeholder="${ex.columnA.placeholder}">${saved.colA || ''}</textarea>
                </div>
                <div class="exercise-col">
                    <label>${ex.columnB.label}</label>
                    <textarea class="notes-textarea ex-input" data-key="colB" rows="8" placeholder="${ex.columnB.placeholder}">${saved.colB || ''}</textarea>
                </div>
            </div>
        `;
    },

    // ---- STRUCTURED FORM ----
    renderStructuredForm(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        return ex.fields.map(f => {
            const val = saved[f.key] || '';
            if (f.type === 'select') {
                return `<div class="mb-3"><label class="exercise-field-label">${f.label}</label>
                    <select class="form-select form-select-sm ex-input" data-key="${f.key}">${f.options.map(o => `<option ${val===o?'selected':''}>${o}</option>`).join('')}</select></div>`;
            }
            return `<div class="mb-3"><label class="exercise-field-label">${f.label}</label>
                <textarea class="notes-textarea ex-input" data-key="${f.key}" rows="${f.rows||3}" placeholder="${f.placeholder||''}">${val}</textarea></div>`;
        }).join('');
    },

    // ---- CHECKLIST ----
    renderChecklist(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        return `<div class="exercise-checklist">
            ${ex.items.map((item, i) => `
                <div class="exercise-check-item">
                    <input type="checkbox" class="form-check-input ex-check" data-key="item_${i}" id="ck_${ex.id}_${i}" ${saved['item_'+i] ? 'checked' : ''}>
                    <label for="ck_${ex.id}_${i}">
                        <span>${item.label}</span>
                        ${item.tag ? `<span class="check-tag">${item.tag}</span>` : ''}
                    </label>
                </div>
            `).join('')}
        </div>`;
    },

    // ---- CHECKLIST WITH PERSONAL EXAMPLES ----
    renderChecklistExamples(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        return `<div class="exercise-checklist-ex">
            ${ex.items.map((item, i) => `
                <div class="exercise-check-ex-item">
                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex gap-2 flex-shrink-0" style="padding-top:2px;">
                            <button class="btn-sm-check ${saved['yn_'+i]==='oui'?'active-yes':''}" data-key="yn_${i}" data-val="oui" onclick="ExerciseRenderer._toggleYN(this)">OUI</button>
                            <button class="btn-sm-check ${saved['yn_'+i]==='non'?'active-no':''}" data-key="yn_${i}" data-val="non" onclick="ExerciseRenderer._toggleYN(this)">NON</button>
                        </div>
                        <div style="flex:1;min-width:0;">
                            <div class="fw-600" style="font-size:0.85rem;margin-bottom:2px;">${i+1}. ${item.label}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:6px;">${item.example}</div>
                            <input type="text" class="form-control form-control-sm ex-input" data-key="personal_${i}" placeholder="Exemple personnel…" value="${saved['personal_'+i]||''}">
                        </div>
                    </div>
                </div>
            `).join('')}
            <div class="mt-3">
                <label class="exercise-field-label">Autres manifestations non listées :</label>
                <textarea class="notes-textarea ex-input" data-key="other" rows="2" placeholder="Décrivez d'autres comportements…">${saved.other||''}</textarea>
            </div>
        </div>`;
    },

    _toggleYN(btn) {
        const siblings = btn.parentElement.querySelectorAll('.btn-sm-check');
        siblings.forEach(b => b.classList.remove('active-yes', 'active-no'));
        btn.classList.add(btn.dataset.val === 'oui' ? 'active-yes' : 'active-no');
    },

    // ---- FREE LIST ----
    renderFreeList(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        const items = saved.items || [''];
        return `
            ${ex.examples ? `<div class="exercise-examples"><strong>Exemples :</strong><ul>${ex.examples.map(e=>`<li>${e}</li>`).join('')}</ul></div>` : ''}
            <div id="freelist-${ex.id}">
                ${items.map((item, i) => `
                    <div class="freelist-row">
                        <span class="freelist-num">${i+1}</span>
                        <input type="text" class="form-control form-control-sm ex-input" data-key="item" value="${item}" placeholder="${ex.placeholder||''}">
                        <button class="btn-sm-icon" onclick="this.closest('.freelist-row').remove()"><i class="fas fa-trash" style="font-size:0.7rem;color:var(--danger);"></i></button>
                    </div>
                `).join('')}
            </div>
            <button class="btn-ghost btn-sm mt-2" onclick="ExerciseRenderer.addFreeListItem('${ex.id}', '${ex.placeholder||''}')"><i class="fas fa-plus"></i> Ajouter</button>
        `;
    },

    addFreeListItem(exId, placeholder) {
        const container = document.getElementById(`freelist-${exId}`);
        if (!container) return;
        const n = container.children.length + 1;
        container.insertAdjacentHTML('beforeend', `
            <div class="freelist-row">
                <span class="freelist-num">${n}</span>
                <input type="text" class="form-control form-control-sm ex-input" data-key="item" placeholder="${placeholder}">
                <button class="btn-sm-icon" onclick="this.closest('.freelist-row').remove()"><i class="fas fa-trash" style="font-size:0.7rem;color:var(--danger);"></i></button>
            </div>
        `);
    },

    // ---- PROBLEM SOLVING ----
    renderProblemSolving(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        let html = '';
        ex.fields.forEach(f => {
            html += `<div class="mb-3"><label class="exercise-field-label">${f.label}</label>
                <textarea class="notes-textarea ex-input" data-key="${f.key}" rows="${f.rows||2}" placeholder="${f.placeholder||''}">${saved[f.key]||''}</textarea></div>`;
        });
        html += `<label class="exercise-field-label">Solutions possibles (au moins 10, sans juger, solutions variées)</label>`;
        html += `<div id="ps-sols-${ex.id}">`;
        for (let i = 0; i < (ex.solutionSlots || 10); i++) {
            html += `<div class="ps-sol-row">
                <div class="ps-sol-num">${i+1}</div>
                <input type="text" class="form-control form-control-sm ex-input" data-key="sol_${i}" value="${saved['sol_'+i]||''}" placeholder="Solution possible…">
            </div>`;
        }
        html += `</div>`;
        ex.evaluationFields.forEach(f => {
            html += `<div class="mb-3 mt-3"><label class="exercise-field-label">${f.label}</label>
                <textarea class="notes-textarea ex-input" data-key="${f.key}" rows="${f.rows||2}">${saved[f.key]||''}</textarea></div>`;
        });
        return html;
    },

    // ---- EXPOSURE SHEET ----
    renderExposureSheet(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        return `
            <div class="row g-3">
                <div class="col-12">
                    <label class="exercise-field-label">Thème du scénario</label>
                    <input type="text" class="form-control ex-input" data-key="theme" value="${saved.theme||''}" placeholder="Ex: Perte d'emploi">
                </div>
                <div class="col-md-6">
                    <div class="exposure-section">
                        <h6 class="exposure-section-title">AVANT l'exposition</h6>
                        <label class="exercise-field-label">Heure</label>
                        <input type="time" class="form-control form-control-sm ex-input" data-key="heure_avant" value="${saved.heure_avant||''}">
                        <label class="exercise-field-label mt-2">Niveau de malaise (0-8)</label>
                        <input type="range" class="form-range ex-input" data-key="niveau_avant" min="0" max="8" value="${saved.niveau_avant||0}" oninput="this.nextElementSibling.textContent=this.value">
                        <div class="range-display">${saved.niveau_avant||0}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="exposure-section">
                        <h6 class="exposure-section-title">APRÈS l'exposition</h6>
                        <label class="exercise-field-label">Heure</label>
                        <input type="time" class="form-control form-control-sm ex-input" data-key="heure_apres" value="${saved.heure_apres||''}">
                        <label class="exercise-field-label mt-2">Niveau de malaise (0-8)</label>
                        <input type="range" class="form-range ex-input" data-key="niveau_apres" min="0" max="8" value="${saved.niveau_apres||0}" oninput="this.nextElementSibling.textContent=this.value">
                        <div class="range-display">${saved.niveau_apres||0}</div>
                    </div>
                </div>
                <div class="col-12">
                    <label class="exercise-field-label">Niveau MAXIMAL de malaise pendant l'exposition (0-8)</label>
                    <input type="range" class="form-range ex-input" data-key="niveau_max" min="0" max="8" value="${saved.niveau_max||0}" oninput="this.nextElementSibling.textContent=this.value">
                    <div class="range-display">${saved.niveau_max||0}</div>
                </div>
                <div class="col-md-6">
                    <label class="exercise-field-label">Avez-vous neutralisé ?</label>
                    <select class="form-select form-select-sm ex-input" data-key="neutralisation">
                        <option ${(saved.neutralisation||'Non')==='Non'?'selected':''}>Non</option>
                        <option ${saved.neutralisation==='Oui'?'selected':''}>Oui</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="exercise-field-label">Si oui, comment ?</label>
                    <textarea class="notes-textarea ex-input" data-key="neutralisation_comment" rows="2">${saved.neutralisation_comment||''}</textarea>
                </div>
            </div>
        `;
    },

    // ---- GOALS FORM ----
    renderGoalsForm(ex, pid) {
        const saved = ExerciseStorage.get(pid, ex.id) || {};
        const goalCount = saved._goalCount || ex.minGoals || 2;
        let html = `<div id="goals-container-${ex.id}">`;
        for (let i = 0; i < goalCount; i++) {
            html += `
                <div class="goal-block">
                    <h6 class="goal-block-title">Objectif ${i+1}</h6>
                    <textarea class="notes-textarea ex-input mb-2" data-key="objectif_${i}" rows="2" placeholder="Décrire l'objectif…">${saved['objectif_'+i]||''}</textarea>
                    <label class="exercise-field-label">Moyens</label>
                    <textarea class="notes-textarea ex-input" data-key="moyens_${i}" rows="2" placeholder="Comment atteindre cet objectif…">${saved['moyens_'+i]||''}</textarea>
                </div>
            `;
        }
        html += `</div>`;
        if (goalCount < (ex.maxGoals || 5)) {
            html += `<button class="btn-ghost btn-sm mt-2" onclick="ExerciseRenderer.addGoal('${ex.id}', ${pid})"><i class="fas fa-plus"></i> Ajouter un objectif</button>`;
        }
        return html;
    },

    addGoal(exId, pid) {
        const ex = getExerciseById(exId);
        if (!ex) return;
        const container = document.getElementById(`goals-container-${exId}`);
        if (!container) return;
        const n = container.children.length;
        if (n >= (ex.maxGoals || 5)) return;
        container.insertAdjacentHTML('beforeend', `
            <div class="goal-block">
                <h6 class="goal-block-title">Objectif ${n+1}</h6>
                <textarea class="notes-textarea ex-input mb-2" data-key="objectif_${n}" rows="2" placeholder="Décrire l'objectif…"></textarea>
                <label class="exercise-field-label">Moyens</label>
                <textarea class="notes-textarea ex-input" data-key="moyens_${n}" rows="2" placeholder="Comment atteindre cet objectif…"></textarea>
            </div>
        `);
    },

    // =====================================================
    // SAVE & RESET BINDINGS
    // =====================================================
    _bindSaveButtons(ex, patientId, container) {
        const saveBtn = container.querySelector('.exercise-save-btn');
        const resetBtn = container.querySelector('.exercise-reset-btn');

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const data = this._collectFormData(ex, container);
                if (ex.type === 'daily_log') {
                    this._saveDailyLog(ex, patientId, container);
                } else {
                    ExerciseStorage.save(patientId, ex.id, data);
                }
                app.showToast(`Exercice « ${ex.title} » sauvegardé.`, 'success');
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm(`Réinitialiser l'exercice « ${ex.title} » ? Toutes les données seront effacées.`)) {
                    ExerciseStorage.clearExercise(patientId, ex.id);
                    this.render(ex, patientId, container);
                    app.showToast('Exercice réinitialisé.', 'info');
                }
            });
        }
    },

    _collectFormData(ex, container) {
        const data = {};
        container.querySelectorAll('.ex-input').forEach(el => {
            const key = el.dataset.key;
            if (!key) return;
            data[key] = el.value;
        });
        container.querySelectorAll('.ex-check').forEach(el => {
            const key = el.dataset.key;
            if (key) data[key] = el.checked;
        });
        container.querySelectorAll('.btn-sm-check.active-yes, .btn-sm-check.active-no').forEach(el => {
            const key = el.dataset.key;
            if (key) data[key] = el.dataset.val;
        });
        if (ex.type === 'free_list') {
            const items = [];
            container.querySelectorAll('.freelist-row .ex-input').forEach(el => {
                if (el.value.trim()) items.push(el.value.trim());
            });
            data.items = items;
        }
        if (ex.type === 'goals_form') {
            const gc = container.querySelector(`#goals-container-${ex.id}`);
            if (gc) data._goalCount = gc.children.length;
        }
        return data;
    },

    _saveDailyLog(ex, patientId, container) {
        ExerciseStorage.clearExercise(patientId, ex.id);
        const rows = container.querySelectorAll(`#log-table-${ex.id} tbody tr`);
        let savedCount = 0;
        rows.forEach((row, i) => {
            const rowData = {};
            let hasData = false;
            row.querySelectorAll('.ex-input').forEach(el => {
                const key = el.dataset.key;
                if (key && el.value) {
                    rowData[key] = el.value;
                    hasData = true;
                }
            });
            if (hasData) {
                ExerciseStorage.save(patientId, ex.id, rowData, i);
                savedCount++;
            }
        });
        return savedCount;
    }
};
