/**
 * This file handles the storage requests from the content scripts, serving
 * as the middle man between YouTimer and the extension's local storage
 */

/**
 * Handle message reception from content scripts
 */
chrome.runtime.onMessage.addListener((content, sender, sendResponse) => {
    handleOnMessage(content, sender, sendResponse);
    return true;
});

const handleOnMessage = async function (content, sender, sendResponse) {

    // check if content scripts are requesting time for a URL
    if (content.message === "Requesting stored time for this URL") {
        const storedTime = await getStoredTime(content);
        await sendResponse({
            message: "Returning stored time for given URL",
            url: content.url,
            time: storedTime
        });

    // check if content scripts are requesting to update extension storage
    } else if (content.message === "Setting stored time for this URL") {
        await sendResponse({
            message: "Successfully stored updated time",
            url: content.url,
            time: await setStoredTime(content)
        });

    // could not recognize request from content scripts
    } else {
        console.error(`
            Content script did not send a recognizable request, \n
            Received: ${content.message}
        `);
        await sendResponse({
            message: "Did not understand request from content scripts",
            url: null,
            time: null
        })
    }

    return true;
}

/**
 * Retrieve the time corresponding to the given URL within extension's storage
 * @param {Array} content - message from content scripts
 * @returns current stored time
 */
async function getStoredTime(content)
{
    // given a url, retrieve the time stored at that key within the storage
    const storedTime = await chrome.storage.local.get(content.url).then((data) => {
        let storedTime = [0, 0, 0];

        // if URL does not have a time attached to it, default to 0 time on site
        if (typeof data !== undefined && data[content.url] !== undefined) {
            storedTime = data[content.url];
        }

        return storedTime;
    });

    return storedTime;
}

/**
 * Update the given URL's time within extension's storage
 * @param {Object} content - message from content scripts
 * @returns updated stored time
 */
async function setStoredTime(content)
{
    const data = {};                        // create new object for storage
    data[content.url] = content.time;       // populate new object
    await chrome.storage.local.set(data);   // store new object into storage

    return data[content.url];
}