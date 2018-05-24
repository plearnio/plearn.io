const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Schema = mongoose.Schema

const subobjectSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  id: { type: String, require: true },
  mainId: { type: String, require: true },
  name: { type: String, require: true },
  engName: { type: String, require: true },
  tileWidth: { type: Number, require: true },
  tileHeight: { type: Number, require: true },
  rarity: { type: Number, require: true },
  nextPhase: { type: String, require: true },
  timeToNextPhaseMilli: { type: Number, require: true },
  slotInput: { type: Number, require: true },
  slotOutput: { type: Number, require: true },
  layer: { type: Number, require: true }
})

module.exports = mongoose.model('SubObject', subobjectSchema);
