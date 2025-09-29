const express = require("express");
const router = express.Router();
const SetorSampahController = require("./setor_sampah_controller");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isOperator } = require("../../middlewares/authorization");
const authentication = require("../../middlewares/authentication");
const DetailJadwalController = require("./detail_jadwal_controller");

router.get("/", authentication, SetorSampahController.allSetorByIdUser)
router.get("/all", authenAdmin, isOperator, SetorSampahController.allSetorSampah)
router.post("/add", authenAdmin, isOperator, SetorSampahController.addSetorSampah)
router.post("/add_many", authenAdmin, isOperator, DetailJadwalController.addMany)
router.put("/edit/:id", authenAdmin, isOperator, SetorSampahController.editSetorSampah)
router.delete("/remove/:id", authenAdmin, isOperator, SetorSampahController.removeSetorSampah)

module.exports = router;