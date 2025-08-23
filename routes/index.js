const express = require("express");
const router = express.Router();

const userRouter = require("../modules/user/user_router")
const rekeningRouter = require("../modules/rekening/rekening_router")

router.use("/user", userRouter)
router.use("/rekening", rekeningRouter)

module.exports = router;
