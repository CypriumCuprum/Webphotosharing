const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../db/userModel");

const getUserDict = (token, user) => {
    return {
        token,
        username: user.username,
        userId: user._id,
        isAdmin: user.isAdmin,
    };
};

const buildToken = (user) => {
    return {
        userId: user._id,
        isAdmin: user.isAdmin,
    };
};


