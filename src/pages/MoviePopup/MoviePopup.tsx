import React, { useState } from 'react';
import './MoviePopup.css';
import ContentService from '../../Services/ContentService';

const MoviePopup = React.memo(({ movieUrl, movieName, movieComment }: any) => {

    const updateWatchedMovie = (movieUrl: string, movieName: string, movieComment: string) => {
        ContentService.addMoviesToWatchedList({ movieUrl, movieName, movieComment });
        ContentService.setClosePopupStatus(true);
    };

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="closeIcon" onClick={() => updateWatchedMovie(movieUrl, movieName, movieComment)}>&times;</span>
                <div><img className="movie-image-overlay" src={movieUrl}></img></div>
                <div className="movie-name"><span>{movieName}</span></div>
                <div className="movie-comment"><span>{movieComment}</span></div>
            </div>
        </div>
    )
});
export default MoviePopup;