const express = require('express')

// 建立一個 router 物件
const router = express.Router()

const { authenticated } = require('../config/auth')

const Record = require('../models/record')
const record = new Record()

const Calculate = require('../lib/calculate.js')
const calculate = new Calculate()

const Query = require('../lib/query.js')
const query = new Query()

const Analysis = require('../lib/analysis.js')
const analysis = new Analysis()

router.get('/', function (req, res) {
  // analysis 
  Record.find({}).sort({ category: 'asc' }).then(records => {
    const results = analysis.dataForChart(records)

    res.render('analysis', { results })
  })
})


module.exports = router