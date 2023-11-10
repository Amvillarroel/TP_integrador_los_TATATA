import axios from 'axios';

const TMDB_API = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: 'es-ES'
    },
    timeout: 3000
});

const TMDB_PATHS = {
    images_base_url: 'https://image.tmdb.org/t/p/w500',
    movies: {
        genres: '/genre/movie/list',
        now_playing: '/movie/now_playing',
        popular: '/movie/popular',
        top_related: '/movie/top_rated',
        upcoming: '/movie/upcoming',
        discover: '/discover/movie'
    },
    series: {
        genres: '/genre/tv/list',
        airing_today: '/tv/airing_today',
        on_the_air: '/tv/on_the_air',
        popular: '/tv/popular',
        top_rated: '/tv/top_rated',
        discover: '/discover/tv'
    }
}

export { 
    TMDB_API,
    TMDB_PATHS
};