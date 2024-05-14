const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth");

router.post("/", async (request, response) => {
});

router.post("/addnewcomment", verifyToken, async (request, response) => {
    try {
        const photoId = request.body.photoId;
        const comment = request.body.comment;
        const userId = request.body.userId;
        const photo = await Photo.findOne({ "_id": photoId }).exec();
        if (!photo) {
            return response.status(404).send("Photo not found");
        }
        const newComment = {
            comment: comment,
            date_time: Date.now(),
            user_id: userId,
        };

        photo.comments.push(newComment);

        await photo.save();
        response.status(200).send(newComment);
    } catch (err) {
        response.status(500).send(err);

    }
});

module.exports = router;

