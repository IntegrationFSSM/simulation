class ScoringService:
    @staticmethod
    def score_eii(answers):
        """
        Échelle d'intolérance à l'incertitude (ÉII)
        answers: dict containing string keys '1' to '27', integers 1-5.
        """
        factor_1_items = ['1', '2', '3', '9', '12', '13', '14', '15', '16', '17', '20', '22', '23', '24']
        factor_2_items = ['4', '5', '6', '7', '8', '10', '11', '18', '19', '21', '26', '27']
        
        total = sum(int(answers.get(str(i), 0)) for i in range(1, 28))
        factor_1 = sum(int(answers.get(k, 0)) for k in factor_1_items)
        factor_2 = sum(int(answers.get(k, 0)) for k in factor_2_items)
        
        return {
            'total_score': total,
            'sub_scores': {
                'factor_1': factor_1,
                'factor_2': factor_2
            }
        }

    @staticmethod
    def score_psi_ii(answers):
        """
        Pourquoi s'inquiéter - Version II (PSI-II)
        answers: dict containing string keys '1' to '25', integers 1-5.
        """
        subscales = {
            'problem_solving': ['3', '5', '9', '14', '21'],
            'motivation': ['8', '15', '16', '18', '19'],
            'prevents_negative_emotions': ['2', '4', '13', '22', '23'],
            'prevents_negative_events': ['6', '11', '17', '20', '24'],
            'positive_personality_trait': ['1', '7', '10', '12', '25']
        }
        
        total = sum(int(answers.get(str(i), 0)) for i in range(1, 26))
        results = {'total_score': total, 'sub_scores': {}}
        
        for scale_name, items in subscales.items():
            results['sub_scores'][scale_name] = sum(int(answers.get(k, 0)) for k in items)
            
        return results

    @staticmethod
    def score_qec(answers):
        """
        Questionnaire d'évitement cognitif (QEC)
        answers: dict containing string keys '1' to '25', integers 1-5.
        """
        subscales = {
            'thought_substitution': ['4', '11', '17', '20', '25'],
            'transforming_images': ['3', '15', '19', '23', '24'],
            'distraction': ['8', '10', '12', '13', '21'],
            'avoiding_threats': ['7', '9', '16', '18', '22'],
            'suppression': ['1', '2', '5', '6', '14']
        }
        
        total = sum(int(answers.get(str(i), 0)) for i in range(1, 26))
        results = {'total_score': total, 'sub_scores': {}}
        
        for scale_name, items in subscales.items():
            results['sub_scores'][scale_name] = sum(int(answers.get(k, 0)) for k in items)
            
        return results

    @staticmethod
    def score_qia(answers):
        """
        Questionnaire sur l'inquiétude et l'anxiété (QIA)
        answers format:
        {
            'item_1': ['Financial', 'Health', ...],  # array of strings
            'item_2': 5, # 0-8 scale
            'item_3': 6, # 0-8 scale
            'item_4': 7, # 0-8 scale
            'item_6': 4, # 0-8 scale
            'item_5': {
                'sub_1': 4,
                'sub_2': 1,
                'sub_3': 6,
                'sub_4': 5,
                'sub_5': 2,
                'sub_6': 0
            }
        }
        """
        item_1_themes = answers.get('item_1', [])
        item_2 = int(answers.get('item_2', 0))
        item_3 = int(answers.get('item_3', 0))
        item_4 = int(answers.get('item_4', 0))
        item_6 = int(answers.get('item_6', 0))
        item_5_subs = answers.get('item_5', {})
        
        # Criteria 1: Array length of Item 1 > 0
        crit_1 = len(item_1_themes) > 0
        
        # Criteria 2: Items 2, 3, 4, and 6 all have values >= 4
        crit_2 = all(val >= 4 for val in [item_2, item_3, item_4, item_6])
        
        # Criteria 3: At least 3 out of the 6 sub-items in Item 5 have values >= 4
        symptom_count = sum(1 for val in item_5_subs.values() if int(val) >= 4)
        crit_3 = symptom_count >= 3
        
        meets_gad_criteria = crit_1 and crit_2 and crit_3
        
        return {
            'total_score': None, # QIA is diagnostic, not summative
            'sub_scores': {
                'symptoms_count': symptom_count,
                'worry_themes_count': len(item_1_themes)
            },
            'meets_gad_criteria': meets_gad_criteria
        }

    @staticmethod
    def score_qap(answers):
        """
        Questionnaire d'attitude face aux problèmes (QAP)
        12 items, unifactorial.
        """
        total = sum(int(answers.get(str(i), 0)) for i in range(1, 13))
        return {
            'total_score': total,
            'sub_scores': {}
        }

    @staticmethod
    def score_qcs_tag(answers):
        """
        Questionnaire sur les comportements sécurisants du TAG (QCS-TAG)
        10 items.
        """
        total = sum(int(answers.get(str(i), 0)) for i in range(1, 11))
        return {
            'total_score': total,
            'sub_scores': {}
        }
