module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){ //async para usar o await
    // Inserindo dados nas tabelas
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    
    const proffy_id = insertedProffy.lastID // Pega o ultimo id dos professores 
 
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => { // o map concatena os arrays que ele encontra no return
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // Executando o retorno de insertAllClassesSchedulesValues um por um
    await Promise.all(insertedAllClassesScheduleValues) // Rodando todas as promessas 

}