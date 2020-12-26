const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

authRoutes.post("/signup", (req, res, next) => {
  const { firstName, lastName, email, password, phone, photo, type } = req.body;

  if (!firstName || !lastName || !email || !password || !phone || !photo || !type) {
    res.status(400).json({ message: "Merci de fournir toutes les informations." });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  User.create({ firstName, lastName, email, passwordHash, phone, photo, type })
    .then((userFromDB) => {
      req.session.user = userFromDB;
      res.status(200).json(userFromDB);
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(500).json({
          errorMessage:
            "Cet email est déjà utilisé. Veuillez réessayer avec un autre email.",
        });
      } else {
        res.status(400).json({ message: "Une erreur s'est produite pendant la création de l'utilisateur. veuillez réessayer." });
      }
    });
});

authRoutes.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "Utilisateur non présent en base. Veuillez réessayer avec un autre email." });
        return;
      }

      if (bcrypt.compareSync(password, user.passwordHash) !== true) {
        res.status(400).json({ message: "Combinaison email/mot de passe invalide." });
        return;
      } else {
        req.session.user = user;
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "Une erreur s'est produite pendant l'authentification. Veuillez réessayer." });
    });
});

authRoutes.get("/loggedin", (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
    return;
  }
  res.status(403).json({ message: "Non authorisé" });
});

authRoutes.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.json({message: 'Vous êtes maintenant déconnecté.'});
});

authRoutes.put("/edit", (req, res, next) => {
  const { firstName, lastName, email, password, phone, photo } = req.body;
  const id = req.session.user._id

  if (!req.session.user) {
    res.status(401).json({message: "Vous êtes connecté !"});
    return;
  }

  User.findByIdAndUpdate(id, { firstName, lastName, email, password, phone, photo }, {new: true})
  .then(user => {
    req.session.user = user
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = authRoutes;
