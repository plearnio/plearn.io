const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Schema = mongoose.Schema

const mapSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  areaId: { type: Schema.Types.ObjectId },
  mapId: { type: Schema.Types.ObjectId },
  objectId: String,
  x: Number,
  timeNowToNextPhaseMilli: Number,
  itemInSlot: Schema.Types.Mixed,
  itemInOutput: Schema.Types.Mixed
}, {
  timestamps: { createdAt: 'created_timestamp' }
})

module.exports = mongoose.model('ObjectsInArea', mapSchema, 'objects_in_area');
