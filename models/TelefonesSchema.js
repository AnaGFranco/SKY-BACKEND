const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TelefonesSchema = new Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  numero: { type: String},
  ddd:{type: Number}
})

const telefonesModel = mongoose.model('telefones', TelefonesSchema);

module.exports = { telefonesModel, TelefonesSchema };
