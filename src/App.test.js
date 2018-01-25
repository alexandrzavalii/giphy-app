import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Enzyme, {shallow, mount} from 'enzyme';
// import styled, { ThemeProvider } from 'styled-components';

// import 'jest-styled-components'

// import renderer from 'react-test-renderer';
// import toJson from 'enzyme-to-json';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

// import { mockResponse } from '../mocks';
// // import components
// import {GiphSelector} from './components/GiphSelector';
// import { GiphyList } from './components/GiphyList';
// import { Pagination } from './components/Pagination';
// // import { getGiphys } from './api';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});