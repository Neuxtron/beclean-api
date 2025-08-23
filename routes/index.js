const express = require("express");
const router = express.Router();

const userRouter = require("../modules/user/user_router")

router.use("/user", userRouter)

module.exports = router;
