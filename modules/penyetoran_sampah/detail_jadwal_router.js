const express = require("express");
const DetailJadwalController = require("./detail_jadwal_controller");
const authentication = require("../../middlewares/authentication");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isOperator, isAdmin } = require("../../middlewares/authorization");
const router = express.Router();


router.get("/:id", DetailJadwalController.detailJadwalByIdJemput)
router.post("/add", DetailJadwalController.addDetailJadwal)

router.get("/", authenAdmin, isAdmin, DetailJadwalController.allDetailJadwal)

router.put("/edit/:id", authenAdmin, isOperator, DetailJadwalController.editDetailJadwal)
router.delete("/remove/:id", authenAdmin, isOperator, DetailJadwalController.removeDetailJadwal)

module.exports = router;

