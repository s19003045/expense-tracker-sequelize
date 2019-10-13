const express = require('express')

// 建立一個 router 物件
const router = express.Router()

const { authenticated } = require('../config/auth')

const db = require('../models')
const User = db.User
const Record = db.Record

// const Record = require('../models/record')
// const record = new Record()

const Calculate = require('../lib/calculate.js')
const calculate = new Calculate()

const Query = require('../lib/query.js')
const query = new Query()

const recordsForNewPage = require('../models/htmlInputSetting/recordsForNewPage.js')

// 列出所有 record
router.get('/', authenticated, function (req, res) {
  res.redirect('/')
})

// 新增一筆 record
router.post('/', authenticated, function (req, res) {
  const { category, name, unitPrice, amount, merchant, date, description } = req.body
  // console.log('date:', date)
  // console.log('typeofDate:', typeof (date))
  Record.build({
    name: name,
    category: category,
    unitPrice: unitPrice,
    amount: amount,
    merchant: merchant,
    date: date,
    description: description,
    UserId: req.user.id,
    // itemTotalPrice: 100
  })
    .save(record => {
      console.log(record)
    })

  // Record.create({

  // })
  res.redirect('/')

})

// 新增 record 頁面
router.get('/new', authenticated, function (req, res) {
  res.render('new', { recordsForNewPage })
})


// 搜尋 record 頁面
router.get('/search', authenticated, function (req, res) {
  const { daterange, category } = req.query
  console.log(req.query)
  let regexp = new RegExp('')
  const queryCategory = req.query.category || regexp

  // 先以 category 來filter，再依 daterange 來 filter
  Record.find({ userId: req.user._id }).where('category', queryCategory).sort({ date: 'desc' }).then(recordSorted => {

    if (daterange === '') {
      // 不用再篩選
      const records = recordSorted

      // 計算總支出
      const totalAmount = calculate.totalPrice(records)
      // render 至 index ，放入四個物件作渲染畫面用
      res.render('index', { records, totalAmount, daterange, category })
    } else {
      // 依 daterange 篩選
      const records = query.filterRecInrange(recordSorted, req.query.daterange)

      // 計算總支出
      const totalAmount = calculate.totalPrice(records)
      // render 至 index ，放入四個物件作渲染畫面用
      res.render('index', { records, totalAmount, daterange, category })
    }

  })

})

// 編輯 record 頁面
router.get('/:id/edit', authenticated, function (req, res) {
  Record.findOne({ where: { id: req.params.id } })
    .then(record => {
      res.render('edit', { recordsForNewPage, record })
    })
})

// 送出編輯 record
router.put('/:id/edit', authenticated, function (req, res) {
  const { category, name, unitPrice, amount, merchant, date, description } = req.body

  Record.findOne({ where: { id: req.params.id } })
    .then(record => {
      record.name = name
      record.category = category
      record.unitPrice = unitPrice
      record.amount = amount
      record.merchant = merchant
      record.date = date
      record.description = description

      record.save(err => {
        if (err) return console.error(err)
        res.redirect('/')
      })
    })
    .catch(err => console.log(err))
})

// 刪除 record
router.delete('/:id/delete', authenticated, function (req, res) {
  console.log(req.params.id)
  Record.findOne({ where: { id: req.params.id } })
    .then(record => {
      console.log(record)
      record.destroy((err) => {
        if (err) return console.error(err)
      })
      res.redirect('/')
    })
})

// exports router
module.exports = router