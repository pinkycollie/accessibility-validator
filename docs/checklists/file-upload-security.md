# File Upload Security Checklist

Use this checklist when reviewing PRs that add or modify file upload/ingestion paths.

- [ ] **1. Auth gate** — Endpoint requires authentication before file is read
- [ ] **2. FileGuard invoked** — `validate_upload()` called on raw bytes before storage/routing
- [ ] **3. No extension trust** — File type determined by content, not extension or `Content-Type`
- [ ] **4. Allowlist scoped** — Only expected MIME types permitted; allowlist is explicit
- [ ] **5. Rejection logged** — Blocked uploads log: detected type, expected types, user, timestamp

## Quick Reference

| ✅ Pass | ❌ Fail |
|--------|--------|
| `validate_upload(blob)` before `s3.put()` | `s3.put()` with no validation |
| Allowlist: `{"image/png", "image/jpeg"}` | Allowlist: `{"*/*"}` or missing |
| Logs include `detected_type`, `user_id` | Silent rejection or no logging |
