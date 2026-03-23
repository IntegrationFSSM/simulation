from django.db import models

class Patient(models.TestCase if False else models.Model): # typing hack
    name = models.CharField(max_length=150)
    age = models.IntegerField()
    sexe = models.CharField(max_length=1, choices=[('M', 'Homme'), ('F', 'Femme')])
    profession = models.CharField(max_length=150, blank=True)
    motif = models.TextField(blank=True)
    diagnoses = models.JSONField(default=list, blank=True)
    antecedents = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class TreatmentSession(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='sessions')
    session_number = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)
    clinical_notes = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    is_intermediate = models.BooleanField(default=False)
    parent_session_number = models.IntegerField(null=True, blank=True,
        help_text="For intermediate sessions: the protocol session whose exercises are inherited.")

    class Meta:
        ordering = ['session_number']

    def __str__(self):
        suffix = " (Intermédiaire)" if self.is_intermediate else ""
        return f"Session {self.session_number}{suffix} - {self.patient.name}"

class PsychometricScore(models.Model):
    TEST_CHOICES = [
        ('EII', "Échelle d'intolérance à l'incertitude"),
        ('PSI_II', "Pourquoi s'inquiéter - Version II"),
        ('QEC', "Questionnaire d'évitement cognitif"),
        ('QIA', "Questionnaire sur l'inquiétude et l'anxiété (Diagnostic TAG)"),
        ('QAP', "Questionnaire d'attitude face aux problèmes"),
        ('QCS_TAG', "Questionnaire sur les comportements sécurisants du TAG")
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='scores')
    session = models.ForeignKey(TreatmentSession, on_delete=models.CASCADE, related_name='scores', null=True, blank=True)
    test_name = models.CharField(max_length=10, choices=TEST_CHOICES)
    
    # Store the raw answers as a JSON dictionary { "item_1": 4, "item_2": 2, ... }
    raw_answers = models.JSONField()
    
    # Store calculated results
    total_score = models.FloatField(null=True, blank=True)
    sub_scores = models.JSONField(default=dict, blank=True)
    
    # Only meaningful for QIA
    meets_gad_criteria = models.BooleanField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.test_name} - {self.patient.name} ({self.created_at.strftime('%Y-%m-%d')})"

class AdvantageDisadvantageWorksheet(models.Model):
    session = models.ForeignKey(TreatmentSession, on_delete=models.CASCADE, related_name='adv_disadv_sheets')
    # Store list of dicts: [{'advantage': '...', 'disadvantage': '...'}]
    data = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class UncertaintyBehaviorWorksheet(models.Model):
    session = models.ForeignKey(TreatmentSession, on_delete=models.CASCADE, related_name='uncertainty_sheets')
    action_description = models.TextField()
    discomfort_felt = models.TextField()
    thoughts_during_action = models.TextField()
    observations_after = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class ImaginalExposureWorksheet(models.Model):
    session = models.ForeignKey(TreatmentSession, on_delete=models.CASCADE, related_name='exposure_sheets')
    scenario_theme = models.CharField(max_length=255)
    time_before = models.TimeField(null=True, blank=True)
    distress_before = models.IntegerField(choices=[(i, i) for i in range(9)]) # 0-8
    time_after = models.TimeField(null=True, blank=True)
    distress_after = models.IntegerField(choices=[(i, i) for i in range(9)]) # 0-8
    max_distress = models.IntegerField(choices=[(i, i) for i in range(9)]) # 0-8
    did_neutralize = models.BooleanField(default=False)
    neutralization_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


# ===================== MODULE 2: Carnet d'auto-enregistrement =====================
class WorryLogEntry(models.Model):
    TIME_SLOT_CHOICES = [
        ('morning', 'Matin'),
        ('afternoon', 'Après-midi'),
        ('evening', 'Soir'),
    ]
    WORRY_TYPE_CHOICES = [
        ('actual', 'Problème réel'),
        ('hypothetical', 'Problème éventuel'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='worry_logs')
    session = models.ForeignKey(TreatmentSession, on_delete=models.CASCADE, related_name='worry_logs', null=True, blank=True)
    date = models.DateField()
    time_slot = models.CharField(max_length=10, choices=TIME_SLOT_CHOICES)
    worry_description = models.TextField(verbose_name="Description de l'inquiétude")
    anxiety_level = models.IntegerField(
        choices=[(i, str(i)) for i in range(9)],
        verbose_name="Niveau d'anxiété (0-8)"
    )
    worry_type = models.CharField(max_length=15, choices=WORRY_TYPE_CHOICES, verbose_name="Type d'inquiétude")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', 'time_slot']
        verbose_name = "Entrée du carnet d'inquiétudes"
        verbose_name_plural = "Entrées du carnet d'inquiétudes"

    def __str__(self):
        return f"{self.patient.name} — {self.date} ({self.get_time_slot_display()})"


# ===================== MODULE 3: Avocat du Diable =====================
class DevilsAdvocateWorksheet(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='devils_advocate_sheets')
    session = models.ForeignKey(TreatmentSession, on_delete=models.CASCADE, related_name='devils_advocate_sheets', null=True, blank=True)
    belief = models.TextField(verbose_name="Croyance ciblée")
    evidence_for = models.TextField(verbose_name="Preuves pour cette croyance")
    evidence_against = models.TextField(verbose_name="Arguments contre cette croyance")
    advantages_of_belief = models.TextField(verbose_name="Avantages de cette croyance")
    disadvantages_of_belief = models.TextField(verbose_name="Désavantages de cette croyance")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Fiche Avocat du Diable"
        verbose_name_plural = "Fiches Avocat du Diable"

    def __str__(self):
        return f"Avocat du Diable — {self.patient.name} ({self.created_at.strftime('%Y-%m-%d')})"


# ===================== MODULE 4: Bilan et Prévention de la Rechute =====================
class RelapsePreventionPlan(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='relapse_plans')
    session = models.ForeignKey(TreatmentSession, on_delete=models.CASCADE, related_name='relapse_plans', null=True, blank=True)
    warning_signs = models.TextField(verbose_name="Signes précurseurs d'une rechute")
    effective_strategies = models.TextField(verbose_name="Stratégies efficaces apprises")
    future_goals = models.TextField(verbose_name="Objectifs futurs")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Plan de prévention de la rechute"
        verbose_name_plural = "Plans de prévention de la rechute"

    def __str__(self):
        return f"Plan Rechute — {self.patient.name} ({self.created_at.strftime('%Y-%m-%d')})"

