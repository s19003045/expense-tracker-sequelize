const express = require('express')

// 建立一個 router 物件
const router = express.Router()

const Record = require('../models/record')
const record = new Record()

const Calculate = require('../lib/calculate.js')
const calculate = new Calculate()

const Query = require('../lib/query.js')
const query = new Query()

router.get('/', function (req, res) {

  Record.find().sort({ date: 'desc' }).then(records => {

    // 計算所有消費記錄的總額：
    const totalAmount = calculate.totalPrice(records)

    res.render('index', { records, totalAmount })
  })
})


module.exports = router

