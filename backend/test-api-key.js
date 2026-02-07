// Quick test to verify Gemini API key
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDcpHDq0aurTZUrlxkc61nHGrjnwE3nj3c';

async function testKey() {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent('Say "Hello"');
        const response = await result.response;
        const text = response.text();

        console.log('✅ API KEY WORKS!');
        console.log('Response:', text);
    } catch (error) {
        console.log('❌ API KEY INVALID');
        console.log('Error:', error.message);
        console.log('Details:', error.status, error.statusText);
    }
}

testKey();
