from retriever import retrieve
from llm import generate_medical_answer
from insightCalculation import insightCalculateScore
from formatting import format_dosage
from db import SessionLocal

from repository import (
    save_query,
    save_analysis,
    save_records
)

def build_context(results):
    context = ""

    for _, row in results.iterrows():
        context += f"""
Drug: {row['drug_name']}
Condition: {row['condition']}
Dosage Amount: {row['dosage_mg']}
Side Effects: {row['side_effects']}
Improvement Score: {row['improvement_score']}
---
"""
    return context

def rag_answer(query):
    #Retrieve Simillar Cases
    results = retrieve(query, top_k=3)
    record_count = len(results)

    records = []

    for _, row in results.iterrows():
        records.append({
            "dosage": f"{row['dosage_mg']}mg",
            "sideEffect": row["side_effects"],
            "score": row["improvement_score"]
        })

    #Build Context
    scores = results["improvement_score"].dropna().tolist()

    analysis = insightCalculateScore(scores)

    avg_score = analysis["avg_score"]
    min_score = analysis["min_score"]
    max_score = analysis["max_score"]
    std_score = analysis["std_score"]
    insight = analysis["insight"]


    side_effects = list(set(results["side_effects"].dropna().tolist()))

    dosage_with_unit = [
        format_dosage(d) for d in results["dosage_mg"].dropna().tolist()
    ]

    drug = results["drug_name"].iloc[0]
    condition = results["condition"].iloc[0]

    #Summary example
    summary = (
        f"The drug shows improvement scores ranging from {min_score} to {max_score} "
        f"with an average of {avg_score} and variability (std: {std_score}). "
        f"Observed side effects include {', '.join(side_effects) if side_effects else 'none reported'}."
    )

    #Insight Rule-based logic
    if avg_score >= 8:
        insight ="High treatment effectiveness observed."
    elif avg_score >=6:
        insight ="Moderate treatment effectiveness observed."
    else:
        insight ="Low treatment effectiveness observed."

    context = build_context(results)

    #Create Project
    prompt = f"""
You are a medical assistant of AI.

Use Only the context below to answer.

Content:
{context}

Task:
Write a short clinical-style explanation of the drug results.

Rules:
- Do NOT output JSON
- Do NOT invent values
- Only explain what is present in the data
- Do Not diagnose
- Do Not recommend treatment
- Keep under 120 words
- Write in professional clinical style
"""

    llm_response = generate_medical_answer(prompt)

    # FINAL OUTPUT Structure
    response = {
        "matched_records": record_count,
        "drug": drug,
        "condition": condition,

        "records": records,

        "avg_score": avg_score,
        "min_score": min_score,
        "max_score": max_score,
        "std_score": std_score,

        "summary": summary,
        "insight": insight,

        "llm_explanation": llm_response
    }

    db = SessionLocal()

    try: 

    # Save new Query
        query_row = save_query(
            db,
            query
        )

        analysis_row = save_analysis(
            db,
            query_row.id,
            response
        )

        save_records(
            db,
            analysis_row.id,
            records
        )

    finally: 
        db.close()

    return response

