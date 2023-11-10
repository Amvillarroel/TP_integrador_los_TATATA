import { TMDB_API } from '../remote/TMDB_API';

const getAnimes = async (endpoint) => {
    const response = await TMDB_API.get(endpoint, {
        params: {
        with_origin_country: 'JP'
        }
    })
    return response;
};

export { getAnimes };