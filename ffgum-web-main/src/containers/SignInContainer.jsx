import React from 'react';
import SignInForm from '../components/SignInForm';

const SignInContainer = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Bienvenido a <span className="text-emerald-400">ffgum</span>
                    </h1>
                    <p className="text-lg md:text-2xl mb-8 text-center">
                        Por favor ingrese su ID para continuar.
                    </p>
                    <SignInForm />
                </div>
            </div>
        </div>
    );
};

export default SignInContainer;
