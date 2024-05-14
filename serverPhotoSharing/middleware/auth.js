const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["bearer"];

        if (!token) {
            throw new Error("No token provided");
        }

        const { userId } = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

        req.body = {
            ...req.body,
            userId
        };

        return next();
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = { verifyToken };