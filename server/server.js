const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const userController = require('./postgresql/controllers/userController');
const todoController = require('./postgresql/controllers/todoController');
const sessionController = require('./postgresql/controllers/sessionController');
const cookieController = require('./postgresql/controllers/cookieController');

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('\n------------------- NEW REQUEST -------------------\n');
  next();
})

app.use('/static', express.static(path.join(__dirname, '..', 'client'))); // serves all static files located in the client folder

//HOME ROUTE

app.get('/', express.static(path.join(__dirname, '../', 'client')));

// USER ROUTES

app.post('/signup',
  userController.signup,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
  res.status(200).send('u signed up!');
});

app.post('/login',
  userController.login,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
  res.status(200).send('u logged in!');
});

// TODOS ROUTES

app.get('/getAllTodos/:uname',
  sessionController.isLoggedIn,
  todoController.getAllTodos,
  (req, res) => {
  res.status(200).send(res.locals.todos);
});

// app.get('/deleteAllTodos',
//   sessionController.isLoggedIn,
//   todoController.deleteAllTodos,
//   (req, res) => {
//   res.status(200).send(res.locals.todos);
// });

app.post('/newTodo',
  sessionController.isLoggedIn,
  todoController.newTodo,
  (req, res) => {
  res.status(200).json(res.locals.todo);
});

app.delete('/deleteTodo',
  sessionController.isLoggedIn,
  todoController.deleteTodo,
  (req, res) => {
  res.status(200).send(res.locals.todo);
});

app.use((err, req, res, next) => {
  // global error handler
  console.error(err);
  res.status(500).send('ERROR:' + err.toString());
});

app.listen(3000, () => {
  console.log('listening on port 3000 yeet');
});
