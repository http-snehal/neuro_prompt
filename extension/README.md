# Neuroprompt Extension - Vanilla JavaScript

A browser extension for optimizing AI prompts using vanilla HTML, CSS, and JavaScript (no frameworks, no build step required).

## Structure

```
extension/
├── manifest.json           # Extension configuration
├── popup/
│   ├── popup.html         # Popup interface
│   ├── popup.css          # Styles
│   └── popup.js           # Logic
├── content/
│   ├── chatgpt.js         # ChatGPT content script
│   └── gemini.js          # Gemini content script
├── background/
│   └── service-worker.js  # Background worker
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Installation (Development)

1. Open your browser (Chrome/Edge)
2. Navigate to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the `extension` folder

## Features

- ✅ User authentication (login/signup)
- ✅ Prompt enhancement on ChatGPT & Gemini
- ✅ Usage tracking (50 enhancements/day)
- ✅ Dashboard with statistics
- ✅ Pure HTML/CSS/JS (no build required)

## Configuration

Update the API URL in `background/service-worker.js` and `popup/popup.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.vercel.app/api';
```

## Deployment

### Chrome Web Store
1. Zip the entire `extension` folder
2. Visit [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Click "New Item"
4. Upload the zip file
5. Fill in listing details
6. Submit for review

## Backend

The extension requires a backend API. See `../backend/` for deployment instructions.
