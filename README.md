# HR App

This project is a simple Human Resource Management System (HRMS Lite) with a React frontend and a FastAPI backend.

## Project Structure

```
HR App/
├── backend/
│   ├── db_queries.sql
│   ├── main.py
│   ├── models.py
│   ├── README.md
│   └── __pycache__/
├── frontend/
│   ├── package.json
│   ├── README.md
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── AttendanceManagement.js
│       ├── EmployeeManagement.js
│       ├── index.js
│       └── ...
└── README.md (this file)
```

## Backend (FastAPI)

- Located in the `backend/` folder.
- Main entry: `main.py`
- Uses FastAPI, SQLAlchemy, and PostgreSQL.
- CORS enabled for frontend access.
- Endpoints:
  - `POST /employees` - Add employee
  - `GET /employees` - List employees
  - `DELETE /employees/{employee_id}` - Delete employee
  - `POST /attendance` - Mark attendance
  - `GET /attendance/{employee_id}` - Get attendance for employee

### Running the Backend

1. Create and activate a Python virtual environment (if not already):
   ```
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   ```
2. Install dependencies:
   ```
   pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv email-validator
   ```
3. Start the backend server:
   ```
   .venv\Scripts\python.exe -m uvicorn main:app --reload
   ```

## Frontend (React)

- Located in the `frontend/` folder.
- Main entry: `src/App.js`
- Uses React, Material-UI (MUI).
- Communicates with backend at `http://127.0.0.1:8000`.

### Running the Frontend

1. Install dependencies:
   ```
   npm install
   npm install @mui/material @emotion/react @emotion/styled
   ```
2. Start the frontend server:
   ```
   npm start
   ```

## Features

- Employee Management: Add, view, and delete employees.
- Attendance Management: Mark and view attendance (see backend endpoints).
- Responsive UI with Material-UI.

## Notes

- Make sure PostgreSQL is running and accessible at the connection string in `.env` or `main.py`.
- The backend must be running before using the frontend.
- CORS is enabled for development (`localhost:3000`).

---

Feel free to modify and extend this project as needed!
