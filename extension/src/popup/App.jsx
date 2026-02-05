import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { Loader } from 'lucide-react';

function AppContent() {
    const { isAuthenticated, loading } = useAuth();
    const [showSignup, setShowSignup] = useState(false);

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Show Dashboard if authenticated
    if (isAuthenticated) {
        return <Dashboard />;
    }

    // Show Login or Signup based on state
    if (showSignup) {
        return <Signup onSwitchToLogin={() => setShowSignup(false)} />;
    }

    return <Login onSwitchToSignup={() => setShowSignup(true)} />;
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
