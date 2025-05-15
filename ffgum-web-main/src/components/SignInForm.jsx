import React, { useState } from 'react';
import { useIdContext } from '../contexts/IdContext';
import { getUser } from '../utils/api'; 

const regions = [
    { name: "Brasil", code: "BRA" },
    { name: "Pakistán", code: "PAK" },
    { name: "Taiwán", code: "TWN" },
    { name: "Indonesia", code: "IDN" },
    { name: "África", code: "AFR" },
    { name: "Malasia", code: "MYS" },
    { name: "Vietnam", code: "VNM" },
    { name: "India", code: "IND" },
    { name: "Europa", code: "EUR" },
    { name: "Tailandia", code: "THA" },
    { name: "Sudamérica", code: "SAM" },
    { name: "Estados Unidos", code: "USA" },
    { name: "Norteamérica", code: "NAM" },
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
            setError('Campo de ID requeridos.');
        } else if (!selectedRegion) {
            setError('Debe seleccionar una región.');
        } else {
            try {
                const userData = await getUser(selectedRegion, inputId);
                setData({ ffId: userData.user.ffId, ffRegion: selectedRegion });
                window.location.href = "/dashboard";
            } catch (err) {
                setError('Error al iniciar sesión. Intenta de nuevo.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-b from-gray-900 text-black rounded-lg p-6 shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>

            <div className="mb-4">
                <label htmlFor="id" className="block text-lg text-white font-medium mb-2">ID</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={inputId}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Ingrese su ID"
                />
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="region" className="block text-lg text-white font-medium mb-2">Región</label>
                <select
                    id="region"
                    name="region"
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                    <option value="">Seleccione su región</option>
                    {regions.map((region) => (
                        <option key={region.code} value={region.code}>
                            {region.name}
                        </option>
                    ))}
                </select>
                {error && !selectedRegion && <p className="text-red-600 mt-2">Debe seleccionar una región.</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-emerald-400 text-black font-bold py-2 px-4 rounded hover:bg-emerald-500 transition duration-300"
            >
                Acceder
            </button>
        </form>
    );
};

export default SignInForm;
