const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../../My personal bloog/models/User");


router.post(
  "/",
  [
    check("name")
    //now white space
      .trim()
    //  min length
      .isLength({ min: 1 })
      // message if empty
      .withMessage("You need to provide a name"),
    check("email")
      .trim()
      .isLength({ min: 6 })
      .withMessage("You need to provide an email"),
      //email check
    check("email")
      .isEmail()
      .withMessage("You need to provide an email"),

    check("password")
      .isLength({ min: 7 })
      .withMessage("Password must be at least 7 characters"),
    check("confirmPassword").custom((value, { req }) => {
      //value location confirm match
      if (value !== req.body.password) {
        throw new Error("The Passwords do not match. Try again! ");
      }
      return true;
    }),
   // check("passcode").custom((value, { req }) => {
   //   if (value !== process.env.ADMIN_PASSCODE) {
    //    throw new Error(
    //      "The correct passcode needs to be entered"
     //   );
    //  }
    //  return true;
  //  })
  ],
  async (req, res) => {
    //validation form / make sure its not empty

    const errors = validationResult(await req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;

    try {
      //check if the user already exists in db

      const oldUser = await User.findOne({ email });
      if (oldUser)
        return res.status(400).json({
          error: "This email address already is registered. Please us the login link."
        });

      //salt and hash password encryption

      const hashedPassword = await bcrypt.hash(password, 10);

      //create an instance of a User

      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        isAdmin: true
        
      });

      //save the user to the db

      const user = await newUser.save();

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        // 30 mins to login expiration
        { expiresIn: 1800 }, 
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id
            },
            success: `${user.name}, Your registration was successful. Welcome, !`
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



module.exports = router;
