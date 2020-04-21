import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import api from "apiInstance";
import { tvApi } from "api";
import { useAxios } from "hooks/useAxios";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const TV = () => {
  const {
    loading1,
    data: { results: topRated },
    error1,
  } = useAxios(tvApi.topRated(), api);
  const {
    loading2,
    data: { results: popular },
    error2,
  } = useAxios(tvApi.popular(), api);
  const {
    loading3,
    data: { results: airingToday },
    error3,
  } = useAxios(tvApi.airingToday(), api);

  return loading1 && loading2 && loading3 ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {popular.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Today">
          {airingToday.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
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

TV.propTypes = {
  topRated: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      original_name: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      first_air_date: PropTypes.string.isRequired,
    })
  ),
  popular: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      original_name: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      first_air_date: PropTypes.string.isRequired,
    })
  ),
  airingToday: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      original_name: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      first_air_date: PropTypes.string.isRequired,
    })
  ),
  loading1: PropTypes.bool.isRequired,
  loading2: PropTypes.bool.isRequired,
  loading3: PropTypes.bool.isRequired,
  error1: PropTypes.string,
  error2: PropTypes.string,
  error3: PropTypes.string,
};

export default TV;
