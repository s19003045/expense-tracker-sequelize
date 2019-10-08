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


const genSalt = () => {
  return new Promise((resolve, reject) => {
    let salt = bcrypt.genSaltSync(10)
    // console.log(salt)
    resolve(salt)

    reject(err)
  })
}

const genHash = (password, salt) => {
  return new Promise((resolve, reject) => {
    let hash = bcrypt.hashSync(password, salt)
    // console.log(hash)
    resolve(hash)

    reject(err)
  })
}


db.on('error', () => {
  console.log('connect to mongoDB error')
})


db.once('open', () => {
  // 非同步語法 .then()
  userList.forEach((element, index) => {
    genSalt()
      .then((salt) => {
        console.log(index, 'salt:', salt)
        genHash(element.password, salt)
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
              .catch(err => { console.log(err) })
          })
      })
  })
})