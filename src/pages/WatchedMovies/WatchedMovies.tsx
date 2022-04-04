import React, { useEffect, useState } from 'react';
import './WatchedMovies.css';
import ContentService from '../../Services/ContentService';

export default function WatchedMovies() {
    const [watchedMovies, setWatchedMovies] = useState([]);
    useEffect(() => {
        setWatchedMovies(ContentService.getWatchedMoviesList());
    }, []);
    const subscription = ContentService.getClosePopupStatus().subscribe((message: any) => {
        if (message) {
            setWatchedMovies(ContentService.getWatchedMoviesList());
        }
    })
    return (
        <div>
            <div className="movie-divider"></div>
            <div className="watched-movies-list">Watched Movies:</div>
            {watchedMovies.length > 0 ?
                <div>
                    {watchedMovies.map((movies: any) =>
                        <div className="movies-list-block">
                            <div><img className="movie-image" src={movies.image}></img></div>
                            <div className="movie-name-title"><span>{movies.title}</span></div>
                            <div className="movie-name-comment"><span>{movies.comment}</span></div>
                        </div>
                    )} </div>
                : <div>No movies available. Start watching!</div>}
        </div>
    )
}