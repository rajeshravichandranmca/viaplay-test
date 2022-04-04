import { Subject } from 'rxjs';

const subject = new Subject();
const moviesAdded = new Subject();
const addMoviesSubject = new Subject();

function getAllMoviesList() {
    let moviesList = localStorage.getItem('all-movies-list');
    if (!moviesList) {
        return [];
    } else {
        return JSON.parse(moviesList);
    }
}

function getWatchedMoviesList() {
    let watchedMovies = localStorage.getItem('watched-movies-list');
    if (!watchedMovies) {
        return [];
    } else {
        return JSON.parse(watchedMovies);
    }
};

function addMoviesToWatchedList({ movieUrl, movieName, movieComment }: any) {
    let watchedMovies = getWatchedMoviesList();
    let movieExists = false;
    for (let i = 0; i < watchedMovies.length; i++) {
        if (watchedMovies[i].title === movieName) {
            movieExists = true;
        }
    }
    if (!movieExists) {
        let watchedmovie: any = {};
        watchedmovie.title = movieName;
        watchedmovie.comment = movieComment;
        watchedmovie.image = movieUrl;
        watchedMovies.push(watchedmovie);
    }
    localStorage.setItem('watched-movies-list', JSON.stringify(watchedMovies));
}

function setClosePopupStatus(status: boolean) {
    subject.next(status);
}

const getClosePopupStatus = () => {
    return subject.asObservable();
}

function closeAddMoviesPopup(status: boolean) {
    addMoviesSubject.next(status);
}

const getAddMoviesPopupStatus = () => {
    return addMoviesSubject.asObservable();
}

function addMoviesToList({ name, url, comment }: any) {
    let moviesList = getAllMoviesList();
    if (moviesList.indexOf(name) === -1) {
        let movieInfo: any = {};
        movieInfo.title = name;
        movieInfo.comment = comment;
        movieInfo.image = url;
        moviesList.push(movieInfo);
    }
    localStorage.setItem('all-movies-list', JSON.stringify(moviesList));
    moviesAdded.next(true);
}

const getMoviesAddedStatus = () => {
    return moviesAdded.asObservable();
}

export default {
    getAllMoviesList,
    getWatchedMoviesList,
    addMoviesToWatchedList,
    setClosePopupStatus,
    getClosePopupStatus,
    addMoviesToList,
    getMoviesAddedStatus,
    closeAddMoviesPopup,
    getAddMoviesPopupStatus
};