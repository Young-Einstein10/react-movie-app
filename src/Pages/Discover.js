import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';


const Discover = () => {
  const [isLoading, setisLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchInput, setsearchInput] = useState('');
  const [movieError, setMovieError] = useState(null);

  const url_discover = 'https://api.themoviedb.org/3/discover/movie?api_key=bbfbd3744c8bf9d4bf9de18f180b4d6c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

  const img_base_url = "https://image.tmdb.org/t/p/w185";

  const searchUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=7e880dff532742e38183bea3a25100bb`;


  const handleFormSubmit = async e => {
    e.preventDefault();
    setisLoading(true)
    try {
      const response = await fetch(searchUrl);
      const data = await response.json()
      console.log(data);
      if (data.status === 'ok') {
          setisLoading(false)
          setMovies(data.articles)
        } else if (data.status === 'error') {
          setMovieError(data.message)
        }
    } catch (error) {
      console.log(error)
      setMovieError(error.message)

    }
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url_discover);
        const data = await response.json()
        console.log(data);
        if (data.results) {
          setisLoading(false)
          setMovies(data.results)
        } else {
          setisLoading(false);
          setMovieError(data.status_message);
        }
      } catch (error) {
        console.log(error);
        setisLoading(false);
        setMovieError(error.message)
      }
    }
    fetchMovies();
  }, []);

  const MovieList = movies.length !== 0 && (
    movies.map(movie => {
      const { id, title, release_date, vote_average, poster_path, backdrop_path } = movie;
      return (
        <Link to={`/movie/${id}`} className="movie" key={id}>
          <div className="img_poster">
            <img src={`${img_base_url}${poster_path}`} alt=""/>
          </div>
          <div className="details">
            <p><b>{title}</b></p>
            <p>{release_date}</p>
          </div>
        </Link>
      )
    })
  );

  return (
    <div className="row">
      {movieError ? <p>{movieError}</p> : null}
      {isLoading ? <Spinner /> : MovieList}
    </div>
  )
}

export default Discover;
