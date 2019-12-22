const fs = require('fs');

module.exports = function(server, db) {
    server.get('/api/items', async (req, res) => {
        const items = await db.collection('items').find({}).toArray(),
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

    server.get('/api/items/page/:page', async (req, res) => {
        try {
            const page = parseInt(req.params.page),
                limit = parseInt(req.query.limit),
                items = await db.collection('items').find({}, {skip: limit * (page - 1), limit}).toArray();
            items.length > 0 && !isNaN(page) ? res.json(items) : res.json({error: 'Такой страницы не существует.'});
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