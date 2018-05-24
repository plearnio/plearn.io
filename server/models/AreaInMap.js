const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Schema = mongoose.Schema

const mapSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  mapId: { type: Schema.Types.ObjectId },
  nextArea: { type: Schema.Types.ObjectId },
  previousArea: { type: Schema.Types.ObjectId },
  size: { type: Number, required: true, default: 48 }
}, {
  timestamps: { createdAt: 'created_timestamp' }
})

module.exports = mongoose.model('AreaInMap', mapSchema, 'area_in_map');
