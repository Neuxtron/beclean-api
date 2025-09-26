const express = require("express");
const DashboardController = require("./dashboard_controller");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isAdmin } = require("../../middlewares/authorization");
const router = express.Router();

router.get("/total", authenAdmin, isAdmin, DashboardController.getTotalSampahBulanIni)
router.get("/jumlah", authenAdmin, isAdmin, DashboardController.getJumlahProdukSampahBulanIni)
router.get("/last", authenAdmin, isAdmin, DashboardController.getLimaPenjemputanTerakhir)
router.get("/dashboard_admin", authenAdmin, isAdmin, DashboardController.dashboardAdmin)

module.exports = router;
