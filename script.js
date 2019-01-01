const NEWYEAR = {
    y2019: 15462756e5,
    y2020: 15778116e5
}

const SEASON = {
    SUMMER: NEWYEAR.y2019 + 3974400000,
    RAIN: NEWYEAR.y2019 + 11664000000,
    WINTER: NEWYEAR.y2019 + 24883200000
}

let DOM = {
    container: document.querySelector(".container"),
    containerOuter: document.querySelector(".container-outer"),
    timer: document.querySelector("#timer"),
    body: document.querySelector("body"),
    canvas: document.querySelector("#canvas"),
    dateInfoContainer: document.querySelectorAll(".date-info-container")
}

let season = false
let init

function winter() {
    var dom = DOM.containerOuter.classList
    dom.remove("rain", "summer")
    dom.add("winter")
    season = 0
    console.log('winter');
}

function summer() {
    var dom = DOM.containerOuter.classList
    dom.remove("rain", "winter")
    dom.add("summer")
    season = 1
}

function rain() {
    var dom = DOM.containerOuter.classList
    dom.remove("summer", "winter")
    dom.add("rain")
    season = 2
}

function seasonCheck() {
    let check = function (arg1, arg2, arg3) {
        return Date.now() === arg1 || (Date.now() > arg1 && Date.now() < arg2 && season !== arg3)
    }
    let seasonCheck = {
        winter1: check(NEWYEAR.y2019, SEASON.SUMMER, 0),
        summer: check(SEASON.SUMMMER, SEASON.RAIN, 1),
        rain: check(SEASON.RAIN, SEASON.WINTER, 2),
        winter2: check(SEASON.WINTER, SEASON.y2020, 0)
    }
    if (seasonCheck.winter1) {
        winter()
    } else if (seasonCheck.summer) {
        summer()
    } else if (seasonCheck.rain) {
        rain()
    } else if (seasonCheck.winter2) {
        winter()
    }
}


function timeCheck() {
    var time = (Math.floor((Date.now() % 86400000) / 3600)) % 24
    var timeParam = 0
    //morning = 0, day = 1, evening = 2, night = 3
    switch (timeParam) {
        case 0:
            DOM.canvas.style.background = "#ff9f43";
            break
        case 1:
            DOM.canvas.style.background = "#48dbfb";
            break
        case 2:
            DOM.canvas.style.background = "#5f27cd";
            break
        case 3:
            DOM.canvas.style.background = "#341f97";
            break
        default:
            console.log("error")
    }
}

function critical(arg) {
    if (arg <= 300) {
        DOM.container.style.background = "crimson"
        DOM.dateInfoContainer.forEach(el => {
            el.style.color = "white"
        })
        DOM.timer.style.color = "white"
        DOM.timer.style.fontWeight = 900
        DOM.containerOuter.classList.remove("summer", "winter", "rain")
    }
}

time = function () {
    if (Date.now() <= NEWYEAR.y2020) {
        var countdown, day, hour, sec, minute
        countdown = Math.floor((NEWYEAR.y2020 - Date.now()) / 1000)
        day = Math.floor(countdown / 86400)
        sec = countdown % 86400
        hour = Math.floor(sec / 3600)
        sec = (countdown % 3600)
        minute = Math.floor(sec / 60)
        sec = sec % 60
        DOM.timer.innerHTML = `${day}d ${hour}h ${minute}m ${sec}s`
        seasonCheck()
        timeCheck()
        critical(countdown)
    } else {
        DOM.timer.innerHTML = "happynewyear"
    }
    console.log("Test");
    return {
        init: true,
        countdown: countdown,
        day: day,
        hour: hour,
        minute: minute,
        sec: sec
    }
}()

function timer() {
    setInterval(()=>{
        if (countdown <= NEWYEAR.y2020) {
            var countdown, day, hour, sec, minute
            countdown = time.countdown--
            if(sec > 0){
                sec = time.sec--
            } 
            else{
                time.sec = 60
                if(time.minute > 0){
                    time.minute--
                }else{
                    time.minute = 60
                    if()
                }
            }
            DOM.timer.innerHTML = `${countdown}`
            seasonCheck()
            timeCheck()
            critical(countdown)
        } else {
            DOM.timer.innerHTML = "happynewyear"
        }
    }, 1000)
}

timer()


/*TODO: 1.raining 2.sunny --api
3. moon phase
4. 
*/