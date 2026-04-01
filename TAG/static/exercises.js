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
            // New logic: Check if all fields are filled
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
            case 'custom': html = this.renderCustom(exercise, patientId); break;
            case 'diary_card_dbt': html = this.renderDiaryCardDBT(exercise, patientId); break;
            case 'chain_analysis': html = this.renderChainAnalysis(exercise, patientId); break;
            case 'burns_inventory': html = this.renderBurnsInventory(exercise, patientId); break;
            case 'panic_observation': html = this.renderPanicObservation(exercise, patientId); break;
            case 'respiration_tracker': html = this.renderRespirationTracker(exercise, patientId); break;
            case 'interoceptive_grid': html = this.renderInteroceptiveGrid(exercise, patientId); break;
            case 'ima_hierarchy': html = this.renderIMA(exercise, patientId); break;
            case 'habituation_tracker': html = this.renderHabituationTracker(exercise, patientId); break;
            case 'relapse_plan': html = this.renderRelapsePlan(exercise, patientId); break;
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

    renderCustom(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        let html = '<div class="custom-exercise-fields">';
        
        if (ex.questions && ex.questions.length > 0) {
            ex.questions.forEach((q, idx) => {
                const key = `q_${idx}`;
                const val = data[key] || '';
                
                html += `<div class="exercise-field mb-4">`;
                html += `  <label class="exercise-field-label fw-bold d-block mb-2" style="color:var(--text);">${idx + 1}. ${q.text}</label>`;
                
                if (q.type === 'text') {
                    html += `  <textarea class="form-control ex-input" rows="3" placeholder="Votre réponse..." data-key="${key}">${val}</textarea>`;
                } else if (q.type === 'likert5') {
                    html += `
                        <div class="d-flex align-items-center gap-2">
                            <input type="range" class="form-range ex-input w-50" min="0" max="5" step="1" id="range_${key}" data-key="${key}" value="${val || 0}" oninput="document.getElementById('val_${key}').textContent = this.value">
                            <span id="val_${key}" class="badge bg-primary rounded-pill px-3 py-2" style="font-size:1rem;">${val || 0}</span>
                            <span class="text-muted ms-2" style="font-size:0.8rem;">(Échelle 0-5)</span>
                        </div>
                    `;
                } else if (q.type === 'likert10') {
                    html += `
                        <div class="d-flex align-items-center gap-2">
                            <input type="range" class="form-range ex-input w-50" min="0" max="10" step="1" id="range_${key}" data-key="${key}" value="${val || 0}" oninput="document.getElementById('val_${key}').textContent = this.value">
                            <span id="val_${key}" class="badge bg-primary rounded-pill px-3 py-2" style="font-size:1rem;">${val || 0}</span>
                            <span class="text-muted ms-2" style="font-size:0.8rem;">(Échelle 0-10)</span>
                        </div>
                    `;
                } else if (q.type === 'yesno') {
                    html += `
                        <select class="form-select w-auto ex-input" data-key="${key}">
                            <option value="">-- Sélectionner --</option>
                            <option value="Oui" ${val === 'Oui' ? 'selected' : ''}>Oui</option>
                            <option value="Non" ${val === 'Non' ? 'selected' : ''}>Non</option>
                        </select>
                    `;
                }
                
                html += `</div>`;
            });
        } else {
            html += '<p class="text-muted text-center my-4">Cet exercice personnalisé ne contient aucune question.</p>';
        }
        
        html += '</div>';
        return html;
    },

    renderDiaryCardDBT(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        
        let html = '<div class="diary-grid" style="overflow-x:auto;">';
        html += '<table class="table table-bordered" style="font-size:0.8rem; text-align:center; vertical-align:middle;">';
        html += '<thead style="background:var(--primary-light);"><tr><th style="min-width:180px;text-align:left;">Indicateurs</th>';
        days.forEach(d => html += `<th>${d}</th>`);
        html += '</tr></thead><tbody>';
        
        const renderRowNum = (label, key, max) => {
            let row = `<tr><td style="text-align:left;">${label} (0-${max})</td>`;
            for (let i = 0; i < 7; i++) {
                const val = data[`${key}_${i}`] || '';
                row += `<td><input type="number" class="form-control form-control-sm ex-input" style="width:45px;margin:0 auto;text-align:center;" min="0" max="${max}" data-key="${key}_${i}" value="${val}"></td>`;
            }
            row += '</tr>';
            return row;
        };
        
        const renderRowCheck = (label, key) => {
            let row = `<tr><td style="text-align:left;">${label}</td>`;
            for (let i = 0; i < 7; i++) {
                const val = data[`${key}_${i}`] ? 'checked' : '';
                row += `<td><input type="checkbox" class="form-check-input ex-check" data-key="${key}_${i}" ${val}></td>`;
            }
            row += '</tr>';
            return row;
        };

        html += '<tr><td colspan="8" style="background:#f8f9fa;font-weight:700;text-align:left;">Émotions & Pulsions</td></tr>';
        html += renderRowNum("Souffrance émotionnelle", "souffrance", 5);
        html += renderRowNum("Désir de suicide", "suicide_desir", 5);
        html += renderRowNum("Désir d'automutilation", "am_desir", 5);

        html += '<tr><td colspan="8" style="background:#f8f9fa;font-weight:700;text-align:left;">Comportements (Oui/Non)</td></tr>';
        html += renderRowCheck("Automutilation accomplie", "am_act");
        html += renderRowCheck("Drogues/Alcool", "substance");
        html += renderRowCheck("Compétences TCD", "skills");

        html += '</tbody></table></div>';
        return html;
    },

    renderChainAnalysis(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        const steps = [
            { title: "Comportement problématique", desc: "Description précise et détaillée du comportement (quoi, quand, où, avec qui ?)." },
            { title: "Événement déclencheur (Prompting Event)", desc: "Que s'est-il passé juste avant l'apparition du problème ?" },
            { title: "Facteurs de vulnérabilité", desc: "Contexte qui vous a rendu plus sensible (sommeil, faim, stress, substances)." },
            { title: "La chaîne (Liens)", desc: "Listez les pensées, émotions et sensations qui ont mené au comportement (lien par lien)." },
            { title: "Conséquences", desc: "Quelles ont été les conséquences pour vous ? Et pour les autres ?" },
            { title: "Comportements alternatifs (Solutions)", desc: "Quelles compétences auriez-vous pu utiliser à chaque maillon ?" },
            { title: "Plan de prévention", desc: "Comment réduire votre vulnérabilité future pour cet événement ?" },
            { title: "Réparation (Overcorrection)", desc: "Comment pouvez-vous réparer le tort causé par ce comportement ?" },
            { title: "Émotions actuelles", desc: "Que ressentez-vous maintenant en faisant cette analyse ?" }
        ];

        let html = '<div class="chain-steps" style="display:flex;flex-direction:column;gap:16px;">';
        steps.forEach((step, idx) => {
            const key = `step_${idx}`;
            const val = data[key] || '';
            html += `
                <div style="display:flex;gap:14px;align-items:flex-start;background:white;padding:14px;border:1px solid var(--border);border-radius:var(--r-md);">
                    <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0;">${idx + 1}</div>
                    <div style="flex:1;">
                        <label style="display:block;font-weight:700;margin-bottom:4px;">${step.title}</label>
                        <p style="font-size:0.75rem;color:var(--text-muted);margin:0 0 8px;">${step.desc}</p>
                        <textarea class="form-control ex-input" rows="2" data-key="${key}" placeholder="Votre analyse...">${val}</textarea>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    },

    // =====================================================
    // PANIQUE ET AGORAPHOBIE RENDERERS
    // =====================================================
    renderBurnsInventory(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        const items = [
            // Cat 1: Sentiments (1-6)
            "1. Anxiété, nervosité, inquiétude ou peur", "2. Sentiment que les choses échappent à votre contrôle", 
            "3. Sentiments de panique", "4. Sentiment qu'une catastrophe va se produire", 
            "5. Sentiment d'être très bousculé(e) ou sur le point d'exploser", "6. Sentiment de désarroi ou de confusion",
            // Cat 2: Pensées (7-17)
            "7. Impossibilité de se concentrer", "8. Difficulté à prendre des décisions",
            "9. Peur de perdre le contrôle de soi", "10. Peur d'être l'objet d'un examen minutieux",
            "11. Impressions d'étrangeté concernant les gens ou les choses", "12. Sentiment de devenir fou / folle",
            "13. Peur d'être rejeté(e) ou critiqué(e)", "14. Peur d'être ridicule",
            "15. Peur d'attraper une maladie grave", "16. Peur de faire quelque chose de honteux",
            "17. Peur de la mort",
            // Cat 3: Physiques (18-33)
            "18. Impression que le cœur s'arrête ou s'emballe", "19. Sentiment d'étouffement", "20. Sensations d'étourdissement",
            "21. Transpiration intense", "22. Jambes molles", "23. Tendance à trembler", "24. Sentiment de suffocation",
            "25. Serrements dans le ventre", "26. Serrements dans la poitrine", "27. Étourdissement",
            "28. Picotements", "29. Fourmillements", "30. Impression d'estomac serré", "31. Mains froides",
            "32. Bouffées de chaleur ou frissons", "33. Impression de perte de connaissance"
        ];
        
        let html = '<div class="burns-grid mb-3"><div class="table-responsive"><table class="table table-bordered table-sm" style="font-size:0.85rem;">';
        html += '<thead class="table-light"><tr><th style="width:55%">Symptôme</th><th class="text-center">Pas du tout (0)</th><th class="text-center">Un peu (1)</th><th class="text-center">Modérément (2)</th><th class="text-center">Beaucoup (3)</th></tr></thead><tbody>';
        
        items.forEach((item, idx) => {
            const key = 'item_' + (idx + 1);
            const val = data[key];
            if(idx === 0) html += '<tr><td colspan="5" style="background:#f3f4f6;font-weight:700;">Catégorie 1 : Sentiments</td></tr>';
            if(idx === 6) html += '<tr><td colspan="5" style="background:#f3f4f6;font-weight:700;">Catégorie 2 : Pensées</td></tr>';
            if(idx === 17) html += '<tr><td colspan="5" style="background:#f3f4f6;font-weight:700;">Catégorie 3 : Symptômes Physiques</td></tr>';
            
            html += `<tr><td>${item}</td>`;
            for (let v = 0; v <= 3; v++) {
                const isSelected = val == v ? 'checked' : '';
                html += `<td class="text-center"><input type="radio" class="ex-check" name="burns_${ex.id}_${idx}" data-key="${key}" data-val="${v}" ${isSelected} onclick="if(window.app) window.app._calcBurnsScore(this.closest('.exercise-detail'))"></td>`;
            }
            html += `</tr>`;
        });
        html += '</tbody></table></div></div>';
        
        // Score display and Alert area
        html += `<div class="burns-score-area" style="padding:15px;background:var(--surface-2);border-radius:var(--r-md);margin-top:15px;display:none;"></div>`;
        return html;
    },

    renderPanicObservation(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        const symptoms = [
            "Étouffement", "Étourdissements", "Palpitations", "Tremblements", 
            "Transpiration", "Étranglement", "Nausée", "Irréalité", 
            "Engourdissements", "Chaleurs / frissons", "Douleur thoracique", 
            "Peur de mourir", "Peur de devenir fou / perdre le contrôle"
        ];
        
        let html = `
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="exercise-field-label">Date et Heure</label>
                    <div class="d-flex gap-2">
                        <input type="date" class="form-control form-control-sm ex-input" data-key="date" value="${data.date||''}">
                        <input type="time" class="form-control form-control-sm ex-input" data-key="time" value="${data.time||''}">
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="exercise-field-label">Anxiété maximale (0-10)</label>
                    <input type="number" class="form-control form-control-sm ex-input" data-key="anx_max" min="0" max="10" value="${data.anx_max||''}">
                </div>
                <div class="col-12 mt-3">
                    <label class="exercise-field-label">Type de déclencheur</label>
                    <select class="form-select form-select-sm ex-input" data-key="trigger_type">
                        <option value="">Sélectionnez un déclencheur...</option>
                        <option ${data.trigger_type==="Situation"?"selected":""}>1. Situation spécifique</option>
                        <option ${data.trigger_type==="Pensée"?"selected":""}>2. Pensée intrusive</option>
                        <option ${data.trigger_type==="Sensation"?"selected":""}>3. Sensation physique isolée</option>
                        <option ${data.trigger_type==="Spontanée"?"selected":""}>4. Spontanée / Inattendue</option>
                    </select>
                </div>
                <div class="col-12 mt-3">
                    <label class="exercise-field-label">Symptômes ressentis</label>
                    <div class="d-flex flex-wrap gap-2">
                        ${symptoms.map((symp, i) => {
                            const isChecked = data['symp_'+i] ? 'checked' : '';
                            return `<div class="form-check" style="width:calc(50% - 1rem);"><input type="checkbox" class="form-check-input ex-check symp-check" data-key="symp_${i}" id="chk_${ex.id}_${i}" ${isChecked} data-label="${symp}" onclick="if(window.app) window.app._checkPanicAlert(this.closest('.exercise-detail'))"><label class="form-check-label" style="font-size:0.85rem;" for="chk_${ex.id}_${i}">${symp}</label></div>`;
                        }).join('')}
                    </div>
                </div>
                <!-- Alert container injected here dynamically via JS during save/change -->
                <div class="col-12 panic-alert-container"></div>
            </div>
        `;
        return html;
    },

    renderRespirationTracker(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        let savedLogs = data.logs || [];
        
        let html = `
            <div class="alert alert-info mb-3" style="font-size:0.85rem;"><i class="fas fa-info-circle"></i> Le patient doit appliquer la respiration diaphragmatique pendant la crise ou en exercice régulier de 5 mins.</div>
            <div class="table-responsive mb-3">
                <table class="table table-bordered table-sm text-center" style="font-size:0.85rem;" id="resp-table-${ex.id}">
                    <thead><tr><th>Date</th><th>Durée (min)</th><th>Anxiété AVANT (0-10)</th><th>Anxiété APRÈS (0-10)</th><th>Delta (Succès)</th><th class="no-print"></th></tr></thead>
                    <tbody>
                        ${savedLogs.map((log, i) => {
                            const delta = (log.avant || 0) - (log.apres || 0);
                            const tClass = delta > 0 ? 'text-success' : (delta < 0 ? 'text-danger' : '');
                            return `<tr>
                                <td><input type="date" class="form-control form-control-sm ex-input-arr" data-arr="date" value="${log.date||''}"></td>
                                <td><input type="number" class="form-control form-control-sm ex-input-arr" data-arr="duree" value="${log.duree||''}"></td>
                                <td><input type="number" min="0" max="10" class="form-control form-control-sm ex-input-arr" data-arr="avant" value="${log.avant||''}" oninput="if(window.app) window.app._updateDelta(this)"></td>
                                <td><input type="number" min="0" max="10" class="form-control form-control-sm ex-input-arr" data-arr="apres" value="${log.apres||''}" oninput="if(window.app) window.app._updateDelta(this)"></td>
                                <td class="align-middle fw-bold ${tClass} delta-val" data-delta="${delta}"> ${delta > 0 ? '-'+delta : (delta == 0 ? '0' : '+'+Math.abs(delta))}</td>
                                <td class="no-print"><button class="btn-sm-icon text-danger" onclick="this.closest('tr').remove(); if(window.app) window.app._drawRespChart('${ex.id}');"><i class="fas fa-trash"></i></button></td>
                            </tr>`;
                        }).join('')}
                        <tr>
                            <td><input type="date" class="form-control form-control-sm ex-input-arr dummy-row" data-arr="date"></td>
                            <td><input type="number" class="form-control form-control-sm ex-input-arr dummy-row" data-arr="duree"></td>
                            <td><input type="number" min="0" max="10" class="form-control form-control-sm ex-input-arr dummy-row" data-arr="avant" oninput="if(window.app) window.app._updateDelta(this)"></td>
                            <td><input type="number" min="0" max="10" class="form-control form-control-sm ex-input-arr dummy-row" data-arr="apres" oninput="if(window.app) window.app._updateDelta(this)"></td>
                            <td class="align-middle fw-bold delta-disp delta-val" data-delta="0">—</td>
                            <td class="no-print"><button class="btn-sm-icon text-danger" onclick="this.closest('tr').remove(); if(window.app) window.app._drawRespChart('${ex.id}');"><i class="fas fa-trash"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="btn-ghost btn-sm no-print mb-4" onclick="document.querySelector('#resp-table-${ex.id} tbody').insertAdjacentHTML('beforeend', '<tr><td><input type=\"date\" class=\"form-control form-control-sm ex-input-arr\" data-arr=\"date\"></td><td><input type=\"number\" class=\"form-control form-control-sm ex-input-arr\" data-arr=\"duree\"></td><td><input type=\"number\" min=\"0\" max=\"10\" class=\"form-control form-control-sm ex-input-arr\" data-arr=\"avant\" onchange=\"window.app._updateDelta(this)\"></td><td><input type=\"number\" min=\"0\" max=\"10\" class=\"form-control form-control-sm ex-input-arr\" data-arr=\"apres\" onchange=\"window.app._updateDelta(this)\"></td><td class=\"align-middle fw-bold delta-disp delta-val\" data-delta=\"0\">—</td><td class=\"no-print\"><button class=\"btn-sm-icon text-danger\" onclick=\"this.closest(\\'tr\\').remove(); window.app._drawRespChart(\\'${ex.id}\\');\"><i class=\"fas fa-trash\"></i></button></td></tr>')"><i class="fas fa-plus"></i> Ajouter une ligne</button>
            <div id="resp-chart-${ex.id}" style="height:250px;background:#f8f9fa;border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:0.8rem;">
                [Le graphique Taux de Succès s'affichera après ajout de données]
            </div>
        `;
        return html;
    },

    renderInteroceptiveGrid(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        const exercises = [
            "Secouer la tête gauche/droite", "Redressement rapide de la tête", 
            "Monter/descendre une marche", "Retenir sa respiration", 
            "Tension corporelle extrême (crisper tout)", "Tournoiement (sur une chaise)", 
            "Hyperventilation (respiration rapide)", "Respiration restreinte (paille)"
        ];
        
        let html = `
            <div class="table-responsive"><table class="table table-bordered table-sm text-center" style="font-size:0.85rem;">
                <thead class="table-light"><tr><th style="text-align:left;">Exercice</th><th>Anxiété ressentie (0-10)</th><th>Similitude avec crises (0-10)</th><th class="text-center" style="width:100px;">Statut</th></tr></thead>
                <tbody>
        `;
        exercises.forEach((item, i) => {
            const anx = data['anx_'+i] || '';
            const sim = data['sim_'+i] || '';
            const isTarget = parseInt(sim) > 7;
            const targetHtml = isTarget ? '<span class="badge bg-danger">Mission requise</span>' : '<span style="color:var(--text-muted);font-size:0.75rem;">—</span>';
            const rowStyle = isTarget ? 'background:rgba(239, 68, 68, 0.05);' : '';
            html += `<tr style="${rowStyle}">
                <td style="text-align:left;vertical-align:middle;">${i+1}. ${item}</td>
                <td><input type="number" class="form-control form-control-sm ex-input mx-auto" style="width:60px;" data-key="anx_${i}" value="${anx}" min="0" max="10"></td>
                <td><input type="number" class="form-control form-control-sm ex-input mx-auto" style="width:60px;" data-key="sim_${i}" value="${sim}" min="0" max="10" oninput="if(window.app) window.app._updateInteroceptiveRow(this)"></td>
                <td class="align-middle target-col">${targetHtml}</td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        return html;
    },

    renderIMA(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        const places = [
            "Ascenseurs", "Supermarchés fermés", "Supermarchés (grandes surfaces)", 
            "Ponts", "Autoroutes", "Foules / Rassemblements", "Transports en commun (Bus)", 
            "Transports en commun (Métro/Train)", "Être seul à la maison", "S'éloigner seul de la maison"
        ];
        
        let html = `<h6>Étape 1 : Évaluation de l'évitement (1-5)</h6><div class="row g-2 mb-4 ima-step1-container">`;
        places.forEach((place, i) => {
            const avoid = data['avoid_'+i] || '';
            html += `<div class="col-md-6 d-flex align-items-center justify-content-between" style="font-size:0.85rem;padding:6px;border-bottom:1px solid var(--border);">
                <span class="place-name">${place}</span>
                <select class="form-select form-select-sm ex-input avoid-select" style="width:140px;" data-key="avoid_${i}" data-index="${i}" onchange="if(window.app) window.app._updateIMA(this.closest('.exercise-detail'))">
                    <option value="">Sélectionnez...</option>
                    <option value="1" ${avoid=='1'?'selected':''}>1 (Jamais)</option>
                    <option value="2" ${avoid=='2'?'selected':''}>2 (Rarement)</option>
                    <option value="3" ${avoid=='3'?'selected':''}>3 (Parfois)</option>
                    <option value="4" ${avoid=='4'?'selected':''}>4 (Souvent)</option>
                    <option value="5" ${avoid=='5'?'selected':''}>5 (Toujours)</option>
                </select>
            </div>`;
        });
        html += `</div>`;
        
        html += `<div class="ima-hierarchy-container"></div>`;
        
        return html;
    },

    renderHabituationTracker(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        let html = `
            <div class="mb-3">
                <label class="exercise-field-label">Situation affrontée (Mission in-vivo)</label>
                <input type="text" class="form-control form-control-sm ex-input" data-key="situation" value="${data.situation||''}" placeholder="Ex: Aller au supermarché seul pendant 20 minutes">
            </div>
            <div class="row mb-3 g-2">
                <div class="col-md-3"><label class="exercise-field-label">Durée (min)</label><input type="number" class="form-control form-control-sm ex-input" data-key="duree" value="${data.duree||''}"></div>
                <div class="col-md-3"><label class="exercise-field-label">Anxiété AVANT</label><input type="number" class="form-control form-control-sm ex-input" data-key="anx_avant" max="100" value="${data.anx_avant||''}"></div>
                <div class="col-md-3"><label class="exercise-field-label">Anxiété MAX</label><input type="number" class="form-control form-control-sm ex-input" data-key="anx_max" max="100" value="${data.anx_max||''}"></div>
                <div class="col-md-3"><label class="exercise-field-label">Anxiété FIN</label><input type="number" class="form-control form-control-sm ex-input" data-key="anx_fin" max="100" value="${data.anx_fin||''}"></div>
            </div>
            <div class="mb-3">
                <label class="exercise-field-label">Avez-vous :</label>
                <div class="d-flex flex-column gap-2 mt-1 px-2" style="background:#f8f9fa;padding:10px;border-radius:var(--r-md);">
                    <label style="font-size:0.85rem;"><input type="radio" class="ex-check" name="habituation_strategy_${ex.id}" data-key="strat" data-val="1" ${data.strat=='1'?'checked':''} onchange="if(window.app) window.app._checkNeutralization(this.closest('.exercise-detail'))"> 1. Fait face complètement sans béquille</label>
                    <label style="font-size:0.85rem;"><input type="radio" class="ex-check" name="habituation_strategy_${ex.id}" data-key="strat" data-val="2" ${data.strat=='2'?'checked':''} onchange="if(window.app) window.app._checkNeutralization(this.closest('.exercise-detail'))"> 2. Évité la situation après quelques secondes/minutes (Fuite)</label>
                    <label style="font-size:0.85rem;"><input type="radio" class="ex-check" name="habituation_strategy_${ex.id}" data-key="strat" data-val="3" ${data.strat=='3'?'checked':''} onchange="if(window.app) window.app._checkNeutralization(this.closest('.exercise-detail'))"> 3. Fait face avec neutralisation/objet sécurisant (Ex: téléphone, musique, main serrée)</label>
                </div>
            </div>
            <div class="habituation-alert-container" style="display:none;" class="alert alert-warning mt-2 mb-0" style="font-size:0.85rem;"></div>
        `;
        return html;
    },

    renderRelapsePlan(ex, patientId) {
        const data = ExerciseStorage.get(patientId, ex.id) || {};
        return `
            <div class="alert alert-success" style="font-size:0.85rem;"><strong><i class="fas fa-shield-heart"></i> Plan d'action établi avec le patient.</strong> Ce plan sera disponible sur le tableau de bord en cas d'urgence.</div>
            <div class="mb-3">
                <label class="exercise-field-label">Symptômes précurseurs (Signaux d'alarme)</label>
                <textarea class="notes-textarea ex-input" data-key="precurseurs" rows="3" placeholder="Ex: Je recommence à mal dormir, tensions thoraciques...">${data.precurseurs||''}</textarea>
            </div>
            <div class="mb-3">
                <label class="exercise-field-label">Situations à risque</label>
                <textarea class="notes-textarea ex-input" data-key="situations" rows="3" placeholder="Ex: Surcharge de travail, fatigue...">${data.situations||''}</textarea>
            </div>
            <div class="mb-3">
                <label class="exercise-field-label">Quoi faire (To-Do List 1-2-3)</label>
                <textarea class="notes-textarea ex-input" data-key="todo" rows="4" placeholder="1. Refaire mes exercices respiratoires\n2. Appliquer l\'habituation">${data.todo||''}</textarea>
            </div>
            <div class="mb-3">
                <label class="exercise-field-label">Médication d'urgence (si applicable)</label>
                <input type="text" class="form-control form-control-sm ex-input" data-key="meds" value="${data.meds||''}" placeholder="Ex: Lorazépam 1mg au besoin">
            </div>
        `;
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
            if (key) {
                if (el.type === 'radio') {
                    if (el.checked) data[key] = el.dataset.val;
                } else {
                    data[key] = el.checked;
                }
            }
        });
        
        // Custom array collection for tables
        const arrInputs = container.querySelectorAll('.ex-input-arr');
        if (arrInputs.length > 0) {
            data.logs = [];
            let currentObj = {};
            let isRowEmpty = true;
            arrInputs.forEach((el, index) => {
                const arrKey = el.dataset.arr;
                if(el.value) isRowEmpty = false;
                currentObj[arrKey] = el.value;
                if ((index + 1) % 4 === 0) {
                    if(!isRowEmpty) data.logs.push({...currentObj});
                    currentObj = {};
                    isRowEmpty = true;
                }
            });
        }
        
        // specific capture for IMA dynamically generated inputs
        if (ex.type === 'ima_hierarchy') {
            container.querySelectorAll('.ima-peur-input').forEach(el => {
                data[el.dataset.key] = el.value;
            });
        }
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
