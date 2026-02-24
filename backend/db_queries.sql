-- Employee Table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL
);

-- Attendance Table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL REFERENCES employees(employee_id),
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('Present', 'Absent'))
);

-- Insert Employee
INSERT INTO employees (employee_id, full_name, email, department)
VALUES ('E001', 'John Doe', 'john.doe@example.com', 'HR');

-- Mark Attendance
INSERT INTO attendance (employee_id, date, status)
VALUES ('E001', '2026-02-24', 'Present');

-- View Employees
SELECT * FROM employees;

-- View Attendance for Employee
SELECT * FROM attendance WHERE employee_id = 'E001';

-- Delete Employee
DELETE FROM employees WHERE employee_id = 'E001';
