var html_ninguno = ''

function setDocumentos(){
    for(i = 0;i<documentos.length;i++){
        var item = document.createElement('a')
        item.className = 'documentos-contenido-item'
        item.setAttribute('target','_blank')
        item.setAttribute('href',String('./assets/docs/'+documentos[i].src))
        
        var h = ''
        h+='<div>'
            h+='<img src="./assets/images/icon-documentos-documento.svg" />'
        h+='</div>'
        h+='<div>'
            h+='<p>'+documentos[i].nombre+'</p>'
            h+='<p><span>'+documentos[i].peso+'</span></p>'
        h+='</div>'
        h+='<div>'
            h+='<img src="./assets/images/icon-documentos-descargar2.svg" />'
        h+='</div>'
        item.innerHTML = h

        getE('documentos-contenidos-list').appendChild(item)
    }
}

function abrirDocumentos(){
    getE('documentos-container').className = 'documentos-container-on'
}

function cerrarDocumentos(){
    //limpiar
    //getE('input_documentos_form').reset()
    getE('documentos-container').className = 'documentos-container-off'
}

var input_data = new DataTransfer();
var input_documentos = getE('input_documentos')
input_documentos.addEventListener('change', seleccionarDocumentos)
var documentos_agregados = []
var documentos_removidos = []

function seleccionarDocumentos () {
    var files = input_documentos.files;
    //input_data = new DataTransfer();

    for(i=0;i<files.length;i++){
        //evitar repetidos
        var repetido = false;
        for(j = 0;j<documentos_agregados.length;j++){
            if(documentos_agregados[j].name==files[i].name){
                repetido = true;
            }
        }
        if(!repetido){
            documentos_agregados.push({name:files[i].name})
            input_data.items.add(files[i]);
        }
    }

    getE('input_documentos2').files = input_data.files
    documentos_removidos = []
    actualizarDocumentos()
}

function actualizarDocumentos(){
    //console.log(files);
    var files = input_data.files
    getE('documentos-cargados-list').innerHTML = ''

    if(files.length>0){
        getE('documentos-cargados-ninguno').style.display = 'none'
        
        for(k = 0;k<files.length;k++){
            var item = document.createElement('a')
            item.className = 'documentos-cargado-item'
            item.innerHTML = '<img src="./assets/images/icon-documentos-documento2.svg" /><p>'+files[k].name+'</p><button type="button" onclick="removerDocumento(this)"></button>'
            getE('documentos-cargados-list').appendChild(item)
        }
    }else{
        getE('documentos-cargados-ninguno').style.display = 'block'
    }
}

function removerDocumento(btn){
    var item_parent = btn.parentNode
    item_parent.setAttribute('active','false')
    var item_name = item_parent.getElementsByTagName('p')[0].innerHTML

    //quitar de agregados
    var documentos_agregados_new = []
    var input_data_new = new DataTransfer();
    var current_files = getE('input_documentos2').files

    for(i=0;i<current_files.length;i++){
        //evitar repetidos
        if(item_name!=current_files[i].name){
            //incluir
            input_data_new.items.add(current_files[i])
            documentos_agregados_new.push({name:current_files[i].name})
        }
    }

    input_data = input_data_new
    documentos_agregados = documentos_agregados_new

    documentos_removidos.push(item_name)
    actualizarDocumentos()
}

function cerrarAlerta(){
    getE('alerta').className = 'alerta-off'
}

var loading_documentos = false;
getE('input_documentos_form').onsubmit = function(event){
    event.preventDefault()

    if(!loading_documentos){
        //agregar lista de documentos removidos
        getE('removidos_documentos2').value = String(documentos_removidos.toString())

        loading_documentos = true;
        getE('documentos-subir-paquete-btn').getElementsByTagName('div')[0].className = 'documentos-subir-paquete-btn-loading'
        const formData = new FormData(getE('input_documentos_form')); // Create a FormData object from the form
    
        fetch('./api/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Get the response as text
        .then(result => {
            console.log(result);
            var json_result = JSON.parse(result)
            if(json_result.errors.length==0){
                //todo bien
                setAlertaOk()
                getE('documentos-container').className = 'documentos-container-off'
            }else{
                //algo malo ocurrió
                setAlertaError()
            }
            getE('documentos-subir-paquete-btn').getElementsByTagName('div')[0].className = 'documentos-subir-paquete-btn-normal'
            loading_documentos = false;
        })
        .catch(error => {
            console.error('Error:', error);
            setAlertaError()
            
            getE('documentos-subir-paquete-btn').getElementsByTagName('div')[0].className = 'documentos-subir-paquete-btn-normal'
            loading_documentos = false;
        });
    }
}

function setAlertaError(){
    getE('alerta-titulo').innerHTML = '¡Ocurrió un error!'
    getE('alerta-text').innerHTML = 'Los documentos no se pudieron guardar, por favor vuelva a intentarlo.'
    getE('alerta-icono').className = 'alerta-icono-error'
    getE('alerta').className = 'alerta-on'
}
function setAlertaOk(){
    getE('alerta-titulo').innerHTML = '¡Envío Exitoso!'
    getE('alerta-text').innerHTML = 'Los documentos se han cargado correctamente en el sistema'
    getE('alerta-icono').className = 'alerta-icono-ok'
    getE('alerta').className = 'alerta-on'
}