// Neuroprompt Background Service Worker
// Handles messages from content scripts and popup

console.log('🚀 Neuroprompt: Service worker loaded');

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Get auth token from storage
 */
async function getAuthToken() {
    const result = await chrome.storage.local.get(['authToken']);
    return result.authToken;
}

/**
 * Handle prompt enhancement request from content script
 */
async function handleEnhancePrompt(data) {
    try {
        const token = await getAuthToken();

        if (!token) {
            return {
                success: false,
                error: 'Not authenticated. Please login in the extension popup.'
            };
        }

        // Call backend API
        const response = await fetch(`${API_BASE_URL}/enhance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                originalPrompt: data.originalPrompt,
                platform: data.platform
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Enhancement failed');
        }

        return {
            success: true,
            data: result.data,
            usageStats: result.usageStats
        };

    } catch (error) {
        console.error('Enhancement error:', error);

        // Handle specific errors
        if (error.message.includes('Failed to fetch')) {
            return {
                success: false,
                error: 'Cannot connect to server. Make sure the backend is running.'
            };
        }

        if (error.message.includes('401')) {
            return {
                success: false,
                error: 'Session expired. Please login again.'
            };
        }

        if (error.message.includes('429')) {
            return {
                success: false,
                error: 'Daily limit reached. Try again tomorrow!'
            };
        }

        return {
            success: false,
            error: error.message || 'Failed to enhance prompt'
        };
    }
}

/**
 * Message handler
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('📬 Message received:', message.action);

    if (message.action === 'enhancePrompt') {
        // Handle enhancement request asynchronously
        handleEnhancePrompt(message.data)
            .then(sendResponse)
            .catch((error) => {
                console.error('Handler error:', error);
                sendResponse({
                    success: false,
                    error: error.message || 'Unknown error'
                });
            });

        // Return true to indicate async response
        return true;
    }

    // Unknown action
    sendResponse({ success: false, error: 'Unknown action' });
    return false;
});

console.log('✅ Neuroprompt: Service worker ready');

// Extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Neuroprompt extension installed');
});
