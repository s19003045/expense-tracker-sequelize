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
  // res.send('Login page')
  // res.redirect('/')
  res.render('login')
})

// POST 登入
router.post('/login', function (req, res) {
  // res.send('Edit page')
  res.redirect('/')
})

// log out
router.get('/logout', (req, res) => {
  req.logout() //passport 提供的方法 req.logout() 會結束 login session，執行的動作有 remove the req.user property and clear the login session (if any).
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})


module.exports = router