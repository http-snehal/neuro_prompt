@echo off
echo Testing Gemini API Key Directly...
echo.

REM Test 1: List available models
echo Test 1: Listing available models...
curl -s "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDBoz67vKwZb-LAJsCRUpuqqt1KTUYOGO8"
echo.
echo.

REM Test 2: Try generating content
echo Test 2: Generating content with gemini-pro...
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDBoz67vKwZb-LAJsCRUpuqqt1KTUYOGO8" ^
  -H "Content-Type: application/json" ^
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Say hello\"}]}]}"
echo.
echo.

echo Tests complete!
pause
