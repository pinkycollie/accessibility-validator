# Hybrid Multi-Project Backend Architecture

This document explains the architecture of the hybrid backend system designed to handle multiple projects dynamically.

## Overview

The backend is built with a modular architecture that allows:
- **Multiple projects** running under different API prefixes
- **Dynamic project loading** based on configuration
- **Shared integrations** (Google AI, Supabase, etc.)
- **Flexible deployment** (Vercel, Cloud Run, Docker, etc.)

## Architecture Components

### 1. Core System (`api/core/`)

#### Configuration (`config.py`)
- **ProjectConfig**: Defines individual project settings
- **BackendConfig**: Manages all projects
- **ProjectType**: Enum for supported project types (REST_API, SaaS, Automation, Django, FastAPI)
- **IntegrationType**: Enum for available integrations (Google AI, Supabase, Vercel, Cloud Run)

#### Project Loader (`loader.py`)
- Dynamically loads project modules
- Creates routers for each enabled project
- Handles missing project modules gracefully

### 2. Projects (`api/projects/`)

Each project is a self-contained module with:
- FastAPI router
- Project-specific endpoints
- Integration with shared services

#### Current Projects:

1. **Accessibility Validator** (`accessibility.py`)
   - Prefix: `/api/accessibility`
   - Validates websites for Deaf-first accessibility
   - Endpoints:
     - `POST /validate` - Validate URL or HTML content
     - `POST /asl-flow-check` - Check ASL navigation compatibility
     - `POST /audio-bypass-scan` - Detect audio-only elements
     - `GET /deaf-score/{url}` - Get Deaf-first score

2. **Automation Services** (`automation.py`)
   - Prefix: `/api/automation`
   - AI-powered automation and workflows
   - Endpoints:
     - `POST /tasks` - Create automation task
     - `GET /tasks/{task_id}` - Get task status
     - `POST /workflows` - Create workflow
     - `POST /ai/generate` - Generate with AI

### 3. Integrations (`api/integrations/`)

Reusable integration modules:

#### Google AI (`google_ai.py`)
- Text generation
- Content analysis
- Lazy loading for optional dependency

#### Supabase (`supabase.py`)
- Database queries
- CRUD operations
- Lazy loading for optional dependency

### 4. Services (`api/services/`)

Shared business logic:

#### Base Service (`base.py`)
- Abstract base class for all services
- Common interface

#### Database Service (`database.py`)
- Unified database interface
- Supports multiple backends (Supabase, PostgreSQL, MongoDB, SQLite)
- Abstraction layer for data operations

## Project Configuration

Projects are configured in `api/core/config.py`:

```python
ProjectConfig(
    name="Project Name",
    type=ProjectType.REST_API,
    prefix="/api/project",
    integrations=[IntegrationType.GOOGLE_AI],
    description="Project description"
)
```

## Adding a New Project

1. Create a new file in `api/projects/`:

```python
# api/projects/my_project.py
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/my-project",
    tags=["My Project"]
)

@router.get("/")
def get_info():
    return {"name": "My Project"}
```

2. Add configuration to `api/core/config.py`:

```python
"my_project": ProjectConfig(
    name="My Project",
    type=ProjectType.REST_API,
    prefix="/api/my-project",
    integrations=[],
    description="My custom project"
)
```

3. Import and include in `api/index.py`:

```python
from .projects import my_project

app.include_router(my_project.router)
```

## API Endpoints

### Core Endpoints

- `GET /api/py` - Backend information and project list
- `GET /api/py/helloFastApi` - Simple test endpoint
- `GET /api/py/projects` - List all projects
- `GET /api/py/health` - Health check
- `GET /api/py/docs` - Interactive API documentation

### Project Endpoints

Each project has its own set of endpoints under its prefix. See project-specific documentation.

## Environment Variables

Create `.env.local` file:

```bash
# Google AI
GOOGLE_AI_API_KEY=your_api_key

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Other integrations
# Add as needed
```

## Deployment

### docker
The backend is configured to run on docker as Python serverless functions.

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt
npm install

# Run dev server
npm run dev
# or
npm run fastapi-dev  # FastAPI only
```

### Docker
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "api.index:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Benefits

1. **Modular**: Each project is self-contained
2. **Scalable**: Add projects without modifying core code
3. **Flexible**: Support multiple technologies (FastAPI, Django, etc.)
4. **Maintainable**: Clear separation of concerns
5. **Extensible**: Easy to add new integrations

## Future Enhancements

- [ ] Dynamic project loading from database
- [ ] Project-specific authentication
- [ ] Rate limiting per project
- [ ] Project analytics
- [ ] Hot-reload project configuration
- [ ] Multi-tenant support
