const bcrypt = require('bcryptjs');
const passport = require('passport');

const initializePassport = require('../passport.config');

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/control-panel');
    }
    next();
}

function loginRoute(req, res) {
    res.render('admin')
    
}

// function registerRoute(req, res) {
//     res.render('register')
// }

module.exports = function (server, db) {
    server.get('/admin', checkNotAuthenticated, (req, res) => {
        db.collection('administrators').find().toArray((err, result) => {
            initializePassport(
                passport, 
                email => result.find(user => user.email === email),
                id => result.find(user => user.id === id)
            ); 
        });
        loginRoute(req, res);
    });
    // Отдача страницы с регистрацией
    //server.get('/register', checkNotAuthenticated, (req, res) => registerRoute(req, res));
    server.post('/admin', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/control-panel',
        failureRedirect: '/admin',
        failureFlash: true
    }))
    // Регистрация админа через форму POST
    // server.post('/register', checkNotAuthenticated, async (req, res) => {
    //     try {
    //         const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //         db.collection('administrators').insertOne({
    //             id: Date.now().toString(),
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: hashedPassword
    //         });
    //         res.redirect('/admin');
    //     } catch {
    //         res.redirect('/register');
    //     }
    // });
    server.delete('/logout', (req, res) => {
        req.logOut();
        res.redirect('/admin');
    })
}