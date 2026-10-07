import os
import sys
from pathlib import Path
import pytest
from fastapi.testclient import TestClient

TESTS_DIR = Path(__file__).resolve().parent
DAY_DIR = TESTS_DIR.parent

if os.environ.get("WINTER_ARC_TEST_SOLUTION") == "1":
    sys.path.insert(0, str(DAY_DIR / "solution"))
    from solution import app, tasks_db
else:
    sys.path.insert(0, str(DAY_DIR / "exercises"))
    from exercise import app, tasks_db

@pytest.fixture(autouse=True)
def clean_db():
    if hasattr(tasks_db, "clear"):
        tasks_db.clear()

def test_health():
    client = TestClient(app)
    res = client.get("/health")
    assert res.status_code == 200

def test_auth_rejection():
    client = TestClient(app)
    res = client.get("/api/tasks")
    assert res.status_code in (401, 403)

def test_task_flow():
    client = TestClient(app)
    headers = {"Authorization": "Bearer winter-arc-secret"}
    create_res = client.post("/api/tasks", json={"title": "Master Backend", "priority": 5}, headers=headers)
    assert create_res.status_code == 201
    assert create_res.json()["title"] == "Master Backend"

    list_res = client.get("/api/tasks", headers=headers)
    assert list_res.status_code == 200
    assert len(list_res.json()) == 1
