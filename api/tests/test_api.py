"""
Basic tests for the accessibility validator API
"""
import pytest
from fastapi.testclient import TestClient
from api.index import app

client = TestClient(app)


def test_hello_fast_api():
    """Test the basic FastAPI endpoint"""
    response = client.get("/api/py/helloFastApi")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["message"] == "Hello from FastAPI"


def test_api_docs_available():
    """Test that API documentation is accessible"""
    response = client.get("/api/py/docs")
    assert response.status_code == 200


def test_openapi_schema():
    """Test that OpenAPI schema is available"""
    response = client.get("/api/py/openapi.json")
    assert response.status_code == 200
    data = response.json()
    assert "openapi" in data
    assert "info" in data
