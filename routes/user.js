const express = require('express')

// 建立一個 router 物件
const router = express.Router()

// GET 註冊頁面
router.get('/register', function (req, res) {
  res.send('Register page')
  // res.redirect('/')
});

// POST 註冊
router.post('/register', function (req, res) {
  // res.send('Edit page')
  res.redirect('/')
})

// GET 登入頁面
router.get('/login', function (req, res) {
  res.send('Login page')
  // res.redirect('/')
})

// POST 登入
router.post('/login', function (req, res) {
  // res.send('Edit page')
  res.redirect('/')
})

module.exports = router