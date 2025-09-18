const express = require("express");
const JadwalJemputController = require("./jadwal_jemput_controller");
const authentication = require("../../middlewares/authentication");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isOperator } = require("../../middlewares/authorization");
const router = express.Router();

router.get("/", authentication, JadwalJemputController.myJadwal)

// TODO: auth operator
router.get("/all", authenAdmin, isOperator, JadwalJemputController.allJadwal)
router.post("/add", authenAdmin, isOperator, JadwalJemputController.addJadwal)
router.post("/add_many", authenAdmin, isOperator, JadwalJemputController.addManyJadwal)
router.put("/edit/:id", authenAdmin, isOperator, JadwalJemputController.editJadwal)
router.delete("/remove/:id", authenAdmin, isOperator, JadwalJemputController.removeJadwal)

module.exports = router;
