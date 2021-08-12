const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique : true,
  },
  password:{
      type: String,
      requires: true,
  }
}, { timestamps: true });

const Login = mongoose.model('login', loginSchema);
module.exports = Login;