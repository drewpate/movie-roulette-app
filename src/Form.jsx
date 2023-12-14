import React, { useState, useEffect } from "react";

const Form = () => {
  const [messages, setMessages] = useState({
    randomMovie: "",
    spin: "",
    remove: "",
    add: "",
  });

  const [fetchedMovie, setFetchedMovie] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(messages);
  }, [messages]);

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

  const fetchMovies = () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU2OTFiYmE4NjdlYTkyYmU4OTk2Y2QyZTdjNGQ2NCIsInN1YiI6IjY0NjE3YzMzNmUwZDcyMDExZWFhOWJkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4aCqvzQ2VxIZKk30-0Ow9hiPqA6bMc2Ry-ZpheudtJg",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setFetchedMovie(response.results[0].title))
      .catch((err) => console.error(err));
    setLoading(false);
  };

  const addMovie = () => {
    setMessages("");
    if (movies.movieTitles.length >= 9) {
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
    const updatedMovies = { ...movies };
    updatedMovies.movieTitles[index][e.target.name] = e.target.value;
    setMovies(updatedMovies);
  };

  const getRandom = () => {
    let random =
      movies.movieTitles[Math.floor(Math.random() * movies.movieTitles.length)];
    let string = JSON.stringify(random.title).replace(/"/g, "");
    console.log("get random produced: " + string);
    setMessages({ randomMovie: string });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let title = movies.movieTitles;
    if (title.some(({ title }) => title === "")) {
      return setMessages({ spin: "No empty fields allowed!" });
    }

    console.log("spinning!");
    getRandom();
  };

  return (
    <div className="App">
      <h1>Movie Roulette</h1>
      <p>
        <b>{Object.values(messages)}</b>
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
      <input
        type="search"
        name="search"
        id="moviesearch"
        label="Search Result"
        value={searchString}
        onChange={handleChange}
        placeholder="Search a movie title"
      />
      <div className="button-container">
        <button onClick={fetchMovies} disabled={loading}>
          Search
        </button>
        <p>{fetchedMovie}</p>
      </div>
    </div>
  );
};

export default Form;
