// Final test with correct model and key
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function finalTest() {
    try {
        console.log('Testing with API key:', API_KEY?.substring(0, 15) + '...');
        console.log('Using model: gemini-2.5-flash\n');

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        console.log('Sending test prompt...');
        const result = await model.generateContent('Say hello in one sentence');
        const response = await result.response;
        const text = response.text();

        console.log('\n✅ SUCCESS!');
        console.log('Response:', text);
        console.log('\n🎉 Gemini API is working perfectly!');

    } catch (error) {
        console.log('\n❌ ERROR');
        console.log('Status:', error.status);
        console.log('Message:', error.message);
        if (error.errorDetails) {
            console.log('Details:', JSON.stringify(error.errorDetails, null, 2));
        }
    }
}

finalTest();
