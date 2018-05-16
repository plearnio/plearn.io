const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const MainObject = require('./MainObject')

const Schema = mongoose.Schema

const subobjectSchema = new Schema({
  urlImg:{type: String , required: true},
  mainObjectId:{type: Schema.Types.ObjectId, ref: 'MainObject' },
  thaiName:{type: String , required: true},
  englishName:{type: String , required: true},
  scienceName:{type: String , required: true},
  description:{type: String , required: true},
  biome: [{type: String , required: true}],
  rarity: {type: Number , required: true},
  width: {type: Number},//
  height: Number,
  nextPhase: {type: Schema.Types.ObjectId, ref: 'SubObject' },
  timeToNextPhase: {type: Number},
  slotItem: Schema.Types.Array,
  outputSlot: Schema.Types.Array,
  actions: [{
      name: String,
      requireSkill: Schema.Types.Array,
      inputFromHand: {type:Schema.Types.ObjectId},
      inputFromSlot: {type:Schema.Types.ObjectId},
      output: {type:Schema.Types.ObjectId},
      time: Number,
      requirePlayer: {type:Boolean}, // acive player or not
      payload: {
          Item: [{type:Schema.Types.ObjectId, require: true , default: null}]
      },
      energy:Number,
      health:Number,
      hunger:Number
  }]
})

module.exports = mongoose.model('SubObject', subobjectSchema);
