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


# ===================== SESSION PERSISTENCE API =====================
@csrf_exempt
def complete_session(request):
    """POST — Mark a session as completed for a patient."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            patient = Patient.objects.get(id=data['patient_id'])
            session_no = int(data['session_number'])
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
    """GET — Return all completed sessions and scores for a patient."""
    try:
        patient = Patient.objects.get(id=patient_id)
        completed = list(
            TreatmentSession.objects.filter(patient=patient, completed=True)
            .values_list('session_number', flat=True)
        )
        current_session = max(completed) + 1 if completed else 1

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
            'session_scores': session_scores,
            'notes': notes,
        })
    except Patient.DoesNotExist:
        return JsonResponse({'error': 'Patient not found'}, status=404)


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

