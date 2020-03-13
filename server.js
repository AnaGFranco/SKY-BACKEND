const app = require("./src/app")
const Port = process.env.Port || 8080

app.listen(Port, () => {
    console.log(`Servidor está rodando na Porta:${Port}`)
})