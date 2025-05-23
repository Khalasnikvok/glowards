import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import { useIdContext } from '../contexts/IdContext';

const HeroSection = () => {
    const { data } = useIdContext();

    return (
        <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex items-center justify-center min-h-screen" id="hero">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to <span className="text-purple-400">Glowards</span>
                </h1>
                <p className="text-lg md:text-2xl mb-8 text-gray-300">
                    Earn rewards by engaging with our community <br />
                    Join thousands of users already earning with us
                </p>
                <a 
                    href={data?.ffId ? "/dashboard/surveys" : "/sign-in"}
                    className="bg-purple-500 text-white hover:bg-purple-600 font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center space-x-2"
                >
                    {data?.ffId ? "Start Earning" : "Get Started"}
                </a>
            </div>
        </section>
    );
}

export default HeroSection;