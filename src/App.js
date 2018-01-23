import React, { Component } from 'react';
import './App.css';
import { getGiphys } from './api.js';
import { GiphyList } from "./components/GiphyList";
import { GiphSelector } from "./components/GiphSelector";
import { GiphPagination } from "./components/GiphPagination";

const AVAILABLE_CATEGORIES = ["Cats", "Dogs"];
const GIFS_PER_PAGE = 25;

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      category: AVAILABLE_CATEGORIES[0],
      totalPages: 0,
      currentPage: 0
    }
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  componentDidMount() {
    getGiphys(this.state.category).then(response => {
      const { data, pagination } = response;
      const totalPages = Math.ceil(pagination.total_count / GIFS_PER_PAGE);
      this.setState({ data, totalPages });
    });
  }

  selectCategory(category) {
    if (AVAILABLE_CATEGORIES.length <= 2 && category === this.state.category) {

    } else {
      getGiphys(category).then(response => {
        const { data, pagination } = response;
        const totalPages = Math.ceil(pagination.total_count / GIFS_PER_PAGE);
        this.setState({ category, data, totalPages });
      });
    }
  }
  selectPage(currentPage) {
    getGiphys(this.state.category, currentPage * GIFS_PER_PAGE).then(response => {
      console.log("RESPONS",response);
      const { data } = response;
      this.setState({ data, currentPage });
    });
  }

  render() {
    return (
      <div className="App">
        <GiphSelector availableCategories={AVAILABLE_CATEGORIES} handleClick={this.selectCategory} />
        {this.state.totalPages > 0 &&
          <GiphPagination
            handlePageClick={this.selectPage}
            totalPages={this.state.totalPages}
            currentPage={this.state.currentPage} />
        }
        <GiphyList data={this.state.data} />
      </div>
    );
  }
}

export default App;
