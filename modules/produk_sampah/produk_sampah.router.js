const express = require("express");
const ProdukSampahController = require("./produk_sampah_controller");
const router = express.Router();

// TODO: auth operator
router.get("/", ProdukSampahController.allProduk)
router.post("/add", ProdukSampahController.addProduk)
router.put("/edit/:id", ProdukSampahController.editProduk)
router.delete("/remove/:id", ProdukSampahController.removeProduk)

module.exports = router;
