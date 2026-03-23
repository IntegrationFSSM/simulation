from django.urls import path
from . import views

urlpatterns = [
    path('', views.trouble_selection, name='trouble_selection'),
    path('session/<str:trouble_id>/', views.session_app, name='session_app'),
    path('psychoeducation/', views.psychoeducation, name='psychoeducation'),
    path('api/assessments/submit/', views.submit_assessment, name='submit_assessment'),
    path('api/protocols/<str:trouble_id>/', views.get_protocol, name='get_protocol'),
    path('api/sessions/complete/', views.complete_session, name='complete_session'),
    path('api/patients/<int:patient_id>/progress/', views.get_patient_progress, name='get_patient_progress'),

    # Therapeutic modules
    path('exercises/tag-models/', views.tag_models, name='tag_models'),
    path('exercises/worry-log/', views.worry_log, name='worry_log'),
    path('exercises/devils-advocate/', views.devils_advocate, name='devils_advocate'),
    path('exercises/relapse-prevention/', views.relapse_prevention, name='relapse_prevention'),
]

