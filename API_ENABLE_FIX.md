# SOLUTION: Enable the Generative Language API

## The Real Problem (Found!)

Error: **404 Not Found** 

This means:
- ✅ Your API key is probably VALID
- ❌ But the **Generative Language API is NOT enabled** for your Google Cloud project

## Fix: Enable the API (2 minutes)

### Option 1: Direct Enable Link (Easiest)
1. Click this link: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Make sure you're in the SAME project as your API key
3. Click the big blue **"Enable"** button
4. Wait 30 seconds for it to enable
5. Done!

### Option 2: Manual Enable
1. Go to: https://console.cloud.google.com/apis/dashboard
2. Click "＋ ENABLE APIS AND SERVICES"
3. Search for: "Generative Language API"
4. Click on it
5. Click "Enable"

### After Enabling:
- Wait 1-2 minutes
- Restart your backend server (I'll do this for you)
- Test the "Optimize Prompt" button again

---

## Why This Happened

Google AI Studio creates API keys, but doesn't automatically enable all required APIs. You need to manually enable the "Generative Language API" for the key to work.

**This is the #1 most common issue with Gemini API keys!**
