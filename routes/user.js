const express = require('express')

// 建立一個 router 物件
const router = express.Router()

const Record = require('../models/record.js')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// GET 註冊頁面
router.get('/register', function (req, res) {

  res.render('register')
});

// POST 註冊
router.post('/register', function (req, res) {
  // res.send('Edit page')
  res.redirect('/')
})

// GET 登入頁面
router.get('/login', function (req, res) {

  res.render('login')
})

// POST 登入
router.post('/login', function (req, res, next) {
  // 使用 passport 認證使用者資料(或稱驗證請求)，使用的 strategy 是 以 passport-local(套件)建立的 LocalStrategy 
  // 如果 authentication 失敗，passport 會回傳 401 Unauthorized Status
  // 如果 authentication 成功，則後面的 handler 會執行 & req.user property 會被建立


  // passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
  passport.authenticate('local', {
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/user/login', // 失敗會留在登入頁面
    // failureMessage: true,
    failureFlash: true,
    // successMessage: true,
    // successFlash: true
    // badRequestMessage: '您沒有輸入帳號或密碼',
  })(req, res, next)
})

// log out
router.get('/logout', (req, res) => {
  req.logout() //passport 提供的方法 req.logout() 會結束 login session，執行的動作有 remove the req.user property and clear the login session (if any).
  req.flash('success_msg', '你已成功登出')
  res.redirect('/user/login')
})


module.exports = router