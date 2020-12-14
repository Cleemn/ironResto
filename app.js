require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require('express-session');
const cors = require('cors');


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000']
}

app.use(cors(corsOptions));

const server = require('http').createServer(app);
const io = require("socket.io")(server,  {
  handlePreflightRequest: (req, res) => {
      const headers = {
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
          "Access-Control-Allow-Credentials": true
      };
      res.writeHead(200, headers);
      res.end();
  }
});

// Session
const sessionMiddleware = session({
  secret: 'some secret goes here',
  resave: true,
  saveUninitialized: true,
})

app.use(sessionMiddleware);

// Init Socket Io
app.use((req, res, next) => {
  req.io = io
  next()
})

io.on("connection", (socket) => {
  console.log('client connected', socket.id)

});


      

app.set('views', path.join(__dirname, 'views'));


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/product-routes'));
app.use('/api', require('./routes/order-routes'));
app.use('/api', require('./routes/file-upload.routes'));

// Serve static files from client/build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// For any other routes: serve client/build/index.html SPA
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/client/build/index.html`, err => {
    if (err) next(err)
  })
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  res.json({message: err.message});
});

module.exports = {app, server};
