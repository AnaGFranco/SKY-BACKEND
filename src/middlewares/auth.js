require('dotenv').config()
const jwt  = require('jsonwebtoken')
const authConfig = process.env.authConfig

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if(!authHeader)
        return res.status(401).send({ "Mensagem": "Token não informado" });
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ "Mensagem": "Token error" });
    
    const [ scheme, token ] = parts;
  
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ "Mensagem": "Token malformatted" });
    
        let authenticated = false

    jwt.verify(token, authConfig, (error, decoded) => {

        if (error) {
        authenticated = false
      } else {
        if (req.params.id == decoded._id) {
          authenticated = true
        } else {
          authenticated = false
        }
      }
    })
  
    if (!authenticated) {
      return res.status(403).send({ "Mensagem": "Não autorizado."})
    }
  
    next()
}