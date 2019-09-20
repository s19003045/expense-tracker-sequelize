const express = require('express')

// 建立一個 router 物件
const router = express.Router()

const Record = require('../models/record')
const record = new Record()

const calculate = require('../models/calculate.js')
const calculateForRecords = new calculate()

const recordsForNewPage = require('../models/recordsForNewPage.js')

// 列出所有 record
router.get('/', function (req, res) {
  res.redirect('/')
})

// 新增一筆 record
router.post('/', function (req, res) {
  const { category, name, unitPrice, amount, merchant, date, description } = req.body

  Record.create({
    name: name,
    category: category,
    unitPrice: unitPrice,
    amount: amount,
    merchant: merchant,
    date: date,
    description: description
  })

  res.redirect('/')
})

// 新增 record 頁面
router.get('/new', function (req, res) {
  res.render('new', { recordsForNewPage })
})

// 編輯 record 頁面
router.get('/:id/edit', function (req, res) {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    // console.log(typeof (record.date.toJSON()))
    res.render('edit', { recordsForNewPage, record })
  })

})

// 送出編輯 record
router.put('/:id', function (req, res) {
  res.redirect('/')
})

// 刪除 record
router.delete('/:id/delete', function (req, res) {
  console.log(req.params.id)
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err)
    console.log(record)
    record.remove((err) => {
      if (err) return console.error(err)
    })
    res.redirect('/')

  })

})

// exports router
module.exports = router