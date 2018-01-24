import React, { Component } from 'react';
import './App.css';
import { getGiphys, abortGetGiphys } from './api.js';
import { GiphyList } from "./components/GiphyList";
import { GiphSelector } from "./components/GiphSelector";
import { GiphPagination } from "./components/GiphPagination";
import { debounced } from './utils';

const AVAILABLE_CATEGORIES = ["Cats", "Dogs"];
const API_KEY = 'Vr7NmBCxiA2KqxBc12722GaBiUIKRRy0';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      category: AVAILABLE_CATEGORIES[0],
      totalItems: 0
    }
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }



  componentDidMount() {
    getGiphys(this.state.category).then(response => {
      const { data, pagination } = response;
      console.log("TOTAL", pagination);
      this.setState({ data, totalItems: pagination.total_count });
    });
  }

  selectCategory(category) {
    if (AVAILABLE_CATEGORIES.length <= 2 && category === this.state.category) {

    } else {
      getGiphys(category).then(response => {
        const { data, pagination } = response;
        this.setState({ category, data, totalItems: pagination.total_count });
      });
    }
  }
  selectPage = (offset) => {
    console.log("offset", offset);
    abortGetGiphys();
    debounced(500,
      getGiphys(this.state.category, offset).then(response => {
        const { data } = response;
        this.setState({ data });
      }))
  }

  render() {
    console.log("state", this.state);
    return (
      <div className="App">
        <GiphSelector availableCategories={AVAILABLE_CATEGORIES} handleClick={this.selectCategory} />
        {this.state.totalItems > 0 &&
          <GiphPagination
            handlePageClick={this.selectPage}
            totalItems={this.state.totalItems}
          />
        }
        <GiphyList data={this.state.data} />
      </div>
    );
  }
}

export default App;
