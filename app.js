const path = require('path');
const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser')
const config = require('./config');
const query = require('./lib/query');

const app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  query.getAllCategories()
    .then((data) => {
      res.render('index', {
        categories: data,
      });
    })
    .catch((err) => {
      next(err);
    });
});

app.post('/productlist', (req, res, next) => {
  const idList = req.body;
  query.getProducts(idList)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

app.listen(config.get('port'), () => {
  console.log(`server listening on port ${config.get('port')}`);
});
