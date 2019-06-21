const { Pool } = require('pg');
const pool = new Pool({
  user: 'infkismr',
  password: 'd6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-'
});
// 'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'

const controller = {};

// had to create tables using command line.
const CREATE_TODOS_TABLE =
  'CREATE TABLE IF NOT EXISTS Todos(todo_id INT PRIMARY KEY, uname VARCHAR(100) NOT NULL, text VARCHAR(100) NOT NULL);';

const CREATE_USERS_TABLE =
  'CREATE TABLE IF NOT EXISTS Users(user_id INT PRIMARY KEY, uname VARCHAR(100) NOT NULL, pw VARCHAR(100) NOT NULL);';

pool.query(CREATE_TODOS_TABLE, (err, res) => {
  console.log('successfully created todos table! ');
});

pool.query(CREATE_USERS_TABLE, (err, res) => {
  console.log('successfully created Users table! ');
});

controller.signup = (req, res) => {
  pool.query(
    'INSERT INTO Users (uname, pw) VALUES ($1, $2)',
    [req.body.uname, req.body.pw],
    (error, result) => {
      if (error) next(error);
      next();
    }
  );
};
controller.login = (req, res) => {
  next();
};
controller.getAllTodos = (req, res) => {
  next();
};
controller.newTodo = (req, res) => {
  next();
};
controller.deleteTodo = (req, res) => {
  next();
};

controller.signup({ body: {} });

module.exports = controller;
