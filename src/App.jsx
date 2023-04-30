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
  const [messages, setMessages] = useState({
    spin: "",
    remove: "",
    add: "",
  });

  const addMovie = () => {
    setRandomMovie("");
    setMessages("");
    if (movies.movieTitles.length >= 9) {
      setRandomMovie("");
      return setMessages({ add: "That's enough movies!" });
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
    if (movies.movieTitles.length <= 3) {
      setRandomMovie("");
      setMessages({ remove: "Ya need at least three there bud!" });
      return;
    }
    setMessages("");
    let data = { ...movies };
    data.movieTitles.splice(index, 1);
    setMovies({ ...movies });
  };

  const handleMovieChange = (e, index) => {
    setMessages("");
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
      return setMessages({ spin: "No empty fields allowed!" });
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
        {messages.remove}
        {messages.spin}
        {messages.add}

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
              <button onClick={removeMovie} disabled={messages.remove}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} disabled={messages.spin}>
          Spin
        </button>
        <button onClick={addMovie} disabled={messages.add}>
          Add Movie
        </button>
      </div>
    </div>
  );
}

export default App;
