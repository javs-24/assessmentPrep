const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const controller = require('./sqlController');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'client'))); // serves all static files located in the client folder

app.post('/signup', controller.signup, (req, res) => {
  res.status(200).send('u signed up!');
});
app.post('/login', controller.login, (req, res) => {
  res.status(200).send('u signed up!');
});
app.get('/getAllTodos/:uname', controller.getAllTodos, (req, res) => {
  res.status(200).send('u signed up!');
});
app.post('/newTodo', controller.newTodo, (req, res) => {
  res.status(200).send('u signed up!');
});
app.delete('/deleteTodo', controller.signup, (req, res) => {
  res.status(200).send('u signed up!');
});

app.use((err, req, res, next) => {
  // global error handler
  console.error(err);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('listening on port 3000 yeet');
});
