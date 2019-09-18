const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection





// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set up template engine 
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// 使用"連續"監聽器：listen to error
db.on('error', () => {
  console.log('mongoose connect error')
})

// 使用"一次性"監聽器：listen to success
db.once('open', () => {
  console.log('mongoose connect success')
})



// ===============route setting=============


app.use('/', require('./routes/home'));




// app.get('/', (req, res) => {
//   // console.log('This is home page')
//   // res.render('index')
//   res.json({ "error": false, "message": "Hello !" });
// })

// app.post('/', (req, res) => {
//   res.json({ "error": false, "message": "success", "data": req.body.num1 + req.body.num2 })
// })

// Server start
app.listen(port, () => {
  console.log(`Express server start`)
})


