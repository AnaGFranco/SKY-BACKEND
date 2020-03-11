const { connect } = require('../models/Repository')
const usuariosModel = require('../models/UsuariosSchema')
const { telefonesModel } = require('../models/TelefonesSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SEGREDO = 'MIICXAIBAAKBgQCOl54HaBM/WiL/jPPdFGjm9f8VprUst1J+vs7G/YRGRHYLGqt+M/ljAhcROPy3FdaVi2smqqyZhf4d+EZ9lKM6LVed91sxvcyMFEp6x8R2KS9wIzUtJ6r1MAIKd8HURmbaN4V2TV/FLeOUANRCZ+QhYEy+eNbuVIJANYtXBUSn8QIDAQABAoGBAIuVS/MAJGdNuxjiSA5Q3mfIw03UhWIiirTb39rXbNbESbGRB/NguW38K8yGNoya6hY2BkwxowgeLKX11js0d5sSHgEgL+pDQtXshHu7vlYU0ksHwfmD/R8+ZHJH6F6L0vuzs4NoVK/8iQHFLboUjF2sORyuLHbBmFZQWhInet8pAkEA0OlL2uHCYhkNuokJ9H+OnJEqKS2BtYSkH3Hrh2opZg2HtvUtXEIxzmj/95CzxMXQtNJhQMK3ekvnF3Upcj2avwJBAK67i8OEKM2jerbFKrBqr6/kUkZeyHLA8I4L2C3/3nKPGUj/GAc2xxuK1XxnpC0e3Wqz5OMwzkWU4Ynblsdq2U8CQHu9U6LICbzVHh6YwP7C9xOhoBlXzPZZJGVDssA4j2DVLsednUqCIsIhy0s1uGUazi3sVpJnQwn7H1vzl6ME/j0CQAT7qj+4LCW5LM27j70aPcppW4NQPq0vHW0fn1moe2KO/CydwcSq5kC909rJZeA3ih755GQqRyeq2EfDMGidfncCQD770Za6sJP1/i1vcdoWuWYnhpiU8TNKjFb2vJEN598amcyJV9PlAAdEkszh6EDA76t6/yT6NoUn/y9x4YskzQo='

connect()

const getAll = (request, response) => {
  usuariosModel.find((error, usuarios) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(usuarios)
  })
}

const getById = (request, response) => {
  const id = request.params.id

  return usuariosModel.findById(id, (error, usuario) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (usuario) {
      return response.status(200).send(usuario)
    }

    return response.status(404).send('Usuario não encontrado.')
  })
}

const add = (request, response) => {
  const senhaCriptografada = bcrypt.hashSync(request.body.senha)
  request.body.senha = senhaCriptografada
  request.body.data_criacao = Date.now();
  request.body.data_atualizacao = Date.now();
  request.body.data_login = Date.now();
  const novoUsuario = new usuariosModel(request.body)

  novoUsuario.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }
    return response.status(201).send(novoUsuario)
  })
}

const remove = (request, response) => {
  const id = request.params.id

  usuariosModel.findByIdAndDelete(id, (error, usuario) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (usuario) {
      return response.status(200).send('Usuario removiado!')
    }

    return response.status(404).send('Usuario não encontrado.')
  })
}

const update = (request, response) => {
  const id = request.params.id
  const usuarioUpdate = request.body
  const options = { new: true }

  usuariosModel.findByIdAndUpdate(
    id,
    usuarioUpdate,
    options,
    (error, usuario) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (usuario) {
        return response.status(200).send(usuario)
      }

      return response.status(404).send('Usuario não encontrado.')
    }
  )
}

const addTelefone = async (request, response) => {
  const usuarioId = request.params.usuarioId
  const telefone = request.body
  const options = { new: true }

  const novoTelefone = new telefonesModel(telefone)
  const usuario = await usuariosModel.findById(usuarioId)

  usuario.data_atualizacao = Date.now();
  
  usuario.telefones.push(novoTelefone)
  usuario.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }
    return response.status(201).send(usuario)
  })
}


const getTelefones = async (request, response) => {
  const usuarioId = request.params.id
  await usuariosModel.findById(usuarioId, (error, usuario) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (usuario) {
      return response.status(200).send(usuario.telefones)
    }

    return response.status(404).send('Usuario não encontrado.')
  })
}

const updateTelefone = (request, response) => {
  const usuarioId = request.params.usuarioId
  const telefoneId = request.params.telefoneId
  const options = { new: true }

  usuariosModel.findOneAndUpdate(
    { _id: usuarioId, 'telefones._id': telefoneId },
    {
      $set: {
        'telefones.$.nome': request.body.nome,
        'telefones.$.foto': request.body.foto,
        'telefones.$.dataInicial': request.body.dataInicial,
        'telefones.$.dataFinal': request.body.dataFinal,
        'telefones.$.intervalo': request.body.intervalo,
        'telefones.$.qtdConsumoTelefone':request.body.qtdConsumoTelefone,
        'telefones.$.totalEstoqueTelefone': request.body.totalEstoqueTelefone
      }
    },
    options,
    (error, usuario) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (usuario) {
        return response.status(200).send(usuario)
      }

      return response.status(404).send('Usuario não encontrado.')
    }
  )
}

const removeTelefone = async (request, response) => {
  const usuarioId = request.params.usuarioId
  const telefoneId = request.params.telefoneId
  
  const usuario = await usuariosModel.findById(usuarioId)
  const telefone = usuario.telefones.find(telefone => telefone._id == telefoneId)
  
  usuario.telefones.remove(telefone)
  usuario.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send("Telefone removido!")
  })

}

const login = async (request, response) => {
  const usuarioEncontrado = await usuariosModel.findOne({ email: request.body.email })

  if (usuarioEncontrado) {
    const senhaCorreta = bcrypt.compareSync(request.body.senha, usuarioEncontrado.senha)

    if (senhaCorreta) {
      const token = jwt.sign(
        {
          _id: usuarioEncontrado._id
        },
        SEGREDO,
        { expiresIn: 1800 }
      )

      return response.status(200).send({ token })
    }

    return response.status(401).send(
      {
      "mensagem": "Usuário ou senha incorreto"
      })
  }

  return response.status(404).send('Usuario não encontrado.')
}


module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  addTelefone,
  getTelefones,
  updateTelefone,
  removeTelefone,
  login
}
