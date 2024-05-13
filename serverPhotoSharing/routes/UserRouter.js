const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

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
    response.status(200).send(user);
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
