//item data
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { //name of item
        type: String, 
        required:true}, 
    category: { //category of that item
        type: String, 
        required: true
    },
    description:
        String,
    
    image:  //path to the image of item
        String,
    
    quantity: {
        type: Number,
        default: 1
    },
    location: { // location of item in the house
        String,
    },
    owner: 
        String,
    addedAt: {
        type: Date,
        default: Date.now
    },
    
});

const Item = mongoose.model('Item', itemSchema);


module.exports = Item;
