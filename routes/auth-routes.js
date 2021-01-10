const express = require("express");
const authRoutes = express.Router();

const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

const User = require("../models/User.model");
const Token = require("../models/Token.model");

const host = process.env.HOST || "http://localhost:3000";

const generateRandomToken = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

authRoutes.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    // error occur
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    // if email is exist into database i.e. email is associated with another user.
    else if (user) {
      if (!user.isVerified) {
        Token.findOne({ _userId: user._id })
          .then((token) => {
            if (!token) {
              var token = new Token({
                _userId: user._id,
                token: generateRandomToken(),
              });

              token.save(function (err) {
                if (err) {
                  res.status(500).json({ message: err.message });
                  return;
                }

                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                sgMail
                  .send({
                    from: process.env.SENDER_MAIL,
                    to: user.email,
                    subject: `Welcome to IronResto ${user.firstName}`,
                    html: `
                          <p>Thanks to join our community! Please confirm your account clicking on the following link:</p>
                          <a href="${host}/confirm/${user.email}/${token.token}">Confirme Your Email By Clicking Here!</a>
                          <h4>Great to see you creating awesome webpages you with us!</h4>
                      `,
                  })
                  .then(() => {
                    console.log(`mail sended to ${user.email}`);
                    res
                      .status(200)
                      .json
                      // {message: `A verification email has been sent to ${user.email}. It will be expire after one day. If you not get verification Email click on resend token.`}
                      ();
                  })
                  .catch((error) => {
                    res
                      .status(500)
                      .json({
                        message: `Technical Issue while sending mail! Issue : ${error.message}`,
                      });
                  });
              });
            } else {
              sgMail.setApiKey(process.env.SENDGRID_API_KEY);
              sgMail
                .send({
                  from: process.env.SENDER_MAIL,
                  to: user.email,
                  subject: `Welcome to IronResto ${user.firstName}`,
                  html: `
                  <p>Thanks to join our community! Please confirm your account clicking on the following link:</p>
                  <a href="${host}/confirm/${user.email}/${token.token}">Confirme Your Email By Clicking Here!</a>
                  <h4>Great to see you creating awesome webpages you with us!</h4>
              `,
                })
                .then(() => {
                  console.log(`mail sended to ${user.email}`);
                  res
                    .status(200)
                    .json
                    // {message: `A verification email has been sent to ${user.email}. It will be expire after one day. If you not get verification Email click on resend token.`}
                    ();
                })
                .catch((error) => {
                  res
                    .status(500)
                    .json({
                      message: `Technical Issue while sending mail! Issue : ${error.message}`,
                    });
                });
            }
          })
          .catch((error) => {
            res
              .status(500)
              .json({ message: `Technical Issue! Issue : ${error.message}` });
          });
      } else {
        res.status(400).json({
          message:
            "This email address is already associated with another account. Please login.",
        });
        return;
      }
    }
    // if user is not exist into database then save the user into database for register account
    else {
      // password hashing for save into databse
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      // create and save user
      user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        passwordHash: req.body.password,
        photo: req.body.photo
      });
      user.save(function (err) {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }

        // generate token and save
        var token = new Token({
          _userId: user._id,
          token: generateRandomToken(),
        });

        token.save(function (err) {
          if (err) {
            res.status(500).json({ message: err.message });
            return;
          }

          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          sgMail
            .send({
              from: process.env.SENDER_MAIL,
              to: user.email,
              subject: `Welcome to IronResto ${user.firstName}`,
              html: `
                  <p>Thanks to join our community! Please confirm your account clicking on the following link:</p>
                  <a href="${host}/confirm/${user.email}/${token.token}">Confirme Your Email By Clicking Here!</a>
                  <h4>Great to see you creating awesome webpages you with us!</h4>
              `,
            })
            .then(() => {
              console.log(`mail sended to ${user.email}`);
              res
                .status(200)
                .json
                // {message: `A verification email has been sent to ${user.email}. It will be expire after one day. If you not get verification Email click on resend token.`}
                ();
            })
            .catch((error) => {
              res
                .status(500)
                .json({ message: `Technical Issue! Issue : ${error.message}` });
            });
        });
      });
    }
  });
});

authRoutes.get("/confirm/:email/:token", (req, res, next) => {
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) {
      res.status(400).json({
        message:
          "Your verification link may have expired. Please click on resend for verify your Email.",
      });
      return;
    } else {
      User.findOne(
        { _id: token._userId, email: req.params.email },
        function (err, user) {
          // not valid user
          if (!user) {
            res.status(401).json({
              message:
                "We were unable to find a user for this verification. Please SignUp!",
            });
            return;
          }
          // user is already verified
          else if (user.isVerified) {
            res.status(200).json({
              message: "User has been already verified. Please Login",
            });
            return;
          }
          // verify user
          else {
            // change isVerified to true
            user.isVerified = true;
            user.save(function (err) {
              // error occur
              if (err) {
                res.status(500).json({ message: err.message });
                return;
              }
              // account successfully verified
              else {
                res.status(200).json();
              }
            });
          }
        }
      );
    }
  });
});

authRoutes.post("/resend", (req, res, next) => {
  console.log("RESEND CONFIRMED");
  User.findOne({ email: req.body.email }, function (err, user) {
    // user is not found into database
    if (!user) {
      res.status(400).json({
        message:
          "We were unable to find a user with that email. Make sure your Email is correct!",
      });
      return;
    }
    // user has been already verified
    else if (user.isVerified) {
      res.status(300).json({
        message: "This account has been already verified. Please log in.",
      });
      return;
    }
    // send verification link
    else {
      // generate token and save
      var token = new Token({
        _userId: user._id,
        token: generateRandomToken(),
      });
      token.save(function (err) {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMail
          .send({
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: `REEE Welcome to IronResto ${user.firstName}`,
            html: `
                <p>Thanks to join our community! Please confirm your account clicking on the following link:</p>
                <a href="${host}/confirm/${user.email}/${token.token}">Confirme Your Email By Clicking Here!</a>
                <h4>Great to see you creating awesome webpages you with us!</h4>
            `,
          })
          .then(() => {
            console.log(`mail REsended to ${user.email}`);
            res.status(354).json({
              message: `A verification email has been sent to ${user.email}. It will be expire after one day.`,
            });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ message: `Technical Issue! Issue : ${error.message}` });
          });
      });
    }
  });
});

authRoutes.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).json({
          message:
            "Utilisateur non présent en base. Veuillez réessayer avec un autre email.",
        });
        return;
      }

      if (bcrypt.compareSync(password, user.passwordHash) !== true) {
        res
          .status(400)
          .json({ message: "Combinaison email/mot de passe invalide." });
        return;
      } else if (!user.isVerified) {
        res.status(401).send({
          message: "Your Email has not been verified. Please click on resend",
        });
        return;
      } else {
        req.session.user = user;
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(400).json({
        message:
          "Une erreur s'est produite pendant l'authentification. Veuillez réessayer.",
      });
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
  res.json({ message: "Vous êtes maintenant déconnecté." });
});

authRoutes.put("/edit", (req, res, next) => {
  const { firstName, lastName, email, password, phone, photo } = req.body;
  const id = req.session.user._id

  if (!req.session.user) {
    res.status(401).json({ message: "Vous êtes connecté !" });
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
