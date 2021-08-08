const router = require("express").Router();
const { uploadFile, auth } = require("../middlewares");
const { postController } = require("../controllers");

router.get("/", auth, postController.getPost);

//Uploading multiple files
router.post(
  "/add",
  auth,
  uploadFile.array("uploadedFiles", 10),
  postController.addPost
);

router.put(
  "/update",
  auth,
  uploadFile.array("uploadedFiles", 10),
  postController.updatePost
);

router.delete("/delete", auth, postController.deletePost);

module.exports = router;
