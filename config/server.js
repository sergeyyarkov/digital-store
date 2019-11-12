const express = require('express');
const app = express();
const path = require('path');

// Pug config
app.use(express.static(path.join(__dirname, '../dist/public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../dist/views'));


require('./routes/routes')(app);


// 404 Redirect
app.use((req, res) => res.status(404).send('Error 404'));

app.listen(3000, () => console.log('Listen port 3000...'));