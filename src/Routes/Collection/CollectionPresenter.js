import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 100%;
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
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 25px;
`;

const ContentTitle = styled.h4`
  position: relative;
  margin: 8px 0;
  font-weight: 600;
  font-size: 16px;
  transition-delay: 0.1s;
`;

const ContentOverview = styled.span`
  position: relative;
  opacity: 0.7;
  hyphens: auto;
  transition-delay: 0.2s;
`;

const ContentRow = styled.div`
  position: relative;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  transition-delay: 0.2s;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 5px;
  left: 0;
  bottom: 0;
  z-index: 3;
  ${ContentTitle},
  ${ContentOverview},
  ${ContentRow} {
    position: relative;
    top: 100px;
    opacity: 0;
    transition-property: top, opacity;
    transition-duration: 0.3s;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
    width: 100%;
    height: 50%;
    top: 100%;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition-property: top, opacity;
    transition-duration: 0.3s;
    z-index: 2;
  }
  &:hover {
    &:before {
      opacity: 1;
      top: 50%;
    }
    ${ContentTitle},
    ${ContentOverview},
    ${ContentRow} {
      top: 0;
      opacity: 1;
    }
  }
`;

const ContentPoster = styled.div`
  height: 300px;
  background-image: url(${props => props.contImgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
`;

const ContentRelease = styled.span`
  opacity: 0.7;
`;

const ContentRating = styled.span`
  opacity: 0.7;
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
          <Link to={`/movie/${part.id}`}>
            <ContentContainer>
              <ContentPoster
                contImgUrl={`https://image.tmdb.org/t/p/original${part.poster_path}`}
              />
              <Content>
                <ContentTitle>{part.original_title}</ContentTitle>
                <ContentOverview>
                  {part.overview.length > 130
                    ? part.overview.substring(0, 130) + "..."
                    : part.overview}
                </ContentOverview>
                <ContentRow>
                  <ContentRelease>
                    {part.release_date.substring(0, 4)}
                  </ContentRelease>
                  <ContentRating>
                    <span role="img" aria-label="rating">
                      ⭐️
                    </span>
                    {part.vote_average} / 10{" "}
                  </ContentRating>
                </ContentRow>
              </Content>
            </ContentContainer>
          </Link>
        ))}
        <Content></Content>
      </Contents>
    </Container>
  );

CollectionPresenter.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  collection: PropTypes.object
};

export default CollectionPresenter;
