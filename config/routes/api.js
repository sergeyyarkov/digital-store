module.exports = function(server, db) {
    server.get('/api/v1/items', async (req, res) => {
        const items = await db.collection('items').find({}).toArray();
        items.length > 0 ? res.send(items) : res.send({error: 'Товаров в магазине пока что нет.'});
    });
    server.get('/api/v1/items/:category', async (req, res) => {
        const items = await db.collection('items').find({category: req.params.category}).toArray();
        items.length > 0 ? res.send(items) : res.send({error: 'Такой категории не существует или там нет товаров.'});
    });
    server.get('/api/v1/categories', async (req, res) => {
        const categories = await db.collection('categories').find({}).toArray();
        categories.length > 0 ? res.send(categories) : res.send({error: 'Категорий в магазине пока что нет.'})
    });
    server.get('/api/v1/categories/:category', async (req, res) => {
        const category = await db.collection('categories').find({title: req.params.category}).toArray();
        category.length > 0 ? res.send(category) : res.send({error: 'Такой категории не существует.'});
    })
}