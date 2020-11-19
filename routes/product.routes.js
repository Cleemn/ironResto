const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

module.exports = router;

const Product = require('../models/Product.model.js');

router.get('/products/new', (req, res, next) => {
  // Vérifier si l'utilisateur a le status restaurant
    // Si oui => res.redirect('/login');
    // Si non => res.redirect('/);
});

router.post('/products/new', fileUploader.single('image'), (req, res, next) => {
  // creation d'un product
  const { name, price, description, type} = req.body;

  if (name === '' || price === '' || description === '' || type === '') {
    res.render('products/new', {userInSession: req.session.currentUser, errorMessage: 'All fields are mandatory. Please provide product name, price, description and type.' });
    return;
  }

  Product.create({
    name,
    price,
    description,
    type,
    photo: req.file.path
  })
    .then((newProduct) => {
      res.redirect(`/products/${newProduct._id}`);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(500).render('products/new', { errorMessage: err.message });
      }
      else {
        next(err);
      }
  });
});

router.get('/products', (req, res, next) => {
  Product.find()
  .then((allProductsFromDB) => {
    console.log(queryString);
    res.render("products/index", { products: allProductsFromDB});
  })
  .catch((error) => {
    console.log("Error while getting the products from the DB: ", error);
    next(error);
  });
});