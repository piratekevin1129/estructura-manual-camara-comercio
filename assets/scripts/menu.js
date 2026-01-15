function setMenu(){
    for(i = 0;i<estructura[2].modulos.length;i++){
        var module_id = (i+1)
        var modulo_div = document.createElement('div')
        modulo_div.className = 'm2-module-btn'
        modulo_div.id = 'modulo'+module_id

        var h = ''
        if(estructura[2].modulos[i].bloquedo){
            h+='<div class="m2-module m2-module-locked m2-module-closed" data-s="closed">'
        }else{
            h+='<div class="m2-module m2-module-unlocked m2-module-closed" data-s="closed" onmouseenter="overModuleBtn()">'
        }
            h+='<div class="m2-module-onda"></div>'
            if(estructura[2].modulos[i].bloquedo){
                h+='<div class="m2-module-img">'
            }else{
                h+='<div class="m2-module-img" onclick="clickModuleMenu('+module_id+',this)">'
            }
                h+='<img src="content/unidad3/modulo'+module_id+'/foto.jpg" />'
            h+='</div>'

            if(estructura[2].modulos[i].bloquedo){
                h+='<div class="m2-module-info">'
            }else{
                h+='<div class="m2-module-info" onclick="clickModuleMenu('+module_id+',this)">'
            }
                h+='<div><span>'+module_id+'</span><img src="./assets/images/icon-unity-locked.svg" /></div>'
                h+='<p>'+estructura[2].modulos[i].nombre+'</p>'
            h+='</div>'

            h+='<div class="m2-module-menu" id="modulo'+module_id+'-menu">'
                h+='<ul class="m2-module-menu-content">'
                for(j = 0;j<estructura[2].modulos[i].temas.length;j++){
                    var tema_id = (j+1)
                    if(
                        estructura[2].modulos[i].temas[j].active!=null&&
                        estructura[2].modulos[i].temas[j].active!=undefined
                    ){
                        h+='<li id="item-1-'+module_id+'-'+tema_id+'" onclick="clickModule(3,'+module_id+','+tema_id+')">'
                    }else{
                        h+='<li>'
                    }

                    if(estructura[2].modulos[i].temas[j].tipo=='video'){
                        h+='<img src="./assets/images/icon-module-video.svg" />'
                    }else if(estructura[2].modulos[i].temas[j].tipo=='interactiva'){
                        h+='<img src="./assets/images/icon-module-interactiva.svg" />'
                    }else if(estructura[2].modulos[i].temas[j].tipo=='documentos'){
                        h+='<img src="./assets/images/icon-module-document.svg" />'
                    }
                            
                    h+='<span>'+estructura[2].modulos[i].temas[j].nombre+'</span>'
                    h+='<div></div>'
                        
                    h+='</li>'
                }
                h+='</ul>'
            h+='</div>'
        h+='</div>'

        modulo_div.innerHTML = h

        getE('m2-modules').appendChild(modulo_div)
    }
}