let clock = document.querySelector(".clock")
let date = document.querySelector(".date")




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

    let  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let  dayName = dayNames[now.getDay()];
    
    // Get day of the month
    let  dayOfMonth = now.getDate();
    
    // Get month name
    let  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let  monthName = monthNames[now.getMonth()];
    
    // Get year
    let  year = now.getFullYear();
    
    // Format the date string
    let  formattedDate = `${dayName} ${dayOfMonth} / ${monthName} / ${year}`;
    date.innerHTML = formattedDate
}
setInterval(() => {
    currentTime()
}, 1000);