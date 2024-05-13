import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchModel } from "../../lib/fetchModelData";
/**
 * Define UserPhotos, a React component of Project 4.
 */

function userLink(user) {
  const fullname = user.first_name + " " + user.last_name;
  return <Link className="User_cmt" to={"/user/" + user._id}>{fullname}</Link>;
}
function cmtphoto(comments) {
  // console.log("comment" +comments);
  let formattedComments = [];
  if (comments) {
    formattedComments = comments.map((comment) => (
      <div className="userPhotos-comment" key={comment._id}>
        {userLink(comment.user)}
        {" \t" + comment.comment}
        <br />
        <div style={{ color: "rgb(128, 128, 128)" }}>
          {"---\t"}
          {"At:\t"}
          {comment.date_time}
        </div>
      </div>
    ));
  }

  //return footer
  return <div className="userPhotos-comments">{formattedComments}</div>;
}

function UserPhotos() {
  const { userId } = useParams();
  // const id = user.userId;
  const [photos, setphoto] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/photo/${userId}`;
        const result = await fetchModel(url);
        // const fetchUser = result.find((item) => item._id === user.userId)
        // setUser(result);
        // console.log("result"+result)
        setphoto(result);
        console.log(result);
        // setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);
  // console.log(photos)

  return (
    <div className="userPhotos">
      <Typography variant="h5">PHOTOS</Typography>
      <div>
        {photos.map((ob) => (
          <div key={ob._id} className="photoContainer">
            <img src={require(`../../images/${ob.file_name}`)} className="photo" />
            <br />
            <b>Date:</b> {ob.date_time}
            <br />
            <b>Comment:</b>
            {cmtphoto(ob.comments)}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPhotos;
