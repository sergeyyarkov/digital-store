const MongoClient = require('mongodb').MongoClient;
const db_config = require('./database');
const express = require('express');
const server = express();
const path = require('path');

MongoClient.connect(db_config.url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.log(err)
    const db = client.db(db_config.name);

    // Config
    server.use(express.static(path.join(__dirname, '../dist/public')));
    server.set('view engine', 'pug');
    server.set('views', path.join(__dirname, '../dist/views'));

    // Routes
    require('./routes/routes')(server, db);

    // 404 Redirect
    server.use((req, res) => res.status(404).send('Error 404'));
    server.listen(3000, () => console.log('Listen port 3000...'));          
})

