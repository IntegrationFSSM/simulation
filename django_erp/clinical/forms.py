from django import forms
from .models import WorryLogEntry, DevilsAdvocateWorksheet, RelapsePreventionPlan


class WorryLogForm(forms.ModelForm):
    """Carnet d'auto-enregistrement des inquiétudes — Session 2+"""
    class Meta:
        model = WorryLogEntry
        fields = ['date', 'time_slot', 'worry_description', 'anxiety_level', 'worry_type']
        widgets = {
            'date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control'
            }),
            'time_slot': forms.Select(attrs={
                'class': 'form-select'
            }),
            'worry_description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': "Décrivez l'inquiétude qui vous a traversé l'esprit…"
            }),
            'anxiety_level': forms.Select(attrs={
                'class': 'form-select'
            }),
            'worry_type': forms.Select(attrs={
                'class': 'form-select'
            }),
        }


class DevilsAdvocateForm(forms.ModelForm):
    """Exercice de l'Avocat du Diable — Session 3"""
    class Meta:
        model = DevilsAdvocateWorksheet
        fields = ['belief', 'evidence_for', 'evidence_against',
                  'advantages_of_belief', 'disadvantages_of_belief']
        widgets = {
            'belief': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 2,
                'placeholder': "La croyance que je veux examiner est…"
            }),
            'evidence_for': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': "Quelles sont vos preuves ou arguments pour dire que cette croyance est vraie ?"
            }),
            'evidence_against': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': "Si vous aviez à démontrer que cette croyance n'est pas vraie, quels seraient vos arguments ?"
            }),
            'advantages_of_belief': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': "Quels sont les avantages que cette croyance vous apporte ?"
            }),
            'disadvantages_of_belief': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': "Quels sont les désavantages que cette croyance vous apporte ?"
            }),
        }


class RelapsePreventionForm(forms.ModelForm):
    """Bilan et Prévention de la Rechute — Session 15"""
    class Meta:
        model = RelapsePreventionPlan
        fields = ['warning_signs', 'effective_strategies', 'future_goals']
        widgets = {
            'warning_signs': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': "Quels sont les signes qui pourraient indiquer un retour de l'anxiété excessive ? (ex: insomnie, procrastination, irritabilité…)"
            }),
            'effective_strategies': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': "Quelles stratégies apprises en thérapie vous ont le plus aidé(e) ? (ex: exposition, résolution de problèmes, tolérance à l'incertitude…)"
            }),
            'future_goals': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': "Quels objectifs personnels vous fixez-vous pour continuer à progresser après la fin du traitement ?"
            }),
        }
