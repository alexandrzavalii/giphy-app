import React from 'react';
import PropTypes from 'prop-types';

export const GiphSelector = ({availableCategories, handleClick}) => {

    let categories = availableCategories.length > 0 ?
    availableCategories.map(category => 
    <button key={category} onClick={()=>handleClick(category)}>{category}</button>) 
    : null;
    return categories;
}

GiphSelector.propTypes = {
    availableCategories: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired
}