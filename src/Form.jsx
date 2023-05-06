import React, { useState, useEffect } from "react";

const Form = () => {
  const [messages, setMessages] = useState({
    randomMovie: "",
    spin: "",
    remove: "",
    add: "",
  });
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
    // console.log(movies.movieTitles);
    // console.log(movies.movieTitles.length);
    console.log("spinning!");
    getRandom();
  };

  return (
    <div className="App">
      <h1>Movie Roulette</h1>
      <p>
        {messages.spin}

        <b>{messages.randomMovie}</b>
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
};

export default Form;
