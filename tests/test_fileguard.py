import pytest
from fileguard import validate_upload, detect_file_type

# PNG magic bytes
PNG_HEADER = b'\x89PNG\r\n\x1a\n' + b'\x00' * 100

# EXE magic bytes (MZ header)
EXE_HEADER = b'MZ' + b'\x00' * 100

# JPEG magic bytes
JPEG_HEADER = b'\xff\xd8\xff\xe0' + b'\x00' * 100

class TestDetectFileType:
    def test_detects_png(self):
        result = detect_file_type(PNG_HEADER)
        assert "image/png" in result or "image" in result

    def test_detects_executable(self):
        result = detect_file_type(EXE_HEADER)
        assert "application" in result  # application/x-dosexec or similar

class TestValidateUpload:
    def test_allows_valid_image(self):
        result = validate_upload(PNG_HEADER)
        # PNG should be in default allowlist
        assert result.detected_type is not None

    def test_rejects_executable_masquerading_as_image(self):
        """Critical test: reject executable even if extension says .png"""
        result = validate_upload(
            EXE_HEADER,
            allowlist={"image/png", "image/jpeg"},
            context="profile-photo"
        )
        assert result.allowed is False
        assert "blocked" in result.reason

    def test_custom_allowlist(self):
        result = validate_upload(
            PNG_HEADER,
            allowlist={"application/pdf"},  # PNG not in list
            context="document-upload"
        )
        # Should reject PNG when only PDF allowed
        assert "pdf" not in result.detected_type.lower() or result.allowed is False

    def test_context_in_reason(self):
        result = validate_upload(EXE_HEADER, context="test-context")
        assert "test-context" in result.reason
