import React from 'react';
import PropTypes from 'prop-types';

export const GiphPagination = ({ totalPages, currentPage, handlePageClick }) => {

    let pages = [];

    let numberOfPages = 1;
    let parsePages = currentPage + 1;
    while (numberOfPages <= 10) {
        numberOfPages++;
        if (parsePages > totalPages) {
            break;
        }
        pages.push(parsePages++);

        if (currentPage > 5) {

        } else {
            
        }
    }
    return pages.map(page => <button onClick={() => handlePageClick(--page)} style={styles.page} key={page}>{page}</button>)
}

GiphPagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
}

const styles = {
    page: {
        width: "40px",
        display: "inline",
        height: "40px",
        fontWeight: "bold"
    }
}