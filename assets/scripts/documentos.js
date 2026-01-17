var html_ninguno = '<h6 class="documentos-cargados-ninguno">Aún no se ha cargado ningún documento</h6>'

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

    getE('documentos-cargados-list').innerHTML = html_ninguno
}

function abrirDocumentos(){
    getE('documentos-container').className = 'documentos-container-on'
}

function cerrarDocumentos(){
    //limpiar
    getE('documentos-cargados-list').innerHTML = html_ninguno
    getE('input_documentos_form').reset()
}

var input_documentos = getE('input_documentos')
input_documentos.addEventListener('change', seleccionarDocumentos)

function seleccionarDocumentos (event) {
    var files = event.target.files; // or fileInput.files

    // Log the FileList (an array-like object)
    console.log(files);

    
    if(files.length>0){
        getE('documentos-cargados-list').innerHTML = ''
        // You can iterate over the files
        for(k = 0;k<files.length;k++){
            var item = document.createElement('a')
            item.className = 'documentos-cargado-item'
            item.innerHTML = '<img src="./assets/images/icon-documentos-documento2.svg" /><p>'+files[k].name+'</p>'
            getE('documentos-cargados-list').appendChild(item)    
        }
    }else{
        getE('documentos-cargados-list').innerHTML = html_ninguno
    }

    /*for (const file of files) {
        console.log('File Name:', file.name);
        console.log('File Size:', file.size, 'bytes');
        console.log('File Type:', file.type);
        // You can use the FileReader API to read the file contents
    }*/
}

function cerrarAlerta(){
    getE('alerta').className = 'alerta-off'
}

var loading_documentos = false;
getE('input_documentos_form').onsubmit = function(event){
    event.preventDefault()

    if(!loading_documentos){
        loading_documentos = true;
        //volver en cargador
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
                cerrarDocumentos()
            }else{
                //algo malo ocurrió
                setAlertaError()
                cerrarDocumentos()
            }
            getE('documentos-subir-paquete-btn').getElementsByTagName('div')[0].className = 'documentos-subir-paquete-btn-normal'
            loading_documentos = false;
        })
        .catch(error => {
            console.error('Error:', error);
            setAlertaError()
            cerrarDocumentos()

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