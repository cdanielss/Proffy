// Configurando banco de dados npm install sqlite-async
// Rodando o codigo node src/database/db.js
const Database = require('sqlite-async')


function execute(db) { // db vem por padrão na funcao 
    // Criando as tabelas dos bancos
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER     
        );
    `)
}

// module.exports está exportando o banco 
module.exports = Database.open(__dirname + '/database.sqlite').then(execute) // Abrindo o banco 