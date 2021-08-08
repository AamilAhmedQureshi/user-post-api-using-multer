const router = require("express").Router();
const { userController } = require("../controllers");
const auth = require("../middlewares/token");

//list
router.get("/", auth, userController.getUser);

//Add
router.post("/", userController.addUser);

module.exports = router;
