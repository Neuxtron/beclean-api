const express = require("express");
const router = express.Router();
const SetorSampahController = require("./setor_sampah_controller");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isOperator } = require("../../middlewares/authorization");
const authentication = require("../../middlewares/authentication");

router.get("/", authentication, SetorSampahController.allSetorByIdUser)
// TODO: auth operator
router.get("/all", authenAdmin, isOperator, SetorSampahController.allSetorSampah)
router.post("/add", authenAdmin, isOperator, SetorSampahController.addSetorSampah)
router.put("/edit/:id", authenAdmin, isOperator, SetorSampahController.editSetorSampah)
router.delete("/remove/:id", authenAdmin, isOperator, SetorSampahController.removeSetorSampah)

module.exports = router;