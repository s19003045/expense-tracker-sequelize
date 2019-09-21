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
    let startDay = daterange.split('-')[0].trim()
    let endDay = daterange.split('-')[1].trim()
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