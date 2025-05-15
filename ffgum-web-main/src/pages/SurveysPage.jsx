import React from 'react';
import { Link } from 'react-router-dom';
import { IoPaperPlane } from 'react-icons/io5'; 
import { FaClipboardList, FaGift } from 'react-icons/fa'; 

const SurveysPage = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="flex flex-col space-y-4 max-w-md mx-auto">
                    <Link to="/dashboard/surveys/socials" className="flex items-center justify-between p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition cursor-pointer">
                        <h3 className="text-xl font-semibold">Socials</h3>
                        <IoPaperPlane size={24} className="text-white" />
                    </Link>

                    <Link to="/dashboard/surveys/promocodes" className="flex items-center justify-between p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition cursor-pointer">
                        <h3 className="text-xl font-semibold">Códigos Promocionales</h3>
                        <FaGift size={24} className="text-white" />
                    </Link>

                    <div className="flex items-center justify-between p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition cursor-pointer">
                        <h3 className="text-xl font-semibold">Próximamente...</h3>
                        <FaClipboardList size={24} className="text-white" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SurveysPage;
