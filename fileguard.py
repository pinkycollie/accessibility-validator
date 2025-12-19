# fileguard.py - pylibmagic-based file type validation
import magic
from typing import NamedTuple

class FileTypeResult(NamedTuple):
    allowed: bool
    detected_type: str
    expected_types: list[str]
    reason: str

class FileGuardError(Exception):
    """Base exception for FileGuard errors"""
    pass

class InvalidFileError(FileGuardError):
    """Raised when file content cannot be analyzed"""
    pass

class InvalidConfigError(FileGuardError):
    """Raised when configuration is invalid"""
    pass

# Default allowlist for MBTQ ecosystem
DEFAULT_ALLOWLIST = {
    "image/png", "image/jpeg", "image/gif", "image/webp",
    "video/mp4", "video/webm",
    "application/json", "text/plain", "text/vtt",  # transcripts
    "application/pdf",
}

def detect_file_type(blob: bytes) -> str:
    """Detect real MIME type from file content.
    
    Args:
        blob: The file content to analyze
        
    Returns:
        The detected MIME type
        
    Raises:
        InvalidFileError: If the file content cannot be analyzed
        FileGuardError: If the magic library is not properly configured
    """
    if not blob:
        raise InvalidFileError("Cannot detect type of empty file")
    
    try:
        return magic.from_buffer(blob, mime=True)
    except magic.MagicException as e:
        raise InvalidFileError(f"Failed to detect file type: {e}")
    except Exception as e:
        raise FileGuardError(f"Magic library error: {e}")

def validate_upload(
    blob: bytes,
    allowlist: set[str] | None = None,
    context: str = "upload"
) -> FileTypeResult:
    """Validate file type against policy.
    
    Args:
        blob: The file content to validate
        allowlist: Set of allowed MIME types. If None, uses DEFAULT_ALLOWLIST
        context: Description of the upload context for logging
        
    Returns:
        FileTypeResult with validation results
        
    Raises:
        InvalidFileError: If the file content cannot be analyzed
        InvalidConfigError: If the allowlist configuration is invalid
        FileGuardError: If the magic library is not properly configured
    """
    if not blob:
        raise InvalidFileError("Cannot validate empty file")
    
    if allowlist is None:
        allowlist = DEFAULT_ALLOWLIST
    elif len(allowlist) == 0:
        raise InvalidConfigError("Allowlist cannot be empty")
    
    detected = detect_file_type(blob)
    allowed = detected in allowlist
    
    return FileTypeResult(
        allowed=allowed,
        detected_type=detected,
        expected_types=list(allowlist),
        reason=f"Type '{detected}' {'permitted' if allowed else 'blocked'} for {context}"
    )
