const express = require("express");
const router = express.Router();
const User = require("../../../My personal bloog/models/User");
const isAuth = require("../../../My personal bloog/middleware/isAuth");

// get Logged in  members

router.get("/", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong.Please try again later.", err });
  }
});

module.exports = router;
