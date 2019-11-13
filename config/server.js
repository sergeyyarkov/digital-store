const express = require('express');
const server = express();
const path = require('path');

// Pug config
server.use(express.static(path.join(__dirname, '../dist/public')));
server.set('view engine', 'pug');
server.set('views', path.join(__dirname, '../dist/views'));

require('./routes/routes')(server);

// 404 Redirect
server.use((req, res) => res.status(404).send('Error 404'));

server.listen(3000, () => console.log('Listen port 3000...'));