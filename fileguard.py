# fileguard.py - pylibmagic-based file type validation
import magic
from typing import NamedTuple

class FileTypeResult(NamedTuple):
    allowed: bool
    detected_type: str
    expected_types: list[str]
    reason: str

# Default allowlist for MBTQ ecosystem
DEFAULT_ALLOWLIST = {
    "image/png", "image/jpeg", "image/gif", "image/webp",
    "video/mp4", "video/webm",
    "application/json", "text/plain", "text/vtt",  # transcripts
    "application/pdf",
}

def detect_file_type(blob: bytes) -> str:
    """Detect real MIME type from file content."""
    return magic.from_buffer(blob, mime=True)

def validate_upload(
    blob: bytes,
    allowlist: set[str] | None = None,
    context: str = "upload"
) -> FileTypeResult:
    """Validate file type against policy."""
    allowlist = allowlist or DEFAULT_ALLOWLIST
    detected = detect_file_type(blob)
    allowed = detected in allowlist
    
    return FileTypeResult(
        allowed=allowed,
        detected_type=detected,
        expected_types=list(allowlist),
        reason=f"Type '{detected}' {'permitted' if allowed else 'blocked'} for {context}"
    )
