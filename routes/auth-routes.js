const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

authRoutes.post("/signup", (req, res, next) => {
  const { username, email, password, phone, type } = req.body;

  if (!username || !email || !password || !phone || !type) {
    res.status(400).json({ message: "Provide all the informations" });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  User.create({ username, email, passwordHash, phone, type })
    .then((userFromDB) => {
      req.session.user = userFromDB;
      res.status(200).json(userFromDB);
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(500).json({
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        res.status(400).json({ message: "Create user went wrong" });
      }
    });
});

authRoutes.post("/login", (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ username, email })
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: "User not found. Email or username invalid." });
        return;
      }

      if (bcrypt.compareSync(password, user.passwordHash) !== true) {
        res.status(400).json({ message: "Wrong password" });
        return;
      } else {
        req.session.user = user;
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "Something went wrong while login" });
    });
});

authRoutes.get("/loggedin", (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

authRoutes.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.json({message: 'Your are now logged out.'});
});

authRoutes.put("/edit", (req, res, next) => {
  const { username, email, password, phone } = req.body;
  const id = req.session.user._id

  if (!req.session.user) {
    res.status(401).json({message: "You need to be logged in!"});
    return;
  }

  User.findByIdAndUpdate(id, { username, email, password, phone }, {new: true})
  .then(user => {
    req.session.user = user
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = authRoutes;
