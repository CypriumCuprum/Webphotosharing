import React from "react";
import { Typography, TextField, Button } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchModel } from "../../lib/fetchModelData";
import { auth } from "../../helpers/auth";
import { databaseURL } from "../../helpers/config";
/**
 * Define UserPhotos, a React component of Project 4.
 */

function userLink(user) {
  const fullname = user.first_name + " " + user.last_name;
  return <Link className="User_cmt" to={"/user/" + user._id}>{fullname}</Link>;
}
function cmtphoto(comments, photoId) {
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
  return <div key={photoId + "allcomment"} className="userPhotos-comments">{formattedComments}</div>;
}


function UserPhotos() {
  const { userId } = useParams();
  const userlogin = auth();
  // const id = user.userId;
  const [photos, setphoto] = useState([]);
  const [commentcheck, setComments] = useState("");
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
  const handlechnage = (e) => {
    console.log(e.target.value);
    const comment = e.target.value;
    comment.trim() === "" ? setComments("") : setComments(comment);
  }

  const newcomment = (userlogin, photoId) => {
    const handleClick = async () => {
      console.log("new comment");
      try {
        const comment = document.getElementById(photoId + userlogin.userId).value;
        const url = `${databaseURL}/comment/addnewcomment`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "bearer": `Bearer ${userlogin.token}`,
          },
          body: JSON.stringify({ comment: comment, photoId: photoId, userId: userlogin.userId }),
        });
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        else {
          const newComment = await response.json();
          const user = await fetchModel(`/user/${newComment.user_id}`);
          newComment.user = user;
          setphoto(photos.map((photo) => {
            if (photo._id === photoId) {
              photo.comments.push(newComment);
            }
            return photo;
          }
          ));
          const TextField = document.getElementById(photoId + userlogin.userId);
          TextField.value = "";
        }
        // const data = await response.json();
        // console.log("comment added:", data);
      }
      catch (error) {
        console.error("Failed to add comment:", error);
      }
      // const comment = document.getElementById("newcomment").value;
    };
    if (userlogin) {
      return (
        <>
          <div className="newcomment">
            <TextField id={photoId + userlogin.userId} label="Add new comment" multiline variant="outlined" fullWidth onChange={handlechnage} />
          </div>
          <Button onClick={handleClick} disabled={!commentcheck}>Submit</Button>
        </>
      )
    }
    else {
      return (
        <div>
          <p>Log in to add a comment</p>
        </div>
      )
    }
  }

  return (
    <div className="userPhotos">
      <Typography variant="h5">PHOTOS</Typography>
      <div>
        {photos.map((ob) => (
          <div key={ob._id} className="photoContainer">
            <img src={`${databaseURL}/photo/image/${ob.file_name}`} className="photo" />
            <br />
            <b>Date: {ob.date_time}</b>
            <b>Comment:</b>
            {cmtphoto(ob.comments, ob._id)}
            <br />
            {newcomment(userlogin, ob._id)}

          </div>
        ))}

      </div>
    </div>
  );
}

export default UserPhotos;
