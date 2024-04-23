//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const bodyParser = require('body-parser');
const categoryController = require('./controllers/categoryController');
const ownerController = require('./controllers/ownerController');
const itemController = require('./controllers/itemController');
const loginRouter = require('')
const seedDatabase = require('./seed');
require('dotenv').config()

//Port
const port = process.env.PORT || 3000;

// Database
const mongodbURI = process.env.MONGODBURI;
mongoose.connect(mongodbURI ,  { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Database Connected Successfully", mongodbURI))
.catch(err => console.log(err))

//Middleware
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(
    session({
      secret: process.env.SECRET, 
      resave: false, 
      saveUninitialized: false 
    })
  );

// Custom auth middleware
const isAuthenticated = (req, res, next) => {
    console.log(req.session.currenowner)
    if(req.session.currentUser){
      next()
    } else {
      res.redirect('/owner/login')
    }
  };

  // Route for user management
router.post('/register', ownerController.registerUser);
router.post('/login', ownerController.loginUser);
router.delete('/logout', ownerController.logoutUser);  
//Route
app.use('/categories', categoryController);
app.use('/owner', ownerController);
app.use(isAuthenticated);



//Controllers
const usersController = require('./controllers/ownerController');
const ownerController = require('./controllers/ownerController.js');
const Category = require('./model/category.js');
app.use('/users', usersController)
app.use(isAuthenticated)



// Connect to Mongo
mongoose.connect(mongodbURI)
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' error with mongo connection'))
db.on('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


// TOP LEVEL ROUTES
// app.get('/someRoute', (req, res) => {
//     res.send('you hit someRoute')
//   })

//Routes
app.get('/categories', categoryController.index)
app.get('/categories/:id', categoryController.show);
app.get('/categories/new', categoryController.new);
app.post('/categories', categoryController.create);
app.put('/categories/:id', categoryController.update);
app.delete('/categories/:id', categoryController.delete);


//route for items
app.get('/items', itemController.index);
app.post('/items', itemController.create);
app.get('/items/:id', itemController.show);
app.delete('/items/:id', itemController.delete);

//after database connection is established, trigger the seeding process
mongoose.connection.once('open', async () => {
    try {
        await seedDatabase();
        console.log('Database seed success');
    }catch (error) {
        console.error('Error seeding database:', error);
    }
});

//Run Server
const PORT = 3000
app.listen(PORT, () => {
    console.log('I am listening on http://localhost:${PORT}');
});