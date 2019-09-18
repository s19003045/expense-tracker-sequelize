const mongoose = require('mongoose')
const Record = require('../record')
const records = require('../record.json')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection

console.log(Record({ amount: 15 }).amount)


db.on('error', () => {
  console.log('connect to mongoDB error')
})

db.once('open', () => {
  // console.log(records.results)
  records.results.forEach(element => {
    Record.create({
      name: element.name,
      category: element.category,
      amount: element.amount
    })
  })

})
