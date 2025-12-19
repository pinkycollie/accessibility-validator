import pytest
from fileguard import validate_upload, detect_file_type, InvalidFileError, InvalidConfigError

# PNG magic bytes - full PNG header
PNG_HEADER = (
    b'\x89PNG\r\n\x1a\n'  # PNG signature
    b'\x00\x00\x00\rIHDR'  # IHDR chunk
    b'\x00\x00\x00\x10'  # width
    b'\x00\x00\x00\x10'  # height
    b'\x08\x02\x00\x00\x00' + b'\x00' * 100  # bit depth, color type, etc
)

# EXE magic bytes (MZ header)
EXE_HEADER = b'MZ' + b'\x90\x00' + b'\x03' + b'\x00' * 100

# JPEG magic bytes
JPEG_HEADER = b'\xff\xd8\xff\xe0' + b'\x00\x10JFIF' + b'\x00' * 100

class TestDetectFileType:
    def test_detects_png(self):
        result = detect_file_type(PNG_HEADER)
        assert "image/png" in result or "image" in result

    def test_detects_executable(self):
        result = detect_file_type(EXE_HEADER)
        assert "application" in result  # application/x-dosexec or similar

    def test_rejects_empty_file(self):
        """Test that empty files raise InvalidFileError"""
        with pytest.raises(InvalidFileError, match="Cannot detect type of empty file"):
            detect_file_type(b"")

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
        assert result.allowed is False

    def test_context_in_reason(self):
        result = validate_upload(EXE_HEADER, context="test-context")
        assert "test-context" in result.reason

    def test_rejects_empty_file_validation(self):
        """Test that empty files raise InvalidFileError during validation"""
        with pytest.raises(InvalidFileError, match="Cannot validate empty file"):
            validate_upload(b"")

    def test_rejects_empty_allowlist(self):
        """Test that empty allowlist raises InvalidConfigError"""
        with pytest.raises(InvalidConfigError, match="Allowlist cannot be empty"):
            validate_upload(PNG_HEADER, allowlist=set())
