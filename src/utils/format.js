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

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":") // split divide string de acordo com o argumento passado, no caso esse argumento sao dois pontos
    // ou seja const hour = time.split(":")[0]
    // ou seja const hour = time.split(":")[1]
    return Number((hour * 60) + minutes)

}

function getSubject(subjectNumber) { // Pega o número passado no formulario e transforma em palavra
    const arrayPosition = +subjectNumber - 1 
    return subjects[arrayPosition] 
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}