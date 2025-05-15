import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';

import { useIdContext } from '../contexts/IdContext';

const HeroSection = () => {
    const { data } = useIdContext();

    return (
        <section className="relative bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center h-screen" id="dasu-hero">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Bienvenido a <span className="text-emerald-400">ffgum</span>
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                </p>
                <a 
                    href={ data?.ffId ? "/dashboard/surveys" : "/sign-in" }
                    className="bg-emerald-400 text-black hover:bg-emerald-500 font-bold py-2 px-6 rounded transition duration-300"
                >
                    { data?.ffId ? "Gana" : "Acceder" } 
                </a>
            </div>
        </section>
    );
}

export default HeroSection;
