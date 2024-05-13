const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

const getUserDict = (token, user) => {
  return {
    token: token,
    username: user.first_name + " " + user.last_name,
    userId: user._id,
  };
};

const buildToken = (user) => {
  return {
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

router.post("/", async (request, response) => { });

router.get("/list", async (request, response) => {
  try {
    const projection = '_id first_name last_name';
    const users = await User.find({}, projection).exec();
    response.status(200).send(users);
  } catch (err) {
    response.status(501).send(err);
  }
});



router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const user = await User.findOne({ "_id": id }, { "__v": 0 }).exec();
    if (!user) {
      return response.status(404).send("User not found");
    }
    response.status(200).json(user);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post("/login", async (request, response) => {
  try {
    const { login_name, password } = request.body;
    const user = await User
      .findOne({ "login_name": login_name, "password": password })
      .exec();
    if (!user) {
      return response.status(401).send("Invalid login");
    }
    const token = jwt.sign(buildToken
      (user), process.env.JWT_SECRET, { expiresIn: "3h" });
    response.status(200).send(getUserDict(token, user));
  } catch (err) {
    response
      .status
      .send(err);
  }
}
);


module.exports = router;
