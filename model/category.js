const mongoose = require('mongoose');
const Schema = mongoose.Schema

//define
const categorySchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    description:{
        type: String
    },
    // creating the auctual model as define
    
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;