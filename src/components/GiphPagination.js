import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GIFS_PER_PAGE } from "../settings";

import styled from 'styled-components';

// Styling
const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const PageLink = styled.a`
    color: black;
    float: left;
    padding: 8px 10px;
    text-decoration: none;
    display: ${props => props.disabled ? 'none' : 'initial'};
    background-color: ${props => props.active ? 'palevioletred' : 'white'};
    color: ${props => props.active ? 'white' : 'black'};
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;

// PropTypes
const propTypes = {
    totalItems: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired
}
const defaultProps = {
    initialPage: 1
}

// Component
export class GiphPagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        }
    }

    componentWillMount() {
        if (this.props.totalItems) {
            console.log("WILL MOUNT");
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.totalItems !== prevProps.totalItems) {
            this.setPage(this.props.initialPage);
        }
    }


    setPage(page) {
        console.log("PAGE",page);
        console.log("PROPS", this.props.initialPage);
        if (page !== this.state.pager.currentPage) {
            var items = this.props.totalItems;
            var pager = this.state.pager;

            if (page < 1 || page > pager.totalPages) {
                return;
            }

            // get new pager object for specified page
            pager = this.getPager(items, page);
            this.setState({ pager: pager });

            // call change page function in parent component
            this.props.handlePageClick((page - 1) * GIFS_PER_PAGE);
        }
    }

    getPager(totalItems, currentPage) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        let pageSize = GIFS_PER_PAGE;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        // var pages = Array.from({length: end - start}, (v, k) => k + start)
        var pages = Array.from({ length: endPage + 1 - startPage }, (v, k) => k + startPage);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        const pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <Wrapper>
                <PageLink disabled={pager.currentPage === 1} onClick={() => this.setPage(1)}>
                    &laquo;
                    </PageLink>
                <PageLink disabled={pager.currentPage === 1} onClick={() => this.setPage(pager.currentPage - 1)}>
                    &#8592;
                    </PageLink>
                {pager.pages.map((page, index) =>
                    <PageLink key={index}
                        active={pager.currentPage === page}
                        onClick={() => this.setPage(page)}>{page}</PageLink>
                )}
                <PageLink disabled={pager.currentPage === pager.totalPages}
                    onClick={() => this.setPage(pager.currentPage + 1)}>
                    &#8594;
                </PageLink>
                <PageLink disabled={pager.currentPage === pager.totalPages}
                    onClick={() => this.setPage(pager.totalPages)}>
                    &raquo;
                </PageLink>
            </Wrapper>
        );

    }
}

GiphPagination.propTypes = propTypes;
GiphPagination.defaultProps = defaultProps;