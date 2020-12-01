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
      type: String
    },
    calories: {
      type: Number
    },
    portion: {
      type: Number
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