import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import { auth, logout } from "../../helpers/auth";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const [user, setUser] = useState("");
  const [parent, setparent] = useState("");
  const location = useLocation();
  const checkAuth = auth();
  // const users = models.userListModel();
  const hanleLogout = () => {
    logout();
  }

  useEffect(() => {
    const parentPath = location.pathname.split("/").at(-2);
    setparent(parentPath);
    if (checkAuth) {
      setUser(checkAuth.username);
    }
  }, [location]);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          PHOTOSHARE
        </Typography>
        {checkAuth ?
          <>
            {parent !== "photo" && (
              <Typography variant="h5" marginLeft="auto">
                {user + "1"}
              </Typography>
            )}
            {parent === "photo" && (
              <Typography variant="h5" marginLeft="auto">
                {"Photos of" + " " + user}
              </Typography>
            )}
            <Button component={Link} to="/login" color="inherit" onClick={hanleLogout}>
              Log out
            </Button>
          </>
          :
          <>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
