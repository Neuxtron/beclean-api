const express = require("express");
const router = express.Router();

const userRouter = require("../modules/user/user_router")
const rekeningRouter = require("../modules/rekening/rekening_router")
const mutasiRouter = require("../modules/mutasi/mutasi_router")

router.use("/user", userRouter)
router.use("/rekening", rekeningRouter)
router.use("/mutasi", mutasiRouter)

module.exports = router;
