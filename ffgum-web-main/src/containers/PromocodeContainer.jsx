import React from 'react';
import PromocodeForm from '../components/PromocodeForm';

const SignInContainer = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Reclame su <span className="text-emerald-400">código promocional</span>
                    </h1>
                    <PromocodeForm />
                </div>
            </div>
        </div>
    );
};

export default SignInContainer;
