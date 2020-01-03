const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/admin');
}



module.exports = function (server, db) { 
    // роуты
    server.get('/control-panel', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({});
            res.render('admin/control-panel', {
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Панель управления сайтом`,
                host: req.headers.host,
                pageName: ['Главная', 'main'],
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/items', checkAuthenticated, async (req, res) => {
        try {
            const items = await db.collection('items').find({}).toArray();
            const store = await db.collection('content').findOne({});
            const count = items.length;
            res.render('admin/items', {
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Товары`,
                host: req.headers.host,
                pageName: ['Товары', 'items'],
                count: count / 2
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/categories', checkAuthenticated, async (req, res) => {
        try {
            const categories = await db.collection('categories').find({}).toArray();
            const store = await db.collection('content').findOne({});
            res.render('admin/categories', {
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Категории`,
                host: req.headers.host,
                pageName: ['Категории', 'categories'],
                categoriesCount: categories.length
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/icons', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({});
            res.render('admin/icons', {
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Категории`,
                host: req.headers.host,
                pageName: ['Иконки', 'icons']
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/content', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({});
            res.render('admin/content', {
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Контент`,
                host: req.headers.host,
                pageName: ['Контент', 'content'],
                store: {
                    title: store.title,
                    info: store.info,
                    infoBottom: store.infoBottom,
                    howToBuy: store.howToBuy,
                    contacts: store.contacts
                }
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/administrators', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({});
            res.render('admin/administrators', {
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Администраторы`,
                host: req.headers.host,
                pageName: ['Администраторы', 'administrators'],
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/database', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({});
            res.render('admin/database', {
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Настройка Базы Данных`,
                host: req.headers.host,
                pageName: ['База данных', 'database'],
            });
        } catch (error) {
            res.render('main/404');
        }
    });


    // редактирование категорий
    server.post('/control-panel/categories/create', checkAuthenticated, (req, res) => {
        try {
            const data = {
                title: req.body.title.toLowerCase().trim(),
                img: req.body.img,
                type: req.body.type,
                format: req.body.format
            }
            db.collection('categories').insertOne(data);
            res.redirect('/control-panel/categories');
        } catch {
            res.render('main/404');
        }
    });
    server.post('/control-panel/categories/delete', checkAuthenticated, (req, res) => {
        try {
            const data = JSON.parse(req.body.category);
            db.collection('categories').deleteOne({"_id": ObjectID(data.id)});
            res.redirect('/control-panel/categories');
        } catch (error) {
            console.log(error);
            res.render('main/404');
        }
    });
    server.post('/control-panel/categories/update', checkAuthenticated, (req, res) => {
        try {
            const data = {
                id: req.body.id,
                title: req.body.title.toLowerCase().trim(),
                originalTitle: req.body.originalTitle.toLowerCase().trim(),
                img: req.body.img,
                type: req.body.type,
                format: req.body.format
            }
            db.collection('categories').updateOne({"_id": ObjectID(data.id)}, {$set: {title: data.title, img: data.img, type: data.type, format: data.format}});
            db.collection('items').updateMany({"category": data.originalTitle}, {$set: {category: data.title}});
            res.redirect('/control-panel/categories');
        } catch (error) {
            res.render('main/404');
        }
    });

    // иконки
    server.post('/control-panel/icons/create', checkAuthenticated, (req, res) => {
        try {
            res.redirect('/control-panel/icons');
        } catch (error) {
            res.render('main/404');
        }
    });
    server.post('/control-panel/icons/delete', checkAuthenticated, (req, res) => {
        const path = `./dist/public/img/service-icons/${req.body.img}`
        try {
            fs.unlinkSync(path);
            res.redirect('/control-panel/icons');
        } catch (error) {
            res.render('main/404');
        }
    });

    // товары
    server.post('/control-panel/items/create', checkAuthenticated, (req, res) => {
        try {
            // документ с информацией товара для отдачи клиенту
            const item = {
                _id: new ObjectID(),
                title: req.body.title,
                count: req.body.data.split(',').length,
                price: parseFloat(req.body.price),
                category: JSON.parse(req.body.category).title,
                description: req.body.description,
                date: new Date()
            }
            // документ куда мы записываем данные товара
            const info = {
                _id: item._id,
                title: item.title,
                data: req.body.data.split(',')
            }

            db.collection('info').insertOne(info);
            db.collection('items').insertOne(item);
            res.redirect('/control-panel/items');
        } catch (error) {
            res.render('main/404');
        }
    });
    server.post('/control-panel/items/delete', checkAuthenticated, (req, res) => {
        try {
            const id = ObjectID(req.body.id);
            db.collection('items').deleteOne({"_id": id});
            db.collection('info').deleteOne({"_id": id});
            res.redirect('/control-panel/items');
        } catch (error) {
            res.render('main/404');
        }
    });
    server.post('/control-panel/items/update', checkAuthenticated, (req, res) => {
        try {
            const data = {
                id: req.body.id,
                title: req.body.title,
                price: parseFloat(req.body.price),
                description: req.body.description,
                category: JSON.parse(req.body.category),
                info: req.body.data.split(',')
            }
            db.collection('items').updateOne({"_id": ObjectID(data.id)}, {$set: {title: data.title, count: data.info.length, price: data.price, description: data.description, category: data.category.title}});
            db.collection('info').updateOne({"_id": ObjectID(data.id)}, {$set: {title: data.title, data: data.info}});
            res.redirect('/control-panel/items');
        } catch (error) {
            res.render('main/404');
        }
    });
    
    // контент
    server.post('/control-panel/content/update', checkAuthenticated, (req, res) => {
       try {
           const data = {
               title: req.body.title,
               info: req.body.info,
               infoBottom: req.body.infoBottom,
               howToBuy: req.body.howToBuy,
               contacts: req.body.contacts
           }
           db.collection('content').updateOne({}, {$set: {title: data.title, info: data.info, infoBottom: data.infoBottom, howToBuy: data.howToBuy, contacts: data.contacts}});
           res.redirect('/control-panel/content');
       } catch (error) {
           res.render('main/404');
       } 
    });
}