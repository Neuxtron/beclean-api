const express = require("express");
const DriverController = require("./driver_controller");
const authenAdmin = require("../../middlewares/authenAdmin");
const { isAdmin } = require("../../middlewares/authorization");
const router = express.Router();

// TODO: auth operator
router.get("/", authenAdmin, isAdmin, DriverController.allDrivers)
router.post("/add", authenAdmin, isAdmin, DriverController.addDriver)
router.put("/edit/:id", authenAdmin, isAdmin, DriverController.editDriver)
router.delete("/remove/:id", authenAdmin, isAdmin, DriverController.removeDriver)

module.exports = router;
