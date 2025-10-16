from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import config
from .core.loader import project_loader
from .projects import accessibility, automation

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(
    title="Hybrid Multi-Project Backend",
    description="Modular backend supporting multiple projects and integrations",
    version="1.0.0",
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include project routers
app.include_router(accessibility.router)
app.include_router(automation.router)

@app.get("/api/py")
def root():
    """Root endpoint with backend information"""
    return {
        "name": "Hybrid Multi-Project Backend",
        "version": "1.0.0",
        "description": "Modular backend for handling multiple projects",
        "projects": [
            {
                "name": proj.name,
                "type": proj.type,
                "prefix": proj.prefix,
                "enabled": proj.enabled,
                "description": proj.description,
                "integrations": proj.integrations
            }
            for proj in config.get_enabled_projects()
        ]
    }

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.get("/api/py/projects")
def list_projects():
    """List all available projects"""
    return {
        "projects": [
            {
                "name": proj.name,
                "type": proj.type,
                "prefix": proj.prefix,
                "enabled": proj.enabled,
                "description": proj.description,
                "integrations": proj.integrations
            }
            for proj in config.get_enabled_projects()
        ],
        "total": len(config.get_enabled_projects())
    }

@app.get("/api/py/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "projects_loaded": len(config.get_enabled_projects()),
        "integrations": {
            "google_ai": "configured" if config else "not_configured",
            "supabase": "configured" if config else "not_configured"
        }
    }