const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'
});
const controller = {};
/////////
controller.getAllTodos = (req, res, next) => {
  pool.query(
    'SELECT * FROM Todos WHERE uname=$1;',
    [req.params.uname],
    (error, result) => {
      if (error) console.log(error);
      res.locals.result = result.rows;
      next();
    }
  );
};
controller.newTodo = (req, res, next) => {
  pool.query(
    'INSERT INTO Todos (uname, text) VALUES ($1, $2) RETURNING todo_id',
    [req.body.uname, req.body.text],
    (error, result) => {
      if (error) console.log(error);
      res.locals.result = result.rows[0];
      console.log('created a todo !');
      next();
    }
  );
};
controller.deleteTodo = (req, res, next) => {
  // need to send in the todo_id to this!!
  pool.query(
    'DELETE FROM Todos WHERE todo_id=$1',
    [req.body.todo_id],
    (error, result) => {
      if (error) console.log(error);
      console.log('deleted a todo !');
      next();
    }
  );
};

// controller.signup({ body: { uname: 'bob', pw: 'dole' } });

module.exports = controller;
