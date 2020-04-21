import React from "react";
import styled from "styled-components";
import Video from "Components/Video";
import ReactCountryFlag from "react-country-flag";
import Message from "Components/Message";
import Section from "Components/Section";
import Company from "Components/Company";
import Creator from "Components/Creator";
import PosterL from "Components/PosterL";

const Container = styled.section`
  position: relative;
  flex: 1;
  margin-top: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  overflow-y: auto;
`;

const MoreInfoBtnContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: inherit;
  font-size: 14px;
  z-index: 1;
`;

const MoreInfoBtn = styled.span`
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  opacity: ${(props) => (props.current ? 1 : 0.7)};
  transition: opacity 0.1s ease-out;
  &:hover {
    opacity: 1;
  }
`;

const MoreInfoContent = styled.div`
  display: ${(props) => (props.current ? "block" : "none")};
  padding: 20px 30px;
`;

const Seasons = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 30px;
  justify-content: center;
`;

const Creators = styled.div`
  display: flex;
`;

const MoreInfo = ({ result, moreInfo, handleChange }) => (
  <Container>
    <MoreInfoBtnContainer>
      <MoreInfoBtn onClick={handleChange} current={moreInfo === "videos"}>
        Videos
      </MoreInfoBtn>
      <MoreInfoBtn onClick={handleChange} current={moreInfo === "production"}>
        Production
      </MoreInfoBtn>
      {result.seasons && result.seasons.length > 0 ? (
        <MoreInfoBtn onClick={handleChange} current={moreInfo === "seasons"}>
          Seasons
        </MoreInfoBtn>
      ) : (
        ""
      )}
      {result.created_by && result.created_by.length > 0 ? (
        <MoreInfoBtn onClick={handleChange} current={moreInfo === "creators"}>
          Creators
        </MoreInfoBtn>
      ) : (
        ""
      )}
    </MoreInfoBtnContainer>
    <MoreInfoContent current={moreInfo === "videos"}>
      {result.videos ? (
        <Video videoUrls={result.videos.results} />
      ) : (
        <Message color="#95a5a6" text="No Videos" />
      )}
    </MoreInfoContent>
    <MoreInfoContent current={moreInfo === "production"}>
      {result.production_companies && result.production_companies.length > 0 ? (
        <Section title="Companies">
          {result.production_companies.map((company) => (
            <Company logoUrl={company.logo_path} name={company.name}></Company>
          ))}
        </Section>
      ) : (
        ""
      )}
      {result.production_countries && result.production_countries.length > 0 ? (
        <Section title="Countries">
          {result.production_countries.map((country) => (
            <ReactCountryFlag
              countryCode={country.iso_3166_1}
              aria-label={country.name}
              style={{
                fontSize: "7em",
                textAlign: "center",
              }}
            />
          ))}
        </Section>
      ) : (
        ""
      )}
    </MoreInfoContent>
    <MoreInfoContent current={moreInfo === "seasons"}>
      <Seasons>
        {result.seasons && result.seasons.length > 0
          ? result.seasons.map((season) => (
              <PosterL
                id={window.location.pathname.split("/")[2]}
                imageUrl={season.poster_path}
                title={season.name}
                overview={season.overview}
                year={season.air_date ? season.air_date.substring(0, 4) : ""}
                isMovie={false}
              />
            ))
          : ""}
      </Seasons>
    </MoreInfoContent>
    <MoreInfoContent current={moreInfo === "creators"}>
      <Creators>
        {result.created_by && result.created_by.length > 0
          ? result.created_by.map((creator) => (
              <Creator imageUrl={creator.profile_path} name={creator.name} />
            ))
          : ""}
      </Creators>
    </MoreInfoContent>
  </Container>
);

export default MoreInfo;
