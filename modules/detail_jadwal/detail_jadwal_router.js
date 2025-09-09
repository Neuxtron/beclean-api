const express = require("express");
const DetailJadwalController = require("./detail_jadwal_controller");
const authentication = require("../../middlewares/authentication");
const router = express.Router();

router.get("/", authentication, DetailJadwalController.allDetailJadwal)
router.get("/:id", authentication, DetailJadwalController.DetailJadwalByIdJemput)
router.post("/add", authentication, DetailJadwalController.addDetailJadwal)

// TODO: auth operator
router.put("/edit/:id", DetailJadwalController.editDetailJadwal)
router.delete("/remove/:id", DetailJadwalController.removeDetailJadwal)

module.exports = router;
