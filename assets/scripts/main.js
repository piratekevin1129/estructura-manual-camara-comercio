var i = 0;
var j = 0;
var k = 0;

function loadImg(data){
    var img = new Image()
    if(data.extra!=null&&data.extra!=undefined){
        img.setAttribute('f',data.extra.f)
    }
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)
        console.log("error loading img: "+img.src)        
    }
    img.src = data.src
}

function init(){
    var ancho = window.innerWidth
    var percent = (ancho*100)/1920
    var alto = (1080*percent)/100

    while(alto<window.innerHeight){
        ancho++
        percent = (ancho*100)/1920
        alto = (1080*percent)/100
    }

    getE('fondo').style.width = ancho+'px'
    getE('fondo').style.height = alto+'px'
}

function cerrarToolbar(){
    getE('toolbar').className = 'toolbar-off'
}

var animacion_titulos = null
var animacion_titulos_count = 0
var animacion_titulo_btn = null

function setAnimations(){
    getE('fondo-img').style.backgroundImage = 'url(./assets/images/fondo.jpg)'
    getE('container-wrap').className = 'container-wrap-initial'
    getE('w-fotografia').className = 'w-fotografia-on'
    getE('fondo-aros').className = 'fondo-aros-on fondo0'

    animacion_titulos = setInterval(function(){
        if(animacion_titulos_count==3){
            clearInterval(animacion_titulos)
            animacion_titulos = null

            getE('w-boton').className = 'boton-on'
            animacion_titulo_btn = setTimeout(function(){
                clearTimeout(animacion_titulo_btn)
                animacion_titulo_btn = null

                getE('w-boton').className = 'boton-onn'
                getE('btn-comenzar').className = 'w-button w-button-enabled'
                getE('btn-comenzar').setAttribute('onclick','clickComenzar()')
            },750)
            
        }else if(animacion_titulos_count==0){
            getE('w-titulo').className = 'animacion-caida-1'
        }else if(animacion_titulos_count==1){
            getE('w-subtitulo').className = 'animacion-caida-2'
        }else if(animacion_titulos_count==2){
            getE('w-texto').className = 'animacion-entrada-1'
        }
        animacion_titulos_count++
    },500)
}

var animacion_fondo = null;
var animacion_container_wrap = null;

function clickComenzar(){
    getE('fondo-aros').className = 'fondo-aros-off fondo0'
    animacion_fondo = setTimeout(function(){
        clearTimeout(animacion_fondo)
        animacion_fondo = null

        getE('container-wrap').className = 'content-wrap-0-1'
        animacion_container_wrap = setTimeout(function(){
            clearTimeout(animacion_container_wrap)
            animacion_container_wrap = null

            getE('fondo-aros').className = 'fondo-aros-on fondo1'
            
            animacion_titulos_count = 0
            animacion_titulos = setInterval(function(){
                if(animacion_titulos_count==3){
                    clearInterval(animacion_titulos_count)
                    animacion_titulos_count = null
                }else if(animacion_titulos_count==0){
                    getE('m-titulo').className = 'animacion-caida-1'
                }else if(animacion_titulos_count==1){
                    getE('m-subtitulo').className = 'animacion-caida-2'
                }else if(animacion_titulos_count==2){
                    getE('m-texto').className = 'animacion-entrada-1'
                }
                animacion_titulos_count++
            },500)
        },1000)
    },500)   
}

function overUnityBtn(zona){
    var btn = zona.parentNode
    var unity = btn.getElementsByClassName('m-unity')[0]

    var clases = String(unity.className).split(" ")
    clases[clases.length-1] = 'm-unity-over'
    unity.className = clases.join(" ")
}

function outUnityBtn(zona){
    var btn = zona.parentNode
    var unity = btn.getElementsByClassName('m-unity')[0]

    var clases = String(unity.className).split(" ")
    clases[clases.length-1] = 'm-unity-out'
    unity.className = clases.join(" ")
}

var animacion_fondo_cortina = null;

