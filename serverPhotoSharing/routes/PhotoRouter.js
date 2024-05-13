const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {

});

router.get("/list", async (request, response) => {
    try {
        const photos = await Photo.find().exec();
        response.status(200).send(photos);
    } catch (err) {
        response.status(500).send(err);
    }
}
);

router.get("/:id", async (request, response) => {
    const user_id = request.params.id;
    try {
        const projection = '_id first_name last_name';
        const userphoto = await User.findOne({ "_id": user_id }).select(projection).exec();
        const photos = await Photo.find({ "user_id": user_id }).exec();
        const photosWithComments = await Promise.all(photos.map(async (photo) => {
            const comments = await Promise.all(photo.comments.map(async (comment) => {
                const user = await User.findOne({ "_id": comment.user_id }).select(projection).exec();
                return {
                    _id: comment._id,
                    comment: comment.comment,
                    date_time: comment.date_time,
                    user: user
                };
            }
            ));
            return {
                _id: photo._id,
                file_name: photo.file_name,
                date_time: photo.date_time,
                user: userphoto,
                comments: comments
            };
        }
        ));
        response.status(200).send(photosWithComments);

    } catch (err) {
        response.status(500).send(err);
    }
});

module.exports = router;
