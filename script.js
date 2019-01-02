"use-strict";

/* Variable */
const newYear = new Date(`${parseInt(new Date().getFullYear(), 10) + 1}`).valueOf(),
    nextNewYear = new Date(`${parseInt(new Date().getFullYear(), 10) + 2}`).valueOf();

let DOM = {
    container: document.querySelector(".container"),
    containerOuter: document.querySelector(".container-outer"),
    timer: document.querySelector("#timer"),
    body: document.querySelector("body"),
    canvas: document.querySelector("#canvas"),
    timeInfo: document.querySelector("#time-info"),
    dateInfo: document.querySelector("#date-info")
},
variable = { season: false }

/* Update Season */
let summer = () => {
    let dom = DOM.containerOuter.classList

    // In case of other season still running
    dom.remove("rain", "winter")

    dom.add("summer")
    variable.season = 1;
},

rain = () => {
    let dom = DOM.containerOuter.classList
    dom.remove("summer", "winter")
    dom.add("rain")
    variable.season = 2;
},

winter = () => {
    let dom = DOM.containerOuter.classList;
    dom.remove("rain", "summer")
    dom.add("winter")
    variable.season = 0;
},

/* Check function */
seasonCheck = () => {
    let currentTime = new Date().valueOf();
    switch(true){
        case (currentTime <= newYear + 3974400000):
            summer();
            break;
        case (currentTime <= newYear + 11664000000):
            rain();
            break;
        case (currentTime <= newYear + 24883200000):
            winter();
            break;
        default:
            break;
    }
},

timeCheck = () => {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        minFormat = min.toString().padStart(2, "0"),
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    DOM.timeInfo.innerHTML = `${hour}<span>:</span>${minFormat}`
    DOM.dateInfo.innerHTML = `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}`

    // morning = 0, day = 1, evening = 2, night = 3
    switch(0){
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
    }
},

updateTime = () => {
    window.countdown = Math.floor((newYear - Date.now()) / 1000);
    window.day = Math.floor(countdown / 86400);
    window.hour = Math.floor((countdown % 86400) / 3600);
    window.minute = Math.floor((countdown % 3600) / 60);
    window.sec = (countdown % 3600) % 60;

    return `${window.day}d ${window.hour}h ${window.minute}m ${window.sec}s`;
}

/* Main */
(function() {
    seasonCheck()
    timeCheck();
    document.getElementById("timer").innerHTML = updateTime();
}())

/* Timer */
let timer = setInterval(() => {

    let now = new Date(),
        hour = now.getHours(),
        min = now.getMinutes(),
        minFormat = min.toString().padStart(2, "0");

    DOM.timeInfo.innerHTML = (DOM.timeInfo.innerHTML.includes("hidden")) ? `${hour}<span>:</span>${minFormat}` : `${hour}<span class='hidden'>:</span>${minFormat}`

    if(now <= nextNewYear){

        DOM.timer.innerHTML = updateTime();
        if(sec === 59){
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

/*TODO: 1.raining 2.sunny --api
3. moon phase
4. 
*/ 