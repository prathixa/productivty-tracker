let currentDomain = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url) {
        sendDataToBackend();
        currentDomain = new URL(tab.url).hostname;
        startTime = Date.now();
    }
});

function sendDataToBackend() {
    if (!currentDomain) return;
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    if (seconds < 1) return;

    fetch('http://127.0.0.1:5000/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: currentDomain, seconds: seconds })
    });
}