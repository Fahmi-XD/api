const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");

router.post("/", postController.post);
router.get("/", postController.getPost);
router.get("/getAll", postController.getAllPost);
router.get("/delete", postController.deletePost);
router.get("/count/:email", postController.getCountPost);

module.exports = router;
