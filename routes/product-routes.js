<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/Product.model.js");

router.get("/products/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(req.params.id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => res.status(500).json({message:error.message}));
});

router.put("/products/:id", (req, res, next) => {
  // vérifier si l'utilisateur est connecté et est le restaurateur
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res
        .status(200)
        .json({
          message: `Product with ${req.params.id} is updated successfully.`,
        });
    })
    .catch((error) => res.status(500).json({message:error.message}));
});

router.delete("/products/:id", (req, res, next) => {
  // vérifier si l'utilisateur est connecté et est le restaurateur
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({
          message: `Product with ${req.params.id} is removed successfully.`,
        });
    })
    .catch((error) => res.status(500).json({message:error.message}));
});

router.post("/products", (req, res, next) => {
  // vérifier si l'utilisateur est connecté et est le restaurateur
  const { name, price, description, type } = req.body;

  if (name === "" || price === "" || description === "" || type === "") {
=======
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/Product.model.js');

router.get('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Product.findById(req.params.id)
    .then(product => {
      res.status(200).json(product);
    })
    .catch(error => {
      res.json(error);
    });
});

router.put('/products/:id', (req, res, next) => {
  // vérifier si l'utilisateur est connecté et est le restaurateur
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: `Product with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

router.delete('/products/:id', (req, res, next) => {
  // vérifier si l'utilisateur est connecté et est le restaurateur
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

router.post('/products', (req, res, next) => {
  // vérifier si l'utilisateur est connecté et est le restaurateur
  const { name, price, description, type } = req.body;

  if (name === '' || price === '' || description === '' || type === '') {
>>>>>>> eb6d1ea5d5f4a734e38d941b3c56fd18a55b3622
    res.status(400).json({ message: "Create product went wrong" });
    return;
  }

<<<<<<< HEAD
  if(!req.session.user || req.session.user.type === "user"){
    res.status(403).json({ message: "Not authorised." });
    return;
  }

=======
>>>>>>> eb6d1ea5d5f4a734e38d941b3c56fd18a55b3622
  Product.create({
    name,
    price,
    description,
<<<<<<< HEAD
    type,
    // photo: req.file.path
  })
    .then((newProduct) => {
      res.status(200).json(newProduct);
    })
    .catch((error) => res.status(500).json({message:error.message}));
});

router.get("/products", (req, res, next) => {
  Product.find()
    .then((allProductsFromDB) => {
      res.status(200).json(allProductsFromDB);
    })
    .catch((error) => res.status(500).json({message:error.message}));
});

module.exports = router;
=======
    type
    // photo: req.file.path
  })
    .then((newProduct) => {
      res.json(newProduct);
    })
    .catch((err) => {
      res.json(err);
  });
});

router.get('/products', (req, res, next) => {
  Product.find()
  .then((allProductsFromDB) => {
    res.status(200).json(allProductsFromDB);
  })
  .catch((error) => {
    res.json(err);
  });
});

module.exports = router;
>>>>>>> eb6d1ea5d5f4a734e38d941b3c56fd18a55b3622
