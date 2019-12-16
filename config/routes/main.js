const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

// API
function getItemsRoute(req, res, dbo) {
    if (req.query.token === 'yYNfW8ynVO18L1TW5qIkILM1WtWgrVZz') {
        if (req.query.items === 'all' && !req.query.category && !req.query.sorting) {
            dbo.collection('items').find().toArray((err, result) => {
                result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Товаров в магазине пока что нет.'});
            });
        } else if (req.query.items === 'all' && req.query.sorting && !req.query.category) {
            if (req.query.sorting === 'ascending') {
                dbo.collection('items').find().sort({price: 1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else if (req.query.sorting === 'descending') {
                dbo.collection('items').find().sort({price: -1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else if (req.query.sorting === 'newer') {
                dbo.collection('items').find().sort({date: -1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else if (req.query.sorting === 'older') {
                dbo.collection('items').find().sort({date: 1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else {
                res.send('Введите параметр по убыванию или возрастанию.');
            }
        } else if (req.query.items === 'all' && req.query.category && !req.query.sorting) {
            dbo.collection('items').find({category: req.query.category}).toArray((err, result) => {
                result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
            });
        } else if (req.query.items === 'all' && req.query.category && req.query.sorting) {
            if (req.query.sorting === 'ascending') {
                dbo.collection('items').find({category: req.query.category}).sort({price: 1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else if (req.query.sorting === 'descending') {
                dbo.collection('items').find({category: req.query.category}).sort({price: -1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else if (req.query.sorting === 'newer') {
                dbo.collection('items').find({category: req.query.category}).sort({date: -1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else if (req.query.sorting === 'older') {
                dbo.collection('items').find({category: req.query.category}).sort({date: 1}).toArray((err, result) => {
                    result.length > 0
                    ? res.send(result)
                    : res.send({error: 'Такой категории не существует или там нет товаров.'});
                });
            } else {
                res.send('Введите параметр по убыванию или возрастанию.');
            }
        } else if (req.query.categories === 'all') {
            dbo.collection('categories').find().toArray((err, result) => {
                result.length > 0
                    ? res.send(result)
                    : res.send({error: 'На сайте нету категорий'});
            });
        } else if (req.query.icons === 'all') {
            const icons = fs.readdirSync('dist/public/img/service-icons');
            res.send(icons);
        } else if (req.query.category) {
            dbo.collection('categories').find({title: req.query.category}).toArray((err, result) => {
                res.send(result);
            });
        } else {
            res.send('Запрос неверный.');
        }
    } else {
        res.send('Неверный токен.');
    }
}

module.exports = function (server, db) {
    server.get('/', (req, res) => {
        try {
            db.collection('categories').find().toArray((err, result) => {
                const categories = result.map(category => category.title[0].toUpperCase() + category.title.slice(1));
                res.render('main/index', {
                    pageName: 'index',
                    title: 'Digital-Store | Главная',
                    categories
                });
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/how-to-buy', (req, res) => {
        try {
            res.render('main/how-to-buy', {
                pageName: 'how-to-buy',
                title: 'Digital-Store | Как купить товар'
            });
        } catch (error) {
            res.send('main/404');
        }
    });
    server.get('/contacts', (req, res) => {
        try {
            res.render('main/contacts', {
                pageName: 'contacts',
                title: 'Digital-Store | Контакты'
            });
        } catch (error) {
            res.send('main/404');
        }
    });
    server.get('/comments', (req, res) => {
        try {
            res.render('main/comments', {
                pageName: 'comments',
                title: 'Digital-Store | Отзывы'
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/my-orders', (req, res) => {
        try {
            res.render('main/my-orders', {
                pageName: 'my-orders',
                title: 'Digital-Store | Мои покупки'
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/product/:id', async (req, res) => {
        const product = new Promise((resolve, reject) => {
            db.collection('items').find({
                    _id: ObjectID(req.params.id)
                }).toArray()
                .then((items) => {
                    const item = items.find(item => item);
                    resolve(item);
                });
        });

        product.then((item) => {
            return new Promise((resolve, reject) => {
                db.collection('categories').find({title: item.category}).toArray()
                    .then((categories) => {
                        const category = categories.find(category => category);
                        resolve({item,category});
                    });
            })
        })
        .then(((data) => {
            const item = data.item,
                category = data.category;
            res.render('main/product', {
                title: item.title,
                image: category.img,
                count: item.count,
                category: item.category[0].toUpperCase() + item.category.slice(1),
                price: item.price,
                description: item.description,
                date: item.date,
                id: item._id,
                type: category.type,
                format: category.format
            });
        }))
        .catch((error) => {
            res.render('main/404');
        });
    });
    server.get('/api', (req, res) => getItemsRoute(req, res, db));
}
