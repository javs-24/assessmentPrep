const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://jzhdflks:V5l-IjqVYrLewLkKnqsb0GkVZypj1X6r@raja.db.elephantsql.com:5432/jzhdflks'
});

pool.query('CREATE TABLE IF NOT EXISTS sessions(session_id SERIAL PRIMARY KEY, cookie_id VARCHAR NOT NULL, created_at DATE NOT NULL DEFAULT CURRENT_DATE);',
  (err, result) => {
    if (err) console.error('DB ERROR CREATING sessions TABLE:\n' + err);    
  }
);

const controller = {};

controller.isLoggedIn = (req, res, next) => {
  console.log('\n---invoking isLoggedIn middleware---');
  console.log('The client sent this ssid in a cookie = ', req.cookies.ssid);
  const ssidParam = [req.cookies.ssid]
  pool.query(
    'SELECT * FROM sessions WHERE cookie_id=$1;',
    ssidParam,
    (err, result) => {
      if (err) return next('DB ERROR FINDING A SESSION:\n' + err);
      if (!result.rows[0]) return next('PROBLEM VERIFYING SESSION: Need to log in');
      console.log('Verified that the user is logged in, by finding this session row', result.rows[0])
      next();
    }
  );
};

controller.startSession = (req, res, next) => {
  console.log('\n---invoking startSession middleware---');
  const randomSSID = Math.floor(Math.random() * 1000);
  const params = [randomSSID];

  pool.query(
    'INSERT INTO sessions (cookie_id) VALUES ($1) RETURNING cookie_id',
    params,
    (err, result) => {
      if (err) return next('\nDB ERROR CREATING A SESSION:\n' + err);
      console.log('Session row successfuly created = ', result.rows[0].cookie_id);
      res.locals.ssid = result.rows[0].cookie_id;
      next();
    }
  );
};

module.exports = controller;
