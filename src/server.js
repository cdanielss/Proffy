// Importando a funçao de render do pageStudy
const { respageStudy, resSaveClass } = require('./pages')

const { subjects, weekdays, getSubject, convertHoursToMinutes }= require('./utils/format') // Dados para a logica da pagina

// Configurando o servidor npm install express
const express = require('express')
const server = express()
// Configurando Template engine npm install nunjucks
const nunjucks = require('nunjucks')

// Configurando nunjucks, para o html {Template engine}
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server.use(express.static("public")) // Configuração do Servidor para pegar os styles

.get("/", (req, res) => {   // Criando as rotas da aplicação
    return res.render("index.html") // 'render' é uma função do nunjucks
    // return res.sendFile(__dirname + "/views/index.html") = esse é o padrão do js
})

.get("/study", respageStudy)

// Recebendo os dados do req.body, para nao aparecer na aba
.use(express.urlencoded({ extended: true }))
.get("/give-classes", (req, res) => {
    return res.render("give-classes.html", {subjects,weekdays})
})
// Criando rota para receber os dados pelo metodo post
.post("/save-class", resSaveClass)

.listen(5500) // Escolhendo porta para o servidor 

