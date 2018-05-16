const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Schema = mongoose.Schema

const mainobjectSchema = new Schema({
  name:String,
  rarity:Number
})

module.exports = mongoose.model('MainObject', mainobjectSchema);
