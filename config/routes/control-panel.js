const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/admin');
}

module.exports = function(server, db) {
    server.get('/control-panel', checkAuthenticated, (req, res) => {
        try {
            res.render('admin/control-panel', {
                name: req.user.name,
                email: req.user.email,
                title: 'Digital-Store | Панель управления сайтом',
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
            const count = items.length;
            res.render('admin/items', {
                name: req.user.name,
                email: req.user.email,
                title: 'Digital-Store | Товары',
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
            res.render('admin/categories', {
                name: req.user.name,
                email: req.user.email,
                title: 'Digital-Store | Категории',
                host: req.headers.host,
                pageName: ['Категории', 'categories'],
                categoriesCount: categories.length
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/content', checkAuthenticated, (req, res) => {
        try {
            res.render('admin/content', {
                name: req.user.name,
                email: req.user.email,
                title: 'Digital-Store | Контент',
                host: req.headers.host,
                pageName: ['Контент', 'content'],
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/administrators', checkAuthenticated, (req, res) => {
        try {
            res.render('admin/administrators', {
                name: req.user.name,
                email: req.user.email,
                title: 'Digital-Store | Администраторы',
                host: req.headers.host,
                pageName: ['Администраторы', 'administrators'],
            });
        } catch (error) {
            res.render('main/404');
        }
    });
    server.get('/control-panel/database', checkAuthenticated, (req, res) => {
        try {
            res.render('admin/database', {
                name: req.user.name,
                email: req.user.email,
                title: 'Digital-Store | Настройка Базы Данных',
                host: req.headers.host,
                pageName: ['База данных', 'database'],
            });
        } catch (error) {
            res.render('main/404');
        }
    });

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
    server.post('/control-panel/categories/addicon', checkAuthenticated, (req, res) => {
        try {
            res.redirect('/control-panel/categories');
        } catch (error) {
            res.render('main/404');
        }
    });
    server.post('/control-panel/categories/dellicon', checkAuthenticated, (req, res) => {
        const path = `./dist/public/img/service-icons/${req.body.img}`
        try {
            fs.unlinkSync(path);
            res.redirect('/control-panel/categories');
        } catch (error) {
            res.render('main/404');
        }
    });
}