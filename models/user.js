const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 資料驗證用
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true })


userSchema.plugin(uniqueValidator)

// Covert Schema into model and export it

module.exports = mongoose.model('User', userSchema)
