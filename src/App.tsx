import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import MoviesList from './pages/MoviesList/MoviesList';
import WatchedMovies from './pages/WatchedMovies/WatchedMovies';
import './App.css';

function App() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [])
  return (
    <div>
      <Header />
      {isLoading ? <Loader /> :
        <div className='app-wrapper'>
          <MoviesList />
          <WatchedMovies />
        </div>
      }
      <Footer />
    </div>
  );
}

export default App;
