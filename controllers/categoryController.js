const Category = require('../models/category');

//define
const categoryController = {
  //display all categories
  index: async(req, res) => {
    try {
         //retrieve from database
         const categories = await Category.find();
         res.render('categories/index', {categories});
} catch (err) {
            //handle any errors
            console.error('Error fetching categories:', err);
            res.status(500).send('Interal Server Error');
    }
},
// function to handle displayinig a single category
show: async (req, res) => {
    try {
        //retrieve the category with specific id from databas
        const category = await Category.findById(req.params.id);
        // render the view to display the category details
        res.render('categories/show', {category});
    } catch (err) {
        console.error('Error fetcging category:', err);
        res.status(500).send('Internal Server Error');
    }
},
new: (req, res) => {
    res.render('categories/new');
},
//function to handle creating a new category
create: async (req, res) => {
        try{
        //create new category with the data from the request body
        const category = new Category(req.body);
        //save the new category to the database
        await category.save();
        //redirect to the index page to display all categories
        res.redirect('/categories');
    }catch (err) {
        console.error('Error creating category:', err);
        res.status(400).send('Bad Request');
    }
},
update: async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body, {new: true});
        res.redirect('/categories');
    }catch(err) {
        console.error('Error updating category', err);
        res.status(500).send('Bad Request');
    }
},
delete: async (req, res) => {
    try{
        const {id} = req.params;
        await Category.findByIdAndDelete(id);
        res.redirect('/categories');
    }catch(err) {
        console.error('Error deleting category', err);
        res.status(500).send('Bad Request');
    }
}
}
   
module.exports = categoryController;