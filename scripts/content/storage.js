/**
 * This file is a content script that communicates requests to the background
 * scripts for urls and their times within the storage
 */

class ExtensionStorage {
    /**
     * Retrieve the time attached to the URL stored within chrome local storage
     * @returns extension's stored time for the given URL, else return 
     *      0 hours, minutes, seconds by default
     */
    static async getStoredTime()
    {
        // send a request to the background script and store the response
        const responseExtension = await chrome.runtime.sendMessage({
            message: "Requesting stored time for this URL",
            url: domainName,
            time: null,
        });;

        // check if background script responded as intended
        if (responseExtension.message ===
            "Returning stored time for given URL") {
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

// export (to timer.js)
export { ExtensionStorage };