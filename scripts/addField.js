// Procurar o botão 
document.querySelector('#add-time')
.addEventListener('click', cloneField) // Executa quando o botão for clicado

function cloneField(){
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) // Clonando o elemento
    
    const fields = newFieldContainer.querySelectorAll('input') // Pegando os elementos para ser limpos

    // Pegar cada field usando um for
    fields.forEach(function (field){
        field.value = ""
    })

    document.querySelector('#schedule-items').appendChild(newFieldContainer) // Escolhendo o local para ser exibido o html novo
}

