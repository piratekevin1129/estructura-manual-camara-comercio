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
    getE('documentos-container').className = 'documentos-container-off'
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
            item.innerHTML = '<img src="assets/images/icon-documentos-documento2.svg" /><p>'+files[k].name+'</p>'
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