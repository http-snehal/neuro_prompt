import { useState } from 'react'

function App() {
    return (
        <div className="min-h-screen">
            <div className="p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        Neuroprompt
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        AI Prompt Optimizer
                    </p>
                </div>

                <div className="card text-center py-8">
                    <p className="text-gray-600">
                        Welcome to Neuroprompt! 🚀
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Environment setup complete.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default App
