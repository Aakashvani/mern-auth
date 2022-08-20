const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("hello world");
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);

module.exports = router;
