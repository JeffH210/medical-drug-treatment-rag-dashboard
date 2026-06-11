from groq import Groq
from config import GROQ_API_KEY

client = Groq(
    api_key= GROQ_API_KEY
)

def generate_medical_answer(prompt):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role":"system",
                "content": "You are a professional medical AI assistance. Provide safe, factual explanation only."
            },
            {
                "role":"user",
                "content": prompt
            }
        ],
        temperature= 0.3
    )

    return response.choices[0].message.content
