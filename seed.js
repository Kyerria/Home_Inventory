const Item = require('./model/items');
const itemsSeedData = require('./seedData');

async function seedDatabase() {
    try{
        await Item.deleteMany(); // clear existing items
        const seedItems = await Item.create(itemsSeedData); //seed with new items
        console.log('Database seeded successed');
    }catch (err) {
        console.error('Error seeding database:', err);
    }
}
module.exports = seedDatabase;