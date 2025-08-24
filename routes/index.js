const express = require("express");
const router = express.Router();

const userRouter = require("../modules/user/user_router")
const rekeningRouter = require("../modules/rekening/rekening_router")
const mutasiRouter = require("../modules/mutasi/mutasi_router")
const driverRouter = require("../modules/driver/driver_router")
const jadwalJemputRouter = require("../modules/jadwal_jemput/jadwal_jemput_router")

router.use("/user", userRouter)
router.use("/rekening", rekeningRouter)
router.use("/mutasi", mutasiRouter)
router.use("/driver", driverRouter)
router.use("/jadwal_jemput", jadwalJemputRouter)

module.exports = router;
