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
    username: "Mrs Brown",
    email: "mrsbrown@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    type: "user"
  },
  {
    username: "Eddy Malou",
    email: "eddy@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    type: "user"

  },
  {
    username: "Petit Nicolas",
    email: "petitnicolas@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    type: "user"
  },
];


User.insertMany(dataUser)
  .then( data => {
    console.log("data inserted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`Error: ${err}`);
});