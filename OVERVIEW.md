# System Overview

## What is This?

A **hybrid multi-project backend** that solves the "scattered projects" problem. Instead of managing separate FastAPI apps, Django projects, and automation scripts across different repositories, this system provides a unified, modular backend.

## Problem It Solves

**Before:**
```
❌ FastAPI app in /project1
❌ Django app in /project2  
❌ Automation scripts in /project3
❌ Separate deployments
❌ Duplicated code
❌ Hard to maintain
```

**After:**
```
✅ All projects in one backend
✅ Shared integrations
✅ Unified deployment
✅ Modular architecture
✅ Easy to extend
✅ Well documented
```

## Architecture at a Glance

```
backend/
├── api/
│   ├── core/              # Core system
│   │   ├── config.py      # Project configuration
│   │   └── loader.py      # Dynamic loading
│   │
│   ├── integrations/      # Shared integrations
│   │   ├── google_ai.py   # Google AI
│   │   └── supabase.py    # Supabase
│   │
│   ├── projects/          # Your projects
│   │   ├── accessibility.py
│   │   ├── automation.py
│   │   └── [your_project].py
│   │
│   ├── services/          # Shared services
│   │   ├── base.py
│   │   └── database.py
│   │
│   └── index.py           # Main FastAPI app
│
├── app/                   # Next.js frontend (optional)
├── create_project.py      # Project scaffolder
└── [documentation]
```

## How It Works

### 1. Projects Are Modular

Each project is a self-contained module:

```python
# api/projects/my_project.py
from fastapi import APIRouter

router = APIRouter(prefix="/api/my-project")

@router.get("/")
def hello():
    return {"message": "Hello!"}
```

### 2. Configuration Is Simple

Define your project in one place:

```python
# api/core/config.py
"my_project": ProjectConfig(
    name="My Project",
    type=ProjectType.REST_API,
    prefix="/api/my-project",
    integrations=[IntegrationType.GOOGLE_AI]
)
```

### 3. Integrations Are Shared

Use integrations across all projects:

```python
from ..integrations.google_ai import google_ai

result = await google_ai.generate_text("prompt")
```

### 4. Loading Is Dynamic

Projects load automatically based on configuration. No manual wiring needed!

## Current Projects

### 1. Core API (`/api/py`)
- System health checks
- Project management
- Backend information

### 2. Accessibility Validator (`/api/accessibility`)
- Deaf-first website validation
- ASL compatibility checks
- Audio-bypass detection

### 3. Automation Services (`/api/automation`)
- AI-powered task automation
- Workflow management
- Background job processing

## Key Features

| Feature | Description |
|---------|-------------|
| 🔧 **Multi-Project** | Run multiple independent APIs |
| 🔌 **Integrations** | Google AI, Supabase, and more |
| 📦 **Modular** | Clean separation of concerns |
| 🚀 **Fast Setup** | Project scaffolder included |
| 📚 **Well Documented** | Comprehensive guides |
| 🌐 **Flexible Deploy** | Vercel, Cloud Run, Docker |
| 🔒 **Type Safe** | Full Pydantic validation |
| 📖 **Auto Docs** | Built-in Swagger/OpenAPI |

## Quick Commands

```bash
# Install and run
npm install && pip install -r requirements.txt
npm run dev

# Create new project
python3 create_project.py "My API" rest_api

# Test endpoints
curl http://localhost:8000/api/py/projects

# Deploy to Vercel
vercel --prod
```

## API Endpoints Structure

```
GET  /api/py                      → Backend info
GET  /api/py/projects             → List projects
GET  /api/py/health               → Health check

GET  /api/accessibility/          → Project info
POST /api/accessibility/validate  → Validate site

GET  /api/automation/             → Project info
POST /api/automation/tasks        → Create task

[Your custom endpoints here]
```

## Technology Stack

**Backend:**
- FastAPI (Python)
- Pydantic
- Uvicorn

**Frontend (Optional):**
- Next.js 14
- TypeScript
- Tailwind CSS

**Integrations:**
- Google AI (optional)
- Supabase (optional)
- PostgreSQL (optional)
- Redis (optional)

## Use Cases

### 1. REST API Platform
Multiple API projects served from one backend

### 2. SaaS Application
Full-stack with Next.js frontend + FastAPI backend

### 3. Automation Hub
AI-powered workflows and background tasks

### 4. Microservices Gateway
Unified entry point for multiple services

### 5. Gradual Migration
Integrate legacy Django/Flask apps

## Getting Started

### 5-Minute Setup

1. **Clone and install**
```bash
git clone https://github.com/pinkycollie/backend.git
cd backend
npm install
pip install -r requirements.txt
```

2. **Run**
```bash
npm run dev
```

3. **Access**
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/api/py/docs
- Backend: http://localhost:8000/api/py

### Add Your First Project

```bash
# Use the scaffolder
python3 create_project.py "Blog API" rest_api

# Or create manually in api/projects/
```

## Documentation

- **[README.md](README.md)** - Main overview
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Detailed architecture
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Setup for different use cases
- **[EXAMPLES.md](EXAMPLES.md)** - Code examples
- **[OVERVIEW.md](OVERVIEW.md)** - This file

## Benefits Over Alternatives

| Approach | This System |
|----------|-------------|
| ❌ Separate repos | ✅ Unified codebase |
| ❌ Duplicate code | ✅ Shared services |
| ❌ Multiple deploys | ✅ Single deployment |
| ❌ Complex setup | ✅ Simple scaffolder |
| ❌ Hard to maintain | ✅ Modular design |

## Next Steps

1. Read [QUICKSTART.md](QUICKSTART.md)
2. Explore [EXAMPLES.md](EXAMPLES.md)
3. Check API docs at `/api/py/docs`
4. Build your first project!

---

**Built for scalability, designed for flexibility** 🚀
