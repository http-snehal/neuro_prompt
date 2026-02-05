import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
 * Enhance a user's prompt using Gemini API
 * @param {string} originalPrompt - The user's original prompt
 * @returns {Promise<{enhancedPrompt: string, responseTime: number}>}
 */
export const enhancePrompt = async (originalPrompt) => {
    const startTime = Date.now();

    try {
        // Use Gemini 1.5 Flash for fast, free responses
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Construct the full prompt
        const fullPrompt = `${SYSTEM_PROMPT}

Original prompt to enhance:
"""
${originalPrompt}
"""

Enhanced prompt:`;

        // Generate enhanced prompt
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const enhancedPrompt = response.text().trim();

        const responseTime = Date.now() - startTime;

        return {
            enhancedPrompt,
            responseTime
        };

    } catch (error) {
        console.error('Gemini API error:', error);

        // Handle specific error cases
        if (error.message?.includes('API_KEY')) {
            throw new Error('Invalid Gemini API key');
        }

        if (error.message?.includes('quota') || error.message?.includes('limit')) {
            throw new Error('API rate limit exceeded. Please try again later.');
        }

        throw new Error('Failed to enhance prompt. Please try again.');
    }
};
