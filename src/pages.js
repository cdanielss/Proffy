// Configurando banco de dados 
const Database = require('./database/db')
const { subjects, weekdays, getSubject, convertHoursToMinutes }= require('./utils/format')
const express = require('express')
const server = express()

async function respageStudy(req, res) {
    const filters = req.query // Salvando o contéudo do formulario da pagina 

    if (!filters || !filters.weekday || !filters.time) {  // Se não tiver nada retorna a mesma pagina
        return res.render("study.html", { filters, subjects, weekdays }) // Passando o objeto para a página que ele será usado e o 'filters' que são as opcoes de filtro
    }

    // Convertendo em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule 
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    
    // Tratamento de erros e consultando os dados 
    try {
        const db = await Database
        const proffys = await db.all(query)
        return res.render("study.html", {proffys, subjects, filters, weekdays})
    } catch (error) {
        console.log(error)
    }
}

module.exports = respageStudy