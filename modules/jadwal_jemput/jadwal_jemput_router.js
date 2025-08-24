const express = require("express");
const JadwalJemputController = require("./jadwal_jemput_controller");
const authentication = require("../../middlewares/authentication");
const router = express.Router();

router.get("/", authentication, JadwalJemputController.myJadwal)

// TODO: auth operator
router.post("/add", JadwalJemputController.addJadwal)
router.post("/add_many", JadwalJemputController.addManyJadwal)
router.put("/edit/:id", JadwalJemputController.editJadwal)
router.delete("/remove/:id", JadwalJemputController.removeJadwal)

module.exports = router;
