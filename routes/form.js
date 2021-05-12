const express = require("express");
const router = express.Router();
const ContactForm = require("../models/ContactForm");
const { check, validationResult } = require("express-validator");
const isAuth = require("../middleware/isAuth");

router.post(
  "/",
  [
    check("name")
    // no white space
      .trim()
      // min length characters
      .isLength({ min: 1 })
      .withMessage("Name reuired"),
      // check email valid & provided
    check("email")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Email required"),
    check("message")
    //no white space
      .trim()
      .isLength({ min: 1 })
      .withMessage("Message required"),
    check("email")
      .isEmail()
      .withMessage("A valid email required")
  ],
  async (req, res) => {
    const errors = validationResult(await req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
// contact info required for services
    const {
      email,
      name,
      eventType,
      fromDate,
      toDate,
      hoursNeeded,
      message
    } = req.body;

    const newForm = new ContactForm({
      email,
      name,
      eventType,
      fromDate,
      toDate,
      hoursNeeded,
      message
    });
    try {
      const details = await newForm.save();
      res.status(201).json({
        success:
          "The inquiry has been successfully submitted. We'll contact shortly with a response.",
        details
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.get("/", isAuth, async (req, res) => {
  try {
    const forms = await ContactForm.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error });
  }
});


module.exports = router;
