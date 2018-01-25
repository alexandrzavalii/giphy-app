import React, { Component } from 'react';
import { getGiphys, abortGetGiphys } from './api.js';
import { GiphyList } from "./components/GiphyList";
import { CategorySelector } from "./components/CategorySelector";
import { Pagination } from "./components/Pagination";
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
      loading: true,
      selectedGiph: null
    }
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.selectGiph = this.selectGiph.bind(this);
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
    const setCategory = category;
    this.setState({ loading: true, category }, () => {
      abortGetGiphys();
      debounced(500,
        getGiphys(category, offset).then(({ data, pagination }) =>
          this.setState((prevState, props) => {
            const state = {};
            
            if (prevState.category !== setCategory) {
              state.category = setCategory;
            }
            if(prevState.totalItems !== pagination.total_count) {
              state.totalItems = pagination.total_count
            }
            return {
              data, loading: false, selectCategory: null, ...state
            }
          })
          // prevState.category !== setCategory ?
          //   ({ data, totalItems: pagination.total_count, loading: false, selectedGiph: null }) :
          //   ({ data, loading: false, selectedGiph: null }))
        ))
    });
  }


  selectCategory(category) {
    this.handleGet(category, 0);
  }

  selectPage(offset) {
    this.handleGet(this.state.category, offset);
  }
  
  selectGiph(selectedGiph) {
    this.setState({ selectedGiph })
  }
  render() {
    return (
      <div className="App">
        <CategorySelector 
          activeCategory={this.state.category} 
          availableCategories={AVAILABLE_CATEGORIES} 
          handleClick={this.selectCategory} />
        {this.state.loading && <Loading />}
        <Pagination
          handlePageClick={this.selectPage}
          totalItems={this.state.totalItems}
        />
        {!this.state.loading &&
          <GiphyList
            selectedGiph={this.state.selectedGiph}
            handleGiphInteraction={this.selectGiph}
            data={this.state.data} />
        }

      </div>
    );
  }
}

export default App;
