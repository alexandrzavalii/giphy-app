import React from 'react';
import PropTypes from 'prop-types';

export const GiphyList = ({data}) => {
    let gifs = data.length > 0 ?
      data.map((gif) => {
         return (
             <div className='gif' key={gif.id}>
               <img src={gif.images.fixed_width.url} alt={gif.slug}/>
             </div>
         );
       }) :
       <p> No Gifs found </p>;
       return <div className='gif-list' style={styles.gifList}>{gifs}</div>;
    };

  GiphyList.propTypes = {
      data: PropTypes.array
  }


  const styles = {
    gifList: {
      display: 'flex',
      flexWrap: 'wrap',
    }
  }