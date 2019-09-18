const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
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



// Server start
app.listen(port, () => {
  console.log(`Express server start`)
})


