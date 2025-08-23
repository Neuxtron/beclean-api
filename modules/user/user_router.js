const express = require("express");
const UserController = require("./user_controller");
const authentication = require("../../middlewares/authentication");
const router = express.Router();

router.get("/profile", authentication, UserController.profile)
// router.put("/profile", authentication, UserController.updateProfile)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.delete("/logout", authentication, UserController.logout)
// router.post("/lupa_password/request_ubah_password", UserController.requestUbahPassword)
// router.post("/lupa_password/check_otp", UserController.checkOtp)
// router.post("/lupa_password/ubah_password_otp", UserController.ubahPasswordOtp)

module.exports = router;
