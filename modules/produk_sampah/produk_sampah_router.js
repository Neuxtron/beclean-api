const express = require("express");
const ProdukSampahController = require("./produk_sampah_controller");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isAdmin } = require("../../middlewares/authorization");
const router = express.Router();

router.get("/", ProdukSampahController.allProduk)
router.post("/add", authenAdmin, isAdmin, ProdukSampahController.addProduk)
router.put("/edit/:id", authenAdmin, isAdmin, ProdukSampahController.editProduk)
router.delete("/remove/:id", authenAdmin, isAdmin, ProdukSampahController.removeProduk)

module.exports = router;
