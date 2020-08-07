// Configurando banco de dados 
const Database = require('./database/db')


const { subjects, weekdays, getSubject }= require('./utils/format') // Dados para a logica da pagina

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

.get("/study", (req, res) => {
    const filters = req.query // Salvando o contéudo do formulario da pagina 

    if (!filters || !filters.weekday || !filters.time) {  // Se não tiver nada retorna a mesma pagina
        return res.render("study.html", { filters, subjects, weekdays }) // Passando o objeto para a página que ele será usado e o 'filters' que são as opcoes de filtro
    }

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule 
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${filters.time_from}
            AND class_schedule.time_to > ${filters.time_to}
        )
    `
    
})

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

