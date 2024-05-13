import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import { auth } from "../../helpers/auth";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const [user, setUser] = useState();
  const [parent, setparent] = useState();
  const location = useLocation();
  const { authenticated, setAuthenticated } = useState(false);
  // const users = models.userListModel();
  useEffect(() => {
    setAuthenticated(auth());
    const parentPath = location.pathname.split("/").at(-2);
    setparent(parentPath);
    const basePath = location.pathname.split("/").at(-1);
    const fetchData = async () => {
      try {
        const fetchUser = await fetchModel(`/user/${basePath}`);
        setUser(fetchUser.first_name + " " + fetchUser.last_name);
        // setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // const fetchUser = users.find((item) => item._id === user.userId)
    // setUser(fetchUser);
  }, [location]);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          PHOTOSHARE
        </Typography>
        {authenticated ?
          <>
            {parent === "user" && (
              <Typography variant="h5" marginLeft="auto">
                {user}
              </Typography>
            )}
            {parent === "photo" && (
              <Typography variant="h5" marginLeft="auto">
                {"Photos of" + " " + user}
              </Typography>
            )}
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
