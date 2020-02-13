const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const bcrypt = require('bcryptjs');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/admin');
}

module.exports = function (server, db) {
    server.get('/control-panel', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({}),
                buyers = await db.collection('buyers').find({}).toArray(),
                items = await db.collection('items').find({}).toArray(); 
                
            // считаем сумму проданных товаров
            const sum = () => {
                let result = 0;
                for (let i = 0; i < buyers.length; i++) {    
                    result += buyers[i].amount;  
                }
                return result;
            }

            // считаем кол-во проданных товаров
            const quantitySold = () => {
                let result = 0;
                for (let i = 0; i < buyers.length; i++) {    
                    result += buyers[i].data.length;  
                }
                return result;
            }

            // общее кол-во товаров в магазине
            const itemsAmount = () => {
                let result = 0;
                for (let i = 0; i < items.length; i++) {    
                    result += items[i].count;
                }
                return result;
            }
            
            res.render('admin/control-panel', {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Панель управления сайтом`,
                host: req.headers.host,
                pageName: ['Главная', 'main'],
                sum: sum(),
                quantitySold: quantitySold(),
                count: itemsAmount()
            });
        } catch {
            res.status(500).render('main/404');
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
        } catch {
            res.status(500).render('main/404');
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
        } catch {
            res.status(500).render('main/404');
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
        } catch {
            res.status(500).render('main/404');
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
                    email: store.email,
                    info: store.info,
                    infoBottom: store.infoBottom,
                    howToBuy: store.howToBuy,
                    contacts: store.contacts,
                    recommendations: store.recommendations
                }
            });
        } catch {
            res.status(500).render('main/404');
        }
    });
    server.get('/control-panel/administrators', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({});
            res.render('admin/administrators', {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Администраторы`,
                host: req.headers.host,
                pageName: ['Администраторы', 'administrators'],
            });
        } catch {
            res.status(500).render('main/404');
        }
    });

    server.get('/control-panel/theme', checkAuthenticated, async (req, res) => {
        try {
            const store = await db.collection('content').findOne({});
            res.render('admin/theme', {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                title: `${store.title} | Оформление`,
                host: req.headers.host,
                pageName: ['Оформление', 'theme'],
                color: store.color
            });
        } catch {
            res.status(500).render('main/404');
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
            res.status(500).render('main/404');
        }
    });
    server.post('/control-panel/categories/delete', checkAuthenticated, (req, res) => {
        try {
            db.collection('categories').deleteOne({"_id": ObjectID(req.body.category)});
            res.redirect('/control-panel/categories');
        } catch {
            res.status(500).render('main/404');
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
        } catch {
            res.status(500).render('main/404');
        }
    });

    // иконки
    server.post('/control-panel/icons/create', checkAuthenticated, (req, res) => {
        try {
            res.redirect('/control-panel/icons');
        } catch {
            res.status(500).render('main/404');
        }
    });
    server.post('/control-panel/icons/delete', checkAuthenticated, (req, res) => {
        const path = `./dist/public/img/service-icons/${req.body.img}`
        try {
            fs.unlinkSync(path);
            res.redirect('/control-panel/icons');
        } catch {
            res.status(500).render('main/404');
        }
    });

    // товары
    server.post('/control-panel/items/create', checkAuthenticated, async (req, res) => {
        try {
            const category = await db.collection('categories').findOne({_id: ObjectID(req.body.category)})
            // документ с информацией товара для отдачи клиенту
            const item = {
                _id: new ObjectID(),
                title: req.body.title,
                count: req.body.data.split(',').length,
                price: parseFloat(req.body.price),
                category: category.title,
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
        } catch {
            res.status(500).render('main/404');
        }
    });
    server.post('/control-panel/items/delete', checkAuthenticated, (req, res) => {
        try {
            const id = ObjectID(req.body.id);
            db.collection('items').deleteOne({"_id": id});
            db.collection('info').deleteOne({"_id": id});
            res.redirect('/control-panel/items');
        } catch {
            res.render('main/404');
        }
    });
    server.post('/control-panel/items/update', checkAuthenticated, async (req, res) => {
        try {
            const category = await db.collection('categories').findOne({_id: ObjectID(req.body.category)})
            const data = {
                id: req.body.id,
                title: req.body.title,
                price: parseFloat(req.body.price),
                description: req.body.description,
                category,
                info: req.body.data.split(',')
            }
            db.collection('items').updateOne({"_id": ObjectID(data.id)}, {$set: {title: data.title, price: data.price, description: data.description, category: category.title}});
            db.collection('info').updateOne({"_id": ObjectID(data.id)}, {$set: {title: data.title, data: data.info}});
            res.redirect('/control-panel/items');
        } catch {
            res.status(500).render('main/404');
        }
    });
    
    // контент
    server.post('/control-panel/content/update', checkAuthenticated, (req, res) => {
       try {
           const data = {
               title: req.body.title,
               info: req.body.info,
               email: req.body.email,
               infoBottom: req.body.infoBottom,
               howToBuy: req.body.howToBuy,
               contacts: req.body.contacts,
               recommendations: req.body.recommendations
           }
           db.collection('content').updateOne({}, {$set: {title: data.title, email: data.email, info: data.info, infoBottom: data.infoBottom, howToBuy: data.howToBuy, contacts: data.contacts, recommendations: data.recommendations}});
           res.redirect('/control-panel/content');
       } catch {
            res.status(500).render('main/404');
       } 
    });

    // администратор
    server.post('/control-panel/administrators/update', checkAuthenticated, async (req, res) => {
        try {
            const data = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                oldPass: req.body.oldPass,
                newPass: req.body.newPass
            }
            const admin = await db.collection('administrators').findOne({id: data.id});
            if (await bcrypt.compare(data.oldPass, admin.password)) {
                const hashedPassword = await bcrypt.hash(data.newPass, 10);
                db.collection('administrators').updateOne({id: data.id}, {$set: {name: data.name, email: data.email, password: hashedPassword}});
                req.user.name = data.name;
                req.user.email = data.email;
                req.user.password = hashedPassword;
                res.send('Данные успешно изменены.');
            } else res.send('Неверный пароль.');
        } catch {
            res.status(500).render('main/404');
        }
    });

    // формление
    server.post('/control-panel/theme/update', checkAuthenticated, (req, res) => {
        try {
            const data = {
                color: req.body.color
            }
            db.collection('content').updateOne({}, {$set: {color: data.color}});
            res.redirect('/control-panel/theme');
        } catch {
             res.status(500).render('main/404');
        } 
     });
}