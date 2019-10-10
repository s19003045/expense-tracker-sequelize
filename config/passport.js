// import passport-local
// 其 Strategy constructor 存成 LocalStrategy
const LocalStrategy = require('passport-local').Strategy

// import passport-facebook 
// 其 Strategy constructor 存成 FacebookStrategy 
const FacebookStrategy = require('passport-facebook').Strategy

const db = require('../models')
const User = db.User
const Record = db.Record
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        where: {
          email: email
        }
      }).then(user => {

        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            console.log('password match')
            // console.log('user:', user)

            return done(null, user)
          } else {
            console.log('password not match')
            return done(null, false, { message: 'Email and Password incorrect' })
          }
        })
      })
    })
  )


  // 使用 passport-facebook
  passport.use(

    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID, // app ID
      clientSecret: process.env.FACEBOOK_SECRET,  //app secret
      callbackURL: process.env.FACEBOOK_CALLBACK,  // facebook authorization server 
      profileFields: ['email', 'displayName'] //使用者提供的資料範圍： email 及 displayName
    }, (accessToken, refreshToken, profile, done) => {

      // 可以透過下面程式碼得知 expense-tracker server 拿到什麼資料： console.log(profile)
      console.log(profile)

      // expense-tracker API server 向自己的 mongoDB 資料庫確認是否已有人已此 email 建立帳號 
      User.findOne({ where: { email: profile._json.email } }
      ).then(user => {
        // 如果 email 不存在就建立新的使用者
        if (!user) {

          const newUser = new User({
            name: profile._json.name,
            email: profile._json.email,
            password: ''
          })
          let randomPassword = Math.random().toString().slice(-8)

          bcrypt.genSalt(10, (err, salt) => {
            // if (err) return console.error(err)
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              if (err) throw err //throw err 執行後，會直接忽略緊接在後面的程式碼
              // 加密過程如果有問題，就不會在 mongoDB 裡面新增 newUser
              newUser.password = hash
              newUser.save()
                .then((err, user) => {
                  if (err) return console.error(err)
                  return res.redirect('/')
                })
                .catch(err => console.log(err))
            })
          })
        }
        // 當 mongoDB 資料庫已有此 email，就不需在資料庫新增此 email 的資料。這代表使用者之前在 expense-tracker server 就已透過第三方認證登入網站了！
        else {
          return done(null, user)
        }
      })
    }
    )
  )


  // passport 為了support login sessions，passport 必須把 user 實例 序列化存進 session(session 儲存區)，也必須從 session(session 儲存區) 中反序列化成 user 實例
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user)
    })
  })
}