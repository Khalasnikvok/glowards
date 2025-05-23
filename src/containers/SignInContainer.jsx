import React from 'react';
import SignInForm from '../components/SignInForm';

const SignInContainer = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Welcome to <span className="text-purple-400">Glowards</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-center text-gray-300">
                        Please enter your ID to continue.
                    </p>
                    <SignInForm />
                </div>
            </div>
        </div>
    );
};

export default SignInContainer;