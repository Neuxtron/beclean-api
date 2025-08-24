const express = require("express");
const authentication = require("../../middlewares/authentication");
const MutasiController = require("./mutasi_controller");
const router = express.Router();

router.get("/", authentication, MutasiController.myMutasi)
router.put("/withdraw", authentication, MutasiController.withdraw)

module.exports = router;
