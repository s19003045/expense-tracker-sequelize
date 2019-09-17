const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')


// Set up template engine 
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')


app.get('/', (req, res, next) => {
  console.log('This is home page')
  res.render('index')
})

// Server start
app.listen(port, () => {
  console.log(`Express server start`)
})