function clickUnityBtn(uni){
    getE('fondo-aros').className = 'fondo-aros-off fondo1'
    animacion_fondo = setTimeout(function(){
        clearTimeout(animacion_fondo)
        animacion_fondo = null

        getE('container-wrap').className = 'content-wrap-1-2'
                
        animacion_container_wrap = setTimeout(function(){
            clearTimeout(animacion_container_wrap)
            animacion_container_wrap = null

            getE('fondo-img2').className = "fondo-img-on"
            getE('fondo-img').className = "fondo-img-off"

            getE('fondo-aros').className = 'fondo-aros-on fondo2'
            getE('volver-btn1').className = 'volver-btn volver-btn-on'
            
        },1000)
    },500)
}

function clickModuleMenu(m,item){
    var module_div = item.parentNode
    var estado = module_div.getAttribute('data-s')
    var menu_div = getE('modulo'+m+'-menu')
    var menu_div_content = menu_div.getElementsByClassName('m2-module-menu-content')[0]
    if(estado=="closed"){
        module_div.className = 'm2-module m2-module-opened'
        module_div.setAttribute('data-s','opened')
        menu_div.style.height = menu_div_content.offsetHeight+'px'
    }else{
        module_div.setAttribute('data-s','closed')
        module_div.className = 'm2-module m2-module-closed'
        menu_div.style.height = '0px'
    }
}

function volverMenu(){
    getE('fondo-aros').className = 'fondo-aros-off fondo2'
    getE('volver-btn1').className = 'volver-btn volver-btn-off'

    animacion_fondo = setTimeout(function(){
        clearTimeout(animacion_fondo)
        animacion_fondo = null

        getE('container-wrap').className = 'content-wrap-2-1'
        
        animacion_container_wrap = setTimeout(function(){
            clearTimeout(animacion_container_wrap)
            animacion_container_wrap = null

            getE('fondo-img2').className = "fondo-img-off"
            getE('fondo-img').className = "fondo-img-on"

            getE('fondo-aros').className = 'fondo-aros-on fondo1'
        },1000)
    },500)
}

////////////////////////////////////////////////

var global_item = {
    unidad:0,
    modulo:0,
    tema:0
}
var actual_item = null

function clickModule(unity,modul,topic){
    global_item.tema = topic
    global_item.modulo = modul
    global_item.unity = unity

    actual_item = estructura[unity-1].modulos[modul-1].temas[topic-1]

    if(actual_item.tipo=='documentos'){
        abrirDocumentos()
    }else{
        getE('fondo-aros').className = 'fondo-aros-off fondo2'
        getE('volver-btn1').className = 'volver-btn volver-btn-off'
    
        animacion_fondo = setTimeout(function(){
            clearTimeout(animacion_fondo)
            animacion_fondo = null
    
            getE('container-wrap').className = 'content-wrap-2-3'
                    
            animacion_container_wrap = setTimeout(function(){
                clearTimeout(animacion_container_wrap)
                animacion_container_wrap = null
    
                //getE('fondo-img2').className = "fondo-img-off"
                //getE('fondo-img').className = "fondo-img-on"
    
                getE('toolbar').className = 'toolbar-on'
                getE('fondo-aros').className = 'fondo-aros-on fondo3'
                
                if(actual_item.tipo=='video'){
                    //ir a video
                    prepareVideo({src:'./content/unidad1/modulo1/tema1/video.mp4'})
                }else{
                    //prepareInteractiva({src:'./content/unidad1/modulo1/tema5/index.html'})
                }
            },2000)
        },500)
    }
}

function finishTema(){
    getE('fondo-aros').className = 'fondo-aros-off fondo3'
    getE('container-wrap').className = 'content-wrap-3-2'
    //getE('fondo-img2').className = "fondo-img-on"
    //getE('fondo-img').className = "fondo-img-off"
    getE('toolbar').className = 'toolbar-off'

    animacion_container_wrap = setTimeout(function(){
        clearTimeout(animacion_container_wrap)
        animacion_container_wrap = null


        getE('volver-btn1').className = 'volver-btn volver-btn-on'
        getE('fondo-aros').className = 'fondo-aros-on fondo2'
        
        if(actual_item.tipo=='video'){
            //poner en visto
            getE('item-1-1-1').className = 'm2-module-menu-content-checked'
        }
        
    },1000)
}