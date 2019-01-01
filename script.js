"use-strict";
/*----------variable declaration----------*/
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
    timeInfo: document.querySelector("#time-info"),
    dateInfo: document.querySelector("#date-info")
}

let variable = {
    season: false
}
/*------------------------------*/

/*----------season function-----------*/
function winter() {
    let dom = DOM.containerOuter.classList
    dom.remove("rain", "summer")
    dom.add("winter")
    variable.season = 0
}

function summer() {
    let dom = DOM.containerOuter.classList
    dom.remove("rain", "winter")
    dom.add("summer")
    variable.season = 1
}

function rain() {
    let dom = DOM.containerOuter.classList
    dom.remove("summer", "winter")
    dom.add("rain")
    variable.season = 2
}
/*------------------------------*/

/*----------checking function-----------*/
function seasonCheck() {
    let check = function (arg1, arg2, arg3) {
        return Date.now() === arg1 || (Date.now() > arg1 && Date.now() < arg2 && variable.season !== arg3)
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
    } else if(seasonCheck.winter2) {
        winter()
    }
}

function timeCheck() {
    let today = new Date()
    let hour = today.getHours()
    let min = today.getMinutes()
    //let hour =  Math.floor((Date.now() % 86400000) / 3600000) + 7
    //let min = Math.floor(((Math.floor((Date.now() % 86400000) / 1000)) % 3600) / 60)
    let minFormat = min.toString().padStart(2, "0")
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    DOM.timeInfo.innerHTML = `${hour}:${minFormat}`
    DOM.dateInfo.innerHTML = `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}`
    let timeParam = 0
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
/*------------------------------*/

/*----------IIFE function (init)----------*/
(function () {
    seasonCheck()
    timeCheck()
    console.log("init")
}())
/*------------------------------*/

/*----------main timer----------*/
let timer = setInterval(function () {
    if (Date.now() <= NEWYEAR.y2020) {
        let countdown, day, hour, sec, minute
        countdown = Math.floor((NEWYEAR.y2020 - Date.now()) / 1000)
        day = Math.floor(countdown / 86400)
        sec = countdown % 86400
        hour = Math.floor(sec / 3600)
        sec = (countdown % 3600)
        minute = Math.floor(sec / 60)
        sec = sec % 60
        DOM.timer.innerHTML = `${day}d ${hour}h ${minute}m ${sec}s`
        if(sec===59){
            seasonCheck()
            timeCheck()
        }
        if (countdown <= 300) {
            DOM.container.style.background = "crimson"
            DOM.containerOuter.style.background = "white"
            DOM.timer.style.color = "white"
            DOM.timer.style.fontWeight = 900
        }
    } else {
        DOM.timer.innerHTML = "happynewyear"
        clearInterval(timer)
    }
}, 1000)
/*------------------------------*/

/*TODO: 1.raining 2.sunny --api
3. moon phase
4. 
*/ 