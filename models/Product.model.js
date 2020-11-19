const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    price: { 
      type: Number
    },
    description: {
      type: Text
    },
    photo: {
      type: String
    },
    type : {
      type: String,
      enum: ['entree', 'plat', 'dessert', 'boisson']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);