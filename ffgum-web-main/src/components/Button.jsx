
import React from 'react';

const Button = ({ children, className, ...props }) => (
    <button className={`px-6 py-2 rounded-full font-semibold ${className}`} {...props}>
        {children}
    </button>
);

export default Button;
