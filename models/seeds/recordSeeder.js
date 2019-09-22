const mongoose = require('mongoose')
const Record = require('../record')
const records = require('../record.json')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection


db.on('error', () => {
  console.log('connect to mongoDB error')
})

db.once('open', () => {

  // Add seeds to mongoDB
  records.results.forEach(element => {
    Record.create({
      name: element.name,
      category: element.category,
      amount: element.amount,
      unitPrice: element.unitPrice,
      merchant: element.merchant,
      date: element.date
    })
  })

})
