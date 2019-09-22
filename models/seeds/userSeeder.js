// import mongoose and set up connection to mongoDB
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection

// User model
const User = require('../user.js')

// import userList as seeds
const { users: userList } = require('../user.json')

// import cryptjs
const bcrypt = require('bcryptjs')

db.on('error', () => {
  console.log('connect to mongoDB error')
})

db.once('open', () => {

  // Add seeds to mongoDB
  userList.forEach(element => {
    console.log(element)
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.error(err)
      bcrypt.hash(element.password, salt, (err, hash) => {
        if (err) throw err
        User
          .create({
            name: element.name,
            email: element.email,
            password: hash
          })
          .then(user => {
            console.log(user)
          })
          .catch(err => { console.log(err) })
      })
    })

  })

})
