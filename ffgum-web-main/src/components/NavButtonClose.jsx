import React from 'react';

const NavButtonClose = ({ href, onClick, children }) => (
    <a 
        href={href} 
        onClick={onClick} 
        className="bg-red-600 text-white border-solid border-2 border-red-600 hover:bg-black hover:text-white hover:border-red-600 font-bold py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out"
    >
        {children}
    </a>
);

export default NavButtonClose;
