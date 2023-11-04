import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = import.meta.env.VITE_API_SERIES_ENDPOINT;

const getSeries = async () => {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
        params: {
        api_key: apiKey,
        language: 'es-ES' // Puedes cambiar el idioma según tus preferencias
        }
    })
    return response;
};

export { getSeries };