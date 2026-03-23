from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import (
    Patient, TreatmentSession, PsychometricScore,
    WorryLogEntry, DevilsAdvocateWorksheet, RelapsePreventionPlan
)
from .services import ScoringService
from .protocols import PROTOCOLS
from .forms import WorryLogForm, DevilsAdvocateForm, RelapsePreventionForm
from django.utils import timezone


def trouble_selection(request):
    troubles = [
        {'id': trouble_id, 'name': protocol_data['trouble_name']}
        for trouble_id, protocol_data in PROTOCOLS.items()
    ]
    return render(request, 'clinical/select_trouble.html', {'troubles': troubles})


def session_app(request, trouble_id):
    if trouble_id not in PROTOCOLS:
        return render(request, 'clinical/select_trouble.html', {'error': 'Protocole introuvable'})
    troubles = [
        {'id': tid, 'name': protocol_data['trouble_name']}
        for tid, protocol_data in PROTOCOLS.items()
    ]
    context = {'trouble_id': trouble_id, 'troubles': troubles}
    return render(request, 'clinical/index.html', context)


def psychoeducation(request):
    return render(request, 'clinical/psycho_education.html')


def get_protocol(request, trouble_id):
    protocol = PROTOCOLS.get(trouble_id)
    if not protocol:
        return JsonResponse({'error': 'Protocol not found'}, status=404)
    return JsonResponse(protocol)


def list_patients(request):
    """GET — Return all patients for the dashboard."""
    patients = Patient.objects.all().order_by('-created_at')
    data = []
    for p in patients:
        # Count completed sessions
        completed = list(
            TreatmentSession.objects.filter(patient=p, completed=True)
            .values_list('session_number', flat=True)
        )
        completed_ints = [int(s) for s in completed if s == int(s)]
        current_session = max(completed_ints) + 1 if completed_ints else 1

        data.append({
            'id': p.id,
            'name': p.name,
            'age': p.age,
            'sexe': p.sexe,
            'profession': p.profession,
            'motif': p.motif,
            'diagnoses': p.diagnoses or [],
            'antecedents': p.antecedents,
            'totalSessions': 15,
            'currentSession': current_session,
            'completedSessions': sorted(completed),
            'sessionScores': {},
            'notes': {},
            'score_initial': {},
        })
    return JsonResponse({'patients': data})


# ===================== SESSION PERSISTENCE API =====================
@csrf_exempt
def complete_session(request):
    """POST — Mark a session as completed for a patient."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            patient = Patient.objects.get(id=data['patient_id'])
            session_no = float(data['session_number'])
            notes = data.get('notes', '')

            session, created = TreatmentSession.objects.get_or_create(
                patient=patient,
                session_number=session_no,
                defaults={'clinical_notes': notes, 'completed': True}
            )
            if not created:
                session.completed = True
                session.clinical_notes = notes
                session.save()

            return JsonResponse({
                'success': True,
                'session_number': session_no,
                'completed': True
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'POST required'}, status=405)


def get_patient_progress(request, patient_id):
    """GET — Return all completed sessions, intermediate sessions, and scores."""
    try:
        patient = Patient.objects.get(id=patient_id)

        # All sessions (regular + intermediate)
        all_sessions = list(
            TreatmentSession.objects.filter(patient=patient)
            .values('session_number', 'completed', 'is_intermediate', 'parent_session_number', 'clinical_notes')
            .order_by('session_number')
        )

        completed = [s['session_number'] for s in all_sessions if s['completed']]
        intermediates = [
            {
                'session_number': s['session_number'],
                'parent_session': s['parent_session_number'],
                'completed': s['completed'],
            }
            for s in all_sessions if s['is_intermediate']
        ]

        # Determine current session: next integer session not yet completed
        completed_ints = [int(s) for s in completed if s == int(s)]
        current_session = max(completed_ints) + 1 if completed_ints else 1

        # Load session scores
        session_scores = {}
        for score in PsychometricScore.objects.filter(patient=patient):
            s_no = score.session.session_number if score.session else 1
            if s_no not in session_scores:
                session_scores[s_no] = {}
            session_scores[s_no][score.test_name] = score.total_score

        # Load clinical notes
        notes = {}
        for session in TreatmentSession.objects.filter(patient=patient):
            if session.clinical_notes:
                notes[f'session_{session.session_number}'] = session.clinical_notes

        return JsonResponse({
            'patient_id': patient.id,
            'completed_sessions': sorted(completed),
            'current_session': current_session,
            'intermediate_sessions': intermediates,
            'session_scores': session_scores,
            'notes': notes,
        })
    except Patient.DoesNotExist:
        return JsonResponse({'error': 'Patient not found'}, status=404)


@csrf_exempt
def add_intermediate_session(request):
    """POST — Insert an intermediate session after a completed session."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            patient = Patient.objects.get(id=data['patient_id'])
            after_session = int(data['after_session'])  # e.g. 2

            # Calculate next available sub-number: 2.1, 2.2, 2.3...
            existing = TreatmentSession.objects.filter(
                patient=patient,
                is_intermediate=True,
                parent_session_number=after_session
            ).order_by('-session_number')

            if existing.exists():
                last_sub = existing.first().session_number
                # e.g. last was 2.2 → next is 2.3
                next_sub = round(last_sub + 0.1, 1)
            else:
                next_sub = after_session + 0.1  # e.g. 2.1

            session = TreatmentSession.objects.create(
                patient=patient,
                session_number=next_sub,
                is_intermediate=True,
                parent_session_number=after_session,
                completed=False,
            )

            return JsonResponse({
                'success': True,
                'session_number': session.session_number,
                'parent_session': after_session,
                'is_intermediate': True,
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'POST required'}, status=405)


