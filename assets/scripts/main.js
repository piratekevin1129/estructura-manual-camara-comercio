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
    getE('fondo-img').style.backgroundImage = 'url(./assets/images/fondo.jpg)'
}

var animacion_titulos = null
var animacion_titulos_count = 0
var animacion_titulo_btn = null

function setAnimations(){
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

                console.log("animando")
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
        },2000)
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

function clickUnityBtn(uni){
    getE('fondo-aros').className = 'fondo-aros-off fondo1'
    animacion_fondo = setTimeout(function(){
        clearTimeout(animacion_fondo)
        animacion_fondo = null

        getE('container-wrap').className = 'content-wrap-1-1'
        animacion_container_wrap = setTimeout(function(){
            clearTimeout(animacion_container_wrap)
            animacion_container_wrap = null

            getE('fondo-aros').className = 'fondo-aros-on fondo2'
            
        },2000)
    },500)
}