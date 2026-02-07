// Test the enhance API endpoint directly
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api';

// Get a real auth token from the database first
async function testEnhanceAPI() {
    try {
        // First, let's test without auth to see the error
        console.log('Testing enhance endpoint...\n');

        const testPrompt = 'explain python';

        console.log('Test 1: Without auth token');
        const response1 = await fetch(`${API_BASE_URL}/enhance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                originalPrompt: testPrompt,
                platform: 'gemini'
            })
        });

        const result1 = await response1.json();
        console.log('Status:', response1.status);
        console.log('Response:', JSON.stringify(result1, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testEnhanceAPI();
