const express = require('express')
const server = express()

server.use(express.static("public")) // Configuração do Servidor para pegar os styles

.get("/", (req, res) => {   // Criando as rotas da aplicação
    return res.sendFile(__dirname + "/views/index.html")
})
.get("/study", (req, res) => {
    return res.sendFile(__dirname + "/views/study.html")
})
.get("/give-classes", (req, res) => {
    return res.sendFile(__dirname + "/views/give-classes.html")
})

.listen(5500) // Escolhendo porta para o servidor 
