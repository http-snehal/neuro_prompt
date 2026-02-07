// Quick test to check if .env is loading correctly
import dotenv from 'dotenv';
dotenv.config();

console.log('=== Environment Check ===');
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
console.log('GEMINI_API_KEY length:', process.env.GEMINI_API_KEY?.length || 0);
console.log('GEMINI_API_KEY first 10 chars:', process.env.GEMINI_API_KEY?.substring(0, 10));
console.log('GEMINI_API_KEY last 5 chars:', process.env.GEMINI_API_KEY?.substring(process.env.GEMINI_API_KEY.length - 5));
console.log('Full key:', process.env.GEMINI_API_KEY);
