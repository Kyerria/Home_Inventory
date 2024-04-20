//registering new users and login and login out user
const bcrypt = require('bcrypt');
const Owner = require('..models/Owner');
//import the owner model
const ownerController = {
    registerUser: async(req, res) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password) { // checking if the password is truthy
            return res.status(400).json({ message: 'Username, email, and password are required'});
        }
        const existingUser = await Owner.findOne({ email });
        if(existingUser){ // check if the provided username password or email exists in the database
            return res.status(409).json({message: 'Email already registered'});
        } // if not it will hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); //await the hashing of password to ensure it completes before proceeding with saving the user.
        const newUser = new Owner({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: 'User reqgistered successfully' });
    } catch (error) {
        console.error('Error reqgistering user:', error);
        res.status(500).json({message: 'Internal server error' });
    } 
},
loginUser: async (req, res) => {
try {
    const { username,password} = req.body;
    const foundUser = await Owner.findOne({ username });
    if(!foundUser) {
        return res.status(404).json({ message: 'Invalid username and password' });
    }
    const isAMatch = bcrypt.compareSync(password, foundUser.password);
    if(isAMatch) {
        // Successful login
        console.log('Login successful');
        return res.status(200).json({ message: 'Login successful' });
    }else {
        return res.status(401).json({ message: 'Incorrect password' });
    }
}catch(error) {
    console.error('Error logging in user:', error);
}
},
};
module.exports = ownerController;

