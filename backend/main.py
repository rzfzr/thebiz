from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, Employee, init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ManagerUpdate(BaseModel):
    employee_id: int
    new_manager_id: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@app.put("/update-manager")
def update_manager(update: ManagerUpdate, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == update.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    if update.new_manager_id:
        manager = db.query(Employee).filter(Employee.id == update.new_manager_id).first()
        if not manager:
            raise HTTPException(status_code=404, detail="Manager not found")
    
    employee.manager_id = update.new_manager_id
    db.commit()
    return {"message": "Manager updated successfully"}
