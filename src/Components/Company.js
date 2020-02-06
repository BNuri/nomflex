import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  height: 160px;
  width: 130px;
  padding: 0px 5px 15px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: relative;
  background-color: rgba(255, 255, 255, 0.9);
  padding-bottom: 10px;
  border-radius: 5px;
  color: #131313;
  z-index: 0;
`;

const Image = styled.div`
  height: 120px;
  width: 100%;
  background-image: url(${props => props.logoUrl});
  background-position: center center;
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

const Title = styled.span`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
`;

const Company = ({ logoUrl, name }) => (
  <Container>
    {logoUrl ? (
      <Image logoUrl={`https://image.tmdb.org/t/p/w300${logoUrl}`} />
    ) : (
      <Image logoUrl={require("../assets/noLogo.png")} />
    )}

    <Title>{name}</Title>
  </Container>
);

Company.propTypes = {
  logoUrl: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Company;
