// Dependencies
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

// Connect to Mongo
mongoose.connect(mongoURI)
  .then(() => {
    // console.log('the connection to mongod is established');
  })
  .catch(err => {
    console.error('Error connecting to mongod:', err);
  });

// Custom auth middleware
const isAuthenticated = (req, res, next) => {
  console.log(req.session.currentUser);
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/users/login');
  }
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// CONTROLLERS
const usersController = require('./controllers/usersController.js');
const routeController = require('./controllers/routeController.js');

// Route
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Route to create
app.get('/items/new', (req, res) => {
  res.render('new.ejs');
});

// Use isAuthenticated middleware for all routes below
app.use(isAuthenticated);

// CONTROLLERS
app.use('/users', usersController);
app.use('/items', routeController);

// Connection Error/Success
// db.on('connected', () => console.log('mongo connected: ', mongoURI));
// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('disconnected', () => console.log('mongo disconnected'));

// const myFirstItem = {
//   name: 'Chair',
//   category: 'Furniture', // Provide a value for the category field
//   description: 'A bar sitting chair.',
//   img: 'https://m.media-amazon.com/images/I/41CI3PFiXfL._AC_US100_.jpg',
//   quantity: 2,
//   location: 'Dining room',
//   user: 'John Doe', // Provide a value for the owner field
//   price: 76.49, // Provide the price as a valid number without the dollar sign
// };

// Item.create(myFirstItem)
//   .then((item) => {
//     // console.log(item)
//     // db.close()
//   })
//   .catch(err => {
//     console.log(err);
//     console.log('wow look I caught the error!');
//     db.close();
//   });

// app.get('/', (req, res) => {
//   res.send('Hello world!');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});