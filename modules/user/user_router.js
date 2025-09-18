const express = require("express");
const UserController = require("./user_controller");
const authentication = require("../../middlewares/authentication");
const { isAdmin, isOperator, isAdminOrOperator } = require("../../middlewares/authorization");
const router = express.Router();

router.get("/profile", authentication, UserController.profile)
router.put("/profile", authentication, UserController.updateProfile)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.delete("/logout", authentication, UserController.logout)
router.put("/update_password", authentication, UserController.updatePassword)

module.exports = router;
