"""
Project loader and router for dynamic project management
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, Optional
import importlib
from pathlib import Path

from .config import config, ProjectConfig


class ProjectLoader:
    """Dynamically load and manage projects"""
    
    def __init__(self):
        self.routers: Dict[str, APIRouter] = {}
        self._load_projects()
    
    def _load_projects(self):
        """Load all enabled projects"""
        for project_name, project_config in config.projects.items():
            if project_config.enabled:
                try:
                    router = self._load_project_router(project_name, project_config)
                    if router:
                        self.routers[project_name] = router
                except Exception as e:
                    print(f"Warning: Could not load project {project_name}: {e}")
    
    def _load_project_router(self, name: str, project_config: ProjectConfig) -> Optional[APIRouter]:
        """Load router for a specific project"""
        try:
            # Try to import project module
            module_path = f"api.projects.{name}"
            module = importlib.import_module(module_path)
            
            # Get router from module
            if hasattr(module, 'router'):
                return module.router
            elif hasattr(module, 'get_router'):
                return module.get_router()
            
        except ImportError:
            # Project module doesn't exist yet, create basic router
            router = APIRouter(
                prefix=project_config.prefix,
                tags=[project_config.name]
            )
            
            @router.get("/")
            def project_info():
                return {
                    "name": project_config.name,
                    "type": project_config.type,
                    "description": project_config.description,
                    "integrations": project_config.integrations
                }
            
            return router
        
        return None
    
    def get_router(self, project_name: str) -> Optional[APIRouter]:
        """Get router for a specific project"""
        return self.routers.get(project_name)
    
    def get_all_routers(self) -> Dict[str, APIRouter]:
        """Get all loaded routers"""
        return self.routers


# Global project loader instance
project_loader = ProjectLoader()
