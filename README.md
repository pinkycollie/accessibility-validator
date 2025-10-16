# Hybrid Multi-Project Backend

**Modular FastAPI + Next.js Backend for Multiple Projects**

A flexible, scalable backend system designed to handle multiple projects under one unified API. Built with FastAPI and Next.js 14, this hybrid architecture supports REST APIs, SaaS applications, automation workflows, and more - all dynamically managed from a single codebase.

## 🎯 What Makes This Hybrid?

This backend is designed to solve the "scattered projects" problem. Instead of managing separate FastAPI apps, Django projects, and automation scripts across different repositories, this system provides:

- **Multi-Project Support**: Run multiple independent APIs under different prefixes
- **Dynamic Loading**: Projects load automatically based on configuration
- **Shared Integrations**: Reusable Google AI, Supabase, and other integrations
- **Flexible Deployment**: Works on Vercel, Cloud Run, Docker, or traditional servers
- **Technology Agnostic**: Support FastAPI, Django, automation scripts, and more

## 🎯 Purpose in MBTQ Ecosystem

- **PinkSync Role**: Acts as the “nervous system” executor for accessibility validation
- **DeafAUTH Integration**: Validates identity flows work for Deaf users
- **Fibonrose Logging**: Reports accessibility scores to trust/reputation system
- **360Magicians Compatible**: AI agents can trigger validation tasks
- **DAO Governed**: Validation standards controlled by mbtquniverse.com governance

## 🚀 Quick Start

### One Command Setup

```bash
git clone https://github.com/pinkycollie/backend.git
cd backend

# Install all dependencies
npm install
pip install -r requirements.txt

# Run development server (Next.js + FastAPI)
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- API Documentation: http://localhost:8000/api/py/docs
- Backend API: http://localhost:8000/api/py

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pinkycollie/backend)

Vercel automatically detects and deploys both Next.js frontend and FastAPI backend.

## 🏗️ Architecture

### Current Projects

The backend includes these pre-configured projects:

1. **Core API** (`/api/py`)
   - Base FastAPI endpoints
   - Health checks and system status
   - Project management

2. **Accessibility Validator** (`/api/accessibility`)
   - Deaf-first website validation
   - ASL navigation compatibility checks
   - Audio-bypass detection
   - Visual accessibility scoring

3. **Automation Services** (`/api/automation`)
   - AI-powered task automation
   - Workflow management
   - Background job processing
   - Google AI integration

### Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

**Backend:**
- FastAPI (Python)
- Pydantic for data validation
- Modular architecture

**Integrations (Optional):**
- Google AI
- Supabase
- PostgreSQL
- Redis
- Cloud Run

## 🔧 API Endpoints

### System Endpoints

- `GET /api/py` - Backend info and project list
- `GET /api/py/projects` - List all enabled projects
- `GET /api/py/health` - Health check
- `GET /api/py/docs` - Interactive API documentation

### Accessibility Validator

- `POST /api/accessibility/validate` - Validate URL or HTML content
- `POST /api/accessibility/asl-flow-check` - Check ASL compatibility
- `POST /api/accessibility/audio-bypass-scan` - Detect audio-only elements
- `GET /api/accessibility/deaf-score/{url}` - Get Deaf-first score

### Automation Services

- `POST /api/automation/tasks` - Create automation task
- `GET /api/automation/tasks/{task_id}` - Get task status
- `POST /api/automation/workflows` - Create workflow
- `POST /api/automation/ai/generate` - AI text generation

## 📊 Project Configuration

Projects are configured in `api/core/config.py`:

```python
ProjectConfig(
    name="Your Project",
    type=ProjectType.REST_API,  # or SAAS, AUTOMATION, etc.
    prefix="/api/your-project",
    integrations=[IntegrationType.GOOGLE_AI, IntegrationType.SUPABASE],
    description="Your project description"
)
```

**Supported Project Types:**
- `REST_API` - Standard REST API
- `SAAS` - SaaS application
- `AUTOMATION` - Automation workflows
- `FASTAPI` - FastAPI-specific features
- `DJANGO` - Django integration (coming soon)

**Available Integrations:**
- `GOOGLE_AI` - Google Generative AI
- `SUPABASE` - Supabase database
- `VERCEL` - Vercel deployment
- `CLOUD_RUN` - Google Cloud Run

## 🔗 Adding a New Project

### 1. Create Project Module

```python
# api/projects/my_project.py
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/my-project",
    tags=["My Project"]
)

