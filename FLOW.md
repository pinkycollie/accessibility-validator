# System Flow Diagram

## Request Flow

```
┌─────────────┐
│   Client    │
│ (Browser/   │
│  API Call)  │
└──────┬──────┘
       │
       │ HTTP Request
       ▼
┌─────────────────────────────────────┐
│         FastAPI Application         │
│         (api/index.py)              │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   CORS Middleware            │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Router Dispatcher          │  │
│  │   - Matches route prefix     │  │
│  │   - Selects project router   │  │
│  └──────────────────────────────┘  │
└─────────────┬───────────────────────┘
              │
              ▼
    ┌─────────────────────┐
    │  Project Selected   │
    │  Based on Prefix:   │
    │                     │
    │  /api/py           → Core API
    │  /api/accessibility → Accessibility
    │  /api/automation   → Automation
    │  /api/[custom]     → Custom Project
    └─────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│        Project Router               │
│        (api/projects/xxx.py)        │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Endpoint Handler           │  │
│  │   - Validates request        │  │
│  │   - Processes logic          │  │
│  └──────────────────────────────┘  │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│     Services & Integrations         │
│                                     │
│  ┌───────────┐  ┌────────────┐     │
│  │ Google AI │  │  Supabase  │     │
│  └───────────┘  └────────────┘     │
│                                     │
│  ┌───────────┐  ┌────────────┐     │
│  │ Database  │  │   Custom   │     │
│  │  Service  │  │  Services  │     │
│  └───────────┘  └────────────┘     │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│         Response                    │
│         - JSON data                 │
│         - Status code               │
│         - Headers                   │
└─────────────────────────────────────┘
              │
              ▼
         ┌─────────┐
         │ Client  │
         └─────────┘
```

## Project Lifecycle

```
┌──────────────────────────────────────────────────────────┐
│                    1. CONFIGURATION                      │
│                                                          │
│  api/core/config.py                                      │
│  ┌────────────────────────────────────────────────┐     │
│  │ ProjectConfig(                                 │     │
│  │   name="My Project",                           │     │
│  │   type=ProjectType.REST_API,                   │     │
│  │   prefix="/api/my-project",                    │     │
│  │   integrations=[...],                          │     │
│  │   enabled=True                                 │     │
│  │ )                                              │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    2. PROJECT CODE                       │
│                                                          │
│  api/projects/my_project.py                              │
│  ┌────────────────────────────────────────────────┐     │
│  │ from fastapi import APIRouter                  │     │
│  │                                                │     │
│  │ router = APIRouter(                            │     │
│  │   prefix="/api/my-project",                    │     │
│  │   tags=["My Project"]                          │     │
│  │ )                                              │     │
│  │                                                │     │
│  │ @router.get("/")                               │     │
│  │ def get_data():                                │     │
│  │   return {"data": "..."}                       │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    3. REGISTRATION                       │
│                                                          │
│  api/index.py                                            │
│  ┌────────────────────────────────────────────────┐     │
│  │ from .projects import my_project               │     │
│  │                                                │     │
│  │ app.include_router(my_project.router)          │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    4. DYNAMIC LOADING                    │
│                                                          │
│  api/core/loader.py                                      │
│  ┌────────────────────────────────────────────────┐     │
│  │ ProjectLoader                                  │     │
│  │   - Reads configuration                        │     │
│  │   - Loads enabled projects                     │     │
│  │   - Creates routers                            │     │
│  │   - Handles errors gracefully                  │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    5. AVAILABLE                          │
│                                                          │
│  GET /api/my-project/                                    │
│  ┌────────────────────────────────────────────────┐     │
│  │ Returns: {"data": "..."}                       │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND SYSTEM                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  CORE LAYER                         │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │   Config     │  │    Loader    │                │   │
│  │  │   Manager    │  │              │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌────────────────────────┴────────────────────────────┐   │
│  │              INTEGRATION LAYER                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │   │
│  │  │Google AI │  │ Supabase │  │  Custom          │  │   │
│  │  └──────────┘  └──────────┘  │  Integrations    │  │   │
│  │                               └──────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌────────────────────────┴────────────────────────────┐   │
│  │              SERVICE LAYER                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │   │
│  │  │ Database │  │   Base   │  │  Custom          │  │   │
│  │  │ Service  │  │ Service  │  │  Services        │  │   │
│  │  └──────────┘  └──────────┘  └──────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌────────────────────────┴────────────────────────────┐   │
│  │              PROJECT LAYER                          │   │
│  │  ┌───────────────┐  ┌───────────────┐              │   │
│  │  │     Core      │  │ Accessibility │              │   │
│  │  │      API      │  │   Validator   │              │   │
│  │  └───────────────┘  └───────────────┘              │   │
│  │  ┌───────────────┐  ┌───────────────┐              │   │
│  │  │  Automation   │  │    Custom     │              │   │
│  │  │   Services    │  │   Projects    │              │   │
│  │  └───────────────┘  └───────────────┘              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Example

### Example: Accessibility Validation Request

```
1. Client Request
   POST /api/accessibility/validate
   Body: {"url": "https://example.com"}
        │
        ▼
2. FastAPI Router
   Matches prefix: /api/accessibility
        │
        ▼
3. Accessibility Project
   accessibility.py → validate_accessibility()
        │
        ├─→ 4a. Google AI Integration
        │   google_ai.analyze_content()
        │        │
        │        ▼
        │   Analysis result
        │
        ├─→ 4b. Database Service (optional)
        │   db.insert("validations", {...})
        │
        ▼
5. Response Assembly
   ValidationResult(
     passed=True,
     score=85,
     deaf_score=90,
     recommendations=[...]
   )
        │
        ▼
6. JSON Response
   Status: 200 OK
   Body: {
     "passed": true,
     "score": 85,
     "deaf_score": 90,
     ...
   }
```

## Deployment Flow

```
┌─────────────────┐
│  Source Code    │
│  (Git Repo)     │
└────────┬────────┘
         │
         │ git push
         ▼
┌─────────────────────────────────────┐
│        Deployment Platform          │
│                                     │
│  ┌──────────┐      ┌────────────┐  │
│  │  Vercel  │  OR  │ Cloud Run  │  │
│  └──────────┘      └────────────┘  │
│       OR                            │
│  ┌──────────┐      ┌────────────┐  │
│  │  Docker  │      │   Server   │  │
│  └──────────┘      └────────────┘  │
└─────────────┬───────────────────────┘
              │
              │ Build & Deploy
              ▼
┌─────────────────────────────────────┐
│         Production                  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Next.js Frontend           │  │
│  │   (Port 3000)                │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   FastAPI Backend            │  │
│  │   (Port 8000 or Serverless)  │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
              │
              │ Serves
              ▼
         ┌─────────┐
         │  Users  │
         └─────────┘
```

## Quick Reference

### Add New Project Flow
```
create_project.py → Generate code → Add to config → Include router → Test
```

### Request Handling Flow
```
Client → FastAPI → Router → Project → Services → Response
```

### Integration Usage Flow
```
Project → Integration wrapper → Lazy load → External service → Result
```

---

For more details:
- [OVERVIEW.md](OVERVIEW.md) - System overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
- [EXAMPLES.md](EXAMPLES.md) - Code examples
