import React from 'react';
import ReactDOM from 'react-dom';
import { GiphyList } from "./GiphyList";
import { AVAILABLE_CATEGORIES } from "../settings";

import { mockResponse } from "../../mocks";

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe("CategorySelector", () => {
    let props;
    let mountedLockScreen;

    const GiphyListWithProps = (updatedProps) => {
        if (!mountedLockScreen) {
            mountedLockScreen = mount(
                <GiphyList {...props} {...updatedProps} />
            );
        }
        return mountedLockScreen;
    }

    beforeEach(() => {
        props = {
            data: mockResponse.data,
            selectedGiph: "asdsad",
            handleGiphInteraction: () => null
        };
        mountedLockScreen = undefined;
    });

    it("renders GiphyList correctly", () => {
        const sections = GiphyListWithProps().find('section');
        expect(sections.length).toBe(1);
    });


    it("renders GiphyList correctly when there is no data", () => {
        const Div = GiphyListWithProps({data:[]}).find('div');
        expect(Div.length).toBe(1);
    });


    it("display correct number of images per page", () => {
        const Section = GiphyListWithProps().find('section');
        const Wrapper = Section.first();
        expect(Wrapper.children().length).toBe(25);
    });

})