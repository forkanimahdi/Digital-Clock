let clock = document.querySelector(".clock")
let date = document.querySelector(".date")
let local = document.querySelector(".local")
let controlPanel = document.querySelector(".controle-panel")
let panelDivs = controlPanel.querySelectorAll("div")
let display = document.querySelector(".display")
let displayDivs = display.querySelectorAll(".display-div")
let alarmSetBtn = document.querySelector(".set-btn")
let setTimeDiv = document.querySelector(".set-time-div")
let alarmValid = document.querySelector(".alarm-valid")
let alarmCancel = document.querySelector(".alarm-cancel")
let alarmName = document.querySelector(".alarm-name")
let alarmTime = document.querySelector(".alarm-time")
let allAlarms = document.querySelector(".all-alarms")
let allTimes = document.querySelectorAll('.tach-time')
let city = document.querySelector(".city")
let temperaturedeg = document.querySelector(".temperature")
let state = document.querySelector(".state")
let stopwatchSec = document.querySelector(".stopwatch-sec")
let stopwatchMin = document.querySelector(".stopwatch-min")
let stopwatchHour = document.querySelector(".stopwatch-hour")
let startStopwatch = document.querySelector(".start-stopwatch")
let resetStopwatch = document.querySelector(".reset-stopwatch")
let lapSec = document.querySelector(".lap-sec")
let lapMin = document.querySelector(".lap-min")
let lapDiv = document.querySelector(".lape-div")
let lapHour = document.querySelector(".lap-hour")
let watchLap = document.querySelector(".watch-lap")
let timerInput = document.querySelector(".timer-seconds-input")
let startTimer = document.querySelector(".start-timer")
let timeline = document.querySelector(".timeline")
let fullscreen = document.querySelector(".fullscreen")
let worldclockTable = document.querySelector(".world-display")
let tour = 1
let lapseconds = 0
let lapminuts = 0
let lapHours = 0


let localedweather = localStorage.getItem("weatherDigital")
local.innerHTML = localedweather


//* Check notification availability

if ('Notification' in window) {
    Notification.requestPermission()
        .then(permission => {
            if (permission === 'granted') {
            }
        })
}



//! clock

//* time function

function currentTime() {

    let now = new Date();
    // Get the current hour and minute
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds()
    // Format the hours and minutes to have leading zeros if needed
    let formattedHours = hours < 10 ? '0' + hours : hours;
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds
    // Create the final time string
    let currentTime = formattedHours + ':' + formattedMinutes + `:` + formattedSeconds;
    clock.innerHTML = currentTime

    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = dayNames[now.getDay()];

    // Get day of the month
    let dayOfMonth = now.getDate();

    // Get month name
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthName = monthNames[now.getMonth()];

    // Get year
    let year = now.getFullYear();

    // Format the date string
    let formattedDate = `${dayName} ${dayOfMonth} / ${monthName} / ${year}`;
    date.innerHTML = formattedDate



}
setInterval(() => {
    currentTime()
}, 1000);

//* weather 
function zoneAndweather() {
    let location = "casablanca";

    // Replace 'YOUR_API_KEY' with your actual API key
    let apiKey = 'dda6f4ab86c5bee7185d6780b0d82ae0';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let temperature = data.main.temp;
            let description = data.weather[0].description;
            console.log(temperature);
            console.log(description);

            local.innerHTML = ` Weather in ${location}:  ${temperature} °C <i class="fa-solid fa-temperature-three-quarters"></i>  , ${description} today`
            let storedweather = local.innerHTML
            localStorage.setItem("weatherDigital", storedweather)
        })
        .catch(error => {
            let localedweather = localStorage.getItem("weatherDigital")
            local.innerHTML = localedweather

        });
}
zoneAndweather()

panelDivs.forEach(element => {
    element.addEventListener("click", () => {
        panelDivs.forEach(element => {
            element.classList.remove("active")
        });
        element.classList.add("active")
        let elementID = element.getAttribute("id")
        displayDivs.forEach(e => {
            if (e.getAttribute("id") != elementID) {
                e.style.display = "none"
            } else {
                e.style.display = "flex"
            }
        });
    })
});

//! alarm

//* set button function

