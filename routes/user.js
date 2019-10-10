const express = require('express')

// 建立一個 router 物件
const router = express.Router()

const db = require('../models')
const User = db.User
const Record = db.Record

// const Record = require('../models/record.js')
// const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const userObj = require('../models/htmlInputSetting/userObj')

// GET 註冊頁面
router.get('/register', function (req, res) {
  res.render('register', { userObj })
});

// POST 註冊
router.post('/register', function (req, res) {
  const { name, email, password, password2 } = req.body

  // 回傳的錯誤訊息儲存至 errors
  let errors = []

  // 寫入資料庫前的驗證，所有字串不能有空白
  if (name.match(/\x20/i) || email.match(/\x20/i) || password.match(/\x20/i) || password2.match(/\x20/i)) {
    errors.push({ message: '不得有空格' })
  }
  // 所有欄位不得為空
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }
  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('User already exists')
        errors.push({ message: '已有人註冊此 email' })
        res.render('register', {
          errors, name, email, password, password2
        })

      } else {
        const newUser = new User({ name: name, email: email, password: password })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => {
                req.flash('success_msg', '你已成功註冊')
                console.log(req.flash.success_msg)
                res.redirect('/user/login')
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})

// GET 登入頁面
router.get('/login', function (req, res) {

  res.render('login')
})

// POST 登入
router.post('/login', function (req, res, next) {
  // 使用 passport-local 來驗證使用者登入
  passport.authenticate('local', {
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/user/login', // 失敗會留在登入頁面
    failureFlash: true,
    failureMessage: req.flash('failure_msg', '帳號/密碼錯誤')
    // successMessage: req.flash('success_msg', '你已成功登入'),
    // successFlash: true
  })(req, res, next)
})

// log out
router.get('/logout', (req, res) => {
  req.logout() //passport 提供的方法 req.logout() 會結束 login session，執行的動作有 remove the req.user property and clear the login session (if any).
  req.flash('success_msg', '你已成功登出')
  res.redirect('/user/login')
})


module.exports = router