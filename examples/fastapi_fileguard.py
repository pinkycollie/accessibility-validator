from fastapi import FastAPI, UploadFile, HTTPException
from fileguard import validate_upload

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile):
    content = await file.read()
    result = validate_upload(content, context="user-upload")
    
    if not result.allowed:
        raise HTTPException(400, detail=result.reason)
    
    return {"status": "accepted", "type": result.detected_type}
