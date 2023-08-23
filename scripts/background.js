chrome.runtime.onMessage.addListener(
    async function(content, sender, sendResponse) {
        if (content.request === "Requesting stored time") {
            await sendResponse({
                answer: "Sending stored time",
                time: getStoredTime(content)
            });
        }

        if (content.request === "Setting stored time") {
            await setStoredTime(content);
            await sendResponse({
                answer: "Successfully stored"
            });
        }
    }
);

async function getStoredTime(content)
{
    return await chrome.storage.local.get(content.url).then((time) => {
        let storedTime = [0, 0, 0];
        if (typeof time !== 'undefined') {
            storedTime = time;
        }
        console.log("Current stored time: " + storedTime);
        return storedTime;
    });
}

async function setStoredTime(content)
{
    const url = content.url;
    const time = content.time;
    await chrome.storage.local.set({ url: time });
}