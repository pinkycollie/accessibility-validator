# Security Policy

## File Upload Security

### Policy

All endpoints, workers, and jobs that accept file uploads or ingest external artifacts **MUST** enforce the following controls:

| Layer | Control | Requirement |
|-------|---------|-------------|
| **DeafAUTH** | Identity & Authorization | **MUST** verify user identity, tenant membership, and permissions before accepting any file |
| **FileGuard** | Content Validation | **MUST** validate file content against an approved allowlist using `pylibmagic` before processing, storing, or routing |

### Scope

This policy applies equally to:

- **External users** authenticated via DeafAUTH (tenants, counselors, vendors, employers)
- **Internal tools and services** (Developer Magician scaffolds, PinkSync workers, FibonRose trust pipelines, PinkFlow test containers)

### Requirements

1. **No file SHALL be accepted** based solely on file extension or `Content-Type` header.

2. **FileGuard MUST be invoked** on the raw file bytes before any of the following:
   - Storage (S3, GCS, local filesystem)
   - Routing (PinkSync queues, webhook dispatch)
   - Attachment to trust records (FibonRose)
   - Processing in test containers (PinkFlow)

3. **Allowlists MUST be tenant-configurable** via `config/multi-tenant.yml` and default to a restrictive set.

4. **Violations MUST be logged** with:
   - Detected MIME type
   - Expected types
   - User/tenant context (from DeafAUTH)
   - Timestamp and request ID

5. **Violations SHOULD trigger** security audit events when configured.

### Reference Implementation

```python
from fileguard import validate_upload

result = validate_upload(blob, context="endpoint-name")
if not result.allowed:
    log_security_event("file_rejected", result, user=current_user)
    raise UploadRejected(result.reason)
```

### Rationale

Developer Magician serves as both internal tooling and an on-ramp for DeafAUTH-authorized external users. Any scaffolded endpoint becomes part of the public attack surface. Malicious files that bypass validation can propagate through PinkSync, attach to FibonRose trust evidence, or execute in PinkFlow containers. FileGuard ensures content validation at the artifact level, complementing DeafAUTH's identity/authorization layer.

## Reporting a Vulnerability

If you discover a security vulnerability in Developer Magician or any MBTQ ecosystem component, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Email security@mbtquniverse.com with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)
3. Allow up to 48 hours for initial response
4. Work with the team on coordinated disclosure

## Security Updates

Security updates are released as needed and announced via:
- GitHub Security Advisories
- MBTQ ecosystem notifications
- Release notes

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| 1.x     | :x:                |

## Security Best Practices

### For Developers

1. **Never trust client input** - Validate all file uploads with FileGuard
2. **Use DeafAUTH** - Authenticate all requests before processing
3. **Scope allowlists tightly** - Only permit necessary file types
4. **Log security events** - Track rejections and violations
5. **Keep dependencies updated** - Run security audits regularly

### For Operators

1. **Enable security scanning** - Use GitHub security workflows
2. **Monitor logs** - Watch for patterns of rejection
3. **Configure tenant allowlists** - Customize per use case
4. **Review audit events** - Investigate security incidents
5. **Update promptly** - Apply security patches quickly

## Related Documentation

- [FileGuard Documentation](docs/fileguard.md) - Complete API reference
- [File Upload Security Checklist](docs/checklists/file-upload-security.md) - PR review guide
- [MBTQ Security Standards](https://mbtquniverse.com/security) - Ecosystem-wide policies
