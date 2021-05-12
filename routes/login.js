const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../../My personal bloog/models/User");

// login 
router.post(
  "/",
  [
    check("email")
    // white space
      .trim()
      .isLength({ min: 6 })
      .withMessage("Email required"),
    check("email")
      .isEmail()
      .withMessage("A registered email is required"),
    check("password")
      .isLength({ min: 7 })
      .withMessage("Password must be at least 7 characters")
  ],
  async (req, res) => {
    //validate form
    const errors = validationResult(await req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      //check if user exists in db using email
      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ error: "Email/password is incorrect. Please try again!" });

      //compare passwords to see if the match in db

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ error: "Email/password is incorrect. Please try again!" });

      jwt.sign(
        { id: user.id },
        // encrypted unique password for encryption
        process.env.JWT_SECRET,
        // 30  mins can re login

        { expiresIn: 1800 }, 
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id
            },
            success: `Successful, ${user.name}.`
          });
        }
      );
    } catch (err) {
      res
        .status(500)
        .json({ error: err });
    }
  }
);

module.exports = router;