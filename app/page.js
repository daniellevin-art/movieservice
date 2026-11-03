"use client";
import { useState } from "react";
import MovieCard from "./components/moviecard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const API_KEY = process.env.OMDB_API_KEY
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`;

  async function getMovies(e) {
    e.preventDefault(); // stoppa formuläret från att ladda om sidan
    if (!title.trim()) return;

    //const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(title)}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (data.Response === "False") {
      setMovies([]);
      setError(data.Error); // t.ex. "Movie not found!"
    } else {
      setMovies(data.Search);
      setError("");
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Movie Service</h1>
      <form onSubmit={getMovies} className="flex gap-2 m-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sök efter titel..."
          className="border border-zinc-300 rounded-full py-2 px-4 dark:bg-zinc-900 dark:text-white"
        />
        <button
          type="submit"
          className="bg-orange-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Sök
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl m-4">
        {movies.map((m) => (
          <a
            key={m.imdbID}
            href={`https://www.imdb.com/title/${m.imdbID}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <MovieCard movie={m} />
          </a>
        ))}
      </div>
    </div>
  );
}
