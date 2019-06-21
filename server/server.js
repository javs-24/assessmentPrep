const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const userController = require('./controllers/sql/userController');
const todoController = require('./controllers/sql/todoController');
const cookieController = require('./controllers/sql/cookieController');
const sessionController = require('./controllers/sql/sessionController');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'client'))); // serves all static files located in the client folder

app.get('/');

app.post('/signup', userController.signup, (req, res) => {
  res.status(200).send('u signed up!');
});
app.post('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals.result);
});
app.get('/getAllTodos/:uname', todoController.getAllTodos, (req, res) => {
  res.status(200).json(res.locals.result);
});
app.post('/newTodo', todoController.newTodo, (req, res) => {
  res.status(200).json(res.locals.result);
});
app.delete('/deleteTodo', todoController.deleteTodo, (req, res) => {
  res.status(200).send('u deleted a todo u monster');
});

app.use((err, req, res, next) => {
  // global error handler
  console.error(err);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('listening on port 3000 yeet');
});
