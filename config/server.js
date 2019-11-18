const MongoClient = require('mongodb').MongoClient;
const db = require('./database');
const express = require('express');
const server = express();
const path = require('path');





MongoClient.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
    if (err) return console.log(err)

    // Pug config
    server.use(express.static(path.join(__dirname, '../dist/public')));
    // server.use('/css', express.static(__dirname + '../dist/public/css'));
    server.set('view engine', 'pug');
    server.set('views', path.join(__dirname, '../dist/views'));

    require('./routes/routes')(server, database);
    // 404 Redirect
    server.use((req, res) => res.status(404).send('Error 404'));
    server.listen(3000, () => console.log('Listen port 3000...'));          
})

