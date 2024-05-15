import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { CloudUpload, AddAPhotoOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import { auth, logout } from "../../helpers/auth";
import { databaseURL } from "../../helpers/config";
import { useNavigate } from "react-router-dom";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const [username, setUser] = useState("");
  const [parent, setparent] = useState("");
  const [base, setBase] = useState("");
  const [uploadInput, setUploadInput] = useState(null);
  const location = useLocation();
  const checkAuth = auth();
  const navigate = useNavigate();
  // const users = models.userListModel();

  const handleSubmitPhoto = (e) => {
    e.preventDefault(); // prevent default behavior
    const imageFile = uploadInput; // get image file
    setUploadInput(null); // clear upload button

    if (imageFile.size > 0) {
      // check if the file content is already uploaded
      // create a DOM form and add the file to it under the name uploadedphoto
      const domForm = new FormData();
      domForm.append("uploadedphoto", imageFile);
      // send POST request to server to add uploaded photo
      console.log(domForm.get("uploadedphoto"));
      // axios
      //   .post(`${databaseURL}/photo/new`, domForm)
      //   .then((response) => {
      //     if (response.status === 200) {
      //       console.log("** TopBar: photo successfully uploaded **");
      //       this.props.onPhotoUpload(); // notify parent component
      //     }
      //   })
      //   .catch(err => console.log("Error: photo uploaded error ", err));
      const fetchData = async () => {
        const response = await fetch(`${databaseURL}/photo/new/${checkAuth.userId}`, {
          method: "POST",
          headers: {
            "bearer": `Bearer ${checkAuth.token}`,
          },
          body: domForm,
        });
        if (response.ok) {
          console.log("** TopBar: photo successfully uploaded **");
          // this.props.onPhotoUpload(); // notify parent component
        }
      }
      fetchData();
      navigate(`/photo/${checkAuth.userId}`);
    }
  }


  const handleUpload = (e) => {
    let file = e.target.files[0];
    if (file.size === 0) {
      return;
    }
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
    if (checkAuth && basePath !== "login" && basePath !== "register" && basePath !== "photo" && basePath !== "user" && basePath !== null) {
      setparent(parentPath);
      setBase(basePath);
      const fetchData = async () => {
        const response = await fetchModel(`/user/${basePath}`);
        if (Object(response).hasOwnProperty("first_name") && Object(response).hasOwnProperty("last_name")) {
          const name = response.first_name + " " + response.last_name;
          setUser(name);
        }
      };
      fetchData();
    }
  }, [location]);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="toolbar">
        <Typography variant="h5" color="inherit">
          PHOTOSHARE
        </Typography>
        <Typography className="combo2">
          {
            checkAuth && checkAuth.userId === base &&
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
              {parent === "user" && (
                <Typography variant="h5" marginLeft="auto">
                  {username}
                </Typography>
              )}
              {parent === "photo" && (
                <Typography variant="h5" marginLeft="auto">
                  {"Photos of" + " " + username}
                </Typography>
              )}
              <Button component={Link} to="/login" color="inherit" onClick={hanleLogout} className="Button">
                Log out
              </Button>
            </>
            :
            <>
              <Button component={Link} to="/login" color="inherit" className="Button">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit" className="Button">
                Register
              </Button>
            </>
          }
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
