const userController = require("../controllers/user.controller");
const express = require("express");

const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/all-users", userController.getAllUsers);

module.exports = router;
