const express = require("express");
const authentication = require("../../middlewares/authentication");
const RekeningController = require("./rekening_controller");
const router = express.Router();

router.get("/", authentication, RekeningController.myRekening)
router.post("/add", authentication, RekeningController.addRekening)
router.put("/edit/:id", authentication, RekeningController.editRekening)
router.delete("/remove/:id", authentication, RekeningController.removeRekening)

module.exports = router;
