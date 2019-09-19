const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/record', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection
const methodOverride = require('method-override')



// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// static files
app.use(express.static('public'))

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

app.use('/records', require('./routes/records'))

app.use('/user', require('./routes/user'))

// app.use('/auth', require('./routes/auth'))


// Server start
app.listen(port, () => {
  console.log(`Express server start`)
})


