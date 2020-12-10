const mongoose = require('mongoose');
const User = require('../models/User.model');
 
User.collection.drop();
 
const dbtitle = 'ironresto';
mongoose.connect(`mongodb://localhost/${dbtitle}`, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then( db => {
    console.log(`connected to mongo ${db}`);
  })
  .catch(err => {
    console.log(`Connexion problem: ${err}`);
  });

const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);
 
const dataUser = [
  {
    firstName: "Pamela",
    lastName: "Anderson",
    email: "pamela.anderson@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    type: "user"
  },
  {
    firstName: "Eddy",
    lastName: "Malou",
    email: "eddy.malou@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    type: "user"

  },
  {
    firstName: "Bradley",
    lastName: "Cooper",
    email: "bradleycooper@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    type: "user"
  },
  {
    firstName: "Pierre",
    lastName: "Hermé",
    email: "pherme@gmail.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    type: "restaurant"
  }
];


User.insertMany(dataUser)
  .then( data => {
    console.log("data inserted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`Error: ${err}`);
});