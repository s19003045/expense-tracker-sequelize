const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
    // required: true
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  }
})

// Add totalAmount method to recordSchema
recordSchema.method('totalAmount', function () {
  return this.unitPrice * this.amount
})

recordSchema.pre('save', function (next) {
  let now = Date.now()

  this.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now
  }

  // Call the next function in the pre-save chain
  next()
})

module.exports = mongoose.model('Record', recordSchema)

