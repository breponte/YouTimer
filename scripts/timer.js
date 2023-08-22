window.addEventListener("DOMContentLoaded", init);

let hours = 0;
let minutes = 0;
let seconds = 0;
const timerDisplay = document.getElementById("stopwatch");

function init()
{
    setInterval(updateTime, 1000);
}

function updateTime()
{
    seconds++;

    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes == 60) {
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

function updateDisplay()
{
    timerDisplay.innerHTML = `
        ${hours.toString().padStart(3, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
    `;
}