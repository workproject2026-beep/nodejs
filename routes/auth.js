const express = require("express");
const router = express.Router();
const { login, singup } = require("../controllers/auth");
const {
    uploadLocal,
    uploadCDN
  } = require ("../middlewares/upload-middleware")
  const uploadImageKit = require("../middlewares/image-kit-middleware")
  
router.post("/login", login);
router.post(
  "/signup",
  uploadCDN.single("img"),
  uploadImageKit(false, "users"),
  singup
);

module.exports = router;
