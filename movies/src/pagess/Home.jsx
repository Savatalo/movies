import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=603cdf52aeb9055dd42be4d11937760a&language=en-US&page=7"
      )
      .then((response) => {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      })
      .catch((error) => {
        console.error("There was an error fetching data!", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
    filterMovies(searchQuery, genre);
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setGenre(selectedGenre);
    filterMovies(query, selectedGenre);
  };

  const filterMovies = (searchQuery, selectedGenre) => {
    const filtered = movies.filter((movie) => {
      const matchesQuery = movie.title.toLowerCase().includes(searchQuery);
      const matchesGenre = selectedGenre === "1" || movie.genre_ids.includes(parseInt(selectedGenre));
      return matchesQuery && matchesGenre;
    });
    setFilteredMovies(filtered);
  };

  const handleClick = (movie) => {
    navigate(`/about/${movie.id}`);
  };

  return (
    <>
      <h1 className="title">100% FREE CINEMA</h1>
      <input
        className="search"
        value={query}
        type="text"
        onChange={handleInputChange}
        placeholder="Search for movies..."
      />

      <label htmlFor="genres">Choose genre:</label>
      <select id="genres" name="genres" onChange={handleGenreChange}>
        <option value="1">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="27">Horror</option>
        <option value="878">Sci-Fi</option>
        <option value="53">Thriller</option>
        <option value="14">Fantasy</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romantic</option>
      </select>

      <div className="movies-container">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
              onClick={() => handleClick(movie)}
            />
            <h3 className="movie-title" onClick={() => handleClick(movie)}>
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}

