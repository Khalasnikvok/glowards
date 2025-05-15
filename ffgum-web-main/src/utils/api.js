import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', 
    timeout: 10000, 
});

export const getUser = async (ffRegion, ffId) => {
    try {
        const response = await api.get(`/users/signIn/${ffRegion}/${ffId}`);
        return response.data; 
    } catch (error) {
        throw error;
    }
};

export default api;
