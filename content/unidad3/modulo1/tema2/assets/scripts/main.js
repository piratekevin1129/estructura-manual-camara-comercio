function getE(idname){
    return document.getElementById(idname)
}

function overBtn(){
    over_mp3.play()
}

var total_cartas = data_cards.length
var actual_carta = 1;
var animating_carta = false;
var animacion_carta = null;

var global_audio = null;

function setPasos(){
    for(i = (data_cards.length-1);i>=0;i--){
        var card = document.createElement('div')
        card.id = 'carta-'+(i+1)
        if(i>1){
            card.className = 'carta-container carta-hidden'
        }else{
            card.className = 'carta-container'
        }
        var h = '';
            h+='<div class="carta carta-low">'
                h+='<div class="carta-row">'
                    h+='<div class="row-dibujo">'
                        h+='<img src="assets/images/foto'+data_cards[i].id+'.png" />'
                        //<p class="dibujo-tag">Riesgo bajo</p>
                    h+='</div>'
                h+='</div>'
                h+='<div class="carta-row">'
                    h+='<div class="row-head">'
                        h+='<h3>'+data_cards[i].title+'</h3>'
                        //<h2>Condición Insegura</h2>
                        h+='<p>'+data_cards[i].subtitle+'</p>'
                    h+='</div>'
                    h+='<div class="row-foot">'
                        h+='<div class="foot-tooltip">'
                            h+='<div style="background-image:url(./assets/images/icon-'+data_cards[i].id+'.svg)"></div>'
                            h+='<p>'+data_cards[i].tooltip+'</p>'
                        h+='</div>'

                        h+='<div class="foot-botones">'
                            if(i==0){
                                h+='<button type="button" class="boton-hidden">'
                            }else{
                                h+='<button type="button" class="boton-normal" onclick="clickAnterior()" onmouseover="overBtn()">'
                            }
                                h+='<span>←</span>'
                                h+='<span>Anterior</span>'
                            h+='</button>'
                            if(i==(data_cards.length-1)){
                                h+='<button type="button" class="boton-normal" onclick="clickFinalizar()" onmouseover="overBtn()">'
                            }else{
                                h+='<button type="button" class="boton-normal" onclick="clickSiguiente()" onmouseover="overBtn()">'
                            }
                                h+='<span>Siguiente</span>'
                                h+='<span>→</span>'
                            h+='</button>'
                        h+='</div>'
                    h+='</div>'
                h+='</div>'
            h+='</div>'
        h+='</div>'

        card.innerHTML = h
        getE('cartas-container').appendChild(card)
    }

    for(i = 0;i<data_cards.length;i++){
        //pasos
        var div_paso = document.createElement('div')
        div_paso.id = 'paso-'+(i+1)
        if(i==0){
            div_paso.className = 'paso active'
        }else{
            div_paso.className = 'paso'
        }
        var d = ''
        d+='<p>'+(i+1)+'</p>'

        div_paso.innerHTML = d
        getE('pasos').appendChild(div_paso)
    }

}

function clickSiguiente(){
    if(!animating_carta){
        intro_mp3.pause()
        if(global_audio!=null){
            global_audio.pause()
        }

        animating_carta = true;
        var next_carta = (actual_carta+1)

        getE('carta-'+actual_carta).style.zIndex = 3
        getE('carta-'+next_carta).style.zIndex = 2
        for(var i = 1;i<=total_cartas;i++){
            if(i!=next_carta&&i!=actual_carta){
                getE('carta-'+i).style.zIndex = 1
                getE('carta-'+i).className = 'carta-container carta-hidden'
            }
        }

        getE('cartas-container').className = 'cartas-out'
    
        getE('carta-'+actual_carta).className = 'carta-container carta1-off'
        getE('carta-'+next_carta).className = 'carta-container carta2-off'
        animacion_carta = setTimeout(function(){
            clearTimeout(animacion_carta)
            animacion_carta = null;
            
            getE('carta-'+actual_carta).style.zIndex = 2
            getE('carta-'+next_carta).style.zIndex = 3
            
            getE('carta-'+actual_carta).className = 'carta-container carta1-on'
            getE('carta-'+next_carta).className = 'carta-container carta2-on'
    
            getE('cartas-container').className = 'cartas-in'
            
            animacion_carta = setTimeout(function(){
                clearTimeout(animacion_carta)
                animacion_carta = null;
    
                for(i = 1;i<=total_cartas;i++){
                    getE('carta-'+i).className = 'carta-container'
                }

                animating_carta = false;
                actual_carta = next_carta

                updatePasos()
            },300)
        },300)

        
        carta_mp3.currentTime = 0
        carta_mp3.play()
    }
}

function clickAnterior(){
    if(!animating_carta){
        intro_mp3.pause()
        if(global_audio!=null){
            global_audio.pause()
        }
        animating_carta = true;
        var prev_carta = (actual_carta-1)

        getE('carta-'+actual_carta).style.zIndex = 3
        getE('carta-'+prev_carta).style.zIndex = 2
        for(var i = 1;i<=total_cartas;i++){
            if(i!=prev_carta&&i!=actual_carta){
                getE('carta-'+i).style.zIndex = 1
                getE('carta-'+i).className = 'carta-container carta-hidden'
            }
        }

        getE('cartas-container').className = 'cartas-out'
    
        getE('carta-'+actual_carta).className = 'carta-container carta2-off'
        getE('carta-'+prev_carta).className = 'carta-container carta1-off'
        animacion_carta = setTimeout(function(){
            clearTimeout(animacion_carta)
            animacion_carta = null;
            
            getE('carta-'+actual_carta).style.zIndex = 2
            getE('carta-'+prev_carta).style.zIndex = 3
            
            getE('carta-'+actual_carta).className = 'carta-container carta2-on'
            getE('carta-'+prev_carta).className = 'carta-container carta1-on'
    
            getE('cartas-container').className = 'cartas-in'
            
            animacion_carta = setTimeout(function(){
                clearTimeout(animacion_carta)
                animacion_carta = null;
    
                for(i = 1;i<=total_cartas;i++){
                    getE('carta-'+i).className = 'carta-container'
                }
                animating_carta = false;
                actual_carta = prev_carta

                updatePasos()
            },300)
        },300)

        carta_mp3.currentTime = 0
        carta_mp3.play()
    }
}

function updatePasos(){
    //pasos
    for(i = 1;i<=total_cartas;i++){
        getE('paso-'+i).className = 'paso'
    }
    getE('paso-'+actual_carta).className = 'paso active'
    for(i = 1;i<actual_carta;i++){
        getE('paso-'+i).className = 'paso visited'
    }
    var percent = parseInt(100/(total_cartas-1))
    getE('paso-line').style.width = percent+'%'
    getE('paso-line').style.width = 'calc('+percent+'% * '+(actual_carta-1)+')'
    getE('paso-line').style.width = '-moz-calc('+percent+'% * '+(actual_carta-1)+')'

    console.log(audios_data)
    console.log(actual_carta-1)
    global_audio = audios_data[actual_carta-1]
    global_audio.currentTime = 0
    global_audio.play()
}

function clickFinalizar(){
    parent.finalizarActividad()
}