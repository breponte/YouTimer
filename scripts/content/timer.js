/**
 * This file implements a stopwatch, both its timing and display
 */

class ExtensionStorage {
    /**
     * Retrieve the time attached to the URL stored within chrome local storage
     * @returns extension's stored time for the given URL, else return 
     *      0 hours, minutes, seconds by default
     */
    static async getStoredTime()
    {
        console.log("1) Startup, retrieving stored time");
        // send a request to the background script and store the response
        const responseExtension = await chrome.runtime.sendMessage({
            message: "Requesting stored time for this URL",
            url: domainName,
            time: null,
        });;

        console.log("3) Successfully returned to content script, let's see what we got:");
        console.log(responseExtension);

        // check if background script responded as intended
        if (responseExtension.message ===
            "Returning stored time for given URL") {
            console.log("4) Correct message received from service worker");
            return responseExtension.time;

        // background script failed to respond as intended
        } else {
            console.error(`
                    Background script did not respond correctly, \n
                    Wanted: \"Returning stored time for given URL\" \n
                    Received: \"${responseExtension.message}\"
                `);
            return [0, 0, 0];
        }
    }

    /**
     * Send current time to update the time stored within chrome local storage
     * @returns true if successfully communicated, else false
     */
    static async setStoredTime()
    {
        // send a request to the background script and store the response
        const responseExtension = await chrome.runtime.sendMessage({
            message: "Setting stored time for this URL",
            url: domainName,
            time: [hours, minutes, seconds]
        });
        
        // check if background script responded as intended
        if (responseExtension.message ===
            "Successfully stored updated time") {
            return true;

        // background script failed to respond as intended
        } else { 
            console.error(`
                    Background script did not respond correctly, \n
                    Wanted: \"Successfully stored updated time\" \n
                    Received: \"${responseExtension.message}\"
                `);
            return false;
        }
    }
}





















/* ___VARIABLES___ */

const domainName = window.location.hostname;
let hours = 0;
let minutes = 0;
let seconds = 0;
const timerDisplay = document.getElementById("stopwatch");

/* ___INIT___ */

console.log("0) Loaded");
[hours, minutes, seconds] = ExtensionStorage.getStoredTime();
setInterval(updateTime, 1000);

/* ___EVENT_LISTENERS___ */

window.addEventListener("beforeunload", async () => {
    if(!ExtensionStorage.setStoredTime()) {
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