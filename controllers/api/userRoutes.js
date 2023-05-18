const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  const newUser = {
    user_name: req.body.username,
    password: req.body.password,
  };
  try {
    const userData = await User.create(newUser);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      logged = false;
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
