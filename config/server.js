const express = require('express');
const app = express();
const path = require('path');

// Pug config
app.use(express.static('public'));
app.set('view engine', 'pug');
// Path to renred files
app.set('views', path.join(__dirname, '../dist/views'));

// Routes
require('./routes/routes')(app);
// 404 Redirect
app.use((req, res) => res.status(404).send('Error 404'));


app.listen(3000, () => console.log('Listen port 3000...'));