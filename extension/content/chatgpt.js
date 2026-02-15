// ChatGPT Content Script - EXACT SAME BEHAVIOR AS GEMINI
console.log('🚀 Neuroprompt: ChatGPT content script loaded');

// Configuration
const CONFIG = {
    platform: 'chatgpt',
    buttonId: 'neuroprompt-optimize-btn',
    buttonText: '✨ Optimize Prompt',
    textareaSelector: '#prompt-textarea, div[contenteditable="true"][data-id="root"], div.ProseMirror[contenteditable="true"]',
    observerConfig: { childList: true, subtree: true }
};

// State
let optimizeButton = null;
let currentTextarea = null;
let isProcessing = false;

/**
 * Create and style the optimize button - SAME AS GEMINI
 */
function createOptimizeButton() {
    const button = document.createElement('button');
    button.id = CONFIG.buttonId;
    button.textContent = CONFIG.buttonText;
    button.className = 'neuroprompt-btn';

    // Position will be set dynamically relative to input box
    button.style.cssText = `
        position: fixed;
        z-index: 9999;
        background: #2872A1;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 4px 16px rgba(40, 114, 161, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        letter-spacing: 0.5px;
    `;

    console.log('🔧 Neuroprompt button position:', { top: '-50px', right: '20px' });

    // Enhanced hover effect - pink glow only on hover
    button.addEventListener('mouseenter', () => {
        if (!button.disabled) {
            button.style.transform = 'translateY(-2px) scale(1.02)';
            button.style.boxShadow = '0 8px 24px rgba(168, 85, 247, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)';
        }
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 4px 16px rgba(40, 114, 161, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)';
    });

    // Click handler
    button.addEventListener('click', handleOptimizeClick);

    return button;
}

/**
 * Handle optimize button click - SAME AS GEMINI
 */
async function handleOptimizeClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isProcessing || !currentTextarea) return;

    // Get text - handle both textarea and contenteditable
    const originalPrompt = currentTextarea.value !== undefined
        ? currentTextarea.value.trim()
        : currentTextarea.innerText.trim();

    if (!originalPrompt) {
        showNotification('⚠️ Please enter a prompt first', 'warning');
        return;
    }

    isProcessing = true;
    updateButtonState('loading');
    addBlurEffect(true);

    try {
        // Send message to background script
        const response = await chrome.runtime.sendMessage({
            action: 'enhancePrompt',
            data: {
                originalPrompt,
                platform: CONFIG.platform
            }
        });

        if (response.success) {
            // Replace content with enhanced prompt
            if (currentTextarea.value !== undefined) {
                currentTextarea.value = response.data.enhancedPrompt;
            } else {
                currentTextarea.innerText = response.data.enhancedPrompt;
            }

            // Trigger input event so ChatGPT recognizes the change
            currentTextarea.dispatchEvent(new Event('input', { bubbles: true }));
            currentTextarea.dispatchEvent(new Event('change', { bubbles: true }));

            showNotification('✨ Prompt optimized!', 'success');
        } else {
            showNotification(`❌ ${response.error || 'Enhancement failed'}`, 'error');
        }
    } catch (error) {
        console.error('Neuroprompt error:', error);
        showNotification('❌ Failed to optimize. Please try again.', 'error');
    } finally {
        isProcessing = false;
        updateButtonState('ready');
        addBlurEffect(false);
    }
}

/**
 * Add or remove blur effect from textarea - SAME AS GEMINI
 */
function addBlurEffect(add) {
    if (!currentTextarea) return;

    if (add) {
        currentTextarea.style.filter = 'blur(4px)';
        currentTextarea.style.pointerEvents = 'none';
        currentTextarea.style.transition = 'filter 0.3s ease';
    } else {
        currentTextarea.style.filter = 'blur(0px)';
        currentTextarea.style.pointerEvents = 'auto';
    }
}

/**
 * Update button state - SAME AS GEMINI
 */
function updateButtonState(state) {
    if (!optimizeButton) return;

    switch (state) {
        case 'loading':
            optimizeButton.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 6px;">⏳ <span style="animation: pulse 1.5s ease-in-out infinite;">Optimizing...</span></span>';
            optimizeButton.disabled = true;
            optimizeButton.style.opacity = '0.8';
            optimizeButton.style.cursor = 'not-allowed';
            break;
        case 'ready':
        default:
            optimizeButton.textContent = CONFIG.buttonText;
            optimizeButton.disabled = false;
            optimizeButton.style.opacity = '1';
            optimizeButton.style.cursor = 'pointer';
            break;
    }
}

/**
 * Show notification to user - SAME AS GEMINI
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `neuroprompt-notification neuroprompt-${type}`;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Update button position relative to input box
 */
function updateButtonPosition() {
    if (!optimizeButton || !currentTextarea) return;

    const rect = currentTextarea.getBoundingClientRect();

    // Position button above the input box, aligned to the right
    const top = Math.max(10, rect.top - 65); // Increased gap (55px above input)
    const right = Math.max(10, window.innerWidth - rect.right - 50); // Slightly more right offset

    optimizeButton.style.top = top + 'px';
    optimizeButton.style.right = right + 'px';
    optimizeButton.style.left = 'auto'; // Clear left to use right positioning

    console.log('📍 Button position:', { top, right });
}

/**
 * Inject button into the page
 */
function injectButton() {
    // Remove existing button if any
    const existing = document.getElementById(CONFIG.buttonId);
    if (existing) existing.remove();

    // Find textarea
    currentTextarea = document.querySelector(CONFIG.textareaSelector);

    if (!currentTextarea) {
        console.log('Neuroprompt: Textarea not found yet');
        return;
    }

    // Create and inject button to body (fixed positioning)
    optimizeButton = createOptimizeButton();
    document.body.appendChild(optimizeButton);

    // Set initial position
    updateButtonPosition();

    // Update position on resize and scroll
    window.addEventListener('resize', updateButtonPosition);
    window.addEventListener('scroll', updateButtonPosition, true);

    console.log('✅ Neuroprompt: Button injected and attached to input');
}

/**
 * Initialize the script
 */
function init() {
    // Try to inject button immediately
    injectButton();

    // Set up MutationObserver to handle dynamic content
    const observer = new MutationObserver((mutations) => {
        if (!document.getElementById(CONFIG.buttonId)) {
            injectButton();
        }
        // Update position on any DOM changes
        updateButtonPosition();
    });

    observer.observe(document.body, CONFIG.observerConfig);

    // Also update position periodically for smoother tracking
    setInterval(updateButtonPosition, 100);

    console.log('✅ Neuroprompt: Observer started');
}

// Add animation styles - SAME AS GEMINI
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

