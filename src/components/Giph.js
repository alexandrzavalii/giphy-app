import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Gif = styled.img`
  width: ${props => props.selected ? '80%' : '100%'};
  height: auto;
  margin: ${props => props.selected ? '10%' : 'initial'};
`;

const propTypes = {
    giphSrc: PropTypes.string.isRequired,
    giphSlug: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    handleGiphInteraction: PropTypes.func.isRequired
}

export class Giph extends React.PureComponent {
    constructor(props){
        super(props);
        this.selectGiph = this.selectGiph.bind(this);
    }
    
    selectGiph() {
        this.props.handleGiphInteraction(this.props.id);
    }

    render() {
        return <Gif selected={this.props.selected} src={this.props.giphSrc} alt={this.props.giphSlug} onMouseOver={this.selectGiph} />
    }
}

Giph.propTypes = propTypes;