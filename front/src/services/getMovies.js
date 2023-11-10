import { TMDB_API, TMDB_PATHS } from '../remote/TMDB_API';

const getMovies = async (endpoint) => {
    const response = await TMDB_API.get(endpoint)
    return response;
};

export { getMovies };