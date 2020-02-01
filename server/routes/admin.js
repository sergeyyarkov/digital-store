const passport = require('passport');
const initializePassport = require('../config/passport.config');

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/control-panel');
    next();
}

async function loginRoute(req, res, db) {
    const store = await db.collection('content').findOne({});
    res.render('admin/admin', {
        title: `${store.title} | Вход в панель управления сайтом`
    })
}

module.exports = function (server, db) {
    server.get('/admin', checkNotAuthenticated, (req, res) => {
        db.collection('administrators').find().toArray((err, result) => {
            initializePassport(
                passport, 
                email => result.find(user => user.email === email),
                id => result.find(user => user.id === id)
            ); 
        });
        loginRoute(req, res, db);
    });
    server.post('/admin', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/control-panel',
        failureRedirect: '/admin',
        failureFlash: true
    }));
    server.delete('/logout', (req, res) => {
        req.logOut();
        res.redirect('/admin');
    });
}