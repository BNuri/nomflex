import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const Image = styled.div`
  height: 150px;
  width: 150px;
  margin-bottom: 10px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Creator = ({ name, imageUrl }) => (
  <Container>
    <Image
      imageUrl={
        imageUrl
          ? `https://image.tmdb.org/t/p/original${imageUrl}`
          : require("../assets/noPosterSmall.png")
      }
    />
    <Name>{name}</Name>
  </Container>
);

Creator.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Creator;
