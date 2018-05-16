const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
mongoose.Promise = require('bluebird')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String },
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  name: String,
  gameGeneralStatus: {
    health: { type: Number, default: 100 },
    energy: { type: Number, default: 100 },
    hunger: { type: Number, default: 100 }
  },
  experience: {
    level: String,
    nowExp: Number,
    maxExp: Number 
  },
  pos: {
    map: { type: Schema.Types.ObjectId },
    mapIndex: Number,
    x: Number,
    y: Number
  }
})

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// // generating a hash
// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
