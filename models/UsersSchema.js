const mongoose = require('mongoose'); // O Mongoose traduz os dados do banco de dados para objetos JavaScript
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  telefones: [ { 
                 numero: { type: String, required: true },
                 ddd:{type: Number, required: true}
               }
             ],
  data_criacao: {type: Date},
  data_atualizacao: {type: Date},
  ultimo_login: {type: Date}
})

const usuariosModel = mongoose.model('usuarios', UsuariosSchema);

module.exports = usuariosModel;