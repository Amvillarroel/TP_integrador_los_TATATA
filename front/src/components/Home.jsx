import React, { useEffect, useState } from 'react'
import { useMultifetch } from '../hooks/useMultifetch';
import { getMovies } from '../services/getMovies';
import { getSeries } from '../services/getSeries';
import { getAnimes } from '../services/getAnimes';
import { getHorror } from '../services/getHorror';
import { getMovieAdapter } from '../adapters/getMovieAdapter';
import { getSeriesAdapter } from '../adapters/getSeriesAdapter';
import { getGenresMovies } from '../services/getGenresMovies';
import { TMDB_PATHS } from '../remote/TMDB_API';

const Home = () => {
    const { list, isLoading, error } = useMultifetch([
        {
            name: 'Proximas Peliculas',
            request: getMovies,
            adapter: getMovieAdapter,
            endpoint: TMDB_PATHS.movies.upcoming
        },
        {
            name: 'Series Populares',
            request: getSeries,
            adapter: getSeriesAdapter,
            endpoint: TMDB_PATHS.series.popular
        },
        {
            name: 'Peliculas de Terror',
            request: getHorror,
            adapter: getMovieAdapter,
            endpoint: TMDB_PATHS.movies.discover
        },
        {
            name: 'Animes',
            request: getAnimes,
            adapter: getSeriesAdapter,
            endpoint: TMDB_PATHS.series.discover
        }
    ]);
    const [genres, setGenres] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGenresMovies();
                setGenres(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    return (
        <>
            {error ?? (<h1>{error}</h1>)}
            {isLoading ? 
            (<h1>Cargando....</h1>) :
            (<>
                <ul style={{padding:'16px 32px', listStyle:'none', display:'flex', gap:'8px', overflow:'scroll'}}>
                    {genres?.map(genre => (
                        <li key={genre.id}>
                            <button style={{borderStyle:'none', borderRadius:'8px', padding:'4px 8px'}}>{genre.name}</button>
                        </li>
                    ))}
                </ul>
                <section style={{padding:'16px 32px', display:'flex', flexDirection:'column', gap:'32px'}}>
                    {list?.map((listElement, index) => (
                        <article key={index}>
                            <h2>{listElement?.name}</h2>
                            <ul style={{listStyle:'none', height:'400px', display:'flex', gap:'32px', overflow:'scroll'}}>
                                {listElement?.results?.map(item => (
                                    <li key={item?.id} style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                                        <img style={{maxWidth:'125px'}} src={`https://image.tmdb.org/t/p/w500${item?.poster}`} alt={item?.title} />
                                        <h3 style={{margin:'0', fontSize:'20px'}}>{item?.title}</h3>
                                        {<p>{item?.date}</p>}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </section>
            </>)}
        </>
    )
}

export default Home;