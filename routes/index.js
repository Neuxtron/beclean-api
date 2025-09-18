const express = require("express");
const router = express.Router();

const adminRouter = require("../modules/admin/admin_router")
const userRouter = require("../modules/user/user_router")
const rekeningRouter = require("../modules/rekening/rekening_router")
const mutasiRouter = require("../modules/mutasi/mutasi_router")
const driverRouter = require("../modules/driver/driver_router")
const jadwalJemputRouter = require("../modules/jadwal_jemput/jadwal_jemput_router")
const produkSampahRouter = require("../modules/produk_sampah/produk_sampah_router")
const detailJadwalRouter = require("../modules/penyetoran_sampah/detail_jadwal_router")
const setorSampahRouter = require("../modules/penyetoran_sampah/setor_sampah_router")

router.use("/admin", adminRouter)
router.use("/user", userRouter)
router.use("/rekening", rekeningRouter)
router.use("/mutasi", mutasiRouter)
router.use("/driver", driverRouter)
router.use("/jadwal_jemput", jadwalJemputRouter)
router.use("/produk_sampah", produkSampahRouter)
router.use("/detail_jadwal", detailJadwalRouter)
router.use("/setor", setorSampahRouter)

module.exports = router;
