const mongoose = require('mongoose')
const Record = require('../record')
const records = require('../record.json')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection

const calculate = require('../calculate.js')
const calculateForRecords = new calculate()

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
      unitPrice: element.unitPrice
    })
  })


  // Record.find().sort({ name: 'asc', date: 'asc' }).then(records => {
  //   let totalPrice = calculateForRecords.totalPrice(records)
  //   let recordCount = calculateForRecords.recordCount(records)
  //   let average = calculateForRecords.average(totalPrice, recordCount)

  //   console.log('=====================')
  //   console.log(`總花費： ${totalPrice}  總筆數：${recordCount}  平均：${average}`)
  // })

})
