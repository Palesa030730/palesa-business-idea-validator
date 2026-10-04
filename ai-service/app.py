from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Palesa's Business Idea AI Service")


class IdeaRequest(BaseModel):
    idea: str


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Palesa's Business Idea AI Service"
    }


@app.post("/analyze")
def analyze_idea(request: IdeaRequest):
    idea = request.idea.strip()

    if not idea:
        return {
            "status": "error",
            "message": "Business idea cannot be empty"
        }

    # Initial AI-service scoring logic.
    # We can replace this with a real AI model later.
    score = 75

    if score >= 70:
        verdict = "Promising"
    elif score >= 50:
        verdict = "Needs Improvement"
    else:
        verdict = "High Risk"

    return {
        "status": "success",
        "idea": idea,
        "score": score,
        "verdict": verdict,
        "message": "The business idea shows potential."
    }