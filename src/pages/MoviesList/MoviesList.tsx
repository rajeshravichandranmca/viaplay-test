import React, { useState, useEffect } from 'react';
import ContentService from '../../Services/ContentService';
import './MoviesList.css';
import MoviePopup from '../MoviePopup/MoviePopup';
import AddMovies from '../AddMovies/AddMovies';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function MoviesList() {
    const [allMoviesList, setAllMovilesList] = useState([]);
    const [movieUrl, setMovieUrl] = useState('');
    const [movieName, setMovieName] = useState('');
    const [movieComment, setMovieComment] = useState('');
    const [showPopup, setPopupState] = useState(false);
    const [showAddMoviePopup, setAddMoviePopupState] = useState(false);
    useEffect(() => {
        setAllMovilesList(ContentService.getAllMoviesList());
    }, []);

    const movieClicked = (movieUrl: string, movieName: string, movieComment: string) => {
        setMovieUrl(movieUrl);
        setMovieName(movieName);
        setMovieComment(movieComment);
        setPopupState(true);
    };
    const addMoviesClicked = () => {
        setAddMoviePopupState(true);
    }
    const subscription = ContentService.getClosePopupStatus().subscribe((message: any) => {
        if (message) {
            setPopupState(false);
        }
    })
    const moviesAdded = ContentService.getMoviesAddedStatus().subscribe((message: any) => {
        if (message) {
            setAllMovilesList(ContentService.getAllMoviesList());
            setAddMoviePopupState(false);
        }
    })
    const addMovies = ContentService.getAddMoviesPopupStatus().subscribe((message: any) => {
        if (message) {
            setAddMoviePopupState(false);
        }
    })
    return (
        <div>
            <div className="add-movies-button"><Fab size="medium" color="primary" aria-label="add movies" title="Add movies">
                <AddIcon onClick={() => addMoviesClicked()} />
            </Fab></div>
            <div className="movies-list">All Movies List:</div>
            {allMoviesList.length > 0 ?
                <div>
                    {allMoviesList.map((movies: any) =>
                        <div className="movies-list-block" onClick={() => movieClicked(movies.image, movies.title, movies.comment)}>
                            <div><img className="movie-image" src={movies.image}></img></div>
                            <div className="movie-name-title"><span>{movies.title}</span></div>
                            <div className="movie-name-comment"><span>{movies.comment}</span></div>
                        </div>
                    )} </div>
                : <div className="nomovies-content">No Movies are available! Be the first to add the movies!</div>}
            {showPopup ? <MoviePopup movieUrl={movieUrl} movieName={movieName} movieComment={movieComment}></MoviePopup> : null}
            {showAddMoviePopup ? <AddMovies></AddMovies> : null}
        </div>
    )
}