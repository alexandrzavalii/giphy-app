import React from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from "./Pagination";

import Enzyme, {shallow, mount} from 'enzyme';

import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe("Pagination", () => {
    let props;
    let mountedLockScreen;

    const GiphPagination = (updatedProps) => {
        if (!mountedLockScreen) {
            mountedLockScreen = mount(
                <Pagination {...props} {...updatedProps} />
            );
        }
        return mountedLockScreen;
    }

    beforeEach(() => {
        props = {
            handlePageClick: () => null,
            totalItems: 1000,
        };
        mountedLockScreen = undefined;
    });

    it("renders section", () => {
        const sections = GiphPagination().find("section");
        expect(sections.length).toBeGreaterThan(0);
    });

    it("renders correct initial number of pages and arrows", () => {
        const sections = GiphPagination().find("section");
        const Wrapper = sections.first();
        const NUMBER_OF_PAGES = 10;
        const NUMBER_OF_ARROWS = 2;
        expect(Wrapper.children().length).toEqual(NUMBER_OF_ARROWS + NUMBER_OF_PAGES);
    });
    
    it("if only 4 pages are displayed", () => {
        const sections = GiphPagination({totalItems: 100}).find("section");
        const Wrapper = sections.first();
        const NUMBER_OF_PAGES = 4;
        const NUMBER_OF_ARROWS = 2;
        expect(Wrapper.children().length).toEqual(NUMBER_OF_ARROWS + NUMBER_OF_PAGES);
    });

    it("First Arrow is Disabled, Last Arrow is enabled", () => {
        const sections = GiphPagination().find("section");
        const Wrapper = sections.first();
        const FirstLink = Wrapper.find('a').first();
        const LastLink = Wrapper.find('a').last();
        // const FirstLink_JSON = toJson(FirstLink);

        expect(FirstLink.prop(['disabled'])).toBe(true);
        expect(LastLink.prop(['disabled'])).toBe(false);
    });

    it("if initial page is 5 display the arrows", () => {
        const sections = GiphPagination({ initialPage: 5 }).find("section");
        const Wrapper = sections.first();
        const FirstLink = Wrapper.find('a').first();
        const LastLink = Wrapper.find('a').last();

        expect(FirstLink.prop(['disabled'])).toBe(false);
        expect(FirstLink.prop(['disabled'])).toBe(false);
    });

    it("if initial page is 5 display the arrows", () => {
        const sections = GiphPagination({ initialPage: 5 }).find("section");
        const Wrapper = sections.first();
        const FirstLink = Wrapper.find('a').first();
        const LastLink = Wrapper.find('a').last();

        expect(FirstLink.prop(['disabled'])).toBe(false);
        expect(FirstLink.prop(['disabled'])).toBe(false);
    });

})