const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'
});
const controller = {};

controller.signup = (req, res, next) => {
  console.log(req.body.uname, req.body.pw);
  pool.query(
    'INSERT INTO Users (uname, pw) VALUES ($1, $2);',
    [req.body.uname, req.body.pw],
    (error, result) => {
      if (error) console.log(error);
      console.log('created a user!');
      next();
    }
  );
};
controller.login = (req, res, next) => {
  pool.query(
    'SELECT * FROM Users WHERE uname=$1 AND pw=$2;',
    [req.body.uname, req.body.pw],
    (error, result) => {
      if (error) next(error);
      res.locals.result = result.rows[0]; // result is undefined if there's no matching row.
      next();
    }
  );
};

module.exports = controller;
