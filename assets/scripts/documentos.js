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

function cerrarDocumentos(){
    getE('documentos-container').className = 'documentos-container-off'
}