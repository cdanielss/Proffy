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

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) { // Pega o número passado no formulario e transforma em palavra
    const arrayPosition = +subjectNumber - 1 
    return subjects[arrayPosition] 
}

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
    // return res.sendFile(__dirname + "/views/index.html") = esse é o padrão do js
})
.get("/study", (req, res) => {
    const filters = req.query // Salvando o contéudo do formulario da pagina 
    return res.render("study.html", {proffys, filters, subjects, weekdays}) // Passando o objeto para a página que ele será usado e o 'filters' que são as opcoes de filtro
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

