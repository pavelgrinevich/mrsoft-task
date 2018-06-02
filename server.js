const path = require('path');
const express = require('express');
const errorhandler = require('errorhandler');

const app = express();

app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
