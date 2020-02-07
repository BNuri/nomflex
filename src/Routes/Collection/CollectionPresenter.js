import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import PosterL from "Components/PosterL";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
  @media (max-width: 1080px) {
    width: 1080px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 300px;
  width: 100%;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(20, 20, 20, 1)),
    url(${props => props.bgUrl});
  z-index: -1;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Info = styled.div`
  margin-left: 20px;
`;

const Title = styled.h3`
  margin-top: 50px;
  font-size: 36px;
`;

const Overview = styled.p`
  margin-top: 20px;
  width: 50vw;
`;

const Poster = styled.div`
  height: 200px;
  width: 200px;
  background-image: url(${props => props.posterUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
`;

const Contents = styled.div`
  width: 100vw;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 25px;
`;

const CollectionPresenter = ({ error, loading, collection }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>{collection.name} | Nomflix</title>
      </Helmet>
      <Backdrop
        bgUrl={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
      />
      <InfoContainer>
        <Poster
          posterUrl={`https://image.tmdb.org/t/p/original${collection.poster_path}`}
        />
        <Info>
          <Title>{collection.name}</Title>
          <Overview>{collection.overview}</Overview>
        </Info>
      </InfoContainer>
      <Contents>
        {collection.parts.map(part => (
          <PosterL
            id={part.id}
            imageUrl={part.poster_path}
            title={part.original_title}
            overview={part.overview}
            rating={part.vote_average}
            year={part.release_date.substring(0, 4)}
          />
        ))}
      </Contents>
    </Container>
  );

CollectionPresenter.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  collection: PropTypes.object
};

export default CollectionPresenter;
