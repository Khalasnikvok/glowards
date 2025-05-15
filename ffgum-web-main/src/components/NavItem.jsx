
import React from 'react';

const NavItem = ({ href, children }) => (
    <a href={href} className="text-white hover:text-gray-300 mx-2">
        {children}
    </a>
);

export default NavItem;
