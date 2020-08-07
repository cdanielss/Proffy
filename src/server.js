// Importando a funçao de render do pageStudy
const respageStudy = require('./pages')

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

.get("/give-classes", (req, res) => {
    const data = req.query // Pegando os dados do formulario
    const isNotEmpty = Object.keys(data).length > 0 // Verifica se data é vazio

    if (isNotEmpty) { // Condição pra salvar somente se tiver dados
        data.subject = getSubject(data.subject) // Mandando o número para função para retorna como palvra
        proffys.push(data) // Adicionando os dados do formulario e salvar nos proffys
        return res.redirect("/study") // Forma de redirecionar depois de ter salvo o formulario
    }
    
    return res.render("give-classes.html", {subjects,weekdays})
})

.listen(5500) // Escolhendo porta para o servidor 

