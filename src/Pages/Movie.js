import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner/Spinner';


const Movie = ({ match: { params } }) => {
  const [isLoading, setisLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [movieError, setMovieError] = useState(null);

  

  const url_single_movie = `https://api.themoviedb.org/3/movie/${params.id}?api_key=bbfbd3744c8bf9d4bf9de18f180b4d6c&append_to_response=videos,images`;

  const img_base_url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  const img_background = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/oyzhQk1mIQ74CCdlvGwxgkuGRrR.jpg'

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url_single_movie);
        const data = await response.json()
        console.log(data);
        if (data) {
          setisLoading(false)
          setMovie(data)
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

  const convertRuntime = () => {}

  const { id, title, overview, runtime, genres, release_date, homepage, vote_average, poster_path, backdrop_path } = movie;

  // const gen = genres.map(item => (
  //                 <span>{item.name}</span>
  //               ))
  
  return (
    <div className="row">
      <div className="movie_wrapper">
        {movieError ? <p>{movieError}</p> : null}
        {isLoading ? <Spinner /> : (
          <div className="single-movie" key={id}>
            <div className="img_poster">
              <img src={`${img_base_url}${poster_path}`} alt="Poster"/>
            </div>
            
            <div className="movie_details">
              <div className="header">
                <h2>{title}</h2>
                <span>{release_date} </span>||<span> Crime, Animation, Mystery, Action </span>||<span> {runtime}m</span>
              </div>
              <div className="overview">
                <header><b>Overview</b></header>
                <p>{overview}</p>
              </div>
              <div>
                <header><b>Average Vote</b></header>
                <p>{vote_average}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Movie
