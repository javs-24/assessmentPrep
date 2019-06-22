const mongoose = require('mongoose');

const Todo = require('../models/Todo');

const controller = {};

controller.getAllTodos = (req, res, next) => {
  const unameFilter = {uname: req.params.uname };
  console.log('\n---invoking getAllTodos middleware---')
  Todo.find(unameFilter, (err, todos) => {
    if (err) return next('DB ERROR FINDING ALL TODOS:\n' + err);
    res.locals.todos = todos;
    console.log('saved all todos in res.locals.todos = ', todos);
    next();
  })
};

controller.deleteAllTodos = (req, res, next) => {
  console.log('\n---invoking deleteAllTodos middleware---')
  Todo.deleteMany((err, todos) => {
    if (err) return next('DB ERROR DELETING ALL TODOS:\n' + err);
    res.locals.todos = todos;
    console.log('saved all todos in res.locals.todos = ', todos);
    next();
  })
}

controller.newTodo = (req, res, next) => {
  console.log('\n---invoking newTodo middleware---')
  const todoParams = {uname: req.body.uname, text: req.body.text};
  Todo.create(todoParams, (err, todo) => {
    if (err) return next('DB ERROR CREATING A TODO:\n' + err);
    res.locals.todo = todo.id;
    console.log('saved the todo in res.locals.todo = ', todo);
    next();
  })
};

controller.deleteTodo = (req, res, next) => {
  console.log('\n---invoking deleteTodo middleware---');
  const idToDelete = {id: req.body.id};
  Todo.deleteOne(idToDelete, (err, todo) => {
    if (err) return next('DB ERROR DELETING A TODO:\n' + err);
    res.locals.todo = todo;
    console.log('saved the todo in res.locals.todo = ', todo);
    next();
  })
};

module.exports = controller;