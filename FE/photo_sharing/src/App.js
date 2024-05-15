import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginPage from "./components/LoginRegister";
import Register from "./components/Register";
import { auth } from "./helpers/auth";

const App = () => {
  // Check if the user is authenticated
  const checkAuth = auth();

  return (
    <Router>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar />
          </Grid>
          <Paper className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user/:userId" element={<UserDetail />} />
                <Route path="/photo/:userId" element={<UserPhotos />} />
                <Route path="/" element={<Navigate to="/login" />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Router>
  );
};

export default App;
