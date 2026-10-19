import { useEffect, useState } from "react";

const KEY = "f5e0d7d4";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(query)}`,
            { signal: controller.signal },
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search ?? []);
        } catch (err) {
          if (err.name === "AbortError") return;
          console.error("Failed to fetch movies:", err);
          setError(err.message);
          setMovies([]);
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }

      const timeoutId = setTimeout(fetchMovies, 350);

      return function () {
        clearTimeout(timeoutId);
        controller.abort();
      };
    },
    [query],
  );

  return { movies, isLoading, error };
}
