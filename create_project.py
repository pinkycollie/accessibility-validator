#!/usr/bin/env python3
"""
Script to quickly scaffold a new project in the hybrid backend
"""
import sys
import os
from pathlib import Path

def create_project(project_name: str, project_type: str = "rest_api"):
    """Create a new project with boilerplate code"""
    
    # Convert project name to module name (lowercase, underscores)
    module_name = project_name.lower().replace("-", "_").replace(" ", "_")
    # Use consistent naming for API prefix (hyphens)
    api_name = module_name.replace("_", "-")
    prefix = f"/api/{api_name}"
    
    # Create project file
    project_file = f"""\"\"\"
{project_name} project
\"\"\"
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

router = APIRouter(
    prefix="{prefix}",
    tags=["{project_name}"]
)


class Item(BaseModel):
    id: str
    name: str
    description: Optional[str] = None


@router.get("/")
def get_project_info():
    \"\"\"Get project information\"\"\"
    return {{
        "name": "{project_name}",
        "description": "Custom project",
        "endpoints": [
            "/",
            "/items",
            "/items/{{item_id}}"
        ]
    }}


@router.get("/items", response_model=List[Item])
async def get_items():
    \"\"\"Get all items\"\"\"
    return [
        Item(id="1", name="Example Item", description="This is an example")
    ]


@router.get("/items/{{item_id}}", response_model=Item)
async def get_item(item_id: str):
    \"\"\"Get single item\"\"\"
    # Add your logic here
    if item_id == "1":
        return Item(id="1", name="Example Item", description="This is an example")
    raise HTTPException(status_code=404, detail="Item not found")


@router.post("/items", response_model=Item)
async def create_item(item: Item):
    \"\"\"Create new item\"\"\"
    # Add your logic here
    return item
"""
    
    # Write project file
    project_path = Path(__file__).parent / "api" / "projects" / f"{module_name}.py"
    with open(project_path, "w") as f:
        f.write(project_file)
    
    print(f"✓ Created project file: {project_path}")
    
    # Instructions for next steps
    print(f"\n📝 Next steps:")
    print(f"\n1. Add configuration to api/core/config.py:")
    print(f'''
    "{module_name}": ProjectConfig(
        name="{project_name}",
        type=ProjectType.{project_type.upper()},
        prefix="{prefix}",
        integrations=[],
        description="Add description here"
    )
''')
    
    print(f"\n2. Import and include router in api/index.py:")
    print(f'''
from .projects import {module_name}

app.include_router({module_name}.router)
''')
    
    print(f"\n3. Test your project:")
    print(f"   curl http://localhost:8000{prefix}")
    print(f"\n✨ Project '{project_name}' scaffolded successfully!")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python create_project.py <project_name> [project_type]")
        print("\nProject types: rest_api, saas, automation, fastapi")
        print("\nExample:")
        print("  python create_project.py 'My API' rest_api")
        sys.exit(1)
    
    project_name = sys.argv[1]
    project_type = sys.argv[2] if len(sys.argv) > 2 else "rest_api"
    
    create_project(project_name, project_type)
