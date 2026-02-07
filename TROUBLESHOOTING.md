# Quick Fixes for Extension Issues

## Issue 1: Network Error on Signup ❌

**Root Cause:** Backend server crashed due to MongoDB connection error

**Error:** MongoDB Atlas IP whitelist restriction

### Fix Steps:

1. **Update MongoDB IP Whitelist:**
   - Go to https://cloud.mongodb.com/
   - Select your project and cluster
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Click "Confirm"
   - Wait 1-2 minutes for changes to apply

2. **Restart Backend:**
   ```powershell
   cd c:\neuro_prompt\backend
   npm run dev
   ```

3. **Verify Backend is Running:**
   - Look for: `✅ MongoDB Connected`
   - Server should be on port 5000

---

## Issue 2: Optimize Button ✅

**Status:** Working! The button is appearing on Gemini.

**However, it needs a valid Gemini API key to work:**

### Get a Fresh Gemini API Key:

1. Visit: https://aistudio.google.com/apikey
2. Click "Create API key"
3. Select "Create API key in new project"
4. Copy the ENTIRE key
5. Paste in `backend/.env` file on line 14:
   ```
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
6. Restart backend server (it will auto-restart if using nodemon)

---

## Test the Full Flow:

1. ✅ Backend running on `http://localhost:5000`
2. ✅ Extension loaded in browser at `chrome://extensions/`
3. ✅ Click extension icon → Signup with your email
4. ✅ Visit Gemini → Type a prompt
5. ✅ Click "✨ Optimize Prompt" button
6. ✅ See enhanced prompt!

---

## Quick Verification:

**Backend Health Check:**
```powershell
curl http://localhost:5000
```
Expected response:
```json
{
  "message": "Neuroprompt API is running",
  "version": "1.0.0",
  "status": "active"
}
```

---

## Next: Deploy to Vercel

Once everything works locally, we'll deploy the backend to Vercel so you don't need localhost running!
