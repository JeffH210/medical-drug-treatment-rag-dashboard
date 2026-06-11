from models import(
    UserQuery,
    AnalysisResult,
    RetrievedRecord
)

def save_query(db, query_text):
    query = UserQuery(
        query=query_text
    )

    db.add(query)
    db.commit()
    db.refresh(query)

    return query

def save_analysis(
        db,
        query_id,
        response
):
    analysis = AnalysisResult(
        query_id=query_id,

        drug_name = response["drug"],
        condition = response["condition"],

        matched_records = response["matched_records"],

        avg_score=float(response["avg_score"]),
        min_score=float(response["min_score"]),
        max_score=float(response["max_score"]),
        std_score=float(response["std_score"]),

        summary=response["summary"],
        insight=response["insight"],
        llm_explanation =response["llm_explanation"]
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis

def save_records(
    db,
    analysis_id,
    records
):

    for record in records:
        row = RetrievedRecord(
            analysis_id=analysis_id,
            dosage_amount=record["dosage"], 
            side_effects=record["sideEffect"],
            improvement_score=float(record["score"])
        )
        
        db.add(row)

    db.commit()