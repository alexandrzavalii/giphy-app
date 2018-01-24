import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.section`
  line-height: 0;
  column-count: 5;
  column-gap: 0px;  
  @media (max-width: 1200px) {
    column-count:4;
  }
  @media (max-width: 1000px) {
    column-count:3;
  }
  @media (max-width: 800px) {
    column-count:2;
  }
  @media (max-width: 400px) {
    column-count: 1;
  }
`;

const Gif = styled.img`
  width: 100% ;
  height: auto ;
`;

export const GiphyList = ({ data }) => {
  let gifs = data.length > 0 ?
    data.map(gif =>
      <Gif key={gif.id} src={gif.images.fixed_width.url} alt={gif.slug} />
    ) :
    <p> No Gifs found </p>;
  return <Wrapper>{gifs}</Wrapper>;
};

GiphyList.propTypes = {
  data: PropTypes.array
}