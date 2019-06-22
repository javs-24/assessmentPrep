const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  uname: {type: String, required: true},
  text: {type: String, required: true},
})

module.exports = mongoose.model('Todo', todoSchema);