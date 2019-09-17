const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res, next) => {
  console.log('This is home page')
  res.send('Home page')
})

app.listen(port, () => {
  console.log(`Express server start`)
})
