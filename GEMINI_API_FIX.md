# Gemini API Key Troubleshooting

## The Issue
Your API key `AIzaSyDcpHDq0aurTZUrlxkc61nHGrjnwE3nj3c` is showing as invalid.

## Most Common Cause: API Restrictions

When you created the API key, it might have **API restrictions** enabled that block the Generative Language API.

## How to Fix:

### Step 1: Check/Remove API Restrictions

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your API key `AIzaSyDcpHDq0aurTZUrlxkc61nHGrjnwE3nj3c`
3. Click on it to edit
4. Scroll to "API restrictions"
5. **Check if it says**: "Restrict key"
   - If YES: Change it to **"Don't restrict key"**
   - Click "Save"
6. Wait 1-2 minutes for changes to apply

### Step 2: Enable the Generative Language API

1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Click "Enable" button
3. Wait for API to be enabled

### Step 3: Alternative - Create NEW Key without Restrictions

If the above doesn't work:

1. Go back to https://aistudio.google.com/apikey
2. Delete the old key (click trash icon)
3. Click "Create API key" again
4. Select "Create API key in new project"
5. **IMPORTANT**: Don't add any restrictions
6. Copy the new key
7. Give me the new key to update

## Why This Happens

Google AI Studio sometimes creates keys with restrictions by default. The Generative Language API needs an unrestricted key OR a key specifically allowed for `generativelanguage.googleapis.com`.

---

**Which would you prefer?**
- Option A: Check/fix restrictions on current key
- Option B: Create a brand new key without restrictions
