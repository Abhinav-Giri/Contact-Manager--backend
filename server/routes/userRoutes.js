const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/currentUser").get(validateToken, currentUser);

module.exports = router;
