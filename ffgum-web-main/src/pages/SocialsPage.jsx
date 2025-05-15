import React, { useState, useEffect } from 'react';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useIdContext } from '../contexts/IdContext';
import api from '../utils/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/socials.css';

const SocialsPage = () => {
    const { data } = useIdContext();
    const [loadingPlatform, setLoadingPlatform] = useState(null);
    const [completedSurveys, setCompletedSurveys] = useState({
        youtube: false,
        instagram: false,
        tiktok: false,
    });

    useEffect(() => {
        const fetchSurveyStatus = async () => {
            try {
                const response = await api.get(`/surveys/social?ffId=${data.ffId}`);
                const completedPlatforms = response.data.survey.map((survey) => survey.platform);

                setCompletedSurveys({
                    youtube: completedPlatforms.includes('youtube'),
                    instagram: completedPlatforms.includes('instagram'),
                    tiktok: completedPlatforms.includes('tiktok'),
                });
            } catch (error) {
                console.error('Error fetching survey status', error);
            }
        };

        fetchSurveyStatus();
    }, [data]);

    const handleFollow = async (platformUrl, platformName) => {
        setLoadingPlatform(platformName);
        const socialWindow = window.open(platformUrl, '_blank');
        const openTime = Date.now();

        const intervalId = setInterval(() => {
            if (socialWindow && socialWindow.closed) {
                const elapsedTime = Date.now() - openTime;

                if (elapsedTime >= 10000) {
                    toast.success('¡Gracias por seguirnos!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoadingPlatform(null);
                    clearInterval(intervalId);
                    try {
                        api.post('/surveys/social', { ffId: data.ffId, platform: platformName });
                        setCompletedSurveys((prev) => ({
                            ...prev,
                            [platformName]: true,
                        }));
                    } catch (error) {
                        console.error('Error creating survey entry', error);
                    }
                }
            }
        }, 1000);
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold mb-6">¡Síguenos en nuestras redes sociales y gana diamantes!</h2>
                <div className="flex flex-col space-y-4 max-w-md mx-auto">
                    <button 
                        className={`flex items-center justify-center p-6 bg-red-600 rounded-xl hover:bg-red-500 transition cursor-pointer ${loadingPlatform === 'youtube' || completedSurveys.youtube ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleFollow('https://youtube.com/@ffgumes', 'youtube')}
                        disabled={loadingPlatform === 'youtube' || completedSurveys.youtube}
                    >
                        {loadingPlatform === 'youtube' ? (
                            <span className="loader"></span>
                        ) : (
                            <>
                                <FaYoutube size={24} className="mr-2" />
                                Seguir en YouTube
                            </>
                        )}
                    </button>

                    <button 
                        className={`flex items-center justify-center p-6 bg-pink-500 rounded-xl hover:bg-pink-400 transition cursor-pointer ${loadingPlatform === 'instagram' || completedSurveys.instagram ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleFollow('https://www.instagram.com/ffgumlat', 'instagram')}
                        disabled={loadingPlatform === 'instagram' || completedSurveys.instagram}
                    >
                        {loadingPlatform === 'instagram' ? (
                            <span className="loader"></span>
                        ) : (
                            <>
                                <FaInstagram size={24} className="mr-2" />
                                Seguir en Instagram
                            </>
                        )}
                    </button>

                    <button 
                        className={`flex items-center justify-center p-6 bg-black rounded-xl hover:bg-gray-800 transition cursor-pointer ${loadingPlatform === 'tiktok' || completedSurveys.tiktok ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleFollow('https://www.tiktok.com/@ffgum6', 'tiktok')}
                        disabled={loadingPlatform === 'tiktok' || completedSurveys.tiktok}
                    >
                        {loadingPlatform === 'tiktok' ? (
                            <span className="loader"></span>
                        ) : (
                            <>
                                <FaTiktok size={24} className="mr-2" />
                                Seguir en TikTok
                            </>
                        )}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default SocialsPage;
