import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import api from "apiInstance";
import { moviesApi } from "api";
import { useAxios } from "hooks/useAxios";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const Home = () => {
  const {
    loading: loading1,
    data: { results: nowPlaying },
    error: error1,
  } = useAxios(moviesApi.nowPlaying(), api);
  const {
    loading: loading2,
    data: { results: upcoming },
    error: error2,
  } = useAxios(moviesApi.upcoming(), api);
  const {
    loading: loading3,
    data: { results: popular },
    error: error3,
  } = useAxios(moviesApi.popular(), api);

  return loading1 && loading2 && loading3 ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => (
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
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map((movie) => (
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
      {popular && popular.length > 0 && (
        <Section title="Popular Movies">
          {popular.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {error1 && <Message color="#e74c3c" text={error1} />}
      {error2 && <Message color="#e74c3c" text={error2} />}
      {error3 && <Message color="#e74c3c" text={error3} />}
    </Container>
  );
};

Home.propTypes = {
  nowPlaying: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      poster_path: PropTypes.string,
      original_title: PropTypes.string,
      vote_average: PropTypes.number,
      release_data: PropTypes.string,
    })
  ),
  upcoming: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      poster_path: PropTypes.string,
      original_title: PropTypes.string,
      vote_average: PropTypes.number,
      release_data: PropTypes.string,
    })
  ),
  popular: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      poster_path: PropTypes.string,
      original_title: PropTypes.string,
      vote_average: PropTypes.number,
      release_data: PropTypes.string,
    })
  ),
  loading1: PropTypes.bool,
  loading2: PropTypes.bool,
  loading3: PropTypes.bool,
  error1: PropTypes.string,
  error2: PropTypes.string,
  error3: PropTypes.string,
};

export default Home;
