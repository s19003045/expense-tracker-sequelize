const { users: userList } = require('../user.json')
const { results: recordList } = require('../record.json')

const Record = require('../record.js')
const User = require('../user.js')

const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('err', (err) => {
  if (err) return console.error(err)
})

db.once('open', () => {
  console.log('db connected!')

  User.find({}, (err, users) => {
    if (err) { console.error(err) }
    console.log('hello')
    users.forEach((user, index) => {
      console.log(user)
      const records = recordList.slice((index * 10), (index * 10 + 9))
      records.forEach(record => {
        console.log(record)
        Record.create({
          name: record.name,
          category: record.category,
          amount: record.amount,
          unitPrice: record.unitPrice,
          merchant: record.merchant,
          date: record.date,
          userId: user._id
        }, (err) => {
          if (err) return console.error(err)
        })
      })
    })

  })



  // .then((err, users) => {
  //   if (err) throw err
  // users.forEach(user => {
  //   const records = recordList.slice(0, 8)
  //   console.log(user._id)
  //   console.log('hello')
  // })
  // })
  // .catch(err => console.log(err))


  // userList.forEach((user, index) => {
  //   // create users
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(user.password, salt, (err, hash) => {
  //       if (err) throw err
  //       User
  //         .create({
  //           email: user.email,
  //           password: hash
  //         })
  //         .then(user => {
  //           // #1 - #3 for user1; #4 - #6 for user2

  //           const restaurants = index ? restaurantList.slice(3, 6) : restaurantList.slice(0, 3)

  //           restaurants.forEach(restaurant => {
  //             Restaurant.create({
  //               name: restaurant.name,
  //               name_en: restaurant.name_en,
  //               category: restaurant.category,
  //               image: restaurant.image,
  //               location: restaurant.location,
  //               phone: restaurant.phone,
  //               google_map: restaurant.google_map,
  //               rating: restaurant.rating,
  //               description: restaurant.description,
  //               userId: user._id
  //             })
  //           })
  //         })
  //     })
  //   })
  // })
  console.log('restaurant and user seeds are created')
})
