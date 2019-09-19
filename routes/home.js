const express = require('express')

// 建立一個 router 物件
const router = express.Router()



router.get('/', function (req, res) {
  res.send('This is home page')
})


module.exports = router

