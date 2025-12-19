# FileGuard - Content-Based File Validation

## Overview

FileGuard is a first-class security capability for Developer Magician that provides robust file type validation using pylibmagic. Unlike validation based on file extensions or Content-Type headers (both of which can be easily spoofed), FileGuard examines the actual bytes of uploaded files to determine their true type.

## Why FileGuard Exists

Developer Magician serves dual purposes in the MBTQ ecosystem:
1. **Internal tooling** - Used by PinkSync workers, FibonRose trust pipelines, and PinkFlow test containers
2. **External on-ramp** - Scaffolds endpoints for DeafAUTH-authorized external users (tenants, counselors, vendors, employers)

Any scaffolded endpoint becomes part of the public attack surface. Malicious files that bypass validation can:
- Propagate through PinkSync queues and workers
- Attach to FibonRose trust evidence records
- Execute in PinkFlow test containers
- Compromise internal systems

FileGuard provides **layered security** alongside DeafAUTH:
- **DeafAUTH** validates identity and authorization
- **FileGuard** validates file content at the artifact level

## API Reference

### Core Functions

#### `detect_file_type(blob: bytes) -> str`

Detect the real MIME type from file content using pylibmagic.

**Parameters:**
- `blob` (bytes): The file content to analyze

**Returns:**
- str: The detected MIME type (e.g., "image/png", "application/pdf")

**Raises:**
- `InvalidFileError`: If the file content cannot be analyzed or is empty
- `FileGuardError`: If the magic library is not properly configured

**Example:**
```python
from fileguard import detect_file_type, InvalidFileError

try:
    with open("upload.bin", "rb") as f:
        content = f.read()
    
    mime_type = detect_file_type(content)
    print(f"Detected type: {mime_type}")
except InvalidFileError as e:
    print(f"Cannot analyze file: {e}")
```

#### `validate_upload(blob: bytes, allowlist: set[str] | None = None, context: str = "upload") -> FileTypeResult`

Validate file type against an approved allowlist.

**Parameters:**
- `blob` (bytes): The file content to validate
- `allowlist` (set[str] | None): Set of allowed MIME types. If None, uses DEFAULT_ALLOWLIST
- `context` (str): Description of the upload context for logging (e.g., "profile-photo", "transcript-upload")

**Returns:**
- `FileTypeResult`: Named tuple with validation results

**Raises:**
- `InvalidFileError`: If the file content cannot be analyzed or is empty
- `InvalidConfigError`: If the allowlist is empty (when explicitly provided)
- `FileGuardError`: If the magic library is not properly configured

**FileTypeResult Fields:**
- `allowed` (bool): Whether the file type is permitted
- `detected_type` (str): The MIME type detected by pylibmagic
- `expected_types` (list[str]): List of allowed MIME types
- `reason` (str): Human-readable explanation of the decision

**Example:**
```python
from fileguard import validate_upload, InvalidFileError, InvalidConfigError

try:
    result = validate_upload(
        file_bytes,
        allowlist={"image/png", "image/jpeg"},
        context="avatar-upload"
    )

    if not result.allowed:
        log_security_event("file_rejected", result)
        raise UploadRejected(result.reason)

    # Process the file...
except InvalidFileError as e:
    return {"error": f"Invalid file: {e}"}
except InvalidConfigError as e:
    return {"error": f"Configuration error: {e}"}
```

### Default Allowlist

The `DEFAULT_ALLOWLIST` is optimized for the MBTQ ecosystem:

```python
DEFAULT_ALLOWLIST = {
    # Images
    "image/png",
    "image/jpeg", 
    "image/gif",
    "image/webp",
    
    # Videos
    "video/mp4",
    "video/webm",
    
    # Text & transcripts
    "application/json",
    "text/plain",
    "text/vtt",  # WebVTT captions
    
    # Documents
    "application/pdf",
}
```

## Integration Examples

### FastAPI Integration

```python
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
```

### Django Integration

```python
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from fileguard import validate_upload

@require_POST
def upload_file(request):
    uploaded = request.FILES.get("file")
    if not uploaded:
        return JsonResponse({"error": "No file provided"}, status=400)
    
    content = uploaded.read()
    result = validate_upload(content, context="django-upload")
    
    if not result.allowed:
        return JsonResponse({"error": result.reason}, status=400)
    
    return JsonResponse({"status": "accepted", "type": result.detected_type})
```

### Tenant-Specific Allowlists

```python
from fileguard import validate_upload

# Load from config
TENANT_ALLOWLISTS = {
    "healthcare-tenant": {
        "application/pdf",
        "image/png",
        "image/jpeg"
    },
    "education-tenant": {
        "application/pdf",
        "video/mp4",
        "text/vtt"  # captions
    }
}

def upload_for_tenant(file_bytes, tenant_id):
    allowlist = TENANT_ALLOWLISTS.get(tenant_id)
    result = validate_upload(
        file_bytes,
        allowlist=allowlist,
        context=f"tenant-{tenant_id}-upload"
    )
    
    if not result.allowed:
        log_security_event("tenant_upload_rejected", {
            "tenant_id": tenant_id,
            "detected_type": result.detected_type,
            "expected_types": result.expected_types
        })
        raise ValidationError(result.reason)
    
    return result
```

## Security Logging

Always log FileGuard rejections with context:

```python
import logging

logger = logging.getLogger("security.fileguard")

result = validate_upload(blob, context="endpoint-name")
if not result.allowed:
    logger.warning(
        "File upload rejected",
        extra={
            "detected_type": result.detected_type,
            "expected_types": result.expected_types,
            "context": "endpoint-name",
            "user_id": current_user.id,
            "tenant_id": current_tenant.id,
            "timestamp": datetime.utcnow().isoformat()
        }
    )
    raise UploadRejected(result.reason)
```

## Best Practices

1. **Validate before storage** - Call FileGuard before writing to disk, S3, or databases
2. **Never trust extensions** - File extensions and Content-Type headers can be spoofed
3. **Scope allowlists tightly** - Only permit types needed for the specific use case
4. **Log all rejections** - Security events should include detected type, expected types, and user context
5. **Use contextual naming** - Context strings help with debugging and audit trails
6. **Combine with DeafAUTH** - Always verify identity/authorization before accepting files

## Testing

FileGuard includes comprehensive tests covering:
- Detection of real file types from magic bytes
- Rejection of executables masquerading as images
- Custom allowlist enforcement
- Context preservation in rejection messages

Run tests with:
```bash
pytest tests/test_fileguard.py -v
```

## Dependencies

FileGuard requires:
- `python-magic>=0.4.27` - Python bindings for libmagic
- `libmagic` - The actual file type detection library (system package)

Install on Ubuntu/Debian:
```bash
apt-get install libmagic1
pip install python-magic
```

Install on macOS:
```bash
brew install libmagic
pip install python-magic
```

## See Also

- [SECURITY.md](../SECURITY.md) - File upload security policy
- [File Upload Security Checklist](checklists/file-upload-security.md) - PR review guide
- [FastAPI Example](../examples/fastapi_fileguard.py) - Complete FastAPI integration
- [Django Example](../examples/django_fileguard.py) - Complete Django integration
