const express = require("express");
const mongoose = require("mongoose");

const orderRoutes = express.Router();
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");

orderRoutes.post("/orders", (req, res, next) => {
  const { items } = req.body; // items = [{id : 1, quantity: 1}, {id : 2, quantity: 2} ]

  if (!req.session.user) {
    res
      .status(403)
      .json({ message: "Vous n'etes pas connecté. Veuillez vous connecter." });
    return;
  }

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

      let totalPrice = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      newOrder = {
        user_id: req.session.user,
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
  if (!req.session.user) {
    res.status(403).json({ message: "Not autorised." });
    return;
  }

  const o = {}

  if (req.session.user.type === "user") {
    o.user_id = req.session.user._id;
  }

  Order.find(o).populate('items.product_id') // faut on mettre une filtre de la journée ? {time:Date.now}
    .then((allOrders) => {

        console.log(allOrders)
      res.status(200).json(allOrders);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

orderRoutes.get("/orders/:id", (req, res, next) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (!req.session.user) {
    res.status(403).json({ message: "Not autorised." });
    return;
  }

  Order.findById(orderId)
    .then((selectedOrder) => {
      if (
        req.session.user.type === "user" &&
        !(selectedOrder.user_id === req.session.user._id.toString())
      ) {
        res.status(403).json({ message: "Not autorised." });
        return;
      }

      res.status(200).json(selectedOrder);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

orderRoutes.put("/orders/:id", (req, res, next) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (!req.session.user) {
    res.status(403).json({ message: "Not autorised." });
    return;
  }

  Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true })
    .then((updatedOrder) => {
      if (req.session.user.type === "user") {
        if (!(updatedOrder.user_id === req.session.user._id.toString())) {
          res.status(403).json({ message: "Not autorised." });
          return;
        } else if (newStatus !== "annule") {
          res.status(401).json({ message: "Not autorised." });
          return;
        }
      }

      res.status(200).json(updatedOrder);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = orderRoutes;
