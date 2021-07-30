const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be atleast 6 characters"]
  }
}, {timestamps: true});

UserSchema.pre('save', function(next) {
  const hashes = 1; //Change amount to 1 >=
  bcrypt.hash(this.password, hashes,(err,passwordHash)=>{
    if(err) return next(err);
    this.password = passwordHash;
    next();
  })
});

module.exports = mongoose.model('User', UserSchema);