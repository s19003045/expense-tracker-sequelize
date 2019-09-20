// Constructor: caluculate
function Calculate() {

}

// Method:totalPrice
Calculate.prototype.totalPrice = function (records) {
  let totalPrice = 0
  records.forEach((record) => {
    totalPrice += record.unitPrice * record.amount
  })
  return totalPrice
}

// Method:recordsCount
Calculate.prototype.recordCount = function (records) {
  return records.length
}

// Method:average
Calculate.prototype.average = function (totalPrice, recordCount) {
  return Math.round(totalPrice / recordCount)
}

// export Calculate
module.exports = Calculate