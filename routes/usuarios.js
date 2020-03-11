const express = require('express');

const router = express.Router();
const controller = require("../controllers/UsuariosController")

router.get('', controller.getAll) // ler todos usuário
router.post('', controller.add) // add usuário
router.get('/:id', controller.getById) // ler usuário por id
router.patch('/:id', controller.update) // atualizar usuário por id
router.delete('/:id',  controller.remove) // deletar usuário por id
router.post('/:usuarioId/telefones', controller.addTelefone)  // add usuário
router.get('/:usuarioId/telefones',  controller.getTelefones) // ler telefones por usuario
router.patch('/::usuarioId/telefones/:telefoneId', controller.updateTelefone) //atualizar telefone
router.delete('/:usuarioId/telefones/:telefoneId', controller.removeTelefone) //deletar telefone
router.post('/login', controller.login) // realizar login

module.exports = router



