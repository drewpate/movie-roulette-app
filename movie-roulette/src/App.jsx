import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState({
    movieTitles: [
      {
        title: "",
      },
    ],
  });

  const [randomMovie, setRandomMovie] = useState([]);

  const addMovie = () => {
    const newMovie = {
      title: "",
    };
    setMovies({
      ...movies,
      movieTitles: [...movies.movieTitles, newMovie],
    });
  };

  const removeMovie = (index) => {
    let data = { ...movies };
    data.movieTitles.splice(index, 1);
    setMovies({ ...movies });
  };

  const handleMovieChange = (e, index) => {
    const updatedMovies = { ...movies };
    updatedMovies.movieTitles[index][e.target.name] = e.target.value;
    setMovies(updatedMovies);
  };

  const getRandom = () => {
    let random =
      movies.movieTitles[Math.floor(Math.random() * movies.movieTitles.length)];
    console.log(random);
    setRandomMovie(random);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("spinning!");
    getRandom();
  };

  return (
    <div className="App">
      <h1>Movie Roulette</h1>
      <p>
        Winner: <b>{randomMovie.title}</b>
      </p>
      <div className="input-container">
        {movies.movieTitles.map((movie, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                name="title"
                id="movie"
                label="Movie Title"
                value={movie.title}
                onChange={(e) => handleMovieChange(e, index)}
              />
              <button onClick={removeMovie}>Remove</button>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Spin</button>
        <button onClick={addMovie}>Add Movies</button>
      </div>
    </div>
  );
}

export default App;
