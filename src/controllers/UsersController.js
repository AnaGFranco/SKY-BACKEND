require('dotenv').config()
const { connect } = require('../models/Repository')
const usersModel = require('../models/UsersModel')
const bcrypt = require('bcryptjs') // utilizado para criptografa a senha
const jwt = require('jsonwebtoken') //JWT serve para criação de tokens de acesso baseados em JSON
const authConfig = process.env.authConfig
connect()

// Realizar cadastro do usuario
const signUp = async (request, response) => {
 
  // Verificar se o email passado no body já existe 
  const userFound = await usersModel .findOne({ email: request.body.email })

  // Se não encontrar o email realizar o cadastro
  if (!userFound) {

    // Criptografar senha
    const encryptedPassword = bcrypt.hashSync(request.body.senha)
    request.body.senha = encryptedPassword
   
    // inserir data de log
    request.body.data_criacao = Date.now();
    request.body.data_atualizacao = Date.now();
    request.body.ultimo_login = Date.now();
    
    const newUser = new usersModel (request.body)
  

    newUser.save((error) => {
      if (error) {
        return response.status(500).send(error)
      }

      // Gerar token com  payload id
      const token = jwt.sign(
        { _id: newUser._id },
        authConfig,
        { expiresIn: 1800 }  //Expirar sessão após 30 min
      )

      return response.status(201).send([newUser, {token}])
    })
  } else{

  // Se encontrar o email mostrar que já existe.
  return response.status(401).send({"Mensagem": "Email já existe!"})
  }
}

// Realizar Login/Sign_In (Necessario email e senha)
const signIn = async (request, response) => {

  // Buscar email
  const userFound = await usersModel .findOne({ email: request.body.email })
  
  // Email encontrado
  if (userFound) {

    //Verificar a senha
    const correctPassword = bcrypt.compareSync(request.body.senha, userFound.senha)
    
    // Senha valida
    if (correctPassword) {

      // Gerar token com  payload id
      const token = jwt.sign(
        {_id: userFound._id },
        authConfig, 
        { expiresIn: 1800 }  //Expirar sessão após 30 min

      )

      return response.status(200).send([userFound, { token }])
    }
    // Senha incorreta 
    return response.status(401).send({"Mensagem": "Usuário ou senha incorreto"})
  }

  // Email não encontrado
  return response.status(404).send({"Mensagem": "Usuário ou senha incorreto"})
}

// ler dados do usuario por id
const getById = (request, response) => {
  
  const id = request.params.id
   
  // buscar dados do usuario atraves do id inserido no params
  return usersModel .findById(id, (error, users) => {
    
    if (users) {
      return response.status(200).send(users)
    }

    if (error) {
      return response.status(500).send(error)
    }
   
   return response.status(404).send({"mensagem": "Usuário não encontrado."})
  })
}

// Se desejar verificar todos usuarios que possuem na base 
const getAll = (request, response) => {
  usersModel .find((error, users) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(users)
  })
}

// Remover algum usuario cadastrado por id
const remove = (request, response) => {
  const id = request.params.id
  
  // Encontrar e deletar
  usersModel .findByIdAndDelete(id, (error, user) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (user) {
      return response.status(200).send('Usuario removiado!')
    }

    return response.status(404).send({"Mensagem": "Usuário não encontrado."})
  })
}

// Atualizar dados do usuario por id
const update = (request, response) => {
  const id = request.params.id
  const userUpdate = request.body
  const options = { new: true }

  // atualizar data 
  request.body.data_atualizacao = Date.now();
  
  // Encontrar e atualizar
  usersModel .findByIdAndUpdate(
    id,
    userUpdate,
    options,
    (error, user) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (user) {
        return response.status(200).send(user)
      }

      return response.status(404).send({"Mensagem": "Usuário não encontrado."})
    }
  )
}

module.exports = {
  signUp,
  signIn,
  getById,
  getAll,
  remove,
  update
}
  