# ===================== MODULE 1: Modèles du TAG (Psychoeducation) =====================
def tag_models(request):
    """Session 1 — Interactive psychoeducation visuals for the TAG cognitive model."""
    return render(request, 'clinical/tag_models.html')


# ===================== MODULE 2: Carnet d'auto-enregistrement =====================
def worry_log(request):
    """Session 2+ — Daily worry tracking log."""
    # For now we use patient_id=1 as demo; later this comes from auth
    patient = Patient.objects.first()
    entries = WorryLogEntry.objects.filter(patient=patient)[:20] if patient else []

    if request.method == 'POST' and patient:
        form = WorryLogForm(request.POST)
        if form.is_valid():
            entry = form.save(commit=False)
            entry.patient = patient
            entry.save()
            return redirect('worry_log')
    else:
        form = WorryLogForm()

    return render(request, 'clinical/worry_log.html', {
        'form': form,
        'entries': entries,
        'patient': patient,
    })


# ===================== MODULE 3: Avocat du Diable =====================
def devils_advocate(request):
    """Session 3 — Cognitive restructuring worksheet."""
    patient = Patient.objects.first()
    sheets = DevilsAdvocateWorksheet.objects.filter(patient=patient).order_by('-created_at')[:10] if patient else []

    if request.method == 'POST' and patient:
        form = DevilsAdvocateForm(request.POST)
        if form.is_valid():
            sheet = form.save(commit=False)
            sheet.patient = patient
            sheet.save()
            return redirect('devils_advocate')
    else:
        form = DevilsAdvocateForm()

    return render(request, 'clinical/devils_advocate.html', {
        'form': form,
        'sheets': sheets,
        'patient': patient,
    })


# ===================== MODULE 4: Bilan et Prévention de la Rechute =====================
def relapse_prevention(request):
    """Session 15 — Termination and relapse prevention plan."""
    patient = Patient.objects.first()
    existing_plan = RelapsePreventionPlan.objects.filter(patient=patient).order_by('-created_at').first() if patient else None

    if request.method == 'POST' and patient:
        form = RelapsePreventionForm(request.POST)
        if form.is_valid():
            plan = form.save(commit=False)
            plan.patient = patient
            plan.save()
            return redirect('relapse_prevention')
    else:
        form = RelapsePreventionForm()

    return render(request, 'clinical/relapse_prevention.html', {
        'form': form,
        'plan': existing_plan,
        'patient': patient,
    })


# ===================== ASSESSMENT API =====================
@csrf_exempt
def submit_assessment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            patient = Patient.objects.get(id=data['patient_id'])
            session = TreatmentSession.objects.get(id=data['session_id']) if 'session_id' in data else None
            test_name = data['test_name']
            answers = data['answers']

            if test_name == 'EII':
                results = ScoringService.score_eii(answers)
            elif test_name == 'PSI_II':
                results = ScoringService.score_psi_ii(answers)
            elif test_name == 'QEC':
                results = ScoringService.score_qec(answers)
            elif test_name == 'QIA':
                results = ScoringService.score_qia(answers)
            elif test_name == 'QAP':
                results = ScoringService.score_qap(answers)
            elif test_name == 'QCS_TAG':
                results = ScoringService.score_qcs_tag(answers)
            else:
                return JsonResponse({'error': 'Unknown test'}, status=400)

            score = PsychometricScore.objects.create(
                patient=patient,
                session=session,
                test_name=test_name,
                raw_answers=answers,
                total_score=results.get('total_score'),
                sub_scores=results.get('sub_scores'),
                meets_gad_criteria=results.get('meets_gad_criteria')
            )

            return JsonResponse({'success': True, 'score_id': score.id, 'results': results})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'POST required'}, status=405)

