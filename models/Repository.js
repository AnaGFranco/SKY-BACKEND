const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/usuario';

function connect () {
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true, useFindAndModify: false },
    function (error) {
      if(error) {
        console.error("Ocorreu um erro: ", error)
      } else {
        console.log("Conectado no mongoDB.")
      }
    }
  );
}

module.exports = { connect }
