import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginPage from "./components/LoginRegister";
import auth from "./helpers/auth";

const App = () => {
  // Check if the user is authenticated
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setAuthenticated(auth());
  }, []);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {authenticated ?
                <Route path="/user/list" element={<UserList />} />
                :
                <Redirect to="/login" />
              }
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user/:userId" element={<UserDetail />} />
                <Route path="/photo/:userId" element={<UserPhotos />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
