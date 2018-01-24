import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./GiphPagination.css";

const GIFS_PER_PAGE = 25;

export class GiphPagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        }
    }

    componentWillMount() {
        if (this.props.totalItems) {
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
        var items = this.props.totalItems;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items, page);
        this.setState({ pager: pager });

        // call change page function in parent component
        console.log("SEND TO PAGE", page - 1);
        this.props.handlePageClick((page - 1) * GIFS_PER_PAGE);
    }

    getPager(totalItems, currentPage) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        let pageSize = GIFS_PER_PAGE;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        console.log("totalItems", totalItems);
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
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className="pagination">
                <a className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(1)}>
                    &laquo;
                    </a>
                <a className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage - 1)}>
                    &#8592;
                    </a>
                {pager.pages.map((page, index) =>
                    <a key={index}
                        className={pager.currentPage === page ? 'active' : ''}
                        onClick={() => this.setPage(page)}>{page}</a>
                )}
                <a className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
                    onClick={() => this.setPage(pager.currentPage + 1)}>
                    &#8594;
                </a>
                <a className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
                    onClick={() => this.setPage(pager.totalPages)}>
                    &raquo;
                </a>
            </div>
        );

    }
}

GiphPagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired
}

GiphPagination.defaultProps = {
    initialPage: 1
}

const styles = {
    page: {
        width: "40px",
        display: "inline",
        height: "40px",
        fontWeight: "bold"
    }
}