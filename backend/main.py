from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base, Employee as EmployeeModel, Attendance as AttendanceModel
import os
from dotenv import load_dotenv
from datetime import date

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://hrms_user:JJQEwB2IdkrH4zKcx1uXxzdAo2k704Xe@dpg-d6et7mp5pdvs73f0vs0g-a/hrms_lite_zn6f")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


app = FastAPI()

# Add CORS middleware after app is defined
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hrmsappf.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeOut(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str
    class Config:
        orm_mode = True

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str

class AttendanceOut(BaseModel):
    employee_id: str
    date: date
    status: str
    class Config:
        orm_mode = True

@app.post("/employees", response_model=EmployeeOut)
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    if db.query(EmployeeModel).filter_by(employee_id=employee.employee_id).first():
        raise HTTPException(status_code=400, detail="Duplicate employee ID.")
    if db.query(EmployeeModel).filter_by(email=employee.email).first():
        raise HTTPException(status_code=400, detail="Duplicate email.")
    emp = EmployeeModel(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp

@app.get("/employees", response_model=List[EmployeeOut])
def list_employees(db: Session = Depends(get_db)):
    return db.query(EmployeeModel).all()

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(EmployeeModel).filter_by(employee_id=employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found.")
    db.delete(emp)
    db.commit()
    return {"detail": "Employee deleted."}

@app.post("/attendance", response_model=AttendanceOut)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    emp = db.query(EmployeeModel).filter_by(employee_id=attendance.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found.")
    att = AttendanceModel(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )
    db.add(att)
    db.commit()
    db.refresh(att)
    return att

@app.get("/attendance/{employee_id}", response_model=List[AttendanceOut])
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(AttendanceModel).filter_by(employee_id=employee_id).all()

@app.get("/")
def root():
    return {"message": "HRMS Lite backend is running"}
