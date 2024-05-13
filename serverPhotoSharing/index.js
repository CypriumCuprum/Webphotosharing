// console.log("Hello CodeSandbox");
// const models = require("./modelData/models");
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = 3000;
// app.use(cors());

// app.get("/", (req, res) => {
//   console.log("Hello");
//   console.log(models.userListModel());
//   res.json(models.userListModel());
// });

// app.get("/user", (req, res) => {
//   res.json(models.userListModel());
// });
// app.get("/photos/:id", (req, res) => {
//   const id = req.params.id;
//   const photo = models.photoOfUserModel(id);
//   res.send(photo);
// });
// app.listen(port, () => {
//   console.log(`Success! Your application is running on port ${port}.`);
// });

const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
// const CommentRouter = require("./routes/CommentRouter");

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
