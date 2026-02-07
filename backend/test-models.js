// Test different model versions
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDBoz67vKwZb-LAJsCRUpuqqt1KTUYOGO8';

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);

        console.log('Testing different models...\n');

        const modelsToTry = [
            'gemini-pro',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'models/gemini-pro',
            'models/gemini-1.5-pro'
        ];

        for (const modelName of modelsToTry) {
            try {
                console.log(`Testing: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Hi');
                const response = await result.response;
                console.log(`✅ ${modelName} WORKS!`);
                console.log(`Response: ${response.text().substring(0, 50)}...\n`);
                break; // Found working model
            } catch (error) {
                console.log(`❌ ${modelName} - ${error.status || error.message}\n`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
