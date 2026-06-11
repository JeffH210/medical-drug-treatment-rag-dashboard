import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from pathlib import Path

#Load dataset
DATA_PATH = "/app/data/cleaned_drug_dataset.csv"
df = pd.read_csv(DATA_PATH)

#Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

index = faiss.read_index("/app/data/drug_index.faiss")

def embed_text(text):
    return model.encode([text]).astype("float32")

def retrieve(query ,top_k=5):
    #Convert query to vector
    query = query + "medical drug side effects treatment outcome"
    query_vector = embed_text(query)

    #Search Faiss
    distances, indices = index.search(
        np.array(query_vector).astype("float32"),
        top_k
    )

    #Return matching rows
    results = df.iloc[indices[0]]

    return results[[
        "drug_name",
        "condition",
        "dosage_mg",
        "side_effects",
        "improvement_score",
    ]]

if __name__ == "__main__":
    result = retrieve("ibuprofen pain relief side effects")
    print(result)