const express = require('express')

// 建立一個 router 物件
const router = express.Router()



router.get('/', function (req, res) {
  res.json({ "error": false, "message": "Hello !" });
});

router.post('/add', function (req, res) {
  res.json({ "error": false, "message": "success", "data": req.body.num1 + req.body.num2 });
});

module.exports = router

