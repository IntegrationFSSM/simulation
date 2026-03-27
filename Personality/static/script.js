/**
 * Ory+ Simulator — TPL / DBT Module (Vanilla JS)
 * Handles the 4-level Tree UI branching, Tabs, and Accordion logic without reloads.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================================
       1. View Transition Logic (Level 1 -> Level 2)
       ============================================================== */
    const approachCards = document.querySelectorAll('.approach-card:not(.disabled)');
    const backBtn = document.querySelector('.back-btn');
    
    // Elements to toggle visibility
    const level1View = document.getElementById('level-1-view');
    const level2View = document.getElementById('level-2-view');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');

    // Go to Level 2 (Selected Approach)
    approachCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            if(targetId === 'level-2-view') {
                level1View.style.display = 'none';
                level2View.style.display = 'block';
                breadcrumbCurrent.textContent = 'TPL — Thérapie Comportementale Dialectique';
                
                // Ensure default view (Individuelle) is shown
                resetToDefaultTab();
            }
        });
    });

    // Go Back to Level 1
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            level2View.style.display = 'none';
            level1View.style.display = 'block';
            breadcrumbCurrent.textContent = 'TPL — Choix de l\'approche';
        });
    }

    /* ==============================================================
       2. Modality Tabs Logic (Path A vs Path B)
       ============================================================== */
    const tabBtns = document.querySelectorAll('.modality-tab');
    const pathIndiv = document.getElementById('path-indiv');
    const pathGroup = document.getElementById('path-group');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Switch the visible path content
            const path = this.getAttribute('data-path');
            if (path === 'indiv') {
                pathIndiv.style.display = 'block';
                pathGroup.style.display = 'none';
            } else if (path === 'group') {
                pathIndiv.style.display = 'none';
                pathGroup.style.display = 'block';
            }
        });
    });

    function resetToDefaultTab() {
        tabBtns.forEach(t => t.classList.remove('active'));
        tabBtns[0].classList.add('active'); // First tab is indiv
        pathIndiv.style.display = 'block';
        pathGroup.style.display = 'none';
    }

});

/* ==============================================================
   3. Accordion Toggle Functions (Level 3 & 4)
   ============================================================== */

// Toggles Panel Cards (e.g. Pinned tools: Diary Card, Chain Analysis)
function toggleCard(headerEl) {
    const parent = headerEl.parentElement;
    const bodyEl = parent.querySelector('.panel-card-body');
    
    const isOpen = bodyEl.classList.contains('show');
    if (!isOpen) {
        headerEl.classList.add('open');
        bodyEl.classList.add('show');
    } else {
        headerEl.classList.remove('open');
        bodyEl.classList.remove('show');
    }
}

// Toggles Phases (Individual Path)
function togglePhase(headerEl) {
    const parent = headerEl.parentElement;
    const bodyEl = parent.querySelector('.phase-body');
    
    const isOpen = bodyEl.classList.contains('show');
    
    // Optional: Close other phases if you only want 1 open at a time
    // document.querySelectorAll('.phase-body').forEach(b => {
    //     b.classList.remove('show');
    //     b.parentElement.querySelector('.phase-header').classList.remove('open');
    // });

    if (!isOpen) {
        headerEl.classList.add('open');
        bodyEl.classList.add('show');
    } else {
        headerEl.classList.remove('open');
        bodyEl.classList.remove('show');
    }
}

// Toggles Main Modules (Group Path)
function toggleModule(headerEl) {
    const parent = headerEl.parentElement;
    const bodyEl = parent.querySelector('.module-body');
    
    const isOpen = bodyEl.classList.contains('show');
    
    if (!isOpen) {
        headerEl.classList.add('open');
        bodyEl.classList.add('show');
    } else {
        headerEl.classList.remove('open');
        bodyEl.classList.remove('show');
    }
}

// Toggles Specific Sessions (inside Modules)
function toggleSession(headerEl) {
    const parent = headerEl.parentElement;
    const bodyEl = parent.querySelector('.session-body');
    
    const isOpen = bodyEl.classList.contains('show');
    
    if (!isOpen) {
        headerEl.classList.add('open');
        bodyEl.classList.add('show');
    } else {
        headerEl.classList.remove('open');
        bodyEl.classList.remove('show');
    }
}

/* ==============================================================
   4. Component-specific Micro-Interactions
   ============================================================== */
// Note: Range inputs updating their labels (slider-val) are handled inline via strictly vanilla `oninput="this.nextElementSibling.textContent=this.value"`
// The Crisis Skill buttons' toggle selection classes is handled via inline `onclick` directly in HTML.
