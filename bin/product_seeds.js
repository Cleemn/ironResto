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
    photo: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHwyfDB8&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Burger",
    price: 13,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'plat',
    photo: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyfGVufDB8MnwwfA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Gateau au chocolat",
    price: 6,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'dessert',
    photo: "https://images.unsplash.com/photo-1565808229224-264b6fcc5052?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfDJ8MHw%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Tarte aux pommes",
    price: 4,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'dessert',
    photo: "https://images.unsplash.com/photo-1588227071345-751a485e2f79?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFwcGxlJTIwcGllfGVufDB8MnwwfA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Pates",
    price: 10,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'plat',
    photo: "https://images.unsplash.com/photo-1586955080976-3854194bf139?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGFzdGF8ZW58MHwyfDB8&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Smoothie",
    price: 3,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias vitae eaque, repudiandae, debitis ab, consectetur cumque sit possimus maiores voluptatum deserunt. Maxime tempora architecto fugit repellat, ullam ipsa? Unde?Molestiae alias ex, enim qui similique non voluptates quas numquam modi eveniet sequi voluptatibus ad impedit adipisci aliquam laboriosam nisi odio nam repellat! Id fugiat temporibus consequuntur neque, perspiciatis enim.",
    type: 'boisson',
    photo: "https://images.unsplash.com/photo-1561730734-3a27c18743e8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29jYXxlbnwwfDJ8MHw%3D&auto=format&fit=crop&w=800&q=60"
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