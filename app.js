const express = require('express') // Framework de camada http
const cors = require('cors') // Cross Browser - Realiza a tradução para que browser entender a informação do servidor
const bodyParser = require('body-parser') // Converte o Json
// const consign = require('consign') //O módulo consign é utilizado para realizar o autoload do projeto. 
const app = express()
const users = require('./routes/users')
const PORT = process.env.PORT || 8080

app.use(cors()) 
app.use(bodyParser.json())
app.use('/usuarios', users)

// //O módulo consign é utilizado para realizar o autoload do projeto. 
// consign( { cwd:  'SKY-BACKEND' } ) // Parametro para acessar a pasta
//   .include("models") //da load de todos os meus models dentro da pasta
//   .then("routes") //da loads de todas as rotas dentro da pasta
//   .into(app)

app.listen(PORT, () => {
  console.log(`Servidor está rodando na Porta:${PORT}`)
})

app.get('/', (request, response) => {
  response.send({ "Mensagem" : "Test backend SKY"}) 
})

app.use(function(request, response, next){
  res.status(404);
  res.send({ "Mensagem" : "Página não encontrada"})
});