function setAndCancel() {
    alarmSetBtn.classList.add("d-none")
    setTimeDiv.style.transition = "0.5s"
    setTimeDiv.style.top = "0%"
}
alarmSetBtn.addEventListener("click", setAndCancel)

//* cancel button function
function cancelInput() {
    setTimeDiv.style.transition = "0.5s"
    setTimeDiv.style.top = "-10%"
    setTimeout(() => {
        alarmSetBtn.classList.remove("d-none")
    }, 300);
}
alarmCancel.addEventListener("click", cancelInput)

//* set alarm

function createAlarm() {
    if (alarmTime.value != "") {
        //^ create alarm
        let tach = document.createElement("div")
        tach.setAttribute("class", "tach text-white")
        allAlarms.appendChild(tach)
        //^ create time div
        let tachTime = document.createElement("div")
        tachTime.setAttribute("class", "tach-time")
        let clockIcon = document.createElement("i")
        clockIcon.setAttribute("class", "fa-solid fa-clock ms-1")
        tachTime.textContent = alarmTime.value
        tachTime.appendChild(clockIcon)
        tach.appendChild(tachTime)
        //^ create name div
        let tachName = document.createElement("div")
        tachName.setAttribute("class", "tach-name")
        tachName.textContent = alarmName.value
        tach.appendChild(tachName)
        //^ create toggle div
        let toggleDiv = document.createElement("div")
        toggleDiv.setAttribute("class", "toggle on rounded-pill")
        toggleDiv.textContent = "Done"
        toggleDiv.setAttribute("class", "toggle on rounded-pill")
        let switcherToggle = document.createElement("div")
        switcherToggle.setAttribute("class", "switcher rounded-circle")
        toggleDiv.appendChild(switcherToggle)
        tach.appendChild(toggleDiv)
        toggleDiv.addEventListener("click", () => {
            tach.style.transition = "0.5s ease"
            tach.style.marginLeft = "-100%"
            setTimeout(() => {
                allAlarms.removeChild(tach)
            }, 500);

        })

        alarmName.value = ""
        alarmTime.value = ""

        toggleSwitch(toggleDiv, switcherToggle)
        let interval = setInterval(() => {
            notifyMe(tachTime, tachName, interval)
        }, 1000);


    }

}
alarmValid.addEventListener("click", createAlarm)

//* make toggle

function toggleSwitch(toggle, switcher) {
    toggle.addEventListener("click", () => {

        if (toggle.classList.contains("on")) {
            switcher.style.left = "70%"
            toggle.classList.remove("on")
            toggle.classList.add("off")
            switcher.textContent = "OFF"
            toggle.style.backgroundColor = "indigo"
            switcher.style.backgroundColor = "#532762"
        } else {
            switcher.style.left = "25%"
            toggle.classList.remove("off")
            toggle.classList.add("on")
            switcher.textContent = "ON"
            toggle.style.backgroundColor = "#532762"
            switcher.style.backgroundColor = "indigo"
        }

    })


}

let repetition

//* notify when alarm hit
function notifyMe(tachTime, tachName, interval) {
    let now = new Date();
    // Get the current hour and minute
    let hours = now.getHours();
    let minutes = now.getMinutes();
    // Format the hours and minutes to have leading zeros if needed
    let formattedHours = hours < 10 ? '0' + hours : hours;
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    // Create the final time string
    let currentTime = formattedHours + ':' + formattedMinutes;
    if (tachTime.textContent == currentTime) {
        let notif = new Notification(`Alarm`, {
            body: `Your Alarm ${tachName.textContent} is setted for Now`,
            icon: './public/img/alarm.png' //  icon of notification
        })
        clearInterval(interval)
    }
}

// ! world clock


