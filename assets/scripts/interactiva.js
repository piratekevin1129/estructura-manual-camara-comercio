function prepareInteractiva(data){
    getE('interactiva-iframe').src = data.src
}

function endedInteractiva(){
    finalizarActividad()
}

function finalizarActividad(){
    getE('interactiva-iframe').src = ''
    finishTema()
}