// import passport-local
// 其 Strategy constructor 存成 LocalStrategy
const LocalStrategy = require('passport-local').Strategy


const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Email and Password incorrect' })
          }
        })
      })
    })
  )


  // passport 為了support login sessions，passport 必須把 user 實例 序列化存進 session(session 儲存區)，也必須從 session(session 儲存區) 中反序列化成 user 實例
  passport.serializeUser((user, done) => {
    done(null, user.id)  //只把 user ID 序列化存進 session(session 儲存區)，是為了縮小檔案大小
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}