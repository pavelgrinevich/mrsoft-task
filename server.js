const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler');
const getJSON = require('./lib/getJSON');

const app = express();

app.use(bodyParser.text());
app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/get', (req, res, next) => {
  const url = req.body;
  getJSON(url)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
