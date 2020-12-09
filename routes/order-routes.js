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
    const promise = Product.findById(item.product_id);
    promises.push(promise);
  }

  Promise.all(promises)
    .then((products) => {
      let newItems = items.map((i) => {
        let p = products.filter((p) => i.product_id === p._id.toString())[0];
        return { ...i, price: p.price };
      });

      let totalPrice = newItems.reduce((acc, item) => {
        return acc + Number(item.price) * Number(item.quantity);
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

  const o = req.query && {}

  if(req.query.date === "today"){
    let today = new Date()
    let start = new Date(today.getFullYear(),today.getMonth(),today.getDate(),1,0,0);

    let end = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1,0,59,59);

    o.date = {$gte: start, $lt: end};
  
  }
  
  if (!req.session.user) {
    res.status(403).json({ message: "Not autorised." });
    return;
  }

  if (req.session.user.type === "user") {
    o.user_id = req.session.user._id;
  }

  Order.find(o)
    .populate("items.product_id") // faut on mettre une filtre de la journée ? {time:Date.now}
    .then((allOrders) => {
      const orders = allOrders.sort((o1, o2) => new Date(o2.date) -new Date(o1.date))
      res.status(200).json(orders);
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

  let filter = {_id:orderId}

  if(req.session.user.type === "user"){
    filter.user_id = req.session.user._id
  }

  Order.find(filter)
  .populate("items.product_id")
  .then((selectedOrder) => {
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
      // if (req.session.user.type === "user") {
      //   if (!(updatedOrder.user_id === req.session.user._id.toString())) {
      //     res.status(403).json({ message: "Not autorised." });
      //     return;
      //   } else if (newStatus !== "annule") {
      //     res.status(401).json({ message: "Not autorised." });
      //     return;
      //   }
      // }
      // req.io.to(orderId).emit('order:update', updatedOrder)
      req.io.emit(`order:update:${orderId}`, newStatus)
      res.status(200).json(updatedOrder);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = orderRoutes;

