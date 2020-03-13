const app = require("./src/app")
const Port = process.env.Port || 3000

app.listen(Port, () => {
    console.log(`Servidor está rodando na Porta:${Port}`)
})