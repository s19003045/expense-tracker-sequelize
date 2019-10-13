const express = require('express')

// 建立一個 router 物件
const router = express.Router()

const { authenticated } = require('../config/auth')

const db = require('../models')
const User = db.User
const Record = db.Record

const Calculate = require('../lib/calculate.js')
const calculate = new Calculate()

const Query = require('../lib/query.js')
const query = new Query()

router.get('/', authenticated, (req, res) => {
  console.log(req.user.id)
  Record.findAll({ where: { UserId: req.user.id }, order: [['date', 'DESC']] }).then(records => {
    // console.log('date:', records[0].date)
    // console.log('category:', records[0].category)
    // 計算所有消費記錄的總額：
    const totalAmount = calculate.totalPrice(records)


    res.render('index', { records, totalAmount, user: req.user })
  })

})


module.exports = router

