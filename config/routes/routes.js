const db = require('../database');
const dbName = db.name;

function indexRoute(req, res, db) {
    const dbo = db.db(dbName);
    
    dbo.collection('storeInfo').find().toArray((err, result) => {
        if (err) throw err;
        const array = Object.keys(result[0].items)
        const categories = array.map(cat => {
            return cat[0].toUpperCase() + cat.slice(1);
        });
        res.render('index', {
            pageName: 'index',
            categories
        });
    })
}

function getItemsRoute(req, res, db) {
    const dbo = db.db(dbName);

    const queryOptions = {
        auth: 'yYNfW8ynVO18L1TW5qIkILM1WtWgrVZz',
        option: 'all'
    }

    // установка кэша при отдачи json данных
    //res.setHeader("Cache-Control", "public, max-age=20");

    if (req.query.auth === queryOptions.auth) {
        if (req.query.option === queryOptions.option) {
            dbo.collection('storeInfo').find().toArray((err, result) => {
                if (err) throw err;
                res.send(result[0].items);
            })

        } else if (!req.query.option && req.query.category) {
            dbo.collection('storeInfo').find().toArray((err, result) => {
                if (err) throw err;
                const query = result[0].items[req.query.category]
                if (query != undefined) {
                    res.send(query);
                } else {
                    res.send('Товары в этой категории не найдены или такой категории нет')
                }
            })
        } else if (!req.query.option && req.query.sortByAll === 'ascending') {
            dbo.collection('storeInfo').find().toArray((err, result) => {
                if (err) throw err;
                const items = result[0].items;
                Object.values(items).forEach(arr => arr.sort((a, b) => a.price - b.price)) // фильтр по возрастанию
                res.send(items);
            });
        } else if (!req.query.option && req.query.sortByAll === 'descending') {
            dbo.collection('storeInfo').find().toArray((err, result) => {
                if (err) throw err;
                const items = result[0].items;
                Object.values(items).forEach(arr => arr.sort((a, b) => a.price + b.price)) // фильтр по убыванию
                res.send(items);
            })
        } else {
            res.send('Запрос неверный');
        }
    } else {
        res.send('Неверный токен');
    }
}

function onePageItemRoute(req, res, db) {
    const dbo = db.db(dbName);

    dbo.collection('storeInfo').find().toArray((err, result) => {
        if (err) throw err;
        const items = result[0].items;
        const keys = Object.keys(result[0].items);
        let itemFind = false;
        keys.forEach(key => {
            items[key].forEach(item => {
                if (item._id != undefined) {
                    if (item._id == req.params.id) {
                        itemFind = true;
                        res.render('product', {
                            title: item.title,
                            image: item.image,
                            count: item.count,
                            category: item.category[0].toUpperCase() + item.category.slice(1),
                            price: item.price,
                            description: item.description
                        });
                    }
                }
            })
        });
        if (!itemFind) res.send('Error 404');
    })
}

function howToBuyRoute(req, res, db) {
    res.render('how-to-buy', {
        pageName: 'how-to-buy'
    });
}

function contactsRoute(req, res, db) {
    res.render('contacts', {
        pageName: 'contacts'
    });
}

function commentsRoute(req, res, db) {
    res.render('comments', {
        pageName: 'comments'
    });
}

function myOrdersRoute(req, res, db) {
    res.render('my-orders', {
        pageName: 'my-orders'
    });
}


module.exports = function (server, db) {
    server.get('/', (req, res) => indexRoute(req, res, db));
    server.get('/how-to-buy', (req, res) => howToBuyRoute(req, res, db));
    server.get('/contacts', (req, res) => contactsRoute(req, res, db));
    server.get('/comments', (req, res) => commentsRoute(req, res, db));
    server.get('/my-orders', (req, res) => myOrdersRoute(req, res, db));
    server.get('/product/:id', (req, res) => onePageItemRoute(req, res, db));
    server.get('/store-api', (req, res) => getItemsRoute(req, res, db));
}