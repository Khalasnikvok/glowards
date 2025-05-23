import React, { useState } from 'react';
import { useIdContext } from '../contexts/IdContext';
import { getUser } from '../utils/api'; 

const regions = [
    { name: "Brazil", code: "BRA" },
    { name: "Pakistan", code: "PAK" },
    { name: "Taiwan", code: "TWN" },
    { name: "Indonesia", code: "IDN" },
    { name: "Africa", code: "AFR" },
    { name: "Malaysia", code: "MYS" },
    { name: "Vietnam", code: "VNM" },
    { name: "India", code: "IND" },
    { name: "Europe", code: "EUR" },
    { name: "Thailand", code: "THA" },
    { name: "South America", code: "SAM" },
    { name: "United States", code: "USA" },
    { name: "North America", code: "NAM" },
];

const SignInForm = () => {
    const { data, setData } = useIdContext();
    const [inputId, setInputId] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputId(value);
        setError('');
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputId) {
            setError('ID field is required.');
        } else if (!selectedRegion) {
            setError('Please select a region.');
        } else {
            try {
                const userData = await getUser(selectedRegion, inputId);
                setData({ ffId: userData.user.ffId, ffRegion: selectedRegion });
                window.location.href = "/dashboard";
            } catch (err) {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-lg p-8 shadow-xl w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In to Glowards</h2>

            <div className="mb-4">
                <label htmlFor="id" className="block text-lg text-white font-medium mb-2">ID</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={inputId}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your ID"
                />
                {error && <p className="text-red-400 mt-2">{error}</p>}
            </div>

            <div className="mb-6">
                <label htmlFor="region" className="block text-lg text-white font-medium mb-2">Region</label>
                <select
                    id="region"
                    name="region"
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Select your region</option>
                    {regions.map((region) => (
                        <option key={region.code} value={region.code}>
                            {region.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-600 transition duration-300"
            >
                Sign In
            </button>
        </form>
    );
};

export default SignInForm;