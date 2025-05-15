import React from 'react';

const ContactCard = ({ icon, title, detail }) => {
    return (
        <div className="bg-black border-solid border-2 border-gray-700 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="text-3xl">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <a className="mt-1 text-emerald-500" href={`mailto:${detail}`}>{detail}</a>
            </div>
        </div>
    );
};

export default ContactCard;
