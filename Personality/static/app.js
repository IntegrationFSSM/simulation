/**
 * Ory+ — Personality (TPL/DBT) App Logic
 * TAG-style templates + module-owned rendering (no shared TAG app.js).
 */

const APP_VERSION = "1.0.5-status";

const app = {
  state: {
    activePanel: "dossier",
    selectedPatient: null,
    activeSession: null,
    sessionExerciseId: null,
    navigationHistory: [],
  },

  async init() {
    if (window.currentTroubleId && window.PROTOCOLS_DB) {
      window.PROTOCOL = window.PROTOCOLS_DB[window.currentTroubleId];
    }

    this._setStatus("initialisation…");

    try {
      const data = await LocalAPI.getPatients();
      if (data?.patients?.length) {
        const defaults = simulationData?.patients?.[0] || {};
        simulationData.patients = data.patients.map((p) => ({
          ...defaults,
          ...p,
          completedSessions: p.completedSessions || [],
          sessionScores: p.sessionScores || {},
          notes: p.notes || {},
          intermediateSessions: p.intermediateSessions || [],
          customExercises: p.customExercises || {},
          addedExercises: p.addedExercises || {},
          totalSessions: p.totalSessions || defaults.totalSessions || window.PROTOCOL?.default_total_sessions || 55,
          currentSession: p.currentSession || defaults.currentSession || 1,
        }));
      }
    } catch (e) {
      console.error("Erreur chargement patients:", e);
      this._setStatus("LocalAPI erreur (voir Console)");
    }

    const p = simulationData?.patients?.[0] || null;
    if (p?.id) {
      await this._loadPatientProgress(p);
    }
    this.state.selectedPatient = p;
    this.render();
    const sessionsLen = simulationData?.getSessionsForPatient?.(p)?.length ?? 0;
    this._setStatus(`v${APP_VERSION} · sessions=${sessionsLen}`);
  },

  _setStatus(text) {
    const el = document.getElementById("tpl-status");
    if (!el) return;
    el.textContent = `TPL: ${text}`;
    if (String(text).includes("erreur")) {
      el.style.background = "rgba(239, 68, 68, 0.12)";
      el.style.color = "var(--danger)";
      el.style.borderColor = "rgba(239, 68, 68, 0.35)";
    }
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
    } catch (e) {
      console.error("Erreur chargement progression:", e);
    }
  },

  showPanel(panel, sessionNo = null) {
    this.state.navigationHistory.push({
      panel: this.state.activePanel,
      sessionNo: this.state.activeSession?.no ?? null,
    });
    this.state.activePanel = panel;
    if (panel === "session" && Number.isFinite(sessionNo)) {
      this.state.activeSession = { no: sessionNo };
      window.activeSessionNo = sessionNo;
    }
    this.render();
  },

  goBack() {
    const prev = this.state.navigationHistory.pop();
    if (!prev) {
      this.state.activePanel = "dossier";
      this.state.activeSession = null;
      this.render();
      return;
    }
    this.state.activePanel = prev.panel;
    this.state.activeSession = prev.sessionNo ? { no: prev.sessionNo } : null;
    if (this.state.activeSession) window.activeSessionNo = this.state.activeSession.no;
    this.render();
  },

  render() {
    const view = document.getElementById("app-view");
    if (!view) return;
    if (this.state.activePanel === "dossier") this.renderDossier(view);
    else if (this.state.activePanel === "session") this.renderSession(view);
    else if (this.state.activePanel === "exercises") this.renderExercises(view);
    else this.renderDossier(view);
  },

  renderDossier(view) {
    const p = this.state.selectedPatient;
    if (!p) return;
    view.innerHTML = document.getElementById("tpl-dossier")?.innerHTML || "";

    const timeline = document.getElementById("dossier-session-timeline");
    const badge = document.getElementById("dossier-progress-badge");

    if (badge) {
      const pct = p.totalSessions ? Math.round(((p.completedSessions || []).length / p.totalSessions) * 100) : 0;
      badge.textContent = `${pct}%`;
    }

    if (!timeline) return;

    try {
      const sessions = simulationData?.getSessionsForPatient?.(p) || [];
      if (!Array.isArray(sessions) || sessions.length === 0) {
        timeline.innerHTML = `<div style="padding:10px;color:var(--text-muted);font-size:0.85rem;">Aucune séance générée (totalSessions=${p.totalSessions ?? "—"}).</div>`;
        return;
      }

      const completed = Array.isArray(p.completedSessions) ? p.completedSessions : [];
      const timelineHtml = sessions
        .map((s) => {
          const no = Number(s?.no);
          if (!Number.isFinite(no)) return "";
          const isDone = completed.includes(no);
          const isCurrent = no === p.currentSession;
          let exerciseCount = 0;
          try {
            exerciseCount = (getExercisesForSession(no) || []).length;
          } catch {}
          return `
            <div class="timeline-row" onclick="app.showPanel('session', ${no})">
              <div class="timeline-dot ${isDone ? "done" : isCurrent ? "current" : "pending"}">
                ${isDone ? '<i class="fas fa-check" style="font-size:0.65rem;"></i>' : no}
              </div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:0.84rem;font-weight:${isCurrent ? "700" : "500"};color:${isCurrent ? "var(--primary)" : "var(--text)"};">
                  Séance ${no}
                </div>
                <div style="font-size:0.72rem;color:var(--text-muted);">
                  ${exerciseCount} exercice${exerciseCount > 1 ? "s" : ""} associé${exerciseCount > 1 ? "s" : ""}
                </div>
              </div>
              ${isDone ? '<span class="badge" style="background:var(--success);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">Terminée</span>' : isCurrent ? '<span class="badge" style="background:var(--warning);color:white;font-size:0.65rem;padding:3px 8px;border-radius:10px;">En cours</span>' : ""}
            </div>
          `;
        })
        .join("");

      timeline.innerHTML = timelineHtml || `<div style="padding:10px;color:var(--text-muted);font-size:0.85rem;">Séances présentes mais rendu vide.</div>`;
    } catch (e) {
      console.error("Erreur renderDossier timeline:", e);
      timeline.innerHTML = `<div style="padding:10px;color:var(--danger);font-size:0.85rem;">Erreur rendu séances. Voir Console.</div>`;
    }

    // Consultation card if present (same helper as TAG app isn't available here, so keep simple)
    if (p.consultation) {
      const card = document.getElementById("dossier-consultation-card");
      const area = document.getElementById("dossier-consultation-area");
      if (card && area) {
        card.style.display = "block";
        area.innerHTML = `
          <div style="font-size:0.85rem;color:var(--text-muted);line-height:1.7;">
            <div style="font-weight:800;color:var(--text);margin-bottom:6px;">${p.consultation?.diagnosticMedical || "—"}</div>
            <div>${p.consultation?.orientationPsy || ""}</div>
          </div>
        `;
      }
    }

  },

  renderSession(view) {
    const s = this.state.activeSession;
    const p = this.state.selectedPatient;
    if (!s || !p) return this.showPanel("dossier");

    view.innerHTML = document.getElementById("tpl-session")?.innerHTML || "";
    document.getElementById("session-main-title").textContent = `Séance ${s.no}`;
    document.getElementById("session-patient-name").textContent = p.name || "";
    const badge = document.getElementById("session-badge");
    if (badge) badge.textContent = `S${s.no}`;

    this.renderSessionExercises(s);
    this.renderSessionScales(s);
    this.renderSessionMainArea(s);

    const savedNote = p?.notes?.[`session_${s.no}`] || "";
    const noteEl = document.getElementById("clinical-notes");
    if (noteEl) noteEl.value = savedNote;
  },

  renderSessionExercises(s) {
    const area = document.getElementById("session-exercises-area");
    if (!area) return;
    const pid = this.state.selectedPatient?.id || 1;

    const list = (getExercisesForSession(s.no) || []).filter(Boolean);
    const optionHtml = (ex) => {
      const status = ExerciseStorage.getStatus(pid, ex.id);
      const mark = status === "completed" ? " ✓" : status === "in_progress" ? " ●" : "";
      return `<option value="${ex.id}" ${this.state.sessionExerciseId === ex.id ? "selected" : ""}>${ex.ref} ${ex.title}${mark}</option>`;
    };

    area.innerHTML = `
      <div style="margin-bottom:10px;">
        <select class="form-select form-select-sm" id="session-exercise-select" onchange="app.selectSessionExercise(this.value)">
          <option value="">— Choisir un exercice —</option>
          ${list.map(optionHtml).join("")}
        </select>
      </div>
      ${list
        .map((ex) => {
          const status = ExerciseStorage.getStatus(pid, ex.id);
          const isActive = this.state.sessionExerciseId === ex.id;
          const statusIcon =
            status === "completed"
              ? '<i class="fas fa-check-circle" style="color:var(--success);"></i>'
              : status === "in_progress"
                ? '<i class="fas fa-circle-half-stroke" style="color:var(--warning);"></i>'
                : '<i class="fas fa-circle" style="color:var(--text-light);font-size:0.6rem;"></i>';
          return `
            <div class="ex-session-item ${isActive ? "active" : ""}" onclick="app.selectSessionExercise('${ex.id}')" style="${isActive ? "background:var(--primary-light);border-left:3px solid var(--primary);" : ""}">
              ${statusIcon}
              <div style="flex:1;min-width:0;">
                <div style="font-size:0.8rem;font-weight:600;">${ex.ref} ${ex.title}</div>
              </div>
            </div>
          `;
        })
        .join("")}
    `;
  },

  selectSessionExercise(exerciseId) {
    this.state.sessionExerciseId = exerciseId || null;
    const s = this.state.activeSession;
    if (s) this.renderSessionMainArea(s);
  },

  renderSessionMainArea(s) {
    const area = document.getElementById("session-exercise-render-area");
    if (!area) return;
    const pid = this.state.selectedPatient?.id || 1;
    const exId = this.state.sessionExerciseId;
    if (!exId) {
      area.innerHTML = `
        <div class="panel-card">
          <div class="panel-card-body" style="padding:1.2rem;color:var(--text-muted);">
            Sélectionnez un exercice à gauche pour l’afficher ici.
          </div>
        </div>`;
      return;
    }
    const ex = getExerciseById(exId);
    if (!ex) {
      area.innerHTML = `<div class="panel-card"><div class="panel-card-body">Exercice introuvable.</div></div>`;
      return;
    }
    ExerciseRenderer.render(ex, pid, area);
  },

  renderSessionScales(s) {
    const area = document.getElementById("session-scales-area");
    if (!area) return;
    const keys = Object.keys(SCALES || {});
    if (!keys.length) {
      area.innerHTML = `<div style="font-size:0.75rem;color:var(--text-muted);text-align:center;">Aucune échelle.</div>`;
      return;
    }
    area.innerHTML = keys
      .map((k) => {
        const abbr = SCALES[k]?.abbr || k;
        const score = this.state.selectedPatient?.sessionScores?.[s.no]?.[k];
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);">
            <span style="font-size:0.82rem;font-weight:600;">${abbr}</span>
            <span style="font-size:0.75rem;color:var(--text-muted);">${score !== undefined ? score : "—"}</span>
          </div>
        `;
      })
      .join("");
  },

  saveNotes() {
    const p = this.state.selectedPatient;
    const s = this.state.activeSession;
    if (!p || !s) return;
    const text = document.getElementById("clinical-notes")?.value || "";
    if (!p.notes) p.notes = {};
    p.notes[`session_${s.no}`] = text;
    LocalAPI.savePatientProgress(p);
    this.showToast("Notes cliniques sauvegardées.", "success");
  },

  async completeCurrentSession() {
    const p = this.state.selectedPatient;
    const s = this.state.activeSession;
    if (!p || !s) return;
    this.saveNotes();
    await LocalAPI.completeSession(p.id, s.no, p.notes?.[`session_${s.no}`] || "");
    this.showToast(`Séance ${s.no} clôturée.`, "success");
    this.showPanel("dossier");
  },

  // Used by ExerciseStorage.getStatus validation hook
  _validateExerciseData(ex, data, patientId) {
    if (!ex) return false;
    if (["info", "model"].includes(ex.type)) return true;
    if (ex.type === "daily_log") {
      // Completed if at least one entry exists for this exercise in this session
      const count = ExerciseStorage.getEntryCount(patientId, ex.id);
      return count > 0;
    }
    // structured_form etc
    if (data && typeof data === "object") {
      return Object.keys(data).some((k) => k !== "_ts" && String(data[k] || "").trim() !== "");
    }
    return false;
  },

  showToast(message, type = "info") {
    let stack = document.getElementById("toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.id = "toast-stack";
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    const id = "toast-" + Date.now();
    const icons = { success: "fa-check-circle", warning: "fa-triangle-exclamation", danger: "fa-circle-xmark", info: "fa-circle-info" };
    const colors = { success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)", info: "var(--primary)" };
    const toast = document.createElement("div");
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
  },
};

window.app = app;
window.onload = () => app.init();

