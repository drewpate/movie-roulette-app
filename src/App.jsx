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

  const [randomMovie, setRandomMovie] = useState("");
  const [message, setMessage] = useState("");

  const addMovie = () => {
    setRandomMovie("");
    setMessage("");
    if (movies.movieTitles.length >= 9) {
      setRandomMovie("");
      return setMessage("That's enough movies!");
    }
    const newMovie = {
      title: "",
    };
    setMovies({
      ...movies,
      movieTitles: [...movies.movieTitles, newMovie],
    });
  };

  const removeMovie = (index) => {
    if (movies.movieTitles.length <= 2) {
      setRandomMovie("");
      return setMessage("Ya need at least three, bud.");
    }
    let data = { ...movies };
    data.movieTitles.splice(index, 1);
    setMovies({ ...movies });
  };

  const handleMovieChange = (e, index) => {
    setMessage("");
    setRandomMovie("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let title = movies.movieTitles;

    if (title.some(({ title }) => title === "")) {
      setRandomMovie("");
      return setMessage("No Empty Fields Allowed!");
    }
    console.log(movies.movieTitles);
    console.log(movies.movieTitles.length);
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
        <button onClick={addMovie}>Add Movie</button>
      </div>
    </div>
  );
}

export default App;
