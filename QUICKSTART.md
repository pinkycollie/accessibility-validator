# Quick Start Guide

Get your hybrid multi-project backend up and running in 5 minutes!

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pinkycollie/backend.git
cd backend
```

### 2. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Run the Development Server

```bash
# Run both Next.js and FastAPI
npm run dev
```

**That's it!** 🎉

- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/api/py/docs
- Backend: http://localhost:8000/api/py

## Your First API Call

```bash
# Get backend information
curl http://localhost:8000/api/py

# List all projects
curl http://localhost:8000/api/py/projects

# Validate a website for accessibility
curl -X POST http://localhost:8000/api/accessibility/validate \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## Add Your First Project

### Option 1: Use the Script

```bash
python3 create_project.py "My API" rest_api
```

Follow the printed instructions to complete the setup.

### Option 2: Manual Setup

1. **Create project file**: `api/projects/my_project.py`

```python
from fastapi import APIRouter

router = APIRouter(prefix="/api/my-project", tags=["My Project"])

@router.get("/")
def hello():
    return {"message": "Hello from My Project!"}
```

2. **Add configuration**: `api/core/config.py`

```python
"my_project": ProjectConfig(
    name="My Project",
    type=ProjectType.REST_API,
    prefix="/api/my-project",
    integrations=[],
    description="My custom project"
)
```

3. **Include router**: `api/index.py`

```python
from .projects import my_project

app.include_router(my_project.router)
```

4. **Restart server and test**:

```bash
curl http://localhost:8000/api/my-project
```

## Configure Integrations

### Google AI

```bash
# Install package
pip install google-generativeai

# Add to .env.local
echo "GOOGLE_AI_API_KEY=your_api_key_here" >> .env.local
```

### Supabase

```bash
# Install package
pip install supabase

# Add to .env.local
echo "SUPABASE_URL=https://your-project.supabase.co" >> .env.local
echo "SUPABASE_KEY=your_supabase_anon_key" >> .env.local
```

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

Vercel automatically detects Next.js and Python APIs.

## What's Next?

- 📖 Read [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture
- 📚 Check [EXAMPLES.md](EXAMPLES.md) for code examples
- 🔧 Review [SETUP_GUIDE.md](SETUP_GUIDE.md) for advanced setup
- 🚀 Visit http://localhost:8000/api/py/docs for interactive API docs

## Common Commands

```bash
# Run only FastAPI
npm run fastapi-dev

# Run only Next.js
npm run next-dev

# Build for production
npm run build

# Lint code
npm run lint

# Create new project
python3 create_project.py "Project Name" rest_api
```

## Troubleshooting

### Port already in use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use a different port
uvicorn api.index:app --port 8001
```

### Module not found

```bash
# Ensure you're in the right directory
pwd  # Should show .../backend

# Ensure virtual environment is activated
which python  # Should show .../venv/bin/python
```

### Import errors

```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## Need Help?

- Check the [documentation](README.md)
- Review [examples](EXAMPLES.md)
- Open an issue on GitHub

Happy coding! 🚀
