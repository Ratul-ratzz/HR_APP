<<<<<<< HEAD
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
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> master
