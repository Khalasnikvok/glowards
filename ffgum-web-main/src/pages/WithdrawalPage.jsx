import React, { useState, useEffect } from 'react';
import { useIdContext } from '../contexts/IdContext';
import axios from 'axios';
import '../styles/input.css';
import api, { getUser } from '../utils/api'; 

const WithdrawalPage = () => {
    const { data } = useIdContext();
    const [diamonds, setDiamonds] = useState(); 
    const [withdrawAmount, setWithdrawAmount] = useState(); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const fetchData = await getUser(data.ffRegion, data.ffId);
                setDiamonds(fetchData.user.ffCurrency); 
            } catch (err) {
                setError('Error al obtener los datos del usuario.');
            }
        };

            fetchUserData();
    }, [data]);

    const handleWithdraw = async (e) => {
        e.preventDefault();
        const amount = parseInt(withdrawAmount, 10);

        if (isNaN(amount) || amount < 100) {
            setError('El monto mínimo para retirar es 100 diamantes.');
            setSuccess('');
            return;
        }

        if (amount % 100 !== 0) {
            setError('El monto a retirar debe ser múltiplo de 100.');
            setSuccess('');
            return;
        }

        if (amount > diamonds) {
            setError('No tienes suficientes diamantes para retirar esta cantidad.');
            setSuccess('');
            return;
        }

        try {
            const response = await api.post('/withdrawals', {
                ffId: data.ffId,
                ffCurrencyAmount: amount
            });

            setDiamonds(diamonds - amount);
            setWithdrawAmount(100); 
            setSuccess(`Has retirado ${amount} diamantes con éxito.`);
            setError('');
        } catch (error) {
            setError('Error al crear el retiro.');
            setSuccess('');
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold mb-6">Retirar Diamantes</h2>
                <p className="mb-4">Tienes actualmente: <strong>{diamonds}</strong> diamantes.</p>

                <form onSubmit={handleWithdraw} className="flex flex-col space-y-4 max-w-md mx-auto">
                    <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        min="100" 
                        placeholder="Ingrese cantidad que desea retirar."
                        className="p-4 rounded-md text-black font-bold border border-gray-300"
                        required
                    />
                    <button 
                        type="submit"
                        className="w-full bg-emerald-400 text-black font-bold py-2 px-4 rounded hover:bg-emerald-500 transition duration-300"
                    >
                        Retirar
                    </button>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </form>
            </div>
        </section>
    );
};

export default WithdrawalPage;
