import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import api from "apiInstance";
import { moviesApi, tvApi } from "api";
import { useAxios } from "hooks/useAxios";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.main`
  padding: 20px;
`;

const Search = ({ location: { state }, history: { push } }) => {
  const { term } = state ? state : "";
  useEffect(() => {
    if (state === undefined) {
      push("/");
    }
  }, []);
  const {
    loading1,
    data: { results: movieResults },
    error1,
  } = useAxios(moviesApi.search(term), api);
  const {
    loading2,
    data: { results: tvResults },
    error2,
  } = useAxios(tvApi.search(term), api);
  return loading1 && loading2 ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>Search | Nomflix</title>
      </Helmet>
      {loading1 && loading2 ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.split("-")[0]}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title="TV Show Results">
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {error1 && <Message color="#e74c3c" text={error1} />}
          {error2 && <Message color="#e74c3c" text={error2} />}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message color="#95a5a6" text="Nothing Found" />
            )}
        </>
      )}
    </Container>
  );
};

Search.propTypes = {
  movieResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      original_title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ),
  tvResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      original_name: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      first_air_date: PropTypes.string,
    })
  ),
  loading1: PropTypes.bool.isRequired,
  loading2: PropTypes.bool.isRequired,
  error1: PropTypes.string,
  error2: PropTypes.string,
};

export default Search;
