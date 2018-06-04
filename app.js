const path = require('path');
const express = require('express');
const errorhandler = require('errorhandler');
const config = require('./config');

const app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(config.get('port'), () => {
  console.log(`server listening on port ${config.get('port')}`);
});
