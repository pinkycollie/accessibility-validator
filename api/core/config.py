"""
Core configuration management for multi-project backend
"""
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field
from enum import Enum
import os
from pathlib import Path


class ProjectType(str, Enum):
    """Supported project types"""
    REST_API = "rest_api"
    SAAS = "saas"
    AUTOMATION = "automation"
    DJANGO = "django"
    FASTAPI = "fastapi"


class IntegrationType(str, Enum):
    """Available integrations"""
    GOOGLE_AI = "google_ai"
    SUPABASE = "supabase"
    VERCEL = "vercel"
    CLOUD_RUN = "cloud_run"


class ProjectConfig(BaseModel):
    """Configuration for a single project"""
    name: str
    type: ProjectType
    enabled: bool = True
    prefix: str = Field(..., description="API route prefix, e.g., /api/project1")
    integrations: List[IntegrationType] = []
    env_vars: Dict[str, Any] = {}
    description: Optional[str] = None


class BackendConfig(BaseModel):
    """Main backend configuration"""
    projects: Dict[str, ProjectConfig] = {}
    default_project: Optional[str] = None
    
    @classmethod
    def load_from_env(cls):
        """Load configuration from environment or defaults"""
        # Default projects configuration
        default_projects = {
            "core": ProjectConfig(
                name="Core API",
                type=ProjectType.FASTAPI,
                prefix="/api/py",
                integrations=[],
                description="Core FastAPI endpoints"
            ),
            "accessibility": ProjectConfig(
                name="Accessibility Validator",
                type=ProjectType.REST_API,
                prefix="/api/accessibility",
                integrations=[IntegrationType.GOOGLE_AI],
                description="Deaf-first accessibility validation"
            ),
            "automation": ProjectConfig(
                name="Automation Services",
                type=ProjectType.AUTOMATION,
                prefix="/api/automation",
                integrations=[IntegrationType.GOOGLE_AI, IntegrationType.SUPABASE],
                description="Automated workflows and AI services"
            )
        }
        
        return cls(
            projects=default_projects,
            default_project="core"
        )
    
    def get_project(self, name: str) -> Optional[ProjectConfig]:
        """Get project configuration by name"""
        return self.projects.get(name)
    
    def get_enabled_projects(self) -> List[ProjectConfig]:
        """Get all enabled projects"""
        return [p for p in self.projects.values() if p.enabled]


# Global configuration instance
config = BackendConfig.load_from_env()
