import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import EmployeeManagement from "./EmployeeManagement";
import AttendanceManagement from "./AttendanceManagement";

function App() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError(null);
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HRMS Lite
          </Typography>
        </Toolbar>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Employee Management" />
          <Tab label="Attendance Management" />
        </Tabs>
      </AppBar>
      <Box mt={4}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <>
            {tab === 0 && <EmployeeManagement />}
            {tab === 1 && <AttendanceManagement />}
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
