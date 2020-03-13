const mongoose = require('mongoose'); // O Mongoose traduz os dados do banco de dados para objetos JavaScript
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
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

const usersModel = mongoose.model('usuarios', UsersSchema);

module.exports = usersModel;
