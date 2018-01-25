import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.section`
    padding: 1em;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    background: ${props => props.selected ? props.theme.base : "initial"};
    color: ${props => props.theme.light};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid ${props => props.theme.base};
    border-radius: 3px;
        &:hover {
            cursor: pointer;
        }
`;

const propTypes = {
    activeCategory: PropTypes.string.isRequired,
    availableCategories: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired
}


export const CategorySelector = ({ activeCategory, availableCategories, handleClick }) => {
    let categories = availableCategories.length > 0 ?
        availableCategories.map(category =>
            <Button key={category}
                selected={category === activeCategory}
                onClick={() => handleClick(category)}> {category}</Button>)
        : null;
    return <Wrapper>{categories}</Wrapper>;
}

CategorySelector.propTypes = propTypes;