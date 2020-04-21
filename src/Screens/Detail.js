import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { moviesApi, tvApi } from "api";
import api from "apiInstance";
import { useAxios } from "hooks/useAxios";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import MoreInfo from "Components/MoreInfo";

const Container = styled.main`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  @media (max-width: 1080px) {
    width: 1080px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.posterImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Info = styled.div``;

const Title = styled.h3`
  font-size: 32px;
  display: inline-block;
`;

const Collection = styled.span`
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 3px 5px;
  font-weight: 800;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.1s ease-out;
  &:hover {
    opacity: 1;
  }
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Imdb = styled.a`
  display: block;
  height: 20px;
  width: 40px;
  margin: 0 10px;
  background: url(${(props) => props.db_img});
  background-size: cover;
  border-radius: 5px;
  opacity: 0.7;
  transition: opacity 0.1s ease-out;
  &:hover {
    opacity: 1;
  }
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Detail = ({
  location: { pathname },
  match: {
    params: { id },
  },
  history: { push },
}) => {
  useEffect(() => {
    if (isNaN(parseInt(id))) {
      return push("/");
    }
  }, []);

  const [moreInfo, setMoreInfo] = useState("videos");
  const { loading, data: result } = useAxios(
    pathname.includes("/movie/")
      ? moviesApi.movieDetail(parseInt(id))
      : tvApi.tvDetail(parseInt(id)),
    api
  );
  const handleChange = (e) => {
    const { target } = e;
    const newInfo = target.innerText.toLowerCase();
    setMoreInfo(newInfo);
  };
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          posterImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <InfoContainer>
          <Info>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            {result.belongs_to_collection &&
            result.belongs_to_collection !== null ? (
              <Link to={`/collection/${result.belongs_to_collection.id}`}>
                <Collection>Collection</Collection>
              </Link>
            ) : (
              ""
            )}
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time} min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, i) =>
                    i === result.genres.length - 1
                      ? `${genre.name}`
                      : `${genre.name} / `
                  )}
              </Item>
              {result.imdb_id ? (
                <Imdb
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  db_img={require("../assets/imdb.png")}
                />
              ) : (
                ""
              )}
            </ItemContainer>
            <Overview>{result.overview}</Overview>
          </Info>
          <MoreInfo
            result={result}
            moreInfo={moreInfo}
            handleChange={handleChange}
          />
        </InfoContainer>
      </Content>
    </Container>
  );
};
Detail.propTypes = {
  result: PropTypes.objectOf(
    PropTypes.shape({
      original_title: PropTypes.string,
      original_name: PropTypes.string,
      backdrop_path: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      belongs_to_collection: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        })
      ),
      release_date: PropTypes.string,
      first_air_date: PropTypes.string,
      runtime: PropTypes.string,
      episode_run_time: PropTypes.string,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ),
      imdb_id: PropTypes.string,
      overview: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(
        PropTypes.shape({
          poster_path: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          overview: PropTypes.string.isRequired,
          aire_date: PropTypes.string,
        })
      ),
      created_by: PropTypes.arrayOf(
        PropTypes.shape({
          profile_path: PropTypes.string,
          name: PropTypes.string.isRequired,
        })
      ),
      videos: PropTypes.arrayOf(PropTypes.shape({})),
      production_companies: PropTypes.arrayOf(
        PropTypes.shape({
          logo_path: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
      production_countries: PropTypes.arrayOf(
        PropTypes.shape({
          iso_3166_1: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  moreInfo: PropTypes.string.isRequired,
};

export default Detail;
