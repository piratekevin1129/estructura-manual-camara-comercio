var video_status = 'paused';
var l = 0;

function pauseVideo(){
    getE('video-vid').pause()
    getE('video-playpause').className = 'video-playpause-on'
    getE('video-timeline-playpause-btn').className = 'video-timeline-paused'
    getE('video-vid').className = 'video-vid-paused'
    video_status = 'paused'
    stopAnimateTimeline()
}
function playVideo(){
    getE('video-vid').play()
    getE('video-playpause').className = 'video-playpause-off'
    getE('video-timeline-playpause-btn').className = 'video-timeline-playing'
    getE('video-vid').className = 'video-vid-playing'
    video_status = 'playing'
    animateTimeline()
}

function clickPlayPause(){
    if(video_status=='paused'){
        playVideo()
    }else{
        pauseVideo()
    }
}

var video_sonido_status = 'unmuted'
function clickSonidoVideo(){
    if(video_sonido_status=='unmuted'){
        getE('video-timeline-sound-btn').className = 'video-timeline-sound-off'
        getE('video-vid').muted = true
        video_sonido_status = 'muted'
    }else{
        getE('video-timeline-sound-btn').className = 'video-timeline-sound-on'
        getE('video-vid').muted = false
        video_sonido_status = 'unmuted'
    }
}

function prepareVideo(data){
    getE('video-vid').src = data.src
    getE('video-vid').load()
    getE('video-vid').addEventListener('loadedmetadata', loadVideo)
    legends_active = []
    getE('video-legend').innerHTML = ''
}

function loadVideo(){
    getE('video-vid').removeEventListener('loadedmetadata', loadVideo)
    getE('video-vid').addEventListener('ended', endedVideo)

    //preparar tagas/legendas
    getE('video-timeline-tags').innerHTML = ''
    
    for(i = 0;i<actual_item.legends.length;i++){
        var tag = document.createElement('div')
        var p_tag = (actual_item.legends[i].time.start * 100)/getE('video-vid').duration
        tag.style.left = p_tag+'%'
        getE('video-timeline-tags').appendChild(tag)
    }
    
    var width_video = getE('video-vid').getBoundingClientRect().width
    getE('video-timeline-container').style.width = width_video+'px'
    getE('video-playpause').style.width = width_video+'px'

    getE('video-timeline-totaltime').innerHTML = formatTime(getE('video-vid').duration)
    getE('video-timeline-container').className = 'video-timeline-container-on'

    getE('video-vid').currentTime = 0
    playVideo()

    //desmutear
    getE('video-timeline-sound-btn').className = 'video-timeline-sound-on'
    getE('video-vid').muted = false
    video_sonido_status = 'unmuted'
}

var animacion_timeline = null
var animacion_legends = null
var legends_active = []
var current_legends = []