function worldClock() {
    let capitals = [
        { name: "Rabat", offset: 0, country: "Morocco" },
        { name: "New York", offset: -4, country: "United States" },
        { name: "Tokyo", offset: 9, country: "Japane" },
        { name: "Paris", offset: 2, country: "French" },
        { name: "Hong Kong", offset: 8, country: "China" },
        { name: "London", offset: 0, country: "United Kingdom" },
        { name: "Mecca", offset: 3, country: "Kingdom Saudi Arabia" },
        { name: "Cairo", offset: 2, country: "Egypt" },
        { name: "Ottawa", offset: -4, country: "Canada" }, // Capital of Canada
        { name: "Toronto", offset: -4, country: "Canada" }, // Capital of Ontario, Canada
        // Add more capitals here...
    ];

    function formatTime(date) {
        return date.toLocaleTimeString("en-US", { timeStyle: "medium" });
    }

    function getCapitalTime(capital) {
        let currentDate = new Date();
        let utcOffset = capital.offset * 60;
        let capitalTime = new Date(currentDate.getTime() + utcOffset * 60 * 1000);
        return formatTime(capitalTime);
    }

    capitals.forEach(capital => {
        let capitalTime = getCapitalTime(capital);
        let theTimezone = document.createElement("div")
        theTimezone.classList.add("othertimezonediv")
        let cityName = document.createElement("div")
        cityName.classList.add("cityname")
        cityName.textContent = capital.name
        theTimezone.appendChild(cityName)
        let citytime = document.createElement("div")
        citytime.classList.add("citytime")
        citytime.textContent = capitalTime
        theTimezone.appendChild(citytime)
        let countryname = document.createElement("div")
        countryname.classList.add("countryname")
        countryname.textContent = capital.country
        theTimezone.appendChild(countryname)
        worldclockTable.appendChild(theTimezone)

    });

}

setInterval(() => {
    let allcountrys = document.querySelectorAll(".othertimezonediv")
    allcountrys.forEach(element => {
        element.remove()
    });
    worldClock()
}, 1000);

//! stop watch
function startWatch() {
    let seconds = 0
    let minutes = 0
    let hours = 0
    seconds = seconds < 10 ? "0" + seconds : seconds
    minutes = minutes < 10 ? "0" + minutes : minutes
    hours = hours < 10 ? "0" + hours : hours
    stopwatchSec.textContent = seconds
    stopwatchMin.textContent = minutes
    stopwatchHour.textContent = hours
    function makingstopwatch() {
        seconds++
        seconds = seconds < 10 ? "0" + seconds : seconds
        stopwatchSec.textContent = seconds
        if (seconds == 59) {
            seconds = -1
            setTimeout(() => {
                minutes++
                minutes = minutes < 10 ? "0" + minutes : minutes
                stopwatchMin.textContent = minutes
                if (minutes == 60) {
                    minutes = 0
                    minutes = minutes < 10 ? "0" + minutes : minutes
                    stopwatchMin.textContent = minutes
                    hours++
                    hours = hours < 10 ? "0" + hours : hours
                    stopwatchHour.textContent = hours

                }
            }, 1000);
        }
    }

    let interval = () => {
        makingstopwatch()
    };

    interval = setInterval(interval, 1000)

    let stopStopWatch = document.querySelector(".stop-stopwatch")
    stopStopWatch.addEventListener("click", () => {
        if (stopStopWatch.classList.contains("stop-stopwatch")) {
            clearInterval(interval)
            stopStopWatch.classList.remove("stop-stopwatch")
            stopStopWatch.classList.add("resume-stopwatch")
            stopStopWatch.textContent = "Resume"
            resetStopwatch.textContent = "Reset"
            resetStopwatch.classList.add("reset-stopwatch")
            resetStopwatch.classList.remove("lap-stopwatch")


        } else if (stopStopWatch.classList.contains("resume-stopwatch")) {
            stopStopWatch.classList.remove("resume-stopwatch")
            stopStopWatch.classList.add("stop-stopwatch")
            stopStopWatch.textContent = "Stop"
            resetStopwatch.textContent = "Lape"
            resetStopwatch.classList.remove("reset-stopwatch")
            resetStopwatch.classList.add("lap-stopwatch")
            seconds = parseInt(stopwatchSec.textContent)
            interval = setInterval(() => {
                makingstopwatch()
            }, 1000);


        }
    })
}
startStopwatch.addEventListener("click", () => {
    if (startStopwatch.classList.contains("start-stopwatch")) {
        startStopwatch.textContent = "Stop"
        resetStopwatch.textContent = "Lape"
        startStopwatch.classList.remove("start-stopwatch")
        startStopwatch.classList.add("stop-stopwatch")
        resetStopwatch.classList.remove("reset-stopwatch")
        resetStopwatch.classList.add("lap-stopwatch")
        startWatch()
    }

})

