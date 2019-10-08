// Constructor: caluculate
function Analysis() {

}

// Method:totalPrice
Analysis.prototype.dataForChart = function (records) {

  // let results = { "home": 0, "transport": 0, "fun": 0, "food": 0, "other": 0 }
  let results = [0, 0, 0, 0, 0]
  //   { "家居物業": 0 },
  //   { "交通出行": 0 },
  //   { "休閒娛樂": 0 },
  //   { "餐飲食品": 0 },
  //   { "其他": 0 }
  // ]
  records.forEach((record) => {
    switch (record.category) {
      case "家居物業":
        results[0] += record.itemTotalPrice
        break
      case "交通出行":
        results[1] += record.itemTotalPrice
        break
      case "休閒娛樂":
        results[2] += record.itemTotalPrice
        break
      case "餐飲食品":
        results[3] += record.itemTotalPrice
        break
      case "其他":
        results[4] += record.itemTotalPrice
        break
      default:
    }
  })
  console.log(results)
  return results
}


// export Analysis
module.exports = Analysis