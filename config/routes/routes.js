const MongoClient = require('mongodb').MongoClient;
const routes = {
    // Index
    indexRoute: function(req, res) {
        res.render('index', {
            pageName: 'index'
        });
    }, 

    // How-to-buy
    howToBuyRoute: function(req, res) {
        res.render('how-to-buy', {
            pageName: 'how-to-buy'
        });
    },

    // Contacts
    contactsRoute: function(req, res) {
        res.render('contacts', {
            pageName: 'contacts'
        });
    },

    // Comments
    commentsRoute: function(req, res) {
        res.render('comments', {
            pageName: 'comments'
        });
    },
    
    // My-orders
    myOrdersRoute: function(req, res) {
        res.render('my-orders', {
            pageName: 'my-orders'
        });
    },

    // GetItems
    getItemsRoute: function(req, res) {
        const queryOptions = {
            auth: 'yYNfW8ynVO18L1TW5qIkILM1WtWgrVZz',
            option: 'all'
        }

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
                        res.send(result);
                        db.close();
                    })
                });
            } else {
                res.send('Invalid');
            }
        } else {
            res.send('Invalid');
        }
    }
}

module.exports = function(server) {
    server.get('/', routes.indexRoute);
    server.get('/how-to-buy', routes.howToBuyRoute);
    server.get('/contacts', routes.contactsRoute);
    server.get('/comments', routes.commentsRoute);
    server.get('/my-orders', routes.myOrdersRoute);
    server.get('/store-api', routes.getItemsRoute);
}
