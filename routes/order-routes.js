const express = require("express");
const orderRoutes = express.Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");

orderRoutes.post("/orders", (req, res, next) => {
  const { items } = req.body;
  // items = [{id : 1, quantity: 1}, {id : 2, quantity: 2} ]

    // if (req.session.user) {
    //   res
    //     .status(403)
    //     .json({ message: "Vous n'etes pas connecté. Veuillez vous connecter." });
    //   return;
    // }

  let promises = [];
  for (item of items) {
    const promise = Product.findById(item.id);
    promises.push(promise);
  }

  Promise.all(promises)
    .then((products) => {

      for (product of products) {
        items.map((item) => {
          if (product._id == item.id) {
            item.price = product.price;
          }
        });
      }

      let totalPrice = items.reduce((acc, item) => {return acc + item.price*item.quantity}, 0) 

      newOrder = {
        user_id : req.session.user,
        items: items,
        total_price: totalPrice,
        date: Date.now(),
        status: "en_attente",
      };

      Order.create(newOrder)
        .then((order) => {
          res.status(200).json(order);
        })
        .catch((err) => res.status(500).json({ message: err.message }));

    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

orderRoutes.get("/orders", (req, res, next) => {
  return;
});

orderRoutes.get("/orders:id", (req, res, next) => {
  return;
});

orderRoutes.put("/orders:id", (req, res, next) => {
  // si user type est rastaurateur
  // alors il peut mettre changé le status comme il veut
  // si user type est client
  // alors il peut changé le satut que à l'annulé
  // sinon "not autorised" et demander de login user
  return;
});

module.exports = orderRoutes;
