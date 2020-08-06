const proffys = [
    {
        name: "Carlos Daniel",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "323242", 
        bio: "Estudante",
        subject: "Química",
        cost: 20,
        weekday: [0], 
        time_from: [720], 
        time_to: [120] 
    },
    {
        name: "Daniel",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "323242", 
        bio: "Estudante",
        subject: "Química",
        cost: 20,
        weekday: [0], 
        time_from: [720], 
        time_to: [120] 
    }
]

// Configurando o servidor
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

// Configurando nunjucks, para o html {Template engine}
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server.use(express.static("public")) // Configuração do Servidor para pegar os styles

.get("/", (req, res) => {   // Criando as rotas da aplicação
    return res.render("index.html") // 'render' é uma função do nunjucks
    // return res.sendFile(__dirname + "/views/index.html") esse é o padrão do js
})
.get("/study", (req, res) => {
    return res.render("study.html", {proffys}) // Passando o objeto para a página que ele será usado
})
.get("/give-classes", (req, res) => {
    return res.render("give-classes.html")
})

.listen(5500) // Escolhendo porta para o servidor 

