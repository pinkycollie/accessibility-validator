from fastapi import FastAPI, UploadFile, HTTPException
from fileguard import validate_upload, InvalidFileError, InvalidConfigError

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile):
    content = await file.read()
    
    try:
        result = validate_upload(content, context="user-upload")
        
        if not result.allowed:
            raise HTTPException(400, detail=result.reason)
        
        return {"status": "accepted", "type": result.detected_type}
    except InvalidFileError as e:
        raise HTTPException(400, detail=f"Invalid file: {e}")
    except InvalidConfigError as e:
        raise HTTPException(500, detail=f"Configuration error: {e}")
