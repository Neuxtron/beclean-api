const express = require("express");
const DetailJadwalController = require("./detail_jadwal_controller");
const authentication = require("../../middlewares/authentication");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isOperator } = require("../../middlewares/authorization");
const router = express.Router();

router.get("/", authentication, DetailJadwalController.allDetailJadwal)
router.get("/:id", authentication, DetailJadwalController.detailJadwalByIdJemput)
router.post("/add", DetailJadwalController.addDetailJadwal)

// TODO: auth operator
router.put("/edit/:id", authenAdmin, isOperator, DetailJadwalController.editDetailJadwal)
router.delete("/remove/:id", authenAdmin, isOperator, DetailJadwalController.removeDetailJadwal)

module.exports = router;

