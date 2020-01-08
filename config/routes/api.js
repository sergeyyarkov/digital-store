const fs = require('fs');
const ObjectID = require('mongodb').ObjectID;

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/admin');
}

module.exports = function(server, db) {
    server.get('/api/items', async (req, res) => {
        if (req.query.q) {
                const items = await db.collection('items').find({title: {$regex: req.query.q, $options: "i"}}, {limit: 5}).toArray();
                res.json(items);
        } else {
            const items = await db.collection('items').find({}).toArray(),
                info = await db.collection('info').find({}).toArray(),
                sortBy = req.query.sorting;
            

           if (items.length > 0) {
            // устанавливаем count для каждого товара.
            info.forEach(info => db.collection('items').updateOne({"_id": ObjectID(info._id)}, {$set: {count: info.data.length}}));
               switch (sortBy) {
                   case 'ascending':
                       res.json(items.sort((a, b) => a.price - b.price));
                       break;
                   case 'descending':
                       res.json(items.sort((a, b) => b.price - a.price));
                       break;
                   case 'newer':
                       res.json(items.sort((a, b) => b.date - a.date));
                       break;
                   case 'older':
                       res.json(items.sort((a, b) => a.date - b.date));
                       break;
                   default:
                       res.json(items);
                       break;
               }
           } else res.send({error: 'Товаров в магазине пока что нет.'});
        }
        
    });

    server.get('/api/items/page/:page', async (req, res) => {
        try {
            const page = parseInt(req.params.page),
                limit = 5,
                items = await db.collection('items').find({}, {skip: limit * (page - 1), limit}).toArray();
            items.length > 0 && !isNaN(page) ? res.json(items) : res.json({error: 'Такой страницы не существует.'});
        } catch (error) {
            res.render('main/404');
        }
    });

    server.get('/api/items/data', checkAuthenticated, async (req, res) => {
        try {
            const data = await db.collection('info').find({}).toArray();
            res.json(data);
        } catch (error) {
            res.render('main/404');
        }
    });
    
    server.get('/api/items/:category', async (req, res) => {
        const items = await db.collection('items').find({category: req.params.category}).toArray(),
            sortBy = req.query.sorting;
        
        if (items.length > 0) {
            switch (sortBy) {
                case 'ascending':
                    res.json(items.sort((a, b) => a.price - b.price));
                    break;
                case 'descending':
                    res.json(items.sort((a, b) => b.price - a.price));
                    break;
                case 'newer':
                    res.json(items.sort((a, b) => b.date - a.date));
                    break;
                case 'older':
                    res.json(items.sort((a, b) => a.date - b.date));
                    break;
                default:
                    res.json(items);
                    break;
            }
        } else res.send({error: 'Товаров в магазине пока что нет.'});
    });
    
    server.get('/api/categories', async (req, res) => {
        const categories = await db.collection('categories').find({}).toArray();
        categories.length > 0 ? res.send(categories) : res.send({error: 'Категорий в магазине пока что нет.'})
    });
    
    server.get('/api/category/:category', async (req, res) => {
        const category = await db.collection('categories').find({title: req.params.category}).toArray();
        category.length > 0 ? res.send(category) : res.send({error: 'Такой категории не существует.'});
    });

    server.get('/api/icons', (req, res) => {
        const icons = fs.readdirSync('dist/public/img/service-icons');
        res.json(icons);
    });
}