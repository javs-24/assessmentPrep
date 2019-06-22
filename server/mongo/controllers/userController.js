const User = require('../models/User');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gp5yk:Nanoperon1@cluster0-1qjmh.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

const controller = {};

controller.signup = (req, res, next) => {
  console.log('\n---invoking signup middleware---')
  const {username, password} = req.body;
  User.create({username: username, password: password}, (err, user) => {
    if (err) return next('DB ERROR CREATING A USER:\n' + err);
    console.log('successfuly created user document = ', user);
    res.locals.id = user.id;
    console.log('saved user.id in res.locals.id =', user.id);
    next();
  })
};

controller.login = (req, res, next) => {
  console.log('\n---invoking Login middleware---')
  const {username, password} = req.body;
  User.findOne({username: username, password: password}, (err, user) => {
    if (err) return next('DB ERROR FINDING A USER:\n' + err);
    if (!user) return next('DB ERROR FINDING A USER: User does not exist');    
    res.locals.id = user.id;
    console.log('saved user.id in res.locals.id =', user.id);
    next();
  })
};

module.exports = controller;
