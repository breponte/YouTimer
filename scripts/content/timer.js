/**
 * This file implements a stopwatch, both its timing and display
 */

/* ___VARIABLES/REFERENCES___ */

const domainName = window.location.hostname;
let hours = 0;
let minutes = 0;
let seconds = 0;
const timerDisplay = document.getElementById("stopwatch");

/* ___INIT___ */

/**
 * Initialize and startup
 */
async function init() {
    /* dynamic import */
    const src = chrome.runtime.getURL("scripts/content/storage.js");
    const storageJS = await import(src);

    // initialize time to stored time
    [hours, minutes, seconds] =
        await storageJS.ExtensionStorage.getStoredTime();
    
    setInterval(updateTime, 1000);      // start the clock
}

init();                                 // run the code

/* ___EVENT_LISTENERS___ */

/**
 * Listen for the page unloading, and store the current time before unloading
 */
window.addEventListener("beforeunload", async () => {
    /* dynamic import */
    const src = chrome.runtime.getURL("scripts/content/storage.js");
    const storageJS = await import(src);

    if(!storageJS.ExtensionStorage.setStoredTime()) {
        console.error("Error storing time");
    }
});

/* ___FUNCTIONS___ */

/**
 * Increment time and manage overflows
 */
function updateTime()
{
    seconds++;

    /* seconds rollover to minutes */
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }

    /* minutes rollover to hours */
    if (minutes == 60) {
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

/**
 * Updates the stopwatch UI to display current time
 */
function updateDisplay()
{
    timerDisplay.innerHTML = `
        ${hours.toString().padStart(3, "0")}:${minutes.toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
    `;
}