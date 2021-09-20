import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const Discover = () => {
  const [isLoading, setisLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieError, setMovieError] = useState(null);

  const url_discover =
    "https://api.themoviedb.org/3/discover/movie?api_key=bbfbd3744c8bf9d4bf9de18f180b4d6c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

  const img_base_url = "https://image.tmdb.org/t/p/w185";

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url_discover);
        const data = await response.json();

        if (data.results) {
          setisLoading(false);
          setMovies(data.results);
        } else {
          setisLoading(false);
          setMovieError(data.status_message);
        }
      } catch (error) {
        setisLoading(false);
        setMovieError(error.message);
      }
    }
    fetchMovies();
  }, []);

  const MovieList =
    movies.length !== 0 &&
    movies.map((movie) => {
      const { id, title, release_date, poster_path } = movie;
      return (
        <Link to={`/movie/${id}`} className="movie" key={id}>
          <div className="img_poster">
            <img src={`${img_base_url}${poster_path}`} alt="" />
          </div>
          <div className="details">
            <p>
              <b>{title}</b>
            </p>
            <p>{release_date}</p>
          </div>
        </Link>
      );
    });

  return (
    <div className="row">
      {movieError ? <p>{movieError}</p> : null}
      {isLoading ? <Spinner /> : MovieList}
    </div>
  );
};

export default Discover;
