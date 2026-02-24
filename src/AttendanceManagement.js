import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
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

const API_URL = "http://127.0.0.1:8000";

function AttendanceManagement() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });
  const [formError, setFormError] = useState(null);
  const [filter, setFilter] = useState({ start: "", end: "" });
  // Filtered attendance records by date range
  const filteredAttendance = attendance.filter((record) => {
    if (!filter.start && !filter.end) return true;
    const recDate = new Date(record.date);
    if (filter.start && recDate < new Date(filter.start)) return false;
    if (filter.end && recDate > new Date(filter.end)) return false;
    return true;
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const fetchAttendance = async (employee_id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/attendance/${employee_id}`);
      if (!res.ok) throw new Error("Failed to fetch attendance");
      const data = await res.json();
      setAttendance(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMark = async () => {
    setFormError(null);
    if (!form.employee_id || !form.date || !form.status) {
      setFormError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to mark attendance");
      }
      fetchAttendance(form.employee_id);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Attendance Management
      </Typography>
      <Box mb={2}>
        <TextField
          select
          label="Employee"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          sx={{ mr: 1, minWidth: 150 }}
        >
          {employees.map((emp) => (
            <MenuItem key={emp.employee_id} value={emp.employee_id}>
              {emp.full_name} ({emp.employee_id})
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          sx={{ mr: 1 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          sx={{ mr: 1, minWidth: 120 }}
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleMark}>
          Mark Attendance
        </Button>
      </Box>
      {formError && <Alert severity="error">{formError}</Alert>}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && form.employee_id && (
        <Button
          variant="outlined"
          onClick={() => fetchAttendance(form.employee_id)}
          sx={{ mb: 2 }}
        >
          View Attendance
        </Button>
      )}
      {!loading && attendance.length === 0 && form.employee_id && (
        <Typography>No attendance records found.</Typography>
      )}
      {!loading && attendance.length > 0 && (
        <>
          <Box mb={2} display="flex" gap={2} alignItems="center">
            <TextField
              label="Start Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filter.start}
              onChange={(e) => setFilter({ ...filter, start: e.target.value })}
            />
            <TextField
              label="End Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filter.end}
              onChange={(e) => setFilter({ ...filter, end: e.target.value })}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No records in selected range.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendance.map((record) => (
                    <TableRow key={record.date}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}

export default AttendanceManagement;
