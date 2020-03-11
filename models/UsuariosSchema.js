const mongoose = require('mongoose');
const { TelefonesSchema } = require('./TelefonesSchema')
const Schema = mongoose.Schema;
const UsuariosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  telefones: [TelefonesSchema],
  data_criacao: {type: Date},
  data_atualizacao: {type: Date},
  data_login: {type: Date}
})

const usuariosModel = mongoose.model('usuarios', UsuariosSchema);

module.exports = usuariosModel;