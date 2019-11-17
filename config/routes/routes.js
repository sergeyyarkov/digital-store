const MongoClient = require('mongodb').MongoClient;
const routes = {
    // Index
    indexRoute: function (req, res) {
        MongoClient.connect('mongodb://localhost:27017/digital_store', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, db) => {
            if (err) throw err;

            const dbo = db.db('digital_store');
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
                db.close();
            })
        });
    },

    // How-to-buy
    howToBuyRoute: function (req, res) {
        res.render('how-to-buy', {
            pageName: 'how-to-buy'
        });
    },

    // Contacts
    contactsRoute: function (req, res) {
        res.render('contacts', {
            pageName: 'contacts'
        });
    },

    // Comments
    commentsRoute: function (req, res) {
        res.render('comments', {
            pageName: 'comments'
        });
    },

    // My-orders
    myOrdersRoute: function (req, res) {
        res.render('my-orders', {
            pageName: 'my-orders'
        });
    },

    // GetItems
    getItemsRoute: function (req, res) {
        const queryOptions = {
            auth: 'yYNfW8ynVO18L1TW5qIkILM1WtWgrVZz',
            option: 'all'
        }
        res.setHeader("Cache-Control", "public, max-age=20");

        if (req.query.auth === queryOptions.auth) {
            if (req.query.option === queryOptions.option) {
                MongoClient.connect('mongodb://localhost:27017/digital_store', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, db) => {
                    if (err) throw err;

                    const dbo = db.db('digital_store');
                    dbo.collection('storeInfo').find().toArray((err, result) => {
                        if (err) throw err;
                        res.send(result[0].items);
                        db.close();
                    })
                });
            } else if (!req.query.option && req.query.category) {
                MongoClient.connect('mongodb://localhost:27017/digital_store', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, db) => {
                    if (err) throw err;

                    const dbo = db.db('digital_store');
                    dbo.collection('storeInfo').find().toArray((err, result) => {
                        if (err) throw err;
                        const query = result[0].items[req.query.category]
                        if (query != undefined) {
                            res.send(query);
                        } else {
                            res.send('Товары в этой категории не найдены или такой категории нет')
                        }
                        db.close();
                    })
                });
            } else {
                res.send('Запрос неверный');
            }
        } else {
            res.send('Неверный токен');
        }
    }
}

module.exports = function (server) {
    server.get('/', routes.indexRoute);
    server.get('/how-to-buy', routes.howToBuyRoute);
    server.get('/contacts', routes.contactsRoute);
    server.get('/comments', routes.commentsRoute);
    server.get('/my-orders', routes.myOrdersRoute);
    server.get('/store-api', routes.getItemsRoute);
}