@router.get("/")
def get_info():
    return {"name": "My Project", "status": "active"}

@router.post("/action")
async def perform_action(data: dict):
    # Your logic here
    return {"result": "success"}
```

### 2. Add Configuration

```python
# api/core/config.py
"my_project": ProjectConfig(
    name="My Project",
    type=ProjectType.REST_API,
    prefix="/api/my-project",
    integrations=[IntegrationType.GOOGLE_AI],
    description="Custom project description"
)
```

### 3. Include Router

```python
# api/index.py
from .projects import my_project

app.include_router(my_project.router)
```

That's it! Your project is now live at `/api/my-project`

## 🛠️ Environment Variables

Create `.env.local`:

```bash
# Google AI (Optional)
GOOGLE_AI_API_KEY=your_api_key

# Supabase (Optional)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key

# Database (Optional)
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Redis (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379

# Vercel (for deployment)
VERCEL_TOKEN=your_vercel_token
```

## 📈 Use Cases

### 1. Pure REST API
- Focus on `api/` directory
- Multiple API projects under different prefixes
- Shared integrations and services

### 2. Full-Stack SaaS
- Next.js frontend in `app/`
- FastAPI backend in `api/`
- Database integration with Supabase

### 3. Automation Platform
- AI-powered workflows
- Background task processing
- Integration with Google AI

### 4. Microservices
- Multiple independent services
- Shared authentication
- Unified API gateway

### 5. Legacy Integration
- Django app integration
- Gradual migration path
- Shared resources

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy automatically

### Cloud Run

```bash
gcloud run deploy backend \
  --source . \
  --platform managed \
  --region us-central1
```

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "api.index:app", "--host", "0.0.0.0"]
```

```bash
docker build -t backend .
docker run -p 8000:8000 backend
```

### Traditional Server

```bash
pip install gunicorn
gunicorn api.index:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 📚 Documentation

- **[Architecture Guide](ARCHITECTURE.md)** - Detailed system architecture
- **[Setup Guide](SETUP_GUIDE.md)** - Step-by-step setup for different use cases
- **[API Documentation](http://localhost:8000/api/py/docs)** - Interactive API docs (when running)

## 🤝 Contributing

This is a modular system designed for extensibility:

1. **Add Projects**: Create new modules in `api/projects/`
2. **Add Integrations**: Extend `api/integrations/`
3. **Add Services**: Build reusable services in `api/services/`
4. **Configure**: Manage in `api/core/config.py`

## 🎯 Key Features

✅ **Multi-Project Support** - Run multiple APIs from one codebase
✅ **Dynamic Loading** - Projects load based on configuration
✅ **Shared Integrations** - Reuse Google AI, Supabase, etc.
✅ **Modular Architecture** - Clean separation of concerns
✅ **Type Safety** - Full Pydantic validation
✅ **Auto Documentation** - Built-in Swagger/OpenAPI docs
✅ **Flexible Deployment** - Vercel, Cloud Run, Docker, or traditional
✅ **Technology Agnostic** - Support any Python framework

## 📄 License

MIT License - Feel free to use for your projects

## 🔗 Part of MBTQ Ecosystem

- **Main Universe**: [mbtquniverse.com](https://mbtquniverse.com)
- **DeafAUTH**: Identity and authentication for Deaf users
- **Fibonrose**: Trust and reputation system
- **360Magicians**: AI-powered automation agents
- **PinkSync**: Accessibility and automation nervous system

-----

**Built for scalability, designed for flexibility** 🚀