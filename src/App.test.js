import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {shallow} from 'enzyme';

import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { mockResponse } from '../mocks';
// import components
import {GiphSelector} from './components/GiphSelector';

import { GiphyList } from './components/GiphyList';
// import { getGiphys } from './api';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


// describe('<App />', () => {
//   it('should render correctly with data', () => {
//     const tree = renderer.create(<GiphyList data={mockResponse.data} handleGiphInteraction={()=>null}/>).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });


describe('<GiphyList />', () => {
  it('should render correctly with data', () => {
    const tree = renderer.create(<GiphyList data={mockResponse.data} handleGiphInteraction={() => null} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});


test('Select Dogs category', () => {
  // Render a checkbox with label in the document

  const Wrapper = mount(<GiphSelector activeCategory="Cats" availableCategories={['Cats','Dogs']} handleClick={()=>null}/>);
  const DogsButton = Wrapper.instance()
  // expect(secondButton.props().disabled).toEqual(true);

  // expect(checkbox.text()).toEqual('Off');

  // checkbox.find('input').simulate('change');

  // expect(checkbox.text()).toEqual('On');
});


//   it('gets search results', () => {
//     const response = mockTYM;
//     axios.get = jest.fn(() => Promise.resolve(response));

//     let wrapper = mount(<Giphy />);

//     wrapper.instance().searchGiphs('toro y moi', 5);
//     wrapper.instance().searchGiphs('toro y moi');


//   });

//   it('get next page of results', () => {
//     // const response = mockTYM;
//     // axios.get = jest.fn(() => Promise.resolve(response));

//     let wrapper = mount(<Giphy />);
//     wrapper.instance().state.data = mockTYM.data
//     wrapper.instance().state.total_count = mockTYM.pagination.total_count
//     console.log(wrapper.instance().state.total_count);
//     wrapper.instance().state.term = 'toro y moi';
//     let searchBtn = wrapper.find('button.search-btn');
//     searchBtn.simulate('click');

//     const nextBtn = wrapper.find('button.next');

//     nextBtn.simulate('click');


//   });

// });
