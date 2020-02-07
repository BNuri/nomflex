import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 200px;
`;

const Title = styled.h4`
  position: relative;
  margin: 8px 0;
  font-weight: 600;
  font-size: 16px;
  transition-delay: 0.1s;
`;

const Overview = styled.span`
  position: relative;
  opacity: 0.7;
  hyphens: auto;
  transition-delay: 0.2s;
`;

const Row = styled.div`
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
${Title},
${Overview},
${Row} {
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
    ${Title},
    ${Overview},
    ${Row} {
      top: 0;
      opacity: 1;
    }
  }
  &.cursorDefault {
    cursor: default;
  }
`;

const Poster = styled.div`
  height: 300px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
`;

const Release = styled.span`
  opacity: 0.7;
`;

const Rating = styled.span`
  opacity: 0.7;
`;

const PosterL = ({
  id,
  imageUrl,
  title,
  overview,
  rating,
  year,
  isMovie = true
}) => (
  <Container>
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <ContentContainer className={isMovie ? "" : "cursorDefault"}>
        <Poster
          imageUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/original${imageUrl}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Content>
          <Title>{title}</Title>
          <Overview>
            {overview && overview.length > 120
              ? overview.substring(0, 120) + "..."
              : overview}
          </Overview>
          <Row>
            <Release>{year}</Release>
            {rating ? (
              <Rating>
                <span role="img" aria-label="rating">
                  ⭐️
                </span>
                {rating} / 10
              </Rating>
            ) : (
              ""
            )}
          </Row>
        </Content>
      </ContentContainer>
    </Link>
  </Container>
);

PosterL.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool
};

export default PosterL;
