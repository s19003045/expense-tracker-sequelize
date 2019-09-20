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
    totalAmount = calculate.totalPrice(records)

    // const recordsForView = []

    // records.forEach(ele => {
    //   // el.date 之型別為物件：2019-09-19T15:18:41.358Z
    //   // toJSON() 後型別為字串：2019-09-19T15:18:41.364Z
    //   // toString() 後型別為字串：Thu Sep 19 2019 23:18:41 GMT+0800 (GMT+08:00)

    //   // 將 Date 物件轉成 string，並取 'T' 前面的字串
    //   ele.dateToString = ele.date.toJSON().split('T')[0]

    //   // console.log(ele.dateToString)
    //   // recordsForView.push(ele)
    // })

    // console.log(recordsForView)
    res.render('index', { records, totalAmount })
  })
})


module.exports = router

