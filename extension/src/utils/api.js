import axios from 'axios';

// API base URL - update this when deploying to production
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        // Get token from chrome storage
        const result = await chrome.storage.local.get(['authToken']);
        if (result.authToken) {
            config.headers.Authorization = `Bearer ${result.authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - clear storage
            await chrome.storage.local.remove(['authToken', 'user']);
        }
        return Promise.reject(error);
    }
);

export default api;
