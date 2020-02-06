import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "Components/Loader";
import Video from "Components/Video";
import Message from "Components/Message";
import Section from "Components/Section";
import Company from "Components/Company";
import ReactCountryFlag from "react-country-flag";

const Container = styled.div`
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
  background-image: url(${props => props.bgImage});
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
  background-image: url(${props => props.posterImage});
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

const MoreInfoContainer = styled.div`
  position: relative;
  flex: 1;
  margin-top: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  overflow-y: auto;
`;

const MoreInfo = styled.div`
  display: ${props => (props.current ? "block" : "none")};
  padding: 20px 30px;
`;

const Title = styled.h3`
  font-size: 32px;
  display: inline-block;
`;

const Collection = styled.span`
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 3px 5px;
  font-weight: 600;
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
  background: url(${props => props.db_img});
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

const MoreInfoBtnContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: inherit;
  font-size: 14px;
`;

const MoreInfoBtn = styled.span`
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  opacity: ${props => (props.current ? 1 : 0.7)};
  transition: opacity 0.1s ease-out;
  &:hover {
    opacity: 1;
  }
`;

const DetailPresenter = ({ result, loading, error, handleChange, moreInfo }) =>
  loading ? (
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
              : require("../../assets/noPosterSmall.png")
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
                  db_img={require("../../assets/imdb.png")}
                />
              ) : (
                ""
              )}
            </ItemContainer>
            <Overview>{result.overview}</Overview>
          </Info>
          <MoreInfoContainer>
            <MoreInfoBtnContainer>
              <MoreInfoBtn
                onClick={handleChange}
                current={moreInfo === "videos"}
              >
                Videos
              </MoreInfoBtn>
              <MoreInfoBtn
                onClick={handleChange}
                current={moreInfo === "production"}
              >
                Production
              </MoreInfoBtn>
            </MoreInfoBtnContainer>
            <MoreInfo current={moreInfo === "videos"}>
              {result.videos ? (
                <Video videoUrls={result.videos.results} />
              ) : (
                <Message color="#95a5a6" text="No Videos" />
              )}
            </MoreInfo>
            <MoreInfo current={moreInfo === "production"}>
              {result.production_companies &&
              result.production_companies.length > 0 ? (
                <Section title="Companies">
                  {result.production_companies.map(company => (
                    <Company
                      logoUrl={company.logo_path}
                      name={company.name}
                    ></Company>
                  ))}
                </Section>
              ) : (
                ""
              )}
              {result.production_countries &&
              result.production_countries.length > 0 ? (
                <Section title="Countries">
                  {result.production_countries.map(country => (
                    <ReactCountryFlag
                      countryCode={country.iso_3166_1}
                      aria-label={country.name}
                      style={{
                        fontSize: "7em",
                        textAlign: "center"
                      }}
                    />
                  ))}
                </Section>
              ) : (
                ""
              )}
            </MoreInfo>
          </MoreInfoContainer>
        </InfoContainer>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  moreInfo: PropTypes.string.isRequired
};

export default DetailPresenter;
