import React from 'react';
import ReactDOM from 'react-dom';

import { CategorySelector } from "./CategorySelector";
import { AVAILABLE_CATEGORIES } from "../settings";

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe("CategorySelector", () => {
    let props;
    let mountedLockScreen;

    const CategorySelectorWithProps = (updatedProps) => {
        if (!mountedLockScreen) {
            mountedLockScreen = mount(
                <CategorySelector {...props} {...updatedProps} />
            );
        }
        return mountedLockScreen;
    }

    beforeEach(() => {
        props = {
            handleClick: () => null,
            availableCategories: AVAILABLE_CATEGORIES,
            activeCategory: AVAILABLE_CATEGORIES[0]
        };
        mountedLockScreen = undefined;
    });

    it("renders Category Selector correctly", () => {
        const sections = CategorySelectorWithProps().find("section");
        expect(sections.length).toBeGreaterThan(0);
    });

    it("renders two sections", () => {
        const sections = CategorySelectorWithProps().find("section");
        const Wrapper = sections.first();
        const NUMBER_OF_SECTIONS = 2;
        expect(Wrapper.children().length).toEqual(NUMBER_OF_SECTIONS);
    });

    it("renders three sections", () => {
        const sections = CategorySelectorWithProps({availableCategories: ["Cars", ...AVAILABLE_CATEGORIES]}).find("section");
        const Wrapper = sections.first();
        const NUMBER_OF_SECTIONS = 3;
        expect(Wrapper.children().length).toEqual(NUMBER_OF_SECTIONS);
    });

    it("First Category is Active", () => {
        const sections = CategorySelectorWithProps().find("section");
        const Wrapper = sections.first();
        const FirstCategory = Wrapper.find('button').first();
        const SecondCategory = Wrapper.find('button').at(1);

        expect(FirstCategory.prop(['selected'])).toBe(true);
        expect(SecondCategory.prop(['selected'])).toBe(false);
    });

    it("Second Category is Active when passed props", () => {
        const sections = CategorySelectorWithProps({activeCategory: AVAILABLE_CATEGORIES[1]}).find("section");
        const Wrapper = sections.first();
        const FirstCategory = Wrapper.find('button').first();
        const SecondCategory = Wrapper.find('button').at(1);

        expect(FirstCategory.prop(['selected'])).toBe(false);
        expect(SecondCategory.prop(['selected'])).toBe(true);
    });
})