function animateTimeline(){
    animacion_timeline = setInterval(function(){
        getE('video-timeline-currenttime').innerHTML = formatTime(getE('video-vid').currentTime)
        var bar_percent = (getE('video-vid').currentTime * 100) / getE('video-vid').duration
        getE('video-timeline-tray').style.width = bar_percent+'%'
        getE('video-timeline-bola').style.left = bar_percent+'%'
    },100)

    animacion_legends = setInterval(function(){
        //verificar legenda
        var tiempo_int = parseInt(getE('video-vid').currentTime)
        console.log("leyenda :"+tiempo_int)
        
        current_legends = []
        for(l = 0;l<actual_item.legends.length;l++){
            if(
                tiempo_int>=actual_item.legends[l].time.start&&
                tiempo_int<actual_item.legends[l].time.end
            ){
                current_legends.push(l)
            }
        }

        if(current_legends.length>0){
            for(l = 0;l<current_legends.length;l++){
                var current_legend = current_legends[l]
                if(legends_active.indexOf(actual_item.legends[current_legend].id)==-1){
                    var legend_row = document.createElement('div')
                    legend_row.className = 'video-legend-row'
                    legend_row.id = actual_item.legends[current_legend].id
                    
                    var html_l = ""
                    
                    html_l+='<div class="video-legend-icon video-legend-icon-'+actual_item.legends[current_legend].tipo+'"></div>'
                    html_l+='<div class="video-legend-info">'
                        html_l+='<h2>'+actual_item.legends[current_legend].text+'</h2>'
                        html_l+='<p>'+actual_item.legends[current_legend].subtext+'</p>'
    
                        if(actual_item.legends[current_legend].display=='in'){
                            html_l+='<a class="video-legend-link" onclick="openLegendLink('+"'"+actual_item.legends[current_legend].href+"'"+')">'
                        }else{
                            html_l+='<a class="video-legend-link" href="'+actual_item.legends[current_legend].href+'" target="_blank">'
                        }
                            html_l+='<span>'+actual_item.legends[current_legend].btn+'</span>'
                            html_l+='<img src="assets/images/icon-legend-link.svg" />'
                        html_l+='</a>'
                    html_l+='</div>'
                    
                    legend_row.innerHTML = html_l
                    legends_active.push(actual_item.legends[current_legend].id)
                    getE('video-legend').appendChild(legend_row)
                }
            }

            getE('video-legend').className = 'video-legend-on'
        }else{
            getE('video-legend').className = 'video-legend-off'
            legends_active = []
            getE('video-legend').innerHTML = ''
        }
    },1000)
}

function clickTimeline(event,bar){
    var posx = event.pageX
    var initx = bar.getBoundingClientRect().left
    var distancia = (posx-initx)
    var porcentaje = (distancia * 100) / bar.getBoundingClientRect().width
    var duracion = (getE('video-vid').duration * porcentaje) / 100
    getE('video-vid').currentTime = duracion
}

function stopAnimateTimeline(){
    clearInterval(animacion_timeline)
    animacion_timeline = null
    clearInterval(animacion_legends)
    animacion_legends = null
}

function endedVideo(){
    stopAnimateTimeline()
    
    getE('video-vid').pause()
    getE('video-vid').src = ''
    getE('video-vid').removeEventListener('loadedmetadata', loadVideo)
    getE('video-vid').removeEventListener('ended', endedVideo)

    getE('video-legend').className = 'video-legend-off'
    getE('video-vid').className = 'video-vid-paused'
    getE('video-playpause').className = 'video-playpause-off'
    getE('video-timeline-container').className = 'video-timeline-container-off'
    getE('video-iframe-container').className = 'video-iframe-container-off'
    getE('video-iframe').removeAttribute('src')

    finishTema()
}

function openLegendLink(url){
    //parar video
    pauseVideo()

    var width = getE('video-vid').getBoundingClientRect().width
    var height = getE('video-vid').getBoundingClientRect().height

    getE('video-iframe').setAttribute('width', width);
    getE('video-iframe').setAttribute('height', height);
    getE('video-iframe').setAttribute('src', url);
    getE('video-iframe').setAttribute('frameborder', '0');
    getE('video-iframe').setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    getE('video-iframe').setAttribute('allowfullscreen', '');
    
    getE('video-iframe-container').className = 'video-iframe-container-on'
}
function cerrarLegendLink(){
    getE('video-iframe-container').className = 'video-iframe-container-off'
    getE('video-iframe').removeAttribute('src')

    playVideo()
}

function formatTime(duration){
    var duracion = parseInt(duration)
    var minutos = parseInt(duracion/60)
    var segundos = duracion - (minutos * 60)

    var minutos_txt = ""
    var segundos_txt = ""
    if(minutos<10){
        minutos_txt = String('0'+minutos)
    }else{
        minutos_txt = String(minutos)
    }
    if(segundos<10){
        segundos_txt= String('0'+segundos)
    }else{
        segundos_txt = String(segundos)
    }
    var time_txt = String(minutos_txt+':'+segundos_txt)
    return time_txt
}