const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const { verifyToken } = require("../middleware/auth");
const multer = require('multer');
const processFormBody = multer({ storage: multer.memoryStorage() }).single('uploadedphoto');
const router = express.Router();
const fs = require("fs");
const { route } = require("./UserRouter");
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
        const photos = await Photo.find({ "user_id": user_id }).sort('-date_time').exec();
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

router.get("/image/:filename", async (request, response) => {
    const filename = request.params.filename;
    fs.readFile(`./images/${filename}`, (error, data) => {
        if (error) {
            console.log("Error during reading the photo file: ", error);
            return;
        }
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        response.end(data);
    });
});

router.post("/new/:id", verifyToken, async (request, response) => {
    processFormBody(request, response, err => {
        // Check error request:
        if (err || !request.file) {
            console.log("Error in processing photo received from request", err);
            return;
        }

        // Check if uploaded photo is empty
        if (request.file.buffer.size === 0) {
            request.status(400).json({ message: 'Error: Uploaded photo is empty' });
            return;
        }

        // Create the file in the directory "images" under an unique name, 
        // make the original file name unique by adding a unique prefix with a timestamp,
        // then have the photo data written into the images directory
        const timestamp = new Date().valueOf();
        const filename = 'U' + String(timestamp) + request.file.originalname;
        fs.writeFile(`./images/${filename}`, request.file.buffer, function (error) {
            if (error) console.log("Error during photo data writting into the images directory: ", error);
            else console.log("** Server: photo saved in the directory **");
        });

        // Under the name filename, store the new Photo object in the database
        Photo.create({
            file_name: filename,
            date_time: timestamp,
            user_id: request.params.id
        })
            .then(() => console.log(`** Server: photo saved in the DB **`))
            .catch(e => console.log(`** Error during photo saving into the DB: ${e} **`));

        response.status(200).send();  // must send back succeed response
    });
});

module.exports = router;
