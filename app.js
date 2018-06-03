const path = require('path');
const express = require('express');
const errorhandler = require('errorhandler');
const config = require('./config');

const app = express();

app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.get('port'), () => {
  console.log(`server listening on port ${config.get('port')}`);
});
