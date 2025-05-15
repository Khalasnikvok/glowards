import React, { useState } from 'react';
import { useIdContext } from '../contexts/IdContext';
import api from '../utils/api.js';

const SignInForm = () => {
    const { data } = useIdContext();
    const [inputCode, setInputCode] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setInputCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await api.post('/promocodes/claim', { 
                code: inputCode, 
                ffId: data.ffId 
            });

            if (response.status === 200) {
                setSuccessMessage('¡Código reclamado exitosamente!');
                setInputCode(''); 
            } else {
                setError('Hubo un problema al reclamar el código.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al reclamar el código.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-b from-gray-900 text-black rounded-lg p-6 shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Código Promocional</h2>

            <div className="mb-4">
                <input
                    type="text"
                    id="code"
                    name="code"
                    value={inputCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Ingrese su código promocional"
                />
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-emerald-400 text-black font-bold py-2 px-4 rounded hover:bg-emerald-500 transition duration-300"
            >
               Reclamar 
            </button>
        </form>
    );
};

export default SignInForm;
