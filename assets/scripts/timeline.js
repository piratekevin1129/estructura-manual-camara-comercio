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
function animateTimeline(){
    animacion_timeline = setInterval(function(){
        getE('video-timeline-currenttime').innerHTML = formatTime(getE('video-vid').currentTime)
        var bar_percent = (getE('video-vid').currentTime * 100) / getE('video-vid').duration
        getE('video-timeline-tray').style.width = bar_percent+'%'
        getE('video-timeline-bola').style.left = bar_percent+'%'
    },100)
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