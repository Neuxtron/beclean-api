const express = require("express");
const DriverController = require("./driver_controller");
const router = express.Router();

// TODO: auth operator
router.get("/", DriverController.allDrivers)
router.post("/add", DriverController.addDriver)
router.put("/edit/:id", DriverController.editDriver)
router.delete("/remove/:id", DriverController.removeDriver)

module.exports = router;
