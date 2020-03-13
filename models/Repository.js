const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGODB_URI;

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
