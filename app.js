const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const usuarios = require('./routes/usuarios')
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/usuarios', usuarios)

app.get('/', (request, response) => {
  response.send('Sky Backend')
})

app.listen(PORT)
console.info(`Rodando na porta ${PORT}`)
