const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://jzhdflks:V5l-IjqVYrLewLkKnqsb0GkVZypj1X6r@raja.db.elephantsql.com:5432/jzhdflks'
});
const controller = {};

pool.query('CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, uname VARCHAR(40) NOT NULL UNIQUE, pw VARCHAR(40) NOT NULL);',
  (err, result) => {
    if (err) return next('DB ERROR CREATING users TABLE:\n' + err);    
  }
);

controller.signup = (req, res, next) => {
  console.log(req.body.uname, req.body.pw);
  pool.query(
    'INSERT INTO Users (uname, pw) VALUES ($1, $2) RETURNING user_id;',
    [req.body.uname, req.body.pw],
    (error, result) => {
      console.log('created a user!', result);
      if (error) return next(error);
      res.locals.ssid = result.rows[0].user_id;
      next();
    }
  );
};

controller.login = (req, res, next) => {
  console.log('\n---invoking Login middleware---')
  const params = [req.body.uname, req.body.pw]
  pool.query(
    'SELECT * FROM Users WHERE uname=$1 AND pw=$2;',
    params,
    (err, result) => {
      if (err) return next('DB ERROR FINDING A USER:\n' + err);
      const user = result.rows[0];
      if (!user) return next('DB ERROR FINDING A USER: User does not exist');
      res.locals.ssid = user.user_id;
      console.log('saved user.id in res.locals.ssid =', user.user_id);
      next();
    }
  );
};

module.exports = controller;
