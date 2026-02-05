import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader } from 'lucide-react';

function Login({ onSwitchToSignup }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        Neuroprompt
                    </h1>
                    <p className="text-gray-600 mt-2">
                        AI Prompt Optimizer
                    </p>
                </div>

                {/* Login Form */}
                <div className="card">
                    <h2 className="text-xl font-semibold mb-6">Welcome Back</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="you@example.com"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn-primary w-full flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {/* Switch to Signup */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={onSwitchToSignup}
                                className="text-primary font-medium hover:underline"
                                disabled={loading}
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
