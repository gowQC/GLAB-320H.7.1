import { useState, useEffect } from "react";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
import "./App.css";

export default function App() {
  const apiKey = "a4dad4bd";

  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      console.log(data);
      setMovie(data);
    } catch (e) {
      console.error(e);
    }
  };

  // Will simulate randomness for useEffect movie
  // scrapped idea - lack of enough documentation
  // const random = async () => {
  //   const number =
  //     Math.floor(Math.random() * (5000000 - 1000000 + 1)) + 1000000;
  //   // https://www.omdbapi.com/?i=tt1000000&apikey=a4dad4bd
  //   console.log(number);
  //   const response = await fetch(
  //     `https://www.omdbapi.com/?i=tt${number}&apikey=${apiKey}`
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   return data.Title;
  // };

  // This will run on the first render but not on subsquent renders
  useEffect(() => {
    const movieArray = [
      "Clueless",
      "Pokemon",
      "Avengers",
      "Spongebob",
      "Madagascar",
      "Nightmare Before Christmas",
    ];
    const randomNumber = Math.floor(Math.random() * 1000) % movieArray.length;
    getMovie(movieArray[randomNumber]);
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}
