import numpy as np

def insightCalculateScore(scores):
    if not scores:
        return {
        "avg_score": 0,
        "min_score": 0,
        "max_score": 0,
        "std_score": 0,
        "insight": "No sufficient data to evaluate effectiveness."
        
        }
    
    avg_score = round(np.mean(scores), 2)
    min_score = round(np.min(scores), 2)
    max_score = round(np.max(scores), 2)
    std_score = round(np.std(scores), 2)

    if avg_score >=8 and std_score < 1.5:
        insight = "High and consistent treatment effectiveness observed."
    elif avg_score >= 8:
        insight = "Hight effectiveness but results vary between patients."
    elif avg_score >= 6:
        insight = "Moderate treatment effectiveness observed."
    else:
        insight = "Low treatment effectiveness observed."
    
    return {
        "avg_score": avg_score,
        "min_score": min_score,
        "max_score": max_score,
        "std_score": std_score,
        "insight": insight
    }
