import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut, Loader } from 'lucide-react';

function Dashboard() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                            Neuroprompt
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {user.email}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                {/* Usage Stats */}
                <div className="card mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Daily Usage</h3>
                        <span className="text-sm text-gray-600">
                            {user.usageStats?.dailyCount || 0} / {user.usageStats?.dailyLimit || 50}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all"
                            style={{
                                width: `${((user.usageStats?.dailyCount || 0) / (user.usageStats?.dailyLimit || 50)) * 100}%`
                            }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Total enhancements: {user.usageStats?.totalEnhancements || 0}
                    </p>
                </div>

                {/* Welcome Card */}
                <div className="card text-center py-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h2 className="text-xl font-semibold mb-2">
                        Welcome to Neuroprompt!
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Visit ChatGPT or Gemini to start optimizing your prompts
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                        <p className="text-sm text-blue-900 font-medium mb-2">
                            How to use:
                        </p>
                        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                            <li>Navigate to ChatGPT or Gemini</li>
                            <li>Type your basic prompt</li>
                            <li>Click "Optimize Prompt" button</li>
                            <li>Review enhanced prompt</li>
                            <li>Submit to AI tool</li>
                        </ol>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        History and Favorites coming in Week 3 📝
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
