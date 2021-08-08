const router = require("express").Router();
const { authController } = require("../controllers");

//login
router.post("/login", authController.login);

module.exports = router;
