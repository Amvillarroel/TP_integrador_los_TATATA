import { TMDB_API } from '../remote/TMDB_API';

const getHorror = async (endpoint) => {
    const response = await TMDB_API.get(endpoint, {
        params: {
            with_genres: 27
        }
    })
    return response;
};

export { getHorror };