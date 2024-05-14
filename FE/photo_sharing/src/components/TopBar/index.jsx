import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { CloudUpload, AddAPhotoOutlined } from "@mui/icons-material";
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
  const [username, setUser] = useState("");
  const [parent, setparent] = useState("");
  const [base, setBase] = useState("");
  const [uploadInput, setUploadInput] = useState("");
  const location = useLocation();
  const checkAuth = auth();
  // const users = models.userListModel();

  const handleSubmitPhoto = (e) => {
    e.preventDefault();
  }

  const handleUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadInput(file);
    }
  }

  const hanleLogout = () => {
    logout();
  }

  useEffect(() => {
    const parentPath = location.pathname.split("/").at(-2);
    const basePath = location.pathname.split("/").at(-1);
    if (checkAuth && basePath !== "login" && basePath !== "register") {
      setparent(parentPath);
      setBase(basePath);
      const fetchData = async () => {
        const response = await fetchModel(`/user/${basePath}`);
        const name = response.first_name + " " + response.last_name;
        setUser(name);
      };
      fetchData();
    }
  }, [location]);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          PHOTOSHARE
        </Typography>
        {
          checkAuth.userId === base &&
          (

            <form onSubmit={handleSubmitPhoto} style={{ flexGrow: 1 }}>
              <Button component="label" title="Upload Photo" color="inherit">
                <AddAPhotoOutlined fontSize="large" />
                <input type="file" accept="image/*" hidden onChange={handleUpload} />

              </Button>
              {uploadInput && (
                <IconButton type="submit">
                  <CloudUpload style={{ color: "#fec7d7" }} fontSize="large" />
                </IconButton>
              )}
            </form>


          )
        }
        {checkAuth ?
          <>
            {parent == "user" && (
              <Typography variant="h5" marginLeft="auto">
                {username}
              </Typography>
            )}
            {parent === "photo" && (
              <Typography variant="h5" marginLeft="auto">
                {"Photos of" + " " + username}
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
