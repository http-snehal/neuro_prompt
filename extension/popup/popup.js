// Neuroprompt Extension Popup - Vanilla JavaScript

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// State
let currentView = 'login';
let currentUser = null;

// DOM Elements (will be initialized after DOM loads)
let elements = {};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    initializeElements();
    attachEventListeners();
    await checkAuth();
});

// Initialize DOM element references
function initializeElements() {
    elements = {
        // Views
        loginView: document.getElementById('login-view'),
        signupView: document.getElementById('signup-view'),
        dashboardView: document.getElementById('dashboard-view'),

        // Login
        loginForm: document.getElementById('login-form'),
        loginEmail: document.getElementById('login-email'),
        loginPassword: document.getElementById('login-password'),
        loginBtn: document.getElementById('login-btn'),
        loginError: document.getElementById('login-error'),
        showSignup: document.getElementById('show-signup'),

        // Signup
        signupForm: document.getElementById('signup-form'),
        signupEmail: document.getElementById('signup-email'),
        signupPassword: document.getElementById('signup-password'),
        signupConfirmPassword: document.getElementById('signup-confirm-password'),
        signupBtn: document.getElementById('signup-btn'),
        signupError: document.getElementById('signup-error'),
        showLogin: document.getElementById('show-login'),

        // Dashboard
        logoutBtn: document.getElementById('logout-btn'),
        userEmail: document.getElementById('user-email'),
        dailyCount: document.getElementById('daily-count'),
        dailyLimit: document.getElementById('daily-limit'),
        totalCount: document.getElementById('total-count'),
        progressFill: document.getElementById('progress-fill')
    };
}

// Attach event listeners
function attachEventListeners() {
    // Yeti animations
    initializeYetiAnimations();

    elements.loginForm.addEventListener('submit', handleLogin);
    elements.signupForm.addEventListener('submit', handleSignup);
    elements.showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        showView('signup');
    });
    elements.showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showView('login');
    });
    elements.logoutBtn.addEventListener('click', handleLogout);
}

// Yeti animation functions
function initializeYetiAnimations() {
    const eyes = document.querySelector('.eyes');
    const yetiWrapper = document.querySelector('.yeti-wrapper');

    if (!eyes || !yetiWrapper) return;

    // Eye tracking on email input
    elements.loginEmail.addEventListener('input', (e) => {
        const val = e.target.value.length;
        // Move eyes slightly left/right based on text length
        const move = Math.min(val * 0.8, 15);
        eyes.style.transform = `translateX(${move - 7}px)`;
    });

    // Cover eyes on password focus (peek-a-boo)
    elements.loginPassword.addEventListener('focus', () => {
        yetiWrapper.classList.add('peek-a-boo');
    });

    // Reveal eyes on password blur
    elements.loginPassword.addEventListener('blur', () => {
        yetiWrapper.classList.remove('peek-a-boo');
    });
}

// View Management
function showView(view) {
    // Hide all views
    elements.loginView.classList.add('hidden');
    elements.signupView.classList.add('hidden');
    elements.dashboardView.classList.add('hidden');

    // Show requested view
    if (view === 'login') {
        elements.loginView.classList.remove('hidden');
        currentView = 'login';
    } else if (view === 'signup') {
        elements.signupView.classList.remove('hidden');
        currentView = 'signup';
    } else if (view === 'dashboard') {
        elements.dashboardView.classList.remove('hidden');
        currentView = 'dashboard';
    }
}

// Auth Functions
async function checkAuth() {
    try {
        const auth = await getStoredAuth();

        if (auth && auth.token) {
            // Verify token with backend
            const response = await fetch(`${API_BASE_URL}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                currentUser = data.user;
                updateDashboard(data.user);
                showView('dashboard');
            } else {
                await clearStoredAuth();
                showView('login');
            }
        } else {
            showView('login');
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        showView('login');
    }
}

// Login Handler
async function handleLogin(e) {
    e.preventDefault();

    const email = elements.loginEmail.value.trim();
    const password = elements.loginPassword.value;

    // Validation
    if (!email || !password) {
        showError('login', 'Please fill in all fields');
        return;
    }

    setLoading('login', true);
    hideError('login');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            await saveAuth(data.token, data.user);
            currentUser = data.user;
            updateDashboard(data.user);
            showView('dashboard');
            elements.loginForm.reset();
        } else {
            showError('login', data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('login', 'Network error. Please try again.');
    } finally {
        setLoading('login', false);
    }
}

// Signup Handler
async function handleSignup(e) {
    e.preventDefault();

    const email = elements.signupEmail.value.trim();
    const password = elements.signupPassword.value;
    const confirmPassword = elements.signupConfirmPassword.value;

    // Validation
    if (!email || !password || !confirmPassword) {
        showError('signup', 'Please fill in all fields');
        return;
    }

    if (password.length < 6) {
        showError('signup', 'Password must be at least 6 characters');
        return;
    }

    if (password !== confirmPassword) {
        showError('signup', 'Passwords do not match');
        return;
    }

    setLoading('signup', true);
    hideError('signup');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            await saveAuth(data.token, data.user);
            currentUser = data.user;
            updateDashboard(data.user);
            showView('dashboard');
            elements.signupForm.reset();
        } else {
            showError('signup', data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showError('signup', 'Network error. Please try again.');
    } finally {
        setLoading('signup', false);
    }
}

// Logout Handler
async function handleLogout() {
    await clearStoredAuth();
    currentUser = null;
    showView('login');
    elements.loginForm.reset();
}

// Update Dashboard
function updateDashboard(user) {
    elements.userEmail.textContent = user.email;

    const dailyCount = user.usageStats?.dailyCount || 0;
    const dailyLimit = user.usageStats?.dailyLimit || 50;
    const totalCount = user.usageStats?.totalEnhancements || 0;

    elements.dailyCount.textContent = dailyCount;
    elements.dailyLimit.textContent = dailyLimit;
    elements.totalCount.textContent = totalCount;

    // Update progress bar
    const percentage = (dailyCount / dailyLimit) * 100;
    elements.progressFill.style.width = `${Math.min(percentage, 100)}%`;
}

// UI Helpers
function setLoading(form, loading) {
    const btn = form === 'login' ? elements.loginBtn : elements.signupBtn;
    btn.disabled = loading;
}

function showError(form, message) {
    const errorEl = form === 'login' ? elements.loginError : elements.signupError;
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError(form) {
    const errorEl = form === 'login' ? elements.loginError : elements.signupError;
    errorEl.classList.add('hidden');
}

// Chrome Storage Helpers
async function saveAuth(token, user) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ authToken: token, user: user }, resolve);
    });
}

async function getStoredAuth() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['authToken', 'user'], (result) => {
            resolve({
                token: result.authToken,
                user: result.user
            });
        });
    });
}

async function clearStoredAuth() {
    return new Promise((resolve) => {
        chrome.storage.local.remove(['authToken', 'user'], resolve);
    });
}
