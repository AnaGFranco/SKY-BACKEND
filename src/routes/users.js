const authMiddleware = require("../middlewares/auth")
const controller = require("../controllers/UsersController")
const express = require('express');
const router = express.Router();

router.get('', controller.getAll) // ler todos usuário
router.post('', controller.signUp) // add usuário - sign_up
router.post('/login', controller.signIn) // realizar login - sign_in
router.get('/:id', authMiddleware, controller.getById) // ler usuário por id
router.patch('/:id', authMiddleware, controller.update) // atualizar usuário por id
router.delete('/:id', authMiddleware, controller.remove) // deletar usuário por id


module.exports = router
