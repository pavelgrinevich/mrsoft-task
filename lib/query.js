const mysql = require('mysql');
const config = require('../config');

const db = mysql.createPool({
  connectionLimit: 10,
  host: config.get('mysql:host'),
  user: config.get('mysql:user'),
  password: config.get('mysql:password'),
  database: config.get('mysql:database'),
});

function getAllCategories() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Category', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function getProducts(idList) {
  let query = 'SELECT * FROM Product WHERE';

  query = idList.reduce((query, current, i, arr) => {
    return (i === (arr.length - 1)) 
      ? `${query} CategoryId = ${current}`
      : `${query} CategoryId = ${current} OR`;
  }, query);

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

module.exports.getAllCategories = getAllCategories;
module.exports.getProducts = getProducts;
