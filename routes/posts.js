const express = require("express");
const router = express.Router();

const {
  getPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.get("/", getPosts);
router.get("/:id", getOnePost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;