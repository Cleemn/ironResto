const { Schema, model } = require('mongoose');
require("../models/User.model");

const commandSchema = new Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    items: {
      type: 
      [
        {
          id: { type: Schema.Types.ObjectId, ref: 'Product'},
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

module.exports = model('Product', commandSchema);