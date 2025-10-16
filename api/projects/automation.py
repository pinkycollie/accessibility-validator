"""
Automation services project
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from enum import Enum

from ..integrations.google_ai import google_ai
from ..integrations.supabase import supabase


router = APIRouter(
    prefix="/api/automation",
    tags=["Automation Services"]
)


class TaskType(str, Enum):
    WORKFLOW = "workflow"
    AI_GENERATION = "ai_generation"
    DATA_PROCESSING = "data_processing"
    SCHEDULED = "scheduled"


class TaskRequest(BaseModel):
    type: TaskType
    name: str
    parameters: Dict[str, Any] = {}
    schedule: Optional[str] = None


class TaskResponse(BaseModel):
    task_id: str
    status: str
    type: TaskType
    result: Optional[Dict[str, Any]] = None


@router.get("/")
def get_project_info():
    """Get automation project information"""
    return {
        "name": "Automation Services",
        "description": "Automated workflows and AI services",
        "integrations": ["google_ai", "supabase"],
        "endpoints": [
            "/tasks",
            "/tasks/{task_id}",
            "/workflows",
            "/ai/generate"
        ]
    }


@router.post("/tasks", response_model=TaskResponse)
async def create_task(task: TaskRequest, background_tasks: BackgroundTasks):
    """Create and execute an automation task"""
    
    task_id = f"task_{hash(task.name) % 10000}"
    
    # Store task in Supabase
    await supabase.insert("automation_tasks", {
        "task_id": task_id,
        "type": task.type,
        "name": task.name,
        "parameters": task.parameters,
        "status": "running"
    })
    
    # Execute task in background
    async def execute_task():
        if task.type == TaskType.AI_GENERATION:
            result = await google_ai.generate_text(
                task.parameters.get("prompt", ""),
                **task.parameters
            )
            await supabase.update("automation_tasks", task_id, {
                "status": "completed",
                "result": {"generated_text": result}
            })
    
    background_tasks.add_task(execute_task)
    
    return TaskResponse(
        task_id=task_id,
        status="running",
        type=task.type
    )


@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str):
    """Get task status and results"""
    
    # Query Supabase for task
    tasks = await supabase.query("automation_tasks", {"task_id": task_id})
    
    if not tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = tasks[0] if isinstance(tasks, list) else tasks
    
    return TaskResponse(
        task_id=task_id,
        status=task_data.get("status", "unknown"),
        type=task_data.get("type", TaskType.WORKFLOW),
        result=task_data.get("result")
    )


@router.post("/workflows")
async def create_workflow(workflow: Dict[str, Any]):
    """Create a new automation workflow"""
    workflow_id = f"workflow_{hash(str(workflow)) % 10000}"
    
    await supabase.insert("workflows", {
        "workflow_id": workflow_id,
        "definition": workflow,
        "status": "active"
    })
    
    return {
        "workflow_id": workflow_id,
        "status": "created",
        "workflow": workflow
    }


@router.post("/ai/generate")
async def generate_with_ai(prompt: str, options: Dict[str, Any] = {}):
    """Generate content using AI"""
    result = await google_ai.generate_text(prompt, **options)
    
    return {
        "prompt": prompt,
        "generated": result,
        "options": options
    }
