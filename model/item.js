//the schema and model data entities and handling database-related operations//
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    image: String, // Path to the image of the item
    quantity: {
        type: Number,
        default: 1 // Default quantity is 1 if not provided
    },
    location: String, // Location of the item in the house (optional)
    user: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    },
    addedAt: {
        type: Date,
        default: Date.now // Default addedAt timestamp is current time if not provided
    }
});

const Item = mongoose.model('Item', itemSchema);


module.exports = Item;