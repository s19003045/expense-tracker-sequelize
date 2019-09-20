// Constructor: caluculate
function Query() {

}

Query.prototype.filterRecInrange = function (records, daterange) {
  const recordsInRange = []
  let startDay = daterange.split('-')[0].trim()
  let endDay = daterange.split('-')[1].trim()
  records.forEach(element => {
    if (element.date >= startDay && element.date <= endDay) {
      recordsInRange.push(element)
    }
  })
  console.log(recordsInRange)
}


// export Calculate
module.exports = Query