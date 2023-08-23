/* ___VARIABLES___ */

const domainName = window.location.hostname;
let hours = 0;
let minutes = 0;
let seconds = 0;
const timerDisplay = document.getElementById("stopwatch");

/* ___INIT___ */

getStoredTime();
setInterval(updateTime, 1000);

/* ___EVENT_LISTENERS___ */

chrome.runtime.onMessage.addListener(
    async function(content, sender, sendResponse) {
        if (content.answer === "Sending stored time") {
            [hours, minutes, seconds] = content.time;
        }

        if (content.answer === "Successfully stored") {
            console.log("Successfully stored");
        }
    }
);

window.addEventListener('beforeunload', setStoredTime);

/* ___FUNCTIONS___ */

async function getStoredTime()
{
    await chrome.runtime.sendMessage({request: "Requesting stored time"});
}

async function setStoredTime()
{
    await chrome.runtime.sendMessage({
        request: "Setting stored time",
        url: domainName,
        time: [hours, minutes, seconds]
    });
    
    return;
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