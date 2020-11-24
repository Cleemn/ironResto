const { Schema, model } = require('mongoose');
<<<<<<< HEAD:models/Order.model.js
require("./User.model");
require("./Product.model");
=======
require("../models/User.model");
require("../models/Product.model");
>>>>>>> Up:models/Command.model.js

const orderSchema = new Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    items: {
      type: 
      [
        {
          product_id: { type: Schema.Types.ObjectId, ref: 'Product'},
          quantity: { type: Number },
          price: { type: Number }
        }
      ]
    },
    total_price: {
      type: Number
    },
    date: {
      type: Date
    },
    time: {
      type: Date
    },
    status: {
      type: String,
      enum: ['en_attente', 'acceptee', 'en_cours', 'commande_prete', 'commande_recuperee']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', orderSchema);