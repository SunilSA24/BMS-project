const express = require("express");

const {registerUser, loginUser, getCurrentUser} = require("../controllers/userController");
const authMiddleWare = require("../middleWare/authMiddleWare")

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/current-user", authMiddleWare, getCurrentUser)

module.exports = userRouter;