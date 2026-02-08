import { GoogleGenerativeAI } from '@google/generative-ai';

// System prompt for optimizing user prompts
const SYSTEM_PROMPT = `You are an expert prompt engineer. Your task is to transform basic, vague prompts into highly effective, detailed prompts that will get the best results from an AI assistant.

When enhancing a prompt, you should:
1. Maintain the user's original intent and goal
2. Add specific context and constraints where helpful
3. Specify the desired output format if applicable
4. Add tone and style guidance when relevant
5. Include examples or structure if it improves clarity
6. Keep the enhanced prompt concise but comprehensive

DO NOT:
- Change the fundamental request
- Add unnecessary complexity
- Make assumptions about unstated requirements
- Include conversational filler

Return ONLY the enhanced prompt, without any explanations or meta-commentary.`;

/**
 * Get all available API keys from environment
 */
const getApiKeys = () => {
    const keys = [];

    if (process.env.GEMINI_API_KEY) keys.push(process.env.GEMINI_API_KEY);
    if (process.env.GEMINI_API_KEY_2) keys.push(process.env.GEMINI_API_KEY_2);
    if (process.env.GEMINI_API_KEY_3) keys.push(process.env.GEMINI_API_KEY_3);

    return keys;
};

/**
 * Check if error is a quota/rate limit error
 */
const isQuotaError = (error) => {
    return error.status === 429 ||
        error.message?.includes('429') ||
        error.message?.includes('quota') ||
        error.message?.includes('limit') ||
        error.message?.includes('Too Many Requests');
};

/**
 * Enhance a user's prompt using Gemini API with multi-key fallback
 * @param {string} originalPrompt - The user's original prompt
 * @returns {Promise<{enhancedPrompt: string, responseTime: number}>}
 */
export const enhancePrompt = async (originalPrompt) => {
    const startTime = Date.now();
    const apiKeys = getApiKeys();

    if (apiKeys.length === 0) {
        throw new Error('No Gemini API keys configured');
    }

    console.log(`🔑 ${apiKeys.length} API key(s) available`);

    // Construct the full prompt
    const fullPrompt = `${SYSTEM_PROMPT}

Original prompt to enhance:
"""
${originalPrompt}
"""

Enhanced prompt:`;

    let lastError = null;

    // Try each API key
    for (let i = 0; i < apiKeys.length; i++) {
        const apiKey = apiKeys[i];
        console.log(`🔄 Trying API key ${i + 1}/${apiKeys.length}...`);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const enhancedPrompt = response.text().trim();

            const responseTime = Date.now() - startTime;
            console.log(`✅ Success with key ${i + 1}! Response time: ${responseTime}ms`);

            return { enhancedPrompt, responseTime };

        } catch (error) {
            console.error(`❌ Key ${i + 1} failed:`, error.message?.substring(0, 100));
            lastError = error;

            // If quota exceeded, try next key
            if (isQuotaError(error)) {
                console.log(`📊 Quota exceeded on key ${i + 1}, trying next...`);
                continue;
            }

            // For other errors, also try next key
            if (error.message?.includes('API_KEY') || error.status === 403) {
                console.log(`🔒 Invalid key ${i + 1}, trying next...`);
                continue;
            }
        }
    }

    // All keys exhausted
    console.error('❌ All API keys exhausted');

    if (isQuotaError(lastError)) {
        throw new Error('All API keys have reached their quota. Please try again later.');
    }

    throw new Error('Failed to enhance prompt. Please try again.');
};
