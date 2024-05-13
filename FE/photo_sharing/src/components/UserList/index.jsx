import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { fetchModel } from "../../lib/fetchModelData";

function photoCount(photo) {
  return photo.reduce((acc, item) => {
    acc[item.user_id] = (acc[item.user_id] || 0) + 1;
    return acc;
  }, {});
}

function commentCount(photo) {
  const commentall = [];
  for (let i = 0; i < photo.length; i++) {
    for (let j = 0; j < photo[i].comments.length; j++) {
      commentall.push(photo[i].comments[j]);
    }
  }
  return commentall.reduce((acc, item) => {
    acc[item.user_id] = (acc[item.user_id] || 0) + 1;
    return acc;
  }, {});
}


function UserList() {
  const [users, setUsers] = useState([]);
  const [photoscnt, setPhotos] = useState({});
  const [commentscnt, setComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userlist = await fetchModel("/user/list");
        const photo = await fetchModel("/photo/list");
        setPhotos(photoCount(photo));
        setComments(commentCount(photo));
        setUsers(userlist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem style={{ display: 'flex', justifyContent: "space-between" }}>
              <div>
                <Link to={`/user/${item._id}`} >
                  <ListItemText primary={item.first_name} />
                </Link>
              </div>
              <div className="bubble-container" >
                <span className="bubble green-bubble">{photoscnt[item._id]}</span>
                <span className="bubble red-bubble">{commentscnt[item._id]}</span>
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div >
  );
}

export default UserList;
