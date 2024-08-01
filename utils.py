from typing import List, Dict

# filler function, not used but here if calculation logic should change from sum of categories / total categories to score per record 
def calculate_value_score(alignment, advantages, savings):
    score = 0

    return score

def calculate_scores(implementation_scores: List[int], value_scores: List):
    value_score = 0
    implementation_score = 0
    if len(implementation_scores) > 0:
        implementation_score = sum(implementation_scores) / len(implementation_scores)
    
    if len(value_scores) > 0:
        for score in value_scores:
            score_dict: Dict = score.to_mongo().to_dict()
            
            value_score += score_dict.get("alignment", 0)
            value_score += score_dict.get("savings", 0)
            
            advantages = score_dict.get("advantages", [])
            if isinstance(advantages, list):
                for item in advantages:
                    if isinstance(item, dict):
                        value_score += item.get("value", 0)
        value_score = value_score / len(value_scores)

    return implementation_score, value_score

def calculate_implementation_score(data,algorithms,processes,knowledge,time):
    score = 0
    categories = [data,algorithms,processes,knowledge,time]
    for cat in categories:
        if isinstance(cat, list):
            score += sum(cat)
        else:
            score += cat
    return score

