const mysql = require('mysql');
const config = require('./config');

const DBName = config.get('mysql:database');

const db = mysql.createConnection({
  host: config.get('mysql:host'),
  user: config.get('mysql:user'),
  password: config.get('mysql:password'),
});
 
db.connect();

db.query(`CREATE DATABASE ${DBName}`, (err) => {
  if (err) throw err;
  console.log(`Database ${DBName} was created`);
});

db.query(`USE ${DBName}`, (err) => {
  if (err) throw err;
});
 
db.query(`CREATE TABLE Category 
  (
    Id INT PRIMARY KEY AUTO_INCREMENT, 
    Name VARCHAR(100) UNIQUE NOT NULL,
    CHECK(Name != '')
  )`, (err) => {
  if (err) throw err;
  console.log('Table Category was created');
});

db.query(`CREATE TABLE Product 
  (
    Id INT PRIMARY KEY AUTO_INCREMENT, 
    Name VARCHAR(100) UNIQUE NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Count INT UNSIGNED NOT NULL,
    Description VARCHAR(1000),
    CategoryId INT REFERENCES Category (Id),
    CHECK(Name != '')
  )`, (err) => {
  if (err) throw err;
  console.log('Table Product was created');
});

db.query(`
  INSERT Category(Name)
  VALUES 
    ('Apple'),
    ('Huawei'),
    ('Samsung')`, (err) => {
  if (err) throw err;
  console.log('Records were added to the category table');
});

db.query(`
  INSERT Product(Name, Price, Count, CategoryId)
  VALUES 
    (
      'iPhone 7', 
      300, 
      15, 
      (SELECT Id FROM Category WHERE Name='Apple')
    ),
    (
      'P20 Lite', 
      610, 
      37, 
      (SELECT Id FROM Category WHERE Name='Huawei')
    ),
    (
      'Galaxy S8', 
      670, 
      23, 
      (SELECT Id FROM Category WHERE Name='Samsung')
    )`, (err) => {
  if (err) throw err;
  console.log('Records were added to the product table');
});
 
db.end();
