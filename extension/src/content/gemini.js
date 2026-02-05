// Gemini Content Script - Injects "Optimize Prompt" button

console.log('🚀 Neuroprompt: Gemini content script loaded');

// Configuration
const CONFIG = {
  platform: 'gemini',
  buttonId: 'neuroprompt-optimize-btn',
  buttonText: '✨ Optimize Prompt',
  textareaSelector: '.ql-editor[contenteditable="true"]', // Gemini uses rich text editor
  observerConfig: { childList: true, subtree: true }
};

// State
let optimizeButton = null;
let currentTextarea = null;
let isProcessing = false;

/**
 * Create and style the optimize button
 */
function createOptimizeButton() {
  const button = document.createElement('button');
  button.id = CONFIG.buttonId;
  button.textContent = CONFIG.buttonText;
  button.className = 'neuroprompt-btn';

  // Inline styles to ensure visibility
  button.style.cssText = `
    position: absolute;
    bottom: 12px;
    right: 52px;
    z-index: 9999;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  `;

  // Hover effect
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-1px)';
    button.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)';
  });

  // Click handler
  button.addEventListener('click', handleOptimizeClick);

  return button;
}

/**
 * Handle optimize button click
 */
async function handleOptimizeClick(e) {
  e.preventDefault();
  e.stopPropagation();

  if (isProcessing || !currentTextarea) return;

  // Get text from contenteditable div
  const originalPrompt = currentTextarea.innerText.trim();

  if (!originalPrompt) {
    showNotification('⚠️ Please enter a prompt first', 'warning');
    return;
  }

  isProcessing = true;
  updateButtonState('loading');

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
      // Replace contenteditable content with enhanced prompt
      currentTextarea.innerText = response.data.enhancedPrompt;

      // Trigger input event so Gemini recognizes the change
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
  }
}

/**
 * Update button state
 */
function updateButtonState(state) {
  if (!optimizeButton) return;

  switch (state) {
    case 'loading':
      optimizeButton.textContent = '⏳ Optimizing...';
      optimizeButton.disabled = true;
      optimizeButton.style.opacity = '0.7';
      break;
    case 'ready':
    default:
      optimizeButton.textContent = CONFIG.buttonText;
      optimizeButton.disabled = false;
      optimizeButton.style.opacity = '1';
      break;
  }
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = `neuroprompt - notification neuroprompt - ${type}`;

  notification.style.cssText = `
    position: fixed;
            top: 20px;
            right: 20px;
            z - index: 10000;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border - radius: 8px;
            font - size: 14px;
            font - weight: 500;
            box - shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease - out;
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Inject button into the page
 */
function injectButton() {
  // Remove existing button if any
  const existing = document.getElementById(CONFIG.buttonId);
  if (existing) existing.remove();

  // Find textarea (contenteditable div)
  currentTextarea = document.querySelector(CONFIG.textareaSelector);

  if (!currentTextarea) {
    console.log('Neuroprompt: Textarea not found yet');
    return;
  }

  // Find the textarea's parent container
  const container = currentTextarea.closest('form') || currentTextarea.parentElement;

  if (!container) {
    console.log('Neuroprompt: Container not found');
    return;
  }

  // Make container relative for absolute positioning
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  // Create and inject button
  optimizeButton = createOptimizeButton();
  container.appendChild(optimizeButton);

  console.log('✅ Neuroprompt: Button injected');
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
  });

  observer.observe(document.body, CONFIG.observerConfig);

  console.log('✅ Neuroprompt: Observer started');
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
            @keyframes slideIn {
    from {
                    transform: translateX(100 %);
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
                    transform: translateX(100 %);
                    opacity: 0;
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
