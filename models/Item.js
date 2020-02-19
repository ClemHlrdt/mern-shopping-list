const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ItemSchema.statics.getCount = function(){
  return this.aggregate([
    {
      $group: {
        _id: null, 
        total: {
          $sum: 1
        }
      }
    }
    ])
}

module.exports = mongoose.model('Item', ItemSchema);