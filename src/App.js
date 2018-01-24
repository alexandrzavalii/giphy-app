import React, { Component } from 'react';
import { getGiphys, abortGetGiphys } from './api.js';
import { GiphyList } from "./components/GiphyList";
import { GiphSelector } from "./components/GiphSelector";
import { GiphPagination } from "./components/GiphPagination";
import { Loading } from "./components/Loading";
import { debounced } from './utils';
import { AVAILABLE_CATEGORIES } from './settings';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      category: AVAILABLE_CATEGORIES[0],
      totalItems: 0,
      loading: true
    }
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }



  componentDidMount() {
    setTimeout(() => getGiphys(this.state.category).then(({ data, pagination }) => {
      this.setState((prevState, props) => ({
        data,
        totalItems: pagination.total_count,
        loading: false
      }));
    }), 1000)

  }

  handleGet(category, offset) {
    this.setState({ loading: true }, () => {
      abortGetGiphys();
      debounced(500,
        getGiphys(category, offset).then(({ data, pagination }) =>
          this.setState((prevState, props) => ({
            category, data, totalItems: pagination.total_count, loading: false
          }))
        ))
    });
  }


  selectCategory(category) {
    if (category !== this.state.category) {
      this.handleGet(category, 0);
    }
  }

  selectPage(offset) {
    console.log("SELECT PAGE", offset);
    // this.handleGet(this.state.category, offset);
  }

  render() {
    
    return (
      <div className="App">
        <GiphSelector activeCategory={this.state.category} availableCategories={AVAILABLE_CATEGORIES} handleClick={this.selectCategory} />
        {this.state.loading && <Loading />}

        {!this.state.loading &&
          <React.Fragment>
            <GiphPagination
              handlePageClick={this.selectPage}
              totalItems={this.state.totalItems}
            />
            <GiphyList data={this.state.data} />
          </React.Fragment>
        }

      </div>
    );
  }
}

export default App;