resetStopwatch.addEventListener("click", () => {
    if (resetStopwatch.classList.contains("reset-stopwatch")) {
        let seconds = 0
        let minutes = 0
        let hours = 0
        seconds = seconds < 10 ? "0" + seconds : seconds
        minutes = minutes < 10 ? "0" + minutes : minutes
        hours = hours < 10 ? "0" + hours : hours
        stopwatchSec.textContent = seconds
        stopwatchMin.textContent = minutes
        stopwatchHour.textContent = hours
        startStopwatch.textContent = "Start"

    } else {
        // lapseconds = lapseconds < 10 ? "0" + lapseconds : lapseconds
        // lapminuts = lapminuts < 10 ? "0" + lapminuts : lapminuts
        // lapHours = lapHours < 10 ? "0" + lapHours : lapHours
        lapSec.textContent = lapseconds
        lapMin.textContent = lapminuts
        lapHour.textContent = lapHours
        function makingstopwatch() {
            lapseconds++
            lapseconds = lapseconds < 10 ? "0" + lapseconds : lapseconds
            lapSec.textContent = lapseconds
            if (lapseconds == 59) {
                lapseconds = -1
                setTimeout(() => {
                    minlapminutsutes++
                    lapminuts = lapminuts < 10 ? "0" + lapminuts : lapminuts
                    lapMin.textContent = lapminuts
                    if (lapminuts == 60) {
                        lapminuts = 0
                        lapminuts = lapminuts < 10 ? "0" + lapminuts : lapminuts
                        lapMin.textContent = lapminuts
                        lapHours++
                        lapHours = lapHours < 10 ? "0" + lapHours : lapHours
                        lapHour.textContent = lapHours

                    }
                }, 1000);
            }
        }
        let interval = () => {
            makingstopwatch()
        };

        interval = setInterval(interval, 1000)


        let newLape = document.createElement("div")
        newLape.classList.add("lape")
        lapDiv.appendChild(newLape)
        let newTour = document.createElement("h6")
        newTour.classList.add("toure")
        newTour.textContent = tour++
        let newRound = document.createElement("h6")
        newRound.classList.add("lape-round")
        newRound.textContent = `${lapHour.textContent}:${lapMin.textContent}:${lapSec.textContent}`
        let newOverall = document.createElement("h6")
        newOverall.classList.add("overall")
        newOverall.textContent = `${stopwatchHour.textContent}:${stopwatchMin.textContent}:${stopwatchSec.textContent}`
        // clearInterval(interval)
        newLape.appendChild(newTour)
        newLape.appendChild(newRound)
        newLape.appendChild(newOverall)
        lapseconds = 0
        lapminuts = 0
        lapHours = 0
        lapseconds = lapseconds < 10 ? "0" + lapseconds : lapseconds
        lapminuts = lapminuts < 10 ? "0" + lapminuts : lapminuts
        lapHours = lapHours < 10 ? "0" + lapHours : lapHours
        lapSec.textContent = lapseconds
        lapMin.textContent = lapminuts
        lapHour.textContent = lapHours


    }

})

//! timer / Countdown

startTimer.addEventListener("click", () => {

    let counter = parseInt(timerInput.value)
    timeline.style.transition = `${counter}s ease-out`

    let timer = () => {
        timeline.style.left = "-100%"
        if (timerInput.value > 0) {
            counter--
            timerInput.value = counter
        } else if (timerInput.value == 0) {
            clearInterval(timer)
            notif = new Notification(`Alarm`, {
                body: `Your Timer is Up`,
                icon: './public/img/alarm.png' //  icon of notification
            })
            startTimer.style.width = ""
            timeline.style.display = "none"
            timeline.style.left = "0%"

        }
    }

    if (timerInput.value > 0) {
        timer = setInterval(timer, 1000)
        timeline.style.display = "block"
        startTimer.style.width = "100%"

    }

})

fullscreen.addEventListener("click", () => {
    let elem = document.documentElement; // Get the root element of the document

    if (elem.requestFullscreen) {
        // Standard syntax for fullscreen API
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        // Firefox-specific syntax
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera-specific syntax
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        // Microsoft Edge-specific syntax
        elem.msRequestFullscreen();
    }

    fullscreen.style.display = "none"
    controlPanel.style.marginTop = "-11vh"

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 27 || event.key === 'Escape') {
            fullscreen.style.display = "block"
            controlPanel.style.marginTop = "0"

        }
    });

})



