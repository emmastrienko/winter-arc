from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field

app = FastAPI(title="Task Microservice")
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    if credentials.credentials != "winter-arc-secret":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    return credentials.credentials

class TaskCreate(BaseModel):
    title: str = Field(min_length=3, max_length=50)
    priority: int = Field(default=1, ge=1, le=5)

tasks_db = []

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "task-microservice"}

@app.get("/api/tasks")
def list_tasks(token: str = Depends(verify_token)):
    return tasks_db

@app.post("/api/tasks", status_code=201)
def create_task(task: TaskCreate, token: str = Depends(verify_token)):
    item = {"id": len(tasks_db) + 1, "title": task.title, "priority": task.priority}
    tasks_db.append(item)
    return item

@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: int, token: str = Depends(verify_token)):
    for idx, t in enumerate(tasks_db):
        if t["id"] == task_id:
            return tasks_db.pop(idx)
    raise HTTPException(status_code=404, detail="Task not found")
