const controller = require("../controllers/UsersController")
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const authConfig = 'MIICXAIBAAKBgQCOl54HaBM/WiL/jPPdFGjm9f8VprUst1J+vs7G/YRGRHYLGqt+M/ljAhcROPy3FdaVi2smqqyZhf4d+EZ9lKM6LVed91sxvcyMFEp6x8R2KS9wIzUtJ6r1MAIKd8HURmbaN4V2TV/FLeOUANRCZ+QhYEy+eNbuVIJANYtXBUSn8QIDAQABAoGBAIuVS/MAJGdNuxjiSA5Q3mfIw03UhWIiirTb39rXbNbESbGRB/NguW38K8yGNoya6hY2BkwxowgeLKX11js0d5sSHgEgL+pDQtXshHu7vlYU0ksHwfmD/R8+ZHJH6F6L0vuzs4NoVK/8iQHFLboUjF2sORyuLHbBmFZQWhInet8pAkEA0OlL2uHCYhkNuokJ9H+OnJEqKS2BtYSkH3Hrh2opZg2HtvUtXEIxzmj/95CzxMXQtNJhQMK3ekvnF3Upcj2avwJBAK67i8OEKM2jerbFKrBqr6/kUkZeyHLA8I4L2C3/3nKPGUj/GAc2xxuK1XxnpC0e3Wqz5OMwzkWU4Ynblsdq2U8CQHu9U6LICbzVHh6YwP7C9xOhoBlXzPZZJGVDssA4j2DVLsednUqCIsIhy0s1uGUazi3sVpJnQwn7H1vzl6ME/j0CQAT7qj+4LCW5LM27j70aPcppW4NQPq0vHW0fn1moe2KO/CydwcSq5kC909rJZeA3ih755GQqRyeq2EfDMGidfncCQD770Za6sJP1/i1vcdoWuWYnhpiU8TNKjFb2vJEN598amcyJV9PlAAdEkszh6EDA76t6/yT6NoUn/y9x4YskzQo='

// Autenticar rota através do token
const auth = async (request, response, next) => {
    const authHeader = request.get('authorization')
    let authenticated = false
  
    if (!authHeader) {
      return response.status(401).send('Você precisa fazer login!')
    }
  
    const token = authHeader.split(' ')[1]
  
    jwt.verify(token, authConfig, (error, decoded) => {
      if (error) {
        authenticated = false
      } else {
        if (request.params.id == decoded._id) {
          authenticated = true
        } else {
          authenticated = false
        }
      }
    })
  
    if (!authenticated) {
      return response.status(403).send({ "Mensagem": "Não autorizado."})
    }
  
    next()
  }

router.get('', controller.getAll) // ler todos usuário
router.post('', controller.signUp) // add usuário - sign_up
router.post('/login', controller.signIn) // realizar login - sign_in
router.get('/:id', auth, controller.getById) // ler usuário por id
router.patch('/:id', auth, controller.update) // atualizar usuário por id
router.delete('/:id', auth,  controller.remove) // deletar usuário por id


module.exports = router



