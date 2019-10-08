const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection

const Calculate = require('../../lib/calculate.js')
const calculate = new Calculate()

const Query = require('../../lib/query.js')
const query = new Query()

const Analysis = require('../../lib/analysis.js')
const analysis = new Analysis()


db.on('error', () => {
  console.log('connect to mongoDB error')
})

db.once('open', () => {

  // 計算資料庫總支出、總筆數、平均
  // Record.find().sort({ name: 'asc', date: 'asc' }).then(records => {
  //   let totalPrice = calculate.totalPrice(records)
  //   let recordCount = calculate.recordCount(records)
  //   let average = calculate.average(totalPrice, recordCount)

  //   console.log('=====================')
  //   console.log(`總花費： ${totalPrice}  總筆數：${recordCount}  平均：${average}`)
  // })

  // sort and filter
  // const category = '餐飲食品'
  // const daterange = '09/01/2019 - 12/31/2019'
  // Record.find({ category: category }).sort({ date: 'desc' }).then(records => {
  //   query.filterRecInrange(records, daterange)
  // })

  // analysis 
  Record.find({}).sort({ category: 'asc' }).then(records => {
    const results = analysis.dataForChart(records)
    console.log(results)
  })

})