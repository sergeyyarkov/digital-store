const fs = require('fs');
const ObjectID = require('mongodb').ObjectID;

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/admin');
}

module.exports = function(server, db) {
    server.get('/api/items', async (req, res) => {
        if (req.query.q) {
            try {
                const items = await db.collection('items').find({title: {$regex: req.query.q, $options: "i"}}, {limit: 5}).toArray();
                res.json(items);  
            } catch {
                res.status(500).render('main/404');
            }    
        } else {
            try {
                const items = await db.collection('items').find({}).toArray(),
                    info = await db.collection('info').find({}).toArray(),
                    sortBy = req.query.sorting;


                if (items.length > 0) {
                    // устанавливаем count для каждого товара.
                    info.forEach(info => db.collection('items').updateOne({
                        "_id": ObjectID(info._id)
                    }, {
                        $set: {
                            count: info.data.length
                        }
                    }));
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
                } else res.send({
                    error: 'Товаров в магазине пока что нет.'
                });
            } catch {
                res.status(500).render('main/404');
            } 
        }   
    });

    server.get('/api/items/id/:id', async (req, res) => {
        try {
            const item = await db.collection('items').findOne({_id: ObjectID(req.params.id)})
            res.json(item)
        } catch {
            res.status(500).render('main/404');
        }
    });

    server.get('/api/items/page/:page', async (req, res) => {
        try {
            const page = parseInt(req.params.page),
                limit = 5,
                items = await db.collection('items').find({}, {skip: limit * (page - 1), limit}).toArray();
            items.length > 0 && !isNaN(page) ? res.json(items) : res.json({error: 'Такой страницы не существует.'});
        } catch {
            res.status(500).render('main/404');
        }
    });

    server.get('/api/items/data', checkAuthenticated, async (req, res) => {
        try {
            const data = await db.collection('info').find({}).toArray();
            res.json(data);
        } catch {
            res.status(500).render('main/404');
        }
    });

    server.get('/api/items/data/:id', checkAuthenticated, async (req, res) => {
        try {
            const data = await db.collection('info').findOne({_id: ObjectID(req.params.id)});
            res.json(data)
        } catch {
            res.status(500).render('main/404');
        }
    })

    server.get('/api/buyers', checkAuthenticated, async (req, res) => {
        try {
            const buyers = await db.collection('buyers').find({}).toArray();
            if (buyers.length > 0) {
                res.json(buyers);  
            } else res.send({
                error: 'Покупателей в магазине пока что нет.'
            });
        } catch {
            res.status(500).render('main/404');
        }
    });

    server.get('/api/buyers/:bill_id', checkAuthenticated, async (req, res) => {
        try {
            const buyers = await db.collection('buyers').findOne({bill_id: req.params.bill_id});
            res.json(buyers);
        } catch {
            res.status(500).render('main/404');
        }
    });

    server.get('/api/buyers/page/:page', checkAuthenticated, async (req, res) => {
        try {
            const page = parseInt(req.params.page),
                limit = 5,
                buyers = await db.collection('buyers').find({}, {skip: limit * (page - 1), limit}).toArray();
            buyers.length > 0 && !isNaN(page) ? res.json(buyers) : res.json({error: 'Такой страницы не существует.'});
        } catch {
            res.status(500).render('main/404');
        }
    });
    
    server.get('/api/items/:category', async (req, res) => {
        try {
          const items = await db.collection('items').find({
                  category: req.params.category
              }).toArray(),
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
          } else res.send({
              error: 'Товаров в магазине пока что нет.'
          });
        } catch {
            res.status(500).render('main/404');
        }
    });
    
    server.get('/api/categories', async (req, res) => {
        try {
            const categories = await db.collection('categories').find({}).toArray();
            categories.length > 0 ? res.json(categories) : res.send({error: 'Категорий в магазине пока что нет.'});  
        } catch {
            res.status(500).render('main/404');
        }
    });
    
    server.get('/api/category/:category', async (req, res) => {
        try {
            const category = await db.collection('categories').find({title: req.params.category}).toArray();
            category.length > 0 ? res.json(category) : res.send({error: 'Такой категории не существует.'});  
        } catch {
            res.status(500).render('main/404');
        }
    });

    server.get('/api/category/id/:id', async (req, res) => {
        try {
            const category = await db.collection('categories').findOne({_id: ObjectID(req.params.id)});
            res.json(category)
        } catch {
            res.status(500).render('main/404');
        }
    })

    server.get('/api/icons', checkAuthenticated, (req, res) => {
        try {
            const icons = fs.readdirSync('dist/public/img/service-icons');
            res.json(icons);  
        } catch {
            res.status(500).render('main/404');
        }
    });
}