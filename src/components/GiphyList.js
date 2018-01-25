import React from 'react';
import PropTypes from 'prop-types';
import { Giph } from "./Giph";
import styled from 'styled-components';

const Wrapper = styled.section`
  line-height: 0;
  column-count: 5;
  column-gap: 0px;  
  background-color: ${props => props.selectedGifExists && props.theme.base};
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

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  color: ${props => props.theme.light};
`;

export const GiphyList = ({ data, handleGiphInteraction, selectedGiph }) => {
    let gifs = data.length > 0 ?
        data.map(gif => 
            <Giph key={gif.id} selected={selectedGiph===gif.id} id={gif.id} handleGiphInteraction={handleGiphInteraction} giphSrc={gif.images.fixed_width.url} giphSlug={gif.slug} />
        ) : null;
    return data.length > 0 ? <Wrapper selectedGifExists={selectedGiph}> {gifs}</Wrapper>: <NotFound>Not Found</NotFound>
};

GiphyList.propTypes = {
    data: PropTypes.array,
    selectedGiph: PropTypes.string,
    handleGiphInteraction: PropTypes.func.isRequired
}