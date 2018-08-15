const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({

  usuario: { type: String, required: true },
  contrasena: { type: String, required: true}

})

let UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
