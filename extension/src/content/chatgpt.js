// ChatGPT Content Script
console.log('Neuroprompt: ChatGPT content script loaded');

// Will inject "Optimize Prompt" button in Week 2
// For now, just confirming the script loads on ChatGPT pages

function initNeuroprompt() {
    console.log('Neuroprompt initialized on ChatGPT');
    // Future: Inject button, detect text input, handle optimization
}

// Wait for page to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNeuroprompt);
} else {
    initNeuroprompt();
}
