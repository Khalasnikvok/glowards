import React from 'react';
import ContactCard from '../components/ContactCard';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
    return (
        <section className="relative bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center h-screen" id="dasu-contact">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Contacta a <span className="text-emerald-400">ffgum</span> 
                </h2>
                <p className="text-lg text-center mb-12">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus non beatae obcaecati quam animi nulla? Iusto, itaque. Ducimus porro accusamus quo, sint fuga ut voluptatibus minima hic corrupti labore vero!
                </p>
                <div className="flex flex-col md:flex-row md:justify-center gap-8">
                    <ContactCard
                        icon={<FaEnvelope />}
                        title="Lorem ipsum"
                        detail="mail@example.com"
                    />
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
