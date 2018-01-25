import React from 'react';
import ReactDOM from 'react-dom';
import { Giph } from "./Giph";
import { AVAILABLE_CATEGORIES } from "../settings";

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe("CategorySelector", () => {
    let props;
    let mountedLockScreen;

    const GiphWithProps = (updatedProps) => {
        if (!mountedLockScreen) {
            mountedLockScreen = mount(
                <Giph {...props} {...updatedProps} />
            );
        }
        return mountedLockScreen;
    }

    beforeEach(() => {
        props = {
            giphSrc: "https://media2.giphy.com/media/3oEduLSwuxfMoTbMQg/200w.gif",
            giphSlug: "cat-cats-gif",
            selected: false,
            id: "21421",
            handleGiphInteraction: () => null
        };
        mountedLockScreen = undefined;
    });

    it("renders Giph correctly", () => {
        const sections = GiphWithProps().find("img");
        const Image = sections.first();        
        expect(sections.length).toBe(1);
        expect(Image.prop(['selected'])).toBe(false);
    });

    it("renders with active state", () => {
        const sections = GiphWithProps({selected: true}).find("img");
        const Image = sections.first();
        expect(Image.prop(['selected'])).toBe(true);
    });

})