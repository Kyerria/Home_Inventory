const mongoose = required('moongoose');
const Schema = mongoose.Schema;

//define
const ownerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
});
//create model
const Owner = mongoose.model('Owner', ownerSchema);
//export model
module.exports = Owner;

