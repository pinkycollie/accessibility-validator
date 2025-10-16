# Usage Examples

This document provides practical examples of using the hybrid multi-project backend.

## Table of Contents
- [Basic Usage](#basic-usage)
- [Accessibility Validation](#accessibility-validation)
- [Automation & AI](#automation--ai)
- [Adding Custom Projects](#adding-custom-projects)
- [Integration Examples](#integration-examples)

## Basic Usage

### Check System Status

```bash
# Get backend information
curl http://localhost:8000/api/py

# Health check
curl http://localhost:8000/api/py/health

# List all projects
curl http://localhost:8000/api/py/projects
```

### Python Client

```python
import requests

# Get backend info
response = requests.get("http://localhost:8000/api/py")
print(response.json())

# Output:
# {
#     "name": "Hybrid Multi-Project Backend",
#     "version": "1.0.0",
#     "projects": [...]
# }
```

### JavaScript/TypeScript Client

```typescript
// Fetch backend info
const response = await fetch('http://localhost:8000/api/py');
const data = await response.json();
console.log(data);

// List projects
const projects = await fetch('http://localhost:8000/api/py/projects');
const projectList = await projects.json();
```

## Accessibility Validation

### Validate a Website

```bash
# Validate URL
curl -X POST http://localhost:8000/api/accessibility/validate \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "deaf_first": true
  }'
```

```python
# Python example
import requests

response = requests.post(
    "http://localhost:8000/api/accessibility/validate",
    json={
        "url": "https://example.com",
        "deaf_first": True
    }
)

result = response.json()
print(f"Accessibility Score: {result['score']}")
print(f"Deaf-First Score: {result['deaf_score']}")
print(f"ASL Compatible: {result['asl_compatible']}")
print(f"Recommendations: {result['recommendations']}")
```

### Check ASL Flow

```bash
curl -X POST http://localhost:8000/api/accessibility/asl-flow-check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Get Deaf-First Score

```bash
# Get score for a URL
curl http://localhost:8000/api/accessibility/deaf-score/https://example.com
```

```python
# Python example
url = "https://example.com"
response = requests.get(f"http://localhost:8000/api/accessibility/deaf-score/{url}")
scores = response.json()

print(f"Visual Clarity: {scores['visual_clarity']}")
print(f"ASL Compatibility: {scores['asl_compatibility']}")
print(f"Audio Independence: {scores['audio_independence']}")
```

## Automation & AI

### Create Automation Task

```bash
# Create AI generation task
curl -X POST http://localhost:8000/api/automation/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ai_generation",
    "name": "Generate Blog Post",
    "parameters": {
      "prompt": "Write a blog post about accessibility in web design"
    }
  }'
```

```python
# Python example
import requests
import time

# Create task
response = requests.post(
    "http://localhost:8000/api/automation/tasks",
    json={
        "type": "ai_generation",
        "name": "Generate Content",
        "parameters": {
            "prompt": "Explain hybrid architecture benefits"
        }
    }
)

task = response.json()
task_id = task["task_id"]
print(f"Task created: {task_id}")

# Check task status
time.sleep(2)
status_response = requests.get(
    f"http://localhost:8000/api/automation/tasks/{task_id}"
)
result = status_response.json()
print(f"Status: {result['status']}")
print(f"Result: {result.get('result')}")
```

### Direct AI Generation

```bash
# Generate text with AI
curl -X POST 'http://localhost:8000/api/automation/ai/generate?prompt=What+is+FastAPI' \
  -H "Content-Type: application/json" \
  -d '{}'
```

```python
# Python example
response = requests.post(
    "http://localhost:8000/api/automation/ai/generate",
    params={"prompt": "Explain microservices architecture"},
    json={}
)

result = response.json()
print(result["generated"])
```

### Create Workflow

```bash
curl -X POST http://localhost:8000/api/automation/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Content Generation Workflow",
    "steps": [
      {"action": "generate_text", "params": {"prompt": "..."}},
      {"action": "validate_content", "params": {}},
      {"action": "publish", "params": {}}
    ]
  }'
```

## Adding Custom Projects

### Example: E-Commerce API

```python
# api/projects/ecommerce.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..services.database import db

router = APIRouter(
    prefix="/api/ecommerce",
    tags=["E-Commerce"]
)

class Product(BaseModel):
    id: str
    name: str
    price: float
    description: str

@router.get("/products", response_model=List[Product])
async def get_products():
    """Get all products"""
    products = await db.query("products")
    return products

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get single product"""
    products = await db.query("products", {"id": product_id})
    if not products:
        raise HTTPException(status_code=404, detail="Product not found")
    return products[0]

@router.post("/products", response_model=Product)
async def create_product(product: Product):
    """Create new product"""
    result = await db.insert("products", product.dict())
    return result
```

Then add to `api/core/config.py`:

```python
"ecommerce": ProjectConfig(
    name="E-Commerce API",
    type=ProjectType.REST_API,
    prefix="/api/ecommerce",
    integrations=[IntegrationType.SUPABASE],
    description="E-commerce product management"
)
```

And include in `api/index.py`:

```python
from .projects import ecommerce
app.include_router(ecommerce.router)
```

### Example: Analytics Dashboard

```python
# api/projects/analytics.py
from fastapi import APIRouter
from datetime import datetime, timedelta
from typing import Dict, Any
from ..integrations.supabase import supabase

router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)

@router.get("/dashboard")
async def get_dashboard() -> Dict[str, Any]:
    """Get dashboard metrics"""
    # Query metrics from database
    metrics = await supabase.query("metrics", {
        "date": {"gte": datetime.now() - timedelta(days=30)}
    })
    
    return {
        "total_users": 1000,
        "active_users": 850,
        "revenue": 50000,
        "growth_rate": 15.5,
        "metrics": metrics
    }

@router.get("/reports/{report_type}")
async def get_report(report_type: str, days: int = 30):
    """Generate report"""
    return {
        "report_type": report_type,
        "period_days": days,
        "data": [],
        "generated_at": datetime.now().isoformat()
    }
```

## Integration Examples

### Google AI Integration

```python
# In your project
from ..integrations.google_ai import google_ai

@router.post("/analyze")
async def analyze_text(text: str):
    """Analyze text with AI"""
    analysis = await google_ai.analyze_content(text, task="sentiment")
    return {
        "text": text,
        "analysis": analysis
    }

@router.post("/generate")
async def generate_content(prompt: str, max_length: int = 500):
    """Generate content"""
    result = await google_ai.generate_text(
        prompt, 
        max_length=max_length
    )
    return {"generated": result}
```

### Supabase Integration

```python
# In your project
from ..integrations.supabase import supabase

@router.post("/users")
async def create_user(user_data: dict):
    """Create user in Supabase"""
    result = await supabase.insert("users", user_data)
    return result

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    """Get user from Supabase"""
    users = await supabase.query("users", {"id": user_id})
    if not users:
        raise HTTPException(status_code=404)
    return users[0]

@router.put("/users/{user_id}")
async def update_user(user_id: str, updates: dict):
    """Update user in Supabase"""
    result = await supabase.update("users", user_id, updates)
    return result
```

### Database Service

```python
# Using the unified database service
from ..services.database import db, DatabaseType

# Initialize with Supabase
db_service = DatabaseService(db_type=DatabaseType.SUPABASE)

@router.get("/data")
async def get_data():
    """Query data using unified interface"""
    data = await db_service.query("my_table", {"status": "active"})
    return data

@router.post("/data")
async def create_data(item: dict):
    """Insert data using unified interface"""
    result = await db_service.insert("my_table", item)
    return result
```

## Testing Examples

### Unit Testing

```python
# test_api.py
import pytest
from fastapi.testclient import TestClient
from api.index import app

client = TestClient(app)

def test_root():
    response = client.get("/api/py")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Hybrid Multi-Project Backend"

def test_projects():
    response = client.get("/api/py/projects")
    assert response.status_code == 200
    data = response.json()
    assert "projects" in data
    assert data["total"] > 0

def test_accessibility_validation():
    response = client.post(
        "/api/accessibility/validate",
        json={"url": "https://example.com"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "score" in data
    assert "deaf_score" in data
```

### Integration Testing

```python
# test_integration.py
import pytest
import asyncio
from api.integrations.google_ai import GoogleAIClient
from api.integrations.supabase import SupabaseClient

@pytest.mark.asyncio
async def test_google_ai():
    client = GoogleAIClient()
    result = await client.analyze_content("Test content", "analyze")
    assert result is not None
    assert "analysis" in result

@pytest.mark.asyncio
async def test_supabase():
    client = SupabaseClient()
    result = await client.insert("test_table", {"key": "value"})
    assert result is not None
```

## Advanced Usage

### Custom Middleware

```python
# api/middleware/auth.py
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Check authentication
        token = request.headers.get("Authorization")
        if not token and request.url.path.startswith("/api/protected"):
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        response = await call_next(request)
        return response

# In api/index.py
from .middleware.auth import AuthMiddleware
app.add_middleware(AuthMiddleware)
```

### Background Tasks

```python
from fastapi import BackgroundTasks

def send_notification(email: str, message: str):
    """Send email notification"""
    print(f"Sending to {email}: {message}")

@router.post("/notify")
async def create_notification(
    email: str, 
    message: str, 
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_notification, email, message)
    return {"status": "notification scheduled"}
```

### WebSocket Support

```python
from fastapi import WebSocket

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Echo: {data}")
```

## Next Steps

- Explore [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- Check API docs at http://localhost:8000/api/py/docs
- Build your custom projects!
