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
    Id INT PRIMARY KEY UNIQUE NOT NULL , 
    Name VARCHAR(100) UNIQUE NOT NULL,
    CHECK(Name != '')
  )`, (err) => {
  if (err) throw err;
  console.log('Table Category was created');
});

db.query(`CREATE TABLE Product 
  (
    Id INT PRIMARY KEY UNIQUE NOT NULL , 
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
  INSERT Category(Id, Name)
  VALUES 
    (11, 'Apple'),
    (12, 'Huawei'),
    (13, 'Samsung')`, (err) => {
  if (err) throw err;
  console.log('Records were added to the category table');
});

db.query(`
  INSERT Product(Id, Name, Price, Count, CategoryId)
  VALUES 
    (1234, 'iPhone 7', 300, 15, 11),
    (1235, 'P20 Lite', 610, 37, 12),
    (1236, 'Galaxy S8', 670, 23, 13)`, (err) => {
  if (err) throw err;
  console.log('Records were added to the product table');
});
 
db.end();
