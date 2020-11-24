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
    res.status(400).json({ message: "Create product went wrong" });
    return;
  }

  Product.create({
    name,
    price,
    description,
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