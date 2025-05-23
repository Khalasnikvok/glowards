import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavItem from './NavItem';
import NavButton from './NavButton';
import NavButtonClose from './NavButtonClose';  
import { useIdContext } from '../contexts/IdContext';  

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { data, clearData } = useIdContext();  

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={`fixed w-full z-50 ${scrolled ? 'border-b border-purple-900' : ''} bg-gradient-to-r from-purple-900 to-indigo-900 shadow-md`}>
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-white">
                    Glowards
                </a>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white">
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <div className={`flex flex-col md:flex-row items-center justify-center md:justify-between w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4 ml-auto ${menuOpen ? 'block min-h-screen' : 'hidden'} md:flex`}>
                    <NavItem href="/">Home</NavItem>
                    {data?.ffId && (
                        <>
                            <NavItem href="/dashboard/surveys">Earn</NavItem>
                            <NavItem href="/dashboard/withdraw">Withdraw</NavItem>
                        </>
                    )}
                    <NavItem href="https://discord.gg/kCYGJEPmaE">Support</NavItem>
                    <div className="flex items-center space-x-4">
                        <NavButton href={data?.ffId ? "/dashboard" : "/sign-in"}>
                            {data?.ffId ? "Dashboard" : "Sign In"}
                        </NavButton>
                        {data?.ffId && (
                            <NavButtonClose 
                                onClick={clearData} 
                                href="/"  
                            >
                                Sign Out
                            </NavButtonClose>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;