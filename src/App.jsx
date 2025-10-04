import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './Search.svg'
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=2d81b233';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search || []); // safely set movies
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    searchMovies('Avengers');  // ✅ fixed
  }, [])

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // ✅ fixed
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />  // ✅ fixed
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;






