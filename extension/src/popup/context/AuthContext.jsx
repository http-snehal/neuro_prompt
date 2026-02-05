import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, storage } from '../../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing auth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { token, user: storedUser } = await storage.getAuth();

            if (token && storedUser) {
                // Verify token is still valid
                const response = await authAPI.verify();
                setUser(response.user);
            }
        } catch (err) {
            console.error('Auth check failed:', err);
            await storage.clearAuth();
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password) => {
        try {
            setError(null);
            const response = await authAPI.signup(email, password);

            // Save token and user to storage
            await storage.saveAuth(response.token, response.user);
            setUser(response.user);

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Signup failed';
            setError(message);
            return { success: false, error: message };
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authAPI.login(email, password);

            // Save token and user to storage
            await storage.saveAuth(response.token, response.user);
            setUser(response.user);

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, error: message };
        }
    };

    const logout = async () => {
        await storage.clearAuth();
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        signup,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
