const Item = require('../models/items');

const itemsSeedData = {
    seed: async () => {
        const newItems = [
            {
                name: 'Chair',
                description: 'A bar sitting chair.',
                img: 'https://m.media-amazon.com/images/I/41CI3PFiXfL._AC_US100_.jpg',
                quantity: 2,
                color: 'brown and black',
                price: '$76.49',
            },
            {
                name: 'Table',
                description: 'Beautfil rectangel diner table ',
                img: 'https://i5.walmartimages.com/asr/e65e8754-fc77-4bd9-ab1f-34d58c01a276.4d1008969b73c9b4506f00707749758b.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
                quantity: 1,
                color:'brown and black',
                price: '$170.99',
            },
            {
                name: 'Ninja Speedi Rapid Cooker & Air Fryer, SF300, 6-Qt.',
                description: 'Create meal for up to 4, in one 6-qt pot',
                img: 'https://i5.walmartimages.com/seo/Ninja-Speedi-Rapid-Cooker-Air-Fryer-SF300-6-Qt-Capacity-10-in-1-Functionality-Meal-Maker-Sea-Salt-Gray_98d241f1-039c-4913-973e-da8481c296fe.9c25b30b7203c837dfc42e5215af184f.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
                quantity: 1,
                color: 'gray',
                price: '$119.00',
            },
            {
                name: 'Apple Laptop',
                description: 'MacBook Air 13.3 inch',
                img: 'https://i.imgur.com/Tj9XZmA.jpg',
                color: 'Space Gray',
                quantity: 1,
                price: '$699.00',
            },
            {
                name: 'Speaker',
                description: 'JBL Charge 5 Portable Waterproof Speaker,',
                img: 'https://i5.walmartimages.com/seo/JBL-Charge-5-Portable-Waterproof-Speaker-with-Powerbank-Teal_ef115b1d-3d55-4593-9b29-c627b90e6b51.49cc150ec5ca55b4231b1da48cf9b576.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
                quantity: 1,
                color: 'Teal',
                price: '$179.95',
            },
            {
                name: 'Plate set',
                description: 'Round kitchen DinnerWare Set: Plate, Bowls, and Mugs',
                img: 'https://i5.walmartimages.com/asr/e8c0cae8-0198-4124-b809-7e013e42b787.1202015facd063177e184838c2baade2.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
                quantity: 16,
                Color: 'Matte Black',
                price: '$79.99',
            },
            {
                name: 'Black Sexy Dress',
                description: 'Sequin detail split thigh mesh cami dress',
                img: 'https://m.media-amazon.com/images/I/61zVXLiuZNL._AC_SY550_.jpg',
                quantity: 1,
                color: 'Mesh Black',
                price: '$39.90',
            },
            {
                name: 'Adidas bucket hat',
                description: 'Large Strata Victory Bucket Hat with drawstring',
                img: 'https://m.media-amazon.com/images/I/71GfIM48FvL._AC_SY550_.jpg',
                quantity: 1,
                coolor:'Olive green',
                price: '$29.99',
            },
        ];
        try {
            const seedItems = await Item.create(newItems);
            console.log('Database seeded succeeded');
            return seedItems;
            // res.send(seedItems);
        }catch (err) {
            console.error('Error seeding database:', err);
            throw err;
            // res.status(500).send(err.message);
        }
    },
};
module.exports = itemsSeedData;