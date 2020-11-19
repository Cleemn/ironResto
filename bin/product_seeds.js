const mongoose = require('mongoose');
const Product = require('../models/Product.model');
 
const dbtitle = 'ironresto';
mongoose.connect(`mongodb://localhost/${dbtitle}`, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then( db => {
  console.log(`connected to ${db}`);
})
  .catch(err => {
  console.log(`Connexion problem: ${err}`);
});


Product.collection.drop();

const dataProduct = [
  {
    name: "Pizza",
    price: 15,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'plat',
    photo: "https://images.unsplash.com/photo-1491333078588-55b6733c7de6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=320"
  },
  {
    name: "Burger",
    price: 13,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'plat',
    photo: "https://images.unsplash.com/photo-1491333078588-55b6733c7de6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=320"
  },
  {
    name: "Mousse au chocolat",
    price: 6,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'dessert',
    photo: "https://images.unsplash.com/photo-1491333078588-55b6733c7de6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=320"
  }
];
  
Product.insertMany(dataProduct)
  .then( data => {
    console.log("data inserted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`Error while inserting products: ${err}`);
  })
;