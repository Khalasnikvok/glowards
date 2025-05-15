import React from 'react';

const NavButton = ({ href, children }) => (
    <a 
        href={href} 
        className="bg-emerald-400 text-black border-solid border-2 border-emerald-400 hover:bg-black hover:text-white hover:border-emerald-400 font-bold py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out"
    >
        {children}
    </a>
);

export default NavButton;
