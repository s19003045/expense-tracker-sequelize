const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set up template engine 
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')


const router = express.Router();

router.get('/', function (req, res) {
  res.json({ "error": false, "message": "Hello !" });
});

router.post('/add', function (req, res) {
  res.json({ "error": false, "message": "success", "data": req.body.num1 + req.body.num2 });
});

app.use('/', router);




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


