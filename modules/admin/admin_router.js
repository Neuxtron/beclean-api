const express = require("express");
const AdminController = require("./admin_controller");
const authenAdmin = require("../../middlewares/authenAdmin");
const router = express.Router();

router.get("/profile", authenAdmin, AdminController.profile)
router.put("/profile", authenAdmin, AdminController.updateProfile)
router.post("/register", AdminController.register)
router.post("/login", AdminController.login)
router.delete("/logout", authenAdmin, AdminController.logout)
router.put("/update_password", authenAdmin, AdminController.updatePassword)

module.exports = router;
