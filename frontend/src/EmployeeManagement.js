import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const API_URL = "https://hrms-backend-4h24.onrender.com";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [formError, setFormError] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/employees`);
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Don't fetch employees on mount, only when button is clicked

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    setFormError(null);
    if (
      !form.employee_id ||
      !form.full_name ||
      !form.email ||
      !form.department
    ) {
      setFormError("All fields are required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setFormError("Invalid email format");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to add employee");
      }
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      fetchEmployees();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employee_id) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/employees/${employee_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to delete employee");
      }
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Employee Management
      </Typography>
      <Box mb={2}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField
            label="Employee ID"
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            size="small"
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            size="small"
            sx={{ flex: 2, minWidth: 200 }}
          />
          <TextField
            label="Email:user123@domain.co"
            name="email"
            value={form.email}
            onChange={handleChange}
            size="small"
            sx={{ flex: 2, minWidth: 200 }}
          />
          <TextField
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            size="small"
            sx={{ flex: 1, minWidth: 150 }}
          />
        </Box>
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Employee
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={async () => {
              if (!showEmployees) {
                setLoading(true);
                setError(null);
                try {
                  await fetchEmployees();
                  setShowEmployees(true);
                } catch (err) {
                  setError("Failed to fetch employees");
                } finally {
                  setLoading(false);
                }
              } else {
                setShowEmployees(false);
              }
            }}
          >
            {showEmployees ? "Hide Employees" : "View All Employees"}
          </Button>
        </Box>
      </Box>
      {formError && <Alert severity="error">{formError}</Alert>}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {showEmployees && !loading && employees.length === 0 && (
        <Typography>No employees found.</Typography>
      )}
      {showEmployees && !loading && employees.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.employee_id}>
                  <TableCell>{emp.employee_id}</TableCell>
                  <TableCell>{emp.full_name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDelete(emp.employee_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default EmployeeManagement;
