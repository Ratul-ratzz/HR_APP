from sqlalchemy import Column, String, Integer, Date, Enum, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Employee(Base):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    department = Column(String, nullable=False)

class Attendance(Base):
    __tablename__ = 'attendance'
    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(String, ForeignKey('employees.employee_id'), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(Enum('Present', 'Absent', name='attendance_status'), nullable=False)
