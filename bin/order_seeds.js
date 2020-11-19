const mongoose = require('mongoose');
const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const User = require('../models/User.model');
 
const dbtitle = 'ironresto';
mongoose.connect(`mongodb://localhost/${dbtitle}`, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then( db => {
  console.log(`connected to ${db}`);
})
  .catch(err => {
  console.log(`Connexion problem: ${err}`);
});


Order.collection.drop();

const user_list = [];
const product_list = [];

const users = User.find()
.then(users => {
  for (let user of users) {
    user_list.push(user);
  }
  return user_list;
})
.catch(err => {
  console.log(`cannot find users in db ${err}`);
});

const products = Product.find()
.then(products => {
  for (let product of products) {
    product_list.push(product);
  }
  return product_list;
})
.catch(err => {
  console.log(`cannot find users in db ${err}`);
});

Promise.all([users, products])
.then(() => {
  var now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  now = new Date(now);

  const dataOrder = [
      { 
        user_id: user_list[0]._id,
        items: [
          { product_id: product_list[0]._id,
            quantity: 2,
            price: (2* product_list[0].price),
          }
        ],
        total_price: 30,
        date: new Date(),
        time: now,
        status: 'en_attente'
      },
      { 
        user_id: user_list[1]._id,
        items: [
          { product_id: product_list[0]._id,
            quantity: 2,
            price: (2* product_list[0].price),
          },
          { product_id: product_list[1]._id,
            quantity: 4,
            price: (4* product_list[1].price),
          }
        ],
        total_price: 82,
        date: new Date(),
        time: now,
        status: 'en_attente'
      },
      { 
        user_id: user_list[2]._id,
        items: [
          { product_id: product_list[1]._id,
            quantity: 1,
            price: (1* product_list[1].price),
          },
          { product_id: product_list[1]._id,
            quantity: 1,
            price: (1* product_list[0].price),
          },
          { product_id: product_list[2]._id,
            quantity: 2,
            price: (2* product_list[2].price),
          }
        ],
        total_price: 40,
        date: new Date(),
        time: now,
        status: 'en_attente'
      }
  ];    
  Order.insertMany(dataOrder)
    .then( data => {
      console.log("data inserted");
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(`Error while inserting orders: ${err}`);
    });
})