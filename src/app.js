require('dotenv-safe')
const express = require('express') // Framework de camada http
const cors = require('cors') // Cross Browser - Realiza a tradução para que browser entender a informação do servidor
const bodyParser = require('body-parser') // Converte o Json 
const app = express()
const users = require('./routes/users')
const index = require("./routes/index")

// params = {
//   MONGO_URL : process.env.MONGODB_URI
// }

app.use(cors()) 
app.use(bodyParser.json())
app.use('/usuarios', users)
app.use("/", index)

app.use(function(request, response, next){
  response.status(404).send({ "Mensagem" : "Página não encontrada"})
});

module.exports = app 