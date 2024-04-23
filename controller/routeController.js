// handel users request and return response
//Route handling logic, such as processing form submissions
// and interacting with the database

const express = require('express');
const router = express.Router();
const Item = require('../models/items.js');
const itemSeed = require('../seedData.js');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect('/users/login');
    }
};

// Route to render the items index page
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const foundItems = await Item.find({});
        res.render('index.ejs', { items: foundItems });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to render the form for creating a new item
router.get('/new', isAuthenticated, (req, res) => {
    res.render('newItems.ejs');
});

// Route to seed data
router.get('/seed', isAuthenticated, async (req, res) => {
    try {
        const items = await Item.create(itemSeed);
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error seeding data.');
    }
});

// Route to display a single item
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.id);
        if (!foundItem) {
            return res.status(404).send('Item not found.');
        }
        res.render('show.ejs', { item: foundItem });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving item.');
    }
});

// Route to create a new item
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating item.');
    }
});

// Route to render the form for editing an item
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.id);
        if (!foundItem) {
            return res.status(404).send('Item not found.');
        }
        res.render('edit.ejs', { item: foundItem });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving item.');
    }
});

// Route to update an item
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/items/' + updatedItem.id);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating item.');
    }
});

// Route to delete an item
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting item.');
    }
});

module.exports = router;


