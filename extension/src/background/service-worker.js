// Service Worker for Neuroprompt Extension
console.log('Neuroprompt service worker loaded');

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received in service worker:', request);

    if (request.action === 'optimize-prompt') {
        // Will be implemented in Week 2
        console.log('Optimize prompt request:', request.prompt);
        sendResponse({ success: true, message: 'Service worker ready' });
    }

    return true; // Keep message channel open for async response
});

// Extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Neuroprompt extension installed');
});
