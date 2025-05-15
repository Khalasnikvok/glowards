import React, { useState, useEffect } from 'react';
import { useIdContext } from '../contexts/IdContext'; 
import { getUser }  from '../utils/api'; 
import { IoDiamondSharp } from "react-icons/io5";

const DashboardPage = () => {
    const { data } = useIdContext(); 
    const [diamonds, setDiamonds] = useState(0); 
    const [withdrawals, setWithdrawals] = useState([]); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(data.ffRegion, data.ffId);
                setDiamonds(userData.user.ffCurrency);
                setWithdrawals(userData.withdrawals);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [data]);

    const sortedWithdrawals = withdrawals.sort((a, b) => b.id - a.id);

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="max-w-lg mx-auto p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Tu Cuenta</h2>
                        <div className="flex justify-center text-xl p-4 border rounded-xl">
                            <div className="text-left px-4">
                                <h3 className="font-semibold">ID:</h3>
                                <h3 className="font-semibold">Región:</h3>
                                <h3 className="font-semibold">Diamantes:</h3>
                            </div>
                            <div className="text-left px-4">
                                <p>{data.ffId}</p>
                                <p>{data.ffRegion}</p>
                                <p className="flex">{diamonds} <span className="px-4"><IoDiamondSharp/></span></p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Historial de Retiros</h2>
                        {sortedWithdrawals.length > 0 ? (
                            <div className="text-lg w-full border border rounded-xl overflow-hidden">
                                <div className="flex">
                                    <div className="flex-1 px-4 py-2 font-bold">ID</div>
                                    <div className="flex-1 px-4 py-2 font-bold">Cantidad</div>
                                    <div className="flex-1 px-4 py-2 font-bold">Fecha</div>
                                </div>
                                <div>
                                    {sortedWithdrawals.map((withdrawal) => (
                                        <div key={withdrawal.id} className="flex hover:bg-gray-800 transition">
                                            <div className="flex-1 px-4 py-2">{withdrawal.id}</div>
                                            <div className="flex px-4 py-2">{withdrawal.ffCurrencyAmount} <span className="px-2"><IoDiamondSharp/></span></div>
                                            <div className="flex-1 px-4 py-2">{withdrawal.createdAt.split('T')[0]}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                                <p>No se encontraron retiros.</p>
                            )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
