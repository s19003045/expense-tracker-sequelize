const express = require('express')

// 建立一個 router 物件
const router = express.Router()


// 列出所有 record
router.get('/', function (req, res) {
  res.redirect('/')
})

// 新增一筆 record
router.post('/', function (req, res) {
  res.redirect('/')
})

// 新增 record 頁面
router.get('/new', function (req, res) {
  res.send('New record page')
  // res.redirect('/')
})

// 編輯 record 頁面
router.get('/:id/edit', function (req, res) {
  res.send('Edit page')
  // res.redirect('/')
})

// 送出編輯 record
router.put('/:id', function (req, res) {
  res.redirect('/')
})

// 刪除 record
router.delete('/:id/delete', function (req, res) {
  res.redirect('/')
})

// exports router
module.exports = router