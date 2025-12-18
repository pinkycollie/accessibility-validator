# Project Setup Guide

This guide will help you set up and customize the hybrid multi-project backend for your needs.

## Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/pinkycollie/backend.git
cd backend

# Install Node dependencies
npm install

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

Create `.env.local` file in the root:

```bash
# === NEXT.JS ENV VARIABLES ===
NEXT_PUBLIC_API_URL=http://localhost:8000/api/py
NEXT_PUBLIC_APP_NAME=YourAppName

# === FASTAPI CONFIG ===
APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8000

# === INTEGRATIONS (Optional) ===
# Google AI
GOOGLE_AI_API_KEY=your_google_ai_key

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key

# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### 3. Run Development Server

```bash
# Run both Next.js and FastAPI
npm run dev

# Or run separately:
npm run next-dev    # Next.js only (port 3000)
npm run fastapi-dev # FastAPI only (port 8000)
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/py
- API Docs: http://localhost:8000/api/py/docs

## Customizing for Your Use Case

### Scenario 1: Pure REST API Backend

If you're building a REST API without frontend:

1. **Focus on API development**:
   - Modify files in `api/` directory only
   - Add projects in `api/projects/`
   - Configure in `api/core/config.py`

2. **Remove Next.js** (optional):
   - Keep `api/` directory
   - Remove `app/`, `public/` directories
   - Update `package.json` scripts to only run FastAPI

### Scenario 2: SaaS Application

For a full-stack SaaS:

1. **Use both frontend and backend**:
   - Next.js for UI (`app/` directory)
   - FastAPI for API (`api/` directory)

2. **Add authentication**:
   ```python
   # api/services/auth.py
   from fastapi import Depends, HTTPException
   from fastapi.security import HTTPBearer
   
   security = HTTPBearer()
   
   async def get_current_user(token: str = Depends(security)):
       # Implement token validation
       pass
   ```

3. **Add project for SaaS features**:
   ```python
   # api/projects/saas.py
   from fastapi import APIRouter, Depends
   from ..services.auth import get_current_user
   
   router = APIRouter(prefix="/api/saas", tags=["SaaS"])
   
   @router.get("/dashboard")
   async def dashboard(user = Depends(get_current_user)):
       return {"user": user, "data": "..."}
   ```

### Scenario 3: Automation/AI Backend

For automation and AI workflows:

1. **Enable Google AI integration**:
   ```bash
   pip install google-generativeai
   ```

2. **Configure in `.env.local`**:
   ```bash
   GOOGLE_AI_API_KEY=your_key_here
   ```

3. **Use automation project**:
   ```bash
   curl -X POST http://localhost:8000/api/automation/tasks \
     -H "Content-Type: application/json" \
     -d '{
       "type": "ai_generation",
       "name": "Generate content",
       "parameters": {"prompt": "Write a blog post about..."}
     }'
   ```

### Scenario 4: Django Integration

To integrate existing Django apps:

1. **Create Django project wrapper**:
   ```python
   # api/projects/django_app.py
   from fastapi import APIRouter
   from django.core.wsgi import get_wsgi_application
   import os
   
   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
   
   router = APIRouter(prefix="/api/django", tags=["Django"])
   
   @router.get("/django-endpoint")
   def django_endpoint():
       # Call Django views/models
       pass
   ```

2. **Add Django to requirements**:
   ```bash
   echo "django>=4.2.0" >> requirements.txt
   pip install django
   ```

### Scenario 5: Multiple Independent Projects

For managing multiple projects:

1. **Configure projects** in `api/core/config.py`:
   ```python
   default_projects = {
       "project_a": ProjectConfig(
           name="Project A",
           type=ProjectType.REST_API,
           prefix="/api/project-a",
           integrations=[IntegrationType.SUPABASE]
       ),
       "project_b": ProjectConfig(
           name="Project B", 
           type=ProjectType.AUTOMATION,
           prefix="/api/project-b",
           integrations=[IntegrationType.GOOGLE_AI]
       )
   }
   ```

2. **Create project files**:
   - `api/projects/project_a.py`
   - `api/projects/project_b.py`

3. **Import in** `api/index.py`:
   ```python
   from .projects import project_a, project_b
   
   app.include_router(project_a.router)
   app.include_router(project_b.router)
   ```

## Adding Integrations

### Supabase

```bash
pip install supabase
```

Update `api/integrations/supabase.py` to use real client:
```python
from supabase import create_client

class SupabaseClient:
    @property
    def client(self):
        if self._client is None:
            self._client = create_client(self.url, self.key)
        return self._client
```

### PostgreSQL

```bash
pip install psycopg2-binary sqlalchemy
```

Create database service:
```python
# api/services/postgres.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
```

### Redis

```bash
pip install redis
```

Add caching:
```python
# api/services/cache.py
import redis

cache = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379))
)
```

## Deployment Options

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add environment variables** in Vercel dashboard
4. **Deploy** - Vercel auto-detects Next.js and Python API

### Cloud Run (Google Cloud)

```bash
# Build and deploy
gcloud run deploy backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Docker

```bash
# Build
docker build -t backend .

# Run
docker run -p 8000:8000 backend
```

### Traditional Server

```bash
# Install dependencies
pip install -r requirements.txt

# Run with gunicorn
pip install gunicorn
gunicorn api.index:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Testing

### Test API endpoints:

```bash
# Health check
curl http://localhost:8000/api/py/health

# List projects
curl http://localhost:8000/api/py/projects

# Test accessibility validation
curl -X POST http://localhost:8000/api/accessibility/validate \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Test with Python:

```python
import requests

# Test health
response = requests.get("http://localhost:8000/api/py/health")
print(response.json())

# Test validation
response = requests.post(
    "http://localhost:8000/api/accessibility/validate",
    json={"url": "https://example.com", "deaf_first": True}
)
print(response.json())
```

## Troubleshooting

### Port already in use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Import errors
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Module not found
```bash
# Make sure you're in the right directory
cd /path/to/backend

# Check Python path
python -c "import sys; print(sys.path)"
```

## Next Steps

1. **Explore API docs**: http://localhost:8000/api/py/docs
2. **Read architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
3. **Customize projects**: Edit `api/projects/`
4. **Add integrations**: Install packages and configure
5. **Deploy**: Choose deployment platform

## Support

For issues or questions:
- Check [ARCHITECTURE.md](ARCHITECTURE.md)
- Review API docs at `/api/py/docs`
- Open an issue on GitHub
