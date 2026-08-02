from fastapi import FastAPI, UploadFile, File
import shutil
import os
from analyzer import analyze_video

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "AI service is running"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        results = analyze_video(temp_path)
    finally:
        os.remove(temp_path)

    return results