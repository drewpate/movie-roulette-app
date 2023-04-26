import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState({
    movieTitles: [
      {
        title: "",
      },
      {
        title: "",
      },
      {
        title: "",
      },
    ],
  });

  const [randomMovie, setRandomMovie] = useState("");
  const [message, setMessage] = useState("");

  const addMovie = () => {
    setMessage("");
    validator();
    const newMovie = {
      title: "",
    };
    setMovies({
      ...movies,
      movieTitles: [...movies.movieTitles, newMovie],
    });
  };

  const removeMovie = (index) => {
    setMessage("");
    validator();
    let data = { ...movies };
    data.movieTitles.splice(index, 1);
    setMovies({ ...movies });
  };

  const handleMovieChange = (e, index) => {
    const updatedMovies = { ...movies };
    updatedMovies.movieTitles[index][e.target.name] = e.target.value;
    validator();
    setMovies(updatedMovies);
  };

  const getRandom = () => {
    let random =
      movies.movieTitles[Math.floor(Math.random() * movies.movieTitles.length)];
    console.log(random);
    setRandomMovie(random);
  };

  const validator = () => {
    if (movies.movieTitles.length === 0) {
      setRandomMovie("");
      setMessage("There's no movies!");
    }
    if (movies.movieTitles.length < 2) {
      setRandomMovie("");
      setMessage("Ya need at least three, bud.");
    }
    if (movies.movieTitles.length >= 9) {
      setMessage("That's enough movies!");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validator();
    console.log(movies.movieTitles);
    console.log("spinning!");

    getRandom();
  };

  return (
    <div className="App">
      <h1>Movie Roulette</h1>
      <p>
        {message}
        <b>{randomMovie.title}</b>
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
                required
                onChange={(e) => handleMovieChange(e, index)}
              />
              <button onClick={removeMovie}>Remove</button>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} disabled={message}>
          Spin
        </button>
        <button onClick={addMovie} disabled={message}>
          Add Movie
        </button>
      </div>
    </div>
  );
}

export default App;
