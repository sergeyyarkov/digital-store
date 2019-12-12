if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const MongoClient = require('mongodb').MongoClient;
const db_config = require('./database');
const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

MongoClient.connect(db_config.url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.log(err)
    const db = client.db(db_config.name);

    // Config
    server.use(cors())
    server.use(express.static(path.join(__dirname, '../dist/public')));
    server.use(express.urlencoded({ extended: false }));
    server.use(flash());
    server.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(methodOverride('_method'));

    server.set('view engine', 'pug');
    server.set('views', path.join(__dirname, '../dist/views'));

    // Routes
    require('./routes/routes')(server, db);
    require('./routes/admin')(server, db);

    // 404 Redirect
    server.use((req, res) => res.status(404).render('404'));
    server.listen(3000, () => console.log('Listen port 3000...'));          
})

