const ObjectID = require('mongodb').ObjectID;

function indexRoute(req, res, dbo) {
    dbo.collection('categories').find().toArray((err, result) => {
        const categories = result.map(category => category.title[0].toUpperCase() + category.title.slice(1));
        res.render('index', {
            pageName: 'index',
            categories
        });
    });
}

// API
function getItemsRoute(req, res, dbo) {
    if (req.query.token === 'yYNfW8ynVO18L1TW5qIkILM1WtWgrVZz') {
        if (req.query.items === 'all' && !req.query.category && !req.query.sorting) {
            dbo.collection('items').find().toArray((err, result) => {
                res.send(result);
            });
        } else if (req.query.items === 'all' && req.query.sorting && !req.query.category) {
            if (req.query.sorting === 'ascending') {
                dbo.collection('items').find().sort({price: 1}).toArray((err, result) => {
                    res.send(result);
                });
            } else if (req.query.sorting === 'descending') {
                dbo.collection('items').find().sort({price: -1}).toArray((err, result) => {
                    res.send(result);
                });
            } else if (req.query.sorting === 'newer') {
                dbo.collection('items').find().sort({date: -1}).toArray((err, result) => {
                    res.send(result);
                });
            } else if (req.query.sorting === 'older') {
                dbo.collection('items').find().sort({date: 1}).toArray((err, result) => {
                    res.send(result);
                });
            } else {
                res.send('Введите параметр по убыванию или возрастанию.');
            }
        } else if (req.query.items === 'all' && req.query.category && !req.query.sorting) {
            dbo.collection('items').find({category: req.query.category}).toArray((err, result) => {
                result.length > 0
                    ? res.send(result)
                    : res.send('Такой категории не существует или там нет товаров.');
            });
        } else if (req.query.items === 'all' && req.query.category && req.query.sorting) {
            if (req.query.sorting === 'ascending') {
                dbo.collection('items').find({category: req.query.category}).sort({price: 1}).toArray((err, result) => {
                    res.send(result);
                });
            } else if (req.query.sorting === 'descending') {
                dbo.collection('items').find({category: req.query.category}).sort({price: -1}).toArray((err, result) => {
                    res.send(result);
                });
            } else if (req.query.sorting === 'newer') {
                dbo.collection('items').find({category: req.query.category}).sort({date: -1}).toArray((err, result) => {
                    res.send(result);
                });
            } else if (req.query.sorting === 'older') {
                dbo.collection('items').find({category: req.query.category}).sort({date: 1}).toArray((err, result) => {
                    res.send(result);
                });
            } else {
                res.send('Введите параметр по убыванию или возрастанию.');
            }
        } else if (req.query.categories === 'all') {
            dbo.collection('categories').find().toArray((err, result) => {
                res.send(result);
            });
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

function onePageItemRoute(req, res, dbo) {
    try {
        dbo.collection('items').find({_id: ObjectID(req.params.id)}).toArray((err, result) => {
            const item = result[0];
            dbo.collection('categories').find({title: item.category}).toArray((err, result) => {
                const category = result[0];
                res.render('product', {
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
                })
            });
        })
    } catch (error) {
        res.send('Error 404');
    }
}

function howToBuyRoute(req, res) {
    res.render('how-to-buy', {
        pageName: 'how-to-buy'
    });
}

function contactsRoute(req, res) {
    res.render('contacts', {
        pageName: 'contacts'
    });
}

function commentsRoute(req, res) {
    res.render('comments', {
        pageName: 'comments'
    });
}

function myOrdersRoute(req, res) {
    res.render('my-orders', {
        pageName: 'my-orders'
    });
}

module.exports = function (server, db) {
    server.get('/', (req, res) => indexRoute(req, res, db));
    server.get('/api', (req, res) => getItemsRoute(req, res, db));
    server.get('/how-to-buy', (req, res) => howToBuyRoute(req, res, db));
    server.get('/contacts', (req, res) => contactsRoute(req, res, db));
    server.get('/comments', (req, res) => commentsRoute(req, res, db));
    server.get('/my-orders', (req, res) => myOrdersRoute(req, res, db));
    server.get('/product/:id', (req, res) => onePageItemRoute(req, res, db));
}
