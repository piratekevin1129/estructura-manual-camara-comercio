var video_status = 'paused'

function clickPlayPause(){
    if(video_status=='paused'){
        getE('video-vid').play()
        getE('video-playpause').className = 'video-playpause-off'
        getE('video-timeline-playpause-btn').className = 'video-timeline-playing'
        getE('video-vid').className = 'video-vid-playing'
        video_status = 'playing'
    }else{
        getE('video-vid').pause()
        getE('video-playpause').className = 'video-playpause-on'
        getE('video-timeline-playpause-btn').className = 'video-timeline-paused'
        getE('video-vid').className = 'video-vid-paused'
        video_status = 'paused'
    }
}

function prepareVideo(data){
    getE('video-vid').src = data.src
    getE('video-vid').load()
    getE('video-vid').addEventListener('loadedmetadata', loadVideo)
}

function loadVideo(){
    getE('video-vid').removeEventListener('loadedmetadata', loadVideo)
    getE('video-vid').addEventListener('ended', endedVideo)

    //preparar tagas/legendas
    getE('video-timeline-tags').innerHTML = ''
    
    for(i = 0;i<actual_item.legends.length;i++){
        var tag = document.createElement('div')
        var p_tag = (actual_item.legends[i].time * 100)/getE('video-vid').duration
        tag.style.left = p_tag+'%'
        getE('video-timeline-tags').appendChild(tag)
    }
    
    
    var width_video = getE('video-vid').getBoundingClientRect().width
    getE('video-timeline-container').style.width = width_video+'px'
    getE('video-playpause').style.width = width_video+'px'

    getE('video-timeline-totaltime').innerHTML = formatTime(getE('video-vid').duration)

    getE('video-vid').currentTime = 0
    video_status = 'playing'
    getE('video-vid').play()
    getE('video-playpause').className = 'video-playpause-off' //por si acaso
    getE('video-timeline-container').className = 'video-timeline-container-on'
    getE('video-timeline-playpause-btn').className = 'video-timeline-playing'
    getE('video-vid').className = 'video-vid-playing'
    animateTimeline()
}

var animacion_timeline = null
var animacion_legends = null
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
        for(var l = 0;l<actual_item.legends.length;l++){
            console.log(actual_item.legends[l].time,tiempo_int)
            if(actual_item.legends[l].time==tiempo_int){
                //poner legenda
                if(!animacion_legend_status){
                    getE('video-legend-text').innerHTML = actual_item.legends[l].text
                    getE('video-legend-subtext').innerHTML = actual_item.legends[l].subtext
                    getE('video-legend-btn').innerHTML = actual_item.legends[l].btn
                    getE('video-legend-link').href = actual_item.legends[l].href
                    getE('video-legend').className = 'video-legend-on'
                    animacion_legend_status = true
                    animacion_legend_active = setTimeout(animacionLegendActive,4000)
                }

            }
        }
    },1000)
}

var animacion_legend_status = false
var animacion_legend_active = null

function animacionLegendActive(){
    clearTimeout(animacion_legend_active)
    animacion_legend_active = null
    animacion_legend_status = false
    getE('video-legend').className = 'video-legend-off'
}

function clickTimeline(event,bar){
    var posx = event.pageX
    var initx = bar.getBoundingClientRect().left
    var distancia = (posx-initx)
    var porcentaje = (distancia * 100) / bar.getBoundingClientRect().width
    var duracion = (getE('video-vid').duration * porcentaje) / 100
    getE('video-vid').currentTime = duracion
}

function stopAnimateTImeline(){
    clearInterval(animacion_timeline)
    animacion_timeline = null
    clearInterval(animacion_legends)
    animacion_legends = null
}

function endedVideo(){
    stopAnimateTImeline()

    getE('video-vid').className = 'video-vid-paused'
    getE('video-playpause').className = 'video-playpause-off'
    getE('video-timeline-container').className = 'video-timeline-container-off'

    finishTema()
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