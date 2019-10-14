// Constructor: caluculate
function Query() {

}

Query.prototype.filterRecInrange = function (records, daterange) {
  const recordsInRange = []
  if (daterange === '') {
    Record.find({}, records => {
      return records
    })

  } else {
    // 先將時間區間切割，再將字串時間轉成 date type
    let startDay = new Date(daterange.split('-')[0].trim())
    let endDay = new Date(daterange.split('-')[1].trim())
    records.forEach(element => {
      if (element.date >= startDay && element.date <= endDay) {
        recordsInRange.push(element)
      }
    })
  }

  return recordsInRange
}


// export Calculate
module.exports = Query