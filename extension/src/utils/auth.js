import api from './api';

// Auth API functions
export const authAPI = {
    // Sign up new user
    signup: async (email, password) => {
        const response = await api.post('/auth/signup', { email, password });
        return response.data;
    },

    // Login existing user
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    // Verify current token
    verify: async () => {
        const response = await api.get('/auth/verify');
        return response.data;
    }
};

// Storage helpers
export const storage = {
    // Save auth data to chrome storage
    saveAuth: async (token, user) => {
        await chrome.storage.local.set({
            authToken: token,
            user: user
        });
    },

    // Get auth data from chrome storage
    getAuth: async () => {
        const result = await chrome.storage.local.get(['authToken', 'user']);
        return {
            token: result.authToken,
            user: result.user
        };
    },

    // Clear auth data
    clearAuth: async () => {
        await chrome.storage.local.remove(['authToken', 'user']);
    }
};
