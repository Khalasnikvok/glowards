import { useState, useEffect } from 'react';

const useLocalStorageData = () => {
    const [data, setData] = useState(() => {
        const ffId = localStorage.getItem("ffId");
        const ffRegion = localStorage.getItem("ffRegion");
        return { ffId, ffRegion };
    });

    useEffect(() => {
        if (data.ffId && data.ffRegion) {
            localStorage.setItem('ffId', data.ffId);
            localStorage.setItem('ffRegion', data.ffRegion);
        }
    }, [data]);

    const clearData = () => {
        localStorage.removeItem('ffId');
        localStorage.removeItem('ffRegion');
        setData({});
    };

    return [data, setData, clearData];
};

export default useLocalStorageData;
