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
  // 非同步語法 .then()
  userList.forEach((element, index) => {
    bcrypt.genSalt()
      .then((salt) => {
        console.log(index, 'salt:', salt)
        bcrypt.hash(element.password, salt)
          .then((hash) => {
            console.log(index, 'hash:', hash)
            User
              .create({
                name: element.name,
                email: element.email,
                password: hash
              })
              .then(user => {
                console.log(user)
              })
          })
      })
      .catch(err => { console.log(err) })
  })
})
