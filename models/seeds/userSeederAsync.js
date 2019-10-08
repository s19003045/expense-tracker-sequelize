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


// async/await  +  for loop
db.once('open', async () => {

  for (i = 0; i < userList.length; i++) {
    let user = userList[i]
    try {
      let salt = await bcrypt.genSalt(10)
      console.log(i, 'salt:', salt)
      let hash = await bcrypt.hash(user.password, salt)
      console.log(i, 'hash:', hash)

      User
        .create({
          name: user.name,
          email: user.email,
          password: hash
        })
        .then(user => {
          console.log(user)
        })
        .catch(err => { console.log(err) })
    } catch (error) {
      console.warn(error)
    }
  }

})
