import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Player from "react-player";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerContainer = styled.div`
  margin: 20px 0;
`;

const Video = ({ videoUrls }) => (
  <Container>
    {videoUrls &&
      videoUrls.map(video => (
        <PlayerContainer>
          <Player url={`https://www.youtube.com/embed/${video.key}`} />
        </PlayerContainer>
      ))}
  </Container>
);

Video.propTypes = {
  videoUrls: PropTypes.array.isRequired
};

export default Video;
