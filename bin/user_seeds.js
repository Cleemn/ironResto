const mongoose = require('mongoose');
const User = require('../models/User.model');
require('dotenv').config();
 
User.collection.drop();
 
const dbtitle = 'ironresto';
mongoose.connect(process.env.MONGODB_URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
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
    photo: 'https://25stanley.com/wp-content/uploads/2015/02/pamela_anderson_was_640_high_33-3.jpg',
    type: "user",
    isVerified: true,
  },
  {
    firstName: "Eddy",
    lastName: "Malou",
    email: "eddy.malou@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    photo: 'https://pbs.twimg.com/profile_images/554693927140618241/nAGU6XCk_400x400.jpeg',
    type: "user",
    isVerified: false,
  },
  {
    firstName: "Bradley",
    lastName: "Cooper",
    email: "bradleycooper@yahoo.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    photo: 'https://fr.web.img6.acsta.net/pictures/19/02/21/10/42/0074317.jpg',
    type: "user",
    isVerified: true,
  },
  {
    firstName: "Pierre",
    lastName: "Hermé",
    email: "pherme@gmail.com",
    passwordHash: bcryptjs.hashSync("testpassword", salt),
    phone: "0612345678",
    photo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Pierre_Herm%C3%A9_Deauville_2017.jpg',
    type: "restaurant",
    isVerified: true,
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