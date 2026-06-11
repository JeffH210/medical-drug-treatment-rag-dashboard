from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import rag_answer
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV at startup
DATA_PATH = "/app/data/cleaned_drug_dataset.csv"
df = pd.read_csv(DATA_PATH)
drug_names = df['drug_name'].dropna().unique().tolist()

class QueryRequest(BaseModel):
    query: str

@app.get("/")
def home():
    return {"status": "ok"}

@app.get("/drug-search")
def drug_search(q: str= ""):
    if not q:
        results = drug_names[:10]
    else:
        results = [
            drug
            for drug in drug_names
            if q.lower() in drug.lower()
        ][:10]
    return {"drugs": results}

@app.post("/ask")
def ask(request: QueryRequest):
    return rag_answer(request.query)