import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_MOVIE_DETAILS } from "./Links";
import { BackButton } from "./BackButton";
import "./MovieDetails.css";
import { Loader } from "./Loader";
import "../index.css";
import { NotFound } from "./NotFound";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API_MOVIE_DETAILS(movieId))
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setDetails(data);
          setLoading(false);
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true));
  }, [movieId, setLoading]);

  if (hasError) {
    return (
      <div>
        <NotFound />;
      </div>
    );
  }
  return (
    <>
      {loading && (
        <div className="grid">
          <div className="loader-wrapper">
            <Loader color={"goldenrod"} width={120} height={120} />
            <p className="lazy-data-loader">
              Data is lazy today{" "}
              <span role="img" aria-label="smile">
                &#128512;
              </span>
              . Let's wait a little...{" "}
            </p>
          </div>
        </div>
      )}

      <section className="movie-wrapper">
        <div className="gradient">
          <img
            className="background-image"
            src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
            alt={`still from ${details.title}`}
          />
        </div>
        <div className="movie-details">
          <BackButton />
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
            alt={`poster from ${details.title}`}
          />
          <div className="text-details">
            <div className="title-wrapper">
              <h1>{details.title}</h1>
              <span className="movie-rating">{details.vote_average}</span>
            </div>
            <p>{details.overview}</p>
          </div>
        </div>
      </section>
    </>
  );
};
