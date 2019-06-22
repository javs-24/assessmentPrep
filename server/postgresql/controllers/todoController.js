const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://jzhdflks:V5l-IjqVYrLewLkKnqsb0GkVZypj1X6r@raja.db.elephantsql.com:5432/jzhdflks'
});

pool.query('CREATE TABLE IF NOT EXISTS todos(todo_id SERIAL PRIMARY KEY, uname VARCHAR(40) NOT NULL, text VARCHAR(255) NOT NULL);',
(err, result) => {
  if (err) return next('DB ERROR CREATING todos TABLE:\n' + err);    
}
);

const controller = {};

controller.getAllTodos = (req, res, next) => {
  console.log('\n---invoking getAllTodos middleware---')
  const params = [req.params.uname]
  pool.query(
    'SELECT * FROM Todos WHERE uname=$1;',
    params,
    (err, result) => {
      if (err) return next('DB ERROR FINDING ALL TODOS:\n' + err);
      res.locals.todos = result.rows;
      console.log('saved all todos in res.locals.todos = ', result.rows);
      next();
    }
  );
};

controller.newTodo = (req, res, next) => {
  console.log('\n---invoking newTodo middleware---')
  const params = [req.body.uname, req.body.text];

  pool.query(
    'INSERT INTO Todos (uname, text) VALUES ($1, $2) RETURNING *',
    params,
    (err, result) => {
      if (err) return next('DB ERROR CREATING A TODO:\n' + err);
      res.locals.todo = result.rows[0];
      console.log('saved the todo in res.locals.todo = ', result.rows[0]);
      next();
    }
  );
};
controller.deleteTodo = (req, res, next) => {
  console.log('\n---invoking deleteTodo middleware---');
  const params = [req.body.todo_id];
  pool.query(
    'DELETE FROM Todos WHERE todo_id=$1 RETURNING *',
    params,
    (err, result) => {
      const todo = result.rows[0];
      if (err) return next('DB ERROR DELETING A TODO:\n' + err);
      if (!todo) return next('DB ERROR DELETING A TODO: Todo does not exits');
      res.locals.todo = result.rows[0];
      console.log('saved the todo in res.locals.todo = ', result.rows[0]);
      next();
    }
  );
};

// controller.signup({ body: { uname: 'bob', pw: 'dole' } });

module.exports = controller;
