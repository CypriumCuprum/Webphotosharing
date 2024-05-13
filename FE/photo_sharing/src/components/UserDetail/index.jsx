import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import { auth } from "../../helpers/auth";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [User_bit, setUser] = useState({});
  const { authentication, setauth } = useState(false);
  // const users = models.userListModel();
  useEffect(() => {
    setauth(auth());
    const fetchData = async () => {
      try {
        const fetchUser = await fetchModel(`/user/${userId}`);
        setUser(fetchUser);
        // setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // const fetchUser = users.find((item) => item._id === user.userId)
    // setUser(fetchUser);
  }, [userId]);
  return (
    <>
      {/* <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel.
          </Typography>
          <hr/> */}
      <Typography variant="body1">{User_bit.description}</Typography>
      <Link to={`/photo/${userId}`}>
        {""}Photo{""}
      </Link>
    </>
  );
}

export default UserDetail;
