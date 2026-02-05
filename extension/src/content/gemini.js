// Gemini Content Script
console.log('Neuroprompt: Gemini content script loaded');

// Will inject "Optimize Prompt" button in Week 2
// For now, just confirming the script loads on Gemini pages

function initNeuroprompt() {
    console.log('Neuroprompt initialized on Gemini');
    // Future: Inject button, detect text input, handle optimization
}

// Wait for page to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNeuroprompt);
} else {
    initNeuroprompt();
}
