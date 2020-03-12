const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/usuario'; 

function connect () {
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true, useFindAndModify: false },
    function (error) {
      if(error) {
        console.error("Erro: ", error)
      } else {
        console.log("Conectado com o mongoDB.")
      }
    }
  );
}

module.exports = { connect }
